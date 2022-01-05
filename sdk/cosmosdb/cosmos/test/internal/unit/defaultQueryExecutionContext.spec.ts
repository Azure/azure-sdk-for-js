// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  FetchFunctionCallback,
  DefaultQueryExecutionContext,
} from "../../../src/queryExecutionContext";
import { FeedOptions } from "../../../src";
import assert from "assert";
import { sleep } from "../../../src/common";

describe("defaultQueryExecutionContext", function () {
  it("should not buffer items if bufferItems is false", async function () {
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
      };
    };

    const options: FeedOptions = {
      bufferItems: false,
    };

    const context = new DefaultQueryExecutionContext(options, fetchFunction);

    assert.strictEqual(calledCount, 0, "Nothing should be fetched at this point");

    await context.fetchMore();

    await sleep(10); // small sleep to make sure we give up event loop so any other fetch functions can get called

    assert.strictEqual(calledCount, 1, "Should have only fetched 1 page");

    await context.fetchMore();

    await sleep(10); // small sleep to make sure we give up event loop so any other fetch functions can get called

    assert.strictEqual(calledCount, 2, "Should have only fetched 2 pages");
  });

  it("should buffer items if bufferItems is true", async function () {
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
      };
    };

    const options: FeedOptions = {
      bufferItems: true,
    };

    const context = new DefaultQueryExecutionContext(options, fetchFunction);

    assert.strictEqual(calledCount, 0, "Nothing should be fetched at this point");

    await context.fetchMore();

    await sleep(10); // small sleep to make sure we give up event loop so any other fetch functions can get called

    assert.strictEqual(calledCount, 2, "Should have fetched 2 pages (one buffered)");

    await context.fetchMore();

    await sleep(10); // small sleep to make sure we give up event loop so any other fetch functions can get called

    assert.strictEqual(calledCount, 3, "Should have only fetched 3 pages (one buffered)");
  });
});
