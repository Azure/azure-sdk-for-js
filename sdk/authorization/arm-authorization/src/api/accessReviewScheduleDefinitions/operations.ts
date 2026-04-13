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
  AccessReviewScheduleDefinitionsStopOptionalParams,
  AccessReviewScheduleDefinitionsListOptionalParams,
  AccessReviewScheduleDefinitionsDeleteByIdOptionalParams,
  AccessReviewScheduleDefinitionsCreateOrUpdateByIdOptionalParams,
  AccessReviewScheduleDefinitionsGetByIdOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _stopSend(
  context: Client,
  scheduleDefinitionId: string,
  options: AccessReviewScheduleDefinitionsStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
  scheduleDefinitionId: string,
  options: AccessReviewScheduleDefinitionsStopOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopSend(context, scheduleDefinitionId, options);
  return _stopDeserialize(result);
}

export function _listSend(
  context: Client,
  options: AccessReviewScheduleDefinitionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
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
  options: AccessReviewScheduleDefinitionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AccessReviewScheduleDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2021-12-01-preview" },
  );
}

export function _deleteByIdSend(
  context: Client,
  scheduleDefinitionId: string,
  options: AccessReviewScheduleDefinitionsDeleteByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
  scheduleDefinitionId: string,
  options: AccessReviewScheduleDefinitionsDeleteByIdOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteByIdSend(context, scheduleDefinitionId, options);
  return _deleteByIdDeserialize(result);
}

export function _createOrUpdateByIdSend(
  context: Client,
  scheduleDefinitionId: string,
  properties: AccessReviewScheduleDefinitionProperties,
  options: AccessReviewScheduleDefinitionsCreateOrUpdateByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
  scheduleDefinitionId: string,
  properties: AccessReviewScheduleDefinitionProperties,
  options: AccessReviewScheduleDefinitionsCreateOrUpdateByIdOptionalParams = { requestOptions: {} },
): Promise<AccessReviewScheduleDefinition> {
  const result = await _createOrUpdateByIdSend(context, scheduleDefinitionId, properties, options);
  return _createOrUpdateByIdDeserialize(result);
}

export function _getByIdSend(
  context: Client,
  scheduleDefinitionId: string,
  options: AccessReviewScheduleDefinitionsGetByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
  scheduleDefinitionId: string,
  options: AccessReviewScheduleDefinitionsGetByIdOptionalParams = { requestOptions: {} },
): Promise<AccessReviewScheduleDefinition> {
  const result = await _getByIdSend(context, scheduleDefinitionId, options);
  return _getByIdDeserialize(result);
}
