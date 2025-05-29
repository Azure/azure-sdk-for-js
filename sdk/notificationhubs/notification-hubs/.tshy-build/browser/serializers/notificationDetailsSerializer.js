// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getDateOrUndefined, getInteger, getStringOrUndefined, isDefined } from "../utils/utils.js";
import { parseXML } from "@azure/core-xml";
/**
 * @internal
 * Parses a NotificationDetails from incoming XML.
 */
export async function parseNotificationDetails(bodyText) {
    var _a, _b, _c, _d, _e, _f;
    const xml = await parseXML(bodyText, {
        includeRoot: true,
    });
    const notificationDetails = xml["NotificationDetails"];
    let apnsOutcomeCounts;
    if (isDefined(notificationDetails["ApnsOutcomeCounts"])) {
        apnsOutcomeCounts = parseOutcomeCounts(notificationDetails["ApnsOutcomeCounts"]["Outcome"]);
    }
    let admOutcomeCounts;
    if (isDefined(notificationDetails["AdmOutcomeCounts"])) {
        admOutcomeCounts = parseOutcomeCounts(notificationDetails["AdmOutcomeCounts"]["Outcome"]);
    }
    let baiduOutcomeCounts;
    if (isDefined(notificationDetails["BaiduOutcomeCounts"])) {
        baiduOutcomeCounts = parseOutcomeCounts(notificationDetails["BaiduOutcomeCounts"]["Outcome"]);
    }
    let browserOutcomeCounts;
    if (isDefined(notificationDetails["BrowserOutcomeCounts"])) {
        browserOutcomeCounts = parseOutcomeCounts(notificationDetails["BrowserOutcomeCounts"]["Outcome"]);
    }
    let fcmOutcomeCounts;
    if (isDefined(notificationDetails["GcmOutcomeCounts"])) {
        fcmOutcomeCounts = parseOutcomeCounts(notificationDetails["GcmOutcomeCounts"]["Outcome"]);
    }
    let fcmV1OutcomeCounts;
    if (isDefined(notificationDetails["FcmV1OutcomeCounts"])) {
        fcmV1OutcomeCounts = parseOutcomeCounts(notificationDetails["FcmV1OutcomeCounts"]["Outcome"]);
    }
    let xiaomiOutcomeCounts;
    if (isDefined(notificationDetails["XiaomiOutcomeCounts"])) {
        xiaomiOutcomeCounts = parseOutcomeCounts(notificationDetails["XiaomiOutcomeCounts"]["Outcome"]);
    }
    let wnsOutcomeCounts;
    if (isDefined(notificationDetails["WnsOutcomeCounts"])) {
        wnsOutcomeCounts = parseOutcomeCounts(notificationDetails["WnsOutcomeCounts"]["Outcome"]);
    }
    return {
        notificationId: (_a = getStringOrUndefined(notificationDetails["NotificationId"])) === null || _a === void 0 ? void 0 : _a.trim(),
        location: (_b = getStringOrUndefined(notificationDetails["Location"])) === null || _b === void 0 ? void 0 : _b.trim(),
        state: (_c = getStringOrUndefined(notificationDetails["State"])) === null || _c === void 0 ? void 0 : _c.trim(),
        enqueueTime: getDateOrUndefined(notificationDetails["EnqueueTime"]),
        startTime: getDateOrUndefined(notificationDetails["StartTime"]),
        endTime: getDateOrUndefined(notificationDetails["EndTime"]),
        pnsErrorDetailsUrl: (_d = getStringOrUndefined(notificationDetails["PnsErrorDetailsUri"])) === null || _d === void 0 ? void 0 : _d.trim(),
        targetPlatforms: (_e = getStringOrUndefined(notificationDetails["TargetPlatforms"])) === null || _e === void 0 ? void 0 : _e.trim(),
        notificationBody: (_f = getStringOrUndefined(notificationDetails["NotificationBody"])) === null || _f === void 0 ? void 0 : _f.trim(),
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
        results.push({ state: item["Name"], count: getInteger(item["Count"], "Count") });
    }
    return results;
}
//# sourceMappingURL=notificationDetailsSerializer.js.map