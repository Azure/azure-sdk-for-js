// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClient, createRequest } from "./index.js";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { tracingClient } from "../utils/tracing.js";

/**
 * Retrieves an Azure Storage container URL. The container has feedback data for the notification hub.
 * The caller can then use the Azure Storage Services SDK to retrieve the contents of the container.
 * @param client - The Notification Hubs client.
 * @param options - The options for getting the push notification feedback container URL.
 * @returns The URL of the Azure Storage Container containing the feedback data.
 */
export function getFeedbackContainerUrl(
  client: NotificationHubsClient,
  options: OperationOptions = {}
): Promise<string> {
  return tracingClient.withSpan(
    "NotificationHubsClient-getFeedbackContainerURL",
    options,
    async (updatedOptions) => {
      const endpoint = client.getBaseUrl();
      endpoint.pathname += "/feedbackcontainer";
      const headers = client.createHeaders();
      headers.set("Content-Type", "application/xml;type=entry;charset=utf-8");

      const request = createRequest(endpoint, "GET", headers, updatedOptions);
      const response = await client.sendRequest(request);
      if (response.status !== 200) {
        throw new RestError(`getFeedbackContainerURL failed with ${response.status}`, {
          statusCode: response.status,
          response: response,
        });
      }

      return response.bodyAsText!;
    }
  );
}
