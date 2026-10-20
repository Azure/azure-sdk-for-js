// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DatasetUploadInternalOptions, AIProjectContext as Client } from "../index.js";
import type { DatasetVersionUnion } from "../../models/models.js";

export async function uploadFile(
  _context: Client,
  _name: string,
  _version: string,
  _filePath: string,
  _options?: DatasetUploadInternalOptions,
): Promise<DatasetVersionUnion> {
  throw new Error("Dataset file uploads are only supported in Node.js.");
}

export async function uploadFolder(
  _context: Client,
  _name: string,
  _version: string,
  _folderPath: string,
  _options?: DatasetUploadInternalOptions,
): Promise<DatasetVersionUnion> {
  throw new Error("Dataset folder uploads are only supported in Node.js.");
}
