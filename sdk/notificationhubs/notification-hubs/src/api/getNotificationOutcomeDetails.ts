// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequest, sendRequest } from "./internal/_client.js";
import { NotificationDetails } from "../models/notificationDetails.js";
import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure-rest/core-client";
import { parseNotificationDetails } from "../serializers/notificationDetailsSerializer.js";
import { tracingClient } from "../utils/tracing.js";

const OPERATION_NAME = "getNotificationOutcomeDetails";

/**
 * Retrieves the results of a send operation. This can retrieve intermediate results if the send is being processed
 * or final results if the Send* has completed. This API can only be called for Standard SKU and above.
 * @param context - The Notification Hubs client.
 * @param notificationId - The notification ID returned from the send operation.
 * @param options - The operation options.
 * @returns The results of the send operation.
 */
export function getNotificationOutcomeDetails(
  context: NotificationHubsClientContext,
  notificationId: string,
  options: OperationOptions = {},
): Promise<NotificationDetails> {
  return tracingClient.withSpan(
    `NotificationHubsClientContext.${OPERATION_NAME}`,
    options,
    async (updatedOptions) => {
      const endpoint = context.requestUrl();
      endpoint.pathname += `/messages/${notificationId}`;

      const headers = await context.createHeaders(OPERATION_NAME);
      const request = createRequest(endpoint, "GET", headers, updatedOptions);
      const response = await sendRequest(context, request, 200);

      return parseNotificationDetails(response.bodyAsText!);
    },
  );
}
