// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type { AccessReviewScheduleDefinition } from "../../models/microsoft/attributeNamespaces/models.js";
import { errorDefinitionDeserializer } from "../../models/microsoft/attributeNamespaces/models.js";
import type { _AccessReviewScheduleDefinitionListResult } from "../../models/models.js";
import { _accessReviewScheduleDefinitionListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { AccessReviewScheduleDefinitionsAssignedForMyApprovalListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: AccessReviewScheduleDefinitionsAssignedForMyApprovalListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/accessReviewScheduleDefinitions{?api%2Dversion,%24filter}",
    {
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

/** Get access review instances assigned for my approval. */
export function list(
  context: Client,
  options: AccessReviewScheduleDefinitionsAssignedForMyApprovalListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AccessReviewScheduleDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2021-12-01-preview" },
  );
}
