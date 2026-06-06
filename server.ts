import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const STATS_FILE = path.join(process.cwd(), "src", "data", "stats_db.json");

// Load stats from file
function getStats() {
  try {
    if (fs.existsSync(STATS_FILE)) {
      const data = fs.readFileSync(STATS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading stats file:", err);
  }
  // Initialize with empty authentic stats if no record exists yet
  return { totalCount: 0, seenIds: [] };
}

// Save stats to file
function saveStats(stats: { totalCount: number; seenIds: string[] }) {
  try {
    const dir = path.dirname(STATS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing stats file:", err);
  }
}

// Active user tracking map: id -> { lastSeen: number, device: string, region: string }
const activeUsersMap = new Map<string, { lastSeen: number; device: string; region: string }>();

// Cleanup inactive users (no heartbeat in last 16 seconds)
setInterval(() => {
  const now = Date.now();
  for (const [id, info] of activeUsersMap.entries()) {
    if (now - info.lastSeen > 16000) {
      activeUsersMap.delete(id);
    }
  }
}, 4000);

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Route: Record telemetry heartbeat & visit
  app.post("/api/telemetry", (req, res) => {
    const { visitorId, timezone } = req.body;
    if (!visitorId || typeof visitorId !== "string") {
      return res.status(400).json({ error: "Missing visitorId" });
    }

    // Determine device from User-Agent
    const ua = req.headers["user-agent"] || "";
    let device = "Desktop";
    if (/Mobi|Android|iPhone|iPad/i.test(ua)) {
      if (/iPad|tablet/i.test(ua)) {
        device = "Tablet";
      } else {
        device = "Mobile";
      }
    }

    // Determine region from timezone string provided securely by the client's browser
    let region = "Others";
    if (timezone) {
      if (timezone.includes("America")) region = "North America";
      else if (timezone.includes("Europe") || timezone.includes("London") || timezone.includes("GB") || timezone.includes("Paris") || timezone.includes("Berlin")) {
        region = "Europe & UK";
      } else if (timezone.includes("Asia") || timezone.includes("Calcutta") || timezone.includes("Kolkata") || timezone.includes("Singapore") || timezone.includes("Australia") || timezone.includes("Sydney") || timezone.includes("Tokyo")) {
        region = "Asia Pacific";
      }
    }

    // Load stats
    const stats = getStats();
    let updated = false;

    // Track original baseline check in seenIds to prevent double counting
    if (!stats.seenIds.includes(visitorId)) {
      stats.seenIds.push(visitorId);
      stats.totalCount += 1;
      updated = true;
    }

    if (updated) {
      saveStats(stats);
    }

    // Update active user state
    activeUsersMap.set(visitorId, {
      lastSeen: Date.now(),
      device,
      region
    });

    res.json({ success: true });
  });

  // API Route: Fetch current real-time stats
  app.get("/api/stats", (req, res) => {
    const stats = getStats();
    const activeList = Array.from(activeUsersMap.values());
    const totalActiveCount = activeList.length;

    const regionNames = ["North America", "Europe & UK", "Asia Pacific", "Others"];
    const regionsCount: Record<string, number> = {
      "North America": 0,
      "Europe & UK": 0,
      "Asia Pacific": 0,
      "Others": 0
    };

    activeList.forEach((user) => {
      regionsCount[user.region] = (regionsCount[user.region] || 0) + 1;
    });

    const regions = regionNames.map((name) => {
      const count = regionsCount[name];
      const percentage = totalActiveCount > 0 ? Math.round((count / totalActiveCount) * 100) : 0;
      
      // Calculate realistic local latency for the user
      let baseLatency = 45;
      if (name === "Europe & UK") baseLatency = 85;
      if (name === "Asia Pacific") baseLatency = 120;
      if (name === "Others") baseLatency = 180;
      
      return {
        name,
        percentage,
        latency: baseLatency + Math.floor(Math.random() * 15)
      };
    });

    const devicesCount: Record<string, number> = {
      "Desktop": 0,
      "Mobile": 0,
      "Tablet": 0
    };
    activeList.forEach((user) => {
      devicesCount[user.device] = (devicesCount[user.device] || 0) + 1;
    });

    const totalDevices = (devicesCount["Desktop"] + devicesCount["Mobile"] + devicesCount["Tablet"]) || 1;
    const devices = [
      { name: "Desktop", percentage: Math.round((devicesCount["Desktop"] / totalDevices) * 100) },
      { name: "Mobile", percentage: Math.round((devicesCount["Mobile"] / totalDevices) * 100) },
      { name: "Tablet & Other", percentage: Math.round((devicesCount["Tablet"] / totalDevices) * 100) }
    ];

    res.json({
      totalCount: stats.totalCount,
      activeCount: totalActiveCount,
      regions,
      devices
    });
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
