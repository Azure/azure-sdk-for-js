// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesContext as Client } from "../index.js";
import type { VaultExtendedInfoResource } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  vaultExtendedInfoResourceSerializer,
  vaultExtendedInfoResourceDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VaultExtendedInfoUpdateOptionalParams,
  VaultExtendedInfoCreateOrUpdateOptionalParams,
  VaultExtendedInfoGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  resourceResourceExtendedInfoDetails: VaultExtendedInfoResource,
  options: VaultExtendedInfoUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/extendedInformation/vaultExtendedInfo{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: vaultExtendedInfoResourceSerializer(resourceResourceExtendedInfoDetails),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<VaultExtendedInfoResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return vaultExtendedInfoResourceDeserializer(result.body);
}

/** Update vault extended info. */
export async function update(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  resourceResourceExtendedInfoDetails: VaultExtendedInfoResource,
  options: VaultExtendedInfoUpdateOptionalParams = { requestOptions: {} },
): Promise<VaultExtendedInfoResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    vaultName,
    resourceResourceExtendedInfoDetails,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  resourceResourceExtendedInfoDetails: VaultExtendedInfoResource,
  options: VaultExtendedInfoCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/extendedInformation/vaultExtendedInfo{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: vaultExtendedInfoResourceSerializer(resourceResourceExtendedInfoDetails),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VaultExtendedInfoResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return vaultExtendedInfoResourceDeserializer(result.body);
}

/** Create vault extended info. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  resourceResourceExtendedInfoDetails: VaultExtendedInfoResource,
  options: VaultExtendedInfoCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<VaultExtendedInfoResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    vaultName,
    resourceResourceExtendedInfoDetails,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: VaultExtendedInfoGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/extendedInformation/vaultExtendedInfo{?api%2Dversion}",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<VaultExtendedInfoResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return vaultExtendedInfoResourceDeserializer(result.body);
}

/** Get the vault extended info. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: VaultExtendedInfoGetOptionalParams = { requestOptions: {} },
): Promise<VaultExtendedInfoResource> {
  const result = await _getSend(context, resourceGroupName, vaultName, options);
  return _getDeserialize(result);
}
