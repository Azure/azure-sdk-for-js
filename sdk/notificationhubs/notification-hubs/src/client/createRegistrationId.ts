// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClient, createRequest } from "./client";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { tracingClient } from "../utils/tracing";

/**
 * Creates a new registration ID.
 * @param client - The Notification Hubs client.
 * @param options - The options for creating a new registration ID.
 * @returns The newly created registration ID.
 */
export function createRegistrationId(
  client: NotificationHubsClient,
  options: OperationOptions = {}
): Promise<string> {
  return tracingClient.withSpan(
    "NotificationHubsClient-createRegistrationId",
    options,
    async (updatedOptions) => {
      const endpoint = client.getBaseUrl();
      endpoint.pathname += "/registrationIDs";

      const headers = client.createHeaders();
      headers.set("Content-Type", "application/xml;type=entry;charset=utf-8");

      const request = createRequest(endpoint, "POST", headers, updatedOptions);
      const response = await client.sendRequest(request);
      if (response.status !== 201) {
        throw new RestError(`createRegistrationId failed with ${response.status}`, {
          statusCode: response.status,
          response: response,
        });
      }

      // In the form: https://{namespace}.servicebus.windows.net/{NotificationHub}/registrations/<registrationId>
      const locationHeader = response.headers.get("Location");
      const locationUrl = new URL(locationHeader!);
      const registrationId = locationUrl.pathname.split("/")[3];

      return registrationId;
    }
  );
}
