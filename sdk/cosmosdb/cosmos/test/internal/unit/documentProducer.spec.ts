// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// import assert from "assert";
import { DocumentProducer2, FetchResult, SqlQuerySpec } from "../../../src/queryExecutionContext";
import { MockedClientContext } from "../../public/common/MockClientContext";
import { ClientContext, PartitionKeyRange } from "../../../src";
import assert from "assert";

describe("11Test DocumentProducer", function () {
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

  it("fetchBufferedItems should return first item", async function () {
    let documentProducer = new DocumentProducer2(
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

  it("fetchNextItem should return first item", async function () {
    let documentProducer = new DocumentProducer2(
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

  it("peak item should return first item", async function () {
    let documentProducer = new DocumentProducer2(
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
