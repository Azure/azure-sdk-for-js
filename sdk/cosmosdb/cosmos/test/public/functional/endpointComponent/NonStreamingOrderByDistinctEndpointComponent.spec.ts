// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import assert from "assert";
import type { ExecutionContext } from "../../../../src/queryExecutionContext";
import { NonStreamingOrderByDistinctEndpointComponent } from "../../../../src/queryExecutionContext/EndpointComponent/NonStreamingOrderByDistinctEndpointComponent";
import type { QueryInfo } from "../../../../src/request/ErrorResponse";

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
        result: [
          {
            orderByItems: [
              {
                item: item++,
              },
            ],
            payload: { id: id++ },
          },
        ],
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
        assert.deepStrictEqual(response.result, []);
      } else {
        assert.deepStrictEqual(response.result.length, count);
      }
      count++;
    }
  });
});
