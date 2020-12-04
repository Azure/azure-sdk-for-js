// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Aborter,
  ContainerURL,
  ServiceURL,
  SharedKeyCredential,
  StorageURL
} from "@azure/storage-blob";
import { PerfStressTest } from "@azure/test-utils-perfstress";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });

export abstract class StorageBlobTest<TOptions> extends PerfStressTest<TOptions> {
  blobServiceClient: ServiceURL;
  containerClient: ContainerURL;
  static containerName = `newcontainer${new Date().getTime()}`;

  constructor() {
    super();
    const account = StorageBlobTest.getEnvVar("ACCOUNT_NAME");
    const accountKey = StorageBlobTest.getEnvVar("ACCOUNT_KEY");

    const sharedKeyCredential = new SharedKeyCredential(account, accountKey);

    this.blobServiceClient = new ServiceURL(
      `https://${account}.blob.core.windows.net`,
      StorageURL.newPipeline(sharedKeyCredential)
    );
    this.containerClient = ContainerURL.fromServiceURL(this.blobServiceClient, StorageBlobTest.containerName);
  }

  public async globalSetup() {
    const createContainerResponse = await this.containerClient.create(Aborter.none);
    console.log(
      `Create container ${StorageBlobTest.containerName} successfully`,
      createContainerResponse.requestId
    );
  }

  public async globalCleanup() {
    const deleteContainerResponse = await this.containerClient.delete(Aborter.none);
    console.log(
      `Deleted container ${StorageBlobTest.containerName} successfully`,
      deleteContainerResponse.requestId
    );
  }

  static getEnvVar(name: string) {
    const val = process.env[name];
    if (!val) {
      throw `Environment variable ${name} is not defined.`;
    }
    return val;
  }
}
