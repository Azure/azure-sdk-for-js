// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  ClientApplicationProductLinkContract,
  _ClientApplicationProductLinkCollection,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  clientApplicationProductLinkContractSerializer,
  clientApplicationProductLinkContractDeserializer,
  _clientApplicationProductLinkCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ClientApplicationProductLinkListByClientApplicationsOptionalParams,
  ClientApplicationProductLinkDeleteOptionalParams,
  ClientApplicationProductLinkCreateOptionalParams,
  ClientApplicationProductLinkGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByClientApplicationsSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  clientApplicationId: string,
  options: ClientApplicationProductLinkListByClientApplicationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/clientApplications/{clientApplicationId}/productLinks{?api%2Dversion,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      clientApplicationId: clientApplicationId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _listByClientApplicationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ClientApplicationProductLinkCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _clientApplicationProductLinkCollectionDeserializer(result.body);
}

/** Lists a collection of product links associated with the specified client application. */
export function listByClientApplications(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  clientApplicationId: string,
  options: ClientApplicationProductLinkListByClientApplicationsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ClientApplicationProductLinkContract> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByClientApplicationsSend(
        context,
        resourceGroupName,
        serviceName,
        clientApplicationId,
        options,
      ),
    _listByClientApplicationsDeserialize,
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
  clientApplicationProductLinkId: string,
  options: ClientApplicationProductLinkDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/clientApplications/{clientApplicationId}/productLinks/{clientApplicationProductLinkId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      clientApplicationId: clientApplicationId,
      clientApplicationProductLinkId: clientApplicationProductLinkId,
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

/** Deletes the specified Product from the specified client application. */
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
  clientApplicationProductLinkId: string,
  options: ClientApplicationProductLinkDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    clientApplicationId,
    clientApplicationProductLinkId,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  clientApplicationId: string,
  clientApplicationProductLinkId: string,
  parameters: ClientApplicationProductLinkContract,
  options: ClientApplicationProductLinkCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/clientApplications/{clientApplicationId}/productLinks/{clientApplicationProductLinkId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      clientApplicationId: clientApplicationId,
      clientApplicationProductLinkId: clientApplicationProductLinkId,
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
    body: clientApplicationProductLinkContractSerializer(parameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ClientApplicationProductLinkContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return clientApplicationProductLinkContractDeserializer(result.body);
}

/** Adds an Product to the specified Client Application via link. */
export async function create(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  clientApplicationId: string,
  clientApplicationProductLinkId: string,
  parameters: ClientApplicationProductLinkContract,
  options: ClientApplicationProductLinkCreateOptionalParams = { requestOptions: {} },
): Promise<ClientApplicationProductLinkContract> {
  const result = await _createSend(
    context,
    resourceGroupName,
    serviceName,
    clientApplicationId,
    clientApplicationProductLinkId,
    parameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  clientApplicationId: string,
  clientApplicationProductLinkId: string,
  options: ClientApplicationProductLinkGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/clientApplications/{clientApplicationId}/productLinks/{clientApplicationProductLinkId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      clientApplicationId: clientApplicationId,
      clientApplicationProductLinkId: clientApplicationProductLinkId,
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
): Promise<ClientApplicationProductLinkContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return clientApplicationProductLinkContractDeserializer(result.body);
}

/** Gets the product link for the client application. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  clientApplicationId: string,
  clientApplicationProductLinkId: string,
  options: ClientApplicationProductLinkGetOptionalParams = { requestOptions: {} },
): Promise<ClientApplicationProductLinkContract> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serviceName,
    clientApplicationId,
    clientApplicationProductLinkId,
    options,
  );
  return _getDeserialize(result);
}
