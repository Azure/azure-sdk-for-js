// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, getEnvVar } from "@azure/test-utils-perfstress";

import {
  ServiceURL,
  ShareURL,
  DirectoryURL,
  StorageURL,
  SharedKeyCredential,
  Aborter
} from "@azure/storage-file";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });

export abstract class StorageFileShareTest<TOptions> extends PerfStressTest<TOptions> {
  shareServiceClient: ServiceURL;
  shareClient: ShareURL;
  directoryClient: DirectoryURL;
  static shareName = `newshare${new Date().getTime()}`;
  static dirName = `newdirectory${new Date().getTime()}`;

  constructor() {
    super();
    const connectionString = StorageFileShareTest.getEnvVar("STORAGE_CONNECTION_STRING");
    const accountName = getValueInConnString(connectionString, "AccountName");
    const accountKey = getValueInConnString(connectionString, "AccountKey");
    const sharedKeyCredential = new SharedKeyCredential(accountName, accountKey);
    this.shareServiceClient = new ServiceURL(
      `https://${accountName}.file.core.windows.net`,
      StorageURL.newPipeline(sharedKeyCredential)
    );
    this.shareClient = ShareURL.fromServiceURL(
      this.shareServiceClient,
      StorageFileShareTest.shareName
    );
    this.directoryClient = DirectoryURL.fromShareURL(
      this.shareClient,
      StorageFileShareTest.dirName
    );
  }

  public async globalSetup() {
    await this.shareClient.create(Aborter.none);
    await this.directoryClient.create(Aborter.none);
  }

  public async globalCleanup() {
    await this.shareClient.delete(Aborter.none);
  }
}

/**
 * Reads a readable stream into a buffer.
 *
 * @export
 * @param {NodeJS.ReadableStream} stream A Node.js Readable stream
 * @param {string} [encoding] Encoding of the Readable stream
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

export function getValueInConnString(
  connectionString: string,
  argument: "AccountName" | "AccountKey"
) {
  const elements = connectionString.split(";");
  for (const element of elements) {
    if (element.trim().startsWith(argument)) {
      return element.trim().match(argument + "=(.*)")![1];
    }
  }
  return "";
}
