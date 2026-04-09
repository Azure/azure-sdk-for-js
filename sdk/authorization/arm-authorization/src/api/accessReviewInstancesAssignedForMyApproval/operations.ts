// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type { AccessReviewInstance } from "../../models/microsoft/attributeNamespaces/models.js";
import {
  errorDefinitionDeserializer,
  accessReviewInstanceDeserializer,
} from "../../models/microsoft/attributeNamespaces/models.js";
import type { _AccessReviewInstanceListResult } from "../../models/models.js";
import { _accessReviewInstanceListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AccessReviewInstancesAssignedForMyApprovalListOptionalParams,
  AccessReviewInstancesAssignedForMyApprovalGetByIdOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scheduleDefinitionId: string,
  options: AccessReviewInstancesAssignedForMyApprovalListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances{?api%2Dversion,%24filter}",
    {
      scheduleDefinitionId: scheduleDefinitionId,
      "api%2Dversion": "2021-12-01-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AccessReviewInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return _accessReviewInstanceListResultDeserializer(result.body);
}

/** Get access review instances assigned for my approval. */
export function list(
  context: Client,
  scheduleDefinitionId: string,
  options: AccessReviewInstancesAssignedForMyApprovalListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AccessReviewInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scheduleDefinitionId, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2021-12-01-preview" },
  );
}

export function _getByIdSend(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstancesAssignedForMyApprovalGetByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}{?api%2Dversion}",
    {
      scheduleDefinitionId: scheduleDefinitionId,
      id: id,
      "api%2Dversion": "2021-12-01-preview",
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

export async function _getByIdDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessReviewInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return accessReviewInstanceDeserializer(result.body);
}

/** Get single access review instance assigned for my approval. */
export async function getById(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstancesAssignedForMyApprovalGetByIdOptionalParams = { requestOptions: {} },
): Promise<AccessReviewInstance> {
  const result = await _getByIdSend(context, scheduleDefinitionId, id, options);
  return _getByIdDeserialize(result);
}
