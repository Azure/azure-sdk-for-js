// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import type {
  AutomationsAPIAutomation,
  AutomationsAPIAutomationUpdateModel,
  _AutomationsAPIAutomationList,
  AutomationsAPIAutomationValidationStatus,
} from "../../models/automationsAPI/models.js";
import {
  automationsAPIAutomationSerializer,
  automationsAPIAutomationDeserializer,
  automationsAPIAutomationUpdateModelSerializer,
  _automationsAPIAutomationListDeserializer,
  automationsAPIAutomationValidationStatusDeserializer,
} from "../../models/automationsAPI/models.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AutomationsValidateOptionalParams,
  AutomationsListOptionalParams,
  AutomationsListByResourceGroupOptionalParams,
  AutomationsDeleteOptionalParams,
  AutomationsUpdateOptionalParams,
  AutomationsCreateOrUpdateOptionalParams,
  AutomationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _validateSend(
  context: Client,
  resourceGroupName: string,
  automationName: string,
  automation: AutomationsAPIAutomation,
  options: AutomationsValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/automations/{automationName}/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationName: automationName,
      "api%2Dversion": "2023-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: automationsAPIAutomationSerializer(automation),
  });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<AutomationsAPIAutomationValidationStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return automationsAPIAutomationValidationStatusDeserializer(result.body);
}

/** Validates the security automation model before create or update. Any validation errors are returned to the client. */
export async function validate(
  context: Client,
  resourceGroupName: string,
  automationName: string,
  automation: AutomationsAPIAutomation,
  options: AutomationsValidateOptionalParams = { requestOptions: {} },
): Promise<AutomationsAPIAutomationValidationStatus> {
  const result = await _validateSend(
    context,
    resourceGroupName,
    automationName,
    automation,
    options,
  );
  return _validateDeserialize(result);
}

export function _listSend(
  context: Client,
  options: AutomationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/automations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2023-12-01-preview",
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
): Promise<_AutomationsAPIAutomationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _automationsAPIAutomationListDeserializer(result.body);
}

/** Lists all the security automations in the specified subscription. Use the 'nextLink' property in the response to get the next page of security automations for the specified subscription. */
export function list(
  context: Client,
  options: AutomationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AutomationsAPIAutomation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2023-12-01-preview" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AutomationsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/automations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2023-12-01-preview",
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
): Promise<_AutomationsAPIAutomationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _automationsAPIAutomationListDeserializer(result.body);
}

/** Lists all the security automations in the specified resource group. Use the 'nextLink' property in the response to get the next page of security automations for the specified resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AutomationsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AutomationsAPIAutomation> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2023-12-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  automationName: string,
  options: AutomationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/automations/{automationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationName: automationName,
      "api%2Dversion": "2023-12-01-preview",
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
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a security automation. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  automationName: string,
  options: AutomationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, automationName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  automationName: string,
  automation: AutomationsAPIAutomationUpdateModel,
  options: AutomationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/automations/{automationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationName: automationName,
      "api%2Dversion": "2023-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: automationsAPIAutomationUpdateModelSerializer(automation),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AutomationsAPIAutomation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return automationsAPIAutomationDeserializer(result.body);
}

/** Updates a security automation */
export async function update(
  context: Client,
  resourceGroupName: string,
  automationName: string,
  automation: AutomationsAPIAutomationUpdateModel,
  options: AutomationsUpdateOptionalParams = { requestOptions: {} },
): Promise<AutomationsAPIAutomation> {
  const result = await _updateSend(context, resourceGroupName, automationName, automation, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  automationName: string,
  automation: AutomationsAPIAutomation,
  options: AutomationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/automations/{automationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationName: automationName,
      "api%2Dversion": "2023-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: automationsAPIAutomationSerializer(automation),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AutomationsAPIAutomation> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return automationsAPIAutomationDeserializer(result.body);
}

/** Creates or updates a security automation. If a security automation is already created and a subsequent request is issued for the same automation id, then it will be updated. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  automationName: string,
  automation: AutomationsAPIAutomation,
  options: AutomationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<AutomationsAPIAutomation> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    automationName,
    automation,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationName: string,
  options: AutomationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/automations/{automationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationName: automationName,
      "api%2Dversion": "2023-12-01-preview",
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
): Promise<AutomationsAPIAutomation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return automationsAPIAutomationDeserializer(result.body);
}

/** Retrieves information about the model of a security automation. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationName: string,
  options: AutomationsGetOptionalParams = { requestOptions: {} },
): Promise<AutomationsAPIAutomation> {
  const result = await _getSend(context, resourceGroupName, automationName, options);
  return _getDeserialize(result);
}
