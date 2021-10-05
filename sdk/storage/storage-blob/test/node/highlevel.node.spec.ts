// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import * as buffer from "buffer";
import * as fs from "fs";
import * as path from "path";
import { PassThrough, Readable } from "stream";

import { AbortController } from "@azure/abort-controller";
import {
  createRandomLocalFile,
  recorderEnvSetup,
  bodyToString,
  getBSU,
  createRandomLocalFileWithTotalSize
} from "../utils";
import { RetriableReadableStreamOptions } from "../../src/utils/RetriableReadableStream";
import { record, Recorder } from "@azure-tools/test-recorder";
import { ContainerClient, BlobClient, BlockBlobClient, BlobServiceClient } from "../../src";
import { readStreamToLocalFileWithLogs } from "../utils/testutils.node";
import { BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES } from "../../src/utils/constants";
import { Test_CPK_INFO } from "../utils/fakeTestSecrets";
import { streamToBuffer2 } from "../../src/utils/utils.node";
import { delay } from "../../src/utils/utils.common";
import { Context } from "mocha";

describe("Highlevel", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  let tempFileSmall: string;
  let tempFileSmallLength: number;
  let tempFileLarge: string;
  let tempFileLargeLength: number;
  const tempFolderPath = "temp";
  const timeoutForLargeFileUploadingTest = 20 * 60 * 1000;

  let recorder: Recorder;

  let blobServiceClient: BlobServiceClient;
  beforeEach(async function(this: Context) {
    recorder = record(this, recorderEnvSetup);
    blobServiceClient = getBSU({
      keepAliveOptions: {
        enable: true
      }
    });
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.getUniqueName("blob");
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
  });

  afterEach(async function(this: Context) {
    if (!this.currentTest?.isPending()) {
      await containerClient.delete();
      await recorder.stop();
    }
  });

  before(async function(this: Context) {
    recorder = record(this, recorderEnvSetup);
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath);
    }
    const MB = 1024 * 1024;
    tempFileLargeLength = 256 * MB + 1; // First prime number after 256MB.
    tempFileLarge = await createRandomLocalFileWithTotalSize(
      tempFolderPath,
      tempFileLargeLength,
      MB
    );
    tempFileSmallLength = 4 * MB + 37; // First prime number after 4MB.
    tempFileSmall = await createRandomLocalFileWithTotalSize(
      tempFolderPath,
      tempFileSmallLength,
      MB
    );
    await recorder.stop();
  });

  after(async function(this: Context) {
    recorder = record(this, recorderEnvSetup);
    fs.unlinkSync(tempFileLarge);
    fs.unlinkSync(tempFileSmall);
    await recorder.stop();
  });

  it("put blob with maximum size", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const MB = 1024 * 1024;
    const maxPutBlobSizeLimitInMB = 5000;
    const tempFile = await createRandomLocalFile(tempFolderPath, maxPutBlobSizeLimitInMB, MB);
    const inputStream = fs.createReadStream(tempFile);

    try {
      await blockBlobClient.upload(() => inputStream, maxPutBlobSizeLimitInMB * MB, {
        abortSignal: AbortController.timeout(20 * 1000) // takes too long to upload the file
      });
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }

    fs.unlinkSync(tempFile);
  }).timeout(timeoutForLargeFileUploadingTest);

  it("uploadFile should success when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    await blockBlobClient.uploadFile(tempFileLarge, {
      blockSize: 4 * 1024 * 1024,
      concurrency: 20
    });

    const downloadResponse = await blockBlobClient.download(0);
    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileLarge);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  }).timeout(timeoutForLargeFileUploadingTest);

  it("uploadFile should work with tags", async function() {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");

    const tags = {
      tag1: "val1",
      tag2: "val2"
    };

    await blockBlobClient.uploadFile(tempFileSmall, {
      blockSize: 4 * 1024 * 1024,
      concurrency: 20,
      tags
    });

    const response = await blockBlobClient.getTags();
    assert.deepStrictEqual(response.tags, tags);
  });

  it("uploadFile should success when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    await blockBlobClient.uploadFile(tempFileSmall, {
      blockSize: 4 * 1024 * 1024,
      concurrency: 20
    });

    const downloadResponse = await blockBlobClient.download(0);
    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("uploadFile should success when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES and configured maxSingleShotSize", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    await blockBlobClient.uploadFile(tempFileSmall, {
      maxSingleShotSize: 0
    });

    const downloadResponse = await blockBlobClient.download(0);
    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("uploadFile should abort when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const aborter = AbortController.timeout(1);

    try {
      await blockBlobClient.uploadFile(tempFileLarge, {
        abortSignal: aborter,
        blockSize: 4 * 1024 * 1024,
        concurrency: 20
      });
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("uploadFile should abort when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const aborter = AbortController.timeout(1);

    try {
      await blockBlobClient.uploadFile(tempFileSmall, {
        abortSignal: aborter,
        blockSize: 4 * 1024 * 1024,
        concurrency: 20
      });
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("uploadFile should update progress when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    recorder.skip(
      "node",
      "Abort - Recorder does not record a request if it's aborted in a 'progress' callback"
    );
    let eventTriggered = false;
    const aborter = new AbortController();

    /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
    try {
      await blockBlobClient.uploadFile(tempFileLarge, {
        abortSignal: aborter.signal,
        blockSize: 4 * 1024 * 1024,
        concurrency: 20,
        onProgress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        }
      });
    } catch (err) {}
    assert.ok(eventTriggered);
  });

  it("uploadFile should update progress when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    recorder.skip(
      "node",
      "Abort - Recorder does not record a request if it's aborted in a 'progress' callback"
    );
    let eventTriggered = false;
    const aborter = new AbortController();

    /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
    try {
      await blockBlobClient.uploadFile(tempFileSmall, {
        abortSignal: aborter.signal,
        blockSize: 4 * 1024 * 1024,
        concurrency: 20,
        onProgress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        }
      });
    } catch (err) {}
    assert.ok(eventTriggered);
  });

  it("uploadFile should succeed with blockSize = BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const tempFile = await createRandomLocalFile(
      tempFolderPath,
      BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES / (1024 * 1024) + 1,
      1024 * 1024
    );
    try {
      await blockBlobClient.uploadFile(tempFile, {
        blockSize: BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES,
        abortSignal: AbortController.timeout(20 * 1000) // takes too long to upload the file
      });
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }

    fs.unlinkSync(tempFile);
  }).timeout(timeoutForLargeFileUploadingTest);

  it("uploadStream should success", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const rs = fs.createReadStream(tempFileLarge);
    await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20);

    const downloadResponse = await blockBlobClient.download(0);

    const downloadFilePath = path.join(tempFolderPath, recorder.getUniqueName("downloadFile"));
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadFilePath);

    const downloadedBuffer = fs.readFileSync(downloadFilePath);
    const uploadedBuffer = fs.readFileSync(tempFileLarge);
    assert.ok(uploadedBuffer.equals(downloadedBuffer));

    fs.unlinkSync(downloadFilePath);
  }).timeout(timeoutForLargeFileUploadingTest);

  it("uploadStream should success for tiny buffers", async () => {
    recorder.skip(
      undefined,
      "UUID is randomly generated within the SDK and used in the HTTP request and cannot be preserved."
    );
    const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
    const bufferStream = new PassThrough();
    bufferStream.end(buf);

    await blockBlobClient.uploadStream(bufferStream, 4 * 1024 * 1024, 20);
    const downloadResponse = await blockBlobClient.download(0);

    const downloadBuffer = Buffer.allocUnsafe(buf.byteLength);
    await streamToBuffer2(downloadResponse.readableStreamBody!, downloadBuffer);
    assert.ok(buf.equals(downloadBuffer));
  });

  it("uploadStream should work with tags", async function() {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");

    const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
    const bufferStream = new PassThrough();
    bufferStream.end(buf);

    const tags = {
      tag1: "val1",
      tag2: "val2"
    };

    await blockBlobClient.uploadStream(bufferStream, 4 * 1024 * 1024, 20, { tags });

    const response = await blockBlobClient.getTags();
    assert.deepStrictEqual(response.tags, tags);
  });

  it("uploadStream should abort", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const rs = fs.createReadStream(tempFileLarge);
    const aborter = AbortController.timeout(1);

    try {
      await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20, {
        abortSignal: aborter
      });
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("uploadStream should update progress event", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const rs = fs.createReadStream(tempFileLarge);
    let eventTriggered = false;

    await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20, {
      onProgress: (ev) => {
        assert.ok(ev.loadedBytes);
        eventTriggered = true;
      }
    });
    assert.ok(eventTriggered);
  }).timeout(timeoutForLargeFileUploadingTest);

  it("uploadStream should work with empty data", async () => {
    const emptyReadable = new Readable();
    emptyReadable.push(null);

    await blockBlobClient.uploadStream(emptyReadable, 1024, 10);

    const downloadResponse = await blockBlobClient.download(0);
    const data = await bodyToString(downloadResponse);
    assert.deepStrictEqual(data, "");
  });

  // Skipped due to memory limitation of the testing VM. This was failing in the "Windows Node 10" testing environment.
  it.skip(
    "uploadStream should work when blockSize = BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES",
    async () => {
      recorder.skip("node", "Temp file - recorder doesn't support saving the file");
      const tempFile = await createRandomLocalFile(
        tempFolderPath,
        BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES / (1024 * 1024) + 1,
        1024 * 1024
      );

      const rs = fs.createReadStream(tempFile);
      try {
        // abort as it may take too long, will cover the data integrity validation with manual large scale tests
        await blockBlobClient.uploadStream(rs, BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES, undefined, {
          abortSignal: AbortController.timeout(timeoutForLargeFileUploadingTest / 10)
        });
      } catch (err) {
        assert.equal(err.name, "AbortError");
      }

      fs.unlinkSync(tempFile);
    }
  ).timeout(timeoutForLargeFileUploadingTest);

  it("downloadToBuffer should success - without passing the buffer", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const rs = fs.createReadStream(tempFileLarge);
    await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20);

    const buf = await blockBlobClient.downloadToBuffer(0, undefined, {
      blockSize: 4 * 1024 * 1024,
      maxRetryRequestsPerBlock: 5,
      concurrency: 20
    });

    const localFileContent = fs.readFileSync(tempFileLarge);
    assert.ok(localFileContent.equals(buf));
  }).timeout(timeoutForLargeFileUploadingTest);

  it("downloadToBuffer should throw error if the count(size provided in bytes) is too large", async () => {
    let error;
    try {
      // casting to "any" is required since @types/node@8 doesn't have `constants` though it is present on the `buffer`,
      // "as any" can be removed once we move from @types/node v8 to v10
      await blockBlobClient.downloadToBuffer(undefined, (buffer as any).constants.MAX_LENGTH + 1);
    } catch (err) {
      error = err;
    }
    assert.ok(
      error.message.includes("Unable to allocate the buffer of size:"),
      "Error is not thrown when the count(size provided in bytes) is too large."
    );
  });

  it("downloadToBuffer should success", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const rs = fs.createReadStream(tempFileLarge);
    await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20);

    const buf = Buffer.alloc(tempFileLargeLength);
    await blockBlobClient.downloadToBuffer(buf, 0, undefined, {
      blockSize: 4 * 1024 * 1024,
      maxRetryRequestsPerBlock: 5,
      concurrency: 20
    });

    const localFileContent = fs.readFileSync(tempFileLarge);
    assert.ok(localFileContent.equals(buf));
  }).timeout(timeoutForLargeFileUploadingTest);

  it("downloadBlobToBuffer should success when downloading a range inside blob", async () => {
    await blockBlobClient.upload("aaaabbbb", 8);

    const buf = Buffer.alloc(4);
    await blockBlobClient.downloadToBuffer(buf, 4, 4, {
      blockSize: 4,
      maxRetryRequestsPerBlock: 5,
      concurrency: 1
    });
    assert.deepStrictEqual(buf.toString(), "bbbb");

    await blockBlobClient.downloadToBuffer(buf, 3, 4, {
      blockSize: 4,
      maxRetryRequestsPerBlock: 5,
      concurrency: 1
    });
    assert.deepStrictEqual(buf.toString(), "abbb");

    await blockBlobClient.downloadToBuffer(buf, 2, 4, {
      blockSize: 4,
      maxRetryRequestsPerBlock: 5,
      concurrency: 1
    });
    assert.deepStrictEqual(buf.toString(), "aabb");

    await blockBlobClient.downloadToBuffer(buf, 1, 4, {
      blockSize: 4,
      maxRetryRequestsPerBlock: 5,
      concurrency: 1
    });
    assert.deepStrictEqual(buf.toString(), "aaab");
  });

  it("downloadToBuffer should abort", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const rs = fs.createReadStream(tempFileLarge);
    await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20);

    try {
      const buf = Buffer.alloc(tempFileLargeLength);
      await blockBlobClient.downloadToBuffer(buf, 0, undefined, {
        abortSignal: AbortController.timeout(1),
        blockSize: 4 * 1024 * 1024,
        maxRetryRequestsPerBlock: 5,
        concurrency: 20
      });
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }
  }).timeout(timeoutForLargeFileUploadingTest);

  it("downloadToBuffer should update progress event", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const rs = fs.createReadStream(tempFileSmall);
    await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 10);

    let eventTriggered = false;
    const buf = Buffer.alloc(tempFileSmallLength);
    const aborter = new AbortController();
    /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
    try {
      await blockBlobClient.downloadToBuffer(buf, 0, undefined, {
        abortSignal: aborter.signal,
        blockSize: 1 * 1024,
        maxRetryRequestsPerBlock: 5,
        concurrency: 1,
        onProgress: () => {
          eventTriggered = true;
          aborter.abort();
        }
      });
    } catch (err) {}
    assert.ok(eventTriggered);
  });

  it("downloadToBuffer with CPK", async () => {
    const content = "Hello World";
    const CPKblobName = recorder.getUniqueName("blobCPK");
    const CPKblobClient = containerClient.getBlobClient(CPKblobName);
    const CPKblockBlobClient = CPKblobClient.getBlockBlobClient();
    await CPKblockBlobClient.upload(content, content.length, {
      customerProvidedKey: Test_CPK_INFO
    });

    const downloadToBufferRes = await CPKblockBlobClient.downloadToBuffer(undefined, undefined, {
      customerProvidedKey: Test_CPK_INFO
    });
    assert.ok(downloadToBufferRes.equals(Buffer.from(content)));

    let exceptionCaught = false;
    try {
      await CPKblobClient.downloadToBuffer();
    } catch (err) {
      assert.equal(err.details.errorCode, "BlobUsesCustomerSpecifiedEncryption");
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });

  it("blobclient.download should success when internal stream unexpected ends at the stream end", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const uploadResponse = await blockBlobClient.uploadFile(tempFileSmall, {
      blockSize: 4 * 1024 * 1024,
      concurrency: 20
    });

    /* eslint-disable prefer-const */
    let retirableReadableStreamOptions: RetriableReadableStreamOptions;
    const downloadResponse = await blockBlobClient.download(0, undefined, {
      conditions: {
        ifMatch: uploadResponse.etag
      },
      maxRetryRequests: 1,
      onProgress: (ev) => {
        if (ev.loadedBytes >= tempFileSmallLength) {
          retirableReadableStreamOptions.doInjectErrorOnce = true;
        }
      }
    });

    retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
    /* eslint-enable prefer-const */

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("blobclient.download should download full data successfully when internal stream unexpected ends", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const uploadResponse = await blockBlobClient.uploadFile(tempFileSmall, {
      blockSize: 4 * 1024 * 1024,
      concurrency: 20
    });

    /* eslint-disable prefer-const */
    let retirableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    const downloadResponse = await blockBlobClient.download(0, undefined, {
      conditions: {
        ifMatch: uploadResponse.etag
      },
      maxRetryRequests: 3,
      onProgress: () => {
        if (injectedErrors++ < 3) {
          retirableReadableStreamOptions.doInjectErrorOnce = true;
        }
      }
    });

    retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
    /* eslint-enable prefer-const */

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("blobclient.download should download partial data when internal stream unexpected ends", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const uploadResponse = await blockBlobClient.uploadFile(tempFileSmall, {
      blockSize: 4 * 1024 * 1024,
      concurrency: 20
    });

    const partialSize = 500 * 1024;

    /* eslint-disable prefer-const */
    let retirableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    const downloadResponse = await blockBlobClient.download(0, partialSize, {
      conditions: {
        ifMatch: uploadResponse.etag
      },
      maxRetryRequests: 3,
      onProgress: () => {
        if (injectedErrors++ < 3) {
          retirableReadableStreamOptions.doInjectErrorOnce = true;
        }
      }
    });

    retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
    /* eslint-enable prefer-const */

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.slice(0, partialSize).equals(uploadedData.slice(0, partialSize)));
  });

  it("blobclient.download should download data failed when exceeding max stream retry requests", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const uploadResponse = await blockBlobClient.uploadFile(tempFileSmall, {
      blockSize: 4 * 1024 * 1024,
      concurrency: 20
    });

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));

    let retirableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    let expectedError = false;

    try {
      const downloadResponse = await blockBlobClient.download(0, undefined, {
        conditions: {
          ifMatch: uploadResponse.etag
        },
        maxRetryRequests: 0,
        onProgress: () => {
          if (injectedErrors++ < 1) {
            retirableReadableStreamOptions.doInjectErrorOnce = true;
          }
        }
      });
      retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);
    } catch (error) {
      expectedError = true;
    }

    assert.ok(expectedError);
    fs.unlinkSync(downloadedFile);
  });

  it("blobclient.download should abort after retries", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const uploadResponse = await blockBlobClient.uploadFile(tempFileSmall, {
      blockSize: 4 * 1024 * 1024,
      concurrency: 20
    });

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));

    let retirableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    let expectedError = false;

    try {
      const aborter = new AbortController();
      const downloadResponse = await blockBlobClient.download(0, undefined, {
        abortSignal: aborter.signal,
        conditions: {
          ifMatch: uploadResponse.etag
        },
        maxRetryRequests: 3,
        onProgress: () => {
          if (injectedErrors++ < 2) {
            // Trigger 2 times of retry
            retirableReadableStreamOptions.doInjectErrorOnce = true;
          } else {
            // Trigger aborter
            aborter.abort();
          }
        }
      });
      retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);
    } catch (error) {
      expectedError = true;
    }

    assert.ok(expectedError);
    fs.unlinkSync(downloadedFile);
  });

  it("download abort should work when still fetching body", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    await blockBlobClient.uploadFile(tempFileSmall, {
      blockSize: 4 * 1024 * 1024,
      concurrency: 20
    });

    const aborter = new AbortController();
    const res = await blobClient.download(0, undefined, { abortSignal: aborter.signal });

    let exceptionCaught = false;
    res.readableStreamBody!.on("error", (err) => {
      assert.equal(err.name, "AbortError");
      exceptionCaught = true;
    });

    aborter.abort();
    await delay(10);
    assert.ok(exceptionCaught);
  });

  it("downloadToFile should success", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const downloadedFilePath = recorder.getUniqueName("downloadedtofile.");
    const rs = fs.createReadStream(tempFileSmall);
    await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20);

    const response = await blobClient.downloadToFile(downloadedFilePath, 0, undefined);

    assert.ok(
      response.contentLength === tempFileSmallLength,
      "response.contentLength doesn't match tempFileSmallLength"
    );
    assert.equal(
      response.readableStreamBody,
      undefined,
      "Expecting response.readableStreamBody to be undefined."
    );

    const localFileContent = fs.readFileSync(tempFileSmall);
    const downloadedFileContent = fs.readFileSync(downloadedFilePath);
    assert.ok(localFileContent.equals(downloadedFileContent));

    fs.unlinkSync(downloadedFilePath);
  });

  it("downloadToFile should fail when saving to directory", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const rs = fs.createReadStream(tempFileSmall);
    await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20);

    try {
      await blobClient.downloadToFile(__dirname);
      throw new Error("Test failure.");
    } catch (err) {
      assert.notEqual(err.message, "Test failure.");
    }
  });

  it("set tier while upload", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    // single upload
    await blockBlobClient.uploadFile(tempFileSmall, {
      tier: "Hot",
      maxSingleShotSize: 256 * 1024 * 1024
    });
    assert.equal((await blockBlobClient.getProperties()).accessTier, "Hot");

    await blockBlobClient.uploadFile(tempFileSmall, {
      tier: "Cool",
      maxSingleShotSize: 4 * 1024 * 1024
    });
    assert.equal((await blockBlobClient.getProperties()).accessTier, "Cool");

    await blockBlobClient.uploadStream(fs.createReadStream(tempFileSmall), undefined, undefined, {
      tier: "Hot"
    });
    assert.equal((await blockBlobClient.getProperties()).accessTier, "Hot");
  });

  it("uploadData should work with Buffer, ArrayBuffer and ArrayBufferView", async () => {
    const byteLength = 10;
    const arrayBuf = new ArrayBuffer(byteLength);
    const uint8Array = new Uint8Array(arrayBuf);
    for (let i = 0; i < byteLength; i++) {
      uint8Array[i] = i;
    }

    await blockBlobClient.uploadData(arrayBuf);
    const res = await blockBlobClient.downloadToBuffer();
    assert.ok(res.equals(Buffer.from(arrayBuf)));

    const uint8ArrayPartial = new Uint8Array(arrayBuf, 1, 3);
    await blockBlobClient.uploadData(uint8ArrayPartial);
    const res1 = await blockBlobClient.downloadToBuffer();
    assert.ok(res1.equals(Buffer.from(arrayBuf, 1, 3)));

    const uint16Array = new Uint16Array(arrayBuf, 4, 2);
    await blockBlobClient.uploadData(uint16Array);
    const res2 = await blockBlobClient.downloadToBuffer();
    assert.ok(res2.equals(Buffer.from(arrayBuf, 4, 2 * 2)));

    const buf = Buffer.from(arrayBuf, 0, 5);
    await blockBlobClient.uploadData(buf);
    const res3 = await blockBlobClient.downloadToBuffer();
    assert.ok(res3.equals(buf));
  });
});
