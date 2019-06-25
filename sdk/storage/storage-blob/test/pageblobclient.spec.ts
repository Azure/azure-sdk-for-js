import * as assert from "assert";
import * as dotenv from "dotenv";
import { bodyToString, getBSU, getUniqueName } from "./utils";
dotenv.config({ path: "../.env" });

describe("PageBlobClient", () => {
  const blobServiceClient = getBSU();
  let containerName: string = getUniqueName("container");
  let containerClient = blobServiceClient.getContainerClient(containerName);
  let blobName: string = getUniqueName("blob");
  let blobClient = containerClient.getBlobClient(blobName);
  let pageBlobClient = blobClient.getPageBlobClient();

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = getUniqueName("blob");
    blobClient = containerClient.getBlobClient(blobName);
    pageBlobClient = blobClient.getPageBlobClient();
  });

  afterEach(async () => {
    await containerClient.delete();
  });

  it("create with default parameters", async () => {
    await pageBlobClient.create(512);

    const result = await blobClient.download(0);
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
    await pageBlobClient.create(512, options);

    const result = await blobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));

    const properties = await blobClient.getProperties();
    assert.equal(properties.cacheControl, options.blobHTTPHeaders.blobCacheControl);
    assert.equal(properties.contentDisposition, options.blobHTTPHeaders.blobContentDisposition);
    assert.equal(properties.contentEncoding, options.blobHTTPHeaders.blobContentEncoding);
    assert.equal(properties.contentLanguage, options.blobHTTPHeaders.blobContentLanguage);
    assert.equal(properties.contentType, options.blobHTTPHeaders.blobContentType);
    assert.equal(properties.metadata!.key1, options.metadata.key1);
    assert.equal(properties.metadata!.key2, options.metadata.key2);
  });

  it("uploadPages", async () => {
    await pageBlobClient.create(1024);

    const result = await blobClient.download(0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobClient.uploadPages("a".repeat(512), 0, 512);
    await pageBlobClient.uploadPages("b".repeat(512), 512, 512);

    const page1 = await pageBlobClient.download(0, 512);
    const page2 = await pageBlobClient.download(512, 512);

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });

  it("clearPages", async () => {
    await pageBlobClient.create(1024);
    let result = await blobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobClient.uploadPages("a".repeat(1024), 0, 1024);
    result = await pageBlobClient.download(0, 1024);
    assert.deepStrictEqual(await bodyToString(result, 1024), "a".repeat(1024));

    await pageBlobClient.clearPages(0, 512);
    result = await pageBlobClient.download(0, 512);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("getPageRanges", async () => {
    await pageBlobClient.create(1024);

    const result = await blobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobClient.uploadPages("a".repeat(512), 0, 512);
    await pageBlobClient.uploadPages("b".repeat(512), 512, 512);

    const page1 = await pageBlobClient.getPageRanges(0, 512);
    const page2 = await pageBlobClient.getPageRanges(512, 512);

    assert.equal(page1.pageRange![0].end, 511);
    assert.equal(page2.pageRange![0].end, 1023);
  });

  it("getPageRangesDiff", async () => {
    await pageBlobClient.create(1024);

    const result = await blobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobClient.uploadPages("b".repeat(1024), 0, 1024);

    const snapshotResult = await pageBlobClient.createSnapshot();
    assert.ok(snapshotResult.snapshot);

    await pageBlobClient.uploadPages("a".repeat(512), 0, 512);
    await pageBlobClient.clearPages(512, 512);

    const rangesDiff = await pageBlobClient.getPageRangesDiff(0, 1024, snapshotResult.snapshot!);
    assert.equal(rangesDiff.pageRange![0].start, 0);
    assert.equal(rangesDiff.pageRange![0].end, 511);
    assert.equal(rangesDiff.clearRange![0].start, 512);
    assert.equal(rangesDiff.clearRange![0].end, 1023);
  });

  it("updateSequenceNumber", async () => {
    await pageBlobClient.create(1024);
    let propertiesResponse = await pageBlobClient.getProperties();

    await pageBlobClient.updateSequenceNumber("increment");
    propertiesResponse = await pageBlobClient.getProperties();
    assert.equal(propertiesResponse.blobSequenceNumber!, 1);

    await pageBlobClient.updateSequenceNumber("update", 10);
    propertiesResponse = await pageBlobClient.getProperties();
    assert.equal(propertiesResponse.blobSequenceNumber!, 10);

    await pageBlobClient.updateSequenceNumber("max", 100);
    propertiesResponse = await pageBlobClient.getProperties();
    assert.equal(propertiesResponse.blobSequenceNumber!, 100);
  });
});
