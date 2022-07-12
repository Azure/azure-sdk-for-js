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
 * Schedules a push notification to devices that match the given tags or tag expression at the specified time.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param client - The Notification Hubs client.
 * @param scheduledTime - The Date to send the push notification.
 * @param tags - The tags used to target the device for push notifications in either an array or tag expression.
 * @param notification - The notification to send to the matching devices.
 * @param options - Configuration options for the direct send operation which can contain custom headers
 * which may include APNs specific such as apns-topic or for WNS, X-WNS-TYPE.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function scheduleNotification(
  client: NotificationHubsClient,
  scheduledTime: Date,
  tags: string[] | string,
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
