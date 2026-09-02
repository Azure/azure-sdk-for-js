// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlockBlobClient } from "@azure/storage-blob";
import fs from "node:fs";
import nodePath from "node:path";

export type LocalPathType = "missing" | "file" | "directory" | "other";

export interface LocalFile {
  path: string;
  relativePath: string;
}

export function ensureLocalFileAccess(): void {}

export function getLocalPathType(path: string): LocalPathType {
  if (!fs.existsSync(path)) {
    return "missing";
  }

  const stat = fs.lstatSync(path);
  if (stat.isFile()) {
    return "file";
  }
  if (stat.isDirectory()) {
    return "directory";
  }
  return "other";
}

export function getLocalFileName(path: string): string {
  return nodePath.basename(path);
}

export async function listLocalFiles(rootPath: string): Promise<LocalFile[]> {
  const files: LocalFile[] = [];

  async function visit(directoryPath: string): Promise<void> {
    for (const entry of await fs.promises.readdir(directoryPath)) {
      const path = nodePath.join(directoryPath, entry);
      const stat = await fs.promises.lstat(path);
      if (stat.isDirectory()) {
        await visit(path);
      } else {
        files.push({
          path,
          relativePath: nodePath.relative(rootPath, path).split(nodePath.sep).join("/"),
        });
      }
    }
  }

  await visit(rootPath);
  return files;
}

export function readLocalFile(path: string): Uint8Array {
  return fs.readFileSync(path);
}

export async function uploadLocalFile(client: BlockBlobClient, path: string): Promise<void> {
  await client.uploadStream(fs.createReadStream(path));
}
