// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _NodeImageVersionsListResult,
  _nodeImageVersionsListResultDeserializer,
  NodeImageVersion,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ContainerServiceListNodeImageVersionsOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listNodeImageVersionsSend(
  context: Client,
  location: string,
  options: ContainerServiceListNodeImageVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/locations/{location}/nodeImageVersions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-04-02-preview",
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

export async function _listNodeImageVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_NodeImageVersionsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _nodeImageVersionsListResultDeserializer(result.body);
}

/** Only returns the latest version of each node image. For example there may be an AKSUbuntu-1804gen2containerd-2024.01.26, but only AKSUbuntu-1804gen2containerd-2024.02.02 is visible in this list. */
export function listNodeImageVersions(
  context: Client,
  location: string,
  options: ContainerServiceListNodeImageVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NodeImageVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listNodeImageVersionsSend(context, location, options),
    _listNodeImageVersionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-02-preview",
    },
  );
}
