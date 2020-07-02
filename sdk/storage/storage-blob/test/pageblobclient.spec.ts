import * as assert from "assert";
import * as dotenv from "dotenv";
import {
  bodyToString,
  getBSU,
  getGenericBSU,
  getSASConnectionStringFromEnvironment,
  recorderEnvSetup
} from "./utils";
import {
  ContainerClient,
  BlobClient,
  PageBlobClient,
  PremiumPageBlobTier,
  BlobServiceClient
} from "../src";
import { record, Recorder } from "@azure/test-utils-recorder";
dotenv.config();

describe("PageBlobClient", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let pageBlobClient: PageBlobClient;

  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    blobServiceClient = getBSU();
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.getUniqueName("blob");
    blobClient = containerClient.getBlobClient(blobName);
    pageBlobClient = blobClient.getPageBlobClient();
  });

  afterEach(async function() {
    await containerClient.delete();
    recorder.stop();
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

  it("create with premium page blob tier", async () => {
    const options = { tier: PremiumPageBlobTier.P20 };

    try {
      await pageBlobClient.create(512, options);

      const result = await blobClient.download(0);
      assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));

      const properties = await blobClient.getProperties();
      assert.equal(properties.accessTier, options.tier);
    } catch (err) {
      if (err.message.indexOf("AccessTierNotSupportedForBlobType") == -1) {
        // not found
        assert.fail("Error thrown while it's not AccessTierNotSupportedForBlobType.");
      }
    }
  });

  it("createIfNotExists", async () => {
    const res = await pageBlobClient.createIfNotExists(512);
    assert.ok(res.succeeded);
    assert.ok(res.etag);

    const res2 = await pageBlobClient.createIfNotExists(512);
    assert.ok(!res2.succeeded);
    assert.equal(res2.errorCode, "BlobAlreadyExists");
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

  it("uploadPages with progress report", async () => {
    await pageBlobClient.create(1024);

    const result = await blobClient.download(0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobClient.uploadPages("a".repeat(512), 0, 512, {
      onProgress: () => {}
    });
    await pageBlobClient.uploadPages("b".repeat(512), 512, 512, {
      onProgress: () => {}
    });

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

    assert.equal((page1.pageRange![0].count || 0) + page1.pageRange![0].offset, 511);
    assert.equal((page2.pageRange![0].count || 0) + page2.pageRange![0].offset, 1023);
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
    assert.equal(rangesDiff.pageRange![0].offset, 0);
    assert.equal(rangesDiff.pageRange![0].count, 511);
    assert.equal(rangesDiff.clearRange![0].offset, 512);
    assert.equal(rangesDiff.clearRange![0].count, 511);
  });

  it("getPageRangesDiffForManagedDisks", async function(): Promise<void> {
    let mdBlobServiceClient: BlobServiceClient;
    try {
      mdBlobServiceClient = getGenericBSU("MD_", "");
    } catch (err) {
      // managed disk account is not properly configured
      return this.skip();
    }
    const mdContainerName = recorder.getUniqueName("md-container");
    const mdContainerClient = mdBlobServiceClient.getContainerClient(mdContainerName);
    await mdContainerClient.create();
    const mdBlobName = recorder.getUniqueName("md-blob");
    const mdBlobClient = mdContainerClient.getBlobClient(mdBlobName);
    const mdPageBlobClient = mdBlobClient.getPageBlobClient();

    await mdPageBlobClient.create(1024);

    const result = await mdBlobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await mdPageBlobClient.uploadPages("b".repeat(1024), 0, 1024);

    const snapshotResult = await mdPageBlobClient.createSnapshot();
    assert.ok(snapshotResult.snapshot);

    await mdPageBlobClient.uploadPages("a".repeat(512), 0, 512);
    await mdPageBlobClient.clearPages(512, 512);

    const snapshotUrl = mdPageBlobClient.withSnapshot(snapshotResult.snapshot!).url;
    const rangesDiff = await mdPageBlobClient.getPageRangesDiffForManagedDisks(
      0,
      1024,
      snapshotUrl
    );

    assert.equal(rangesDiff.pageRange![0].offset, 0);
    assert.equal(rangesDiff.pageRange![0].count, 511);
    assert.equal(rangesDiff.clearRange![0].offset, 512);
    assert.equal(rangesDiff.clearRange![0].count, 511);

    await mdContainerClient.delete();
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

  it("uploadPages with invalid CRC64 should fail", async () => {
    await pageBlobClient.create(1024);

    let exceptionCaught = false;
    try {
      await pageBlobClient.uploadPages("b".repeat(1024), 0, 1024, {
        transactionalContentCrc64: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
      });
    } catch (err) {
      if (err instanceof Error && err.message.indexOf("Crc64Mismatch") != -1) {
        exceptionCaught = true;
      }
    }

    assert.ok(exceptionCaught);
  });

  it("can be created with a sas connection string", async () => {
    const newClient = new PageBlobClient(
      getSASConnectionStringFromEnvironment(),
      containerName,
      blobName
    );

    await newClient.create(512);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("throws error if constructor containerName parameter is empty", async () => {
    try {
      // tslint:disable-next-line: no-unused-expression
      new PageBlobClient(getSASConnectionStringFromEnvironment(), "", "blobName");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Expecting non-empty strings for containerName and blobName parameters",
        error.message,
        "Error message is different than expected."
      );
    }
  });

  it("throws error if constructor blobName parameter is empty", async () => {
    try {
      // tslint:disable-next-line: no-unused-expression
      new PageBlobClient(getSASConnectionStringFromEnvironment(), "containerName", "");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Expecting non-empty strings for containerName and blobName parameters",
        error.message,
        "Error message is different than expected."
      );
    }
  });
});
