// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  WorkloadsContext as Client,
  SAPVirtualInstancesCreateOptionalParams,
  SAPVirtualInstancesDeleteOptionalParams,
  SAPVirtualInstancesGetAvailabilityZoneDetailsOptionalParams,
  SAPVirtualInstancesGetDiskConfigurationsOptionalParams,
  SAPVirtualInstancesGetOptionalParams,
  SAPVirtualInstancesGetSapSupportedSkuOptionalParams,
  SAPVirtualInstancesGetSizingRecommendationsOptionalParams,
  SAPVirtualInstancesListByResourceGroupOptionalParams,
  SAPVirtualInstancesListBySubscriptionOptionalParams,
  SAPVirtualInstancesStartOptionalParams,
  SAPVirtualInstancesStopOptionalParams,
  SAPVirtualInstancesUpdateOptionalParams,
} from "../index.js";
import {
  startRequestSerializer,
  OperationStatusResult,
  operationStatusResultDeserializer,
  stopRequestSerializer,
  SAPVirtualInstance,
  sAPVirtualInstanceSerializer,
  sAPVirtualInstanceDeserializer,
  UpdateSAPVirtualInstanceRequest,
  updateSAPVirtualInstanceRequestSerializer,
  _SAPVirtualInstanceListResult,
  _sAPVirtualInstanceListResultDeserializer,
  SAPSizingRecommendationRequest,
  sAPSizingRecommendationRequestSerializer,
  sAPSizingRecommendationResultUnionDeserializer,
  SAPSizingRecommendationResultUnion,
  SAPSupportedSkusRequest,
  sAPSupportedSkusRequestSerializer,
  SAPSupportedResourceSkusResult,
  sAPSupportedResourceSkusResultDeserializer,
  SAPDiskConfigurationsRequest,
  sAPDiskConfigurationsRequestSerializer,
  SAPDiskConfigurationsResult,
  sAPDiskConfigurationsResultDeserializer,
  SAPAvailabilityZoneDetailsRequest,
  sAPAvailabilityZoneDetailsRequestSerializer,
  SAPAvailabilityZoneDetailsResult,
  sAPAvailabilityZoneDetailsResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _sAPVirtualInstancesGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _sAPVirtualInstancesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPVirtualInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return sAPVirtualInstanceDeserializer(result.body);
}

/** Gets a Virtual Instance for SAP solutions resource */
export async function sAPVirtualInstancesGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesGetOptionalParams = { requestOptions: {} },
): Promise<SAPVirtualInstance> {
  const result = await _sAPVirtualInstancesGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  return _sAPVirtualInstancesGetDeserialize(result);
}

export function _sAPVirtualInstancesCreateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  resource: SAPVirtualInstance,
  options: SAPVirtualInstancesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: sAPVirtualInstanceSerializer(resource),
    });
}

export async function _sAPVirtualInstancesCreateDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPVirtualInstance> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return sAPVirtualInstanceDeserializer(result.body);
}

/** Creates a Virtual Instance for SAP solutions (VIS) resource */
export function sAPVirtualInstancesCreate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  resource: SAPVirtualInstance,
  options: SAPVirtualInstancesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SAPVirtualInstance>, SAPVirtualInstance> {
  return getLongRunningPoller(context, _sAPVirtualInstancesCreateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _sAPVirtualInstancesCreateSend(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<SAPVirtualInstance>, SAPVirtualInstance>;
}

export function _sAPVirtualInstancesUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  properties: UpdateSAPVirtualInstanceRequest,
  options: SAPVirtualInstancesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: updateSAPVirtualInstanceRequestSerializer(properties),
    });
}

export async function _sAPVirtualInstancesUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPVirtualInstance> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return sAPVirtualInstanceDeserializer(result.body);
}

/** Updates a Virtual Instance for SAP solutions resource */
export function sAPVirtualInstancesUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  properties: UpdateSAPVirtualInstanceRequest,
  options: SAPVirtualInstancesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SAPVirtualInstance>, SAPVirtualInstance> {
  return getLongRunningPoller(context, _sAPVirtualInstancesUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _sAPVirtualInstancesUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<SAPVirtualInstance>, SAPVirtualInstance>;
}

export function _sAPVirtualInstancesDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _sAPVirtualInstancesDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes a Virtual Instance for SAP solutions resource and its child resources, that is the associated Central Services Instance, Application Server Instances and Database Instance. */
export function sAPVirtualInstancesDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _sAPVirtualInstancesDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPVirtualInstancesDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _sAPVirtualInstancesListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: SAPVirtualInstancesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _sAPVirtualInstancesListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SAPVirtualInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _sAPVirtualInstanceListResultDeserializer(result.body);
}

/** Gets all Virtual Instances for SAP solutions resources in a Resource Group. */
export function sAPVirtualInstancesListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: SAPVirtualInstancesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SAPVirtualInstance> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _sAPVirtualInstancesListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _sAPVirtualInstancesListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _sAPVirtualInstancesListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: SAPVirtualInstancesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/sapVirtualInstances",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _sAPVirtualInstancesListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SAPVirtualInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _sAPVirtualInstanceListResultDeserializer(result.body);
}

/** Gets all Virtual Instances for SAP solutions resources in a Subscription. */
export function sAPVirtualInstancesListBySubscription(
  context: Client,
  subscriptionId: string,
  options: SAPVirtualInstancesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SAPVirtualInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _sAPVirtualInstancesListBySubscriptionSend(context, subscriptionId, options),
    _sAPVirtualInstancesListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _sAPVirtualInstancesStartSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/start",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: !options["body"] ? options["body"] : startRequestSerializer(options["body"]),
    });
}

export async function _sAPVirtualInstancesStartDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return operationStatusResultDeserializer(result.body);
}

/** Starts the SAP application, that is the Central Services instance and Application server instances. */
export function sAPVirtualInstancesStart(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _sAPVirtualInstancesStartDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _sAPVirtualInstancesStartSend(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _sAPVirtualInstancesStopSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/stop",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: !options["body"] ? options["body"] : stopRequestSerializer(options["body"]),
    });
}

export async function _sAPVirtualInstancesStopDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return operationStatusResultDeserializer(result.body);
}

/** Stops the SAP Application, that is the Application server instances and Central Services instance. */
export function sAPVirtualInstancesStop(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPVirtualInstancesStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _sAPVirtualInstancesStopDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _sAPVirtualInstancesStopSend(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _sAPVirtualInstancesGetSizingRecommendationsSend(
  context: Client,
  subscriptionId: string,
  location: string,
  body: SAPSizingRecommendationRequest,
  options: SAPVirtualInstancesGetSizingRecommendationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getSizingRecommendations",
      subscriptionId,
      location,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: sAPSizingRecommendationRequestSerializer(body),
    });
}

export async function _sAPVirtualInstancesGetSizingRecommendationsDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPSizingRecommendationResultUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return sAPSizingRecommendationResultUnionDeserializer(result.body);
}

/** Gets the sizing recommendations. */
export async function sAPVirtualInstancesGetSizingRecommendations(
  context: Client,
  subscriptionId: string,
  location: string,
  body: SAPSizingRecommendationRequest,
  options: SAPVirtualInstancesGetSizingRecommendationsOptionalParams = {
    requestOptions: {},
  },
): Promise<SAPSizingRecommendationResultUnion> {
  const result = await _sAPVirtualInstancesGetSizingRecommendationsSend(
    context,
    subscriptionId,
    location,
    body,
    options,
  );
  return _sAPVirtualInstancesGetSizingRecommendationsDeserialize(result);
}

export function _sAPVirtualInstancesGetSapSupportedSkuSend(
  context: Client,
  subscriptionId: string,
  location: string,
  body: SAPSupportedSkusRequest,
  options: SAPVirtualInstancesGetSapSupportedSkuOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getSapSupportedSku",
      subscriptionId,
      location,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: sAPSupportedSkusRequestSerializer(body),
    });
}

export async function _sAPVirtualInstancesGetSapSupportedSkuDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPSupportedResourceSkusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return sAPSupportedResourceSkusResultDeserializer(result.body);
}

/** Get a list of SAP supported SKUs for ASCS, Application and Database tier. */
export async function sAPVirtualInstancesGetSapSupportedSku(
  context: Client,
  subscriptionId: string,
  location: string,
  body: SAPSupportedSkusRequest,
  options: SAPVirtualInstancesGetSapSupportedSkuOptionalParams = {
    requestOptions: {},
  },
): Promise<SAPSupportedResourceSkusResult> {
  const result = await _sAPVirtualInstancesGetSapSupportedSkuSend(
    context,
    subscriptionId,
    location,
    body,
    options,
  );
  return _sAPVirtualInstancesGetSapSupportedSkuDeserialize(result);
}

export function _sAPVirtualInstancesGetDiskConfigurationsSend(
  context: Client,
  subscriptionId: string,
  location: string,
  body: SAPDiskConfigurationsRequest,
  options: SAPVirtualInstancesGetDiskConfigurationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getDiskConfigurations",
      subscriptionId,
      location,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: sAPDiskConfigurationsRequestSerializer(body),
    });
}

export async function _sAPVirtualInstancesGetDiskConfigurationsDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPDiskConfigurationsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return sAPDiskConfigurationsResultDeserializer(result.body);
}

/** Get the SAP Disk Configuration Layout prod/non-prod SAP System. */
export async function sAPVirtualInstancesGetDiskConfigurations(
  context: Client,
  subscriptionId: string,
  location: string,
  body: SAPDiskConfigurationsRequest,
  options: SAPVirtualInstancesGetDiskConfigurationsOptionalParams = {
    requestOptions: {},
  },
): Promise<SAPDiskConfigurationsResult> {
  const result = await _sAPVirtualInstancesGetDiskConfigurationsSend(
    context,
    subscriptionId,
    location,
    body,
    options,
  );
  return _sAPVirtualInstancesGetDiskConfigurationsDeserialize(result);
}

export function _sAPVirtualInstancesGetAvailabilityZoneDetailsSend(
  context: Client,
  subscriptionId: string,
  location: string,
  body: SAPAvailabilityZoneDetailsRequest,
  options: SAPVirtualInstancesGetAvailabilityZoneDetailsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Workloads/locations/{location}/sapVirtualInstanceMetadata/default/getAvailabilityZoneDetails",
      subscriptionId,
      location,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: sAPAvailabilityZoneDetailsRequestSerializer(body),
    });
}

export async function _sAPVirtualInstancesGetAvailabilityZoneDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPAvailabilityZoneDetailsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return sAPAvailabilityZoneDetailsResultDeserializer(result.body);
}

/** Get the recommended SAP Availability Zone Pair Details for your region. */
export async function sAPVirtualInstancesGetAvailabilityZoneDetails(
  context: Client,
  subscriptionId: string,
  location: string,
  body: SAPAvailabilityZoneDetailsRequest,
  options: SAPVirtualInstancesGetAvailabilityZoneDetailsOptionalParams = {
    requestOptions: {},
  },
): Promise<SAPAvailabilityZoneDetailsResult> {
  const result = await _sAPVirtualInstancesGetAvailabilityZoneDetailsSend(
    context,
    subscriptionId,
    location,
    body,
    options,
  );
  return _sAPVirtualInstancesGetAvailabilityZoneDetailsDeserialize(result);
}
