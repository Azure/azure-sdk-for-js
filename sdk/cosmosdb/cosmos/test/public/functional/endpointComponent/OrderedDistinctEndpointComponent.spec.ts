// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExecutionContext } from "../../../../src/queryExecutionContext/index.js";
import { OrderedDistinctEndpointComponent } from "../../../../src/queryExecutionContext/EndpointComponent/OrderedDistinctEndpointComponent.js";
import { describe, it, assert } from "vitest";

describe("OrderedDistinctEndpointComponent", () => {
  it("retains falsy values (0, false, null, '') in DISTINCT results", async () => {
    const cases: [any[], any[]][] = [
      [
        [0, 0, 1, 1],
        [0, 1],
      ],
      [
        [false, false, true, true],
        [false, true],
      ],
      [[null, null], [null]],
      [
        ["", "", "a", "a"],
        ["", "a"],
      ],
    ];

    for (const [input, expected] of cases) {
      const mockExecutionContext: ExecutionContext = {
        hasMoreResults: () => false,
        fetchMore: async () => ({
          result: { buffer: input, partitionKeyRangeMap: new Map() },
          headers: {},
        }),
      } as unknown as ExecutionContext;

      const component = new OrderedDistinctEndpointComponent(mockExecutionContext);
      const response = await component.fetchMore();
      assert.deepStrictEqual(response.result.buffer, expected);
    }
  });

  it("removes consecutive duplicates while retaining one copy of each distinct value", async () => {
    const mockExecutionContext: ExecutionContext = {
      hasMoreResults: () => false,
      fetchMore: async () => ({
        result: {
          buffer: [1, 1, 2, 2, 3, 3],
          partitionKeyRangeMap: new Map(),
        },
        headers: {},
      }),
    } as unknown as ExecutionContext;

    const component = new OrderedDistinctEndpointComponent(mockExecutionContext);
    const response = await component.fetchMore();
    assert.deepStrictEqual(response.result.buffer, [1, 2, 3]);
  });

  it("passes through an empty buffer unchanged", async () => {
    const mockExecutionContext: ExecutionContext = {
      hasMoreResults: () => false,
      fetchMore: async () => ({
        result: { buffer: [], partitionKeyRangeMap: new Map() },
        headers: {},
      }),
    } as unknown as ExecutionContext;

    const component = new OrderedDistinctEndpointComponent(mockExecutionContext);
    const response = await component.fetchMore();
    assert.deepStrictEqual(response.result.buffer, []);
  });
});
