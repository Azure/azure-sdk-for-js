import * as assert from "assert";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

import { FileURL, ShareURL } from "../../src";
import { Aborter } from "../../src/Aborter";
import { DirectoryURL } from "../../src/DirectoryURL";
import { downloadAzureFileToBuffer, uploadFileToAzureFile, uploadStreamToAzureFile } from "../../src/highlevel.node";
import { IRetriableReadableStreamOptions } from "../../src/utils/RetriableReadableStream";
import { createRandomLocalFile, getBSU, readStreamToLocalFile } from "../utils";
import { record } from "../utils/recorder";

dotenv.config({ path: "../.env" });

// tslint:disable:no-empty
describe("Highlevel", () => {
  const serviceURL = getBSU();
  let shareName: string;
  let shareURL: ShareURL;
  let dirName: string;
  let dirURL: DirectoryURL;
  let fileName: string;
  let fileURL: FileURL;
  let tempFileSmall: string;
  let tempFileSmallLength: number;
  let tempFileLarge: string;
  let tempFileLargeLength: number;
  const tempFolderPath = "temp";

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    shareName = recorder.getUniqueName("share");
    shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create(Aborter.none);
    dirName = recorder.getUniqueName("dir");
    dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
    await dirURL.create(Aborter.none);
    fileName = recorder.getUniqueName("file");
    fileURL = FileURL.fromDirectoryURL(dirURL, fileName);
  });

  afterEach(async () => {
    await shareURL.delete(Aborter.none);
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

  it("uploadFileToAzureFile should success for large data", async () => {
    await uploadFileToAzureFile(Aborter.none, tempFileLarge, fileURL, {
      parallelism: 20,
      rangeSize: 4 * 1024 * 1024
    });

    const downloadResponse = await fileURL.download(Aborter.none, 0);
    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileLarge);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("uploadFileToAzureFile should success for small data", async () => {
    await uploadFileToAzureFile(Aborter.none, tempFileSmall, fileURL, {
      parallelism: 20,
      rangeSize: 4 * 1024 * 1024
    });

    const downloadResponse = await fileURL.download(Aborter.none, 0);
    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("uploadFileToAzureFile should abort for large data", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await uploadFileToAzureFile(aborter, tempFileLarge, fileURL, {
        parallelism: 20,
        rangeSize: 4 * 1024 * 1024
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("uploadFileToAzureFile should abort for small data", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await uploadFileToAzureFile(aborter, tempFileSmall, fileURL, {
        parallelism: 20,
        rangeSize: 4 * 1024 * 1024
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("uploadFileToAzureFile should update progress for large data", async () => {
    let eventTriggered = false;
    const aborter = Aborter.none;

    try {
      await uploadFileToAzureFile(aborter, tempFileLarge, fileURL, {
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

  it("uploadFileToAzureFile should update progress for small data", async () => {
    let eventTriggered = false;
    const aborter = Aborter.none;

    try {
      await uploadFileToAzureFile(aborter, tempFileSmall, fileURL, {
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

  it("uploadStreamToAzureFile should success", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    await uploadStreamToAzureFile(
      Aborter.none,
      rs,
      tempFileLargeLength,
      fileURL,
      4 * 1024 * 1024,
      20
    );

    const downloadResponse = await fileURL.download(Aborter.none, 0);

    const downloadFilePath = path.join(tempFolderPath, recorder.getUniqueName("downloadFile"));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadFilePath);

    const downloadedBuffer = fs.readFileSync(downloadFilePath);
    const uploadedBuffer = fs.readFileSync(tempFileLarge);
    assert.ok(uploadedBuffer.equals(downloadedBuffer));

    fs.unlinkSync(downloadFilePath);
  });

  it("uploadStreamToAzureFile should abort", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    const aborter = Aborter.timeout(1);

    try {
      await uploadStreamToAzureFile(aborter, rs, tempFileLargeLength, fileURL, 4 * 1024 * 1024, 20);
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("uploadStreamToAzureFile should update progress event", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    let eventTriggered = false;

    await uploadStreamToAzureFile(
      Aborter.none,
      rs,
      tempFileLargeLength,
      fileURL,
      4 * 1024 * 1024,
      20,
      {
        progress: (ev) => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
        }
      }
    );
    assert.ok(eventTriggered);
  });

  it("downloadAzureFileToBuffer should success", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    await uploadStreamToAzureFile(
      Aborter.none,
      rs,
      tempFileLargeLength,
      fileURL,
      4 * 1024 * 1024,
      20
    );

    const buf = Buffer.alloc(tempFileLargeLength);
    await downloadAzureFileToBuffer(Aborter.none, buf, fileURL, 0, undefined, {
      parallelism: 20,
      rangeSize: 4 * 1024 * 1024
    });

    const localFileContent = fs.readFileSync(tempFileLarge);
    assert.ok(localFileContent.equals(buf));
  });

  it("downloadAzureFileToBuffer should success when downloading a range inside file", async () => {
    await fileURL.create(Aborter.none, 8);
    await fileURL.uploadRange(Aborter.none, "aaaabbbb", 0, 8);

    const buf = Buffer.alloc(4);
    await downloadAzureFileToBuffer(Aborter.none, buf, fileURL, 4, 4, {
      rangeSize: 4,
      maxRetryRequestsPerRange: 5,
      parallelism: 1
    });

    assert.deepStrictEqual(buf.toString(), "bbbb");
  });

  it("downloadAzureFileToBuffer should abort", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    await uploadStreamToAzureFile(
      Aborter.none,
      rs,
      tempFileLargeLength,
      fileURL,
      4 * 1024 * 1024,
      20
    );

    try {
      const buf = Buffer.alloc(tempFileLargeLength);
      await downloadAzureFileToBuffer(Aborter.timeout(1), buf, fileURL, 0, undefined, {
        parallelism: 20,
        rangeSize: 4 * 1024 * 1024
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("downloadAzureFileToBuffer should update progress event", async () => {
    const rs = fs.createReadStream(tempFileSmall);
    await uploadStreamToAzureFile(
      Aborter.none,
      rs,
      tempFileSmallLength,
      fileURL,
      4 * 1024 * 1024,
      10
    );

    let eventTriggered = false;
    const buf = Buffer.alloc(tempFileSmallLength);
    const aborter = Aborter.none;
    try {
      await downloadAzureFileToBuffer(aborter, buf, fileURL, 0, undefined, {
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

  it("bloburl.download should success when internal stream unexcepted ends at the stream end", async () => {
    await uploadFileToAzureFile(Aborter.none, tempFileSmall, fileURL, {
      rangeSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    let retirableReadableStreamOptions: IRetriableReadableStreamOptions;
    const downloadResponse = await fileURL.download(Aborter.none, 0, undefined, {
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

  it("bloburl.download should download full data successfully when internal stream unexcepted ends", async () => {
    await uploadFileToAzureFile(Aborter.none, tempFileSmall, fileURL, {
      rangeSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    let retirableReadableStreamOptions: IRetriableReadableStreamOptions;
    let injectedErrors = 0;
    const downloadResponse = await fileURL.download(Aborter.none, 0, undefined, {
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

  it("bloburl.download should download partial data when internal stream unexcepted ends", async () => {
    await uploadFileToAzureFile(Aborter.none, tempFileSmall, fileURL, {
      rangeSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const partialSize = 10 * 1024;

    let retirableReadableStreamOptions: IRetriableReadableStreamOptions;
    let injectedErrors = 0;
    const downloadResponse = await fileURL.download(Aborter.none, 1, partialSize, {
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

  it("bloburl.download should download data failed when exceeding max stream retry requests", async () => {
    await uploadFileToAzureFile(Aborter.none, tempFileSmall, fileURL, {
      rangeSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));

    let retirableReadableStreamOptions: IRetriableReadableStreamOptions;
    let injectedErrors = 0;
    let expectedError = false;

    try {
      const downloadResponse = await fileURL.download(Aborter.none, 0, undefined, {
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

  it("bloburl.download should abort after retrys", async () => {
    await uploadFileToAzureFile(Aborter.none, tempFileSmall, fileURL, {
      rangeSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const downloadedFile = path.join(tempFolderPath, recorder.getUniqueName("downloadfile."));

    let retirableReadableStreamOptions: IRetriableReadableStreamOptions;
    let injectedErrors = 0;
    let expectedError = false;

    try {
      const aborter = Aborter.none;
      const downloadResponse = await fileURL.download(aborter, 0, undefined, {
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
});
