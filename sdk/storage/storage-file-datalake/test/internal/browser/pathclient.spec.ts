// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import type { DataLakeFileSystemClient, DataLakeFileClient } from "../../../src/index.js";
import { createDataLakeServiceClient } from "../../utils/clients.js";
import { getUniqueName } from "../../utils/testHelpers.js";
import { bodyToString } from "../../utils/browser/testHelpers.js";
import { getTestCpkInfo } from "../../utils/injectables.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("DataLakePathClient browser only", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileName: string;
  let fileClient: DataLakeFileClient;
  const content = "Hello World";

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const serviceClient = await createDataLakeServiceClient("TokenCredential", { recorder });
    fileSystemName = getUniqueName("filesystem", { recorder });
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
    fileName = getUniqueName("file", { recorder });
    fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
    await fileClient.append(content, 0, content.length);
    await fileClient.flush(content.length);
  });

  afterEach(async () => {
    await fileSystemClient.deleteIfExists();
    await recorder.stop();
  });

  it("read with default parameters", async () => {
    const result = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(result), content);
  });

  it("read a file with encryption context set", async () => {
    const testFileName = getUniqueName("file1", { recorder });
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const encryptionContext = "EncryptionContext";
    await testFileClient.create({ encryptionContext: encryptionContext });
    await testFileClient.append(content, 0, content.length);
    await testFileClient.flush(content.length);
    const result = await testFileClient.read();
    assert.equal(result.encryptionContext, encryptionContext);
    assert.deepStrictEqual(await bodyToString(result), content);
    assert.exists(result.createdOn);
  });

  it("read a file with permissions set", async () => {
    const testFileName = getUniqueName("file1", { recorder });
    const testFileClient = fileSystemClient.getFileClient(testFileName);
    const permissionString = "0777";
    const umask = "0057";
    await testFileClient.create({ permissions: permissionString, umask: umask });
    await testFileClient.append(content, 0, content.length);
    await testFileClient.flush(content.length);
    const result = await testFileClient.read();
    const permissions = {
      owner: {
        read: true,
        write: true,
        execute: true,
      },
      group: {
        read: false,
        write: true,
        execute: false,
      },
      other: {
        read: false,
        write: false,
        execute: false,
      },
      stickyBit: false,
      extendedAcls: false,
    };
    assert.deepEqual(result.permissions, permissions);
    assert.deepStrictEqual(await bodyToString(result), content);
    assert.exists(result.createdOn);
  });

  it("read should not have aborted error after read finishes", async () => {
    const aborter = new AbortController();
    const result = await fileClient.read(0, undefined, { abortSignal: aborter.signal });
    assert.deepStrictEqual(await bodyToString(result), content);
    aborter.abort();
  });

  it("read all parameters set", async () => {
    // For browser scenario, please ensure CORS settings exposed headers: content-md5,x-ms-content-crc64
    // So JS can get contentCrc64 and contentMD5.
    const result1 = await fileClient.read(0, 1, {
      rangeGetContentCrc64: true,
    });
    assert.isDefined(result1.clientRequestId);
    const content1 = await bodyToString(result1);
    assert.deepStrictEqual(content1, content[0]);
    assert.isDefined(result1.clientRequestId);

    const result2 = await fileClient.read(1, 1, {
      rangeGetContentMD5: true,
    });
    assert.isDefined(result2.clientRequestId);

    let exceptionCaught = false;
    try {
      await fileClient.read(2, 1, {
        rangeGetContentMD5: true,
        rangeGetContentCrc64: true,
      });
    } catch (err: any) {
      exceptionCaught = true;
    }
    assert.isDefined(exceptionCaught);
  });

  it("file create, append, flush and read with cpk", async () => {
    const cpkFileName = getUniqueName("cpkFile", { recorder });
    const cpkFileClient = fileSystemClient.getFileClient(cpkFileName);
    await cpkFileClient.create({
      customerProvidedKey: getTestCpkInfo(),
    });
    await cpkFileClient.append(content, 0, content.length, {
      customerProvidedKey: getTestCpkInfo(),
    });
    await cpkFileClient.flush(content.length, {
      customerProvidedKey: getTestCpkInfo(),
    });

    const result = await cpkFileClient.read(0, undefined, {
      customerProvidedKey: getTestCpkInfo(),
    });
    assert.deepStrictEqual(await bodyToString(result), content);
  });
});
