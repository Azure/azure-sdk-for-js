// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequest, parseNotificationResponse, sendRequest } from "./internal/_client.js";
import { NotificationHubsClientContext } from "./index.js";
import { NotificationHubsResponse } from "../models/notificationDetails.js";
import { OperationOptions } from "@azure-rest/core-client";
import { tracingClient } from "../utils/tracing.js";

const OPERATION_NAME = "deleteInstallation";

/**
 * Deletes an installation from a Notification Hub.
 * @param context - The Notification Hubs client.
 * @param installationId - The installation ID of the installation to delete.
 * @param options - Configuration options for the installation delete operation.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function deleteInstallation(
  context: NotificationHubsClientContext,
  installationId: string,
  options: OperationOptions = {},
): Promise<NotificationHubsResponse> {
  return tracingClient.withSpan(
    `NotificationHubsClientContext.${OPERATION_NAME}`,
    options,
    async (updatedOptions) => {
      const endpoint = context.requestUrl();
      endpoint.pathname += `/installations/${installationId}`;

      const headers = await context.createHeaders(OPERATION_NAME);
      const request = createRequest(endpoint, "DELETE", headers, updatedOptions);
      const response = await sendRequest(context, request, 204);

      return parseNotificationResponse(response);
    },
  );
}
