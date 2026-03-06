// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientContext } from "../ClientContext.js";
import { StatusCodes, SubStatusCodes } from "../common/statusCodes.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { PartitionRangeUpdate } from "../documents/ContinuationToken/PartitionRangeUpdate.js";
import type {
  QueryRangeWithContinuationToken,
  RangeBoundary,
  BaseContinuationToken,
} from "../documents/ContinuationToken/CompositeQueryContinuationToken.js";
import { QueryRange } from "../routing/QueryRange.js";
import { SmartRoutingMapProvider } from "../routing/smartRoutingMapProvider.js";
import type { DocumentProducer } from "./documentProducer.js";
import type { PartitionKeyRange } from "../index.js";

/**
 * Processed range result from handling partition range changes
 * @hidden
 */
export interface ProcessedRange {
  range: PartitionKeyRange;
  continuationToken?: string;
  epkMin?: string;
  epkMax?: string;
}

/**
 * Handles partition split/merge detection and recovery during query execution.
 * Responsible for:
 * - Detecting partition splits/merges from 410/1002 errors
 * - Refreshing partition routing cache
 * - Creating replacement DocumentProducers for new partition ranges
 * - Tracking continuation token updates across partition topology changes
 * @hidden
 */
export class PartitionSplitHandler {
  private routingProvider: SmartRoutingMapProvider;

  /**
   * Creates a new PartitionSplitHandler
   * @param clientContext - The client context for accessing routing information
   * @param collectionLink - The collection link for routing lookups
   * @param updatedContinuationRanges - Shared map for tracking partition range updates
   */
  constructor(
    private readonly clientContext: ClientContext,
    private readonly collectionLink: string,
    private readonly updatedContinuationRanges: Map<string, PartitionRangeUpdate>,
  ) {
    this.routingProvider = new SmartRoutingMapProvider(this.clientContext);
  }

  /**
   * Checks if an error indicates that partition key range cache needs refresh (split/merge detected)
   * @param error - The error to check
   * @returns true if cache refresh is needed
   */
  public static needsCacheRefresh(error: any): boolean {
    if (!error) return false;
    return (
      error.code === StatusCodes.Gone &&
      "substatus" in error &&
      error["substatus"] === SubStatusCodes.PartitionKeyRangeGone
    );
  }

  /**
   * Handles partition range changes detected from continuation token during initialization.
   * Detects splits/merges by comparing token ranges with current partition topology.
   * @param parsedToken - The parsed continuation token containing range mappings
   * @param diagnosticNode - Diagnostic node for tracing
   * @returns Array of processed ranges with EPK info for creating DocumentProducers
   */
  public async handlePartitionRangeChanges(
    parsedToken: BaseContinuationToken,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<ProcessedRange[]> {
    const processedRanges: ProcessedRange[] = [];

    // Extract range mappings from the already parsed token
    const rangeMappings = parsedToken.rangeMappings;

    if (!rangeMappings || rangeMappings.length === 0) {
      return [];
    }

    // Check each range mapping for potential splits/merges
    for (const rangeWithToken of rangeMappings) {
      // Create a new QueryRange instance from the simplified range data
      const range = rangeWithToken.queryRange;
      const queryRange: QueryRange = new QueryRange(
        range.min,
        range.max,
        true, // isMinInclusive - assumption: always true
        false, // isMaxInclusive - assumption: always false (max is exclusive)
      );

      const rangeMin = queryRange.min;
      const rangeMax = queryRange.max;

      // Get current overlapping ranges for this continuation token range
      const overlappingRanges = await this.routingProvider.getOverlappingRanges(
        this.collectionLink,
        [queryRange],
        diagnosticNode,
      );

      // Detect split/merge scenario based on the number of overlapping ranges
      if (overlappingRanges.length === 0) {
        continue;
      } else if (overlappingRanges.length === 1) {
        // Check if it's the same range (no change) or a merge scenario
        const currentRange = overlappingRanges[0];
        if (currentRange.minInclusive !== rangeMin || currentRange.maxExclusive !== rangeMax) {
          // Merge scenario - include EPK ranges from original continuation token range
          this.handleContinuationTokenMerge(rangeWithToken, currentRange);
          processedRanges.push({
            range: currentRange,
            continuationToken: rangeWithToken.continuationToken,
            epkMin: rangeMin, // Original range min becomes EPK min
            epkMax: rangeMax, // Original range max becomes EPK max
          });
        } else {
          // Same range - no merge, no EPK ranges needed
          processedRanges.push({
            range: currentRange,
            continuationToken: rangeWithToken.continuationToken,
          });
        }
      } else {
        // Split scenario - one range from continuation token now maps to multiple ranges
        this.handleContinuationTokenSplit(rangeWithToken, overlappingRanges);
        // Add all overlapping ranges with the same continuation token to processed ranges
        overlappingRanges.forEach((rangeValue) => {
          processedRanges.push({
            range: rangeValue,
            continuationToken: rangeWithToken.continuationToken,
          });
        });
      }
    }

    return processedRanges;
  }

  /**
   * Handles a runtime partition split detected during fetch.
   * Refreshes routing cache, gets replacement ranges, and creates replacement DocumentProducers.
   * @param error - The error that triggered split detection
   * @param diagnosticNode - Diagnostic node for tracing
   * @param documentProducer - The document producer that encountered the split
   * @param requestContinuation - The original request continuation token (for token update tracking)
   * @param producerFactory - Factory function to create new DocumentProducers
   * @returns Array of replacement DocumentProducers for the new partition ranges
   * @throws The original error if no replacement ranges are found
   */
  public async handleRuntimeSplit(
    error: any,
    diagnosticNode: DiagnosticNodeInternal,
    documentProducer: DocumentProducer,
    requestContinuation: string | undefined,
    producerFactory: (
      range: PartitionKeyRange,
      token: string | undefined,
      startEpk?: string,
      endEpk?: string,
      populateHeaders?: boolean,
    ) => DocumentProducer,
  ): Promise<DocumentProducer[]> {
    // Get the replacement ranges
    const replacementPartitionKeyRanges = await this.getReplacementRanges(
      documentProducer,
      diagnosticNode,
    );

    if (replacementPartitionKeyRanges.length === 0) {
      throw error;
    }

    if (requestContinuation) {
      // Update composite continuation token to handle partition split
      this.updateContinuationTokenOnPartitionChange(
        documentProducer,
        replacementPartitionKeyRanges,
      );
    }

    const replacementProducers: DocumentProducer[] = [];

    if (replacementPartitionKeyRanges.length === 1) {
      // Partition is gone due to Merge
      // Create the replacement documentProducer with populateEpkRangeHeaders Flag set to true
      const replacementProducer = producerFactory(
        replacementPartitionKeyRanges[0],
        documentProducer.continuationToken,
        documentProducer.startEpk,
        documentProducer.endEpk,
        true, // populateEpkRangeHeaders
      );
      replacementProducers.push(replacementProducer);
    } else {
      // Split scenario - create replacement producers for each new partition range
      replacementPartitionKeyRanges.forEach((partitionKeyRange) => {
        const queryRange = QueryRange.parsePartitionKeyRange(partitionKeyRange);
        // Create replacement document producers with the parent's continuationToken
        const replacementProducer = producerFactory(
          partitionKeyRange,
          documentProducer.continuationToken,
          queryRange.min,
          queryRange.max,
          false, // populateEpkRangeHeaders
        );
        replacementProducers.push(replacementProducer);
      });
    }

    return replacementProducers;
  }

  /**
   * Gets the replacement partition key ranges for a partition that has been split or merged.
   * Refreshes the routing provider cache and queries for overlapping ranges.
   * @param documentProducer - The document producer whose partition changed
   * @param diagnosticNode - Diagnostic node for tracing
   * @returns Array of replacement partition key ranges
   */
  private async getReplacementRanges(
    documentProducer: DocumentProducer,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<PartitionKeyRange[]> {
    const partitionKeyRange = documentProducer.targetPartitionKeyRange;
    // Download the new routing map
    this.routingProvider = new SmartRoutingMapProvider(this.clientContext);
    // Get the queryRange that relates to this partitionKeyRange
    const queryRange = QueryRange.parsePartitionKeyRange(partitionKeyRange);
    return this.routingProvider.getOverlappingRanges(
      this.collectionLink,
      [queryRange],
      diagnosticNode,
    );
  }

  /**
   * Updates continuation token tracking when partition topology changes.
   * Records the old range, new ranges, and continuation token for later serialization.
   * @param originalDocumentProducer - The document producer that encountered the change
   * @param replacementPartitionKeyRanges - The new partition ranges after split/merge
   */
  private updateContinuationTokenOnPartitionChange(
    originalDocumentProducer: DocumentProducer,
    replacementPartitionKeyRanges: PartitionKeyRange[],
  ): void {
    const rangeWithToken = this.createQueryRangeWithContinuationToken(originalDocumentProducer);
    if (replacementPartitionKeyRanges.length === 1) {
      this.handleContinuationTokenMerge(rangeWithToken, replacementPartitionKeyRanges[0]);
    } else {
      this.handleContinuationTokenSplit(rangeWithToken, replacementPartitionKeyRanges);
    }
  }

  /**
   * Handles partition merge scenario for continuation token ranges.
   * Records the old range and new merged range for continuation token updates.
   * @param rangeWithToken - The original range with its continuation token
   * @param newMergedRange - The new merged partition range
   */
  private handleContinuationTokenMerge(
    rangeWithToken: QueryRangeWithContinuationToken,
    _newMergedRange: PartitionKeyRange,
  ): void {
    const rangeKey = `${rangeWithToken.queryRange.min}-${rangeWithToken.queryRange.max}`;
    this.updatedContinuationRanges.set(rangeKey, {
      oldRange: {
        min: rangeWithToken.queryRange.min,
        max: rangeWithToken.queryRange.max,
        isMinInclusive: true, // Assumption: min is always inclusive
        isMaxInclusive: false, // Assumption: max is always exclusive
      },
      newRanges: [
        {
          min: rangeWithToken.queryRange.min,
          max: rangeWithToken.queryRange.max,
          isMinInclusive: true, // Assumption: min is always inclusive
          isMaxInclusive: false, // Assumption: max is always exclusive
        },
      ],
      continuationToken: rangeWithToken.continuationToken,
    });
  }

  /**
   * Handles partition split scenario for continuation token ranges.
   * Records the old range and new split ranges for continuation token updates.
   * @param rangeWithToken - The original range with its continuation token
   * @param overlappingRanges - The new partition ranges after split
   */
  private handleContinuationTokenSplit(
    rangeWithToken: QueryRangeWithContinuationToken,
    overlappingRanges: PartitionKeyRange[],
  ): void {
    const rangeKey = `${rangeWithToken.queryRange.min}-${rangeWithToken.queryRange.max}`;
    this.updatedContinuationRanges.set(rangeKey, {
      oldRange: {
        min: rangeWithToken.queryRange.min,
        max: rangeWithToken.queryRange.max,
        isMinInclusive: true, // Assumption: min is always inclusive
        isMaxInclusive: false, // Assumption: max is always exclusive
      },
      newRanges: overlappingRanges.map((range) => ({
        min: range.minInclusive,
        max: range.maxExclusive,
        isMinInclusive: true,
        isMaxInclusive: false,
      })),
      continuationToken: rangeWithToken.continuationToken,
    });
  }

  /**
   * Creates a QueryRangeWithContinuationToken object from a DocumentProducer.
   * Uses the DocumentProducer's target partition key range and continuation token.
   * @param documentProducer - The DocumentProducer to convert
   * @returns QueryRangeWithContinuationToken object for token operations
   */
  private createQueryRangeWithContinuationToken(
    documentProducer: DocumentProducer,
  ): QueryRangeWithContinuationToken {
    const partitionRange = documentProducer.targetPartitionKeyRange;

    // Create a simplified QueryRange using the partition key range boundaries
    const simplifiedQueryRange: RangeBoundary = {
      min: documentProducer.startEpk || partitionRange.minInclusive,
      max: documentProducer.endEpk || partitionRange.maxExclusive,
    };

    return {
      queryRange: simplifiedQueryRange,
      continuationToken: documentProducer.continuationToken,
    };
  }
}
