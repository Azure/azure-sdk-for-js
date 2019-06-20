import assert from "assert";
import { Container, ContainerDefinition, Database } from "../../dist-esm/client";
import { DataType, IndexKind } from "../../dist-esm/documents";
import { QueryIterator } from "../../dist-esm/index";
import { SqlQuerySpec } from "../../dist-esm/queryExecutionContext";
import { FeedOptions } from "../../dist-esm/request";
import { TestData } from "../common/TestData";
import { bulkInsertItems, getTestContainer, removeAllDatabases } from "../common/TestHelpers";

describe("Aggregate Query", function() {
  this.timeout(process.env.MOCHA_TIMEOUT || 20000);
  const partitionKey = "key";
  const uniquePartitionKey = "uniquePartitionKey";
  const testdata = new TestData(partitionKey, uniquePartitionKey);
  const documentDefinitions = testdata.docs;
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
      paths: ["/" + partitionKey]
    }
  };

  const containerOptions = { offerThroughput: 10100 };

  before(async function() {
    await removeAllDatabases();
    container = await getTestContainer(
      "Validate Aggregate Document Query",
      undefined,
      containerDefinition,
      containerOptions
    );
    await bulkInsertItems(container, documentDefinitions);
  });

  const validateResult = function(actualValue: any, expectedValue: any) {
    assert.deepEqual(actualValue, expectedValue, "actual value doesn't match with expected value.");
  };

  const validateToArray = async function(queryIterator: QueryIterator<any>, expectedResults: any) {
    const { resources: results } = await queryIterator.fetchAll();
    assert.equal(results.length, expectedResults.length, "invalid number of results");
    assert.equal(queryIterator.hasMoreResults(), false, "hasMoreResults: no more results is left");
  };

  const validateExecuteNextAndHasMoreResults = async function(
    queryIterator: QueryIterator<any>,
    options: any,
    expectedResults: any[]
  ) {
    const pageSize = options["maxItemCount"];
    const listOfResultPages: any[] = [];
    let totalFetchedResults: any[] = [];

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
        assert.equal(expectedResults.length, totalFetchedResults.length, "executeNext: didn't fetch all the results");
        assert(results.length <= pageSize, "executeNext: actual fetch size is more than the requested page size");
      }
    }

    // no more results
    validateResult(totalFetchedResults, expectedResults);
    assert.equal(queryIterator.hasMoreResults(), false, "hasMoreResults: no more results is left");
  };

  const ValidateAsyncIterator = async function(queryIterator: QueryIterator<any>, expectedResults: any[]) {
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
    const options: FeedOptions = { maxDegreeOfParallelism: 2, maxItemCount: 1 };

    const queryIterator = container.items.query(query, options);
    await validateToArray(queryIterator, expectedResults);
    queryIterator.reset();
    await validateExecuteNextAndHasMoreResults(queryIterator, options, expectedResults);
    queryIterator.reset();
    await ValidateAsyncIterator(queryIterator, expectedResults);
  };

  const generateTestConfigs = function() {
    const testConfigs: any[] = [];
    const aggregateConfigs = [
      {
        operator: "AVG",
        expected: testdata.sum / testdata.numberOfDocumentsWithNumbericId,
        condition: `IS_NUMBER(r.${partitionKey})`
      },
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
        condition: `IS_NUMBER(r.${partitionKey})`
      }
    ];

    aggregateConfigs.forEach(function({ operator, condition, expected }) {
      let query = `SELECT VALUE ${operator}(r.${partitionKey}) FROM r WHERE ${condition}`;
      let testName = `${operator} ${condition}`;

      testConfigs.push({
        testName,
        query,
        expected
      });

      query = `SELECT VALUE ${operator}(r.${partitionKey}) FROM r WHERE ${condition} ORDER BY r.${partitionKey}`;
      testName = `${operator} ${condition} OrderBy`;
      testConfigs.push({
        testName,
        query,
        expected
      });
    });

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

    aggregateSinglePartitionConfigs.forEach(function({ operator, expected }) {
      const query = `SELECT VALUE ${operator}(r.${
        testdata.field
      }) FROM r WHERE r.${partitionKey} = '${uniquePartitionKey}'`;
      let testName = `${operator} SinglePartition SELECT VALUE`;
      testConfigs.push({
        testName,
        query,
        expected
      });
    });

    return testConfigs;
  };

  generateTestConfigs().forEach(function(test) {
    it(test.testName, async function() {
      const expected = test.expected === undefined ? [] : [test.expected];
      await executeQueryAndValidateResults(test.query, expected);
    });
  });

  it("should error for non-VALUE queries", async () => {
    try {
      const queryIterator = container.items.query("SELECT SUM(r.key) from r WHERE IS_NUMBER(r.key)");
      const response = await queryIterator.fetchAll();
      assert.fail("Should throw an error");
    } catch (error) {
      assert(error);
    }
  });

  it("should error for GROUP BY queries", async () => {
    try {
      const queryIterator = container.items.query("SELECT * from r GROUP BY r.key");
      const response = await queryIterator.fetchAll();
      assert.fail("Should throw an error");
    } catch (error) {
      assert.equal(error.code, 400);
    }
  });
});
