// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubJob } from "../models/notificationHubJob.js";
import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { createRequest } from "./internal/_client.js";
import { parseNotificationHubJobEntry } from "../serializers/notificationHubJobSerializer.js";
import { tracingClient } from "../utils/tracing.js";

/**
 * Gets a Notification Hub Job by the ID.
 * @param context - The Notification Hubs client.
 * @param jobId - The Notification Hub Job ID.
 * @param options - The operation options.
 * @returns The Notification Hub Job with the matching ID.
 */
export function getNotificationHubJob(
  context: NotificationHubsClientContext,
  jobId: string,
  options: OperationOptions = {}
): Promise<NotificationHubJob> {
  return tracingClient.withSpan(
    "NotificationHubsClientContext-getNotificationHubJob",
    options,
    async (updatedOptions) => {
      const endpoint = context.getBaseUrl();
      endpoint.pathname += `/jobs/${jobId}`;

      const headers = context.createHeaders();
      headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");

      const request = createRequest(endpoint, "GET", headers, updatedOptions);
      const response = await context.sendRequest(request);
      if (response.status !== 200) {
        throw new RestError(`getNotificationHubJob failed with ${response.status}`, {
          statusCode: response.status,
          response: response,
        });
      }

      return parseNotificationHubJobEntry(response.bodyAsText!);
    }
  );
}
