// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  roleAssignmentPropertiesSerializer,
  RoleAssignment,
  RoleScope,
  RoleAssignmentCreateParameters,
  _RoleAssignmentListResult,
} from "../../models/models.js";
import { KeyVaultContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  RoleAssignmentsDeleteOptionalParams,
  RoleAssignmentsCreateOptionalParams,
  RoleAssignmentsGetOptionalParams,
  RoleAssignmentsListForScopeOptionalParams,
} from "../../models/options.js";

export function _$deleteSend(
  context: Client,
  scope: string,
  roleAssignmentName: string,
  options: RoleAssignmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{scope}/providers/Microsoft.Authorization/roleAssignments/{roleAssignmentName}",
      scope,
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

  return {
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    properties: !result.body.properties
      ? undefined
      : {
          scope: result.body.properties?.["scope"] as RoleScope,
          roleDefinitionId: result.body.properties?.["roleDefinitionId"],
          principalId: result.body.properties?.["principalId"],
        },
  };
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
      scope,
      roleAssignmentName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        properties: roleAssignmentPropertiesSerializer(parameters.properties),
      },
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleAssignment> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    properties: !result.body.properties
      ? undefined
      : {
          scope: result.body.properties?.["scope"] as RoleScope,
          roleDefinitionId: result.body.properties?.["roleDefinitionId"],
          principalId: result.body.properties?.["principalId"],
        },
  };
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
      scope,
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

  return {
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    properties: !result.body.properties
      ? undefined
      : {
          scope: result.body.properties?.["scope"] as RoleScope,
          roleDefinitionId: result.body.properties?.["roleDefinitionId"],
          principalId: result.body.properties?.["principalId"],
        },
  };
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
    .path("/{scope}/providers/Microsoft.Authorization/roleAssignments", scope)
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

  return {
    value: result.body["value"].map((p: any) => {
      return {
        id: p["id"],
        name: p["name"],
        type: p["type"],
        properties: !p.properties
          ? undefined
          : {
              scope: p.properties?.["scope"] as RoleScope,
              roleDefinitionId: p.properties?.["roleDefinitionId"],
              principalId: p.properties?.["principalId"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
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
