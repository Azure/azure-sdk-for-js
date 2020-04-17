// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

/**
 * This setup file populates a blob container with the files necessary
 * to train a Form Recognizer model with the training data
 */

import fs from "fs-extra";
import path from "path";

import {
  BlobServiceClient,
  AnonymousCredential,
  generateBlobSASQueryParameters,
  StorageSharedKeyCredential,
  ContainerSASPermissions,
  SASProtocol
} from "@azure/storage-blob";
import * as recorder from "@azure/test-utils-recorder";

import { setTrainingContainerSasUrl } from "../util/trainingContainer";

import * as dotenv from "dotenv";
dotenv.config();

if (!recorder.isPlaybackMode()) {
  const ASSET_PATH = path.join(__dirname, "..", "test-assets", "training");

  const blobEndpoint = process.env.BLOB_SAS_ENDPOINT;
  if (blobEndpoint === undefined) {
    throw new Error("No SAS URL provided for training data account");
  }

  const trainingContainerName = `training${new Date().getTime()}`;

  const [blobAccountName, blobAccountKey] = [
    process.env.BLOB_ACCOUNT_NAME,
    process.env.BLOB_ACCESS_KEY
  ];

  if (blobAccountName === undefined || blobAccountKey === undefined) {
    throw new Error(
      "Both BLOB_ACCOUNT_NAME and BLOB_ACCOUNT_KEY must be provided in the environment."
    );
  }

  const blobClient = new BlobServiceClient(blobEndpoint, new AnonymousCredential());

  // Set up training container
  before(async () => {
    console.log("=== Running pre-test hook to upload training data ===");

    const { containerClient: trainingContainer } = await blobClient.createContainer(
      trainingContainerName
    );

    const directories = [ASSET_PATH];
    while (directories.length > 0) {
      const directory = directories.shift() as string;
      // Upload all files in training folder to the container
      for (let baseName of await fs.readdir(directory)) {
        const fileName = path.join(directory, baseName);

        const stats = await fs.stat(fileName);

        if (stats.isDirectory()) {
          directories.push(fileName);
        } else {
          const blobName = path.relative(ASSET_PATH, fileName);
          console.log(`- Uploading ${blobName} ...`);

          await trainingContainer.uploadBlockBlob(
            blobName,
            () => fs.createReadStream(fileName),
            stats.size
          );
        }
      }
    }

    console.log("Done.");

    const oneHourFromNow = new Date(new Date().valueOf() + 60 * 60 * 1000);

    const sasQueryParameters = generateBlobSASQueryParameters(
      {
        containerName: trainingContainer.containerName,
        permissions: ContainerSASPermissions.parse("rl"),
        startsOn: new Date(),
        expiresOn: oneHourFromNow, // Tests time out in an hour any way
        protocol: SASProtocol.Https
      },
      new StorageSharedKeyCredential(blobAccountName, blobAccountKey)
    );

    const sasUrl = blobEndpoint.split("?")[0] + "?" + sasQueryParameters.toString();

    setTrainingContainerSasUrl(sasUrl);
  });

  // Tear down training container
  after(async () => {
    console.log("=== Running post-test hook to delete training data container ===");
    await blobClient.deleteContainer(trainingContainerName);
    console.log("Done.");
  });
}

