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
    await super.globalCleanup();
    await deleteFile(localFileName);
  }

  async runAsync(): Promise<void> {
    // ${Math.floor(Math.random() * 1000)}
    // so that the following service error is not seen
    // Error"The uploaded data is not contiguous or the position query parameter value is not equal to the length of the file after appending the uploaded data."
    await this.directoryClient
      .getFileClient(`newfile${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`)
      .uploadFile(localFileName);
  }
}
