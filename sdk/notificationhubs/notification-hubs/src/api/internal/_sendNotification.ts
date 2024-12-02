// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  BroadcastSendNotificationOptions,
  DirectSendNotificationOptions,
  SendNotificationOptions,
} from "../../models/options.js";
import { createRequest, parseNotificationSendResponse, sendRequest } from "./_client.js";
import {
  isBroadcastSendNotificationOptions,
  isDirectSendNotificationOptions,
  isSendNotificationOptions,
} from "../../utils/optionUtils.js";
import type { BrowserPushChannel } from "../../models/installation.js";
import type { NonNullableRecord } from "../../utils/utils.js";
import type { Notification } from "../../models/notification.js";
import type { NotificationHubsClientContext } from "../index.js";
import type { NotificationHubsMessageResponse } from "../../models/notificationDetails.js";
import { createMultipartDirectNotification } from "../../utils/notificationUtils.js";
import { randomUUID } from "@azure/core-util";
import { tracingClient } from "../../utils/tracing.js";

/**
 * Sends push notifications to devices that match the given tags or tag expression.
 * @param context - The Notification Hubs client.
 * @param notification - The notification to send to the matching devices.
 * @param options - Options for the notification including tags, device handles and whether to enable test send.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function sendNotificationInternal(
  context: NotificationHubsClientContext,
  notification: Notification,
  options:
    | DirectSendNotificationOptions
    | SendNotificationOptions
    | BroadcastSendNotificationOptions,
): Promise<NotificationHubsMessageResponse> {
  return tracingClient.withSpan(
    `NotificationHubsClientContext.sendNotification`,
    options,
    async (updatedOptions) => {
      const endpoint = context.requestUrl();
      endpoint.pathname += "/messages/";

      // Check if batch direct send
      if (isDirectSendNotificationOptions(options) && Array.isArray(options.deviceHandle)) {
        endpoint.pathname += "$batch";
      }

      // Check for test send
      if (
        (isSendNotificationOptions(options) || isBroadcastSendNotificationOptions(options)) &&
        options.enableTestSend
      ) {
        endpoint.searchParams.append("test", "true");
      }

      const headers = await context.createHeaders(
        "sendNotification",
        notification.headers as NonNullableRecord,
      );
      headers.set("ServiceBusNotification-Format", notification.platform);

      let body = notification.body;
      let contentType: string = notification.contentType;

      // Check for direct batch send
      if (isDirectSendNotificationOptions(options) && Array.isArray(options.deviceHandle)) {
        endpoint.searchParams.append("direct", "true");
        const boundary = `nh-boundary-${randomUUID()}`;
        contentType = `multipart/mixed; boundary = "${boundary}"`;
        body = createMultipartDirectNotification(boundary, notification, options.deviceHandle);
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
        headers.set("ServiceBusNotification-Tags", options.tagExpression);
      }

      headers.set("Content-Type", contentType);
      headers.set("ServiceBusNotification-Format", notification.platform);

      const request = createRequest(endpoint, "POST", headers, updatedOptions);
      request.body = body;

      const response = await sendRequest(context, request, 201);

      return parseNotificationSendResponse(response);
    },
  );
}
