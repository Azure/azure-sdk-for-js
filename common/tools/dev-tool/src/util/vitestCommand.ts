// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { resolveNodeModuleBin } from "./nodeCli.ts";

export function buildVitestCommand(
  args: readonly string[],
  options: { browser: boolean; esm: boolean },
): string[] {
  const providedConfig = args.some((arg) => arg === "-c" || arg === "--config");
  let configArgs: string[] = [];
  if (options.browser && !providedConfig) {
    configArgs = ["-c", "vitest.browser.config.ts"];
  } else if (options.esm && !providedConfig) {
    configArgs = ["-c", "vitest.esm.config.ts"];
  }
  return [process.execPath, "--", resolveNodeModuleBin("vitest", "vitest"), ...configArgs, ...args];
}
