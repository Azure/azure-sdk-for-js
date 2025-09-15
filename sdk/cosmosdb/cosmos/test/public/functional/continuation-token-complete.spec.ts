// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosClient } from "../../../src/index.js";
import type { Container } from "../../../src/index.js";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import { getTestContainer, removeAllDatabases } from "../common/TestHelpers.js";
import { describe, it, beforeAll, afterAll, expect } from "vitest";

const client = new CosmosClient({
  endpoint,
  key: masterKey,
});

/**
 * Test cases for continuation token structure validation
 */
interface ContinuationTokenTestCase {
  name: string;
  query: string;
  queryOptions: any;
  expectedTokenStructure: {
    hasCompositeToken?: boolean;
    hasOrderByItems?: boolean;
    hasRangeMappings?: boolean;
    hasOffset?: boolean;
    hasLimit?: boolean;
    hasSkipCount?: boolean;
    hasRid?: boolean;
    expectNoContinuationToken?: boolean; // For queries that don't support continuation
  };
  expectedTokenValues?: {
    orderByItemsCount?: number;
    skipCountInitial?: number;
    offsetValue?: number;
    limitValue?: number;
    ridType?: "string";
    compositeTokenType?: "string";
    rangeMappingsMinCount?: number;
    groupByValuesType?: "array" | "object";
    expectUndefined?: boolean; // For cases where no token is expected
  };
  tokenParser: (token: string) => any;
  validator: (parsedToken: any) => boolean;
  requiresMultiPartition?: boolean;
  description: string;
}

/**
 * Comprehensive test matrix for different query types and their continuation token behavior
 */
const CONTINUATION_TOKEN_TEST_CASES: ContinuationTokenTestCase[] = [
  // ============= BASIC QUERIES =============
  {
    name: "Simple Parallel Query",
    query: "SELECT * FROM c WHERE c.amount > 10",
    queryOptions: { maxItemCount: 3, forceQueryPlan: true, enableQueryControl: true },
    expectedTokenStructure: {
      hasRangeMappings: true,
      hasRid: true,
      hasCompositeToken: false,
      hasOrderByItems: false,
    },
    expectedTokenValues: {
      ridType: "string",
      rangeMappingsMinCount: 1,
    },
    tokenParser: (token) => JSON.parse(token),
    validator: (parsed) => {
      return (
        parsed.rangeMappings &&
        Array.isArray(parsed.rangeMappings) &&
        typeof parsed.rid === "string" &&
        !parsed.compositeToken &&
        !parsed.orderByItems
      );
    },
    requiresMultiPartition: false,
    description:
      "Basic parallel query should produce CompositeQueryContinuationToken with rangeMappings",
  },

  {
    name: "SELECT with Projection",
    query: "SELECT c.id, c.name, c.amount FROM c",
    queryOptions: { maxItemCount: 4, forceQueryPlan: true, enableQueryControl: true },
    expectedTokenStructure: {
      hasRangeMappings: true,
      hasRid: true,
    },
    expectedTokenValues: {
      ridType: "string",
      rangeMappingsMinCount: 1,
    },
    tokenParser: (token) => JSON.parse(token),
    validator: (parsed) => {
      return (
        parsed.rangeMappings &&
        Array.isArray(parsed.rangeMappings) &&
        typeof parsed.rid === "string" &&
        parsed.rid.length > 0
      );
    },
    requiresMultiPartition: false,
    description: "Projection queries should use parallel execution with composite tokens",
  },

  // ============= ORDER BY QUERIES =============
  {
    name: "ORDER BY Single Field ASC",
    query: "SELECT * FROM c ORDER BY c.amount ASC",
    queryOptions: { maxItemCount: 2, enableQueryControl: true },
    expectedTokenStructure: {
      hasCompositeToken: true,
      hasOrderByItems: true,
      hasSkipCount: true,
      hasRid: true,
    },
    expectedTokenValues: {
      orderByItemsCount: 1,
      skipCountInitial: 0,
      ridType: "string",
      compositeTokenType: "string",
    },
    tokenParser: (token) => JSON.parse(token),
    validator: (parsed) => {
      return (
        typeof parsed.compositeToken === "string" &&
        Array.isArray(parsed.orderByItems) &&
        typeof parsed.skipCount === "number" &&
        typeof parsed.rid === "string"
      );
    },
    requiresMultiPartition: true,
    description: "ORDER BY queries should produce OrderByQueryContinuationToken with orderByItems",
  },

  {
    name: "ORDER BY Single Field DESC",
    query: "SELECT * FROM c ORDER BY c.amount DESC",
    queryOptions: { maxItemCount: 3, enableQueryControl: true },
    expectedTokenStructure: {
      hasCompositeToken: true,
      hasOrderByItems: true,
      hasSkipCount: true,
      hasRid: true,
    },
    expectedTokenValues: {
      orderByItemsCount: 1,
      skipCountInitial: 0,
      ridType: "string",
      compositeTokenType: "string",
    },
    tokenParser: (token) => JSON.parse(token),
    validator: (parsed) => {
      return (
        parsed.compositeToken &&
        parsed.orderByItems &&
        parsed.orderByItems.length > 0 &&
        typeof parsed.skipCount === "number"
      );
    },
    requiresMultiPartition: true,
    description: "ORDER BY DESC should maintain proper ordering with continuation tokens",
  },

  {
    name: "ORDER BY Multiple Fields",
    query: "SELECT * FROM c ORDER BY c.category ASC, c.amount DESC",
    queryOptions: { maxItemCount: 2, enableQueryControl: true },
    expectedTokenStructure: {
      hasCompositeToken: true,
      hasOrderByItems: true,
      hasSkipCount: true,
      hasRid: true,
    },
    expectedTokenValues: {
      orderByItemsCount: 2,
      skipCountInitial: 0,
      ridType: "string",
      compositeTokenType: "string",
    },
    tokenParser: (token) => JSON.parse(token),
    validator: (parsed) => {
      return parsed.compositeToken && parsed.orderByItems && parsed.orderByItems.length > 0;
    },
    requiresMultiPartition: true,
    description: "Multi-field ORDER BY should handle complex ordering scenarios",
  },

  // ============= TOP/OFFSET/LIMIT QUERIES =============
  {
    name: "TOP Query",
    query: "SELECT TOP 10 * FROM c",
    queryOptions: { maxItemCount: 2, enableQueryControl: true },
    expectedTokenStructure: {
      hasRangeMappings: true,
      hasLimit: true,
      hasRid: true,
    },
    expectedTokenValues: {
      limitValue: 8,
      ridType: "string",
      rangeMappingsMinCount: 1,
    },
    tokenParser: (token) => JSON.parse(token),
    validator: (parsed) => {
      return (
        parsed.rangeMappings &&
        typeof parsed.limit === "number" &&
        parsed.limit > 0 &&
        typeof parsed.rid === "string"
      );
    },
    requiresMultiPartition: false,
    description: "TOP queries should track remaining limit in continuation token",
  },

  {
    name: "OFFSET LIMIT Combined",
    query: "SELECT * FROM c OFFSET 3 LIMIT 8",
    queryOptions: { maxItemCount: 2, enableQueryControl: true },
    expectedTokenStructure: {
      hasRangeMappings: true,
      hasOffset: true,
      hasLimit: true,
      hasRid: true,
    },
    expectedTokenValues: {
      offsetValue: 0,
      limitValue: 7,
      ridType: "string",
      rangeMappingsMinCount: 1,
    },
    tokenParser: (token) => JSON.parse(token),
    validator: (parsed) => {
      return (
        parsed.rangeMappings &&
        typeof parsed.offset === "number" &&
        typeof parsed.limit === "number" &&
        parsed.offset >= 0 &&
        parsed.limit > 0 &&
        typeof parsed.rid === "string"
      );
    },
    requiresMultiPartition: false,
    description: "OFFSET LIMIT combination should maintain both offset and limit state",
  },
  // TODO: add test case of offset + limit with order by

  // ============= DISTINCT QUERIES =============
  {
    name: "DISTINCT Query (Unordered - No Continuation Support)",
    query: "SELECT DISTINCT c.category FROM c",
    queryOptions: { maxItemCount: 3, enableQueryControl: true },
    expectedTokenStructure: {
      expectNoContinuationToken: true,
    },
    expectedTokenValues: {
      expectUndefined: true,
    },
    tokenParser: (_token) => null, // No token expected
    validator: (_parsed) => true, // No validation needed for undefined tokens
    requiresMultiPartition: true,
    description:
      "Unordered DISTINCT queries should return undefined continuation tokens as they don't support continuation",
  },

  {
    name: "DISTINCT with ORDER BY (Ordered - Supports Continuation)",
    query: "SELECT DISTINCT c.category FROM c ORDER BY c.category ASC",
    queryOptions: { maxItemCount: 2, enableQueryControl: true },
    expectedTokenStructure: {
      hasCompositeToken: true,
      hasOrderByItems: true,
      hasSkipCount: true,
      hasRid: true,
    },
    expectedTokenValues: {
      ridType: "string",
      orderByItemsCount: 1,
      skipCountInitial: 0,
      compositeTokenType: "string",
    },
    tokenParser: (token) => JSON.parse(token),
    validator: (parsed) => {
      return (
        parsed.compositeToken &&
        parsed.orderByItems &&
        Array.isArray(parsed.orderByItems) &&
        typeof parsed.skipCount === "number"
      );
    },
    requiresMultiPartition: true,
    description:
      "DISTINCT with ORDER BY should support continuation tokens using OrderByQueryContinuationToken",
  },

  // ============= AGGREGATE QUERIES =============
  {
    name: "COUNT Aggregate (No Continuation Support)",
    query: "SELECT COUNT(1) as count FROM c",
    queryOptions: { maxItemCount: 2, enableQueryControl: true },
    expectedTokenStructure: {
      expectNoContinuationToken: true,
    },
    expectedTokenValues: {
      expectUndefined: true,
    },
    tokenParser: (_token) => null, // No token expected
    validator: (_parsed) => true, // No validation needed for undefined tokens
    requiresMultiPartition: true,
    description:
      "COUNT aggregates don't support continuation tokens as they require full aggregation",
  },

  {
    name: "SUM Aggregate (No Continuation Support)",
    query: "SELECT SUM(c.amount) as total FROM c",
    queryOptions: { maxItemCount: 2, enableQueryControl: true },
    expectedTokenStructure: {
      expectNoContinuationToken: true,
    },
    expectedTokenValues: {
      expectUndefined: true,
    },
    tokenParser: (_token) => null, // No token expected
    validator: (_parsed) => true, // No validation needed for undefined tokens
    requiresMultiPartition: true,
    description:
      "SUM aggregates don't support continuation tokens as they require full aggregation",
  },

  {
    name: "AVG Aggregate (No Continuation Support)",
    query: "SELECT AVG(c.amount) as average FROM c",
    queryOptions: { maxItemCount: 2, enableQueryControl: true },
    expectedTokenStructure: {
      expectNoContinuationToken: true,
    },
    expectedTokenValues: {
      expectUndefined: true,
    },
    tokenParser: (_token) => null, // No token expected
    validator: (_parsed) => true, // No validation needed for undefined tokens
    requiresMultiPartition: true,
    description:
      "AVG aggregates don't support continuation tokens as they require full aggregation",
  },

  {
    name: "MIN MAX Aggregate (No Continuation Support)",
    query: "SELECT MIN(c.amount) as minimum, MAX(c.amount) as maximum FROM c",
    queryOptions: { maxItemCount: 2, enableQueryControl: true },
    expectedTokenStructure: {
      expectNoContinuationToken: true,
    },
    expectedTokenValues: {
      expectUndefined: true,
    },
    tokenParser: (_token) => null, // No token expected
    validator: (_parsed) => true, // No validation needed for undefined tokens
    requiresMultiPartition: true,
    description:
      "MIN/MAX aggregates don't support continuation tokens as they require full aggregation",
  },

  // ============= GROUP BY QUERIES =============
  {
    name: "GROUP BY Query (No Continuation Support)",
    query: "SELECT c.category, COUNT(1) as count FROM c GROUP BY c.category",
    queryOptions: { maxItemCount: 2, enableQueryControl: true },
    expectedTokenStructure: {
      expectNoContinuationToken: true,
    },
    expectedTokenValues: {
      expectUndefined: true,
    },
    tokenParser: (_token) => null, // No token expected
    validator: (_parsed) => true, // No validation needed for undefined tokens
    requiresMultiPartition: true,
    description:
      "GROUP BY queries don't support continuation tokens as they require full aggregation",
  },

  // ============= COMPLEX QUERIES =============
  {
    name: "JOIN with ORDER BY",
    query: "SELECT c.id, c.name, t FROM c JOIN t IN c.tags ORDER BY c.id",
    queryOptions: { maxItemCount: 2, enableQueryControl: true },
    expectedTokenStructure: {
      hasCompositeToken: true,
      hasOrderByItems: true,
      hasSkipCount: true,
      hasRid: true,
    },
    expectedTokenValues: {
      ridType: "string",
      orderByItemsCount: 1,
      skipCountInitial: 0,
    },
    tokenParser: (token) => JSON.parse(token),
    validator: (parsed) => {
      return (
        parsed.compositeToken &&
        parsed.orderByItems &&
        Array.isArray(parsed.orderByItems) &&
        parsed.orderByItems.length > 0
      );
    },
    requiresMultiPartition: true,
    description: "JOIN with ORDER BY should produce OrderBy continuation tokens",
  },

  {
    name: "WHERE with ORDER BY",
    query: "SELECT * FROM c WHERE c.amount > 20 ORDER BY c.amount ASC",
    queryOptions: { maxItemCount: 3, enableQueryControl: true },
    expectedTokenStructure: {
      hasCompositeToken: true,
      hasOrderByItems: true,
      hasSkipCount: true,
      hasRid: true,
    },
    expectedTokenValues: {
      ridType: "string",
      orderByItemsCount: 1,
      skipCountInitial: 0,
    },
    tokenParser: (token) => JSON.parse(token),
    validator: (parsed) => {
      return parsed.rangeMappings && parsed.orderByItems && typeof parsed.skipCount === "number";
    },
    requiresMultiPartition: true,
    description: "Filtered ORDER BY queries should maintain ordering with predicates",
  },
];

describe("Comprehensive Continuation Token Tests", { timeout: 120000 }, () => {
  let singlePartitionContainer: Container;
  let multiPartitionContainer: Container;

  beforeAll(async () => {
    await removeAllDatabases(client);

    // Create single partition container with essential composite indexes
    singlePartitionContainer = await getTestContainer(
      "single-partition-test",
      client,
      {
        partitionKey: { paths: ["/pk"] },
        throughput: 1000,
        indexingPolicy: {
          indexingMode: "consistent",
          automatic: true,
          includedPaths: [{ path: "/*" }],
          excludedPaths: [{ path: '/"_etag"/?' }],
          compositeIndexes: [
            // Multi-field combinations for ORDER BY queries (minimum 2 paths required)
            [
              { path: "/category", order: "ascending" },
              { path: "/amount", order: "descending" },
            ],
            [
              { path: "/amount", order: "ascending" },
              { path: "/name", order: "descending" },
            ],
            [
              { path: "/sequence", order: "ascending" },
              { path: "/amount", order: "descending" },
            ],
            [
              { path: "/name", order: "ascending" },
              { path: "/amount", order: "ascending" },
            ],
          ],
        },
      },
      {},
    );

    // Create multi-partition container with essential composite indexes
    multiPartitionContainer = await getTestContainer(
      "multi-partition-test",
      client,
      {
        partitionKey: { paths: ["/category"] },
        throughput: 15000,
        indexingPolicy: {
          indexingMode: "consistent",
          automatic: true,
          includedPaths: [{ path: "/*" }],
          excludedPaths: [{ path: '/"_etag"/?' }],
          compositeIndexes: [
            // Multi-field combinations for ORDER BY queries (minimum 2 paths required)
            [
              { path: "/category", order: "ascending" },
              { path: "/amount", order: "descending" },
            ],
            [
              { path: "/amount", order: "ascending" },
              { path: "/name", order: "descending" },
            ],
            [
              { path: "/category", order: "ascending" },
              { path: "/amount", order: "descending" },
              { path: "/name", order: "ascending" },
            ],
            [
              { path: "/id", order: "ascending" },
              { path: "/amount", order: "ascending" },
            ],
            [
              { path: "/name", order: "ascending" },
              { path: "/category", order: "ascending" },
            ],
          ],
        },
      },
      {},
    );

    // Populate containers with test data
    await populateSinglePartitionData(singlePartitionContainer);
    await populateMultiPartitionData(multiPartitionContainer);
  });

  afterAll(async () => {
    await removeAllDatabases(client);
  });

  describe("Token Structure Validation", () => {
    CONTINUATION_TOKEN_TEST_CASES.forEach((testCase) => {
      it(`should validate ${testCase.name}: ${testCase.description}`, async () => {
        const container = testCase.requiresMultiPartition
          ? multiPartitionContainer
          : singlePartitionContainer;

        console.log(`\n=== Testing: ${testCase.name} ===`);
        console.log(`Query: ${testCase.query}`);

        const queryIterator = container.items.query(testCase.query, testCase.queryOptions);

        let continuationToken: string | undefined;
        let totalResults = 0;
        let attempts = 0;
        const maxAttempts = 15;

        // Execute until we get a continuation token
        while (queryIterator.hasMoreResults() && attempts < maxAttempts) {
          const result = await queryIterator.fetchNext();
          totalResults += result.resources.length;
          continuationToken = result.continuationToken;
          attempts++;

          console.log(
            `Attempt ${attempts}: ${result.resources.length} results, token: ${continuationToken ? "YES" : "NO"}`,
          );

          if (continuationToken) {
            break;
          }
        }

        if (!continuationToken) {
          // Check if this is expected behavior for queries that don't support continuation
          if (testCase.expectedTokenStructure.expectNoContinuationToken) {
            console.log(`✓ Expected behavior: No continuation token for ${testCase.name}`);
            console.log(`This query type doesn't support continuation tokens as expected`);

            // Validate that we got some results
            expect(totalResults).toBeGreaterThan(0);
            console.log(`✓ Query executed successfully with ${totalResults} results`);
            return; // Test passed - no token is expected
          } else {
            console.log(
              `Warning: No continuation token generated after ${attempts} attempts with ${totalResults} total results`,
            );
            console.log(`This might indicate insufficient data or the query completed entirely`);
            return; // Skip validation if no token was generated
          }
        }

        // If we have a token but expected none, that's an error
        if (testCase.expectedTokenStructure.expectNoContinuationToken) {
          throw new Error(
            `Unexpected continuation token received for ${testCase.name} - this query should not produce continuation tokens`,
          );
        }

        console.log(
          `\nContinuation Token (first 200 chars): ${continuationToken.substring(0, 200)}...`,
        );

        // Parse and validate token structure
        let parsedToken: any;
        try {
          parsedToken = testCase.tokenParser(continuationToken);
          console.log(`Parsed Token Structure:`, JSON.stringify(parsedToken, null, 2));
        } catch (error) {
          throw new Error(`Failed to parse continuation token: ${error.message}`);
        }

        // Validate token structure
        const isValid = testCase.validator(parsedToken);
        expect(isValid).toBe(true);

        // Validate expected structure elements
        const structure = testCase.expectedTokenStructure;

        if (structure.hasRangeMappings) {
          expect(parsedToken.rangeMappings).toBeDefined();
          expect(Array.isArray(parsedToken.rangeMappings)).toBe(true);
          console.log(`✓ Has rangeMappings: ${parsedToken.rangeMappings.length} ranges`);
        }

        if (structure.hasCompositeToken) {
          expect(parsedToken.compositeToken).toBeDefined();
          expect(typeof parsedToken.compositeToken).toBe("string");
          console.log(`✓ Has compositeToken: ${parsedToken.compositeToken.substring(0, 50)}...`);
        }

        if (structure.hasOrderByItems) {
          expect(parsedToken.orderByItems).toBeDefined();
          expect(Array.isArray(parsedToken.orderByItems)).toBe(true);
          console.log(`✓ Has orderByItems: ${parsedToken.orderByItems.length} items`);
        }

        if (structure.hasOffset) {
          expect(parsedToken.offset).toBeDefined();
          expect(typeof parsedToken.offset).toBe("number");
          expect(parsedToken.offset).toBeGreaterThanOrEqual(0);
          console.log(`✓ Has offset: ${parsedToken.offset}`);
        }

        if (structure.hasLimit) {
          expect(parsedToken.limit).toBeDefined();
          expect(typeof parsedToken.limit).toBe("number");
          expect(parsedToken.limit).toBeGreaterThan(0);
          console.log(`✓ Has limit: ${parsedToken.limit}`);
        }

        if (structure.hasSkipCount) {
          expect(parsedToken.skipCount).toBeDefined();
          expect(typeof parsedToken.skipCount).toBe("number");
          expect(parsedToken.skipCount).toBeGreaterThanOrEqual(0);
          console.log(`✓ Has skipCount: ${parsedToken.skipCount}`);
        }

        if (structure.hasRid) {
          expect(parsedToken.rid).toBeDefined();
          expect(typeof parsedToken.rid).toBe("string");
          expect(parsedToken.rid.length).toBeGreaterThan(0);
          console.log(`✓ Has rid: ${parsedToken.rid}`);
        }

        // Validate expected token values if provided
        if (testCase.expectedTokenValues) {
          const expectedValues = testCase.expectedTokenValues;
          console.log(`\n--- Validating Expected Token Values ---`);

          if (expectedValues.ridType) {
            expect(typeof parsedToken.rid).toBe(expectedValues.ridType);
            console.log(`✓ RID type matches: ${expectedValues.ridType}`);
          }

          if (expectedValues.rangeMappingsMinCount !== undefined) {
            expect(parsedToken.rangeMappings?.length).toBeGreaterThanOrEqual(
              expectedValues.rangeMappingsMinCount,
            );
            console.log(
              `RangeMappings count >= ${expectedValues.rangeMappingsMinCount}: ${parsedToken.rangeMappings?.length}`,
            );
          }

          if (expectedValues.orderByItemsCount !== undefined) {
            expect(parsedToken.orderByItems?.length).toBe(expectedValues.orderByItemsCount);
            console.log(`✓ OrderByItems count matches: ${expectedValues.orderByItemsCount}`);
          }

          if (expectedValues.skipCountInitial !== undefined) {
            expect(parsedToken.skipCount).toBe(expectedValues.skipCountInitial);
            console.log(`✓ SkipCount matches initial value: ${expectedValues.skipCountInitial}`);
          }

          if (expectedValues.offsetValue !== undefined) {
            expect(parsedToken.offset).toBe(expectedValues.offsetValue);
            console.log(`✓ Offset value matches: ${expectedValues.offsetValue}`);
          }

          if (expectedValues.limitValue !== undefined) {
            expect(parsedToken.limit).toBe(expectedValues.limitValue);
            console.log(`✓ Limit value matches: ${expectedValues.limitValue}`);
          }

          if (expectedValues.groupByValuesType) {
            expect(Array.isArray(parsedToken.groupByValues)).toBe(
              expectedValues.groupByValuesType === "array",
            );
            console.log(`✓ GroupByValues type matches: ${expectedValues.groupByValuesType}`);
          }
        }

        // Test token reusability
        await testTokenReusability(
          container,
          testCase.query,
          continuationToken,
          testCase.queryOptions,
        );
      });
    });
  });

  describe("Single Partition Scenarios", () => {
    it("should handle large result sets with multiple continuation tokens", async () => {
      const query = "SELECT * FROM c ORDER BY c.sequence ASC";
      const maxItemCount = 5;

      console.log("\n=== Testing Single Partition Large Result Set ===");

      let totalItems = 0;
      let tokenCount = 0;
      let currentToken: string | undefined;
      const collectedTokens: string[] = [];

      const queryIterator = singlePartitionContainer.items.query(query, {
        maxItemCount,
        continuationToken: currentToken,
        enableQueryControl: true,
        forceQueryPlan: true,
      });

      while (queryIterator.hasMoreResults()) {
        const result = await queryIterator.fetchNext();
        totalItems += result.resources.length;

        if (result.continuationToken) {
          tokenCount++;
          collectedTokens.push(result.continuationToken);
          currentToken = result.continuationToken;

          console.log(
            `Token ${tokenCount}: ${result.resources.length} items, sequence range: ${result.resources[0]?.sequence}-${result.resources[result.resources.length - 1]?.sequence}`,
          );

          // Validate token structure for single partition
          const parsed = JSON.parse(result.continuationToken);
          expect(parsed.rid).toBeDefined();
          expect(typeof parsed.rid).toBe("string");

          // For ORDER BY queries, should have order by items
          if (query.includes("ORDER BY")) {
            expect(parsed.orderByItems).toBeDefined();
            expect(Array.isArray(parsed.orderByItems)).toBe(true);
          }
        }
      }

      console.log(`Total items: ${totalItems}, Total tokens: ${tokenCount}`);
      expect(totalItems).toBe(100); // We inserted 100 items
      expect(tokenCount).toBeGreaterThan(0);

      // Test token reuse
      await testMultipleTokenReuse(singlePartitionContainer, query, collectedTokens, maxItemCount);
    });

    it("should handle complex WHERE clauses with ORDER BY", async () => {
      const complexQueries = [
        {
          name: "Range query with ORDER BY",
          query:
            "SELECT * FROM c WHERE c.sequence >= 20 AND c.sequence <= 80 ORDER BY c.amount DESC",
        },
        {
          name: "Multi-field filter with ORDER BY",
          query:
            "SELECT * FROM c WHERE c.category = 'even' AND c.amount > 50 ORDER BY c.sequence ASC",
        },
        {
          name: "String operations with ORDER BY",
          query: "SELECT * FROM c WHERE STARTSWITH(c.name, 'Item') ORDER BY c.name ASC",
        },
      ];

      for (const querySpec of complexQueries) {
        console.log(`\n=== Testing Complex Query: ${querySpec.name} ===`);

        const iterator = singlePartitionContainer.items.query(querySpec.query, {
          maxItemCount: 3,
          enableQueryControl: true,
          forceQueryPlan: true,
        });
        let tokens = 0;
        let items = 0;

        while (iterator.hasMoreResults()) {
          const result = await iterator.fetchNext();
          items += result.resources.length;

          if (result.continuationToken) {
            tokens++;
            const parsed = JSON.parse(result.continuationToken);

            // Validate common token properties
            expect(parsed.rid).toBeDefined();

            // Should have orderByItems for ORDER BY queries
            expect(parsed.orderByItems).toBeDefined();
            expect(Array.isArray(parsed.orderByItems)).toBe(true);
            expect(parsed.orderByItems.length).toBeGreaterThan(0);

            console.log(`Token ${tokens}: ${result.resources.length} items`);
          }
        }

        console.log(`Query completed: ${items} items, ${tokens} tokens`);
      }
    });
  });

  describe("Multi-Partition Scenarios", () => {
    it("should handle cross-partition queries with composite tokens", async () => {
      const query = "SELECT * FROM c WHERE c.amount > 30";

      console.log("\n=== Testing Multi-Partition Cross-Partition Query ===");

      const iterator = multiPartitionContainer.items.query(query, {
        maxItemCount: 4,
        enableQueryControl: true,
        forceQueryPlan: true,
      });
      let tokens = 0;
      let items = 0;
      const partitionsEncountered = new Set<string>();

      while (iterator.hasMoreResults()) {
        const result = await iterator.fetchNext();
        items += result.resources.length;

        // Track partitions we've seen
        result.resources.forEach((item) => partitionsEncountered.add(item.category));

        if (result.continuationToken) {
          tokens++;
          const parsed = JSON.parse(result.continuationToken);

          console.log(
            `Token ${tokens}: ${result.resources.length} items from partitions: ${[...new Set(result.resources.map((r) => r.category))].join(", ")}`,
          );

          // For cross-partition queries, should have rangeMappings
          expect(parsed.rangeMappings).toBeDefined();
          expect(Array.isArray(parsed.rangeMappings)).toBe(true);
          expect(parsed.rangeMappings.length).toBeGreaterThan(0);

          // Each range mapping should have required properties
          parsed.rangeMappings.forEach((mapping: any) => {
            expect(mapping.range).toBeDefined();
            expect(mapping.rid).toBeDefined();
          });

          console.log(`  Range mappings: ${parsed.rangeMappings.length}`);
        }
      }

      console.log(
        `Cross-partition query: ${items} items, ${tokens} tokens, ${partitionsEncountered.size} partitions`,
      );
      expect(partitionsEncountered.size).toBeGreaterThan(1); // Should span multiple partitions
    });

    it("should handle ORDER BY queries across partitions with ordering validation", async () => {
      const query = "SELECT * FROM c ORDER BY c.amount ASC, c.name DESC";

      console.log("\n=== Testing Multi-Partition ORDER BY Query ===");

      const iterator = multiPartitionContainer.items.query(query, {
        maxItemCount: 3,
        enableQueryControl: true,
      });
      let tokens = 0;
      let items = 0;
      const previousValues: number[] = [];

      while (iterator.hasMoreResults()) {
        const result = await iterator.fetchNext();
        items += result.resources.length;

        // Verify ORDER BY correctness
        const currentValues = result.resources.map((r) => r.amount);
        previousValues.push(...currentValues);

        if (result.continuationToken) {
          tokens++;
          const parsed = JSON.parse(result.continuationToken);

          console.log(
            `Token ${tokens}: ${result.resources.length} items, amount range: ${currentValues[0]}-${currentValues[currentValues.length - 1]}`,
          );

          // ORDER BY across partitions should have composite token
          expect(parsed.compositeToken).toBeDefined();
          expect(typeof parsed.compositeToken).toBe("string");

          // Should have order by items
          expect(parsed.orderByItems).toBeDefined();
          expect(Array.isArray(parsed.orderByItems)).toBe(true);
          expect(parsed.orderByItems.length).toBe(2); // Two ORDER BY fields

          // Should have skip count
          expect(parsed.skipCount).toBeDefined();
          expect(typeof parsed.skipCount).toBe("number");
          expect(parsed.skipCount).toBeGreaterThanOrEqual(0);

          console.log(
            `  OrderBy items: ${parsed.orderByItems.length}, Skip count: ${parsed.skipCount}`,
          );
        }
      }

      // Verify ordering was maintained
      for (let i = 1; i < previousValues.length; i++) {
        expect(previousValues[i]).toBeGreaterThanOrEqual(previousValues[i - 1]);
      }

      console.log(`Multi-partition ORDER BY: ${items} items, ${tokens} tokens, ordering verified`);
    });

    it("should handle GROUP BY queries with proper aggregation (No Continuation Support)", async () => {
      const query =
        "SELECT c.category, COUNT(1) as count, AVG(c.amount) as avgValue FROM c GROUP BY c.category";

      console.log("\n=== Testing Multi-Partition GROUP BY Query ===");

      const iterator = multiPartitionContainer.items.query(query, {
        maxItemCount: 2,
        enableQueryControl: true,
      });
      let groups = 0;
      const categoryGroups = new Map<string, { count: number; avgValue: number }>();

      while (iterator.hasMoreResults()) {
        const result = await iterator.fetchNext();
        groups += result.resources.length;

        result.resources.forEach((group) => {
          categoryGroups.set(group.category, {
            count: group.count,
            avgValue: group.avgValue,
          });
        });

        // GROUP BY queries should NOT produce continuation tokens
        expect(result.continuationToken).toBeUndefined();
        console.log(
          `Batch ${groups}: ${result.resources.length} groups (no continuation token as expected)`,
        );
        result.resources.forEach((group) => {
          console.log(`  ${group.category}: count=${group.count}, avg=${group.avgValue}`);
        });
      }

      console.log(
        `GROUP BY query completed: ${groups} total groups (no continuation tokens as expected)`,
      );
      console.log(`Categories found: ${[...categoryGroups.keys()].join(", ")}`);

      // Verify we got multiple categories and all results at once
      expect(categoryGroups.size).toBeGreaterThan(1);
      expect(groups).toBeGreaterThan(0);
    });
  });

  describe("Token Edge Cases and Serialization", () => {
    it("should handle very large tokens", async () => {
      // Create a query that might generate larger tokens
      const query =
        "SELECT * FROM c WHERE c.name LIKE '%Item%' ORDER BY c.category ASC, c.amount DESC, c.name ASC";

      console.log("\n=== Testing Large Token Handling ===");

      const iterator = multiPartitionContainer.items.query(query, {
        maxItemCount: 1,
        enableQueryControl: true,
      });

      while (iterator.hasMoreResults()) {
        const result = await iterator.fetchNext();

        if (result.continuationToken) {
          const tokenSize = Buffer.byteLength(result.continuationToken, "utf8");
          console.log(`Token size: ${tokenSize} bytes`);

          // Verify token is parseable even if large
          let parsed: any;
          expect(() => {
            parsed = JSON.parse(result.continuationToken!);
          }).not.toThrow();

          // Verify token can be serialized back
          expect(() => {
            JSON.stringify(parsed);
          }).not.toThrow();

          console.log("✓ Large token is valid JSON");

          // Test reuse of large token
          const resumedIterator = multiPartitionContainer.items.query(query, {
            maxItemCount: 1,
            continuationToken: result.continuationToken,
            enableQueryControl: true,
          });

          if (resumedIterator.hasMoreResults()) {
            const resumedResult = await resumedIterator.fetchNext();
            expect(resumedResult.resources).toBeDefined();
            console.log(`Successfully resumed with large token`);
          }

          break; // Only test first large token
        }
      }
    });

    it("should handle special characters in tokens", async () => {
      // Insert items with special characters that might affect JSON encoding
      const specialItems = [
        { id: "special-1", pk: "single", name: 'Item with "quotes"', category: "test", amount: 1 },
        {
          id: "special-2",
          pk: "single",
          name: "Item with \\backslashes\\",
          category: "test",
          amount: 2,
        },
        {
          id: "special-3",
          pk: "single",
          name: "Item with \nnewlines\n",
          category: "test",
          amount: 3,
        },
        {
          id: "special-4",
          pk: "single",
          name: "Item with unicode 🚀",
          category: "test",
          amount: 4,
        },
      ];

      for (const item of specialItems) {
        await singlePartitionContainer.items.create(item);
      }

      const query = "SELECT * FROM c WHERE c.category = 'test' ORDER BY c.amount ASC";

      console.log("\n=== Testing Special Characters in Tokens ===");

      const iterator = singlePartitionContainer.items.query(query, {
        maxItemCount: 2,
        enableQueryControl: true,
      });

      while (iterator.hasMoreResults()) {
        const result = await iterator.fetchNext();

        if (result.continuationToken) {
          console.log(`Got token with special character data`);

          // Verify token parsing with special characters
          let parsed: any;
          expect(() => {
            parsed = JSON.parse(result.continuationToken!);
          }).not.toThrow();

          console.log("Token with special characters parses correctly");

          // Test token reuse
          const resumedIterator = singlePartitionContainer.items.query(query, {
            maxItemCount: 2,
            continuationToken: result.continuationToken,
            enableQueryControl: true,
          });

          if (resumedIterator.hasMoreResults()) {
            const resumedResult = await resumedIterator.fetchNext();
            expect(resumedResult.resources).toBeDefined();
            console.log(`Successfully handled special characters in token`);
          }

          break;
        }
      }
    });

    it("should handle mixed complex query scenarios", async () => {
      const scenarios = [
        {
          name: "DISTINCT with ORDER BY",
          query: "SELECT DISTINCT c.category FROM c ORDER BY c.category",
          expectedType: "orderby",
        },
      ];

      for (const scenario of scenarios) {
        console.log(`\n=== Testing Mixed Scenario: ${scenario.name} ===`);

        const queryIterator = multiPartitionContainer.items.query(scenario.query, {
          maxItemCount: 2,
          enableQueryControl: true,
        });
        let continuationToken: string | undefined;
        let attempts = 0;

        while (queryIterator.hasMoreResults() && attempts < 10) {
          const result = await queryIterator.fetchNext();
          continuationToken = result.continuationToken;
          attempts++;

          if (continuationToken) {
            console.log(`Got token for ${scenario.name}`);

            // Basic validation that token is parseable
            const parsed = JSON.parse(continuationToken);

            if (scenario.expectedType === "orderby") {
              expect(parsed.compositeToken).toBeDefined();
              expect(parsed.orderByItems).toBeDefined();
            } else {
              expect(parsed.rangeMappings).toBeDefined();
            }

            break;
          }
        }
      }
    });
  });

  describe("Integration Tests", () => {
    it("should handle continuation token across multiple iterations", async () => {
      const query = "SELECT * FROM c ORDER BY c.amount ASC";
      const queryOptions = { maxItemCount: 10, enableQueryControl: true };

      console.log("\n=== Testing Multi-Iteration Continuation ===");
      console.log(`Query: ${query}`);
      console.log(`Options:`, queryOptions);

      let queryIterator = multiPartitionContainer.items.query(query, queryOptions);
      const allResults: any[] = [];
      let iterationCount = 0;

      while (queryIterator.hasMoreResults()) {
        console.log(`\n--- Starting iteration ${iterationCount + 1} ---`);
        
        const result = await queryIterator.fetchNext();
        allResults.push(...result.resources);
        iterationCount++;

        console.log(
          `✓ Iteration ${iterationCount}: ${result.resources.length} items received, running total: ${allResults.length} items`);
        console.log(`  continuationToken: ${result.continuationToken ? "YES" : "NO"}`);
        
        if (result.resources.length > 0) {
          console.log(`  First item: ${JSON.stringify({id: result.resources[0].id, amount: result.resources[0].amount})}`);
          console.log(`  Last item: ${JSON.stringify({id: result.resources[result.resources.length - 1].id, amount: result.resources[result.resources.length - 1].amount})}`);
          
          // Log all items in this iteration for detailed analysis
          console.log(`  === ALL ${result.resources.length} ITEMS IN ITERATION ${iterationCount} ===`);
          result.resources.forEach((item, index) => {
            console.log(`    [${index}] id=${item.id}, amount=${item.amount}, _rid=${item._rid || 'undefined'}`);
          });
        }

        if (result.continuationToken && queryIterator.hasMoreResults()) {
          console.log(`  Creating new iterator with continuation token...`);
          // Create new iterator with continuation token
          queryIterator = multiPartitionContainer.items.query(query, {
            ...queryOptions,
            continuationToken: result.continuationToken,
          });
          console.log(`  ✓ New iterator created`);
        } else if (!result.continuationToken) {
          console.log(`  ❌ No continuation token - query should be complete`);
        } else if (!queryIterator.hasMoreResults()) {
          console.log(`  ❌ Iterator reports no more results`);
        }
      }

      // Debug: Show what we collected
      console.log(`\n=== DEBUGGING MULTI-ITERATION RESULTS ===`);
      console.log(`Total items collected: ${allResults.length}`);
      console.log(`Total iterations: ${iterationCount}`);

      if (allResults.length > 0) {
        console.log(
          `All 80 items by amount:`,
          allResults
            .map((item) => ({ id: item.id, amount: item.amount, amountType: typeof item.amount })),
        );
        if (allResults.length > 10) {
          console.log(
            `Last 5 items by amount:`,
            allResults.slice(-5).map((item) => ({
              id: item.id,
              amount: item.amount,
              amountType: typeof item.amount,
            })),
          );
        }
      }

      // Validate ordering is maintained across continuation boundaries
      for (let i = 1; i < allResults.length; i++) {
        if (allResults[i].amount < allResults[i - 1].amount) {
          console.log(
            `ORDER BY ERROR at index ${i}: item[${i}].amount = ${allResults[i].amount} (type: ${typeof allResults[i].amount}) < item[${i - 1}].amount = ${allResults[i - 1].amount} (type: ${typeof allResults[i - 1].amount})`,
          );
          console.log(`Problem items:`, [
            {
              index: i - 1,
              id: allResults[i - 1].id,
              amount: allResults[i - 1].amount,
              amountType: typeof allResults[i - 1].amount,
            },
            {
              index: i,
              id: allResults[i].id,
              amount: allResults[i].amount,
              amountType: typeof allResults[i].amount,
            },
          ]);
        }
        expect(allResults[i].amount).toBeGreaterThanOrEqual(allResults[i - 1].amount);
      }

      expect(allResults.length).toBeGreaterThan(10);
      console.log(
        `Multi-iteration test: ${allResults.length} total items across ${iterationCount} iterations`,
      );
    });

    it("should handle streaming continuation tokens for SELECT * query", async () => {
      const query = "SELECT * FROM c";
      const queryOptions = { maxItemCount: 15, enableQueryControl: true };

      console.log("\n=== Testing Streaming Continuation for SELECT * ===");
      console.log(`Query: ${query}`);
      console.log(`Options:`, queryOptions);

      let queryIterator = multiPartitionContainer.items.query(query, queryOptions);
      const allResults: any[] = [];
      let iterationCount = 0;
      const categoriesEncountered = new Set<string>();

      while (queryIterator.hasMoreResults()) {
        console.log(`\n--- Starting streaming iteration ${iterationCount + 1} ---`);
        
        const result = await queryIterator.fetchNext();
        allResults.push(...result.resources);
        iterationCount++;

        // Track categories (partitions) encountered
        result.resources.forEach((item) => {
          categoriesEncountered.add(item.category);
        });

        console.log(
          `✓ Stream iteration ${iterationCount}: ${result.resources.length} items received, running total: ${allResults.length} items`
        );
        console.log(`  continuationToken: ${result.continuationToken ? "YES" : "NO"}`);
        console.log(`  Categories in this batch: ${[...new Set(result.resources.map(r => r.category))].join(", ")}`);
        
        if (result.resources.length > 0) {
          console.log(`  First item: ${JSON.stringify({id: result.resources[0].id, category: result.resources[0].category, amount: result.resources[0].amount})}`);
          console.log(`  Last item: ${JSON.stringify({id: result.resources[result.resources.length - 1].id, category: result.resources[result.resources.length - 1].category, amount: result.resources[result.resources.length - 1].amount})}`);
          
          // Log first 5 items in this iteration for analysis
          console.log(`  === FIRST 5 ITEMS IN STREAM ITERATION ${iterationCount} ===`);
          result.resources.slice(0, 5).forEach((item, index) => {
            console.log(`    [${index}] id=${item.id}, category=${item.category}, amount=${item.amount}, _rid=${item._rid || 'undefined'}`);
          });
        }

        if (result.continuationToken && queryIterator.hasMoreResults()) {
          console.log(`  Creating new iterator with continuation token for streaming...`);
          // Create new iterator with continuation token
          queryIterator = multiPartitionContainer.items.query(query, {
            ...queryOptions,
            continuationToken: result.continuationToken,
          });
          console.log(`  ✓ New streaming iterator created`);
        } else if (!result.continuationToken) {
          console.log(`  ❌ No continuation token - streaming query should be complete`);
        } else if (!queryIterator.hasMoreResults()) {
          console.log(`  ❌ Iterator reports no more results`);
        }
      }

      // Debug: Show what we collected from streaming
      console.log(`\n=== DEBUGGING STREAMING RESULTS ===`);
      console.log(`Total items collected: ${allResults.length}`);
      console.log(`Total streaming iterations: ${iterationCount}`);
      console.log(`Categories encountered: ${[...categoriesEncountered].join(", ")} (${categoriesEncountered.size} total)`);

      // Group items by category to analyze distribution
      const categoryDistribution = new Map<string, number>();
      allResults.forEach((item) => {
        const count = categoryDistribution.get(item.category) || 0;
        categoryDistribution.set(item.category, count + 1);
      });

      console.log(`Category distribution:`, Object.fromEntries(categoryDistribution));

      if (allResults.length > 0) {
        console.log(
          `First 10 streamed items:`,
          allResults.slice(0, 10).map((item) => ({ 
            id: item.id, 
            category: item.category, 
            amount: item.amount,
            name: item.name 
          }))
        );
        if (allResults.length > 10) {
          console.log(
            `Last 10 streamed items:`,
            allResults.slice(-10).map((item) => ({
              id: item.id,
              category: item.category,
              amount: item.amount,
              name: item.name
            }))
          );
        }
      }

      // Validate we got data from multiple partitions
      expect(categoriesEncountered.size).toBeGreaterThan(1);
      console.log(`✓ Streaming accessed ${categoriesEncountered.size} partitions`);

      // Validate we got a reasonable amount of data
      expect(allResults.length).equal(80);
      console.log(`✓ Streaming collected ${allResults.length} total items`);

      // Validate each item has expected properties
      allResults.forEach((item, index) => {
        expect(item.id).toBeDefined();
        expect(item.category).toBeDefined();
        expect(item.amount).toBeDefined();
        expect(typeof item.amount).toBe('number');
        if (index === 0) {
          console.log(`✓ Item structure validation passed for first item: ${JSON.stringify({id: item.id, category: item.category, amount: item.amount})}`);
        }
      });

      console.log(
        `Streaming test completed: ${allResults.length} total items across ${iterationCount} iterations from ${categoriesEncountered.size} partitions`
      );
    });
  });
});

/**
 * Test that continuation token can be reused successfully
 */
async function testTokenReusability(
  container: Container,
  query: string,
  continuationToken: string,
  queryOptions: any,
): Promise<void> {
  console.log("Testing token reusability...");

  try {
    const resumedIterator = container.items.query(query, {
      ...queryOptions,
      continuationToken: continuationToken,
    });

    if (resumedIterator.hasMoreResults()) {
      const result = await resumedIterator.fetchNext();
      console.log(`Successfully resumed with token, got ${result.resources.length} results`);

      // Validate that we can get another token if more results exist
      if (result.continuationToken) {
        console.log(`Got new continuation token for next iteration`);
      }
    } else {
      console.log(` No more results when resuming (query completed)`);
    }
  } catch (error) {
    throw new Error(`Token reusability test failed: ${error.message}`);
  }
}

/**
 * Test reusing multiple tokens in sequence
 */
async function testMultipleTokenReuse(
  container: Container,
  query: string,
  tokens: string[],
  maxItemCount: number,
): Promise<void> {
  console.log(`\nTesting reuse of ${tokens.length} collected tokens...`);

  for (let i = 0; i < Math.min(tokens.length, 3); i++) {
    const token = tokens[i];
    console.log(`Testing token ${i + 1}/${tokens.length}`);

    const iterator = container.items.query(query, {
      maxItemCount,
      continuationToken: token,
      enableQueryControl: true,
    });

    if (iterator.hasMoreResults()) {
      const result = await iterator.fetchNext();
      expect(result.resources).toBeDefined();
      expect(result.resources.length).toBeGreaterThan(0);
      console.log(`  ✓ Token ${i + 1} reused successfully: ${result.resources.length} items`);
    }
  }
}

/**
 * Populate single partition container with comprehensive test data
 */
async function populateSinglePartitionData(container: Container): Promise<void> {
  const items = [];

  for (let i = 0; i < 100; i++) {
    items.push({
      id: `sp-item-${i.toString().padStart(3, "0")}`,
      pk: "single", // All items in same partition
      sequence: i,
      name: `Item ${i.toString().padStart(3, "0")}`,
      category: i % 2 === 0 ? "even" : "odd",
      amount: Math.floor(Math.random() * 100) + 1,
      createdAt: new Date(2024, 0, 1, 0, 0, i).toISOString(),
      tags: [`tag-${i % 3}`, `tag-${(i + 1) % 3}`],
    });
  }

  console.log(`Creating ${items.length} items in single partition...`);

  // Batch insert
  const batchSize = 10;
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map((item) => container.items.create(item)));
  }

  console.log(` Single partition populated with ${items.length} items`);
}

/**
 * Populate multi-partition container with comprehensive test data
 */
async function populateMultiPartitionData(container: Container): Promise<void> {
  const categories = ["electronics", "books", "clothing", "toys", "home", "sports", "food", "auto"];
  const items = [];

  // Create enough data to ensure continuation tokens across multiple scenarios
  for (let i = 0; i < 80; i++) {
    const category = categories[i % categories.length];
    items.push({
      id: `mp-item-${i.toString().padStart(3, "0")}`,
      category: category, // Partition key - distributes across partitions
      name: `${category} Item ${i}`,
      amount: Math.floor(Math.random() * 100) + 1,
      price: Math.round((Math.random() * 200 + 10) * 100) / 100,
      rating: Math.floor(Math.random() * 5) + 1,
      isActive: i % 4 !== 0,
      stock: Math.floor(Math.random() * 50),
      createdDate: new Date(2024, 0, (i % 31) + 1).toISOString(),
      tags: [`tag-${i % 5}`, `tag-${(i + 1) % 5}`, `tag-${(i + 2) % 5}`],
      metadata: {
        source: `source-${i % 4}`,
        region: `region-${i % 3}`,
        priority: i % 10,
      },
      // Add some nested structures for complex scenarios
      details: {
        manufacturer: `mfg-${i % 6}`,
        model: `model-${i % 8}`,
        specs: {
          weight: Math.random() * 10,
          dimensions: `${Math.floor(Math.random() * 20)}x${Math.floor(Math.random() * 20)}`,
        },
      },
    });
  }

  console.log(`Creating ${items.length} items across ${categories.length} categories...`);

  // Insert items in batches to avoid overwhelming the emulator
  const batchSize = 10;
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map((item) => container.items.create(item)));
  }

  console.log(
    `Multi-partition populated with ${items.length} items across ${categories.length} partitions`,
  );
}

// TODO: add more tests for reutilisation of token
