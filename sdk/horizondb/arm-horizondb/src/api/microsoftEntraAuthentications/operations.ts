// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type {
  MicrosoftEntraAuthentication,
  MicrosoftEntraAuthenticationCreateOrUpdate,
  MicrosoftEntraAuthenticationForPatchUpdateUpdate,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  microsoftEntraAuthenticationDeserializer,
  microsoftEntraAuthenticationCreateOrUpdateSerializer,
  microsoftEntraAuthenticationForPatchUpdateUpdateSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MicrosoftEntraAuthenticationsUpdateOptionalParams,
  MicrosoftEntraAuthenticationsCreateOrReplaceOptionalParams,
  MicrosoftEntraAuthenticationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  properties: MicrosoftEntraAuthenticationForPatchUpdateUpdate,
  options: MicrosoftEntraAuthenticationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/authentications/microsoftEntra{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: microsoftEntraAuthenticationForPatchUpdateUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftEntraAuthentication> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return microsoftEntraAuthenticationDeserializer(result.body);
}

/** Updates the service-created Microsoft Entra authentication method. State Enabled enables the feature and State Disabled disables it; no additional properties are required. Disabling the feature does not remove or modify database roles or users previously created through the MicrosoftEntraAdministrators control-plane API or directly through pgaadauth extension functions. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  properties: MicrosoftEntraAuthenticationForPatchUpdateUpdate,
  options: MicrosoftEntraAuthenticationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MicrosoftEntraAuthentication>, MicrosoftEntraAuthentication> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, clusterName, properties, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<MicrosoftEntraAuthentication>, MicrosoftEntraAuthentication>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  resource: MicrosoftEntraAuthenticationCreateOrUpdate,
  options: MicrosoftEntraAuthenticationsCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/authentications/microsoftEntra{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: microsoftEntraAuthenticationCreateOrUpdateSerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftEntraAuthentication> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return microsoftEntraAuthenticationDeserializer(result.body);
}

/** Creates or replaces the service-created Microsoft Entra authentication method. State Enabled enables the feature and State Disabled disables it; no additional properties are required. Repeating the same request is idempotent. Disabling the feature does not remove or modify database roles or users previously created through the MicrosoftEntraAdministrators control-plane API or directly through pgaadauth extension functions. */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  resource: MicrosoftEntraAuthenticationCreateOrUpdate,
  options: MicrosoftEntraAuthenticationsCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<MicrosoftEntraAuthentication>, MicrosoftEntraAuthentication> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(context, resourceGroupName, clusterName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<MicrosoftEntraAuthentication>, MicrosoftEntraAuthentication>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: MicrosoftEntraAuthenticationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/authentications/microsoftEntra{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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
): Promise<MicrosoftEntraAuthentication> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return microsoftEntraAuthenticationDeserializer(result.body);
}

/** Gets the service-created Microsoft Entra authentication method. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: MicrosoftEntraAuthenticationsGetOptionalParams = { requestOptions: {} },
): Promise<MicrosoftEntraAuthentication> {
  const result = await _getSend(context, resourceGroupName, clusterName, options);
  return _getDeserialize(result);
}
