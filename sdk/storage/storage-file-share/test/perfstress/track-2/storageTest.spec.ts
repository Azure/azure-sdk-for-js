// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, getEnvVar } from "@azure/test-utils-perfstress";

import { ShareClient, ShareDirectoryClient, ShareServiceClient } from "../../../src";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
import { generateUuid } from "@azure/core-http";
dotenv.config();

export abstract class StorageFileShareTest<TOptions> extends PerfStressTest<TOptions> {
  shareServiceClient: ShareServiceClient;
  shareClient: ShareClient;
  directoryClient: ShareDirectoryClient;
  static shareName = generateUuid();
  static dirName = generateUuid();

  constructor() {
    super();
    this.shareServiceClient = ShareServiceClient.fromConnectionString(
      getEnvVar("STORAGE_CONNECTION_STRING")
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
}
