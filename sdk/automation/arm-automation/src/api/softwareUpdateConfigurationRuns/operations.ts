// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type {
  SoftwareUpdateConfigurationRun,
  SoftwareUpdateConfigurationRunListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  softwareUpdateConfigurationRunDeserializer,
  softwareUpdateConfigurationRunListResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SoftwareUpdateConfigurationRunsListOptionalParams,
  SoftwareUpdateConfigurationRunsGetByIdOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: SoftwareUpdateConfigurationRunsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/softwareUpdateConfigurationRuns{?api%2Dversion,%24filter,%24skip,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
      "%24filter": options?.filter,
      "%24skip": options?.skip,
      "%24top": options?.top,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { clientrequestid: options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<SoftwareUpdateConfigurationRunListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return softwareUpdateConfigurationRunListResultDeserializer(result.body);
}

/** Return list of software update configuration runs */
export async function list(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: SoftwareUpdateConfigurationRunsListOptionalParams = { requestOptions: {} },
): Promise<SoftwareUpdateConfigurationRunListResult> {
  const result = await _listSend(context, resourceGroupName, automationAccountName, options);
  return _listDeserialize(result);
}

export function _getByIdSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  softwareUpdateConfigurationRunId: string,
  options: SoftwareUpdateConfigurationRunsGetByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/softwareUpdateConfigurationRuns/{softwareUpdateConfigurationRunId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      softwareUpdateConfigurationRunId: softwareUpdateConfigurationRunId,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { clientrequestid: options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getByIdDeserialize(
  result: PathUncheckedResponse,
): Promise<SoftwareUpdateConfigurationRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return softwareUpdateConfigurationRunDeserializer(result.body);
}

/** Get a single software update configuration Run by Id. */
export async function getById(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  softwareUpdateConfigurationRunId: string,
  options: SoftwareUpdateConfigurationRunsGetByIdOptionalParams = { requestOptions: {} },
): Promise<SoftwareUpdateConfigurationRun> {
  const result = await _getByIdSend(
    context,
    resourceGroupName,
    automationAccountName,
    softwareUpdateConfigurationRunId,
    options,
  );
  return _getByIdDeserialize(result);
}
