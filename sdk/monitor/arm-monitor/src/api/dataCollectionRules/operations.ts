// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type { MicrosoftDataCollectionDataCollectionRuleResource } from "../../models/microsoft/dataCollection/models.js";
import {
  microsoftDataCollectionErrorResponseCommonV2Deserializer,
  microsoftDataCollectionResourceForUpdateSerializer,
  microsoftDataCollectionDataCollectionRuleResourceSerializer,
  microsoftDataCollectionDataCollectionRuleResourceDeserializer,
} from "../../models/microsoft/dataCollection/models.js";
import type { _DataCollectionRuleResourceListResult } from "../../models/models.js";
import { _dataCollectionRuleResourceListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DataCollectionRulesListBySubscriptionOptionalParams,
  DataCollectionRulesListByResourceGroupOptionalParams,
  DataCollectionRulesDeleteOptionalParams,
  DataCollectionRulesUpdateOptionalParams,
  DataCollectionRulesCreateOptionalParams,
  DataCollectionRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: DataCollectionRulesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/dataCollectionRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2024-03-11",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_DataCollectionRuleResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftDataCollectionErrorResponseCommonV2Deserializer(result.body);

    throw error;
  }

  return _dataCollectionRuleResourceListResultDeserializer(result.body);
}

/** Lists all data collection rules in the specified subscription. */
export function listBySubscription(
  context: Client,
  options: DataCollectionRulesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftDataCollectionDataCollectionRuleResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-03-11" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: DataCollectionRulesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2024-03-11",
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
): Promise<_DataCollectionRuleResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftDataCollectionErrorResponseCommonV2Deserializer(result.body);

    throw error;
  }

  return _dataCollectionRuleResourceListResultDeserializer(result.body);
}

/** Lists all data collection rules in the specified resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: DataCollectionRulesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftDataCollectionDataCollectionRuleResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-03-11" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  dataCollectionRuleName: string,
  options: DataCollectionRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionRules/{dataCollectionRuleName}{?api%2Dversion,deleteAssociations}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataCollectionRuleName: dataCollectionRuleName,
      "api%2Dversion": "2024-03-11",
      deleteAssociations: options?.deleteAssociations,
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
    error.details = microsoftDataCollectionErrorResponseCommonV2Deserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a data collection rule. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  dataCollectionRuleName: string,
  options: DataCollectionRulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, dataCollectionRuleName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  dataCollectionRuleName: string,
  options: DataCollectionRulesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionRules/{dataCollectionRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataCollectionRuleName: dataCollectionRuleName,
      "api%2Dversion": "2024-03-11",
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
      : microsoftDataCollectionResourceForUpdateSerializer(options["body"]),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftDataCollectionDataCollectionRuleResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftDataCollectionErrorResponseCommonV2Deserializer(result.body);

    throw error;
  }

  return microsoftDataCollectionDataCollectionRuleResourceDeserializer(result.body);
}

/** Updates part of a data collection rule. */
export async function update(
  context: Client,
  resourceGroupName: string,
  dataCollectionRuleName: string,
  options: DataCollectionRulesUpdateOptionalParams = { requestOptions: {} },
): Promise<MicrosoftDataCollectionDataCollectionRuleResource> {
  const result = await _updateSend(context, resourceGroupName, dataCollectionRuleName, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  dataCollectionRuleName: string,
  options: DataCollectionRulesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionRules/{dataCollectionRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataCollectionRuleName: dataCollectionRuleName,
      "api%2Dversion": "2024-03-11",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["body"]
      ? options["body"]
      : microsoftDataCollectionDataCollectionRuleResourceSerializer(options["body"]),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftDataCollectionDataCollectionRuleResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftDataCollectionErrorResponseCommonV2Deserializer(result.body);

    throw error;
  }

  return microsoftDataCollectionDataCollectionRuleResourceDeserializer(result.body);
}

/** Creates or updates a data collection rule. */
export async function create(
  context: Client,
  resourceGroupName: string,
  dataCollectionRuleName: string,
  options: DataCollectionRulesCreateOptionalParams = { requestOptions: {} },
): Promise<MicrosoftDataCollectionDataCollectionRuleResource> {
  const result = await _createSend(context, resourceGroupName, dataCollectionRuleName, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  dataCollectionRuleName: string,
  options: DataCollectionRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionRules/{dataCollectionRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataCollectionRuleName: dataCollectionRuleName,
      "api%2Dversion": "2024-03-11",
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
): Promise<MicrosoftDataCollectionDataCollectionRuleResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftDataCollectionErrorResponseCommonV2Deserializer(result.body);

    throw error;
  }

  return microsoftDataCollectionDataCollectionRuleResourceDeserializer(result.body);
}

/** Returns the specified data collection rule. */
export async function get(
  context: Client,
  resourceGroupName: string,
  dataCollectionRuleName: string,
  options: DataCollectionRulesGetOptionalParams = { requestOptions: {} },
): Promise<MicrosoftDataCollectionDataCollectionRuleResource> {
  const result = await _getSend(context, resourceGroupName, dataCollectionRuleName, options);
  return _getDeserialize(result);
}
