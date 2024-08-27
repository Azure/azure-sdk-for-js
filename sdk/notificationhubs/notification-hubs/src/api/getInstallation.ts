// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequest, sendRequest } from "./internal/_client.js";
import { Installation } from "../models/installation.js";
import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure-rest/core-client";
import { tracingClient } from "../utils/tracing.js";

const OPERATION_NAME = "getInstallation";

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
  options: OperationOptions = {},
): Promise<Installation> {
  return tracingClient.withSpan(
    `NotificationHubsClientContext.${OPERATION_NAME}`,
    options,
    async (updatedOptions) => {
      const endpoint = context.requestUrl();
      endpoint.pathname += `/installations/${installationId}`;

      const headers = await context.createHeaders(OPERATION_NAME);
      headers.set("Content-Type", "application/json");

      const request = createRequest(endpoint, "GET", headers, updatedOptions);
      const response = await sendRequest(context, request, 200);

      return JSON.parse(response.bodyAsText!) as Installation;
    },
  );
}
