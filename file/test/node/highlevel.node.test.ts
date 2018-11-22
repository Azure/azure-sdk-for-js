import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";

import { FileURL, ShareURL } from "../../lib";
import { Aborter } from "../../lib/Aborter";
import { DirectoryURL } from "../../lib/DirectoryURL";
import { downloadAzureFileToBuffer, uploadFileToAzureFile, uploadStreamToAzureFile } from "../../lib/highlevel.node";
import { createRandomLocalFile, getBSU, getUniqueName, readStreamToLocalFile } from "../utils";

// tslint:disable:no-empty
describe("Highlevel", () => {
  const serviceURL = getBSU();
  let shareName = getUniqueName("share");
  let shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
  let dirName = getUniqueName("dir");
  let dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
  let fileName = getUniqueName("file");
  let fileURL = FileURL.fromDirectoryURL(dirURL, fileName);
  let tempFileSmall: string;
  let tempFileSmallLength: number;
  let tempFileLarge: string;
  let tempFileLargeLength: number;
  const tempFolderPath = "temp";

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create(Aborter.none);
    dirName = getUniqueName("dir");
    dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
    await dirURL.create(Aborter.none);
    fileName = getUniqueName("file");
    fileURL = FileURL.fromDirectoryURL(dirURL, fileName);
  });

  afterEach(async () => {
    await shareURL.delete(Aborter.none);
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

  it("uploadFileToAzureFile should success for large data", async () => {
    await uploadFileToAzureFile(Aborter.none, tempFileLarge, fileURL, {
      parallelism: 20,
      rangeSize: 4 * 1024 * 1024
    });

    const downloadResponse = await fileURL.download(Aborter.none, 0);
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

  it("uploadFileToAzureFile should success for samll data", async () => {
    await uploadFileToAzureFile(Aborter.none, tempFileSmall, fileURL, {
      parallelism: 20,
      rangeSize: 4 * 1024 * 1024
    });

    const downloadResponse = await fileURL.download(Aborter.none, 0);
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
        progress: ev => {
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
        progress: ev => {
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

  it("uploadStreamToAzureFile should abort", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    const aborter = Aborter.timeout(1);

    try {
      await uploadStreamToAzureFile(
        aborter,
        rs,
        tempFileLargeLength,
        fileURL,
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
      fileURL,
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
      await downloadAzureFileToBuffer(
        Aborter.timeout(1),
        buf,
        fileURL,
        0,
        undefined,
        {
          parallelism: 20,
          rangeSize: 4 * 1024 * 1024
        }
      );
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
});
