// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext as Client } from "../index.js";
import type {
  _PolicyStatesQueryResults,
  PolicyState,
  SummarizeResults,
  PolicyStatesResource,
  PolicyStatesSummaryResourceType,
} from "../../models/policyInsightsApi/models.js";
import {
  _policyStatesQueryResultsDeserializer,
  summarizeResultsDeserializer,
} from "../../models/policyInsightsApi/models.js";
import { queryFailureDeserializer } from "../../models/policyInsightsCommon/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentOptionalParams,
  PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
  PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentOptionalParams,
  PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
  PolicyStatesSummarizeForPolicyDefinitionOptionalParams,
  PolicyStatesListQueryResultsForPolicyDefinitionOptionalParams,
  PolicyStatesSummarizeForPolicySetDefinitionOptionalParams,
  PolicyStatesListQueryResultsForPolicySetDefinitionOptionalParams,
  PolicyStatesTriggerResourceGroupEvaluationOptionalParams,
  PolicyStatesTriggerSubscriptionEvaluationOptionalParams,
  PolicyStatesSummarizeForResourceOptionalParams,
  PolicyStatesListQueryResultsForResourceOptionalParams,
  PolicyStatesSummarizeForResourceGroupOptionalParams,
  PolicyStatesListQueryResultsForResourceGroupOptionalParams,
  PolicyStatesSummarizeForSubscriptionOptionalParams,
  PolicyStatesListQueryResultsForSubscriptionOptionalParams,
  PolicyStatesSummarizeForManagementGroupOptionalParams,
  PolicyStatesListQueryResultsForManagementGroupOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _summarizeForResourceGroupLevelPolicyAssignmentSend(
  context: Client,
  policyStatesSummaryResource: PolicyStatesSummaryResourceType,
  subscriptionId: string,
  resourceGroupName: string,
  policyAssignmentName: string,
  options: PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{authorizationNamespace}/policyAssignments/{policyAssignmentName}/providers/Microsoft.PolicyInsights/policyStates/{policyStatesSummaryResource}/summarize{?api%2Dversion,%24top,%24from,%24to,%24filter}",
    {
      subscriptionId: subscriptionId,
      resourceGroupName: resourceGroupName,
      policyStatesSummaryResource: policyStatesSummaryResource,
      authorizationNamespace: "Microsoft.Authorization",
      policyAssignmentName: policyAssignmentName,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24from": !options?.queryOptions?.from
        ? options?.queryOptions?.from
        : options?.queryOptions?.from.toISOString(),
      "%24to": !options?.queryOptions?.to
        ? options?.queryOptions?.to
        : options?.queryOptions?.to.toISOString(),
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

export async function _summarizeForResourceGroupLevelPolicyAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<SummarizeResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return summarizeResultsDeserializer(result.body);
}

/** Summarizes policy states for the resource group level policy assignment. */
export async function summarizeForResourceGroupLevelPolicyAssignment(
  context: Client,
  policyStatesSummaryResource: PolicyStatesSummaryResourceType,
  subscriptionId: string,
  resourceGroupName: string,
  policyAssignmentName: string,
  options: PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentOptionalParams = {
    requestOptions: {},
  },
): Promise<SummarizeResults> {
  const result = await _summarizeForResourceGroupLevelPolicyAssignmentSend(
    context,
    policyStatesSummaryResource,
    subscriptionId,
    resourceGroupName,
    policyAssignmentName,
    options,
  );
  return _summarizeForResourceGroupLevelPolicyAssignmentDeserialize(result);
}

export function _listQueryResultsForResourceGroupLevelPolicyAssignmentSend(
  context: Client,
  policyStatesResource: PolicyStatesResource,
  subscriptionId: string,
  resourceGroupName: string,
  policyAssignmentName: string,
  options: PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{authorizationNamespace}/policyAssignments/{policyAssignmentName}/providers/Microsoft.PolicyInsights/policyStates/{policyStatesResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply,%24skiptoken}",
    {
      subscriptionId: subscriptionId,
      resourceGroupName: resourceGroupName,
      policyStatesResource: policyStatesResource,
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
): Promise<_PolicyStatesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyStatesQueryResultsDeserializer(result.body);
}

/** Queries policy states for the resource group level policy assignment. */
export function listQueryResultsForResourceGroupLevelPolicyAssignment(
  context: Client,
  policyStatesResource: PolicyStatesResource,
  subscriptionId: string,
  resourceGroupName: string,
  policyAssignmentName: string,
  options: PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PolicyState> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listQueryResultsForResourceGroupLevelPolicyAssignmentSend(
        context,
        policyStatesResource,
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

export function _summarizeForSubscriptionLevelPolicyAssignmentSend(
  context: Client,
  policyStatesSummaryResource: PolicyStatesSummaryResourceType,
  subscriptionId: string,
  policyAssignmentName: string,
  options: PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{authorizationNamespace}/policyAssignments/{policyAssignmentName}/providers/Microsoft.PolicyInsights/policyStates/{policyStatesSummaryResource}/summarize{?api%2Dversion,%24top,%24from,%24to,%24filter}",
    {
      subscriptionId: subscriptionId,
      policyStatesSummaryResource: policyStatesSummaryResource,
      authorizationNamespace: "Microsoft.Authorization",
      policyAssignmentName: policyAssignmentName,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24from": !options?.queryOptions?.from
        ? options?.queryOptions?.from
        : options?.queryOptions?.from.toISOString(),
      "%24to": !options?.queryOptions?.to
        ? options?.queryOptions?.to
        : options?.queryOptions?.to.toISOString(),
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

export async function _summarizeForSubscriptionLevelPolicyAssignmentDeserialize(
  result: PathUncheckedResponse,
): Promise<SummarizeResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return summarizeResultsDeserializer(result.body);
}

/** Summarizes policy states for the subscription level policy assignment. */
export async function summarizeForSubscriptionLevelPolicyAssignment(
  context: Client,
  policyStatesSummaryResource: PolicyStatesSummaryResourceType,
  subscriptionId: string,
  policyAssignmentName: string,
  options: PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentOptionalParams = {
    requestOptions: {},
  },
): Promise<SummarizeResults> {
  const result = await _summarizeForSubscriptionLevelPolicyAssignmentSend(
    context,
    policyStatesSummaryResource,
    subscriptionId,
    policyAssignmentName,
    options,
  );
  return _summarizeForSubscriptionLevelPolicyAssignmentDeserialize(result);
}

export function _listQueryResultsForSubscriptionLevelPolicyAssignmentSend(
  context: Client,
  policyStatesResource: PolicyStatesResource,
  subscriptionId: string,
  policyAssignmentName: string,
  options: PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{authorizationNamespace}/policyAssignments/{policyAssignmentName}/providers/Microsoft.PolicyInsights/policyStates/{policyStatesResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply,%24skiptoken}",
    {
      subscriptionId: subscriptionId,
      policyStatesResource: policyStatesResource,
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
): Promise<_PolicyStatesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyStatesQueryResultsDeserializer(result.body);
}

/** Queries policy states for the subscription level policy assignment. */
export function listQueryResultsForSubscriptionLevelPolicyAssignment(
  context: Client,
  policyStatesResource: PolicyStatesResource,
  subscriptionId: string,
  policyAssignmentName: string,
  options: PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PolicyState> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listQueryResultsForSubscriptionLevelPolicyAssignmentSend(
        context,
        policyStatesResource,
        subscriptionId,
        policyAssignmentName,
        options,
      ),
    _listQueryResultsForSubscriptionLevelPolicyAssignmentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "@odata.nextLink", apiVersion: "2024-10-01" },
  );
}

export function _summarizeForPolicyDefinitionSend(
  context: Client,
  policyStatesSummaryResource: PolicyStatesSummaryResourceType,
  subscriptionId: string,
  policyDefinitionName: string,
  options: PolicyStatesSummarizeForPolicyDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{authorizationNamespace}/policyDefinitions/{policyDefinitionName}/providers/Microsoft.PolicyInsights/policyStates/{policyStatesSummaryResource}/summarize{?api%2Dversion,%24top,%24from,%24to,%24filter}",
    {
      subscriptionId: subscriptionId,
      policyStatesSummaryResource: policyStatesSummaryResource,
      authorizationNamespace: "Microsoft.Authorization",
      policyDefinitionName: policyDefinitionName,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24from": !options?.queryOptions?.from
        ? options?.queryOptions?.from
        : options?.queryOptions?.from.toISOString(),
      "%24to": !options?.queryOptions?.to
        ? options?.queryOptions?.to
        : options?.queryOptions?.to.toISOString(),
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

export async function _summarizeForPolicyDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<SummarizeResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return summarizeResultsDeserializer(result.body);
}

/** Summarizes policy states for the subscription level policy definition. */
export async function summarizeForPolicyDefinition(
  context: Client,
  policyStatesSummaryResource: PolicyStatesSummaryResourceType,
  subscriptionId: string,
  policyDefinitionName: string,
  options: PolicyStatesSummarizeForPolicyDefinitionOptionalParams = { requestOptions: {} },
): Promise<SummarizeResults> {
  const result = await _summarizeForPolicyDefinitionSend(
    context,
    policyStatesSummaryResource,
    subscriptionId,
    policyDefinitionName,
    options,
  );
  return _summarizeForPolicyDefinitionDeserialize(result);
}

export function _listQueryResultsForPolicyDefinitionSend(
  context: Client,
  policyStatesResource: PolicyStatesResource,
  subscriptionId: string,
  policyDefinitionName: string,
  options: PolicyStatesListQueryResultsForPolicyDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{authorizationNamespace}/policyDefinitions/{policyDefinitionName}/providers/Microsoft.PolicyInsights/policyStates/{policyStatesResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply,%24skiptoken}",
    {
      subscriptionId: subscriptionId,
      policyStatesResource: policyStatesResource,
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
): Promise<_PolicyStatesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyStatesQueryResultsDeserializer(result.body);
}

/** Queries policy states for the subscription level policy definition. */
export function listQueryResultsForPolicyDefinition(
  context: Client,
  policyStatesResource: PolicyStatesResource,
  subscriptionId: string,
  policyDefinitionName: string,
  options: PolicyStatesListQueryResultsForPolicyDefinitionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyState> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listQueryResultsForPolicyDefinitionSend(
        context,
        policyStatesResource,
        subscriptionId,
        policyDefinitionName,
        options,
      ),
    _listQueryResultsForPolicyDefinitionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "@odata.nextLink", apiVersion: "2024-10-01" },
  );
}

export function _summarizeForPolicySetDefinitionSend(
  context: Client,
  policyStatesSummaryResource: PolicyStatesSummaryResourceType,
  subscriptionId: string,
  policySetDefinitionName: string,
  options: PolicyStatesSummarizeForPolicySetDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{authorizationNamespace}/policySetDefinitions/{policySetDefinitionName}/providers/Microsoft.PolicyInsights/policyStates/{policyStatesSummaryResource}/summarize{?api%2Dversion,%24top,%24from,%24to,%24filter}",
    {
      subscriptionId: subscriptionId,
      policyStatesSummaryResource: policyStatesSummaryResource,
      authorizationNamespace: "Microsoft.Authorization",
      policySetDefinitionName: policySetDefinitionName,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24from": !options?.queryOptions?.from
        ? options?.queryOptions?.from
        : options?.queryOptions?.from.toISOString(),
      "%24to": !options?.queryOptions?.to
        ? options?.queryOptions?.to
        : options?.queryOptions?.to.toISOString(),
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

export async function _summarizeForPolicySetDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<SummarizeResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return summarizeResultsDeserializer(result.body);
}

/** Summarizes policy states for the subscription level policy set definition. */
export async function summarizeForPolicySetDefinition(
  context: Client,
  policyStatesSummaryResource: PolicyStatesSummaryResourceType,
  subscriptionId: string,
  policySetDefinitionName: string,
  options: PolicyStatesSummarizeForPolicySetDefinitionOptionalParams = { requestOptions: {} },
): Promise<SummarizeResults> {
  const result = await _summarizeForPolicySetDefinitionSend(
    context,
    policyStatesSummaryResource,
    subscriptionId,
    policySetDefinitionName,
    options,
  );
  return _summarizeForPolicySetDefinitionDeserialize(result);
}

export function _listQueryResultsForPolicySetDefinitionSend(
  context: Client,
  policyStatesResource: PolicyStatesResource,
  subscriptionId: string,
  policySetDefinitionName: string,
  options: PolicyStatesListQueryResultsForPolicySetDefinitionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/{authorizationNamespace}/policySetDefinitions/{policySetDefinitionName}/providers/Microsoft.PolicyInsights/policyStates/{policyStatesResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply,%24skiptoken}",
    {
      subscriptionId: subscriptionId,
      policyStatesResource: policyStatesResource,
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
): Promise<_PolicyStatesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyStatesQueryResultsDeserializer(result.body);
}

/** Queries policy states for the subscription level policy set definition. */
export function listQueryResultsForPolicySetDefinition(
  context: Client,
  policyStatesResource: PolicyStatesResource,
  subscriptionId: string,
  policySetDefinitionName: string,
  options: PolicyStatesListQueryResultsForPolicySetDefinitionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PolicyState> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listQueryResultsForPolicySetDefinitionSend(
        context,
        policyStatesResource,
        subscriptionId,
        policySetDefinitionName,
        options,
      ),
    _listQueryResultsForPolicySetDefinitionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "@odata.nextLink", apiVersion: "2024-10-01" },
  );
}

export function _triggerResourceGroupEvaluationSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: PolicyStatesTriggerResourceGroupEvaluationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/policyStates/latest/triggerEvaluation{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2024-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _triggerResourceGroupEvaluationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Triggers a policy evaluation scan for all the resources under the resource group. */
export function triggerResourceGroupEvaluation(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: PolicyStatesTriggerResourceGroupEvaluationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _triggerResourceGroupEvaluationDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _triggerResourceGroupEvaluationSend(context, subscriptionId, resourceGroupName, options),
      resourceLocationConfig: "location",
      apiVersion: "2024-10-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _triggerSubscriptionEvaluationSend(
  context: Client,
  subscriptionId: string,
  options: PolicyStatesTriggerSubscriptionEvaluationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/policyStates/latest/triggerEvaluation{?api%2Dversion}",
    {
      subscriptionId: subscriptionId,
      "api%2Dversion": "2024-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _triggerSubscriptionEvaluationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Triggers a policy evaluation scan for all the resources under the subscription */
export function triggerSubscriptionEvaluation(
  context: Client,
  subscriptionId: string,
  options: PolicyStatesTriggerSubscriptionEvaluationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _triggerSubscriptionEvaluationDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _triggerSubscriptionEvaluationSend(context, subscriptionId, options),
      resourceLocationConfig: "location",
      apiVersion: "2024-10-01",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _summarizeForResourceSend(
  context: Client,
  policyStatesSummaryResource: PolicyStatesSummaryResourceType,
  resourceId: string,
  options: PolicyStatesSummarizeForResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.PolicyInsights/policyStates/{policyStatesSummaryResource}/summarize{?api%2Dversion,%24top,%24from,%24to,%24filter}",
    {
      policyStatesSummaryResource: policyStatesSummaryResource,
      resourceId: resourceId,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24from": !options?.queryOptions?.from
        ? options?.queryOptions?.from
        : options?.queryOptions?.from.toISOString(),
      "%24to": !options?.queryOptions?.to
        ? options?.queryOptions?.to
        : options?.queryOptions?.to.toISOString(),
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

export async function _summarizeForResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<SummarizeResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return summarizeResultsDeserializer(result.body);
}

/** Summarizes policy states for the resource. */
export async function summarizeForResource(
  context: Client,
  policyStatesSummaryResource: PolicyStatesSummaryResourceType,
  resourceId: string,
  options: PolicyStatesSummarizeForResourceOptionalParams = { requestOptions: {} },
): Promise<SummarizeResults> {
  const result = await _summarizeForResourceSend(
    context,
    policyStatesSummaryResource,
    resourceId,
    options,
  );
  return _summarizeForResourceDeserialize(result);
}

export function _listQueryResultsForResourceSend(
  context: Client,
  policyStatesResource: PolicyStatesResource,
  resourceId: string,
  options: PolicyStatesListQueryResultsForResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.PolicyInsights/policyStates/{policyStatesResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply,%24expand,%24skiptoken}",
    {
      policyStatesResource: policyStatesResource,
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
): Promise<_PolicyStatesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyStatesQueryResultsDeserializer(result.body);
}

/** Queries policy states for the resource. */
export function listQueryResultsForResource(
  context: Client,
  policyStatesResource: PolicyStatesResource,
  resourceId: string,
  options: PolicyStatesListQueryResultsForResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyState> {
  return buildPagedAsyncIterator(
    context,
    () => _listQueryResultsForResourceSend(context, policyStatesResource, resourceId, options),
    _listQueryResultsForResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "@odata.nextLink", apiVersion: "2024-10-01" },
  );
}

export function _summarizeForResourceGroupSend(
  context: Client,
  policyStatesSummaryResource: PolicyStatesSummaryResourceType,
  subscriptionId: string,
  resourceGroupName: string,
  options: PolicyStatesSummarizeForResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/policyStates/{policyStatesSummaryResource}/summarize{?api%2Dversion,%24top,%24from,%24to,%24filter}",
    {
      subscriptionId: subscriptionId,
      resourceGroupName: resourceGroupName,
      policyStatesSummaryResource: policyStatesSummaryResource,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24from": !options?.queryOptions?.from
        ? options?.queryOptions?.from
        : options?.queryOptions?.from.toISOString(),
      "%24to": !options?.queryOptions?.to
        ? options?.queryOptions?.to
        : options?.queryOptions?.to.toISOString(),
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

export async function _summarizeForResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<SummarizeResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return summarizeResultsDeserializer(result.body);
}

/** Summarizes policy states for the resources under the resource group. */
export async function summarizeForResourceGroup(
  context: Client,
  policyStatesSummaryResource: PolicyStatesSummaryResourceType,
  subscriptionId: string,
  resourceGroupName: string,
  options: PolicyStatesSummarizeForResourceGroupOptionalParams = { requestOptions: {} },
): Promise<SummarizeResults> {
  const result = await _summarizeForResourceGroupSend(
    context,
    policyStatesSummaryResource,
    subscriptionId,
    resourceGroupName,
    options,
  );
  return _summarizeForResourceGroupDeserialize(result);
}

export function _listQueryResultsForResourceGroupSend(
  context: Client,
  policyStatesResource: PolicyStatesResource,
  subscriptionId: string,
  resourceGroupName: string,
  options: PolicyStatesListQueryResultsForResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/policyStates/{policyStatesResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply,%24skiptoken}",
    {
      subscriptionId: subscriptionId,
      resourceGroupName: resourceGroupName,
      policyStatesResource: policyStatesResource,
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
): Promise<_PolicyStatesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyStatesQueryResultsDeserializer(result.body);
}

/** Queries policy states for the resources under the resource group. */
export function listQueryResultsForResourceGroup(
  context: Client,
  policyStatesResource: PolicyStatesResource,
  subscriptionId: string,
  resourceGroupName: string,
  options: PolicyStatesListQueryResultsForResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyState> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listQueryResultsForResourceGroupSend(
        context,
        policyStatesResource,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _listQueryResultsForResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "@odata.nextLink", apiVersion: "2024-10-01" },
  );
}

export function _summarizeForSubscriptionSend(
  context: Client,
  policyStatesSummaryResource: PolicyStatesSummaryResourceType,
  subscriptionId: string,
  options: PolicyStatesSummarizeForSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/policyStates/{policyStatesSummaryResource}/summarize{?api%2Dversion,%24top,%24from,%24to,%24filter}",
    {
      subscriptionId: subscriptionId,
      policyStatesSummaryResource: policyStatesSummaryResource,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24from": !options?.queryOptions?.from
        ? options?.queryOptions?.from
        : options?.queryOptions?.from.toISOString(),
      "%24to": !options?.queryOptions?.to
        ? options?.queryOptions?.to
        : options?.queryOptions?.to.toISOString(),
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

export async function _summarizeForSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<SummarizeResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return summarizeResultsDeserializer(result.body);
}

/** Summarizes policy states for the resources under the subscription. */
export async function summarizeForSubscription(
  context: Client,
  policyStatesSummaryResource: PolicyStatesSummaryResourceType,
  subscriptionId: string,
  options: PolicyStatesSummarizeForSubscriptionOptionalParams = { requestOptions: {} },
): Promise<SummarizeResults> {
  const result = await _summarizeForSubscriptionSend(
    context,
    policyStatesSummaryResource,
    subscriptionId,
    options,
  );
  return _summarizeForSubscriptionDeserialize(result);
}

export function _listQueryResultsForSubscriptionSend(
  context: Client,
  policyStatesResource: PolicyStatesResource,
  subscriptionId: string,
  options: PolicyStatesListQueryResultsForSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/policyStates/{policyStatesResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply,%24skiptoken}",
    {
      subscriptionId: subscriptionId,
      policyStatesResource: policyStatesResource,
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
): Promise<_PolicyStatesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyStatesQueryResultsDeserializer(result.body);
}

/** Queries policy states for the resources under the subscription. */
export function listQueryResultsForSubscription(
  context: Client,
  policyStatesResource: PolicyStatesResource,
  subscriptionId: string,
  options: PolicyStatesListQueryResultsForSubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyState> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listQueryResultsForSubscriptionSend(context, policyStatesResource, subscriptionId, options),
    _listQueryResultsForSubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "@odata.nextLink", apiVersion: "2024-10-01" },
  );
}

export function _summarizeForManagementGroupSend(
  context: Client,
  policyStatesSummaryResource: PolicyStatesSummaryResourceType,
  managementGroupName: string,
  options: PolicyStatesSummarizeForManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/{managementGroupsNamespace}/managementGroups/{managementGroupName}/providers/Microsoft.PolicyInsights/policyStates/{policyStatesSummaryResource}/summarize{?api%2Dversion,%24top,%24from,%24to,%24filter}",
    {
      policyStatesSummaryResource: policyStatesSummaryResource,
      managementGroupsNamespace: "Microsoft.Management",
      managementGroupName: managementGroupName,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24from": !options?.queryOptions?.from
        ? options?.queryOptions?.from
        : options?.queryOptions?.from.toISOString(),
      "%24to": !options?.queryOptions?.to
        ? options?.queryOptions?.to
        : options?.queryOptions?.to.toISOString(),
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

export async function _summarizeForManagementGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<SummarizeResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return summarizeResultsDeserializer(result.body);
}

/** Summarizes policy states for the resources under the management group. */
export async function summarizeForManagementGroup(
  context: Client,
  policyStatesSummaryResource: PolicyStatesSummaryResourceType,
  managementGroupName: string,
  options: PolicyStatesSummarizeForManagementGroupOptionalParams = { requestOptions: {} },
): Promise<SummarizeResults> {
  const result = await _summarizeForManagementGroupSend(
    context,
    policyStatesSummaryResource,
    managementGroupName,
    options,
  );
  return _summarizeForManagementGroupDeserialize(result);
}

export function _listQueryResultsForManagementGroupSend(
  context: Client,
  policyStatesResource: PolicyStatesResource,
  managementGroupName: string,
  options: PolicyStatesListQueryResultsForManagementGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/{managementGroupsNamespace}/managementGroups/{managementGroupName}/providers/Microsoft.PolicyInsights/policyStates/{policyStatesResource}/queryResults{?api%2Dversion,%24top,%24orderby,%24select,%24from,%24to,%24filter,%24apply,%24skiptoken}",
    {
      policyStatesResource: policyStatesResource,
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
): Promise<_PolicyStatesQueryResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = queryFailureDeserializer(result.body);
    }

    throw error;
  }

  return _policyStatesQueryResultsDeserializer(result.body);
}

/** Queries policy states for the resources under the management group. */
export function listQueryResultsForManagementGroup(
  context: Client,
  policyStatesResource: PolicyStatesResource,
  managementGroupName: string,
  options: PolicyStatesListQueryResultsForManagementGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyState> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listQueryResultsForManagementGroupSend(
        context,
        policyStatesResource,
        managementGroupName,
        options,
      ),
    _listQueryResultsForManagementGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "@odata.nextLink", apiVersion: "2024-10-01" },
  );
}
