// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ChangeFeedForEpkRange,
  ChangeFeedIteratorResponse,
  ChangeFeedMode,
} from "$internal/client/ChangeFeed/index.js";
import type { ClientContext } from "@azure/cosmos";
import { Constants, Container, ErrorResponse, StatusCodes, TimeoutError } from "@azure/cosmos";
import { PartitionKeyRangeCache, QueryRange } from "$internal/routing/index.js";
import { ChangeFeedRange } from "$internal/client/ChangeFeed/ChangeFeedRange.js";
import { MockedClientContext } from "../../../public/common/MockClientContext.js";
import { describe, it, assert, expect, beforeEach, afterEach, vi } from "vitest";
import { getEmptyCosmosDiagnostics } from "$internal/utils/diagnostics.js";
import { SubStatusCodes } from "$internal/common/statusCodes.js";
import { FeedRangeQueue } from "$internal/client/ChangeFeed/FeedRangeQueue.js";

interface Resource {
  id: string;
  [key: string]: any;
}

vi.mock("@azure/cosmos", async (importActual) => {
  const ContainerMock = vi.fn();

  const actual = await importActual<typeof import("@azure/cosmos")>();
  return {
    ...actual,
    Container: ContainerMock,
  };
});

class MockClientContext extends MockedClientContext {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(partitionKeyRanges: unknown) {
    super(partitionKeyRanges);
  }
  public queryFeed(): unknown {
    throw new TimeoutError();
  }
  public getClientConfig(): unknown {
    return {};
  }
  public recordDiagnostics(): void {
    return;
  }
}

describe("ChangeFeedForEpkRange Unit Tests", () => {
  const partitionKeyRanges = [{ id: "0", minInclusive: "", maxExclusive: "FF" }];

  const clientContext: ClientContext = new MockClientContext(partitionKeyRanges) as any;
  const partitionKeyRangeCache = new PartitionKeyRangeCache(clientContext);
  let container: Container;
  let changeFeedForEpkRange: ChangeFeedForEpkRange<Resource>;

  beforeEach(() => {
    container = new Container(expect.anything(), expect.anything(), expect.anything());

    // Initialize ChangeFeedForEpkRange instance with mocked dependencies
    changeFeedForEpkRange = new ChangeFeedForEpkRange<Resource>(
      clientContext,
      container,
      partitionKeyRangeCache as PartitionKeyRangeCache,
      "resource-id",
      "/dbs/db/colls/coll",
      "https://localhost:8081/dbs/db/colls/coll",
      {
        continuationToken: undefined,
        startFromNow: false,
        startTime: undefined,
        changeFeedMode: ChangeFeedMode.LatestVersion,
        maxItemCount: 10,
        sessionToken: "session-token",
      },
      new QueryRange("", "FF", true, false),
    );

    vi.spyOn(changeFeedForEpkRange as any, "setIteratorRid").mockResolvedValue(undefined);
    vi.spyOn(changeFeedForEpkRange as any, "fillChangeFeedQueue").mockResolvedValue(undefined);
    (changeFeedForEpkRange as any).isInstantiated = true;

    const mockFeedRange = new ChangeFeedRange("", "FF", "abc");
    (changeFeedForEpkRange as any).queue.enqueue(mockFeedRange);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should throw TimeOutError instead of handling it internally", async () => {
    const timeOutError = new TimeoutError();

    try {
      await changeFeedForEpkRange.readNext();
      assert.fail("should throw exception");
    } catch (err) {
      assert(err instanceof ErrorResponse);
      assert.strictEqual(err.message, "Timeout Error");
      assert.strictEqual(err.code, timeOutError.code);
    }
  });

  it("should handle partition split into three ranges and retry accordingly", async () => {
    // first call: return 410/Gone to trigger shouldRetryOnFailure
    const queue: FeedRangeQueue<ChangeFeedRange> = new FeedRangeQueue();
    queue.enqueue(new ChangeFeedRange("", "DD", "cont1"));
    queue.enqueue(new ChangeFeedRange("DD", "FF", "cont2"));
    (changeFeedForEpkRange as any).queue = queue;

    const goneResp = new ChangeFeedIteratorResponse(
      [],
      0,
      StatusCodes.Gone,
      { [Constants.HttpHeaders.ETag]: "" },
      getEmptyCosmosDiagnostics(),
      SubStatusCodes.PartitionKeyRangeGone,
    );
    // second call: return OK
    const okResp = new ChangeFeedIteratorResponse(
      [{ id: "ok" }],
      1,
      StatusCodes.Ok,
      {},
      getEmptyCosmosDiagnostics(),
    );
    const feedSpy = vi
      .spyOn(changeFeedForEpkRange as any, "getFeedResponse")
      .mockResolvedValueOnce(goneResp)
      .mockResolvedValueOnce(okResp);

    // simulate three child ranges when shouldRetryOnFailure calls getOverlappingRanges
    vi.spyOn(partitionKeyRangeCache, "getOverlappingRanges").mockResolvedValue([
      {
        id: "1",
        minInclusive: "",
        maxExclusive: "AA",
        ridPrefix: 0,
        throughputFraction: 0,
        status: "",
        parents: [],
      },
      {
        id: "2",
        minInclusive: "AA",
        maxExclusive: "BB",
        ridPrefix: 0,
        throughputFraction: 0,
        status: "",
        parents: [],
      },
      {
        id: "3",
        minInclusive: "BB",
        maxExclusive: "DD",
        ridPrefix: 0,
        throughputFraction: 0,
        status: "",
        parents: [],
      },
    ]);

    const result = await changeFeedForEpkRange.readNext();

    // ensure getFeedResponse was called twice (first Gone, then Ok)
    expect(feedSpy).toHaveBeenCalledTimes(2);

    // verify the queue snapshot now has all three new feed‐ranges
    const snapshot = (changeFeedForEpkRange as any).queue.returnSnapshot();
    const ranges = snapshot.map((f: ChangeFeedRange) => [f.minInclusive, f.maxExclusive]);
    expect(ranges).toEqual([
      ["", "AA"],
      ["AA", "BB"],
      ["BB", "DD"],
      ["DD", "FF"],
    ]);
    // final result should be the OK response
    expect(result.statusCode).toBe(StatusCodes.Ok);
  });

  it("should modify first element when shiftLeft=true in handleSplitOrMerge", async () => {
    // replace queue with a single original feed range
    (changeFeedForEpkRange as any).queue = new FeedRangeQueue<ChangeFeedRange>();
    const queue: FeedRangeQueue<ChangeFeedRange> = new FeedRangeQueue();
    queue.enqueue(new ChangeFeedRange("", "DD", "cont1"));
    queue.enqueue(new ChangeFeedRange("DD", "FF", "cont2"));
    (changeFeedForEpkRange as any).queue = queue;
    // prepare three resolved ranges
    const resolvedRanges = [
      { minInclusive: "", maxExclusive: "AA" },
      { minInclusive: "AA", maxExclusive: "BB" },
      { minInclusive: "BB", maxExclusive: "DD" },
    ];
    const oldQueryRange = new QueryRange("", "DD", true, false);

    // invoke handleSplitOrMerge with shiftLeft=true
    await (changeFeedForEpkRange as any).handleSplitOrMerge(
      true,
      resolvedRanges,
      oldQueryRange,
      "newCont",
    );

    const queueSnapshot = (changeFeedForEpkRange as any).queue.returnSnapshot();
    const ranges = queueSnapshot.map((f: ChangeFeedRange) => [f.minInclusive, f.maxExclusive]);
    expect(ranges).toEqual([
      ["", "AA"],
      ["DD", "FF"],
      ["AA", "BB"],
      ["BB", "DD"],
    ]);
  });

  it("should handle partition merge retry accordingly", async () => {
    // first call: return 410/Gone to trigger shouldRetryOnFailure
    const queue: FeedRangeQueue<ChangeFeedRange> = new FeedRangeQueue();
    queue.enqueue(new ChangeFeedRange("", "DD", "cont1"));
    queue.enqueue(new ChangeFeedRange("DD", "FF", "cont2"));
    (changeFeedForEpkRange as any).queue = queue;

    const goneResp = new ChangeFeedIteratorResponse(
      [],
      0,
      StatusCodes.Gone,
      { [Constants.HttpHeaders.ETag]: "" },
      getEmptyCosmosDiagnostics(),
      SubStatusCodes.PartitionKeyRangeGone,
    );
    // second call: return OK
    const okResp = new ChangeFeedIteratorResponse(
      [{ id: "ok" }],
      1,
      StatusCodes.Ok,
      {},
      getEmptyCosmosDiagnostics(),
    );
    const feedSpy = vi
      .spyOn(changeFeedForEpkRange as any, "getFeedResponse")
      .mockResolvedValueOnce(goneResp)
      .mockResolvedValueOnce(goneResp)
      .mockResolvedValueOnce(okResp);

    vi.spyOn(partitionKeyRangeCache, "getOverlappingRanges").mockResolvedValue([
      {
        id: "1",
        minInclusive: "",
        maxExclusive: "FF",
        ridPrefix: 0,
        throughputFraction: 0,
        status: "",
        parents: [],
      },
    ]);

    await changeFeedForEpkRange.readNext();

    // ensure getFeedResponse was called thrice
    expect(feedSpy).toHaveBeenCalledTimes(3);
    // verify the queue snapshot now has updated feed‐ranges
    const queueFirstResult = (changeFeedForEpkRange as any).queue.dequeue();
    const queueSecondResult = (changeFeedForEpkRange as any).queue.dequeue();
    expect(queueFirstResult).toEqual({
      minInclusive: "",
      maxExclusive: "FF",
      continuationToken: "cont2",
      epkMinHeader: "DD",
      epkMaxHeader: "FF",
    });
    expect(queueSecondResult).toEqual({
      minInclusive: "",
      maxExclusive: "FF",
      continuationToken: undefined,
      epkMinHeader: "",
      epkMaxHeader: "DD",
    });
  });

  it("should modify first element with merge when shiftLeft=true in handleSplitOrMerge", async () => {
    (changeFeedForEpkRange as any).queue = new FeedRangeQueue<ChangeFeedRange>();
    const queue: FeedRangeQueue<ChangeFeedRange> = new FeedRangeQueue();
    queue.enqueue(new ChangeFeedRange("", "DD", "cont1"));
    queue.enqueue(new ChangeFeedRange("DD", "FF", "cont2"));
    (changeFeedForEpkRange as any).queue = queue;
    // prepare three resolved ranges
    const resolvedRanges = [{ minInclusive: "", maxExclusive: "FF" }];
    const oldQueryRange = new QueryRange("", "DD", true, false);

    // invoke handleSplitOrMerge with shiftLeft=true
    await (changeFeedForEpkRange as any).handleSplitOrMerge(
      true,
      resolvedRanges,
      oldQueryRange,
      "newCont",
    );
    const queueFirstResult = (changeFeedForEpkRange as any).queue.dequeue();
    expect(queueFirstResult).toEqual({
      minInclusive: "",
      maxExclusive: "FF",
      continuationToken: "newCont",
      epkMinHeader: "",
      epkMaxHeader: "DD",
    });
    const queueSecondResult = (changeFeedForEpkRange as any).queue.dequeue();
    expect(queueSecondResult).toEqual({
      minInclusive: "DD",
      maxExclusive: "FF",
      continuationToken: "cont2",
      epkMinHeader: undefined,
      epkMaxHeader: undefined,
    });
  });
});
