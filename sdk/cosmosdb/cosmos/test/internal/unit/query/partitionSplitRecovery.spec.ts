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
import { PipelinedQueryExecutionContext } from "../../../../src/queryExecutionContext/pipelinedQueryExecutionContext.js";
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
const aggregateChild1 = createRange("B1", "80", "C0", ["P2"]);
const aggregateChild2 = createRange("B2", "C0", "FF", ["P2"]);
const nestedChild1 = createRange("A1", "", "80", ["C1"]);
const aggregateLeft = createRange("G0", "", "40");
const aggregateSplitParent = createRange("G1", "40", "80");
const aggregateTrailing = createRange("G2", "80", "FF");
const aggregateEmptyChild1 = createRange("G1a", "40", "60", ["G1"]);
const aggregateEmptyChild2 = createRange("G1b", "60", "80", ["G1"]);
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
  substatus?: number;
}

type QueryKind = "Parallel" | "ORDER BY";
type QueryContext = ParallelQueryExecutionContext | OrderByQueryExecutionContext;

interface Deferred<T> {
  promise: Promise<T>;
  reject: (reason?: unknown) => void;
  resolve: (value: T | PromiseLike<T>) => void;
}

interface RecoveryInternals {
  bufferedDocumentProducersQueue: { size: () => number };
  err?: unknown;
  partitionDataPatchMap: Map<unknown, unknown>;
  respHeaders: Record<string, string | number>;
  splitRepairProducers: Map<unknown, unknown>;
  topologyTransitions: Set<string>;
  unfilledDocumentProducersQueue: { size: () => number };
}

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

function createDeferred<T>(): Deferred<T> {
  let resolveDeferred!: Deferred<T>["resolve"];
  let rejectDeferred!: Deferred<T>["reject"];
  const promise = new Promise<T>((resolve, reject) => {
    resolveDeferred = resolve;
    rejectDeferred = reject;
  });
  return { promise, reject: rejectDeferred, resolve: resolveDeferred };
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

function createPublicIterator<T = TestDocument>(
  clientContext: ClientContext,
  queryType: QueryKind,
  partitionedQueryInfo = createPartitionedQueryInfo(queryType),
  feedOptions: FeedOptions = { ...options, forceQueryPlan: true },
): QueryIterator<T> {
  vi.spyOn(clientContext, "getQueryPlan").mockResolvedValue({
    result: partitionedQueryInfo,
    headers: {},
    code: StatusCodes.Ok,
  });
  return new QueryIterator<T>(
    clientContext,
    query,
    feedOptions,
    async () => ({ result: [] as unknown as Resource, headers: {} }),
    collectionLink,
    ResourceType.item,
  );
}

async function fetchAllWithEndpointGuard<T>(
  iterator: QueryIterator<T>,
  maximumFetches: number = 16,
  timeoutInMs: number = 1000,
): Promise<Awaited<ReturnType<QueryIterator<T>["fetchAll"]>>> {
  const originalFetchMore = PipelinedQueryExecutionContext.prototype.fetchMore;
  let fetchCount = 0;
  const fetchMoreSpy = vi
    .spyOn(PipelinedQueryExecutionContext.prototype, "fetchMore")
    .mockImplementation(function (
      this: PipelinedQueryExecutionContext,
      diagnosticNode: Parameters<PipelinedQueryExecutionContext["fetchMore"]>[0],
    ): ReturnType<PipelinedQueryExecutionContext["fetchMore"]> {
      if (++fetchCount > maximumFetches) {
        return Promise.reject(
          new Error(`Pipelined endpoint fetch guard exceeded ${maximumFetches} iterations`),
        );
      }
      return originalFetchMore.call(this, diagnosticNode);
    });

  try {
    return await withTimeout(iterator.fetchAll(), timeoutInMs);
  } finally {
    fetchMoreSpy.mockRestore();
  }
}

function createAggregateQueryInfo() {
  const partitionedQueryInfo = createPartitionedQueryInfo("Parallel");
  return {
    ...partitionedQueryInfo,
    queryInfo: {
      ...partitionedQueryInfo.queryInfo,
      aggregates: ["Sum" as const],
      hasSelectValue: true,
    },
  };
}

function createGroupByQueryInfo() {
  const partitionedQueryInfo = createPartitionedQueryInfo("Parallel");
  return {
    ...partitionedQueryInfo,
    queryInfo: {
      ...partitionedQueryInfo.queryInfo,
      aggregates: [],
      groupByAliasToAggregateType: { total: "Sum" as const },
      groupByExpressions: ["c.group"],
      hasSelectValue: false,
    },
  };
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

function spyOnReplacement(context: QueryContext): ReturnType<typeof vi.spyOn> {
  return vi.spyOn(
    context as unknown as {
      _enqueueReplacementDocumentProducers: (...args: unknown[]) => Promise<void>;
    },
    "_enqueueReplacementDocumentProducers",
  );
}

function getRecoveryInternals(context: QueryContext): RecoveryInternals {
  return context as unknown as RecoveryInternals;
}

function assertCleanTerminalRecoveryState(context: QueryContext): void {
  const internals = getRecoveryInternals(context);
  assert.equal(internals.partitionDataPatchMap.size, 0);
  assert.equal(internals.splitRepairProducers.size, 0);
  assert.equal(internals.topologyTransitions.size, 0);
  assert.equal(internals.unfilledDocumentProducersQueue.size(), 0);
  assert.equal(internals.bufferedDocumentProducersQueue.size(), 0);
  assert.equal(Number(internals.respHeaders["x-ms-request-charge"] ?? 0), 0);
  assert.isFalse(context.hasMoreResults());
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

async function flushAsyncWork(): Promise<void> {
  await Promise.resolve();
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  await Promise.resolve();
}

async function expectNoUnhandledRejections(run: () => Promise<void>): Promise<void> {
  const unhandledRejections: unknown[] = [];
  const listener = (reason: unknown): void => {
    unhandledRejections.push(reason);
  };
  process.on("unhandledRejection", listener);
  try {
    await run();
    await flushAsyncWork();
    assert.deepEqual(unhandledRejections, []);
  } finally {
    process.off("unhandledRejection", listener);
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
  it("restores the endpoint fetch prototype after the wall-clock guard expires", async () => {
    const originalFetchMore = PipelinedQueryExecutionContext.prototype.fetchMore;
    const pendingIterator = {
      fetchAll: (): Promise<never> => new Promise<never>(() => {}),
    } as unknown as QueryIterator<never>;

    await expect(fetchAllWithEndpointGuard(pendingIterator, 16, 10)).rejects.toThrow(
      "Query did not complete within 10ms",
    );

    assert.strictEqual(PipelinedQueryExecutionContext.prototype.fetchMore, originalFetchMore);
    assert.isFalse(vi.isMockFunction(PipelinedQueryExecutionContext.prototype.fetchMore));
  });

  it("restores the endpoint fetch prototype after the iteration guard rejects", async () => {
    const originalFetchMore = PipelinedQueryExecutionContext.prototype.fetchMore;
    const endpoint = Object.assign(
      Object.create(PipelinedQueryExecutionContext.prototype) as object,
      {
        fetchBuffer: [],
        fetchImplementation: {
          fetchMore: async () => ({ result: undefined, headers: {} }),
        },
      },
    ) as PipelinedQueryExecutionContext;
    const overflowingIterator = {
      fetchAll: async (): Promise<never> => {
        for (let i = 0; i <= 16; i++) {
          await endpoint.fetchMore(createDummyDiagnosticNode());
        }
        throw new Error("Endpoint fetch guard did not reject");
      },
    } as unknown as QueryIterator<never>;

    await expect(fetchAllWithEndpointGuard(overflowingIterator)).rejects.toThrow(
      "Pipelined endpoint fetch guard exceeded 16 iterations",
    );

    assert.strictEqual(PipelinedQueryExecutionContext.prototype.fetchMore, originalFetchMore);
    assert.isFalse(vi.isMockFunction(PipelinedQueryExecutionContext.prototype.fetchMore));
  });

  it("hides split-repair scheduling pages from public Parallel and ORDER BY fetchNext", async () => {
    for (const queryType of ["Parallel", "ORDER BY"] as const) {
      const clientContext = createClientContext();
      const topology = mockTopology(clientContext, [[parentRange], [childRange1, childRange2]]);
      const requests: string[] = [];
      const childRequestCounts = new Map<string, number>();
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
          const requestCount = (childRequestCounts.get(rangeId) ?? 0) + 1;
          childRequestCounts.set(rangeId, requestCount);
          const requestCharge = rangeId === "C1" ? "2" : "3";
          if (requestCount === 1) {
            return {
              result: [] as unknown as Resource,
              headers: {
                "x-ms-continuation": `${rangeId}-next`,
                "x-ms-request-charge": requestCharge,
              },
              code: StatusCodes.Ok,
            };
          }
          assert.equal(requestOptions.continuationToken, `${rangeId}-next`, queryType);
          const value = rangeId === "C1" ? 1 : 2;
          const document = { id: `${value}`, source: rangeId };
          return {
            result: [createBackendResult(queryType, document, value)] as unknown as Resource,
            headers: { "x-ms-request-charge": requestCharge },
            code: StatusCodes.Ok,
          };
        },
      );

      const iterator = createPublicIterator(
        clientContext,
        queryType,
        createPartitionedQueryInfo(queryType),
        { ...options, forceQueryPlan: true, maxItemCount: 1 },
      );
      const firstPage = await withTimeout(iterator.fetchNext());
      const secondPage = await withTimeout(iterator.fetchNext());

      assert.deepEqual(firstPage.resources, [{ id: "1", source: "C1" }], queryType);
      assert.deepEqual(secondPage.resources, [{ id: "2", source: "C2" }], queryType);
      assert.deepEqual(requests, ["P", "C1", "C1", "C2", "C2"], queryType);
      assert.equal(firstPage.requestCharge + secondPage.requestCharge, 11, queryType);
      assert.isTrue(firstPage.hasMoreResults, queryType);
      assert.isFalse(secondPage.hasMoreResults, queryType);
      assert.equal(topology.getForceRefreshCount(), 1, queryType);
    }
  });

  it("bounds a repair producer that repeats the same continuation without progress", async () => {
    const clientContext = createClientContext();
    const topology = mockTopology(clientContext, [[parentRange], [childRange1, childRange2]]);
    const requests: string[] = [];
    const splitError = createSplitError();
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async ({ partitionKeyRangeId }) => {
      const rangeId = partitionKeyRangeId ?? "none";
      requests.push(rangeId);
      if (requests.length > 4) {
        throw new Error("Unchanged continuation request guard exceeded");
      }
      if (rangeId === "P") {
        throw splitError;
      }
      assert.equal(rangeId, "C1");
      return {
        result: [] as unknown as Resource,
        headers: { "x-ms-continuation": "stuck", "x-ms-request-charge": "2" },
        code: StatusCodes.Ok,
      };
    });

    const context = createParallelContext(clientContext);
    const error = await captureError(withTimeout(context.fetchMore(createDummyDiagnosticNode())));

    assert.strictEqual(error, splitError);
    assert.equal(Number(error.headers?.["x-ms-request-charge"]), 5);
    assert.deepEqual(requests, ["P", "C1", "C1"]);
    assert.equal(topology.getForceRefreshCount(), 1);
    assert.equal(getRecoveryInternals(context).splitRepairProducers.size, 0);
    assert.equal(getRecoveryInternals(context).topologyTransitions.size, 0);
    assert.isFalse(context.hasMoreResults());
  });

  it("does not finalize a partial aggregate while split replacements are pending", async () => {
    const clientContext = createClientContext();
    const topology = mockTopology(clientContext, [
      [mergeParent1, mergeParent2],
      [mergeParent1, aggregateChild1, aggregateChild2],
    ]);
    const requests: string[] = [];
    const childRequestCounts = new Map<string, number>();
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ partitionKeyRangeId, options: requestOptions }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        requests.push(rangeId);
        if (requests.length > 7) {
          throw new Error("Aggregate split-recovery request guard exceeded");
        }
        if (rangeId === "P2") {
          throw createSplitError();
        }
        const value = rangeId === "P1" ? 1 : rangeId === "B1" ? 2 : 3;
        if (rangeId !== "P1") {
          const requestCount = (childRequestCounts.get(rangeId) ?? 0) + 1;
          childRequestCounts.set(rangeId, requestCount);
          if (requestCount === 1) {
            return {
              result: [] as unknown as Resource,
              headers: {
                "x-ms-continuation": `${rangeId}-next`,
                "x-ms-request-charge": `${value}`,
              },
              code: StatusCodes.Ok,
            };
          }
          assert.equal(requestOptions.continuationToken, `${rangeId}-next`);
        }
        return {
          result: [[{ item: value }]] as unknown as Resource,
          headers: { "x-ms-request-charge": `${value}` },
          code: StatusCodes.Ok,
        };
      },
    );

    const iterator = createPublicIterator<number>(
      clientContext,
      "Parallel",
      createAggregateQueryInfo(),
      { ...options, forceQueryPlan: true, maxDegreeOfParallelism: 2 },
    );
    const response = await fetchAllWithEndpointGuard(iterator);

    assert.deepEqual(response.resources, [6]);
    assert.deepEqual(requests, ["P1", "P2", "B1", "B2", "B1", "B2"]);
    assert.equal(response.requestCharge, 12);
    assert.isFalse(response.hasMoreResults);
    assert.equal(topology.getForceRefreshCount(), 1);
  });

  it("consumes terminal repair children before finalizing aggregates", async () => {
    const cases = [
      {
        initialRanges: [mergeParent1, mergeParent2],
        refreshedRanges: [mergeParent1, aggregateChild1, aggregateChild2],
        leftId: "P1",
        splitId: "P2",
        childIds: ["B1", "B2"],
        expectedRequests: ["P1", "P2", "B1", "B2"],
        expectedResult: 1,
        expectedCharge: 4,
      },
      {
        initialRanges: [aggregateLeft, aggregateSplitParent, aggregateTrailing],
        refreshedRanges: [
          aggregateLeft,
          aggregateEmptyChild1,
          aggregateEmptyChild2,
          aggregateTrailing,
        ],
        leftId: "G0",
        splitId: "G1",
        childIds: ["G1a", "G1b"],
        trailingId: "G2",
        expectedRequests: ["G0", "G1", "G1a", "G1b", "G2", "G2"],
        expectedResult: 5,
        expectedCharge: 12,
      },
    ];

    for (const testCase of cases) {
      const clientContext = createClientContext();
      const topology = mockTopology(clientContext, [
        testCase.initialRanges,
        testCase.refreshedRanges,
      ]);
      const requests: string[] = [];
      let trailingRequestCount = 0;
      vi.spyOn(clientContext, "queryFeed").mockImplementation(
        async ({ partitionKeyRangeId, options: requestOptions }) => {
          const rangeId = partitionKeyRangeId ?? "none";
          requests.push(rangeId);
          if (requests.length > 7) {
            throw new Error("Terminal aggregate recovery request guard exceeded");
          }
          if (rangeId === testCase.splitId) {
            throw createSplitError();
          }
          if (testCase.childIds.includes(rangeId)) {
            return {
              result: [] as unknown as Resource,
              headers: { "x-ms-request-charge": "1" },
              code: StatusCodes.Ok,
            };
          }
          const value = rangeId === testCase.leftId ? 1 : 4;
          if (rangeId === testCase.trailingId && ++trailingRequestCount === 1) {
            return {
              result: [] as unknown as Resource,
              headers: { "x-ms-continuation": "G2-next", "x-ms-request-charge": "4" },
              code: StatusCodes.Ok,
            };
          }
          if (rangeId === testCase.trailingId) {
            assert.equal(requestOptions.continuationToken, "G2-next");
          }
          return {
            result: [[{ item: value }]] as unknown as Resource,
            headers: { "x-ms-request-charge": `${value}` },
            code: StatusCodes.Ok,
          };
        },
      );

      const iterator = createPublicIterator<number>(
        clientContext,
        "Parallel",
        createAggregateQueryInfo(),
        { ...options, forceQueryPlan: true, maxDegreeOfParallelism: 1 },
      );
      const response = await fetchAllWithEndpointGuard(iterator);

      assert.deepEqual(response.resources, [testCase.expectedResult]);
      assert.deepEqual(requests, testCase.expectedRequests);
      assert.equal(response.requestCharge, testCase.expectedCharge);
      assert.isFalse(response.hasMoreResults);
      assert.equal(topology.getForceRefreshCount(), 1);
    }
  });

  it("drains trailing empty pages before finalizing GROUP BY results", async () => {
    const clientContext = createClientContext();
    const topology = mockTopology(clientContext, [
      [aggregateLeft, aggregateSplitParent, aggregateTrailing],
      [aggregateLeft, aggregateEmptyChild1, aggregateEmptyChild2, aggregateTrailing],
    ]);
    const requests: string[] = [];
    let trailingRequestCount = 0;
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ partitionKeyRangeId, options: requestOptions }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        requests.push(rangeId);
        if (requests.length > 7) {
          throw new Error("GROUP BY split-recovery request guard exceeded");
        }
        if (rangeId === "G1") {
          throw createSplitError();
        }
        if (rangeId === "G1a" || rangeId === "G1b") {
          return {
            result: [] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        const value = rangeId === "G0" ? 1 : 4;
        if (rangeId === "G2" && ++trailingRequestCount === 1) {
          return {
            result: [] as unknown as Resource,
            headers: { "x-ms-continuation": "G2-next", "x-ms-request-charge": "4" },
            code: StatusCodes.Ok,
          };
        }
        if (rangeId === "G2") {
          assert.equal(requestOptions.continuationToken, "G2-next");
        }
        return {
          result: [
            {
              groupByItems: [{ item: "group" }],
              payload: { total: { item: value } },
            },
          ] as unknown as Resource,
          headers: { "x-ms-request-charge": `${value}` },
          code: StatusCodes.Ok,
        };
      },
    );

    const iterator = createPublicIterator<{ total: number }>(
      clientContext,
      "Parallel",
      createGroupByQueryInfo(),
      { ...options, forceQueryPlan: true, maxDegreeOfParallelism: 1 },
    );
    const response = await fetchAllWithEndpointGuard(iterator);

    assert.deepEqual(response.resources, [{ total: 5 }]);
    assert.deepEqual(requests, ["G0", "G1", "G1a", "G1b", "G2", "G2"]);
    assert.equal(response.requestCharge, 12);
    assert.isFalse(response.hasMoreResults);
    assert.equal(topology.getForceRefreshCount(), 1);
  });

  it("preserves trailing service-empty pages for nonaggregate queries", async () => {
    const clientContext = createClientContext();
    const topology = mockTopology(clientContext, [
      [aggregateLeft, aggregateSplitParent, aggregateTrailing],
      [aggregateLeft, aggregateEmptyChild1, aggregateEmptyChild2, aggregateTrailing],
    ]);
    const requests: string[] = [];
    let trailingRequestCount = 0;
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ partitionKeyRangeId, options: requestOptions }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        requests.push(rangeId);
        if (requests.length > 7) {
          throw new Error("Nonaggregate split-recovery request guard exceeded");
        }
        if (rangeId === "G1") {
          throw createSplitError();
        }
        if (rangeId === "G1a" || rangeId === "G1b") {
          return {
            result: [] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        if (rangeId === "G2" && ++trailingRequestCount === 1) {
          return {
            result: [] as unknown as Resource,
            headers: { "x-ms-continuation": "G2-next", "x-ms-request-charge": "4" },
            code: StatusCodes.Ok,
          };
        }
        if (rangeId === "G2") {
          assert.equal(requestOptions.continuationToken, "G2-next");
        }
        return {
          result: [{ id: rangeId, source: rangeId }] as unknown as Resource,
          headers: { "x-ms-request-charge": rangeId === "G0" ? "1" : "4" },
          code: StatusCodes.Ok,
        };
      },
    );

    const iterator = createPublicIterator(
      clientContext,
      "Parallel",
      createPartitionedQueryInfo("Parallel"),
      { ...options, forceQueryPlan: true, maxDegreeOfParallelism: 1, maxItemCount: 1 },
    );
    const firstPage = await withTimeout(iterator.fetchNext());
    const emptyPage = await withTimeout(iterator.fetchNext());
    const finalPage = await withTimeout(iterator.fetchNext());

    assert.deepEqual(firstPage.resources, [{ id: "G0", source: "G0" }]);
    assert.isUndefined(emptyPage.resources);
    assert.isTrue(emptyPage.hasMoreResults);
    assert.equal(emptyPage.requestCharge, 7);
    assert.deepEqual(finalPage.resources, [{ id: "G2", source: "G2" }]);
    assert.equal(finalPage.requestCharge, 4);
    assert.isFalse(finalPage.hasMoreResults);
    assert.deepEqual(requests, ["G0", "G1", "G1a", "G1b", "G2", "G2"]);
    assert.equal(topology.getForceRefreshCount(), 1);
  });

  it("distinguishes identical queue transitions from different repair producers", async () => {
    const clientContext = createClientContext();
    const topology = mockTopology(clientContext, [
      [parentRange],
      [childRange1, childRange2],
      [nestedChild1, childRange2],
      [nestedChild1, aggregateChild1, aggregateChild2],
    ]);
    const requests: string[] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async ({ partitionKeyRangeId }) => {
      const rangeId = partitionKeyRangeId ?? "none";
      requests.push(rangeId);
      if (requests.length > 7) {
        throw new Error("Nested split-recovery request guard exceeded");
      }
      if (rangeId === "P" || rangeId === "C1" || rangeId === "C2") {
        throw createSplitError();
      }
      if (rangeId === "A1" || rangeId === "B1") {
        return {
          result: [] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      }
      return {
        result: [{ id: "final", source: "B2" }] as unknown as Resource,
        headers: { "x-ms-request-charge": "1" },
        code: StatusCodes.Ok,
      };
    });

    const response = await withTimeout(
      createPublicIterator(clientContext, "Parallel", createPartitionedQueryInfo("Parallel"), {
        ...options,
        forceQueryPlan: true,
        maxItemCount: 1,
      }).fetchNext(),
    );

    assert.deepEqual(response.resources, [{ id: "final", source: "B2" }]);
    assert.deepEqual(requests, ["P", "C1", "A1", "C2", "B1", "B2"]);
    assert.equal(response.requestCharge, 6);
    assert.isFalse(response.hasMoreResults);
    assert.equal(topology.getForceRefreshCount(), 3);
    assert.equal(topology.getRequestCount(), 4);
  });

  it("bounds a canonical topology transition cycle", async () => {
    const clientContext = createClientContext();
    const topology = mockTopology(clientContext, [
      [parentRange],
      [childRange1, childRange2],
      [parentRange],
      [childRange1, childRange2],
      [parentRange],
    ]);
    const requests: string[] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async ({ partitionKeyRangeId }) => {
      const rangeId = partitionKeyRangeId ?? "none";
      requests.push(rangeId);
      if (requests.length > 5) {
        throw new Error("Topology transition cycle request guard exceeded");
      }
      throw createSplitError();
    });

    const context = createParallelContext(clientContext);
    const error = await captureError(withTimeout(context.fetchMore(createDummyDiagnosticNode())));

    assert.equal(error.code, StatusCodes.Gone);
    assert.equal(error.substatus, SubStatusCodes.PartitionKeyRangeGone);
    assert.deepEqual(requests, ["P", "C1", "P", "C1"]);
    assert.equal(topology.getForceRefreshCount(), 4);
    assert.equal(topology.getRequestCount(), 5);
    assert.equal(getRecoveryInternals(context).topologyTransitions.size, 0);
    assert.isFalse(context.hasMoreResults());
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

  it("ignores a late split after a sibling abort closes the buffer cycle", async () => {
    await expectNoUnhandledRejections(async () => {
      const clientContext = createClientContext();
      const topology = mockTopology(clientContext, [
        [mergeParent1, mergeParent2],
        [mergeParent1, aggregateChild1, aggregateChild2],
      ]);
      const requestA = createDeferred<never>();
      const requestB = createDeferred<never>();
      const requestsStarted = createDeferred<void>();
      const requests: string[] = [];
      vi.spyOn(clientContext, "queryFeed").mockImplementation(({ partitionKeyRangeId }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        requests.push(rangeId);
        if (requests.length === 2) {
          requestsStarted.resolve(undefined);
        }
        return rangeId === "P1" ? requestA.promise : requestB.promise;
      });

      const context = createParallelContext(clientContext, {
        ...options,
        maxDegreeOfParallelism: 2,
      });
      const replacementSpy = spyOnReplacement(context);
      const resultPromise = captureError(
        withTimeout(context.fetchMore(createDummyDiagnosticNode())),
      );
      await withTimeout(requestsStarted.promise);

      const abortError = Object.assign(new Error("request A aborted"), {
        headers: { "x-ms-request-charge": "2" },
        name: "AbortError",
      });
      requestA.reject(abortError);
      const error = await withTimeout(resultPromise);

      assert.strictEqual(error, abortError);
      assert.equal(Number(error.headers?.["x-ms-request-charge"]), 2);
      assert.deepEqual(requests, ["P1", "P2"]);
      assert.equal(topology.getForceRefreshCount(), 0);
      expect(replacementSpy).not.toHaveBeenCalled();
      assertCleanTerminalRecoveryState(context);

      requestB.reject(createSplitError());
      await flushAsyncWork();

      assert.equal(topology.getForceRefreshCount(), 0);
      expect(replacementSpy).not.toHaveBeenCalled();
      assertCleanTerminalRecoveryState(context);
    });
  });

  it("ignores a late normal success after a sibling abort closes the buffer cycle", async () => {
    const lateResponses: {
      code: number;
      headers: Record<string, string>;
      result: Resource;
    }[] = [
      {
        result: [{ id: "late", source: "P2" }] as unknown as Resource,
        headers: { "x-ms-request-charge": "7" },
        code: StatusCodes.Ok,
      },
      {
        result: [] as unknown as Resource,
        headers: { "x-ms-continuation": "late-token", "x-ms-request-charge": "7" },
        code: StatusCodes.Ok,
      },
    ];

    for (const lateResponse of lateResponses) {
      await expectNoUnhandledRejections(async () => {
        const clientContext = createClientContext();
        const topology = mockTopology(clientContext, [[mergeParent1, mergeParent2]]);
        const requestA = createDeferred<never>();
        const requestB = createDeferred<{
          code: number;
          headers: Record<string, string>;
          result: Resource;
        }>();
        const requestsStarted = createDeferred<void>();
        const requests: string[] = [];
        vi.spyOn(clientContext, "queryFeed").mockImplementation(({ partitionKeyRangeId }) => {
          const rangeId = partitionKeyRangeId ?? "none";
          requests.push(rangeId);
          if (requests.length === 2) {
            requestsStarted.resolve(undefined);
          }
          return rangeId === "P1" ? requestA.promise : requestB.promise;
        });

        const context = createParallelContext(clientContext, {
          ...options,
          maxDegreeOfParallelism: 2,
        });
        const replacementSpy = spyOnReplacement(context);
        const resultPromise = captureError(
          withTimeout(context.fetchMore(createDummyDiagnosticNode())),
        );
        await withTimeout(requestsStarted.promise);

        const abortError = Object.assign(new Error("request A aborted"), {
          headers: { "x-ms-request-charge": "2" },
          name: "AbortError",
        });
        requestA.reject(abortError);
        const error = await withTimeout(resultPromise);

        assert.strictEqual(error, abortError);
        assert.equal(Number(error.headers?.["x-ms-request-charge"]), 2);
        assert.strictEqual(getRecoveryInternals(context).err, abortError);
        assert.deepEqual(requests, ["P1", "P2"]);
        assert.equal(topology.getForceRefreshCount(), 0);
        expect(replacementSpy).not.toHaveBeenCalled();
        assertCleanTerminalRecoveryState(context);

        requestB.resolve(lateResponse);
        await flushAsyncWork();

        assert.strictEqual(getRecoveryInternals(context).err, abortError);
        assert.equal(Number(error.headers?.["x-ms-request-charge"]), 2);
        expect(replacementSpy).not.toHaveBeenCalled();
        assertCleanTerminalRecoveryState(context);
      });
    }
  });

  it("discards a split refresh that completes after a sibling abort", async () => {
    await expectNoUnhandledRejections(async () => {
      const clientContext = createClientContext();
      const refreshStarted = createDeferred<void>();
      const refreshResult = createDeferred<{
        code: number;
        headers: Record<string, string>;
        resources: PartitionKeyRange[];
      }>();
      let routingRequestCount = 0;
      vi.spyOn(clientContext, "queryPartitionKeyRanges").mockImplementation(
        () =>
          ({
            fetchAllInternal: vi.fn(async () => {
              routingRequestCount++;
              if (routingRequestCount === 1) {
                return {
                  resources: [mergeParent1, mergeParent2],
                  headers: { "x-ms-request-charge": "0" },
                  code: StatusCodes.Ok,
                };
              }
              refreshStarted.resolve(undefined);
              return refreshResult.promise;
            }),
          }) as unknown as QueryIterator<PartitionKeyRange>,
      );
      const routingCacheSpy = vi.spyOn(
        clientContext.partitionKeyRangeCache,
        "onCollectionRoutingMap",
      );
      const requestA = createDeferred<never>();
      const requestB = createDeferred<never>();
      const requestsStarted = createDeferred<void>();
      const requests: string[] = [];
      vi.spyOn(clientContext, "queryFeed").mockImplementation(({ partitionKeyRangeId }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        requests.push(rangeId);
        if (requests.length === 2) {
          requestsStarted.resolve(undefined);
        }
        return rangeId === "P1" ? requestA.promise : requestB.promise;
      });

      const context = createParallelContext(clientContext, {
        ...options,
        maxDegreeOfParallelism: 2,
      });
      const replacementSpy = spyOnReplacement(context);
      const resultPromise = captureError(
        withTimeout(context.fetchMore(createDummyDiagnosticNode())),
      );
      await withTimeout(requestsStarted.promise);

      requestB.reject(createSplitError());
      await withTimeout(refreshStarted.promise);
      const abortError = Object.assign(new Error("request A aborted"), {
        headers: { "x-ms-request-charge": "2" },
        name: "AbortError",
      });
      requestA.reject(abortError);
      const error = await withTimeout(resultPromise);

      assert.strictEqual(error, abortError);
      assert.equal(Number(error.headers?.["x-ms-request-charge"]), 3);
      assert.deepEqual(requests, ["P1", "P2"]);
      assert.equal(routingCacheSpy.mock.calls.filter((call) => call[2] === true).length, 1);
      assert.equal(routingRequestCount, 2);
      expect(replacementSpy).toHaveBeenCalledTimes(1);
      assertCleanTerminalRecoveryState(context);

      refreshResult.resolve({
        resources: [mergeParent1, aggregateChild1, aggregateChild2],
        headers: { "x-ms-request-charge": "0" },
        code: StatusCodes.Ok,
      });
      await flushAsyncWork();

      assert.deepEqual(requests, ["P1", "P2"]);
      assertCleanTerminalRecoveryState(context);
    });
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
});
