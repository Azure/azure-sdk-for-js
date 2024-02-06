// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import { Container, ContainerDefinition } from "../../../src";
import { DataType, IndexKind } from "../../../src";
import { QueryIterator } from "../../../src";
import { SqlQuerySpec } from "../../../src";
import { FeedOptions } from "../../../src";
import { TestData } from "../common/TestData";
import { bulkInsertItems, getTestContainer, removeAllDatabases } from "../common/TestHelpers";

describe("Aggregate Query", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 20000);
  const partitionKey = "key";
  const uniquePartitionKey = "uniquePartitionKey";
  const testdata = new TestData(partitionKey, uniquePartitionKey);
  const average = testdata.sum / testdata.numberOfDocumentsWithNumbericId;
  const documentDefinitions = testdata.docs;
  const samePartitionSum =
    (testdata.numberOfDocsWithSamePartitionKey * (testdata.numberOfDocsWithSamePartitionKey + 1)) /
    2.0;
  let container: Container;

  const containerDefinition: ContainerDefinition = {
    id: "sample container",
    indexingPolicy: {
      includedPaths: [
        {
          path: "/",
          indexes: [
            {
              kind: IndexKind.Range,
              dataType: DataType.String,
            },
            {
              kind: IndexKind.Range,
              dataType: DataType.Number,
            },
          ],
        },
      ],
    },
    partitionKey: {
      paths: ["/" + partitionKey],
    },
  };

  const containerOptions = { offerThroughput: 10100 };

  before(async function () {
    await removeAllDatabases();
    container = await getTestContainer(
      "Validate Aggregate Document Query",
      undefined,
      containerDefinition,
      containerOptions
    );
    await bulkInsertItems(container, documentDefinitions);
  });

  const validateFetchAll = async function (
    queryIterator: QueryIterator<any>,
    expectedResults: any
  ): Promise<number> {
    const { resources: results, requestCharge } = await queryIterator.fetchAll();
    assert(requestCharge > 0, "request charge was not greater than zero");
    assert.equal(results.length, expectedResults.length, "invalid number of results");
    assert.equal(queryIterator.hasMoreResults(), false, "hasMoreResults: no more results is left");
    return requestCharge;
  };

  const validateExecuteNextAndHasMoreResults = async function (
    queryIterator: QueryIterator<any>,
    options: any,
    expectedResults: any[],
    fetchAllRequestCharge: number
  ): Promise<void> {
    const pageSize = options["maxItemCount"];

    let totalFetchedResults: any[] = [];
    let totalExecuteNextRequestCharge = 0;

    while (totalFetchedResults.length <= expectedResults.length) {
      const { resources: results, requestCharge } = await queryIterator.fetchNext();

      if (results && results.length > 0) {
        totalFetchedResults = totalFetchedResults.concat(results);
      }
      totalExecuteNextRequestCharge += requestCharge;

      if (
        !queryIterator.hasMoreResults() ||
        totalFetchedResults.length === expectedResults.length
      ) {
        break;
      }

      if (totalFetchedResults.length < expectedResults.length) {
        // there are more results
        if (results) {
          assert(results.length <= pageSize, "executeNext: invalid fetch block size");
        }
        assert(queryIterator.hasMoreResults(), "hasMoreResults expects to return true");
      } else {
        // no more results
        assert.equal(
          expectedResults.length,
          totalFetchedResults.length,
          "executeNext: didn't fetch all the results"
        );
        assert(
          results.length <= pageSize,
          "executeNext: actual fetch size is more than the requested page size"
        );
      }
    }

    // no more results
    assert.deepStrictEqual(totalFetchedResults, expectedResults);
    assert.equal(queryIterator.hasMoreResults(), false, "hasMoreResults: no more results is left");

    assert(totalExecuteNextRequestCharge > 0);
    const percentDifference =
      Math.abs(fetchAllRequestCharge - totalExecuteNextRequestCharge) /
      totalExecuteNextRequestCharge;
    assert(
      percentDifference <= 0.01,
      "difference between fetchAll request charge and executeNext request charge should be less than 1%"
    );
  };

  const ValidateAsyncIterator = async function (
    queryIterator: QueryIterator<any>,
    expectedResults: any[]
  ): Promise<void> {
    const results: any[] = [];
    let completed = false;
    // forEach uses callbacks still, so just wrap in a promise
    for await (const { resources: items } of queryIterator.getAsyncIterator()) {
      // if the previous invocation returned false, forEach must avoid invoking the callback again!
      assert.equal(completed, false, "forEach called callback after the first false returned");
      results.push(...items);
      if (results.length === expectedResults.length) {
        completed = true;
      }
    }
    assert.equal(completed, true, "AsyncIterator should fetch expected number of results");
    assert.deepStrictEqual(results, expectedResults);
  };

  const executeQueryAndValidateResults = async function (
    query: string | SqlQuerySpec,
    expectedResults: any[]
  ): Promise<void> {
    const options: FeedOptions = { maxDegreeOfParallelism: 2, maxItemCount: 1 };

    const queryIterator = container.items.query(query, options);
    const fetchAllRequestCharge = await validateFetchAll(queryIterator, expectedResults);
    queryIterator.reset();
    await validateExecuteNextAndHasMoreResults(
      queryIterator,
      options,
      expectedResults,
      fetchAllRequestCharge
    );
    queryIterator.reset();
    await ValidateAsyncIterator(queryIterator, expectedResults);
  };

  it("SELECT VALUE AVG", async function () {
    await executeQueryAndValidateResults("SELECT VALUE AVG(r.key) FROM r WHERE IS_NUMBER(r.key)", [
      average,
    ]);
  });

  it("SELECT VALUE AVG with ORDER BY", async function () {
    await executeQueryAndValidateResults(
      "SELECT VALUE AVG(r.key) FROM r WHERE IS_NUMBER(r.key) ORDER BY r.key",
      [average]
    );
  });

  it("SELECT VALUE COUNT", async function () {
    await executeQueryAndValidateResults("SELECT VALUE COUNT(r.key) FROM r", [
      testdata.numberOfDocuments,
    ]);
  });

  it("SELECT VALUE COUNT with ORDER BY", async function () {
    await executeQueryAndValidateResults("SELECT VALUE COUNT(r.key) FROM r ORDER BY r.key", [
      testdata.numberOfDocuments,
    ]);
  });

  it("SELECT VALUE MAX", async function () {
    await executeQueryAndValidateResults("SELECT VALUE MAX(r.key) FROM r", ["xyz"]);
  });

  it("SELECT VALUE MAX with ORDER BY", async function () {
    await executeQueryAndValidateResults("SELECT VALUE MAX(r.key) FROM r ORDER BY r.key", ["xyz"]);
  });

  it("SELECT VALUE MIN", async function () {
    await executeQueryAndValidateResults("SELECT VALUE MIN(r.key) FROM r", [null]);
  });

  it("SELECT VALUE MIN with ORDER BY", async function () {
    await executeQueryAndValidateResults("SELECT VALUE MIN(r.key) FROM r ORDER BY r.key", [null]);
  });

  it("SELECT VALUE SUM", async function () {
    await executeQueryAndValidateResults("SELECT VALUE SUM(r.key) FROM r WHERE IS_NUMBER(r.key)", [
      testdata.sum,
    ]);
  });

  it("SELECT VALUE SUM with ORDER BY", async function () {
    await executeQueryAndValidateResults(
      "SELECT VALUE SUM(r.key) FROM r WHERE IS_NUMBER(r.key) ORDER BY r.key",
      [testdata.sum]
    );
  });

  it("SELECT VALUE AVG for single partiton", async function () {
    await executeQueryAndValidateResults(
      "SELECT VALUE AVG(r.field) FROM r WHERE r.key = 'uniquePartitionKey'",
      [samePartitionSum / testdata.numberOfDocsWithSamePartitionKey]
    );
  });

  it("SELECT VALUE COUNT for single partiton", async function () {
    await executeQueryAndValidateResults(
      "SELECT VALUE COUNT(r.field) FROM r WHERE r.key = 'uniquePartitionKey'",
      [testdata.numberOfDocsWithSamePartitionKey]
    );
  });

  it("SELECT VALUE MAX for single partiton", async function () {
    await executeQueryAndValidateResults(
      "SELECT VALUE MAX(r.field) FROM r WHERE r.key = 'uniquePartitionKey'",
      [testdata.numberOfDocsWithSamePartitionKey]
    );
  });

  it("SELECT VALUE MIN for single partiton", async function () {
    await executeQueryAndValidateResults(
      "SELECT VALUE MIN(r.field) FROM r WHERE r.key = 'uniquePartitionKey'",
      [1]
    );
  });

  it("SELECT VALUE SUM for single partiton", async function () {
    await executeQueryAndValidateResults(
      "SELECT VALUE SUM(r.field) FROM r WHERE r.key = 'uniquePartitionKey'",
      [samePartitionSum]
    );
  });

  it("Non VALUE aggregate", async function () {
    await executeQueryAndValidateResults("SELECT AVG(r.key) FROM r WHERE IS_NUMBER(r.key)", [
      { $1: average },
    ]);
  });

  it("Multiple Aggregates", async function () {
    await executeQueryAndValidateResults("SELECT COUNT(1), MAX(r.key) FROM r", [
      { $1: testdata.numberOfDocuments, $2: "xyz" },
    ]);
  });

  it("should not error for MAX queries on with empty results", async () => {
    const queryIterator = container.items.query("SELECT VALUE MAX(r.missing) from r", {
      maxItemCount: 2,
    });
    const response = await queryIterator.fetchAll();
    assert(response.resources.length === 0);
  });

  it("should not error for MIN queries on with empty filter", async () => {
    const queryIterator = container.items.query("SELECT VALUE MIN(r.key) from r WHERE false", {
      maxItemCount: 2,
    });
    const response = await queryIterator.fetchAll();
    assert(response.resources.length === 0);
  });
});
