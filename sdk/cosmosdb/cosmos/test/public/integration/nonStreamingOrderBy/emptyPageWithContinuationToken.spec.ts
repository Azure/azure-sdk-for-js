// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  Container,
  IndexingPolicy,
  Next,
  Plugin,
  RequestContext,
  SqlQuerySpec,
} from "../../../../src/index.js";
import { CosmosClient, OperationType, ResourceType } from "../../../../src/index.js";
import { endpoint } from "../../common/_testConfig.js";
import { masterKey } from "../../common/_fakeTestSecrets.js";
import { getTestContainer, removeAllDatabases } from "../../common/TestHelpers.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

interface QueryResponseBody {
  Documents?: unknown[];
}

interface SerializedQuery {
  query: string;
}

describe("NSOB empty page with continuation token", { timeout: 60000 }, () => {
  const continuationHeader = "x-ms-continuation";
  const itemCount = 6;
  const maxIteratorPages = 20;
  let armed = false;
  let injected = false;
  let interceptedToken: string | undefined;
  let removedDocumentCount = 0;
  let tokenReuseSucceeded = false;
  let sawLaterDocuments = false;
  let rewrittenRequestCount = 0;
  let container: Container;

  const emptyOneTokenBearingPage: Plugin<QueryResponseBody> = async (
    context: RequestContext,
    _diagnosticNode,
    next: Next<QueryResponseBody>,
  ) => {
    const isTargetQuery =
      armed &&
      context.operationType === OperationType.Query &&
      context.resourceType === ResourceType.item &&
      context.path?.includes(`/colls/${encodeURIComponent(container.id)}/docs`) === true;

    if (!isTargetQuery) {
      return next(context);
    }

    if (typeof context.body === "string") {
      const request = JSON.parse(context.body) as SerializedQuery;
      if (request.query.includes("_FullTextScore") && request.query.includes(" AS orderByItems")) {
        request.query =
          'SELECT c._rid, [{"item": c.id}] AS orderByItems, ' +
          '{"payload": {"id": c.id, "body": c.body}, "componentScores": []} AS payload ' +
          "FROM c WHERE c.category = @category";
        context.body = JSON.stringify(request);
        rewrittenRequestCount++;
      }
    }

    const outgoingToken = context.headers?.[continuationHeader];
    const reusesInterceptedToken =
      interceptedToken !== undefined && outgoingToken === interceptedToken;
    const response = await next(context);
    const documents = response.result?.Documents;
    const responseToken = response.headers[continuationHeader];

    if (reusesInterceptedToken) {
      tokenReuseSucceeded = true;
    }

    if (injected && Array.isArray(documents) && documents.length > 0) {
      sawLaterDocuments = true;
    }

    if (
      !injected &&
      Array.isArray(documents) &&
      documents.length > 0 &&
      typeof responseToken === "string" &&
      responseToken.length > 0
    ) {
      interceptedToken = responseToken;
      removedDocumentCount = documents.length;
      response.result.Documents = [];
      injected = true;
    }

    return response;
  };

  const client = new CosmosClient({
    endpoint,
    key: masterKey,
    plugins: [{ on: "request", plugin: emptyOneTokenBearingPage }],
  });

  beforeAll(async () => {
    await removeAllDatabases(client);
    const indexingPolicy: IndexingPolicy = {
      automatic: true,
      includedPaths: [{ path: "/*" }],
      excludedPaths: [{ path: '/"_etag"/?' }],
      fullTextIndexes: [{ path: "/body" }],
    };
    container = await getTestContainer("NSOB empty token page", client, {
      partitionKey: { paths: ["/category"] },
      indexingPolicy,
      fullTextPolicy: {
        defaultLanguage: "en-US",
        fullTextPaths: [{ path: "/body", language: "en-US" }],
      },
    });

    await Promise.all(
      Array.from({ length: itemCount }, (_, index) =>
        container.items.create({
          id: `item-${index}`,
          category: "target",
          body: index % 2 === 0 ? "swim and run" : "run and swim",
        }),
      ),
    );
  });

  afterAll(async () => {
    armed = false;
    await removeAllDatabases(client);
    client.dispose();
  });

  it("continues with the same token and returns later pages", async () => {
    const query: SqlQuerySpec = {
      query:
        "SELECT TOP 6 c.id, c.body FROM c " +
        "WHERE c.category = @category " +
        "ORDER BY RANK FullTextScore(c.body, 'swim', 'run')",
      parameters: [{ name: "@category", value: "target" }],
    };
    const iterator = container.items.query<{ id: string }>(query, {
      forceQueryPlan: true,
      maxItemCount: 1,
    });
    const resultIds: string[] = [];
    let iteratorPages = 0;
    armed = true;

    while (iterator.hasMoreResults()) {
      expect(iteratorPages).toBeLessThan(maxIteratorPages);
      const response = await iterator.fetchNext();
      iteratorPages++;
      resultIds.push(...response.resources.map((item) => item.id));
    }

    expect(rewrittenRequestCount).toBeGreaterThan(0);
    expect(injected).toBe(true);
    expect(interceptedToken).toBeDefined();
    expect(tokenReuseSucceeded).toBe(true);
    expect(sawLaterDocuments).toBe(true);
    expect(resultIds).toHaveLength(itemCount - removedDocumentCount);
  });
});
