// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  NotificationDetails,
  NotificationOutcomeCollectionItem,
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
    stopNodes: ["NotificationDetails.NotificationBody"],
  });
  const notificationDetails = xml["NotificationDetails"];

  let apnsOutcomeCounts: NotificationOutcomeCollectionItem[] | undefined;
  if (isDefined(notificationDetails["ApnsOutcomeCounts"])) {
    apnsOutcomeCounts = parseOutcomeCounts(notificationDetails["ApnsOutcomeCounts"]["Outcome"]);
  }

  let admOutcomeCounts: NotificationOutcomeCollectionItem[] | undefined;
  if (isDefined(notificationDetails["AdmOutcomeCounts"])) {
    admOutcomeCounts = parseOutcomeCounts(notificationDetails["AdmOutcomeCounts"]["Outcome"]);
  }

  let baiduOutcomeCounts: NotificationOutcomeCollectionItem[] | undefined;
  if (isDefined(notificationDetails["BaiduOutcomeCounts"])) {
    baiduOutcomeCounts = parseOutcomeCounts(notificationDetails["BaiduOutcomeCounts"]["Outcome"]);
  }

  let fcmOutcomeCounts: NotificationOutcomeCollectionItem[] | undefined;
  if (isDefined(notificationDetails["GcmOutcomeCounts"])) {
    fcmOutcomeCounts = parseOutcomeCounts(notificationDetails["GcmOutcomeCounts"]["Outcome"]);
  }

  let wnsOutcomeCounts: NotificationOutcomeCollectionItem[] | undefined;
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
    apnsOutcomeCounts,
    admOutcomeCounts,
    baiduOutcomeCounts,
    fcmOutcomeCounts,
    wnsOutcomeCounts,
  };
}

function parseOutcomeCounts(
  counts: Record<string, any>[] | Record<string, any>
): NotificationOutcomeCollectionItem[] {
  const items = Array.isArray(counts) ? counts : [counts];
  const results: NotificationOutcomeCollectionItem[] = [];
  for (const item of items) {
    results.push({ state: item["Name"], count: getInteger(item["Count"], "Count") });
  }

  return results;
}
