// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClient, createRequest, parseNotificationResponse } from "./client.js";
import { EntityOperationOptions } from "../models/options.js";
import { NotificationHubsResponse } from "../models/response.js";
import { RestError } from "@azure/core-rest-pipeline";
import { tracingClient } from "../utils/tracing.js";

/**
 * Deletes a registration with the given registration ID.
 * @param client - The Notification Hubs client.
 * @param registrationId - The registration ID of the registration to delete.
 * @param options - The options for delete operations including the ETag
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function deleteRegistration(
  client: NotificationHubsClient,
  registrationId: string,
  options: EntityOperationOptions = {}
): Promise<NotificationHubsResponse> {
  return tracingClient.withSpan(
    "NotificationHubsClient-deleteRegistration",
    options,
    async (updatedOptions) => {
      const endpoint = client.getBaseUrl();
      endpoint.pathname += `/registrations/${registrationId}`;

      const headers = client.createHeaders();
      headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
      headers.set("If-Match", options.etag ?? "*");

      const request = createRequest(endpoint, "GET", headers, updatedOptions);
      const response = await client.sendRequest(request);
      if (response.status !== 200) {
        throw new RestError(`deleteRegistration failed with ${response.status}`, {
          statusCode: response.status,
          response: response,
        });
      }

      return parseNotificationResponse(response);
    }
  );
}
