// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import {
  ClusterHealthPolicies,
  ClusterHealthChunkQueryDescription,
  HealthInformation,
  UpgradeOrchestrationServiceState,
  ProvisionFabricDescription,
  UnprovisionFabricDescription,
  ResumeClusterUpgradeDescription,
  StartClusterUpgradeDescription,
  ClusterConfigurationUpgradeDescription,
  UpdateClusterUpgradeDescription,
  ClusterHealthPolicy,
  DeactivationIntentDescription,
  RestartNodeDescription,
  ConfigParameterOverride,
  ProvisionApplicationTypeDescriptionBase,
  UnprovisionApplicationTypeDescriptionInfo,
  ApplicationDescription,
  ApplicationHealthPolicy,
  ApplicationUpgradeDescription,
  ApplicationUpgradeUpdateDescription,
  ApplicationUpdateDescription,
  ResumeApplicationUpgradeDescription,
  ServiceDescription,
  ServiceFromTemplateDescription,
  ServiceUpdateDescription,
  PartitionMetricLoadDescription,
  RepairTask,
  RepairTaskCancelDescription,
  RepairTaskDeleteDescription,
  RepairTaskApproveDescription,
  RepairTaskUpdateHealthPolicyDescription,
  DeployServicePackageToNodeDescription,
  RestartDeployedCodePackageDescription,
  ContainerApiRequestBody,
  CreateComposeDeploymentDescription,
  ComposeDeploymentUpgradeDescription,
  ChaosParameters,
  ChaosScheduleDescription,
  ImageStoreCopyDescription,
  BackupPolicyDescription,
  EnableBackupDescription,
  DisableBackupDescription,
  BackupPartitionDescription,
  RestorePartitionDescription,
  GetBackupByStorageQueryDescription,
  NameDescription,
  PropertyDescription,
  PropertyBatchDescriptionList,
  SecretResourceDescription,
  SecretValueResourceDescription,
  VolumeResourceDescription,
  NetworkResourceDescription,
  ApplicationResourceDescription,
  GatewayResourceDescription,
} from "./models";

export interface GetClusterManifestQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetClusterManifestQueryParam {
  queryParameters?: GetClusterManifestQueryParamProperties;
}

export type GetClusterManifestParameters = GetClusterManifestQueryParam & RequestParameters;

export interface GetClusterHealthQueryParamProperties {
  /**
   * Allows filtering of the node health state objects returned in the result of cluster health query
   * based on their health state. The possible values for this parameter include integer value of one of the
   * following health states. Only nodes that match the filter are returned. All nodes are used to evaluate the aggregated health state.
   * If not specified, all entries are returned.
   * The state values are flag-based enumeration, so the value could be a combination of these values obtained using bitwise 'OR' operator.
   * For example, if the provided value is 6 then health state of nodes with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  NodesHealthStateFilter?: number;
  /**
   * Allows filtering of the application health state objects returned in the result of cluster health
   * query based on their health state.
   * The possible values for this parameter include integer value obtained from members or bitwise operations
   * on members of HealthStateFilter enumeration. Only applications that match the filter are returned.
   * All applications are used to evaluate the aggregated health state. If not specified, all entries are returned.
   * The state values are flag-based enumeration, so the value could be a combination of these values obtained using bitwise 'OR' operator.
   * For example, if the provided value is 6 then health state of applications with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  ApplicationsHealthStateFilter?: number;
  /**
   * Allows filtering the collection of HealthEvent objects returned based on health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only events that match the filter are returned. All events are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values, obtained using the bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  EventsHealthStateFilter?: number;
  /**
   * Indicates whether the health statistics should be returned as part of the query result. False by default.
   * The statistics show the number of children entities in health state Ok, Warning, and Error.
   */
  ExcludeHealthStatistics?: boolean;
  /**
   * Indicates whether the health statistics should include the fabric:/System application health statistics. False by default.
   * If IncludeSystemApplicationHealthStatistics is set to true, the health statistics include the entities that belong to the fabric:/System application.
   * Otherwise, the query result includes health statistics only for user applications.
   * The health statistics must be included in the query result for this parameter to be applied.
   */
  IncludeSystemApplicationHealthStatistics?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetClusterHealthQueryParam {
  queryParameters?: GetClusterHealthQueryParamProperties;
}

export type GetClusterHealthParameters = GetClusterHealthQueryParam & RequestParameters;

export interface GetClusterHealthUsingPolicyBodyParam {
  /**
   * Describes the health policies used to evaluate the cluster health.
   * If not present, the health evaluation uses the cluster health policy defined in the cluster manifest or the default cluster health policy.
   * By default, each application is evaluated using its specific application health policy, defined in the application manifest, or the default health policy, if no policy is defined in manifest.
   * If the application health policy map is specified, and it has an entry for an application, the specified application health policy
   * is used to evaluate the application health.
   */
  body?: ClusterHealthPolicies;
}

export interface GetClusterHealthUsingPolicyQueryParamProperties {
  /**
   * Allows filtering of the node health state objects returned in the result of cluster health query
   * based on their health state. The possible values for this parameter include integer value of one of the
   * following health states. Only nodes that match the filter are returned. All nodes are used to evaluate the aggregated health state.
   * If not specified, all entries are returned.
   * The state values are flag-based enumeration, so the value could be a combination of these values obtained using bitwise 'OR' operator.
   * For example, if the provided value is 6 then health state of nodes with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  NodesHealthStateFilter?: number;
  /**
   * Allows filtering of the application health state objects returned in the result of cluster health
   * query based on their health state.
   * The possible values for this parameter include integer value obtained from members or bitwise operations
   * on members of HealthStateFilter enumeration. Only applications that match the filter are returned.
   * All applications are used to evaluate the aggregated health state. If not specified, all entries are returned.
   * The state values are flag-based enumeration, so the value could be a combination of these values obtained using bitwise 'OR' operator.
   * For example, if the provided value is 6 then health state of applications with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  ApplicationsHealthStateFilter?: number;
  /**
   * Allows filtering the collection of HealthEvent objects returned based on health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only events that match the filter are returned. All events are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values, obtained using the bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  EventsHealthStateFilter?: number;
  /**
   * Indicates whether the health statistics should be returned as part of the query result. False by default.
   * The statistics show the number of children entities in health state Ok, Warning, and Error.
   */
  ExcludeHealthStatistics?: boolean;
  /**
   * Indicates whether the health statistics should include the fabric:/System application health statistics. False by default.
   * If IncludeSystemApplicationHealthStatistics is set to true, the health statistics include the entities that belong to the fabric:/System application.
   * Otherwise, the query result includes health statistics only for user applications.
   * The health statistics must be included in the query result for this parameter to be applied.
   */
  IncludeSystemApplicationHealthStatistics?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetClusterHealthUsingPolicyQueryParam {
  queryParameters?: GetClusterHealthUsingPolicyQueryParamProperties;
}

export interface GetClusterHealthUsingPolicyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetClusterHealthUsingPolicyParameters = GetClusterHealthUsingPolicyQueryParam &
  GetClusterHealthUsingPolicyMediaTypesParam &
  GetClusterHealthUsingPolicyBodyParam &
  RequestParameters;

export interface GetClusterHealthChunkQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetClusterHealthChunkQueryParam {
  queryParameters?: GetClusterHealthChunkQueryParamProperties;
}

export type GetClusterHealthChunkParameters = GetClusterHealthChunkQueryParam & RequestParameters;

export interface GetClusterHealthChunkUsingPolicyAndAdvancedFiltersBodyParam {
  /**
   * Describes the cluster and application health policies used to evaluate the cluster health and the filters to select which cluster entities to be returned.
   * If the cluster health policy is present, it is used to evaluate the cluster events and the cluster nodes. If not present, the health evaluation uses the cluster health policy defined in the cluster manifest or the default cluster health policy.
   * By default, each application is evaluated using its specific application health policy, defined in the application manifest, or the default health policy, if no policy is defined in manifest.
   * If the application health policy map is specified, and it has an entry for an application, the specified application health policy
   * is used to evaluate the application health.
   * Users can specify very flexible filters to select which cluster entities to include in response. The selection can be done based on the entities health state and based on the hierarchy.
   * The query can return multi-level children of the entities based on the specified filters. For example, it can return one application with a specified name, and for this application, return
   * only services that are in Error or Warning, and all partitions and replicas for one of these services.
   */
  body?: ClusterHealthChunkQueryDescription;
}

export interface GetClusterHealthChunkUsingPolicyAndAdvancedFiltersQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetClusterHealthChunkUsingPolicyAndAdvancedFiltersQueryParam {
  queryParameters?: GetClusterHealthChunkUsingPolicyAndAdvancedFiltersQueryParamProperties;
}

export interface GetClusterHealthChunkUsingPolicyAndAdvancedFiltersMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetClusterHealthChunkUsingPolicyAndAdvancedFiltersParameters = GetClusterHealthChunkUsingPolicyAndAdvancedFiltersQueryParam &
  GetClusterHealthChunkUsingPolicyAndAdvancedFiltersMediaTypesParam &
  GetClusterHealthChunkUsingPolicyAndAdvancedFiltersBodyParam &
  RequestParameters;

export interface ReportClusterHealthBodyParam {
  /** Describes the health information for the health report. This information needs to be present in all of the health reports sent to the health manager. */
  body: HealthInformation;
}

export interface ReportClusterHealthQueryParamProperties {
  /**
   * A flag that indicates whether the report should be sent immediately.
   * A health report is sent to a Service Fabric gateway Application, which forwards to the health store.
   * If Immediate is set to true, the report is sent immediately from HTTP Gateway to the health store, regardless of the fabric client settings that the HTTP Gateway Application is using.
   * This is useful for critical reports that should be sent as soon as possible.
   * Depending on timing and other conditions, sending the report may still fail, for example if the HTTP Gateway is closed or the message doesn't reach the Gateway.
   * If Immediate is set to false, the report is sent based on the health client settings from the HTTP Gateway. Therefore, it will be batched according to the HealthReportSendInterval configuration.
   * This is the recommended setting because it allows the health client to optimize health reporting messages to health store as well as health report processing.
   * By default, reports are not sent immediately.
   */
  Immediate?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ReportClusterHealthQueryParam {
  queryParameters?: ReportClusterHealthQueryParamProperties;
}

export interface ReportClusterHealthMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ReportClusterHealthParameters = ReportClusterHealthQueryParam &
  ReportClusterHealthMediaTypesParam &
  ReportClusterHealthBodyParam &
  RequestParameters;

export interface GetProvisionedFabricCodeVersionInfoListQueryParamProperties {
  /** The product version of Service Fabric. */
  CodeVersion?: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetProvisionedFabricCodeVersionInfoListQueryParam {
  queryParameters?: GetProvisionedFabricCodeVersionInfoListQueryParamProperties;
}

export type GetProvisionedFabricCodeVersionInfoListParameters = GetProvisionedFabricCodeVersionInfoListQueryParam &
  RequestParameters;

export interface GetProvisionedFabricConfigVersionInfoListQueryParamProperties {
  /** The config version of Service Fabric. */
  ConfigVersion?: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetProvisionedFabricConfigVersionInfoListQueryParam {
  queryParameters?: GetProvisionedFabricConfigVersionInfoListQueryParamProperties;
}

export type GetProvisionedFabricConfigVersionInfoListParameters = GetProvisionedFabricConfigVersionInfoListQueryParam &
  RequestParameters;

export interface GetClusterUpgradeProgressQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetClusterUpgradeProgressQueryParam {
  queryParameters?: GetClusterUpgradeProgressQueryParamProperties;
}

export type GetClusterUpgradeProgressParameters = GetClusterUpgradeProgressQueryParam &
  RequestParameters;

export interface GetClusterConfigurationQueryParamProperties {
  /** The API version of the Standalone cluster json configuration. */
  ConfigurationApiVersion: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetClusterConfigurationQueryParam {
  queryParameters: GetClusterConfigurationQueryParamProperties;
}

export type GetClusterConfigurationParameters = GetClusterConfigurationQueryParam &
  RequestParameters;

export interface GetClusterConfigurationUpgradeStatusQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetClusterConfigurationUpgradeStatusQueryParam {
  queryParameters?: GetClusterConfigurationUpgradeStatusQueryParamProperties;
}

export type GetClusterConfigurationUpgradeStatusParameters = GetClusterConfigurationUpgradeStatusQueryParam &
  RequestParameters;

export interface GetUpgradeOrchestrationServiceStateQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetUpgradeOrchestrationServiceStateQueryParam {
  queryParameters?: GetUpgradeOrchestrationServiceStateQueryParamProperties;
}

export type GetUpgradeOrchestrationServiceStateParameters = GetUpgradeOrchestrationServiceStateQueryParam &
  RequestParameters;

export interface SetUpgradeOrchestrationServiceStateBodyParam {
  /** Service state of Service Fabric Upgrade Orchestration Service. */
  body: UpgradeOrchestrationServiceState;
}

export interface SetUpgradeOrchestrationServiceStateQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface SetUpgradeOrchestrationServiceStateQueryParam {
  queryParameters?: SetUpgradeOrchestrationServiceStateQueryParamProperties;
}

export interface SetUpgradeOrchestrationServiceStateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SetUpgradeOrchestrationServiceStateParameters = SetUpgradeOrchestrationServiceStateQueryParam &
  SetUpgradeOrchestrationServiceStateMediaTypesParam &
  SetUpgradeOrchestrationServiceStateBodyParam &
  RequestParameters;

export interface ProvisionClusterBodyParam {
  /** Describes the parameters for provisioning a cluster. */
  body: ProvisionFabricDescription;
}

export interface ProvisionClusterQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ProvisionClusterQueryParam {
  queryParameters?: ProvisionClusterQueryParamProperties;
}

export interface ProvisionClusterMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ProvisionClusterParameters = ProvisionClusterQueryParam &
  ProvisionClusterMediaTypesParam &
  ProvisionClusterBodyParam &
  RequestParameters;

export interface UnprovisionClusterBodyParam {
  /** Describes the parameters for unprovisioning a cluster. */
  body: UnprovisionFabricDescription;
}

export interface UnprovisionClusterQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface UnprovisionClusterQueryParam {
  queryParameters?: UnprovisionClusterQueryParamProperties;
}

export interface UnprovisionClusterMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type UnprovisionClusterParameters = UnprovisionClusterQueryParam &
  UnprovisionClusterMediaTypesParam &
  UnprovisionClusterBodyParam &
  RequestParameters;

export interface RollbackClusterUpgradeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface RollbackClusterUpgradeQueryParam {
  queryParameters?: RollbackClusterUpgradeQueryParamProperties;
}

export type RollbackClusterUpgradeParameters = RollbackClusterUpgradeQueryParam & RequestParameters;

export interface ResumeClusterUpgradeBodyParam {
  /** Describes the parameters for resuming a cluster upgrade. */
  body: ResumeClusterUpgradeDescription;
}

export interface ResumeClusterUpgradeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ResumeClusterUpgradeQueryParam {
  queryParameters?: ResumeClusterUpgradeQueryParamProperties;
}

export interface ResumeClusterUpgradeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ResumeClusterUpgradeParameters = ResumeClusterUpgradeQueryParam &
  ResumeClusterUpgradeMediaTypesParam &
  ResumeClusterUpgradeBodyParam &
  RequestParameters;

export interface StartClusterUpgradeBodyParam {
  /** Describes the parameters for starting a cluster upgrade. */
  body: StartClusterUpgradeDescription;
}

export interface StartClusterUpgradeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface StartClusterUpgradeQueryParam {
  queryParameters?: StartClusterUpgradeQueryParamProperties;
}

export interface StartClusterUpgradeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StartClusterUpgradeParameters = StartClusterUpgradeQueryParam &
  StartClusterUpgradeMediaTypesParam &
  StartClusterUpgradeBodyParam &
  RequestParameters;

export interface StartClusterConfigurationUpgradeBodyParam {
  /** Parameters for a standalone cluster configuration upgrade. */
  body: ClusterConfigurationUpgradeDescription;
}

export interface StartClusterConfigurationUpgradeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface StartClusterConfigurationUpgradeQueryParam {
  queryParameters?: StartClusterConfigurationUpgradeQueryParamProperties;
}

export interface StartClusterConfigurationUpgradeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StartClusterConfigurationUpgradeParameters = StartClusterConfigurationUpgradeQueryParam &
  StartClusterConfigurationUpgradeMediaTypesParam &
  StartClusterConfigurationUpgradeBodyParam &
  RequestParameters;

export interface UpdateClusterUpgradeBodyParam {
  /** Parameters for updating a cluster upgrade. */
  body: UpdateClusterUpgradeDescription;
}

export interface UpdateClusterUpgradeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface UpdateClusterUpgradeQueryParam {
  queryParameters?: UpdateClusterUpgradeQueryParamProperties;
}

export interface UpdateClusterUpgradeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type UpdateClusterUpgradeParameters = UpdateClusterUpgradeQueryParam &
  UpdateClusterUpgradeMediaTypesParam &
  UpdateClusterUpgradeBodyParam &
  RequestParameters;

export interface GetAadMetadataQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetAadMetadataQueryParam {
  queryParameters?: GetAadMetadataQueryParamProperties;
}

export type GetAadMetadataParameters = GetAadMetadataQueryParam & RequestParameters;

export interface GetClusterVersionQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetClusterVersionQueryParam {
  queryParameters?: GetClusterVersionQueryParamProperties;
}

export type GetClusterVersionParameters = GetClusterVersionQueryParam & RequestParameters;

export interface GetClusterLoadQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetClusterLoadQueryParam {
  queryParameters?: GetClusterLoadQueryParamProperties;
}

export type GetClusterLoadParameters = GetClusterLoadQueryParam & RequestParameters;

export interface ToggleVerboseServicePlacementHealthReportingQueryParamProperties {
  /** The verbosity of service placement health reporting. */
  Enabled: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ToggleVerboseServicePlacementHealthReportingQueryParam {
  queryParameters: ToggleVerboseServicePlacementHealthReportingQueryParamProperties;
}

export type ToggleVerboseServicePlacementHealthReportingParameters = ToggleVerboseServicePlacementHealthReportingQueryParam &
  RequestParameters;

export interface GetNodeInfoListQueryParamProperties {
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** Allows filtering the nodes based on the NodeStatus. Only the nodes that are matching the specified filter value will be returned. The filter value can be one of the following. */
  NodeStatusFilter?:
    | "default"
    | "all"
    | "up"
    | "down"
    | "enabling"
    | "disabling"
    | "disabled"
    | "unknown"
    | "removed";
  /** The maximum number of results to be returned as part of the paged queries. This parameter defines the upper bound on the number of results returned. The results returned can be less than the specified maximum results if they do not fit in the message as per the max message size restrictions defined in the configuration. If this parameter is zero or not specified, the paged query includes as many results as possible that fit in the return message. */
  MaxResults?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetNodeInfoListQueryParam {
  queryParameters?: GetNodeInfoListQueryParamProperties;
}

export type GetNodeInfoListParameters = GetNodeInfoListQueryParam & RequestParameters;

export interface GetNodeInfoQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetNodeInfoQueryParam {
  queryParameters?: GetNodeInfoQueryParamProperties;
}

export type GetNodeInfoParameters = GetNodeInfoQueryParam & RequestParameters;

export interface GetNodeHealthQueryParamProperties {
  /**
   * Allows filtering the collection of HealthEvent objects returned based on health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only events that match the filter are returned. All events are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values, obtained using the bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  EventsHealthStateFilter?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetNodeHealthQueryParam {
  queryParameters?: GetNodeHealthQueryParamProperties;
}

export type GetNodeHealthParameters = GetNodeHealthQueryParam & RequestParameters;

export interface GetNodeHealthUsingPolicyBodyParam {
  /** Describes the health policies used to evaluate the health of a cluster or node. If not present, the health evaluation uses the health policy from cluster manifest or the default health policy. */
  body?: ClusterHealthPolicy;
}

export interface GetNodeHealthUsingPolicyQueryParamProperties {
  /**
   * Allows filtering the collection of HealthEvent objects returned based on health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only events that match the filter are returned. All events are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values, obtained using the bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  EventsHealthStateFilter?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetNodeHealthUsingPolicyQueryParam {
  queryParameters?: GetNodeHealthUsingPolicyQueryParamProperties;
}

export interface GetNodeHealthUsingPolicyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetNodeHealthUsingPolicyParameters = GetNodeHealthUsingPolicyQueryParam &
  GetNodeHealthUsingPolicyMediaTypesParam &
  GetNodeHealthUsingPolicyBodyParam &
  RequestParameters;

export interface ReportNodeHealthBodyParam {
  /** Describes the health information for the health report. This information needs to be present in all of the health reports sent to the health manager. */
  body: HealthInformation;
}

export interface ReportNodeHealthQueryParamProperties {
  /**
   * A flag that indicates whether the report should be sent immediately.
   * A health report is sent to a Service Fabric gateway Application, which forwards to the health store.
   * If Immediate is set to true, the report is sent immediately from HTTP Gateway to the health store, regardless of the fabric client settings that the HTTP Gateway Application is using.
   * This is useful for critical reports that should be sent as soon as possible.
   * Depending on timing and other conditions, sending the report may still fail, for example if the HTTP Gateway is closed or the message doesn't reach the Gateway.
   * If Immediate is set to false, the report is sent based on the health client settings from the HTTP Gateway. Therefore, it will be batched according to the HealthReportSendInterval configuration.
   * This is the recommended setting because it allows the health client to optimize health reporting messages to health store as well as health report processing.
   * By default, reports are not sent immediately.
   */
  Immediate?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ReportNodeHealthQueryParam {
  queryParameters?: ReportNodeHealthQueryParamProperties;
}

export interface ReportNodeHealthMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ReportNodeHealthParameters = ReportNodeHealthQueryParam &
  ReportNodeHealthMediaTypesParam &
  ReportNodeHealthBodyParam &
  RequestParameters;

export interface GetNodeLoadInfoQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetNodeLoadInfoQueryParam {
  queryParameters?: GetNodeLoadInfoQueryParamProperties;
}

export type GetNodeLoadInfoParameters = GetNodeLoadInfoQueryParam & RequestParameters;

export interface DisableNodeBodyParam {
  /** Describes the intent or reason for deactivating the node. */
  body: DeactivationIntentDescription;
}

export interface DisableNodeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface DisableNodeQueryParam {
  queryParameters?: DisableNodeQueryParamProperties;
}

export interface DisableNodeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DisableNodeParameters = DisableNodeQueryParam &
  DisableNodeMediaTypesParam &
  DisableNodeBodyParam &
  RequestParameters;

export interface EnableNodeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface EnableNodeQueryParam {
  queryParameters?: EnableNodeQueryParamProperties;
}

export type EnableNodeParameters = EnableNodeQueryParam & RequestParameters;

export interface RemoveNodeStateQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface RemoveNodeStateQueryParam {
  queryParameters?: RemoveNodeStateQueryParamProperties;
}

export type RemoveNodeStateParameters = RemoveNodeStateQueryParam & RequestParameters;

export interface RestartNodeBodyParam {
  /** The instance of the node to be restarted and a flag indicating the need to take dump of the fabric process. */
  body: RestartNodeDescription;
}

export interface RestartNodeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface RestartNodeQueryParam {
  queryParameters?: RestartNodeQueryParamProperties;
}

export interface RestartNodeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RestartNodeParameters = RestartNodeQueryParam &
  RestartNodeMediaTypesParam &
  RestartNodeBodyParam &
  RequestParameters;

export interface RemoveConfigurationOverridesQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface RemoveConfigurationOverridesQueryParam {
  queryParameters?: RemoveConfigurationOverridesQueryParamProperties;
}

export type RemoveConfigurationOverridesParameters = RemoveConfigurationOverridesQueryParam &
  RequestParameters;

export interface GetConfigurationOverridesQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetConfigurationOverridesQueryParam {
  queryParameters?: GetConfigurationOverridesQueryParamProperties;
}

export type GetConfigurationOverridesParameters = GetConfigurationOverridesQueryParam &
  RequestParameters;

export interface AddConfigurationParameterOverridesBodyParam {
  /** Description for adding list of configuration overrides. */
  body: Array<ConfigParameterOverride>;
}

export interface AddConfigurationParameterOverridesQueryParamProperties {
  /** Force adding configuration overrides on specified nodes. */
  Force?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface AddConfigurationParameterOverridesQueryParam {
  queryParameters?: AddConfigurationParameterOverridesQueryParamProperties;
}

export interface AddConfigurationParameterOverridesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AddConfigurationParameterOverridesParameters = AddConfigurationParameterOverridesQueryParam &
  AddConfigurationParameterOverridesMediaTypesParam &
  AddConfigurationParameterOverridesBodyParam &
  RequestParameters;

export interface RemoveNodeTagsBodyParam {
  /** Description for adding list of node tags. */
  body: Array<string>;
}

export interface RemoveNodeTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RemoveNodeTagsParameters = RemoveNodeTagsMediaTypesParam &
  RemoveNodeTagsBodyParam &
  RequestParameters;

export interface AddNodeTagsBodyParam {
  /** Description for adding list of node tags. */
  body: Array<string>;
}

export interface AddNodeTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AddNodeTagsParameters = AddNodeTagsMediaTypesParam &
  AddNodeTagsBodyParam &
  RequestParameters;

export interface GetApplicationTypeInfoListQueryParamProperties {
  /**
   * Used to filter on ApplicationTypeDefinitionKind which is the mechanism used to define a Service Fabric application type.
   * - Default - Default value, which performs the same function as selecting "All". The value is 0.
   * - All - Filter that matches input with any ApplicationTypeDefinitionKind value. The value is 65535.
   * - ServiceFabricApplicationPackage - Filter that matches input with ApplicationTypeDefinitionKind value ServiceFabricApplicationPackage. The value is 1.
   * - Compose - Filter that matches input with ApplicationTypeDefinitionKind value Compose. The value is 2.
   */
  ApplicationTypeDefinitionKindFilter?: number;
  /** The flag that specifies whether application parameters will be excluded from the result. */
  ExcludeApplicationParameters?: boolean;
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The maximum number of results to be returned as part of the paged queries. This parameter defines the upper bound on the number of results returned. The results returned can be less than the specified maximum results if they do not fit in the message as per the max message size restrictions defined in the configuration. If this parameter is zero or not specified, the paged query includes as many results as possible that fit in the return message. */
  MaxResults?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetApplicationTypeInfoListQueryParam {
  queryParameters?: GetApplicationTypeInfoListQueryParamProperties;
}

export type GetApplicationTypeInfoListParameters = GetApplicationTypeInfoListQueryParam &
  RequestParameters;

export interface GetApplicationTypeInfoListByNameQueryParamProperties {
  /** The version of the application type. */
  ApplicationTypeVersion?: string;
  /** The flag that specifies whether application parameters will be excluded from the result. */
  ExcludeApplicationParameters?: boolean;
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The maximum number of results to be returned as part of the paged queries. This parameter defines the upper bound on the number of results returned. The results returned can be less than the specified maximum results if they do not fit in the message as per the max message size restrictions defined in the configuration. If this parameter is zero or not specified, the paged query includes as many results as possible that fit in the return message. */
  MaxResults?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetApplicationTypeInfoListByNameQueryParam {
  queryParameters?: GetApplicationTypeInfoListByNameQueryParamProperties;
}

export type GetApplicationTypeInfoListByNameParameters = GetApplicationTypeInfoListByNameQueryParam &
  RequestParameters;

export interface ProvisionApplicationTypeBodyParam {
  /** The base type of provision application type description which supports either image store-based provision or external store-based provision. */
  body: ProvisionApplicationTypeDescriptionBase;
}

export interface ProvisionApplicationTypeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ProvisionApplicationTypeQueryParam {
  queryParameters?: ProvisionApplicationTypeQueryParamProperties;
}

export interface ProvisionApplicationTypeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ProvisionApplicationTypeParameters = ProvisionApplicationTypeQueryParam &
  ProvisionApplicationTypeMediaTypesParam &
  ProvisionApplicationTypeBodyParam &
  RequestParameters;

export interface UnprovisionApplicationTypeBodyParam {
  /** The relative path for the application package in the image store specified during the prior copy operation. */
  body: UnprovisionApplicationTypeDescriptionInfo;
}

export interface UnprovisionApplicationTypeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface UnprovisionApplicationTypeQueryParam {
  queryParameters?: UnprovisionApplicationTypeQueryParamProperties;
}

export interface UnprovisionApplicationTypeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type UnprovisionApplicationTypeParameters = UnprovisionApplicationTypeQueryParam &
  UnprovisionApplicationTypeMediaTypesParam &
  UnprovisionApplicationTypeBodyParam &
  RequestParameters;

export interface GetServiceTypeInfoListQueryParamProperties {
  /** The version of the application type. */
  ApplicationTypeVersion: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetServiceTypeInfoListQueryParam {
  queryParameters: GetServiceTypeInfoListQueryParamProperties;
}

export type GetServiceTypeInfoListParameters = GetServiceTypeInfoListQueryParam & RequestParameters;

export interface GetServiceTypeInfoByNameQueryParamProperties {
  /** The version of the application type. */
  ApplicationTypeVersion: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetServiceTypeInfoByNameQueryParam {
  queryParameters: GetServiceTypeInfoByNameQueryParamProperties;
}

export type GetServiceTypeInfoByNameParameters = GetServiceTypeInfoByNameQueryParam &
  RequestParameters;

export interface GetServiceManifestQueryParamProperties {
  /** The version of the application type. */
  ApplicationTypeVersion: string;
  /** The name of a service manifest registered as part of an application type in a Service Fabric cluster. */
  ServiceManifestName: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetServiceManifestQueryParam {
  queryParameters: GetServiceManifestQueryParamProperties;
}

export type GetServiceManifestParameters = GetServiceManifestQueryParam & RequestParameters;

export interface GetDeployedServiceTypeInfoListQueryParamProperties {
  /** The name of the service manifest to filter the list of deployed service type information. If specified, the response will only contain the information about service types that are defined in this service manifest. */
  ServiceManifestName?: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetDeployedServiceTypeInfoListQueryParam {
  queryParameters?: GetDeployedServiceTypeInfoListQueryParamProperties;
}

export type GetDeployedServiceTypeInfoListParameters = GetDeployedServiceTypeInfoListQueryParam &
  RequestParameters;

export interface GetDeployedServiceTypeInfoByNameQueryParamProperties {
  /** The name of the service manifest to filter the list of deployed service type information. If specified, the response will only contain the information about service types that are defined in this service manifest. */
  ServiceManifestName?: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetDeployedServiceTypeInfoByNameQueryParam {
  queryParameters?: GetDeployedServiceTypeInfoByNameQueryParamProperties;
}

export type GetDeployedServiceTypeInfoByNameParameters = GetDeployedServiceTypeInfoByNameQueryParam &
  RequestParameters;

export interface CreateApplicationBodyParam {
  /** Description for creating an application. */
  body: ApplicationDescription;
}

export interface CreateApplicationQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface CreateApplicationQueryParam {
  queryParameters?: CreateApplicationQueryParamProperties;
}

export interface CreateApplicationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateApplicationParameters = CreateApplicationQueryParam &
  CreateApplicationMediaTypesParam &
  CreateApplicationBodyParam &
  RequestParameters;

export interface DeleteApplicationQueryParamProperties {
  /** Remove a Service Fabric application or service forcefully without going through the graceful shutdown sequence. This parameter can be used to forcefully delete an application or service for which delete is timing out due to issues in the service code that prevents graceful close of replicas. */
  ForceRemove?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface DeleteApplicationQueryParam {
  queryParameters?: DeleteApplicationQueryParamProperties;
}

export type DeleteApplicationParameters = DeleteApplicationQueryParam & RequestParameters;

export interface GetApplicationLoadInfoQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetApplicationLoadInfoQueryParam {
  queryParameters?: GetApplicationLoadInfoQueryParamProperties;
}

export type GetApplicationLoadInfoParameters = GetApplicationLoadInfoQueryParam & RequestParameters;

export interface GetApplicationInfoListQueryParamProperties {
  /**
   * Used to filter on ApplicationDefinitionKind, which is the mechanism used to define a Service Fabric application.
   * - Default - Default value, which performs the same function as selecting "All". The value is 0.
   * - All - Filter that matches input with any ApplicationDefinitionKind value. The value is 65535.
   * - ServiceFabricApplicationDescription - Filter that matches input with ApplicationDefinitionKind value ServiceFabricApplicationDescription. The value is 1.
   * - Compose - Filter that matches input with ApplicationDefinitionKind value Compose. The value is 2.
   */
  ApplicationDefinitionKindFilter?: number;
  /** The application type name used to filter the applications to query for. This value should not contain the application type version. */
  ApplicationTypeName?: string;
  /** The flag that specifies whether application parameters will be excluded from the result. */
  ExcludeApplicationParameters?: boolean;
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The maximum number of results to be returned as part of the paged queries. This parameter defines the upper bound on the number of results returned. The results returned can be less than the specified maximum results if they do not fit in the message as per the max message size restrictions defined in the configuration. If this parameter is zero or not specified, the paged query includes as many results as possible that fit in the return message. */
  MaxResults?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetApplicationInfoListQueryParam {
  queryParameters?: GetApplicationInfoListQueryParamProperties;
}

export type GetApplicationInfoListParameters = GetApplicationInfoListQueryParam & RequestParameters;

export interface GetApplicationInfoQueryParamProperties {
  /** The flag that specifies whether application parameters will be excluded from the result. */
  ExcludeApplicationParameters?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetApplicationInfoQueryParam {
  queryParameters?: GetApplicationInfoQueryParamProperties;
}

export type GetApplicationInfoParameters = GetApplicationInfoQueryParam & RequestParameters;

export interface GetApplicationHealthQueryParamProperties {
  /**
   * Allows filtering the collection of HealthEvent objects returned based on health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only events that match the filter are returned. All events are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values, obtained using the bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  EventsHealthStateFilter?: number;
  /**
   * Allows filtering of the deployed applications health state objects returned in the result of application health query based on their health state.
   * The possible values for this parameter include integer value of one of the following health states. Only deployed applications that match the filter will be returned.
   * All deployed applications are used to evaluate the aggregated health state. If not specified, all entries are returned.
   * The state values are flag-based enumeration, so the value could be a combination of these values, obtained using bitwise 'OR' operator.
   * For example, if the provided value is 6 then health state of deployed applications with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  DeployedApplicationsHealthStateFilter?: number;
  /**
   * Allows filtering of the services health state objects returned in the result of services health query based on their health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only services that match the filter are returned. All services are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values,
   * obtained using bitwise 'OR' operator. For example, if the provided value is 6 then health state of services with HealthState value of OK (2) and Warning (4) will be returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  ServicesHealthStateFilter?: number;
  /**
   * Indicates whether the health statistics should be returned as part of the query result. False by default.
   * The statistics show the number of children entities in health state Ok, Warning, and Error.
   */
  ExcludeHealthStatistics?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetApplicationHealthQueryParam {
  queryParameters?: GetApplicationHealthQueryParamProperties;
}

export type GetApplicationHealthParameters = GetApplicationHealthQueryParam & RequestParameters;

export interface GetApplicationHealthUsingPolicyBodyParam {
  /**
   * Describes the health policies used to evaluate the health of an application or one of its children.
   * If not present, the health evaluation uses the health policy from application manifest or the default health policy.
   */
  body?: ApplicationHealthPolicy;
}

export interface GetApplicationHealthUsingPolicyQueryParamProperties {
  /**
   * Allows filtering the collection of HealthEvent objects returned based on health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only events that match the filter are returned. All events are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values, obtained using the bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  EventsHealthStateFilter?: number;
  /**
   * Allows filtering of the deployed applications health state objects returned in the result of application health query based on their health state.
   * The possible values for this parameter include integer value of one of the following health states. Only deployed applications that match the filter will be returned.
   * All deployed applications are used to evaluate the aggregated health state. If not specified, all entries are returned.
   * The state values are flag-based enumeration, so the value could be a combination of these values, obtained using bitwise 'OR' operator.
   * For example, if the provided value is 6 then health state of deployed applications with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  DeployedApplicationsHealthStateFilter?: number;
  /**
   * Allows filtering of the services health state objects returned in the result of services health query based on their health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only services that match the filter are returned. All services are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values,
   * obtained using bitwise 'OR' operator. For example, if the provided value is 6 then health state of services with HealthState value of OK (2) and Warning (4) will be returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  ServicesHealthStateFilter?: number;
  /**
   * Indicates whether the health statistics should be returned as part of the query result. False by default.
   * The statistics show the number of children entities in health state Ok, Warning, and Error.
   */
  ExcludeHealthStatistics?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetApplicationHealthUsingPolicyQueryParam {
  queryParameters?: GetApplicationHealthUsingPolicyQueryParamProperties;
}

export interface GetApplicationHealthUsingPolicyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetApplicationHealthUsingPolicyParameters = GetApplicationHealthUsingPolicyQueryParam &
  GetApplicationHealthUsingPolicyMediaTypesParam &
  GetApplicationHealthUsingPolicyBodyParam &
  RequestParameters;

export interface ReportApplicationHealthBodyParam {
  /** Describes the health information for the health report. This information needs to be present in all of the health reports sent to the health manager. */
  body: HealthInformation;
}

export interface ReportApplicationHealthQueryParamProperties {
  /**
   * A flag that indicates whether the report should be sent immediately.
   * A health report is sent to a Service Fabric gateway Application, which forwards to the health store.
   * If Immediate is set to true, the report is sent immediately from HTTP Gateway to the health store, regardless of the fabric client settings that the HTTP Gateway Application is using.
   * This is useful for critical reports that should be sent as soon as possible.
   * Depending on timing and other conditions, sending the report may still fail, for example if the HTTP Gateway is closed or the message doesn't reach the Gateway.
   * If Immediate is set to false, the report is sent based on the health client settings from the HTTP Gateway. Therefore, it will be batched according to the HealthReportSendInterval configuration.
   * This is the recommended setting because it allows the health client to optimize health reporting messages to health store as well as health report processing.
   * By default, reports are not sent immediately.
   */
  Immediate?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ReportApplicationHealthQueryParam {
  queryParameters?: ReportApplicationHealthQueryParamProperties;
}

export interface ReportApplicationHealthMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ReportApplicationHealthParameters = ReportApplicationHealthQueryParam &
  ReportApplicationHealthMediaTypesParam &
  ReportApplicationHealthBodyParam &
  RequestParameters;

export interface StartApplicationUpgradeBodyParam {
  /** Parameters for an application upgrade. */
  body: ApplicationUpgradeDescription;
}

export interface StartApplicationUpgradeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface StartApplicationUpgradeQueryParam {
  queryParameters?: StartApplicationUpgradeQueryParamProperties;
}

export interface StartApplicationUpgradeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StartApplicationUpgradeParameters = StartApplicationUpgradeQueryParam &
  StartApplicationUpgradeMediaTypesParam &
  StartApplicationUpgradeBodyParam &
  RequestParameters;

export interface GetApplicationUpgradeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetApplicationUpgradeQueryParam {
  queryParameters?: GetApplicationUpgradeQueryParamProperties;
}

export type GetApplicationUpgradeParameters = GetApplicationUpgradeQueryParam & RequestParameters;

export interface UpdateApplicationUpgradeBodyParam {
  /** Parameters for updating an existing application upgrade. */
  body: ApplicationUpgradeUpdateDescription;
}

export interface UpdateApplicationUpgradeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface UpdateApplicationUpgradeQueryParam {
  queryParameters?: UpdateApplicationUpgradeQueryParamProperties;
}

export interface UpdateApplicationUpgradeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type UpdateApplicationUpgradeParameters = UpdateApplicationUpgradeQueryParam &
  UpdateApplicationUpgradeMediaTypesParam &
  UpdateApplicationUpgradeBodyParam &
  RequestParameters;

export interface UpdateApplicationBodyParam {
  /** Parameters for updating an existing application instance. */
  body: ApplicationUpdateDescription;
}

export interface UpdateApplicationQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface UpdateApplicationQueryParam {
  queryParameters?: UpdateApplicationQueryParamProperties;
}

export interface UpdateApplicationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type UpdateApplicationParameters = UpdateApplicationQueryParam &
  UpdateApplicationMediaTypesParam &
  UpdateApplicationBodyParam &
  RequestParameters;

export interface ResumeApplicationUpgradeBodyParam {
  /** Describes the parameters for resuming an application upgrade. */
  body: ResumeApplicationUpgradeDescription;
}

export interface ResumeApplicationUpgradeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ResumeApplicationUpgradeQueryParam {
  queryParameters?: ResumeApplicationUpgradeQueryParamProperties;
}

export interface ResumeApplicationUpgradeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ResumeApplicationUpgradeParameters = ResumeApplicationUpgradeQueryParam &
  ResumeApplicationUpgradeMediaTypesParam &
  ResumeApplicationUpgradeBodyParam &
  RequestParameters;

export interface RollbackApplicationUpgradeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface RollbackApplicationUpgradeQueryParam {
  queryParameters?: RollbackApplicationUpgradeQueryParamProperties;
}

export type RollbackApplicationUpgradeParameters = RollbackApplicationUpgradeQueryParam &
  RequestParameters;

export interface GetDeployedApplicationInfoListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /**
   * Include the health state of an entity.
   * If this parameter is false or not specified, then the health state returned is "Unknown".
   * When set to true, the query goes in parallel to the node and the health system service before the results are merged.
   * As a result, the query is more expensive and may take a longer time.
   */
  IncludeHealthState?: boolean;
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The maximum number of results to be returned as part of the paged queries. This parameter defines the upper bound on the number of results returned. The results returned can be less than the specified maximum results if they do not fit in the message as per the max message size restrictions defined in the configuration. If this parameter is zero or not specified, the paged query includes as many results as possible that fit in the return message. */
  MaxResults?: number;
}

export interface GetDeployedApplicationInfoListQueryParam {
  queryParameters?: GetDeployedApplicationInfoListQueryParamProperties;
}

export type GetDeployedApplicationInfoListParameters = GetDeployedApplicationInfoListQueryParam &
  RequestParameters;

export interface GetDeployedApplicationInfoQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /**
   * Include the health state of an entity.
   * If this parameter is false or not specified, then the health state returned is "Unknown".
   * When set to true, the query goes in parallel to the node and the health system service before the results are merged.
   * As a result, the query is more expensive and may take a longer time.
   */
  IncludeHealthState?: boolean;
}

export interface GetDeployedApplicationInfoQueryParam {
  queryParameters?: GetDeployedApplicationInfoQueryParamProperties;
}

export type GetDeployedApplicationInfoParameters = GetDeployedApplicationInfoQueryParam &
  RequestParameters;

export interface GetDeployedApplicationHealthQueryParamProperties {
  /**
   * Allows filtering the collection of HealthEvent objects returned based on health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only events that match the filter are returned. All events are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values, obtained using the bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  EventsHealthStateFilter?: number;
  /**
   * Allows filtering of the deployed service package health state objects returned in the result of deployed application health query based on their health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only deployed service packages that match the filter are returned. All deployed service packages are used to evaluate the aggregated health state of the deployed application.
   * If not specified, all entries are returned.
   * The state values are flag-based enumeration, so the value can be a combination of these values, obtained using the bitwise 'OR' operator.
   * For example, if the provided value is 6 then health state of service packages with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  DeployedServicePackagesHealthStateFilter?: number;
  /**
   * Indicates whether the health statistics should be returned as part of the query result. False by default.
   * The statistics show the number of children entities in health state Ok, Warning, and Error.
   */
  ExcludeHealthStatistics?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetDeployedApplicationHealthQueryParam {
  queryParameters?: GetDeployedApplicationHealthQueryParamProperties;
}

export type GetDeployedApplicationHealthParameters = GetDeployedApplicationHealthQueryParam &
  RequestParameters;

export interface GetDeployedApplicationHealthUsingPolicyBodyParam {
  /**
   * Describes the health policies used to evaluate the health of an application or one of its children.
   * If not present, the health evaluation uses the health policy from application manifest or the default health policy.
   */
  body?: ApplicationHealthPolicy;
}

export interface GetDeployedApplicationHealthUsingPolicyQueryParamProperties {
  /**
   * Allows filtering the collection of HealthEvent objects returned based on health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only events that match the filter are returned. All events are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values, obtained using the bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  EventsHealthStateFilter?: number;
  /**
   * Allows filtering of the deployed service package health state objects returned in the result of deployed application health query based on their health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only deployed service packages that match the filter are returned. All deployed service packages are used to evaluate the aggregated health state of the deployed application.
   * If not specified, all entries are returned.
   * The state values are flag-based enumeration, so the value can be a combination of these values, obtained using the bitwise 'OR' operator.
   * For example, if the provided value is 6 then health state of service packages with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  DeployedServicePackagesHealthStateFilter?: number;
  /**
   * Indicates whether the health statistics should be returned as part of the query result. False by default.
   * The statistics show the number of children entities in health state Ok, Warning, and Error.
   */
  ExcludeHealthStatistics?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetDeployedApplicationHealthUsingPolicyQueryParam {
  queryParameters?: GetDeployedApplicationHealthUsingPolicyQueryParamProperties;
}

export interface GetDeployedApplicationHealthUsingPolicyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetDeployedApplicationHealthUsingPolicyParameters = GetDeployedApplicationHealthUsingPolicyQueryParam &
  GetDeployedApplicationHealthUsingPolicyMediaTypesParam &
  GetDeployedApplicationHealthUsingPolicyBodyParam &
  RequestParameters;

export interface ReportDeployedApplicationHealthBodyParam {
  /** Describes the health information for the health report. This information needs to be present in all of the health reports sent to the health manager. */
  body: HealthInformation;
}

export interface ReportDeployedApplicationHealthQueryParamProperties {
  /**
   * A flag that indicates whether the report should be sent immediately.
   * A health report is sent to a Service Fabric gateway Application, which forwards to the health store.
   * If Immediate is set to true, the report is sent immediately from HTTP Gateway to the health store, regardless of the fabric client settings that the HTTP Gateway Application is using.
   * This is useful for critical reports that should be sent as soon as possible.
   * Depending on timing and other conditions, sending the report may still fail, for example if the HTTP Gateway is closed or the message doesn't reach the Gateway.
   * If Immediate is set to false, the report is sent based on the health client settings from the HTTP Gateway. Therefore, it will be batched according to the HealthReportSendInterval configuration.
   * This is the recommended setting because it allows the health client to optimize health reporting messages to health store as well as health report processing.
   * By default, reports are not sent immediately.
   */
  Immediate?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ReportDeployedApplicationHealthQueryParam {
  queryParameters?: ReportDeployedApplicationHealthQueryParamProperties;
}

export interface ReportDeployedApplicationHealthMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ReportDeployedApplicationHealthParameters = ReportDeployedApplicationHealthQueryParam &
  ReportDeployedApplicationHealthMediaTypesParam &
  ReportDeployedApplicationHealthBodyParam &
  RequestParameters;

export interface GetApplicationManifestQueryParamProperties {
  /** The version of the application type. */
  ApplicationTypeVersion: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetApplicationManifestQueryParam {
  queryParameters: GetApplicationManifestQueryParamProperties;
}

export type GetApplicationManifestParameters = GetApplicationManifestQueryParam & RequestParameters;

export interface GetServiceInfoListQueryParamProperties {
  /** The service type name used to filter the services to query for. */
  ServiceTypeName?: string;
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetServiceInfoListQueryParam {
  queryParameters?: GetServiceInfoListQueryParamProperties;
}

export type GetServiceInfoListParameters = GetServiceInfoListQueryParam & RequestParameters;

export interface GetServiceInfoQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetServiceInfoQueryParam {
  queryParameters?: GetServiceInfoQueryParamProperties;
}

export type GetServiceInfoParameters = GetServiceInfoQueryParam & RequestParameters;

export interface GetApplicationNameInfoQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetApplicationNameInfoQueryParam {
  queryParameters?: GetApplicationNameInfoQueryParamProperties;
}

export type GetApplicationNameInfoParameters = GetApplicationNameInfoQueryParam & RequestParameters;

export interface CreateServiceBodyParam {
  /** The information necessary to create a service. */
  body: ServiceDescription;
}

export interface CreateServiceQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface CreateServiceQueryParam {
  queryParameters?: CreateServiceQueryParamProperties;
}

export interface CreateServiceMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateServiceParameters = CreateServiceQueryParam &
  CreateServiceMediaTypesParam &
  CreateServiceBodyParam &
  RequestParameters;

export interface CreateServiceFromTemplateBodyParam {
  /** Describes the service that needs to be created from the template defined in the application manifest. */
  body: ServiceFromTemplateDescription;
}

export interface CreateServiceFromTemplateQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface CreateServiceFromTemplateQueryParam {
  queryParameters?: CreateServiceFromTemplateQueryParamProperties;
}

export interface CreateServiceFromTemplateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateServiceFromTemplateParameters = CreateServiceFromTemplateQueryParam &
  CreateServiceFromTemplateMediaTypesParam &
  CreateServiceFromTemplateBodyParam &
  RequestParameters;

export interface DeleteServiceQueryParamProperties {
  /** Remove a Service Fabric application or service forcefully without going through the graceful shutdown sequence. This parameter can be used to forcefully delete an application or service for which delete is timing out due to issues in the service code that prevents graceful close of replicas. */
  ForceRemove?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface DeleteServiceQueryParam {
  queryParameters?: DeleteServiceQueryParamProperties;
}

export type DeleteServiceParameters = DeleteServiceQueryParam & RequestParameters;

export interface UpdateServiceBodyParam {
  /** The information necessary to update a service. */
  body: ServiceUpdateDescription;
}

export interface UpdateServiceQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface UpdateServiceQueryParam {
  queryParameters?: UpdateServiceQueryParamProperties;
}

export interface UpdateServiceMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type UpdateServiceParameters = UpdateServiceQueryParam &
  UpdateServiceMediaTypesParam &
  UpdateServiceBodyParam &
  RequestParameters;

export interface GetServiceDescriptionQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetServiceDescriptionQueryParam {
  queryParameters?: GetServiceDescriptionQueryParamProperties;
}

export type GetServiceDescriptionParameters = GetServiceDescriptionQueryParam & RequestParameters;

export interface GetServiceHealthQueryParamProperties {
  /**
   * Allows filtering the collection of HealthEvent objects returned based on health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only events that match the filter are returned. All events are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values, obtained using the bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  EventsHealthStateFilter?: number;
  /**
   * Allows filtering of the partitions health state objects returned in the result of service health query based on their health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only partitions that match the filter are returned. All partitions are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these value
   * obtained using bitwise 'OR' operator. For example, if the provided value is 6 then health state of partitions with HealthState value of OK (2) and Warning (4) will be returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  PartitionsHealthStateFilter?: number;
  /**
   * Indicates whether the health statistics should be returned as part of the query result. False by default.
   * The statistics show the number of children entities in health state Ok, Warning, and Error.
   */
  ExcludeHealthStatistics?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetServiceHealthQueryParam {
  queryParameters?: GetServiceHealthQueryParamProperties;
}

export type GetServiceHealthParameters = GetServiceHealthQueryParam & RequestParameters;

export interface GetServiceHealthUsingPolicyBodyParam {
  /**
   * Describes the health policies used to evaluate the health of an application or one of its children.
   * If not present, the health evaluation uses the health policy from application manifest or the default health policy.
   */
  body?: ApplicationHealthPolicy;
}

export interface GetServiceHealthUsingPolicyQueryParamProperties {
  /**
   * Allows filtering the collection of HealthEvent objects returned based on health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only events that match the filter are returned. All events are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values, obtained using the bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  EventsHealthStateFilter?: number;
  /**
   * Allows filtering of the partitions health state objects returned in the result of service health query based on their health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only partitions that match the filter are returned. All partitions are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these value
   * obtained using bitwise 'OR' operator. For example, if the provided value is 6 then health state of partitions with HealthState value of OK (2) and Warning (4) will be returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  PartitionsHealthStateFilter?: number;
  /**
   * Indicates whether the health statistics should be returned as part of the query result. False by default.
   * The statistics show the number of children entities in health state Ok, Warning, and Error.
   */
  ExcludeHealthStatistics?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetServiceHealthUsingPolicyQueryParam {
  queryParameters?: GetServiceHealthUsingPolicyQueryParamProperties;
}

export interface GetServiceHealthUsingPolicyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetServiceHealthUsingPolicyParameters = GetServiceHealthUsingPolicyQueryParam &
  GetServiceHealthUsingPolicyMediaTypesParam &
  GetServiceHealthUsingPolicyBodyParam &
  RequestParameters;

export interface ReportServiceHealthBodyParam {
  /** Describes the health information for the health report. This information needs to be present in all of the health reports sent to the health manager. */
  body: HealthInformation;
}

export interface ReportServiceHealthQueryParamProperties {
  /**
   * A flag that indicates whether the report should be sent immediately.
   * A health report is sent to a Service Fabric gateway Application, which forwards to the health store.
   * If Immediate is set to true, the report is sent immediately from HTTP Gateway to the health store, regardless of the fabric client settings that the HTTP Gateway Application is using.
   * This is useful for critical reports that should be sent as soon as possible.
   * Depending on timing and other conditions, sending the report may still fail, for example if the HTTP Gateway is closed or the message doesn't reach the Gateway.
   * If Immediate is set to false, the report is sent based on the health client settings from the HTTP Gateway. Therefore, it will be batched according to the HealthReportSendInterval configuration.
   * This is the recommended setting because it allows the health client to optimize health reporting messages to health store as well as health report processing.
   * By default, reports are not sent immediately.
   */
  Immediate?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ReportServiceHealthQueryParam {
  queryParameters?: ReportServiceHealthQueryParamProperties;
}

export interface ReportServiceHealthMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ReportServiceHealthParameters = ReportServiceHealthQueryParam &
  ReportServiceHealthMediaTypesParam &
  ReportServiceHealthBodyParam &
  RequestParameters;

export interface ResolveServiceQueryParamProperties {
  /**
   * Key type for the partition. This parameter is required if the partition scheme for the service is Int64Range or Named. The possible values are following.
   * - None (1) - Indicates that the PartitionKeyValue parameter is not specified. This is valid for the partitions with partitioning scheme as Singleton. This is the default value. The value is 1.
   * - Int64Range (2) - Indicates that the PartitionKeyValue parameter is an int64 partition key. This is valid for the partitions with partitioning scheme as Int64Range. The value is 2.
   * - Named (3) - Indicates that the PartitionKeyValue parameter is a name of the partition. This is valid for the partitions with partitioning scheme as Named. The value is 3.
   */
  PartitionKeyType?: number;
  /**
   * Partition key. This is required if the partition scheme for the service is Int64Range or Named.
   * This is not the partition ID, but rather, either the integer key value, or the name of the partition ID.
   * For example, if your service is using ranged partitions from 0 to 10, then they PartitionKeyValue would be an
   * integer in that range. Query service description to see the range or name.
   */
  PartitionKeyValue?: string;
  /** The value in the Version field of the response that was received previously. This is required if the user knows that the result that was gotten previously is stale. */
  PreviousRspVersion?: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ResolveServiceQueryParam {
  queryParameters?: ResolveServiceQueryParamProperties;
}

export type ResolveServiceParameters = ResolveServiceQueryParam & RequestParameters;

export interface GetUnplacedReplicaInformationQueryParamProperties {
  /**
   * The identity of the partition.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
  /** Indicates that unplaced replica information will be queries only for primary replicas. */
  OnlyQueryPrimaries?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetUnplacedReplicaInformationQueryParam {
  queryParameters?: GetUnplacedReplicaInformationQueryParamProperties;
}

export type GetUnplacedReplicaInformationParameters = GetUnplacedReplicaInformationQueryParam &
  RequestParameters;

export interface GetLoadedPartitionInfoListQueryParamProperties {
  /** Name of the metric based on which to get ordered list of partitions. */
  MetricName: string;
  /** The name of a service. */
  ServiceName?: string;
  /** Ordering of partitions' load. */
  Ordering?: "Desc" | "Asc";
  /** The maximum number of results to be returned as part of the paged queries. This parameter defines the upper bound on the number of results returned. The results returned can be less than the specified maximum results if they do not fit in the message as per the max message size restrictions defined in the configuration. If this parameter is zero or not specified, the paged query includes as many results as possible that fit in the return message. */
  MaxResults?: number;
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
}

export interface GetLoadedPartitionInfoListQueryParam {
  queryParameters: GetLoadedPartitionInfoListQueryParamProperties;
}

export type GetLoadedPartitionInfoListParameters = GetLoadedPartitionInfoListQueryParam &
  RequestParameters;

export interface GetPartitionInfoListQueryParamProperties {
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetPartitionInfoListQueryParam {
  queryParameters?: GetPartitionInfoListQueryParamProperties;
}

export type GetPartitionInfoListParameters = GetPartitionInfoListQueryParam & RequestParameters;

export interface GetPartitionInfoQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetPartitionInfoQueryParam {
  queryParameters?: GetPartitionInfoQueryParamProperties;
}

export type GetPartitionInfoParameters = GetPartitionInfoQueryParam & RequestParameters;

export interface GetServiceNameInfoQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetServiceNameInfoQueryParam {
  queryParameters?: GetServiceNameInfoQueryParamProperties;
}

export type GetServiceNameInfoParameters = GetServiceNameInfoQueryParam & RequestParameters;

export interface GetPartitionHealthQueryParamProperties {
  /**
   * Allows filtering the collection of HealthEvent objects returned based on health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only events that match the filter are returned. All events are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values, obtained using the bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  EventsHealthStateFilter?: number;
  /**
   * Allows filtering the collection of ReplicaHealthState objects on the partition. The value can be obtained from members or bitwise operations on members of HealthStateFilter. Only replicas that match the filter will be returned. All replicas will be used to evaluate the aggregated health state. If not specified, all entries will be returned.The state values are flag-based enumeration, so the value could be a combination of these values obtained using bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) will be returned. The possible values for this parameter include integer value of one of the following health states.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  ReplicasHealthStateFilter?: number;
  /**
   * Indicates whether the health statistics should be returned as part of the query result. False by default.
   * The statistics show the number of children entities in health state Ok, Warning, and Error.
   */
  ExcludeHealthStatistics?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetPartitionHealthQueryParam {
  queryParameters?: GetPartitionHealthQueryParamProperties;
}

export type GetPartitionHealthParameters = GetPartitionHealthQueryParam & RequestParameters;

export interface GetPartitionHealthUsingPolicyBodyParam {
  /**
   * Describes the health policies used to evaluate the health of an application or one of its children.
   * If not present, the health evaluation uses the health policy from application manifest or the default health policy.
   */
  body?: ApplicationHealthPolicy;
}

export interface GetPartitionHealthUsingPolicyQueryParamProperties {
  /**
   * Allows filtering the collection of HealthEvent objects returned based on health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only events that match the filter are returned. All events are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values, obtained using the bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  EventsHealthStateFilter?: number;
  /**
   * Allows filtering the collection of ReplicaHealthState objects on the partition. The value can be obtained from members or bitwise operations on members of HealthStateFilter. Only replicas that match the filter will be returned. All replicas will be used to evaluate the aggregated health state. If not specified, all entries will be returned.The state values are flag-based enumeration, so the value could be a combination of these values obtained using bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) will be returned. The possible values for this parameter include integer value of one of the following health states.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  ReplicasHealthStateFilter?: number;
  /**
   * Indicates whether the health statistics should be returned as part of the query result. False by default.
   * The statistics show the number of children entities in health state Ok, Warning, and Error.
   */
  ExcludeHealthStatistics?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetPartitionHealthUsingPolicyQueryParam {
  queryParameters?: GetPartitionHealthUsingPolicyQueryParamProperties;
}

export interface GetPartitionHealthUsingPolicyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetPartitionHealthUsingPolicyParameters = GetPartitionHealthUsingPolicyQueryParam &
  GetPartitionHealthUsingPolicyMediaTypesParam &
  GetPartitionHealthUsingPolicyBodyParam &
  RequestParameters;

export interface ReportPartitionHealthBodyParam {
  /** Describes the health information for the health report. This information needs to be present in all of the health reports sent to the health manager. */
  body: HealthInformation;
}

export interface ReportPartitionHealthQueryParamProperties {
  /**
   * A flag that indicates whether the report should be sent immediately.
   * A health report is sent to a Service Fabric gateway Application, which forwards to the health store.
   * If Immediate is set to true, the report is sent immediately from HTTP Gateway to the health store, regardless of the fabric client settings that the HTTP Gateway Application is using.
   * This is useful for critical reports that should be sent as soon as possible.
   * Depending on timing and other conditions, sending the report may still fail, for example if the HTTP Gateway is closed or the message doesn't reach the Gateway.
   * If Immediate is set to false, the report is sent based on the health client settings from the HTTP Gateway. Therefore, it will be batched according to the HealthReportSendInterval configuration.
   * This is the recommended setting because it allows the health client to optimize health reporting messages to health store as well as health report processing.
   * By default, reports are not sent immediately.
   */
  Immediate?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ReportPartitionHealthQueryParam {
  queryParameters?: ReportPartitionHealthQueryParamProperties;
}

export interface ReportPartitionHealthMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ReportPartitionHealthParameters = ReportPartitionHealthQueryParam &
  ReportPartitionHealthMediaTypesParam &
  ReportPartitionHealthBodyParam &
  RequestParameters;

export interface GetPartitionLoadInformationQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetPartitionLoadInformationQueryParam {
  queryParameters?: GetPartitionLoadInformationQueryParamProperties;
}

export type GetPartitionLoadInformationParameters = GetPartitionLoadInformationQueryParam &
  RequestParameters;

export interface ResetPartitionLoadQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ResetPartitionLoadQueryParam {
  queryParameters?: ResetPartitionLoadQueryParamProperties;
}

export type ResetPartitionLoadParameters = ResetPartitionLoadQueryParam & RequestParameters;

export interface RecoverPartitionQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface RecoverPartitionQueryParam {
  queryParameters?: RecoverPartitionQueryParamProperties;
}

export type RecoverPartitionParameters = RecoverPartitionQueryParam & RequestParameters;

export interface RecoverServicePartitionsQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface RecoverServicePartitionsQueryParam {
  queryParameters?: RecoverServicePartitionsQueryParamProperties;
}

export type RecoverServicePartitionsParameters = RecoverServicePartitionsQueryParam &
  RequestParameters;

export interface RecoverSystemPartitionsQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface RecoverSystemPartitionsQueryParam {
  queryParameters?: RecoverSystemPartitionsQueryParamProperties;
}

export type RecoverSystemPartitionsParameters = RecoverSystemPartitionsQueryParam &
  RequestParameters;

export interface RecoverAllPartitionsQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface RecoverAllPartitionsQueryParam {
  queryParameters?: RecoverAllPartitionsQueryParamProperties;
}

export type RecoverAllPartitionsParameters = RecoverAllPartitionsQueryParam & RequestParameters;

export interface MovePrimaryReplicaQueryParamProperties {
  /** The name of the node. */
  NodeName?: string;
  /** Ignore constraints when moving a replica or instance. If this parameter is not specified, all constraints are honored. */
  IgnoreConstraints?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface MovePrimaryReplicaQueryParam {
  queryParameters?: MovePrimaryReplicaQueryParamProperties;
}

export type MovePrimaryReplicaParameters = MovePrimaryReplicaQueryParam & RequestParameters;

export interface MoveSecondaryReplicaQueryParamProperties {
  /** The name of the source node for secondary replica move. */
  CurrentNodeName: string;
  /** The name of the target node for secondary replica or instance move. If not specified, replica or instance is moved to a random node. */
  NewNodeName?: string;
  /** Ignore constraints when moving a replica or instance. If this parameter is not specified, all constraints are honored. */
  IgnoreConstraints?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface MoveSecondaryReplicaQueryParam {
  queryParameters: MoveSecondaryReplicaQueryParamProperties;
}

export type MoveSecondaryReplicaParameters = MoveSecondaryReplicaQueryParam & RequestParameters;

export interface UpdatePartitionLoadBodyParam {
  /** Description of updating load for list of partitions. */
  body: Array<PartitionMetricLoadDescription>;
}

export interface UpdatePartitionLoadQueryParamProperties {
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The maximum number of results to be returned as part of the paged queries. This parameter defines the upper bound on the number of results returned. The results returned can be less than the specified maximum results if they do not fit in the message as per the max message size restrictions defined in the configuration. If this parameter is zero or not specified, the paged query includes as many results as possible that fit in the return message. */
  MaxResults?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface UpdatePartitionLoadQueryParam {
  queryParameters?: UpdatePartitionLoadQueryParamProperties;
}

export interface UpdatePartitionLoadMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type UpdatePartitionLoadParameters = UpdatePartitionLoadQueryParam &
  UpdatePartitionLoadMediaTypesParam &
  UpdatePartitionLoadBodyParam &
  RequestParameters;

export interface MoveInstanceQueryParamProperties {
  /** The name of the source node for instance move. If not specified, instance is moved from a random node. */
  CurrentNodeName?: string;
  /** The name of the target node for secondary replica or instance move. If not specified, replica or instance is moved to a random node. */
  NewNodeName?: string;
  /** Ignore constraints when moving a replica or instance. If this parameter is not specified, all constraints are honored. */
  IgnoreConstraints?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface MoveInstanceQueryParam {
  queryParameters?: MoveInstanceQueryParamProperties;
}

export type MoveInstanceParameters = MoveInstanceQueryParam & RequestParameters;

export interface MoveAuxiliaryReplicaQueryParamProperties {
  /** The name of the source node for instance move. If not specified, instance is moved from a random node. */
  CurrentNodeName?: string;
  /** The name of the target node for secondary replica or instance move. If not specified, replica or instance is moved to a random node. */
  NewNodeName?: string;
  /** Ignore constraints when moving a replica or instance. If this parameter is not specified, all constraints are honored. */
  IgnoreConstraints?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface MoveAuxiliaryReplicaQueryParam {
  queryParameters?: MoveAuxiliaryReplicaQueryParamProperties;
}

export type MoveAuxiliaryReplicaParameters = MoveAuxiliaryReplicaQueryParam & RequestParameters;

export interface CreateRepairTaskBodyParam {
  /** Describes the repair task to be created or updated. */
  body: RepairTask;
}

export interface CreateRepairTaskMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateRepairTaskParameters = CreateRepairTaskMediaTypesParam &
  CreateRepairTaskBodyParam &
  RequestParameters;

export interface CancelRepairTaskBodyParam {
  /** Describes the repair task to be cancelled. */
  body: RepairTaskCancelDescription;
}

export interface CancelRepairTaskMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CancelRepairTaskParameters = CancelRepairTaskMediaTypesParam &
  CancelRepairTaskBodyParam &
  RequestParameters;

export interface DeleteRepairTaskBodyParam {
  /** Describes the repair task to be deleted. */
  body: RepairTaskDeleteDescription;
}

export interface DeleteRepairTaskMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DeleteRepairTaskParameters = DeleteRepairTaskMediaTypesParam &
  DeleteRepairTaskBodyParam &
  RequestParameters;

export interface GetRepairTaskListQueryParamProperties {
  /** The repair task ID prefix to be matched. */
  TaskIdFilter?: string;
  /**
   * A bitwise-OR of the following values, specifying which task states should be included in the result list.
   *
   * - 1 - Created
   * - 2 - Claimed
   * - 4 - Preparing
   * - 8 - Approved
   * - 16 - Executing
   * - 32 - Restoring
   * - 64 - Completed
   */
  StateFilter?: number;
  /** The name of the repair executor whose claimed tasks should be included in the list. */
  ExecutorFilter?: string;
}

export interface GetRepairTaskListQueryParam {
  queryParameters?: GetRepairTaskListQueryParamProperties;
}

export type GetRepairTaskListParameters = GetRepairTaskListQueryParam & RequestParameters;

export interface ForceApproveRepairTaskBodyParam {
  /** Describes the repair task to be approved. */
  body: RepairTaskApproveDescription;
}

export interface ForceApproveRepairTaskMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ForceApproveRepairTaskParameters = ForceApproveRepairTaskMediaTypesParam &
  ForceApproveRepairTaskBodyParam &
  RequestParameters;

export interface UpdateRepairTaskHealthPolicyBodyParam {
  /** Describes the repair task healthy policy to be updated. */
  body: RepairTaskUpdateHealthPolicyDescription;
}

export interface UpdateRepairTaskHealthPolicyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type UpdateRepairTaskHealthPolicyParameters = UpdateRepairTaskHealthPolicyMediaTypesParam &
  UpdateRepairTaskHealthPolicyBodyParam &
  RequestParameters;

export interface UpdateRepairExecutionStateBodyParam {
  /** Describes the repair task to be created or updated. */
  body: RepairTask;
}

export interface UpdateRepairExecutionStateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type UpdateRepairExecutionStateParameters = UpdateRepairExecutionStateMediaTypesParam &
  UpdateRepairExecutionStateBodyParam &
  RequestParameters;

export interface GetReplicaInfoListQueryParamProperties {
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetReplicaInfoListQueryParam {
  queryParameters?: GetReplicaInfoListQueryParamProperties;
}

export type GetReplicaInfoListParameters = GetReplicaInfoListQueryParam & RequestParameters;

export interface GetReplicaInfoQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetReplicaInfoQueryParam {
  queryParameters?: GetReplicaInfoQueryParamProperties;
}

export type GetReplicaInfoParameters = GetReplicaInfoQueryParam & RequestParameters;

export interface GetReplicaHealthQueryParamProperties {
  /**
   * Allows filtering the collection of HealthEvent objects returned based on health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only events that match the filter are returned. All events are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values, obtained using the bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  EventsHealthStateFilter?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetReplicaHealthQueryParam {
  queryParameters?: GetReplicaHealthQueryParamProperties;
}

export type GetReplicaHealthParameters = GetReplicaHealthQueryParam & RequestParameters;

export interface GetReplicaHealthUsingPolicyBodyParam {
  /**
   * Describes the health policies used to evaluate the health of an application or one of its children.
   * If not present, the health evaluation uses the health policy from application manifest or the default health policy.
   */
  body?: ApplicationHealthPolicy;
}

export interface GetReplicaHealthUsingPolicyQueryParamProperties {
  /**
   * Allows filtering the collection of HealthEvent objects returned based on health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only events that match the filter are returned. All events are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values, obtained using the bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  EventsHealthStateFilter?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetReplicaHealthUsingPolicyQueryParam {
  queryParameters?: GetReplicaHealthUsingPolicyQueryParamProperties;
}

export interface GetReplicaHealthUsingPolicyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetReplicaHealthUsingPolicyParameters = GetReplicaHealthUsingPolicyQueryParam &
  GetReplicaHealthUsingPolicyMediaTypesParam &
  GetReplicaHealthUsingPolicyBodyParam &
  RequestParameters;

export interface ReportReplicaHealthBodyParam {
  /** Describes the health information for the health report. This information needs to be present in all of the health reports sent to the health manager. */
  body: HealthInformation;
}

export interface ReportReplicaHealthQueryParamProperties {
  /** The kind of service replica (Stateless or Stateful) for which the health is being reported. Following are the possible values. */
  ServiceKind: "Stateless" | "Stateful";
  /**
   * A flag that indicates whether the report should be sent immediately.
   * A health report is sent to a Service Fabric gateway Application, which forwards to the health store.
   * If Immediate is set to true, the report is sent immediately from HTTP Gateway to the health store, regardless of the fabric client settings that the HTTP Gateway Application is using.
   * This is useful for critical reports that should be sent as soon as possible.
   * Depending on timing and other conditions, sending the report may still fail, for example if the HTTP Gateway is closed or the message doesn't reach the Gateway.
   * If Immediate is set to false, the report is sent based on the health client settings from the HTTP Gateway. Therefore, it will be batched according to the HealthReportSendInterval configuration.
   * This is the recommended setting because it allows the health client to optimize health reporting messages to health store as well as health report processing.
   * By default, reports are not sent immediately.
   */
  Immediate?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ReportReplicaHealthQueryParam {
  queryParameters: ReportReplicaHealthQueryParamProperties;
}

export interface ReportReplicaHealthMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ReportReplicaHealthParameters = ReportReplicaHealthQueryParam &
  ReportReplicaHealthMediaTypesParam &
  ReportReplicaHealthBodyParam &
  RequestParameters;

export interface GetDeployedServiceReplicaInfoListQueryParamProperties {
  /**
   * The identity of the partition.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
  /** The name of a service manifest registered as part of an application type in a Service Fabric cluster. */
  ServiceManifestName?: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetDeployedServiceReplicaInfoListQueryParam {
  queryParameters?: GetDeployedServiceReplicaInfoListQueryParamProperties;
}

export type GetDeployedServiceReplicaInfoListParameters = GetDeployedServiceReplicaInfoListQueryParam &
  RequestParameters;

export interface GetDeployedServiceReplicaDetailInfoQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetDeployedServiceReplicaDetailInfoQueryParam {
  queryParameters?: GetDeployedServiceReplicaDetailInfoQueryParamProperties;
}

export type GetDeployedServiceReplicaDetailInfoParameters = GetDeployedServiceReplicaDetailInfoQueryParam &
  RequestParameters;

export interface GetDeployedServiceReplicaDetailInfoByPartitionIdQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetDeployedServiceReplicaDetailInfoByPartitionIdQueryParam {
  queryParameters?: GetDeployedServiceReplicaDetailInfoByPartitionIdQueryParamProperties;
}

export type GetDeployedServiceReplicaDetailInfoByPartitionIdParameters = GetDeployedServiceReplicaDetailInfoByPartitionIdQueryParam &
  RequestParameters;

export interface RestartReplicaQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface RestartReplicaQueryParam {
  queryParameters?: RestartReplicaQueryParamProperties;
}

export type RestartReplicaParameters = RestartReplicaQueryParam & RequestParameters;

export interface RemoveReplicaQueryParamProperties {
  /** Remove a Service Fabric application or service forcefully without going through the graceful shutdown sequence. This parameter can be used to forcefully delete an application or service for which delete is timing out due to issues in the service code that prevents graceful close of replicas. */
  ForceRemove?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface RemoveReplicaQueryParam {
  queryParameters?: RemoveReplicaQueryParamProperties;
}

export type RemoveReplicaParameters = RemoveReplicaQueryParam & RequestParameters;

export interface GetDeployedServicePackageInfoListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetDeployedServicePackageInfoListQueryParam {
  queryParameters?: GetDeployedServicePackageInfoListQueryParamProperties;
}

export type GetDeployedServicePackageInfoListParameters = GetDeployedServicePackageInfoListQueryParam &
  RequestParameters;

export interface GetDeployedServicePackageInfoListByNameQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetDeployedServicePackageInfoListByNameQueryParam {
  queryParameters?: GetDeployedServicePackageInfoListByNameQueryParamProperties;
}

export type GetDeployedServicePackageInfoListByNameParameters = GetDeployedServicePackageInfoListByNameQueryParam &
  RequestParameters;

export interface GetDeployedServicePackageHealthQueryParamProperties {
  /**
   * Allows filtering the collection of HealthEvent objects returned based on health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only events that match the filter are returned. All events are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values, obtained using the bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  EventsHealthStateFilter?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetDeployedServicePackageHealthQueryParam {
  queryParameters?: GetDeployedServicePackageHealthQueryParamProperties;
}

export type GetDeployedServicePackageHealthParameters = GetDeployedServicePackageHealthQueryParam &
  RequestParameters;

export interface GetDeployedServicePackageHealthUsingPolicyBodyParam {
  /**
   * Describes the health policies used to evaluate the health of an application or one of its children.
   * If not present, the health evaluation uses the health policy from application manifest or the default health policy.
   */
  body?: ApplicationHealthPolicy;
}

export interface GetDeployedServicePackageHealthUsingPolicyQueryParamProperties {
  /**
   * Allows filtering the collection of HealthEvent objects returned based on health state.
   * The possible values for this parameter include integer value of one of the following health states.
   * Only events that match the filter are returned. All events are used to evaluate the aggregated health state.
   * If not specified, all entries are returned. The state values are flag-based enumeration, so the value could be a combination of these values, obtained using the bitwise 'OR' operator. For example, If the provided value is 6 then all of the events with HealthState value of OK (2) and Warning (4) are returned.
   *
   * - Default - Default value. Matches any HealthState. The value is zero.
   * - None - Filter that doesn't match any HealthState value. Used in order to return no results on a given collection of states. The value is 1.
   * - Ok - Filter that matches input with HealthState value Ok. The value is 2.
   * - Warning - Filter that matches input with HealthState value Warning. The value is 4.
   * - Error - Filter that matches input with HealthState value Error. The value is 8.
   * - All - Filter that matches input with any HealthState value. The value is 65535.
   */
  EventsHealthStateFilter?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetDeployedServicePackageHealthUsingPolicyQueryParam {
  queryParameters?: GetDeployedServicePackageHealthUsingPolicyQueryParamProperties;
}

export interface GetDeployedServicePackageHealthUsingPolicyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetDeployedServicePackageHealthUsingPolicyParameters = GetDeployedServicePackageHealthUsingPolicyQueryParam &
  GetDeployedServicePackageHealthUsingPolicyMediaTypesParam &
  GetDeployedServicePackageHealthUsingPolicyBodyParam &
  RequestParameters;

export interface ReportDeployedServicePackageHealthBodyParam {
  /** Describes the health information for the health report. This information needs to be present in all of the health reports sent to the health manager. */
  body: HealthInformation;
}

export interface ReportDeployedServicePackageHealthQueryParamProperties {
  /**
   * A flag that indicates whether the report should be sent immediately.
   * A health report is sent to a Service Fabric gateway Application, which forwards to the health store.
   * If Immediate is set to true, the report is sent immediately from HTTP Gateway to the health store, regardless of the fabric client settings that the HTTP Gateway Application is using.
   * This is useful for critical reports that should be sent as soon as possible.
   * Depending on timing and other conditions, sending the report may still fail, for example if the HTTP Gateway is closed or the message doesn't reach the Gateway.
   * If Immediate is set to false, the report is sent based on the health client settings from the HTTP Gateway. Therefore, it will be batched according to the HealthReportSendInterval configuration.
   * This is the recommended setting because it allows the health client to optimize health reporting messages to health store as well as health report processing.
   * By default, reports are not sent immediately.
   */
  Immediate?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ReportDeployedServicePackageHealthQueryParam {
  queryParameters?: ReportDeployedServicePackageHealthQueryParamProperties;
}

export interface ReportDeployedServicePackageHealthMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ReportDeployedServicePackageHealthParameters = ReportDeployedServicePackageHealthQueryParam &
  ReportDeployedServicePackageHealthMediaTypesParam &
  ReportDeployedServicePackageHealthBodyParam &
  RequestParameters;

export interface DeployServicePackageToNodeBodyParam {
  /** Describes information for deploying a service package to a Service Fabric node. */
  body: DeployServicePackageToNodeDescription;
}

export interface DeployServicePackageToNodeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface DeployServicePackageToNodeQueryParam {
  queryParameters?: DeployServicePackageToNodeQueryParamProperties;
}

export interface DeployServicePackageToNodeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DeployServicePackageToNodeParameters = DeployServicePackageToNodeQueryParam &
  DeployServicePackageToNodeMediaTypesParam &
  DeployServicePackageToNodeBodyParam &
  RequestParameters;

export interface GetDeployedCodePackageInfoListQueryParamProperties {
  /** The name of a service manifest registered as part of an application type in a Service Fabric cluster. */
  ServiceManifestName?: string;
  /** The name of code package specified in service manifest registered as part of an application type in a Service Fabric cluster. */
  CodePackageName?: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetDeployedCodePackageInfoListQueryParam {
  queryParameters?: GetDeployedCodePackageInfoListQueryParamProperties;
}

export type GetDeployedCodePackageInfoListParameters = GetDeployedCodePackageInfoListQueryParam &
  RequestParameters;

export interface RestartDeployedCodePackageBodyParam {
  /** Describes the deployed code package on Service Fabric node to restart. */
  body: RestartDeployedCodePackageDescription;
}

export interface RestartDeployedCodePackageQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface RestartDeployedCodePackageQueryParam {
  queryParameters?: RestartDeployedCodePackageQueryParamProperties;
}

export interface RestartDeployedCodePackageMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RestartDeployedCodePackageParameters = RestartDeployedCodePackageQueryParam &
  RestartDeployedCodePackageMediaTypesParam &
  RestartDeployedCodePackageBodyParam &
  RequestParameters;

export interface GetContainerLogsDeployedOnNodeQueryParamProperties {
  /** The name of a service manifest registered as part of an application type in a Service Fabric cluster. */
  ServiceManifestName: string;
  /** The name of code package specified in service manifest registered as part of an application type in a Service Fabric cluster. */
  CodePackageName: string;
  /** Number of lines to show from the end of the logs. Default is 100. 'all' to show the complete logs. */
  Tail?: string;
  /** Specifies whether to get container logs from exited/dead containers of the code package instance. */
  Previous?: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetContainerLogsDeployedOnNodeQueryParam {
  queryParameters: GetContainerLogsDeployedOnNodeQueryParamProperties;
}

export type GetContainerLogsDeployedOnNodeParameters = GetContainerLogsDeployedOnNodeQueryParam &
  RequestParameters;

export interface InvokeContainerApiBodyParam {
  /** Parameters for making container API call */
  body: ContainerApiRequestBody;
}

export interface InvokeContainerApiQueryParamProperties {
  /** The name of a service manifest registered as part of an application type in a Service Fabric cluster. */
  ServiceManifestName: string;
  /** The name of code package specified in service manifest registered as part of an application type in a Service Fabric cluster. */
  CodePackageName: string;
  /** ID that uniquely identifies a code package instance deployed on a service fabric node. */
  CodePackageInstanceId: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface InvokeContainerApiQueryParam {
  queryParameters: InvokeContainerApiQueryParamProperties;
}

export interface InvokeContainerApiMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type InvokeContainerApiParameters = InvokeContainerApiQueryParam &
  InvokeContainerApiMediaTypesParam &
  InvokeContainerApiBodyParam &
  RequestParameters;

export interface CreateComposeDeploymentBodyParam {
  /** Describes the compose deployment that needs to be created. */
  body: CreateComposeDeploymentDescription;
}

export interface CreateComposeDeploymentQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface CreateComposeDeploymentQueryParam {
  queryParameters?: CreateComposeDeploymentQueryParamProperties;
}

export interface CreateComposeDeploymentMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateComposeDeploymentParameters = CreateComposeDeploymentQueryParam &
  CreateComposeDeploymentMediaTypesParam &
  CreateComposeDeploymentBodyParam &
  RequestParameters;

export interface GetComposeDeploymentStatusQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetComposeDeploymentStatusQueryParam {
  queryParameters?: GetComposeDeploymentStatusQueryParamProperties;
}

export type GetComposeDeploymentStatusParameters = GetComposeDeploymentStatusQueryParam &
  RequestParameters;

export interface GetComposeDeploymentStatusListQueryParamProperties {
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The maximum number of results to be returned as part of the paged queries. This parameter defines the upper bound on the number of results returned. The results returned can be less than the specified maximum results if they do not fit in the message as per the max message size restrictions defined in the configuration. If this parameter is zero or not specified, the paged query includes as many results as possible that fit in the return message. */
  MaxResults?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetComposeDeploymentStatusListQueryParam {
  queryParameters?: GetComposeDeploymentStatusListQueryParamProperties;
}

export type GetComposeDeploymentStatusListParameters = GetComposeDeploymentStatusListQueryParam &
  RequestParameters;

export interface GetComposeDeploymentUpgradeProgressQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetComposeDeploymentUpgradeProgressQueryParam {
  queryParameters?: GetComposeDeploymentUpgradeProgressQueryParamProperties;
}

export type GetComposeDeploymentUpgradeProgressParameters = GetComposeDeploymentUpgradeProgressQueryParam &
  RequestParameters;

export interface RemoveComposeDeploymentQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface RemoveComposeDeploymentQueryParam {
  queryParameters?: RemoveComposeDeploymentQueryParamProperties;
}

export type RemoveComposeDeploymentParameters = RemoveComposeDeploymentQueryParam &
  RequestParameters;

export interface StartComposeDeploymentUpgradeBodyParam {
  /** Parameters for upgrading compose deployment. */
  body: ComposeDeploymentUpgradeDescription;
}

export interface StartComposeDeploymentUpgradeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface StartComposeDeploymentUpgradeQueryParam {
  queryParameters?: StartComposeDeploymentUpgradeQueryParamProperties;
}

export interface StartComposeDeploymentUpgradeMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StartComposeDeploymentUpgradeParameters = StartComposeDeploymentUpgradeQueryParam &
  StartComposeDeploymentUpgradeMediaTypesParam &
  StartComposeDeploymentUpgradeBodyParam &
  RequestParameters;

export interface StartRollbackComposeDeploymentUpgradeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface StartRollbackComposeDeploymentUpgradeQueryParam {
  queryParameters?: StartRollbackComposeDeploymentUpgradeQueryParamProperties;
}

export type StartRollbackComposeDeploymentUpgradeParameters = StartRollbackComposeDeploymentUpgradeQueryParam &
  RequestParameters;

export interface GetChaosQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetChaosQueryParam {
  queryParameters?: GetChaosQueryParamProperties;
}

export type GetChaosParameters = GetChaosQueryParam & RequestParameters;

export interface StartChaosBodyParam {
  /** Describes all the parameters to configure a Chaos run. */
  body: ChaosParameters;
}

export interface StartChaosQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface StartChaosQueryParam {
  queryParameters?: StartChaosQueryParamProperties;
}

export interface StartChaosMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StartChaosParameters = StartChaosQueryParam &
  StartChaosMediaTypesParam &
  StartChaosBodyParam &
  RequestParameters;

export interface StopChaosQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface StopChaosQueryParam {
  queryParameters?: StopChaosQueryParamProperties;
}

export type StopChaosParameters = StopChaosQueryParam & RequestParameters;

export interface GetChaosEventsQueryParamProperties {
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The Windows file time representing the start time of the time range for which a Chaos report is to be generated. Consult [DateTime.ToFileTimeUtc Method](https://msdn.microsoft.com/library/system.datetime.tofiletimeutc(v=vs.110).aspx) for details. */
  StartTimeUtc?: string;
  /** The Windows file time representing the end time of the time range for which a Chaos report is to be generated. Consult [DateTime.ToFileTimeUtc Method](https://msdn.microsoft.com/library/system.datetime.tofiletimeutc(v=vs.110).aspx) for details. */
  EndTimeUtc?: string;
  /** The maximum number of results to be returned as part of the paged queries. This parameter defines the upper bound on the number of results returned. The results returned can be less than the specified maximum results if they do not fit in the message as per the max message size restrictions defined in the configuration. If this parameter is zero or not specified, the paged query includes as many results as possible that fit in the return message. */
  MaxResults?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetChaosEventsQueryParam {
  queryParameters?: GetChaosEventsQueryParamProperties;
}

export type GetChaosEventsParameters = GetChaosEventsQueryParam & RequestParameters;

export interface GetChaosScheduleQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetChaosScheduleQueryParam {
  queryParameters?: GetChaosScheduleQueryParamProperties;
}

export type GetChaosScheduleParameters = GetChaosScheduleQueryParam & RequestParameters;

export interface PostChaosScheduleBodyParam {
  /** Describes the schedule used by Chaos. */
  body: ChaosScheduleDescription;
}

export interface PostChaosScheduleQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface PostChaosScheduleQueryParam {
  queryParameters?: PostChaosScheduleQueryParamProperties;
}

export interface PostChaosScheduleMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type PostChaosScheduleParameters = PostChaosScheduleQueryParam &
  PostChaosScheduleMediaTypesParam &
  PostChaosScheduleBodyParam &
  RequestParameters;

export interface UploadFileQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface UploadFileQueryParam {
  queryParameters?: UploadFileQueryParamProperties;
}

export type UploadFileParameters = UploadFileQueryParam & RequestParameters;

export interface GetImageStoreContentQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetImageStoreContentQueryParam {
  queryParameters?: GetImageStoreContentQueryParamProperties;
}

export type GetImageStoreContentParameters = GetImageStoreContentQueryParam & RequestParameters;

export interface DeleteImageStoreContentQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface DeleteImageStoreContentQueryParam {
  queryParameters?: DeleteImageStoreContentQueryParamProperties;
}

export type DeleteImageStoreContentParameters = DeleteImageStoreContentQueryParam &
  RequestParameters;

export interface GetImageStoreRootContentQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetImageStoreRootContentQueryParam {
  queryParameters?: GetImageStoreRootContentQueryParamProperties;
}

export type GetImageStoreRootContentParameters = GetImageStoreRootContentQueryParam &
  RequestParameters;

export interface CopyImageStoreContentBodyParam {
  /** Describes the copy description for the image store. */
  body: ImageStoreCopyDescription;
}

export interface CopyImageStoreContentQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface CopyImageStoreContentQueryParam {
  queryParameters?: CopyImageStoreContentQueryParamProperties;
}

export interface CopyImageStoreContentMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CopyImageStoreContentParameters = CopyImageStoreContentQueryParam &
  CopyImageStoreContentMediaTypesParam &
  CopyImageStoreContentBodyParam &
  RequestParameters;

export interface DeleteImageStoreUploadSessionQueryParamProperties {
  /**
   * A GUID generated by the user for a file uploading. It identifies an image store upload session which keeps track of all file chunks until it is committed.
   *
   * Value may contain a UUID
   */
  "session-id": string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface DeleteImageStoreUploadSessionQueryParam {
  queryParameters: DeleteImageStoreUploadSessionQueryParamProperties;
}

export type DeleteImageStoreUploadSessionParameters = DeleteImageStoreUploadSessionQueryParam &
  RequestParameters;

export interface CommitImageStoreUploadSessionQueryParamProperties {
  /**
   * A GUID generated by the user for a file uploading. It identifies an image store upload session which keeps track of all file chunks until it is committed.
   *
   * Value may contain a UUID
   */
  "session-id": string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface CommitImageStoreUploadSessionQueryParam {
  queryParameters: CommitImageStoreUploadSessionQueryParamProperties;
}

export type CommitImageStoreUploadSessionParameters = CommitImageStoreUploadSessionQueryParam &
  RequestParameters;

export interface GetImageStoreUploadSessionByIdQueryParamProperties {
  /**
   * A GUID generated by the user for a file uploading. It identifies an image store upload session which keeps track of all file chunks until it is committed.
   *
   * Value may contain a UUID
   */
  "session-id": string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetImageStoreUploadSessionByIdQueryParam {
  queryParameters: GetImageStoreUploadSessionByIdQueryParamProperties;
}

export type GetImageStoreUploadSessionByIdParameters = GetImageStoreUploadSessionByIdQueryParam &
  RequestParameters;

export interface GetImageStoreUploadSessionByPathQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetImageStoreUploadSessionByPathQueryParam {
  queryParameters?: GetImageStoreUploadSessionByPathQueryParamProperties;
}

export type GetImageStoreUploadSessionByPathParameters = GetImageStoreUploadSessionByPathQueryParam &
  RequestParameters;

export interface UploadFileChunkHeaders {
  /** When uploading file chunks to the image store, the Content-Range header field need to be configured and sent with a request. The format should looks like "bytes {First-Byte-Position}-{Last-Byte-Position}/{File-Length}". For example, Content-Range:bytes 300-5000/20000 indicates that user is sending bytes 300 through 5,000 and the total file length is 20,000 bytes. */
  "Content-Range": string;
}

export interface UploadFileChunkQueryParamProperties {
  /**
   * A GUID generated by the user for a file uploading. It identifies an image store upload session which keeps track of all file chunks until it is committed.
   *
   * Value may contain a UUID
   */
  "session-id": string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface UploadFileChunkQueryParam {
  queryParameters: UploadFileChunkQueryParamProperties;
}

export interface UploadFileChunkHeaderParam {
  headers: RawHttpHeadersInput & UploadFileChunkHeaders;
}

export type UploadFileChunkParameters = UploadFileChunkQueryParam &
  UploadFileChunkHeaderParam &
  RequestParameters;

export interface GetImageStoreRootFolderSizeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetImageStoreRootFolderSizeQueryParam {
  queryParameters?: GetImageStoreRootFolderSizeQueryParamProperties;
}

export type GetImageStoreRootFolderSizeParameters = GetImageStoreRootFolderSizeQueryParam &
  RequestParameters;

export interface GetImageStoreFolderSizeQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetImageStoreFolderSizeQueryParam {
  queryParameters?: GetImageStoreFolderSizeQueryParamProperties;
}

export type GetImageStoreFolderSizeParameters = GetImageStoreFolderSizeQueryParam &
  RequestParameters;

export interface GetImageStoreInfoQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetImageStoreInfoQueryParam {
  queryParameters?: GetImageStoreInfoQueryParamProperties;
}

export type GetImageStoreInfoParameters = GetImageStoreInfoQueryParam & RequestParameters;

export interface InvokeInfrastructureCommandQueryParamProperties {
  /** The text of the command to be invoked. The content of the command is infrastructure-specific. */
  Command: string;
  /** The identity of the infrastructure service. This is the full name of the infrastructure service without the 'fabric:' URI scheme. This parameter required only for the cluster that has more than one instance of infrastructure service running. */
  ServiceId?: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface InvokeInfrastructureCommandQueryParam {
  queryParameters: InvokeInfrastructureCommandQueryParamProperties;
}

export type InvokeInfrastructureCommandParameters = InvokeInfrastructureCommandQueryParam &
  RequestParameters;

export interface InvokeInfrastructureQueryQueryParamProperties {
  /** The text of the command to be invoked. The content of the command is infrastructure-specific. */
  Command: string;
  /** The identity of the infrastructure service. This is the full name of the infrastructure service without the 'fabric:' URI scheme. This parameter required only for the cluster that has more than one instance of infrastructure service running. */
  ServiceId?: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface InvokeInfrastructureQueryQueryParam {
  queryParameters: InvokeInfrastructureQueryQueryParamProperties;
}

export type InvokeInfrastructureQueryParameters = InvokeInfrastructureQueryQueryParam &
  RequestParameters;

export interface StartDataLossQueryParamProperties {
  /**
   * A GUID that identifies a call of this API.  This is passed into the corresponding GetProgress API
   *
   * Value may contain a UUID
   */
  OperationId: string;
  /** This enum is passed to the StartDataLoss API to indicate what type of data loss to induce. */
  DataLossMode: "Invalid" | "PartialDataLoss" | "FullDataLoss";
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface StartDataLossQueryParam {
  queryParameters: StartDataLossQueryParamProperties;
}

export type StartDataLossParameters = StartDataLossQueryParam & RequestParameters;

export interface GetDataLossProgressQueryParamProperties {
  /**
   * A GUID that identifies a call of this API.  This is passed into the corresponding GetProgress API
   *
   * Value may contain a UUID
   */
  OperationId: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetDataLossProgressQueryParam {
  queryParameters: GetDataLossProgressQueryParamProperties;
}

export type GetDataLossProgressParameters = GetDataLossProgressQueryParam & RequestParameters;

export interface StartQuorumLossQueryParamProperties {
  /**
   * A GUID that identifies a call of this API.  This is passed into the corresponding GetProgress API
   *
   * Value may contain a UUID
   */
  OperationId: string;
  /** This enum is passed to the StartQuorumLoss API to indicate what type of quorum loss to induce. */
  QuorumLossMode: "Invalid" | "QuorumReplicas" | "AllReplicas";
  /** The amount of time for which the partition will be kept in quorum loss.  This must be specified in seconds. */
  QuorumLossDuration: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface StartQuorumLossQueryParam {
  queryParameters: StartQuorumLossQueryParamProperties;
}

export type StartQuorumLossParameters = StartQuorumLossQueryParam & RequestParameters;

export interface GetQuorumLossProgressQueryParamProperties {
  /**
   * A GUID that identifies a call of this API.  This is passed into the corresponding GetProgress API
   *
   * Value may contain a UUID
   */
  OperationId: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetQuorumLossProgressQueryParam {
  queryParameters: GetQuorumLossProgressQueryParamProperties;
}

export type GetQuorumLossProgressParameters = GetQuorumLossProgressQueryParam & RequestParameters;

export interface StartPartitionRestartQueryParamProperties {
  /**
   * A GUID that identifies a call of this API.  This is passed into the corresponding GetProgress API
   *
   * Value may contain a UUID
   */
  OperationId: string;
  /** Describe which partitions to restart. */
  RestartPartitionMode: "Invalid" | "AllReplicasOrInstances" | "OnlyActiveSecondaries";
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface StartPartitionRestartQueryParam {
  queryParameters: StartPartitionRestartQueryParamProperties;
}

export type StartPartitionRestartParameters = StartPartitionRestartQueryParam & RequestParameters;

export interface GetPartitionRestartProgressQueryParamProperties {
  /**
   * A GUID that identifies a call of this API.  This is passed into the corresponding GetProgress API
   *
   * Value may contain a UUID
   */
  OperationId: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetPartitionRestartProgressQueryParam {
  queryParameters: GetPartitionRestartProgressQueryParamProperties;
}

export type GetPartitionRestartProgressParameters = GetPartitionRestartProgressQueryParam &
  RequestParameters;

export interface StartNodeTransitionQueryParamProperties {
  /**
   * A GUID that identifies a call of this API.  This is passed into the corresponding GetProgress API
   *
   * Value may contain a UUID
   */
  OperationId: string;
  /** Indicates the type of transition to perform.  NodeTransitionType.Start will start a stopped node.  NodeTransitionType.Stop will stop a node that is up. */
  NodeTransitionType: "Invalid" | "Start" | "Stop";
  /** The node instance ID of the target node.  This can be determined through GetNodeInfo API. */
  NodeInstanceId: string;
  /** The duration, in seconds, to keep the node stopped.  The minimum value is 600, the maximum is 14400.  After this time expires, the node will automatically come back up. */
  StopDurationInSeconds: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface StartNodeTransitionQueryParam {
  queryParameters: StartNodeTransitionQueryParamProperties;
}

export type StartNodeTransitionParameters = StartNodeTransitionQueryParam & RequestParameters;

export interface GetNodeTransitionProgressQueryParamProperties {
  /**
   * A GUID that identifies a call of this API.  This is passed into the corresponding GetProgress API
   *
   * Value may contain a UUID
   */
  OperationId: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetNodeTransitionProgressQueryParam {
  queryParameters: GetNodeTransitionProgressQueryParamProperties;
}

export type GetNodeTransitionProgressParameters = GetNodeTransitionProgressQueryParam &
  RequestParameters;

export interface GetFaultOperationListQueryParamProperties {
  /**
   * Used to filter on OperationType for user-induced operations.
   *
   * - 65535 - select all
   * - 1 - select PartitionDataLoss.
   * - 2 - select PartitionQuorumLoss.
   * - 4 - select PartitionRestart.
   * - 8 - select NodeTransition.
   */
  TypeFilter: number;
  /**
   * Used to filter on OperationState's for user-induced operations.
   *
   * - 65535 - select All
   * - 1 - select Running
   * - 2 - select RollingBack
   * - 8 - select Completed
   * - 16 - select Faulted
   * - 32 - select Cancelled
   * - 64 - select ForceCancelled
   */
  StateFilter: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetFaultOperationListQueryParam {
  queryParameters: GetFaultOperationListQueryParamProperties;
}

export type GetFaultOperationListParameters = GetFaultOperationListQueryParam & RequestParameters;

export interface CancelOperationQueryParamProperties {
  /**
   * A GUID that identifies a call of this API.  This is passed into the corresponding GetProgress API
   *
   * Value may contain a UUID
   */
  OperationId: string;
  /** Indicates whether to gracefully roll back and clean up internal system state modified by executing the user-induced operation. */
  Force: boolean;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface CancelOperationQueryParam {
  queryParameters: CancelOperationQueryParamProperties;
}

export type CancelOperationParameters = CancelOperationQueryParam & RequestParameters;

export interface CreateBackupPolicyBodyParam {
  /** Describes the backup policy. */
  body: BackupPolicyDescription;
}

export interface CreateBackupPolicyQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** Specifies whether to validate the storage connection and credentials before creating or updating the backup policies. */
  ValidateConnection?: boolean;
}

export interface CreateBackupPolicyQueryParam {
  queryParameters?: CreateBackupPolicyQueryParamProperties;
}

export interface CreateBackupPolicyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateBackupPolicyParameters = CreateBackupPolicyQueryParam &
  CreateBackupPolicyMediaTypesParam &
  CreateBackupPolicyBodyParam &
  RequestParameters;

export interface DeleteBackupPolicyQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface DeleteBackupPolicyQueryParam {
  queryParameters?: DeleteBackupPolicyQueryParamProperties;
}

export type DeleteBackupPolicyParameters = DeleteBackupPolicyQueryParam & RequestParameters;

export interface GetBackupPolicyListQueryParamProperties {
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The maximum number of results to be returned as part of the paged queries. This parameter defines the upper bound on the number of results returned. The results returned can be less than the specified maximum results if they do not fit in the message as per the max message size restrictions defined in the configuration. If this parameter is zero or not specified, the paged query includes as many results as possible that fit in the return message. */
  MaxResults?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetBackupPolicyListQueryParam {
  queryParameters?: GetBackupPolicyListQueryParamProperties;
}

export type GetBackupPolicyListParameters = GetBackupPolicyListQueryParam & RequestParameters;

export interface GetBackupPolicyByNameQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetBackupPolicyByNameQueryParam {
  queryParameters?: GetBackupPolicyByNameQueryParamProperties;
}

export type GetBackupPolicyByNameParameters = GetBackupPolicyByNameQueryParam & RequestParameters;

export interface GetAllEntitiesBackedUpByPolicyQueryParamProperties {
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The maximum number of results to be returned as part of the paged queries. This parameter defines the upper bound on the number of results returned. The results returned can be less than the specified maximum results if they do not fit in the message as per the max message size restrictions defined in the configuration. If this parameter is zero or not specified, the paged query includes as many results as possible that fit in the return message. */
  MaxResults?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetAllEntitiesBackedUpByPolicyQueryParam {
  queryParameters?: GetAllEntitiesBackedUpByPolicyQueryParamProperties;
}

export type GetAllEntitiesBackedUpByPolicyParameters = GetAllEntitiesBackedUpByPolicyQueryParam &
  RequestParameters;

export interface UpdateBackupPolicyBodyParam {
  /** Describes the backup policy. */
  body: BackupPolicyDescription;
}

export interface UpdateBackupPolicyQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** Specifies whether to validate the storage connection and credentials before creating or updating the backup policies. */
  ValidateConnection?: boolean;
}

export interface UpdateBackupPolicyQueryParam {
  queryParameters?: UpdateBackupPolicyQueryParamProperties;
}

export interface UpdateBackupPolicyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type UpdateBackupPolicyParameters = UpdateBackupPolicyQueryParam &
  UpdateBackupPolicyMediaTypesParam &
  UpdateBackupPolicyBodyParam &
  RequestParameters;

export interface EnableApplicationBackupBodyParam {
  /** Specifies the parameters for enabling backup. */
  body: EnableBackupDescription;
}

export interface EnableApplicationBackupQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface EnableApplicationBackupQueryParam {
  queryParameters?: EnableApplicationBackupQueryParamProperties;
}

export interface EnableApplicationBackupMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EnableApplicationBackupParameters = EnableApplicationBackupQueryParam &
  EnableApplicationBackupMediaTypesParam &
  EnableApplicationBackupBodyParam &
  RequestParameters;

export interface DisableApplicationBackupBodyParam {
  /** Specifies the parameters to disable backup for any backup entity. */
  body?: DisableBackupDescription;
}

export interface DisableApplicationBackupQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface DisableApplicationBackupQueryParam {
  queryParameters?: DisableApplicationBackupQueryParamProperties;
}

export interface DisableApplicationBackupMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DisableApplicationBackupParameters = DisableApplicationBackupQueryParam &
  DisableApplicationBackupMediaTypesParam &
  DisableApplicationBackupBodyParam &
  RequestParameters;

export interface GetApplicationBackupConfigurationInfoQueryParamProperties {
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The maximum number of results to be returned as part of the paged queries. This parameter defines the upper bound on the number of results returned. The results returned can be less than the specified maximum results if they do not fit in the message as per the max message size restrictions defined in the configuration. If this parameter is zero or not specified, the paged query includes as many results as possible that fit in the return message. */
  MaxResults?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetApplicationBackupConfigurationInfoQueryParam {
  queryParameters?: GetApplicationBackupConfigurationInfoQueryParamProperties;
}

export type GetApplicationBackupConfigurationInfoParameters = GetApplicationBackupConfigurationInfoQueryParam &
  RequestParameters;

export interface GetApplicationBackupListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** Specifies whether to get only the most recent backup available for a partition for the specified time range. */
  Latest?: boolean;
  /** Specify the start date time from which to enumerate backups, in datetime format. The date time must be specified in ISO8601 format. This is an optional parameter. If not specified, all backups from the beginning are enumerated. */
  StartDateTimeFilter?: Date | string;
  /** Specify the end date time till which to enumerate backups, in datetime format. The date time must be specified in ISO8601 format. This is an optional parameter. If not specified, enumeration is done till the most recent backup. */
  EndDateTimeFilter?: Date | string;
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The maximum number of results to be returned as part of the paged queries. This parameter defines the upper bound on the number of results returned. The results returned can be less than the specified maximum results if they do not fit in the message as per the max message size restrictions defined in the configuration. If this parameter is zero or not specified, the paged query includes as many results as possible that fit in the return message. */
  MaxResults?: number;
}

export interface GetApplicationBackupListQueryParam {
  queryParameters?: GetApplicationBackupListQueryParamProperties;
}

export type GetApplicationBackupListParameters = GetApplicationBackupListQueryParam &
  RequestParameters;

export interface SuspendApplicationBackupQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface SuspendApplicationBackupQueryParam {
  queryParameters?: SuspendApplicationBackupQueryParamProperties;
}

export type SuspendApplicationBackupParameters = SuspendApplicationBackupQueryParam &
  RequestParameters;

export interface ResumeApplicationBackupQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ResumeApplicationBackupQueryParam {
  queryParameters?: ResumeApplicationBackupQueryParamProperties;
}

export type ResumeApplicationBackupParameters = ResumeApplicationBackupQueryParam &
  RequestParameters;

export interface EnableServiceBackupBodyParam {
  /** Specifies the parameters for enabling backup. */
  body: EnableBackupDescription;
}

export interface EnableServiceBackupQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface EnableServiceBackupQueryParam {
  queryParameters?: EnableServiceBackupQueryParamProperties;
}

export interface EnableServiceBackupMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EnableServiceBackupParameters = EnableServiceBackupQueryParam &
  EnableServiceBackupMediaTypesParam &
  EnableServiceBackupBodyParam &
  RequestParameters;

export interface DisableServiceBackupBodyParam {
  /** Specifies the parameters to disable backup for any backup entity. */
  body?: DisableBackupDescription;
}

export interface DisableServiceBackupQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface DisableServiceBackupQueryParam {
  queryParameters?: DisableServiceBackupQueryParamProperties;
}

export interface DisableServiceBackupMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DisableServiceBackupParameters = DisableServiceBackupQueryParam &
  DisableServiceBackupMediaTypesParam &
  DisableServiceBackupBodyParam &
  RequestParameters;

export interface GetServiceBackupConfigurationInfoQueryParamProperties {
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The maximum number of results to be returned as part of the paged queries. This parameter defines the upper bound on the number of results returned. The results returned can be less than the specified maximum results if they do not fit in the message as per the max message size restrictions defined in the configuration. If this parameter is zero or not specified, the paged query includes as many results as possible that fit in the return message. */
  MaxResults?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetServiceBackupConfigurationInfoQueryParam {
  queryParameters?: GetServiceBackupConfigurationInfoQueryParamProperties;
}

export type GetServiceBackupConfigurationInfoParameters = GetServiceBackupConfigurationInfoQueryParam &
  RequestParameters;

export interface GetServiceBackupListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** Specifies whether to get only the most recent backup available for a partition for the specified time range. */
  Latest?: boolean;
  /** Specify the start date time from which to enumerate backups, in datetime format. The date time must be specified in ISO8601 format. This is an optional parameter. If not specified, all backups from the beginning are enumerated. */
  StartDateTimeFilter?: Date | string;
  /** Specify the end date time till which to enumerate backups, in datetime format. The date time must be specified in ISO8601 format. This is an optional parameter. If not specified, enumeration is done till the most recent backup. */
  EndDateTimeFilter?: Date | string;
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The maximum number of results to be returned as part of the paged queries. This parameter defines the upper bound on the number of results returned. The results returned can be less than the specified maximum results if they do not fit in the message as per the max message size restrictions defined in the configuration. If this parameter is zero or not specified, the paged query includes as many results as possible that fit in the return message. */
  MaxResults?: number;
}

export interface GetServiceBackupListQueryParam {
  queryParameters?: GetServiceBackupListQueryParamProperties;
}

export type GetServiceBackupListParameters = GetServiceBackupListQueryParam & RequestParameters;

export interface SuspendServiceBackupQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface SuspendServiceBackupQueryParam {
  queryParameters?: SuspendServiceBackupQueryParamProperties;
}

export type SuspendServiceBackupParameters = SuspendServiceBackupQueryParam & RequestParameters;

export interface ResumeServiceBackupQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ResumeServiceBackupQueryParam {
  queryParameters?: ResumeServiceBackupQueryParamProperties;
}

export type ResumeServiceBackupParameters = ResumeServiceBackupQueryParam & RequestParameters;

export interface EnablePartitionBackupBodyParam {
  /** Specifies the parameters for enabling backup. */
  body: EnableBackupDescription;
}

export interface EnablePartitionBackupQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface EnablePartitionBackupQueryParam {
  queryParameters?: EnablePartitionBackupQueryParamProperties;
}

export interface EnablePartitionBackupMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type EnablePartitionBackupParameters = EnablePartitionBackupQueryParam &
  EnablePartitionBackupMediaTypesParam &
  EnablePartitionBackupBodyParam &
  RequestParameters;

export interface DisablePartitionBackupBodyParam {
  /** Specifies the parameters to disable backup for any backup entity. */
  body?: DisableBackupDescription;
}

export interface DisablePartitionBackupQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface DisablePartitionBackupQueryParam {
  queryParameters?: DisablePartitionBackupQueryParamProperties;
}

export interface DisablePartitionBackupMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DisablePartitionBackupParameters = DisablePartitionBackupQueryParam &
  DisablePartitionBackupMediaTypesParam &
  DisablePartitionBackupBodyParam &
  RequestParameters;

export interface GetPartitionBackupConfigurationInfoQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetPartitionBackupConfigurationInfoQueryParam {
  queryParameters?: GetPartitionBackupConfigurationInfoQueryParamProperties;
}

export type GetPartitionBackupConfigurationInfoParameters = GetPartitionBackupConfigurationInfoQueryParam &
  RequestParameters;

export interface GetPartitionBackupListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** Specifies whether to get only the most recent backup available for a partition for the specified time range. */
  Latest?: boolean;
  /** Specify the start date time from which to enumerate backups, in datetime format. The date time must be specified in ISO8601 format. This is an optional parameter. If not specified, all backups from the beginning are enumerated. */
  StartDateTimeFilter?: Date | string;
  /** Specify the end date time till which to enumerate backups, in datetime format. The date time must be specified in ISO8601 format. This is an optional parameter. If not specified, enumeration is done till the most recent backup. */
  EndDateTimeFilter?: Date | string;
}

export interface GetPartitionBackupListQueryParam {
  queryParameters?: GetPartitionBackupListQueryParamProperties;
}

export type GetPartitionBackupListParameters = GetPartitionBackupListQueryParam & RequestParameters;

export interface SuspendPartitionBackupQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface SuspendPartitionBackupQueryParam {
  queryParameters?: SuspendPartitionBackupQueryParamProperties;
}

export type SuspendPartitionBackupParameters = SuspendPartitionBackupQueryParam & RequestParameters;

export interface ResumePartitionBackupQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface ResumePartitionBackupQueryParam {
  queryParameters?: ResumePartitionBackupQueryParamProperties;
}

export type ResumePartitionBackupParameters = ResumePartitionBackupQueryParam & RequestParameters;

export interface BackupPartitionBodyParam {
  /** Describes the parameters to backup the partition now. If not present, backup operation uses default parameters from the backup policy current associated with this partition. */
  body?: BackupPartitionDescription;
}

export interface BackupPartitionQueryParamProperties {
  /** Specifies the maximum amount of time, in minutes, to wait for the backup operation to complete. Post that, the operation completes with timeout error. However, in certain corner cases it could be that though the operation returns back timeout, the backup actually goes through. In case of timeout error, its recommended to invoke this operation again with a greater timeout value. The default value for the same is 10 minutes. */
  BackupTimeout?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface BackupPartitionQueryParam {
  queryParameters?: BackupPartitionQueryParamProperties;
}

export interface BackupPartitionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type BackupPartitionParameters = BackupPartitionQueryParam &
  BackupPartitionMediaTypesParam &
  BackupPartitionBodyParam &
  RequestParameters;

export interface GetPartitionBackupProgressQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetPartitionBackupProgressQueryParam {
  queryParameters?: GetPartitionBackupProgressQueryParamProperties;
}

export type GetPartitionBackupProgressParameters = GetPartitionBackupProgressQueryParam &
  RequestParameters;

export interface RestorePartitionBodyParam {
  /** Describes the parameters to restore the partition. */
  body: RestorePartitionDescription;
}

export interface RestorePartitionQueryParamProperties {
  /** Specifies the maximum amount of time to wait, in minutes, for the restore operation to complete. Post that, the operation returns back with timeout error. However, in certain corner cases it could be that the restore operation goes through even though it completes with timeout. In case of timeout error, its recommended to invoke this operation again with a greater timeout value. the default value for the same is 10 minutes. */
  RestoreTimeout?: number;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface RestorePartitionQueryParam {
  queryParameters?: RestorePartitionQueryParamProperties;
}

export interface RestorePartitionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RestorePartitionParameters = RestorePartitionQueryParam &
  RestorePartitionMediaTypesParam &
  RestorePartitionBodyParam &
  RequestParameters;

export interface GetPartitionRestoreProgressQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetPartitionRestoreProgressQueryParam {
  queryParameters?: GetPartitionRestoreProgressQueryParamProperties;
}

export type GetPartitionRestoreProgressParameters = GetPartitionRestoreProgressQueryParam &
  RequestParameters;

export interface GetBackupsFromBackupLocationBodyParam {
  /** Describes the filters and backup storage details to be used for enumerating backups. */
  body: GetBackupByStorageQueryDescription;
}

export interface GetBackupsFromBackupLocationQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The maximum number of results to be returned as part of the paged queries. This parameter defines the upper bound on the number of results returned. The results returned can be less than the specified maximum results if they do not fit in the message as per the max message size restrictions defined in the configuration. If this parameter is zero or not specified, the paged query includes as many results as possible that fit in the return message. */
  MaxResults?: number;
}

export interface GetBackupsFromBackupLocationQueryParam {
  queryParameters?: GetBackupsFromBackupLocationQueryParamProperties;
}

export interface GetBackupsFromBackupLocationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetBackupsFromBackupLocationParameters = GetBackupsFromBackupLocationQueryParam &
  GetBackupsFromBackupLocationMediaTypesParam &
  GetBackupsFromBackupLocationBodyParam &
  RequestParameters;

export interface CreateNameBodyParam {
  /** Describes the Service Fabric name to be created. */
  body: NameDescription;
}

export interface CreateNameQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface CreateNameQueryParam {
  queryParameters?: CreateNameQueryParamProperties;
}

export interface CreateNameMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CreateNameParameters = CreateNameQueryParam &
  CreateNameMediaTypesParam &
  CreateNameBodyParam &
  RequestParameters;

export interface GetNameExistsInfoQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetNameExistsInfoQueryParam {
  queryParameters?: GetNameExistsInfoQueryParamProperties;
}

export type GetNameExistsInfoParameters = GetNameExistsInfoQueryParam & RequestParameters;

export interface DeleteNameQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface DeleteNameQueryParam {
  queryParameters?: DeleteNameQueryParamProperties;
}

export type DeleteNameParameters = DeleteNameQueryParam & RequestParameters;

export interface GetSubNameInfoListQueryParamProperties {
  /** Allows specifying that the search performed should be recursive. */
  Recursive?: boolean;
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetSubNameInfoListQueryParam {
  queryParameters?: GetSubNameInfoListQueryParamProperties;
}

export type GetSubNameInfoListParameters = GetSubNameInfoListQueryParam & RequestParameters;

export interface GetPropertyInfoListQueryParamProperties {
  /** Allows specifying whether to include the values of the properties returned. True if values should be returned with the metadata; False to return only property metadata. */
  IncludeValues?: boolean;
  /** The continuation token parameter is used to obtain next set of results. A continuation token with a non-empty value is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token does not contain a value. The value of this parameter should not be URL encoded. */
  ContinuationToken?: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetPropertyInfoListQueryParam {
  queryParameters?: GetPropertyInfoListQueryParamProperties;
}

export type GetPropertyInfoListParameters = GetPropertyInfoListQueryParam & RequestParameters;

export interface PutPropertyBodyParam {
  /** Describes the Service Fabric property to be created. */
  body: PropertyDescription;
}

export interface PutPropertyQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface PutPropertyQueryParam {
  queryParameters?: PutPropertyQueryParamProperties;
}

export interface PutPropertyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type PutPropertyParameters = PutPropertyQueryParam &
  PutPropertyMediaTypesParam &
  PutPropertyBodyParam &
  RequestParameters;

export interface GetPropertyInfoQueryParamProperties {
  /** Specifies the name of the property to get. */
  PropertyName: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetPropertyInfoQueryParam {
  queryParameters: GetPropertyInfoQueryParamProperties;
}

export type GetPropertyInfoParameters = GetPropertyInfoQueryParam & RequestParameters;

export interface DeletePropertyQueryParamProperties {
  /** Specifies the name of the property to get. */
  PropertyName: string;
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface DeletePropertyQueryParam {
  queryParameters: DeletePropertyQueryParamProperties;
}

export type DeletePropertyParameters = DeletePropertyQueryParam & RequestParameters;

export interface SubmitPropertyBatchBodyParam {
  /** Describes the property batch operations to be submitted. */
  body: PropertyBatchDescriptionList;
}

export interface SubmitPropertyBatchQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface SubmitPropertyBatchQueryParam {
  queryParameters?: SubmitPropertyBatchQueryParamProperties;
}

export interface SubmitPropertyBatchMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SubmitPropertyBatchParameters = SubmitPropertyBatchQueryParam &
  SubmitPropertyBatchMediaTypesParam &
  SubmitPropertyBatchBodyParam &
  RequestParameters;

export interface GetClusterEventListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** The start time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  StartTimeUtc: string;
  /** The end time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  EndTimeUtc: string;
  /** This is a comma separated string specifying the types of FabricEvents that should only be included in the response. */
  EventsTypesFilter?: string;
  /** This param disables the retrieval of AnalysisEvents if true is passed. */
  ExcludeAnalysisEvents?: boolean;
  /** This param disables the search of CorrelatedEvents information if true is passed. otherwise the CorrelationEvents get processed and HasCorrelatedEvents field in every FabricEvent gets populated. */
  SkipCorrelationLookup?: boolean;
}

export interface GetClusterEventListQueryParam {
  queryParameters: GetClusterEventListQueryParamProperties;
}

export type GetClusterEventListParameters = GetClusterEventListQueryParam & RequestParameters;

export interface GetContainersEventListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** The start time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  StartTimeUtc: string;
  /** The end time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  EndTimeUtc: string;
  /** This is a comma separated string specifying the types of FabricEvents that should only be included in the response. */
  EventsTypesFilter?: string;
  /** This param disables the retrieval of AnalysisEvents if true is passed. */
  ExcludeAnalysisEvents?: boolean;
  /** This param disables the search of CorrelatedEvents information if true is passed. otherwise the CorrelationEvents get processed and HasCorrelatedEvents field in every FabricEvent gets populated. */
  SkipCorrelationLookup?: boolean;
}

export interface GetContainersEventListQueryParam {
  queryParameters: GetContainersEventListQueryParamProperties;
}

export type GetContainersEventListParameters = GetContainersEventListQueryParam & RequestParameters;

export interface GetNodeEventListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** The start time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  StartTimeUtc: string;
  /** The end time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  EndTimeUtc: string;
  /** This is a comma separated string specifying the types of FabricEvents that should only be included in the response. */
  EventsTypesFilter?: string;
  /** This param disables the retrieval of AnalysisEvents if true is passed. */
  ExcludeAnalysisEvents?: boolean;
  /** This param disables the search of CorrelatedEvents information if true is passed. otherwise the CorrelationEvents get processed and HasCorrelatedEvents field in every FabricEvent gets populated. */
  SkipCorrelationLookup?: boolean;
}

export interface GetNodeEventListQueryParam {
  queryParameters: GetNodeEventListQueryParamProperties;
}

export type GetNodeEventListParameters = GetNodeEventListQueryParam & RequestParameters;

export interface GetNodesEventListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** The start time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  StartTimeUtc: string;
  /** The end time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  EndTimeUtc: string;
  /** This is a comma separated string specifying the types of FabricEvents that should only be included in the response. */
  EventsTypesFilter?: string;
  /** This param disables the retrieval of AnalysisEvents if true is passed. */
  ExcludeAnalysisEvents?: boolean;
  /** This param disables the search of CorrelatedEvents information if true is passed. otherwise the CorrelationEvents get processed and HasCorrelatedEvents field in every FabricEvent gets populated. */
  SkipCorrelationLookup?: boolean;
}

export interface GetNodesEventListQueryParam {
  queryParameters: GetNodesEventListQueryParamProperties;
}

export type GetNodesEventListParameters = GetNodesEventListQueryParam & RequestParameters;

export interface GetApplicationEventListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** The start time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  StartTimeUtc: string;
  /** The end time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  EndTimeUtc: string;
  /** This is a comma separated string specifying the types of FabricEvents that should only be included in the response. */
  EventsTypesFilter?: string;
  /** This param disables the retrieval of AnalysisEvents if true is passed. */
  ExcludeAnalysisEvents?: boolean;
  /** This param disables the search of CorrelatedEvents information if true is passed. otherwise the CorrelationEvents get processed and HasCorrelatedEvents field in every FabricEvent gets populated. */
  SkipCorrelationLookup?: boolean;
}

export interface GetApplicationEventListQueryParam {
  queryParameters: GetApplicationEventListQueryParamProperties;
}

export type GetApplicationEventListParameters = GetApplicationEventListQueryParam &
  RequestParameters;

export interface GetApplicationsEventListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** The start time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  StartTimeUtc: string;
  /** The end time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  EndTimeUtc: string;
  /** This is a comma separated string specifying the types of FabricEvents that should only be included in the response. */
  EventsTypesFilter?: string;
  /** This param disables the retrieval of AnalysisEvents if true is passed. */
  ExcludeAnalysisEvents?: boolean;
  /** This param disables the search of CorrelatedEvents information if true is passed. otherwise the CorrelationEvents get processed and HasCorrelatedEvents field in every FabricEvent gets populated. */
  SkipCorrelationLookup?: boolean;
}

export interface GetApplicationsEventListQueryParam {
  queryParameters: GetApplicationsEventListQueryParamProperties;
}

export type GetApplicationsEventListParameters = GetApplicationsEventListQueryParam &
  RequestParameters;

export interface GetServiceEventListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** The start time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  StartTimeUtc: string;
  /** The end time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  EndTimeUtc: string;
  /** This is a comma separated string specifying the types of FabricEvents that should only be included in the response. */
  EventsTypesFilter?: string;
  /** This param disables the retrieval of AnalysisEvents if true is passed. */
  ExcludeAnalysisEvents?: boolean;
  /** This param disables the search of CorrelatedEvents information if true is passed. otherwise the CorrelationEvents get processed and HasCorrelatedEvents field in every FabricEvent gets populated. */
  SkipCorrelationLookup?: boolean;
}

export interface GetServiceEventListQueryParam {
  queryParameters: GetServiceEventListQueryParamProperties;
}

export type GetServiceEventListParameters = GetServiceEventListQueryParam & RequestParameters;

export interface GetServicesEventListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** The start time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  StartTimeUtc: string;
  /** The end time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  EndTimeUtc: string;
  /** This is a comma separated string specifying the types of FabricEvents that should only be included in the response. */
  EventsTypesFilter?: string;
  /** This param disables the retrieval of AnalysisEvents if true is passed. */
  ExcludeAnalysisEvents?: boolean;
  /** This param disables the search of CorrelatedEvents information if true is passed. otherwise the CorrelationEvents get processed and HasCorrelatedEvents field in every FabricEvent gets populated. */
  SkipCorrelationLookup?: boolean;
}

export interface GetServicesEventListQueryParam {
  queryParameters: GetServicesEventListQueryParamProperties;
}

export type GetServicesEventListParameters = GetServicesEventListQueryParam & RequestParameters;

export interface GetPartitionEventListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** The start time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  StartTimeUtc: string;
  /** The end time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  EndTimeUtc: string;
  /** This is a comma separated string specifying the types of FabricEvents that should only be included in the response. */
  EventsTypesFilter?: string;
  /** This param disables the retrieval of AnalysisEvents if true is passed. */
  ExcludeAnalysisEvents?: boolean;
  /** This param disables the search of CorrelatedEvents information if true is passed. otherwise the CorrelationEvents get processed and HasCorrelatedEvents field in every FabricEvent gets populated. */
  SkipCorrelationLookup?: boolean;
}

export interface GetPartitionEventListQueryParam {
  queryParameters: GetPartitionEventListQueryParamProperties;
}

export type GetPartitionEventListParameters = GetPartitionEventListQueryParam & RequestParameters;

export interface GetPartitionsEventListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** The start time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  StartTimeUtc: string;
  /** The end time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  EndTimeUtc: string;
  /** This is a comma separated string specifying the types of FabricEvents that should only be included in the response. */
  EventsTypesFilter?: string;
  /** This param disables the retrieval of AnalysisEvents if true is passed. */
  ExcludeAnalysisEvents?: boolean;
  /** This param disables the search of CorrelatedEvents information if true is passed. otherwise the CorrelationEvents get processed and HasCorrelatedEvents field in every FabricEvent gets populated. */
  SkipCorrelationLookup?: boolean;
}

export interface GetPartitionsEventListQueryParam {
  queryParameters: GetPartitionsEventListQueryParamProperties;
}

export type GetPartitionsEventListParameters = GetPartitionsEventListQueryParam & RequestParameters;

export interface GetPartitionReplicaEventListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** The start time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  StartTimeUtc: string;
  /** The end time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  EndTimeUtc: string;
  /** This is a comma separated string specifying the types of FabricEvents that should only be included in the response. */
  EventsTypesFilter?: string;
  /** This param disables the retrieval of AnalysisEvents if true is passed. */
  ExcludeAnalysisEvents?: boolean;
  /** This param disables the search of CorrelatedEvents information if true is passed. otherwise the CorrelationEvents get processed and HasCorrelatedEvents field in every FabricEvent gets populated. */
  SkipCorrelationLookup?: boolean;
}

export interface GetPartitionReplicaEventListQueryParam {
  queryParameters: GetPartitionReplicaEventListQueryParamProperties;
}

export type GetPartitionReplicaEventListParameters = GetPartitionReplicaEventListQueryParam &
  RequestParameters;

export interface GetPartitionReplicasEventListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
  /** The start time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  StartTimeUtc: string;
  /** The end time of a lookup query in ISO UTC yyyy-MM-ddTHH:mm:ssZ. */
  EndTimeUtc: string;
  /** This is a comma separated string specifying the types of FabricEvents that should only be included in the response. */
  EventsTypesFilter?: string;
  /** This param disables the retrieval of AnalysisEvents if true is passed. */
  ExcludeAnalysisEvents?: boolean;
  /** This param disables the search of CorrelatedEvents information if true is passed. otherwise the CorrelationEvents get processed and HasCorrelatedEvents field in every FabricEvent gets populated. */
  SkipCorrelationLookup?: boolean;
}

export interface GetPartitionReplicasEventListQueryParam {
  queryParameters: GetPartitionReplicasEventListQueryParamProperties;
}

export type GetPartitionReplicasEventListParameters = GetPartitionReplicasEventListQueryParam &
  RequestParameters;

export interface GetCorrelatedEventListQueryParamProperties {
  /** The server timeout for performing the operation in seconds. This timeout specifies the time duration that the client is willing to wait for the requested operation to complete. The default value for this parameter is 60 seconds. */
  timeout?: number;
}

export interface GetCorrelatedEventListQueryParam {
  queryParameters?: GetCorrelatedEventListQueryParamProperties;
}

export type GetCorrelatedEventListParameters = GetCorrelatedEventListQueryParam & RequestParameters;

export interface MeshSecretCreateOrUpdateBodyParam {
  /** Description for creating a secret resource. */
  body: SecretResourceDescription;
}

export interface MeshSecretCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MeshSecretCreateOrUpdateParameters = MeshSecretCreateOrUpdateMediaTypesParam &
  MeshSecretCreateOrUpdateBodyParam &
  RequestParameters;
export type MeshSecretGetParameters = RequestParameters;
export type MeshSecretDeleteParameters = RequestParameters;
export type MeshSecretListParameters = RequestParameters;

export interface MeshSecretValueAddValueBodyParam {
  /** Description for creating a value of a secret resource. */
  body: SecretValueResourceDescription;
}

export interface MeshSecretValueAddValueMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MeshSecretValueAddValueParameters = MeshSecretValueAddValueMediaTypesParam &
  MeshSecretValueAddValueBodyParam &
  RequestParameters;
export type MeshSecretValueGetParameters = RequestParameters;
export type MeshSecretValueDeleteParameters = RequestParameters;
export type MeshSecretValueListParameters = RequestParameters;
export type MeshSecretValueShowParameters = RequestParameters;

export interface MeshVolumeCreateOrUpdateBodyParam {
  /** Description for creating a Volume resource. */
  body: VolumeResourceDescription;
}

export interface MeshVolumeCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MeshVolumeCreateOrUpdateParameters = MeshVolumeCreateOrUpdateMediaTypesParam &
  MeshVolumeCreateOrUpdateBodyParam &
  RequestParameters;
export type MeshVolumeGetParameters = RequestParameters;
export type MeshVolumeDeleteParameters = RequestParameters;
export type MeshVolumeListParameters = RequestParameters;

export interface MeshNetworkCreateOrUpdateBodyParam {
  /** Description for creating a Network resource. */
  body: NetworkResourceDescription;
}

export interface MeshNetworkCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MeshNetworkCreateOrUpdateParameters = MeshNetworkCreateOrUpdateMediaTypesParam &
  MeshNetworkCreateOrUpdateBodyParam &
  RequestParameters;
export type MeshNetworkGetParameters = RequestParameters;
export type MeshNetworkDeleteParameters = RequestParameters;
export type MeshNetworkListParameters = RequestParameters;

export interface MeshApplicationCreateOrUpdateBodyParam {
  /** Description for creating a Application resource. */
  body: ApplicationResourceDescription;
}

export interface MeshApplicationCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MeshApplicationCreateOrUpdateParameters = MeshApplicationCreateOrUpdateMediaTypesParam &
  MeshApplicationCreateOrUpdateBodyParam &
  RequestParameters;
export type MeshApplicationGetParameters = RequestParameters;
export type MeshApplicationDeleteParameters = RequestParameters;
export type MeshApplicationListParameters = RequestParameters;
export type MeshApplicationGetUpgradeProgressParameters = RequestParameters;
export type MeshServiceGetParameters = RequestParameters;
export type MeshServiceListParameters = RequestParameters;

export interface MeshCodePackageGetContainerLogsQueryParamProperties {
  /** Number of lines to show from the end of the logs. Default is 100. 'all' to show the complete logs. */
  Tail?: string;
}

export interface MeshCodePackageGetContainerLogsQueryParam {
  queryParameters?: MeshCodePackageGetContainerLogsQueryParamProperties;
}

export type MeshCodePackageGetContainerLogsParameters = MeshCodePackageGetContainerLogsQueryParam &
  RequestParameters;
export type MeshServiceReplicaGetParameters = RequestParameters;
export type MeshServiceReplicaListParameters = RequestParameters;

export interface MeshGatewayCreateOrUpdateBodyParam {
  /** Description for creating a Gateway resource. */
  body: GatewayResourceDescription;
}

export interface MeshGatewayCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type MeshGatewayCreateOrUpdateParameters = MeshGatewayCreateOrUpdateMediaTypesParam &
  MeshGatewayCreateOrUpdateBodyParam &
  RequestParameters;
export type MeshGatewayGetParameters = RequestParameters;
export type MeshGatewayDeleteParameters = RequestParameters;
export type MeshGatewayListParameters = RequestParameters;
