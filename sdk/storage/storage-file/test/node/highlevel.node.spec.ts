import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";

import { FileClient, ShareClient } from "../../src";
import { Aborter } from "../../src/Aborter";
import { DirectoryClient } from "../../src/DirectoryClient";
import {
  downloadAzureFileToBuffer,
  uploadFileToAzureFile,
  uploadStreamToAzureFile
} from "../../src/highlevel.node";
import { createRandomLocalFile, getBSU, getUniqueName, readStreamToLocalFile } from "../utils";
import { IRetriableReadableStreamOptions } from "../../src/utils/RetriableReadableStream";

// tslint:disable:no-empty
describe("Highlevel", () => {
  const serviceClient = getBSU();
  let shareName = getUniqueName("share");
  let shareClient = ShareClient.fromFileServiceClient(serviceClient, shareName);
  let dirName = getUniqueName("dir");
  let dirClient = DirectoryClient.fromShareClient(shareClient, dirName);
  let fileName = getUniqueName("file");
  let fileClient = FileClient.fromDirectoryClient(dirClient, fileName);
  let tempFileSmall: string;
  let tempFileSmallLength: number;
  let tempFileLarge: string;
  let tempFileLargeLength: number;
  const tempFolderPath = "temp";

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareClient = ShareClient.fromFileServiceClient(serviceClient, shareName);
    await shareClient.create(Aborter.none);
    dirName = getUniqueName("dir");
    dirClient = DirectoryClient.fromShareClient(shareClient, dirName);
    await dirClient.create(Aborter.none);
    fileName = getUniqueName("file");
    fileClient = FileClient.fromDirectoryClient(dirClient, fileName);
  });

  afterEach(async () => {
    await shareClient.delete(Aborter.none);
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
    await uploadFileToAzureFile(Aborter.none, tempFileLarge, fileClient, {
      parallelism: 20,
      rangeSize: 4 * 1024 * 1024
    });

    const downloadResponse = await fileClient.download(Aborter.none, 0);
    const downloadedFile = path.join(tempFolderPath, getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileLarge);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("uploadFileToAzureFile should success for samll data", async () => {
    await uploadFileToAzureFile(Aborter.none, tempFileSmall, fileClient, {
      parallelism: 20,
      rangeSize: 4 * 1024 * 1024
    });

    const downloadResponse = await fileClient.download(Aborter.none, 0);
    const downloadedFile = path.join(tempFolderPath, getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("uploadFileToAzureFile should abort for large data", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await uploadFileToAzureFile(aborter, tempFileLarge, fileClient, {
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
      await uploadFileToAzureFile(aborter, tempFileSmall, fileClient, {
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
      await uploadFileToAzureFile(aborter, tempFileLarge, fileClient, {
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
      await uploadFileToAzureFile(aborter, tempFileSmall, fileClient, {
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
      fileClient,
      4 * 1024 * 1024,
      20
    );

    const downloadResponse = await fileClient.download(Aborter.none, 0);

    const downloadFilePath = path.join(tempFolderPath, getUniqueName("downloadFile"));
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
      await uploadStreamToAzureFile(
        aborter,
        rs,
        tempFileLargeLength,
        fileClient,
        4 * 1024 * 1024,
        20
      );
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
      fileClient,
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
      fileClient,
      4 * 1024 * 1024,
      20
    );

    const buf = Buffer.alloc(tempFileLargeLength);
    await downloadAzureFileToBuffer(Aborter.none, buf, fileClient, 0, undefined, {
      parallelism: 20,
      rangeSize: 4 * 1024 * 1024
    });

    const localFileContent = fs.readFileSync(tempFileLarge);
    assert.ok(localFileContent.equals(buf));
  });

  it("downloadAzureFileToBuffer should abort", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    await uploadStreamToAzureFile(
      Aborter.none,
      rs,
      tempFileLargeLength,
      fileClient,
      4 * 1024 * 1024,
      20
    );

    try {
      const buf = Buffer.alloc(tempFileLargeLength);
      await downloadAzureFileToBuffer(Aborter.timeout(1), buf, fileClient, 0, undefined, {
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
      fileClient,
      4 * 1024 * 1024,
      10
    );

    let eventTriggered = false;
    const buf = Buffer.alloc(tempFileSmallLength);
    const aborter = Aborter.none;
    try {
      await downloadAzureFileToBuffer(aborter, buf, fileClient, 0, undefined, {
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
    await uploadFileToAzureFile(Aborter.none, tempFileSmall, fileClient, {
      rangeSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    let retirableReadableStreamOptions: IRetriableReadableStreamOptions;
    const downloadResponse = await fileClient.download(Aborter.none, 0, undefined, {
      maxRetryRequests: 1,
      progress: (ev) => {
        if (ev.loadedBytes >= tempFileSmallLength) {
          retirableReadableStreamOptions.doInjectErrorOnce = true;
        }
      }
    });

    retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;

    const downloadedFile = path.join(tempFolderPath, getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("bloburl.download should download full data successfully when internal stream unexcepted ends", async () => {
    await uploadFileToAzureFile(Aborter.none, tempFileSmall, fileClient, {
      rangeSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    let retirableReadableStreamOptions: IRetriableReadableStreamOptions;
    let injectedErrors = 0;
    const downloadResponse = await fileClient.download(Aborter.none, 0, undefined, {
      maxRetryRequests: 3,
      progress: () => {
        if (injectedErrors++ < 3) {
          retirableReadableStreamOptions.doInjectErrorOnce = true;
        }
      }
    });

    retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;

    const downloadedFile = path.join(tempFolderPath, getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData));
  });

  it("bloburl.download should download partial data when internal stream unexcepted ends", async () => {
    await uploadFileToAzureFile(Aborter.none, tempFileSmall, fileClient, {
      rangeSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const partialSize = 10 * 1024;

    let retirableReadableStreamOptions: IRetriableReadableStreamOptions;
    let injectedErrors = 0;
    const downloadResponse = await fileClient.download(Aborter.none, 1, partialSize, {
      maxRetryRequests: 3,
      progress: () => {
        if (injectedErrors++ < 3) {
          retirableReadableStreamOptions.doInjectErrorOnce = true;
        }
      }
    });

    retirableReadableStreamOptions = (downloadResponse.readableStreamBody! as any).options;

    const downloadedFile = path.join(tempFolderPath, getUniqueName("downloadfile."));
    await readStreamToLocalFile(downloadResponse.readableStreamBody!, downloadedFile);

    const downloadedData = await fs.readFileSync(downloadedFile);
    const uploadedData = await fs.readFileSync(tempFileSmall);

    fs.unlinkSync(downloadedFile);
    assert.ok(downloadedData.equals(uploadedData.slice(1, partialSize + 1)));
  });

  it("bloburl.download should download data failed when exceeding max stream retry requests", async () => {
    await uploadFileToAzureFile(Aborter.none, tempFileSmall, fileClient, {
      rangeSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const downloadedFile = path.join(tempFolderPath, getUniqueName("downloadfile."));

    let retirableReadableStreamOptions: IRetriableReadableStreamOptions;
    let injectedErrors = 0;
    let expectedError = false;

    try {
      const downloadResponse = await fileClient.download(Aborter.none, 0, undefined, {
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
    await uploadFileToAzureFile(Aborter.none, tempFileSmall, fileClient, {
      rangeSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const downloadedFile = path.join(tempFolderPath, getUniqueName("downloadfile."));

    let retirableReadableStreamOptions: IRetriableReadableStreamOptions;
    let injectedErrors = 0;
    let expectedError = false;

    try {
      const aborter = Aborter.none;
      const downloadResponse = await fileClient.download(aborter, 0, undefined, {
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
