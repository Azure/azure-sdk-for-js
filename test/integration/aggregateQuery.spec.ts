import assert from "assert";
import * as util from "util";
import { Container, ContainerDefinition, Database } from "../../dist-esm/client";
import { DataType, IndexKind, PartitionKind } from "../../dist-esm/documents";
import { QueryIterator } from "../../dist-esm/index";
import { SqlQuerySpec } from "../../dist-esm/queryExecutionContext";
import { FeedOptions } from "../../dist-esm/request";
import { TestData } from "../common/TestData";
import { bulkInsertItems, getTestContainer, removeAllDatabases } from "../common/TestHelpers";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

describe("NodeJS Aggregate Query Tests", async function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 20000);
  const partitionKey = "key";
  const uniquePartitionKey = "uniquePartitionKey";
  const testdata = new TestData(partitionKey, uniquePartitionKey);
  const documentDefinitions = testdata.docs;
  let db: Database;
  let container: Container;

  const containerDefinition: ContainerDefinition = {
    id: "sample container",
    indexingPolicy: {
      includedPaths: [
        {
          path: "/",
          indexes: [
            {
              kind: IndexKind.Hash,
              dataType: DataType.String
            },
            {
              kind: IndexKind.Range,
              dataType: DataType.Number
            }
          ]
        }
      ]
    },
    partitionKey: {
      paths: ["/" + partitionKey],
      kind: PartitionKind.Hash
    }
  };

  const containerOptions = { offerThroughput: 10100 };

  describe("Validate Aggregate Document Query", function() {
    // - removes all the databases,
    //  - creates a new database,
    //      - creates a new collecton,
    //          - bulk inserts documents to the container
    before(async function() {
      await removeAllDatabases();
      container = await getTestContainer(
        "Validate Aggregate Document Query",
        undefined,
        containerDefinition,
        containerOptions
      );
      db = container.database;
      await bulkInsertItems(container, documentDefinitions);
    });

    const validateResult = function(actualValue: any, expectedValue: any) {
      assert.deepEqual(actualValue, expectedValue, "actual value doesn't match with expected value.");
    };

    const validateToArray = async function(queryIterator: QueryIterator<any>, expectedResults: any) {
      try {
        const { resources: results } = await queryIterator.fetchAll();
        assert.equal(results.length, expectedResults.length, "invalid number of results");
        assert.equal(queryIterator.hasMoreResults(), false, "hasMoreResults: no more results is left");
      } catch (err) {
        throw err;
      }
    };

    const validateExecuteNextAndHasMoreResults = async function(
      queryIterator: QueryIterator<any>,
      options: any,
      expectedResults: any[]
    ) {
      ////////////////////////////////
      // validate executeNext()
      ////////////////////////////////
      const pageSize = options["maxItemCount"];
      const listOfResultPages: any[] = [];
      let totalFetchedResults: any[] = [];

      try {
        while (totalFetchedResults.length <= expectedResults.length) {
          const { resources: results } = await queryIterator.fetchNext();
          listOfResultPages.push(results);

          if (results === undefined || totalFetchedResults.length === expectedResults.length) {
            break;
          }

          totalFetchedResults = totalFetchedResults.concat(results);

          if (totalFetchedResults.length < expectedResults.length) {
            // there are more results
            assert(results.length <= pageSize, "executeNext: invalid fetch block size");
            assert.equal(results.length, pageSize, "executeNext: invalid fetch block size");
            assert(queryIterator.hasMoreResults(), "hasMoreResults expects to return true");
          } else {
            // no more results
            assert.equal(
              expectedResults.length,
              totalFetchedResults.length,
              "executeNext: didn't fetch all the results"
            );
            assert(results.length <= pageSize, "executeNext: actual fetch size is more than the requested page size");
          }
        }

        // no more results
        validateResult(totalFetchedResults, expectedResults);
        assert.equal(queryIterator.hasMoreResults(), false, "hasMoreResults: no more results is left");
      } catch (err) {
        throw err;
      }
    };

    const ValidateAsyncIterator = async function(queryIterator: QueryIterator<any>, expectedResults: any[]) {
      ////////////////////////////////
      // validate AsyncIterator()
      ////////////////////////////////

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
      validateResult(results, expectedResults);
    };

    const executeQueryAndValidateResults = async function(query: string | SqlQuerySpec, expectedResults: any[]) {
      const options: FeedOptions = { enableCrossPartitionQuery: true, maxDegreeOfParallelism: 2, maxItemCount: 1 };

      const queryIterator = container.items.query(query, options);
      await validateToArray(queryIterator, expectedResults);
      queryIterator.reset();
      await validateExecuteNextAndHasMoreResults(queryIterator, options, expectedResults);
      queryIterator.reset();
      await ValidateAsyncIterator(queryIterator, expectedResults);
    };

    const generateTestConfigs = function() {
      const testConfigs: any[] = [];
      const aggregateQueryFormat = "SELECT VALUE %s(r.%s) FROM r WHERE %s";
      const aggregateOrderByQueryFormat = "SELECT VALUE %s(r.%s) FROM r WHERE %s ORDER BY r.%s";
      const aggregateConfigs = [
        {
          operator: "AVG",
          expected: testdata.sum / testdata.numberOfDocumentsWithNumbericId,
          condition: util.format("IS_NUMBER(r.%s)", partitionKey)
        },
        // TODO: Remove this test since query team says its invalid now
        // { operator: "AVG", expected: undefined, condition: "true" },
        {
          operator: "COUNT",
          expected: testdata.numberOfDocuments,
          condition: "true"
        },
        { operator: "MAX", expected: "xyz", condition: "true" },
        { operator: "MIN", expected: null, condition: "true" },
        {
          operator: "SUM",
          expected: testdata.sum,
          condition: util.format("IS_NUMBER(r.%s)", partitionKey)
        }
        // TODO: Remove this test since query team says its invalid now
        // { operator: "SUM", expected: undefined, condition: "true" }
      ];

      aggregateConfigs.forEach(function(config) {
        let query = util.format(aggregateQueryFormat, config.operator, partitionKey, config.condition);
        let testName = util.format("%s %s", config.operator, config.condition);
        testConfigs.push({
          testName,
          query,
          expected: config.expected
        });

        query = util.format(aggregateOrderByQueryFormat, config.operator, partitionKey, config.condition, partitionKey);
        testName = util.format("%s %s OrderBy", config.operator, config.condition);
        testConfigs.push({
          testName,
          query,
          expected: config.expected
        });
      });

      const aggregateSinglePartitionQueryFormat = "SELECT VALUE %s(r.%s) FROM r WHERE r.%s = '%s'";
      const aggregateSinglePartitionQueryFormatSelect = "SELECT %s(r.%s) FROM r WHERE r.%s = '%s'";
      const samePartitionSum =
        (testdata.numberOfDocsWithSamePartitionKey * (testdata.numberOfDocsWithSamePartitionKey + 1)) / 2.0;
      const aggregateSinglePartitionConfigs = [
        {
          operator: "AVG",
          expected: samePartitionSum / testdata.numberOfDocsWithSamePartitionKey
        },
        {
          operator: "COUNT",
          expected: testdata.numberOfDocsWithSamePartitionKey
        },
        {
          operator: "MAX",
          expected: testdata.numberOfDocsWithSamePartitionKey
        },
        { operator: "MIN", expected: 1 },
        { operator: "SUM", expected: samePartitionSum }
      ];

      aggregateSinglePartitionConfigs.forEach(function(config) {
        let query = util.format(
          aggregateSinglePartitionQueryFormat,
          config.operator,
          testdata.field,
          partitionKey,
          uniquePartitionKey
        );
        let testName = util.format("%s SinglePartition %s", config.operator, "SELECT VALUE");
        testConfigs.push({
          testName,
          query,
          expected: config.expected
        });

        query = util.format(
          aggregateSinglePartitionQueryFormatSelect,
          config.operator,
          testdata.field,
          partitionKey,
          uniquePartitionKey
        );
        testName = util.format("%s SinglePartition %s", config.operator, "SELECT");
        testConfigs.push({
          testName,
          query,
          expected: { $1: config.expected }
        });
      });

      return testConfigs;
    };

    generateTestConfigs().forEach(function(test) {
      it(test.testName, async function() {
        try {
          const expected = test.expected === undefined ? [] : [test.expected];
          await executeQueryAndValidateResults(test.query, expected);
        } catch (err) {
          throw err;
        }
      });
    });
  });
});
