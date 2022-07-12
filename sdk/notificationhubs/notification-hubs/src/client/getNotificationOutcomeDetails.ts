// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { 
  NotificationHubsClient, 
  createRequest,
} from "./client";
import { NotificationDetails } from "../models/notificationDetails";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { tracingClient } from "../utils/tracing";
import { parseNotificationDetails } from "../serializers/notificationDetailsSerializer";

/**
 * Retrieves the results of a send operation. This can retrieve intermediate results if the send is being processed
 * or final results if the Send* has completed. This API can only be called for Standard SKU and above.
 * @param client - The Notification Hubs client.
 * @param notificationId - The notification ID returned from the send operation.
 * @param options - The operation options.
 * @returns The results of the send operation.
 */
export function getNotificationOutcomeDetails(
  client: NotificationHubsClient,
  notificationId: string,
  options: OperationOptions = {}
): Promise<NotificationDetails> {
  return tracingClient.withSpan(
    "NotificationHubsClient-getNotificationOutcomeDetails",
    options,
    async (updatedOptions) => {
      const endpoint = client.getBaseUrl();
      endpoint.pathname += `/messages/${notificationId}`;

      const headers = client.createHeaders();
      const request = createRequest(endpoint, "GET", headers, updatedOptions);

      const response = await client.sendRequest(request);
      if (response.status !== 200) {
        throw new RestError(`getNotificationOutcomeDetails failed with ${response.status}`, {
          statusCode: response.status,
          response: response,
        });
      }

      return parseNotificationDetails(response.bodyAsText!);
    }
  );
}
