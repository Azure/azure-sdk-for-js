import * as assert from "assert";
import { ShareURL } from "../src/ShareURL";
import { getBSU, getUniqueName } from "./utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("ShareURL", () => {
  const serviceURL = getBSU();
  let shareName: string = getUniqueName("share");
  let shareURL = ShareURL.fromServiceURL(serviceURL, shareName);

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create();
  });

  afterEach(async () => {
    await shareURL.delete();
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await shareURL.setMetadata(metadata);

    const result = await shareURL.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("getProperties", async () => {
    const result = await shareURL.getProperties();
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
    const shareURL2 = ShareURL.fromServiceURL(serviceURL, getUniqueName(shareName));
    const metadata = { key: "value" };
    await shareURL2.create({ metadata });
    const result = await shareURL2.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("delete", (done) => {
    // delete() with default parameters has been tested in afterEach
    done();
  });

  it("setQuota", async () => {
    const quotaInGB = 20;
    await shareURL.setQuota(quotaInGB);
    const propertiesResponse = await shareURL.getProperties();
    assert.equal(propertiesResponse.quota, quotaInGB);
  });

  it("getStatistics", async () => {
    const statisticsResponse = await shareURL.getStatistics();
    assert.notEqual(statisticsResponse.shareUsage, undefined);
  });

  it("create snapshot", async () => {
    const metadata = { key1: "value1", key2: "value2" };
    const createSnapshotResponse = await shareURL.createSnapshot({
      metadata
    });

    assert.notEqual(createSnapshotResponse.snapshot, undefined);
    const sanpshot = createSnapshotResponse.snapshot!;
    const snapshotShareURL = shareURL.withSnapshot(sanpshot);

    const snapshotProperties = await snapshotShareURL.getProperties();
    assert.deepStrictEqual(snapshotProperties.metadata, metadata);

    const originProperties = await shareURL.getProperties();
    assert.notDeepStrictEqual(originProperties.metadata, metadata);

    await snapshotShareURL.delete({});
  });
});
