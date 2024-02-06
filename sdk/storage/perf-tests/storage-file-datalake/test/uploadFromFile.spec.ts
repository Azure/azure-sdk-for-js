// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StorageDFSUploadTest } from "./upload.spec";
import fs from "fs";
import util from "util";
const writeFile = util.promisify(fs.writeFile);
const fileExists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);
const deleteFile = util.promisify(fs.unlink);

const localDirName = "temp";
const localFileName = `${localDirName}/upload-from-test-temp-file.txt`;

export class StorageDFSUploadFromFileTest extends StorageDFSUploadTest {
  public async globalSetup() {
    await super.globalSetup();
    if (!(await fileExists(localDirName))) await mkdir(localDirName);
    await writeFile(localFileName, Buffer.alloc(this.parsedOptions.size.value!));
  }

  public async globalCleanup() {
    await deleteFile(localFileName);
    await super.globalCleanup();
  }

  async run(): Promise<void> {
    await this.fileClient.uploadFile(localFileName);
  }
}
