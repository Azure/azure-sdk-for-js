// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRequest, parseNotificationResponse } from "./internal/_client.js";
import { Installation } from "../models/installation.js";
import { NotificationHubsClientContext } from "./index.js";
import { NotificationHubsResponse } from "../models/response.js";
import { OperationOptions } from "@azure/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { tracingClient } from "../utils/tracing.js";

/**
 * Creates or overwrites an installation to a Notification Hub.
 * @param context - The Notification Hubs client.
 * @param installation - The installation to create or overwrite.
 * @param options - Configuration options for the create or update installation operation.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function createOrUpdateInstallation(
  context: NotificationHubsClientContext,
  installation: Installation,
  options: OperationOptions = {}
): Promise<NotificationHubsResponse> {
  return tracingClient.withSpan(
    "NotificationHubsClientContext-createOrUpdateInstallation",
    options,
    async (updatedOptions) => {
      const endpoint = context.getBaseUrl();
      endpoint.pathname += `/installations/${installation.installationId}`;
      const headers = context.createHeaders();
      headers.set("Content-Type", "application/json");

      const request = createRequest(endpoint, "PUT", headers, updatedOptions);

      request.body = JSON.stringify(installation);

      const response = await context.sendRequest(request);
      if (response.status !== 200) {
        throw new RestError(`createOrUpdateInstallation failed with ${response.status}`, {
          statusCode: response.status,
          response: response,
        });
      }

      return parseNotificationResponse(response);
    }
  );
}
