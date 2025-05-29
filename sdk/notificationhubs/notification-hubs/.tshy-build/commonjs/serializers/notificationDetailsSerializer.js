"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNotificationDetails = parseNotificationDetails;
const utils_js_1 = require("../utils/utils.js");
const core_xml_1 = require("@azure/core-xml");
/**
 * @internal
 * Parses a NotificationDetails from incoming XML.
 */
async function parseNotificationDetails(bodyText) {
    var _a, _b, _c, _d, _e, _f;
    const xml = await (0, core_xml_1.parseXML)(bodyText, {
        includeRoot: true,
    });
    const notificationDetails = xml["NotificationDetails"];
    let apnsOutcomeCounts;
    if ((0, utils_js_1.isDefined)(notificationDetails["ApnsOutcomeCounts"])) {
        apnsOutcomeCounts = parseOutcomeCounts(notificationDetails["ApnsOutcomeCounts"]["Outcome"]);
    }
    let admOutcomeCounts;
    if ((0, utils_js_1.isDefined)(notificationDetails["AdmOutcomeCounts"])) {
        admOutcomeCounts = parseOutcomeCounts(notificationDetails["AdmOutcomeCounts"]["Outcome"]);
    }
    let baiduOutcomeCounts;
    if ((0, utils_js_1.isDefined)(notificationDetails["BaiduOutcomeCounts"])) {
        baiduOutcomeCounts = parseOutcomeCounts(notificationDetails["BaiduOutcomeCounts"]["Outcome"]);
    }
    let browserOutcomeCounts;
    if ((0, utils_js_1.isDefined)(notificationDetails["BrowserOutcomeCounts"])) {
        browserOutcomeCounts = parseOutcomeCounts(notificationDetails["BrowserOutcomeCounts"]["Outcome"]);
    }
    let fcmOutcomeCounts;
    if ((0, utils_js_1.isDefined)(notificationDetails["GcmOutcomeCounts"])) {
        fcmOutcomeCounts = parseOutcomeCounts(notificationDetails["GcmOutcomeCounts"]["Outcome"]);
    }
    let fcmV1OutcomeCounts;
    if ((0, utils_js_1.isDefined)(notificationDetails["FcmV1OutcomeCounts"])) {
        fcmV1OutcomeCounts = parseOutcomeCounts(notificationDetails["FcmV1OutcomeCounts"]["Outcome"]);
    }
    let xiaomiOutcomeCounts;
    if ((0, utils_js_1.isDefined)(notificationDetails["XiaomiOutcomeCounts"])) {
        xiaomiOutcomeCounts = parseOutcomeCounts(notificationDetails["XiaomiOutcomeCounts"]["Outcome"]);
    }
    let wnsOutcomeCounts;
    if ((0, utils_js_1.isDefined)(notificationDetails["WnsOutcomeCounts"])) {
        wnsOutcomeCounts = parseOutcomeCounts(notificationDetails["WnsOutcomeCounts"]["Outcome"]);
    }
    return {
        notificationId: (_a = (0, utils_js_1.getStringOrUndefined)(notificationDetails["NotificationId"])) === null || _a === void 0 ? void 0 : _a.trim(),
        location: (_b = (0, utils_js_1.getStringOrUndefined)(notificationDetails["Location"])) === null || _b === void 0 ? void 0 : _b.trim(),
        state: (_c = (0, utils_js_1.getStringOrUndefined)(notificationDetails["State"])) === null || _c === void 0 ? void 0 : _c.trim(),
        enqueueTime: (0, utils_js_1.getDateOrUndefined)(notificationDetails["EnqueueTime"]),
        startTime: (0, utils_js_1.getDateOrUndefined)(notificationDetails["StartTime"]),
        endTime: (0, utils_js_1.getDateOrUndefined)(notificationDetails["EndTime"]),
        pnsErrorDetailsUrl: (_d = (0, utils_js_1.getStringOrUndefined)(notificationDetails["PnsErrorDetailsUri"])) === null || _d === void 0 ? void 0 : _d.trim(),
        targetPlatforms: (_e = (0, utils_js_1.getStringOrUndefined)(notificationDetails["TargetPlatforms"])) === null || _e === void 0 ? void 0 : _e.trim(),
        notificationBody: (_f = (0, utils_js_1.getStringOrUndefined)(notificationDetails["NotificationBody"])) === null || _f === void 0 ? void 0 : _f.trim(),
        apnsOutcomeCounts,
        admOutcomeCounts,
        baiduOutcomeCounts,
        browserOutcomeCounts,
        fcmOutcomeCounts,
        fcmV1OutcomeCounts,
        xiaomiOutcomeCounts,
        wnsOutcomeCounts,
    };
}
function parseOutcomeCounts(counts) {
    const items = Array.isArray(counts) ? counts : [counts];
    const results = [];
    for (const item of items) {
        results.push({ state: item["Name"], count: (0, utils_js_1.getInteger)(item["Count"], "Count") });
    }
    return results;
}
//# sourceMappingURL=notificationDetailsSerializer.js.map