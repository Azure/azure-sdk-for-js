// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  ClientConfigDiagnostic,
  ClientContext,
  ConsistencyLevel,
  Constants,
  CosmosClientOptions,
  CosmosDbDiagnosticLevel,
  DiagnosticNodeInternal,
  FeedOptions,
  GlobalEndpointManager,
  QueryInfo,
  RequestOptions,
} from "../../../src";
import { expect } from "chai";
import { HybridQueryExecutionContext } from "../../../src/queryExecutionContext/hybridQueryExecutionContext";
import { HybridSearchQueryInfo } from "../../../src/request/ErrorResponse";
import { GlobalStatistics } from "../../../src/request/globalStatistics";
import assert from "assert";
import { HybridSearchQueryResult } from "../../../src/request/hybridSearchQueryResult";

function createTestClientContext(
  options: Partial<CosmosClientOptions>,
  diagnosticLevel: CosmosDbDiagnosticLevel,
) {
  const clientOps: CosmosClientOptions = {
    endpoint: "",
    connectionPolicy: {
      enableEndpointDiscovery: false,
      preferredLocations: ["https://localhhost"],
    },
    ...options,
  };
  const globalEndpointManager = new GlobalEndpointManager(
    clientOps,
    async (diagnosticNode: DiagnosticNodeInternal, opts: RequestOptions) => {
      expect(opts).to.exist; // eslint-disable-line no-unused-expressions
      const dummyAccount: any = diagnosticNode;
      return dummyAccount;
    },
  );
  const clientConfig: ClientConfigDiagnostic = {
    endpoint: "",
    resourceTokensConfigured: true,
    tokenProviderConfigured: true,
    aadCredentialsConfigured: true,
    connectionPolicyConfigured: true,
    consistencyLevel: ConsistencyLevel.BoundedStaleness,
    defaultHeaders: {},
    agentConfigured: true,
    userAgentSuffix: "",
    pluginsConfigured: true,
    sDKVersion: Constants.SDKVersion,
    ...options,
  };
  const clientContext = new ClientContext(
    clientOps,
    globalEndpointManager,
    clientConfig,
    diagnosticLevel,
  );
  return clientContext;
}

const collectionLink = "/dbs/testDb/colls/testCollection"; // Sample collection link
const query = `SELECT TOP 10 * FROM c ORDER BY RANK FullTextScore(c.title, ['swim', 'run'])`;
const options: FeedOptions = { maxItemCount: 2, maxDegreeOfParallelism: 1 };
const queryInfo: QueryInfo = {
  orderBy: ["Ascending"],
  rewrittenQuery: "SELECT * FROM c",
} as QueryInfo;

const hybridSearchQueryInfo: HybridSearchQueryInfo = {
  globalStatisticsQuery: "SELECT VALUE COUNT(1) FROM c",
  componentQueryInfos: [queryInfo],
  take: 10,
  skip: 0,
  requiresGlobalStatistics: true,
};

const partitionedQueryExecutionInfo = {
  queryRanges: [
    {
      min: "",
      max: "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
      isMinInclusive: true, // Whether the minimum value is inclusive
      isMaxInclusive: false,
    },
    {
      min: "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
      max: "FF",
      isMinInclusive: true, // Whether the minimum value is inclusive
      isMaxInclusive: false,
    },
  ],
  queryInfo: queryInfo,
  partitionedQueryExecutionInfoVersion: 1,
  hybridSearchQueryInfo: hybridSearchQueryInfo,
};
const cosmosClientOptions = {
  endpoint: "https://your-cosmos-db.documents.azure.com:443/",
  key: "your-cosmos-db-key",
  userAgentSuffix: "MockClient",
};
const correlatedActivityId = "sample-activity-id"; // Example correlated activity ID
const diagnosticLevel = CosmosDbDiagnosticLevel.info;

describe("hybridQueryExecutionContext", function () {
  const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel); // Mock ClientContext instance

  // Create a new instance of HybridQueryExecutionContext
  const context = new HybridQueryExecutionContext(
    clientContext,
    collectionLink,
    query,
    options,
    partitionedQueryExecutionInfo,
    correlatedActivityId,
    partitionedQueryExecutionInfo.queryRanges,
  );
  context["options"] = options;

  describe("ReplacePlaceholders Method", function () {
    it("replacePlaceholders method should replace placeholders in all queries correctly", async function () {
      // Array of query test cases
      const queryTestCases = [
        {
          queryToTest: `SELECT TOP 120 c._rid, [{"item": _FullTextScore(c.title, ["swim", "run"],
        {documentdb-formattablehybridsearchquery-totaldocumentcount},
        {documentdb-formattablehybridsearchquery-totalwordcount-0},
        {documentdb-formattablehybridsearchquery-hitcountsarray-0})}] AS orderByItems,
        {"payload": c, "componentScores": [_FullTextScore(c.title, ["swim", "run"],
        {documentdb-formattablehybridsearchquery-totaldocumentcount},
        {documentdb-formattablehybridsearchquery-totalwordcount-0},
        {documentdb-formattablehybridsearchquery-hitcountsarray-0})]}
        AS payload  FROM c
        WHERE ({documentdb-formattableorderbyquery-filter})
        ORDER BY _FullTextScore(c.title, ["swim", "run"], 
        {documentdb-formattablehybridsearchquery-totaldocumentcount},
        {documentdb-formattablehybridsearchquery-totalwordcount-0}, 
        {documentdb-formattablehybridsearchquery-hitcountsarray-0}) DESC`,

          expectedQuery: `SELECT TOP 120 c._rid, [{"item": _FullTextScore(c.title, ["swim", "run"], 2, 100, [1,2,3])}] AS orderByItems,
        {"payload": c, "componentScores": [_FullTextScore(c.title, ["swim", "run"], 2, 100, [1,2,3])]}
        AS payload  FROM c WHERE ({documentdb-formattableorderbyquery-filter})
        ORDER BY _FullTextScore(c.title, ["swim", "run"], 2, 100, [1,2,3]) DESC`,
        },
        {
          queryToTest: `SELECT TOP 200 c._rid, [{item: _FullTextScore(c.text, ["swim", "run"], 
        {documentdb-formattablehybridsearchquery-totaldocumentcount},
        {documentdb-formattablehybridsearchquery-totalwordcount-0},
        {documentdb-formattablehybridsearchquery-hitcountsarray-0})}] AS orderByItems,
        {payload: {text: c.text,abstract: c.abstract
        },componentScores: [_FullTextScore(c.text, ["swim", "run"], {documentdb-formattablehybridsearchquery-totaldocumentcount},
        {documentdb-formattablehybridsearchquery-totalwordcount-0},
        {documentdb-formattablehybridsearchquery-hitcountsarray-0}),
        _FullTextScore(c.abstract, ["energy"], {documentdb-formattablehybridsearchquery-totaldocumentcount},
        {documentdb-formattablehybridsearchquery-totalwordcount-1},
        {documentdb-formattablehybridsearchquery-hitcountsarray-1})]} AS payload
        FROM c WHERE {documentdb-formattableorderbyquery-filter} ORDER BY _FullTextScore(c.text, ["swim", "run"],
        {documentdb-formattablehybridsearchquery-totaldocumentcount}, 
        {documentdb-formattablehybridsearchquery-totalwordcount-0}, 
        {documentdb-formattablehybridsearchquery-hitcountsarray-0}) DESC`,

          expectedQuery: `SELECT TOP 200 c._rid, [{item: _FullTextScore(c.text, ["swim", "run"], 2, 100, [1,2,3])}] AS
        orderByItems, {payload: {text: c.text,abstract: c.abstract },componentScores: [_FullTextScore(c.text, ["swim", "run"],
        2, 100, [1,2,3]), _FullTextScore(c.abstract, ["energy"], 2, 200, [4,5,6])]} AS payload FROM c WHERE 
        {documentdb-formattableorderbyquery-filter} ORDER BY _FullTextScore(c.text, ["swim", "run"], 2, 100, [1,2,3]) DESC`,
        },
        {
          queryToTest: `_FullTextScore(c.title, ["swim", "run"], {documentdb-formattablehybridsearchquery-totaldocumentcount},
        {documentdb-formattablehybridsearchquery-totalwordcount-0}, 
        {documentdb-formattablehybridsearchquery-hitcountsarray-0})`,

          expectedQuery: `_FullTextScore(c.title, ["swim", "run"], 2, 100, [1,2,3])`,
        },
      ];

      const stats1: GlobalStatistics = {
        documentCount: 2,
        fullTextStatistics: [
          { totalWordCount: 100, hitCounts: [1, 2, 3] },
          { totalWordCount: 200, hitCounts: [4, 5, 6] },
        ],
      };

      // Iterate through the array of queryTestCases
      queryTestCases.forEach(({ queryToTest, expectedQuery }) => {
        const result = context["replacePlaceholders"](queryToTest, stats1);

        // Normalize both actual and expected queries by removing all whitespace
        const normalize = (str: string) => str.replace(/\s+/g, " ").trim();
        assert.equal(normalize(result), normalize(expectedQuery));
      });
    });
  });

  describe("SortHybridSearchResultByRRFScore Method", function () {
    it("sortHybridSearchResultByRRFScore method should sort hybrid search results correctly based on RRF score", async function () {
      const input: HybridSearchQueryResult[] = [
        { rid: "1", componentScores: [10, 20], data: {}, score: 0, ranks: [] },
        { rid: "2", componentScores: [30, 10], data: {}, score: 0, ranks: [] },
        { rid: "3", componentScores: [15, 25], data: {}, score: 0, ranks: [] },
      ];
      const expectedSortedRids = ["3", "2", "1"];

      const result = context["sortHybridSearchResultByRRFScore"](input);
      const resultRids = result.map((res) => res.rid);
      // Assert that the result rids are equal to the expected sorted rids
      assert.deepStrictEqual(resultRids, expectedSortedRids);
    });

    it("sortHybridSearchResultByRRFScore method should sort hybrid search results with single component score", async function () {
      const input: HybridSearchQueryResult[] = [
        { rid: "1", componentScores: [30], data: {}, score: 0, ranks: [] },
        { rid: "2", componentScores: [20], data: {}, score: 0, ranks: [] },
        { rid: "3", componentScores: [25], data: {}, score: 0, ranks: [] },
      ];
      const expectedSortedRids = ["1", "3", "2"];

      const result = context["sortHybridSearchResultByRRFScore"](input);
      const resultRids = result.map((res) => res.rid);
      // Assert that the result rids are equal to the expected sorted rids
      assert.deepStrictEqual(resultRids, expectedSortedRids);
    });

    it("sortHybridSearchResultByRRFScore method should handle one HybridSearchQueryResult", async function () {
      const input: HybridSearchQueryResult[] = [
        { rid: "1", componentScores: [10, 20, 30], data: {}, score: 0, ranks: [] },
      ];
      const expectedSortedRids = ["1"];

      const result = context["sortHybridSearchResultByRRFScore"](input);
      const resultRids = result.map((res) => res.rid);
      // Assert that the result rids are equal to the expected sorted rids
      assert.deepStrictEqual(resultRids, expectedSortedRids);
    });

    it("sortHybridSearchResultByRRFScore method should handle empty HybridSearchQueryResult array", async function () {
      const input: HybridSearchQueryResult[] = [];
      const result = context["sortHybridSearchResultByRRFScore"](input);
      assert.deepStrictEqual(input, result);
    });
  });
});
