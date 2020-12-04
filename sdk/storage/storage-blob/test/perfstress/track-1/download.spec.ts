// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Aborter,
  BlobURL,
  BlockBlobURL
} from "@azure/storage-blob";
import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
import { StorageBlobTest } from "./storageTest.spec";
dotenv.config({ path: "../../../.env" });

interface StorageBlobDownloadTestOptions {
  size: number;
}

export class StorageBlobDownloadTest extends StorageBlobTest<StorageBlobDownloadTestOptions> {
  public options: PerfStressOptionDictionary<StorageBlobDownloadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 1024
    }
  };

  static blobName = `newblob${new Date().getTime()}`;
  blockBlobClient: BlockBlobURL;

  constructor() {
    super();
    this.blockBlobClient = BlockBlobURL.fromBlobURL(
      BlobURL.fromContainerURL(this.containerClient, StorageBlobDownloadTest.blobName)
    );
  }

  public async globalSetup() {
    await super.globalSetup();
    // Create a blob
    const uploadBlobResponse = await this.blockBlobClient.upload(
      Aborter.none,
      Buffer.alloc(this.parsedOptions.size.value!),
      this.parsedOptions.size.value!
    );
    console.log(`Uploaded block blob ${StorageBlobDownloadTest.blobName} successfully`, uploadBlobResponse.requestId);
  }

  async runAsync(): Promise<void> {
    const downloadResponse = await this.blockBlobClient.download(Aborter.none, 0);
    await streamToBuffer3(downloadResponse.readableStreamBody!);
  }
}

/**
 * Reads a readable stream into a buffer.
 *
 * @export
 * @param {NodeJS.ReadableStream} stream A Node.js Readable stream
 * @returns {Promise<Buffer>} with the count of bytes read.
 */
export async function streamToBuffer3(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream.on("data", (data: Buffer | string) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}
