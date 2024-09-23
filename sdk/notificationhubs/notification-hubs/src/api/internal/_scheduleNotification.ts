// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequest, parseNotificationSendResponse, sendRequest } from "./_client.js";
import { NonNullableRecord } from "../../utils/utils.js";
import { Notification } from "../../models/notification.js";
import { NotificationHubsClientContext } from "../index.js";
import { NotificationHubsMessageResponse } from "../../models/notificationDetails.js";
import { tracingClient } from "../../utils/tracing.js";
import { OperationOptions } from "@azure-rest/core-client";

/**
 * Schedules a push notification to devices that match the given tags or tag expression at the specified time.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param context - The Notification Hubs client.
 * @param scheduledTime - The Date to send the push notification.
 * @param notification - The notification to send to the matching devices.
 * @param options - Options which include tags used to target the device for push notifications in either an array or tag expression.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function scheduleNotificationInternal(
  context: NotificationHubsClientContext,
  scheduledTime: Date,
  notification: Notification,
  options: OperationOptions,
  method: string,
  tagExpression?: string,
): Promise<NotificationHubsMessageResponse> {
  return tracingClient.withSpan(
    `NotificationHubsClientContext.${method}`,
    options,
    async (updatedOptions) => {
      const endpoint = context.requestUrl();
      endpoint.pathname += "/schedulednotifications/";

      const headers = await context.createHeaders(
        "scheduleNotification",
        notification.headers as NonNullableRecord,
      );
      headers.set("ServiceBusNotification-ScheduleTime", scheduledTime.toISOString());
      headers.set("Content-Type", notification.contentType);
      headers.set("ServiceBusNotification-Format", notification.platform);
      if (tagExpression) {
        headers.set("ServiceBusNotification-Tags", tagExpression);
      }

      const request = createRequest(endpoint, "POST", headers, updatedOptions);
      request.body = notification.body;

      const response = await sendRequest(context, request, 201);

      return parseNotificationSendResponse(response);
    },
  );
}
