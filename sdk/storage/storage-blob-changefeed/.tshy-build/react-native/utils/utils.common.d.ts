import type { AbortSignalLike } from "@azure/abort-controller";
import type { ContainerClient, CommonOptions } from "@azure/storage-blob";
import type { BlobChangeFeedEvent } from "../models/BlobChangeFeedEvent.js";
export declare function ceilToNearestHour(date: Date | undefined): Date | undefined;
export declare function floorToNearestHour(date: Date | undefined): Date | undefined;
/**
 * Get host from an URL string.
 *
 * @param url - Source URL string
 */
export declare function getHost(url: string): string | undefined;
/**
 * Options to configure {@link getYearsPaths} operation.
 */
export interface GetYearsPathsOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
export declare function getYearsPaths(containerClient: ContainerClient, options?: GetYearsPathsOptions): Promise<number[]>;
/**
 * Options to configure {@link getSegmentsInYear} operation.
 */
export interface GetSegmentsInYearOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
export declare function getSegmentsInYear(containerClient: ContainerClient, year: number, startTime?: Date, endTime?: Date, options?: GetSegmentsInYearOptions): Promise<string[]>;
export declare function parseDateFromSegmentPath(segmentPath: string): Date;
export declare function minDate(dateA: Date, dateB?: Date): Date;
export declare function rawEventToBlobChangeFeedEvent(rawEvent: Record<string, any>): BlobChangeFeedEvent;
//# sourceMappingURL=utils.common.d.ts.map