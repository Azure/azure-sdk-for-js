// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** Site Reliability Engineer (SRE) Agent resource */
export interface Agent extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: AgentProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function agentSerializer(item: Agent): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : agentPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function agentDeserializer(item: any): Agent {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : agentPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of the Agent */
export interface AgentProperties {
  /** Provisioning state of the Agent */
  readonly provisioningState?: AgentProvisioningState;
  /** The endpoint of the Agent */
  readonly agentEndpoint?: string;
  /** The running state of the Agent */
  readonly runningState?: string;
  /** The power state of the Agent */
  readonly powerState?: AgentPowerState;
  /** The agent space ID referenced by the agent */
  agentSpaceId?: string;
  /** Knowledge graph configuration for agent */
  knowledgeGraphConfiguration?: KnowledgeGraphConfiguration;
  /** Configuration for action */
  actionConfiguration?: ActionConfiguration;
  /** Log configurations */
  logConfiguration?: LogConfiguration;
  /** Incident management configurations */
  incidentManagementConfiguration?: IncidentManagementConfiguration;
  /** The upgrade channel of the agent */
  upgradeChannel?: UpgradeChannel;
  /** Agent identity configuration for accessing resources */
  agentIdentity?: AgentIdentity;
  /** Default AI model configuration for the agent */
  defaultModel?: DefaultModel;
}

export function agentPropertiesSerializer(item: AgentProperties): any {
  return {
    agentSpaceId: item["agentSpaceId"],
    knowledgeGraphConfiguration: !item["knowledgeGraphConfiguration"]
      ? item["knowledgeGraphConfiguration"]
      : knowledgeGraphConfigurationSerializer(item["knowledgeGraphConfiguration"]),
    actionConfiguration: !item["actionConfiguration"]
      ? item["actionConfiguration"]
      : actionConfigurationSerializer(item["actionConfiguration"]),
    logConfiguration: !item["logConfiguration"]
      ? item["logConfiguration"]
      : logConfigurationSerializer(item["logConfiguration"]),
    incidentManagementConfiguration: !item["incidentManagementConfiguration"]
      ? item["incidentManagementConfiguration"]
      : incidentManagementConfigurationSerializer(item["incidentManagementConfiguration"]),
    upgradeChannel: item["upgradeChannel"],
    agentIdentity: !item["agentIdentity"]
      ? item["agentIdentity"]
      : agentIdentitySerializer(item["agentIdentity"]),
    defaultModel: !item["defaultModel"]
      ? item["defaultModel"]
      : defaultModelSerializer(item["defaultModel"]),
  };
}

export function agentPropertiesDeserializer(item: any): AgentProperties {
  return {
    provisioningState: item["provisioningState"],
    agentEndpoint: item["agentEndpoint"],
    runningState: item["runningState"],
    powerState: item["powerState"],
    agentSpaceId: item["agentSpaceId"],
    knowledgeGraphConfiguration: !item["knowledgeGraphConfiguration"]
      ? item["knowledgeGraphConfiguration"]
      : knowledgeGraphConfigurationDeserializer(item["knowledgeGraphConfiguration"]),
    actionConfiguration: !item["actionConfiguration"]
      ? item["actionConfiguration"]
      : actionConfigurationDeserializer(item["actionConfiguration"]),
    logConfiguration: !item["logConfiguration"]
      ? item["logConfiguration"]
      : logConfigurationDeserializer(item["logConfiguration"]),
    incidentManagementConfiguration: !item["incidentManagementConfiguration"]
      ? item["incidentManagementConfiguration"]
      : incidentManagementConfigurationDeserializer(item["incidentManagementConfiguration"]),
    upgradeChannel: item["upgradeChannel"],
    agentIdentity: !item["agentIdentity"]
      ? item["agentIdentity"]
      : agentIdentityDeserializer(item["agentIdentity"]),
    defaultModel: !item["defaultModel"]
      ? item["defaultModel"]
      : defaultModelDeserializer(item["defaultModel"]),
  };
}

/** Provisioning state of the Agent */
export enum KnownAgentProvisioningState {
  /** The Agent provisioning succeeded */
  Succeeded = "Succeeded",
  /** The Agent provisioning failed */
  Failed = "Failed",
  /** The Agent provisioning was canceled */
  Canceled = "Canceled",
  /** The Agent is being provisioned */
  InProgress = "InProgress",
  /** The Agent is being deleted */
  Deleting = "Deleting",
}

/**
 * Provisioning state of the Agent \
 * {@link KnownAgentProvisioningState} can be used interchangeably with AgentProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The Agent provisioning succeeded \
 * **Failed**: The Agent provisioning failed \
 * **Canceled**: The Agent provisioning was canceled \
 * **InProgress**: The Agent is being provisioned \
 * **Deleting**: The Agent is being deleted
 */
export type AgentProvisioningState = string;

/** Power state of the Agent */
export enum KnownAgentPowerState {
  /** The Agent is running */
  Running = "Running",
  /** The Agent is stopped */
  Stopped = "Stopped",
}

/**
 * Power state of the Agent \
 * {@link KnownAgentPowerState} can be used interchangeably with AgentPowerState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running**: The Agent is running \
 * **Stopped**: The Agent is stopped
 */
export type AgentPowerState = string;

/** Knowledge graph configuration for agent */
export interface KnowledgeGraphConfiguration {
  /** The identity used to access the knowledge graph */
  identity?: string;
  /** The list of resources managed by agent */
  managedResources?: string[];
}

export function knowledgeGraphConfigurationSerializer(item: KnowledgeGraphConfiguration): any {
  return {
    identity: item["identity"],
    managedResources: !item["managedResources"]
      ? item["managedResources"]
      : item["managedResources"].map((p: any) => {
          return p;
        }),
  };
}

export function knowledgeGraphConfigurationDeserializer(item: any): KnowledgeGraphConfiguration {
  return {
    identity: item["identity"],
    managedResources: !item["managedResources"]
      ? item["managedResources"]
      : item["managedResources"].map((p: any) => {
          return p;
        }),
  };
}

/** Configuration for action */
export interface ActionConfiguration {
  /** The identity used by the action */
  identity?: string;
  /** The mode of the action */
  mode?: AgentMode;
  /** The access level of the action */
  accessLevel?: AgentAccessLevel;
}

export function actionConfigurationSerializer(item: ActionConfiguration): any {
  return { identity: item["identity"], mode: item["mode"], accessLevel: item["accessLevel"] };
}

export function actionConfigurationDeserializer(item: any): ActionConfiguration {
  return {
    identity: item["identity"],
    mode: item["mode"],
    accessLevel: item["accessLevel"],
  };
}

/** Agent mode */
export enum KnownAgentMode {
  /** Write actions are executed automatically without user approval */
  Autonomous = "Autonomous",
  /** Write actions require user approval before execution */
  Review = "Review",
  /** No write actions are executed */
  ReadOnly = "ReadOnly",
}

/**
 * Agent mode \
 * {@link KnownAgentMode} can be used interchangeably with AgentMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Autonomous**: Write actions are executed automatically without user approval \
 * **Review**: Write actions require user approval before execution \
 * **ReadOnly**: No write actions are executed
 */
export type AgentMode = string;

/** Agent access level */
export enum KnownAgentAccessLevel {
  /** Agent has read-only permissions on managed resource groups */
  Low = "Low",
  /** Agent can take approved actions on resources using its own managed identity */
  High = "High",
}

/**
 * Agent access level \
 * {@link KnownAgentAccessLevel} can be used interchangeably with AgentAccessLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low**: Agent has read-only permissions on managed resource groups \
 * **High**: Agent can take approved actions on resources using its own managed identity
 */
export type AgentAccessLevel = string;

/** Log Configurations */
export interface LogConfiguration {
  /** Application Insights Configuration */
  applicationInsightsConfiguration?: ApplicationInsightsConfiguration;
}

export function logConfigurationSerializer(item: LogConfiguration): any {
  return {
    applicationInsightsConfiguration: !item["applicationInsightsConfiguration"]
      ? item["applicationInsightsConfiguration"]
      : applicationInsightsConfigurationSerializer(item["applicationInsightsConfiguration"]),
  };
}

export function logConfigurationDeserializer(item: any): LogConfiguration {
  return {
    applicationInsightsConfiguration: !item["applicationInsightsConfiguration"]
      ? item["applicationInsightsConfiguration"]
      : applicationInsightsConfigurationDeserializer(item["applicationInsightsConfiguration"]),
  };
}

/** Application Insights Configuration */
export interface ApplicationInsightsConfiguration {
  /** The Application ID for the Application Insights resource */
  appId?: string;
  /** The connection string for the Application Insights resource */
  connectionString?: string;
}

export function applicationInsightsConfigurationSerializer(
  item: ApplicationInsightsConfiguration,
): any {
  return { appId: item["appId"], connectionString: item["connectionString"] };
}

export function applicationInsightsConfigurationDeserializer(
  item: any,
): ApplicationInsightsConfiguration {
  return {
    appId: item["appId"],
    connectionString: item["connectionString"],
  };
}

/** Incident Management Configurations */
export interface IncidentManagementConfiguration {
  /** The type of incident management system */
  type?: string;
  /** The name of the connection */
  connectionName?: string;
  /** The URL of the connection */
  connectionUrl?: string;
  /** The key for the connection */
  connectionKey?: string;
  /** The user for the connection */
  oboUser?: string;
}

export function incidentManagementConfigurationSerializer(
  item: IncidentManagementConfiguration,
): any {
  return {
    type: item["type"],
    connectionName: item["connectionName"],
    connectionUrl: item["connectionUrl"],
    connectionKey: item["connectionKey"],
    oboUser: item["oboUser"],
  };
}

export function incidentManagementConfigurationDeserializer(
  item: any,
): IncidentManagementConfiguration {
  return {
    type: item["type"],
    connectionName: item["connectionName"],
    connectionUrl: item["connectionUrl"],
    connectionKey: item["connectionKey"],
    oboUser: item["oboUser"],
  };
}

/** Upgrade channel for Agent */
export enum KnownUpgradeChannel {
  /** Preview upgrade channel */
  Preview = "Preview",
  /** Stable upgrade channel */
  Stable = "Stable",
}

/**
 * Upgrade channel for Agent \
 * {@link KnownUpgradeChannel} can be used interchangeably with UpgradeChannel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Preview**: Preview upgrade channel \
 * **Stable**: Stable upgrade channel
 */
export type UpgradeChannel = string;

/** Agent identity configuration */
export interface AgentIdentity {
  /** Indicates whether the agent identity is enabled */
  readonly enabled?: boolean;
  /** Client ID (GUID) for the agent identity */
  readonly clientId?: string;
  /** Initial sponsor group ID (required for agent identity) */
  initialSponsorGroupId: string;
}

export function agentIdentitySerializer(item: AgentIdentity): any {
  return { initialSponsorGroupId: item["initialSponsorGroupId"] };
}

export function agentIdentityDeserializer(item: any): AgentIdentity {
  return {
    enabled: item["enabled"],
    clientId: item["clientId"],
    initialSponsorGroupId: item["initialSponsorGroupId"],
  };
}

/** Default AI model configuration */
export interface DefaultModel {
  /** AI provider name (e.g., MicrosoftFoundry, Anthropic) */
  provider?: string;
  /** Model name (e.g., gpt-5, claude-opus-4-5, claude-sonnet-4-5) */
  name?: string;
}

export function defaultModelSerializer(item: DefaultModel): any {
  return { provider: item["provider"], name: item["name"] };
}

export function defaultModelDeserializer(item: any): DefaultModel {
  return {
    provider: item["provider"],
    name: item["name"],
  };
}

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : Object.fromEntries(
          Object.entries(item["userAssignedIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
  };
}

/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export enum KnownManagedServiceIdentityType {
  /** No managed identity. */
  None = "None",
  /** System assigned managed identity. */
  SystemAssigned = "SystemAssigned",
  /** User assigned managed identity. */
  UserAssigned = "UserAssigned",
  /** System and user assigned managed identity. */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned,UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(_item: Resource): any {
  return {};
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** Agent update model */
export interface AgentPatch {
  /** Resource tags */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Agent specific properties */
  properties?: AgentPatchProperties;
}

export function agentPatchSerializer(item: AgentPatch): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : agentPatchPropertiesSerializer(item["properties"]),
  };
}

/**
 * Agent specific properties for PATCH requests.
 *
 * PATCH request bodies must not include required properties and should not include read-only properties.
 */
export interface AgentPatchProperties {
  /** The agent space ID referenced by the agent */
  agentSpaceId?: string;
  /** Knowledge graph configuration for agent */
  knowledgeGraphConfiguration?: KnowledgeGraphConfiguration;
  /** Configuration for action */
  actionConfiguration?: ActionConfiguration;
  /** Log configurations */
  logConfiguration?: LogConfiguration;
  /** Incident management configurations */
  incidentManagementConfiguration?: IncidentManagementConfiguration;
  /** The upgrade channel of the agent */
  upgradeChannel?: UpgradeChannel;
  /** Agent identity configuration for accessing resources */
  agentIdentity?: AgentIdentityPatch;
  /** Default AI model configuration for the agent */
  defaultModel?: DefaultModel;
}

export function agentPatchPropertiesSerializer(item: AgentPatchProperties): any {
  return {
    agentSpaceId: item["agentSpaceId"],
    knowledgeGraphConfiguration: !item["knowledgeGraphConfiguration"]
      ? item["knowledgeGraphConfiguration"]
      : knowledgeGraphConfigurationSerializer(item["knowledgeGraphConfiguration"]),
    actionConfiguration: !item["actionConfiguration"]
      ? item["actionConfiguration"]
      : actionConfigurationSerializer(item["actionConfiguration"]),
    logConfiguration: !item["logConfiguration"]
      ? item["logConfiguration"]
      : logConfigurationSerializer(item["logConfiguration"]),
    incidentManagementConfiguration: !item["incidentManagementConfiguration"]
      ? item["incidentManagementConfiguration"]
      : incidentManagementConfigurationSerializer(item["incidentManagementConfiguration"]),
    upgradeChannel: item["upgradeChannel"],
    agentIdentity: !item["agentIdentity"]
      ? item["agentIdentity"]
      : agentIdentityPatchSerializer(item["agentIdentity"]),
    defaultModel: !item["defaultModel"]
      ? item["defaultModel"]
      : defaultModelSerializer(item["defaultModel"]),
  };
}

/** Agent identity configuration for PATCH requests */
export interface AgentIdentityPatch {
  /** Initial sponsor group ID (required for PUT but optional for PATCH) */
  initialSponsorGroupId?: string;
}

export function agentIdentityPatchSerializer(item: AgentIdentityPatch): any {
  return { initialSponsorGroupId: item["initialSponsorGroupId"] };
}

/** The response of a Agent list operation. */
export interface _AgentListResult {
  /** The Agent items on this page */
  value: Agent[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _agentListResultDeserializer(item: any): _AgentListResult {
  return {
    value: agentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function agentArraySerializer(result: Array<Agent>): any[] {
  return result.map((item) => {
    return agentSerializer(item);
  });
}

export function agentArrayDeserializer(result: Array<Agent>): any[] {
  return result.map((item) => {
    return agentDeserializer(item);
  });
}

/** Agent Connector used to connect to data sources */
export interface AgentConnector extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AgentConnectorProperties;
}

export function agentConnectorSerializer(item: AgentConnector): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : agentConnectorPropertiesSerializer(item["properties"]),
  };
}

export function agentConnectorDeserializer(item: any): AgentConnector {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : agentConnectorPropertiesDeserializer(item["properties"]),
  };
}

/** Agent Connector Properties */
export interface AgentConnectorProperties {
  /** Endpoint of the connector */
  endpoint?: string;
  /** Data source connection string or endpoint */
  dataSource?: string;
  /** Identity used to access the data source */
  identity?: string;
  /** Provisioning state of the connector */
  readonly provisioningState?: ConnectorProvisioningState;
  /** Deployment error message if provisioning failed */
  readonly deploymentError?: string;
  /** Additional properties for the data connector which can be used to store custom key-value pairs */
  extendedProperties?: Record<string, any>;
  /** The type of the data connector */
  dataConnectorType?: string;
  /** Source of the data connector - "Agent" when directly stored in agent, "AgentSpace" when inherited */
  readonly source?: string;
}

export function agentConnectorPropertiesSerializer(item: AgentConnectorProperties): any {
  return {
    endpoint: item["endpoint"],
    dataSource: item["dataSource"],
    identity: item["identity"],
    extendedProperties: item["extendedProperties"],
    dataConnectorType: item["dataConnectorType"],
  };
}

export function agentConnectorPropertiesDeserializer(item: any): AgentConnectorProperties {
  return {
    endpoint: item["endpoint"],
    dataSource: item["dataSource"],
    identity: item["identity"],
    provisioningState: item["provisioningState"],
    deploymentError: item["deploymentError"],
    extendedProperties: !item["extendedProperties"]
      ? item["extendedProperties"]
      : Object.fromEntries(
          Object.entries(item["extendedProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    dataConnectorType: item["dataConnectorType"],
    source: item["source"],
  };
}

/** Provisioning state of a connector */
export enum KnownConnectorProvisioningState {
  /** The connector provisioning succeeded */
  Succeeded = "Succeeded",
  /** The connector provisioning failed */
  Failed = "Failed",
  /** The connector provisioning was canceled */
  Canceled = "Canceled",
  /** The connector is being provisioned */
  InProgress = "InProgress",
  /** The connector is being deleted */
  Deleting = "Deleting",
}

/**
 * Provisioning state of a connector \
 * {@link KnownConnectorProvisioningState} can be used interchangeably with ConnectorProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The connector provisioning succeeded \
 * **Failed**: The connector provisioning failed \
 * **Canceled**: The connector provisioning was canceled \
 * **InProgress**: The connector is being provisioned \
 * **Deleting**: The connector is being deleted
 */
export type ConnectorProvisioningState = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The response of a AgentConnector list operation. */
export interface _AgentConnectorListResult {
  /** The AgentConnector items on this page */
  value: AgentConnector[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _agentConnectorListResultDeserializer(item: any): _AgentConnectorListResult {
  return {
    value: agentConnectorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function agentConnectorArraySerializer(result: Array<AgentConnector>): any[] {
  return result.map((item) => {
    return agentConnectorSerializer(item);
  });
}

export function agentConnectorArrayDeserializer(result: Array<AgentConnector>): any[] {
  return result.map((item) => {
    return agentConnectorDeserializer(item);
  });
}

/** Collection of Agent Connectors */
export interface AgentConnectorCollection {
  /** The AgentConnector items on this page */
  value: AgentConnector[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function agentConnectorCollectionDeserializer(item: any): AgentConnectorCollection {
  return {
    value: agentConnectorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** SRE Agent Space resource */
export interface AgentSpace extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: AgentSpaceProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function agentSpaceSerializer(item: AgentSpace): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : agentSpacePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function agentSpaceDeserializer(item: any): AgentSpace {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : agentSpacePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Agent Space specific properties */
export interface AgentSpaceProperties {
  /** Provisioning state of the Agent Space */
  readonly provisioningState?: AgentSpaceProvisioningState;
  /** Current number of agents in the Agent Space */
  readonly currentAgentCount?: number;
  /** List of agents referencing the Agent Space */
  readonly memberAgents?: string[];
  /** Timestamp of the last policy propagation to agents in this Agent Space */
  readonly lastPolicyPropagation?: Date;
  /** Compliance status of the Agent Space */
  readonly complianceStatus?: AgentSpaceComplianceStatus;
  /** Description of the Agent Space */
  description?: string;
  /** Policy configurations for the Agent Space */
  policies?: AgentSpacePolicies;
  /** Maximum number of agents allowed in the Agent Space */
  maxAgentCount?: number;
  /** Universal unique ID (UUID) of the Service Tree associated with this Agent Space */
  serviceTreeId?: string;
}

export function agentSpacePropertiesSerializer(item: AgentSpaceProperties): any {
  return {
    description: item["description"],
    policies: !item["policies"] ? item["policies"] : agentSpacePoliciesSerializer(item["policies"]),
    maxAgentCount: item["maxAgentCount"],
    serviceTreeId: item["serviceTreeId"],
  };
}

export function agentSpacePropertiesDeserializer(item: any): AgentSpaceProperties {
  return {
    provisioningState: item["provisioningState"],
    currentAgentCount: item["currentAgentCount"],
    memberAgents: !item["memberAgents"]
      ? item["memberAgents"]
      : item["memberAgents"].map((p: any) => {
          return p;
        }),
    lastPolicyPropagation: !item["lastPolicyPropagation"]
      ? item["lastPolicyPropagation"]
      : new Date(item["lastPolicyPropagation"]),
    complianceStatus: !item["complianceStatus"]
      ? item["complianceStatus"]
      : agentSpaceComplianceStatusDeserializer(item["complianceStatus"]),
    description: item["description"],
    policies: !item["policies"]
      ? item["policies"]
      : agentSpacePoliciesDeserializer(item["policies"]),
    maxAgentCount: item["maxAgentCount"],
    serviceTreeId: item["serviceTreeId"],
  };
}

/** Provisioning state of the Agent Space */
export enum KnownAgentSpaceProvisioningState {
  /** The Agent Space provisioning succeeded */
  Succeeded = "Succeeded",
  /** The Agent Space provisioning failed */
  Failed = "Failed",
  /** The Agent Space provisioning was canceled */
  Canceled = "Canceled",
  /** The Agent Space is being provisioned */
  InProgress = "InProgress",
  /** The Agent Space is being deleted */
  Deleting = "Deleting",
}

/**
 * Provisioning state of the Agent Space \
 * {@link KnownAgentSpaceProvisioningState} can be used interchangeably with AgentSpaceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The Agent Space provisioning succeeded \
 * **Failed**: The Agent Space provisioning failed \
 * **Canceled**: The Agent Space provisioning was canceled \
 * **InProgress**: The Agent Space is being provisioned \
 * **Deleting**: The Agent Space is being deleted
 */
export type AgentSpaceProvisioningState = string;

/** Compliance status of the Agent Space */
export interface AgentSpaceComplianceStatus {
  /** Indicates whether the Agent Space is compliant */
  readonly isCompliant: boolean;
  /** List of compliance issues found in the Agent Space */
  readonly complianceIssues?: string[];
  /** Timestamp of the last compliance check */
  readonly lastComplianceCheck?: Date;
}

export function agentSpaceComplianceStatusDeserializer(item: any): AgentSpaceComplianceStatus {
  return {
    isCompliant: item["isCompliant"],
    complianceIssues: !item["complianceIssues"]
      ? item["complianceIssues"]
      : item["complianceIssues"].map((p: any) => {
          return p;
        }),
    lastComplianceCheck: !item["lastComplianceCheck"]
      ? item["lastComplianceCheck"]
      : new Date(item["lastComplianceCheck"]),
  };
}

/** Policy configurations for an Agent Space */
export interface AgentSpacePolicies {
  /** Configuration for Geneva Actions policy */
  genevaActionsConfiguration?: GenevaActionsPolicy;
}

export function agentSpacePoliciesSerializer(item: AgentSpacePolicies): any {
  return {
    genevaActionsConfiguration: !item["genevaActionsConfiguration"]
      ? item["genevaActionsConfiguration"]
      : genevaActionsPolicySerializer(item["genevaActionsConfiguration"]),
  };
}

export function agentSpacePoliciesDeserializer(item: any): AgentSpacePolicies {
  return {
    genevaActionsConfiguration: !item["genevaActionsConfiguration"]
      ? item["genevaActionsConfiguration"]
      : genevaActionsPolicyDeserializer(item["genevaActionsConfiguration"]),
  };
}

/** Geneva Actions policy configuration for Agent Space */
export interface GenevaActionsPolicy {
  /** ACIS (Azure Container Instance Service) endpoint URL */
  acisEndpoint?: string;
  /** Client ID for authentication */
  clientId?: string;
  /** Subject name of the certificate used for authentication */
  certificateSubjectName?: string;
  /** Authentication mode for Geneva Actions */
  authenticationMode?: GenevaActionAuthenticationMode;
  /** Name of the Geneva extension */
  extensionName: string;
  /** Collection of allowed Geneva actions */
  allowedActions?: GenevaActionConfig[];
  /** Subject alternative name of the certificate used for authentication */
  readonly certificateSubjectAlternativeName?: string;
}

export function genevaActionsPolicySerializer(item: GenevaActionsPolicy): any {
  return {
    acisEndpoint: item["acisEndpoint"],
    clientId: item["clientId"],
    certificateSubjectName: item["certificateSubjectName"],
    authenticationMode: item["authenticationMode"],
    extensionName: item["extensionName"],
    allowedActions: !item["allowedActions"]
      ? item["allowedActions"]
      : genevaActionConfigArraySerializer(item["allowedActions"]),
  };
}

export function genevaActionsPolicyDeserializer(item: any): GenevaActionsPolicy {
  return {
    acisEndpoint: item["acisEndpoint"],
    clientId: item["clientId"],
    certificateSubjectName: item["certificateSubjectName"],
    authenticationMode: item["authenticationMode"],
    extensionName: item["extensionName"],
    allowedActions: !item["allowedActions"]
      ? item["allowedActions"]
      : genevaActionConfigArrayDeserializer(item["allowedActions"]),
    certificateSubjectAlternativeName: item["certificateSubjectAlternativeName"],
  };
}

/** Geneva Action authentication mode */
export enum KnownGenevaActionAuthenticationMode {
  /** OAuth authentication mode */
  OAuth = "OAuth",
  /** WS-Trust authentication mode */
  WSTrust = "WS-Trust",
}

/**
 * Geneva Action authentication mode \
 * {@link KnownGenevaActionAuthenticationMode} can be used interchangeably with GenevaActionAuthenticationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OAuth**: OAuth authentication mode \
 * **WS-Trust**: WS-Trust authentication mode
 */
export type GenevaActionAuthenticationMode = string;

export function genevaActionConfigArraySerializer(result: Array<GenevaActionConfig>): any[] {
  return result.map((item) => {
    return genevaActionConfigSerializer(item);
  });
}

export function genevaActionConfigArrayDeserializer(result: Array<GenevaActionConfig>): any[] {
  return result.map((item) => {
    return genevaActionConfigDeserializer(item);
  });
}

/** Configuration for a Geneva action */
export interface GenevaActionConfig {
  /** Name of the Geneva action */
  actionName?: string;
  /** Extension associated with the action */
  extension?: string;
  /** Parameters for the Geneva action */
  actionParameters?: GenevaActionParameter[];
  /** Indicates whether approval is required for this action */
  approvalRequired?: boolean;
}

export function genevaActionConfigSerializer(item: GenevaActionConfig): any {
  return {
    actionName: item["actionName"],
    extension: item["extension"],
    actionParameters: !item["actionParameters"]
      ? item["actionParameters"]
      : genevaActionParameterArraySerializer(item["actionParameters"]),
    approvalRequired: item["approvalRequired"],
  };
}

export function genevaActionConfigDeserializer(item: any): GenevaActionConfig {
  return {
    actionName: item["actionName"],
    extension: item["extension"],
    actionParameters: !item["actionParameters"]
      ? item["actionParameters"]
      : genevaActionParameterArrayDeserializer(item["actionParameters"]),
    approvalRequired: item["approvalRequired"],
  };
}

export function genevaActionParameterArraySerializer(result: Array<GenevaActionParameter>): any[] {
  return result.map((item) => {
    return genevaActionParameterSerializer(item);
  });
}

export function genevaActionParameterArrayDeserializer(
  result: Array<GenevaActionParameter>,
): any[] {
  return result.map((item) => {
    return genevaActionParameterDeserializer(item);
  });
}

/** Parameter for a Geneva action */
export interface GenevaActionParameter {
  /** Name of the parameter */
  name?: string;
  /** Type of the parameter */
  type?: string;
}

export function genevaActionParameterSerializer(item: GenevaActionParameter): any {
  return { name: item["name"], type: item["type"] };
}

export function genevaActionParameterDeserializer(item: any): GenevaActionParameter {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** Agent Space update model */
export interface AgentSpacePatch {
  /** Resource tags */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Agent Space specific properties */
  properties?: AgentSpacePatchProperties;
}

export function agentSpacePatchSerializer(item: AgentSpacePatch): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : agentSpacePatchPropertiesSerializer(item["properties"]),
  };
}

/**
 * Agent Space specific properties for PATCH requests.
 *
 * PATCH request bodies must not include required properties and should not include read-only properties.
 */
export interface AgentSpacePatchProperties {
  /** Description of the Agent Space */
  description?: string;
  /** Policy configurations for the Agent Space */
  policies?: AgentSpacePoliciesPatch;
  /** Maximum number of agents allowed in the Agent Space */
  maxAgentCount?: number;
  /** Universal unique ID (UUID) of the Service Tree associated with this Agent Space */
  serviceTreeId?: string;
}

export function agentSpacePatchPropertiesSerializer(item: AgentSpacePatchProperties): any {
  return {
    description: item["description"],
    policies: !item["policies"]
      ? item["policies"]
      : agentSpacePoliciesPatchSerializer(item["policies"]),
    maxAgentCount: item["maxAgentCount"],
    serviceTreeId: item["serviceTreeId"],
  };
}

/** Policy configurations for an Agent Space (PATCH request model) */
export interface AgentSpacePoliciesPatch {
  /** Configuration for Geneva Actions policy */
  genevaActionsConfiguration?: GenevaActionsPolicyPatch;
}

export function agentSpacePoliciesPatchSerializer(item: AgentSpacePoliciesPatch): any {
  return {
    genevaActionsConfiguration: !item["genevaActionsConfiguration"]
      ? item["genevaActionsConfiguration"]
      : genevaActionsPolicyPatchSerializer(item["genevaActionsConfiguration"]),
  };
}

/** Geneva Actions policy configuration for Agent Space (PATCH request model) */
export interface GenevaActionsPolicyPatch {
  /** ACIS (Azure Container Instance Service) endpoint URL */
  acisEndpoint?: string;
  /** Client ID for authentication */
  clientId?: string;
  /** Subject name of the certificate used for authentication */
  certificateSubjectName?: string;
  /** Authentication mode for Geneva Actions */
  authenticationMode?: GenevaActionAuthenticationMode;
  /** Name of the Geneva extension */
  extensionName?: string;
  /** Collection of allowed Geneva actions */
  allowedActions?: GenevaActionConfig[];
}

export function genevaActionsPolicyPatchSerializer(item: GenevaActionsPolicyPatch): any {
  return {
    acisEndpoint: item["acisEndpoint"],
    clientId: item["clientId"],
    certificateSubjectName: item["certificateSubjectName"],
    authenticationMode: item["authenticationMode"],
    extensionName: item["extensionName"],
    allowedActions: !item["allowedActions"]
      ? item["allowedActions"]
      : genevaActionConfigArraySerializer(item["allowedActions"]),
  };
}

/** The response of a AgentSpace list operation. */
export interface _AgentSpaceListResult {
  /** The AgentSpace items on this page */
  value: AgentSpace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _agentSpaceListResultDeserializer(item: any): _AgentSpaceListResult {
  return {
    value: agentSpaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function agentSpaceArraySerializer(result: Array<AgentSpace>): any[] {
  return result.map((item) => {
    return agentSpaceSerializer(item);
  });
}

export function agentSpaceArrayDeserializer(result: Array<AgentSpace>): any[] {
  return result.map((item) => {
    return agentSpaceDeserializer(item);
  });
}

/** Agent Space Connector used to connect to data sources */
export interface AgentSpaceConnector extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AgentSpaceConnectorProperties;
}

export function agentSpaceConnectorSerializer(item: AgentSpaceConnector): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : agentSpaceConnectorPropertiesSerializer(item["properties"]),
  };
}

export function agentSpaceConnectorDeserializer(item: any): AgentSpaceConnector {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : agentSpaceConnectorPropertiesDeserializer(item["properties"]),
  };
}

/** Agent Space Connector Properties */
export interface AgentSpaceConnectorProperties {
  /** Endpoint of the connector */
  endpoint?: string;
  /** Data source connection string or endpoint */
  dataSource?: string;
  /** Identity used to access the data source */
  identity?: string;
  /** Provisioning state of the connector */
  readonly provisioningState?: ConnectorProvisioningState;
  /** Deployment error message if provisioning failed */
  readonly deploymentError?: string;
  /** Additional properties for the data connector which can be used to store custom key-value pairs */
  extendedProperties?: Record<string, any>;
  /** The type of the data connector */
  dataConnectorType?: string;
}

export function agentSpaceConnectorPropertiesSerializer(item: AgentSpaceConnectorProperties): any {
  return {
    endpoint: item["endpoint"],
    dataSource: item["dataSource"],
    identity: item["identity"],
    extendedProperties: item["extendedProperties"],
    dataConnectorType: item["dataConnectorType"],
  };
}

export function agentSpaceConnectorPropertiesDeserializer(
  item: any,
): AgentSpaceConnectorProperties {
  return {
    endpoint: item["endpoint"],
    dataSource: item["dataSource"],
    identity: item["identity"],
    provisioningState: item["provisioningState"],
    deploymentError: item["deploymentError"],
    extendedProperties: !item["extendedProperties"]
      ? item["extendedProperties"]
      : Object.fromEntries(
          Object.entries(item["extendedProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    dataConnectorType: item["dataConnectorType"],
  };
}

/** The response of a AgentSpaceConnector list operation. */
export interface _AgentSpaceConnectorListResult {
  /** The AgentSpaceConnector items on this page */
  value: AgentSpaceConnector[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _agentSpaceConnectorListResultDeserializer(
  item: any,
): _AgentSpaceConnectorListResult {
  return {
    value: agentSpaceConnectorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function agentSpaceConnectorArraySerializer(result: Array<AgentSpaceConnector>): any[] {
  return result.map((item) => {
    return agentSpaceConnectorSerializer(item);
  });
}

export function agentSpaceConnectorArrayDeserializer(result: Array<AgentSpaceConnector>): any[] {
  return result.map((item) => {
    return agentSpaceConnectorDeserializer(item);
  });
}

/** Collection of Agent Space Connectors */
export interface AgentSpaceConnectorCollection {
  /** The AgentSpaceConnector items on this page */
  value: AgentSpaceConnector[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function agentSpaceConnectorCollectionDeserializer(
  item: any,
): AgentSpaceConnectorCollection {
  return {
    value: agentSpaceConnectorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a SupportedAgentModel list operation. */
export interface _SupportedAgentModelListResult {
  /** The SupportedAgentModel items on this page */
  value: SupportedAgentModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _supportedAgentModelListResultDeserializer(
  item: any,
): _SupportedAgentModelListResult {
  return {
    value: supportedAgentModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function supportedAgentModelArrayDeserializer(result: Array<SupportedAgentModel>): any[] {
  return result.map((item) => {
    return supportedAgentModelDeserializer(item);
  });
}

/** Collection of supported AI models */
export interface SupportedAgentModel extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SupportedAgentModelProperties;
}

export function supportedAgentModelDeserializer(item: any): SupportedAgentModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : supportedAgentModelPropertiesDeserializer(item["properties"]),
  };
}

/** Supported AI model properties */
export interface SupportedAgentModelProperties {
  /** The provider name (e.g., MicrosoftFoundry, Anthropic) */
  provider: string;
  /** The display name of the provider (e.g., Microsoft Foundry, Anthropic) */
  providerDisplayName?: string;
  /** The model name (e.g., gpt-5.2, claude-sonnet-4-5) */
  model: string;
  /** The display name of the model (e.g., GPT-5.2, Claude Sonnet 4.5) */
  modelDisplayName?: string;
  /** Billing multiplier for the model (e.g., 1x, 2x) */
  multiplier?: string;
  /** Indicates whether this is the default model */
  default: boolean;
}

export function supportedAgentModelPropertiesDeserializer(
  item: any,
): SupportedAgentModelProperties {
  return {
    provider: item["provider"],
    providerDisplayName: item["providerDisplayName"],
    model: item["model"],
    modelDisplayName: item["modelDisplayName"],
    multiplier: item["multiplier"],
    default: item["default"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** 2026-01-01 version */
  V20260101 = "2026-01-01",
}
