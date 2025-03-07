// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SovereignContext as Client,
  LandingZoneConfigurationOperationsCreateCopyOptionalParams,
  LandingZoneConfigurationOperationsCreateOptionalParams,
  LandingZoneConfigurationOperationsDeleteOptionalParams,
  LandingZoneConfigurationOperationsGenerateLandingZoneOptionalParams,
  LandingZoneConfigurationOperationsGetOptionalParams,
  LandingZoneConfigurationOperationsListByResourceGroupOptionalParams,
  LandingZoneConfigurationOperationsListBySubscriptionOptionalParams,
  LandingZoneConfigurationOperationsUpdateAuthoringStatusOptionalParams,
  LandingZoneConfigurationOperationsUpdateOptionalParams,
} from "../index.js";
import {
  errorResponseDeserializer,
  LandingZoneConfigurationResource,
  landingZoneConfigurationResourceSerializer,
  landingZoneConfigurationResourceDeserializer,
  _LandingZoneConfigurationResourceListResult,
  _landingZoneConfigurationResourceListResultDeserializer,
  GenerateLandingZoneRequest,
  generateLandingZoneRequestSerializer,
  GenerateLandingZoneResponse,
  generateLandingZoneResponseDeserializer,
  UpdateAuthoringStatusRequest,
  updateAuthoringStatusRequestSerializer,
  UpdateAuthoringStatusResponse,
  updateAuthoringStatusResponseDeserializer,
  CreateLandingZoneConfigurationCopyRequest,
  createLandingZoneConfigurationCopyRequestSerializer,
  CreateLandingZoneConfigurationCopyResponse,
  createLandingZoneConfigurationCopyResponseDeserializer,
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

export function _landingZoneConfigurationOperationsCreateCopySend(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneConfigurationName: string,
  body: CreateLandingZoneConfigurationCopyRequest,
  options: LandingZoneConfigurationOperationsCreateCopyOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}/landingZoneConfigurations/{landingZoneConfigurationName}/createCopy{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      landingZoneAccountName: landingZoneAccountName,
      landingZoneConfigurationName: landingZoneConfigurationName,
      "api-version": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: createLandingZoneConfigurationCopyRequestSerializer(body),
    });
}

export async function _landingZoneConfigurationOperationsCreateCopyDeserialize(
  result: PathUncheckedResponse,
): Promise<CreateLandingZoneConfigurationCopyResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return createLandingZoneConfigurationCopyResponseDeserializer(result.body);
}

/** Create a duplicate of the landing zone configuration. */
export function landingZoneConfigurationOperationsCreateCopy(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneConfigurationName: string,
  body: CreateLandingZoneConfigurationCopyRequest,
  options: LandingZoneConfigurationOperationsCreateCopyOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<CreateLandingZoneConfigurationCopyResponse>,
  CreateLandingZoneConfigurationCopyResponse
> {
  return getLongRunningPoller(
    context,
    _landingZoneConfigurationOperationsCreateCopyDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _landingZoneConfigurationOperationsCreateCopySend(
          context,
          resourceGroupName,
          landingZoneAccountName,
          landingZoneConfigurationName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<
    OperationState<CreateLandingZoneConfigurationCopyResponse>,
    CreateLandingZoneConfigurationCopyResponse
  >;
}

export function _landingZoneConfigurationOperationsUpdateAuthoringStatusSend(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneConfigurationName: string,
  body: UpdateAuthoringStatusRequest,
  options: LandingZoneConfigurationOperationsUpdateAuthoringStatusOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}/landingZoneConfigurations/{landingZoneConfigurationName}/updateAuthoringStatus{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      landingZoneAccountName: landingZoneAccountName,
      landingZoneConfigurationName: landingZoneConfigurationName,
      "api-version": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: updateAuthoringStatusRequestSerializer(body),
    });
}

export async function _landingZoneConfigurationOperationsUpdateAuthoringStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<UpdateAuthoringStatusResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return updateAuthoringStatusResponseDeserializer(result.body);
}

/** Update the authoring status on a landing zone configuration. */
export function landingZoneConfigurationOperationsUpdateAuthoringStatus(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneConfigurationName: string,
  body: UpdateAuthoringStatusRequest,
  options: LandingZoneConfigurationOperationsUpdateAuthoringStatusOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<UpdateAuthoringStatusResponse>,
  UpdateAuthoringStatusResponse
> {
  return getLongRunningPoller(
    context,
    _landingZoneConfigurationOperationsUpdateAuthoringStatusDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _landingZoneConfigurationOperationsUpdateAuthoringStatusSend(
          context,
          resourceGroupName,
          landingZoneAccountName,
          landingZoneConfigurationName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<
    OperationState<UpdateAuthoringStatusResponse>,
    UpdateAuthoringStatusResponse
  >;
}

export function _landingZoneConfigurationOperationsGenerateLandingZoneSend(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneConfigurationName: string,
  body: GenerateLandingZoneRequest,
  options: LandingZoneConfigurationOperationsGenerateLandingZoneOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}/landingZoneConfigurations/{landingZoneConfigurationName}/generateLandingZone{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      landingZoneAccountName: landingZoneAccountName,
      landingZoneConfigurationName: landingZoneConfigurationName,
      "api-version": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: generateLandingZoneRequestSerializer(body),
    });
}

export async function _landingZoneConfigurationOperationsGenerateLandingZoneDeserialize(
  result: PathUncheckedResponse,
): Promise<GenerateLandingZoneResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return generateLandingZoneResponseDeserializer(result.body);
}

/** Generate infrastructure as code (IaC) for a landing zone deployment. */
export function landingZoneConfigurationOperationsGenerateLandingZone(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneConfigurationName: string,
  body: GenerateLandingZoneRequest,
  options: LandingZoneConfigurationOperationsGenerateLandingZoneOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<GenerateLandingZoneResponse>,
  GenerateLandingZoneResponse
> {
  return getLongRunningPoller(
    context,
    _landingZoneConfigurationOperationsGenerateLandingZoneDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _landingZoneConfigurationOperationsGenerateLandingZoneSend(
          context,
          resourceGroupName,
          landingZoneAccountName,
          landingZoneConfigurationName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<
    OperationState<GenerateLandingZoneResponse>,
    GenerateLandingZoneResponse
  >;
}

export function _landingZoneConfigurationOperationsListBySubscriptionSend(
  context: Client,
  landingZoneAccountName: string,
  options: LandingZoneConfigurationOperationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}/landingZoneConfigurations{?api-version}",
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

export async function _landingZoneConfigurationOperationsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_LandingZoneConfigurationResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _landingZoneConfigurationResourceListResultDeserializer(result.body);
}

/** List the landing zone configurations within a subscription. */
export function landingZoneConfigurationOperationsListBySubscription(
  context: Client,
  landingZoneAccountName: string,
  options: LandingZoneConfigurationOperationsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<LandingZoneConfigurationResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _landingZoneConfigurationOperationsListBySubscriptionSend(
        context,
        landingZoneAccountName,
        options,
      ),
    _landingZoneConfigurationOperationsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _landingZoneConfigurationOperationsListByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  options: LandingZoneConfigurationOperationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}/landingZoneConfigurations{?api-version}",
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

export async function _landingZoneConfigurationOperationsListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_LandingZoneConfigurationResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _landingZoneConfigurationResourceListResultDeserializer(result.body);
}

/** List the landing zone configurations within a resource group. */
export function landingZoneConfigurationOperationsListByResourceGroup(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  options: LandingZoneConfigurationOperationsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<LandingZoneConfigurationResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _landingZoneConfigurationOperationsListByResourceGroupSend(
        context,
        resourceGroupName,
        landingZoneAccountName,
        options,
      ),
    _landingZoneConfigurationOperationsListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _landingZoneConfigurationOperationsDeleteSend(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneConfigurationName: string,
  options: LandingZoneConfigurationOperationsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}/landingZoneConfigurations/{landingZoneConfigurationName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      landingZoneAccountName: landingZoneAccountName,
      landingZoneConfigurationName: landingZoneConfigurationName,
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

export async function _landingZoneConfigurationOperationsDeleteDeserialize(
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

/** Delete a landing zone configuration. */
export function landingZoneConfigurationOperationsDelete(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneConfigurationName: string,
  options: LandingZoneConfigurationOperationsDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _landingZoneConfigurationOperationsDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _landingZoneConfigurationOperationsDeleteSend(
          context,
          resourceGroupName,
          landingZoneAccountName,
          landingZoneConfigurationName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _landingZoneConfigurationOperationsUpdateSend(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneConfigurationName: string,
  properties: LandingZoneConfigurationResource,
  options: LandingZoneConfigurationOperationsUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}/landingZoneConfigurations/{landingZoneConfigurationName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      landingZoneAccountName: landingZoneAccountName,
      landingZoneConfigurationName: landingZoneConfigurationName,
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
      body: landingZoneConfigurationResourceSerializer(properties),
    });
}

export async function _landingZoneConfigurationOperationsUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LandingZoneConfigurationResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return landingZoneConfigurationResourceDeserializer(result.body);
}

/** Update a landing zone configuration. */
export function landingZoneConfigurationOperationsUpdate(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneConfigurationName: string,
  properties: LandingZoneConfigurationResource,
  options: LandingZoneConfigurationOperationsUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<LandingZoneConfigurationResource>,
  LandingZoneConfigurationResource
> {
  return getLongRunningPoller(
    context,
    _landingZoneConfigurationOperationsUpdateDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _landingZoneConfigurationOperationsUpdateSend(
          context,
          resourceGroupName,
          landingZoneAccountName,
          landingZoneConfigurationName,
          properties,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<
    OperationState<LandingZoneConfigurationResource>,
    LandingZoneConfigurationResource
  >;
}

export function _landingZoneConfigurationOperationsCreateSend(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneConfigurationName: string,
  resource: LandingZoneConfigurationResource,
  options: LandingZoneConfigurationOperationsCreateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}/landingZoneConfigurations/{landingZoneConfigurationName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      landingZoneAccountName: landingZoneAccountName,
      landingZoneConfigurationName: landingZoneConfigurationName,
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
      body: landingZoneConfigurationResourceSerializer(resource),
    });
}

export async function _landingZoneConfigurationOperationsCreateDeserialize(
  result: PathUncheckedResponse,
): Promise<LandingZoneConfigurationResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return landingZoneConfigurationResourceDeserializer(result.body);
}

/** Create a landing zone configuration. */
export function landingZoneConfigurationOperationsCreate(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneConfigurationName: string,
  resource: LandingZoneConfigurationResource,
  options: LandingZoneConfigurationOperationsCreateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<LandingZoneConfigurationResource>,
  LandingZoneConfigurationResource
> {
  return getLongRunningPoller(
    context,
    _landingZoneConfigurationOperationsCreateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _landingZoneConfigurationOperationsCreateSend(
          context,
          resourceGroupName,
          landingZoneAccountName,
          landingZoneConfigurationName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<
    OperationState<LandingZoneConfigurationResource>,
    LandingZoneConfigurationResource
  >;
}

export function _landingZoneConfigurationOperationsGetSend(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneConfigurationName: string,
  options: LandingZoneConfigurationOperationsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sovereign/landingZoneAccounts/{landingZoneAccountName}/landingZoneConfigurations/{landingZoneConfigurationName}{?api-version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      landingZoneAccountName: landingZoneAccountName,
      landingZoneConfigurationName: landingZoneConfigurationName,
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

export async function _landingZoneConfigurationOperationsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<LandingZoneConfigurationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return landingZoneConfigurationResourceDeserializer(result.body);
}

/** Get a landing zone configuration. */
export async function landingZoneConfigurationOperationsGet(
  context: Client,
  resourceGroupName: string,
  landingZoneAccountName: string,
  landingZoneConfigurationName: string,
  options: LandingZoneConfigurationOperationsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<LandingZoneConfigurationResource> {
  const result = await _landingZoneConfigurationOperationsGetSend(
    context,
    resourceGroupName,
    landingZoneAccountName,
    landingZoneConfigurationName,
    options,
  );
  return _landingZoneConfigurationOperationsGetDeserialize(result);
}
