// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext as Client } from "../index.js";
import { errorResponseLinkedStorageDeserializer } from "../../models/applicationInsightsCommonTypes/models.js";
import {
  ComponentLinkedStorageAccounts,
  componentLinkedStorageAccountsSerializer,
  componentLinkedStorageAccountsDeserializer,
  StorageType,
  ComponentLinkedStorageAccountsPatch,
  componentLinkedStorageAccountsPatchSerializer,
} from "../../models/componentLinkedStorageAccountApi/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ComponentLinkedStorageAccountsDeleteOptionalParams,
  ComponentLinkedStorageAccountsUpdateOptionalParams,
  ComponentLinkedStorageAccountsCreateAndUpdateOptionalParams,
  ComponentLinkedStorageAccountsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  storageType: StorageType,
  options: ComponentLinkedStorageAccountsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/linkedStorageAccounts/{storageType}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      storageType: storageType,
      "api%2Dversion": "2020-03-01-preview",
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
    if (result.body) {
      error.details = errorResponseLinkedStorageDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete linked storage accounts for an Application Insights component. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  storageType: StorageType,
  options: ComponentLinkedStorageAccountsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, resourceName, storageType, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  storageType: StorageType,
  linkedStorageAccountsProperties: ComponentLinkedStorageAccountsPatch,
  options: ComponentLinkedStorageAccountsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/linkedStorageAccounts/{storageType}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      storageType: storageType,
      "api%2Dversion": "2020-03-01-preview",
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
      body: componentLinkedStorageAccountsPatchSerializer(linkedStorageAccountsProperties),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ComponentLinkedStorageAccounts> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseLinkedStorageDeserializer(result.body);
    }

    throw error;
  }

  return componentLinkedStorageAccountsDeserializer(result.body);
}

/** Update linked storage accounts for an Application Insights component. */
export async function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  storageType: StorageType,
  linkedStorageAccountsProperties: ComponentLinkedStorageAccountsPatch,
  options: ComponentLinkedStorageAccountsUpdateOptionalParams = { requestOptions: {} },
): Promise<ComponentLinkedStorageAccounts> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    resourceName,
    storageType,
    linkedStorageAccountsProperties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createAndUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  storageType: StorageType,
  linkedStorageAccountsProperties: ComponentLinkedStorageAccounts,
  options: ComponentLinkedStorageAccountsCreateAndUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/linkedStorageAccounts/{storageType}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      storageType: storageType,
      "api%2Dversion": "2020-03-01-preview",
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
      body: componentLinkedStorageAccountsSerializer(linkedStorageAccountsProperties),
    });
}

export async function _createAndUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ComponentLinkedStorageAccounts> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseLinkedStorageDeserializer(result.body);
    }

    throw error;
  }

  return componentLinkedStorageAccountsDeserializer(result.body);
}

/** Replace current linked storage account for an Application Insights component. */
export async function createAndUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  storageType: StorageType,
  linkedStorageAccountsProperties: ComponentLinkedStorageAccounts,
  options: ComponentLinkedStorageAccountsCreateAndUpdateOptionalParams = { requestOptions: {} },
): Promise<ComponentLinkedStorageAccounts> {
  const result = await _createAndUpdateSend(
    context,
    resourceGroupName,
    resourceName,
    storageType,
    linkedStorageAccountsProperties,
    options,
  );
  return _createAndUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  storageType: StorageType,
  options: ComponentLinkedStorageAccountsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/linkedStorageAccounts/{storageType}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      storageType: storageType,
      "api%2Dversion": "2020-03-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ComponentLinkedStorageAccounts> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseLinkedStorageDeserializer(result.body);
    }

    throw error;
  }

  return componentLinkedStorageAccountsDeserializer(result.body);
}

/** Returns the current linked storage settings for an Application Insights component. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  storageType: StorageType,
  options: ComponentLinkedStorageAccountsGetOptionalParams = { requestOptions: {} },
): Promise<ComponentLinkedStorageAccounts> {
  const result = await _getSend(context, resourceGroupName, resourceName, storageType, options);
  return _getDeserialize(result);
}
