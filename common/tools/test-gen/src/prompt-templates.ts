// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFile } from "node:fs/promises";

const templateCache = new Map<string, Promise<string>>();

async function loadPromptTemplate(name: string): Promise<string> {
  let cached = templateCache.get(name);
  if (!cached) {
    cached = readFile(new URL(`./prompts/${name}`, import.meta.url), "utf8");
    templateCache.set(name, cached);
  }
  return cached;
}

export async function renderPromptTemplate(
  name: string,
  values: Record<string, string | number>,
): Promise<string> {
  const template = await loadPromptTemplate(name);
  return template.replace(/\{\{(\w+)\}\}/g, (_unused, key: string) => {
    if (!(key in values)) {
      throw new Error(`Missing prompt template value for ${name}: ${key}`);
    }
    return String(values[key]);
  });
}
