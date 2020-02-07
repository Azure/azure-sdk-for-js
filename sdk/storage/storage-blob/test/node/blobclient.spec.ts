import * as assert from "assert";

import { isNode } from "@azure/core-http";
import * as dotenv from "dotenv";
import {
  BlobClient,
  newPipeline,
  StorageSharedKeyCredential,
  ContainerClient,
  BlockBlobClient,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  BlobServiceClient
} from "../../src";
import {
  bodyToString,
  getBSU,
  getConnectionStringFromEnvironment,
  recorderEnvSetup
} from "../utils";
import { TokenCredential } from "@azure/core-http";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { record, delay } from "@azure/test-utils-recorder";
dotenv.config({ path: "../.env" });

describe("BlobClient Node.js only", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  const content = "Hello World";

  let recorder: any;

  let blobServiceClient: BlobServiceClient;
  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    blobServiceClient = getBSU();
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.getUniqueName("blob");
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);
  });

  afterEach(async function() {
    await containerClient.delete();
    recorder.stop();
  });

  it("download with with default parameters", async () => {
    const result = await blobClient.download();
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it("download all parameters set", async () => {
    const result = await blobClient.download(0, 1, {
      rangeGetContentMD5: true
    });
    assert.deepStrictEqual(await bodyToString(result, 1), content[0]);
  });

  it("setMetadata with new metadata set", async () => {
    const metadata = {
      a: "a",
      b: "b"
    };
    await blobClient.setMetadata(metadata);
    const result = await blobClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("setMetadata with cleaning up metadata", async () => {
    const metadata = {
      a: "a",
      b: "b"
    };
    await blobClient.setMetadata(metadata);
    const result = await blobClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);

    await blobClient.setMetadata();
    const result2 = await blobClient.getProperties();
    assert.deepStrictEqual(result2.metadata, {});
  });

  it("setHTTPHeaders with default parameters", async () => {
    await blobClient.setHTTPHeaders({});
    const result = await blobClient.getProperties();

    assert.deepStrictEqual(result.blobType, "BlockBlob");
    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.ok(!result.cacheControl);
    assert.ok(!result.contentType);
    assert.ok(!result.contentMD5);
    assert.ok(!result.contentEncoding);
    assert.ok(!result.contentLanguage);
    assert.ok(!result.contentDisposition);
  });

  it("setHTTPHeaders with all parameters set", async () => {
    const headers = {
      blobCacheControl: "blobCacheControl",
      blobContentDisposition: "blobContentDisposition",
      blobContentEncoding: "blobContentEncoding",
      blobContentLanguage: "blobContentLanguage",
      blobContentMD5: isNode ? Buffer.from([1, 2, 3, 4]) : new Uint8Array([1, 2, 3, 4]),
      blobContentType: "blobContentType"
    };
    await blobClient.setHTTPHeaders(headers);
    const result = await blobClient.getProperties();
    assert.ok(result.date);
    assert.deepStrictEqual(result.blobType, "BlockBlob");
    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.deepStrictEqual(result.cacheControl, headers.blobCacheControl);
    assert.deepStrictEqual(result.contentType, headers.blobContentType);
    assert.deepStrictEqual(result.contentMD5, headers.blobContentMD5);
    assert.deepStrictEqual(result.contentEncoding, headers.blobContentEncoding);
    assert.deepStrictEqual(result.contentLanguage, headers.blobContentLanguage);
    assert.deepStrictEqual(result.contentDisposition, headers.blobContentDisposition);
  });

  it("delete", async () => {
    await blobClient.delete();
  });

  // The following code illustrates deleting a snapshot after creating one
  it("delete snapshot", async () => {
    const result = await blobClient.createSnapshot();
    assert.ok(result.snapshot);

    const blobSnapshotClient = blobClient.withSnapshot(result.snapshot!);
    await blobSnapshotClient.getProperties();

    await blobSnapshotClient.delete();
    await blobClient.delete();

    const result2 = (
      await containerClient
        .listBlobsFlat({
          includeSnapshots: true
        })
        .byPage()
        .next()
    ).value;

    // Verify that the snapshot is deleted
    assert.equal(result2.segment.blobItems!.length, 0);
  });

  it("createSnapshot", async () => {
    const result = await blobClient.createSnapshot();
    assert.ok(result.snapshot);

    const blobSnapshotClient = blobClient.withSnapshot(result.snapshot!);
    await blobSnapshotClient.getProperties();

    const result3 = (
      await containerClient
        .listBlobsFlat({
          includeSnapshots: true
        })
        .byPage()
        .next()
    ).value;

    // As a snapshot doesn't have leaseStatus and leaseState properties but origin blob has,
    // let assign them to undefined both for other properties' easy comparison
    // tslint:disable-next-line:max-line-length
    result3.segment.blobItems![0].properties.leaseState = result3.segment.blobItems![1].properties.leaseState = undefined;
    // tslint:disable-next-line:max-line-length
    result3.segment.blobItems![0].properties.leaseStatus = result3.segment.blobItems![1].properties.leaseStatus = undefined;
    // tslint:disable-next-line:max-line-length
    result3.segment.blobItems![0].properties.accessTier = result3.segment.blobItems![1].properties.accessTier = undefined;
    // tslint:disable-next-line:max-line-length
    result3.segment.blobItems![0].properties.accessTierInferred = result3.segment.blobItems![1].properties.accessTierInferred = undefined;

    assert.deepStrictEqual(
      result3.segment.blobItems![0].properties,
      result3.segment.blobItems![1].properties
    );
    assert.ok(result3.segment.blobItems![0].snapshot || result3.segment.blobItems![1].snapshot);
  });

  it("syncCopyFromURL", async () => {
    const newBlobClient = containerClient.getBlobClient(recorder.getUniqueName("copiedblob"));

    // Different from startCopyFromURL, syncCopyFromURL requires sourceURL includes a valid SAS
    const expiryTime = recorder.newDate();
    expiryTime.setDate(expiryTime.getDate() + 1);

    const factories = (containerClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;

    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        permissions: BlobSASPermissions.parse("racwd"),
        containerName,
        blobName
      },
      credential
    );

    const copyURL = blobClient.url + "?" + sas;
    const result = await newBlobClient.syncCopyFromURL(copyURL);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
  });

  it("abortCopyFromClient should failed for a completed copy operation", async () => {
    const newBlobClient = containerClient.getBlobClient(recorder.getUniqueName("copiedblob"));
    const result = await (await newBlobClient.beginCopyFromURL(blobClient.url)).pollUntilDone();
    assert.ok(result.copyId);
    delay(1 * 1000);

    try {
      await newBlobClient.beginCopyFromURL(result.copyId!);
      assert.fail(
        "AbortCopyFromClient should be failed and throw exception for an completed copy operation."
      );
    } catch (err) {
      assert.ok((err as any).response.parsedBody.Code === "InvalidHeaderValue");
    }
  });

  it("setAccessTier set default to cool", async () => {
    await blockBlobClient.setAccessTier("Cool");
    const properties = await blockBlobClient.getProperties();
    assert.equal(properties.accessTier!.toLowerCase(), "cool");
  });

  it("setAccessTier set archive to hot", async () => {
    await blockBlobClient.setAccessTier("Archive");
    let properties = await blockBlobClient.getProperties();
    assert.equal(properties.accessTier!.toLowerCase(), "archive");

    await blockBlobClient.setAccessTier("Hot");
    properties = await blockBlobClient.getProperties();
    if (properties.archiveStatus) {
      assert.equal(properties.archiveStatus.toLowerCase(), "rehydrate-pending-to-hot");
    }
  });

  it("can be created with a url and a credential", async () => {
    const factories = (blobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new BlobClient(blobClient.url, credential);

    const metadata = {
      a: "a",
      b: "b"
    };
    await newClient.setMetadata(metadata);
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (blobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new BlobClient(blobClient.url, credential, {
      retryOptions: {
        maxTries: 5
      }
    });

    const metadata = {
      a: "a",
      b: "b"
    };
    await newClient.setMetadata(metadata);
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("can be created with a url and a TokenCredential", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345
        })
    };
    const newClient = new BlobClient(blobClient.url, tokenCredential);
    assertClientUsesTokenCredential(newClient);
  });

  it("can be created with a url and a pipeline", async () => {
    const factories = (blobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new BlobClient(blobClient.url, pipeline);

    const metadata = {
      a: "a",
      b: "b"
    };
    await newClient.setMetadata(metadata);
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("can be created with a connection string", async () => {
    const newClient = new BlobClient(getConnectionStringFromEnvironment(), containerName, blobName);
    const metadata = {
      a: "a",
      b: "b"
    };
    await newClient.setMetadata(metadata);
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("can be created with a connection string and an option bag", async () => {
    const newClient = new BlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName,
      {
        retryOptions: {
          maxTries: 5
        }
      }
    );
    const metadata = {
      a: "a",
      b: "b"
    };
    await newClient.setMetadata(metadata);
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });
});
