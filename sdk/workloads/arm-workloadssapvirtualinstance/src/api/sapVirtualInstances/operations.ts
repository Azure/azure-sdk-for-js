// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SAPVirtualInstance,
  sapVirtualInstanceSerializer,
  sapVirtualInstanceDeserializer,
  UpdateSAPVirtualInstanceRequest,
  updateSAPVirtualInstanceRequestSerializer,
  _SAPVirtualInstanceListResult,
  _sapVirtualInstanceListResultDeserializer,
  startRequestSerializer,
  OperationStatusResult,
  operationStatusResultDeserializer,
  stopRequestSerializer,
  SAPSizingRecommendationRequest,
  sapSizingRecommendationRequestSerializer,
  sapSizingRecommendationResultUnionDeserializer,
  SAPSizingRecommendationResultUnion,
  SAPSupportedSkusRequest,
  sapSupportedSkusRequestSerializer,
  SAPSupportedResourceSkusResult,
  sapSupportedResourceSkusResultDeserializer,
  SAPDiskConfigurationsRequest,
  sapDiskConfigurationsRequestSerializer,
  SAPDiskConfigurationsResult,
  sapDiskConfigurationsResultDeserializer,
  SAPAvailabilityZoneDetailsRequest,
  sapAvailabilityZoneDetailsRequestSerializer,
  SAPAvailabilityZoneDetailsResult,
  sapAvailabilityZoneDetailsResultDeserializer,
} from "../../models/models.js";
import {
  SAPVirtualInstancesGetAvailabilityZoneDetailsOptionalParams,
  SAPVirtualInstancesGetDiskConfigurationsOptionalParams,
  SAPVirtualInstancesGetSapSupportedSkuOptionalParams,
  SAPVirtualInstancesGetSizingRecommendationsOptionalParams,
  SAPVirtualInstancesStopOptionalParams,
  SAPVirtualInstancesStartOptionalParams,
  SAPVirtualInstancesListBySubscriptionOptionalParams,
  SAPVirtualInstancesListByResourceGroupOptionalParams,
  SAPVirtualInstancesDeleteOptionalParams,
  SAPVirtualInstancesUpdateOptionalParams,
  SAPVirtualInstancesCreateOptionalParams,
  SAPVirtualInstancesGetOptionalParams,
} from "./options.js";
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

export function _getAvailabilityZoneDetailsSend(
  context: Client,
  location: string,
  body: SAPAvailabilityZoneDetailsRequest,
  options: SAPVirtualInstancesGetAvailabilityZoneDetailsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getAvailabilityZoneDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: sapAvailabilityZoneDetailsRequestSerializer(body),
  });
}

export async function _getAvailabilityZoneDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPAvailabilityZoneDetailsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sapAvailabilityZoneDetailsResultDeserializer(result.body);
}

/** Get the recommended SAP Availability Zone Pair Details for your region. */
export async function getAvailabilityZoneDetails(
  context: Client,
  location: string,
  body: SAPAvailabilityZoneDetailsRequest,
  options: SAPVirtualInstancesGetAvailabilityZoneDetailsOptionalParams = {
    requestOptions: {},
  },
): Promise<SAPAvailabilityZoneDetailsResult> {
  const result = await _getAvailabilityZoneDetailsSend(context, location, body, options);
  return _getAvailabilityZoneDetailsDeserialize(result);
}

export function _getDiskConfigurationsSend(
  context: Client,
  location: string,
  body: SAPDiskConfigurationsRequest,
  options: SAPVirtualInstancesGetDiskConfigurationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getDiskConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: sapDiskConfigurationsRequestSerializer(body),
  });
}

export async function _getDiskConfigurationsDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPDiskConfigurationsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sapDiskConfigurationsResultDeserializer(result.body);
}

/** Get the SAP Disk Configuration Layout prod/non-prod SAP System. */
export async function getDiskConfigurations(
  context: Client,
  location: string,
  body: SAPDiskConfigurationsRequest,
  options: SAPVirtualInstancesGetDiskConfigurationsOptionalParams = {
    requestOptions: {},
  },
): Promise<SAPDiskConfigurationsResult> {
  const result = await _getDiskConfigurationsSend(context, location, body, options);
  return _getDiskConfigurationsDeserialize(result);
}

export function _getSapSupportedSkuSend(
  context: Client,
  location: string,
  body: SAPSupportedSkusRequest,
  options: SAPVirtualInstancesGetSapSupportedSkuOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getSapSupportedSku{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: sapSupportedSkusRequestSerializer(body),
  });
}

export async function _getSapSupportedSkuDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPSupportedResourceSkusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sapSupportedResourceSkusResultDeserializer(result.body);
}

/** Get a list of SAP supported SKUs for ASCS, Application and Database tier. */
export async function getSapSupportedSku(
  context: Client,
  location: string,
  body: SAPSupportedSkusRequest,
  options: SAPVirtualInstancesGetSapSupportedSkuOptionalParams = {
    requestOptions: {},
  },
): Promise<SAPSupportedResourceSkusResult> {
  const result = await _getSapSupportedSkuSend(context, location, body, options);
  return _getSapSupportedSkuDeserialize(result);
}

export function _getSizingRecommendationsSend(
  context: Client,
  location: string,
  body: SAPSizingRecommendationRequest,
  options: SAPVirtualInstancesGetSizingRecommendationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getSizingRecommendations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: sapSizingRecommendationRequestSerializer(body),
  });
}

export async function _getSizingRecommendationsDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPSizingRecommendationResultUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sapSizingRecommendationResultUnionDeserializer(result.body);
}

/** Gets the sizing recommendations. */
export async function getSizingRecommendations(
  context: Client,
  location: string,
  body: SAPSizingRecommendationRequest,
  options: SAPVirtualInstancesGetSizingRecommendationsOptionalParams = {
    requestOptions: {},
  },
): Promise<SAPSizingRecommendationResultUnion> {
  const result = await _getSizingRecommendationsSend(context, location, body, options);
  return _getSizingRecommendationsDeserialize(result);
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapVirtualInstanceName: sapVirtualInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["body"] ? options["body"] : stopRequestSerializer(options["body"]),
  });
}

export async function _stopDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Stops the SAP Application, that is the Application server instances and Central Services instance. */
export function stop(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _stopDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopSend(context, resourceGroupName, sapVirtualInstanceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapVirtualInstanceName: sapVirtualInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["body"] ? options["body"] : startRequestSerializer(options["body"]),
  });
}

export async function _startDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Starts the SAP application, that is the Central Services instance and Application server instances. */
export function start(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startSend(context, resourceGroupName, sapVirtualInstanceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: SAPVirtualInstancesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/sapVirtualInstances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SAPVirtualInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _sapVirtualInstanceListResultDeserializer(result.body);
}

/** Gets all Virtual Instances for SAP solutions resources in a Subscription. */
export function listBySubscription(
  context: Client,
  options: SAPVirtualInstancesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SAPVirtualInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: SAPVirtualInstancesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SAPVirtualInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _sapVirtualInstanceListResultDeserializer(result.body);
}

/** Gets all Virtual Instances for SAP solutions resources in a Resource Group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SAPVirtualInstancesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SAPVirtualInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapVirtualInstanceName: sapVirtualInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a Virtual Instance for SAP solutions resource and its child resources, that is the associated Central Services Instance, Application Server Instances and Database Instance. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, sapVirtualInstanceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  properties: UpdateSAPVirtualInstanceRequest,
  options: SAPVirtualInstancesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapVirtualInstanceName: sapVirtualInstanceName,
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
    body: updateSAPVirtualInstanceRequestSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPVirtualInstance> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sapVirtualInstanceDeserializer(result.body);
}

/** Updates a Virtual Instance for SAP solutions resource */
export function update(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  properties: UpdateSAPVirtualInstanceRequest,
  options: SAPVirtualInstancesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SAPVirtualInstance>, SAPVirtualInstance> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, sapVirtualInstanceName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<SAPVirtualInstance>, SAPVirtualInstance>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  resource: SAPVirtualInstance,
  options: SAPVirtualInstancesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapVirtualInstanceName: sapVirtualInstanceName,
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
    body: sapVirtualInstanceSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPVirtualInstance> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sapVirtualInstanceDeserializer(result.body);
}

/** Creates a Virtual Instance for SAP solutions (VIS) resource */
export function create(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  resource: SAPVirtualInstance,
  options: SAPVirtualInstancesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SAPVirtualInstance>, SAPVirtualInstance> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, sapVirtualInstanceName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<SAPVirtualInstance>, SAPVirtualInstance>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapVirtualInstanceName: sapVirtualInstanceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SAPVirtualInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sapVirtualInstanceDeserializer(result.body);
}

/** Gets a Virtual Instance for SAP solutions resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesGetOptionalParams = { requestOptions: {} },
): Promise<SAPVirtualInstance> {
  const result = await _getSend(context, resourceGroupName, sapVirtualInstanceName, options);
  return _getDeserialize(result);
}
