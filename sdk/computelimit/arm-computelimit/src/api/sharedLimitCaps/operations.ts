// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SharedLimitCap,
  sharedLimitCapSerializer,
  sharedLimitCapDeserializer,
  _SharedLimitCapListResult,
  _sharedLimitCapListResultDeserializer,
  SetMemberCapOverridesRequest,
  setMemberCapOverridesRequestSerializer,
  SetMemberCapOverridesResult,
  setMemberCapOverridesResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SharedLimitCapsSetMemberCapOverridesOptionalParams,
  SharedLimitCapsListBySubscriptionLocationResourceOptionalParams,
  SharedLimitCapsDeleteOptionalParams,
  SharedLimitCapsCreateOrUpdateOptionalParams,
  SharedLimitCapsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _setMemberCapOverridesSend(
  context: Client,
  location: string,
  vmFamilyName: string,
  body: SetMemberCapOverridesRequest,
  options: SharedLimitCapsSetMemberCapOverridesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/sharedLimitCaps/{vmFamilyName}/setMemberCapOverrides{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      vmFamilyName: vmFamilyName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: setMemberCapOverridesRequestSerializer(body),
    });
}

export async function _setMemberCapOverridesDeserialize(
  result: PathUncheckedResponse,
): Promise<SetMemberCapOverridesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return setMemberCapOverridesResultDeserializer(result.body);
}

/**
 * Replaces the full set of per-member cap overrides for this shared limit
 * cap. The supplied array becomes the new complete set of overrides;
 * supplying an empty array clears all existing overrides.
 */
export async function setMemberCapOverrides(
  context: Client,
  location: string,
  vmFamilyName: string,
  body: SetMemberCapOverridesRequest,
  options: SharedLimitCapsSetMemberCapOverridesOptionalParams = { requestOptions: {} },
): Promise<SetMemberCapOverridesResult> {
  const result = await _setMemberCapOverridesSend(context, location, vmFamilyName, body, options);
  return _setMemberCapOverridesDeserialize(result);
}

export function _listBySubscriptionLocationResourceSend(
  context: Client,
  location: string,
  options: SharedLimitCapsListBySubscriptionLocationResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/sharedLimitCaps{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listBySubscriptionLocationResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_SharedLimitCapListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sharedLimitCapListResultDeserializer(result.body);
}

/** Lists all shared limit cap configurations visible to the caller's subscription. */
export function listBySubscriptionLocationResource(
  context: Client,
  location: string,
  options: SharedLimitCapsListBySubscriptionLocationResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SharedLimitCap> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionLocationResourceSend(context, location, options),
    _listBySubscriptionLocationResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-07-01" },
  );
}

export function _$deleteSend(
  context: Client,
  location: string,
  vmFamilyName: string,
  options: SharedLimitCapsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/sharedLimitCaps/{vmFamilyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      vmFamilyName: vmFamilyName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the shared limit cap configuration for a VM family. The caller's subscription is treated as the host subscription. */
export async function $delete(
  context: Client,
  location: string,
  vmFamilyName: string,
  options: SharedLimitCapsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, location, vmFamilyName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  location: string,
  vmFamilyName: string,
  resource: SharedLimitCap,
  options: SharedLimitCapsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/sharedLimitCaps/{vmFamilyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      vmFamilyName: vmFamilyName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: sharedLimitCapSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SharedLimitCap> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sharedLimitCapDeserializer(result.body);
}

/** Creates or replaces the shared limit cap configuration for a VM family. */
export async function createOrUpdate(
  context: Client,
  location: string,
  vmFamilyName: string,
  resource: SharedLimitCap,
  options: SharedLimitCapsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SharedLimitCap> {
  const result = await _createOrUpdateSend(context, location, vmFamilyName, resource, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  location: string,
  vmFamilyName: string,
  options: SharedLimitCapsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ComputeLimit/locations/{location}/sharedLimitCaps/{vmFamilyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      vmFamilyName: vmFamilyName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SharedLimitCap> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sharedLimitCapDeserializer(result.body);
}

/** Gets the shared limit cap configuration for a VM family, as visible to the caller's subscription. */
export async function get(
  context: Client,
  location: string,
  vmFamilyName: string,
  options: SharedLimitCapsGetOptionalParams = { requestOptions: {} },
): Promise<SharedLimitCap> {
  const result = await _getSend(context, location, vmFamilyName, options);
  return _getDeserialize(result);
}
