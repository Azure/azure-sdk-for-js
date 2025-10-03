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
        result: { buffer:[
          {
            orderByItems: [
              {
                item: item++,
              },
            ],
            payload: { id: id++ },
          },
        ]},
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
});
