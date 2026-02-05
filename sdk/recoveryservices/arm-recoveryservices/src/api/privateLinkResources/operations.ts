// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesContext as Client } from "../index.js";
import type { PrivateLinkResource, _PrivateLinkResources } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  privateLinkResourceDeserializer,
  _privateLinkResourcesDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: PrivateLinkResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
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
): Promise<_PrivateLinkResources> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _privateLinkResourcesDeserializer(result.body);
}

/** Returns the list of private link resources that need to be created for Backup and SiteRecovery */
export function list(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: PrivateLinkResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, vaultName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  privateLinkResourceName: string,
  options: PrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/privateLinkResources/{privateLinkResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      privateLinkResourceName: privateLinkResourceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return privateLinkResourceDeserializer(result.body);
}

/** Returns a specified private link resource that need to be created for Backup and SiteRecovery */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  privateLinkResourceName: string,
  options: PrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    vaultName,
    privateLinkResourceName,
    options,
  );
  return _getDeserialize(result);
}
