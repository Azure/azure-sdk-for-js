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

  it("should continue after an empty page while the inner context has more results", async () => {
    let fetchCount = 0;
    let innerHasMoreResults = true;
    const mockExecutionContext = {
      hasMoreResults: () => innerHasMoreResults,
      fetchMore: async () => {
        fetchCount++;
        if (fetchCount === 1) {
          return {
            result: { buffer: [] },
            headers: {},
          };
        }
        if (fetchCount === 2) {
          return {
            result: {
              buffer: [
                {
                  orderByItems: [{ item: 1 }],
                  payload: { id: "later-result" },
                },
              ],
            },
            headers: {},
          };
        }
        innerHasMoreResults = false;
        return {
          result: { buffer: [] },
          headers: {},
        };
      },
    } as ExecutionContext;
    const queryInfo = {
      orderBy: ["Ascending"],
    } as QueryInfo;
    const component = new NonStreamingOrderByDistinctEndpointComponent(
      mockExecutionContext,
      queryInfo,
      10,
    );

    const firstResponse = await component.fetchMore();
    assert.deepStrictEqual(firstResponse.result.buffer, []);
    assert.isTrue(component.hasMoreResults());

    const secondResponse = await component.fetchMore();
    assert.deepStrictEqual(secondResponse.result.buffer, []);
    assert.isTrue(component.hasMoreResults());

    const finalResponse = await component.fetchMore();
    assert.deepStrictEqual(finalResponse.result.buffer, [{ id: "later-result" }]);
    assert.equal(fetchCount, 3);
    assert.isFalse(component.hasMoreResults());
  });

  it("should stop reporting results after local completion", async () => {
    let fetchCount = 0;
    const mockExecutionContext = {
      hasMoreResults: () => true,
      fetchMore: async () => {
        fetchCount++;
        return undefined as never;
      },
    } as ExecutionContext;
    const queryInfo = {
      orderBy: ["Ascending"],
    } as QueryInfo;
    const component = new NonStreamingOrderByDistinctEndpointComponent(
      mockExecutionContext,
      queryInfo,
      10,
    );

    const response = await component.fetchMore();
    assert.isUndefined(response.result);
    assert.isFalse(component.hasMoreResults());

    const responseAfterCompletion = await component.fetchMore();
    assert.isUndefined(responseAfterCompletion.result);
    assert.equal(fetchCount, 1);
  });
});
