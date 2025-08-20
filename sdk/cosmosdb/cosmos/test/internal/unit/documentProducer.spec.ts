// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlQuerySpec, ClientContext, PartitionKeyRange } from "@azure/cosmos";
import { DocumentProducer, FetchResult } from "$internal/queryExecutionContext/index.js";
import { MockedClientContext } from "../../public/common/MockClientContext.js";
import { describe, it, assert } from "vitest";

describe("Test DocumentProducer", () => {
  const mockedClientContext: ClientContext = new MockedClientContext({}) as any;
  const sqlQuerySpec: SqlQuerySpec = { query: "SELECT c.id from c" };
  const pkRange: PartitionKeyRange = {
    id: "0",
    minInclusive: "",
    maxExclusive: "FF",
    ridPrefix: 0,
    throughputFraction: 0.1,
    status: "online",
    parents: [],
  };

  it("fetchBufferedItems should return all items in buffer", async () => {
    const documentProducer = new DocumentProducer(
      mockedClientContext,
      "mockCollectionLink",
      sqlQuerySpec,
      pkRange,
      {},
      "mockCorrelatedActivityId",
    );
    documentProducer.fetchResults = [
      new FetchResult({ id: "1" }, undefined),
      new FetchResult({ id: "2" }, undefined),
      new FetchResult({ id: "3" }, undefined),
    ];

    let item = await documentProducer.fetchBufferedItems();
    assert.strictEqual(item.result.length, 3);

    item = await documentProducer.fetchBufferedItems();
    assert.strictEqual(item.result.length, 0);
    documentProducer.allFetched = true;

    item = await documentProducer.fetchBufferedItems();
    assert.strictEqual(item.result, undefined);
  });

  it("fetchNextItem should return first item", async () => {
    const documentProducer = new DocumentProducer(
      mockedClientContext,
      "mockCollectionLink",
      sqlQuerySpec,
      pkRange,
      {},
      "mockCorrelatedActivityId",
    );
    documentProducer.fetchResults = [
      new FetchResult({ id: "1" }, undefined),
      new FetchResult({ id: "2" }, undefined),
    ];

    let item = await documentProducer.fetchNextItem();
    assert.strictEqual(item.result.id, "1");

    item = await documentProducer.fetchNextItem();
    assert.strictEqual(item.result.id, "2");

    item = await documentProducer.fetchNextItem();
    assert.strictEqual(item.result, undefined);

    documentProducer.allFetched = true;
    item = await documentProducer.fetchNextItem();
    assert.strictEqual(item.result, undefined);
  });

  it("peak item should return first item", async () => {
    const documentProducer = new DocumentProducer(
      mockedClientContext,
      "mockCollectionLink",
      sqlQuerySpec,
      pkRange,
      {},
      "mockCorrelatedActivityId",
    );
    documentProducer.fetchResults = [new FetchResult({ id: "1" }, undefined)];

    let item = await documentProducer.peakNextItem();
    assert.strictEqual(item.id, "1");

    await documentProducer.fetchNextItem();

    item = await documentProducer.peakNextItem();
    assert.strictEqual(item, undefined);

    documentProducer.allFetched = true;
    item = await documentProducer.peakNextItem();
    assert.strictEqual(item, undefined);
  });
});
