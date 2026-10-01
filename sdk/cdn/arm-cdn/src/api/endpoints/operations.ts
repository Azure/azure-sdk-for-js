// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext as Client } from "../index.js";
import type {
  _ResourceUsageListResult,
  ResourceUsage,
  ValidateCustomDomainInput,
  ValidateCustomDomainOutput,
  Endpoint,
  EndpointUpdateParameters,
  _EndpointListResult,
  PurgeParameters,
  LoadParameters,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _resourceUsageListResultDeserializer,
  validateCustomDomainInputSerializer,
  validateCustomDomainOutputDeserializer,
  endpointSerializer,
  endpointDeserializer,
  endpointUpdateParametersSerializer,
  _endpointListResultDeserializer,
  purgeParametersSerializer,
  loadParametersSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EndpointsListResourceUsageOptionalParams,
  EndpointsValidateCustomDomainOptionalParams,
  EndpointsLoadContentOptionalParams,
  EndpointsPurgeContentOptionalParams,
  EndpointsStopOptionalParams,
  EndpointsStartOptionalParams,
  EndpointsListByProfileOptionalParams,
  EndpointsDeleteOptionalParams,
  EndpointsUpdateOptionalParams,
  EndpointsCreateOptionalParams,
  EndpointsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listResourceUsageSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: EndpointsListResourceUsageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/checkResourceUsage{?api%2Dversion}",
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
): Promise<_ResourceUsageListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _resourceUsageListResultDeserializer(result.body);
}

/** Checks the quota and usage of geo filters and custom domains under the given endpoint. */
export function listResourceUsage(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: EndpointsListResourceUsageOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceUsage> {
  return buildPagedAsyncIterator(
    context,
    () => _listResourceUsageSend(context, resourceGroupName, profileName, endpointName, options),
    _listResourceUsageDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _validateCustomDomainSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  customDomainProperties: ValidateCustomDomainInput,
  options: EndpointsValidateCustomDomainOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/validateCustomDomain{?api%2Dversion}",
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

/** Validates the custom domain mapping to ensure it maps to the correct CDN endpoint in DNS. */
export async function validateCustomDomain(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  customDomainProperties: ValidateCustomDomainInput,
  options: EndpointsValidateCustomDomainOptionalParams = { requestOptions: {} },
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

export function _loadContentSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  contentFilePaths: LoadParameters,
  options: EndpointsLoadContentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/load{?api%2Dversion}",
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
    body: loadParametersSerializer(contentFilePaths),
  });
}

export async function _loadContentDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Pre-loads a content to CDN. Available for Verizon Profiles. */
export function loadContent(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  contentFilePaths: LoadParameters,
  options: EndpointsLoadContentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _loadContentDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _loadContentSend(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        contentFilePaths,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _purgeContentSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  contentFilePaths: PurgeParameters,
  options: EndpointsPurgeContentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/purge{?api%2Dversion}",
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
    body: purgeParametersSerializer(contentFilePaths),
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

/** Removes a content from CDN. */
export function purgeContent(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  contentFilePaths: PurgeParameters,
  options: EndpointsPurgeContentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _purgeContentDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _purgeContentSend(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        contentFilePaths,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: EndpointsStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/stop{?api%2Dversion}",
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

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<Endpoint> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointDeserializer(result.body);
}

/** Stops an existing running CDN endpoint. */
export function stop(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: EndpointsStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Endpoint>, Endpoint> {
  return getLongRunningPoller(context, _stopDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopSend(context, resourceGroupName, profileName, endpointName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<Endpoint>, Endpoint>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: EndpointsStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/start{?api%2Dversion}",
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

export async function _startDeserialize(result: PathUncheckedResponse): Promise<Endpoint> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointDeserializer(result.body);
}

/** Starts an existing CDN endpoint that is on a stopped state. */
export function start(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: EndpointsStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Endpoint>, Endpoint> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startSend(context, resourceGroupName, profileName, endpointName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<Endpoint>, Endpoint>;
}

export function _listByProfileSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: EndpointsListByProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints{?api%2Dversion}",
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
): Promise<_EndpointListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _endpointListResultDeserializer(result.body);
}

/** Lists existing CDN endpoints. */
export function listByProfile(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: EndpointsListByProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Endpoint> {
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
  options: EndpointsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}{?api%2Dversion}",
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

/** Deletes an existing CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: EndpointsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, profileName, endpointName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  endpointUpdateProperties: EndpointUpdateParameters,
  options: EndpointsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}{?api%2Dversion}",
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
    body: endpointUpdateParametersSerializer(endpointUpdateProperties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Endpoint> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointDeserializer(result.body);
}

/** Updates an existing CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile. Only tags can be updated after creating an endpoint. To update origins, use the Update Origin operation. To update origin groups, use the Update Origin group operation. To update custom domains, use the Update Custom Domain operation. */
export function update(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  endpointUpdateProperties: EndpointUpdateParameters,
  options: EndpointsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Endpoint>, Endpoint> {
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
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<Endpoint>, Endpoint>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  endpointParam: Endpoint,
  options: EndpointsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}{?api%2Dversion}",
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
    body: endpointSerializer(endpointParam),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Endpoint> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointDeserializer(result.body);
}

/** Creates a new CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile. */
export function create(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  endpointParam: Endpoint,
  options: EndpointsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Endpoint>, Endpoint> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, profileName, endpointName, endpointParam, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<Endpoint>, Endpoint>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: EndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Endpoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointDeserializer(result.body);
}

/** Gets an existing CDN endpoint with the specified endpoint name under the specified subscription, resource group and profile. */
export async function get(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: EndpointsGetOptionalParams = { requestOptions: {} },
): Promise<Endpoint> {
  const result = await _getSend(context, resourceGroupName, profileName, endpointName, options);
  return _getDeserialize(result);
}
