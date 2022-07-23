// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClient, createRequest, parseNotificationResponse } from "./index.js";
import { NotificationHubsResponse } from "../models/response.js";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { tracingClient } from "../utils/tracing.js";

/**
 * Deletes an installation from a Notification Hub.
 * @param client - The Notification Hubs client.
 * @param installationId - The installation ID of the installation to delete.
 * @param options - Configuration options for the installation delete operation.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function deleteInstallation(
  client: NotificationHubsClient,
  installationId: string,
  options: OperationOptions = {}
): Promise<NotificationHubsResponse> {
  return tracingClient.withSpan(
    "NotificationHubsClient-deleteInstallation",
    options,
    async (updatedOptions) => {
      const endpoint = client.getBaseUrl();
      endpoint.pathname += `/installations/${installationId}`;
      const headers = client.createHeaders();

      const request = createRequest(endpoint, "DELETE", headers, updatedOptions);

      const response = await client.sendRequest(request);
      if (response.status !== 204) {
        throw new RestError(`deleteInstallation failed with ${response.status}`, {
          statusCode: response.status,
          response: response,
        });
      }

      return parseNotificationResponse(response);
    }
  );
}
