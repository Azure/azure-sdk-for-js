// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Aborter,
  BlobURL,
  BlockBlobURL,
  ContainerURL,
  ServiceURL,
  SharedKeyCredential,
  StorageURL
} from "@azure/storage-blob";
import { PerfStressTest, PerfStressOptionDictionary } from "@azure/test-utils-perfstress";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });

interface StorageBlobUploadTestOptions {
  size: number;
}

const account = process.env.ACCOUNT_NAME || "";
const accountKey = process.env.ACCOUNT_KEY || "";

const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

const blobServiceClient = new ServiceURL(
  // When using AnonymousCredential, following url should include a valid SAS or support public access
  `https://${account}.blob.core.windows.net`,
  StorageURL.newPipeline(sharedKeyCredential)
);
const containerName = `newcontainer${new Date().getTime()}`;
const blobName = `newblob${new Date().getTime()}`;
const containerClient = ContainerURL.fromServiceURL(blobServiceClient, containerName);
const blobClient = BlobURL.fromContainerURL(containerClient, blobName);
const blockBlobClient = BlockBlobURL.fromBlobURL(blobClient);

export class StorageBlobUploadTest extends PerfStressTest<StorageBlobUploadTestOptions> {
  public options: PerfStressOptionDictionary<StorageBlobUploadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 10
    }
  };

  public async globalSetup() {
    const createContainerResponse = await containerClient.create(Aborter.none);
    console.log(
      `Create container ${containerName} successfully`,
      createContainerResponse.requestId
    );
  }

  public async globalCleanup() {
    const deleteContainerResponse = await containerClient.delete(Aborter.none);
    console.log(
      `Deleted container ${containerName} successfully`,
      deleteContainerResponse.requestId
    );
  }

  async runAsync(): Promise<void> {
    await blockBlobClient.upload(
      Aborter.none,
      Buffer.alloc(this.parsedOptions.size.value!),
      this.parsedOptions.size.value!
    );
  }
}
