// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpMethods, RestError } from "@azure/core-rest-pipeline";
import { NotificationHubsClient, createRequest } from "../index.js";
import {
  registrationDescriptionParser,
  registrationDescriptionSerializer,
} from "../../serializers/registrationSerializer.js";
import { OperationOptions } from "@azure/core-client";
import { RegistrationDescription } from "../../models/registration.js";

/**
 * @internal
 */
export async function createOrUpdateRegistrationDescription(
  client: NotificationHubsClient,
  registration: RegistrationDescription,
  operationName: "create" | "createOrUpdate" | "update",
  etag: string,
  options: OperationOptions
): Promise<RegistrationDescription> {
  const endpoint = client.getBaseUrl();
  endpoint.pathname += "/registrations";
  let httpMethod: HttpMethods = "POST";

  if (operationName === "createOrUpdate" || operationName === "update") {
    endpoint.pathname += `/${registration.registrationId}`;
    httpMethod = "PUT";
  }

  // Clear out readonly properties
  registration.registrationId = undefined;
  registration.etag = undefined;

  const headers = client.createHeaders();
  headers.set("Content-Type", "application/atom+xml;type=entry;charset=utf-8");
  headers.set("If-Match", etag);

  const request = createRequest(endpoint, httpMethod, headers, options);
  request.body = registrationDescriptionSerializer.serializeRegistrationDescription(registration);
  const response = await client.sendRequest(request);
  if (response.status !== 200 && response.status !== 201) {
    throw new RestError(`${operationName}Registration failed with ${response.status}`, {
      statusCode: response.status,
      response: response,
    });
  }

  return registrationDescriptionParser.parseRegistrationEntry(response.bodyAsText!);
}
