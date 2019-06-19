import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";

import { Aborter } from "../../src/Aborter";
import { createRandomLocalFile, getBSU } from "../utils";
import { RetriableReadableStreamOptions } from "../../src/utils/RetriableReadableStream";
import { ShareClient, DirectoryClient, FileClient } from "../../src";
import { readStreamToLocalFile } from "../../src/utils/utils.common";
import { record } from "../utils/recorder";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// tslint:disable:no-empty
describe("Highlevel Node.js only", () => {
  const serviceClient = getBSU();
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: DirectoryClient;
  let fileName: string;
  let fileClient: FileClient;
  let tempFileSmall: string;
  let tempFileSmallLength: number;
  let tempFileLarge: string;
  let tempFileLargeLength: number;
  const tempFolderPath = "temp";

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    shareName = recorder.getUniqueName("share");
    shareClient = serviceClient.createShareClient(shareName);
    await shareClient.create();
    dirName = recorder.getUniqueName("dir");
    dirClient = shareClient.createDirectoryClient(dirName);
    await dirClient.create();
    fileName = recorder.getUniqueName("file");
    fileClient = dirClient.createFileClient(fileName);
  });

  afterEach(async () => {
    await shareClient.delete();
    recorder.stop();
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
    await fileClient.uploadFile(tempFileLarge, {
      parallelism: 20,
      rangeSize: 4 * 1024 * 1024
    });

    const downloadResponse = await fileClient.download(0);
    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileLarge);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("uploadFile should success for small data", async () => {
    await fileClient.uploadFile(tempFileSmall, {
      parallelism: 20,
      rangeSize: 4 * 1024 * 1024
    });

    const downloadResponse = await fileClient.download(0);
    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("uploadFile should abort for large data", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await fileClient.uploadFile(tempFileLarge, {
        abortSignal: aborter,
        parallelism: 20,
        rangeSize: 4 * 1024 * 1024
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("uploadFile should abort for small data", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await fileClient.uploadFile(tempFileSmall, {
        abortSignal: aborter,
        parallelism: 20,
        rangeSize: 4 * 1024 * 1024
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("uploadFile should update progress for large data", async () => {
    let eventTriggered = false;
    const aborter = Aborter.none;

    try {
      await fileClient.uploadFile(tempFileLarge, {
        abortSignal: aborter,
        parallelism: 20,
        progress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        },
        rangeSize: 4 * 1024 * 1024
      });
    } catch (err) {}
    assert.ok(eventTriggered);
  });

  it("uploadFile should update progress for small data", async () => {
    let eventTriggered = false;
    const aborter = Aborter.none;

    try {
      await fileClient.uploadFile(tempFileSmall, {
        abortSignal: aborter,
        parallelism: 20,
        progress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        },
        rangeSize: 4 * 1024 * 1024
      });
    } catch (err) {}
    assert.ok(eventTriggered);
  });

  it("uploadStream should success", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    await fileClient.uploadStream(rs, tempFileLargeLength, 4 * 1024 * 1024, 20);

    const downloadResponse = await fileClient.download(0);

    const downloadFilePath = path.join(tempFolderPath, recorder.getUniqueName("downloadFile"));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadFilePath);

    const downloadedBuffer = fs.readFileSync(downloadFilePath);
    const uploadedBuffer = fs.readFileSync(tempFileLarge);
    assert.ok(uploadedBuffer.equals(downloadedBuffer));

    fs.unlinkSync(downloadFilePath);
  });

  it("uploadStream should abort", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    const aborter = Aborter.timeout(1);

    try {
      await fileClient.uploadStream(rs, tempFileLargeLength, 4 * 1024 * 1024, 20, {
        abortSignal: aborter
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("uploadStream should update progress event", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    let eventTriggered = false;

    await fileClient.uploadStream(rs, tempFileLargeLength, 4 * 1024 * 1024, 20, {
      progress: (ev) => {
        assert.ok(ev.loadedBytes);
        eventTriggered = true;
      }
    });
    assert.ok(eventTriggered);
  });

  it("downloadToBuffer should success", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    await fileClient.uploadStream(rs, tempFileLargeLength, 4 * 1024 * 1024, 20);

    const buf = Buffer.alloc(tempFileLargeLength);
    await fileClient.downloadToBuffer(buf, 0, undefined, {
      parallelism: 20,
      rangeSize: 4 * 1024 * 1024
    });

    const localFileContent = fs.readFileSync(tempFileLarge);
    assert.ok(localFileContent.equals(buf));
  });

  it("downloadToBuffer should abort", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    await fileClient.uploadStream(rs, tempFileLargeLength, 4 * 1024 * 1024, 20);

    try {
      const buf = Buffer.alloc(tempFileLargeLength);
      await fileClient.downloadToBuffer(buf, 0, undefined, {
        abortSignal: Aborter.timeout(1),
        parallelism: 20,
        rangeSize: 4 * 1024 * 1024
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("downloadToBuffer should update progress event", async () => {
    const rs = fs.createReadStream(tempFileSmall);
    await fileClient.uploadStream(rs, tempFileSmallLength, 4 * 1024 * 1024, 10);

    let eventTriggered = false;
    const buf = Buffer.alloc(tempFileSmallLength);
    const aborter = Aborter.none;
    try {
      await fileClient.downloadToBuffer(buf, 0, undefined, {
        abortSignal: aborter,
        parallelism: 1,
        progress: () => {
          eventTriggered = true;
          aborter.abort();
        },
        rangeSize: 1 * 1024
      });
    } catch (err) {}
    assert.ok(eventTriggered);
  });

  it("fileClient.download should success when internal stream unexcepted ends at the stream end", async () => {
    await fileClient.uploadFile(tempFileSmall, {
      rangeSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    let retirableReadableStreamOptions: RetriableReadableStreamOptions;
    const downloadResponse = await fileClient.download(0, undefined, {
      maxRetryRequests: 1,
      progress: (ev) => {
        if (ev.loadedBytes >= tempFileSmallLength) {
          retirableReadableStreamOptions.doInjectErrorOnce = true;
        }
      }
    });

    retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("fileClient.download should download full data successfully when internal stream unexcepted ends", async () => {
    await fileClient.uploadFile(tempFileSmall, {
      rangeSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    let retirableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    const downloadResponse = await fileClient.download(0, undefined, {
      maxRetryRequests: 3,
      progress: () => {
        if (injectedErrors++ < 3) {
          retirableReadableStreamOptions.doInjectErrorOnce = true;
        }
      }
    });

    retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("fileClient.download should download partial data when internal stream unexcepted ends", async () => {
    await fileClient.uploadFile(tempFileSmall, {
      rangeSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const partialSize = 10 * 1024;

    let retirableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    const downloadResponse = await fileClient.download(1, partialSize, {
      maxRetryRequests: 3,
      progress: () => {
        if (injectedErrors++ < 3) {
          retirableReadableStreamOptions.doInjectErrorOnce = true;
        }
      }
    });

    retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData.slice(1, partialSize + 1)));
  });

  it("fileClient.download should download data failed when exceeding max stream retry requests", async () => {
    await fileClient.uploadFile(tempFileSmall, {
      rangeSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));

    let retirableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    let expectedError = false;

    try {
      const downloadResponse = await fileClient.download(0, undefined, {
        maxRetryRequests: 0,
        progress: () => {
          if (injectedErrors++ < 1) {
            retirableReadableStreamOptions.doInjectErrorOnce = true;
          }
        }
      });
      retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
      await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);
    } catch (error) {
      expectedError = true;
    }

    assert.ok(expectedError);
    fs.unlinkSync(downloadedFile);
  });

  it("fileClient.download should abort after retrys", async () => {
    await fileClient.uploadFile(tempFileSmall, {
      rangeSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));

    let retirableReadableStreamOptions: RetriableReadableStreamOptions;
    let injectedErrors = 0;
    let expectedError = false;

    try {
      const aborter = Aborter.none;
      const downloadResponse = await fileClient.download(0, undefined, {
        abortSignal: aborter,
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
      });
      retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;
      await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);
    } catch (error) {
      expectedError = true;
    }

    assert.ok(expectedError);
    fs.unlinkSync(downloadedFile);
  });

  it("downloadToFile should success", async () => {
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
