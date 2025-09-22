// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfOptionDictionary } from "@azure-tools/test-perf";
import { ShareFileClient } from "@azure/storage-file-share";
import { StorageFileShareTest } from "./storageTest.spec.js";
import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, unlink } from "node:fs/promises";

interface StorageFileShareDownloadTestOptions {
  size: number;
}

const localDirName = "temp";

export class StorageFileShareDownloadToFileTest extends StorageFileShareTest<StorageFileShareDownloadTestOptions> {
  public options: PerfOptionDictionary<StorageFileShareDownloadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 1024,
    },
  };
  static fileName = randomUUID();
  fileClient: ShareFileClient;
  localFileName: string;

  constructor() {
    super();
    this.fileClient = this.directoryClient.getFileClient(
      StorageFileShareDownloadToFileTest.fileName,
    );
    this.localFileName = randomUUID();
  }

  public async globalSetup() {
    await super.globalSetup();
    if (!existsSync(localDirName)) await mkdir(localDirName);
    await this.fileClient.uploadData(Buffer.alloc(this.parsedOptions.size.value!));
  }

  public async cleanup() {
    await unlink(`${localDirName}/${this.localFileName}`);
  }

  async run(): Promise<void> {
    await this.fileClient.downloadToFile(`${localDirName}/${this.localFileName}`, 0);
  }
}
