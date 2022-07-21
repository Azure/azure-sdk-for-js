// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClient, createRequest, parseNotificationSendResponse } from "./client";
import { NotificationHubsResponse } from "../models/response";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { tracingClient } from "../utils/tracing";

/**
 * Cancels the scheduled notification with the given notification ID.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param client - The Notification Hubs client.
 * @param notificationId - The notification ID from the scheduled notification.
 * @param options - The operation options.
 * @returns A notification hub response with correlation ID and tracking ID.
 */
export function cancelScheduledNotification(
  client: NotificationHubsClient,
  notificationId: string,
  options: OperationOptions = {}
): Promise<NotificationHubsResponse> {
  return tracingClient.withSpan(
    "NotificationHubsClient-cancelScheduledNotification",
    options,
    async (updatedOptions) => {
      const endpoint = client.getBaseUrl();
      endpoint.pathname += `/schedulednotifications/${notificationId}`;

      const headers = client.createHeaders();
      const request = createRequest(endpoint, "DELETE", headers, updatedOptions);

      const response = await client.sendRequest(request);
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
