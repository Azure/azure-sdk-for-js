import * as assert from "assert";
import { bodyToString, getBSU, getUniqueName } from "./utils";

import { Aborter } from "../src/Aborter";
import { BlobClient } from "../src/BlobClient";
import { ContainerClient } from "../src/ContainerClient";
import { PageBlobClient } from "../src/PageBlobClient";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

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

  it("create with default parameters", async () => {
    await pageBlobClient.create(Aborter.none, 512);

    const result = await blobClient.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
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
    await pageBlobClient.create(Aborter.none, 512, options);

    const result = await blobClient.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));

    const properties = await blobClient.getProperties(Aborter.none);
    assert.equal(properties.cacheControl, options.blobHTTPHeaders.blobCacheControl);
    assert.equal(properties.contentDisposition, options.blobHTTPHeaders.blobContentDisposition);
    assert.equal(properties.contentEncoding, options.blobHTTPHeaders.blobContentEncoding);
    assert.equal(properties.contentLanguage, options.blobHTTPHeaders.blobContentLanguage);
    assert.equal(properties.contentType, options.blobHTTPHeaders.blobContentType);
    assert.equal(properties.metadata!.key1, options.metadata.key1);
    assert.equal(properties.metadata!.key2, options.metadata.key2);
  });

  it("uploadPages", async () => {
    await pageBlobClient.create(Aborter.none, 1024);

    const result = await blobClient.download(Aborter.none, 0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobClient.uploadPages(Aborter.none, "a".repeat(512), 0, 512);
    await pageBlobClient.uploadPages(Aborter.none, "b".repeat(512), 512, 512);

    const page1 = await pageBlobClient.download(Aborter.none, 0, 512);
    const page2 = await pageBlobClient.download(Aborter.none, 512, 512);

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });

  it("clearPages", async () => {
    await pageBlobClient.create(Aborter.none, 1024);
    let result = await blobClient.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobClient.uploadPages(Aborter.none, "a".repeat(1024), 0, 1024);
    result = await pageBlobClient.download(Aborter.none, 0, 1024);
    assert.deepStrictEqual(await bodyToString(result, 1024), "a".repeat(1024));

    await pageBlobClient.clearPages(Aborter.none, 0, 512);
    result = await pageBlobClient.download(Aborter.none, 0, 512);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("getPageRanges", async () => {
    await pageBlobClient.create(Aborter.none, 1024);

    const result = await blobClient.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobClient.uploadPages(Aborter.none, "a".repeat(512), 0, 512);
    await pageBlobClient.uploadPages(Aborter.none, "b".repeat(512), 512, 512);

    const page1 = await pageBlobClient.getPageRanges(Aborter.none, 0, 512);
    const page2 = await pageBlobClient.getPageRanges(Aborter.none, 512, 512);

    assert.equal(page1.pageRange![0].end, 511);
    assert.equal(page2.pageRange![0].end, 1023);
  });

  it("getPageRangesDiff", async () => {
    await pageBlobClient.create(Aborter.none, 1024);

    const result = await blobClient.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobClient.uploadPages(Aborter.none, "b".repeat(1024), 0, 1024);

    const snapshotResult = await pageBlobClient.createSnapshot(Aborter.none);
    assert.ok(snapshotResult.snapshot);

    await pageBlobClient.uploadPages(Aborter.none, "a".repeat(512), 0, 512);
    await pageBlobClient.clearPages(Aborter.none, 512, 512);

    const rangesDiff = await pageBlobClient.getPageRangesDiff(
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
    await pageBlobClient.create(Aborter.none, 1024);
    let propertiesResponse = await pageBlobClient.getProperties(Aborter.none);

    await pageBlobClient.updateSequenceNumber(Aborter.none, "increment");
    propertiesResponse = await pageBlobClient.getProperties(Aborter.none);
    assert.equal(propertiesResponse.blobSequenceNumber!, 1);

    await pageBlobClient.updateSequenceNumber(Aborter.none, "update", 10);
    propertiesResponse = await pageBlobClient.getProperties(Aborter.none);
    assert.equal(propertiesResponse.blobSequenceNumber!, 10);

    await pageBlobClient.updateSequenceNumber(Aborter.none, "max", 100);
    propertiesResponse = await pageBlobClient.getProperties(Aborter.none);
    assert.equal(propertiesResponse.blobSequenceNumber!, 100);
  });
});
