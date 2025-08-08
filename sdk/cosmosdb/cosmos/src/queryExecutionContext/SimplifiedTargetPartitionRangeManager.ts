// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionKeyRange } from "../index.js";

/**
 * Simplified result for partition range filtering
 * @hidden
 */
export interface PartitionRangeFilterResult {
  /**
   * The filtered partition key ranges ready for query execution
   */
  filteredRanges: PartitionKeyRange[];

  /**
   * Metadata about the filtering operation
   */
  metadata: {
    totalInputRanges: number;
    filteredRangeCount: number;
    hasContinuationToken: boolean;
    strategyMetadata?: Record<string, unknown>;
  };
}

/**
 * Filter function type for partition range filtering
 * @hidden
 */
export type PartitionRangeFilterFunction = (
  targetRanges: PartitionKeyRange[],
  continuationToken?: string,
) => Promise<PartitionRangeFilterResult>;

/**
 * Validation function type for continuation tokens
 * @hidden
 */
export type ContinuationTokenValidatorFunction = (continuationToken: string) => boolean;

/**
 * Simplified Target Partition Range Manager that accepts filter functions from execution contexts
 * @hidden
 */
export class TargetPartitionRangeManager {
  constructor(
    private readonly filterFunction: PartitionRangeFilterFunction,
    private readonly validatorFunction?: ContinuationTokenValidatorFunction,
    private readonly contextName: string = "Unknown",
  ) {}

  /**
   * Filters target partition ranges using the injected filter function
   */
  public async filterPartitionRanges(
    targetRanges: PartitionKeyRange[],
    continuationToken?: string,
  ): Promise<PartitionRangeFilterResult> {
    console.log(
      `=== ${this.contextName} TargetPartitionRangeManager.filterPartitionRanges START ===`,
    );

    // Validate inputs
    if (!targetRanges || targetRanges.length === 0) {
      throw new Error("Target ranges cannot be empty");
    }

    // Validate continuation token if provided and validator exists
    if (continuationToken && this.validatorFunction && !this.validatorFunction(continuationToken)) {
      throw new Error(`Invalid continuation token for ${this.contextName} context`);
    }

    try {
      const result = await this.filterFunction(targetRanges, continuationToken);

      console.log(`=== ${this.contextName} Filter Result ===`);
      console.log(`Input ranges: ${result.metadata.totalInputRanges}`);
      console.log(`Filtered ranges: ${result.metadata.filteredRangeCount}`);
      console.log(`Has continuation token: ${result.metadata.hasContinuationToken}`);
      console.log(
        `=== ${this.contextName} TargetPartitionRangeManager.filterPartitionRanges END ===`,
      );

      return result;
    } catch (error) {
      console.error(`Error in ${this.contextName} filter: ${error.message}`);
      throw error;
    }
  }

  /**
   * Validates if a continuation token is compatible with this context
   */
  public validateContinuationToken(continuationToken: string): boolean {
    return this.validatorFunction ? this.validatorFunction(continuationToken) : true;
  }
}
