// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type {
  ThreatIntelligenceInformationUnion,
  ThreatIntelligenceIndicatorModel,
  ThreatIntelligenceAppendTags,
  ThreatIntelligenceFilteringCriteria,
  _ThreatIntelligenceInformationList,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  threatIntelligenceInformationUnionDeserializer,
  threatIntelligenceIndicatorModelSerializer,
  threatIntelligenceAppendTagsSerializer,
  threatIntelligenceFilteringCriteriaSerializer,
  _threatIntelligenceInformationListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ThreatIntelligenceIndicatorQueryIndicatorsOptionalParams,
  ThreatIntelligenceIndicatorCreateIndicatorOptionalParams,
  ThreatIntelligenceIndicatorReplaceTagsOptionalParams,
  ThreatIntelligenceIndicatorAppendTagsOptionalParams,
  ThreatIntelligenceIndicatorDeleteOptionalParams,
  ThreatIntelligenceIndicatorCreateOptionalParams,
  ThreatIntelligenceIndicatorGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _queryIndicatorsSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  threatIntelligenceFilteringCriteria: ThreatIntelligenceFilteringCriteria,
  options: ThreatIntelligenceIndicatorQueryIndicatorsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/main/queryIndicators{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: threatIntelligenceFilteringCriteriaSerializer(threatIntelligenceFilteringCriteria),
  });
}

export async function _queryIndicatorsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ThreatIntelligenceInformationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _threatIntelligenceInformationListDeserializer(result.body);
}

/** Query threat intelligence indicators as per filtering criteria. */
export function queryIndicators(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  threatIntelligenceFilteringCriteria: ThreatIntelligenceFilteringCriteria,
  options: ThreatIntelligenceIndicatorQueryIndicatorsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ThreatIntelligenceInformationUnion> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _queryIndicatorsSend(
        context,
        resourceGroupName,
        workspaceName,
        threatIntelligenceFilteringCriteria,
        options,
      ),
    _queryIndicatorsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-01-preview",
    },
  );
}

export function _createIndicatorSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  threatIntelligenceProperties: ThreatIntelligenceIndicatorModel,
  options: ThreatIntelligenceIndicatorCreateIndicatorOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/main/createIndicator{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: threatIntelligenceIndicatorModelSerializer(threatIntelligenceProperties),
  });
}

export async function _createIndicatorDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreatIntelligenceInformationUnion> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return threatIntelligenceInformationUnionDeserializer(result.body);
}

/** Create a new threat intelligence indicator. */
export async function createIndicator(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  threatIntelligenceProperties: ThreatIntelligenceIndicatorModel,
  options: ThreatIntelligenceIndicatorCreateIndicatorOptionalParams = { requestOptions: {} },
): Promise<ThreatIntelligenceInformationUnion> {
  const result = await _createIndicatorSend(
    context,
    resourceGroupName,
    workspaceName,
    threatIntelligenceProperties,
    options,
  );
  return _createIndicatorDeserialize(result);
}

export function _replaceTagsSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  threatIntelligenceReplaceTags: ThreatIntelligenceIndicatorModel,
  options: ThreatIntelligenceIndicatorReplaceTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/main/indicators/{name}/replaceTags{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: threatIntelligenceIndicatorModelSerializer(threatIntelligenceReplaceTags),
  });
}

export async function _replaceTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreatIntelligenceInformationUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return threatIntelligenceInformationUnionDeserializer(result.body);
}

/** Replace tags added to a threat intelligence indicator. */
export async function replaceTags(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  threatIntelligenceReplaceTags: ThreatIntelligenceIndicatorModel,
  options: ThreatIntelligenceIndicatorReplaceTagsOptionalParams = { requestOptions: {} },
): Promise<ThreatIntelligenceInformationUnion> {
  const result = await _replaceTagsSend(
    context,
    resourceGroupName,
    workspaceName,
    name,
    threatIntelligenceReplaceTags,
    options,
  );
  return _replaceTagsDeserialize(result);
}

export function _appendTagsSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  threatIntelligenceAppendTags: ThreatIntelligenceAppendTags,
  options: ThreatIntelligenceIndicatorAppendTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/main/indicators/{name}/appendTags{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: threatIntelligenceAppendTagsSerializer(threatIntelligenceAppendTags),
  });
}

export async function _appendTagsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Append tags to a threat intelligence indicator. */
export async function appendTags(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  threatIntelligenceAppendTags: ThreatIntelligenceAppendTags,
  options: ThreatIntelligenceIndicatorAppendTagsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _appendTagsSend(
    context,
    resourceGroupName,
    workspaceName,
    name,
    threatIntelligenceAppendTags,
    options,
  );
  return _appendTagsDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  options: ThreatIntelligenceIndicatorDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/main/indicators/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a threat intelligence indicator. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  options: ThreatIntelligenceIndicatorDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, workspaceName, name, options);
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  threatIntelligenceProperties: ThreatIntelligenceIndicatorModel,
  options: ThreatIntelligenceIndicatorCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/main/indicators/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: threatIntelligenceIndicatorModelSerializer(threatIntelligenceProperties),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreatIntelligenceInformationUnion> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return threatIntelligenceInformationUnionDeserializer(result.body);
}

/** Update a threat Intelligence indicator. */
export async function create(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  threatIntelligenceProperties: ThreatIntelligenceIndicatorModel,
  options: ThreatIntelligenceIndicatorCreateOptionalParams = { requestOptions: {} },
): Promise<ThreatIntelligenceInformationUnion> {
  const result = await _createSend(
    context,
    resourceGroupName,
    workspaceName,
    name,
    threatIntelligenceProperties,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  options: ThreatIntelligenceIndicatorGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/main/indicators/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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
): Promise<ThreatIntelligenceInformationUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return threatIntelligenceInformationUnionDeserializer(result.body);
}

/** View a threat intelligence indicator by name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  options: ThreatIntelligenceIndicatorGetOptionalParams = { requestOptions: {} },
): Promise<ThreatIntelligenceInformationUnion> {
  const result = await _getSend(context, resourceGroupName, workspaceName, name, options);
  return _getDeserialize(result);
}
