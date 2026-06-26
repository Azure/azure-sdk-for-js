// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfwContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  FqdnListGlobalRulestackResource,
  fqdnListGlobalRulestackResourceSerializer,
  fqdnListGlobalRulestackResourceDeserializer,
  _FqdnListGlobalRulestackResourceListResult,
  _fqdnListGlobalRulestackResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  FqdnListGlobalRulestackListOptionalParams,
  FqdnListGlobalRulestackDeleteOptionalParams,
  FqdnListGlobalRulestackCreateOrUpdateOptionalParams,
  FqdnListGlobalRulestackGetOptionalParams,
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
  globalRulestackName: string,
  options: FqdnListGlobalRulestackListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/fqdnlists{?api%2Dversion}",
    {
      globalRulestackName: globalRulestackName,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_FqdnListGlobalRulestackResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

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
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-11-preview",
    },
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

/** Delete a FqdnListGlobalRulestackResource */
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
    apiVersion: context.apiVersion ?? "2026-05-11-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  globalRulestackName: string,
  name: string,
  resource: FqdnListGlobalRulestackResource,
  options: FqdnListGlobalRulestackCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/fqdnlists/{name}{?api%2Dversion}",
    {
      globalRulestackName: globalRulestackName,
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
      body: fqdnListGlobalRulestackResourceSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FqdnListGlobalRulestackResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

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
  options: FqdnListGlobalRulestackCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FqdnListGlobalRulestackResource>, FqdnListGlobalRulestackResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, globalRulestackName, name, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-11-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<FqdnListGlobalRulestackResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

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
