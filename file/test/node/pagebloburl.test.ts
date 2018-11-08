import * as assert from "assert";

import { Aborter } from "../../lib/Aborter";
import { BlobURL } from "../../lib/BlobURL";
import { ContainerURL } from "../../lib/ContainerURL";
import {
  ListBlobsIncludeItem,
  PublicAccessType
} from "../../lib/generated/models";
import { PageBlobURL } from "../../lib/PageBlobURL";
import { getBSU, getUniqueName } from "../utils";

describe("PageBlobURL", () => {
  const serviceURL = getBSU();
  let containerName: string = getUniqueName("container");
  let containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
  let blobName: string = getUniqueName("blob");
  let blobURL = BlobURL.fromContainerURL(containerURL, blobName);
  let pageBlobURL = PageBlobURL.fromBlobURL(blobURL);

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create(Aborter.none);
    blobName = getUniqueName("blob");
    blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    pageBlobURL = PageBlobURL.fromBlobURL(blobURL);
  });

  afterEach(async () => {
    await containerURL.delete(Aborter.none);
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
      getUniqueName("page")
    );

    await containerURL.setAccessPolicy(
      Aborter.none,
      PublicAccessType.Container
    );
    let copySource = pageBlobURL.withSnapshot(snapshotResult.snapshot!).url;
    await destPageBlobURL.startCopyIncremental(Aborter.none, copySource);
    let listBlobResponse = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        include: [ListBlobsIncludeItem.Copy, ListBlobsIncludeItem.Snapshots]
      }
    );

    assert.equal(listBlobResponse.segment.blobItems.length, 4);

    await pageBlobURL.uploadPages(Aborter.none, "c".repeat(1024), 0, 1024);
    snapshotResult = await pageBlobURL.createSnapshot(Aborter.none);
    assert.ok(snapshotResult.snapshot);
    copySource = pageBlobURL.withSnapshot(snapshotResult.snapshot!).url;
    await destPageBlobURL.startCopyIncremental(Aborter.none, copySource);

    listBlobResponse = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        include: [ListBlobsIncludeItem.Copy, ListBlobsIncludeItem.Snapshots]
      }
    );

    assert.equal(listBlobResponse.segment.blobItems.length, 6);

    const pageBlobProperties = await destPageBlobURL.getProperties(
      Aborter.none
    );
    assert.equal(pageBlobProperties.metadata!.sourcemeta, "val");
  });
});
