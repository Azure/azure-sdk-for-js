import * as assert from "assert";
import { bodyToString, getBSU, getUniqueName } from "./utils";

import { Aborter } from "../lib/Aborter";
import { BlobURL } from "../lib/BlobURL";
import { ContainerURL } from "../lib/ContainerURL";
import * as Models from "../lib/generated/models";
import { PageBlobURL } from "../lib/PageBlobURL";

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

  it("create with default parameters", async () => {
    await pageBlobURL.create(Aborter.none, 512);

    const result = await blobURL.download(Aborter.none, 0);
    assert.deepStrictEqual(
      await bodyToString(result, 512),
      "\u0000".repeat(512)
    );
  });

  it("create with all parameters set", async () => {
    const options = {
      blobHTTPHeaders: {
        blobCacheControl: "blobCacheControl",
        blobContentDisposition: "blobContentDisposition",
        blobContentEncoding: "blobContentEncoding",
        blobContentLanguage: "blobContentLanguage",
        blobContentType: "blobContentType"
      },
      metadata: {
        key1: "vala",
        key2: "valb"
      }
    };
    await pageBlobURL.create(Aborter.none, 512, options);

    const result = await blobURL.download(Aborter.none, 0);
    assert.deepStrictEqual(
      await bodyToString(result, 512),
      "\u0000".repeat(512)
    );

    const properties = await blobURL.getProperties(Aborter.none);
    assert.equal(
      properties.cacheControl,
      options.blobHTTPHeaders.blobCacheControl
    );
    assert.equal(
      properties.contentDisposition,
      options.blobHTTPHeaders.blobContentDisposition
    );
    assert.equal(
      properties.contentEncoding,
      options.blobHTTPHeaders.blobContentEncoding
    );
    assert.equal(
      properties.contentLanguage,
      options.blobHTTPHeaders.blobContentLanguage
    );
    assert.equal(
      properties.contentType,
      options.blobHTTPHeaders.blobContentType
    );
    assert.equal(properties.metadata!.key1, options.metadata.key1);
    assert.equal(properties.metadata!.key2, options.metadata.key2);
  });

  it("uploadPages", async () => {
    await pageBlobURL.create(Aborter.none, 1024);

    const result = await blobURL.download(Aborter.none, 0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobURL.uploadPages(Aborter.none, "a".repeat(512), 0, 512);
    await pageBlobURL.uploadPages(Aborter.none, "b".repeat(512), 512, 512);

    const page1 = await pageBlobURL.download(Aborter.none, 0, 512);
    const page2 = await pageBlobURL.download(Aborter.none, 512, 512);

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });

  it("clearPages", async () => {
    await pageBlobURL.create(Aborter.none, 1024);
    let result = await blobURL.download(Aborter.none, 0);
    assert.deepStrictEqual(
      await bodyToString(result, 1024),
      "\u0000".repeat(1024)
    );

    await pageBlobURL.uploadPages(Aborter.none, "a".repeat(1024), 0, 1024);
    result = await pageBlobURL.download(Aborter.none, 0, 1024);
    assert.deepStrictEqual(await bodyToString(result, 1024), "a".repeat(1024));

    await pageBlobURL.clearPages(Aborter.none, 0, 512);
    result = await pageBlobURL.download(Aborter.none, 0, 512);
    assert.deepStrictEqual(
      await bodyToString(result, 512),
      "\u0000".repeat(512)
    );
  });

  it("getPageRanges", async () => {
    await pageBlobURL.create(Aborter.none, 1024);

    const result = await blobURL.download(Aborter.none, 0);
    assert.deepStrictEqual(
      await bodyToString(result, 1024),
      "\u0000".repeat(1024)
    );

    await pageBlobURL.uploadPages(Aborter.none, "a".repeat(512), 0, 512);
    await pageBlobURL.uploadPages(Aborter.none, "b".repeat(512), 512, 512);

    const page1 = await pageBlobURL.getPageRanges(Aborter.none, 0, 512);
    const page2 = await pageBlobURL.getPageRanges(Aborter.none, 512, 512);

    assert.equal(page1.pageRange![0].end, 511);
    assert.equal(page2.pageRange![0].end, 1023);
  });

  it("getPageRangesDiff", async () => {
    await pageBlobURL.create(Aborter.none, 1024);

    const result = await blobURL.download(Aborter.none, 0);
    assert.deepStrictEqual(
      await bodyToString(result, 1024),
      "\u0000".repeat(1024)
    );

    await pageBlobURL.uploadPages(Aborter.none, "b".repeat(1024), 0, 1024);

    const snapshotResult = await pageBlobURL.createSnapshot(Aborter.none);
    assert.ok(snapshotResult.snapshot);

    await pageBlobURL.uploadPages(Aborter.none, "a".repeat(512), 0, 512);
    await pageBlobURL.clearPages(Aborter.none, 512, 512);

    const rangesDiff = await pageBlobURL.getPageRangesDiff(
      Aborter.none,
      0,
      1024,
      snapshotResult.snapshot!
    );
    assert.equal(rangesDiff.pageRange![0].start, 0);
    assert.equal(rangesDiff.pageRange![0].end, 511);
    assert.equal(rangesDiff.clearRange![0].start, 512);
    assert.equal(rangesDiff.clearRange![0].end, 1023);
  });

  it("updateSequenceNumber", async () => {
    await pageBlobURL.create(Aborter.none, 1024);
    let propertiesResponse = await pageBlobURL.getProperties(Aborter.none);

    await pageBlobURL.updateSequenceNumber(
      Aborter.none,
      Models.SequenceNumberActionType.Increment
    );
    propertiesResponse = await pageBlobURL.getProperties(Aborter.none);
    assert.equal(propertiesResponse.blobSequenceNumber!, 1);

    await pageBlobURL.updateSequenceNumber(
      Aborter.none,
      Models.SequenceNumberActionType.Update,
      10
    );
    propertiesResponse = await pageBlobURL.getProperties(Aborter.none);
    assert.equal(propertiesResponse.blobSequenceNumber!, 10);

    await pageBlobURL.updateSequenceNumber(
      Aborter.none,
      Models.SequenceNumberActionType.Max,
      100
    );
    propertiesResponse = await pageBlobURL.getProperties(Aborter.none);
    assert.equal(propertiesResponse.blobSequenceNumber!, 100);
  });
});
