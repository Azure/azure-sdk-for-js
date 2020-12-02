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
import { PerfStressOptionDictionary, PerfStressTest } from "@azure/test-utils-perfstress";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });

interface StorageBlobListTestOptions {
  count: number;
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

export class StorageBlobListTest extends PerfStressTest<StorageBlobListTestOptions> {
  public options: PerfStressOptionDictionary<StorageBlobListTestOptions> = {
    count: {
      required: true,
      description: "Number of blobs to be listed",
      longName: "count",
      defaultValue: 10
    },
    size: {
      required: true,
      description: "Size of each blob in bytes",
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

    for (let i = 0; i < this.parsedOptions.count.value!; i++) {
      await blockBlobClient.upload(
        Aborter.none,
        Buffer.alloc(this.parsedOptions.size.value!),
        this.parsedOptions.size.value!
      );
    }
  }

  public async globalCleanup() {
    const deleteContainerResponse = await containerClient.delete(Aborter.none);
    console.log(
      `Deleted container ${containerName} successfully`,
      deleteContainerResponse.requestId
    );
  }

  async runAsync(): Promise<void> {
    // List blobs
    let marker = undefined;
    do {
      marker = (await containerClient.listBlobFlatSegment(Aborter.none, marker)).nextMarker;
    } while (marker);
  }
}
