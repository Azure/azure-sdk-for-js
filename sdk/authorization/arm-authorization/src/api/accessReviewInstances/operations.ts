// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type {
  AccessReviewInstance,
  AccessReviewInstanceProperties,
} from "../../models/microsoft/attributeNamespaces/models.js";
import {
  errorDefinitionDeserializer,
  accessReviewInstanceDeserializer,
  accessReviewInstancePropertiesSerializer,
} from "../../models/microsoft/attributeNamespaces/models.js";
import type { _AccessReviewInstanceListResult } from "../../models/models.js";
import { _accessReviewInstanceListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AccessReviewInstancesListOptionalParams,
  AccessReviewInstancesCreateOptionalParams,
  AccessReviewInstancesGetByIdOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scheduleDefinitionId: string,
  options: AccessReviewInstancesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
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

/** Get access review instances */
export function list(
  context: Client,
  scheduleDefinitionId: string,
  options: AccessReviewInstancesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AccessReviewInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scheduleDefinitionId, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2021-12-01-preview" },
  );
}

export function _createSend(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  properties: AccessReviewInstanceProperties,
  options: AccessReviewInstancesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      scheduleDefinitionId: scheduleDefinitionId,
      id: id,
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
    body: accessReviewInstancePropertiesSerializer(properties),
  });
}

export async function _createDeserialize(
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

/** Update access review instance. */
export async function create(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  properties: AccessReviewInstanceProperties,
  options: AccessReviewInstancesCreateOptionalParams = { requestOptions: {} },
): Promise<AccessReviewInstance> {
  const result = await _createSend(context, scheduleDefinitionId, id, properties, options);
  return _createDeserialize(result);
}

export function _getByIdSend(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstancesGetByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

/** Get access review instances */
export async function getById(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstancesGetByIdOptionalParams = { requestOptions: {} },
): Promise<AccessReviewInstance> {
  const result = await _getByIdSend(context, scheduleDefinitionId, id, options);
  return _getByIdDeserialize(result);
}
