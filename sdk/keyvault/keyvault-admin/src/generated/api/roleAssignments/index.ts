// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  KeyVaultContext as Client,
  RoleAssignmentsCreateOptionalParams,
  RoleAssignmentsDeleteOptionalParams,
  RoleAssignmentsGetOptionalParams,
  RoleAssignmentsListForScopeOptionalParams,
} from "../index.js";
import {
  RoleAssignment,
  roleAssignmentDeserializer,
  RoleAssignmentCreateParameters,
  roleAssignmentCreateParametersSerializer,
  _RoleAssignmentListResult,
  _roleAssignmentListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  scope: string,
  roleAssignmentName: string,
  options: RoleAssignmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{scope}/providers/Microsoft.Authorization/roleAssignments/{roleAssignmentName}",
      { value: scope, allowReserved: true },
      roleAssignmentName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return roleAssignmentDeserializer(result.body);
}

/** Deletes a role assignment. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  scope: string,
  roleAssignmentName: string,
  options: RoleAssignmentsDeleteOptionalParams = { requestOptions: {} },
): Promise<RoleAssignment> {
  const result = await _$deleteSend(
    context,
    scope,
    roleAssignmentName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  scope: string,
  roleAssignmentName: string,
  parameters: RoleAssignmentCreateParameters,
  options: RoleAssignmentsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{scope}/providers/Microsoft.Authorization/roleAssignments/{roleAssignmentName}",
      { value: scope, allowReserved: true },
      roleAssignmentName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: roleAssignmentCreateParametersSerializer(parameters),
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleAssignment> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return roleAssignmentDeserializer(result.body);
}

/** Creates a role assignment. */
export async function create(
  context: Client,
  scope: string,
  roleAssignmentName: string,
  parameters: RoleAssignmentCreateParameters,
  options: RoleAssignmentsCreateOptionalParams = { requestOptions: {} },
): Promise<RoleAssignment> {
  const result = await _createSend(
    context,
    scope,
    roleAssignmentName,
    parameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  roleAssignmentName: string,
  options: RoleAssignmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{scope}/providers/Microsoft.Authorization/roleAssignments/{roleAssignmentName}",
      { value: scope, allowReserved: true },
      roleAssignmentName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return roleAssignmentDeserializer(result.body);
}

/** Get the specified role assignment. */
export async function get(
  context: Client,
  scope: string,
  roleAssignmentName: string,
  options: RoleAssignmentsGetOptionalParams = { requestOptions: {} },
): Promise<RoleAssignment> {
  const result = await _getSend(context, scope, roleAssignmentName, options);
  return _getDeserialize(result);
}

export function _listForScopeSend(
  context: Client,
  scope: string,
  options: RoleAssignmentsListForScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/{scope}/providers/Microsoft.Authorization/roleAssignments", {
      value: scope,
      allowReserved: true,
    })
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { $filter: options?.$filter },
    });
}

export async function _listForScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_RoleAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _roleAssignmentListResultDeserializer(result.body);
}

/** Gets role assignments for a scope. */
export function listForScope(
  context: Client,
  scope: string,
  options: RoleAssignmentsListForScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RoleAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listForScopeSend(context, scope, options),
    _listForScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
