// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ClientContext,
  FeedOptions,
  PartitionKeyRange,
  QueryIterator,
  Resource,
} from "../../../../src/index.js";
import { CosmosDbDiagnosticLevel, StatusCodes } from "../../../../src/index.js";
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
const parentRange = createPartitionKeyRange("P", "", "FF");
const childRange1 = createPartitionKeyRange("C1", "", "80", ["P"]);
const childRange2 = createPartitionKeyRange("C2", "80", "FF", ["P"]);
const partitionedQueryExecutionInfo = {
  queryRanges: [
    {
      min: "",
      max: "FF",
      isMinInclusive: true,
      isMaxInclusive: false,
    },
  ],
  queryInfo: {},
  partitionedQueryExecutionInfoVersion: 1,
};
const options: FeedOptions = {
  maxItemCount: 2,
  maxDegreeOfParallelism: 1,
};

interface TestDocument {
  id: string;
  source: string;
}

interface OrderByTestDocument {
  _rid: string;
  orderByItems: { item: number }[];
  payload: {
    id: string;
    value: number;
  };
}

function createPartitionKeyRange(
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
    {
      endpoint: "https://localhost",
      key: "test-key",
    },
    CosmosDbDiagnosticLevel.info,
  );
}

function mockSplitTopology(clientContext: ClientContext): {
  getRoutingMapRequestCount: () => number;
} {
  let routingMapRequestCount = 0;
  vi.spyOn(clientContext, "queryPartitionKeyRanges").mockImplementation(
    () =>
      ({
        fetchAllInternal: vi.fn(async () => {
          routingMapRequestCount++;
          return {
            resources: routingMapRequestCount === 1 ? [parentRange] : [childRange1, childRange2],
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }),
      }) as unknown as QueryIterator<PartitionKeyRange>,
  );
  return {
    getRoutingMapRequestCount: () => routingMapRequestCount,
  };
}

async function drainContext<T = TestDocument>(
  context: ParallelQueryExecutionContext | OrderByQueryExecutionContext,
): Promise<{
  completed: boolean;
  iterations: number;
  requestCharge: number;
  resources: T[];
}> {
  const resources: T[] = [];
  let iterations = 0;
  let requestCharge = 0;

  while (context.hasMoreResults()) {
    iterations++;
    if (iterations > 10) {
      throw new Error("Query iteration guard exceeded 10 fetches");
    }
    const response = await context.fetchMore(createDummyDiagnosticNode());
    requestCharge += Number(response.headers["x-ms-request-charge"]);
    if (response.result?.buffer) {
      resources.push(...(response.result.buffer as T[]));
    }
  }

  return { completed: true, iterations, requestCharge, resources };
}

async function withTimeout<T>(promise: Promise<T>, timeoutInMs: number): Promise<T> {
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
    if (timeout) {
      clearTimeout(timeout);
    }
  }
}

describe("partition split recovery", () => {
  it("replaces a persistently gone parent and completes with exact child results", async () => {
    const clientContext = createClientContext();
    const topology = mockSplitTopology(clientContext);
    const routingCacheSpy = vi.spyOn(
      clientContext.partitionKeyRangeCache,
      "onCollectionRoutingMap",
    );
    const requests: string[] = [];
    let parentRequestCount = 0;
    const expectedResources: TestDocument[] = [
      { id: "1", source: "C1" },
      { id: "2", source: "C2" },
    ];

    vi.spyOn(clientContext, "queryFeed").mockImplementation(async ({ partitionKeyRangeId }) => {
      const rangeId = partitionKeyRangeId ?? "none";
      requests.push(rangeId);
      if (rangeId === parentRange.id) {
        parentRequestCount++;
        if (parentRequestCount > 3) {
          throw new Error(
            `Parent request guard exceeded: requests=${requests.join(",")}; ` +
              `routingMapRequests=${topology.getRoutingMapRequestCount()}`,
          );
        }
        throw createSplitError();
      }

      const resource = expectedResources.find((item) => item.source === rangeId);
      assert.isDefined(resource, `Unexpected partition key range request: ${rangeId}`);
      return {
        result: [resource] as unknown as Resource,
        headers: { "x-ms-request-charge": "1" },
        code: StatusCodes.Ok,
      };
    });

    const context = new ParallelQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      options,
      partitionedQueryExecutionInfo,
      correlatedActivityId,
    );
    const replacementSpy = vi.spyOn(
      context as unknown as {
        _enqueueReplacementDocumentProducers: (...args: unknown[]) => Promise<void>;
      },
      "_enqueueReplacementDocumentProducers",
    );

    const result = await withTimeout(drainContext(context), 1000);

    assert.deepEqual(result.resources, expectedResources);
    assert.isTrue(result.completed);
    assert.isAtMost(result.iterations, 4);
    assert.equal(result.requestCharge, 3);
    assert.deepEqual(requests, ["P", "C1", "C2"]);
    assert.equal(parentRequestCount, 1);
    assert.equal(topology.getRoutingMapRequestCount(), 2);
    expect(routingCacheSpy.mock.calls.filter((call) => call[2] === true)).toHaveLength(1);
    expect(replacementSpy).toHaveBeenCalledTimes(1);
    assert.isFalse(context.hasMoreResults());
  });

  it("does not replay a parent after a one-shot split response", async () => {
    const clientContext = createClientContext();
    const topology = mockSplitTopology(clientContext);
    const requests: string[] = [];
    let parentRequestCount = 0;
    const expectedResources: TestDocument[] = [
      { id: "1", source: "C1" },
      { id: "2", source: "C1" },
      { id: "3", source: "C2" },
    ];

    vi.spyOn(clientContext, "queryFeed").mockImplementation(async ({ partitionKeyRangeId }) => {
      const rangeId = partitionKeyRangeId ?? "none";
      requests.push(rangeId);
      if (rangeId === parentRange.id) {
        parentRequestCount++;
        if (parentRequestCount === 1) {
          throw createSplitError();
        }
        return {
          result: [{ id: "parent-replayed", source: "P" }] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      }

      return {
        result: expectedResources.filter((item) => item.source === rangeId) as unknown as Resource,
        headers: { "x-ms-request-charge": "1" },
        code: StatusCodes.Ok,
      };
    });

    const context = new ParallelQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      options,
      partitionedQueryExecutionInfo,
      correlatedActivityId,
    );

    const result = await withTimeout(drainContext(context), 1000);

    assert.deepEqual(result.resources, expectedResources);
    assert.deepEqual(requests, ["P", "C1", "C2"]);
    assert.equal(parentRequestCount, 1);
    assert.equal(topology.getRoutingMapRequestCount(), 2);
    assert.isFalse(context.hasMoreResults());
  });

  it("preserves the resume token and ORDER BY filters when the parent splits", async () => {
    const clientContext = createClientContext();
    const topology = mockSplitTopology(clientContext);
    const backendContinuationToken = "backend-resume-token";
    const continuationRid = "resume-rid";
    const resumedOptions = createOrderByOptions(backendContinuationToken, continuationRid, 1);
    const childRequests: {
      rangeId: string;
      continuationToken: string | undefined;
      query: string;
    }[] = [];
    const alreadyReturned = createOrderByDocument("already-returned", 5, continuationRid);
    const expectedResources = [
      createOrderByDocument("same-key-next", 5, continuationRid),
      createOrderByDocument("after-c1", 6, "after-c1-rid"),
      createOrderByDocument("after-c2", 7, "after-c2-rid"),
    ];

    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ partitionKeyRangeId, options: requestOptions, query: requestQuery }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        if (rangeId === parentRange.id) {
          throw createSplitError();
        }

        const queryText =
          typeof requestQuery === "string" ? requestQuery : (requestQuery?.query ?? "");
        childRequests.push({
          rangeId,
          continuationToken: requestOptions.continuationToken,
          query: queryText,
        });

        const resources =
          rangeId === childRange1.id
            ? [alreadyReturned, expectedResources[0], expectedResources[1]]
            : [expectedResources[2]];
        return {
          result: resources as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );

    const context = new OrderByQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      resumedOptions,
      createOrderByQueryInfo(),
      correlatedActivityId,
    );

    const result = await withTimeout(drainContext<OrderByTestDocument>(context), 1000);

    assert.deepEqual(
      result.resources.map((resource) => resource.payload.id),
      expectedResources.map((resource) => resource.payload.id),
    );
    assert.deepEqual(childRequests.map((request) => request.rangeId).sort(), ["C1", "C2"]);
    childRequests.forEach((request) => {
      assert.equal(request.continuationToken, backendContinuationToken);
      assert.include(request.query, "c.value >= 5");
    });
    assert.equal(topology.getRoutingMapRequestCount(), 2);
    assert.isFalse(context.hasMoreResults());
  });

  it("preserves the remaining ORDER BY skip state when a later page splits", async () => {
    const clientContext = createClientContext();
    mockSplitTopology(clientContext);
    const initialContinuationToken = "initial-resume-token";
    const nextContinuationToken = "next-resume-token";
    const continuationRid = "resume-rid";
    const resumedOptions = createOrderByOptions(initialContinuationToken, continuationRid, 2);
    const parentContinuationTokens: (string | undefined)[] = [];
    const childContinuationTokens: (string | undefined)[] = [];
    let parentRequestCount = 0;
    const alreadyReturned = createOrderByDocument("already-returned", 5, continuationRid);
    const expectedResources = [
      createOrderByDocument("same-key-next", 5, continuationRid),
      createOrderByDocument("after-c1", 6, "after-c1-rid"),
      createOrderByDocument("after-c2", 7, "after-c2-rid"),
    ];

    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ partitionKeyRangeId, options: requestOptions }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        if (rangeId === parentRange.id) {
          parentRequestCount++;
          parentContinuationTokens.push(requestOptions.continuationToken);
          if (parentRequestCount === 1) {
            return {
              result: [alreadyReturned] as unknown as Resource,
              headers: {
                "x-ms-continuation": nextContinuationToken,
                "x-ms-request-charge": "1",
              },
              code: StatusCodes.Ok,
            };
          }
          throw createSplitError();
        }

        childContinuationTokens.push(requestOptions.continuationToken);
        const resources =
          rangeId === childRange1.id
            ? [alreadyReturned, expectedResources[0], expectedResources[1]]
            : [expectedResources[2]];
        return {
          result: resources as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );

    const context = new OrderByQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      resumedOptions,
      createOrderByQueryInfo(),
      correlatedActivityId,
    );

    const result = await withTimeout(drainContext<OrderByTestDocument>(context), 1000);

    assert.deepEqual(
      result.resources.map((resource) => resource.payload.id),
      expectedResources.map((resource) => resource.payload.id),
    );
    assert.deepEqual(parentContinuationTokens, [initialContinuationToken, nextContinuationToken]);
    assert.deepEqual(childContinuationTokens.sort(), [
      nextContinuationToken,
      nextContinuationToken,
    ]);
    assert.isFalse(context.hasMoreResults());
  });

  it("preserves non-split query errors without refreshing routing", async () => {
    const clientContext = createClientContext();
    let routingMapRequestCount = 0;
    vi.spyOn(clientContext, "queryPartitionKeyRanges").mockImplementation(
      () =>
        ({
          fetchAllInternal: vi.fn(async () => {
            routingMapRequestCount++;
            return {
              resources: [parentRange],
              headers: { "x-ms-request-charge": "1" },
              code: StatusCodes.Ok,
            };
          }),
        }) as unknown as QueryIterator<PartitionKeyRange>,
    );
    const routingCacheSpy = vi.spyOn(
      clientContext.partitionKeyRangeCache,
      "onCollectionRoutingMap",
    );
    const serviceError = Object.assign(new Error("Service unavailable"), {
      code: StatusCodes.ServiceUnavailable,
      headers: { "x-ms-request-charge": "2" },
    });
    const requests: string[] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async ({ partitionKeyRangeId }) => {
      requests.push(partitionKeyRangeId ?? "none");
      throw serviceError;
    });

    const context = new ParallelQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      options,
      partitionedQueryExecutionInfo,
      correlatedActivityId,
    );
    const replacementSpy = vi.spyOn(
      context as unknown as {
        _enqueueReplacementDocumentProducers: (...args: unknown[]) => Promise<void>;
      },
      "_enqueueReplacementDocumentProducers",
    );

    await expect(withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000)).rejects.toBe(
      serviceError,
    );

    assert.deepEqual(requests, ["P"]);
    assert.equal(routingMapRequestCount, 1);
    expect(routingCacheSpy.mock.calls.filter((call) => call[2] === true)).toHaveLength(0);
    expect(replacementSpy).not.toHaveBeenCalled();
    assert.isFalse(context.hasMoreResults());
  });
});

function createOrderByDocument(id: string, value: number, rid: string): OrderByTestDocument {
  return {
    _rid: rid,
    orderByItems: [{ item: value }],
    payload: { id, value },
  };
}

function createOrderByOptions(
  continuationToken: string,
  continuationRid: string,
  skipCount: number,
): FeedOptions {
  return {
    ...options,
    enableQueryControl: true,
    continuationToken: JSON.stringify({
      rid: "container-rid",
      rangeMappings: [
        {
          queryRange: { min: "", max: "FF" },
          continuationToken,
        },
      ],
      orderByItems: [{ item: 5 }],
      skipCount,
      documentRid: continuationRid,
    }),
  };
}

function createOrderByQueryInfo() {
  return {
    queryRanges: partitionedQueryExecutionInfo.queryRanges,
    queryInfo: {
      orderBy: ["Ascending"],
      orderByExpressions: [{ expression: "c.value", type: "PropertyRef" }],
      rewrittenQuery:
        'SELECT c._rid, [{"item": c.value}] AS orderByItems, c AS payload ' +
        "FROM c WHERE {documentdb-formattableorderbyquery-filter} ORDER BY c.value",
      groupByAliasToAggregateType: {},
      distinctType: "None",
      hasSelectValue: false,
      hasNonStreamingOrderBy: false,
    },
    partitionedQueryExecutionInfoVersion: 1,
  };
}
