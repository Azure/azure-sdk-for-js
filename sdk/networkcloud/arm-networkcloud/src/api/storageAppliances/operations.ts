// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OperationStatusResult,
  operationStatusResultDeserializer,
  StorageAppliance,
  storageApplianceSerializer,
  storageApplianceDeserializer,
  storageAppliancePatchParametersSerializer,
  _StorageApplianceList,
  _storageApplianceListDeserializer,
  storageApplianceEnableRemoteVendorManagementParametersSerializer,
  StorageApplianceRunReadCommandsParameters,
  storageApplianceRunReadCommandsParametersSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StorageAppliancesRunReadCommandsOptionalParams,
  StorageAppliancesEnableRemoteVendorManagementOptionalParams,
  StorageAppliancesDisableRemoteVendorManagementOptionalParams,
  StorageAppliancesListBySubscriptionOptionalParams,
  StorageAppliancesListByResourceGroupOptionalParams,
  StorageAppliancesDeleteOptionalParams,
  StorageAppliancesUpdateOptionalParams,
  StorageAppliancesCreateOrUpdateOptionalParams,
  StorageAppliancesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _runReadCommandsSend(
  context: Client,
  resourceGroupName: string,
  storageApplianceName: string,
  storageApplianceRunReadCommandsParameters: StorageApplianceRunReadCommandsParameters,
  options: StorageAppliancesRunReadCommandsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}/runReadCommands{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageApplianceName: storageApplianceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      body: storageApplianceRunReadCommandsParametersSerializer(
        storageApplianceRunReadCommandsParameters,
      ),
    });
}

export async function _runReadCommandsDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Run one or more read-only commands on the provided storage appliance. */
export function runReadCommands(
  context: Client,
  resourceGroupName: string,
  storageApplianceName: string,
  storageApplianceRunReadCommandsParameters: StorageApplianceRunReadCommandsParameters,
  options: StorageAppliancesRunReadCommandsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _runReadCommandsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _runReadCommandsSend(
        context,
        resourceGroupName,
        storageApplianceName,
        storageApplianceRunReadCommandsParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _enableRemoteVendorManagementSend(
  context: Client,
  resourceGroupName: string,
  storageApplianceName: string,
  options: StorageAppliancesEnableRemoteVendorManagementOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}/enableRemoteVendorManagement{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageApplianceName: storageApplianceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      body: !options?.storageApplianceEnableRemoteVendorManagementParameters
        ? options?.storageApplianceEnableRemoteVendorManagementParameters
        : storageApplianceEnableRemoteVendorManagementParametersSerializer(
            options?.storageApplianceEnableRemoteVendorManagementParameters,
          ),
    });
}

export async function _enableRemoteVendorManagementDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Enable remote vendor management of the provided storage appliance. */
export function enableRemoteVendorManagement(
  context: Client,
  resourceGroupName: string,
  storageApplianceName: string,
  options: StorageAppliancesEnableRemoteVendorManagementOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(
    context,
    _enableRemoteVendorManagementDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _enableRemoteVendorManagementSend(
          context,
          resourceGroupName,
          storageApplianceName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  ) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _disableRemoteVendorManagementSend(
  context: Client,
  resourceGroupName: string,
  storageApplianceName: string,
  options: StorageAppliancesDisableRemoteVendorManagementOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}/disableRemoteVendorManagement{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageApplianceName: storageApplianceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _disableRemoteVendorManagementDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Disable remote vendor management of the provided storage appliance. */
export function disableRemoteVendorManagement(
  context: Client,
  resourceGroupName: string,
  storageApplianceName: string,
  options: StorageAppliancesDisableRemoteVendorManagementOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(
    context,
    _disableRemoteVendorManagementDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _disableRemoteVendorManagementSend(
          context,
          resourceGroupName,
          storageApplianceName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  ) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: StorageAppliancesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/storageAppliances{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_StorageApplianceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _storageApplianceListDeserializer(result.body);
}

/** Get a list of storage appliances in the provided subscription. */
export function listBySubscription(
  context: Client,
  options: StorageAppliancesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageAppliance> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: StorageAppliancesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_StorageApplianceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _storageApplianceListDeserializer(result.body);
}

/** Get a list of storage appliances in the provided resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: StorageAppliancesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageAppliance> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  storageApplianceName: string,
  options: StorageAppliancesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageApplianceName: storageApplianceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Delete the provided storage appliance. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  storageApplianceName: string,
  options: StorageAppliancesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, storageApplianceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  storageApplianceName: string,
  options: StorageAppliancesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageApplianceName: storageApplianceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: !options?.storageApplianceUpdateParameters
        ? options?.storageApplianceUpdateParameters
        : storageAppliancePatchParametersSerializer(options?.storageApplianceUpdateParameters),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<StorageAppliance> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return storageApplianceDeserializer(result.body);
}

/** Update properties of the provided storage appliance, or update tags associated with the storage appliance Properties and tag updates can be done independently. */
export function update(
  context: Client,
  resourceGroupName: string,
  storageApplianceName: string,
  options: StorageAppliancesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageAppliance>, StorageAppliance> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, storageApplianceName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<StorageAppliance>, StorageAppliance>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  storageApplianceName: string,
  storageApplianceParameters: StorageAppliance,
  options: StorageAppliancesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageApplianceName: storageApplianceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: storageApplianceSerializer(storageApplianceParameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageAppliance> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return storageApplianceDeserializer(result.body);
}

/** Create a new storage appliance or update the properties of the existing one. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  storageApplianceName: string,
  storageApplianceParameters: StorageAppliance,
  options: StorageAppliancesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageAppliance>, StorageAppliance> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        storageApplianceName,
        storageApplianceParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<StorageAppliance>, StorageAppliance>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storageApplianceName: string,
  options: StorageAppliancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/storageAppliances/{storageApplianceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageApplianceName: storageApplianceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<StorageAppliance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return storageApplianceDeserializer(result.body);
}

/** Get properties of the provided storage appliance. */
export async function get(
  context: Client,
  resourceGroupName: string,
  storageApplianceName: string,
  options: StorageAppliancesGetOptionalParams = { requestOptions: {} },
): Promise<StorageAppliance> {
  const result = await _getSend(context, resourceGroupName, storageApplianceName, options);
  return _getDeserialize(result);
}
