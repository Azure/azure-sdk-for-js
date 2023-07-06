// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ChangeFeedIteratorOptions } from "./ChangeFeedIteratorOptions";
import { ErrorResponse } from "../../request";
import { PartitionKeyRange } from "../Container";
import { ChangeFeedRange } from "./ChangeFeedRange";

export function validateChangeFeedOptions(options: ChangeFeedIteratorOptions): void {
  if (options?.maxItemCount && typeof options?.maxItemCount !== "number") {
    throw new ErrorResponse("maxItemCount must be number");
  }

  if (options?.maxItemCount && options?.maxItemCount < 1) {
    throw new ErrorResponse("maxItemCount must be a positive number");
  }

  if (options?.epkRange && options?.partitionKey) {
    throw new ErrorResponse("PartitionKey and EpkRange cannot be specified at the same time");
  }

  if (isMoreThanOneStartFromKeyPresent(options)) {
    throw new ErrorResponse(
      "Only one of startFromBeginning, startFromNow, startTime, continuationToken can be specified"
    );
  }
}

/**
 * Checks if more than one option is passed from where changefeed should start.
 */
const isMoreThanOneStartFromKeyPresent = (options: ChangeFeedIteratorOptions): boolean => {
  const keys = ["continuationToken", "startTime", "startFromBeginning", "startFromNow"];
  const presentKeys = Object.keys(options).filter((key) => keys.includes(key));
  return presentKeys.length > 1;
};

/**
 * Checks if pkRange entirely covers the given overLapping range or there is only partial overlap.
 *
 * If no complete overlap, exact range which overlaps is retured which is used to set minEpk and maxEpk headers while quering change feed.
 */
export async function checkEpkHeaders(
  pkRange: PartitionKeyRange | ChangeFeedRange,
  overLappingRange: PartitionKeyRange
): Promise<[string, string]> {
  if (
    overLappingRange.minInclusive >= pkRange.minInclusive &&
    overLappingRange.maxExclusive <= pkRange.maxExclusive
  ) {
    return [undefined, undefined];
  } else if (
    overLappingRange.minInclusive <= pkRange.minInclusive &&
    overLappingRange.maxExclusive >= pkRange.maxExclusive
  ) {
    return [pkRange.minInclusive, pkRange.maxExclusive];
  }
  // Right Side of overlapping range is covered
  else if (
    overLappingRange.minInclusive <= pkRange.minInclusive &&
    overLappingRange.maxExclusive <= pkRange.maxExclusive &&
    overLappingRange.maxExclusive >= pkRange.minInclusive
  ) {
    return [pkRange.minInclusive, overLappingRange.maxExclusive];
  }
  // Left Side of overlapping range is covered
  else {
    return [overLappingRange.minInclusive, pkRange.maxExclusive];
  }
}

export function isEpkRange(obj: any): obj is PartitionKeyRange {
  return (
    obj &&
    typeof obj.id === "string" &&
    typeof obj.minInclusive === "string" &&
    typeof obj.maxExclusive === "string" &&
    typeof obj.ridPrefix === "number" &&
    typeof obj.throughputFraction === "number" &&
    typeof obj.id === "string" &&
    typeof obj.status === "string" &&
    typeof obj.parents === "object"
  );
}
