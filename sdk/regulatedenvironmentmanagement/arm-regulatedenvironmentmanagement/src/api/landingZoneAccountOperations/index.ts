// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SovereignContext as Client,
  LandingZoneAccountOperationsCreateOptionalParams,
  LandingZoneAccountOperationsDeleteOptionalParams,
  LandingZoneAccountOperationsGetOptionalParams,
  LandingZoneAccountOperationsListByResourceGroupOptionalParams,
  LandingZoneAccountOperationsListBySubscriptionOptionalParams,
  LandingZoneAccountOperationsUpdateOptionalParams,
} from "../index.js";
import {
  errorResponseDeserializer,
  LandingZoneAccountResource,
  landingZoneAccountResourceSerializer,
  landingZoneAccountResourceDeserializer,
  _LandingZoneAccountResourceListResult,
  _landingZoneAccountResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _landingZoneAccountOperationsListBySubscriptionSend(
  context: Client,
  options: LandingZoneAccountOperationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sovereign/landingZoneAccounts{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _landingZoneAccountOperationsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_LandingZoneAccountResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _landingZoneAccountResourceListResultDeserializer(result.body);
}

/** List the landing zone accounts within a subscription. */
export function landingZoneAccountOperationsListBySubscription(
  context: Client,
  options: LandingZoneAccountOperationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<LandingZoneAccountResource> {
  return buildPagedAsyncIterator(
    context,
    () => _landingZoneAccountOperationsListBySubscriptionSend(context, options),
    _landingZoneAccountOperationsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _landingZoneAccountOperationsListByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: LandingZoneAccountOperationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _landingZoneAccountOperationsListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_LandingZoneAccountResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _landingZoneAccountResourceListResultDeserializer(result.body);
}

/** List the landing zone accounts within a resource group. */
export function landingZoneAccountOperationsListByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: LandingZoneAccountOperationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<LandingZoneAccountResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _landingZoneAccountOperationsListByResourceGroupSend(
        context,
        resourceGroupName,
        options,
      ),
    _landingZoneAccountOperationsListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _landingZoneAccountOperationsDeleteSend(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  options: LandingZoneAccountOperationsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      landingZoneAccountName: landingZoneAccountName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _landingZoneAccountOperationsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a landing zone account. */
export function landingZoneAccountOperationsDelete(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  options: LandingZoneAccountOperationsDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _landingZoneAccountOperationsDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _landingZoneAccountOperationsDeleteSend(
          context,
          resourceGroupName,
          landingZoneAccountName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _landingZoneAccountOperationsUpdateSend(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  properties: LandingZoneAccountResource,
  options: LandingZoneAccountOperationsUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      landingZoneAccountName: landingZoneAccountName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: landingZoneAccountResourceSerializer(properties),
    });
}

export async function _landingZoneAccountOperationsUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LandingZoneAccountResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return landingZoneAccountResourceDeserializer(result.body);
}

/** Update a landing zone account. */
export function landingZoneAccountOperationsUpdate(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  properties: LandingZoneAccountResource,
  options: LandingZoneAccountOperationsUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<LandingZoneAccountResource>,
  LandingZoneAccountResource
> {
  return getLongRunningPoller(
    context,
    _landingZoneAccountOperationsUpdateDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _landingZoneAccountOperationsUpdateSend(
          context,
          resourceGroupName,
          landingZoneAccountName,
          properties,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<
    OperationState<LandingZoneAccountResource>,
    LandingZoneAccountResource
  >;
}

export function _landingZoneAccountOperationsCreateSend(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  resource: LandingZoneAccountResource,
  options: LandingZoneAccountOperationsCreateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      landingZoneAccountName: landingZoneAccountName,
      "api-version": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: landingZoneAccountResourceSerializer(resource),
    });
}

export async function _landingZoneAccountOperationsCreateDeserialize(
  result: PathUncheckedResponse,
): Promise<LandingZoneAccountResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return landingZoneAccountResourceDeserializer(result.body);
}

/** Create a landing zone account. */
export function landingZoneAccountOperationsCreate(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  resource: LandingZoneAccountResource,
  options: LandingZoneAccountOperationsCreateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<LandingZoneAccountResource>,
  LandingZoneAccountResource
> {
  return getLongRunningPoller(
    context,
    _landingZoneAccountOperationsCreateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _landingZoneAccountOperationsCreateSend(
          context,
          resourceGroupName,
          landingZoneAccountName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<
    OperationState<LandingZoneAccountResource>,
    LandingZoneAccountResource
  >;
}

export function _landingZoneAccountOperationsGetSend(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  options: LandingZoneAccountOperationsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      landingZoneAccountName: landingZoneAccountName,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _landingZoneAccountOperationsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<LandingZoneAccountResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return landingZoneAccountResourceDeserializer(result.body);
}

/** Get a landing zone account. */
export async function landingZoneAccountOperationsGet(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  options: LandingZoneAccountOperationsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<LandingZoneAccountResource> {
  const result = await _landingZoneAccountOperationsGetSend(
    context,
    resourceGroupName,
    landingZoneAccountName,
    options,
  );
  return _landingZoneAccountOperationsGetDeserialize(result);
}
