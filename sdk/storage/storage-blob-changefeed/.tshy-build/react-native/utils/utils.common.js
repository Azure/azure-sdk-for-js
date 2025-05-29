// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __asyncValues } from "tslib";
import { CHANGE_FEED_SEGMENT_PREFIX, CHANGE_FEED_INITIALIZATION_SEGMENT } from "./constants.js";
import { tracingClient } from "./tracing.js";
const millisecondsInAnHour = 60 * 60 * 1000;
export function ceilToNearestHour(date) {
    if (date === undefined) {
        return undefined;
    }
    return new Date(Math.ceil(date.getTime() / millisecondsInAnHour) * millisecondsInAnHour);
}
export function floorToNearestHour(date) {
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
export function getHost(url) {
    const urlParsed = new URL(url);
    return urlParsed.hostname;
}
export async function getYearsPaths(containerClient, options = {}) {
    return tracingClient.withSpan("getYearsPaths", options, async (updatedOptions) => {
        var _a, e_1, _b, _c;
        const years = [];
        try {
            for (var _d = true, _e = __asyncValues(containerClient.listBlobsByHierarchy("/", {
                abortSignal: options.abortSignal,
                tracingOptions: updatedOptions.tracingOptions,
                prefix: CHANGE_FEED_SEGMENT_PREFIX,
            })), _f; _f = await _e.next(), _a = _f.done, !_a; _d = true) {
                _c = _f.value;
                _d = false;
                const item = _c;
                if (item.kind === "prefix" && !item.name.includes(CHANGE_FEED_INITIALIZATION_SEGMENT)) {
                    const yearStr = item.name.slice(CHANGE_FEED_SEGMENT_PREFIX.length, -1);
                    years.push(parseInt(yearStr));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) await _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return years.sort((a, b) => a - b);
    });
}
export async function getSegmentsInYear(containerClient, year, startTime, endTime, options = {}) {
    return tracingClient.withSpan("getSegmentsInYear", options, async (updatedOptions) => {
        var _a, e_2, _b, _c;
        const segments = [];
        const yearBeginTime = new Date(Date.UTC(year, 0));
        if (endTime && yearBeginTime >= endTime) {
            return segments;
        }
        const prefix = `${CHANGE_FEED_SEGMENT_PREFIX}${year}/`;
        try {
            for (var _d = true, _e = __asyncValues(containerClient.listBlobsFlat({
                prefix,
                abortSignal: options.abortSignal,
                tracingOptions: updatedOptions.tracingOptions,
            })), _f; _f = await _e.next(), _a = _f.done, !_a; _d = true) {
                _c = _f.value;
                _d = false;
                const item = _c;
                const segmentTime = parseDateFromSegmentPath(item.name);
                if ((startTime && segmentTime < startTime) || (endTime && segmentTime >= endTime)) {
                    continue;
                }
                segments.push(item.name);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) await _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return segments;
    });
}
export function parseDateFromSegmentPath(segmentPath) {
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
export function minDate(dateA, dateB) {
    if (dateB && dateB < dateA) {
        return dateB;
    }
    return dateA;
}
export function rawEventToBlobChangeFeedEvent(rawEvent) {
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
            const updatedBlobProperties = {};
            Object.entries(rawEvent.data.blobPropertiesUpdated).map((item) => {
                const blobPropertyChange = {
                    propertyName: item[0],
                    oldValue: item[1].previous,
                    newValue: item[1].current,
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
    return rawEvent;
}
//# sourceMappingURL=utils.common.js.map