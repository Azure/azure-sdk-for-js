// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface ClusterManifestOutput {
  /** The contents of the cluster manifest file. */
  Manifest?: string;
}

export interface FabricErrorOutput {
  /** Error object containing error code and error message. */
  Error: FabricErrorErrorOutput;
}

export interface FabricErrorErrorOutput {
  /**
   * Defines the fabric error codes that be returned as part of the error object in response to Service Fabric API operations that are not successful. Following are the error code values that can be returned for a specific HTTP status code.
   *
   *   - Possible values of the error code for HTTP status code 400 (Bad Request)
   *     - "FABRIC_E_INVALID_PARTITION_KEY"
   *     - "FABRIC_E_IMAGEBUILDER_VALIDATION_ERROR"
   *     - "FABRIC_E_INVALID_ADDRESS"
   *     - "FABRIC_E_APPLICATION_NOT_UPGRADING"
   *     - "FABRIC_E_APPLICATION_UPGRADE_VALIDATION_ERROR"
   *     - "FABRIC_E_FABRIC_NOT_UPGRADING"
   *     - "FABRIC_E_FABRIC_UPGRADE_VALIDATION_ERROR"
   *     - "FABRIC_E_INVALID_CONFIGURATION"
   *     - "FABRIC_E_INVALID_NAME_URI"
   *     - "FABRIC_E_PATH_TOO_LONG"
   *     - "FABRIC_E_KEY_TOO_LARGE"
   *     - "FABRIC_E_SERVICE_AFFINITY_CHAIN_NOT_SUPPORTED"
   *     - "FABRIC_E_INVALID_ATOMIC_GROUP"
   *     - "FABRIC_E_VALUE_EMPTY"
   *     - "FABRIC_E_BACKUP_IS_ENABLED"
   *     - "FABRIC_E_RESTORE_SOURCE_TARGET_PARTITION_MISMATCH"
   *     - "FABRIC_E_INVALID_FOR_STATELESS_SERVICES"
   *     - "FABRIC_E_INVALID_SERVICE_SCALING_POLICY"
   *     - "E_INVALIDARG"
   *
   *   - Possible values of the error code for HTTP status code 404 (Not Found)
   *     - "FABRIC_E_NODE_NOT_FOUND"
   *     - "FABRIC_E_APPLICATION_TYPE_NOT_FOUND"
   *     - "FABRIC_E_APPLICATION_NOT_FOUND"
   *     - "FABRIC_E_SERVICE_TYPE_NOT_FOUND"
   *     - "FABRIC_E_SERVICE_DOES_NOT_EXIST"
   *     - "FABRIC_E_SERVICE_TYPE_TEMPLATE_NOT_FOUND"
   *     - "FABRIC_E_CONFIGURATION_SECTION_NOT_FOUND"
   *     - "FABRIC_E_PARTITION_NOT_FOUND"
   *     - "FABRIC_E_REPLICA_DOES_NOT_EXIST"
   *     - "FABRIC_E_SERVICE_GROUP_DOES_NOT_EXIST"
   *     - "FABRIC_E_CONFIGURATION_PARAMETER_NOT_FOUND"
   *     - "FABRIC_E_DIRECTORY_NOT_FOUND"
   *     - "FABRIC_E_FABRIC_VERSION_NOT_FOUND"
   *     - "FABRIC_E_FILE_NOT_FOUND"
   *     - "FABRIC_E_NAME_DOES_NOT_EXIST"
   *     - "FABRIC_E_PROPERTY_DOES_NOT_EXIST"
   *     - "FABRIC_E_ENUMERATION_COMPLETED"
   *     - "FABRIC_E_SERVICE_MANIFEST_NOT_FOUND"
   *     - "FABRIC_E_KEY_NOT_FOUND"
   *     - "FABRIC_E_HEALTH_ENTITY_NOT_FOUND"
   *     - "FABRIC_E_BACKUP_NOT_ENABLED"
   *     - "FABRIC_E_BACKUP_POLICY_NOT_EXISTING"
   *     - "FABRIC_E_FAULT_ANALYSIS_SERVICE_NOT_EXISTING"
   *     - "FABRIC_E_IMAGEBUILDER_RESERVED_DIRECTORY_ERROR"
   *
   *   - Possible values of the error code for HTTP status code 409 (Conflict)
   *     - "FABRIC_E_APPLICATION_TYPE_ALREADY_EXISTS"
   *     - "FABRIC_E_APPLICATION_ALREADY_EXISTS"
   *     - "FABRIC_E_APPLICATION_ALREADY_IN_TARGET_VERSION"
   *     - "FABRIC_E_APPLICATION_TYPE_PROVISION_IN_PROGRESS"
   *     - "FABRIC_E_APPLICATION_UPGRADE_IN_PROGRESS"
   *     - "FABRIC_E_SERVICE_ALREADY_EXISTS"
   *     - "FABRIC_E_SERVICE_GROUP_ALREADY_EXISTS"
   *     - "FABRIC_E_APPLICATION_TYPE_IN_USE"
   *     - "FABRIC_E_FABRIC_ALREADY_IN_TARGET_VERSION"
   *     - "FABRIC_E_FABRIC_VERSION_ALREADY_EXISTS"
   *     - "FABRIC_E_FABRIC_VERSION_IN_USE"
   *     - "FABRIC_E_FABRIC_UPGRADE_IN_PROGRESS"
   *     - "FABRIC_E_NAME_ALREADY_EXISTS"
   *     - "FABRIC_E_NAME_NOT_EMPTY"
   *     - "FABRIC_E_PROPERTY_CHECK_FAILED"
   *     - "FABRIC_E_SERVICE_METADATA_MISMATCH"
   *     - "FABRIC_E_SERVICE_TYPE_MISMATCH"
   *     - "FABRIC_E_HEALTH_STALE_REPORT"
   *     - "FABRIC_E_SEQUENCE_NUMBER_CHECK_FAILED"
   *     - "FABRIC_E_NODE_HAS_NOT_STOPPED_YET"
   *     - "FABRIC_E_INSTANCE_ID_MISMATCH"
   *     - "FABRIC_E_BACKUP_IN_PROGRESS"
   *     - "FABRIC_E_RESTORE_IN_PROGRESS"
   *     - "FABRIC_E_BACKUP_POLICY_ALREADY_EXISTING"
   *
   *   - Possible values of the error code for HTTP status code 413 (Request Entity Too Large)
   *     - "FABRIC_E_VALUE_TOO_LARGE"
   *
   *   - Possible values of the error code for HTTP status code 500 (Internal Server Error)
   *     - "FABRIC_E_NODE_IS_UP"
   *     - "E_FAIL"
   *     - "FABRIC_E_SINGLE_INSTANCE_APPLICATION_ALREADY_EXISTS"
   *     - "FABRIC_E_SINGLE_INSTANCE_APPLICATION_NOT_FOUND"
   *     - "FABRIC_E_VOLUME_ALREADY_EXISTS"
   *     - "FABRIC_E_VOLUME_NOT_FOUND"
   *     - "SerializationError"
   *
   *   - Possible values of the error code for HTTP status code 503 (Service Unavailable)
   *     - "FABRIC_E_NO_WRITE_QUORUM"
   *     - "FABRIC_E_NOT_PRIMARY"
   *     - "FABRIC_E_NOT_READY"
   *     - "FABRIC_E_RECONFIGURATION_PENDING"
   *     - "FABRIC_E_SERVICE_OFFLINE"
   *     - "E_ABORT"
   *     - "FABRIC_E_VALUE_TOO_LARGE"
   *
   *   - Possible values of the error code for HTTP status code 504 (Gateway Timeout)
   *     - "FABRIC_E_COMMUNICATION_ERROR"
   *     - "FABRIC_E_OPERATION_NOT_COMPLETE"
   *     - "FABRIC_E_TIMEOUT"
   */
  Code:
    | "FABRIC_E_INVALID_PARTITION_KEY"
    | "FABRIC_E_IMAGEBUILDER_VALIDATION_ERROR"
    | "FABRIC_E_INVALID_ADDRESS"
    | "FABRIC_E_APPLICATION_NOT_UPGRADING"
    | "FABRIC_E_APPLICATION_UPGRADE_VALIDATION_ERROR"
    | "FABRIC_E_FABRIC_NOT_UPGRADING"
    | "FABRIC_E_FABRIC_UPGRADE_VALIDATION_ERROR"
    | "FABRIC_E_INVALID_CONFIGURATION"
    | "FABRIC_E_INVALID_NAME_URI"
    | "FABRIC_E_PATH_TOO_LONG"
    | "FABRIC_E_KEY_TOO_LARGE"
    | "FABRIC_E_SERVICE_AFFINITY_CHAIN_NOT_SUPPORTED"
    | "FABRIC_E_INVALID_ATOMIC_GROUP"
    | "FABRIC_E_VALUE_EMPTY"
    | "FABRIC_E_NODE_NOT_FOUND"
    | "FABRIC_E_APPLICATION_TYPE_NOT_FOUND"
    | "FABRIC_E_APPLICATION_NOT_FOUND"
    | "FABRIC_E_SERVICE_TYPE_NOT_FOUND"
    | "FABRIC_E_SERVICE_DOES_NOT_EXIST"
    | "FABRIC_E_SERVICE_TYPE_TEMPLATE_NOT_FOUND"
    | "FABRIC_E_CONFIGURATION_SECTION_NOT_FOUND"
    | "FABRIC_E_PARTITION_NOT_FOUND"
    | "FABRIC_E_REPLICA_DOES_NOT_EXIST"
    | "FABRIC_E_SERVICE_GROUP_DOES_NOT_EXIST"
    | "FABRIC_E_CONFIGURATION_PARAMETER_NOT_FOUND"
    | "FABRIC_E_DIRECTORY_NOT_FOUND"
    | "FABRIC_E_FABRIC_VERSION_NOT_FOUND"
    | "FABRIC_E_FILE_NOT_FOUND"
    | "FABRIC_E_NAME_DOES_NOT_EXIST"
    | "FABRIC_E_PROPERTY_DOES_NOT_EXIST"
    | "FABRIC_E_ENUMERATION_COMPLETED"
    | "FABRIC_E_SERVICE_MANIFEST_NOT_FOUND"
    | "FABRIC_E_KEY_NOT_FOUND"
    | "FABRIC_E_HEALTH_ENTITY_NOT_FOUND"
    | "FABRIC_E_APPLICATION_TYPE_ALREADY_EXISTS"
    | "FABRIC_E_APPLICATION_ALREADY_EXISTS"
    | "FABRIC_E_APPLICATION_ALREADY_IN_TARGET_VERSION"
    | "FABRIC_E_APPLICATION_TYPE_PROVISION_IN_PROGRESS"
    | "FABRIC_E_APPLICATION_UPGRADE_IN_PROGRESS"
    | "FABRIC_E_SERVICE_ALREADY_EXISTS"
    | "FABRIC_E_SERVICE_GROUP_ALREADY_EXISTS"
    | "FABRIC_E_APPLICATION_TYPE_IN_USE"
    | "FABRIC_E_FABRIC_ALREADY_IN_TARGET_VERSION"
    | "FABRIC_E_FABRIC_VERSION_ALREADY_EXISTS"
    | "FABRIC_E_FABRIC_VERSION_IN_USE"
    | "FABRIC_E_FABRIC_UPGRADE_IN_PROGRESS"
    | "FABRIC_E_NAME_ALREADY_EXISTS"
    | "FABRIC_E_NAME_NOT_EMPTY"
    | "FABRIC_E_PROPERTY_CHECK_FAILED"
    | "FABRIC_E_SERVICE_METADATA_MISMATCH"
    | "FABRIC_E_SERVICE_TYPE_MISMATCH"
    | "FABRIC_E_HEALTH_STALE_REPORT"
    | "FABRIC_E_SEQUENCE_NUMBER_CHECK_FAILED"
    | "FABRIC_E_NODE_HAS_NOT_STOPPED_YET"
    | "FABRIC_E_INSTANCE_ID_MISMATCH"
    | "FABRIC_E_VALUE_TOO_LARGE"
    | "FABRIC_E_NO_WRITE_QUORUM"
    | "FABRIC_E_NOT_PRIMARY"
    | "FABRIC_E_NOT_READY"
    | "FABRIC_E_RECONFIGURATION_PENDING"
    | "FABRIC_E_SERVICE_OFFLINE"
    | "E_ABORT"
    | "FABRIC_E_COMMUNICATION_ERROR"
    | "FABRIC_E_OPERATION_NOT_COMPLETE"
    | "FABRIC_E_TIMEOUT"
    | "FABRIC_E_NODE_IS_UP"
    | "E_FAIL"
    | "FABRIC_E_BACKUP_IS_ENABLED"
    | "FABRIC_E_RESTORE_SOURCE_TARGET_PARTITION_MISMATCH"
    | "FABRIC_E_INVALID_FOR_STATELESS_SERVICES"
    | "FABRIC_E_BACKUP_NOT_ENABLED"
    | "FABRIC_E_BACKUP_POLICY_NOT_EXISTING"
    | "FABRIC_E_FAULT_ANALYSIS_SERVICE_NOT_EXISTING"
    | "FABRIC_E_BACKUP_IN_PROGRESS"
    | "FABRIC_E_RESTORE_IN_PROGRESS"
    | "FABRIC_E_BACKUP_POLICY_ALREADY_EXISTING"
    | "FABRIC_E_INVALID_SERVICE_SCALING_POLICY"
    | "E_INVALIDARG"
    | "FABRIC_E_SINGLE_INSTANCE_APPLICATION_ALREADY_EXISTS"
    | "FABRIC_E_SINGLE_INSTANCE_APPLICATION_NOT_FOUND"
    | "FABRIC_E_VOLUME_ALREADY_EXISTS"
    | "FABRIC_E_VOLUME_NOT_FOUND"
    | "SerializationError"
    | "FABRIC_E_IMAGEBUILDER_RESERVED_DIRECTORY_ERROR";
  /** Error message. */
  Message?: string;
}

export interface ClusterHealthOutput extends EntityHealthOutput {
  /** Cluster node health states as found in the health store. */
  NodeHealthStates?: Array<NodeHealthStateOutput>;
  /** Cluster application health states as found in the health store. */
  ApplicationHealthStates?: Array<ApplicationHealthStateOutput>;
}

export interface NodeHealthStateOutput extends EntityHealthStateOutput {
  /** The name of a Service Fabric node. */
  Name?: string;
  /** An internal ID used by Service Fabric to uniquely identify a node. Node Id is deterministically generated from node name. */
  Id?: NodeIdOutput;
}

export interface NodeIdOutput {
  /** Value of the node Id. This is a 128 bit integer. */
  Id?: string;
}

export interface EntityHealthStateOutput {
  /** The health state of a Service Fabric entity such as Cluster, Node, Application, Service, Partition, Replica etc. */
  AggregatedHealthState?: "Invalid" | "Ok" | "Warning" | "Error" | "Unknown";
}

export interface ApplicationHealthStateOutput extends EntityHealthStateOutput {
  /** The name of the application, including the 'fabric:' URI scheme. */
  Name?: string;
}

export interface EntityHealthOutput {
  /**
   * The HealthState representing the aggregated health state of the entity computed by Health Manager.
   * The health evaluation of the entity reflects all events reported on the entity and its children (if any).
   * The aggregation is done by applying the desired health policy.
   */
  AggregatedHealthState?: "Invalid" | "Ok" | "Warning" | "Error" | "Unknown";
  /** The list of health events reported on the entity. */
  HealthEvents?: Array<HealthEventOutput>;
  /** The unhealthy evaluations that show why the current aggregated health state was returned by Health Manager. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  /** Shows the health statistics for all children types of the queried entity. */
  HealthStatistics?: HealthStatisticsOutput;
}

export interface HealthEventOutput extends HealthInformationOutput {
  /** Returns true if the health event is expired, otherwise false. */
  IsExpired?: boolean;
  /** The date and time when the health report was sent by the source. */
  SourceUtcTimestamp?: string;
  /** The date and time when the health report was last modified by the health store. */
  LastModifiedUtcTimestamp?: string;
  /**
   * If the current health state is 'Ok', this property returns the time at which the health report was first reported with 'Ok'.
   * For periodic reporting, many reports with the same state may have been generated.
   * This property returns the date and time when the first 'Ok' health report was received.
   *
   * If the current health state is 'Error' or 'Warning', returns the date and time at which the health state was last in 'Ok', before transitioning to a different state.
   *
   * If the health state was never 'Ok', the value will be zero date-time.
   */
  LastOkTransitionAt?: string;
  /**
   * If the current health state is 'Warning', this property returns the time at which the health report was first reported with 'Warning'. For periodic reporting, many reports with the same state may have been generated however, this property returns only the date and time at the first 'Warning' health report was received.
   *
   * If the current health state is 'Ok' or 'Error', returns the date and time at which the health state was last in 'Warning', before transitioning to a different state.
   *
   * If the health state was never 'Warning', the value will be zero date-time.
   */
  LastWarningTransitionAt?: string;
  /**
   * If the current health state is 'Error', this property returns the time at which the health report was first reported with 'Error'. For periodic reporting, many reports with the same state may have been generated however, this property returns only the date and time at the first 'Error' health report was received.
   *
   * If the current health state is 'Ok' or 'Warning', returns the date and time at which the health state was last in 'Error', before transitioning to a different state.
   *
   * If the health state was never 'Error', the value will be zero date-time.
   */
  LastErrorTransitionAt?: string;
}

export interface HealthInformationOutput {
  /** The source name that identifies the client/watchdog/system component that generated the health information. */
  SourceId: string;
  /**
   * The property of the health information. An entity can have health reports for different properties.
   * The property is a string and not a fixed enumeration to allow the reporter flexibility to categorize the state condition that triggers the report.
   * For example, a reporter with SourceId "LocalWatchdog" can monitor the state of the available disk on a node,
   * so it can report "AvailableDisk" property on that node.
   * The same reporter can monitor the node connectivity, so it can report a property "Connectivity" on the same node.
   * In the health store, these reports are treated as separate health events for the specified node.
   *
   * Together with the SourceId, the property uniquely identifies the health information.
   */
  Property: string;
  /** The health state of a Service Fabric entity such as Cluster, Node, Application, Service, Partition, Replica etc. */
  HealthState: "Invalid" | "Ok" | "Warning" | "Error" | "Unknown";
  /**
   * The duration for which this health report is valid. This field uses ISO8601 format for specifying the duration.
   * When clients report periodically, they should send reports with higher frequency than time to live.
   * If clients report on transition, they can set the time to live to infinite.
   * When time to live expires, the health event that contains the health information
   * is either removed from health store, if RemoveWhenExpired is true, or evaluated at error, if RemoveWhenExpired false.
   *
   * If not specified, time to live defaults to infinite value.
   */
  TimeToLiveInMilliSeconds?: string;
  /**
   * The description of the health information. It represents free text used to add human readable information about the report.
   * The maximum string length for the description is 4096 characters.
   * If the provided string is longer, it will be automatically truncated.
   * When truncated, the last characters of the description contain a marker "[Truncated]", and total string size is 4096 characters.
   * The presence of the marker indicates to users that truncation occurred.
   * Note that when truncated, the description has less than 4096 characters from the original string.
   */
  Description?: string;
  /**
   * The sequence number for this health report as a numeric string.
   * The report sequence number is used by the health store to detect stale reports.
   * If not specified, a sequence number is auto-generated by the health client when a report is added.
   */
  SequenceNumber?: string;
  /**
   * Value that indicates whether the report is removed from health store when it expires.
   * If set to true, the report is removed from the health store after it expires.
   * If set to false, the report is treated as an error when expired. The value of this property is false by default.
   * When clients report periodically, they should set RemoveWhenExpired false (default).
   * This way, if the reporter has issues (e.g. deadlock) and can't report, the entity is evaluated at error when the health report expires.
   * This flags the entity as being in Error health state.
   */
  RemoveWhenExpired?: boolean;
  /**
   * A health report ID which identifies the health report and can be used to find more detailed information about a specific health event at
   * aka.ms/sfhealthid
   */
  HealthReportId?: string;
}

export interface HealthEvaluationWrapperOutput {
  /** Represents a health evaluation which describes the data and the algorithm used by health manager to evaluate the health of an entity. */
  HealthEvaluation?: HealthEvaluationOutput;
}

export interface HealthEvaluationOutputBase {
  /** The health state of a Service Fabric entity such as Cluster, Node, Application, Service, Partition, Replica etc. */
  AggregatedHealthState?: "Invalid" | "Ok" | "Warning" | "Error" | "Unknown";
  /** Description of the health evaluation, which represents a summary of the evaluation process. */
  Description?: string;
  Kind:
    | "Application"
    | "Applications"
    | "ApplicationTypeApplications"
    | "DeltaNodesCheck"
    | "DeployedApplication"
    | "DeployedApplications"
    | "DeployedServicePackage"
    | "DeployedServicePackages"
    | "Event"
    | "Node"
    | "Nodes"
    | "Partition"
    | "Partitions"
    | "Replica"
    | "Replicas"
    | "Service"
    | "Services"
    | "SystemApplication"
    | "UpgradeDomainDeltaNodesCheck"
    | "UpgradeDomainDeployedApplications"
    | "UpgradeDomainNodes"
    | "NodeTypeNodes";
}

export interface HealthStatisticsOutput {
  /** List of health state counts per entity kind, which keeps track of how many children of the queried entity are in Ok, Warning and Error state. */
  HealthStateCountList?: Array<EntityKindHealthStateCountOutput>;
}

export interface EntityKindHealthStateCountOutput {
  /** The entity kind for which health states are evaluated. */
  EntityKind?:
    | "Invalid"
    | "Node"
    | "Partition"
    | "Service"
    | "Application"
    | "Replica"
    | "DeployedApplication"
    | "DeployedServicePackage"
    | "Cluster";
  /** The health state count for the entities of the specified kind. */
  HealthStateCount?: HealthStateCountOutput;
}

export interface HealthStateCountOutput {
  /** The number of health entities with aggregated health state Ok. */
  OkCount?: number;
  /** The number of health entities with aggregated health state Warning. */
  WarningCount?: number;
  /** The number of health entities with aggregated health state Error. */
  ErrorCount?: number;
}

export interface ApplicationHealthPolicyMapItemOutput {
  /** The key of the application health policy map item. This is the name of the application. */
  Key: string;
  /** The value of the application health policy map item. This is the ApplicationHealthPolicy for this application. */
  Value: ApplicationHealthPolicyOutput;
}

export interface ApplicationHealthPolicyOutput {
  /** Indicates whether warnings are treated with the same severity as errors. */
  ConsiderWarningAsError?: boolean;
  /**
   * The maximum allowed percentage of unhealthy deployed applications. Allowed values are Byte values from zero to 100.
   * The percentage represents the maximum tolerated percentage of deployed applications that can be unhealthy before the application is considered in error.
   * This is calculated by dividing the number of unhealthy deployed applications over the number of nodes where the application is currently deployed on in the cluster.
   * The computation rounds up to tolerate one failure on small numbers of nodes. Default percentage is zero.
   */
  MaxPercentUnhealthyDeployedApplications?: number;
  /** The health policy used by default to evaluate the health of a service type. */
  DefaultServiceTypeHealthPolicy?: ServiceTypeHealthPolicyOutput;
  /** The map with service type health policy per service type name. The map is empty by default. */
  ServiceTypeHealthPolicyMap?: Array<ServiceTypeHealthPolicyMapItemOutput>;
}

export interface ServiceTypeHealthPolicyOutput {
  /**
   * The maximum allowed percentage of unhealthy partitions per service. Allowed values are Byte values from zero to 100
   *
   * The percentage represents the maximum tolerated percentage of partitions that can be unhealthy before the service is considered in error.
   * If the percentage is respected but there is at least one unhealthy partition, the health is evaluated as Warning.
   * The percentage is calculated by dividing the number of unhealthy partitions over the total number of partitions in the service.
   * The computation rounds up to tolerate one failure on small numbers of partitions. Default percentage is zero.
   */
  MaxPercentUnhealthyPartitionsPerService?: number;
  /**
   * The maximum allowed percentage of unhealthy replicas per partition. Allowed values are Byte values from zero to 100.
   *
   * The percentage represents the maximum tolerated percentage of replicas that can be unhealthy before the partition is considered in error.
   * If the percentage is respected but there is at least one unhealthy replica, the health is evaluated as Warning.
   * The percentage is calculated by dividing the number of unhealthy replicas over the total number of replicas in the partition.
   * The computation rounds up to tolerate one failure on small numbers of replicas. Default percentage is zero.
   */
  MaxPercentUnhealthyReplicasPerPartition?: number;
  /**
   * The maximum allowed percentage of unhealthy services. Allowed values are Byte values from zero to 100.
   *
   * The percentage represents the maximum tolerated percentage of services that can be unhealthy before the application is considered in error.
   * If the percentage is respected but there is at least one unhealthy service, the health is evaluated as Warning.
   * This is calculated by dividing the number of unhealthy services of the specific service type over the total number of services of the specific service type.
   * The computation rounds up to tolerate one failure on small numbers of services. Default percentage is zero.
   */
  MaxPercentUnhealthyServices?: number;
}

export interface ServiceTypeHealthPolicyMapItemOutput {
  /** The key of the service type health policy map item. This is the name of the service type. */
  Key: string;
  /** The value of the service type health policy map item. This is the ServiceTypeHealthPolicy for this service type. */
  Value: ServiceTypeHealthPolicyOutput;
}

export interface ClusterHealthPolicyOutput {
  /** Indicates whether warnings are treated with the same severity as errors. */
  ConsiderWarningAsError?: boolean;
  /**
   * The maximum allowed percentage of unhealthy nodes before reporting an error. For example, to allow 10% of nodes to be unhealthy, this value would be 10.
   *
   * The percentage represents the maximum tolerated percentage of nodes that can be unhealthy before the cluster is considered in error.
   * If the percentage is respected but there is at least one unhealthy node, the health is evaluated as Warning.
   * The percentage is calculated by dividing the number of unhealthy nodes over the total number of nodes in the cluster.
   * The computation rounds up to tolerate one failure on small numbers of nodes. Default percentage is zero.
   *
   * In large clusters, some nodes will always be down or out for repairs, so this percentage should be configured to tolerate that.
   */
  MaxPercentUnhealthyNodes?: number;
  /**
   * The maximum allowed percentage of unhealthy applications before reporting an error. For example, to allow 10% of applications to be unhealthy, this value would be 10.
   *
   * The percentage represents the maximum tolerated percentage of applications that can be unhealthy before the cluster is considered in error.
   * If the percentage is respected but there is at least one unhealthy application, the health is evaluated as Warning.
   * This is calculated by dividing the number of unhealthy applications over the total number of application instances in the cluster, excluding applications of application types that are included in the ApplicationTypeHealthPolicyMap.
   * The computation rounds up to tolerate one failure on small numbers of applications. Default percentage is zero.
   */
  MaxPercentUnhealthyApplications?: number;
  /**
   * Defines a map with max percentage unhealthy applications for specific application types.
   * Each entry specifies as key the application type name and as value an integer that represents the MaxPercentUnhealthyApplications percentage used to evaluate the applications of the specified application type.
   *
   * The application type health policy map can be used during cluster health evaluation to describe special application types.
   * The application types included in the map are evaluated against the percentage specified in the map, and not with the global MaxPercentUnhealthyApplications defined in the cluster health policy.
   * The applications of application types specified in the map are not counted against the global pool of applications.
   * For example, if some applications of a type are critical, the cluster administrator can add an entry to the map for that application type
   * and assign it a value of 0% (that is, do not tolerate any failures).
   * All other applications can be evaluated with MaxPercentUnhealthyApplications set to 20% to tolerate some failures out of the thousands of application instances.
   * The application type health policy map is used only if the cluster manifest enables application type health evaluation using the configuration entry for HealthManager/EnableApplicationTypeHealthEvaluation.
   */
  ApplicationTypeHealthPolicyMap?: Array<ApplicationTypeHealthPolicyMapItemOutput>;
  /**
   * Defines a map with max percentage unhealthy nodes for specific node types.
   * Each entry specifies as key the node type name and as value an integer that represents the MaxPercentUnhealthyNodes percentage used to evaluate the nodes of the specified node type.
   *
   * The node type health policy map can be used during cluster health evaluation to describe special node types.
   * They are evaluated against the percentages associated with their node type name in the map.
   * Setting this has no impact on the global pool of nodes used for MaxPercentUnhealthyNodes.
   * The node type health policy map is used only if the cluster manifest enables node type health evaluation using the configuration entry for HealthManager/EnableNodeTypeHealthEvaluation.
   *
   * For example, given a cluster with many nodes of different types, with important work hosted on node type "SpecialNodeType" that should not tolerate any nodes down.
   * You can specify global MaxPercentUnhealthyNodes to 20% to tolerate some failures for all nodes, but for the node type "SpecialNodeType", set the MaxPercentUnhealthyNodes to 0 by
   * setting the value in the key value pair in NodeTypeHealthPolicyMapItem. The key is the node type name.
   * This way, as long as no nodes of type "SpecialNodeType" are in Error state,
   * even if some of the many nodes in the global pool are in Error state, but below the global unhealthy percentage, the cluster would be evaluated to Warning.
   * A Warning health state does not impact cluster upgrade or other monitoring triggered by Error health state.
   * But even one node of type SpecialNodeType in Error would make cluster unhealthy (in Error rather than Warning/Ok), which triggers rollback or pauses the cluster upgrade, depending on the upgrade configuration.
   *
   * Conversely, setting the global MaxPercentUnhealthyNodes to 0, and setting SpecialNodeType's max percent unhealthy nodes to 100,
   * with one node of type SpecialNodeType in Error state would still put the cluster in an Error state, since the global restriction is more strict in this case.
   */
  NodeTypeHealthPolicyMap?: Array<NodeTypeHealthPolicyMapItemOutput>;
}

export interface ApplicationTypeHealthPolicyMapItemOutput {
  /** The key of the application type health policy map item. This is the name of the application type. */
  Key: string;
  /**
   * The value of the application type health policy map item.
   * The max percent unhealthy applications allowed for the application type. Must be between zero and 100.
   */
  Value: number;
}

export interface NodeTypeHealthPolicyMapItemOutput {
  /** The key of the node type health policy map item. This is the name of the node type. */
  Key: string;
  /**
   * The value of the node type health policy map item.
   * If the percentage is respected but there is at least one unhealthy node in the node type, the health is evaluated as Warning.
   * The percentage is calculated by dividing the number of unhealthy nodes over the total number of nodes in the node type.
   * The computation rounds up to tolerate one failure on small numbers of nodes.
   * The max percent unhealthy nodes allowed for the node type. Must be between zero and 100.
   */
  Value: number;
}

export interface ClusterHealthChunkOutput {
  /**
   * The HealthState representing the aggregated health state of the cluster computed by Health Manager.
   * The health evaluation of the entity reflects all events reported on the entity and its children (if any).
   * The aggregation is done by applying the desired cluster health policy and the application health policies.
   */
  HealthState?: "Invalid" | "Ok" | "Warning" | "Error" | "Unknown";
  /** The list of node health state chunks in the cluster that respect the filters in the cluster health chunk query description. */
  NodeHealthStateChunks?: NodeHealthStateChunkListOutput;
  /** The list of application health state chunks in the cluster that respect the filters in the cluster health chunk query description. */
  ApplicationHealthStateChunks?: ApplicationHealthStateChunkListOutput;
}

export interface NodeHealthStateChunkListOutput extends EntityHealthStateChunkListOutput {
  /** The list of node health state chunks that respect the input filters in the chunk query. */
  Items?: Array<NodeHealthStateChunkOutput>;
}

export interface NodeHealthStateChunkOutput extends EntityHealthStateChunkOutput {
  /** The name of a Service Fabric node. */
  NodeName?: string;
}

export interface EntityHealthStateChunkOutput {
  /** The health state of a Service Fabric entity such as Cluster, Node, Application, Service, Partition, Replica etc. */
  HealthState?: "Invalid" | "Ok" | "Warning" | "Error" | "Unknown";
}

export interface EntityHealthStateChunkListOutput {
  /** Total number of entity health state objects that match the specified filters from the cluster health chunk query description. */
  TotalCount?: number;
}

export interface ApplicationHealthStateChunkListOutput extends EntityHealthStateChunkListOutput {
  /** The list of application health state chunks that respect the input filters in the chunk query. */
  Items?: Array<ApplicationHealthStateChunkOutput>;
}

export interface ApplicationHealthStateChunkOutput extends EntityHealthStateChunkOutput {
  /** The name of the application, including the 'fabric:' URI scheme. */
  ApplicationName?: string;
  /** The application type name as defined in the application manifest. */
  ApplicationTypeName?: string;
  /** The list of service health state chunks in the cluster that respect the filters in the cluster health chunk query description. */
  ServiceHealthStateChunks?: ServiceHealthStateChunkListOutput;
  /** The list of deployed application health state chunks in the cluster that respect the filters in the cluster health chunk query description. */
  DeployedApplicationHealthStateChunks?: DeployedApplicationHealthStateChunkListOutput;
}

export interface ServiceHealthStateChunkListOutput {
  /** The list of service health state chunks that respect the input filters in the chunk query. */
  Items?: Array<ServiceHealthStateChunkOutput>;
}

export interface ServiceHealthStateChunkOutput extends EntityHealthStateChunkOutput {
  /** The name of the service whose health state chunk is provided in this object. */
  ServiceName?: string;
  /** The list of partition health state chunks belonging to the service that respect the filters in the cluster health chunk query description. */
  PartitionHealthStateChunks?: PartitionHealthStateChunkListOutput;
}

export interface PartitionHealthStateChunkListOutput {
  /** The list of partition health state chunks that respect the input filters in the chunk query. */
  Items?: Array<PartitionHealthStateChunkOutput>;
}

export interface PartitionHealthStateChunkOutput extends EntityHealthStateChunkOutput {
  /**
   * The Id of the partition.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
  /** The list of replica health state chunks belonging to the partition that respect the filters in the cluster health chunk query description. */
  ReplicaHealthStateChunks?: ReplicaHealthStateChunkListOutput;
}

export interface ReplicaHealthStateChunkListOutput {
  /** The list of replica health state chunks that respect the input filters in the chunk query. */
  Items?: Array<ReplicaHealthStateChunkOutput>;
}

export interface ReplicaHealthStateChunkOutput extends EntityHealthStateChunkOutput {
  /** Id of a stateful service replica or a stateless service instance. This ID is used in the queries that apply to both stateful and stateless services. It is used by Service Fabric to uniquely identify a replica of a partition of a stateful service or an instance of a stateless service partition. It is unique within a partition and does not change for the lifetime of the replica or the instance. If a stateful replica gets dropped and another replica gets created on the same node for the same partition, it will get a different value for the ID. If a stateless instance is failed over on the same or different node it will get a different value for the ID. */
  ReplicaOrInstanceId?: string;
}

export interface DeployedApplicationHealthStateChunkListOutput {
  /** The list of deployed application health state chunks that respect the input filters in the chunk query. */
  Items?: Array<DeployedApplicationHealthStateChunkOutput>;
}

export interface DeployedApplicationHealthStateChunkOutput extends EntityHealthStateChunkOutput {
  /** The name of node where the application is deployed. */
  NodeName?: string;
  /** The list of deployed service package health state chunks belonging to the deployed application that respect the filters in the cluster health chunk query description. */
  DeployedServicePackageHealthStateChunks?: DeployedServicePackageHealthStateChunkListOutput;
}

export interface DeployedServicePackageHealthStateChunkListOutput {
  /** The list of deployed service package health state chunks that respect the input filters in the chunk query. */
  Items?: Array<DeployedServicePackageHealthStateChunkOutput>;
}

export interface DeployedServicePackageHealthStateChunkOutput extends EntityHealthStateChunkOutput {
  /** The name of the service manifest. */
  ServiceManifestName?: string;
  /**
   * The ActivationId of a deployed service package. If ServicePackageActivationMode specified at the time of creating the service
   * is 'SharedProcess' (or if it is not specified, in which case it defaults to 'SharedProcess'), then value of ServicePackageActivationId
   * is always an empty string.
   */
  ServicePackageActivationId?: string;
}

export interface FabricCodeVersionInfoOutput {
  /** The product version of Service Fabric. */
  CodeVersion?: string;
}

export interface FabricConfigVersionInfoOutput {
  /** The config version of Service Fabric. */
  ConfigVersion?: string;
}

export interface ClusterUpgradeProgressObjectOutput {
  /** The ServiceFabric code version of the cluster. */
  CodeVersion?: string;
  /** The cluster configuration version (specified in the cluster manifest). */
  ConfigVersion?: string;
  /** List of upgrade domains and their statuses. */
  UpgradeDomains?: Array<UpgradeDomainInfoOutput>;
  /** The state of the upgrade domain. */
  UpgradeState?:
    | "Invalid"
    | "RollingBackInProgress"
    | "RollingBackCompleted"
    | "RollingForwardPending"
    | "RollingForwardInProgress"
    | "RollingForwardCompleted"
    | "Failed";
  /** The name of the next upgrade domain to be processed. */
  NextUpgradeDomain?: string;
  /** The mode used to monitor health during a rolling upgrade. The values are UnmonitoredAuto, UnmonitoredManual, and Monitored. */
  RollingUpgradeMode?: "Invalid" | "UnmonitoredAuto" | "UnmonitoredManual" | "Monitored";
  /** Represents a ServiceFabric cluster upgrade */
  UpgradeDescription?: ClusterUpgradeDescriptionObjectOutput;
  /** The estimated elapsed time spent processing the current overall upgrade. */
  UpgradeDurationInMilliseconds?: string;
  /** The estimated elapsed time spent processing the current upgrade domain. */
  UpgradeDomainDurationInMilliseconds?: string;
  /** List of health evaluations that resulted in the current aggregated health state. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  /** Information about the current in-progress upgrade domain. */
  CurrentUpgradeDomainProgress?: CurrentUpgradeDomainProgressInfoOutput;
  /** The start time of the upgrade in UTC. */
  StartTimestampUtc?: string;
  /** The failure time of the upgrade in UTC. */
  FailureTimestampUtc?: string;
  /** The cause of an upgrade failure that resulted in FailureAction being executed. */
  FailureReason?:
    | "None"
    | "Interrupted"
    | "HealthCheck"
    | "UpgradeDomainTimeout"
    | "OverallUpgradeTimeout";
  /** The detailed upgrade progress for nodes in the current upgrade domain at the point of failure. */
  UpgradeDomainProgressAtFailure?: FailedUpgradeDomainProgressObjectOutput;
}

export interface UpgradeDomainInfoOutput {
  /** The name of the upgrade domain */
  Name?: string;
  /** The state of the upgrade domain. */
  State?: "Invalid" | "Pending" | "InProgress" | "Completed";
}

export interface ClusterUpgradeDescriptionObjectOutput {
  /** The cluster configuration version (specified in the cluster manifest). */
  ConfigVersion?: string;
  /** The ServiceFabric code version of the cluster. */
  CodeVersion?: string;
  /** The kind of upgrade out of the following possible values. */
  UpgradeKind?: "Invalid" | "Rolling";
  /** The mode used to monitor health during a rolling upgrade. The values are UnmonitoredAuto, UnmonitoredManual, and Monitored. */
  RollingUpgradeMode?: "Invalid" | "UnmonitoredAuto" | "UnmonitoredManual" | "Monitored";
  /** The maximum amount of time to block processing of an upgrade domain and prevent loss of availability when there are unexpected issues. When this timeout expires, processing of the upgrade domain will proceed regardless of availability loss issues. The timeout is reset at the start of each upgrade domain. Valid values are between 0 and 42949672925 inclusive. (unsigned 32-bit integer). */
  UpgradeReplicaSetCheckTimeoutInSeconds?: number;
  /** If true, then processes are forcefully restarted during upgrade even when the code version has not changed (the upgrade only changes configuration or data). */
  ForceRestart?: boolean;
  /** Defines the order in which an upgrade proceeds through the cluster. */
  SortOrder?:
    | "Invalid"
    | "Default"
    | "Numeric"
    | "Lexicographical"
    | "ReverseNumeric"
    | "ReverseLexicographical";
  /** When true, enables delta health evaluation rather than absolute health evaluation after completion of each upgrade domain. */
  EnableDeltaHealthEvaluation?: boolean;
  /** Describes the parameters for monitoring an upgrade in Monitored mode. */
  MonitoringPolicy?: MonitoringPolicyDescriptionOutput;
  /** Defines a health policy used to evaluate the health of the cluster or of a cluster node. */
  ClusterHealthPolicy?: ClusterHealthPolicyOutput;
  /** Defines a health policy used to evaluate the health of the cluster during a cluster upgrade. */
  ClusterUpgradeHealthPolicy?: ClusterUpgradeHealthPolicyObjectOutput;
  /** Represents the map of application health policies for a ServiceFabric cluster upgrade */
  ApplicationHealthPolicyMap?: ApplicationHealthPolicyMapObjectOutput;
}

export interface MonitoringPolicyDescriptionOutput {
  /**
   * The compensating action to perform when a Monitored upgrade encounters monitoring policy or health policy violations.
   * Invalid indicates the failure action is invalid. Rollback specifies that the upgrade will start rolling back automatically.
   * Manual indicates that the upgrade will switch to UnmonitoredManual upgrade mode.
   */
  FailureAction?: "Invalid" | "Rollback" | "Manual";
  /** The amount of time to wait after completing an upgrade domain before applying health policies. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  HealthCheckWaitDurationInMilliseconds?: string;
  /** The amount of time that the application or cluster must remain healthy before the upgrade proceeds to the next upgrade domain. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  HealthCheckStableDurationInMilliseconds?: string;
  /** The amount of time to retry health evaluation when the application or cluster is unhealthy before FailureAction is executed. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  HealthCheckRetryTimeoutInMilliseconds?: string;
  /** The amount of time the overall upgrade has to complete before FailureAction is executed. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  UpgradeTimeoutInMilliseconds?: string;
  /** The amount of time each upgrade domain has to complete before FailureAction is executed. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  UpgradeDomainTimeoutInMilliseconds?: string;
}

export interface ClusterUpgradeHealthPolicyObjectOutput {
  /** The maximum allowed percentage of nodes health degradation allowed during cluster upgrades. The delta is measured between the state of the nodes at the beginning of upgrade and the state of the nodes at the time of the health evaluation. The check is performed after every upgrade domain upgrade completion to make sure the global state of the cluster is within tolerated limits. The default value is 10%. */
  MaxPercentDeltaUnhealthyNodes?: number;
  /** The maximum allowed percentage of upgrade domain nodes health degradation allowed during cluster upgrades. The delta is measured between the state of the upgrade domain nodes at the beginning of upgrade and the state of the upgrade domain nodes at the time of the health evaluation. The check is performed after every upgrade domain upgrade completion for all completed upgrade domains to make sure the state of the upgrade domains is within tolerated limits. The default value is 15%. */
  MaxPercentUpgradeDomainDeltaUnhealthyNodes?: number;
}

export interface ApplicationHealthPolicyMapObjectOutput {
  /**
   * Defines a map that contains specific application health policies for different applications.
   * Each entry specifies as key the application name and as value an ApplicationHealthPolicy used to evaluate the application health.
   * If an application is not specified in the map, the application health evaluation uses the ApplicationHealthPolicy found in its application manifest or the default application health policy (if no health policy is defined in the manifest).
   * The map is empty by default.
   */
  ApplicationHealthPolicyMap?: Array<ApplicationHealthPolicyMapItemOutput>;
}

export interface CurrentUpgradeDomainProgressInfoOutput {
  /** The name of the upgrade domain */
  DomainName?: string;
  /** List of upgrading nodes and their statuses */
  NodeUpgradeProgressList?: Array<NodeUpgradeProgressInfoOutput>;
}

export interface NodeUpgradeProgressInfoOutput {
  /** The name of a Service Fabric node. */
  NodeName?: string;
  /** The state of the upgrading node. */
  UpgradePhase?: "Invalid" | "PreUpgradeSafetyCheck" | "Upgrading" | "PostUpgradeSafetyCheck";
  /** List of pending safety checks */
  PendingSafetyChecks?: Array<SafetyCheckWrapperOutput>;
}

export interface SafetyCheckWrapperOutput {
  /** Represents a safety check performed by service fabric before continuing with the operations. These checks ensure the availability of the service and the reliability of the state. */
  SafetyCheck?: SafetyCheckOutput;
}

export interface SafetyCheckOutputBase {
  Kind:
    | "PartitionSafetyCheck"
    | "EnsureAvailability"
    | "EnsurePartitionQuorum"
    | "EnsureSeedNodeQuorum"
    | "WaitForInbuildReplica"
    | "WaitForPrimaryPlacement"
    | "WaitForPrimarySwap"
    | "WaitForReconfiguration";
}

export interface FailedUpgradeDomainProgressObjectOutput {
  /** The name of the upgrade domain */
  DomainName?: string;
  /** List of upgrading nodes and their statuses */
  NodeUpgradeProgressList?: Array<NodeUpgradeProgressInfoOutput>;
}

export interface ClusterConfigurationOutput {
  /** The contents of the cluster configuration file. */
  ClusterConfiguration?: string;
}

export interface ClusterConfigurationUpgradeStatusInfoOutput {
  /** The state of the upgrade domain. */
  UpgradeState?:
    | "Invalid"
    | "RollingBackInProgress"
    | "RollingBackCompleted"
    | "RollingForwardPending"
    | "RollingForwardInProgress"
    | "RollingForwardCompleted"
    | "Failed";
  /** The cluster manifest version. */
  ProgressStatus?: number;
  /** The cluster configuration version. */
  ConfigVersion?: string;
  /** The cluster upgrade status details. */
  Details?: string;
}

export interface UpgradeOrchestrationServiceStateOutput {
  /** The state of Service Fabric Upgrade Orchestration Service. */
  ServiceState?: string;
}

export interface UpgradeOrchestrationServiceStateSummaryOutput {
  /** The current code version of the cluster. */
  CurrentCodeVersion?: string;
  /** The current manifest version of the cluster. */
  CurrentManifestVersion?: string;
  /** The target code version of  the cluster. */
  TargetCodeVersion?: string;
  /** The target manifest version of the cluster. */
  TargetManifestVersion?: string;
  /** The type of the pending upgrade of the cluster. */
  PendingUpgradeType?: string;
}

export interface AadMetadataObjectOutput {
  /** The client authentication method. */
  type?: string;
  /** Azure Active Directory metadata used for secured connection to cluster. */
  metadata?: AadMetadataOutput;
}

export interface AadMetadataOutput {
  /** The AAD authority url. */
  authority?: string;
  /** The AAD client application Id. */
  client?: string;
  /** The AAD cluster application Id. */
  cluster?: string;
  /** The AAD login url. */
  login?: string;
  /** The client application redirect address. */
  redirect?: string;
  /** The AAD tenant Id. */
  tenant?: string;
}

export interface ClusterVersionOutput {
  /** The Service Fabric cluster runtime version. */
  Version?: string;
}

export interface ClusterLoadInfoOutput {
  /** The starting time of last resource balancing run. */
  LastBalancingStartTimeUtc?: string;
  /** The end time of last resource balancing run. */
  LastBalancingEndTimeUtc?: string;
  /** List that contains metrics and their load information in this cluster. */
  LoadMetricInformation?: Array<LoadMetricInformationOutput>;
}

export interface LoadMetricInformationOutput {
  /** Name of the metric for which this load information is provided. */
  Name?: string;
  /** Value that indicates whether the metrics is balanced or not before resource balancer run */
  IsBalancedBefore?: boolean;
  /** Value that indicates whether the metrics is balanced or not after resource balancer run. */
  IsBalancedAfter?: boolean;
  /** The standard average deviation of the metrics before resource balancer run. */
  DeviationBefore?: string;
  /** The standard average deviation of the metrics after resource balancer run. */
  DeviationAfter?: string;
  /** The balancing threshold for a certain metric. */
  BalancingThreshold?: string;
  /** The current action being taken with regard to this metric */
  Action?: string;
  /** The Activity Threshold specified for this metric in the system Cluster Manifest. */
  ActivityThreshold?: string;
  /** The total cluster capacity for a given metric */
  ClusterCapacity?: string;
  /** The total cluster load. In future releases of Service Fabric this parameter will be deprecated in favor of CurrentClusterLoad. */
  ClusterLoad?: string;
  /** The total cluster load. */
  CurrentClusterLoad?: string;
  /** The remaining capacity for the metric in the cluster. In future releases of Service Fabric this parameter will be deprecated in favor of ClusterCapacityRemaining. */
  ClusterRemainingCapacity?: string;
  /** The remaining capacity for the metric in the cluster. */
  ClusterCapacityRemaining?: string;
  /** Indicates that the metric is currently over capacity in the cluster. */
  IsClusterCapacityViolation?: boolean;
  /** The reserved percentage of total node capacity for this metric. */
  NodeBufferPercentage?: string;
  /** Remaining capacity in the cluster excluding the reserved space. In future releases of Service Fabric this parameter will be deprecated in favor of BufferedClusterCapacityRemaining. */
  ClusterBufferedCapacity?: string;
  /** Remaining capacity in the cluster excluding the reserved space. */
  BufferedClusterCapacityRemaining?: string;
  /** The remaining percentage of cluster total capacity for this metric. */
  ClusterRemainingBufferedCapacity?: string;
  /** The minimum load on any node for this metric. In future releases of Service Fabric this parameter will be deprecated in favor of MinimumNodeLoad. */
  MinNodeLoadValue?: string;
  /** The minimum load on any node for this metric. */
  MinimumNodeLoad?: string;
  /** The node id of the node with the minimum load for this metric. */
  MinNodeLoadNodeId?: NodeIdOutput;
  /** The maximum load on any node for this metric. In future releases of Service Fabric this parameter will be deprecated in favor of MaximumNodeLoad. */
  MaxNodeLoadValue?: string;
  /** The maximum load on any node for this metric. */
  MaximumNodeLoad?: string;
  /** The node id of the node with the maximum load for this metric. */
  MaxNodeLoadNodeId?: NodeIdOutput;
  /**
   * This value represents the load of the replicas that are planned to be removed in the future within the cluster.
   * This kind of load is reported for replicas that are currently being moving to other nodes and for replicas that are currently being dropped but still use the load on the source node.
   */
  PlannedLoadRemoval?: string;
}

export interface PagedNodeInfoListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** List of node information. */
  Items?: Array<NodeInfoOutput>;
}

export interface NodeInfoOutput {
  /** The name of a Service Fabric node. */
  Name?: string;
  /** The IP address or fully qualified domain name of the node. */
  IpAddressOrFQDN?: string;
  /** The type of the node. */
  Type?: string;
  /** The version of Service Fabric binaries that the node is running. */
  CodeVersion?: string;
  /** The version of Service Fabric cluster manifest that the node is using. */
  ConfigVersion?: string;
  /** The status of the node. */
  NodeStatus?:
    | "Invalid"
    | "Up"
    | "Down"
    | "Enabling"
    | "Disabling"
    | "Disabled"
    | "Unknown"
    | "Removed";
  /** Time in seconds since the node has been in NodeStatus Up. Value zero indicates that the node is not Up. */
  NodeUpTimeInSeconds?: string;
  /** The health state of a Service Fabric entity such as Cluster, Node, Application, Service, Partition, Replica etc. */
  HealthState?: "Invalid" | "Ok" | "Warning" | "Error" | "Unknown";
  /** Indicates if the node is a seed node or not. Returns true if the node is a seed node, otherwise false. A quorum of seed nodes are required for proper operation of Service Fabric cluster. */
  IsSeedNode?: boolean;
  /** The upgrade domain of the node. */
  UpgradeDomain?: string;
  /** The fault domain of the node. */
  FaultDomain?: string;
  /** An internal ID used by Service Fabric to uniquely identify a node. Node Id is deterministically generated from node name. */
  Id?: NodeIdOutput;
  /** The ID representing the node instance. While the ID of the node is deterministically generated from the node name and remains same across restarts, the InstanceId changes every time node restarts. */
  InstanceId?: string;
  /** Information about the node deactivation. This information is valid for a node that is undergoing deactivation or has already been deactivated. */
  NodeDeactivationInfo?: NodeDeactivationInfoOutput;
  /** Indicates if the node is stopped by calling stop node API or not. Returns true if the node is stopped, otherwise false. */
  IsStopped?: boolean;
  /** Time in seconds since the node has been in NodeStatus Down. Value zero indicates node is not NodeStatus Down. */
  NodeDownTimeInSeconds?: string;
  /** Date time in UTC when the node came up. If the node has never been up then this value will be zero date time. */
  NodeUpAt?: string;
  /** Date time in UTC when the node went down. If node has never been down then this value will be zero date time. */
  NodeDownAt?: string;
  /** List that contains tags, which will be applied to the nodes. */
  NodeTags?: Array<string>;
}

export interface NodeDeactivationInfoOutput {
  /** The intent or the reason for deactivating the node. Following are the possible values for it. */
  NodeDeactivationIntent?: "Invalid" | "Pause" | "Restart" | "RemoveData" | "RemoveNode";
  /** The status of node deactivation operation. Following are the possible values. */
  NodeDeactivationStatus?: "None" | "SafetyCheckInProgress" | "SafetyCheckComplete" | "Completed";
  /** List of tasks representing the deactivation operation on the node. */
  NodeDeactivationTask?: Array<NodeDeactivationTaskOutput>;
  /** List of pending safety checks */
  PendingSafetyChecks?: Array<SafetyCheckWrapperOutput>;
}

export interface NodeDeactivationTaskOutput {
  /** Identity of the task related to deactivation operation on the node. */
  NodeDeactivationTaskId?: NodeDeactivationTaskIdOutput;
  /** The intent or the reason for deactivating the node. Following are the possible values for it. */
  NodeDeactivationIntent?: "Invalid" | "Pause" | "Restart" | "RemoveData" | "RemoveNode";
}

export interface NodeDeactivationTaskIdOutput {
  /** Value of the task id. */
  Id?: string;
  /** The type of the task that performed the node deactivation. Following are the possible values. */
  NodeDeactivationTaskType?: "Invalid" | "Infrastructure" | "Repair" | "Client";
}

export interface NodeHealthOutput extends EntityHealthOutput {
  /** Name of the node whose health information is described by this object. */
  Name?: string;
}

export interface NodeLoadInfoOutput {
  /** Name of the node for which the load information is provided by this object. */
  NodeName?: string;
  /** List that contains metrics and their load information on this node. */
  NodeLoadMetricInformation?: Array<NodeLoadMetricInformationOutput>;
}

export interface NodeLoadMetricInformationOutput {
  /** Name of the metric for which this load information is provided. */
  Name?: string;
  /** Total capacity on the node for this metric. */
  NodeCapacity?: string;
  /** Current load on the node for this metric. In future releases of Service Fabric this parameter will be deprecated in favor of CurrentNodeLoad. */
  NodeLoad?: string;
  /** The remaining capacity on the node for this metric. In future releases of Service Fabric this parameter will be deprecated in favor of NodeCapacityRemaining. */
  NodeRemainingCapacity?: string;
  /** Indicates if there is a capacity violation for this metric on the node. */
  IsCapacityViolation?: boolean;
  /** The value that indicates the reserved capacity for this metric on the node. */
  NodeBufferedCapacity?: string;
  /** The remaining reserved capacity for this metric on the node. In future releases of Service Fabric this parameter will be deprecated in favor of BufferedNodeCapacityRemaining. */
  NodeRemainingBufferedCapacity?: string;
  /** Current load on the node for this metric. */
  CurrentNodeLoad?: string;
  /** The remaining capacity on the node for the metric. */
  NodeCapacityRemaining?: string;
  /** The remaining capacity which is not reserved by NodeBufferPercentage for this metric on the node. */
  BufferedNodeCapacityRemaining?: string;
  /**
   * This value represents the load of the replicas that are planned to be removed in the future.
   * This kind of load is reported for replicas that are currently being moving to other nodes and for replicas that are currently being dropped but still use the load on the source node.
   */
  PlannedNodeLoadRemoval?: string;
}

export interface ConfigParameterOverrideOutput {
  /** Name of the section for the parameter override. */
  SectionName: string;
  /** Name of the parameter that has been overridden. */
  ParameterName: string;
  /** Value of the overridden parameter. */
  ParameterValue: string;
  /** The duration until config override is considered as valid. */
  Timeout?: string;
  /** A value that indicates whether config override will be removed on upgrade or will still be considered as valid. */
  PersistAcrossUpgrade?: boolean;
}

export interface PagedApplicationTypeInfoListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** List of application type information. */
  Items?: Array<ApplicationTypeInfoOutput>;
}

export interface ApplicationTypeInfoOutput {
  /** The application type name as defined in the application manifest. */
  Name?: string;
  /** The version of the application type as defined in the application manifest. */
  Version?: string;
  /** List of application type parameters that can be overridden when creating or updating the application. */
  DefaultParameterList?: Array<ApplicationParameterOutput>;
  /** The status of the application type. */
  Status?: "Invalid" | "Provisioning" | "Available" | "Unprovisioning" | "Failed";
  /** Additional detailed information about the status of the application type. */
  StatusDetails?: string;
  /** The mechanism used to define a Service Fabric application type. */
  ApplicationTypeDefinitionKind?: "Invalid" | "ServiceFabricApplicationPackage" | "Compose";
}

export interface ApplicationParameterOutput {
  /** The name of the parameter. */
  Key: string;
  /** The value of the parameter. */
  Value: string;
}

export interface ServiceTypeInfoOutput {
  /** Describes a service type defined in the service manifest of a provisioned application type. The properties the ones defined in the service manifest. */
  ServiceTypeDescription?: ServiceTypeDescriptionOutput;
  /** The name of the service manifest in which this service type is defined. */
  ServiceManifestName?: string;
  /** The version of the service manifest in which this service type is defined. */
  ServiceManifestVersion?: string;
  /** Indicates whether the service is a service group. If it is, the property value is true otherwise false. */
  IsServiceGroup?: boolean;
}

export interface ServiceTypeDescriptionOutputBase {
  /** Indicates whether the service type is a stateful service type or a stateless service type. This property is true if the service type is a stateful service type, false otherwise. */
  IsStateful?: boolean;
  /** Name of the service type as specified in the service manifest. */
  ServiceTypeName?: string;
  /** The placement constraint to be used when instantiating this service in a Service Fabric cluster. */
  PlacementConstraints?: string;
  /** The service load metrics is given as an array of ServiceLoadMetricDescription objects. */
  LoadMetrics?: Array<ServiceLoadMetricDescriptionOutput>;
  /** List of service placement policy descriptions. */
  ServicePlacementPolicies?: Array<ServicePlacementPolicyDescriptionOutput>;
  /** List of service type extensions. */
  Extensions?: Array<ServiceTypeExtensionDescriptionOutput>;
  Kind: "Stateful" | "Stateless";
}

export interface ServiceLoadMetricDescriptionOutput {
  /** The name of the metric. If the service chooses to report load during runtime, the load metric name should match the name that is specified in Name exactly. Note that metric names are case-sensitive. */
  Name: string;
  /** The service load metric relative weight, compared to other metrics configured for this service, as a number. */
  Weight?: "Zero" | "Low" | "Medium" | "High";
  /** Used only for Stateful services. The default amount of load, as a number, that this service creates for this metric when it is a Primary replica. */
  PrimaryDefaultLoad?: number;
  /** Used only for Stateful services. The default amount of load, as a number, that this service creates for this metric when it is a Secondary replica. */
  SecondaryDefaultLoad?: number;
  /** Used only for Stateful services. The default amount of load, as a number, that this service creates for this metric when it is an Auxiliary replica. */
  AuxiliaryDefaultLoad?: number;
  /** Used only for Stateless services. The default amount of load, as a number, that this service creates for this metric. */
  DefaultLoad?: number;
}

export interface ServicePlacementPolicyDescriptionOutputBase {
  Type:
    | "InvalidDomain"
    | "NonPartiallyPlaceService"
    | "AllowMultipleStatelessInstancesOnNode"
    | "PreferPrimaryDomain"
    | "RequireDomain"
    | "RequireDomainDistribution";
}

export interface ServiceTypeExtensionDescriptionOutput {
  /** The name of the extension. */
  Key?: string;
  /** The extension value. */
  Value?: string;
}

export interface ServiceTypeManifestOutput {
  /** The XML manifest as a string. */
  Manifest?: string;
}

export interface DeployedServiceTypeInfoOutput {
  /** Name of the service type as specified in the service manifest. */
  ServiceTypeName?: string;
  /** The name of the service manifest in which this service type is defined. */
  ServiceManifestName?: string;
  /** The name of the code package that registered the service type. */
  CodePackageName?: string;
  /** The status of the service type registration on the node. */
  Status?: "Invalid" | "Disabled" | "Enabled" | "Registered";
  /**
   * The ActivationId of a deployed service package. If ServicePackageActivationMode specified at the time of creating the service
   * is 'SharedProcess' (or if it is not specified, in which case it defaults to 'SharedProcess'), then value of ServicePackageActivationId
   * is always an empty string.
   */
  ServicePackageActivationId?: string;
}

export interface ManagedApplicationIdentityDescriptionOutput {
  /** Token service endpoint. */
  TokenServiceEndpoint?: string;
  /** A list of managed application identity objects. */
  ManagedIdentities?: Array<ManagedApplicationIdentityOutput>;
}

export interface ManagedApplicationIdentityOutput {
  /** The name of the identity. */
  Name: string;
  /** The identity's PrincipalId. */
  PrincipalId?: string;
}

export interface ApplicationLoadInfoOutput {
  /**
   * The identity of the application. This is an encoded representation of the application name. This is used in the REST APIs to identify the application resource.
   * Starting in version 6.0, hierarchical names are delimited with the "\~" character. For example, if the application name is "fabric:/myapp/app1",
   * the application identity would be "myapp\~app1" in 6.0+ and "myapp/app1" in previous versions.
   */
  Id?: string;
  /**
   * The minimum number of nodes for this application.
   * It is the number of nodes where Service Fabric will reserve Capacity in the cluster which equals to ReservedLoad * MinimumNodes for this Application instance.
   * For applications that do not have application capacity defined this value will be zero.
   */
  MinimumNodes?: number;
  /**
   * The maximum number of nodes where this application can be instantiated.
   * It is the number of nodes this application is allowed to span.
   * For applications that do not have application capacity defined this value will be zero.
   */
  MaximumNodes?: number;
  /**
   * The number of nodes on which this application is instantiated.
   * For applications that do not have application capacity defined this value will be zero.
   */
  NodeCount?: number;
  /** List of application load metric information. */
  ApplicationLoadMetricInformation?: Array<ApplicationLoadMetricInformationOutput>;
}

export interface ApplicationLoadMetricInformationOutput {
  /** The name of the metric. */
  Name?: string;
  /**
   * This is the capacity reserved in the cluster for the application.
   * It's the product of NodeReservationCapacity and MinimumNodes.
   * If set to zero, no capacity is reserved for this metric.
   * When setting application capacity or when updating application capacity this value must be smaller than or equal to MaximumCapacity for each metric.
   */
  ReservationCapacity?: number;
  /** Total capacity for this metric in this application instance. */
  ApplicationCapacity?: number;
  /** Current load for this metric in this application instance. */
  ApplicationLoad?: number;
}

export interface PagedApplicationInfoListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** List of application information. */
  Items?: Array<ApplicationInfoOutput>;
}

export interface ApplicationInfoOutput {
  /**
   * The identity of the application. This is an encoded representation of the application name. This is used in the REST APIs to identify the application resource.
   * Starting in version 6.0, hierarchical names are delimited with the "\~" character. For example, if the application name is "fabric:/myapp/app1",
   * the application identity would be "myapp\~app1" in 6.0+ and "myapp/app1" in previous versions.
   */
  Id?: string;
  /** The name of the application, including the 'fabric:' URI scheme. */
  Name?: string;
  /** The application type name as defined in the application manifest. */
  TypeName?: string;
  /** The version of the application type as defined in the application manifest. */
  TypeVersion?: string;
  /** The status of the application. */
  Status?: "Invalid" | "Ready" | "Upgrading" | "Creating" | "Deleting" | "Failed";
  /** List of application parameters with overridden values from their default values specified in the application manifest. */
  Parameters?: Array<ApplicationParameterOutput>;
  /** The health state of a Service Fabric entity such as Cluster, Node, Application, Service, Partition, Replica etc. */
  HealthState?: "Invalid" | "Ok" | "Warning" | "Error" | "Unknown";
  /** The mechanism used to define a Service Fabric application. */
  ApplicationDefinitionKind?: "Invalid" | "ServiceFabricApplicationDescription" | "Compose";
  /** Managed application identity description. */
  ManagedApplicationIdentity?: ManagedApplicationIdentityDescriptionOutput;
}

export interface ApplicationHealthOutput extends EntityHealthOutput {
  /** The name of the application, including the 'fabric:' URI scheme. */
  Name?: string;
  /** Service health states as found in the health store. */
  ServiceHealthStates?: Array<ServiceHealthStateOutput>;
  /** Deployed application health states as found in the health store. */
  DeployedApplicationHealthStates?: Array<DeployedApplicationHealthStateOutput>;
}

export interface ServiceHealthStateOutput extends EntityHealthStateOutput {
  /** Name of the service whose health state is represented by this object. */
  ServiceName?: string;
}

export interface DeployedApplicationHealthStateOutput extends EntityHealthStateOutput {
  /** Name of the node on which the service package is deployed. */
  NodeName?: string;
  /** The name of the application, including the 'fabric:' URI scheme. */
  ApplicationName?: string;
}

export interface ApplicationUpgradeDescriptionOutput {
  /** The name of the target application, including the 'fabric:' URI scheme. */
  Name: string;
  /** The target application type version (found in the application manifest) for the application upgrade. */
  TargetApplicationTypeVersion: string;
  /** List of application parameters with overridden values from their default values specified in the application manifest. */
  Parameters?: Array<ApplicationParameterOutput>;
  /** The kind of upgrade out of the following possible values. */
  UpgradeKind: "Invalid" | "Rolling";
  /** The mode used to monitor health during a rolling upgrade. The values are UnmonitoredAuto, UnmonitoredManual, and Monitored. */
  RollingUpgradeMode?: "Invalid" | "UnmonitoredAuto" | "UnmonitoredManual" | "Monitored";
  /** The maximum amount of time to block processing of an upgrade domain and prevent loss of availability when there are unexpected issues. When this timeout expires, processing of the upgrade domain will proceed regardless of availability loss issues. The timeout is reset at the start of each upgrade domain. Valid values are between 0 and 42949672925 inclusive. (unsigned 32-bit integer). */
  UpgradeReplicaSetCheckTimeoutInSeconds?: number;
  /** If true, then processes are forcefully restarted during upgrade even when the code version has not changed (the upgrade only changes configuration or data). */
  ForceRestart?: boolean;
  /** Defines the order in which an upgrade proceeds through the cluster. */
  SortOrder?:
    | "Invalid"
    | "Default"
    | "Numeric"
    | "Lexicographical"
    | "ReverseNumeric"
    | "ReverseLexicographical";
  /** Describes the parameters for monitoring an upgrade in Monitored mode. */
  MonitoringPolicy?: MonitoringPolicyDescriptionOutput;
  /** Defines a health policy used to evaluate the health of an application or one of its children entities. */
  ApplicationHealthPolicy?: ApplicationHealthPolicyOutput;
  /**
   * Duration in seconds, to wait before a stateless instance is closed, to allow the active requests to drain gracefully. This would be effective when the instance is closing during the application/cluster
   * upgrade, only for those instances which have a non-zero delay duration configured in the service description. See InstanceCloseDelayDurationSeconds property in $ref: "#/definitions/StatelessServiceDescription.yaml" for details.
   * Note, the default value of InstanceCloseDelayDurationInSeconds is 4294967295, which indicates that the behavior will entirely depend on the delay configured in the stateless service description.
   */
  InstanceCloseDelayDurationInSeconds?: number;
  /** Managed application identity description. */
  ManagedApplicationIdentity?: ManagedApplicationIdentityDescriptionOutput;
}

export interface ApplicationUpgradeProgressInfoOutput {
  /** The name of the target application, including the 'fabric:' URI scheme. */
  Name?: string;
  /** The application type name as defined in the application manifest. */
  TypeName?: string;
  /** The target application type version (found in the application manifest) for the application upgrade. */
  TargetApplicationTypeVersion?: string;
  /** List of upgrade domains and their statuses. */
  UpgradeDomains?: Array<UpgradeDomainInfoOutput>;
  /** The state of the upgrade domain. */
  UpgradeState?:
    | "Invalid"
    | "RollingBackInProgress"
    | "RollingBackCompleted"
    | "RollingForwardPending"
    | "RollingForwardInProgress"
    | "RollingForwardCompleted"
    | "Failed";
  /** The name of the next upgrade domain to be processed. */
  NextUpgradeDomain?: string;
  /** The mode used to monitor health during a rolling upgrade. The values are UnmonitoredAuto, UnmonitoredManual, and Monitored. */
  RollingUpgradeMode?: "Invalid" | "UnmonitoredAuto" | "UnmonitoredManual" | "Monitored";
  /** Describes the parameters for an application upgrade. Note that upgrade description replaces the existing application description. This means that if the parameters are not specified, the existing parameters on the applications will be overwritten with the empty parameters list. This would result in the application using the default value of the parameters from the application manifest. If you do not want to change any existing parameter values, please get the application parameters first using the GetApplicationInfo query and then supply those values as Parameters in this ApplicationUpgradeDescription. */
  UpgradeDescription?: ApplicationUpgradeDescriptionOutput;
  /** The estimated total amount of time spent processing the overall upgrade. */
  UpgradeDurationInMilliseconds?: string;
  /** The estimated total amount of time spent processing the current upgrade domain. */
  UpgradeDomainDurationInMilliseconds?: string;
  /** List of health evaluations that resulted in the current aggregated health state. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  /** Information about the current in-progress upgrade domain. */
  CurrentUpgradeDomainProgress?: CurrentUpgradeDomainProgressInfoOutput;
  /** The estimated UTC datetime when the upgrade started. */
  StartTimestampUtc?: string;
  /** The estimated UTC datetime when the upgrade failed and FailureAction was executed. */
  FailureTimestampUtc?: string;
  /** The cause of an upgrade failure that resulted in FailureAction being executed. */
  FailureReason?:
    | "None"
    | "Interrupted"
    | "HealthCheck"
    | "UpgradeDomainTimeout"
    | "OverallUpgradeTimeout";
  /** Information about the upgrade domain progress at the time of upgrade failure. */
  UpgradeDomainProgressAtFailure?: FailureUpgradeDomainProgressInfoOutput;
  /** Additional detailed information about the status of the pending upgrade. */
  UpgradeStatusDetails?: string;
}

export interface FailureUpgradeDomainProgressInfoOutput {
  /** The name of the upgrade domain */
  DomainName?: string;
  /** List of upgrading nodes and their statuses */
  NodeUpgradeProgressList?: Array<NodeUpgradeProgressInfoOutput>;
}

export interface PagedDeployedApplicationInfoListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** List of deployed application information. */
  Items?: Array<DeployedApplicationInfoOutput>;
}

export interface DeployedApplicationInfoOutput {
  /**
   * The identity of the application. This is an encoded representation of the application name. This is used in the REST APIs to identify the application resource.
   * Starting in version 6.0, hierarchical names are delimited with the "\~" character. For example, if the application name is "fabric:/myapp/app1",
   * the application identity would be "myapp\~app1" in 6.0+ and "myapp/app1" in previous versions.
   */
  Id?: string;
  /** The name of the application, including the 'fabric:' URI scheme. */
  Name?: string;
  /** The application type name as defined in the application manifest. */
  TypeName?: string;
  /** The status of the application deployed on the node. Following are the possible values. */
  Status?: "Invalid" | "Downloading" | "Activating" | "Active" | "Upgrading" | "Deactivating";
  /** The work directory of the application on the node. The work directory can be used to store application data. */
  WorkDirectory?: string;
  /** The log directory of the application on the node. The log directory can be used to store application logs. */
  LogDirectory?: string;
  /** The temp directory of the application on the node. The code packages belonging to the application are forked with this directory set as their temporary directory. */
  TempDirectory?: string;
  /** The health state of a Service Fabric entity such as Cluster, Node, Application, Service, Partition, Replica etc. */
  HealthState?: "Invalid" | "Ok" | "Warning" | "Error" | "Unknown";
}

export interface DeployedApplicationHealthOutput extends EntityHealthOutput {
  /** Name of the application deployed on the node whose health information is described by this object. */
  Name?: string;
  /** Name of the node where this application is deployed. */
  NodeName?: string;
  /** Deployed service package health states for the current deployed application as found in the health store. */
  DeployedServicePackageHealthStates?: Array<DeployedServicePackageHealthStateOutput>;
}

export interface DeployedServicePackageHealthStateOutput extends EntityHealthStateOutput {
  /** Name of the node on which the service package is deployed. */
  NodeName?: string;
  /** The name of the application, including the 'fabric:' URI scheme. */
  ApplicationName?: string;
  /** Name of the manifest describing the service package. */
  ServiceManifestName?: string;
  /**
   * The ActivationId of a deployed service package. If ServicePackageActivationMode specified at the time of creating the service
   * is 'SharedProcess' (or if it is not specified, in which case it defaults to 'SharedProcess'), then value of ServicePackageActivationId
   * is always an empty string.
   */
  ServicePackageActivationId?: string;
}

export interface ApplicationTypeManifestOutput {
  /** The XML manifest as a string. */
  Manifest?: string;
}

export interface PagedServiceInfoListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** List of service information. */
  Items?: Array<ServiceInfoOutput>;
}

export interface ServiceInfoOutputBase {
  /**
   * The identity of the service. This ID is an encoded representation of the service name. This is used in the REST APIs to identify the service resource.
   * Starting in version 6.0, hierarchical names are delimited with the "\~" character. For example, if the service name is "fabric:/myapp/app1/svc1",
   * the service identity would be "myapp~app1\~svc1" in 6.0+ and "myapp/app1/svc1" in previous versions.
   */
  Id?: string;
  /** The full name of the service with 'fabric:' URI scheme. */
  Name?: string;
  /** Name of the service type as specified in the service manifest. */
  TypeName?: string;
  /** The version of the service manifest. */
  ManifestVersion?: string;
  /** The health state of a Service Fabric entity such as Cluster, Node, Application, Service, Partition, Replica etc. */
  HealthState?: "Invalid" | "Ok" | "Warning" | "Error" | "Unknown";
  /** The status of the application. */
  ServiceStatus?: "Unknown" | "Active" | "Upgrading" | "Deleting" | "Creating" | "Failed";
  /** Whether the service is in a service group. */
  IsServiceGroup?: boolean;
  ServiceKind: "Stateful" | "Stateless";
}

export interface ApplicationNameInfoOutput {
  /**
   * The identity of the application. This is an encoded representation of the application name. This is used in the REST APIs to identify the application resource.
   * Starting in version 6.0, hierarchical names are delimited with the "\~" character. For example, if the application name is "fabric:/myapp/app1",
   * the application identity would be "myapp\~app1" in 6.0+ and "myapp/app1" in previous versions.
   */
  Id?: string;
  /** The name of the application, including the 'fabric:' URI scheme. */
  Name?: string;
}

export interface ServiceDescriptionOutputBase {
  /** The name of the application, including the 'fabric:' URI scheme. */
  ApplicationName?: string;
  /** The full name of the service with 'fabric:' URI scheme. */
  ServiceName: string;
  /** Name of the service type as specified in the service manifest. */
  ServiceTypeName: string;
  /** The initialization data as an array of bytes. Initialization data is passed to service instances or replicas when they are created. */
  InitializationData?: Array<number>;
  /** The partition description as an object. */
  PartitionDescription: PartitionSchemeDescriptionOutput;
  /** The placement constraints as a string. Placement constraints are boolean expressions on node properties and allow for restricting a service to particular nodes based on the service requirements. For example, to place a service on nodes where NodeType is blue specify the following: "NodeColor == blue)". */
  PlacementConstraints?: string;
  /** The correlation scheme. */
  CorrelationScheme?: Array<ServiceCorrelationDescriptionOutput>;
  /** The service load metrics. */
  ServiceLoadMetrics?: Array<ServiceLoadMetricDescriptionOutput>;
  /** The service placement policies. */
  ServicePlacementPolicies?: Array<ServicePlacementPolicyDescriptionOutput>;
  /** The move cost for the service. */
  DefaultMoveCost?: "Zero" | "Low" | "Medium" | "High" | "VeryHigh";
  /** Indicates if the DefaultMoveCost property is specified. */
  IsDefaultMoveCostSpecified?: boolean;
  /** The activation mode of service package to be used for a service. */
  ServicePackageActivationMode?: "SharedProcess" | "ExclusiveProcess";
  /** The DNS name of the service. It requires the DNS system service to be enabled in Service Fabric cluster. */
  ServiceDnsName?: string;
  /** Scaling policies for this service. */
  ScalingPolicies?: Array<ScalingPolicyDescriptionOutput>;
  /** Tags for placement of this service. */
  TagsRequiredToPlace?: NodeTagsDescriptionOutput;
  /** Tags for running of this service. */
  TagsRequiredToRun?: NodeTagsDescriptionOutput;
  ServiceKind: "Stateful" | "Stateless";
}

export interface PartitionSchemeDescriptionOutputBase {
  PartitionScheme: "Named" | "Singleton" | "UniformInt64Range";
}

export interface ServiceCorrelationDescriptionOutput {
  /** The ServiceCorrelationScheme which describes the relationship between this service and the service specified via ServiceName. */
  Scheme: "Invalid" | "Affinity" | "AlignedAffinity" | "NonAlignedAffinity";
  /** The name of the service that the correlation relationship is established with. */
  ServiceName: string;
}

export interface ScalingPolicyDescriptionOutput {
  /** Specifies the trigger associated with this scaling policy */
  ScalingTrigger: ScalingTriggerDescriptionOutput;
  /** Specifies the mechanism associated with this scaling policy */
  ScalingMechanism: ScalingMechanismDescriptionOutput;
}

export interface ScalingTriggerDescriptionOutputBase {
  Kind: "AveragePartitionLoad" | "AverageServiceLoad";
}

export interface ScalingMechanismDescriptionOutputBase {
  Kind: "PartitionInstanceCount" | "AddRemoveIncrementalNamedPartition";
}

export interface NodeTagsDescriptionOutput {
  /** The number of tags. */
  Count: number;
  /** Array of size specified by the ‘Count’ parameter, for the placement tags of the service. */
  Tags: Array<string>;
}

export interface ServiceHealthOutput extends EntityHealthOutput {
  /** The name of the service whose health information is described by this object. */
  Name?: string;
  /** The list of partition health states associated with the service. */
  PartitionHealthStates?: Array<PartitionHealthStateOutput>;
}

export interface PartitionHealthStateOutput extends EntityHealthStateOutput {
  /**
   * Id of the partition whose health state is described by this object.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
}

export interface ResolvedServicePartitionOutput {
  /** The full name of the service with 'fabric:' URI scheme. */
  Name: string;
  /** A representation of the resolved partition. */
  PartitionInformation: PartitionInformationOutput;
  /** List of resolved service endpoints of a service partition. */
  Endpoints: Array<ResolvedServiceEndpointOutput>;
  /** The version of this resolved service partition result. This version should be passed in the next time the ResolveService call is made via the PreviousRspVersion query parameter. */
  Version: string;
}

export interface PartitionInformationOutputBase {
  /**
   * An internal ID used by Service Fabric to uniquely identify a partition. This is a randomly generated GUID when the service was created. The partition ID is unique and does not change for the lifetime of the service. If the same service was deleted and recreated the IDs of its partitions would be different.
   *
   * Value may contain a UUID
   */
  Id?: string;
  ServicePartitionKind: "Int64Range" | "Named" | "Singleton";
}

export interface ResolvedServiceEndpointOutput {
  /** The role of the replica where the endpoint is reported. */
  Kind?: "Invalid" | "Stateless" | "StatefulPrimary" | "StatefulSecondary";
  /** The address of the endpoint. If the endpoint has multiple listeners the address is a JSON object with one property per listener with the value as the address of that listener. */
  Address?: string;
}

export interface UnplacedReplicaInformationOutput {
  /** The name of the service. */
  ServiceName?: string;
  /**
   * The ID of the partition.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
  /** List of reasons due to which a replica cannot be placed. */
  UnplacedReplicaDetails?: Array<string>;
}

export interface LoadedPartitionInformationResultListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** List of application information. */
  Items?: Array<LoadedPartitionInformationResultOutput>;
}

export interface LoadedPartitionInformationResultOutput {
  /** Name of the service this partition belongs to. */
  ServiceName: string;
  /**
   * Id of the partition.
   *
   * Value may contain a UUID
   */
  PartitionId: string;
  /** Name of the metric for which this information is provided. */
  MetricName: string;
  /** Load for metric. */
  Load: number;
}

export interface PagedServicePartitionInfoListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** List of service partition information. */
  Items?: Array<ServicePartitionInfoOutput>;
}

export interface ServicePartitionInfoOutputBase {
  /** The health state of a Service Fabric entity such as Cluster, Node, Application, Service, Partition, Replica etc. */
  HealthState?: "Invalid" | "Ok" | "Warning" | "Error" | "Unknown";
  /** The status of the service fabric service partition. */
  PartitionStatus?:
    | "Invalid"
    | "Ready"
    | "NotReady"
    | "InQuorumLoss"
    | "Reconfiguring"
    | "Deleting";
  /** Information about the partition identity, partitioning scheme and keys supported by it. */
  PartitionInformation?: PartitionInformationOutput;
  ServiceKind: "Stateful" | "Stateless";
}

export interface ServiceNameInfoOutput {
  /**
   * The identity of the service. This ID is an encoded representation of the service name. This is used in the REST APIs to identify the service resource.
   * Starting in version 6.0, hierarchical names are delimited with the "\~" character. For example, if the service name is "fabric:/myapp/app1/svc1",
   * the service identity would be "myapp~app1\~svc1" in 6.0+ and "myapp/app1/svc1" in previous versions.
   */
  Id?: string;
  /** The full name of the service with 'fabric:' URI scheme. */
  Name?: string;
}

export interface PartitionHealthOutput extends EntityHealthOutput {
  /**
   * ID of the partition whose health information is described by this object.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
  /** The list of replica health states associated with the partition. */
  ReplicaHealthStates?: Array<ReplicaHealthStateOutput>;
}

export interface ReplicaHealthStateOutputBase extends EntityHealthStateOutput {
  /**
   * The ID of the partition to which this replica belongs.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
  ServiceKind: "ReplicaHealthState" | "Stateful" | "Stateless";
}

export interface PartitionLoadInformationOutput {
  /**
   * Id of the partition.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
  /** Array of load reports from the primary replica for this partition. */
  PrimaryLoadMetricReports?: Array<LoadMetricReportOutput>;
  /**
   * Array of aggregated load reports from all secondary replicas for this partition.
   * Array only contains the latest reported load for each metric.
   */
  SecondaryLoadMetricReports?: Array<LoadMetricReportOutput>;
  /**
   * Array of aggregated load reports from all auxiliary replicas for this partition.
   * Array only contains the latest reported load for each metric.
   */
  AuxiliaryLoadMetricReports?: Array<LoadMetricReportOutput>;
}

export interface LoadMetricReportOutput {
  /** Gets the UTC time when the load was reported. */
  LastReportedUtc?: string;
  /** The name of the load metric. */
  Name?: string;
  /** The value of the load metric. In future releases of Service Fabric this parameter will be deprecated in favor of CurrentValue. */
  Value?: string;
  /** The value of the load metric. */
  CurrentValue?: string;
}

export interface PagedUpdatePartitionLoadResultListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** List of partition load update information. */
  Items?: Array<UpdatePartitionLoadResultOutput>;
}

export interface UpdatePartitionLoadResultOutput {
  /**
   * Id of the partition.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
  /** If OperationState is Completed - this is 0.  If OperationState is Faulted - this is an error code indicating the reason. */
  PartitionErrorCode?: number;
}

export interface RepairTaskOutput {
  /** The ID of the repair task. */
  TaskId: string;
  /**
   * The version of the repair task.
   * When creating a new repair task, the version must be set to zero.  When updating a repair task,
   * the version is used for optimistic concurrency checks.  If the version is
   * set to zero, the update will not check for write conflicts.  If the version is set to a non-zero value, then the
   * update will only succeed if the actual current version of the repair task matches this value.
   */
  Version?: string;
  /**
   * A description of the purpose of the repair task, or other informational details.
   * May be set when the repair task is created, and is immutable once set.
   */
  Description?: string;
  /** The workflow state of the repair task. Valid initial states are Created, Claimed, and Preparing. */
  State:
    | "Invalid"
    | "Created"
    | "Claimed"
    | "Preparing"
    | "Approved"
    | "Executing"
    | "Restoring"
    | "Completed";
  /**
   * A bitwise-OR of the following values, which gives additional details about the status of the repair task.
   * - 1 - Cancellation of the repair has been requested
   * - 2 - Abort of the repair has been requested
   * - 4 - Approval of the repair was forced via client request
   */
  Flags?: number;
  /** The requested repair action. Must be specified when the repair task is created, and is immutable once set. */
  Action: string;
  /**
   * The target object determines what actions the system will take to prepare for the impact of the repair, prior to approving execution of the repair.
   * May be set when the repair task is created, and is immutable once set.
   */
  Target?: RepairTargetDescriptionBaseOutput;
  /** The name of the repair executor. Must be specified in Claimed and later states, and is immutable once set. */
  Executor?: string;
  /** A data string that the repair executor can use to store its internal state. */
  ExecutorData?: string;
  /**
   * The impact object determines what actions the system will take to prepare for the impact of the repair, prior to approving execution of the repair.
   * Impact must be specified by the repair executor when transitioning to the Preparing state, and is immutable once set.
   */
  Impact?: RepairImpactDescriptionBaseOutput;
  /** A value describing the overall result of the repair task execution. Must be specified in the Restoring and later states, and is immutable once set. */
  ResultStatus?: "Invalid" | "Succeeded" | "Cancelled" | "Interrupted" | "Failed" | "Pending";
  /**
   * A numeric value providing additional details about the result of the repair task execution.
   * May be specified in the Restoring and later states, and is immutable once set.
   */
  ResultCode?: number;
  /**
   * A string providing additional details about the result of the repair task execution.
   * May be specified in the Restoring and later states, and is immutable once set.
   */
  ResultDetails?: string;
  /**
   * An object that contains timestamps of the repair task's state transitions.
   * These timestamps are updated by the system, and cannot be directly modified.
   */
  History?: RepairTaskHistoryOutput;
  /** The workflow state of the health check when the repair task is in the Preparing state. */
  PreparingHealthCheckState?: "NotStarted" | "InProgress" | "Succeeded" | "Skipped" | "TimedOut";
  /** The workflow state of the health check when the repair task is in the Restoring state. */
  RestoringHealthCheckState?: "NotStarted" | "InProgress" | "Succeeded" | "Skipped" | "TimedOut";
  /** A value to determine if health checks will be performed when the repair task enters the Preparing state. */
  PerformPreparingHealthCheck?: boolean;
  /** A value to determine if health checks will be performed when the repair task enters the Restoring state. */
  PerformRestoringHealthCheck?: boolean;
}

export interface RepairTargetDescriptionBaseOutputBase {
  Kind: "Node";
}

export interface RepairImpactDescriptionBaseOutputBase {
  Kind: "Node";
}

export interface RepairTaskHistoryOutput {
  /** The time when the repair task entered the Created state. */
  CreatedUtcTimestamp?: string;
  /** The time when the repair task entered the Claimed state. */
  ClaimedUtcTimestamp?: string;
  /** The time when the repair task entered the Preparing state. */
  PreparingUtcTimestamp?: string;
  /** The time when the repair task entered the Approved state */
  ApprovedUtcTimestamp?: string;
  /** The time when the repair task entered the Executing state */
  ExecutingUtcTimestamp?: string;
  /** The time when the repair task entered the Restoring state */
  RestoringUtcTimestamp?: string;
  /** The time when the repair task entered the Completed state */
  CompletedUtcTimestamp?: string;
  /** The time when the repair task started the health check in the Preparing state. */
  PreparingHealthCheckStartUtcTimestamp?: string;
  /** The time when the repair task completed the health check in the Preparing state. */
  PreparingHealthCheckEndUtcTimestamp?: string;
  /** The time when the repair task started the health check in the Restoring state. */
  RestoringHealthCheckStartUtcTimestamp?: string;
  /** The time when the repair task completed the health check in the Restoring state. */
  RestoringHealthCheckEndUtcTimestamp?: string;
}

export interface RepairTaskUpdateInfoOutput {
  /** The new version of the repair task. */
  Version: string;
}

export interface PagedReplicaInfoListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** List of replica information. */
  Items?: Array<ReplicaInfoOutput>;
}

export interface ReplicaInfoOutputBase {
  /** The status of a replica of a service. */
  ReplicaStatus?: "Invalid" | "InBuild" | "Standby" | "Ready" | "Down" | "Dropped";
  /** The health state of a Service Fabric entity such as Cluster, Node, Application, Service, Partition, Replica etc. */
  HealthState?: "Invalid" | "Ok" | "Warning" | "Error" | "Unknown";
  /** The name of a Service Fabric node. */
  NodeName?: string;
  /** The address the replica is listening on. */
  Address?: string;
  /** The last in build duration of the replica in seconds. */
  LastInBuildDurationInSeconds?: string;
  ServiceKind: "Stateful" | "Stateless";
}

export interface ReplicaHealthOutputBase extends EntityHealthOutput {
  /**
   * Id of the partition to which this replica belongs.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
  ServiceKind: "ReplicaHealth" | "Stateful" | "Stateless";
}

export interface DeployedServiceReplicaInfoOutputBase {
  /** The full name of the service with 'fabric:' URI scheme. */
  ServiceName?: string;
  /** Name of the service type as specified in the service manifest. */
  ServiceTypeName?: string;
  /** The name of the service manifest in which this service type is defined. */
  ServiceManifestName?: string;
  /** The name of the code package that hosts this replica. */
  CodePackageName?: string;
  /**
   * An internal ID used by Service Fabric to uniquely identify a partition. This is a randomly generated GUID when the service was created. The partition ID is unique and does not change for the lifetime of the service. If the same service was deleted and recreated the IDs of its partitions would be different.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
  /** The status of a replica of a service. */
  ReplicaStatus?: "Invalid" | "InBuild" | "Standby" | "Ready" | "Down" | "Dropped";
  /** The last address returned by the replica in Open or ChangeRole. */
  Address?: string;
  /**
   * The ActivationId of a deployed service package. If ServicePackageActivationMode specified at the time of creating the service
   * is 'SharedProcess' (or if it is not specified, in which case it defaults to 'SharedProcess'), then value of ServicePackageActivationId
   * is always an empty string.
   */
  ServicePackageActivationId?: string;
  /** Host process ID of the process that is hosting the replica. This will be zero if the replica is down. In hyper-v containers this host process ID will be from different kernel. */
  HostProcessId?: string;
  ServiceKind: "Stateful" | "Stateless";
}

export interface DeployedServiceReplicaDetailInfoOutputBase {
  /** Full hierarchical name of the service in URI format starting with `fabric:`. */
  ServiceName?: string;
  /**
   * An internal ID used by Service Fabric to uniquely identify a partition. This is a randomly generated GUID when the service was created. The partition ID is unique and does not change for the lifetime of the service. If the same service was deleted and recreated the IDs of its partitions would be different.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
  /** Specifies the current active life-cycle operation on a stateful service replica or stateless service instance. */
  CurrentServiceOperation?: "Unknown" | "None" | "Open" | "ChangeRole" | "Close" | "Abort";
  /** The start time of the current service operation in UTC format. */
  CurrentServiceOperationStartTimeUtc?: string;
  /** List of load reported by replica. */
  ReportedLoad?: Array<LoadMetricReportInfoOutput>;
  ServiceKind: "Stateful" | "Stateless";
}

export interface LoadMetricReportInfoOutput {
  /** The name of the metric. */
  Name?: string;
  /** The value of the load for the metric. In future releases of Service Fabric this parameter will be deprecated in favor of CurrentValue. */
  Value?: number;
  /** The double value of the load for the metric. */
  CurrentValue?: string;
  /** The UTC time when the load is reported. */
  LastReportedUtc?: string;
}

export interface DeployedServicePackageInfoOutput {
  /** The name of the service package as specified in the service manifest. */
  Name?: string;
  /** The version of the service package specified in service manifest. */
  Version?: string;
  /** Specifies the status of a deployed application or service package on a Service Fabric node. */
  Status?:
    | "Invalid"
    | "Downloading"
    | "Activating"
    | "Active"
    | "Upgrading"
    | "Deactivating"
    | "RanToCompletion"
    | "Failed";
  /**
   * The ActivationId of a deployed service package. If ServicePackageActivationMode specified at the time of creating the service
   * is 'SharedProcess' (or if it is not specified, in which case it defaults to 'SharedProcess'), then value of ServicePackageActivationId
   * is always an empty string.
   */
  ServicePackageActivationId?: string;
}

export interface DeployedServicePackageHealthOutput extends EntityHealthOutput {
  /** The name of the application, including the 'fabric:' URI scheme. */
  ApplicationName?: string;
  /** Name of the service manifest. */
  ServiceManifestName?: string;
  /** Name of the node where this service package is deployed. */
  NodeName?: string;
}

export interface DeployedCodePackageInfoOutput {
  /** The name of the code package. */
  Name?: string;
  /** The version of the code package specified in service manifest. */
  Version?: string;
  /** The name of service manifest that specified this code package. */
  ServiceManifestName?: string;
  /**
   * The ActivationId of a deployed service package. If ServicePackageActivationMode specified at the time of creating the service
   * is 'SharedProcess' (or if it is not specified, in which case it defaults to 'SharedProcess'), then value of ServicePackageActivationId
   * is always an empty string.
   */
  ServicePackageActivationId?: string;
  /** Specifies the type of host for main entry point of a code package as specified in service manifest. */
  HostType?: "Invalid" | "ExeHost" | "ContainerHost";
  /** Specifies the isolation mode of main entry point of a code package when it's host type is ContainerHost. This is specified as part of container host policies in application manifest while importing service manifest. */
  HostIsolationMode?: "None" | "Process" | "HyperV";
  /** Specifies the status of a deployed application or service package on a Service Fabric node. */
  Status?:
    | "Invalid"
    | "Downloading"
    | "Activating"
    | "Active"
    | "Upgrading"
    | "Deactivating"
    | "RanToCompletion"
    | "Failed";
  /** The interval at which code package is run. This is used for periodic code package. */
  RunFrequencyInterval?: string;
  /** Information about setup or main entry point of a code package deployed on a Service Fabric node. */
  SetupEntryPoint?: CodePackageEntryPointOutput;
  /** Information about setup or main entry point of a code package deployed on a Service Fabric node. */
  MainEntryPoint?: CodePackageEntryPointOutput;
}

export interface CodePackageEntryPointOutput {
  /** The location of entry point executable on the node. */
  EntryPointLocation?: string;
  /** The process ID of the entry point. */
  ProcessId?: string;
  /** The user name under which entry point executable is run on the node. */
  RunAsUserName?: string;
  /** Statistics about setup or main entry point  of a code package deployed on a Service Fabric node. */
  CodePackageEntryPointStatistics?: CodePackageEntryPointStatisticsOutput;
  /** Specifies the status of the code package entry point deployed on a Service Fabric node. */
  Status?: "Invalid" | "Pending" | "Starting" | "Started" | "Stopping" | "Stopped";
  /** The time (in UTC) when the entry point executable will be run next. */
  NextActivationTime?: string;
  /** The instance ID for current running entry point. For a code package setup entry point (if specified) runs first and after it finishes main entry point is started. Each time entry point executable is run, its instance id will change. */
  InstanceId?: string;
}

export interface CodePackageEntryPointStatisticsOutput {
  /** The last exit code of the entry point. */
  LastExitCode?: string;
  /** The last time (in UTC) when Service Fabric attempted to run the entry point. */
  LastActivationTime?: string;
  /** The last time (in UTC) when the entry point finished running. */
  LastExitTime?: string;
  /** The last time (in UTC) when the entry point ran successfully. */
  LastSuccessfulActivationTime?: string;
  /** The last time (in UTC) when the entry point finished running gracefully. */
  LastSuccessfulExitTime?: string;
  /** Number of times the entry point has run. */
  ActivationCount?: string;
  /** Number of times the entry point failed to run. */
  ActivationFailureCount?: string;
  /** Number of times the entry point continuously failed to run. */
  ContinuousActivationFailureCount?: string;
  /** Number of times the entry point finished running. */
  ExitCount?: string;
  /** Number of times the entry point failed to exit gracefully. */
  ExitFailureCount?: string;
  /** Number of times the entry point continuously failed to exit gracefully. */
  ContinuousExitFailureCount?: string;
}

export interface ContainerLogsOutput {
  /** Container logs. */
  Content?: string;
}

export interface ContainerApiResponseOutput {
  /** Container API result. */
  ContainerApiResult: ContainerApiResultOutput;
}

export interface ContainerApiResultOutput {
  /** HTTP status code returned by the target container API */
  Status: number;
  /** HTTP content type */
  "Content-Type"?: string;
  /** HTTP content encoding */
  "Content-Encoding"?: string;
  /** container API result body */
  Body?: string;
}

export interface ComposeDeploymentStatusInfoOutput {
  /** The name of the deployment. */
  Name?: string;
  /** The name of the application, including the 'fabric:' URI scheme. */
  ApplicationName?: string;
  /** The status of the compose deployment. */
  Status?:
    | "Invalid"
    | "Provisioning"
    | "Creating"
    | "Ready"
    | "Unprovisioning"
    | "Deleting"
    | "Failed"
    | "Upgrading";
  /** The status details of compose deployment including failure message. */
  StatusDetails?: string;
}

export interface PagedComposeDeploymentStatusInfoListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** List of compose deployment status information. */
  Items?: Array<ComposeDeploymentStatusInfoOutput>;
}

export interface ComposeDeploymentUpgradeProgressInfoOutput {
  /** The name of the target deployment. */
  DeploymentName?: string;
  /** The name of the target application, including the 'fabric:' URI scheme. */
  ApplicationName?: string;
  /** The state of the compose deployment upgrade. */
  UpgradeState?:
    | "Invalid"
    | "ProvisioningTarget"
    | "RollingForwardInProgress"
    | "RollingForwardPending"
    | "UnprovisioningCurrent"
    | "RollingForwardCompleted"
    | "RollingBackInProgress"
    | "UnprovisioningTarget"
    | "RollingBackCompleted"
    | "Failed";
  /** Additional detailed information about the status of the pending upgrade. */
  UpgradeStatusDetails?: string;
  /** The kind of upgrade out of the following possible values. */
  UpgradeKind?: "Invalid" | "Rolling";
  /** The mode used to monitor health during a rolling upgrade. The values are UnmonitoredAuto, UnmonitoredManual, and Monitored. */
  RollingUpgradeMode?: "Invalid" | "UnmonitoredAuto" | "UnmonitoredManual" | "Monitored";
  /** If true, then processes are forcefully restarted during upgrade even when the code version has not changed (the upgrade only changes configuration or data). */
  ForceRestart?: boolean;
  /** The maximum amount of time to block processing of an upgrade domain and prevent loss of availability when there are unexpected issues. When this timeout expires, processing of the upgrade domain will proceed regardless of availability loss issues. The timeout is reset at the start of each upgrade domain. Valid values are between 0 and 42949672925 inclusive. (unsigned 32-bit integer). */
  UpgradeReplicaSetCheckTimeoutInSeconds?: number;
  /** Describes the parameters for monitoring an upgrade in Monitored mode. */
  MonitoringPolicy?: MonitoringPolicyDescriptionOutput;
  /** Defines a health policy used to evaluate the health of an application or one of its children entities. */
  ApplicationHealthPolicy?: ApplicationHealthPolicyOutput;
  /** The target application type version (found in the application manifest) for the application upgrade. */
  TargetApplicationTypeVersion?: string;
  /** The estimated amount of time that the overall upgrade elapsed. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  UpgradeDuration?: string;
  /** The estimated amount of time spent processing current Upgrade Domain. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  CurrentUpgradeDomainDuration?: string;
  /** List of health evaluations that resulted in the current aggregated health state. */
  ApplicationUnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  /** Information about the current in-progress upgrade domain. */
  CurrentUpgradeDomainProgress?: CurrentUpgradeDomainProgressInfoOutput;
  /** The estimated UTC datetime when the upgrade started. */
  StartTimestampUtc?: string;
  /** The estimated UTC datetime when the upgrade failed and FailureAction was executed. */
  FailureTimestampUtc?: string;
  /** The cause of an upgrade failure that resulted in FailureAction being executed. */
  FailureReason?:
    | "None"
    | "Interrupted"
    | "HealthCheck"
    | "UpgradeDomainTimeout"
    | "OverallUpgradeTimeout";
  /** Information about the upgrade domain progress at the time of upgrade failure. */
  UpgradeDomainProgressAtFailure?: FailureUpgradeDomainProgressInfoOutput;
  /** Additional details of application upgrade including failure message. */
  ApplicationUpgradeStatusDetails?: string;
}

export interface ChaosOutput {
  /** If Chaos is running, these are the parameters Chaos is running with. */
  ChaosParameters?: ChaosParametersOutput;
  /** Current status of the Chaos run. */
  Status?: "Invalid" | "Running" | "Stopped";
  /** Current status of the schedule. */
  ScheduleStatus?: "Invalid" | "Stopped" | "Active" | "Expired" | "Pending";
}

export interface ChaosParametersOutput {
  /** Total time (in seconds) for which Chaos will run before automatically stopping. The maximum allowed value is 4,294,967,295 (System.UInt32.MaxValue). */
  TimeToRunInSeconds?: string;
  /**
   * The maximum amount of time to wait for all cluster entities to become stable and healthy. Chaos executes in iterations and at the start of each iteration it validates the health of cluster entities.
   * During validation if a cluster entity is not stable and healthy within MaxClusterStabilizationTimeoutInSeconds, Chaos generates a validation failed event.
   */
  MaxClusterStabilizationTimeoutInSeconds?: number;
  /**
   * MaxConcurrentFaults is the maximum number of concurrent faults induced per iteration.
   * Chaos executes in iterations and two consecutive iterations are separated by a validation phase.
   * The higher the concurrency, the more aggressive the injection of faults, leading to inducing more complex series of states to uncover bugs.
   * The recommendation is to start with a value of 2 or 3 and to exercise caution while moving up.
   */
  MaxConcurrentFaults?: number;
  /** Enables or disables the move primary and move secondary faults. */
  EnableMoveReplicaFaults?: boolean;
  /**
   * Wait time (in seconds) between consecutive faults within a single iteration.
   * The larger the value, the lower the overlapping between faults and the simpler the sequence of state transitions that the cluster goes through.
   * The recommendation is to start with a value between 1 and 5 and exercise caution while moving up.
   */
  WaitTimeBetweenFaultsInSeconds?: number;
  /**
   * Time-separation (in seconds) between two consecutive iterations of Chaos.
   * The larger the value, the lower the fault injection rate.
   */
  WaitTimeBetweenIterationsInSeconds?: number;
  /** Passed-in cluster health policy is used to validate health of the cluster in between Chaos iterations. If the cluster health is in error or if an unexpected exception happens during fault execution--to provide the cluster with some time to recuperate--Chaos will wait for 30 minutes before the next health-check. */
  ClusterHealthPolicy?: ClusterHealthPolicyOutput;
  /**
   * Describes a map, which is a collection of (string, string) type key-value pairs. The map can be used to record information about
   * the Chaos run. There cannot be more than 100 such pairs and each string (key or value) can be at most 4095 characters long.
   * This map is set by the starter of the Chaos run to optionally store the context about the specific run.
   */
  Context?: ChaosContextOutput;
  /**
   * List of cluster entities to target for Chaos faults.
   * This filter can be used to target Chaos faults only to certain node types or only to certain application instances. If ChaosTargetFilter is not used, Chaos faults all cluster entities.
   * If ChaosTargetFilter is used, Chaos faults only the entities that meet the ChaosTargetFilter specification.
   */
  ChaosTargetFilter?: ChaosTargetFilterOutput;
}

export interface ChaosContextOutput {
  /** Describes a map that contains a collection of ChaosContextMapItem's. */
  Map?: Record<string, string>;
}

export interface ChaosTargetFilterOutput {
  /**
   * A list of node types to include in Chaos faults.
   * All types of faults (restart node, restart code package, remove replica, restart replica, move primary, and move secondary) are enabled for the nodes of these node types.
   * If a node type (say NodeTypeX) does not appear in the NodeTypeInclusionList, then node level faults (like NodeRestart) will never be enabled for the nodes of
   * NodeTypeX, but code package and replica faults can still be enabled for NodeTypeX if an application in the ApplicationInclusionList.
   * happens to reside on a node of NodeTypeX.
   * At most 100 node type names can be included in this list, to increase this number, a config upgrade is required for MaxNumberOfNodeTypesInChaosEntityFilter configuration.
   */
  NodeTypeInclusionList?: Array<string>;
  /**
   * A list of application URIs to include in Chaos faults.
   * All replicas belonging to services of these applications are amenable to replica faults (restart replica, remove replica, move primary, and move secondary) by Chaos.
   * Chaos may restart a code package only if the code package hosts replicas of these applications only.
   * If an application does not appear in this list, it can still be faulted in some Chaos iteration if the application ends up on a node of a node type that is included in NodeTypeInclusionList.
   * However, if applicationX is tied to nodeTypeY through placement constraints and applicationX is absent from ApplicationInclusionList and nodeTypeY is absent from NodeTypeInclusionList, then applicationX will never be faulted.
   * At most 1000 application names can be included in this list, to increase this number, a config upgrade is required for MaxNumberOfApplicationsInChaosEntityFilter configuration.
   */
  ApplicationInclusionList?: Array<string>;
}

export interface ChaosEventsSegmentOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** List of Chaos events that meet the user-supplied criteria. */
  History?: Array<ChaosEventWrapperOutput>;
}

export interface ChaosEventWrapperOutput {
  /** Represents an event generated during a Chaos run. */
  ChaosEvent?: ChaosEventOutput;
}

export interface ChaosEventOutputBase {
  /** The UTC timestamp when this Chaos event was generated. */
  TimeStampUtc: string;
  Kind: "ExecutingFaults" | "Started" | "Stopped" | "TestError" | "ValidationFailed" | "Waiting";
}

export interface ChaosScheduleDescriptionOutput {
  /** The version number of the Schedule. */
  Version?: number;
  /** Defines the schedule used by Chaos. */
  Schedule?: ChaosScheduleOutput;
}

export interface ChaosScheduleOutput {
  /** The date and time Chaos will start using this schedule. */
  StartDate?: string;
  /** The date and time Chaos will continue to use this schedule until. */
  ExpiryDate?: string;
  /** A mapping of string names to Chaos Parameters to be referenced by Chaos Schedule Jobs. */
  ChaosParametersDictionary?: Array<ChaosParametersDictionaryItemOutput>;
  /** A list of all Chaos Schedule Jobs that will be automated by the schedule. */
  Jobs?: Array<ChaosScheduleJobOutput>;
}

export interface ChaosParametersDictionaryItemOutput {
  /** The key identifying the Chaos Parameter in the dictionary. This key is referenced by Chaos Schedule Jobs. */
  Key: string;
  /** Defines all the parameters to configure a Chaos run. */
  Value: ChaosParametersOutput;
}

export interface ChaosScheduleJobOutput {
  /** A reference to which Chaos Parameters of the Chaos Schedule to use. */
  ChaosParameters?: string;
  /** Defines the days of the week that a Chaos Schedule Job will run for. */
  Days?: ChaosScheduleJobActiveDaysOfWeekOutput;
  /** A list of Time Ranges that specify when during active days that this job will run. The times are interpreted as UTC. */
  Times?: Array<TimeRangeOutput>;
}

export interface ChaosScheduleJobActiveDaysOfWeekOutput {
  /** Indicates if the Chaos Schedule Job will run on Sunday */
  Sunday?: boolean;
  /** Indicates if the Chaos Schedule Job will run on Monday */
  Monday?: boolean;
  /** Indicates if the Chaos Schedule Job will run on Tuesday */
  Tuesday?: boolean;
  /** Indicates if the Chaos Schedule Job will run on Wednesday */
  Wednesday?: boolean;
  /** Indicates if the Chaos Schedule Job will run on Thursday */
  Thursday?: boolean;
  /** Indicates if the Chaos Schedule Job will run on Friday */
  Friday?: boolean;
  /** Indicates if the Chaos Schedule Job will run on Saturday */
  Saturday?: boolean;
}

export interface TimeRangeOutput {
  /** Defines an hour and minute of the day specified in 24 hour time. */
  StartTime?: TimeOfDayOutput;
  /** Defines an hour and minute of the day specified in 24 hour time. */
  EndTime?: TimeOfDayOutput;
}

export interface TimeOfDayOutput {
  /** Represents the hour of the day. Value must be between 0 and 23 inclusive. */
  Hour?: number;
  /** Represents the minute of the hour. Value must be between 0 to 59 inclusive. */
  Minute?: number;
}

export interface ImageStoreContentOutput {
  /** The list of image store file info objects represents files found under the given image store relative path. */
  StoreFiles?: Array<FileInfoOutput>;
  /** The list of image store folder info objects represents subfolders found under the given image store relative path. */
  StoreFolders?: Array<FolderInfoOutput>;
}

export interface FileInfoOutput {
  /** The size of file in bytes. */
  FileSize?: string;
  /** Information about the version of image store file. */
  FileVersion?: FileVersionOutput;
  /** The date and time when the image store file was last modified. */
  ModifiedDate?: string;
  /** The file path relative to the image store root path. */
  StoreRelativePath?: string;
}

export interface FileVersionOutput {
  /** The current image store version number for the file is used in image store for checking whether it need to be updated. */
  VersionNumber?: string;
  /** The epoch data loss number of image store replica when this file entry was updated or created. */
  EpochDataLossNumber?: string;
  /** The epoch configuration version number of the image store replica when this file entry was created or updated. */
  EpochConfigurationNumber?: string;
}

export interface FolderInfoOutput {
  /** The remote location within image store. This path is relative to the image store root. */
  StoreRelativePath?: string;
  /** The number of files from within the image store folder. */
  FileCount?: string;
}

export interface UploadSessionOutput {
  /** When querying upload session by upload session ID, the result contains only one upload session. When querying upload session by image store relative path, the result might contain multiple upload sessions. */
  UploadSessions?: Array<UploadSessionInfoOutput>;
}

export interface UploadSessionInfoOutput {
  /** The remote location within image store. This path is relative to the image store root. */
  StoreRelativePath?: string;
  /**
   * A unique ID of the upload session. A session ID can be reused only if the session was committed or removed.
   *
   * Value may contain a UUID
   */
  SessionId?: string;
  /** The date and time when the upload session was last modified. */
  ModifiedDate?: string;
  /** The size in bytes of the uploading file. */
  FileSize?: string;
  /** List of chunk ranges that image store has not received yet. */
  ExpectedRanges?: Array<UploadChunkRangeOutput>;
}

export interface UploadChunkRangeOutput {
  /** The start position of the portion of the file. It's represented by the number of bytes. */
  StartPosition?: string;
  /** The end position of the portion of the file. It's represented by the number of bytes. */
  EndPosition?: string;
}

export interface FolderSizeInfoOutput {
  /** The remote location within image store. This path is relative to the image store root. */
  StoreRelativePath?: string;
  /** The size of folder in bytes. */
  FolderSize?: string;
}

export interface ImageStoreInfoOutput {
  /** disk capacity and available disk space on the node where the ImageStore primary is placed. */
  DiskInfo?: DiskInfoOutput;
  /** the ImageStore's file system usage for metadata. */
  UsedByMetadata?: UsageInfoOutput;
  /** The ImageStore's file system usage for staging files that are being uploaded. */
  UsedByStaging?: UsageInfoOutput;
  /** the ImageStore's file system usage for copied application and cluster packages. [Removing application and cluster packages](https://docs.microsoft.com/rest/api/servicefabric/sfclient-api-deleteimagestorecontent) will free up this space. */
  UsedByCopy?: UsageInfoOutput;
  /** the ImageStore's file system usage for registered and cluster packages. [Unregistering application](https://docs.microsoft.com/rest/api/servicefabric/sfclient-api-unprovisionapplicationtype) and [cluster packages](https://docs.microsoft.com/rest/api/servicefabric/sfclient-api-unprovisionapplicationtype) will free up this space. */
  UsedByRegister?: UsageInfoOutput;
}

export interface DiskInfoOutput {
  /** the disk size in bytes */
  Capacity?: string;
  /** the available disk space in bytes */
  AvailableSpace?: string;
}

export interface UsageInfoOutput {
  /** the size of all files in this category */
  UsedSpace?: string;
  /** the number of all files in this category */
  FileCount?: string;
}

export interface PartitionDataLossProgressOutput {
  /** The state of the operation. */
  State?:
    | "Invalid"
    | "Running"
    | "RollingBack"
    | "Completed"
    | "Faulted"
    | "Cancelled"
    | "ForceCancelled";
  /** Represents information about an operation in a terminal state (Completed or Faulted). */
  InvokeDataLossResult?: InvokeDataLossResultOutput;
}

export interface InvokeDataLossResultOutput {
  /** If OperationState is Completed, this is 0.  If OperationState is Faulted, this is an error code indicating the reason. */
  ErrorCode?: number;
  /** This class returns information about the partition that the user-induced operation acted upon. */
  SelectedPartition?: SelectedPartitionOutput;
}

export interface SelectedPartitionOutput {
  /** The name of the service the partition belongs to. */
  ServiceName?: string;
  /**
   * An internal ID used by Service Fabric to uniquely identify a partition. This is a randomly generated GUID when the service was created. The partition ID is unique and does not change for the lifetime of the service. If the same service was deleted and recreated the IDs of its partitions would be different.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
}

export interface PartitionQuorumLossProgressOutput {
  /** The state of the operation. */
  State?:
    | "Invalid"
    | "Running"
    | "RollingBack"
    | "Completed"
    | "Faulted"
    | "Cancelled"
    | "ForceCancelled";
  /** Represents information about an operation in a terminal state (Completed or Faulted). */
  InvokeQuorumLossResult?: InvokeQuorumLossResultOutput;
}

export interface InvokeQuorumLossResultOutput {
  /** If OperationState is Completed, this is 0.  If OperationState is Faulted, this is an error code indicating the reason. */
  ErrorCode?: number;
  /** This class returns information about the partition that the user-induced operation acted upon. */
  SelectedPartition?: SelectedPartitionOutput;
}

export interface PartitionRestartProgressOutput {
  /** The state of the operation. */
  State?:
    | "Invalid"
    | "Running"
    | "RollingBack"
    | "Completed"
    | "Faulted"
    | "Cancelled"
    | "ForceCancelled";
  /** Represents information about an operation in a terminal state (Completed or Faulted). */
  RestartPartitionResult?: RestartPartitionResultOutput;
}

export interface RestartPartitionResultOutput {
  /** If OperationState is Completed, this is 0.  If OperationState is Faulted, this is an error code indicating the reason. */
  ErrorCode?: number;
  /** This class returns information about the partition that the user-induced operation acted upon. */
  SelectedPartition?: SelectedPartitionOutput;
}

export interface NodeTransitionProgressOutput {
  /** The state of the operation. */
  State?:
    | "Invalid"
    | "Running"
    | "RollingBack"
    | "Completed"
    | "Faulted"
    | "Cancelled"
    | "ForceCancelled";
  /** Represents information about an operation in a terminal state (Completed or Faulted). */
  NodeTransitionResult?: NodeTransitionResultOutput;
}

export interface NodeTransitionResultOutput {
  /** If OperationState is Completed, this is 0.  If OperationState is Faulted, this is an error code indicating the reason. */
  ErrorCode?: number;
  /** Contains information about a node that was targeted by a user-induced operation. */
  NodeResult?: NodeResultOutput;
}

export interface NodeResultOutput {
  /** The name of a Service Fabric node. */
  NodeName?: string;
  /** The node instance id. */
  NodeInstanceId?: string;
}

export interface OperationStatusOutput {
  /**
   * A GUID that identifies a call to this API.  This is also passed into the corresponding GetProgress API.
   *
   * Value may contain a UUID
   */
  OperationId?: string;
  /** The state of the operation. */
  State?:
    | "Invalid"
    | "Running"
    | "RollingBack"
    | "Completed"
    | "Faulted"
    | "Cancelled"
    | "ForceCancelled";
  /** The type of the operation. */
  Type?:
    | "Invalid"
    | "PartitionDataLoss"
    | "PartitionQuorumLoss"
    | "PartitionRestart"
    | "NodeTransition";
}

export interface BackupPolicyDescriptionOutput {
  /** The unique name identifying this backup policy. */
  Name: string;
  /** Specifies whether to trigger restore automatically using the latest available backup in case the partition experiences a data loss event. */
  AutoRestoreOnDataLoss: boolean;
  /**
   * Defines the maximum number of incremental backups to be taken between two full backups. This is just the upper limit. A full backup may be taken before specified number of incremental backups are completed in one of the following conditions
   * - The replica has never taken a full backup since it has become primary,
   * - Some of the log records since the last backup has been truncated, or
   * - Replica passed the MaxAccumulatedBackupLogSizeInMB limit.
   */
  MaxIncrementalBackups: number;
  /** Describes the backup schedule parameters. */
  Schedule: BackupScheduleDescriptionOutput;
  /** Describes the details of backup storage where to store the periodic backups. */
  Storage: BackupStorageDescriptionOutput;
  /** Describes the policy to retain backups in storage. */
  RetentionPolicy?: RetentionPolicyDescriptionOutput;
}

export interface BackupScheduleDescriptionOutputBase {
  ScheduleKind: "FrequencyBased" | "TimeBased";
}

export interface BackupStorageDescriptionOutputBase {
  /** Friendly name for this backup storage. */
  FriendlyName?: string;
  StorageKind:
    | "AzureBlobStore"
    | "FileShare"
    | "DsmsAzureBlobStore"
    | "ManagedIdentityAzureBlobStore";
}

export interface RetentionPolicyDescriptionOutputBase {
  RetentionPolicyType: "Basic";
}

export interface PagedBackupPolicyDescriptionListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** The list of backup policies information. */
  Items?: Array<BackupPolicyDescriptionOutput>;
}

export interface PagedBackupEntityListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** List of backup entity information. */
  Items?: Array<BackupEntityOutput>;
}

export interface BackupEntityOutputBase {
  EntityKind: "Application" | "Service" | "Partition";
}

export interface PagedBackupConfigurationInfoListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** List of backup configuration information. */
  Items?: Array<BackupConfigurationInfoOutput>;
}

export interface BackupConfigurationInfoOutputBase {
  /** The name of the backup policy which is applicable to this Service Fabric application or service or partition. */
  PolicyName?: string;
  /** Specifies the scope at which the backup policy is applied. */
  PolicyInheritedFrom?: "Invalid" | "Partition" | "Service" | "Application";
  /** Describes the backup suspension details. */
  SuspensionInfo?: BackupSuspensionInfoOutput;
  Kind: "Partition" | "Application" | "Service";
}

export interface BackupSuspensionInfoOutput {
  /** Indicates whether periodic backup is suspended at this level or not. */
  IsSuspended?: boolean;
  /** Specifies the scope at which the backup suspension was applied. */
  SuspensionInheritedFrom?: "Invalid" | "Partition" | "Service" | "Application";
}

export interface PagedBackupInfoListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** List of backup information. */
  Items?: Array<BackupInfoOutput>;
}

export interface BackupInfoOutput {
  /**
   * Unique backup ID .
   *
   * Value may contain a UUID
   */
  BackupId?: string;
  /**
   * Unique backup chain ID. All backups part of the same chain has the same backup chain id. A backup chain is comprised of 1 full backup and multiple incremental backups.
   *
   * Value may contain a UUID
   */
  BackupChainId?: string;
  /** Name of the Service Fabric application this partition backup belongs to. */
  ApplicationName?: string;
  /** Name of the Service Fabric service this partition backup belongs to. */
  ServiceName?: string;
  /** Information about the partition to which this backup belongs to */
  PartitionInformation?: PartitionInformationOutput;
  /** Location of the backup, relative to the backup store. */
  BackupLocation?: string;
  /** Describes the type of backup, whether its full or incremental. */
  BackupType?: "Invalid" | "Full" | "Incremental";
  /** Epoch of the last record in this backup. */
  EpochOfLastBackupRecord?: EpochOutput;
  /** LSN of the last record in this backup. */
  LsnOfLastBackupRecord?: string;
  /** The date time when this backup was taken. */
  CreationTimeUtc?: string;
  /** Manifest Version of the service this partition backup belongs to. */
  ServiceManifestVersion?: string;
  /** Denotes the failure encountered in getting backup point information. */
  FailureError?: FabricErrorErrorOutput;
}

export interface EpochOutput {
  /** The current configuration number of this Epoch. The configuration number is an increasing value that is updated whenever the configuration of this replica set changes. */
  ConfigurationVersion?: string;
  /** The current data loss number of this Epoch. The data loss number property is an increasing value which is updated whenever data loss is suspected, as when loss of a quorum of replicas in the replica set that includes the Primary replica. */
  DataLossVersion?: string;
}

export interface PartitionBackupConfigurationInfoOutput extends BackupConfigurationInfoOutputBase {
  /** The full name of the service with 'fabric:' URI scheme. */
  ServiceName?: string;
  /**
   * The partition ID identifying the partition.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
  Kind: "Partition";
}

export interface BackupProgressInfoOutput {
  /** Represents the current state of the partition backup operation. */
  BackupState?: "Invalid" | "Accepted" | "BackupInProgress" | "Success" | "Failure" | "Timeout";
  /** TimeStamp in UTC when operation succeeded or failed. */
  TimeStampUtc?: string;
  /**
   * Unique ID of the newly created backup.
   *
   * Value may contain a UUID
   */
  BackupId?: string;
  /** Location, relative to the backup store, of the newly created backup. */
  BackupLocation?: string;
  /** Specifies the epoch of the last record included in backup. */
  EpochOfLastBackupRecord?: EpochOutput;
  /** The LSN of last record included in backup. */
  LsnOfLastBackupRecord?: string;
  /** Denotes the failure encountered in performing backup operation. */
  FailureError?: FabricErrorErrorOutput;
}

export interface RestoreProgressInfoOutput {
  /** Represents the current state of the partition restore operation. */
  RestoreState?: "Invalid" | "Accepted" | "RestoreInProgress" | "Success" | "Failure" | "Timeout";
  /** Timestamp when operation succeeded or failed. */
  TimeStampUtc?: string;
  /** Describes the epoch at which the partition is restored. */
  RestoredEpoch?: EpochOutput;
  /** Restored LSN. */
  RestoredLsn?: string;
  /** Denotes the failure encountered in performing restore operation. */
  FailureError?: FabricErrorErrorOutput;
}

export interface PagedSubNameInfoListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** Indicates whether any name under the given name has been modified during the enumeration. If there was a modification, this property value is false. */
  IsConsistent?: boolean;
  /** List of the child names. */
  SubNames?: Array<string>;
}

export interface PagedPropertyInfoListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** Indicates whether any property under the given name has been modified during the enumeration. If there was a modification, this property value is false. */
  IsConsistent?: boolean;
  /** List of property information. */
  Properties?: Array<PropertyInfoOutput>;
}

export interface PropertyInfoOutput {
  /** The name of the Service Fabric property. */
  Name: string;
  /** Describes a Service Fabric property value. */
  Value?: PropertyValueOutput;
  /** The metadata associated with a property, including the property's name. */
  Metadata: PropertyMetadataOutput;
}

export interface PropertyValueOutputBase {
  Kind: "Binary" | "Int64" | "Double" | "String" | "Guid";
}

export interface PropertyMetadataOutput {
  /** The kind of property, determined by the type of data. Following are the possible values. */
  TypeId?: "Invalid" | "Binary" | "Int64" | "Double" | "String" | "Guid";
  /** The property's custom type ID. */
  CustomTypeId?: string;
  /** The name of the parent Service Fabric Name for the property. It could be thought of as the name-space/table under which the property exists. */
  Parent?: string;
  /** The length of the serialized property value. */
  SizeInBytes?: number;
  /** Represents when the Property was last modified. Only write operations will cause this field to be updated. */
  LastModifiedUtcTimestamp?: string;
  /** The version of the property. Every time a property is modified, its sequence number is increased. */
  SequenceNumber?: string;
}

export interface SuccessfulPropertyBatchInfoOutput extends PropertyBatchInfoOutputBase {
  /** A map containing the properties that were requested through any "Get" property batch operations. The key represents the index of the "Get" operation in the original request, in string form. The value is the property. If a property is not found, it will not be in the map. */
  Properties?: Record<string, PropertyInfoOutput>;
  Kind: "Successful";
}

export interface PropertyBatchInfoOutputBase {
  Kind: "Successful" | "Failed";
}

export interface FailedPropertyBatchInfoOutput extends PropertyBatchInfoOutputBase {
  /** The error message of the failed operation. Describes the exception thrown due to the first unsuccessful operation in the property batch. */
  ErrorMessage?: string;
  /** The index of the unsuccessful operation in the property batch. */
  OperationIndex?: number;
  Kind: "Failed";
}

export interface ClusterEventOutputBase extends FabricEventOutputBase {
  Kind:
    | "ClusterEvent"
    | "ClusterNewHealthReport"
    | "ClusterHealthReportExpired"
    | "ClusterUpgradeCompleted"
    | "ClusterUpgradeDomainCompleted"
    | "ClusterUpgradeRollbackCompleted"
    | "ClusterUpgradeRollbackStarted"
    | "ClusterUpgradeStarted"
    | "ChaosStopped"
    | "ChaosStarted";
}

export interface FabricEventOutputBase {
  /**
   * The identifier for the FabricEvent instance.
   *
   * Value may contain a UUID
   */
  EventInstanceId: string;
  /** The category of event. */
  Category?: string;
  /** The time event was logged. */
  TimeStamp: string;
  /** Shows there is existing related events available. */
  HasCorrelatedEvents?: boolean;
  Kind:
    | "ClusterEvent"
    | "ContainerInstanceEvent"
    | "NodeEvent"
    | "ApplicationEvent"
    | "ServiceEvent"
    | "PartitionEvent"
    | "ReplicaEvent"
    | "PartitionAnalysisEvent"
    | "ApplicationCreated"
    | "ApplicationDeleted"
    | "ApplicationNewHealthReport"
    | "ApplicationHealthReportExpired"
    | "ApplicationUpgradeCompleted"
    | "ApplicationUpgradeDomainCompleted"
    | "ApplicationUpgradeRollbackCompleted"
    | "ApplicationUpgradeRollbackStarted"
    | "ApplicationUpgradeStarted"
    | "DeployedApplicationNewHealthReport"
    | "DeployedApplicationHealthReportExpired"
    | "ApplicationProcessExited"
    | "ApplicationContainerInstanceExited"
    | "NodeAborted"
    | "NodeAddedToCluster"
    | "NodeClosed"
    | "NodeDeactivateCompleted"
    | "NodeDeactivateStarted"
    | "NodeDown"
    | "NodeNewHealthReport"
    | "NodeHealthReportExpired"
    | "NodeOpenSucceeded"
    | "NodeOpenFailed"
    | "NodeRemovedFromCluster"
    | "NodeUp"
    | "PartitionNewHealthReport"
    | "PartitionHealthReportExpired"
    | "PartitionReconfigured"
    | "PartitionPrimaryMoveAnalysis"
    | "ServiceCreated"
    | "ServiceDeleted"
    | "ServiceNewHealthReport"
    | "ServiceHealthReportExpired"
    | "DeployedServicePackageNewHealthReport"
    | "DeployedServicePackageHealthReportExpired"
    | "StatefulReplicaNewHealthReport"
    | "StatefulReplicaHealthReportExpired"
    | "StatelessReplicaNewHealthReport"
    | "StatelessReplicaHealthReportExpired"
    | "ClusterNewHealthReport"
    | "ClusterHealthReportExpired"
    | "ClusterUpgradeCompleted"
    | "ClusterUpgradeDomainCompleted"
    | "ClusterUpgradeRollbackCompleted"
    | "ClusterUpgradeRollbackStarted"
    | "ClusterUpgradeStarted"
    | "ChaosStopped"
    | "ChaosStarted"
    | "ChaosCodePackageRestartScheduled"
    | "ChaosReplicaRemovalScheduled"
    | "ChaosPartitionSecondaryMoveScheduled"
    | "ChaosPartitionPrimaryMoveScheduled"
    | "ChaosReplicaRestartScheduled"
    | "ChaosNodeRestartScheduled";
}

export interface ContainerInstanceEventOutput extends FabricEventOutputBase {
  Kind: "ContainerInstanceEvent";
}

export interface NodeEventOutputBase extends FabricEventOutputBase {
  /** The name of a Service Fabric node. */
  NodeName: string;
  Kind:
    | "NodeEvent"
    | "NodeAborted"
    | "NodeAddedToCluster"
    | "NodeClosed"
    | "NodeDeactivateCompleted"
    | "NodeDeactivateStarted"
    | "NodeDown"
    | "NodeNewHealthReport"
    | "NodeHealthReportExpired"
    | "NodeOpenSucceeded"
    | "NodeOpenFailed"
    | "NodeRemovedFromCluster"
    | "NodeUp"
    | "ChaosNodeRestartScheduled";
}

export interface ApplicationEventOutputBase extends FabricEventOutputBase {
  /**
   * The identity of the application. This is an encoded representation of the application name. This is used in the REST APIs to identify the application resource.
   * Starting in version 6.0, hierarchical names are delimited with the "\~" character. For example, if the application name is "fabric:/myapp/app1",
   * the application identity would be "myapp\~app1" in 6.0+ and "myapp/app1" in previous versions.
   */
  ApplicationId: string;
  Kind:
    | "ApplicationEvent"
    | "ApplicationCreated"
    | "ApplicationDeleted"
    | "ApplicationNewHealthReport"
    | "ApplicationHealthReportExpired"
    | "ApplicationUpgradeCompleted"
    | "ApplicationUpgradeDomainCompleted"
    | "ApplicationUpgradeRollbackCompleted"
    | "ApplicationUpgradeRollbackStarted"
    | "ApplicationUpgradeStarted"
    | "DeployedApplicationNewHealthReport"
    | "DeployedApplicationHealthReportExpired"
    | "ApplicationProcessExited"
    | "ApplicationContainerInstanceExited"
    | "DeployedServicePackageNewHealthReport"
    | "DeployedServicePackageHealthReportExpired"
    | "ChaosCodePackageRestartScheduled";
}

export interface ServiceEventOutputBase extends FabricEventOutputBase {
  /**
   * The identity of the service. This ID is an encoded representation of the service name. This is used in the REST APIs to identify the service resource.
   * Starting in version 6.0, hierarchical names are delimited with the "\~" character. For example, if the service name is "fabric:/myapp/app1/svc1",
   * the service identity would be "myapp~app1\~svc1" in 6.0+ and "myapp/app1/svc1" in previous versions.
   */
  ServiceId: string;
  Kind:
    | "ServiceEvent"
    | "ServiceCreated"
    | "ServiceDeleted"
    | "ServiceNewHealthReport"
    | "ServiceHealthReportExpired";
}

export interface PartitionEventOutputBase extends FabricEventOutputBase {
  /**
   * An internal ID used by Service Fabric to uniquely identify a partition. This is a randomly generated GUID when the service was created. The partition ID is unique and does not change for the lifetime of the service. If the same service was deleted and recreated the IDs of its partitions would be different.
   *
   * Value may contain a UUID
   */
  PartitionId: string;
  Kind:
    | "PartitionEvent"
    | "PartitionAnalysisEvent"
    | "PartitionNewHealthReport"
    | "PartitionHealthReportExpired"
    | "PartitionReconfigured"
    | "PartitionPrimaryMoveAnalysis"
    | "ChaosPartitionSecondaryMoveScheduled"
    | "ChaosPartitionPrimaryMoveScheduled";
}

export interface ReplicaEventOutputBase extends FabricEventOutputBase {
  /**
   * An internal ID used by Service Fabric to uniquely identify a partition. This is a randomly generated GUID when the service was created. The partition ID is unique and does not change for the lifetime of the service. If the same service was deleted and recreated the IDs of its partitions would be different.
   *
   * Value may contain a UUID
   */
  PartitionId: string;
  /** Id of a stateful service replica. ReplicaId is used by Service Fabric to uniquely identify a replica of a partition. It is unique within a partition and does not change for the lifetime of the replica. If a replica gets dropped and another replica gets created on the same node for the same partition, it will get a different value for the id. Sometimes the id of a stateless service instance is also referred as a replica id. */
  ReplicaId: number;
  Kind:
    | "ReplicaEvent"
    | "StatefulReplicaNewHealthReport"
    | "StatefulReplicaHealthReportExpired"
    | "StatelessReplicaNewHealthReport"
    | "StatelessReplicaHealthReportExpired"
    | "ChaosReplicaRemovalScheduled"
    | "ChaosReplicaRestartScheduled";
}

export interface SecretResourceDescriptionOutput {
  /** Describes the properties of a secret resource. */
  properties: SecretResourcePropertiesOutput;
  /** Name of the Secret resource. */
  name: string;
}

export interface SecretResourcePropertiesOutputBase
  extends SecretResourcePropertiesParentOutputBase {
  /** User readable description of the secret. */
  description?: string;
  /** Status of the resource. */
  status?: "Unknown" | "Ready" | "Upgrading" | "Creating" | "Deleting" | "Failed";
  /** Gives additional information about the current status of the secret. */
  statusDetails?: string;
  /** The type of the content stored in the secret value. The value of this property is opaque to Service Fabric. Once set, the value of this property cannot be changed. */
  contentType?: string;
  kind: "SecretResourceProperties" | "inlinedValue";
}

export interface SecretResourcePropertiesParentOutputBase {
  kind: "SecretResourceProperties" | "inlinedValue";
}

export interface PagedSecretResourceDescriptionListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** One page of the list. */
  Items?: Array<SecretResourceDescriptionOutput>;
}

export interface SecretValueResourceDescriptionOutput {
  /** Version identifier of the secret value. */
  name: string;
  /** This type describes properties of a secret value resource. */
  properties: SecretValueResourcePropertiesOutput;
}

export interface SecretValueResourcePropertiesOutput extends SecretValuePropertiesOutput {}

export interface SecretValuePropertiesOutput {
  /** The actual value of the secret. */
  value?: string;
}

export interface PagedSecretValueResourceDescriptionListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** One page of the list. */
  Items?: Array<SecretValueResourceDescriptionOutput>;
}

export interface SecretValueOutput {
  /** The actual value of the secret. */
  value?: string;
}

export interface VolumeResourceDescriptionOutput {
  /** Name of the Volume resource. */
  name: string;
  /** Describes properties of a volume resource. */
  properties: VolumePropertiesOutput;
}

export interface VolumePropertiesOutput {
  /** User readable description of the volume. */
  description?: string;
  /** Status of the volume. */
  status?: "Unknown" | "Ready" | "Upgrading" | "Creating" | "Deleting" | "Failed";
  /** Gives additional information about the current status of the volume. */
  statusDetails?: string;
  /** Provider of the volume. */
  provider: "SFAzureFile";
  /** This type describes a volume provided by an Azure Files file share. */
  azureFileParameters?: VolumeProviderParametersAzureFileOutput;
}

export interface VolumeProviderParametersAzureFileOutput {
  /** Name of the Azure storage account for the File Share. */
  accountName: string;
  /** Access key of the Azure storage account for the File Share. */
  accountKey?: string;
  /** Name of the Azure Files file share that provides storage for the volume. */
  shareName: string;
}

export interface PagedVolumeResourceDescriptionListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** One page of the list. */
  Items?: Array<VolumeResourceDescriptionOutput>;
}

export interface NetworkResourceDescriptionOutput {
  /** Name of the Network resource. */
  name: string;
  /** Describes properties of a network resource. */
  properties: NetworkResourcePropertiesOutput;
}

export interface NetworkResourcePropertiesOutputBase
  extends NetworkResourcePropertiesParentOutputBase {
  /** User readable description of the network. */
  description?: string;
  /** Status of the network. */
  status?: "Unknown" | "Ready" | "Upgrading" | "Creating" | "Deleting" | "Failed";
  /** Gives additional information about the current status of the network. */
  statusDetails?: string;
  kind: "NetworkResourceProperties" | "Local";
}

export interface NetworkResourcePropertiesParentOutputBase {
  kind: "NetworkResourceProperties" | "Local";
}

export interface PagedNetworkResourceDescriptionListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** One page of the list. */
  Items?: Array<NetworkResourceDescriptionOutput>;
}

export interface ApplicationResourceDescriptionOutput {
  /** Name of the Application resource. */
  name: string;
  /** Describes properties of a application resource. */
  properties: ApplicationPropertiesOutput;
  /** Describes the identity of the application. */
  identity?: IdentityDescriptionOutput;
}

export interface ApplicationPropertiesOutput {
  /** User readable description of the application. */
  description?: string;
  /** Describes the services in the application. This property is used to create or modify services of the application. On get only the name of the service is returned. The service description can be obtained by querying for the service resource. */
  services?: Array<ServiceResourceDescriptionOutput>;
  /** Describes the diagnostics definition and usage for an application resource. */
  diagnostics?: DiagnosticsDescriptionOutput;
  /** Internal - used by Visual Studio to setup the debugging session on the local development environment. */
  debugParams?: string;
  /** Names of the services in the application. */
  serviceNames?: Array<string>;
  /** Status of the application. */
  status?: "Unknown" | "Ready" | "Upgrading" | "Creating" | "Deleting" | "Failed";
  /** Gives additional information about the current status of the application. */
  statusDetails?: string;
  /** Describes the health state of an application resource. */
  healthState?: "Invalid" | "Ok" | "Warning" | "Error" | "Unknown";
  /** When the application's health state is not 'Ok', this additional details from service fabric Health Manager for the user to know why the application is marked unhealthy. */
  unhealthyEvaluation?: string;
}

export interface ServiceResourceDescriptionOutput {
  /** Name of the Service resource. */
  name: string;
  /** This type describes properties of a service resource. */
  properties: ServiceResourcePropertiesOutput;
}

export interface ServiceResourcePropertiesOutput
  extends ServiceReplicaPropertiesOutput,
    ServicePropertiesOutput {}

export interface ServiceReplicaPropertiesOutput {
  /** The operation system required by the code in service. */
  osType: "Linux" | "Windows";
  /** Describes the set of code packages that forms the service. A code package describes the container and the properties for running it. All the code packages are started together on the same host and share the same context (network, process etc.). */
  codePackages: Array<ContainerCodePackagePropertiesOutput>;
  /** The names of the private networks that this service needs to be part of. */
  networkRefs?: Array<NetworkRefOutput>;
  /** Reference to sinks in DiagnosticsDescription. */
  diagnostics?: DiagnosticsRefOutput;
}

export interface ContainerCodePackagePropertiesOutput {
  /** The name of the code package. */
  name: string;
  /** The Container image to use. */
  image: string;
  /** Image registry credential. */
  imageRegistryCredential?: ImageRegistryCredentialOutput;
  /** Override for the default entry point in the container. */
  entryPoint?: string;
  /** Command array to execute within the container in exec form. */
  commands?: Array<string>;
  /** The environment variables to set in this container */
  environmentVariables?: Array<EnvironmentVariableOutput>;
  /** The settings to set in this container. The setting file path can be fetched from environment variable "Fabric_SettingPath". The path for Windows container is "C:\\secrets". The path for Linux container is "/var/secrets". */
  settings?: Array<SettingOutput>;
  /** The labels to set in this container. */
  labels?: Array<ContainerLabelOutput>;
  /** The endpoints exposed by this container. */
  endpoints?: Array<EndpointPropertiesOutput>;
  /** The resources required by this container. */
  resources: ResourceRequirementsOutput;
  /** Volumes to be attached to the container. The lifetime of these volumes is independent of the application's lifetime. */
  volumeRefs?: Array<VolumeReferenceOutput>;
  /** Volumes to be attached to the container. The lifetime of these volumes is scoped to the application's lifetime. */
  volumes?: Array<ApplicationScopedVolumeOutput>;
  /** Reference to sinks in DiagnosticsDescription. */
  diagnostics?: DiagnosticsRefOutput;
  /** A list of ReliableCollection resources used by this particular code package. Please refer to ReliableCollectionsRef for more details. */
  reliableCollectionsRefs?: Array<ReliableCollectionsRefOutput>;
  /** Runtime information of a container instance. */
  instanceView?: ContainerInstanceViewOutput;
  /** An array of liveness probes for a code package. It determines when to restart a code package. */
  livenessProbe?: Array<ProbeOutput>;
  /** An array of readiness probes for a code package. It determines when to unpublish an endpoint. */
  readinessProbe?: Array<ProbeOutput>;
}

export interface ImageRegistryCredentialOutput {
  /** Docker image registry server, without protocol such as `http` and `https`. */
  server: string;
  /** The username for the private registry. */
  username: string;
  /** The type of the image registry password being given in password */
  passwordType?: "ClearText" | "KeyVaultReference" | "SecretValueReference";
  /** The password for the private registry. The password is required for create or update operations, however it is not returned in the get or list operations. Will be processed based on the type provided. */
  password?: string;
}

export interface EnvironmentVariableOutput {
  /** The type of the environment variable being given in value */
  type?: "ClearText" | "KeyVaultReference" | "SecretValueReference";
  /** The name of the environment variable. */
  name?: string;
  /** The value of the environment variable, will be processed based on the type provided. */
  value?: string;
}

export interface SettingOutput {
  /** The type of the setting being given in value */
  type?: "ClearText" | "KeyVaultReference" | "SecretValueReference";
  /** The name of the setting. */
  name?: string;
  /** The value of the setting, will be processed based on the type provided. */
  value?: string;
}

export interface ContainerLabelOutput {
  /** The name of the container label. */
  name: string;
  /** The value of the container label. */
  value: string;
}

export interface EndpointPropertiesOutput {
  /** The name of the endpoint. */
  name: string;
  /** Port used by the container. */
  port?: number;
}

export interface ResourceRequirementsOutput {
  /** Describes the requested resources for a given container. */
  requests: ResourceRequestsOutput;
  /** Describes the maximum limits on the resources for a given container. */
  limits?: ResourceLimitsOutput;
}

export interface ResourceRequestsOutput {
  /** The memory request in GB for this container. */
  memoryInGB: number;
  /** Requested number of CPU cores. At present, only full cores are supported. */
  cpu: number;
}

export interface ResourceLimitsOutput {
  /** The memory limit in GB. */
  memoryInGB?: number;
  /** CPU limits in cores. At present, only full cores are supported. */
  cpu?: number;
}

export interface VolumeReferenceOutput {
  /** Name of the volume being referenced. */
  name: string;
  /** The flag indicating whether the volume is read only. Default is 'false'. */
  readOnly?: boolean;
  /** The path within the container at which the volume should be mounted. Only valid path characters are allowed. */
  destinationPath: string;
}

export interface ApplicationScopedVolumeOutput extends VolumeReferenceOutput {
  /** Describes parameters for creating application-scoped volumes. */
  creationParameters: ApplicationScopedVolumeCreationParametersOutput;
}

export interface ApplicationScopedVolumeCreationParametersOutputBase {
  /** User readable description of the volume. */
  description?: string;
  kind: "ServiceFabricVolumeDisk";
}

export interface DiagnosticsRefOutput {
  /** Status of whether or not sinks are enabled. */
  enabled?: boolean;
  /** List of sinks to be used if enabled. References the list of sinks in DiagnosticsDescription. */
  sinkRefs?: Array<string>;
}

export interface ReliableCollectionsRefOutput {
  /** Name of ReliableCollection resource. Right now it's not used and you can use any string. */
  name: string;
  /** False (the default) if ReliableCollections state is persisted to disk as usual. True if you do not want to persist state, in which case replication is still enabled and you can use ReliableCollections as distributed cache. */
  doNotPersistState?: boolean;
}

export interface ContainerInstanceViewOutput {
  /** The number of times the container has been restarted. */
  restartCount?: number;
  /** Current container instance state. */
  currentState?: ContainerStateOutput;
  /** Previous container instance state. */
  previousState?: ContainerStateOutput;
  /** The events of this container instance. */
  events?: Array<ContainerEventOutput>;
}

export interface ContainerStateOutput {
  /** The state of this container */
  state?: string;
  /** Date/time when the container state started. */
  startTime?: string;
  /** The container exit code. */
  exitCode?: string;
  /** Date/time when the container state finished. */
  finishTime?: string;
  /** Human-readable status of this state. */
  detailStatus?: string;
}

export interface ContainerEventOutput {
  /** The name of the container event. */
  name?: string;
  /** The count of the event. */
  count?: number;
  /** Date/time of the first event. */
  firstTimestamp?: string;
  /** Date/time of the last event. */
  lastTimestamp?: string;
  /** The event message */
  message?: string;
  /** The event type. */
  type?: string;
}

export interface ProbeOutput {
  /** The initial delay in seconds to start executing probe once codepackage has started. */
  initialDelaySeconds?: number;
  /** Periodic seconds to execute probe. */
  periodSeconds?: number;
  /** Period after which probe is considered as failed if it hasn't completed successfully. */
  timeoutSeconds?: number;
  /** The count of successful probe executions after which probe is considered success. */
  successThreshold?: number;
  /** The count of failures after which probe is considered failed. */
  failureThreshold?: number;
  /** Exec command to run inside the container. */
  exec?: ProbeExecOutput;
  /** Http probe for the container. */
  httpGet?: ProbeHttpGetOutput;
  /** Tcp port to probe inside the container. */
  tcpSocket?: ProbeTcpSocketOutput;
}

export interface ProbeExecOutput {
  /** Comma separated command to run inside the container for example "sh, -c, echo hello world". */
  command: string;
}

export interface ProbeHttpGetOutput {
  /** Port to access for probe. */
  port: number;
  /** Path to access on the HTTP request. */
  path?: string;
  /** Host IP to connect to. */
  host?: string;
  /** Headers to set in the request. */
  httpHeaders?: Array<ProbeHttpGetHeadersOutput>;
  /** Scheme for the http probe. Can be Http or Https. */
  scheme?: "http" | "https";
}

export interface ProbeHttpGetHeadersOutput {
  /** The name of the header. */
  name: string;
  /** The value of the header. */
  value: string;
}

export interface ProbeTcpSocketOutput {
  /** Port to access for probe. */
  port: number;
}

export interface NetworkRefOutput {
  /** Name of the network */
  name?: string;
  /** A list of endpoints that are exposed on this network. */
  endpointRefs?: Array<EndpointRefOutput>;
}

export interface EndpointRefOutput {
  /** Name of the endpoint. */
  name?: string;
}

export interface ServicePropertiesOutput {
  /** User readable description of the service. */
  description?: string;
  /** The number of replicas of the service to create. Defaults to 1 if not specified. */
  replicaCount?: number;
  /** The execution policy of the service */
  executionPolicy?: ExecutionPolicyOutput;
  /** Auto scaling policies */
  autoScalingPolicies?: Array<AutoScalingPolicyOutput>;
  /** Status of the service. */
  status?: "Unknown" | "Ready" | "Upgrading" | "Creating" | "Deleting" | "Failed";
  /** Gives additional information about the current status of the service. */
  statusDetails?: string;
  /** Describes the health state of an application resource. */
  healthState?: "Invalid" | "Ok" | "Warning" | "Error" | "Unknown";
  /** When the service's health state is not 'Ok', this additional details from service fabric Health Manager for the user to know why the service is marked unhealthy. */
  unhealthyEvaluation?: string;
  /** The service identity list. */
  identityRefs?: Array<ServiceIdentityOutput>;
  /** Dns name of the service. */
  dnsName?: string;
}

export interface ExecutionPolicyOutputBase {
  type: "Default" | "RunToCompletion";
}

export interface AutoScalingPolicyOutput {
  /** The name of the auto scaling policy. */
  name: string;
  /** Determines when auto scaling operation will be invoked. */
  trigger: AutoScalingTriggerOutput;
  /** The mechanism that is used to scale when auto scaling operation is invoked. */
  mechanism: AutoScalingMechanismOutput;
}

export interface AutoScalingTriggerOutputBase {
  kind: "AverageLoad";
}

export interface AutoScalingMechanismOutputBase {
  kind: "AddRemoveReplica";
}

export interface ServiceIdentityOutput {
  /** The identity friendly name. */
  name?: string;
  /** The application identity name. */
  identityRef?: string;
}

export interface DiagnosticsDescriptionOutput {
  /** List of supported sinks that can be referenced. */
  sinks?: Array<DiagnosticsSinkPropertiesOutput>;
  /** Status of whether or not sinks are enabled. */
  enabled?: boolean;
  /** The sinks to be used if diagnostics is enabled. Sink choices can be overridden at the service and code package level. */
  defaultSinkRefs?: Array<string>;
}

export interface DiagnosticsSinkPropertiesOutputBase {
  /** Name of the sink. This value is referenced by DiagnosticsReferenceDescription */
  name?: string;
  /** A description of the sink. */
  description?: string;
  kind: "AzureInternalMonitoringPipeline";
}

export interface IdentityDescriptionOutput {
  /** the endpoint for the token service managing this identity */
  tokenServiceEndpoint?: string;
  /** the types of identities associated with this resource; currently restricted to 'SystemAssigned and UserAssigned' */
  type: string;
  /** the identifier of the tenant containing the application's identity. */
  tenantId?: string;
  /** the object identifier of the Service Principal of the identity associated with this resource. */
  principalId?: string;
  /** represents user assigned identities map. */
  userAssignedIdentities?: Record<string, IdentityItemDescriptionOutput>;
}

export interface IdentityItemDescriptionOutput {
  /** the object identifier of the Service Principal which this identity represents. */
  principalId?: string;
  /** the client identifier of the Service Principal which this identity represents. */
  clientId?: string;
}

export interface PagedApplicationResourceDescriptionListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** One page of the list. */
  Items?: Array<ApplicationResourceDescriptionOutput>;
}

export interface ApplicationResourceUpgradeProgressInfoOutput {
  /** Name of the Application resource. */
  Name?: string;
  /** The target application version for the application upgrade. */
  TargetApplicationTypeVersion?: string;
  /** The estimated UTC datetime when the upgrade started. */
  StartTimestampUtc?: string;
  /** The state of the application resource upgrade. */
  UpgradeState?:
    | "Invalid"
    | "ProvisioningTarget"
    | "RollingForward"
    | "UnprovisioningCurrent"
    | "CompletedRollforward"
    | "RollingBack"
    | "UnprovisioningTarget"
    | "CompletedRollback"
    | "Failed";
  /** The estimated percent of replicas are completed in the upgrade. */
  PercentCompleted?: string;
  /** List of service upgrade progresses. */
  ServiceUpgradeProgress?: Array<ServiceUpgradeProgressOutput>;
  /** The mode used to monitor health during a rolling upgrade. The values are UnmonitoredAuto, UnmonitoredManual, and Monitored. */
  RollingUpgradeMode?: "Invalid" | "UnmonitoredAuto" | "UnmonitoredManual" | "Monitored";
  /** The estimated amount of time that the overall upgrade elapsed. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  UpgradeDuration?: string;
  /** Additional detailed information about the status of the pending upgrade. */
  ApplicationUpgradeStatusDetails?: string;
  /** The maximum amount of time to block processing of an upgrade domain and prevent loss of availability when there are unexpected issues. When this timeout expires, processing of the upgrade domain will proceed regardless of availability loss issues. The timeout is reset at the start of each upgrade domain. Valid values are between 0 and 42949672925 inclusive. (unsigned 32-bit integer). */
  UpgradeReplicaSetCheckTimeoutInSeconds?: number;
  /** The estimated UTC datetime when the upgrade failed and FailureAction was executed. */
  FailureTimestampUtc?: string;
}

export interface ServiceUpgradeProgressOutput {
  /** Name of the Service resource. */
  ServiceName?: string;
  /** The number of replicas that completes the upgrade in the service. */
  CompletedReplicaCount?: string;
  /** The number of replicas that are waiting to be upgraded in the service. */
  PendingReplicaCount?: string;
}

export interface PagedServiceResourceDescriptionListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** One page of the list. */
  Items?: Array<ServiceResourceDescriptionOutput>;
}

export interface ServiceReplicaDescriptionOutput extends ServiceReplicaPropertiesOutput {
  /** Name of the replica. */
  replicaName: string;
}

export interface PagedServiceReplicaDescriptionListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** List of service resource replica description. */
  Items?: Array<ServiceReplicaDescriptionOutput>;
}

export interface GatewayResourceDescriptionOutput {
  /** Name of the Gateway resource. */
  name: string;
  /** Describes properties of a gateway resource. */
  properties: GatewayPropertiesOutput;
}

export interface GatewayPropertiesOutput {
  /** User readable description of the gateway. */
  description?: string;
  /** Network the gateway should listen on for requests. */
  sourceNetwork: NetworkRefOutput;
  /** Network that the Application is using. */
  destinationNetwork: NetworkRefOutput;
  /** Configuration for tcp connectivity for this gateway. */
  tcp?: Array<TcpConfigOutput>;
  /** Configuration for http connectivity for this gateway. */
  http?: Array<HttpConfigOutput>;
  /** Status of the resource. */
  status?: "Unknown" | "Ready" | "Upgrading" | "Creating" | "Deleting" | "Failed";
  /** Gives additional information about the current status of the gateway. */
  statusDetails?: string;
  /** IP address of the gateway. This is populated in the response and is ignored for incoming requests. */
  ipAddress?: string;
}

export interface TcpConfigOutput {
  /** tcp gateway config name. */
  name: string;
  /** Specifies the port at which the service endpoint below needs to be exposed. */
  port: number;
  /** Describes destination endpoint for routing traffic. */
  destination: GatewayDestinationOutput;
}

export interface GatewayDestinationOutput {
  /** Name of the service fabric Mesh application. */
  applicationName: string;
  /** service that contains the endpoint. */
  serviceName: string;
  /** name of the endpoint in the service. */
  endpointName: string;
}

export interface HttpConfigOutput {
  /** http gateway config name. */
  name: string;
  /** Specifies the port at which the service endpoint below needs to be exposed. */
  port: number;
  /** description for routing. */
  hosts: Array<HttpHostConfigOutput>;
}

export interface HttpHostConfigOutput {
  /** http hostname config name. */
  name: string;
  /** Route information to use for routing. Routes are processed in the order they are specified. Specify routes that are more specific before routes that can handle general cases. */
  routes: Array<HttpRouteConfigOutput>;
}

export interface HttpRouteConfigOutput {
  /** http route name. */
  name: string;
  /** Describes a rule for http route matching. */
  match: HttpRouteMatchRuleOutput;
  /** Describes destination endpoint for routing traffic. */
  destination: GatewayDestinationOutput;
}

export interface HttpRouteMatchRuleOutput {
  /** Path to match for routing. */
  path: HttpRouteMatchPathOutput;
  /** headers and their values to match in request. */
  headers?: Array<HttpRouteMatchHeaderOutput>;
}

export interface HttpRouteMatchPathOutput {
  /** Uri path to match for request. */
  value: string;
  /** replacement string for matched part of the Uri. */
  rewrite?: string;
  /** how to match value in the Uri */
  type: "prefix";
}

export interface HttpRouteMatchHeaderOutput {
  /** Name of header to match in request. */
  name: string;
  /** Value of header to match in request. */
  value?: string;
  /** how to match header value */
  type?: "exact";
}

export interface PagedGatewayResourceDescriptionListOutput {
  /** The continuation token parameter is used to obtain next set of results. The continuation token is included in the response of the API when the results from the system do not fit in a single response. When this value is passed to the next API call, the API returns next set of results. If there are no further results, then the continuation token is not included in the response. */
  ContinuationToken?: string;
  /** One page of the list. */
  Items?: Array<GatewayResourceDescriptionOutput>;
}

export interface AnalysisEventMetadataOutput {
  /** The analysis delay. */
  Delay?: string;
  /** The duration of analysis. */
  Duration?: string;
}

export interface ApplicationHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /** The name of the application, including the 'fabric:' URI scheme. */
  ApplicationName?: string;
  /** List of unhealthy evaluations that led to the current aggregated health state of the application. The types of the unhealthy evaluations can be DeployedApplicationsHealthEvaluation, ServicesHealthEvaluation or EventHealthEvaluation. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "Application";
}

export interface ApplicationsHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /** Maximum allowed percentage of unhealthy applications from the ClusterHealthPolicy. */
  MaxPercentUnhealthyApplications?: number;
  /** Total number of applications from the health store. */
  TotalCount?: number;
  /** List of unhealthy evaluations that led to the aggregated health state. Includes all the unhealthy ApplicationHealthEvaluation that impacted the aggregated health. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "Applications";
}

export interface ApplicationTypeApplicationsHealthEvaluationOutput
  extends HealthEvaluationOutputBase {
  /** The application type name as defined in the application manifest. */
  ApplicationTypeName?: string;
  /** Maximum allowed percentage of unhealthy applications for the application type, specified as an entry in ApplicationTypeHealthPolicyMap. */
  MaxPercentUnhealthyApplications?: number;
  /** Total number of applications of the application type found in the health store. */
  TotalCount?: number;
  /** List of unhealthy evaluations that led to the aggregated health state. Includes all the unhealthy ApplicationHealthEvaluation of this application type that impacted the aggregated health. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "ApplicationTypeApplications";
}

export interface DeltaNodesCheckHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /** Number of nodes with aggregated heath state Error in the health store at the beginning of the cluster upgrade. */
  BaselineErrorCount?: number;
  /** Total number of nodes in the health store at the beginning of the cluster upgrade. */
  BaselineTotalCount?: number;
  /** Maximum allowed percentage of delta unhealthy nodes from the ClusterUpgradeHealthPolicy. */
  MaxPercentDeltaUnhealthyNodes?: number;
  /** Total number of nodes in the health store. */
  TotalCount?: number;
  /**
   * List of unhealthy evaluations that led to the aggregated health state.
   * Includes all the unhealthy NodeHealthEvaluation that impacted the aggregated health.
   */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "DeltaNodesCheck";
}

export interface DeployedApplicationHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /** Name of the node where the application is deployed to. */
  NodeName?: string;
  /** The name of the application, including the 'fabric:' URI scheme. */
  ApplicationName?: string;
  /**
   * List of  unhealthy evaluations that led to the current aggregated health state of the deployed application.
   * The types of the unhealthy evaluations can be DeployedServicePackagesHealthEvaluation or EventHealthEvaluation.
   */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "DeployedApplication";
}

export interface DeployedApplicationsHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /** Maximum allowed percentage of unhealthy deployed applications from the ApplicationHealthPolicy. */
  MaxPercentUnhealthyDeployedApplications?: number;
  /** Total number of deployed applications of the application in the health store. */
  TotalCount?: number;
  /** List of unhealthy evaluations that led to the aggregated health state. Includes all the unhealthy DeployedApplicationHealthEvaluation that impacted the aggregated health. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "DeployedApplications";
}

export interface DeployedServicePackageHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /** The name of a Service Fabric node. */
  NodeName?: string;
  /** The name of the application, including the 'fabric:' URI scheme. */
  ApplicationName?: string;
  /** The name of the service manifest. */
  ServiceManifestName?: string;
  /** List of unhealthy evaluations that led to the current aggregated health state. The type of the unhealthy evaluations can be EventHealthEvaluation. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "DeployedServicePackage";
}

export interface DeployedServicePackagesHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /** Total number of deployed service packages of the deployed application in the health store. */
  TotalCount?: number;
  /** List of unhealthy evaluations that led to the aggregated health state. Includes all the unhealthy DeployedServicePackageHealthEvaluation that impacted the aggregated health. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "DeployedServicePackages";
}

export interface DeployedStatefulServiceReplicaInfoOutput
  extends DeployedServiceReplicaInfoOutputBase {
  /** Id of a stateful service replica. ReplicaId is used by Service Fabric to uniquely identify a replica of a partition. It is unique within a partition and does not change for the lifetime of the replica. If a replica gets dropped and another replica gets created on the same node for the same partition, it will get a different value for the id. Sometimes the id of a stateless service instance is also referred as a replica id. */
  ReplicaId?: string;
  /** The role of a replica of a stateful service. */
  ReplicaRole?:
    | "Unknown"
    | "None"
    | "Primary"
    | "IdleSecondary"
    | "ActiveSecondary"
    | "IdleAuxiliary"
    | "ActiveAuxiliary"
    | "PrimaryAuxiliary";
  /** Information about current reconfiguration like phase, type, previous configuration role of replica and reconfiguration start date time. */
  ReconfigurationInformation?: ReconfigurationInformationOutput;
  ServiceKind: "Stateful";
}

export interface ReconfigurationInformationOutput {
  /** Replica role before reconfiguration started. */
  PreviousConfigurationRole?:
    | "Unknown"
    | "None"
    | "Primary"
    | "IdleSecondary"
    | "ActiveSecondary"
    | "IdleAuxiliary"
    | "ActiveAuxiliary"
    | "PrimaryAuxiliary";
  /** Current phase of ongoing reconfiguration. If no reconfiguration is taking place then this value will be "None". */
  ReconfigurationPhase?:
    | "Unknown"
    | "None"
    | "Phase0"
    | "Phase1"
    | "Phase2"
    | "Phase3"
    | "Phase4"
    | "AbortPhaseZero";
  /** Type of current ongoing reconfiguration. If no reconfiguration is taking place then this value will be "None". */
  ReconfigurationType?: "Unknown" | "SwapPrimary" | "Failover" | "Other";
  /** Start time (in UTC) of the ongoing reconfiguration. If no reconfiguration is taking place then this value will be zero date-time. */
  ReconfigurationStartTimeUtc?: string;
}

export interface DeployedStatelessServiceInstanceInfoOutput
  extends DeployedServiceReplicaInfoOutputBase {
  /** Id of a stateless service instance. InstanceId is used by Service Fabric to uniquely identify an instance of a partition of a stateless service. It is unique within a partition and does not change for the lifetime of the instance. If the instance has failed over on the same or different node, it will get a different value for the InstanceId. */
  InstanceId?: string;
  ServiceKind: "Stateless";
}

export interface EventHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /** Indicates whether warnings are treated with the same severity as errors. The field is specified in the health policy used to evaluate the entity. */
  ConsiderWarningAsError?: boolean;
  /** Represents health information reported on a health entity, such as cluster, application or node, with additional metadata added by the Health Manager. */
  UnhealthyEvent?: HealthEventOutput;
  Kind: "Event";
}

export interface Int64RangePartitionInformationOutput extends PartitionInformationOutputBase {
  /** Specifies the minimum key value handled by this partition. */
  LowKey?: string;
  /** Specifies the maximum key value handled by this partition. */
  HighKey?: string;
  ServicePartitionKind: "Int64Range";
}

export interface NamedPartitionInformationOutput extends PartitionInformationOutputBase {
  /** Name of the partition. */
  Name?: string;
  ServicePartitionKind: "Named";
}

export interface NodeHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /** The name of a Service Fabric node. */
  NodeName?: string;
  /** List of unhealthy evaluations that led to the current aggregated health state of the node. The types of the unhealthy evaluations can be EventHealthEvaluation. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "Node";
}

export interface NodesHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /** Maximum allowed percentage of unhealthy nodes from the ClusterHealthPolicy. */
  MaxPercentUnhealthyNodes?: number;
  /** Total number of nodes found in the health store. */
  TotalCount?: number;
  /** List of unhealthy evaluations that led to the aggregated health state. Includes all the unhealthy NodeHealthEvaluation that impacted the aggregated health. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "Nodes";
}

export interface PartitionAnalysisEventOutputBase extends PartitionEventOutputBase {
  /** Metadata about an Analysis Event. */
  Metadata: AnalysisEventMetadataOutput;
  Kind: "PartitionAnalysisEvent" | "PartitionPrimaryMoveAnalysis";
}

export interface PartitionHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /**
   * Id of the partition whose health evaluation is described by this object.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
  /** List of unhealthy evaluations that led to the current aggregated health state of the partition. The types of the unhealthy evaluations can be ReplicasHealthEvaluation or EventHealthEvaluation. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "Partition";
}

export interface PartitionSafetyCheckOutputBase extends SafetyCheckOutputBase {
  /**
   * Id of the partition which is undergoing the safety check.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
  Kind:
    | "PartitionSafetyCheck"
    | "EnsureAvailability"
    | "EnsurePartitionQuorum"
    | "WaitForInbuildReplica"
    | "WaitForPrimaryPlacement"
    | "WaitForPrimarySwap"
    | "WaitForReconfiguration";
}

export interface EnsureAvailabilitySafetyCheckOutput extends PartitionSafetyCheckOutputBase {
  Kind: "EnsureAvailability";
}

export interface EnsurePartitionQuorumSafetyCheckOutput extends PartitionSafetyCheckOutputBase {
  Kind: "EnsurePartitionQuorum";
}

export interface SeedNodeSafetyCheckOutput extends SafetyCheckOutputBase {
  Kind: "EnsureSeedNodeQuorum";
}

export interface PartitionsHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /** Maximum allowed percentage of unhealthy partitions per service from the ServiceTypeHealthPolicy. */
  MaxPercentUnhealthyPartitionsPerService?: number;
  /** Total number of partitions of the service from the health store. */
  TotalCount?: number;
  /** List of unhealthy evaluations that led to the aggregated health state. Includes all the unhealthy PartitionHealthEvaluation that impacted the aggregated health. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "Partitions";
}

export interface ReplicaHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /**
   * Id of the partition to which the replica belongs.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
  /** Id of a stateful service replica or a stateless service instance. This ID is used in the queries that apply to both stateful and stateless services. It is used by Service Fabric to uniquely identify a replica of a partition of a stateful service or an instance of a stateless service partition. It is unique within a partition and does not change for the lifetime of the replica or the instance. If a stateful replica gets dropped and another replica gets created on the same node for the same partition, it will get a different value for the ID. If a stateless instance is failed over on the same or different node it will get a different value for the ID. */
  ReplicaOrInstanceId?: string;
  /** List of unhealthy evaluations that led to the current aggregated health state of the replica. The types of the unhealthy evaluations can be EventHealthEvaluation. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "Replica";
}

export interface ReplicasHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /** Maximum allowed percentage of unhealthy replicas per partition from the ApplicationHealthPolicy. */
  MaxPercentUnhealthyReplicasPerPartition?: number;
  /** Total number of replicas in the partition from the health store. */
  TotalCount?: number;
  /** List of unhealthy evaluations that led to the aggregated health state. Includes all the unhealthy ReplicaHealthEvaluation that impacted the aggregated health. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "Replicas";
}

export interface ServiceHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /** Name of the service whose health evaluation is described by this object. */
  ServiceName?: string;
  /** List of unhealthy evaluations that led to the current aggregated health state of the service. The types of the unhealthy evaluations can be PartitionsHealthEvaluation or EventHealthEvaluation. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "Service";
}

export interface ServicePlacementInvalidDomainPolicyDescriptionOutput
  extends ServicePlacementPolicyDescriptionOutputBase {
  /** The name of the domain that should not be used for placement. */
  DomainName?: string;
  Type: "InvalidDomain";
}

export interface ServicePlacementNonPartiallyPlaceServicePolicyDescriptionOutput
  extends ServicePlacementPolicyDescriptionOutputBase {
  Type: "NonPartiallyPlaceService";
}

export interface ServicePlacementAllowMultipleStatelessInstancesOnNodePolicyDescriptionOutput
  extends ServicePlacementPolicyDescriptionOutputBase {
  /** Holdover from other policy descriptions, not used for this policy, values are ignored by runtime. Keeping it for any backwards-compatibility with clients. */
  DomainName?: string;
  Type: "AllowMultipleStatelessInstancesOnNode";
}

export interface ServicePlacementPreferPrimaryDomainPolicyDescriptionOutput
  extends ServicePlacementPolicyDescriptionOutputBase {
  /** The name of the domain that should used for placement as per this policy. */
  DomainName?: string;
  Type: "PreferPrimaryDomain";
}

export interface ServicePlacementRequiredDomainPolicyDescriptionOutput
  extends ServicePlacementPolicyDescriptionOutputBase {
  /** The name of the domain that should used for placement as per this policy. */
  DomainName?: string;
  Type: "RequireDomain";
}

export interface ServicePlacementRequireDomainDistributionPolicyDescriptionOutput
  extends ServicePlacementPolicyDescriptionOutputBase {
  /** The name of the domain that should used for placement as per this policy. */
  DomainName?: string;
  Type: "RequireDomainDistribution";
}

export interface ServicesHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /** Name of the service type of the services. */
  ServiceTypeName?: string;
  /** Maximum allowed percentage of unhealthy services from the ServiceTypeHealthPolicy. */
  MaxPercentUnhealthyServices?: number;
  /** Total number of services of the current service type in the application from the health store. */
  TotalCount?: number;
  /** List of unhealthy evaluations that led to the aggregated health state. Includes all the unhealthy ServiceHealthEvaluation that impacted the aggregated health. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "Services";
}

export interface SingletonPartitionInformationOutput extends PartitionInformationOutputBase {
  ServicePartitionKind: "Singleton";
}

export interface StatefulServiceInfoOutput extends ServiceInfoOutputBase {
  /** Whether the service has persisted state. */
  HasPersistedState?: boolean;
  ServiceKind: "Stateful";
}

export interface StatefulServicePartitionInfoOutput extends ServicePartitionInfoOutputBase {
  /** The target replica set size as a number. */
  TargetReplicaSetSize?: number;
  /** The minimum replica set size as a number. */
  MinReplicaSetSize?: number;
  /** The auxiliary replica count as a number. To use Auxiliary replicas the following must be true, AuxiliaryReplicaCount < (TargetReplicaSetSize+1)/2 and TargetReplicaSetSize >=3. */
  AuxiliaryReplicaCount?: number;
  /** The duration for which this partition was in quorum loss. If the partition is currently in quorum loss, it returns the duration since it has been in that state. This field is using ISO8601 format for specifying the duration. */
  LastQuorumLossDuration?: string;
  /** An Epoch is a configuration number for the partition as a whole. When the configuration of the replica set changes, for example when the Primary replica changes, the operations that are replicated from the new Primary replica are said to be a new Epoch from the ones which were sent by the old Primary replica. */
  PrimaryEpoch?: EpochOutput;
  ServiceKind: "Stateful";
}

export interface StatefulServiceReplicaHealthOutput extends ReplicaHealthOutputBase {
  /** Id of a stateful service replica. ReplicaId is used by Service Fabric to uniquely identify a replica of a partition. It is unique within a partition and does not change for the lifetime of the replica. If a replica gets dropped and another replica gets created on the same node for the same partition, it will get a different value for the id. Sometimes the id of a stateless service instance is also referred as a replica id. */
  ReplicaId?: string;
  ServiceKind: "Stateful";
}

export interface StatefulServiceReplicaHealthStateOutput extends ReplicaHealthStateOutputBase {
  /** Id of a stateful service replica. ReplicaId is used by Service Fabric to uniquely identify a replica of a partition. It is unique within a partition and does not change for the lifetime of the replica. If a replica gets dropped and another replica gets created on the same node for the same partition, it will get a different value for the id. Sometimes the id of a stateless service instance is also referred as a replica id. */
  ReplicaId?: string;
  ServiceKind: "Stateful";
}

export interface StatefulServiceTypeDescriptionOutput extends ServiceTypeDescriptionOutputBase {
  /** A flag indicating whether this is a persistent service which stores states on the local disk. If it is then the value of this property is true, if not it is false. */
  HasPersistedState?: boolean;
  Kind: "Stateful";
}

export interface StatelessServiceInfoOutput extends ServiceInfoOutputBase {
  ServiceKind: "Stateless";
}

export interface StatelessServiceInstanceHealthOutput extends ReplicaHealthOutputBase {
  /** Id of a stateless service instance. InstanceId is used by Service Fabric to uniquely identify an instance of a partition of a stateless service. It is unique within a partition and does not change for the lifetime of the instance. If the instance has failed over on the same or different node, it will get a different value for the InstanceId. */
  InstanceId?: string;
  ServiceKind: "Stateless";
}

export interface StatelessServiceInstanceHealthStateOutput extends ReplicaHealthStateOutputBase {
  /** Id of the stateless service instance on the wire this field is called ReplicaId. */
  ReplicaId?: string;
  ServiceKind: "Stateless";
}

export interface StatelessServicePartitionInfoOutput extends ServicePartitionInfoOutputBase {
  /** Number of instances of this partition. */
  InstanceCount?: number;
  /**
   * MinInstanceCount is the minimum number of instances that must be up to meet the EnsureAvailability safety check during operations like upgrade or deactivate node.
   * The actual number that is used is max( MinInstanceCount, ceil( MinInstancePercentage/100.0 * InstanceCount) ).
   * Note, if InstanceCount is set to -1, during MinInstanceCount computation -1 is first converted into the number of nodes on which the instances are allowed to be placed according to the placement constraints on the service.
   */
  MinInstanceCount?: number;
  /**
   * MinInstancePercentage is the minimum percentage of InstanceCount that must be up to meet the EnsureAvailability safety check during operations like upgrade or deactivate node.
   * The actual number that is used is max( MinInstanceCount, ceil( MinInstancePercentage/100.0 * InstanceCount) ).
   * Note, if InstanceCount is set to -1, during MinInstancePercentage computation, -1 is first converted into the number of nodes on which the instances are allowed to be placed according to the placement constraints on the service.
   */
  MinInstancePercentage?: number;
  ServiceKind: "Stateless";
}

export interface StatelessServiceTypeDescriptionOutput extends ServiceTypeDescriptionOutputBase {
  /** A flag indicating if this type is not implemented and hosted by a user service process, but is implicitly hosted by a system created process. This value is true for services using the guest executable services, false otherwise. */
  UseImplicitHost?: boolean;
  Kind: "Stateless";
}

export interface SystemApplicationHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /** List of unhealthy evaluations that led to the current aggregated health state of the system application. The types of the unhealthy evaluations can be DeployedApplicationsHealthEvaluation, ServicesHealthEvaluation or EventHealthEvaluation. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "SystemApplication";
}

export interface UpgradeDomainDeltaNodesCheckHealthEvaluationOutput
  extends HealthEvaluationOutputBase {
  /** Name of the upgrade domain where nodes health is currently evaluated. */
  UpgradeDomainName?: string;
  /** Number of upgrade domain nodes with aggregated heath state Error in the health store at the beginning of the cluster upgrade. */
  BaselineErrorCount?: number;
  /** Total number of upgrade domain nodes in the health store at the beginning of the cluster upgrade. */
  BaselineTotalCount?: number;
  /** Maximum allowed percentage of upgrade domain delta unhealthy nodes from the ClusterUpgradeHealthPolicy. */
  MaxPercentDeltaUnhealthyNodes?: number;
  /** Total number of upgrade domain nodes in the health store. */
  TotalCount?: number;
  /** List of unhealthy evaluations that led to the aggregated health state. Includes all the unhealthy NodeHealthEvaluation that impacted the aggregated health. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "UpgradeDomainDeltaNodesCheck";
}

export interface UpgradeDomainDeployedApplicationsHealthEvaluationOutput
  extends HealthEvaluationOutputBase {
  /** Name of the upgrade domain where deployed applications health is currently evaluated. */
  UpgradeDomainName?: string;
  /** Maximum allowed percentage of unhealthy deployed applications from the ClusterHealthPolicy. */
  MaxPercentUnhealthyDeployedApplications?: number;
  /** Total number of deployed applications in the current upgrade domain. */
  TotalCount?: number;
  /** List of unhealthy evaluations that led to the aggregated health state. Includes all the unhealthy DeployedApplicationHealthEvaluation that impacted the aggregated health. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "UpgradeDomainDeployedApplications";
}

export interface UpgradeDomainNodesHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /** Name of the upgrade domain where nodes health is currently evaluated. */
  UpgradeDomainName?: string;
  /** Maximum allowed percentage of unhealthy nodes from the ClusterHealthPolicy. */
  MaxPercentUnhealthyNodes?: number;
  /** Total number of nodes in the current upgrade domain. */
  TotalCount?: number;
  /** List of unhealthy evaluations that led to the aggregated health state. Includes all the unhealthy NodeHealthEvaluation that impacted the aggregated health. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "UpgradeDomainNodes";
}

export interface WaitForInbuildReplicaSafetyCheckOutput extends PartitionSafetyCheckOutputBase {
  Kind: "WaitForInbuildReplica";
}

export interface WaitForPrimaryPlacementSafetyCheckOutput extends PartitionSafetyCheckOutputBase {
  Kind: "WaitForPrimaryPlacement";
}

export interface WaitForPrimarySwapSafetyCheckOutput extends PartitionSafetyCheckOutputBase {
  Kind: "WaitForPrimarySwap";
}

export interface WaitForReconfigurationSafetyCheckOutput extends PartitionSafetyCheckOutputBase {
  Kind: "WaitForReconfiguration";
}

export interface StatefulServiceReplicaInfoOutput extends ReplicaInfoOutputBase {
  /** The role of a replica of a stateful service. */
  ReplicaRole?:
    | "Unknown"
    | "None"
    | "Primary"
    | "IdleSecondary"
    | "ActiveSecondary"
    | "IdleAuxiliary"
    | "ActiveAuxiliary"
    | "PrimaryAuxiliary";
  /** Id of a stateful service replica. ReplicaId is used by Service Fabric to uniquely identify a replica of a partition. It is unique within a partition and does not change for the lifetime of the replica. If a replica gets dropped and another replica gets created on the same node for the same partition, it will get a different value for the id. Sometimes the id of a stateless service instance is also referred as a replica id. */
  ReplicaId?: string;
  ServiceKind: "Stateful";
}

export interface StatelessServiceInstanceInfoOutput extends ReplicaInfoOutputBase {
  /** Id of a stateless service instance. InstanceId is used by Service Fabric to uniquely identify an instance of a partition of a stateless service. It is unique within a partition and does not change for the lifetime of the instance. If the instance has failed over on the same or different node, it will get a different value for the InstanceId. */
  InstanceId?: string;
  ServiceKind: "Stateless";
}

export interface ExecutingFaultsChaosEventOutput extends ChaosEventOutputBase {
  /** List of string description of the faults that Chaos decided to execute in an iteration. */
  Faults?: Array<string>;
  Kind: "ExecutingFaults";
}

export interface StartedChaosEventOutput extends ChaosEventOutputBase {
  /** Defines all the parameters to configure a Chaos run. */
  ChaosParameters?: ChaosParametersOutput;
  Kind: "Started";
}

export interface StoppedChaosEventOutput extends ChaosEventOutputBase {
  /** Describes why Chaos stopped. Chaos can stop because of StopChaos API call or the timeToRun provided in ChaosParameters is over. */
  Reason?: string;
  Kind: "Stopped";
}

export interface TestErrorChaosEventOutput extends ChaosEventOutputBase {
  /** Describes why TestErrorChaosEvent was generated. For example, Chaos tries to fault a partition but finds that the partition is no longer fault tolerant, then a TestErrorEvent gets generated with the reason stating that the partition is not fault tolerant. */
  Reason?: string;
  Kind: "TestError";
}

export interface ValidationFailedChaosEventOutput extends ChaosEventOutputBase {
  /** Describes why the ValidationFailedChaosEvent was generated. This may happen because more than MaxPercentUnhealthyNodes are unhealthy for more than MaxClusterStabilizationTimeout. This reason will be in the Reason property of the ValidationFailedChaosEvent as a string. */
  Reason?: string;
  Kind: "ValidationFailed";
}

export interface WaitingChaosEventOutput extends ChaosEventOutputBase {
  /** Describes why the WaitingChaosEvent was generated, for example, due to a cluster upgrade. */
  Reason?: string;
  Kind: "Waiting";
}

export interface NamedPartitionSchemeDescriptionOutput
  extends PartitionSchemeDescriptionOutputBase {
  /** The number of partitions. */
  Count: number;
  /** Array of size specified by the ‘Count’ parameter, for the names of the partitions. */
  Names: Array<string>;
  PartitionScheme: "Named";
}

export interface SingletonPartitionSchemeDescriptionOutput
  extends PartitionSchemeDescriptionOutputBase {
  PartitionScheme: "Singleton";
}

export interface UniformInt64RangePartitionSchemeDescriptionOutput
  extends PartitionSchemeDescriptionOutputBase {
  /** The number of partitions. */
  Count: number;
  /**
   * String indicating the lower bound of the partition key range that
   * should be split between the partitions.
   */
  LowKey: string;
  /**
   * String indicating the upper bound of the partition key range that
   * should be split between the partitions.
   */
  HighKey: string;
  PartitionScheme: "UniformInt64Range";
}

export interface StatefulServiceDescriptionOutput extends ServiceDescriptionOutputBase {
  /** The target replica set size as a number. */
  TargetReplicaSetSize: number;
  /** The minimum replica set size as a number. */
  MinReplicaSetSize: number;
  /** A flag indicating whether this is a persistent service which stores states on the local disk. If it is then the value of this property is true, if not it is false. */
  HasPersistedState: boolean;
  /**
   * Flags indicating whether other properties are set. Each of the associated properties corresponds to a flag, specified below, which, if set, indicate that the property is specified.
   * This property can be a combination of those flags obtained using bitwise 'OR' operator.
   * For example, if the provided value is 6 then the flags for QuorumLossWaitDuration (2) and StandByReplicaKeepDuration(4) are set.
   *
   * - None - Does not indicate any other properties are set. The value is zero.
   * - ReplicaRestartWaitDuration - Indicates the ReplicaRestartWaitDuration property is set. The value is 1.
   * - QuorumLossWaitDuration - Indicates the QuorumLossWaitDuration property is set. The value is 2.
   * - StandByReplicaKeepDuration - Indicates the StandByReplicaKeepDuration property is set. The value is 4.
   * - ServicePlacementTimeLimit - Indicates the ServicePlacementTimeLimit property is set. The value is 8.
   * - DropSourceReplicaOnMove - Indicates the DropSourceReplicaOnMove property is set. The value is 16.
   */
  Flags?: number;
  /** The duration, in seconds, between when a replica goes down and when a new replica is created. */
  ReplicaRestartWaitDurationSeconds?: number;
  /** The maximum duration, in seconds, for which a partition is allowed to be in a state of quorum loss. */
  QuorumLossWaitDurationSeconds?: number;
  /** The definition on how long StandBy replicas should be maintained before being removed. */
  StandByReplicaKeepDurationSeconds?: number;
  /** The duration for which replicas can stay InBuild before reporting that build is stuck. */
  ServicePlacementTimeLimitSeconds?: number;
  /** Indicates whether to drop source Secondary replica even if the target replica has not finished build. If desired behavior is to drop it as soon as possible the value of this property is true, if not it is false. */
  DropSourceReplicaOnMove?: boolean;
  /** Defines how replicas of this service will behave during their lifecycle. */
  ReplicaLifecycleDescription?: ReplicaLifecycleDescriptionOutput;
  /** The auxiliary replica count as a number. To use Auxiliary replicas, the following must be true: AuxiliaryReplicaCount < (TargetReplicaSetSize+1)/2 and TargetReplicaSetSize >=3. */
  AuxiliaryReplicaCount?: number;
  ServiceKind: "Stateful";
}

export interface ReplicaLifecycleDescriptionOutput {
  /** If set to true, replicas with a target replica set size of 1 will be permitted to move during upgrade. */
  IsSingletonReplicaMoveAllowedDuringUpgrade?: boolean;
  /** If set to true, move/swap replica to original location after upgrade. */
  RestoreReplicaLocationAfterUpgrade?: boolean;
}

export interface StatelessServiceDescriptionOutput extends ServiceDescriptionOutputBase {
  /** The instance count. */
  InstanceCount: number;
  /**
   * MinInstanceCount is the minimum number of instances that must be up to meet the EnsureAvailability safety check during operations like upgrade or deactivate node.
   * The actual number that is used is max( MinInstanceCount, ceil( MinInstancePercentage/100.0 * InstanceCount) ).
   * Note, if InstanceCount is set to -1, during MinInstanceCount computation -1 is first converted into the number of nodes on which the instances are allowed to be placed according to the placement constraints on the service.
   */
  MinInstanceCount?: number;
  /**
   * MinInstancePercentage is the minimum percentage of InstanceCount that must be up to meet the EnsureAvailability safety check during operations like upgrade or deactivate node.
   * The actual number that is used is max( MinInstanceCount, ceil( MinInstancePercentage/100.0 * InstanceCount) ).
   * Note, if InstanceCount is set to -1, during MinInstancePercentage computation, -1 is first converted into the number of nodes on which the instances are allowed to be placed according to the placement constraints on the service.
   */
  MinInstancePercentage?: number;
  /**
   * Flags indicating whether other properties are set. Each of the associated properties corresponds to a flag, specified below, which, if set, indicate that the property is specified.
   * This property can be a combination of those flags obtained using bitwise 'OR' operator.
   * For example, if the provided value is 1 then the flags for InstanceCloseDelayDuration is set.
   *
   * - None - Does not indicate any other properties are set. The value is zero.
   * - InstanceCloseDelayDuration - Indicates the InstanceCloseDelayDuration property is set. The value is 1.
   * - InstanceRestartWaitDuration - Indicates the InstanceRestartWaitDurationSeconds property is set. The value is 2.
   */
  Flags?: number;
  /**
   * Duration in seconds, to wait before a stateless instance is closed, to allow the active requests to drain gracefully. This would be effective when the instance is closing during the application/cluster upgrade and disabling node.
   * The endpoint exposed on this instance is removed prior to starting the delay, which prevents new connections to this instance.
   * In addition, clients that have subscribed to service endpoint change events(https://docs.microsoft.com/dotnet/api/system.fabric.fabricclient.servicemanagementclient.registerservicenotificationfilterasync), can do
   * the following upon receiving the endpoint removal notification:
   *     - Stop sending new requests to this instance.
   *     - Close existing connections after in-flight requests have completed.
   *     - Connect to a different instance of the service partition for future requests.
   * Note, the default value of InstanceCloseDelayDuration is 0, which indicates that there won't be any delay or removal of the endpoint prior to closing the instance.
   */
  InstanceCloseDelayDurationSeconds?: number;
  /** Defines how instances of this service will behave during their lifecycle. */
  InstanceLifecycleDescription?: InstanceLifecycleDescriptionOutput;
  /**
   * When a stateless instance goes down, this timer starts. When it expires Service Fabric will create a new instance on any node in the cluster.
   * This configuration is to reduce unnecessary creation of a new instance in situations where the instance going down is likely to recover in a short time. For example, during an upgrade.
   * The default value is 0, which indicates that when stateless instance goes down, Service Fabric will immediately start building its replacement.
   */
  InstanceRestartWaitDurationSeconds?: number;
  ServiceKind: "Stateless";
}

export interface InstanceLifecycleDescriptionOutput {
  /** If set to true, move/swap replica to original location after upgrade. */
  RestoreReplicaLocationAfterUpgrade?: boolean;
}

export interface ReplicatorQueueStatusOutput {
  /** Represents the utilization of the queue. A value of 0 indicates that the queue is empty and a value of 100 indicates the queue is full. */
  QueueUtilizationPercentage?: number;
  /** Represents the virtual memory consumed by the queue in bytes. */
  QueueMemorySize?: string;
  /**
   * On a primary replicator, this is semantically the sequence number of the operation for which all the secondary replicas have sent an acknowledgement.
   * On a secondary replicator, this is the smallest sequence number of the operation that is present in the queue.
   */
  FirstSequenceNumber?: string;
  /**
   * On a primary replicator, this is semantically the highest sequence number of the operation for which all the secondary replicas have sent an acknowledgement.
   * On a secondary replicator, this is semantically the highest sequence number that has been applied to the persistent state.
   */
  CompletedSequenceNumber?: string;
  /**
   * On a primary replicator, this is semantically the highest sequence number of the operation for which a write quorum of the secondary replicas have sent an acknowledgement.
   * On a secondary replicator, this is semantically the highest sequence number of the in-order operation received from the primary.
   */
  CommittedSequenceNumber?: string;
  /** Represents the latest sequence number of the operation that is available in the queue. */
  LastSequenceNumber?: string;
}

export interface ReplicatorStatusOutputBase {
  Kind: "Primary" | "SecondaryReplicatorStatus" | "ActiveSecondary" | "IdleSecondary";
}

export interface PrimaryReplicatorStatusOutput extends ReplicatorStatusOutputBase {
  /** Details about the replication queue on the primary replicator. */
  ReplicationQueueStatus?: ReplicatorQueueStatusOutput;
  /** The status of all the active and idle secondary replicators that the primary is aware of. */
  RemoteReplicators?: Array<RemoteReplicatorStatusOutput>;
  Kind: "Primary";
}

export interface RemoteReplicatorStatusOutput {
  /** Represents the replica ID of the remote secondary replicator. */
  ReplicaId?: string;
  /**
   * The last timestamp (in UTC) when an acknowledgement from the secondary replicator was processed on the primary.
   * UTC 0 represents an invalid value, indicating that no acknowledgement messages were ever processed.
   */
  LastAcknowledgementProcessedTimeUtc?: string;
  /** The highest replication operation sequence number that the secondary has received from the primary. */
  LastReceivedReplicationSequenceNumber?: string;
  /** The highest replication operation sequence number that the secondary has applied to its state. */
  LastAppliedReplicationSequenceNumber?: string;
  /** A value that indicates whether the secondary replica is in the process of being built. */
  IsInBuild?: boolean;
  /**
   * The highest copy operation sequence number that the secondary has received from the primary.
   * A value of -1 implies that the secondary has received all copy operations.
   */
  LastReceivedCopySequenceNumber?: string;
  /**
   * The highest copy operation sequence number that the secondary has applied to its state.
   * A value of -1 implies that the secondary has applied all copy operations and the copy process is complete.
   */
  LastAppliedCopySequenceNumber?: string;
  /** Represents the acknowledgment status for the remote secondary replicator. */
  RemoteReplicatorAcknowledgementStatus?: RemoteReplicatorAcknowledgementStatusOutput;
}

export interface RemoteReplicatorAcknowledgementStatusOutput {
  /** Details about the acknowledgements for operations that are part of the replication stream data. */
  ReplicationStreamAcknowledgementDetail?: RemoteReplicatorAcknowledgementDetailOutput;
  /** Details about the acknowledgements for operations that are part of the copy stream data. */
  CopyStreamAcknowledgementDetail?: RemoteReplicatorAcknowledgementDetailOutput;
}

export interface RemoteReplicatorAcknowledgementDetailOutput {
  /** Represents the average duration it takes for the remote replicator to receive an operation. */
  AverageReceiveDuration?: string;
  /** Represents the average duration it takes for the remote replicator to apply an operation. This usually entails writing the operation to disk. */
  AverageApplyDuration?: string;
  /** Represents the number of operations not yet received by a remote replicator. */
  NotReceivedCount?: string;
  /** Represents the number of operations received and not yet applied by a remote replicator. */
  ReceivedAndNotAppliedCount?: string;
}

export interface SecondaryReplicatorStatusOutputBase extends ReplicatorStatusOutputBase {
  /** Details about the replication queue on the secondary replicator. */
  ReplicationQueueStatus?: ReplicatorQueueStatusOutput;
  /**
   * The last time-stamp (UTC) at which a replication operation was received from the primary.
   * UTC 0 represents an invalid value, indicating that a replication operation message was never received.
   */
  LastReplicationOperationReceivedTimeUtc?: string;
  /** Value that indicates whether the replica is currently being built. */
  IsInBuild?: boolean;
  /** Details about the copy queue on the secondary replicator. */
  CopyQueueStatus?: ReplicatorQueueStatusOutput;
  /**
   * The last time-stamp (UTC) at which a copy operation was received from the primary.
   * UTC 0 represents an invalid value, indicating that a copy operation message was never received.
   */
  LastCopyOperationReceivedTimeUtc?: string;
  /**
   * The last time-stamp (UTC) at which an acknowledgment was sent to the primary replicator.
   * UTC 0 represents an invalid value, indicating that an acknowledgment message was never sent.
   */
  LastAcknowledgementSentTimeUtc?: string;
  Kind: "SecondaryReplicatorStatus" | "ActiveSecondary" | "IdleSecondary";
}

export interface SecondaryActiveReplicatorStatusOutput extends SecondaryReplicatorStatusOutputBase {
  Kind: "ActiveSecondary";
}

export interface SecondaryIdleReplicatorStatusOutput extends SecondaryReplicatorStatusOutputBase {
  Kind: "IdleSecondary";
}

export interface DeployedStatefulServiceReplicaDetailInfoOutput
  extends DeployedServiceReplicaDetailInfoOutputBase {
  /** Id of a stateful service replica. ReplicaId is used by Service Fabric to uniquely identify a replica of a partition. It is unique within a partition and does not change for the lifetime of the replica. If a replica gets dropped and another replica gets created on the same node for the same partition, it will get a different value for the id. Sometimes the id of a stateless service instance is also referred as a replica id. */
  ReplicaId?: string;
  /** Specifies the operation currently being executed by the Replicator. */
  CurrentReplicatorOperation?:
    | "Invalid"
    | "None"
    | "Open"
    | "ChangeRole"
    | "UpdateEpoch"
    | "Close"
    | "Abort"
    | "OnDataLoss"
    | "WaitForCatchup"
    | "Build";
  /** Specifies the access status of the partition. */
  ReadStatus?: "Invalid" | "Granted" | "ReconfigurationPending" | "NotPrimary" | "NoWriteQuorum";
  /** Specifies the access status of the partition. */
  WriteStatus?: "Invalid" | "Granted" | "ReconfigurationPending" | "NotPrimary" | "NoWriteQuorum";
  /**
   * Represents a base class for primary or secondary replicator status.
   * Contains information about the service fabric replicator like the replication/copy queue utilization, last acknowledgement received timestamp, etc.
   */
  ReplicatorStatus?: ReplicatorStatusOutput;
  /** Key value store related information for the replica. */
  ReplicaStatus?: KeyValueStoreReplicaStatusOutput;
  /** Information about a stateful service replica deployed on a node. */
  DeployedServiceReplicaQueryResult?: DeployedStatefulServiceReplicaInfoOutput;
  ServiceKind: "Stateful";
}

export interface KeyValueStoreReplicaStatusOutput extends ReplicaStatusBaseOutputBase {
  /** Value indicating the estimated number of rows in the underlying database. */
  DatabaseRowCountEstimate?: string;
  /** Value indicating the estimated size of the underlying database. */
  DatabaseLogicalSizeEstimate?: string;
  /** Value indicating the latest key-prefix filter applied to enumeration during the callback. Null if there is no pending callback. */
  CopyNotificationCurrentKeyFilter?: string;
  /** Value indicating the latest number of keys enumerated during the callback. 0 if there is no pending callback. */
  CopyNotificationCurrentProgress?: string;
  /** Value indicating the current status details of the replica. */
  StatusDetails?: string;
  Kind: "KeyValueStore";
}

export interface ReplicaStatusBaseOutputBase {
  Kind: "KeyValueStore";
}

export interface DeployedStatelessServiceInstanceDetailInfoOutput
  extends DeployedServiceReplicaDetailInfoOutputBase {
  /** Id of a stateless service instance. InstanceId is used by Service Fabric to uniquely identify an instance of a partition of a stateless service. It is unique within a partition and does not change for the lifetime of the instance. If the instance has failed over on the same or different node, it will get a different value for the InstanceId. */
  InstanceId?: string;
  /** Information about a stateless service instance deployed on a node. */
  DeployedServiceReplicaQueryResult?: DeployedStatelessServiceInstanceInfoOutput;
  ServiceKind: "Stateless";
}

export interface BinaryPropertyValueOutput extends PropertyValueOutputBase {
  /** Array of bytes to be sent as an integer array. Each element of array is a number between 0 and 255. */
  Data: Array<number>;
  Kind: "Binary";
}

export interface Int64PropertyValueOutput extends PropertyValueOutputBase {
  /** The data of the property value. */
  Data: string;
  Kind: "Int64";
}

export interface DoublePropertyValueOutput extends PropertyValueOutputBase {
  /** The data of the property value. */
  Data: number;
  Kind: "Double";
}

export interface StringPropertyValueOutput extends PropertyValueOutputBase {
  /** The data of the property value. */
  Data: string;
  Kind: "String";
}

export interface GuidPropertyValueOutput extends PropertyValueOutputBase {
  /**
   * The data of the property value.
   *
   * Value may contain a UUID
   */
  Data: string;
  Kind: "Guid";
}

export interface BasicRetentionPolicyDescriptionOutput
  extends RetentionPolicyDescriptionOutputBase {
  /** It is the minimum duration for which a backup created, will remain stored in the storage and might get deleted after that span of time. It should be specified in ISO8601 format. */
  RetentionDuration: string;
  /** It is the minimum number of backups to be retained at any point of time. If specified with a non zero value, backups will not be deleted even if the backups have gone past retention duration and have number of backups less than or equal to it. */
  MinimumNumberOfBackups?: number;
  RetentionPolicyType: "Basic";
}

export interface ApplicationBackupConfigurationInfoOutput
  extends BackupConfigurationInfoOutputBase {
  /** The name of the application, including the 'fabric:' URI scheme. */
  ApplicationName?: string;
  Kind: "Application";
}

export interface ServiceBackupConfigurationInfoOutput extends BackupConfigurationInfoOutputBase {
  /** The full name of the service with 'fabric:' URI scheme. */
  ServiceName?: string;
  Kind: "Service";
}

export interface AzureBlobBackupStorageDescriptionOutput
  extends BackupStorageDescriptionOutputBase {
  /** The connection string to connect to the Azure blob store. */
  ConnectionString: string;
  /** The name of the container in the blob store to store and enumerate backups from. */
  ContainerName: string;
  StorageKind: "AzureBlobStore";
}

export interface FileShareBackupStorageDescriptionOutput
  extends BackupStorageDescriptionOutputBase {
  /** UNC path of the file share where to store or enumerate backups from. */
  Path: string;
  /** Primary user name to access the file share. */
  PrimaryUserName?: string;
  /** Primary password to access the share location. */
  PrimaryPassword?: string;
  /** Secondary user name to access the file share. */
  SecondaryUserName?: string;
  /** Secondary password to access the share location */
  SecondaryPassword?: string;
  StorageKind: "FileShare";
}

export interface DsmsAzureBlobBackupStorageDescriptionOutput
  extends BackupStorageDescriptionOutputBase {
  /** The source location of the storage credentials to connect to the Dsms Azure blob store. */
  StorageCredentialsSourceLocation: string;
  /** The name of the container in the blob store to store and enumerate backups from. */
  ContainerName: string;
  StorageKind: "DsmsAzureBlobStore";
}

export interface ManagedIdentityAzureBlobBackupStorageDescriptionOutput
  extends BackupStorageDescriptionOutputBase {
  /** The type of managed identity to be used to connect to Azure Blob Store via Managed Identity. */
  ManagedIdentityType: "Invalid" | "VMSS" | "Cluster";
  /** The Blob Service Uri to connect to the Azure blob store.. */
  BlobServiceUri: string;
  /** The name of the container in the blob store to store and enumerate backups from. */
  ContainerName: string;
  StorageKind: "ManagedIdentityAzureBlobStore";
}

export interface FrequencyBasedBackupScheduleDescriptionOutput
  extends BackupScheduleDescriptionOutputBase {
  /** Defines the interval with which backups are periodically taken. It should be specified in ISO8601 format. Timespan in seconds is not supported and will be ignored while creating the policy. */
  Interval: string;
  ScheduleKind: "FrequencyBased";
}

export interface TimeBasedBackupScheduleDescriptionOutput
  extends BackupScheduleDescriptionOutputBase {
  /** Describes the frequency with which to run the time based backup schedule. */
  ScheduleFrequencyType: "Invalid" | "Daily" | "Weekly";
  /** List of days of a week when to trigger the periodic backup. This is valid only when the backup schedule frequency type is weekly. */
  RunDays?: Array<
    "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"
  >;
  /** Represents the list of exact time during the day in ISO8601 format. Like '19:00:00' will represent '7PM' during the day. Date specified along with time will be ignored. */
  RunTimes: Array<string>;
  ScheduleKind: "TimeBased";
}

export interface ApplicationBackupEntityOutput extends BackupEntityOutputBase {
  /** The name of the application, including the 'fabric:' URI scheme. */
  ApplicationName?: string;
  EntityKind: "Application";
}

export interface ServiceBackupEntityOutput extends BackupEntityOutputBase {
  /** The full name of the service with 'fabric:' URI scheme. */
  ServiceName?: string;
  EntityKind: "Service";
}

export interface PartitionBackupEntityOutput extends BackupEntityOutputBase {
  /** The full name of the service with 'fabric:' URI scheme. */
  ServiceName?: string;
  /**
   * The partition ID identifying the partition.
   *
   * Value may contain a UUID
   */
  PartitionId?: string;
  EntityKind: "Partition";
}

export interface NodeImpactOutput {
  /** The name of the impacted node. */
  NodeName: string;
  /** The level of impact expected. */
  ImpactLevel?: "Invalid" | "None" | "Restart" | "RemoveData" | "RemoveNode";
}

export interface NodeRepairImpactDescriptionOutput extends RepairImpactDescriptionBaseOutputBase {
  /** The list of nodes impacted by a repair action and their respective expected impact. */
  NodeImpactList?: Array<NodeImpactOutput>;
  Kind: "Node";
}

export interface NodeRepairTargetDescriptionOutput extends RepairTargetDescriptionBaseOutputBase {
  /** The list of nodes targeted by a repair action. */
  NodeNames?: Array<string>;
  Kind: "Node";
}

export interface AveragePartitionLoadScalingTriggerOutput
  extends ScalingTriggerDescriptionOutputBase {
  /** The name of the metric for which usage should be tracked. */
  MetricName: string;
  /** The lower limit of the load below which a scale in operation should be performed. */
  LowerLoadThreshold: string;
  /** The upper limit of the load beyond which a scale out operation should be performed. */
  UpperLoadThreshold: string;
  /** The period in seconds on which a decision is made whether to scale or not. */
  ScaleIntervalInSeconds: number;
  Kind: "AveragePartitionLoad";
}

export interface AverageServiceLoadScalingTriggerOutput
  extends ScalingTriggerDescriptionOutputBase {
  /** The name of the metric for which usage should be tracked. */
  MetricName: string;
  /** The lower limit of the load below which a scale in operation should be performed. */
  LowerLoadThreshold: string;
  /** The upper limit of the load beyond which a scale out operation should be performed. */
  UpperLoadThreshold: string;
  /** The period in seconds on which a decision is made whether to scale or not. */
  ScaleIntervalInSeconds: number;
  /**
   * Flag determines whether only the load of primary replica should be considered for scaling.
   * If set to true, then trigger will only consider the load of primary replicas of stateful service.
   * If set to false, trigger will consider load of all replicas.
   * This parameter cannot be set to true for stateless service.
   */
  UseOnlyPrimaryLoad: boolean;
  Kind: "AverageServiceLoad";
}

export interface PartitionInstanceCountScaleMechanismOutput
  extends ScalingMechanismDescriptionOutputBase {
  /** Minimum number of instances of the partition. */
  MinInstanceCount: number;
  /** Maximum number of instances of the partition. */
  MaxInstanceCount: number;
  /** The number of instances to add or remove during a scaling operation. */
  ScaleIncrement: number;
  Kind: "PartitionInstanceCount";
}

export interface AddRemoveIncrementalNamedPartitionScalingMechanismOutput
  extends ScalingMechanismDescriptionOutputBase {
  /** Minimum number of named partitions of the service. */
  MinPartitionCount: number;
  /** Maximum number of named partitions of the service. */
  MaxPartitionCount: number;
  /** The number of instances to add or remove during a scaling operation. */
  ScaleIncrement: number;
  Kind: "AddRemoveIncrementalNamedPartition";
}

export interface ApplicationCreatedEventOutput extends ApplicationEventOutputBase {
  /** Application type name. */
  ApplicationTypeName: string;
  /** Application type version. */
  ApplicationTypeVersion: string;
  /** Application definition kind. */
  ApplicationDefinitionKind: string;
  Kind: "ApplicationCreated";
}

export interface ApplicationDeletedEventOutput extends ApplicationEventOutputBase {
  /** Application type name. */
  ApplicationTypeName: string;
  /** Application type version. */
  ApplicationTypeVersion: string;
  Kind: "ApplicationDeleted";
}

export interface ApplicationNewHealthReportEventOutput extends ApplicationEventOutputBase {
  /** Id of Application instance. */
  ApplicationInstanceId: number;
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "ApplicationNewHealthReport";
}

export interface ApplicationHealthReportExpiredEventOutput extends ApplicationEventOutputBase {
  /** Id of Application instance. */
  ApplicationInstanceId: number;
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "ApplicationHealthReportExpired";
}

export interface ApplicationUpgradeCompletedEventOutput extends ApplicationEventOutputBase {
  /** Application type name. */
  ApplicationTypeName: string;
  /** Application type version. */
  ApplicationTypeVersion: string;
  /** Overall upgrade time in milli-seconds. */
  OverallUpgradeElapsedTimeInMs: number;
  Kind: "ApplicationUpgradeCompleted";
}

export interface ApplicationUpgradeDomainCompletedEventOutput extends ApplicationEventOutputBase {
  /** Application type name. */
  ApplicationTypeName: string;
  /** Current Application type version. */
  CurrentApplicationTypeVersion: string;
  /** Target Application type version. */
  ApplicationTypeVersion: string;
  /** State of upgrade. */
  UpgradeState: string;
  /** Upgrade domains. */
  UpgradeDomains: string;
  /** Upgrade time of domain in milli-seconds. */
  UpgradeDomainElapsedTimeInMs: number;
  Kind: "ApplicationUpgradeDomainCompleted";
}

export interface ApplicationUpgradeRollbackCompletedEventOutput extends ApplicationEventOutputBase {
  /** Application type name. */
  ApplicationTypeName: string;
  /** Application type version. */
  ApplicationTypeVersion: string;
  /** Describes reason of failure. */
  FailureReason: string;
  /** Overall upgrade time in milli-seconds. */
  OverallUpgradeElapsedTimeInMs: number;
  Kind: "ApplicationUpgradeRollbackCompleted";
}

export interface ApplicationUpgradeRollbackStartedEventOutput extends ApplicationEventOutputBase {
  /** Application type name. */
  ApplicationTypeName: string;
  /** Current Application type version. */
  CurrentApplicationTypeVersion: string;
  /** Target Application type version. */
  ApplicationTypeVersion: string;
  /** Describes reason of failure. */
  FailureReason: string;
  /** Overall upgrade time in milli-seconds. */
  OverallUpgradeElapsedTimeInMs: number;
  Kind: "ApplicationUpgradeRollbackStarted";
}

export interface ApplicationUpgradeStartedEventOutput extends ApplicationEventOutputBase {
  /** Application type name. */
  ApplicationTypeName: string;
  /** Current Application type version. */
  CurrentApplicationTypeVersion: string;
  /** Target Application type version. */
  ApplicationTypeVersion: string;
  /** Type of upgrade. */
  UpgradeType: string;
  /** Mode of upgrade. */
  RollingUpgradeMode: string;
  /** Action if failed. */
  FailureAction: string;
  Kind: "ApplicationUpgradeStarted";
}

export interface DeployedApplicationNewHealthReportEventOutput extends ApplicationEventOutputBase {
  /** Id of Application instance. */
  ApplicationInstanceId: number;
  /** The name of a Service Fabric node. */
  NodeName: string;
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "DeployedApplicationNewHealthReport";
}

export interface DeployedApplicationHealthReportExpiredEventOutput
  extends ApplicationEventOutputBase {
  /** Id of Application instance. */
  ApplicationInstanceId: number;
  /** The name of a Service Fabric node. */
  NodeName: string;
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "DeployedApplicationHealthReportExpired";
}

export interface ApplicationProcessExitedEventOutput extends ApplicationEventOutputBase {
  /** Name of Service. */
  ServiceName: string;
  /** Name of Service package. */
  ServicePackageName: string;
  /** Activation Id of Service package. */
  ServicePackageActivationId: string;
  /** Indicates IsExclusive flag. */
  IsExclusive: boolean;
  /** Name of Code package. */
  CodePackageName: string;
  /** Type of EntryPoint. */
  EntryPointType: string;
  /** Name of executable. */
  ExeName: string;
  /** Process Id. */
  ProcessId: number;
  /** Host Id. */
  HostId: string;
  /** Exit code of process. */
  ExitCode: number;
  /** Indicates if termination is unexpected. */
  UnexpectedTermination: boolean;
  /** Start time of process. */
  StartTime: string;
  Kind: "ApplicationProcessExited";
}

export interface ApplicationContainerInstanceExitedEventOutput extends ApplicationEventOutputBase {
  /** Name of Service. */
  ServiceName: string;
  /** Name of Service package. */
  ServicePackageName: string;
  /** Activation Id of Service package. */
  ServicePackageActivationId: string;
  /** Indicates IsExclusive flag. */
  IsExclusive: boolean;
  /** Name of Code package. */
  CodePackageName: string;
  /** Type of EntryPoint. */
  EntryPointType: string;
  /** Name of Container image. */
  ImageName: string;
  /** Name of Container. */
  ContainerName: string;
  /** Host Id. */
  HostId: string;
  /** Exit code of process. */
  ExitCode: number;
  /** Indicates if termination is unexpected. */
  UnexpectedTermination: boolean;
  /** Start time of process. */
  StartTime: string;
  Kind: "ApplicationContainerInstanceExited";
}

export interface NodeAbortedEventOutput extends NodeEventOutputBase {
  /** Id of Node instance. */
  NodeInstance: number;
  /** Id of Node. */
  NodeId: string;
  /** Upgrade domain of Node. */
  UpgradeDomain: string;
  /** Fault domain of Node. */
  FaultDomain: string;
  /** IP address or FQDN. */
  IpAddressOrFQDN: string;
  /** Name of Host. */
  Hostname: string;
  /** Indicates if it is seed node. */
  IsSeedNode: boolean;
  /** Version of Node. */
  NodeVersion: string;
  Kind: "NodeAborted";
}

export interface NodeAddedToClusterEventOutput extends NodeEventOutputBase {
  /** Id of Node. */
  NodeId: string;
  /** Id of Node instance. */
  NodeInstance: number;
  /** Type of Node. */
  NodeType: string;
  /** Fabric version. */
  FabricVersion: string;
  /** IP address or FQDN. */
  IpAddressOrFQDN: string;
  /** Capacities. */
  NodeCapacities: string;
  Kind: "NodeAddedToCluster";
}

export interface NodeClosedEventOutput extends NodeEventOutputBase {
  /** Id of Node. */
  NodeId: string;
  /** Id of Node instance. */
  NodeInstance: number;
  /** Describes error. */
  Error: string;
  Kind: "NodeClosed";
}

export interface NodeDeactivateCompletedEventOutput extends NodeEventOutputBase {
  /** Id of Node instance. */
  NodeInstance: number;
  /** Describes deactivate intent. */
  EffectiveDeactivateIntent: string;
  /** Batch Ids. */
  BatchIdsWithDeactivateIntent: string;
  /** Start time. */
  StartTime: string;
  Kind: "NodeDeactivateCompleted";
}

export interface NodeDeactivateStartedEventOutput extends NodeEventOutputBase {
  /** Id of Node instance. */
  NodeInstance: number;
  /** Batch Id. */
  BatchId: string;
  /** Describes deactivate intent. */
  DeactivateIntent: string;
  Kind: "NodeDeactivateStarted";
}

export interface NodeDownEventOutput extends NodeEventOutputBase {
  /** Id of Node instance. */
  NodeInstance: number;
  /** Time when Node was last up. */
  LastNodeUpAt: string;
  Kind: "NodeDown";
}

export interface NodeNewHealthReportEventOutput extends NodeEventOutputBase {
  /** Id of Node instance. */
  NodeInstanceId: number;
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "NodeNewHealthReport";
}

export interface NodeHealthReportExpiredEventOutput extends NodeEventOutputBase {
  /** Id of Node instance. */
  NodeInstanceId: number;
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "NodeHealthReportExpired";
}

export interface NodeOpenSucceededEventOutput extends NodeEventOutputBase {
  /** Id of Node instance. */
  NodeInstance: number;
  /** Id of Node. */
  NodeId: string;
  /** Upgrade domain of Node. */
  UpgradeDomain: string;
  /** Fault domain of Node. */
  FaultDomain: string;
  /** IP address or FQDN. */
  IpAddressOrFQDN: string;
  /** Name of Host. */
  Hostname: string;
  /** Indicates if it is seed node. */
  IsSeedNode: boolean;
  /** Version of Node. */
  NodeVersion: string;
  Kind: "NodeOpenSucceeded";
}

export interface NodeOpenFailedEventOutput extends NodeEventOutputBase {
  /** Id of Node instance. */
  NodeInstance: number;
  /** Id of Node. */
  NodeId: string;
  /** Upgrade domain of Node. */
  UpgradeDomain: string;
  /** Fault domain of Node. */
  FaultDomain: string;
  /** IP address or FQDN. */
  IpAddressOrFQDN: string;
  /** Name of Host. */
  Hostname: string;
  /** Indicates if it is seed node. */
  IsSeedNode: boolean;
  /** Version of Node. */
  NodeVersion: string;
  /** Describes the error. */
  Error: string;
  Kind: "NodeOpenFailed";
}

export interface NodeRemovedFromClusterEventOutput extends NodeEventOutputBase {
  /** Id of Node. */
  NodeId: string;
  /** Id of Node instance. */
  NodeInstance: number;
  /** Type of Node. */
  NodeType: string;
  /** Fabric version. */
  FabricVersion: string;
  /** IP address or FQDN. */
  IpAddressOrFQDN: string;
  /** Capacities. */
  NodeCapacities: string;
  Kind: "NodeRemovedFromCluster";
}

export interface NodeUpEventOutput extends NodeEventOutputBase {
  /** Id of Node instance. */
  NodeInstance: number;
  /** Time when Node was last down. */
  LastNodeDownAt: string;
  Kind: "NodeUp";
}

export interface PartitionNewHealthReportEventOutput extends PartitionEventOutputBase {
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "PartitionNewHealthReport";
}

export interface PartitionHealthReportExpiredEventOutput extends PartitionEventOutputBase {
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "PartitionHealthReportExpired";
}

export interface PartitionReconfiguredEventOutput extends PartitionEventOutputBase {
  /** The name of a Service Fabric node. */
  NodeName: string;
  /** Id of Node instance. */
  NodeInstanceId: string;
  /** Type of Service. */
  ServiceType: string;
  /** CcEpochDataLoss version. */
  CcEpochDataLossVersion: number;
  /** CcEpochConfig version. */
  CcEpochConfigVersion: number;
  /** Type of reconfiguration. */
  ReconfigType: string;
  /** Describes reconfiguration result. */
  Result: string;
  /** Duration of Phase0 in milli-seconds. */
  Phase0DurationMs: number;
  /** Duration of Phase1 in milli-seconds. */
  Phase1DurationMs: number;
  /** Duration of Phase2 in milli-seconds. */
  Phase2DurationMs: number;
  /** Duration of Phase3 in milli-seconds. */
  Phase3DurationMs: number;
  /** Duration of Phase4 in milli-seconds. */
  Phase4DurationMs: number;
  /** Total duration in milli-seconds. */
  TotalDurationMs: number;
  Kind: "PartitionReconfigured";
}

export interface PartitionPrimaryMoveAnalysisEventOutput extends PartitionAnalysisEventOutputBase {
  /** Time when the move was completed. */
  WhenMoveCompleted: string;
  /** The name of a Service Fabric node. */
  PreviousNode: string;
  /** The name of a Service Fabric node. */
  CurrentNode: string;
  /** Move reason. */
  MoveReason: string;
  /** Relevant traces. */
  RelevantTraces: string;
  Kind: "PartitionPrimaryMoveAnalysis";
}

export interface ServiceCreatedEventOutput extends ServiceEventOutputBase {
  /** Service type name. */
  ServiceTypeName: string;
  /** Application name. */
  ApplicationName: string;
  /** Application type name. */
  ApplicationTypeName: string;
  /** Id of Service instance. */
  ServiceInstance: number;
  /** Indicates if Service is stateful. */
  IsStateful: boolean;
  /** Number of partitions. */
  PartitionCount: number;
  /** Size of target replicas set. */
  TargetReplicaSetSize: number;
  /** Minimum size of replicas set. */
  MinReplicaSetSize: number;
  /** Version of Service package. */
  ServicePackageVersion: string;
  /**
   * An internal ID used by Service Fabric to uniquely identify a partition. This is a randomly generated GUID when the service was created. The partition ID is unique and does not change for the lifetime of the service. If the same service was deleted and recreated the IDs of its partitions would be different.
   *
   * Value may contain a UUID
   */
  PartitionId: string;
  Kind: "ServiceCreated";
}

export interface ServiceDeletedEventOutput extends ServiceEventOutputBase {
  /** Service type name. */
  ServiceTypeName: string;
  /** Application name. */
  ApplicationName: string;
  /** Application type name. */
  ApplicationTypeName: string;
  /** Id of Service instance. */
  ServiceInstance: number;
  /** Indicates if Service is stateful. */
  IsStateful: boolean;
  /** Number of partitions. */
  PartitionCount: number;
  /** Size of target replicas set. */
  TargetReplicaSetSize: number;
  /** Minimum size of replicas set. */
  MinReplicaSetSize: number;
  /** Version of Service package. */
  ServicePackageVersion: string;
  Kind: "ServiceDeleted";
}

export interface ServiceNewHealthReportEventOutput extends ServiceEventOutputBase {
  /** Id of Service instance. */
  InstanceId: number;
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "ServiceNewHealthReport";
}

export interface ServiceHealthReportExpiredEventOutput extends ServiceEventOutputBase {
  /** Id of Service instance. */
  InstanceId: number;
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "ServiceHealthReportExpired";
}

export interface DeployedServicePackageNewHealthReportEventOutput
  extends ApplicationEventOutputBase {
  /** Service manifest name. */
  ServiceManifestName: string;
  /** Id of Service package instance. */
  ServicePackageInstanceId: number;
  /** Id of Service package activation. */
  ServicePackageActivationId: string;
  /** The name of a Service Fabric node. */
  NodeName: string;
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "DeployedServicePackageNewHealthReport";
}

export interface DeployedServicePackageHealthReportExpiredEventOutput
  extends ApplicationEventOutputBase {
  /** Service manifest name. */
  ServiceManifest: string;
  /** Id of Service package instance. */
  ServicePackageInstanceId: number;
  /** Id of Service package activation. */
  ServicePackageActivationId: string;
  /** The name of a Service Fabric node. */
  NodeName: string;
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "DeployedServicePackageHealthReportExpired";
}

export interface StatefulReplicaNewHealthReportEventOutput extends ReplicaEventOutputBase {
  /** Id of Replica instance. */
  ReplicaInstanceId: number;
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "StatefulReplicaNewHealthReport";
}

export interface StatefulReplicaHealthReportExpiredEventOutput extends ReplicaEventOutputBase {
  /** Id of Replica instance. */
  ReplicaInstanceId: number;
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "StatefulReplicaHealthReportExpired";
}

export interface StatelessReplicaNewHealthReportEventOutput extends ReplicaEventOutputBase {
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "StatelessReplicaNewHealthReport";
}

export interface StatelessReplicaHealthReportExpiredEventOutput extends ReplicaEventOutputBase {
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "StatelessReplicaHealthReportExpired";
}

export interface ClusterNewHealthReportEventOutput extends ClusterEventOutputBase {
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "ClusterNewHealthReport";
}

export interface ClusterHealthReportExpiredEventOutput extends ClusterEventOutputBase {
  /** Id of report source. */
  SourceId: string;
  /** Describes the property. */
  Property: string;
  /** Describes the property health state. */
  HealthState: string;
  /** Time to live in milli-seconds. */
  TimeToLiveMs: number;
  /** Sequence number of report. */
  SequenceNumber: number;
  /** Description of report. */
  Description: string;
  /** Indicates the removal when it expires. */
  RemoveWhenExpired: boolean;
  /** Source time. */
  SourceUtcTimestamp: string;
  Kind: "ClusterHealthReportExpired";
}

export interface ClusterUpgradeCompletedEventOutput extends ClusterEventOutputBase {
  /** Target Cluster version. */
  TargetClusterVersion: string;
  /** Overall duration of upgrade in milli-seconds. */
  OverallUpgradeElapsedTimeInMs: number;
  Kind: "ClusterUpgradeCompleted";
}

export interface ClusterUpgradeDomainCompletedEventOutput extends ClusterEventOutputBase {
  /** Target Cluster version. */
  TargetClusterVersion: string;
  /** State of upgrade. */
  UpgradeState: string;
  /** Upgrade domains. */
  UpgradeDomains: string;
  /** Duration of domain upgrade in milli-seconds. */
  UpgradeDomainElapsedTimeInMs: number;
  Kind: "ClusterUpgradeDomainCompleted";
}

export interface ClusterUpgradeRollbackCompletedEventOutput extends ClusterEventOutputBase {
  /** Target Cluster version. */
  TargetClusterVersion: string;
  /** Describes failure. */
  FailureReason: string;
  /** Overall duration of upgrade in milli-seconds. */
  OverallUpgradeElapsedTimeInMs: number;
  Kind: "ClusterUpgradeRollbackCompleted";
}

export interface ClusterUpgradeRollbackStartedEventOutput extends ClusterEventOutputBase {
  /** Target Cluster version. */
  TargetClusterVersion: string;
  /** Describes failure. */
  FailureReason: string;
  /** Overall duration of upgrade in milli-seconds. */
  OverallUpgradeElapsedTimeInMs: number;
  Kind: "ClusterUpgradeRollbackStarted";
}

export interface ClusterUpgradeStartedEventOutput extends ClusterEventOutputBase {
  /** Current Cluster version. */
  CurrentClusterVersion: string;
  /** Target Cluster version. */
  TargetClusterVersion: string;
  /** Type of upgrade. */
  UpgradeType: string;
  /** Mode of upgrade. */
  RollingUpgradeMode: string;
  /** Action if failed. */
  FailureAction: string;
  Kind: "ClusterUpgradeStarted";
}

export interface ChaosStoppedEventOutput extends ClusterEventOutputBase {
  /** Describes reason. */
  Reason: string;
  Kind: "ChaosStopped";
}

export interface ChaosStartedEventOutput extends ClusterEventOutputBase {
  /** Maximum number of concurrent faults. */
  MaxConcurrentFaults: number;
  /** Time to run in seconds. */
  TimeToRunInSeconds: number;
  /** Maximum timeout for cluster stabilization in seconds. */
  MaxClusterStabilizationTimeoutInSeconds: number;
  /** Wait time between iterations in seconds. */
  WaitTimeBetweenIterationsInSeconds: number;
  /** Wait time between faults in seconds. */
  WaitTimeBetweenFaultsInSeconds: number;
  /** Indicates MoveReplica fault is enabled. */
  MoveReplicaFaultEnabled: boolean;
  /** List of included Node types. */
  IncludedNodeTypeList: string;
  /** List of included Applications. */
  IncludedApplicationList: string;
  /** Health policy. */
  ClusterHealthPolicy: string;
  /** Chaos Context. */
  ChaosContext: string;
  Kind: "ChaosStarted";
}

export interface ChaosCodePackageRestartScheduledEventOutput extends ApplicationEventOutputBase {
  /**
   * Id of fault group.
   *
   * Value may contain a UUID
   */
  FaultGroupId: string;
  /**
   * Id of fault.
   *
   * Value may contain a UUID
   */
  FaultId: string;
  /** The name of a Service Fabric node. */
  NodeName: string;
  /** Service manifest name. */
  ServiceManifestName: string;
  /** Code package name. */
  CodePackageName: string;
  /** Id of Service package activation. */
  ServicePackageActivationId: string;
  Kind: "ChaosCodePackageRestartScheduled";
}

export interface ChaosReplicaRemovalScheduledEventOutput extends ReplicaEventOutputBase {
  /**
   * Id of fault group.
   *
   * Value may contain a UUID
   */
  FaultGroupId: string;
  /**
   * Id of fault.
   *
   * Value may contain a UUID
   */
  FaultId: string;
  /** Service name. */
  ServiceUri: string;
  Kind: "ChaosReplicaRemovalScheduled";
}

export interface ChaosPartitionSecondaryMoveScheduledEventOutput extends PartitionEventOutputBase {
  /**
   * Id of fault group.
   *
   * Value may contain a UUID
   */
  FaultGroupId: string;
  /**
   * Id of fault.
   *
   * Value may contain a UUID
   */
  FaultId: string;
  /** Service name. */
  ServiceName: string;
  /** The name of a Service Fabric node. */
  SourceNode: string;
  /** The name of a Service Fabric node. */
  DestinationNode: string;
  /** Indicates a forced move. */
  ForcedMove: boolean;
  Kind: "ChaosPartitionSecondaryMoveScheduled";
}

export interface ChaosPartitionPrimaryMoveScheduledEventOutput extends PartitionEventOutputBase {
  /**
   * Id of fault group.
   *
   * Value may contain a UUID
   */
  FaultGroupId: string;
  /**
   * Id of fault.
   *
   * Value may contain a UUID
   */
  FaultId: string;
  /** Service name. */
  ServiceName: string;
  /** The name of a Service Fabric node. */
  NodeTo: string;
  /** Indicates a forced move. */
  ForcedMove: boolean;
  Kind: "ChaosPartitionPrimaryMoveScheduled";
}

export interface ChaosReplicaRestartScheduledEventOutput extends ReplicaEventOutputBase {
  /**
   * Id of fault group.
   *
   * Value may contain a UUID
   */
  FaultGroupId: string;
  /**
   * Id of fault.
   *
   * Value may contain a UUID
   */
  FaultId: string;
  /** Service name. */
  ServiceUri: string;
  Kind: "ChaosReplicaRestartScheduled";
}

export interface ChaosNodeRestartScheduledEventOutput extends NodeEventOutputBase {
  /** Id of Node instance. */
  NodeInstanceId: number;
  /**
   * Id of fault group.
   *
   * Value may contain a UUID
   */
  FaultGroupId: string;
  /**
   * Id of fault.
   *
   * Value may contain a UUID
   */
  FaultId: string;
  Kind: "ChaosNodeRestartScheduled";
}

export interface NodeTypeNodesHealthEvaluationOutput extends HealthEvaluationOutputBase {
  /** The node type name as defined in the cluster manifest. */
  NodeTypeName?: string;
  /** Maximum allowed percentage of unhealthy nodes for the node type, specified as an entry in NodeTypeHealthPolicyMap. */
  MaxPercentUnhealthyNodes?: number;
  /** Total number of nodes of the node type found in the health store. */
  TotalCount?: number;
  /** List of unhealthy evaluations that led to the aggregated health state. Includes all the unhealthy NodeHealthEvaluation of this node type that impacted the aggregated health. */
  UnhealthyEvaluations?: Array<HealthEvaluationWrapperOutput>;
  Kind: "NodeTypeNodes";
}

export interface InlinedValueSecretResourcePropertiesOutput
  extends SecretResourcePropertiesOutputBase {
  kind: "inlinedValue";
}

export interface ApplicationScopedVolumeCreationParametersServiceFabricVolumeDiskOutput
  extends ApplicationScopedVolumeCreationParametersOutputBase {
  /** Volume size */
  sizeDisk: "Small" | "Medium" | "Large";
  kind: "ServiceFabricVolumeDisk";
}

export interface LocalNetworkResourcePropertiesOutput extends NetworkResourcePropertiesOutputBase {
  /** Address space for the local container network. */
  networkAddressPrefix?: string;
  kind: "Local";
}

export interface AzureInternalMonitoringPipelineSinkDescriptionOutput
  extends DiagnosticsSinkPropertiesOutputBase {
  /** Azure Internal monitoring pipeline account. */
  accountName?: string;
  /** Azure Internal monitoring pipeline account namespace. */
  namespace?: string;
  /** Azure Internal monitoring agent configuration. */
  maConfigUrl?: string;
  /** Azure Internal monitoring agent fluentd configuration. */
  fluentdConfigUrl?: string;
  /** Azure Internal monitoring pipeline autokey associated with the certificate. */
  autoKeyConfigUrl?: string;
  kind: "AzureInternalMonitoringPipeline";
}

export interface AddRemoveReplicaScalingMechanismOutput extends AutoScalingMechanismOutputBase {
  /** Minimum number of containers (scale down won't be performed below this number). */
  minCount: number;
  /** Maximum number of containers (scale up won't be performed above this number). */
  maxCount: number;
  /** Each time auto scaling is performed, this number of containers will be added or removed. */
  scaleIncrement: number;
  kind: "AddRemoveReplica";
}

export interface AutoScalingMetricOutputBase {
  kind: "Resource";
}

export interface AutoScalingResourceMetricOutput extends AutoScalingMetricOutputBase {
  /** Name of the resource. */
  name: "cpu" | "memoryInGB";
  kind: "Resource";
}

export interface DefaultExecutionPolicyOutput extends ExecutionPolicyOutputBase {
  type: "Default";
}

export interface RunToCompletionExecutionPolicyOutput extends ExecutionPolicyOutputBase {
  /** Enumerates the restart policy for RunToCompletionExecutionPolicy */
  restart: "OnFailure" | "Never";
  type: "RunToCompletion";
}

export interface AverageLoadScalingTriggerOutput extends AutoScalingTriggerOutputBase {
  /** Description of the metric that is used for scaling. */
  metric: AutoScalingMetricOutput;
  /** Lower load threshold (if average load is below this threshold, service will scale down). */
  lowerLoadThreshold: number;
  /** Upper load threshold (if average load is above this threshold, service will scale up). */
  upperLoadThreshold: number;
  /** Scale interval that indicates how often will this trigger be checked. */
  scaleIntervalInSeconds: number;
  kind: "AverageLoad";
}

export type HealthEvaluationOutput =
  | ApplicationHealthEvaluationOutput
  | ApplicationsHealthEvaluationOutput
  | ApplicationTypeApplicationsHealthEvaluationOutput
  | DeltaNodesCheckHealthEvaluationOutput
  | DeployedApplicationHealthEvaluationOutput
  | DeployedApplicationsHealthEvaluationOutput
  | DeployedServicePackageHealthEvaluationOutput
  | DeployedServicePackagesHealthEvaluationOutput
  | EventHealthEvaluationOutput
  | NodeHealthEvaluationOutput
  | NodesHealthEvaluationOutput
  | PartitionHealthEvaluationOutput
  | PartitionsHealthEvaluationOutput
  | ReplicaHealthEvaluationOutput
  | ReplicasHealthEvaluationOutput
  | ServiceHealthEvaluationOutput
  | ServicesHealthEvaluationOutput
  | SystemApplicationHealthEvaluationOutput
  | UpgradeDomainDeltaNodesCheckHealthEvaluationOutput
  | UpgradeDomainDeployedApplicationsHealthEvaluationOutput
  | UpgradeDomainNodesHealthEvaluationOutput
  | NodeTypeNodesHealthEvaluationOutput;
export type SafetyCheckOutput =
  | PartitionSafetyCheckOutput
  | EnsureAvailabilitySafetyCheckOutput
  | EnsurePartitionQuorumSafetyCheckOutput
  | SeedNodeSafetyCheckOutput
  | WaitForInbuildReplicaSafetyCheckOutput
  | WaitForPrimaryPlacementSafetyCheckOutput
  | WaitForPrimarySwapSafetyCheckOutput
  | WaitForReconfigurationSafetyCheckOutput;
export type ServiceTypeDescriptionOutput =
  | StatefulServiceTypeDescriptionOutput
  | StatelessServiceTypeDescriptionOutput;
export type ServicePlacementPolicyDescriptionOutput =
  | ServicePlacementInvalidDomainPolicyDescriptionOutput
  | ServicePlacementNonPartiallyPlaceServicePolicyDescriptionOutput
  | ServicePlacementAllowMultipleStatelessInstancesOnNodePolicyDescriptionOutput
  | ServicePlacementPreferPrimaryDomainPolicyDescriptionOutput
  | ServicePlacementRequiredDomainPolicyDescriptionOutput
  | ServicePlacementRequireDomainDistributionPolicyDescriptionOutput;
export type ServiceInfoOutput = StatefulServiceInfoOutput | StatelessServiceInfoOutput;
export type ServiceDescriptionOutput =
  | StatefulServiceDescriptionOutput
  | StatelessServiceDescriptionOutput;
export type PartitionSchemeDescriptionOutput =
  | NamedPartitionSchemeDescriptionOutput
  | SingletonPartitionSchemeDescriptionOutput
  | UniformInt64RangePartitionSchemeDescriptionOutput;
export type ScalingTriggerDescriptionOutput =
  | AveragePartitionLoadScalingTriggerOutput
  | AverageServiceLoadScalingTriggerOutput;
export type ScalingMechanismDescriptionOutput =
  | PartitionInstanceCountScaleMechanismOutput
  | AddRemoveIncrementalNamedPartitionScalingMechanismOutput;
export type PartitionInformationOutput =
  | Int64RangePartitionInformationOutput
  | NamedPartitionInformationOutput
  | SingletonPartitionInformationOutput;
export type ServicePartitionInfoOutput =
  | StatefulServicePartitionInfoOutput
  | StatelessServicePartitionInfoOutput;
export type ReplicaHealthStateOutput =
  | ReplicaHealthStateOutputBase
  | StatefulServiceReplicaHealthStateOutput
  | StatelessServiceInstanceHealthStateOutput;
export type RepairTargetDescriptionBaseOutput = NodeRepairTargetDescriptionOutput;
export type RepairImpactDescriptionBaseOutput = NodeRepairImpactDescriptionOutput;
export type ReplicaInfoOutput =
  | StatefulServiceReplicaInfoOutput
  | StatelessServiceInstanceInfoOutput;
export type ReplicaHealthOutput =
  | ReplicaHealthOutputBase
  | StatefulServiceReplicaHealthOutput
  | StatelessServiceInstanceHealthOutput;
export type DeployedServiceReplicaInfoOutput =
  | DeployedStatefulServiceReplicaInfoOutput
  | DeployedStatelessServiceInstanceInfoOutput;
export type DeployedServiceReplicaDetailInfoOutput =
  | DeployedStatefulServiceReplicaDetailInfoOutput
  | DeployedStatelessServiceInstanceDetailInfoOutput;
export type ChaosEventOutput =
  | ExecutingFaultsChaosEventOutput
  | StartedChaosEventOutput
  | StoppedChaosEventOutput
  | TestErrorChaosEventOutput
  | ValidationFailedChaosEventOutput
  | WaitingChaosEventOutput;
export type BackupScheduleDescriptionOutput =
  | FrequencyBasedBackupScheduleDescriptionOutput
  | TimeBasedBackupScheduleDescriptionOutput;
export type BackupStorageDescriptionOutput =
  | AzureBlobBackupStorageDescriptionOutput
  | FileShareBackupStorageDescriptionOutput
  | DsmsAzureBlobBackupStorageDescriptionOutput
  | ManagedIdentityAzureBlobBackupStorageDescriptionOutput;
export type RetentionPolicyDescriptionOutput = BasicRetentionPolicyDescriptionOutput;
export type BackupEntityOutput =
  | ApplicationBackupEntityOutput
  | ServiceBackupEntityOutput
  | PartitionBackupEntityOutput;
export type BackupConfigurationInfoOutput =
  | PartitionBackupConfigurationInfoOutput
  | ApplicationBackupConfigurationInfoOutput
  | ServiceBackupConfigurationInfoOutput;
export type PropertyValueOutput =
  | BinaryPropertyValueOutput
  | Int64PropertyValueOutput
  | DoublePropertyValueOutput
  | StringPropertyValueOutput
  | GuidPropertyValueOutput;
export type PropertyBatchInfoOutput =
  | SuccessfulPropertyBatchInfoOutput
  | FailedPropertyBatchInfoOutput;
export type ClusterEventOutput =
  | ClusterEventOutputBase
  | ClusterNewHealthReportEventOutput
  | ClusterHealthReportExpiredEventOutput
  | ClusterUpgradeCompletedEventOutput
  | ClusterUpgradeDomainCompletedEventOutput
  | ClusterUpgradeRollbackCompletedEventOutput
  | ClusterUpgradeRollbackStartedEventOutput
  | ClusterUpgradeStartedEventOutput
  | ChaosStoppedEventOutput
  | ChaosStartedEventOutput;
export type FabricEventOutput =
  | ClusterEventOutput
  | ContainerInstanceEventOutput
  | NodeEventOutput
  | ApplicationEventOutput
  | ServiceEventOutput
  | PartitionEventOutput
  | ReplicaEventOutput
  | PartitionAnalysisEventOutput
  | ApplicationCreatedEventOutput
  | ApplicationDeletedEventOutput
  | ApplicationNewHealthReportEventOutput
  | ApplicationHealthReportExpiredEventOutput
  | ApplicationUpgradeCompletedEventOutput
  | ApplicationUpgradeDomainCompletedEventOutput
  | ApplicationUpgradeRollbackCompletedEventOutput
  | ApplicationUpgradeRollbackStartedEventOutput
  | ApplicationUpgradeStartedEventOutput
  | DeployedApplicationNewHealthReportEventOutput
  | DeployedApplicationHealthReportExpiredEventOutput
  | ApplicationProcessExitedEventOutput
  | ApplicationContainerInstanceExitedEventOutput
  | NodeAbortedEventOutput
  | NodeAddedToClusterEventOutput
  | NodeClosedEventOutput
  | NodeDeactivateCompletedEventOutput
  | NodeDeactivateStartedEventOutput
  | NodeDownEventOutput
  | NodeNewHealthReportEventOutput
  | NodeHealthReportExpiredEventOutput
  | NodeOpenSucceededEventOutput
  | NodeOpenFailedEventOutput
  | NodeRemovedFromClusterEventOutput
  | NodeUpEventOutput
  | PartitionNewHealthReportEventOutput
  | PartitionHealthReportExpiredEventOutput
  | PartitionReconfiguredEventOutput
  | PartitionPrimaryMoveAnalysisEventOutput
  | ServiceCreatedEventOutput
  | ServiceDeletedEventOutput
  | ServiceNewHealthReportEventOutput
  | ServiceHealthReportExpiredEventOutput
  | DeployedServicePackageNewHealthReportEventOutput
  | DeployedServicePackageHealthReportExpiredEventOutput
  | StatefulReplicaNewHealthReportEventOutput
  | StatefulReplicaHealthReportExpiredEventOutput
  | StatelessReplicaNewHealthReportEventOutput
  | StatelessReplicaHealthReportExpiredEventOutput
  | ClusterNewHealthReportEventOutput
  | ClusterHealthReportExpiredEventOutput
  | ClusterUpgradeCompletedEventOutput
  | ClusterUpgradeDomainCompletedEventOutput
  | ClusterUpgradeRollbackCompletedEventOutput
  | ClusterUpgradeRollbackStartedEventOutput
  | ClusterUpgradeStartedEventOutput
  | ChaosStoppedEventOutput
  | ChaosStartedEventOutput
  | ChaosCodePackageRestartScheduledEventOutput
  | ChaosReplicaRemovalScheduledEventOutput
  | ChaosPartitionSecondaryMoveScheduledEventOutput
  | ChaosPartitionPrimaryMoveScheduledEventOutput
  | ChaosReplicaRestartScheduledEventOutput
  | ChaosNodeRestartScheduledEventOutput;
export type NodeEventOutput =
  | NodeEventOutputBase
  | NodeAbortedEventOutput
  | NodeAddedToClusterEventOutput
  | NodeClosedEventOutput
  | NodeDeactivateCompletedEventOutput
  | NodeDeactivateStartedEventOutput
  | NodeDownEventOutput
  | NodeNewHealthReportEventOutput
  | NodeHealthReportExpiredEventOutput
  | NodeOpenSucceededEventOutput
  | NodeOpenFailedEventOutput
  | NodeRemovedFromClusterEventOutput
  | NodeUpEventOutput
  | ChaosNodeRestartScheduledEventOutput;
export type ApplicationEventOutput =
  | ApplicationEventOutputBase
  | ApplicationCreatedEventOutput
  | ApplicationDeletedEventOutput
  | ApplicationNewHealthReportEventOutput
  | ApplicationHealthReportExpiredEventOutput
  | ApplicationUpgradeCompletedEventOutput
  | ApplicationUpgradeDomainCompletedEventOutput
  | ApplicationUpgradeRollbackCompletedEventOutput
  | ApplicationUpgradeRollbackStartedEventOutput
  | ApplicationUpgradeStartedEventOutput
  | DeployedApplicationNewHealthReportEventOutput
  | DeployedApplicationHealthReportExpiredEventOutput
  | ApplicationProcessExitedEventOutput
  | ApplicationContainerInstanceExitedEventOutput
  | DeployedServicePackageNewHealthReportEventOutput
  | DeployedServicePackageHealthReportExpiredEventOutput
  | ChaosCodePackageRestartScheduledEventOutput;
export type ServiceEventOutput =
  | ServiceEventOutputBase
  | ServiceCreatedEventOutput
  | ServiceDeletedEventOutput
  | ServiceNewHealthReportEventOutput
  | ServiceHealthReportExpiredEventOutput;
export type PartitionEventOutput =
  | PartitionEventOutputBase
  | PartitionAnalysisEventOutput
  | PartitionNewHealthReportEventOutput
  | PartitionHealthReportExpiredEventOutput
  | PartitionReconfiguredEventOutput
  | PartitionPrimaryMoveAnalysisEventOutput
  | ChaosPartitionSecondaryMoveScheduledEventOutput
  | ChaosPartitionPrimaryMoveScheduledEventOutput;
export type ReplicaEventOutput =
  | ReplicaEventOutputBase
  | StatefulReplicaNewHealthReportEventOutput
  | StatefulReplicaHealthReportExpiredEventOutput
  | StatelessReplicaNewHealthReportEventOutput
  | StatelessReplicaHealthReportExpiredEventOutput
  | ChaosReplicaRemovalScheduledEventOutput
  | ChaosReplicaRestartScheduledEventOutput;
export type SecretResourcePropertiesOutput =
  | SecretResourcePropertiesOutputBase
  | InlinedValueSecretResourcePropertiesOutput;
export type SecretResourcePropertiesParentOutput =
  | SecretResourcePropertiesOutput
  | InlinedValueSecretResourcePropertiesOutput;
export type NetworkResourcePropertiesOutput =
  | NetworkResourcePropertiesOutputBase
  | LocalNetworkResourcePropertiesOutput;
export type NetworkResourcePropertiesParentOutput =
  | NetworkResourcePropertiesOutput
  | LocalNetworkResourcePropertiesOutput;
export type ApplicationScopedVolumeCreationParametersOutput = ApplicationScopedVolumeCreationParametersServiceFabricVolumeDiskOutput;
export type ExecutionPolicyOutput =
  | DefaultExecutionPolicyOutput
  | RunToCompletionExecutionPolicyOutput;
export type AutoScalingTriggerOutput = AverageLoadScalingTriggerOutput;
export type AutoScalingMechanismOutput = AddRemoveReplicaScalingMechanismOutput;
export type DiagnosticsSinkPropertiesOutput = AzureInternalMonitoringPipelineSinkDescriptionOutput;
export type PartitionAnalysisEventOutput =
  | PartitionAnalysisEventOutputBase
  | PartitionPrimaryMoveAnalysisEventOutput;
export type PartitionSafetyCheckOutput =
  | PartitionSafetyCheckOutputBase
  | EnsureAvailabilitySafetyCheckOutput
  | EnsurePartitionQuorumSafetyCheckOutput
  | WaitForInbuildReplicaSafetyCheckOutput
  | WaitForPrimaryPlacementSafetyCheckOutput
  | WaitForPrimarySwapSafetyCheckOutput
  | WaitForReconfigurationSafetyCheckOutput;
export type ReplicatorStatusOutput =
  | PrimaryReplicatorStatusOutput
  | SecondaryReplicatorStatusOutput
  | SecondaryActiveReplicatorStatusOutput
  | SecondaryIdleReplicatorStatusOutput;
export type SecondaryReplicatorStatusOutput =
  | SecondaryReplicatorStatusOutputBase
  | SecondaryActiveReplicatorStatusOutput
  | SecondaryIdleReplicatorStatusOutput;
export type ReplicaStatusBaseOutput = KeyValueStoreReplicaStatusOutput;
export type AutoScalingMetricOutput = AutoScalingResourceMetricOutput;
