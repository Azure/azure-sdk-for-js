// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosClient, OperationType, ResourceType } from "../../../src/index.js";
import type { Container, QueryIterator } from "../../../src/index.js";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import { getTestContainer, removeAllDatabases } from "../common/TestHelpers.js";
import { describe, it, beforeAll, afterAll, expect } from "vitest";

/**
 * Resuming an `enableQueryControl` query (without `forceQueryPlan`) from a continuation token.
 * The token is an SDK-internal composite token (rid + per-range tokens) the gateway can't parse,
 * so it must never be forwarded raw as `x-ms-continuation`; the iterator must route through the
 * query plan instead. Before the fix this failed with `MalformedContinuationToken` (20007) on
 * the compute gateway exercised by signoff pipelines.
 */
describe(
  "Continuation token resume with enableQueryControl (no forceQueryPlan)",
  { timeout: 60000 },
  () => {
    // Records every x-ms-continuation header sent on a query request, to assert the composite
    // token is never forwarded to the gateway.
    let sentContinuationHeaders: string[] = [];
    const client = new CosmosClient({
      endpoint,
      key: masterKey,
      plugins: [
        {
          on: "request",
          plugin: async (context, _diagNode, next) => {
            if (
              context.operationType === OperationType.Query &&
              context.resourceType === ResourceType.item &&
              context.headers?.["x-ms-continuation"]
            ) {
              sentContinuationHeaders.push(context.headers["x-ms-continuation"] as string);
            }
            return next(context);
          },
        },
      ],
    });
    let container: Container;
    let multiPartitionContainer: Container;
    const ITEM_COUNT = 40;
    const MP_ITEM_COUNT = 40;
    // Cap so a non-progressing resume fails fast instead of hitting the 60s timeout.
    const MAX_PAGES = 200;

    beforeAll(async () => {
      await removeAllDatabases(client);
      container = await getTestContainer("query-control-resume", client, {
        partitionKey: { paths: ["/pk"] },
      });
      // High throughput forces multiple physical partitions (where per-range tokens can be undefined).
      multiPartitionContainer = await getTestContainer("query-control-resume-mp", client, {
        partitionKey: { paths: ["/pk"] },
        throughput: 12000,
      });

      const items = Array.from({ length: ITEM_COUNT }, (_, i) => ({
        id: `item-${i}`,
        pk: `pk-${i % 4}`,
        sequence: i,
      }));
      await Promise.all(items.map((item) => container.items.create(item)));
      await Promise.all(
        Array.from({ length: MP_ITEM_COUNT }, (_, i) =>
          multiPartitionContainer.items.create({ id: `mp-${i}`, pk: `pk-${i}`, sequence: i }),
        ),
      );
    });

    afterAll(async () => {
      await removeAllDatabases(client);
    });

    /** Drains an ORDER BY query, rebuilding the iterator from each token and skipping empty pages. */
    async function drainOrderByWithTokenResume(
      query: string,
      queryOptions: Record<string, unknown>,
    ): Promise<string[]> {
      const ids: string[] = [];
      let iterator = container.items.query(query, queryOptions);
      let pages = 0;

      while (iterator.hasMoreResults()) {
        expect(pages++).toBeLessThan(MAX_PAGES);
        let result = await iterator.fetchNext();
        while (iterator.hasMoreResults() && result.resources.length === 0) {
          expect(pages++).toBeLessThan(MAX_PAGES);
          result = await iterator.fetchNext();
        }
        if (result.resources.length === 0) break;
        ids.push(...result.resources.map((r: any) => r.id));
        if (result.continuationToken && iterator.hasMoreResults()) {
          iterator = container.items.query(query, {
            ...queryOptions,
            continuationToken: result.continuationToken,
          });
        }
      }

      return ids;
    }

    /** Drains `iterator` (same instance) until it yields a token, collecting ids into `out`. */
    async function pageUntilToken(
      iterator: QueryIterator<any>,
      out?: Set<string>,
    ): Promise<string | undefined> {
      for (let page = 0; page < MAX_PAGES && iterator.hasMoreResults(); page++) {
        const result = await iterator.fetchNext();
        result.resources?.forEach((r: any) => out?.add(r.id));
        if (result.continuationToken) return result.continuationToken;
      }
      return undefined;
    }

    /** Builds a fresh iterator from `token` and drains it, collecting ids into `out`. */
    async function resumeAndDrain(
      query: string,
      queryOptions: Record<string, unknown>,
      token: string,
      out?: Set<string>,
    ): Promise<void> {
      const iterator = container.items.query(query, { ...queryOptions, continuationToken: token });
      for (let page = 0; iterator.hasMoreResults(); page++) {
        expect(page).toBeLessThan(MAX_PAGES);
        const result = await iterator.fetchNext();
        result.resources?.forEach((r: any) => out?.add(r.id));
      }
    }

    /** Asserts the token is an SDK composite token (rid + rangeMappings), not a raw backend string. */
    function expectCompositeToken(token: string | undefined): void {
      expect(token).toBeDefined();
      const parsed = JSON.parse(token as string);
      expect(parsed.rid).toBeDefined();
      expect(Array.isArray(parsed.rangeMappings)).toBe(true);
    }

    it("resumes a parallel query from its composite token in a fresh iterator", async () => {
      const query = "SELECT * FROM c";
      const queryOptions = { maxItemCount: 5, enableQueryControl: true };

      const firstPhaseIds = new Set<string>();
      const token = await pageUntilToken(container.items.query(query, queryOptions), firstPhaseIds);
      expectCompositeToken(token);

      const resumedIds = new Set<string>();
      await resumeAndDrain(query, queryOptions, token as string, resumedIds);

      expect(resumedIds.size).toBeGreaterThan(0);
      expect(new Set([...firstPhaseIds, ...resumedIds]).size).toBe(ITEM_COUNT);
    });

    it("resumes an ORDER BY query, preserving order and completeness", async () => {
      const query = "SELECT * FROM c ORDER BY c.sequence ASC";
      const queryOptions = { maxItemCount: 5, enableQueryControl: true };

      const orderedIds = await drainOrderByWithTokenResume(query, queryOptions);

      const expectedOrder = Array.from({ length: ITEM_COUNT }, (_, i) => `item-${i}`);
      expect(orderedIds).toEqual(expectedOrder);
    });

    it("re-forces the pipelined path after reset()", async () => {
      const query = "SELECT * FROM c";
      const queryOptions = { maxItemCount: 5, enableQueryControl: true };
      const iterator = container.items.query(query, queryOptions);

      // After reset() the next drain must re-force the pipeline, not fall back to the direct path.
      await iterator.fetchNext();
      iterator.reset();

      expectCompositeToken(await pageUntilToken(iterator));
    });

    it("never forwards the composite token to the gateway as x-ms-continuation", async () => {
      const query = "SELECT * FROM c";
      const queryOptions = { maxItemCount: 5, enableQueryControl: true };

      const token = await pageUntilToken(container.items.query(query, queryOptions));
      expect(token).toBeDefined();

      sentContinuationHeaders = [];
      await resumeAndDrain(query, queryOptions, token as string);

      // The gateway only sees per-range backend tokens, never the composite token.
      expect(sentContinuationHeaders.length).toBeGreaterThan(0);
      expect(sentContinuationHeaders).not.toContain(token);
    });

    it("resumes a multi-partition query via continuationToken without leaking the composite token", async () => {
      // Multi-partition: per-range tokens can be undefined. Resume must not leak the composite
      // token and must return the complete result set across partitions.
      for (const query of ["SELECT * FROM c", "SELECT * FROM c ORDER BY c.sequence ASC"]) {
        const queryOptions = { maxItemCount: 5, enableQueryControl: true };
        const firstPhaseIds = new Set<string>();
        const token = await pageUntilToken(
          multiPartitionContainer.items.query(query, queryOptions),
          firstPhaseIds,
        );
        expectCompositeToken(token);

        sentContinuationHeaders = [];
        const resumedIds = new Set<string>();
        const iterator = multiPartitionContainer.items.query(query, {
          ...queryOptions,
          continuationToken: token,
        });
        for (let page = 0; iterator.hasMoreResults(); page++) {
          expect(page).toBeLessThan(MAX_PAGES);
          const result = await iterator.fetchNext();
          result.resources?.forEach((r: any) => resumedIds.add(r.id));
        }

        expect(sentContinuationHeaders).not.toContain(token);
        expect(new Set([...firstPhaseIds, ...resumedIds]).size).toBe(MP_ITEM_COUNT);
      }
    });

    it("forwards the backend token to the gateway when enableQueryControl is disabled", async () => {
      // Positive control: legacy mode forwards the opaque backend token directly, proving the
      // capturing plugin works (so the no-leak assertions above are not vacuous).
      const query = "SELECT * FROM c";
      const queryOptions = { maxItemCount: 5 };

      const token = await pageUntilToken(container.items.query(query, queryOptions));
      expect(token).toBeDefined();
      expect(JSON.parse(token as string).rangeMappings).toBeUndefined();

      sentContinuationHeaders = [];
      await resumeAndDrain(query, queryOptions, token as string);

      expect(sentContinuationHeaders).toContain(token);
    });
  },
);
