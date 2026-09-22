// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext as Client } from "../index.js";
import type {
  AFDEndpoint,
  AFDEndpointUpdateParameters,
  _AFDEndpointListResult,
  AfdPurgeParameters,
  _UsagesListResult,
  Usage,
  ValidateCustomDomainInput,
  ValidateCustomDomainOutput,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  afdEndpointSerializer,
  afdEndpointDeserializer,
  afdEndpointUpdateParametersSerializer,
  _afdEndpointListResultDeserializer,
  afdPurgeParametersSerializer,
  _usagesListResultDeserializer,
  validateCustomDomainInputSerializer,
  validateCustomDomainOutputDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AFDEndpointsValidateCustomDomainOptionalParams,
  AFDEndpointsListResourceUsageOptionalParams,
  AFDEndpointsPurgeContentOptionalParams,
  AFDEndpointsListByProfileOptionalParams,
  AFDEndpointsDeleteOptionalParams,
  AFDEndpointsUpdateOptionalParams,
  AFDEndpointsCreateOptionalParams,
  AFDEndpointsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _validateCustomDomainSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  customDomainProperties: ValidateCustomDomainInput,
  options: AFDEndpointsValidateCustomDomainOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}/validateCustomDomain{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return validateCustomDomainOutputDeserializer(result.body);
}

/** Validates the custom domain mapping to ensure it maps to the correct Azure Front Door endpoint in DNS. */
export async function validateCustomDomain(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  customDomainProperties: ValidateCustomDomainInput,
  options: AFDEndpointsValidateCustomDomainOptionalParams = { requestOptions: {} },
): Promise<ValidateCustomDomainOutput> {
  const result = await _validateCustomDomainSend(
    context,
    resourceGroupName,
    profileName,
    endpointName,
    customDomainProperties,
    options,
  );
  return _validateCustomDomainDeserialize(result);
}

export function _listResourceUsageSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: AFDEndpointsListResourceUsageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}/usages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _listResourceUsageDeserialize(
  result: PathUncheckedResponse,
): Promise<_UsagesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _usagesListResultDeserializer(result.body);
}

/** Checks the quota and actual usage of endpoints under the given Azure Front Door profile. */
export function listResourceUsage(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: AFDEndpointsListResourceUsageOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Usage> {
  return buildPagedAsyncIterator(
    context,
    () => _listResourceUsageSend(context, resourceGroupName, profileName, endpointName, options),
    _listResourceUsageDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _purgeContentSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  contents: AfdPurgeParameters,
  options: AFDEndpointsPurgeContentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}/purge{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: afdPurgeParametersSerializer(contents),
  });
}

export async function _purgeContentDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Removes a content from AzureFrontDoor. */
export function purgeContent(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  contents: AfdPurgeParameters,
  options: AFDEndpointsPurgeContentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _purgeContentDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _purgeContentSend(context, resourceGroupName, profileName, endpointName, contents, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByProfileSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: AFDEndpointsListByProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _listByProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<_AFDEndpointListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _afdEndpointListResultDeserializer(result.body);
}

/** Lists existing AzureFrontDoor endpoints. */
export function listByProfile(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: AFDEndpointsListByProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AFDEndpoint> {
  return buildPagedAsyncIterator(
    context,
    () => _listByProfileSend(context, resourceGroupName, profileName, options),
    _listByProfileDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: AFDEndpointsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an existing AzureFrontDoor endpoint with the specified endpoint name under the specified subscription, resource group and profile. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: AFDEndpointsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, profileName, endpointName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  endpointUpdateProperties: AFDEndpointUpdateParameters,
  options: AFDEndpointsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: afdEndpointUpdateParametersSerializer(endpointUpdateProperties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<AFDEndpoint> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return afdEndpointDeserializer(result.body);
}

/** Updates an existing AzureFrontDoor endpoint with the specified endpoint name under the specified subscription, resource group and profile. Only tags can be updated after creating an endpoint. To update origins, use the Update Origin operation. To update origin groups, use the Update Origin group operation. To update domains, use the Update Custom Domain operation. */
export function update(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  endpointUpdateProperties: AFDEndpointUpdateParameters,
  options: AFDEndpointsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AFDEndpoint>, AFDEndpoint> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        endpointUpdateProperties,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<AFDEndpoint>, AFDEndpoint>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  endpointParam: AFDEndpoint,
  options: AFDEndpointsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: afdEndpointSerializer(endpointParam),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<AFDEndpoint> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return afdEndpointDeserializer(result.body);
}

/** Creates a new AzureFrontDoor endpoint with the specified endpoint name under the specified subscription, resource group and profile. */
export function create(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  endpointParam: AFDEndpoint,
  options: AFDEndpointsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AFDEndpoint>, AFDEndpoint> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, profileName, endpointName, endpointParam, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<AFDEndpoint>, AFDEndpoint>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: AFDEndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/afdEndpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AFDEndpoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return afdEndpointDeserializer(result.body);
}

/** Gets an existing AzureFrontDoor endpoint with the specified endpoint name under the specified subscription, resource group and profile. */
export async function get(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: AFDEndpointsGetOptionalParams = { requestOptions: {} },
): Promise<AFDEndpoint> {
  const result = await _getSend(context, resourceGroupName, profileName, endpointName, options);
  return _getDeserialize(result);
}
