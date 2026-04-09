// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type { AccessReviewHistoryDefinition } from "../../models/microsoft/attributeNamespaces/models.js";
import {
  errorDefinitionDeserializer,
  accessReviewHistoryDefinitionDeserializer,
} from "../../models/microsoft/attributeNamespaces/models.js";
import type { _AccessReviewHistoryDefinitionListResult } from "../../models/models.js";
import { _accessReviewHistoryDefinitionListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AccessReviewHistoryDefinitionsListOptionalParams,
  AccessReviewHistoryDefinitionsGetByIdOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: AccessReviewHistoryDefinitionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewHistoryDefinitions{?api%2Dversion,%24filter}",
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
): Promise<_AccessReviewHistoryDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return _accessReviewHistoryDefinitionListResultDeserializer(result.body);
}

/** Lists the accessReviewHistoryDefinitions available from this provider, definition instances are only available for 30 days after creation. */
export function list(
  context: Client,
  options: AccessReviewHistoryDefinitionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AccessReviewHistoryDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2021-12-01-preview" },
  );
}

export function _getByIdSend(
  context: Client,
  historyDefinitionId: string,
  options: AccessReviewHistoryDefinitionsGetByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewHistoryDefinitions/{historyDefinitionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      historyDefinitionId: historyDefinitionId,
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
): Promise<AccessReviewHistoryDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return accessReviewHistoryDefinitionDeserializer(result.body);
}

/** Get access review history definition by definition Id */
export async function getById(
  context: Client,
  historyDefinitionId: string,
  options: AccessReviewHistoryDefinitionsGetByIdOptionalParams = { requestOptions: {} },
): Promise<AccessReviewHistoryDefinition> {
  const result = await _getByIdSend(context, historyDefinitionId, options);
  return _getByIdDeserialize(result);
}
