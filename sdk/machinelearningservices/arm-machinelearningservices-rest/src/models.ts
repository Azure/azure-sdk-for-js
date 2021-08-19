// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface OperationListResult {
  /** List of AML workspace operations supported by the AML workspace resource provider. */
  value?: Array<Operation>;
}

export interface Operation {
  /** Operation name: {provider}/{resource}/{operation} */
  name?: string;
  /** Display name of operation */
  display?: OperationDisplay;
}

export interface OperationDisplay {
  /** The resource provider name: Microsoft.MachineLearningExperimentation */
  provider?: string;
  /** The resource on which the operation is performed. */
  resource?: string;
  /** The operation that users can perform. */
  operation?: string;
  /** The description for the operation. */
  description?: string;
}

export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export interface ErrorDetail {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
  /** The error target. */
  target?: string;
  /** The error details. */
  details?: Array<ErrorDetail>;
  /** The error additional info. */
  additionalInfo?: Array<ErrorAdditionalInfo>;
}

export interface ErrorAdditionalInfo {
  /** The additional info type. */
  type?: string;
  /** The additional info. */
  info?: Record<string, unknown>;
}

export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  id?: string;
  /** The name of the resource */
  name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  type?: string;
}

export interface Workspace extends Resource {
  /** The properties of the machine learning workspace. */
  properties?: WorkspaceProperties;
  /** The identity of the resource. */
  identity?: Identity;
  /** Specifies the location of the resource. */
  location?: string;
  /** Contains resource tags defined as key/value pairs. */
  tags?: Record<string, string>;
  /** The sku of the workspace. */
  sku?: Sku;
  /** Metadata pertaining to creation and last modification of the resource. */
  systemData?: SystemData;
}

export interface WorkspaceProperties {
  /** The immutable id associated with this workspace. */
  workspaceId?: string;
  /** The description of this workspace. */
  description?: string;
  /** The friendly name for this workspace. This name in mutable */
  friendlyName?: string;
  /** ARM id of the key vault associated with this workspace. This cannot be changed once the workspace has been created */
  keyVault?: string;
  /** ARM id of the application insights associated with this workspace. This cannot be changed once the workspace has been created */
  applicationInsights?: string;
  /** ARM id of the container registry associated with this workspace. This cannot be changed once the workspace has been created */
  containerRegistry?: string;
  /** ARM id of the storage account associated with this workspace. This cannot be changed once the workspace has been created */
  storageAccount?: string;
  /** Url for the discovery service to identify regional endpoints for machine learning experimentation services */
  discoveryUrl?: string;
  /** The current deployment state of workspace resource. The provisioningState is to indicate states for resource provisioning. */
  provisioningState?:
    | "Unknown"
    | "Updating"
    | "Creating"
    | "Deleting"
    | "Succeeded"
    | "Failed"
    | "Canceled";
  /** The encryption settings of Azure ML workspace. */
  encryption?: EncryptionProperty;
  /** The flag to signal HBI data in the workspace and reduce diagnostic data collected by the service */
  hbiWorkspace?: boolean;
  /** The name of the managed resource group created by workspace RP in customer subscription if the workspace is CMK workspace */
  serviceProvisionedResourceGroup?: string;
  /** Count of private connections in the workspace */
  privateLinkCount?: number;
  /** The compute name for image build */
  imageBuildCompute?: string;
  /** The flag to indicate whether to allow public access when behind VNet. */
  allowPublicAccessWhenBehindVnet?: boolean;
  /** The list of private endpoint connections in the workspace. */
  privateEndpointConnections?: Array<PrivateEndpointConnection>;
  /** The list of shared private link resources in this workspace. */
  sharedPrivateLinkResources?: Array<SharedPrivateLinkResource>;
  /** The notebook info of Azure ML workspace. */
  notebookInfo?: NotebookResourceInfo;
  /** The service managed resource settings. */
  serviceManagedResourcesSettings?: ServiceManagedResourcesSettings;
  /** The user assigned identity resource id that represents the workspace identity. */
  primaryUserAssignedIdentity?: string;
  /** The tenant id associated with this workspace. */
  tenantId?: string;
}

export interface EncryptionProperty {
  /** Indicates whether or not the encryption is enabled for the workspace. */
  status: "Enabled" | "Disabled";
  /** The identity that will be used to access the key vault for encryption at rest. */
  identity?: IdentityForCmk;
  /** Customer Key vault properties. */
  keyVaultProperties: KeyVaultProperties;
}

export interface IdentityForCmk {
  /** The ArmId of the user assigned identity that will be used to access the customer managed key vault */
  userAssignedIdentity?: string;
}

export interface KeyVaultProperties {
  /** The ArmId of the keyVault where the customer owned encryption key is present. */
  keyVaultArmId: string;
  /** Key vault uri to access the encryption key. */
  keyIdentifier: string;
  /** For future use - The client id of the identity which will be used to access key vault. */
  identityClientId?: string;
}

export interface PrivateEndpointConnection extends Resource {
  /** Resource properties. */
  properties?: PrivateEndpointConnectionProperties;
  /** The identity of the resource. */
  identity?: Identity;
  /** Specifies the location of the resource. */
  location?: string;
  /** Contains resource tags defined as key/value pairs. */
  tags?: Record<string, string>;
  /** The sku of the workspace. */
  sku?: Sku;
  /** Metadata pertaining to creation and last modification of the resource. */
  systemData?: SystemData;
}

export interface PrivateEndpointConnectionProperties {
  /** The resource of private end point. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  provisioningState?: "Succeeded" | "Creating" | "Deleting" | "Failed";
}

export interface PrivateEndpoint {
  /** The ARM identifier for Private Endpoint */
  id?: string;
  /** The ARM identifier for Subnet resource that private endpoint links to */
  subnetArmId?: string;
}

export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: "Pending" | "Approved" | "Rejected" | "Disconnected" | "Timeout";
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

export interface Identity {
  /** The principal ID of resource identity. */
  principalId?: string;
  /** The tenant ID of resource. */
  tenantId?: string;
  /** The identity type. */
  type?:
    | "SystemAssigned"
    | "SystemAssigned,UserAssigned"
    | "UserAssigned"
    | "None";
  /** The user assigned identities associated with the resource. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export interface UserAssignedIdentity {
  /** The principal ID of the user assigned identity. */
  principalId?: string;
  /** The tenant ID of the user assigned identity. */
  tenantId?: string;
  /** The clientId(aka appId) of the user assigned identity. */
  clientId?: string;
}

export interface Sku {
  /** Name of the sku */
  name?: string;
  /** Tier of the sku like Basic or Enterprise */
  tier?: string;
}

export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: "User" | "Application" | "ManagedIdentity" | "Key";
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: "User" | "Application" | "ManagedIdentity" | "Key";
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export interface SharedPrivateLinkResource {
  /** Unique name of the private link. */
  name?: string;
  /** Resource properties. */
  properties?: SharedPrivateLinkResourceProperty;
}

export interface SharedPrivateLinkResourceProperty {
  /** The resource id that private link links to. */
  privateLinkResourceId?: string;
  /** The private link resource group id. */
  groupId?: string;
  /** Request message. */
  requestMessage?: string;
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: "Pending" | "Approved" | "Rejected" | "Disconnected" | "Timeout";
}

export interface NotebookResourceInfo {
  fqdn?: string;
  /** the data plane resourceId that used to initialize notebook component */
  resourceId?: string;
  /** The error that occurs when preparing notebook. */
  notebookPreparationError?: NotebookPreparationError;
}

export interface NotebookPreparationError {
  errorMessage?: string;
  statusCode?: number;
}

export interface ServiceManagedResourcesSettings {
  /** The settings for the service managed cosmosdb account. */
  cosmosDb?: CosmosDbSettings;
}

export interface CosmosDbSettings {
  /** The throughput of the collections in cosmosdb database */
  collectionsThroughput?: number;
}

export interface WorkspaceUpdateParameters {
  /** The resource tags for the machine learning workspace. */
  tags?: Record<string, string>;
  /** The sku of the workspace. */
  sku?: Sku;
  /** The identity of the resource. */
  identity?: Identity;
  /** The properties that the machine learning workspace will be updated with. */
  properties?: WorkspacePropertiesUpdateParameters;
}

export interface WorkspacePropertiesUpdateParameters {
  /** The description of this workspace. */
  description?: string;
  /** The friendly name for this workspace. */
  friendlyName?: string;
  /** The compute name for image build */
  imageBuildCompute?: string;
  /** The service managed resource settings. */
  serviceManagedResourcesSettings?: ServiceManagedResourcesSettings;
  /** The user assigned identity resource id that represents the workspace identity. */
  primaryUserAssignedIdentity?: string;
}

export interface WorkspaceListResult {
  /** The list of machine learning workspaces. Since this list may be incomplete, the nextLink field should be used to request the next list of machine learning workspaces. */
  value?: Array<Workspace>;
  /** The URI that can be used to request the next list of machine learning workspaces. */
  nextLink?: string;
}

export interface ListWorkspaceKeysResult {
  userStorageKey?: string;
  userStorageResourceId?: string;
  appInsightsInstrumentationKey?: string;
  containerRegistryCredentials?: RegistryListCredentialsResult;
  notebookAccessKeys?: ListNotebookKeysResult;
}

export interface RegistryListCredentialsResult {
  location?: string;
  username?: string;
  passwords?: Array<Password>;
}

export interface Password {
  name?: string;
  value?: string;
}

export interface ListNotebookKeysResult {
  primaryAccessKey?: string;
  secondaryAccessKey?: string;
}

export interface ListUsagesResult {
  /** The list of AML resource usages. */
  value?: Array<Usage>;
  /** The URI to fetch the next page of AML resource usage information. Call ListNext() with this to fetch the next page of AML resource usage information. */
  nextLink?: string;
}

export interface Usage {
  /** Specifies the resource ID. */
  id?: string;
  /** Region of the AML workspace in the id. */
  amlWorkspaceLocation?: string;
  /** Specifies the resource type. */
  type?: string;
  /** An enum describing the unit of usage measurement. */
  unit?: "Count";
  /** The current usage of the resource. */
  currentValue?: number;
  /** The maximum permitted usage of the resource. */
  limit?: number;
  /** The name of the type of usage. */
  name?: UsageName;
}

export interface UsageName {
  /** The name of the resource. */
  value?: string;
  /** The localized name of the resource. */
  localizedValue?: string;
}

export interface VirtualMachineSizeListResult {
  /** The list of virtual machine sizes supported by AmlCompute. */
  value?: Array<VirtualMachineSize>;
}

export interface VirtualMachineSize {
  /** The name of the virtual machine size. */
  name?: string;
  /** The family name of the virtual machine size. */
  family?: string;
  /** The number of vCPUs supported by the virtual machine size. */
  vCPUs?: number;
  /** The number of gPUs supported by the virtual machine size. */
  gpus?: number;
  /** The OS VHD disk size, in MB, allowed by the virtual machine size. */
  osVhdSizeMB?: number;
  /** The resource volume size, in MB, allowed by the virtual machine size. */
  maxResourceVolumeMB?: number;
  /** The amount of memory, in GB, supported by the virtual machine size. */
  memoryGB?: number;
  /** Specifies if the virtual machine size supports low priority VMs. */
  lowPriorityCapable?: boolean;
  /** Specifies if the virtual machine size supports premium IO. */
  premiumIO?: boolean;
  /** The estimated price information for using a VM. */
  estimatedVMPrices?: EstimatedVMPrices;
}

export interface EstimatedVMPrices {
  /** Three lettered code specifying the currency of the VM price. Example: USD */
  billingCurrency: "USD";
  /** The unit of time measurement for the specified VM price. Example: OneHour */
  unitOfMeasure: "OneHour";
  /** The list of estimated prices for using a VM of a particular OS type, tier, etc. */
  values: Array<EstimatedVMPrice>;
}

export interface EstimatedVMPrice {
  /** The price charged for using the VM. */
  retailPrice: number;
  /** Operating system type used by the VM. */
  osType: "Linux" | "Windows";
  /** The type of the VM. */
  vmTier: "Standard" | "LowPriority" | "Spot";
}

export interface QuotaUpdateParameters {
  /** The list for update quota. */
  value?: Array<QuotaBaseProperties>;
  /** Region of workspace quota to be updated. */
  location?: string;
}

export interface QuotaBaseProperties {
  /** Specifies the resource ID. */
  id?: string;
  /** Specifies the resource type. */
  type?: string;
  /** The maximum permitted quota of the resource. */
  limit?: number;
  /** An enum describing the unit of quota measurement. */
  unit?: "Count";
}

export interface UpdateWorkspaceQuotasResult {
  /** The list of workspace quota update result. */
  value?: Array<UpdateWorkspaceQuotas>;
  /** The URI to fetch the next page of workspace quota update result. Call ListNext() with this to fetch the next page of Workspace Quota update result. */
  nextLink?: string;
}

export interface UpdateWorkspaceQuotas {
  /** Specifies the resource ID. */
  id?: string;
  /** Specifies the resource type. */
  type?: string;
  /** The maximum permitted quota of the resource. */
  limit?: number;
  /** An enum describing the unit of quota measurement. */
  unit?: "Count";
  /** Status of update workspace quota. */
  status?:
    | "Undefined"
    | "Success"
    | "Failure"
    | "InvalidQuotaBelowClusterMinimum"
    | "InvalidQuotaExceedsSubscriptionLimit"
    | "InvalidVMFamilyName"
    | "OperationNotSupportedForSku"
    | "OperationNotEnabledForRegion";
}

export interface ListWorkspaceQuotas {
  /** The list of Workspace Quotas by VM Family */
  value?: Array<ResourceQuota>;
  /** The URI to fetch the next page of workspace quota information by VM Family. Call ListNext() with this to fetch the next page of Workspace Quota information. */
  nextLink?: string;
}

export interface ResourceQuota {
  /** Specifies the resource ID. */
  id?: string;
  /** Region of the AML workspace in the id. */
  amlWorkspaceLocation?: string;
  /** Specifies the resource type. */
  type?: string;
  /** Name of the resource. */
  name?: ResourceName;
  /** The maximum permitted quota of the resource. */
  limit?: number;
  /** An enum describing the unit of quota measurement. */
  unit?: "Count";
}

export interface ResourceName {
  /** The name of the resource. */
  value?: string;
  /** The localized name of the resource. */
  localizedValue?: string;
}

export interface PaginatedComputeResourcesList {
  /** An array of Machine Learning compute objects wrapped in ARM resource envelope. */
  value?: Array<ComputeResource>;
  /** A continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface Components1D3SwueSchemasComputeresourceAllof1 {
  /** Compute properties */
  properties?: Compute;
}

export interface ComputeBase {
  /** Location for the underlying compute */
  computeLocation?: string;
  /** The provision state of the cluster. Valid values are Unknown, Updating, Provisioning, Succeeded, and Failed. */
  provisioningState?:
    | "Unknown"
    | "Updating"
    | "Creating"
    | "Deleting"
    | "Succeeded"
    | "Failed"
    | "Canceled";
  /** The description of the Machine Learning compute. */
  description?: string;
  /** The time at which the compute was created. */
  createdOn?: Date;
  /** The time at which the compute was last modified. */
  modifiedOn?: Date;
  /** ARM resource id of the underlying compute */
  resourceId?: string;
  /** Errors during provisioning */
  provisioningErrors?: Array<ErrorResponse>;
  /** Indicating whether the compute was provisioned by user and brought from outside if true, or machine learning service provisioned it if false. */
  isAttachedCompute?: boolean;
  /** Opt-out of local authentication and ensure customers can use only MSI and AAD exclusively for authentication. */
  disableLocalAuth?: boolean;
  computeType:
    | "AKS"
    | "AmlCompute"
    | "ComputeInstance"
    | "VirtualMachine"
    | "HDInsight"
    | "DataFactory"
    | "Databricks"
    | "DataLakeAnalytics"
    | "SynapseSpark";
}

export interface ComputeResource
  extends Resource,
    Components1D3SwueSchemasComputeresourceAllof1 {
  /** The identity of the resource. */
  identity?: Identity;
  /** Specifies the location of the resource. */
  location?: string;
  /** Contains resource tags defined as key/value pairs. */
  tags?: Record<string, string>;
  /** The sku of the workspace. */
  sku?: Sku;
  /** Metadata pertaining to creation and last modification of the resource. */
  systemData?: SystemData;
}

export interface ClusterUpdateParameters {
  /** The properties of the amlCompute. */
  properties?: ClusterUpdateProperties;
}

export interface ClusterUpdateProperties {
  /** Desired scale settings for the amlCompute. */
  scaleSettings?: ScaleSettings;
}

export interface ScaleSettings {
  /** Max number of nodes to use */
  maxNodeCount: number;
  /** Min number of nodes to use */
  minNodeCount?: number;
  /** Node Idle Time before scaling down amlCompute. This string needs to be in the RFC Format. */
  nodeIdleTimeBeforeScaleDown?: string;
}

export interface ComputeNodesInformationBase {
  /** The continuation token. */
  nextLink?: string;
  computeType: "AmlCompute";
}

export interface AmlComputeNodesInformation
  extends ComputeNodesInformationBase {
  /** The collection of returned AmlCompute nodes details. */
  nodes?: Array<AmlComputeNodeInformation>;
  computeType: "AmlCompute";
}

export interface AmlComputeNodeInformation {
  /** ID of the compute node. */
  nodeId?: string;
  /** Private IP address of the compute node. */
  privateIpAddress?: string;
  /** Public IP address of the compute node. */
  publicIpAddress?: string;
  /** SSH port number of the node. */
  port?: number;
  /** State of the compute node. Values are idle, running, preparing, unusable, leaving and preempted. */
  nodeState?:
    | "idle"
    | "running"
    | "preparing"
    | "unusable"
    | "leaving"
    | "preempted";
  /** ID of the Experiment running on the node, if any else null. */
  runId?: string;
}

export interface NotebookAccessTokenResult {
  notebookResourceId?: string;
  hostName?: string;
  publicDns?: string;
  accessToken?: string;
  tokenType?: string;
  expiresIn?: number;
  refreshToken?: string;
  scope?: string;
}

export interface ComputeSecretsBase {
  computeType: "AKS" | "VirtualMachine" | "Databricks";
}

export interface ComputeSchedules {
  /** The list of compute start stop schedules to be applied. */
  computeStartStop?: Array<ComputeStartStopSchedule>;
}

export interface ComputeStartStopSchedule {
  /** Schedule id. */
  id?: string;
  /** The current deployment state of schedule. */
  provisioningStatus?: "Completed" | "Provisioning" | "Failed";
  /** The schedule status. */
  status?: "Enabled" | "Disabled";
  /** The schedule trigger type. */
  triggerType?: "Recurrence" | "Cron";
  /** The compute power action. */
  action?: "Start" | "Stop";
  /** The workflow trigger recurrence for ComputeStartStop schedule type. */
  recurrence?: Recurrence;
  /** The workflow trigger cron for ComputeStartStop schedule type. */
  cron?: Cron;
}

export interface Recurrence {
  /** The recurrence frequency. */
  frequency?:
    | "NotSpecified"
    | "Second"
    | "Minute"
    | "Hour"
    | "Day"
    | "Week"
    | "Month"
    | "Year";
  /** The interval. */
  interval?: number;
  /** The start time. */
  startTime?: string;
  /** The time zone. */
  timeZone?: string;
  /** The recurrence schedule */
  schedule?: RecurrenceSchedule;
}

export interface RecurrenceSchedule {
  /** The minutes. */
  minutes?: Array<number>;
  /** The hours. */
  hours?: Array<number>;
  /** The days of the week. */
  weekDays?: Array<
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
  >;
}

export interface Cron {
  /** The start time. */
  startTime?: string;
  /** The time zone. */
  timeZone?: string;
  /** The cron expression. */
  expression?: string;
}

export interface PrivateEndpointConnectionListResult {
  /** Array of private endpoint connections */
  value?: Array<PrivateEndpointConnection>;
}

export interface PrivateLinkResourceListResult {
  /** Array of private link resources */
  value?: Array<PrivateLinkResource>;
}

export interface PrivateLinkResource extends Resource {
  /** Resource properties. */
  properties?: PrivateLinkResourceProperties;
  /** The identity of the resource. */
  identity?: Identity;
  /** Specifies the location of the resource. */
  location?: string;
  /** Contains resource tags defined as key/value pairs. */
  tags?: Record<string, string>;
  /** The sku of the workspace. */
  sku?: Sku;
  /** Metadata pertaining to creation and last modification of the resource. */
  systemData?: SystemData;
}

export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  groupId?: string;
  /** The private link resource required member names. */
  requiredMembers?: Array<string>;
  /** The private link resource Private link DNS zone name. */
  requiredZoneNames?: Array<string>;
}

export interface ListStorageAccountKeysResult {
  userStorageKey?: string;
}

export interface PaginatedWorkspaceConnectionsList {
  /** An array of Workspace connection objects. */
  value?: Array<WorkspaceConnection>;
  /** A continuation link (absolute URI) to the next page of results in the list. */
  nextLink?: string;
}

export interface WorkspaceConnection {
  /** ResourceId of the workspace connection. */
  id?: string;
  /** Friendly name of the workspace connection. */
  name?: string;
  /** Resource type of workspace connection. */
  type?: string;
  /** Properties of workspace connection. */
  properties?: WorkspaceConnectionProps;
}

export interface WorkspaceConnectionProps {
  /** Category of the workspace connection. */
  category?: string;
  /** Target of the workspace connection. */
  target?: string;
  /** Authorization type of the workspace connection. */
  authType?: string;
  /** Value details of the workspace connection. */
  value?: string;
  /** format for the workspace connection value */
  valueFormat?: "JSON";
}

export interface BatchEndpointTrackedResourceArmPaginatedResult {
  /** The link to the next page of BatchEndpoint objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type BatchEndpoint. */
  value?: Array<BatchEndpointTrackedResource>;
}

export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export interface BatchEndpointTrackedResource extends TrackedResource {
  /** Service identity associated with a resource. */
  identity?: ResourceIdentity;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. */
  kind?: string;
  /** Additional attributes of the entity. */
  properties: BatchEndpoint;
  /** System data associated with resource provider */
  systemData?: SystemData;
}

export interface ResourceIdentity {
  /** Client ID that is used when authenticating. */
  principalId?: string;
  /** AAD Tenant where this identity lives. */
  tenantId?: string;
  /** Defines values for a ResourceIdentity's type. */
  type?:
    | "SystemAssigned"
    | "UserAssigned"
    | "SystemAssigned,UserAssigned"
    | "None";
  /** Dictionary of the user assigned identities, key is ARM resource ID of the UAI. */
  userAssignedIdentities?: Record<string, UserAssignedIdentityMeta>;
}

export interface UserAssignedIdentityMeta {
  /** Aka application ID, a unique identifier generated by Azure AD that is tied to an application and service principal during its initial provisioning. */
  clientId?: string;
  /** The object ID of the service principal object for your managed identity that is used to grant role-based access to an Azure resource. */
  principalId?: string;
}

export interface BatchEndpoint {
  /** Enum to determine endpoint authentication mode. */
  authMode?: "AMLToken" | "Key" | "AADToken";
  /** Description of the inference endpoint. */
  description?: string;
  /**
   * EndpointAuthKeys to set initially on an Endpoint.
   * This property will always be returned as null. AuthKey values must be retrieved using the ListKeys API.
   */
  keys?: EndpointAuthKeys;
  /** Property dictionary. Properties can be added, but not removed or altered. */
  properties?: Record<string, string>;
  /** Endpoint URI. */
  scoringUri?: string;
  /** Endpoint Swagger URI. */
  swaggerUri?: string;
  /** Traffic rules on how the traffic will be routed across deployments. */
  traffic?: Record<string, number>;
}

export interface EndpointAuthKeys {
  /** The primary key. */
  primaryKey?: string;
  /** The secondary key. */
  secondaryKey?: string;
}

export interface PartialBatchEndpointPartialTrackedResource {
  /** Service identity associated with a resource. */
  identity?: ResourceIdentity;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. */
  kind?: string;
  /** The geo-location where the resource lives. */
  location?: string;
  /** Additional attributes of the entity. */
  properties?: PartialBatchEndpoint;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export interface PartialBatchEndpoint {
  /** Traffic rules on how the traffic will be routed across deployments. */
  traffic?: Record<string, number>;
}

export interface BatchDeploymentTrackedResourceArmPaginatedResult {
  /** The link to the next page of BatchDeployment objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type BatchDeployment. */
  value?: Array<BatchDeploymentTrackedResource>;
}

export interface BatchDeploymentTrackedResource extends TrackedResource {
  /** Service identity associated with a resource. */
  identity?: ResourceIdentity;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. */
  kind?: string;
  /** Additional attributes of the entity. */
  properties: BatchDeployment;
  /** System data associated with resource provider */
  systemData?: SystemData;
}

export interface BatchDeployment {
  /** Code configuration for the endpoint deployment. */
  codeConfiguration?: CodeConfiguration;
  /** Configuration for compute binding. */
  compute?: ComputeConfiguration;
  /** Description of the endpoint deployment. */
  description?: string;
  /** ARM resource ID of the environment specification for the endpoint deployment. */
  environmentId?: string;
  /** Environment variables configuration for the deployment. */
  environmentVariables?: Record<string, string>;
  /**
   * Error threshold, if the error count for the entire input goes above this value,
   * the batch inference will be aborted. Range is [-1, int.MaxValue].
   * For FileDataset, this value is the count of file failures.
   * For TabularDataset, this value is the count of record failures.
   * If set to -1 (the lower bound), all failures during batch inference will be ignored.
   */
  errorThreshold?: number;
  /** Logging level for batch inference operation. */
  loggingLevel?: "Info" | "Warning" | "Debug";
  /**
   * Size of the mini-batch passed to each batch invocation.
   * For FileDataset, this is the number of files per mini-batch.
   * For TabularDataset, this is the size of the records in bytes, per mini-batch.
   */
  miniBatchSize?: number;
  /** Reference to the model asset for the endpoint deployment. */
  model?: AssetReferenceBase;
  /** Output configuration for the batch inference operation. */
  outputConfiguration?: BatchOutputConfiguration;
  /** Partition keys list used for Named partitioning. */
  partitionKeys?: Array<string>;
  /** Property dictionary. Properties can be added, but not removed or altered. */
  properties?: Record<string, string>;
  /** Retry Settings for the batch inference operation. */
  retrySettings?: BatchRetrySettings;
}

export interface CodeConfiguration {
  /** ARM resource ID of the code asset. */
  codeId?: string;
  /** The script to execute on startup. eg. "score.py" */
  scoringScript: string;
}

export interface ComputeConfiguration {
  /** Number of instances or nodes. */
  instanceCount?: number;
  /** SKU type to run on. */
  instanceType?: string;
  /** Set to true for jobs running on local compute. */
  isLocal?: boolean;
  /** Location for virtual cluster run. */
  location?: string;
  /** Additional properties. */
  properties?: Record<string, string>;
  /** ARM resource ID of the compute resource. */
  target?: string;
}

export interface AssetReferenceBaseBase {
  referenceType: "DataPath" | "Id" | "OutputPath";
}

export interface BatchOutputConfiguration {
  /** Customized output file name for append_row output action. */
  appendRowFileName?: string;
  /** Indicates how the output will be organized. */
  outputAction?: "SummaryOnly" | "AppendRow";
}

export interface BatchRetrySettings {
  /** Maximum retry count for a mini-batch */
  maxRetries?: number;
  /** Invocation timeout for a mini-batch, in ISO 8601 format. */
  timeout?: string;
}

export interface PartialBatchDeploymentPartialTrackedResource {
  /** Service identity associated with a resource. */
  identity?: ResourceIdentity;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. */
  kind?: string;
  /** The geo-location where the resource lives. */
  location?: string;
  /** Additional attributes of the entity. */
  properties?: PartialBatchDeployment;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export interface PartialBatchDeployment {
  /** Description of the endpoint deployment. */
  description?: string;
}

export interface CodeContainerResourceArmPaginatedResult {
  /** The link to the next page of CodeContainer objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type CodeContainer. */
  value?: Array<CodeContainerResource>;
}

export interface CodeContainerResource extends Resource {
  /** Additional attributes of the entity. */
  properties: CodeContainer;
  /** System data associated with resource provider */
  systemData?: SystemData;
}

export interface CodeContainer {
  /** The asset description text. */
  description?: string;
  /** The asset property dictionary. */
  properties?: Record<string, string>;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export interface CodeVersionResourceArmPaginatedResult {
  /** The link to the next page of CodeVersion objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type CodeVersion. */
  value?: Array<CodeVersionResource>;
}

export interface CodeVersionResource extends Resource {
  /** Additional attributes of the entity. */
  properties: CodeVersion;
  /** System data associated with resource provider */
  systemData?: SystemData;
}

export interface CodeVersion {
  /** ARM resource ID of the datastore where the asset is located. */
  datastoreId?: string;
  /** The asset description text. */
  description?: string;
  /** If the name version are system generated (anonymous registration). */
  isAnonymous?: boolean;
  /** The path of the file/directory in the datastore. */
  path: string;
  /** The asset property dictionary. */
  properties?: Record<string, string>;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export interface DataContainerResourceArmPaginatedResult {
  /** The link to the next page of DataContainer objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type DataContainer. */
  value?: Array<DataContainerResource>;
}

export interface DataContainerResource extends Resource {
  /** Additional attributes of the entity. */
  properties: DataContainer;
  /** System data associated with resource provider */
  systemData?: SystemData;
}

export interface DataContainer {
  /** The asset description text. */
  description?: string;
  /** The asset property dictionary. */
  properties?: Record<string, string>;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export interface DataVersionResourceArmPaginatedResult {
  /** The link to the next page of DataVersion objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type DataVersion. */
  value?: Array<DataVersionResource>;
}

export interface DataVersionResource extends Resource {
  /** Additional attributes of the entity. */
  properties: DataVersion;
  /** System data associated with resource provider */
  systemData?: SystemData;
}

export interface DataVersion {
  /** The Format of dataset. */
  datasetType?: "Simple" | "Dataflow";
  /** ARM resource ID of the datastore where the asset is located. */
  datastoreId?: string;
  /** The asset description text. */
  description?: string;
  /** If the name version are system generated (anonymous registration). */
  isAnonymous?: boolean;
  /** The path of the file/directory in the datastore. */
  path: string;
  /** The asset property dictionary. */
  properties?: Record<string, string>;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export interface DatastorePropertiesResourceArmPaginatedResult {
  /** The link to the next page of DatastoreProperties objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type DatastoreProperties. */
  value?: Array<DatastorePropertiesResource>;
}

export interface DatastorePropertiesResource extends Resource {
  /** Additional attributes of the entity. */
  properties: DatastoreProperties;
  /** System data associated with resource provider */
  systemData?: SystemData;
}

export interface DatastoreProperties {
  /** Reference to the datastore storage contents. */
  contents: DatastoreContents;
  /** The asset description text. */
  description?: string;
  /** Whether the service has validated access to the datastore with the provided credentials. */
  hasBeenValidated?: boolean;
  /** Whether this datastore is the default for the workspace. */
  isDefault?: boolean;
  /** Information about the datastore origin, if linked. */
  linkedInfo?: LinkedInfo;
  /** The asset property dictionary. */
  properties?: Record<string, string>;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export interface DatastoreContentsBase {
  contentsType:
    | "AzureBlob"
    | "AzureDataLakeGen1"
    | "AzureDataLakeGen2"
    | "AzureFile"
    | "AzurePostgreSql"
    | "AzureSqlDatabase"
    | "GlusterFs";
}

export interface LinkedInfo {
  /** Linked service ID. */
  linkedId?: string;
  /** Linked service resource name. */
  linkedResourceName?: string;
  /** Type of the linked service. */
  origin?: "Synapse";
}

export interface DatastoreSecretsBase {
  secretsType:
    | "AccountKey"
    | "Certificate"
    | "None"
    | "Sas"
    | "ServicePrincipal"
    | "SqlAdmin";
}

export interface EnvironmentContainerResourceArmPaginatedResult {
  /** The link to the next page of EnvironmentContainer objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type EnvironmentContainer. */
  value?: Array<EnvironmentContainerResource>;
}

export interface EnvironmentContainerResource extends Resource {
  /** Additional attributes of the entity. */
  properties: EnvironmentContainer;
  /** System data associated with resource provider */
  systemData?: SystemData;
}

export interface EnvironmentContainer {
  /** The asset description text. */
  description?: string;
  /** The asset property dictionary. */
  properties?: Record<string, string>;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export interface EnvironmentSpecificationVersionResourceArmPaginatedResult {
  /** The link to the next page of EnvironmentSpecificationVersion objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type EnvironmentSpecificationVersion. */
  value?: Array<EnvironmentSpecificationVersionResource>;
}

export interface EnvironmentSpecificationVersionResource extends Resource {
  /** Additional attributes of the entity. */
  properties: EnvironmentSpecificationVersion;
  /** System data associated with resource provider */
  systemData?: SystemData;
}

export interface EnvironmentSpecificationVersion {
  /**
   * Standard configuration file used by Conda that lets you install any kind of package, including Python, R, and C/C++ packages.
   * <see href="https://repo2docker.readthedocs.io/en/latest/config_files.html#environment-yml-install-a-conda-environment" />
   */
  condaFile?: string;
  /** The asset description text. */
  description?: string;
  /** Configuration settings for Docker. */
  docker?: DockerSpecification;
  /**
   * Environment specification is either user managed or curated by the Azure ML service
   * <see href="https://docs.microsoft.com/en-us/azure/machine-learning/resource-curated-environments" />
   */
  environmentSpecificationType?: "Curated" | "UserCreated";
  /** Defines configuration specific to inference. */
  inferenceContainerProperties?: InferenceContainerProperties;
  /** If the name version are system generated (anonymous registration). */
  isAnonymous?: boolean;
  /** The asset property dictionary. */
  properties?: Record<string, string>;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export interface DockerSpecificationBase {
  /** The platform information of the docker image. */
  platform?: DockerImagePlatform;
  dockerSpecificationType: "Build" | "Image";
}

export interface DockerImagePlatform {
  /** The OS type the Environment. */
  operatingSystemType?: "Linux" | "Windows";
}

export interface InferenceContainerProperties {
  /** The route to check the liveness of the inference server container. */
  livenessRoute?: Route;
  /** The route to check the readiness of the inference server container. */
  readinessRoute?: Route;
  /** The port to send the scoring requests to, within the inference server container. */
  scoringRoute?: Route;
}

export interface Route {
  /** The path for the route. */
  path: string;
  /** The port for the route. */
  port: number;
}

export interface JobBaseResourceArmPaginatedResult {
  /** The link to the next page of JobBase objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type JobBase. */
  value?: Array<JobBaseResource>;
}

export interface JobBaseResource extends Resource {
  /** Additional attributes of the entity. */
  properties: JobBase;
  /** System data associated with resource provider */
  systemData?: SystemData;
}

export interface JobBaseBase {
  /** The asset description text. */
  description?: string;
  /**
   * List of JobEndpoints.
   * For local jobs, a job endpoint will have an endpoint value of FileStreamObject.
   */
  interactionEndpoints?: Record<string, JobEndpoint>;
  /** The asset property dictionary. */
  properties?: Record<string, string>;
  /** Specifies the job provisioning state. */
  provisioningState?: "Succeeded" | "Failed" | "Canceled" | "InProgress";
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
  jobType: "Command" | "Sweep";
}

export interface JobEndpoint {
  /** Url for endpoint. */
  endpoint?: string;
  /** Endpoint type. */
  jobEndpointType?: string;
  /** Port for endpoint. */
  port?: number;
  /** Additional properties to set on the endpoint. */
  properties?: Record<string, string>;
}

export interface LabelingJobResourceArmPaginatedResult {
  /** The link to the next page of LabelingJob objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type LabelingJob. */
  value?: Array<LabelingJobResource>;
}

export interface LabelingJobResource extends Resource {
  /** Additional attributes of the entity. */
  properties: LabelingJob;
  /** System data associated with resource provider */
  systemData?: SystemData;
}

export interface LabelingJob {
  /** Created time of the job in UTC timezone. */
  createdTimeUtc?: Date;
  /** Configuration of dataset used in the job. */
  datasetConfiguration?: LabelingDatasetConfiguration;
  /** The asset description text. */
  description?: string;
  /**
   * List of JobEndpoints.
   * For local jobs, a job endpoint will have an endpoint value of FileStreamObject.
   */
  interactionEndpoints?: Record<string, JobEndpoint>;
  /** Labeling instructions of the job. */
  jobInstructions?: LabelingJobInstructions;
  /** Specifies the type of job. This field should always be set to "Labeling". */
  jobType: "Command" | "Sweep" | "Labeling";
  /** Label categories of the job. */
  labelCategories?: Record<string, LabelCategory>;
  /** Media type specific properties in the job. */
  labelingJobMediaProperties?: LabelingJobMediaProperties;
  /** Configuration of MLAssist feature in the job. */
  mlAssistConfiguration?: MLAssistConfiguration;
  /** Progress metrics of the job. */
  progressMetrics?: ProgressMetrics;
  /**
   * Internal id of the job(Previously called project).
   *
   * Value may contain a UUID
   */
  projectId?: string;
  /** The asset property dictionary. */
  properties?: Record<string, string>;
  /** Specifies the labeling job provisioning state. */
  provisioningState?: "Succeeded" | "Failed" | "Canceled" | "InProgress";
  /** Status of the job. */
  status?:
    | "NotStarted"
    | "Starting"
    | "Provisioning"
    | "Preparing"
    | "Queued"
    | "Running"
    | "Finalizing"
    | "CancelRequested"
    | "Completed"
    | "Failed"
    | "Canceled"
    | "NotResponding"
    | "Paused"
    | "Unknown";
  /** Status messages of the job. */
  statusMessages?: Array<StatusMessage>;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export interface LabelingDatasetConfiguration {
  /** Name of the data asset to perform labeling. */
  assetName?: string;
  /** AML dataset version. */
  datasetVersion?: string;
  /** Indicates whether to enable incremental dataset refresh. */
  incrementalDatasetRefreshEnabled?: boolean;
}

export interface LabelingJobInstructions {
  /** The link to a page with detailed labeling instructions for labelers. */
  uri?: string;
}

export interface LabelCategory {
  /** Indicates whether it is allowed to select multiple classes in this category. */
  allowMultiSelect?: boolean;
  /** Dictionary of label classes in this category. */
  classes?: Record<string, LabelClass>;
  /** Display name of the label category. */
  displayName?: string;
}

export interface LabelClass {
  /** Display name of the label class. */
  displayName?: string;
  /** Dictionary of subclasses of the label class. */
  subclasses?: Record<string, LabelClass>;
}

export interface LabelingJobMediaPropertiesBase {
  mediaType: "Image" | "Text";
}

export interface MLAssistConfiguration {
  /** AML compute binding used in inferencing. */
  inferencingComputeBinding?: ComputeConfiguration;
  /** Indicates whether MLAssist feature is enabled. */
  mlAssistEnabled?: boolean;
  /** AML compute binding used in training. */
  trainingComputeBinding?: ComputeConfiguration;
}

export interface ProgressMetrics {
  /** The completed datapoint count. */
  completedDatapointCount?: number;
  /** The time of last successful incremental dataset refresh in UTC. */
  incrementalDatasetLastRefreshTime?: Date;
  /** The skipped datapoint count. */
  skippedDatapointCount?: number;
  /** The total datapoint count. */
  totalDatapointCount?: number;
}

export interface StatusMessage {
  /** Service-defined message code. */
  code?: string;
  /** Time in UTC at which the message was created. */
  createdTimeUtc?: Date;
  /** Severity level of message. */
  level?: "Error" | "Information" | "Warning";
  /** A human-readable representation of the message code. */
  message?: string;
}

export interface ExportSummaryBase {
  /** The time when the export was completed. */
  endTimeUtc?: Date;
  /** The total number of labeled datapoints exported. */
  exportedRowCount?: number;
  /** Name and identifier of the job containing exported labels. */
  labelingJobId?: string;
  /** The time when the export was requested. */
  startTimeUtc?: Date;
  format: "Coco" | "CSV" | "Dataset";
}

export interface ModelContainerResourceArmPaginatedResult {
  /** The link to the next page of ModelContainer objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type ModelContainer. */
  value?: Array<ModelContainerResource>;
}

export interface ModelContainerResource extends Resource {
  /** Additional attributes of the entity. */
  properties: ModelContainer;
  /** System data associated with resource provider */
  systemData?: SystemData;
}

export interface ModelContainer {
  /** The asset description text. */
  description?: string;
  /** The asset property dictionary. */
  properties?: Record<string, string>;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export interface ModelVersionResourceArmPaginatedResult {
  /** The link to the next page of ModelVersion objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type ModelVersion. */
  value?: Array<ModelVersionResource>;
}

export interface ModelVersionResource extends Resource {
  /** Additional attributes of the entity. */
  properties: ModelVersion;
  /** System data associated with resource provider */
  systemData?: SystemData;
}

export interface ModelVersion {
  /** ARM resource ID of the datastore where the asset is located. */
  datastoreId?: string;
  /** The asset description text. */
  description?: string;
  /** Mapping of model flavors to their properties. */
  flavors?: Record<string, FlavorData>;
  /** If the name version are system generated (anonymous registration). */
  isAnonymous?: boolean;
  /** The path of the file/directory in the datastore. */
  path: string;
  /** The asset property dictionary. */
  properties?: Record<string, string>;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export interface FlavorData {
  /** Model flavor-specific data. */
  data?: Record<string, string>;
}

export interface OnlineEndpointTrackedResourceArmPaginatedResult {
  /** The link to the next page of OnlineEndpoint objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type OnlineEndpoint. */
  value?: Array<OnlineEndpointTrackedResource>;
}

export interface OnlineEndpointTrackedResource extends TrackedResource {
  /** Service identity associated with a resource. */
  identity?: ResourceIdentity;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. */
  kind?: string;
  /** Additional attributes of the entity. */
  properties: OnlineEndpoint;
  /** System data associated with resource provider */
  systemData?: SystemData;
}

export interface OnlineEndpoint {
  /** Inference endpoint authentication mode type */
  authMode: "AMLToken" | "Key" | "AADToken";
  /** Description of the inference endpoint. */
  description?: string;
  /**
   * EndpointAuthKeys to set initially on an Endpoint.
   * This property will always be returned as null. AuthKey values must be retrieved using the ListKeys API.
   */
  keys?: EndpointAuthKeys;
  /** Property dictionary. Properties can be added, but not removed or altered. */
  properties?: Record<string, string>;
  /** State of endpoint provisioning. */
  provisioningState?:
    | "Creating"
    | "Deleting"
    | "Succeeded"
    | "Failed"
    | "Updating"
    | "Canceled";
  /** Endpoint URI. */
  scoringUri?: string;
  /** Endpoint Swagger URI. */
  swaggerUri?: string;
  /**
   * ARM resource ID of the compute if it exists.
   * optional
   */
  target?: string;
  /** Traffic rules on how the traffic will be routed across deployments. */
  traffic?: Record<string, number>;
}

export interface PartialOnlineEndpointPartialTrackedResource {
  /** Service identity associated with a resource. */
  identity?: ResourceIdentity;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. */
  kind?: string;
  /** The geo-location where the resource lives. */
  location?: string;
  /** Additional attributes of the entity. */
  properties?: PartialOnlineEndpoint;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export interface PartialOnlineEndpoint {
  /** Traffic rules on how the traffic will be routed across deployments. */
  traffic?: Record<string, number>;
}

export interface OnlineDeploymentTrackedResourceArmPaginatedResult {
  /** The link to the next page of OnlineDeployment objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type OnlineDeployment. */
  value?: Array<OnlineDeploymentTrackedResource>;
}

export interface OnlineDeploymentTrackedResource extends TrackedResource {
  /** Service identity associated with a resource. */
  identity?: ResourceIdentity;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. */
  kind?: string;
  /** Additional attributes of the entity. */
  properties: OnlineDeployment;
  /** System data associated with resource provider */
  systemData?: SystemData;
}

export interface OnlineDeploymentBase {
  /** If true, enables Application Insights logging. */
  appInsightsEnabled?: boolean;
  /** Code configuration for the endpoint deployment. */
  codeConfiguration?: CodeConfiguration;
  /** Description of the endpoint deployment. */
  description?: string;
  /** ARM resource ID of the environment specification for the endpoint deployment. */
  environmentId?: string;
  /** Environment variables configuration for the deployment. */
  environmentVariables?: Record<string, string>;
  /** Deployment container liveness/readiness probe configuration. */
  livenessProbe?: ProbeSettings;
  /** Reference to the model asset for the endpoint deployment. */
  model?: AssetReferenceBase;
  /** Property dictionary. Properties can be added, but not removed or altered. */
  properties?: Record<string, string>;
  /** Provisioning state for the endpoint deployment. */
  provisioningState?:
    | "Creating"
    | "Deleting"
    | "Scaling"
    | "Updating"
    | "Succeeded"
    | "Failed"
    | "Canceled";
  /** Online deployment scoring requests configuration. */
  requestSettings?: OnlineRequestSettings;
  /** Online deployment scaling configuration. */
  scaleSettings?: OnlineScaleSettings;
  endpointComputeType: "K8S" | "Managed";
}

export interface ProbeSettings {
  /** The number of failures to allow before returning an unhealthy status. */
  failureThreshold?: number;
  /** The delay before the first probe in ISO 8601 format. */
  initialDelay?: string;
  /** The length of time between probes in ISO 8601 format. */
  period?: string;
  /** The number of successful probes before returning a healthy status. */
  successThreshold?: number;
  /** The probe timeout in ISO 8601 format. */
  timeout?: string;
}

export interface OnlineRequestSettings {
  /** The number of requests allowed to queue at once for this deployment. */
  maxConcurrentRequestsPerInstance?: number;
  /** The maximum queue wait time in ISO 8601 format. Supports millisecond precision. */
  maxQueueWait?: string;
  /** The request timeout in ISO 8601 format. Supports millisecond precision. */
  requestTimeout?: string;
}

export interface OnlineScaleSettingsBase {
  /** Maximum number of instances for this deployment. */
  maxInstances?: number;
  /** Minimum number of instances for this deployment. */
  minInstances?: number;
  scaleType: "Auto" | "Manual";
}

export interface PartialOnlineDeploymentPartialTrackedResource {
  /** Service identity associated with a resource. */
  identity?: ResourceIdentity;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. */
  kind?: string;
  /** The geo-location where the resource lives. */
  location?: string;
  /** Additional attributes of the entity. */
  properties?: PartialOnlineDeployment;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export interface PartialOnlineDeploymentBase {
  /** Whether AppInsights telemetry is enabled for this online deployment. */
  appInsightsEnabled?: boolean;
  /** Deployment container liveness/readiness probe configuration. */
  livenessProbe?: ProbeSettings;
  /** Online deployment scoring requests configuration. */
  requestSettings?: OnlineRequestSettings;
  /** Online deployment scaling configuration. */
  scaleSettings?: OnlineScaleSettings;
  endpointComputeType: "K8S" | "Managed";
}

export interface DeploymentLogsRequest {
  /** The type of container to retrieve logs from. */
  containerType?: "StorageInitializer" | "InferenceServer";
  /** The maximum number of lines to tail. */
  tail?: number;
}

export interface DeploymentLogs {
  /** The retrieved online deployment logs. */
  content?: string;
}

export interface RegenerateEndpointKeysRequest {
  /** Specification for which type of key to generate. Primary or Secondary. */
  keyType: "Primary" | "Secondary";
  /** The value the key is set to. */
  keyValue?: string;
}

export interface EndpointAuthToken {
  /** Access token. */
  accessToken?: string;
  /** Access token expiry time (UTC). */
  expiryTimeUtc?: number;
  /** Refresh access token after time (UTC). */
  refreshAfterTimeUtc?: number;
  /** Access token type. */
  tokenType?: string;
}

export interface ListAmlUserFeatureResult {
  /** The list of AML user facing features. */
  value?: Array<AmlUserFeature>;
  /** The URI to fetch the next page of AML user features information. Call ListNext() with this to fetch the next page of AML user features information. */
  nextLink?: string;
}

export interface AmlUserFeature {
  /** Specifies the feature ID */
  id?: string;
  /** Specifies the feature name */
  displayName?: string;
  /** Describes the feature for user experience */
  description?: string;
}

export interface SkuListResult {
  value?: Array<WorkspaceSku>;
  /** The URI to fetch the next page of Workspace Skus. Call ListNext() with this URI to fetch the next page of Workspace Skus */
  nextLink?: string;
}

export interface WorkspaceSku {
  /** The set of locations that the SKU is available. This will be supported and registered Azure Geo Regions (e.g. West US, East US, Southeast Asia, etc.). */
  locations?: Array<string>;
  /** A list of locations and availability zones in those locations where the SKU is available. */
  locationInfo?: Array<ResourceSkuLocationInfo>;
  /** Sku Tier like Basic or Enterprise */
  tier?: string;
  resourceType?: string;
  name?: string;
  /** List of features/user capabilities associated with the sku */
  capabilities?: Array<SKUCapability>;
  /** The restrictions because of which SKU cannot be used. This is empty if there are no restrictions. */
  restrictions?: Array<Restriction>;
}

export interface ResourceSkuLocationInfo {
  /** Location of the SKU */
  location?: string;
  /** List of availability zones where the SKU is supported. */
  zones?: Array<string>;
  /** Details of capabilities available to a SKU in specific zones. */
  zoneDetails?: Array<ResourceSkuZoneDetails>;
}

export interface ResourceSkuZoneDetails {
  /** The set of zones that the SKU is available in with the specified capabilities. */
  name?: Array<string>;
  /** A list of capabilities that are available for the SKU in the specified list of zones. */
  capabilities?: Array<SKUCapability>;
}

export interface SKUCapability {
  /** Capability/Feature ID */
  name?: string;
  /** Details about the feature/capability */
  value?: string;
}

export interface Restriction {
  /** The type of restrictions. As of now only possible value for this is location. */
  type?: string;
  /** The value of restrictions. If the restriction type is set to location. This would be different locations where the SKU is restricted. */
  values?: Array<string>;
  /** The reason for the restriction. */
  reasonCode?:
    | "NotSpecified"
    | "NotAvailableForRegion"
    | "NotAvailableForSubscription";
}

export interface ResourceId {
  /** The ID of the resource */
  id: string;
}

export interface Aks extends ComputeBase {
  /** AKS properties */
  properties?: AKSProperties;
  computeType: "AKS";
}

export interface AKSProperties {
  /** Cluster full qualified domain name */
  clusterFqdn?: string;
  /** System services */
  systemServices?: Array<SystemService>;
  /** Number of agents */
  agentCount?: number;
  /** Agent virtual machine size */
  agentVmSize?: string;
  /** Intended usage of the cluster */
  clusterPurpose?: "FastProd" | "DenseProd" | "DevTest";
  /** SSL configuration */
  sslConfiguration?: SslConfiguration;
  /** AKS networking configuration for vnet */
  aksNetworkingConfiguration?: AksNetworkingConfiguration;
  /** Load Balancer Type */
  loadBalancerType?: "PublicIp" | "InternalLoadBalancer";
  /** Load Balancer Subnet */
  loadBalancerSubnet?: string;
}

export interface SystemService {
  /** The type of this system service. */
  systemServiceType?: string;
  /** Public IP address */
  publicIpAddress?: string;
  /** The version for this type. */
  version?: string;
}

export interface SslConfiguration {
  /** Enable or disable ssl for scoring */
  status?: "Disabled" | "Enabled" | "Auto";
  /** Cert data */
  cert?: string;
  /** Key data */
  key?: string;
  /** CNAME of the cert */
  cname?: string;
  /** Leaf domain label of public endpoint */
  leafDomainLabel?: string;
  /** Indicates whether to overwrite existing domain label. */
  overwriteExistingDomain?: boolean;
}

export interface AksNetworkingConfiguration {
  /** Virtual network subnet resource ID the compute nodes belong to */
  subnetId?: string;
  /** A CIDR notation IP range from which to assign service cluster IPs. It must not overlap with any Subnet IP ranges. */
  serviceCidr?: string;
  /** An IP address assigned to the Kubernetes DNS service. It must be within the Kubernetes service address range specified in serviceCidr. */
  dnsServiceIP?: string;
  /** A CIDR notation IP range assigned to the Docker bridge network. It must not overlap with any Subnet IP ranges or the Kubernetes service address range. */
  dockerBridgeCidr?: string;
}

export interface AmlCompute extends ComputeBase {
  /** AML Compute properties */
  properties?: AmlComputeProperties;
  computeType: "AmlCompute";
}

export interface AmlComputeProperties {
  /** Compute OS Type */
  osType?: "Linux" | "Windows";
  /** Virtual Machine Size */
  vmSize?: string;
  /** Virtual Machine priority */
  vmPriority?: "Dedicated" | "LowPriority";
  /** Virtual Machine image for AML Compute - windows only */
  virtualMachineImage?: VirtualMachineImage;
  /** Network is isolated or not */
  isolatedNetwork?: boolean;
  /** Scale settings for AML Compute */
  scaleSettings?: ScaleSettings;
  /** Credentials for an administrator user account that will be created on each compute node. */
  userAccountCredentials?: UserAccountCredentials;
  /** Virtual network subnet resource ID the compute nodes belong to. */
  subnet?: ResourceId;
  /** State of the public SSH port. Possible values are: Disabled - Indicates that the public ssh port is closed on all nodes of the cluster. Enabled - Indicates that the public ssh port is open on all nodes of the cluster. NotSpecified - Indicates that the public ssh port is closed on all nodes of the cluster if VNet is defined, else is open all public nodes. It can be default only during cluster creation time, after creation it will be either enabled or disabled. */
  remoteLoginPortPublicAccess?: "Enabled" | "Disabled" | "NotSpecified";
  /** Allocation state of the compute. Possible values are: steady - Indicates that the compute is not resizing. There are no changes to the number of compute nodes in the compute in progress. A compute enters this state when it is created and when no operations are being performed on the compute to change the number of compute nodes. resizing - Indicates that the compute is resizing; that is, compute nodes are being added to or removed from the compute. */
  allocationState?: "Steady" | "Resizing";
  /** The time at which the compute entered its current allocation state. */
  allocationStateTransitionTime?: Date;
  /** Collection of errors encountered by various compute nodes during node setup. */
  errors?: Array<ErrorResponse>;
  /** The number of compute nodes currently assigned to the compute. */
  currentNodeCount?: number;
  /** The target number of compute nodes for the compute. If the allocationState is resizing, this property denotes the target node count for the ongoing resize operation. If the allocationState is steady, this property denotes the target node count for the previous resize operation. */
  targetNodeCount?: number;
  /** Counts of various node states on the compute. */
  nodeStateCounts?: NodeStateCounts;
  /** Enable or disable node public IP address provisioning. Possible values are: Possible values are: true - Indicates that the compute nodes will have public IPs provisioned. false - Indicates that the compute nodes will have a private endpoint and no public IPs. */
  enableNodePublicIp?: boolean;
}

export interface VirtualMachineImage {
  /** Virtual Machine image path */
  id: string;
}

export interface UserAccountCredentials {
  /** Name of the administrator user account which can be used to SSH to nodes. */
  adminUserName: string;
  /** SSH public key of the administrator user account. */
  adminUserSshPublicKey?: string;
  /** Password of the administrator user account. */
  adminUserPassword?: string;
}

export interface NodeStateCounts {
  /** Number of compute nodes in idle state. */
  idleNodeCount?: number;
  /** Number of compute nodes which are running jobs. */
  runningNodeCount?: number;
  /** Number of compute nodes which are being prepared. */
  preparingNodeCount?: number;
  /** Number of compute nodes which are in unusable state. */
  unusableNodeCount?: number;
  /** Number of compute nodes which are leaving the amlCompute. */
  leavingNodeCount?: number;
  /** Number of compute nodes which are in preempted state. */
  preemptedNodeCount?: number;
}

export interface ComputeInstance extends ComputeBase {
  /** Compute Instance properties */
  properties?: ComputeInstanceProperties;
  computeType: "ComputeInstance";
}

export interface ComputeInstanceProperties {
  /** Virtual Machine Size */
  vmSize?: string;
  /** Virtual network subnet resource ID the compute nodes belong to. */
  subnet?: ResourceId;
  /** Policy for sharing applications on this compute instance among users of parent workspace. If Personal, only the creator can access applications on this compute instance. When Shared, any workspace user can access applications on this instance depending on his/her assigned role. */
  applicationSharingPolicy?: "Personal" | "Shared";
  /** Specifies policy and settings for SSH access. */
  sshSettings?: ComputeInstanceSshSettings;
  /** Describes all connectivity endpoints available for this ComputeInstance. */
  connectivityEndpoints?: ComputeInstanceConnectivityEndpoints;
  /** Describes available applications and their endpoints on this ComputeInstance. */
  applications?: Array<ComputeInstanceApplication>;
  /** Describes information on user who created this ComputeInstance. */
  createdBy?: ComputeInstanceCreatedBy;
  /** Collection of errors encountered on this ComputeInstance. */
  errors?: Array<ErrorResponse>;
  /** The current state of this ComputeInstance. */
  state?:
    | "Creating"
    | "CreateFailed"
    | "Deleting"
    | "Running"
    | "Restarting"
    | "JobRunning"
    | "SettingUp"
    | "SetupFailed"
    | "Starting"
    | "Stopped"
    | "Stopping"
    | "UserSettingUp"
    | "UserSetupFailed"
    | "Unknown"
    | "Unusable";
  /** The Compute Instance Authorization type. Available values are personal (default). */
  computeInstanceAuthorizationType?: "personal";
  /** Settings for a personal compute instance. */
  personalComputeInstanceSettings?: PersonalComputeInstanceSettings;
  /** Details of customized scripts to execute for setting up the cluster. */
  setupScripts?: SetupScripts;
  /** The last operation on ComputeInstance. */
  lastOperation?: ComputeInstanceLastOperation;
  /** The list of schedules to be applied on the compute instance. */
  schedules?: ComputeSchedules;
}

export interface ComputeInstanceSshSettings {
  /** State of the public SSH port. Possible values are: Disabled - Indicates that the public ssh port is closed on this instance. Enabled - Indicates that the public ssh port is open and accessible according to the VNet/subnet policy if applicable. */
  sshPublicAccess?: "Enabled" | "Disabled";
  /** Describes the admin user name. */
  adminUserName?: string;
  /** Describes the port for connecting through SSH. */
  sshPort?: number;
  /** Specifies the SSH rsa public key file as a string. Use "ssh-keygen -t rsa -b 2048" to generate your SSH key pairs. */
  adminPublicKey?: string;
}

export interface ComputeInstanceConnectivityEndpoints {
  /** Public IP Address of this ComputeInstance. */
  publicIpAddress?: string;
  /** Private IP Address of this ComputeInstance (local to the VNET in which the compute instance is deployed). */
  privateIpAddress?: string;
}

export interface ComputeInstanceApplication {
  /** Name of the ComputeInstance application. */
  displayName?: string;
  /** Application' endpoint URI. */
  endpointUri?: string;
}

export interface ComputeInstanceCreatedBy {
  /** Name of the user. */
  userName?: string;
  /** Uniquely identifies user' Azure Active Directory organization. */
  userOrgId?: string;
  /** Uniquely identifies the user within his/her organization. */
  userId?: string;
}

export interface PersonalComputeInstanceSettings {
  /** A user explicitly assigned to a personal compute instance. */
  assignedUser?: AssignedUser;
}

export interface AssignedUser {
  /** User’s AAD Object Id. */
  objectId: string;
  /** User’s AAD Tenant Id. */
  tenantId: string;
}

export interface SetupScripts {
  /** Customized setup scripts */
  scripts?: ScriptsToExecute;
}

export interface ScriptsToExecute {
  /** Script that's run every time the machine starts. */
  startupScript?: ScriptReference;
  /** Script that's run only once during provision of the compute. */
  creationScript?: ScriptReference;
}

export interface ScriptReference {
  /** The storage source of the script: inline, workspace. */
  scriptSource?: string;
  /** The location of scripts in the mounted volume. */
  scriptData?: string;
  /** Optional command line arguments passed to the script to run. */
  scriptArguments?: string;
  /** Optional time period passed to timeout command. */
  timeout?: string;
}

export interface ComputeInstanceLastOperation {
  /** Name of the last operation. */
  operationName?:
    | "Create"
    | "Start"
    | "Stop"
    | "Restart"
    | "Reimage"
    | "Delete";
  /** Time of the last operation. */
  operationTime?: Date;
  /** Operation status. */
  operationStatus?:
    | "InProgress"
    | "Succeeded"
    | "CreateFailed"
    | "StartFailed"
    | "StopFailed"
    | "RestartFailed"
    | "ReimageFailed"
    | "DeleteFailed";
}

export interface VirtualMachine extends ComputeBase {
  properties?: VirtualMachineProperties;
  computeType: "VirtualMachine";
}

export interface VirtualMachineProperties {
  /** Virtual Machine size */
  virtualMachineSize?: string;
  /** Port open for ssh connections. */
  sshPort?: number;
  /** Public IP address of the virtual machine. */
  address?: string;
  /** Admin credentials for virtual machine */
  administratorAccount?: VirtualMachineSshCredentials;
  /** Indicates whether this compute will be used for running notebooks. */
  isNotebookInstanceCompute?: boolean;
}

export interface VirtualMachineSshCredentials {
  /** Username of admin account */
  username?: string;
  /** Password of admin account */
  password?: string;
  /** Public key data */
  publicKeyData?: string;
  /** Private key data */
  privateKeyData?: string;
}

export interface HDInsight extends ComputeBase {
  properties?: HDInsightProperties;
  computeType: "HDInsight";
}

export interface HDInsightProperties {
  /** Port open for ssh connections on the master node of the cluster. */
  sshPort?: number;
  /** Public IP address of the master node of the cluster. */
  address?: string;
  /** Admin credentials for master node of the cluster */
  administratorAccount?: VirtualMachineSshCredentials;
}

export interface DataFactory extends ComputeBase {
  computeType: "DataFactory";
}

export interface Databricks extends ComputeBase {
  properties?: DatabricksProperties;
  computeType: "Databricks";
}

export interface DatabricksProperties {
  /** Databricks access token */
  databricksAccessToken?: string;
  /** Workspace Url */
  workspaceUrl?: string;
}

export interface DataLakeAnalytics extends ComputeBase {
  properties?: DataLakeAnalyticsProperties;
  computeType: "DataLakeAnalytics";
}

export interface DataLakeAnalyticsProperties {
  /** DataLake Store Account Name */
  dataLakeStoreAccountName?: string;
}

export interface SynapseSparkPoolProperties {
  /** AKS properties */
  properties?: SynapseSparkPoolPropertiesProperties;
}

export interface SynapseSparkPoolPropertiesProperties {
  /** Auto scale properties. */
  autoScaleProperties?: AutoScaleProperties;
  /** Auto pause properties. */
  autoPauseProperties?: AutoPauseProperties;
  /** Spark version. */
  sparkVersion?: string;
  /** The number of compute nodes currently assigned to the compute. */
  nodeCount?: number;
  /** Node size. */
  nodeSize?: string;
  /** Node size family. */
  nodeSizeFamily?: string;
  /** Azure subscription identifier. */
  subscriptionId?: string;
  /** Name of the resource group in which workspace is located. */
  resourceGroup?: string;
  /** Name of Azure Machine Learning workspace. */
  workspaceName?: string;
  /** Pool name. */
  poolName?: string;
}

export interface AutoScaleProperties {
  minNodeCount?: number;
  enabled?: boolean;
  maxNodeCount?: number;
}

export interface AutoPauseProperties {
  delayInMinutes?: number;
  enabled?: boolean;
}

export interface SynapseSpark extends ComputeBase, SynapseSparkPoolProperties {
  computeType: "SynapseSpark";
}

export interface ServicePrincipalCredentials {
  /** Client Id */
  clientId: string;
  /** Client secret */
  clientSecret: string;
}

export interface AksComputeSecrets extends ComputeSecretsBase {
  /** Content of kubeconfig file that can be used to connect to the Kubernetes cluster. */
  userKubeConfig?: string;
  /** Content of kubeconfig file that can be used to connect to the Kubernetes cluster. */
  adminKubeConfig?: string;
  /** Image registry pull secret. */
  imagePullSecretName?: string;
  computeType: "AKS";
}

export interface VirtualMachineSecrets extends ComputeSecretsBase {
  /** Admin credentials for virtual machine. */
  administratorAccount?: VirtualMachineSshCredentials;
  computeType: "VirtualMachine";
}

export interface DatabricksComputeSecrets extends ComputeSecretsBase {
  /** access token for databricks account. */
  databricksAccessToken?: string;
  computeType: "Databricks";
}

export interface ContainerResourceRequirements {
  /**
   * The minimum amount of CPU cores to be used by the container. More info:
   * https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
   */
  cpu?: number;
  /**
   * The maximum amount of CPU cores allowed to be used by the container. More info:
   * https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
   */
  cpuLimit?: number;
  /**
   * The minimum amount of memory (in GB) to be used by the container. More info:
   * https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
   */
  memoryInGB?: number;
  /**
   * The maximum amount of memory (in GB) allowed to be used by the container. More info:
   * https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
   */
  memoryInGBLimit?: number;
  /** The number of GPU cores in the container. */
  gpu?: number;
  /** The number of FPGA PCIE devices exposed to the container. Must be multiple of 2. */
  fpga?: number;
}

export interface DatastoreCredentialsBase {
  credentialsType:
    | "AccountKey"
    | "Certificate"
    | "None"
    | "Sas"
    | "ServicePrincipal"
    | "SqlAdmin";
}

export interface AccountKeyDatastoreCredentials
  extends DatastoreCredentialsBase {
  /** Storage account secrets. */
  secrets?: AccountKeyDatastoreSecrets;
  credentialsType: "AccountKey";
}

export interface AccountKeyDatastoreSecrets extends DatastoreSecretsBase {
  /** Storage account key. */
  key?: string;
  secretsType: "AccountKey";
}

export interface IdentityConfigurationBase {
  identityType: "AMLToken" | "Managed";
}

export interface AmlToken extends IdentityConfigurationBase {
  identityType: "AMLToken";
}

export interface AutoScaleSettings extends OnlineScaleSettingsBase {
  /** The polling interval in ISO 8691 format. Only supports duration with precision as low as Seconds. */
  pollingInterval?: string;
  /** Target CPU usage for the autoscaler. */
  targetUtilizationPercentage?: number;
  scaleType: "Auto";
}

export interface AzureBlobContents extends DatastoreContentsBase {
  /** Storage account name. */
  accountName: string;
  /** Storage account container name. */
  containerName: string;
  /** Account credentials. */
  credentials: DatastoreCredentials;
  /** Azure cloud endpoint for the storage account. */
  endpoint: string;
  /** Protocol used to communicate with the storage account. */
  protocol: string;
  contentsType: "AzureBlob";
}

export interface AzureDataLakeGen1Contents extends DatastoreContentsBase {
  /** Account credentials. */
  credentials: DatastoreCredentials;
  /** Azure Data Lake store name. */
  storeName: string;
  contentsType: "AzureDataLakeGen1";
}

export interface AzureDataLakeGen2Contents extends DatastoreContentsBase {
  /** Storage account name. */
  accountName: string;
  /** Storage account container name. */
  containerName: string;
  /** Account credentials. */
  credentials: DatastoreCredentials;
  /** Azure cloud endpoint for the storage account. */
  endpoint: string;
  /** Protocol used to communicate with the storage account. */
  protocol: string;
  contentsType: "AzureDataLakeGen2";
}

export interface AzureFileContents extends DatastoreContentsBase {
  /** Storage account name. */
  accountName: string;
  /** Storage account container name. */
  containerName: string;
  /** Account credentials. */
  credentials: DatastoreCredentials;
  /** Azure cloud endpoint for the storage account. */
  endpoint: string;
  /** Protocol used to communicate with the storage account. */
  protocol: string;
  contentsType: "AzureFile";
}

export interface AzurePostgreSqlContents extends DatastoreContentsBase {
  /** Account credentials. */
  credentials: DatastoreCredentials;
  /** Azure SQL database name. */
  databaseName: string;
  /** Whether the Azure PostgreSQL server requires SSL. */
  enableSSL?: boolean;
  /** Azure cloud endpoint for the database. */
  endpoint: string;
  /** Azure SQL server port. */
  portNumber: number;
  /** Azure SQL server name. */
  serverName: string;
  contentsType: "AzurePostgreSql";
}

export interface AzureSqlDatabaseContents extends DatastoreContentsBase {
  /** Account credentials. */
  credentials: DatastoreCredentials;
  /** Azure SQL database name. */
  databaseName: string;
  /** Azure cloud endpoint for the database. */
  endpoint: string;
  /** Azure SQL server port. */
  portNumber: number;
  /** Azure SQL server name. */
  serverName: string;
  contentsType: "AzureSqlDatabase";
}

export interface EarlyTerminationPolicyBase {
  /** Number of intervals by which to delay the first evaluation. */
  delayEvaluation?: number;
  /** Interval (number of runs) between policy evaluations. */
  evaluationInterval?: number;
  policyType: "Bandit" | "MedianStopping" | "TruncationSelection";
}

export interface BanditPolicy extends EarlyTerminationPolicyBase {
  /** Absolute distance allowed from the best performing run. */
  slackAmount?: number;
  /** Ratio of the allowed distance from the best performing run. */
  slackFactor?: number;
  policyType: "Bandit";
}

export interface CertificateDatastoreCredentials
  extends DatastoreCredentialsBase {
  /** Authority URL used for authentication. */
  authorityUrl?: string;
  /**
   * Service principal client ID.
   *
   * Value may contain a UUID
   */
  clientId: string;
  /** Resource the service principal has access to. */
  resourceUri?: string;
  /** Service principal secrets. */
  secrets?: CertificateDatastoreSecrets;
  /**
   * ID of the tenant to which the service principal belongs.
   *
   * Value may contain a UUID
   */
  tenantId: string;
  /** Thumbprint of the certificate used for authentication. */
  thumbprint: string;
  credentialsType: "Certificate";
}

export interface CertificateDatastoreSecrets extends DatastoreSecretsBase {
  /** Service principal certificate. */
  certificate?: string;
  secretsType: "Certificate";
}

export interface CocoExportSummary extends ExportSummaryBase {
  /** The container name to which the labels will be exported. */
  containerName?: string;
  /** The output path where the labels will be exported. */
  snapshotPath?: string;
  format: "Coco";
}

export interface CommandJob extends JobBaseBase {
  /** ARM resource ID of the code asset. */
  codeId?: string;
  /** The command to execute on startup of the job. eg. "python train.py" */
  command: string;
  /** Compute binding for the job. */
  compute: ComputeConfiguration;
  /** Distribution configuration of the job. If set, this should be one of Mpi, Tensorflow, PyTorch, or null. */
  distribution?: DistributionConfiguration;
  /** The ARM resource ID of the Environment specification for the job. */
  environmentId?: string;
  /** Environment variables included in the job. */
  environmentVariables?: Record<string, string>;
  /** The name of the experiment the job belongs to. If not set, the job is placed in the "Default" experiment. */
  experimentName?: string;
  /**
   * Identity configuration. If set, this should be one of AmlToken, ManagedIdentity, or null.
   * Defaults to AmlToken if null.
   */
  identity?: IdentityConfiguration;
  /** Mapping of input data bindings used in the job. */
  inputDataBindings?: Record<string, InputDataBinding>;
  /** Location of the job output logs and artifacts. */
  output?: JobOutput;
  /** Mapping of output data bindings used in the job. */
  outputDataBindings?: Record<string, OutputDataBinding>;
  /** Input parameters. */
  parameters?: Record<string, any>;
  /**
   * Job priority for scheduling policy. Only applies to AMLCompute.
   * Private preview feature and only available to users on the allow list.
   */
  priority?: number;
  /** Status of the job. */
  status?:
    | "NotStarted"
    | "Starting"
    | "Provisioning"
    | "Preparing"
    | "Queued"
    | "Running"
    | "Finalizing"
    | "CancelRequested"
    | "Completed"
    | "Failed"
    | "Canceled"
    | "NotResponding"
    | "Paused"
    | "Unknown";
  /** The max run duration in ISO 8601 format, after which the job will be cancelled. Only supports duration with precision as low as Seconds. */
  timeout?: string;
  jobType: "Command";
}

export interface DistributionConfigurationBase {
  distributionType: "Mpi" | "PyTorch" | "TensorFlow";
}

export interface InputDataBinding {
  /** ARM resource ID of the registered dataVersion. */
  dataId?: string;
  /** Mechanism for accessing the data artifact. */
  mode?: "Mount" | "Download" | "Upload";
  /** Location of data inside the container process. */
  pathOnCompute?: string;
}

export interface JobOutput {
  /** ARM ID of the datastore where the job logs and artifacts are stored, or null for the default container ("azureml") in the workspace's storage account. */
  datastoreId?: string;
  /** Path within the datastore to the job logs and artifacts. */
  path?: string;
}

export interface OutputDataBinding {
  /** ARM resource ID of the datastore where the data output will be stored. */
  datastoreId?: string;
  /** Mechanism for data movement to datastore. */
  mode?: "Mount" | "Download" | "Upload";
  /** Location of data inside the container process. */
  pathOnCompute?: string;
  /** Path within the datastore to the data. */
  pathOnDatastore?: string;
}

export interface CsvExportSummary extends ExportSummaryBase {
  /** The container name to which the labels will be exported. */
  containerName?: string;
  /** The output path where the labels will be exported. */
  snapshotPath?: string;
  format: "CSV";
}

export interface DataPathAssetReference extends AssetReferenceBaseBase {
  /** ARM resource ID of the datastore where the asset is located. */
  datastoreId?: string;
  /** The path of the file/directory in the datastore. */
  path?: string;
  referenceType: "DataPath";
}

export interface DatasetExportSummary extends ExportSummaryBase {
  /** The unique name of the labeled data asset. */
  labeledAssetName?: string;
  format: "Dataset";
}

export interface DockerBuild extends DockerSpecificationBase {
  /**
   * Path to a snapshot of the Docker Context. This property is only valid if Dockerfile is specified.
   * The path is relative to the asset path which must contain a single Blob URI value.
   * <seealso href="https://docs.docker.com/engine/context/working-with-contexts/" />
   */
  context?: string;
  /**
   * Docker command line instructions to assemble an image.
   * <seealso href="https://repo2docker.readthedocs.io/en/latest/config_files.html#dockerfile-advanced-environments" />
   */
  dockerfile: string;
  dockerSpecificationType: "Build";
}

export interface DockerImage extends DockerSpecificationBase {
  /**
   * Image name of a custom base image.
   * <seealso href="https://docs.microsoft.com/en-us/azure/machine-learning/how-to-deploy-custom-docker-image#use-a-custom-base-image" />
   */
  dockerImageUri: string;
  dockerSpecificationType: "Image";
}

export interface GlusterFsContents extends DatastoreContentsBase {
  /** GlusterFS server address (can be the IP address or server name). */
  serverAddress: string;
  /** GlusterFS volume name. */
  volumeName: string;
  contentsType: "GlusterFs";
}

export interface IdAssetReference extends AssetReferenceBaseBase {
  /** ARM resource ID of the asset. */
  assetId: string;
  referenceType: "Id";
}

export interface K8SOnlineDeployment extends OnlineDeploymentBase {
  /** Resource requirements for each container instance within an online deployment. */
  containerResourceRequirements?: ContainerResourceRequirements;
  endpointComputeType: "K8S";
}

export interface LabelingJobImageProperties
  extends LabelingJobMediaPropertiesBase {
  /** Annotation type of image labeling job. */
  annotationType?: "Classification" | "BoundingBox" | "InstanceSegmentation";
  mediaType: "Image";
}

export interface LabelingJobTextProperties
  extends LabelingJobMediaPropertiesBase {
  /** Annotation type of text labeling job. */
  annotationType?: "Classification";
  mediaType: "Text";
}

export interface ManagedIdentity extends IdentityConfigurationBase {
  /**
   * Specifies a user-assigned identity by client ID. For system-assigned, do not set this field.
   *
   * Value may contain a UUID
   */
  clientId?: string;
  /**
   * Specifies a user-assigned identity by object ID. For system-assigned, do not set this field.
   *
   * Value may contain a UUID
   */
  objectId?: string;
  /** Specifies a user-assigned identity by ARM resource ID. For system-assigned, do not set this field. */
  resourceId?: string;
  identityType: "Managed";
}

export interface ManagedOnlineDeployment extends OnlineDeploymentBase {
  /** Compute instance type. */
  instanceType?: string;
  /** Deployment container liveness/readiness probe configuration. */
  readinessProbe?: ProbeSettings;
  endpointComputeType: "Managed";
}

export interface ManualScaleSettings extends OnlineScaleSettingsBase {
  /** Fixed number of instances for this deployment. */
  instanceCount?: number;
  scaleType: "Manual";
}

export interface MedianStoppingPolicy extends EarlyTerminationPolicyBase {
  policyType: "MedianStopping";
}

export interface Mpi extends DistributionConfigurationBase {
  /** Number of processes per MPI node. */
  processCountPerInstance?: number;
  distributionType: "Mpi";
}

export interface NoneDatastoreCredentials extends DatastoreCredentialsBase {
  /** Empty/none datastore secret. */
  secrets?: NoneDatastoreSecrets;
  credentialsType: "None";
}

export interface NoneDatastoreSecrets extends DatastoreSecretsBase {
  secretsType: "None";
}

export interface Objective {
  /** Defines supported metric goals for hyperparameter tuning */
  goal: "Minimize" | "Maximize";
  /** Name of the metric to optimize. */
  primaryMetric: string;
}

export interface OutputPathAssetReference extends AssetReferenceBaseBase {
  /** ARM resource ID of the job. */
  jobId?: string;
  /** The path of the file/directory in the job output. */
  path?: string;
  referenceType: "OutputPath";
}

export interface PartialAksOnlineDeployment
  extends PartialOnlineDeploymentBase {
  /** Resource requirements for each container instance within an online deployment. */
  containerResourceRequirements?: ContainerResourceRequirements;
  endpointComputeType: "K8S";
}

export interface PartialManagedOnlineDeployment
  extends PartialOnlineDeploymentBase {
  /** Deployment container liveness/readiness probe configuration. */
  readinessProbe?: ProbeSettings;
  endpointComputeType: "Managed";
}

export interface PyTorch extends DistributionConfigurationBase {
  /** Total process count for the distributed job. */
  processCount?: number;
  distributionType: "PyTorch";
}

export interface SasDatastoreCredentials extends DatastoreCredentialsBase {
  /** Storage container secrets. */
  secrets?: SasDatastoreSecrets;
  credentialsType: "Sas";
}

export interface SasDatastoreSecrets extends DatastoreSecretsBase {
  /** Storage container SAS token. */
  sasToken?: string;
  secretsType: "Sas";
}

export interface ServicePrincipalDatastoreCredentials
  extends DatastoreCredentialsBase {
  /** Authority URL used for authentication. */
  authorityUrl?: string;
  /**
   * Service principal client ID.
   *
   * Value may contain a UUID
   */
  clientId: string;
  /** Resource the service principal has access to. */
  resourceUri?: string;
  /** Service principal secrets. */
  secrets?: ServicePrincipalDatastoreSecrets;
  /**
   * ID of the tenant to which the service principal belongs.
   *
   * Value may contain a UUID
   */
  tenantId: string;
  credentialsType: "ServicePrincipal";
}

export interface ServicePrincipalDatastoreSecrets extends DatastoreSecretsBase {
  /** Service principal secret. */
  clientSecret?: string;
  secretsType: "ServicePrincipal";
}

export interface SqlAdminDatastoreCredentials extends DatastoreCredentialsBase {
  /** SQL database secrets. */
  secrets?: SqlAdminDatastoreSecrets;
  /** SQL database user name. */
  userId: string;
  credentialsType: "SqlAdmin";
}

export interface SqlAdminDatastoreSecrets extends DatastoreSecretsBase {
  /** SQL database password. */
  password?: string;
  secretsType: "SqlAdmin";
}

export interface SweepJob extends JobBaseBase {
  /** Type of the hyperparameter sampling algorithms */
  algorithm: "Grid" | "Random" | "Bayesian";
  /** Compute binding for the job. */
  compute: ComputeConfiguration;
  /** Early termination policies enable canceling poor-performing runs before they complete. */
  earlyTermination?: EarlyTerminationPolicy;
  /** The name of the experiment the job belongs to. If not set, the job is placed in the "Default" experiment. */
  experimentName?: string;
  /**
   * Identity configuration. If set, this should be one of AmlToken, ManagedIdentity or null.
   * Defaults to AmlToken if null.
   */
  identity?: IdentityConfiguration;
  /** An upper bound on the number of trials performed in parallel. */
  maxConcurrentTrials?: number;
  /** An upper bound on the number of trials to perform. */
  maxTotalTrials?: number;
  /** Optimization objective. */
  objective: Objective;
  /** Location of the job output logs and artifacts. */
  output?: JobOutput;
  /**
   * Job priority for scheduling policy. Only applies to AMLCompute.
   * Private preview feature and only available to users on the allow list.
   */
  priority?: number;
  /** A dictionary containing each parameter and its distribution. The dictionary key is the name of the parameter */
  searchSpace: Record<string, Record<string, unknown>>;
  /** The status of a job. */
  status?:
    | "NotStarted"
    | "Starting"
    | "Provisioning"
    | "Preparing"
    | "Queued"
    | "Running"
    | "Finalizing"
    | "CancelRequested"
    | "Completed"
    | "Failed"
    | "Canceled"
    | "NotResponding"
    | "Paused"
    | "Unknown";
  /** The total timeout in ISO 8601 format. Only supports duration with precision as low as Minutes. */
  timeout?: string;
  /** Trial component definition. */
  trial?: TrialComponent;
  jobType: "Sweep";
}

export interface TrialComponent {
  /** ARM resource ID of the code asset. */
  codeId?: string;
  /** The command to execute on startup of the job. eg. "python train.py" */
  command: string;
  /** Distribution configuration of the job. If set, this should be one of Mpi, Tensorflow, PyTorch, or null. */
  distribution?: DistributionConfiguration;
  /** The ARM resource ID of the Environment specification for the job. */
  environmentId?: string;
  /** Environment variables included in the job. */
  environmentVariables?: Record<string, string>;
  /** Mapping of input data bindings used in the job. */
  inputDataBindings?: Record<string, InputDataBinding>;
  /** Mapping of output data bindings used in the job. */
  outputDataBindings?: Record<string, OutputDataBinding>;
  /**
   * The max run duration in ISO 8601 format, after which the trial component will be cancelled.
   * Only supports duration with precision as low as Seconds.
   */
  timeout?: string;
}

export interface TensorFlow extends DistributionConfigurationBase {
  /** Number of parameter server tasks. */
  parameterServerCount?: number;
  /** Number of workers. Overwrites the node count in compute binding. */
  workerCount?: number;
  distributionType: "TensorFlow";
}

export interface TruncationSelectionPolicy extends EarlyTerminationPolicyBase {
  /** The percentage of runs to cancel at each evaluation interval. */
  truncationPercentage?: number;
  policyType: "TruncationSelection";
}

export type Compute =
  | Aks
  | AmlCompute
  | ComputeInstance
  | VirtualMachine
  | HDInsight
  | DataFactory
  | Databricks
  | DataLakeAnalytics
  | SynapseSpark;
export type ComputeNodesInformation = AmlComputeNodesInformation;
export type ComputeSecrets =
  | AksComputeSecrets
  | VirtualMachineSecrets
  | DatabricksComputeSecrets;
export type AssetReferenceBase =
  | DataPathAssetReference
  | IdAssetReference
  | OutputPathAssetReference;
export type DatastoreContents =
  | AzureBlobContents
  | AzureDataLakeGen1Contents
  | AzureDataLakeGen2Contents
  | AzureFileContents
  | AzurePostgreSqlContents
  | AzureSqlDatabaseContents
  | GlusterFsContents;
export type DatastoreSecrets =
  | AccountKeyDatastoreSecrets
  | CertificateDatastoreSecrets
  | NoneDatastoreSecrets
  | SasDatastoreSecrets
  | ServicePrincipalDatastoreSecrets
  | SqlAdminDatastoreSecrets;
export type DockerSpecification = DockerBuild | DockerImage;
export type JobBase = CommandJob | SweepJob;
export type LabelingJobMediaProperties =
  | LabelingJobImageProperties
  | LabelingJobTextProperties;
export type ExportSummary =
  | CocoExportSummary
  | CsvExportSummary
  | DatasetExportSummary;
export type OnlineDeployment = K8SOnlineDeployment | ManagedOnlineDeployment;
export type OnlineScaleSettings = AutoScaleSettings | ManualScaleSettings;
export type PartialOnlineDeployment =
  | PartialAksOnlineDeployment
  | PartialManagedOnlineDeployment;
export type DatastoreCredentials =
  | AccountKeyDatastoreCredentials
  | CertificateDatastoreCredentials
  | NoneDatastoreCredentials
  | SasDatastoreCredentials
  | ServicePrincipalDatastoreCredentials
  | SqlAdminDatastoreCredentials;
export type IdentityConfiguration = AmlToken | ManagedIdentity;
export type EarlyTerminationPolicy =
  | BanditPolicy
  | MedianStoppingPolicy
  | TruncationSelectionPolicy;
export type DistributionConfiguration = Mpi | PyTorch | TensorFlow;
