// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClient } from "./index.js";
import { OperationOptions } from "@azure/core-client";
import { RegistrationDescription } from "../models/registration.js";
import { createOrUpdateRegistrationDescription } from "./internal/_createOrUpdateRegistrationDescription.js";
import { tracingClient } from "../utils/tracing.js";

/**
 * Creates or updates a registration.
 * @param client - The Notification Hubs client.
 * @param registration - The registration to create or update.
 * @param options - The operation options.
 * @returns The created or updated registration description.
 */
export function createOrUpdateRegistration(
  client: NotificationHubsClient,
  registration: RegistrationDescription,
  options: OperationOptions = {}
): Promise<RegistrationDescription> {
  return tracingClient.withSpan(
    "NotificationHubsClient-createOrUpdateRegistration",
    options,
    async (updatedOptions) => {
      return createOrUpdateRegistrationDescription(
        client,
        registration,
        "createOrUpdate",
        "*",
        updatedOptions
      );
    }
  );
}
