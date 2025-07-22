// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageActionsManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _StorageTaskAssignmentsListResult,
  _storageTaskAssignmentsListResultDeserializer,
  StorageTaskAssignment,
} from "../../models/models.js";
import { StorageTaskAssignmentListOptionalParams } from "./options.js";
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
  options: StorageTaskAssignmentListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageActions/storageTasks/{storageTaskName}/storageTaskAssignments{?api%2Dversion,%24maxpagesize}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageTaskName: storageTaskName,
      "api%2Dversion": context.apiVersion,
      "%24maxpagesize": options?.maxpagesize,
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
): Promise<_StorageTaskAssignmentsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _storageTaskAssignmentsListResultDeserializer(result.body);
}

/** Lists Resource IDs of the Storage Task Assignments associated with this Storage Task. */
export function list(
  context: Client,
  resourceGroupName: string,
  storageTaskName: string,
  options: StorageTaskAssignmentListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageTaskAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, storageTaskName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
