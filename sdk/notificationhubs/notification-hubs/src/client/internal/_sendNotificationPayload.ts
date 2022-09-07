// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BrowserPushChannel, PushHandle } from "../../models/installation.js";
import { createRequest, parseNotificationSendResponse, sendRequest } from "./_client.js";
import { Notification } from "../../models/notification.js";
import { NotificationHubsClientContext } from "../index.js";
import { NotificationHubsMessageResponse } from "../../models/response.js";
import { SendOperationOptions } from "../../models/options.js";
import { tracingClient } from "../../utils/tracing.js";

/**
 * @internal
 */
export function sendNotificationPayload(
  context: NotificationHubsClientContext,
  notification: Notification,
  method: string,
  pushHandle?: PushHandle,
  tags?: string | string[],
  options: SendOperationOptions = {}
): Promise<NotificationHubsMessageResponse> {
  return tracingClient.withSpan(
    `NotificationHubsClientContext-${method}`,
    options,
    async (updatedOptions) => {
      const endpoint = context.requestUrl();
      endpoint.pathname += "/messages/";

      if (options.enableTestSend) {
        endpoint.searchParams.append("test", "true");
      }

      const headers = await context.createHeaders(method);
      if (notification.headers) {
        for (const headerName of Object.keys(notification.headers)) {
          headers.set(headerName, notification.headers[headerName]);
        }
      }

      if (pushHandle) {
        endpoint.searchParams.append("direct", "true");

        if (notification.platform === "browser") {
          const browserHandle = pushHandle as BrowserPushChannel;
          headers.set("ServiceBusNotification-DeviceHandle", browserHandle.endpoint);
          headers.set("Auth", browserHandle.auth);
          headers.set("P256DH", browserHandle.p256dh);
        } else {
          headers.set("ServiceBusNotification-DeviceHandle", pushHandle as string);
        }
      }

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
