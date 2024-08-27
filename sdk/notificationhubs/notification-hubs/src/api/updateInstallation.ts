// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequest, parseNotificationResponse, sendRequest } from "./internal/_client.js";
import { JsonPatch } from "../models/installation.js";
import { NotificationHubsClientContext } from "./index.js";
import { NotificationHubsResponse } from "../models/notificationDetails.js";
import { OperationOptions } from "@azure-rest/core-client";
import { tracingClient } from "../utils/tracing.js";

const OPERATION_NAME = "updateInstallation";

/**
 * Updates an installation using the JSON-Patch standard in RFC6902.
 * @param context - The Notification Hubs client.
 * @param installationId - The ID of the installation to update.
 * @param installationPatches - An array of patches following the JSON-Patch standard.
 * @param options - Configuration options for the patch installation operation.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function updateInstallation(
  context: NotificationHubsClientContext,
  installationId: string,
  installationPatches: JsonPatch[],
  options: OperationOptions = {},
): Promise<NotificationHubsResponse> {
  return tracingClient.withSpan(
    `NotificationHubsClientContext.${OPERATION_NAME}`,
    options,
    async (updatedOptions) => {
      const endpoint = context.requestUrl();
      endpoint.pathname += `/installations/${installationId}`;

      const headers = await context.createHeaders(OPERATION_NAME);
      headers.set("Content-Type", "application/json");

      const request = createRequest(endpoint, "PATCH", headers, updatedOptions);
      request.body = JSON.stringify(installationPatches);
      const response = await sendRequest(context, request, 200);

      return parseNotificationResponse(response);
    },
  );
}
