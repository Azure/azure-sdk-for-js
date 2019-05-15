import * as assert from "assert";

import { Aborter } from "../../src/Aborter";
import { BlobClient } from "../../src/BlobClient";
import { ContainerClient } from "../../src/ContainerClient";
import { PageBlobClient } from "../../src/PageBlobClient";
import { getBSU, getUniqueName, sleep } from "../utils";

describe("PageBlobClient", () => {
  const serviceClient = getBSU();
  let containerName: string = getUniqueName("container");
  let containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);
  let blobName: string = getUniqueName("blob");
  let blobClient = BlobClient.fromContainerClient(containerClient, blobName);
  let pageBlobClient = PageBlobClient.fromBlobClient(blobClient);

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);
    await containerClient.create(Aborter.none);
    blobName = getUniqueName("blob");
    blobClient = BlobClient.fromContainerClient(containerClient, blobName);
    pageBlobClient = PageBlobClient.fromBlobClient(blobClient);
  });

  afterEach(async () => {
    await containerClient.delete(Aborter.none);
  });

  it("startCopyIncremental", async () => {
    await pageBlobClient.create(Aborter.none, 1024, {
      metadata: {
        sourcemeta: "val"
      }
    });
    await pageBlobClient.uploadPages(Aborter.none, "b".repeat(1024), 0, 1024);

    let snapshotResult = await pageBlobClient.createSnapshot(Aborter.none);
    assert.ok(snapshotResult.snapshot);

    const destPageBlobClient = PageBlobClient.fromContainerClient(
      containerClient,
      getUniqueName("page")
    );

    await containerClient.setAccessPolicy(Aborter.none, "container");

    await sleep(5 * 1000);

    let copySource = pageBlobClient.withSnapshot(snapshotResult.snapshot!).url;
    let copyResponse = await destPageBlobClient.startCopyIncremental(Aborter.none, copySource);

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
          copyResponse = await destPageBlobClient.getProperties(Aborter.none);
          await waitForCopy(++retries);
          return;
        case "failed":
          throw new Error("Copy failed.");
        default:
          return;
      }
    }

    await waitForCopy();

    let listBlobResponse = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      include: ["copy", "snapshots"]
    });

    assert.equal(listBlobResponse.segment.blobItems.length, 4);

    await pageBlobClient.uploadPages(Aborter.none, "c".repeat(1024), 0, 1024);
    snapshotResult = await pageBlobClient.createSnapshot(Aborter.none);
    assert.ok(snapshotResult.snapshot);
    copySource = pageBlobClient.withSnapshot(snapshotResult.snapshot!).url;
    copyResponse = await destPageBlobClient.startCopyIncremental(Aborter.none, copySource);

    await waitForCopy();

    listBlobResponse = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      include: ["copy", "snapshots"]
    });

    assert.equal(listBlobResponse.segment.blobItems.length, 6);

    const pageBlobProperties = await destPageBlobClient.getProperties(Aborter.none);
    assert.equal(pageBlobProperties.metadata!.sourcemeta, "val");
  });
});
