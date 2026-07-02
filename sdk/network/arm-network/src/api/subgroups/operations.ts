// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type { Subgroup } from "../../models/microsoft/network/models.js";
import { subgroupDeserializer } from "../../models/microsoft/network/models.js";
import type { _SubgroupListResult } from "../../models/models.js";
import { _subgroupListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { SubgroupsListOptionalParams, SubgroupsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  interconnectGroupName: string,
  options: SubgroupsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/interconnectGroups/{interconnectGroupName}/subgroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      interconnectGroupName: interconnectGroupName,
      "api%2Dversion": "2025-07-01",
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
): Promise<_SubgroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _subgroupListResultDeserializer(result.body);
}

/** Gets all subgroups in an interconnect group. */
export function list(
  context: Client,
  resourceGroupName: string,
  interconnectGroupName: string,
  options: SubgroupsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Subgroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, interconnectGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-07-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  interconnectGroupName: string,
  subgroupName: string,
  options: SubgroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/interconnectGroups/{interconnectGroupName}/subgroups/{subgroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      interconnectGroupName: interconnectGroupName,
      subgroupName: subgroupName,
      "api%2Dversion": "2025-07-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Subgroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return subgroupDeserializer(result.body);
}

/** Gets the specified subgroup in an interconnect group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  interconnectGroupName: string,
  subgroupName: string,
  options: SubgroupsGetOptionalParams = { requestOptions: {} },
): Promise<Subgroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    interconnectGroupName,
    subgroupName,
    options,
  );
  return _getDeserialize(result);
}
