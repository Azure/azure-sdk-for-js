// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SovereignContext as Client,
  LandingZoneRegistrationOperationsCreateOptionalParams,
  LandingZoneRegistrationOperationsDeleteOptionalParams,
  LandingZoneRegistrationOperationsGetOptionalParams,
  LandingZoneRegistrationOperationsListByResourceGroupOptionalParams,
  LandingZoneRegistrationOperationsListBySubscriptionOptionalParams,
  LandingZoneRegistrationOperationsUpdateOptionalParams,
} from "../index.js";
import {
  LandingZoneRegistrationResource,
  landingZoneRegistrationResourceSerializer,
  landingZoneRegistrationResourceDeserializer,
  errorResponseDeserializer,
  _LandingZoneRegistrationResourceListResult,
  _landingZoneRegistrationResourceListResultDeserializer,
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

export function _landingZoneRegistrationOperationsListBySubscriptionSend(
  context: Client,
  landingZoneAccountName: string,
  options: LandingZoneRegistrationOperationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}/landingZoneRegistrations{?api-version}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _landingZoneRegistrationOperationsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_LandingZoneRegistrationResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _landingZoneRegistrationResourceListResultDeserializer(result.body);
}

/** List the landing zone registrations within a subscription. */
export function landingZoneRegistrationOperationsListBySubscription(
  context: Client,
  landingZoneAccountName: string,
  options: LandingZoneRegistrationOperationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<LandingZoneRegistrationResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _landingZoneRegistrationOperationsListBySubscriptionSend(
        context,
        landingZoneAccountName,
        options,
      ),
    _landingZoneRegistrationOperationsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _landingZoneRegistrationOperationsListByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  options: LandingZoneRegistrationOperationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}/landingZoneRegistrations{?api-version}",
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

export async function _landingZoneRegistrationOperationsListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_LandingZoneRegistrationResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _landingZoneRegistrationResourceListResultDeserializer(result.body);
}

/** List the landing zone registrations within a resource group. */
export function landingZoneRegistrationOperationsListByResourceGroup(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  options: LandingZoneRegistrationOperationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<LandingZoneRegistrationResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _landingZoneRegistrationOperationsListByResourceGroupSend(
        context,
        resourceGroupName,
        landingZoneAccountName,
        options,
      ),
    _landingZoneRegistrationOperationsListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _landingZoneRegistrationOperationsDeleteSend(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneRegistrationName: string,
  options: LandingZoneRegistrationOperationsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}/landingZoneRegistrations/{landingZoneRegistrationName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      landingZoneAccountName: landingZoneAccountName,
      landingZoneRegistrationName: landingZoneRegistrationName,
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

export async function _landingZoneRegistrationOperationsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a landing zone registration. */
export async function landingZoneRegistrationOperationsDelete(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneRegistrationName: string,
  options: LandingZoneRegistrationOperationsDeleteOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _landingZoneRegistrationOperationsDeleteSend(
    context,
    resourceGroupName,
    landingZoneAccountName,
    landingZoneRegistrationName,
    options,
  );
  return _landingZoneRegistrationOperationsDeleteDeserialize(result);
}

export function _landingZoneRegistrationOperationsUpdateSend(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneRegistrationName: string,
  properties: LandingZoneRegistrationResource,
  options: LandingZoneRegistrationOperationsUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}/landingZoneRegistrations/{landingZoneRegistrationName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      landingZoneAccountName: landingZoneAccountName,
      landingZoneRegistrationName: landingZoneRegistrationName,
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
      body: landingZoneRegistrationResourceSerializer(properties),
    });
}

export async function _landingZoneRegistrationOperationsUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LandingZoneRegistrationResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return landingZoneRegistrationResourceDeserializer(result.body);
}

/** Update a landing zone registration. */
export function landingZoneRegistrationOperationsUpdate(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneRegistrationName: string,
  properties: LandingZoneRegistrationResource,
  options: LandingZoneRegistrationOperationsUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<LandingZoneRegistrationResource>,
  LandingZoneRegistrationResource
> {
  return getLongRunningPoller(
    context,
    _landingZoneRegistrationOperationsUpdateDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _landingZoneRegistrationOperationsUpdateSend(
          context,
          resourceGroupName,
          landingZoneAccountName,
          landingZoneRegistrationName,
          properties,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<
    OperationState<LandingZoneRegistrationResource>,
    LandingZoneRegistrationResource
  >;
}

export function _landingZoneRegistrationOperationsCreateSend(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneRegistrationName: string,
  resource: LandingZoneRegistrationResource,
  options: LandingZoneRegistrationOperationsCreateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}/landingZoneRegistrations/{landingZoneRegistrationName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      landingZoneAccountName: landingZoneAccountName,
      landingZoneRegistrationName: landingZoneRegistrationName,
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
      body: landingZoneRegistrationResourceSerializer(resource),
    });
}

export async function _landingZoneRegistrationOperationsCreateDeserialize(
  result: PathUncheckedResponse,
): Promise<LandingZoneRegistrationResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return landingZoneRegistrationResourceDeserializer(result.body);
}

/** Create a landing zone registration. */
export function landingZoneRegistrationOperationsCreate(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneRegistrationName: string,
  resource: LandingZoneRegistrationResource,
  options: LandingZoneRegistrationOperationsCreateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<LandingZoneRegistrationResource>,
  LandingZoneRegistrationResource
> {
  return getLongRunningPoller(
    context,
    _landingZoneRegistrationOperationsCreateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _landingZoneRegistrationOperationsCreateSend(
          context,
          resourceGroupName,
          landingZoneAccountName,
          landingZoneRegistrationName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<
    OperationState<LandingZoneRegistrationResource>,
    LandingZoneRegistrationResource
  >;
}

export function _landingZoneRegistrationOperationsGetSend(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneRegistrationName: string,
  options: LandingZoneRegistrationOperationsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}/landingZoneRegistrations/{landingZoneRegistrationName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      landingZoneAccountName: landingZoneAccountName,
      landingZoneRegistrationName: landingZoneRegistrationName,
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

export async function _landingZoneRegistrationOperationsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<LandingZoneRegistrationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return landingZoneRegistrationResourceDeserializer(result.body);
}

/** Get a landing zone registration. */
export async function landingZoneRegistrationOperationsGet(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneRegistrationName: string,
  options: LandingZoneRegistrationOperationsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<LandingZoneRegistrationResource> {
  const result = await _landingZoneRegistrationOperationsGetSend(
    context,
    resourceGroupName,
    landingZoneAccountName,
    landingZoneRegistrationName,
    options,
  );
  return _landingZoneRegistrationOperationsGetDeserialize(result);
}
