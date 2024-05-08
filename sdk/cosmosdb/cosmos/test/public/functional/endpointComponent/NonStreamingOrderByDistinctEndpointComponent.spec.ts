// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { ExecutionContext } from "../../../../src/queryExecutionContext";
import { NonStreamingOrderByDistinctEndpointComponent } from "../../../../src/queryExecutionContext/EndpointComponent/NonStreamingOrderByDistinctEndpointComponent";
import { QueryInfo } from "../../../../src/request/ErrorResponse";

describe("NonStreamingOrderByEndpointComponent", () => {
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

  it("should handle nextItem method correctly", async () => {
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
    const queryInfo: QueryInfo = {
      orderBy: ["Ascending"],
    } as QueryInfo;
    const component = new NonStreamingOrderByDistinctEndpointComponent(
      mockExecutionContext,
      queryInfo,
      2000,
    );

    let count = 1;
    let result_id = 1;
    // call nextItem, for first 99 items it will give empty result
    while (component.hasMoreResults()) {
      const response = await component.nextItem({} as any);
      if (count < 99) {
        assert.deepStrictEqual(response.result, {});
      } else {
        assert.deepStrictEqual(response.result, { id: result_id++ });
      }
      count++;
    }
    // Final result array should be empty after all results processed
    assert.equal(component["finalResultArray"].length, 0);
  });
});
