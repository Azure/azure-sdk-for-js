// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeContext as Client } from "../index.js";
import {
  Site,
  siteSerializer,
  siteDeserializer,
  errorResponseDeserializer,
  SiteUpdate,
  siteUpdateSerializer,
  _SiteListResult,
  _siteListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SitesByServiceGroupDeleteOptionalParams,
  SitesByServiceGroupUpdateOptionalParams,
  SitesByServiceGroupCreateOrUpdateOptionalParams,
  SitesByServiceGroupGetOptionalParams,
  SitesByServiceGroupListByServiceGroupOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  servicegroupName: string,
  siteName: string,
  options: SitesByServiceGroupDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{servicegroupName}/providers/Microsoft.Edge/sites/{siteName}{?api%2Dversion}",
    {
      servicegroupName: servicegroupName,
      siteName: siteName,
      "api%2Dversion": context.apiVersion,
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** delete Site at SG scope */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  servicegroupName: string,
  siteName: string,
  options: SitesByServiceGroupDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, servicegroupName, siteName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  servicegroupName: string,
  siteName: string,
  properties: SiteUpdate,
  options: SitesByServiceGroupUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{servicegroupName}/providers/Microsoft.Edge/sites/{siteName}{?api%2Dversion}",
    {
      servicegroupName: servicegroupName,
      siteName: siteName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: siteUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Site> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return siteDeserializer(result.body);
}

/** update Site at SG scope */
export async function update(
  context: Client,
  servicegroupName: string,
  siteName: string,
  properties: SiteUpdate,
  options: SitesByServiceGroupUpdateOptionalParams = { requestOptions: {} },
): Promise<Site> {
  const result = await _updateSend(context, servicegroupName, siteName, properties, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  servicegroupName: string,
  siteName: string,
  resource: Site,
  options: SitesByServiceGroupCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{servicegroupName}/providers/Microsoft.Edge/sites/{siteName}{?api%2Dversion}",
    {
      servicegroupName: servicegroupName,
      siteName: siteName,
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
    body: siteSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Site> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return siteDeserializer(result.body);
}

/** create or update Site at SG scope */
export function createOrUpdate(
  context: Client,
  servicegroupName: string,
  siteName: string,
  resource: Site,
  options: SitesByServiceGroupCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<Site>, Site> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, servicegroupName, siteName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Site>, Site>;
}

export function _getSend(
  context: Client,
  servicegroupName: string,
  siteName: string,
  options: SitesByServiceGroupGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{servicegroupName}/providers/Microsoft.Edge/sites/{siteName}{?api%2Dversion}",
    {
      servicegroupName: servicegroupName,
      siteName: siteName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Site> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return siteDeserializer(result.body);
}

/** Get Site at SG scope */
export async function get(
  context: Client,
  servicegroupName: string,
  siteName: string,
  options: SitesByServiceGroupGetOptionalParams = { requestOptions: {} },
): Promise<Site> {
  const result = await _getSend(context, servicegroupName, siteName, options);
  return _getDeserialize(result);
}

export function _listByServiceGroupSend(
  context: Client,
  servicegroupName: string,
  options: SitesByServiceGroupListByServiceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{servicegroupName}/providers/Microsoft.Edge/sites{?api%2Dversion}",
    {
      servicegroupName: servicegroupName,
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

export async function _listByServiceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SiteListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _siteListResultDeserializer(result.body);
}

/** list Site at SG scope */
export function listByServiceGroup(
  context: Client,
  servicegroupName: string,
  options: SitesByServiceGroupListByServiceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<Site> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServiceGroupSend(context, servicegroupName, options),
    _listByServiceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
