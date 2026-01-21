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

type RawConfig = Config & {
  references?: Array<{
    path: string;
    prepend?: boolean;
    circular?: boolean;
  }>;
};

export type ResolvedProjectReference = {
  path: string;
  config: Config;
};

export type ResolvedConfigResult = {
  config: Config;
  references: ResolvedProjectReference[];
};

function resolveConfigDir(configPath: string, unresolvedPath: string) {
  return unresolvedPath.replace(/\$\{configDir\}/g, path.dirname(configPath));
}

function mergeConfig(config1: RawConfig, config2: RawConfig) {
  return {
    ...config1,
    ...config2,
    compilerOptions: {
      ...config1.compilerOptions,
      ...config2.compilerOptions,
    },
  };
}

function normalizeConfigPath(configPath: string) {
  const absolutePath = path.resolve(configPath);
  return absolutePath.toLowerCase().endsWith(".json") ? absolutePath : `${absolutePath}.json`;
}

function normalizeConfigPaths(configPath: string, resolvedConfig: RawConfig): Config {
  const outDir = resolvedConfig.compilerOptions.outDir;
  const { include, exclude, files, compilerOptions, references, ...rest } = resolvedConfig;
  void references;
  const normalized: Config = {
    ...(rest as Config),
    compilerOptions: {
      ...compilerOptions,
    },
  };
  if (outDir) {
    normalized.compilerOptions.outDir = resolveConfigDir(configPath, outDir);
  }
  if (include) {
    normalized.include = include.map((p) => resolveConfigDir(configPath, p));
  }
  if (exclude) {
    normalized.exclude = exclude.map((p) => resolveConfigDir(configPath, p));
  }
  if (files) {
    normalized.files = files.map((p) => resolveConfigDir(configPath, p));
  }
  return normalized;
}

/**
 * Generates a complete TypeScript configuration by reading and parsing a given tsconfig file,
 * and returns an ordered list of resolved project references.
 *
 * @param configPath - The path to the tsconfig file.
 * @returns The normalized config plus ordered resolved references.
 */
export async function resolveConfig(configPath: string): Promise<ResolvedConfigResult> {
  async function helper(configPath: string): Promise<RawConfig> {
    const absolutePath = normalizeConfigPath(configPath);
    const configDir = path.dirname(absolutePath);
    const rawConfig = JSON.parse(stripJsonComments(await fs.readFile(absolutePath, "utf8")));

    let resolvedConfig = {} as RawConfig;
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
  async function resolveReferences(rootConfigPath: string, rootConfig: RawConfig) {
    const ordered: ResolvedProjectReference[] = [];
    const visited = new Set<string>();

    async function visit(referencePath: string) {
      const normalizedPath = normalizeConfigPath(referencePath);
      if (visited.has(normalizedPath)) {
        return;
      }
      visited.add(normalizedPath);

      const referenceConfig = await helper(normalizedPath);
      const referenceDir = path.dirname(normalizedPath);
      for (const ref of referenceConfig.references ?? []) {
        const nestedPath = path.resolve(referenceDir, ref.path);
        await visit(nestedPath);
      }

      ordered.push({
        path: normalizedPath,
        config: normalizeConfigPaths(normalizedPath, referenceConfig),
      });
    }

    const rootDir = path.dirname(normalizeConfigPath(rootConfigPath));
    for (const ref of rootConfig.references ?? []) {
      await visit(path.resolve(rootDir, ref.path));
    }

    return ordered;
  }

  const resolvedConfig = await helper(configPath);
  return {
    config: normalizeConfigPaths(configPath, resolvedConfig),
    references: await resolveReferences(configPath, resolvedConfig),
  };
}
