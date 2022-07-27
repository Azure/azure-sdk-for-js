// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubJob } from "../models/notificationHubJob.js";
import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { createRequest } from "./internal/_client.js";
import { parseNotificationHubJobFeed } from "../serializers/notificationHubJobSerializer.js";
import { tracingClient } from "../utils/tracing.js";

/**
 * Gets all Notification Hub Jobs for this Notification Hub.
 * @param context - The Notification Hubs client.xs
 * @param options - The operation options.
 * @returns An array of all Notification Hub Jobs for this Notification Hub.
 */
export function listNotificationHubJobs(
  context: NotificationHubsClientContext,
  options: OperationOptions = {}
): Promise<NotificationHubJob[]> {
  return tracingClient.withSpan(
    "NotificationHubsClientContext-getNotificationHubJobs",
    options,
    async (updatedOptions) => {
      const endpoint = context.getBaseUrl();
      endpoint.pathname += "/jobs";

      const headers = context.createHeaders();
      headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");

      const request = createRequest(endpoint, "GET", headers, updatedOptions);
      const response = await context.sendRequest(request);
      if (response.status !== 200) {
        throw new RestError(`getNotificationHubJobs failed with ${response.status}`, {
          statusCode: response.status,
          response: response,
        });
      }

      return parseNotificationHubJobFeed(response.bodyAsText!);
    }
  );
}
