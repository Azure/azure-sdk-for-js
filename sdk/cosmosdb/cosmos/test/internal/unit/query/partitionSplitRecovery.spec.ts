// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ClientContext,
  FeedOptions,
  PartitionKeyRange,
  Resource,
} from "../../../../src/index.js";
import {
  CosmosDbDiagnosticLevel,
  QueryIterator,
  ResourceType,
  StatusCodes,
} from "../../../../src/index.js";
import { SubStatusCodes } from "../../../../src/common/index.js";
import { OrderByQueryExecutionContext } from "../../../../src/queryExecutionContext/orderByQueryExecutionContext.js";
import { ParallelQueryExecutionContext } from "../../../../src/queryExecutionContext/parallelQueryExecutionContext.js";
import {
  createDummyDiagnosticNode,
  createTestClientContext,
} from "../../../public/common/TestHelpers.js";
import { assert, describe, expect, it, vi } from "vitest";

const collectionLink = "/dbs/testDb/colls/testCollection";
const query = "SELECT * FROM c";
const correlatedActivityId = "partition-split-recovery";
const parentRange = createRange("P", "", "FF");
const childRange1 = createRange("C1", "", "80", ["P"]);
const childRange2 = createRange("C2", "80", "FF", ["P"]);
const mergeParent1 = createRange("P1", "", "80");
const mergeParent2 = createRange("P2", "80", "FF");
const mergedRange = createRange("M", "", "FF", ["P1", "P2"]);
const splitChild1 = createRange("S1", "", "30", ["M"]);
const splitChild2 = createRange("S2", "30", "70", ["M"]);
const splitChild3 = createRange("S3", "70", "FF", ["M"]);
const queryInfo = createPartitionedQueryInfo("Parallel");
const options: FeedOptions = { maxItemCount: 2, maxDegreeOfParallelism: 1 };

interface TestDocument {
  id: string;
  source: string;
}

interface ObservedRequest {
  rangeId: string;
  startEpk?: string;
  endEpk?: string;
}

interface QueryControlError extends Error {
  cause?: Error;
  code?: number | string;
  headers?: Record<string, string | number>;
  originalError?: Error;
}

type QueryKind = "Parallel" | "ORDER BY";
type QueryContext = ParallelQueryExecutionContext | OrderByQueryExecutionContext;

function createRange(
  id: string,
  minInclusive: string,
  maxExclusive: string,
  parents: string[] = [],
): PartitionKeyRange {
  return {
    id,
    minInclusive,
    maxExclusive,
    ridPrefix: 0,
    throughputFraction: 1,
    status: "online",
    parents,
  };
}

function createSplitError(): Error & {
  code: number;
  substatus: number;
  headers: Record<string, string>;
} {
  return Object.assign(new Error("Partition key range is gone"), {
    code: StatusCodes.Gone,
    substatus: SubStatusCodes.PartitionKeyRangeGone,
    headers: { "x-ms-request-charge": "1" },
  });
}

function createClientContext(): ClientContext {
  return createTestClientContext(
    { endpoint: "https://localhost", key: "test-key" },
    CosmosDbDiagnosticLevel.info,
  );
}

function createPartitionedQueryInfo(queryType: QueryKind) {
  const isOrderBy = queryType === "ORDER BY";
  return {
    queryRanges: [{ min: "", max: "FF", isMinInclusive: true, isMaxInclusive: false }],
    queryInfo: {
      aggregates: [],
      distinctType: "None",
      groupByAliasToAggregateType: {},
      hasNonStreamingOrderBy: false,
      hasSelectValue: false,
      orderBy: isOrderBy ? ["Ascending"] : [],
      orderByExpressions: isOrderBy ? [{ expression: "c.value", type: "PropertyRef" }] : undefined,
      rewrittenQuery: isOrderBy
        ? 'SELECT c._rid, [{"item": c.value}] AS orderByItems, c AS payload ' +
          "FROM c WHERE {documentdb-formattableorderbyquery-filter} ORDER BY c.value"
        : undefined,
    },
    partitionedQueryExecutionInfoVersion: 1,
  };
}

function mockTopology(
  clientContext: ClientContext,
  snapshots: PartitionKeyRange[][],
): {
  getForceRefreshCount: () => number;
  getRequestCount: () => number;
} {
  let requestCount = 0;
  vi.spyOn(clientContext, "queryPartitionKeyRanges").mockImplementation(
    () =>
      ({
        fetchAllInternal: vi.fn(async () => {
          const snapshot = snapshots[Math.min(requestCount, snapshots.length - 1)];
          requestCount++;
          return {
            resources: snapshot,
            headers: { "x-ms-request-charge": "0" },
            code: StatusCodes.Ok,
          };
        }),
      }) as unknown as QueryIterator<PartitionKeyRange>,
  );
  const routingCacheSpy = vi.spyOn(clientContext.partitionKeyRangeCache, "onCollectionRoutingMap");
  return {
    getForceRefreshCount: () =>
      routingCacheSpy.mock.calls.filter((call) => call[2] === true).length,
    getRequestCount: () => requestCount,
  };
}

function createParallelContext(
  clientContext: ClientContext,
  feedOptions: FeedOptions = options,
): ParallelQueryExecutionContext {
  return new ParallelQueryExecutionContext(
    clientContext,
    collectionLink,
    query,
    feedOptions,
    queryInfo,
    correlatedActivityId,
  );
}

function createOrderByContext(
  clientContext: ClientContext,
  feedOptions: FeedOptions,
): OrderByQueryExecutionContext {
  return new OrderByQueryExecutionContext(
    clientContext,
    collectionLink,
    query,
    feedOptions,
    createPartitionedQueryInfo("ORDER BY"),
    correlatedActivityId,
  );
}

function createPublicIterator(
  clientContext: ClientContext,
  queryType: QueryKind,
): QueryIterator<TestDocument> {
  vi.spyOn(clientContext, "getQueryPlan").mockResolvedValue({
    result: createPartitionedQueryInfo(queryType),
    headers: {},
    code: StatusCodes.Ok,
  });
  return new QueryIterator<TestDocument>(
    clientContext,
    query,
    { ...options, forceQueryPlan: true },
    async () => ({ result: [] as unknown as Resource, headers: {} }),
    collectionLink,
    ResourceType.item,
  );
}

function createBackendResult(
  queryType: QueryKind,
  document: TestDocument,
  value: number,
): Resource {
  return (
    queryType === "Parallel"
      ? document
      : {
          _rid: `rid-${value}`,
          orderByItems: [{ item: value }],
          payload: document,
        }
  ) as Resource;
}

function createQueryControlOptions(queryType: QueryKind): FeedOptions {
  const rangeMappings = [
    {
      queryRange: { min: "", max: "FF" },
      continuationToken: "parent-continuation",
    },
  ];
  const continuationToken =
    queryType === "Parallel"
      ? { rangeMappings, rid: "container-rid" }
      : {
          documentRid: "previous-rid",
          orderByItems: [{ item: 0 }],
          rangeMappings,
          rid: "container-rid",
          skipCount: 0,
        };
  return {
    ...options,
    continuationToken: JSON.stringify(continuationToken),
    enableQueryControl: true,
  };
}

function spyOnReplacement(context: QueryContext): ReturnType<typeof vi.spyOn> {
  return vi.spyOn(
    context as unknown as {
      _enqueueReplacementDocumentProducers: (...args: unknown[]) => Promise<void>;
    },
    "_enqueueReplacementDocumentProducers",
  );
}

async function drainContext(context: QueryContext): Promise<{
  requestCharge: number;
  resources: TestDocument[];
}> {
  const resources: TestDocument[] = [];
  let iterations = 0;
  let requestCharge = 0;

  while (context.hasMoreResults()) {
    if (++iterations > 12) {
      throw new Error("Query iteration guard exceeded 12 fetches");
    }
    const response = await context.fetchMore(createDummyDiagnosticNode());
    requestCharge += Number(response.headers["x-ms-request-charge"] ?? 0);
    if (response.result?.buffer) {
      resources.push(...response.result.buffer);
    }
  }

  return { requestCharge, resources };
}

async function withTimeout<T>(promise: Promise<T>, timeoutInMs = 1000): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_resolve, reject) => {
    timeout = setTimeout(
      () => reject(new Error(`Query did not complete within ${timeoutInMs}ms`)),
      timeoutInMs,
    );
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

async function captureError(promise: Promise<unknown>): Promise<QueryControlError> {
  try {
    await promise;
    assert.fail("Expected query to fail");
  } catch (error: unknown) {
    assert.instanceOf(error, Error);
    return error as QueryControlError;
  }
}

async function runOneShotSplit(): Promise<{
  forceRefreshCount: number;
  parentRequestCount: number;
  replacementCount: number;
  requestCharge: number;
  requests: string[];
  resources: TestDocument[];
}> {
  const clientContext = createClientContext();
  const topology = mockTopology(clientContext, [[parentRange], [childRange1, childRange2]]);
  const requests: string[] = [];
  let parentRequestCount = 0;
  const expectedResources = [
    { id: "1", source: "C1" },
    { id: "2", source: "C2" },
  ];

  vi.spyOn(clientContext, "queryFeed").mockImplementation(
    async ({ partitionKeyRangeId, options: requestOptions }) => {
      const rangeId = partitionKeyRangeId ?? "none";
      requests.push(rangeId);
      if (requests.length > 6) {
        throw new Error(`Request guard exceeded: ${requests.join(",")}`);
      }
      if (rangeId === parentRange.id) {
        parentRequestCount++;
        if (parentRequestCount === 1) {
          return {
            result: [{ id: "0", source: "P" }] as unknown as Resource,
            headers: {
              "x-ms-continuation": "parent-continuation",
              "x-ms-request-charge": "4",
            },
            code: StatusCodes.Ok,
          };
        }
        if (parentRequestCount === 2) {
          throw createSplitError();
        }
        return {
          result: [{ id: "parent-replayed", source: "P" }] as unknown as Resource,
          headers: { "x-ms-request-charge": "10" },
          code: StatusCodes.Ok,
        };
      }

      assert.equal(requestOptions.continuationToken, "parent-continuation");
      const resource = expectedResources.find((item) => item.source === rangeId);
      assert.isDefined(resource, `Unexpected range request: ${rangeId}`);
      return {
        result: [resource] as unknown as Resource,
        headers: { "x-ms-request-charge": rangeId === "C1" ? "2" : "3" },
        code: StatusCodes.Ok,
      };
    },
  );

  const context = createParallelContext(clientContext);
  const replacementSpy = spyOnReplacement(context);
  const result = await withTimeout(drainContext(context));

  assert.isFalse(context.hasMoreResults());
  return {
    ...result,
    forceRefreshCount: topology.getForceRefreshCount(),
    parentRequestCount,
    replacementCount: replacementSpy.mock.calls.length,
    requests,
  };
}

describe("partition split recovery", () => {
  it("hides split-repair scheduling pages from public Parallel and ORDER BY fetchNext", async () => {
    for (const queryType of ["Parallel", "ORDER BY"] as const) {
      const clientContext = createClientContext();
      const topology = mockTopology(clientContext, [[parentRange], [childRange1, childRange2]]);
      const requests: string[] = [];
      let child1RequestCount = 0;
      vi.spyOn(clientContext, "queryFeed").mockImplementation(
        async ({ partitionKeyRangeId, options: requestOptions }) => {
          const rangeId = partitionKeyRangeId ?? "none";
          requests.push(rangeId);
          if (requests.length > 5) {
            throw new Error(`${queryType} public fetch request guard exceeded`);
          }
          if (rangeId === "P") {
            throw createSplitError();
          }
          if (rangeId === "C1" && ++child1RequestCount === 1) {
            return {
              result: [] as unknown as Resource,
              headers: { "x-ms-continuation": "c1-next", "x-ms-request-charge": "2" },
              code: StatusCodes.Ok,
            };
          }
          if (rangeId === "C1") {
            assert.equal(requestOptions.continuationToken, "c1-next", queryType);
          }
          const value = rangeId === "C1" ? 1 : 2;
          const document = { id: `${value}`, source: rangeId };
          return {
            result: [createBackendResult(queryType, document, value)] as unknown as Resource,
            headers: { "x-ms-request-charge": rangeId === "C1" ? "2" : "3" },
            code: StatusCodes.Ok,
          };
        },
      );

      const response = await withTimeout(
        createPublicIterator(clientContext, queryType).fetchNext(),
      );

      assert.deepEqual(
        response.resources,
        [
          { id: "1", source: "C1" },
          { id: "2", source: "C2" },
        ],
        queryType,
      );
      assert.deepEqual(requests, ["P", "C1", "C1", "C2"], queryType);
      assert.equal(response.requestCharge, 8, queryType);
      assert.isFalse(response.hasMoreResults, queryType);
      assert.equal(topology.getForceRefreshCount(), 1, queryType);
    }
  });

  it("preserves progress and does not replay a parent after a one-shot split", async () => {
    const result = await runOneShotSplit();

    assert.deepEqual(result.requests, ["P", "P", "C1", "C2"]);
    assert.deepEqual(result.resources, [
      { id: "0", source: "P" },
      { id: "1", source: "C1" },
      { id: "2", source: "C2" },
    ]);
    assert.notInclude(
      result.resources.map((item) => item.id),
      "parent-replayed",
    );
    assert.equal(result.parentRequestCount, 2);
    assert.equal(result.replacementCount, 1);
    assert.equal(result.forceRefreshCount, 1);
    assert.equal(result.requestCharge, 10);
  });

  it("stops internal split recovery when a replacement request is aborted", async () => {
    const clientContext = createClientContext();
    const topology = mockTopology(clientContext, [[parentRange], [childRange1, childRange2]]);
    const abortError = Object.assign(new Error("The operation was aborted"), {
      headers: { "x-ms-request-charge": "2" },
      name: "AbortError",
    });
    const requests: string[] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async ({ partitionKeyRangeId }) => {
      const rangeId = partitionKeyRangeId ?? "none";
      requests.push(rangeId);
      if (rangeId === "P") {
        throw createSplitError();
      }
      throw abortError;
    });

    const error = await captureError(
      withTimeout(createPublicIterator(clientContext, "Parallel").fetchNext()),
    );

    assert.strictEqual(error, abortError);
    assert.deepEqual(requests, ["P", "C1"]);
    assert.equal(Number(error.headers?.["x-ms-request-charge"]), 3);
    assert.equal(topology.getForceRefreshCount(), 1);
  });

  it("keeps logical bounds across a merge followed by a non-aligned split", async () => {
    const clientContext = createClientContext();
    const topology = mockTopology(clientContext, [
      [mergeParent1, mergeParent2],
      [mergedRange],
      [splitChild1, splitChild2, splitChild3],
    ]);
    const requests: ObservedRequest[] = [];
    const rangesById = new Map(
      [mergeParent1, mergeParent2, mergedRange, splitChild1, splitChild2, splitChild3].map(
        (range) => [range.id, range],
      ),
    );

    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ partitionKeyRangeId, startEpk, endEpk }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        requests.push({ rangeId, startEpk, endEpk });
        if (requests.length > 10) {
          throw new Error(
            `Request guard exceeded: ${requests.map((item) => item.rangeId).join(",")}`,
          );
        }
        if (rangeId === "P1" || rangeId === "P2" || rangeId === "M") {
          throw createSplitError();
        }

        const range = rangesById.get(rangeId);
        assert.isDefined(range, `Unexpected range request: ${rangeId}`);
        const effectiveMin = startEpk ?? range.minInclusive;
        const effectiveMax = endEpk ?? range.maxExclusive;
        return {
          result: [
            { id: `${effectiveMin}-${effectiveMax}`, source: rangeId },
          ] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );

    const context = createParallelContext(clientContext);
    const replacementSpy = spyOnReplacement(context);
    const result = await withTimeout(drainContext(context));

    assert.deepEqual(
      result.resources.map((item) => item.id),
      ["-30", "30-70", "70-80", "80-FF"],
    );
    assert.deepEqual(
      requests.map((item) => item.rangeId),
      ["P1", "M", "S1", "S2", "S3", "P2", "S3"],
    );
    assert.deepInclude(requests[1], { rangeId: "M", startEpk: "", endEpk: "80" });
    assert.deepInclude(requests[4], { rangeId: "S3", startEpk: "70", endEpk: "80" });
    assert.deepInclude(requests[6], { rangeId: "S3", startEpk: "80", endEpk: "FF" });
    assert.equal(replacementSpy.mock.calls.length, 3);
    assert.equal(topology.getForceRefreshCount(), 3);
    assert.equal(topology.getRequestCount(), 4);
    assert.equal(result.requestCharge, 7);
    assert.isFalse(context.hasMoreResults());
  });

  it("preserves non-split query errors without refreshing routing", async () => {
    const clientContext = createClientContext();
    const topology = mockTopology(clientContext, [[parentRange]]);
    const serviceError = Object.assign(new Error("Service unavailable"), {
      code: StatusCodes.ServiceUnavailable,
      headers: { "x-ms-request-charge": "2" },
    });
    const requests: string[] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async ({ partitionKeyRangeId }) => {
      requests.push(partitionKeyRangeId ?? "none");
      throw serviceError;
    });

    const context = createParallelContext(clientContext);
    const replacementSpy = spyOnReplacement(context);
    const error = await captureError(withTimeout(context.fetchMore(createDummyDiagnosticNode())));

    assert.strictEqual(error, serviceError);
    assert.deepEqual(requests, ["P"]);
    assert.equal(topology.getForceRefreshCount(), 0);
    expect(replacementSpy).not.toHaveBeenCalled();
    assert.isFalse(context.hasMoreResults());
  });

  it("invalidates existing Parallel and ORDER BY query-control continuations after a split", async () => {
    for (const queryType of ["Parallel", "ORDER BY"] as const) {
      const clientContext = createClientContext();
      const topology = mockTopology(clientContext, [[parentRange], [childRange1, childRange2]]);
      const requests: string[] = [];
      const splitError = createSplitError();
      vi.spyOn(clientContext, "queryFeed").mockImplementation(
        async ({ partitionKeyRangeId, options: requestOptions }) => {
          requests.push(partitionKeyRangeId ?? "none");
          if (requests.length > 2) {
            throw new Error(`${queryType} query-control request guard exceeded`);
          }
          assert.equal(requestOptions.continuationToken, "parent-continuation", queryType);
          throw splitError;
        },
      );

      const queryControlOptions = createQueryControlOptions(queryType);
      const context =
        queryType === "Parallel"
          ? createParallelContext(clientContext, queryControlOptions)
          : createOrderByContext(clientContext, queryControlOptions);
      const replacementSpy = spyOnReplacement(context);
      const error = await captureError(withTimeout(context.fetchMore(createDummyDiagnosticNode())));

      assert.isUndefined(error.code, queryType);
      assert.match(error.message, /continuation state is invalid/i, queryType);
      assert.match(error.message, /restart the entire query from the beginning/i, queryType);
      assert.notMatch(error.message, /retryable/i, queryType);
      assert.strictEqual(error.originalError, splitError, queryType);
      assert.strictEqual(error.cause, splitError, queryType);
      assert.equal(Number(error.headers?.["x-ms-request-charge"]), 1, queryType);
      assert.isUndefined(error.headers?.["x-ms-continuation"], queryType);
      assert.deepEqual(requests, ["P"], queryType);
      assert.equal(topology.getForceRefreshCount(), 1, queryType);
      assert.equal(topology.getRequestCount(), 2, queryType);
      assert.equal(replacementSpy.mock.calls.length, 1, queryType);
      assert.isFalse(context.hasMoreResults(), queryType);
    }
  });
});
