// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfwContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  PrefixListResource,
  prefixListResourceSerializer,
  prefixListResourceDeserializer,
  _PrefixListResourceListResult,
  _prefixListResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PrefixListLocalRulestackListByLocalRulestacksOptionalParams,
  PrefixListLocalRulestackDeleteOptionalParams,
  PrefixListLocalRulestackCreateOrUpdateOptionalParams,
  PrefixListLocalRulestackGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByLocalRulestacksSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: PrefixListLocalRulestackListByLocalRulestacksOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/prefixlists{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      localRulestackName: localRulestackName,
      "api%2Dversion": context.apiVersion ?? "2026-05-11-preview",
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

export async function _listByLocalRulestacksDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrefixListResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _prefixListResourceListResultDeserializer(result.body);
}

/** List PrefixListResource resources by LocalRulestacks */
export function listByLocalRulestacks(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: PrefixListLocalRulestackListByLocalRulestacksOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrefixListResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByLocalRulestacksSend(context, resourceGroupName, localRulestackName, options),
    _listByLocalRulestacksDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-11-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  name: string,
  options: PrefixListLocalRulestackDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/prefixlists/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      localRulestackName: localRulestackName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-05-11-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a PrefixListResource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  name: string,
  options: PrefixListLocalRulestackDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, localRulestackName, name, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-11-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  name: string,
  resource: PrefixListResource,
  options: PrefixListLocalRulestackCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/prefixlists/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      localRulestackName: localRulestackName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-05-11-preview",
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
      body: prefixListResourceSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PrefixListResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return prefixListResourceDeserializer(result.body);
}

/** Create a PrefixListResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  name: string,
  resource: PrefixListResource,
  options: PrefixListLocalRulestackCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PrefixListResource>, PrefixListResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, localRulestackName, name, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-11-preview",
  }) as PollerLike<OperationState<PrefixListResource>, PrefixListResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  name: string,
  options: PrefixListLocalRulestackGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/prefixlists/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      localRulestackName: localRulestackName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-05-11-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PrefixListResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return prefixListResourceDeserializer(result.body);
}

/** Get a PrefixListResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  name: string,
  options: PrefixListLocalRulestackGetOptionalParams = { requestOptions: {} },
): Promise<PrefixListResource> {
  const result = await _getSend(context, resourceGroupName, localRulestackName, name, options);
  return _getDeserialize(result);
}
