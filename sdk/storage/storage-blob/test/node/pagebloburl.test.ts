import * as assert from "assert";

import { Aborter } from "../../src/Aborter";
import { BlobURL } from "../../src/BlobURL";
import { ContainerURL } from "../../src/ContainerURL";
import { PageBlobURL } from "../../src/PageBlobURL";
import { getBSU, sleep } from "../utils";
import { record } from "../utils/nock-recorder";

describe("PageBlobURL", function() {
  const serviceURL = getBSU();
  let containerName: string;
  let containerURL: ContainerURL;
  let blobName: string;
  let blobURL: BlobURL;
  let pageBlobURL: PageBlobURL;
  const testSuiteTitle = this.fullTitle();

  let recorder: any;

  beforeEach(async () => {
    recorder = record(testSuiteTitle, this.ctx.currentTest!.title);
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

    await sleep(5 * 1000);

    let copySource = pageBlobURL.withSnapshot(snapshotResult.snapshot!).url;
    let copyResponse = await destPageBlobURL.startCopyIncremental(
      Aborter.none,
      copySource
    );

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
          await sleep(3000);
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

    let listBlobResponse = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        include: ["copy", "snapshots"]
      }
    );

    assert.equal(listBlobResponse.segment.blobItems.length, 4);

    await pageBlobURL.uploadPages(Aborter.none, "c".repeat(1024), 0, 1024);
    snapshotResult = await pageBlobURL.createSnapshot(Aborter.none);
    assert.ok(snapshotResult.snapshot);
    copySource = pageBlobURL.withSnapshot(snapshotResult.snapshot!).url;
    copyResponse = await destPageBlobURL.startCopyIncremental(
      Aborter.none,
      copySource
    );

    await waitForCopy();

    listBlobResponse = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        include: ["copy", "snapshots"]
      }
    );

    assert.equal(listBlobResponse.segment.blobItems.length, 6);

    const pageBlobProperties = await destPageBlobURL.getProperties(
      Aborter.none
    );
    assert.equal(pageBlobProperties.metadata!.sourcemeta, "val");
  });
});
