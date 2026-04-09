// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/microsoft/common/models.js";
import type { AlertConfiguration } from "../../models/microsoft/roleManagementAlerts/models.js";
import {
  alertConfigurationSerializer,
  alertConfigurationDeserializer,
} from "../../models/microsoft/roleManagementAlerts/models.js";
import type { _AlertConfigurationListResult } from "../../models/models.js";
import { _alertConfigurationListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AlertConfigurationsListForScopeOptionalParams,
  AlertConfigurationsUpdateOptionalParams,
  AlertConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listForScopeSend(
  context: Client,
  scope: string,
  options: AlertConfigurationsListForScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementAlertConfigurations{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": "2022-08-01-preview",
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

export async function _listForScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_AlertConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _alertConfigurationListResultDeserializer(result.body);
}

/** Gets alert configurations for a resource scope. */
export function listForScope(
  context: Client,
  scope: string,
  options: AlertConfigurationsListForScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AlertConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listForScopeSend(context, scope, options),
    _listForScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-08-01-preview" },
  );
}

export function _updateSend(
  context: Client,
  scope: string,
  alertId: string,
  parameters: AlertConfiguration,
  options: AlertConfigurationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementAlertConfigurations/{+alertId}{?api%2Dversion}",
    {
      scope: scope,
      alertId: alertId,
      "api%2Dversion": "2022-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: alertConfigurationSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Update an alert configuration. */
export async function update(
  context: Client,
  scope: string,
  alertId: string,
  parameters: AlertConfiguration,
  options: AlertConfigurationsUpdateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateSend(context, scope, alertId, parameters, options);
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  alertId: string,
  options: AlertConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementAlertConfigurations/{+alertId}{?api%2Dversion}",
    {
      scope: scope,
      alertId: alertId,
      "api%2Dversion": "2022-08-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AlertConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return alertConfigurationDeserializer(result.body);
}

/** Get the specified alert configuration. */
export async function get(
  context: Client,
  scope: string,
  alertId: string,
  options: AlertConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<AlertConfiguration> {
  const result = await _getSend(context, scope, alertId, options);
  return _getDeserialize(result);
}
