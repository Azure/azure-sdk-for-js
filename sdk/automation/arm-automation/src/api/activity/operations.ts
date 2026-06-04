// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type { Activity, _ActivityListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  activityDeserializer,
  _activityListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ActivityListByModuleOptionalParams, ActivityGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByModuleSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  moduleName: string,
  options: ActivityListByModuleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/modules/{moduleName}/activities{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      moduleName: moduleName,
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

export async function _listByModuleDeserialize(
  result: PathUncheckedResponse,
): Promise<_ActivityListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _activityListResultDeserializer(result.body);
}

/** Retrieve a list of activities in the module identified by module name. */
export function listByModule(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  moduleName: string,
  options: ActivityListByModuleOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Activity> {
  return buildPagedAsyncIterator(
    context,
    () => _listByModuleSend(context, resourceGroupName, automationAccountName, moduleName, options),
    _listByModuleDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-10-23" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  moduleName: string,
  activityName: string,
  options: ActivityGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/modules/{moduleName}/activities/{activityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      moduleName: moduleName,
      activityName: activityName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Activity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return activityDeserializer(result.body);
}

/** Retrieve the activity in the module identified by module name and activity name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  moduleName: string,
  activityName: string,
  options: ActivityGetOptionalParams = { requestOptions: {} },
): Promise<Activity> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    moduleName,
    activityName,
    options,
  );
  return _getDeserialize(result);
}
