// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure-rest/core-client";
import { RegistrationDescription } from "../models/registration.js";
import { createOrUpdateRegistrationDescription } from "./internal/_createOrUpdateRegistrationDescription.js";
import { tracingClient } from "../utils/tracing.js";

const OPERATION_NAME = "createOrUpdateRegistration";

/**
 * Creates or updates a registration.
 * @param context - The Notification Hubs client.
 * @param registration - The registration to create or update.
 * @param options - The operation options.
 * @returns The created or updated registration description.
 */
export function createOrUpdateRegistration(
  context: NotificationHubsClientContext,
  registration: RegistrationDescription,
  options: OperationOptions = {},
): Promise<RegistrationDescription> {
  return tracingClient.withSpan(
    `NotificationHubsClientContext.${OPERATION_NAME}`,
    options,
    async (updatedOptions) => {
      return createOrUpdateRegistrationDescription(
        context,
        registration,
        "createOrUpdate",
        updatedOptions,
      );
    },
  );
}
