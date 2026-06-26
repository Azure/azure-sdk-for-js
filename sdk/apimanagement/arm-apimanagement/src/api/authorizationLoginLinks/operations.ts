// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  AuthorizationLoginRequestContract,
  authorizationLoginRequestContractSerializer,
  AuthorizationLoginResponseContract,
  authorizationLoginResponseContractDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { AuthorizationLoginLinksPostOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _postSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  authorizationId: string,
  parameters: AuthorizationLoginRequestContract,
  options: AuthorizationLoginLinksPostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/authorizationProviders/{authorizationProviderId}/authorizations/{authorizationId}/getLoginLinks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      authorizationProviderId: authorizationProviderId,
      authorizationId: authorizationId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: authorizationLoginRequestContractSerializer(parameters),
    });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<AuthorizationLoginResponseContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return authorizationLoginResponseContractDeserializer(result.body);
}

/** Gets authorization login links. */
export async function post(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  authorizationProviderId: string,
  authorizationId: string,
  parameters: AuthorizationLoginRequestContract,
  options: AuthorizationLoginLinksPostOptionalParams = { requestOptions: {} },
): Promise<AuthorizationLoginResponseContract> {
  const result = await _postSend(
    context,
    resourceGroupName,
    serviceName,
    authorizationProviderId,
    authorizationId,
    parameters,
    options,
  );
  return _postDeserialize(result);
}
