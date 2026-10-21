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

async function drainContext(context: ParallelQueryExecutionContext): Promise<{
  completed: boolean;
  iterations: number;
  requestCharge: number;
  resources: TestDocument[];
}> {
  const resources: TestDocument[] = [];
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
      resources.push(...response.result.buffer);
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
