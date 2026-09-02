// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlockBlobClient } from "@azure/storage-blob";

export type LocalPathType = "missing" | "file" | "directory" | "other";

export interface LocalFile {
  path: string;
  relativePath: string;
}

const unsupportedMessage = "Local file access is not supported in the browser.";

function unsupported(): never {
  throw new Error(unsupportedMessage);
}

export function ensureLocalFileAccess(): void {
  unsupported();
}

export function getLocalPathType(_path: string): LocalPathType {
  return unsupported();
}

export function getLocalFileName(_path: string): string {
  return unsupported();
}

export async function listLocalFiles(_rootPath: string): Promise<LocalFile[]> {
  return unsupported();
}

export function readLocalFile(_path: string): Uint8Array {
  return unsupported();
}

export async function uploadLocalFile(_client: BlockBlobClient, _path: string): Promise<void> {
  return unsupported();
}
