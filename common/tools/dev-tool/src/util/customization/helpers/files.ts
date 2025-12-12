// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { readdir } from "node:fs/promises";
import path from "node:path";

export async function getNewCustomFiles(originalDir: string, customDir: string): Promise<string[]> {
  const filesInCustom = await getFiles(customDir);
  const filesInOriginal = await getFiles(originalDir);

  return filesInCustom.filter(
    (file) =>
      !filesInOriginal.some((f) =>
        f.replace(originalDir, "").includes(file.replace(customDir, "")),
      ),
  );
}

export async function getFiles(dir: string): Promise<string[]> {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }),
  );
  return files.flat();
}
