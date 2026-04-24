// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type {
  SecurityStandardsAPIStandardAssignment,
  _SecurityStandardsAPIStandardAssignmentsList,
} from "../../models/securityStandardsAPI/models.js";
import {
  securityStandardsAPIStandardAssignmentSerializer,
  securityStandardsAPIStandardAssignmentDeserializer,
  _securityStandardsAPIStandardAssignmentsListDeserializer,
} from "../../models/securityStandardsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  StandardAssignmentsListOptionalParams,
  StandardAssignmentsDeleteOptionalParams,
  StandardAssignmentsCreateOptionalParams,
  StandardAssignmentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scope: string,
  options: StandardAssignmentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/standardAssignments{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": "2024-08-01",
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
): Promise<_SecurityStandardsAPIStandardAssignmentsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _securityStandardsAPIStandardAssignmentsListDeserializer(result.body);
}

/** Get a list of all relevant standard assignments over a scope */
export function list(
  context: Client,
  scope: string,
  options: StandardAssignmentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecurityStandardsAPIStandardAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-08-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceId: string,
  standardAssignmentName: string,
  options: StandardAssignmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/standardAssignments/{standardAssignmentName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      standardAssignmentName: standardAssignmentName,
      "api%2Dversion": "2024-08-01",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** This operation deletes a standard assignment, given its name and the scope it was created in. The scope of a standard assignment is the part of its ID preceding '/providers/Microsoft.Security/standardAssignments/{standardAssignmentName}'. */
export async function $delete(
  context: Client,
  resourceId: string,
  standardAssignmentName: string,
  options: StandardAssignmentsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceId, standardAssignmentName, options);
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceId: string,
  standardAssignmentName: string,
  standardAssignment: SecurityStandardsAPIStandardAssignment,
  options: StandardAssignmentsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/standardAssignments/{standardAssignmentName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      standardAssignmentName: standardAssignmentName,
      "api%2Dversion": "2024-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: securityStandardsAPIStandardAssignmentSerializer(standardAssignment),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityStandardsAPIStandardAssignment> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return securityStandardsAPIStandardAssignmentDeserializer(result.body);
}

/** This operation creates or updates a standard assignment with the given scope and name. standard assignments apply to all resources contained within their scope. For example, when you assign a policy at resource group scope, that policy applies to all resources in the group. */
export async function create(
  context: Client,
  resourceId: string,
  standardAssignmentName: string,
  standardAssignment: SecurityStandardsAPIStandardAssignment,
  options: StandardAssignmentsCreateOptionalParams = { requestOptions: {} },
): Promise<SecurityStandardsAPIStandardAssignment> {
  const result = await _createSend(
    context,
    resourceId,
    standardAssignmentName,
    standardAssignment,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceId: string,
  standardAssignmentName: string,
  options: StandardAssignmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/standardAssignments/{standardAssignmentName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      standardAssignmentName: standardAssignmentName,
      "api%2Dversion": "2024-08-01",
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
): Promise<SecurityStandardsAPIStandardAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return securityStandardsAPIStandardAssignmentDeserializer(result.body);
}

/** This operation retrieves a single standard assignment, given its name and the scope it was created at. */
export async function get(
  context: Client,
  resourceId: string,
  standardAssignmentName: string,
  options: StandardAssignmentsGetOptionalParams = { requestOptions: {} },
): Promise<SecurityStandardsAPIStandardAssignment> {
  const result = await _getSend(context, resourceId, standardAssignmentName, options);
  return _getDeserialize(result);
}
