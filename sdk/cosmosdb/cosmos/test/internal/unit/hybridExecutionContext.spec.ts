// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CosmosDbDiagnosticLevel,
  DiagnosticNodeInternal,
  DiagnosticNodeType,
} from "../../../src/index.js";
import type { ClientContext, FeedOptions, QueryInfo } from "../../../src/index.js";
import type { ComponentWeight } from "../../../src/queryExecutionContext/hybridQueryExecutionContext.js";
import {
  HybridQueryExecutionContext,
  HybridQueryExecutionContextBaseStates,
} from "../../../src/queryExecutionContext/hybridQueryExecutionContext.js";
import type { HybridSearchQueryInfo } from "../../../src/request/ErrorResponse.js";
import type { GlobalStatistics } from "../../../src/request/globalStatistics.js";
import { HybridSearchQueryResult } from "../../../src/request/hybridSearchQueryResult.js";
import * as atobUtils from "../../../src/utils/atob.js";
import * as documentRid from "../../../src/utils/documentRid.js";
import { MockedClientContext } from "../../public/common/MockClientContext.js";
import { afterEach, beforeEach, describe, it, assert, expect, vi } from "vitest";

function createRid(value: bigint, databaseId = 1): string {
  const bytes = Buffer.alloc(16);
  bytes.writeUInt32LE(databaseId, 0);
  bytes.writeUInt32LE(0x80000001, 4);
  bytes.writeBigUInt64LE(value, 8);
  return bytes.toString("base64").replace(/\//g, "-");
}

function createResult(value: bigint, scores: number[], databaseId = 1): HybridSearchQueryResult {
  return new HybridSearchQueryResult(createRid(value, databaseId), scores, { id: String(value) });
}

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
        '_FullTextScore(c.title, "John", {documentdb-formattablehybridsearchquery-totaldocumentcount}, {documentdb-formattablehybridsearchquery-totalwordcount-0}, {documentdb-formattablehybridsearchquery-hitcountsarray-0})',
      ],
      groupByExpressions: [],
      aggregates: [],
      groupByAliasToAggregateType: {},
      rewrittenQuery:
        'SELECT c._rid, [{"item": _FullTextScore(c.title, "John", {documentdb-formattablehybridsearchquery-totaldocumentcount}, {documentdb-formattablehybridsearchquery-totalwordcount-0}, {documentdb-formattablehybridsearchquery-hitcountsarray-0})}] AS orderByItems, {"payload": {"Index": c.index, "Title": c.title, "Text": c.text}, "componentScores": [_FullTextScore(c.title, ["John"], {documentdb-formattablehybridsearchquery-totaldocumentcount}, {documentdb-formattablehybridsearchquery-totalwordcount-0}, {documentdb-formattablehybridsearchquery-hitcountsarray-0})]} AS payload\n' +
        "FROM c\n" +
        'WHERE ((FullTextContains(c.title, "John") OR FullTextContains(c.text, "John")) AND ({documentdb-formattableorderbyquery-filter}))\n' +
        'ORDER BY _FullTextScore(c.title, "John", {documentdb-formattablehybridsearchquery-totaldocumentcount}, {documentdb-formattablehybridsearchquery-totalwordcount-0}, {documentdb-formattablehybridsearchquery-hitcountsarray-0}) DESC',
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

describe("hybridQueryExecutionContext", () => {
  const clientContext: ClientContext = new MockedClientContext(
    partitionedQueryExecutionInfo.queryRanges,
  ) as any;

  // Create a new instance of HybridQueryExecutionContext
  const context = new HybridQueryExecutionContext(
    clientContext,
    collectionLink,
    "",
    options,
    partitionedQueryExecutionInfo,
    correlatedActivityId,
    partitionedQueryExecutionInfo.queryRanges,
  );
  context["options"] = options;

  describe("initialize Method", async () => {
    it("initialize Method should get executed correctly", async () => {
      vi.spyOn(context["globalStatisticsExecutionContext"], "hasMoreResults")
        .mockReturnValueOnce(true) // First call returns true
        .mockReturnValueOnce(false); // Second call returns false

      vi.spyOn(context["globalStatisticsExecutionContext"], "fetchMore").mockResolvedValue({
        result: {
          buffer: [
            {
              documentCount: 2,
              fullTextStatistics: [{ totalWordCount: 100, hitCounts: [1, 2, 3] }],
            },
          ],
        },
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
      const processComponentQueriesSpy = vi.spyOn(context as any, "processComponentQueries");
      const replacePlaceholdersSpy = vi.spyOn(context as any, "replacePlaceholdersWorkaroud");

      // Call the initialize method
      await context["initialize"](diagnosticNode, sampleHeader);

      assert.strictEqual(context["componentsExecutionContext"].length, 1);
      assert.strictEqual(context["state"], HybridQueryExecutionContextBaseStates.initialized);

      expect(processComponentQueriesSpy).toHaveBeenCalledTimes(1);
      expect(replacePlaceholdersSpy).toHaveBeenCalledTimes(2);

      processComponentQueriesSpy.mockRestore();
      replacePlaceholdersSpy.mockRestore();
    });
  });

  describe("ReplacePlaceholders Method", () => {
    it("replacePlaceholders method should replace placeholders in all queries correctly", async () => {
      // Array of query test cases
      const queryTestCases = [
        {
          queryToTest: `SELECT TOP 120 c._rid, [{"item": _FullTextScore(c.title, "swim", "run",
        {documentdb-formattablehybridsearchquery-totaldocumentcount},
        {documentdb-formattablehybridsearchquery-totalwordcount-0},
        {documentdb-formattablehybridsearchquery-hitcountsarray-0})}] AS orderByItems,
        {"payload": c, "componentScores": [_FullTextScore(c.title, "swim", "run",
        {documentdb-formattablehybridsearchquery-totaldocumentcount},
        {documentdb-formattablehybridsearchquery-totalwordcount-0},
        {documentdb-formattablehybridsearchquery-hitcountsarray-0})]}
        AS payload  FROM c
        WHERE ({documentdb-formattableorderbyquery-filter})
        ORDER BY _FullTextScore(c.title, "swim", "run",
        {documentdb-formattablehybridsearchquery-totaldocumentcount},
        {documentdb-formattablehybridsearchquery-totalwordcount-0},
        {documentdb-formattablehybridsearchquery-hitcountsarray-0}) DESC`,

          expectedQuery: `SELECT TOP 120 c._rid, [{"item": _FullTextScore(c.title, "swim", "run", 2, 100, [1,2,3])}] AS orderByItems,
        {"payload": c, "componentScores": [_FullTextScore(c.title, "swim", "run", 2, 100, [1,2,3])]}
        AS payload  FROM c WHERE ({documentdb-formattableorderbyquery-filter})
        ORDER BY _FullTextScore(c.title, "swim", "run", 2, 100, [1,2,3]) DESC`,
        },
        {
          queryToTest: `SELECT TOP 200 c._rid, [{item: _FullTextScore(c.text, "swim", "run",
        {documentdb-formattablehybridsearchquery-totaldocumentcount},
        {documentdb-formattablehybridsearchquery-totalwordcount-0},
        {documentdb-formattablehybridsearchquery-hitcountsarray-0})}] AS orderByItems,
        {payload: {text: c.text,abstract: c.abstract
        },componentScores: [_FullTextScore(c.text, "swim", "run", {documentdb-formattablehybridsearchquery-totaldocumentcount},
        {documentdb-formattablehybridsearchquery-totalwordcount-0},
        {documentdb-formattablehybridsearchquery-hitcountsarray-0}),
        _FullTextScore(c.abstract, "energy", {documentdb-formattablehybridsearchquery-totaldocumentcount},
        {documentdb-formattablehybridsearchquery-totalwordcount-1},
        {documentdb-formattablehybridsearchquery-hitcountsarray-1})]} AS payload
        FROM c WHERE {documentdb-formattableorderbyquery-filter} ORDER BY _FullTextScore(c.text, "swim", "run",
        {documentdb-formattablehybridsearchquery-totaldocumentcount},
        {documentdb-formattablehybridsearchquery-totalwordcount-0},
        {documentdb-formattablehybridsearchquery-hitcountsarray-0}) DESC`,

          expectedQuery: `SELECT TOP 200 c._rid, [{item: _FullTextScore(c.text, "swim", "run", 2, 100, [1,2,3])}] AS
        orderByItems, {payload: {text: c.text,abstract: c.abstract },componentScores: [_FullTextScore(c.text, "swim", "run",
        2, 100, [1,2,3]), _FullTextScore(c.abstract, "energy", 2, 200, [4,5,6])]} AS payload FROM c WHERE
        {documentdb-formattableorderbyquery-filter} ORDER BY _FullTextScore(c.text, "swim", "run", 2, 100, [1,2,3]) DESC`,
        },
        {
          queryToTest: `_FullTextScore(c.title, "swim", "run", {documentdb-formattablehybridsearchquery-totaldocumentcount},
        {documentdb-formattablehybridsearchquery-totalwordcount-0},
        {documentdb-formattablehybridsearchquery-hitcountsarray-0})`,

          expectedQuery: `_FullTextScore(c.title, "swim", "run", 2, 100, [1,2,3])`,
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
        const normalize = (str: string): string => str.replace(/\s+/g, " ").trim();
        assert.equal(normalize(result), normalize(expectedQuery));
      });
    });
  });

  describe("SortHybridSearchResultByRRFScore Method", () => {
    it("sortHybridSearchResultByRRFScore method should sort hybrid search results correctly based on RRF score", async () => {
      const input: HybridSearchQueryResult[] = [
        createResult(1n, [10, 20]),
        createResult(2n, [30, 10]),
        createResult(3n, [15, 25]),
      ];
      const expectedSortedRids = [3n, 2n, 1n].map((rid) => createRid(rid));

      const componentWeights: ComponentWeight[] = [
        { weight: 1, sortOrder: -1 },
        { weight: 1, sortOrder: -1 },
      ];
      const result = context["sortHybridSearchResultByRRFScore"](input, componentWeights);
      const resultRids = result.map((res) => res.rid);
      // Assert that the result rids are equal to the expected sorted rids
      assert.deepStrictEqual(resultRids, expectedSortedRids);
    });

    it("sortHybridSearchResultByRRFScore method should sort hybrid search results with single component score", async () => {
      const input: HybridSearchQueryResult[] = [
        createResult(1n, [30]),
        createResult(2n, [20]),
        createResult(3n, [25]),
      ];
      const componentWeights: ComponentWeight[] = [{ weight: 1, sortOrder: -1 }];
      const expectedSortedRids = [1n, 3n, 2n].map((rid) => createRid(rid));

      const result = context["sortHybridSearchResultByRRFScore"](input, componentWeights);
      const resultRids = result.map((res) => res.rid);
      // Assert that the result rids are equal to the expected sorted rids
      assert.deepStrictEqual(resultRids, expectedSortedRids);
    });

    it("sortHybridSearchResultByRRFScore method should handle one HybridSearchQueryResult", async () => {
      const input: HybridSearchQueryResult[] = [createResult(1n, [10, 20, 30])];
      const expectedSortedRids = [createRid(1n)];

      const componentWeights: ComponentWeight[] = [
        { weight: 1, sortOrder: -1 },
        { weight: 1, sortOrder: -1 },
        { weight: 1, sortOrder: -1 },
      ];
      const result = context["sortHybridSearchResultByRRFScore"](input, componentWeights);
      const resultRids = result.map((res) => res.rid);
      // Assert that the result rids are equal to the expected sorted rids
      assert.deepStrictEqual(resultRids, expectedSortedRids);
    });

    it("sortHybridSearchResultByRRFScore method should handle empty HybridSearchQueryResult array", async () => {
      const input: HybridSearchQueryResult[] = [];
      const componentWeights: ComponentWeight[] = [];
      const result = context["sortHybridSearchResultByRRFScore"](input, componentWeights);
      assert.deepStrictEqual(input, result);
    });
  });

  describe("deterministic RRF ranking", () => {
    const rankingEnv = "AZURE_COSMOS_HYBRID_SEARCH_USE_COMPETITION_RANKING";

    beforeEach(() => {
      vi.stubEnv(rankingEnv, undefined);
    });

    afterEach(() => {
      vi.unstubAllEnvs();
      vi.restoreAllMocks();
    });

    function createContext(
      sortOrders: (1 | -1)[] = [-1, -1],
      weights?: number[],
      queryOptions: FeedOptions = {},
    ): HybridQueryExecutionContext {
      return new HybridQueryExecutionContext(
        clientContext,
        collectionLink,
        "",
        { ...options, ...queryOptions },
        {
          ...partitionedQueryExecutionInfo,
          hybridSearchQueryInfo: {
            ...hybridSearchQueryInfo,
            componentWeights: weights,
            componentQueryInfos: sortOrders.map((sortOrder) => ({
              ...hybridSearchQueryInfo.componentQueryInfos[0],
              orderBy: [sortOrder === 1 ? "Ascending" : "Descending"],
            })),
          },
        },
        correlatedActivityId,
        partitionedQueryExecutionInfo.queryRanges,
      );
    }

    it.each([
      { setting: undefined, expectedRanks: [1, 2, 3, 4, 5] },
      { setting: "false", expectedRanks: [1, 2, 3, 4, 5] },
      { setting: "true", expectedRanks: [1, 2, 2, 2, 5] },
      { setting: "TRUE", expectedRanks: [1, 2, 2, 2, 5] },
    ])(
      "assigns the expected ranks with compatibility setting $setting",
      ({ setting, expectedRanks }) => {
        vi.stubEnv(rankingEnv, setting);
        const rankingContext = createContext([-1]);
        const input = [10, 5, 5, 5, 0].map((score, index) =>
          createResult(BigInt(5 - index), [score]),
        );
        const computeScore = vi.fn(rankingContext["computeRRFScore"]);
        rankingContext["computeRRFScore"] = computeScore;

        const result = rankingContext["sortHybridSearchResultByRRFScore"](
          input,
          rankingContext["extractComponentWeights"](),
        );

        expect(result).toEqual(input);
        expect(computeScore.mock.calls.map(([ranks]) => ranks)).toEqual(
          expectedRanks.map((rank) => [rank]),
        );
        expect(computeScore.mock.results.map(({ value }) => value)).toEqual(
          expectedRanks.map((rank) => 1 / (60 + rank)),
        );
      },
    );

    it("captures the compatibility setting once per query", () => {
      const ordinalContext = createContext();
      vi.stubEnv(rankingEnv, "true");
      const competitionContext = createContext();
      vi.stubEnv(rankingEnv, "false");

      expect(ordinalContext["useCompetitionRanking"]).toBe(false);
      expect(competitionContext["useCompetitionRanking"]).toBe(true);
      expect(createContext()["useCompetitionRanking"]).toBe(false);
    });

    it("decodes Cosmos RIDs with the browser atob API", () => {
      const decode = vi.spyOn(atobUtils, "default").mockImplementation(globalThis.atob);
      const rid = createRid(0xffffffffffffffffn);
      expect(documentRid.parseDocumentRid(rid)).toBe(0xffffffffffffffffn);
      expect(decode).toHaveBeenCalledWith(rid.replace(/-/g, "/"));
    });

    it.each([1, -1] as const)("breaks component ties in query-plan direction %s", (sortOrder) => {
      const rankingContext = createContext([sortOrder]);
      const input = [createResult(255n, [5]), createResult(256n, [5]), createResult(1n, [10])];
      expect(input[0].rid > input[1].rid).toBe(true);
      const sorted = rankingContext["sortHybridSearchResultByRRFScore"](
        input,
        rankingContext["extractComponentWeights"](),
      );
      expect(sorted.map(({ data }) => data.id)).toEqual(
        sortOrder === 1 ? ["255", "256", "1"] : ["1", "256", "255"],
      );
    });

    it("compares unsigned document RIDs exactly rather than encoded strings or container prefixes", () => {
      const rankingContext = createContext([-1]);
      const low = createResult(9007199254740992n, [5], 0xffffffff);
      const high = createResult(9007199254740993n, [5], 1);
      const max = createResult(0xffffffffffffffffn, [5]);
      expect(Number(9007199254740992n)).toBe(Number(9007199254740993n));
      expect(max.rid).toContain("-");
      expect(documentRid.parseDocumentRid(max.rid)).toBe(0xffffffffffffffffn);

      const result = rankingContext["sortHybridSearchResultByRRFScore"](
        [low, max, high],
        rankingContext["extractComponentWeights"](),
      );
      expect(result).toEqual([max, high, low]);
    });

    it("uses query-plan directions and preserves normalized weights", () => {
      // A negative weight is normalized by the query plan to a positive weight and ASC order.
      const rankingContext = createContext([-1, 1], [1, 3]);
      const input = [createResult(1n, [5, 5]), createResult(2n, [5, 5])];
      const weights = rankingContext["extractComponentWeights"]();
      expect(weights).toEqual([
        { weight: 1, sortOrder: -1 },
        { weight: 3, sortOrder: 1 },
      ]);
      const computeScore = vi.fn(rankingContext["computeRRFScore"]);
      rankingContext["computeRRFScore"] = computeScore;

      expect(rankingContext["sortHybridSearchResultByRRFScore"](input, weights)).toEqual(input);
      expect(computeScore.mock.calls.map(([ranks]) => ranks)).toEqual([
        [2, 1],
        [1, 2],
      ]);
      expect(computeScore.mock.results[0].value).toBe(1 / 62 + 3 * (1 / 61));
      expect(computeScore.mock.results[1].value).toBe(1 / 61 + 3 * (1 / 62));
    });

    it.each(["false", "true"])(
      "breaks fused ties by descending document RID in mode %s",
      (setting) => {
        vi.stubEnv(rankingEnv, setting);
        const rankingContext = createContext([-1, 1]);
        const low = createResult(9007199254740992n, [5, 5]);
        const high = createResult(9007199254740993n, [5, 5]);
        for (const input of [
          [low, high],
          [high, low],
        ]) {
          expect(
            rankingContext["sortHybridSearchResultByRRFScore"](
              input,
              rankingContext["extractComponentWeights"](),
            ),
          ).toEqual([high, low]);
        }
      },
    );

    it("decodes each retained row once, not inside component or fused comparators", () => {
      const rankingContext = createContext();
      const input = Array.from({ length: 20 }, (_, index) =>
        createResult(BigInt(index + 1), [index % 3, index % 2]),
      );
      const decode = vi.spyOn(documentRid, "parseDocumentRid");
      rankingContext["sortHybridSearchResultByRRFScore"](
        input,
        rankingContext["extractComponentWeights"](),
      );
      expect(decode).toHaveBeenCalledTimes(input.length);
      expect(decode.mock.calls.map(([rid]) => rid)).toEqual(input.map(({ rid }) => rid));
    });

    it("uses query-plan dimensions even when the first row has no component scores", () => {
      const rankingContext = createContext();
      const input = [createResult(1n, []), createResult(2n, [10, 5]), createResult(3n, [5])];
      const computeScore = vi.fn(rankingContext["computeRRFScore"]);
      rankingContext["computeRRFScore"] = computeScore;

      rankingContext["sortHybridSearchResultByRRFScore"](
        input,
        rankingContext["extractComponentWeights"](),
      );
      expect(computeScore.mock.calls.map(([ranks]) => ranks)).toEqual([
        [0, 0],
        [1, 1],
        [2, 0],
      ]);
      expect(computeScore.mock.results[0].value).toBe(2 / 60);
    });

    it("rejects surplus scores rather than silently dropping components", () => {
      const rankingContext = createContext([-1]);
      expect(() =>
        rankingContext["sortHybridSearchResultByRRFScore"](
          [createResult(1n, [10, 5])],
          rankingContext["extractComponentWeights"](),
        ),
      ).toThrow("Component scores exceed the query plan component count");
    });

    it.each([false, true])(
      "preserves payloads, full RID deduplication and paging with query control %s",
      async (enableQueryControl) => {
        const rankingContext = createContext([-1, -1], undefined, {
          enableQueryControl,
          maxItemCount: 1,
        });
        const low = createResult(1n, [5, 5]);
        const high = createResult(2n, [10, 10]);
        const sameDocumentDifferentDatabase = createResult(2n, [1, 1], 2);
        const oldPayload = (row: HybridSearchQueryResult): Record<string, unknown> => ({
          _rid: row.rid,
          payload: { payload: row.data, componentScores: row.componentScores },
        });
        const newPayload = (row: HybridSearchQueryResult): Record<string, unknown> => ({
          _rid: row.rid,
          payload: row.data,
          componentScores: row.componentScores,
        });
        rankingContext["componentsExecutionContext"] = [
          {
            hasMoreResults: vi.fn().mockReturnValueOnce(true).mockReturnValue(false),
            fetchMore: vi.fn().mockResolvedValue({
              result: [
                oldPayload(low),
                newPayload(high),
                oldPayload(low),
                newPayload(sameDocumentDifferentDatabase),
              ],
              headers: {},
            }),
            nextItem: vi.fn(),
          },
        ];
        rankingContext["partitionedQueryExecutionInfo"].hybridSearchQueryInfo.skip = 1;
        rankingContext["partitionedQueryExecutionInfo"].hybridSearchQueryInfo.take = 2;
        rankingContext["state"] = HybridQueryExecutionContextBaseStates.initialized;

        await rankingContext.fetchMore();
        expect(rankingContext["uniqueItems"].size).toBe(3);
        expect((await rankingContext.fetchMore()).result).toEqual([low.data]);
        expect((await rankingContext.nextItem(undefined)).result).toEqual(
          sameDocumentDifferentDatabase.data,
        );
        expect((await rankingContext.fetchMore()).result).toBeUndefined();
      },
    );

    it("preserves existing payload validation errors", () => {
      expect(() => HybridSearchQueryResult.create({})).toThrow("_rid must exist.");
      expect(() => HybridSearchQueryResult.create({ _rid: createRid(1n) })).toThrow(
        "payload must exist.",
      );
      expect(() =>
        HybridSearchQueryResult.create({ _rid: createRid(1n), payload: { id: "1" } }),
      ).toThrow("componentScores must exist.");
      expect(() => documentRid.parseDocumentRid("AQ==")).toThrow("RID too short");
    });
  });
});
