// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "node:fs";
import nodePath from "node:path";
import { BlobServiceClient } from "@azure/storage-blob";
import type { AIProjectContext as Client } from "../../index.js";
import type { ModelVersion } from "../../../models/models.js";
import type { BetaModelsCreateFromSourceOptions } from "./options.js";
import { get, pendingCreateVersion, pendingUpload } from "./operations.js";

function getAllFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = nodePath.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      results.push(...getAllFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

export async function createFromSource(
  context: Client,
  name: string,
  version: string,
  source: string,
  options: BetaModelsCreateFromSourceOptions = {},
): Promise<ModelVersion> {
  const pollingTimeout = options.pollingTimeout ?? 300_000;
  const pollingInterval = options.pollingInterval ?? 2_000;

  // Step 1: Get a pending upload SAS URL
  const uploadResponse = await pendingUpload(context, name, version, {
    pendingUploadType: "TemporaryBlobReference",
  });

  // Step 2: Upload local files to the blob container
  const containerClient = new BlobServiceClient(
    uploadResponse.blobReference.credential.sasUri,
  ).getContainerClient("");
  const files = getAllFiles(source);
  for (const filePath of files) {
    const blobName = nodePath.relative(source, filePath).replace(/\\/g, "/");
    const data = fs.readFileSync(filePath);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(data, data.length);
  }

  // Step 3: Trigger async model version creation
  await pendingCreateVersion(context, name, version, {
    blobUri: uploadResponse.blobReference.blobUri,
    weightType: options.weightType,
    baseModel: options.baseModel,
    description: options.description,
    tags: options.tags,
    name,
    version,
  });

  // Step 4: Poll until the model version is available
  const deadline = Date.now() + pollingTimeout;
  while (Date.now() < deadline) {
    try {
      return await get(context, name, version);
    } catch (e: unknown) {
      if (typeof e === "object" && e !== null && "statusCode" in e && e.statusCode === 404) {
        await new Promise((resolve) => setTimeout(resolve, pollingInterval));
      } else {
        throw e;
      }
    }
  }
  throw new Error(
    `Model version '${name}@${version}' did not become available within ${pollingTimeout}ms.`,
  );
}
