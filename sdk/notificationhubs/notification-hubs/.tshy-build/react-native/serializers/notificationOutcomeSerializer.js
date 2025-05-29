// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getInteger, getString, isDefined } from "../utils/utils.js";
import { parseXML } from "@azure/core-xml";
export async function parseNotificationOutcome(bodyText) {
    const xml = await parseXML(bodyText, { includeRoot: true });
    const outcome = xml.NotificationOutcome;
    return {
        successCount: getInteger(outcome.Success, "Success"),
        failureCount: getInteger(outcome.Failure, "Failure"),
        results: parseRegistrationResults(outcome.Results.RegistrationResult),
        state: "DetailedStateAvailable",
    };
}
function parseRegistrationResults(results) {
    const registrationResults = [];
    if (!isDefined(results)) {
        return registrationResults;
    }
    const resultsArray = Array.isArray(results) ? results : [results];
    for (const result of resultsArray) {
        registrationResults.push({
            applicationPlatform: getString(result.ApplicationPlatform, "ApplicationPlatform").trim(),
            registrationId: getString(result.RegistrationId, "RegistrationId").trim(),
            outcome: getString(result.Outcome, "Outcome").trim(),
            pnsHandle: getString(result.PnsHandle, "PnsHandle").trim(),
        });
    }
    return registrationResults;
}
//# sourceMappingURL=notificationOutcomeSerializer.js.map