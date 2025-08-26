// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../index.js";
import type {
  TargetPartitionRangeStrategy,
  PartitionRangeFilterResult,
} from "./TargetPartitionRangeStrategy.js";
import { OrderByQueryContinuationToken } from "../documents/ContinuationToken/OrderByQueryContinuationToken.js";
import { CompositeQueryContinuationToken } from "./CompositeQueryContinuationToken.js";

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
    if (!continuationToken) {
      return false;
    }

    try {
      const orderByToken = JSON.parse(continuationToken);
      
      // Basic validation - must have required properties
      if (!orderByToken || typeof orderByToken !== "object") {
        return false;
      }

      // Must have order by items array
      if (!Array.isArray(orderByToken.orderByItems) || orderByToken.orderByItems.length === 0) {
        return false;
      }

      // For ORDER BY queries, compositeToken is REQUIRED
      if (!orderByToken.compositeToken || typeof orderByToken.compositeToken !== "string") {
        console.warn("ORDER BY continuation token must have a valid compositeToken");
        return false;
      }

      // Validate the compositeToken structure
      try {
        const composite = CompositeQueryContinuationToken.fromString(orderByToken.compositeToken);
        
        // Additional validation for composite token structure
        if (!composite.rangeMappings || !Array.isArray(composite.rangeMappings)) {
          return false;
        }

        // Empty range mappings indicate an incorrect continuation token
        if (composite.rangeMappings.length === 0) {
          console.warn("Empty range mappings detected - invalid ORDER BY continuation token");
          return false;
        }

    // Validate each range mapping has required properties
    for (const mapping of composite.rangeMappings) {
      if (!mapping.partitionKeyRange) {
        return false;
      }
    }
  } catch (compositeError) {
        return false;
      }

      return true;
    } catch (error) {
      console.warn(`Invalid ORDER BY continuation token: ${error.message}`);
      return false;
    }
  }

  filterPartitionRanges(
    targetRanges: PartitionKeyRange[],
    continuationToken?: string,
    queryInfo?: Record<string, unknown>,
  ): PartitionRangeFilterResult {
    console.log("=== OrderByQueryRangeStrategy.filterPartitionRanges START ===");

    if (!targetRanges || targetRanges.length === 0) {
      return {
        filteredRanges: [],
      };
    }

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
        parsed.orderByItems ,
        parsed.rid,
        parsed.skipCount,
        parsed.offset,
        parsed.limit,
        parsed.hashedLastResult,
      );
    } catch (error) {
      throw new Error(`Failed to parse ORDER BY continuation token: ${error.message}`);
    }

    console.log(
      `Parsed ORDER BY continuation token with ${orderByToken.orderByItems.length} order by items`,
    );
    console.log(`Skip count: ${orderByToken.skipCount}, RID: ${orderByToken.rid}`);

    // Parse the inner composite token to understand which ranges to resume from
    let compositeContinuationToken: CompositeQueryContinuationToken;

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
      // It is assumed that range mapping array is going to contain only range
      const targetRange: PartitionKeyRange = {
        id: targetRangeMapping.id,
        minInclusive: targetRangeMapping.minInclusive,
        maxExclusive: targetRangeMapping.maxExclusive,
        ridPrefix: targetRangeMapping.ridPrefix,
        throughputFraction: targetRangeMapping.throughputFraction,
        status: targetRangeMapping.status,
        parents: targetRangeMapping.parents,
        // Preserve EPK boundaries from continuation token if available
        ...(targetRangeMapping.epkMin && { epkMin: targetRangeMapping.epkMin }),
        ...(targetRangeMapping.epkMax && { epkMax: targetRangeMapping.epkMax }),
      };

      console.log(
        `Target range from ORDER BY continuation token: ${targetRange.id} [${targetRange.minInclusive}, ${targetRange.maxExclusive})` +
        (targetRangeMapping.epkMin && targetRangeMapping.epkMax ? ` with EPK [${targetRangeMapping.epkMin}, ${targetRangeMapping.epkMax})` : '')
      );

      const targetContinuationToken =
        compositeContinuationToken.rangeMappings[
          compositeContinuationToken.rangeMappings.length - 1
        ].continuationToken;

      const leftRanges = targetRanges.filter(
        (mapping) => this.isRangeBeforeAnother(mapping.maxExclusive, targetRangeMapping.minInclusive),
      );
      let queryPlanInfo: Record<string, unknown> = {};
      if (
        queryInfo && queryInfo.queryInfo && queryInfo.queryInfo.queryInfo
      ) {
        queryPlanInfo = queryInfoObj.queryInfo.queryInfo;
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
        (mapping) => this.isRangeAfterAnother(mapping.minInclusive, targetRangeMapping.maxExclusive),
      );

      // Create filtering condition for right ranges based on ORDER BY items and sort orders
      const rightFilter = this.createRangeFilterCondition(
        orderByToken.orderByItems,
        queryPlanInfo,
        "right",
      );

      // Apply filtering logic for left ranges
      if (leftRanges.length > 0) {
        console.log(`Applying filter condition to ${leftRanges.length} left ranges`);

        result.filteredRanges.push(...leftRanges);
        // push undefined leftRanges count times
        result.continuationToken.push(...Array(leftRanges.length).fill(undefined));
        result.filteringConditions.push(...Array(leftRanges.length).fill(leftFilter));
      }

      result.filteredRanges.push(targetRange);
      result.continuationToken.push(targetContinuationToken);
      // Create filter condition for target range - includes right filter + _rid check
      const targetFilter = this.createTargetRangeFilterCondition(
        orderByToken.orderByItems,
        orderByToken.rid,
        queryPlanInfo
      );
      result.filteringConditions.push(targetFilter);

      // Apply filtering logic for right ranges
      if (rightRanges.length > 0) {
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
      filteredRanges = [...targetRanges];
      result.filteredRanges = filteredRanges;
    }

    return result;
  }

  /**
   * Creates a filter condition for the target range that includes both ORDER BY conditions and _rid check
   * This ensures proper continuation from the exact document position
   * @param orderByItems - Array of order by items from the continuation token
   * @param rid - The resource ID from the continuation token
   * @param queryInfo - Query information containing sort orders and other metadata
   * @returns SQL filter condition string for the target range
   */
  private createTargetRangeFilterCondition(
    orderByItems: any[],
    rid: string | undefined,
    queryInfo: Record<string, unknown> | undefined,
  ): string {

    // Create the right filter condition first (same logic as right ranges)
    const rightFilter = this.createRangeFilterCondition(orderByItems, queryInfo, "right");
    
    // Add _rid check if available
    if (rid) {
      const ridCondition = `c._rid > '${rid.replace(/'/g, "''")}'`;
      
      if (rightFilter) {
        // Combine ORDER BY filter with RID filter using AND logic
        // This ensures we get documents that :
        // 1. Have ORDER BY values greater than the continuation point, AND
        // 2. Have the same ORDER BY values but RID greater than continuation point
        return `(${rightFilter}) AND ${ridCondition}`;
      } else {
        // If no ORDER BY filter could be created, use just the RID condition
        return ridCondition;
      }
    }

    // If no RID available, return just the right filter
    return rightFilter;
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
    if (boundary2 === "") return 1;  // "AA" > ""
    
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
