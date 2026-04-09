// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type {
  AccessReviewScheduleDefinition,
  AccessReviewScheduleDefinitionProperties,
} from "../../models/microsoft/attributeNamespaces/models.js";
import {
  errorDefinitionDeserializer,
  accessReviewScheduleDefinitionDeserializer,
  accessReviewScheduleDefinitionPropertiesSerializer,
} from "../../models/microsoft/attributeNamespaces/models.js";
import type { _AccessReviewScheduleDefinitionListResult } from "../../models/models.js";
import { _accessReviewScheduleDefinitionListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ScopeAccessReviewScheduleDefinitionsStopOptionalParams,
  ScopeAccessReviewScheduleDefinitionsListOptionalParams,
  ScopeAccessReviewScheduleDefinitionsDeleteByIdOptionalParams,
  ScopeAccessReviewScheduleDefinitionsCreateOrUpdateByIdOptionalParams,
  ScopeAccessReviewScheduleDefinitionsGetByIdOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _stopSend(
  context: Client,
  scope: string,
  scheduleDefinitionId: string,
  options: ScopeAccessReviewScheduleDefinitionsStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/stop{?api%2Dversion}",
    {
      scope: scope,
      scheduleDefinitionId: scheduleDefinitionId,
      "api%2Dversion": "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return;
}

/** Stop access review definition */
export async function stop(
  context: Client,
  scope: string,
  scheduleDefinitionId: string,
  options: ScopeAccessReviewScheduleDefinitionsStopOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopSend(context, scope, scheduleDefinitionId, options);
  return _stopDeserialize(result);
}

export function _listSend(
  context: Client,
  scope: string,
  options: ScopeAccessReviewScheduleDefinitionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions{?api%2Dversion,%24filter}",
    {
      scope: scope,
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
): Promise<_AccessReviewScheduleDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return _accessReviewScheduleDefinitionListResultDeserializer(result.body);
}

/** Get access review schedule definitions */
export function list(
  context: Client,
  scope: string,
  options: ScopeAccessReviewScheduleDefinitionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AccessReviewScheduleDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2021-12-01-preview" },
  );
}

export function _deleteByIdSend(
  context: Client,
  scope: string,
  scheduleDefinitionId: string,
  options: ScopeAccessReviewScheduleDefinitionsDeleteByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}{?api%2Dversion}",
    {
      scope: scope,
      scheduleDefinitionId: scheduleDefinitionId,
      "api%2Dversion": "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteByIdDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete access review schedule definition */
export async function deleteById(
  context: Client,
  scope: string,
  scheduleDefinitionId: string,
  options: ScopeAccessReviewScheduleDefinitionsDeleteByIdOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteByIdSend(context, scope, scheduleDefinitionId, options);
  return _deleteByIdDeserialize(result);
}

export function _createOrUpdateByIdSend(
  context: Client,
  scope: string,
  scheduleDefinitionId: string,
  properties: AccessReviewScheduleDefinitionProperties,
  options: ScopeAccessReviewScheduleDefinitionsCreateOrUpdateByIdOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}{?api%2Dversion}",
    {
      scope: scope,
      scheduleDefinitionId: scheduleDefinitionId,
      "api%2Dversion": "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: accessReviewScheduleDefinitionPropertiesSerializer(properties),
  });
}

export async function _createOrUpdateByIdDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessReviewScheduleDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return accessReviewScheduleDefinitionDeserializer(result.body);
}

/** Create or Update access review schedule definition. */
export async function createOrUpdateById(
  context: Client,
  scope: string,
  scheduleDefinitionId: string,
  properties: AccessReviewScheduleDefinitionProperties,
  options: ScopeAccessReviewScheduleDefinitionsCreateOrUpdateByIdOptionalParams = {
    requestOptions: {},
  },
): Promise<AccessReviewScheduleDefinition> {
  const result = await _createOrUpdateByIdSend(
    context,
    scope,
    scheduleDefinitionId,
    properties,
    options,
  );
  return _createOrUpdateByIdDeserialize(result);
}

export function _getByIdSend(
  context: Client,
  scope: string,
  scheduleDefinitionId: string,
  options: ScopeAccessReviewScheduleDefinitionsGetByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}{?api%2Dversion}",
    {
      scope: scope,
      scheduleDefinitionId: scheduleDefinitionId,
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
): Promise<AccessReviewScheduleDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return accessReviewScheduleDefinitionDeserializer(result.body);
}

/** Get single access review definition */
export async function getById(
  context: Client,
  scope: string,
  scheduleDefinitionId: string,
  options: ScopeAccessReviewScheduleDefinitionsGetByIdOptionalParams = { requestOptions: {} },
): Promise<AccessReviewScheduleDefinition> {
  const result = await _getByIdSend(context, scope, scheduleDefinitionId, options);
  return _getByIdDeserialize(result);
}
