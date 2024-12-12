// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as fs from "node:fs";
import * as path from "node:path";
import { BlobServiceClient, ContainerClient, BlobClient } from "@azure/storage-blob";
import { SegmentFactory } from "../src/SegmentFactory.js";
import { Segment } from "../src/Segment.js";
import { ChangeFeedFactory } from "../src/ChangeFeedFactory.js";
import { getHost } from "../src/utils/utils.common.js";
import type { BlobChangeFeedEvent } from "../src/index.js";
import { describe, it, assert, vi, beforeEach, afterEach, expect } from "vitest";
import type { MockedObject } from "vitest";

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

  vi.mock("@azure/storage-blob", async (importActual) => {
    const actual = await importActual();
    return {
      ...(actual as any),
      BlobServiceClient: vi.fn(),
      ContainerClient: vi.fn(),
      BlobClient: vi.fn(),
    };
  });

  let serviceClientStub: MockedObject<BlobServiceClient>;
  let segmentFactoryStub: MockedObject<SegmentFactory>;
  let containerClientStub: MockedObject<ContainerClient>;
  let segmentStubs: MockedObject<Segment>[];
  let changeFeedFactory: ChangeFeedFactory;
  let blobClientStub: MockedObject<BlobClient>;

  async function* fakeList(items: any[]): AsyncGenerator<any, void, unknown> {
    for (const item of items) {
      yield item;
    }
  }

  async function* listTwoArray(itemsA: any[], itemsB: any[]): AsyncGenerator<any, void, unknown> {
    for (const item of itemsA) {
      yield item;
    }
    for (const item of itemsB) {
      yield item;
    }
  }

  beforeEach(async () => {
    serviceClientStub = vi.mocked(new BlobServiceClient(expect.anything()), true);
    containerClientStub = vi.mocked(new ContainerClient(expect.anything()), true);
    blobClientStub = vi.mocked(new BlobClient(expect.anything()), true);
    segmentFactoryStub = vi.mocked(new SegmentFactory(expect.anything()), true);
    changeFeedFactory = new ChangeFeedFactory(segmentFactoryStub as any);

    serviceClientStub.getContainerClient = vi.fn().mockReturnValue(containerClientStub as any);
    containerClientStub.exists = vi.fn().mockResolvedValue(true);
    containerClientStub.getBlobClient = vi.fn().mockReturnValue(blobClientStub as any);

    containerClientStub.listBlobsByHierarchy = vi.fn().mockImplementation((prefix) => {
      if (prefix === "/") {
        return fakeList(yearPaths) as any;
      }
      return fakeList([]) as any;
    });

    containerClientStub.listBlobsFlat = vi.fn().mockImplementation((options) => {
      if (options?.prefix === "idx/segments/2019/") {
        return fakeList(segmentsIn2019) as any;
      }
      if (options?.prefix === "idx/segments/2020/") {
        return fakeList(segmentsIn2020) as any;
      }
      return fakeList([]) as any;
    });

    // TODO: rewrite for browser
    blobClientStub.download = vi.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({ readableStreamBody: fs.createReadStream(manifestFilePath) } as any);
      });
    });

    segmentStubs = [];
    const segmentIter = listTwoArray(segmentsIn2019, segmentsIn2020);
    for (let i = 0; i < segmentCount; i++) {
      segmentStubs.push(
        vi.mocked(
          new Segment(expect.anything(), expect.anything(), expect.anything(), expect.anything()),
          true,
        ),
      );
      segmentFactoryStub.create = vi.fn().mockImplementationOnce(async () => {
        await segmentIter.next();
        return segmentStubs[i];
      });
    }
    for (let i = 0; i < segmentCount; i++) {
      vi.spyOn(segmentStubs[i] as any, "dateTime").mockReturnValue(segmentTimes[i]);
      segmentStubs[i].hasNext = vi.fn().mockReturnValueOnce(true);
      segmentStubs[i].getChange = vi.fn().mockReturnValue(i as any);
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("no valid years in change feed container", async () => {
    const newYearPaths = [{ kind: "prefix", name: "idx/segments/1601/" }];
    containerClientStub.listBlobsByHierarchy = vi.fn().mockImplementation((delimiter) => {
      if (delimiter === "/") {
        return fakeList(newYearPaths) as any;
      }
      return fakeList([]) as any;
    });

    const changeFeed = await changeFeedFactory.create(serviceClientStub as any);
    assert.ok(!changeFeed.hasNext());
  });

  it("no years after start time", async () => {
    const newYearPaths = [
      { kind: "prefix", name: "idx/segments/1601/" },
      { kind: "prefix", name: "idx/segments/2019/" },
    ];

    containerClientStub.listBlobsByHierarchy = vi.fn().mockImplementation((delimiter) => {
      if (delimiter === "/") {
        return fakeList(newYearPaths) as any;
      }
      return fakeList([]) as any;
    });

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

    containerClientStub.listBlobsByHierarchy = vi.fn().mockImplementation((delimiter) => {
      if (delimiter === "/") {
        return fakeList(newYearPaths) as any;
      }
      return fakeList([]) as any;
    });

    const segments = [
      { name: "idx/segments/2019/03/02/2000/meta.json" },
      { name: "idx/segments/2019/04/03/2200/meta.json" },
    ];
    containerClientStub.listBlobsFlat = vi.fn().mockReturnValue(fakeList(segments) as any);

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
      segmentStubs[i].hasNext = vi.fn().mockReturnValueOnce(false);
      segmentStubs[i].getChange = vi.fn().mockResolvedValueOnce(undefined);
    }
    assert.ok(changeFeed.hasNext());
    const event2 = await changeFeed.getChange();
    assert.equal(event2, 2 as unknown as BlobChangeFeedEvent | undefined);

    // advanced to next year
    segmentStubs[2].hasNext = vi.fn().mockReturnValue(false);
    segmentStubs[2].getChange = vi.fn().mockResolvedValue(undefined);
    assert.ok(changeFeed.hasNext());
    const event3 = await changeFeed.getChange();
    assert.equal(event3, 3 as unknown as BlobChangeFeedEvent | undefined);

    // stop when segment time is no less than lastConsumable
    segmentStubs[3].hasNext = vi.fn().mockReturnValue(false);
    segmentStubs[3].getChange = vi.fn().mockResolvedValue(undefined);
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

    segmentStubs[1].hasNext = vi.fn().mockReturnValue(false);
    segmentStubs[1].getChange = vi.fn().mockResolvedValue(undefined);
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

    segmentStubs[3].getCursor = vi.fn().mockReturnValue({
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
    blobClientStub.download.mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({ readableStreamBody: fs.createReadStream(manifestFilePath2) } as any);
      });
    });
    segmentStubs[3].hasNext = vi.fn().mockReturnValue(false);
    segmentStubs[3].getChange = vi.fn().mockResolvedValue(undefined);
    const changeFeed3 = await changeFeedFactory.create(serviceClientStub as any, continuation);
    assert.ok(changeFeed3.hasNext());
    const event2 = await changeFeed3.getChange();
    assert.equal(event2, 4 as unknown as BlobChangeFeedEvent | undefined);
  });

  it("getChange - no meta", async () => {
    blobClientStub.download.mockImplementation(() => {
      throw {
        statusCode: 404,
      };
    });
    const changeFeed = await changeFeedFactory.create(serviceClientStub as any, undefined);
    assert.ok(!changeFeed.hasNext(), "Should return empty change feed");
  });
});
