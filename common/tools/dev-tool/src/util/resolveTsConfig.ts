// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as path from "path";
import * as fs from "fs";
import ts from "typescript";

type Config = { compilerOptions: ts.CompilerOptions };

function resolveConfigDir(configPath: string, unresolvedPath: string) {
  return unresolvedPath.replace(/\$\{configDir\}/g, path.dirname(configPath));
}

function mergeConfig(config1: Config, config2: Config) {
  return {
    ...config1,
    ...config2,
    compilerOptions: {
      ...config1.compilerOptions,
      ...config2.compilerOptions,
    },
  };
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

    let resolvedConfig = {} as Config;
    const { extends: parents, ...rest } = rawConfig;
    if (parents) {
      const baseConfigs = Array.isArray(parents) ? parents : [parents];
      for (const baseConfigPath of baseConfigs) {
        const baseConfigAbsolutePath = path.resolve(configDir, baseConfigPath);
        const baseConfig = helper(baseConfigAbsolutePath);
        resolvedConfig = mergeConfig(resolvedConfig, baseConfig);
      }
    }
    return mergeConfig(resolvedConfig, rest);
  }
  const resolvedConfig = helper(configPath);
  const outDir = resolvedConfig.compilerOptions.outDir;
  if (outDir) {
    resolvedConfig.compilerOptions.outDir = resolveConfigDir(configPath, outDir);
  }
  return resolvedConfig;
}
