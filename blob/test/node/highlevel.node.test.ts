import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import { Aborter } from "../../lib/Aborter";
import {
  DownloadBlobToBuffer,
  UploadFileToBlockBlob,
  UploadStreamToBlockBlob
} from "../../lib/highlevel.node";
import {
  createRandomLocalFile,
  getBSU,
  getUniqueName,
  readStreamToLocalFile
} from "../utils/testutils.node";

import { BlobURL, BlockBlobURL, ContainerURL } from "../../lib";

// tslint:disable:no-empty
describe("Highelvel", () => {
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
    await containerURL.create(Aborter.None);
    blobName = getUniqueName("blob");
    blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  });

  afterEach(async () => {
    await containerURL.delete(Aborter.None);
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

  it("UploadFileToBlockBlob should success when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    await UploadFileToBlockBlob(Aborter.None, tempFileLarge, blockBlobURL, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const downloadResponse = await blockBlobURL.download(Aborter.None, 0);
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

  it("UploadFileToBlockBlob should success when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    await UploadFileToBlockBlob(Aborter.None, tempFileSmall, blockBlobURL, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const downloadResponse = await blockBlobURL.download(Aborter.None, 0);
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

  it("UploadFileToBlockBlob should abort when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await UploadFileToBlockBlob(aborter, tempFileLarge, blockBlobURL, {
        blockSize: 4 * 1024 * 1024,
        parallelism: 20
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("UploadFileToBlockBlob should abort when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await UploadFileToBlockBlob(aborter, tempFileSmall, blockBlobURL, {
        blockSize: 4 * 1024 * 1024,
        parallelism: 20
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("UploadFileToBlockBlob should update progress when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    let eventTriggered = false;
    const aborter = Aborter.None;

    try {
      await UploadFileToBlockBlob(aborter, tempFileLarge, blockBlobURL, {
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

  it("UploadFileToBlockBlob should update progress when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    let eventTriggered = false;
    const aborter = Aborter.None;

    try {
      await UploadFileToBlockBlob(aborter, tempFileSmall, blockBlobURL, {
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

  it("UploadStreamToBlockBlob should success", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    await UploadStreamToBlockBlob(
      Aborter.None,
      rs,
      blockBlobURL,
      4 * 1024 * 1024,
      20
    );

    const downloadResponse = await blockBlobURL.download(Aborter.None, 0);

    const downloadFilePath = path.join("./", getUniqueName("downloadFile"));
    await readStreamToLocalFile(
      downloadResponse.readableStreamBody!,
      downloadFilePath
    );

    const downloadedBuffer = fs.readFileSync(downloadFilePath);
    const uploadedBuffer = fs.readFileSync(tempFileLarge);
    assert.ok(uploadedBuffer.equals(downloadedBuffer));

    fs.unlinkSync(downloadFilePath);
  });

  it("UploadStreamToBlockBlob should abort", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    const aborter = Aborter.timeout(1);

    try {
      await UploadStreamToBlockBlob(
        aborter,
        rs,
        blockBlobURL,
        4 * 1024 * 1024,
        20
      );
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("UploadStreamToBlockBlob should update progress event", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    let eventTriggered = false;

    await UploadStreamToBlockBlob(
      Aborter.None,
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

  it("DownloadBlobToBuffer should success", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    await UploadStreamToBlockBlob(
      Aborter.None,
      rs,
      blockBlobURL,
      4 * 1024 * 1024,
      20
    );

    const buf = Buffer.alloc(tempFileLargeLength);
    await DownloadBlobToBuffer(Aborter.None, buf, blockBlobURL, 0, undefined, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 20
    });

    const localFileContent = fs.readFileSync(tempFileLarge);
    assert.ok(localFileContent.equals(buf));
  });

  it("DownloadBlobToBuffer should abort", async () => {
    const rs = fs.createReadStream(tempFileLarge);
    await UploadStreamToBlockBlob(
      Aborter.None,
      rs,
      blockBlobURL,
      4 * 1024 * 1024,
      20
    );

    try {
      const buf = Buffer.alloc(tempFileLargeLength);
      await DownloadBlobToBuffer(
        Aborter.timeout(1),
        buf,
        blockBlobURL,
        0,
        undefined,
        {
          blockSize: 4 * 1024 * 1024,
          parallelism: 20
        }
      );
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("DownloadBlobToBuffer should update progress event", async () => {
    const rs = fs.createReadStream(tempFileSmall);
    await UploadStreamToBlockBlob(
      Aborter.None,
      rs,
      blockBlobURL,
      4 * 1024 * 1024,
      10
    );

    let eventTriggered = false;
    const buf = Buffer.alloc(tempFileSmallLength);
    const aborter = Aborter.None;
    try {
      await DownloadBlobToBuffer(aborter, buf, blockBlobURL, 0, undefined, {
        blockSize: 1 * 1024,
        parallelism: 1,
        progress: () => {
          eventTriggered = true;
          aborter.abort();
        }
      });
    } catch (err) {}
    assert.ok(eventTriggered);
  });
});
