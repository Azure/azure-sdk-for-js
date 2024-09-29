// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequest, sendRequest } from "./internal/_client.js";
import { NotificationHubsClientContext } from "./index.js";
import { OperationOptions } from "@azure-rest/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { tracingClient } from "../utils/tracing.js";

const OPERATION_NAME = "createRegistrationId";

/**
 * Creates a new registration ID.
 * @param context - The Notification Hubs client.
 * @param options - The options for creating a new registration ID.
 * @returns The newly created registration ID.
 */
export function createRegistrationId(
  context: NotificationHubsClientContext,
  options: OperationOptions = {},
): Promise<string> {
  return tracingClient.withSpan(
    `NotificationHubsClientContext.${OPERATION_NAME}`,
    options,
    async (updatedOptions) => {
      const endpoint = context.requestUrl();
      endpoint.pathname += "/registrationIDs";

      const headers = await context.createHeaders(OPERATION_NAME);
      headers.set("Content-Type", "application/xml;type=entry;charset=utf-8");

      const request = createRequest(endpoint, "POST", headers, updatedOptions);
      const response = await sendRequest(context, request, 201);

      // In the form: https://{namespace}.servicebus.windows.net/{NotificationHub}/registrations/<registrationId>
      const locationHeader = response.headers.get("Location");
      if (!locationHeader || !locationHeader.startsWith("https://")) {
        throw new RestError(`Location header ${locationHeader} is an invalid URL`, {
          statusCode: 500,
          request,
          response,
        });
      }
      const locationUrl = new URL(locationHeader!);
      const registrationId = locationUrl.pathname.split("/")[3];

      return registrationId;
    },
  );
}
