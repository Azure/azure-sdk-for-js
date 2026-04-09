// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type { RoleManagementPolicy } from "../../models/microsoft/authorization/models.js";
import {
  roleManagementPolicySerializer,
  roleManagementPolicyDeserializer,
} from "../../models/microsoft/authorization/models.js";
import { cloudErrorDeserializer } from "../../models/microsoft/common/models.js";
import type { _RoleManagementPolicyListResult } from "../../models/models.js";
import { _roleManagementPolicyListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RoleManagementPoliciesListForScopeOptionalParams,
  RoleManagementPoliciesDeleteOptionalParams,
  RoleManagementPoliciesUpdateOptionalParams,
  RoleManagementPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listForScopeSend(
  context: Client,
  scope: string,
  options: RoleManagementPoliciesListForScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementPolicies{?api%2Dversion}",
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
): Promise<_RoleManagementPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _roleManagementPolicyListResultDeserializer(result.body);
}

/** Gets role management policies for a resource scope. */
export function listForScope(
  context: Client,
  scope: string,
  options: RoleManagementPoliciesListForScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RoleManagementPolicy> {
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
  roleManagementPolicyName: string,
  options: RoleManagementPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementPolicies/{roleManagementPolicyName}{?api%2Dversion}",
    {
      scope: scope,
      roleManagementPolicyName: roleManagementPolicyName,
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

/** Delete a role management policy */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  scope: string,
  roleManagementPolicyName: string,
  options: RoleManagementPoliciesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, scope, roleManagementPolicyName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  scope: string,
  roleManagementPolicyName: string,
  parameters: RoleManagementPolicy,
  options: RoleManagementPoliciesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementPolicies/{roleManagementPolicyName}{?api%2Dversion}",
    {
      scope: scope,
      roleManagementPolicyName: roleManagementPolicyName,
      "api%2Dversion": "2024-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: roleManagementPolicySerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleManagementPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return roleManagementPolicyDeserializer(result.body);
}

/** Update a role management policy */
export async function update(
  context: Client,
  scope: string,
  roleManagementPolicyName: string,
  parameters: RoleManagementPolicy,
  options: RoleManagementPoliciesUpdateOptionalParams = { requestOptions: {} },
): Promise<RoleManagementPolicy> {
  const result = await _updateSend(context, scope, roleManagementPolicyName, parameters, options);
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  roleManagementPolicyName: string,
  options: RoleManagementPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleManagementPolicies/{roleManagementPolicyName}{?api%2Dversion}",
    {
      scope: scope,
      roleManagementPolicyName: roleManagementPolicyName,
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
): Promise<RoleManagementPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return roleManagementPolicyDeserializer(result.body);
}

/** Get the specified role management policy for a resource scope */
export async function get(
  context: Client,
  scope: string,
  roleManagementPolicyName: string,
  options: RoleManagementPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<RoleManagementPolicy> {
  const result = await _getSend(context, scope, roleManagementPolicyName, options);
  return _getDeserialize(result);
}
