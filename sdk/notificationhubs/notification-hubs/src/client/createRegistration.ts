// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClient } from "./client";
import { OperationOptions } from "@azure/core-client";
import { RegistrationDescription } from "../models/registration";
import { RestError } from "@azure/core-rest-pipeline";
import { createOrUpdateRegistrationDescription } from "./_createOrUpdateRegistrationDescription";
import { tracingClient } from "../utils/tracing";

/**
 * Creates a new registration. This method generates a registration ID,
 * which you can subsequently use to retrieve, update, and delete this registration.
 * @param client - The Notification Hubs client.
 * @param registration - The registration to create.
 * @param options - Options for creating a new registration.
 * @returns The newly created registration description.
 */
export function createRegistration(
  client: NotificationHubsClient,
  registration: RegistrationDescription,
  options: OperationOptions = {}
): Promise<RegistrationDescription> {
  return tracingClient.withSpan(
    "NotificationHubsClient-createRegistration",
    options,
    async (updatedOptions) => {
      if (registration.registrationId) {
        throw new RestError("registrationId must not be set during a create operation", {
          statusCode: 400,
        });
      }

      return createOrUpdateRegistrationDescription(
        client,
        registration,
        "create",
        "*",
        updatedOptions
      );
    }
  );
}
