// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as fs from "fs";
import * as path from "path";
import * as sinon from "sinon";
import { BlobServiceClient, ContainerClient, BlobClient } from "@azure/storage-blob";
import { SegmentFactory } from "../src/SegmentFactory";
import { Segment } from "../src/Segment";
import { ChangeFeedFactory } from "../src/ChangeFeedFactory";
import { getHost } from "../src/utils/utils.common";
import { BlobChangeFeedEvent } from "../src";

describe("Change Feed", async () => {
  const manifestFilePath = path.join("test", "resources", "ChangeFeedManifest.json");
  const manifestFilePath2 = path.join("test", "resources", "ChangeFeedManifest2.json");
  const lastConsumable = new Date("2020-05-04T19:00:00.000Z");
  const segmentCount = 5;
  const yearPaths = [
    { kind: "prefix", name: "idx/segments/1601/" },
    { kind: "prefix", name: "idx/segments/2019/" },
    { kind: "prefix", name: "idx/segments/2020/" },
  ];
  const segmentsIn2019 = [
    { name: "idx/segments/2019/03/02/2000/meta.json" },
    { name: "idx/segments/2019/04/03/2200/meta.json" },
    { name: "idx/segments/2019/05/03/2200/meta.json" },
  ];
  const segmentsIn2020 = [
    { name: "idx/segments/2020/03/02/2000/meta.json" },
    { name: "idx/segments/2020/05/04/1900/meta.json" },
  ];
  const segmentTimes = [
    new Date(Date.UTC(2019, 2, 2, 20)),
    new Date(Date.UTC(2019, 3, 3, 22)),
    new Date(Date.UTC(2019, 4, 3, 22)),
    new Date(Date.UTC(2020, 2, 2, 20)),
    new Date(Date.UTC(2020, 4, 4, 19)),
  ];
  let serviceClientStub: sinon.SinonStubbedInstance<BlobServiceClient>;
  let segmentFactoryStub: sinon.SinonStubbedInstance<SegmentFactory>;
  let containerClientStub: sinon.SinonStubbedInstance<ContainerClient>;
  let segmentStubs: sinon.SinonStubbedInstance<Segment>[];
  let changeFeedFactory: ChangeFeedFactory;
  let blobClientStub: sinon.SinonStubbedInstance<BlobClient>;

  async function* fakeList(items: any[]) {
    for (const item of items) {
      yield item;
    }
  }

  async function* listTwoArray(itemsA: any[], itemsB: any[]) {
    for (const item of itemsA) {
      yield item;
    }
    for (const item of itemsB) {
      yield item;
    }
  }

  beforeEach(async () => {
    serviceClientStub = sinon.createStubInstance(BlobServiceClient);
    containerClientStub = sinon.createStubInstance(ContainerClient);
    blobClientStub = sinon.createStubInstance(BlobClient);
    segmentFactoryStub = sinon.createStubInstance(SegmentFactory);
    changeFeedFactory = new ChangeFeedFactory(segmentFactoryStub as any);

    serviceClientStub.getContainerClient.returns(containerClientStub as any);
    containerClientStub.exists.resolves(true);
    containerClientStub.getBlobClient.returns(blobClientStub as any);
    containerClientStub.listBlobsByHierarchy
      .withArgs("/")
      .callsFake(() => fakeList(yearPaths) as any);
    containerClientStub.listBlobsFlat
      .withArgs(sinon.match({ prefix: "idx/segments/2019/" }))
      .callsFake(() => fakeList(segmentsIn2019) as any);
    containerClientStub.listBlobsFlat
      .withArgs(sinon.match({ prefix: "idx/segments/2020/" }))
      .callsFake(() => fakeList(segmentsIn2020) as any);
    // TODO: rewrite for browser
    blobClientStub.download.callsFake(() => {
      return new Promise((resolve) => {
        resolve({ readableStreamBody: fs.createReadStream(manifestFilePath) } as any);
      });
    });

    segmentStubs = [];
    const segmentIter = listTwoArray(segmentsIn2019, segmentsIn2020);
    for (let i = 0; i < segmentCount; i++) {
      segmentStubs.push(sinon.createStubInstance(Segment));
      segmentFactoryStub.create
        .withArgs(sinon.match.any, (await segmentIter.next()).value.name)
        .resolves(segmentStubs[i] as any);
    }
    for (let i = 0; i < segmentCount; i++) {
      sinon.stub(segmentStubs[i], "dateTime").value(segmentTimes[i]);
      segmentStubs[i].hasNext.returns(true);
      segmentStubs[i].getChange.resolves(i as any);
    }
  });

  afterEach(() => {
    sinon.restore();
  });

  it("no valid years in change feed container", async () => {
    const newYearPaths = [{ kind: "prefix", name: "idx/segments/1601/" }];
    containerClientStub.listBlobsByHierarchy.withArgs("/").returns(fakeList(newYearPaths) as any);
    const changeFeed = await changeFeedFactory.create(serviceClientStub as any);
    assert.ok(!changeFeed.hasNext());
  });

  it("no years after start time", async () => {
    const newYearPaths = [
      { kind: "prefix", name: "idx/segments/1601/" },
      { kind: "prefix", name: "idx/segments/2019/" },
    ];
    containerClientStub.listBlobsByHierarchy.withArgs("/").returns(fakeList(newYearPaths) as any);
    const changeFeed = await changeFeedFactory.create(serviceClientStub as any, undefined, {
      start: new Date(Date.UTC(2020, 0)),
    });
    assert.ok(!changeFeed.hasNext());
  });

  it("no segments remaining in start year", async () => {
    const newYearPaths = [
      { kind: "prefix", name: "idx/segments/1601/" },
      { kind: "prefix", name: "idx/segments/2019/" },
    ];
    containerClientStub.listBlobsByHierarchy.withArgs("/").returns(fakeList(newYearPaths) as any);

    const segments = [
      { name: "idx/segments/2019/03/02/2000/meta.json" },
      { name: "idx/segments/2019/04/03/2200/meta.json" },
    ];
    containerClientStub.listBlobsFlat.returns(fakeList(segments) as any);

    const changeFeed = await changeFeedFactory.create(serviceClientStub as any, undefined, {
      start: new Date(Date.UTC(2019, 5)),
    });
    assert.ok(!changeFeed.hasNext());
  });

  it("getChange", async () => {
    const changeFeed = await changeFeedFactory.create(serviceClientStub as any, undefined, {
      start: new Date(Date.UTC(2019, 0)),
    });
    assert.ok(changeFeed.hasNext());

    const event = await changeFeed.getChange();
    assert.equal(event, 0 as unknown as BlobChangeFeedEvent | undefined);

    // advance to next non-empty segment
    for (let i = 0; i < 2; i++) {
      segmentStubs[i].hasNext.returns(false);
      segmentStubs[i].getChange.resolves(undefined);
    }
    assert.ok(changeFeed.hasNext());
    const event2 = await changeFeed.getChange();
    assert.equal(event2, 2 as unknown as BlobChangeFeedEvent | undefined);

    // advanced to next year
    segmentStubs[2].hasNext.returns(false);
    segmentStubs[2].getChange.resolves(undefined);
    assert.ok(changeFeed.hasNext());
    const event3 = await changeFeed.getChange();
    assert.equal(event3, 3 as unknown as BlobChangeFeedEvent | undefined);

    // stop when segment time is no less than lastConsumable
    segmentStubs[3].hasNext.returns(false);
    segmentStubs[3].getChange.resolves(undefined);
    const event4 = await changeFeed.getChange();
    assert.equal(event4, undefined);
    assert.ok(!changeFeed.hasNext());
  });

  it("with start and end time", async () => {
    // no valid segment between start and end
    const changeFeed = await changeFeedFactory.create(serviceClientStub as any, undefined, {
      start: new Date(Date.UTC(2019, 2, 2, 21)),
      end: new Date(Date.UTC(2019, 3, 3, 22)),
    });
    assert.ok(!changeFeed.hasNext());

    // end earlier than lastConsumable
    const changeFeed2 = await changeFeedFactory.create(serviceClientStub as any, undefined, {
      start: new Date(Date.UTC(2019, 3, 3, 22)),
      end: new Date(Date.UTC(2019, 4, 3, 22)),
    });
    assert.ok(changeFeed2.hasNext());
    const event = await changeFeed2.getChange();
    assert.equal(event, 1 as unknown as BlobChangeFeedEvent | undefined);

    segmentStubs[1].hasNext.returns(false);
    segmentStubs[1].getChange.resolves(undefined);
    const event2 = await changeFeed2.getChange();
    assert.equal(event2, undefined);

    // end later than lastConsumable
    const changeFeed3 = await changeFeedFactory.create(serviceClientStub as any, undefined, {
      start: lastConsumable,
      end: new Date(lastConsumable.getTime() + 1),
    });
    assert.ok(!changeFeed3.hasNext());
  });

  it("with continuation token", async () => {
    const changeFeed = await changeFeedFactory.create(serviceClientStub as any, undefined, {
      start: new Date(Date.UTC(2020, 2, 2, 20)),
    });
    assert.ok(changeFeed.hasNext());

    const containerUri = "https://account.blob.core.windows.net/$blobchangefeed";
    (containerClientStub as any).url = containerUri;
    const cursor = changeFeed.getCursor();
    assert.deepStrictEqual(cursor.UrlHost, getHost(containerUri));

    segmentStubs[3].getCursor.returns({
      ShardCursors: [],
      SegmentPath: "idx/segments/2020/02/2/2000/meta.json",
      CurrentShardPath: "",
    });
    const continuation = JSON.stringify(changeFeed.getCursor());
    const changeFeed2 = await changeFeedFactory.create(serviceClientStub as any, continuation);
    assert.ok(changeFeed2.hasNext());
    const event = await changeFeed.getChange();
    assert.equal(event, 3 as unknown as BlobChangeFeedEvent | undefined);

    // lastConsumable changed
    blobClientStub.download.callsFake(() => {
      return new Promise((resolve) => {
        resolve({ readableStreamBody: fs.createReadStream(manifestFilePath2) } as any);
      });
    });
    segmentStubs[3].hasNext.returns(false);
    segmentStubs[3].getChange.resolves(undefined);
    const changeFeed3 = await changeFeedFactory.create(serviceClientStub as any, continuation);
    assert.ok(changeFeed3.hasNext());
    const event2 = await changeFeed3.getChange();
    assert.equal(event2, 4 as unknown as BlobChangeFeedEvent | undefined);
  });

  it("getChange - no meta", async () => {
    blobClientStub.download.callsFake(() => {
      throw {
        statusCode: 404,
      };
    });
    const changeFeed = await changeFeedFactory.create(serviceClientStub as any, undefined);
    assert.ok(!changeFeed.hasNext(), "Should return empty change feed");
  });
});
