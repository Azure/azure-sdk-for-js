// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "node:fs";
import nodePath from "node:path";
import { ContainerClient } from "@azure/storage-blob";
import type { DatasetUploadInternalOptions, AIProjectContext as Client } from "../index.js";
import type { DatasetVersionUnion, PendingUploadRequest } from "../../models/models.js";
import { logger } from "../../logger.js";
import { createOrUpdate, pendingUpload } from "./operations.js";

// Internal helper method to create a new dataset and return a ContainerClient from azure-storage-blob package, to the dataset's blob storage.
async function createDatasetAndGetItsContainer(
  context: Client,
  name: string,
  version: string,
  options?: DatasetUploadInternalOptions,
): Promise<{ containerClient: ContainerClient; version: string }> {
  const { connectionName, projectOptions = {} } = options || {};
  // Start a pending upload to get the container URL with SAS token
  const pendingUploadResponse = await pendingUpload(context, name, version, {
    pendingUploadType: "BlobReference",
    connectionName,
  } as PendingUploadRequest);

  const blobReference = pendingUploadResponse.blobReference;
  // Validate the response
  if (!blobReference) {
    throw new Error("Blob reference for consumption is not present");
  }

  if (!blobReference.credential?.type) {
    throw new Error("Credential type is not present");
  }

  if (blobReference.credential.type !== "SAS") {
    throw new Error("Credential type is not SAS");
  }

  if (!blobReference.blobUri) {
    throw new Error("Blob URI is not present or empty");
  }

  // Log metadata only; upload URLs can contain credentials.
  logger.verbose(
    `[createDatasetAndGetItsContainer] pendingUploadResponse.pendingUploadId = ${pendingUploadResponse.pendingUploadId}`,
  );
  logger.verbose(
    `[createDatasetAndGetItsContainer] pendingUploadResponse.pendingUploadType = ${pendingUploadResponse.pendingUploadType}`,
  );
  logger.verbose(
    `[createDatasetAndGetItsContainer] blobReference.storageAccountArmId = ${blobReference.storageAccountArmId}`,
  );
  logger.verbose(
    `[createDatasetAndGetItsContainer] blobReference.credential.type = ${blobReference.credential.type}`,
  );

  // Create container client from the blob URI (which includes the SAS token)
  const containerClient = new ContainerClient(blobReference.credential.sasUri);

  const pipeline = containerClient["storageClientContext"].pipeline;
  for (const { policy } of projectOptions.additionalPolicies ?? []) {
    pipeline.addPolicy(policy, { afterPhase: "Sign" });
  }

  return {
    containerClient,
    version,
  };
}

export async function uploadFile(
  context: Client,
  name: string,
  version: string,
  filePath: string,
  options?: DatasetUploadInternalOptions,
): Promise<DatasetVersionUnion> {
  // if file does not exist

  const fileExists = fs.existsSync(filePath);
  if (!fileExists) {
    throw new Error(`File does not exist at path: ${filePath}`);
  }
  // Check if the file is a directory
  const isDirectory = fs.lstatSync(filePath).isDirectory();
  if (isDirectory) {
    throw new Error(`The provided file is actually a folder. Use method uploadFolder instead`);
  }

  const { containerClient, version: outputVersion } = await createDatasetAndGetItsContainer(
    context,
    name,
    version,
    options,
  );
  // file name as blob name
  const blobName = nodePath.basename(filePath);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadStream(fs.createReadStream(filePath));

  const datasetVersion = await createOrUpdate(context, name, outputVersion, {
    name: name,
    version: outputVersion,
    type: "uri_file",
    dataUri: blockBlobClient.url,
  });
  return datasetVersion;
}

export async function uploadFolder(
  context: Client,
  name: string,
  version: string,
  folderPath: string,
  options?: DatasetUploadInternalOptions,
): Promise<DatasetVersionUnion> {
  // Check if the folder exists
  const folderExists = fs.existsSync(folderPath);
  if (!folderExists) {
    throw new Error(`Folder does not exist at path: ${folderPath}`);
  }
  // Check if the folder is a file
  const isFile = fs.lstatSync(folderPath).isFile();
  if (isFile) {
    throw new Error(`The provided path is actually a file. Use method uploadFile instead`);
  }

  const { containerClient, version: outputVersion } = await createDatasetAndGetItsContainer(
    context,
    name,
    version,
    options,
  );

  // Helper function to recursively get all files in a directory
  async function getAllFiles(dir: string, fileList: string[] = []): Promise<string[]> {
    const files = await fs.promises.readdir(dir);

    for (const file of files) {
      const filePath = `${dir}/${file}`;
      const stat = await fs.promises.lstat(filePath);

      if (stat.isDirectory()) {
        await getAllFiles(filePath, fileList);
      } else {
        fileList.push(filePath);
      }
    }

    return fileList;
  }

  // Get all files in the folder
  const allFiles = await getAllFiles(folderPath);
  let filteredFiles = allFiles;
  if (options?.filePattern) {
    try {
      const filePattern = new RegExp(options.filePattern);
      filteredFiles = allFiles.filter((file) => filePattern.test(file));
    } catch {
      // If regex pattern is invalid, ignore the pattern and upload all files
    }
  }

  if (filteredFiles.length === 0) {
    throw new Error("The provided folder is empty.");
  }

  // Upload each file to blob storage while maintaining relative paths
  for (const filePath of filteredFiles) {
    // Create blob name as relative path from the base folder
    const relativePath = nodePath.relative(folderPath, filePath).split(nodePath.sep).join("/");

    logger.verbose(
      `[uploadFolderAndCreate] Start uploading file '${filePath}' as blob '${relativePath}'`,
    );

    // Get a block blob client for the relative path
    const blobClient = containerClient.getBlockBlobClient(relativePath);

    // Upload the file using a readable stream for better performance
    const fileStream = fs.createReadStream(filePath);
    await blobClient.uploadStream(fileStream);
    logger.verbose(
      `[uploadFolderAndCreate] Done uploading file '${filePath}' as blob '${relativePath}'`,
    );
  }

  // Create dataset version that references this folder
  const datasetVersion = await createOrUpdate(context, name, outputVersion, {
    name: name,
    version: outputVersion,
    type: "uri_folder",
    dataUri: containerClient.url,
  });

  return datasetVersion;
}
