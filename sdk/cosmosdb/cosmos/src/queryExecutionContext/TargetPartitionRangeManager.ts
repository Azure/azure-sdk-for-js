// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../index.js";
import type {
  TargetPartitionRangeStrategy,
  PartitionRangeFilterResult,
} from "./TargetPartitionRangeStrategy.js";
import { ParallelQueryRangeStrategy } from "./ParallelQueryRangeStrategy.js";
import { OrderByQueryRangeStrategy } from "./OrderByQueryRangeStrategy.js";

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
      console.log(`Using custom strategy: ${config.customStrategy.getStrategyType()}`);
      return config.customStrategy;
    }

    // Create default strategy based on query type
    switch (config.queryType) {
      case QueryExecutionContextType.Parallel:
        console.log("Creating ParallelQueryRangeStrategy");
        return new ParallelQueryRangeStrategy();

      case QueryExecutionContextType.OrderBy:
        console.log("Creating OrderByQueryRangeStrategy");
        return new OrderByQueryRangeStrategy();

      default:
        throw new Error(`Unsupported query execution context type: ${config.queryType}`);
    }
  }

  /**
   * Filters target partition ranges based on the continuation token and query-specific logic
   * @param targetRanges - All available target partition ranges
   * @param continuationToken - The continuation token to resume from (if any)
   * @returns Promise resolving to filtered partition ranges and metadata
   */
  public async filterPartitionRanges(
    targetRanges: PartitionKeyRange[],
    continuationToken?: string,
  ): Promise<PartitionRangeFilterResult> {
    console.log("=== TargetPartitionRangeManager.filterPartitionRanges START ===");
    console.log(
      `Query type: ${this.config.queryType}, Strategy: ${this.strategy.getStrategyType()}`,
    );
    console.log(
      `Input ranges: ${targetRanges.length}, Continuation token: ${continuationToken ? "Present" : "None"}`,
    );

    // Validate inputs
    if (!targetRanges || targetRanges.length === 0) {
      return { filteredRanges: [], continuationToken: null };
    }

    // Validate continuation token if provided
    if (continuationToken && !this.strategy.validateContinuationToken(continuationToken)) {
      throw new Error(`Invalid continuation token for ${this.strategy.getStrategyType()} strategy`);
    }

    try {
      const result = await this.strategy.filterPartitionRanges(
        targetRanges,
        continuationToken,
        this.config.queryInfo,
      );

      console.log(`=== TargetPartitionRangeManager Result ===`);
      console.log("=== TargetPartitionRangeManager.filterPartitionRanges END ===");

      return result;
    } catch (error) {
      console.error(`Error in TargetPartitionRangeManager.filterPartitionRanges: ${error.message}`);
      throw error;
    }
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
    console.log(
      `Updating strategy from ${this.strategy.getStrategyType()} to ${newConfig.queryType}`,
    );
    this.config = newConfig;
    this.strategy = this.createStrategy(newConfig);
  }

  /**
   * Validates if a continuation token is compatible with the current strategy
   */
  public validateContinuationToken(continuationToken: string): boolean {
    return this.strategy.validateContinuationToken(continuationToken);
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
