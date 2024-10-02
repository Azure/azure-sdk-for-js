// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  NotificationDetails,
  NotificationOutcome,
  NotificationOutcomeState,
} from "../models/notificationDetails.js";
import { getDateOrUndefined, getInteger, getStringOrUndefined, isDefined } from "../utils/utils.js";
import { parseXML } from "@azure/core-xml";

/**
 * @internal
 * Parses a NotificationDetails from incoming XML.
 */
export async function parseNotificationDetails(bodyText: string): Promise<NotificationDetails> {
  const xml = await parseXML(bodyText, {
    includeRoot: true,
  });
  const notificationDetails = xml["NotificationDetails"];

  let apnsOutcomeCounts: NotificationOutcome[] | undefined;
  if (isDefined(notificationDetails["ApnsOutcomeCounts"])) {
    apnsOutcomeCounts = parseOutcomeCounts(notificationDetails["ApnsOutcomeCounts"]["Outcome"]);
  }

  let admOutcomeCounts: NotificationOutcome[] | undefined;
  if (isDefined(notificationDetails["AdmOutcomeCounts"])) {
    admOutcomeCounts = parseOutcomeCounts(notificationDetails["AdmOutcomeCounts"]["Outcome"]);
  }

  let baiduOutcomeCounts: NotificationOutcome[] | undefined;
  if (isDefined(notificationDetails["BaiduOutcomeCounts"])) {
    baiduOutcomeCounts = parseOutcomeCounts(notificationDetails["BaiduOutcomeCounts"]["Outcome"]);
  }

  let browserOutcomeCounts: NotificationOutcome[] | undefined;
  if (isDefined(notificationDetails["BrowserOutcomeCounts"])) {
    browserOutcomeCounts = parseOutcomeCounts(
      notificationDetails["BrowserOutcomeCounts"]["Outcome"],
    );
  }

  let fcmOutcomeCounts: NotificationOutcome[] | undefined;
  if (isDefined(notificationDetails["GcmOutcomeCounts"])) {
    fcmOutcomeCounts = parseOutcomeCounts(notificationDetails["GcmOutcomeCounts"]["Outcome"]);
  }

  let fcmV1OutcomeCounts: NotificationOutcome[] | undefined;
  if (isDefined(notificationDetails["FcmV1OutcomeCounts"])) {
    fcmV1OutcomeCounts = parseOutcomeCounts(notificationDetails["FcmV1OutcomeCounts"]["Outcome"]);
  }

  let xiaomiOutcomeCounts: NotificationOutcome[] | undefined;
  if (isDefined(notificationDetails["XiaomiOutcomeCounts"])) {
    xiaomiOutcomeCounts = parseOutcomeCounts(notificationDetails["XiaomiOutcomeCounts"]["Outcome"]);
  }

  let wnsOutcomeCounts: NotificationOutcome[] | undefined;
  if (isDefined(notificationDetails["WnsOutcomeCounts"])) {
    wnsOutcomeCounts = parseOutcomeCounts(notificationDetails["WnsOutcomeCounts"]["Outcome"]);
  }

  return {
    notificationId: getStringOrUndefined(notificationDetails["NotificationId"]),
    location: getStringOrUndefined(notificationDetails["Location"]),
    state: getStringOrUndefined(notificationDetails["State"]) as NotificationOutcomeState,
    enqueueTime: getDateOrUndefined(notificationDetails["EnqueueTime"]),
    startTime: getDateOrUndefined(notificationDetails["StartTime"]),
    endTime: getDateOrUndefined(notificationDetails["EndTime"]),
    pnsErrorDetailsUrl: getStringOrUndefined(notificationDetails["PnsErrorDetailsUri"]),
    targetPlatforms: getStringOrUndefined(notificationDetails["TargetPlatforms"]),
    notificationBody: getStringOrUndefined(notificationDetails["NotificationBody"]),
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

function parseOutcomeCounts(
  counts: Record<string, any>[] | Record<string, any>,
): NotificationOutcome[] {
  const items = Array.isArray(counts) ? counts : [counts];
  const results: NotificationOutcome[] = [];
  for (const item of items) {
    results.push({ state: item["Name"], count: getInteger(item["Count"], "Count") });
  }

  return results;
}
