// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "node:fs";
import buffer from "node:buffer";
import path from "node:path";
import { PassThrough, Readable } from "node:stream";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import type {
  ContainerClient,
  BlobClient,
  BlockBlobClient,
  BlobServiceClient,
} from "@azure/storage-blob";
import { describe, it, assert, beforeEach, afterEach, beforeAll, afterAll } from "vitest";
import { createBlobServiceClient } from "./utils/clients.js";
import { getUniqueName } from "../utils/utils.js";
import {
  bodyToString,
  createRandomLocalFile,
  createRandomLocalFileWithTotalSize,
  readStreamToLocalFileWithLogs,
} from "./utils/utils.js";
import { BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES } from "../utils/constants.js";
import { getCustomerProvidedKey } from "../../utils/injectables.js";
import { isRestError, type TransferProgressEvent } from "@azure/core-rest-pipeline";
import { buffer as bufferUtil } from "node:stream/consumers";

interface RetriableReadableStreamOptions {
  /**
   * Max retry count (greater than or equal to 0), undefined or invalid value means no retry
   */
  maxRetryRequests?: number;

  /**
   * Read progress event handler
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Debug purpose only. Used to inject an unexpected end to existing internal stream,
   * to test stream retry works well or not.
   *
   * When assign it to true, for next incoming "data" event of internal stream,
   * RetriableReadableStream will try to emit an "end" event to existing internal
   * stream to force it end and start retry from the breaking point.
   * The value will then update to "undefined", once the injection works.
   */
  doInjectErrorOnce?: boolean;

  /**
   * A threshold, not a limit. Dictates the amount of data that a stream buffers before it stops asking for more data.
   */
  highWaterMark?: number;
}

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
  const customerProvidedKey = getCustomerProvidedKey();
  let recorder: Recorder;
  let blobServiceClient: BlobServiceClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    blobServiceClient = await createBlobServiceClient("TokenCredential", {
      recorder,
      options: {
        keepAliveOptions: {
          enable: true,
        },
      },
    });
    containerName = getUniqueName("container", { recorder });
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = getUniqueName("blob", { recorder });
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  beforeAll(async () => {
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath);
    }
    const MB = 1024 * 1024;
    tempFileLargeLength = 256 * MB + 1; // First prime number after 256MB.
    tempFileLarge = await createRandomLocalFileWithTotalSize(
      tempFolderPath,
      tempFileLargeLength,
      MB,
    );
    tempFileSmallLength = 4 * MB + 37; // First prime number after 4MB.
    tempFileSmall = await createRandomLocalFileWithTotalSize(
      tempFolderPath,
      tempFileSmallLength,
      MB,
    );
  });

  afterAll(async () => {
    fs.unlinkSync(tempFileLarge);
    fs.unlinkSync(tempFileSmall);
  });

  it.runIf(isLiveMode())(
    "put blob with maximum size",
    { timeout: timeoutForLargeFileUploadingTest },
    async () => {
      const MB = 1024 * 1024;
      const maxPutBlobSizeLimitInMB = 5000;
      const tempFile = await createRandomLocalFile(tempFolderPath, maxPutBlobSizeLimitInMB, MB);
      const inputStream = fs.createReadStream(tempFile);

      try {
        await blockBlobClient.upload(() => inputStream, maxPutBlobSizeLimitInMB * MB, {
          abortSignal: AbortSignal.timeout(20 * 1000), // takes too long to upload the file
        });
      } catch (err: any) {
        assert.equal(err.name, "AbortError");
      }

      fs.unlinkSync(tempFile);
    },
  );

  it.runIf(isLiveMode())(
    "uploadFile should success when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES",
    { timeout: timeoutForLargeFileUploadingTest },
    async () => {
      await blockBlobClient.uploadFile(tempFileLarge, {
        blockSize: 4 * 1024 * 1024,
        concurrency: 20,
      });

      const downloadResponse = await blockBlobClient.download(0);
      const downloadedFile = path.join(
        tempFolderPath,
        getUniqueName("downloadfile.", { recorder }),
      );
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

      const downloadedData = fs.readFileSync(downloadedFile);
      const uploadedData = fs.readFileSync(tempFileLarge);

      fs.unlinkSync(downloadedFile);
      assert.ok(downloadedData.equals(uploadedData));
    },
  );

  it.runIf(isLiveMode())("uploadFile should work with tags", async () => {
    const tags = {
      tag1: "val1",
      tag2: "val2",
    };

    await blockBlobClient.uploadFile(tempFileSmall, {
      blockSize: 4 * 1024 * 1024,
      concurrency: 20,
      tags,
    });

    const response = await blockBlobClient.getTags();
    assert.deepStrictEqual(response.tags, tags);
  });

  it.runIf(isLiveMode())(
    "uploadFile should success when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES",
    async () => {
      await blockBlobClient.uploadFile(tempFileSmall, {
        blockSize: 4 * 1024 * 1024,
        concurrency: 20,
      });

      const downloadResponse = await blockBlobClient.download(0);
      const downloadedFile = path.join(
        tempFolderPath,
        getUniqueName("downloadfile.", { recorder }),
      );
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

      const downloadedData = await fs.readFileSync(downloadedFile);
      const uploadedData = await fs.readFileSync(tempFileSmall);

      fs.unlinkSync(downloadedFile);
      assert.ok(downloadedData.equals(uploadedData));
    },
  );

  it.runIf(isLiveMode())(
    "uploadFile should success when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES and configured maxSingleShotSize",
    async () => {
      await blockBlobClient.uploadFile(tempFileSmall, {
        maxSingleShotSize: 0,
      });

      const downloadResponse = await blockBlobClient.download(0);
      const downloadedFile = path.join(
        tempFolderPath,
        getUniqueName("downloadfile.", { recorder }),
      );
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

      const downloadedData = await fs.readFileSync(downloadedFile);
      const uploadedData = await fs.readFileSync(tempFileSmall);

      fs.unlinkSync(downloadedFile);
      assert.ok(downloadedData.equals(uploadedData));
    },
  );

  it("uploadFile should abort when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const aborter = AbortSignal.timeout(1);

    try {
      await blockBlobClient.uploadFile(tempFileLarge, {
        abortSignal: aborter,
        blockSize: 4 * 1024 * 1024,
        concurrency: 20,
      });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("uploadFile should abort when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const aborter = AbortSignal.timeout(1);

    try {
      await blockBlobClient.uploadFile(tempFileSmall, {
        abortSignal: aborter,
        blockSize: 4 * 1024 * 1024,
        concurrency: 20,
      });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it.runIf(isLiveMode())(
    "uploadFile should update progress when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES",
    async () => {
      let eventTriggered = false;
      const aborter = new AbortController();

      try {
        await blockBlobClient.uploadFile(tempFileLarge, {
          abortSignal: aborter.signal,
          blockSize: 4 * 1024 * 1024,
          concurrency: 20,
          onProgress: (ev) => {
            assert.ok(ev.loadedBytes);
            eventTriggered = true;
            aborter.abort();
          },
        });
      } catch (err: any) {}
      assert.ok(eventTriggered);
    },
  );

  it.runIf(isLiveMode())(
    "uploadFile should update progress when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES",
    async () => {
      let eventTriggered = false;
      const aborter = new AbortController();

      try {
        await blockBlobClient.uploadFile(tempFileSmall, {
          abortSignal: aborter.signal,
          blockSize: 4 * 1024 * 1024,
          concurrency: 20,
          onProgress: (ev) => {
            assert.ok(ev.loadedBytes);
            eventTriggered = true;
            aborter.abort();
          },
        });
      } catch (err: any) {}
      assert.ok(eventTriggered);
    },
  );

  it.runIf(isLiveMode())(
    "uploadFile should succeed with blockSize = BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES",
    { timeout: timeoutForLargeFileUploadingTest },
    async () => {
      const tempFile = await createRandomLocalFile(
        tempFolderPath,
        BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES / (1024 * 1024) + 1,
        1024 * 1024,
      );
      try {
        await blockBlobClient.uploadFile(tempFile, {
          blockSize: BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES,
          abortSignal: AbortSignal.timeout(20 * 1000), // takes too long to upload the file
        });
      } catch (err: any) {
        assert.equal(err.name, "AbortError");
      }

      fs.unlinkSync(tempFile);
    },
  );

  it.runIf(isLiveMode())(
    "uploadStream should success",
    { timeout: timeoutForLargeFileUploadingTest },
    async () => {
      const rs = fs.createReadStream(tempFileLarge);
      await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20);

      const downloadResponse = await blockBlobClient.download(0);

      const downloadFilePath = path.join(
        tempFolderPath,
        getUniqueName("downloadFile", { recorder }),
      );
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadFilePath);

      const downloadedBuffer = fs.readFileSync(downloadFilePath);
      const uploadedBuffer = fs.readFileSync(tempFileLarge);
      assert.ok(uploadedBuffer.equals(downloadedBuffer));

      fs.unlinkSync(downloadFilePath);
    },
  );

  it.runIf(isLiveMode())(
    "uploadStream with CPK should success",
    { timeout: timeoutForLargeFileUploadingTest },
    async () => {
      const rs = fs.createReadStream(tempFileLarge);
      await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20, {
        customerProvidedKey,
      });

      try {
        await blockBlobClient.download(0);
        assert.fail("Downloading without CPK should fail.");
      } catch (err) {
        if (!isRestError(err)) {
          throw err;
        }
        assert.deepEqual(err.statusCode, 409);
        assert.deepEqual((err.details as any).errorCode, "BlobUsesCustomerSpecifiedEncryption");
      }

      const downloadResponse = await blockBlobClient.download(0, undefined, {
        customerProvidedKey,
      });

      const downloadFilePath = path.join(
        tempFolderPath,
        getUniqueName("downloadFile", { recorder }),
      );
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadFilePath);

      const downloadedBuffer = fs.readFileSync(downloadFilePath);
      const uploadedBuffer = fs.readFileSync(tempFileLarge);
      assert.ok(uploadedBuffer.equals(downloadedBuffer));

      fs.unlinkSync(downloadFilePath);
    },
  );

  it.runIf(isLiveMode())("uploadStream should success for tiny buffers", async () => {
    const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
    const bufferStream = new PassThrough();
    bufferStream.end(buf);

    await blockBlobClient.uploadStream(bufferStream, 4 * 1024 * 1024, 20);
    const { readableStreamBody } = await blockBlobClient.download(0);
    assert.isDefined(readableStreamBody);
    const downloadedBuffer = await bufferUtil(readableStreamBody);
    assert.ok(buf.equals(downloadedBuffer));
  });

  it.runIf(isLiveMode())("uploadStream should work with tags", async () => {
    const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
    const bufferStream = new PassThrough();
    bufferStream.end(buf);

    const tags = {
      tag1: "val1",
      tag2: "val2",
    };

    await blockBlobClient.uploadStream(bufferStream, 4 * 1024 * 1024, 20, { tags });

    const response = await blockBlobClient.getTags();
    assert.deepStrictEqual(response.tags, tags);
  });

  it.runIf(isLiveMode())("uploadStream should abort", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    const aborter = AbortSignal.timeout(1);

    try {
      await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20, {
        abortSignal: aborter,
      });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it.runIf(isLiveMode())(
    "uploadStream should update progress event",
    { timeout: timeoutForLargeFileUploadingTest },
    async () => {
      const rs = fs.createReadStream(tempFileLarge);
      let eventTriggered = false;

      await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20, {
        onProgress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
        },
      });
      assert.ok(eventTriggered);
    },
  );

  it("uploadStream should work with empty data", async () => {
    const emptyReadable = new Readable();
    emptyReadable.push(null);

    await blockBlobClient.uploadStream(emptyReadable, 1024, 10);

    const downloadResponse = await blockBlobClient.download(0);
    const data = await bodyToString(downloadResponse);
    assert.deepStrictEqual(data, "");
  });

  it.runIf(isLiveMode())(
    "uploadStream should work when blockSize = BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES",
    { timeout: timeoutForLargeFileUploadingTest },
    async () => {
      const tempFile = await createRandomLocalFile(
        tempFolderPath,
        BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES / (1024 * 1024) + 1,
        1024 * 1024,
      );

      const rs = fs.createReadStream(tempFile);
      try {
        // abort as it may take too long, will cover the data integrity validation with manual large scale tests
        await blockBlobClient.uploadStream(rs, BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES, undefined, {
          abortSignal: AbortSignal.timeout(timeoutForLargeFileUploadingTest / 10),
        });
      } catch (err: any) {
        assert.equal(err.name, "AbortError");
      }

      fs.unlinkSync(tempFile);
    },
  );

  it.runIf(isLiveMode())(
    "downloadToBuffer should success - without passing the buffer",
    { timeout: timeoutForLargeFileUploadingTest },
    async () => {
      const rs = fs.createReadStream(tempFileLarge);
      await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20);

      const buf = await blockBlobClient.downloadToBuffer(0, undefined, {
        blockSize: 4 * 1024 * 1024,
        maxRetryRequestsPerBlock: 5,
        concurrency: 20,
      });

      const localFileContent = fs.readFileSync(tempFileLarge);
      assert.ok(localFileContent.equals(buf));
    },
  );

  it("downloadToBuffer should throw error if the count(size provided in bytes) is too large", async () => {
    let error;
    try {
      await blockBlobClient.downloadToBuffer(undefined, buffer.constants.MAX_LENGTH + 1);
    } catch (err: any) {
      error = err;
    }
    assert.ok(
      error.message.includes("Unable to allocate the buffer of size:"),
      "Error is not thrown when the count(size provided in bytes) is too large.",
    );
  });

  it.runIf(isLiveMode())(
    "downloadToBuffer should success",
    { timeout: timeoutForLargeFileUploadingTest },
    async () => {
      const rs = fs.createReadStream(tempFileLarge);
      await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20);

      const buf = Buffer.alloc(tempFileLargeLength);
      await blockBlobClient.downloadToBuffer(buf, 0, undefined, {
        blockSize: 4 * 1024 * 1024,
        maxRetryRequestsPerBlock: 5,
        concurrency: 20,
      });

      const localFileContent = fs.readFileSync(tempFileLarge);
      assert.ok(localFileContent.equals(buf));
    },
  );

  it("downloadBlobToBuffer should success when downloading a range inside blob", async () => {
    await blockBlobClient.upload("aaaabbbb", 8);

    const buf = Buffer.alloc(4);
    await blockBlobClient.downloadToBuffer(buf, 4, 4, {
      blockSize: 4,
      maxRetryRequestsPerBlock: 5,
      concurrency: 1,
    });
    assert.deepStrictEqual(buf.toString(), "bbbb");

    await blockBlobClient.downloadToBuffer(buf, 3, 4, {
      blockSize: 4,
      maxRetryRequestsPerBlock: 5,
      concurrency: 1,
    });
    assert.deepStrictEqual(buf.toString(), "abbb");

    await blockBlobClient.downloadToBuffer(buf, 2, 4, {
      blockSize: 4,
      maxRetryRequestsPerBlock: 5,
      concurrency: 1,
    });
    assert.deepStrictEqual(buf.toString(), "aabb");

    await blockBlobClient.downloadToBuffer(buf, 1, 4, {
      blockSize: 4,
      maxRetryRequestsPerBlock: 5,
      concurrency: 1,
    });
    assert.deepStrictEqual(buf.toString(), "aaab");
  });

  it.runIf(isLiveMode())(
    "downloadToBuffer should abort",
    { timeout: timeoutForLargeFileUploadingTest },
    async () => {
      const rs = fs.createReadStream(tempFileLarge);
      await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20);

      try {
        const buf = Buffer.alloc(tempFileLargeLength);
        await blockBlobClient.downloadToBuffer(buf, 0, undefined, {
          abortSignal: AbortSignal.timeout(1),
          blockSize: 4 * 1024 * 1024,
          maxRetryRequestsPerBlock: 5,
          concurrency: 20,
        });
        assert.fail();
      } catch (err: any) {
        assert.equal(err.name, "AbortError");
      }
    },
  );

  it.runIf(isLiveMode())("downloadToBuffer should update progress event", async () => {
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
        },
      });
    } catch (err: any) {}
    assert.ok(eventTriggered);
  });

  it("downloadToBuffer with CPK", async () => {
    const content = "Hello World";
    const CPKblobName = getUniqueName("blobCPK", { recorder });
    const CPKblobClient = containerClient.getBlobClient(CPKblobName);
    const CPKblockBlobClient = CPKblobClient.getBlockBlobClient();
    await CPKblockBlobClient.upload(content, content.length, {
      customerProvidedKey,
    });

    const downloadToBufferRes = await CPKblockBlobClient.downloadToBuffer(undefined, undefined, {
      customerProvidedKey,
    });
    assert.ok(downloadToBufferRes.equals(Buffer.from(content)));

    let exceptionCaught = false;
    try {
      await CPKblobClient.downloadToBuffer();
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.equal((err.details as any).errorCode, "BlobUsesCustomerSpecifiedEncryption");
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });

  it.runIf(isLiveMode())(
    "blobclient.download should success when internal stream unexpected ends at the stream end",
    async () => {
      const uploadResponse = await blockBlobClient.uploadFile(tempFileSmall, {
        blockSize: 4 * 1024 * 1024,
        concurrency: 20,
      });

      /* eslint-disable prefer-const */
      let retirableReadableStreamOptions: RetriableReadableStreamOptions;
      const downloadResponse = await blockBlobClient.download(0, undefined, {
        conditions: {
          ifMatch: uploadResponse.etag,
        },
        maxRetryRequests: 1,
        onProgress: (ev) => {
          if (ev.loadedBytes >= tempFileSmallLength) {
            retirableReadableStreamOptions.doInjectErrorOnce = true;
          }
        },
      });

      retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
      /* eslint-enable prefer-const */

      const downloadedFile = path.join(
        tempFolderPath,
        getUniqueName("downloadfile.", { recorder }),
      );
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

      const downloadedData = await fs.readFileSync(downloadedFile);
      const uploadedData = await fs.readFileSync(tempFileSmall);

      fs.unlinkSync(downloadedFile);
      assert.ok(downloadedData.equals(uploadedData));
    },
  );

  it.runIf(isLiveMode())(
    "blobclient.download should download full data successfully when internal stream unexpected ends",
    async () => {
      const uploadResponse = await blockBlobClient.uploadFile(tempFileSmall, {
        blockSize: 4 * 1024 * 1024,
        concurrency: 20,
      });

      /* eslint-disable prefer-const */
      let retirableReadableStreamOptions: RetriableReadableStreamOptions;
      let injectedErrors = 0;
      const downloadResponse = await blockBlobClient.download(0, undefined, {
        conditions: {
          ifMatch: uploadResponse.etag,
        },
        maxRetryRequests: 3,
        onProgress: () => {
          if (injectedErrors++ < 3) {
            retirableReadableStreamOptions.doInjectErrorOnce = true;
          }
        },
      });

      retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
      /* eslint-enable prefer-const */

      const downloadedFile = path.join(
        tempFolderPath,
        getUniqueName("downloadfile.", { recorder }),
      );
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

      const downloadedData = await fs.readFileSync(downloadedFile);
      const uploadedData = await fs.readFileSync(tempFileSmall);

      fs.unlinkSync(downloadedFile);
      assert.ok(downloadedData.equals(uploadedData));
    },
  );

  it.runIf(isLiveMode())(
    "blobclient.download should download partial data when internal stream unexpected ends",
    async () => {
      const uploadResponse = await blockBlobClient.uploadFile(tempFileSmall, {
        blockSize: 4 * 1024 * 1024,
        concurrency: 20,
      });

      const partialSize = 500 * 1024;

      /* eslint-disable prefer-const */
      let retirableReadableStreamOptions: RetriableReadableStreamOptions;
      let injectedErrors = 0;
      const downloadResponse = await blockBlobClient.download(0, partialSize, {
        conditions: {
          ifMatch: uploadResponse.etag,
        },
        maxRetryRequests: 3,
        onProgress: () => {
          if (injectedErrors++ < 3) {
            retirableReadableStreamOptions.doInjectErrorOnce = true;
          }
        },
      });

      retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
      /* eslint-enable prefer-const */

      const downloadedFile = path.join(
        tempFolderPath,
        getUniqueName("downloadfile.", { recorder }),
      );
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

      const downloadedData = await fs.readFileSync(downloadedFile);
      const uploadedData = await fs.readFileSync(tempFileSmall);

      fs.unlinkSync(downloadedFile);
      assert.ok(downloadedData.slice(0, partialSize).equals(uploadedData.slice(0, partialSize)));
    },
  );

  it.runIf(isLiveMode())(
    "blobclient.download should download data failed when exceeding max stream retry requests",
    async () => {
      const uploadResponse = await blockBlobClient.uploadFile(tempFileSmall, {
        blockSize: 4 * 1024 * 1024,
        concurrency: 20,
      });

      const downloadedFile = path.join(
        tempFolderPath,
        getUniqueName("downloadfile.", { recorder }),
      );

      let retirableReadableStreamOptions: RetriableReadableStreamOptions;
      let injectedErrors = 0;
      let expectedError = false;

      try {
        const downloadResponse = await blockBlobClient.download(0, undefined, {
          conditions: {
            ifMatch: uploadResponse.etag,
          },
          maxRetryRequests: 0,
          onProgress: () => {
            if (injectedErrors++ < 1) {
              retirableReadableStreamOptions.doInjectErrorOnce = true;
            }
          },
        });
        retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
        await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);
      } catch (error: any) {
        expectedError = true;
      }

      assert.ok(expectedError);
      fs.unlinkSync(downloadedFile);
    },
  );

  it.runIf(isLiveMode())("blobclient.download should abort after retries", async () => {
    const uploadResponse = await blockBlobClient.uploadFile(tempFileSmall, {
      blockSize: 4 * 1024 * 1024,
      concurrency: 20,
    });

    const downloadedFile = path.join(tempFolderPath, getUniqueName("downloadfile.", { recorder }));

    let retirableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    let caughtError: Error | undefined = undefined;

    try {
      const aborter = new AbortController();
      const downloadResponse = await blockBlobClient.download(0, undefined, {
        abortSignal: aborter.signal,
        conditions: {
          ifMatch: uploadResponse.etag,
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
        },
      });
      retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);
    } catch (error: any) {
      caughtError = error;
    }
    fs.unlinkSync(downloadedFile);
    assert.equal(caughtError?.name, "AbortError");
  });

  it.runIf(isLiveMode())("download abort should work when still fetching body", async () => {
    await blockBlobClient.uploadFile(tempFileSmall, {
      blockSize: 4 * 1024 * 1024,
      concurrency: 20,
    });

    const aborter = new AbortController();
    const res = await blobClient.download(0, undefined, { abortSignal: aborter.signal });

    const bodyEnded = new Promise<void>((resolve, reject) => {
      res.readableStreamBody!.on("error", (err) => {
        if (err.name === "AbortError") {
          resolve();
        } else {
          reject(new Error("Expected readableStreamBody to emit AbortError"));
        }
      });
    });

    aborter.abort();
    await bodyEnded;
  });

  it.runIf(isLiveMode())("downloadToFile should success", async () => {
    const downloadedFilePath = getUniqueName("downloadedtofile.", { recorder });
    const rs = fs.createReadStream(tempFileSmall);
    await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20);

    const response = await blobClient.downloadToFile(downloadedFilePath, 0, undefined);

    assert.ok(
      response.contentLength === tempFileSmallLength,
      "response.contentLength doesn't match tempFileSmallLength",
    );
    assert.equal(
      response.readableStreamBody,
      undefined,
      "Expecting response.readableStreamBody to be undefined.",
    );

    const localFileContent = fs.readFileSync(tempFileSmall);
    const downloadedFileContent = fs.readFileSync(downloadedFilePath);
    assert.ok(localFileContent.equals(downloadedFileContent));

    fs.unlinkSync(downloadedFilePath);
  });

  it.runIf(isLiveMode())("downloadToFile should fail when saving to directory", async () => {
    const rs = fs.createReadStream(tempFileSmall);
    await blockBlobClient.uploadStream(rs, 4 * 1024 * 1024, 20);

    try {
      await blobClient.downloadToFile(".");
      assert.fail("Test failure.");
    } catch (err: any) {
      assert.notEqual(err.message, "Test failure.");
    }
  });

  it.runIf(isLiveMode())("set tier while upload", async () => {
    // single upload
    await blockBlobClient.uploadFile(tempFileSmall, {
      tier: "Hot",
      maxSingleShotSize: 256 * 1024 * 1024,
    });
    assert.equal((await blockBlobClient.getProperties()).accessTier, "Hot");

    await blockBlobClient.uploadFile(tempFileSmall, {
      tier: "Cool",
      maxSingleShotSize: 4 * 1024 * 1024,
    });
    assert.equal((await blockBlobClient.getProperties()).accessTier, "Cool");

    await blockBlobClient.uploadStream(fs.createReadStream(tempFileSmall), undefined, undefined, {
      tier: "Hot",
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
