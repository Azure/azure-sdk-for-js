// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsContext } from "../../api/workloadsContext.js";
import {
  sAPVirtualInstancesGet,
  sAPVirtualInstancesCreate,
  sAPVirtualInstancesUpdate,
  sAPVirtualInstancesDelete,
  sAPVirtualInstancesListByResourceGroup,
  sAPVirtualInstancesListBySubscription,
  sAPVirtualInstancesStart,
  sAPVirtualInstancesStop,
  sAPVirtualInstancesGetSizingRecommendations,
  sAPVirtualInstancesGetSapSupportedSku,
  sAPVirtualInstancesGetDiskConfigurations,
  sAPVirtualInstancesGetAvailabilityZoneDetails,
} from "../../api/sAPVirtualInstances/index.js";
import {
  OperationStatusResult,
  SAPVirtualInstance,
  UpdateSAPVirtualInstanceRequest,
  SAPSizingRecommendationRequest,
  SAPSizingRecommendationResultUnion,
  SAPSupportedSkusRequest,
  SAPSupportedResourceSkusResult,
  SAPDiskConfigurationsRequest,
  SAPDiskConfigurationsResult,
  SAPAvailabilityZoneDetailsRequest,
  SAPAvailabilityZoneDetailsResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  SAPVirtualInstancesGetOptionalParams,
  SAPVirtualInstancesCreateOptionalParams,
  SAPVirtualInstancesUpdateOptionalParams,
  SAPVirtualInstancesDeleteOptionalParams,
  SAPVirtualInstancesListByResourceGroupOptionalParams,
  SAPVirtualInstancesListBySubscriptionOptionalParams,
  SAPVirtualInstancesStartOptionalParams,
  SAPVirtualInstancesStopOptionalParams,
  SAPVirtualInstancesGetSizingRecommendationsOptionalParams,
  SAPVirtualInstancesGetSapSupportedSkuOptionalParams,
  SAPVirtualInstancesGetDiskConfigurationsOptionalParams,
  SAPVirtualInstancesGetAvailabilityZoneDetailsOptionalParams,
} from "../../api/options.js";

/** Interface representing a SAPVirtualInstances operations. */
export interface SAPVirtualInstancesOperations {
  /** Gets a Virtual Instance for SAP solutions resource */
  get: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    options?: SAPVirtualInstancesGetOptionalParams,
  ) => Promise<SAPVirtualInstance>;
  /** Creates a Virtual Instance for SAP solutions (VIS) resource */
  create: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    resource: SAPVirtualInstance,
    options?: SAPVirtualInstancesCreateOptionalParams,
  ) => PollerLike<OperationState<SAPVirtualInstance>, SAPVirtualInstance>;
  /** Updates a Virtual Instance for SAP solutions resource */
  update: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    properties: UpdateSAPVirtualInstanceRequest,
    options?: SAPVirtualInstancesUpdateOptionalParams,
  ) => PollerLike<OperationState<SAPVirtualInstance>, SAPVirtualInstance>;
  /** Deletes a Virtual Instance for SAP solutions resource and its child resources, that is the associated Central Services Instance, Application Server Instances and Database Instance. */
  delete: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    options?: SAPVirtualInstancesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Gets all Virtual Instances for SAP solutions resources in a Resource Group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SAPVirtualInstancesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SAPVirtualInstance>;
  /** Gets all Virtual Instances for SAP solutions resources in a Subscription. */
  listBySubscription: (
    options?: SAPVirtualInstancesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SAPVirtualInstance>;
  /** Starts the SAP application, that is the Central Services instance and Application server instances. */
  start: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    options?: SAPVirtualInstancesStartOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Stops the SAP Application, that is the Application server instances and Central Services instance. */
  stop: (
    resourceGroupName: string,
    sapVirtualInstanceName: string,
    options?: SAPVirtualInstancesStopOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Gets the sizing recommendations. */
  getSizingRecommendations: (
    location: string,
    body: SAPSizingRecommendationRequest,
    options?: SAPVirtualInstancesGetSizingRecommendationsOptionalParams,
  ) => Promise<SAPSizingRecommendationResultUnion>;
  /** Get a list of SAP supported SKUs for ASCS, Application and Database tier. */
  getSapSupportedSku: (
    location: string,
    body: SAPSupportedSkusRequest,
    options?: SAPVirtualInstancesGetSapSupportedSkuOptionalParams,
  ) => Promise<SAPSupportedResourceSkusResult>;
  /** Get the SAP Disk Configuration Layout prod/non-prod SAP System. */
  getDiskConfigurations: (
    location: string,
    body: SAPDiskConfigurationsRequest,
    options?: SAPVirtualInstancesGetDiskConfigurationsOptionalParams,
  ) => Promise<SAPDiskConfigurationsResult>;
  /** Get the recommended SAP Availability Zone Pair Details for your region. */
  getAvailabilityZoneDetails: (
    location: string,
    body: SAPAvailabilityZoneDetailsRequest,
    options?: SAPVirtualInstancesGetAvailabilityZoneDetailsOptionalParams,
  ) => Promise<SAPAvailabilityZoneDetailsResult>;
}

export function getSAPVirtualInstances(context: WorkloadsContext, subscriptionId: string) {
  return {
    get: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      options?: SAPVirtualInstancesGetOptionalParams,
    ) =>
      sAPVirtualInstancesGet(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        options,
      ),
    create: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      resource: SAPVirtualInstance,
      options?: SAPVirtualInstancesCreateOptionalParams,
    ) =>
      sAPVirtualInstancesCreate(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      properties: UpdateSAPVirtualInstanceRequest,
      options?: SAPVirtualInstancesUpdateOptionalParams,
    ) =>
      sAPVirtualInstancesUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      options?: SAPVirtualInstancesDeleteOptionalParams,
    ) =>
      sAPVirtualInstancesDelete(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SAPVirtualInstancesListByResourceGroupOptionalParams,
    ) =>
      sAPVirtualInstancesListByResourceGroup(context, subscriptionId, resourceGroupName, options),
    listBySubscription: (options?: SAPVirtualInstancesListBySubscriptionOptionalParams) =>
      sAPVirtualInstancesListBySubscription(context, subscriptionId, options),
    start: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      options?: SAPVirtualInstancesStartOptionalParams,
    ) =>
      sAPVirtualInstancesStart(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        options,
      ),
    stop: (
      resourceGroupName: string,
      sapVirtualInstanceName: string,
      options?: SAPVirtualInstancesStopOptionalParams,
    ) =>
      sAPVirtualInstancesStop(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        options,
      ),
    getSizingRecommendations: (
      location: string,
      body: SAPSizingRecommendationRequest,
      options?: SAPVirtualInstancesGetSizingRecommendationsOptionalParams,
    ) =>
      sAPVirtualInstancesGetSizingRecommendations(context, subscriptionId, location, body, options),
    getSapSupportedSku: (
      location: string,
      body: SAPSupportedSkusRequest,
      options?: SAPVirtualInstancesGetSapSupportedSkuOptionalParams,
    ) => sAPVirtualInstancesGetSapSupportedSku(context, subscriptionId, location, body, options),
    getDiskConfigurations: (
      location: string,
      body: SAPDiskConfigurationsRequest,
      options?: SAPVirtualInstancesGetDiskConfigurationsOptionalParams,
    ) => sAPVirtualInstancesGetDiskConfigurations(context, subscriptionId, location, body, options),
    getAvailabilityZoneDetails: (
      location: string,
      body: SAPAvailabilityZoneDetailsRequest,
      options?: SAPVirtualInstancesGetAvailabilityZoneDetailsOptionalParams,
    ) =>
      sAPVirtualInstancesGetAvailabilityZoneDetails(
        context,
        subscriptionId,
        location,
        body,
        options,
      ),
  };
}

export function getSAPVirtualInstancesOperations(
  context: WorkloadsContext,
  subscriptionId: string,
): SAPVirtualInstancesOperations {
  return {
    ...getSAPVirtualInstances(context, subscriptionId),
  };
}
