// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import * as sinon from "sinon";
import { ContainerClient, BlobClient } from "@azure/storage-blob";
import { Shard } from "../src/Shard";
import { SegmentFactory } from "../src/SegmentFactory";
import { ShardFactory } from "../src/ShardFactory";

describe("Segment", async () => {
  const manifestPath = "idx/segments/2020/03/25/0200/meta.json";
  const dateTime = new Date(Date.UTC(2020, 2, 25, 2));
  const shardCount = 3;
  const segmentManifestFilePath = path.join("test", "resources", "SegmentManifest.json");
  let containerClientStub: any;
  let shardFactoryStub: any;
  let shardStubs: any[];

  beforeEach(() => {
    containerClientStub = sinon.createStubInstance(ContainerClient);
    const blobClientStub = sinon.createStubInstance(BlobClient);
    containerClientStub.getBlobClient.returns(blobClientStub);
    // TODO: rewrite for browser
    blobClientStub.download.resolves({
      readableStreamBody: fs.createReadStream(segmentManifestFilePath)
    } as any);

    shardFactoryStub = sinon.createStubInstance(ShardFactory);
    shardStubs = [];
    for (let i = 0; i < shardCount; i++) {
      shardStubs.push(sinon.createStubInstance(Shard));
      shardFactoryStub.create.onCall(i).returns(shardStubs[i]);

      shardStubs[i].hasNext.returns(true);
      shardStubs[i].getChange.returns(i);
      shardStubs[i].shardPath = `log/0${i}/2020/03/25/0200/`;
    }
  });

  afterEach(() => {
    sinon.restore();
  });

  it("getChange round robin in shards", async () => {
    const segmentFactory = new SegmentFactory(shardFactoryStub);
    const segment = await segmentFactory.create(containerClientStub, manifestPath);
    assert.ok(segment.hasNext());
    assert.equal(segment.dateTime.getTime(), dateTime.getTime());

    // round robin
    for (let i = 0; i < shardCount * 2 + 1; i++) {
      const event = await segment.getChange();
      assert.equal(shardStubs[i % shardCount].getChange.callCount, Math.floor(i / shardCount) + 1);
      assert.equal(event, i % shardCount);
    }

    // skip finished shard
    shardStubs[1].hasNext.returns(false);
    shardStubs[1].getChange(undefined);
    const event = await segment.getChange();
    assert.equal(event, 1);

    const shardRemainingCount = shardCount - 1;
    for (let i = 0; i < shardRemainingCount; i++) {
      const changedEvent = await segment.getChange();
      assert.equal(changedEvent, (i + 2) % shardCount);
    }
    const event2 = await segment.getChange();
    assert.equal(event2, 2);

    // all shards done, return undefined
    for (let i = 0; i < shardCount; i++) {
      shardStubs[i].hasNext.returns(false);
      shardStubs[i].getChange.returns(undefined);
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
      ShardCursors: []
    } as any);
    assert.ok(segment.hasNext());
    assert.equal(segment.dateTime.getTime(), dateTime.getTime());
    const segmentCursor = segment.getCursor();
    assert.equal(segmentCursor.CurrentShardPath, CurrentShardPath);

    const event = await segment.getChange();
    assert.equal(event, shardIndex);
  });
});
