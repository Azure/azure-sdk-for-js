// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequest, parseNotificationResponse, sendRequest } from "./internal/_client.js";
import { EntityOperationOptions } from "../models/options.js";
import { NotificationHubsClientContext } from "./index.js";
import { NotificationHubsResponse } from "../models/notificationDetails.js";
import { isDefined } from "../utils/utils.js";
import { tracingClient } from "../utils/tracing.js";

const OPERATION_NAME = "deleteRegistration";

/**
 * Deletes a registration with the given registration ID.
 * @param context - The Notification Hubs client.
 * @param registrationId - The registration ID of the registration to delete.
 * @param options - The options for delete operations including the ETag
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export function deleteRegistration(
  context: NotificationHubsClientContext,
  registrationId: string,
  options: EntityOperationOptions = {},
): Promise<NotificationHubsResponse> {
  return tracingClient.withSpan(
    `NotificationHubsClientContext.${OPERATION_NAME}`,
    options,
    async (updatedOptions) => {
      const endpoint = context.requestUrl();
      endpoint.pathname += `/registrations/${registrationId}`;

      const headers = await context.createHeaders(OPERATION_NAME);
      headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
      headers.set("If-Match", isDefined(options.etag) ? `"${options.etag}"` : "*");

      const request = createRequest(endpoint, "DELETE", headers, updatedOptions);
      const response = await sendRequest(context, request, 200);

      return parseNotificationResponse(response);
    },
  );
}
