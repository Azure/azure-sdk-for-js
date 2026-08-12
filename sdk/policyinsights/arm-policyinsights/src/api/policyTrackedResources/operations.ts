// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext as Client } from "../index.js";
import { queryFailureDeserializer } from "../../models/policyInsightsCommon/models.js";
import type {
  _PolicyTrackedResourcesQueryResults,
  PolicyTrackedResource,
  PolicyTrackedResourcesResourceType,
} from "../../models/policyTrackedResourcesApi/models.js";
import { _policyTrackedResourcesQueryResultsDeserializer } from "../../models/policyTrackedResourcesApi/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PolicyTrackedResourcesListQueryResultsForResourceOptionalParams,
  PolicyTrackedResourcesListQueryResultsForResourceGroupOptionalParams,
  PolicyTrackedResourcesListQueryResultsForSubscriptionOptionalParams,
  PolicyTrackedResourcesListQueryResultsForManagementGroupOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listQueryResultsForResourceSend(
  context: Client,
  resourceId: string,
  policyTrackedResourcesResource: PolicyTrackedResourcesResourceType,
  options: PolicyTrackedResourcesListQueryResultsForResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.PolicyInsights/policyTrackedResources/{policyTrackedResourcesResource}/queryResults{?api%2Dversion,%24top,%24filter}",
    {
      resourceId: resourceId,
      policyTrackedResourcesResource: policyTrackedResourcesResource,
      "api%2Dversion": "2018-07-01-preview",
      "%24top": options?.queryOptions?.top,
      "%24filter": options?.queryOptions?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listQueryResultsForResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyTrackedResourcesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyTrackedResourcesQueryResultsDeserializer(result.body);
}

/** Queries policy tracked resources under the resource. */
export function listQueryResultsForResource(
  context: Client,
  resourceId: string,
  policyTrackedResourcesResource: PolicyTrackedResourcesResourceType,
  options: PolicyTrackedResourcesListQueryResultsForResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyTrackedResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listQueryResultsForResourceSend(
        context,
        resourceId,
        policyTrackedResourcesResource,
        options,
      ),
    _listQueryResultsForResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2018-07-01-preview" },
  );
}

export function _listQueryResultsForResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  policyTrackedResourcesResource: PolicyTrackedResourcesResourceType,
  options: PolicyTrackedResourcesListQueryResultsForResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/policyTrackedResources/{policyTrackedResourcesResource}/queryResults{?api%2Dversion,%24top,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      policyTrackedResourcesResource: policyTrackedResourcesResource,
      "api%2Dversion": "2018-07-01-preview",
      "%24top": options?.queryOptions?.top,
      "%24filter": options?.queryOptions?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listQueryResultsForResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyTrackedResourcesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyTrackedResourcesQueryResultsDeserializer(result.body);
}

/** Queries policy tracked resources under the resource group. */
export function listQueryResultsForResourceGroup(
  context: Client,
  resourceGroupName: string,
  policyTrackedResourcesResource: PolicyTrackedResourcesResourceType,
  options: PolicyTrackedResourcesListQueryResultsForResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PolicyTrackedResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listQueryResultsForResourceGroupSend(
        context,
        resourceGroupName,
        policyTrackedResourcesResource,
        options,
      ),
    _listQueryResultsForResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2018-07-01-preview" },
  );
}

export function _listQueryResultsForSubscriptionSend(
  context: Client,
  policyTrackedResourcesResource: PolicyTrackedResourcesResourceType,
  options: PolicyTrackedResourcesListQueryResultsForSubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/policyTrackedResources/{policyTrackedResourcesResource}/queryResults{?api%2Dversion,%24top,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      policyTrackedResourcesResource: policyTrackedResourcesResource,
      "api%2Dversion": "2018-07-01-preview",
      "%24top": options?.queryOptions?.top,
      "%24filter": options?.queryOptions?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listQueryResultsForSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyTrackedResourcesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyTrackedResourcesQueryResultsDeserializer(result.body);
}

/** Queries policy tracked resources under the subscription. */
export function listQueryResultsForSubscription(
  context: Client,
  policyTrackedResourcesResource: PolicyTrackedResourcesResourceType,
  options: PolicyTrackedResourcesListQueryResultsForSubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PolicyTrackedResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listQueryResultsForSubscriptionSend(context, policyTrackedResourcesResource, options),
    _listQueryResultsForSubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2018-07-01-preview" },
  );
}

export function _listQueryResultsForManagementGroupSend(
  context: Client,
  managementGroupName: string,
  policyTrackedResourcesResource: PolicyTrackedResourcesResourceType,
  options: PolicyTrackedResourcesListQueryResultsForManagementGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/{managementGroupsNamespace}/managementGroups/{managementGroupName}/providers/Microsoft.PolicyInsights/policyTrackedResources/{policyTrackedResourcesResource}/queryResults{?api%2Dversion,%24top,%24filter}",
    {
      managementGroupsNamespace: "Microsoft.Management",
      managementGroupName: managementGroupName,
      policyTrackedResourcesResource: policyTrackedResourcesResource,
      "api%2Dversion": "2018-07-01-preview",
      "%24top": options?.queryOptions?.top,
      "%24filter": options?.queryOptions?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listQueryResultsForManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyTrackedResourcesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyTrackedResourcesQueryResultsDeserializer(result.body);
}

/** Queries policy tracked resources under the management group. */
export function listQueryResultsForManagementGroup(
  context: Client,
  managementGroupName: string,
  policyTrackedResourcesResource: PolicyTrackedResourcesResourceType,
  options: PolicyTrackedResourcesListQueryResultsForManagementGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PolicyTrackedResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listQueryResultsForManagementGroupSend(
        context,
        managementGroupName,
        policyTrackedResourcesResource,
        options,
      ),
    _listQueryResultsForManagementGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2018-07-01-preview" },
  );
}
