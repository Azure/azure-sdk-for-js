// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type {
  AccessReviewDecision,
  AccessReviewDecisionProperties,
} from "../../models/microsoft/attributeNamespaces/models.js";
import {
  errorDefinitionDeserializer,
  accessReviewDecisionDeserializer,
  accessReviewDecisionPropertiesSerializer,
} from "../../models/microsoft/attributeNamespaces/models.js";
import type { _AccessReviewDecisionListResult } from "../../models/models.js";
import { _accessReviewDecisionListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AccessReviewInstanceMyDecisionsListOptionalParams,
  AccessReviewInstanceMyDecisionsPatchOptionalParams,
  AccessReviewInstanceMyDecisionsGetByIdOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstanceMyDecisionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/decisions{?api%2Dversion,%24filter}",
    {
      scheduleDefinitionId: scheduleDefinitionId,
      id: id,
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
): Promise<_AccessReviewDecisionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return _accessReviewDecisionListResultDeserializer(result.body);
}

/** Get my access review instance decisions. */
export function list(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstanceMyDecisionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AccessReviewDecision> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scheduleDefinitionId, id, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2021-12-01-preview" },
  );
}

export function _patchSend(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  decisionId: string,
  properties: AccessReviewDecisionProperties,
  options: AccessReviewInstanceMyDecisionsPatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/decisions/{decisionId}{?api%2Dversion}",
    {
      scheduleDefinitionId: scheduleDefinitionId,
      id: id,
      decisionId: decisionId,
      "api%2Dversion": "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: accessReviewDecisionPropertiesSerializer(properties),
  });
}

export async function _patchDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessReviewDecision> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return accessReviewDecisionDeserializer(result.body);
}

/** Record a decision. */
export async function patch(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  decisionId: string,
  properties: AccessReviewDecisionProperties,
  options: AccessReviewInstanceMyDecisionsPatchOptionalParams = { requestOptions: {} },
): Promise<AccessReviewDecision> {
  const result = await _patchSend(
    context,
    scheduleDefinitionId,
    id,
    decisionId,
    properties,
    options,
  );
  return _patchDeserialize(result);
}

export function _getByIdSend(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  decisionId: string,
  options: AccessReviewInstanceMyDecisionsGetByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/decisions/{decisionId}{?api%2Dversion}",
    {
      scheduleDefinitionId: scheduleDefinitionId,
      id: id,
      decisionId: decisionId,
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
): Promise<AccessReviewDecision> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return accessReviewDecisionDeserializer(result.body);
}

/** Get my single access review instance decision. */
export async function getById(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  decisionId: string,
  options: AccessReviewInstanceMyDecisionsGetByIdOptionalParams = { requestOptions: {} },
): Promise<AccessReviewDecision> {
  const result = await _getByIdSend(context, scheduleDefinitionId, id, decisionId, options);
  return _getByIdDeserialize(result);
}
