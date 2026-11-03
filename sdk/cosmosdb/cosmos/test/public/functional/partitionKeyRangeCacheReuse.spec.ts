// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosClient, ResourceType } from "../../../src/index.js";
import type { Container } from "../../../src/index.js";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import { getTestContainer, removeAllDatabases } from "../common/TestHelpers.js";
import { describe, it, beforeAll, afterAll, expect } from "vitest";

/**
 * The partition key range cache is shared via ClientContext, so cross-partition queries should
 * fetch pkranges from the gateway once and reuse the cache on subsequent queries.
 */
describe("Partition key range cache reuse", { timeout: 60000 }, () => {
  let pkRangeRequests = 0;
  const client = new CosmosClient({
    endpoint,
    key: masterKey,
    plugins: [
      {
        on: "request",
        plugin: async (context, _diagNode, next) => {
          if (context.resourceType === ResourceType.pkranges) {
            pkRangeRequests++;
          }
          return next(context);
        },
      },
    ],
  });
  let container: Container;

  beforeAll(async () => {
    await removeAllDatabases(client);
    container = await getTestContainer("pkrange-cache-reuse", client, {
      partitionKey: { paths: ["/pk"] },
      throughput: 12000,
    });
    await Promise.all(
      Array.from({ length: 30 }, (_, i) =>
        container.items.create({ id: `item-${i}`, pk: `pk-${i}` }),
      ),
    );
  });

  afterAll(async () => {
    await removeAllDatabases(client);
  });

  it("fetches pkranges once and serves later cross-partition queries from cache", async () => {
    const options = { forceQueryPlan: true };
    await container.items.query("SELECT * FROM c", options).fetchAll();
    expect(pkRangeRequests).toBeGreaterThan(0);
    const afterFirst = pkRangeRequests;

    for (let i = 0; i < 3; i++) {
      await container.items.query("SELECT * FROM c", options).fetchAll();
    }

    // Subsequent queries reuse the cached routing map - no extra pkranges requests.
    expect(pkRangeRequests).toBe(afterFirst);
  });
});
