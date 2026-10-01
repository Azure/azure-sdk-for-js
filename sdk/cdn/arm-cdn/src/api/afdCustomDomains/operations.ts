// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext as Client } from "../index.js";
import type {
  AFDDomain,
  AFDDomainUpdateParameters,
  _AFDDomainListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  afdDomainSerializer,
  afdDomainDeserializer,
  afdDomainUpdateParametersSerializer,
  _afdDomainListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AFDCustomDomainsRefreshValidationTokenOptionalParams,
  AFDCustomDomainsListByProfileOptionalParams,
  AFDCustomDomainsDeleteOptionalParams,
  AFDCustomDomainsUpdateOptionalParams,
  AFDCustomDomainsCreateOptionalParams,
  AFDCustomDomainsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _refreshValidationTokenSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  customDomainName: string,
  options: AFDCustomDomainsRefreshValidationTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/customDomains/{customDomainName}/refreshValidationToken{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      customDomainName: customDomainName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _refreshValidationTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
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

/** Updates the domain validation token. */
export function refreshValidationToken(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  customDomainName: string,
  options: AFDCustomDomainsRefreshValidationTokenOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _refreshValidationTokenDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _refreshValidationTokenSend(
        context,
        resourceGroupName,
        profileName,
        customDomainName,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByProfileSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: AFDCustomDomainsListByProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/customDomains{?api%2Dversion}",
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
): Promise<_AFDDomainListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _afdDomainListResultDeserializer(result.body);
}

/** Lists existing AzureFrontDoor domains. */
export function listByProfile(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: AFDCustomDomainsListByProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AFDDomain> {
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
  customDomainName: string,
  options: AFDCustomDomainsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/customDomains/{customDomainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      customDomainName: customDomainName,
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

/** Deletes an existing AzureFrontDoor domain with the specified domain name under the specified subscription, resource group and profile. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  customDomainName: string,
  options: AFDCustomDomainsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, profileName, customDomainName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  customDomainName: string,
  customDomainUpdateProperties: AFDDomainUpdateParameters,
  options: AFDCustomDomainsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/customDomains/{customDomainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      customDomainName: customDomainName,
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
    body: afdDomainUpdateParametersSerializer(customDomainUpdateProperties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<AFDDomain> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return afdDomainDeserializer(result.body);
}

/** Updates an existing domain within a profile. */
export function update(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  customDomainName: string,
  customDomainUpdateProperties: AFDDomainUpdateParameters,
  options: AFDCustomDomainsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AFDDomain>, AFDDomain> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        profileName,
        customDomainName,
        customDomainUpdateProperties,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<AFDDomain>, AFDDomain>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  customDomainName: string,
  customDomain: AFDDomain,
  options: AFDCustomDomainsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/customDomains/{customDomainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
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
    body: afdDomainSerializer(customDomain),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<AFDDomain> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return afdDomainDeserializer(result.body);
}

/** Creates a new domain within the specified profile. */
export function create(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  customDomainName: string,
  customDomain: AFDDomain,
  options: AFDCustomDomainsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AFDDomain>, AFDDomain> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, profileName, customDomainName, customDomain, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<AFDDomain>, AFDDomain>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  customDomainName: string,
  options: AFDCustomDomainsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/customDomains/{customDomainName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AFDDomain> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return afdDomainDeserializer(result.body);
}

/** Gets an existing AzureFrontDoor domain with the specified domain name under the specified subscription, resource group and profile. */
export async function get(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  customDomainName: string,
  options: AFDCustomDomainsGetOptionalParams = { requestOptions: {} },
): Promise<AFDDomain> {
  const result = await _getSend(context, resourceGroupName, profileName, customDomainName, options);
  return _getDeserialize(result);
}
