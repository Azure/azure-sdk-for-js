// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClient, createRequest } from "./client";
import { Installation } from "../models/installation";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { tracingClient } from "../utils/tracing";

/**
 * Creates or overwrites an installation to a Notification Hub.
 * @param client - The Notification Hubs client.
 * @param installation - The installation to create or overwrite.
 * @param options - Configuration options for the create or update installation operation.
 * @returns The created or overwritten installation.
 */
export function createOrUpdateInstallation(
  client: NotificationHubsClient,
  installation: Installation,
  options: OperationOptions = {}
): Promise<Installation> {
  return tracingClient.withSpan(
    "NotificationHubsClient-createOrUpdateInstallation",
    options,
    async (updatedOptions) => {
      const endpoint = client.getBaseUrl();
      endpoint.pathname += `/installations/${installation.installationId}`;
      const headers = client.createHeaders();
      headers.set("Content-Type", "application/json");

      const request = createRequest(endpoint, "PUT", headers, updatedOptions);

      request.body = JSON.stringify(installation);

      const response = await client.sendRequest(request);
      if (response.status !== 200) {
        throw new RestError(`createOrUpdateInstallation failed with ${response.status}`, {
          statusCode: response.status,
          response: response,
        });
      }

      return JSON.parse(response.bodyAsText!) as Installation;
    }
  );
}
