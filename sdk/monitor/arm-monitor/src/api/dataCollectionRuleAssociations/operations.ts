// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type { MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResource } from "../../models/microsoft/dataCollection/models.js";
import {
  microsoftDataCollectionErrorResponseCommonV2Deserializer,
  microsoftDataCollectionDataCollectionRuleAssociationProxyOnlyResourceSerializer,
  microsoftDataCollectionDataCollectionRuleAssociationProxyOnlyResourceDeserializer,
} from "../../models/microsoft/dataCollection/models.js";
import type { _DataCollectionRuleAssociationProxyOnlyResourceListResult } from "../../models/models.js";
import { _dataCollectionRuleAssociationProxyOnlyResourceListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DataCollectionRuleAssociationsListByRuleOptionalParams,
  DataCollectionRuleAssociationsListByResourceOptionalParams,
  DataCollectionRuleAssociationsDeleteOptionalParams,
  DataCollectionRuleAssociationsCreateOptionalParams,
  DataCollectionRuleAssociationsGetOptionalParams,
  DataCollectionRuleAssociationsListByDataCollectionEndpointOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByRuleSend(
  context: Client,
  resourceGroupName: string,
  dataCollectionRuleName: string,
  options: DataCollectionRuleAssociationsListByRuleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionRules/{dataCollectionRuleName}/associations{?api%2Dversion,%24skipToken,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataCollectionRuleName: dataCollectionRuleName,
      "api%2Dversion": "2024-03-11",
      "%24skipToken": options?.skipToken,
      "%24top": options?.top,
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

export async function _listByRuleDeserialize(
  result: PathUncheckedResponse,
): Promise<_DataCollectionRuleAssociationProxyOnlyResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftDataCollectionErrorResponseCommonV2Deserializer(result.body);

    throw error;
  }

  return _dataCollectionRuleAssociationProxyOnlyResourceListResultDeserializer(result.body);
}

/** Lists associations for the specified data collection rule. */
export function listByRule(
  context: Client,
  resourceGroupName: string,
  dataCollectionRuleName: string,
  options: DataCollectionRuleAssociationsListByRuleOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByRuleSend(context, resourceGroupName, dataCollectionRuleName, options),
    _listByRuleDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-03-11" },
  );
}

export function _listByResourceSend(
  context: Client,
  resourceUri: string,
  options: DataCollectionRuleAssociationsListByResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Insights/dataCollectionRuleAssociations{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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

export async function _listByResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_DataCollectionRuleAssociationProxyOnlyResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftDataCollectionErrorResponseCommonV2Deserializer(result.body);

    throw error;
  }

  return _dataCollectionRuleAssociationProxyOnlyResourceListResultDeserializer(result.body);
}

/** Lists associations for the specified resource. */
export function listByResource(
  context: Client,
  resourceUri: string,
  options: DataCollectionRuleAssociationsListByResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceSend(context, resourceUri, options),
    _listByResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-03-11" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  associationName: string,
  options: DataCollectionRuleAssociationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Insights/dataCollectionRuleAssociations/{associationName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      associationName: associationName,
      "api%2Dversion": "2024-03-11",
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

/** Deletes an association. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceUri: string,
  associationName: string,
  options: DataCollectionRuleAssociationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceUri, associationName, options);
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceUri: string,
  associationName: string,
  options: DataCollectionRuleAssociationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Insights/dataCollectionRuleAssociations/{associationName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      associationName: associationName,
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
      : microsoftDataCollectionDataCollectionRuleAssociationProxyOnlyResourceSerializer(
          options["body"],
        ),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftDataCollectionErrorResponseCommonV2Deserializer(result.body);

    throw error;
  }

  return microsoftDataCollectionDataCollectionRuleAssociationProxyOnlyResourceDeserializer(
    result.body,
  );
}

/** Creates or updates an association. */
export async function create(
  context: Client,
  resourceUri: string,
  associationName: string,
  options: DataCollectionRuleAssociationsCreateOptionalParams = { requestOptions: {} },
): Promise<MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResource> {
  const result = await _createSend(context, resourceUri, associationName, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceUri: string,
  associationName: string,
  options: DataCollectionRuleAssociationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Insights/dataCollectionRuleAssociations/{associationName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      associationName: associationName,
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
): Promise<MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftDataCollectionErrorResponseCommonV2Deserializer(result.body);

    throw error;
  }

  return microsoftDataCollectionDataCollectionRuleAssociationProxyOnlyResourceDeserializer(
    result.body,
  );
}

/** Returns the specified association. */
export async function get(
  context: Client,
  resourceUri: string,
  associationName: string,
  options: DataCollectionRuleAssociationsGetOptionalParams = { requestOptions: {} },
): Promise<MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResource> {
  const result = await _getSend(context, resourceUri, associationName, options);
  return _getDeserialize(result);
}

export function _listByDataCollectionEndpointSend(
  context: Client,
  resourceGroupName: string,
  dataCollectionEndpointName: string,
  options: DataCollectionRuleAssociationsListByDataCollectionEndpointOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionEndpoints/{dataCollectionEndpointName}/associations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dataCollectionEndpointName: dataCollectionEndpointName,
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

export async function _listByDataCollectionEndpointDeserialize(
  result: PathUncheckedResponse,
): Promise<_DataCollectionRuleAssociationProxyOnlyResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftDataCollectionErrorResponseCommonV2Deserializer(result.body);

    throw error;
  }

  return _dataCollectionRuleAssociationProxyOnlyResourceListResultDeserializer(result.body);
}

/** Lists associations for the specified data collection endpoint. */
export function listByDataCollectionEndpoint(
  context: Client,
  resourceGroupName: string,
  dataCollectionEndpointName: string,
  options: DataCollectionRuleAssociationsListByDataCollectionEndpointOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByDataCollectionEndpointSend(
        context,
        resourceGroupName,
        dataCollectionEndpointName,
        options,
      ),
    _listByDataCollectionEndpointDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-03-11" },
  );
}
