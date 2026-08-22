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

  it("hasMoreResults() reports false once fetchMore() has completed, even if the underlying executionContext still claims otherwise", async () => {
    // Regression test for a zero-hit query hanging indefinitely: fetchMore() already
    // sets `isCompleted` the moment a page comes back empty, and every later fetchMore()
    // call correctly short-circuits without touching executionContext again -- but
    // hasMoreResults() previously consulted ONLY executionContext.hasMoreResults(), so a
    // caller driving a `while (component.hasMoreResults())` loop never learned the query
    // was done whenever the underlying context kept reporting true (e.g. a document
    // producer re-queued after a zero-item page with a live continuation token, never
    // revisited once the isCompleted short-circuit takes over above it). That produced a
    // client-side infinite loop of already-terminal, no-I/O fetchMore() calls.
    //
    // Deliberately does NOT drive this via `while (component.hasMoreResults())` -- doing
    // so would reproduce the exact hang in the test suite itself if this regressed.
    // Asserting directly after a single fetchMore() call catches the same defect and
    // fails fast instead of hanging CI.
    let fetchMoreCalls = 0;
    const zombieExecutionContext: ExecutionContext = {
      hasMoreResults: () => true, // never flips to false, even after the terminal page
      nextItem: async () => ({ result: {}, headers: {} }),
      fetchMore: async () => {
        fetchMoreCalls++;
        return { result: { buffer: [] }, headers: {} }; // the terminal empty page
      },
    } as ExecutionContext;

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
});
