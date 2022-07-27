// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClient } from "./index.js";
import { OperationOptions } from "@azure/core-client";
import { RegistrationDescription } from "../models/registration.js";
import { RestError } from "@azure/core-rest-pipeline";
import { createOrUpdateRegistrationDescription } from "./internal/_createOrUpdateRegistrationDescription.js";
import { tracingClient } from "../utils/tracing.js";

/**
 * Updates an existing registration.
 * @param client - The Notification Hubs client.
 * @param registration - The registration to update.
 * @param options - The operation options.
 * @returns The updated registration description.
 */
export function updateRegistration(
  client: NotificationHubsClient,
  registration: RegistrationDescription,
  options: OperationOptions = {}
): Promise<RegistrationDescription> {
  return tracingClient.withSpan(
    "NotificationHubsClient-updateRegistration",
    options,
    async (updatedOptions) => {
      if (!registration.etag) {
        throw new RestError("ETag is required for registration update", { statusCode: 400 });
      }
      return createOrUpdateRegistrationDescription(client, registration, "update", updatedOptions);
    }
  );
}
