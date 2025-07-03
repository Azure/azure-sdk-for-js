// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import * as fs from "node:fs";
import * as path from "node:path";
import {
  StorageChecksumAlgorithm,
  type DataLakeFileClient,
  type DataLakeFileSystemClient,
} from "../../src/index.js";
import {
  bodyToString,
  createRandomLocalFile,
  getDataLakeServiceClient,
  getUniqueName,
  recorderEnvSetup,
} from "../utils/index.js";
import { MB, FILE_MAX_SINGLE_UPLOAD_THRESHOLD } from "../../src/utils/constants.js";
import { readStreamToLocalFileWithLogs } from "../utils/testutils.node.js";
import { Readable, PassThrough } from "node:stream";
import { streamToBuffer2 } from "../../src/utils/utils.js";
import { describe, it, assert, beforeEach, afterEach, beforeAll, afterAll } from "vitest";

describe("ContentChecksumValidation with client config - CRC64", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileName: string;
  let fileClient: DataLakeFileClient;
  let tempFileSmall: string;
  let tempFileLarge: string;
  const tempFolderPath = "temp";
  const timeoutForLargeFileUploadingTest = 20 * 60 * 1000;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: {
          headersForRemoval: ["x-ms-proposed-lease-id", "x-ms-lease-id", "x-ms-rename-source"],
        },
      },
      ["record", "playback"],
    );
    const serviceClient = getDataLakeServiceClient(recorder, {
      keepAliveOptions: {
        enable: true,
      },
      uploadContentChecksumAlgorithm: StorageChecksumAlgorithm.StorageCrc64,
      downloadContentChecksumAlgorithm: StorageChecksumAlgorithm.StorageCrc64,
    });
    fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
    fileName = recorder.variable("file", getUniqueName("file"));
    fileClient = fileSystemClient.getFileClient(fileName);
  });

  afterEach(async () => {
    if (fileSystemClient) {
      await fileSystemClient.deleteIfExists();
    }
    await recorder.stop();
  });

  beforeAll(async () => {
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath);
    }
    tempFileLarge = await createRandomLocalFile(tempFolderPath, 257, MB);
    tempFileSmall = await createRandomLocalFile(tempFolderPath, 15, MB);
  });

  afterAll(async () => {
    fs.unlinkSync(tempFileLarge);
    fs.unlinkSync(tempFileSmall);
  });

  it("uploadFile and readToBuffer", async (ctx) => {
    if (!isLiveMode()) {
      // recorder doesn't support saving the file
      ctx.skip();
    }
    await fileClient.uploadFile(tempFileSmall);

    const readBuffer = await fileClient.readToBuffer(0, undefined);

    const uploadedBuffer = fs.readFileSync(tempFileSmall);
    assert.ok(uploadedBuffer.equals(readBuffer));
  });

  it("uploadFile and readToFile", async (ctx) => {
    if (!isLiveMode()) {
      // recorder doesn't support saving the file
      ctx.skip();
    }
    await fileClient.uploadFile(tempFileSmall);

    const readFilePath = recorder.variable("readFilePath", getUniqueName("readFilePath"));
    const readResponse = await fileClient.readToFile(readFilePath, 0, undefined);
    // assert.ok(
    //   readResponse.contentLength === tempFileSmallLength,
    //   "readResponse.contentLength doesn't match tempFileSmallLength",
    // );
    assert.equal(
      readResponse.readableStreamBody,
      undefined,
      "Expecting readResponse.readableStreamBody to be undefined.",
    );
    assert.deepStrictEqual(readResponse.structuredBodyType, "XSM/1.0; properties=crc64");

    const localFileContent = fs.readFileSync(tempFileSmall);
    const readFileContent = fs.readFileSync(readFilePath);
    assert.ok(localFileContent.equals(readFileContent));

    fs.unlinkSync(readFilePath);
  });

  it(
    "upload should work for large data",
    { timeout: timeoutForLargeFileUploadingTest },
    async (ctx) => {
      if (!isLiveMode()) {
        ctx.skip();
      }
      const uploadedBuffer = fs.readFileSync(tempFileLarge);
      await fileClient.upload(uploadedBuffer);

      const readResponse = await fileClient.read();
      assert.deepStrictEqual(readResponse.structuredBodyType, "XSM/1.0; properties=crc64");
      const readFile = path.join(
        tempFolderPath,
        recorder.variable("downloadfile.", getUniqueName("downloadfile.")),
      );
      await readStreamToLocalFileWithLogs(readResponse.readableStreamBody!, readFile);
      const readBuffer = await fs.readFileSync(readFile);
      assert.ok(uploadedBuffer.equals(readBuffer));

      fs.unlinkSync(readFile);
    },
  );

  it("upload can abort for single-shot upload", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const aborter = AbortSignal.timeout(1);
    const uploadedBuffer = fs.readFileSync(tempFileSmall);
    try {
      await fileClient.upload(uploadedBuffer, {
        abortSignal: aborter,
      });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("upload can abort for parallel upload", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const aborter = AbortSignal.timeout(1);
    const uploadedBuffer = fs.readFileSync(tempFileSmall);
    try {
      await fileClient.upload(uploadedBuffer, {
        abortSignal: aborter,
        singleUploadThreshold: 8 * MB,
      });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("upload can update progress with single-shot upload", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    let eventTriggered = false;
    const uploadedBuffer = fs.readFileSync(tempFileSmall);
    const aborter = new AbortController();

    try {
      await fileClient.upload(uploadedBuffer, {
        abortSignal: aborter.signal,
        maxConcurrency: 20,
        onProgress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        },
        chunkSize: 4 * MB,
      });
    } catch (err: any) {
      assert.ok(
        err.message.startsWith("The operation was aborted."),
        "Unexpected error caught: " + err,
      );
    }
    assert.ok(eventTriggered);
  });

  it("upload can update progress with parallel upload", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    let eventTriggered = false;
    const uploadedBuffer = fs.readFileSync(tempFileSmall);
    await fileClient.upload(uploadedBuffer, {
      maxConcurrency: 1,
      onProgress: (ev) => {
        assert.ok(ev.loadedBytes);
        eventTriggered = true;
      },
      singleUploadThreshold: 8 * MB,
    });
    assert.ok(eventTriggered);
  });

  it("upload empty data should succeed", async () => {
    await fileClient.upload(Buffer.alloc(0));
    const response = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(response), "");
  });

  it(
    "upload should work when data size = FILE_MAX_SINGLE_UPLOAD_THRESHOLD",
    { timeout: timeoutForLargeFileUploadingTest },
    async (ctx) => {
      if (!isLiveMode()) {
        ctx.skip();
      }
      const tempFile = await createRandomLocalFile(
        tempFolderPath,
        FILE_MAX_SINGLE_UPLOAD_THRESHOLD / MB,
        MB,
      );
      const uploadedBuffer = fs.readFileSync(tempFile);
      await fileClient.upload(uploadedBuffer);

      const readResponse = await fileClient.read();
      const readFile = path.join(
        tempFolderPath,
        recorder.variable("downloadfile.", getUniqueName("downloadfile.")),
      );
      await readStreamToLocalFileWithLogs(readResponse.readableStreamBody!, readFile);
      const readBuffer = await fs.readFileSync(readFile);
      assert.ok(uploadedBuffer.equals(readBuffer));

      fs.unlinkSync(readFile);
      fs.unlinkSync(tempFile);
    },
  );

  it("uploadStream should work", { timeout: timeoutForLargeFileUploadingTest }, async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const rs = fs.createReadStream(tempFileLarge);
    await fileClient.uploadStream(rs);

    const readResponse = await fileClient.read();
    const readFilePath = path.join(
      tempFolderPath,
      recorder.variable("readFile", getUniqueName("readFile")),
    );
    await readStreamToLocalFileWithLogs(readResponse.readableStreamBody!, readFilePath);

    const readBuffer = fs.readFileSync(readFilePath);
    const uploadedBuffer = fs.readFileSync(tempFileLarge);
    assert.ok(uploadedBuffer.equals(readBuffer));

    fs.unlinkSync(readFilePath);
  });

  it("uploadStream can abort", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const rs = fs.createReadStream(tempFileLarge);
    const aborter = AbortSignal.timeout(1);

    try {
      await fileClient.uploadStream(rs, { abortSignal: aborter });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it(
    "uploadStream can update progress event",
    { timeout: timeoutForLargeFileUploadingTest },
    async (ctx) => {
      if (!isLiveMode()) {
        ctx.skip();
      }
      const rs = fs.createReadStream(tempFileLarge);
      let eventTriggered = false;

      await fileClient.uploadStream(rs, {
        onProgress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
        },
      });
      assert.ok(eventTriggered);
    },
  );

  it("uploadStream with empty data should succeed", async () => {
    const readable = new Readable();
    readable.push(null);

    // create and flush
    await fileClient.uploadStream(readable);
    const response = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(response), "");
  });

  it("uploadStream should success for tiny buffers", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
    const bufferStream = new PassThrough();
    bufferStream.end(buf);

    await fileClient.uploadStream(bufferStream);

    const downloadResponse = await fileClient.read();
    const downloadBuffer = Buffer.allocUnsafe(buf.byteLength);
    await streamToBuffer2(downloadResponse.readableStreamBody!, downloadBuffer);
    assert.ok(buf.equals(downloadBuffer));
  });

  it(
    "uploadFile should work for large data",
    { timeout: timeoutForLargeFileUploadingTest },
    async (ctx) => {
      if (!isLiveMode()) {
        ctx.skip();
      }
      await fileClient.uploadFile(tempFileLarge, {
        maxConcurrency: 20,
      });

      const readResponse = await fileClient.read();
      const readFile = path.join(
        tempFolderPath,
        recorder.variable("downloadfile.", getUniqueName("downloadfile.")),
      );
      await readStreamToLocalFileWithLogs(readResponse.readableStreamBody!, readFile);
      const readBuffer = fs.readFileSync(readFile);

      const uploadedBuffer = fs.readFileSync(tempFileLarge);
      assert.ok(uploadedBuffer.equals(readBuffer));

      fs.unlinkSync(readFile);
    },
  );

  it("uploadFile should success for small data", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    await fileClient.uploadFile(tempFileSmall);

    const readResponse = await fileClient.read();
    const readFile = path.join(
      tempFolderPath,
      recorder.variable("downloadfile.", getUniqueName("downloadfile.")),
    );
    await readStreamToLocalFileWithLogs(readResponse.readableStreamBody!, readFile);
    const readBuffer = await fs.readFileSync(readFile);

    const uploadedBuffer = fs.readFileSync(tempFileSmall);
    assert.ok(uploadedBuffer.equals(readBuffer));

    fs.unlinkSync(readFile);
  });

  it("uploadFile can abort for single-shot upload", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const aborter = AbortSignal.timeout(1);
    try {
      await fileClient.uploadFile(tempFileSmall, {
        abortSignal: aborter,
      });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("uploadFile should abort for parallel upload", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const aborter = AbortSignal.timeout(1);
    try {
      await fileClient.uploadFile(tempFileSmall, {
        abortSignal: aborter,
        singleUploadThreshold: 8 * MB,
      });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("uploadFile should update progress with single-shot upload", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    let eventTriggered = false;
    const aborter = new AbortController();

    try {
      await fileClient.uploadFile(tempFileSmall, {
        abortSignal: aborter.signal,
        onProgress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        },
      });
    } catch (err: any) {
      assert.ok(
        err.message.startsWith("The operation was aborted."),
        "Unexpected error caught: " + err,
      );
    }
    assert.ok(eventTriggered);
  });

  it("uploadFile should update progress with parallel upload", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    let eventTriggered = false;
    const aborter = new AbortController();

    try {
      await fileClient.uploadFile(tempFileLarge, {
        abortSignal: aborter.signal,
        maxConcurrency: 20,
        onProgress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        },
        singleUploadThreshold: 8 * MB,
      });
    } catch (err: any) {
      assert.ok(
        err.message.startsWith("The operation was aborted."),
        "Unexpected error caught: " + err,
      );
    }
    assert.ok(eventTriggered);
  });

  it("uploadFile with empty data should succeed", async () => {
    const tempFileEmpty = await createRandomLocalFile(tempFolderPath, 0, MB);
    await fileClient.uploadFile(tempFileEmpty);
    const response = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(response), "");
    fs.unlinkSync(tempFileEmpty);
  });

  it("upload ArrayBuffer and ArrayBufferView should succeed", async () => {
    const byteLength = 10;
    const arrayBuf = new ArrayBuffer(byteLength);
    const uint8Array = new Uint8Array(arrayBuf);
    for (let i = 0; i < byteLength; i++) {
      uint8Array[i] = i;
    }

    await fileClient.upload(arrayBuf);
    const res = await fileClient.readToBuffer();
    assert.ok(res.equals(Buffer.from(arrayBuf)));

    const uint8ArrayPartial = new Uint8Array(arrayBuf, 1, 3);
    await fileClient.upload(uint8ArrayPartial);
    const res1 = await fileClient.readToBuffer();
    assert.ok(res1.equals(Buffer.from(arrayBuf, 1, 3)));

    const uint16Array = new Uint16Array(arrayBuf, 4, 2);
    await fileClient.upload(uint16Array);
    const res2 = await fileClient.readToBuffer();
    assert.ok(res2.equals(Buffer.from(arrayBuf, 4, 2 * 2)));
  });
});
