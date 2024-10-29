// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequest, sendRequest } from "./internal/_client.js";
import { NotificationHubJob } from "../models/notificationHubJob.js";
import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure-rest/core-client";
import { parseNotificationHubJobFeed } from "../serializers/notificationHubJobSerializer.js";
import { tracingClient } from "../utils/tracing.js";

const OPERATION_NAME = "listNotificationHubJobs";

/**
 * Gets all Notification Hub Jobs for this Notification Hub.
 * @param context - The Notification Hubs client.xs
 * @param options - The operation options.
 * @returns An array of all Notification Hub Jobs for this Notification Hub.
 */
export function listNotificationHubJobs(
  context: NotificationHubsClientContext,
  options: OperationOptions = {},
): Promise<NotificationHubJob[]> {
  return tracingClient.withSpan(
    `NotificationHubsClientContext.${OPERATION_NAME}`,
    options,
    async (updatedOptions) => {
      const endpoint = context.requestUrl();
      endpoint.pathname += "/jobs";

      const headers = await context.createHeaders(OPERATION_NAME);
      headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");

      const request = createRequest(endpoint, "GET", headers, updatedOptions);
      const response = await sendRequest(context, request, 200);

      return parseNotificationHubJobFeed(response.bodyAsText!);
    },
  );
}
