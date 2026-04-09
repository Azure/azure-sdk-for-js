// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type { RoleAssignmentScheduleInstance } from "../../models/microsoft/authorization/models.js";
import { roleAssignmentScheduleInstanceDeserializer } from "../../models/microsoft/authorization/models.js";
import { cloudErrorDeserializer } from "../../models/microsoft/common/models.js";
import type { _RoleAssignmentScheduleInstanceListResult } from "../../models/models.js";
import { _roleAssignmentScheduleInstanceListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RoleAssignmentScheduleInstancesListForScopeOptionalParams,
  RoleAssignmentScheduleInstancesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listForScopeSend(
  context: Client,
  scope: string,
  options: RoleAssignmentScheduleInstancesListForScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleAssignmentScheduleInstances{?api%2Dversion,%24filter}",
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
): Promise<_RoleAssignmentScheduleInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _roleAssignmentScheduleInstanceListResultDeserializer(result.body);
}

/** Gets role assignment schedule instances of a role assignment schedule. */
export function listForScope(
  context: Client,
  scope: string,
  options: RoleAssignmentScheduleInstancesListForScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RoleAssignmentScheduleInstance> {
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
  roleAssignmentScheduleInstanceName: string,
  options: RoleAssignmentScheduleInstancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleAssignmentScheduleInstances/{roleAssignmentScheduleInstanceName}{?api%2Dversion}",
    {
      scope: scope,
      roleAssignmentScheduleInstanceName: roleAssignmentScheduleInstanceName,
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
): Promise<RoleAssignmentScheduleInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return roleAssignmentScheduleInstanceDeserializer(result.body);
}

/** Gets the specified role assignment schedule instance. */
export async function get(
  context: Client,
  scope: string,
  roleAssignmentScheduleInstanceName: string,
  options: RoleAssignmentScheduleInstancesGetOptionalParams = { requestOptions: {} },
): Promise<RoleAssignmentScheduleInstance> {
  const result = await _getSend(context, scope, roleAssignmentScheduleInstanceName, options);
  return _getDeserialize(result);
}
