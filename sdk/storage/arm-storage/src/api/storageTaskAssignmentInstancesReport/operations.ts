// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext as Client } from "../index.js";
import type { _StorageTaskReportSummary, StorageTaskReportInstance } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _storageTaskReportSummaryDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { StorageTaskAssignmentInstancesReportListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  storageTaskAssignmentName: string,
  options: StorageTaskAssignmentInstancesReportListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/storageTaskAssignments/{storageTaskAssignmentName}/reports{?api%2Dversion,%24maxpagesize,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      storageTaskAssignmentName: storageTaskAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
      "%24maxpagesize": options?.maxpagesize,
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
): Promise<_StorageTaskReportSummary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _storageTaskReportSummaryDeserializer(result.body);
}

/** Fetch the report summary of a single storage task assignment's instances */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  storageTaskAssignmentName: string,
  options: StorageTaskAssignmentInstancesReportListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageTaskReportInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, storageTaskAssignmentName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}
