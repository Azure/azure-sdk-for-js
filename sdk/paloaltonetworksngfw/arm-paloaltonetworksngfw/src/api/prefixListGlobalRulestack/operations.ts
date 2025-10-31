// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext as Client } from "../index.js";
import type {
  PrefixListGlobalRulestackResource,
  _PrefixListGlobalRulestackResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  prefixListGlobalRulestackResourceSerializer,
  prefixListGlobalRulestackResourceDeserializer,
  _prefixListGlobalRulestackResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrefixListGlobalRulestackListOptionalParams,
  PrefixListGlobalRulestackDeleteOptionalParams,
  PrefixListGlobalRulestackCreateOrUpdateOptionalParams,
  PrefixListGlobalRulestackGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  globalRulestackName: string,
  options: PrefixListGlobalRulestackListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/prefixlists{?api%2Dversion}",
    {
      globalRulestackName: globalRulestackName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrefixListGlobalRulestackResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _prefixListGlobalRulestackResourceListResultDeserializer(result.body);
}

/** List PrefixListGlobalRulestackResource resources by Tenant */
export function list(
  context: Client,
  globalRulestackName: string,
  options: PrefixListGlobalRulestackListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrefixListGlobalRulestackResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, globalRulestackName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  globalRulestackName: string,
  name: string,
  options: PrefixListGlobalRulestackDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/prefixlists/{name}{?api%2Dversion}",
    {
      globalRulestackName: globalRulestackName,
      name: name,
      "api%2Dversion": context.apiVersion,
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a PrefixListGlobalRulestackResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  globalRulestackName: string,
  name: string,
  options: PrefixListGlobalRulestackDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, globalRulestackName, name, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  globalRulestackName: string,
  name: string,
  resource: PrefixListGlobalRulestackResource,
  options: PrefixListGlobalRulestackCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/prefixlists/{name}{?api%2Dversion}",
    {
      globalRulestackName: globalRulestackName,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: prefixListGlobalRulestackResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PrefixListGlobalRulestackResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return prefixListGlobalRulestackResourceDeserializer(result.body);
}

/** Create a PrefixListGlobalRulestackResource */
export function createOrUpdate(
  context: Client,
  globalRulestackName: string,
  name: string,
  resource: PrefixListGlobalRulestackResource,
  options: PrefixListGlobalRulestackCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<PrefixListGlobalRulestackResource>,
  PrefixListGlobalRulestackResource
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, globalRulestackName, name, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<
    OperationState<PrefixListGlobalRulestackResource>,
    PrefixListGlobalRulestackResource
  >;
}

export function _getSend(
  context: Client,
  globalRulestackName: string,
  name: string,
  options: PrefixListGlobalRulestackGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/prefixlists/{name}{?api%2Dversion}",
    {
      globalRulestackName: globalRulestackName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<PrefixListGlobalRulestackResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return prefixListGlobalRulestackResourceDeserializer(result.body);
}

/** Get a PrefixListGlobalRulestackResource */
export async function get(
  context: Client,
  globalRulestackName: string,
  name: string,
  options: PrefixListGlobalRulestackGetOptionalParams = { requestOptions: {} },
): Promise<PrefixListGlobalRulestackResource> {
  const result = await _getSend(context, globalRulestackName, name, options);
  return _getDeserialize(result);
}
