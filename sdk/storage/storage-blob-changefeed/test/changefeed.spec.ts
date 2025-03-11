// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as fs from "node:fs";
import * as path from "node:path";
import { ChangeFeedFactory } from "../src/ChangeFeedFactory.js";
import { getHost } from "../src/utils/utils.common.js";
import type { BlobChangeFeedEvent } from "../src/index.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@azure/storage-blob", async (importActual) => {
  const BlobServiceClient = vi.fn();
  BlobServiceClient.prototype.getContainerClient = vi.fn();

  const ContainerClient = vi.fn();
  ContainerClient.prototype.exists = vi.fn();
  ContainerClient.prototype.getBlobClient = vi.fn();
  ContainerClient.prototype.listBlobsByHierarchy = vi.fn();
  ContainerClient.prototype.listBlobsFlat = vi.fn();

  const BlobClient = vi.fn();
  BlobClient.prototype.download = vi.fn();

  const actual = await importActual<typeof import("@azure/storage-blob")>();

  return {
    ...actual,
    BlobServiceClient,
    ContainerClient,
    BlobClient,
  };
});

vi.mock("../src/SegmentFactory.js", async (importActual) => {
  const SegmentFactory = vi.fn();
  SegmentFactory.prototype.create = vi.fn();

  const actual = await importActual<typeof import("../src/SegmentFactory.js")>();

  return {
    ...actual,
    SegmentFactory,
  };
});

vi.mock("../src/Segment.js", async (importActual) => {
  const Segment = vi.fn();
  Segment.prototype.hasNext = vi.fn();
  Segment.prototype.getChange = vi.fn();
  Segment.prototype.getCursor = vi.fn();
  Segment.prototype.dateTime = vi.fn();

  const actual = await importActual<typeof import("../src/Segment.js")>();

  return {
    ...actual,
    Segment,
  };
});

import { BlobServiceClient, ContainerClient, BlobClient } from "@azure/storage-blob";
import { SegmentFactory } from "../src/SegmentFactory.js";
import { Segment } from "../src/Segment.js";

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

  let serviceClientStub: BlobServiceClient;
  let segmentFactoryStub: SegmentFactory;
  let containerClientStub: ContainerClient;
  let segmentStubs: Segment[];
  let changeFeedFactory: ChangeFeedFactory;
  let blobClientStub: BlobClient;

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
    serviceClientStub = new BlobServiceClient(expect.anything());
    containerClientStub = new ContainerClient(expect.anything());
    blobClientStub = new BlobClient(expect.anything());
    segmentFactoryStub = new SegmentFactory(expect.anything());
    changeFeedFactory = new ChangeFeedFactory(segmentFactoryStub);

    vi.mocked(serviceClientStub.getContainerClient).mockReturnValue(containerClientStub);
    vi.mocked(containerClientStub.exists).mockResolvedValue(true);
    vi.mocked(containerClientStub.getBlobClient).mockReturnValue(blobClientStub);
    vi.mocked(containerClientStub.listBlobsByHierarchy).mockImplementation((delimiter?: string) => {
      if (delimiter === "/") {
        return fakeList(yearPaths) as any;
      }
      return fakeList([]) as any;
    });
    vi.mocked(containerClientStub.listBlobsFlat).mockImplementation((options) => {
      if (options?.prefix === "idx/segments/2019/") {
        return fakeList(segmentsIn2019) as any;
      }
      if (options?.prefix === "idx/segments/2020/") {
        return fakeList(segmentsIn2020) as any;
      }
      return fakeList([]) as any;
    });
    // TODO: rewrite for browser
    vi.mocked(blobClientStub.download).mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({ readableStreamBody: fs.createReadStream(manifestFilePath) } as any);
      });
    });

    segmentStubs = [];
    const segmentIter = listTwoArray(segmentsIn2019, segmentsIn2020);
    for (let i = 0; i < segmentCount; i++) {
      const segment = new Segment(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );
      segmentStubs.push(segment);
      vi.mocked(segmentFactoryStub.create).mockImplementation(async (_, manifestPath) => {
        if ((await segmentIter.next()).value.name === manifestPath) {
          return segmentStubs[i];
        } else {
          return new Segment(
            expect.anything(),
            expect.anything(),
            expect.anything(),
            expect.anything(),
          );
        }
      });
    }
    for (let i = 0; i < segmentCount; i++) {
      vi.spyOn(segmentStubs[i], "dateTime", "get").mockReturnValue(segmentTimes[i]);
      vi.mocked(segmentStubs[i].hasNext).mockReturnValue(true);
      vi.mocked(segmentStubs[i].getChange).mockResolvedValue(i as any);
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("no valid years in change feed container", async () => {
    const newYearPaths = [{ kind: "prefix", name: "idx/segments/1601/" }];
    vi.mocked(containerClientStub.listBlobsByHierarchy).mockImplementation((delimiter?: string) => {
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
    vi.mocked(containerClientStub.listBlobsByHierarchy).mockImplementation((delimiter?: string) => {
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
    vi.mocked(containerClientStub.listBlobsByHierarchy).mockImplementation((delimiter?: string) => {
      if (delimiter === "/") {
        return fakeList(newYearPaths) as any;
      }
      return fakeList([]) as any;
    });

    const segments = [
      { name: "idx/segments/2019/03/02/2000/meta.json" },
      { name: "idx/segments/2019/04/03/2200/meta.json" },
    ];
    vi.mocked(containerClientStub.listBlobsFlat).mockImplementation((options) => {
      if (options?.prefix === "idx/segments/2019/") {
        return fakeList(segments) as any;
      }
      return fakeList([]) as any;
    });

    const changeFeed = await changeFeedFactory.create(serviceClientStub, undefined, {
      start: new Date(Date.UTC(2019, 5)),
    });
    assert.ok(!changeFeed.hasNext());
  });

  it("getChange", async () => {
    const changeFeed = await changeFeedFactory.create(serviceClientStub, undefined, {
      start: new Date(Date.UTC(2019, 0)),
    });
    assert.ok(changeFeed.hasNext());

    const event = await changeFeed.getChange();
    assert.equal(event, 0 as unknown as BlobChangeFeedEvent | undefined);

    // advance to next non-empty segment
    for (let i = 0; i < 2; i++) {
      vi.mocked(segmentStubs[i].hasNext).mockReturnValue(false);
      vi.mocked(segmentStubs[i].getChange).mockResolvedValue(undefined);
    }
    assert.ok(changeFeed.hasNext());
    const event2 = await changeFeed.getChange();
    assert.equal(event2, 2 as unknown as BlobChangeFeedEvent | undefined);

    // advanced to next year
    vi.mocked(segmentStubs[2].hasNext).mockReturnValue(false);
    vi.mocked(segmentStubs[2].getChange).mockResolvedValue(undefined);
    assert.ok(changeFeed.hasNext());
    const event3 = await changeFeed.getChange();
    assert.equal(event3, 3 as unknown as BlobChangeFeedEvent | undefined);

    // stop when segment time is no less than lastConsumable
    vi.mocked(segmentStubs[3].hasNext).mockReturnValue(false);
    vi.mocked(segmentStubs[3].getChange).mockResolvedValue(undefined);
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

    vi.mocked(segmentStubs[1].hasNext).mockReturnValue(false);
    vi.mocked(segmentStubs[1].getChange).mockResolvedValue(undefined);
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

    vi.mocked(segmentStubs[3].getCursor).mockReturnValue({
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
    vi.mocked(blobClientStub.download).mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({ readableStreamBody: fs.createReadStream(manifestFilePath2) } as any);
      });
    });
    vi.mocked(segmentStubs[3].hasNext).mockReturnValue(false);
    vi.mocked(segmentStubs[3].getChange).mockResolvedValue(undefined);
    const changeFeed3 = await changeFeedFactory.create(serviceClientStub as any, continuation);
    assert.ok(changeFeed3.hasNext());
    const event2 = await changeFeed3.getChange();
    assert.equal(event2, 4 as unknown as BlobChangeFeedEvent | undefined);
  });

  it("getChange - no meta", async () => {
    vi.mocked(blobClientStub.download).mockImplementation(() => {
      throw {
        statusCode: 404,
      };
    });
    const changeFeed = await changeFeedFactory.create(serviceClientStub as any, undefined);
    assert.ok(!changeFeed.hasNext(), "Should return empty change feed");
  });
});
