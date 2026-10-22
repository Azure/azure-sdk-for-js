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
import { PipelinedQueryExecutionContext } from "../../../../src/queryExecutionContext/pipelinedQueryExecutionContext.js";
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
const mergeParentRange1 = createPartitionKeyRange("P1", "", "80");
const mergeParentRange2 = createPartitionKeyRange("P2", "80", "FF");
const mergedRange = createPartitionKeyRange("M", "", "FF", ["P1", "P2"]);
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

function mockMergeTopology(clientContext: ClientContext): {
  getRoutingMapRequestCount: () => number;
} {
  let routingMapRequestCount = 0;
  vi.spyOn(clientContext, "queryPartitionKeyRanges").mockImplementation(
    () =>
      ({
        fetchAllInternal: vi.fn(async () => {
          routingMapRequestCount++;
          return {
            resources:
              routingMapRequestCount === 1 ? [mergeParentRange1, mergeParentRange2] : [mergedRange],
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

  it("bounds merged replacement producers to their retired parent ranges", async () => {
    const clientContext = createClientContext();
    const topology = mockMergeTopology(clientContext);
    const requests: {
      endEpk: string | undefined;
      rangeId: string;
      startEpk: string | undefined;
    }[] = [];
    const expectedResources: TestDocument[] = [
      { id: "left", source: "P1" },
      { id: "right", source: "P2" },
    ];

    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ partitionKeyRangeId, startEpk, endEpk }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        requests.push({ rangeId, startEpk, endEpk });
        if (requests.length > 4) {
          throw new Error(`Merge request guard exceeded: ${JSON.stringify(requests)}`);
        }
        if (rangeId === mergeParentRange1.id || rangeId === mergeParentRange2.id) {
          throw createSplitError();
        }

        assert.equal(rangeId, mergedRange.id);
        if (startEpk === "" && endEpk === "80") {
          return {
            result: [expectedResources[0]] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        if (startEpk === "80" && endEpk === "FF") {
          return {
            result: [expectedResources[1]] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        throw new Error(`Unexpected merged replacement bounds: ${startEpk}-${endEpk}`);
      },
    );

    const context = new ParallelQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      { ...options, maxDegreeOfParallelism: 2 },
      partitionedQueryExecutionInfo,
      correlatedActivityId,
    );

    const result = await withTimeout(drainContext(context), 1000);

    assert.deepEqual(result.resources, expectedResources);
    assert.deepEqual(
      requests
        .filter((request) => request.rangeId === mergedRange.id)
        .map((request) => [request.startEpk, request.endEpk])
        .sort(),
      [
        ["", "80"],
        ["80", "FF"],
      ],
    );
    assert.equal(topology.getRoutingMapRequestCount(), 2);
    assert.isFalse(context.hasMoreResults());
  });

  it("replaces the parent mapping in a fresh query-control continuation token", async () => {
    const clientContext = createClientContext();
    mockSplitTopology(clientContext);
    const parentContinuationToken = "parent-token";
    const childContinuationToken = "child-token";
    const initialResource: TestDocument = { id: "initial", source: "P" };
    const childPageResource: TestDocument = { id: "child-page", source: "C1" };
    const expectedResumedResources: TestDocument[] = [
      { id: "resumed-c1", source: "C1" },
      { id: "resumed-c2", source: "C2" },
    ];
    let parentRequestCount = 0;

    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ partitionKeyRangeId, options: requestOptions }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        if (rangeId === parentRange.id) {
          parentRequestCount++;
          if (parentRequestCount === 1) {
            return {
              result: [initialResource] as unknown as Resource,
              headers: {
                "x-ms-continuation": parentContinuationToken,
                "x-ms-request-charge": "1",
              },
              code: StatusCodes.Ok,
            };
          }
          throw createSplitError();
        }

        if (
          rangeId === childRange1.id &&
          requestOptions.continuationToken === parentContinuationToken
        ) {
          return {
            result: [childPageResource] as unknown as Resource,
            headers: {
              "x-ms-continuation": childContinuationToken,
              "x-ms-request-charge": "1",
            },
            code: StatusCodes.Ok,
          };
        }

        const resource = expectedResumedResources.find((item) => item.source === rangeId);
        assert.isDefined(resource, `Unexpected resumed range request: ${rangeId}`);
        return {
          result: [resource] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );

    const initialContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      { ...options, enableQueryControl: true, maxItemCount: 1 },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );

    const firstPage = await withTimeout(
      initialContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );
    assert.deepEqual(firstPage.result, [initialResource]);

    const splitPage = await withTimeout(
      initialContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );
    assert.deepEqual(splitPage.result, []);

    const childPage = await withTimeout(
      initialContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );
    assert.deepEqual(childPage.result, [childPageResource]);
    const continuationToken = childPage.headers["x-ms-continuation"];
    assert.isString(continuationToken);

    const parsedContinuationToken = JSON.parse(continuationToken);
    assert.deepEqual(
      parsedContinuationToken.rangeMappings.map(
        (mapping: { queryRange: { min: string; max: string } }) => mapping.queryRange,
      ),
      [
        { min: "", max: "80" },
        { min: "80", max: "FF" },
      ],
    );

    const resumedContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuationToken,
        enableQueryControl: true,
        maxItemCount: 1,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const resumedResources: TestDocument[] = [];
    let iterationCount = 0;
    while (resumedContext.hasMoreResults()) {
      iterationCount++;
      if (iterationCount > 5) {
        throw new Error("Resumed query iteration guard exceeded 5 fetches");
      }
      const response = await withTimeout(
        resumedContext.fetchMore(createDummyDiagnosticNode()),
        1000,
      );
      resumedResources.push(...response.result);
    }

    assert.deepEqual(resumedResources, expectedResumedResources);
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

  it("preserves ORDER BY continuation on a split-only resumed response", async () => {
    const clientContext = createClientContext();
    mockSplitTopology(clientContext);
    const backendContinuationToken = "backend-resume-token";
    const continuationRid = "resume-rid";
    const initialContinuationToken = createOrderByOptions(
      backendContinuationToken,
      continuationRid,
      1,
    ).continuationToken;
    const expectedResources = [
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
        assert.include(queryText, rangeId === childRange1.id ? "c.value > 5" : "c.value >= 5");
        if (rangeId === childRange2.id) {
          assert.equal(requestOptions.continuationToken, backendContinuationToken);
        }
        const resource = expectedResources.find((item) =>
          item.payload.id.endsWith(rangeId.toLowerCase()),
        );
        assert.isDefined(resource, `Unexpected ORDER BY child request: ${rangeId}`);
        return {
          result: [resource] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );

    const splitContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuationToken: initialContinuationToken,
        enableQueryControl: true,
        maxItemCount: 1,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const splitResponse = await withTimeout(
      splitContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );

    assert.deepEqual(splitResponse.result, []);
    const splitContinuationToken = splitResponse.headers["x-ms-continuation"];
    assert.isString(splitContinuationToken);
    const parsedSplitToken = JSON.parse(splitContinuationToken);
    assert.deepEqual(
      parsedSplitToken.rangeMappings.map(
        (mapping: { queryRange: { min: string; max: string } }) => mapping.queryRange,
      ),
      [
        { min: "", max: "80" },
        { min: "80", max: "FF" },
      ],
    );
    assert.deepEqual(parsedSplitToken.orderByItems, [{ item: 5 }]);
    assert.equal(parsedSplitToken.skipCount, 1);
    assert.equal(parsedSplitToken.documentRid, continuationRid);

    const resumedContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuationToken: splitContinuationToken,
        enableQueryControl: true,
        maxItemCount: 2,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const resumedResourceIds: string[] = [];
    let resumedIterationCount = 0;
    while (resumedContext.hasMoreResults()) {
      resumedIterationCount++;
      if (resumedIterationCount > 5) {
        throw new Error("ORDER BY resumed iteration guard exceeded 5 fetches");
      }
      const resumedResponse = await withTimeout(
        resumedContext.fetchMore(createDummyDiagnosticNode()),
        1000,
      );
      resumedResourceIds.push(
        ...resumedResponse.result.map((resource: { id: string }) => resource.id),
      );
    }

    assert.deepEqual(resumedResourceIds, ["after-c1", "after-c2"]);
  });

  it("does not preserve an ORDER BY token for a terminal empty response", async () => {
    const clientContext = createClientContext();
    mockSplitTopology(clientContext);
    const initialContinuationToken = createOrderByOptions(
      "backend-resume-token",
      "resume-rid",
      1,
    ).continuationToken;

    vi.spyOn(clientContext, "queryFeed").mockResolvedValue({
      result: [] as unknown as Resource,
      headers: { "x-ms-request-charge": "1" },
      code: StatusCodes.Ok,
    });

    const context = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuationToken: initialContinuationToken,
        enableQueryControl: true,
        maxItemCount: 1,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const response = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);

    assert.deepEqual(response.result, []);
    assert.notProperty(response.headers, "x-ms-continuation");
    let iterationCount = 0;
    while (context.hasMoreResults()) {
      iterationCount++;
      if (iterationCount > 2) {
        throw new Error("Terminal empty ORDER BY query did not complete");
      }
      const finalResponse = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);
      assert.deepEqual(finalResponse.result, []);
      assert.notProperty(finalResponse.headers, "x-ms-continuation");
    }
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

function createParallelPipelinedQueryInfo() {
  return {
    queryRanges: partitionedQueryExecutionInfo.queryRanges,
    queryInfo: {
      orderBy: [],
      groupByAliasToAggregateType: {},
      distinctType: "None",
      hasSelectValue: false,
      hasNonStreamingOrderBy: false,
    },
    partitionedQueryExecutionInfoVersion: 1,
  };
}
