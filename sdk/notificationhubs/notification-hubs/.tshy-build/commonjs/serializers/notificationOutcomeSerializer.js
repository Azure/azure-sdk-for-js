"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNotificationOutcome = parseNotificationOutcome;
const utils_js_1 = require("../utils/utils.js");
const core_xml_1 = require("@azure/core-xml");
async function parseNotificationOutcome(bodyText) {
    const xml = await (0, core_xml_1.parseXML)(bodyText, { includeRoot: true });
    const outcome = xml.NotificationOutcome;
    return {
        successCount: (0, utils_js_1.getInteger)(outcome.Success, "Success"),
        failureCount: (0, utils_js_1.getInteger)(outcome.Failure, "Failure"),
        results: parseRegistrationResults(outcome.Results.RegistrationResult),
        state: "DetailedStateAvailable",
    };
}
function parseRegistrationResults(results) {
    const registrationResults = [];
    if (!(0, utils_js_1.isDefined)(results)) {
        return registrationResults;
    }
    const resultsArray = Array.isArray(results) ? results : [results];
    for (const result of resultsArray) {
        registrationResults.push({
            applicationPlatform: (0, utils_js_1.getString)(result.ApplicationPlatform, "ApplicationPlatform").trim(),
            registrationId: (0, utils_js_1.getString)(result.RegistrationId, "RegistrationId").trim(),
            outcome: (0, utils_js_1.getString)(result.Outcome, "Outcome").trim(),
            pnsHandle: (0, utils_js_1.getString)(result.PnsHandle, "PnsHandle").trim(),
        });
    }
    return registrationResults;
}
//# sourceMappingURL=notificationOutcomeSerializer.js.map