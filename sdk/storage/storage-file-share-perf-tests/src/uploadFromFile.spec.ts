// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { randomUUID } from "node:crypto";
import { PerfOptionDictionary } from "@azure-tools/test-perf";
import { ShareFileClient } from "@azure/storage-file-share";
import { existsSync } from "node:fs";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import { StorageFileShareTest } from "./storageTest.spec.js";

interface StorageFileShareUploadFromFileTestOptions {
  size: number;
}

const localDirName = "temp";
const localFileName = `${localDirName}/upload-from-test-temp-file.txt`;

export class StorageFileShareUploadFromFileTest extends StorageFileShareTest<StorageFileShareUploadFromFileTestOptions> {
  fileClient: ShareFileClient;
  public options: PerfOptionDictionary<StorageFileShareUploadFromFileTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 1024,
    },
  };

  constructor() {
    super();
    const fileName = randomUUID();
    this.fileClient = this.directoryClient.getFileClient(fileName);
  }

  public async globalSetup() {
    await super.globalSetup();
    if (!existsSync(localDirName)) await mkdir(localDirName);
    await writeFile(localFileName, Buffer.alloc(this.parsedOptions.size.value!));
  }

  public async globalCleanup() {
    await unlink(localFileName);
    await super.globalCleanup();
  }

  async run(): Promise<void> {
    await this.fileClient.uploadFile(localFileName);
  }
}
