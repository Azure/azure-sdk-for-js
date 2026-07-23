// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  base64encode,
  bodyToString,
  configureBlobStorageClient,
  getBSU,
  getGenericBSU,
  getRecorderUniqueVariable,
  getSASConnectionStringFromEnvironment,
  getUniqueName,
  isSuperSet,
  recorderEnvSetup,
  uriSanitizers,
} from "./utils/index.js";
import { delay, Recorder } from "@azure-tools/test-recorder";
import { getYieldedValue } from "@azure-tools/test-utils-vitest";
import type {
  ContainerListBlobHierarchySegmentResponse,
  BlobItem,
  BlobServiceClient,
  BlockBlobClient,
  BlobHTTPHeaders,
} from "../src/index.js";
import { ContainerClient, BlockBlobTier, StorageResponseFormat } from "../src/index.js";
import { Test_CPK_INFO } from "./utils/fakeTestSecrets.js";
import type { Tags } from "../src/models.js";
import { describe, it, assert, beforeEach, afterEach, expect } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";
import type { OperationOptions } from "@azure/core-client";
import type {
  Pipeline,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

expect.extend({ toSupportTracing });

describe("ContainerClient", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        uriSanitizers,
        removeHeaderSanitizer: {
          headersForRemoval: ["x-ms-encryption-key"],
        },
      },
      ["playback", "record"],
    );
    blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb",
    };
    await containerClient.setMetadata(metadata);

    const result = await containerClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("getProperties", async () => {
    const result = await containerClient.getProperties();
    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isUndefined(result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
    assert.isUndefined(result.blobPublicAccess);
    assert.isDefined(result.clientRequestId); // As default pipeline involves UniqueRequestIDPolicy
  });

  it("createIfNotExists", async () => {
    const res = await containerClient.createIfNotExists();
    assert.equal(res.succeeded, false);
    assert.equal(res.errorCode, "ContainerAlreadyExists");

    const containerName2 = recorder.variable("container2", getUniqueName("container2"));
    const containerClient2 = blobServiceClient.getContainerClient(containerName2);
    const res2 = await containerClient2.createIfNotExists();
    assert.equal(res2.succeeded, true);
    assert.isDefined(res2.etag);

    await containerClient2.delete();
  });

  it("deleteIfExists", async () => {
    const containerName2 = recorder.variable("container2", getUniqueName("container2"));
    const containerClient2 = blobServiceClient.getContainerClient(containerName2);
    await containerClient2.create();
    const res = await containerClient2.deleteIfExists();
    assert.isTrue(res.succeeded);

    const containerName3 = recorder.variable("container3", getUniqueName("container3"));
    const containerClient3 = blobServiceClient.getContainerClient(containerName3);
    const res2 = await containerClient3.deleteIfExists();
    assert.isFalse(res2.succeeded);
    assert.equal(res2.errorCode, "ContainerNotFound");
  });

  it("create with default parameters", () => {
    // create() with default parameters has been tested in beforeEach
  });

  it("create with all parameters configured", async () => {
    const cClient = blobServiceClient.getContainerClient(
      recorder.variable(containerName, getUniqueName(containerName)),
    );
    const metadata = { key: "value" };
    const access = "container";
    await cClient.create({ metadata, access });
    const result = await cClient.getProperties();
    assert.deepEqual(result.blobPublicAccess, access);
    assert.deepEqual(result.metadata, metadata);
  });

  it("delete", () => {
    // delete() with default parameters has been tested in afterEach
  });

  it("listBlobsFlat with default parameters", async () => {
    const blobClients = [];
    for (let i = 0; i < 3; i++) {
      const blobClient = containerClient.getBlobClient(
        getRecorderUniqueVariable(recorder, `blockblob/${i}`),
      );
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0);
      blobClients.push(blobClient);
    }

    const result = (await containerClient.listBlobsFlat().byPage().next()).value;
    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(containerClient.url.indexOf(result.containerName), -1);
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.blobItems!.length, blobClients.length);
    assert.notStrictEqual(blobClients[0].url.indexOf(result.segment.blobItems![0].name), -1);

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("listBlobsFlat to list uncommitted blobs", async () => {
    const blobClients = [];
    for (let i = 0; i < 3; i++) {
      const blobClient = containerClient.getBlobClient(
        getRecorderUniqueVariable(recorder, `blockblob/${i}`),
      );
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.stageBlock(base64encode("1"), "Hello", 5);
      blobClients.push(blobClient);
    }

    const result = (
      await containerClient
        .listBlobsFlat({
          includeUncommitedBlobs: true,
        })
        .byPage()
        .next()
    ).value;
    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(containerClient.url.indexOf(result.containerName), -1);
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.blobItems!.length, blobClients.length);
    assert.notStrictEqual(blobClients[0].url.indexOf(result.segment.blobItems![0].name), -1);
    assert.isUndefined(result.segment.blobItems![0].properties.contentMD5);

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("listBlobsFlat with special chars", async () => {
    const blobName = "dir1/dir2/file\uFFFF.blob";
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload("", 0);

    const iteratorResult = await containerClient.listBlobsFlat().byPage().next();
    assert.isFalse(iteratorResult.done);
    if (!iteratorResult.done) {
      const result = iteratorResult.value;
      assert.isAbove(result.serviceEndpoint.length, 0);
      assert.notStrictEqual(containerClient.url.indexOf(result.containerName), -1);
      assert.deepStrictEqual(result.continuationToken, "");
      assert.deepStrictEqual(result.segment.blobItems.length, 1);
      assert.equal(blobName, result.segment.blobItems[0].name);
    }
  });

  it("listBlobsFlat with default parameters - null prefix shouldn't throw error", async () => {
    const blobClients = [];
    for (let i = 0; i < 3; i++) {
      const blobClient = containerClient.getBlobClient(
        getRecorderUniqueVariable(recorder, `blockblob/${i}`),
      );
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0);
      blobClients.push(blobClient);
    }

    const result = (await containerClient.listBlobsFlat({ prefix: "" }).byPage().next()).value;
    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(containerClient.url.indexOf(result.containerName), -1);
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.blobItems!.length, blobClients.length);
    assert.notStrictEqual(blobClients[0].url.indexOf(result.segment.blobItems![0].name), -1);

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("listBlobsFlat with all parameters configured", async () => {
    const blobClients = [];
    const prefix = "blockblob";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 2; i++) {
      const blobClient = containerClient.getBlobClient(
        getRecorderUniqueVariable(recorder, `${prefix}/${i}`),
      );
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0, {
        metadata: metadata,
        tier: BlockBlobTier.Cool,
      });
      blobClients.push(blobClient);
    }

    const result = (
      await containerClient
        .listBlobsFlat({
          includeCopy: true,
          includeDeleted: true,
          includeMetadata: true,
          includeSnapshots: true,
          includeUncommitedBlobs: true,
          prefix,
        })
        .byPage({ maxPageSize: 1 })
        .next()
    ).value;

    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(containerClient.url.indexOf(result.containerName), -1);
    assert.deepStrictEqual(result.segment.blobItems!.length, 1);
    assert.notStrictEqual(blobClients[0].url.indexOf(result.segment.blobItems![0].name), -1);
    assert.isTrue(isSuperSet(result.segment.blobItems![0].metadata, metadata));
    assert.equal(result.segment.blobItems![0].properties.accessTier, BlockBlobTier.Cool);

    const result2 = (
      await containerClient
        .listBlobsFlat({
          includeCopy: true,
          includeDeleted: true,
          includeMetadata: true,
          includeSnapshots: true,
          includeUncommitedBlobs: true,
          prefix,
        })
        .byPage({ continuationToken: result.continuationToken, maxPageSize: 2 })
        .next()
    ).value;

    assert.isAbove(result2.serviceEndpoint.length, 0);
    assert.notStrictEqual(containerClient.url.indexOf(result2.containerName), -1);
    assert.deepStrictEqual(result2.segment.blobItems!.length, 1);
    assert.notStrictEqual(blobClients[1].url.indexOf(result2.segment.blobItems![0].name), -1);
    assert.isTrue(isSuperSet(result2.segment.blobItems![0].metadata, metadata));
    assert.equal(result2.segment.blobItems![0].properties.accessTier, BlockBlobTier.Cool);

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("listBlobsFlat with includeDeletedwithVersions", async () => {
    const blockBlobName = recorder.variable("blockblob", getUniqueName("blockblob"));
    const blobClient = containerClient.getBlobClient(blockBlobName);
    const blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload("", 0);

    await blobClient.delete();

    const result = (
      await containerClient
        .listBlobsFlat({
          includeDeletedWithVersions: true,
        })
        .byPage()
        .next()
    ).value;
    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(containerClient.url.indexOf(result.containerName), -1);
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.blobItems!.length, 1);
    assert.deepStrictEqual(result.segment.blobItems![0].name, blockBlobName);
    assert.isDefined(result.segment.blobItems![0].hasVersionsOnly);
  });

  it("listBlobFlat with blobs encrypted with CPK", async () => {
    const blobURLs = [];
    const prefix = "blockblob";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 2; i++) {
      const blobClient = containerClient.getBlobClient(
        getRecorderUniqueVariable(recorder, `${prefix}/${i}`),
      );
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0, {
        metadata: metadata,
        customerProvidedKey: Test_CPK_INFO,
      });
      blobURLs.push(blobClient);
    }

    const result = (
      await containerClient
        .listBlobsFlat({
          includeCopy: true,
          includeDeleted: true,
          includeMetadata: true,
          includeSnapshots: true,
          includeUncommitedBlobs: true,
          prefix,
        })
        .byPage({ maxPageSize: 1 })
        .next()
    ).value;

    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(containerClient.url.indexOf(result.containerName), -1);
    assert.deepStrictEqual(result.segment.blobItems!.length, 1);
    assert.notStrictEqual(blobURLs[0].url.indexOf(result.segment.blobItems![0].name), -1);
  });

  it("listBlobsFlat with startFrom", async () => {
    const blobClients = [];
    let startFrom = "";
    for (let i = 0; i < 3; i++) {
      const blobName = getRecorderUniqueVariable(recorder, `blockblob/${i}`);
      if (i === 1) {
        startFrom = blobName;
      }
      const blobClient = containerClient.getBlobClient(blobName);

      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0);
      blobClients.push(blobClient);
    }

    const result = (
      await containerClient
        .listBlobsFlat({
          startFrom: startFrom,
        })
        .byPage()
        .next()
    ).value;
    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(containerClient.url.indexOf(result.containerName));
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.blobItems!.length, blobClients.length - 1);
    assert.ok(blobClients[1].url.indexOf(result.segment.blobItems![0].name));

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator(byPage() - continuationToken) for listBlobsFlat with startFrom", async () => {
    const blobClients = [];
    const prefix = "blockblob";
    let startFrom = "";
    for (let i = 0; i < 5; i++) {
      const blobName = getRecorderUniqueVariable(recorder, `${prefix}/${i}`);
      if (i === 1) {
        startFrom = blobName;
      }
      const blobClient = containerClient.getBlobClient(blobName);
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0);
      blobClients.push(blobClient);
    }

    let i = 1;
    let iter = containerClient
      .listBlobsFlat({
        startFrom: startFrom,
      })
      .byPage({ maxPageSize: 2 });
    let response = (await iter.next()).value;
    for (const blob of response.segment.blobItems) {
      assert.ok(blobClients[i].url.indexOf(blob.name));
      i++;
    }
    // Gets next marker
    const marker = response.continuationToken;
    // Passing next marker as continuationToken
    iter = containerClient.listBlobsFlat().byPage({ continuationToken: marker, maxPageSize: 2 });
    response = (await iter.next()).value;
    // Gets 2 blobs
    for (const blob of response.segment.blobItems) {
      assert.ok(blobClients[i].url.indexOf(blob.name));
      i++;
    }

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("listBlobsFlat with startFrom with special char", async () => {
    const blobClients = [];

    const dirName = "first_dir\uFFFF/";
    let startFrom = "";
    for (let i = 0; i < 3; i++) {
      const blobName = getRecorderUniqueVariable(recorder, `${dirName}/${i}`);
      if (i === 1) {
        startFrom = blobName;
      }
      const blobClient = containerClient.getBlobClient(blobName);

      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0);
      blobClients.push(blobClient);
    }

    const result = (
      await containerClient
        .listBlobsFlat({
          startFrom: startFrom,
        })
        .byPage()
        .next()
    ).value;
    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(containerClient.url.indexOf(result.containerName));
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.blobItems!.length, blobClients.length - 1);
    assert.ok(blobClients[1].url.indexOf(result.segment.blobItems![0].name));

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator for listBlobsFlat", async () => {
    const blobClients = [];
    const prefix = "blockblob";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 4; i++) {
      const blobClient = containerClient.getBlobClient(
        getRecorderUniqueVariable(recorder, `${prefix}/${i}`),
      );
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0, {
        metadata,
      });
      blobClients.push(blobClient);
    }

    let i = 0;
    for await (const blob of containerClient.listBlobsFlat({
      includeCopy: true,
      includeDeleted: true,
      includeMetadata: true,
      includeSnapshots: true,
      includeUncommitedBlobs: true,
      prefix,
    })) {
      assert.notStrictEqual(blobClients[i].url.indexOf(blob.name), -1);
      assert.isTrue(isSuperSet(blob.metadata, metadata));
      i++;
    }

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator(generator .next() syntax) for listBlobsFlat", async () => {
    const blobClients = [];
    const prefix = "blockblob";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 2; i++) {
      const blobClient = containerClient.getBlobClient(
        getRecorderUniqueVariable(recorder, `${prefix}/${i}`),
      );
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0, {
        metadata,
      });
      blobClients.push(blobClient);
    }

    const iterator = containerClient.listBlobsFlat({
      includeCopy: true,
      includeDeleted: true,
      includeMetadata: true,
      includeSnapshots: true,
      includeUncommitedBlobs: true,
      prefix,
    });

    let blobItem = getYieldedValue(await iterator.next());
    assert.notStrictEqual(blobClients[0].url.indexOf(blobItem.name), -1);
    assert.isTrue(isSuperSet(blobItem.metadata, metadata));

    blobItem = getYieldedValue(await iterator.next());
    assert.notStrictEqual(blobClients[1].url.indexOf(blobItem.name), -1);
    assert.isTrue(isSuperSet(blobItem.metadata, metadata));

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator(byPage()) for listBlobsFlat", async () => {
    const blobClients = [];
    const prefix = "blockblob";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 4; i++) {
      const blobClient = containerClient.getBlobClient(
        getRecorderUniqueVariable(recorder, `${prefix}/${i}`),
      );
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0, {
        metadata,
      });
      blobClients.push(blobClient);
    }

    let i = 0;
    for await (const response of containerClient
      .listBlobsFlat({
        includeCopy: true,
        includeDeleted: true,
        includeMetadata: true,
        includeSnapshots: true,
        includeUncommitedBlobs: true,
        prefix,
      })
      .byPage({ maxPageSize: 2 })) {
      for (const blob of response.segment.blobItems) {
        assert.notStrictEqual(blobClients[i].url.indexOf(blob.name), -1);
        assert.isTrue(isSuperSet(blob.metadata, metadata));
        i++;
      }
    }

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator(byPage() - continuationToken) for listBlobsFlat", async () => {
    const blobClients = [];
    const prefix = "blockblob";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    for (let i = 0; i < 4; i++) {
      const blobClient = containerClient.getBlobClient(
        getRecorderUniqueVariable(recorder, `${prefix}/${i}`),
      );
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0, {
        metadata,
      });
      blobClients.push(blobClient);
    }

    let i = 0;
    let iter = containerClient
      .listBlobsFlat({
        includeCopy: true,
        includeDeleted: true,
        includeMetadata: true,
        includeSnapshots: true,
        includeUncommitedBlobs: true,
        prefix,
      })
      .byPage({ maxPageSize: 2 });
    let response = (await iter.next()).value;
    for (const blob of response.segment.blobItems) {
      assert.notStrictEqual(blobClients[i].url.indexOf(blob.name), -1);
      assert.isTrue(isSuperSet(blob.metadata, metadata));
      i++;
    }
    // Gets next marker
    const marker = response.continuationToken;
    // Passing next marker as continuationToken
    iter = containerClient
      .listBlobsFlat({
        includeCopy: true,
        includeDeleted: true,
        includeMetadata: true,
        includeSnapshots: true,
        includeUncommitedBlobs: true,
        prefix,
      })
      .byPage({ continuationToken: marker, maxPageSize: 2 });
    response = (await iter.next()).value;
    // Gets 2 blobs
    for (const blob of response.segment.blobItems) {
      assert.notStrictEqual(blobClients[i].url.indexOf(blob.name), -1);
      assert.isTrue(isSuperSet(blob.metadata, metadata));
      i++;
    }

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("listBlobsByHierarchy with default parameters", async () => {
    const blobClients = [];
    for (let i = 0; i < 3; i++) {
      const blobClient = containerClient.getBlobClient(
        getRecorderUniqueVariable(recorder, `blockblob${i}/${i}`),
      );
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0);
      blobClients.push(blobClient);
    }

    const delimiter = "/";
    const result = (await containerClient.listBlobsByHierarchy(delimiter).byPage().next()).value;

    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(containerClient.url.indexOf(result.containerName), -1);
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.delimiter, delimiter);
    assert.deepStrictEqual(result.segment.blobPrefixes!.length, blobClients.length);

    for (let i = 0; i < 3; i++) {
      assert.notStrictEqual(blobClients[i].url.indexOf(result.segment.blobPrefixes![i].name), -1);
    }

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("listBlobsByHierarchy to list uncommitted blobs", async () => {
    const blobClients = [];
    for (let i = 0; i < 3; i++) {
      const blobClient = containerClient.getBlobClient(
        getRecorderUniqueVariable(recorder, `blockblob${i}`),
      );
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.stageBlock(base64encode("1"), "Hello", 5);
      blobClients.push(blobClient);
    }

    const delimiter = "/";
    const result = (
      await containerClient
        .listBlobsByHierarchy(delimiter, {
          includeUncommitedBlobs: true,
        })
        .byPage()
        .next()
    ).value;

    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(containerClient.url.indexOf(result.containerName), -1);
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.delimiter, delimiter);
    assert.deepStrictEqual(result.segment.blobItems!.length, blobClients.length);
    assert.isUndefined(result.segment.blobItems![0].properties.contentMD5);

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("listBlobsByHierarchy with special chars", async () => {
    const dirNames = ["first_dir\uFFFF/", "second_dir\uFFFF/", "normal_dir/"];

    for (let i = 0; i < dirNames.length; ++i) {
      const encodedCharBlockBlobClient = containerClient.getBlockBlobClient(
        dirNames[i] + "file\uFFFF.blob",
      );
      await encodedCharBlockBlobClient.upload("", 0);
    }

    const blobNames = ["first_file\uFFFF.blob", "second_file\uFFFF.blob", "NormalBlob"];
    for (let i = 0; i < dirNames.length; ++i) {
      const blockBlobClientWithNormalName = containerClient.getBlockBlobClient(blobNames[i]);
      await blockBlobClientWithNormalName.upload("", 0);
    }

    const delimiter = "/";
    const result = (await containerClient.listBlobsByHierarchy(delimiter).byPage().next()).value;
    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(containerClient.url.indexOf(result.containerName), -1);
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.delimiter, delimiter);
    assert.deepStrictEqual(result.segment.blobPrefixes!.length, 3);

    for (let i = 0; i < result.segment.blobPrefixes.length; ++i) {
      assert.isTrue(
        dirNames.includes(result.segment.blobPrefixes[i].name),
        "Directory name for the uploaded blob should be in the prefix list",
      );
    }

    for (let i = 0; i < result.segment.blobItems.length; ++i) {
      assert.isTrue(
        blobNames.includes(result.segment.blobItems[i].name),
        "Uploaded blob should be in the list",
      );
    }
  });

  it("listBlobsByHierarchy with default parameters - null prefix shouldn't throw error", async () => {
    const blobClients = [];
    for (let i = 0; i < 3; i++) {
      const blobClient = containerClient.getBlobClient(
        getRecorderUniqueVariable(recorder, `blockblob${i}/${i}`),
      );
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0);
      blobClients.push(blobClient);
    }

    const delimiter = "/";
    const result: ContainerListBlobHierarchySegmentResponse = (
      await containerClient.listBlobsByHierarchy(delimiter, { prefix: "" }).byPage().next()
    ).value;

    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(containerClient.url.indexOf(result.containerName), -1);
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.delimiter, delimiter);
    assert.deepStrictEqual(result.segment.blobPrefixes!.length, blobClients.length);

    for (let i = 0; i < 3; i++) {
      assert.notStrictEqual(blobClients[i].url.indexOf(result.segment.blobPrefixes![i].name), -1);
    }

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("listBlobsByHierarchy with all parameters configured", async () => {
    const blobClients = [];
    const prefix = "blockblob";
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    const delimiter = "/";
    for (let i = 0; i < 2; i++) {
      const blobClient = containerClient.getBlobClient(
        getRecorderUniqueVariable(recorder, `${prefix}${i}${delimiter}${i}`),
      );
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0, {
        metadata,
      });
      blobClients.push(blobClient);
    }

    const result = (
      await containerClient
        .listBlobsByHierarchy(delimiter, {
          includeCopy: true,
          includeDeleted: true,
          includeMetadata: true,
          includeUncommitedBlobs: true,
          includeVersions: true,
          prefix,
        })
        .byPage({ maxPageSize: 1 })
        .next()
    ).value;

    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.notStrictEqual(containerClient.url.indexOf(result.containerName), -1);
    assert.deepStrictEqual(result.segment.blobPrefixes!.length, 1);
    assert.deepStrictEqual(result.segment.blobItems!.length, 0);
    assert.notStrictEqual(blobClients[0].url.indexOf(result.segment.blobPrefixes![0].name), -1);

    const result2 = (
      await containerClient
        .listBlobsByHierarchy(delimiter, {
          includeCopy: true,
          includeDeleted: true,
          includeMetadata: true,
          includeUncommitedBlobs: true,
          includeVersions: true,
          prefix,
        })
        .byPage({ continuationToken: result.continuationToken, maxPageSize: 2 })
        .next()
    ).value;

    assert.isAbove(result2.serviceEndpoint.length, 0);
    assert.notStrictEqual(containerClient.url.indexOf(result2.containerName), -1);
    assert.deepStrictEqual(result2.segment.blobPrefixes!.length, 1);
    assert.deepStrictEqual(result2.segment.blobItems!.length, 0);
    assert.notStrictEqual(blobClients[1].url.indexOf(result2.segment.blobPrefixes![0].name), -1);

    const result3 = (
      await containerClient
        .listBlobsByHierarchy(delimiter, {
          includeCopy: true,
          includeDeleted: true,
          includeMetadata: true,
          includeUncommitedBlobs: true,
          includeVersions: true,
          prefix: `${prefix}0${delimiter}`,
        })
        .byPage({ maxPageSize: 2 })
        .next()
    ).value;

    assert.isAbove(result3.serviceEndpoint.length, 0);
    assert.notStrictEqual(containerClient.url.indexOf(result3.containerName), -1);
    assert.deepStrictEqual(result3.continuationToken, "");
    assert.deepStrictEqual(result3.delimiter, delimiter);
    assert.deepStrictEqual(result3.segment.blobItems!.length, 1);
    assert.isTrue(isSuperSet(result3.segment.blobItems![0].metadata, metadata));
    assert.isDefined(result3.segment.blobItems![0].versionId);
    assert.notStrictEqual(blobClients[0].url.indexOf(result3.segment.blobItems![0].name), -1);

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("listBlobsByHierarchy with startFrom", async () => {
    const blobClients = [];
    let startFrom = "";
    for (let i = 0; i < 3; i++) {
      const blobName = getRecorderUniqueVariable(recorder, `blockblob${i}/${i}`);
      if (i === 1) {
        startFrom = blobName;
      }
      const blobClient = containerClient.getBlobClient(blobName);
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0);
      blobClients.push(blobClient);
    }

    const delimiter = "/";
    const result = (
      await containerClient
        .listBlobsByHierarchy(delimiter, {
          startFrom: startFrom,
        })
        .byPage()
        .next()
    ).value;

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(containerClient.url.indexOf(result.containerName));
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.delimiter, delimiter);
    assert.deepStrictEqual(result.segment.blobPrefixes!.length, blobClients.length - 1);

    for (const blob of blobClients) {
      let i = 0;
      assert.ok(blob.url.indexOf(result.segment.blobPrefixes![i++].name));
    }

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("listBlobsByHierarchy with startFrom with special char", async () => {
    const blobClients = [];

    const dirName = "first_dir\uFFFF";
    let startFrom = "";
    for (let i = 0; i < 3; i++) {
      const blobName = getRecorderUniqueVariable(recorder, `${dirName}${i}/${i}`);
      if (i === 1) {
        startFrom = blobName;
      }
      const blobClient = containerClient.getBlobClient(blobName);

      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0);
      blobClients.push(blobClient);
    }

    const result = (
      await containerClient
        .listBlobsByHierarchy("/", {
          startFrom: startFrom,
        })
        .byPage()
        .next()
    ).value;
    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(containerClient.url.indexOf(result.containerName));
    assert.deepStrictEqual(result.continuationToken, "");
    assert.deepStrictEqual(result.segment.blobPrefixes!.length, blobClients.length - 1);
    assert.ok(blobClients[1].url.indexOf(result.segment.blobPrefixes![0].name));

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator(byPage() - continuationToken) for listBlobsByHierarchy with startFrom", async () => {
    const blobClients = [];
    const prefix = "blockblob";
    let startFrom = "";
    for (let i = 0; i < 5; i++) {
      const blobName = getRecorderUniqueVariable(recorder, `${prefix}${i}/${i}`);
      if (i === 1) {
        startFrom = blobName;
      }
      const blobClient = containerClient.getBlobClient(blobName);
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0);
      blobClients.push(blobClient);
    }

    let i = 1;
    let iter = containerClient
      .listBlobsByHierarchy("/", {
        startFrom: startFrom,
      })
      .byPage({ maxPageSize: 2 });
    let response = (await iter.next()).value;
    for (const blob of response.segment.blobPrefixes) {
      assert.ok(blobClients[i].url.indexOf(blob.name));
      i++;
    }
    // Gets next marker
    const marker = response.continuationToken;
    // Passing next marker as continuationToken
    iter = containerClient
      .listBlobsByHierarchy("/")
      .byPage({ continuationToken: marker, maxPageSize: 2 });
    response = (await iter.next()).value;
    // Gets 2 blobs
    for (const blob of response.segment.blobPrefixes) {
      assert.ok(blobClients[i].url.indexOf(blob.name));
      i++;
    }

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator for listBlobsByHierarchy", async () => {
    const blobClients = [];
    const prefix = recorder.variable("prefix", getUniqueName("prefix"));
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    const name = recorder.variable("blockblob", getUniqueName("blockblob"));
    for (let i = 0; i < 6; i++) {
      const blobClient = containerClient.getBlobClient(`${prefix}/${name}${i}`);
      const blockBlobClient = blobClient.getBlockBlobClient();
      await blockBlobClient.upload("", 0, {
        metadata,
      });
      blobClients.push(blobClient);
    }

    let i = 0;
    for await (const item of containerClient.listBlobsByHierarchy("/", {
      includeMetadata: true,
    })) {
      if (item.kind === "prefix") {
        assert.equal(item.name, prefix + "/");
      } else {
        assert.notStrictEqual(blobClients[i].url.indexOf(item.name), -1);
        assert.deepStrictEqual(item.metadata, metadata);
        i++;
      }
    }

    for (const blob of blobClients) {
      await blob.delete();
    }
  });

  it("listBlobsByHierarchy with empty delimiter should throw error", async () => {
    try {
      await containerClient.listBlobsByHierarchy("", { prefix: "" }).byPage().next();
      assert.fail("Expecting an error when listBlobsByHierarchy with empty delimiter.");
    } catch (error: any) {
      assert.equal(
        "delimiter should contain one or more characters",
        error.message,
        "Error message is different than expected.",
      );
    }
  });

  it("uploadBlockBlob and deleteBlob", async () => {
    const body: string = recorder.variable("randomstring", getUniqueName("randomstring"));
    const options = {
      blobCacheControl: "blobCacheControl",
      blobContentDisposition: "blobContentDisposition",
      blobContentEncoding: "blobContentEncoding",
      blobContentLanguage: "blobContentLanguage",
      blobContentType: "blobContentType",
      metadata: {
        keya: "vala",
        keyb: "valb",
      },
    };
    const blobName: string = recorder.variable("blob", getUniqueName("blob"));
    const { blockBlobClient } = await containerClient.uploadBlockBlob(blobName, body, body.length, {
      blobHTTPHeaders: options,
      metadata: options.metadata,
    });
    const result = await blockBlobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
    assert.deepStrictEqual(result.cacheControl, options.blobCacheControl);

    await containerClient.deleteBlob(blobName);
    try {
      await blockBlobClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one.",
      );
    } catch (error: any) {
      assert.strictEqual(error.statusCode as number, 404);
    }
  });

  it("uploadBlockBlob and deleteBlob with tracing", async () => {
    const body: string = recorder.variable("randomstring", getUniqueName("randomstring"));
    const blobHeaders: BlobHTTPHeaders = {
      blobCacheControl: "blobCacheControl",
      blobContentDisposition: "blobContentDisposition",
      blobContentEncoding: "blobContentEncoding",
      blobContentLanguage: "blobContentLanguage",
      blobContentType: "blobContentType",
    };
    const blobName: string = recorder.variable("blob", getUniqueName("blob"));
    let blockBlobClient: BlockBlobClient | undefined;
    await expect(async function (options: OperationOptions) {
      const result = await containerClient.uploadBlockBlob(blobName, body, body.length, {
        blobHTTPHeaders: blobHeaders,
        metadata: {
          keya: "vala",
          keyb: "valb",
        },
        tracingOptions: options.tracingOptions,
      });
      blockBlobClient = result.blockBlobClient;
    }).toSupportTracing(["ContainerClient-uploadBlockBlob"]);

    await containerClient.deleteBlob(blobName);
    try {
      if (!blockBlobClient) {
        assert.fail("Expected to receive a block blob client for created blob");
      }
      await blockBlobClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one.",
      );
    } catch (error: any) {
      assert.strictEqual(error.statusCode as number, 404);
    }
  });

  it("can be created with a sas connection string", async () => {
    const newClient = new ContainerClient(
      getSASConnectionStringFromEnvironment(recorder),
      containerName,
    );
    configureBlobStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isUndefined(result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
    assert.isUndefined(result.blobPublicAccess);
  });

  it("can be created with a sas connection string and a container name and an option bag", async () => {
    const newClient = new ContainerClient(
      getSASConnectionStringFromEnvironment(recorder),
      containerName,
      {
        retryOptions: {
          maxTries: 5,
        },
      },
    );
    configureBlobStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isUndefined(result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
    assert.isUndefined(result.blobPublicAccess);
  });

  it("throws error if constructor containerName parameter is empty", async () => {
    try {
      // tslint:disable-next-line: no-unused-expression
      new ContainerClient(getSASConnectionStringFromEnvironment(recorder), "");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.equal(
        "Expecting non-empty strings for containerName parameter",
        error.message,
        "Error message is different than expected.",
      );
    }
  });

  it("exists returns true on an existing container", async () => {
    const result = await containerClient.exists();
    assert.isTrue(result, "exists() should return true for an existing container");
  });

  it("exists returns false on non-existing container", async () => {
    const newContainerClient = blobServiceClient.getContainerClient(
      recorder.variable("newcontainer", getUniqueName("newcontainer")),
    );
    const result = await newContainerClient.exists();
    assert.strictEqual(result, false, "exists() should return true for an existing container");
  });

  it("can list blobs with underscore metadata key name", async () => {
    const body: string = recorder.variable("randomstring", getUniqueName("randomstring"));
    const options = {
      blobCacheControl: "blobCacheControl",
      blobContentDisposition: "blobContentDisposition",
      blobContentEncoding: "blobContentEncoding",
      blobContentLanguage: "blobContentLanguage",
      blobContentType: "blobContentType",
      metadata: {
        _: "underscore value",
        keyb: "value b",
      },
    };
    const newContainerClient = blobServiceClient.getContainerClient(
      recorder.variable("listingcontainer", getUniqueName("listingcontainer")),
    );
    await newContainerClient.create();
    await newContainerClient.uploadBlockBlob(
      recorder.variable("listblob", getUniqueName("listblob")),
      body,
      body.length,
      {
        blobHTTPHeaders: options,
        metadata: options.metadata,
      },
    );

    const iterator = newContainerClient
      .listBlobsFlat({ includeMetadata: true })
      .byPage({ maxPageSize: 5 });
    const page = await iterator.next();
    assert.isFalse(page.done);
    assert.isDefined(page.value, "Expecting valid blob listing");
    if (!page.done) {
      assert.isAbove(page.value.segment.blobItems.length, 0, "Expecting blobItems");
      const blobItem = page.value.segment.blobItems[0];
      assert.deepStrictEqual(blobItem.metadata, options.metadata);
    }
  });

  it("Find blob by tags should work", async () => {
    const key1 = recorder.variable("key", getUniqueName("key"));
    const key2 = recorder.variable("key2", getUniqueName("key2"));

    const blobName1 = recorder.variable("blobname1", getUniqueName("blobname1"));
    const appendBlobClient1 = containerClient.getAppendBlobClient(blobName1);
    const tags1: Tags = {};
    tags1[key1] = recorder.variable("val1", getUniqueName("val1"));
    tags1[key2] = "default";
    await appendBlobClient1.create({ tags: tags1 });

    const blobName2 = recorder.variable("blobname2", getUniqueName("blobname2"));
    const appendBlobClient2 = containerClient.getAppendBlobClient(blobName2);
    const tags2: Tags = {};
    tags2[key1] = recorder.variable("val2", getUniqueName("val2"));
    tags2[key2] = "default";
    await appendBlobClient2.create({ tags: tags2 });

    const blobName3 = recorder.variable("blobname3", getUniqueName("blobname3"));
    const appendBlobClient3 = containerClient.getAppendBlobClient(blobName3);
    const tags3: Tags = {};
    tags3[key1] = recorder.variable("val3", getUniqueName("val3"));
    tags3[key2] = "default";
    await appendBlobClient3.create({ tags: tags3 });

    // Wait for indexing tags
    await delay(2 * 1000);

    const expectedTags1: Tags = {};
    expectedTags1[key1] = tags1[key1];
    for await (const blob of containerClient.findBlobsByTags(`${key1}='${tags1[key1]}'`)) {
      assert.deepStrictEqual(blob.name, blobName1);
      assert.deepStrictEqual(blob.tags, expectedTags1);
      assert.deepStrictEqual(blob.tagValue, tags1[key1]);
    }

    const expectedTags2: Tags = {};
    expectedTags2[key1] = tags2[key1];
    const blobs = [];
    for await (const blob of containerClient.findBlobsByTags(`${key1}='${tags2[key1]}'`)) {
      blobs.push(blob);
    }
    assert.deepStrictEqual(blobs.length, 1);
    assert.deepStrictEqual(blobs[0].name, blobName2);
    assert.deepStrictEqual(blobs[0].tags, expectedTags2);
    assert.deepStrictEqual(blobs[0].tagValue, tags2[key1]);

    const blobsWithTag2 = [];
    for await (const segment of containerClient.findBlobsByTags(`${key2}='default'`).byPage({
      maxPageSize: 1,
    })) {
      assert.isAtMost(segment.blobs.length, 1);
      for (const blob of segment.blobs) {
        blobsWithTag2.push(blob);
      }
    }
    assert.deepStrictEqual(blobsWithTag2.length, 3);

    for await (const blob of containerClient.findBlobsByTags(
      `${key1}='${tags1[key1]}' AND ${key2}='default'`,
    )) {
      assert.deepStrictEqual(blob.name, blobName1);
      assert.deepStrictEqual(blob.tags, tags1);
      assert.deepStrictEqual(blob.tagValue, "");
    }
  });

  it("getAccountInfo", async () => {
    const accountInfo = await containerClient.getAccountInfo();
    assert.isDefined(accountInfo.accountKind);
    assert.isDefined(accountInfo.skuName);
    assert.deepStrictEqual(accountInfo.isHierarchicalNamespaceEnabled, false);
  });
});

describe("ContainerClient - Verify Name Properties", () => {
  const containerName = "containername";
  const accountName = "myaccount";

  function verifyNameProperties(url: string): void {
    const newClient = new ContainerClient(url);
    assert.equal(
      newClient.containerName,
      containerName,
      "Container name is not the same as the one provided.",
    );
    assert.equal(
      newClient.accountName,
      accountName,
      "Account name is not the same as the one provided.",
    );
  }

  it("verify endpoint from the portal", async () => {
    verifyNameProperties(`https://${accountName}.blob.core.windows.net/` + containerName);
  });

  it("verify IPv4 host address as Endpoint", async () => {
    verifyNameProperties(`https://192.0.0.10:1900/${accountName}/${containerName}`);
  });

  it("verify IPv6 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]:443/${accountName}/${containerName}`,
    );
  });

  it("verify endpoint without dots", async () => {
    verifyNameProperties(`https://localhost:80/${accountName}/${containerName}`);
  });

  it("verify custom endpoint without valid accountName", async () => {
    const newClient = new ContainerClient(`https://customdomain.com/${containerName}`);
    assert.equal(newClient.accountName, "", "Account name is not the same as expected.");
    assert.equal(
      newClient.containerName,
      containerName,
      "Container name is not the same as the one provided.",
    );
  });
});

function XMSVersioninjectorPolicy(version: string): PipelinePolicy {
  return {
    name: "XMSVersioninjectorPolicy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      request.headers.set("x-ms-version", version);
      return next(request);
    },
  };
}

describe("Version error test", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        uriSanitizers,
        removeHeaderSanitizer: {
          headersForRemoval: ["x-ms-encryption-key"],
        },
      },
      ["playback", "record"],
    );
    blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("Invalid service version", async () => {
    const injector = XMSVersioninjectorPolicy(`3025-01-01`);

    const pipeline: Pipeline = (containerClient as any).storageClientContext.pipeline;
    pipeline.addPolicy(injector, { afterPhase: "Retry" });
    try {
      await containerClient.create();
    } catch (err) {
      assert.isTrue(
        (err as any).message.startsWith(
          "The provided service version is not enabled on this storage account. Please see",
        ),
      );
    }
  });
});

/**
 * Tests for the Apache Arrow response format of the List Blobs (flat and hierarchy)
 * operations. Each test opts in with `responseFormat: StorageResponseFormat.Arrow`.
 *
 * The assertions verify the parsed result, which is identical whether the service
 * returns Apache Arrow or falls back to XML, so they stay valid against both
 * Arrow-enabled and non-Arrow-enabled accounts. Recordings should be captured
 * against an Arrow-enabled account so the Apache Arrow parser is exercised.
 *
 * The soft-deleted-blobs test relies on a soft-delete-enabled account (accessed
 * via the SOFT_DELETE_ credentials) and skips itself when that account is not
 * configured. Scenarios that require account features not available in the test
 * environment - rehydrate priority, encryption scope, and object replication -
 * are intentionally omitted and can be added once those accounts are available.
 */
describe("ContainerClient List Blobs with Apache Arrow", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  async function createBlockBlob(
    name: string,
    content = "hello",
    options?: { metadata?: Record<string, string>; tags?: Tags },
  ): Promise<string> {
    const blockBlobClient = containerClient.getBlockBlobClient(name);
    await blockBlobClient.upload(content, content.length, options);
    return name;
  }

  it("listBlobsFlat should return all blobs", async () => {
    const names: string[] = [];
    for (let i = 0; i < 3; i++) {
      names.push(await createBlockBlob(getRecorderUniqueVariable(recorder, `blob${i}`)));
    }

    const found: string[] = [];
    for await (const blob of containerClient.listBlobsFlat({
      responseFormat: StorageResponseFormat.Arrow,
    })) {
      found.push(blob.name);
    }

    assert.sameMembers(found, names);
  });

  it("listBlobsFlat should parse blob properties", async () => {
    const content = "hello world";
    const name = await createBlockBlob(getRecorderUniqueVariable(recorder, "blob"), content);

    const response = (
      await containerClient
        .listBlobsFlat({ responseFormat: StorageResponseFormat.Arrow })
        .byPage()
        .next()
    ).value;

    assert.isAbove(response.serviceEndpoint.length, 0);
    assert.notStrictEqual(containerClient.url.indexOf(response.containerName), -1);
    assert.strictEqual(response.segment.blobItems.length, 1);

    const blob = response.segment.blobItems[0];
    assert.strictEqual(blob.name, name);
    assert.strictEqual(blob.deleted, false);
    assert.strictEqual(blob.properties.contentLength, content.length);
    assert.strictEqual(blob.properties.blobType, "BlockBlob");
    assert.isAbove(blob.properties.etag!.length, 0);
    // Validates timestamp parsing. apache-arrow returns Timestamp cells already in
    // epoch milliseconds; scaling them again by the schema's TimeUnit produced a
    // year ~58487, which is still a valid Date - so assert a plausible year range
    // rather than only `instanceof Date` to guard against that regression.
    assert.instanceOf(blob.properties.createdOn, Date);
    assert.isAbove(blob.properties.createdOn!.getFullYear(), 2020);
    assert.isBelow(blob.properties.createdOn!.getFullYear(), 2100);
    assert.instanceOf(blob.properties.lastModified, Date);
    assert.isAbove(blob.properties.lastModified.getFullYear(), 2020);
    assert.isBelow(blob.properties.lastModified.getFullYear(), 2100);
  });

  it("listBlobsFlat with includeMetadata should return metadata", async () => {
    const metadata = { keya: "a", keyb: "b" };
    const name = await createBlockBlob(getRecorderUniqueVariable(recorder, "blob"), "hello", {
      metadata,
    });

    const response = (
      await containerClient
        .listBlobsFlat({ responseFormat: StorageResponseFormat.Arrow, includeMetadata: true })
        .byPage()
        .next()
    ).value;

    const blob = response.segment.blobItems.find((b: BlobItem) => b.name === name);
    assert.isDefined(blob);
    assert.deepStrictEqual(blob!.metadata, metadata);
  });

  it("listBlobsFlat with includeTags should return tags", async () => {
    const tags: Tags = { tag1: "value1", tag2: "value2" };
    const name = await createBlockBlob(getRecorderUniqueVariable(recorder, "blob"), "hello", {
      tags,
    });

    const response = (
      await containerClient
        .listBlobsFlat({ responseFormat: StorageResponseFormat.Arrow, includeTags: true })
        .byPage()
        .next()
    ).value;

    const blob = response.segment.blobItems.find((b: BlobItem) => b.name === name);
    assert.isDefined(blob);
    assert.deepStrictEqual(blob!.tags, tags);
    assert.strictEqual(blob!.properties.tagCount, 2);
  });

  it("listBlobsFlat should page results with maxPageSize", async () => {
    const names: string[] = [];
    for (let i = 0; i < 4; i++) {
      names.push(await createBlockBlob(getRecorderUniqueVariable(recorder, `blob${i}`)));
    }

    const found: string[] = [];
    let pages = 0;
    for await (const page of containerClient
      .listBlobsFlat({ responseFormat: StorageResponseFormat.Arrow })
      .byPage({ maxPageSize: 2 })) {
      pages++;
      assert.isAtMost(page.segment.blobItems.length, 2);
      for (const blob of page.segment.blobItems) {
        found.push(blob.name);
      }
    }

    assert.strictEqual(pages, 2);
    assert.sameMembers(found, names);
  });

  it("listBlobsFlat with prefix should filter results", async () => {
    await createBlockBlob("foo/a");
    await createBlockBlob("foo/b");
    await createBlockBlob("bar/c");

    const found: string[] = [];
    for await (const blob of containerClient.listBlobsFlat({
      responseFormat: StorageResponseFormat.Arrow,
      prefix: "foo/",
    })) {
      assert.isTrue(blob.name.startsWith("foo/"));
      found.push(blob.name);
    }
    assert.deepStrictEqual(found.sort(), ["foo/a", "foo/b"]);
  });

  it("listBlobsFlat should list with special characters in blob name", async () => {
    const name = "dir1/dir2/file\uFFFF.blob";
    await createBlockBlob(name);

    const result = await containerClient
      .listBlobsFlat({ responseFormat: StorageResponseFormat.Arrow })
      .next();
    assert.isFalse(result.done);
    assert.strictEqual(result.value.name, name);
  });

  it("listBlobsFlat should list with snapshots", async () => {
    const name = getRecorderUniqueVariable(recorder, "blob");
    const blockBlobClient = containerClient.getBlockBlobClient(name);
    await blockBlobClient.upload("hello", 5);
    const snapshotResponse = await blockBlobClient.createSnapshot();

    const snapshots: string[] = [];
    for await (const blob of containerClient.listBlobsFlat({
      responseFormat: StorageResponseFormat.Arrow,
      includeSnapshots: true,
    })) {
      if (blob.name === name && blob.snapshot) {
        snapshots.push(blob.snapshot);
      }
    }
    assert.include(snapshots, snapshotResponse.snapshot!);
  });

  it("listBlobsFlat should list with uncommitted blobs", async () => {
    const name = getRecorderUniqueVariable(recorder, "blob");
    const blockBlobClient = containerClient.getBlockBlobClient(name);
    await blockBlobClient.stageBlock(base64encode("1"), "hello", 5);

    const found: string[] = [];
    for await (const blob of containerClient.listBlobsFlat({
      responseFormat: StorageResponseFormat.Arrow,
      includeUncommitedBlobs: true,
    })) {
      found.push(blob.name);
    }
    assert.include(found, name);
  });

  it("listBlobsFlat with startFrom should return blobs from the marker inclusive", async () => {
    // Names sort lexicographically as aaa < bbb < ccc.
    await createBlockBlob("aaa");
    await createBlockBlob("bbb");
    await createBlockBlob("ccc");

    const found: string[] = [];
    for await (const blob of containerClient.listBlobsFlat({
      responseFormat: StorageResponseFormat.Arrow,
      startFrom: "bbb",
    })) {
      found.push(blob.name);
    }
    assert.deepStrictEqual(found, ["bbb", "ccc"]);
  });

  it("listBlobsFlat with endBefore should end the listing before the marker (Apache Arrow only)", async () => {
    await createBlockBlob("aaa");
    await createBlockBlob("bbb");
    await createBlockBlob("ccc");

    const found: string[] = [];
    for await (const blob of containerClient.listBlobsFlat({
      responseFormat: StorageResponseFormat.Arrow,
      endBefore: "ccc",
    })) {
      found.push(blob.name);
    }
    assert.deepStrictEqual(found, ["aaa", "bbb"]);
  });

  it("listBlobsFlat with startFrom and endBefore should bound the listing on both ends (Apache Arrow only)", async () => {
    await createBlockBlob("aaa");
    await createBlockBlob("bbb");
    await createBlockBlob("ccc");
    await createBlockBlob("ddd");

    const found: string[] = [];
    for await (const blob of containerClient.listBlobsFlat({
      responseFormat: StorageResponseFormat.Arrow,
      startFrom: "bbb",
      endBefore: "ddd",
    })) {
      found.push(blob.name);
    }
    assert.deepStrictEqual(found, ["bbb", "ccc"]);
  });

  it("listBlobsFlat should surface service errors", async () => {
    const missingContainer = blobServiceClient.getContainerClient(
      recorder.variable("missing", getUniqueName("missing")),
    );

    try {
      await missingContainer.listBlobsFlat({ responseFormat: StorageResponseFormat.Arrow }).next();
      assert.fail("Expected a ContainerNotFound error");
    } catch (err: any) {
      assert.strictEqual(err.statusCode, 404);
    }
  });

  it("listBlobsByHierarchy should return prefixes and blobs", async () => {
    await createBlockBlob("root.txt");
    await createBlockBlob("folder1/a.txt");
    await createBlockBlob("folder1/b.txt");
    await createBlockBlob("folder2/c.txt");

    const blobs: string[] = [];
    const prefixes: string[] = [];
    for await (const item of containerClient.listBlobsByHierarchy("/", {
      responseFormat: StorageResponseFormat.Arrow,
    })) {
      if (item.kind === "prefix") {
        prefixes.push(item.name);
      } else {
        blobs.push(item.name);
      }
    }

    assert.sameMembers(blobs, ["root.txt"]);
    assert.sameMembers(prefixes, ["folder1/", "folder2/"]);
  });

  it("listBlobsByHierarchy should page results with maxPageSize", async () => {
    await createBlockBlob("folder1/a.txt");
    await createBlockBlob("folder2/b.txt");
    await createBlockBlob("folder3/c.txt");
    await createBlockBlob("folder4/d.txt");

    let pages = 0;
    const prefixes: string[] = [];
    for await (const page of containerClient
      .listBlobsByHierarchy("/", { responseFormat: StorageResponseFormat.Arrow })
      .byPage({ maxPageSize: 2 })) {
      pages++;
      assert.strictEqual(page.delimiter, "/");
      for (const prefix of page.segment.blobPrefixes ?? []) {
        prefixes.push(prefix.name);
      }
    }

    assert.sameMembers(prefixes, ["folder1/", "folder2/", "folder3/", "folder4/"]);
    assert.isAtLeast(pages, 2);
  });

  it("listBlobsFlat should preserve whitespace in blob names", async () => {
    const names = ["  leading", "trailing  ", "  surrounded  "];
    for (const name of names) {
      await createBlockBlob(name);
    }

    const found: string[] = [];
    for await (const blob of containerClient.listBlobsFlat({
      responseFormat: StorageResponseFormat.Arrow,
    })) {
      found.push(blob.name);
    }
    assert.sameMembers(found, names);
  });

  it("listBlobsFlat should list with versions", async () => {
    const name = getRecorderUniqueVariable(recorder, "blob");
    const blockBlobClient = containerClient.getBlockBlobClient(name);
    const createResponse = await blockBlobClient.upload("hello", 5);
    // A second write to the same blob creates a new version.
    await blockBlobClient.upload("hello world", 11);

    const versionIds: string[] = [];
    let sawCurrentVersion = false;
    for await (const blob of containerClient.listBlobsFlat({
      responseFormat: StorageResponseFormat.Arrow,
      includeVersions: true,
    })) {
      if (blob.name === name) {
        if (blob.versionId) {
          versionIds.push(blob.versionId);
        }
        if (blob.isCurrentVersion) {
          sawCurrentVersion = true;
        }
      }
    }

    assert.include(versionIds, createResponse.versionId!);
    assert.isTrue(sawCurrentVersion);
  });

  it("listBlobsFlat should list with soft-deleted blobs", async (ctx) => {
    let softDeleteServiceClient: BlobServiceClient;
    try {
      softDeleteServiceClient = getGenericBSU(recorder, "SOFT_DELETE_");
    } catch (err: any) {
      ctx.skip();
      return;
    }

    const softDeleteContainerName = recorder.variable(
      "softdeletecontainer",
      getUniqueName("softdeletecontainer"),
    );
    const softDeleteContainerClient =
      softDeleteServiceClient.getContainerClient(softDeleteContainerName);
    await softDeleteContainerClient.create();

    try {
      const name = getRecorderUniqueVariable(recorder, "softdeleteblob");
      const blockBlobClient = softDeleteContainerClient.getBlockBlobClient(name);
      await blockBlobClient.upload("hello", 5);
      await blockBlobClient.delete();

      let deletedBlob: { name: string; deleted: boolean } | undefined;
      for await (const blob of softDeleteContainerClient.listBlobsFlat({
        responseFormat: StorageResponseFormat.Arrow,
        includeDeleted: true,
      })) {
        if (blob.name === name) {
          deletedBlob = { name: blob.name, deleted: blob.deleted };
        }
      }

      assert.isDefined(deletedBlob);
      assert.isTrue(deletedBlob!.deleted);
    } finally {
      await softDeleteContainerClient.delete();
    }
  });
});
