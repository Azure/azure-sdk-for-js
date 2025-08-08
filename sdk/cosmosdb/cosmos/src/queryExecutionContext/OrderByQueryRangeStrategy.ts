// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../index.js";
import type {
  TargetPartitionRangeStrategy,
  PartitionRangeFilterResult,
} from "./TargetPartitionRangeStrategy.js";
import { OrderByQueryContinuationToken } from "../documents/ContinuationToken/OrderByQueryContinuationToken.js";
import { CompositeQueryContinuationToken } from "./QueryRangeMapping.js";

/**
 * Strategy for filtering partition ranges in ORDER BY query execution context
 * Supports resuming from ORDER BY continuation tokens with sequential processing
 * @hidden
 */
export class OrderByQueryRangeStrategy implements TargetPartitionRangeStrategy {
  getStrategyType(): string {
    return "OrderByQuery";
  }

  validateContinuationToken(continuationToken: string): boolean {
    try {
      const parsed = JSON.parse(continuationToken);
      // Check if it's an ORDER BY continuation token (has compositeToken and orderByItems)
      return (
        parsed && typeof parsed.compositeToken === "string" && Array.isArray(parsed.orderByItems)
      );
    } catch {
      return false;
    }
  }

  async filterPartitionRanges(
    targetRanges: PartitionKeyRange[],
    continuationToken?: string,
    queryInfo?: Record<string, unknown>,
  ): Promise<PartitionRangeFilterResult> {
    console.log("=== OrderByQueryRangeStrategy.filterPartitionRanges START ===");
    console.log(
      `Input ranges: ${targetRanges.length}, Continuation token: ${continuationToken ? "Present" : "None"}`,
    );

    // create a PartitionRangeFilterResult object empty
    const result: PartitionRangeFilterResult = {
      filteredRanges: [],
      continuationToken: [],
      filteringConditions: [],
    };

    // If no continuation token, return all ranges for initial query
    if (!continuationToken) {
      console.log("No continuation token - returning all ranges for ORDER BY query");
      return {
        filteredRanges: targetRanges,
      };
    }

    // Validate and parse ORDER BY continuation token
    if (!this.validateContinuationToken(continuationToken)) {
      throw new Error(
        `Invalid continuation token format for ORDER BY query strategy: ${continuationToken}`,
      );
    }

    let orderByToken: OrderByQueryContinuationToken;
    try {
      const parsed = JSON.parse(continuationToken);
      orderByToken = new OrderByQueryContinuationToken(
        parsed.compositeToken,
        parsed.orderByItems || [],
        parsed.rid || "",
        parsed.skipCount || 0,
      );
    } catch (error) {
      throw new Error(`Failed to parse ORDER BY continuation token: ${error.message}`);
    }

    console.log(
      `Parsed ORDER BY continuation token with ${orderByToken.orderByItems.length} order by items`,
    );
    console.log(`Skip count: ${orderByToken.skipCount}, RID: ${orderByToken.rid}`);

    // Parse the inner composite token to understand which ranges to resume from
    let compositeContinuationToken: CompositeQueryContinuationToken | null = null;

    if (orderByToken.compositeToken) {
      try {
        compositeContinuationToken = CompositeQueryContinuationToken.fromString(
          orderByToken.compositeToken,
        );
        console.log(
          `Inner composite token has ${compositeContinuationToken.rangeMappings.length} range mappings`,
        );
      } catch (error) {
        console.warn(`Could not parse inner composite token: ${error.message}`);
      }
    }

    let filteredRanges: PartitionKeyRange[] = [];
    let resumeRangeFound = false;

    if (compositeContinuationToken && compositeContinuationToken.rangeMappings.length > 0) {
      resumeRangeFound = true;
      // Find the range to resume from based on the composite token
      const targetRangeMapping =
        compositeContinuationToken.rangeMappings[
          compositeContinuationToken.rangeMappings.length - 1
        ].partitionKeyRange;
      // TODO: fix the zero
      const targetRange = targetRanges.filter(
        (mapping) =>
          mapping.maxExclusive === targetRangeMapping.maxExclusive &&
          mapping.minInclusive === targetRangeMapping.minInclusive,
      )[0];
      const targetContinuationToken =
        compositeContinuationToken.rangeMappings[
          compositeContinuationToken.rangeMappings.length - 1
        ].continuationToken;
      // TODO: keep check for overlapping ranges as splits are merges are possible
      const leftRanges = targetRanges.filter(
        (mapping) => mapping.maxExclusive < targetRangeMapping.minInclusive,
      );
      // TODO: change it later
      let queryPlanInfo: Record<string, unknown> = {};
      if (
        queryInfo &&
        typeof queryInfo === "object" &&
        "quereyInfo" in queryInfo &&
        queryInfo.quereyInfo &&
        typeof queryInfo.quereyInfo === "object" &&
        "queryInfo" in queryInfo.quereyInfo
      ) {
        const quereyInfoObj = queryInfo.quereyInfo as any;
        queryPlanInfo = quereyInfoObj.queryInfo ?? {};
      }
      console.log(
        `queryInfo, queryPlanInfo:${JSON.stringify(queryInfo, null, 2)}, ${JSON.stringify(queryPlanInfo, null, 2)}`,
      );

      // Create filtering condition for left ranges based on ORDER BY items and sort orders
      const leftFilter = this.createRangeFilterCondition(
        orderByToken.orderByItems,
        queryPlanInfo,
        "left",
      );

      const rightRanges = targetRanges.filter(
        (mapping) => mapping.minInclusive > targetRangeMapping.maxExclusive,
      );

      // Create filtering condition for right ranges based on ORDER BY items and sort orders
      const rightFilter = this.createRangeFilterCondition(
        orderByToken.orderByItems,
        queryPlanInfo,
        "right",
      );

      console.log(`Left ranges count: ${leftRanges.length}`);
      console.log(`Right ranges count: ${rightRanges.length}`);
      console.log(`Left filter condition: ${leftFilter}`);
      console.log(`Right filter condition: ${rightFilter}`);

      // Apply filtering logic for left ranges
      if (leftRanges.length > 0 && leftFilter) {
        console.log(`Applying filter condition to ${leftRanges.length} left ranges`);

        result.filteredRanges.push(...leftRanges);
        // push undefined leftRanges count times
        result.continuationToken.push(...Array(leftRanges.length).fill(undefined));
        result.filteringConditions.push(...Array(leftRanges.length).fill(leftFilter));
      }

      result.filteredRanges.push(targetRange);
      result.continuationToken.push(targetContinuationToken);

      result.filteringConditions.push();

      // Apply filtering logic for right ranges
      if (rightRanges.length > 0 && rightFilter) {
        console.log(`Applying filter condition to ${rightRanges.length} right ranges`);
        result.filteredRanges.push(...rightRanges);
        // push undefined rightRanges count times
        result.continuationToken.push(...Array(rightRanges.length).fill(undefined));
        result.filteringConditions.push(...Array(rightRanges.length).fill(rightFilter));
      }
    }

    // If we couldn't find a specific resume point, include all ranges
    // This can happen with certain types of ORDER BY continuation tokens
    if (!resumeRangeFound) {
      console.log(
        "Could not determine specific resume range, including all ranges for ORDER BY query",
      );
      filteredRanges = [...targetRanges];
      result.filteredRanges = filteredRanges;
    }

    return result;
  }

  /**
   * Creates a filter condition for ranges based on ORDER BY items and sort orders
   * This filter ensures that ranges only return documents based on their position relative to the continuation point
   * @param orderByItems - Array of order by items from the continuation token
   * @param queryInfo - Query information containing sort orders and other metadata
   * @param rangePosition - Whether this is for "left" or "right" ranges relative to continuation point
   * @returns SQL filter condition string for the specified range position
   */
  private createRangeFilterCondition(
    orderByItems: any[],
    queryInfo: Record<string, unknown> | undefined,
    rangePosition: "left" | "right",
  ): string {
    if (!orderByItems || orderByItems.length === 0) {
      console.warn(`No order by items found for creating ${rangePosition} range filter`);
      return "";
    }
    console.log("queryInfo:", JSON.stringify(queryInfo, null, 2));

    // Extract sort orders from query info
    const sortOrders = this.extractSortOrders(queryInfo);
    const orderByExpressions = queryInfo?.orderByExpressions;

    if (sortOrders.length === 0) {
      console.warn("No sort orders found in query info");
      return "";
    }

    if (!orderByExpressions || !Array.isArray(orderByExpressions)) {
      console.warn(`No orderByExpressions found in query info for ${rangePosition} range filter`);
      return "";
    }

    console.log(
      `Creating ${rangePosition} filter for ${orderByItems.length} order by items with ${sortOrders.length} sort orders`,
    );
    if (rangePosition === "left") {
      console.log(`QueryInfo keys:`, queryInfo ? Object.keys(queryInfo) : "No queryInfo");
      console.log(`OrderBy expressions:`, queryInfo?.orderByExpressions);
    }

    const filterConditions: string[] = [];

    // Process each order by item to create filter conditions
    for (
      let i = 0;
      i < orderByItems.length && i < sortOrders.length && i < orderByExpressions.length;
      i++
    ) {
      const orderByItem = orderByItems[i];
      const sortOrder = sortOrders[i];

      if (!orderByItem || orderByItem.item === undefined) {
        console.warn(`Skipping order by item at index ${i} - invalid or undefined`);
        continue;
      }

      // Determine the field path from ORDER BY expressions in query plan
      const fieldPath = this.extractFieldPath(queryInfo, i);
      console.log(`Extracted field path for ${rangePosition} range index ${i}: ${fieldPath}`);

      // Create the comparison condition based on sort order and range position
      const condition = this.createComparisonCondition(
        fieldPath,
        orderByItem.item,
        sortOrder,
        rangePosition,
      );

      if (condition) {
        filterConditions.push(condition);
      }
    }

    // Combine multiple conditions with AND for multi-field ORDER BY
    const combinedFilter = filterConditions.length > 0 ? `(${filterConditions.join(" AND ")})` : "";

    console.log(`Generated ${rangePosition} range filter: ${combinedFilter}`);
    return combinedFilter;
  }

  /**
   * Extracts sort orders from query info
   */
  private extractSortOrders(queryInfo?: Record<string, unknown>): string[] {
    if (!queryInfo) {
      return [];
    }

    // orderBy should contain the sort directions (e.g., ["Ascending", "Descending"])
    if (queryInfo.orderBy && Array.isArray(queryInfo.orderBy)) {
      return queryInfo.orderBy.map((order) => {
        if (typeof order === "string") {
          return order;
        }
        // Handle object format if needed
        if (order && typeof order === "object") {
          return order.direction || order.order || order.sortOrder || "Ascending";
        }
        return "Ascending";
      });
    }

    // Fallback: assume ascending order
    return ["Ascending"];
  }

  /**
   * Extracts field path from ORDER BY expressions in query plan
   */
  private extractFieldPath(queryInfo: Record<string, unknown> | undefined, index: number): string {
    console.log(`Extracting field path for index ${index} from query info 2:`, queryInfo);
    if (
      !queryInfo ||
      !queryInfo.orderByExpressions ||
      !Array.isArray(queryInfo.orderByExpressions)
    ) {
      console.warn(`No orderByExpressions found in query info for index ${index}`);
      return `orderByField${index}`;
    }

    const orderByExpressions = queryInfo.orderByExpressions as any[];

    if (index >= orderByExpressions.length) {
      console.warn(
        `Index ${index} is out of bounds for orderByExpressions array of length ${orderByExpressions.length}`,
      );
      // TODO: throw an error here
      return `orderByField${index}`;
    }

    const expression = orderByExpressions[index];

    // Handle different formats of ORDER BY expressions
    if (typeof expression === "string") {
      // Simple string expression like "c.id" or "_FullTextScore(...)"
      return expression;
    }

    if (expression && typeof expression === "object") {
      // Object format like { expression: "c.id", type: "PropertyRef" }
      if (expression.expression) {
        return expression.expression;
      }
      if (expression.path) {
        return expression.path.replace(/^\//, ""); // Remove leading slash
      }
      if (expression.field) {
        return expression.field;
      }
    }

    console.warn(
      `Could not extract field path from orderByExpressions at index ${index}:`,
      expression,
    );
    // TODO: throw an error here
    return `orderByField${index}`;
  }

  /**
   * Creates a comparison condition based on the field, value, sort order, and range position
   */
  private createComparisonCondition(
    fieldPath: string,
    value: any,
    sortOrder: string,
    rangePosition: "left" | "right",
  ): string {
    const isDescending =
      sortOrder.toLowerCase() === "descending" || sortOrder.toLowerCase() === "desc";

    // For left ranges (ranges that come before the target):
    // - In ascending order: field > value (left ranges should seek for larger values)
    // - In descending order: field < value (left ranges should seek for smaller values)

    // For right ranges (ranges that come after the target):
    // - In ascending order: field >= value (right ranges have larger values)
    // - In descending order: field <= value (right ranges have smaller values in desc order)

    let operator: string;

    if (rangePosition === "left") {
      operator = isDescending ? "<" : ">";
    } else {
      // right
      operator = isDescending ? "<=" : ">=";
    }

    // Format the value based on its type
    const formattedValue = this.formatValueForSQL(value);

    // Create the condition with proper field reference
    const condition = `${fieldPath} ${operator} ${formattedValue}`;

    console.log(`Created ${rangePosition} range condition: ${condition} (sort: ${sortOrder})`);
    return condition;
  }

  /**
   * Formats a value for use in SQL condition
   */
  private formatValueForSQL(value: any): string {
    if (value === null || value === undefined) {
      return "null";
    }

    const valueType = typeof value;

    switch (valueType) {
      case "string":
        // Escape single quotes and wrap in quotes
        return `'${value.toString().replace(/'/g, "''")}'`;
      case "number":
      case "bigint":
        return value.toString();
      case "boolean":
        return value ? "true" : "false";
      default:
        // For objects and arrays, convert to JSON string
        if (typeof value === "object") {
          return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
        }
        return `'${value.toString().replace(/'/g, "''")}'`;
    }
  }
}
