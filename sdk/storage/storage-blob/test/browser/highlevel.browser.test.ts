import * as assert from "assert";

import { Aborter } from "../../src/Aborter";
import { BlobURL } from "../../src/BlobURL";
import { BlockBlobURL } from "../../src/BlockBlobURL";
import { ContainerURL } from "../../src/ContainerURL";
import { uploadBrowserDataToBlockBlob, uploadBrowserDataToBlockBlobUrl } from "../../src/highlevel.browser";
import {
  arrayBufferEqual,
  blobToArrayBuffer,
  blobToString,
  bodyToString,
  getBrowserFile,
  getBSU,
  getUniqueName,
  isIE
} from "../utils/index.browser";

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
    await containerURL.create();
    blobName = getUniqueName("blob");
    blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  });

  afterEach(async () => {
    await containerURL.delete();
  });

  before(async () => {
    tempFile1 = getBrowserFile(getUniqueName("browserfile"), tempFile1Length);
    tempFile2 = getBrowserFile(getUniqueName("browserfile"), tempFile2Length);
  });

  after(async () => {});

  it("uploadBrowserDataToBlockBlob should abort when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await uploadBrowserDataToBlockBlob(tempFile1, blockBlobURL, {
        abortSignal: aborter
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("uploadBrowserDataToBlockBlob should abort when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await uploadBrowserDataToBlockBlob(tempFile2, blockBlobURL, {
        abortSignal: aborter,
        blockSize: 4 * 1024 * 1024,
        parallelism: 2
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("uploadBrowserDataToBlockBlob should update progress when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    let eventTriggered = false;
    const aborter = Aborter.none;

    try {
      await uploadBrowserDataToBlockBlob(tempFile1, blockBlobURL, {
        abortSignal: aborter,
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

  it("uploadBrowserDataToBlockBlob should update progress when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    let eventTriggered = false;
    const aborter = Aborter.none;

    try {
      await uploadBrowserDataToBlockBlob(tempFile2, blockBlobURL, {
        abortSignal: aborter,
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

  it("uploadBrowserDataToBlockBlob should success when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    await uploadBrowserDataToBlockBlob(tempFile2, blockBlobURL, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 2
    });

    const downloadResponse = await blockBlobURL.download(0);
    const downloadedString = await bodyToString(downloadResponse);
    const uploadedString = await blobToString(tempFile2);

    assert.equal(uploadedString, downloadedString);
  });

  it("uploadBrowserDataToBlockBlobUrl should success when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const url = blockBlobURL.url;
    const credential = blockBlobURL.pipeline.factories[blockBlobURL.pipeline.factories.length - 1];
    await uploadBrowserDataToBlockBlobUrl(tempFile2, url, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 2,
      credential: credential
    });

    const downloadResponse = await blockBlobURL.download(0);
    const downloadedString = await bodyToString(downloadResponse);
    const uploadedString = await blobToString(tempFile2);

    assert.equal(uploadedString, downloadedString);
  });

  it("uploadBrowserDataToBlockBlob should success when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES and configured maxSingleShotSize", async () => {
    await uploadBrowserDataToBlockBlob(tempFile2, blockBlobURL, {
      blockSize: 512 * 1024,
      maxSingleShotSize: 0
    });

    const downloadResponse = await blockBlobURL.download(0);
    const downloadedString = await bodyToString(downloadResponse);
    const uploadedString = await blobToString(tempFile2);

    assert.equal(uploadedString, downloadedString);
  });

  it("uploadBrowserDataToBlockBlob should success when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    if (isIE()) {
      assert.ok(
        true,
        "Skip this case in IE11 which doesn't have enough memory for downloading validation"
      );
      return;
    }

    await uploadBrowserDataToBlockBlob(tempFile1, blockBlobURL, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 2
    });

    const downloadResponse = await blockBlobURL.download(0);
    const buf1 = await blobToArrayBuffer(await downloadResponse.blobBody!);
    const buf2 = await blobToArrayBuffer(tempFile1);

    assert.ok(arrayBufferEqual(buf1, buf2));
  });
});
