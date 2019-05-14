import * as assert from "assert";

import { Aborter } from "../src/Aborter";
import { ShareClient } from "../src/ShareClient";
import { getBSU, getUniqueName } from "./utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("ShareClient", () => {
  const serviceClient = getBSU();
  let shareName: string = getUniqueName("share");
  let shareClient = ShareClient.fromFileServiceClient(serviceClient, shareName);

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareClient = ShareClient.fromFileServiceClient(serviceClient, shareName);
    await shareClient.create(Aborter.none);
  });

  afterEach(async () => {
    await shareClient.delete(Aborter.none);
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await shareClient.setMetadata(Aborter.none, metadata);

    const result = await shareClient.getProperties(Aborter.none);
    assert.deepEqual(result.metadata, metadata);
  });

  it("getProperties", async () => {
    const result = await shareClient.getProperties(Aborter.none);
    assert.ok(result.eTag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("create with default parameters", (done) => {
    // create() with default parameters has been tested in beforeEach
    done();
  });

  it("create with all parameters configured", async () => {
    const shareClient2 = ShareClient.fromFileServiceClient(serviceClient, getUniqueName(shareName));
    const metadata = { key: "value" };
    await shareClient2.create(Aborter.none, { metadata });
    const result = await shareClient2.getProperties(Aborter.none);
    assert.deepEqual(result.metadata, metadata);
  });

  it("delete", (done) => {
    // delete() with default parameters has been tested in afterEach
    done();
  });

  it("setQuota", async () => {
    const quotaInGB = 20;
    await shareClient.setQuota(Aborter.none, quotaInGB);
    const propertiesResponse = await shareClient.getProperties(Aborter.none);
    assert.equal(propertiesResponse.quota, quotaInGB);
  });

  it("getStatistics", async () => {
    const statisticsResponse = await shareClient.getStatistics(Aborter.none);
    assert.notEqual(statisticsResponse.shareUsage, undefined);
  });

  it("create snapshot", async () => {
    const metadata = { key1: "value1", key2: "value2" };
    const createSnapshotResponse = await shareClient.createSnapshot(Aborter.none, {
      metadata
    });

    assert.notEqual(createSnapshotResponse.snapshot, undefined);
    const sanpshot = createSnapshotResponse.snapshot!;
    const snapshotShareClient = shareClient.withSnapshot(sanpshot);

    const snapshotProperties = await snapshotShareClient.getProperties(Aborter.none);
    assert.deepStrictEqual(snapshotProperties.metadata, metadata);

    const originProperties = await shareClient.getProperties(Aborter.none);
    assert.notDeepStrictEqual(originProperties.metadata, metadata);

    await snapshotShareClient.delete(Aborter.none, {});
  });
});
