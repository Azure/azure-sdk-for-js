// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ChangeFeedIteratorOptions } from "./ChangeFeedIteratorOptions.js";
import { ErrorResponse } from "../../request/index.js";
import type { PartitionKeyRange } from "../Container/index.js";
import type { InternalChangeFeedIteratorOptions } from "./InternalChangeFeedOptions.js";
import { isPrimitivePartitionKeyValue } from "../../utils/typeChecks.js";
import type { ChangeFeedStartFrom } from "./ChangeFeedStartFrom.js";
import { ChangeFeedStartFromBeginning } from "./ChangeFeedStartFromBeginning.js";
import { Constants } from "../../common/index.js";
import { ChangeFeedStartFromTime } from "./ChangeFeedStartFromTime.js";
import { QueryRange } from "../../routing/index.js";
import { FeedRangeInternal } from "./FeedRange.js";
import { hashV2PartitionKey } from "../../utils/hashing/v2.js";
import { PartitionKeyInternal } from "../../documents/PartitionKeyInternal.js";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import { EncryptionProcessor } from "../../encryption/index.js";
import { ChangeFeedMode } from "./ChangeFeedMode.js";
import { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse.js";

/**
 * @hidden
 * Validates the change feed options passed by the user
 */
export function validateChangeFeedIteratorOptions(options: ChangeFeedIteratorOptions): void {
  if (!isChangeFeedIteratorOptions(options)) {
    throw new ErrorResponse("Invalid Changefeed Iterator Options.");
  }
  if (options?.maxItemCount && typeof options?.maxItemCount !== "number") {
    throw new ErrorResponse("maxItemCount must be number");
  }
  if (options?.maxItemCount !== undefined && options?.maxItemCount < 1) {
    throw new ErrorResponse("maxItemCount must be a positive number");
  }
}

function isChangeFeedIteratorOptions(options: unknown): options is ChangeFeedIteratorOptions {
  if (typeof options !== "object") {
    return false;
  }
  if (Object.keys(options).length === 0 && JSON.stringify(options) === "{}") {
    return true;
  }
  return options && !(isPrimitivePartitionKeyValue(options) || Array.isArray(options));
}

/**
 * @hidden
 * Checks if pkRange entirely covers the given overLapping range or there is only partial overlap.
 *
 * If no complete overlap, exact range which overlaps is retured which is used to set minEpk and maxEpk headers while quering change feed.
 */
export async function extractOverlappingRanges(
  epkRange: QueryRange,
  overLappingRange: PartitionKeyRange,
): Promise<[string, string]> {
  if (
    overLappingRange.minInclusive >= epkRange.min &&
    overLappingRange.maxExclusive <= epkRange.max
  ) {
    return [undefined, undefined];
  } else if (
    overLappingRange.minInclusive <= epkRange.min &&
    overLappingRange.maxExclusive >= epkRange.max
  ) {
    return [epkRange.min, epkRange.max];
  }
  // Right Side of overlapping range is covered
  else if (
    overLappingRange.minInclusive <= epkRange.min &&
    overLappingRange.maxExclusive <= epkRange.max &&
    overLappingRange.maxExclusive >= epkRange.min
  ) {
    return [epkRange.min, overLappingRange.maxExclusive];
  }
  // Left Side of overlapping range is covered
  else {
    return [overLappingRange.minInclusive, epkRange.max];
  }
}

/**
 * @hidden
 * Checks if the object is a valid EpkRange
 */
export function isEpkRange(obj: unknown): boolean {
  return (
    obj instanceof FeedRangeInternal &&
    typeof obj.minInclusive === "string" &&
    typeof obj.maxExclusive === "string" &&
    obj.minInclusive >=
      Constants.EffectivePartitionKeyConstants.MinimumInclusiveEffectivePartitionKey &&
    obj.maxExclusive <=
      Constants.EffectivePartitionKeyConstants.MaximumExclusiveEffectivePartitionKey &&
    obj.maxExclusive > obj.minInclusive
  );
}

/**
 * @hidden
 */
export function buildInternalChangeFeedOptions(
  options: ChangeFeedIteratorOptions,
  continuationToken?: string,
  startTime?: Date,
  startFromNow?: boolean,
): InternalChangeFeedIteratorOptions {
  const internalCfOptions = {} as InternalChangeFeedIteratorOptions;
  internalCfOptions.maxItemCount = options?.maxItemCount;
  internalCfOptions.sessionToken = options?.sessionToken;
  internalCfOptions.continuationToken = continuationToken;
  internalCfOptions.changeFeedMode = options?.changeFeedMode;
  internalCfOptions.excludedLocations = options?.excludedLocations;
  // Default option of changefeed is to start from now.
  if (startFromNow) {
    internalCfOptions.startFromNow = true;
  } else {
    internalCfOptions.startTime = startTime;
  }
  return internalCfOptions;
}
/**
 * @hidden
 */
export function fetchStartTime(changeFeedStartFrom: ChangeFeedStartFrom): Date | undefined {
  if (changeFeedStartFrom instanceof ChangeFeedStartFromBeginning) {
    return undefined;
  } else if (changeFeedStartFrom instanceof ChangeFeedStartFromTime) {
    return changeFeedStartFrom.getStartTime();
  }
}

/**
 * @hidden
 */
export function isNullOrEmpty(text: string | null | undefined): boolean {
  return text === null || text === undefined || text.trim() === "";
}

/**
 * @hidden
 */
export async function getEPKRangeForPrefixPartitionKey(
  internalPartitionKey: PartitionKeyInternal,
): Promise<QueryRange> {
  const minEPK = getEffectivePartitionKeyForMultiHashPartitioning(internalPartitionKey);
  const maxEPK =
    minEPK + Constants.EffectivePartitionKeyConstants.MaximumExclusiveEffectivePartitionKey;
  return new QueryRange(minEPK, maxEPK, true, false);
}

/**
 * @hidden
 */
export function getEffectivePartitionKeyForMultiHashPartitioning(
  partitionKeyInternal: PartitionKeyInternal,
): string {
  const hashArray = partitionKeyInternal.map((item) => hashV2PartitionKey([item]));
  return hashArray.join("");
}

/**
 * @hidden
 */
export async function decryptChangeFeedResponse(
  result: ChangeFeedIteratorResponse<any>,
  diagnosticNode: DiagnosticNodeInternal,
  changeFeedMode: ChangeFeedMode,
  encryptionProcessor: EncryptionProcessor,
): Promise<void> {
  let count = 0;
  diagnosticNode.beginEncryptionDiagnostics(Constants.Encryption.DiagnosticsDecryptOperation);
  for (let item of result.result) {
    if (changeFeedMode === ChangeFeedMode.AllVersionsAndDeletes) {
      if ("current" in item && item.current !== null) {
        const { body, propertiesDecryptedCount } = await encryptionProcessor.decrypt(item.current);
        item.current = body;
        count += propertiesDecryptedCount;
      }
      if ("previous" in item && item.previous !== null) {
        const { body, propertiesDecryptedCount } = await encryptionProcessor.decrypt(item.previous);
        item.previous = body;
        count += propertiesDecryptedCount;
      }
    } else {
      const { body, propertiesDecryptedCount } = await encryptionProcessor.decrypt(item);
      item = body;
      count += propertiesDecryptedCount;
    }
  }
  diagnosticNode.endEncryptionDiagnostics(Constants.Encryption.DiagnosticsDecryptOperation, count);
}
