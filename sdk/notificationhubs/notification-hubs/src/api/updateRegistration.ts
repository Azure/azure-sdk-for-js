// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure-rest/core-client";
import { RegistrationDescription } from "../models/registration.js";
import { RestError } from "@azure/core-rest-pipeline";
import { createOrUpdateRegistrationDescription } from "./internal/_createOrUpdateRegistrationDescription.js";
import { tracingClient } from "../utils/tracing.js";

const OPERATION_NAME = "updateRegistration";

/**
 * Updates an existing registration.
 * @param context - The Notification Hubs client.
 * @param registration - The registration to update.
 * @param options - The operation options.
 * @returns The updated registration description.
 */
export function updateRegistration(
  context: NotificationHubsClientContext,
  registration: RegistrationDescription,
  options: OperationOptions = {},
): Promise<RegistrationDescription> {
  return tracingClient.withSpan(
    `NotificationHubsClientContext.${OPERATION_NAME}`,
    options,
    async (updatedOptions) => {
      if (!registration.etag) {
        throw new RestError("ETag is required for registration update", { statusCode: 400 });
      }
      return createOrUpdateRegistrationDescription(context, registration, "update", updatedOptions);
    },
  );
}
