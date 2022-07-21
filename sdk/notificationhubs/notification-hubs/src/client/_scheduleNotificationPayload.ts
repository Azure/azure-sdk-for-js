// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { 
  NotificationHubsClient, 
  createRequest,
  parseNotificationSendResponse, 
} from "./client";
import { Notification } from "../models/notification";
import { NotificationHubMessageResponse } from "../models/response";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { tracingClient } from "../utils/tracing";

/**
 * @internal
 */

export function scheduleNotificationPayload(
  client: NotificationHubsClient,
  scheduledTime: Date,
  tags: string[] | string | undefined,
  notification: Notification,
  options: OperationOptions = {}
): Promise<NotificationHubMessageResponse> {
  return tracingClient.withSpan(
    "NotificationHubsClient-$scheduleNotification",
    options,
    async (updatedOptions) => {
      const endpoint = client.getBaseUrl();
      endpoint.pathname += "/schedulednotifications/";

      const headers = client.createHeaders();
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

      const response = await client.sendRequest(request);
      if (response.status !== 201) {
        throw new RestError(`scheduleNotification failed with ${response.status}`, {
          statusCode: response.status,
          response: response,
        });
      }

      return parseNotificationSendResponse(response);
    }
  );
}
