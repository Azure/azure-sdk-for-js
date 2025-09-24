// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultContext as Client } from "../index.js";
import {
  keyVaultErrorDeserializer,
  RoleAssignment,
  roleAssignmentDeserializer,
  RoleAssignmentCreateParameters,
  roleAssignmentCreateParametersSerializer,
  _RoleAssignmentListResult,
  _roleAssignmentListResultDeserializer,
} from "../../models/models.js";
import {
  RoleAssignmentsListForScopeOptionalParams,
  RoleAssignmentsGetOptionalParams,
  RoleAssignmentsCreateOptionalParams,
  RoleAssignmentsDeleteOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listForScopeSend(
  context: Client,
  scope: string,
  options: RoleAssignmentsListForScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleAssignments{?api%2Dversion,%24filter}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion,
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listForScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<_RoleAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = keyVaultErrorDeserializer(result.body);
    throw error;
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

export function _getSend(
  context: Client,
  scope: string,
  roleAssignmentName: string,
  options: RoleAssignmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleAssignments/{roleAssignmentName}{?api%2Dversion}",
    {
      scope: scope,
      roleAssignmentName: roleAssignmentName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RoleAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = keyVaultErrorDeserializer(result.body);
    throw error;
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

export function _createSend(
  context: Client,
  scope: string,
  roleAssignmentName: string,
  parameters: RoleAssignmentCreateParameters,
  options: RoleAssignmentsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleAssignments/{roleAssignmentName}{?api%2Dversion}",
    {
      scope: scope,
      roleAssignmentName: roleAssignmentName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: roleAssignmentCreateParametersSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<RoleAssignment> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = keyVaultErrorDeserializer(result.body);
    throw error;
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
  const result = await _createSend(context, scope, roleAssignmentName, parameters, options);
  return _createDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  scope: string,
  roleAssignmentName: string,
  options: RoleAssignmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleAssignments/{roleAssignmentName}{?api%2Dversion}",
    {
      scope: scope,
      roleAssignmentName: roleAssignmentName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<RoleAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = keyVaultErrorDeserializer(result.body);
    throw error;
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
  const result = await _$deleteSend(context, scope, roleAssignmentName, options);
  return _$deleteDeserialize(result);
}
