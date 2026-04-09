// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/microsoft/common/models.js";
import type { AlertDefinition } from "../../models/microsoft/roleManagementAlerts/models.js";
import { alertDefinitionDeserializer } from "../../models/microsoft/roleManagementAlerts/models.js";
import type { _AlertDefinitionListResult } from "../../models/models.js";
import { _alertDefinitionListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AlertDefinitionsListForScopeOptionalParams,
  AlertDefinitionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listForScopeSend(
  context: Client,
  scope: string,
  options: AlertDefinitionsListForScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementAlertDefinitions{?api%2Dversion}",
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
): Promise<_AlertDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _alertDefinitionListResultDeserializer(result.body);
}

/** Gets alert definitions for a resource scope. */
export function listForScope(
  context: Client,
  scope: string,
  options: AlertDefinitionsListForScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AlertDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listForScopeSend(context, scope, options),
    _listForScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-08-01-preview" },
  );
}

export function _getSend(
  context: Client,
  scope: string,
  alertDefinitionId: string,
  options: AlertDefinitionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementAlertDefinitions/{+alertDefinitionId}{?api%2Dversion}",
    {
      scope: scope,
      alertDefinitionId: alertDefinitionId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AlertDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return alertDefinitionDeserializer(result.body);
}

/** Get the specified alert definition. */
export async function get(
  context: Client,
  scope: string,
  alertDefinitionId: string,
  options: AlertDefinitionsGetOptionalParams = { requestOptions: {} },
): Promise<AlertDefinition> {
  const result = await _getSend(context, scope, alertDefinitionId, options);
  return _getDeserialize(result);
}
