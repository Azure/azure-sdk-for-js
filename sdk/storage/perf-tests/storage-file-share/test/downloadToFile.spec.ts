// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { ShareFileClient } from "@azure/storage-file-share";
import fs from "fs";
import util from "util";
const fileExists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);
const deleteFile = util.promisify(fs.unlink);

import { StorageFileShareTest } from "./storageTest.spec";
import { v4 as generateUuid } from "uuid";
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
  static fileName = generateUuid();
  fileClient: ShareFileClient;
  localFileName: string;

  constructor() {
    super();
    this.fileClient = this.directoryClient.getFileClient(
      StorageFileShareDownloadToFileTest.fileName
    );
    this.localFileName = generateUuid();
  }

  public async globalSetup() {
    await super.globalSetup();
    if (!(await fileExists(localDirName))) await mkdir(localDirName);
    await this.fileClient.uploadData(Buffer.alloc(this.parsedOptions.size.value!));
  }

  public async cleanup() {
    await deleteFile(`${localDirName}/${this.localFileName}`);
  }

  async run(): Promise<void> {
    await this.fileClient.downloadToFile(`${localDirName}/${this.localFileName}`, 0);
  }
}
