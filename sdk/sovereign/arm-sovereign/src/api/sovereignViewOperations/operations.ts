// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SovereignContext as Client } from "../index.js";
import type {
  SovereignViewResource,
  SovereignViewResourcePatch,
  _SovereignViewResourceListResult,
  SovereignViewComplianceSummaryResult,
  SovereignViewComplianceDetailsContent,
  SovereignViewComplianceDetailsResult,
  SovereignViewFilterValuesContent,
  SovereignViewFilterValuesResult,
  SovereignViewOperationalStatusContent,
  SovereignViewOperationalStatusResult,
  SovereignViewComplianceResourceDetailsContent,
  SovereignViewComplianceResourceDetailsResult,
  SovereignViewRemediateContent,
  SovereignViewRemediateResult,
  SovereignViewRemediationResultContent,
  SovereignViewRemediationResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  sovereignViewResourceSerializer,
  sovereignViewResourceDeserializer,
  sovereignViewResourcePatchSerializer,
  _sovereignViewResourceListResultDeserializer,
  sovereignViewComplianceSummaryResultDeserializer,
  sovereignViewComplianceDetailsContentSerializer,
  sovereignViewComplianceDetailsResultDeserializer,
  sovereignViewFilterValuesContentSerializer,
  sovereignViewFilterValuesResultDeserializer,
  sovereignViewOperationalStatusContentSerializer,
  sovereignViewOperationalStatusResultDeserializer,
  sovereignViewComplianceResourceDetailsContentSerializer,
  sovereignViewComplianceResourceDetailsResultDeserializer,
  sovereignViewRemediateContentSerializer,
  sovereignViewRemediateResultDeserializer,
  sovereignViewRemediationResultContentSerializer,
  sovereignViewRemediationResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SovereignViewOperationsRemediationResultOptionalParams,
  SovereignViewOperationsRemediateOptionalParams,
  SovereignViewOperationsComplianceResourceDetailsOptionalParams,
  SovereignViewOperationsOperationalStatusOptionalParams,
  SovereignViewOperationsFilterValuesOptionalParams,
  SovereignViewOperationsComplianceDetailsOptionalParams,
  SovereignViewOperationsComplianceSummaryOptionalParams,
  SovereignViewOperationsListBySubscriptionOptionalParams,
  SovereignViewOperationsListByResourceGroupOptionalParams,
  SovereignViewOperationsDeleteOptionalParams,
  SovereignViewOperationsUpdateOptionalParams,
  SovereignViewOperationsCreateOptionalParams,
  SovereignViewOperationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _remediationResultSend(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  body: SovereignViewRemediationResultContent,
  options: SovereignViewOperationsRemediationResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/sovereignViews/{sovereignViewName}/remediationResult{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sovereignViewName: sovereignViewName,
      "api%2Dversion": context.apiVersion ?? "2026-10-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sovereignViewRemediationResultContentSerializer(body),
  });
}

export async function _remediationResultDeserialize(
  result: PathUncheckedResponse,
): Promise<SovereignViewRemediationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sovereignViewRemediationResultDeserializer(result.body);
}

/** Fetches the result of a previously triggered remediation. */
export async function remediationResult(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  body: SovereignViewRemediationResultContent,
  options: SovereignViewOperationsRemediationResultOptionalParams = { requestOptions: {} },
): Promise<SovereignViewRemediationResult> {
  const result = await _remediationResultSend(
    context,
    resourceGroupName,
    sovereignViewName,
    body,
    options,
  );
  return _remediationResultDeserialize(result);
}

export function _remediateSend(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  body: SovereignViewRemediateContent,
  options: SovereignViewOperationsRemediateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/sovereignViews/{sovereignViewName}/remediate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sovereignViewName: sovereignViewName,
      "api%2Dversion": context.apiVersion ?? "2026-10-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sovereignViewRemediateContentSerializer(body),
  });
}

export async function _remediateDeserialize(
  result: PathUncheckedResponse,
): Promise<SovereignViewRemediateResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sovereignViewRemediateResultDeserializer(result.body);
}

/** Remediates the Sovereign View resource for the given Azure Resource Manager resource IDs. */
export function remediate(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  body: SovereignViewRemediateContent,
  options: SovereignViewOperationsRemediateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SovereignViewRemediateResult>, SovereignViewRemediateResult> {
  return getLongRunningPoller(context, _remediateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _remediateSend(context, resourceGroupName, sovereignViewName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-31-preview",
  }) as PollerLike<OperationState<SovereignViewRemediateResult>, SovereignViewRemediateResult>;
}

export function _complianceResourceDetailsSend(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  body: SovereignViewComplianceResourceDetailsContent,
  options: SovereignViewOperationsComplianceResourceDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/sovereignViews/{sovereignViewName}/complianceResourceDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sovereignViewName: sovereignViewName,
      "api%2Dversion": context.apiVersion ?? "2026-10-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sovereignViewComplianceResourceDetailsContentSerializer(body),
  });
}

export async function _complianceResourceDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<SovereignViewComplianceResourceDetailsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sovereignViewComplianceResourceDetailsResultDeserializer(result.body);
}

/** Gets the compliance reasoning for given resource and dimension, including the reasoning for its linked and replica resources. */
export async function complianceResourceDetails(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  body: SovereignViewComplianceResourceDetailsContent,
  options: SovereignViewOperationsComplianceResourceDetailsOptionalParams = { requestOptions: {} },
): Promise<SovereignViewComplianceResourceDetailsResult> {
  const result = await _complianceResourceDetailsSend(
    context,
    resourceGroupName,
    sovereignViewName,
    body,
    options,
  );
  return _complianceResourceDetailsDeserialize(result);
}

export function _operationalStatusSend(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  body: SovereignViewOperationalStatusContent,
  options: SovereignViewOperationsOperationalStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/sovereignViews/{sovereignViewName}/operationalStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sovereignViewName: sovereignViewName,
      "api%2Dversion": context.apiVersion ?? "2026-10-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sovereignViewOperationalStatusContentSerializer(body),
  });
}

export async function _operationalStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<SovereignViewOperationalStatusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sovereignViewOperationalStatusResultDeserializer(result.body);
}

/** Gets the operational status for the Sovereign View resource. */
export async function operationalStatus(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  body: SovereignViewOperationalStatusContent,
  options: SovereignViewOperationsOperationalStatusOptionalParams = { requestOptions: {} },
): Promise<SovereignViewOperationalStatusResult> {
  const result = await _operationalStatusSend(
    context,
    resourceGroupName,
    sovereignViewName,
    body,
    options,
  );
  return _operationalStatusDeserialize(result);
}

export function _filterValuesSend(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  body: SovereignViewFilterValuesContent,
  options: SovereignViewOperationsFilterValuesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/sovereignViews/{sovereignViewName}/filterValues{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sovereignViewName: sovereignViewName,
      "api%2Dversion": context.apiVersion ?? "2026-10-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sovereignViewFilterValuesContentSerializer(body),
  });
}

export async function _filterValuesDeserialize(
  result: PathUncheckedResponse,
): Promise<SovereignViewFilterValuesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sovereignViewFilterValuesResultDeserializer(result.body);
}

/** Gets filter values for the Sovereign View resource. */
export async function filterValues(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  body: SovereignViewFilterValuesContent,
  options: SovereignViewOperationsFilterValuesOptionalParams = { requestOptions: {} },
): Promise<SovereignViewFilterValuesResult> {
  const result = await _filterValuesSend(
    context,
    resourceGroupName,
    sovereignViewName,
    body,
    options,
  );
  return _filterValuesDeserialize(result);
}

export function _complianceDetailsSend(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  body: SovereignViewComplianceDetailsContent,
  options: SovereignViewOperationsComplianceDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/sovereignViews/{sovereignViewName}/complianceDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sovereignViewName: sovereignViewName,
      "api%2Dversion": context.apiVersion ?? "2026-10-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sovereignViewComplianceDetailsContentSerializer(body),
  });
}

export async function _complianceDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<SovereignViewComplianceDetailsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sovereignViewComplianceDetailsResultDeserializer(result.body);
}

/** Gets compliance details for the Sovereign View resource. */
export async function complianceDetails(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  body: SovereignViewComplianceDetailsContent,
  options: SovereignViewOperationsComplianceDetailsOptionalParams = { requestOptions: {} },
): Promise<SovereignViewComplianceDetailsResult> {
  const result = await _complianceDetailsSend(
    context,
    resourceGroupName,
    sovereignViewName,
    body,
    options,
  );
  return _complianceDetailsDeserialize(result);
}

export function _complianceSummarySend(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  options: SovereignViewOperationsComplianceSummaryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/sovereignViews/{sovereignViewName}/complianceSummary{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sovereignViewName: sovereignViewName,
      "api%2Dversion": context.apiVersion ?? "2026-10-31-preview",
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

export async function _complianceSummaryDeserialize(
  result: PathUncheckedResponse,
): Promise<SovereignViewComplianceSummaryResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sovereignViewComplianceSummaryResultDeserializer(result.body);
}

/** Gets the compliance summary for the Sovereign View resource. */
export async function complianceSummary(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  options: SovereignViewOperationsComplianceSummaryOptionalParams = { requestOptions: {} },
): Promise<SovereignViewComplianceSummaryResult> {
  const result = await _complianceSummarySend(
    context,
    resourceGroupName,
    sovereignViewName,
    options,
  );
  return _complianceSummaryDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: SovereignViewOperationsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sovereign/sovereignViews{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-10-31-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SovereignViewResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sovereignViewResourceListResultDeserializer(result.body);
}

/** Lists the Sovereign View resources within a subscription. */
export function listBySubscription(
  context: Client,
  options: SovereignViewOperationsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SovereignViewResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-31-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: SovereignViewOperationsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/sovereignViews{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-10-31-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SovereignViewResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sovereignViewResourceListResultDeserializer(result.body);
}

/** Lists the Sovereign View resources within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SovereignViewOperationsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SovereignViewResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-31-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  options: SovereignViewOperationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/sovereignViews/{sovereignViewName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sovereignViewName: sovereignViewName,
      "api%2Dversion": context.apiVersion ?? "2026-10-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the Sovereign View resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  options: SovereignViewOperationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, sovereignViewName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-31-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  properties: SovereignViewResourcePatch,
  options: SovereignViewOperationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/sovereignViews/{sovereignViewName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sovereignViewName: sovereignViewName,
      "api%2Dversion": context.apiVersion ?? "2026-10-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sovereignViewResourcePatchSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SovereignViewResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sovereignViewResourceDeserializer(result.body);
}

/** Updates the Sovereign View resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  properties: SovereignViewResourcePatch,
  options: SovereignViewOperationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SovereignViewResource>, SovereignViewResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, sovereignViewName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-31-preview",
  }) as PollerLike<OperationState<SovereignViewResource>, SovereignViewResource>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  resource: SovereignViewResource,
  options: SovereignViewOperationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/sovereignViews/{sovereignViewName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sovereignViewName: sovereignViewName,
      "api%2Dversion": context.apiVersion ?? "2026-10-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sovereignViewResourceSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SovereignViewResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sovereignViewResourceDeserializer(result.body);
}

/** Creates or updates the Sovereign View resource. */
export function create(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  resource: SovereignViewResource,
  options: SovereignViewOperationsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SovereignViewResource>, SovereignViewResource> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, sovereignViewName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-10-31-preview",
  }) as PollerLike<OperationState<SovereignViewResource>, SovereignViewResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  options: SovereignViewOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/sovereignViews/{sovereignViewName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sovereignViewName: sovereignViewName,
      "api%2Dversion": context.apiVersion ?? "2026-10-31-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SovereignViewResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sovereignViewResourceDeserializer(result.body);
}

/** Gets the Sovereign View resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  sovereignViewName: string,
  options: SovereignViewOperationsGetOptionalParams = { requestOptions: {} },
): Promise<SovereignViewResource> {
  const result = await _getSend(context, resourceGroupName, sovereignViewName, options);
  return _getDeserialize(result);
}
