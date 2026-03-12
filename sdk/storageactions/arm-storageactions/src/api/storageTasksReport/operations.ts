// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageActionsManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _StorageTaskReportSummary,
  _storageTaskReportSummaryDeserializer,
  StorageTaskReportInstance,
} from "../../models/models.js";
import { StorageTasksReportListOptionalParams } from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  storageTaskName: string,
  options: StorageTasksReportListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageActions/storageTasks/{storageTaskName}/reports{?api%2Dversion,%24maxpagesize,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageTaskName: storageTaskName,
      "api%2Dversion": context.apiVersion,
      "%24maxpagesize": options?.maxpagesize,
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_StorageTaskReportSummary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _storageTaskReportSummaryDeserializer(result.body);
}

/** Fetch the storage tasks run report summary for each assignment. */
export function list(
  context: Client,
  resourceGroupName: string,
  storageTaskName: string,
  options: StorageTasksReportListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageTaskReportInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, storageTaskName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
