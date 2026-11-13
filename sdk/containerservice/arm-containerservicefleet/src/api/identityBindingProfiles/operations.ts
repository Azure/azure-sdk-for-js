// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceFleetContext as Client } from "../index.js";
import type {
  IdentityBindingProfile,
  _IdentityBindingProfileListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  identityBindingProfileSerializer,
  identityBindingProfileDeserializer,
  _identityBindingProfileListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IdentityBindingProfilesApplyOptionalParams,
  IdentityBindingProfilesListByFleetOptionalParams,
  IdentityBindingProfilesDeleteOptionalParams,
  IdentityBindingProfilesCreateOrUpdateOptionalParams,
  IdentityBindingProfilesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _applySend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  identityBindingProfileName: string,
  options: IdentityBindingProfilesApplyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/identityBindingProfiles/{identityBindingProfileName}/apply{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      identityBindingProfileName: identityBindingProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _applyDeserialize(
  result: PathUncheckedResponse,
): Promise<IdentityBindingProfile> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return identityBindingProfileDeserializer(result.body);
}

/** Applies the identity binding profile to the selected fleet members, creating, updating or deleting the corresponding managedClusters/identityBindings resources. */
export function apply(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  identityBindingProfileName: string,
  options: IdentityBindingProfilesApplyOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IdentityBindingProfile>, IdentityBindingProfile> {
  return getLongRunningPoller(context, _applyDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _applySend(context, resourceGroupName, fleetName, identityBindingProfileName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-02-preview",
  }) as PollerLike<OperationState<IdentityBindingProfile>, IdentityBindingProfile>;
}

export function _listByFleetSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: IdentityBindingProfilesListByFleetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/identityBindingProfiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
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

export async function _listByFleetDeserialize(
  result: PathUncheckedResponse,
): Promise<_IdentityBindingProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _identityBindingProfileListResultDeserializer(result.body);
}

/** List IdentityBindingProfile resources by Fleet */
export function listByFleet(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: IdentityBindingProfilesListByFleetOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IdentityBindingProfile> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFleetSend(context, resourceGroupName, fleetName, options),
    _listByFleetDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-11-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  identityBindingProfileName: string,
  options: IdentityBindingProfilesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/identityBindingProfiles/{identityBindingProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      identityBindingProfileName: identityBindingProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
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

/** Delete a IdentityBindingProfile */
export function $delete(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  identityBindingProfileName: string,
  options: IdentityBindingProfilesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, fleetName, identityBindingProfileName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  identityBindingProfileName: string,
  resource: IdentityBindingProfile,
  options: IdentityBindingProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/identityBindingProfiles/{identityBindingProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      identityBindingProfileName: identityBindingProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
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
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: identityBindingProfileSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<IdentityBindingProfile> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return identityBindingProfileDeserializer(result.body);
}

/** Create a IdentityBindingProfile */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  identityBindingProfileName: string,
  resource: IdentityBindingProfile,
  options: IdentityBindingProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IdentityBindingProfile>, IdentityBindingProfile> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        fleetName,
        identityBindingProfileName,
        resource,
        options,
      ),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2026-11-02-preview",
  }) as PollerLike<OperationState<IdentityBindingProfile>, IdentityBindingProfile>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  identityBindingProfileName: string,
  options: IdentityBindingProfilesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/identityBindingProfiles/{identityBindingProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      identityBindingProfileName: identityBindingProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
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
): Promise<IdentityBindingProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return identityBindingProfileDeserializer(result.body);
}

/** Get a IdentityBindingProfile */
export async function get(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  identityBindingProfileName: string,
  options: IdentityBindingProfilesGetOptionalParams = { requestOptions: {} },
): Promise<IdentityBindingProfile> {
  const result = await _getSend(
    context,
    resourceGroupName,
    fleetName,
    identityBindingProfileName,
    options,
  );
  return _getDeserialize(result);
}
