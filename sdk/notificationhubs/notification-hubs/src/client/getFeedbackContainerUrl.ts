// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { createRequest } from "./internal/_client.js";
import { tracingClient } from "../utils/tracing.js";

/**
 * Retrieves an Azure Storage container URL. The container has feedback data for the notification hub.
 * The caller can then use the Azure Storage Services SDK to retrieve the contents of the container.
 * @param context - The Notification Hubs client.
 * @param options - The options for getting the push notification feedback container URL.
 * @returns The URL of the Azure Storage Container containing the feedback data.
 */
export function getFeedbackContainerUrl(
  context: NotificationHubsClientContext,
  options: OperationOptions = {}
): Promise<string> {
  return tracingClient.withSpan(
    "NotificationHubsClientContext-getFeedbackContainerURL",
    options,
    async (updatedOptions) => {
      const endpoint = context.getBaseUrl();
      endpoint.pathname += "/feedbackcontainer";
      const headers = context.createHeaders();
      headers.set("Content-Type", "application/xml;type=entry;charset=utf-8");

      const request = createRequest(endpoint, "GET", headers, updatedOptions);
      const response = await context.sendRequest(request);
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
