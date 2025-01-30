// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { CosmosDbDiagnosticLevel, DiagnosticNodeInternal, DiagnosticNodeType } from "../../../src";
import type { ClientContext, FeedOptions, QueryInfo } from "../../../src";
import {
  HybridQueryExecutionContext,
  HybridQueryExecutionContextBaseStates,
} from "../../../src/queryExecutionContext/hybridQueryExecutionContext";
import type { HybridSearchQueryInfo } from "../../../src/request/ErrorResponse";
import type { GlobalStatistics } from "../../../src/request/globalStatistics";
import assert from "assert";
import type { HybridSearchQueryResult } from "../../../src/request/hybridSearchQueryResult";
import sinon from "sinon";
import { MockedClientContext } from "../../public/common/MockClientContext";

const collectionLink = "/dbs/testDb/colls/testCollection"; // Sample collection link
const options: FeedOptions = { maxItemCount: 2, maxDegreeOfParallelism: 1 };
const queryInfo: QueryInfo = {
  orderBy: ["Ascending"],
  rewrittenQuery: "SELECT * FROM c",
} as QueryInfo;

const hybridSearchQueryInfo: HybridSearchQueryInfo = {
  globalStatisticsQuery:
    'SELECT COUNT(1) AS documentCount, [{"totalWordCount": SUM(_FullTextWordCount(c.title)), "hitCounts": [COUNTIF(FullTextContains(c.title, "John"))]}] AS fullTextStatistics\n' +
    "FROM c",
  componentQueryInfos: [
    {
      distinctType: "None",
      top: null,
      offset: null,
      limit: 10,
      orderBy: ["Descending"],
      orderByExpressions: [
        '_FullTextScore(c.title, ["John"], {documentdb-formattablehybridsearchquery-totaldocumentcount}, {documentdb-formattablehybridsearchquery-totalwordcount-0}, {documentdb-formattablehybridsearchquery-hitcountsarray-0})',
      ],
      groupByExpressions: [],
      aggregates: [],
      groupByAliasToAggregateType: {},
      rewrittenQuery:
        'SELECT c._rid, [{"item": _FullTextScore(c.title, ["John"], {documentdb-formattablehybridsearchquery-totaldocumentcount}, {documentdb-formattablehybridsearchquery-totalwordcount-0}, {documentdb-formattablehybridsearchquery-hitcountsarray-0})}] AS orderByItems, {"payload": {"Index": c.index, "Title": c.title, "Text": c.text}, "componentScores": [_FullTextScore(c.title, ["John"], {documentdb-formattablehybridsearchquery-totaldocumentcount}, {documentdb-formattablehybridsearchquery-totalwordcount-0}, {documentdb-formattablehybridsearchquery-hitcountsarray-0})]} AS payload\n' +
        "FROM c\n" +
        'WHERE ((FullTextContains(c.title, "John") OR FullTextContains(c.text, "John")) AND ({documentdb-formattableorderbyquery-filter}))\n' +
        'ORDER BY _FullTextScore(c.title, ["John"], {documentdb-formattablehybridsearchquery-totaldocumentcount}, {documentdb-formattablehybridsearchquery-totalwordcount-0}, {documentdb-formattablehybridsearchquery-hitcountsarray-0}) DESC',
      hasSelectValue: false,
      hasNonStreamingOrderBy: true,
    },
  ],
  skip: null,
  take: null,
  requiresGlobalStatistics: true,
};

const partitionedQueryExecutionInfo = {
  queryRanges: [{ min: "", max: "FF", isMinInclusive: true, isMaxInclusive: false }],
  queryInfo: queryInfo,
  partitionedQueryExecutionInfoVersion: 1,
  hybridSearchQueryInfo: hybridSearchQueryInfo,
};
const correlatedActivityId = "sample-activity-id"; // Example correlated activity ID
const diagnosticLevel = CosmosDbDiagnosticLevel.info;

describe("hybridQueryExecutionContext", function () {
  const clientContext: ClientContext = new MockedClientContext(
    partitionedQueryExecutionInfo.queryRanges,
  ) as any;

  // Create a new instance of HybridQueryExecutionContext
  const context = new HybridQueryExecutionContext(
    clientContext,
    collectionLink,
    options,
    partitionedQueryExecutionInfo,
    correlatedActivityId,
    partitionedQueryExecutionInfo.queryRanges,
  );
  context["options"] = options;

  describe("initialize Method", async function () {
    it("initialize Method should get executed correctly", async function () {
      sinon
        .stub(context["globalStatisticsExecutionContext"], "hasMoreResults")
        .onCall(0)
        .returns(true) // First call returns true
        .onCall(1)
        .returns(false); // Second call returns false

      sinon.stub(context["globalStatisticsExecutionContext"], "fetchMore").resolves({
        result: [
          {
            documentCount: 2,
            fullTextStatistics: [{ totalWordCount: 100, hitCounts: [1, 2, 3] }],
          },
        ],
        headers: {},
        code: 200,
        substatus: 0,
        diagnostics: undefined,
      });

      const diagnosticNode = new DiagnosticNodeInternal(
        diagnosticLevel,
        DiagnosticNodeType.CLIENT_REQUEST_NODE,
        null,
      );
      const sampleHeader = {
        "x-ms-documentdb-query-enable-scan": "true",
      };

      // Stub the processComponentQueries and replacePlaceholders methods to assert that they are called
      const processComponentQueriesSpy = sinon.spy(context as any, "processComponentQueries");
      const replacePlaceholdersSpy = sinon.spy(context as any, "replacePlaceholdersWorkaroud");

      // Call the initialize method
      await context["initialize"](diagnosticNode, sampleHeader);

      assert.strictEqual(context["componentsExecutionContext"].length, 1);
      assert.strictEqual(context["state"], HybridQueryExecutionContextBaseStates.initialized);
      assert(processComponentQueriesSpy.calledOnce);
      assert(replacePlaceholdersSpy.calledTwice);

      processComponentQueriesSpy.restore();
      replacePlaceholdersSpy.restore();
    });
  });

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
        const result = context["replacePlaceholdersWorkaroud"](queryToTest, stats1, 2);

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
