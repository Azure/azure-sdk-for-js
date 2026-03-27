// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type {
  ManagedNetworkSettingsPropertiesBasicResource,
  _ManagedNetworkListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedNetworkSettingsPropertiesBasicResourceSerializer,
  managedNetworkSettingsPropertiesBasicResourceDeserializer,
  _managedNetworkListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedNetworkSettingsListOptionalParams,
  ManagedNetworkSettingsDeleteOptionalParams,
  ManagedNetworkSettingsPatchOptionalParams,
  ManagedNetworkSettingsPutOptionalParams,
  ManagedNetworkSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: ManagedNetworkSettingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedNetworks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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
): Promise<_ManagedNetworkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedNetworkListResultDeserializer(result.body);
}

/** List API for managed network settings of a cognitive services account. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: ManagedNetworkSettingsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedNetworkSettingsPropertiesBasicResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  managedNetworkName: string,
  options: ManagedNetworkSettingsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedNetworks/{managedNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      managedNetworkName: managedNetworkName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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

/** Delete API for managed network settings of a cognitive services account. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  managedNetworkName: string,
  options: ManagedNetworkSettingsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accountName, managedNetworkName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _patchSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  managedNetworkName: string,
  options: ManagedNetworkSettingsPatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedNetworks/{managedNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      managedNetworkName: managedNetworkName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["body"]
      ? options["body"]
      : managedNetworkSettingsPropertiesBasicResourceSerializer(options["body"]),
  });
}

export async function _patchDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedNetworkSettingsPropertiesBasicResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedNetworkSettingsPropertiesBasicResourceDeserializer(result.body);
}

/** Patch API for managed network settings of a cognitive services account. */
export function patch(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  managedNetworkName: string,
  options: ManagedNetworkSettingsPatchOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ManagedNetworkSettingsPropertiesBasicResource>,
  ManagedNetworkSettingsPropertiesBasicResource
> {
  return getLongRunningPoller(context, _patchDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _patchSend(context, resourceGroupName, accountName, managedNetworkName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-15-preview",
  }) as PollerLike<
    OperationState<ManagedNetworkSettingsPropertiesBasicResource>,
    ManagedNetworkSettingsPropertiesBasicResource
  >;
}

export function _putSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  managedNetworkName: string,
  body: ManagedNetworkSettingsPropertiesBasicResource,
  options: ManagedNetworkSettingsPutOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedNetworks/{managedNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      managedNetworkName: managedNetworkName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedNetworkSettingsPropertiesBasicResourceSerializer(body),
  });
}

export async function _putDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedNetworkSettingsPropertiesBasicResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedNetworkSettingsPropertiesBasicResourceDeserializer(result.body);
}

/** PUT API for managed network settings of a cognitive services account. */
export function put(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  managedNetworkName: string,
  body: ManagedNetworkSettingsPropertiesBasicResource,
  options: ManagedNetworkSettingsPutOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ManagedNetworkSettingsPropertiesBasicResource>,
  ManagedNetworkSettingsPropertiesBasicResource
> {
  return getLongRunningPoller(context, _putDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _putSend(context, resourceGroupName, accountName, managedNetworkName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-15-preview",
  }) as PollerLike<
    OperationState<ManagedNetworkSettingsPropertiesBasicResource>,
    ManagedNetworkSettingsPropertiesBasicResource
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  managedNetworkName: string,
  options: ManagedNetworkSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedNetworks/{managedNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      managedNetworkName: managedNetworkName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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
): Promise<ManagedNetworkSettingsPropertiesBasicResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedNetworkSettingsPropertiesBasicResourceDeserializer(result.body);
}

/** Get API for managed network settings of a cognitive services account. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  managedNetworkName: string,
  options: ManagedNetworkSettingsGetOptionalParams = { requestOptions: {} },
): Promise<ManagedNetworkSettingsPropertiesBasicResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    managedNetworkName,
    options,
  );
  return _getDeserialize(result);
}
