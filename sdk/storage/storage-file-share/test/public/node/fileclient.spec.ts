// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Buffer } from "node:buffer";
import fs from "node:fs";
import path from "node:path";
import { Duplex } from "node:stream";
import * as zlib from "zlib";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import type {
  ShareClient,
  ShareDirectoryClient,
  StorageSharedKeyCredential,
} from "@azure/storage-file-share";
import {
  FileSASPermissions,
  generateFileSASQueryParameters,
  getFileServiceAccountAudience,
  newPipeline,
  type ShareFileClient,
} from "@azure/storage-file-share";
import {
  readStreamToLocalFileWithLogs,
  createRandomLocalFile,
  bodyToString,
} from "../../utils/node/testHelpers.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import {
  createShareServiceClient,
  createShareFileClient,
  getSharedKeyCredential,
} from "../../utils/node/clients.js";
import { getUniqueName } from "../../utils/testHelpers.js";
import { getAccountKey, getAccountName } from "../../utils/injectables.js";
import { SimpleTokenCredential } from "../../utils/simpleToken.js";

describe.runIf(getAccountKey())("FileClient Node.js only", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;
  let fileName: string;
  let fileClient: ShareFileClient;
  const content = "Hello World";
  const timeoutForLargeFileUploadingTest = 20 * 60 * 1000;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const serviceClient = await createShareServiceClient("SharedKeyCredential", { recorder });
    assert.isDefined(serviceClient);
    shareName = getUniqueName("share", { recorder });
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = getUniqueName("dir", { recorder });
    dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    fileName = getUniqueName("file", { recorder });
    fileClient = dirClient.getFileClient(fileName);
  });

  afterEach(async () => {
    await shareClient.delete();
    await recorder.stop();
  });

  it("Default audience should work", async () => {
    await fileClient.create(1024);
    const fileClientWithOAuthToken = await createShareFileClient("TokenCredential", {
      shareName,
      directoryName: dirName,
      fileName,
      recorder,
    });

    const exist = await fileClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Customized audience should work", async () => {
    await fileClient.create(1024);
    const fileClientWithOAuthToken = await createShareFileClient("TokenCredential", {
      shareName,
      directoryName: dirName,
      fileName,
      recorder,
      options: {
        audience: getFileServiceAccountAudience(getAccountName()),
      },
    });
    const exist = await fileClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Bad audience should not work", async () => {
    await fileClient.create(1024);
    const token = await createTestCredential().getToken(
      "https://badaudience.file.core.windows.net/.default",
    );
    const fileClientWithSimpleOAuthToken = await createShareFileClient("Custom", {
      shareName,
      directoryName: dirName,
      fileName,
      recorder,
      credential: new SimpleTokenCredential(token!.token, new Date(token!.expiresOnTimestamp)),
      options: {
        fileRequestIntent: "backup",
      },
    });
    try {
      await fileClientWithSimpleOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }

    const fileClientWithOAuthToken = await createShareFileClient("TokenCredential", {
      shareName,
      directoryName: dirName,
      fileName,
      recorder,
      options: {
        audience: "https://badaudience.file.core.windows.net/.default",
      },
    });
    const exist = await fileClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it.runIf(isLiveMode())(
    "uploadData - large Buffer as data",
    { timeout: timeoutForLargeFileUploadingTest },
    async () => {
      await fileClient.create(257 * 1024 * 1024 * 1024);
      const tempFolderPath = "temp";
      if (!fs.existsSync(tempFolderPath)) {
        fs.mkdirSync(tempFolderPath);
      }
      const tempFileLarge = await createRandomLocalFile(tempFolderPath, 257, 1024 * 1024);
      await fileClient.uploadData(fs.readFileSync(tempFileLarge));

      const downloadResponse = await fileClient.download();
      const downloadedFile = path.join(
        tempFolderPath,
        getUniqueName("downloadfile.", { recorder }),
      );
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

      const downloadedData = await fs.readFileSync(downloadedFile);
      const uploadedData = await fs.readFileSync(tempFileLarge);

      fs.unlinkSync(downloadedFile);
      assert.isTrue(downloadedData.equals(uploadedData));
    },
  );

  it("upload with buffer and default parameters", async () => {
    const body = getUniqueName("randomstring", { recorder });
    const bodyBuffer = Buffer.from(body);

    await fileClient.create(body.length);
    await fileClient.uploadRange(bodyBuffer, 0, body.length);
    const result = await fileClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("uploadData with empty buffer", async () => {
    await fileClient.uploadData(Buffer.alloc(0));
    const response = await fileClient.download();
    assert.deepStrictEqual(await bodyToString(response), "");
  });

  it("upload with Node.js stream", async () => {
    const body = getUniqueName("randomstring", { recorder });

    await fileClient.create(body.length);
    await fileClient.uploadRange(
      () => {
        const duplexStream = new Duplex();
        duplexStream.push(body);
        duplexStream.push(null);
        return duplexStream;
      },
      0,
      body.length,
    );
    const result = await fileClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("upload with Chinese string body and default parameters", async () => {
    const body = getUniqueName("randomstring你好", { recorder });
    const bodyLength = Buffer.byteLength(body);

    await fileClient.create(bodyLength);
    await fileClient.uploadRange(body, 0, bodyLength);
    const result = await fileClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, bodyLength), body);
  });

  it.runIf(getAccountKey())("can be created with a url and a credential", async () => {
    await fileClient.create(content.length);
    const metadata = {
      a: "a",
      b: "b",
    };
    await fileClient.setMetadata(metadata);

    const newClient = await createShareFileClient("SharedKeyCredential", {
      shareName,
      directoryName: dirName,
      fileName,
      recorder,
    });
    assert.isDefined(newClient);

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it.runIf(getAccountKey())(
    "can be created with a url and a credential and an option bag",
    async () => {
      await fileClient.create(content.length);
      const metadata = {
        a: "a",
        b: "b",
      };
      await fileClient.setMetadata(metadata);

      const newClient = await createShareFileClient("SharedKeyCredential", {
        shareName,
        directoryName: dirName,
        fileName,
        recorder,
        options: {
          retryOptions: {
            maxTries: 5,
          },
        },
      });
      assert.isDefined(newClient);

      const result = await newClient.getProperties();

      assert.isAbove(result.etag!.length, 0);
      assert.isDefined(result.lastModified);
      assert.isDefined(result.requestId);
      assert.isDefined(result.version);
      assert.isDefined(result.date);
    },
  );

  it.runIf(getAccountKey())("can be created with a url and a pipeline", async () => {
    await fileClient.create(content.length);
    const metadata = {
      a: "a",
      b: "b",
    };
    await fileClient.setMetadata(metadata);

    const credential = getSharedKeyCredential();
    assert.isDefined(credential);

    const pipeline = newPipeline(credential!);
    const newClient = await createShareFileClient("Pipeline", {
      shareName,
      directoryName: dirName,
      fileName,
      recorder,
      pipeline,
    });

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("uploadRangeFromURL", async () => {
    await fileClient.create(1024);

    const fileContent = "a".repeat(512) + "b".repeat(512);
    await fileClient.uploadRange(fileContent, 0, fileContent.length);

    // Get a SAS for fileURL
    const credential = fileClient["credential"] as StorageSharedKeyCredential;
    const expiresOn = new Date(recorder.variable("now", new Date().toISOString()));
    expiresOn.setDate(expiresOn.getDate() + 1);
    const sas = generateFileSASQueryParameters(
      {
        expiresOn,
        shareName,
        filePath: `${dirName}/${fileName}`,
        permissions: FileSASPermissions.parse("r"),
      },
      credential,
    );

    const fileName2 = getUniqueName("file2", { recorder });
    const fileURL2 = dirClient.getFileClient(fileName2);

    await fileURL2.create(1024);

    await fileURL2.uploadRangeFromURL(`${fileClient.url}?${sas}`, 0, 0, 512);
    await fileURL2.uploadRangeFromURL(`${fileClient.url}?${sas}`, 512, 512, 512);

    const range1 = await fileURL2.download(0, 512);
    const range2 = await fileURL2.download(512, 512);

    assert.equal(await bodyToString(range1, 512), "a".repeat(512));
    assert.equal(await bodyToString(range2, 512), "b".repeat(512));
  });

  it.skipIf(isLiveMode())("uploadRangeFromURL - destination OAuth", async function () {
    // Pipeline config doesn't support well for file OAuth, disable live test for now.
    // Should add this back after pipeline config is enabled.
    await fileClient.create(1024);

    const fileContent = "a".repeat(512) + "b".repeat(512);
    await fileClient.uploadRange(fileContent, 0, fileContent.length);

    // Get a SAS for fileURL
    const credential = getSharedKeyCredential();
    assert.isDefined(credential);

    const expiresOn = new Date(recorder.variable("now", new Date().toISOString()));
    expiresOn.setDate(expiresOn.getDate() + 1);
    const sas = generateFileSASQueryParameters(
      {
        expiresOn,
        shareName,
        filePath: `${dirName}/${fileName}`,
        permissions: FileSASPermissions.parse("r"),
      },
      credential,
    );

    const fileName2 = getUniqueName("file2", { recorder });
    const fileURL2 = dirClient.getFileClient(fileName2);
    const fileClientWithOAuthToken = await createShareFileClient("TokenCredential", {
      shareName,
      directoryName: dirName,
      fileName: fileName2,
      recorder,
      options: {
        fileRequestIntent: "backup",
      },
    });

    await fileClientWithOAuthToken.create(1024);

    await fileClientWithOAuthToken.uploadRangeFromURL(`${fileClient.url}?${sas}`, 0, 0, 512);
    await fileClientWithOAuthToken.uploadRangeFromURL(`${fileClient.url}?${sas}`, 512, 512, 512);

    const range1 = await fileURL2.download(0, 512);
    const range2 = await fileURL2.download(512, 512);

    assert.equal(await bodyToString(range1, 512), "a".repeat(512));
    assert.equal(await bodyToString(range2, 512), "b".repeat(512));
  });

  it("uploadRangeFromURL with fileLastWriteOn", async () => {
    await fileClient.create(1024);

    const fileContent = "a".repeat(512) + "b".repeat(512);
    await fileClient.uploadRange(fileContent, 0, fileContent.length);

    // Get a SAS for fileURL
    const credential = fileClient["credential"] as StorageSharedKeyCredential;
    const expiresOn = new Date(recorder.variable("now", new Date().toISOString()));
    expiresOn.setDate(expiresOn.getDate() + 1);
    const sas = generateFileSASQueryParameters(
      {
        expiresOn,
        shareName,
        filePath: `${dirName}/${fileName}`,
        permissions: FileSASPermissions.parse("r"),
      },
      credential,
    );

    const fileName2 = getUniqueName("file2", { recorder });
    const fileURL2 = dirClient.getFileClient(fileName2);

    const createResult = await fileURL2.create(1024);
    const uploadRangeResult = await fileURL2.uploadRangeFromURL(
      `${fileClient.url}?${sas}`,
      0,
      0,
      512,
      {
        fileLastWrittenMode: "Preserve",
      },
    );
    assert.deepStrictEqual(
      createResult.fileLastWriteOn,
      uploadRangeResult.fileLastWriteTime,
      "File last write time should be expected.",
    );

    await fileURL2.uploadRangeFromURL(`${fileClient.url}?${sas}`, 512, 512, 512, {
      fileLastWrittenMode: "Now",
    });

    const range1 = await fileURL2.download(0, 512);
    const range2 = await fileURL2.download(512, 512);

    assert.equal(await bodyToString(range1, 512), "a".repeat(512));
    assert.equal(await bodyToString(range2, 512), "b".repeat(512));
  });

  // TODO: This test requires cross-service dependency on @azure/storage-blob
  // Skipped until a proper pattern for cross-service testing is established
  it.skip("uploadRangeFromURL - source bearer token", async () => {
    // This test requires getBlobServiceClient and getTokenCredential which are not available
    // The test uploads from blob storage to file storage using bearer token authorization
  });

  it("uploadRangeFromURL - should fail with copy source error message", async function () {
    await fileClient.create(1024);

    const fileContent = "a".repeat(512) + "b".repeat(512);
    await fileClient.uploadRange(fileContent, 0, fileContent.length);

    // Get a SAS for fileURL
    const credential = fileClient["credential"] as StorageSharedKeyCredential;
    const expiresOn = new Date(recorder.variable("now", new Date().toISOString()));
    expiresOn.setDate(expiresOn.getDate() - 1);
    const sas = generateFileSASQueryParameters(
      {
        expiresOn,
        shareName,
        filePath: `${dirName}/${fileName}`,
        permissions: FileSASPermissions.parse("r"),
      },
      credential,
    );

    const fileName2 = getUniqueName("file2", { recorder });
    const fileURL2 = dirClient.getFileClient(fileName2);

    await fileURL2.create(1024);

    try {
      await fileURL2.uploadRangeFromURL(`${fileClient.url}?${sas}`, 0, 0, 512);
    } catch (err) {
      assert.deepEqual((err as any).details.errorCode, "CannotVerifyCopySource");
      assert.deepEqual((err as any).details.copySourceStatusCode, 403);
      assert.deepEqual((err as any).details.copySourceErrorCode, "AuthenticationFailed");
      assert.deepEqual(
        (err as any).details.copySourceErrorMessage,
        "Server failed to authenticate the request. Make sure the value of Authorization header is formed correctly including the signature.",
      );
    }
  });

  it("startCopyFromURL - should fail with copy source error message", async function () {
    await fileClient.create(1024);

    // Get a SAS for fileURL
    const credential = fileClient["credential"] as StorageSharedKeyCredential;
    const expiresOn = new Date(recorder.variable("now", new Date().toISOString()));
    expiresOn.setDate(expiresOn.getDate() - 1);
    const sas = generateFileSASQueryParameters(
      {
        expiresOn,
        shareName,
        filePath: `${dirName}/${fileName}`,
        permissions: FileSASPermissions.parse("r"),
      },
      credential,
    );

    const fileName2 = getUniqueName("file2", { recorder });
    const fileURL2 = dirClient.getFileClient(fileName2);

    await fileURL2.create(1024);

    try {
      await fileURL2.startCopyFromURL(`${fileClient.url}?${sas}`);
    } catch (err) {
      assert.deepEqual((err as any).details.errorCode, "CannotVerifyCopySource");
      assert.deepEqual((err as any).details.copySourceStatusCode, 403);
      assert.deepEqual((err as any).details.copySourceErrorCode, "AuthenticationFailed");
      assert.deepEqual(
        (err as any).details.copySourceErrorMessage,
        "Server failed to authenticate the request. Make sure the value of Authorization header is formed correctly including the signature.",
      );
    }
  });

  it.runIf(isLiveMode())("should not decompress during downloading", async () => {
    const body = "hello world body string!";
    const deflated = zlib.deflateSync(body);

    await fileClient.uploadData(deflated, {
      fileHttpHeaders: {
        fileContentEncoding: "deflate",
        fileContentType: "text/plain",
      },
    });

    const downloaded = await fileClient.downloadToBuffer();
    assert.deepStrictEqual(downloaded, deflated);
  });
});
