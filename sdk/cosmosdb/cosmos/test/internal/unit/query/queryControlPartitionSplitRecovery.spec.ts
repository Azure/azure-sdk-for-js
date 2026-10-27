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
import { ErrorResponse } from "../../../../src/request/ErrorResponse.js";
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
const nonAlignedChild1 = createPartitionKeyRange("S1", "", "30", ["M"]);
const nonAlignedChild2 = createPartitionKeyRange("S2", "30", "70", ["M"]);
const nonAlignedChild3 = createPartitionKeyRange("S3", "70", "FF", ["M"]);
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

function mockStableTopology(clientContext: ClientContext, ranges: PartitionKeyRange[]): void {
  vi.spyOn(clientContext, "queryPartitionKeyRanges").mockReturnValue({
    fetchAllInternal: vi.fn(async () => ({
      resources: ranges,
      headers: { "x-ms-request-charge": "1" },
      code: StatusCodes.Ok,
    })),
  } as unknown as QueryIterator<PartitionKeyRange>);
}

function mockMergeThenSplitTopology(clientContext: ClientContext): {
  getRoutingMapRequestCount: () => number;
} {
  let routingMapRequestCount = 0;
  vi.spyOn(clientContext, "queryPartitionKeyRanges").mockImplementation(
    () =>
      ({
        fetchAllInternal: vi.fn(async () => {
          routingMapRequestCount++;
          const resources =
            routingMapRequestCount === 1
              ? [mergeParentRange1, mergeParentRange2]
              : routingMapRequestCount === 2
                ? [mergedRange]
                : [nonAlignedChild1, nonAlignedChild2, nonAlignedChild3];
          return {
            resources,
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
        if (requests.length > 12) {
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

  it("preserves bounded merged ranges in query-control continuation tokens", async () => {
    const clientContext = createClientContext();
    const topology = mockMergeTopology(clientContext);
    const leftContinuationToken = "left-token";
    const rightContinuationToken = "right-token";
    const firstPageResources: TestDocument[] = [
      { id: "left-page", source: "P1" },
      { id: "right-page", source: "P2" },
    ];
    const expectedResumedResources: TestDocument[] = [
      { id: "resumed-left", source: "P1" },
      { id: "resumed-right", source: "P2" },
    ];
    const requests: {
      continuationToken: string | undefined;
      endEpk: string | undefined;
      rangeId: string;
      startEpk: string | undefined;
    }[] = [];

    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ partitionKeyRangeId, options: requestOptions, startEpk, endEpk }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        requests.push({
          rangeId,
          startEpk,
          endEpk,
          continuationToken: requestOptions.continuationToken,
        });
        if (requests.length > 8) {
          throw new Error(`Merge continuation request guard exceeded: ${JSON.stringify(requests)}`);
        }
        if (rangeId === mergeParentRange1.id || rangeId === mergeParentRange2.id) {
          throw createSplitError();
        }

        assert.equal(rangeId, mergedRange.id);
        if (startEpk === "" && endEpk === "80") {
          if (requestOptions.continuationToken === leftContinuationToken) {
            return {
              result: [expectedResumedResources[0]] as unknown as Resource,
              headers: { "x-ms-request-charge": "1" },
              code: StatusCodes.Ok,
            };
          }
          assert.isUndefined(requestOptions.continuationToken);
          return {
            result: [firstPageResources[0]] as unknown as Resource,
            headers: {
              "x-ms-continuation": leftContinuationToken,
              "x-ms-request-charge": "1",
            },
            code: StatusCodes.Ok,
          };
        }
        if (startEpk === "80" && endEpk === "FF") {
          if (requestOptions.continuationToken === rightContinuationToken) {
            return {
              result: [expectedResumedResources[1]] as unknown as Resource,
              headers: { "x-ms-request-charge": "1" },
              code: StatusCodes.Ok,
            };
          }
          assert.isUndefined(requestOptions.continuationToken);
          return {
            result: [firstPageResources[1]] as unknown as Resource,
            headers: {
              "x-ms-continuation": rightContinuationToken,
              "x-ms-request-charge": "1",
            },
            code: StatusCodes.Ok,
          };
        }
        throw new Error(`Unexpected merged continuation bounds: ${startEpk}-${endEpk}`);
      },
    );

    const initialContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      { ...options, enableQueryControl: true, maxDegreeOfParallelism: 2 },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const firstPage = await withTimeout(
      initialContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );
    assert.deepEqual(firstPage.result, firstPageResources);
    const continuationToken = firstPage.headers["x-ms-continuation"];
    assert.isString(continuationToken);
    const parsedToken = JSON.parse(continuationToken);
    assert.deepEqual(parsedToken.rangeMappings, [
      {
        queryRange: { min: "", max: "80" },
        continuationToken: leftContinuationToken,
      },
      {
        queryRange: { min: "80", max: "FF" },
        continuationToken: rightContinuationToken,
      },
    ]);

    const resumedContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const resumedResources: TestDocument[] = [];
    let iterationCount = 0;
    while (resumedContext.hasMoreResults()) {
      iterationCount++;
      if (iterationCount > 4) {
        throw new Error("Merged resumed query iteration guard exceeded 4 fetches");
      }
      const response = await withTimeout(
        resumedContext.fetchMore(createDummyDiagnosticNode()),
        1000,
      );
      resumedResources.push(...response.result);
    }

    assert.deepEqual(resumedResources, expectedResumedResources);
    assert.equal(topology.getRoutingMapRequestCount(), 2);
  });

  it("intersects a bounded merged producer with a later non-aligned split", async () => {
    const clientContext = createClientContext();
    const topology = mockMergeThenSplitTopology(clientContext);
    const leftContinuationToken = "left-next";
    const expectedResources: TestDocument[] = [
      { id: "left-before-split", source: "P1" },
      { id: "right", source: "P2" },
      { id: "s1", source: "S1" },
      { id: "s2", source: "S2" },
      { id: "s3-left", source: "S3" },
    ];
    const requests: {
      continuationToken: string | undefined;
      endEpk: string | undefined;
      rangeId: string;
      startEpk: string | undefined;
    }[] = [];

    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ partitionKeyRangeId, options: requestOptions, startEpk, endEpk }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        requests.push({
          rangeId,
          startEpk,
          endEpk,
          continuationToken: requestOptions.continuationToken,
        });
        if (requests.length > 10) {
          throw new Error(`Repeated topology request guard exceeded: ${JSON.stringify(requests)}`);
        }
        if (rangeId === mergeParentRange1.id || rangeId === mergeParentRange2.id) {
          throw createSplitError();
        }
        if (rangeId === mergedRange.id && startEpk === "" && endEpk === "80") {
          if (requestOptions.continuationToken === leftContinuationToken) {
            throw createSplitError();
          }
          return {
            result: [expectedResources[0]] as unknown as Resource,
            headers: {
              "x-ms-continuation": leftContinuationToken,
              "x-ms-request-charge": "1",
            },
            code: StatusCodes.Ok,
          };
        }
        if (rangeId === mergedRange.id && startEpk === "80" && endEpk === "FF") {
          return {
            result: [expectedResources[1]] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }

        const resource = expectedResources.find(
          (item) =>
            (rangeId === nonAlignedChild1.id && item.id === "s1") ||
            (rangeId === nonAlignedChild2.id && item.id === "s2") ||
            (rangeId === nonAlignedChild3.id && item.id === "s3-left"),
        );
        assert.isDefined(resource, `Unexpected repeated-topology request: ${rangeId}`);
        return {
          result: [resource] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
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
        .filter((request) => request.rangeId.startsWith("S"))
        .map((request) => [request.startEpk, request.endEpk]),
      [
        ["", "30"],
        ["30", "70"],
        ["70", "80"],
      ],
    );
    assert.equal(topology.getRoutingMapRequestCount(), 3);
  });

  it("intersects serialized parallel ranges with non-aligned physical children", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [nonAlignedChild1, nonAlignedChild2, nonAlignedChild3]);
    const expectedBounds = [
      ["20", "30"],
      ["30", "70"],
      ["70", "80"],
      ["80", "FF"],
    ];
    const requests: [string | undefined, string | undefined][] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async ({ startEpk, endEpk }) => {
      requests.push([startEpk, endEpk]);
      const index = expectedBounds.findIndex(
        ([expectedStart, expectedEnd]) => startEpk === expectedStart && endEpk === expectedEnd,
      );
      assert.isAtLeast(index, 0, `Unexpected serialized parallel bounds: ${startEpk}-${endEpk}`);
      return {
        result: [{ id: `range-${index}`, source: `S${index + 1}` }] as unknown as Resource,
        headers: { "x-ms-request-charge": "1" },
        code: StatusCodes.Ok,
      };
    });
    const continuationToken = JSON.stringify({
      rid: "container-rid",
      rangeMappings: [
        {
          queryRange: { min: "20", max: "80" },
          continuationToken: "middle-token",
        },
        {
          queryRange: { min: "80", max: "FF" },
          continuationToken: "right-token",
        },
      ],
    });
    const context = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 4,
        maxItemCount: 4,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const response = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);

    assert.deepEqual(
      response.result.map((resource: TestDocument) => resource.id),
      ["range-0", "range-1", "range-2", "range-3"],
    );
    assert.deepEqual(requests, expectedBounds);
  });

  it("intersects serialized ORDER BY ranges with non-aligned physical children", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [nonAlignedChild1, nonAlignedChild2, nonAlignedChild3]);
    const expectedBounds = [
      ["", "20"],
      ["20", "30"],
      ["30", "70"],
      ["70", "80"],
      ["80", "FF"],
    ];
    const requests: [string | undefined, string | undefined][] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ query: requestQuery, startEpk, endEpk }) => {
        const queryText =
          typeof requestQuery === "string" ? requestQuery : (requestQuery?.query ?? "");
        assert.include(
          queryText,
          startEpk === "" && endEpk === "20" ? "c.value > 5" : "c.value >= 5",
        );
        requests.push([startEpk, endEpk]);
        const index = expectedBounds.findIndex(
          ([expectedStart, expectedEnd]) => startEpk === expectedStart && endEpk === expectedEnd,
        );
        assert.isAtLeast(index, 0, `Unexpected serialized ORDER BY bounds: ${startEpk}-${endEpk}`);
        return {
          result: [
            createOrderByDocument(`range-${index}`, 6 + index, `rid-${index}`),
          ] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );
    const continuationToken = createOrderByOptions("middle-token", "checkpoint-rid", 1, [
      {
        queryRange: { min: "20", max: "80" },
        continuationToken: "middle-token",
      },
      {
        queryRange: { min: "80", max: "FF" },
        continuationToken: "right-token",
      },
    ]).continuationToken;
    const context = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 5,
        maxItemCount: 5,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const response = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);

    assert.deepEqual(
      response.result.map((resource: { id: string }) => resource.id),
      ["range-0", "range-1", "range-2", "range-3", "range-4"],
    );
    assert.deepEqual(requests, expectedBounds);
  });

  it("covers a merged physical range suffix when resuming a bounded parallel token", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [mergedRange]);
    const leftResource: TestDocument = { id: "left", source: "P1" };
    const rightResource: TestDocument = { id: "right", source: "P2" };
    const requests: {
      continuationToken: string | undefined;
      endEpk: string | undefined;
      startEpk: string | undefined;
    }[] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ options: requestOptions, startEpk, endEpk }) => {
        requests.push({
          startEpk,
          endEpk,
          continuationToken: requestOptions.continuationToken,
        });
        if (requests.length > 12) {
          throw new Error(`Parallel coverage request guard exceeded: ${JSON.stringify(requests)}`);
        }
        if (startEpk === "" && endEpk === "80") {
          if (requestOptions.continuationToken === "left-next") {
            return {
              result: [] as unknown as Resource,
              headers: { "x-ms-request-charge": "1" },
              code: StatusCodes.Ok,
            };
          }
          assert.equal(requestOptions.continuationToken, "left-token");
          return {
            result: [leftResource] as unknown as Resource,
            headers: {
              "x-ms-continuation": "left-next",
              "x-ms-request-charge": "1",
            },
            code: StatusCodes.Ok,
          };
        }
        if (startEpk === "80" && endEpk === "FF") {
          if (requestOptions.continuationToken === "right-next") {
            return {
              result: [] as unknown as Resource,
              headers: { "x-ms-request-charge": "1" },
              code: StatusCodes.Ok,
            };
          }
          assert.isUndefined(requestOptions.continuationToken);
          return {
            result: [rightResource] as unknown as Resource,
            headers: {
              "x-ms-continuation": "right-next",
              "x-ms-request-charge": "1",
            },
            code: StatusCodes.Ok,
          };
        }
        throw new Error(`Unexpected parallel coverage bounds: ${startEpk}-${endEpk}`);
      },
    );

    let continuationToken: string | undefined = JSON.stringify({
      rid: "container-rid",
      rangeMappings: [
        {
          queryRange: { min: "", max: "80" },
          continuationToken: "left-token",
        },
      ],
    });
    const resources: TestDocument[] = [];
    let iterationCount = 0;
    do {
      iterationCount++;
      if (iterationCount > 6) {
        throw new Error(
          `Parallel coverage iteration guard exceeded: ${JSON.stringify({
            resources,
            continuationToken,
            requests,
          })}`,
        );
      }
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        {
          ...options,
          continuationToken,
          enableQueryControl: true,
          maxDegreeOfParallelism: 2,
          maxItemCount: 1,
        },
        createParallelPipelinedQueryInfo(),
        correlatedActivityId,
      );
      const response = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);
      if (response.result.length === 0) {
        assert.deepEqual(resources, [leftResource, rightResource]);
        assert.isUndefined(response.headers["x-ms-continuation"]);
        break;
      }
      resources.push(...response.result);
      continuationToken = response.headers["x-ms-continuation"];
      if (resources.length < 2) {
        assert.isString(continuationToken);
      }
    } while (continuationToken);

    assert.deepEqual(
      resources.sort((left, right) => left.id.localeCompare(right.id)),
      [leftResource, rightResource],
    );
    assert.deepEqual(
      Array.from(new Set(requests.map((request) => `${request.startEpk}-${request.endEpk}`))),
      ["-80", "80-FF"],
    );
  });

  it("covers a merged physical range suffix when recreating ORDER BY pages", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [mergedRange]);
    const leftResource = createOrderByDocument("left", 6, "left-rid");
    const rightResource = createOrderByDocument("right", 7, "right-rid");
    const requests: {
      continuationToken: string | undefined;
      endEpk: string | undefined;
      query: string;
      startEpk: string | undefined;
    }[] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ options: requestOptions, query: requestQuery, startEpk, endEpk }) => {
        const queryText =
          typeof requestQuery === "string" ? requestQuery : (requestQuery?.query ?? "");
        requests.push({
          startEpk,
          endEpk,
          query: queryText,
          continuationToken: requestOptions.continuationToken,
        });
        if (requests.length > 8) {
          throw new Error(`ORDER BY coverage request guard exceeded: ${JSON.stringify(requests)}`);
        }
        if (queryText.includes("c.value > 7")) {
          return {
            result: [] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        if (startEpk === "" && endEpk === "80") {
          return {
            result: [leftResource] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        if (startEpk === "80" && endEpk === "FF") {
          return {
            result: [rightResource] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        throw new Error(`Unexpected ORDER BY coverage bounds: ${startEpk}-${endEpk}`);
      },
    );

    let continuationToken = createOrderByOptions("left-token", "checkpoint-rid", 1, [
      { queryRange: { min: "", max: "80" }, continuationToken: "left-token" },
    ]).continuationToken;
    const resourceIds: string[] = [];
    let iterationCount = 0;
    do {
      iterationCount++;
      if (iterationCount > 4) {
        throw new Error(
          `ORDER BY coverage iteration guard exceeded: ${JSON.stringify({
            resourceIds,
            continuationToken,
            requests,
          })}`,
        );
      }
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        "SELECT * FROM c ORDER BY c.value",
        {
          ...options,
          continuationToken,
          enableQueryControl: true,
          maxDegreeOfParallelism: 2,
          maxItemCount: 1,
        },
        createOrderByQueryInfo(),
        correlatedActivityId,
      );
      const response = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);
      if (response.result.length === 0) {
        assert.deepEqual(resourceIds, ["left", "right"]);
        assert.isUndefined(response.headers["x-ms-continuation"]);
        break;
      }
      resourceIds.push(...response.result.map((resource: { id: string }) => resource.id));
      continuationToken = response.headers["x-ms-continuation"];
      if (resourceIds.length < 2) {
        assert.isString(continuationToken);
      }
    } while (continuationToken);

    assert.deepEqual(resourceIds, ["left", "right"]);
    assert.include(requests[0].query, "c.value >= 5");
    assert.deepEqual(
      Array.from(new Set(requests.map((request) => `${request.startEpk}-${request.endEpk}`))),
      ["-80", "80-FF"],
    );
  });

  it("preserves distinct bounded continuations when both merged ranges are empty", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [mergedRange]);
    const requests: {
      continuationToken: string | undefined;
      endEpk: string | undefined;
      startEpk: string | undefined;
    }[] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ options: requestOptions, startEpk, endEpk }) => {
        requests.push({
          startEpk,
          endEpk,
          continuationToken: requestOptions.continuationToken,
        });
        if (requestOptions.continuationToken === "left-token") {
          return {
            result: [] as unknown as Resource,
            headers: {
              "x-ms-continuation": "left-next",
              "x-ms-request-charge": "1",
            },
            code: StatusCodes.Ok,
          };
        }
        if (requestOptions.continuationToken === "right-token") {
          return {
            result: [] as unknown as Resource,
            headers: {
              "x-ms-continuation": "right-next",
              "x-ms-request-charge": "1",
            },
            code: StatusCodes.Ok,
          };
        }
        if (requestOptions.continuationToken === "left-next") {
          return {
            result: [{ id: "left-resumed", source: "P1" }] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        if (requestOptions.continuationToken === "right-next") {
          return {
            result: [{ id: "right-resumed", source: "P2" }] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        throw new Error(`Unexpected empty continuation token: ${requestOptions.continuationToken}`);
      },
    );
    const initialContinuationToken = createParallelContinuationToken([
      { min: "", max: "80", continuationToken: "left-token" },
      { min: "80", max: "FF", continuationToken: "right-token" },
    ]);
    const initialContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuationToken: initialContinuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const emptyResponse = await withTimeout(
      initialContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );

    assert.deepEqual(emptyResponse.result, []);
    const continuationToken = emptyResponse.headers["x-ms-continuation"];
    assert.isString(continuationToken);
    assert.deepEqual(JSON.parse(continuationToken).rangeMappings, [
      {
        queryRange: { min: "", max: "80" },
        continuationToken: "left-next",
      },
      {
        queryRange: { min: "80", max: "FF" },
        continuationToken: "right-next",
      },
    ]);

    const resumedContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const resumedResponse = await withTimeout(
      resumedContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );
    assert.deepEqual(resumedResponse.result, [
      { id: "left-resumed", source: "P1" },
      { id: "right-resumed", source: "P2" },
    ]);
    assert.deepEqual(
      requests.slice(0, 2).map((request) => [request.startEpk, request.endEpk]),
      [
        ["", "80"],
        ["80", "FF"],
      ],
    );
  });

  it("preserves both bounded continuations when only one merged range is empty", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [mergedRange]);
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ options: requestOptions, startEpk, endEpk }) => {
        if (requestOptions.continuationToken === "left-token") {
          return {
            result: [] as unknown as Resource,
            headers: {
              "x-ms-continuation": "left-next",
              "x-ms-request-charge": "1",
            },
            code: StatusCodes.Ok,
          };
        }
        if (requestOptions.continuationToken === "right-token") {
          return {
            result: [{ id: "right-page", source: "P2" }] as unknown as Resource,
            headers: {
              "x-ms-continuation": "right-next",
              "x-ms-request-charge": "1",
            },
            code: StatusCodes.Ok,
          };
        }
        if (
          requestOptions.continuationToken === "left-next" &&
          startEpk === "" &&
          endEpk === "80"
        ) {
          return {
            result: [{ id: "left-resumed", source: "P1" }] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        if (
          requestOptions.continuationToken === "right-next" &&
          startEpk === "80" &&
          endEpk === "FF"
        ) {
          return {
            result: [{ id: "right-resumed", source: "P2" }] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        throw new Error(
          `Unexpected one-side-empty request: ${startEpk}-${endEpk} ${requestOptions.continuationToken}`,
        );
      },
    );
    const initialContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuationToken: createParallelContinuationToken([
          { min: "", max: "80", continuationToken: "left-token" },
          { min: "80", max: "FF", continuationToken: "right-token" },
        ]),
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
        maxItemCount: 1,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const firstResponse = await withTimeout(
      initialContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );

    assert.deepEqual(firstResponse.result, [{ id: "right-page", source: "P2" }]);
    const continuationToken = firstResponse.headers["x-ms-continuation"];
    assert.isString(continuationToken);
    assert.deepEqual(JSON.parse(continuationToken).rangeMappings, [
      {
        queryRange: { min: "", max: "80" },
        continuationToken: "left-next",
      },
      {
        queryRange: { min: "80", max: "FF" },
        continuationToken: "right-next",
      },
    ]);

    const resumedContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
        maxItemCount: 2,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const resumedResponse = await withTimeout(
      resumedContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );
    assert.deepEqual(resumedResponse.result, [
      { id: "left-resumed", source: "P1" },
      { id: "right-resumed", source: "P2" },
    ]);
  });

  it("preserves unqueried ORDER BY mappings after one bounded range is empty", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [mergedRange]);
    const continuationRid = "resume-rid";
    const alreadyReturned = createOrderByDocument("already-returned", 5, continuationRid);
    const expectedResources = [
      createOrderByDocument("same-key-next", 5, continuationRid),
      createOrderByDocument("after-c1", 6, "after-c1-rid"),
      createOrderByDocument("after-c2", 7, "after-c2-rid"),
    ];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ options: requestOptions, startEpk, endEpk }) => {
        if (requestOptions.continuationToken === "c1-token") {
          return {
            result: [] as unknown as Resource,
            headers: {
              "x-ms-continuation": "c1-next",
              "x-ms-request-charge": "1",
            },
            code: StatusCodes.Ok,
          };
        }
        if (requestOptions.continuationToken === "c1-next") {
          return {
            result: [
              alreadyReturned,
              expectedResources[0],
              expectedResources[1],
            ] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        if (requestOptions.continuationToken === "c2-token") {
          assert.equal(startEpk, "80");
          assert.equal(endEpk, "FF");
          return {
            result: [expectedResources[2]] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        throw new Error(`Unexpected ORDER BY empty token: ${requestOptions.continuationToken}`);
      },
    );
    const initialContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuationToken: createOrderByOptions("unused", continuationRid, 1, [
          { queryRange: { min: "", max: "80" }, continuationToken: "c1-token" },
          { queryRange: { min: "80", max: "FF" }, continuationToken: "c2-token" },
        ]).continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 1,
        maxItemCount: 3,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const emptyResponse = await withTimeout(
      initialContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );

    assert.deepEqual(emptyResponse.result, []);
    const continuationToken = emptyResponse.headers["x-ms-continuation"];
    assert.isString(continuationToken);
    assert.deepEqual(JSON.parse(continuationToken).rangeMappings, [
      {
        queryRange: { min: "", max: "80" },
        continuationToken: "c1-next",
        isOrderByCheckpoint: true,
        orderByFilter: createOrderByFilter("resume-rid"),
      },
      {
        queryRange: { min: "80", max: "FF" },
        continuationToken: "c2-token",
        isActive: true,
        isOrderByCheckpoint: false,
      },
    ]);

    const resumedContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
        maxItemCount: 3,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const resumedResponse = await withTimeout(
      resumedContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );
    assert.deepEqual(
      resumedResponse.result.map((resource: { id: string }) => resource.id),
      ["same-key-next", "after-c1", "after-c2"],
    );
  });

  it("preserves a buffered ORDER BY sibling when another range is empty", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [mergedRange]);
    const leftResource = createOrderByDocument("left-page", 6, "left-rid");
    const rightResource = createOrderByDocument("right-page", 7, "right-rid");
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async ({ options: requestOptions }) => {
      if (requestOptions.continuationToken === "c1-token") {
        return {
          result: [leftResource] as unknown as Resource,
          headers: {
            "x-ms-continuation": "c1-next",
            "x-ms-request-charge": "1",
          },
          code: StatusCodes.Ok,
        };
      }
      if (requestOptions.continuationToken === "c1-next") {
        return {
          result: [] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      }
      if (requestOptions.continuationToken === "c2-token") {
        return {
          result: [] as unknown as Resource,
          headers: {
            "x-ms-continuation": "c2-next",
            "x-ms-request-charge": "1",
          },
          code: StatusCodes.Ok,
        };
      }
      if (requestOptions.continuationToken === "c2-next") {
        return {
          result: [rightResource] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      }
      if (requestOptions.continuationToken === undefined) {
        return {
          result: [] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      }
      throw new Error(`Unexpected buffered-sibling token: ${requestOptions.continuationToken}`);
    });
    const initialToken = createOrderByOptions("unused", "resume-rid", 1, [
      { queryRange: { min: "", max: "80" }, continuationToken: "c1-token" },
      { queryRange: { min: "80", max: "FF" }, continuationToken: "c2-token" },
    ]).continuationToken;
    const initialContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuationToken: initialToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
        maxItemCount: 2,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const emptyResponse = await withTimeout(
      initialContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );

    assert.deepEqual(emptyResponse.result, []);
    const continuationToken = emptyResponse.headers["x-ms-continuation"];
    assert.isString(continuationToken);
    assert.deepEqual(JSON.parse(continuationToken).rangeMappings, [
      {
        queryRange: { min: "", max: "80" },
        continuationToken: "c1-token",
        isActive: true,
        isOrderByCheckpoint: true,
        orderByFilter: createOrderByFilter("resume-rid"),
      },
      {
        queryRange: { min: "80", max: "FF" },
        continuationToken: "c2-next",
        isOrderByCheckpoint: false,
      },
    ]);

    let resumeToken: string | undefined = continuationToken;
    const resourceIds: string[] = [];
    let pageCount = 0;
    while (resumeToken) {
      pageCount++;
      if (pageCount > 4) {
        throw new Error("Buffered ORDER BY sibling page guard exceeded 4 pages");
      }
      const resumedContext = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        "SELECT * FROM c ORDER BY c.value",
        {
          ...options,
          continuationToken: resumeToken,
          enableQueryControl: true,
          maxDegreeOfParallelism: 2,
          maxItemCount: 1,
        },
        createOrderByQueryInfo(),
        correlatedActivityId,
      );
      const resumedResponse = await withTimeout(
        resumedContext.fetchMore(createDummyDiagnosticNode()),
        1000,
      );
      resourceIds.push(...resumedResponse.result.map((resource: { id: string }) => resource.id));
      resumeToken = resumedResponse.headers["x-ms-continuation"];
    }
    assert.deepEqual(resourceIds, ["left-page", "right-page"]);
  });

  it("consumes fresh ORDER BY empty checkpoints until a sorted page exists", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [childRange1, childRange2]);
    let child1RequestCount = 0;
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ partitionKeyRangeId, options: requestOptions }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        if (rangeId === childRange1.id) {
          child1RequestCount++;
          if (child1RequestCount === 1) {
            assert.isUndefined(requestOptions.continuationToken);
            return {
              result: [] as unknown as Resource,
              headers: {
                "x-ms-continuation": "c1-next",
                "x-ms-request-charge": "1",
              },
              code: StatusCodes.Ok,
            };
          }
          assert.equal(requestOptions.continuationToken, "c1-next");
          return {
            result: [createOrderByDocument("left-page", 6, "left-rid")] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        assert.isUndefined(requestOptions.continuationToken);
        return {
          result: [createOrderByDocument("right-page", 7, "right-rid")] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );
    const context = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
        maxItemCount: 2,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const response = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);

    assert.deepEqual(
      response.result.map((resource: { id: string }) => resource.id),
      ["left-page", "right-page"],
    );
    assert.equal(response.headers["x-ms-request-charge"], 3);
  });

  it("updates all bounded ORDER BY mappings when both ranges are empty", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [mergedRange]);
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async ({ options: requestOptions }) => {
      const nextToken =
        requestOptions.continuationToken === "c1-token"
          ? "c1-next"
          : requestOptions.continuationToken === "c2-token"
            ? "c2-next"
            : undefined;
      assert.isDefined(nextToken);
      return {
        result: [] as unknown as Resource,
        headers: {
          "x-ms-continuation": nextToken,
          "x-ms-request-charge": "1",
        },
        code: StatusCodes.Ok,
      };
    });
    const context = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuationToken: createOrderByOptions("unused", "resume-rid", 1, [
          { queryRange: { min: "", max: "80" }, continuationToken: "c1-token" },
          { queryRange: { min: "80", max: "FF" }, continuationToken: "c2-token" },
        ]).continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const response = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);

    assert.deepEqual(response.result, []);
    assert.deepEqual(JSON.parse(response.headers["x-ms-continuation"]).rangeMappings, [
      {
        queryRange: { min: "", max: "80" },
        continuationToken: "c1-next",
        isOrderByCheckpoint: true,
        orderByFilter: createOrderByFilter("resume-rid"),
      },
      {
        queryRange: { min: "80", max: "FF" },
        continuationToken: "c2-next",
        isOrderByCheckpoint: false,
      },
    ]);
  });

  it("removes only terminal ORDER BY mappings from an empty response", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [mergedRange]);
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async ({ options: requestOptions }) => {
      if (requestOptions.continuationToken === "c1-token") {
        return {
          result: [] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      }
      return {
        result: [] as unknown as Resource,
        headers: {
          "x-ms-continuation": "c2-next",
          "x-ms-request-charge": "1",
        },
        code: StatusCodes.Ok,
      };
    });
    const context = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuationToken: createOrderByOptions("unused", "resume-rid", 1, [
          { queryRange: { min: "", max: "80" }, continuationToken: "c1-token" },
          { queryRange: { min: "80", max: "FF" }, continuationToken: "c2-token" },
        ]).continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const response = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);

    assert.deepEqual(response.result, []);
    assert.deepEqual(JSON.parse(response.headers["x-ms-continuation"]).rangeMappings, [
      {
        queryRange: { min: "", max: "80" },
        isActive: false,
        isOrderByCheckpoint: true,
        orderByFilter: createOrderByFilter("resume-rid"),
      },
      {
        queryRange: { min: "80", max: "FF" },
        continuationToken: "c2-next",
        isOrderByCheckpoint: false,
      },
    ]);
  });

  it("clears a resumed split token when all replacement children are terminal empty", async () => {
    const clientContext = createClientContext();
    mockSplitTopology(clientContext);
    const requests: string[] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async ({ partitionKeyRangeId }) => {
      const rangeId = partitionKeyRangeId ?? "none";
      requests.push(rangeId);
      if (requests.length > 3) {
        throw new Error(`Terminal split request guard exceeded: ${requests.join(",")}`);
      }
      if (rangeId === parentRange.id) {
        throw createSplitError();
      }
      return {
        result: [] as unknown as Resource,
        headers: { "x-ms-request-charge": "1" },
        code: StatusCodes.Ok,
      };
    });
    const context = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuationToken: createParallelContinuationToken([
          { min: "", max: "FF", continuationToken: "parent-token" },
        ]),
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const response = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);

    assert.deepEqual(response.result, []);
    assert.notProperty(response.headers, "x-ms-continuation");
    assert.equal(response.headers["x-ms-request-charge"], 3);
    assert.deepEqual(requests, ["P", "C1", "C2"]);
    assert.isFalse(context.hasMoreResults());
  });

  it("preserves unstarted split children when a sibling returns the page", async () => {
    const clientContext = createClientContext();
    const leftParent = createPartitionKeyRange("L", "", "80");
    const rightRange = createPartitionKeyRange("R", "80", "FF");
    const leftChild1 = createPartitionKeyRange("L1", "", "40", ["L"]);
    const leftChild2 = createPartitionKeyRange("L2", "40", "80", ["L"]);
    let routingMapRequestCount = 0;
    vi.spyOn(clientContext, "queryPartitionKeyRanges").mockImplementation(
      () =>
        ({
          fetchAllInternal: vi.fn(async () => {
            routingMapRequestCount++;
            return {
              resources:
                routingMapRequestCount === 1
                  ? [leftParent, rightRange]
                  : [leftChild1, leftChild2, rightRange],
              headers: { "x-ms-request-charge": "1" },
              code: StatusCodes.Ok,
            };
          }),
        }) as unknown as QueryIterator<PartitionKeyRange>,
    );
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ partitionKeyRangeId, options: requestOptions }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        if (rangeId === leftParent.id) {
          throw createSplitError();
        }
        if (rangeId === rightRange.id && requestOptions.continuationToken === undefined) {
          return {
            result: [{ id: "right-page", source: "R" }] as unknown as Resource,
            headers: {
              "x-ms-continuation": "right-next",
              "x-ms-request-charge": "1",
            },
            code: StatusCodes.Ok,
          };
        }
        if (rangeId === rightRange.id && requestOptions.continuationToken === "right-next") {
          return {
            result: [{ id: "right-resumed", source: "R" }] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        if (rangeId === leftChild1.id || rangeId === leftChild2.id) {
          assert.isUndefined(requestOptions.continuationToken);
          return {
            result: [{ id: rangeId.toLowerCase(), source: rangeId }] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        throw new Error(`Unexpected unstarted-child request: ${rangeId}`);
      },
    );
    const initialContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
        maxItemCount: 1,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const firstPage = await withTimeout(
      initialContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );

    assert.deepEqual(firstPage.result, [{ id: "right-page", source: "R" }]);
    const continuationToken = firstPage.headers["x-ms-continuation"];
    assert.isString(continuationToken);
    const parsedToken = JSON.parse(continuationToken);
    assert.deepEqual(
      parsedToken.rangeMappings.filter((mapping: { isActive?: boolean }) => mapping.isActive),
      [
        {
          queryRange: { min: "", max: "40" },
          isActive: true,
        },
        {
          queryRange: { min: "40", max: "80" },
          isActive: true,
        },
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
        maxDegreeOfParallelism: 3,
        maxItemCount: 3,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const resumedResponse = await withTimeout(
      resumedContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );
    assert.deepEqual(resumedResponse.result, [
      { id: "l1", source: "L1" },
      { id: "l2", source: "L2" },
      { id: "right-resumed", source: "R" },
    ]);
  });

  it("does not return a stale token for a general resumed terminal parallel page", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [childRange1, childRange2]);
    let requestCount = 0;
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async () => {
      requestCount++;
      if (requestCount > 2) {
        throw new Error("Terminal parallel stateless request guard exceeded 2 requests");
      }
      return {
        result: [] as unknown as Resource,
        headers: { "x-ms-request-charge": "1" },
        code: StatusCodes.Ok,
      };
    });
    const context = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuationToken: createParallelContinuationToken([
          { min: "", max: "80", continuationToken: "c1-token" },
          { min: "80", max: "FF", continuationToken: "c2-token" },
        ]),
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const response = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);

    assert.deepEqual(response.result, []);
    assert.notProperty(response.headers, "x-ms-continuation");
    assert.equal(response.headers["x-ms-request-charge"], 2);
    assert.equal(requestCount, 2);
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

  it.each(["Parallel", "ORDER BY"] as const)(
    "inherits a parent continuation through a nested %s split before child success",
    async (queryType) => {
      const clientContext = createClientContext();
      const nestedChild = createPartitionKeyRange("A1", "", "80", ["C1"]);
      let routingRequestCount = 0;
      vi.spyOn(clientContext, "queryPartitionKeyRanges").mockImplementation(
        () =>
          ({
            fetchAllInternal: vi.fn(async () => {
              routingRequestCount++;
              return {
                resources:
                  routingRequestCount === 1
                    ? [parentRange]
                    : routingRequestCount === 2
                      ? [childRange1, childRange2]
                      : [nestedChild, childRange2],
                headers: { "x-ms-request-charge": "1" },
                code: StatusCodes.Ok,
              };
            }),
          }) as unknown as QueryIterator<PartitionKeyRange>,
      );
      const backendToken = "parent-resume-token";
      const requests: { rangeId: string; token?: string }[] = [];
      vi.spyOn(clientContext, "queryFeed").mockImplementation(
        async ({ options: requestOptions, partitionKeyRangeId }) => {
          const rangeId = partitionKeyRangeId ?? "none";
          const token = requestOptions.continuationToken;
          requests.push({ rangeId, token });
          if (rangeId === "P" && token === backendToken) {
            throw createSplitError();
          }
          if (rangeId === "C1") {
            assert.equal(token, backendToken);
            throw createSplitError();
          }
          if (rangeId === "P") {
            assert.isUndefined(token);
            return {
              result:
                queryType === "Parallel"
                  ? ([{ id: "parent", source: "P" }] as unknown as Resource)
                  : ([
                      createOrderByDocument("parent", 1, "AAAAAAAAAAAAAAAAAAAAAQ=="),
                    ] as unknown as Resource),
              headers: {
                "x-ms-continuation": backendToken,
                "x-ms-request-charge": "1",
              },
              code: StatusCodes.Ok,
            };
          }
          if (rangeId === "C2") {
            assert.equal(token, backendToken);
            return {
              result: [] as unknown as Resource,
              headers: { "x-ms-request-charge": "1" },
              code: StatusCodes.Ok,
            };
          }
          assert.equal(rangeId, "A1");
          assert.equal(token, backendToken);
          return {
            result:
              queryType === "Parallel"
                ? ([{ id: "nested", source: "A1" }] as unknown as Resource)
                : ([
                    createOrderByDocument("nested", 2, "AAAAAAAAAAAAAAAAAAAAAg=="),
                  ] as unknown as Resource),
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        },
      );
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        queryType === "Parallel" ? query : "SELECT * FROM c ORDER BY c.value",
        {
          ...options,
          enableQueryControl: true,
          maxDegreeOfParallelism: 1,
          maxItemCount: 1,
        },
        queryType === "Parallel" ? createParallelPipelinedQueryInfo() : createOrderByQueryInfo(),
        correlatedActivityId,
      );

      const parentPage = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);
      const nestedPage = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);

      assert.equal(parentPage.result[0].id, "parent");
      assert.equal(nestedPage.result[0].id, "nested");
      assert.deepEqual(requests.slice(0, 3), [
        { rangeId: "P", token: undefined },
        { rangeId: "P", token: backendToken },
        { rangeId: "C1", token: backendToken },
      ]);
      const descendantRequests = requests.slice(3);
      descendantRequests.forEach((request) => assert.equal(request.token, backendToken));
      assert.deepEqual(
        descendantRequests.map((request) => request.rangeId).sort(),
        queryType === "Parallel" ? ["A1"] : ["A1", "C2"],
      );
      assert.equal(routingRequestCount, 3);
    },
  );

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

  it("restores ORDER BY filters when a split checkpoint has no backend token", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [childRange1, childRange2]);
    const continuationRid = "resume-rid";
    const alreadyReturned = createOrderByDocument("already-returned", 5, continuationRid);
    const expectedResources = [
      createOrderByDocument("same-key-next", 5, continuationRid),
      createOrderByDocument("after-c1", 6, "after-c1-rid"),
      createOrderByDocument("after-c2", 7, "after-c2-rid"),
    ];

    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ partitionKeyRangeId, options: requestOptions, query: requestQuery }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        const queryText =
          typeof requestQuery === "string" ? requestQuery : (requestQuery?.query ?? "");
        assert.include(queryText, "c.value >= 5");
        assert.isUndefined(requestOptions.continuationToken);
        return {
          result:
            rangeId === childRange1.id
              ? ([
                  alreadyReturned,
                  expectedResources[0],
                  expectedResources[1],
                ] as unknown as Resource)
              : ([expectedResources[2]] as unknown as Resource),
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );
    const continuationToken = createOrderByOptions("unused", continuationRid, 1, [
      {
        queryRange: { min: "", max: "FF" },
        continuationToken: undefined,
      },
    ]).continuationToken;
    const context = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
        maxItemCount: 3,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const response = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);

    assert.deepEqual(
      response.result.map((resource: { id: string }) => resource.id),
      ["same-key-next", "after-c1", "after-c2"],
    );
  });

  it("consumes scheduling-only ORDER BY empties before returning stateless pages", async () => {
    const clientContext = createClientContext();
    mockSplitTopology(clientContext);
    const backendContinuationToken = "backend-resume-token";
    const continuationRid = "resume-rid";
    const initialContinuationToken = createOrderByOptions(
      backendContinuationToken,
      continuationRid,
      0,
    ).continuationToken;
    const expectedResources = [
      createOrderByDocument("same-key-next", 5, continuationRid),
      createOrderByDocument("after-c2", 7, "after-c2-rid"),
    ];
    let requestCount = 0;
    let sawInitialChildToken = false;

    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ partitionKeyRangeId, options: requestOptions, query: requestQuery }) => {
        requestCount++;
        if (requestCount > 20) {
          throw new Error("Stateless ORDER BY request guard exceeded 20 requests");
        }
        const rangeId = partitionKeyRangeId ?? "none";
        if (rangeId === parentRange.id) {
          throw createSplitError();
        }

        const queryText =
          typeof requestQuery === "string" ? requestQuery : (requestQuery?.query ?? "");
        assert.match(queryText, /c\.value (?:>=|>) [5-7]/);
        if (queryText.includes("c.value > 7")) {
          return {
            result: [] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        if (requestOptions.continuationToken === backendContinuationToken) {
          sawInitialChildToken = true;
        }
        const resources =
          rangeId === childRange1.id ? [expectedResources[0]] : [expectedResources[1]];
        return {
          result: resources as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );

    let continuationToken: string | undefined = initialContinuationToken;
    const resourceIds: string[] = [];
    let pageCount = 0;
    while (continuationToken) {
      pageCount++;
      if (pageCount > 6) {
        throw new Error(
          `Stateless ORDER BY page guard exceeded: ${JSON.stringify({
            resourceIds,
            continuationToken,
            requestCount,
          })}`,
        );
      }
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        "SELECT * FROM c ORDER BY c.value",
        {
          ...options,
          continuationToken,
          enableQueryControl: true,
          maxDegreeOfParallelism: 1,
          maxItemCount: 1,
        },
        createOrderByQueryInfo(),
        correlatedActivityId,
      );
      const response = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);
      const nextContinuationToken = response.headers["x-ms-continuation"];
      if (response.result.length === 0) {
        assert.deepEqual(
          resourceIds,
          ["same-key-next", "after-c2"],
          JSON.stringify({ pageCount, requestCount, headers: response.headers }),
        );
        assert.isUndefined(nextContinuationToken);
        break;
      }

      resourceIds.push(...response.result.map((resource: { id: string }) => resource.id));
      if (resourceIds.length < expectedResources.length) {
        assert.isString(nextContinuationToken);
      }
      continuationToken = nextContinuationToken;
    }

    assert.isTrue(sawInitialChildToken);
    assert.deepEqual(resourceIds, ["same-key-next", "after-c2"]);
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

  it("continues a Parallel query-control split after a successful stateless page", async () => {
    const clientContext = createClientContext();
    const topology = mockSplitTopology(clientContext);
    const requests: { continuationToken?: string; rangeId: string }[] = [];
    let parentRequestCount = 0;
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ options: requestOptions, partitionKeyRangeId }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        requests.push({ rangeId, continuationToken: requestOptions.continuationToken });
        if (rangeId === "P" && ++parentRequestCount === 1) {
          return {
            result: [{ id: "before-split", source: "P" }] as unknown as Resource,
            headers: {
              "x-ms-continuation": "parent-next",
              "x-ms-request-charge": "1",
            },
            code: StatusCodes.Ok,
          };
        }
        if (rangeId === "P") {
          throw createSplitError();
        }
        assert.equal(requestOptions.continuationToken, "parent-next");
        return {
          result: [{ id: rangeId.toLowerCase(), source: rangeId }] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );

    const firstContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      { ...options, enableQueryControl: true, maxItemCount: 1 },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const firstPage = await withTimeout(firstContext.fetchMore(createDummyDiagnosticNode()), 1000);
    const continuationToken = firstPage.headers["x-ms-continuation"];
    assert.deepEqual(firstPage.result, [{ id: "before-split", source: "P" }]);
    assert.isString(continuationToken);

    const resumedContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
        maxItemCount: 2,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const resumedPage = await withTimeout(
      resumedContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );

    assert.deepEqual(resumedPage.result, [
      { id: "c1", source: "C1" },
      { id: "c2", source: "C2" },
    ]);
    assert.isUndefined(resumedPage.headers["x-ms-continuation"]);
    assert.deepEqual(
      requests.map((request) => request.rangeId),
      ["P", "P", "C1", "C2"],
    );
    assert.equal(topology.getRoutingMapRequestCount(), 2);
  });

  it("preserves inactive interior coverage across Parallel stateless recreation", async () => {
    const clientContext = createClientContext();
    const range0 = createPartitionKeyRange("R0", "", "40");
    const range1 = createPartitionKeyRange("R1", "40", "80");
    const range2 = createPartitionKeyRange("R2", "80", "FF");
    mockStableTopology(clientContext, [range0, range1, range2]);
    const requestCounts = new Map<string, number>();
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ options: requestOptions, partitionKeyRangeId }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        requestCounts.set(rangeId, (requestCounts.get(rangeId) ?? 0) + 1);
        const token = requestOptions.continuationToken;
        if (rangeId === "R0" && token === "r0-token") {
          return {
            result: [{ id: "r0", source: "R0" }] as unknown as Resource,
            headers: { "x-ms-continuation": "r0-next", "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        if (rangeId === "R0" && token === "r0-next") {
          return {
            result: [{ id: "r0-final", source: "R0" }] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        if (rangeId === "R1") {
          assert.equal(token, "r1-token");
          return {
            result: [{ id: "r1", source: "R1" }] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        assert.equal(rangeId, "R2");
        assert.equal(token, "r2-token");
        return {
          result: [{ id: "r2", source: "R2" }] as unknown as Resource,
          headers:
            requestCounts.get("R2") === 1
              ? { "x-ms-continuation": "r2-next", "x-ms-request-charge": "1" }
              : { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );
    const initialToken = JSON.stringify({
      rid: "container-rid",
      rangeMappings: [
        { queryRange: { min: "", max: "40" }, continuationToken: "r0-token" },
        { queryRange: { min: "40", max: "80" }, continuationToken: "r1-token" },
        { queryRange: { min: "80", max: "FF" }, continuationToken: "r2-token" },
      ],
    });
    const firstContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuationToken: initialToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 3,
        maxItemCount: 2,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const firstPage = await withTimeout(firstContext.fetchMore(createDummyDiagnosticNode()), 1000);
    const continuationToken = firstPage.headers["x-ms-continuation"];
    assert.deepEqual(
      firstPage.result.map((resource: TestDocument) => resource.id),
      ["r0", "r1"],
    );
    const parsedToken = JSON.parse(JSON.stringify(JSON.parse(continuationToken)));
    assert.deepInclude(parsedToken.rangeMappings, {
      queryRange: { min: "40", max: "80" },
      isActive: false,
    });

    const resumedContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuationToken: JSON.stringify(parsedToken),
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
        maxItemCount: 2,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const finalPage = await withTimeout(
      resumedContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );
    assert.deepEqual(
      finalPage.result.map((resource: TestDocument) => resource.id),
      ["r0-final", "r2"],
    );
    assert.isUndefined(finalPage.headers["x-ms-continuation"]);
    assert.equal(requestCounts.get("R1"), 1);
    assert.deepEqual(
      [...firstPage.result, ...finalPage.result].map((resource: TestDocument) => resource.id),
      ["r0", "r1", "r0-final", "r2"],
    );
  });

  it("preserves completed Parallel coverage while only an uncovered suffix remains", async () => {
    const clientContext = createClientContext();
    const ranges = [
      createPartitionKeyRange("R0", "", "20"),
      createPartitionKeyRange("R1", "20", "40"),
      createPartitionKeyRange("R2", "40", "60"),
      createPartitionKeyRange("R3", "60", "FF"),
    ];
    mockStableTopology(clientContext, ranges);
    const requests: string[] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ options: requestOptions, partitionKeyRangeId }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        requests.push(rangeId);
        assert.notInclude(["R1", "R2"], rangeId);
        if (rangeId === "R0") {
          assert.equal(requestOptions.continuationToken, "r0-token");
        } else {
          assert.equal(rangeId, "R3");
          assert.isUndefined(requestOptions.continuationToken);
        }
        return {
          result: [{ id: rangeId.toLowerCase(), source: rangeId }] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );
    const initialToken = JSON.stringify({
      rid: "container-rid",
      rangeMappings: [
        {
          queryRange: { min: "", max: "20" },
          continuationToken: "r0-token",
          isActive: true,
        },
        { queryRange: { min: "20", max: "40" }, isActive: false },
        { queryRange: { min: "40", max: "60" }, isActive: false },
      ],
    });

    const firstContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuationToken: initialToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 1,
        maxItemCount: 1,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const firstPage = await withTimeout(firstContext.fetchMore(createDummyDiagnosticNode()), 1000);
    const continuationToken = JSON.stringify(JSON.parse(firstPage.headers["x-ms-continuation"]));
    assert.deepEqual(firstPage.result, [{ id: "r0", source: "R0" }]);
    assert.deepInclude(JSON.parse(continuationToken).rangeMappings, {
      queryRange: { min: "20", max: "40" },
      isActive: false,
    });
    assert.deepInclude(JSON.parse(continuationToken).rangeMappings, {
      queryRange: { min: "40", max: "60" },
      isActive: false,
    });

    const resumedContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 1,
        maxItemCount: 1,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const finalPage = await withTimeout(
      resumedContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );
    assert.deepEqual(finalPage.result, [{ id: "r3", source: "R3" }]);
    assert.isUndefined(finalPage.headers["x-ms-continuation"]);
    assert.deepEqual(requests, ["R0", "R3"]);
  });

  it("keeps legacy completed replacements inactive across repeated stateless resumes", async () => {
    const clientContext = createClientContext();
    const completedParent = createPartitionKeyRange("P0", "", "40");
    const completedChild0 = createPartitionKeyRange("C0", "", "20", ["P0"]);
    const completedChild1 = createPartitionKeyRange("C1", "20", "40", ["P0"]);
    const activeRange = createPartitionKeyRange("R1", "40", "FF");
    mockStableTopology(clientContext, [completedChild0, completedChild1, activeRange]);
    const requests: { rangeId: string; token?: string }[] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ options: requestOptions, partitionKeyRangeId }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        requests.push({ rangeId, token: requestOptions.continuationToken });
        assert.equal(rangeId, "R1");
        const token = requestOptions.continuationToken;
        const page = token === "r1-start" ? 0 : token === "r1-next" ? 1 : 2;
        assert.equal(token, page === 0 ? "r1-start" : page === 1 ? "r1-next" : "r1-final");
        return {
          result: [{ id: `r1-${page}`, source: "R1" }] as unknown as Resource,
          headers:
            page < 2
              ? {
                  "x-ms-continuation": page === 0 ? "r1-next" : "r1-final",
                  "x-ms-request-charge": "1",
                }
              : { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );
    let continuationToken: string | undefined = JSON.stringify({
      rid: "container-rid",
      rangeMappings: [
        { queryRange: { min: "", max: "40" } },
        {
          queryRange: { min: "40", max: "FF" },
          continuationToken: "r1-start",
        },
      ],
    });
    const ids: string[] = [];
    for (let page = 0; ; page++) {
      if (page > 2) {
        throw new Error("Legacy completed replacement page guard exceeded");
      }
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        {
          ...options,
          continuationToken,
          enableQueryControl: true,
          maxDegreeOfParallelism: 1,
          maxItemCount: 1,
        },
        createParallelPipelinedQueryInfo(),
        correlatedActivityId,
      );
      const response = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);
      ids.push(...response.result.map((resource: TestDocument) => resource.id));
      continuationToken = response.headers["x-ms-continuation"];
      if (continuationToken) {
        const parsed = JSON.parse(JSON.stringify(JSON.parse(continuationToken)));
        assert.deepInclude(parsed.rangeMappings, {
          queryRange: { min: "", max: "20" },
          isActive: false,
        });
        assert.deepInclude(parsed.rangeMappings, {
          queryRange: { min: "20", max: "40" },
          isActive: false,
        });
        continuationToken = JSON.stringify(parsed);
      } else {
        break;
      }
    }

    assert.deepEqual(ids, ["r1-0", "r1-1", "r1-2"]);
    assert.deepEqual(requests, [
      { rangeId: "R1", token: "r1-start" },
      { rangeId: "R1", token: "r1-next" },
      { rangeId: "R1", token: "r1-final" },
    ]);
  });

  it("rewinds an unprocessed terminal range and clears the final token after its page", async () => {
    const clientContext = createClientContext();
    const ranges = [
      createPartitionKeyRange("R0", "", "40"),
      createPartitionKeyRange("R1", "40", "80"),
      createPartitionKeyRange("R2", "80", "FF"),
    ];
    mockStableTopology(clientContext, ranges);
    const requestCounts = new Map<string, number>();
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ options: requestOptions, partitionKeyRangeId }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        requestCounts.set(rangeId, (requestCounts.get(rangeId) ?? 0) + 1);
        assert.equal(requestOptions.continuationToken, `${rangeId.toLowerCase()}-token`);
        return {
          result: [{ id: rangeId.toLowerCase(), source: rangeId }] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );
    const initialToken = JSON.stringify({
      rid: "container-rid",
      rangeMappings: ranges.map((range) => ({
        queryRange: { min: range.minInclusive, max: range.maxExclusive },
        continuationToken: `${range.id.toLowerCase()}-token`,
      })),
    });
    const firstContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuationToken: initialToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 3,
        maxItemCount: 2,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const firstPage = await withTimeout(firstContext.fetchMore(createDummyDiagnosticNode()), 1000);
    const continuationToken = firstPage.headers["x-ms-continuation"];
    assert.deepEqual(
      firstPage.result.map((resource: TestDocument) => resource.id),
      ["r0", "r1"],
    );
    assert.isString(continuationToken);
    assert.deepInclude(JSON.parse(continuationToken).rangeMappings, {
      queryRange: { min: "40", max: "80" },
      isActive: false,
    });
    assert.deepInclude(JSON.parse(continuationToken).rangeMappings, {
      queryRange: { min: "80", max: "FF" },
      continuationToken: "r2-token",
      isActive: true,
    });

    const resumedContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 1,
        maxItemCount: 2,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const finalPage = await withTimeout(
      resumedContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );
    assert.deepEqual(finalPage.result, [{ id: "r2", source: "R2" }]);
    assert.isUndefined(finalPage.headers["x-ms-continuation"]);
    assert.deepEqual(Object.fromEntries(requestCounts), { R0: 1, R1: 1, R2: 2 });
  });

  it("preserves fresh unstarted Parallel suffix ranges after terminal data", async () => {
    const clientContext = createClientContext();
    const ranges = [
      createPartitionKeyRange("R0", "", "40"),
      createPartitionKeyRange("R1", "40", "80"),
      createPartitionKeyRange("R2", "80", "FF"),
    ];
    mockStableTopology(clientContext, ranges);
    const requestCounts = new Map<string, number>();
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ options: requestOptions, partitionKeyRangeId }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        requestCounts.set(rangeId, (requestCounts.get(rangeId) ?? 0) + 1);
        assert.isUndefined(requestOptions.continuationToken);
        return {
          result: [{ id: rangeId.toLowerCase(), source: rangeId }] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );
    let continuationToken: string | undefined;
    const resourceIds: string[] = [];
    for (let page = 0; ; page++) {
      if (page > 3) {
        throw new Error("MDoP1 stateless suffix page guard exceeded");
      }
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        {
          ...options,
          ...(continuationToken ? { continuationToken } : {}),
          enableQueryControl: true,
          maxDegreeOfParallelism: 1,
          maxItemCount: 1,
        },
        createParallelPipelinedQueryInfo(),
        correlatedActivityId,
      );
      const response = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);
      resourceIds.push(...response.result.map((resource: TestDocument) => resource.id));
      continuationToken = response.headers["x-ms-continuation"];
      if (page === 0) {
        assert.isString(continuationToken);
        assert.deepInclude(JSON.parse(continuationToken).rangeMappings, {
          queryRange: { min: "", max: "40" },
          isActive: false,
        });
      }
      if (!continuationToken) {
        break;
      }
    }

    assert.deepEqual(resourceIds, ["r0", "r1", "r2"]);
    assert.deepEqual(Object.fromEntries(requestCounts), { R0: 1, R1: 1, R2: 1 });
  });

  it("preserves fresh unstarted Parallel suffix ranges after a terminal empty response", async () => {
    const clientContext = createClientContext();
    const ranges = [
      createPartitionKeyRange("R0", "", "40"),
      createPartitionKeyRange("R1", "40", "80"),
      createPartitionKeyRange("R2", "80", "FF"),
    ];
    mockStableTopology(clientContext, ranges);
    const requestCounts = new Map<string, number>();
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ options: requestOptions, partitionKeyRangeId }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        requestCounts.set(rangeId, (requestCounts.get(rangeId) ?? 0) + 1);
        assert.isUndefined(requestOptions.continuationToken);
        return {
          result:
            rangeId === "R0"
              ? ([] as unknown as Resource)
              : ([{ id: rangeId.toLowerCase(), source: rangeId }] as unknown as Resource),
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );

    let continuationToken: string | undefined;
    const pages: string[][] = [];
    for (let page = 0; ; page++) {
      if (page > 3) {
        throw new Error("MDoP1 terminal-empty stateless suffix page guard exceeded");
      }
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        {
          ...options,
          ...(continuationToken ? { continuationToken } : {}),
          enableQueryControl: true,
          maxDegreeOfParallelism: 1,
          maxItemCount: 1,
        },
        createParallelPipelinedQueryInfo(),
        correlatedActivityId,
      );
      const response = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);
      pages.push(response.result.map((resource: TestDocument) => resource.id));
      continuationToken = response.headers["x-ms-continuation"];
      if (page === 0) {
        assert.isString(continuationToken);
        assert.deepInclude(JSON.parse(continuationToken).rangeMappings, {
          queryRange: { min: "", max: "40" },
          isActive: false,
        });
      }
      if (!continuationToken) {
        break;
      }
    }

    assert.deepEqual(pages, [[], ["r1"], ["r2"]]);
    assert.deepEqual(Object.fromEntries(requestCounts), { R0: 1, R1: 1, R2: 1 });
  });

  it("keeps ORDER BY checkpoint ownership separate from sibling backend cursors", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [childRange1, childRange2]);
    const checkpointRid = "AAAAAAAAAAAAAAAAAAAAAQ==";
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ options: requestOptions, partitionKeyRangeId }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        if (requestOptions.continuationToken === "c1-token") {
          return {
            result: [] as unknown as Resource,
            headers: { "x-ms-continuation": "c1-next", "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        if (requestOptions.continuationToken === "c2-token") {
          return {
            result: [] as unknown as Resource,
            headers: { "x-ms-continuation": "c2-next", "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        if (requestOptions.continuationToken === "c1-next") {
          return {
            result: [
              createOrderByDocument("already-returned", 5, checkpointRid),
              createOrderByDocument("after-c1", 6, "after-c1-rid"),
            ] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        assert.equal(rangeId, "C2");
        assert.equal(requestOptions.continuationToken, "c2-next");
        return {
          result: [
            createOrderByDocument("right-equal", 5, "AAAAAAAAAAAAAAAAAAAAAA=="),
          ] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );
    const initialToken = createOrderByOptions("unused", checkpointRid, 1, [
      {
        queryRange: { min: "", max: "80" },
        continuationToken: "c1-token",
        isActive: true,
        isOrderByCheckpoint: true,
      },
      {
        queryRange: { min: "80", max: "FF" },
        continuationToken: "c2-token",
        isActive: true,
        isOrderByCheckpoint: false,
      },
    ]).continuationToken;
    const firstContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuationToken: initialToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
        maxItemCount: 2,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const emptyPage = await withTimeout(firstContext.fetchMore(createDummyDiagnosticNode()), 1000);
    const continuationToken = emptyPage.headers["x-ms-continuation"];
    assert.deepEqual(emptyPage.result, []);
    assert.deepEqual(
      JSON.parse(continuationToken).rangeMappings.map(
        (mapping: { isOrderByCheckpoint?: boolean }) => mapping.isOrderByCheckpoint,
      ),
      [true, false],
    );

    const resumedContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
        maxItemCount: 2,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const resumedPage = await withTimeout(
      resumedContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );
    assert.deepEqual(
      resumedPage.result.map((resource: { id: string }) => resource.id),
      ["right-equal", "after-c1"],
    );
  });

  it("preserves split-child RID and skip filters across an ORDER BY page cutoff", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [childRange1, childRange2]);
    const checkpointRid = "AAAAAAAAAAAAAAAAAAAAAQ==";
    const requests: string[] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async ({ partitionKeyRangeId }) => {
      const rangeId = partitionKeyRangeId ?? "none";
      requests.push(rangeId);
      const prefix = rangeId.toLowerCase();
      return {
        result: [
          createOrderByDocument(`${prefix}-consumed`, 5, checkpointRid),
          createOrderByDocument(`${prefix}-unread`, 5, checkpointRid),
        ] as unknown as Resource,
        headers: { "x-ms-request-charge": "1" },
        code: StatusCodes.Ok,
      };
    });
    const initialToken = createOrderByOptions("parent-token", checkpointRid, 1, [
      {
        queryRange: { min: "", max: "FF" },
        continuationToken: "parent-token",
        isActive: true,
        isOrderByCheckpoint: true,
      },
    ]).continuationToken;
    const firstContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuationToken: initialToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
        maxItemCount: 1,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const firstPage = await withTimeout(firstContext.fetchMore(createDummyDiagnosticNode()), 1000);
    const continuationToken = JSON.stringify(JSON.parse(firstPage.headers["x-ms-continuation"]));
    assert.deepEqual(
      firstPage.result.map((resource: { id: string }) => resource.id),
      ["c1-unread"],
    );
    const child2Mapping = JSON.parse(continuationToken).rangeMappings.find(
      (mapping: { queryRange: { min: string } }) => mapping.queryRange.min === "80",
    );
    assert.deepEqual(child2Mapping.orderByFilter, {
      orderByItems: [{ item: 5 }],
      rid: checkpointRid,
      skipCount: 1,
    });

    const resumedContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
        maxItemCount: 2,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const finalPage = await withTimeout(
      resumedContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );
    assert.deepEqual(
      finalPage.result.map((resource: { id: string }) => resource.id),
      ["c2-unread"],
    );
    assert.isUndefined(finalPage.headers["x-ms-continuation"]);
    assert.deepEqual(requests, ["C1", "C2", "C2"]);
  });

  it("removes a retired empty patch before a nested split token is serialized", async () => {
    const clientContext = createClientContext();
    const nestedChild0 = createPartitionKeyRange("N0", "", "40", ["C1"]);
    const nestedChild1 = createPartitionKeyRange("N1", "40", "80", ["C1"]);
    let routingRequestCount = 0;
    vi.spyOn(clientContext, "queryPartitionKeyRanges").mockImplementation(
      () =>
        ({
          fetchAllInternal: vi.fn(async () => {
            routingRequestCount++;
            return {
              resources:
                routingRequestCount === 1
                  ? [parentRange]
                  : routingRequestCount === 2
                    ? [childRange1, childRange2]
                    : [nestedChild0, nestedChild1, childRange2],
              headers: { "x-ms-request-charge": "1" },
              code: StatusCodes.Ok,
            };
          }),
        }) as unknown as QueryIterator<PartitionKeyRange>,
    );
    const requests: { rangeId: string; token?: string }[] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ options: requestOptions, partitionKeyRangeId }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        const token = requestOptions.continuationToken;
        requests.push({ rangeId, token });
        if (rangeId === "P" || (rangeId === "C1" && token === "c1-next")) {
          throw createSplitError();
        }
        if (rangeId === "C1") {
          return {
            result: [] as unknown as Resource,
            headers: { "x-ms-continuation": "c1-next", "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        if (rangeId === "N0" || rangeId === "N1") {
          return {
            result: [] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        assert.equal(rangeId, "C2");
        return {
          result: [{ id: token ? "c2-final" : "c2-first", source: "C2" }] as unknown as Resource,
          headers: token
            ? { "x-ms-request-charge": "1" }
            : { "x-ms-continuation": "c2-next", "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );

    const firstContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        enableQueryControl: true,
        maxDegreeOfParallelism: 1,
        maxItemCount: 1,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const firstPage = await withTimeout(firstContext.fetchMore(createDummyDiagnosticNode()), 1000);
    const continuationToken = firstPage.headers["x-ms-continuation"];
    assert.deepEqual(firstPage.result, [{ id: "c2-first", source: "C2" }]);
    assert.doesNotThrow(() => JSON.parse(JSON.stringify(JSON.parse(continuationToken))));

    const resumedContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 1,
        maxItemCount: 1,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const finalPage = await withTimeout(
      resumedContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );
    assert.deepEqual(finalPage.result, [{ id: "c2-final", source: "C2" }]);
    assert.isUndefined(finalPage.headers["x-ms-continuation"]);
    assert.deepEqual(requests, [
      { rangeId: "P", token: undefined },
      { rangeId: "C1", token: undefined },
      { rangeId: "C1", token: "c1-next" },
      { rangeId: "N0", token: "c1-next" },
      { rangeId: "N1", token: "c1-next" },
      { rangeId: "C2", token: undefined },
      { rangeId: "C2", token: "c2-next" },
    ]);
  });

  it("preserves tokenless ORDER BY split-checkpoint children across an empty page", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [childRange1, childRange2]);
    const checkpointRid = "AAAAAAAAAAAAAAAAAAAAAQ==";
    const requests: { continuationToken?: string; rangeId: string }[] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(
      async ({ options: requestOptions, partitionKeyRangeId }) => {
        const rangeId = partitionKeyRangeId ?? "none";
        requests.push({ rangeId, continuationToken: requestOptions.continuationToken });
        if (rangeId === "C1" && requestOptions.continuationToken === undefined) {
          return {
            result: [] as unknown as Resource,
            headers: { "x-ms-continuation": "c1-next", "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        }
        const unreadId = rangeId === "C1" ? "after-c1" : "after-c2";
        return {
          result: [
            createOrderByDocument("already-returned", 5, checkpointRid),
            createOrderByDocument(unreadId, rangeId === "C1" ? 6 : 7, `${unreadId}-rid`),
          ] as unknown as Resource,
          headers: { "x-ms-request-charge": "1" },
          code: StatusCodes.Ok,
        };
      },
    );
    const initialToken = createOrderByOptions("unused", checkpointRid, 1, [
      {
        queryRange: { min: "", max: "FF" },
        continuationToken: undefined,
        isActive: true,
        isOrderByCheckpoint: true,
      },
    ]).continuationToken;
    const firstContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuationToken: initialToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 1,
        maxItemCount: 2,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const emptyPage = await withTimeout(firstContext.fetchMore(createDummyDiagnosticNode()), 1000);
    const continuationToken = emptyPage.headers["x-ms-continuation"];
    assert.deepEqual(emptyPage.result, []);
    assert.deepEqual(JSON.parse(continuationToken).rangeMappings, [
      {
        queryRange: { min: "", max: "80" },
        continuationToken: "c1-next",
        isOrderByCheckpoint: true,
        orderByFilter: createOrderByFilter(checkpointRid),
      },
      {
        queryRange: { min: "80", max: "FF" },
        isActive: true,
        isOrderByCheckpoint: true,
        orderByFilter: createOrderByFilter(checkpointRid),
      },
    ]);

    const resumedContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
        maxItemCount: 2,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const resumedPage = await withTimeout(
      resumedContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );
    assert.deepEqual(
      resumedPage.result.map((resource: { id: string }) => resource.id),
      ["after-c1", "after-c2"],
    );
    assert.deepEqual(
      requests.map((request) => request.rangeId),
      ["C1", "C1", "C2"],
    );
  });

  it("restores uncovered interior ORDER BY ranges exactly once", async () => {
    const clientContext = createClientContext();
    const range0 = createPartitionKeyRange("R0", "", "40");
    const range1 = createPartitionKeyRange("R1", "40", "80");
    const range2 = createPartitionKeyRange("R2", "80", "FF");
    mockStableTopology(clientContext, [range0, range1, range2]);
    const requests: string[] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async ({ partitionKeyRangeId }) => {
      const rangeId = partitionKeyRangeId ?? "none";
      requests.push(rangeId);
      const value = rangeId === "R0" ? 6 : rangeId === "R1" ? 7 : 8;
      return {
        result: [
          createOrderByDocument(rangeId.toLowerCase(), value, `${rangeId}-rid`),
        ] as unknown as Resource,
        headers: { "x-ms-request-charge": "1" },
        code: StatusCodes.Ok,
      };
    });
    const continuationToken = createOrderByOptions("unused", "checkpoint-rid", 1, [
      {
        queryRange: { min: "", max: "40" },
        continuationToken: "r0-token",
        isActive: true,
        isOrderByCheckpoint: false,
      },
      {
        queryRange: { min: "80", max: "FF" },
        continuationToken: "r2-token",
        isActive: true,
        isOrderByCheckpoint: true,
      },
    ]).continuationToken;
    const context = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuationToken,
        enableQueryControl: true,
        maxDegreeOfParallelism: 3,
        maxItemCount: 3,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const response = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);
    assert.deepEqual(
      response.result.map((resource: { id: string }) => resource.id),
      ["r0", "r1", "r2"],
    );
    assert.deepEqual(requests.sort(), ["R0", "R1", "R2"]);
  });

  it("rejects malformed JSON-valid continuation tokens before routing or queryFeed", () => {
    const malformedTokens = [
      {},
      { rid: "container-rid" },
      { rid: "container-rid", rangeMappings: {} },
      { rid: "container-rid", rangeMappings: [] },
      { rid: "container-rid", rangeMappings: [{}] },
      {
        rid: "container-rid",
        rangeMappings: [{ queryRange: { min: 0, max: "FF" } }],
      },
      {
        rid: "container-rid",
        rangeMappings: [{ queryRange: { min: "80", max: "80" } }],
      },
      {
        rid: "container-rid",
        rangeMappings: [{ queryRange: { min: "80", max: "40" } }],
      },
      {
        rid: "container-rid",
        rangeMappings: [{ queryRange: { min: "", max: "80" }, isActive: "true" }],
      },
      {
        rid: "container-rid",
        rangeMappings: [
          {
            queryRange: { min: "", max: "80" },
            isOrderByCheckpoint: 1,
          },
        ],
      },
      {
        rid: "container-rid",
        rangeMappings: [
          { queryRange: { min: "", max: "80" } },
          { queryRange: { min: "40", max: "FF" } },
        ],
      },
      {
        rid: "container-rid",
        rangeMappings: [{ queryRange: { min: "", max: "FF" } }],
        offset: -1,
      },
      {
        rid: "container-rid",
        rangeMappings: [{ queryRange: { min: "", max: "FF" } }],
        offset: 1.5,
      },
      {
        rid: "container-rid",
        rangeMappings: [{ queryRange: { min: "", max: "FF" } }],
        offset: Number.MAX_VALUE,
      },
      {
        rid: "container-rid",
        rangeMappings: [{ queryRange: { min: "", max: "FF" } }],
        limit: -1,
      },
      {
        rid: "container-rid",
        rangeMappings: [{ queryRange: { min: "", max: "FF" } }],
        limit: 1.5,
      },
      {
        rid: "container-rid",
        rangeMappings: [{ queryRange: { min: "", max: "FF" } }],
        limit: Number.MAX_VALUE,
      },
      {
        rid: "container-rid",
        rangeMappings: [{ queryRange: { min: "", max: "FF" } }],
        hashedLastResult: 1,
      },
    ];

    for (const queryType of ["Parallel", "ORDER BY"] as const) {
      for (const malformedToken of malformedTokens) {
        const clientContext = createClientContext();
        const queryFeedSpy = vi.spyOn(clientContext, "queryFeed");
        const routingSpy = vi.spyOn(clientContext, "queryPartitionKeyRanges");
        let error: unknown;
        try {
          new PipelinedQueryExecutionContext(
            clientContext,
            collectionLink,
            queryType === "ORDER BY" ? "SELECT * FROM c ORDER BY c.value" : query,
            {
              ...options,
              continuationToken: JSON.stringify(malformedToken),
              enableQueryControl: true,
            },
            queryType === "ORDER BY"
              ? createOrderByQueryInfo()
              : createParallelPipelinedQueryInfo(),
            correlatedActivityId,
          );
        } catch (caughtError) {
          error = caughtError;
        }

        assert.instanceOf(error, ErrorResponse, queryType);
        assert.isUndefined((error as ErrorResponse).code, queryType);
        assert.match((error as Error).message, /Invalid continuation token/i, queryType);
        expect(queryFeedSpy).not.toHaveBeenCalled();
        expect(routingSpy).not.toHaveBeenCalled();
      }
    }

    const validBase = {
      rid: "container-rid",
      rangeMappings: [{ queryRange: { min: "", max: "FF" } }],
    };
    const malformedOrderByTokens = [
      validBase,
      { ...validBase, orderByItems: [], skipCount: 0 },
      { ...validBase, orderByItems: [null], skipCount: 0 },
      { ...validBase, orderByItems: [{ item: 5 }], skipCount: -1 },
      { ...validBase, orderByItems: [{ item: 5 }], skipCount: 1.5 },
      { ...validBase, orderByItems: [{ item: 5 }], skipCount: Number.MAX_VALUE },
      {
        ...validBase,
        orderByItems: [{ item: 5 }],
        skipCount: 0,
        documentRid: 1,
      },
      {
        rid: "container-rid",
        rangeMappings: [
          {
            queryRange: { min: "", max: "FF" },
            orderByFilter: {
              orderByItems: [{ item: 5 }],
              rid: "resume-rid",
              skipCount: -1,
            },
          },
        ],
        orderByItems: [{ item: 5 }],
        skipCount: 0,
      },
      {
        rid: "container-rid",
        rangeMappings: [
          {
            queryRange: { min: "", max: "40" },
            isOrderByCheckpoint: false,
          },
          {
            queryRange: { min: "40", max: "80" },
            isOrderByCheckpoint: false,
          },
        ],
        orderByItems: [{ item: 5 }],
        skipCount: 0,
      },
      {
        rid: "container-rid",
        rangeMappings: [
          {
            queryRange: { min: "60", max: "FF" },
            isOrderByCheckpoint: true,
          },
          {
            queryRange: { min: "", max: "30" },
            isOrderByCheckpoint: true,
          },
          {
            queryRange: { min: "30", max: "60" },
            isOrderByCheckpoint: false,
          },
        ],
        orderByItems: [{ item: 5 }],
        skipCount: 0,
      },
    ];
    for (const malformedToken of malformedOrderByTokens) {
      const clientContext = createClientContext();
      const queryFeedSpy = vi.spyOn(clientContext, "queryFeed");
      const routingSpy = vi.spyOn(clientContext, "queryPartitionKeyRanges");
      let error: unknown;
      try {
        new PipelinedQueryExecutionContext(
          clientContext,
          collectionLink,
          "SELECT * FROM c ORDER BY c.value",
          {
            ...options,
            continuationToken: JSON.stringify(malformedToken),
            enableQueryControl: true,
          },
          createOrderByQueryInfo(),
          correlatedActivityId,
        );
      } catch (caughtError) {
        error = caughtError;
      }
      assert.instanceOf(error, ErrorResponse);
      assert.isUndefined((error as ErrorResponse).code);
      assert.match((error as Error).message, /Invalid continuation token/i);
      expect(queryFeedSpy).not.toHaveBeenCalled();
      expect(routingSpy).not.toHaveBeenCalled();
    }
  });

  it("rejects ORDER BY tokens whose item count does not match the query plan", () => {
    for (const orderByItems of [[{ item: 5 }], [{ item: 5 }, { item: 6 }, { item: 7 }]]) {
      const clientContext = createClientContext();
      const queryFeedSpy = vi.spyOn(clientContext, "queryFeed");
      const routingSpy = vi.spyOn(clientContext, "queryPartitionKeyRanges");
      let error: unknown;
      try {
        new PipelinedQueryExecutionContext(
          clientContext,
          collectionLink,
          "SELECT * FROM c ORDER BY c.value, c.id DESC",
          {
            ...options,
            continuationToken: JSON.stringify({
              rid: "container-rid",
              rangeMappings: [
                {
                  queryRange: { min: "", max: "FF" },
                  continuationToken: "orderby-token",
                },
              ],
              orderByItems,
              skipCount: 0,
            }),
            enableQueryControl: true,
          },
          createTwoFieldOrderByQueryInfo(),
          correlatedActivityId,
        );
      } catch (caughtError) {
        error = caughtError;
      }

      assert.instanceOf(error, ErrorResponse);
      assert.isUndefined((error as ErrorResponse).code);
      assert.match((error as Error).message, /Invalid continuation token/i);
      expect(queryFeedSpy).not.toHaveBeenCalled();
      expect(routingSpy).not.toHaveBeenCalled();
    }
  });

  it("rejects malformed deprecated continuation aliases before routing or queryFeed", () => {
    for (const queryType of ["Parallel", "ORDER BY"] as const) {
      const clientContext = createClientContext();
      const queryFeedSpy = vi.spyOn(clientContext, "queryFeed");
      const routingSpy = vi.spyOn(clientContext, "queryPartitionKeyRanges");
      let error: unknown;
      try {
        new PipelinedQueryExecutionContext(
          clientContext,
          collectionLink,
          queryType === "ORDER BY" ? "SELECT * FROM c ORDER BY c.value" : query,
          {
            ...options,
            continuation: JSON.stringify({}),
            enableQueryControl: true,
          },
          queryType === "ORDER BY" ? createOrderByQueryInfo() : createParallelPipelinedQueryInfo(),
          correlatedActivityId,
        );
      } catch (caughtError) {
        error = caughtError;
      }

      assert.instanceOf(error, ErrorResponse, queryType);
      assert.isUndefined((error as ErrorResponse).code, queryType);
      assert.match((error as Error).message, /Invalid continuation token/i, queryType);
      expect(queryFeedSpy).not.toHaveBeenCalled();
      expect(routingSpy).not.toHaveBeenCalled();
    }
  });

  it("resumes Parallel empty checkpoints through the deprecated continuation alias", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [parentRange]);
    const backendTokens: (string | undefined)[] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async ({ options: requestOptions }) => {
      backendTokens.push(requestOptions.continuationToken);
      return backendTokens.length === 1
        ? {
            result: [] as unknown as Resource,
            headers: {
              "x-ms-continuation": "parallel-next",
              "x-ms-request-charge": "1",
            },
            code: StatusCodes.Ok,
          }
        : {
            result: [{ id: "parallel", source: "P" }] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
    });
    const initialToken = JSON.stringify({
      rid: "container-rid",
      rangeMappings: [
        {
          queryRange: { min: "", max: "FF" },
          continuationToken: "parallel-start",
        },
      ],
      offset: 0,
      limit: 2,
    });
    const firstContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuation: initialToken,
        enableQueryControl: true,
        maxItemCount: 1,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const emptyPage = await withTimeout(firstContext.fetchMore(createDummyDiagnosticNode()), 1000);
    const continuationToken = emptyPage.headers["x-ms-continuation"];
    assert.deepEqual(emptyPage.result, []);
    assert.isString(continuationToken);
    assert.include(JSON.parse(continuationToken), { offset: 0, limit: 2 });

    const resumedContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {
        ...options,
        continuation: continuationToken,
        enableQueryControl: true,
        maxItemCount: 1,
      },
      createParallelPipelinedQueryInfo(),
      correlatedActivityId,
    );
    const finalPage = await withTimeout(
      resumedContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );
    assert.deepEqual(finalPage.result, [{ id: "parallel", source: "P" }]);
    assert.isUndefined(finalPage.headers["x-ms-continuation"]);
    assert.deepEqual(backendTokens, ["parallel-start", "parallel-next"]);
  });

  it("resumes ORDER BY empty checkpoints through the deprecated continuation alias", async () => {
    const clientContext = createClientContext();
    mockStableTopology(clientContext, [parentRange]);
    const backendTokens: (string | undefined)[] = [];
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async ({ options: requestOptions }) => {
      backendTokens.push(requestOptions.continuationToken);
      return backendTokens.length === 1
        ? {
            result: [] as unknown as Resource,
            headers: {
              "x-ms-continuation": "orderby-next",
              "x-ms-request-charge": "1",
            },
            code: StatusCodes.Ok,
          }
        : {
            result: [
              createOrderByDocument("orderby", 6, "AAAAAAAAAAAAAAAAAAAAAg=="),
            ] as unknown as Resource,
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
    });
    const initialToken = JSON.stringify({
      rid: "container-rid",
      rangeMappings: [
        {
          queryRange: { min: "", max: "FF" },
          continuationToken: "orderby-start",
          isOrderByCheckpoint: true,
        },
      ],
      orderByItems: [{ item: 5 }],
      skipCount: 0,
      documentRid: "AAAAAAAAAAAAAAAAAAAAAQ==",
      offset: 0,
      limit: 2,
      hashedLastResult: "hash",
    });
    const firstContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuation: initialToken,
        enableQueryControl: true,
        maxItemCount: 1,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const emptyPage = await withTimeout(firstContext.fetchMore(createDummyDiagnosticNode()), 1000);
    const continuationToken = emptyPage.headers["x-ms-continuation"];
    assert.deepEqual(emptyPage.result, []);
    assert.isString(continuationToken);
    assert.include(JSON.parse(continuationToken), {
      offset: 0,
      limit: 2,
      hashedLastResult: "hash",
    });

    const resumedContext = new PipelinedQueryExecutionContext(
      clientContext,
      collectionLink,
      "SELECT * FROM c ORDER BY c.value",
      {
        ...options,
        continuation: continuationToken,
        enableQueryControl: true,
        maxItemCount: 1,
      },
      createOrderByQueryInfo(),
      correlatedActivityId,
    );
    const finalPage = await withTimeout(
      resumedContext.fetchMore(createDummyDiagnosticNode()),
      1000,
    );
    assert.equal(finalPage.result[0].id, "orderby");
    assert.isUndefined(finalPage.headers["x-ms-continuation"]);
    assert.deepEqual(backendTokens, ["orderby-start", "orderby-next"]);
  });

  it("resumes valid old and new continuation token formats after JSON round trip", async () => {
    const cases = [
      {
        queryType: "Parallel" as const,
        token: {
          rid: "container-rid",
          rangeMappings: [
            {
              queryRange: { min: "", max: "FF" },
              continuationToken: "parallel-token",
            },
          ],
        },
      },
      {
        queryType: "ORDER BY" as const,
        token: {
          rid: "container-rid",
          rangeMappings: [
            {
              queryRange: { min: "", max: "FF" },
              continuationToken: "orderby-token",
              isActive: true,
              isOrderByCheckpoint: true,
            },
          ],
          orderByItems: [{ item: 5 }],
          skipCount: 1,
          documentRid: "AAAAAAAAAAAAAAAAAAAAAQ==",
        },
      },
    ];

    for (const { queryType, token } of cases) {
      const clientContext = createClientContext();
      mockStableTopology(clientContext, [parentRange]);
      const queryFeedSpy = vi
        .spyOn(clientContext, "queryFeed")
        .mockImplementation(async ({ options: requestOptions }) => {
          assert.equal(
            requestOptions.continuationToken,
            queryType === "Parallel" ? "parallel-token" : "orderby-token",
          );
          return {
            result:
              queryType === "Parallel"
                ? ([{ id: "parallel", source: "P" }] as unknown as Resource)
                : ([
                    createOrderByDocument("orderby", 6, "AAAAAAAAAAAAAAAAAAAAAg=="),
                  ] as unknown as Resource),
            headers: { "x-ms-request-charge": "1" },
            code: StatusCodes.Ok,
          };
        });
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        queryType === "ORDER BY" ? "SELECT * FROM c ORDER BY c.value" : query,
        {
          ...options,
          continuationToken: JSON.stringify(JSON.parse(JSON.stringify(token))),
          enableQueryControl: true,
        },
        queryType === "ORDER BY" ? createOrderByQueryInfo() : createParallelPipelinedQueryInfo(),
        correlatedActivityId,
      );
      const response = await withTimeout(context.fetchMore(createDummyDiagnosticNode()), 1000);
      assert.equal(response.result[0].id, queryType === "Parallel" ? "parallel" : "orderby");
      expect(queryFeedSpy).toHaveBeenCalledTimes(1);
    }
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
  rangeMappings: {
    queryRange: { min: string; max: string };
    continuationToken: string | undefined;
    isActive?: boolean;
    isOrderByCheckpoint?: boolean;
  }[] = [
    {
      queryRange: { min: "", max: "FF" },
      continuationToken,
    },
  ],
): FeedOptions {
  return {
    ...options,
    enableQueryControl: true,
    continuationToken: JSON.stringify({
      rid: "container-rid",
      rangeMappings,
      orderByItems: [{ item: 5 }],
      skipCount,
      documentRid: continuationRid,
    }),
  };
}

function createOrderByFilter(rid: string) {
  return {
    orderByItems: [{ item: 5 }],
    rid,
    skipCount: 1,
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

function createTwoFieldOrderByQueryInfo() {
  return {
    queryRanges: partitionedQueryExecutionInfo.queryRanges,
    queryInfo: {
      orderBy: ["Ascending", "Descending"],
      orderByExpressions: [
        { expression: "c.value", type: "PropertyRef" },
        { expression: "c.id", type: "PropertyRef" },
      ],
      rewrittenQuery:
        'SELECT c._rid, [{"item": c.value}, {"item": c.id}] AS orderByItems, c AS payload ' +
        "FROM c WHERE {documentdb-formattableorderbyquery-filter} ORDER BY c.value, c.id DESC",
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

function createParallelContinuationToken(
  ranges: { min: string; max: string; continuationToken: string }[],
): string {
  return JSON.stringify({
    rid: "container-rid",
    rangeMappings: ranges.map((range) => ({
      queryRange: { min: range.min, max: range.max },
      continuationToken: range.continuationToken,
    })),
  });
}
