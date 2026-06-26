// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _PreconfiguredEndpointList,
  _preconfiguredEndpointListDeserializer,
  PreconfiguredEndpoint,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { PreconfiguredEndpointsListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: PreconfiguredEndpointsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/NetworkExperimentProfiles/{profileName}/preconfiguredEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PreconfiguredEndpointList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _preconfiguredEndpointListDeserializer(result.body);
}

/** Gets a list of Preconfigured Endpoints */
export function list(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: PreconfiguredEndpointsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PreconfiguredEndpoint> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, profileName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-11-01" },
  );
}
