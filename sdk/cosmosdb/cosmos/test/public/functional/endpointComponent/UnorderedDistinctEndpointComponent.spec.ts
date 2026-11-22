// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ExecutionContext } from "../../../../src/queryExecutionContext/index.js";
import { UnorderedDistinctEndpointComponent } from "../../../../src/queryExecutionContext/EndpointComponent/UnorderedDistinctEndpointComponent.js";
import { describe, it, assert } from "vitest";

describe("UnorderedDistinctEndpointComponent", () => {
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
          result: { buffer: input },
          headers: {},
        }),
      } as unknown as ExecutionContext;

      const component = new UnorderedDistinctEndpointComponent(mockExecutionContext);
      const response = await component.fetchMore();
      assert.deepStrictEqual(response.result.buffer, expected);
    }
  });

  it("removes duplicates while retaining one copy of each distinct value", async () => {
    const mockExecutionContext: ExecutionContext = {
      hasMoreResults: () => false,
      fetchMore: async () => ({
        result: { buffer: [1, 2, 2, 3, 1, 4] },
        headers: {},
      }),
    } as unknown as ExecutionContext;

    const component = new UnorderedDistinctEndpointComponent(mockExecutionContext);
    const response = await component.fetchMore();
    assert.deepStrictEqual(response.result.buffer, [1, 2, 3, 4]);
  });

  it("passes through an empty buffer unchanged", async () => {
    const mockExecutionContext: ExecutionContext = {
      hasMoreResults: () => false,
      fetchMore: async () => ({
        result: { buffer: [] },
        headers: {},
      }),
    } as unknown as ExecutionContext;

    const component = new UnorderedDistinctEndpointComponent(mockExecutionContext);
    const response = await component.fetchMore();
    assert.deepStrictEqual(response.result.buffer, []);
  });
});
