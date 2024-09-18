// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequest, sendRequest } from "./internal/_client.js";
import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure-rest/core-client";
import { tracingClient } from "../utils/tracing.js";

const OPERATION_NAME = "getFeedbackContainerUrl";

/**
 * Retrieves an Azure Storage container URL. The container has feedback data for the notification hub.
 * The caller can then use the Azure Storage Services SDK to retrieve the contents of the container.
 * @param context - The Notification Hubs client.
 * @param options - The options for getting the push notification feedback container URL.
 * @returns The URL of the Azure Storage Container containing the feedback data.
 */
export function getFeedbackContainerUrl(
  context: NotificationHubsClientContext,
  options: OperationOptions = {},
): Promise<string> {
  return tracingClient.withSpan(
    `NotificationHubsClientContext.${OPERATION_NAME}`,
    options,
    async (updatedOptions) => {
      const endpoint = context.requestUrl();
      endpoint.pathname += "/feedbackcontainer";

      const headers = await context.createHeaders(OPERATION_NAME);
      headers.set("Content-Type", "application/xml;type=entry;charset=utf-8");

      const request = createRequest(endpoint, "GET", headers, updatedOptions);
      const response = await sendRequest(context, request, 200);

      return response.bodyAsText!;
    },
  );
}
