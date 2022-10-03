// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DirectSendNotificationOptions,
  SendNotificationOptions,
  isDirectSendNotificationOptions,
  isSendNotificationOptions,
} from "../models/options.js";
import { createRequest, parseNotificationSendResponse, sendRequest } from "./internal/_client.js";
import { BrowserPushChannel } from "../models/installation.js";
import { Notification } from "../models/notification.js";
import { NotificationHubsClientContext } from "./index.js";
import { NotificationHubsMessageResponse } from "../models/notificationDetails.js";
import { createMultipartDirectNotification } from "../utils/notificationUtils.js";
import { tracingClient } from "../utils/tracing.js";

/**
 * Sends push notifications to devices that match the given tags or tag expression.
 * @param context - The Notification Hubs client.
 * @param notification - The notification to send to the matching devices.
 * @param options - Options for the notification including tags, device handles and whether to enable test send.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function sendNotification(
  context: NotificationHubsClientContext,
  notification: Notification,
  options: DirectSendNotificationOptions | SendNotificationOptions = { enableTestSend: false }
): Promise<NotificationHubsMessageResponse> {
  return tracingClient.withSpan(
    `NotificationHubsClientContext-sendNotification`,
    options,
    async (updatedOptions) => {
      const endpoint = context.requestUrl();
      endpoint.pathname += "/messages/";

      // Check if batch direct send
      if (isDirectSendNotificationOptions(options) && Array.isArray(options.deviceHandle)) {
        endpoint.pathname += "$batch";
      }

      // Check for test send
      if (isSendNotificationOptions(options) && options.enableTestSend) {
        endpoint.searchParams.append("test", "true");
      }

      const headers = await context.createHeaders("sendNotification");
      if (notification.headers) {
        for (const headerName of Object.keys(notification.headers)) {
          headers.set(headerName, notification.headers[headerName]);
        }
      }

      headers.set("ServiceBusNotification-Format", notification.platform);
      let body = notification.body;
      let contentType: string = notification.contentType;

      // Check for direct batch send
      if (isDirectSendNotificationOptions(options) && Array.isArray(options.deviceHandle)) {
        endpoint.searchParams.append("direct", "true");
        contentType = `multipart/mixed; boundary = "nh-batch-multipart-boundary"`;
        body = createMultipartDirectNotification(notification, options.deviceHandle);

        console.log(body);
      } else if (isDirectSendNotificationOptions(options)) {
        endpoint.searchParams.append("direct", "true");

        if (notification.platform === "browser") {
          const browserHandle = options.deviceHandle as BrowserPushChannel;
          headers.set("ServiceBusNotification-DeviceHandle", browserHandle.endpoint);
          headers.set("Auth", browserHandle.auth);
          headers.set("P256DH", browserHandle.p256dh);
        } else {
          headers.set("ServiceBusNotification-DeviceHandle", options.deviceHandle as string);
        }
      } else if (isSendNotificationOptions(options)) {
        if (options.tags) {
          let tagExpression = null;
          if (Array.isArray(options.tags)) {
            tagExpression = options.tags.join("||");
          } else {
            tagExpression = options.tags;
          }
          headers.set("ServiceBusNotification-Tags", tagExpression);
        }
      }

      headers.set("Content-Type", contentType);
      headers.set("ServiceBusNotification-Format", notification.platform);

      const request = createRequest(endpoint, "POST", headers, updatedOptions);
      request.body = body;

      const response = await sendRequest(context, request, 201);

      return parseNotificationSendResponse(response);
    }
  );
}
