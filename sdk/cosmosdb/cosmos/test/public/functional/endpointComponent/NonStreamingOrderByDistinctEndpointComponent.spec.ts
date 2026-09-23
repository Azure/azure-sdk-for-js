// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExecutionContext } from "../../../../src/queryExecutionContext/index.js";
import { NonStreamingOrderByDistinctEndpointComponent } from "../../../../src/queryExecutionContext/EndpointComponent/NonStreamingOrderByDistinctEndpointComponent.js";
import type { QueryInfo } from "../../../../src/request/ErrorResponse.js";
import { describe, it, assert } from "vitest";

describe("NonStreamingOrderByDistinctEndpointComponent", () => {
  it("should initialize correctly with sort orders and priority queue buffer size", () => {
    const executionContext: ExecutionContext = {} as ExecutionContext;
    const queryInfo: QueryInfo = {
      orderBy: ["Ascending"],
    } as QueryInfo;
    const bufferSize = 2000;

    const component = new NonStreamingOrderByDistinctEndpointComponent(
      executionContext,
      queryInfo,
      bufferSize,
    );

    assert.equal(component["sortOrders"], queryInfo.orderBy);
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
    const queryInfo: QueryInfo = {
      orderBy: ["Ascending"],
    } as QueryInfo;
    const component = new NonStreamingOrderByDistinctEndpointComponent(
      mockExecutionContext,
      queryInfo,
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
    let fetchMoreCalls = 0;
    const executionContext = {
      hasMoreResults: () => fetchMoreCalls < 2,
      nextItem: async () => ({ result: {}, headers: {} }),
      fetchMore: async () => {
        fetchMoreCalls++;
        return { result: { buffer: [] }, headers: {} };
      },
    } as unknown as ExecutionContext;

    const component = new NonStreamingOrderByDistinctEndpointComponent(
      executionContext,
      { orderBy: ["Ascending"] } as QueryInfo,
      11,
    );

    const first = await component.fetchMore({} as any);
    assert.deepStrictEqual(first.result.buffer, []);
    assert.equal(fetchMoreCalls, 1);
    assert.equal(component.hasMoreResults(), true);

    const second = await component.fetchMore({} as any);
    assert.equal(second.result, undefined);
    assert.equal(fetchMoreCalls, 2);
    assert.equal(component.hasMoreResults(), false);

    const third = await component.fetchMore({} as any);
    assert.equal(third.result, undefined);
    assert.equal(fetchMoreCalls, 2);
  });

  it("hasMoreResults() reports false once fetchMore() has completed, even if the underlying executionContext still claims otherwise", async () => {
    let fetchMoreCalls = 0;
    const zombieExecutionContext = {
      hasMoreResults: () => true,
      nextItem: async () => ({ result: {}, headers: {} }),
      fetchMore: async () => {
        fetchMoreCalls++;
        return undefined as any;
      },
    } as unknown as ExecutionContext;

    const component = new NonStreamingOrderByDistinctEndpointComponent(
      zombieExecutionContext,
      { orderBy: ["Ascending"] } as QueryInfo,
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

    const second = await component.fetchMore({} as any);
    assert.equal(second.result, undefined);
    assert.equal(fetchMoreCalls, 1);
  });

  it("does not skip rows that arrive after an interim empty page", async () => {
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

    const component = new NonStreamingOrderByDistinctEndpointComponent(
      executionContext,
      { orderBy: ["Ascending"] } as QueryInfo,
      11,
    );

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
