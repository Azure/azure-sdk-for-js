import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import { PassThrough } from "stream";

import { BlobURL, BlockBlobURL, ContainerURL } from "../../src";
import { Aborter } from "../../src/Aborter";
import {
  downloadBlobToBuffer,
  uploadFileToBlockBlob,
  uploadFileToBlockBlobUrl,
  uploadStreamToBlockBlob,
  uploadStreamToBlockBlobUrl
} from "../../src/highlevel.node";
import { IRetriableReadableStreamOptions } from "../../src/utils/RetriableReadableStream";
import {
  createRandomLocalFile,
  getBSU,
  getUniqueName,
  readStreamToLocalFile
} from "../utils";

// tslint:disable:no-empty
describe("Highlevel", () => {
  const serviceURL = getBSU();
  let containerName = getUniqueName("container");
  let containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
  let blobName = getUniqueName("blob");
  let blobURL = BlobURL.fromContainerURL(containerURL, blobName);
  let blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  let tempFileSmall: string;
  let tempFileSmallLength: number;
  let tempFileLarge: string;
  let tempFileLargeLength: number;
  const tempFolderPath = "temp";

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create();
    blobName = getUniqueName("blob");
    blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  });

  afterEach(async () => {
    await containerURL.delete();
  });

  before(async () => {
    if (!fs.existsSync(tempFolderPath)) {
      fs.mkdirSync(tempFolderPath);
    }
    tempFileLarge = await createRandomLocalFile(
      tempFolderPath,
      257,
      1024 * 1024
    );
    tempFileLargeLength = 257 * 1024 * 1024;
    tempFileSmall = await createRandomLocalFile(
      tempFolderPath,
      15,
      1024 * 1024
    );
    tempFileSmallLength = 15 * 1024 * 1024;
  });

  after(async () => {
    fs.unlinkSync(tempFileLarge);
    fs.unlinkSync(tempFileSmall);
  });

  it("uploadFileToBlockBlob should success when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    await uploadFileToBlockBlob(tempFileLarge, blockBlobURL, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const downloadResponse = await blockBlobURL.download(0);
    const downloadedFile = path.join(
      tempFolderPath,
      getUniqueName("downloadfile.")
    );
    await readStreamToLocalFile(
      downloadResponse.readableStreamBody!,
      downloadedFile
    );

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileLarge);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("uploadFileToBlockBlob should success when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    await uploadFileToBlockBlob(tempFileSmall, blockBlobURL, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const downloadResponse = await blockBlobURL.download(0);
    const downloadedFile = path.join(
      tempFolderPath,
      getUniqueName("downloadfile.")
    );
    await readStreamToLocalFile(
      downloadResponse.readableStreamBody!,
      downloadedFile
    );

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("uploadFileToBlockBlobUrl should success when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const url = blockBlobURL.url;
    const credential = blockBlobURL.pipeline.factories[blockBlobURL.pipeline.factories.length - 1];
    await uploadFileToBlockBlobUrl(tempFileSmall, url, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 20
    },
    credential, {
      // Enable logger when debugging
      // logger: new ConsoleHttpPipelineLogger(HttpPipelineLogLevel.INFO)
    });

    const downloadResponse = await blockBlobURL.download(0);
    const downloadedFile = path.join(
      tempFolderPath,
      getUniqueName("downloadfile.")
    );
    await readStreamToLocalFile(
      downloadResponse.readableStreamBody!,
      downloadedFile
    );

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("uploadFileToBlockBlob should success when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES and configured maxSingleShotSize", async () => {
    await uploadFileToBlockBlob(tempFileSmall, blockBlobURL, {
      maxSingleShotSize: 0
    });

    const downloadResponse = await blockBlobURL.download(0);
    const downloadedFile = path.join(
      tempFolderPath,
      getUniqueName("downloadfile.")
    );
    await readStreamToLocalFile(
      downloadResponse.readableStreamBody!,
      downloadedFile
    );

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("uploadFileToBlockBlob should abort when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await uploadFileToBlockBlob(tempFileLarge, blockBlobURL, {
        abortSignal: aborter,
        blockSize: 4 * 1024 * 1024,
        parallelism: 20
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("uploadFileToBlockBlob should abort when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await uploadFileToBlockBlob(tempFileSmall, blockBlobURL, {
        abortSignal: aborter,
        blockSize: 4 * 1024 * 1024,
        parallelism: 20
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("uploadFileToBlockBlob should update progress when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    let eventTriggered = false;
    const aborter = Aborter.none;

    try {
      await uploadFileToBlockBlob(tempFileLarge, blockBlobURL, {
        abortSignal: aborter,
        blockSize: 4 * 1024 * 1024,
        parallelism: 20,
        progress: ev => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        }
      });
    } catch (err) {}
    assert.ok(eventTriggered);
  });

  it("uploadFileToBlockBlob should update progress when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    let eventTriggered = false;
    const aborter = Aborter.none;

    try {
      await uploadFileToBlockBlob(tempFileSmall, blockBlobURL, {
        abortSignal: aborter,
        blockSize: 4 * 1024 * 1024,
        parallelism: 20,
        progress: ev => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        }
      });
    } catch (err) {}
    assert.ok(eventTriggered);
  });

  it("uploadStreamToBlockBlob should success", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    await uploadStreamToBlockBlob(
      rs,
      blockBlobURL,
      4 * 1024 * 1024,
      20
    );

    const downloadResponse = await blockBlobURL.download(0);

    const downloadFilePath = path.join(
      tempFolderPath,
      getUniqueName("downloadFile")
    );
    await readStreamToLocalFile(
      downloadResponse.readableStreamBody!,
      downloadFilePath
    );

    const downloadedBuffer = fs.readFileSync(downloadFilePath);
    const uploadedBuffer = fs.readFileSync(tempFileLarge);
    assert.ok(uploadedBuffer.equals(downloadedBuffer));

    fs.unlinkSync(downloadFilePath);
  });

  it("uploadStreamToBlockBlob should success for tiny buffers", async () => {
    const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
    const bufferStream = new PassThrough();
    bufferStream.end(buf);

    await uploadStreamToBlockBlob(
      bufferStream,
      blockBlobURL,
      4 * 1024 * 1024,
      20
    );

    const downloadResponse = await blockBlobURL.download(0);

    const downloadFilePath = path.join(
      tempFolderPath,
      getUniqueName("downloadFile")
    );
    await readStreamToLocalFile(
      downloadResponse.readableStreamBody!,
      downloadFilePath
    );

    const downloadedBuffer = fs.readFileSync(downloadFilePath);
    assert.ok(buf.equals(downloadedBuffer));

    fs.unlinkSync(downloadFilePath);
  });

  it("uploadStreamToBlockBlob should abort", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    const aborter = Aborter.timeout(1);

    try {
      await uploadStreamToBlockBlob(
        rs,
        blockBlobURL,
        4 * 1024 * 1024,
        20,
        {
          abortSignal: aborter
        }
      );
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("uploadStreamToBlockBlob should update progress event", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    let eventTriggered = false;

    await uploadStreamToBlockBlob(
      rs,
      blockBlobURL,
      4 * 1024 * 1024,
      20,
      {
        progress: ev => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
        }
      }
    );
    assert.ok(eventTriggered);
  });

  it("downloadBlobToBuffer should success", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    await uploadStreamToBlockBlob(
      rs,
      blockBlobURL,
      4 * 1024 * 1024,
      20
    );

    const buf = Buffer.alloc(tempFileLargeLength);
    await downloadBlobToBuffer(buf, blockBlobURL, 0, undefined, {
      blockSize: 4 * 1024 * 1024,
      maxRetryRequestsPerBlock: 5,
      parallelism: 20
    });

    const localFileContent = fs.readFileSync(tempFileLarge);
    assert.ok(localFileContent.equals(buf));
  });

  it("downloadBlobToBufferUrl should success", async () => {
    const url = blockBlobURL.url;
    const credential = blockBlobURL.pipeline.factories[blockBlobURL.pipeline.factories.length - 1];
    const rs = fs.createReadStream(tempFileLarge);
    await uploadStreamToBlockBlobUrl(
      rs,
      url,
      4 * 1024 * 1024,
      20,
      {},
      credential
    );

    const buf = Buffer.alloc(tempFileLargeLength);
    await downloadBlobToBuffer(buf, blockBlobURL, 0, undefined, {
      blockSize: 4 * 1024 * 1024,
      maxRetryRequestsPerBlock: 5,
      parallelism: 20
    });

    const localFileContent = fs.readFileSync(tempFileLarge);
    assert.ok(localFileContent.equals(buf));
  });

  it("downloadBlobToBuffer should abort", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    await uploadStreamToBlockBlob(
      rs,
      blockBlobURL,
      4 * 1024 * 1024,
      20
    );

    try {
      const buf = Buffer.alloc(tempFileLargeLength);
      await downloadBlobToBuffer(
        buf,
        blockBlobURL,
        0,
        undefined,
        {
          abortSignal: Aborter.timeout(1),
          blockSize: 4 * 1024 * 1024,
          maxRetryRequestsPerBlock: 5,
          parallelism: 20
        }
      );
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("downloadBlobToBuffer should update progress event", async () => {
    const rs = fs.createReadStream(tempFileSmall);
    await uploadStreamToBlockBlob(
      rs,
      blockBlobURL,
      4 * 1024 * 1024,
      10
    );

    let eventTriggered = false;
    const buf = Buffer.alloc(tempFileSmallLength);
    const aborter = Aborter.none;
    try {
      await downloadBlobToBuffer(buf, blockBlobURL, 0, undefined, {
        abortSignal: aborter,
        blockSize: 1 * 1024,
        maxRetryRequestsPerBlock: 5,
        parallelism: 1,
        progress: () => {
          eventTriggered = true;
          aborter.abort();
        }
      });
    } catch (err) {}
    assert.ok(eventTriggered);
  });

  it("bloburl.download should success when internal stream unexcepted ends at the stream end", async () => {
    const uploadResponse = await uploadFileToBlockBlob(
      tempFileSmall,
      blockBlobURL,
      {
        blockSize: 4 * 1024 * 1024,
        parallelism: 20
      }
    );

    let retirableReadableStreamOptions: IRetriableReadableStreamOptions;
    const downloadResponse = await blockBlobURL.download(
      0,
      undefined,
      {
        blobAccessConditions: {
          modifiedAccessConditions: {
            ifMatch: uploadResponse.eTag
          }
        },
        maxRetryRequests: 1,
        progress: ev => {
          if (ev.loadedBytes >= tempFileSmallLength) {
            retirableReadableStreamOptions.doInjectErrorOnce = true;
          }
        }
      }
    );

    retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any)
      .options;

    const downloadedFile = path.join(
      tempFolderPath,
      getUniqueName("downloadfile.")
    );
    await readStreamToLocalFile(
      downloadResponse.readableStreamBody!,
      downloadedFile
    );

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("bloburl.download should download full data successfully when internal stream unexcepted ends", async () => {
    const uploadResponse = await uploadFileToBlockBlob(
      tempFileSmall,
      blockBlobURL,
      {
        blockSize: 4 * 1024 * 1024,
        parallelism: 20
      }
    );

    let retirableReadableStreamOptions: IRetriableReadableStreamOptions;
    let injectedErrors = 0;
    const downloadResponse = await blockBlobURL.download(
      0,
      undefined,
      {
        blobAccessConditions: {
          modifiedAccessConditions: {
            ifMatch: uploadResponse.eTag
          }
        },
        maxRetryRequests: 3,
        progress: () => {
          if (injectedErrors++ < 3) {
            retirableReadableStreamOptions.doInjectErrorOnce = true;
          }
        }
      }
    );

    retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any)
      .options;

    const downloadedFile = path.join(
      tempFolderPath,
      getUniqueName("downloadfile.")
    );
    await readStreamToLocalFile(
      downloadResponse.readableStreamBody!,
      downloadedFile
    );

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("bloburl.download should download partial data when internal stream unexcepted ends", async () => {
    const uploadResponse = await uploadFileToBlockBlob(
      tempFileSmall,
      blockBlobURL,
      {
        blockSize: 4 * 1024 * 1024,
        parallelism: 20
      }
    );

    const partialSize = 500 * 1024;

    let retirableReadableStreamOptions: IRetriableReadableStreamOptions;
    let injectedErrors = 0;
    const downloadResponse = await blockBlobURL.download(
      0,
      partialSize,
      {
        blobAccessConditions: {
          modifiedAccessConditions: {
            ifMatch: uploadResponse.eTag
          }
        },
        maxRetryRequests: 3,
        progress: () => {
          if (injectedErrors++ < 3) {
            retirableReadableStreamOptions.doInjectErrorOnce = true;
          }
        }
      }
    );

    retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any)
      .options;

    const downloadedFile = path.join(
      tempFolderPath,
      getUniqueName("downloadfile.")
    );
    await readStreamToLocalFile(
      downloadResponse.readableStreamBody!,
      downloadedFile
    );

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(
      downloadedData
        .slice(0, partialSize)
        .equals(uploadedData.slice(0, partialSize))
    );
  });

  it("bloburl.download should download data failed when exceeding max stream retry requests", async () => {
    const uploadResponse = await uploadFileToBlockBlob(
      tempFileSmall,
      blockBlobURL,
      {
        blockSize: 4 * 1024 * 1024,
        parallelism: 20
      }
    );

    const downloadedFile = path.join(
      tempFolderPath,
      getUniqueName("downloadfile.")
    );

    let retirableReadableStreamOptions: IRetriableReadableStreamOptions;
    let injectedErrors = 0;
    let expectedError = false;

    try {
      const downloadResponse = await blockBlobURL.download(
        0,
        undefined,
        {
          blobAccessConditions: {
            modifiedAccessConditions: {
              ifMatch: uploadResponse.eTag
            }
          },
          maxRetryRequests: 0,
          progress: () => {
            if (injectedErrors++ < 1) {
              retirableReadableStreamOptions.doInjectErrorOnce = true;
            }
          }
        }
      );
      retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any)
        .options;
      await readStreamToLocalFile(
        downloadResponse.readableStreamBody!,
        downloadedFile
      );
    } catch (error) {
      expectedError = true;
    }

    assert.ok(expectedError);
    fs.unlinkSync(downloadedFile);
  });

  it("bloburl.download should abort after retrys", async () => {
    const uploadResponse = await uploadFileToBlockBlob(
      tempFileSmall,
      blockBlobURL,
      {
        blockSize: 4 * 1024 * 1024,
        parallelism: 20
      }
    );

    const downloadedFile = path.join(
      tempFolderPath,
      getUniqueName("downloadfile.")
    );

    let retirableReadableStreamOptions: IRetriableReadableStreamOptions;
    let injectedErrors = 0;
    let expectedError = false;

    try {
      const aborter = Aborter.none;
      const downloadResponse = await blockBlobURL.download(
        0,
        undefined,
        {
          abortSignal: aborter,
          blobAccessConditions: {
            modifiedAccessConditions: {
              ifMatch: uploadResponse.eTag
            }
          },
          maxRetryRequests: 3,
          progress: () => {
            if (injectedErrors++ < 2) {
              // Triger 2 times of retry
              retirableReadableStreamOptions.doInjectErrorOnce = true;
            } else {
              // Trigger aborter
              aborter.abort();
            }
          }
        }
      );
      retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any)
        .options;
      await readStreamToLocalFile(
        downloadResponse.readableStreamBody!,
        downloadedFile
      );
    } catch (error) {
      expectedError = true;
    }

    assert.ok(expectedError);
    fs.unlinkSync(downloadedFile);
  });
});
