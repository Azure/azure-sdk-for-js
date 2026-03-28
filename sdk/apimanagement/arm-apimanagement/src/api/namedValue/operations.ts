// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  NamedValueContract,
  NamedValueCreateContract,
  NamedValueUpdateParameters,
  _NamedValueCollection,
  NamedValueSecretContract,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  namedValueContractDeserializer,
  namedValueCreateContractSerializer,
  namedValueUpdateParametersSerializer,
  _namedValueCollectionDeserializer,
  namedValueSecretContractDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NamedValueRefreshSecretOptionalParams,
  NamedValueListValueOptionalParams,
  NamedValueListByServiceOptionalParams,
  NamedValueDeleteOptionalParams,
  NamedValueUpdateOptionalParams,
  NamedValueCreateOrUpdateOptionalParams,
  NamedValueGetEntityTagOptionalParams,
  NamedValueGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _refreshSecretSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  namedValueId: string,
  options: NamedValueRefreshSecretOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}/refreshSecret{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      namedValueId: namedValueId,
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

export async function _refreshSecretDeserialize(
  result: PathUncheckedResponse,
): Promise<NamedValueContract> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return namedValueContractDeserializer(result.body);
}

/** Refresh the secret of the named value specified by its identifier. */
export function refreshSecret(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  namedValueId: string,
  options: NamedValueRefreshSecretOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NamedValueContract>, NamedValueContract> {
  return getLongRunningPoller(context, _refreshSecretDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _refreshSecretSend(context, resourceGroupName, serviceName, namedValueId, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<NamedValueContract>, NamedValueContract>;
}

export function _listValueSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  namedValueId: string,
  options: NamedValueListValueOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}/listValue{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      namedValueId: namedValueId,
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

export async function _listValueDeserialize(
  result: PathUncheckedResponse,
): Promise<NamedValueSecretContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return namedValueSecretContractDeserializer(result.body);
}

/** Gets the secret of the named value specified by its identifier. */
export async function listValue(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  namedValueId: string,
  options: NamedValueListValueOptionalParams = { requestOptions: {} },
): Promise<NamedValueSecretContract> {
  const result = await _listValueSend(
    context,
    resourceGroupName,
    serviceName,
    namedValueId,
    options,
  );
  return _listValueDeserialize(result);
}

export function _listByServiceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: NamedValueListByServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues{?api%2Dversion,%24filter,%24top,%24skip,isKeyVaultRefreshFailed}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
      isKeyVaultRefreshFailed: options?.isKeyVaultRefreshFailed,
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
): Promise<_NamedValueCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _namedValueCollectionDeserializer(result.body);
}

/** Lists a collection of named values defined within a service instance. */
export function listByService(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: NamedValueListByServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NamedValueContract> {
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
  namedValueId: string,
  ifMatch: string,
  options: NamedValueDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      namedValueId: namedValueId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "if-match": ifMatch, ...options.requestOptions?.headers },
  });
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

/** Deletes specific named value from the API Management service instance. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  namedValueId: string,
  ifMatch: string,
  options: NamedValueDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    namedValueId,
    ifMatch,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  namedValueId: string,
  ifMatch: string,
  parameters: NamedValueUpdateParameters,
  options: NamedValueUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      namedValueId: namedValueId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "if-match": ifMatch,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: namedValueUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<NamedValueContract> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return namedValueContractDeserializer(result.body);
}

/** Updates the specific named value. */
export function update(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  namedValueId: string,
  ifMatch: string,
  parameters: NamedValueUpdateParameters,
  options: NamedValueUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NamedValueContract>, NamedValueContract> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        serviceName,
        namedValueId,
        ifMatch,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<NamedValueContract>, NamedValueContract>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  namedValueId: string,
  parameters: NamedValueCreateContract,
  options: NamedValueCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      namedValueId: namedValueId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: namedValueCreateContractSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NamedValueContract> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return namedValueContractDeserializer(result.body);
}

/** Creates or updates named value. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  namedValueId: string,
  parameters: NamedValueCreateContract,
  options: NamedValueCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NamedValueContract>, NamedValueContract> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serviceName,
        namedValueId,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<NamedValueContract>, NamedValueContract>;
}

export function _getEntityTagSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  namedValueId: string,
  options: NamedValueGetEntityTagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      namedValueId: namedValueId,
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

/** Gets the entity state (Etag) version of the named value specified by its identifier. */
export async function getEntityTag(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  namedValueId: string,
  options: NamedValueGetEntityTagOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getEntityTagSend(
    context,
    resourceGroupName,
    serviceName,
    namedValueId,
    options,
  );
  return _getEntityTagDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  namedValueId: string,
  options: NamedValueGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      namedValueId: namedValueId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NamedValueContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return namedValueContractDeserializer(result.body);
}

/** Gets the details of the named value specified by its identifier. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  namedValueId: string,
  options: NamedValueGetOptionalParams = { requestOptions: {} },
): Promise<NamedValueContract> {
  const result = await _getSend(context, resourceGroupName, serviceName, namedValueId, options);
  return _getDeserialize(result);
}
