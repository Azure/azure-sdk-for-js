// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { ShareClient } from "../../src/index.js";
import { createAndStartRecorder, getBSU, getUniqueName } from "../utils/index.js";
import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";

describe("File ID addressing - recorded", () => {
  let shareClient: ShareClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = await createAndStartRecorder(ctx);
    const serviceClient = getBSU(recorder);
    const shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async () => {
    await shareClient.delete();
    await recorder.stop();
  });

  it("getProperties by file ID returns the file name", async () => {
    const dirName = recorder.variable("dir", getUniqueName("dir"));
    const dirClient = shareClient.getDirectoryClient(dirName);
    const dirResponse = await dirClient.create();
    const fileName = recorder.variable("file", getUniqueName("file"));
    const fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(1024);

    const pathProperties = await fileClient.getProperties();
    assert.isUndefined(pathProperties.fileName);

    const properties = await shareClient.getShareFileClient(pathProperties.fileId!).getProperties();

    assert.equal(properties.fileName, fileName);
    assert.equal(properties.fileId, pathProperties.fileId);
    assert.equal(properties.fileParentId, dirResponse.fileId);
    assert.equal(properties.contentLength, 1024);
  });

  it("getProperties of a directory by file ID returns the directory name", async () => {
    const dirName = recorder.variable("dir", getUniqueName("dir"));
    const dirResponse = await shareClient.getDirectoryClient(dirName).create();

    const properties = await shareClient
      .getShareDirectoryClient(dirResponse.fileId!)
      .getProperties();

    assert.equal(properties.fileName, dirName);
    assert.equal(properties.fileId, dirResponse.fileId);
  });

  it("getFileLinks returns the file's properties and its link", async () => {
    const dirName = recorder.variable("dir", getUniqueName("dir"));
    const dirClient = shareClient.getDirectoryClient(dirName);
    const dirResponse = await dirClient.create();
    const fileName = recorder.variable("file", getUniqueName("file"));
    const fileResponse = await dirClient.getFileClient(fileName).create(1024, {
      fileHttpHeaders: {
        fileContentType: "text/plain",
        fileContentEncoding: "gzip",
        fileContentLanguage: "en-US",
        fileCacheControl: "no-cache",
        fileContentDisposition: "attachment",
      },
      metadata: { color: "blue" },
    });

    const result = await shareClient.getShareFileClient(fileResponse.fileId!).getFileLinks();

    assert.deepEqual(result.links, [{ name: fileName, parentId: dirResponse.fileId! }]);
    assert.equal(result.contentType, "text/plain");
    assert.equal(result.contentEncoding, "gzip");
    assert.equal(result.contentLanguage, "en-US");
    assert.equal(result.cacheControl, "no-cache");
    assert.equal(result.contentDisposition, "attachment");
    assert.equal(result.contentLength, 1024);
    assert.deepEqual(result.metadata, { color: "blue" });
    assert.equal(result.fileId, fileResponse.fileId);
    assert.strictEqual(result.isServerEncrypted, true);
  });

  it("getFileLinks of a file in the root directory returns parent ID 0", async () => {
    const fileName = recorder.variable("file", getUniqueName("file"));
    const fileResponse = await shareClient.rootDirectoryClient.getFileClient(fileName).create(1024);

    const result = await shareClient.getShareFileClient(fileResponse.fileId!).getFileLinks();

    assert.deepEqual(result.links, [{ name: fileName, parentId: "0" }]);
  });

  it("operations by an unknown file ID fail with 404", async () => {
    const fileClient = shareClient.getShareFileClient("11111111111111111111");

    await expect(fileClient.getProperties()).rejects.toHaveProperty("statusCode", 404);
    await expect(fileClient.getFileLinks()).rejects.toHaveProperty("statusCode", 404);
  });
});
