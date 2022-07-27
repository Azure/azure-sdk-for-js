// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure/core-client";
import { RegistrationDescription } from "../models/registration.js";
import { RestError } from "@azure/core-rest-pipeline";
import { createRequest } from "./internal/_client.js";
import { registrationDescriptionParser } from "../serializers/registrationSerializer.js";
import { tracingClient } from "../utils/tracing.js";

/**
 * Gets a registration by the given registration ID.
 * @param context - The Notification Hubs client.
 * @param registrationId - The ID of the registration to get.
 * @param options - The options for getting a registration by ID.
 * @returns A RegistrationDescription that has the given registration ID.
 */
export function getRegistration(
  context: NotificationHubsClientContext,
  registrationId: string,
  options: OperationOptions = {}
): Promise<RegistrationDescription> {
  return tracingClient.withSpan(
    "NotificationHubsClientContext-getRegistration",
    options,
    async (updatedOptions) => {
      const endpoint = context.getBaseUrl();
      endpoint.pathname += `/registrations/${registrationId}`;

      const headers = context.createHeaders();
      headers.set("Content-Type", "application/xml;type=entry;charset=utf-8");

      const request = createRequest(endpoint, "GET", headers, updatedOptions);
      const response = await context.sendRequest(request);
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
