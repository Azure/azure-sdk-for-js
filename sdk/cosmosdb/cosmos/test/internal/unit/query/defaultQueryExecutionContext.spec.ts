// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FetchFunctionCallback } from "../../../../src/queryExecutionContext/index.js";
import { DefaultQueryExecutionContext } from "../../../../src/queryExecutionContext/defaultQueryExecutionContext.js";
import type { FeedOptions } from "../../../../src/index.js";
import { sleep } from "../../../../src/common/index.js";
import { createDummyDiagnosticNode } from "../../../public/common/TestHelpers.js";
import { getEmptyCosmosDiagnostics } from "../../../../src/utils/diagnostics.js";
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

  it("should keep continuation tokens private to each query context", async () => {
    const options: FeedOptions = {
      continuationToken: "initial-continuation",
    };
    const continuations: string[] = [];
    let startDelayedFetch: () => void;
    const delayedFetchStarted = new Promise<void>((resolve) => {
      startDelayedFetch = resolve;
    });
    let releaseDelayedFetch: () => void;
    const delayedFetchCanFinish = new Promise<void>((resolve) => {
      releaseDelayedFetch = resolve;
    });
    let callCount = 0;
    const fetchFunction: FetchFunctionCallback = async (_diagnosticNode, fetchOptions) => {
      callCount++;
      if (callCount === 1) {
        return {
          code: 200,
          headers: { "x-ms-continuation": "first-context-continuation" },
          result: [],
          substatus: 0,
          diagnostics: getEmptyCosmosDiagnostics(),
        };
      }
      if (callCount === 2) {
        startDelayedFetch();
        await delayedFetchCanFinish;
      }
      continuations.push(fetchOptions.continuationToken);
      return {
        code: 200,
        headers: {},
        result: [],
        substatus: 0,
        diagnostics: getEmptyCosmosDiagnostics(),
      };
    };

    const firstContext = new DefaultQueryExecutionContext(options, fetchFunction, "first");
    await firstContext.fetchMore(createDummyDiagnosticNode());
    const secondContext = new DefaultQueryExecutionContext(options, fetchFunction, "second");

    const firstContextSecondPage = firstContext.fetchMore(createDummyDiagnosticNode());
    await delayedFetchStarted;
    await secondContext.fetchMore(createDummyDiagnosticNode());
    releaseDelayedFetch();
    await firstContextSecondPage;

    assert.deepStrictEqual(continuations, ["initial-continuation", "first-context-continuation"]);
    assert.strictEqual(options.continuationToken, "initial-continuation");
  });

  it("should leave caller options unchanged when a fetch fails", async () => {
    const options: FeedOptions = {
      continuationToken: "initial-continuation",
    };
    let callCount = 0;
    const fetchFunction: FetchFunctionCallback = async () => {
      callCount++;
      if (callCount === 1) {
        return {
          code: 200,
          headers: { "x-ms-continuation": "next-continuation" },
          result: [],
          substatus: 0,
          diagnostics: getEmptyCosmosDiagnostics(),
        };
      }
      throw new Error("request failed");
    };
    const context = new DefaultQueryExecutionContext(options, fetchFunction, "random-id");

    await context.fetchMore(createDummyDiagnosticNode());
    let error: Error | undefined;
    try {
      await context.fetchMore(createDummyDiagnosticNode());
    } catch (caughtError) {
      error = caughtError as Error;
    }

    assert.ok(error);
    assert.match(error.message, /request failed/);
    assert.strictEqual(options.continuationToken, "initial-continuation");
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
