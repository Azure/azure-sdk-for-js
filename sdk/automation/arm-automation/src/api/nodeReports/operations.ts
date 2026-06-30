// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type {
  _DscNodeReportListResult,
  DscNodeReport,
  NodeReportsGetContentResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _dscNodeReportListResultDeserializer,
  dscNodeReportDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NodeReportsGetContentOptionalParams,
  NodeReportsGetOptionalParams,
  NodeReportsListByNodeOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getContentSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeId: string,
  reportId: string,
  options: NodeReportsGetContentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodes/{nodeId}/reports/{reportId}/content{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      nodeId: nodeId,
      reportId: reportId,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "text/plain", ...options.requestOptions?.headers },
  });
}

export async function _getContentDeserialize(
  result: PathUncheckedResponse,
): Promise<NodeReportsGetContentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { body: result.body };
}

/** Retrieve the Dsc node reports by node id and report id. */
export async function getContent(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeId: string,
  reportId: string,
  options: NodeReportsGetContentOptionalParams = { requestOptions: {} },
): Promise<NodeReportsGetContentResponse> {
  const result = await _getContentSend(
    context,
    resourceGroupName,
    automationAccountName,
    nodeId,
    reportId,
    options,
  );
  return _getContentDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeId: string,
  reportId: string,
  options: NodeReportsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodes/{nodeId}/reports/{reportId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      nodeId: nodeId,
      reportId: reportId,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DscNodeReport> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dscNodeReportDeserializer(result.body);
}

/** Retrieve the Dsc node report data by node id and report id. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeId: string,
  reportId: string,
  options: NodeReportsGetOptionalParams = { requestOptions: {} },
): Promise<DscNodeReport> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    nodeId,
    reportId,
    options,
  );
  return _getDeserialize(result);
}

export function _listByNodeSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeId: string,
  options: NodeReportsListByNodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodes/{nodeId}/reports{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      nodeId: nodeId,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
      "%24filter": options?.filter,
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

export async function _listByNodeDeserialize(
  result: PathUncheckedResponse,
): Promise<_DscNodeReportListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _dscNodeReportListResultDeserializer(result.body);
}

/** Retrieve the Dsc node report list by node id. */
export function listByNode(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeId: string,
  options: NodeReportsListByNodeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DscNodeReport> {
  return buildPagedAsyncIterator(
    context,
    () => _listByNodeSend(context, resourceGroupName, automationAccountName, nodeId, options),
    _listByNodeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-10-23" },
  );
}
