// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  base64encode,
  getBSU,
  getGenericBSU,
  getRecorderUniqueVariable,
  getUniqueName,
  recorderEnvSetup,
} from "../utils/index.js";
import { Recorder } from "@azure-tools/test-recorder";
import type { BlobServiceClient, ContainerClient } from "../../src/index.js";
import { StorageResponseFormat } from "../../src/index.js";
import type { Tags } from "../../src/models.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

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

  it("listBlobsFlat returns all blobs", async () => {
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

  it("listBlobsFlat parses blob properties", async () => {
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

  it("listBlobsFlat with includeMetadata returns metadata", async () => {
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

    const blob = response.segment.blobItems.find((b) => b.name === name);
    assert.isDefined(blob);
    assert.deepStrictEqual(blob!.metadata, metadata);
  });

  it("listBlobsFlat with includeTags returns tags", async () => {
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

    const blob = response.segment.blobItems.find((b) => b.name === name);
    assert.isDefined(blob);
    assert.deepStrictEqual(blob!.tags, tags);
    assert.strictEqual(blob!.properties.tagCount, 2);
  });

  it("listBlobsFlat pages results with maxPageSize", async () => {
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

  it("listBlobsFlat with prefix filters results", async () => {
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

  it("listBlobsFlat with special characters in blob name", async () => {
    const name = "dir1/dir2/file\uFFFF.blob";
    await createBlockBlob(name);

    const result = await containerClient
      .listBlobsFlat({ responseFormat: StorageResponseFormat.Arrow })
      .next();
    assert.isFalse(result.done);
    assert.strictEqual(result.value.name, name);
  });

  it("listBlobsFlat with snapshots", async () => {
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

  it("listBlobsFlat with uncommitted blobs", async () => {
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

  it("listBlobsFlat with startFrom returns blobs from the marker inclusive", async () => {
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

  it("listBlobsFlat with endBefore ends the listing before the marker (Apache Arrow only)", async () => {
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

  it("listBlobsFlat with startFrom and endBefore bounds the listing on both ends (Apache Arrow only)", async () => {
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

  it("listBlobsFlat surfaces service errors", async () => {
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

  it("listBlobsByHierarchy returns prefixes and blobs", async () => {
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

  it("listBlobsByHierarchy pages results with maxPageSize", async () => {
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

  it("listBlobsFlat preserves whitespace in blob names", async () => {
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

  it("listBlobsFlat with versions", async () => {
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

  it("listBlobsFlat with soft-deleted blobs", async (ctx) => {
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
