// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ScaffoldTech } from "./scaffolding.js";
import { glob } from "node:fs/promises";
import { join as pathJoin } from "node:path";
import { sourceDir } from "./sourceDir.js";

export async function getTemplates(template: ScaffoldTech): Promise<string[]> {
  const sharedFiles = await getFiles(
    pathJoin(sourceDir, "..", "templates", "_shared", "**", "**", "*.*"),
  );
  const templateFiles = await getFiles(
    pathJoin(sourceDir, "..", "templates", template, "**", "**", "*.*"),
  );
  return [...sharedFiles, ...templateFiles];
}

async function getFiles(path: string): Promise<string[]> {
  const normalizedPath = path.replace(/\\/g, "/");
  const files: string[] = [];

  for await (const file of glob(normalizedPath)) {
    files.push(file);
  }

  return files;
}
