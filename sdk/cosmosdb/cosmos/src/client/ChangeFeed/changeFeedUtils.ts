// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ChangeFeedIteratorOptions } from "./ChangeFeedIteratorOptions";
import { ErrorResponse } from "../../request";
import { PartitionKeyRange } from "../Container";
import { ChangeFeedRange } from "./ChangeFeedRange";
import { ChangeFeedStartFrom } from "./ChangeFeedEnums";
import { InternalChangeFeedIteratorOptions } from "./InternalChangeFeedOptions";

/**
 *
 * @internal
 *
 * Validates the change feed options passed by the user
 */
export function validateChangeFeedOptions(options: ChangeFeedIteratorOptions): void {
  if (options?.maxItemCount && typeof options?.maxItemCount !== "number") {
    throw new ErrorResponse("maxItemCount must be number");
  }
  if (options?.maxItemCount !== undefined && options?.maxItemCount < 1) {
    throw new ErrorResponse("maxItemCount must be a positive number");
  }
}

/**
 * @internal
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
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * @interal
 * Checks if the object is a valid EpkRange
 */
export function isEpkRange(obj: any): obj is PartitionKeyRange {
  return (
    obj &&
    typeof obj.minInclusive === "string" &&
    typeof obj.maxExclusive === "string" &&
    obj.minInclusive >= "" &&
    obj.maxExclusive <= "FF" &&
    obj.maxExclusive > obj.minInclusive
  );
}

/**
 * @internal
 * Converts changeFeedIteratorOptions to InternalChangeFeedIteratorOptions used internally only.
 */
export function buildInternalChangeFeedOptions(
  options: ChangeFeedIteratorOptions
): InternalChangeFeedIteratorOptions {
  const returnOptions = {} as InternalChangeFeedIteratorOptions;
  returnOptions.maxItemCount = options?.maxItemCount;
  returnOptions.sessionToken = options?.sessionToken;
  returnOptions.continuationToken =
    options?.changeFeedStartType?.startFrom === ChangeFeedStartFrom.ContinuationToken
      ? options.changeFeedStartType.continuationToken
      : undefined;
  returnOptions.startTime =
    options?.changeFeedStartType?.startFrom === ChangeFeedStartFrom.StartTime
      ? options.changeFeedStartType.startTime
      : undefined;
  returnOptions.startTime =
    options?.changeFeedStartType?.startFrom === ChangeFeedStartFrom.Now
      ? new Date()
      : returnOptions.startTime;

  return returnOptions;
}
