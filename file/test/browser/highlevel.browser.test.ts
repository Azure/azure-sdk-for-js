import * as assert from "assert";

import { Aborter } from "../../lib/Aborter";
import { DirectoryURL } from "../../lib/DirectoryURL";
import { FileURL } from "../../lib/FileURL";
import { uploadBrowserDataToAzureFile } from "../../lib/highlevel.browser";
import { ShareURL } from "../../lib/ShareURL";
import {
  arrayBufferEqual,
  blobToArrayBuffer,
  blobToString,
  bodyToString,
  getBrowserFile,
  getBSU,
  getUniqueName,
} from "../utils/index.browser";

// tslint:disable:no-empty
describe("Highelvel", () => {
  const serviceURL = getBSU();
  let shareName = getUniqueName("share");
  let shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
  let dirName = getUniqueName("dir");
  let dirURL = DirectoryURL.fromShareURL(shareURL, dirName);
  let fileName = getUniqueName("file");
  let fileURL = FileURL.fromDirectoryURL(dirURL, fileName);
  let tempFile1: File;
  const tempFile1Length: number = 128 * 1024 * 1024 - 1;
  let tempFile2: File;
  const tempFile2Length: number = 1 * 1024 * 1024 - 1;

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
    tempFile1 = getBrowserFile(getUniqueName("browserfile"), tempFile1Length);
    tempFile2 = getBrowserFile(getUniqueName("browserfile"), tempFile2Length);
  });

  after(async () => {});

  it("uploadBrowserDataToAzureFile should abort for large file", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await uploadBrowserDataToAzureFile(aborter, tempFile1, fileURL, {
        parallelism: 2,
        rangeSize: 4 * 1024 * 1024
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("uploadBrowserDataToAzureFile should abort for small file", async () => {
    const aborter = Aborter.timeout(1);

    try {
      await uploadBrowserDataToAzureFile(aborter, tempFile2, fileURL, {
        parallelism: 2,
        rangeSize: 4 * 1024 * 1024
      });
      assert.fail();
    } catch (err) {
      assert.ok((err.code as string).toLowerCase().includes("abort"));
    }
  });

  it("uploadBrowserDataToAzureFile should update progress for large file", async () => {
    let eventTriggered = false;
    const aborter = Aborter.none;

    try {
      await uploadBrowserDataToAzureFile(aborter, tempFile1, fileURL, {
        parallelism: 2,
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

  it("uploadBrowserDataToAzureFile should update progress for small file", async () => {
    let eventTriggered = false;
    const aborter = Aborter.none;

    try {
      await uploadBrowserDataToAzureFile(aborter, tempFile2, fileURL, {
        parallelism: 2,
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

  it("uploadBrowserDataToAzureFile should success for small file", async () => {
    await uploadBrowserDataToAzureFile(Aborter.none, tempFile2, fileURL, {
      parallelism: 2,
      rangeSize: 4 * 1024 * 1024
    });

    const downloadResponse = await fileURL.download(Aborter.none, 0);
    const downloadedString = await bodyToString(downloadResponse);
    const uploadedString = await blobToString(tempFile2);

    assert.equal(uploadedString, downloadedString);
  });

  it("uploadBrowserDataToAzureFile should success for large file", async () => {
    // if (isIE()) {
    //   assert.ok(
    //     true,
    //     "Skip this case in IE11 which doesn't have enough memory for downloading validation"
    //   );
    //   return;
    // }

    await uploadBrowserDataToAzureFile(Aborter.none, tempFile1, fileURL, {
      parallelism: 2,
      rangeSize: 4 * 1024 * 1024
    });

    const downloadResponse = await fileURL.download(Aborter.none, 0);
    const buf1 = await blobToArrayBuffer(await downloadResponse.blobBody!);
    const buf2 = await blobToArrayBuffer(tempFile1);

    assert.ok(arrayBufferEqual(buf1, buf2));
  });
});
