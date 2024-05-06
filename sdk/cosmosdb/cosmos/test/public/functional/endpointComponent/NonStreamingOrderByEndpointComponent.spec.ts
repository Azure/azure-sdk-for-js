// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { ExecutionContext } from "../../../../src/queryExecutionContext";
import { NonStreamingOrderByEndpointComponent } from "../../../../src/queryExecutionContext/EndpointComponent/NonStreamingOrderByEndpointComponent";
import { NonStreamingOrderByResult } from "../../../../src/queryExecutionContext/nonStreamingOrderByResult";

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

  it("should handle nextItem method correctly", async () => {
    const mockExecutionContext: ExecutionContext = {
      hasMoreResults: () => true,
      nextItem: async () => ({ result: { payload: { id: 1 } }, headers: {} }),
    } as ExecutionContext;
    const sortOrders = ["Ascending", "Descending"];
    const component = new NonStreamingOrderByEndpointComponent(mockExecutionContext, sortOrders);

    // Enqueue an item
    component["nonStreamingOrderByPQ"].enqueue({
      _rid: "9TY+AKa0T5MDAAAAAAAAAA==",
      orderByItems: [
        {
          item: 26,
        },
      ],
      payload: {
        id: "3",
      },
    } as unknown as NonStreamingOrderByResult);

    // Dequeue the item
    const response = await component.nextItem({} as any);
    assert.deepStrictEqual(response.result, { id: 3 });

    // Queue should be empty after dequeueing
    assert.equal(component["nonStreamingOrderByPQ"].size(), 0);
  });

  it("should handle hasMoreResults method correctly", () => {
    // const mockExecutionContext: ExecutionContext = {
    //   hasMoreResults: jest.fn().mockReturnValue(false),
    // } as ExecutionContext;
    // const sortOrders = ["field1", "field2"];
    // const component = new NonStreamingOrderByEndpointComponent(mockExecutionContext, sortOrders);
    // // No more results in execution context and queue is empty
    // expect(component.hasMoreResults()).toBe(false);
    // // Mock execution context has more results but queue is empty
    // mockExecutionContext.hasMoreResults = jest.fn().mockReturnValue(true);
    // expect(component.hasMoreResults()).toBe(true);
    // // Mock execution context has no more results but queue is not empty
    // mockExecutionContext.hasMoreResults = jest.fn().mockReturnValue(false);
    // component["nonStreamingOrderByPQ"].enqueue({} as NonStreamingOrderByResult);
    // expect(component.hasMoreResults()).toBe(true);
  });
});
