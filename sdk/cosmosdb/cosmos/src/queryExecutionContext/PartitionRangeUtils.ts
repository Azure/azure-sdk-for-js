// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Calculates offset/limit values after consuming each partition range sequentially
 * @param partitionKeyRangeMap - Map of range IDs to range mappings
 * @param initialOffset - Initial offset value
 * @param initialLimit - Initial limit value
 * @returns Updated partition key range map with calculated offset/limit values and updated itemCount
 * @hidden
 */
export function calculateOffsetLimitForPartitionRanges(
  partitionKeyRangeMap: Map<string, any>,
  initialOffset: number,
  initialLimit: number,
): Map<string, any> {
  if (!partitionKeyRangeMap || partitionKeyRangeMap.size === 0) {
    return partitionKeyRangeMap;
  }

  const updatedMap = new Map<string, any>();
  let currentOffset = initialOffset;
  let currentLimit = initialLimit;

  for (const [rangeId, rangeMapping] of partitionKeyRangeMap) {
    const { itemCount } = rangeMapping;

    let offsetAfterThisRange = currentOffset;
    let limitAfterThisRange = currentLimit;
    let updatedItemCount = itemCount;

    if (itemCount > 0) {
      if (currentOffset > 0) {
        // Calculate how much offset this range consumes
        const offsetConsumption = Math.min(currentOffset, itemCount);
        offsetAfterThisRange = currentOffset - offsetConsumption;

        // Calculate remaining items after offset consumption
        const remainingItems = itemCount - offsetConsumption;
        
        if (remainingItems > 0 && currentLimit > 0) {
          // Apply limit to remaining items
          const limitConsumption = Math.min(currentLimit, remainingItems);
          limitAfterThisRange = currentLimit - limitConsumption;
          // Update item count to reflect actual items that will be returned from this range
          updatedItemCount = limitConsumption;
        } else {
          // No items left after offset, or no limit remaining
          updatedItemCount = 0;
          limitAfterThisRange = currentLimit;
        }
      } else if (currentLimit > 0) {
        // No offset, but limit applies
        const limitConsumption = Math.min(currentLimit, itemCount);
        limitAfterThisRange = currentLimit - limitConsumption;
        offsetAfterThisRange = 0;
        // Update item count to reflect actual items that will be returned from this range
        updatedItemCount = limitConsumption;
      } else {
        // No limit remaining - this range contributes 0 items
        updatedItemCount = 0;
      }

      // Update running totals for next iteration
      currentOffset = offsetAfterThisRange;
      currentLimit = limitAfterThisRange;
    } else {
      // Range has no items to begin with
      updatedItemCount = 0;
    }

    updatedMap.set(rangeId, {
      ...rangeMapping,
      offset: offsetAfterThisRange,
      limit: limitAfterThisRange,
      itemCount: updatedItemCount,
    });
  }

  return updatedMap;
}

/**
 * Processes distinct query logic and updates partition key range map with hashedLastResult
 * @param originalBuffer - Original buffer containing query results
 * @param partitionKeyRangeMap - Map of partition key ranges
 * @param hashFunction - Hash function for items
 * @returns Updated partition key range map with hashedLastResult for each range
 * @hidden
 */
export async function processDistinctQueryAndUpdateRangeMap(
  originalBuffer: any[],
  partitionKeyRangeMap: Map<string, any>,
  hashFunction: (item: any) => Promise<string>,
): Promise<Map<string, any>> {
  if (!partitionKeyRangeMap || partitionKeyRangeMap.size === 0) {
    return partitionKeyRangeMap;
  }

  const updatedMap = new Map<string, any>();
  let bufferIndex = 0;

  for (const [rangeId, rangeMapping] of partitionKeyRangeMap) {
    const { itemCount } = rangeMapping;

    let lastHashForThisRange: string | undefined;

    if (itemCount > 0 && bufferIndex < originalBuffer.length) {
      const rangeEndIndex = Math.min(bufferIndex + itemCount, originalBuffer.length);
      const lastItemIndex = rangeEndIndex - 1;

      const lastItem = originalBuffer[lastItemIndex];
      if (lastItem) {
        lastHashForThisRange = await hashFunction(lastItem);
      }
      bufferIndex = rangeEndIndex;
    }

    updatedMap.set(rangeId, {
      ...rangeMapping,
      hashedLastResult: lastHashForThisRange,
    });
  }

  return updatedMap;
}
