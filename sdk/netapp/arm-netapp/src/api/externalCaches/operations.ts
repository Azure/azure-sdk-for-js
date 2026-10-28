// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type { ExternalCache, _ExternalCacheListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  externalCacheDeserializer,
  _externalCacheListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExternalCachesListByParentOptionalParams,
  ExternalCachesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  externalSvmName: string,
  options: ExternalCachesListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalClusters/{externalClusterName}/externalSvms/{externalSvmName}/externalCaches{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalClusterName: externalClusterName,
      externalSvmName: externalSvmName,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExternalCacheListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _externalCacheListResultDeserializer(result.body);
}

/** List all External Caches under an External SVM */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  externalSvmName: string,
  options: ExternalCachesListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExternalCache> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByParentSend(context, resourceGroupName, externalClusterName, externalSvmName, options),
    _listByParentDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-15-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  externalSvmName: string,
  externalCacheResourceName: string,
  options: ExternalCachesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalClusters/{externalClusterName}/externalSvms/{externalSvmName}/externalCaches/{externalCacheResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalClusterName: externalClusterName,
      externalSvmName: externalSvmName,
      externalCacheResourceName: externalCacheResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ExternalCache> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return externalCacheDeserializer(result.body);
}

/** Get the External Cache */
export async function get(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  externalSvmName: string,
  externalCacheResourceName: string,
  options: ExternalCachesGetOptionalParams = { requestOptions: {} },
): Promise<ExternalCache> {
  const result = await _getSend(
    context,
    resourceGroupName,
    externalClusterName,
    externalSvmName,
    externalCacheResourceName,
    options,
  );
  return _getDeserialize(result);
}
