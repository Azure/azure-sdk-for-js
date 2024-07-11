// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ScaffoldTech } from "./scaffolding.js";
import { glob } from "glob";
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
  // Starting from glob v8 `\` is only used as an escape character, and never as a path separator in glob patterns.
  // Glob pattern paths must use forward-slashes as path separators.
  // See https://github.com/isaacs/node-glob/blob/af57da21c7722bb6edb687ccd4ad3b99d3e7a333/changelog.md#80
  const normalizedPath = path.replace(/\\/g, "/");
  return glob(normalizedPath, { dot: true });
}
