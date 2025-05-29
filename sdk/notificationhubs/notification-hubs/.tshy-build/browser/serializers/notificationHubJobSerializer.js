// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getDateOrUndefined, getFloatOrUndefined, getString, getStringOrUndefined, isDefined, } from "../utils/utils.js";
import { parseXML, stringifyXML } from "@azure/core-xml";
import { serializeToAtomXmlRequest } from "../utils/xmlUtils.js";
/**
 * @internal
 * Serializes a NotificationHubJob into an Atom XML entry.
 * @param entry - The NotificationHubJob to turn into an Atom XML entry.
 * @returns An Atom XML entry containing the notification hub job.
 */
export function serializeNotificationHubJobEntry(entry) {
    const job = {
        Type: entry.type,
        OutputContainerUri: { __cdata: entry.outputContainerUrl },
        ImportFileUri: isDefined(entry.importFileUrl) ? { __cdata: entry.importFileUrl } : undefined,
    };
    const requestObject = serializeToAtomXmlRequest("NotificationHubJob", job);
    return stringifyXML(requestObject, { rootName: "entry", cdataPropName: "__cdata" });
}
/**
 * Parses an Atom XML of an notification hub job entry.
 * @param bodyText - The incoming Atom XML entry to parse into a notification hub job.
 * @returns A parsed NotificationHubJob.
 */
export async function parseNotificationHubJobEntry(bodyText) {
    const xml = await parseXML(bodyText, { includeRoot: true });
    const content = xml.entry.content.NotificationHubJob;
    return createNotificationHubJob(content);
}
/**
 * Parses an Atom XML feed of notification hub jobs.
 * @param bodyText - The incoming Atom XML feed to parse into notification hub jobs.
 * @returns A list of notification hub jobs.
 */
export async function parseNotificationHubJobFeed(bodyText) {
    const xml = await parseXML(bodyText, { includeRoot: true });
    const results = [];
    if (!isDefined(xml.feed.entry)) {
        return results;
    }
    const entries = Array.isArray(xml.feed.entry) ? xml.feed.entry : [xml.feed.entry];
    for (const item of entries) {
        results.push(createNotificationHubJob(item.content.NotificationHubJob));
    }
    return results;
}
function createInputOutputProperties(content) {
    const props = {};
    const keyValues = content["d3p1:KeyValueOfstringstring"];
    const keyValueArray = Array.isArray(keyValues) ? keyValues : [keyValues];
    for (const item of keyValueArray) {
        props[item["d3p1:Key"]] = item["d3p1:Value"];
    }
    return props;
}
function createNotificationHubJob(content) {
    var _a, _b, _c, _d;
    let outputProperties;
    if (isDefined(content["OutputProperties"])) {
        outputProperties = createInputOutputProperties(content["OutputProperties"]);
    }
    let inputProperties;
    if (isDefined(content["InputProperties"])) {
        inputProperties = createInputOutputProperties(content["InputProperties"]);
    }
    return {
        jobId: (_a = getStringOrUndefined(content["JobId"])) === null || _a === void 0 ? void 0 : _a.trim(),
        type: getString(content["Type"], "type").trim(),
        status: (_b = getStringOrUndefined(content["Status"])) === null || _b === void 0 ? void 0 : _b.trim(),
        progress: getFloatOrUndefined(content["Progress"]),
        outputContainerUrl: getString(content["OutputContainerUri"], "outputContainerUrl").trim(),
        importFileUrl: (_c = getStringOrUndefined(content["ImportFileUri"])) === null || _c === void 0 ? void 0 : _c.trim(),
        failure: (_d = getStringOrUndefined(content["Failure"])) === null || _d === void 0 ? void 0 : _d.trim(),
        createdAt: getDateOrUndefined(content["CreatedAt"]),
        updatedAt: getDateOrUndefined(content["UpdatedAt"]),
        inputProperties,
        outputProperties,
    };
}
//# sourceMappingURL=notificationHubJobSerializer.js.map