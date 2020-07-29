import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import { PassThrough } from "stream";

import { AbortController } from "@azure/abort-controller";
import { createRandomLocalFile, getBSU, recorderEnvSetup } from "../utils";
import { RetriableReadableStreamOptions } from "../../src/utils/RetriableReadableStream";
import { record, Recorder } from "@azure/test-utils-recorder";
import { ContainerClient, BlobClient, BlockBlobClient, BlobServiceClient } from "../../src";
import { readStreamToLocalFileWithLogs } from "../utils/testutils.node";
import { BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES } from "../../src/utils/constants";
import { Test_CPK_INFO } from "../utils/constants";

// tslint:disable:no-empty
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
  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    blobServiceClient = getBSU();
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.getUniqueName("blob");
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await containerClient.delete();
      await recorder.stop();
    }
  });

  before(async function() {
    recorder = record(this, recorderEnvSetup);
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath);
    }
    tempFileLarge = await createRandomLocalFile(tempFolderPath, 257, 1024 * 1024);
    tempFileLargeLength = 257 * 1024 * 1024;
    tempFileSmall = await createRandomLocalFile(tempFolderPath, 15, 1024 * 1024);
    tempFileSmallLength = 15 * 1024 * 1024;
    await recorder.stop();
  });

  after(async function() {
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
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
    const bufferStream = new PassThrough();
    bufferStream.end(buf);

    await blockBlobClient.uploadStream(bufferStream, 4 * 1024 * 1024, 20);
    const downloadResponse = await blockBlobClient.download(0);

    const downloadFilePath = path.join(tempFolderPath, recorder.getUniqueName("downloadFile"));
    await readStreamToLocalFileWithLogs(downloadResponse.readableStreamBody!, downloadFilePath);

    const downloadedBuffer = fs.readFileSync(downloadFilePath);
    assert.ok(buf.equals(downloadedBuffer));

    fs.unlinkSync(downloadFilePath);
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
      await blockBlobClient.downloadToBuffer(undefined, 4 * 1024 * 1024 * 1024);
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
});
