// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BulkOperationType, CosmosClient } from "../../../src/index.js";
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
      skipCountInitial: 1,
      ridType: "string",
      compositeTokenType: "string",
    },
    tokenParser: (token) => JSON.parse(token),
    validator: (parsed) => {
      return (
        parsed.rangeMappings &&
        Array.isArray(parsed.rangeMappings) &&
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
      skipCountInitial: 1,
      ridType: "string",
      compositeTokenType: "string",
    },
    tokenParser: (token) => JSON.parse(token),
    validator: (parsed) => {
      return (
        parsed.rangeMappings &&
        Array.isArray(parsed.rangeMappings) &&
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
      skipCountInitial: 1,
      ridType: "string",
      compositeTokenType: "string",
    },
    tokenParser: (token) => JSON.parse(token),
    validator: (parsed) => {
      return (
        parsed.rangeMappings &&
        Array.isArray(parsed.rangeMappings) &&
        parsed.orderByItems &&
        parsed.orderByItems.length > 0
      );
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
      ridType: "string",
      rangeMappingsMinCount: 1,
    },
    tokenParser: (token) => JSON.parse(token),
    validator: (parsed) => {
      return (
        parsed.rangeMappings &&
        typeof parsed.offset === "number" &&
        typeof parsed.limit === "number" &&
        typeof parsed.rid === "string"
      );
    },
    requiresMultiPartition: false,
    description: "OFFSET LIMIT combination should maintain both offset and limit state",
  },

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
    query: "SELECT DISTINCT VALUE c.category FROM c ORDER BY c.category ASC",
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
      skipCountInitial: 1,
      compositeTokenType: "string",
    },
    tokenParser: (token) => JSON.parse(token),
    validator: (parsed) => {
      return (
        parsed.rangeMappings &&
        parsed.orderByItems &&
        parsed.hashedLastResult &&
        Array.isArray(parsed.orderByItems) &&
        typeof parsed.skipCount === "number"
      );
    },
    requiresMultiPartition: true,
    description: "DISTINCT with ORDER BY should support continuation tokens",
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
      skipCountInitial: 2,
    },
    tokenParser: (token) => JSON.parse(token),
    validator: (parsed) => {
      return (
        parsed.rangeMappings &&
        Array.isArray(parsed.rangeMappings) &&
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
      hasRangeMappings: true,
      hasOrderByItems: true,
      hasSkipCount: true,
      hasRid: true,
    },
    expectedTokenValues: {
      ridType: "string",
      orderByItemsCount: 1,
      skipCountInitial: 1,
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
  let multiPartitionContainer2: Container;

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
    multiPartitionContainer2 = await getTestContainer(
      "multi-partition-test-2",
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
    await populateMultiPartitionData2(multiPartitionContainer2);
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

        const queryIterator = container.items.query(testCase.query, testCase.queryOptions);

        let continuationToken: string | undefined;
        let totalResults = 0;
        let attempts = 0;

        // Execute until we get a continuation token
        // Apply OrderBy pattern for ORDER BY queries (including DISTINCT ORDER BY)
        const isOrderByQuery = testCase.query.toUpperCase().includes("ORDER BY");

        while (queryIterator.hasMoreResults()) {
          let result = await queryIterator.fetchNext();

          // For OrderBy queries, apply the pattern: keep fetching until getting non-empty results
          if (isOrderByQuery) {
            while (queryIterator.hasMoreResults() && result.resources.length === 0) {
              result = await queryIterator.fetchNext();
            }
            if (result.resources.length === 0) {
              break;
            }
          }
          totalResults += result.resources.length;
          continuationToken = result.continuationToken;
          attempts++;
          if (continuationToken) {
            break;
          }
        }
        if (!continuationToken) {
          // Check if this is expected behavior for queries that don't support continuation
          if (testCase.expectedTokenStructure.expectNoContinuationToken) {
            expect(totalResults).toBeGreaterThan(0);
            return;
          } else {
            // fail test
            expect(continuationToken).toBeDefined();
          }
        }
        if (testCase.expectedTokenStructure.expectNoContinuationToken) {
          throw new Error(
            `Unexpected continuation token received for ${testCase.name} - this query should not produce continuation tokens`,
          );
        }

        // Parse and validate token structure
        let parsedToken: any;
        try {
          parsedToken = testCase.tokenParser(continuationToken);
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
        }

        if (structure.hasOrderByItems) {
          expect(parsedToken.orderByItems).toBeDefined();
          expect(Array.isArray(parsedToken.orderByItems)).toBe(true);
        }

        if (structure.hasOffset) {
          expect(parsedToken.offset).toBeDefined();
          expect(typeof parsedToken.offset).toBe("number");
          expect(parsedToken.offset).toBeGreaterThanOrEqual(0);
        }

        if (structure.hasLimit) {
          expect(parsedToken.limit).toBeDefined();
          expect(typeof parsedToken.limit).toBe("number");
          expect(parsedToken.limit).toBeGreaterThan(0);
        }

        if (structure.hasSkipCount) {
          expect(parsedToken.skipCount).toBeDefined();
          expect(typeof parsedToken.skipCount).toBe("number");
          expect(parsedToken.skipCount).toBeGreaterThanOrEqual(0);
        }

        if (structure.hasRid) {
          expect(parsedToken.rid).toBeDefined();
          expect(typeof parsedToken.rid).toBe("string");
          expect(parsedToken.rid.length).toBeGreaterThan(0);
        }

        // Validate expected token values if provided
        if (testCase.expectedTokenValues) {
          const expectedValues = testCase.expectedTokenValues;

          if (expectedValues.ridType) {
            expect(typeof parsedToken.rid).toBe(expectedValues.ridType);
          }

          if (expectedValues.rangeMappingsMinCount !== undefined) {
            expect(parsedToken.rangeMappings?.length).toBeGreaterThanOrEqual(
              expectedValues.rangeMappingsMinCount,
            );
          }

          if (expectedValues.orderByItemsCount !== undefined) {
            expect(parsedToken.orderByItems?.length).toBe(expectedValues.orderByItemsCount);
          }

          if (expectedValues.skipCountInitial !== undefined) {
            expect(parsedToken.skipCount).toBe(expectedValues.skipCountInitial);
          }

          if (expectedValues.offsetValue !== undefined) {
            expect(parsedToken.offset).toBe(expectedValues.offsetValue);
          }

          if (expectedValues.limitValue !== undefined) {
            expect(parsedToken.limit).toBe(expectedValues.limitValue);
          }

          if (expectedValues.groupByValuesType) {
            expect(Array.isArray(parsedToken.groupByValues)).toBe(
              expectedValues.groupByValuesType === "array",
            );
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
          }
        }
      }
    });
  });

  describe("Multi-Partition Scenarios", () => {
    it("should handle cross-partition queries with composite tokens", async () => {
      const query = "SELECT * FROM c WHERE c.amount > 30";

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

          // For cross-partition queries, should have rangeMappings
          expect(parsed.rangeMappings).toBeDefined();
          expect(Array.isArray(parsed.rangeMappings)).toBe(true);
          expect(parsed.rangeMappings.length).toBeGreaterThan(0);
        }
      }
      expect(partitionsEncountered.size).toBeGreaterThan(1); // Should span multiple partitions
    });

    it("should handle ORDER BY queries across partitions with ordering validation", async () => {
      const query = "SELECT * FROM c ORDER BY c.amount ASC, c.name DESC";

      const iterator = multiPartitionContainer.items.query(query, {
        maxItemCount: 3,
        enableQueryControl: true,
      });
      let tokens = 0;
      let items = 0;
      const previousValues: number[] = [];

      // Apply OrderBy pattern
      while (iterator.hasMoreResults()) {
        let result = await iterator.fetchNext();

        // Continue fetching until we get data or no more results
        while (iterator.hasMoreResults() && result.resources.length === 0) {
          result = await iterator.fetchNext();
        }

        if (result.resources.length === 0) {
          break;
        }

        items += result.resources.length;

        // Verify ORDER BY correctness
        const currentValues = result.resources.map((r) => r.amount);
        previousValues.push(...currentValues);

        // Now safely access continuation token after getting data
        const continuationToken = result.continuationToken;
        if (continuationToken) {
          tokens++;
          const parsed = JSON.parse(continuationToken);

          // ORDER BY across partitions should have range mappings
          expect(parsed.rangeMappings).toBeDefined();
          expect(Array.isArray(parsed.rangeMappings)).toBe(true);

          // Should have order by items
          expect(parsed.orderByItems).toBeDefined();
          expect(Array.isArray(parsed.orderByItems)).toBe(true);
          expect(parsed.orderByItems.length).toBe(2); // Two ORDER BY fields

          // Should have skip count
          expect(parsed.skipCount).toBeDefined();
          expect(typeof parsed.skipCount).toBe("number");
          expect(parsed.skipCount).toBeGreaterThanOrEqual(0);
        }
      }

      // Verify ordering was maintained
      for (let i = 1; i < previousValues.length; i++) {
        expect(previousValues[i]).toBeGreaterThanOrEqual(previousValues[i - 1]);
      }
    });

    it("should handle GROUP BY queries with proper aggregation (No Continuation Support)", async () => {
      const query =
        "SELECT c.category, COUNT(1) as count, AVG(c.amount) as avgValue FROM c GROUP BY c.category";

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
        result.resources.forEach((group) => {});
      }

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

      const iterator = multiPartitionContainer.items.query(query, {
        maxItemCount: 1,
        enableQueryControl: true,
      });

      while (iterator.hasMoreResults()) {
        const result = await iterator.fetchNext();

        if (result.continuationToken) {
          // Verify token is parseable even if large
          let parsed: any;
          expect(() => {
            parsed = JSON.parse(result.continuationToken!);
          }).not.toThrow();

          // Verify token can be serialized back
          expect(() => {
            JSON.stringify(parsed);
          }).not.toThrow();

          // Test reuse of large token
          const resumedIterator = multiPartitionContainer.items.query(query, {
            maxItemCount: 1,
            continuationToken: result.continuationToken,
            enableQueryControl: true,
          });

          if (resumedIterator.hasMoreResults()) {
            const resumedResult = await resumedIterator.fetchNext();
            expect(resumedResult.resources).toBeDefined();
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

      const iterator = singlePartitionContainer.items.query(query, {
        maxItemCount: 2,
        enableQueryControl: true,
      });

      while (iterator.hasMoreResults()) {
        const result = await iterator.fetchNext();

        if (result.continuationToken) {
          // Verify token parsing with special characters
          expect(() => {
            JSON.parse(result.continuationToken!);
          }).not.toThrow();

          // Test token reuse
          const resumedIterator = singlePartitionContainer.items.query(query, {
            maxItemCount: 2,
            continuationToken: result.continuationToken,
            enableQueryControl: true,
          });

          if (resumedIterator.hasMoreResults()) {
            const resumedResult = await resumedIterator.fetchNext();
            expect(resumedResult.resources).toBeDefined();
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
        const queryIterator = multiPartitionContainer.items.query(scenario.query, {
          maxItemCount: 2,
          enableQueryControl: true,
        });
        let continuationToken: string | undefined;
        let attempts = 0;

        // Apply OrderBy pattern for DISTINCT ORDER BY queries
        while (queryIterator.hasMoreResults()) {
          let result = await queryIterator.fetchNext();

          // Continue fetching until we get data or no more results
          while (queryIterator.hasMoreResults() && result.resources.length === 0) {
            result = await queryIterator.fetchNext();
          }

          attempts++;

          if (result.resources.length > 0) {
            // Now safely access continuation token after getting data
            continuationToken = result.continuationToken;

            if (continuationToken) {
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
      }
    });
  });

  describe("Integration Tests", () => {
    it("should handle continuation token across multiple iterations", async () => {
      const query = "SELECT * FROM c ORDER BY c.amount ASC";
      const queryOptions = { maxItemCount: 10, enableQueryControl: true };

      let queryIterator = multiPartitionContainer.items.query(query, queryOptions);
      const allResults: any[] = [];
      let iterationCount = 0;

      while (queryIterator.hasMoreResults()) {
        const result = await queryIterator.fetchNext();
        allResults.push(...result.resources);
        iterationCount++;

        if (result.continuationToken && queryIterator.hasMoreResults()) {
          // Create new iterator with continuation token
          queryIterator = multiPartitionContainer.items.query(query, {
            ...queryOptions,
            continuationToken: result.continuationToken,
          });
        }
      }

      // Debug: Show what we collected


      // Validate ordering is maintained across continuation boundaries
      for (let i = 1; i < allResults.length; i++) {
        expect(allResults[i].amount).toBeGreaterThanOrEqual(allResults[i - 1].amount);
      }

      expect(allResults.length).toBeGreaterThan(10);
    });

    it("should handle streaming continuation tokens for SELECT * query", async () => {
      const query = "SELECT * FROM c";
      const queryOptions = { maxItemCount: 15, enableQueryControl: true };

      let queryIterator = multiPartitionContainer.items.query(query, queryOptions);
      const allResults: any[] = [];
      let iterationCount = 0;
      const categoriesEncountered = new Set<string>();

      while (queryIterator.hasMoreResults()) {
        const result = await queryIterator.fetchNext();
        allResults.push(...result.resources);
        iterationCount++;

        // Track categories (partitions) encountered
        result.resources.forEach((item) => {
          categoriesEncountered.add(item.category);
        });

        if (result.continuationToken && queryIterator.hasMoreResults()) {
          // Create new iterator with continuation token
          queryIterator = multiPartitionContainer.items.query(query, {
            ...queryOptions,
            continuationToken: result.continuationToken,
          });
        }
      }

      // Group items by category to analyze distribution
      const categoryDistribution = new Map<string, number>();
      allResults.forEach((item) => {
        const count = categoryDistribution.get(item.category) || 0;
        categoryDistribution.set(item.category, count + 1);
      });

      // Validate we got data from multiple partitions
      expect(categoriesEncountered.size).toBeGreaterThan(1);

      // Validate we got a reasonable amount of data
      expect(allResults.length).equal(80);

      // Validate each item has expected properties
      allResults.forEach((item) => {
        expect(item.id).toBeDefined();
        expect(item.category).toBeDefined();
        expect(item.amount).toBeDefined();
        expect(typeof item.amount).toBe("number");
      });
    });

    it("should handle DISTINCT ORDER BY queries with continuation", async () => {
      const query = "SELECT DISTINCT c.category FROM c ORDER BY c.category ASC";
      const queryOptions = { maxItemCount: 3, enableQueryControl: true };

      let queryIterator = multiPartitionContainer.items.query(query, queryOptions);
      const allResults: any[] = [];
      let iterationCount = 0;

      // Apply OrderBy pattern for DISTINCT ORDER BY queries
      while (queryIterator.hasMoreResults()) {
        let result = await queryIterator.fetchNext();

        // Continue fetching until we get data or no more results
        while (queryIterator.hasMoreResults() && result.resources.length === 0) {
          result = await queryIterator.fetchNext();
        }

        if (result.resources.length === 0) {
          break;
        }

        allResults.push(...result.resources);
        iterationCount++;

        // Now safely access continuation token after getting data
        const continuationToken = result.continuationToken;
        if (!continuationToken) {
          break;
        }
        queryIterator = multiPartitionContainer.items.query(query, {
          ...queryOptions,
          continuationToken: continuationToken,
        });
      }

      // Validate distinctness and ordering
      const categories = allResults.map((r) => r.category);
      const uniqueCategories = [...new Set(categories)];
      expect(categories).toEqual(uniqueCategories); // No duplicates
      expect(categories).toEqual([...categories].sort()); // Ordered
    });

    it("should handle OFFSET LIMIT queries with continuation", async () => {
      const query = "SELECT * FROM c ORDER BY c.amount ASC OFFSET 10 LIMIT 20";
      const queryOptions = { maxItemCount: 8, enableQueryControl: true };
      let queryIterator = multiPartitionContainer.items.query(query, queryOptions);
      const allResults: any[] = [];
      let iterationCount = 0;
      while (queryIterator.hasMoreResults()) {
        const result = await queryIterator.fetchNext();
        allResults.push(...result.resources);
        iterationCount++;
        if (result.continuationToken && queryIterator.hasMoreResults()) {
          queryIterator = multiPartitionContainer.items.query(query, {
            ...queryOptions,
            continuationToken: result.continuationToken,
          });
        }
      }
      // Validate LIMIT constraint
      expect(allResults.length).toBeLessThanOrEqual(20);
    });

    it("should handle OFFSET LIMIT queries where offset > maxItemCount with continuation", async () => {
      // Test scenario where offset (25) is greater than maxItemCount (5)
      // This tests the continuation token logic when we need to skip more items than we fetch per page
      const query = "SELECT * FROM c ORDER BY c.amount ASC OFFSET 25 LIMIT 10";
      const queryOptions = { maxItemCount: 5, enableQueryControl: true };

      let queryIterator = multiPartitionContainer.items.query(query, queryOptions);
      const allResults: any[] = [];
      let iterationCount = 0;
      let totalItemsProcessed = 0;

      while (queryIterator.hasMoreResults()) {
        const result = await queryIterator.fetchNext();
        const itemsInThisPage = result.resources.length;
        allResults.push(...result.resources);
        totalItemsProcessed += itemsInThisPage;
        iterationCount++;

        // Log the continuation token structure for debugging
        if (result.continuationToken) {
          try {
            const parsedToken = JSON.parse(result.continuationToken);
          } catch (e) {}
        }

        if (result.continuationToken && queryIterator.hasMoreResults()) {
          queryIterator = multiPartitionContainer.items.query(query, {
            ...queryOptions,
            continuationToken: result.continuationToken,
          });
        }
      }

      // Validate results
      expect(allResults.length).equal(10); // Should not exceed LIMIT
      // expect(allResults.length).toBeGreaterThan(0); // Should have some results after skipping 25

      // Validate ordering (ASC by amount)
      for (let i = 1; i < allResults.length; i++) {
        expect(allResults[i].amount).toBeGreaterThanOrEqual(allResults[i - 1].amount);
      }
    });

    it("should handle TOP queries with continuation", async () => {
      const query = "SELECT TOP 15 * FROM c ORDER BY c.amount DESC";
      const queryOptions = { maxItemCount: 5, enableQueryControl: true };
      let queryIterator = multiPartitionContainer.items.query(query, queryOptions);
      const allResults: any[] = [];
      let iterationCount = 0;
      while (queryIterator.hasMoreResults()) {
        const result = await queryIterator.fetchNext();
        allResults.push(...result.resources);
        iterationCount++;
        if (result.continuationToken && queryIterator.hasMoreResults()) {
          queryIterator = multiPartitionContainer.items.query(query, {
            ...queryOptions,
            continuationToken: result.continuationToken,
          });
        }
      }
      // Validate TOP constraint and DESC ordering
      expect(allResults.length).toBeLessThanOrEqual(15);
      for (let i = 1; i < allResults.length; i++) {
        expect(allResults[i].amount).toBeLessThanOrEqual(allResults[i - 1].amount);
      }
    });
    it("should handle parallel queries (no ORDER BY) with continuation", async () => {
      const query = "SELECT * FROM c WHERE c.amount > 50";
      const queryOptions = { maxItemCount: 6, enableQueryControl: true };
      let queryIterator = multiPartitionContainer.items.query(query, queryOptions);
      const allResults: any[] = [];
      let iterationCount = 0;
      const partitionsEncountered = new Set<string>();
      while (queryIterator.hasMoreResults()) {
        const result = await queryIterator.fetchNext();
        allResults.push(...result.resources);
        iterationCount++;
        result.resources.forEach((item) => partitionsEncountered.add(item.category));
        if (result.continuationToken && queryIterator.hasMoreResults()) {
          queryIterator = multiPartitionContainer.items.query(query, {
            ...queryOptions,
            continuationToken: result.continuationToken,
          });
        }
      }
      // Validate parallel execution across partitions
      expect(partitionsEncountered.size).toBeGreaterThan(1);
      allResults.forEach((item) => expect(item.amount).toBeGreaterThan(50));
    });
    it("should handle complex ORDER BY with multiple fields and continuation", async () => {
      const query = "SELECT * FROM c ORDER BY c.category ASC, c.amount DESC, c.name ASC";
      const queryOptions = { maxItemCount: 4, enableQueryControl: true };
      let queryIterator = multiPartitionContainer.items.query(query, queryOptions);
      const allResults: any[] = [];
      let iterationCount = 0;
      while (queryIterator.hasMoreResults()) {
        const result = await queryIterator.fetchNext();
        allResults.push(...result.resources);
        iterationCount++;
        if (result.continuationToken && queryIterator.hasMoreResults()) {
          queryIterator = multiPartitionContainer.items.query(query, {
            ...queryOptions,
            continuationToken: result.continuationToken,
          });
        }
      }
      // Validate complex ordering (category ASC, amount DESC, name ASC)
      for (let i = 1; i < allResults.length; i++) {
        const curr = allResults[i];
        const prev = allResults[i - 1];
        if (curr.category === prev.category) {
          if (curr.amount === prev.amount) {
            expect(curr.name >= prev.name).toBe(true); // name ASC
          } else {
            expect(curr.amount <= prev.amount).toBe(true); // amount DESC
          }
        } else {
          expect(curr.category >= prev.category).toBe(true); // category ASC
        }
      }
    });
    it("should handle JOIN with ORDER BY queries and maintain proper continuation", async () => {
      const query =
        "SELECT c.id, c.name, c.category, t.tag as tagValue FROM c JOIN t IN c.tags ORDER BY c.id";
      const queryOptions = { maxItemCount: 20, enableQueryControl: true };
      let queryIterator = multiPartitionContainer.items.query(query, queryOptions);
      const allResults: any[] = [];
      let iterationCount = 0;
      let totalTokens = 0;
      const seenCombinations = new Set<string>();
      while (queryIterator.hasMoreResults()) {
        const result = await queryIterator.fetchNext();
        allResults.push(...result.resources);
        iterationCount++;
        if (result.resources.length > 0) {
          result.resources.forEach((item) => {
            const combo = `${item.id}-${item.tagValue}`;
            seenCombinations.add(combo);
          });
          // Verify ORDER BY correctness for JOIN results
          for (let i = 1; i < result.resources.length; i++) {
            const current = result.resources[i];
            const previous = result.resources[i - 1];
            // Skip validation if either item doesn't have an id
            if (!current.id || !previous.id) {
              continue;
            }
            // Check ordering: first by c.id, then by t.tag
            const idComparison = current.id.localeCompare(previous.id);
            if (idComparison < 0) {
              throw new Error(
                `JOIN ORDER BY violation: ${current.id} should come after ${previous.id}`,
              );
            }
          }
        }
        if (result.continuationToken) {
          totalTokens++;
          // Parse and validate the continuation token structure
          try {
            const parsedToken = JSON.parse(result.continuationToken);
            // Validate expected structure for JOIN ORDER BY
            expect(parsedToken.rangeMappings).toBeDefined();
            expect(Array.isArray(parsedToken.rangeMappings)).toBe(true);
            expect(parsedToken.orderByItems).toBeDefined();
            expect(Array.isArray(parsedToken.orderByItems)).toBe(true);
            expect(typeof parsedToken.skipCount).toBe("number");
            expect(parsedToken.rid).toBeDefined();
            // Test token reusability
            await testTokenReusability(
              multiPartitionContainer,
              query,
              result.continuationToken,
              queryOptions,
            );
          } catch (parseError) {
            console.error(`  ❌ Token parsing failed:`, parseError);
            throw parseError;
          }
          // Create new iterator with the continuation token
          queryIterator = multiPartitionContainer.items.query(query, {
            ...queryOptions,
            continuationToken: result.continuationToken,
          });
        }
      }
      // Validate that we got JOIN results (should be more than single container items)
      expect(allResults.length).toBeGreaterThan(0);
      // Validate that each result has the expected JOIN structure
      allResults.forEach((item) => {
        expect(item.id).toBeDefined();
      });
      // Validate final ordering across all results
      for (let i = 1; i < allResults.length; i++) {
        const current = allResults[i];
        const previous = allResults[i - 1];
        // Skip validation if either item doesn't have an id
        if (!current.id || !previous.id) {
          continue;
        }
        const idComparison = current.id.localeCompare(previous.id);
        if (idComparison < 0) {
          throw new Error(
            `Final ORDER BY violation at index ${i}: ${current.id} should come after ${previous.id}`,
          );
        }
      }
    });
  });

  describe("Final Integration Tests", () => {
    it("should handle continuation token across multiple iterations using proper OrderBy pattern", async () => {
      const query = "SELECT * FROM c ORDER BY c.amount ASC";
      const queryOptions = { maxItemCount: 30, enableQueryControl: true };

      let queryIterator = multiPartitionContainer2.items.query(query, queryOptions);
      const allResults: any[] = [];
      let iterationCount = 0;

      // OrderBy Pattern: Keep calling hasMoreResults() and fetchNext() until getting non-empty results
      while (queryIterator.hasMoreResults()) {
        let response = await queryIterator.fetchNext();

        // Continue fetching until we get data or no more results
        while (queryIterator.hasMoreResults() && response.resources.length === 0) {
          response = await queryIterator.fetchNext();
        }

        if (response.resources.length === 0) {
          break;
        }

        allResults.push(...response.resources);
        iterationCount++;

        // Now safely access continuation token after getting data
        const continuationToken = response.continuationToken;
        if (!continuationToken) {
          break;
        }

        // Create new iterator with continuation token
        queryIterator = multiPartitionContainer2.items.query(query, {
          ...queryOptions,
          continuationToken: continuationToken,
        });
      }

      // Validate results: Check duplicates
      const seenIds = new Set<string>();
      const duplicateCount = allResults.filter((item) => {
        if (seenIds.has(item.id)) return true;
        seenIds.add(item.id);
        return false;
      }).length;
      expect(duplicateCount).toBe(0); // No duplicates allowed

      // Validate ordering across continuation boundaries
      for (let i = 1; i < allResults.length; i++) {
        expect(allResults[i].amount).toBeGreaterThanOrEqual(allResults[i - 1].amount);
      }

      expect(allResults.length).toBe(25000);
    });

    it("should handle SELECT * FROM c query with comprehensive ID validation", async () => {
      const query = "SELECT * FROM c";
      const queryOptions = {
        maxItemCount: 100,
        enableQueryControl: true,
        maxDegreeOfParallelism: 2,
      };

      let queryIterator = multiPartitionContainer2.items.query(query, queryOptions);
      const allResults: any[] = [];
      const seenIds = new Set<string>();
      const categoryCounts = new Map<string, number>();
      let iterationCount = 0;
      let duplicateCount = 0;

      // Collect all results using continuation tokens
      while (queryIterator.hasMoreResults()) {
        const response = await queryIterator.fetchNext();
        iterationCount++;

        // Process each item in this batch
        for (const item of response.resources) {
          // Check for duplicates
          if (seenIds.has(item.id)) {
            duplicateCount++;
            console.error(`DUPLICATE FOUND: ${item.id} (duplicate #${duplicateCount})`);
          } else {
            seenIds.add(item.id);
          }

          // Track category distribution
          const count = categoryCounts.get(item.category) || 0;
          categoryCounts.set(item.category, count + 1);

          allResults.push(item);
        }

        // Continue with next batch if we have a continuation token
        if (response.continuationToken && queryIterator.hasMoreResults()) {
          queryIterator = multiPartitionContainer2.items.query(query, {
            ...queryOptions,
            continuationToken: response.continuationToken,
          });
        }
      }

      // Comprehensive validations
      expect(duplicateCount).toBe(0);
      expect(allResults.length).toBe(25000);
      expect(seenIds.size).toBe(25000);

      // Validate we got all expected IDs (mp-item-000 to mp-item-24999)
      const expectedIds = new Set<string>();
      for (let i = 0; i < 25000; i++) {
        expectedIds.add(`mp-item-${i.toString().padStart(3, "0")}`);
      }

      const missingIds: string[] = [];
      const unexpectedIds: string[] = [];

      // Check for missing IDs
      for (const expectedId of expectedIds) {
        if (!seenIds.has(expectedId)) {
          missingIds.push(expectedId);
        }
      }

      // Check for unexpected IDs
      for (const seenId of seenIds) {
        if (!expectedIds.has(seenId)) {
          unexpectedIds.push(seenId);
        }
      }

      if (missingIds.length > 0) {
        console.error(`Missing IDs (${missingIds.length}):`, missingIds.slice(0, 10));
      }
      if (unexpectedIds.length > 0) {
        console.error(`Unexpected IDs (${unexpectedIds.length}):`, unexpectedIds.slice(0, 10));
      }

      expect(missingIds.length).toBe(0);
      expect(unexpectedIds.length).toBe(0);

      // Validate each category has the expected count (25000 / 8 categories = ~3125 each)
      const expectedCategoryCounts = 25000 / 8; // 8 categories total
      for (const [category, count] of categoryCounts) {
        expect(count).toBeCloseTo(expectedCategoryCounts, -2); // Within 100 items tolerance
      }
    });

    it("should handle SELECT * with low maxDegreeOfParallelism multiple times", async () => {
      const query = "SELECT * FROM c";

      const queryOptions = {
        maxDegreeOfParallelism: 5,
        enableQueryControl: true,
      };

      let queryIterator = multiPartitionContainer2.items.query(query, queryOptions);
      const collectedIds = new Set<string>();
      const rangeMappingsSizes: number[] = [];
      let iterationCount = 0;
      let totalContinuationTokens = 0;

      while (queryIterator.hasMoreResults()) {
        const response = await queryIterator.fetchNext();
        iterationCount++;

        // Collect IDs from this batch
        for (const item of response.resources) {
          if (collectedIds.has(item.id)) {
            throw new Error(`Duplicate ID found in test run : ${item.id}`);
          }
          collectedIds.add(item.id);
        }

        if (response.continuationToken) {
          totalContinuationTokens++;

          // Parse continuation token to analyze rangeMappings
          try {
            const parsedToken = JSON.parse(response.continuationToken);
            if (parsedToken.rangeMappings && Array.isArray(parsedToken.rangeMappings)) {
              rangeMappingsSizes.push(parsedToken.rangeMappings.length);
            }
          } catch (parseError) {
            console.error(`    Failed to parse continuation token:`, parseError);
          }

          // Create new iterator with continuation token
          queryOptions.maxDegreeOfParallelism = 2;
          if (queryIterator.hasMoreResults() && response.continuationToken) {
            queryIterator = multiPartitionContainer2.items.query(query, {
              ...queryOptions,
              continuationToken: response.continuationToken,
            });
          }
        }
      }

      // Validate this test run
      expect(collectedIds.size).toBe(25000);
      expect(totalContinuationTokens).toBeGreaterThan(0);
      expect(iterationCount).toBeGreaterThan(1);
    });

    it("should handle fuzzy SELECT * query with random continuation token usage patterns", async () => {
      const query = "SELECT * FROM c";
      const queryOptions = {
        maxItemCount: 150,
        enableQueryControl: true,
        maxDegreeOfParallelism: 3,
      };

      let currentQueryIterator = multiPartitionContainer2.items.query(query, queryOptions);
      const allCollectedIds = new Set<string>();
      const allCollectedItems: any[] = [];
      const tokenHistory: { token: string; position: number }[] = [];
      let totalIterations = 0;
      let totalTokens = 0;
      let sessionCount = 0;

      while (currentQueryIterator.hasMoreResults()) {
        sessionCount++;

        // Random number of fetchNext calls (2-4 times)
        const fetchCount = Math.floor(Math.random() * 3) + 2; // 2-4 fetches

        let sessionItems = 0;
        let sessionToken: string | undefined;

        for (
          let fetchIndex = 0;
          fetchIndex < fetchCount && currentQueryIterator.hasMoreResults();
          fetchIndex++
        ) {
          totalIterations++;
          const response = await currentQueryIterator.fetchNext();

          // Collect items and check for duplicates
          for (const item of response.resources) {
            if (allCollectedIds.has(item.id)) {
              throw new Error(
                `DUPLICATE ID DETECTED: ${item.id} in session ${sessionCount}, fetch ${fetchIndex + 1}`,
              );
            }
            allCollectedIds.add(item.id);
            allCollectedItems.push(item);
            sessionItems++;
          }

          // Store the latest continuation token
          if (response.continuationToken) {
            sessionToken = response.continuationToken;
          }
        }

        // If we have a continuation token, create a new iterator
        if (sessionToken && currentQueryIterator.hasMoreResults()) {
          totalTokens++;

          // Store token history for debugging
          tokenHistory.push({
            token: sessionToken.substring(0, 50),
            position: allCollectedIds.size,
          });

          // Vary query options slightly for fuzzing
          const fuzzedOptions = {
            ...queryOptions,
            maxItemCount: Math.floor(Math.random() * 100) + 50, // 50-149
            continuationToken: sessionToken,
          };

          currentQueryIterator = multiPartitionContainer2.items.query(query, fuzzedOptions);
        } else {
          break;
        }

        // Safety check to prevent infinite loops in tests
        // if (sessionCount > 50) {
        //   console.warn(`Safety break: Reached maximum session count (50)`);
        //   break;
        // }
      }

      // Comprehensive validation

      // 1. Check for duplicates in the collected items array
      const duplicatesInArray = allCollectedItems.length - allCollectedIds.size;
      expect(duplicatesInArray).toBe(0);

      // 2. Verify we got all 25000 items
      expect(allCollectedIds.size).toBe(25000);

      // 3. Verify all expected IDs are present
      const missingIds: string[] = [];
      const unexpectedIds: string[] = [];

      for (let i = 0; i < 25000; i++) {
        const expectedId = `mp-item-${i.toString().padStart(3, "0")}`;
        if (!allCollectedIds.has(expectedId)) {
          missingIds.push(expectedId);
        }
      }

      for (const collectedId of allCollectedIds) {
        const idPattern = /^mp-item-(\d+)$/;
        const match = collectedId.match(idPattern);
        if (!match) {
          unexpectedIds.push(collectedId);
          continue;
        }

        const itemNumber = parseInt(match[1], 10);
        if (itemNumber < 0 || itemNumber >= 25000) {
          unexpectedIds.push(collectedId);
        }
      }

      if (missingIds.length > 0) {
        console.error(`First 10 missing IDs:`, missingIds.slice(0, 10));
      }
      if (unexpectedIds.length > 0) {
        console.error(`First 10 unexpected IDs:`, unexpectedIds.slice(0, 10));
      }

      expect(missingIds.length).toBe(0);
      expect(unexpectedIds.length).toBe(0);

      // 4. Verify category distribution
      const categoryDistribution = new Map<string, number>();
      for (const item of allCollectedItems) {
        const count = categoryDistribution.get(item.category) || 0;
        categoryDistribution.set(item.category, count + 1);
      }

      // Should have 8 categories with roughly equal distribution
      expect(categoryDistribution.size).toBe(8);
      const expectedPerCategory = 25000 / 8; // ~3125
      for (const [_category, count] of categoryDistribution) {
        expect(count).toBeGreaterThan(expectedPerCategory * 0.8); // Allow 20% variance
        expect(count).toBeLessThan(expectedPerCategory * 1.2);
      }
    });

    it("should handle fuzzy ORDER BY query with random continuation token usage patterns", async () => {
      const query = "SELECT * FROM c ORDER BY c.amount ASC";
      const queryOptions = {
        maxItemCount: 100,
        enableQueryControl: true,
        maxDegreeOfParallelism: 3,
      };

      let currentQueryIterator = multiPartitionContainer2.items.query(query, queryOptions);
      const allCollectedIds = new Set<string>();
      const allCollectedItems: any[] = [];
      const tokenHistory: { token: string; position: number; lastAmount?: number }[] = [];
      let totalIterations = 0;
      let totalTokens = 0;
      let sessionCount = 0;

      while (currentQueryIterator.hasMoreResults()) {
        sessionCount++;

        // Random number of fetchNext calls (2-5 times)
        const fetchCount = Math.floor(Math.random() * 4) + 2; // 2-5 fetches

        let sessionItems = 0;
        let sessionToken: string | undefined;
        let lastAmountInSession: number | undefined;

        for (
          let fetchIndex = 0;
          fetchIndex < fetchCount && currentQueryIterator.hasMoreResults();
          fetchIndex++
        ) {
          totalIterations++;

          // Apply ORDER BY pattern: keep fetching until getting non-empty results
          let response = await currentQueryIterator.fetchNext();
          while (currentQueryIterator.hasMoreResults() && response.resources.length === 0) {
            response = await currentQueryIterator.fetchNext();
          }

          if (response.resources.length === 0) {
            break;
          }

          // Collect items and check for duplicates and ordering
          for (const item of response.resources) {
            if (allCollectedIds.has(item.id)) {
              throw new Error(
                `DUPLICATE ID DETECTED: ${item.id} in session ${sessionCount}, fetch ${fetchIndex + 1}`,
              );
            }

            // Validate ORDER BY correctness across all items
            if (allCollectedItems.length > 0) {
              const previousItem = allCollectedItems[allCollectedItems.length - 1];
              if (item.amount < previousItem.amount) {
                throw new Error(
                  `ORDER BY VIOLATION: amount ${item.amount} < ${previousItem.amount} at position ${allCollectedItems.length + 1}`,
                );
              }
            }

            allCollectedIds.add(item.id);
            allCollectedItems.push(item);
            sessionItems++;
            lastAmountInSession = item.amount;
          }

          // Store the latest continuation token
          if (response.continuationToken) {
            sessionToken = response.continuationToken;
          }
        }
        

        // If we have a continuation token, create a new iterator
        if (sessionToken && currentQueryIterator.hasMoreResults()) {
          totalTokens++;

          // Store token history for debugging
          tokenHistory.push({
            token: sessionToken.substring(0, 50),
            position: allCollectedIds.size,
            lastAmount: lastAmountInSession,
          });

          // Parse token to validate ORDER BY structure
          try {
            const parsedToken = JSON.parse(sessionToken);
            if (parsedToken.orderByItems && parsedToken.orderByItems.length > 0) {
            }
            if (parsedToken.rangeMappings) {
            }
          } catch (parseError) {
            console.error(`  Failed to parse ORDER BY token:`, parseError);
          }

          // Vary query options slightly for fuzzing
          const fuzzedOptions = {
            ...queryOptions,
            maxItemCount: Math.floor(Math.random() * 80) + 30, // 30-109
            continuationToken: sessionToken,
          };

          currentQueryIterator = multiPartitionContainer2.items.query(query, fuzzedOptions);
        } else {
      
          break;
        }
      }

      // Comprehensive validation

      // 1. Check for duplicates in the collected items array
      const duplicatesInArray = allCollectedItems.length - allCollectedIds.size;
      expect(duplicatesInArray).toBe(0);

      // 2. Verify we got all 25000 items
      expect(allCollectedIds.size).toBe(25000);

      // 3. Verify complete ORDER BY correctness across all items
      for (let i = 1; i < allCollectedItems.length; i++) {
        const current = allCollectedItems[i];
        const previous = allCollectedItems[i - 1];

        // Primary ordering: amount ASC
        if (current.amount < previous.amount) {
          throw new Error(
            `ORDER BY VIOLATION at index ${i}: amount ${current.amount} < ${previous.amount}`,
          );
        }
      }

      // 4. Verify all expected IDs are present
      const missingIds: string[] = [];
      const unexpectedIds: string[] = [];

      for (let i = 0; i < 25000; i++) {
        const expectedId = `mp-item-${i.toString().padStart(3, "0")}`;
        if (!allCollectedIds.has(expectedId)) {
          missingIds.push(expectedId);
        }
      }

      for (const collectedId of allCollectedIds) {
        const idPattern = /^mp-item-(\d+)$/;
        const match = collectedId.match(idPattern);
        if (!match) {
          unexpectedIds.push(collectedId);
          continue;
        }

        const itemNumber = parseInt(match[1], 10);
        if (itemNumber < 0 || itemNumber >= 25000) {
          unexpectedIds.push(collectedId);
        }
      }

      if (missingIds.length > 0) {
        console.error(`First 10 missing IDs:`, missingIds.slice(0, 10));
      }
      if (unexpectedIds.length > 0) {
        console.error(`First 10 unexpected IDs:`, unexpectedIds.slice(0, 10));
      }

      expect(missingIds.length).toBe(0);
      expect(unexpectedIds.length).toBe(0);

      // 5. Verify category distribution
      const categoryDistribution = new Map<string, number>();
      for (const item of allCollectedItems) {
        const count = categoryDistribution.get(item.category) || 0;
        categoryDistribution.set(item.category, count + 1);
      }

      // Should have 8 categories with roughly equal distribution
      expect(categoryDistribution.size).toBe(8);
      const expectedPerCategory = 25000 / 8; // ~3125
      for (const [_category, count] of categoryDistribution) {
        expect(count).toBeGreaterThan(expectedPerCategory * 0.8); // Allow 20% variance
        expect(count).toBeLessThan(expectedPerCategory * 1.2);
      }

      // 6. Validate amount distribution makes sense
      const amountStats = {
        min: Math.min(...allCollectedItems.map((item) => item.amount)),
        max: Math.max(...allCollectedItems.map((item) => item.amount)),
        first10: allCollectedItems
          .slice(0, 10)
          .map((item) => ({ id: item.id, amount: item.amount, category: item.category })),
        last10: allCollectedItems
          .slice(-10)
          .map((item) => ({ id: item.id, amount: item.amount, category: item.category })),
      };
      expect(amountStats.min).toBeGreaterThanOrEqual(1);
      expect(amountStats.max).toBeLessThanOrEqual(100);
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
    try {
      const resumedIterator = container.items.query(query, {
        ...queryOptions,
        continuationToken: continuationToken,
      });

      if (resumedIterator.hasMoreResults()) {
        const result = await resumedIterator.fetchNext();
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
    for (let i = 0; i < Math.min(tokens.length, 3); i++) {
      const token = tokens[i];

      const iterator = container.items.query(query, {
        maxItemCount,
        continuationToken: token,
        enableQueryControl: true,
      });

      if (iterator.hasMoreResults()) {
        const result = await iterator.fetchNext();
        expect(result.resources).toBeDefined();
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

    // Batch insert
    const batchSize = 10;
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      await Promise.all(batch.map((item) => container.items.create(item)));
    }
  }

  /**
   * Populate multi-partition container with comprehensive test data
   */
  async function populateMultiPartitionData(container: Container): Promise<void> {
    const categories = [
      "electronics",
      "books",
      "clothing",
      "toys",
      "home",
      "sports",
      "food",
      "auto",
    ];
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

    // Insert items in batches to avoid overwhelming the emulator
    const batchSize = 10;
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      await Promise.all(batch.map((item) => container.items.create(item)));
    }
  }

  async function populateMultiPartitionData2(container: Container): Promise<void> {
    const categories = [
      "electronics",
      "books",
      "clothing",
      "toys",
      "home",
      "sports",
      "food",
      "auto",
    ];
    const items = [];

    // Create enough data to ensure continuation tokens across multiple scenarios
    for (let i = 0; i < 25000; i++) {
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

    const operations = items.map((item) => ({
      operationType: BulkOperationType.Create,
      partitionKey: item.category,
      resourceBody: item,
    }));
    const bulkResponse = await container.items.executeBulkOperations(operations);
    const successCount = bulkResponse.filter((result) => result.response).length;
  }
});
