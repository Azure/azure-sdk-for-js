// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _DimensionsListResult,
  _dimensionsListResultDeserializer,
  Dimension,
  ExternalCloudProviderType,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DimensionsListByExternalCloudProviderTypeOptionalParams,
  DimensionsListOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByExternalCloudProviderTypeSend(
  context: Client,
  externalCloudProviderType: ExternalCloudProviderType,
  externalCloudProviderId: string,
  options: DimensionsListByExternalCloudProviderTypeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.CostManagement/{externalCloudProviderType}/{externalCloudProviderId}/dimensions{?api%2Dversion,%24filter,%24expand,%24skiptoken,%24top}",
    {
      externalCloudProviderType: externalCloudProviderType,
      externalCloudProviderId: externalCloudProviderId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24filter": options?.filter,
      "%24expand": options?.expand,
      "%24skiptoken": options?.skiptoken,
      "%24top": options?.top,
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

export async function _listByExternalCloudProviderTypeDeserialize(
  result: PathUncheckedResponse,
): Promise<_DimensionsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _dimensionsListResultDeserializer(result.body);
}

/** Lists the dimensions by the external cloud provider type. */
export function listByExternalCloudProviderType(
  context: Client,
  externalCloudProviderType: ExternalCloudProviderType,
  externalCloudProviderId: string,
  options: DimensionsListByExternalCloudProviderTypeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Dimension> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByExternalCloudProviderTypeSend(
        context,
        externalCloudProviderType,
        externalCloudProviderId,
        options,
      ),
    _listByExternalCloudProviderTypeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}

export function _listSend(
  context: Client,
  scope: string,
  options: DimensionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.CostManagement/dimensions{?api%2Dversion,%24filter,%24expand,%24skiptoken,%24top}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24filter": options?.filter,
      "%24expand": options?.expand,
      "%24skiptoken": options?.skiptoken,
      "%24top": options?.top,
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
): Promise<_DimensionsListResult> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _dimensionsListResultDeserializer(result.body);
}

/** Lists the dimensions by the defined scope. */
export function list(
  context: Client,
  scope: string,
  options: DimensionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Dimension> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, options),
    _listDeserialize,
    ["200", "204"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-03-01" },
  );
}
