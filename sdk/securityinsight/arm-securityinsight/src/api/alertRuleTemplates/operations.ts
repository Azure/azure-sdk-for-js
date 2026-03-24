// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type { AlertRuleTemplateUnion, _AlertRuleTemplatesList } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  alertRuleTemplateUnionDeserializer,
  _alertRuleTemplatesListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AlertRuleTemplatesListOptionalParams,
  AlertRuleTemplatesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: AlertRuleTemplatesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/alertRuleTemplates{?api%2Dversion}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AlertRuleTemplatesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _alertRuleTemplatesListDeserializer(result.body);
}

/** Gets all alert rule templates. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: AlertRuleTemplatesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AlertRuleTemplateUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  alertRuleTemplateId: string,
  options: AlertRuleTemplatesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/alertRuleTemplates/{alertRuleTemplateId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      alertRuleTemplateId: alertRuleTemplateId,
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
): Promise<AlertRuleTemplateUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return alertRuleTemplateUnionDeserializer(result.body);
}

/** Gets the alert rule template. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  alertRuleTemplateId: string,
  options: AlertRuleTemplatesGetOptionalParams = { requestOptions: {} },
): Promise<AlertRuleTemplateUnion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    alertRuleTemplateId,
    options,
  );
  return _getDeserialize(result);
}
