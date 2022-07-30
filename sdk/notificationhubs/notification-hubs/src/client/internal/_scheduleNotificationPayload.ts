// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRequest, parseNotificationSendResponse, sendRequest } from "./_client.js";
import { Notification } from "../../models/notification.js";
import { NotificationHubsClientContext } from "../index.js";
import { NotificationHubsMessageResponse } from "../../models/response.js";
import { OperationOptions } from "@azure/core-client";
import { tracingClient } from "../../utils/tracing.js";

/**
 * @internal
 */

export function scheduleNotificationPayload(
  context: NotificationHubsClientContext,
  scheduledTime: Date,
  tags: string[] | string | undefined,
  notification: Notification,
  options: OperationOptions = {}
): Promise<NotificationHubsMessageResponse> {
  return tracingClient.withSpan(
    "NotificationHubsClientContext-$scheduleNotification",
    options,
    async (updatedOptions) => {
      const endpoint = context.requestUrl();
      endpoint.pathname += "/schedulednotifications/";

      const headers = context.createHeaders();
      if (notification.headers) {
        for (const headerName of Object.keys(notification.headers)) {
          headers.set(headerName, notification.headers[headerName]);
        }
      }

      headers.set("ServiceBusNotification-ScheduleTime", scheduledTime.toISOString());
      headers.set("Content-Type", notification.contentType);
      headers.set("ServiceBusNotification-Format", notification.platform);

      if (tags) {
        let tagExpression = null;
        if (Array.isArray(tags)) {
          tagExpression = tags.join("||");
        } else {
          tagExpression = tags;
        }
        headers.set("ServiceBusNotification-Tags", tagExpression);
      }

      const request = createRequest(endpoint, "POST", headers, updatedOptions);
      request.body = notification.body;

      const response = await sendRequest(context, request, 201);

      return parseNotificationSendResponse(response);
    }
  );
}
