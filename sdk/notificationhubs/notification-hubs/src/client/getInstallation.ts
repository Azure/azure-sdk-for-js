// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClient, createRequest } from "./index.js";
import { Installation } from "../models/installation.js";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { tracingClient } from "../utils/tracing.js";

/**
 * Gets an Azure Notification Hub installation by the installation ID.
 * @param client - The Notification Hubs client.
 * @param installationId - The ID of the installation to get.
 * @param options - Configuration options for the get installation operation.
 * @returns The installation that matches the installation ID.
 */
export function getInstallation(
  client: NotificationHubsClient,
  installationId: string,
  options: OperationOptions = {}
): Promise<Installation> {
  return tracingClient.withSpan(
    "NotificationHubsClient-getInstallation",
    options,
    async (updatedOptions) => {
      const endpoint = client.getBaseUrl();
      endpoint.pathname += `/installations/${installationId}`;
      const headers = client.createHeaders();
      headers.set("Content-Type", "application/json");

      const request = createRequest(endpoint, "GET", headers, updatedOptions);

      const response = await client.sendRequest(request);
      if (response.status !== 200) {
        throw new RestError(`getInstallation failed with ${response.status}`, {
          statusCode: response.status,
          response: response,
        });
      }

      return JSON.parse(response.bodyAsText!) as Installation;
    }
  );
}
