// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext as Client } from "../index.js";
import type {
  CustomDomain,
  CustomDomainParameters,
  _CustomDomainListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  customDomainDeserializer,
  customDomainHttpsParametersUnionSerializer,
  customDomainParametersSerializer,
  _customDomainListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CustomDomainsEnableCustomHttpsOptionalParams,
  CustomDomainsDisableCustomHttpsOptionalParams,
  CustomDomainsListByEndpointOptionalParams,
  CustomDomainsDeleteOptionalParams,
  CustomDomainsCreateOptionalParams,
  CustomDomainsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _enableCustomHttpsSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  customDomainName: string,
  options: CustomDomainsEnableCustomHttpsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/customDomains/{customDomainName}/enableCustomHttps{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      customDomainName: customDomainName,
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
    body: !options?.customDomainHttpsParameters
      ? options?.customDomainHttpsParameters
      : customDomainHttpsParametersUnionSerializer(options?.customDomainHttpsParameters),
  });
}

export async function _enableCustomHttpsDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomDomain> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return customDomainDeserializer(result.body);
}

/** Enable https delivery of the custom domain. */
export function enableCustomHttps(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  customDomainName: string,
  options: CustomDomainsEnableCustomHttpsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CustomDomain>, CustomDomain> {
  return getLongRunningPoller(context, _enableCustomHttpsDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _enableCustomHttpsSend(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<CustomDomain>, CustomDomain>;
}

export function _disableCustomHttpsSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  customDomainName: string,
  options: CustomDomainsDisableCustomHttpsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/customDomains/{customDomainName}/disableCustomHttps{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      customDomainName: customDomainName,
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

export async function _disableCustomHttpsDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomDomain> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return customDomainDeserializer(result.body);
}

/** Disable https delivery of the custom domain. */
export function disableCustomHttps(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  customDomainName: string,
  options: CustomDomainsDisableCustomHttpsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CustomDomain>, CustomDomain> {
  return getLongRunningPoller(context, _disableCustomHttpsDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _disableCustomHttpsSend(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<CustomDomain>, CustomDomain>;
}

export function _listByEndpointSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: CustomDomainsListByEndpointOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/customDomains{?api%2Dversion}",
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

export async function _listByEndpointDeserialize(
  result: PathUncheckedResponse,
): Promise<_CustomDomainListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _customDomainListResultDeserializer(result.body);
}

/** Lists all of the existing custom domains within an endpoint. */
export function listByEndpoint(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: CustomDomainsListByEndpointOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CustomDomain> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEndpointSend(context, resourceGroupName, profileName, endpointName, options),
    _listByEndpointDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  customDomainName: string,
  options: CustomDomainsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/customDomains/{customDomainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      customDomainName: customDomainName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<CustomDomain> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return customDomainDeserializer(result.body);
}

/** Deletes an existing custom domain within an endpoint. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  customDomainName: string,
  options: CustomDomainsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CustomDomain>, CustomDomain> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<CustomDomain>, CustomDomain>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  customDomainName: string,
  customDomainProperties: CustomDomainParameters,
  options: CustomDomainsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/customDomains/{customDomainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      customDomainName: customDomainName,
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
    body: customDomainParametersSerializer(customDomainProperties),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<CustomDomain> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return customDomainDeserializer(result.body);
}

/** Creates a new custom domain within an endpoint. */
export function create(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  customDomainName: string,
  customDomainProperties: CustomDomainParameters,
  options: CustomDomainsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CustomDomain>, CustomDomain> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        customDomainName,
        customDomainProperties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<CustomDomain>, CustomDomain>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  customDomainName: string,
  options: CustomDomainsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/customDomains/{customDomainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      customDomainName: customDomainName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CustomDomain> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return customDomainDeserializer(result.body);
}

/** Gets an existing custom domain within an endpoint. */
export async function get(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  customDomainName: string,
  options: CustomDomainsGetOptionalParams = { requestOptions: {} },
): Promise<CustomDomain> {
  const result = await _getSend(
    context,
    resourceGroupName,
    profileName,
    endpointName,
    customDomainName,
    options,
  );
  return _getDeserialize(result);
}
