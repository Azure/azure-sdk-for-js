// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Installation } from "../models/installation.js";
import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { createRequest } from "./internal/_client.js";
import { tracingClient } from "../utils/tracing.js";

/**
 * Gets an Azure Notification Hub installation by the installation ID.
 * @param context - The Notification Hubs client.
 * @param installationId - The ID of the installation to get.
 * @param options - Configuration options for the get installation operation.
 * @returns The installation that matches the installation ID.
 */
export function getInstallation(
  context: NotificationHubsClientContext,
  installationId: string,
  options: OperationOptions = {}
): Promise<Installation> {
  return tracingClient.withSpan(
    "NotificationHubsClientContext-getInstallation",
    options,
    async (updatedOptions) => {
      const endpoint = context.getBaseUrl();
      endpoint.pathname += `/installations/${installationId}`;
      const headers = context.createHeaders();
      headers.set("Content-Type", "application/json");

      const request = createRequest(endpoint, "GET", headers, updatedOptions);

      const response = await context.sendRequest(request);
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
