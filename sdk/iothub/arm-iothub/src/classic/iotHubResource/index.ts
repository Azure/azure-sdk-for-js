// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubContext } from "../../api/iotHubContext.js";
import {
  checkNameAvailability,
  listEventHubConsumerGroups,
  deleteEventHubConsumerGroup,
  createEventHubConsumerGroup,
  getEventHubConsumerGroup,
  getStats,
  importDevices,
  exportDevices,
  getKeysForKeyName,
  listKeys,
  testRoute,
  testAllRoutes,
  listEndpointHealth,
  listQuotaMetrics,
  getJob,
  listJobs,
  listValidSkus,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/iotHubResource/operations.js";
import {
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
} from "../../api/iotHubResource/options.js";
import {
  IotHubDescription,
  SharedAccessSignatureAuthorizationRule,
  TagsResource,
  IotHubSkuDescription,
  JobResponse,
  IotHubQuotaMetricInfo,
  EndpointHealthData,
  TestAllRoutesInput,
  TestAllRoutesResult,
  TestRouteInput,
  TestRouteResult,
  ExportDevicesRequest,
  ImportDevicesRequest,
  RegistryStatistics,
  EventHubConsumerGroupInfo,
  EventHubConsumerGroupBodyDescription,
  OperationInputs,
  IotHubNameAvailabilityInfo,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IotHubResource operations. */
export interface IotHubResourceOperations {
  /** Check if an IoT hub name is available. */
  checkNameAvailability: (
    operationInputs: OperationInputs,
    options?: IotHubResourceCheckNameAvailabilityOptionalParams,
  ) => Promise<IotHubNameAvailabilityInfo>;
  /** Get a list of the consumer groups in the Event Hub-compatible device-to-cloud endpoint in an IoT hub. */
  listEventHubConsumerGroups: (
    resourceGroupName: string,
    resourceName: string,
    eventHubEndpointName: string,
    options?: IotHubResourceListEventHubConsumerGroupsOptionalParams,
  ) => PagedAsyncIterableIterator<EventHubConsumerGroupInfo>;
  /** Delete a consumer group from an Event Hub-compatible endpoint in an IoT hub. */
  deleteEventHubConsumerGroup: (
    resourceGroupName: string,
    resourceName: string,
    eventHubEndpointName: string,
    name: string,
    options?: IotHubResourceDeleteEventHubConsumerGroupOptionalParams,
  ) => Promise<void>;
  /** Add a consumer group to an Event Hub-compatible endpoint in an IoT hub. */
  createEventHubConsumerGroup: (
    resourceGroupName: string,
    resourceName: string,
    eventHubEndpointName: string,
    name: string,
    consumerGroupBody: EventHubConsumerGroupBodyDescription,
    options?: IotHubResourceCreateEventHubConsumerGroupOptionalParams,
  ) => Promise<EventHubConsumerGroupInfo>;
  /** Get a consumer group from the Event Hub-compatible device-to-cloud endpoint for an IoT hub. */
  getEventHubConsumerGroup: (
    resourceGroupName: string,
    resourceName: string,
    eventHubEndpointName: string,
    name: string,
    options?: IotHubResourceGetEventHubConsumerGroupOptionalParams,
  ) => Promise<EventHubConsumerGroupInfo>;
  /** Get the statistics from an IoT hub. */
  getStats: (
    resourceGroupName: string,
    resourceName: string,
    options?: IotHubResourceGetStatsOptionalParams,
  ) => Promise<RegistryStatistics>;
  /** Import, update, or delete device identities in the IoT hub identity registry from a blob. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry#import-and-export-device-identities. */
  importDevices: (
    resourceGroupName: string,
    resourceName: string,
    importDevicesParameters: ImportDevicesRequest,
    options?: IotHubResourceImportDevicesOptionalParams,
  ) => Promise<JobResponse>;
  /** Exports all the device identities in the IoT hub identity registry to an Azure Storage blob container. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry#import-and-export-device-identities. */
  exportDevices: (
    resourceGroupName: string,
    resourceName: string,
    exportDevicesParameters: ExportDevicesRequest,
    options?: IotHubResourceExportDevicesOptionalParams,
  ) => Promise<JobResponse>;
  /** Get a shared access policy by name from an IoT hub. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-security. */
  getKeysForKeyName: (
    resourceGroupName: string,
    resourceName: string,
    keyName: string,
    options?: IotHubResourceGetKeysForKeyNameOptionalParams,
  ) => Promise<SharedAccessSignatureAuthorizationRule>;
  /** Get the security metadata for an IoT hub. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-security. */
  listKeys: (
    resourceGroupName: string,
    resourceName: string,
    options?: IotHubResourceListKeysOptionalParams,
  ) => PagedAsyncIterableIterator<SharedAccessSignatureAuthorizationRule>;
  /** Test the new route for this Iot Hub */
  testRoute: (
    iotHubName: string,
    resourceGroupName: string,
    input: TestRouteInput,
    options?: IotHubResourceTestRouteOptionalParams,
  ) => Promise<TestRouteResult>;
  /** Test all routes configured in this Iot Hub */
  testAllRoutes: (
    iotHubName: string,
    resourceGroupName: string,
    input: TestAllRoutesInput,
    options?: IotHubResourceTestAllRoutesOptionalParams,
  ) => Promise<TestAllRoutesResult>;
  /** Get the health for routing endpoints. */
  listEndpointHealth: (
    resourceGroupName: string,
    iotHubName: string,
    options?: IotHubResourceListEndpointHealthOptionalParams,
  ) => PagedAsyncIterableIterator<EndpointHealthData>;
  /** Get the quota metrics for an IoT hub. */
  listQuotaMetrics: (
    resourceGroupName: string,
    resourceName: string,
    options?: IotHubResourceListQuotaMetricsOptionalParams,
  ) => PagedAsyncIterableIterator<IotHubQuotaMetricInfo>;
  /** Get the details of a job from an IoT hub. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry. */
  getJob: (
    resourceGroupName: string,
    resourceName: string,
    jobId: string,
    options?: IotHubResourceGetJobOptionalParams,
  ) => Promise<JobResponse>;
  /** Get a list of all the jobs in an IoT hub. For more information, see: https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-identity-registry. */
  listJobs: (
    resourceGroupName: string,
    resourceName: string,
    options?: IotHubResourceListJobsOptionalParams,
  ) => PagedAsyncIterableIterator<JobResponse>;
  /** Get the list of valid SKUs for an IoT hub. */
  listValidSkus: (
    resourceGroupName: string,
    resourceName: string,
    options?: IotHubResourceListValidSkusOptionalParams,
  ) => PagedAsyncIterableIterator<IotHubSkuDescription>;
  /** Get all the IoT hubs in a subscription. */
  listBySubscription: (
    options?: IotHubResourceListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<IotHubDescription>;
  /** Get all the IoT hubs in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: IotHubResourceListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<IotHubDescription>;
  /** Delete an IoT hub. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: IotHubResourceDeleteOptionalParams,
  ) => PollerLike<OperationState<IotHubDescription>, IotHubDescription>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    options?: IotHubResourceDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IotHubDescription>, IotHubDescription>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    options?: IotHubResourceDeleteOptionalParams,
  ) => Promise<IotHubDescription>;
  /** Update an existing IoT Hub tags. to update other fields use the CreateOrUpdate method */
  update: (
    resourceGroupName: string,
    resourceName: string,
    iotHubTags: TagsResource,
    options?: IotHubResourceUpdateOptionalParams,
  ) => PollerLike<OperationState<IotHubDescription>, IotHubDescription>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    resourceName: string,
    iotHubTags: TagsResource,
    options?: IotHubResourceUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IotHubDescription>, IotHubDescription>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    iotHubTags: TagsResource,
    options?: IotHubResourceUpdateOptionalParams,
  ) => Promise<IotHubDescription>;
  /** Create or update the metadata of an Iot hub. The usual pattern to modify a property is to retrieve the IoT hub metadata and security metadata, and then combine them with the modified values in a new body to update the IoT hub. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    iotHubDescription: IotHubDescription,
    options?: IotHubResourceCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<IotHubDescription>, IotHubDescription>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    iotHubDescription: IotHubDescription,
    options?: IotHubResourceCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<IotHubDescription>, IotHubDescription>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    iotHubDescription: IotHubDescription,
    options?: IotHubResourceCreateOrUpdateOptionalParams,
  ) => Promise<IotHubDescription>;
  /** Get the non-security related metadata of an IoT hub. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: IotHubResourceGetOptionalParams,
  ) => Promise<IotHubDescription>;
}

function _getIotHubResource(context: IotHubContext) {
  return {
    checkNameAvailability: (
      operationInputs: OperationInputs,
      options?: IotHubResourceCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, operationInputs, options),
    listEventHubConsumerGroups: (
      resourceGroupName: string,
      resourceName: string,
      eventHubEndpointName: string,
      options?: IotHubResourceListEventHubConsumerGroupsOptionalParams,
    ) =>
      listEventHubConsumerGroups(
        context,
        resourceGroupName,
        resourceName,
        eventHubEndpointName,
        options,
      ),
    deleteEventHubConsumerGroup: (
      resourceGroupName: string,
      resourceName: string,
      eventHubEndpointName: string,
      name: string,
      options?: IotHubResourceDeleteEventHubConsumerGroupOptionalParams,
    ) =>
      deleteEventHubConsumerGroup(
        context,
        resourceGroupName,
        resourceName,
        eventHubEndpointName,
        name,
        options,
      ),
    createEventHubConsumerGroup: (
      resourceGroupName: string,
      resourceName: string,
      eventHubEndpointName: string,
      name: string,
      consumerGroupBody: EventHubConsumerGroupBodyDescription,
      options?: IotHubResourceCreateEventHubConsumerGroupOptionalParams,
    ) =>
      createEventHubConsumerGroup(
        context,
        resourceGroupName,
        resourceName,
        eventHubEndpointName,
        name,
        consumerGroupBody,
        options,
      ),
    getEventHubConsumerGroup: (
      resourceGroupName: string,
      resourceName: string,
      eventHubEndpointName: string,
      name: string,
      options?: IotHubResourceGetEventHubConsumerGroupOptionalParams,
    ) =>
      getEventHubConsumerGroup(
        context,
        resourceGroupName,
        resourceName,
        eventHubEndpointName,
        name,
        options,
      ),
    getStats: (
      resourceGroupName: string,
      resourceName: string,
      options?: IotHubResourceGetStatsOptionalParams,
    ) => getStats(context, resourceGroupName, resourceName, options),
    importDevices: (
      resourceGroupName: string,
      resourceName: string,
      importDevicesParameters: ImportDevicesRequest,
      options?: IotHubResourceImportDevicesOptionalParams,
    ) => importDevices(context, resourceGroupName, resourceName, importDevicesParameters, options),
    exportDevices: (
      resourceGroupName: string,
      resourceName: string,
      exportDevicesParameters: ExportDevicesRequest,
      options?: IotHubResourceExportDevicesOptionalParams,
    ) => exportDevices(context, resourceGroupName, resourceName, exportDevicesParameters, options),
    getKeysForKeyName: (
      resourceGroupName: string,
      resourceName: string,
      keyName: string,
      options?: IotHubResourceGetKeysForKeyNameOptionalParams,
    ) => getKeysForKeyName(context, resourceGroupName, resourceName, keyName, options),
    listKeys: (
      resourceGroupName: string,
      resourceName: string,
      options?: IotHubResourceListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, resourceName, options),
    testRoute: (
      iotHubName: string,
      resourceGroupName: string,
      input: TestRouteInput,
      options?: IotHubResourceTestRouteOptionalParams,
    ) => testRoute(context, iotHubName, resourceGroupName, input, options),
    testAllRoutes: (
      iotHubName: string,
      resourceGroupName: string,
      input: TestAllRoutesInput,
      options?: IotHubResourceTestAllRoutesOptionalParams,
    ) => testAllRoutes(context, iotHubName, resourceGroupName, input, options),
    listEndpointHealth: (
      resourceGroupName: string,
      iotHubName: string,
      options?: IotHubResourceListEndpointHealthOptionalParams,
    ) => listEndpointHealth(context, resourceGroupName, iotHubName, options),
    listQuotaMetrics: (
      resourceGroupName: string,
      resourceName: string,
      options?: IotHubResourceListQuotaMetricsOptionalParams,
    ) => listQuotaMetrics(context, resourceGroupName, resourceName, options),
    getJob: (
      resourceGroupName: string,
      resourceName: string,
      jobId: string,
      options?: IotHubResourceGetJobOptionalParams,
    ) => getJob(context, resourceGroupName, resourceName, jobId, options),
    listJobs: (
      resourceGroupName: string,
      resourceName: string,
      options?: IotHubResourceListJobsOptionalParams,
    ) => listJobs(context, resourceGroupName, resourceName, options),
    listValidSkus: (
      resourceGroupName: string,
      resourceName: string,
      options?: IotHubResourceListValidSkusOptionalParams,
    ) => listValidSkus(context, resourceGroupName, resourceName, options),
    listBySubscription: (options?: IotHubResourceListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: IotHubResourceListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: IotHubResourceDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      options?: IotHubResourceDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, resourceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      options?: IotHubResourceDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, options);
    },
    update: (
      resourceGroupName: string,
      resourceName: string,
      iotHubTags: TagsResource,
      options?: IotHubResourceUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, iotHubTags, options),
    beginUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      iotHubTags: TagsResource,
      options?: IotHubResourceUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, resourceName, iotHubTags, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      iotHubTags: TagsResource,
      options?: IotHubResourceUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, resourceName, iotHubTags, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      iotHubDescription: IotHubDescription,
      options?: IotHubResourceCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, iotHubDescription, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      iotHubDescription: IotHubDescription,
      options?: IotHubResourceCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        iotHubDescription,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      iotHubDescription: IotHubDescription,
      options?: IotHubResourceCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        iotHubDescription,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      options?: IotHubResourceGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, options),
  };
}

export function _getIotHubResourceOperations(context: IotHubContext): IotHubResourceOperations {
  return {
    ..._getIotHubResource(context),
  };
}
