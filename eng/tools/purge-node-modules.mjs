import { readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const roots = process.argv.slice(2).length ? process.argv.slice(2) : ["sdk"];

function purge(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const full = join(dir, e.name);
    if (e.name === "node_modules") {
      rmSync(full, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
    } else {
      purge(full);
    }
  }
}

for (const r of roots) purge(r);
