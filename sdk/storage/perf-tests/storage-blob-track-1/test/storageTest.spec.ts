// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 as generateUuid } from "uuid";
import {
  Aborter,
  ContainerURL,
  ServiceURL,
  SharedKeyCredential,
  StorageURL
} from "@azure/storage-blob";
import { PerfTest, getEnvVar } from "@azure/test-utils-perf";

// Expects the .env file at the same level
import * as dotenv from "dotenv";
dotenv.config();

export abstract class StorageBlobTest<TOptions> extends PerfTest<TOptions> {
  blobServiceClient: ServiceURL;
  containerClient: ContainerURL;
  static containerName = generateUuid();

  constructor() {
    super();
    const connectionString = getEnvVar("STORAGE_CONNECTION_STRING");
    const accountName = getValueInConnectionString(connectionString, "AccountName");
    const accountKey = getValueInConnectionString(connectionString, "AccountKey");

    const sharedKeyCredential = new SharedKeyCredential(accountName, accountKey);
    this.blobServiceClient = new ServiceURL(
      `https://${accountName}.blob.core.windows.net`,
      StorageURL.newPipeline(sharedKeyCredential)
    );
    this.containerClient = ContainerURL.fromServiceURL(
      this.blobServiceClient,
      StorageBlobTest.containerName
    );
  }

  public async globalSetup() {
    await this.containerClient.create(Aborter.none);
  }

  public async globalCleanup() {
    await this.containerClient.delete(Aborter.none);
  }
}

export function getValueInConnectionString(
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
