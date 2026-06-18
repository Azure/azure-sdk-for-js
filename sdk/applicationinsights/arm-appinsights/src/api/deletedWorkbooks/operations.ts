// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext as Client } from "../index.js";
import {
  _DeletedWorkbooksListResult,
  _deletedWorkbooksListResultDeserializer,
  DeletedWorkbook,
  deletedWorkbookErrorDeserializer,
} from "../../models/deletedWorkbookApi/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { DeletedWorkbooksListBySubscriptionOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: DeletedWorkbooksListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/deletedWorkbooks{?api%2Dversion,category,tags}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2024-02-01-preview",
      category: options?.category,
      tags: !options?.tags
        ? options?.tags
        : options?.tags.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeletedWorkbooksListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = deletedWorkbookErrorDeserializer(result.body);
    }

    throw error;
  }

  return _deletedWorkbooksListResultDeserializer(result.body);
}

/** Get all recently deleted Workbooks in a specified subscription. */
export function listBySubscription(
  context: Client,
  options: DeletedWorkbooksListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeletedWorkbook> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-02-01-preview" },
  );
}
