// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "node:fs";
import path from "node:path";
import type { BlobChangeFeedEvent } from "../src/index.js";
import { describe, it, assert, beforeEach, afterEach, vi } from "vitest";
import type { ContainerClient, BlobClient } from "@azure/storage-blob";
import type { Shard } from "../src/Shard.js";
import { SegmentFactory } from "../src/SegmentFactory.js";
import type { ShardFactory } from "../src/ShardFactory.js";

describe("Segment", async () => {
  const manifestPath = "idx/segments/2020/03/25/0200/meta.json";
  const dateTime = new Date(Date.UTC(2020, 2, 25, 2));
  const shardCount = 3;
  const segmentManifestFilePath = path.join("test", "resources", "SegmentManifest.json");
  let containerClientStub: ContainerClient;
  let shardFactoryStub: ShardFactory;
  let shardStubs: Shard[];

  beforeEach(() => {
    containerClientStub = {
      getBlobClient: vi.fn(),
    } as any as ContainerClient;
    const blobClientStub = {
      download: vi.fn(),
    } as any as BlobClient;
    vi.mocked(containerClientStub.getBlobClient).mockReturnValue(blobClientStub);
    // TODO: rewrite for browser
    vi.mocked(blobClientStub.download).mockResolvedValue({
      readableStreamBody: fs.createReadStream(segmentManifestFilePath),
    } as any);

    shardFactoryStub = {
      create: vi.fn(),
    } as any as ShardFactory;
    shardStubs = [];
    for (let i = 0; i < shardCount; i++) {
      shardStubs.push({
        hasNext: vi.fn(),
        getChange: vi.fn(),
        getCursor: vi.fn(),
        shardPath: vi.fn(),
        blockOffset: 0,
        eventIndex: 0,
      } as any as Shard);
      vi.mocked(shardFactoryStub.create).mockResolvedValueOnce(shardStubs[i]);
      vi.mocked(shardStubs[i].hasNext).mockReturnValue(true);
      vi.mocked(shardStubs[i].getChange).mockReturnValue(i as any);
      vi.spyOn(shardStubs[i], "shardPath", "get").mockReturnValue(`log/0${i}/2020/03/25/0200/`);
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("getChange round robin in shards", async () => {
    const segmentFactory = new SegmentFactory(shardFactoryStub);
    const segment = await segmentFactory.create(containerClientStub, manifestPath);
    assert.isTrue(segment.hasNext());
    assert.equal(segment.dateTime.getTime(), dateTime.getTime());

    // round robin
    for (let i = 0; i < shardCount * 2 + 1; i++) {
      const event = await segment.getChange();
      assert.equal(
        vi.mocked(shardStubs[i % shardCount].getChange).mock.calls.length,
        Math.floor(i / shardCount) + 1,
      );
      assert.equal(event, (i % shardCount) as unknown as BlobChangeFeedEvent | undefined);
    }

    // skip finished shard
    vi.mocked(shardStubs[1].hasNext).mockReturnValueOnce(false);
    shardStubs[1].getChange(undefined);
    const event = await segment.getChange();
    assert.equal(event, 1 as unknown as BlobChangeFeedEvent | undefined);

    const shardRemainingCount = shardCount - 1;
    for (let i = 0; i < shardRemainingCount; i++) {
      const changedEvent = await segment.getChange();
      assert.equal(
        changedEvent,
        ((i + 2) % shardCount) as unknown as BlobChangeFeedEvent | undefined,
      );
    }
    const event2 = await segment.getChange();
    assert.equal(event2, 2 as unknown as BlobChangeFeedEvent | undefined);

    // all shards done, return undefined
    for (let i = 0; i < shardCount; i++) {
      vi.mocked(shardStubs[i].hasNext).mockReturnValueOnce(false);
      vi.mocked(shardStubs[i].getChange).mockReturnValueOnce(undefined as any);
    }
    const lastEvent = await segment.getChange();
    assert.deepStrictEqual(lastEvent, undefined);
  });

  it("init with non-zero shardIndex", async () => {
    const shardIndex = 1;
    const CurrentShardPath = `log/0${shardIndex}/2020/03/25/0200/`;
    const segmentFactory = new SegmentFactory(shardFactoryStub);
    const segment = await segmentFactory.create(containerClientStub, manifestPath, {
      CurrentShardPath,
      SegmentPath: "idx/segments/2020/03/25/0200/meta.json",
      ShardCursors: [],
    } as any);
    assert.isTrue(segment.hasNext());
    assert.equal(segment.dateTime.getTime(), dateTime.getTime());
    const segmentCursor = segment.getCursor();
    assert.equal(segmentCursor.CurrentShardPath, CurrentShardPath);

    const event = await segment.getChange();
    assert.equal(event, shardIndex as unknown as BlobChangeFeedEvent | undefined);
  });
});
