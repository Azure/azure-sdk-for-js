// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

interface BuildResult {
  success: boolean;
}

type BuildCoreProcess = (packageRoot: string) => Promise<BuildResult>;

async function buildCoreProcess(packageRoot: string): Promise<BuildResult> {
  const { build } = await import("@microsoft/warp");
  const originalCwd = process.cwd();
  try {
    // Warp resolves ambient types relative to cwd, matching its normal CLI execution.
    process.chdir(packageRoot);
    return await build({ cwd: packageRoot });
  } finally {
    process.chdir(originalCwd);
  }
}

export async function ensureCoreProcessBuilt(
  entrypoint = fileURLToPath(import.meta.resolve("@azure/core-process")),
  packageRoot = path.dirname(
    fileURLToPath(import.meta.resolve("@azure/core-process/package.json")),
  ),
  build: BuildCoreProcess = buildCoreProcess,
): Promise<void> {
  if (existsSync(entrypoint)) {
    return;
  }

  const result = await build(packageRoot);
  if (!result.success || !existsSync(entrypoint)) {
    throw new Error("Failed to bootstrap @azure/core-process.");
  }
}
