// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  NotificationHubJob,
  NotificationHubJobStatus,
  NotificationHubJobType,
} from "../models/notificationHubJob.js";
import {
  getDateOrUndefined,
  getFloatOrUndefined,
  getString,
  getStringOrUndefined,
  isDefined,
} from "../utils/utils.js";
import { parseXML, stringifyXML } from "@azure/core-xml";
import { serializeToAtomXmlRequest } from "../utils/xmlUtils.js";

/**
 * @internal
 * Serializes a NotificationHubJob into an Atom XML entry.
 * @param entry - The NotificationHubJob to turn into an Atom XML entry.
 * @returns An Atom XML entry containing the notification hub job.
 */
export function serializeNotificationHubJobEntry(entry: NotificationHubJob): string {
  const job: Record<string, any> = {
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
export async function parseNotificationHubJobEntry(bodyText: string): Promise<NotificationHubJob> {
  const xml = await parseXML(bodyText, { includeRoot: true });
  const content = xml.entry.content.NotificationHubJob;
  return createNotificationHubJob(content);
}

/**
 * Parses an Atom XML feed of notification hub jobs.
 * @param bodyText - The incoming Atom XML feed to parse into notification hub jobs.
 * @returns A list of notification hub jobs.
 */
export async function parseNotificationHubJobFeed(bodyText: string): Promise<NotificationHubJob[]> {
  const xml = await parseXML(bodyText, { includeRoot: true });
  const results: NotificationHubJob[] = [];

  if (!isDefined(xml.feed.entry)) {
    return results;
  }

  const entries = Array.isArray(xml.feed.entry) ? xml.feed.entry : [xml.feed.entry];

  for (const item of entries) {
    results.push(createNotificationHubJob(item.content.NotificationHubJob));
  }

  return results;
}

function createInputOutputProperties(content: Record<string, any>): Record<string, string> {
  const props: Record<string, string> = {};

  const keyValues = content["d3p1:KeyValueOfstringstring"];
  const keyValueArray = Array.isArray(keyValues) ? keyValues : [keyValues];
  for (const item of keyValueArray) {
    props[item["d3p1:Key"]] = item["d3p1:Value"];
  }

  return props;
}

function createNotificationHubJob(content: Record<string, any>): NotificationHubJob {
  let outputProperties: Record<string, string> | undefined;
  if (isDefined(content["OutputProperties"])) {
    outputProperties = createInputOutputProperties(content["OutputProperties"]);
  }

  let inputProperties: Record<string, string> | undefined;
  if (isDefined(content["InputProperties"])) {
    inputProperties = createInputOutputProperties(content["InputProperties"]);
  }

  return {
    jobId: getStringOrUndefined(content["JobId"]),
    type: getString(content["Type"], "type") as NotificationHubJobType,
    status: getStringOrUndefined(content["Status"]) as NotificationHubJobStatus,
    progress: getFloatOrUndefined(content["Progress"]),
    outputContainerUrl: getString(content["OutputContainerUri"], "outputContainerUrl"),
    importFileUrl: getStringOrUndefined(content["ImportFileUri"]),
    failure: getStringOrUndefined(content["Failure"]),
    createdAt: getDateOrUndefined(content["CreatedAt"]),
    updatedAt: getDateOrUndefined(content["UpdatedAt"]),
    inputProperties,
    outputProperties,
  };
}
