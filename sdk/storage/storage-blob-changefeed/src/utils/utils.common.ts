// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { ContainerClient, CommonOptions } from "@azure/storage-blob";
import { CHANGE_FEED_SEGMENT_PREFIX, CHANGE_FEED_INITIALIZATION_SEGMENT } from "./constants";
import { createSpan } from "./tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import { BlobChangeFeedEvent, UpdatedBlobProperties } from "../models/BlobChangeFeedEvent";

const millisecondsInAnHour = 60 * 60 * 1000;
export function ceilToNearestHour(date: Date | undefined): Date | undefined {
  if (date === undefined) {
    return undefined;
  }
  return new Date(Math.ceil(date.getTime() / millisecondsInAnHour) * millisecondsInAnHour);
}

export function floorToNearestHour(date: Date | undefined): Date | undefined {
  if (date === undefined) {
    return undefined;
  }
  return new Date(Math.floor(date.getTime() / millisecondsInAnHour) * millisecondsInAnHour);
}

/**
 * Get host from an URL string.
 *
 * @param url - Source URL string
 */
export function getHost(url: string): string | undefined {
  const urlParsed = new URL(url);
  return urlParsed.hostname;
}

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

export async function getYearsPaths(
  containerClient: ContainerClient,
  options: GetYearsPathsOptions = {}
): Promise<number[]> {
  const { span, updatedOptions } = createSpan("getYearsPaths", options);
  try {
    const years: number[] = [];
    for await (const item of containerClient.listBlobsByHierarchy("/", {
      abortSignal: options.abortSignal,
      tracingOptions: updatedOptions.tracingOptions,
      prefix: CHANGE_FEED_SEGMENT_PREFIX,
    })) {
      if (item.kind === "prefix" && !item.name.includes(CHANGE_FEED_INITIALIZATION_SEGMENT)) {
        const yearStr = item.name.slice(CHANGE_FEED_SEGMENT_PREFIX.length, -1);
        years.push(parseInt(yearStr));
      }
    }
    return years.sort((a, b) => a - b);
  } catch (e: any) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: e.message,
    });
    throw e;
  } finally {
    span.end();
  }
}

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

export async function getSegmentsInYear(
  containerClient: ContainerClient,
  year: number,
  startTime?: Date,
  endTime?: Date,
  options: GetSegmentsInYearOptions = {}
): Promise<string[]> {
  const { span, updatedOptions } = createSpan("getSegmentsInYear", options);

  try {
    const segments: string[] = [];
    const yearBeginTime = new Date(Date.UTC(year, 0));
    if (endTime && yearBeginTime >= endTime) {
      return segments;
    }

    const prefix = `${CHANGE_FEED_SEGMENT_PREFIX}${year}/`;
    for await (const item of containerClient.listBlobsFlat({
      prefix,
      abortSignal: options.abortSignal,
      tracingOptions: updatedOptions.tracingOptions,
    })) {
      const segmentTime = parseDateFromSegmentPath(item.name);
      if ((startTime && segmentTime < startTime) || (endTime && segmentTime >= endTime)) {
        continue;
      }
      segments.push(item.name);
    }
    return segments;
  } catch (e: any) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: e.message,
    });
    throw e;
  } finally {
    span.end();
  }
}

export function parseDateFromSegmentPath(segmentPath: string): Date {
  const splitPath = segmentPath.split("/");
  if (splitPath.length < 3) {
    throw new Error(`${segmentPath} is not a valid segment path.`);
  }

  const segmentTime = new Date(0);
  segmentTime.setUTCFullYear(parseInt(splitPath[2]));

  if (splitPath.length >= 4) {
    segmentTime.setUTCMonth(parseInt(splitPath[3]) - 1);
  }
  if (splitPath.length >= 5) {
    segmentTime.setUTCDate(parseInt(splitPath[4]));
  }
  if (splitPath.length >= 6) {
    segmentTime.setUTCHours(parseInt(splitPath[5]) / 100);
  }
  return segmentTime;
}

export function minDate(dateA: Date, dateB?: Date): Date {
  if (dateB && dateB < dateA) {
    return dateB;
  }
  return dateA;
}

export function rawEventToBlobChangeFeedEvent(rawEvent: Record<string, any>): BlobChangeFeedEvent {
  if (rawEvent.eventTime) {
    rawEvent.eventTime = new Date(rawEvent.eventTime);
  }
  if (rawEvent.eTag) {
    rawEvent.etag = rawEvent.eTag;
    delete rawEvent.eTag;
  }
  if (rawEvent.data) {
    if (rawEvent.data.recursive !== undefined) {
      rawEvent.data.isRecursive = rawEvent.data.recursive;
      delete rawEvent.data.recursive;
    }
    if (rawEvent.data.previousInfo) {
      const previousInfo = rawEvent.data.previousInfo;

      if (previousInfo.SoftDeleteSnapshot) {
        previousInfo.softDeleteSnapshot = previousInfo.SoftDeleteSnapshot;
        delete previousInfo.SoftDeleteSnapshot;
      }
      if (previousInfo.WasBlobSoftDeleted) {
        previousInfo.isBlobSoftDeleted = previousInfo.WasBlobSoftDeleted === "true";
        delete previousInfo.WasBlobSoftDeleted;
      }
      if (previousInfo.BlobVersion) {
        previousInfo.newBlobVersion = previousInfo.BlobVersion;
        delete previousInfo.BlobVersion;
      }
      if (previousInfo.LastVersion) {
        previousInfo.oldBlobVersion = previousInfo.LastVersion;
        delete previousInfo.LastVersion;
      }
      if (previousInfo.PreviousTier) {
        previousInfo.previousTier = previousInfo.PreviousTier;
        delete previousInfo.PreviousTier;
      }

      rawEvent.data.previousInfo = previousInfo;
    }

    if (rawEvent.data.blobPropertiesUpdated) {
      const updatedBlobProperties: UpdatedBlobProperties = {};
      Object.entries(rawEvent.data.blobPropertiesUpdated).map((item) => {
        const blobPropertyChange = {
          propertyName: item[0],
          oldValue: (item[1] as any).previous as string,
          newValue: (item[1] as any).current as string,
        };
        updatedBlobProperties[item[0]] = blobPropertyChange;
      });
      rawEvent.data.updatedBlobProperties = updatedBlobProperties;
      delete rawEvent.data.blobPropertiesUpdated;
    }

    if (rawEvent.data.asyncOperationInfo) {
      const longRunningOperationInfo = rawEvent.data.asyncOperationInfo;
      if (longRunningOperationInfo.DestinationTier) {
        longRunningOperationInfo.destinationAccessTier = longRunningOperationInfo.DestinationTier;
        delete longRunningOperationInfo.DestinationTier;
      }
      if ("WasAsyncOperation" in longRunningOperationInfo) {
        longRunningOperationInfo.isAsync = longRunningOperationInfo.WasAsyncOperation === "true";
        delete longRunningOperationInfo.WasAsyncOperation;
      }
      if (longRunningOperationInfo.CopyId) {
        longRunningOperationInfo.copyId = longRunningOperationInfo.CopyId;
        delete longRunningOperationInfo.CopyId;
      }
      rawEvent.data.longRunningOperationInfo = longRunningOperationInfo;
      delete rawEvent.data.asyncOperationInfo;
    }

    if (rawEvent.data.blobTagsUpdated) {
      rawEvent.data.updatedBlobTags = {
        newTags: rawEvent.data.blobTagsUpdated.current,
        oldTags: rawEvent.data.blobTagsUpdated.previous,
      };

      delete rawEvent.data.blobTagsUpdated;
    }

    if (rawEvent.data.blobTier) {
      rawEvent.data.blobAccessTier = rawEvent.data.blobTier;
      delete rawEvent.data.blobTier;
    }
  }

  return rawEvent as BlobChangeFeedEvent;
}
