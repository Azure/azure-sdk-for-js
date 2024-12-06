// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as path from "path";
import * as fs from "fs";

function resolveConfigDir(configPath: string, unresolvedPath: string) {
  return unresolvedPath.replace(/\$\{configDir\}/g, path.dirname(configPath));
}

/**
 * Generates a complete TypeScript configuration by reading and parsing a given tsconfig file.
 *
 * @param configPath - The path to the tsconfig file.
 * @returns A record containing the raw parsed configuration.
 */
export function resolveConfig(configPath: string) {
  function helper(configPath: string) {
    const absolutePath = path.resolve(configPath);
    const configDir = path.dirname(absolutePath);
    const rawConfig = JSON.parse(
      fs.readFileSync(
        !absolutePath.toLowerCase().endsWith(".json") ? `${absolutePath}.json` : absolutePath,
        "utf8",
      ),
    );

    let resolvedConfig = rawConfig;

    // Handle "extends" property
    if (rawConfig.extends) {
      const baseConfigs = Array.isArray(rawConfig.extends)
        ? rawConfig.extends
        : [rawConfig.extends];

      for (const baseConfigPath of baseConfigs) {
        const baseConfigAbsolutePath = path.resolve(configDir, baseConfigPath);
        const baseConfig = helper(baseConfigAbsolutePath);

        // Merge baseConfig into the resolvedConfig
        resolvedConfig = {
          ...baseConfig,
          ...resolvedConfig,
          compilerOptions: {
            ...baseConfig.compilerOptions,
            ...resolvedConfig.compilerOptions,
          },
        };
      }

      // Remove "extends" after merging
      delete resolvedConfig.extends;
    }
    return resolvedConfig;
  }
  const resolvedConfig = helper(configPath);
  const outDir = resolvedConfig.compilerOptions.outDir;
  if (outDir) {
    resolvedConfig.compilerOptions.outDir = resolveConfigDir(configPath, outDir);
  }
  return resolvedConfig;
}
