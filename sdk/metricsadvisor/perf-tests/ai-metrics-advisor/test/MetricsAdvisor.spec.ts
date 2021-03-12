// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, getEnvVar } from "@azure/test-utils-perfstress";
import { MetricsAdvisorAdministrationClient, MetricsAdvisorClient } from "@azure/metrics-advisor";

// Expects the .env file at the same level
import * as dotenv from "dotenv";
dotenv.config();

export abstract class MetricsAdvisorTest<TOptions> extends PerfStressTest<TOptions> {
  blobServiceClient: MetricsAdvisorClient;
  containerClient: MetricsAdvisorAdministrationClient;

  constructor() {
    super();
    // const connectionString = getEnvVar("STORAGE_CONNECTION_STRING");
    // this.sharedKeyCredential = new StorageSharedKeyCredential(
    //   getValueInConnString(connectionString, "AccountName"),
    //   getValueInConnString(connectionString, "AccountKey")
    // );
    // this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    // this.containerClient = this.blobServiceClient.getContainerClient(StorageBlobTest.containerName);
  }

  public async globalSetup() {
    await this.containerClient.create();
  }

  public async globalCleanup() {
    await this.containerClient.delete();
  }
}
