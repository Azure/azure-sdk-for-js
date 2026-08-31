// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExecutionContext } from "../../../../src/queryExecutionContext/index.js";
import { NonStreamingOrderByEndpointComponent } from "../../../../src/queryExecutionContext/EndpointComponent/NonStreamingOrderByEndpointComponent.js";
import { describe, it, assert } from "vitest";

describe("NonStreamingOrderByEndpointComponent", () => {
  it("should initialize correctly with sort orders and priority queue buffer size", () => {
    const executionContext: ExecutionContext = {} as ExecutionContext;
    const sortOrders = ["field1", "field2"];
    const bufferSize = 2000;

    const component = new NonStreamingOrderByEndpointComponent(
      executionContext,
      sortOrders,
      bufferSize,
    );

    assert.equal(component["sortOrders"], sortOrders);
    assert.equal(component["priorityQueueBufferSize"], bufferSize);
  });

  it("should handle fetchMore method correctly", async () => {
    let id = 1;
    let item = 1;
    const mockExecutionContext: ExecutionContext = {
      hasMoreResults: () => {
        if (id === 100) {
          return false;
        } else {
          return true;
        }
      },
      nextItem: async () => ({
        result: {},
        headers: {},
      }),
      fetchMore: async () => ({
        result: {
          buffer: [
            {
              orderByItems: [
                {
                  item: item++,
                },
              ],
              payload: { id: id++ },
            },
          ],
        },
        headers: {},
      }),
    } as ExecutionContext;
    const sortOrders = ["Ascending"];
    const component = new NonStreamingOrderByEndpointComponent(
      mockExecutionContext,
      sortOrders,
      2000,
    );

    let count = 1;
    // call fetchMore, for first 99 items it will give empty result
    while (component.hasMoreResults()) {
      const response = await component.fetchMore({} as any);
      if (count < 99) {
        assert.deepStrictEqual(response.result.buffer, []);
      } else {
        assert.deepStrictEqual(response.result.buffer.length, count);
      }
      count++;
    }
  });

  it("terminates a zero-hit query even when an empty page arrives while the underlying context still reports more results", async () => {
    // Regression test for a zero-hit query hanging indefinitely (#39626). An interim empty
    // page must NOT complete the component -- an empty page can still carry a live
    // continuation token -- but re-driving fetchMore() must reach the underlying context
    // again (real I/O, not a no-op spin) and go terminal once that context exhausts.
    let fetchMoreCalls = 0;
    const executionContext = {
      hasMoreResults: () => fetchMoreCalls < 2,
      nextItem: async () => ({ result: {}, headers: {} }),
      fetchMore: async () => {
        fetchMoreCalls++;
        return { result: { buffer: [] }, headers: {} }; // every page is empty (zero hits)
      },
    } as unknown as ExecutionContext;

    const component = new NonStreamingOrderByEndpointComponent(executionContext, ["Ascending"], 11);

    // Interim empty page with a live continuation: not terminal, signals "more results".
    const first = await component.fetchMore({} as any);
    assert.deepStrictEqual(first.result.buffer, []);
    assert.equal(fetchMoreCalls, 1);
    assert.equal(component.hasMoreResults(), true);

    // Re-driven: the underlying context exhausts -> terminal, zero rows.
    const second = await component.fetchMore({} as any);
    assert.equal(second.result, undefined);
    assert.equal(fetchMoreCalls, 2);
    assert.equal(component.hasMoreResults(), false);

    // Later calls take the isCompleted fast path -- no further underlying calls.
    const third = await component.fetchMore({} as any);
    assert.equal(third.result, undefined);
    assert.equal(fetchMoreCalls, 2);
  });

  it("hasMoreResults() reports false once fetchMore() has completed, even if the underlying executionContext still claims otherwise", async () => {
    // The underlying context goes terminal (null response) but its hasMoreResults() never
    // flips to false. hasMoreResults() previously consulted ONLY the underlying context, so
    // a caller driving `while (component.hasMoreResults())` never learned the query was done
    // and spun forever on the already-terminal, no-I/O fetchMore() fast path (#39626).
    //
    // Deliberately does NOT drive this via `while (component.hasMoreResults())` -- doing so
    // would reproduce the exact hang in the test suite itself if this regressed. Asserting
    // directly after a single fetchMore() call catches the same defect and fails fast.
    let fetchMoreCalls = 0;
    const zombieExecutionContext = {
      hasMoreResults: () => true, // never flips to false, even after going terminal
      nextItem: async () => ({ result: {}, headers: {} }),
      fetchMore: async () => {
        fetchMoreCalls++;
        return undefined as any; // terminal null response
      },
    } as unknown as ExecutionContext;

    const component = new NonStreamingOrderByEndpointComponent(
      zombieExecutionContext,
      ["Ascending"],
      11,
    );

    const first = await component.fetchMore({} as any);
    assert.equal(first.result, undefined);
    assert.equal(fetchMoreCalls, 1);

    assert.equal(
      component.hasMoreResults(),
      false,
      "hasMoreResults() must report false once fetchMore() has gone terminal",
    );

    // A second call must take the isCompleted fast path -- no further calls into the
    // (zombie) underlying context.
    const second = await component.fetchMore({} as any);
    assert.equal(second.result, undefined);
    assert.equal(fetchMoreCalls, 1);
  });

  it("does not skip rows that arrive after an interim empty page", async () => {
    // Completing on the first empty page would silently drop every row behind it whenever a
    // later page still holds data (an empty page with a live continuation token).
    const pages = [
      { result: { buffer: [] }, headers: {} },
      {
        result: { buffer: [{ orderByItems: [{ item: 1 }], payload: { id: "behind-empty-page" } }] },
        headers: {},
      },
    ];
    let call = 0;
    const executionContext = {
      hasMoreResults: () => call < pages.length,
      nextItem: async () => ({ result: {}, headers: {} }),
      fetchMore: async () => pages[call++],
    } as unknown as ExecutionContext;

    const component = new NonStreamingOrderByEndpointComponent(executionContext, ["Ascending"], 11);

    const results: any[] = [];
    let guard = 0;
    while (component.hasMoreResults()) {
      assert.isBelow(++guard, 10, "drain loop did not terminate");
      const response = await component.fetchMore({} as any);
      if (response.result?.buffer?.length) {
        results.push(...response.result.buffer);
      }
    }
    assert.deepStrictEqual(results, [{ id: "behind-empty-page" }]);
  });
});
