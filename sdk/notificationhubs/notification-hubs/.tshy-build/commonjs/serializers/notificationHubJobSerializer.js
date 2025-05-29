"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeNotificationHubJobEntry = serializeNotificationHubJobEntry;
exports.parseNotificationHubJobEntry = parseNotificationHubJobEntry;
exports.parseNotificationHubJobFeed = parseNotificationHubJobFeed;
const utils_js_1 = require("../utils/utils.js");
const core_xml_1 = require("@azure/core-xml");
const xmlUtils_js_1 = require("../utils/xmlUtils.js");
/**
 * @internal
 * Serializes a NotificationHubJob into an Atom XML entry.
 * @param entry - The NotificationHubJob to turn into an Atom XML entry.
 * @returns An Atom XML entry containing the notification hub job.
 */
function serializeNotificationHubJobEntry(entry) {
    const job = {
        Type: entry.type,
        OutputContainerUri: { __cdata: entry.outputContainerUrl },
        ImportFileUri: (0, utils_js_1.isDefined)(entry.importFileUrl) ? { __cdata: entry.importFileUrl } : undefined,
    };
    const requestObject = (0, xmlUtils_js_1.serializeToAtomXmlRequest)("NotificationHubJob", job);
    return (0, core_xml_1.stringifyXML)(requestObject, { rootName: "entry", cdataPropName: "__cdata" });
}
/**
 * Parses an Atom XML of an notification hub job entry.
 * @param bodyText - The incoming Atom XML entry to parse into a notification hub job.
 * @returns A parsed NotificationHubJob.
 */
async function parseNotificationHubJobEntry(bodyText) {
    const xml = await (0, core_xml_1.parseXML)(bodyText, { includeRoot: true });
    const content = xml.entry.content.NotificationHubJob;
    return createNotificationHubJob(content);
}
/**
 * Parses an Atom XML feed of notification hub jobs.
 * @param bodyText - The incoming Atom XML feed to parse into notification hub jobs.
 * @returns A list of notification hub jobs.
 */
async function parseNotificationHubJobFeed(bodyText) {
    const xml = await (0, core_xml_1.parseXML)(bodyText, { includeRoot: true });
    const results = [];
    if (!(0, utils_js_1.isDefined)(xml.feed.entry)) {
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
    if ((0, utils_js_1.isDefined)(content["OutputProperties"])) {
        outputProperties = createInputOutputProperties(content["OutputProperties"]);
    }
    let inputProperties;
    if ((0, utils_js_1.isDefined)(content["InputProperties"])) {
        inputProperties = createInputOutputProperties(content["InputProperties"]);
    }
    return {
        jobId: (_a = (0, utils_js_1.getStringOrUndefined)(content["JobId"])) === null || _a === void 0 ? void 0 : _a.trim(),
        type: (0, utils_js_1.getString)(content["Type"], "type").trim(),
        status: (_b = (0, utils_js_1.getStringOrUndefined)(content["Status"])) === null || _b === void 0 ? void 0 : _b.trim(),
        progress: (0, utils_js_1.getFloatOrUndefined)(content["Progress"]),
        outputContainerUrl: (0, utils_js_1.getString)(content["OutputContainerUri"], "outputContainerUrl").trim(),
        importFileUrl: (_c = (0, utils_js_1.getStringOrUndefined)(content["ImportFileUri"])) === null || _c === void 0 ? void 0 : _c.trim(),
        failure: (_d = (0, utils_js_1.getStringOrUndefined)(content["Failure"])) === null || _d === void 0 ? void 0 : _d.trim(),
        createdAt: (0, utils_js_1.getDateOrUndefined)(content["CreatedAt"]),
        updatedAt: (0, utils_js_1.getDateOrUndefined)(content["UpdatedAt"]),
        inputProperties,
        outputProperties,
    };
}
//# sourceMappingURL=notificationHubJobSerializer.js.map