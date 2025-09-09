// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Calculates offset/limit values after consuming each partition range sequentially
 * @param partitionKeyRangeMap - Map of range IDs to range mappings
 * @param initialOffset - Initial offset value
 * @param initialLimit - Initial limit value
 * @returns Updated partition key range map with calculated offset/limit values
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

    if (itemCount > 0) {
      if (currentOffset > 0) {
        const offsetConsumption = Math.min(currentOffset, itemCount);
        offsetAfterThisRange = currentOffset - offsetConsumption;

        const remainingItems = itemCount - offsetConsumption;
        if (remainingItems > 0 && currentLimit > 0) {
          const limitConsumption = Math.min(currentLimit, remainingItems);
          limitAfterThisRange = currentLimit - limitConsumption;
        } else {
          limitAfterThisRange = currentLimit;
        }
      } else if (currentLimit > 0) {
        const limitConsumption = Math.min(currentLimit, itemCount);
        limitAfterThisRange = currentLimit - limitConsumption;
        offsetAfterThisRange = 0;
      }

      currentOffset = offsetAfterThisRange;
      currentLimit = limitAfterThisRange;
    }

    updatedMap.set(rangeId, {
      ...rangeMapping,
      offset: offsetAfterThisRange,
      limit: limitAfterThisRange,
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
