import * as assert from "assert";

import { Aborter } from "../../lib/Aborter";
import { BlobURL } from "../../lib/BlobURL";
import { BlockBlobURL } from "../../lib/BlockBlobURL";
import { ContainerURL } from "../../lib/ContainerURL";
import { uploadBrowserDataToBlockBlob } from "../../lib/highlevel.browser";
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
    await containerURL.create(Aborter.none);
    blobName = getUniqueName("blob");
    blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  });

  afterEach(async () => {
    await containerURL.delete(Aborter.none);
  });

  before(async () => {
    tempFile1 = getBrowserFile(getUniqueName("browserfile"), tempFile1Length);
    tempFile2 = getBrowserFile(getUniqueName("browserfile"), tempFile2Length);
  });

  after(async () => {});

  it("uploadBrowserDataToBlockBlob should abort when blob >= BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await uploadBrowserDataToBlockBlob(aborter, tempFile1, blockBlobURL, {
        blockSize: 4 * 1024 * 1024,
        parallelism: 2
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("uploadBrowserDataToBlockBlob should abort when blob < BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await uploadBrowserDataToBlockBlob(aborter, tempFile2, blockBlobURL, {
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
      await uploadBrowserDataToBlockBlob(aborter, tempFile1, blockBlobURL, {
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
      await uploadBrowserDataToBlockBlob(aborter, tempFile2, blockBlobURL, {
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
    await uploadBrowserDataToBlockBlob(Aborter.none, tempFile2, blockBlobURL, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 2
    });

    const downloadResponse = await blockBlobURL.download(Aborter.none, 0);
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

    await uploadBrowserDataToBlockBlob(Aborter.none, tempFile1, blockBlobURL, {
      blockSize: 4 * 1024 * 1024,
      parallelism: 2
    });

    const downloadResponse = await blockBlobURL.download(Aborter.none, 0);
    const buf1 = await blobToArrayBuffer(await downloadResponse.blobBody!);
    const buf2 = await blobToArrayBuffer(tempFile1);

    assert.ok(arrayBufferEqual(buf1, buf2));
  });
});
