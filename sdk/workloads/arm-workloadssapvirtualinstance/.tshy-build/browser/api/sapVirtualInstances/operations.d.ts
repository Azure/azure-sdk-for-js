import { WorkloadsContext as Client } from "../index.js";
import { SAPVirtualInstance, UpdateSAPVirtualInstanceRequest, _SAPVirtualInstanceListResult, OperationStatusResult, SAPSizingRecommendationRequest, SAPSizingRecommendationResultUnion, SAPSupportedSkusRequest, SAPSupportedResourceSkusResult, SAPDiskConfigurationsRequest, SAPDiskConfigurationsResult, SAPAvailabilityZoneDetailsRequest, SAPAvailabilityZoneDetailsResult } from "../../models/models.js";
import { SAPVirtualInstancesGetAvailabilityZoneDetailsOptionalParams, SAPVirtualInstancesGetDiskConfigurationsOptionalParams, SAPVirtualInstancesGetSapSupportedSkuOptionalParams, SAPVirtualInstancesGetSizingRecommendationsOptionalParams, SAPVirtualInstancesStopOptionalParams, SAPVirtualInstancesStartOptionalParams, SAPVirtualInstancesListBySubscriptionOptionalParams, SAPVirtualInstancesListByResourceGroupOptionalParams, SAPVirtualInstancesDeleteOptionalParams, SAPVirtualInstancesUpdateOptionalParams, SAPVirtualInstancesCreateOptionalParams, SAPVirtualInstancesGetOptionalParams } from "./options.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";
export declare function _getAvailabilityZoneDetailsSend(context: Client, location: string, body: SAPAvailabilityZoneDetailsRequest, options?: SAPVirtualInstancesGetAvailabilityZoneDetailsOptionalParams): StreamableMethod;
export declare function _getAvailabilityZoneDetailsDeserialize(result: PathUncheckedResponse): Promise<SAPAvailabilityZoneDetailsResult>;
/** Get the recommended SAP Availability Zone Pair Details for your region. */
export declare function getAvailabilityZoneDetails(context: Client, location: string, body: SAPAvailabilityZoneDetailsRequest, options?: SAPVirtualInstancesGetAvailabilityZoneDetailsOptionalParams): Promise<SAPAvailabilityZoneDetailsResult>;
export declare function _getDiskConfigurationsSend(context: Client, location: string, body: SAPDiskConfigurationsRequest, options?: SAPVirtualInstancesGetDiskConfigurationsOptionalParams): StreamableMethod;
export declare function _getDiskConfigurationsDeserialize(result: PathUncheckedResponse): Promise<SAPDiskConfigurationsResult>;
/** Get the SAP Disk Configuration Layout prod/non-prod SAP System. */
export declare function getDiskConfigurations(context: Client, location: string, body: SAPDiskConfigurationsRequest, options?: SAPVirtualInstancesGetDiskConfigurationsOptionalParams): Promise<SAPDiskConfigurationsResult>;
export declare function _getSapSupportedSkuSend(context: Client, location: string, body: SAPSupportedSkusRequest, options?: SAPVirtualInstancesGetSapSupportedSkuOptionalParams): StreamableMethod;
export declare function _getSapSupportedSkuDeserialize(result: PathUncheckedResponse): Promise<SAPSupportedResourceSkusResult>;
/** Get a list of SAP supported SKUs for ASCS, Application and Database tier. */
export declare function getSapSupportedSku(context: Client, location: string, body: SAPSupportedSkusRequest, options?: SAPVirtualInstancesGetSapSupportedSkuOptionalParams): Promise<SAPSupportedResourceSkusResult>;
export declare function _getSizingRecommendationsSend(context: Client, location: string, body: SAPSizingRecommendationRequest, options?: SAPVirtualInstancesGetSizingRecommendationsOptionalParams): StreamableMethod;
export declare function _getSizingRecommendationsDeserialize(result: PathUncheckedResponse): Promise<SAPSizingRecommendationResultUnion>;
/** Gets the sizing recommendations. */
export declare function getSizingRecommendations(context: Client, location: string, body: SAPSizingRecommendationRequest, options?: SAPVirtualInstancesGetSizingRecommendationsOptionalParams): Promise<SAPSizingRecommendationResultUnion>;
export declare function _stopSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesStopOptionalParams): StreamableMethod;
export declare function _stopDeserialize(result: PathUncheckedResponse): Promise<OperationStatusResult>;
/** Stops the SAP Application, that is the Application server instances and Central Services instance. */
export declare function stop(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesStopOptionalParams): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
export declare function _startSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesStartOptionalParams): StreamableMethod;
export declare function _startDeserialize(result: PathUncheckedResponse): Promise<OperationStatusResult>;
/** Starts the SAP application, that is the Central Services instance and Application server instances. */
export declare function start(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesStartOptionalParams): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
export declare function _listBySubscriptionSend(context: Client, options?: SAPVirtualInstancesListBySubscriptionOptionalParams): StreamableMethod;
export declare function _listBySubscriptionDeserialize(result: PathUncheckedResponse): Promise<_SAPVirtualInstanceListResult>;
/** Gets all Virtual Instances for SAP solutions resources in a Subscription. */
export declare function listBySubscription(context: Client, options?: SAPVirtualInstancesListBySubscriptionOptionalParams): PagedAsyncIterableIterator<SAPVirtualInstance>;
export declare function _listByResourceGroupSend(context: Client, resourceGroupName: string, options?: SAPVirtualInstancesListByResourceGroupOptionalParams): StreamableMethod;
export declare function _listByResourceGroupDeserialize(result: PathUncheckedResponse): Promise<_SAPVirtualInstanceListResult>;
/** Gets all Virtual Instances for SAP solutions resources in a Resource Group. */
export declare function listByResourceGroup(context: Client, resourceGroupName: string, options?: SAPVirtualInstancesListByResourceGroupOptionalParams): PagedAsyncIterableIterator<SAPVirtualInstance>;
export declare function _$deleteSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesDeleteOptionalParams): StreamableMethod;
export declare function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void>;
/** Deletes a Virtual Instance for SAP solutions resource and its child resources, that is the associated Central Services Instance, Application Server Instances and Database Instance. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export declare function $delete(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesDeleteOptionalParams): PollerLike<OperationState<void>, void>;
export declare function _updateSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, properties: UpdateSAPVirtualInstanceRequest, options?: SAPVirtualInstancesUpdateOptionalParams): StreamableMethod;
export declare function _updateDeserialize(result: PathUncheckedResponse): Promise<SAPVirtualInstance>;
/** Updates a Virtual Instance for SAP solutions resource */
export declare function update(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, properties: UpdateSAPVirtualInstanceRequest, options?: SAPVirtualInstancesUpdateOptionalParams): PollerLike<OperationState<SAPVirtualInstance>, SAPVirtualInstance>;
export declare function _createSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, resource: SAPVirtualInstance, options?: SAPVirtualInstancesCreateOptionalParams): StreamableMethod;
export declare function _createDeserialize(result: PathUncheckedResponse): Promise<SAPVirtualInstance>;
/** Creates a Virtual Instance for SAP solutions (VIS) resource */
export declare function create(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, resource: SAPVirtualInstance, options?: SAPVirtualInstancesCreateOptionalParams): PollerLike<OperationState<SAPVirtualInstance>, SAPVirtualInstance>;
export declare function _getSend(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesGetOptionalParams): StreamableMethod;
export declare function _getDeserialize(result: PathUncheckedResponse): Promise<SAPVirtualInstance>;
/** Gets a Virtual Instance for SAP solutions resource */
export declare function get(context: Client, resourceGroupName: string, sapVirtualInstanceName: string, options?: SAPVirtualInstancesGetOptionalParams): Promise<SAPVirtualInstance>;
//# sourceMappingURL=operations.d.ts.map