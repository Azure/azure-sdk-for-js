// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _UsageListResult,
  _usageListResultDeserializer,
  Usage,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { UsagesListByInstancePoolOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByInstancePoolSend(
  context: Client,
  resourceGroupName: string,
  instancePoolName: string,
  options: UsagesListByInstancePoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/instancePools/{instancePoolName}/usages{?api%2Dversion,expandChildren}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instancePoolName: instancePoolName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
      expandChildren: options?.expandChildren,
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

export async function _listByInstancePoolDeserialize(
  result: PathUncheckedResponse,
): Promise<_UsageListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _usageListResultDeserializer(result.body);
}

/** Gets all instance pool usage metrics */
export function listByInstancePool(
  context: Client,
  resourceGroupName: string,
  instancePoolName: string,
  options: UsagesListByInstancePoolOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Usage> {
  return buildPagedAsyncIterator(
    context,
    () => _listByInstancePoolSend(context, resourceGroupName, instancePoolName, options),
    _listByInstancePoolDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-01-01" },
  );
}
