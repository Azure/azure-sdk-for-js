// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type { RoleAssignmentSchedule } from "../../models/microsoft/authorization/models.js";
import { roleAssignmentScheduleDeserializer } from "../../models/microsoft/authorization/models.js";
import { cloudErrorDeserializer } from "../../models/microsoft/common/models.js";
import type { _RoleAssignmentScheduleListResult } from "../../models/models.js";
import { _roleAssignmentScheduleListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RoleAssignmentSchedulesListForScopeOptionalParams,
  RoleAssignmentSchedulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listForScopeSend(
  context: Client,
  scope: string,
  options: RoleAssignmentSchedulesListForScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleAssignmentSchedules{?api%2Dversion,%24filter}",
    {
      scope: scope,
      "api%2Dversion": "2024-09-01-preview",
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

export async function _listForScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_RoleAssignmentScheduleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _roleAssignmentScheduleListResultDeserializer(result.body);
}

/** Gets role assignment schedules for a resource scope. */
export function listForScope(
  context: Client,
  scope: string,
  options: RoleAssignmentSchedulesListForScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RoleAssignmentSchedule> {
  return buildPagedAsyncIterator(
    context,
    () => _listForScopeSend(context, scope, options),
    _listForScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-09-01-preview" },
  );
}

export function _getSend(
  context: Client,
  scope: string,
  roleAssignmentScheduleName: string,
  options: RoleAssignmentSchedulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleAssignmentSchedules/{roleAssignmentScheduleName}{?api%2Dversion}",
    {
      scope: scope,
      roleAssignmentScheduleName: roleAssignmentScheduleName,
      "api%2Dversion": "2024-09-01-preview",
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
): Promise<RoleAssignmentSchedule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return roleAssignmentScheduleDeserializer(result.body);
}

/** Get the specified role assignment schedule for a resource scope */
export async function get(
  context: Client,
  scope: string,
  roleAssignmentScheduleName: string,
  options: RoleAssignmentSchedulesGetOptionalParams = { requestOptions: {} },
): Promise<RoleAssignmentSchedule> {
  const result = await _getSend(context, scope, roleAssignmentScheduleName, options);
  return _getDeserialize(result);
}
