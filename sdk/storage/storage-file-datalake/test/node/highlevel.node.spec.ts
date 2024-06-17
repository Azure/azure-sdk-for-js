// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import * as fs from "fs";
import * as path from "path";
import * as buffer from "buffer";
import { DataLakeFileClient, DataLakeFileSystemClient } from "../../src";
import {
  bodyToString,
  createRandomLocalFile,
  getDataLakeServiceClient,
  getUniqueName,
  recorderEnvSetup,
} from "../utils";
import {
  MB,
  FILE_MAX_SINGLE_UPLOAD_THRESHOLD,
  BLOCK_BLOB_MAX_BLOCKS,
  FILE_UPLOAD_MAX_CHUNK_SIZE,
} from "../../src/utils/constants";
import { readStreamToLocalFileWithLogs } from "../../test/utils/testutils.node";
import { AbortController } from "@azure/abort-controller";
import { Readable, PassThrough } from "stream";
import { streamToBuffer2 } from "../../src/utils/utils.node";
import { Context } from "mocha";
import { Test_CPK_INFO } from "../utils/fakeTestSecrets";

describe("Highlevel Node.js only", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileName: string;
  let fileClient: DataLakeFileClient;
  let tempFileSmall: string;
  let tempFileSmallLength: number;
  let tempFileLarge: string;
  let tempFileLargeLength: number;
  const tempFolderPath = "temp";
  const timeoutForLargeFileUploadingTest = 20 * 60 * 1000;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
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
    });
    fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
    fileName = recorder.variable("file", getUniqueName("file"));
    fileClient = fileSystemClient.getFileClient(fileName);
  });

  afterEach(async function (this: Context) {
    if (fileSystemClient) {
      await fileSystemClient.deleteIfExists();
    }
    await recorder.stop();
  });

  before(async function (this: Context) {
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath);
    }
    tempFileLarge = await createRandomLocalFile(tempFolderPath, 257, MB);
    tempFileLargeLength = 257 * MB;
    tempFileSmall = await createRandomLocalFile(tempFolderPath, 15, MB);
    tempFileSmallLength = 15 * MB;
  });

  after(async function (this: Context) {
    fs.unlinkSync(tempFileLarge);
    fs.unlinkSync(tempFileSmall);
  });

  it("upload and read with cpk", async () => {
    const content = "Hello, World!";
    await fileClient.upload(Buffer.from(content), {
      customerProvidedKey: Test_CPK_INFO,
    });

    const result = await fileClient.read(0, undefined, {
      customerProvidedKey: Test_CPK_INFO,
    });
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it("upload large data with cpk", async function (this: Context) {
    if (!isLiveMode()) {
      // recorder doesn't support saving the file
      this.skip();
    }
    const uploadedBuffer = fs.readFileSync(tempFileLarge);
    await fileClient.upload(uploadedBuffer, {
      customerProvidedKey: Test_CPK_INFO,
    });

    const readResponse = await fileClient.read(0, undefined, {
      customerProvidedKey: Test_CPK_INFO,
    });
    const readFile = path.join(
      tempFolderPath,
      recorder.variable("downloadfile.", getUniqueName("downloadfile.")),
    );
    await readStreamToLocalFileWithLogs(readResponse.readableStreamBody!, readFile);
    const readBuffer = await fs.readFileSync(readFile);
    assert.ok(uploadedBuffer.equals(readBuffer));

    fs.unlinkSync(readFile);
  });

  it("uploadFile with CPK", async function (this: Context) {
    if (!isLiveMode()) {
      // recorder doesn't support saving the file
      this.skip();
    }
    await fileClient.uploadFile(tempFileSmall, {
      customerProvidedKey: Test_CPK_INFO,
    });

    const readBuffer = await fileClient.readToBuffer(0, undefined, {
      customerProvidedKey: Test_CPK_INFO,
    });

    const uploadedBuffer = fs.readFileSync(tempFileSmall);
    assert.ok(uploadedBuffer.equals(readBuffer));
  });

  it("readToFile with CPK", async function (this: Context) {
    if (!isLiveMode()) {
      // recorder doesn't support saving the file
      this.skip();
    }
    await fileClient.uploadFile(tempFileSmall, {
      customerProvidedKey: Test_CPK_INFO,
    });

    const readFilePath = recorder.variable("readFilePath", getUniqueName("readFilePath"));
    const readResponse = await fileClient.readToFile(readFilePath, 0, undefined, {
      customerProvidedKey: Test_CPK_INFO,
    });
    assert.ok(
      readResponse.contentLength === tempFileSmallLength,
      "readResponse.contentLength doesn't match tempFileSmallLength",
    );
    assert.equal(
      readResponse.readableStreamBody,
      undefined,
      "Expecting readResponse.readableStreamBody to be undefined.",
    );

    const localFileContent = fs.readFileSync(tempFileSmall);
    const readFileContent = fs.readFileSync(readFilePath);
    assert.ok(localFileContent.equals(readFileContent));

    fs.unlinkSync(readFilePath);
  });

  it("upload should work for large data", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }
    const uploadedBuffer = fs.readFileSync(tempFileLarge);
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
  }).timeout(timeoutForLargeFileUploadingTest);

  it("upload should work for small data", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }
    const uploadedBuffer = fs.readFileSync(tempFileSmall);
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
  });

  it("upload can abort for single-shot upload", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }
    const aborter = AbortController.timeout(1);
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

  it("upload can abort for parallel upload", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }
    const aborter = AbortController.timeout(1);
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

  it("upload can update progress with single-shot upload", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
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
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
    assert.ok(eventTriggered);
  });

  it("upload can update progress with parallel upload", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
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
        singleUploadThreshold: 8 * MB,
      });
    } catch (err: any) {
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
    assert.ok(eventTriggered);
  });

  it("upload empty data should succeed", async () => {
    await fileClient.upload(Buffer.alloc(0));
    const response = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(response), "");
  });

  it("upload to an existing file will overwrite", async () => {
    await fileClient.upload(Buffer.from("aaa"));
    await fileClient.upload(Buffer.from("bb"));

    const response = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(response), "bb");
  });

  it("upload by specifying a ModifiedAccessConditions check to avoid overwrite", async () => {
    await fileClient.upload(Buffer.from("aaa"));
    try {
      await fileClient.upload(Buffer.from("bb"), {
        conditions: { ifNoneMatch: "*" },
      });
    } catch (err: any) {
      assert.equal(
        err.details.errorCode,
        "PathAlreadyExists",
        "Upload should have thrown a PathAlreadyExists error.",
      );
    }
    const response = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(response), "aaa");
  });

  it("upload to a leased file without specifying LeaseAccessConditions should fail", async () => {
    await fileClient.upload(Buffer.from("aaa"));

    const duration = 30;
    const leaseClient = fileClient.getDataLakeLeaseClient();
    await leaseClient.acquireLease(duration);

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    try {
      await fileClient.upload(Buffer.from("bb"));
    } catch (err: any) {
      assert.equal(
        err.details.errorCode,
        "LeaseIdMissing",
        "Upload should have thrown a LeaseIdMissing error.",
      );
    }
    const response = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(response), "aaa");
  });

  it("upload to a leased file should succeed when LeaseAccessConditions is specified", async () => {
    await fileClient.upload(Buffer.from("aaa"));

    const duration = 60;
    const leaseClient = fileClient.getDataLakeLeaseClient();
    await leaseClient.acquireLease(duration);

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await fileClient.upload(Buffer.from("bb"), {
      conditions: { leaseId: leaseClient.leaseId },
    });

    const response = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(response), "bb");
  });

  it("upload specifying both LeaseAccessConditions and ModifiedAccessConditions works as expected", async () => {
    await fileClient.upload(Buffer.from("aaa"));

    const duration = 30;
    const leaseClient = fileClient.getDataLakeLeaseClient();
    await leaseClient.acquireLease(duration);

    let errThrown = false;
    try {
      await fileClient.upload(Buffer.from("bb"), {
        conditions: { ifNoneMatch: "*", leaseId: leaseClient.leaseId },
      });
    } catch (err: any) {
      errThrown = true;
      assert.equal(
        err.details.errorCode,
        "PathAlreadyExists",
        "Upload should have thrown a PathAlreadyExists error.",
      );
    }
    assert.ok(errThrown, "upload with a if-not-exist check should have thrown.");
  });

  it("upload should work when data size = FILE_MAX_SINGLE_UPLOAD_THRESHOLD", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
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
  }).timeout(timeoutForLargeFileUploadingTest);

  it("upload should fail when number of chunks > BLOCK_BLOB_MAX_BLOCKS", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }
    const uploadedBuffer = fs.readFileSync(tempFileLarge);
    let exceptionCaught = false;
    try {
      await fileClient.upload(uploadedBuffer, {
        chunkSize: Math.floor((tempFileLargeLength - 1) / BLOCK_BLOB_MAX_BLOCKS),
      });
    } catch (err: any) {
      if (err instanceof RangeError && err.message.includes("the number of chunks must be <=")) {
        exceptionCaught = true;
      }
    }
    assert.ok(exceptionCaught, "Should have thrown the expected error.");
  });

  it("uploadStream should work", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
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
  }).timeout(timeoutForLargeFileUploadingTest);

  it("uploadStream can abort", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }
    const rs = fs.createReadStream(tempFileLarge);
    const aborter = AbortController.timeout(1);

    try {
      await fileClient.uploadStream(rs, { abortSignal: aborter });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("uploadStream can update progress event", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
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
  }).timeout(timeoutForLargeFileUploadingTest);

  it("uploadStream with empty data should succeed", async () => {
    const readable = new Readable();
    readable.push(null);

    // create and flush
    await fileClient.uploadStream(readable);
    const response = await fileClient.read();
    assert.deepStrictEqual(await bodyToString(response), "");
  });

  it("uploadStream should success for tiny buffers", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
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

  it("uploadFile should work for large data", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
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
    const readBuffer = await fs.readFileSync(readFile);

    const uploadedBuffer = fs.readFileSync(tempFileLarge);
    assert.ok(uploadedBuffer.equals(readBuffer));

    fs.unlinkSync(readFile);
  }).timeout(timeoutForLargeFileUploadingTest);

  it("uploadFile should success for small data", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
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

  it("uploadFile can abort for single-shot upload", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }
    const aborter = AbortController.timeout(1);
    try {
      await fileClient.uploadFile(tempFileSmall, {
        abortSignal: aborter,
      });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("uploadFile should abort for parallel upload", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }
    const aborter = AbortController.timeout(1);
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

  it("uploadFile should update progress with single-shot upload", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
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
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
    assert.ok(eventTriggered);
  });

  it("uploadFile should update progress with parallel upload", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
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
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
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

  // Skipped since creating large file (~8GB) may take too long in live tests pipeline.
  it.skip(
    "uploadFile with chunkSize = FILE_UPLOAD_MAX_CHUNK_SIZE should succeed",
    async function (this: Context) {
      if (!isLiveMode()) {
        this.skip();
      }
      const fileSize = FILE_UPLOAD_MAX_CHUNK_SIZE * 2 + MB;
      const tempFile = await createRandomLocalFile(tempFolderPath, fileSize / MB, MB);
      try {
        await fileClient.uploadFile(tempFile, {
          chunkSize: FILE_UPLOAD_MAX_CHUNK_SIZE,
          abortSignal: AbortController.timeout(20 * 1000), // takes too long to upload the file
        });
      } catch (err: any) {
        assert.equal(err.name, "AbortError");
      }

      fs.unlinkSync(tempFile);
    },
  ).timeout(timeoutForLargeFileUploadingTest);

  // Skipped because it throws an "invalid typed array length" error due to bugs in node-fetch.
  // https://github.com/Azure/azure-sdk-for-js/issues/9481
  // Too large ArrayBuffer would cause "JavaScript heap out of memory" error.
  it.skip("upload with chunkSize = FILE_UPLOAD_MAX_CHUNK_SIZE should succeed", async () => {
    const fileSize = FILE_UPLOAD_MAX_CHUNK_SIZE * 2 + MB;
    const arrayBuf = new ArrayBuffer(fileSize);
    try {
      await fileClient.upload(arrayBuf, {
        chunkSize: FILE_UPLOAD_MAX_CHUNK_SIZE,
        abortSignal: AbortController.timeout(20 * 1000), // takes too long to upload the file
      });
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  }).timeout(timeoutForLargeFileUploadingTest);

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

  it("readToBuffer should work", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }

    await fileClient.uploadFile(tempFileLarge);

    const buf = Buffer.alloc(tempFileLargeLength);
    await fileClient.readToBuffer(buf);

    const localFileContent = fs.readFileSync(tempFileLarge);
    assert.ok(localFileContent.equals(buf));
  }).timeout(timeoutForLargeFileUploadingTest);

  it("readToBuffer should work - without passing the buffer", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }

    await fileClient.uploadFile(tempFileSmall);

    const buf = await fileClient.readToBuffer();
    const localFileContent = fs.readFileSync(tempFileSmall);
    assert.ok(localFileContent.equals(buf));
  });

  it("readToBuffer should throw error if the count is too large", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }
    let error;
    try {
      await fileClient.uploadFile(tempFileSmall);
      await fileClient.readToBuffer(undefined, (buffer as any).constants.MAX_LENGTH + 1);
    } catch (err: any) {
      error = err;
    }
    assert.ok(
      error.message.includes("Unable to allocate the buffer of size:"),
      "Error is not thrown when the count (size in bytes) is too large",
    );
  });

  it("readToBuffer should success when reading a range inside file", async () => {
    await fileClient.upload(Buffer.from("aaaabbbb"));

    const buf = Buffer.alloc(4);
    await fileClient.readToBuffer(buf, 4, 4);
    assert.deepStrictEqual(buf.toString(), "bbbb");

    await fileClient.readToBuffer(buf, 3, 4);
    assert.deepStrictEqual(buf.toString(), "abbb");

    await fileClient.readToBuffer(buf, 2, 4);
    assert.deepStrictEqual(buf.toString(), "aabb");

    await fileClient.readToBuffer(buf, 1, 4);
    assert.deepStrictEqual(buf.toString(), "aaab");

    await fileClient.readToBuffer(buf, 0, 4);
    assert.deepStrictEqual(buf.toString(), "aaaa");
  });

  it("readToBuffer can abort", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }
    await fileClient.uploadFile(tempFileSmall);

    try {
      const buf = Buffer.alloc(tempFileSmallLength);
      await fileClient.readToBuffer(buf, 0, undefined, {
        abortSignal: AbortController.timeout(1),
        concurrency: 20,
        chunkSize: 4 * MB,
      });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("readToBuffer should update progress event", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }
    await fileClient.uploadFile(tempFileSmall);

    let eventTriggered = false;
    const buf = Buffer.alloc(tempFileSmallLength);
    const aborter = new AbortController();
    try {
      await fileClient.readToBuffer(buf, 0, undefined, {
        abortSignal: aborter.signal,
        concurrency: 1,
        onProgress: () => {
          eventTriggered = true;
          aborter.abort();
        },
      });
    } catch (err: any) {
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
    assert.ok(eventTriggered);
  });

  it("readToFile should work", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }

    await fileClient.uploadFile(tempFileSmall);

    const readFilePath = recorder.variable("readFilePath", getUniqueName("readFilePath"));
    const readResponse = await fileClient.readToFile(readFilePath);
    assert.ok(
      readResponse.contentLength === tempFileSmallLength,
      "readResponse.contentLength doesn't match tempFileSmallLength",
    );
    assert.equal(
      readResponse.readableStreamBody,
      undefined,
      "Expecting readResponse.readableStreamBody to be undefined.",
    );

    const localFileContent = fs.readFileSync(tempFileSmall);
    const readFileContent = fs.readFileSync(readFilePath);
    assert.ok(localFileContent.equals(readFileContent));

    fs.unlinkSync(readFilePath);
  });

  it("readToFile should fail when saving to directory", async function (this: Context) {
    if (!isLiveMode()) {
      this.skip();
    }
    await fileClient.uploadFile(tempFileSmall);

    try {
      await fileClient.readToFile(".");
      throw new Error("Test failure.");
    } catch (err: any) {
      assert.notEqual(err.message, "Test failure.");
    }
  });
});
