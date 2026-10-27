// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../../index.js";
import type {
  TargetPartitionRangeStrategy,
  PartitionRangeFilterResult,
} from "./TargetPartitionRangeStrategy.js";
import type { PartitionRangeWithContinuationToken } from "./TargetPartitionRangeManager.js";
import {
  getLogicalPartitionRange,
  getUncoveredPartitionKeyRanges,
} from "../logicalPartitionRange.js";

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

    if (
      !queryInfo?.orderByItems ||
      !Array.isArray(queryInfo.orderByItems) ||
      queryInfo.orderByItems.length === 0
    ) {
      throw new Error(
        "Unable to resume ORDER BY query from continuation token. orderByItems is required for ORDER BY queries.",
      );
    }

    const result: PartitionRangeFilterResult = {
      rangeTokenPairs: [],
    };
    let resumeRangeFound = false;

    if (continuationRanges && continuationRanges.length > 0) {
      resumeRangeFound = true;
      const sortedContinuationRanges = [...continuationRanges].sort((left, right) =>
        this.getLogicalMin(left).localeCompare(this.getLogicalMin(right)),
      );
      const sortedTargetRanges = [...targetRanges].sort((left, right) =>
        left.minInclusive.localeCompare(right.minInclusive),
      );
      const queryMin = sortedTargetRanges[0].minInclusive;
      const queryMax = sortedTargetRanges[sortedTargetRanges.length - 1].maxExclusive;
      const orderByItems = queryInfo.orderByItems;
      const leftFilter = this.createRangeFilterCondition(orderByItems, queryInfo, "left");
      const rightFilter = this.createRangeFilterCondition(orderByItems, queryInfo, "right");
      const hasCheckpointMetadata = sortedContinuationRanges.some(
        (range) => range.isOrderByCheckpoint !== undefined,
      );
      const checkpointRanges = sortedContinuationRanges.filter(
        (range) => range.isOrderByCheckpoint,
      );
      if (checkpointRanges.length === 0 && !hasCheckpointMetadata) {
        checkpointRanges.push(sortedContinuationRanges[0]);
      }
      const checkpointMin =
        checkpointRanges.length > 0 ? this.getLogicalMin(checkpointRanges[0]) : queryMin;
      const coveredRanges = sortedContinuationRanges.map((range) =>
        getLogicalPartitionRange(range.range, range.epkMin, range.epkMax),
      );
      const uncoveredRanges = getUncoveredPartitionKeyRanges(
        sortedTargetRanges,
        coveredRanges,
        queryMin,
        queryMax,
      );

      sortedContinuationRanges.forEach((range) => {
        if (range.isActive !== false) {
          const logicalMax = this.getLogicalMax(range);
          result.rangeTokenPairs.push({
            range: range.range,
            continuationToken: range.continuationToken,
            filteringCondition: logicalMax <= checkpointMin ? leftFilter : rightFilter,
            epkMin: range.epkMin,
            epkMax: range.epkMax,
            isActive: range.isActive,
            isOrderByCheckpoint: range.isOrderByCheckpoint,
          });
        }
      });

      uncoveredRanges.forEach((range) => {
        result.rangeTokenPairs.push({
          range: range.partitionKeyRange,
          continuationToken: undefined,
          filteringCondition: range.maxExclusive <= checkpointMin ? leftFilter : rightFilter,
          epkMin: range.minInclusive,
          epkMax: range.maxExclusive,
        });
      });

      result.rangeTokenPairs.sort((left, right) =>
        this.getLogicalMin(left).localeCompare(this.getLogicalMin(right)),
      );
    }

    // If we couldn't find a specific resume point, include all ranges
    // This can happen with certain types of ORDER BY continuation tokens
    if (!resumeRangeFound) {
      const filteredRanges = [...targetRanges];
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

  private getLogicalMin(range: PartitionRangeWithContinuationToken): string {
    return range.epkMin ?? range.range.minInclusive;
  }

  private getLogicalMax(range: PartitionRangeWithContinuationToken): string {
    return range.epkMax ?? range.range.maxExclusive;
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
    // Extract sort orders from query info
    let sortOrders: string[];
    try {
      sortOrders = this.extractSortOrders(queryInfo);
    } catch (error) {
      // If we can't extract sort orders, we cannot create reliable filter conditions
      throw new Error(
        `Unable to resume ORDER BY query from continuation token. The ORDER BY sort direction configuration ` +
          `in the query plan is invalid or missing. This may indicate a client version mismatch or corrupted continuation token. ` +
          `Please retry the query without a continuation token. Original error: ${error}`,
        { cause: error },
      );
    }

    // Extract orderByExpressions from nested structure
    let orderByExpressions: any[] | undefined;
    if (
      queryInfo &&
      queryInfo.queryInfo &&
      typeof queryInfo.queryInfo === "object" &&
      (queryInfo.queryInfo as any).queryInfo &&
      (queryInfo.queryInfo as any).queryInfo.orderByExpressions &&
      Array.isArray((queryInfo.queryInfo as any).queryInfo.orderByExpressions)
    ) {
      orderByExpressions = (queryInfo.queryInfo as any).queryInfo.orderByExpressions;
    }

    if (!orderByExpressions || !Array.isArray(orderByExpressions)) {
      throw new Error(
        "Unable to resume ORDER BY query from continuation token. The ORDER BY field configuration " +
          "in the query plan is invalid or missing. This may indicate a client version mismatch or corrupted continuation token. " +
          "Please retry the query without a continuation token.",
      );
    }

    const filterConditions: string[] = [];

    // Process each order by item to create filter conditions
    for (let i = 0; i < orderByItems.length && i < sortOrders.length; i++) {
      const orderByItem = orderByItems[i];
      const sortOrder = sortOrders[i];

      if (!orderByItem || orderByItem.item === undefined) {
        continue;
      }

      try {
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
      } catch (error) {
        // If we can't extract field path for ORDER BY expressions, we cannot safely resume from continuation token
        // This would lead to incorrect query results, so we must fail the entire request
        throw new Error(
          `Unable to resume ORDER BY query from continuation token. The ORDER BY field configuration ` +
            `in the query plan is invalid or incompatible with the continuation token format. ` +
            `This may indicate a client version mismatch or corrupted continuation token. ` +
            `Please retry the query without a continuation token. Original error: ${error}`,
          { cause: error },
        );
      }
    }

    // Combine multiple conditions with AND for multi-field ORDER BY
    const combinedFilter = filterConditions.length > 0 ? `(${filterConditions.join(" AND ")})` : "";
    return combinedFilter;
  }

  /**
   * Extracts sort orders from query info
   * @throws Error if sort order information is missing or invalid
   */
  private extractSortOrders(queryInfo?: Record<string, unknown>): string[] {
    if (!queryInfo) {
      throw new Error("Query information is required to determine ORDER BY sort directions");
    }

    // Extract orderBy from the nested structure: queryInfo.queryInfo.queryInfo.orderBy
    let orderBy: any[] | undefined;

    if (
      queryInfo.queryInfo &&
      typeof queryInfo.queryInfo === "object" &&
      (queryInfo.queryInfo as any).queryInfo &&
      typeof (queryInfo.queryInfo as any).queryInfo === "object" &&
      (queryInfo.queryInfo as any).queryInfo.orderBy &&
      Array.isArray((queryInfo.queryInfo as any).queryInfo.orderBy)
    ) {
      orderBy = (queryInfo.queryInfo as any).queryInfo.orderBy;
    }

    if (!orderBy) {
      throw new Error("ORDER BY sort direction information is missing from query plan");
    }

    return orderBy.map((order, index) => {
      if (typeof order === "string") {
        return order;
      }
      // Handle object format if needed
      if (order && typeof order === "object") {
        const sortOrder =
          (order as any).direction || (order as any).order || (order as any).sortOrder;
        if (sortOrder) {
          return sortOrder;
        }
      }
      throw new Error(
        `ORDER BY sort direction at position ${index + 1} has an invalid format in the query plan`,
      );
    });
  }

  /**
   * Extracts field path from ORDER BY expressions in query plan
   * @throws Error if orderByExpressions are not found or index is out of bounds or expression format is invalid
   */
  private extractFieldPath(queryInfo: Record<string, unknown> | undefined, index: number): string {
    // Try multiple paths to find orderByExpressions due to nested structure
    let orderByExpressions: any[] | undefined;

    if (queryInfo) {
      // Direct path
      if (queryInfo.orderByExpressions && Array.isArray(queryInfo.orderByExpressions)) {
        orderByExpressions = queryInfo.orderByExpressions;
      }
      // Nested path: queryInfo.queryInfo.queryInfo.orderByExpressions
      else if (
        queryInfo.queryInfo &&
        typeof queryInfo.queryInfo === "object" &&
        (queryInfo.queryInfo as any).queryInfo &&
        (queryInfo.queryInfo as any).queryInfo.orderByExpressions &&
        Array.isArray((queryInfo.queryInfo as any).queryInfo.orderByExpressions)
      ) {
        orderByExpressions = (queryInfo.queryInfo as any).queryInfo.orderByExpressions;
      }
    }

    if (!orderByExpressions) {
      throw new Error("ORDER BY field information is missing from query plan");
    }

    if (index >= orderByExpressions.length) {
      throw new Error(
        `ORDER BY field configuration mismatch: expected at least ${index + 1} fields but found ${orderByExpressions.length}`,
      );
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

    throw new Error(
      `ORDER BY field at position ${index + 1} has an unrecognized format in the query plan`,
    );
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
   * Formats a value for use in SQL condition.
   * We escape single quotes as \\u0027 to avoid ambiguity with \\\\ followed by '
   */
  private formatValueForSQL(value: any): string {
    if (value === null || value === undefined) {
      return "null";
    }

    const valueType = typeof value;

    switch (valueType) {
      case "string":
        // Escape backslashes first, then single quotes as unicode escape
        return `'${value.toString().replace(/\\/g, "\\\\").replace(/'/g, "\\u0027")}'`;
      case "number":
      case "bigint":
        return value.toString();
      case "boolean":
        return value ? "true" : "false";
      default:
        // For objects and arrays, convert to JSON string
        if (typeof value === "object") {
          return `'${JSON.stringify(value).replace(/\\/g, "\\\\").replace(/'/g, "\\u0027")}'`;
        }
        return `'${value.toString().replace(/\\/g, "\\\\").replace(/'/g, "\\u0027")}'`;
    }
  }
}
