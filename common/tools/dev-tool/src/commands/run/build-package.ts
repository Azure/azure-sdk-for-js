// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import path from "node:path";
import { spawnSync, type StdioOptions } from "node:child_process";
import { isWindows } from "../../util/platform";
import { existsSync, readFileSync } from "node:fs";
import { resolveRoot } from "../../util/resolveProject";

const log = createPrinter("build-package");

export const commandInfo = makeCommandInfo("build-package", "build a package for production");

const TSHY_BIN_PATH = path.resolve(__dirname, "..", "..", "..", "node_modules", ".bin", "tshy");

function hasWarpConfig(cwd: string): boolean {
  if (existsSync(path.join(cwd, "warp.config.yml"))) return true;
  if (existsSync(path.join(cwd, "warp.config.yaml"))) return true;
  const pkgPath = path.join(cwd, "package.json");
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
      if (pkg.warp) return true;
    } catch {
      // ignore malformed package.json
    }
  }
  return false;
}

export default leafCommand(commandInfo, async () => {
  const cwd = process.cwd();

  if (hasWarpConfig(cwd)) {
    log.info("Detected warp config, building with warp...");

    const localWarpBin = path.join(cwd, "node_modules", ".bin", isWindows() ? "warp.CMD" : "warp");
    let commandPath: string;

    if (existsSync(localWarpBin)) {
      commandPath = localWarpBin;
    } else {
      const root = await resolveRoot(cwd);
      const rootWarpBin = path.join(
        root,
        "node_modules",
        ".bin",
        isWindows() ? "warp.CMD" : "warp",
      );
      commandPath = rootWarpBin;
    }

    log.info(`Running warp from ${commandPath}`);
    const proc = spawnSync(commandPath, ["build"], {
      stdio: "inherit" as StdioOptions,
      shell: isWindows(),
    });

    if (proc.error) {
      log.error(proc.error.message);
      return false;
    }

    if (proc.status !== 0) {
      log.error("warp build failed.");
      return false;
    }

    log.info("Package built successfully.");
    return true;
  }

  const centralCommandPath = isWindows() ? `${TSHY_BIN_PATH}.CMD` : TSHY_BIN_PATH;
  const localBinPath = path.resolve(cwd, "node_modules", ".bin", "tshy");
  const localCommandPath = isWindows() ? `${localBinPath}.CMD` : localBinPath;
  const commandPath = existsSync(localCommandPath) ? localCommandPath : centralCommandPath;

  log.info(`Building package with tshy from ${commandPath}`);

  const proc = spawnSync(commandPath, { stdio: "pipe" as StdioOptions, shell: isWindows() });

  if (proc.error) {
    log.error(proc.error.message);
    return false;
  }

  if (proc.status !== 0) {
    log.error(`Package failed to build:

stdout: ${proc.stdout.toString()}

stderr: ${proc.stderr.toString()}
`);
    return false;
  }

  log.info("Package built successfully.");

  return true;
});
