import * as assert from "assert";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { AbortController } from "@azure/abort-controller";
import { createRandomLocalFile, getBSU, recorderEnvSetup } from "../utils";
import { RetriableReadableStreamOptions } from "../../src/utils/RetriableReadableStream";
import { ShareClient, ShareDirectoryClient, ShareFileClient } from "../../src";
import { readStreamToLocalFileWithLogs } from "../../test/utils/testutils.node";
import { record, Recorder } from "@azure/test-utils-recorder";
dotenv.config();

// tslint:disable:no-empty
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

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getBSU();
    shareName = recorder.getUniqueName("share");
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
    dirName = recorder.getUniqueName("dir");
    dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();
    fileName = recorder.getUniqueName("file");
    fileClient = dirClient.getFileClient(fileName);
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await shareClient.delete();
      await recorder.stop();
    }
  });

  before(async () => {
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath);
    }
    tempFileLarge = await createRandomLocalFile(tempFolderPath, 257, 1024 * 1024);
    tempFileLargeLength = 257 * 1024 * 1024;
    tempFileSmall = await createRandomLocalFile(tempFolderPath, 15, 1024 * 1024);
    tempFileSmallLength = 15 * 1024 * 1024;
  });

  after(async () => {
    fs.unlinkSync(tempFileLarge);
    fs.unlinkSync(tempFileSmall);
  });

  it("uploadFile should success for large data", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    await fileClient.uploadFile(tempFileLarge, {
      concurrency: 20,
      rangeSize: 4 * 1024 * 1024
    });

    const downloadResponse = await fileClient.download(0);
    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileLarge);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  }).timeout(timeoutForLargeFileUploadingTest);

  it("uploadFile should success for small data", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    await fileClient.uploadFile(tempFileSmall, {
      concurrency: 20,
      rangeSize: 4 * 1024 * 1024
    });

    const downloadResponse = await fileClient.download(0);
    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("uploadFile should abort for large data", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const aborter = AbortController.timeout(1);

    try {
      await fileClient.uploadFile(tempFileLarge, {
        abortSignal: aborter,
        concurrency: 20,
        rangeSize: 4 * 1024 * 1024
      });
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("uploadFile should abort for small data", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const aborter = AbortController.timeout(1);

    try {
      await fileClient.uploadFile(tempFileSmall, {
        abortSignal: aborter,
        concurrency: 20,
        rangeSize: 4 * 1024 * 1024
      });
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("uploadFile should update progress for large data", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
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
        rangeSize: 4 * 1024 * 1024
      });
    } catch (err) {
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
    assert.ok(eventTriggered);
  });

  it("uploadFile should update progress for small data", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
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
        rangeSize: 4 * 1024 * 1024
      });
    } catch (err) {
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
    assert.ok(eventTriggered);
  });

  it("uploadStream should success", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const rs = fs.createReadStream(tempFileLarge);
    await fileClient.uploadStream(rs, tempFileLargeLength, 4 * 1024 * 1024, 20);

    const downloadResponse = await fileClient.download(0);

    const downloadFilePath = path.join(tempFolderPath, recorder.getUniqueName("downloadFile"));
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadFilePath);

    const downloadedBuffer = fs.readFileSync(downloadFilePath);
    const uploadedBuffer = fs.readFileSync(tempFileLarge);
    assert.ok(uploadedBuffer.equals(downloadedBuffer));

    fs.unlinkSync(downloadFilePath);
  }).timeout(timeoutForLargeFileUploadingTest);

  it("uploadStream should abort", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const rs = fs.createReadStream(tempFileLarge);
    const aborter = AbortController.timeout(1);

    try {
      await fileClient.uploadStream(rs, tempFileLargeLength, 4 * 1024 * 1024, 20, {
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

    await fileClient.uploadStream(rs, tempFileLargeLength, 4 * 1024 * 1024, 20, {
      onProgress: (ev) => {
        assert.ok(ev.loadedBytes);
        eventTriggered = true;
      }
    });
    assert.ok(eventTriggered);
  }).timeout(timeoutForLargeFileUploadingTest);

  it("downloadToBuffer should success", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const rs = fs.createReadStream(tempFileLarge);
    await fileClient.uploadStream(rs, tempFileLargeLength, 4 * 1024 * 1024, 20);

    const buf = Buffer.alloc(tempFileLargeLength);
    await fileClient.downloadToBuffer(buf, undefined, undefined, {
      concurrency: 20,
      rangeSize: 4 * 1024 * 1024
    });

    const localFileContent = fs.readFileSync(tempFileLarge);
    assert.ok(localFileContent.equals(buf));
  }).timeout(timeoutForLargeFileUploadingTest);

  it("downloadToBuffer should succeed - without passing the buffer", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const rs = fs.createReadStream(tempFileLarge);
    await fileClient.uploadStream(rs, tempFileLargeLength, 4 * 1024 * 1024, 20);

    const buf = await fileClient.downloadToBuffer(0, undefined, {
      concurrency: 20,
      rangeSize: 4 * 1024 * 1024
    });

    const localFileContent = fs.readFileSync(tempFileLarge);
    assert.ok(localFileContent.equals(buf));
  }).timeout(timeoutForLargeFileUploadingTest);

  it("downloadToBuffer should throw an error if the count (size in bytes) is too large", async () => {
    let error;
    try {
      await fileClient.downloadToBuffer(undefined, 4 * 1024 * 1024 * 1024);
    } catch (err) {
      error = err;
    }
    assert.ok(
      error.message.includes("Unable to allocate a buffer of size:"),
      "Error is not thrown when the count (size in bytes) is too large"
    );
  });

  it("fileClient.downloadToBuffer should success when downloading a range inside file", async () => {
    await fileClient.create(8);
    await fileClient.uploadRange("aaaabbbb", 0, 8);

    const buf = Buffer.alloc(4);
    await fileClient.downloadToBuffer(buf, 4, 4, {
      rangeSize: 4,
      maxRetryRequestsPerRange: 5,
      concurrency: 1
    });
    assert.deepStrictEqual(buf.toString(), "bbbb");

    await fileClient.downloadToBuffer(buf, 3, 4, {
      rangeSize: 4,
      maxRetryRequestsPerRange: 5,
      concurrency: 1
    });
    assert.deepStrictEqual(buf.toString(), "abbb");

    await fileClient.downloadToBuffer(buf, 2, 4, {
      rangeSize: 4,
      maxRetryRequestsPerRange: 5,
      concurrency: 1
    });
    assert.deepStrictEqual(buf.toString(), "aabb");

    await fileClient.downloadToBuffer(buf, 1, 4, {
      rangeSize: 4,
      maxRetryRequestsPerRange: 5,
      concurrency: 1
    });
    assert.deepStrictEqual(buf.toString(), "aaab");

    await fileClient.downloadToBuffer(buf, 0, 4, {
      rangeSize: 4,
      maxRetryRequestsPerRange: 5,
      concurrency: 1
    });
    assert.deepStrictEqual(buf.toString(), "aaaa");
  });

  it("downloadToBuffer should abort", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const rs = fs.createReadStream(tempFileLarge);
    await fileClient.uploadStream(rs, tempFileLargeLength, 4 * 1024 * 1024, 20);

    try {
      const buf = Buffer.alloc(tempFileLargeLength);
      await fileClient.downloadToBuffer(buf, 0, undefined, {
        abortSignal: AbortController.timeout(1),
        concurrency: 20,
        rangeSize: 4 * 1024 * 1024
      });
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }
  }).timeout(timeoutForLargeFileUploadingTest);

  it("downloadToBuffer should update progress event", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
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
        rangeSize: 1 * 1024
      });
    } catch (err) {
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
    assert.ok(eventTriggered);
  });

  it("fileClient.download should success when internal stream unexpected ends at the stream end", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    await fileClient.uploadFile(tempFileSmall, {
      rangeSize: 4 * 1024 * 1024,
      concurrency: 20
    });

    let retriableReadableStreamOptions: RetriableReadableStreamOptions;
    const downloadResponse = await fileClient.download(0, undefined, {
      maxRetryRequests: 1,
      onProgress: (ev) => {
        if (ev.loadedBytes >= tempFileSmallLength) {
          retriableReadableStreamOptions.doInjectErrorOnce = true;
        }
      }
    });

    retriableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("fileClient.download should download full data successfully when internal stream unexpected ends", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    await fileClient.uploadFile(tempFileSmall, {
      rangeSize: 4 * 1024 * 1024,
      concurrency: 20
    });

    let retriableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    const downloadResponse = await fileClient.download(0, undefined, {
      maxRetryRequests: 3,
      onProgress: () => {
        if (injectedErrors++ < 3) {
          retriableReadableStreamOptions.doInjectErrorOnce = true;
        }
      }
    });

    retriableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("fileClient.download should download partial data when internal stream unexpected ends", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    await fileClient.uploadFile(tempFileSmall, {
      rangeSize: 4 * 1024 * 1024,
      concurrency: 20
    });

    const partialSize = 10 * 1024;

    let retriableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    const downloadResponse = await fileClient.download(1, partialSize, {
      maxRetryRequests: 3,
      onProgress: () => {
        if (injectedErrors++ < 3) {
          retriableReadableStreamOptions.doInjectErrorOnce = true;
        }
      }
    });

    retriableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData.slice(1, partialSize + 1)));
  });

  it("fileClient.download should download data failed when exceeding max stream retry requests", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    await fileClient.uploadFile(tempFileSmall, {
      rangeSize: 4 * 1024 * 1024,
      concurrency: 20
    });

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));

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
        }
      });
      retriableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);
    } catch (error) {
      expectedError = true;
    }

    assert.ok(expectedError);
    fs.unlinkSync(downloadedFile);
  });

  it("fileClient.download should abort after retries", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    await fileClient.uploadFile(tempFileSmall, {
      rangeSize: 4 * 1024 * 1024,
      concurrency: 20
    });

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));

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
        }
      });
      retriableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
      await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadedFile);
    } catch (error) {
      assert.equal(error.name, "AbortError", "Unexpected error caught: " + error);
    }

    fs.unlinkSync(downloadedFile);
  });

  it("downloadToFile should success", async () => {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const downloadedFilePath = recorder.getUniqueName("downloadedtofile.");
    const rs = fs.createReadStream(tempFileSmall);
    await fileClient.uploadStream(rs, tempFileSmallLength, 4 * 1024 * 1024, 20);

    const response = await fileClient.downloadToFile(downloadedFilePath, 0, undefined);

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
});
