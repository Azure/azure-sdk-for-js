// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClient, createRequest } from "./index.js";
import { NotificationHubJob } from "../models/notificationHubJob.js";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { parseNotificationHubJobEntry } from "../serializers/notificationHubJobSerializer.js";
import { tracingClient } from "../utils/tracing.js";

/**
 * Gets a Notification Hub Job by the ID.
 * @param client - The Notification Hubs client.
 * @param jobId - The Notification Hub Job ID.
 * @param options - The operation options.
 * @returns The Notification Hub Job with the matching ID.
 */
export function getNotificationHubJob(
  client: NotificationHubsClient,
  jobId: string,
  options: OperationOptions = {}
): Promise<NotificationHubJob> {
  return tracingClient.withSpan(
    "NotificationHubsClient-getNotificationHubJob",
    options,
    async (updatedOptions) => {
      const endpoint = client.getBaseUrl();
      endpoint.pathname += `/jobs/${jobId}`;

      const headers = client.createHeaders();
      headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");

      const request = createRequest(endpoint, "GET", headers, updatedOptions);
      const response = await client.sendRequest(request);
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
