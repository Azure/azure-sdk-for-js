// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

interface PromptCacheData {
  version: 1;
  contextResolution: Record<string, Array<{ path: string; reason: string }>>;
  existingTests: Record<string, string>;
}

const CACHE_FILE = ".test-gen-cache.json";

function emptyCacheData(): PromptCacheData {
  return {
    version: 1,
    contextResolution: {},
    existingTests: {},
  };
}

export function hashText(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

function stableKey(parts: Record<string, string | number>): string {
  return hashText(JSON.stringify(parts));
}

export class PromptCache {
  private dirty = false;

  private constructor(
    private readonly cachePath: string,
    private readonly data: PromptCacheData,
  ) {}

  static async load(packageDir: string): Promise<PromptCache> {
    const cachePath = resolve(packageDir, CACHE_FILE);
    try {
      const raw = await readFile(cachePath, "utf8");
      const parsed = JSON.parse(raw) as Partial<PromptCacheData>;
      if (parsed.version !== 1) {
        return new PromptCache(cachePath, emptyCacheData());
      }
      return new PromptCache(cachePath, {
        version: 1,
        contextResolution: parsed.contextResolution ?? {},
        existingTests: parsed.existingTests ?? {},
      });
    } catch {
      return new PromptCache(cachePath, emptyCacheData());
    }
  }

  getContextResolution(params: {
    sourceFile: string;
    sourceHash: string;
    fileListHash: string;
    model: string;
    maxFiles: number;
  }): Array<{ path: string; reason: string }> | undefined {
    const key = stableKey(params);
    return this.data.contextResolution[key];
  }

  setContextResolution(
    params: {
      sourceFile: string;
      sourceHash: string;
      fileListHash: string;
      model: string;
      maxFiles: number;
    },
    files: Array<{ path: string; reason: string }>,
  ): void {
    const key = stableKey(params);
    this.data.contextResolution[key] = files;
    this.dirty = true;
  }

  getExistingTests(params: {
    sourceFile: string;
    sourceHash: string;
    testFile: string;
    testHash: string;
    maxLines: number;
  }): string | undefined {
    const key = stableKey(params);
    return this.data.existingTests[key];
  }

  setExistingTests(
    params: {
      sourceFile: string;
      sourceHash: string;
      testFile: string;
      testHash: string;
      maxLines: number;
    },
    snippet: string,
  ): void {
    const key = stableKey(params);
    this.data.existingTests[key] = snippet;
    this.dirty = true;
  }

  async save(): Promise<void> {
    if (!this.dirty) return;
    await writeFile(this.cachePath, JSON.stringify(this.data, null, 2) + "\n", "utf8");
    this.dirty = false;
  }
}
