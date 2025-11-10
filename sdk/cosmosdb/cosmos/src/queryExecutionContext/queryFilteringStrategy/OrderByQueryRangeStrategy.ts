// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../../index.js";
import type {
  TargetPartitionRangeStrategy,
  PartitionRangeFilterResult,
} from "./TargetPartitionRangeStrategy.js";
import type { PartitionRangeWithContinuationToken } from "./TargetPartitionRangeManager.js";

/**
 * Strategy for filtering partition ranges in ORDER BY query execution context
 * Supports resuming from continuation tokens with proper range-token pair management
 * @hidden
 */
export class OrderByQueryRangeStrategy implements TargetPartitionRangeStrategy {
  getStrategyType(): string {
    return "OrderByQuery";
  }

  filterPartitionRanges(
    targetRanges: PartitionKeyRange[],
    continuationRanges?: PartitionRangeWithContinuationToken[],
    queryInfo?: Record<string, unknown>,
  ): PartitionRangeFilterResult {
    if (
      !targetRanges ||
      targetRanges.length === 0 ||
      !continuationRanges ||
      continuationRanges.length === 0
    ) {
      return {
        rangeTokenPairs: [],
      };
    }

    // create a PartitionRangeFilterResult object empty
    const result: PartitionRangeFilterResult = {
      rangeTokenPairs: [],
    };

    let filteredRanges: PartitionKeyRange[] = [];
    let resumeRangeFound = false;

    if (continuationRanges && continuationRanges.length > 0) {
      resumeRangeFound = true;
      // Find the range to resume from based on the composite token
      const targetRangeMapping = continuationRanges[continuationRanges.length - 1].range;
      // It is assumed that range mapping array is going to contain only range
      const targetRange: PartitionKeyRange = targetRangeMapping;

      const targetContinuationToken =
        continuationRanges[continuationRanges.length - 1].continuationToken;

      const leftRanges = targetRanges.filter((mapping) =>
        this.isRangeBeforeAnother(mapping.maxExclusive, targetRangeMapping.minInclusive),
      );

      // Create filtering condition for left ranges based on ORDER BY items and sort orders
      const leftFilter = this.createRangeFilterCondition(
        (queryInfo?.orderByItems as any[]) || [], // TODO: improve
        queryInfo,
        "left",
      );

      const rightRanges = targetRanges.filter((mapping) =>
        this.isRangeAfterAnother(mapping.minInclusive, targetRangeMapping.maxExclusive),
      );

      // Create filtering condition for right ranges based on ORDER BY items and sort orders
      const rightFilter = this.createRangeFilterCondition(
        (queryInfo?.orderByItems as any[]) || [], // TODO: improve
        queryInfo,
        "right",
      );

      // Apply filtering logic for left ranges
      if (leftRanges.length > 0) {
        leftRanges.forEach((range) => {
          result.rangeTokenPairs.push({
            range: range,
            continuationToken: undefined,
            filteringCondition: leftFilter,
          });
        });
      }
      // const targetFilter = this.createTargetRangeFilterCondition(
      //   (queryInfo?.orderByItems as any[]) || [],
      //   queryInfo?.rid as string,
      //   queryInfo,
      // );

      result.rangeTokenPairs.push({
        range: targetRange,
        continuationToken: targetContinuationToken,
        filteringCondition: rightFilter,
      });

      // Apply filtering logic for right ranges
      if (rightRanges.length > 0) {
        rightRanges.forEach((range) => {
          result.rangeTokenPairs.push({
            range: range,
            continuationToken: undefined,
            filteringCondition: rightFilter,
          });
        });
      }
    }

    // If we couldn't find a specific resume point, include all ranges
    // This can happen with certain types of ORDER BY continuation tokens
    if (!resumeRangeFound) {
      filteredRanges = [...targetRanges];
      filteredRanges.forEach((range) => {
        result.rangeTokenPairs.push({
          range: range,
          continuationToken: undefined,
          filteringCondition: undefined,
        });
      });
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
      return "";
    }

    // Extract sort orders from query info
    const sortOrders = this.extractSortOrders(queryInfo);

    // Extract orderByExpressions from nested structure
    let orderByExpressions: any[] | undefined;
    if (
      queryInfo &&
      queryInfo.quereyInfo &&
      typeof queryInfo.quereyInfo === "object" &&
      (queryInfo.quereyInfo as any).queryInfo &&
      (queryInfo.quereyInfo as any).queryInfo.orderByExpressions &&
      Array.isArray((queryInfo.quereyInfo as any).queryInfo.orderByExpressions)
    ) {
      orderByExpressions = (queryInfo.quereyInfo as any).queryInfo.orderByExpressions;
    }

    if (sortOrders.length === 0) {
      return "";
    }

    if (!orderByExpressions || !Array.isArray(orderByExpressions)) {
      return "";
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
        continue;
      }

      // Determine the field path from ORDER BY expressions in query plan
      const fieldPath = this.extractFieldPath(queryInfo, i);

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
    return combinedFilter;
  }

  /**
   * Extracts sort orders from query info
   */
  private extractSortOrders(queryInfo?: Record<string, unknown>): string[] {
    if (!queryInfo) {
      return [];
    }

    // Try multiple paths to find orderBy due to nested structure
    let orderBy: any[] | undefined;

    // Direct path
    if (queryInfo.orderBy && Array.isArray(queryInfo.orderBy)) {
      orderBy = queryInfo.orderBy;
    }
    // Nested path: queryInfo.quereyInfo.queryInfo.orderBy
    else if (
      queryInfo.quereyInfo &&
      (queryInfo.quereyInfo as any).queryInfo &&
      (queryInfo.quereyInfo as any).queryInfo.orderBy &&
      Array.isArray((queryInfo.quereyInfo as any).queryInfo.orderBy)
    ) {
      orderBy = (queryInfo.quereyInfo as any).queryInfo.orderBy;
    }

    if (orderBy) {
      return orderBy.map((order) => {
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
    // Try multiple paths to find orderByExpressions due to nested structure
    let orderByExpressions: any[] | undefined;

    if (queryInfo) {
      // Direct path
      // TODO: make it simple
      if (
        queryInfo.quereyInfo &&
        typeof queryInfo.quereyInfo === "object" &&
        (queryInfo.quereyInfo as any).queryInfo &&
        (queryInfo.quereyInfo as any).queryInfo.orderByExpressions &&
        Array.isArray((queryInfo.quereyInfo as any).queryInfo.orderByExpressions)
      ) {
        orderByExpressions = (queryInfo.quereyInfo as any).queryInfo.orderByExpressions;
      }
    }

    if (!orderByExpressions) {
      console.warn(`No orderByExpressions found in query info for index ${index}`);
      return `orderByField${index}`;
    }

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

  /**
   * Compares partition key range boundaries with proper handling for inclusive/exclusive semantics
   * @param boundary1 - First boundary to compare
   * @param boundary2 - Second boundary to compare
   * @returns negative if boundary1 is less than boundary2, positive if boundary1 is greater than boundary2, 0 if equal
   */
  private comparePartitionKeyBoundaries(boundary1: string, boundary2: string): number {
    // Handle empty string cases (empty string represents the minimum boundary)
    if (boundary1 === "" && boundary2 === "") return 0;
    if (boundary1 === "") return -1; // "" < "AA"
    if (boundary2 === "") return 1; // "AA" > ""

    // Use standard lexicographic comparison for non-empty boundaries
    return boundary1.localeCompare(boundary2);
  }

  private isRangeBeforeAnother(range1MaxExclusive: string, range2MinInclusive: string): boolean {
    // Since range1.maxExclusive is NOT part of range1, and range2.minInclusive IS part of range2,
    // range1 comes before range2 if range1.maxExclusive <= range2.minInclusive
    return this.comparePartitionKeyBoundaries(range1MaxExclusive, range2MinInclusive) <= 0;
  }

  private isRangeAfterAnother(range1MinInclusive: string, range2MaxExclusive: string): boolean {
    // Since range2.maxExclusive is NOT part of range2, and range1.minInclusive IS part of range1,
    // range1 comes after range2 if range1.minInclusive >= range2.maxExclusive
    return this.comparePartitionKeyBoundaries(range1MinInclusive, range2MaxExclusive) >= 0;
  }
}
