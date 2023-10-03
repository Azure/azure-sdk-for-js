// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { ShareFileClient } from "@azure/storage-file-share";
import { StorageFileShareTest } from "./storageTest.spec";
import { v4 as generateUuid } from "uuid";

export class StorageFileGetPropertiesTest extends StorageFileShareTest<{}> {
  static fileName = generateUuid();
  fileClient: ShareFileClient;
  public options: PerfOptionDictionary<{}> = {};

  constructor() {
    super();
    this.fileClient = this.directoryClient.getFileClient(
      StorageFileGetPropertiesTest.fileName
    );
  }

  public async globalSetup() {
    await super.globalSetup();
    await this.fileClient.uploadData(Buffer.alloc(10240));
  }

  async run(): Promise<void> {
    await this.fileClient.getProperties();
  }
}
