// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type { RoleAssignmentScheduleRequest } from "../../models/microsoft/authorization/models.js";
import {
  roleAssignmentScheduleRequestSerializer,
  roleAssignmentScheduleRequestDeserializer,
} from "../../models/microsoft/authorization/models.js";
import { cloudErrorDeserializer } from "../../models/microsoft/common/models.js";
import type { _RoleAssignmentScheduleRequestListResult } from "../../models/models.js";
import { _roleAssignmentScheduleRequestListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RoleAssignmentScheduleRequestsValidateOptionalParams,
  RoleAssignmentScheduleRequestsCancelOptionalParams,
  RoleAssignmentScheduleRequestsListForScopeOptionalParams,
  RoleAssignmentScheduleRequestsCreateOptionalParams,
  RoleAssignmentScheduleRequestsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _validateSend(
  context: Client,
  scope: string,
  roleAssignmentScheduleRequestName: string,
  parameters: RoleAssignmentScheduleRequest,
  options: RoleAssignmentScheduleRequestsValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleAssignmentScheduleRequests/{roleAssignmentScheduleRequestName}/validate{?api%2Dversion}",
    {
      scope: scope,
      roleAssignmentScheduleRequestName: roleAssignmentScheduleRequestName,
      "api%2Dversion": "2024-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: roleAssignmentScheduleRequestSerializer(parameters),
  });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleAssignmentScheduleRequest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return roleAssignmentScheduleRequestDeserializer(result.body);
}

/** Validates a new role assignment schedule request. */
export async function validate(
  context: Client,
  scope: string,
  roleAssignmentScheduleRequestName: string,
  parameters: RoleAssignmentScheduleRequest,
  options: RoleAssignmentScheduleRequestsValidateOptionalParams = { requestOptions: {} },
): Promise<RoleAssignmentScheduleRequest> {
  const result = await _validateSend(
    context,
    scope,
    roleAssignmentScheduleRequestName,
    parameters,
    options,
  );
  return _validateDeserialize(result);
}

export function _cancelSend(
  context: Client,
  scope: string,
  roleAssignmentScheduleRequestName: string,
  options: RoleAssignmentScheduleRequestsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleAssignmentScheduleRequests/{roleAssignmentScheduleRequestName}/cancel{?api%2Dversion}",
    {
      scope: scope,
      roleAssignmentScheduleRequestName: roleAssignmentScheduleRequestName,
      "api%2Dversion": "2024-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Cancels a pending role assignment schedule request. */
export async function cancel(
  context: Client,
  scope: string,
  roleAssignmentScheduleRequestName: string,
  options: RoleAssignmentScheduleRequestsCancelOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _cancelSend(context, scope, roleAssignmentScheduleRequestName, options);
  return _cancelDeserialize(result);
}

export function _listForScopeSend(
  context: Client,
  scope: string,
  options: RoleAssignmentScheduleRequestsListForScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleAssignmentScheduleRequests{?api%2Dversion,%24filter}",
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
): Promise<_RoleAssignmentScheduleRequestListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _roleAssignmentScheduleRequestListResultDeserializer(result.body);
}

/** Gets role assignment schedule requests for a scope. */
export function listForScope(
  context: Client,
  scope: string,
  options: RoleAssignmentScheduleRequestsListForScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RoleAssignmentScheduleRequest> {
  return buildPagedAsyncIterator(
    context,
    () => _listForScopeSend(context, scope, options),
    _listForScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-09-01-preview" },
  );
}

export function _createSend(
  context: Client,
  scope: string,
  roleAssignmentScheduleRequestName: string,
  parameters: RoleAssignmentScheduleRequest,
  options: RoleAssignmentScheduleRequestsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleAssignmentScheduleRequests/{roleAssignmentScheduleRequestName}{?api%2Dversion}",
    {
      scope: scope,
      roleAssignmentScheduleRequestName: roleAssignmentScheduleRequestName,
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
    body: roleAssignmentScheduleRequestSerializer(parameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleAssignmentScheduleRequest> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return roleAssignmentScheduleRequestDeserializer(result.body);
}

/** Creates a role assignment schedule request. */
export async function create(
  context: Client,
  scope: string,
  roleAssignmentScheduleRequestName: string,
  parameters: RoleAssignmentScheduleRequest,
  options: RoleAssignmentScheduleRequestsCreateOptionalParams = { requestOptions: {} },
): Promise<RoleAssignmentScheduleRequest> {
  const result = await _createSend(
    context,
    scope,
    roleAssignmentScheduleRequestName,
    parameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  roleAssignmentScheduleRequestName: string,
  options: RoleAssignmentScheduleRequestsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleAssignmentScheduleRequests/{roleAssignmentScheduleRequestName}{?api%2Dversion}",
    {
      scope: scope,
      roleAssignmentScheduleRequestName: roleAssignmentScheduleRequestName,
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
): Promise<RoleAssignmentScheduleRequest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return roleAssignmentScheduleRequestDeserializer(result.body);
}

/** Get the specified role assignment schedule request. */
export async function get(
  context: Client,
  scope: string,
  roleAssignmentScheduleRequestName: string,
  options: RoleAssignmentScheduleRequestsGetOptionalParams = { requestOptions: {} },
): Promise<RoleAssignmentScheduleRequest> {
  const result = await _getSend(context, scope, roleAssignmentScheduleRequestName, options);
  return _getDeserialize(result);
}
