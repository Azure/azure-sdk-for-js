// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext as Client } from "../index.js";
import type { _MonitoredResourceListResponse, MonitoredResource } from "../../models/models.js";
import {
  resourceProviderDefaultErrorResponseDeserializer,
  _monitoredResourceListResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { MonitoredResourcesListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitoredResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/listMonitoredResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_MonitoredResourceListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _monitoredResourceListResponseDeserializer(result.body);
}

/** List all resources currently being monitored by the Elastic monitor resource, helping you manage observability. */
export function list(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitoredResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MonitoredResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, monitorName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
