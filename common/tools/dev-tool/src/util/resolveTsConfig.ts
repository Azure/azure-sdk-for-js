// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import fs from "node:fs/promises";
import stripJsonComments from "strip-json-comments";

import type { CompilerOptions } from "typescript";

export type Config = {
  compilerOptions: CompilerOptions;
  include?: string[];
  exclude?: string[];
  files?: string[];
};

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
export async function resolveConfig(configPath: string): Promise<Config> {
  async function helper(configPath: string) {
    const absolutePath = path.resolve(configPath);
    const configDir = path.dirname(absolutePath);
    const rawConfig = JSON.parse(
      stripJsonComments(
        await fs.readFile(
          !absolutePath.toLowerCase().endsWith(".json") ? `${absolutePath}.json` : absolutePath,
          "utf8",
        ),
      ),
    );

    let resolvedConfig = {} as Config;
    const { extends: parents, ...rest } = rawConfig;
    if (parents) {
      const baseConfigs = Array.isArray(parents) ? parents : [parents];
      for (const baseConfigPath of baseConfigs) {
        const baseConfigAbsolutePath = path.resolve(configDir, baseConfigPath);
        const baseConfig = await helper(baseConfigAbsolutePath);
        resolvedConfig = mergeConfig(resolvedConfig, baseConfig);
      }
    }
    return mergeConfig(resolvedConfig, rest);
  }
  const resolvedConfig = await helper(configPath);
  const outDir = resolvedConfig.compilerOptions.outDir;
  const { include, exclude, files } = resolvedConfig;
  if (outDir) {
    resolvedConfig.compilerOptions.outDir = resolveConfigDir(configPath, outDir);
  }
  if (include) {
    resolvedConfig.include = include.map((p) => resolveConfigDir(configPath, p));
  }
  if (exclude) {
    resolvedConfig.exclude = exclude.map((p) => resolveConfigDir(configPath, p));
  }
  if (files) {
    resolvedConfig.files = files.map((p) => resolveConfigDir(configPath, p));
  }
  return resolvedConfig;
}
