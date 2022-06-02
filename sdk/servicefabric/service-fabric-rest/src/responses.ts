// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
  ClusterManifestOutput,
  FabricErrorOutput,
  ClusterHealthOutput,
  ClusterHealthChunkOutput,
  FabricCodeVersionInfoOutput,
  FabricConfigVersionInfoOutput,
  ClusterUpgradeProgressObjectOutput,
  ClusterConfigurationOutput,
  ClusterConfigurationUpgradeStatusInfoOutput,
  UpgradeOrchestrationServiceStateOutput,
  UpgradeOrchestrationServiceStateSummaryOutput,
  AadMetadataObjectOutput,
  ClusterVersionOutput,
  ClusterLoadInfoOutput,
  PagedNodeInfoListOutput,
  NodeInfoOutput,
  NodeHealthOutput,
  NodeLoadInfoOutput,
  ConfigParameterOverrideOutput,
  PagedApplicationTypeInfoListOutput,
  ServiceTypeInfoOutput,
  ServiceTypeManifestOutput,
  DeployedServiceTypeInfoOutput,
  ApplicationLoadInfoOutput,
  PagedApplicationInfoListOutput,
  ApplicationInfoOutput,
  ApplicationHealthOutput,
  ApplicationUpgradeProgressInfoOutput,
  PagedDeployedApplicationInfoListOutput,
  DeployedApplicationInfoOutput,
  DeployedApplicationHealthOutput,
  ApplicationTypeManifestOutput,
  PagedServiceInfoListOutput,
  ServiceInfoOutput,
  ApplicationNameInfoOutput,
  ServiceDescriptionOutput,
  ServiceHealthOutput,
  ResolvedServicePartitionOutput,
  UnplacedReplicaInformationOutput,
  LoadedPartitionInformationResultListOutput,
  PagedServicePartitionInfoListOutput,
  ServicePartitionInfoOutput,
  ServiceNameInfoOutput,
  PartitionHealthOutput,
  PartitionLoadInformationOutput,
  PagedUpdatePartitionLoadResultListOutput,
  RepairTaskUpdateInfoOutput,
  RepairTaskOutput,
  PagedReplicaInfoListOutput,
  ReplicaInfoOutput,
  ReplicaHealthOutput,
  DeployedServiceReplicaInfoOutput,
  DeployedServiceReplicaDetailInfoOutput,
  DeployedServicePackageInfoOutput,
  DeployedServicePackageHealthOutput,
  DeployedCodePackageInfoOutput,
  ContainerLogsOutput,
  ContainerApiResponseOutput,
  ComposeDeploymentStatusInfoOutput,
  PagedComposeDeploymentStatusInfoListOutput,
  ComposeDeploymentUpgradeProgressInfoOutput,
  ChaosOutput,
  ChaosEventsSegmentOutput,
  ChaosScheduleDescriptionOutput,
  ImageStoreContentOutput,
  UploadSessionOutput,
  FolderSizeInfoOutput,
  ImageStoreInfoOutput,
  PartitionDataLossProgressOutput,
  PartitionQuorumLossProgressOutput,
  PartitionRestartProgressOutput,
  NodeTransitionProgressOutput,
  OperationStatusOutput,
  PagedBackupPolicyDescriptionListOutput,
  BackupPolicyDescriptionOutput,
  PagedBackupEntityListOutput,
  PagedBackupConfigurationInfoListOutput,
  PagedBackupInfoListOutput,
  PartitionBackupConfigurationInfoOutput,
  BackupProgressInfoOutput,
  RestoreProgressInfoOutput,
  PagedSubNameInfoListOutput,
  PagedPropertyInfoListOutput,
  PropertyInfoOutput,
  SuccessfulPropertyBatchInfoOutput,
  FailedPropertyBatchInfoOutput,
  ClusterEventOutput,
  ContainerInstanceEventOutput,
  NodeEventOutput,
  ApplicationEventOutput,
  ServiceEventOutput,
  PartitionEventOutput,
  ReplicaEventOutput,
  FabricEventOutput,
  SecretResourceDescriptionOutput,
  PagedSecretResourceDescriptionListOutput,
  SecretValueResourceDescriptionOutput,
  PagedSecretValueResourceDescriptionListOutput,
  SecretValueOutput,
  VolumeResourceDescriptionOutput,
  PagedVolumeResourceDescriptionListOutput,
  NetworkResourceDescriptionOutput,
  PagedNetworkResourceDescriptionListOutput,
  ApplicationResourceDescriptionOutput,
  PagedApplicationResourceDescriptionListOutput,
  ApplicationResourceUpgradeProgressInfoOutput,
  ServiceResourceDescriptionOutput,
  PagedServiceResourceDescriptionListOutput,
  ServiceReplicaDescriptionOutput,
  PagedServiceReplicaDescriptionListOutput,
  GatewayResourceDescriptionOutput,
  PagedGatewayResourceDescriptionListOutput,
} from "./outputModels";

/**
 * Get the Service Fabric cluster manifest. The cluster manifest contains properties of the cluster that include different node types on the cluster,
 * security configurations, fault, and upgrade domain topologies, etc.
 *
 * These properties are specified as part of the ClusterConfig.JSON file while deploying a stand-alone cluster. However, most of the information in the cluster manifest
 * is generated internally by service fabric during cluster deployment in other deployment scenarios (e.g. when using Azure portal).
 *
 * The contents of the cluster manifest are for informational purposes only and users are not expected to take a dependency on the format of the file contents or its interpretation.
 */
export interface GetClusterManifest200Response extends HttpResponse {
  status: "200";
  body: ClusterManifestOutput;
}

/**
 * Get the Service Fabric cluster manifest. The cluster manifest contains properties of the cluster that include different node types on the cluster,
 * security configurations, fault, and upgrade domain topologies, etc.
 *
 * These properties are specified as part of the ClusterConfig.JSON file while deploying a stand-alone cluster. However, most of the information in the cluster manifest
 * is generated internally by service fabric during cluster deployment in other deployment scenarios (e.g. when using Azure portal).
 *
 * The contents of the cluster manifest are for informational purposes only and users are not expected to take a dependency on the format of the file contents or its interpretation.
 */
export interface GetClusterManifestdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Use EventsHealthStateFilter to filter the collection of health events reported on the cluster based on the health state.
 * Similarly, use NodesHealthStateFilter and ApplicationsHealthStateFilter to filter the collection of nodes and applications returned based on their aggregated health state.
 */
export interface GetClusterHealth200Response extends HttpResponse {
  status: "200";
  body: ClusterHealthOutput;
}

/**
 * Use EventsHealthStateFilter to filter the collection of health events reported on the cluster based on the health state.
 * Similarly, use NodesHealthStateFilter and ApplicationsHealthStateFilter to filter the collection of nodes and applications returned based on their aggregated health state.
 */
export interface GetClusterHealthdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Use EventsHealthStateFilter to filter the collection of health events reported on the cluster based on the health state.
 * Similarly, use NodesHealthStateFilter and ApplicationsHealthStateFilter to filter the collection of nodes and applications returned based on their aggregated health state.
 * Use ClusterHealthPolicies to override the health policies used to evaluate the health.
 */
export interface GetClusterHealthUsingPolicy200Response extends HttpResponse {
  status: "200";
  body: ClusterHealthOutput;
}

/**
 * Use EventsHealthStateFilter to filter the collection of health events reported on the cluster based on the health state.
 * Similarly, use NodesHealthStateFilter and ApplicationsHealthStateFilter to filter the collection of nodes and applications returned based on their aggregated health state.
 * Use ClusterHealthPolicies to override the health policies used to evaluate the health.
 */
export interface GetClusterHealthUsingPolicydefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Gets the health of a Service Fabric cluster using health chunks. Includes the aggregated health state of the cluster, but none of the cluster entities.
 * To expand the cluster health and get the health state of all or some of the entities, use the POST URI and specify the cluster health chunk query description.
 */
export interface GetClusterHealthChunk200Response extends HttpResponse {
  status: "200";
  body: ClusterHealthChunkOutput;
}

/**
 * Gets the health of a Service Fabric cluster using health chunks. Includes the aggregated health state of the cluster, but none of the cluster entities.
 * To expand the cluster health and get the health state of all or some of the entities, use the POST URI and specify the cluster health chunk query description.
 */
export interface GetClusterHealthChunkdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Gets the health of a Service Fabric cluster using health chunks. The health evaluation is done based on the input cluster health chunk query description.
 * The query description allows users to specify health policies for evaluating the cluster and its children.
 * Users can specify very flexible filters to select which cluster entities to return. The selection can be done based on the entities health state and based on the hierarchy.
 * The query can return multi-level children of the entities based on the specified filters. For example, it can return one application with a specified name, and for this application, return
 * only services that are in Error or Warning, and all partitions and replicas for one of these services.
 */
export interface GetClusterHealthChunkUsingPolicyAndAdvancedFilters200Response
  extends HttpResponse {
  status: "200";
  body: ClusterHealthChunkOutput;
}

/**
 * Gets the health of a Service Fabric cluster using health chunks. The health evaluation is done based on the input cluster health chunk query description.
 * The query description allows users to specify health policies for evaluating the cluster and its children.
 * Users can specify very flexible filters to select which cluster entities to return. The selection can be done based on the entities health state and based on the hierarchy.
 * The query can return multi-level children of the entities based on the specified filters. For example, it can return one application with a specified name, and for this application, return
 * only services that are in Error or Warning, and all partitions and replicas for one of these services.
 */
export interface GetClusterHealthChunkUsingPolicyAndAdvancedFiltersdefaultResponse
  extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Sends a health report on a Service Fabric cluster. The report must contain the information about the source of the health report and property on which it is reported.
 * The report is sent to a Service Fabric gateway node, which forwards to the health store.
 * The report may be accepted by the gateway, but rejected by the health store after extra validation.
 * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
 * To see whether the report was applied in the health store, run GetClusterHealth and check that the report appears in the HealthEvents section.
 */
export interface ReportClusterHealth200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * Sends a health report on a Service Fabric cluster. The report must contain the information about the source of the health report and property on which it is reported.
 * The report is sent to a Service Fabric gateway node, which forwards to the health store.
 * The report may be accepted by the gateway, but rejected by the health store after extra validation.
 * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
 * To see whether the report was applied in the health store, run GetClusterHealth and check that the report appears in the HealthEvents section.
 */
export interface ReportClusterHealthdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets a list of information about fabric code versions that are provisioned in the cluster. The parameter CodeVersion can be used to optionally filter the output to only that particular version. */
export interface GetProvisionedFabricCodeVersionInfoList200Response extends HttpResponse {
  status: "200";
  body: Array<FabricCodeVersionInfoOutput>;
}

/** Gets a list of information about fabric code versions that are provisioned in the cluster. The parameter CodeVersion can be used to optionally filter the output to only that particular version. */
export interface GetProvisionedFabricCodeVersionInfoListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets a list of information about fabric config versions that are provisioned in the cluster. The parameter ConfigVersion can be used to optionally filter the output to only that particular version. */
export interface GetProvisionedFabricConfigVersionInfoList200Response extends HttpResponse {
  status: "200";
  body: Array<FabricConfigVersionInfoOutput>;
}

/** Gets a list of information about fabric config versions that are provisioned in the cluster. The parameter ConfigVersion can be used to optionally filter the output to only that particular version. */
export interface GetProvisionedFabricConfigVersionInfoListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the current progress of the ongoing cluster upgrade. If no upgrade is currently in progress, get the last state of the previous cluster upgrade. */
export interface GetClusterUpgradeProgress200Response extends HttpResponse {
  status: "200";
  body: ClusterUpgradeProgressObjectOutput;
}

/** Gets the current progress of the ongoing cluster upgrade. If no upgrade is currently in progress, get the last state of the previous cluster upgrade. */
export interface GetClusterUpgradeProgressdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * The cluster configuration contains properties of the cluster that include different node types on the cluster,
 * security configurations, fault, and upgrade domain topologies, etc.
 */
export interface GetClusterConfiguration200Response extends HttpResponse {
  status: "200";
  body: ClusterConfigurationOutput;
}

/**
 * The cluster configuration contains properties of the cluster that include different node types on the cluster,
 * security configurations, fault, and upgrade domain topologies, etc.
 */
export interface GetClusterConfigurationdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Get the cluster configuration upgrade status details of a Service Fabric standalone cluster. */
export interface GetClusterConfigurationUpgradeStatus200Response extends HttpResponse {
  status: "200";
  body: ClusterConfigurationUpgradeStatusInfoOutput;
}

/** Get the cluster configuration upgrade status details of a Service Fabric standalone cluster. */
export interface GetClusterConfigurationUpgradeStatusdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Get the service state of Service Fabric Upgrade Orchestration Service. This API is internally used for support purposes. */
export interface GetUpgradeOrchestrationServiceState200Response extends HttpResponse {
  status: "200";
  body: UpgradeOrchestrationServiceStateOutput;
}

/** Get the service state of Service Fabric Upgrade Orchestration Service. This API is internally used for support purposes. */
export interface GetUpgradeOrchestrationServiceStatedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Update the service state of Service Fabric Upgrade Orchestration Service. This API is internally used for support purposes. */
export interface SetUpgradeOrchestrationServiceState200Response extends HttpResponse {
  status: "200";
  body: UpgradeOrchestrationServiceStateSummaryOutput;
}

/** Update the service state of Service Fabric Upgrade Orchestration Service. This API is internally used for support purposes. */
export interface SetUpgradeOrchestrationServiceStatedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Validate and provision the code or configuration packages of a Service Fabric cluster. */
export interface ProvisionCluster200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Validate and provision the code or configuration packages of a Service Fabric cluster. */
export interface ProvisionClusterdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** It is supported to unprovision code and configuration separately. */
export interface UnprovisionCluster200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** It is supported to unprovision code and configuration separately. */
export interface UnprovisionClusterdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Roll back the code or configuration upgrade of a Service Fabric cluster. */
export interface RollbackClusterUpgrade202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Roll back the code or configuration upgrade of a Service Fabric cluster. */
export interface RollbackClusterUpgradedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Make the cluster code or configuration upgrade move on to the next upgrade domain if appropriate. */
export interface ResumeClusterUpgrade200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Make the cluster code or configuration upgrade move on to the next upgrade domain if appropriate. */
export interface ResumeClusterUpgradedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Validate the supplied upgrade parameters and start upgrading the code or configuration version of a Service Fabric cluster if the parameters are valid. */
export interface StartClusterUpgrade202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Validate the supplied upgrade parameters and start upgrading the code or configuration version of a Service Fabric cluster if the parameters are valid. */
export interface StartClusterUpgradedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Validate the supplied configuration upgrade parameters and start upgrading the cluster configuration if the parameters are valid. */
export interface StartClusterConfigurationUpgrade202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Validate the supplied configuration upgrade parameters and start upgrading the cluster configuration if the parameters are valid. */
export interface StartClusterConfigurationUpgradedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Update the upgrade parameters used during a Service Fabric cluster upgrade. */
export interface UpdateClusterUpgrade200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Update the upgrade parameters used during a Service Fabric cluster upgrade. */
export interface UpdateClusterUpgradedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Gets the Azure Active Directory metadata used for secured connection to cluster.
 * This API is not supposed to be called separately. It provides information needed to set up an Azure Active Directory secured connection with a Service Fabric cluster.
 */
export interface GetAadMetadata200Response extends HttpResponse {
  status: "200";
  body: AadMetadataObjectOutput;
}

/**
 * Gets the Azure Active Directory metadata used for secured connection to cluster.
 * This API is not supposed to be called separately. It provides information needed to set up an Azure Active Directory secured connection with a Service Fabric cluster.
 */
export interface GetAadMetadatadefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** If a cluster upgrade is happening, then this API will return the lowest (older) version of the current and target cluster runtime versions. */
export interface GetClusterVersion200Response extends HttpResponse {
  status: "200";
  body: ClusterVersionOutput;
}

/** If a cluster upgrade is happening, then this API will return the lowest (older) version of the current and target cluster runtime versions. */
export interface GetClusterVersiondefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Retrieves the load information of a Service Fabric cluster for all the metrics that have load or capacity defined. */
export interface GetClusterLoad200Response extends HttpResponse {
  status: "200";
  body: ClusterLoadInfoOutput;
}

/** Retrieves the load information of a Service Fabric cluster for all the metrics that have load or capacity defined. */
export interface GetClusterLoaddefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * If verbosity is set to true, then detailed health reports will be generated when replicas cannot be placed or dropped.
 * If verbosity is set to false, then no health reports will be generated when replicas cannot be placed or dropped.
 */
export interface ToggleVerboseServicePlacementHealthReporting200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * If verbosity is set to true, then detailed health reports will be generated when replicas cannot be placed or dropped.
 * If verbosity is set to false, then no health reports will be generated when replicas cannot be placed or dropped.
 */
export interface ToggleVerboseServicePlacementHealthReportingdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response includes the name, status, ID, health, uptime, and other details about the nodes. */
export interface GetNodeInfoList200Response extends HttpResponse {
  status: "200";
  body: PagedNodeInfoListOutput;
}

/** The response includes the name, status, ID, health, uptime, and other details about the nodes. */
export interface GetNodeInfoListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response includes the name, status, ID, health, uptime, and other details about the node. */
export interface GetNodeInfo200Response extends HttpResponse {
  status: "200";
  body: NodeInfoOutput;
}

/** The response includes the name, status, ID, health, uptime, and other details about the node. */
export interface GetNodeInfo204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** The response includes the name, status, ID, health, uptime, and other details about the node. */
export interface GetNodeInfodefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the health of a Service Fabric node. Use EventsHealthStateFilter to filter the collection of health events reported on the node based on the health state. If the node that you specify by name does not exist in the health store, this returns an error. */
export interface GetNodeHealth200Response extends HttpResponse {
  status: "200";
  body: NodeHealthOutput;
}

/** Gets the health of a Service Fabric node. Use EventsHealthStateFilter to filter the collection of health events reported on the node based on the health state. If the node that you specify by name does not exist in the health store, this returns an error. */
export interface GetNodeHealthdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the health of a Service Fabric node. Use EventsHealthStateFilter to filter the collection of health events reported on the node based on the health state. Use ClusterHealthPolicy in the POST body to override the health policies used to evaluate the health. If the node that you specify by name does not exist in the health store, this returns an error. */
export interface GetNodeHealthUsingPolicy200Response extends HttpResponse {
  status: "200";
  body: NodeHealthOutput;
}

/** Gets the health of a Service Fabric node. Use EventsHealthStateFilter to filter the collection of health events reported on the node based on the health state. Use ClusterHealthPolicy in the POST body to override the health policies used to evaluate the health. If the node that you specify by name does not exist in the health store, this returns an error. */
export interface GetNodeHealthUsingPolicydefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Reports health state of the specified Service Fabric node. The report must contain the information about the source of the health report and property on which it is reported.
 * The report is sent to a Service Fabric gateway node, which forwards to the health store.
 * The report may be accepted by the gateway, but rejected by the health store after extra validation.
 * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
 * To see whether the report was applied in the health store, run GetNodeHealth and check that the report appears in the HealthEvents section.
 */
export interface ReportNodeHealth200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * Reports health state of the specified Service Fabric node. The report must contain the information about the source of the health report and property on which it is reported.
 * The report is sent to a Service Fabric gateway node, which forwards to the health store.
 * The report may be accepted by the gateway, but rejected by the health store after extra validation.
 * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
 * To see whether the report was applied in the health store, run GetNodeHealth and check that the report appears in the HealthEvents section.
 */
export interface ReportNodeHealthdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Retrieves the load information of a Service Fabric node for all the metrics that have load or capacity defined. */
export interface GetNodeLoadInfo200Response extends HttpResponse {
  status: "200";
  body: NodeLoadInfoOutput;
}

/** Retrieves the load information of a Service Fabric node for all the metrics that have load or capacity defined. */
export interface GetNodeLoadInfodefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Deactivate a Service Fabric cluster node with the specified deactivation intent. Once the deactivation is in progress, the deactivation intent can be increased, but not decreased (for example, a node that is deactivated with the Pause intent can be deactivated further with Restart, but not the other way around. Nodes may be reactivated using the Activate a node operation any time after they are deactivated. If the deactivation is not complete, this will cancel the deactivation. A node that goes down and comes back up while deactivated will still need to be reactivated before services will be placed on that node. */
export interface DisableNode200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deactivate a Service Fabric cluster node with the specified deactivation intent. Once the deactivation is in progress, the deactivation intent can be increased, but not decreased (for example, a node that is deactivated with the Pause intent can be deactivated further with Restart, but not the other way around. Nodes may be reactivated using the Activate a node operation any time after they are deactivated. If the deactivation is not complete, this will cancel the deactivation. A node that goes down and comes back up while deactivated will still need to be reactivated before services will be placed on that node. */
export interface DisableNodedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Activates a Service Fabric cluster node that is currently deactivated. Once activated, the node will again become a viable target for placing new replicas, and any deactivated replicas remaining on the node will be reactivated. */
export interface EnableNode200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Activates a Service Fabric cluster node that is currently deactivated. Once activated, the node will again become a viable target for placing new replicas, and any deactivated replicas remaining on the node will be reactivated. */
export interface EnableNodedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This implies that it is not possible to recover the persisted state of that node. This generally happens if a hard disk has been wiped clean, or if a hard disk crashes. The node has to be down for this operation to be successful. This operation lets Service Fabric know that the replicas on that node no longer exist, and that Service Fabric should stop waiting for those replicas to come back up. Do not run this cmdlet if the state on the node has not been removed and the node can come back up with its state intact. Starting from Service Fabric 6.5, in order to use this API for seed nodes, please change the seed nodes to regular (non-seed) nodes and then invoke this API to remove the node state. If the cluster is running on Azure, after the seed node goes down, Service Fabric will try to change it to a non-seed node automatically. To make this happen, make sure the number of non-seed nodes in the primary node type is no less than the number of Down seed nodes. If necessary, add more nodes to the primary node type to achieve this. For standalone cluster, if the Down seed node is not expected to come back up with its state intact, please remove the node from the cluster, see https://docs.microsoft.com/azure/service-fabric/service-fabric-cluster-windows-server-add-remove-nodes */
export interface RemoveNodeState200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** This implies that it is not possible to recover the persisted state of that node. This generally happens if a hard disk has been wiped clean, or if a hard disk crashes. The node has to be down for this operation to be successful. This operation lets Service Fabric know that the replicas on that node no longer exist, and that Service Fabric should stop waiting for those replicas to come back up. Do not run this cmdlet if the state on the node has not been removed and the node can come back up with its state intact. Starting from Service Fabric 6.5, in order to use this API for seed nodes, please change the seed nodes to regular (non-seed) nodes and then invoke this API to remove the node state. If the cluster is running on Azure, after the seed node goes down, Service Fabric will try to change it to a non-seed node automatically. To make this happen, make sure the number of non-seed nodes in the primary node type is no less than the number of Down seed nodes. If necessary, add more nodes to the primary node type to achieve this. For standalone cluster, if the Down seed node is not expected to come back up with its state intact, please remove the node from the cluster, see https://docs.microsoft.com/azure/service-fabric/service-fabric-cluster-windows-server-add-remove-nodes */
export interface RemoveNodeStatedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Restarts a Service Fabric cluster node that is already started. */
export interface RestartNode200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restarts a Service Fabric cluster node that is already started. */
export interface RestartNodedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This api allows removing all existing configuration overrides on specified node. */
export interface RemoveConfigurationOverrides200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** This api allows removing all existing configuration overrides on specified node. */
export interface RemoveConfigurationOverridesdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This api allows getting all existing configuration overrides on the specified node. */
export interface GetConfigurationOverrides200Response extends HttpResponse {
  status: "200";
  body: Array<ConfigParameterOverrideOutput>;
}

/** This api allows getting all existing configuration overrides on the specified node. */
export interface GetConfigurationOverridesdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This api allows adding all existing configuration overrides on the specified node. */
export interface AddConfigurationParameterOverrides200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** This api allows adding all existing configuration overrides on the specified node. */
export interface AddConfigurationParameterOverridesdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This api allows removing set of tags from the specified node. */
export interface RemoveNodeTags200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** This api allows removing set of tags from the specified node. */
export interface RemoveNodeTagsdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This api allows adding tags to the specified node. */
export interface AddNodeTags200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** This api allows adding tags to the specified node. */
export interface AddNodeTagsdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns the information about the application types that are provisioned or in the process of being provisioned in the Service Fabric cluster. Each version of an application type is returned as one application type. The response includes the name, version, status, and other details about the application type. This is a paged query, meaning that if not all of the application types fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. For example, if there are 10 application types but a page only fits the first three application types, or if max results is set to 3, then three is returned. To access the rest of the results, retrieve subsequent pages by using the returned continuation token in the next query. An empty continuation token is returned if there are no subsequent pages. */
export interface GetApplicationTypeInfoList200Response extends HttpResponse {
  status: "200";
  body: PagedApplicationTypeInfoListOutput;
}

/** Returns the information about the application types that are provisioned or in the process of being provisioned in the Service Fabric cluster. Each version of an application type is returned as one application type. The response includes the name, version, status, and other details about the application type. This is a paged query, meaning that if not all of the application types fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. For example, if there are 10 application types but a page only fits the first three application types, or if max results is set to 3, then three is returned. To access the rest of the results, retrieve subsequent pages by using the returned continuation token in the next query. An empty continuation token is returned if there are no subsequent pages. */
export interface GetApplicationTypeInfoListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns the information about the application types that are provisioned or in the process of being provisioned in the Service Fabric cluster. These results are of application types whose name match exactly the one specified as the parameter, and which comply with the given query parameters. All versions of the application type matching the application type name are returned, with each version returned as one application type. The response includes the name, version, status, and other details about the application type. This is a paged query, meaning that if not all of the application types fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. For example, if there are 10 application types but a page only fits the first three application types, or if max results is set to 3, then three is returned. To access the rest of the results, retrieve subsequent pages by using the returned continuation token in the next query. An empty continuation token is returned if there are no subsequent pages. */
export interface GetApplicationTypeInfoListByName200Response extends HttpResponse {
  status: "200";
  body: PagedApplicationTypeInfoListOutput;
}

/** Returns the information about the application types that are provisioned or in the process of being provisioned in the Service Fabric cluster. These results are of application types whose name match exactly the one specified as the parameter, and which comply with the given query parameters. All versions of the application type matching the application type name are returned, with each version returned as one application type. The response includes the name, version, status, and other details about the application type. This is a paged query, meaning that if not all of the application types fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. For example, if there are 10 application types but a page only fits the first three application types, or if max results is set to 3, then three is returned. To access the rest of the results, retrieve subsequent pages by using the returned continuation token in the next query. An empty continuation token is returned if there are no subsequent pages. */
export interface GetApplicationTypeInfoListByNamedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Provisions a Service Fabric application type with the cluster. The provision is required before any new applications can be instantiated.
 * The provision operation can be performed either on the application package specified by the relativePathInImageStore, or by using the URI of the external '.sfpkg'.
 */
export interface ProvisionApplicationType200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * Provisions a Service Fabric application type with the cluster. The provision is required before any new applications can be instantiated.
 * The provision operation can be performed either on the application package specified by the relativePathInImageStore, or by using the URI of the external '.sfpkg'.
 */
export interface ProvisionApplicationType202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/**
 * Provisions a Service Fabric application type with the cluster. The provision is required before any new applications can be instantiated.
 * The provision operation can be performed either on the application package specified by the relativePathInImageStore, or by using the URI of the external '.sfpkg'.
 */
export interface ProvisionApplicationTypedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This operation can only be performed if all application instances of the application type have been deleted. Once the application type is unregistered, no new application instances can be created for this particular application type. */
export interface UnprovisionApplicationType200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** This operation can only be performed if all application instances of the application type have been deleted. Once the application type is unregistered, no new application instances can be created for this particular application type. */
export interface UnprovisionApplicationType202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** This operation can only be performed if all application instances of the application type have been deleted. Once the application type is unregistered, no new application instances can be created for this particular application type. */
export interface UnprovisionApplicationTypedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the list containing the information about service types that are supported by a provisioned application type in a Service Fabric cluster. The provided application type must exist. Otherwise, a 404 status is returned. */
export interface GetServiceTypeInfoList200Response extends HttpResponse {
  status: "200";
  body: Array<ServiceTypeInfoOutput>;
}

/** Gets the list containing the information about service types that are supported by a provisioned application type in a Service Fabric cluster. The provided application type must exist. Otherwise, a 404 status is returned. */
export interface GetServiceTypeInfoListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about a specific service type that is supported by a provisioned application type in a Service Fabric cluster. The provided application type must exist. Otherwise, a 404 status is returned. A 204 response is returned if the specified service type is not found in the cluster. */
export interface GetServiceTypeInfoByName200Response extends HttpResponse {
  status: "200";
  body: ServiceTypeInfoOutput;
}

/** Gets the information about a specific service type that is supported by a provisioned application type in a Service Fabric cluster. The provided application type must exist. Otherwise, a 404 status is returned. A 204 response is returned if the specified service type is not found in the cluster. */
export interface GetServiceTypeInfoByName204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Gets the information about a specific service type that is supported by a provisioned application type in a Service Fabric cluster. The provided application type must exist. Otherwise, a 404 status is returned. A 204 response is returned if the specified service type is not found in the cluster. */
export interface GetServiceTypeInfoByNamedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the manifest describing a service type. The response contains the service manifest XML as a string. */
export interface GetServiceManifest200Response extends HttpResponse {
  status: "200";
  body: ServiceTypeManifestOutput;
}

/** Gets the manifest describing a service type. The response contains the service manifest XML as a string. */
export interface GetServiceManifestdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the list containing the information about service types from the applications deployed on a node in a Service Fabric cluster. The response includes the name of the service type, its registration status, the code package that registered it and activation ID of the service package. */
export interface GetDeployedServiceTypeInfoList200Response extends HttpResponse {
  status: "200";
  body: Array<DeployedServiceTypeInfoOutput>;
}

/** Gets the list containing the information about service types from the applications deployed on a node in a Service Fabric cluster. The response includes the name of the service type, its registration status, the code package that registered it and activation ID of the service package. */
export interface GetDeployedServiceTypeInfoListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the list containing the information about a specific service type from the applications deployed on a node in a Service Fabric cluster. The response includes the name of the service type, its registration status, the code package that registered it and activation ID of the service package. Each entry represents one activation of a service type, differentiated by the activation ID. */
export interface GetDeployedServiceTypeInfoByName200Response extends HttpResponse {
  status: "200";
  body: Array<DeployedServiceTypeInfoOutput>;
}

/** Gets the list containing the information about a specific service type from the applications deployed on a node in a Service Fabric cluster. The response includes the name of the service type, its registration status, the code package that registered it and activation ID of the service package. Each entry represents one activation of a service type, differentiated by the activation ID. */
export interface GetDeployedServiceTypeInfoByName204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Gets the list containing the information about a specific service type from the applications deployed on a node in a Service Fabric cluster. The response includes the name of the service type, its registration status, the code package that registered it and activation ID of the service package. Each entry represents one activation of a service type, differentiated by the activation ID. */
export interface GetDeployedServiceTypeInfoByNamedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Creates a Service Fabric application using the specified description. */
export interface CreateApplication201Response extends HttpResponse {
  status: "201";
  body: Record<string, unknown>;
}

/** Creates a Service Fabric application using the specified description. */
export interface CreateApplicationdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** An application must be created before it can be deleted. Deleting an application will delete all services that are part of that application. By default, Service Fabric will try to close service replicas in a graceful manner and then delete the service. However, if a service is having issues closing the replica gracefully, the delete operation may take a long time or get stuck. Use the optional ForceRemove flag to skip the graceful close sequence and forcefully delete the application and all of its services. */
export interface DeleteApplication200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** An application must be created before it can be deleted. Deleting an application will delete all services that are part of that application. By default, Service Fabric will try to close service replicas in a graceful manner and then delete the service. However, if a service is having issues closing the replica gracefully, the delete operation may take a long time or get stuck. Use the optional ForceRemove flag to skip the graceful close sequence and forcefully delete the application and all of its services. */
export interface DeleteApplicationdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns the load information about the application that was created or in the process of being created in the Service Fabric cluster and whose name matches the one specified as the parameter. The response includes the name, minimum nodes, maximum nodes, the number of nodes the application is occupying currently, and application load metric information about the application. */
export interface GetApplicationLoadInfo200Response extends HttpResponse {
  status: "200";
  body: ApplicationLoadInfoOutput;
}

/** Returns the load information about the application that was created or in the process of being created in the Service Fabric cluster and whose name matches the one specified as the parameter. The response includes the name, minimum nodes, maximum nodes, the number of nodes the application is occupying currently, and application load metric information about the application. */
export interface GetApplicationLoadInfo204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Returns the load information about the application that was created or in the process of being created in the Service Fabric cluster and whose name matches the one specified as the parameter. The response includes the name, minimum nodes, maximum nodes, the number of nodes the application is occupying currently, and application load metric information about the application. */
export interface GetApplicationLoadInfodefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about the applications that were created or in the process of being created in the Service Fabric cluster and match the specified filters. The response includes the name, type, status, parameters, and other details about the application. If the applications do not fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. Filters ApplicationTypeName and ApplicationDefinitionKindFilter cannot be specified at the same time. */
export interface GetApplicationInfoList200Response extends HttpResponse {
  status: "200";
  body: PagedApplicationInfoListOutput;
}

/** Gets the information about the applications that were created or in the process of being created in the Service Fabric cluster and match the specified filters. The response includes the name, type, status, parameters, and other details about the application. If the applications do not fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. Filters ApplicationTypeName and ApplicationDefinitionKindFilter cannot be specified at the same time. */
export interface GetApplicationInfoListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns the information about the application that was created or in the process of being created in the Service Fabric cluster and whose name matches the one specified as the parameter. The response includes the name, type, status, parameters, and other details about the application. */
export interface GetApplicationInfo200Response extends HttpResponse {
  status: "200";
  body: ApplicationInfoOutput;
}

/** Returns the information about the application that was created or in the process of being created in the Service Fabric cluster and whose name matches the one specified as the parameter. The response includes the name, type, status, parameters, and other details about the application. */
export interface GetApplicationInfo204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Returns the information about the application that was created or in the process of being created in the Service Fabric cluster and whose name matches the one specified as the parameter. The response includes the name, type, status, parameters, and other details about the application. */
export interface GetApplicationInfodefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns the heath state of the service fabric application. The response reports either Ok, Error or Warning health state. If the entity is not found in the health store, it will return Error. */
export interface GetApplicationHealth200Response extends HttpResponse {
  status: "200";
  body: ApplicationHealthOutput;
}

/** Returns the heath state of the service fabric application. The response reports either Ok, Error or Warning health state. If the entity is not found in the health store, it will return Error. */
export interface GetApplicationHealthdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the health of a Service Fabric application. Use EventsHealthStateFilter to filter the collection of health events reported on the node based on the health state. Use ClusterHealthPolicies to override the health policies used to evaluate the health. */
export interface GetApplicationHealthUsingPolicy200Response extends HttpResponse {
  status: "200";
  body: ApplicationHealthOutput;
}

/** Gets the health of a Service Fabric application. Use EventsHealthStateFilter to filter the collection of health events reported on the node based on the health state. Use ClusterHealthPolicies to override the health policies used to evaluate the health. */
export interface GetApplicationHealthUsingPolicydefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Reports health state of the specified Service Fabric application. The report must contain the information about the source of the health report and property on which it is reported.
 * The report is sent to a Service Fabric gateway Application, which forwards to the health store.
 * The report may be accepted by the gateway, but rejected by the health store after extra validation.
 * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
 * To see whether the report was applied in the health store, get application health and check that the report appears in the HealthEvents section.
 */
export interface ReportApplicationHealth200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * Reports health state of the specified Service Fabric application. The report must contain the information about the source of the health report and property on which it is reported.
 * The report is sent to a Service Fabric gateway Application, which forwards to the health store.
 * The report may be accepted by the gateway, but rejected by the health store after extra validation.
 * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
 * To see whether the report was applied in the health store, get application health and check that the report appears in the HealthEvents section.
 */
export interface ReportApplicationHealthdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Validates the supplied application upgrade parameters and starts upgrading the application if the parameters are valid.
 * Note, [ApplicationParameter](https://docs.microsoft.com/dotnet/api/system.fabric.description.applicationdescription.applicationparameters)s are not preserved across an application upgrade.
 * In order to preserve current application parameters, the user should get the parameters using [GetApplicationInfo](./GetApplicationInfo.md) operation first and pass them into the upgrade API call as shown in the example.
 */
export interface StartApplicationUpgrade200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * Validates the supplied application upgrade parameters and starts upgrading the application if the parameters are valid.
 * Note, [ApplicationParameter](https://docs.microsoft.com/dotnet/api/system.fabric.description.applicationdescription.applicationparameters)s are not preserved across an application upgrade.
 * In order to preserve current application parameters, the user should get the parameters using [GetApplicationInfo](./GetApplicationInfo.md) operation first and pass them into the upgrade API call as shown in the example.
 */
export interface StartApplicationUpgradedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns information about the state of the latest application upgrade along with details to aid debugging application health issues. */
export interface GetApplicationUpgrade200Response extends HttpResponse {
  status: "200";
  body: ApplicationUpgradeProgressInfoOutput;
}

/** Returns information about the state of the latest application upgrade along with details to aid debugging application health issues. */
export interface GetApplicationUpgradedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Updates the parameters of an ongoing application upgrade from the ones specified at the time of starting the application upgrade. This may be required to mitigate stuck application upgrades due to incorrect parameters or issues in the application to make progress. */
export interface UpdateApplicationUpgrade200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Updates the parameters of an ongoing application upgrade from the ones specified at the time of starting the application upgrade. This may be required to mitigate stuck application upgrades due to incorrect parameters or issues in the application to make progress. */
export interface UpdateApplicationUpgradedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Updates a Service Fabric application instance. The set of properties that can be updated are a subset of the properties that were specified at the time of creating the application. */
export interface UpdateApplication200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Updates a Service Fabric application instance. The set of properties that can be updated are a subset of the properties that were specified at the time of creating the application. */
export interface UpdateApplicationdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Resumes an unmonitored manual Service Fabric application upgrade. Service Fabric upgrades one upgrade domain at a time. For unmonitored manual upgrades, after Service Fabric finishes an upgrade domain, it waits for you to call this API before proceeding to the next upgrade domain. */
export interface ResumeApplicationUpgrade200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Resumes an unmonitored manual Service Fabric application upgrade. Service Fabric upgrades one upgrade domain at a time. For unmonitored manual upgrades, after Service Fabric finishes an upgrade domain, it waits for you to call this API before proceeding to the next upgrade domain. */
export interface ResumeApplicationUpgradedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Starts rolling back the current application upgrade to the previous version. This API can only be used to roll back the current in-progress upgrade that is rolling forward to new version. If the application is not currently being upgraded use StartApplicationUpgrade API to upgrade it to desired version, including rolling back to a previous version. */
export interface RollbackApplicationUpgrade200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Starts rolling back the current application upgrade to the previous version. This API can only be used to roll back the current in-progress upgrade that is rolling forward to new version. If the application is not currently being upgraded use StartApplicationUpgrade API to upgrade it to desired version, including rolling back to a previous version. */
export interface RollbackApplicationUpgradedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the list of applications deployed on a Service Fabric node. The results do not include information about deployed system applications unless explicitly queried for by ID. Results encompass deployed applications in active, activating, and downloading states. This query requires that the node name corresponds to a node on the cluster. The query fails if the provided node name does not point to any active Service Fabric nodes on the cluster. */
export interface GetDeployedApplicationInfoList200Response extends HttpResponse {
  status: "200";
  body: PagedDeployedApplicationInfoListOutput;
}

/** Gets the list of applications deployed on a Service Fabric node. The results do not include information about deployed system applications unless explicitly queried for by ID. Results encompass deployed applications in active, activating, and downloading states. This query requires that the node name corresponds to a node on the cluster. The query fails if the provided node name does not point to any active Service Fabric nodes on the cluster. */
export interface GetDeployedApplicationInfoListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This query returns system application information if the application ID provided is for system application. Results encompass deployed applications in active, activating, and downloading states. This query requires that the node name corresponds to a node on the cluster. The query fails if the provided node name does not point to any active Service Fabric nodes on the cluster. */
export interface GetDeployedApplicationInfo200Response extends HttpResponse {
  status: "200";
  body: DeployedApplicationInfoOutput;
}

/** This query returns system application information if the application ID provided is for system application. Results encompass deployed applications in active, activating, and downloading states. This query requires that the node name corresponds to a node on the cluster. The query fails if the provided node name does not point to any active Service Fabric nodes on the cluster. */
export interface GetDeployedApplicationInfo204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** This query returns system application information if the application ID provided is for system application. Results encompass deployed applications in active, activating, and downloading states. This query requires that the node name corresponds to a node on the cluster. The query fails if the provided node name does not point to any active Service Fabric nodes on the cluster. */
export interface GetDeployedApplicationInfodefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about health of an application deployed on a Service Fabric node. Use EventsHealthStateFilter to optionally filter for the collection of HealthEvent objects reported on the deployed application based on health state. Use DeployedServicePackagesHealthStateFilter to optionally filter for DeployedServicePackageHealth children based on health state. */
export interface GetDeployedApplicationHealth200Response extends HttpResponse {
  status: "200";
  body: DeployedApplicationHealthOutput;
}

/** Gets the information about health of an application deployed on a Service Fabric node. Use EventsHealthStateFilter to optionally filter for the collection of HealthEvent objects reported on the deployed application based on health state. Use DeployedServicePackagesHealthStateFilter to optionally filter for DeployedServicePackageHealth children based on health state. */
export interface GetDeployedApplicationHealthdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about health of an application deployed on a Service Fabric node using the specified policy. Use EventsHealthStateFilter to optionally filter for the collection of HealthEvent objects reported on the deployed application based on health state. Use DeployedServicePackagesHealthStateFilter to optionally filter for DeployedServicePackageHealth children based on health state. Use ApplicationHealthPolicy to optionally override the health policies used to evaluate the health. This API only uses 'ConsiderWarningAsError' field of the ApplicationHealthPolicy. The rest of the fields are ignored while evaluating the health of the deployed application. */
export interface GetDeployedApplicationHealthUsingPolicy200Response extends HttpResponse {
  status: "200";
  body: DeployedApplicationHealthOutput;
}

/** Gets the information about health of an application deployed on a Service Fabric node using the specified policy. Use EventsHealthStateFilter to optionally filter for the collection of HealthEvent objects reported on the deployed application based on health state. Use DeployedServicePackagesHealthStateFilter to optionally filter for DeployedServicePackageHealth children based on health state. Use ApplicationHealthPolicy to optionally override the health policies used to evaluate the health. This API only uses 'ConsiderWarningAsError' field of the ApplicationHealthPolicy. The rest of the fields are ignored while evaluating the health of the deployed application. */
export interface GetDeployedApplicationHealthUsingPolicydefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Reports health state of the application deployed on a Service Fabric node. The report must contain the information about the source of the health report and property on which it is reported.
 * The report is sent to a Service Fabric gateway Service, which forwards to the health store.
 * The report may be accepted by the gateway, but rejected by the health store after extra validation.
 * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
 * To see whether the report was applied in the health store, get deployed application health and check that the report appears in the HealthEvents section.
 */
export interface ReportDeployedApplicationHealth200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * Reports health state of the application deployed on a Service Fabric node. The report must contain the information about the source of the health report and property on which it is reported.
 * The report is sent to a Service Fabric gateway Service, which forwards to the health store.
 * The report may be accepted by the gateway, but rejected by the health store after extra validation.
 * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
 * To see whether the report was applied in the health store, get deployed application health and check that the report appears in the HealthEvents section.
 */
export interface ReportDeployedApplicationHealthdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response contains the application manifest XML as a string. */
export interface GetApplicationManifest200Response extends HttpResponse {
  status: "200";
  body: ApplicationTypeManifestOutput;
}

/** The response contains the application manifest XML as a string. */
export interface GetApplicationManifestdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns the information about all services belonging to the application specified by the application ID. */
export interface GetServiceInfoList200Response extends HttpResponse {
  status: "200";
  body: PagedServiceInfoListOutput;
}

/** Returns the information about all services belonging to the application specified by the application ID. */
export interface GetServiceInfoListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns the information about the specified service belonging to the specified Service Fabric application. */
export interface GetServiceInfo200Response extends HttpResponse {
  status: "200";
  body: ServiceInfoOutput;
}

/** Returns the information about the specified service belonging to the specified Service Fabric application. */
export interface GetServiceInfo204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Returns the information about the specified service belonging to the specified Service Fabric application. */
export interface GetServiceInfodefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the name of the application for the specified service. A 404 FABRIC_E_SERVICE_DOES_NOT_EXIST error is returned if a service with the provided service ID does not exist. */
export interface GetApplicationNameInfo200Response extends HttpResponse {
  status: "200";
  body: ApplicationNameInfoOutput;
}

/** Gets the name of the application for the specified service. A 404 FABRIC_E_SERVICE_DOES_NOT_EXIST error is returned if a service with the provided service ID does not exist. */
export interface GetApplicationNameInfodefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This api allows creating a new Service Fabric stateless or stateful service under a specified Service Fabric application. The description for creating the service includes partitioning information and optional properties for placement and load balancing. Some of the properties can later be modified using `UpdateService` API. */
export interface CreateService202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** This api allows creating a new Service Fabric stateless or stateful service under a specified Service Fabric application. The description for creating the service includes partitioning information and optional properties for placement and load balancing. Some of the properties can later be modified using `UpdateService` API. */
export interface CreateServicedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Creates a Service Fabric service from the service template defined in the application manifest. A service template contains the properties that will be same for the service instance of the same type. The API allows overriding the properties that are usually different for different services of the same service type. */
export interface CreateServiceFromTemplate202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Creates a Service Fabric service from the service template defined in the application manifest. A service template contains the properties that will be same for the service instance of the same type. The API allows overriding the properties that are usually different for different services of the same service type. */
export interface CreateServiceFromTemplatedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** A service must be created before it can be deleted. By default, Service Fabric will try to close service replicas in a graceful manner and then delete the service. However, if the service is having issues closing the replica gracefully, the delete operation may take a long time or get stuck. Use the optional ForceRemove flag to skip the graceful close sequence and forcefully delete the service. */
export interface DeleteService200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** A service must be created before it can be deleted. By default, Service Fabric will try to close service replicas in a graceful manner and then delete the service. However, if the service is having issues closing the replica gracefully, the delete operation may take a long time or get stuck. Use the optional ForceRemove flag to skip the graceful close sequence and forcefully delete the service. */
export interface DeleteServicedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This API allows updating properties of a running Service Fabric service. The set of properties that can be updated are a subset of the properties that were specified at the time of creating the service. The current set of properties can be obtained using `GetServiceDescription` API. Note that updating the properties of a running service is different than upgrading your application using `StartApplicationUpgrade` API. The upgrade is a long running background operation that involves moving the application from one version to another, one upgrade domain at a time, whereas update applies the new properties immediately to the service. */
export interface UpdateService200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** This API allows updating properties of a running Service Fabric service. The set of properties that can be updated are a subset of the properties that were specified at the time of creating the service. The current set of properties can be obtained using `GetServiceDescription` API. Note that updating the properties of a running service is different than upgrading your application using `StartApplicationUpgrade` API. The upgrade is a long running background operation that involves moving the application from one version to another, one upgrade domain at a time, whereas update applies the new properties immediately to the service. */
export interface UpdateServicedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the description of an existing Service Fabric service. A service must be created before its description can be obtained. */
export interface GetServiceDescription200Response extends HttpResponse {
  status: "200";
  body: ServiceDescriptionOutput;
}

/** Gets the description of an existing Service Fabric service. A service must be created before its description can be obtained. */
export interface GetServiceDescriptiondefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Gets the health information of the specified service.
 * Use EventsHealthStateFilter to filter the collection of health events reported on the service based on the health state.
 * Use PartitionsHealthStateFilter to filter the collection of partitions returned.
 * If you specify a service that does not exist in the health store, this request returns an error.
 */
export interface GetServiceHealth200Response extends HttpResponse {
  status: "200";
  body: ServiceHealthOutput;
}

/**
 * Gets the health information of the specified service.
 * Use EventsHealthStateFilter to filter the collection of health events reported on the service based on the health state.
 * Use PartitionsHealthStateFilter to filter the collection of partitions returned.
 * If you specify a service that does not exist in the health store, this request returns an error.
 */
export interface GetServiceHealthdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Gets the health information of the specified service.
 * If the application health policy is specified, the health evaluation uses it to get the aggregated health state.
 * If the policy is not specified, the health evaluation uses the application health policy defined in the application manifest, or the default health policy, if no policy is defined in the manifest.
 * Use EventsHealthStateFilter to filter the collection of health events reported on the service based on the health state.
 * Use PartitionsHealthStateFilter to filter the collection of partitions returned.
 * If you specify a service that does not exist in the health store, this request returns an error.
 */
export interface GetServiceHealthUsingPolicy200Response extends HttpResponse {
  status: "200";
  body: ServiceHealthOutput;
}

/**
 * Gets the health information of the specified service.
 * If the application health policy is specified, the health evaluation uses it to get the aggregated health state.
 * If the policy is not specified, the health evaluation uses the application health policy defined in the application manifest, or the default health policy, if no policy is defined in the manifest.
 * Use EventsHealthStateFilter to filter the collection of health events reported on the service based on the health state.
 * Use PartitionsHealthStateFilter to filter the collection of partitions returned.
 * If you specify a service that does not exist in the health store, this request returns an error.
 */
export interface GetServiceHealthUsingPolicydefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Reports health state of the specified Service Fabric service. The report must contain the information about the source of the health report and property on which it is reported.
 * The report is sent to a Service Fabric gateway Service, which forwards to the health store.
 * The report may be accepted by the gateway, but rejected by the health store after extra validation.
 * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
 * To see whether the report was applied in the health store, run GetServiceHealth and check that the report appears in the HealthEvents section.
 */
export interface ReportServiceHealth200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * Reports health state of the specified Service Fabric service. The report must contain the information about the source of the health report and property on which it is reported.
 * The report is sent to a Service Fabric gateway Service, which forwards to the health store.
 * The report may be accepted by the gateway, but rejected by the health store after extra validation.
 * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
 * To see whether the report was applied in the health store, run GetServiceHealth and check that the report appears in the HealthEvents section.
 */
export interface ReportServiceHealthdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Resolve a Service Fabric service partition to get the endpoints of the service replicas. */
export interface ResolveService200Response extends HttpResponse {
  status: "200";
  body: ResolvedServicePartitionOutput;
}

/** Resolve a Service Fabric service partition to get the endpoints of the service replicas. */
export interface ResolveServicedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Returns the information about the unplaced replicas of the service.
 * If PartitionId is specified, then result will contain information only about unplaced replicas for that partition.
 * If PartitionId is not specified, then result will contain information about unplaced replicas for all partitions of that service.
 * If OnlyQueryPrimaries is set to true, then result will contain information only about primary replicas, and will ignore unplaced secondary replicas.
 */
export interface GetUnplacedReplicaInformation200Response extends HttpResponse {
  status: "200";
  body: UnplacedReplicaInformationOutput;
}

/**
 * Returns the information about the unplaced replicas of the service.
 * If PartitionId is specified, then result will contain information only about unplaced replicas for that partition.
 * If PartitionId is not specified, then result will contain information about unplaced replicas for all partitions of that service.
 * If OnlyQueryPrimaries is set to true, then result will contain information only about primary replicas, and will ignore unplaced secondary replicas.
 */
export interface GetUnplacedReplicaInformationdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Retrieves partitions which are most/least loaded according to specified metric. */
export interface GetLoadedPartitionInfoList200Response extends HttpResponse {
  status: "200";
  body: LoadedPartitionInformationResultListOutput;
}

/** Retrieves partitions which are most/least loaded according to specified metric. */
export interface GetLoadedPartitionInfoListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response includes the partition ID, partitioning scheme information, keys supported by the partition, status, health, and other details about the partition. */
export interface GetPartitionInfoList200Response extends HttpResponse {
  status: "200";
  body: PagedServicePartitionInfoListOutput;
}

/** The response includes the partition ID, partitioning scheme information, keys supported by the partition, status, health, and other details about the partition. */
export interface GetPartitionInfoListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about the specified partition. The response includes the partition ID, partitioning scheme information, keys supported by the partition, status, health, and other details about the partition. */
export interface GetPartitionInfo200Response extends HttpResponse {
  status: "200";
  body: ServicePartitionInfoOutput;
}

/** Gets the information about the specified partition. The response includes the partition ID, partitioning scheme information, keys supported by the partition, status, health, and other details about the partition. */
export interface GetPartitionInfo204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Gets the information about the specified partition. The response includes the partition ID, partitioning scheme information, keys supported by the partition, status, health, and other details about the partition. */
export interface GetPartitionInfodefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets name of the service for the specified partition. A 404 error is returned if the partition ID does not exist in the cluster. */
export interface GetServiceNameInfo200Response extends HttpResponse {
  status: "200";
  body: ServiceNameInfoOutput;
}

/** Gets name of the service for the specified partition. A 404 error is returned if the partition ID does not exist in the cluster. */
export interface GetServiceNameInfodefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Use EventsHealthStateFilter to filter the collection of health events reported on the service based on the health state.
 * Use ReplicasHealthStateFilter to filter the collection of ReplicaHealthState objects on the partition.
 * If you specify a partition that does not exist in the health store, this request returns an error.
 */
export interface GetPartitionHealth200Response extends HttpResponse {
  status: "200";
  body: PartitionHealthOutput;
}

/**
 * Use EventsHealthStateFilter to filter the collection of health events reported on the service based on the health state.
 * Use ReplicasHealthStateFilter to filter the collection of ReplicaHealthState objects on the partition.
 * If you specify a partition that does not exist in the health store, this request returns an error.
 */
export interface GetPartitionHealthdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Gets the health information of the specified partition.
 * If the application health policy is specified, the health evaluation uses it to get the aggregated health state.
 * If the policy is not specified, the health evaluation uses the application health policy defined in the application manifest, or the default health policy, if no policy is defined in the manifest.
 * Use EventsHealthStateFilter to filter the collection of health events reported on the partition based on the health state.
 * Use ReplicasHealthStateFilter to filter the collection of ReplicaHealthState objects on the partition. Use ApplicationHealthPolicy in the POST body to override the health policies used to evaluate the health.
 * If you specify a partition that does not exist in the health store, this request returns an error.
 */
export interface GetPartitionHealthUsingPolicy200Response extends HttpResponse {
  status: "200";
  body: PartitionHealthOutput;
}

/**
 * Gets the health information of the specified partition.
 * If the application health policy is specified, the health evaluation uses it to get the aggregated health state.
 * If the policy is not specified, the health evaluation uses the application health policy defined in the application manifest, or the default health policy, if no policy is defined in the manifest.
 * Use EventsHealthStateFilter to filter the collection of health events reported on the partition based on the health state.
 * Use ReplicasHealthStateFilter to filter the collection of ReplicaHealthState objects on the partition. Use ApplicationHealthPolicy in the POST body to override the health policies used to evaluate the health.
 * If you specify a partition that does not exist in the health store, this request returns an error.
 */
export interface GetPartitionHealthUsingPolicydefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Reports health state of the specified Service Fabric partition. The report must contain the information about the source of the health report and property on which it is reported.
 * The report is sent to a Service Fabric gateway Partition, which forwards to the health store.
 * The report may be accepted by the gateway, but rejected by the health store after extra validation.
 * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
 * To see whether the report was applied in the health store, run GetPartitionHealth and check that the report appears in the HealthEvents section.
 */
export interface ReportPartitionHealth200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * Reports health state of the specified Service Fabric partition. The report must contain the information about the source of the health report and property on which it is reported.
 * The report is sent to a Service Fabric gateway Partition, which forwards to the health store.
 * The report may be accepted by the gateway, but rejected by the health store after extra validation.
 * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
 * To see whether the report was applied in the health store, run GetPartitionHealth and check that the report appears in the HealthEvents section.
 */
export interface ReportPartitionHealthdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Returns information about the load of a specified partition.
 * The response includes a list of load reports for a Service Fabric partition.
 * Each report includes the load metric name, value, and last reported time in UTC.
 */
export interface GetPartitionLoadInformation200Response extends HttpResponse {
  status: "200";
  body: PartitionLoadInformationOutput;
}

/**
 * Returns information about the load of a specified partition.
 * The response includes a list of load reports for a Service Fabric partition.
 * Each report includes the load metric name, value, and last reported time in UTC.
 */
export interface GetPartitionLoadInformationdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Resets the current load of a Service Fabric partition to the default load for the service. */
export interface ResetPartitionLoad200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Resets the current load of a Service Fabric partition to the default load for the service. */
export interface ResetPartitionLoaddefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This operation should only be performed if it is known that the replicas that are down cannot be recovered. Incorrect use of this API can cause potential data loss. */
export interface RecoverPartition200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** This operation should only be performed if it is known that the replicas that are down cannot be recovered. Incorrect use of this API can cause potential data loss. */
export interface RecoverPartitiondefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Indicates to the Service Fabric cluster that it should attempt to recover the specified service that is currently stuck in quorum loss. This operation should only be performed if it is known that the replicas that are down cannot be recovered. Incorrect use of this API can cause potential data loss. */
export interface RecoverServicePartitions200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Indicates to the Service Fabric cluster that it should attempt to recover the specified service that is currently stuck in quorum loss. This operation should only be performed if it is known that the replicas that are down cannot be recovered. Incorrect use of this API can cause potential data loss. */
export interface RecoverServicePartitionsdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Indicates to the Service Fabric cluster that it should attempt to recover the system services that are currently stuck in quorum loss. This operation should only be performed if it is known that the replicas that are down cannot be recovered. Incorrect use of this API can cause potential data loss. */
export interface RecoverSystemPartitions200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Indicates to the Service Fabric cluster that it should attempt to recover the system services that are currently stuck in quorum loss. This operation should only be performed if it is known that the replicas that are down cannot be recovered. Incorrect use of this API can cause potential data loss. */
export interface RecoverSystemPartitionsdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This operation should only be performed if it is known that the replicas that are down cannot be recovered. Incorrect use of this API can cause potential data loss. */
export interface RecoverAllPartitions200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** This operation should only be performed if it is known that the replicas that are down cannot be recovered. Incorrect use of this API can cause potential data loss. */
export interface RecoverAllPartitionsdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * This command moves the primary replica of a partition of a stateful service, respecting all constraints.
 * If NodeName parameter is specified, primary will be moved to the specified node (if constraints allow it).
 * If NodeName parameter is not specified, primary replica will be moved to a random node in the cluster.
 * If IgnoreConstraints parameter is specified and set to true, then primary will be moved regardless of the constraints.
 */
export interface MovePrimaryReplica200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * This command moves the primary replica of a partition of a stateful service, respecting all constraints.
 * If NodeName parameter is specified, primary will be moved to the specified node (if constraints allow it).
 * If NodeName parameter is not specified, primary replica will be moved to a random node in the cluster.
 * If IgnoreConstraints parameter is specified and set to true, then primary will be moved regardless of the constraints.
 */
export interface MovePrimaryReplicadefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * This command moves the secondary replica of a partition of a stateful service, respecting all constraints.
 * CurrentNodeName parameter must be specified to identify the replica that is moved.
 * Source node name must be specified, but new node name can be omitted, and in that case replica is moved to a random node.
 * If IgnoreConstraints parameter is specified and set to true, then secondary will be moved regardless of the constraints.
 */
export interface MoveSecondaryReplica200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * This command moves the secondary replica of a partition of a stateful service, respecting all constraints.
 * CurrentNodeName parameter must be specified to identify the replica that is moved.
 * Source node name must be specified, but new node name can be omitted, and in that case replica is moved to a random node.
 * If IgnoreConstraints parameter is specified and set to true, then secondary will be moved regardless of the constraints.
 */
export interface MoveSecondaryReplicadefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Updates the load value and predicted load value for all the partitions provided for specified metrics. */
export interface UpdatePartitionLoad200Response extends HttpResponse {
  status: "200";
  body: PagedUpdatePartitionLoadResultListOutput;
}

/** Updates the load value and predicted load value for all the partitions provided for specified metrics. */
export interface UpdatePartitionLoaddefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * This command moves the instance of a partition of a stateless service, respecting all constraints.
 * Partition id and service name must be specified to be able to move the instance.
 * CurrentNodeName when specified identifies the instance that is moved. If not specified, random instance will be moved
 * New node name can be omitted, and in that case instance is moved to a random node.
 * If IgnoreConstraints parameter is specified and set to true, then instance will be moved regardless of the constraints.
 */
export interface MoveInstance200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * This command moves the instance of a partition of a stateless service, respecting all constraints.
 * Partition id and service name must be specified to be able to move the instance.
 * CurrentNodeName when specified identifies the instance that is moved. If not specified, random instance will be moved
 * New node name can be omitted, and in that case instance is moved to a random node.
 * If IgnoreConstraints parameter is specified and set to true, then instance will be moved regardless of the constraints.
 */
export interface MoveInstancedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * This command moves the auxiliary replica of a partition of a stateful service, respecting all constraints.
 * CurrentNodeName can be omitted, and in that case a random auxiliary replica is chosen.
 * NewNodeName can be omitted, and in that case the auxiliary replica is moved to a random node.
 * If IgnoreConstraints parameter is specified and set to true, then auxiliary will be moved regardless of the constraints.
 */
export interface MoveAuxiliaryReplica200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * This command moves the auxiliary replica of a partition of a stateful service, respecting all constraints.
 * CurrentNodeName can be omitted, and in that case a random auxiliary replica is chosen.
 * NewNodeName can be omitted, and in that case the auxiliary replica is moved to a random node.
 * If IgnoreConstraints parameter is specified and set to true, then auxiliary will be moved regardless of the constraints.
 */
export interface MoveAuxiliaryReplicadefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * For clusters that have the Repair Manager Service configured,
 * this API provides a way to create repair tasks that run automatically or manually.
 * For repair tasks that run automatically, an appropriate repair executor
 * must be running for each repair action to run automatically.
 * These are currently only available in specially-configured Azure Cloud Services.
 *
 * To create a manual repair task, provide the set of impacted node names and the
 * expected impact. When the state of the created repair task changes to approved,
 * you can safely perform repair actions on those nodes.
 *
 * This API supports the Service Fabric platform; it is not meant to be used directly from your code.
 */
export interface CreateRepairTask200Response extends HttpResponse {
  status: "200";
  body: RepairTaskUpdateInfoOutput;
}

/**
 * For clusters that have the Repair Manager Service configured,
 * this API provides a way to create repair tasks that run automatically or manually.
 * For repair tasks that run automatically, an appropriate repair executor
 * must be running for each repair action to run automatically.
 * These are currently only available in specially-configured Azure Cloud Services.
 *
 * To create a manual repair task, provide the set of impacted node names and the
 * expected impact. When the state of the created repair task changes to approved,
 * you can safely perform repair actions on those nodes.
 *
 * This API supports the Service Fabric platform; it is not meant to be used directly from your code.
 */
export interface CreateRepairTaskdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
export interface CancelRepairTask200Response extends HttpResponse {
  status: "200";
  body: RepairTaskUpdateInfoOutput;
}

/** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
export interface CancelRepairTaskdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
export interface DeleteRepairTask200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
export interface DeleteRepairTaskdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
export interface GetRepairTaskList200Response extends HttpResponse {
  status: "200";
  body: Array<RepairTaskOutput>;
}

/** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
export interface GetRepairTaskListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
export interface ForceApproveRepairTask200Response extends HttpResponse {
  status: "200";
  body: RepairTaskUpdateInfoOutput;
}

/** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
export interface ForceApproveRepairTaskdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
export interface UpdateRepairTaskHealthPolicy200Response extends HttpResponse {
  status: "200";
  body: RepairTaskUpdateInfoOutput;
}

/** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
export interface UpdateRepairTaskHealthPolicydefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
export interface UpdateRepairExecutionState200Response extends HttpResponse {
  status: "200";
  body: RepairTaskUpdateInfoOutput;
}

/** This API supports the Service Fabric platform; it is not meant to be used directly from your code. */
export interface UpdateRepairExecutionStatedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The GetReplicas endpoint returns information about the replicas of the specified partition. The response includes the ID, role, status, health, node name, uptime, and other details about the replica. */
export interface GetReplicaInfoList200Response extends HttpResponse {
  status: "200";
  body: PagedReplicaInfoListOutput;
}

/** The GetReplicas endpoint returns information about the replicas of the specified partition. The response includes the ID, role, status, health, node name, uptime, and other details about the replica. */
export interface GetReplicaInfoListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response includes the ID, role, status, health, node name, uptime, and other details about the replica. */
export interface GetReplicaInfo200Response extends HttpResponse {
  status: "200";
  body: ReplicaInfoOutput;
}

/** The response includes the ID, role, status, health, node name, uptime, and other details about the replica. */
export interface GetReplicaInfo204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** The response includes the ID, role, status, health, node name, uptime, and other details about the replica. */
export interface GetReplicaInfodefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Gets the health of a Service Fabric replica.
 * Use EventsHealthStateFilter to filter the collection of health events reported on the replica based on the health state.
 */
export interface GetReplicaHealth200Response extends HttpResponse {
  status: "200";
  body: ReplicaHealthOutput;
}

/**
 * Gets the health of a Service Fabric replica.
 * Use EventsHealthStateFilter to filter the collection of health events reported on the replica based on the health state.
 */
export interface GetReplicaHealthdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Gets the health of a Service Fabric stateful service replica or stateless service instance.
 * Use EventsHealthStateFilter to filter the collection of health events reported on the cluster based on the health state.
 * Use ApplicationHealthPolicy to optionally override the health policies used to evaluate the health. This API only uses 'ConsiderWarningAsError' field of the ApplicationHealthPolicy. The rest of the fields are ignored while evaluating the health of the replica.
 */
export interface GetReplicaHealthUsingPolicy200Response extends HttpResponse {
  status: "200";
  body: ReplicaHealthOutput;
}

/**
 * Gets the health of a Service Fabric stateful service replica or stateless service instance.
 * Use EventsHealthStateFilter to filter the collection of health events reported on the cluster based on the health state.
 * Use ApplicationHealthPolicy to optionally override the health policies used to evaluate the health. This API only uses 'ConsiderWarningAsError' field of the ApplicationHealthPolicy. The rest of the fields are ignored while evaluating the health of the replica.
 */
export interface GetReplicaHealthUsingPolicydefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Reports health state of the specified Service Fabric replica. The report must contain the information about the source of the health report and property on which it is reported.
 * The report is sent to a Service Fabric gateway Replica, which forwards to the health store.
 * The report may be accepted by the gateway, but rejected by the health store after extra validation.
 * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
 * To see whether the report was applied in the health store, run GetReplicaHealth and check that the report appears in the HealthEvents section.
 */
export interface ReportReplicaHealth200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * Reports health state of the specified Service Fabric replica. The report must contain the information about the source of the health report and property on which it is reported.
 * The report is sent to a Service Fabric gateway Replica, which forwards to the health store.
 * The report may be accepted by the gateway, but rejected by the health store after extra validation.
 * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
 * To see whether the report was applied in the health store, run GetReplicaHealth and check that the report appears in the HealthEvents section.
 */
export interface ReportReplicaHealthdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the list containing the information about replicas deployed on a Service Fabric node. The information include partition ID, replica ID, status of the replica, name of the service, name of the service type, and other information. Use PartitionId or ServiceManifestName query parameters to return information about the deployed replicas matching the specified values for those parameters. */
export interface GetDeployedServiceReplicaInfoList200Response extends HttpResponse {
  status: "200";
  body: Array<DeployedServiceReplicaInfoOutput>;
}

/** Gets the list containing the information about replicas deployed on a Service Fabric node. The information include partition ID, replica ID, status of the replica, name of the service, name of the service type, and other information. Use PartitionId or ServiceManifestName query parameters to return information about the deployed replicas matching the specified values for those parameters. */
export interface GetDeployedServiceReplicaInfoList204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Gets the list containing the information about replicas deployed on a Service Fabric node. The information include partition ID, replica ID, status of the replica, name of the service, name of the service type, and other information. Use PartitionId or ServiceManifestName query parameters to return information about the deployed replicas matching the specified values for those parameters. */
export interface GetDeployedServiceReplicaInfoListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the details of the replica deployed on a Service Fabric node. The information includes service kind, service name, current service operation, current service operation start date time, partition ID, replica/instance ID, reported load, and other information. */
export interface GetDeployedServiceReplicaDetailInfo200Response extends HttpResponse {
  status: "200";
  body: DeployedServiceReplicaDetailInfoOutput;
}

/** Gets the details of the replica deployed on a Service Fabric node. The information includes service kind, service name, current service operation, current service operation start date time, partition ID, replica/instance ID, reported load, and other information. */
export interface GetDeployedServiceReplicaDetailInfodefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the details of the replica deployed on a Service Fabric node. The information includes service kind, service name, current service operation, current service operation start date time, partition ID, replica/instance ID, reported load, and other information. */
export interface GetDeployedServiceReplicaDetailInfoByPartitionId200Response extends HttpResponse {
  status: "200";
  body: DeployedServiceReplicaDetailInfoOutput;
}

/** Gets the details of the replica deployed on a Service Fabric node. The information includes service kind, service name, current service operation, current service operation start date time, partition ID, replica/instance ID, reported load, and other information. */
export interface GetDeployedServiceReplicaDetailInfoByPartitionIddefaultResponse
  extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Restarts a service replica of a persisted service running on a node. Warning - There are no safety checks performed when this API is used. Incorrect use of this API can lead to availability loss for stateful services. */
export interface RestartReplica200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restarts a service replica of a persisted service running on a node. Warning - There are no safety checks performed when this API is used. Incorrect use of this API can lead to availability loss for stateful services. */
export interface RestartReplicadefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This API simulates a Service Fabric replica failure by removing a replica from a Service Fabric cluster. The removal closes the replica, transitions the replica to the role None, and then removes all of the state information of the replica from the cluster. This API tests the replica state removal path, and simulates the report fault permanent path through client APIs. Warning - There are no safety checks performed when this API is used. Incorrect use of this API can lead to data loss for stateful services. In addition, the forceRemove flag impacts all other replicas hosted in the same process. */
export interface RemoveReplica200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** This API simulates a Service Fabric replica failure by removing a replica from a Service Fabric cluster. The removal closes the replica, transitions the replica to the role None, and then removes all of the state information of the replica from the cluster. This API tests the replica state removal path, and simulates the report fault permanent path through client APIs. Warning - There are no safety checks performed when this API is used. Incorrect use of this API can lead to data loss for stateful services. In addition, the forceRemove flag impacts all other replicas hosted in the same process. */
export interface RemoveReplicadefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns the information about the service packages deployed on a Service Fabric node for the given application. */
export interface GetDeployedServicePackageInfoList200Response extends HttpResponse {
  status: "200";
  body: Array<DeployedServicePackageInfoOutput>;
}

/** Returns the information about the service packages deployed on a Service Fabric node for the given application. */
export interface GetDeployedServicePackageInfoListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns the information about the service packages deployed on a Service Fabric node for the given application. These results are of service packages whose name match exactly the service package name specified as the parameter. */
export interface GetDeployedServicePackageInfoListByName200Response extends HttpResponse {
  status: "200";
  body: Array<DeployedServicePackageInfoOutput>;
}

/** Returns the information about the service packages deployed on a Service Fabric node for the given application. These results are of service packages whose name match exactly the service package name specified as the parameter. */
export interface GetDeployedServicePackageInfoListByName204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Returns the information about the service packages deployed on a Service Fabric node for the given application. These results are of service packages whose name match exactly the service package name specified as the parameter. */
export interface GetDeployedServicePackageInfoListByNamedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about health of a service package for a specific application deployed on a Service Fabric node. Use EventsHealthStateFilter to optionally filter for the collection of HealthEvent objects reported on the deployed service package based on health state. */
export interface GetDeployedServicePackageHealth200Response extends HttpResponse {
  status: "200";
  body: DeployedServicePackageHealthOutput;
}

/** Gets the information about health of a service package for a specific application deployed on a Service Fabric node. Use EventsHealthStateFilter to optionally filter for the collection of HealthEvent objects reported on the deployed service package based on health state. */
export interface GetDeployedServicePackageHealthdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about health of a service package for a specific application deployed on a Service Fabric node. using the specified policy. Use EventsHealthStateFilter to optionally filter for the collection of HealthEvent objects reported on the deployed service package based on health state. Use ApplicationHealthPolicy to optionally override the health policies used to evaluate the health. This API only uses 'ConsiderWarningAsError' field of the ApplicationHealthPolicy. The rest of the fields are ignored while evaluating the health of the deployed service package. */
export interface GetDeployedServicePackageHealthUsingPolicy200Response extends HttpResponse {
  status: "200";
  body: DeployedServicePackageHealthOutput;
}

/** Gets the information about health of a service package for a specific application deployed on a Service Fabric node. using the specified policy. Use EventsHealthStateFilter to optionally filter for the collection of HealthEvent objects reported on the deployed service package based on health state. Use ApplicationHealthPolicy to optionally override the health policies used to evaluate the health. This API only uses 'ConsiderWarningAsError' field of the ApplicationHealthPolicy. The rest of the fields are ignored while evaluating the health of the deployed service package. */
export interface GetDeployedServicePackageHealthUsingPolicydefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Reports health state of the service package of the application deployed on a Service Fabric node. The report must contain the information about the source of the health report and property on which it is reported.
 * The report is sent to a Service Fabric gateway Service, which forwards to the health store.
 * The report may be accepted by the gateway, but rejected by the health store after extra validation.
 * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
 * To see whether the report was applied in the health store, get deployed service package health and check that the report appears in the HealthEvents section.
 */
export interface ReportDeployedServicePackageHealth200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * Reports health state of the service package of the application deployed on a Service Fabric node. The report must contain the information about the source of the health report and property on which it is reported.
 * The report is sent to a Service Fabric gateway Service, which forwards to the health store.
 * The report may be accepted by the gateway, but rejected by the health store after extra validation.
 * For example, the health store may reject the report because of an invalid parameter, like a stale sequence number.
 * To see whether the report was applied in the health store, get deployed service package health and check that the report appears in the HealthEvents section.
 */
export interface ReportDeployedServicePackageHealthdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** This API provides a way to download code packages including the container images on a specific node outside of the normal application deployment and upgrade path. This is useful for the large code packages and container images to be present on the node before the actual application deployment and upgrade, thus significantly reducing the total time required for the deployment or upgrade. */
export interface DeployServicePackageToNode200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** This API provides a way to download code packages including the container images on a specific node outside of the normal application deployment and upgrade path. This is useful for the large code packages and container images to be present on the node before the actual application deployment and upgrade, thus significantly reducing the total time required for the deployment or upgrade. */
export interface DeployServicePackageToNodedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the list of code packages deployed on a Service Fabric node for the given application. */
export interface GetDeployedCodePackageInfoList200Response extends HttpResponse {
  status: "200";
  body: Array<DeployedCodePackageInfoOutput>;
}

/** Gets the list of code packages deployed on a Service Fabric node for the given application. */
export interface GetDeployedCodePackageInfoListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Restarts a code package deployed on a Service Fabric node in a cluster. This aborts the code package process, which will restart all the user service replicas hosted in that process. */
export interface RestartDeployedCodePackage200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Restarts a code package deployed on a Service Fabric node in a cluster. This aborts the code package process, which will restart all the user service replicas hosted in that process. */
export interface RestartDeployedCodePackagedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the container logs for container deployed on a Service Fabric node for the given code package. */
export interface GetContainerLogsDeployedOnNode200Response extends HttpResponse {
  status: "200";
  body: ContainerLogsOutput;
}

/** Gets the container logs for container deployed on a Service Fabric node for the given code package. */
export interface GetContainerLogsDeployedOnNodedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Invoke container API on a container deployed on a Service Fabric node for the given code package. */
export interface InvokeContainerApi200Response extends HttpResponse {
  status: "200";
  body: ContainerApiResponseOutput;
}

/** Invoke container API on a container deployed on a Service Fabric node for the given code package. */
export interface InvokeContainerApidefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Compose is a file format that describes multi-container applications. This API allows deploying container based applications defined in compose format in a Service Fabric cluster. Once the deployment is created, its status can be tracked via the `GetComposeDeploymentStatus` API. */
export interface CreateComposeDeployment202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Compose is a file format that describes multi-container applications. This API allows deploying container based applications defined in compose format in a Service Fabric cluster. Once the deployment is created, its status can be tracked via the `GetComposeDeploymentStatus` API. */
export interface CreateComposeDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns the status of the compose deployment that was created or in the process of being created in the Service Fabric cluster and whose name matches the one specified as the parameter. The response includes the name, status, and other details about the deployment. */
export interface GetComposeDeploymentStatus200Response extends HttpResponse {
  status: "200";
  body: ComposeDeploymentStatusInfoOutput;
}

/** Returns the status of the compose deployment that was created or in the process of being created in the Service Fabric cluster and whose name matches the one specified as the parameter. The response includes the name, status, and other details about the deployment. */
export interface GetComposeDeploymentStatusdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the status about the compose deployments that were created or in the process of being created in the Service Fabric cluster. The response includes the name, status, and other details about the compose deployments. If the list of deployments do not fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. */
export interface GetComposeDeploymentStatusList200Response extends HttpResponse {
  status: "200";
  body: PagedComposeDeploymentStatusInfoListOutput;
}

/** Gets the status about the compose deployments that were created or in the process of being created in the Service Fabric cluster. The response includes the name, status, and other details about the compose deployments. If the list of deployments do not fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. */
export interface GetComposeDeploymentStatusListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns the information about the state of the compose deployment upgrade along with details to aid debugging application health issues. */
export interface GetComposeDeploymentUpgradeProgress200Response extends HttpResponse {
  status: "200";
  body: ComposeDeploymentUpgradeProgressInfoOutput;
}

/** Returns the information about the state of the compose deployment upgrade along with details to aid debugging application health issues. */
export interface GetComposeDeploymentUpgradeProgressdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Deletes an existing Service Fabric compose deployment. */
export interface RemoveComposeDeployment202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes an existing Service Fabric compose deployment. */
export interface RemoveComposeDeploymentdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Validates the supplied upgrade parameters and starts upgrading the deployment if the parameters are valid. */
export interface StartComposeDeploymentUpgrade202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Validates the supplied upgrade parameters and starts upgrading the deployment if the parameters are valid. */
export interface StartComposeDeploymentUpgradedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Rollback a service fabric compose deployment upgrade. */
export interface StartRollbackComposeDeploymentUpgrade200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Rollback a service fabric compose deployment upgrade. */
export interface StartRollbackComposeDeploymentUpgradedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Get the status of Chaos indicating whether or not Chaos is running, the Chaos parameters used for running Chaos and the status of the Chaos Schedule. */
export interface GetChaos200Response extends HttpResponse {
  status: "200";
  body: ChaosOutput;
}

/** Get the status of Chaos indicating whether or not Chaos is running, the Chaos parameters used for running Chaos and the status of the Chaos Schedule. */
export interface GetChaosdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * If Chaos is not already running in the cluster, it starts Chaos with the passed in Chaos parameters.
 * If Chaos is already running when this call is made, the call fails with the error code FABRIC_E_CHAOS_ALREADY_RUNNING.
 * Refer to the article [Induce controlled Chaos in Service Fabric clusters](https://docs.microsoft.com/azure/service-fabric/service-fabric-controlled-chaos) for more details.
 */
export interface StartChaos200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * If Chaos is not already running in the cluster, it starts Chaos with the passed in Chaos parameters.
 * If Chaos is already running when this call is made, the call fails with the error code FABRIC_E_CHAOS_ALREADY_RUNNING.
 * Refer to the article [Induce controlled Chaos in Service Fabric clusters](https://docs.microsoft.com/azure/service-fabric/service-fabric-controlled-chaos) for more details.
 */
export interface StartChaosdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Stops Chaos from executing new faults. In-flight faults will continue to execute until they are complete. The current Chaos Schedule is put into a stopped state.
 * Once a schedule is stopped, it will stay in the stopped state and not be used to Chaos Schedule new runs of Chaos. A new Chaos Schedule must be set in order to resume scheduling.
 */
export interface StopChaos200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * Stops Chaos from executing new faults. In-flight faults will continue to execute until they are complete. The current Chaos Schedule is put into a stopped state.
 * Once a schedule is stopped, it will stay in the stopped state and not be used to Chaos Schedule new runs of Chaos. A new Chaos Schedule must be set in order to resume scheduling.
 */
export interface StopChaosdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * To get the next segment of the Chaos events, you can specify the ContinuationToken. To get the start of a new segment of Chaos events, you can specify the time range
 * through StartTimeUtc and EndTimeUtc. You cannot specify both the ContinuationToken and the time range in the same call.
 * When there are more than 100 Chaos events, the Chaos events are returned in multiple segments where a segment contains no more than 100 Chaos events and to get the next segment you make a call to this API with the continuation token.
 */
export interface GetChaosEvents200Response extends HttpResponse {
  status: "200";
  body: ChaosEventsSegmentOutput;
}

/**
 * To get the next segment of the Chaos events, you can specify the ContinuationToken. To get the start of a new segment of Chaos events, you can specify the time range
 * through StartTimeUtc and EndTimeUtc. You cannot specify both the ContinuationToken and the time range in the same call.
 * When there are more than 100 Chaos events, the Chaos events are returned in multiple segments where a segment contains no more than 100 Chaos events and to get the next segment you make a call to this API with the continuation token.
 */
export interface GetChaosEventsdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the version of the Chaos Schedule in use and the Chaos Schedule that defines when and how to run Chaos. */
export interface GetChaosSchedule200Response extends HttpResponse {
  status: "200";
  body: ChaosScheduleDescriptionOutput;
}

/** Gets the version of the Chaos Schedule in use and the Chaos Schedule that defines when and how to run Chaos. */
export interface GetChaosScheduledefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Chaos will automatically schedule runs based on the Chaos Schedule.
 * The Chaos Schedule will be updated if the provided version matches the version on the server.
 * When updating the Chaos Schedule, the version on the server is incremented by 1.
 * The version on the server will wrap back to 0 after reaching a large number.
 * If Chaos is running when this call is made, the call will fail.
 */
export interface PostChaosSchedule200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * Chaos will automatically schedule runs based on the Chaos Schedule.
 * The Chaos Schedule will be updated if the provided version matches the version on the server.
 * When updating the Chaos Schedule, the version on the server is incremented by 1.
 * The version on the server will wrap back to 0 after reaching a large number.
 * If Chaos is running when this call is made, the call will fail.
 */
export interface PostChaosScheduledefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Uploads contents of the file to the image store. Use this API if the file is small enough to upload again if the connection fails. The file's data needs to be added to the request body. The contents will be uploaded to the specified path. Image store service uses a mark file to indicate the availability of the folder. The mark file is an empty file named "_.dir". The mark file is generated by the image store service when all files in a folder are uploaded. When using File-by-File approach to upload application package in REST, the image store service isn't aware of the file hierarchy of the application package; you need to create a mark file per folder and upload it last, to let the image store service know that the folder is complete. */
export interface UploadFile200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Uploads contents of the file to the image store. Use this API if the file is small enough to upload again if the connection fails. The file's data needs to be added to the request body. The contents will be uploaded to the specified path. Image store service uses a mark file to indicate the availability of the folder. The mark file is an empty file named "_.dir". The mark file is generated by the image store service when all files in a folder are uploaded. When using File-by-File approach to upload application package in REST, the image store service isn't aware of the file hierarchy of the application package; you need to create a mark file per folder and upload it last, to let the image store service know that the folder is complete. */
export interface UploadFiledefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns the information about the image store content at the specified contentPath. The contentPath is relative to the root of the image store. */
export interface GetImageStoreContent200Response extends HttpResponse {
  status: "200";
  body: ImageStoreContentOutput;
}

/** Returns the information about the image store content at the specified contentPath. The contentPath is relative to the root of the image store. */
export interface GetImageStoreContentdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Deletes existing image store content being found within the given image store relative path. This command can be used to delete uploaded application packages once they are provisioned. */
export interface DeleteImageStoreContent200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes existing image store content being found within the given image store relative path. This command can be used to delete uploaded application packages once they are provisioned. */
export interface DeleteImageStoreContentdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns the information about the image store content at the root of the image store. */
export interface GetImageStoreRootContent200Response extends HttpResponse {
  status: "200";
  body: ImageStoreContentOutput;
}

/** Returns the information about the image store content at the root of the image store. */
export interface GetImageStoreRootContentdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Copies the image store content from the source image store relative path to the destination image store relative path. */
export interface CopyImageStoreContent200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Copies the image store content from the source image store relative path to the destination image store relative path. */
export interface CopyImageStoreContentdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The DELETE request will cause the existing upload session to expire and remove any previously uploaded file chunks. */
export interface DeleteImageStoreUploadSession200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** The DELETE request will cause the existing upload session to expire and remove any previously uploaded file chunks. */
export interface DeleteImageStoreUploadSessiondefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** When all file chunks have been uploaded, the upload session needs to be committed explicitly to complete the upload. Image store preserves the upload session until the expiration time, which is 30 minutes after the last chunk received. */
export interface CommitImageStoreUploadSession200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** When all file chunks have been uploaded, the upload session needs to be committed explicitly to complete the upload. Image store preserves the upload session until the expiration time, which is 30 minutes after the last chunk received. */
export interface CommitImageStoreUploadSessiondefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the image store upload session identified by the given ID. User can query the upload session at any time during uploading. */
export interface GetImageStoreUploadSessionById200Response extends HttpResponse {
  status: "200";
  body: UploadSessionOutput;
}

/** Gets the image store upload session identified by the given ID. User can query the upload session at any time during uploading. */
export interface GetImageStoreUploadSessionByIddefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the image store upload session associated with the given image store relative path. User can query the upload session at any time during uploading. */
export interface GetImageStoreUploadSessionByPath200Response extends HttpResponse {
  status: "200";
  body: UploadSessionOutput;
}

/** Gets the image store upload session associated with the given image store relative path. User can query the upload session at any time during uploading. */
export interface GetImageStoreUploadSessionByPathdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Uploads a file chunk to the image store with the specified upload session ID and image store relative path. This API allows user to resume the file upload operation. user doesn't have to restart the file upload from scratch whenever there is a network interruption. Use this option if the file size is large.
 *
 * To perform a resumable file upload, user need to break the file into multiple chunks and upload these chunks to the image store one-by-one. Chunks don't have to be uploaded in order. If the file represented by the image store relative path already exists, it will be overwritten when the upload session commits.
 */
export interface UploadFileChunk200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * Uploads a file chunk to the image store with the specified upload session ID and image store relative path. This API allows user to resume the file upload operation. user doesn't have to restart the file upload from scratch whenever there is a network interruption. Use this option if the file size is large.
 *
 * To perform a resumable file upload, user need to break the file into multiple chunks and upload these chunks to the image store one-by-one. Chunks don't have to be uploaded in order. If the file represented by the image store relative path already exists, it will be overwritten when the upload session commits.
 */
export interface UploadFileChunkdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns the total size of files at the root and children folders in image store. */
export interface GetImageStoreRootFolderSize200Response extends HttpResponse {
  status: "200";
  body: FolderSizeInfoOutput;
}

/** Returns the total size of files at the root and children folders in image store. */
export interface GetImageStoreRootFolderSizedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the total size of file under a image store folder, specified by contentPath. The contentPath is relative to the root of the image store. */
export interface GetImageStoreFolderSize200Response extends HttpResponse {
  status: "200";
  body: FolderSizeInfoOutput;
}

/** Gets the total size of file under a image store folder, specified by contentPath. The contentPath is relative to the root of the image store. */
export interface GetImageStoreFolderSizedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns information about the primary ImageStore replica, such as disk capacity and available disk space at the node it is on, and several categories of the ImageStore's file system usage. */
export interface GetImageStoreInfo200Response extends HttpResponse {
  status: "200";
  body: ImageStoreInfoOutput;
}

/** Returns information about the primary ImageStore replica, such as disk capacity and available disk space at the node it is on, and several categories of the ImageStore's file system usage. */
export interface GetImageStoreInfodefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * For clusters that have one or more instances of the Infrastructure Service configured,
 * this API provides a way to send infrastructure-specific commands to a particular
 * instance of the Infrastructure Service.
 *
 * Available commands and their corresponding response formats vary depending upon
 * the infrastructure on which the cluster is running.
 *
 * This API supports the Service Fabric platform; it is not meant to be used directly from your code.
 */
export interface InvokeInfrastructureCommand200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/**
 * For clusters that have one or more instances of the Infrastructure Service configured,
 * this API provides a way to send infrastructure-specific commands to a particular
 * instance of the Infrastructure Service.
 *
 * Available commands and their corresponding response formats vary depending upon
 * the infrastructure on which the cluster is running.
 *
 * This API supports the Service Fabric platform; it is not meant to be used directly from your code.
 */
export interface InvokeInfrastructureCommanddefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * For clusters that have one or more instances of the Infrastructure Service configured,
 * this API provides a way to send infrastructure-specific queries to a particular
 * instance of the Infrastructure Service.
 *
 * Available commands and their corresponding response formats vary depending upon
 * the infrastructure on which the cluster is running.
 *
 * This API supports the Service Fabric platform; it is not meant to be used directly from your code.
 */
export interface InvokeInfrastructureQuery200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

/**
 * For clusters that have one or more instances of the Infrastructure Service configured,
 * this API provides a way to send infrastructure-specific queries to a particular
 * instance of the Infrastructure Service.
 *
 * Available commands and their corresponding response formats vary depending upon
 * the infrastructure on which the cluster is running.
 *
 * This API supports the Service Fabric platform; it is not meant to be used directly from your code.
 */
export interface InvokeInfrastructureQuerydefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * This API will induce data loss for the specified partition. It will trigger a call to the OnDataLoss API of the partition.
 * Actual data loss will depend on the specified DataLossMode.
 *
 * - PartialDataLoss - Only a quorum of replicas are removed and OnDataLoss is triggered for the partition but actual data loss depends on the presence of in-flight replication.
 * - FullDataLoss - All replicas are removed hence all data is lost and OnDataLoss is triggered.
 *
 * This API should only be called with a stateful service as the target.
 *
 * Calling this API with a system service as the target is not advised.
 *
 * Note:  Once this API has been called, it cannot be reversed. Calling CancelOperation will only stop execution and clean up internal system state.
 * It will not restore data if the command has progressed far enough to cause data loss.
 *
 * Call the GetDataLossProgress API with the same OperationId to return information on the operation started with this API.
 */
export interface StartDataLoss202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/**
 * This API will induce data loss for the specified partition. It will trigger a call to the OnDataLoss API of the partition.
 * Actual data loss will depend on the specified DataLossMode.
 *
 * - PartialDataLoss - Only a quorum of replicas are removed and OnDataLoss is triggered for the partition but actual data loss depends on the presence of in-flight replication.
 * - FullDataLoss - All replicas are removed hence all data is lost and OnDataLoss is triggered.
 *
 * This API should only be called with a stateful service as the target.
 *
 * Calling this API with a system service as the target is not advised.
 *
 * Note:  Once this API has been called, it cannot be reversed. Calling CancelOperation will only stop execution and clean up internal system state.
 * It will not restore data if the command has progressed far enough to cause data loss.
 *
 * Call the GetDataLossProgress API with the same OperationId to return information on the operation started with this API.
 */
export interface StartDataLossdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the progress of a data loss operation started with StartDataLoss, using the OperationId. */
export interface GetDataLossProgress200Response extends HttpResponse {
  status: "200";
  body: PartitionDataLossProgressOutput;
}

/** Gets the progress of a data loss operation started with StartDataLoss, using the OperationId. */
export interface GetDataLossProgressdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * This API is useful for a temporary quorum loss situation on your service.
 *
 * Call the GetQuorumLossProgress API with the same OperationId to return information on the operation started with this API.
 *
 * This can only be called on stateful persisted (HasPersistedState==true) services.  Do not use this API on stateless services or stateful in-memory only services.
 */
export interface StartQuorumLoss202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/**
 * This API is useful for a temporary quorum loss situation on your service.
 *
 * Call the GetQuorumLossProgress API with the same OperationId to return information on the operation started with this API.
 *
 * This can only be called on stateful persisted (HasPersistedState==true) services.  Do not use this API on stateless services or stateful in-memory only services.
 */
export interface StartQuorumLossdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the progress of a quorum loss operation started with StartQuorumLoss, using the provided OperationId. */
export interface GetQuorumLossProgress200Response extends HttpResponse {
  status: "200";
  body: PartitionQuorumLossProgressOutput;
}

/** Gets the progress of a quorum loss operation started with StartQuorumLoss, using the provided OperationId. */
export interface GetQuorumLossProgressdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * This API is useful for testing failover.
 *
 * If used to target a stateless service partition, RestartPartitionMode must be AllReplicasOrInstances.
 *
 * Call the GetPartitionRestartProgress API using the same OperationId to get the progress.
 */
export interface StartPartitionRestart202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/**
 * This API is useful for testing failover.
 *
 * If used to target a stateless service partition, RestartPartitionMode must be AllReplicasOrInstances.
 *
 * Call the GetPartitionRestartProgress API using the same OperationId to get the progress.
 */
export interface StartPartitionRestartdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the progress of a PartitionRestart started with StartPartitionRestart using the provided OperationId. */
export interface GetPartitionRestartProgress200Response extends HttpResponse {
  status: "200";
  body: PartitionRestartProgressOutput;
}

/** Gets the progress of a PartitionRestart started with StartPartitionRestart using the provided OperationId. */
export interface GetPartitionRestartProgressdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Starts or stops a cluster node.  A cluster node is a process, not the OS instance itself.  To start a node, pass in "Start" for the NodeTransitionType parameter.
 * To stop a node, pass in "Stop" for the NodeTransitionType parameter.  This API starts the operation - when the API returns the node may not have finished transitioning yet.
 * Call GetNodeTransitionProgress with the same OperationId to get the progress of the operation.
 */
export interface StartNodeTransition202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/**
 * Starts or stops a cluster node.  A cluster node is a process, not the OS instance itself.  To start a node, pass in "Start" for the NodeTransitionType parameter.
 * To stop a node, pass in "Stop" for the NodeTransitionType parameter.  This API starts the operation - when the API returns the node may not have finished transitioning yet.
 * Call GetNodeTransitionProgress with the same OperationId to get the progress of the operation.
 */
export interface StartNodeTransitiondefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the progress of an operation started with StartNodeTransition using the provided OperationId. */
export interface GetNodeTransitionProgress200Response extends HttpResponse {
  status: "200";
  body: NodeTransitionProgressOutput;
}

/** Gets the progress of an operation started with StartNodeTransition using the provided OperationId. */
export interface GetNodeTransitionProgressdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the list of user-induced fault operations filtered by provided input. */
export interface GetFaultOperationList200Response extends HttpResponse {
  status: "200";
  body: Array<OperationStatusOutput>;
}

/** Gets the list of user-induced fault operations filtered by provided input. */
export interface GetFaultOperationListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * The following APIs start fault operations that may be cancelled by using CancelOperation: StartDataLoss, StartQuorumLoss, StartPartitionRestart, StartNodeTransition.
 *
 * If force is false, then the specified user-induced operation will be gracefully stopped and cleaned up.  If force is true, the command will be aborted, and some internal state
 * may be left behind.  Specifying force as true should be used with care.  Calling this API with force set to true is not allowed until this API has already
 * been called on the same test command with force set to false first, or unless the test command already has an OperationState of OperationState.RollingBack.
 * Clarification: OperationState.RollingBack means that the system will be/is cleaning up internal system state caused by executing the command.  It will not restore data if the
 * test command was to cause data loss.  For example, if you call StartDataLoss then call this API, the system will only clean up internal state from running the command.
 * It will not restore the target partition's data, if the command progressed far enough to cause data loss.
 *
 * Important note:  if this API is invoked with force==true, internal state may be left behind.
 */
export interface CancelOperation200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/**
 * The following APIs start fault operations that may be cancelled by using CancelOperation: StartDataLoss, StartQuorumLoss, StartPartitionRestart, StartNodeTransition.
 *
 * If force is false, then the specified user-induced operation will be gracefully stopped and cleaned up.  If force is true, the command will be aborted, and some internal state
 * may be left behind.  Specifying force as true should be used with care.  Calling this API with force set to true is not allowed until this API has already
 * been called on the same test command with force set to false first, or unless the test command already has an OperationState of OperationState.RollingBack.
 * Clarification: OperationState.RollingBack means that the system will be/is cleaning up internal system state caused by executing the command.  It will not restore data if the
 * test command was to cause data loss.  For example, if you call StartDataLoss then call this API, the system will only clean up internal state from running the command.
 * It will not restore the target partition's data, if the command progressed far enough to cause data loss.
 *
 * Important note:  if this API is invoked with force==true, internal state may be left behind.
 */
export interface CancelOperationdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Creates a backup policy which can be associated later with a Service Fabric application, service or a partition for periodic backup. */
export interface CreateBackupPolicy201Response extends HttpResponse {
  status: "201";
  body: Record<string, unknown>;
}

/** Creates a backup policy which can be associated later with a Service Fabric application, service or a partition for periodic backup. */
export interface CreateBackupPolicydefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Deletes an existing backup policy. A backup policy must be created before it can be deleted. A currently active backup policy, associated with any Service Fabric application, service or partition, cannot be deleted without first deleting the mapping. */
export interface DeleteBackupPolicy200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes an existing backup policy. A backup policy must be created before it can be deleted. A currently active backup policy, associated with any Service Fabric application, service or partition, cannot be deleted without first deleting the mapping. */
export interface DeleteBackupPolicydefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Get a list of all the backup policies configured. */
export interface GetBackupPolicyList200Response extends HttpResponse {
  status: "200";
  body: PagedBackupPolicyDescriptionListOutput;
}

/** Get a list of all the backup policies configured. */
export interface GetBackupPolicyListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets a particular backup policy identified by {backupPolicyName} */
export interface GetBackupPolicyByName200Response extends HttpResponse {
  status: "200";
  body: BackupPolicyDescriptionOutput;
}

/** Gets a particular backup policy identified by {backupPolicyName} */
export interface GetBackupPolicyByNamedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns a list of Service Fabric application, service or partition which are associated with this backup policy. */
export interface GetAllEntitiesBackedUpByPolicy200Response extends HttpResponse {
  status: "200";
  body: PagedBackupEntityListOutput;
}

/** Returns a list of Service Fabric application, service or partition which are associated with this backup policy. */
export interface GetAllEntitiesBackedUpByPolicydefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Updates the backup policy identified by {backupPolicyName} */
export interface UpdateBackupPolicy200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Updates the backup policy identified by {backupPolicyName} */
export interface UpdateBackupPolicydefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Enables periodic backup of stateful partitions which are part of this Service Fabric application. Each partition is backed up individually as per the specified backup policy description.
 * Note only C# based Reliable Actor and Reliable Stateful services are currently supported for periodic backup.
 */
export interface EnableApplicationBackup202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/**
 * Enables periodic backup of stateful partitions which are part of this Service Fabric application. Each partition is backed up individually as per the specified backup policy description.
 * Note only C# based Reliable Actor and Reliable Stateful services are currently supported for periodic backup.
 */
export interface EnableApplicationBackupdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Disables periodic backup of Service Fabric application which was previously enabled. */
export interface DisableApplicationBackup202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Disables periodic backup of Service Fabric application which was previously enabled. */
export interface DisableApplicationBackupdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the Service Fabric backup configuration information for the application and the services and partitions under this application. */
export interface GetApplicationBackupConfigurationInfo200Response extends HttpResponse {
  status: "200";
  body: PagedBackupConfigurationInfoListOutput;
}

/** Gets the Service Fabric backup configuration information for the application and the services and partitions under this application. */
export interface GetApplicationBackupConfigurationInfodefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns a list of backups available for every partition in this Service Fabric application. The server enumerates all the backups available at the backup location configured in the backup policy. It also allows filtering of the result based on start and end datetime or just fetching the latest available backup for every partition. */
export interface GetApplicationBackupList200Response extends HttpResponse {
  status: "200";
  body: PagedBackupInfoListOutput;
}

/** Returns a list of backups available for every partition in this Service Fabric application. The server enumerates all the backups available at the backup location configured in the backup policy. It also allows filtering of the result based on start and end datetime or just fetching the latest available backup for every partition. */
export interface GetApplicationBackupListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The application which is configured to take periodic backups, is suspended for taking further backups till it is resumed again. This operation applies to the entire application's hierarchy. It means all the services and partitions under this application are now suspended for backup. */
export interface SuspendApplicationBackup202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The application which is configured to take periodic backups, is suspended for taking further backups till it is resumed again. This operation applies to the entire application's hierarchy. It means all the services and partitions under this application are now suspended for backup. */
export interface SuspendApplicationBackupdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The previously suspended Service Fabric application resumes taking periodic backup as per the backup policy currently configured for the same. */
export interface ResumeApplicationBackup202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The previously suspended Service Fabric application resumes taking periodic backup as per the backup policy currently configured for the same. */
export interface ResumeApplicationBackupdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Enables periodic backup of stateful partitions which are part of this Service Fabric service. Each partition is backed up individually as per the specified backup policy description. In case the application, which the service is part of, is already enabled for backup then this operation would override the policy being used to take the periodic backup for this service and its partitions (unless explicitly overridden at the partition level).
 * Note only C# based Reliable Actor and Reliable Stateful services are currently supported for periodic backup.
 */
export interface EnableServiceBackup202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/**
 * Enables periodic backup of stateful partitions which are part of this Service Fabric service. Each partition is backed up individually as per the specified backup policy description. In case the application, which the service is part of, is already enabled for backup then this operation would override the policy being used to take the periodic backup for this service and its partitions (unless explicitly overridden at the partition level).
 * Note only C# based Reliable Actor and Reliable Stateful services are currently supported for periodic backup.
 */
export interface EnableServiceBackupdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Disables periodic backup of Service Fabric service which was previously enabled. Backup must be explicitly enabled before it can be disabled.
 * In case the backup is enabled for the Service Fabric application, which this service is part of, this service would continue to be periodically backed up as per the policy mapped at the application level.
 */
export interface DisableServiceBackup202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/**
 * Disables periodic backup of Service Fabric service which was previously enabled. Backup must be explicitly enabled before it can be disabled.
 * In case the backup is enabled for the Service Fabric application, which this service is part of, this service would continue to be periodically backed up as per the policy mapped at the application level.
 */
export interface DisableServiceBackupdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the Service Fabric backup configuration information for the service and the partitions under this service. */
export interface GetServiceBackupConfigurationInfo200Response extends HttpResponse {
  status: "200";
  body: PagedBackupConfigurationInfoListOutput;
}

/** Gets the Service Fabric backup configuration information for the service and the partitions under this service. */
export interface GetServiceBackupConfigurationInfodefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns a list of backups available for every partition in this Service Fabric service. The server enumerates all the backups available in the backup store configured in the backup policy. It also allows filtering of the result based on start and end datetime or just fetching the latest available backup for every partition. */
export interface GetServiceBackupList200Response extends HttpResponse {
  status: "200";
  body: PagedBackupInfoListOutput;
}

/** Returns a list of backups available for every partition in this Service Fabric service. The server enumerates all the backups available in the backup store configured in the backup policy. It also allows filtering of the result based on start and end datetime or just fetching the latest available backup for every partition. */
export interface GetServiceBackupListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The service which is configured to take periodic backups, is suspended for taking further backups till it is resumed again. This operation applies to the entire service's hierarchy. It means all the partitions under this service are now suspended for backup. */
export interface SuspendServiceBackup202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The service which is configured to take periodic backups, is suspended for taking further backups till it is resumed again. This operation applies to the entire service's hierarchy. It means all the partitions under this service are now suspended for backup. */
export interface SuspendServiceBackupdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The previously suspended Service Fabric service resumes taking periodic backup as per the backup policy currently configured for the same. */
export interface ResumeServiceBackup202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The previously suspended Service Fabric service resumes taking periodic backup as per the backup policy currently configured for the same. */
export interface ResumeServiceBackupdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Enables periodic backup of stateful persisted partition. Each partition is backed up as per the specified backup policy description. In case the application or service, which is partition is part of, is already enabled for backup then this operation would override the policy being used to take the periodic backup of this partition.
 * Note only C# based Reliable Actor and Reliable Stateful services are currently supported for periodic backup.
 */
export interface EnablePartitionBackup202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/**
 * Enables periodic backup of stateful persisted partition. Each partition is backed up as per the specified backup policy description. In case the application or service, which is partition is part of, is already enabled for backup then this operation would override the policy being used to take the periodic backup of this partition.
 * Note only C# based Reliable Actor and Reliable Stateful services are currently supported for periodic backup.
 */
export interface EnablePartitionBackupdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Disables periodic backup of partition which was previously enabled. Backup must be explicitly enabled before it can be disabled.
 * In case the backup is enabled for the Service Fabric application or service, which this partition is part of, this partition would continue to be periodically backed up as per the policy mapped at the higher level entity.
 */
export interface DisablePartitionBackup202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/**
 * Disables periodic backup of partition which was previously enabled. Backup must be explicitly enabled before it can be disabled.
 * In case the backup is enabled for the Service Fabric application or service, which this partition is part of, this partition would continue to be periodically backed up as per the policy mapped at the higher level entity.
 */
export interface DisablePartitionBackupdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the Service Fabric Backup configuration information for the specified partition. */
export interface GetPartitionBackupConfigurationInfo200Response extends HttpResponse {
  status: "200";
  body: PartitionBackupConfigurationInfoOutput;
}

/** Gets the Service Fabric Backup configuration information for the specified partition. */
export interface GetPartitionBackupConfigurationInfodefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns a list of backups available for the specified partition. The server enumerates all the backups available in the backup store configured in the backup policy. It also allows filtering of the result based on start and end datetime or just fetching the latest available backup for the partition. */
export interface GetPartitionBackupList200Response extends HttpResponse {
  status: "200";
  body: PagedBackupInfoListOutput;
}

/** Returns a list of backups available for the specified partition. The server enumerates all the backups available in the backup store configured in the backup policy. It also allows filtering of the result based on start and end datetime or just fetching the latest available backup for the partition. */
export interface GetPartitionBackupListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The partition which is configured to take periodic backups, is suspended for taking further backups till it is resumed again. */
export interface SuspendPartitionBackup202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The partition which is configured to take periodic backups, is suspended for taking further backups till it is resumed again. */
export interface SuspendPartitionBackupdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The previously suspended partition resumes taking periodic backup as per the backup policy currently configured for the same. */
export interface ResumePartitionBackup202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** The previously suspended partition resumes taking periodic backup as per the backup policy currently configured for the same. */
export interface ResumePartitionBackupdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Creates a backup of the stateful persisted partition's state. In case the partition is already being periodically backed up, then by default the new backup is created at the same backup storage. One can also override the same by specifying the backup storage details as part of the request body. Once the backup is initiated, its progress can be tracked using the GetBackupProgress operation.
 * In case, the operation times out, specify a greater backup timeout value in the query parameter.
 */
export interface BackupPartition202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/**
 * Creates a backup of the stateful persisted partition's state. In case the partition is already being periodically backed up, then by default the new backup is created at the same backup storage. One can also override the same by specifying the backup storage details as part of the request body. Once the backup is initiated, its progress can be tracked using the GetBackupProgress operation.
 * In case, the operation times out, specify a greater backup timeout value in the query parameter.
 */
export interface BackupPartitiondefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns information about the state of the latest backup along with details or failure reason in case of completion. */
export interface GetPartitionBackupProgress200Response extends HttpResponse {
  status: "200";
  body: BackupProgressInfoOutput;
}

/** Returns information about the state of the latest backup along with details or failure reason in case of completion. */
export interface GetPartitionBackupProgressdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/**
 * Restores the state of a of the stateful persisted partition using the specified backup point. In case the partition is already being periodically backed up, then by default the backup point is looked for in the storage specified in backup policy. One can also override the same by specifying the backup storage details as part of the restore partition description in body. Once the restore is initiated, its progress can be tracked using the GetRestoreProgress operation.
 * In case, the operation times out, specify a greater restore timeout value in the query parameter.
 */
export interface RestorePartition202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/**
 * Restores the state of a of the stateful persisted partition using the specified backup point. In case the partition is already being periodically backed up, then by default the backup point is looked for in the storage specified in backup policy. One can also override the same by specifying the backup storage details as part of the restore partition description in body. Once the restore is initiated, its progress can be tracked using the GetRestoreProgress operation.
 * In case, the operation times out, specify a greater restore timeout value in the query parameter.
 */
export interface RestorePartitiondefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns information about the state of the latest restore operation along with details or failure reason in case of completion. */
export interface GetPartitionRestoreProgress200Response extends HttpResponse {
  status: "200";
  body: RestoreProgressInfoOutput;
}

/** Returns information about the state of the latest restore operation along with details or failure reason in case of completion. */
export interface GetPartitionRestoreProgressdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the list of backups available for the specified backed up entity (Application, Service or Partition) at the specified backup location (FileShare or Azure Blob Storage). */
export interface GetBackupsFromBackupLocation200Response extends HttpResponse {
  status: "200";
  body: PagedBackupInfoListOutput;
}

/** Gets the list of backups available for the specified backed up entity (Application, Service or Partition) at the specified backup location (FileShare or Azure Blob Storage). */
export interface GetBackupsFromBackupLocationdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Creates the specified Service Fabric name. */
export interface CreateName201Response extends HttpResponse {
  status: "201";
  body: Record<string, unknown>;
}

/** Creates the specified Service Fabric name. */
export interface CreateNamedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Returns whether the specified Service Fabric name exists. */
export interface GetNameExistsInfo200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Returns whether the specified Service Fabric name exists. */
export interface GetNameExistsInfodefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Deletes the specified Service Fabric name. A name must be created before it can be deleted. Deleting a name with child properties will fail. */
export interface DeleteName200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes the specified Service Fabric name. A name must be created before it can be deleted. Deleting a name with child properties will fail. */
export interface DeleteNamedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Enumerates all the Service Fabric names under a given name. If the subnames do not fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. Querying a name that doesn't exist will fail. */
export interface GetSubNameInfoList200Response extends HttpResponse {
  status: "200";
  body: PagedSubNameInfoListOutput;
}

/** Enumerates all the Service Fabric names under a given name. If the subnames do not fit in a page, one page of results is returned as well as a continuation token, which can be used to get the next page. Querying a name that doesn't exist will fail. */
export interface GetSubNameInfoListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** A Service Fabric name can have one or more named properties that store custom information. This operation gets the information about these properties in a paged list. The information includes name, value, and metadata about each of the properties. */
export interface GetPropertyInfoList200Response extends HttpResponse {
  status: "200";
  body: PagedPropertyInfoListOutput;
}

/** A Service Fabric name can have one or more named properties that store custom information. This operation gets the information about these properties in a paged list. The information includes name, value, and metadata about each of the properties. */
export interface GetPropertyInfoListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Creates or updates the specified Service Fabric property under a given name. */
export interface PutProperty200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Creates or updates the specified Service Fabric property under a given name. */
export interface PutPropertydefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the specified Service Fabric property under a given name. This will always return both value and metadata. */
export interface GetPropertyInfo200Response extends HttpResponse {
  status: "200";
  body: PropertyInfoOutput;
}

/** Gets the specified Service Fabric property under a given name. This will always return both value and metadata. */
export interface GetPropertyInfodefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Deletes the specified Service Fabric property under a given name. A property must be created before it can be deleted. */
export interface DeleteProperty200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes the specified Service Fabric property under a given name. A property must be created before it can be deleted. */
export interface DeletePropertydefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Submits a batch of property operations. Either all or none of the operations will be committed. */
export interface SubmitPropertyBatch200Response extends HttpResponse {
  status: "200";
  body: SuccessfulPropertyBatchInfoOutput;
}

/** Submits a batch of property operations. Either all or none of the operations will be committed. */
export interface SubmitPropertyBatch409Response extends HttpResponse {
  status: "409";
  body: FailedPropertyBatchInfoOutput;
}

/** Submits a batch of property operations. Either all or none of the operations will be committed. */
export interface SubmitPropertyBatchdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response is list of ClusterEvent objects. */
export interface GetClusterEventList200Response extends HttpResponse {
  status: "200";
  body: Array<ClusterEventOutput>;
}

/** The response is list of ClusterEvent objects. */
export interface GetClusterEventListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response is list of ContainerInstanceEvent objects. */
export interface GetContainersEventList200Response extends HttpResponse {
  status: "200";
  body: Array<ContainerInstanceEventOutput>;
}

/** The response is list of ContainerInstanceEvent objects. */
export interface GetContainersEventListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response is list of NodeEvent objects. */
export interface GetNodeEventList200Response extends HttpResponse {
  status: "200";
  body: Array<NodeEventOutput>;
}

/** The response is list of NodeEvent objects. */
export interface GetNodeEventListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response is list of NodeEvent objects. */
export interface GetNodesEventList200Response extends HttpResponse {
  status: "200";
  body: Array<NodeEventOutput>;
}

/** The response is list of NodeEvent objects. */
export interface GetNodesEventListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response is list of ApplicationEvent objects. */
export interface GetApplicationEventList200Response extends HttpResponse {
  status: "200";
  body: Array<ApplicationEventOutput>;
}

/** The response is list of ApplicationEvent objects. */
export interface GetApplicationEventListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response is list of ApplicationEvent objects. */
export interface GetApplicationsEventList200Response extends HttpResponse {
  status: "200";
  body: Array<ApplicationEventOutput>;
}

/** The response is list of ApplicationEvent objects. */
export interface GetApplicationsEventListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response is list of ServiceEvent objects. */
export interface GetServiceEventList200Response extends HttpResponse {
  status: "200";
  body: Array<ServiceEventOutput>;
}

/** The response is list of ServiceEvent objects. */
export interface GetServiceEventListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response is list of ServiceEvent objects. */
export interface GetServicesEventList200Response extends HttpResponse {
  status: "200";
  body: Array<ServiceEventOutput>;
}

/** The response is list of ServiceEvent objects. */
export interface GetServicesEventListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response is list of PartitionEvent objects. */
export interface GetPartitionEventList200Response extends HttpResponse {
  status: "200";
  body: Array<PartitionEventOutput>;
}

/** The response is list of PartitionEvent objects. */
export interface GetPartitionEventListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response is list of PartitionEvent objects. */
export interface GetPartitionsEventList200Response extends HttpResponse {
  status: "200";
  body: Array<PartitionEventOutput>;
}

/** The response is list of PartitionEvent objects. */
export interface GetPartitionsEventListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response is list of ReplicaEvent objects. */
export interface GetPartitionReplicaEventList200Response extends HttpResponse {
  status: "200";
  body: Array<ReplicaEventOutput>;
}

/** The response is list of ReplicaEvent objects. */
export interface GetPartitionReplicaEventListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response is list of ReplicaEvent objects. */
export interface GetPartitionReplicasEventList200Response extends HttpResponse {
  status: "200";
  body: Array<ReplicaEventOutput>;
}

/** The response is list of ReplicaEvent objects. */
export interface GetPartitionReplicasEventListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** The response is list of FabricEvents. */
export interface GetCorrelatedEventList200Response extends HttpResponse {
  status: "200";
  body: Array<FabricEventOutput>;
}

/** The response is list of FabricEvents. */
export interface GetCorrelatedEventListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Creates a Secret resource with the specified name, description and properties. If Secret resource with the same name exists, then it is updated with the specified description and properties. Once created, the kind and contentType of a secret resource cannot be updated. */
export interface MeshSecretCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SecretResourceDescriptionOutput;
}

/** Creates a Secret resource with the specified name, description and properties. If Secret resource with the same name exists, then it is updated with the specified description and properties. Once created, the kind and contentType of a secret resource cannot be updated. */
export interface MeshSecretCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SecretResourceDescriptionOutput;
}

/** Creates a Secret resource with the specified name, description and properties. If Secret resource with the same name exists, then it is updated with the specified description and properties. Once created, the kind and contentType of a secret resource cannot be updated. */
export interface MeshSecretCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Creates a Secret resource with the specified name, description and properties. If Secret resource with the same name exists, then it is updated with the specified description and properties. Once created, the kind and contentType of a secret resource cannot be updated. */
export interface MeshSecretCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about the Secret resource with the given name. The information include the description and other properties of the Secret. */
export interface MeshSecretGet200Response extends HttpResponse {
  status: "200";
  body: SecretResourceDescriptionOutput;
}

/** Gets the information about the Secret resource with the given name. The information include the description and other properties of the Secret. */
export interface MeshSecretGetdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Deletes the specified Secret resource and all of its named values. */
export interface MeshSecretDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes the specified Secret resource and all of its named values. */
export interface MeshSecretDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes the specified Secret resource and all of its named values. */
export interface MeshSecretDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes the specified Secret resource and all of its named values. */
export interface MeshSecretDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about all secret resources in a given resource group. The information include the description and other properties of the Secret. */
export interface MeshSecretList200Response extends HttpResponse {
  status: "200";
  body: PagedSecretResourceDescriptionListOutput;
}

/** Gets the information about all secret resources in a given resource group. The information include the description and other properties of the Secret. */
export interface MeshSecretListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Creates a new value of the specified secret resource. The name of the value is typically the version identifier. Once created the value cannot be changed. */
export interface MeshSecretValueAddValue200Response extends HttpResponse {
  status: "200";
  body: SecretValueResourceDescriptionOutput;
}

/** Creates a new value of the specified secret resource. The name of the value is typically the version identifier. Once created the value cannot be changed. */
export interface MeshSecretValueAddValue201Response extends HttpResponse {
  status: "201";
  body: SecretValueResourceDescriptionOutput;
}

/** Creates a new value of the specified secret resource. The name of the value is typically the version identifier. Once created the value cannot be changed. */
export interface MeshSecretValueAddValue202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Creates a new value of the specified secret resource. The name of the value is typically the version identifier. Once created the value cannot be changed. */
export interface MeshSecretValueAddValuedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Get the information about the specified named secret value resources. The information does not include the actual value of the secret. */
export interface MeshSecretValueGet200Response extends HttpResponse {
  status: "200";
  body: SecretValueResourceDescriptionOutput;
}

/** Get the information about the specified named secret value resources. The information does not include the actual value of the secret. */
export interface MeshSecretValueGetdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Deletes the secret value resource identified by the name. The name of the resource is typically the version associated with that value. Deletion will fail if the specified value is in use. */
export interface MeshSecretValueDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes the secret value resource identified by the name. The name of the resource is typically the version associated with that value. Deletion will fail if the specified value is in use. */
export interface MeshSecretValueDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes the secret value resource identified by the name. The name of the resource is typically the version associated with that value. Deletion will fail if the specified value is in use. */
export interface MeshSecretValueDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes the secret value resource identified by the name. The name of the resource is typically the version associated with that value. Deletion will fail if the specified value is in use. */
export interface MeshSecretValueDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets information about all secret value resources of the specified secret resource. The information includes the names of the secret value resources, but not the actual values. */
export interface MeshSecretValueList200Response extends HttpResponse {
  status: "200";
  body: PagedSecretValueResourceDescriptionListOutput;
}

/** Gets information about all secret value resources of the specified secret resource. The information includes the names of the secret value resources, but not the actual values. */
export interface MeshSecretValueListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Lists the decrypted value of the specified named value of the secret resource. This is a privileged operation. */
export interface MeshSecretValueShow200Response extends HttpResponse {
  status: "200";
  body: SecretValueOutput;
}

/** Lists the decrypted value of the specified named value of the secret resource. This is a privileged operation. */
export interface MeshSecretValueShowdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Creates a Volume resource with the specified name, description and properties. If Volume resource with the same name exists, then it is updated with the specified description and properties. */
export interface MeshVolumeCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VolumeResourceDescriptionOutput;
}

/** Creates a Volume resource with the specified name, description and properties. If Volume resource with the same name exists, then it is updated with the specified description and properties. */
export interface MeshVolumeCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VolumeResourceDescriptionOutput;
}

/** Creates a Volume resource with the specified name, description and properties. If Volume resource with the same name exists, then it is updated with the specified description and properties. */
export interface MeshVolumeCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Creates a Volume resource with the specified name, description and properties. If Volume resource with the same name exists, then it is updated with the specified description and properties. */
export interface MeshVolumeCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about the Volume resource with the given name. The information include the description and other properties of the Volume. */
export interface MeshVolumeGet200Response extends HttpResponse {
  status: "200";
  body: VolumeResourceDescriptionOutput;
}

/** Gets the information about the Volume resource with the given name. The information include the description and other properties of the Volume. */
export interface MeshVolumeGetdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Deletes the Volume resource identified by the name. */
export interface MeshVolumeDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes the Volume resource identified by the name. */
export interface MeshVolumeDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes the Volume resource identified by the name. */
export interface MeshVolumeDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes the Volume resource identified by the name. */
export interface MeshVolumeDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about all volume resources in a given resource group. The information include the description and other properties of the Volume. */
export interface MeshVolumeList200Response extends HttpResponse {
  status: "200";
  body: PagedVolumeResourceDescriptionListOutput;
}

/** Gets the information about all volume resources in a given resource group. The information include the description and other properties of the Volume. */
export interface MeshVolumeListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Creates a Network resource with the specified name, description and properties. If Network resource with the same name exists, then it is updated with the specified description and properties. Network resource provides connectivity between application services. */
export interface MeshNetworkCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: NetworkResourceDescriptionOutput;
}

/** Creates a Network resource with the specified name, description and properties. If Network resource with the same name exists, then it is updated with the specified description and properties. Network resource provides connectivity between application services. */
export interface MeshNetworkCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: NetworkResourceDescriptionOutput;
}

/** Creates a Network resource with the specified name, description and properties. If Network resource with the same name exists, then it is updated with the specified description and properties. Network resource provides connectivity between application services. */
export interface MeshNetworkCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Creates a Network resource with the specified name, description and properties. If Network resource with the same name exists, then it is updated with the specified description and properties. Network resource provides connectivity between application services. */
export interface MeshNetworkCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about the Network resource with the given name. The information include the description and other properties of the Network. */
export interface MeshNetworkGet200Response extends HttpResponse {
  status: "200";
  body: NetworkResourceDescriptionOutput;
}

/** Gets the information about the Network resource with the given name. The information include the description and other properties of the Network. */
export interface MeshNetworkGetdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Deletes the Network resource identified by the name. */
export interface MeshNetworkDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes the Network resource identified by the name. */
export interface MeshNetworkDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes the Network resource identified by the name. */
export interface MeshNetworkDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes the Network resource identified by the name. */
export interface MeshNetworkDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about all network resources in a given resource group. The information include the description and other properties of the Network. */
export interface MeshNetworkList200Response extends HttpResponse {
  status: "200";
  body: PagedNetworkResourceDescriptionListOutput;
}

/** Gets the information about all network resources in a given resource group. The information include the description and other properties of the Network. */
export interface MeshNetworkListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Creates a Application resource with the specified name, description and properties. If Application resource with the same name exists, then it is updated with the specified description and properties. */
export interface MeshApplicationCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ApplicationResourceDescriptionOutput;
}

/** Creates a Application resource with the specified name, description and properties. If Application resource with the same name exists, then it is updated with the specified description and properties. */
export interface MeshApplicationCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ApplicationResourceDescriptionOutput;
}

/** Creates a Application resource with the specified name, description and properties. If Application resource with the same name exists, then it is updated with the specified description and properties. */
export interface MeshApplicationCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Creates a Application resource with the specified name, description and properties. If Application resource with the same name exists, then it is updated with the specified description and properties. */
export interface MeshApplicationCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about the Application resource with the given name. The information include the description and other properties of the Application. */
export interface MeshApplicationGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationResourceDescriptionOutput;
}

/** Gets the information about the Application resource with the given name. The information include the description and other properties of the Application. */
export interface MeshApplicationGetdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Deletes the Application resource identified by the name. */
export interface MeshApplicationDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes the Application resource identified by the name. */
export interface MeshApplicationDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes the Application resource identified by the name. */
export interface MeshApplicationDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes the Application resource identified by the name. */
export interface MeshApplicationDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about all application resources in a given resource group. The information include the description and other properties of the Application. */
export interface MeshApplicationList200Response extends HttpResponse {
  status: "200";
  body: PagedApplicationResourceDescriptionListOutput;
}

/** Gets the information about all application resources in a given resource group. The information include the description and other properties of the Application. */
export interface MeshApplicationListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the upgrade progress information about the Application resource with the given name. The information include percentage of completion and other upgrade state information of the Application resource. */
export interface MeshApplicationGetUpgradeProgress200Response extends HttpResponse {
  status: "200";
  body: ApplicationResourceUpgradeProgressInfoOutput;
}

/** Gets the upgrade progress information about the Application resource with the given name. The information include percentage of completion and other upgrade state information of the Application resource. */
export interface MeshApplicationGetUpgradeProgressdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about the Service resource with the given name. The information include the description and other properties of the Service. */
export interface MeshServiceGet200Response extends HttpResponse {
  status: "200";
  body: ServiceResourceDescriptionOutput;
}

/** Gets the information about the Service resource with the given name. The information include the description and other properties of the Service. */
export interface MeshServiceGetdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about all services of an application resource. The information include the description and other properties of the Service. */
export interface MeshServiceList200Response extends HttpResponse {
  status: "200";
  body: PagedServiceResourceDescriptionListOutput;
}

/** Gets the information about all services of an application resource. The information include the description and other properties of the Service. */
export interface MeshServiceListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the logs for the container of the specified code package of the service replica. */
export interface MeshCodePackageGetContainerLogs200Response extends HttpResponse {
  status: "200";
  body: ContainerLogsOutput;
}

/** Gets the logs for the container of the specified code package of the service replica. */
export interface MeshCodePackageGetContainerLogsdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about the service replica with the given name. The information include the description and other properties of the service replica. */
export interface MeshServiceReplicaGet200Response extends HttpResponse {
  status: "200";
  body: ServiceReplicaDescriptionOutput;
}

/** Gets the information about the service replica with the given name. The information include the description and other properties of the service replica. */
export interface MeshServiceReplicaGetdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about all replicas of a service. The information include the description and other properties of the service replica. */
export interface MeshServiceReplicaList200Response extends HttpResponse {
  status: "200";
  body: PagedServiceReplicaDescriptionListOutput;
}

/** Gets the information about all replicas of a service. The information include the description and other properties of the service replica. */
export interface MeshServiceReplicaListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Creates a Gateway resource with the specified name, description and properties. If Gateway resource with the same name exists, then it is updated with the specified description and properties. Use Gateway resource to provide public connectivity to application services. */
export interface MeshGatewayCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: GatewayResourceDescriptionOutput;
}

/** Creates a Gateway resource with the specified name, description and properties. If Gateway resource with the same name exists, then it is updated with the specified description and properties. Use Gateway resource to provide public connectivity to application services. */
export interface MeshGatewayCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: GatewayResourceDescriptionOutput;
}

/** Creates a Gateway resource with the specified name, description and properties. If Gateway resource with the same name exists, then it is updated with the specified description and properties. Use Gateway resource to provide public connectivity to application services. */
export interface MeshGatewayCreateOrUpdate202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Creates a Gateway resource with the specified name, description and properties. If Gateway resource with the same name exists, then it is updated with the specified description and properties. Use Gateway resource to provide public connectivity to application services. */
export interface MeshGatewayCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about the Gateway resource with the given name. The information include the description and other properties of the Gateway. */
export interface MeshGatewayGet200Response extends HttpResponse {
  status: "200";
  body: GatewayResourceDescriptionOutput;
}

/** Gets the information about the Gateway resource with the given name. The information include the description and other properties of the Gateway. */
export interface MeshGatewayGetdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Deletes the Gateway resource identified by the name. */
export interface MeshGatewayDelete200Response extends HttpResponse {
  status: "200";
  body: Record<string, unknown>;
}

/** Deletes the Gateway resource identified by the name. */
export interface MeshGatewayDelete202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
}

/** Deletes the Gateway resource identified by the name. */
export interface MeshGatewayDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes the Gateway resource identified by the name. */
export interface MeshGatewayDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}

/** Gets the information about all gateway resources in a given resource group. The information include the description and other properties of the Gateway. */
export interface MeshGatewayList200Response extends HttpResponse {
  status: "200";
  body: PagedGatewayResourceDescriptionListOutput;
}

/** Gets the information about all gateway resources in a given resource group. The information include the description and other properties of the Gateway. */
export interface MeshGatewayListdefaultResponse extends HttpResponse {
  status: "500";
  body: FabricErrorOutput;
}
