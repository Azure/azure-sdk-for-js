// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import buffer from "node:buffer";
import fs from "node:fs";
import path from "node:path";

import {
  createRandomLocalFile,
  getBSU,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "../utils/index.js";
import type { RetriableReadableStreamOptions } from "../../src/utils/RetriableReadableStream.js";
import type { ShareClient, ShareDirectoryClient, ShareFileClient } from "../../src/index.js";
import { readStreamToLocalFileWithLogs } from "../../test/utils/testutils.node.js";
import { Recorder, isLiveMode } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach, beforeAll, afterAll } from "vitest";

describe("Highlevel Node.js only", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;
  let fileName: string;
  let fileClient: ShareFileClient;
  let tempFileSmall: string;
  let tempFileSmallLength: number;
  let tempFileLarge: string;
  let tempFileLargeLength: number;
  const tempFolderPath = "temp";
  const timeoutForLargeFileUploadingTest = 20 * 60 * 1000;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    const serviceClient = getBSU(recorder);
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
    dirName = recorder.variable("dir", getUniqueName("dir"));
    dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();
    fileName = recorder.variable("file", getUniqueName("file"));
    fileClient = dirClient.getFileClient(fileName);
  });

  afterEach(async () => {
    if (shareClient) {
      await shareClient.delete();
    }
    await recorder.stop();
  });

  beforeAll(async () => {
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath);
    }
    tempFileLarge = await createRandomLocalFile(tempFolderPath, 257, 1024 * 1024);
    tempFileLargeLength = 257 * 1024 * 1024;
    tempFileSmall = await createRandomLocalFile(tempFolderPath, 4, 1024 * 1024);
    tempFileSmallLength = 4 * 1024 * 1024;
  });

  afterAll(async () => {
    fs.unlinkSync(tempFileLarge);
    fs.unlinkSync(tempFileSmall);
  });

  it(
    "uploadFile should success for large data",
    { timeout: timeoutForLargeFileUploadingTest },
    async (ctx) => {
      if (!isLiveMode()) {
        ctx.skip();
      }
      await fileClient.uploadFile(tempFileLarge, {
        concurrency: 20,
        rangeSize: 4 * 1024 * 1024,
      });

      const downloadResponse = await fileClient.download(0);
      const downloadedFile = path.join(
        tempFolderPath,
        recorder.variable("downloadfile.", getUniqueName("downloadfile.")),
      );
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

      const downloadedData = await fs.readFileSync(downloadedFile);
      const uploadedData = await fs.readFileSync(tempFileLarge);

      fs.unlinkSync(downloadedFile);
      assert.ok(downloadedData.equals(uploadedData));
    },
  );

  it("uploadFile should success for small data", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    await fileClient.uploadFile(tempFileSmall, {
      concurrency: 20,
      rangeSize: 4 * 1024 * 1024,
    });

    const downloadResponse = await fileClient.download(0);
    const downloadedFile = path.join(
      tempFolderPath,
      recorder.variable("downloadfile.", getUniqueName("downloadfile.")),
    );
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("uploadFile should abort for large data", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const aborter = AbortSignal.timeout(1);

    try {
      await fileClient.uploadFile(tempFileLarge, {
        abortSignal: aborter,
        concurrency: 20,
        rangeSize: 4 * 1024 * 1024,
      });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("uploadFile should abort for small data", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const aborter = AbortSignal.timeout(1);

    try {
      await fileClient.uploadFile(tempFileSmall, {
        abortSignal: aborter,
        concurrency: 20,
        rangeSize: 4 * 1024 * 1024,
      });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("uploadFile should update progress for large data", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    let eventTriggered = false;
    const aborter = new AbortController();

    try {
      await fileClient.uploadFile(tempFileLarge, {
        abortSignal: aborter.signal,
        concurrency: 20,
        onProgress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        },
        rangeSize: 4 * 1024 * 1024,
      });
    } catch (err: any) {
      assert.equal(
        err.message,
        "The operation was aborted. Rejecting from abort signal callback while making request.",
        "Unexpected error caught: " + err,
      );
    }
    assert.ok(eventTriggered);
  });

  it("uploadFile should update progress for small data", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    let eventTriggered = false;
    const aborter = new AbortController();

    try {
      await fileClient.uploadFile(tempFileSmall, {
        abortSignal: aborter.signal,
        concurrency: 20,
        onProgress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        },
        rangeSize: 4 * 1024 * 1024,
      });
    } catch (err: any) {
      assert.equal(
        err.message,
        "The operation was aborted. Rejecting from abort signal callback while making request.",
        "Unexpected error caught: " + err,
      );
    }
    assert.ok(eventTriggered);
  });

  it("uploadStream should success", { timeout: timeoutForLargeFileUploadingTest }, async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const rs = fs.createReadStream(tempFileLarge);
    await fileClient.uploadStream(rs, tempFileLargeLength, 4 * 1024 * 1024, 20);

    const downloadResponse = await fileClient.download(0);

    const downloadFilePath = path.join(
      tempFolderPath,
      recorder.variable("downloadFile", getUniqueName("downloadFile")),
    );
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadFilePath);

    const downloadedBuffer = fs.readFileSync(downloadFilePath);
    const uploadedBuffer = fs.readFileSync(tempFileLarge);
    assert.ok(uploadedBuffer.equals(downloadedBuffer));

    fs.unlinkSync(downloadFilePath);
  });

  it("uploadStream should abort", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const rs = fs.createReadStream(tempFileLarge);
    const aborter = AbortSignal.timeout(1);

    try {
      await fileClient.uploadStream(rs, tempFileLargeLength, 4 * 1024 * 1024, 20, {
        abortSignal: aborter,
      });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it(
    "uploadStream should update progress event",
    { timeout: timeoutForLargeFileUploadingTest },
    async (ctx) => {
      if (!isLiveMode()) {
        ctx.skip();
      }
      const rs = fs.createReadStream(tempFileLarge);
      let eventTriggered = false;

      await fileClient.uploadStream(rs, tempFileLargeLength, 4 * 1024 * 1024, 20, {
        onProgress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
        },
      });
      assert.ok(eventTriggered);
    },
  );

  it("uploadData should work with Buffer, ArrayBuffer and ArrayBufferView", async () => {
    const byteLength = 10;
    const arrayBuf = new ArrayBuffer(byteLength);
    const uint8Array = new Uint8Array(arrayBuf);
    for (let i = 0; i < byteLength; i++) {
      uint8Array[i] = i;
    }

    await fileClient.uploadData(arrayBuf);
    const res = await fileClient.downloadToBuffer();
    assert.ok(res.equals(Buffer.from(arrayBuf)));

    const uint8ArrayPartial = new Uint8Array(arrayBuf, 1, 3);
    await fileClient.uploadData(uint8ArrayPartial);
    const res1 = await fileClient.downloadToBuffer();
    assert.ok(res1.equals(Buffer.from(arrayBuf, 1, 3)));

    const uint16Array = new Uint16Array(arrayBuf, 4, 2);
    await fileClient.uploadData(uint16Array);
    const res2 = await fileClient.downloadToBuffer();
    assert.ok(res2.equals(Buffer.from(arrayBuf, 4, 2 * 2)));

    const buf = Buffer.from(arrayBuf, 0, 5);
    await fileClient.uploadData(buf);
    const res3 = await fileClient.downloadToBuffer();
    assert.ok(res3.equals(buf));
  });

  it(
    "downloadToBuffer should success",
    { timeout: timeoutForLargeFileUploadingTest },
    async (ctx) => {
      if (!isLiveMode()) {
        ctx.skip();
      }
      const rs = fs.createReadStream(tempFileLarge);
      await fileClient.uploadStream(rs, tempFileLargeLength, 4 * 1024 * 1024, 20);

      const buf = Buffer.alloc(tempFileLargeLength);
      await fileClient.downloadToBuffer(buf, undefined, undefined, {
        concurrency: 20,
        rangeSize: 4 * 1024 * 1024,
      });

      const localFileContent = fs.readFileSync(tempFileLarge);
      assert.ok(localFileContent.equals(buf));
    },
  );

  it(
    "downloadToBuffer should succeed - without passing the buffer",
    { timeout: timeoutForLargeFileUploadingTest },
    async (ctx) => {
      if (!isLiveMode()) {
        ctx.skip();
      }
      const rs = fs.createReadStream(tempFileLarge);
      await fileClient.uploadStream(rs, tempFileLargeLength, 4 * 1024 * 1024, 20);

      const buf = await fileClient.downloadToBuffer(0, undefined, {
        concurrency: 20,
        rangeSize: 4 * 1024 * 1024,
      });

      const localFileContent = fs.readFileSync(tempFileLarge);
      assert.ok(localFileContent.equals(buf));
    },
  );

  it("downloadToBuffer should throw an error if the count (size in bytes) is too large", async () => {
    let error;
    try {
      // casting to "any" is required since @types/node@8 doesn't have `constants` though it is present on the `buffer`,
      // "as any" can be removed once we move from @types/node v8 to v10
      await fileClient.downloadToBuffer(undefined, (buffer as any).constants.MAX_LENGTH + 1);
    } catch (err: any) {
      error = err;
    }
    assert.ok(
      error.message.includes("Unable to allocate a buffer of size:"),
      "Error is not thrown when the count (size in bytes) is too large",
    );
  });

  it("fileClient.downloadToBuffer should success when downloading a range inside file", async () => {
    await fileClient.create(8);
    await fileClient.uploadRange("aaaabbbb", 0, 8);

    const buf = Buffer.alloc(4);
    await fileClient.downloadToBuffer(buf, 4, 4, {
      rangeSize: 4,
      maxRetryRequestsPerRange: 5,
      concurrency: 1,
    });
    assert.deepStrictEqual(buf.toString(), "bbbb");

    await fileClient.downloadToBuffer(buf, 3, 4, {
      rangeSize: 4,
      maxRetryRequestsPerRange: 5,
      concurrency: 1,
    });
    assert.deepStrictEqual(buf.toString(), "abbb");

    await fileClient.downloadToBuffer(buf, 2, 4, {
      rangeSize: 4,
      maxRetryRequestsPerRange: 5,
      concurrency: 1,
    });
    assert.deepStrictEqual(buf.toString(), "aabb");

    await fileClient.downloadToBuffer(buf, 1, 4, {
      rangeSize: 4,
      maxRetryRequestsPerRange: 5,
      concurrency: 1,
    });
    assert.deepStrictEqual(buf.toString(), "aaab");

    await fileClient.downloadToBuffer(buf, 0, 4, {
      rangeSize: 4,
      maxRetryRequestsPerRange: 5,
      concurrency: 1,
    });
    assert.deepStrictEqual(buf.toString(), "aaaa");
  });

  it(
    "downloadToBuffer should abort",
    { timeout: timeoutForLargeFileUploadingTest },
    async (ctx) => {
      if (!isLiveMode()) {
        ctx.skip();
      }
      const rs = fs.createReadStream(tempFileLarge);
      await fileClient.uploadStream(rs, tempFileLargeLength, 4 * 1024 * 1024, 20);

      try {
        const buf = Buffer.alloc(tempFileLargeLength);
        await fileClient.downloadToBuffer(buf, 0, undefined, {
          abortSignal: AbortSignal.timeout(1),
          concurrency: 20,
          rangeSize: 4 * 1024 * 1024,
        });
        assert.fail();
      } catch (err: any) {
        assert.equal(err.name, "AbortError");
      }
    },
  );

  it("downloadToBuffer should update progress event", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const rs = fs.createReadStream(tempFileSmall);
    await fileClient.uploadStream(rs, tempFileSmallLength, 4 * 1024 * 1024, 10);

    let eventTriggered = false;
    const buf = Buffer.alloc(tempFileSmallLength);
    const aborter = new AbortController();
    try {
      await fileClient.downloadToBuffer(buf, 0, undefined, {
        abortSignal: aborter.signal,
        concurrency: 1,
        onProgress: () => {
          eventTriggered = true;
          aborter.abort();
        },
        rangeSize: 1 * 1024,
      });
    } catch (err: any) {
      assert.equal(
        err.message,
        "The operation was aborted. Request has already been canceled.",
        "Unexpected error caught: " + err,
      );
    }
    assert.ok(eventTriggered);
  });

  it("fileClient.download should success when internal stream unexpected ends at the stream end", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    await fileClient.uploadFile(tempFileSmall, {
      rangeSize: 4 * 1024 * 1024,
      concurrency: 20,
    });

    /* eslint-disable-next-line prefer-const*/
    let retriableReadableStreamOptions: RetriableReadableStreamOptions;
    const downloadResponse = await fileClient.download(0, undefined, {
      maxRetryRequests: 1,
      onProgress: (ev) => {
        if (ev.loadedBytes >= tempFileSmallLength) {
          retriableReadableStreamOptions.doInjectErrorOnce = true;
        }
      },
    });

    retriableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;

    const downloadedFile = path.join(
      tempFolderPath,
      recorder.variable("downloadfile.", getUniqueName("downloadfile.")),
    );
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("fileClient.download should download full data successfully when internal stream unexpected ends", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    await fileClient.uploadFile(tempFileSmall, {
      rangeSize: 4 * 1024 * 1024,
      concurrency: 20,
    });

    /* eslint-disable-next-line prefer-const*/
    let retriableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    const downloadResponse = await fileClient.download(0, undefined, {
      maxRetryRequests: 3,
      onProgress: () => {
        if (injectedErrors++ < 3) {
          retriableReadableStreamOptions.doInjectErrorOnce = true;
        }
      },
    });

    retriableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;

    const downloadedFile = path.join(
      tempFolderPath,
      recorder.variable("downloadfile.", getUniqueName("downloadfile.")),
    );
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("fileClient.download should download partial data when internal stream unexpected ends", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    await fileClient.uploadFile(tempFileSmall, {
      rangeSize: 4 * 1024 * 1024,
      concurrency: 20,
    });

    const partialSize = 10 * 1024;

    /* eslint-disable-next-line prefer-const*/
    let retriableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    const downloadResponse = await fileClient.download(1, partialSize, {
      maxRetryRequests: 3,
      onProgress: () => {
        if (injectedErrors++ < 3) {
          retriableReadableStreamOptions.doInjectErrorOnce = true;
        }
      },
    });

    retriableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;

    const downloadedFile = path.join(
      tempFolderPath,
      recorder.variable("downloadfile.", getUniqueName("downloadfile.")),
    );
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData.slice(1, partialSize + 1)));
  });

  it("fileClient.download should download data failed when exceeding max stream retry requests", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    await fileClient.uploadFile(tempFileSmall, {
      rangeSize: 4 * 1024 * 1024,
      concurrency: 20,
    });

    const downloadedFile = path.join(
      tempFolderPath,
      recorder.variable("downloadfile.", getUniqueName("downloadfile.")),
    );

    let retriableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    let expectedError = false;

    try {
      const downloadResponse = await fileClient.download(0, undefined, {
        maxRetryRequests: 0,
        onProgress: () => {
          if (injectedErrors++ < 1) {
            retriableReadableStreamOptions.doInjectErrorOnce = true;
          }
        },
      });
      retriableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);
    } catch (error: any) {
      expectedError = true;
    }

    assert.ok(expectedError);
    fs.unlinkSync(downloadedFile);
  });

  it("fileClient.download should abort after retries", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    await fileClient.uploadFile(tempFileSmall, {
      rangeSize: 4 * 1024 * 1024,
      concurrency: 20,
    });

    const downloadedFile = path.join(
      tempFolderPath,
      recorder.variable("downloadfile.", getUniqueName("downloadfile.")),
    );

    let retriableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;

    try {
      const aborter = new AbortController();
      const downloadResponse = await fileClient.download(0, undefined, {
        abortSignal: aborter.signal,
        maxRetryRequests: 3,
        onProgress: () => {
          if (injectedErrors++ < 2) {
            // Triger 2 times of retry
            retriableReadableStreamOptions.doInjectErrorOnce = true;
          } else {
            // Trigger aborter
            aborter.abort();
          }
        },
      });
      retriableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);
    } catch (error: any) {
      assert.equal(error.name, "AbortError", "Unexpected error caught: " + error);
    }

    fs.unlinkSync(downloadedFile);
  });

  it("downloadToFile should success", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const downloadedFilePath = recorder.variable(
      "downloadedtofile.",
      getUniqueName("downloadedtofile."),
    );
    const rs = fs.createReadStream(tempFileSmall);
    await fileClient.uploadStream(rs, tempFileSmallLength, 4 * 1024 * 1024, 20);

    const response = await fileClient.downloadToFile(downloadedFilePath, 0, undefined);

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
  
  it.only("create with data should update progress event", async (ctx) => {
    if (!isLiveMode()) {
      ctx.skip();
    }
    const rs = fs.createReadStream(tempFileSmall);

    let eventTriggered = false;
    await fileClient.create(tempFileSmallLength, 
      {
        content: rs,
        contentLength: tempFileSmallLength,
        onProgress: () => {
          eventTriggered = true;
        },
      });
    assert.ok(eventTriggered);
    
    const downloadResponse = await fileClient.download(0);
    
    const downloadedFile = path.join(
        tempFolderPath,
        recorder.variable("downloadfile.", getUniqueName("downloadfile.")),
      );
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });
});
