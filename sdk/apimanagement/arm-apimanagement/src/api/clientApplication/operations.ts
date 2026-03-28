// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  ClientApplicationContract,
  _ClientApplicationCollection,
  ClientApplicationSecretsContract,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  clientApplicationContractSerializer,
  clientApplicationContractDeserializer,
  _clientApplicationCollectionDeserializer,
  clientApplicationSecretsContractDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ClientApplicationListSecretsOptionalParams,
  ClientApplicationListByServiceOptionalParams,
  ClientApplicationDeleteOptionalParams,
  ClientApplicationCreateOrUpdateOptionalParams,
  ClientApplicationGetEntityTagOptionalParams,
  ClientApplicationGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSecretsSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  clientApplicationId: string,
  options: ClientApplicationListSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/clientApplications/{clientApplicationId}/listSecrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      clientApplicationId: clientApplicationId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<ClientApplicationSecretsContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return clientApplicationSecretsContractDeserializer(result.body);
}

/** Retrived client application secrets. */
export async function listSecrets(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  clientApplicationId: string,
  options: ClientApplicationListSecretsOptionalParams = { requestOptions: {} },
): Promise<ClientApplicationSecretsContract> {
  const result = await _listSecretsSend(
    context,
    resourceGroupName,
    serviceName,
    clientApplicationId,
    options,
  );
  return _listSecretsDeserialize(result);
}

export function _listByServiceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: ClientApplicationListByServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/clientApplications{?api%2Dversion,%24filter,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ClientApplicationCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _clientApplicationCollectionDeserializer(result.body);
}

/** Lists a collection of client applications in the specified service instance. */
export function listByService(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: ClientApplicationListByServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ClientApplicationContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServiceSend(context, resourceGroupName, serviceName, options),
    _listByServiceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  clientApplicationId: string,
  options: ClientApplicationDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/clientApplications/{clientApplicationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      clientApplicationId: clientApplicationId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete client application. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  clientApplicationId: string,
  options: ClientApplicationDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    clientApplicationId,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  clientApplicationId: string,
  parameters: ClientApplicationContract,
  options: ClientApplicationCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/clientApplications/{clientApplicationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      clientApplicationId: clientApplicationId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: clientApplicationContractSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ClientApplicationContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return clientApplicationContractDeserializer(result.body);
}

/** Creates or Updates a client application. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  clientApplicationId: string,
  parameters: ClientApplicationContract,
  options: ClientApplicationCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ClientApplicationContract> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    clientApplicationId,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getEntityTagSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  clientApplicationId: string,
  options: ClientApplicationGetEntityTagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/clientApplications/{clientApplicationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      clientApplicationId: clientApplicationId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _getEntityTagDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Gets the entity state (Etag) version of the product specified by its identifier. */
export async function getEntityTag(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  clientApplicationId: string,
  options: ClientApplicationGetEntityTagOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getEntityTagSend(
    context,
    resourceGroupName,
    serviceName,
    clientApplicationId,
    options,
  );
  return _getEntityTagDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  clientApplicationId: string,
  options: ClientApplicationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/clientApplications/{clientApplicationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      clientApplicationId: clientApplicationId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ClientApplicationContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return clientApplicationContractDeserializer(result.body);
}

/** Gets the details of the client application specified by its identifier. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  clientApplicationId: string,
  options: ClientApplicationGetOptionalParams = { requestOptions: {} },
): Promise<ClientApplicationContract> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serviceName,
    clientApplicationId,
    options,
  );
  return _getDeserialize(result);
}
