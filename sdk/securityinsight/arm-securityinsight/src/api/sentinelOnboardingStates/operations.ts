// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type { SentinelOnboardingState, SentinelOnboardingStatesList } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  sentinelOnboardingStateSerializer,
  sentinelOnboardingStateDeserializer,
  sentinelOnboardingStatesListDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SentinelOnboardingStatesListOptionalParams,
  SentinelOnboardingStatesDeleteOptionalParams,
  SentinelOnboardingStatesCreateOptionalParams,
  SentinelOnboardingStatesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: SentinelOnboardingStatesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/onboardingStates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<SentinelOnboardingStatesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return sentinelOnboardingStatesListDeserializer(result.body);
}

/** Gets all Sentinel onboarding states */
export async function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: SentinelOnboardingStatesListOptionalParams = { requestOptions: {} },
): Promise<SentinelOnboardingStatesList> {
  const result = await _listSend(context, resourceGroupName, workspaceName, options);
  return _listDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  sentinelOnboardingStateName: string,
  options: SentinelOnboardingStatesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/onboardingStates/{sentinelOnboardingStateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      sentinelOnboardingStateName: sentinelOnboardingStateName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete Sentinel onboarding state */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  sentinelOnboardingStateName: string,
  options: SentinelOnboardingStatesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    workspaceName,
    sentinelOnboardingStateName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  sentinelOnboardingStateName: string,
  options: SentinelOnboardingStatesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/onboardingStates/{sentinelOnboardingStateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      sentinelOnboardingStateName: sentinelOnboardingStateName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["sentinelOnboardingStateParameter"]
      ? options["sentinelOnboardingStateParameter"]
      : sentinelOnboardingStateSerializer(options["sentinelOnboardingStateParameter"]),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SentinelOnboardingState> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return sentinelOnboardingStateDeserializer(result.body);
}

/** Create Sentinel onboarding state */
export async function create(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  sentinelOnboardingStateName: string,
  options: SentinelOnboardingStatesCreateOptionalParams = { requestOptions: {} },
): Promise<SentinelOnboardingState> {
  const result = await _createSend(
    context,
    resourceGroupName,
    workspaceName,
    sentinelOnboardingStateName,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  sentinelOnboardingStateName: string,
  options: SentinelOnboardingStatesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/onboardingStates/{sentinelOnboardingStateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      sentinelOnboardingStateName: sentinelOnboardingStateName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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
): Promise<SentinelOnboardingState> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return sentinelOnboardingStateDeserializer(result.body);
}

/** Get Sentinel onboarding state */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  sentinelOnboardingStateName: string,
  options: SentinelOnboardingStatesGetOptionalParams = { requestOptions: {} },
): Promise<SentinelOnboardingState> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    sentinelOnboardingStateName,
    options,
  );
  return _getDeserialize(result);
}
