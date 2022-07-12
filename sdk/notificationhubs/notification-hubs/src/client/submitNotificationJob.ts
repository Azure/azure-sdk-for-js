// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { 
  NotificationHubsClient, 
  createRequest, 
} from "./client";
import { parseNotificationHubJobEntry, serializeNotificationHubJobEntry } from "../serializers/notificationHubJobSerializer";
import { NotificationHubJob } from "../models/notificationHubJob";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { tracingClient } from "../utils/tracing";

/**
 * Submits a Notification Hub Job.  
 * Note: this is available to Standard SKU namespace and above.
 * @param client - The Notification Hubs client.
 * @param job - The notification hub job to submit.
 * @param options - The operation options.
 * @returns The notification hub job details including job ID and status.
 */
export function submitNotificationHubJob(
  client: NotificationHubsClient,
  job: NotificationHubJob,
  options: OperationOptions = {}
): Promise<NotificationHubJob> {
  return tracingClient.withSpan(
    "NotificationHubsClient-submitNotificationHubJob",
    options,
    async (updatedOptions) => {
      const endpoint = client.getBaseUrl();
      endpoint.pathname += "/jobs";

      const headers = client.createHeaders();
      headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");

      const request = createRequest(endpoint, "POST", headers, updatedOptions);
      request.body = serializeNotificationHubJobEntry(job);

      const response = await client.sendRequest(request);
      if (response.status !== 201) {
        throw new RestError(`submitNotificationHubJob failed with ${response.status}`, {
          statusCode: response.status,
          response: response,
        });
      }

      return parseNotificationHubJobEntry(response.bodyAsText!);
    }
  );
}
