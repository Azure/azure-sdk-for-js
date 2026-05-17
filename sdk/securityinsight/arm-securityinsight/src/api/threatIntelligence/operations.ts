// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  countQuerySerializer,
  ThreatIntelligenceCount,
  threatIntelligenceCountDeserializer,
  querySerializer,
  _ThreatIntelligenceList,
  _threatIntelligenceListDeserializer,
  TIObjectUnion,
  TiType,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ThreatIntelligenceQueryOptionalParams,
  ThreatIntelligenceCountOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _querySend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  tiType: TiType,
  options: ThreatIntelligenceQueryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/{tiType}/query{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      tiType: tiType,
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
    body: !options["queryParameter"]
      ? options["queryParameter"]
      : querySerializer(options["queryParameter"]),
  });
}

export async function _queryDeserialize(
  result: PathUncheckedResponse,
): Promise<_ThreatIntelligenceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _threatIntelligenceListDeserializer(result.body);
}

/** Gets all TI objects for the workspace. */
export function query(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  tiType: TiType,
  options: ThreatIntelligenceQueryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TIObjectUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _querySend(context, resourceGroupName, workspaceName, tiType, options),
    _queryDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-01-preview",
    },
  );
}

export function _countSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  tiType: TiType,
  options: ThreatIntelligenceCountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/threatIntelligence/{tiType}/count{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      tiType: tiType,
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
    body: !options["query"] ? options["query"] : countQuerySerializer(options["query"]),
  });
}

export async function _countDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreatIntelligenceCount> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return threatIntelligenceCountDeserializer(result.body);
}

/** Gets the count of all TI objects for the workspace. */
export async function count(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  tiType: TiType,
  options: ThreatIntelligenceCountOptionalParams = { requestOptions: {} },
): Promise<ThreatIntelligenceCount> {
  const result = await _countSend(context, resourceGroupName, workspaceName, tiType, options);
  return _countDeserialize(result);
}
