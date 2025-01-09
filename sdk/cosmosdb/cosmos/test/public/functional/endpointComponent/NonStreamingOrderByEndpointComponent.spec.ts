// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import assert from "assert";
import type { ExecutionContext } from "../../../../src/queryExecutionContext";
import { NonStreamingOrderByEndpointComponent } from "../../../../src/queryExecutionContext/EndpointComponent/NonStreamingOrderByEndpointComponent";

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

  // Skipping this test case for now. It can be removed once the nextItem method is deprecated.
  it.skip("should handle nextItem method correctly", async () => {
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
        result: {
          orderByItems: [
            {
              item: item++,
            },
          ],
          payload: { id: id++ },
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
    let result_id = 1;
    // call nextItem, for first 100 items it will give empty result
    while (component.hasMoreResults()) {
      const response = await component.nextItem({} as any);
      if (count < 99) {
        assert.deepStrictEqual(response.result, {});
      } else {
        assert.deepStrictEqual(response.result, { id: result_id++ });
      }
      count++;
    }
    // Queue should be empty after dequeueing
    assert.equal(component["nonStreamingOrderByPQ"].size(), 0);
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
        assert.deepStrictEqual(response.result, []);
      } else {
        assert.deepStrictEqual(response.result.length, count);
      }
      count++;
    }
  });
});
