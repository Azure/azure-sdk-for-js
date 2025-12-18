// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Extension,
  extensionSerializer,
  extensionDeserializer,
  ExtensionPatch,
  extensionPatchSerializer,
  _ExtensionList,
  _extensionListDeserializer,
  ExtensionUpgradeParameters,
  extensionUpgradeParametersSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ExtensionsUpgradeOptionalParams,
  ExtensionsListByArcSettingOptionalParams,
  ExtensionsDeleteOptionalParams,
  ExtensionsUpdateOptionalParams,
  ExtensionsCreateOptionalParams,
  ExtensionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _upgradeSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  extensionName: string,
  extensionUpgradeParameters: ExtensionUpgradeParameters,
  options: ExtensionsUpgradeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/extensions/{extensionName}/upgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      arcSettingName: arcSettingName,
      extensionName: extensionName,
      "api%2Dversion": context.apiVersion,
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
      body: extensionUpgradeParametersSerializer(extensionUpgradeParameters),
    });
}

export async function _upgradeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Upgrade a particular Arc Extension of HCI Cluster. */
export function upgrade(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  extensionName: string,
  extensionUpgradeParameters: ExtensionUpgradeParameters,
  options: ExtensionsUpgradeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _upgradeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _upgradeSend(
        context,
        resourceGroupName,
        clusterName,
        arcSettingName,
        extensionName,
        extensionUpgradeParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByArcSettingSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  options: ExtensionsListByArcSettingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/extensions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      arcSettingName: arcSettingName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByArcSettingDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExtensionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _extensionListDeserializer(result.body);
}

/** List all Extensions under ArcSetting resource. */
export function listByArcSetting(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  options: ExtensionsListByArcSettingOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Extension> {
  return buildPagedAsyncIterator(
    context,
    () => _listByArcSettingSend(context, resourceGroupName, clusterName, arcSettingName, options),
    _listByArcSettingDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  extensionName: string,
  options: ExtensionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/extensions/{extensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      arcSettingName: arcSettingName,
      extensionName: extensionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete particular Arc Extension of HCI Cluster. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  extensionName: string,
  options: ExtensionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, arcSettingName, extensionName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  extensionName: string,
  extension: ExtensionPatch,
  options: ExtensionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/extensions/{extensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      arcSettingName: arcSettingName,
      extensionName: extensionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: extensionPatchSerializer(extension),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Extension> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return extensionDeserializer(result.body);
}

/** Update Extension for HCI cluster. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  extensionName: string,
  extension: ExtensionPatch,
  options: ExtensionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Extension>, Extension> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        clusterName,
        arcSettingName,
        extensionName,
        extension,
        options,
      ),
    resourceLocationConfig: "original-uri",
  }) as PollerLike<OperationState<Extension>, Extension>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  extensionName: string,
  extension: Extension,
  options: ExtensionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/extensions/{extensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      arcSettingName: arcSettingName,
      extensionName: extensionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: extensionSerializer(extension),
    });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Extension> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return extensionDeserializer(result.body);
}

/** Create Extension for HCI cluster. */
export function create(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  extensionName: string,
  extension: Extension,
  options: ExtensionsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Extension>, Extension> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        clusterName,
        arcSettingName,
        extensionName,
        extension,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Extension>, Extension>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  extensionName: string,
  options: ExtensionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/arcSettings/{arcSettingName}/extensions/{extensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      arcSettingName: arcSettingName,
      extensionName: extensionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Extension> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return extensionDeserializer(result.body);
}

/** Get particular Arc Extension of HCI Cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  arcSettingName: string,
  extensionName: string,
  options: ExtensionsGetOptionalParams = { requestOptions: {} },
): Promise<Extension> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    arcSettingName,
    extensionName,
    options,
  );
  return _getDeserialize(result);
}
