// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AttestationManagementContext as Client } from "../index.js";
import type {
  AttestationProvider,
  AttestationServiceCreationParams,
  AttestationServicePatchParams,
  AttestationProviderListResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  attestationProviderDeserializer,
  attestationServiceCreationParamsSerializer,
  attestationServicePatchParamsSerializer,
  attestationProviderListResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AttestationProvidersGetDefaultByLocationOptionalParams,
  AttestationProvidersListDefaultOptionalParams,
  AttestationProvidersListOptionalParams,
  AttestationProvidersListByResourceGroupOptionalParams,
  AttestationProvidersDeleteOptionalParams,
  AttestationProvidersUpdateOptionalParams,
  AttestationProvidersCreateOptionalParams,
  AttestationProvidersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getDefaultByLocationSend(
  context: Client,
  location: string,
  options: AttestationProvidersGetDefaultByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Attestation/locations/{location}/defaultProvider{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2021-06-01",
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

export async function _getDefaultByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<AttestationProvider> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return attestationProviderDeserializer(result.body);
}

/** Get the default provider by location. */
export async function getDefaultByLocation(
  context: Client,
  location: string,
  options: AttestationProvidersGetDefaultByLocationOptionalParams = { requestOptions: {} },
): Promise<AttestationProvider> {
  const result = await _getDefaultByLocationSend(context, location, options);
  return _getDefaultByLocationDeserialize(result);
}

export function _listDefaultSend(
  context: Client,
  options: AttestationProvidersListDefaultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Attestation/defaultProviders{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2021-06-01",
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

export async function _listDefaultDeserialize(
  result: PathUncheckedResponse,
): Promise<AttestationProviderListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return attestationProviderListResultDeserializer(result.body);
}

/** Get the default provider */
export async function listDefault(
  context: Client,
  options: AttestationProvidersListDefaultOptionalParams = { requestOptions: {} },
): Promise<AttestationProviderListResult> {
  const result = await _listDefaultSend(context, options);
  return _listDefaultDeserialize(result);
}

export function _listSend(
  context: Client,
  options: AttestationProvidersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Attestation/attestationProviders{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2021-06-01",
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
): Promise<AttestationProviderListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return attestationProviderListResultDeserializer(result.body);
}

/** Returns a list of attestation providers in a subscription. */
export async function list(
  context: Client,
  options: AttestationProvidersListOptionalParams = { requestOptions: {} },
): Promise<AttestationProviderListResult> {
  const result = await _listSend(context, options);
  return _listDeserialize(result);
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AttestationProvidersListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Attestation/attestationProviders{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2021-06-01",
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
): Promise<AttestationProviderListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return attestationProviderListResultDeserializer(result.body);
}

/** Returns attestation providers list in a resource group. */
export async function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AttestationProvidersListByResourceGroupOptionalParams = { requestOptions: {} },
): Promise<AttestationProviderListResult> {
  const result = await _listByResourceGroupSend(context, resourceGroupName, options);
  return _listByResourceGroupDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  options: AttestationProvidersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Attestation/attestationProviders/{providerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerName: providerName,
      "api%2Dversion": context.apiVersion ?? "2021-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete Attestation Service. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  options: AttestationProvidersDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, providerName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  updateParams: AttestationServicePatchParams,
  options: AttestationProvidersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Attestation/attestationProviders/{providerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerName: providerName,
      "api%2Dversion": context.apiVersion ?? "2021-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: attestationServicePatchParamsSerializer(updateParams),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AttestationProvider> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return attestationProviderDeserializer(result.body);
}

/** Updates the Attestation Provider. */
export async function update(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  updateParams: AttestationServicePatchParams,
  options: AttestationProvidersUpdateOptionalParams = { requestOptions: {} },
): Promise<AttestationProvider> {
  const result = await _updateSend(context, resourceGroupName, providerName, updateParams, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  creationParams: AttestationServiceCreationParams,
  options: AttestationProvidersCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Attestation/attestationProviders/{providerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerName: providerName,
      "api%2Dversion": context.apiVersion ?? "2021-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: attestationServiceCreationParamsSerializer(creationParams),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<AttestationProvider> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return attestationProviderDeserializer(result.body);
}

/** Creates or updates an Attestation Provider. */
export async function create(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  creationParams: AttestationServiceCreationParams,
  options: AttestationProvidersCreateOptionalParams = { requestOptions: {} },
): Promise<AttestationProvider> {
  const result = await _createSend(
    context,
    resourceGroupName,
    providerName,
    creationParams,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  options: AttestationProvidersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Attestation/attestationProviders/{providerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerName: providerName,
      "api%2Dversion": context.apiVersion ?? "2021-06-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AttestationProvider> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return attestationProviderDeserializer(result.body);
}

/** Get the status of Attestation Provider. */
export async function get(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  options: AttestationProvidersGetOptionalParams = { requestOptions: {} },
): Promise<AttestationProvider> {
  const result = await _getSend(context, resourceGroupName, providerName, options);
  return _getDeserialize(result);
}
