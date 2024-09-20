// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure-rest/core-client";
import { RegistrationDescription } from "../models/registration.js";
import { RestError } from "@azure/core-rest-pipeline";
import { createOrUpdateRegistrationDescription } from "./internal/_createOrUpdateRegistrationDescription.js";
import { tracingClient } from "../utils/tracing.js";

const OPERATION_NAME = "createRegistration";

/**
 * Creates a new registration. This method generates a registration ID,
 * which you can subsequently use to retrieve, update, and delete this registration.
 * @param context - The Notification Hubs client.
 * @param registration - The registration to create.
 * @param options - Options for creating a new registration.
 * @returns The newly created registration description.
 */
export function createRegistration(
  context: NotificationHubsClientContext,
  registration: RegistrationDescription,
  options: OperationOptions = {},
): Promise<RegistrationDescription> {
  return tracingClient.withSpan(
    `NotificationHubsClientContext.${OPERATION_NAME}`,
    options,
    async (updatedOptions) => {
      if (registration.registrationId) {
        throw new RestError("registrationId must not be set during a create operation", {
          statusCode: 400,
        });
      }

      return createOrUpdateRegistrationDescription(context, registration, "create", updatedOptions);
    },
  );
}
