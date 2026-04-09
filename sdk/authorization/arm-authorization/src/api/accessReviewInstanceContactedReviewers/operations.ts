// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type { AccessReviewContactedReviewer } from "../../models/microsoft/attributeNamespaces/models.js";
import { errorDefinitionDeserializer } from "../../models/microsoft/attributeNamespaces/models.js";
import type { _AccessReviewContactedReviewerListResult } from "../../models/models.js";
import { _accessReviewContactedReviewerListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { AccessReviewInstanceContactedReviewersListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstanceContactedReviewersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/contactedReviewers{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AccessReviewContactedReviewerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return _accessReviewContactedReviewerListResultDeserializer(result.body);
}

/** Get access review instance contacted reviewers */
export function list(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstanceContactedReviewersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AccessReviewContactedReviewer> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scheduleDefinitionId, id, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2021-12-01-preview" },
  );
}
