// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext as Client } from "../index.js";
import type {
  FrontDoor,
  _FrontDoorListResult,
  ValidateCustomDomainInput,
  ValidateCustomDomainOutput,
} from "../../models/models.js";
import {
  frontDoorSerializer,
  frontDoorDeserializer,
  errorResponseDeserializer,
  _frontDoorListResultDeserializer,
  validateCustomDomainInputSerializer,
  validateCustomDomainOutputDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FrontDoorsValidateCustomDomainOptionalParams,
  FrontDoorsListOptionalParams,
  FrontDoorsListByResourceGroupOptionalParams,
  FrontDoorsDeleteOptionalParams,
  FrontDoorsCreateOrUpdateOptionalParams,
  FrontDoorsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _validateCustomDomainSend(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  customDomainProperties: ValidateCustomDomainInput,
  options: FrontDoorsValidateCustomDomainOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/validateCustomDomain{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      frontDoorName: frontDoorName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: validateCustomDomainInputSerializer(customDomainProperties),
  });
}

export async function _validateCustomDomainDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateCustomDomainOutput> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return validateCustomDomainOutputDeserializer(result.body);
}

/** Validates the custom domain mapping to ensure it maps to the correct Front Door endpoint in DNS. */
export async function validateCustomDomain(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  customDomainProperties: ValidateCustomDomainInput,
  options: FrontDoorsValidateCustomDomainOptionalParams = { requestOptions: {} },
): Promise<ValidateCustomDomainOutput> {
  const result = await _validateCustomDomainSend(
    context,
    resourceGroupName,
    frontDoorName,
    customDomainProperties,
    options,
  );
  return _validateCustomDomainDeserialize(result);
}

export function _listSend(
  context: Client,
  options: FrontDoorsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/frontDoors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_FrontDoorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _frontDoorListResultDeserializer(result.body);
}

/** Lists all of the Front Doors within an Azure subscription. */
export function list(
  context: Client,
  options: FrontDoorsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FrontDoor> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-11-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: FrontDoorsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_FrontDoorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _frontDoorListResultDeserializer(result.body);
}

/** Lists all of the Front Doors within a resource group under a subscription. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: FrontDoorsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FrontDoor> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-11-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  options: FrontDoorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      frontDoorName: frontDoorName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an existing Front Door with the specified parameters. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  options: FrontDoorsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, frontDoorName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  frontDoorParameters: FrontDoor,
  options: FrontDoorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      frontDoorName: frontDoorName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: frontDoorSerializer(frontDoorParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FrontDoor> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return frontDoorDeserializer(result.body);
}

/** Creates a new Front Door with a Front Door name under the specified subscription and resource group. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  frontDoorParameters: FrontDoor,
  options: FrontDoorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FrontDoor>, FrontDoor> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, frontDoorName, frontDoorParameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-11-01",
  }) as PollerLike<OperationState<FrontDoor>, FrontDoor>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  options: FrontDoorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      frontDoorName: frontDoorName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<FrontDoor> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return frontDoorDeserializer(result.body);
}

/** Gets a Front Door with the specified Front Door name under the specified subscription and resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  options: FrontDoorsGetOptionalParams = { requestOptions: {} },
): Promise<FrontDoor> {
  const result = await _getSend(context, resourceGroupName, frontDoorName, options);
  return _getDeserialize(result);
}
