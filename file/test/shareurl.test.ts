import * as assert from "assert";

import { Aborter } from "../lib/Aborter";
import { ShareURL } from "../lib/ShareURL";
import { getBSU, getUniqueName } from "./utils";

describe("ShareURL", () => {
  const serviceURL = getBSU();
  let shareName: string = getUniqueName("share");
  let shareURL = ShareURL.fromServiceURL(serviceURL, shareName);

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create(Aborter.none);
  });

  afterEach(async () => {
    await shareURL.delete(Aborter.none);
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await shareURL.setMetadata(Aborter.none, metadata);

    const result = await shareURL.getProperties(Aborter.none);
    assert.deepEqual(result.metadata, metadata);
  });

  it("getProperties", async () => {
    const result = await shareURL.getProperties(Aborter.none);
    assert.ok(result.eTag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("create with default parameters", done => {
    // create() with default parameters has been tested in beforeEach
    done();
  });

  it("create with all parameters configured", async () => {
    const shareURL2 = ShareURL.fromServiceURL(
      serviceURL,
      getUniqueName(shareName)
    );
    const metadata = { key: "value" };
    await shareURL2.create(Aborter.none, { metadata });
    const result = await shareURL2.getProperties(Aborter.none);
    assert.deepEqual(result.metadata, metadata);
  });

  it("delete", done => {
    // delete() with default parameters has been tested in afterEach
    done();
  });

  it("setQuota", async () => {
    const quotaInGB = 20;
    await shareURL.setQuota(Aborter.none, quotaInGB);
    const propertiesResponse = await shareURL.getProperties(Aborter.none);
    assert.equal(propertiesResponse.quota, quotaInGB);
  });

  it("getStatistics", async () => {
    const statisticsResponse = await shareURL.getStatistics(Aborter.none);
    assert.notEqual(statisticsResponse.shareUsage, undefined);
  });

  it("create snapshot", async () => {
    const metadata = { key1: "value1", key2: "value2" };
    const createSnapshotResponse = await shareURL.createSnapshot(Aborter.none, {
      metadata
    });

    assert.notEqual(createSnapshotResponse.snapshot, undefined);
    const sanpshot = createSnapshotResponse.snapshot!;
    const snapshotShareURL = shareURL.withSnapshot(sanpshot);

    const snapshotProperties = await snapshotShareURL.getProperties(
      Aborter.none
    );
    assert.deepStrictEqual(snapshotProperties.metadata, metadata);

    const originProperties = await shareURL.getProperties(Aborter.none);
    assert.notDeepStrictEqual(originProperties.metadata, metadata);

    await snapshotShareURL.delete(Aborter.none, {});
  });
});
