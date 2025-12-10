// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The Azure Key Vault connection. */
export interface AzureKeyVaultOutput extends ProxyResourceOutput {
  /** Azure Key Vault connection properties. */
  properties?: AzureKeyVaultPropertiesOutput;
}

/** Azure Key Vault connection properties. */
export interface AzureKeyVaultPropertiesOutput {
  /** The base URL of the Azure Key Vault. */
  baseUrl?: string;
  /** The description of the Azure Key Vault connection. */
  description?: string;
}

/** The proxy resource. */
export interface ProxyResourceOutput {
  /** The resource identifier. */
  readonly id?: string;
  /** The resource name. */
  readonly name?: string;
}

/** The error response model. */
export interface ErrorResponseModelOutput {
  /** The error model. */
  error: ErrorModelOutput;
}

/** The error model. */
export interface ErrorModelOutput {
  /** A unique error code that identifies the specific error. */
  code: string;
  /** A human-readable error message that provides more details about the error. */
  message: string;
  /** The specific component that the error is associated with. */
  target?: string;
  /** An array of nested ErrorModel objects that provides additional error details. */
  details?: Array<ErrorModelOutput>;
}

/** List of Azure Key Vault connections. */
export interface AzureKeyVaultListOutput {
  /** List of Azure Key Vault connections. */
  value: Array<AzureKeyVaultOutput>;
  /**
   * The link to the next page of results, if any remaining results exist.
   *
   * Value may contain a URL
   */
  nextLink?: string;
  /** The number of Azure Key Vault connections. */
  count?: number;
}

/** The classification rule. */
export interface ClassificationRuleOutputParent extends ProxyResourceOutput {
  kind: "ClassificationRule" | "System" | "Custom";
}

/** List of classification rules. */
export interface ClassificationRuleListOutput {
  /** List of classification rules. */
  value: Array<ClassificationRuleOutput>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
  /** The number of classification rules. */
  count?: number;
}

/** The operation response. */
export interface OperationResponseOutput {
  /**
   * The scan result identifier.
   *
   * Value may contain a UUID
   */
  scanResultId?: string;
  /** The start time of the operation. */
  startTime?: string;
  /** The end time of the operation. */
  endTime?: string;
  /** Scan operation status. */
  status?: "Accepted" | "InProgress" | "TransientFailure" | "Succeeded" | "Failed" | "Canceled";
  /** The error info. */
  error?: ErrorInfoOutput;
}

/** The error info. */
export interface ErrorInfoOutput {
  /** A unique error code that identifies the specific error. */
  code?: string;
  /** A human-readable error message that provides more details about the error. */
  message?: string;
  /** The specific component that the error is associated with. */
  target?: string;
  /** Error info detail. */
  details?: Array<ErrorInfoOutput>;
}

/** The credential. */
export interface CredentialOutputParent extends ProxyResourceOutput {
  kind:
    | "Credential"
    | "AccountKey"
    | "BasicAuth"
    | "AmazonARN"
    | "ServicePrincipal"
    | "SqlAuth"
    | "ConsumerKeyAuth"
    | "DelegatedAuth"
    | "ManagedIdentity";
}

/** List of credentials. */
export interface CredentialListOutput {
  /** List of credentials. */
  value: Array<CredentialOutput>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
  /** The number of credentials. */
  count?: number;
}

/** The data source. */
export interface DataSourceOutputParent extends ProxyResourceOutput {
  /** Scans of this data source. */
  readonly scans?: Array<ScanOutput>;
  /** The creation type. */
  creationType?: "Manual" | "AutoNative" | "AutoManaged";
  kind:
    | "DataSource"
    | "AzureSubscription"
    | "AzureResourceGroup"
    | "AzureSynapseWorkspace"
    | "AzureSynapse"
    | "AdlsGen1"
    | "AdlsGen2"
    | "AmazonAccount"
    | "AmazonS3"
    | "AmazonSql"
    | "AzureCosmosDb"
    | "AzureDataExplorer"
    | "AzureFileService"
    | "AzureSqlDatabase"
    | "AmazonPostgreSql"
    | "AzurePostgreSql"
    | "SqlServerDatabase"
    | "AzureSqlDatabaseManagedInstance"
    | "AzureSqlDataWarehouse"
    | "AzureMySql"
    | "AzureStorage"
    | "Teradata"
    | "Oracle"
    | "SapS4Hana"
    | "SapEcc"
    | "PowerBI";
}

/** The scan. */
export interface ScanOutputParent extends ProxyResourceOutput {
  /** The scan result with ingestion. */
  readonly lastRunResult?: ScanResultWithIngestionOutput;
  /** The scan identifier. */
  scanId?: string;
  /** The data source identifier. */
  dataSourceIdentifier?: DataSourceIdentifierOutput;
  /** The data source name. */
  dataSourceName?: string;
  /** The creation type. */
  creationType?: "Manual" | "AutoNative" | "AutoManaged";
  kind:
    | "Scan"
    | "AzureSubscriptionCredential"
    | "AzureSubscriptionMsi"
    | "AzureResourceGroupCredential"
    | "AzureResourceGroupMsi"
    | "AzureSynapseWorkspaceCredential"
    | "AzureSynapseWorkspaceMsi"
    | "AzureSynapseCredential"
    | "AzureSynapseMsi"
    | "AdlsGen1Credential"
    | "AdlsGen1Msi"
    | "AdlsGen2Credential"
    | "AdlsGen2Msi"
    | "AmazonAccountCredential"
    | "AmazonS3Credential"
    | "AmazonS3RoleARN"
    | "AmazonSqlCredential"
    | "AzureCosmosDbCredential"
    | "AzureDataExplorerCredential"
    | "AzureDataExplorerMsi"
    | "AzureFileServiceCredential"
    | "AzureSqlDatabaseCredential"
    | "AzureSqlDatabaseMsi"
    | "AmazonPostgreSqlCredential"
    | "AzurePostgreSqlCredential"
    | "SqlServerDatabaseCredential"
    | "AzureSqlDatabaseManagedInstanceCredential"
    | "AzureSqlDatabaseManagedInstanceMsi"
    | "AzureSqlDataWarehouseCredential"
    | "AzureSqlDataWarehouseMsi"
    | "AzureMySqlCredential"
    | "AzureStorageCredential"
    | "AzureStorageMsi"
    | "TeradataTeradataCredential"
    | "TeradataUserPass"
    | "TeradataTeradataUserPass"
    | "OracleOracleCredential"
    | "OracleOracleUserPass"
    | "SapS4HanaSapS4HanaCredential"
    | "SapS4HanaSapS4HanaUserPass"
    | "SapEccSapEccCredential"
    | "SapEccSapEccUserPass"
    | "PowerBIDelegated"
    | "PowerBIMsi";
}

/** The scan result with ingestion. */
export interface ScanResultWithIngestionOutput {
  /** The discovery execution details. */
  readonly discoveryExecutionDetails?: DiscoveryExecutionDetailsOutput;
  /** The ingestion execution details. */
  readonly ingestionExecutionDetails?: IngestionExecutionDetailsOutput;
  /** The parent scan result identifier. */
  readonly parentId?: string;
  /** The scan result identifier. */
  readonly id?: string;
  /** The ingestion job identifier. */
  ingestionJobId?: string;
  /** The resource identifier. */
  readonly resourceId?: string;
  /** The scan result status. */
  status?: "Accepted" | "InProgress" | "TransientFailure" | "Succeeded" | "Failed" | "Canceled";
  /** The scan diagnostics. */
  readonly diagnostics?: ScanDiagnosticsOutput;
  /** The scan start time. */
  readonly startTime?: string;
  /** The scan end time. */
  readonly endTime?: string;
  /** The scan ruleset version. */
  readonly scanRulesetVersion?: number;
  /** The scan ruleset type. */
  readonly scanRulesetType?: "Custom" | "System";
  /** Scan level type. */
  readonly scanLevelType?: "Full" | "Incremental";
  /** The error message. */
  readonly errorMessage?: string;
  /** The error. */
  readonly error?: ErrorModelOutput;
  /** The run type. */
  readonly runType?: string;
  /** The data source type. */
  readonly dataSourceType?:
    | "None"
    | "Fabric"
    | "AzureSubscription"
    | "AzureResourceGroup"
    | "AzureSynapseWorkspace"
    | "AzureSynapse"
    | "AdlsGen1"
    | "AdlsGen2"
    | "AmazonAccount"
    | "AmazonS3"
    | "AmazonSql"
    | "AzureCosmosDb"
    | "AzureDataExplorer"
    | "AzureFileService"
    | "AzureSqlDatabase"
    | "ArcEnabledSqlServer"
    | "AmazonPostgreSql"
    | "AzurePostgreSql"
    | "Databricks"
    | "SqlServerDatabase"
    | "AzureSqlDatabaseManagedInstance"
    | "AzureSqlDataWarehouse"
    | "AzureMySql"
    | "Hdfs"
    | "TableauServer"
    | "AzureStorage"
    | "Teradata"
    | "Oracle"
    | "PostgreSql"
    | "AmazonRedShift"
    | "DatabricksHms"
    | "SapS4Hana"
    | "SapEcc"
    | "Snowflake"
    | "PowerBI"
    | "Trident"
    | "Dataverse"
    | "DatabricksUnityCatalog";
}

/** The discovery execution details. */
export interface DiscoveryExecutionDetailsOutput {
  /** The discovery start time. */
  discoveryStartTime?: string;
  /** The discovery end time. */
  discoveryEndTime?: string;
  /** The discovery status. */
  status?:
    | "Queued"
    | "Running"
    | "Succeeded"
    | "Failed"
    | "Cancelled"
    | "Delayed"
    | "Throttled"
    | "CompletedWithExceptions"
    | "CompleteWithWarning";
  /** The discovery statistics. */
  statistics?: Record<string, any>;
  /** Indicates whether the error log is available. */
  isErrorLogAvailable?: boolean;
}

/** The ingestion execution details. */
export interface IngestionExecutionDetailsOutput {
  /** The ingestion start time. */
  ingestionStartTime?: string;
  /** The ingestion end time. */
  ingestionEndTime?: string;
  /** The ingestion status. */
  status?:
    | "None"
    | "Succeeded"
    | "Queued"
    | "InProgress"
    | "SourceUnknown"
    | "PartialSucceeded"
    | "Failed"
    | "Canceled"
    | "Canceling";
  /** The ingestion statistics. */
  statistics?: Record<string, any>;
  /** The estimated time remaining in seconds. */
  estimatedTimeRemainingInSeconds?: number;
  /** Indicates whether the error log is available. */
  isErrorLogAvailable?: boolean;
  /** The last updated time. */
  lastUpdatedAt?: string;
}

/** The scan diagnostics. */
export interface ScanDiagnosticsOutput {
  /** Notifications. */
  notifications?: Array<NotificationOutput>;
  /** Exception count map. */
  readonly exceptionCountMap?: Record<string, number>;
}

/** The notification model. */
export interface NotificationOutput {
  /** Notification message. */
  message?: string;
  /** Notification code. */
  code?: number;
}

/** The data source identifier. */
export interface DataSourceIdentifierOutput {
  /** The item path. */
  itemPath?: ItemPathOutput;
  /** The qualified name. */
  qualifiedName?: QualifiedNameOutput;
  /** The data source name. */
  dataSourceName?: string;
  /** The guid. */
  guid?: string;
  /** The resource identifier. */
  resourceId?: string;
}

/** The item path. */
export interface ItemPathOutput {
  /** The path. */
  path?: string;
  /** The extended properties. */
  extendedProperties?: ExtendedPropertiesOutput;
}

/** The extended properties. */
export interface ExtendedPropertiesOutput {
  /** The subscription identifier. */
  subscriptionId?: string;
  /** The resource group. */
  resourceGroup?: string;
}

/** The qualified name. */
export interface QualifiedNameOutput {
  /** The type name. */
  typeName?: string;
  /** The name. */
  name?: string;
  /** The extended properties. */
  extendedProperties?: ExtendedPropertiesOutput;
}

/** List of data sources. */
export interface DataSourceListOutput {
  /** List of data sources. */
  value: Array<DataSourceOutput>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
  /** The number of data sources. */
  count?: number;
}

/** The filter. */
export interface FilterOutput extends ProxyResourceOutput {
  /** The filter properties. */
  properties?: FilterPropertiesOutput;
}

/** The filter properties. */
export interface FilterPropertiesOutput {
  /** The exclude uri prefixes. */
  excludeUriPrefixes: Array<string>;
  /** The include uri prefixes. */
  includeUriPrefixes: Array<string>;
  /** The exclude regexes. */
  excludeRegexes?: Array<string>;
  /** The include regexes. */
  includeRegexes?: Array<string>;
}

/** List of integration runtime resources. */
export interface IntegrationRuntimeListOutput {
  /** List of integration runtimes. */
  value: Array<IntegrationRuntimeOutput>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
  /** The number of integration runtimes. */
  count?: number;
}

/** Purview nested object which serves as a compute resource for activities. */
export interface IntegrationRuntimeOutputParent extends ProxyResourceOutput {
  kind: "IntegrationRuntime" | "Managed" | "SelfHosted";
}

/** Integration runtime status. */
export interface IntegrationRuntimeStatusOutputParent extends ProxyResourceOutput {
  kind: "IntegrationRuntimeStatus" | "SelfHosted" | "Managed";
}

/** The integration runtime authentication keys. */
export interface IntegrationRuntimeAuthKeysOutput {
  /** The primary integration runtime authentication key. */
  authKey1?: string;
  /** The secondary integration runtime authentication key. */
  authKey2?: string;
}

/** List of managed virtual network resources. */
export interface ManagedVirtualNetworkListOutput {
  /** List of managed virtual networks. */
  value: Array<ManagedVirtualNetworkOutput>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
  /** The number of managed virtual networks. */
  count?: number;
}

/** The managed virtual network. */
export interface ManagedVirtualNetworkOutput extends ProxyResourceOutput {
  /** The properties of managed virtual network. */
  properties?: ManagedVirtualNetworkPropertiesOutput;
}

/** The properties of managed virtual network. */
export interface ManagedVirtualNetworkPropertiesOutput {
  /** The ID of the VNet that this integration runtime will join. */
  readonly vNetId?: string;
  /** The alias of managed virtual network. */
  readonly alias?: string;
}

/** List of managed private endpoint resources. */
export interface ManagedPrivateEndpointListOutput {
  /** List of managed private endpoints. */
  value: Array<ManagedPrivateEndpointOutput>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
  /** The number of managed private endpoints. */
  count?: number;
}

/** The managed private endpoint. */
export interface ManagedPrivateEndpointOutput extends ProxyResourceOutput {
  /** The properties of managed private endpoint. */
  properties?: ManagedPrivateEndpointPropertiesOutput;
}

/** The properties of managed private endpoint. */
export interface ManagedPrivateEndpointPropertiesOutput {
  /** The properties of connection state. */
  connectionState?: ConnectionStatePropertiesOutput;
  /** The fqdns of managed private endpoint. */
  fqdns?: Array<string>;
  /** The group identifier of managed private endpoint. */
  groupId?: string;
  /** The private link resource identifier of managed private endpoint. */
  privateLinkResourceId?: string;
  /** The provisioning state of managed private endpoint. */
  provisioningState?: string;
}

/** The properties of connection state. */
export interface ConnectionStatePropertiesOutput {
  /** ActionsRequired for a private link connection. */
  readonly actionsRequired?: string;
  /** Description of a private link connection. */
  readonly description?: string;
  /** Status of a private link connection. */
  readonly status?: string;
}

/** List of scans. */
export interface ScanListOutput {
  /** List of scans. */
  value: Array<ScanOutput>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
  /** The number of scans. */
  count?: number;
}

/** List of scan history with ingestion. */
export interface ScanHistoryListWithIngestionOutput {
  /** List of scan history with ingestion. */
  value: Array<ScanResultWithIngestionOutput>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
  /** The number of scan history with ingestion. */
  count?: number;
}

/** The scan ruleset. */
export interface ScanRulesetOutputParent extends VersionedScanRulesetOutput {
  kind:
    | "ScanRuleset"
    | "AzureSubscription"
    | "AzureResourceGroup"
    | "AzureSynapseWorkspace"
    | "AzureSynapse"
    | "AdlsGen1"
    | "AdlsGen2"
    | "AmazonAccount"
    | "AmazonS3"
    | "AmazonSql"
    | "AzureCosmosDb"
    | "AzureDataExplorer"
    | "AzureFileService"
    | "AzureSqlDatabase"
    | "AmazonPostgreSql"
    | "AzurePostgreSql"
    | "SqlServerDatabase"
    | "AzureSqlDatabaseManagedInstance"
    | "AzureSqlDataWarehouse"
    | "AzureMySql"
    | "AzureStorage"
    | "Teradata"
    | "Oracle"
    | "SapS4Hana"
    | "SapEcc"
    | "PowerBI";
}

/** The versioned scan ruleset. */
export interface VersionedScanRulesetOutput extends ProxyResourceOutput {
  /** Versioned scan ruleset properties. */
  scanRulesetType?: "Custom" | "System";
  /** Status of versioned scan ruleset properties. */
  readonly status?: "Enabled" | "Disabled";
  /** Version of versioned scan ruleset properties. */
  readonly version?: number;
}

/** List of scan rulesets. */
export interface ScanRulesetListOutput {
  /** List of scan rulesets. */
  value: Array<ScanRulesetOutput>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
  /** The number of scan rulesets. */
  count?: number;
}

/** List of system scan rulesets. */
export interface SystemScanRulesetListOutput {
  /** List of system scan rulesets. */
  value: Array<SystemScanRulesetOutput>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
  /** The number of system scan rulesets. */
  count?: number;
}

/** The system scan ruleset. */
export interface SystemScanRulesetOutputParent extends VersionedScanRulesetOutput {
  kind:
    | "SystemScanRuleset"
    | "AzureSubscription"
    | "AzureResourceGroup"
    | "AzureSynapseWorkspace"
    | "AzureSynapse"
    | "AdlsGen1"
    | "AdlsGen2"
    | "AmazonAccount"
    | "AmazonS3"
    | "AmazonSql"
    | "AzureCosmosDb"
    | "AzureDataExplorer"
    | "AzureFileService"
    | "AzureSqlDatabase"
    | "AmazonPostgreSql"
    | "AzurePostgreSql"
    | "SqlServerDatabase"
    | "AzureSqlDatabaseManagedInstance"
    | "AzureSqlDataWarehouse"
    | "AzureMySql"
    | "AzureStorage"
    | "Teradata"
    | "Oracle"
    | "SapS4Hana"
    | "SapEcc"
    | "PowerBI";
}

/** The trigger object. */
export interface TriggerOutput extends ProxyResourceOutput {
  /** The properties of trigger. */
  properties?: TriggerPropertiesOutput;
  /** The validation error info of trigger. */
  validationErrorInfo?: string;
}

/** Properties detail of trigger. */
export interface TriggerPropertiesOutput {
  /** The recurrence of trigger. */
  recurrence?: TriggerRecurrenceOutput;
  /** The recurrence interval of trigger. */
  recurrenceInterval?: string;
  /** The create time of trigger. */
  readonly createdAt?: string;
  /** The last modified time of trigger. */
  readonly lastModifiedAt?: string;
  /** The last scheduled time of trigger. */
  readonly lastScheduled?: string;
  /** The state of trigger. */
  state?: "Enabled" | "Disabled";
  /** The scan level of trigger. */
  scanLevel?: "Full" | "Incremental";
  /** The incremental scan start time of trigger. */
  incrementalScanStartTime?: string;
}

/** The recurrence of trigger. */
export interface TriggerRecurrenceOutput {
  /** The frequency of trigger recurrence. */
  frequency?: "Week" | "Month" | "Day" | "Hour";
  /** The interval of trigger recurrence. */
  interval?: number;
  /** The start time of trigger recurrence. */
  startTime?: string;
  /** The end time of trigger recurrence. */
  endTime?: string;
  /** The schedule of trigger recurrence. */
  schedule?: RecurrenceScheduleOutput;
  /** The time zone of trigger recurrence. */
  timeZone?: string;
}

/** Schedule of recurrence. */
export interface RecurrenceScheduleOutput {
  /** The minutes of recurrence schedule. */
  minutes?: Array<number>;
  /** The hours of recurrence schedule. */
  hours?: Array<number>;
  /** The week days of recurrence schedule. */
  weekDays?: Array<
    "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"
  >;
  /** Month days of recurrence schedule. */
  monthDays?: Array<number>;
  /** The monthly occurrences of recurrence schedule. */
  monthlyOccurrences?: Array<RecurrenceScheduleOccurrenceOutput>;
}

/** The occurrence of recurrence schedule. */
export interface RecurrenceScheduleOccurrenceOutput {
  /** The day of recurrence schedule occurrence. */
  day?: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  occurrence?: number;
}

/** The compute resource properties for managed integration runtime. */
export interface ManagedIntegrationRuntimeComputePropertiesOutput {
  /** The location for managed integration runtime. */
  location?: string;
}

/** Managed integration runtime type properties. */
export interface ManagedIntegrationRuntimeTypePropertiesOutput {
  /** The compute resource properties for managed integration runtime. */
  computeProperties?: ManagedIntegrationRuntimeComputePropertiesOutput;
}

/** The managed virtual network reference. */
export interface ManagedVirtualNetworkReferenceOutput {
  /** Reference ManagedVirtualNetwork name. */
  referenceName?: string;
  /** Managed virtual network reference type. */
  type?: string;
}

/** The managed integration runtime properties. */
export interface ManagedIntegrationRuntimePropertiesOutput {
  /** Managed integration runtime type properties. */
  typeProperties?: ManagedIntegrationRuntimeTypePropertiesOutput;
  /** The managed virtual network reference. */
  managedVirtualNetworkReference?: ManagedVirtualNetworkReferenceOutput;
  /** The managed integration runtime description. */
  description?: string;
}

/** The managed integration runtime. */
export interface ManagedIntegrationRuntimeOutput extends IntegrationRuntimeOutputParent {
  /** The managed integration runtime properties. */
  properties?: ManagedIntegrationRuntimePropertiesOutput;
  kind: "Managed";
}

/** The self-hosted integration runtime properties. */
export interface SelfHostedIntegrationRuntimePropertiesOutput {
  /** The self-hosted integration runtime description. */
  description?: string;
}

/** Self-hosted integration runtime. */
export interface SelfHostedIntegrationRuntimeOutput extends IntegrationRuntimeOutputParent {
  /** The self-hosted integration runtime properties. */
  properties?: SelfHostedIntegrationRuntimePropertiesOutput;
  kind: "SelfHosted";
}

/** Properties of Self-hosted integration runtime node. */
export interface SelfHostedIntegrationRuntimeNodeOutput {
  /** Name of the integration runtime node. */
  readonly nodeName?: string;
  /** Machine name of the integration runtime node. */
  readonly machineName?: string;
  /** URI for the host machine of the integration runtime. */
  readonly hostServiceUri?: string;
  /** Status of the integration runtime node. */
  readonly status?: string;
  /** The integration runtime capabilities dictionary. */
  readonly capabilities?: Record<string, string>;
  /** Status of the integration runtime node version. */
  readonly versionStatus?: string;
  /** Version of the integration runtime node. */
  readonly version?: string;
  /** The time at which the integration runtime node was registered in ISO8601 format. */
  readonly registerTime?: string;
  /** The most recent time at which the integration runtime was connected in ISO8601 format. */
  readonly lastConnectTime?: string;
  /** The time at which the integration runtime will expire in ISO8601 format. */
  readonly expiryTime?: string;
  /** The time the node last started up. */
  readonly lastStartTime?: string;
  /** The integration runtime node last stop time. */
  readonly lastStopTime?: string;
  /** The result of the last integration runtime node update. */
  readonly lastUpdateResult?: string;
  /** The last time for the integration runtime node update start. */
  readonly lastStartUpdateTime?: string;
  /** The last time for the integration runtime node update end. */
  readonly lastEndUpdateTime?: string;
  /** Indicates whether this node is the active dispatcher for integration runtime requests. */
  readonly isActiveDispatcher?: boolean;
  /** The concurrent jobs limit of self-hosted integration runtime node. */
  readonly concurrentJobsLimit?: number;
  /** The max concurrent jobs of self-hosted integration runtime node. */
  readonly maxConcurrentJobs?: number;
}

/** Self-hosted integration runtime status type properties. */
export interface SelfHostedIntegrationRuntimeStatusTypePropertiesOutput {
  /** The time at which the integration runtime was created, in ISO8601 format. */
  readonly createTime?: string;
  /** The task queue id of the integration runtime. */
  readonly taskQueueId?: string;
  /** It is used to set the encryption mode for node-node communication channel (when more than 2 self-hosted integration runtime nodes exist). */
  readonly internalChannelEncryption?: string;
  /** Version of the integration runtime. */
  readonly version?: string;
  /** List of nodes for this integration runtime. */
  nodes?: Array<SelfHostedIntegrationRuntimeNodeOutput>;
  /** The date at which the integration runtime will be scheduled to update, in ISO8601 format. */
  readonly scheduledUpdateDate?: string;
  /** The time in the date scheduled by service to update the integration runtime, e.g., PT03H is 3 hours. */
  readonly updateDelayOffset?: string;
  /** The local time zone offset in hours. */
  readonly localTimeZoneOffset?: string;
  /** Object with additional information about integration runtime capabilities. */
  readonly capabilities?: Record<string, string>;
  /** The URLs for the services used in integration runtime backend service. */
  readonly serviceUrls?: Array<string>;
  /** Whether Self-hosted integration runtime auto update has been turned on. */
  readonly autoUpdate?: "On" | "Off";
  /** Status of the integration runtime version. */
  readonly versionStatus?: string;
  /** The version that the integration runtime is going to update to. */
  readonly pushedVersion?: string;
  /** The latest version on download center. */
  readonly latestVersion?: string;
  /** The estimated time when the self-hosted integration runtime will be updated. */
  readonly autoUpdateETA?: string;
}

/** Self-hosted integration runtime status properties. */
export interface SelfHostedIntegrationRuntimeStatusPropertiesOutput {
  /** Self-hosted integration runtime status type properties. */
  typeProperties?: SelfHostedIntegrationRuntimeStatusTypePropertiesOutput;
  /** Self-hosted integration runtime state. */
  readonly state?: string;
}

/** Self-hosted integration runtime status. */
export interface SelfHostedIntegrationRuntimeStatusOutput extends IntegrationRuntimeStatusOutputParent {
  /** Self-hosted integration runtime status properties. */
  properties?: SelfHostedIntegrationRuntimeStatusPropertiesOutput;
  kind: "SelfHosted";
}

/** Interactive query properties of managed integration runtime. */
export interface InteractiveQueryOutput {
  /** Auto termination minutes of interactive query. */
  autoTerminationMinutes?: number;
  /** Status of interactive query. */
  status?: string;
}

/** Managed integration runtime status type properties. */
export interface ManagedIntegrationRuntimeStatusTypePropertiesOutput {
  /** The time at which the integration runtime was created, in ISO8601 format. */
  createTime?: string;
  /** Interactive query properties of managed integration runtime. */
  interactiveQuery?: InteractiveQueryOutput;
}

/** Managed integration runtime status properties. */
export interface ManagedIntegrationRuntimeStatusPropertiesOutput {
  /** Managed integration runtime status type properties. */
  typeProperties?: ManagedIntegrationRuntimeStatusTypePropertiesOutput;
  /** Managed integration runtime state. */
  readonly state?: string;
}

/** Managed integration runtime status. */
export interface ManagedIntegrationRuntimeStatusOutput extends IntegrationRuntimeStatusOutputParent {
  /** Managed integration runtime status properties. */
  properties?: ManagedIntegrationRuntimeStatusPropertiesOutput;
  kind: "Managed";
}

/** The reference to collection. */
export interface CollectionReferenceOutput {
  /** The last modified time of collection reference. */
  readonly lastModifiedAt?: string;
  /** The reference name of collection reference. */
  referenceName?: string;
  /** The type of collection reference. */
  type?: string;
}

/** The properties of system classification rule. */
export interface SystemClassificationRulePropertiesOutput {
  description?: string;
  /** The version of system classification rule. */
  readonly version?: number;
  /** The classification name of system classification rule. */
  classificationName?: string;
  /** The rule status of system classification rule. */
  ruleStatus?: "Enabled" | "Disabled";
  /** The create time of system classification rule. */
  readonly createdAt?: string;
  /** The last modified time of system classification rule. */
  readonly lastModifiedAt?: string;
}

/** The rule of system classification. */
export interface SystemClassificationRuleOutput extends ClassificationRuleOutputParent {
  /** The properties of system classification rule. */
  properties?: SystemClassificationRulePropertiesOutput;
  kind: "System";
}

/** Pattern of classification rule. */
export interface ClassificationRulePatternOutputParent {
  kind: "ClassificationRulePattern" | "Regex";
}

/** The properties of custom classification rule. */
export interface CustomClassificationRulePropertiesOutput {
  minimumPercentageMatch?: number;
  /** The action of classification rule. */
  readonly classificationAction?: "Keep" | "Delete";
  /** The data patterns of custom classification rule. */
  dataPatterns?: Array<ClassificationRulePatternOutput>;
  /** The column patterns of custom classification rule. */
  columnPatterns?: Array<ClassificationRulePatternOutput>;
  /** The description of custom classification rule. */
  description?: string;
  /** The version of custom classification rule. */
  readonly version?: number;
  /** The classification name of custom classification rule. */
  classificationName?: string;
  /** The rule status of custom classification rule. */
  ruleStatus?: "Enabled" | "Disabled";
  /** The create time of custom classification rule. */
  readonly createdAt?: string;
  /** The last modified time of custom classification rule. */
  readonly lastModifiedAt?: string;
}

/** Rule of custom classification. */
export interface CustomClassificationRuleOutput extends ClassificationRuleOutputParent {
  /** The properties of custom classification rule. */
  properties?: CustomClassificationRulePropertiesOutput;
  kind: "Custom";
}

/** Pattern of regex classification rule. */
export interface RegexClassificationRulePatternOutput extends ClassificationRulePatternOutputParent {
  /** The pattern of regex classification rule pattern. */
  pattern?: string;
  kind: "Regex";
}

/** The store. */
export interface StoreOutput {
  /** The reference name of store. */
  referenceName?: string;
  /** The type of store. */
  type?: string;
}

/** The key vault secret. */
export interface KeyVaultSecretOutput {
  /** The type of key vault secret. */
  type?: string;
  /** The secret name of key vault secret. */
  secretName?: string;
  /** The secret version of key vault secret. */
  secretVersion?: string;
  /** The store. */
  store?: StoreOutput;
}

/** Properties of key vault secret account key credential type. */
export interface KeyVaultSecretAccountKeyCredentialTypePropertiesOutput {
  /** The account key of key vault secret account key credential type. */
  accountKey?: KeyVaultSecretOutput;
}

/** Properties of account key credential. */
export interface AccountKeyCredentialPropertiesOutput {
  /** The type properties of account key credential. */
  typeProperties?: KeyVaultSecretAccountKeyCredentialTypePropertiesOutput;
  description?: string;
}

/** Credential type that uses Account Key for authentication. */
export interface AccountKeyAuthAzureKeyVaultCredentialOutput extends CredentialOutputParent {
  /** The properties of account key auth Azure Key Vault credential. */
  properties?: AccountKeyCredentialPropertiesOutput;
  kind: "AccountKey";
}

/** Properties of key vault secret user pass credential type. */
export interface KeyVaultSecretUserPassCredentialTypePropertiesOutput {
  /** User name. */
  user?: string;
  /** The password of key vault secret user pass credential type. */
  password?: KeyVaultSecretOutput;
}

/** Properties of user pass credential. */
export interface UserPassCredentialPropertiesOutput {
  /** Properties of key vault secret user pass credential type. */
  typeProperties?: KeyVaultSecretUserPassCredentialTypePropertiesOutput;
  description?: string;
}

/** Credential type that uses Basic authentication. */
export interface BasicAuthAzureKeyVaultCredentialOutput extends CredentialOutputParent {
  /** The properties of basic auth Azure Key Vault credential. */
  properties?: UserPassCredentialPropertiesOutput;
  kind: "BasicAuth";
}

/** The type properties of role ARN credential. */
export interface RoleARNCredentialTypePropertiesOutput {
  /** The role ARN of role ARN credential type properties. */
  roleARN?: string;
}

/** The properties of role ARN credential. */
export interface RoleARNCredentialPropertiesOutput {
  /** The type properties of role ARN credential. */
  typeProperties?: RoleARNCredentialTypePropertiesOutput;
  /** The description of role ARN credential. */
  description?: string;
}

/** Credential type that uses Account ID, External ID and Role ARN for authentication. */
export interface RoleARNCredentialOutput extends CredentialOutputParent {
  /** The properties of role ARN credential. */
  properties?: RoleARNCredentialPropertiesOutput;
  kind: "AmazonARN";
}

/** The type properties of key vault secret service principal credential. */
export interface KeyVaultSecretServicePrinipalCredentialTypePropertiesOutput {
  /** The service principal ID of key vault secret service principal credential type properties. */
  servicePrincipalId?: string;
  /** The key vault secret. */
  servicePrincipalKey?: KeyVaultSecretOutput;
  tenant?: string;
}

/** The properties of service principal Azure Key Vault credential. */
export interface ServicePrincipalAzureKeyVaultCredentialPropertiesOutput {
  /** The type properties of key vault secret service principal credential. */
  typeProperties?: KeyVaultSecretServicePrinipalCredentialTypePropertiesOutput;
  description?: string;
}

/** Credential type that uses Tenant ID and Service principal ID for authentication. */
export interface ServicePrincipalAzureKeyVaultCredentialOutput extends CredentialOutputParent {
  /** The properties of service principal Azure Key Vault credential. */
  properties?: ServicePrincipalAzureKeyVaultCredentialPropertiesOutput;
  kind: "ServicePrincipal";
}

/** Credential type that uses Sql for authentication. */
export interface SqlAuthAzureKeyVaultCredentialOutput extends CredentialOutputParent {
  /** Properties of user pass credential. */
  properties?: UserPassCredentialPropertiesOutput;
  kind: "SqlAuth";
}

/** The type properties of key vault secret consumer key credential. */
export interface KeyVaultSecretConsumerKeyCredentialTypePropertiesOutput {
  /** User name. */
  user?: string;
  /** The password of key vault secret consumer key credential type properties. */
  password?: KeyVaultSecretOutput;
  /** The consumer key of key vault secret consumer key credential type properties. */
  consumerKey?: string;
  /** The consumer secret of key vault secret consumer key credential type properties. */
  consumerSecret?: KeyVaultSecretOutput;
}

/** The properties of consumer key credential. */
export interface ConsumerKeyCredentialPropertiesOutput {
  /** The type properties of key vault secret consumer key credential. */
  typeProperties?: KeyVaultSecretConsumerKeyCredentialTypePropertiesOutput;
  /** Description of credential properties. */
  description?: string;
}

/** Credential type that uses consumer provided key and secret for authentication. */
export interface ConsumerKeyAuthAzureKeyVaultCredentialOutput extends CredentialOutputParent {
  /** The properties of consumer key credential. */
  properties?: ConsumerKeyCredentialPropertiesOutput;
  kind: "ConsumerKeyAuth";
}

/** The type properties of key vault secret delegated auth credential. */
export interface KeyVaultSecretDelegatedAuthCredentialTypePropertiesOutput {
  /** Credential type that uses Account ID, External ID and Role ARN for authentication. */
  clientId?: string;
  /** User name. */
  user?: string;
  /** Key vault secret. */
  password?: KeyVaultSecretOutput;
}

/** The properties of delegated auth credential. */
export interface DelegatedAuthCredentialPropertiesOutput {
  /** The type properties of key vault secret delegated auth credential. */
  typeProperties?: KeyVaultSecretDelegatedAuthCredentialTypePropertiesOutput;
  description?: string;
}

/** Credential type that uses Client ID for authentication. */
export interface DelegatedAuthAzureKeyVaultCredentialOutput extends CredentialOutputParent {
  /** The properties of delegated auth Azure Key Vault credential. */
  properties?: DelegatedAuthCredentialPropertiesOutput;
  kind: "DelegatedAuth";
}

/** The type properties of key vault secret managed identity Azure Key Vault credential. */
export interface KeyVaultSecretManagedIdentityAzureKeyVaultCredentialTypePropertiesOutput {
  /** The principal ID of key vault secret managed identity Azure Key Vault credential type properties. */
  principalId?: string;
  /** The tenant ID of key vault secret managed identity Azure Key Vault credential type properties. */
  tenantId?: string;
  /** The resource ID of key vault secret managed identity Azure Key Vault credential type properties. */
  resourceId?: string;
}

/** The properties of managed identity Azure Key Vault credential. */
export interface ManagedIdentityAzureKeyVaultCredentialPropertiesOutput {
  /** The type properties of managed identity Azure Key Vault credential. */
  typeProperties?: KeyVaultSecretManagedIdentityAzureKeyVaultCredentialTypePropertiesOutput;
  description?: string;
}

/** Credential type that uses User assigned managed identities for authentication. */
export interface ManagedIdentityAzureKeyVaultCredentialOutput extends CredentialOutputParent {
  /** The properties of managed identity Azure Key Vault credential. */
  properties?: ManagedIdentityAzureKeyVaultCredentialPropertiesOutput;
  kind: "ManagedIdentity";
}

/** Properties of data source. */
export interface DataSourcePropertiesOutput {
  /** The create time of data source. */
  readonly createdAt?: string;
  /** The last modified time of data source. */
  readonly lastModifiedAt?: string;
  /** The reference to collection. */
  collection?: CollectionReferenceOutput;
  /** Data source collection moving state. */
  dataSourceCollectionMovingState?: "Active" | "Moving" | "Failed";
}

/** Properties of azure subscription. */
export interface AzureSubscriptionPropertiesOutput extends DataSourcePropertiesOutput {
  /** The subscription ID of azure subscription. */
  subscriptionId?: string;
  /** The resource ID of azure subscription. */
  resourceId?: string;
  /** The data use governance of azure subscription. */
  dataUseGovernance?:
    | "Disabled"
    | "DisabledByAnotherAccount"
    | "Enabled"
    | "EnabledAtAncestorScope";
}

/** Azure subscription data source. */
export interface AzureSubscriptionDataSourceOutput extends DataSourceOutputParent {
  /** Azure subscription properties. */
  properties?: AzureSubscriptionPropertiesOutput;
  kind: "AzureSubscription";
}

/** Azure resource group properties. */
export interface AzureResourceGroupPropertiesOutput extends DataSourcePropertiesOutput {
  /** Subscription id. */
  subscriptionId?: string;
  /** Resource group. */
  resourceGroup?: string;
  /** Resource id. */
  resourceId?: string;
  /** Data use governance. */
  dataUseGovernance?:
    | "Disabled"
    | "DisabledByAnotherAccount"
    | "Enabled"
    | "EnabledAtAncestorScope";
}

/** Azure resource group data source. */
export interface AzureResourceGroupDataSourceOutput extends DataSourceOutputParent {
  /** Azure resource group properties. */
  properties?: AzureResourceGroupPropertiesOutput;
  kind: "AzureResourceGroup";
}

/** Azure data source properties. */
export interface AzureDataSourcePropertiesOutput extends DataSourcePropertiesOutput {
  /** Resource group. */
  resourceGroup?: string;
  /** Subscription id. */
  subscriptionId?: string;
  /** Location. */
  location?: string;
  /** Resource name. */
  resourceName?: string;
  /** Resource id. */
  resourceId?: string;
  /** Data use governance. */
  dataUseGovernance?:
    | "Disabled"
    | "DisabledByAnotherAccount"
    | "Enabled"
    | "EnabledAtAncestorScope";
}

/** Azure synapse workspace data source properties. */
export interface AzureSynapseWorkspacePropertiesOutput extends AzureDataSourcePropertiesOutput {
  /** The dedicated SQL endpoint of azure synapse workspace. */
  dedicatedSqlEndpoint?: string;
  /** The serverless SQL endpoint of azure synapse workspace. */
  serverlessSqlEndpoint?: string;
}

/** Azure synapse workspace data source. */
export interface AzureSynapseWorkspaceDataSourceOutput extends DataSourceOutputParent {
  /** Azure synapse workspace properties. */
  properties?: AzureSynapseWorkspacePropertiesOutput;
  kind: "AzureSynapseWorkspace";
}

/** Azure synapse data source properties. */
export interface AzureSynapsePropertiesOutput extends AzureDataSourcePropertiesOutput {
  /** The SQL endpoint of azure synapse. */
  sqlEndpoint?: string;
  /** The SQL on demand endpoint of azure synapse. */
  sqlOnDemandEndpoint?: string;
}

/** Azure synapse data source. */
export interface AzureSynapseDataSourceOutput extends DataSourceOutputParent {
  /** Azure synapse properties. */
  properties?: AzureSynapsePropertiesOutput;
  kind: "AzureSynapse";
}

/** The properties of ADLS Gen1. */
export interface AdlsGen1PropertiesOutput extends AzureDataSourcePropertiesOutput {
  /** The endpoint of ADLS Gen1. */
  endpoint?: string;
}

/** The ADLS Gen1 data source. */
export interface AdlsGen1DataSourceOutput extends DataSourceOutputParent {
  /** The properties of ADLS Gen1. */
  properties?: AdlsGen1PropertiesOutput;
  kind: "AdlsGen1";
}

/** The properties of ADLS Gen2. */
export interface AdlsGen2PropertiesOutput extends AzureDataSourcePropertiesOutput {
  /** The endpoint of ADLS Gen2. */
  endpoint?: string;
}

/** The ADLS Gen2 data source. */
export interface AdlsGen2DataSourceOutput extends DataSourceOutputParent {
  /** The properties of ADLS Gen2. */
  properties?: AdlsGen2PropertiesOutput;
  kind: "AdlsGen2";
}

/** The properties of Amazon account. */
export interface AmazonAccountPropertiesOutput extends DataSourcePropertiesOutput {
  /** AWS account id. */
  awsAccountId?: string;
  /** Role arn. */
  roleARN?: string;
}

/** The Amazon account data source. */
export interface AmazonAccountDataSourceOutput extends DataSourceOutputParent {
  /** The properties of Amazon account. */
  properties?: AmazonAccountPropertiesOutput;
  kind: "AmazonAccount";
}

/** The properties of Amazon S3. */
export interface AmazonS3PropertiesOutput extends DataSourcePropertiesOutput {
  /** Service URL. */
  serviceUrl?: string;
  /** Role ARN. */
  roleARN?: string;
}

/** The Amazon S3 data source. */
export interface AmazonS3DataSourceOutput extends DataSourceOutputParent {
  /** Amazon S3 properties. */
  properties?: AmazonS3PropertiesOutput;
  kind: "AmazonS3";
}

/** The properties of Amazon SQL. */
export interface AmazonSqlPropertiesOutput extends DataSourcePropertiesOutput {
  /** Server Endpoint. */
  serverEndpoint?: string;
  /** Port. */
  port?: number;
  /** Vpc Endpoint Service Name. */
  vpcEndpointServiceName?: string;
}

/** The Amazon SQL data source. */
export interface AmazonSqlDataSourceOutput extends DataSourceOutputParent {
  /** Amazon SQL properties. */
  properties?: AmazonSqlPropertiesOutput;
  kind: "AmazonSql";
}

/** The properties of Azure Cosmos DB. */
export interface AzureCosmosDbPropertiesOutput extends AzureDataSourcePropertiesOutput {
  /** The account URI of Azure Cosmos DB. */
  accountUri?: string;
}

/** The Azure Cosmos DB data source. */
export interface AzureCosmosDbDataSourceOutput extends DataSourceOutputParent {
  /** The properties of Azure Cosmos DB. */
  properties?: AzureCosmosDbPropertiesOutput;
  kind: "AzureCosmosDb";
}

/** The properties of azure data explorer. */
export interface AzureDataExplorerPropertiesOutput extends AzureDataSourcePropertiesOutput {
  endpoint?: string;
}

/** The azure data explorer data source. */
export interface AzureDataExplorerDataSourceOutput extends DataSourceOutputParent {
  /** The properties of azure data explorer. */
  properties?: AzureDataExplorerPropertiesOutput;
  kind: "AzureDataExplorer";
}

/** The properties of azure file service. */
export interface AzureFileServicePropertiesOutput extends AzureDataSourcePropertiesOutput {
  /** The endpoint of azure file service. */
  endpoint?: string;
}

/** The azure file service data source. */
export interface AzureFileServiceDataSourceOutput extends DataSourceOutputParent {
  /** The properties of azure file service. */
  properties?: AzureFileServicePropertiesOutput;
  kind: "AzureFileService";
}

/** The properties of Azure SQL database. */
export interface AzureSqlDatabasePropertiesOutput extends AzureDataSourcePropertiesOutput {
  /** The server endpoint of Azure SQL database. */
  serverEndpoint?: string;
}

/** The Azure SQL database data source. */
export interface AzureSqlDatabaseDataSourceOutput extends DataSourceOutputParent {
  /** The properties of Azure SQL database. */
  properties?: AzureSqlDatabasePropertiesOutput;
  kind: "AzureSqlDatabase";
}

/** The properties of Amazon Postgre SQL. */
export interface AmazonPostgreSqlPropertiesOutput extends DataSourcePropertiesOutput {
  /** The server endpoint of Amazon Postgre SQL. */
  serverEndpoint?: string;
  /** The port of Amazon Postgre SQL. */
  port?: number;
  /** The vpc endpoint service name of Amazon Postgre SQL. */
  vpcEndpointServiceName?: string;
}

/** The Amazon Postgre SQL data source. */
export interface AmazonPostgreSqlDataSourceOutput extends DataSourceOutputParent {
  /** The properties of Amazon Postgre SQL. */
  properties?: AmazonPostgreSqlPropertiesOutput;
  kind: "AmazonPostgreSql";
}

/** The properties of Azure Postgre SQL. */
export interface AzurePostgreSqlPropertiesOutput extends AzureDataSourcePropertiesOutput {
  /** The server endpoint of Azure Postgre SQL. */
  serverEndpoint?: string;
  port?: number;
}

/** The Azure Postgre SQL data source. */
export interface AzurePostgreSqlDataSourceOutput extends DataSourceOutputParent {
  /** The properties of Azure Postgre SQL. */
  properties?: AzurePostgreSqlPropertiesOutput;
  kind: "AzurePostgreSql";
}

/** The properties of sql server database. */
export interface SqlServerDatabasePropertiesOutput extends AzureDataSourcePropertiesOutput {
  /** The server endpoint of sql server database. */
  serverEndpoint?: string;
}

/** The sql server database data source. */
export interface SqlServerDatabaseDataSourceOutput extends DataSourceOutputParent {
  /** The properties of sql server database. */
  properties?: SqlServerDatabasePropertiesOutput;
  kind: "SqlServerDatabase";
}

/** The properties of Azure SQL database managed instance. */
export interface AzureSqlDatabaseManagedInstancePropertiesOutput extends AzureDataSourcePropertiesOutput {
  serverEndpoint?: string;
}

/** The Azure SQL database managed instance data source. */
export interface AzureSqlDatabaseManagedInstanceDataSourceOutput extends DataSourceOutputParent {
  /** The properties of Azure SQL database managed instance. */
  properties?: AzureSqlDatabaseManagedInstancePropertiesOutput;
  kind: "AzureSqlDatabaseManagedInstance";
}

/** The properties of Azure SQL data warehouse. */
export interface AzureSqlDataWarehousePropertiesOutput extends AzureDataSourcePropertiesOutput {
  serverEndpoint?: string;
}

/** The Azure SQL data warehouse data source. */
export interface AzureSqlDataWarehouseDataSourceOutput extends DataSourceOutputParent {
  /** The properties of Azure SQL data warehouse. */
  properties?: AzureSqlDataWarehousePropertiesOutput;
  kind: "AzureSqlDataWarehouse";
}

/** Azure MySQL data source properties. */
export interface AzureMySqlPropertiesOutput extends AzureDataSourcePropertiesOutput {
  /** The server endpoint of azure my sql. */
  serverEndpoint?: string;
  /** The port of azure my sql. */
  port?: number;
}

/** Azure MySQL data source. */
export interface AzureMySqlDataSourceOutput extends DataSourceOutputParent {
  /** Azure MySQL properties. */
  properties?: AzureMySqlPropertiesOutput;
  kind: "AzureMySql";
}

/** The properties of Azure Storage. */
export interface AzureStoragePropertiesOutput extends AzureDataSourcePropertiesOutput {
  /** The endpoint of Azure Storage. */
  endpoint?: string;
}

/** The Azure Storage data source. */
export interface AzureStorageDataSourceOutput extends DataSourceOutputParent {
  /** The properties of Azure Storage. */
  properties?: AzureStoragePropertiesOutput;
  kind: "AzureStorage";
}

/** The properties of teradata. */
export interface TeradataPropertiesOutput extends DataSourcePropertiesOutput {
  /** The host of teradata. */
  host?: string;
}

/** The teradata data source. */
export interface TeradataDataSourceOutput extends DataSourceOutputParent {
  /** The properties of teradata. */
  properties?: TeradataPropertiesOutput;
  kind: "Teradata";
}

/** The properties of oracle. */
export interface OraclePropertiesOutput extends DataSourcePropertiesOutput {
  /** The host of Oracle server. */
  host?: string;
  /** The port of Oracle server. */
  port?: string;
  /** The service of Oracle server. */
  service?: string;
}

/** The oracle data source. */
export interface OracleDataSourceOutput extends DataSourceOutputParent {
  /** The properties of oracle. */
  properties?: OraclePropertiesOutput;
  kind: "Oracle";
}

/** SAP S/4HANA data source properties. */
export interface SapS4HanaPropertiesOutput extends DataSourcePropertiesOutput {
  /** The application server of SAP S/4HANA. */
  applicationServer?: string;
  /** The system number of SAP S/4HANA. */
  systemNumber?: string;
}

/** SAP S/4HANA data source. */
export interface SapS4HanaDataSourceOutput extends DataSourceOutputParent {
  /** SAP S/4HANA data source properties. */
  properties?: SapS4HanaPropertiesOutput;
  kind: "SapS4Hana";
}

/** SAP ECC properties. */
export interface SapEccPropertiesOutput extends DataSourcePropertiesOutput {
  /** The application server of SAP ECC. */
  applicationServer?: string;
  /** The system number of SAP ECC. */
  systemNumber?: string;
}

/** SAP ECC data source. */
export interface SapEccDataSourceOutput extends DataSourceOutputParent {
  /** SAP ECC properties. */
  properties?: SapEccPropertiesOutput;
  kind: "SapEcc";
}

/** Power BI properties. */
export interface PowerBIPropertiesOutput extends DataSourcePropertiesOutput {
  /** The tenant of Power BI. */
  tenant?: string;
}

/** Power BI data source. */
export interface PowerBIDataSourceOutput extends DataSourceOutputParent {
  /** Power BI properties. */
  properties?: PowerBIPropertiesOutput;
  kind: "PowerBI";
}

/** Scan ruleset properties. */
export interface ScanRulesetPropertiesOutput {
  /** The time at which the scan ruleset was created. */
  readonly createdAt?: string;
  description?: string;
  /** The system classifications that are excluded from the scan ruleset. */
  excludedSystemClassifications?: Array<string>;
  /** The custom classification rule names that are included in the scan ruleset. */
  includedCustomClassificationRuleNames?: Array<string>;
  /** The time at which the scan ruleset was last modified. */
  readonly lastModifiedAt?: string;
}

/** Azure subscription scan ruleset properties. */
export interface AzureSubscriptionScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** Azure subscription scan ruleset. */
export interface AzureSubscriptionScanRulesetOutput extends ScanRulesetOutputParent {
  /** Azure subscription scan ruleset properties. */
  properties?: AzureSubscriptionScanRulesetPropertiesOutput;
  kind: "AzureSubscription";
}

/** Azure resource group scan ruleset properties. */
export interface AzureResourceGroupScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** Azure resource group scan ruleset. */
export interface AzureResourceGroupScanRulesetOutput extends ScanRulesetOutputParent {
  /** Azure resource group scan ruleset properties. */
  properties?: AzureResourceGroupScanRulesetPropertiesOutput;
  kind: "AzureResourceGroup";
}

/** Azure synapse workspace scan ruleset properties. */
export interface AzureSynapseWorkspaceScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** Azure synapse workspace scan ruleset. */
export interface AzureSynapseWorkspaceScanRulesetOutput extends ScanRulesetOutputParent {
  /** Azure synapse workspace scan ruleset properties. */
  properties?: AzureSynapseWorkspaceScanRulesetPropertiesOutput;
  kind: "AzureSynapseWorkspace";
}

/** Azure synapse scan ruleset properties. */
export interface AzureSynapseScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** Azure synapse scan ruleset. */
export interface AzureSynapseScanRulesetOutput extends ScanRulesetOutputParent {
  /** Azure synapse scan ruleset properties. */
  properties?: AzureSynapseScanRulesetPropertiesOutput;
  kind: "AzureSynapse";
}

/** Custom file type. */
export interface CustomFileTypeOutput {
  /** The built-in file type of the custom file type. */
  builtInType?:
    | "AVRO"
    | "ORC"
    | "PARQUET"
    | "JSON"
    | "TXT"
    | "XML"
    | "Documents"
    | "CSV"
    | "PSV"
    | "SSV"
    | "TSV"
    | "GZ"
    | "DOC"
    | "DOCM"
    | "DOCX"
    | "DOT"
    | "ODP"
    | "ODS"
    | "ODT"
    | "PDF"
    | "POT"
    | "PPS"
    | "PPSX"
    | "PPT"
    | "PPTM"
    | "PPTX"
    | "XLC"
    | "XLS"
    | "XLSB"
    | "XLSM"
    | "XLSX"
    | "XLT";
  /** The custom delimiter of the custom file type. */
  customDelimiter?: string;
}

/** Custom file extension. */
export interface CustomFileExtensionOutput {
  /** The custom file type of the custom file extension. */
  customFileType?: CustomFileTypeOutput;
  /** The description of the custom file extension. */
  description?: string;
  /** The flag to indicate whether the custom file extension is enabled or not. */
  enabled?: boolean;
  /** The file extension of the custom file extension. */
  fileExtension?: string;
}

/** Scanning rule. */
export interface ScanningRuleOutput {
  fileExtensions?: Array<
    | "AVRO"
    | "ORC"
    | "PARQUET"
    | "JSON"
    | "TXT"
    | "XML"
    | "Documents"
    | "CSV"
    | "PSV"
    | "SSV"
    | "TSV"
    | "GZ"
    | "DOC"
    | "DOCM"
    | "DOCX"
    | "DOT"
    | "ODP"
    | "ODS"
    | "ODT"
    | "PDF"
    | "POT"
    | "PPS"
    | "PPSX"
    | "PPT"
    | "PPTM"
    | "PPTX"
    | "XLC"
    | "XLS"
    | "XLSB"
    | "XLSM"
    | "XLSX"
    | "XLT"
  >;
  /** The custom file extensions of the scanning rule. */
  customFileExtensions?: Array<CustomFileExtensionOutput>;
}

/** Scanning rule scan ruleset properties. */
export interface ScanningRuleScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {
  /** The scanning rule of the scanning rule scan ruleset. */
  scanningRule?: ScanningRuleOutput;
}

/** ADLS Gen1 scan ruleset properties. */
export interface AdlsGen1ScanRulesetPropertiesOutput extends ScanningRuleScanRulesetPropertiesOutput {}

/** ADLS Gen1 scan ruleset. */
export interface AdlsGen1ScanRulesetOutput extends ScanRulesetOutputParent {
  /** ADLS Gen1 scan ruleset properties. */
  properties?: AdlsGen1ScanRulesetPropertiesOutput;
  kind: "AdlsGen1";
}

/** Adls gen 2 scan ruleset properties. */
export interface AdlsGen2ScanRulesetPropertiesOutput extends ScanningRuleScanRulesetPropertiesOutput {}

/** Adls gen 2 scan ruleset. */
export interface AdlsGen2ScanRulesetOutput extends ScanRulesetOutputParent {
  /** Adls gen 2 scan ruleset properties. */
  properties?: AdlsGen2ScanRulesetPropertiesOutput;
  kind: "AdlsGen2";
}

/** Amazon account scan ruleset properties. */
export interface AmazonAccountScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** Amazon account scan ruleset. */
export interface AmazonAccountScanRulesetOutput extends ScanRulesetOutputParent {
  /** Amazon account scan ruleset properties. */
  properties?: AmazonAccountScanRulesetPropertiesOutput;
  kind: "AmazonAccount";
}

/** Amazon S3 scan ruleset properties. */
export interface AmazonS3ScanRulesetPropertiesOutput extends ScanningRuleScanRulesetPropertiesOutput {}

/** Amazon S3 scan ruleset. */
export interface AmazonS3ScanRulesetOutput extends ScanRulesetOutputParent {
  /** Amazon S3 scan ruleset properties. */
  properties?: AmazonS3ScanRulesetPropertiesOutput;
  kind: "AmazonS3";
}

/** Amazon SQL scan ruleset properties. */
export interface AmazonSqlScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** Amazon SQL scan ruleset. */
export interface AmazonSqlScanRulesetOutput extends ScanRulesetOutputParent {
  /** Amazon SQL scan ruleset properties. */
  properties?: AmazonSqlScanRulesetPropertiesOutput;
  kind: "AmazonSql";
}

/** Azure Cosmos DB scan ruleset properties. */
export interface AzureCosmosDbScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** Azure Cosmos DB scan ruleset. */
export interface AzureCosmosDbScanRulesetOutput extends ScanRulesetOutputParent {
  /** Azure Cosmos DB scan ruleset properties. */
  properties?: AzureCosmosDbScanRulesetPropertiesOutput;
  kind: "AzureCosmosDb";
}

/** Azure data explorer scan ruleset properties. */
export interface AzureDataExplorerScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** Azure data explorer scan ruleset. */
export interface AzureDataExplorerScanRulesetOutput extends ScanRulesetOutputParent {
  /** Azure data explorer scan ruleset properties. */
  properties?: AzureDataExplorerScanRulesetPropertiesOutput;
  kind: "AzureDataExplorer";
}

/** Azure file service scan ruleset properties. */
export interface AzureFileServiceScanRulesetPropertiesOutput extends ScanningRuleScanRulesetPropertiesOutput {}

/** Azure file service scan ruleset. */
export interface AzureFileServiceScanRulesetOutput extends ScanRulesetOutputParent {
  /** Azure file service scan ruleset properties. */
  properties?: AzureFileServiceScanRulesetPropertiesOutput;
  kind: "AzureFileService";
}

/** Azure SQL db scan ruleset properties. */
export interface AzureSqlDatabaseScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** Azure SQL db scan ruleset. */
export interface AzureSqlDatabaseScanRulesetOutput extends ScanRulesetOutputParent {
  /** Azure SQL db scan ruleset properties. */
  properties?: AzureSqlDatabaseScanRulesetPropertiesOutput;
  kind: "AzureSqlDatabase";
}

/** Azure Postgre SQL scan ruleset properties. */
export interface AmazonPostgreSqlScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** Azure Postgre SQL scan ruleset. */
export interface AmazonPostgreSqlScanRulesetOutput extends ScanRulesetOutputParent {
  /** Azure Postgre SQL scan ruleset properties. */
  properties?: AmazonPostgreSqlScanRulesetPropertiesOutput;
  kind: "AmazonPostgreSql";
}

/** Azure Postgre SQL scan ruleset properties. */
export interface AzurePostgreSqlScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** Azure Postgre SQL scan ruleset. */
export interface AzurePostgreSqlScanRulesetOutput extends ScanRulesetOutputParent {
  /** Azure Postgre SQL scan ruleset properties. */
  properties?: AzurePostgreSqlScanRulesetPropertiesOutput;
  kind: "AzurePostgreSql";
}

/** Sql server database scan ruleset properties. */
export interface SqlServerDatabaseScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** Sql server database scan ruleset. */
export interface SqlServerDatabaseScanRulesetOutput extends ScanRulesetOutputParent {
  /** Sql server database scan ruleset properties. */
  properties?: SqlServerDatabaseScanRulesetPropertiesOutput;
  kind: "SqlServerDatabase";
}

/** Azure SQL db managed instance scan ruleset properties. */
export interface AzureSqlDatabaseManagedInstanceScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** Azure SQL db managed instance scan ruleset. */
export interface AzureSqlDatabaseManagedInstanceScanRulesetOutput extends ScanRulesetOutputParent {
  /** Azure SQL db managed instance scan ruleset properties. */
  properties?: AzureSqlDatabaseManagedInstanceScanRulesetPropertiesOutput;
  kind: "AzureSqlDatabaseManagedInstance";
}

/** Azure SQL data warehouse scan ruleset properties. */
export interface AzureSqlDataWarehouseScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** Azure SQL data warehouse scan ruleset. */
export interface AzureSqlDataWarehouseScanRulesetOutput extends ScanRulesetOutputParent {
  /** Azure SQL data warehouse scan ruleset properties. */
  properties?: AzureSqlDataWarehouseScanRulesetPropertiesOutput;
  kind: "AzureSqlDataWarehouse";
}

/** Azure MySQL scan ruleset properties. */
export interface AzureMySqlScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** Azure MySQL scan ruleset. */
export interface AzureMySqlScanRulesetOutput extends ScanRulesetOutputParent {
  /** Azure MySQL scan ruleset properties. */
  properties?: AzureMySqlScanRulesetPropertiesOutput;
  kind: "AzureMySql";
}

/** Azure Storage scan ruleset properties. */
export interface AzureStorageScanRulesetPropertiesOutput extends ScanningRuleScanRulesetPropertiesOutput {}

/** Azure Storage scan ruleset. */
export interface AzureStorageScanRulesetOutput extends ScanRulesetOutputParent {
  /** Azure Storage scan ruleset properties. */
  properties?: AzureStorageScanRulesetPropertiesOutput;
  kind: "AzureStorage";
}

/** Teradata scan ruleset properties. */
export interface TeradataScanRulesetPropertiesOutput extends ScanningRuleScanRulesetPropertiesOutput {}

/** Teradata scan ruleset. */
export interface TeradataScanRulesetOutput extends ScanRulesetOutputParent {
  /** Teradata scan ruleset properties. */
  properties?: TeradataScanRulesetPropertiesOutput;
  kind: "Teradata";
}

/** Oracle scan rule set properties. */
export interface OracleScanRulesetPropertiesOutput extends ScanningRuleScanRulesetPropertiesOutput {}

/** Oracle scan ruleset. */
export interface OracleScanRulesetOutput extends ScanRulesetOutputParent {
  /** Oracle scan rule set properties. */
  properties?: OracleScanRulesetPropertiesOutput;
  kind: "Oracle";
}

/** SAP S/4HANA scan ruleset properties. */
export interface SapS4HanaScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** SAP S/4HANA scan ruleset. */
export interface SapS4HanaScanRulesetOutput extends ScanRulesetOutputParent {
  /** SAP S/4HANA scan ruleset properties. */
  properties?: SapS4HanaScanRulesetPropertiesOutput;
  kind: "SapS4Hana";
}

/** SAP ECC scan ruleset properties. */
export interface SapEccScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** SAP ECC scan ruleset. */
export interface SapEccScanRulesetOutput extends ScanRulesetOutputParent {
  /** SAP ECC scan ruleset properties. */
  properties?: SapEccScanRulesetPropertiesOutput;
  kind: "SapEcc";
}

/** Power BI scan ruleset properties. */
export interface PowerBIScanRulesetPropertiesOutput extends ScanRulesetPropertiesOutput {}

/** Power BI scan ruleset. */
export interface PowerBIScanRulesetOutput extends ScanRulesetOutputParent {
  /** Power BI scan ruleset properties. */
  properties?: PowerBIScanRulesetPropertiesOutput;
  kind: "PowerBI";
}

/** Resource name filter. */
export interface ResourceNameFilterOutput {
  excludePrefixes?: Array<string>;
  includePrefixes?: Array<string>;
  resources?: Array<string>;
}

/** The credential reference. */
export interface CredentialReferenceOutput {
  /** The reference name of the credential. */
  referenceName?: string;
  /** The type of the credential. */
  credentialType?:
    | "AccountKey"
    | "ServicePrincipal"
    | "BasicAuth"
    | "SqlAuth"
    | "AmazonARN"
    | "ConsumerKeyAuth"
    | "DelegatedAuth"
    | "ManagedIdentity";
}

/** Resource type filter. */
export interface ResourceTypeFilterOutput {
  /** The name of the scan ruleset. */
  scanRulesetName?: string;
  /** The type of the scan ruleset. */
  scanRulesetType?: "Custom" | "System";
  /** Resource name filter. */
  resourceNameFilter?: ResourceNameFilterOutput;
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
}

/** The integration runtime reference. */
export interface ConnectedViaOutput {
  /** The reference name of the integration runtime. */
  referenceName?: string;
  /** The type of the integration runtime. */
  readonly integrationRuntimeType?: string;
}

/** Scan properties. */
export interface ScanPropertiesOutput {
  /** The name of the scan ruleset. */
  scanRulesetName?: string;
  /** The name of the business rule set. */
  businessRuleSetName?: string;
  /** The type of the scan ruleset. */
  scanRulesetType?: "Custom" | "System";
  /** The collection reference of the scan. */
  collection?: CollectionReferenceOutput;
  /** The domain of the scan. */
  domain?: string;
  /** The number of workers of the scan. */
  workers?: number;
  /** The creation time of the scan. */
  readonly createdAt?: string;
  /** The last modified time of the scan. */
  readonly lastModifiedAt?: string;
  /** The integration runtime reference of the scan. */
  connectedVia?: ConnectedViaOutput;
  /** The flag to indicate whether the scan is a preset scan or not. */
  isPresetScan?: boolean;
  /** The flag to indicate whether the live view is enabled or not. */
  isLiveViewEnabled?: boolean;
  /** The number of parallel scans. */
  parallelScanCount?: number;
  /** The log level of the scan. */
  logLevel?: string;
}

/** Expanding resource scan properties. */
export interface ExpandingResourceScanPropertiesOutput extends ScanPropertiesOutput {
  /** Resource types of scan properties in expanding resources. */
  resourceTypes?: ExpandingResourceScanPropertiesResourceTypesOutput;
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
}

/** Resource types of scan properties in expanding resources. */
export interface ExpandingResourceScanPropertiesResourceTypesOutput {
  /** Resource type filter. */
  none?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  azureSubscription?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  azureResourceGroup?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  azureSynapseWorkspace?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  azureSynapse?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  adlsGen1?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  adlsGen2?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  amazonAccount?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  amazonS3?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  amazonSql?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  azureCosmosDb?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  azureDataExplorer?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  azureFileService?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  azureSqlDatabase?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  amazonPostgreSql?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  azurePostgreSql?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  sqlServerDatabase?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  azureSqlDatabaseManagedInstance?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  azureSqlDataWarehouse?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  azureMySql?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  azureStorage?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  teradata?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  oracle?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  sapS4Hana?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  sapEcc?: ResourceTypeFilterOutput;
  /** Resource type filter. */
  powerBI?: ResourceTypeFilterOutput;
}

/** Azure subscription credential scan properties. */
export interface AzureSubscriptionCredentialScanPropertiesOutput extends ExpandingResourceScanPropertiesOutput {}

/** Azure subscription credential scan. */
export interface AzureSubscriptionCredentialScanOutput extends ScanOutputParent {
  /** Azure subscription credential scan properties. */
  properties?: AzureSubscriptionCredentialScanPropertiesOutput;
  kind: "AzureSubscriptionCredential";
}

/** Azure subscription MSI scan properties. */
export interface AzureSubscriptionMsiScanPropertiesOutput extends ExpandingResourceScanPropertiesOutput {}

/** Azure subscription MSI scan. */
export interface AzureSubscriptionMsiScanOutput extends ScanOutputParent {
  /** Azure subscription MSI scan properties. */
  properties?: AzureSubscriptionMsiScanPropertiesOutput;
  kind: "AzureSubscriptionMsi";
}

/** Azure resource group credential scan properties. */
export interface AzureResourceGroupCredentialScanPropertiesOutput extends ExpandingResourceScanPropertiesOutput {}

/** Azure resource group credential scan. */
export interface AzureResourceGroupCredentialScanOutput extends ScanOutputParent {
  /** Azure resource group credential scan properties. */
  properties?: AzureResourceGroupCredentialScanPropertiesOutput;
  kind: "AzureResourceGroupCredential";
}

/** Azure resource group MSI scan properties. */
export interface AzureResourceGroupMsiScanPropertiesOutput extends ExpandingResourceScanPropertiesOutput {}

/** Azure resource group MSI scan. */
export interface AzureResourceGroupMsiScanOutput extends ScanOutputParent {
  /** Azure resource group MSI scan properties. */
  properties?: AzureResourceGroupMsiScanPropertiesOutput;
  kind: "AzureResourceGroupMsi";
}

/** Azure synapse workspace credential scan properties. */
export interface AzureSynapseWorkspaceCredentialScanPropertiesOutput extends ExpandingResourceScanPropertiesOutput {}

/** Azure synapse workspace credential scan. */
export interface AzureSynapseWorkspaceCredentialScanOutput extends ScanOutputParent {
  /** Azure synapse workspace credential scan properties. */
  properties?: AzureSynapseWorkspaceCredentialScanPropertiesOutput;
  kind: "AzureSynapseWorkspaceCredential";
}

/** Azure synapse workspace MSI scan properties. */
export interface AzureSynapseWorkspaceMsiScanPropertiesOutput extends ExpandingResourceScanPropertiesOutput {}

/** Azure synapse workspace MSI scan. */
export interface AzureSynapseWorkspaceMsiScanOutput extends ScanOutputParent {
  /** Azure synapse workspace MSI scan properties. */
  properties?: AzureSynapseWorkspaceMsiScanPropertiesOutput;
  kind: "AzureSynapseWorkspaceMsi";
}

/** Azure synapse credential scan properties. */
export interface AzureSynapseCredentialScanPropertiesOutput extends ExpandingResourceScanPropertiesOutput {}

/** Azure synapse credential scan. */
export interface AzureSynapseCredentialScanOutput extends ScanOutputParent {
  /** Azure synapse credential scan properties. */
  properties?: AzureSynapseCredentialScanPropertiesOutput;
  kind: "AzureSynapseCredential";
}

/** Azure synapse MSI scan properties. */
export interface AzureSynapseMsiScanPropertiesOutput extends ExpandingResourceScanPropertiesOutput {}

/** Azure synapse MSI scan. */
export interface AzureSynapseMsiScanOutput extends ScanOutputParent {
  /** Azure synapse MSI scan properties. */
  properties?: AzureSynapseMsiScanPropertiesOutput;
  kind: "AzureSynapseMsi";
}

/** ADLS Gen1 credential scan properties. */
export interface AdlsGen1CredentialScanPropertiesOutput extends ScanPropertiesOutput {
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
}

/** ADLS Gen1 credential scan. */
export interface AdlsGen1CredentialScanOutput extends ScanOutputParent {
  /** ADLS Gen1 credential scan properties. */
  properties?: AdlsGen1CredentialScanPropertiesOutput;
  kind: "AdlsGen1Credential";
}

/** ADLS Gen1 MSI scan properties. */
export interface AdlsGen1MsiScanPropertiesOutput extends ScanPropertiesOutput {}

/** ADLS Gen1 MSI scan. */
export interface AdlsGen1MsiScanOutput extends ScanOutputParent {
  /** ADLS Gen1 MSI scan properties. */
  properties?: AdlsGen1MsiScanPropertiesOutput;
  kind: "AdlsGen1Msi";
}

/** ADLS Gen2 credential scan properties. */
export interface AdlsGen2CredentialScanPropertiesOutput extends ScanPropertiesOutput {
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
}

/** ADLS Gen2 credential scan. */
export interface AdlsGen2CredentialScanOutput extends ScanOutputParent {
  /** ADLS Gen2 credential scan properties. */
  properties?: AdlsGen2CredentialScanPropertiesOutput;
  kind: "AdlsGen2Credential";
}

/** ADLS Gen2 MSI scan properties. */
export interface AdlsGen2MsiScanPropertiesOutput extends ScanPropertiesOutput {}

/** ADLS Gen2 MSI scan. */
export interface AdlsGen2MsiScanOutput extends ScanOutputParent {
  /** ADLS Gen2 MSI scan properties. */
  properties?: AdlsGen2MsiScanPropertiesOutput;
  kind: "AdlsGen2Msi";
}

/** Amazon account credential scan properties. */
export interface AmazonAccountCredentialScanPropertiesOutput extends ExpandingResourceScanPropertiesOutput {}

/** Amazon account credential scan. */
export interface AmazonAccountCredentialScanOutput extends ScanOutputParent {
  /** Amazon account credential scan properties. */
  properties?: AmazonAccountCredentialScanPropertiesOutput;
  kind: "AmazonAccountCredential";
}

/** Amazon S3 credential scan properties. */
export interface AmazonS3CredentialScanPropertiesOutput extends ScanPropertiesOutput {
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
  roleARN?: string;
  isMauiScan?: boolean;
}

/** Amazon S3 credential scan. */
export interface AmazonS3CredentialScanOutput extends ScanOutputParent {
  /** Amazon S3 credential scan properties. */
  properties?: AmazonS3CredentialScanPropertiesOutput;
  kind: "AmazonS3Credential";
}

/** Amazon S3 role ARN scan properties. */
export interface AmazonS3RoleARNScanPropertiesOutput extends ScanPropertiesOutput {
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
  /** The role ARN of the scan. */
  roleARN?: string;
  /** The flag to indicate whether the scan is a Maui scan or not. */
  isMauiScan?: boolean;
}

/** Amazon S3 role ARN scan. */
export interface AmazonS3RoleARNScanOutput extends ScanOutputParent {
  /** Amazon S3 role ARN scan properties. */
  properties?: AmazonS3RoleARNScanPropertiesOutput;
  kind: "AmazonS3RoleARN";
}

/** Amazon SQL credential scan properties. */
export interface AmazonSqlCredentialScanPropertiesOutput extends ScanPropertiesOutput {
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
  /** The endpoint of Amazon SQL server. */
  serverEndpoint?: string;
  /** The database name. */
  databaseName?: string;
  /** The port of Amazon SQL server. */
  port?: number;
  /** The VPC endpoint service name of Amazon SQL server. */
  vpcEndpointServiceName?: string;
}

/** Amazon SQL credential scan. */
export interface AmazonSqlCredentialScanOutput extends ScanOutputParent {
  /** Amazon SQL credential scan properties. */
  properties?: AmazonSqlCredentialScanPropertiesOutput;
  kind: "AmazonSqlCredential";
}

/** Azure Cosmos DB credential scan properties. */
export interface AzureCosmosDbCredentialScanPropertiesOutput extends ScanPropertiesOutput {
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
  databaseName?: string;
}

/** Azure Cosmos DB credential scan. */
export interface AzureCosmosDbCredentialScanOutput extends ScanOutputParent {
  /** Azure Cosmos DB credential scan properties. */
  properties?: AzureCosmosDbCredentialScanPropertiesOutput;
  kind: "AzureCosmosDbCredential";
}

/** Azure data Explorer credential scan properties. */
export interface AzureDataExplorerCredentialScanPropertiesOutput extends ScanPropertiesOutput {
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
  database?: string;
}

/** Azure data Explorer credential scan. */
export interface AzureDataExplorerCredentialScanOutput extends ScanOutputParent {
  /** Azure data Explorer credential scan properties. */
  properties?: AzureDataExplorerCredentialScanPropertiesOutput;
  kind: "AzureDataExplorerCredential";
}

/** Azure data Explorer MSI scan properties. */
export interface AzureDataExplorerMsiScanPropertiesOutput extends ScanPropertiesOutput {
  database?: string;
}

/** Azure data Explorer MSI scan. */
export interface AzureDataExplorerMsiScanOutput extends ScanOutputParent {
  /** Azure data Explorer MSI scan properties. */
  properties?: AzureDataExplorerMsiScanPropertiesOutput;
  kind: "AzureDataExplorerMsi";
}

/** Azure file service credential scan properties. */
export interface AzureFileServiceCredentialScanPropertiesOutput extends ScanPropertiesOutput {
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
  shareName?: string;
}

/** Azure file service credential scan. */
export interface AzureFileServiceCredentialScanOutput extends ScanOutputParent {
  /** Azure file service credential scan properties. */
  properties?: AzureFileServiceCredentialScanPropertiesOutput;
  kind: "AzureFileServiceCredential";
}

/** Azure SQL scan properties. */
export interface AzureSqlScanPropertiesOutput extends ScanPropertiesOutput {
  /** The endpoint of Azure SQL server. */
  serverEndpoint?: string;
  /** The database name. */
  databaseName?: string;
}

/** Azure SQL credential scan properties. */
export interface AzureSqlCredentialScanPropertiesOutput extends AzureSqlScanPropertiesOutput {
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
}

/** Azure SQL database credential scan properties. */
export interface AzureSqlDatabaseCredentialScanPropertiesOutput extends AzureSqlCredentialScanPropertiesOutput {}

/** Azure SQL database credential scan. */
export interface AzureSqlDatabaseCredentialScanOutput extends ScanOutputParent {
  /** Azure SQL database credential scan properties. */
  properties?: AzureSqlDatabaseCredentialScanPropertiesOutput;
  kind: "AzureSqlDatabaseCredential";
}

/** Azure SQL database MSI scan properties. */
export interface AzureSqlDatabaseMsiScanPropertiesOutput extends AzureSqlScanPropertiesOutput {}

/** Azure SQL database MSI scan. */
export interface AzureSqlDatabaseMsiScanOutput extends ScanOutputParent {
  /** Azure SQL database MSI scan properties. */
  properties?: AzureSqlDatabaseMsiScanPropertiesOutput;
  kind: "AzureSqlDatabaseMsi";
}

/** Amazon Postgre SQL credential scan properties. */
export interface AmazonPostgreSqlCredentialScanPropertiesOutput extends ScanPropertiesOutput {
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
  /** The endpoint of Amazon Postgre SQL server. */
  serverEndpoint?: string;
  /** The database name. */
  databaseName?: string;
  /** The port of Amazon Postgre SQL server. */
  port?: number;
  /** The vpc endpoint service name of Amazon Postgre SQL server. */
  vpcEndpointServiceName?: string;
}

/** Amazon Postgre SQL credential scan. */
export interface AmazonPostgreSqlCredentialScanOutput extends ScanOutputParent {
  /** Amazon Postgre SQL credential scan properties. */
  properties?: AmazonPostgreSqlCredentialScanPropertiesOutput;
  kind: "AmazonPostgreSqlCredential";
}

/** Azure Postgre SQL credential scan properties. */
export interface AzurePostgreSqlCredentialScanPropertiesOutput extends ScanPropertiesOutput {
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
  /** The endpoint of Azure Postgre SQL server. */
  serverEndpoint?: string;
  /** The database name. */
  databaseName?: string;
  /** The port of Azure Postgre SQL server. */
  port?: number;
  /** The SSL mode of Azure Postgre SQL server. */
  sslMode?: number;
}

/** Azure Postgre SQL credential scan. */
export interface AzurePostgreSqlCredentialScanOutput extends ScanOutputParent {
  /** Azure Postgre SQL credential scan properties. */
  properties?: AzurePostgreSqlCredentialScanPropertiesOutput;
  kind: "AzurePostgreSqlCredential";
}

/** SQL server database credential scan properties. */
export interface SqlServerDatabaseCredentialScanPropertiesOutput extends AzureSqlCredentialScanPropertiesOutput {}

/** SQL server database credential scan. */
export interface SqlServerDatabaseCredentialScanOutput extends ScanOutputParent {
  /** SQL server database credential scan properties. */
  properties?: SqlServerDatabaseCredentialScanPropertiesOutput;
  kind: "SqlServerDatabaseCredential";
}

/** Azure SQL database managed instance credential scan properties. */
export interface AzureSqlDatabaseManagedInstanceCredentialScanPropertiesOutput extends AzureSqlCredentialScanPropertiesOutput {}

/** Azure SQL database managed instance credential scan. */
export interface AzureSqlDatabaseManagedInstanceCredentialScanOutput extends ScanOutputParent {
  /** Azure SQL database managed instance credential scan properties. */
  properties?: AzureSqlDatabaseManagedInstanceCredentialScanPropertiesOutput;
  kind: "AzureSqlDatabaseManagedInstanceCredential";
}

/** Azure SQL database managed instance MSI scan properties. */
export interface AzureSqlDatabaseManagedInstanceMsiScanPropertiesOutput extends AzureSqlScanPropertiesOutput {}

/** Azure SQL database managed instance MSI scan. */
export interface AzureSqlDatabaseManagedInstanceMsiScanOutput extends ScanOutputParent {
  /** Azure SQL database managed instance MSI scan properties. */
  properties?: AzureSqlDatabaseManagedInstanceMsiScanPropertiesOutput;
  kind: "AzureSqlDatabaseManagedInstanceMsi";
}

/** Azure SQL data warehouse credential scan properties. */
export interface AzureSqlDataWarehouseCredentialScanPropertiesOutput extends AzureSqlCredentialScanPropertiesOutput {}

/** Azure SQL data warehouse credential scan. */
export interface AzureSqlDataWarehouseCredentialScanOutput extends ScanOutputParent {
  /** Azure SQL data warehouse credential scan properties. */
  properties?: AzureSqlDataWarehouseCredentialScanPropertiesOutput;
  kind: "AzureSqlDataWarehouseCredential";
}

/** Azure SQL data warehouse MSI scan properties. */
export interface AzureSqlDataWarehouseMsiScanPropertiesOutput extends AzureSqlScanPropertiesOutput {}

/** Azure SQL data warehouse MSI scan. */
export interface AzureSqlDataWarehouseMsiScanOutput extends ScanOutputParent {
  /** Azure SQL data warehouse MSI scan properties. */
  properties?: AzureSqlDataWarehouseMsiScanPropertiesOutput;
  kind: "AzureSqlDataWarehouseMsi";
}

/** Azure MySQL scan properties. */
export interface AzureMySqlScanPropertiesOutput extends ScanPropertiesOutput {
  /** The endpoint of the Azure MySQL server. */
  serverEndpoint?: string;
  /** The port of the Azure MySQL server. */
  port?: number;
  /** The database name. */
  databaseName?: string;
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
}

/** Azure MySQL credential scan properties. */
export interface AzureMySqlCredentialScanPropertiesOutput extends AzureMySqlScanPropertiesOutput {}

/** Azure MySQL credential scan. */
export interface AzureMySqlCredentialScanOutput extends ScanOutputParent {
  /** Azure MySQL credential scan properties. */
  properties?: AzureMySqlCredentialScanPropertiesOutput;
  kind: "AzureMySqlCredential";
}

/** Miti scan properties. */
export interface MitiScanPropertiesOutput extends ScanPropertiesOutput {
  /** The maximum memory allowed in GB. */
  maximumMemoryAllowedInGb?: string;
  /** The miti cache. */
  mitiCache?: string;
}

/** Azure Storage credential scan properties. */
export interface AzureStorageCredentialScanPropertiesOutput extends ScanPropertiesOutput {
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
}

/** Azure Storage credential scan. */
export interface AzureStorageCredentialScanOutput extends ScanOutputParent {
  /** Azure Storage credential scan properties. */
  properties?: AzureStorageCredentialScanPropertiesOutput;
  kind: "AzureStorageCredential";
}

/** Azure Storage MSI scan properties. */
export interface AzureStorageMsiScanPropertiesOutput extends ScanPropertiesOutput {}

/** Azure Storage MSI scan. */
export interface AzureStorageMsiScanOutput extends ScanOutputParent {
  /** Azure Storage MSI scan properties. */
  properties?: AzureStorageMsiScanPropertiesOutput;
  kind: "AzureStorageMsi";
}

/** Teradata credential scan properties. */
export interface TeradataCredentialScanPropertiesOutput extends MitiScanPropertiesOutput {
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
  schema?: string;
  driverLocation?: string;
  storedProcedureDetails?: string;
}

/** Teradata credential scan. */
export interface TeradataCredentialScanOutput extends ScanOutputParent {
  /** Teradata credential scan properties. */
  properties?: TeradataCredentialScanPropertiesOutput;
  kind: "TeradataTeradataCredential";
}

/** Teradata user pass scan properties. */
export interface TeradataUserPassScanPropertiesOutput extends ScanPropertiesOutput {
  username?: string;
  password?: string;
}

/** Teradata user pass scan. */
export interface TeradataUserPassScanOutput extends ScanOutputParent {
  /** Teradata user pass scan properties. */
  properties?: TeradataUserPassScanPropertiesOutput;
  kind: "TeradataUserPass";
}

/** Teradata user pass scan properties. */
export interface TeradataTeradataUserPassScanPropertiesOutput extends MitiScanPropertiesOutput {
  /** The username of Teradata server. */
  username?: string;
  /** The password of Teradata server. */
  password?: string;
  /** The schema. */
  schema?: string;
  /** The driver location. */
  driverLocation?: string;
}

/** Teradata user pass scan. */
export interface TeradataTeradataUserPassScanOutput extends ScanOutputParent {
  /** Teradata user pass scan properties. */
  properties?: TeradataTeradataUserPassScanPropertiesOutput;
  kind: "TeradataTeradataUserPass";
}

/** Oracle credential scan properties. */
export interface OracleCredentialScanPropertiesOutput extends MitiScanPropertiesOutput {
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
  schema?: string;
  driverLocation?: string;
  storedProcedureDetails?: string;
}

/** Oracle credential scan. */
export interface OracleCredentialScanOutput extends ScanOutputParent {
  /** Oracle credential scan properties. */
  properties?: OracleCredentialScanPropertiesOutput;
  kind: "OracleOracleCredential";
}

/** Oracle user pass scan properties. */
export interface OracleUserPassScanPropertiesOutput extends MitiScanPropertiesOutput {
  /** The username of Oracle server. */
  username?: string;
  /** The password of Oracle server. */
  password?: string;
  /** The schema. */
  schema?: string;
  /** The driver location. */
  driverLocation?: string;
}

/** Oracle user pass scan. */
export interface OracleUserPassScanOutput extends ScanOutputParent {
  /** Oracle user pass scan properties. */
  properties?: OracleUserPassScanPropertiesOutput;
  kind: "OracleOracleUserPass";
}

/** SAP S/4HANA credential scan properties. */
export interface SapS4HanaSapS4HanaCredentialScanPropertiesOutput extends MitiScanPropertiesOutput {
  /** The client ID of SAP S/4HANA server. */
  clientId?: string;
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
  /** The JCo library path. */
  jCoLibraryPath?: string;
}

/** SAP S/4HANA credential scan. */
export interface SapS4HanaSapS4HanaCredentialScanOutput extends ScanOutputParent {
  /** SAP S/4HANA credential scan properties. */
  properties?: SapS4HanaSapS4HanaCredentialScanPropertiesOutput;
  kind: "SapS4HanaSapS4HanaCredential";
}

/** SAP S/4HANA user pass scan properties. */
export interface SapS4HanaSapS4HanaUserPassScanPropertiesOutput extends MitiScanPropertiesOutput {
  /** The client ID of SAP S/4HANA server. */
  clientId?: string;
  /** The username of SAP S/4HANA server. */
  username?: string;
  /** The password of SAP S/4HANA server. */
  password?: string;
  /** The JCo library path. */
  jCoLibraryPath?: string;
}

/** SAP S/4HANA user pass scan. */
export interface SapS4HanaSapS4HanaUserPassScanOutput extends ScanOutputParent {
  /** SAP S/4HANA user pass scan properties. */
  properties?: SapS4HanaSapS4HanaUserPassScanPropertiesOutput;
  kind: "SapS4HanaSapS4HanaUserPass";
}

/** SAP ECC credential scan properties. */
export interface SapEccCredentialScanPropertiesOutput extends MitiScanPropertiesOutput {
  clientId?: string;
  /** The credential reference. */
  credential?: CredentialReferenceOutput;
  jCoLibraryPath?: string;
}

/** SAP ECC credential scan. */
export interface SapEccCredentialScanOutput extends ScanOutputParent {
  /** SAP ECC credential scan properties. */
  properties?: SapEccCredentialScanPropertiesOutput;
  kind: "SapEccSapEccCredential";
}

/** SAP ECC user pass scan properties. */
export interface SapEccUserPassScanPropertiesOutput extends MitiScanPropertiesOutput {
  clientId?: string;
  username?: string;
  password?: string;
  jCoLibraryPath?: string;
}

/** SAP ECC user pass scan. */
export interface SapEccUserPassScanOutput extends ScanOutputParent {
  /** SAP ECC user pass scan properties. */
  properties?: SapEccUserPassScanPropertiesOutput;
  kind: "SapEccSapEccUserPass";
}

/** Power BI delegated scan properties. */
export interface PowerBIDelegatedScanPropertiesOutput extends ScanPropertiesOutput {
  tenant?: string;
  authenticationType?: string;
  clientId?: string;
  userName?: string;
  password?: string;
  includePersonalWorkspaces?: boolean;
}

/** Power BI delegated scan. */
export interface PowerBIDelegatedScanOutput extends ScanOutputParent {
  /** Power BI delegated scan properties. */
  properties?: PowerBIDelegatedScanPropertiesOutput;
  kind: "PowerBIDelegated";
}

/** Power BI MSI scan properties. */
export interface PowerBIMsiScanPropertiesOutput extends ScanPropertiesOutput {
  /** Whether to include personal workspaces or not. */
  includePersonalWorkspaces?: boolean;
}

/** Power BI MSI scan. */
export interface PowerBIMsiScanOutput extends ScanOutputParent {
  /** Power BI MSI scan properties. */
  properties?: PowerBIMsiScanPropertiesOutput;
  kind: "PowerBIMsi";
}

/** Azure subscription system scan ruleset. */
export interface AzureSubscriptionSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Azure subscription scan ruleset properties. */
  properties?: AzureSubscriptionScanRulesetPropertiesOutput;
  kind: "AzureSubscription";
}

/** Azure resource group system scan ruleset. */
export interface AzureResourceGroupSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Azure resource group scan ruleset properties. */
  properties?: AzureResourceGroupScanRulesetPropertiesOutput;
  kind: "AzureResourceGroup";
}

/** Azure synapse workspace system scan ruleset. */
export interface AzureSynapseWorkspaceSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Azure synapse workspace scan ruleset properties. */
  properties?: AzureSynapseWorkspaceScanRulesetPropertiesOutput;
  kind: "AzureSynapseWorkspace";
}

/** Azure Synapse System scan rule set. */
export interface AzureSynapseSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Azure synapse scan ruleset properties. */
  properties?: AzureSynapseScanRulesetPropertiesOutput;
  kind: "AzureSynapse";
}

/** ADLS Gen1 System scan rule set. */
export interface AdlsGen1SystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** ADLS Gen1 scan ruleset properties. */
  properties?: AdlsGen1ScanRulesetPropertiesOutput;
  kind: "AdlsGen1";
}

/** ADLS Gen2 system scan rule set. */
export interface AdlsGen2SystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Adls gen 2 scan ruleset properties. */
  properties?: AdlsGen2ScanRulesetPropertiesOutput;
  kind: "AdlsGen2";
}

/** Amazon account system scan rule set. */
export interface AmazonAccountSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Amazon account scan ruleset properties. */
  properties?: AmazonAccountScanRulesetPropertiesOutput;
  kind: "AmazonAccount";
}

/** Amazon S3 system scan ruleset. */
export interface AmazonS3SystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Amazon S3 scan ruleset properties. */
  properties?: AmazonS3ScanRulesetPropertiesOutput;
  kind: "AmazonS3";
}

/** Amazon SQL system scan ruleset. */
export interface AmazonSqlSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Amazon SQL scan ruleset properties. */
  properties?: AmazonSqlScanRulesetPropertiesOutput;
  kind: "AmazonSql";
}

/** Azure Cosmos DB system scan rule set. */
export interface AzureCosmosDbSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Azure Cosmos DB scan ruleset properties. */
  properties?: AzureCosmosDbScanRulesetPropertiesOutput;
  kind: "AzureCosmosDb";
}

/** Azure data explorer system scan rule set. */
export interface AzureDataExplorerSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Azure data explorer scan ruleset properties. */
  properties?: AzureDataExplorerScanRulesetPropertiesOutput;
  kind: "AzureDataExplorer";
}

/** Azure file service system scan rule set. */
export interface AzureFileServiceSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Azure file service scan ruleset properties. */
  properties?: AzureFileServiceScanRulesetPropertiesOutput;
  kind: "AzureFileService";
}

/** Azure SQL db system scan rule set. */
export interface AzureSqlDatabaseSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Azure SQL db scan ruleset properties. */
  properties?: AzureSqlDatabaseScanRulesetPropertiesOutput;
  kind: "AzureSqlDatabase";
}

/** Amazon Postgre SQL system scan rule set. */
export interface AmazonPostgreSqlSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Azure Postgre SQL scan ruleset properties. */
  properties?: AmazonPostgreSqlScanRulesetPropertiesOutput;
  kind: "AmazonPostgreSql";
}

/** Azure Postgre SQL system scan rule set. */
export interface AzurePostgreSqlSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Azure Postgre SQL scan ruleset properties. */
  properties?: AzurePostgreSqlScanRulesetPropertiesOutput;
  kind: "AzurePostgreSql";
}

/** Sql server database system scan rule set. */
export interface SqlServerDatabaseSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Sql server database scan ruleset properties. */
  properties?: SqlServerDatabaseScanRulesetPropertiesOutput;
  kind: "SqlServerDatabase";
}

/** Azure SQL database managed instance system scan rule set. */
export interface AzureSqlDatabaseManagedInstanceSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Azure SQL db managed instance scan ruleset properties. */
  properties?: AzureSqlDatabaseManagedInstanceScanRulesetPropertiesOutput;
  kind: "AzureSqlDatabaseManagedInstance";
}

/** Azure SQL data warehouse system scan ruleset. */
export interface AzureSqlDataWarehouseSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Azure SQL data warehouse scan ruleset properties. */
  properties?: AzureSqlDataWarehouseScanRulesetPropertiesOutput;
  kind: "AzureSqlDataWarehouse";
}

/** Azure MySQL system scan ruleset. */
export interface AzureMySqlSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Azure MySQL scan ruleset properties. */
  properties?: AzureMySqlScanRulesetPropertiesOutput;
  kind: "AzureMySql";
}

/** Azure Storage system scan ruleset. */
export interface AzureStorageSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Azure Storage scan ruleset properties. */
  properties?: AzureStorageScanRulesetPropertiesOutput;
  kind: "AzureStorage";
}

/** Teradata system scan ruleset. */
export interface TeradataSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Teradata scan ruleset properties. */
  properties?: TeradataScanRulesetPropertiesOutput;
  kind: "Teradata";
}

/** Oracle system scan ruleset. */
export interface OracleSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Oracle scan rule set properties. */
  properties?: OracleScanRulesetPropertiesOutput;
  kind: "Oracle";
}

/** SAP S/4HANA system scan ruleset. */
export interface SapS4HanaSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** SAP S/4HANA scan ruleset properties. */
  properties?: SapS4HanaScanRulesetPropertiesOutput;
  kind: "SapS4Hana";
}

/** SAP ECC system scan ruleset. */
export interface SapEccSystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** SAP ECC scan ruleset properties. */
  properties?: SapEccScanRulesetPropertiesOutput;
  kind: "SapEcc";
}

/** Power BI system scan ruleset. */
export interface PowerBISystemScanRulesetOutput extends SystemScanRulesetOutputParent {
  /** Power BI scan ruleset properties. */
  properties?: PowerBIScanRulesetPropertiesOutput;
  kind: "PowerBI";
}

/** The classification rule. */
export type ClassificationRuleOutput =
  | SystemClassificationRuleOutput
  | CustomClassificationRuleOutput;
/** The credential. */
export type CredentialOutput =
  | AccountKeyAuthAzureKeyVaultCredentialOutput
  | BasicAuthAzureKeyVaultCredentialOutput
  | RoleARNCredentialOutput
  | ServicePrincipalAzureKeyVaultCredentialOutput
  | SqlAuthAzureKeyVaultCredentialOutput
  | ConsumerKeyAuthAzureKeyVaultCredentialOutput
  | DelegatedAuthAzureKeyVaultCredentialOutput
  | ManagedIdentityAzureKeyVaultCredentialOutput;
/** The data source. */
export type DataSourceOutput =
  | AzureSubscriptionDataSourceOutput
  | AzureResourceGroupDataSourceOutput
  | AzureSynapseWorkspaceDataSourceOutput
  | AzureSynapseDataSourceOutput
  | AdlsGen1DataSourceOutput
  | AdlsGen2DataSourceOutput
  | AmazonAccountDataSourceOutput
  | AmazonS3DataSourceOutput
  | AmazonSqlDataSourceOutput
  | AzureCosmosDbDataSourceOutput
  | AzureDataExplorerDataSourceOutput
  | AzureFileServiceDataSourceOutput
  | AzureSqlDatabaseDataSourceOutput
  | AmazonPostgreSqlDataSourceOutput
  | AzurePostgreSqlDataSourceOutput
  | SqlServerDatabaseDataSourceOutput
  | AzureSqlDatabaseManagedInstanceDataSourceOutput
  | AzureSqlDataWarehouseDataSourceOutput
  | AzureMySqlDataSourceOutput
  | AzureStorageDataSourceOutput
  | TeradataDataSourceOutput
  | OracleDataSourceOutput
  | SapS4HanaDataSourceOutput
  | SapEccDataSourceOutput
  | PowerBIDataSourceOutput;
/** The scan. */
export type ScanOutput =
  | AzureSubscriptionCredentialScanOutput
  | AzureSubscriptionMsiScanOutput
  | AzureResourceGroupCredentialScanOutput
  | AzureResourceGroupMsiScanOutput
  | AzureSynapseWorkspaceCredentialScanOutput
  | AzureSynapseWorkspaceMsiScanOutput
  | AzureSynapseCredentialScanOutput
  | AzureSynapseMsiScanOutput
  | AdlsGen1CredentialScanOutput
  | AdlsGen1MsiScanOutput
  | AdlsGen2CredentialScanOutput
  | AdlsGen2MsiScanOutput
  | AmazonAccountCredentialScanOutput
  | AmazonS3CredentialScanOutput
  | AmazonS3RoleARNScanOutput
  | AmazonSqlCredentialScanOutput
  | AzureCosmosDbCredentialScanOutput
  | AzureDataExplorerCredentialScanOutput
  | AzureDataExplorerMsiScanOutput
  | AzureFileServiceCredentialScanOutput
  | AzureSqlDatabaseCredentialScanOutput
  | AzureSqlDatabaseMsiScanOutput
  | AmazonPostgreSqlCredentialScanOutput
  | AzurePostgreSqlCredentialScanOutput
  | SqlServerDatabaseCredentialScanOutput
  | AzureSqlDatabaseManagedInstanceCredentialScanOutput
  | AzureSqlDatabaseManagedInstanceMsiScanOutput
  | AzureSqlDataWarehouseCredentialScanOutput
  | AzureSqlDataWarehouseMsiScanOutput
  | AzureMySqlCredentialScanOutput
  | AzureStorageCredentialScanOutput
  | AzureStorageMsiScanOutput
  | TeradataCredentialScanOutput
  | TeradataUserPassScanOutput
  | TeradataTeradataUserPassScanOutput
  | OracleCredentialScanOutput
  | OracleUserPassScanOutput
  | SapS4HanaSapS4HanaCredentialScanOutput
  | SapS4HanaSapS4HanaUserPassScanOutput
  | SapEccCredentialScanOutput
  | SapEccUserPassScanOutput
  | PowerBIDelegatedScanOutput
  | PowerBIMsiScanOutput;
/** Purview nested object which serves as a compute resource for activities. */
export type IntegrationRuntimeOutput =
  | ManagedIntegrationRuntimeOutput
  | SelfHostedIntegrationRuntimeOutput;
/** Integration runtime status. */
export type IntegrationRuntimeStatusOutput =
  | SelfHostedIntegrationRuntimeStatusOutput
  | ManagedIntegrationRuntimeStatusOutput;
/** The scan ruleset. */
export type ScanRulesetOutput =
  | AzureSubscriptionScanRulesetOutput
  | AzureResourceGroupScanRulesetOutput
  | AzureSynapseWorkspaceScanRulesetOutput
  | AzureSynapseScanRulesetOutput
  | AdlsGen1ScanRulesetOutput
  | AdlsGen2ScanRulesetOutput
  | AmazonAccountScanRulesetOutput
  | AmazonS3ScanRulesetOutput
  | AmazonSqlScanRulesetOutput
  | AzureCosmosDbScanRulesetOutput
  | AzureDataExplorerScanRulesetOutput
  | AzureFileServiceScanRulesetOutput
  | AzureSqlDatabaseScanRulesetOutput
  | AmazonPostgreSqlScanRulesetOutput
  | AzurePostgreSqlScanRulesetOutput
  | SqlServerDatabaseScanRulesetOutput
  | AzureSqlDatabaseManagedInstanceScanRulesetOutput
  | AzureSqlDataWarehouseScanRulesetOutput
  | AzureMySqlScanRulesetOutput
  | AzureStorageScanRulesetOutput
  | TeradataScanRulesetOutput
  | OracleScanRulesetOutput
  | SapS4HanaScanRulesetOutput
  | SapEccScanRulesetOutput
  | PowerBIScanRulesetOutput;
/** The system scan ruleset. */
export type SystemScanRulesetOutput =
  | AzureSubscriptionSystemScanRulesetOutput
  | AzureResourceGroupSystemScanRulesetOutput
  | AzureSynapseWorkspaceSystemScanRulesetOutput
  | AzureSynapseSystemScanRulesetOutput
  | AdlsGen1SystemScanRulesetOutput
  | AdlsGen2SystemScanRulesetOutput
  | AmazonAccountSystemScanRulesetOutput
  | AmazonS3SystemScanRulesetOutput
  | AmazonSqlSystemScanRulesetOutput
  | AzureCosmosDbSystemScanRulesetOutput
  | AzureDataExplorerSystemScanRulesetOutput
  | AzureFileServiceSystemScanRulesetOutput
  | AzureSqlDatabaseSystemScanRulesetOutput
  | AmazonPostgreSqlSystemScanRulesetOutput
  | AzurePostgreSqlSystemScanRulesetOutput
  | SqlServerDatabaseSystemScanRulesetOutput
  | AzureSqlDatabaseManagedInstanceSystemScanRulesetOutput
  | AzureSqlDataWarehouseSystemScanRulesetOutput
  | AzureMySqlSystemScanRulesetOutput
  | AzureStorageSystemScanRulesetOutput
  | TeradataSystemScanRulesetOutput
  | OracleSystemScanRulesetOutput
  | SapS4HanaSystemScanRulesetOutput
  | SapEccSystemScanRulesetOutput
  | PowerBISystemScanRulesetOutput;
/** Pattern of classification rule. */
export type ClassificationRulePatternOutput = RegexClassificationRulePatternOutput;
