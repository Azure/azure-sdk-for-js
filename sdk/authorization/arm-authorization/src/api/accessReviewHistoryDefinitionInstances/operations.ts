// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type {
  AccessReviewHistoryInstance,
  _AccessReviewHistoryDefinitionInstanceListResult,
} from "../../models/microsoft/attributeNamespaces/models.js";
import {
  errorDefinitionDeserializer,
  _accessReviewHistoryDefinitionInstanceListResultDeserializer,
} from "../../models/microsoft/attributeNamespaces/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { AccessReviewHistoryDefinitionInstancesListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  historyDefinitionId: string,
  options: AccessReviewHistoryDefinitionInstancesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewHistoryDefinitions/{historyDefinitionId}/instances{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AccessReviewHistoryDefinitionInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return _accessReviewHistoryDefinitionInstanceListResultDeserializer(result.body);
}

/** Get access review history definition instances by definition Id */
export function list(
  context: Client,
  historyDefinitionId: string,
  options: AccessReviewHistoryDefinitionInstancesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AccessReviewHistoryInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, historyDefinitionId, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2021-12-01-preview" },
  );
}
