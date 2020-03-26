import * as assert from "assert";
import * as dotenv from "dotenv";

import { AbortController } from "@azure/abort-controller";
import { isNode, URLBuilder } from "@azure/core-http";
import { TestTracer, setTracer, SpanGraph } from "@azure/core-tracing";
import {
  bodyToString,
  getBSU,
  getSASConnectionStringFromEnvironment,
  recorderEnvSetup
} from "./utils";
import { record, delay } from "@azure/test-utils-recorder";
import {
  BlobClient,
  BlockBlobClient,
  ContainerClient,
  BlockBlobTier,
  BlobServiceClient
} from "../src";
import { Test_CPK_INFO } from "./utils/constants";
dotenv.config({ path: "../.env" });

describe("BlobClient", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  const content = "Hello World";

  let recorder: any;

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

  it("download with progress report", async () => {
    recorder.skip(
      "browser",
      "record & playback issue: https://github.com/Azure/azure-sdk-for-js/issues/6477"
    );
    let downloadedBytes = 0;
    const result = await blobClient.download(0, undefined, {
      onProgress: (data) => {
        downloadedBytes = data.loadedBytes;
      }
    });
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    assert.equal(downloadedBytes, content.length);
  });

  it("download should not have aborted error after download finishes", async () => {
    const aborter = new AbortController();
    const result = await blobClient.download(0, undefined, { abortSignal: aborter.signal });
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    aborter.abort();
  });

  it("download all parameters set", async () => {
    // For browser scenario, please ensure CORS settings exposed headers: content-md5,x-ms-content-crc64
    // So JS can get contentCrc64 and contentMD5.
    const result1 = await blobClient.download(0, 1, {
      rangeGetContentCrc64: true
    });
    assert.ok(result1.clientRequestId);
    //assert.ok(result1.contentCrc64!);
    assert.deepStrictEqual(await bodyToString(result1, 1), content[0]);
    assert.ok(result1.clientRequestId);

    const result2 = await blobClient.download(1, 1, {
      rangeGetContentMD5: true
    });
    assert.ok(result2.clientRequestId);
    //assert.ok(result2.contentMD5!);

    let exceptionCaught = false;
    try {
      await blobClient.download(2, 1, {
        rangeGetContentMD5: true,
        rangeGetContentCrc64: true
      });
    } catch (err) {
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
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

  it("undelete", async () => {
    let properties = await blobServiceClient.getProperties();
    if (!properties.deleteRetentionPolicy!.enabled) {
      await blobServiceClient.setProperties({
        deleteRetentionPolicy: {
          days: 7,
          enabled: true
        }
      });
      // await delay(15 * 1000);
      properties = await blobServiceClient.getProperties();
      assert.ok(
        properties.deleteRetentionPolicy!.enabled,
        "deleteRetentionPolicy should be enabled."
      );
    }

    await blobClient.delete();

    const iter = containerClient
      .listBlobsFlat({
        includeDeleted: true
      })
      .byPage({ maxPageSize: 1 });

    let res = await iter.next();
    let result = res.value;
    while (!res.done) {
      if (
        !!result &&
        !!result.segment &&
        !!result.segment.blobItems &&
        result.segment.blobItems.length > 0
      ) {
        break;
      }
      res = await iter.next();
      result = res.value;
    }

    assert.ok(result, "Expect valid iterator value");
    assert.ok(result.segment, "Expect valid segment response");

    assert.ok(
      result.segment.blobItems,
      "Expect non empty result from list blobs({ includeDeleted: true }) with page size of 1."
    );

    assert.equal(
      result.segment.blobItems.length,
      1,
      `Expect result.segment.blobItems.length === 1 but got ${result.segment.blobItems.length}.`
    );

    assert.ok(
      result.segment.blobItems![0],
      "Expect a valid element in result array from list blobs({ includeDeleted: true }) with page size of 1."
    );

    assert.ok(result.segment.blobItems![0].deleted, "Expect that the blob is marked for deletion");

    await blobClient.undelete();

    const iter2 = containerClient
      .listBlobsFlat({
        includeDeleted: true
      })
      .byPage();

    res = await iter2.next();
    result = res.value;
    while (!res.done) {
      if (
        !!result &&
        !!result.segment &&
        !!result.segment.blobItems &&
        result.segment.blobItems.length > 0
      ) {
        break;
      }
      res = await iter2.next();
      result = res.value;
    }

    assert.ok(result, "Expect valid iterator value");
    assert.ok(result.segment, "Expect valid segment response");

    assert.ok(result.segment.blobItems, "Expect non empty result from list blobs().");
    assert.ok(
      !result.segment.blobItems![0].deleted,
      "Expect that the blob is NOT marked for deletion"
    );
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

  it("can be created with a sas connection string", async () => {
    const newClient = new BlobClient(
      getSASConnectionStringFromEnvironment(),
      containerName,
      blobName
    );
    const metadata = {
      a: "a",
      b: "b"
    };
    await newClient.setMetadata(metadata);
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("throws error if constructor containerName parameter is empty", async () => {
    try {
      // tslint:disable-next-line: no-unused-expression
      new BlobClient(getSASConnectionStringFromEnvironment(), "", "blobName");
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
      new BlobClient(getSASConnectionStringFromEnvironment(), "containerName", "");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Expecting non-empty strings for containerName and blobName parameters",
        error.message,
        "Error message is different than expected."
      );
    }
  });

  it("setMetadata with CPK on a blob uploaded without CPK should fail", async () => {
    let exceptionCaught = false;
    try {
      await blobClient.setMetadata({ a: "a" }, { customerProvidedKey: Test_CPK_INFO });
    } catch (err) {
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });

  it("setMetadata, setHTTPHeaders, getProperties and createSnapshot with CPK", async () => {
    blobName = recorder.getUniqueName("blobCPK");
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length, {
      customerProvidedKey: Test_CPK_INFO
    });

    const metadata = {
      a: "a",
      b: "b"
    };
    const smResp = await blobClient.setMetadata(metadata, {
      customerProvidedKey: Test_CPK_INFO
    });
    assert.equal(smResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    // getProperties without CPK should fail
    let exceptionCaught = false;
    try {
      await blobClient.getProperties();
    } catch (err) {
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);

    const headers = {
      blobCacheControl: "blobCacheControl",
      blobContentDisposition: "blobContentDisposition",
      blobContentEncoding: "blobContentEncoding",
      blobContentLanguage: "blobContentLanguage",
      blobContentMD5: isNode ? Buffer.from([1, 2, 3, 4]) : new Uint8Array([1, 2, 3, 4]),
      blobContentType: "blobContentType"
    };
    await blobClient.setHTTPHeaders(headers, { customerProvidedKey: Test_CPK_INFO });

    const gResp = await blobClient.getProperties({ customerProvidedKey: Test_CPK_INFO });
    assert.equal(gResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);
    assert.ok(gResp.date);
    assert.deepStrictEqual(gResp.blobType, "BlockBlob");
    assert.ok(gResp.lastModified);
    assert.deepStrictEqual(gResp.metadata, metadata);
    assert.deepStrictEqual(gResp.cacheControl, headers.blobCacheControl);
    assert.deepStrictEqual(gResp.contentType, headers.blobContentType);
    assert.deepStrictEqual(gResp.contentMD5, headers.blobContentMD5);
    assert.deepStrictEqual(gResp.contentEncoding, headers.blobContentEncoding);
    assert.deepStrictEqual(gResp.contentLanguage, headers.blobContentLanguage);
    assert.deepStrictEqual(gResp.contentDisposition, headers.blobContentDisposition);

    const csResp = await blobClient.createSnapshot({
      customerProvidedKey: Test_CPK_INFO
    });
    //assert.equal(csResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256); service side issue?
    assert.ok(csResp.snapshot);

    const blobSnapshotURL = blobClient.withSnapshot(csResp.snapshot!);
    await blobSnapshotURL.getProperties({ customerProvidedKey: Test_CPK_INFO });

    // getProperties without CPK should fail
    exceptionCaught = false;
    try {
      await blobSnapshotURL.getProperties();
    } catch (err) {
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });

  it("beginCopyFromURL with rehydrate priority", async () => {
    recorder.skip("browser");
    const newBlobURL = containerClient.getBlobClient(recorder.getUniqueName("copiedblobrehydrate"));
    const initialTier = BlockBlobTier.Archive;
    const result = await (
      await newBlobURL.beginCopyFromURL(blobClient.url, {
        tier: initialTier,
        rehydratePriority: "Standard"
      })
    ).pollUntilDone();
    assert.ok(result.copyId);
    delay(1 * 1000);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobURL.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
    assert.deepStrictEqual(properties2.copySource, blobClient.url);
    assert.equal(properties2.accessTier, initialTier);

    await newBlobURL.setAccessTier(BlockBlobTier.Hot);
    const properties3 = await newBlobURL.getProperties();
    assert.equal(properties3.archiveStatus!.toLowerCase(), "rehydrate-pending-to-hot");
  });

  it("setAccessTier with rehydrate priority", async () => {
    await blockBlobClient.setAccessTier("Archive", { rehydratePriority: "High" });
    await blockBlobClient.setAccessTier("Cool");
    const properties = await blockBlobClient.getProperties();
    if (properties.archiveStatus) {
      assert.equal(properties.archiveStatus.toLowerCase(), "rehydrate-pending-to-cool");
    }
  });

  it("download with default parameters and tracing", async () => {
    const tracer = new TestTracer();
    setTracer(tracer);

    const rootSpan = tracer.startSpan("root");

    const result = await blobClient.download(undefined, undefined, {
      tracingOptions: {
        spanOptions: { parent: rootSpan }
      }
    });
    assert.deepStrictEqual(await bodyToString(result, content.length), content);

    rootSpan.end();

    const rootSpans = tracer.getRootSpans();
    assert.strictEqual(rootSpans.length, 1, "Should only have one root span.");
    assert.strictEqual(rootSpan, rootSpans[0], "The root span should match what was passed in.");

    const urlPath = URLBuilder.parse(blobClient.url).getPath() || "";
    const expectedGraph: SpanGraph = {
      roots: [
        {
          name: rootSpan.name,
          children: [
            {
              name: "Azure.Storage.Blob.BlobClient-download",
              children: [
                {
                  name: urlPath,
                  children: []
                }
              ]
            }
          ]
        }
      ]
    };

    assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.context().traceId), expectedGraph);
    assert.strictEqual(tracer.getActiveSpans().length, 0, "All spans should have had end called");
  });

  it("exists returns true on an existing blob", async () => {
    const result = await blobClient.exists();
    assert.ok(result, "exists() should return true for an existing blob");
  });

  it("exists returns false on non-existing blob", async () => {
    const newBlobClient = containerClient.getBlobClient(recorder.getUniqueName("newblob"));
    const result = await newBlobClient.exists();
    assert.ok(result === false, "exists() should return true for an existing blob");
  });

  it("exists works with customer provided key", async () => {
    blobName = recorder.getUniqueName("blobCPK");
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length, {
      customerProvidedKey: Test_CPK_INFO
    });

    const metadata = { a: "a" };
    const smResp = await blobClient.setMetadata(metadata, {
      customerProvidedKey: Test_CPK_INFO
    });
    assert.equal(smResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    const result = await blobClient.exists({
      customerProvidedKey: Test_CPK_INFO
    });
    assert.ok(result, "exists() should return true");
  });

  it("exists re-throws error from getProperties", async () => {
    blobName = recorder.getUniqueName("blobCPK");
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length, {
      customerProvidedKey: Test_CPK_INFO
    });

    const metadata = { a: "a" };
    const smResp = await blobClient.setMetadata(metadata, {
      customerProvidedKey: Test_CPK_INFO
    });
    assert.equal(smResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    let exceptionCaught = false;
    try {
      await blobClient.exists();
    } catch (err) {
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });
});

describe("BlobClient - Verify Name Properties", () => {
  const accountName = "myaccount";
  const blobName = "blob/part/1.txt";
  const containerName = "containername";

  function verifyNameProperties(url: string) {
    const newClient = new BlobClient(url);
    assert.equal(
      newClient.containerName,
      containerName,
      "Container name is not the same as the one provided."
    );
    assert.equal(newClient.name, blobName, "Blob name is not the same as the one provided.");
    assert.equal(
      newClient.accountName,
      accountName,
      "Account name is not the same as the one provided."
    );
  }

  it("verify endpoint from the portal", async () => {
    verifyNameProperties(
      `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`
    );
  });

  it("verify IPv4 host address as Endpoint", async () => {
    verifyNameProperties(`https://192.0.0.10:1900/${accountName}/${containerName}/${blobName}`);
  });

  it("verify IPv6 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]:443/${accountName}/${containerName}/${blobName}`
    );
  });

  it("verify endpoint without dots", async () => {
    verifyNameProperties(`https://localhost:80/${accountName}/${containerName}/${blobName}`);
  });
});
