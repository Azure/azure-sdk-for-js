// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRequest, parseNotificationResponse, sendRequest } from "./internal/_client.js";
import { Installation } from "../models/installation.js";
import { NotificationHubsClientContext } from "./index.js";
import { NotificationHubsResponse } from "../models/response.js";
import { OperationOptions } from "@azure/core-client";
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
      const endpoint = context.requestUrl();
      endpoint.pathname += `/installations/${installation.installationId}`;
      const headers = context.createHeaders();
      headers.set("Content-Type", "application/json");

      const request = createRequest(endpoint, "PUT", headers, updatedOptions);
      request.body = JSON.stringify(installation);

      const response = await sendRequest(context, request, 200);

      return parseNotificationResponse(response);
    }
  );
}
