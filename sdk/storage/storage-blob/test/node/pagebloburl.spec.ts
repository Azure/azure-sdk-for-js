import * as assert from "assert";

import { BlobSASPermissions, BlockBlobURL, generateBlobSASQueryParameters, SharedKeyCredential } from "../../src";
import { Aborter } from "../../src/Aborter";
import { BlobURL } from "../../src/BlobURL";
import { ContainerURL } from "../../src/ContainerURL";
import { PageBlobURL } from "../../src/PageBlobURL";
import { bodyToString, getBSU } from "../utils";
import { delay, record } from "../utils/recorder";

describe("PageBlobURL", () => {
  const serviceURL = getBSU();
  let containerName: string;
  let containerURL: ContainerURL;
  let blobName: string;
  let blobURL: BlobURL;
  let pageBlobURL: PageBlobURL;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    containerName = recorder.getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create(Aborter.none);
    blobName = recorder.getUniqueName("blob");
    blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    pageBlobURL = PageBlobURL.fromBlobURL(blobURL);
  });

  afterEach(async () => {
    await containerURL.delete(Aborter.none);
    recorder.stop();
  });

  it("startCopyIncremental", async () => {
    await pageBlobURL.create(Aborter.none, 1024, {
      metadata: {
        sourcemeta: "val"
      }
    });
    await pageBlobURL.uploadPages(Aborter.none, "b".repeat(1024), 0, 1024);

    let snapshotResult = await pageBlobURL.createSnapshot(Aborter.none);
    assert.ok(snapshotResult.snapshot);

    const destPageBlobURL = PageBlobURL.fromContainerURL(
      containerURL,
      recorder.getUniqueName("page")
    );

    await containerURL.setAccessPolicy(Aborter.none, "container");

    await delay(5 * 1000);

    let copySource = pageBlobURL.withSnapshot(snapshotResult.snapshot!).url;
    let copyResponse = await destPageBlobURL.startCopyIncremental(Aborter.none, copySource);

    async function waitForCopy(retries = 0) {
      if (retries >= 30) {
        throw new Error("Check copy status exceed max retries counts");
      }

      switch (copyResponse.copyStatus) {
        case "success":
          return;
        case "aborted":
          throw new Error("Copy unexcepted aborted.");
        case "pending":
          await delay(3000);
          copyResponse = await destPageBlobURL.getProperties(Aborter.none);
          await waitForCopy(++retries);
          return;
        case "failed":
          throw new Error("Copy failed.");
        default:
          return;
      }
    }

    await waitForCopy();

    let listBlobResponse = await containerURL.listBlobFlatSegment(Aborter.none, undefined, {
      include: ["copy", "snapshots"]
    });

    assert.equal(listBlobResponse.segment.blobItems.length, 4);

    await pageBlobURL.uploadPages(Aborter.none, "c".repeat(1024), 0, 1024);
    snapshotResult = await pageBlobURL.createSnapshot(Aborter.none);
    assert.ok(snapshotResult.snapshot);
    copySource = pageBlobURL.withSnapshot(snapshotResult.snapshot!).url;
    copyResponse = await destPageBlobURL.startCopyIncremental(Aborter.none, copySource);

    await waitForCopy();

    listBlobResponse = await containerURL.listBlobFlatSegment(Aborter.none, undefined, {
      include: ["copy", "snapshots"]
    });

    assert.equal(listBlobResponse.segment.blobItems.length, 6);

    const pageBlobProperties = await destPageBlobURL.getProperties(Aborter.none);
    assert.equal(pageBlobProperties.metadata!.sourcemeta, "val");
  });

  it("uploadPagesFromURL", async () => {
    await pageBlobURL.create(Aborter.none, 1024);

    const result = await blobURL.download(Aborter.none, 0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    const content = "a".repeat(512) + "b".repeat(512);
    const blockBlobName = recorder.getUniqueName("blockblob");
    const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blockBlobName);
    await blockBlobURL.upload(Aborter.none, content, content.length);

    // Get a SAS for blobURL
    const expiryTime = recorder.newDate();
    expiryTime.setDate(expiryTime.getDate() + 1);
    const sas = generateBlobSASQueryParameters(
      {
        expiryTime,
        containerName,
        blobName: blockBlobName,
        permissions: BlobSASPermissions.parse("r").toString()
      },
      blobURL.pipeline.factories[blobURL.pipeline.factories.length - 1] as SharedKeyCredential
    );

    await pageBlobURL.uploadPagesFromURL(Aborter.none, `${blockBlobURL.url}?${sas}`, 0, 0, 512);
    await pageBlobURL.uploadPagesFromURL(Aborter.none, `${blockBlobURL.url}?${sas}`, 512, 512, 512);

    const page1 = await pageBlobURL.download(Aborter.none, 0, 512);
    const page2 = await pageBlobURL.download(Aborter.none, 512, 512);

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });
});
