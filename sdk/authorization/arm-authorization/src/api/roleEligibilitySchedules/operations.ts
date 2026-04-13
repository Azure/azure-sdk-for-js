// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type { RoleEligibilitySchedule } from "../../models/microsoft/authorization/models.js";
import { roleEligibilityScheduleDeserializer } from "../../models/microsoft/authorization/models.js";
import { cloudErrorDeserializer } from "../../models/microsoft/common/models.js";
import type { _RoleEligibilityScheduleListResult } from "../../models/models.js";
import { _roleEligibilityScheduleListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RoleEligibilitySchedulesListForScopeOptionalParams,
  RoleEligibilitySchedulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listForScopeSend(
  context: Client,
  scope: string,
  options: RoleEligibilitySchedulesListForScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleEligibilitySchedules{?api%2Dversion,%24filter}",
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
): Promise<_RoleEligibilityScheduleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _roleEligibilityScheduleListResultDeserializer(result.body);
}

/** Gets role eligibility schedules for a resource scope. */
export function listForScope(
  context: Client,
  scope: string,
  options: RoleEligibilitySchedulesListForScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RoleEligibilitySchedule> {
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
  roleEligibilityScheduleName: string,
  options: RoleEligibilitySchedulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/roleEligibilitySchedules/{roleEligibilityScheduleName}{?api%2Dversion}",
    {
      scope: scope,
      roleEligibilityScheduleName: roleEligibilityScheduleName,
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
): Promise<RoleEligibilitySchedule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return roleEligibilityScheduleDeserializer(result.body);
}

/** Get the specified role eligibility schedule for a resource scope */
export async function get(
  context: Client,
  scope: string,
  roleEligibilityScheduleName: string,
  options: RoleEligibilitySchedulesGetOptionalParams = { requestOptions: {} },
): Promise<RoleEligibilitySchedule> {
  const result = await _getSend(context, scope, roleEligibilityScheduleName, options);
  return _getDeserialize(result);
}
