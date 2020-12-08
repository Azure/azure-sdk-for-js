// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest } from "@azure/test-utils-perfstress";

import { ShareClient, ShareDirectoryClient, ShareServiceClient } from "../../../src";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();

export abstract class StorageFileShareTest<TOptions> extends PerfStressTest<TOptions> {
  shareServiceClient: ShareServiceClient;
  shareClient: ShareClient;
  directoryClient: ShareDirectoryClient;
  static shareName = `newshare${new Date().getTime()}`;
  static dirName = `newdirectory${new Date().getTime()}`;

  constructor() {
    super();
    this.shareServiceClient = ShareServiceClient.fromConnectionString(
      StorageFileShareTest.getEnvVar("STORAGE_CONNECTION_STRING")
    );
    this.shareClient = this.shareServiceClient.getShareClient(StorageFileShareTest.shareName);
    this.directoryClient = this.shareClient.getDirectoryClient(StorageFileShareTest.dirName);
  }

  public async globalSetup() {
    await this.shareClient.create();
    await this.directoryClient.create();
  }

  public async globalCleanup() {
    await this.shareClient.delete();
  }

  static getEnvVar(name: string) {
    const val = process.env[name];
    if (!val) {
      throw `Environment variable ${name} is not defined.`;
    }
    return val;
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
export async function streamToBuffer3(
  readableStream: NodeJS.ReadableStream,
  encoding?: string
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream.on("data", (data: Buffer | string) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data, encoding));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}
