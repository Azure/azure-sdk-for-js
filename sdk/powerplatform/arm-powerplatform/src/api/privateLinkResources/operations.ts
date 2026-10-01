// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PowerPlatformContext as Client } from "../index.js";
import type { PrivateLinkResource, _PrivateLinkResourceListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  privateLinkResourceDeserializer,
  _privateLinkResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateLinkResourcesListByEnterprisePolicyOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByEnterprisePolicySend(
  context: Client,
  resourceGroupName: string,
  enterprisePolicyName: string,
  options: PrivateLinkResourcesListByEnterprisePolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerPlatform/enterprisePolicies/{enterprisePolicyName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      enterprisePolicyName: enterprisePolicyName,
      "api%2Dversion": context.apiVersion ?? "2020-10-30-preview",
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

export async function _listByEnterprisePolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _privateLinkResourceListResultDeserializer(result.body);
}

/** Gets the private link resources that need to be created for enterprisePolicy. */
export function listByEnterprisePolicy(
  context: Client,
  resourceGroupName: string,
  enterprisePolicyName: string,
  options: PrivateLinkResourcesListByEnterprisePolicyOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEnterprisePolicySend(context, resourceGroupName, enterprisePolicyName, options),
    _listByEnterprisePolicyDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2020-10-30-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  enterprisePolicyName: string,
  groupName: string,
  options: PrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerPlatform/enterprisePolicies/{enterprisePolicyName}/privateLinkResources/{groupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      enterprisePolicyName: enterprisePolicyName,
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2020-10-30-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return privateLinkResourceDeserializer(result.body);
}

/** Gets the private link resources that need to be created for an EnterprisePolicy. */
export async function get(
  context: Client,
  resourceGroupName: string,
  enterprisePolicyName: string,
  groupName: string,
  options: PrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    enterprisePolicyName,
    groupName,
    options,
  );
  return _getDeserialize(result);
}
