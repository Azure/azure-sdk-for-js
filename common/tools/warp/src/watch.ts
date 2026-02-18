// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Watch mode: rebuild on source file changes (#6).
 *
 * Uses Node.js recursive fs.watch to monitor source directories.
 * Debounces rapid-fire events and re-runs the build pipeline.
 */

import * as fs from "node:fs";
import * as fsp from "node:fs/promises";
import * as path from "node:path";
import { build } from "./build.ts";
import type { BuildOptions } from "./build.ts";
import { resolveWarpConfig } from "./config.ts";
import { parseTargetTsConfig } from "./compiler.ts";
import { getLogger } from "./logger.ts";

export interface WatchOptions extends BuildOptions {
  /** Debounce interval in milliseconds. Defaults to 300. */
  debounceMs?: number;
}

/**
 * Start watching source directories and rebuild on changes.
 * Returns an AbortController that can be used to stop watching.
 */
export async function watch(options: WatchOptions = {}): Promise<AbortController> {
  const log = getLogger();
  const cwd = options.cwd ?? process.cwd();
  const packageRoot = path.resolve(cwd);
  const debounceMs = options.debounceMs ?? 300;

  // Resolve config to find source directories to watch
  const resolved = await resolveWarpConfig(packageRoot, options.configPath);
  const parsedConfigs = resolved.config.targets.map((t) => parseTargetTsConfig(t, packageRoot));

  // Collect unique rootDirs to watch
  const watchDirs = [...new Set(parsedConfigs.map((pc) => path.resolve(pc.rootDir)))];

  // Initial build
  log.info("[warp] Watch: initial build...");
  await build({ ...options, clean: options.clean ?? true });

  const ac = new AbortController();
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;
  let building = false;

  const triggerRebuild = (): void => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      if (building) return;
      building = true;
      log.info("\n[warp] Watch: file change detected, rebuilding...");
      try {
        await build({ ...options, clean: false });
      } catch (err) {
        log.error(`[warp] Watch: build error: ${err}`);
      } finally {
        building = false;
      }
    }, debounceMs);
  };

  const watchers: fs.FSWatcher[] = [];
  for (const dir of watchDirs) {
    let dirExists = false;
    try {
      await fsp.access(dir);
      dirExists = true;
    } catch {
      // directory does not exist
    }
    if (!dirExists) continue;
    try {
      const watcher = fs.watch(
        dir,
        { recursive: true, signal: ac.signal },
        (eventType, filename) => {
          if (!filename) return;
          // Only react to .ts/.mts/.cts source files
          if (/\.(m?ts|cts)$/.test(filename) && !filename.endsWith(".d.ts")) {
            log.verbose(`[warp] Watch: ${eventType} ${filename}`);
            triggerRebuild();
          }
        },
      );
      watchers.push(watcher);
    } catch {
      log.warn(`[warp] Watch: unable to watch ${dir}`);
    }
  }

  // Also watch the config file
  const configPath = resolved.source.path;
  let configExists = false;
  try {
    await fsp.access(configPath);
    configExists = true;
  } catch {
    // config file does not exist
  }
  if (configExists) {
    try {
      const watcher = fs.watch(configPath, { signal: ac.signal }, () => {
        log.info("[warp] Watch: config file changed, rebuilding...");
        triggerRebuild();
      });
      watchers.push(watcher);
    } catch {
      // ignore
    }
  }

  log.info(`[warp] Watch: monitoring ${watchDirs.length} source dir(s). Press Ctrl+C to stop.`);

  return ac;
}
