// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { createRequest } from "./internal/_client.js";
import { tracingClient } from "../utils/tracing.js";

/**
 * Creates a new registration ID.
 * @param context - The Notification Hubs client.
 * @param options - The options for creating a new registration ID.
 * @returns The newly created registration ID.
 */
export function createRegistrationId(
  context: NotificationHubsClientContext,
  options: OperationOptions = {}
): Promise<string> {
  return tracingClient.withSpan(
    "NotificationHubsClientContext-createRegistrationId",
    options,
    async (updatedOptions) => {
      const endpoint = context.getBaseUrl();
      endpoint.pathname += "/registrationIDs";

      const headers = context.createHeaders();
      headers.set("Content-Type", "application/xml;type=entry;charset=utf-8");

      const request = createRequest(endpoint, "POST", headers, updatedOptions);
      const response = await context.sendRequest(request);
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
