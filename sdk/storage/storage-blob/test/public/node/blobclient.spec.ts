// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import { readFile, unlink } from "node:fs/promises";
import {
  bodyToString,
  createRandomLocalFile,
  readStreamToLocalFileWithLogs,
} from "./utils/utils.js";
import { delay, isLiveMode, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import {
  BlobSASPermissions,
  type BlockBlobClient,
  type ContainerClient,
} from "@azure/storage-blob";
import type { BlobClient, BlobServiceClient } from "@azure/storage-blob";
import { describe, it, assert, beforeEach, afterEach, expect } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";
import { createBlobClient, createBlobServiceClient } from "./utils/clients.js";
import { getUniqueName, shouldRunObjectReplicationTests } from "../utils/utils.js";
import {
  getAccountKey,
  getAccountSas,
  getCustomerProvidedKey,
  getOrDestContainerName,
  getOrSourceContainerName,
  getStorageConnectionString,
  getStorageConnectionStringWithSas,
} from "../../utils/injectables.js";
import { assertDestReplicationProps, assertSrcReplicationProps } from "../utils/assert.js";
import { buffer } from "node:stream/consumers";
import { isRestError } from "@azure/core-rest-pipeline";

expect.extend({ toSupportTracing });

describe("BlobClient", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  const content = "Hello World";
  const tempFolderPath = "temp";
  const customerProvidedKey = getCustomerProvidedKey();

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    blobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    containerName = getUniqueName("container", { recorder });
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = getUniqueName("blob", { recorder });
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it.runIf(getStorageConnectionString())(
    "throws error if constructor blobName parameter is empty",
    async () => {
      try {
        await createBlobClient("AccountConnectionString", {
          recorder,
          containerName,
          blobName: "",
        });
        assert.fail("Expecting an thrown error but didn't get one.");
      } catch (error: any) {
        assert.equal(
          error.message,
          "Expecting non-empty strings for containerName and blobName parameters",
          "Error message is different than expected.",
        );
      }
    },
  );

  it.runIf(getStorageConnectionString())(
    "throws error if constructor containerName parameter is empty",
    async () => {
      try {
        await createBlobClient("AccountConnectionString", {
          recorder,
          containerName: "",
          blobName,
        });
        assert.fail("Expecting an thrown error but didn't get one.");
      } catch (error: any) {
        assert.equal(
          error.message,
          "Expecting non-empty strings for containerName and blobName parameters",
          "Error message is different than expected.",
        );
      }
    },
  );

  it.runIf(getStorageConnectionStringWithSas())(
    "can be created with a sas connection string",
    async () => {
      const newClient = await createBlobClient("SASConnectionString", {
        recorder,
        containerName,
        blobName,
      });
      assert.isDefined(newClient);
      const metadata = {
        a: "a",
        b: "b",
      };
      await newClient.setMetadata(metadata);
      const result = await newClient.getProperties();
      assert.deepStrictEqual(result.metadata, metadata);
    },
  );

  it.runIf(getAccountSas())(
    "syncCopyFromURL - source SAS and destination bearer token",
    async () => {
      const newBlobName = getUniqueName("copiedblob", { recorder });
      const tokenBlobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
      const tokenNewBlobClient = tokenBlobServiceClient
        .getContainerClient(containerName)
        .getAppendBlobClient(newBlobName);
      const newBlobClient = containerClient.getBlobClient(newBlobName);

      const copyURL = blobClient.url + "?" + getAccountSas();
      const result = await tokenNewBlobClient.syncCopyFromURL(copyURL);
      assert.ok(result.copyId);

      const properties1 = await blobClient.getProperties();
      const properties2 = await newBlobClient.getProperties();
      assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
      assert.deepStrictEqual(properties2.copyId, result.copyId);
    },
  );

  it.runIf(getStorageConnectionString())("can be created with a connection string", async () => {
    const newClient = await createBlobClient("AccountConnectionString", {
      recorder,
      containerName,
      blobName,
    });
    assert.isDefined(newClient);
    const metadata = {
      a: "a",
      b: "b",
    };
    await newClient.setMetadata(metadata);
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it.runIf(getStorageConnectionString())(
    "can be created with a connection string and an option bag",
    async () => {
      const newClient = await createBlobClient("AccountConnectionString", {
        recorder,
        containerName,
        blobName,
        options: {
          retryOptions: { maxTries: 5 },
        },
      });
      if (!newClient) {
        assert.fail("Failed to create BlobClient");
      }
      const metadata = {
        a: "a",
        b: "b",
      };
      await newClient.setMetadata(metadata);
      const result = await newClient.getProperties();
      assert.deepStrictEqual(result.metadata, metadata);
    },
  );

  it("query should work", async () => {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select * from BlobStorage");
    assert.deepStrictEqual(await bodyToString(response), csvContent);
  });

  it("query should work with conditional tags", async () => {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length, { tags: { tag: "val" } });

    let exceptionCaught = false;
    try {
      await blockBlobClient.query("select * from BlobStorage", {
        conditions: { tagConditions: "tag = 'val1'" },
      });
    } catch (e: any) {
      assert.equal(e.details?.errorCode, "ConditionNotMet");
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);

    const response = await blockBlobClient.query("select * from BlobStorage", {
      conditions: { tagConditions: "tag = 'val'" },
    });
    assert.deepStrictEqual(await bodyToString(response), csvContent);
  });

  it("query should work with access conditions", async () => {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    const uploadResponse = await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select * from BlobStorage", {
      conditions: {
        ifModifiedSince: new Date(Date.UTC(2010, 0, 1)),
        ifUnmodifiedSince: new Date(Date.UTC(2100, 0, 1)),
        ifMatch: uploadResponse.etag,
        ifNoneMatch: "invalidetag",
      },
    });
    assert.deepStrictEqual(await bodyToString(response), csvContent);
  });

  it("query should not work with access conditions ifModifiedSince", async () => {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    try {
      await blockBlobClient.query("select * from BlobStorage", {
        conditions: {
          ifModifiedSince: new Date(Date.UTC(2100, 0, 1)),
        },
      });
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.deepStrictEqual(err.statusCode, 304);
      return;
    }
    assert.fail();
  });

  it("query should not work with access conditions leaseId", async () => {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    try {
      await blockBlobClient.query("select * from BlobStorage", {
        conditions: {
          leaseId: "invalid",
        },
      });
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.deepStrictEqual(err.statusCode, 400);
      return;
    }
    assert.fail();
  });

  it("query should work with snapshot", async () => {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);
    const snapshotResponse = await blockBlobClient.createSnapshot();
    const blockBlobSnapshotClient = blockBlobClient.withSnapshot(snapshotResponse.snapshot!);

    const response = await blockBlobSnapshotClient.query("select * from BlobStorage");
    assert.deepStrictEqual(await bodyToString(response), csvContent);
  });

  it("query should work with where conditionals", async () => {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select _2 from BlobStorage where _1 > 100");
    assert.deepStrictEqual(await bodyToString(response), "250\n");
  });

  it("query should work with empty results", async () => {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select _2 from BlobStorage where _1 > 200");

    assert.deepStrictEqual(await bodyToString(response), "");
  });

  it("query should work with blob properties", async () => {
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
    // don't want this to hang
    response.readableStreamBody?.resume();
  });

  it("query should work with progress event", async () => {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    await new Promise<void>((resolve, reject) => {
      blockBlobClient
        .query("select * from BlobStorage", {
          onProgress: (progress) => {
            assert.deepStrictEqual(progress.loadedBytes, csvContent.length);
            resolve();
          },
        })
        .then((response) => {
          return bodyToString(response);
        })
        .then((_data) => {
          return;
        })
        .catch(reject);
    });
  });

  it("query should work with fatal error event", async () => {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select * from BlobStorage", {
      inputTextConfiguration: {
        kind: "json",
        recordSeparator: "\n",
      },
      onError: (err) => {
        assert.deepStrictEqual(err.isFatal, true);
        assert.deepStrictEqual(err.name, "ParseError");
        assert.deepStrictEqual(err.position, 0);
        assert.ok(
          err.description.startsWith(
            "Unexpected token ',' at [byte: 3]. Expecting tokens '{', or '['.",
          ),
        );
        return;
      },
    });
    assert.deepStrictEqual(await bodyToString(response), "\n");
  });

  it("query should work with non fatal error event", async () => {
    const csvContent = "100,hello,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select _2 from BlobStorage where _2 > 100", {
      onError: (err) => {
        assert.deepStrictEqual(err.isFatal, false);
        assert.deepStrictEqual(err.name, "InvalidTypeConversion");
        assert.deepStrictEqual(err.position, 0);
        assert.deepStrictEqual(err.description, "Invalid type conversion.");
        return;
      },
    });
    assert.deepStrictEqual(await bodyToString(response), "250\n");
  });

  it("query should work with CSV input and output configurations", async () => {
    const csvContent = "100.200.300.400!150.250.350.450!180.280.380.480!";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select _1 from BlobStorage", {
      inputTextConfiguration: {
        kind: "csv",
        recordSeparator: "!",
        columnSeparator: ".",
        // escapeCharacter: "\\", // What does this do?
        // fieldQuote: '"', // What does this do?
        hasHeaders: true,
      },
      outputTextConfiguration: {
        kind: "csv",
        recordSeparator: "!",
        columnSeparator: ".",
        // escapeCharacter: "\\",
        // fieldQuote: '"',
        hasHeaders: false,
      },
    });
    assert.deepStrictEqual(await bodyToString(response), "150!180!");
  });

  it("query should work with JSON input and output configurations", async () => {
    const recordSeparator = "\n";
    const jsonContent =
      [
        JSON.stringify({ _1: "100", _2: "200", _3: "300", _4: "400" }),
        JSON.stringify({ _1: "150", _2: "250", _3: "350", _4: "450" }),
        JSON.stringify({ _1: "180", _2: "280", _3: "380", _4: "480" }),
      ].join(recordSeparator) + recordSeparator;
    await blockBlobClient.upload(jsonContent, jsonContent.length);

    const response = await blockBlobClient.query("select * from BlobStorage", {
      inputTextConfiguration: {
        kind: "json",
        recordSeparator,
      },
      outputTextConfiguration: {
        kind: "json",
        recordSeparator,
      },
    });
    assert.deepStrictEqual(await bodyToString(response), jsonContent);
  });

  it("query should work with arrow output configurations for timestamp[ms]", async () => {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select * from BlobStorage", {
      outputTextConfiguration: {
        kind: "arrow",
        schema: [
          {
            type: "timestamp[ms]",
          },
        ],
      },
    });
    await bodyToString(response);
  });

  it("query with CPK", async () => {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length, {
      customerProvidedKey,
    });

    const response = await blockBlobClient.query("select * from BlobStorage", {
      customerProvidedKey,
    });
    assert.deepStrictEqual(await bodyToString(response), csvContent);
  });

  it("upload blob with cold tier should work", async () => {
    const newBlobClient = containerClient.getBlockBlobClient(
      getUniqueName("coldtierblob", { recorder }),
    );

    await newBlobClient.upload(content, content.length, {
      tier: "Cold",
    });

    const result = await newBlobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, content.length), content);

    const properties = await newBlobClient.getProperties();
    assert.ok(properties.accessTier);
    assert.equal(properties.accessTier!, "Cold");
  });

  it.runIf(isLiveMode())("query should work with large file", async () => {
    const csvContentUnit = "100,200,300,400\n150,250,350,450\n";
    const tempFileLarge = await createRandomLocalFile(
      tempFolderPath,
      1024 * 1024,
      Buffer.from(csvContentUnit),
    );
    await blockBlobClient.uploadFile(tempFileLarge);

    const response = await blockBlobClient.query("select * from BlobStorage");

    const downloadedFile = path.join(tempFolderPath, getUniqueName("downloadfile.", { recorder }));
    await readStreamToLocalFileWithLogs(response.readableStreamBody!, downloadedFile);

    const downloadedData = await readFile(downloadedFile);
    const uploadedData = await readFile(tempFileLarge);

    await unlink(downloadedFile);
    await unlink(tempFileLarge);

    assert.ok(downloadedData.equals(uploadedData));
  });

  it.runIf(isLiveMode())("query should work with aborter", async () => {
    const csvContentUnit = "100,200,300,400\n150,250,350,450\n";
    const tempFileLarge = await createRandomLocalFile(
      tempFolderPath,
      1024 * 256 * 2,
      Buffer.from(csvContentUnit),
    );
    await blockBlobClient.uploadFile(tempFileLarge);

    const aborter = new AbortController();
    const response = await blockBlobClient.query("select * from BlobStorage", {
      abortSignal: aborter.signal,
      onProgress: () => {
        // Abort parse when first progress event trigger (by default 4MB)
        aborter.abort();
      },
    });

    const downloadedFile = path.join(tempFolderPath, getUniqueName("downloadfile.", { recorder }));

    const stream = response.readableStreamBody;
    if (!stream) {
      assert.fail("Expected readableStreamBody to be present");
    }

    try {
      await readStreamToLocalFileWithLogs(stream, downloadedFile);
    } catch (error: any) {
      assert.deepStrictEqual(error.name, "AbortError");
      await unlink(downloadedFile);
      await unlink(tempFileLarge);
      return;
    }

    await unlink(downloadedFile);
    await unlink(tempFileLarge);
    assert.fail();
  });

  it("query should work with arrow output configurations", async () => {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select * from BlobStorage", {
      outputTextConfiguration: {
        kind: "arrow",
        schema: [
          {
            type: "decimal",
            name: "name",
            precision: 4,
            scale: 2,
          },
        ],
      },
    });
    const stream = response.readableStreamBody;
    if (!stream) {
      assert.fail("Expected readableStreamBody to be present");
    }
    assert.equal(
      (await buffer(stream)).toString("hex"),
      "ffffffff800000001000000000000a000c000600050008000a000000000104000c000000080008000000040008000000040000000100000014000000100014000800060007000c0000001000100000000000010710000000200000000400000000000000040000006e616d650000000008000c000400080008000000040000000200000000000000ffffffff700000001000000000000a000e000600050008000a000000000304001000000000000a000c000000040008000a0000003000000004000000020000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000",
    );
  });

  // Enable the case when STG78 - version 2020-10-02 features is enabled in production.
  it.skip("query should work with Parquet input configuration", async function () {
    const parquetFilePath = path.join("test", "resources", "parquet.parquet");
    await blockBlobClient.uploadFile(parquetFilePath);

    const response = await blockBlobClient.query("select * from blobstorage where id < 1;", {
      inputTextConfiguration: {
        kind: "parquet",
      },
    });

    assert.deepStrictEqual(await bodyToString(response), "0,mdifjt55.ea3,mdifjt55.ea3\n");
  });

  it.runIf(getAccountKey())(
    "syncCopyFromURL - should fail with copy source error message",
    async function () {
      const keyClient = await createBlobClient("AccountKey", { recorder, containerName, blobName });
      assert.isDefined(keyClient);
      const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
      tmr.setDate(tmr.getDate() + 1);

      const newBlobClient = containerClient.getBlockBlobClient(
        getUniqueName("copiedblob", { recorder }),
      );

      const sourceUrl = await keyClient.generateSasUrl({
        permissions: BlobSASPermissions.parse("d"),
        expiresOn: tmr,
      });

      try {
        await newBlobClient.syncCopyFromURL(sourceUrl);
      } catch (err) {
        if (!isRestError(err)) {
          throw err;
        }
        assert.deepEqual(err.code, "CannotVerifyCopySource");
        assert.equal((err.details as any).copySourceStatusCode, 403);
        assert.deepEqual(
          (err.details as any).copySourceErrorCode,
          "AuthorizationPermissionMismatch",
        );
        assert.deepEqual(
          (err.details as any).copySourceErrorMessage,
          "This request is not authorized to perform this operation using this permission.",
        );
      }
    },
  );
});

describe.runIf(
  shouldRunObjectReplicationTests() && getOrSourceContainerName() && getOrDestContainerName(),
)("BlobClient - Object Replication", () => {
  const srcContainerName = getOrSourceContainerName();
  const destContainerName = getOrDestContainerName();
  assert.isDefined(srcContainerName);
  assert.isDefined(destContainerName);
  const blobName = "orsBlob";

  let srcBlobServiceClient: BlobServiceClient;
  let destBlobServiceClient: BlobServiceClient;
  let srcContainerClient: ContainerClient;
  let destContainerClient: ContainerClient;
  let srcBlobClient: BlobClient;
  let destBlobClient: BlobClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    srcBlobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    destBlobServiceClient = await createBlobServiceClient("TokenCredential", {
      recorder,
      account: "objectReplication",
    });
    srcContainerClient = srcBlobServiceClient.getContainerClient(srcContainerName);
    destContainerClient = destBlobServiceClient.getContainerClient(destContainerName);
    srcBlobClient = srcContainerClient.getBlobClient(blobName);
    destBlobClient = destContainerClient.getBlobClient(blobName);

    // Ensure the source blob exists; create it if missing to trigger replication.
    if (!isPlaybackMode()) {
      try {
        await srcBlobClient.getProperties();
      } catch (e: any) {
        if (e?.statusCode === 404) {
          const bb = srcBlobClient.getBlockBlobClient();
          const body = Buffer.from("object-replication-test");
          await bb.upload(body, body.length);
        } else {
          throw e;
        }
      }

      while (true) {
        try {
          console.log("Waiting for blob replication...");
          await delay(30000);
          await destBlobClient.getProperties();
          break;
        } catch (e: any) {
          if (e?.statusCode === 404) {
            await delay(3000);
            continue;
          }
          throw e;
        }
      }
    }
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("download to file", async function () {
    const srcDownloadedFilePath = getUniqueName("srcdownloadedfile", { recorder });
    const srcRes = await srcBlobClient.downloadToFile(srcDownloadedFilePath);
    assertSrcReplicationProps(srcRes);
    await unlink(srcDownloadedFilePath);

    const dstDownloadedFilePath = getUniqueName("dstdownloadedfile", { recorder });
    const destRes = await destBlobClient.downloadToFile(dstDownloadedFilePath);
    assertDestReplicationProps(destRes);
    await unlink(dstDownloadedFilePath);
  });
});
