import * as assert from "assert";

import { Aborter } from "../../lib/Aborter";
import { BlobURL } from "../../lib/BlobURL";
import { BlockBlobURL } from "../../lib/BlockBlobURL";
import { ContainerURL } from "../../lib/ContainerURL";
import { UploadBrowserDataToBlockBlob } from "../../lib/highlevel.browser";
import {
  blobToString,
  bodyToString,
  getBrowserFile,
  getBSU,
  getUniqueName
} from "../utils/testutils.browser";

// tslint:disable:no-empty
describe("Highelvel", () => {
  const serviceURL = getBSU();
  let containerName = getUniqueName("container");
  let containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
  let blobName = getUniqueName("blob");
  let blobURL = BlobURL.fromContainerURL(containerURL, blobName);
  let blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  let tempFile1: File;
  const tempFile1Length: number = 257 * 1024 * 1024 - 1;
  let tempFile2: File;
  const tempFile2Length: number = 1 * 1024 * 1024 - 1;

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
    tempFile1 = getBrowserFile(getUniqueName("browserfile"), tempFile1Length);
    tempFile2 = getBrowserFile(getUniqueName("browserfile"), tempFile2Length);
  });

  after(async () => {});

  it("UploadBrowserDataToBlockBlob should success when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    await UploadBrowserDataToBlockBlob(Aborter.None, tempFile1, blockBlobURL, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 2
    });

    const downloadResponse = await blockBlobURL.download(Aborter.None, 0);
    const downloadedString = await bodyToString(downloadResponse);
    const uploadedString = await blobToString(tempFile1);

    assert.equal(uploadedString, downloadedString);
  });

  it("UploadBrowserDataToBlockBlob should success when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    await UploadBrowserDataToBlockBlob(Aborter.None, tempFile2, blockBlobURL, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 2
    });

    const downloadResponse = await blockBlobURL.download(Aborter.None, 0);
    const downloadedString = await bodyToString(downloadResponse);
    const uploadedString = await blobToString(tempFile2);

    assert.equal(uploadedString, downloadedString);
  });

  it("UploadBrowserDataToBlockBlob should abort when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await UploadBrowserDataToBlockBlob(aborter, tempFile1, blockBlobURL, {
        blockSize: 4 * 1024 * 1024,
        parallelism: 2
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("UploadBrowserDataToBlockBlob should abort when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await UploadBrowserDataToBlockBlob(aborter, tempFile2, blockBlobURL, {
        blockSize: 4 * 1024 * 1024,
        parallelism: 2
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("UploadBrowserDataToBlockBlob should update progress when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    let eventTriggered = false;
    const aborter = Aborter.None;

    try {
      await UploadBrowserDataToBlockBlob(aborter, tempFile1, blockBlobURL, {
        blockSize: 4 * 1024 * 1024,
        parallelism: 2,
        progress: ev => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        }
      });
    } catch (err) {}
    assert.ok(eventTriggered);
  });

  it("UploadBrowserDataToBlockBlob should update progress when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    let eventTriggered = false;
    const aborter = Aborter.None;

    try {
      await UploadBrowserDataToBlockBlob(aborter, tempFile2, blockBlobURL, {
        blockSize: 4 * 1024 * 1024,
        parallelism: 2,
        progress: ev => {
          assert.ok(ev.loadedBytes);
          eventTriggered = true;
          aborter.abort();
        }
      });
    } catch (err) {}
    assert.ok(eventTriggered);
  });
});
