// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { Suite } from "mocha";
import * as util from "util";
import { Container, ContainerDefinition } from "../../../src";
import { DataType, IndexKind } from "../../../src";
import { SqlQuerySpec } from "../../../src";
import { QueryIterator } from "../../../src";
import {
  bulkInsertItems,
  getTestContainer,
  removeAllDatabases,
  generateDocuments,
} from "../common/TestHelpers";
import { FeedResponse, FeedOptions } from "../../../src";

function compare(key: string) {
  return function (a: any, b: any): number {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  };
}

describe("Cross Partition", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || "30000");

  describe("Validate Query", function () {
    const documentDefinitions = generateDocuments(20);

    const containerDefinition: ContainerDefinition = {
      id: "sample container",
      indexingPolicy: {
        includedPaths: [
          {
            path: "/",
            indexes: [
              {
                kind: IndexKind.Range,
                dataType: DataType.Number,
              },
              {
                kind: IndexKind.Range,
                dataType: DataType.String,
              },
            ],
          },
        ],
      },
      partitionKey: {
        paths: ["/id"],
      },
    };
    const containerOptions = { offerThroughput: 25100 };

    let container: Container;

    // - removes all the databases,
    // - creates a new database,
    // - creates a new collecton,
    // - bulk inserts documents to the container
    before(async function () {
      await removeAllDatabases();
      container = await getTestContainer(
        "Validate 中文 Query",
        undefined,
        containerDefinition,
        containerOptions
      );
      await bulkInsertItems(container, documentDefinitions);
    });

    const validateResults = function (
      actualResults: any[],
      expectedOrderIds: string[],
      expectedCount: number
    ): void {
      assert.equal(
        actualResults.length,
        expectedCount ||
          (expectedOrderIds && expectedOrderIds.length) ||
          documentDefinitions.length,
        "actual results length doesn't match with expected results length."
      );
      if (expectedOrderIds) {
        assert.deepStrictEqual(
          actualResults.map((doc) => doc.id || doc),
          expectedOrderIds
        );
      }
    };

    const validateFetchAll = async function (
      queryIterator: QueryIterator<any>,
      options: any,
      expectedOrderIds: string[],
      expectedCount: number
    ): Promise<FeedResponse<any>> {
      options.continuation = undefined;
      const response = await queryIterator.fetchAll();
      const { resources: results } = response;
      assert.equal(
        results.length,
        expectedCount ||
          (expectedOrderIds && expectedOrderIds.length) ||
          documentDefinitions.length,
        "invalid number of results"
      );
      assert.equal(
        queryIterator.hasMoreResults(),
        false,
        "hasMoreResults: no more results is left"
      );

      validateResults(results, expectedOrderIds, expectedCount);
      return response;
    };

    const validateFetchNextAndHasMoreResults = async function (
      options: any,
      queryIterator: QueryIterator<any>,
      expectedOrderIds: string[],
      fetchAllResponse: FeedResponse<any>,
      expectedCount: number,
      expectedIteratorCalls: number
    ): Promise<void> {
      const pageSize = options["maxItemCount"];
      let totalExecuteNextRequestCharge = 0;
      let totalIteratorCalls = 0;
      let totalFetchedResults: any[] = [];
      const expectedLength =
        expectedCount ||
        (expectedOrderIds && expectedOrderIds.length) ||
        documentDefinitions.length;

      while (queryIterator.hasMoreResults()) {
        const { resources: results, queryMetrics, requestCharge } = await queryIterator.fetchNext();
        totalIteratorCalls++;
        assert(queryMetrics, "expected response have query metrics");

        if (totalFetchedResults.length > expectedLength) {
          break;
        }
        if (results) {
          totalFetchedResults = totalFetchedResults.concat(results);
        }
        totalExecuteNextRequestCharge += requestCharge;
        assert(requestCharge >= 0);

        if (totalFetchedResults.length < expectedLength) {
          if (results) {
            assert(results.length <= pageSize, "executeNext: invalid fetch block size");
          }
          assert(queryIterator.hasMoreResults(), "hasMoreResults expects to return true");
        } else {
          // no more results
          assert.equal(
            expectedLength,
            totalFetchedResults.length,
            "executeNext: didn't fetch all the results"
          );
        }
      }

      if (expectedIteratorCalls) {
        assert.equal(totalIteratorCalls, expectedIteratorCalls);
      }

      // no more results
      validateResults(totalFetchedResults, expectedOrderIds, expectedCount);
      assert.equal(
        queryIterator.hasMoreResults(),
        false,
        "hasMoreResults: no more results is left"
      );
      assert(totalExecuteNextRequestCharge > 0);
      const percentDifference =
        Math.abs(fetchAllResponse.requestCharge - totalExecuteNextRequestCharge) /
        totalExecuteNextRequestCharge;
      assert(
        percentDifference <= 0.01,
        "difference between fetchAll request charge and executeNext request charge should be less than 1%"
      );
    };

    const validateAsyncIterator = async function (
      queryIterator: QueryIterator<any>,
      expectedOrderIds: any[],
      expecetedCount: number
    ): Promise<void> {
      const expectedLength =
        expecetedCount ||
        (expectedOrderIds && expectedOrderIds.length) ||
        documentDefinitions.length;
      const results: any[] = [];
      let completed = false;
      for await (const { resources: items } of queryIterator.getAsyncIterator()) {
        assert.equal(completed, false, "iterator called after all results returned");
        results.push(...items);
        if (results.length === expectedLength) {
          completed = true;
        }
      }
      assert.equal(completed, true, "AsyncIterator should see all expected results");
      validateResults(results, expectedOrderIds, expecetedCount);
    };

    const executeQueryAndValidateResults = async function ({
      query,
      options,
      expectedOrderIds,
      expectedCount,
      expectedRus,
      expectedIteratorCalls,
    }: {
      query: string | SqlQuerySpec;
      options: any;
      expectedOrderIds?: any[];
      expectedCount?: number;
      expectedRus?: number;
      expectedIteratorCalls?: number;
    }): Promise<void> {
      options.populateQueryMetrics = true;
      const queryIterator = container.items.query(query, options);
      const fetchAllResponse = await validateFetchAll(
        queryIterator,
        options,
        expectedOrderIds,
        expectedCount
      );
      if (expectedRus) {
        const percentDifference =
          Math.abs(fetchAllResponse.requestCharge - expectedRus) / expectedRus;
        assert(
          percentDifference <= 0.05,
          `difference between fetchAll request charge and expected request charge should be less than 5%. Got ${
            percentDifference * 100
          }`
        );
      }
      queryIterator.reset();
      await validateFetchNextAndHasMoreResults(
        options,
        queryIterator,
        expectedOrderIds,
        fetchAllResponse,
        expectedCount,
        expectedIteratorCalls
      );
      queryIterator.reset();
      await validateAsyncIterator(queryIterator, expectedOrderIds, expectedCount);
    };

    it("Validate Parallel Query As String With maxDegreeOfParallelism = 0", async function () {
      // simple order by query in string format
      const query = "SELECT * FROM root r";
      const options = {
        maxItemCount: 2,
        maxDegreeOfParallelism: 0,
      };

      // validates the results size and order
      await executeQueryAndValidateResults({
        query,
        options,
      });
    });

    it("Validate Parallel Query As String With maxDegreeOfParallelism: -1", async function () {
      // simple order by query in string format
      const query = "SELECT * FROM root r";
      const options: FeedOptions = {
        maxItemCount: 2,
        maxDegreeOfParallelism: -1,
        forceQueryPlan: true,
        populateQueryMetrics: true,
      };

      // validates the results size and order
      await executeQueryAndValidateResults({
        query,
        options,
      });
    });

    it("Validate Parallel Query As String With maxDegreeOfParallelism: 1", async function () {
      // simple order by query in string format
      const query = "SELECT * FROM root r";
      const options = {
        maxItemCount: 2,
        maxDegreeOfParallelism: 1,
      };

      // validates the results size and order
      await executeQueryAndValidateResults({
        query,
        options,
      });
    });

    it("Validate Parallel Query As String With maxDegreeOfParallelism: 3", async function () {
      // simple order by query in string format
      const query = "SELECT * FROM root r";
      const options: FeedOptions = {
        maxItemCount: 2,
        maxDegreeOfParallelism: 3,
        bufferItems: true,
      };

      // validates the results size and order
      await executeQueryAndValidateResults({
        query,
        options,
      });
    });

    it("Validate Simple OrderBy Query As String With maxDegreeOfParallelism = 0", async function () {
      // simple order by query in string format
      const query = "SELECT * FROM root r order by r.spam";
      const options = {
        maxItemCount: 2,
        maxDegreeOfParallelism: 0,
      };

      const expectedOrderedIds = documentDefinitions.sort(compare("spam")).map(function (r) {
        return r["id"];
      });

      // validates the results size and order
      await executeQueryAndValidateResults({
        query,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate Simple OrderBy Query As String With maxDegreeOfParallelism = 1 #nosignoff", async function () {
      // simple order by query in string format
      const query = "SELECT * FROM root r order by r.spam";
      const options = {
        maxItemCount: 2,
        maxDegreeOfParallelism: 1,
      };

      const expectedOrderedIds = documentDefinitions.sort(compare("spam")).map(function (r) {
        return r["id"];
      });

      // validates the results size and order
      await executeQueryAndValidateResults({
        query,
        options,
        expectedOrderIds: expectedOrderedIds,
        expectedRus: 35,
      });
    });

    it("Validate Simple OrderBy Query As String With maxDegreeOfParallelism = 3", async function () {
      // simple order by query in string format
      const query = "SELECT * FROM root r order by r.spam";
      const options = {
        maxItemCount: 2,
        maxDegreeOfParallelism: 3,
      };

      const expectedOrderedIds = documentDefinitions.sort(compare("spam")).map(function (r) {
        return r["id"];
      });

      // validates the results size and order
      await executeQueryAndValidateResults({
        query,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate Simple OrderBy Query As String With maxDegreeOfParallelism = -1", async function () {
      // simple order by query in string format
      const query = "SELECT * FROM root r order by r.spam";
      const options = {
        maxItemCount: 2,
        maxDegreeOfParallelism: -1,
      };

      const expectedOrderedIds = documentDefinitions.sort(compare("spam")).map(function (r) {
        return r["id"];
      });

      // validates the results size and order
      await executeQueryAndValidateResults({
        query,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate DISTINCT Query", async function () {
      // simple order by query in string format
      const query = "SELECT DISTINCT VALUE r.spam3 FROM root r";
      const options = {
        maxItemCount: 2,
      };

      // validates the results size and order
      await executeQueryAndValidateResults({ query, options, expectedCount: 3 });
    });

    it("Validate DISTINCT OrderBy Query", async function () {
      // simple order by query in string format
      const query = "SELECT DISTINCT VALUE r.spam3 FROM root r order by r.spam3 DESC";
      const options = {
        maxItemCount: 2,
      };

      const expectedOrderedIds = ["eggs2", "eggs1", "eggs0"];

      // validates the results size and order
      await executeQueryAndValidateResults({
        query,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate parallel DISTINCT Query", async function () {
      // simple order by query in string format
      const query = "SELECT DISTINCT VALUE r.spam3 FROM root r order by r.spam3";
      const options = {
        maxItemCount: 2,
        maxDegreeOfParallelism: 3,
        bufferItems: true,
      };

      const expectedOrderedIds = ["eggs0", "eggs1", "eggs2"];

      // validates the results size and order
      await executeQueryAndValidateResults({
        query,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate DISTINCT Query with maxItemCount = 1", async function () {
      // simple order by query in string format
      const query = "SELECT DISTINCT VALUE r.spam3 FROM root r order by r.spam3";
      const options = {
        maxItemCount: 1,
      };

      const expectedOrderedIds = ["eggs0", "eggs1", "eggs2"];

      // validates the results size and order
      await executeQueryAndValidateResults({
        query,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate DISTINCT Query with maxItemCount = 20", async function () {
      // simple order by query in string format
      const query = "SELECT DISTINCT VALUE r.spam3 FROM root r order by r.spam3";
      const options = {
        maxItemCount: 20,
      };

      const expectedOrderedIds = ["eggs0", "eggs1", "eggs2"];

      // validates the results size and order
      await executeQueryAndValidateResults({
        query,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate Simple OrderBy Query As String", async function () {
      // simple order by query in string format
      const query = "SELECT * FROM root r order by r.spam";
      const options = {
        maxItemCount: 2,
      };

      const expectedOrderedIds = documentDefinitions.sort(compare("spam")).map(function (r) {
        return r["id"];
      });

      // validates the results size and order
      await executeQueryAndValidateResults({
        query,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate Simple OrderBy Query", async function () {
      // simple order by query
      const querySpec = {
        query: "SELECT * FROM root r order by r.spam",
      };
      const options = {
        maxItemCount: 2,
      };

      const expectedOrderedIds = documentDefinitions.sort(compare("spam")).map(function (r) {
        return r["id"];
      });

      // validates the results size and order
      await executeQueryAndValidateResults({
        query: querySpec,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate OrderBy Query With ASC", async function () {
      // an order by query with explicit ascending ordering
      const querySpec = {
        query: "SELECT * FROM root r order by r.spam ASC",
      };
      const options = {
        maxItemCount: 2,
      };

      const expectedOrderedIds = documentDefinitions.sort(compare("spam")).map(function (r) {
        return r["id"];
      });

      // validates the results size and order
      await executeQueryAndValidateResults({
        query: querySpec,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate OrderBy Query With DESC", async function () {
      // an order by query with explicit descending ordering
      const querySpec = {
        query: "SELECT * FROM root r order by r.spam DESC",
      };
      const options = {
        maxItemCount: 2,
      };

      const expectedOrderedIds = documentDefinitions
        .sort(compare("spam"))
        .map(function (r) {
          return r["id"];
        })
        .reverse();

      // validates the results size and order
      await executeQueryAndValidateResults({
        query: querySpec,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate OrderBy with top", async function () {
      // an order by query with top, total existing docs more than requested top count
      const topCount = 9;
      const querySpec = {
        query: util.format("SELECT top %d * FROM root r order by r.spam", topCount),
      };
      const options = {
        maxItemCount: 2,
      };

      const expectedOrderedIds = documentDefinitions
        .sort(compare("spam"))
        .map(function (r) {
          return r["id"];
        })
        .slice(0, topCount);

      await executeQueryAndValidateResults({
        query: querySpec,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate OrderBy with Top Query (less results than top counts)", async function () {
      // an order by query with top, total existing docs less than requested top count
      const topCount = 30;
      // sanity check
      assert(topCount > documentDefinitions.length, "test setup is wrong");
      const querySpec = {
        query: util.format("SELECT top %d * FROM root r order by r.spam", topCount),
      };
      const options = {
        maxItemCount: 2,
      };

      const expectedOrderedIds = documentDefinitions.sort(compare("spam")).map(function (r) {
        return r["id"];
      });

      await executeQueryAndValidateResults({
        query: querySpec,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate Top Query with maxDegreeOfParallelism = 3", async function () {
      // a top query
      const topCount = 6;
      // sanity check
      assert(topCount < documentDefinitions.length, "test setup is wrong");

      const query = util.format("SELECT top %d * FROM root r", topCount);
      const options = {
        maxItemCount: 2,
        maxDegreeOfParallelism: 3,
        forceQueryPlan: true,
        bufferItems: true,
      };

      // prepare expected behaviour verifier
      const queryIterator = container.items.query(query, options);

      const { resources: results } = await queryIterator.fetchAll();
      assert.equal(results.length, topCount);

      // select unique ids
      const uniqueIds: any = {};
      results.forEach(function (item) {
        uniqueIds[item.id] = true;
      });
      // assert no duplicate results
      assert.equal(results.length, Object.keys(uniqueIds).length);
    });

    it("Validate Top Query", async function () {
      // a top query
      const topCount = 6;
      // sanity check
      assert(topCount < documentDefinitions.length, "test setup is wrong");

      const query = util.format("SELECT top %d * FROM root r", topCount);
      const options = {
        maxItemCount: 2,
      };

      // prepare expected behaviour verifier
      const queryIterator = container.items.query(query, options);

      const { resources: results } = await queryIterator.fetchAll();
      assert.equal(results.length, topCount);

      // select unique ids
      const uniqueIds: any = {};
      results.forEach((item) => {
        uniqueIds[item.id] = true;
      });
      // assert no duplicate results
      assert.equal(results.length, Object.keys(uniqueIds).length);
    });

    it("Validate Top Query (with 0 topCount)", async function () {
      // a top query
      const topCount = 0;
      // sanity check
      assert(topCount < documentDefinitions.length, "test setup is wrong");

      const query = util.format("SELECT top %d * FROM root r", topCount);
      const options = {
        maxItemCount: 2,
      };

      // prepare expected behaviour verifier
      const queryIterator = container.items.query(query, options);

      const { resources: results } = await queryIterator.fetchAll();
      assert.equal(results.length, topCount);

      // select unique ids
      const uniqueIds: any = {};
      results.forEach((item) => {
        uniqueIds[item.id] = true;
      });
      // assert no duplicate results
      assert.equal(results.length, Object.keys(uniqueIds).length);
    });

    it("Validate Parametrized Top Query", async function () {
      // a top query
      const topCount = 6;
      // sanity check
      assert(topCount < documentDefinitions.length, "test setup is wrong");

      const querySpec: SqlQuerySpec = {
        query: "SELECT top @n * FROM root r",

        parameters: [{ name: "@n", value: topCount }],
      };
      const options = {
        maxItemCount: 2,
      };

      // prepare expected behaviour verifier
      const queryIterator = container.items.query(querySpec, options);

      const { resources: results } = await queryIterator.fetchAll();
      assert.equal(results.length, topCount);

      // select unique ids
      const uniqueIds: any = {};
      results.forEach((item) => {
        uniqueIds[item.id] = true;
      });
      // assert no duplicate results
      assert.equal(results.length, Object.keys(uniqueIds).length);
    });

    it("Validate OrderBy with Parametrized Top Query", async function () {
      // a parametrized top order by query
      const topCount = 9;
      // sanity check
      assert(topCount < documentDefinitions.length, "test setup is wrong");
      // a parametrized top order by query
      const querySpec = {
        query: "SELECT top @n * FROM root r order by r.spam",

        parameters: [{ name: "@n", value: topCount }],
      };
      const options = {
        maxItemCount: 2,
      };

      const expectedOrderedIds = documentDefinitions
        .sort(compare("spam"))
        .map(function (r) {
          return r["id"];
        })
        .slice(0, topCount);

      await executeQueryAndValidateResults({
        query: querySpec,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate OrderBy with Parametrized Predicate", async function () {
      // an order by query combined with parametrized predicate
      const querySpec = {
        query: "SELECT * FROM root r where r.cnt > @cnt order by r.spam",
        parameters: [{ name: "@cnt", value: 5 }],
      };
      const options = {
        maxItemCount: 2,
      };

      const expectedOrderedIds = documentDefinitions
        .sort(compare("spam"))
        .filter(function (r) {
          return r["cnt"] > 5;
        })
        .map(function (r) {
          return r["id"];
        });

      await executeQueryAndValidateResults({
        query: querySpec,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate Error Handling - Orderby where types are noncomparable", async function () {
      // test orderby with different order by item type
      // an order by query
      const query = {
        query: "SELECT * FROM root r order by r.spam2",
      };
      const options = {
        maxItemCount: 2,
      };

      // prepare expected behaviour verifier
      try {
        const queryIterator = container.items.query(query, options);
        await queryIterator.fetchAll();
      } catch (err) {
        assert.notEqual(err, undefined);
      }
    });

    it("Validate OrderBy Integer Query", async function () {
      // simple order by query in string format
      const query = "SELECT * FROM root r order by r.cnt";
      const options = {
        maxItemCount: 2,
      };

      const expectedOrderedIds = documentDefinitions.sort(compare("cnt")).map(function (r) {
        return r["id"];
      });

      // validates the results size and order
      await executeQueryAndValidateResults({
        query,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate OrderBy Floating Point Number Query", async function () {
      // simple order by query in string format
      const query = "SELECT * FROM root r order by r.number";
      const options = {
        maxItemCount: 2,
      };

      const expectedOrderedIds = documentDefinitions.sort(compare("number")).map(function (r) {
        return r["id"];
      });

      // validates the results size and order
      await executeQueryAndValidateResults({
        query,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate OrderBy Boolean Query", async function () {
      // simple order by query in string format
      const query = "SELECT * FROM root r order by r.boolVar";
      const options = {
        maxItemCount: 2,
      };

      const queryIterator = container.items.query(query, options);
      const { resources: results } = await queryIterator.fetchAll();
      assert.equal(results.length, documentDefinitions.length);

      let index = 0;
      while (index < results.length) {
        if (results[index].boolVar) {
          break;
        }
        assert(results[index].id % 2 === 1);
        index++;
      }

      while (index < results.length) {
        assert(results[index].boolVar);
        assert(results[index].id % 2 === 0);
        index++;
      }
    });

    it("Validate simple LIMIT OFFSET", async function () {
      const limit = 1;
      const offset = 7;

      const querySpec = {
        query: `SELECT * FROM root r OFFSET ${offset} LIMIT ${limit}`,
      };
      const options = {
        maxItemCount: 2,
      };

      // validates the results size and order
      await executeQueryAndValidateResults({
        query: querySpec,
        options,
        expectedCount: 1,
        expectedIteratorCalls: 1,
      });
    });

    it("Validate filtered LIMIT OFFSET", async function () {
      const limit = 1;
      const offset = 2;

      // an order by query with explicit ascending ordering
      const querySpec = {
        query: `SELECT * FROM root r WHERE r.number > 5 OFFSET ${offset} LIMIT ${limit}`,
      };
      const options = {
        maxItemCount: 2,
      };

      // validates the results size and order
      await executeQueryAndValidateResults({
        query: querySpec,
        options,
        expectedCount: 1,
      });
    });

    // TODO Add test for OFFSET LIMT filtered on partition

    it("Validate OrderBy Query With ASC and LIMIT 2 and OFFSET 10", async function () {
      const limit = 2;
      const offset = 10;

      // an order by query with explicit ascending ordering
      const querySpec = {
        query: `SELECT * FROM root r order by r.spam ASC OFFSET ${offset} LIMIT ${limit}`,
      };
      const options = {
        maxItemCount: 2,
      };

      const expectedOrderedIds = documentDefinitions
        .sort(compare("spam"))
        .map(function (r) {
          return r["id"];
        })
        .splice(offset, limit);

      // validates the results size and order
      await executeQueryAndValidateResults({
        query: querySpec,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate OrderBy Query With ASC and LIMIT 0 and OFFSET 5", async function () {
      const limit = 5;
      const offset = 0;

      // an order by query with explicit ascending ordering
      const querySpec = {
        query: `SELECT * FROM root r order by r.spam ASC OFFSET ${offset} LIMIT ${limit}`,
      };
      const options = {
        maxItemCount: 2,
      };

      const expectedOrderedIds = documentDefinitions
        .sort(compare("spam"))
        .map(function (r) {
          return r["id"];
        })
        .splice(offset, limit);

      // validates the results size and order
      await executeQueryAndValidateResults({
        query: querySpec,
        options,
        expectedOrderIds: expectedOrderedIds,
      });
    });

    it("Validate Failure", async function () {
      // simple order by query in string format
      const query = "SELECT * FROM root r order by r.spam";

      const options = {
        maxItemCount: 2,
      };

      const queryIterator = container.items.query(query, options);

      let firstTime = true;

      await queryIterator.fetchNext();

      if (firstTime) {
        firstTime = false;
      }
    });
  });
});
