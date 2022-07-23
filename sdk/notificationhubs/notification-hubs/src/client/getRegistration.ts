// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClient, createRequest } from "./index.js";
import { OperationOptions } from "@azure/core-client";
import { RegistrationDescription } from "../models/registration.js";
import { RestError } from "@azure/core-rest-pipeline";
import { registrationDescriptionParser } from "../serializers/registrationSerializer.js";
import { tracingClient } from "../utils/tracing.js";

/**
 * Gets a registration by the given registration ID.
 * @param client - The Notification Hubs client.
 * @param registrationId - The ID of the registration to get.
 * @param options - The options for getting a registration by ID.
 * @returns A RegistrationDescription that has the given registration ID.
 */
export function getRegistration(
  client: NotificationHubsClient,
  registrationId: string,
  options: OperationOptions = {}
): Promise<RegistrationDescription> {
  return tracingClient.withSpan(
    "NotificationHubsClient-getRegistration",
    options,
    async (updatedOptions) => {
      const endpoint = client.getBaseUrl();
      endpoint.pathname += `/registrations/${registrationId}`;

      const headers = client.createHeaders();
      headers.set("Content-Type", "application/xml;type=entry;charset=utf-8");

      const request = createRequest(endpoint, "GET", headers, updatedOptions);
      const response = await client.sendRequest(request);
      if (response.status !== 200) {
        throw new RestError(`getRegistration failed with ${response.status}`, {
          statusCode: response.status,
          response: response,
        });
      }

      return registrationDescriptionParser.parseRegistrationEntry(response.bodyAsText!);
    }
  );
}
