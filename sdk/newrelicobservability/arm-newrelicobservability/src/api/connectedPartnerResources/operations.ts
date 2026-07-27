// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NewRelicObservabilityContext as Client } from "../index.js";
import type {
  _ConnectedPartnerResourcesListResponse,
  ConnectedPartnerResourcesListFormat,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _connectedPartnerResourcesListResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ConnectedPartnerResourcesListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: ConnectedPartnerResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/listConnectedPartnerResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.body ? options?.body : options?.body,
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectedPartnerResourcesListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _connectedPartnerResourcesListResponseDeserializer(result.body);
}

/** A synchronous resource action. */
export function list(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: ConnectedPartnerResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConnectedPartnerResourcesListFormat> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, monitorName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-05-01-preview",
    },
  );
}
