// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  Container,
  IndexingPolicy,
  Next,
  Plugin,
  QueryIterator,
  RequestContext,
  SqlQuerySpec,
  VectorEmbeddingPolicy,
} from "../../../../src/index.js";
import { CosmosClient, OperationType, ResourceType } from "../../../../src/index.js";
import {
  VectorEmbeddingDataType,
  VectorEmbeddingDistanceFunction,
  VectorIndexType,
} from "../../../../src/documents/index.js";
import { endpoint } from "../../common/_testConfig.js";
import { masterKey } from "../../common/_fakeTestSecrets.js";
import { getTestContainer, removeAllDatabases } from "../../common/TestHelpers.js";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

interface QueryResponseBody {
  Documents?: unknown[];
}

interface SerializedQuery {
  query: string;
}

interface InnerExecutionContext {
  hasMoreResults(): boolean;
  fetchMore(): Promise<unknown>;
}

interface NonStreamingEndpoint {
  constructor: { name: string };
  executionContext: InnerExecutionContext;
  fetchMore(): Promise<{ result?: unknown }>;
  isCompleted: boolean;
}

interface PipelinedExecutionContext {
  endpoint: NonStreamingEndpoint;
  fetchImplementation: {
    constructor: { name: string };
  };
}

interface QueryIteratorInternals {
  queryExecutionContext: PipelinedExecutionContext;
}

type EmptyPageMode = "all" | "none" | "one";

interface QueryRunState {
  continuationTokensIssued: Set<string>;
  continuationTokensReused: Set<string>;
  emptiedContinuationTokens: string[];
  emptiedPageCount: number;
  mode: EmptyPageMode;
  removedDocumentCount: number;
  rewrittenRequestCount: number;
  sawDocumentsAfterEmptyPage: boolean;
  sawTerminalResponse: boolean;
}

interface QueryCase {
  distinct: boolean;
  endpointName:
    "NonStreamingOrderByDistinctEndpointComponent" | "NonStreamingOrderByEndpointComponent";
  name: string;
}

interface FetchImplementationCase {
  enableQueryControl: boolean;
  implementationName: "LegacyFetchImplementation" | "QueryControlFetchImplementation";
  name: string;
}

describe("NSOB empty pages with continuation tokens", { timeout: 60000 }, () => {
  const continuationHeader = "x-ms-continuation";
  const itemCount = 6;
  const maxIteratorPages = 20;
  const fetchImplementationCases: FetchImplementationCase[] = [
    {
      enableQueryControl: false,
      implementationName: "LegacyFetchImplementation",
      name: "legacy fetch path",
    },
    {
      enableQueryControl: true,
      implementationName: "QueryControlFetchImplementation",
      name: "query control path",
    },
  ];
  const queryCases: QueryCase[] = [
    {
      distinct: false,
      endpointName: "NonStreamingOrderByEndpointComponent",
      name: "regular",
    },
    {
      distinct: true,
      endpointName: "NonStreamingOrderByDistinctEndpointComponent",
      name: "DISTINCT",
    },
  ];
  let activeRun: QueryRunState | undefined;
  let container: Container;

  const rewriteAndInjectEmptyPages: Plugin<QueryResponseBody> = async (
    context: RequestContext,
    _diagnosticNode,
    next: Next<QueryResponseBody>,
  ) => {
    const run = activeRun;
    const isTargetQuery =
      run !== undefined &&
      context.operationType === OperationType.Query &&
      context.resourceType === ResourceType.item &&
      context.path?.includes(`/colls/${encodeURIComponent(container.id)}/docs`) === true;

    if (!isTargetQuery) {
      return next(context);
    }

    let isPhysicalNonStreamingRequest = false;
    if (typeof context.body === "string") {
      const request = JSON.parse(context.body) as SerializedQuery;
      if (request.query.includes(" AS orderByItems")) {
        request.query =
          'SELECT c._rid, [{"item": c.id}] AS orderByItems, ' +
          '{"payload": {"id": c.id, "body": c.body}, "componentScores": []} AS payload ' +
          "FROM c WHERE c.category = @category";
        context.body = JSON.stringify(request);
        run.rewrittenRequestCount++;
        isPhysicalNonStreamingRequest = true;
      }
    }

    if (!isPhysicalNonStreamingRequest) {
      return next(context);
    }

    const outgoingToken = context.headers?.[continuationHeader];
    if (typeof outgoingToken === "string" && run.continuationTokensIssued.has(outgoingToken)) {
      run.continuationTokensReused.add(outgoingToken);
    }

    const response = await next(context);
    const documents = response.result?.Documents;
    const responseToken = response.headers[continuationHeader];
    const hasContinuationToken = typeof responseToken === "string" && responseToken.length > 0;

    if (hasContinuationToken) {
      run.continuationTokensIssued.add(responseToken);
    } else {
      run.sawTerminalResponse = true;
    }

    if (
      run.mode === "one" &&
      run.emptiedPageCount > 0 &&
      Array.isArray(documents) &&
      documents.length > 0
    ) {
      run.sawDocumentsAfterEmptyPage = true;
    }

    const shouldEmptyPage =
      Array.isArray(documents) &&
      (run.mode === "all" ||
        (run.mode === "one" &&
          run.emptiedPageCount === 0 &&
          documents.length > 0 &&
          hasContinuationToken));

    if (shouldEmptyPage) {
      run.removedDocumentCount += documents.length;
      documents.length = 0;
      run.emptiedPageCount++;
      if (hasContinuationToken) {
        run.emptiedContinuationTokens.push(responseToken);
      }
    }

    return response;
  };

  const client = new CosmosClient({
    endpoint,
    key: masterKey,
    plugins: [{ on: "request", plugin: rewriteAndInjectEmptyPages }],
  });

  beforeAll(async () => {
    await removeAllDatabases(client);
    const indexingPolicy: IndexingPolicy = {
      automatic: true,
      includedPaths: [{ path: "/*" }],
      excludedPaths: [{ path: '/"_etag"/?' }],
      vectorIndexes: [{ path: "/vector", type: VectorIndexType.Flat }],
    };
    const vectorEmbeddingPolicy: VectorEmbeddingPolicy = {
      vectorEmbeddings: [
        {
          path: "/vector",
          dataType: VectorEmbeddingDataType.Float32,
          dimensions: 2,
          distanceFunction: VectorEmbeddingDistanceFunction.Euclidean,
        },
      ],
    };
    container = await getTestContainer("NSOB empty token pages", client, {
      partitionKey: { paths: ["/category"] },
      indexingPolicy,
      vectorEmbeddingPolicy,
    });

    await Promise.all(
      Array.from({ length: itemCount }, (_, index) =>
        container.items.create({
          id: `item-${index}`,
          category: "target",
          body: index % 2 === 0 ? "swim and run" : "run and swim",
          vector: [index / 10, index / 10],
        }),
      ),
    );
  });

  afterEach(() => {
    activeRun = undefined;
  });

  afterAll(async () => {
    activeRun = undefined;
    await removeAllDatabases(client);
    client.dispose();
  });

  function createRunState(mode: EmptyPageMode): QueryRunState {
    const state: QueryRunState = {
      continuationTokensIssued: new Set(),
      continuationTokensReused: new Set(),
      emptiedContinuationTokens: [],
      emptiedPageCount: 0,
      mode,
      removedDocumentCount: 0,
      rewrittenRequestCount: 0,
      sawDocumentsAfterEmptyPage: false,
      sawTerminalResponse: false,
    };
    activeRun = state;
    return state;
  }

  function createQuery(distinct: boolean): SqlQuerySpec {
    return {
      query:
        `SELECT ${distinct ? "DISTINCT " : ""}TOP 6 c.id, ` +
        "VectorDistance([0.0, 0.0], c.vector, true, " +
        "{distanceFunction: 'euclidean'}) AS similarityScore FROM c " +
        "WHERE c.category = @category " +
        "ORDER BY VectorDistance([0.0, 0.0], c.vector, true, " +
        "{distanceFunction: 'euclidean'})",
      parameters: [{ name: "@category", value: "target" }],
    };
  }

  function getEndpoint(
    iterator: QueryIterator<{ id: string }>,
    expectedEndpointName: QueryCase["endpointName"],
    expectedFetchImplementationName: FetchImplementationCase["implementationName"],
  ): NonStreamingEndpoint {
    const queryExecutionContext = (iterator as unknown as QueryIteratorInternals)
      .queryExecutionContext;
    const endpointComponent = queryExecutionContext.endpoint;
    expect(queryExecutionContext.fetchImplementation.constructor.name).toBe(
      expectedFetchImplementationName,
    );
    expect(endpointComponent.constructor.name).toBe(expectedEndpointName);
    return endpointComponent;
  }

  async function executeQuery(
    queryCase: QueryCase,
    fetchImplementationCase: FetchImplementationCase,
    mode: EmptyPageMode,
  ): Promise<{
    endpointComponent: NonStreamingEndpoint;
    iterator: QueryIterator<{ id: string }>;
    iteratorPages: number;
    resultIds: string[];
    run: QueryRunState;
  }> {
    const run = createRunState(mode);
    const iterator = container.items.query<{ id: string }>(createQuery(queryCase.distinct), {
      enableQueryControl: fetchImplementationCase.enableQueryControl,
      forceQueryPlan: true,
      maxDegreeOfParallelism: 1,
      maxItemCount: 1,
    });
    const resultIds: string[] = [];
    let iteratorPages = 0;

    while (iterator.hasMoreResults()) {
      expect(iteratorPages).toBeLessThan(maxIteratorPages);
      const response = await iterator.fetchNext();
      iteratorPages++;
      resultIds.push(...(response.resources ?? []).map((item) => item.id));
    }

    return {
      endpointComponent: getEndpoint(
        iterator,
        queryCase.endpointName,
        fetchImplementationCase.implementationName,
      ),
      iterator,
      iteratorPages,
      resultIds,
      run,
    };
  }

  function expectEmptiedTokensWereReused(run: QueryRunState): void {
    expect(run.emptiedContinuationTokens.length).toBeGreaterThan(0);
    for (const token of run.emptiedContinuationTokens) {
      expect(run.continuationTokensReused.has(token)).toBe(true);
    }
  }

  for (const queryCase of queryCases) {
    describe(`${queryCase.name} component`, () => {
      for (const fetchImplementationCase of fetchImplementationCases) {
        describe(fetchImplementationCase.name, () => {
          it("terminates when every backend page is empty", async () => {
            const { iterator, iteratorPages, resultIds, run } = await executeQuery(
              queryCase,
              fetchImplementationCase,
              "all",
            );

            expect(run.rewrittenRequestCount).toBeGreaterThan(0);
            expect(run.emptiedPageCount).toBeGreaterThan(1);
            expectEmptiedTokensWereReused(run);
            expect(run.sawTerminalResponse).toBe(true);
            expect(run.removedDocumentCount).toBe(itemCount);
            expect(resultIds).toEqual([]);
            expect(iteratorPages).toBeLessThan(maxIteratorPages);
            expect(iterator.hasMoreResults()).toBe(false);
          });

          it("stays completed when the underlying context reports stale results", async () => {
            const { endpointComponent, iterator, resultIds, run } = await executeQuery(
              queryCase,
              fetchImplementationCase,
              "none",
            );

            expect(run.rewrittenRequestCount).toBeGreaterThan(0);
            expect(resultIds).toHaveLength(itemCount);
            expect(endpointComponent.isCompleted).toBe(true);

            let innerFetchMoreCalls = 0;
            endpointComponent.executionContext.hasMoreResults = () => true;
            endpointComponent.executionContext.fetchMore = async () => {
              innerFetchMoreCalls++;
              return undefined;
            };

            expect(iterator.hasMoreResults()).toBe(false);
            const response = await endpointComponent.fetchMore();
            expect(response.result).toBeUndefined();
            expect(innerFetchMoreCalls).toBe(0);
          });

          it("returns documents that arrive after an empty page", async () => {
            const { iterator, iteratorPages, resultIds, run } = await executeQuery(
              queryCase,
              fetchImplementationCase,
              "one",
            );

            expect(run.rewrittenRequestCount).toBeGreaterThan(0);
            expect(run.emptiedPageCount).toBe(1);
            expectEmptiedTokensWereReused(run);
            expect(run.sawDocumentsAfterEmptyPage).toBe(true);
            expect(resultIds).toHaveLength(itemCount - run.removedDocumentCount);
            expect(iteratorPages).toBeLessThan(maxIteratorPages);
            expect(iterator.hasMoreResults()).toBe(false);
          });
        });
      }
    });
  }
});
