// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext as Client } from "../index.js";
import type {
  FqdnListGlobalRulestackResource,
  _FqdnListGlobalRulestackResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  fqdnListGlobalRulestackResourceSerializer,
  fqdnListGlobalRulestackResourceDeserializer,
  _fqdnListGlobalRulestackResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FqdnListGlobalRulestackListOptionalParams,
  FqdnListGlobalRulestackDeleteOptionalParams,
  FqdnListGlobalRulestackCreateOrUpdateOptionalParams,
  FqdnListGlobalRulestackGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  globalRulestackName: string,
  options: FqdnListGlobalRulestackListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/fqdnlists{?api%2Dversion}",
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
): Promise<_FqdnListGlobalRulestackResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _fqdnListGlobalRulestackResourceListResultDeserializer(result.body);
}

/** List FqdnListGlobalRulestackResource resources by Tenant */
export function list(
  context: Client,
  globalRulestackName: string,
  options: FqdnListGlobalRulestackListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FqdnListGlobalRulestackResource> {
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
  options: FqdnListGlobalRulestackDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/fqdnlists/{name}{?api%2Dversion}",
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

/** Delete a FqdnListGlobalRulestackResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  globalRulestackName: string,
  name: string,
  options: FqdnListGlobalRulestackDeleteOptionalParams = { requestOptions: {} },
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
  resource: FqdnListGlobalRulestackResource,
  options: FqdnListGlobalRulestackCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/fqdnlists/{name}{?api%2Dversion}",
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
    body: fqdnListGlobalRulestackResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FqdnListGlobalRulestackResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return fqdnListGlobalRulestackResourceDeserializer(result.body);
}

/** Create a FqdnListGlobalRulestackResource */
export function createOrUpdate(
  context: Client,
  globalRulestackName: string,
  name: string,
  resource: FqdnListGlobalRulestackResource,
  options: FqdnListGlobalRulestackCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<FqdnListGlobalRulestackResource>, FqdnListGlobalRulestackResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, globalRulestackName, name, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<
    OperationState<FqdnListGlobalRulestackResource>,
    FqdnListGlobalRulestackResource
  >;
}

export function _getSend(
  context: Client,
  globalRulestackName: string,
  name: string,
  options: FqdnListGlobalRulestackGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/fqdnlists/{name}{?api%2Dversion}",
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
): Promise<FqdnListGlobalRulestackResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return fqdnListGlobalRulestackResourceDeserializer(result.body);
}

/** Get a FqdnListGlobalRulestackResource */
export async function get(
  context: Client,
  globalRulestackName: string,
  name: string,
  options: FqdnListGlobalRulestackGetOptionalParams = { requestOptions: {} },
): Promise<FqdnListGlobalRulestackResource> {
  const result = await _getSend(context, globalRulestackName, name, options);
  return _getDeserialize(result);
}
