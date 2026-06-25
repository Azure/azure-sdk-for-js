// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesRuntimeContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  BgpPeer,
  bgpPeerSerializer,
  bgpPeerDeserializer,
  _BgpPeerListResult,
  _bgpPeerListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  BgpPeersListOptionalParams,
  BgpPeersDeleteOptionalParams,
  BgpPeersCreateOrUpdateOptionalParams,
  BgpPeersGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceUri: string,
  options: BgpPeersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.KubernetesRuntime/bgpPeers{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2024-03-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_BgpPeerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _bgpPeerListResultDeserializer(result.body);
}

/** List BgpPeer resources by parent */
export function list(
  context: Client,
  resourceUri: string,
  options: BgpPeersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BgpPeer> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-03-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  bgpPeerName: string,
  options: BgpPeersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.KubernetesRuntime/bgpPeers/{bgpPeerName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      bgpPeerName: bgpPeerName,
      "api%2Dversion": context.apiVersion ?? "2024-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a BgpPeer */
export async function $delete(
  context: Client,
  resourceUri: string,
  bgpPeerName: string,
  options: BgpPeersDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceUri, bgpPeerName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceUri: string,
  bgpPeerName: string,
  resource: BgpPeer,
  options: BgpPeersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.KubernetesRuntime/bgpPeers/{bgpPeerName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      bgpPeerName: bgpPeerName,
      "api%2Dversion": context.apiVersion ?? "2024-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: bgpPeerSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<BgpPeer> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return bgpPeerDeserializer(result.body);
}

/** Create a BgpPeer */
export function createOrUpdate(
  context: Client,
  resourceUri: string,
  bgpPeerName: string,
  resource: BgpPeer,
  options: BgpPeersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BgpPeer>, BgpPeer> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceUri, bgpPeerName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-03-01",
  }) as PollerLike<OperationState<BgpPeer>, BgpPeer>;
}

export function _getSend(
  context: Client,
  resourceUri: string,
  bgpPeerName: string,
  options: BgpPeersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.KubernetesRuntime/bgpPeers/{bgpPeerName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      bgpPeerName: bgpPeerName,
      "api%2Dversion": context.apiVersion ?? "2024-03-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<BgpPeer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return bgpPeerDeserializer(result.body);
}

/** Get a BgpPeer */
export async function get(
  context: Client,
  resourceUri: string,
  bgpPeerName: string,
  options: BgpPeersGetOptionalParams = { requestOptions: {} },
): Promise<BgpPeer> {
  const result = await _getSend(context, resourceUri, bgpPeerName, options);
  return _getDeserialize(result);
}
