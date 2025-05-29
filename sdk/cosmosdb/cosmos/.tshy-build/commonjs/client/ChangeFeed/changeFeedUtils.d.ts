import type { ChangeFeedIteratorOptions } from "./ChangeFeedIteratorOptions.js";
import type { PartitionKeyRange } from "../Container/index.js";
import type { InternalChangeFeedIteratorOptions } from "./InternalChangeFeedOptions.js";
import type { ChangeFeedStartFrom } from "./ChangeFeedStartFrom.js";
import { QueryRange } from "../../routing/index.js";
import { PartitionKeyInternal } from "../../documents/PartitionKeyInternal.js";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import { EncryptionProcessor } from "../../encryption/index.js";
import { ChangeFeedMode } from "./ChangeFeedMode.js";
import { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse.js";
/**
 * @hidden
 * Validates the change feed options passed by the user
 */
export declare function validateChangeFeedIteratorOptions(options: ChangeFeedIteratorOptions): void;
/**
 * @hidden
 * Checks if pkRange entirely covers the given overLapping range or there is only partial overlap.
 *
 * If no complete overlap, exact range which overlaps is retured which is used to set minEpk and maxEpk headers while quering change feed.
 */
export declare function extractOverlappingRanges(epkRange: QueryRange, overLappingRange: PartitionKeyRange): Promise<[string, string]>;
/**
 * @hidden
 * Checks if the object is a valid EpkRange
 */
export declare function isEpkRange(obj: unknown): boolean;
/**
 * @hidden
 */
export declare function buildInternalChangeFeedOptions(options: ChangeFeedIteratorOptions, continuationToken?: string, startTime?: Date, startFromNow?: boolean): InternalChangeFeedIteratorOptions;
/**
 * @hidden
 */
export declare function fetchStartTime(changeFeedStartFrom: ChangeFeedStartFrom): Date | undefined;
/**
 * @hidden
 */
export declare function isNullOrEmpty(text: string | null | undefined): boolean;
/**
 * @hidden
 */
export declare function getEPKRangeForPrefixPartitionKey(internalPartitionKey: PartitionKeyInternal): Promise<QueryRange>;
/**
 * @hidden
 */
export declare function getEffectivePartitionKeyForMultiHashPartitioning(partitionKeyInternal: PartitionKeyInternal): string;
/**
 * @hidden
 */
export declare function decryptChangeFeedResponse(result: ChangeFeedIteratorResponse<any>, diagnosticNode: DiagnosticNodeInternal, changeFeedMode: ChangeFeedMode, encryptionProcessor: EncryptionProcessor): Promise<void>;
//# sourceMappingURL=changeFeedUtils.d.ts.map