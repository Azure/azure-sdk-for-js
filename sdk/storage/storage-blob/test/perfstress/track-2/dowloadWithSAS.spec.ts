// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { StorageBlobTest } from "./storageTest.spec";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
import {
  BlockBlobClient,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  BlobClient
} from "../../../src";
import { streamToBuffer3 } from "../../../src/utils/utils.node";
import { getValueInConnString } from "../../../src/utils/utils.common";
dotenv.config();

interface StorageBlobDownloadTestOptions {
  size: number;
}

export class StorageBlobDownloadWithSASTest extends StorageBlobTest<
  StorageBlobDownloadTestOptions
> {
  public options: PerfStressOptionDictionary<StorageBlobDownloadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 1024
    }
  };

  static blobName = `newblob${new Date().getTime()}`;
  blockBlobClient: BlockBlobClient;
  sasUrl: string;

  constructor() {
    super();
    this.blockBlobClient = this.containerClient.getBlockBlobClient(
      StorageBlobDownloadWithSASTest.blobName
    );
    const sasParams = generateBlobSASQueryParameters(
      {
        // Expires in a day
        expiresOn: new Date(new Date().getTime() + 86400000),
        containerName: StorageBlobDownloadWithSASTest.containerName,
        blobName: StorageBlobDownloadWithSASTest.blobName,
        permissions: BlobSASPermissions.parse("r")
      },
      this.sharedKeyCredential
    ).toString();
    
    this.sasUrl = `https://${getValueInConnString(
      StorageBlobTest.getEnvVar("STORAGE_CONNECTION_STRING"),
      "AccountName"
    )}.blob.core.windows.net/${StorageBlobDownloadWithSASTest.containerName}/${
      StorageBlobDownloadWithSASTest.blobName
    }?${sasParams}`;
  }

  public async globalSetup() {
    await super.globalSetup();

    // Create a blob
    await this.blockBlobClient.upload(
      Buffer.alloc(this.parsedOptions.size.value!),
      this.parsedOptions.size.value!
    );
  }

  async runAsync(): Promise<void> {
    const blobClient = new BlobClient(this.sasUrl);
    const downloadResponse = await blobClient.download();
    await streamToBuffer3(downloadResponse.readableStreamBody!);
  }
}
