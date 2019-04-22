import * as assert from "assert";
import { bodyToString, getBSU, getUniqueName } from "./utils";

import { BlobURL } from "../src/BlobURL";
import { ContainerURL } from "../src/ContainerURL";
import { PageBlobURL } from "../src/PageBlobURL";
import * as dotenv from "dotenv";
dotenv.config({path:"../.env"});

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
    await containerURL.create();
    blobName = getUniqueName("blob");
    blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    pageBlobURL = PageBlobURL.fromBlobURL(blobURL);
  });

  afterEach(async () => {
    await containerURL.delete();
  });

  it("create with default parameters", async () => {
    await pageBlobURL.create(512);

    const result = await blobURL.download(0);
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
    await pageBlobURL.create(512, options);

    const result = await blobURL.download(0);
    assert.deepStrictEqual(
      await bodyToString(result, 512),
      "\u0000".repeat(512)
    );

    const properties = await blobURL.getProperties();
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
    await pageBlobURL.create(1024);

    const result = await blobURL.download(0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobURL.uploadPages("a".repeat(512), 0, 512);
    await pageBlobURL.uploadPages("b".repeat(512), 512, 512);

    const page1 = await pageBlobURL.download(0, 512);
    const page2 = await pageBlobURL.download(512, 512);

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });

  it("clearPages", async () => {
    await pageBlobURL.create(1024);
    let result = await blobURL.download(0);
    assert.deepStrictEqual(
      await bodyToString(result, 1024),
      "\u0000".repeat(1024)
    );

    await pageBlobURL.uploadPages("a".repeat(1024), 0, 1024);
    result = await pageBlobURL.download(0, 1024);
    assert.deepStrictEqual(await bodyToString(result, 1024), "a".repeat(1024));

    await pageBlobURL.clearPages(0, 512);
    result = await pageBlobURL.download(0, 512);
    assert.deepStrictEqual(
      await bodyToString(result, 512),
      "\u0000".repeat(512)
    );
  });

  it("getPageRanges", async () => {
    await pageBlobURL.create(1024);

    const result = await blobURL.download(0);
    assert.deepStrictEqual(
      await bodyToString(result, 1024),
      "\u0000".repeat(1024)
    );

    await pageBlobURL.uploadPages("a".repeat(512), 0, 512);
    await pageBlobURL.uploadPages("b".repeat(512), 512, 512);

    const page1 = await pageBlobURL.getPageRanges(0, 512);
    const page2 = await pageBlobURL.getPageRanges(512, 512);

    assert.equal(page1.pageRange![0].end, 511);
    assert.equal(page2.pageRange![0].end, 1023);
  });

  it("getPageRangesDiff", async () => {
    await pageBlobURL.create(1024);

    const result = await blobURL.download(0);
    assert.deepStrictEqual(
      await bodyToString(result, 1024),
      "\u0000".repeat(1024)
    );

    await pageBlobURL.uploadPages("b".repeat(1024), 0, 1024);

    const snapshotResult = await pageBlobURL.createSnapshot();
    assert.ok(snapshotResult.snapshot);

    await pageBlobURL.uploadPages("a".repeat(512), 0, 512);
    await pageBlobURL.clearPages(512, 512);

    const rangesDiff = await pageBlobURL.getPageRangesDiff(
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
    await pageBlobURL.create(1024);
    let propertiesResponse = await pageBlobURL.getProperties();

    await pageBlobURL.updateSequenceNumber("increment");
    propertiesResponse = await pageBlobURL.getProperties();
    assert.equal(propertiesResponse.blobSequenceNumber!, 1);

    await pageBlobURL.updateSequenceNumber("update", 10);
    propertiesResponse = await pageBlobURL.getProperties();
    assert.equal(propertiesResponse.blobSequenceNumber!, 10);

    await pageBlobURL.updateSequenceNumber("max", 100);
    propertiesResponse = await pageBlobURL.getProperties();
    assert.equal(propertiesResponse.blobSequenceNumber!, 100);
  });
});
