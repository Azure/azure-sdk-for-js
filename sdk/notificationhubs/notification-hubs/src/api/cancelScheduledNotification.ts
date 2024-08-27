// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequest, parseNotificationSendResponse, sendRequest } from "./internal/_client.js";
import { NotificationHubsClientContext } from "./index.js";
import { NotificationHubsResponse } from "../models/notificationDetails.js";
import { OperationOptions } from "@azure-rest/core-client";
import { tracingClient } from "../utils/tracing.js";

const OPERATION_NAME = "cancelScheduledNotification";

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
  options: OperationOptions = {},
): Promise<NotificationHubsResponse> {
  return tracingClient.withSpan(
    `NotificationHubsClientContext.${OPERATION_NAME}`,
    options,
    async (updatedOptions) => {
      const endpoint = context.requestUrl();
      endpoint.pathname += `/schedulednotifications/${notificationId}`;

      const headers = await context.createHeaders(OPERATION_NAME);
      const request = createRequest(endpoint, "DELETE", headers, updatedOptions);

      const response = await sendRequest(context, request, 200);

      return parseNotificationSendResponse(response);
    },
  );
}
