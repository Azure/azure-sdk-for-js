// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { NspProfile } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  nspProfileSerializer,
  nspProfileDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _NspProfileListResult } from "../../models/models.js";
import { _nspProfileListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkSecurityPerimeterProfilesListOptionalParams,
  NetworkSecurityPerimeterProfilesDeleteOptionalParams,
  NetworkSecurityPerimeterProfilesCreateOrUpdateOptionalParams,
  NetworkSecurityPerimeterProfilesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  options: NetworkSecurityPerimeterProfilesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/profiles{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      "api%2Dversion": "2025-05-01",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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
): Promise<_NspProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _nspProfileListResultDeserializer(result.body);
}

/** Lists the NSP profiles in the specified network security perimeter. */
export function list(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  options: NetworkSecurityPerimeterProfilesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NspProfile> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, networkSecurityPerimeterName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  profileName: string,
  options: NetworkSecurityPerimeterProfilesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/profiles/{profileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      profileName: profileName,
      "api%2Dversion": "2025-05-01",
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

/** Deletes an NSP profile. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  profileName: string,
  options: NetworkSecurityPerimeterProfilesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    networkSecurityPerimeterName,
    profileName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  profileName: string,
  parameters: NspProfile,
  options: NetworkSecurityPerimeterProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/profiles/{profileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      profileName: profileName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: nspProfileSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NspProfile> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return nspProfileDeserializer(result.body);
}

/** Creates or updates a network profile. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  profileName: string,
  parameters: NspProfile,
  options: NetworkSecurityPerimeterProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<NspProfile> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    networkSecurityPerimeterName,
    profileName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  profileName: string,
  options: NetworkSecurityPerimeterProfilesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/profiles/{profileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkSecurityPerimeterName: networkSecurityPerimeterName,
      profileName: profileName,
      "api%2Dversion": "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NspProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return nspProfileDeserializer(result.body);
}

/** Gets the specified NSP profile. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkSecurityPerimeterName: string,
  profileName: string,
  options: NetworkSecurityPerimeterProfilesGetOptionalParams = { requestOptions: {} },
): Promise<NspProfile> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkSecurityPerimeterName,
    profileName,
    options,
  );
  return _getDeserialize(result);
}
