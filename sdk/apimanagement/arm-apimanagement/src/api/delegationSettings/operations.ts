// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  PortalDelegationSettings,
  PortalSettingValidationKeyContract,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  portalDelegationSettingsSerializer,
  portalDelegationSettingsDeserializer,
  portalSettingValidationKeyContractDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DelegationSettingsListSecretsOptionalParams,
  DelegationSettingsUpdateOptionalParams,
  DelegationSettingsCreateOrUpdateOptionalParams,
  DelegationSettingsGetEntityTagOptionalParams,
  DelegationSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSecretsSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: DelegationSettingsListSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/portalsettings/delegation/listSecrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _listSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<PortalSettingValidationKeyContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return portalSettingValidationKeyContractDeserializer(result.body);
}

/** Gets the secret validation key of the DelegationSettings. */
export async function listSecrets(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: DelegationSettingsListSecretsOptionalParams = { requestOptions: {} },
): Promise<PortalSettingValidationKeyContract> {
  const result = await _listSecretsSend(context, resourceGroupName, serviceName, options);
  return _listSecretsDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  ifMatch: string,
  parameters: PortalDelegationSettings,
  options: DelegationSettingsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/portalsettings/delegation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { "if-match": ifMatch, ...options.requestOptions?.headers },
    body: portalDelegationSettingsSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Update Delegation settings. */
export async function update(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  ifMatch: string,
  parameters: PortalDelegationSettings,
  options: DelegationSettingsUpdateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    serviceName,
    ifMatch,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  parameters: PortalDelegationSettings,
  options: DelegationSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/portalsettings/delegation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: portalDelegationSettingsSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PortalDelegationSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return portalDelegationSettingsDeserializer(result.body);
}

/** Create or Update Delegation settings. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  parameters: PortalDelegationSettings,
  options: DelegationSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<PortalDelegationSettings> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getEntityTagSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: DelegationSettingsGetEntityTagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/portalsettings/delegation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _getEntityTagDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Gets the entity state (Etag) version of the DelegationSettings. */
export async function getEntityTag(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: DelegationSettingsGetEntityTagOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getEntityTagSend(context, resourceGroupName, serviceName, options);
  return _getEntityTagDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: DelegationSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/portalsettings/delegation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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
): Promise<PortalDelegationSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return portalDelegationSettingsDeserializer(result.body);
}

/** Get Delegation Settings for the Portal. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: DelegationSettingsGetOptionalParams = { requestOptions: {} },
): Promise<PortalDelegationSettings> {
  const result = await _getSend(context, resourceGroupName, serviceName, options);
  return _getDeserialize(result);
}
