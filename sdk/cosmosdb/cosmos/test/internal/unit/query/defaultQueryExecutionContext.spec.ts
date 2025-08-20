// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FetchFunctionCallback } from "$internal/queryExecutionContext/index.js";
import { DefaultQueryExecutionContext } from "$internal/queryExecutionContext/defaultQueryExecutionContext.js";
import type { FeedOptions } from "@azure/cosmos";
import { sleep } from "$internal/common/index.js";
import { createDummyDiagnosticNode } from "../../../public/common/TestHelpers.js";
import { getEmptyCosmosDiagnostics } from "$internal/utils/diagnostics.js";
import { describe, it, assert } from "vitest";

describe("defaultQueryExecutionContext", () => {
  it("should not buffer items if bufferItems is false", async () => {
    let calledCount = 0;
    const fetchFunction: FetchFunctionCallback = async () => {
      calledCount++;
      return {
        code: 200,
        headers: {
          "x-ms-continuation": "any random text",
        },
        result: [
          {
            item: "foo",
          },
        ],
        substatus: 0,
        diagnostics: getEmptyCosmosDiagnostics(),
      };
    };

    const options: FeedOptions = {
      bufferItems: false,
    };

    const correlatedId = "random-id";
    const context = new DefaultQueryExecutionContext(options, fetchFunction, correlatedId);

    assert.strictEqual(calledCount, 0, "Nothing should be fetched at this point");

    await context.fetchMore(createDummyDiagnosticNode());

    await sleep(10); // small sleep to make sure we give up event loop so any other fetch functions can get called

    assert.strictEqual(calledCount, 1, "Should have only fetched 1 page");

    await context.fetchMore(createDummyDiagnosticNode());

    await sleep(10); // small sleep to make sure we give up event loop so any other fetch functions can get called

    assert.strictEqual(calledCount, 2, "Should have only fetched 2 pages");
  });

  it("should buffer items if bufferItems is true", async () => {
    let calledCount = 0;
    const fetchFunction: FetchFunctionCallback = async () => {
      calledCount++;
      return {
        code: 200,
        headers: {
          "x-ms-continuation": "any random text",
        },
        result: [
          {
            item: "foo",
          },
        ],
        substatus: 0,
        diagnostics: getEmptyCosmosDiagnostics(),
      };
    };

    const options: FeedOptions = {
      bufferItems: true,
    };
    const correlatedId = "random-id";
    const context = new DefaultQueryExecutionContext(options, fetchFunction, correlatedId);

    assert.strictEqual(calledCount, 0, "Nothing should be fetched at this point");

    await context.fetchMore(createDummyDiagnosticNode());

    await sleep(10); // small sleep to make sure we give up event loop so any other fetch functions can get called

    assert.strictEqual(calledCount, 2, "Should have fetched 2 pages (one buffered)");

    await context.fetchMore(createDummyDiagnosticNode());

    await sleep(10); // small sleep to make sure we give up event loop so any other fetch functions can get called

    assert.strictEqual(calledCount, 3, "Should have only fetched 3 pages (one buffered)");
  });
});
