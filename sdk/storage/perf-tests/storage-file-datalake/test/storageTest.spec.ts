// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getEnvVar, PerfTest } from "@azure/test-utils-perf";

import {
  DataLakeServiceClient,
  StorageSharedKeyCredential,
  DataLakeFileSystemClient,
  DataLakeDirectoryClient,
} from "@azure/storage-file-datalake";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
import { v4 as generateUuid } from "uuid";
dotenv.config();

export abstract class StorageDFSTest<TOptions> extends PerfTest<TOptions> {
  datalakeServiceClient: DataLakeServiceClient;
  fileSystemClient: DataLakeFileSystemClient;
  directoryClient: DataLakeDirectoryClient;
  static fileSystemName = generateUuid();
  static directoryName = generateUuid();

  constructor() {
    super();
    const connectionString = getEnvVar("STORAGE_CONNECTION_STRING");
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
