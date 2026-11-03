// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext as Client } from "../index.js";
import type {
  _PolicyEventsQueryResults,
  PolicyEvent,
  PolicyEventsResourceType,
} from "../../models/policyInsightsApi/models.js";
import { _policyEventsQueryResultsDeserializer } from "../../models/policyInsightsApi/models.js";
import { queryFailureDeserializer } from "../../models/policyInsightsCommon/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PolicyEventsListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
  PolicyEventsListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
  PolicyEventsListQueryResultsForPolicyDefinitionOptionalParams,
  PolicyEventsListQueryResultsForPolicySetDefinitionOptionalParams,
  PolicyEventsListQueryResultsForResourceOptionalParams,
  PolicyEventsListQueryResultsForResourceGroupOptionalParams,
  PolicyEventsListQueryResultsForSubscriptionOptionalParams,
  PolicyEventsListQueryResultsForManagementGroupOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listQueryResultsForResourceGroupLevelPolicyAssignmentSend(
  context: Client,
  policyEventsResource: PolicyEventsResourceType,
  subscriptionId: string,
  resourceGroupName: string,
  policyAssignmentName: string,
  options: PolicyEventsListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{authorizationNamespace}/policyAssignments/{policyAssignmentName}/providers/Microsoft.PolicyInsights/policyEvents/{policyEventsResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply,%24skiptoken}",
    {
      subscriptionId: subscriptionId,
      resourceGroupName: resourceGroupName,
      policyEventsResource: policyEventsResource,
      authorizationNamespace: "Microsoft.Authorization",
      policyAssignmentName: policyAssignmentName,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24orderby": options?.queryOptions?.orderBy,
      "%24select": options?.queryOptions?.select,
      "%24from": !options?.queryOptions?.from
        ? options?.queryOptions?.from
        : options?.queryOptions?.from.toISOString(),
      "%24to": !options?.queryOptions?.to
        ? options?.queryOptions?.to
        : options?.queryOptions?.to.toISOString(),
      "%24filter": options?.queryOptions?.filter,
      "%24apply": options?.queryOptions?.apply,
      "%24skiptoken": options?.queryOptions?.skipToken,
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

export async function _listQueryResultsForResourceGroupLevelPolicyAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyEventsQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyEventsQueryResultsDeserializer(result.body);
}

/** Queries policy events for the resource group level policy assignment. */
export function listQueryResultsForResourceGroupLevelPolicyAssignment(
  context: Client,
  policyEventsResource: PolicyEventsResourceType,
  subscriptionId: string,
  resourceGroupName: string,
  policyAssignmentName: string,
  options: PolicyEventsListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PolicyEvent> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listQueryResultsForResourceGroupLevelPolicyAssignmentSend(
        context,
        policyEventsResource,
        subscriptionId,
        resourceGroupName,
        policyAssignmentName,
        options,
      ),
    _listQueryResultsForResourceGroupLevelPolicyAssignmentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "@odata.nextLink", apiVersion: "2024-10-01" },
  );
}

export function _listQueryResultsForSubscriptionLevelPolicyAssignmentSend(
  context: Client,
  policyEventsResource: PolicyEventsResourceType,
  subscriptionId: string,
  policyAssignmentName: string,
  options: PolicyEventsListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{authorizationNamespace}/policyAssignments/{policyAssignmentName}/providers/Microsoft.PolicyInsights/policyEvents/{policyEventsResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply,%24skiptoken}",
    {
      subscriptionId: subscriptionId,
      policyEventsResource: policyEventsResource,
      authorizationNamespace: "Microsoft.Authorization",
      policyAssignmentName: policyAssignmentName,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24orderby": options?.queryOptions?.orderBy,
      "%24select": options?.queryOptions?.select,
      "%24from": !options?.queryOptions?.from
        ? options?.queryOptions?.from
        : options?.queryOptions?.from.toISOString(),
      "%24to": !options?.queryOptions?.to
        ? options?.queryOptions?.to
        : options?.queryOptions?.to.toISOString(),
      "%24filter": options?.queryOptions?.filter,
      "%24apply": options?.queryOptions?.apply,
      "%24skiptoken": options?.queryOptions?.skipToken,
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

export async function _listQueryResultsForSubscriptionLevelPolicyAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyEventsQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyEventsQueryResultsDeserializer(result.body);
}

/** Queries policy events for the subscription level policy assignment. */
export function listQueryResultsForSubscriptionLevelPolicyAssignment(
  context: Client,
  policyEventsResource: PolicyEventsResourceType,
  subscriptionId: string,
  policyAssignmentName: string,
  options: PolicyEventsListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PolicyEvent> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listQueryResultsForSubscriptionLevelPolicyAssignmentSend(
        context,
        policyEventsResource,
        subscriptionId,
        policyAssignmentName,
        options,
      ),
    _listQueryResultsForSubscriptionLevelPolicyAssignmentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "@odata.nextLink", apiVersion: "2024-10-01" },
  );
}

export function _listQueryResultsForPolicyDefinitionSend(
  context: Client,
  policyEventsResource: PolicyEventsResourceType,
  subscriptionId: string,
  policyDefinitionName: string,
  options: PolicyEventsListQueryResultsForPolicyDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{authorizationNamespace}/policyDefinitions/{policyDefinitionName}/providers/Microsoft.PolicyInsights/policyEvents/{policyEventsResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply,%24skiptoken}",
    {
      subscriptionId: subscriptionId,
      policyEventsResource: policyEventsResource,
      authorizationNamespace: "Microsoft.Authorization",
      policyDefinitionName: policyDefinitionName,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24orderby": options?.queryOptions?.orderBy,
      "%24select": options?.queryOptions?.select,
      "%24from": !options?.queryOptions?.from
        ? options?.queryOptions?.from
        : options?.queryOptions?.from.toISOString(),
      "%24to": !options?.queryOptions?.to
        ? options?.queryOptions?.to
        : options?.queryOptions?.to.toISOString(),
      "%24filter": options?.queryOptions?.filter,
      "%24apply": options?.queryOptions?.apply,
      "%24skiptoken": options?.queryOptions?.skipToken,
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

export async function _listQueryResultsForPolicyDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyEventsQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyEventsQueryResultsDeserializer(result.body);
}

/** Queries policy events for the subscription level policy definition. */
export function listQueryResultsForPolicyDefinition(
  context: Client,
  policyEventsResource: PolicyEventsResourceType,
  subscriptionId: string,
  policyDefinitionName: string,
  options: PolicyEventsListQueryResultsForPolicyDefinitionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyEvent> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listQueryResultsForPolicyDefinitionSend(
        context,
        policyEventsResource,
        subscriptionId,
        policyDefinitionName,
        options,
      ),
    _listQueryResultsForPolicyDefinitionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "@odata.nextLink", apiVersion: "2024-10-01" },
  );
}

export function _listQueryResultsForPolicySetDefinitionSend(
  context: Client,
  policyEventsResource: PolicyEventsResourceType,
  subscriptionId: string,
  policySetDefinitionName: string,
  options: PolicyEventsListQueryResultsForPolicySetDefinitionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{authorizationNamespace}/policySetDefinitions/{policySetDefinitionName}/providers/Microsoft.PolicyInsights/policyEvents/{policyEventsResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply,%24skiptoken}",
    {
      subscriptionId: subscriptionId,
      policyEventsResource: policyEventsResource,
      authorizationNamespace: "Microsoft.Authorization",
      policySetDefinitionName: policySetDefinitionName,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24orderby": options?.queryOptions?.orderBy,
      "%24select": options?.queryOptions?.select,
      "%24from": !options?.queryOptions?.from
        ? options?.queryOptions?.from
        : options?.queryOptions?.from.toISOString(),
      "%24to": !options?.queryOptions?.to
        ? options?.queryOptions?.to
        : options?.queryOptions?.to.toISOString(),
      "%24filter": options?.queryOptions?.filter,
      "%24apply": options?.queryOptions?.apply,
      "%24skiptoken": options?.queryOptions?.skipToken,
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

export async function _listQueryResultsForPolicySetDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyEventsQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyEventsQueryResultsDeserializer(result.body);
}

/** Queries policy events for the subscription level policy set definition. */
export function listQueryResultsForPolicySetDefinition(
  context: Client,
  policyEventsResource: PolicyEventsResourceType,
  subscriptionId: string,
  policySetDefinitionName: string,
  options: PolicyEventsListQueryResultsForPolicySetDefinitionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PolicyEvent> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listQueryResultsForPolicySetDefinitionSend(
        context,
        policyEventsResource,
        subscriptionId,
        policySetDefinitionName,
        options,
      ),
    _listQueryResultsForPolicySetDefinitionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "@odata.nextLink", apiVersion: "2024-10-01" },
  );
}

export function _listQueryResultsForResourceSend(
  context: Client,
  policyEventsResource: PolicyEventsResourceType,
  resourceId: string,
  options: PolicyEventsListQueryResultsForResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.PolicyInsights/policyEvents/{policyEventsResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply,%24expand,%24skiptoken}",
    {
      policyEventsResource: policyEventsResource,
      resourceId: resourceId,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24orderby": options?.queryOptions?.orderBy,
      "%24select": options?.queryOptions?.select,
      "%24from": !options?.queryOptions?.from
        ? options?.queryOptions?.from
        : options?.queryOptions?.from.toISOString(),
      "%24to": !options?.queryOptions?.to
        ? options?.queryOptions?.to
        : options?.queryOptions?.to.toISOString(),
      "%24filter": options?.queryOptions?.filter,
      "%24apply": options?.queryOptions?.apply,
      "%24expand": options?.queryOptions?.expand,
      "%24skiptoken": options?.queryOptions?.skipToken,
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
): Promise<_PolicyEventsQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyEventsQueryResultsDeserializer(result.body);
}

/** Queries policy events for the resource. */
export function listQueryResultsForResource(
  context: Client,
  policyEventsResource: PolicyEventsResourceType,
  resourceId: string,
  options: PolicyEventsListQueryResultsForResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyEvent> {
  return buildPagedAsyncIterator(
    context,
    () => _listQueryResultsForResourceSend(context, policyEventsResource, resourceId, options),
    _listQueryResultsForResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "@odata.nextLink", apiVersion: "2024-10-01" },
  );
}

export function _listQueryResultsForResourceGroupSend(
  context: Client,
  policyEventsResource: PolicyEventsResourceType,
  subscriptionId: string,
  resourceGroupName: string,
  options: PolicyEventsListQueryResultsForResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/policyEvents/{policyEventsResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply,%24skiptoken}",
    {
      subscriptionId: subscriptionId,
      resourceGroupName: resourceGroupName,
      policyEventsResource: policyEventsResource,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24orderby": options?.queryOptions?.orderBy,
      "%24select": options?.queryOptions?.select,
      "%24from": !options?.queryOptions?.from
        ? options?.queryOptions?.from
        : options?.queryOptions?.from.toISOString(),
      "%24to": !options?.queryOptions?.to
        ? options?.queryOptions?.to
        : options?.queryOptions?.to.toISOString(),
      "%24filter": options?.queryOptions?.filter,
      "%24apply": options?.queryOptions?.apply,
      "%24skiptoken": options?.queryOptions?.skipToken,
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
): Promise<_PolicyEventsQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyEventsQueryResultsDeserializer(result.body);
}

/** Queries policy events for the resources under the resource group. */
export function listQueryResultsForResourceGroup(
  context: Client,
  policyEventsResource: PolicyEventsResourceType,
  subscriptionId: string,
  resourceGroupName: string,
  options: PolicyEventsListQueryResultsForResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyEvent> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listQueryResultsForResourceGroupSend(
        context,
        policyEventsResource,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _listQueryResultsForResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "@odata.nextLink", apiVersion: "2024-10-01" },
  );
}

export function _listQueryResultsForSubscriptionSend(
  context: Client,
  policyEventsResource: PolicyEventsResourceType,
  subscriptionId: string,
  options: PolicyEventsListQueryResultsForSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/policyEvents/{policyEventsResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply,%24skiptoken}",
    {
      subscriptionId: subscriptionId,
      policyEventsResource: policyEventsResource,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24orderby": options?.queryOptions?.orderBy,
      "%24select": options?.queryOptions?.select,
      "%24from": !options?.queryOptions?.from
        ? options?.queryOptions?.from
        : options?.queryOptions?.from.toISOString(),
      "%24to": !options?.queryOptions?.to
        ? options?.queryOptions?.to
        : options?.queryOptions?.to.toISOString(),
      "%24filter": options?.queryOptions?.filter,
      "%24apply": options?.queryOptions?.apply,
      "%24skiptoken": options?.queryOptions?.skipToken,
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
): Promise<_PolicyEventsQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyEventsQueryResultsDeserializer(result.body);
}

/** Queries policy events for the resources under the subscription. */
export function listQueryResultsForSubscription(
  context: Client,
  policyEventsResource: PolicyEventsResourceType,
  subscriptionId: string,
  options: PolicyEventsListQueryResultsForSubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyEvent> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listQueryResultsForSubscriptionSend(context, policyEventsResource, subscriptionId, options),
    _listQueryResultsForSubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "@odata.nextLink", apiVersion: "2024-10-01" },
  );
}

export function _listQueryResultsForManagementGroupSend(
  context: Client,
  policyEventsResource: PolicyEventsResourceType,
  managementGroupName: string,
  options: PolicyEventsListQueryResultsForManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/{managementGroupsNamespace}/managementGroups/{managementGroupName}/providers/Microsoft.PolicyInsights/policyEvents/{policyEventsResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply,%24skiptoken}",
    {
      policyEventsResource: policyEventsResource,
      managementGroupsNamespace: "Microsoft.Management",
      managementGroupName: managementGroupName,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24orderby": options?.queryOptions?.orderBy,
      "%24select": options?.queryOptions?.select,
      "%24from": !options?.queryOptions?.from
        ? options?.queryOptions?.from
        : options?.queryOptions?.from.toISOString(),
      "%24to": !options?.queryOptions?.to
        ? options?.queryOptions?.to
        : options?.queryOptions?.to.toISOString(),
      "%24filter": options?.queryOptions?.filter,
      "%24apply": options?.queryOptions?.apply,
      "%24skiptoken": options?.queryOptions?.skipToken,
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
): Promise<_PolicyEventsQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyEventsQueryResultsDeserializer(result.body);
}

/** Queries policy events for the resources under the management group. */
export function listQueryResultsForManagementGroup(
  context: Client,
  policyEventsResource: PolicyEventsResourceType,
  managementGroupName: string,
  options: PolicyEventsListQueryResultsForManagementGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyEvent> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listQueryResultsForManagementGroupSend(
        context,
        policyEventsResource,
        managementGroupName,
        options,
      ),
    _listQueryResultsForManagementGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "@odata.nextLink", apiVersion: "2024-10-01" },
  );
}
