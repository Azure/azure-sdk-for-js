// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type { RoleEligibilityScheduleInstance } from "../../models/microsoft/authorization/models.js";
import { roleEligibilityScheduleInstanceDeserializer } from "../../models/microsoft/authorization/models.js";
import { cloudErrorDeserializer } from "../../models/microsoft/common/models.js";
import type { _RoleEligibilityScheduleInstanceListResult } from "../../models/models.js";
import { _roleEligibilityScheduleInstanceListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RoleEligibilityScheduleInstancesListForScopeOptionalParams,
  RoleEligibilityScheduleInstancesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listForScopeSend(
  context: Client,
  scope: string,
  options: RoleEligibilityScheduleInstancesListForScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleEligibilityScheduleInstances{?api%2Dversion,%24filter}",
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
): Promise<_RoleEligibilityScheduleInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _roleEligibilityScheduleInstanceListResultDeserializer(result.body);
}

/** Gets role eligibility schedule instances of a role eligibility schedule. */
export function listForScope(
  context: Client,
  scope: string,
  options: RoleEligibilityScheduleInstancesListForScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RoleEligibilityScheduleInstance> {
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
  roleEligibilityScheduleInstanceName: string,
  options: RoleEligibilityScheduleInstancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleEligibilityScheduleInstances/{roleEligibilityScheduleInstanceName}{?api%2Dversion}",
    {
      scope: scope,
      roleEligibilityScheduleInstanceName: roleEligibilityScheduleInstanceName,
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
): Promise<RoleEligibilityScheduleInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return roleEligibilityScheduleInstanceDeserializer(result.body);
}

/** Gets the specified role eligibility schedule instance. */
export async function get(
  context: Client,
  scope: string,
  roleEligibilityScheduleInstanceName: string,
  options: RoleEligibilityScheduleInstancesGetOptionalParams = { requestOptions: {} },
): Promise<RoleEligibilityScheduleInstance> {
  const result = await _getSend(context, scope, roleEligibilityScheduleInstanceName, options);
  return _getDeserialize(result);
}
