// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest } from "@azure/test-utils-perfstress";

import {
  DataLakeServiceClient,
  StorageSharedKeyCredential,
  DataLakeFileSystemClient,
  DataLakeDirectoryClient
} from "../../../src";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config();

export abstract class StorageDFSTest<TOptions> extends PerfStressTest<TOptions> {
  datalakeServiceClient: DataLakeServiceClient;
  fileSystemClient: DataLakeFileSystemClient;
  directoryClient: DataLakeDirectoryClient;
  static fileSystemName = `newfs${new Date().getTime()}`;
  static directoryName = `newdirectory${new Date().getTime()}`;

  constructor() {
    super();
    const connectionString = StorageDFSTest.getEnvVar("STORAGE_CONNECTION_STRING");
    const accountName = getValueInConnString(connectionString, "AccountName");
    const accountKey = getValueInConnString(connectionString, "AccountKey");
    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

    this.datalakeServiceClient = new DataLakeServiceClient(
      `https://${accountName}.dfs.core.windows.net`,
      sharedKeyCredential
    );

    this.fileSystemClient = this.datalakeServiceClient.getFileSystemClient(
      StorageDFSTest.fileSystemName
    );

    this.directoryClient = this.fileSystemClient.getDirectoryClient(StorageDFSTest.directoryName);
  }

  public async globalSetup() {
    await this.fileSystemClient.create();
    await this.directoryClient.create();
  }

  public async globalCleanup() {
    await this.fileSystemClient.delete();
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
