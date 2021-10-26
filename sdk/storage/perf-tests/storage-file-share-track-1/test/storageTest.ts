// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfTest, getEnvVar } from "@azure/test-utils-perf";
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
import { generateUuid } from "@azure/core-http";
dotenv.config();

export abstract class StorageFileShareTest<TOptions> extends PerfTest<TOptions> {
  shareServiceClient: ServiceURL;
  shareClient: ShareURL;
  directoryClient: DirectoryURL;
  static shareName = generateUuid();
  static dirName = generateUuid();

  constructor() {
    super();
    const connectionString = getEnvVar("STORAGE_CONNECTION_STRING");
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
