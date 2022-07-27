// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRequest, parseNotificationSendResponse } from "./internal/_client.js";
import { NotificationHubsClientContext } from "./index.js";
import { NotificationHubsResponse } from "../models/response.js";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { tracingClient } from "../utils/tracing.js";

/**
 * Cancels the scheduled notification with the given notification ID.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param context - The Notification Hubs client.
 * @param notificationId - The notification ID from the scheduled notification.
 * @param options - The operation options.
 * @returns A notification hub response with correlation ID and tracking ID.
 */
export function cancelScheduledNotification(
  context: NotificationHubsClientContext,
  notificationId: string,
  options: OperationOptions = {}
): Promise<NotificationHubsResponse> {
  return tracingClient.withSpan(
    "NotificationHubsClientContext-cancelScheduledNotification",
    options,
    async (updatedOptions) => {
      const endpoint = context.getBaseUrl();
      endpoint.pathname += `/schedulednotifications/${notificationId}`;

      const headers = context.createHeaders();
      const request = createRequest(endpoint, "DELETE", headers, updatedOptions);

      const response = await context.sendRequest(request);
      if (response.status !== 200) {
        throw new RestError(`cancelScheduledNotification failed with ${response.status}`, {
          statusCode: response.status,
          response: response,
        });
      }

      return parseNotificationSendResponse(response);
    }
  );
}
