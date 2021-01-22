// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { generateUuid } from "@azure/core-http";
import {
  Aborter,
  ContainerURL,
  ServiceURL,
  SharedKeyCredential,
  StorageURL
} from "@azure/storage-blob";
import { PerfStressTest, getEnvVar } from "@azure/test-utils-perfstress";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });

export abstract class StorageBlobTest<TOptions> extends PerfStressTest<TOptions> {
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
