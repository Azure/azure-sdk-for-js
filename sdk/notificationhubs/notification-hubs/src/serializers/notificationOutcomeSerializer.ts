// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  NotificationHubsMessageResponse,
  RegistrationResult,
} from "../models/notificationDetails.js";
import { getInteger, getString, isDefined } from "../utils/utils.js";
import { parseXML } from "@azure/core-xml";

export async function parseNotificationOutcome(
  bodyText: string,
): Promise<NotificationHubsMessageResponse> {
  const xml = await parseXML(bodyText, { includeRoot: true });
  const outcome = xml.NotificationOutcome;

  return {
    successCount: getInteger(outcome.Success, "Success"),
    failureCount: getInteger(outcome.Failure, "Failure"),
    results: parseRegistrationResults(outcome.Results.RegistrationResult),
    state: "DetailedStateAvailable",
  };
}

function parseRegistrationResults(results?: Record<string, any>): RegistrationResult[] {
  const registrationResults: RegistrationResult[] = [];

  if (!isDefined(results)) {
    return registrationResults;
  }

  const resultsArray = Array.isArray(results) ? results : [results];

  for (const result of resultsArray) {
    registrationResults.push({
      applicationPlatform: getString(result.ApplicationPlatform, "ApplicationPlatform"),
      registrationId: getString(result.RegistrationId, "RegistrationId"),
      outcome: getString(result.Outcome, "Outcome"),
      pnsHandle: getString(result.PnsHandle, "PnsHandle"),
    });
  }

  return registrationResults;
}
