// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IotHubContext as Client } from "../index.js";
import type {
  IotHubDescription,
  SharedAccessSignatureAuthorizationRule,
  TagsResource,
  _IotHubDescriptionListResult,
  _IotHubSkuDescriptionListResult,
  IotHubSkuDescription,
  _JobResponseListResult,
  JobResponse,
  _IotHubQuotaMetricInfoListResult,
  IotHubQuotaMetricInfo,
  _EndpointHealthDataListResult,
  EndpointHealthData,
  TestAllRoutesInput,
  TestAllRoutesResult,
  TestRouteInput,
  TestRouteResult,
  _SharedAccessSignatureAuthorizationRuleListResult,
  ExportDevicesRequest,
  ImportDevicesRequest,
  RegistryStatistics,
  EventHubConsumerGroupInfo,
  EventHubConsumerGroupBodyDescription,
  _EventHubConsumerGroupsListResult,
  OperationInputs,
  IotHubNameAvailabilityInfo,
} from "../../models/models.js";
import {
  errorDetailsDeserializer,
  iotHubDescriptionSerializer,
  iotHubDescriptionDeserializer,
  sharedAccessSignatureAuthorizationRuleDeserializer,
  tagsResourceSerializer,
  _iotHubDescriptionListResultDeserializer,
  _iotHubSkuDescriptionListResultDeserializer,
  _jobResponseListResultDeserializer,
  jobResponseDeserializer,
  _iotHubQuotaMetricInfoListResultDeserializer,
  _endpointHealthDataListResultDeserializer,
  testAllRoutesInputSerializer,
  testAllRoutesResultDeserializer,
  testRouteInputSerializer,
  testRouteResultDeserializer,
  _sharedAccessSignatureAuthorizationRuleListResultDeserializer,
  exportDevicesRequestSerializer,
  importDevicesRequestSerializer,
  registryStatisticsDeserializer,
  eventHubConsumerGroupInfoDeserializer,
  eventHubConsumerGroupBodyDescriptionSerializer,
  _eventHubConsumerGroupsListResultDeserializer,
  operationInputsSerializer,
  iotHubNameAvailabilityInfoDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IotHubResourceCheckNameAvailabilityOptionalParams,
  IotHubResourceListEventHubConsumerGroupsOptionalParams,
  IotHubResourceDeleteEventHubConsumerGroupOptionalParams,
  IotHubResourceCreateEventHubConsumerGroupOptionalParams,
  IotHubResourceGetEventHubConsumerGroupOptionalParams,
  IotHubResourceGetStatsOptionalParams,
  IotHubResourceImportDevicesOptionalParams,
  IotHubResourceExportDevicesOptionalParams,
  IotHubResourceGetKeysForKeyNameOptionalParams,
  IotHubResourceListKeysOptionalParams,
  IotHubResourceTestRouteOptionalParams,
  IotHubResourceTestAllRoutesOptionalParams,
  IotHubResourceListEndpointHealthOptionalParams,
  IotHubResourceListQuotaMetricsOptionalParams,
  IotHubResourceGetJobOptionalParams,
  IotHubResourceListJobsOptionalParams,
  IotHubResourceListValidSkusOptionalParams,
  IotHubResourceListBySubscriptionOptionalParams,
  IotHubResourceListByResourceGroupOptionalParams,
  IotHubResourceDeleteOptionalParams,
  IotHubResourceUpdateOptionalParams,
  IotHubResourceCreateOrUpdateOptionalParams,
  IotHubResourceGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  operationInputs: OperationInputs,
  options: IotHubResourceCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Devices/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: operationInputsSerializer(operationInputs),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<IotHubNameAvailabilityInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return iotHubNameAvailabilityInfoDeserializer(result.body);
}

/** Check if an IoT hub name is available. */
export async function checkNameAvailability(
  context: Client,
  operationInputs: OperationInputs,
  options: IotHubResourceCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<IotHubNameAvailabilityInfo> {
  const result = await _checkNameAvailabilitySend(context, operationInputs, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _listEventHubConsumerGroupsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  eventHubEndpointName: string,
  options: IotHubResourceListEventHubConsumerGroupsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/eventHubEndpoints/{eventHubEndpointName}/ConsumerGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      eventHubEndpointName: eventHubEndpointName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _listEventHubConsumerGroupsDeserialize(
  result: PathUncheckedResponse,
): Promise<_EventHubConsumerGroupsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return _eventHubConsumerGroupsListResultDeserializer(result.body);
}

/** Get a list of the consumer groups in the Event Hub-compatible device-to-cloud endpoint in an IoT hub. */
export function listEventHubConsumerGroups(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  eventHubEndpointName: string,
  options: IotHubResourceListEventHubConsumerGroupsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EventHubConsumerGroupInfo> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listEventHubConsumerGroupsSend(
        context,
        resourceGroupName,
        resourceName,
        eventHubEndpointName,
        options,
      ),
    _listEventHubConsumerGroupsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _deleteEventHubConsumerGroupSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  eventHubEndpointName: string,
  name: string,
  options: IotHubResourceDeleteEventHubConsumerGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/eventHubEndpoints/{eventHubEndpointName}/ConsumerGroups/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      eventHubEndpointName: eventHubEndpointName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteEventHubConsumerGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a consumer group from an Event Hub-compatible endpoint in an IoT hub. */
export async function deleteEventHubConsumerGroup(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  eventHubEndpointName: string,
  name: string,
  options: IotHubResourceDeleteEventHubConsumerGroupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteEventHubConsumerGroupSend(
    context,
    resourceGroupName,
    resourceName,
    eventHubEndpointName,
    name,
    options,
  );
  return _deleteEventHubConsumerGroupDeserialize(result);
}

export function _createEventHubConsumerGroupSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  eventHubEndpointName: string,
  name: string,
  consumerGroupBody: EventHubConsumerGroupBodyDescription,
  options: IotHubResourceCreateEventHubConsumerGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/eventHubEndpoints/{eventHubEndpointName}/ConsumerGroups/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      eventHubEndpointName: eventHubEndpointName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: eventHubConsumerGroupBodyDescriptionSerializer(consumerGroupBody),
  });
}

export async function _createEventHubConsumerGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<EventHubConsumerGroupInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return eventHubConsumerGroupInfoDeserializer(result.body);
}

/** Add a consumer group to an Event Hub-compatible endpoint in an IoT hub. */
export async function createEventHubConsumerGroup(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  eventHubEndpointName: string,
  name: string,
  consumerGroupBody: EventHubConsumerGroupBodyDescription,
  options: IotHubResourceCreateEventHubConsumerGroupOptionalParams = { requestOptions: {} },
): Promise<EventHubConsumerGroupInfo> {
  const result = await _createEventHubConsumerGroupSend(
    context,
    resourceGroupName,
    resourceName,
    eventHubEndpointName,
    name,
    consumerGroupBody,
    options,
  );
  return _createEventHubConsumerGroupDeserialize(result);
}

export function _getEventHubConsumerGroupSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  eventHubEndpointName: string,
  name: string,
  options: IotHubResourceGetEventHubConsumerGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/eventHubEndpoints/{eventHubEndpointName}/ConsumerGroups/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      eventHubEndpointName: eventHubEndpointName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _getEventHubConsumerGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<EventHubConsumerGroupInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return eventHubConsumerGroupInfoDeserializer(result.body);
}

/** Get a consumer group from the Event Hub-compatible device-to-cloud endpoint for an IoT hub. */
export async function getEventHubConsumerGroup(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  eventHubEndpointName: string,
  name: string,
  options: IotHubResourceGetEventHubConsumerGroupOptionalParams = { requestOptions: {} },
): Promise<EventHubConsumerGroupInfo> {
  const result = await _getEventHubConsumerGroupSend(
    context,
    resourceGroupName,
    resourceName,
    eventHubEndpointName,
    name,
    options,
  );
  return _getEventHubConsumerGroupDeserialize(result);
}

export function _getStatsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotHubResourceGetStatsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/IotHubStats{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _getStatsDeserialize(
  result: PathUncheckedResponse,
): Promise<RegistryStatistics> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return registryStatisticsDeserializer(result.body);
}

/** Get the statistics from an IoT hub. */
export async function getStats(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotHubResourceGetStatsOptionalParams = { requestOptions: {} },
): Promise<RegistryStatistics> {
  const result = await _getStatsSend(context, resourceGroupName, resourceName, options);
  return _getStatsDeserialize(result);
}

export function _importDevicesSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  importDevicesParameters: ImportDevicesRequest,
  options: IotHubResourceImportDevicesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/importDevices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: importDevicesRequestSerializer(importDevicesParameters),
  });
}

export async function _importDevicesDeserialize(
  result: PathUncheckedResponse,
): Promise<JobResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return jobResponseDeserializer(result.body);
}

/** Import, update, or delete device identities in the IoT hub identity registry from a blob. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry#import-and-export-device-identities. */
export async function importDevices(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  importDevicesParameters: ImportDevicesRequest,
  options: IotHubResourceImportDevicesOptionalParams = { requestOptions: {} },
): Promise<JobResponse> {
  const result = await _importDevicesSend(
    context,
    resourceGroupName,
    resourceName,
    importDevicesParameters,
    options,
  );
  return _importDevicesDeserialize(result);
}

export function _exportDevicesSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  exportDevicesParameters: ExportDevicesRequest,
  options: IotHubResourceExportDevicesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/exportDevices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: exportDevicesRequestSerializer(exportDevicesParameters),
  });
}

export async function _exportDevicesDeserialize(
  result: PathUncheckedResponse,
): Promise<JobResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return jobResponseDeserializer(result.body);
}

/** Exports all the device identities in the IoT hub identity registry to an Azure Storage blob container. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry#import-and-export-device-identities. */
export async function exportDevices(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  exportDevicesParameters: ExportDevicesRequest,
  options: IotHubResourceExportDevicesOptionalParams = { requestOptions: {} },
): Promise<JobResponse> {
  const result = await _exportDevicesSend(
    context,
    resourceGroupName,
    resourceName,
    exportDevicesParameters,
    options,
  );
  return _exportDevicesDeserialize(result);
}

export function _getKeysForKeyNameSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  keyName: string,
  options: IotHubResourceGetKeysForKeyNameOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/IotHubKeys/{keyName}/listkeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      keyName: keyName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getKeysForKeyNameDeserialize(
  result: PathUncheckedResponse,
): Promise<SharedAccessSignatureAuthorizationRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return sharedAccessSignatureAuthorizationRuleDeserializer(result.body);
}

/** Get a shared access policy by name from an IoT hub. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-security. */
export async function getKeysForKeyName(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  keyName: string,
  options: IotHubResourceGetKeysForKeyNameOptionalParams = { requestOptions: {} },
): Promise<SharedAccessSignatureAuthorizationRule> {
  const result = await _getKeysForKeyNameSend(
    context,
    resourceGroupName,
    resourceName,
    keyName,
    options,
  );
  return _getKeysForKeyNameDeserialize(result);
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotHubResourceListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/listkeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<_SharedAccessSignatureAuthorizationRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return _sharedAccessSignatureAuthorizationRuleListResultDeserializer(result.body);
}

/** Get the security metadata for an IoT hub. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-security. */
export function listKeys(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotHubResourceListKeysOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SharedAccessSignatureAuthorizationRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listKeysSend(context, resourceGroupName, resourceName, options),
    _listKeysDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _testRouteSend(
  context: Client,
  iotHubName: string,
  resourceGroupName: string,
  input: TestRouteInput,
  options: IotHubResourceTestRouteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{iotHubName}/routing/routes/$testnew{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      iotHubName: iotHubName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: testRouteInputSerializer(input),
  });
}

export async function _testRouteDeserialize(
  result: PathUncheckedResponse,
): Promise<TestRouteResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return testRouteResultDeserializer(result.body);
}

/** Test the new route for this Iot Hub */
export async function testRoute(
  context: Client,
  iotHubName: string,
  resourceGroupName: string,
  input: TestRouteInput,
  options: IotHubResourceTestRouteOptionalParams = { requestOptions: {} },
): Promise<TestRouteResult> {
  const result = await _testRouteSend(context, iotHubName, resourceGroupName, input, options);
  return _testRouteDeserialize(result);
}

export function _testAllRoutesSend(
  context: Client,
  iotHubName: string,
  resourceGroupName: string,
  input: TestAllRoutesInput,
  options: IotHubResourceTestAllRoutesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{iotHubName}/routing/routes/$testall{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      iotHubName: iotHubName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: testAllRoutesInputSerializer(input),
  });
}

export async function _testAllRoutesDeserialize(
  result: PathUncheckedResponse,
): Promise<TestAllRoutesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return testAllRoutesResultDeserializer(result.body);
}

/** Test all routes configured in this Iot Hub */
export async function testAllRoutes(
  context: Client,
  iotHubName: string,
  resourceGroupName: string,
  input: TestAllRoutesInput,
  options: IotHubResourceTestAllRoutesOptionalParams = { requestOptions: {} },
): Promise<TestAllRoutesResult> {
  const result = await _testAllRoutesSend(context, iotHubName, resourceGroupName, input, options);
  return _testAllRoutesDeserialize(result);
}

export function _listEndpointHealthSend(
  context: Client,
  resourceGroupName: string,
  iotHubName: string,
  options: IotHubResourceListEndpointHealthOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{iotHubName}/routingEndpointsHealth{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      iotHubName: iotHubName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _listEndpointHealthDeserialize(
  result: PathUncheckedResponse,
): Promise<_EndpointHealthDataListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return _endpointHealthDataListResultDeserializer(result.body);
}

/** Get the health for routing endpoints. */
export function listEndpointHealth(
  context: Client,
  resourceGroupName: string,
  iotHubName: string,
  options: IotHubResourceListEndpointHealthOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EndpointHealthData> {
  return buildPagedAsyncIterator(
    context,
    () => _listEndpointHealthSend(context, resourceGroupName, iotHubName, options),
    _listEndpointHealthDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _listQuotaMetricsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotHubResourceListQuotaMetricsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/quotaMetrics{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _listQuotaMetricsDeserialize(
  result: PathUncheckedResponse,
): Promise<_IotHubQuotaMetricInfoListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return _iotHubQuotaMetricInfoListResultDeserializer(result.body);
}

/** Get the quota metrics for an IoT hub. */
export function listQuotaMetrics(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotHubResourceListQuotaMetricsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IotHubQuotaMetricInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listQuotaMetricsSend(context, resourceGroupName, resourceName, options),
    _listQuotaMetricsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _getJobSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  jobId: string,
  options: IotHubResourceGetJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/jobs/{jobId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      jobId: jobId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _getJobDeserialize(result: PathUncheckedResponse): Promise<JobResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return jobResponseDeserializer(result.body);
}

/** Get the details of a job from an IoT hub. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry. */
export async function getJob(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  jobId: string,
  options: IotHubResourceGetJobOptionalParams = { requestOptions: {} },
): Promise<JobResponse> {
  const result = await _getJobSend(context, resourceGroupName, resourceName, jobId, options);
  return _getJobDeserialize(result);
}

export function _listJobsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotHubResourceListJobsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/jobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _listJobsDeserialize(
  result: PathUncheckedResponse,
): Promise<_JobResponseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return _jobResponseListResultDeserializer(result.body);
}

/** Get a list of all the jobs in an IoT hub. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry. */
export function listJobs(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotHubResourceListJobsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JobResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listJobsSend(context, resourceGroupName, resourceName, options),
    _listJobsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _listValidSkusSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotHubResourceListValidSkusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/skus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _listValidSkusDeserialize(
  result: PathUncheckedResponse,
): Promise<_IotHubSkuDescriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return _iotHubSkuDescriptionListResultDeserializer(result.body);
}

/** Get the list of valid SKUs for an IoT hub. */
export function listValidSkus(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotHubResourceListValidSkusOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IotHubSkuDescription> {
  return buildPagedAsyncIterator(
    context,
    () => _listValidSkusSend(context, resourceGroupName, resourceName, options),
    _listValidSkusDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  options: IotHubResourceListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Devices/IotHubs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_IotHubDescriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return _iotHubDescriptionListResultDeserializer(result.body);
}

/** Get all the IoT hubs in a subscription. */
export function listBySubscription(
  context: Client,
  options: IotHubResourceListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IotHubDescription> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: IotHubResourceListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<_IotHubDescriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return _iotHubDescriptionListResultDeserializer(result.body);
}

/** Get all the IoT hubs in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: IotHubResourceListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IotHubDescription> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotHubResourceDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<IotHubDescription> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode === 404) {
      if (result.body) {
        error.details = errorDetailsDeserializer(result.body);
      }
    } else {
      if (result.body) {
        error.details = errorDetailsDeserializer(result.body);
      }
    }
    throw error;
  }

  return iotHubDescriptionDeserializer(result.body);
}

/** Delete an IoT hub. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotHubResourceDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IotHubDescription>, IotHubDescription> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, resourceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<IotHubDescription>, IotHubDescription>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  iotHubTags: TagsResource,
  options: IotHubResourceUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsResourceSerializer(iotHubTags),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<IotHubDescription> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return iotHubDescriptionDeserializer(result.body);
}

/** Update an existing IoT Hub tags. to update other fields use the CreateOrUpdate method */
export function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  iotHubTags: TagsResource,
  options: IotHubResourceUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IotHubDescription>, IotHubDescription> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, resourceName, iotHubTags, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<IotHubDescription>, IotHubDescription>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  iotHubDescription: IotHubDescription,
  options: IotHubResourceCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: iotHubDescriptionSerializer(iotHubDescription),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<IotHubDescription> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return iotHubDescriptionDeserializer(result.body);
}

/** Create or update the metadata of an Iot hub. The usual pattern to modify a property is to retrieve the IoT hub metadata and security metadata, and then combine them with the modified values in a new body to update the IoT hub. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  iotHubDescription: IotHubDescription,
  options: IotHubResourceCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IotHubDescription>, IotHubDescription> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, resourceName, iotHubDescription, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<IotHubDescription>, IotHubDescription>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotHubResourceGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<IotHubDescription> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return iotHubDescriptionDeserializer(result.body);
}

/** Get the non-security related metadata of an IoT hub. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IotHubResourceGetOptionalParams = { requestOptions: {} },
): Promise<IotHubDescription> {
  const result = await _getSend(context, resourceGroupName, resourceName, options);
  return _getDeserialize(result);
}
