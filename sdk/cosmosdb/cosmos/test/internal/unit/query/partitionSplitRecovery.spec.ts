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
        if (requests.length > 4) {
          throw new Error(`Parallel coverage request guard exceeded: ${JSON.stringify(requests)}`);
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
      if (iterationCount > 4) {
        throw new Error("Parallel coverage iteration guard exceeded 4 pages");
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

    assert.deepEqual(resources, [leftResource, rightResource]);
    assert.deepEqual(
      requests.map((request) => [request.startEpk, request.endEpk]),
      [
        ["", "80"],
        ["80", "FF"],
        ["80", "FF"],
      ],
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
  rangeMappings = [
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
