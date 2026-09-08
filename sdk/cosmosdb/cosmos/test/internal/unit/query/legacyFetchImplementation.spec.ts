// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LegacyFetchImplementation } from "../../../../src/queryExecutionContext/LegacyFetchImplementation.js";
import { createDummyDiagnosticNode } from "../../../public/common/TestHelpers.js";
import { describe, it, assert } from "vitest";

describe("LegacyFetchImplementation", () => {
  it("should skip interim empty backend pages", async () => {
    const responses = [
      { result: { buffer: [] }, headers: {} },
      { result: { buffer: [{ id: "1" }] }, headers: {} },
    ];
    let responseIndex = 0;
    const endpoint = {
      hasMoreResults: () => responseIndex < responses.length,
      fetchMore: async () => responses[responseIndex++],
    };
    const implementation = new LegacyFetchImplementation(endpoint, 10);

    const response = await implementation.fetchMore(createDummyDiagnosticNode(), []);

    assert.deepStrictEqual(response.result, [{ id: "1" }]);
    assert.equal(response.result?.length, 1);
    assert.equal(responseIndex, 2);
  });

  it("should continue filling a partially buffered page after an empty backend page", async () => {
    const responses = [
      { result: { buffer: [{ id: "1" }] }, headers: {} },
      { result: { buffer: [] }, headers: {} },
      { result: { buffer: [{ id: "2" }] }, headers: {} },
    ];
    let responseIndex = 0;
    const endpoint = {
      hasMoreResults: () => responseIndex < responses.length,
      fetchMore: async () => responses[responseIndex++],
    };
    const implementation = new LegacyFetchImplementation(endpoint, 2);

    const response = await implementation.fetchMore(createDummyDiagnosticNode(), []);

    assert.deepStrictEqual(response.result, [{ id: "1" }, { id: "2" }]);
    assert.equal(responseIndex, 3);
  });
});
