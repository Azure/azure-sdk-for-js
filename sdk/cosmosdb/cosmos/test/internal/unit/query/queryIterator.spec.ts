// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { QueryIterator } from "../../../../src/queryIterator.js";
import { createDummyDiagnosticNode } from "../../../public/common/TestHelpers.js";
import { describe, it, assert, vi } from "vitest";

describe("QueryIterator", () => {
  it("should expose an empty resources array when the execution context returns undefined", async () => {
    const iterator = new QueryIterator({} as any, "SELECT * FROM c", {}, [] as any);
    const executionContext = {
      fetchMore: vi.fn().mockResolvedValue({ headers: {}, result: undefined }),
      hasMoreResults: vi.fn().mockReturnValue(true),
    };

    (iterator as any).isInitialized = true;
    (iterator as any).queryExecutionContext = executionContext;
    (iterator as any).fetchQueryPlan = vi.fn().mockResolvedValue({});

    const response = await iterator.fetchNextInternal(createDummyDiagnosticNode());

    assert.deepStrictEqual(response.resources, []);
    assert.isTrue(response.hasMoreResults);
  });
});
