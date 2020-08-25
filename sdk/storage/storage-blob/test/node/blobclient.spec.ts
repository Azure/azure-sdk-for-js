import * as assert from "assert";
import * as dotenv from "dotenv";
import { readFileSync, unlinkSync } from "fs";
import { join } from "path";

import { AbortController } from "@azure/abort-controller";
import { isNode, TokenCredential } from "@azure/core-http";
import { delay, record } from "@azure/test-utils-recorder";

import {
  BlobClient,
  BlobSASPermissions,
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
  generateBlobSASQueryParameters,
  newPipeline,
  StorageSharedKeyCredential
} from "../../src";
import {
  bodyToString,
  createRandomLocalFile,
  getBSU,
  getConnectionStringFromEnvironment,
  recorderEnvSetup
} from "../utils";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { readStreamToLocalFileWithLogs } from "../utils/testutils.node";

dotenv.config();

describe("BlobClient Node.js only", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  const content = "Hello World";
  const tempFolderPath = "temp";

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
    await recorder.stop();
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
    assert.ok(result.versionId);

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

  it("query should work", async function() {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select * from BlobStorage");
    assert.deepStrictEqual(await bodyToString(response), csvContent);
  });

  it("query should work with access conditions", async function() {
    recorder.skip(undefined, "TODO: figure out why quick query do not work with recording");
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    const uploadResponse = await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select * from BlobStorage", {
      conditions: {
        ifModifiedSince: new Date("2010/01/01"),
        ifUnmodifiedSince: new Date("2100/01/01"),
        ifMatch: uploadResponse.etag,
        ifNoneMatch: "invalidetag"
      }
    });
    assert.deepStrictEqual(await bodyToString(response), csvContent);
  });

  it("query should not work with access conditions ifModifiedSince", async function() {
    recorder.skip(undefined, "TODO: figure out why quick query do not work with recording");
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    try {
      await blockBlobClient.query("select * from BlobStorage", {
        conditions: {
          ifModifiedSince: new Date("2100/01/01")
        }
      });
    } catch (err) {
      assert.deepStrictEqual(err.statusCode, 304);
      return;
    }
    assert.fail();
  });

  it("query should not work with access conditions leaseId", async function() {
    recorder.skip(undefined, "TODO: figure out why quick query do not work with recording");
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    try {
      await blockBlobClient.query("select * from BlobStorage", {
        conditions: {
          leaseId: "invalid"
        }
      });
    } catch (err) {
      assert.deepStrictEqual(err.statusCode, 400);
      return;
    }
    assert.fail();
  });

  it("query should work with snapshot", async function() {
    recorder.skip(undefined, "TODO: figure out why quick query do not work with recording");
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);
    const snapshotResponse = await blockBlobClient.createSnapshot();
    const blockBlobSnapshotClient = blockBlobClient.withSnapshot(snapshotResponse.snapshot!);

    const response = await blockBlobSnapshotClient.query("select * from BlobStorage");
    assert.deepStrictEqual(await bodyToString(response), csvContent);
  });

  it("query should work with where conditionals", async function() {
    recorder.skip(undefined, "TODO: figure out why quick query do not work with recording");
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select _2 from BlobStorage where _1 > 100");
    assert.deepStrictEqual(await bodyToString(response), "250\n");
  });

  it("query should work with empty results", async function() {
    recorder.skip(undefined, "TODO: figure out why quick query do not work with recording");
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select _2 from BlobStorage where _1 > 200");

    assert.deepStrictEqual(await bodyToString(response), "");
  });

  it("query should work with blob properties", async function() {
    recorder.skip(undefined, "TODO: figure out why quick query do not work with recording");
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select * from BlobStorage");
    assert.deepStrictEqual(response.contentType, "avro/binary");
    assert.deepStrictEqual(typeof response.etag, "string");
    assert.deepStrictEqual(response.blobType, "BlockBlob");
    assert.deepStrictEqual(response.leaseState, "available");
    assert.deepStrictEqual(response.leaseStatus, "unlocked");
    assert.deepStrictEqual(response.acceptRanges, "bytes");
    assert.deepStrictEqual(typeof response.clientRequestId, "string");
    assert.deepStrictEqual(typeof response.requestId, "string");
    assert.deepStrictEqual(typeof response.version, "string");
    assert.deepStrictEqual(typeof response.date, "object");
  });

  it("query should work with large file", async function() {
    recorder.skip(undefined, "TODO: figure out why quick query do not work with recording");
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const csvContentUnit = "100,200,300,400\n150,250,350,450\n";
    const tempFileLarge = await createRandomLocalFile(
      tempFolderPath,
      1024 * 1024,
      Buffer.from(csvContentUnit)
    );
    await blockBlobClient.uploadFile(tempFileLarge);

    const response = await blockBlobClient.query("select * from BlobStorage");

    const downloadedFile = join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFileWithLogs(response.readableStreamBody!, downloadedFile);

    const downloadedData = await readFileSync(downloadedFile);
    const uploadedData = await readFileSync(tempFileLarge);

    unlinkSync(downloadedFile);
    unlinkSync(tempFileLarge);

    assert.ok(downloadedData.equals(uploadedData));
  });

  it("query should work with aborter", async function() {
    recorder.skip(undefined, "TODO: figure out why quick query do not work with recording");
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const csvContentUnit = "100,200,300,400\n150,250,350,450\n";
    const tempFileLarge = await createRandomLocalFile(
      tempFolderPath,
      1024 * 256 * 2,
      Buffer.from(csvContentUnit)
    );
    await blockBlobClient.uploadFile(tempFileLarge);

    const aborter = new AbortController();
    const response = await blockBlobClient.query("select * from BlobStorage", {
      abortSignal: aborter.signal,
      onProgress: () => {
        // Abort parse when first progress event trigger (by default 4MB)
        aborter.abort();
      }
    });

    const downloadedFile = join(tempFolderPath, recorder.getUniqueName("downloadfile."));

    try {
      await readStreamToLocalFileWithLogs(response.readableStreamBody!, downloadedFile);
    } catch (error) {
      // TODO: Avor reader should abort reading from internal stream
      assert.deepStrictEqual(error.name, "AbortError");
      unlinkSync(downloadedFile);
      unlinkSync(tempFileLarge);
      return;
    }

    unlinkSync(downloadedFile);
    unlinkSync(tempFileLarge);
    assert.fail();
  });

  it("query should work with progress event", async function() {
    recorder.skip(undefined, "TODO: figure out why quick query do not work with recording");
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    await new Promise((resolve, reject) => {
      blockBlobClient
        .query("select * from BlobStorage", {
          onProgress: (progress) => {
            assert.deepStrictEqual(progress.loadedBytes, csvContent.length);
            resolve();
          }
        })
        .then((response) => {
          return bodyToString(response);
        })
        .then((_data) => {})
        .catch(reject);
    });
  });

  it("query should work with fatal error event", async function() {
    recorder.skip(undefined, "TODO: figure out why quick query do not work with recording");
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select * from BlobStorage", {
      inputTextConfiguration: {
        kind: "json",
        recordSeparator: "\n"
      },
      onError: (err) => {
        assert.deepStrictEqual(err.isFatal, true);
        assert.deepStrictEqual(err.name, "ParseError");
        assert.deepStrictEqual(err.position, 0);
        assert.deepStrictEqual(
          err.description,
          "Unexpected token ',' at [byte: 3]. Expecting tokens '{', or '['."
        );
        return;
      }
    });
    assert.deepStrictEqual(await bodyToString(response), "\n");
  });

  it("query should work with non fatal error event", async function() {
    recorder.skip(undefined, "TODO: figure out why quick query do not work with recording");
    const csvContent = "100,hello,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select _2 from BlobStorage where _2 > 100", {
      onError: (err) => {
        assert.deepStrictEqual(err.isFatal, false);
        assert.deepStrictEqual(err.name, "InvalidTypeConversion");
        assert.deepStrictEqual(err.position, 0);
        assert.deepStrictEqual(err.description, "Invalid type conversion.");
        return;
      }
    });
    assert.deepStrictEqual(await bodyToString(response), "250\n");
  });

  it("query should work with CSV input and output configurations", async function() {
    recorder.skip(undefined, "TODO: figure out why quick query do not work with recording");
    const csvContent = "100.200.300.400!150.250.350.450!180.280.380.480!";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select _1 from BlobStorage", {
      inputTextConfiguration: {
        kind: "csv",
        recordSeparator: "!",
        columnSeparator: ".",
        // escapeCharacter: "\\", // What does this do?
        // fieldQuote: '"', // What does this do?
        hasHeaders: true
      },
      outputTextConfiguration: {
        kind: "csv",
        recordSeparator: "!",
        columnSeparator: ".",
        // escapeCharacter: "\\",
        // fieldQuote: '"',
        hasHeaders: false
      }
    });
    assert.deepStrictEqual(await bodyToString(response), "150!180!");
  });

  it("query should work with JSON input and output configurations", async function() {
    recorder.skip(undefined, "TODO: figure out why quick query do not work with recording");
    const recordSeparator = "\n";
    const jsonContent =
      [
        JSON.stringify({ _1: "100", _2: "200", _3: "300", _4: "400" }),
        JSON.stringify({ _1: "150", _2: "250", _3: "350", _4: "450" }),
        JSON.stringify({ _1: "180", _2: "280", _3: "380", _4: "480" })
      ].join(recordSeparator) + recordSeparator;
    await blockBlobClient.upload(jsonContent, jsonContent.length);

    const response = await blockBlobClient.query("select * from BlobStorage", {
      inputTextConfiguration: {
        kind: "json",
        recordSeparator
      },
      outputTextConfiguration: {
        kind: "json",
        recordSeparator
      }
    });
    assert.deepStrictEqual(await bodyToString(response), jsonContent);
  });
});
