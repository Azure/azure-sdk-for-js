// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The Azure Key Vault connection. */
export interface AzureKeyVault extends ProxyResource {
  /** Azure Key Vault connection properties. */
  properties?: AzureKeyVaultProperties;
}

/** Azure Key Vault connection properties. */
export interface AzureKeyVaultProperties {
  /** The base URL of the Azure Key Vault. */
  baseUrl?: string;
  /** The description of the Azure Key Vault connection. */
  description?: string;
}

/** The proxy resource. */
export interface ProxyResource {}

/** The error model. */
export interface ErrorModel {
  /** A unique error code that identifies the specific error. */
  code: string;
  /** A human-readable error message that provides more details about the error. */
  message: string;
  /** The specific component that the error is associated with. */
  target?: string;
  /** An array of nested ErrorModel objects that provides additional error details. */
  details?: Array<ErrorModel>;
}

/** The classification rule. */
export interface ClassificationRuleParent extends ProxyResource {
  kind: "ClassificationRule" | "System" | "Custom";
}

/** The credential. */
export interface CredentialParent extends ProxyResource {
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

/** The data source. */
export interface DataSourceParent extends ProxyResource {
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
export interface ScanParent extends ProxyResource {
  /** The scan identifier. */
  scanId?: string;
  /** The data source identifier. */
  dataSourceIdentifier?: DataSourceIdentifier;
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
export interface ScanResultWithIngestion {
  /** The ingestion job identifier. */
  ingestionJobId?: string;
  /** The scan result status. */
  status?: "Accepted" | "InProgress" | "TransientFailure" | "Succeeded" | "Failed" | "Canceled";
}

/** The discovery execution details. */
export interface DiscoveryExecutionDetails {
  /** The discovery start time. */
  discoveryStartTime?: Date | string;
  /** The discovery end time. */
  discoveryEndTime?: Date | string;
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
export interface IngestionExecutionDetails {
  /** The ingestion start time. */
  ingestionStartTime?: Date | string;
  /** The ingestion end time. */
  ingestionEndTime?: Date | string;
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
  lastUpdatedAt?: Date | string;
}

/** The scan diagnostics. */
export interface ScanDiagnostics {
  /** Notifications. */
  notifications?: Array<Notification>;
}

/** The notification model. */
export interface Notification {
  /** Notification message. */
  message?: string;
  /** Notification code. */
  code?: number;
}

/** The data source identifier. */
export interface DataSourceIdentifier {
  /** The item path. */
  itemPath?: ItemPath;
  /** The qualified name. */
  qualifiedName?: QualifiedName;
  /** The data source name. */
  dataSourceName?: string;
  /** The guid. */
  guid?: string;
  /** The resource identifier. */
  resourceId?: string;
}

/** The item path. */
export interface ItemPath {
  /** The path. */
  path?: string;
  /** The extended properties. */
  extendedProperties?: ExtendedProperties;
}

/** The extended properties. */
export interface ExtendedProperties {
  /** The subscription identifier. */
  subscriptionId?: string;
  /** The resource group. */
  resourceGroup?: string;
}

/** The qualified name. */
export interface QualifiedName {
  /** The type name. */
  typeName?: string;
  /** The name. */
  name?: string;
  /** The extended properties. */
  extendedProperties?: ExtendedProperties;
}

/** The filter. */
export interface Filter extends ProxyResource {
  /** The filter properties. */
  properties?: FilterProperties;
}

/** The filter properties. */
export interface FilterProperties {
  /** The exclude uri prefixes. */
  excludeUriPrefixes: Array<string>;
  /** The include uri prefixes. */
  includeUriPrefixes: Array<string>;
  /** The exclude regexes. */
  excludeRegexes?: Array<string>;
  /** The include regexes. */
  includeRegexes?: Array<string>;
}

/** Purview nested object which serves as a compute resource for activities. */
export interface IntegrationRuntimeParent extends ProxyResource {
  kind: "IntegrationRuntime" | "Managed" | "SelfHosted";
}

/** Integration runtime status. */
export interface IntegrationRuntimeStatusParent extends ProxyResource {
  kind: "IntegrationRuntimeStatus" | "SelfHosted" | "Managed";
}

/** Parameters to regenerate the authentication key. */
export interface IntegrationRuntimeRegenerateKeyParameters {
  /** The name of the authentication key to regenerate. */
  keyName?: "authKey1" | "authKey2";
}

/** The request of enabling interactive query for integration runtime. */
export interface EnableInteractiveQueryForIntegrationRuntimeRequest {
  /** The interactive querying auto termination time in minutes. */
  autoTerminationMinutes?: number;
}

/** The managed virtual network. */
export interface ManagedVirtualNetwork extends ProxyResource {
  /** The properties of managed virtual network. */
  properties?: ManagedVirtualNetworkProperties;
}

/** The properties of managed virtual network. */
export interface ManagedVirtualNetworkProperties {}

/** The managed private endpoint. */
export interface ManagedPrivateEndpoint extends ProxyResource {
  /** The properties of managed private endpoint. */
  properties?: ManagedPrivateEndpointProperties;
}

/** The properties of managed private endpoint. */
export interface ManagedPrivateEndpointProperties {
  /** The properties of connection state. */
  connectionState?: ConnectionStateProperties;
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
export interface ConnectionStateProperties {}

/** The scan ruleset. */
export interface ScanRulesetParent extends VersionedScanRuleset {
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
export interface VersionedScanRuleset extends ProxyResource {
  /** Versioned scan ruleset properties. */
  scanRulesetType?: "Custom" | "System";
}

/** The system scan ruleset. */
export interface SystemScanRulesetParent extends VersionedScanRuleset {
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
export interface Trigger extends ProxyResource {
  /** The properties of trigger. */
  properties?: TriggerProperties;
  /** The validation error info of trigger. */
  validationErrorInfo?: string;
}

/** Properties detail of trigger. */
export interface TriggerProperties {
  /** The recurrence of trigger. */
  recurrence?: TriggerRecurrence;
  /** The recurrence interval of trigger. */
  recurrenceInterval?: string;
  /** The state of trigger. */
  state?: "Enabled" | "Disabled";
  /** The scan level of trigger. */
  scanLevel?: "Full" | "Incremental";
  /** The incremental scan start time of trigger. */
  incrementalScanStartTime?: Date | string;
}

/** The recurrence of trigger. */
export interface TriggerRecurrence {
  /** The frequency of trigger recurrence. */
  frequency?: "Week" | "Month" | "Day" | "Hour";
  /** The interval of trigger recurrence. */
  interval?: number;
  /** The start time of trigger recurrence. */
  startTime?: Date | string;
  /** The end time of trigger recurrence. */
  endTime?: Date | string;
  /** The schedule of trigger recurrence. */
  schedule?: RecurrenceSchedule;
  /** The time zone of trigger recurrence. */
  timeZone?: string;
}

/** Schedule of recurrence. */
export interface RecurrenceSchedule {
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
  monthlyOccurrences?: Array<RecurrenceScheduleOccurrence>;
}

/** The occurrence of recurrence schedule. */
export interface RecurrenceScheduleOccurrence {
  /** The day of recurrence schedule occurrence. */
  day?: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  occurrence?: number;
}

/** The compute resource properties for managed integration runtime. */
export interface ManagedIntegrationRuntimeComputeProperties {
  /** The location for managed integration runtime. */
  location?: string;
}

/** Managed integration runtime type properties. */
export interface ManagedIntegrationRuntimeTypeProperties {
  /** The compute resource properties for managed integration runtime. */
  computeProperties?: ManagedIntegrationRuntimeComputeProperties;
}

/** The managed virtual network reference. */
export interface ManagedVirtualNetworkReference {
  /** Reference ManagedVirtualNetwork name. */
  referenceName?: string;
  /** Managed virtual network reference type. */
  type?: string;
}

/** The managed integration runtime properties. */
export interface ManagedIntegrationRuntimeProperties {
  /** Managed integration runtime type properties. */
  typeProperties?: ManagedIntegrationRuntimeTypeProperties;
  /** The managed virtual network reference. */
  managedVirtualNetworkReference?: ManagedVirtualNetworkReference;
  /** The managed integration runtime description. */
  description?: string;
}

/** The managed integration runtime. */
export interface ManagedIntegrationRuntime extends IntegrationRuntimeParent {
  /** The managed integration runtime properties. */
  properties?: ManagedIntegrationRuntimeProperties;
  kind: "Managed";
}

/** The self-hosted integration runtime properties. */
export interface SelfHostedIntegrationRuntimeProperties {
  /** The self-hosted integration runtime description. */
  description?: string;
}

/** Self-hosted integration runtime. */
export interface SelfHostedIntegrationRuntime extends IntegrationRuntimeParent {
  /** The self-hosted integration runtime properties. */
  properties?: SelfHostedIntegrationRuntimeProperties;
  kind: "SelfHosted";
}

/** Properties of Self-hosted integration runtime node. */
export interface SelfHostedIntegrationRuntimeNode {}

/** Self-hosted integration runtime status type properties. */
export interface SelfHostedIntegrationRuntimeStatusTypeProperties {
  /** List of nodes for this integration runtime. */
  nodes?: Array<SelfHostedIntegrationRuntimeNode>;
}

/** Self-hosted integration runtime status properties. */
export interface SelfHostedIntegrationRuntimeStatusProperties {
  /** Self-hosted integration runtime status type properties. */
  typeProperties?: SelfHostedIntegrationRuntimeStatusTypeProperties;
}

/** Self-hosted integration runtime status. */
export interface SelfHostedIntegrationRuntimeStatus extends IntegrationRuntimeStatusParent {
  /** Self-hosted integration runtime status properties. */
  properties?: SelfHostedIntegrationRuntimeStatusProperties;
  kind: "SelfHosted";
}

/** Interactive query properties of managed integration runtime. */
export interface InteractiveQuery {
  /** Auto termination minutes of interactive query. */
  autoTerminationMinutes?: number;
  /** Status of interactive query. */
  status?: string;
}

/** Managed integration runtime status type properties. */
export interface ManagedIntegrationRuntimeStatusTypeProperties {
  /** The time at which the integration runtime was created, in ISO8601 format. */
  createTime?: Date | string;
  /** Interactive query properties of managed integration runtime. */
  interactiveQuery?: InteractiveQuery;
}

/** Managed integration runtime status properties. */
export interface ManagedIntegrationRuntimeStatusProperties {
  /** Managed integration runtime status type properties. */
  typeProperties?: ManagedIntegrationRuntimeStatusTypeProperties;
}

/** Managed integration runtime status. */
export interface ManagedIntegrationRuntimeStatus extends IntegrationRuntimeStatusParent {
  /** Managed integration runtime status properties. */
  properties?: ManagedIntegrationRuntimeStatusProperties;
  kind: "Managed";
}

/** The reference to collection. */
export interface CollectionReference {
  /** The reference name of collection reference. */
  referenceName?: string;
  /** The type of collection reference. */
  type?: string;
}

/** The properties of system classification rule. */
export interface SystemClassificationRuleProperties {
  description?: string;
  /** The classification name of system classification rule. */
  classificationName?: string;
  /** The rule status of system classification rule. */
  ruleStatus?: "Enabled" | "Disabled";
}

/** The rule of system classification. */
export interface SystemClassificationRule extends ClassificationRuleParent {
  /** The properties of system classification rule. */
  properties?: SystemClassificationRuleProperties;
  kind: "System";
}

/** Pattern of classification rule. */
export interface ClassificationRulePatternParent {
  kind: "ClassificationRulePattern" | "Regex";
}

/** The properties of custom classification rule. */
export interface CustomClassificationRuleProperties {
  minimumPercentageMatch?: number;
  /** The data patterns of custom classification rule. */
  dataPatterns?: Array<ClassificationRulePattern>;
  /** The column patterns of custom classification rule. */
  columnPatterns?: Array<ClassificationRulePattern>;
  /** The description of custom classification rule. */
  description?: string;
  /** The classification name of custom classification rule. */
  classificationName?: string;
  /** The rule status of custom classification rule. */
  ruleStatus?: "Enabled" | "Disabled";
}

/** Rule of custom classification. */
export interface CustomClassificationRule extends ClassificationRuleParent {
  /** The properties of custom classification rule. */
  properties?: CustomClassificationRuleProperties;
  kind: "Custom";
}

/** Pattern of regex classification rule. */
export interface RegexClassificationRulePattern extends ClassificationRulePatternParent {
  /** The pattern of regex classification rule pattern. */
  pattern?: string;
  kind: "Regex";
}

/** The store. */
export interface Store {
  /** The reference name of store. */
  referenceName?: string;
  /** The type of store. */
  type?: string;
}

/** The key vault secret. */
export interface KeyVaultSecret {
  /** The type of key vault secret. */
  type?: string;
  /** The secret name of key vault secret. */
  secretName?: string;
  /** The secret version of key vault secret. */
  secretVersion?: string;
  /** The store. */
  store?: Store;
}

/** Properties of key vault secret account key credential type. */
export interface KeyVaultSecretAccountKeyCredentialTypeProperties {
  /** The account key of key vault secret account key credential type. */
  accountKey?: KeyVaultSecret;
}

/** Properties of account key credential. */
export interface AccountKeyCredentialProperties {
  /** The type properties of account key credential. */
  typeProperties?: KeyVaultSecretAccountKeyCredentialTypeProperties;
  description?: string;
}

/** Credential type that uses Account Key for authentication. */
export interface AccountKeyAuthAzureKeyVaultCredential extends CredentialParent {
  /** The properties of account key auth Azure Key Vault credential. */
  properties?: AccountKeyCredentialProperties;
  kind: "AccountKey";
}

/** Properties of key vault secret user pass credential type. */
export interface KeyVaultSecretUserPassCredentialTypeProperties {
  /** User name. */
  user?: string;
  /** The password of key vault secret user pass credential type. */
  password?: KeyVaultSecret;
}

/** Properties of user pass credential. */
export interface UserPassCredentialProperties {
  /** Properties of key vault secret user pass credential type. */
  typeProperties?: KeyVaultSecretUserPassCredentialTypeProperties;
  description?: string;
}

/** Credential type that uses Basic authentication. */
export interface BasicAuthAzureKeyVaultCredential extends CredentialParent {
  /** The properties of basic auth Azure Key Vault credential. */
  properties?: UserPassCredentialProperties;
  kind: "BasicAuth";
}

/** The type properties of role ARN credential. */
export interface RoleARNCredentialTypeProperties {
  /** The role ARN of role ARN credential type properties. */
  roleARN?: string;
}

/** The properties of role ARN credential. */
export interface RoleARNCredentialProperties {
  /** The type properties of role ARN credential. */
  typeProperties?: RoleARNCredentialTypeProperties;
  /** The description of role ARN credential. */
  description?: string;
}

/** Credential type that uses Account ID, External ID and Role ARN for authentication. */
export interface RoleARNCredential extends CredentialParent {
  /** The properties of role ARN credential. */
  properties?: RoleARNCredentialProperties;
  kind: "AmazonARN";
}

/** The type properties of key vault secret service principal credential. */
export interface KeyVaultSecretServicePrinipalCredentialTypeProperties {
  /** The service principal ID of key vault secret service principal credential type properties. */
  servicePrincipalId?: string;
  /** The key vault secret. */
  servicePrincipalKey?: KeyVaultSecret;
  tenant?: string;
}

/** The properties of service principal Azure Key Vault credential. */
export interface ServicePrincipalAzureKeyVaultCredentialProperties {
  /** The type properties of key vault secret service principal credential. */
  typeProperties?: KeyVaultSecretServicePrinipalCredentialTypeProperties;
  description?: string;
}

/** Credential type that uses Tenant ID and Service principal ID for authentication. */
export interface ServicePrincipalAzureKeyVaultCredential extends CredentialParent {
  /** The properties of service principal Azure Key Vault credential. */
  properties?: ServicePrincipalAzureKeyVaultCredentialProperties;
  kind: "ServicePrincipal";
}

/** Credential type that uses Sql for authentication. */
export interface SqlAuthAzureKeyVaultCredential extends CredentialParent {
  /** Properties of user pass credential. */
  properties?: UserPassCredentialProperties;
  kind: "SqlAuth";
}

/** The type properties of key vault secret consumer key credential. */
export interface KeyVaultSecretConsumerKeyCredentialTypeProperties {
  /** User name. */
  user?: string;
  /** The password of key vault secret consumer key credential type properties. */
  password?: KeyVaultSecret;
  /** The consumer key of key vault secret consumer key credential type properties. */
  consumerKey?: string;
  /** The consumer secret of key vault secret consumer key credential type properties. */
  consumerSecret?: KeyVaultSecret;
}

/** The properties of consumer key credential. */
export interface ConsumerKeyCredentialProperties {
  /** The type properties of key vault secret consumer key credential. */
  typeProperties?: KeyVaultSecretConsumerKeyCredentialTypeProperties;
  /** Description of credential properties. */
  description?: string;
}

/** Credential type that uses consumer provided key and secret for authentication. */
export interface ConsumerKeyAuthAzureKeyVaultCredential extends CredentialParent {
  /** The properties of consumer key credential. */
  properties?: ConsumerKeyCredentialProperties;
  kind: "ConsumerKeyAuth";
}

/** The type properties of key vault secret delegated auth credential. */
export interface KeyVaultSecretDelegatedAuthCredentialTypeProperties {
  /** Credential type that uses Account ID, External ID and Role ARN for authentication. */
  clientId?: string;
  /** User name. */
  user?: string;
  /** Key vault secret. */
  password?: KeyVaultSecret;
}

/** The properties of delegated auth credential. */
export interface DelegatedAuthCredentialProperties {
  /** The type properties of key vault secret delegated auth credential. */
  typeProperties?: KeyVaultSecretDelegatedAuthCredentialTypeProperties;
  description?: string;
}

/** Credential type that uses Client ID for authentication. */
export interface DelegatedAuthAzureKeyVaultCredential extends CredentialParent {
  /** The properties of delegated auth Azure Key Vault credential. */
  properties?: DelegatedAuthCredentialProperties;
  kind: "DelegatedAuth";
}

/** The type properties of key vault secret managed identity Azure Key Vault credential. */
export interface KeyVaultSecretManagedIdentityAzureKeyVaultCredentialTypeProperties {
  /** The principal ID of key vault secret managed identity Azure Key Vault credential type properties. */
  principalId?: string;
  /** The tenant ID of key vault secret managed identity Azure Key Vault credential type properties. */
  tenantId?: string;
  /** The resource ID of key vault secret managed identity Azure Key Vault credential type properties. */
  resourceId?: string;
}

/** The properties of managed identity Azure Key Vault credential. */
export interface ManagedIdentityAzureKeyVaultCredentialProperties {
  /** The type properties of managed identity Azure Key Vault credential. */
  typeProperties?: KeyVaultSecretManagedIdentityAzureKeyVaultCredentialTypeProperties;
  description?: string;
}

/** Credential type that uses User assigned managed identities for authentication. */
export interface ManagedIdentityAzureKeyVaultCredential extends CredentialParent {
  /** The properties of managed identity Azure Key Vault credential. */
  properties?: ManagedIdentityAzureKeyVaultCredentialProperties;
  kind: "ManagedIdentity";
}

/** Properties of data source. */
export interface DataSourceProperties {
  /** The reference to collection. */
  collection?: CollectionReference;
  /** Data source collection moving state. */
  dataSourceCollectionMovingState?: "Active" | "Moving" | "Failed";
}

/** Properties of azure subscription. */
export interface AzureSubscriptionProperties extends DataSourceProperties {
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
export interface AzureSubscriptionDataSource extends DataSourceParent {
  /** Azure subscription properties. */
  properties?: AzureSubscriptionProperties;
  kind: "AzureSubscription";
}

/** Azure resource group properties. */
export interface AzureResourceGroupProperties extends DataSourceProperties {
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
export interface AzureResourceGroupDataSource extends DataSourceParent {
  /** Azure resource group properties. */
  properties?: AzureResourceGroupProperties;
  kind: "AzureResourceGroup";
}

/** Azure data source properties. */
export interface AzureDataSourceProperties extends DataSourceProperties {
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
export interface AzureSynapseWorkspaceProperties extends AzureDataSourceProperties {
  /** The dedicated SQL endpoint of azure synapse workspace. */
  dedicatedSqlEndpoint?: string;
  /** The serverless SQL endpoint of azure synapse workspace. */
  serverlessSqlEndpoint?: string;
}

/** Azure synapse workspace data source. */
export interface AzureSynapseWorkspaceDataSource extends DataSourceParent {
  /** Azure synapse workspace properties. */
  properties?: AzureSynapseWorkspaceProperties;
  kind: "AzureSynapseWorkspace";
}

/** Azure synapse data source properties. */
export interface AzureSynapseProperties extends AzureDataSourceProperties {
  /** The SQL endpoint of azure synapse. */
  sqlEndpoint?: string;
  /** The SQL on demand endpoint of azure synapse. */
  sqlOnDemandEndpoint?: string;
}

/** Azure synapse data source. */
export interface AzureSynapseDataSource extends DataSourceParent {
  /** Azure synapse properties. */
  properties?: AzureSynapseProperties;
  kind: "AzureSynapse";
}

/** The properties of ADLS Gen1. */
export interface AdlsGen1Properties extends AzureDataSourceProperties {
  /** The endpoint of ADLS Gen1. */
  endpoint?: string;
}

/** The ADLS Gen1 data source. */
export interface AdlsGen1DataSource extends DataSourceParent {
  /** The properties of ADLS Gen1. */
  properties?: AdlsGen1Properties;
  kind: "AdlsGen1";
}

/** The properties of ADLS Gen2. */
export interface AdlsGen2Properties extends AzureDataSourceProperties {
  /** The endpoint of ADLS Gen2. */
  endpoint?: string;
}

/** The ADLS Gen2 data source. */
export interface AdlsGen2DataSource extends DataSourceParent {
  /** The properties of ADLS Gen2. */
  properties?: AdlsGen2Properties;
  kind: "AdlsGen2";
}

/** The properties of Amazon account. */
export interface AmazonAccountProperties extends DataSourceProperties {
  /** AWS account id. */
  awsAccountId?: string;
  /** Role arn. */
  roleARN?: string;
}

/** The Amazon account data source. */
export interface AmazonAccountDataSource extends DataSourceParent {
  /** The properties of Amazon account. */
  properties?: AmazonAccountProperties;
  kind: "AmazonAccount";
}

/** The properties of Amazon S3. */
export interface AmazonS3Properties extends DataSourceProperties {
  /** Service URL. */
  serviceUrl?: string;
  /** Role ARN. */
  roleARN?: string;
}

/** The Amazon S3 data source. */
export interface AmazonS3DataSource extends DataSourceParent {
  /** Amazon S3 properties. */
  properties?: AmazonS3Properties;
  kind: "AmazonS3";
}

/** The properties of Amazon SQL. */
export interface AmazonSqlProperties extends DataSourceProperties {
  /** Server Endpoint. */
  serverEndpoint?: string;
  /** Port. */
  port?: number;
  /** Vpc Endpoint Service Name. */
  vpcEndpointServiceName?: string;
}

/** The Amazon SQL data source. */
export interface AmazonSqlDataSource extends DataSourceParent {
  /** Amazon SQL properties. */
  properties?: AmazonSqlProperties;
  kind: "AmazonSql";
}

/** The properties of Azure Cosmos DB. */
export interface AzureCosmosDbProperties extends AzureDataSourceProperties {
  /** The account URI of Azure Cosmos DB. */
  accountUri?: string;
}

/** The Azure Cosmos DB data source. */
export interface AzureCosmosDbDataSource extends DataSourceParent {
  /** The properties of Azure Cosmos DB. */
  properties?: AzureCosmosDbProperties;
  kind: "AzureCosmosDb";
}

/** The properties of azure data explorer. */
export interface AzureDataExplorerProperties extends AzureDataSourceProperties {
  endpoint?: string;
}

/** The azure data explorer data source. */
export interface AzureDataExplorerDataSource extends DataSourceParent {
  /** The properties of azure data explorer. */
  properties?: AzureDataExplorerProperties;
  kind: "AzureDataExplorer";
}

/** The properties of azure file service. */
export interface AzureFileServiceProperties extends AzureDataSourceProperties {
  /** The endpoint of azure file service. */
  endpoint?: string;
}

/** The azure file service data source. */
export interface AzureFileServiceDataSource extends DataSourceParent {
  /** The properties of azure file service. */
  properties?: AzureFileServiceProperties;
  kind: "AzureFileService";
}

/** The properties of Azure SQL database. */
export interface AzureSqlDatabaseProperties extends AzureDataSourceProperties {
  /** The server endpoint of Azure SQL database. */
  serverEndpoint?: string;
}

/** The Azure SQL database data source. */
export interface AzureSqlDatabaseDataSource extends DataSourceParent {
  /** The properties of Azure SQL database. */
  properties?: AzureSqlDatabaseProperties;
  kind: "AzureSqlDatabase";
}

/** The properties of Amazon Postgre SQL. */
export interface AmazonPostgreSqlProperties extends DataSourceProperties {
  /** The server endpoint of Amazon Postgre SQL. */
  serverEndpoint?: string;
  /** The port of Amazon Postgre SQL. */
  port?: number;
  /** The vpc endpoint service name of Amazon Postgre SQL. */
  vpcEndpointServiceName?: string;
}

/** The Amazon Postgre SQL data source. */
export interface AmazonPostgreSqlDataSource extends DataSourceParent {
  /** The properties of Amazon Postgre SQL. */
  properties?: AmazonPostgreSqlProperties;
  kind: "AmazonPostgreSql";
}

/** The properties of Azure Postgre SQL. */
export interface AzurePostgreSqlProperties extends AzureDataSourceProperties {
  /** The server endpoint of Azure Postgre SQL. */
  serverEndpoint?: string;
  port?: number;
}

/** The Azure Postgre SQL data source. */
export interface AzurePostgreSqlDataSource extends DataSourceParent {
  /** The properties of Azure Postgre SQL. */
  properties?: AzurePostgreSqlProperties;
  kind: "AzurePostgreSql";
}

/** The properties of sql server database. */
export interface SqlServerDatabaseProperties extends AzureDataSourceProperties {
  /** The server endpoint of sql server database. */
  serverEndpoint?: string;
}

/** The sql server database data source. */
export interface SqlServerDatabaseDataSource extends DataSourceParent {
  /** The properties of sql server database. */
  properties?: SqlServerDatabaseProperties;
  kind: "SqlServerDatabase";
}

/** The properties of Azure SQL database managed instance. */
export interface AzureSqlDatabaseManagedInstanceProperties extends AzureDataSourceProperties {
  serverEndpoint?: string;
}

/** The Azure SQL database managed instance data source. */
export interface AzureSqlDatabaseManagedInstanceDataSource extends DataSourceParent {
  /** The properties of Azure SQL database managed instance. */
  properties?: AzureSqlDatabaseManagedInstanceProperties;
  kind: "AzureSqlDatabaseManagedInstance";
}

/** The properties of Azure SQL data warehouse. */
export interface AzureSqlDataWarehouseProperties extends AzureDataSourceProperties {
  serverEndpoint?: string;
}

/** The Azure SQL data warehouse data source. */
export interface AzureSqlDataWarehouseDataSource extends DataSourceParent {
  /** The properties of Azure SQL data warehouse. */
  properties?: AzureSqlDataWarehouseProperties;
  kind: "AzureSqlDataWarehouse";
}

/** Azure MySQL data source properties. */
export interface AzureMySqlProperties extends AzureDataSourceProperties {
  /** The server endpoint of azure my sql. */
  serverEndpoint?: string;
  /** The port of azure my sql. */
  port?: number;
}

/** Azure MySQL data source. */
export interface AzureMySqlDataSource extends DataSourceParent {
  /** Azure MySQL properties. */
  properties?: AzureMySqlProperties;
  kind: "AzureMySql";
}

/** The properties of Azure Storage. */
export interface AzureStorageProperties extends AzureDataSourceProperties {
  /** The endpoint of Azure Storage. */
  endpoint?: string;
}

/** The Azure Storage data source. */
export interface AzureStorageDataSource extends DataSourceParent {
  /** The properties of Azure Storage. */
  properties?: AzureStorageProperties;
  kind: "AzureStorage";
}

/** The properties of teradata. */
export interface TeradataProperties extends DataSourceProperties {
  /** The host of teradata. */
  host?: string;
}

/** The teradata data source. */
export interface TeradataDataSource extends DataSourceParent {
  /** The properties of teradata. */
  properties?: TeradataProperties;
  kind: "Teradata";
}

/** The properties of oracle. */
export interface OracleProperties extends DataSourceProperties {
  /** The host of Oracle server. */
  host?: string;
  /** The port of Oracle server. */
  port?: string;
  /** The service of Oracle server. */
  service?: string;
}

/** The oracle data source. */
export interface OracleDataSource extends DataSourceParent {
  /** The properties of oracle. */
  properties?: OracleProperties;
  kind: "Oracle";
}

/** SAP S/4HANA data source properties. */
export interface SapS4HanaProperties extends DataSourceProperties {
  /** The application server of SAP S/4HANA. */
  applicationServer?: string;
  /** The system number of SAP S/4HANA. */
  systemNumber?: string;
}

/** SAP S/4HANA data source. */
export interface SapS4HanaDataSource extends DataSourceParent {
  /** SAP S/4HANA data source properties. */
  properties?: SapS4HanaProperties;
  kind: "SapS4Hana";
}

/** SAP ECC properties. */
export interface SapEccProperties extends DataSourceProperties {
  /** The application server of SAP ECC. */
  applicationServer?: string;
  /** The system number of SAP ECC. */
  systemNumber?: string;
}

/** SAP ECC data source. */
export interface SapEccDataSource extends DataSourceParent {
  /** SAP ECC properties. */
  properties?: SapEccProperties;
  kind: "SapEcc";
}

/** Power BI properties. */
export interface PowerBIProperties extends DataSourceProperties {
  /** The tenant of Power BI. */
  tenant?: string;
}

/** Power BI data source. */
export interface PowerBIDataSource extends DataSourceParent {
  /** Power BI properties. */
  properties?: PowerBIProperties;
  kind: "PowerBI";
}

/** Scan ruleset properties. */
export interface ScanRulesetProperties {
  description?: string;
  /** The system classifications that are excluded from the scan ruleset. */
  excludedSystemClassifications?: Array<string>;
  /** The custom classification rule names that are included in the scan ruleset. */
  includedCustomClassificationRuleNames?: Array<string>;
}

/** Azure subscription scan ruleset properties. */
export interface AzureSubscriptionScanRulesetProperties extends ScanRulesetProperties {}

/** Azure subscription scan ruleset. */
export interface AzureSubscriptionScanRuleset extends ScanRulesetParent {
  /** Azure subscription scan ruleset properties. */
  properties?: AzureSubscriptionScanRulesetProperties;
  kind: "AzureSubscription";
}

/** Azure resource group scan ruleset properties. */
export interface AzureResourceGroupScanRulesetProperties extends ScanRulesetProperties {}

/** Azure resource group scan ruleset. */
export interface AzureResourceGroupScanRuleset extends ScanRulesetParent {
  /** Azure resource group scan ruleset properties. */
  properties?: AzureResourceGroupScanRulesetProperties;
  kind: "AzureResourceGroup";
}

/** Azure synapse workspace scan ruleset properties. */
export interface AzureSynapseWorkspaceScanRulesetProperties extends ScanRulesetProperties {}

/** Azure synapse workspace scan ruleset. */
export interface AzureSynapseWorkspaceScanRuleset extends ScanRulesetParent {
  /** Azure synapse workspace scan ruleset properties. */
  properties?: AzureSynapseWorkspaceScanRulesetProperties;
  kind: "AzureSynapseWorkspace";
}

/** Azure synapse scan ruleset properties. */
export interface AzureSynapseScanRulesetProperties extends ScanRulesetProperties {}

/** Azure synapse scan ruleset. */
export interface AzureSynapseScanRuleset extends ScanRulesetParent {
  /** Azure synapse scan ruleset properties. */
  properties?: AzureSynapseScanRulesetProperties;
  kind: "AzureSynapse";
}

/** Custom file type. */
export interface CustomFileType {
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
export interface CustomFileExtension {
  /** The custom file type of the custom file extension. */
  customFileType?: CustomFileType;
  /** The description of the custom file extension. */
  description?: string;
  /** The flag to indicate whether the custom file extension is enabled or not. */
  enabled?: boolean;
  /** The file extension of the custom file extension. */
  fileExtension?: string;
}

/** Scanning rule. */
export interface ScanningRule {
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
  customFileExtensions?: Array<CustomFileExtension>;
}

/** Scanning rule scan ruleset properties. */
export interface ScanningRuleScanRulesetProperties extends ScanRulesetProperties {
  /** The scanning rule of the scanning rule scan ruleset. */
  scanningRule?: ScanningRule;
}

/** ADLS Gen1 scan ruleset properties. */
export interface AdlsGen1ScanRulesetProperties extends ScanningRuleScanRulesetProperties {}

/** ADLS Gen1 scan ruleset. */
export interface AdlsGen1ScanRuleset extends ScanRulesetParent {
  /** ADLS Gen1 scan ruleset properties. */
  properties?: AdlsGen1ScanRulesetProperties;
  kind: "AdlsGen1";
}

/** Adls gen 2 scan ruleset properties. */
export interface AdlsGen2ScanRulesetProperties extends ScanningRuleScanRulesetProperties {}

/** Adls gen 2 scan ruleset. */
export interface AdlsGen2ScanRuleset extends ScanRulesetParent {
  /** Adls gen 2 scan ruleset properties. */
  properties?: AdlsGen2ScanRulesetProperties;
  kind: "AdlsGen2";
}

/** Amazon account scan ruleset properties. */
export interface AmazonAccountScanRulesetProperties extends ScanRulesetProperties {}

/** Amazon account scan ruleset. */
export interface AmazonAccountScanRuleset extends ScanRulesetParent {
  /** Amazon account scan ruleset properties. */
  properties?: AmazonAccountScanRulesetProperties;
  kind: "AmazonAccount";
}

/** Amazon S3 scan ruleset properties. */
export interface AmazonS3ScanRulesetProperties extends ScanningRuleScanRulesetProperties {}

/** Amazon S3 scan ruleset. */
export interface AmazonS3ScanRuleset extends ScanRulesetParent {
  /** Amazon S3 scan ruleset properties. */
  properties?: AmazonS3ScanRulesetProperties;
  kind: "AmazonS3";
}

/** Amazon SQL scan ruleset properties. */
export interface AmazonSqlScanRulesetProperties extends ScanRulesetProperties {}

/** Amazon SQL scan ruleset. */
export interface AmazonSqlScanRuleset extends ScanRulesetParent {
  /** Amazon SQL scan ruleset properties. */
  properties?: AmazonSqlScanRulesetProperties;
  kind: "AmazonSql";
}

/** Azure Cosmos DB scan ruleset properties. */
export interface AzureCosmosDbScanRulesetProperties extends ScanRulesetProperties {}

/** Azure Cosmos DB scan ruleset. */
export interface AzureCosmosDbScanRuleset extends ScanRulesetParent {
  /** Azure Cosmos DB scan ruleset properties. */
  properties?: AzureCosmosDbScanRulesetProperties;
  kind: "AzureCosmosDb";
}

/** Azure data explorer scan ruleset properties. */
export interface AzureDataExplorerScanRulesetProperties extends ScanRulesetProperties {}

/** Azure data explorer scan ruleset. */
export interface AzureDataExplorerScanRuleset extends ScanRulesetParent {
  /** Azure data explorer scan ruleset properties. */
  properties?: AzureDataExplorerScanRulesetProperties;
  kind: "AzureDataExplorer";
}

/** Azure file service scan ruleset properties. */
export interface AzureFileServiceScanRulesetProperties extends ScanningRuleScanRulesetProperties {}

/** Azure file service scan ruleset. */
export interface AzureFileServiceScanRuleset extends ScanRulesetParent {
  /** Azure file service scan ruleset properties. */
  properties?: AzureFileServiceScanRulesetProperties;
  kind: "AzureFileService";
}

/** Azure SQL db scan ruleset properties. */
export interface AzureSqlDatabaseScanRulesetProperties extends ScanRulesetProperties {}

/** Azure SQL db scan ruleset. */
export interface AzureSqlDatabaseScanRuleset extends ScanRulesetParent {
  /** Azure SQL db scan ruleset properties. */
  properties?: AzureSqlDatabaseScanRulesetProperties;
  kind: "AzureSqlDatabase";
}

/** Azure Postgre SQL scan ruleset properties. */
export interface AmazonPostgreSqlScanRulesetProperties extends ScanRulesetProperties {}

/** Azure Postgre SQL scan ruleset. */
export interface AmazonPostgreSqlScanRuleset extends ScanRulesetParent {
  /** Azure Postgre SQL scan ruleset properties. */
  properties?: AmazonPostgreSqlScanRulesetProperties;
  kind: "AmazonPostgreSql";
}

/** Azure Postgre SQL scan ruleset properties. */
export interface AzurePostgreSqlScanRulesetProperties extends ScanRulesetProperties {}

/** Azure Postgre SQL scan ruleset. */
export interface AzurePostgreSqlScanRuleset extends ScanRulesetParent {
  /** Azure Postgre SQL scan ruleset properties. */
  properties?: AzurePostgreSqlScanRulesetProperties;
  kind: "AzurePostgreSql";
}

/** Sql server database scan ruleset properties. */
export interface SqlServerDatabaseScanRulesetProperties extends ScanRulesetProperties {}

/** Sql server database scan ruleset. */
export interface SqlServerDatabaseScanRuleset extends ScanRulesetParent {
  /** Sql server database scan ruleset properties. */
  properties?: SqlServerDatabaseScanRulesetProperties;
  kind: "SqlServerDatabase";
}

/** Azure SQL db managed instance scan ruleset properties. */
export interface AzureSqlDatabaseManagedInstanceScanRulesetProperties extends ScanRulesetProperties {}

/** Azure SQL db managed instance scan ruleset. */
export interface AzureSqlDatabaseManagedInstanceScanRuleset extends ScanRulesetParent {
  /** Azure SQL db managed instance scan ruleset properties. */
  properties?: AzureSqlDatabaseManagedInstanceScanRulesetProperties;
  kind: "AzureSqlDatabaseManagedInstance";
}

/** Azure SQL data warehouse scan ruleset properties. */
export interface AzureSqlDataWarehouseScanRulesetProperties extends ScanRulesetProperties {}

/** Azure SQL data warehouse scan ruleset. */
export interface AzureSqlDataWarehouseScanRuleset extends ScanRulesetParent {
  /** Azure SQL data warehouse scan ruleset properties. */
  properties?: AzureSqlDataWarehouseScanRulesetProperties;
  kind: "AzureSqlDataWarehouse";
}

/** Azure MySQL scan ruleset properties. */
export interface AzureMySqlScanRulesetProperties extends ScanRulesetProperties {}

/** Azure MySQL scan ruleset. */
export interface AzureMySqlScanRuleset extends ScanRulesetParent {
  /** Azure MySQL scan ruleset properties. */
  properties?: AzureMySqlScanRulesetProperties;
  kind: "AzureMySql";
}

/** Azure Storage scan ruleset properties. */
export interface AzureStorageScanRulesetProperties extends ScanningRuleScanRulesetProperties {}

/** Azure Storage scan ruleset. */
export interface AzureStorageScanRuleset extends ScanRulesetParent {
  /** Azure Storage scan ruleset properties. */
  properties?: AzureStorageScanRulesetProperties;
  kind: "AzureStorage";
}

/** Teradata scan ruleset properties. */
export interface TeradataScanRulesetProperties extends ScanningRuleScanRulesetProperties {}

/** Teradata scan ruleset. */
export interface TeradataScanRuleset extends ScanRulesetParent {
  /** Teradata scan ruleset properties. */
  properties?: TeradataScanRulesetProperties;
  kind: "Teradata";
}

/** Oracle scan rule set properties. */
export interface OracleScanRulesetProperties extends ScanningRuleScanRulesetProperties {}

/** Oracle scan ruleset. */
export interface OracleScanRuleset extends ScanRulesetParent {
  /** Oracle scan rule set properties. */
  properties?: OracleScanRulesetProperties;
  kind: "Oracle";
}

/** SAP S/4HANA scan ruleset properties. */
export interface SapS4HanaScanRulesetProperties extends ScanRulesetProperties {}

/** SAP S/4HANA scan ruleset. */
export interface SapS4HanaScanRuleset extends ScanRulesetParent {
  /** SAP S/4HANA scan ruleset properties. */
  properties?: SapS4HanaScanRulesetProperties;
  kind: "SapS4Hana";
}

/** SAP ECC scan ruleset properties. */
export interface SapEccScanRulesetProperties extends ScanRulesetProperties {}

/** SAP ECC scan ruleset. */
export interface SapEccScanRuleset extends ScanRulesetParent {
  /** SAP ECC scan ruleset properties. */
  properties?: SapEccScanRulesetProperties;
  kind: "SapEcc";
}

/** Power BI scan ruleset properties. */
export interface PowerBIScanRulesetProperties extends ScanRulesetProperties {}

/** Power BI scan ruleset. */
export interface PowerBIScanRuleset extends ScanRulesetParent {
  /** Power BI scan ruleset properties. */
  properties?: PowerBIScanRulesetProperties;
  kind: "PowerBI";
}

/** Resource name filter. */
export interface ResourceNameFilter {
  excludePrefixes?: Array<string>;
  includePrefixes?: Array<string>;
  resources?: Array<string>;
}

/** The credential reference. */
export interface CredentialReference {
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
export interface ResourceTypeFilter {
  /** The name of the scan ruleset. */
  scanRulesetName?: string;
  /** The type of the scan ruleset. */
  scanRulesetType?: "Custom" | "System";
  /** Resource name filter. */
  resourceNameFilter?: ResourceNameFilter;
  /** The credential reference. */
  credential?: CredentialReference;
}

/** The integration runtime reference. */
export interface ConnectedVia {
  /** The reference name of the integration runtime. */
  referenceName?: string;
}

/** Scan properties. */
export interface ScanProperties {
  /** The name of the scan ruleset. */
  scanRulesetName?: string;
  /** The name of the business rule set. */
  businessRuleSetName?: string;
  /** The type of the scan ruleset. */
  scanRulesetType?: "Custom" | "System";
  /** The collection reference of the scan. */
  collection?: CollectionReference;
  /** The domain of the scan. */
  domain?: string;
  /** The number of workers of the scan. */
  workers?: number;
  /** The integration runtime reference of the scan. */
  connectedVia?: ConnectedVia;
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
export interface ExpandingResourceScanProperties extends ScanProperties {
  /** Resource types of scan properties in expanding resources. */
  resourceTypes?: ExpandingResourceScanPropertiesResourceTypes;
  /** The credential reference. */
  credential?: CredentialReference;
}

/** Resource types of scan properties in expanding resources. */
export interface ExpandingResourceScanPropertiesResourceTypes {
  /** Resource type filter. */
  none?: ResourceTypeFilter;
  /** Resource type filter. */
  azureSubscription?: ResourceTypeFilter;
  /** Resource type filter. */
  azureResourceGroup?: ResourceTypeFilter;
  /** Resource type filter. */
  azureSynapseWorkspace?: ResourceTypeFilter;
  /** Resource type filter. */
  azureSynapse?: ResourceTypeFilter;
  /** Resource type filter. */
  adlsGen1?: ResourceTypeFilter;
  /** Resource type filter. */
  adlsGen2?: ResourceTypeFilter;
  /** Resource type filter. */
  amazonAccount?: ResourceTypeFilter;
  /** Resource type filter. */
  amazonS3?: ResourceTypeFilter;
  /** Resource type filter. */
  amazonSql?: ResourceTypeFilter;
  /** Resource type filter. */
  azureCosmosDb?: ResourceTypeFilter;
  /** Resource type filter. */
  azureDataExplorer?: ResourceTypeFilter;
  /** Resource type filter. */
  azureFileService?: ResourceTypeFilter;
  /** Resource type filter. */
  azureSqlDatabase?: ResourceTypeFilter;
  /** Resource type filter. */
  amazonPostgreSql?: ResourceTypeFilter;
  /** Resource type filter. */
  azurePostgreSql?: ResourceTypeFilter;
  /** Resource type filter. */
  sqlServerDatabase?: ResourceTypeFilter;
  /** Resource type filter. */
  azureSqlDatabaseManagedInstance?: ResourceTypeFilter;
  /** Resource type filter. */
  azureSqlDataWarehouse?: ResourceTypeFilter;
  /** Resource type filter. */
  azureMySql?: ResourceTypeFilter;
  /** Resource type filter. */
  azureStorage?: ResourceTypeFilter;
  /** Resource type filter. */
  teradata?: ResourceTypeFilter;
  /** Resource type filter. */
  oracle?: ResourceTypeFilter;
  /** Resource type filter. */
  sapS4Hana?: ResourceTypeFilter;
  /** Resource type filter. */
  sapEcc?: ResourceTypeFilter;
  /** Resource type filter. */
  powerBI?: ResourceTypeFilter;
}

/** Azure subscription credential scan properties. */
export interface AzureSubscriptionCredentialScanProperties extends ExpandingResourceScanProperties {}

/** Azure subscription credential scan. */
export interface AzureSubscriptionCredentialScan extends ScanParent {
  /** Azure subscription credential scan properties. */
  properties?: AzureSubscriptionCredentialScanProperties;
  kind: "AzureSubscriptionCredential";
}

/** Azure subscription MSI scan properties. */
export interface AzureSubscriptionMsiScanProperties extends ExpandingResourceScanProperties {}

/** Azure subscription MSI scan. */
export interface AzureSubscriptionMsiScan extends ScanParent {
  /** Azure subscription MSI scan properties. */
  properties?: AzureSubscriptionMsiScanProperties;
  kind: "AzureSubscriptionMsi";
}

/** Azure resource group credential scan properties. */
export interface AzureResourceGroupCredentialScanProperties extends ExpandingResourceScanProperties {}

/** Azure resource group credential scan. */
export interface AzureResourceGroupCredentialScan extends ScanParent {
  /** Azure resource group credential scan properties. */
  properties?: AzureResourceGroupCredentialScanProperties;
  kind: "AzureResourceGroupCredential";
}

/** Azure resource group MSI scan properties. */
export interface AzureResourceGroupMsiScanProperties extends ExpandingResourceScanProperties {}

/** Azure resource group MSI scan. */
export interface AzureResourceGroupMsiScan extends ScanParent {
  /** Azure resource group MSI scan properties. */
  properties?: AzureResourceGroupMsiScanProperties;
  kind: "AzureResourceGroupMsi";
}

/** Azure synapse workspace credential scan properties. */
export interface AzureSynapseWorkspaceCredentialScanProperties extends ExpandingResourceScanProperties {}

/** Azure synapse workspace credential scan. */
export interface AzureSynapseWorkspaceCredentialScan extends ScanParent {
  /** Azure synapse workspace credential scan properties. */
  properties?: AzureSynapseWorkspaceCredentialScanProperties;
  kind: "AzureSynapseWorkspaceCredential";
}

/** Azure synapse workspace MSI scan properties. */
export interface AzureSynapseWorkspaceMsiScanProperties extends ExpandingResourceScanProperties {}

/** Azure synapse workspace MSI scan. */
export interface AzureSynapseWorkspaceMsiScan extends ScanParent {
  /** Azure synapse workspace MSI scan properties. */
  properties?: AzureSynapseWorkspaceMsiScanProperties;
  kind: "AzureSynapseWorkspaceMsi";
}

/** Azure synapse credential scan properties. */
export interface AzureSynapseCredentialScanProperties extends ExpandingResourceScanProperties {}

/** Azure synapse credential scan. */
export interface AzureSynapseCredentialScan extends ScanParent {
  /** Azure synapse credential scan properties. */
  properties?: AzureSynapseCredentialScanProperties;
  kind: "AzureSynapseCredential";
}

/** Azure synapse MSI scan properties. */
export interface AzureSynapseMsiScanProperties extends ExpandingResourceScanProperties {}

/** Azure synapse MSI scan. */
export interface AzureSynapseMsiScan extends ScanParent {
  /** Azure synapse MSI scan properties. */
  properties?: AzureSynapseMsiScanProperties;
  kind: "AzureSynapseMsi";
}

/** ADLS Gen1 credential scan properties. */
export interface AdlsGen1CredentialScanProperties extends ScanProperties {
  /** The credential reference. */
  credential?: CredentialReference;
}

/** ADLS Gen1 credential scan. */
export interface AdlsGen1CredentialScan extends ScanParent {
  /** ADLS Gen1 credential scan properties. */
  properties?: AdlsGen1CredentialScanProperties;
  kind: "AdlsGen1Credential";
}

/** ADLS Gen1 MSI scan properties. */
export interface AdlsGen1MsiScanProperties extends ScanProperties {}

/** ADLS Gen1 MSI scan. */
export interface AdlsGen1MsiScan extends ScanParent {
  /** ADLS Gen1 MSI scan properties. */
  properties?: AdlsGen1MsiScanProperties;
  kind: "AdlsGen1Msi";
}

/** ADLS Gen2 credential scan properties. */
export interface AdlsGen2CredentialScanProperties extends ScanProperties {
  /** The credential reference. */
  credential?: CredentialReference;
}

/** ADLS Gen2 credential scan. */
export interface AdlsGen2CredentialScan extends ScanParent {
  /** ADLS Gen2 credential scan properties. */
  properties?: AdlsGen2CredentialScanProperties;
  kind: "AdlsGen2Credential";
}

/** ADLS Gen2 MSI scan properties. */
export interface AdlsGen2MsiScanProperties extends ScanProperties {}

/** ADLS Gen2 MSI scan. */
export interface AdlsGen2MsiScan extends ScanParent {
  /** ADLS Gen2 MSI scan properties. */
  properties?: AdlsGen2MsiScanProperties;
  kind: "AdlsGen2Msi";
}

/** Amazon account credential scan properties. */
export interface AmazonAccountCredentialScanProperties extends ExpandingResourceScanProperties {}

/** Amazon account credential scan. */
export interface AmazonAccountCredentialScan extends ScanParent {
  /** Amazon account credential scan properties. */
  properties?: AmazonAccountCredentialScanProperties;
  kind: "AmazonAccountCredential";
}

/** Amazon S3 credential scan properties. */
export interface AmazonS3CredentialScanProperties extends ScanProperties {
  /** The credential reference. */
  credential?: CredentialReference;
  roleARN?: string;
  isMauiScan?: boolean;
}

/** Amazon S3 credential scan. */
export interface AmazonS3CredentialScan extends ScanParent {
  /** Amazon S3 credential scan properties. */
  properties?: AmazonS3CredentialScanProperties;
  kind: "AmazonS3Credential";
}

/** Amazon S3 role ARN scan properties. */
export interface AmazonS3RoleARNScanProperties extends ScanProperties {
  /** The credential reference. */
  credential?: CredentialReference;
  /** The role ARN of the scan. */
  roleARN?: string;
  /** The flag to indicate whether the scan is a Maui scan or not. */
  isMauiScan?: boolean;
}

/** Amazon S3 role ARN scan. */
export interface AmazonS3RoleARNScan extends ScanParent {
  /** Amazon S3 role ARN scan properties. */
  properties?: AmazonS3RoleARNScanProperties;
  kind: "AmazonS3RoleARN";
}

/** Amazon SQL credential scan properties. */
export interface AmazonSqlCredentialScanProperties extends ScanProperties {
  /** The credential reference. */
  credential?: CredentialReference;
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
export interface AmazonSqlCredentialScan extends ScanParent {
  /** Amazon SQL credential scan properties. */
  properties?: AmazonSqlCredentialScanProperties;
  kind: "AmazonSqlCredential";
}

/** Azure Cosmos DB credential scan properties. */
export interface AzureCosmosDbCredentialScanProperties extends ScanProperties {
  /** The credential reference. */
  credential?: CredentialReference;
  databaseName?: string;
}

/** Azure Cosmos DB credential scan. */
export interface AzureCosmosDbCredentialScan extends ScanParent {
  /** Azure Cosmos DB credential scan properties. */
  properties?: AzureCosmosDbCredentialScanProperties;
  kind: "AzureCosmosDbCredential";
}

/** Azure data Explorer credential scan properties. */
export interface AzureDataExplorerCredentialScanProperties extends ScanProperties {
  /** The credential reference. */
  credential?: CredentialReference;
  database?: string;
}

/** Azure data Explorer credential scan. */
export interface AzureDataExplorerCredentialScan extends ScanParent {
  /** Azure data Explorer credential scan properties. */
  properties?: AzureDataExplorerCredentialScanProperties;
  kind: "AzureDataExplorerCredential";
}

/** Azure data Explorer MSI scan properties. */
export interface AzureDataExplorerMsiScanProperties extends ScanProperties {
  database?: string;
}

/** Azure data Explorer MSI scan. */
export interface AzureDataExplorerMsiScan extends ScanParent {
  /** Azure data Explorer MSI scan properties. */
  properties?: AzureDataExplorerMsiScanProperties;
  kind: "AzureDataExplorerMsi";
}

/** Azure file service credential scan properties. */
export interface AzureFileServiceCredentialScanProperties extends ScanProperties {
  /** The credential reference. */
  credential?: CredentialReference;
  shareName?: string;
}

/** Azure file service credential scan. */
export interface AzureFileServiceCredentialScan extends ScanParent {
  /** Azure file service credential scan properties. */
  properties?: AzureFileServiceCredentialScanProperties;
  kind: "AzureFileServiceCredential";
}

/** Azure SQL scan properties. */
export interface AzureSqlScanProperties extends ScanProperties {
  /** The endpoint of Azure SQL server. */
  serverEndpoint?: string;
  /** The database name. */
  databaseName?: string;
}

/** Azure SQL credential scan properties. */
export interface AzureSqlCredentialScanProperties extends AzureSqlScanProperties {
  /** The credential reference. */
  credential?: CredentialReference;
}

/** Azure SQL database credential scan properties. */
export interface AzureSqlDatabaseCredentialScanProperties extends AzureSqlCredentialScanProperties {}

/** Azure SQL database credential scan. */
export interface AzureSqlDatabaseCredentialScan extends ScanParent {
  /** Azure SQL database credential scan properties. */
  properties?: AzureSqlDatabaseCredentialScanProperties;
  kind: "AzureSqlDatabaseCredential";
}

/** Azure SQL database MSI scan properties. */
export interface AzureSqlDatabaseMsiScanProperties extends AzureSqlScanProperties {}

/** Azure SQL database MSI scan. */
export interface AzureSqlDatabaseMsiScan extends ScanParent {
  /** Azure SQL database MSI scan properties. */
  properties?: AzureSqlDatabaseMsiScanProperties;
  kind: "AzureSqlDatabaseMsi";
}

/** Amazon Postgre SQL credential scan properties. */
export interface AmazonPostgreSqlCredentialScanProperties extends ScanProperties {
  /** The credential reference. */
  credential?: CredentialReference;
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
export interface AmazonPostgreSqlCredentialScan extends ScanParent {
  /** Amazon Postgre SQL credential scan properties. */
  properties?: AmazonPostgreSqlCredentialScanProperties;
  kind: "AmazonPostgreSqlCredential";
}

/** Azure Postgre SQL credential scan properties. */
export interface AzurePostgreSqlCredentialScanProperties extends ScanProperties {
  /** The credential reference. */
  credential?: CredentialReference;
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
export interface AzurePostgreSqlCredentialScan extends ScanParent {
  /** Azure Postgre SQL credential scan properties. */
  properties?: AzurePostgreSqlCredentialScanProperties;
  kind: "AzurePostgreSqlCredential";
}

/** SQL server database credential scan properties. */
export interface SqlServerDatabaseCredentialScanProperties extends AzureSqlCredentialScanProperties {}

/** SQL server database credential scan. */
export interface SqlServerDatabaseCredentialScan extends ScanParent {
  /** SQL server database credential scan properties. */
  properties?: SqlServerDatabaseCredentialScanProperties;
  kind: "SqlServerDatabaseCredential";
}

/** Azure SQL database managed instance credential scan properties. */
export interface AzureSqlDatabaseManagedInstanceCredentialScanProperties extends AzureSqlCredentialScanProperties {}

/** Azure SQL database managed instance credential scan. */
export interface AzureSqlDatabaseManagedInstanceCredentialScan extends ScanParent {
  /** Azure SQL database managed instance credential scan properties. */
  properties?: AzureSqlDatabaseManagedInstanceCredentialScanProperties;
  kind: "AzureSqlDatabaseManagedInstanceCredential";
}

/** Azure SQL database managed instance MSI scan properties. */
export interface AzureSqlDatabaseManagedInstanceMsiScanProperties extends AzureSqlScanProperties {}

/** Azure SQL database managed instance MSI scan. */
export interface AzureSqlDatabaseManagedInstanceMsiScan extends ScanParent {
  /** Azure SQL database managed instance MSI scan properties. */
  properties?: AzureSqlDatabaseManagedInstanceMsiScanProperties;
  kind: "AzureSqlDatabaseManagedInstanceMsi";
}

/** Azure SQL data warehouse credential scan properties. */
export interface AzureSqlDataWarehouseCredentialScanProperties extends AzureSqlCredentialScanProperties {}

/** Azure SQL data warehouse credential scan. */
export interface AzureSqlDataWarehouseCredentialScan extends ScanParent {
  /** Azure SQL data warehouse credential scan properties. */
  properties?: AzureSqlDataWarehouseCredentialScanProperties;
  kind: "AzureSqlDataWarehouseCredential";
}

/** Azure SQL data warehouse MSI scan properties. */
export interface AzureSqlDataWarehouseMsiScanProperties extends AzureSqlScanProperties {}

/** Azure SQL data warehouse MSI scan. */
export interface AzureSqlDataWarehouseMsiScan extends ScanParent {
  /** Azure SQL data warehouse MSI scan properties. */
  properties?: AzureSqlDataWarehouseMsiScanProperties;
  kind: "AzureSqlDataWarehouseMsi";
}

/** Azure MySQL scan properties. */
export interface AzureMySqlScanProperties extends ScanProperties {
  /** The endpoint of the Azure MySQL server. */
  serverEndpoint?: string;
  /** The port of the Azure MySQL server. */
  port?: number;
  /** The database name. */
  databaseName?: string;
  /** The credential reference. */
  credential?: CredentialReference;
}

/** Azure MySQL credential scan properties. */
export interface AzureMySqlCredentialScanProperties extends AzureMySqlScanProperties {}

/** Azure MySQL credential scan. */
export interface AzureMySqlCredentialScan extends ScanParent {
  /** Azure MySQL credential scan properties. */
  properties?: AzureMySqlCredentialScanProperties;
  kind: "AzureMySqlCredential";
}

/** Miti scan properties. */
export interface MitiScanProperties extends ScanProperties {
  /** The maximum memory allowed in GB. */
  maximumMemoryAllowedInGb?: string;
  /** The miti cache. */
  mitiCache?: string;
}

/** Azure Storage credential scan properties. */
export interface AzureStorageCredentialScanProperties extends ScanProperties {
  /** The credential reference. */
  credential?: CredentialReference;
}

/** Azure Storage credential scan. */
export interface AzureStorageCredentialScan extends ScanParent {
  /** Azure Storage credential scan properties. */
  properties?: AzureStorageCredentialScanProperties;
  kind: "AzureStorageCredential";
}

/** Azure Storage MSI scan properties. */
export interface AzureStorageMsiScanProperties extends ScanProperties {}

/** Azure Storage MSI scan. */
export interface AzureStorageMsiScan extends ScanParent {
  /** Azure Storage MSI scan properties. */
  properties?: AzureStorageMsiScanProperties;
  kind: "AzureStorageMsi";
}

/** Teradata credential scan properties. */
export interface TeradataCredentialScanProperties extends MitiScanProperties {
  /** The credential reference. */
  credential?: CredentialReference;
  schema?: string;
  driverLocation?: string;
  storedProcedureDetails?: string;
}

/** Teradata credential scan. */
export interface TeradataCredentialScan extends ScanParent {
  /** Teradata credential scan properties. */
  properties?: TeradataCredentialScanProperties;
  kind: "TeradataTeradataCredential";
}

/** Teradata user pass scan properties. */
export interface TeradataUserPassScanProperties extends ScanProperties {
  username?: string;
  password?: string;
}

/** Teradata user pass scan. */
export interface TeradataUserPassScan extends ScanParent {
  /** Teradata user pass scan properties. */
  properties?: TeradataUserPassScanProperties;
  kind: "TeradataUserPass";
}

/** Teradata user pass scan properties. */
export interface TeradataTeradataUserPassScanProperties extends MitiScanProperties {
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
export interface TeradataTeradataUserPassScan extends ScanParent {
  /** Teradata user pass scan properties. */
  properties?: TeradataTeradataUserPassScanProperties;
  kind: "TeradataTeradataUserPass";
}

/** Oracle credential scan properties. */
export interface OracleCredentialScanProperties extends MitiScanProperties {
  /** The credential reference. */
  credential?: CredentialReference;
  schema?: string;
  driverLocation?: string;
  storedProcedureDetails?: string;
}

/** Oracle credential scan. */
export interface OracleCredentialScan extends ScanParent {
  /** Oracle credential scan properties. */
  properties?: OracleCredentialScanProperties;
  kind: "OracleOracleCredential";
}

/** Oracle user pass scan properties. */
export interface OracleUserPassScanProperties extends MitiScanProperties {
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
export interface OracleUserPassScan extends ScanParent {
  /** Oracle user pass scan properties. */
  properties?: OracleUserPassScanProperties;
  kind: "OracleOracleUserPass";
}

/** SAP S/4HANA credential scan properties. */
export interface SapS4HanaSapS4HanaCredentialScanProperties extends MitiScanProperties {
  /** The client ID of SAP S/4HANA server. */
  clientId?: string;
  /** The credential reference. */
  credential?: CredentialReference;
  /** The JCo library path. */
  jCoLibraryPath?: string;
}

/** SAP S/4HANA credential scan. */
export interface SapS4HanaSapS4HanaCredentialScan extends ScanParent {
  /** SAP S/4HANA credential scan properties. */
  properties?: SapS4HanaSapS4HanaCredentialScanProperties;
  kind: "SapS4HanaSapS4HanaCredential";
}

/** SAP S/4HANA user pass scan properties. */
export interface SapS4HanaSapS4HanaUserPassScanProperties extends MitiScanProperties {
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
export interface SapS4HanaSapS4HanaUserPassScan extends ScanParent {
  /** SAP S/4HANA user pass scan properties. */
  properties?: SapS4HanaSapS4HanaUserPassScanProperties;
  kind: "SapS4HanaSapS4HanaUserPass";
}

/** SAP ECC credential scan properties. */
export interface SapEccCredentialScanProperties extends MitiScanProperties {
  clientId?: string;
  /** The credential reference. */
  credential?: CredentialReference;
  jCoLibraryPath?: string;
}

/** SAP ECC credential scan. */
export interface SapEccCredentialScan extends ScanParent {
  /** SAP ECC credential scan properties. */
  properties?: SapEccCredentialScanProperties;
  kind: "SapEccSapEccCredential";
}

/** SAP ECC user pass scan properties. */
export interface SapEccUserPassScanProperties extends MitiScanProperties {
  clientId?: string;
  username?: string;
  password?: string;
  jCoLibraryPath?: string;
}

/** SAP ECC user pass scan. */
export interface SapEccUserPassScan extends ScanParent {
  /** SAP ECC user pass scan properties. */
  properties?: SapEccUserPassScanProperties;
  kind: "SapEccSapEccUserPass";
}

/** Power BI delegated scan properties. */
export interface PowerBIDelegatedScanProperties extends ScanProperties {
  tenant?: string;
  authenticationType?: string;
  clientId?: string;
  userName?: string;
  password?: string;
  includePersonalWorkspaces?: boolean;
}

/** Power BI delegated scan. */
export interface PowerBIDelegatedScan extends ScanParent {
  /** Power BI delegated scan properties. */
  properties?: PowerBIDelegatedScanProperties;
  kind: "PowerBIDelegated";
}

/** Power BI MSI scan properties. */
export interface PowerBIMsiScanProperties extends ScanProperties {
  /** Whether to include personal workspaces or not. */
  includePersonalWorkspaces?: boolean;
}

/** Power BI MSI scan. */
export interface PowerBIMsiScan extends ScanParent {
  /** Power BI MSI scan properties. */
  properties?: PowerBIMsiScanProperties;
  kind: "PowerBIMsi";
}

/** Azure subscription system scan ruleset. */
export interface AzureSubscriptionSystemScanRuleset extends SystemScanRulesetParent {
  /** Azure subscription scan ruleset properties. */
  properties?: AzureSubscriptionScanRulesetProperties;
  kind: "AzureSubscription";
}

/** Azure resource group system scan ruleset. */
export interface AzureResourceGroupSystemScanRuleset extends SystemScanRulesetParent {
  /** Azure resource group scan ruleset properties. */
  properties?: AzureResourceGroupScanRulesetProperties;
  kind: "AzureResourceGroup";
}

/** Azure synapse workspace system scan ruleset. */
export interface AzureSynapseWorkspaceSystemScanRuleset extends SystemScanRulesetParent {
  /** Azure synapse workspace scan ruleset properties. */
  properties?: AzureSynapseWorkspaceScanRulesetProperties;
  kind: "AzureSynapseWorkspace";
}

/** Azure Synapse System scan rule set. */
export interface AzureSynapseSystemScanRuleset extends SystemScanRulesetParent {
  /** Azure synapse scan ruleset properties. */
  properties?: AzureSynapseScanRulesetProperties;
  kind: "AzureSynapse";
}

/** ADLS Gen1 System scan rule set. */
export interface AdlsGen1SystemScanRuleset extends SystemScanRulesetParent {
  /** ADLS Gen1 scan ruleset properties. */
  properties?: AdlsGen1ScanRulesetProperties;
  kind: "AdlsGen1";
}

/** ADLS Gen2 system scan rule set. */
export interface AdlsGen2SystemScanRuleset extends SystemScanRulesetParent {
  /** Adls gen 2 scan ruleset properties. */
  properties?: AdlsGen2ScanRulesetProperties;
  kind: "AdlsGen2";
}

/** Amazon account system scan rule set. */
export interface AmazonAccountSystemScanRuleset extends SystemScanRulesetParent {
  /** Amazon account scan ruleset properties. */
  properties?: AmazonAccountScanRulesetProperties;
  kind: "AmazonAccount";
}

/** Amazon S3 system scan ruleset. */
export interface AmazonS3SystemScanRuleset extends SystemScanRulesetParent {
  /** Amazon S3 scan ruleset properties. */
  properties?: AmazonS3ScanRulesetProperties;
  kind: "AmazonS3";
}

/** Amazon SQL system scan ruleset. */
export interface AmazonSqlSystemScanRuleset extends SystemScanRulesetParent {
  /** Amazon SQL scan ruleset properties. */
  properties?: AmazonSqlScanRulesetProperties;
  kind: "AmazonSql";
}

/** Azure Cosmos DB system scan rule set. */
export interface AzureCosmosDbSystemScanRuleset extends SystemScanRulesetParent {
  /** Azure Cosmos DB scan ruleset properties. */
  properties?: AzureCosmosDbScanRulesetProperties;
  kind: "AzureCosmosDb";
}

/** Azure data explorer system scan rule set. */
export interface AzureDataExplorerSystemScanRuleset extends SystemScanRulesetParent {
  /** Azure data explorer scan ruleset properties. */
  properties?: AzureDataExplorerScanRulesetProperties;
  kind: "AzureDataExplorer";
}

/** Azure file service system scan rule set. */
export interface AzureFileServiceSystemScanRuleset extends SystemScanRulesetParent {
  /** Azure file service scan ruleset properties. */
  properties?: AzureFileServiceScanRulesetProperties;
  kind: "AzureFileService";
}

/** Azure SQL db system scan rule set. */
export interface AzureSqlDatabaseSystemScanRuleset extends SystemScanRulesetParent {
  /** Azure SQL db scan ruleset properties. */
  properties?: AzureSqlDatabaseScanRulesetProperties;
  kind: "AzureSqlDatabase";
}

/** Amazon Postgre SQL system scan rule set. */
export interface AmazonPostgreSqlSystemScanRuleset extends SystemScanRulesetParent {
  /** Azure Postgre SQL scan ruleset properties. */
  properties?: AmazonPostgreSqlScanRulesetProperties;
  kind: "AmazonPostgreSql";
}

/** Azure Postgre SQL system scan rule set. */
export interface AzurePostgreSqlSystemScanRuleset extends SystemScanRulesetParent {
  /** Azure Postgre SQL scan ruleset properties. */
  properties?: AzurePostgreSqlScanRulesetProperties;
  kind: "AzurePostgreSql";
}

/** Sql server database system scan rule set. */
export interface SqlServerDatabaseSystemScanRuleset extends SystemScanRulesetParent {
  /** Sql server database scan ruleset properties. */
  properties?: SqlServerDatabaseScanRulesetProperties;
  kind: "SqlServerDatabase";
}

/** Azure SQL database managed instance system scan rule set. */
export interface AzureSqlDatabaseManagedInstanceSystemScanRuleset extends SystemScanRulesetParent {
  /** Azure SQL db managed instance scan ruleset properties. */
  properties?: AzureSqlDatabaseManagedInstanceScanRulesetProperties;
  kind: "AzureSqlDatabaseManagedInstance";
}

/** Azure SQL data warehouse system scan ruleset. */
export interface AzureSqlDataWarehouseSystemScanRuleset extends SystemScanRulesetParent {
  /** Azure SQL data warehouse scan ruleset properties. */
  properties?: AzureSqlDataWarehouseScanRulesetProperties;
  kind: "AzureSqlDataWarehouse";
}

/** Azure MySQL system scan ruleset. */
export interface AzureMySqlSystemScanRuleset extends SystemScanRulesetParent {
  /** Azure MySQL scan ruleset properties. */
  properties?: AzureMySqlScanRulesetProperties;
  kind: "AzureMySql";
}

/** Azure Storage system scan ruleset. */
export interface AzureStorageSystemScanRuleset extends SystemScanRulesetParent {
  /** Azure Storage scan ruleset properties. */
  properties?: AzureStorageScanRulesetProperties;
  kind: "AzureStorage";
}

/** Teradata system scan ruleset. */
export interface TeradataSystemScanRuleset extends SystemScanRulesetParent {
  /** Teradata scan ruleset properties. */
  properties?: TeradataScanRulesetProperties;
  kind: "Teradata";
}

/** Oracle system scan ruleset. */
export interface OracleSystemScanRuleset extends SystemScanRulesetParent {
  /** Oracle scan rule set properties. */
  properties?: OracleScanRulesetProperties;
  kind: "Oracle";
}

/** SAP S/4HANA system scan ruleset. */
export interface SapS4HanaSystemScanRuleset extends SystemScanRulesetParent {
  /** SAP S/4HANA scan ruleset properties. */
  properties?: SapS4HanaScanRulesetProperties;
  kind: "SapS4Hana";
}

/** SAP ECC system scan ruleset. */
export interface SapEccSystemScanRuleset extends SystemScanRulesetParent {
  /** SAP ECC scan ruleset properties. */
  properties?: SapEccScanRulesetProperties;
  kind: "SapEcc";
}

/** Power BI system scan ruleset. */
export interface PowerBISystemScanRuleset extends SystemScanRulesetParent {
  /** Power BI scan ruleset properties. */
  properties?: PowerBIScanRulesetProperties;
  kind: "PowerBI";
}

/** The classification rule. */
export type ClassificationRule = SystemClassificationRule | CustomClassificationRule;
/** The credential. */
export type Credential =
  | AccountKeyAuthAzureKeyVaultCredential
  | BasicAuthAzureKeyVaultCredential
  | RoleARNCredential
  | ServicePrincipalAzureKeyVaultCredential
  | SqlAuthAzureKeyVaultCredential
  | ConsumerKeyAuthAzureKeyVaultCredential
  | DelegatedAuthAzureKeyVaultCredential
  | ManagedIdentityAzureKeyVaultCredential;
/** The data source. */
export type DataSource =
  | AzureSubscriptionDataSource
  | AzureResourceGroupDataSource
  | AzureSynapseWorkspaceDataSource
  | AzureSynapseDataSource
  | AdlsGen1DataSource
  | AdlsGen2DataSource
  | AmazonAccountDataSource
  | AmazonS3DataSource
  | AmazonSqlDataSource
  | AzureCosmosDbDataSource
  | AzureDataExplorerDataSource
  | AzureFileServiceDataSource
  | AzureSqlDatabaseDataSource
  | AmazonPostgreSqlDataSource
  | AzurePostgreSqlDataSource
  | SqlServerDatabaseDataSource
  | AzureSqlDatabaseManagedInstanceDataSource
  | AzureSqlDataWarehouseDataSource
  | AzureMySqlDataSource
  | AzureStorageDataSource
  | TeradataDataSource
  | OracleDataSource
  | SapS4HanaDataSource
  | SapEccDataSource
  | PowerBIDataSource;
/** The scan. */
export type Scan =
  | AzureSubscriptionCredentialScan
  | AzureSubscriptionMsiScan
  | AzureResourceGroupCredentialScan
  | AzureResourceGroupMsiScan
  | AzureSynapseWorkspaceCredentialScan
  | AzureSynapseWorkspaceMsiScan
  | AzureSynapseCredentialScan
  | AzureSynapseMsiScan
  | AdlsGen1CredentialScan
  | AdlsGen1MsiScan
  | AdlsGen2CredentialScan
  | AdlsGen2MsiScan
  | AmazonAccountCredentialScan
  | AmazonS3CredentialScan
  | AmazonS3RoleARNScan
  | AmazonSqlCredentialScan
  | AzureCosmosDbCredentialScan
  | AzureDataExplorerCredentialScan
  | AzureDataExplorerMsiScan
  | AzureFileServiceCredentialScan
  | AzureSqlDatabaseCredentialScan
  | AzureSqlDatabaseMsiScan
  | AmazonPostgreSqlCredentialScan
  | AzurePostgreSqlCredentialScan
  | SqlServerDatabaseCredentialScan
  | AzureSqlDatabaseManagedInstanceCredentialScan
  | AzureSqlDatabaseManagedInstanceMsiScan
  | AzureSqlDataWarehouseCredentialScan
  | AzureSqlDataWarehouseMsiScan
  | AzureMySqlCredentialScan
  | AzureStorageCredentialScan
  | AzureStorageMsiScan
  | TeradataCredentialScan
  | TeradataUserPassScan
  | TeradataTeradataUserPassScan
  | OracleCredentialScan
  | OracleUserPassScan
  | SapS4HanaSapS4HanaCredentialScan
  | SapS4HanaSapS4HanaUserPassScan
  | SapEccCredentialScan
  | SapEccUserPassScan
  | PowerBIDelegatedScan
  | PowerBIMsiScan;
/** Purview nested object which serves as a compute resource for activities. */
export type IntegrationRuntime = ManagedIntegrationRuntime | SelfHostedIntegrationRuntime;
/** Integration runtime status. */
export type IntegrationRuntimeStatus =
  | SelfHostedIntegrationRuntimeStatus
  | ManagedIntegrationRuntimeStatus;
/** The scan ruleset. */
export type ScanRuleset =
  | AzureSubscriptionScanRuleset
  | AzureResourceGroupScanRuleset
  | AzureSynapseWorkspaceScanRuleset
  | AzureSynapseScanRuleset
  | AdlsGen1ScanRuleset
  | AdlsGen2ScanRuleset
  | AmazonAccountScanRuleset
  | AmazonS3ScanRuleset
  | AmazonSqlScanRuleset
  | AzureCosmosDbScanRuleset
  | AzureDataExplorerScanRuleset
  | AzureFileServiceScanRuleset
  | AzureSqlDatabaseScanRuleset
  | AmazonPostgreSqlScanRuleset
  | AzurePostgreSqlScanRuleset
  | SqlServerDatabaseScanRuleset
  | AzureSqlDatabaseManagedInstanceScanRuleset
  | AzureSqlDataWarehouseScanRuleset
  | AzureMySqlScanRuleset
  | AzureStorageScanRuleset
  | TeradataScanRuleset
  | OracleScanRuleset
  | SapS4HanaScanRuleset
  | SapEccScanRuleset
  | PowerBIScanRuleset;
/** The system scan ruleset. */
export type SystemScanRuleset =
  | AzureSubscriptionSystemScanRuleset
  | AzureResourceGroupSystemScanRuleset
  | AzureSynapseWorkspaceSystemScanRuleset
  | AzureSynapseSystemScanRuleset
  | AdlsGen1SystemScanRuleset
  | AdlsGen2SystemScanRuleset
  | AmazonAccountSystemScanRuleset
  | AmazonS3SystemScanRuleset
  | AmazonSqlSystemScanRuleset
  | AzureCosmosDbSystemScanRuleset
  | AzureDataExplorerSystemScanRuleset
  | AzureFileServiceSystemScanRuleset
  | AzureSqlDatabaseSystemScanRuleset
  | AmazonPostgreSqlSystemScanRuleset
  | AzurePostgreSqlSystemScanRuleset
  | SqlServerDatabaseSystemScanRuleset
  | AzureSqlDatabaseManagedInstanceSystemScanRuleset
  | AzureSqlDataWarehouseSystemScanRuleset
  | AzureMySqlSystemScanRuleset
  | AzureStorageSystemScanRuleset
  | TeradataSystemScanRuleset
  | OracleSystemScanRuleset
  | SapS4HanaSystemScanRuleset
  | SapEccSystemScanRuleset
  | PowerBISystemScanRuleset;
/** Pattern of classification rule. */
export type ClassificationRulePattern = RegexClassificationRulePattern;
