// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequest, sendRequest } from "./internal/_client.js";
import {
  parseNotificationHubJobEntry,
  serializeNotificationHubJobEntry,
} from "../serializers/notificationHubJobSerializer.js";
import { NotificationHubJob } from "../models/notificationHubJob.js";
import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure-rest/core-client";
import { tracingClient } from "../utils/tracing.js";

const OPERATION_NAME = "submitNotificationHubJob";

/**
 * Submits a Notification Hub Job.
 * Note: this is available to Standard SKU namespace and above.
 * @param context - The Notification Hubs client.
 * @param job - The notification hub job to submit.
 * @param options - The operation options.
 * @returns The notification hub job details including job ID and status.
 */
export function submitNotificationHubJob(
  context: NotificationHubsClientContext,
  job: NotificationHubJob,
  options: OperationOptions = {},
): Promise<NotificationHubJob> {
  return tracingClient.withSpan(
    `NotificationHubsClientContext.${OPERATION_NAME}`,
    options,
    async (updatedOptions) => {
      const endpoint = context.requestUrl();
      endpoint.pathname += "/jobs";

      const headers = await context.createHeaders(OPERATION_NAME);
      headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");

      const request = createRequest(endpoint, "POST", headers, updatedOptions);
      request.body = serializeNotificationHubJobEntry(job);
      const response = await sendRequest(context, request, 201);

      return parseNotificationHubJobEntry(response.bodyAsText!);
    },
  );
}
