// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyVaultManagementContext as Client } from "../index.js";
import type { MhsmGeoReplicatedRegion, _MhsmRegionsListResult } from "../../models/models.js";
import {
  managedHsmErrorDeserializer,
  _mhsmRegionsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { MhsmRegionsListByResourceOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByResourceSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: MhsmRegionsListByResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}/regions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
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

export async function _listByResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_MhsmRegionsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = managedHsmErrorDeserializer(result.body);
    throw error;
  }

  return _mhsmRegionsListResultDeserializer(result.body);
}

/** The List operation gets information about the regions associated with the managed HSM Pool. */
export function listByResource(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: MhsmRegionsListByResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MhsmGeoReplicatedRegion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceSend(context, resourceGroupName, name, options),
    _listByResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
