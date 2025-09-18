// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageDFSUploadTest } from "./upload.spec.js";
import { existsSync } from "node:fs";
import { mkdir, unlink, writeFile } from "node:fs/promises";

const localDirName = "temp";
const localFileName = `${localDirName}/upload-from-test-temp-file.txt`;

export class StorageDFSUploadFromFileTest extends StorageDFSUploadTest {
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
