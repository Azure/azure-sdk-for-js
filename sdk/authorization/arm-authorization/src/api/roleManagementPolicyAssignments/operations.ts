// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type { RoleManagementPolicyAssignment } from "../../models/microsoft/authorization/models.js";
import {
  roleManagementPolicyAssignmentSerializer,
  roleManagementPolicyAssignmentDeserializer,
} from "../../models/microsoft/authorization/models.js";
import { cloudErrorDeserializer } from "../../models/microsoft/common/models.js";
import type { _RoleManagementPolicyAssignmentListResult } from "../../models/models.js";
import { _roleManagementPolicyAssignmentListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RoleManagementPolicyAssignmentsListForScopeOptionalParams,
  RoleManagementPolicyAssignmentsDeleteOptionalParams,
  RoleManagementPolicyAssignmentsCreateOptionalParams,
  RoleManagementPolicyAssignmentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listForScopeSend(
  context: Client,
  scope: string,
  options: RoleManagementPolicyAssignmentsListForScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementPolicyAssignments{?api%2Dversion}",
    {
      scope: scope,
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

export async function _listForScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_RoleManagementPolicyAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _roleManagementPolicyAssignmentListResultDeserializer(result.body);
}

/** Gets role management assignment policies for a resource scope. */
export function listForScope(
  context: Client,
  scope: string,
  options: RoleManagementPolicyAssignmentsListForScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RoleManagementPolicyAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listForScopeSend(context, scope, options),
    _listForScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-09-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  scope: string,
  roleManagementPolicyAssignmentName: string,
  options: RoleManagementPolicyAssignmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementPolicyAssignments/{roleManagementPolicyAssignmentName}{?api%2Dversion}",
    {
      scope: scope,
      roleManagementPolicyAssignmentName: roleManagementPolicyAssignmentName,
      "api%2Dversion": "2024-09-01-preview",
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

/** Delete a role management policy assignment */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  scope: string,
  roleManagementPolicyAssignmentName: string,
  options: RoleManagementPolicyAssignmentsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, scope, roleManagementPolicyAssignmentName, options);
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  scope: string,
  roleManagementPolicyAssignmentName: string,
  parameters: RoleManagementPolicyAssignment,
  options: RoleManagementPolicyAssignmentsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementPolicyAssignments/{roleManagementPolicyAssignmentName}{?api%2Dversion}",
    {
      scope: scope,
      roleManagementPolicyAssignmentName: roleManagementPolicyAssignmentName,
      "api%2Dversion": "2024-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: roleManagementPolicyAssignmentSerializer(parameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleManagementPolicyAssignment> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return roleManagementPolicyAssignmentDeserializer(result.body);
}

/** Create a role management policy assignment */
export async function create(
  context: Client,
  scope: string,
  roleManagementPolicyAssignmentName: string,
  parameters: RoleManagementPolicyAssignment,
  options: RoleManagementPolicyAssignmentsCreateOptionalParams = { requestOptions: {} },
): Promise<RoleManagementPolicyAssignment> {
  const result = await _createSend(
    context,
    scope,
    roleManagementPolicyAssignmentName,
    parameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  roleManagementPolicyAssignmentName: string,
  options: RoleManagementPolicyAssignmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementPolicyAssignments/{roleManagementPolicyAssignmentName}{?api%2Dversion}",
    {
      scope: scope,
      roleManagementPolicyAssignmentName: roleManagementPolicyAssignmentName,
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
): Promise<RoleManagementPolicyAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return roleManagementPolicyAssignmentDeserializer(result.body);
}

/** Get the specified role management policy assignment for a resource scope */
export async function get(
  context: Client,
  scope: string,
  roleManagementPolicyAssignmentName: string,
  options: RoleManagementPolicyAssignmentsGetOptionalParams = { requestOptions: {} },
): Promise<RoleManagementPolicyAssignment> {
  const result = await _getSend(context, scope, roleManagementPolicyAssignmentName, options);
  return _getDeserialize(result);
}
