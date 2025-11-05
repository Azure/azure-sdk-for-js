// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../../index.js";
import type {
  TargetPartitionRangeStrategy,
  PartitionRangeFilterResult,
} from "./TargetPartitionRangeStrategy.js";
import { ParallelQueryRangeStrategy } from "./ParallelQueryRangeStrategy.js";
import { OrderByQueryRangeStrategy } from "./OrderByQueryRangeStrategy.js";

/**
 * Interface representing a partition key range with its associated continuation token and filtering condition
 * @hidden
 */
export interface PartitionRangeWithContinuationToken {
  range: PartitionKeyRange;
  continuationToken?: string;
  filteringCondition?: string;
}

/**
 * Query execution context types
 * @hidden
 */
export enum QueryExecutionContextType {
  Parallel = "Parallel",
  OrderBy = "OrderBy",
}

/**
 * Configuration for the Target Partition Range Manager
 * @hidden
 */
export interface TargetPartitionRangeManagerConfig {
  /**
   * The type of query execution context
   */
  queryType: QueryExecutionContextType;

  /**
   * Additional query information that might be needed for filtering decisions
   */
  queryInfo?: Record<string, unknown>;

  /**
   * Custom strategy instance (optional, will use default strategies if not provided)
   */
  customStrategy?: TargetPartitionRangeStrategy;
}

/**
 * Manager class responsible for filtering target partition ranges based on query type and continuation tokens.
 * Uses the Strategy pattern to provide different filtering logic for different query types.
 * @hidden
 */
export class TargetPartitionRangeManager {
  private strategy: TargetPartitionRangeStrategy;
  private config: TargetPartitionRangeManagerConfig;

  constructor(config: TargetPartitionRangeManagerConfig) {
    this.config = config;
    this.strategy = this.createStrategy(config);
  }

  /**
   * Creates the appropriate strategy based on configuration
   */
  private createStrategy(config: TargetPartitionRangeManagerConfig): TargetPartitionRangeStrategy {
    // Use custom strategy if provided
    if (config.customStrategy) {
      return config.customStrategy;
    }

    // Create default strategy based on query type
    switch (config.queryType) {
      case QueryExecutionContextType.Parallel:
        return new ParallelQueryRangeStrategy();

      case QueryExecutionContextType.OrderBy:
        return new OrderByQueryRangeStrategy();

      default:
        throw new Error(`Unsupported query execution context type: ${config.queryType}`);
    }
  }

  /**
   * Filters target partition ranges based on range-token pairs from partition split/merge detection
   * @param targetRanges - All available target partition ranges (fallback if no range-token pairs)
   * @param rangeTokenPairs - Pre-processed range-token pairs after split/merge detection
   * @param additionalQueryInfo - Additional query information to merge with existing queryInfo
   * @returns Filtered partition ranges and metadata
   */
  public filterPartitionRanges(
    targetRanges: PartitionKeyRange[],
    rangeTokenPairs?: PartitionRangeWithContinuationToken[],
    additionalQueryInfo?: Record<string, unknown>,
  ): PartitionRangeFilterResult {
    // Validate inputs
    if (!targetRanges || targetRanges.length === 0) {
      return { rangeTokenPairs: [] };
    }

    // Merge base queryInfo with additional queryInfo (additional takes precedence)
    const mergedQueryInfo = { ...this.config.queryInfo, ...additionalQueryInfo };

    const result = this.strategy.filterPartitionRanges(
      targetRanges,
      rangeTokenPairs,
      mergedQueryInfo,
    );
    return result;
  }

  /**
   * Gets the current strategy type
   */
  public getStrategyType(): string {
    return this.strategy.getStrategyType();
  }

  /**
   * Updates the strategy (useful for switching between query types)
   */
  public updateStrategy(newConfig: TargetPartitionRangeManagerConfig): void {
    this.config = newConfig;
    this.strategy = this.createStrategy(newConfig);
  }

  /**
   * Static factory method to create a manager for parallel queries
   */
  public static createForParallelQuery(
    queryInfo?: Record<string, unknown>,
  ): TargetPartitionRangeManager {
    return new TargetPartitionRangeManager({
      queryType: QueryExecutionContextType.Parallel,
      queryInfo,
    });
  }

  /**
   * Static factory method to create a manager for ORDER BY queries
   */
  public static createForOrderByQuery(
    queryInfo?: Record<string, unknown>,
  ): TargetPartitionRangeManager {
    return new TargetPartitionRangeManager({
      queryType: QueryExecutionContextType.OrderBy,
      queryInfo,
    });
  }
}
