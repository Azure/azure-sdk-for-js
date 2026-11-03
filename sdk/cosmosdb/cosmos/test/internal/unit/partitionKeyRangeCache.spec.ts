// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PartitionKeyRangeCache } from "../../../src/routing/index.js";
import type { ClientContext } from "../../../src/ClientContext.js";
import { createDummyDiagnosticNode } from "../../public/common/TestHelpers.js";
import { describe, it, assert } from "vitest";

describe("PartitionKeyRangeCache", () => {
  const collectionLink = "dbs/testdb/colls/testcoll";
  const ranges = [{ id: "0", minInclusive: "", maxExclusive: "FF" }];

  // Builds a fake ClientContext whose queryPartitionKeyRanges() counts fetches and can be
  // toggled to fail, so we can exercise the cache's dedupe/eviction/forceRefresh behavior.
  function makeContext(): {
    ctx: ClientContext;
    calls: () => number;
    setFail: (f: boolean) => void;
  } {
    let count = 0;
    let fail = false;
    const ctx = {
      queryPartitionKeyRanges: () => ({
        fetchAllInternal: async () => {
          count++;
          if (fail) throw new Error("transient pkranges failure");
          return { resources: ranges };
        },
      }),
    } as unknown as ClientContext;
    return { ctx, calls: () => count, setFail: (f) => (fail = f) };
  }

  it("dedupes concurrent first-time lookups into one fetch", async () => {
    const { ctx, calls } = makeContext();
    const cache = new PartitionKeyRangeCache(ctx);
    await Promise.all([
      cache.onCollectionRoutingMap(collectionLink, createDummyDiagnosticNode()),
      cache.onCollectionRoutingMap(collectionLink, createDummyDiagnosticNode()),
      cache.onCollectionRoutingMap(collectionLink, createDummyDiagnosticNode()),
    ]);
    assert.strictEqual(calls(), 1);
  });

  it("serves later lookups from cache without re-fetching", async () => {
    const { ctx, calls } = makeContext();
    const cache = new PartitionKeyRangeCache(ctx);
    await cache.onCollectionRoutingMap(collectionLink, createDummyDiagnosticNode());
    await cache.onCollectionRoutingMap(collectionLink, createDummyDiagnosticNode());
    assert.strictEqual(calls(), 1);
  });

  it("evicts on failure so the next lookup retries instead of reusing a rejected promise", async () => {
    const { ctx, calls, setFail } = makeContext();
    const cache = new PartitionKeyRangeCache(ctx);

    setFail(true);
    let threw = false;
    try {
      await cache.onCollectionRoutingMap(collectionLink, createDummyDiagnosticNode());
    } catch {
      threw = true;
    }
    assert.isTrue(threw);

    setFail(false);
    const map = await cache.onCollectionRoutingMap(collectionLink, createDummyDiagnosticNode());
    assert.isDefined(map);
    assert.strictEqual(calls(), 2);
  });

  it("keeps the prior map and surfaces the error when a forceRefresh fails", async () => {
    const { ctx, calls, setFail } = makeContext();
    const cache = new PartitionKeyRangeCache(ctx);

    const good = await cache.onCollectionRoutingMap(collectionLink, createDummyDiagnosticNode());

    setFail(true);
    let threw = false;
    try {
      await cache.onCollectionRoutingMap(collectionLink, createDummyDiagnosticNode(), true);
    } catch {
      threw = true;
    }
    assert.isTrue(threw);

    // The failed refresh did not poison the cache: the prior map is still served without refetch.
    const after = await cache.onCollectionRoutingMap(collectionLink, createDummyDiagnosticNode());
    assert.strictEqual(after, good);
    assert.strictEqual(calls(), 2);
  });

  it("dedupes concurrent forceRefresh calls into one fetch and shares the outcome", async () => {
    const { ctx, calls, setFail } = makeContext();
    const cache = new PartitionKeyRangeCache(ctx);

    const good = await cache.onCollectionRoutingMap(collectionLink, createDummyDiagnosticNode());
    assert.strictEqual(calls(), 1);

    // Several simultaneous forceRefresh calls collapse to a single fetch; if it fails, all share
    // the error and the prior map is kept.
    setFail(true);
    const refreshes = [0, 1, 2].map(() =>
      cache
        .onCollectionRoutingMap(collectionLink, createDummyDiagnosticNode(), true)
        .catch(() => "err"),
    );
    const outcomes = await Promise.all(refreshes);
    assert.deepStrictEqual(outcomes, ["err", "err", "err"]);
    assert.strictEqual(calls(), 2);

    setFail(false);
    const after = await cache.onCollectionRoutingMap(collectionLink, createDummyDiagnosticNode());
    assert.strictEqual(after, good);
    assert.strictEqual(calls(), 2);
  });
});
