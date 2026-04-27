// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  GovernanceAssignment,
  _GovernanceAssignmentsList,
} from "../../models/governanceAPI/models.js";
import {
  governanceAssignmentSerializer,
  governanceAssignmentDeserializer,
  _governanceAssignmentsListDeserializer,
} from "../../models/governanceAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GovernanceAssignmentsListOptionalParams,
  GovernanceAssignmentsDeleteOptionalParams,
  GovernanceAssignmentsCreateOrUpdateOptionalParams,
  GovernanceAssignmentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scope: string,
  assessmentName: string,
  options: GovernanceAssignmentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/assessments/{assessmentName}/governanceAssignments{?api%2Dversion}",
    {
      scope: scope,
      assessmentName: assessmentName,
      "api%2Dversion": "2022-01-01-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_GovernanceAssignmentsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _governanceAssignmentsListDeserializer(result.body);
}

/** Get governance assignments on all of your resources inside a scope */
export function list(
  context: Client,
  scope: string,
  assessmentName: string,
  options: GovernanceAssignmentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GovernanceAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, assessmentName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-01-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  scope: string,
  assessmentName: string,
  assignmentKey: string,
  options: GovernanceAssignmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/assessments/{assessmentName}/governanceAssignments/{assignmentKey}{?api%2Dversion}",
    {
      scope: scope,
      assessmentName: assessmentName,
      assignmentKey: assignmentKey,
      "api%2Dversion": "2022-01-01-preview",
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

/** Delete a GovernanceAssignment over a given scope */
export async function $delete(
  context: Client,
  scope: string,
  assessmentName: string,
  assignmentKey: string,
  options: GovernanceAssignmentsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, scope, assessmentName, assignmentKey, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  scope: string,
  assessmentName: string,
  assignmentKey: string,
  governanceAssignment: GovernanceAssignment,
  options: GovernanceAssignmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/assessments/{assessmentName}/governanceAssignments/{assignmentKey}{?api%2Dversion}",
    {
      scope: scope,
      assessmentName: assessmentName,
      assignmentKey: assignmentKey,
      "api%2Dversion": "2022-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: governanceAssignmentSerializer(governanceAssignment),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GovernanceAssignment> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return governanceAssignmentDeserializer(result.body);
}

/** Creates or updates a governance assignment on the given subscription. */
export async function createOrUpdate(
  context: Client,
  scope: string,
  assessmentName: string,
  assignmentKey: string,
  governanceAssignment: GovernanceAssignment,
  options: GovernanceAssignmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<GovernanceAssignment> {
  const result = await _createOrUpdateSend(
    context,
    scope,
    assessmentName,
    assignmentKey,
    governanceAssignment,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  assessmentName: string,
  assignmentKey: string,
  options: GovernanceAssignmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/assessments/{assessmentName}/governanceAssignments/{assignmentKey}{?api%2Dversion}",
    {
      scope: scope,
      assessmentName: assessmentName,
      assignmentKey: assignmentKey,
      "api%2Dversion": "2022-01-01-preview",
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
): Promise<GovernanceAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return governanceAssignmentDeserializer(result.body);
}

/** Get a specific governanceAssignment for the requested scope by AssignmentKey */
export async function get(
  context: Client,
  scope: string,
  assessmentName: string,
  assignmentKey: string,
  options: GovernanceAssignmentsGetOptionalParams = { requestOptions: {} },
): Promise<GovernanceAssignment> {
  const result = await _getSend(context, scope, assessmentName, assignmentKey, options);
  return _getDeserialize(result);
}
