// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRequest, parseNotificationResponse } from "./internal/_client.js";
import { JsonPatch } from "../models/installation.js";
import { NotificationHubsClient } from "./index.js";
import { NotificationHubsResponse } from "../models/response.js";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { tracingClient } from "../utils/tracing.js";

/**
 * Updates an installation using the JSON-Patch standard in RFC6902.
 * @param client - The Notification Hubs client.
 * @param installationId - The ID of the installation to update.
 * @param installationPatches - An array of patches following the JSON-Patch standard.
 * @param options - Configuration options for the patch installation operation.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function updateInstallation(
  client: NotificationHubsClient,
  installationId: string,
  installationPatches: JsonPatch[],
  options: OperationOptions = {}
): Promise<NotificationHubsResponse> {
  return tracingClient.withSpan(
    "NotificationHubsClient-updateInstallation",
    options,
    async (updatedOptions) => {
      const endpoint = client.getBaseUrl();
      endpoint.pathname += `/installations/${installationId}`;
      const headers = client.createHeaders();
      headers.set("Content-Type", "application/json");

      const request = createRequest(endpoint, "PATCH", headers, updatedOptions);

      request.body = JSON.stringify(installationPatches);

      const response = await client.sendRequest(request);
      if (response.status !== 200) {
        throw new RestError(`patchInstallation failed with ${response.status}`, {
          statusCode: response.status,
          response: response,
        });
      }

      return parseNotificationResponse(response);
    }
  );
}
