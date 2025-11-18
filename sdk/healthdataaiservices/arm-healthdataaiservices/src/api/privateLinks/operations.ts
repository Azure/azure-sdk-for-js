// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HealthDataAIServicesContext as Client } from "../index.js";
import type { _PrivateLinkResourceListResult, PrivateLinkResource } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _privateLinkResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { PrivateLinksListByDeidServiceOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByDeidServiceSend(
  context: Client,
  resourceGroupName: string,
  deidServiceName: string,
  options: PrivateLinksListByDeidServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deidServiceName: deidServiceName,
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

export async function _listByDeidServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _privateLinkResourceListResultDeserializer(result.body);
}

/** List private links on the given resource */
export function listByDeidService(
  context: Client,
  resourceGroupName: string,
  deidServiceName: string,
  options: PrivateLinksListByDeidServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDeidServiceSend(context, resourceGroupName, deidServiceName, options),
    _listByDeidServiceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
