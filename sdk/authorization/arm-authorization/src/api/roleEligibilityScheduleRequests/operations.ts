// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type { RoleEligibilityScheduleRequest } from "../../models/microsoft/authorization/models.js";
import {
  roleEligibilityScheduleRequestSerializer,
  roleEligibilityScheduleRequestDeserializer,
} from "../../models/microsoft/authorization/models.js";
import { cloudErrorDeserializer } from "../../models/microsoft/common/models.js";
import type { _RoleEligibilityScheduleRequestListResult } from "../../models/models.js";
import { _roleEligibilityScheduleRequestListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RoleEligibilityScheduleRequestsValidateOptionalParams,
  RoleEligibilityScheduleRequestsCancelOptionalParams,
  RoleEligibilityScheduleRequestsListForScopeOptionalParams,
  RoleEligibilityScheduleRequestsCreateOptionalParams,
  RoleEligibilityScheduleRequestsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _validateSend(
  context: Client,
  scope: string,
  roleEligibilityScheduleRequestName: string,
  parameters: RoleEligibilityScheduleRequest,
  options: RoleEligibilityScheduleRequestsValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleEligibilityScheduleRequests/{roleEligibilityScheduleRequestName}/validate{?api%2Dversion}",
    {
      scope: scope,
      roleEligibilityScheduleRequestName: roleEligibilityScheduleRequestName,
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
    body: roleEligibilityScheduleRequestSerializer(parameters),
  });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleEligibilityScheduleRequest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return roleEligibilityScheduleRequestDeserializer(result.body);
}

/** Validates a new role eligibility schedule request. */
export async function validate(
  context: Client,
  scope: string,
  roleEligibilityScheduleRequestName: string,
  parameters: RoleEligibilityScheduleRequest,
  options: RoleEligibilityScheduleRequestsValidateOptionalParams = { requestOptions: {} },
): Promise<RoleEligibilityScheduleRequest> {
  const result = await _validateSend(
    context,
    scope,
    roleEligibilityScheduleRequestName,
    parameters,
    options,
  );
  return _validateDeserialize(result);
}

export function _cancelSend(
  context: Client,
  scope: string,
  roleEligibilityScheduleRequestName: string,
  options: RoleEligibilityScheduleRequestsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleEligibilityScheduleRequests/{roleEligibilityScheduleRequestName}/cancel{?api%2Dversion}",
    {
      scope: scope,
      roleEligibilityScheduleRequestName: roleEligibilityScheduleRequestName,
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

/** Cancels a pending role eligibility schedule request. */
export async function cancel(
  context: Client,
  scope: string,
  roleEligibilityScheduleRequestName: string,
  options: RoleEligibilityScheduleRequestsCancelOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _cancelSend(context, scope, roleEligibilityScheduleRequestName, options);
  return _cancelDeserialize(result);
}

export function _listForScopeSend(
  context: Client,
  scope: string,
  options: RoleEligibilityScheduleRequestsListForScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleEligibilityScheduleRequests{?api%2Dversion,%24filter}",
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
): Promise<_RoleEligibilityScheduleRequestListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _roleEligibilityScheduleRequestListResultDeserializer(result.body);
}

/** Gets role eligibility schedule requests for a scope. */
export function listForScope(
  context: Client,
  scope: string,
  options: RoleEligibilityScheduleRequestsListForScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RoleEligibilityScheduleRequest> {
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
  roleEligibilityScheduleRequestName: string,
  parameters: RoleEligibilityScheduleRequest,
  options: RoleEligibilityScheduleRequestsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleEligibilityScheduleRequests/{roleEligibilityScheduleRequestName}{?api%2Dversion}",
    {
      scope: scope,
      roleEligibilityScheduleRequestName: roleEligibilityScheduleRequestName,
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
    body: roleEligibilityScheduleRequestSerializer(parameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleEligibilityScheduleRequest> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return roleEligibilityScheduleRequestDeserializer(result.body);
}

/** Creates a role eligibility schedule request. */
export async function create(
  context: Client,
  scope: string,
  roleEligibilityScheduleRequestName: string,
  parameters: RoleEligibilityScheduleRequest,
  options: RoleEligibilityScheduleRequestsCreateOptionalParams = { requestOptions: {} },
): Promise<RoleEligibilityScheduleRequest> {
  const result = await _createSend(
    context,
    scope,
    roleEligibilityScheduleRequestName,
    parameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  roleEligibilityScheduleRequestName: string,
  options: RoleEligibilityScheduleRequestsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleEligibilityScheduleRequests/{roleEligibilityScheduleRequestName}{?api%2Dversion}",
    {
      scope: scope,
      roleEligibilityScheduleRequestName: roleEligibilityScheduleRequestName,
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
): Promise<RoleEligibilityScheduleRequest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return roleEligibilityScheduleRequestDeserializer(result.body);
}

/** Get the specified role eligibility schedule request. */
export async function get(
  context: Client,
  scope: string,
  roleEligibilityScheduleRequestName: string,
  options: RoleEligibilityScheduleRequestsGetOptionalParams = { requestOptions: {} },
): Promise<RoleEligibilityScheduleRequest> {
  const result = await _getSend(context, scope, roleEligibilityScheduleRequestName, options);
  return _getDeserialize(result);
}
