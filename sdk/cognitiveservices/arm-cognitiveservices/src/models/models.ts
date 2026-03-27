// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";
import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Check SKU availability parameter. */
export interface CheckSkuAvailabilityParameter {
  /** The SKU of the resource. */
  skus: string[];
  /** The kind (type) of cognitive service account. */
  kind: string;
  /** The Type of the resource. */
  type: string;
}

export function checkSkuAvailabilityParameterSerializer(item: CheckSkuAvailabilityParameter): any {
  return {
    skus: item["skus"].map((p: any) => {
      return p;
    }),
    kind: item["kind"],
    type: item["type"],
  };
}

/** Check SKU availability result list. */
export interface SkuAvailabilityListResult {
  /** Check SKU availability result list. */
  value?: SkuAvailability[];
}

export function skuAvailabilityListResultDeserializer(item: any): SkuAvailabilityListResult {
  return {
    value: !item["value"] ? item["value"] : skuAvailabilityArrayDeserializer(item["value"]),
  };
}

export function skuAvailabilityArrayDeserializer(result: Array<SkuAvailability>): any[] {
  return result.map((item) => {
    return skuAvailabilityDeserializer(item);
  });
}

/** SKU availability. */
export interface SkuAvailability {
  /** The kind (type) of cognitive service account. */
  kind?: string;
  /** The Type of the resource. */
  type?: string;
  /** The name of SKU. */
  skuName?: string;
  /** Indicates the given SKU is available or not. */
  skuAvailable?: boolean;
  /** Reason why the SKU is not available. */
  reason?: string;
  /** Additional error message. */
  message?: string;
}

export function skuAvailabilityDeserializer(item: any): SkuAvailability {
  return {
    kind: item["kind"],
    type: item["type"],
    skuName: item["skuName"],
    skuAvailable: item["skuAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

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

/** Check Domain availability parameter. */
export interface CheckDomainAvailabilityParameter {
  /** The subdomain name to use. */
  subdomainName: string;
  /** The Type of the resource. */
  type: string;
  /** The kind (type) of cognitive service account. */
  kind?: string;
}

export function checkDomainAvailabilityParameterSerializer(
  item: CheckDomainAvailabilityParameter,
): any {
  return { subdomainName: item["subdomainName"], type: item["type"], kind: item["kind"] };
}

/** Domain availability. */
export interface DomainAvailability {
  /** Indicates the given SKU is available or not. */
  isSubdomainAvailable?: boolean;
  /** Reason why the SKU is not available. */
  reason?: string;
  /** The subdomain name to use. */
  subdomainName?: string;
  /** The Type of the resource. */
  type?: string;
  /** The kind (type) of cognitive service account. */
  kind?: string;
}

export function domainAvailabilityDeserializer(item: any): DomainAvailability {
  return {
    isSubdomainAvailable: item["isSubdomainAvailable"],
    reason: item["reason"],
    subdomainName: item["subdomainName"],
    type: item["type"],
    kind: item["kind"],
  };
}

/** Properties of Cognitive Services account deployment model. */
export interface DeploymentModel {
  /** Deployment model publisher. */
  publisher?: string;
  /** Deployment model format. */
  format?: string;
  /** Deployment model name. */
  name?: string;
  /** Optional. Deployment model version. If version is not specified, a default version will be assigned. The default version is different for different models and might change when there is new version available for a model. Default version for a model could be found from list models API. */
  version?: string;
  /** Optional. Deployment model source ARM resource ID. */
  source?: string;
  /** Optional. Source of the model, another Microsoft.CognitiveServices accounts ARM resource ID. */
  sourceAccount?: string;
  /** The call rate limit Cognitive Services account. */
  readonly callRateLimit?: CallRateLimit;
}

export function deploymentModelSerializer(item: DeploymentModel): any {
  return {
    publisher: item["publisher"],
    format: item["format"],
    name: item["name"],
    version: item["version"],
    source: item["source"],
    sourceAccount: item["sourceAccount"],
  };
}

export function deploymentModelDeserializer(item: any): DeploymentModel {
  return {
    publisher: item["publisher"],
    format: item["format"],
    name: item["name"],
    version: item["version"],
    source: item["source"],
    sourceAccount: item["sourceAccount"],
    callRateLimit: !item["callRateLimit"]
      ? item["callRateLimit"]
      : callRateLimitDeserializer(item["callRateLimit"]),
  };
}

/** The call rate limit Cognitive Services account. */
export interface CallRateLimit {
  /** The count value of Call Rate Limit. */
  count?: number;
  /** The renewal period in seconds of Call Rate Limit. */
  renewalPeriod?: number;
  rules?: ThrottlingRule[];
}

export function callRateLimitDeserializer(item: any): CallRateLimit {
  return {
    count: item["count"],
    renewalPeriod: item["renewalPeriod"],
    rules: !item["rules"] ? item["rules"] : throttlingRuleArrayDeserializer(item["rules"]),
  };
}

export function throttlingRuleArrayDeserializer(result: Array<ThrottlingRule>): any[] {
  return result.map((item) => {
    return throttlingRuleDeserializer(item);
  });
}

/** model interface ThrottlingRule */
export interface ThrottlingRule {
  key?: string;
  renewalPeriod?: number;
  count?: number;
  minCount?: number;
  dynamicThrottlingEnabled?: boolean;
  matchPatterns?: RequestMatchPattern[];
}

export function throttlingRuleDeserializer(item: any): ThrottlingRule {
  return {
    key: item["key"],
    renewalPeriod: item["renewalPeriod"],
    count: item["count"],
    minCount: item["minCount"],
    dynamicThrottlingEnabled: item["dynamicThrottlingEnabled"],
    matchPatterns: !item["matchPatterns"]
      ? item["matchPatterns"]
      : requestMatchPatternArrayDeserializer(item["matchPatterns"]),
  };
}

export function requestMatchPatternArrayDeserializer(result: Array<RequestMatchPattern>): any[] {
  return result.map((item) => {
    return requestMatchPatternDeserializer(item);
  });
}

/** model interface RequestMatchPattern */
export interface RequestMatchPattern {
  path?: string;
  method?: string;
}

export function requestMatchPatternDeserializer(item: any): RequestMatchPattern {
  return {
    path: item["path"],
    method: item["method"],
  };
}

/** Model Capacity Calculator Workload. */
export interface ModelCapacityCalculatorWorkload {
  /** Request per minute. */
  requestPerMinute?: number;
  /** Dictionary, Model Capacity Calculator Workload Parameters. */
  requestParameters?: ModelCapacityCalculatorWorkloadRequestParam;
}

export function modelCapacityCalculatorWorkloadSerializer(
  item: ModelCapacityCalculatorWorkload,
): any {
  return {
    requestPerMinute: item["requestPerMinute"],
    requestParameters: !item["requestParameters"]
      ? item["requestParameters"]
      : modelCapacityCalculatorWorkloadRequestParamSerializer(item["requestParameters"]),
  };
}

/** Dictionary, Model Capacity Calculator Workload Parameters. */
export interface ModelCapacityCalculatorWorkloadRequestParam {
  /** Average prompt tokens. */
  avgPromptTokens?: number;
  /** Average generated tokens. */
  avgGeneratedTokens?: number;
}

export function modelCapacityCalculatorWorkloadRequestParamSerializer(
  item: ModelCapacityCalculatorWorkloadRequestParam,
): any {
  return {
    avgPromptTokens: item["avgPromptTokens"],
    avgGeneratedTokens: item["avgGeneratedTokens"],
  };
}

/** Calculate Model Capacity parameter. */
export interface CalculateModelCapacityParameter {
  /** Properties of Cognitive Services account deployment model. */
  model?: DeploymentModel;
  /** The name of SKU. */
  skuName?: string;
  /** List of Model Capacity Calculator Workload. */
  workloads?: ModelCapacityCalculatorWorkload[];
}

export function calculateModelCapacityParameterSerializer(
  item: CalculateModelCapacityParameter,
): any {
  return {
    model: !item["model"] ? item["model"] : deploymentModelSerializer(item["model"]),
    skuName: item["skuName"],
    workloads: !item["workloads"]
      ? item["workloads"]
      : modelCapacityCalculatorWorkloadArraySerializer(item["workloads"]),
  };
}

export function modelCapacityCalculatorWorkloadArraySerializer(
  result: Array<ModelCapacityCalculatorWorkload>,
): any[] {
  return result.map((item) => {
    return modelCapacityCalculatorWorkloadSerializer(item);
  });
}

/** Calculate Model Capacity result. */
export interface CalculateModelCapacityResult {
  /** Properties of Cognitive Services account deployment model. */
  model?: DeploymentModel;
  skuName?: string;
  /** Model Estimated Capacity. */
  estimatedCapacity?: CalculateModelCapacityResultEstimatedCapacity;
}

export function calculateModelCapacityResultDeserializer(item: any): CalculateModelCapacityResult {
  return {
    model: !item["model"] ? item["model"] : deploymentModelDeserializer(item["model"]),
    skuName: item["skuName"],
    estimatedCapacity: !item["estimatedCapacity"]
      ? item["estimatedCapacity"]
      : calculateModelCapacityResultEstimatedCapacityDeserializer(item["estimatedCapacity"]),
  };
}

/** Model Estimated Capacity. */
export interface CalculateModelCapacityResultEstimatedCapacity {
  value?: number;
  deployableValue?: number;
}

export function calculateModelCapacityResultEstimatedCapacityDeserializer(
  item: any,
): CalculateModelCapacityResultEstimatedCapacity {
  return {
    value: item["value"],
    deployableValue: item["deployableValue"],
  };
}

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  readonly actionType?: ActionType;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
  };
}

/** Localized display information for an operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  readonly provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  readonly resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  readonly operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  readonly description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export enum KnownOrigin {
  /** Indicates the operation is initiated by a user. */
  User = "user",
  /** Indicates the operation is initiated by a system. */
  System = "system",
  /** Indicates the operation is initiated by a user or system. */
  UserSystem = "user,system",
}

/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: Indicates the operation is initiated by a user. \
 * **system**: Indicates the operation is initiated by a system. \
 * **user,system**: Indicates the operation is initiated by a user or system.
 */
export type Origin = string;

/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export enum KnownActionType {
  /** Actions are for internal-only APIs. */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Actions are for internal-only APIs.
 */
export type ActionType = string;

/** Cognitive Services account is an Azure resource representing the provisioned account, it's type, location and SKU. */
export interface Account extends Resource {
  /** Properties of Cognitive Services account. */
  properties?: AccountProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Resource Etag. */
  readonly etag?: string;
  /** The kind (type) of cognitive service account. */
  kind?: string;
  /** The resource model definition representing SKU */
  sku?: Sku;
  /** Identity for the resource. */
  identity?: Identity;
}

export function accountSerializer(item: Account): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : accountPropertiesSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
  };
}

export function accountDeserializer(item: any): Account {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : accountPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    etag: item["etag"],
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
  };
}

/** Properties of Cognitive Services account. */
export interface AccountProperties {
  /** Gets the status of the cognitive services account at the time the operation was called. */
  readonly provisioningState?: ProvisioningState;
  /** Endpoint of the created account. */
  readonly endpoint?: string;
  /** The internal identifier (deprecated, do not use this property). */
  readonly internalId?: string;
  /** Gets the capabilities of the cognitive services account. Each item indicates the capability of a specific feature. The values are read-only and for reference only. */
  readonly capabilities?: SkuCapability[];
  /** If the resource is migrated from an existing key. */
  readonly isMigrated?: boolean;
  /** Resource migration token. */
  migrationToken?: string;
  /** Sku change info of account. */
  readonly skuChangeInfo?: SkuChangeInfo;
  /** Optional subdomain name used for token-based authentication. */
  customSubDomainName?: string;
  /** A collection of rules governing the accessibility from specific network locations. */
  networkAcls?: NetworkRuleSet;
  /** The encryption properties for this resource. */
  encryption?: Encryption;
  /** The storage accounts for this resource. */
  userOwnedStorage?: UserOwnedStorage[];
  /** The user owned AML account properties. */
  amlWorkspace?: UserOwnedAmlWorkspace;
  /** The private endpoint connection associated with the Cognitive Services account. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Whether or not public endpoint access is allowed for this account. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The api properties for special APIs. */
  apiProperties?: ApiProperties;
  /** Gets the date of cognitive services account creation. */
  readonly dateCreated?: string;
  /** The call rate limit Cognitive Services account. */
  readonly callRateLimit?: CallRateLimit;
  /** The flag to enable dynamic throttling. */
  dynamicThrottlingEnabled?: boolean;
  /** The flag to disable stored completions. */
  storedCompletionsDisabled?: boolean;
  readonly quotaLimit?: QuotaLimit;
  restrictOutboundNetworkAccess?: boolean;
  allowedFqdnList?: string[];
  disableLocalAuth?: boolean;
  /** Dictionary of <string> */
  readonly endpoints?: Record<string, string>;
  restore?: boolean;
  /** The deletion date, only available for deleted account. */
  readonly deletionDate?: string;
  /** The scheduled purge date, only available for deleted account. */
  readonly scheduledPurgeDate?: string;
  /** The multiregion settings of Cognitive Services account. */
  locations?: MultiRegionSettings;
  /** The commitment plan associations of Cognitive Services account. */
  readonly commitmentPlanAssociations?: CommitmentPlanAssociation[];
  /** The abuse penalty. */
  readonly abusePenalty?: AbusePenalty;
  /** Cognitive Services Rai Monitor Config. */
  raiMonitorConfig?: RaiMonitorConfig;
  networkInjections?: NetworkInjection[];
  /** Represents the foundry auto-upgrade configuration for a Cognitive Services account. */
  foundryAutoUpgrade?: FoundryAutoUpgrade;
  /** Specifies whether this resource support project management as child resources, used as containers for access management, data isolation and cost in AI Foundry. */
  allowProjectManagement?: boolean;
  /** Specifies the project, by project name, that is targeted when data plane endpoints are called without a project parameter. */
  defaultProject?: string;
  /** Specifies the projects, by project name, that are associated with this resource. */
  associatedProjects?: string[];
}

export function accountPropertiesSerializer(item: AccountProperties): any {
  return {
    migrationToken: item["migrationToken"],
    customSubDomainName: item["customSubDomainName"],
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : networkRuleSetSerializer(item["networkAcls"]),
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    userOwnedStorage: !item["userOwnedStorage"]
      ? item["userOwnedStorage"]
      : userOwnedStorageArraySerializer(item["userOwnedStorage"]),
    amlWorkspace: !item["amlWorkspace"]
      ? item["amlWorkspace"]
      : userOwnedAmlWorkspaceSerializer(item["amlWorkspace"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    apiProperties: !item["apiProperties"]
      ? item["apiProperties"]
      : apiPropertiesSerializer(item["apiProperties"]),
    dynamicThrottlingEnabled: item["dynamicThrottlingEnabled"],
    storedCompletionsDisabled: item["storedCompletionsDisabled"],
    restrictOutboundNetworkAccess: item["restrictOutboundNetworkAccess"],
    allowedFqdnList: !item["allowedFqdnList"]
      ? item["allowedFqdnList"]
      : item["allowedFqdnList"].map((p: any) => {
          return p;
        }),
    disableLocalAuth: item["disableLocalAuth"],
    restore: item["restore"],
    locations: !item["locations"]
      ? item["locations"]
      : multiRegionSettingsSerializer(item["locations"]),
    raiMonitorConfig: !item["raiMonitorConfig"]
      ? item["raiMonitorConfig"]
      : raiMonitorConfigSerializer(item["raiMonitorConfig"]),
    networkInjections: !item["networkInjections"]
      ? item["networkInjections"]
      : networkInjectionArraySerializer(item["networkInjections"]),
    foundryAutoUpgrade: !item["foundryAutoUpgrade"]
      ? item["foundryAutoUpgrade"]
      : foundryAutoUpgradeSerializer(item["foundryAutoUpgrade"]),
    allowProjectManagement: item["allowProjectManagement"],
    defaultProject: item["defaultProject"],
    associatedProjects: !item["associatedProjects"]
      ? item["associatedProjects"]
      : item["associatedProjects"].map((p: any) => {
          return p;
        }),
  };
}

export function accountPropertiesDeserializer(item: any): AccountProperties {
  return {
    provisioningState: item["provisioningState"],
    endpoint: item["endpoint"],
    internalId: item["internalId"],
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : skuCapabilityArrayDeserializer(item["capabilities"]),
    isMigrated: item["isMigrated"],
    migrationToken: item["migrationToken"],
    skuChangeInfo: !item["skuChangeInfo"]
      ? item["skuChangeInfo"]
      : skuChangeInfoDeserializer(item["skuChangeInfo"]),
    customSubDomainName: item["customSubDomainName"],
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : networkRuleSetDeserializer(item["networkAcls"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    userOwnedStorage: !item["userOwnedStorage"]
      ? item["userOwnedStorage"]
      : userOwnedStorageArrayDeserializer(item["userOwnedStorage"]),
    amlWorkspace: !item["amlWorkspace"]
      ? item["amlWorkspace"]
      : userOwnedAmlWorkspaceDeserializer(item["amlWorkspace"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    apiProperties: !item["apiProperties"]
      ? item["apiProperties"]
      : apiPropertiesDeserializer(item["apiProperties"]),
    dateCreated: item["dateCreated"],
    callRateLimit: !item["callRateLimit"]
      ? item["callRateLimit"]
      : callRateLimitDeserializer(item["callRateLimit"]),
    dynamicThrottlingEnabled: item["dynamicThrottlingEnabled"],
    storedCompletionsDisabled: item["storedCompletionsDisabled"],
    quotaLimit: !item["quotaLimit"]
      ? item["quotaLimit"]
      : quotaLimitDeserializer(item["quotaLimit"]),
    restrictOutboundNetworkAccess: item["restrictOutboundNetworkAccess"],
    allowedFqdnList: !item["allowedFqdnList"]
      ? item["allowedFqdnList"]
      : item["allowedFqdnList"].map((p: any) => {
          return p;
        }),
    disableLocalAuth: item["disableLocalAuth"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : Object.fromEntries(
          Object.entries(item["endpoints"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    restore: item["restore"],
    deletionDate: item["deletionDate"],
    scheduledPurgeDate: item["scheduledPurgeDate"],
    locations: !item["locations"]
      ? item["locations"]
      : multiRegionSettingsDeserializer(item["locations"]),
    commitmentPlanAssociations: !item["commitmentPlanAssociations"]
      ? item["commitmentPlanAssociations"]
      : commitmentPlanAssociationArrayDeserializer(item["commitmentPlanAssociations"]),
    abusePenalty: !item["abusePenalty"]
      ? item["abusePenalty"]
      : abusePenaltyDeserializer(item["abusePenalty"]),
    raiMonitorConfig: !item["raiMonitorConfig"]
      ? item["raiMonitorConfig"]
      : raiMonitorConfigDeserializer(item["raiMonitorConfig"]),
    networkInjections: !item["networkInjections"]
      ? item["networkInjections"]
      : networkInjectionArrayDeserializer(item["networkInjections"]),
    foundryAutoUpgrade: !item["foundryAutoUpgrade"]
      ? item["foundryAutoUpgrade"]
      : foundryAutoUpgradeDeserializer(item["foundryAutoUpgrade"]),
    allowProjectManagement: item["allowProjectManagement"],
    defaultProject: item["defaultProject"],
    associatedProjects: !item["associatedProjects"]
      ? item["associatedProjects"]
      : item["associatedProjects"].map((p: any) => {
          return p;
        }),
  };
}

/** Gets the status of the cognitive services account at the time the operation was called. */
export enum KnownProvisioningState {
  /** Accepted */
  Accepted = "Accepted",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Moving */
  Moving = "Moving",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** ResolvingDNS */
  ResolvingDNS = "ResolvingDNS",
}

/**
 * Gets the status of the cognitive services account at the time the operation was called. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted** \
 * **Creating** \
 * **Deleting** \
 * **Moving** \
 * **Failed** \
 * **Succeeded** \
 * **Canceled** \
 * **ResolvingDNS**
 */
export type ProvisioningState = string;

export function skuCapabilityArrayDeserializer(result: Array<SkuCapability>): any[] {
  return result.map((item) => {
    return skuCapabilityDeserializer(item);
  });
}

/** SkuCapability indicates the capability of a certain feature. */
export interface SkuCapability {
  /** The name of the SkuCapability. */
  name?: string;
  /** The value of the SkuCapability. */
  value?: string;
}

export function skuCapabilityDeserializer(item: any): SkuCapability {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Sku change info of account. */
export interface SkuChangeInfo {
  /** Gets the count of downgrades. */
  countOfDowngrades?: number;
  /** Gets the count of upgrades after downgrades. */
  countOfUpgradesAfterDowngrades?: number;
  /** Gets the last change date. */
  lastChangeDate?: string;
}

export function skuChangeInfoDeserializer(item: any): SkuChangeInfo {
  return {
    countOfDowngrades: item["countOfDowngrades"],
    countOfUpgradesAfterDowngrades: item["countOfUpgradesAfterDowngrades"],
    lastChangeDate: item["lastChangeDate"],
  };
}

/** A set of rules governing the network accessibility. */
export interface NetworkRuleSet {
  /** The default action when no rule from ipRules and from virtualNetworkRules match. This is only used after the bypass property has been evaluated. */
  defaultAction?: NetworkRuleAction;
  /** Setting for trusted services. */
  bypass?: ByPassSelection;
  /** The list of IP address rules. */
  ipRules?: IpRule[];
  /** The list of virtual network rules. */
  virtualNetworkRules?: VirtualNetworkRule[];
}

export function networkRuleSetSerializer(item: NetworkRuleSet): any {
  return {
    defaultAction: item["defaultAction"],
    bypass: item["bypass"],
    ipRules: !item["ipRules"] ? item["ipRules"] : ipRuleArraySerializer(item["ipRules"]),
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : virtualNetworkRuleArraySerializer(item["virtualNetworkRules"]),
  };
}

export function networkRuleSetDeserializer(item: any): NetworkRuleSet {
  return {
    defaultAction: item["defaultAction"],
    bypass: item["bypass"],
    ipRules: !item["ipRules"] ? item["ipRules"] : ipRuleArrayDeserializer(item["ipRules"]),
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : virtualNetworkRuleArrayDeserializer(item["virtualNetworkRules"]),
  };
}

/** The default action when no rule from ipRules and from virtualNetworkRules match. This is only used after the bypass property has been evaluated. */
export enum KnownNetworkRuleAction {
  /** Allow */
  Allow = "Allow",
  /** Deny */
  Deny = "Deny",
}

/**
 * The default action when no rule from ipRules and from virtualNetworkRules match. This is only used after the bypass property has been evaluated. \
 * {@link KnownNetworkRuleAction} can be used interchangeably with NetworkRuleAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow** \
 * **Deny**
 */
export type NetworkRuleAction = string;

/** Setting for trusted services. */
export enum KnownByPassSelection {
  /** None */
  None = "None",
  /** AzureServices */
  AzureServices = "AzureServices",
}

/**
 * Setting for trusted services. \
 * {@link KnownByPassSelection} can be used interchangeably with ByPassSelection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **AzureServices**
 */
export type ByPassSelection = string;

export function ipRuleArraySerializer(result: Array<IpRule>): any[] {
  return result.map((item) => {
    return ipRuleSerializer(item);
  });
}

export function ipRuleArrayDeserializer(result: Array<IpRule>): any[] {
  return result.map((item) => {
    return ipRuleDeserializer(item);
  });
}

/** A rule governing the accessibility from a specific ip address or ip range. */
export interface IpRule {
  /** An IPv4 address range in CIDR notation, such as '124.56.78.91' (simple IP address) or '124.56.78.0/24' (all addresses that start with 124.56.78). */
  value: string;
}

export function ipRuleSerializer(item: IpRule): any {
  return { value: item["value"] };
}

export function ipRuleDeserializer(item: any): IpRule {
  return {
    value: item["value"],
  };
}

export function virtualNetworkRuleArraySerializer(result: Array<VirtualNetworkRule>): any[] {
  return result.map((item) => {
    return virtualNetworkRuleSerializer(item);
  });
}

export function virtualNetworkRuleArrayDeserializer(result: Array<VirtualNetworkRule>): any[] {
  return result.map((item) => {
    return virtualNetworkRuleDeserializer(item);
  });
}

/** A rule governing the accessibility from a specific virtual network. */
export interface VirtualNetworkRule {
  /** Full resource id of a vnet subnet, such as '/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/subnet1'. */
  id: string;
  /** Gets the state of virtual network rule. */
  state?: string;
  /** Ignore missing vnet service endpoint or not. */
  ignoreMissingVnetServiceEndpoint?: boolean;
}

export function virtualNetworkRuleSerializer(item: VirtualNetworkRule): any {
  return {
    id: item["id"],
    state: item["state"],
    ignoreMissingVnetServiceEndpoint: item["ignoreMissingVnetServiceEndpoint"],
  };
}

export function virtualNetworkRuleDeserializer(item: any): VirtualNetworkRule {
  return {
    id: item["id"],
    state: item["state"],
    ignoreMissingVnetServiceEndpoint: item["ignoreMissingVnetServiceEndpoint"],
  };
}

/** Properties to configure Encryption */
export interface Encryption {
  /** Properties of KeyVault */
  keyVaultProperties?: KeyVaultProperties;
  /** Enumerates the possible value of keySource for Encryption */
  keySource?: KeySource;
}

export function encryptionSerializer(item: Encryption): any {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
    keySource: item["keySource"],
  };
}

export function encryptionDeserializer(item: any): Encryption {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    keySource: item["keySource"],
  };
}

/** Properties to configure keyVault Properties */
export interface KeyVaultProperties {
  /** Name of the Key from KeyVault */
  keyName?: string;
  /** Version of the Key from KeyVault */
  keyVersion?: string;
  /** Uri of KeyVault */
  keyVaultUri?: string;
  identityClientId?: string;
}

export function keyVaultPropertiesSerializer(item: KeyVaultProperties): any {
  return {
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    keyVaultUri: item["keyVaultUri"],
    identityClientId: item["identityClientId"],
  };
}

export function keyVaultPropertiesDeserializer(item: any): KeyVaultProperties {
  return {
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    keyVaultUri: item["keyVaultUri"],
    identityClientId: item["identityClientId"],
  };
}

/** Enumerates the possible value of keySource for Encryption */
export enum KnownKeySource {
  /** Microsoft.CognitiveServices */
  MicrosoftCognitiveServices = "Microsoft.CognitiveServices",
  /** Microsoft.KeyVault */
  MicrosoftKeyVault = "Microsoft.KeyVault",
}

/**
 * Enumerates the possible value of keySource for Encryption \
 * {@link KnownKeySource} can be used interchangeably with KeySource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.CognitiveServices** \
 * **Microsoft.KeyVault**
 */
export type KeySource = string;

export function userOwnedStorageArraySerializer(result: Array<UserOwnedStorage>): any[] {
  return result.map((item) => {
    return userOwnedStorageSerializer(item);
  });
}

export function userOwnedStorageArrayDeserializer(result: Array<UserOwnedStorage>): any[] {
  return result.map((item) => {
    return userOwnedStorageDeserializer(item);
  });
}

/** The user owned storage for Cognitive Services account. */
export interface UserOwnedStorage {
  /** Full resource id of a Microsoft.Storage resource. */
  resourceId?: string;
  identityClientId?: string;
}

export function userOwnedStorageSerializer(item: UserOwnedStorage): any {
  return { resourceId: item["resourceId"], identityClientId: item["identityClientId"] };
}

export function userOwnedStorageDeserializer(item: any): UserOwnedStorage {
  return {
    resourceId: item["resourceId"],
    identityClientId: item["identityClientId"],
  };
}

/** The user owned AML account for Cognitive Services account. */
export interface UserOwnedAmlWorkspace {
  /** Full resource id of a AML account resource. */
  resourceId?: string;
  /** Identity Client id of a AML account resource. */
  identityClientId?: string;
}

export function userOwnedAmlWorkspaceSerializer(item: UserOwnedAmlWorkspace): any {
  return { resourceId: item["resourceId"], identityClientId: item["identityClientId"] };
}

export function userOwnedAmlWorkspaceDeserializer(item: any): UserOwnedAmlWorkspace {
  return {
    resourceId: item["resourceId"],
    identityClientId: item["identityClientId"],
  };
}

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** The Private Endpoint Connection resource. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** Resource properties. */
  properties?: PrivateEndpointConnectionProperties;
  /** Resource Etag. */
  readonly etag?: string;
  /** The location of the private endpoint connection */
  location?: string;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
    location: item["location"],
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    location: item["location"],
  };
}

/** Properties of the PrivateEndpointConnectProperties. */
export interface PrivateEndpointConnectionProperties {
  /** The resource of private end point. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
  /** The private link resource group ids. */
  groupIds?: string[];
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item["privateLinkServiceConnectionState"],
    ),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    provisioningState: item["provisioningState"],
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
  };
}

/** The private endpoint resource. */
export interface PrivateEndpoint {
  /** The resource identifier of the private endpoint */
  readonly id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return item;
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: PrivateEndpointServiceConnectionStatus;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** The private endpoint connection status. */
export enum KnownPrivateEndpointServiceConnectionStatus {
  /** Connection waiting for approval or rejection */
  Pending = "Pending",
  /** Connection approved */
  Approved = "Approved",
  /** Connection Rejected */
  Rejected = "Rejected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Connection waiting for approval or rejection \
 * **Approved**: Connection approved \
 * **Rejected**: Connection Rejected
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Connection has been provisioned */
  Succeeded = "Succeeded",
  /** Connection is being created */
  Creating = "Creating",
  /** Connection is being deleted */
  Deleting = "Deleting",
  /** Connection provisioning has failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Connection has been provisioned \
 * **Creating**: Connection is being created \
 * **Deleting**: Connection is being deleted \
 * **Failed**: Connection provisioning has failed
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** Whether or not public endpoint access is allowed for this account. */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Whether or not public endpoint access is allowed for this account. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type PublicNetworkAccess = string;

/** The api properties for special APIs. */
export interface ApiProperties {
  /** (QnAMaker Only) The runtime endpoint of QnAMaker. */
  qnaRuntimeEndpoint?: string;
  /** (QnAMaker Only) The Azure Search endpoint key of QnAMaker. */
  qnaAzureSearchEndpointKey?: string;
  /** (QnAMaker Only) The Azure Search endpoint id of QnAMaker. */
  qnaAzureSearchEndpointId?: string;
  /** (Bing Search Only) The flag to enable statistics of Bing Search. */
  statisticsEnabled?: boolean;
  /** (Personalization Only) The flag to enable statistics of Bing Search. */
  eventHubConnectionString?: string;
  /** (Personalization Only) The storage account connection string. */
  storageAccountConnectionString?: string;
  /** (Metrics Advisor Only) The Azure AD Client Id (Application Id). */
  aadClientId?: string;
  /** (Metrics Advisor Only) The Azure AD Tenant Id. */
  aadTenantId?: string;
  /** (Metrics Advisor Only) The super user of Metrics Advisor. */
  superUser?: string;
  /** (Metrics Advisor Only) The website name of Metrics Advisor. */
  websiteName?: string;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function apiPropertiesSerializer(item: ApiProperties): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    qnaRuntimeEndpoint: item["qnaRuntimeEndpoint"],
    qnaAzureSearchEndpointKey: item["qnaAzureSearchEndpointKey"],
    qnaAzureSearchEndpointId: item["qnaAzureSearchEndpointId"],
    statisticsEnabled: item["statisticsEnabled"],
    eventHubConnectionString: item["eventHubConnectionString"],
    storageAccountConnectionString: item["storageAccountConnectionString"],
    aadClientId: item["aadClientId"],
    aadTenantId: item["aadTenantId"],
    superUser: item["superUser"],
    websiteName: item["websiteName"],
  };
}

export function apiPropertiesDeserializer(item: any): ApiProperties {
  return {
    additionalProperties: serializeRecord(item, [
      "qnaRuntimeEndpoint",
      "qnaAzureSearchEndpointKey",
      "qnaAzureSearchEndpointId",
      "statisticsEnabled",
      "eventHubConnectionString",
      "storageAccountConnectionString",
      "aadClientId",
      "aadTenantId",
      "superUser",
      "websiteName",
    ]),
    qnaRuntimeEndpoint: item["qnaRuntimeEndpoint"],
    qnaAzureSearchEndpointKey: item["qnaAzureSearchEndpointKey"],
    qnaAzureSearchEndpointId: item["qnaAzureSearchEndpointId"],
    statisticsEnabled: item["statisticsEnabled"],
    eventHubConnectionString: item["eventHubConnectionString"],
    storageAccountConnectionString: item["storageAccountConnectionString"],
    aadClientId: item["aadClientId"],
    aadTenantId: item["aadTenantId"],
    superUser: item["superUser"],
    websiteName: item["websiteName"],
  };
}

/** model interface QuotaLimit */
export interface QuotaLimit {
  count?: number;
  renewalPeriod?: number;
  rules?: ThrottlingRule[];
}

export function quotaLimitDeserializer(item: any): QuotaLimit {
  return {
    count: item["count"],
    renewalPeriod: item["renewalPeriod"],
    rules: !item["rules"] ? item["rules"] : throttlingRuleArrayDeserializer(item["rules"]),
  };
}

/** The multiregion settings Cognitive Services account. */
export interface MultiRegionSettings {
  /** Multiregion routing methods. */
  routingMethod?: RoutingMethods;
  regions?: RegionSetting[];
}

export function multiRegionSettingsSerializer(item: MultiRegionSettings): any {
  return {
    routingMethod: item["routingMethod"],
    regions: !item["regions"] ? item["regions"] : regionSettingArraySerializer(item["regions"]),
  };
}

export function multiRegionSettingsDeserializer(item: any): MultiRegionSettings {
  return {
    routingMethod: item["routingMethod"],
    regions: !item["regions"] ? item["regions"] : regionSettingArrayDeserializer(item["regions"]),
  };
}

/** Multiregion routing methods. */
export enum KnownRoutingMethods {
  /** Priority */
  Priority = "Priority",
  /** Weighted */
  Weighted = "Weighted",
  /** Performance */
  Performance = "Performance",
}

/**
 * Multiregion routing methods. \
 * {@link KnownRoutingMethods} can be used interchangeably with RoutingMethods,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Priority** \
 * **Weighted** \
 * **Performance**
 */
export type RoutingMethods = string;

export function regionSettingArraySerializer(result: Array<RegionSetting>): any[] {
  return result.map((item) => {
    return regionSettingSerializer(item);
  });
}

export function regionSettingArrayDeserializer(result: Array<RegionSetting>): any[] {
  return result.map((item) => {
    return regionSettingDeserializer(item);
  });
}

/** The call rate limit Cognitive Services account. */
export interface RegionSetting {
  /** Name of the region. */
  name?: string;
  /** A value for priority or weighted routing methods. */
  value?: number;
  /** Maps the region to the regional custom subdomain. */
  customsubdomain?: string;
}

export function regionSettingSerializer(item: RegionSetting): any {
  return { name: item["name"], value: item["value"], customsubdomain: item["customsubdomain"] };
}

export function regionSettingDeserializer(item: any): RegionSetting {
  return {
    name: item["name"],
    value: item["value"],
    customsubdomain: item["customsubdomain"],
  };
}

export function commitmentPlanAssociationArrayDeserializer(
  result: Array<CommitmentPlanAssociation>,
): any[] {
  return result.map((item) => {
    return commitmentPlanAssociationDeserializer(item);
  });
}

/** The commitment plan association. */
export interface CommitmentPlanAssociation {
  /** The Azure resource id of the commitment plan. */
  commitmentPlanId?: string;
  /** The location of of the commitment plan. */
  commitmentPlanLocation?: string;
}

export function commitmentPlanAssociationDeserializer(item: any): CommitmentPlanAssociation {
  return {
    commitmentPlanId: item["commitmentPlanId"],
    commitmentPlanLocation: item["commitmentPlanLocation"],
  };
}

/** The abuse penalty. */
export interface AbusePenalty {
  /** The action of AbusePenalty. */
  action?: AbusePenaltyAction;
  /** The percentage of rate limit. */
  rateLimitPercentage?: number;
  /** The datetime of expiration of the AbusePenalty. */
  expiration?: Date;
}

export function abusePenaltyDeserializer(item: any): AbusePenalty {
  return {
    action: item["action"],
    rateLimitPercentage: item["rateLimitPercentage"],
    expiration: !item["expiration"] ? item["expiration"] : new Date(item["expiration"]),
  };
}

/** The action of AbusePenalty. */
export enum KnownAbusePenaltyAction {
  /** Throttle */
  Throttle = "Throttle",
  /** Block */
  Block = "Block",
}

/**
 * The action of AbusePenalty. \
 * {@link KnownAbusePenaltyAction} can be used interchangeably with AbusePenaltyAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Throttle** \
 * **Block**
 */
export type AbusePenaltyAction = string;

/** Cognitive Services Rai Monitor Config. */
export interface RaiMonitorConfig {
  /** The storage resource Id. */
  adxStorageResourceId?: string;
  /** The identity client Id to access the storage. */
  identityClientId?: string;
}

export function raiMonitorConfigSerializer(item: RaiMonitorConfig): any {
  return {
    adxStorageResourceId: item["adxStorageResourceId"],
    identityClientId: item["identityClientId"],
  };
}

export function raiMonitorConfigDeserializer(item: any): RaiMonitorConfig {
  return {
    adxStorageResourceId: item["adxStorageResourceId"],
    identityClientId: item["identityClientId"],
  };
}

export function networkInjectionArraySerializer(result: Array<NetworkInjection>): any[] {
  return result.map((item) => {
    return networkInjectionSerializer(item);
  });
}

export function networkInjectionArrayDeserializer(result: Array<NetworkInjection>): any[] {
  return result.map((item) => {
    return networkInjectionDeserializer(item);
  });
}

/** Specifies in AI Foundry where virtual network injection occurs to secure scenarios like Agents entirely within the user's private network, eliminating public internet exposure while maintaining control over network configurations and resources. */
export interface NetworkInjection {
  /** Specifies what features in AI Foundry network injection applies to. Currently only supports 'agent' for agent scenarios. 'none' means no network injection. */
  scenario?: ScenarioType;
  /** Specify the subnet for which your Agent Client is injected into. */
  subnetArmId?: string;
  /** Boolean to enable Microsoft Managed Network for subnet delegation */
  useMicrosoftManagedNetwork?: boolean;
}

export function networkInjectionSerializer(item: NetworkInjection): any {
  return {
    scenario: item["scenario"],
    subnetArmId: item["subnetArmId"],
    useMicrosoftManagedNetwork: item["useMicrosoftManagedNetwork"],
  };
}

export function networkInjectionDeserializer(item: any): NetworkInjection {
  return {
    scenario: item["scenario"],
    subnetArmId: item["subnetArmId"],
    useMicrosoftManagedNetwork: item["useMicrosoftManagedNetwork"],
  };
}

/** Specifies what features in AI Foundry network injection applies to. Currently only supports 'agent' for agent scenarios. 'none' means no network injection. */
export enum KnownScenarioType {
  /** none */
  None = "none",
  /** agent */
  Agent = "agent",
}

/**
 * Specifies what features in AI Foundry network injection applies to. Currently only supports 'agent' for agent scenarios. 'none' means no network injection. \
 * {@link KnownScenarioType} can be used interchangeably with ScenarioType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **none** \
 * **agent**
 */
export type ScenarioType = string;

/**
 * Represents the foundry auto-upgrade configuration for a Cognitive Services account.
 * Customers can opt out of auto-upgrade by setting mode to Disabled.
 */
export interface FoundryAutoUpgrade {
  /** Gets or sets the auto-upgrade mode. */
  mode?: FoundryAutoUpgradeMode;
  /** Gets or sets a value indicating whether the auto-upgrade is planned by Microsoft. */
  plannedByMicrosoft?: boolean;
  /** Gets or sets the status reason for the auto-upgrade configuration. */
  statusReason?: string;
  /** Gets or sets the scheduled time for the auto-upgrade. */
  scheduledAt?: Date;
}

export function foundryAutoUpgradeSerializer(item: FoundryAutoUpgrade): any {
  return {
    mode: item["mode"],
    plannedByMicrosoft: item["plannedByMicrosoft"],
    statusReason: item["statusReason"],
    scheduledAt: !item["scheduledAt"] ? item["scheduledAt"] : item["scheduledAt"].toISOString(),
  };
}

export function foundryAutoUpgradeDeserializer(item: any): FoundryAutoUpgrade {
  return {
    mode: item["mode"],
    plannedByMicrosoft: item["plannedByMicrosoft"],
    statusReason: item["statusReason"],
    scheduledAt: !item["scheduledAt"] ? item["scheduledAt"] : new Date(item["scheduledAt"]),
  };
}

/** Represents the mode for foundry auto-upgrade configuration. */
export enum KnownFoundryAutoUpgradeMode {
  /** Auto-upgrade is enabled. */
  Enabled = "Enabled",
  /** Auto-upgrade is disabled (opted out). */
  Disabled = "Disabled",
}

/**
 * Represents the mode for foundry auto-upgrade configuration. \
 * {@link KnownFoundryAutoUpgradeMode} can be used interchangeably with FoundryAutoUpgradeMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Auto-upgrade is enabled. \
 * **Disabled**: Auto-upgrade is disabled (opted out).
 */
export type FoundryAutoUpgradeMode = string;

/** The resource model definition representing SKU */
export interface Sku {
  /** The name of the SKU. Ex - P3. It is typically a letter+number code */
  name: string;
  /** This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT. */
  tier?: SkuTier;
  /** The SKU size. When the name field is the combination of tier and some other value, this would be the standalone code. */
  size?: string;
  /** If the service has different generations of hardware, for the same SKU, then that can be captured here. */
  family?: string;
  /** If the SKU supports scale out/in then the capacity integer should be included. If scale out/in is not possible for the resource this may be omitted. */
  capacity?: number;
}

export function skuSerializer(item: Sku): any {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT. */
export enum KnownSkuTier {
  /** Free */
  Free = "Free",
  /** Basic */
  Basic = "Basic",
  /** Standard */
  Standard = "Standard",
  /** Premium */
  Premium = "Premium",
  /** Enterprise */
  Enterprise = "Enterprise",
}

/**
 * This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT. \
 * {@link KnownSkuTier} can be used interchangeably with SkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Free** \
 * **Basic** \
 * **Standard** \
 * **Premium** \
 * **Enterprise**
 */
export type SkuTier = string;

/** Identity for the resource. */
export interface Identity {
  /** The identity type. */
  type?: ResourceIdentityType;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The list of user assigned identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName} */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function identitySerializer(item: Identity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityDeserializer(item: any): Identity {
  return {
    type: item["type"],
    tenantId: item["tenantId"],
    principalId: item["principalId"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The identity type. */
export type ResourceIdentityType =
  | "None"
  | "SystemAssigned"
  | "UserAssigned"
  | "SystemAssigned, UserAssigned";

export function userAssignedIdentityRecordSerializer(
  item: Record<string, UserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

/** User-assigned managed identity. */
export interface UserAssignedIdentity {
  /** Azure Active Directory principal ID associated with this Identity. */
  readonly principalId?: string;
  /** Client App Id associated with this identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return item;
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

export function resourceSerializer(item: Resource): any {
  return item;
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

/** The list of cognitive services accounts operation response. */
export interface _AccountListResult {
  /** The link used to get the next page of accounts. */
  nextLink?: string;
  /** Gets the list of Cognitive Services accounts and their properties. */
  readonly value?: Account[];
}

export function _accountListResultDeserializer(item: any): _AccountListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : accountArrayDeserializer(item["value"]),
  };
}

export function accountArraySerializer(result: Array<Account>): any[] {
  return result.map((item) => {
    return accountSerializer(item);
  });
}

export function accountArrayDeserializer(result: Array<Account>): any[] {
  return result.map((item) => {
    return accountDeserializer(item);
  });
}

/** The access keys for the cognitive services account. */
export interface ApiKeys {
  /** Gets the value of key 1. */
  key1?: string;
  /** Gets the value of key 2. */
  key2?: string;
}

export function apiKeysDeserializer(item: any): ApiKeys {
  return {
    key1: item["key1"],
    key2: item["key2"],
  };
}

/** Regenerate key parameters. */
export interface RegenerateKeyParameters {
  /** key name to generate (Key1|Key2) */
  keyName: KeyName;
}

export function regenerateKeyParametersSerializer(item: RegenerateKeyParameters): any {
  return { keyName: item["keyName"] };
}

/** key name to generate (Key1|Key2) */
export type KeyName = "Key1" | "Key2";

/** The list of cognitive services accounts operation response. */
export interface AccountSkuListResult {
  /** Gets the list of Cognitive Services accounts and their properties. */
  value?: AccountSku[];
}

export function accountSkuListResultDeserializer(item: any): AccountSkuListResult {
  return {
    value: !item["value"] ? item["value"] : accountSkuArrayDeserializer(item["value"]),
  };
}

export function accountSkuArrayDeserializer(result: Array<AccountSku>): any[] {
  return result.map((item) => {
    return accountSkuDeserializer(item);
  });
}

/** Cognitive Services resource type and SKU. */
export interface AccountSku {
  /** Resource Namespace and Type */
  resourceType?: string;
  /** The SKU of Cognitive Services account. */
  sku?: Sku;
}

export function accountSkuDeserializer(item: any): AccountSku {
  return {
    resourceType: item["resourceType"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** The response to a list usage request. */
export interface _UsageListResult {
  /** The link used to get the next page of Usages. */
  nextLink?: string;
  /** The list of usages for Cognitive Service account. */
  value?: Usage[];
}

export function _usageListResultDeserializer(item: any): _UsageListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : usageArrayDeserializer(item["value"]),
  };
}

export function usageArrayDeserializer(result: Array<Usage>): any[] {
  return result.map((item) => {
    return usageDeserializer(item);
  });
}

/** The usage data for a usage request. */
export interface Usage {
  /** The unit of the metric. */
  unit?: UnitType;
  /** The name information for the metric. */
  name?: MetricName;
  /** The quota period used to summarize the usage values. */
  quotaPeriod?: string;
  /** Maximum value for this metric. */
  limit?: number;
  /** Current value for this metric. */
  currentValue?: number;
  /** Next reset time for current quota. */
  nextResetTime?: string;
  /** Cognitive Services account quota usage status. */
  status?: QuotaUsageStatus;
  /** The scope type of the quota usage. */
  scopeType?: QuotaScopeType;
  /** The scope identifier of the quota usage. */
  scopeId?: string;
}

export function usageDeserializer(item: any): Usage {
  return {
    unit: item["unit"],
    name: !item["name"] ? item["name"] : metricNameDeserializer(item["name"]),
    quotaPeriod: item["quotaPeriod"],
    limit: item["limit"],
    currentValue: item["currentValue"],
    nextResetTime: item["nextResetTime"],
    status: item["status"],
    scopeType: item["scopeType"],
    scopeId: item["scopeId"],
  };
}

/** The unit of the metric. */
export enum KnownUnitType {
  /** Count */
  Count = "Count",
  /** Bytes */
  Bytes = "Bytes",
  /** Seconds */
  Seconds = "Seconds",
  /** Percent */
  Percent = "Percent",
  /** CountPerSecond */
  CountPerSecond = "CountPerSecond",
  /** BytesPerSecond */
  BytesPerSecond = "BytesPerSecond",
  /** Milliseconds */
  Milliseconds = "Milliseconds",
}

/**
 * The unit of the metric. \
 * {@link KnownUnitType} can be used interchangeably with UnitType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Count** \
 * **Bytes** \
 * **Seconds** \
 * **Percent** \
 * **CountPerSecond** \
 * **BytesPerSecond** \
 * **Milliseconds**
 */
export type UnitType = string;

/** A metric name. */
export interface MetricName {
  /** The name of the metric. */
  value?: string;
  /** The friendly name of the metric. */
  localizedValue?: string;
}

export function metricNameDeserializer(item: any): MetricName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** Cognitive Services account quota usage status. */
export enum KnownQuotaUsageStatus {
  /** Included */
  Included = "Included",
  /** Blocked */
  Blocked = "Blocked",
  /** InOverage */
  InOverage = "InOverage",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * Cognitive Services account quota usage status. \
 * {@link KnownQuotaUsageStatus} can be used interchangeably with QuotaUsageStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Included** \
 * **Blocked** \
 * **InOverage** \
 * **Unknown**
 */
export type QuotaUsageStatus = string;

/** The quota scope that determines the level at which the quota is applied. */
export enum KnownQuotaScopeType {
  /** Regional */
  Regional = "Regional",
  /** Global */
  Global = "Global",
  /** DataZone */
  DataZone = "DataZone",
  /** Classic */
  Classic = "Classic",
}

/**
 * The quota scope that determines the level at which the quota is applied. \
 * {@link KnownQuotaScopeType} can be used interchangeably with QuotaScopeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regional** \
 * **Global** \
 * **DataZone** \
 * **Classic**
 */
export type QuotaScopeType = string;

/** The list of cognitive services accounts operation response. */
export interface _AccountModelListResult {
  /** The link used to get the next page of Model. */
  nextLink?: string;
  /** Gets the list of Cognitive Services accounts Model and their properties. */
  value?: AccountModel[];
}

export function _accountModelListResultDeserializer(item: any): _AccountModelListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : accountModelArrayDeserializer(item["value"]),
  };
}

export function accountModelArrayDeserializer(result: Array<AccountModel>): any[] {
  return result.map((item) => {
    return accountModelDeserializer(item);
  });
}

/** Cognitive Services account Model. */
export interface AccountModel extends DeploymentModel {
  /** Properties of Cognitive Services account deployment model. */
  baseModel?: DeploymentModel;
  /** If the model is default version. */
  isDefaultVersion?: boolean;
  /** The list of Model Sku. */
  skus?: ModelSku[];
  /** The max capacity. */
  maxCapacity?: number;
  /** The capabilities. */
  capabilities?: Record<string, string>;
  /** The capabilities for finetune models. */
  finetuneCapabilities?: Record<string, string>;
  /** Cognitive Services account ModelDeprecationInfo. */
  deprecation?: ModelDeprecationInfo;
  /** Configuration for model replacement. */
  replacementConfig?: ReplacementConfig;
  /** Asset identifier for the model in the model catalog. */
  modelCatalogAssetId?: string;
  /** Model lifecycle status. */
  lifecycleStatus?: ModelLifecycleStatus;
  /** Metadata pertaining to creation and last modification of the resource. */
  readonly systemData?: SystemData;
}

export function accountModelDeserializer(item: any): AccountModel {
  return {
    publisher: item["publisher"],
    format: item["format"],
    name: item["name"],
    version: item["version"],
    source: item["source"],
    sourceAccount: item["sourceAccount"],
    callRateLimit: !item["callRateLimit"]
      ? item["callRateLimit"]
      : callRateLimitDeserializer(item["callRateLimit"]),
    baseModel: !item["baseModel"]
      ? item["baseModel"]
      : deploymentModelDeserializer(item["baseModel"]),
    isDefaultVersion: item["isDefaultVersion"],
    skus: !item["skus"] ? item["skus"] : modelSkuArrayDeserializer(item["skus"]),
    maxCapacity: item["maxCapacity"],
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : Object.fromEntries(
          Object.entries(item["capabilities"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    finetuneCapabilities: !item["finetuneCapabilities"]
      ? item["finetuneCapabilities"]
      : Object.fromEntries(
          Object.entries(item["finetuneCapabilities"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    deprecation: !item["deprecation"]
      ? item["deprecation"]
      : modelDeprecationInfoDeserializer(item["deprecation"]),
    replacementConfig: !item["replacementConfig"]
      ? item["replacementConfig"]
      : replacementConfigDeserializer(item["replacementConfig"]),
    modelCatalogAssetId: item["modelCatalogAssetId"],
    lifecycleStatus: item["lifecycleStatus"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

export function modelSkuArrayDeserializer(result: Array<ModelSku>): any[] {
  return result.map((item) => {
    return modelSkuDeserializer(item);
  });
}

/** Describes an available Cognitive Services Model SKU. */
export interface ModelSku {
  /** The name of the model SKU. */
  name?: string;
  /** The usage name of the model SKU. */
  usageName?: string;
  /** The datetime of deprecation of the model SKU. */
  deprecationDate?: Date;
  /** The capacity configuration. */
  capacity?: CapacityConfig;
  /** The list of rateLimit. */
  rateLimits?: CallRateLimit[];
  /** The list of billing meter info. */
  cost?: BillingMeterInfo[];
}

export function modelSkuDeserializer(item: any): ModelSku {
  return {
    name: item["name"],
    usageName: item["usageName"],
    deprecationDate: !item["deprecationDate"]
      ? item["deprecationDate"]
      : new Date(item["deprecationDate"]),
    capacity: !item["capacity"] ? item["capacity"] : capacityConfigDeserializer(item["capacity"]),
    rateLimits: !item["rateLimits"]
      ? item["rateLimits"]
      : callRateLimitArrayDeserializer(item["rateLimits"]),
    cost: !item["cost"] ? item["cost"] : billingMeterInfoArrayDeserializer(item["cost"]),
  };
}

/** The capacity configuration. */
export interface CapacityConfig {
  /** The minimum capacity. */
  minimum?: number;
  /** The maximum capacity. */
  maximum?: number;
  /** The minimal incremental between allowed values for capacity. */
  step?: number;
  /** The default capacity. */
  default?: number;
  /** The array of allowed values for capacity. */
  allowedValues?: number[];
}

export function capacityConfigDeserializer(item: any): CapacityConfig {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    step: item["step"],
    default: item["default"],
    allowedValues: !item["allowedValues"]
      ? item["allowedValues"]
      : item["allowedValues"].map((p: any) => {
          return p;
        }),
  };
}

export function callRateLimitArrayDeserializer(result: Array<CallRateLimit>): any[] {
  return result.map((item) => {
    return callRateLimitDeserializer(item);
  });
}

export function billingMeterInfoArrayDeserializer(result: Array<BillingMeterInfo>): any[] {
  return result.map((item) => {
    return billingMeterInfoDeserializer(item);
  });
}

/** model interface BillingMeterInfo */
export interface BillingMeterInfo {
  name?: string;
  meterId?: string;
  unit?: string;
}

export function billingMeterInfoDeserializer(item: any): BillingMeterInfo {
  return {
    name: item["name"],
    meterId: item["meterId"],
    unit: item["unit"],
  };
}

/** Cognitive Services account ModelDeprecationInfo. */
export interface ModelDeprecationInfo {
  /** The datetime of deprecation of the fineTune Model. */
  fineTune?: string;
  /** The datetime of deprecation of the inference Model. */
  inference?: string;
  /** Indicates whether the deprecation date is a confirmed planned end-of-life date or an estimated deprecation date. When 'Planned', the deprecation date represents a confirmed and communicated model end-of-life date. When 'Tentative', the deprecation date is an estimated timeline that may be subject to change. */
  deprecationStatus?: DeprecationStatus;
}

export function modelDeprecationInfoDeserializer(item: any): ModelDeprecationInfo {
  return {
    fineTune: item["fineTune"],
    inference: item["inference"],
    deprecationStatus: item["deprecationStatus"],
  };
}

/** Indicates whether the deprecation date is a confirmed planned end-of-life date or an estimated deprecation date. When 'Planned', the deprecation date represents a confirmed and communicated model end-of-life date. When 'Tentative', the deprecation date is an estimated timeline that may be subject to change. */
export enum KnownDeprecationStatus {
  /** Planned */
  Planned = "Planned",
  /** Tentative */
  Tentative = "Tentative",
}

/**
 * Indicates whether the deprecation date is a confirmed planned end-of-life date or an estimated deprecation date. When 'Planned', the deprecation date represents a confirmed and communicated model end-of-life date. When 'Tentative', the deprecation date is an estimated timeline that may be subject to change. \
 * {@link KnownDeprecationStatus} can be used interchangeably with DeprecationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Planned** \
 * **Tentative**
 */
export type DeprecationStatus = string;

/** Configuration for model replacement. */
export interface ReplacementConfig {
  /** The name of the replacement model. */
  targetModelName?: string;
  /** The version of the replacement model. */
  targetModelVersion?: string;
  /** The date when automatic upgrade should start. This applies to deployments with the OnceNewDefaultVersionAvailable upgrade option. */
  autoUpgradeStartDate?: Date;
  /** The number of days before deprecation date to trigger upgrade. This applies to deployments with the OnceCurrentVersionExpired upgrade option. */
  upgradeOnExpiryLeadTimeDays?: number;
}

export function replacementConfigDeserializer(item: any): ReplacementConfig {
  return {
    targetModelName: item["targetModelName"],
    targetModelVersion: item["targetModelVersion"],
    autoUpgradeStartDate: !item["autoUpgradeStartDate"]
      ? item["autoUpgradeStartDate"]
      : new Date(item["autoUpgradeStartDate"]),
    upgradeOnExpiryLeadTimeDays: item["upgradeOnExpiryLeadTimeDays"],
  };
}

/** Model lifecycle status. */
export enum KnownModelLifecycleStatus {
  /** Legacy state. Replaced with GenerallyAvailable going forward. */
  Stable = "Stable",
  /** Model is in preview and may be subject to changes. */
  Preview = "Preview",
  /** Model is generally available for production use. */
  GenerallyAvailable = "GenerallyAvailable",
  /** Model is being deprecated and will be removed in the future. Only customers with existing deployments can create new deployments with this model. */
  Deprecating = "Deprecating",
  /** Model has been deprecated, also known as retired, and is no longer supported. Inference calls to deployments of models in this lifecycle state will return 410 errors. */
  Deprecated = "Deprecated",
  /** Model is a legacy version that is no longer recommended for use. Customers should migrate to newer models. Check replacementConfig for upgrade information. */
  Legacy = "Legacy",
}

/**
 * Model lifecycle status. \
 * {@link KnownModelLifecycleStatus} can be used interchangeably with ModelLifecycleStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Stable**: Legacy state. Replaced with GenerallyAvailable going forward. \
 * **Preview**: Model is in preview and may be subject to changes. \
 * **GenerallyAvailable**: Model is generally available for production use. \
 * **Deprecating**: Model is being deprecated and will be removed in the future. Only customers with existing deployments can create new deployments with this model. \
 * **Deprecated**: Model has been deprecated, also known as retired, and is no longer supported. Inference calls to deployments of models in this lifecycle state will return 410 errors. \
 * **Legacy**: Model is a legacy version that is no longer recommended for use. Customers should migrate to newer models. Check replacementConfig for upgrade information.
 */
export type ModelLifecycleStatus = string;

/** A list of private endpoint connections */
export interface PrivateEndpointConnectionListResult {
  /** Array of private endpoint connections */
  value?: PrivateEndpointConnection[];
}

export function privateEndpointConnectionListResultDeserializer(
  item: any,
): PrivateEndpointConnectionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : privateEndpointConnectionArrayDeserializer(item["value"]),
  };
}

/** Cognitive Services account deployment. */
export interface Deployment extends ProxyResource {
  /** Properties of Cognitive Services account deployment. */
  properties?: DeploymentProperties;
  /** The resource model definition representing SKU */
  sku?: Sku;
  /** Resource Etag. */
  readonly etag?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function deploymentSerializer(item: Deployment): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : deploymentPropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    tags: item["tags"],
  };
}

export function deploymentDeserializer(item: any): Deployment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : deploymentPropertiesDeserializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Properties of Cognitive Services account deployment. */
export interface DeploymentProperties {
  /** Gets the status of the resource at the time the operation was called. */
  readonly provisioningState?: DeploymentProvisioningState;
  /** Properties of Cognitive Services account deployment model. */
  model?: DeploymentModel;
  /** Properties of Cognitive Services account deployment model. (Deprecated, please use Deployment.sku instead.) */
  scaleSettings?: DeploymentScaleSettings;
  /** The capabilities. */
  readonly capabilities?: Record<string, string>;
  /** The name of RAI policy. */
  raiPolicyName?: string;
  /** The call rate limit Cognitive Services account. */
  readonly callRateLimit?: CallRateLimit;
  readonly rateLimits?: ThrottlingRule[];
  /** Deployment model version upgrade option. */
  versionUpgradeOption?: DeploymentModelVersionUpgradeOption;
  /** If the dynamic throttling is enabled. */
  readonly dynamicThrottlingEnabled?: boolean;
  /** The current capacity. */
  currentCapacity?: number;
  /** Internal use only. */
  capacitySettings?: DeploymentCapacitySettings;
  /** The name of parent deployment. */
  parentDeploymentName?: string;
  /** Specifies the deployment name that should serve requests when the request would have otherwise been throttled due to reaching current deployment throughput limit. */
  spilloverDeploymentName?: string;
  /** The service tier for the deployment. Determines the pricing and performance level for request processing. Use 'Default' for standard pricing or 'Priority' for higher-priority processing with premium pricing. Note: Pause operations are only supported on Standard, DataZoneStandard, and GlobalStandard SKUs. */
  serviceTier?: ServiceTier;
  /** The state of the deployment. Controls whether the deployment is accepting inference requests. Use 'Running' for active deployments that process requests, or 'Paused' to temporarily stop inference while preserving the deployment configuration. */
  deploymentState?: DeploymentState;
  /** Routing configuration for the deployment. This property is only applicable when the deployed model is 'model-router' version 2025-11-18 or later. Allows you to select the models subset for routing and the routing mode (balanced, accuracy, cost) for routing across all supported models or the model subset. */
  routing?: DeploymentRouting;
}

export function deploymentPropertiesSerializer(item: DeploymentProperties): any {
  return {
    model: !item["model"] ? item["model"] : deploymentModelSerializer(item["model"]),
    scaleSettings: !item["scaleSettings"]
      ? item["scaleSettings"]
      : deploymentScaleSettingsSerializer(item["scaleSettings"]),
    raiPolicyName: item["raiPolicyName"],
    versionUpgradeOption: item["versionUpgradeOption"],
    currentCapacity: item["currentCapacity"],
    capacitySettings: !item["capacitySettings"]
      ? item["capacitySettings"]
      : deploymentCapacitySettingsSerializer(item["capacitySettings"]),
    parentDeploymentName: item["parentDeploymentName"],
    spilloverDeploymentName: item["spilloverDeploymentName"],
    serviceTier: item["serviceTier"],
    deploymentState: item["deploymentState"],
    routing: !item["routing"] ? item["routing"] : deploymentRoutingSerializer(item["routing"]),
  };
}

export function deploymentPropertiesDeserializer(item: any): DeploymentProperties {
  return {
    provisioningState: item["provisioningState"],
    model: !item["model"] ? item["model"] : deploymentModelDeserializer(item["model"]),
    scaleSettings: !item["scaleSettings"]
      ? item["scaleSettings"]
      : deploymentScaleSettingsDeserializer(item["scaleSettings"]),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : Object.fromEntries(
          Object.entries(item["capabilities"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    raiPolicyName: item["raiPolicyName"],
    callRateLimit: !item["callRateLimit"]
      ? item["callRateLimit"]
      : callRateLimitDeserializer(item["callRateLimit"]),
    rateLimits: !item["rateLimits"]
      ? item["rateLimits"]
      : throttlingRuleArrayDeserializer(item["rateLimits"]),
    versionUpgradeOption: item["versionUpgradeOption"],
    dynamicThrottlingEnabled: item["dynamicThrottlingEnabled"],
    currentCapacity: item["currentCapacity"],
    capacitySettings: !item["capacitySettings"]
      ? item["capacitySettings"]
      : deploymentCapacitySettingsDeserializer(item["capacitySettings"]),
    parentDeploymentName: item["parentDeploymentName"],
    spilloverDeploymentName: item["spilloverDeploymentName"],
    serviceTier: item["serviceTier"],
    deploymentState: item["deploymentState"],
    routing: !item["routing"] ? item["routing"] : deploymentRoutingDeserializer(item["routing"]),
  };
}

/** Gets the status of the resource at the time the operation was called. */
export enum KnownDeploymentProvisioningState {
  /** Accepted */
  Accepted = "Accepted",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Moving */
  Moving = "Moving",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Disabled */
  Disabled = "Disabled",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Gets the status of the resource at the time the operation was called. \
 * {@link KnownDeploymentProvisioningState} can be used interchangeably with DeploymentProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted** \
 * **Creating** \
 * **Deleting** \
 * **Moving** \
 * **Failed** \
 * **Succeeded** \
 * **Disabled** \
 * **Canceled**
 */
export type DeploymentProvisioningState = string;

/** Properties of Cognitive Services account deployment model. (Deprecated, please use Deployment.sku instead.) */
export interface DeploymentScaleSettings {
  /** Deployment scale type. */
  scaleType?: DeploymentScaleType;
  /** Deployment capacity. */
  capacity?: number;
  /** Deployment active capacity. This value might be different from `capacity` if customer recently updated `capacity`. */
  readonly activeCapacity?: number;
}

export function deploymentScaleSettingsSerializer(item: DeploymentScaleSettings): any {
  return { scaleType: item["scaleType"], capacity: item["capacity"] };
}

export function deploymentScaleSettingsDeserializer(item: any): DeploymentScaleSettings {
  return {
    scaleType: item["scaleType"],
    capacity: item["capacity"],
    activeCapacity: item["activeCapacity"],
  };
}

/** Deployment scale type. */
export enum KnownDeploymentScaleType {
  /** Standard */
  Standard = "Standard",
  /** Manual */
  Manual = "Manual",
}

/**
 * Deployment scale type. \
 * {@link KnownDeploymentScaleType} can be used interchangeably with DeploymentScaleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard** \
 * **Manual**
 */
export type DeploymentScaleType = string;

/** Deployment model version upgrade option. */
export enum KnownDeploymentModelVersionUpgradeOption {
  /** OnceNewDefaultVersionAvailable */
  OnceNewDefaultVersionAvailable = "OnceNewDefaultVersionAvailable",
  /** OnceCurrentVersionExpired */
  OnceCurrentVersionExpired = "OnceCurrentVersionExpired",
  /** NoAutoUpgrade */
  NoAutoUpgrade = "NoAutoUpgrade",
}

/**
 * Deployment model version upgrade option. \
 * {@link KnownDeploymentModelVersionUpgradeOption} can be used interchangeably with DeploymentModelVersionUpgradeOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OnceNewDefaultVersionAvailable** \
 * **OnceCurrentVersionExpired** \
 * **NoAutoUpgrade**
 */
export type DeploymentModelVersionUpgradeOption = string;

/** Internal use only. */
export interface DeploymentCapacitySettings {
  /** The designated capacity. */
  designatedCapacity?: number;
  /** The priority of this capacity setting. */
  priority?: number;
}

export function deploymentCapacitySettingsSerializer(item: DeploymentCapacitySettings): any {
  return { designatedCapacity: item["designatedCapacity"], priority: item["priority"] };
}

export function deploymentCapacitySettingsDeserializer(item: any): DeploymentCapacitySettings {
  return {
    designatedCapacity: item["designatedCapacity"],
    priority: item["priority"],
  };
}

/** The service tier for the deployment. Determines the pricing and performance level for request processing. Use 'Default' for standard pricing or 'Priority' for higher-priority processing with premium pricing. Note: Pause operations are only supported on Standard, DataZoneStandard, and GlobalStandard SKUs. */
export enum KnownServiceTier {
  /** Default service tier meaning the request will be processed with the standard pricing and performance for the selected model. */
  Default = "Default",
  /** Priority service tier meaning the request will be processed with higher pricing and performance for the selected model. */
  Priority = "Priority",
}

/**
 * The service tier for the deployment. Determines the pricing and performance level for request processing. Use 'Default' for standard pricing or 'Priority' for higher-priority processing with premium pricing. Note: Pause operations are only supported on Standard, DataZoneStandard, and GlobalStandard SKUs. \
 * {@link KnownServiceTier} can be used interchangeably with ServiceTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default service tier meaning the request will be processed with the standard pricing and performance for the selected model. \
 * **Priority**: Priority service tier meaning the request will be processed with higher pricing and performance for the selected model.
 */
export type ServiceTier = string;

/** The state of the deployment. Controls whether the deployment is accepting inference requests. Use 'Running' for active deployments that process requests, or 'Paused' to temporarily stop inference while preserving the deployment configuration. */
export enum KnownDeploymentState {
  /** The deployment is running and accepting inference requests. */
  Running = "Running",
  /** The deployment is paused and not accepting inference requests. */
  Paused = "Paused",
}

/**
 * The state of the deployment. Controls whether the deployment is accepting inference requests. Use 'Running' for active deployments that process requests, or 'Paused' to temporarily stop inference while preserving the deployment configuration. \
 * {@link KnownDeploymentState} can be used interchangeably with DeploymentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running**: The deployment is running and accepting inference requests. \
 * **Paused**: The deployment is paused and not accepting inference requests.
 */
export type DeploymentState = string;

/** Routing configuration for the deployment. Specifies how requests are routed across multiple models. */
export interface DeploymentRouting {
  /** The routing mode that determines how requests are distributed across models. */
  mode?: RoutingMode;
  /** Optional. The list of models that the model router can use to route requests across. If not specified, the model router will route to all available models specified in the model-router version. */
  models?: DeploymentModel[];
}

export function deploymentRoutingSerializer(item: DeploymentRouting): any {
  return {
    mode: item["mode"],
    models: !item["models"] ? item["models"] : deploymentModelArraySerializer(item["models"]),
  };
}

export function deploymentRoutingDeserializer(item: any): DeploymentRouting {
  return {
    mode: item["mode"],
    models: !item["models"] ? item["models"] : deploymentModelArrayDeserializer(item["models"]),
  };
}

/** The routing mode that determines how requests are distributed across models. */
export enum KnownRoutingMode {
  /** Route requests to minimize cost while meeting performance requirements. */
  Cost = "cost",
  /** Balance cost and accuracy when routing requests across models. */
  Balanced = "balanced",
  /** Route requests to maximize accuracy regardless of cost. */
  Accuracy = "accuracy",
}

/**
 * The routing mode that determines how requests are distributed across models. \
 * {@link KnownRoutingMode} can be used interchangeably with RoutingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **cost**: Route requests to minimize cost while meeting performance requirements. \
 * **balanced**: Balance cost and accuracy when routing requests across models. \
 * **accuracy**: Route requests to maximize accuracy regardless of cost.
 */
export type RoutingMode = string;

export function deploymentModelArraySerializer(result: Array<DeploymentModel>): any[] {
  return result.map((item) => {
    return deploymentModelSerializer(item);
  });
}

export function deploymentModelArrayDeserializer(result: Array<DeploymentModel>): any[] {
  return result.map((item) => {
    return deploymentModelDeserializer(item);
  });
}

/** The object being used to update tags and sku of a resource, in general used for PATCH operations. */
export interface PatchResourceTagsAndSku extends PatchResourceTags {
  /** The resource model definition representing SKU */
  sku?: Sku;
}

export function patchResourceTagsAndSkuSerializer(item: PatchResourceTagsAndSku): any {
  return { tags: item["tags"], sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]) };
}

/** The object being used to update tags of a resource, in general used for PATCH operations. */
export interface PatchResourceTags {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function patchResourceTagsSerializer(item: PatchResourceTags): any {
  return { tags: item["tags"] };
}

/** The list of cognitive services accounts operation response. */
export interface _DeploymentListResult {
  /** The link used to get the next page of Deployment. */
  nextLink?: string;
  /** Gets the list of Cognitive Services accounts Deployment and their properties. */
  readonly value?: Deployment[];
}

export function _deploymentListResultDeserializer(item: any): _DeploymentListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : deploymentArrayDeserializer(item["value"]),
  };
}

export function deploymentArraySerializer(result: Array<Deployment>): any[] {
  return result.map((item) => {
    return deploymentSerializer(item);
  });
}

export function deploymentArrayDeserializer(result: Array<Deployment>): any[] {
  return result.map((item) => {
    return deploymentDeserializer(item);
  });
}

/** The list of cognitive services accounts operation response. */
export interface _DeploymentSkuListResult {
  /** The link used to get the next page of deployment skus. */
  nextLink?: string;
  /** Gets the list of Cognitive Services accounts deployment skus. */
  readonly value?: SkuResource[];
}

export function _deploymentSkuListResultDeserializer(item: any): _DeploymentSkuListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : skuResourceArrayDeserializer(item["value"]),
  };
}

export function skuResourceArrayDeserializer(result: Array<SkuResource>): any[] {
  return result.map((item) => {
    return skuResourceDeserializer(item);
  });
}

/** Properties of Cognitive Services account resource sku resource properties. */
export interface SkuResource {
  /** The resource type name. */
  resourceType?: string;
  /** The resource model definition representing SKU */
  sku?: Sku;
  /** The capacity configuration. */
  capacity?: CapacityConfig;
}

export function skuResourceDeserializer(item: any): SkuResource {
  return {
    resourceType: item["resourceType"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    capacity: !item["capacity"] ? item["capacity"] : capacityConfigDeserializer(item["capacity"]),
  };
}

/** Cognitive Services account commitment plan. */
export interface CommitmentPlan extends Resource {
  /** Properties of Cognitive Services account commitment plan. */
  properties?: CommitmentPlanProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Resource Etag. */
  readonly etag?: string;
  /** The kind (type) of cognitive service account. */
  kind?: string;
  /** The resource model definition representing SKU */
  sku?: Sku;
}

export function commitmentPlanSerializer(item: CommitmentPlan): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : commitmentPlanPropertiesSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function commitmentPlanDeserializer(item: any): CommitmentPlan {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : commitmentPlanPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    etag: item["etag"],
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** Properties of Cognitive Services account commitment plan. */
export interface CommitmentPlanProperties {
  /** Gets the status of the resource at the time the operation was called. */
  readonly provisioningState?: CommitmentPlanProvisioningState;
  /** Commitment plan guid. */
  commitmentPlanGuid?: string;
  /** Account hosting model. */
  hostingModel?: HostingModel;
  /** Commitment plan type. */
  planType?: string;
  /** Cognitive Services account commitment period. */
  current?: CommitmentPeriod;
  /** AutoRenew commitment plan. */
  autoRenew?: boolean;
  /** Cognitive Services account commitment period. */
  next?: CommitmentPeriod;
  /** Cognitive Services account commitment period. */
  readonly last?: CommitmentPeriod;
  /** The list of ProvisioningIssue. */
  readonly provisioningIssues?: string[];
}

export function commitmentPlanPropertiesSerializer(item: CommitmentPlanProperties): any {
  return {
    commitmentPlanGuid: item["commitmentPlanGuid"],
    hostingModel: item["hostingModel"],
    planType: item["planType"],
    current: !item["current"] ? item["current"] : commitmentPeriodSerializer(item["current"]),
    autoRenew: item["autoRenew"],
    next: !item["next"] ? item["next"] : commitmentPeriodSerializer(item["next"]),
  };
}

export function commitmentPlanPropertiesDeserializer(item: any): CommitmentPlanProperties {
  return {
    provisioningState: item["provisioningState"],
    commitmentPlanGuid: item["commitmentPlanGuid"],
    hostingModel: item["hostingModel"],
    planType: item["planType"],
    current: !item["current"] ? item["current"] : commitmentPeriodDeserializer(item["current"]),
    autoRenew: item["autoRenew"],
    next: !item["next"] ? item["next"] : commitmentPeriodDeserializer(item["next"]),
    last: !item["last"] ? item["last"] : commitmentPeriodDeserializer(item["last"]),
    provisioningIssues: !item["provisioningIssues"]
      ? item["provisioningIssues"]
      : item["provisioningIssues"].map((p: any) => {
          return p;
        }),
  };
}

/** Gets the status of the resource at the time the operation was called. */
export enum KnownCommitmentPlanProvisioningState {
  /** Accepted */
  Accepted = "Accepted",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Moving */
  Moving = "Moving",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Gets the status of the resource at the time the operation was called. \
 * {@link KnownCommitmentPlanProvisioningState} can be used interchangeably with CommitmentPlanProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted** \
 * **Creating** \
 * **Deleting** \
 * **Moving** \
 * **Failed** \
 * **Succeeded** \
 * **Canceled**
 */
export type CommitmentPlanProvisioningState = string;

/** Account hosting model. */
export enum KnownHostingModel {
  /** Web */
  Web = "Web",
  /** ConnectedContainer */
  ConnectedContainer = "ConnectedContainer",
  /** DisconnectedContainer */
  DisconnectedContainer = "DisconnectedContainer",
  /** ProvisionedWeb */
  ProvisionedWeb = "ProvisionedWeb",
}

/**
 * Account hosting model. \
 * {@link KnownHostingModel} can be used interchangeably with HostingModel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Web** \
 * **ConnectedContainer** \
 * **DisconnectedContainer** \
 * **ProvisionedWeb**
 */
export type HostingModel = string;

/** Cognitive Services account commitment period. */
export interface CommitmentPeriod {
  /** Commitment period commitment tier. */
  tier?: string;
  /** Commitment period commitment count. */
  count?: number;
  /** Cognitive Services account commitment quota. */
  readonly quota?: CommitmentQuota;
  /** Commitment period start date. */
  readonly startDate?: string;
  /** Commitment period end date. */
  readonly endDate?: string;
}

export function commitmentPeriodSerializer(item: CommitmentPeriod): any {
  return { tier: item["tier"], count: item["count"] };
}

export function commitmentPeriodDeserializer(item: any): CommitmentPeriod {
  return {
    tier: item["tier"],
    count: item["count"],
    quota: !item["quota"] ? item["quota"] : commitmentQuotaDeserializer(item["quota"]),
    startDate: item["startDate"],
    endDate: item["endDate"],
  };
}

/** Cognitive Services account commitment quota. */
export interface CommitmentQuota {
  /** Commitment quota quantity. */
  quantity?: number;
  /** Commitment quota unit. */
  unit?: string;
}

export function commitmentQuotaDeserializer(item: any): CommitmentQuota {
  return {
    quantity: item["quantity"],
    unit: item["unit"],
  };
}

/** The list of cognitive services accounts operation response. */
export interface _CommitmentPlanListResult {
  /** The link used to get the next page of CommitmentPlan. */
  nextLink?: string;
  /** Gets the list of Cognitive Services accounts CommitmentPlan and their properties. */
  readonly value?: CommitmentPlan[];
}

export function _commitmentPlanListResultDeserializer(item: any): _CommitmentPlanListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : commitmentPlanArrayDeserializer(item["value"]),
  };
}

export function commitmentPlanArraySerializer(result: Array<CommitmentPlan>): any[] {
  return result.map((item) => {
    return commitmentPlanSerializer(item);
  });
}

export function commitmentPlanArrayDeserializer(result: Array<CommitmentPlan>): any[] {
  return result.map((item) => {
    return commitmentPlanDeserializer(item);
  });
}

/** The commitment plan association. */
export interface CommitmentPlanAccountAssociation extends ProxyResource {
  /** Resource Etag. */
  readonly etag?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The Azure resource id of the account. */
  accountId?: string;
}

export function commitmentPlanAccountAssociationSerializer(
  item: CommitmentPlanAccountAssociation,
): any {
  return {
    properties: areAllPropsUndefined(item, ["accountId"])
      ? undefined
      : _commitmentPlanAccountAssociationPropertiesSerializer(item),
    tags: item["tags"],
  };
}

export function commitmentPlanAccountAssociationDeserializer(
  item: any,
): CommitmentPlanAccountAssociation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _commitmentPlanAccountAssociationPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The commitment plan account association properties. */
export interface CommitmentPlanAccountAssociationProperties {
  /** The Azure resource id of the account. */
  accountId?: string;
}

export function commitmentPlanAccountAssociationPropertiesSerializer(
  item: CommitmentPlanAccountAssociationProperties,
): any {
  return { accountId: item["accountId"] };
}

export function commitmentPlanAccountAssociationPropertiesDeserializer(
  item: any,
): CommitmentPlanAccountAssociationProperties {
  return {
    accountId: item["accountId"],
  };
}

/** The list of cognitive services Commitment Plan Account Association operation response. */
export interface _CommitmentPlanAccountAssociationListResult {
  /** The link used to get the next page of Commitment Plan Account Association. */
  nextLink?: string;
  /** Gets the list of Cognitive Services Commitment Plan Account Association and their properties. */
  readonly value?: CommitmentPlanAccountAssociation[];
}

export function _commitmentPlanAccountAssociationListResultDeserializer(
  item: any,
): _CommitmentPlanAccountAssociationListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"]
      ? item["value"]
      : commitmentPlanAccountAssociationArrayDeserializer(item["value"]),
  };
}

export function commitmentPlanAccountAssociationArraySerializer(
  result: Array<CommitmentPlanAccountAssociation>,
): any[] {
  return result.map((item) => {
    return commitmentPlanAccountAssociationSerializer(item);
  });
}

export function commitmentPlanAccountAssociationArrayDeserializer(
  result: Array<CommitmentPlanAccountAssociation>,
): any[] {
  return result.map((item) => {
    return commitmentPlanAccountAssociationDeserializer(item);
  });
}

/** Cognitive Services EncryptionScope */
export interface EncryptionScope extends ProxyResource {
  /** Properties of Cognitive Services EncryptionScope. */
  properties?: EncryptionScopeProperties;
  /** Resource Etag. */
  readonly etag?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function encryptionScopeSerializer(item: EncryptionScope): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : encryptionScopePropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function encryptionScopeDeserializer(item: any): EncryptionScope {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : encryptionScopePropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Properties to EncryptionScope */
export interface EncryptionScopeProperties extends Encryption {
  /** Gets the status of the resource at the time the operation was called. */
  readonly provisioningState?: EncryptionScopeProvisioningState;
  /** The encryptionScope state. */
  state?: EncryptionScopeState;
}

export function encryptionScopePropertiesSerializer(item: EncryptionScopeProperties): any {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
    keySource: item["keySource"],
    state: item["state"],
  };
}

export function encryptionScopePropertiesDeserializer(item: any): EncryptionScopeProperties {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    keySource: item["keySource"],
    provisioningState: item["provisioningState"],
    state: item["state"],
  };
}

/** Gets the status of the resource at the time the operation was called. */
export enum KnownEncryptionScopeProvisioningState {
  /** Accepted */
  Accepted = "Accepted",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Moving */
  Moving = "Moving",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Gets the status of the resource at the time the operation was called. \
 * {@link KnownEncryptionScopeProvisioningState} can be used interchangeably with EncryptionScopeProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted** \
 * **Creating** \
 * **Deleting** \
 * **Moving** \
 * **Failed** \
 * **Succeeded** \
 * **Canceled**
 */
export type EncryptionScopeProvisioningState = string;

/** The encryptionScope state. */
export enum KnownEncryptionScopeState {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * The encryptionScope state. \
 * {@link KnownEncryptionScopeState} can be used interchangeably with EncryptionScopeState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **Enabled**
 */
export type EncryptionScopeState = string;

/** The list of cognitive services EncryptionScopes. */
export interface _EncryptionScopeListResult {
  /** The link used to get the next page of EncryptionScope. */
  nextLink?: string;
  /** The list of EncryptionScope. */
  value?: EncryptionScope[];
}

export function _encryptionScopeListResultDeserializer(item: any): _EncryptionScopeListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : encryptionScopeArrayDeserializer(item["value"]),
  };
}

export function encryptionScopeArraySerializer(result: Array<EncryptionScope>): any[] {
  return result.map((item) => {
    return encryptionScopeSerializer(item);
  });
}

export function encryptionScopeArrayDeserializer(result: Array<EncryptionScope>): any[] {
  return result.map((item) => {
    return encryptionScopeDeserializer(item);
  });
}

/** Cognitive Services RaiPolicy. */
export interface RaiPolicy extends ProxyResource {
  /** Properties of Cognitive Services RaiPolicy. */
  properties?: RaiPolicyProperties;
  /** Resource Etag. */
  readonly etag?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function raiPolicySerializer(item: RaiPolicy): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : raiPolicyPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function raiPolicyDeserializer(item: any): RaiPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : raiPolicyPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Azure OpenAI Content Filters properties. */
export interface RaiPolicyProperties {
  /** Content Filters policy type. */
  readonly type?: RaiPolicyType;
  /** Rai policy mode. The enum value mapping is as below: Default = 0, Deferred=1, Blocking=2, Asynchronous_filter =3. Please use 'Asynchronous_filter' after 2025-06-01. It is the same as 'Deferred' in previous version. */
  mode?: RaiPolicyMode;
  /** Name of Rai policy. */
  basePolicyName?: string;
  /** The list of Content Filters. */
  contentFilters?: RaiPolicyContentFilter[];
  /** The list of custom Blocklist. */
  customBlocklists?: CustomBlocklistConfig[];
  /** The list of custom rai topics. */
  customTopics?: CustomTopicConfig[];
  /** The list of Safety Providers. */
  safetyProviders?: SafetyProviderConfig[];
}

export function raiPolicyPropertiesSerializer(item: RaiPolicyProperties): any {
  return {
    mode: item["mode"],
    basePolicyName: item["basePolicyName"],
    contentFilters: !item["contentFilters"]
      ? item["contentFilters"]
      : raiPolicyContentFilterArraySerializer(item["contentFilters"]),
    customBlocklists: !item["customBlocklists"]
      ? item["customBlocklists"]
      : customBlocklistConfigArraySerializer(item["customBlocklists"]),
    customTopics: !item["customTopics"]
      ? item["customTopics"]
      : customTopicConfigArraySerializer(item["customTopics"]),
    safetyProviders: !item["safetyProviders"]
      ? item["safetyProviders"]
      : safetyProviderConfigArraySerializer(item["safetyProviders"]),
  };
}

export function raiPolicyPropertiesDeserializer(item: any): RaiPolicyProperties {
  return {
    type: item["type"],
    mode: item["mode"],
    basePolicyName: item["basePolicyName"],
    contentFilters: !item["contentFilters"]
      ? item["contentFilters"]
      : raiPolicyContentFilterArrayDeserializer(item["contentFilters"]),
    customBlocklists: !item["customBlocklists"]
      ? item["customBlocklists"]
      : customBlocklistConfigArrayDeserializer(item["customBlocklists"]),
    customTopics: !item["customTopics"]
      ? item["customTopics"]
      : customTopicConfigArrayDeserializer(item["customTopics"]),
    safetyProviders: !item["safetyProviders"]
      ? item["safetyProviders"]
      : safetyProviderConfigArrayDeserializer(item["safetyProviders"]),
  };
}

/** Content Filters policy type. */
export enum KnownRaiPolicyType {
  /** UserManaged */
  UserManaged = "UserManaged",
  /** SystemManaged */
  SystemManaged = "SystemManaged",
}

/**
 * Content Filters policy type. \
 * {@link KnownRaiPolicyType} can be used interchangeably with RaiPolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UserManaged** \
 * **SystemManaged**
 */
export type RaiPolicyType = string;

/** Rai policy mode. The enum value mapping is as below: Default = 0, Deferred=1, Blocking=2, Asynchronous_filter =3. Please use 'Asynchronous_filter' after 2025-06-01. It is the same as 'Deferred' in previous version. */
export enum KnownRaiPolicyMode {
  /** Default */
  Default = "Default",
  /** Deferred */
  Deferred = "Deferred",
  /** Blocking */
  Blocking = "Blocking",
  /** Asynchronous_filter */
  AsynchronousFilter = "Asynchronous_filter",
}

/**
 * Rai policy mode. The enum value mapping is as below: Default = 0, Deferred=1, Blocking=2, Asynchronous_filter =3. Please use 'Asynchronous_filter' after 2025-06-01. It is the same as 'Deferred' in previous version. \
 * {@link KnownRaiPolicyMode} can be used interchangeably with RaiPolicyMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **Deferred** \
 * **Blocking** \
 * **Asynchronous_filter**
 */
export type RaiPolicyMode = string;

export function raiPolicyContentFilterArraySerializer(
  result: Array<RaiPolicyContentFilter>,
): any[] {
  return result.map((item) => {
    return raiPolicyContentFilterSerializer(item);
  });
}

export function raiPolicyContentFilterArrayDeserializer(
  result: Array<RaiPolicyContentFilter>,
): any[] {
  return result.map((item) => {
    return raiPolicyContentFilterDeserializer(item);
  });
}

/** Azure OpenAI Content Filter. */
export interface RaiPolicyContentFilter {
  /** Name of ContentFilter. */
  name?: string;
  /** If the ContentFilter is enabled. */
  enabled?: boolean;
  /** Level at which content is filtered. */
  severityThreshold?: ContentLevel;
  /** If blocking would occur. */
  blocking?: boolean;
  /** Content source to apply the Content Filters. */
  source?: RaiPolicyContentSource;
  /** The action types to apply to the content filters */
  action?: RaiActionType;
}

export function raiPolicyContentFilterSerializer(item: RaiPolicyContentFilter): any {
  return {
    name: item["name"],
    enabled: item["enabled"],
    severityThreshold: item["severityThreshold"],
    blocking: item["blocking"],
    source: item["source"],
    action: item["action"],
  };
}

export function raiPolicyContentFilterDeserializer(item: any): RaiPolicyContentFilter {
  return {
    name: item["name"],
    enabled: item["enabled"],
    severityThreshold: item["severityThreshold"],
    blocking: item["blocking"],
    source: item["source"],
    action: item["action"],
  };
}

/** Level at which content is filtered. */
export enum KnownContentLevel {
  /** Low */
  Low = "Low",
  /** Medium */
  Medium = "Medium",
  /** High */
  High = "High",
}

/**
 * Level at which content is filtered. \
 * {@link KnownContentLevel} can be used interchangeably with ContentLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low** \
 * **Medium** \
 * **High**
 */
export type ContentLevel = string;

/** Content source to apply the Content Filters. */
export enum KnownRaiPolicyContentSource {
  /** Prompt */
  Prompt = "Prompt",
  /** Completion */
  Completion = "Completion",
  /** PreToolCall */
  PreToolCall = "PreToolCall",
  /** PostToolCall */
  PostToolCall = "PostToolCall",
  /** PreRun */
  PreRun = "PreRun",
  /** PostRun */
  PostRun = "PostRun",
}

/**
 * Content source to apply the Content Filters. \
 * {@link KnownRaiPolicyContentSource} can be used interchangeably with RaiPolicyContentSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Prompt** \
 * **Completion** \
 * **PreToolCall** \
 * **PostToolCall** \
 * **PreRun** \
 * **PostRun**
 */
export type RaiPolicyContentSource = string;

/** The action types to apply to the content filters */
export enum KnownRaiActionType {
  /** None */
  None = "None",
  /** BLOCKING */
  Blocking = "BLOCKING",
  /** ANNOTATING */
  Annotating = "ANNOTATING",
  /** HITL */
  Hitl = "HITL",
  /** RETRY */
  Retry = "RETRY",
}

/**
 * The action types to apply to the content filters \
 * {@link KnownRaiActionType} can be used interchangeably with RaiActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **BLOCKING** \
 * **ANNOTATING** \
 * **HITL** \
 * **RETRY**
 */
export type RaiActionType = string;

export function customBlocklistConfigArraySerializer(result: Array<CustomBlocklistConfig>): any[] {
  return result.map((item) => {
    return customBlocklistConfigSerializer(item);
  });
}

export function customBlocklistConfigArrayDeserializer(
  result: Array<CustomBlocklistConfig>,
): any[] {
  return result.map((item) => {
    return customBlocklistConfigDeserializer(item);
  });
}

/** Gets or sets the source to which filter applies. */
export interface CustomBlocklistConfig extends RaiBlocklistConfig {
  /** Content source to apply the Content Filters. */
  source?: RaiPolicyContentSource;
}

export function customBlocklistConfigSerializer(item: CustomBlocklistConfig): any {
  return {
    blocklistName: item["blocklistName"],
    blocking: item["blocking"],
    source: item["source"],
  };
}

export function customBlocklistConfigDeserializer(item: any): CustomBlocklistConfig {
  return {
    blocklistName: item["blocklistName"],
    blocking: item["blocking"],
    source: item["source"],
  };
}

export function customTopicConfigArraySerializer(result: Array<CustomTopicConfig>): any[] {
  return result.map((item) => {
    return customTopicConfigSerializer(item);
  });
}

export function customTopicConfigArrayDeserializer(result: Array<CustomTopicConfig>): any[] {
  return result.map((item) => {
    return customTopicConfigDeserializer(item);
  });
}

/** Gets or sets the source to which filter applies. */
export interface CustomTopicConfig extends RaiTopicConfig {
  /** Content source to apply the Content Filters. */
  source?: RaiPolicyContentSource;
}

export function customTopicConfigSerializer(item: CustomTopicConfig): any {
  return { topicName: item["topicName"], blocking: item["blocking"], source: item["source"] };
}

export function customTopicConfigDeserializer(item: any): CustomTopicConfig {
  return {
    topicName: item["topicName"],
    blocking: item["blocking"],
    source: item["source"],
  };
}

export function safetyProviderConfigArraySerializer(result: Array<SafetyProviderConfig>): any[] {
  return result.map((item) => {
    return safetyProviderConfigSerializer(item);
  });
}

export function safetyProviderConfigArrayDeserializer(result: Array<SafetyProviderConfig>): any[] {
  return result.map((item) => {
    return safetyProviderConfigDeserializer(item);
  });
}

/** Gets or sets the source to which safety providers applies. */
export interface SafetyProviderConfig extends RaiSafetyProviderConfig {
  /** Content source to apply the Content Filters. */
  source?: RaiPolicyContentSource;
}

export function safetyProviderConfigSerializer(item: SafetyProviderConfig): any {
  return {
    safetyProviderName: item["safetyProviderName"],
    blocking: item["blocking"],
    source: item["source"],
  };
}

export function safetyProviderConfigDeserializer(item: any): SafetyProviderConfig {
  return {
    safetyProviderName: item["safetyProviderName"],
    blocking: item["blocking"],
    source: item["source"],
  };
}

/** Azure OpenAI blocklist config. */
export interface RaiBlocklistConfig {
  /** Name of ContentFilter. */
  blocklistName?: string;
  /** If blocking would occur. */
  blocking?: boolean;
}

export function raiBlocklistConfigSerializer(item: RaiBlocklistConfig): any {
  return { blocklistName: item["blocklistName"], blocking: item["blocking"] };
}

export function raiBlocklistConfigDeserializer(item: any): RaiBlocklistConfig {
  return {
    blocklistName: item["blocklistName"],
    blocking: item["blocking"],
  };
}

/** Azure OpenAI RAI topic config. */
export interface RaiTopicConfig {
  /** Name of RAI topic. */
  topicName?: string;
  /** If blocking would occur. */
  blocking?: boolean;
}

export function raiTopicConfigSerializer(item: RaiTopicConfig): any {
  return { topicName: item["topicName"], blocking: item["blocking"] };
}

export function raiTopicConfigDeserializer(item: any): RaiTopicConfig {
  return {
    topicName: item["topicName"],
    blocking: item["blocking"],
  };
}

/** Azure OpenAI RAI safety provider config. */
export interface RaiSafetyProviderConfig {
  /** Name of RAI Safety Provider. */
  safetyProviderName?: string;
  /** If blocking would occur. */
  blocking?: boolean;
}

export function raiSafetyProviderConfigSerializer(item: RaiSafetyProviderConfig): any {
  return { safetyProviderName: item["safetyProviderName"], blocking: item["blocking"] };
}

export function raiSafetyProviderConfigDeserializer(item: any): RaiSafetyProviderConfig {
  return {
    safetyProviderName: item["safetyProviderName"],
    blocking: item["blocking"],
  };
}

/** The list of cognitive services RaiPolicies. */
export interface _RaiPolicyListResult {
  /** The link used to get the next page of RaiPolicy. */
  nextLink?: string;
  /** The list of RaiPolicy. */
  value?: RaiPolicy[];
}

export function _raiPolicyListResultDeserializer(item: any): _RaiPolicyListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : raiPolicyArrayDeserializer(item["value"]),
  };
}

export function raiPolicyArraySerializer(result: Array<RaiPolicy>): any[] {
  return result.map((item) => {
    return raiPolicySerializer(item);
  });
}

export function raiPolicyArrayDeserializer(result: Array<RaiPolicy>): any[] {
  return result.map((item) => {
    return raiPolicyDeserializer(item);
  });
}

/** Cognitive Services RaiBlocklist Item. */
export interface RaiBlocklistItem extends ProxyResource {
  /** Properties of Cognitive Services RaiBlocklist Item. */
  properties?: RaiBlocklistItemProperties;
  /** Resource Etag. */
  readonly etag?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function raiBlocklistItemSerializer(item: RaiBlocklistItem): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : raiBlocklistItemPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function raiBlocklistItemDeserializer(item: any): RaiBlocklistItem {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : raiBlocklistItemPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** RAI Custom Blocklist Item properties. */
export interface RaiBlocklistItemProperties {
  /** Pattern to match against. */
  pattern?: string;
  /** If the pattern is a regex pattern. */
  isRegex?: boolean;
}

export function raiBlocklistItemPropertiesSerializer(item: RaiBlocklistItemProperties): any {
  return { pattern: item["pattern"], isRegex: item["isRegex"] };
}

export function raiBlocklistItemPropertiesDeserializer(item: any): RaiBlocklistItemProperties {
  return {
    pattern: item["pattern"],
    isRegex: item["isRegex"],
  };
}

/** The list of cognitive services RAI Blocklist Items. */
export interface _RaiBlockListItemsResult {
  /** The link used to get the next page of RaiBlocklistItems. */
  nextLink?: string;
  /** The list of RaiBlocklistItems. */
  value?: RaiBlocklistItem[];
}

export function _raiBlockListItemsResultDeserializer(item: any): _RaiBlockListItemsResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : raiBlocklistItemArrayDeserializer(item["value"]),
  };
}

export function raiBlocklistItemArraySerializer(result: Array<RaiBlocklistItem>): any[] {
  return result.map((item) => {
    return raiBlocklistItemSerializer(item);
  });
}

export function raiBlocklistItemArrayDeserializer(result: Array<RaiBlocklistItem>): any[] {
  return result.map((item) => {
    return raiBlocklistItemDeserializer(item);
  });
}

/** The Cognitive Services RaiBlocklist Item request body. */
export interface RaiBlocklistItemBulkRequest {
  name?: string;
  /** Properties of Cognitive Services RaiBlocklist Item. */
  properties?: RaiBlocklistItemProperties;
}

export function raiBlocklistItemBulkRequestSerializer(item: RaiBlocklistItemBulkRequest): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : raiBlocklistItemPropertiesSerializer(item["properties"]),
  };
}

/** Cognitive Services RaiBlocklist. */
export interface RaiBlocklist extends ProxyResource {
  /** Properties of Cognitive Services RaiBlocklist. */
  properties?: RaiBlocklistProperties;
  /** Resource Etag. */
  readonly etag?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function raiBlocklistSerializer(item: RaiBlocklist): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : raiBlocklistPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function raiBlocklistDeserializer(item: any): RaiBlocklist {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : raiBlocklistPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** RAI Custom Blocklist properties. */
export interface RaiBlocklistProperties {
  /** Description of the block list. */
  description?: string;
}

export function raiBlocklistPropertiesSerializer(item: RaiBlocklistProperties): any {
  return { description: item["description"] };
}

export function raiBlocklistPropertiesDeserializer(item: any): RaiBlocklistProperties {
  return {
    description: item["description"],
  };
}

/** The list of cognitive services RAI Blocklists. */
export interface _RaiBlockListResult {
  /** The link used to get the next page of RaiBlocklists. */
  nextLink?: string;
  /** The list of RaiBlocklist. */
  value?: RaiBlocklist[];
}

export function _raiBlockListResultDeserializer(item: any): _RaiBlockListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : raiBlocklistArrayDeserializer(item["value"]),
  };
}

export function raiBlocklistArraySerializer(result: Array<RaiBlocklist>): any[] {
  return result.map((item) => {
    return raiBlocklistSerializer(item);
  });
}

export function raiBlocklistArrayDeserializer(result: Array<RaiBlocklist>): any[] {
  return result.map((item) => {
    return raiBlocklistDeserializer(item);
  });
}

/** Cognitive Services Rai Topic. */
export interface RaiTopic extends ProxyResource {
  /** Properties of Cognitive Services Rai Topic. */
  properties?: RaiTopicProperties;
  /** Resource Etag. */
  readonly etag?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function raiTopicSerializer(item: RaiTopic): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : raiTopicPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function raiTopicDeserializer(item: any): RaiTopic {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : raiTopicPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** RAI Custom Topic properties. */
export interface RaiTopicProperties {
  /** The unique identifier of the custom topic. */
  topicId?: string;
  /** The name of the custom topic. */
  topicName?: string;
  /** Description of the custom topic. */
  description?: string;
  /** Sample blob url for the custom topic. */
  sampleBlobUrl?: string;
  /** Status of the custom topic. */
  status?: string;
  /** Failed reason if the status is Failed. */
  failedReason?: string;
  /** Creation time of the custom topic. */
  createdAt?: Date;
  /** Last modified time of the custom topic. */
  lastModifiedAt?: Date;
}

export function raiTopicPropertiesSerializer(item: RaiTopicProperties): any {
  return {
    topicId: item["topicId"],
    topicName: item["topicName"],
    description: item["description"],
    sampleBlobUrl: item["sampleBlobUrl"],
    status: item["status"],
    failedReason: item["failedReason"],
    createdAt: !item["createdAt"] ? item["createdAt"] : item["createdAt"].toISOString(),
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : item["lastModifiedAt"].toISOString(),
  };
}

export function raiTopicPropertiesDeserializer(item: any): RaiTopicProperties {
  return {
    topicId: item["topicId"],
    topicName: item["topicName"],
    description: item["description"],
    sampleBlobUrl: item["sampleBlobUrl"],
    status: item["status"],
    failedReason: item["failedReason"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The list of cognitive services RAI Topics. */
export interface _RaiTopicResult {
  /** The link used to get the next page of RaiTopics. */
  nextLink?: string;
  /** The list of RaiTopic. */
  value?: RaiTopic[];
}

export function _raiTopicResultDeserializer(item: any): _RaiTopicResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : raiTopicArrayDeserializer(item["value"]),
  };
}

export function raiTopicArraySerializer(result: Array<RaiTopic>): any[] {
  return result.map((item) => {
    return raiTopicSerializer(item);
  });
}

export function raiTopicArrayDeserializer(result: Array<RaiTopic>): any[] {
  return result.map((item) => {
    return raiTopicDeserializer(item);
  });
}

/** Cognitive Services RAI Tool Label resource. */
export interface RaiToolLabel extends ProxyResource {
  /** Properties of the RAI Tool Label. */
  properties?: RaiToolLabelProperties;
  /** Resource Etag. */
  readonly etag?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function raiToolLabelSerializer(item: RaiToolLabel): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : raiToolLabelPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function raiToolLabelDeserializer(item: any): RaiToolLabel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : raiToolLabelPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** RAI Tool Label properties. */
export interface RaiToolLabelProperties {
  /** The unique tool connection name, e.g., 'Web_Search'. */
  toolConnectionName: string;
  /** Account-level tool label definition. */
  accountScope?: RaiToolLabelPropertiesAccountScope;
  /** List of project-level tool label definitions. */
  projectScopes?: RaiToolLabelPropertiesProjectScopesItem[];
}

export function raiToolLabelPropertiesSerializer(item: RaiToolLabelProperties): any {
  return {
    toolConnectionName: item["toolConnectionName"],
    accountScope: !item["accountScope"]
      ? item["accountScope"]
      : raiToolLabelPropertiesAccountScopeSerializer(item["accountScope"]),
    projectScopes: !item["projectScopes"]
      ? item["projectScopes"]
      : raiToolLabelPropertiesProjectScopesItemArraySerializer(item["projectScopes"]),
  };
}

export function raiToolLabelPropertiesDeserializer(item: any): RaiToolLabelProperties {
  return {
    toolConnectionName: item["toolConnectionName"],
    accountScope: !item["accountScope"]
      ? item["accountScope"]
      : raiToolLabelPropertiesAccountScopeDeserializer(item["accountScope"]),
    projectScopes: !item["projectScopes"]
      ? item["projectScopes"]
      : raiToolLabelPropertiesProjectScopesItemArrayDeserializer(item["projectScopes"]),
  };
}

/** Account-level tool label definition. */
export interface RaiToolLabelPropertiesAccountScope {
  /** Dictionary of label key-value pairs for the account scope. */
  labelValues?: Record<string, string>;
}

export function raiToolLabelPropertiesAccountScopeSerializer(
  item: RaiToolLabelPropertiesAccountScope,
): any {
  return { labelValues: item["labelValues"] };
}

export function raiToolLabelPropertiesAccountScopeDeserializer(
  item: any,
): RaiToolLabelPropertiesAccountScope {
  return {
    labelValues: !item["labelValues"]
      ? item["labelValues"]
      : Object.fromEntries(
          Object.entries(item["labelValues"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function raiToolLabelPropertiesProjectScopesItemArraySerializer(
  result: Array<RaiToolLabelPropertiesProjectScopesItem>,
): any[] {
  return result.map((item) => {
    return raiToolLabelPropertiesProjectScopesItemSerializer(item);
  });
}

export function raiToolLabelPropertiesProjectScopesItemArrayDeserializer(
  result: Array<RaiToolLabelPropertiesProjectScopesItem>,
): any[] {
  return result.map((item) => {
    return raiToolLabelPropertiesProjectScopesItemDeserializer(item);
  });
}

/** model interface RaiToolLabelPropertiesProjectScopesItem */
export interface RaiToolLabelPropertiesProjectScopesItem {
  /** Project name to which this scope applies. */
  project: string;
  /** Dictionary of label key-value pairs for the project scope. */
  labelValues: Record<string, string>;
}

export function raiToolLabelPropertiesProjectScopesItemSerializer(
  item: RaiToolLabelPropertiesProjectScopesItem,
): any {
  return { project: item["project"], labelValues: item["labelValues"] };
}

export function raiToolLabelPropertiesProjectScopesItemDeserializer(
  item: any,
): RaiToolLabelPropertiesProjectScopesItem {
  return {
    project: item["project"],
    labelValues: Object.fromEntries(
      Object.entries(item["labelValues"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** The list of Cognitive Services RAI Tool Labels. */
export interface _RaiToolLabelResult {
  /** The link used to get the next page of RaiToolLabels. */
  nextLink?: string;
  /** The list of RAI Tool Labels. */
  value?: RaiToolLabel[];
}

export function _raiToolLabelResultDeserializer(item: any): _RaiToolLabelResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : raiToolLabelArrayDeserializer(item["value"]),
  };
}

export function raiToolLabelArraySerializer(result: Array<RaiToolLabel>): any[] {
  return result.map((item) => {
    return raiToolLabelSerializer(item);
  });
}

export function raiToolLabelArrayDeserializer(result: Array<RaiToolLabel>): any[] {
  return result.map((item) => {
    return raiToolLabelDeserializer(item);
  });
}

/** Azure OpenAI Content Filter. */
export interface RaiContentFilter extends ProxyResource {
  /** Azure OpenAI Content Filter Properties. */
  properties?: RaiContentFilterProperties;
}

export function raiContentFilterDeserializer(item: any): RaiContentFilter {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : raiContentFilterPropertiesDeserializer(item["properties"]),
  };
}

/** Azure OpenAI Content Filter Properties. */
export interface RaiContentFilterProperties {
  /** Name of Content Filter. */
  name?: string;
  /** If the Content Filter has multi severity levels(Low, Medium, or High). */
  isMultiLevelFilter?: boolean;
  /** Content source to apply the Content Filters. */
  source?: RaiPolicyContentSource;
}

export function raiContentFilterPropertiesDeserializer(item: any): RaiContentFilterProperties {
  return {
    name: item["name"],
    isMultiLevelFilter: item["isMultiLevelFilter"],
    source: item["source"],
  };
}

/** The list of Content Filters. */
export interface _RaiContentFilterListResult {
  /** The link used to get the next page of Content Filters. */
  nextLink?: string;
  /** The list of RaiContentFilter. */
  value?: RaiContentFilter[];
}

export function _raiContentFilterListResultDeserializer(item: any): _RaiContentFilterListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : raiContentFilterArrayDeserializer(item["value"]),
  };
}

export function raiContentFilterArrayDeserializer(result: Array<RaiContentFilter>): any[] {
  return result.map((item) => {
    return raiContentFilterDeserializer(item);
  });
}

/** NSP Configuration for an Cognitive Services account. */
export interface NetworkSecurityPerimeterConfiguration extends ProxyResource {
  /** NSP Configuration properties. */
  properties?: NetworkSecurityPerimeterConfigurationProperties;
}

export function networkSecurityPerimeterConfigurationDeserializer(
  item: any,
): NetworkSecurityPerimeterConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : networkSecurityPerimeterConfigurationPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of an NSP Configuration. */
export interface NetworkSecurityPerimeterConfigurationProperties {
  /** Provisioning state of NetworkSecurityPerimeter configuration */
  readonly provisioningState?: string;
  /** List of Provisioning Issues */
  provisioningIssues?: ProvisioningIssue[];
  /** Information about a linked Network Security Perimeter */
  networkSecurityPerimeter?: NetworkSecurityPerimeter;
  /** Network Security Perimeter Configuration Association Information */
  resourceAssociation?: NetworkSecurityPerimeterConfigurationAssociationInfo;
  /** Network Security Perimeter Profile Information */
  profile?: NetworkSecurityPerimeterProfileInfo;
}

export function networkSecurityPerimeterConfigurationPropertiesDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationProperties {
  return {
    provisioningState: item["provisioningState"],
    provisioningIssues: !item["provisioningIssues"]
      ? item["provisioningIssues"]
      : provisioningIssueArrayDeserializer(item["provisioningIssues"]),
    networkSecurityPerimeter: !item["networkSecurityPerimeter"]
      ? item["networkSecurityPerimeter"]
      : networkSecurityPerimeterDeserializer(item["networkSecurityPerimeter"]),
    resourceAssociation: !item["resourceAssociation"]
      ? item["resourceAssociation"]
      : networkSecurityPerimeterConfigurationAssociationInfoDeserializer(
          item["resourceAssociation"],
        ),
    profile: !item["profile"]
      ? item["profile"]
      : networkSecurityPerimeterProfileInfoDeserializer(item["profile"]),
  };
}

export function provisioningIssueArrayDeserializer(result: Array<ProvisioningIssue>): any[] {
  return result.map((item) => {
    return provisioningIssueDeserializer(item);
  });
}

/** model interface ProvisioningIssue */
export interface ProvisioningIssue {
  /** Name of the NSP provisioning issue */
  name?: string;
  /** Properties of Provisioning Issue */
  properties?: ProvisioningIssueProperties;
}

export function provisioningIssueDeserializer(item: any): ProvisioningIssue {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : provisioningIssuePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of Provisioning Issue */
export interface ProvisioningIssueProperties {
  /** Type of Issue */
  issueType?: string;
  /** Severity of the issue */
  severity?: string;
  /** Description of the issue */
  description?: string;
  /** IDs of resources that can be associated to the same perimeter to remediate the issue. */
  suggestedResourceIds?: string[];
  /** Optional array, suggested access rules */
  suggestedAccessRules?: NetworkSecurityPerimeterAccessRule[];
}

export function provisioningIssuePropertiesDeserializer(item: any): ProvisioningIssueProperties {
  return {
    issueType: item["issueType"],
    severity: item["severity"],
    description: item["description"],
    suggestedResourceIds: !item["suggestedResourceIds"]
      ? item["suggestedResourceIds"]
      : item["suggestedResourceIds"].map((p: any) => {
          return p;
        }),
    suggestedAccessRules: !item["suggestedAccessRules"]
      ? item["suggestedAccessRules"]
      : networkSecurityPerimeterAccessRuleArrayDeserializer(item["suggestedAccessRules"]),
  };
}

export function networkSecurityPerimeterAccessRuleArrayDeserializer(
  result: Array<NetworkSecurityPerimeterAccessRule>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterAccessRuleDeserializer(item);
  });
}

/** Network Security Perimeter Access Rule */
export interface NetworkSecurityPerimeterAccessRule {
  /** Network Security Perimeter Access Rule Name */
  name?: string;
  /** Properties of Network Security Perimeter Access Rule */
  properties?: NetworkSecurityPerimeterAccessRuleProperties;
}

export function networkSecurityPerimeterAccessRuleDeserializer(
  item: any,
): NetworkSecurityPerimeterAccessRule {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : networkSecurityPerimeterAccessRulePropertiesDeserializer(item["properties"]),
  };
}

/** The Properties of Network Security Perimeter Rule */
export interface NetworkSecurityPerimeterAccessRuleProperties {
  /** Direction of Access Rule */
  direction?: NspAccessRuleDirection;
  /** Address prefixes for inbound rules */
  addressPrefixes?: string[];
  /** Subscriptions for inbound rules */
  subscriptions?: NetworkSecurityPerimeterAccessRulePropertiesSubscriptionsItem[];
  /** NetworkSecurityPerimeters for inbound rules */
  networkSecurityPerimeters?: NetworkSecurityPerimeter[];
  /** Fully qualified domain name for outbound rules */
  fullyQualifiedDomainNames?: string[];
}

export function networkSecurityPerimeterAccessRulePropertiesDeserializer(
  item: any,
): NetworkSecurityPerimeterAccessRuleProperties {
  return {
    direction: item["direction"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : networkSecurityPerimeterAccessRulePropertiesSubscriptionsItemArrayDeserializer(
          item["subscriptions"],
        ),
    networkSecurityPerimeters: !item["networkSecurityPerimeters"]
      ? item["networkSecurityPerimeters"]
      : networkSecurityPerimeterArrayDeserializer(item["networkSecurityPerimeters"]),
    fullyQualifiedDomainNames: !item["fullyQualifiedDomainNames"]
      ? item["fullyQualifiedDomainNames"]
      : item["fullyQualifiedDomainNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Direction of Access Rule */
export enum KnownNspAccessRuleDirection {
  /** Inbound */
  Inbound = "Inbound",
  /** Outbound */
  Outbound = "Outbound",
}

/**
 * Direction of Access Rule \
 * {@link KnownNspAccessRuleDirection} can be used interchangeably with NspAccessRuleDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inbound** \
 * **Outbound**
 */
export type NspAccessRuleDirection = string;

export function networkSecurityPerimeterAccessRulePropertiesSubscriptionsItemArrayDeserializer(
  result: Array<NetworkSecurityPerimeterAccessRulePropertiesSubscriptionsItem>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterAccessRulePropertiesSubscriptionsItemDeserializer(item);
  });
}

/** Subscription for inbound rule */
export interface NetworkSecurityPerimeterAccessRulePropertiesSubscriptionsItem {
  /** Fully qualified identifier of subscription */
  id?: string;
}

export function networkSecurityPerimeterAccessRulePropertiesSubscriptionsItemDeserializer(
  item: any,
): NetworkSecurityPerimeterAccessRulePropertiesSubscriptionsItem {
  return {
    id: item["id"],
  };
}

export function networkSecurityPerimeterArrayDeserializer(
  result: Array<NetworkSecurityPerimeter>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterDeserializer(item);
  });
}

/** Information about a linked Network Security Perimeter */
export interface NetworkSecurityPerimeter {
  /** Fully qualified identifier of the resource */
  id?: string;
  /** Guid of the resource */
  perimeterGuid?: string;
  /** Location of the resource */
  location?: string;
}

export function networkSecurityPerimeterDeserializer(item: any): NetworkSecurityPerimeter {
  return {
    id: item["id"],
    perimeterGuid: item["perimeterGuid"],
    location: item["location"],
  };
}

/** Network Security Perimeter Configuration Association Information */
export interface NetworkSecurityPerimeterConfigurationAssociationInfo {
  /** Name of the resource association */
  name?: string;
  /** Access Mode of the resource association */
  accessMode?: string;
}

export function networkSecurityPerimeterConfigurationAssociationInfoDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationAssociationInfo {
  return {
    name: item["name"],
    accessMode: item["accessMode"],
  };
}

/** Network Security Perimeter Profile Information */
export interface NetworkSecurityPerimeterProfileInfo {
  /** Name of the resource profile */
  name?: string;
  /** Access rules version of the resource profile */
  accessRulesVersion?: number;
  accessRules?: NetworkSecurityPerimeterAccessRule[];
  /** Current diagnostic settings version */
  diagnosticSettingsVersion?: number;
  /** List of enabled log categories */
  enabledLogCategories?: string[];
}

export function networkSecurityPerimeterProfileInfoDeserializer(
  item: any,
): NetworkSecurityPerimeterProfileInfo {
  return {
    name: item["name"],
    accessRulesVersion: item["accessRulesVersion"],
    accessRules: !item["accessRules"]
      ? item["accessRules"]
      : networkSecurityPerimeterAccessRuleArrayDeserializer(item["accessRules"]),
    diagnosticSettingsVersion: item["diagnosticSettingsVersion"],
    enabledLogCategories: !item["enabledLogCategories"]
      ? item["enabledLogCategories"]
      : item["enabledLogCategories"].map((p: any) => {
          return p;
        }),
  };
}

/** A list of NSP configurations for an Cognitive Services account. */
export interface _NetworkSecurityPerimeterConfigurationList {
  /** Array of NSP configurations List Result for an Cognitive Services account. */
  value?: NetworkSecurityPerimeterConfiguration[];
  /** Link to retrieve next page of results. */
  nextLink?: string;
}

export function _networkSecurityPerimeterConfigurationListDeserializer(
  item: any,
): _NetworkSecurityPerimeterConfigurationList {
  return {
    value: !item["value"]
      ? item["value"]
      : networkSecurityPerimeterConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkSecurityPerimeterConfigurationArrayDeserializer(
  result: Array<NetworkSecurityPerimeterConfiguration>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterConfigurationDeserializer(item);
  });
}

/** The Defender for AI resource. */
export interface DefenderForAISetting extends ProxyResource {
  /** Resource Etag. */
  readonly etag?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Defender for AI state on the AI resource. */
  state?: DefenderForAISettingState;
}

export function defenderForAISettingSerializer(item: DefenderForAISetting): any {
  return {
    properties: areAllPropsUndefined(item, ["state"])
      ? undefined
      : _defenderForAISettingPropertiesSerializer(item),
    tags: item["tags"],
  };
}

export function defenderForAISettingDeserializer(item: any): DefenderForAISetting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _defenderForAISettingPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The Defender for AI resource properties. */
export interface DefenderForAISettingProperties {
  /** Defender for AI state on the AI resource. */
  state?: DefenderForAISettingState;
}

export function defenderForAISettingPropertiesSerializer(
  item: DefenderForAISettingProperties,
): any {
  return { state: item["state"] };
}

export function defenderForAISettingPropertiesDeserializer(
  item: any,
): DefenderForAISettingProperties {
  return {
    state: item["state"],
  };
}

/** Defender for AI state on the AI resource. */
export enum KnownDefenderForAISettingState {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Defender for AI state on the AI resource. \
 * {@link KnownDefenderForAISettingState} can be used interchangeably with DefenderForAISettingState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **Enabled**
 */
export type DefenderForAISettingState = string;

/** The list of cognitive services Defender for AI Settings. */
export interface _DefenderForAISettingResult {
  /** The link used to get the next page of Defender for AI Settings. */
  nextLink?: string;
  /** The list of Defender for AI Settings. */
  value?: DefenderForAISetting[];
}

export function _defenderForAISettingResultDeserializer(item: any): _DefenderForAISettingResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : defenderForAISettingArrayDeserializer(item["value"]),
  };
}

export function defenderForAISettingArraySerializer(result: Array<DefenderForAISetting>): any[] {
  return result.map((item) => {
    return defenderForAISettingSerializer(item);
  });
}

export function defenderForAISettingArrayDeserializer(result: Array<DefenderForAISetting>): any[] {
  return result.map((item) => {
    return defenderForAISettingDeserializer(item);
  });
}

/** Cognitive Services project is an Azure resource representing the provisioned account's project, it's type, location and SKU. */
export interface Project extends Resource {
  /** Properties of Cognitive Services project. */
  properties?: ProjectProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Resource Etag. */
  readonly etag?: string;
  /** Identity for the resource. */
  identity?: Identity;
}

export function projectSerializer(item: Project): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : projectPropertiesSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
  };
}

export function projectDeserializer(item: any): Project {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : projectPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    etag: item["etag"],
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
  };
}

/** Properties of Cognitive Services Project'. */
export interface ProjectProperties {
  /** Gets the status of the cognitive services project at the time the operation was called. */
  readonly provisioningState?: ProvisioningState;
  /** The display name of the Cognitive Services Project. */
  displayName?: string;
  /** The description of the Cognitive Services Project. */
  description?: string;
  /** The list of endpoint for this Cognitive Services Project. */
  readonly endpoints?: Record<string, string>;
  /** Indicates whether the project is the default project for the account. */
  readonly isDefault?: boolean;
}

export function projectPropertiesSerializer(item: ProjectProperties): any {
  return { displayName: item["displayName"], description: item["description"] };
}

export function projectPropertiesDeserializer(item: any): ProjectProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    description: item["description"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : Object.fromEntries(
          Object.entries(item["endpoints"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    isDefault: item["isDefault"],
  };
}

/** The list of cognitive services projects operation response. */
export interface _ProjectListResult {
  /** The link used to get the next page of projects. */
  nextLink?: string;
  /** Gets the list of Cognitive Services projects and their properties. */
  readonly value?: Project[];
}

export function _projectListResultDeserializer(item: any): _ProjectListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : projectArrayDeserializer(item["value"]),
  };
}

export function projectArraySerializer(result: Array<Project>): any[] {
  return result.map((item) => {
    return projectSerializer(item);
  });
}

export function projectArrayDeserializer(result: Array<Project>): any[] {
  return result.map((item) => {
    return projectDeserializer(item);
  });
}

/** Connection base resource schema. */
export interface ConnectionPropertiesV2BasicResource extends ProxyResource {
  /** Connection property base schema. */
  properties: ConnectionPropertiesV2Union;
}

export function connectionPropertiesV2BasicResourceSerializer(
  item: ConnectionPropertiesV2BasicResource,
): any {
  return { properties: connectionPropertiesV2UnionSerializer(item["properties"]) };
}

export function connectionPropertiesV2BasicResourceDeserializer(
  item: any,
): ConnectionPropertiesV2BasicResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: connectionPropertiesV2UnionDeserializer(item["properties"]),
  };
}

/** Connection property base schema. */
export interface ConnectionPropertiesV2 {
  /** Authentication type of the connection target */
  /** The discriminator possible values: PAT, ManagedIdentity, UsernamePassword, None, SAS, AccountKey, ServicePrincipal, AccessKey, ApiKey, CustomKeys, OAuth2, AAD */
  authType: ConnectionAuthType;
  /** Category of the connection */
  category?: ConnectionCategory;
  readonly createdByWorkspaceArmId?: string;
  /** Provides the error message if the connection fails */
  error?: string;
  expiryTime?: Date;
  /** Group based on connection category */
  readonly group?: ConnectionGroup;
  isSharedToAll?: boolean;
  /** Store user metadata for this connection */
  metadata?: Record<string, string>;
  /** Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'. */
  peRequirement?: ManagedPERequirement;
  /** Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'. */
  peStatus?: ManagedPEStatus;
  sharedUserList?: string[];
  /** The connection URL to be used. */
  target?: string;
  useWorkspaceManagedIdentity?: boolean;
}

export function connectionPropertiesV2Serializer(item: ConnectionPropertiesV2): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
  };
}

export function connectionPropertiesV2Deserializer(item: any): ConnectionPropertiesV2 {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
  };
}

/** Alias for ConnectionPropertiesV2Union */
export type ConnectionPropertiesV2Union =
  | PATAuthTypeConnectionProperties
  | ManagedIdentityAuthTypeConnectionProperties
  | UsernamePasswordAuthTypeConnectionProperties
  | NoneAuthTypeConnectionProperties
  | SASAuthTypeConnectionProperties
  | AccountKeyAuthTypeConnectionProperties
  | ServicePrincipalAuthTypeConnectionProperties
  | AccessKeyAuthTypeConnectionProperties
  | ApiKeyAuthConnectionProperties
  | CustomKeysConnectionProperties
  | OAuth2AuthTypeConnectionProperties
  | AADAuthTypeConnectionProperties
  | ConnectionPropertiesV2;

export function connectionPropertiesV2UnionSerializer(item: ConnectionPropertiesV2Union): any {
  switch (item.authType) {
    case "PAT":
      return patAuthTypeConnectionPropertiesSerializer(item as PATAuthTypeConnectionProperties);

    case "ManagedIdentity":
      return managedIdentityAuthTypeConnectionPropertiesSerializer(
        item as ManagedIdentityAuthTypeConnectionProperties,
      );

    case "UsernamePassword":
      return usernamePasswordAuthTypeConnectionPropertiesSerializer(
        item as UsernamePasswordAuthTypeConnectionProperties,
      );

    case "None":
      return noneAuthTypeConnectionPropertiesSerializer(item as NoneAuthTypeConnectionProperties);

    case "SAS":
      return sasAuthTypeConnectionPropertiesSerializer(item as SASAuthTypeConnectionProperties);

    case "AccountKey":
      return accountKeyAuthTypeConnectionPropertiesSerializer(
        item as AccountKeyAuthTypeConnectionProperties,
      );

    case "ServicePrincipal":
      return servicePrincipalAuthTypeConnectionPropertiesSerializer(
        item as ServicePrincipalAuthTypeConnectionProperties,
      );

    case "AccessKey":
      return accessKeyAuthTypeConnectionPropertiesSerializer(
        item as AccessKeyAuthTypeConnectionProperties,
      );

    case "ApiKey":
      return apiKeyAuthConnectionPropertiesSerializer(item as ApiKeyAuthConnectionProperties);

    case "CustomKeys":
      return customKeysConnectionPropertiesSerializer(item as CustomKeysConnectionProperties);

    case "OAuth2":
      return oAuth2AuthTypeConnectionPropertiesSerializer(
        item as OAuth2AuthTypeConnectionProperties,
      );

    case "AAD":
      return aadAuthTypeConnectionPropertiesSerializer(item as AADAuthTypeConnectionProperties);

    default:
      return connectionPropertiesV2Serializer(item);
  }
}

export function connectionPropertiesV2UnionDeserializer(item: any): ConnectionPropertiesV2Union {
  switch (item["authType"]) {
    case "PAT":
      return patAuthTypeConnectionPropertiesDeserializer(item as PATAuthTypeConnectionProperties);

    case "ManagedIdentity":
      return managedIdentityAuthTypeConnectionPropertiesDeserializer(
        item as ManagedIdentityAuthTypeConnectionProperties,
      );

    case "UsernamePassword":
      return usernamePasswordAuthTypeConnectionPropertiesDeserializer(
        item as UsernamePasswordAuthTypeConnectionProperties,
      );

    case "None":
      return noneAuthTypeConnectionPropertiesDeserializer(item as NoneAuthTypeConnectionProperties);

    case "SAS":
      return sasAuthTypeConnectionPropertiesDeserializer(item as SASAuthTypeConnectionProperties);

    case "AccountKey":
      return accountKeyAuthTypeConnectionPropertiesDeserializer(
        item as AccountKeyAuthTypeConnectionProperties,
      );

    case "ServicePrincipal":
      return servicePrincipalAuthTypeConnectionPropertiesDeserializer(
        item as ServicePrincipalAuthTypeConnectionProperties,
      );

    case "AccessKey":
      return accessKeyAuthTypeConnectionPropertiesDeserializer(
        item as AccessKeyAuthTypeConnectionProperties,
      );

    case "ApiKey":
      return apiKeyAuthConnectionPropertiesDeserializer(item as ApiKeyAuthConnectionProperties);

    case "CustomKeys":
      return customKeysConnectionPropertiesDeserializer(item as CustomKeysConnectionProperties);

    case "OAuth2":
      return oAuth2AuthTypeConnectionPropertiesDeserializer(
        item as OAuth2AuthTypeConnectionProperties,
      );

    case "AAD":
      return aadAuthTypeConnectionPropertiesDeserializer(item as AADAuthTypeConnectionProperties);

    default:
      return connectionPropertiesV2Deserializer(item);
  }
}

/** Authentication type of the connection target */
export enum KnownConnectionAuthType {
  /** PAT */
  PAT = "PAT",
  /** ManagedIdentity */
  ManagedIdentity = "ManagedIdentity",
  /** UsernamePassword */
  UsernamePassword = "UsernamePassword",
  /** None */
  None = "None",
  /** SAS */
  SAS = "SAS",
  /** AccountKey */
  AccountKey = "AccountKey",
  /** ServicePrincipal */
  ServicePrincipal = "ServicePrincipal",
  /** AccessKey */
  AccessKey = "AccessKey",
  /** ApiKey */
  ApiKey = "ApiKey",
  /** CustomKeys */
  CustomKeys = "CustomKeys",
  /** OAuth2 */
  OAuth2 = "OAuth2",
  /** AAD */
  AAD = "AAD",
  /** DelegatedSAS */
  DelegatedSAS = "DelegatedSAS",
  /** ProjectManagedIdentity */
  ProjectManagedIdentity = "ProjectManagedIdentity",
  /** AccountManagedIdentity */
  AccountManagedIdentity = "AccountManagedIdentity",
  /** UserEntraToken */
  UserEntraToken = "UserEntraToken",
  /** AgentUserImpersonation */
  AgentUserImpersonation = "AgentUserImpersonation",
  /** AgenticIdentityToken */
  AgenticIdentityToken = "AgenticIdentityToken",
  /** AgenticUser */
  AgenticUser = "AgenticUser",
}

/**
 * Authentication type of the connection target \
 * {@link KnownConnectionAuthType} can be used interchangeably with ConnectionAuthType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PAT** \
 * **ManagedIdentity** \
 * **UsernamePassword** \
 * **None** \
 * **SAS** \
 * **AccountKey** \
 * **ServicePrincipal** \
 * **AccessKey** \
 * **ApiKey** \
 * **CustomKeys** \
 * **OAuth2** \
 * **AAD** \
 * **DelegatedSAS** \
 * **ProjectManagedIdentity** \
 * **AccountManagedIdentity** \
 * **UserEntraToken** \
 * **AgentUserImpersonation** \
 * **AgenticIdentityToken** \
 * **AgenticUser**
 */
export type ConnectionAuthType = string;

/** Category of the connection */
export enum KnownConnectionCategory {
  /** PythonFeed */
  PythonFeed = "PythonFeed",
  /** ContainerRegistry */
  ContainerRegistry = "ContainerRegistry",
  /** Git */
  Git = "Git",
  /** S3 */
  S3 = "S3",
  /** Snowflake */
  Snowflake = "Snowflake",
  /** AzureKeyVault */
  AzureKeyVault = "AzureKeyVault",
  /** AzureSqlDb */
  AzureSqlDb = "AzureSqlDb",
  /** AzureSynapseAnalytics */
  AzureSynapseAnalytics = "AzureSynapseAnalytics",
  /** AzureMySqlDb */
  AzureMySqlDb = "AzureMySqlDb",
  /** AzurePostgresDb */
  AzurePostgresDb = "AzurePostgresDb",
  /** ADLSGen2 */
  AdlsGen2 = "ADLSGen2",
  /** AzureContainerAppEnvironment */
  AzureContainerAppEnvironment = "AzureContainerAppEnvironment",
  /** Redis */
  Redis = "Redis",
  /** ApiKey */
  ApiKey = "ApiKey",
  /** AzureOpenAI */
  AzureOpenAI = "AzureOpenAI",
  /** AIServices */
  AIServices = "AIServices",
  /** CognitiveSearch */
  CognitiveSearch = "CognitiveSearch",
  /** CognitiveService */
  CognitiveService = "CognitiveService",
  /** CustomKeys */
  CustomKeys = "CustomKeys",
  /** AzureBlob */
  AzureBlob = "AzureBlob",
  /** AzureStorageAccount */
  AzureStorageAccount = "AzureStorageAccount",
  /** AzureOneLake */
  AzureOneLake = "AzureOneLake",
  /** CosmosDb */
  CosmosDb = "CosmosDb",
  /** CosmosDbMongoDbApi */
  CosmosDbMongoDbApi = "CosmosDbMongoDbApi",
  /** AzureDataExplorer */
  AzureDataExplorer = "AzureDataExplorer",
  /** AzureMariaDb */
  AzureMariaDb = "AzureMariaDb",
  /** AzureDatabricksDeltaLake */
  AzureDatabricksDeltaLake = "AzureDatabricksDeltaLake",
  /** AzureSqlMi */
  AzureSqlMi = "AzureSqlMi",
  /** AzureTableStorage */
  AzureTableStorage = "AzureTableStorage",
  /** AmazonRdsForOracle */
  AmazonRdsForOracle = "AmazonRdsForOracle",
  /** AmazonRdsForSqlServer */
  AmazonRdsForSqlServer = "AmazonRdsForSqlServer",
  /** AmazonRedshift */
  AmazonRedshift = "AmazonRedshift",
  /** Db2 */
  Db2 = "Db2",
  /** Drill */
  Drill = "Drill",
  /** GoogleBigQuery */
  GoogleBigQuery = "GoogleBigQuery",
  /** Greenplum */
  Greenplum = "Greenplum",
  /** Hbase */
  Hbase = "Hbase",
  /** Hive */
  Hive = "Hive",
  /** Impala */
  Impala = "Impala",
  /** Informix */
  Informix = "Informix",
  /** MariaDb */
  MariaDb = "MariaDb",
  /** MicrosoftAccess */
  MicrosoftAccess = "MicrosoftAccess",
  /** MySql */
  MySql = "MySql",
  /** Netezza */
  Netezza = "Netezza",
  /** Oracle */
  Oracle = "Oracle",
  /** Phoenix */
  Phoenix = "Phoenix",
  /** PostgreSql */
  PostgreSql = "PostgreSql",
  /** Presto */
  Presto = "Presto",
  /** SapOpenHub */
  SapOpenHub = "SapOpenHub",
  /** SapBw */
  SapBw = "SapBw",
  /** SapHana */
  SapHana = "SapHana",
  /** SapTable */
  SapTable = "SapTable",
  /** Spark */
  Spark = "Spark",
  /** SqlServer */
  SqlServer = "SqlServer",
  /** Sybase */
  Sybase = "Sybase",
  /** Teradata */
  Teradata = "Teradata",
  /** Vertica */
  Vertica = "Vertica",
  /** Pinecone */
  Pinecone = "Pinecone",
  /** Databricks */
  Databricks = "Databricks",
  /** Cassandra */
  Cassandra = "Cassandra",
  /** Couchbase */
  Couchbase = "Couchbase",
  /** MongoDbV2 */
  MongoDbV2 = "MongoDbV2",
  /** MongoDbAtlas */
  MongoDbAtlas = "MongoDbAtlas",
  /** AmazonS3Compatible */
  AmazonS3Compatible = "AmazonS3Compatible",
  /** FileServer */
  FileServer = "FileServer",
  /** FtpServer */
  FtpServer = "FtpServer",
  /** GoogleCloudStorage */
  GoogleCloudStorage = "GoogleCloudStorage",
  /** Hdfs */
  Hdfs = "Hdfs",
  /** OracleCloudStorage */
  OracleCloudStorage = "OracleCloudStorage",
  /** Sftp */
  Sftp = "Sftp",
  /** GenericHttp */
  GenericHttp = "GenericHttp",
  /** ODataRest */
  ODataRest = "ODataRest",
  /** Odbc */
  Odbc = "Odbc",
  /** GenericRest */
  GenericRest = "GenericRest",
  /** RemoteTool */
  RemoteTool = "RemoteTool",
  /** AmazonMws */
  AmazonMws = "AmazonMws",
  /** Concur */
  Concur = "Concur",
  /** Dynamics */
  Dynamics = "Dynamics",
  /** DynamicsAx */
  DynamicsAx = "DynamicsAx",
  /** DynamicsCrm */
  DynamicsCrm = "DynamicsCrm",
  /** GoogleAdWords */
  GoogleAdWords = "GoogleAdWords",
  /** Hubspot */
  Hubspot = "Hubspot",
  /** Jira */
  Jira = "Jira",
  /** Magento */
  Magento = "Magento",
  /** Marketo */
  Marketo = "Marketo",
  /** Office365 */
  Office365 = "Office365",
  /** Eloqua */
  Eloqua = "Eloqua",
  /** Responsys */
  Responsys = "Responsys",
  /** OracleServiceCloud */
  OracleServiceCloud = "OracleServiceCloud",
  /** PayPal */
  PayPal = "PayPal",
  /** QuickBooks */
  QuickBooks = "QuickBooks",
  /** Salesforce */
  Salesforce = "Salesforce",
  /** SalesforceServiceCloud */
  SalesforceServiceCloud = "SalesforceServiceCloud",
  /** SalesforceMarketingCloud */
  SalesforceMarketingCloud = "SalesforceMarketingCloud",
  /** SapCloudForCustomer */
  SapCloudForCustomer = "SapCloudForCustomer",
  /** SapEcc */
  SapEcc = "SapEcc",
  /** ServiceNow */
  ServiceNow = "ServiceNow",
  /** SharePointOnlineList */
  SharePointOnlineList = "SharePointOnlineList",
  /** Shopify */
  Shopify = "Shopify",
  /** Square */
  Square = "Square",
  /** WebTable */
  WebTable = "WebTable",
  /** Xero */
  Xero = "Xero",
  /** Zoho */
  Zoho = "Zoho",
  /** GenericContainerRegistry */
  GenericContainerRegistry = "GenericContainerRegistry",
  /** Elasticsearch */
  Elasticsearch = "Elasticsearch",
  /** AppInsights */
  AppInsights = "AppInsights",
  /** AppConfig */
  AppConfig = "AppConfig",
  /** OpenAI */
  OpenAI = "OpenAI",
  /** Serp */
  Serp = "Serp",
  /** BingLLMSearch */
  BingLLMSearch = "BingLLMSearch",
  /** Serverless */
  Serverless = "Serverless",
  /** ManagedOnlineEndpoint */
  ManagedOnlineEndpoint = "ManagedOnlineEndpoint",
  /** ApiManagement */
  ApiManagement = "ApiManagement",
  /** ModelGateway */
  ModelGateway = "ModelGateway",
  /** GroundingWithBingSearch */
  GroundingWithBingSearch = "GroundingWithBingSearch",
  /** GroundingWithCustomSearch */
  GroundingWithCustomSearch = "GroundingWithCustomSearch",
  /** Sharepoint */
  Sharepoint = "Sharepoint",
  /** MicrosoftFabric */
  MicrosoftFabric = "MicrosoftFabric",
  /** PowerPlatformEnvironment */
  PowerPlatformEnvironment = "PowerPlatformEnvironment",
  /** RemoteA2A */
  RemoteA2A = "RemoteA2A",
}

/**
 * Category of the connection \
 * {@link KnownConnectionCategory} can be used interchangeably with ConnectionCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PythonFeed** \
 * **ContainerRegistry** \
 * **Git** \
 * **S3** \
 * **Snowflake** \
 * **AzureKeyVault** \
 * **AzureSqlDb** \
 * **AzureSynapseAnalytics** \
 * **AzureMySqlDb** \
 * **AzurePostgresDb** \
 * **ADLSGen2** \
 * **AzureContainerAppEnvironment** \
 * **Redis** \
 * **ApiKey** \
 * **AzureOpenAI** \
 * **AIServices** \
 * **CognitiveSearch** \
 * **CognitiveService** \
 * **CustomKeys** \
 * **AzureBlob** \
 * **AzureStorageAccount** \
 * **AzureOneLake** \
 * **CosmosDb** \
 * **CosmosDbMongoDbApi** \
 * **AzureDataExplorer** \
 * **AzureMariaDb** \
 * **AzureDatabricksDeltaLake** \
 * **AzureSqlMi** \
 * **AzureTableStorage** \
 * **AmazonRdsForOracle** \
 * **AmazonRdsForSqlServer** \
 * **AmazonRedshift** \
 * **Db2** \
 * **Drill** \
 * **GoogleBigQuery** \
 * **Greenplum** \
 * **Hbase** \
 * **Hive** \
 * **Impala** \
 * **Informix** \
 * **MariaDb** \
 * **MicrosoftAccess** \
 * **MySql** \
 * **Netezza** \
 * **Oracle** \
 * **Phoenix** \
 * **PostgreSql** \
 * **Presto** \
 * **SapOpenHub** \
 * **SapBw** \
 * **SapHana** \
 * **SapTable** \
 * **Spark** \
 * **SqlServer** \
 * **Sybase** \
 * **Teradata** \
 * **Vertica** \
 * **Pinecone** \
 * **Databricks** \
 * **Cassandra** \
 * **Couchbase** \
 * **MongoDbV2** \
 * **MongoDbAtlas** \
 * **AmazonS3Compatible** \
 * **FileServer** \
 * **FtpServer** \
 * **GoogleCloudStorage** \
 * **Hdfs** \
 * **OracleCloudStorage** \
 * **Sftp** \
 * **GenericHttp** \
 * **ODataRest** \
 * **Odbc** \
 * **GenericRest** \
 * **RemoteTool** \
 * **AmazonMws** \
 * **Concur** \
 * **Dynamics** \
 * **DynamicsAx** \
 * **DynamicsCrm** \
 * **GoogleAdWords** \
 * **Hubspot** \
 * **Jira** \
 * **Magento** \
 * **Marketo** \
 * **Office365** \
 * **Eloqua** \
 * **Responsys** \
 * **OracleServiceCloud** \
 * **PayPal** \
 * **QuickBooks** \
 * **Salesforce** \
 * **SalesforceServiceCloud** \
 * **SalesforceMarketingCloud** \
 * **SapCloudForCustomer** \
 * **SapEcc** \
 * **ServiceNow** \
 * **SharePointOnlineList** \
 * **Shopify** \
 * **Square** \
 * **WebTable** \
 * **Xero** \
 * **Zoho** \
 * **GenericContainerRegistry** \
 * **Elasticsearch** \
 * **AppInsights** \
 * **AppConfig** \
 * **OpenAI** \
 * **Serp** \
 * **BingLLMSearch** \
 * **Serverless** \
 * **ManagedOnlineEndpoint** \
 * **ApiManagement** \
 * **ModelGateway** \
 * **GroundingWithBingSearch** \
 * **GroundingWithCustomSearch** \
 * **Sharepoint** \
 * **MicrosoftFabric** \
 * **PowerPlatformEnvironment** \
 * **RemoteA2A**
 */
export type ConnectionCategory = string;

/** Group based on connection category */
export enum KnownConnectionGroup {
  /** Azure */
  Azure = "Azure",
  /** AzureAI */
  AzureAI = "AzureAI",
  /** Database */
  Database = "Database",
  /** NoSQL */
  NoSQL = "NoSQL",
  /** File */
  File = "File",
  /** GenericProtocol */
  GenericProtocol = "GenericProtocol",
  /** ServicesAndApps */
  ServicesAndApps = "ServicesAndApps",
}

/**
 * Group based on connection category \
 * {@link KnownConnectionGroup} can be used interchangeably with ConnectionGroup,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Azure** \
 * **AzureAI** \
 * **Database** \
 * **NoSQL** \
 * **File** \
 * **GenericProtocol** \
 * **ServicesAndApps**
 */
export type ConnectionGroup = string;

/** Known values of {@link ManagedPERequirement} that the service accepts. */
export enum KnownManagedPERequirement {
  /** Required */
  Required = "Required",
  /** NotRequired */
  NotRequired = "NotRequired",
  /** NotApplicable */
  NotApplicable = "NotApplicable",
}

/** Type of ManagedPERequirement */
export type ManagedPERequirement = string;

/** Known values of {@link ManagedPEStatus} that the service accepts. */
export enum KnownManagedPEStatus {
  /** Inactive */
  Inactive = "Inactive",
  /** Active */
  Active = "Active",
  /** NotApplicable */
  NotApplicable = "NotApplicable",
}

/** Type of ManagedPEStatus */
export type ManagedPEStatus = string;

/** model interface PATAuthTypeConnectionProperties */
export interface PATAuthTypeConnectionProperties extends ConnectionPropertiesV2 {
  credentials?: ConnectionPersonalAccessToken;
  /** Authentication type of the connection target */
  authType: "PAT";
}

export function patAuthTypeConnectionPropertiesSerializer(
  item: PATAuthTypeConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionPersonalAccessTokenSerializer(item["credentials"]),
  };
}

export function patAuthTypeConnectionPropertiesDeserializer(
  item: any,
): PATAuthTypeConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionPersonalAccessTokenDeserializer(item["credentials"]),
  };
}

/** model interface ConnectionPersonalAccessToken */
export interface ConnectionPersonalAccessToken {
  pat?: string;
}

export function connectionPersonalAccessTokenSerializer(item: ConnectionPersonalAccessToken): any {
  return { pat: item["pat"] };
}

export function connectionPersonalAccessTokenDeserializer(
  item: any,
): ConnectionPersonalAccessToken {
  return {
    pat: item["pat"],
  };
}

/** model interface ManagedIdentityAuthTypeConnectionProperties */
export interface ManagedIdentityAuthTypeConnectionProperties extends ConnectionPropertiesV2 {
  credentials?: ConnectionManagedIdentity;
  /** Authentication type of the connection target */
  authType: "ManagedIdentity";
}

export function managedIdentityAuthTypeConnectionPropertiesSerializer(
  item: ManagedIdentityAuthTypeConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionManagedIdentitySerializer(item["credentials"]),
  };
}

export function managedIdentityAuthTypeConnectionPropertiesDeserializer(
  item: any,
): ManagedIdentityAuthTypeConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionManagedIdentityDeserializer(item["credentials"]),
  };
}

/** model interface ConnectionManagedIdentity */
export interface ConnectionManagedIdentity {
  clientId?: string;
  resourceId?: string;
}

export function connectionManagedIdentitySerializer(item: ConnectionManagedIdentity): any {
  return { clientId: item["clientId"], resourceId: item["resourceId"] };
}

export function connectionManagedIdentityDeserializer(item: any): ConnectionManagedIdentity {
  return {
    clientId: item["clientId"],
    resourceId: item["resourceId"],
  };
}

/** model interface UsernamePasswordAuthTypeConnectionProperties */
export interface UsernamePasswordAuthTypeConnectionProperties extends ConnectionPropertiesV2 {
  credentials?: ConnectionUsernamePassword;
  /** Authentication type of the connection target */
  authType: "UsernamePassword";
}

export function usernamePasswordAuthTypeConnectionPropertiesSerializer(
  item: UsernamePasswordAuthTypeConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionUsernamePasswordSerializer(item["credentials"]),
  };
}

export function usernamePasswordAuthTypeConnectionPropertiesDeserializer(
  item: any,
): UsernamePasswordAuthTypeConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionUsernamePasswordDeserializer(item["credentials"]),
  };
}

/** model interface ConnectionUsernamePassword */
export interface ConnectionUsernamePassword {
  password?: string;
  /** Optional, required by connections like SalesForce for extra security in addition to UsernamePassword */
  securityToken?: string;
  username?: string;
}

export function connectionUsernamePasswordSerializer(item: ConnectionUsernamePassword): any {
  return {
    password: item["password"],
    securityToken: item["securityToken"],
    username: item["username"],
  };
}

export function connectionUsernamePasswordDeserializer(item: any): ConnectionUsernamePassword {
  return {
    password: item["password"],
    securityToken: item["securityToken"],
    username: item["username"],
  };
}

/** model interface NoneAuthTypeConnectionProperties */
export interface NoneAuthTypeConnectionProperties extends ConnectionPropertiesV2 {
  /** Authentication type of the connection target */
  authType: "None";
}

export function noneAuthTypeConnectionPropertiesSerializer(
  item: NoneAuthTypeConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
  };
}

export function noneAuthTypeConnectionPropertiesDeserializer(
  item: any,
): NoneAuthTypeConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
  };
}

/** model interface SASAuthTypeConnectionProperties */
export interface SASAuthTypeConnectionProperties extends ConnectionPropertiesV2 {
  credentials?: ConnectionSharedAccessSignature;
  /** Authentication type of the connection target */
  authType: "SAS";
}

export function sasAuthTypeConnectionPropertiesSerializer(
  item: SASAuthTypeConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionSharedAccessSignatureSerializer(item["credentials"]),
  };
}

export function sasAuthTypeConnectionPropertiesDeserializer(
  item: any,
): SASAuthTypeConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionSharedAccessSignatureDeserializer(item["credentials"]),
  };
}

/** model interface ConnectionSharedAccessSignature */
export interface ConnectionSharedAccessSignature {
  sas?: string;
}

export function connectionSharedAccessSignatureSerializer(
  item: ConnectionSharedAccessSignature,
): any {
  return { sas: item["sas"] };
}

export function connectionSharedAccessSignatureDeserializer(
  item: any,
): ConnectionSharedAccessSignature {
  return {
    sas: item["sas"],
  };
}

/** This connection type covers the account key connection for Azure storage */
export interface AccountKeyAuthTypeConnectionProperties extends ConnectionPropertiesV2 {
  /** Account key object for connection credential. */
  credentials?: ConnectionAccountKey;
  /** Authentication type of the connection target */
  authType: "AccountKey";
}

export function accountKeyAuthTypeConnectionPropertiesSerializer(
  item: AccountKeyAuthTypeConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionAccountKeySerializer(item["credentials"]),
  };
}

export function accountKeyAuthTypeConnectionPropertiesDeserializer(
  item: any,
): AccountKeyAuthTypeConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionAccountKeyDeserializer(item["credentials"]),
  };
}

/** Account key object for connection credential. */
export interface ConnectionAccountKey {
  key?: string;
}

export function connectionAccountKeySerializer(item: ConnectionAccountKey): any {
  return { key: item["key"] };
}

export function connectionAccountKeyDeserializer(item: any): ConnectionAccountKey {
  return {
    key: item["key"],
  };
}

/** model interface ServicePrincipalAuthTypeConnectionProperties */
export interface ServicePrincipalAuthTypeConnectionProperties extends ConnectionPropertiesV2 {
  credentials?: ConnectionServicePrincipal;
  /** Authentication type of the connection target */
  authType: "ServicePrincipal";
}

export function servicePrincipalAuthTypeConnectionPropertiesSerializer(
  item: ServicePrincipalAuthTypeConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionServicePrincipalSerializer(item["credentials"]),
  };
}

export function servicePrincipalAuthTypeConnectionPropertiesDeserializer(
  item: any,
): ServicePrincipalAuthTypeConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionServicePrincipalDeserializer(item["credentials"]),
  };
}

/** model interface ConnectionServicePrincipal */
export interface ConnectionServicePrincipal {
  clientId?: string;
  clientSecret?: string;
  tenantId?: string;
}

export function connectionServicePrincipalSerializer(item: ConnectionServicePrincipal): any {
  return {
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    tenantId: item["tenantId"],
  };
}

export function connectionServicePrincipalDeserializer(item: any): ConnectionServicePrincipal {
  return {
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    tenantId: item["tenantId"],
  };
}

/** model interface AccessKeyAuthTypeConnectionProperties */
export interface AccessKeyAuthTypeConnectionProperties extends ConnectionPropertiesV2 {
  credentials?: ConnectionAccessKey;
  /** Authentication type of the connection target */
  authType: "AccessKey";
}

export function accessKeyAuthTypeConnectionPropertiesSerializer(
  item: AccessKeyAuthTypeConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionAccessKeySerializer(item["credentials"]),
  };
}

export function accessKeyAuthTypeConnectionPropertiesDeserializer(
  item: any,
): AccessKeyAuthTypeConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionAccessKeyDeserializer(item["credentials"]),
  };
}

/** model interface ConnectionAccessKey */
export interface ConnectionAccessKey {
  accessKeyId?: string;
  secretAccessKey?: string;
}

export function connectionAccessKeySerializer(item: ConnectionAccessKey): any {
  return { accessKeyId: item["accessKeyId"], secretAccessKey: item["secretAccessKey"] };
}

export function connectionAccessKeyDeserializer(item: any): ConnectionAccessKey {
  return {
    accessKeyId: item["accessKeyId"],
    secretAccessKey: item["secretAccessKey"],
  };
}

/**
 * This connection type covers the generic ApiKey auth connection categories, for examples:
 * AzureOpenAI:
 * Category:= AzureOpenAI
 * AuthType:= ApiKey (as type discriminator)
 * Credentials:= {ApiKey} as .ApiKey
 * Target:= {ApiBase}
 *
 * CognitiveService:
 * Category:= CognitiveService
 * AuthType:= ApiKey (as type discriminator)
 * Credentials:= {SubscriptionKey} as ApiKey
 * Target:= ServiceRegion={serviceRegion}
 *
 * CognitiveSearch:
 * Category:= CognitiveSearch
 * AuthType:= ApiKey (as type discriminator)
 * Credentials:= {Key} as ApiKey
 * Target:= {Endpoint}
 *
 * Use Metadata property bag for ApiType, ApiVersion, Kind and other metadata fields
 */
export interface ApiKeyAuthConnectionProperties extends ConnectionPropertiesV2 {
  /** Api key object for connection credential. */
  credentials?: ConnectionApiKey;
  /** Authentication type of the connection target */
  authType: "ApiKey";
}

export function apiKeyAuthConnectionPropertiesSerializer(
  item: ApiKeyAuthConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionApiKeySerializer(item["credentials"]),
  };
}

export function apiKeyAuthConnectionPropertiesDeserializer(
  item: any,
): ApiKeyAuthConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionApiKeyDeserializer(item["credentials"]),
  };
}

/** Api key object for connection credential. */
export interface ConnectionApiKey {
  key?: string;
}

export function connectionApiKeySerializer(item: ConnectionApiKey): any {
  return { key: item["key"] };
}

export function connectionApiKeyDeserializer(item: any): ConnectionApiKey {
  return {
    key: item["key"],
  };
}

/**
 * Category:= CustomKeys
 * AuthType:= CustomKeys (as type discriminator)
 * Credentials:= {CustomKeys} as CustomKeys
 * Target:= {any value}
 * Use Metadata property bag for ApiVersion and other metadata fields
 */
export interface CustomKeysConnectionProperties extends ConnectionPropertiesV2 {
  /** Custom Keys credential object */
  credentials?: CustomKeys;
  /** Authentication type of the connection target */
  authType: "CustomKeys";
}

export function customKeysConnectionPropertiesSerializer(
  item: CustomKeysConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : customKeysSerializer(item["credentials"]),
  };
}

export function customKeysConnectionPropertiesDeserializer(
  item: any,
): CustomKeysConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : customKeysDeserializer(item["credentials"]),
  };
}

/** Custom Keys credential object */
export interface CustomKeys {
  /** Dictionary of <string> */
  keys?: Record<string, string>;
}

export function customKeysSerializer(item: CustomKeys): any {
  return { keys: item["keys"] };
}

export function customKeysDeserializer(item: any): CustomKeys {
  return {
    keys: !item["keys"]
      ? item["keys"]
      : Object.fromEntries(Object.entries(item["keys"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** model interface OAuth2AuthTypeConnectionProperties */
export interface OAuth2AuthTypeConnectionProperties extends ConnectionPropertiesV2 {
  /**
   * ClientId and ClientSecret are required. Other properties are optional
   * depending on each OAuth2 provider's implementation.
   */
  credentials?: ConnectionOAuth2;
  /** Authentication type of the connection target */
  authType: "OAuth2";
}

export function oAuth2AuthTypeConnectionPropertiesSerializer(
  item: OAuth2AuthTypeConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionOAuth2Serializer(item["credentials"]),
  };
}

export function oAuth2AuthTypeConnectionPropertiesDeserializer(
  item: any,
): OAuth2AuthTypeConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : connectionOAuth2Deserializer(item["credentials"]),
  };
}

/**
 * ClientId and ClientSecret are required. Other properties are optional
 * depending on each OAuth2 provider's implementation.
 */
export interface ConnectionOAuth2 {
  /** Required by Concur connection category */
  authUrl?: string;
  /** Client id in the format of UUID */
  clientId?: string;
  clientSecret?: string;
  /** Required by GoogleAdWords connection category */
  developerToken?: string;
  password?: string;
  /**
   * Required by GoogleBigQuery, GoogleAdWords, Hubspot, QuickBooks, Square, Xero, Zoho
   * where user needs to get RefreshToken offline
   */
  refreshToken?: string;
  /** Required by QuickBooks and Xero connection categories */
  tenantId?: string;
  /**
   * Concur, ServiceNow auth server AccessToken grant type is 'Password'
   * which requires UsernamePassword
   */
  username?: string;
}

export function connectionOAuth2Serializer(item: ConnectionOAuth2): any {
  return {
    authUrl: item["authUrl"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    developerToken: item["developerToken"],
    password: item["password"],
    refreshToken: item["refreshToken"],
    tenantId: item["tenantId"],
    username: item["username"],
  };
}

export function connectionOAuth2Deserializer(item: any): ConnectionOAuth2 {
  return {
    authUrl: item["authUrl"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    developerToken: item["developerToken"],
    password: item["password"],
    refreshToken: item["refreshToken"],
    tenantId: item["tenantId"],
    username: item["username"],
  };
}

/** This connection type covers the AAD auth for any applicable Azure service */
export interface AADAuthTypeConnectionProperties extends ConnectionPropertiesV2 {
  /** Authentication type of the connection target */
  authType: "AAD";
}

export function aadAuthTypeConnectionPropertiesSerializer(
  item: AADAuthTypeConnectionProperties,
): any {
  return {
    authType: item["authType"],
    category: item["category"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    isSharedToAll: item["isSharedToAll"],
    metadata: item["metadata"],
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
  };
}

export function aadAuthTypeConnectionPropertiesDeserializer(
  item: any,
): AADAuthTypeConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    createdByWorkspaceArmId: item["createdByWorkspaceArmId"],
    error: item["error"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    group: item["group"],
    isSharedToAll: item["isSharedToAll"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    peRequirement: item["peRequirement"],
    peStatus: item["peStatus"],
    sharedUserList: !item["sharedUserList"]
      ? item["sharedUserList"]
      : item["sharedUserList"].map((p: any) => {
          return p;
        }),
    target: item["target"],
    useWorkspaceManagedIdentity: item["useWorkspaceManagedIdentity"],
  };
}

/** The properties that the Cognitive services connection will be updated with. */
export interface ConnectionUpdateContent {
  /** The properties that the Cognitive services connection will be updated with. */
  properties?: ConnectionPropertiesV2Union;
}

export function connectionUpdateContentSerializer(item: ConnectionUpdateContent): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : connectionPropertiesV2UnionSerializer(item["properties"]),
  };
}

/** model interface _ConnectionPropertiesV2BasicResourceArmPaginatedResult */
export interface _ConnectionPropertiesV2BasicResourceArmPaginatedResult {
  nextLink?: string;
  value?: ConnectionPropertiesV2BasicResource[];
}

export function _connectionPropertiesV2BasicResourceArmPaginatedResultDeserializer(
  item: any,
): _ConnectionPropertiesV2BasicResourceArmPaginatedResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"]
      ? item["value"]
      : connectionPropertiesV2BasicResourceArrayDeserializer(item["value"]),
  };
}

export function connectionPropertiesV2BasicResourceArraySerializer(
  result: Array<ConnectionPropertiesV2BasicResource>,
): any[] {
  return result.map((item) => {
    return connectionPropertiesV2BasicResourceSerializer(item);
  });
}

export function connectionPropertiesV2BasicResourceArrayDeserializer(
  result: Array<ConnectionPropertiesV2BasicResource>,
): any[] {
  return result.map((item) => {
    return connectionPropertiesV2BasicResourceDeserializer(item);
  });
}

/** Azure Resource Manager resource envelope for Project CapabilityHost. */
export interface ProjectCapabilityHost extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: ProjectCapabilityHostProperties;
}

export function projectCapabilityHostSerializer(item: ProjectCapabilityHost): any {
  return { properties: projectCapabilityHostPropertiesSerializer(item["properties"]) };
}

export function projectCapabilityHostDeserializer(item: any): ProjectCapabilityHost {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: projectCapabilityHostPropertiesDeserializer(item["properties"]),
  };
}

/** model interface ProjectCapabilityHostProperties */
export interface ProjectCapabilityHostProperties {
  /** List of AI services connections. */
  aiServicesConnections?: string[];
  /** List of connection names from those available in the account or project to be used for vector database (e.g. CosmosDB). */
  vectorStoreConnections?: string[];
  /** List of connection names from those available in the account or project to be used as a storage resource. */
  storageConnections?: string[];
  /** List of connection names from those available in the account or project to be used for Thread storage. */
  threadStorageConnections?: string[];
  /** Provisioning state for the CapabilityHost. */
  readonly provisioningState?: CapabilityHostProvisioningState;
}

export function projectCapabilityHostPropertiesSerializer(
  item: ProjectCapabilityHostProperties,
): any {
  return {
    aiServicesConnections: !item["aiServicesConnections"]
      ? item["aiServicesConnections"]
      : item["aiServicesConnections"].map((p: any) => {
          return p;
        }),
    vectorStoreConnections: !item["vectorStoreConnections"]
      ? item["vectorStoreConnections"]
      : item["vectorStoreConnections"].map((p: any) => {
          return p;
        }),
    storageConnections: !item["storageConnections"]
      ? item["storageConnections"]
      : item["storageConnections"].map((p: any) => {
          return p;
        }),
    threadStorageConnections: !item["threadStorageConnections"]
      ? item["threadStorageConnections"]
      : item["threadStorageConnections"].map((p: any) => {
          return p;
        }),
  };
}

export function projectCapabilityHostPropertiesDeserializer(
  item: any,
): ProjectCapabilityHostProperties {
  return {
    aiServicesConnections: !item["aiServicesConnections"]
      ? item["aiServicesConnections"]
      : item["aiServicesConnections"].map((p1: any) => {
          return p1;
        }),
    vectorStoreConnections: !item["vectorStoreConnections"]
      ? item["vectorStoreConnections"]
      : item["vectorStoreConnections"].map((p1: any) => {
          return p1;
        }),
    storageConnections: !item["storageConnections"]
      ? item["storageConnections"]
      : item["storageConnections"].map((p1: any) => {
          return p1;
        }),
    threadStorageConnections: !item["threadStorageConnections"]
      ? item["threadStorageConnections"]
      : item["threadStorageConnections"].map((p1: any) => {
          return p1;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** Provisioning state of capability host. */
export enum KnownCapabilityHostProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * Provisioning state of capability host. \
 * {@link KnownCapabilityHostProvisioningState} can be used interchangeably with CapabilityHostProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Creating** \
 * **Updating** \
 * **Deleting**
 */
export type CapabilityHostProvisioningState = string;

/** A paginated list of Project Capability Host entities. */
export interface _ProjectCapabilityHostResourceArmPaginatedResult {
  /** The link to the next page of Project Capability Host objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type Project Capability Host. */
  value?: ProjectCapabilityHost[];
}

export function _projectCapabilityHostResourceArmPaginatedResultDeserializer(
  item: any,
): _ProjectCapabilityHostResourceArmPaginatedResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : projectCapabilityHostArrayDeserializer(item["value"]),
  };
}

export function projectCapabilityHostArraySerializer(result: Array<ProjectCapabilityHost>): any[] {
  return result.map((item) => {
    return projectCapabilityHostSerializer(item);
  });
}

export function projectCapabilityHostArrayDeserializer(
  result: Array<ProjectCapabilityHost>,
): any[] {
  return result.map((item) => {
    return projectCapabilityHostDeserializer(item);
  });
}

/** The quota tier information for the subscription */
export interface QuotaTier extends ProxyResource {
  /** Properties of quota tier resource. */
  properties?: QuotaTierProperties;
}

export function quotaTierSerializer(item: QuotaTier): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : quotaTierPropertiesSerializer(item["properties"]),
  };
}

export function quotaTierDeserializer(item: any): QuotaTier {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : quotaTierPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of Quota Tier resource'. */
export interface QuotaTierProperties {
  /** Name of the current quota tier for the subscription. */
  readonly currentTierName?: string;
  /** Gets the tier upgrade policy for the subscription. */
  tierUpgradePolicy?: TierUpgradePolicy;
  /** The date on which the current tier was assigned to the subscription (UTC). */
  readonly assignmentDate?: Date;
  /** Information about the quota tier upgrade eligibility for the subscription. */
  readonly tierUpgradeEligibilityInfo?: QuotaTierUpgradeEligibilityInfo;
}

export function quotaTierPropertiesSerializer(item: QuotaTierProperties): any {
  return { tierUpgradePolicy: item["tierUpgradePolicy"] };
}

export function quotaTierPropertiesDeserializer(item: any): QuotaTierProperties {
  return {
    currentTierName: item["currentTierName"],
    tierUpgradePolicy: item["tierUpgradePolicy"],
    assignmentDate: !item["assignmentDate"]
      ? item["assignmentDate"]
      : new Date(item["assignmentDate"]),
    tierUpgradeEligibilityInfo: !item["tierUpgradeEligibilityInfo"]
      ? item["tierUpgradeEligibilityInfo"]
      : quotaTierUpgradeEligibilityInfoDeserializer(item["tierUpgradeEligibilityInfo"]),
  };
}

/** Gets the tier upgrade policy for the subscription. */
export enum KnownTierUpgradePolicy {
  /** OnceUpgradeIsAvailable */
  OnceUpgradeIsAvailable = "OnceUpgradeIsAvailable",
  /** NoAutoUpgrade */
  NoAutoUpgrade = "NoAutoUpgrade",
}

/**
 * Gets the tier upgrade policy for the subscription. \
 * {@link KnownTierUpgradePolicy} can be used interchangeably with TierUpgradePolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OnceUpgradeIsAvailable** \
 * **NoAutoUpgrade**
 */
export type TierUpgradePolicy = string;

/** Information about the quota tier upgrade eligibility for the subscription. */
export interface QuotaTierUpgradeEligibilityInfo {
  /** Name of the next quota tier for the subscription. */
  nextTierName?: string;
  /** Specifies whether an upgrade to the next quota tier is available. */
  upgradeAvailabilityStatus?: UpgradeAvailabilityStatus;
  /** The date after which the current tier will be upgraded to the next tier if the TierUpgradePolicy is "OnceUpgradeIsAvailable" (UTC). */
  upgradeApplicableDate?: Date;
  /** Reason in case the subscription is not eligible for upgrade to the next tier. */
  upgradeUnavailabilityReason?: string;
}

export function quotaTierUpgradeEligibilityInfoDeserializer(
  item: any,
): QuotaTierUpgradeEligibilityInfo {
  return {
    nextTierName: item["nextTierName"],
    upgradeAvailabilityStatus: item["upgradeAvailabilityStatus"],
    upgradeApplicableDate: !item["upgradeApplicableDate"]
      ? item["upgradeApplicableDate"]
      : new Date(item["upgradeApplicableDate"]),
    upgradeUnavailabilityReason: item["upgradeUnavailabilityReason"],
  };
}

/** Specifies whether an upgrade to the next quota tier is available. */
export enum KnownUpgradeAvailabilityStatus {
  /** Available */
  Available = "Available",
  /** NotAvailable */
  NotAvailable = "NotAvailable",
}

/**
 * Specifies whether an upgrade to the next quota tier is available. \
 * {@link KnownUpgradeAvailabilityStatus} can be used interchangeably with UpgradeAvailabilityStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Available** \
 * **NotAvailable**
 */
export type UpgradeAvailabilityStatus = string;

/** The list of Quota Tiers response. */
export interface _QuotaTierListResult {
  /** The link used to get the next page of quota tiers. */
  nextLink?: string;
  /** Gets the list of Quota Tiers and their properties. */
  readonly value?: QuotaTier[];
}

export function _quotaTierListResultDeserializer(item: any): _QuotaTierListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : quotaTierArrayDeserializer(item["value"]),
  };
}

export function quotaTierArraySerializer(result: Array<QuotaTier>): any[] {
  return result.map((item) => {
    return quotaTierSerializer(item);
  });
}

export function quotaTierArrayDeserializer(result: Array<QuotaTier>): any[] {
  return result.map((item) => {
    return quotaTierDeserializer(item);
  });
}

/** Agent Application resource */
export interface AgentApplication extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: AgenticApplicationProperties;
}

export function agentApplicationSerializer(item: AgentApplication): any {
  return { properties: agenticApplicationPropertiesSerializer(item["properties"]) };
}

export function agentApplicationDeserializer(item: any): AgentApplication {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: agenticApplicationPropertiesDeserializer(item["properties"]),
  };
}

/** Resource type representing an agentic application as a management construct. */
export interface AgenticApplicationProperties extends ResourceBase {
  /** The display name of the application. */
  displayName?: string;
  /** The application's dedicated invocation endpoint. */
  baseUrl?: string;
  /** The list of agent definitions comprising this application, returned as references to the objects under the parent project; use this to obtain a flat list of all agent-version pairs represented by this application. */
  agents?: AgentReferenceProperties[];
  /** The EntraId Agentic Blueprint of the application. */
  agentIdentityBlueprint?: AssignedIdentity;
  /** The (default) agent instance identity of the application. */
  defaultInstanceIdentity?: AssignedIdentity;
  /** Gets or sets the authorization policy associated with this agentic application instance. */
  authorizationPolicy?: ApplicationAuthorizationPolicyUnion;
  /** Gets or sets the traffic routing policy for the application's deployments. */
  trafficRoutingPolicy?: ApplicationTrafficRoutingPolicy;
  /** Provisioning state of the application. */
  readonly provisioningState?: AgenticApplicationProvisioningState;
  /** Enabledstate of the application. */
  readonly isEnabled?: boolean;
}

export function agenticApplicationPropertiesSerializer(item: AgenticApplicationProperties): any {
  return {
    description: item["description"],
    tags: item["tags"],
    displayName: item["displayName"],
    baseUrl: item["baseUrl"],
    agents: !item["agents"]
      ? item["agents"]
      : agentReferencePropertiesArraySerializer(item["agents"]),
    agentIdentityBlueprint: !item["agentIdentityBlueprint"]
      ? item["agentIdentityBlueprint"]
      : assignedIdentitySerializer(item["agentIdentityBlueprint"]),
    defaultInstanceIdentity: !item["defaultInstanceIdentity"]
      ? item["defaultInstanceIdentity"]
      : assignedIdentitySerializer(item["defaultInstanceIdentity"]),
    authorizationPolicy: !item["authorizationPolicy"]
      ? item["authorizationPolicy"]
      : applicationAuthorizationPolicyUnionSerializer(item["authorizationPolicy"]),
    trafficRoutingPolicy: !item["trafficRoutingPolicy"]
      ? item["trafficRoutingPolicy"]
      : applicationTrafficRoutingPolicySerializer(item["trafficRoutingPolicy"]),
  };
}

export function agenticApplicationPropertiesDeserializer(item: any): AgenticApplicationProperties {
  return {
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, p1])),
    displayName: item["displayName"],
    baseUrl: item["baseUrl"],
    agents: !item["agents"]
      ? item["agents"]
      : agentReferencePropertiesArrayDeserializer(item["agents"]),
    agentIdentityBlueprint: !item["agentIdentityBlueprint"]
      ? item["agentIdentityBlueprint"]
      : assignedIdentityDeserializer(item["agentIdentityBlueprint"]),
    defaultInstanceIdentity: !item["defaultInstanceIdentity"]
      ? item["defaultInstanceIdentity"]
      : assignedIdentityDeserializer(item["defaultInstanceIdentity"]),
    authorizationPolicy: !item["authorizationPolicy"]
      ? item["authorizationPolicy"]
      : applicationAuthorizationPolicyUnionDeserializer(item["authorizationPolicy"]),
    trafficRoutingPolicy: !item["trafficRoutingPolicy"]
      ? item["trafficRoutingPolicy"]
      : applicationTrafficRoutingPolicyDeserializer(item["trafficRoutingPolicy"]),
    provisioningState: item["provisioningState"],
    isEnabled: item["isEnabled"],
  };
}

export function agentReferencePropertiesArraySerializer(
  result: Array<AgentReferenceProperties>,
): any[] {
  return result.map((item) => {
    return agentReferencePropertiesSerializer(item);
  });
}

export function agentReferencePropertiesArrayDeserializer(
  result: Array<AgentReferenceProperties>,
): any[] {
  return result.map((item) => {
    return agentReferencePropertiesDeserializer(item);
  });
}

/** Type modeling a reference to a version of an agent definition. */
export interface AgentReferenceProperties {
  /** Gets the agent's unique identifier within the organization (subscription). */
  agentId?: string;
  /** Gets the agent's name (unique within the project/app). */
  agentName?: string;
}

export function agentReferencePropertiesSerializer(item: AgentReferenceProperties): any {
  return { agentId: item["agentId"], agentName: item["agentName"] };
}

export function agentReferencePropertiesDeserializer(item: any): AgentReferenceProperties {
  return {
    agentId: item["agentId"],
    agentName: item["agentName"],
  };
}

/** Type representing an identity assignment */
export interface AssignedIdentity {
  /** Specifies the kind of Entra identity described by this object. */
  kind: IdentityKind;
  /** Enumeration of identity types, from the perspective of management. */
  type: IdentityManagementType;
  /** The client ID of the identity. */
  clientId: string;
  /** The principal ID of the identity. */
  principalId: string;
  /** The tenant ID of the identity. */
  tenantId: string;
  /** The subject of this identity assignment. */
  subject?: string;
  /** Represents the provisioning state of an identity resource. */
  readonly provisioningState?: IdentityProvisioningState;
}

export function assignedIdentitySerializer(item: AssignedIdentity): any {
  return {
    kind: item["kind"],
    type: item["type"],
    clientId: item["clientId"],
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    subject: item["subject"],
  };
}

export function assignedIdentityDeserializer(item: any): AssignedIdentity {
  return {
    kind: item["kind"],
    type: item["type"],
    clientId: item["clientId"],
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    subject: item["subject"],
    provisioningState: item["provisioningState"],
  };
}

/** Specifies the kind of Entra identity described by this object. */
export enum KnownIdentityKind {
  /** Represents a class identity, used for agentic applications. */
  AgentBlueprint = "AgentBlueprint",
  /** Represents an instance identity. */
  AgentInstance = "AgentInstance",
  /** Represents an agentic instance identity with user-like traits. */
  AgenticUser = "AgenticUser",
  /** Represents a classic managed identity. */
  Managed = "Managed",
  /** No identity. */
  None = "None",
}

/**
 * Specifies the kind of Entra identity described by this object. \
 * {@link KnownIdentityKind} can be used interchangeably with IdentityKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AgentBlueprint**: Represents a class identity, used for agentic applications. \
 * **AgentInstance**: Represents an instance identity. \
 * **AgenticUser**: Represents an agentic instance identity with user-like traits. \
 * **Managed**: Represents a classic managed identity. \
 * **None**: No identity.
 */
export type IdentityKind = string;

/** Enumeration of identity types, from the perspective of management. */
export enum KnownIdentityManagementType {
  /** Platform-managed identity. */
  System = "System",
  /** User-managed identity. */
  User = "User",
  /** No identity. */
  None = "None",
}

/**
 * Enumeration of identity types, from the perspective of management. \
 * {@link KnownIdentityManagementType} can be used interchangeably with IdentityManagementType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **System**: Platform-managed identity. \
 * **User**: User-managed identity. \
 * **None**: No identity.
 */
export type IdentityManagementType = string;

/** Represents the provisioning state of an identity resource. */
export enum KnownIdentityProvisioningState {
  /** Identity is being created. */
  Creating = "Creating",
  /** Identity is being updated. */
  Updating = "Updating",
  /** Identity has been successfully provisioned. */
  Succeeded = "Succeeded",
  /** Identity provisioning has failed. */
  Failed = "Failed",
  /** Identity provisioning has been canceled. */
  Canceled = "Canceled",
  /** Identity is being deleted. */
  Deleting = "Deleting",
}

/**
 * Represents the provisioning state of an identity resource. \
 * {@link KnownIdentityProvisioningState} can be used interchangeably with IdentityProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Identity is being created. \
 * **Updating**: Identity is being updated. \
 * **Succeeded**: Identity has been successfully provisioned. \
 * **Failed**: Identity provisioning has failed. \
 * **Canceled**: Identity provisioning has been canceled. \
 * **Deleting**: Identity is being deleted.
 */
export type IdentityProvisioningState = string;

/** Represents a policy for authorizing applications based on specified authentication and authorization schemes. */
export interface ApplicationAuthorizationPolicy {
  /** Authorization scheme type. */
  /** The discriminator possible values: Default, OrganizationScope, Channels */
  type: BuiltInAuthorizationScheme;
}

export function applicationAuthorizationPolicySerializer(
  item: ApplicationAuthorizationPolicy,
): any {
  return { type: item["type"] };
}

export function applicationAuthorizationPolicyDeserializer(
  item: any,
): ApplicationAuthorizationPolicy {
  return {
    type: item["type"],
  };
}

/** Alias for ApplicationAuthorizationPolicyUnion */
export type ApplicationAuthorizationPolicyUnion =
  | RoleBasedBuiltInAuthorizationPolicy
  | OrganizationSharedBuiltInAuthorizationPolicy
  | ChannelsBuiltInAuthorizationPolicy
  | ApplicationAuthorizationPolicy;

export function applicationAuthorizationPolicyUnionSerializer(
  item: ApplicationAuthorizationPolicyUnion,
): any {
  switch (item.type) {
    case "Default":
      return roleBasedBuiltInAuthorizationPolicySerializer(
        item as RoleBasedBuiltInAuthorizationPolicy,
      );

    case "OrganizationScope":
      return organizationSharedBuiltInAuthorizationPolicySerializer(
        item as OrganizationSharedBuiltInAuthorizationPolicy,
      );

    case "Channels":
      return channelsBuiltInAuthorizationPolicySerializer(
        item as ChannelsBuiltInAuthorizationPolicy,
      );

    default:
      return applicationAuthorizationPolicySerializer(item);
  }
}

export function applicationAuthorizationPolicyUnionDeserializer(
  item: any,
): ApplicationAuthorizationPolicyUnion {
  switch (item["type"]) {
    case "Default":
      return roleBasedBuiltInAuthorizationPolicyDeserializer(
        item as RoleBasedBuiltInAuthorizationPolicy,
      );

    case "OrganizationScope":
      return organizationSharedBuiltInAuthorizationPolicyDeserializer(
        item as OrganizationSharedBuiltInAuthorizationPolicy,
      );

    case "Channels":
      return channelsBuiltInAuthorizationPolicyDeserializer(
        item as ChannelsBuiltInAuthorizationPolicy,
      );

    default:
      return applicationAuthorizationPolicyDeserializer(item);
  }
}

/** Authorization scheme type. */
export enum KnownBuiltInAuthorizationScheme {
  /** Standard AzureML RBAC */
  Default = "Default",
  /** Claim-based, requires membership in the tenant */
  OrganizationScope = "OrganizationScope",
  /** Channels-specific (AzureBotService) authorization */
  Channels = "Channels",
  /** Custom scheme defined by the application author */
  Custom = "Custom",
}

/**
 * Authorization scheme type. \
 * {@link KnownBuiltInAuthorizationScheme} can be used interchangeably with BuiltInAuthorizationScheme,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Standard AzureML RBAC \
 * **OrganizationScope**: Claim-based, requires membership in the tenant \
 * **Channels**: Channels-specific (AzureBotService) authorization \
 * **Custom**: Custom scheme defined by the application author
 */
export type BuiltInAuthorizationScheme = string;

/** Built-in role-based authorization policy. */
export interface RoleBasedBuiltInAuthorizationPolicy extends ApplicationAuthorizationPolicy {
  /** Authorization scheme type. */
  type: "Default";
}

export function roleBasedBuiltInAuthorizationPolicySerializer(
  item: RoleBasedBuiltInAuthorizationPolicy,
): any {
  return { type: item["type"] };
}

export function roleBasedBuiltInAuthorizationPolicyDeserializer(
  item: any,
): RoleBasedBuiltInAuthorizationPolicy {
  return {
    type: item["type"],
  };
}

/** Built-in authorization policy scoped to organization/tenant. */
export interface OrganizationSharedBuiltInAuthorizationPolicy extends ApplicationAuthorizationPolicy {
  /** Authorization scheme type. */
  type: "OrganizationScope";
}

export function organizationSharedBuiltInAuthorizationPolicySerializer(
  item: OrganizationSharedBuiltInAuthorizationPolicy,
): any {
  return { type: item["type"] };
}

export function organizationSharedBuiltInAuthorizationPolicyDeserializer(
  item: any,
): OrganizationSharedBuiltInAuthorizationPolicy {
  return {
    type: item["type"],
  };
}

/** Represents a built-in authorization policy specific to Azure Bot Service/Channels authentication. */
export interface ChannelsBuiltInAuthorizationPolicy extends ApplicationAuthorizationPolicy {
  /** Authorization scheme type. */
  type: "Channels";
}

export function channelsBuiltInAuthorizationPolicySerializer(
  item: ChannelsBuiltInAuthorizationPolicy,
): any {
  return { type: item["type"] };
}

export function channelsBuiltInAuthorizationPolicyDeserializer(
  item: any,
): ChannelsBuiltInAuthorizationPolicy {
  return {
    type: item["type"],
  };
}

/** Type representing an application traffic policy as a property of an agentic application. */
export interface ApplicationTrafficRoutingPolicy {
  /** Methodology used to route traffic to the application's deployments. */
  protocol?: TrafficRoutingProtocol;
  /** Gets or sets the collection of traffic routing rules. */
  rules?: TrafficRoutingRule[];
}

export function applicationTrafficRoutingPolicySerializer(
  item: ApplicationTrafficRoutingPolicy,
): any {
  return {
    protocol: item["protocol"],
    rules: !item["rules"] ? item["rules"] : trafficRoutingRuleArraySerializer(item["rules"]),
  };
}

export function applicationTrafficRoutingPolicyDeserializer(
  item: any,
): ApplicationTrafficRoutingPolicy {
  return {
    protocol: item["protocol"],
    rules: !item["rules"] ? item["rules"] : trafficRoutingRuleArrayDeserializer(item["rules"]),
  };
}

/** Traffic routing protocol, used to distribute an application's inbound traffic to its deployments. */
export enum KnownTrafficRoutingProtocol {
  /** Percentage based routing */
  FixedRatio = "FixedRatio",
}

/**
 * Traffic routing protocol, used to distribute an application's inbound traffic to its deployments. \
 * {@link KnownTrafficRoutingProtocol} can be used interchangeably with TrafficRoutingProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FixedRatio**: Percentage based routing
 */
export type TrafficRoutingProtocol = string;

export function trafficRoutingRuleArraySerializer(result: Array<TrafficRoutingRule>): any[] {
  return result.map((item) => {
    return trafficRoutingRuleSerializer(item);
  });
}

export function trafficRoutingRuleArrayDeserializer(result: Array<TrafficRoutingRule>): any[] {
  return result.map((item) => {
    return trafficRoutingRuleDeserializer(item);
  });
}

/** Represents a rule for routing traffic to a specific deployment. */
export interface TrafficRoutingRule {
  /** The identifier of this traffic routing rule. */
  ruleId?: string;
  /** A user-provided description for this traffic routing rule. */
  description?: string;
  /** The unique identifier of the deployment to which traffic is routed by this rule. */
  deploymentId?: string;
  /** Gets or sets the percentage of traffic allocated to this instance. */
  trafficPercentage?: number;
}

export function trafficRoutingRuleSerializer(item: TrafficRoutingRule): any {
  return {
    ruleId: item["ruleId"],
    description: item["description"],
    deploymentId: item["deploymentId"],
    trafficPercentage: item["trafficPercentage"],
  };
}

export function trafficRoutingRuleDeserializer(item: any): TrafficRoutingRule {
  return {
    ruleId: item["ruleId"],
    description: item["description"],
    deploymentId: item["deploymentId"],
    trafficPercentage: item["trafficPercentage"],
  };
}

/** Provisioning state of an agentic application. */
export enum KnownAgenticApplicationProvisioningState {
  /** The application was successfully provisioned. */
  Succeeded = "Succeeded",
  /** The application provisioning failed. */
  Failed = "Failed",
  /** The application provisioning was canceled. */
  Canceled = "Canceled",
  /** The application is being created. */
  Creating = "Creating",
  /** The application is being updated. */
  Updating = "Updating",
  /** The application is being deleted. */
  Deleting = "Deleting",
}

/**
 * Provisioning state of an agentic application. \
 * {@link KnownAgenticApplicationProvisioningState} can be used interchangeably with AgenticApplicationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The application was successfully provisioned. \
 * **Failed**: The application provisioning failed. \
 * **Canceled**: The application provisioning was canceled. \
 * **Creating**: The application is being created. \
 * **Updating**: The application is being updated. \
 * **Deleting**: The application is being deleted.
 */
export type AgenticApplicationProvisioningState = string;

/** model interface ResourceBase */
export interface ResourceBase {
  /** The asset description text. */
  description?: string;
  /** Tag dictionary. Tags can be added, removed, and updated. */
  tags?: Record<string, string>;
}

export function resourceBaseSerializer(item: ResourceBase): any {
  return { description: item["description"], tags: item["tags"] };
}

export function resourceBaseDeserializer(item: any): ResourceBase {
  return {
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, p1])),
  };
}

/** A paginated list of Agent Application entities. */
export interface _AgentApplicationResourceArmPaginatedResult {
  /** The link to the next page of Agent Application objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type Agent Application. */
  value?: AgentApplication[];
}

export function _agentApplicationResourceArmPaginatedResultDeserializer(
  item: any,
): _AgentApplicationResourceArmPaginatedResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : agentApplicationArrayDeserializer(item["value"]),
  };
}

export function agentApplicationArraySerializer(result: Array<AgentApplication>): any[] {
  return result.map((item) => {
    return agentApplicationSerializer(item);
  });
}

export function agentApplicationArrayDeserializer(result: Array<AgentApplication>): any[] {
  return result.map((item) => {
    return agentApplicationDeserializer(item);
  });
}

/** A paginated list of Agent Reference entities. */
export interface AgentReferenceResourceArmPaginatedResult {
  /** The link to the next page of Agent Reference objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type Agent Reference. */
  value?: AgentReference[];
}

export function agentReferenceResourceArmPaginatedResultDeserializer(
  item: any,
): AgentReferenceResourceArmPaginatedResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : agentReferenceArrayDeserializer(item["value"]),
  };
}

export function agentReferenceArrayDeserializer(result: Array<AgentReference>): any[] {
  return result.map((item) => {
    return agentReferenceDeserializer(item);
  });
}

/** Agent Reference resource */
export interface AgentReference extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: AgentReferenceProperties;
}

export function agentReferenceDeserializer(item: any): AgentReference {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: agentReferencePropertiesDeserializer(item["properties"]),
  };
}

/** The status of an async compute operation. */
export interface ComputeOperationStatus extends ProxyResource {
  /** The properties of the compute operation status. */
  properties?: ComputeOperationStatusProperties;
}

export function computeOperationStatusDeserializer(item: any): ComputeOperationStatus {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : computeOperationStatusPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a compute operation status. */
export interface ComputeOperationStatusProperties {
  /** The start time of the operation. */
  readonly startTime?: Date;
  /** The end time of the operation. */
  readonly endTime?: Date;
  /** The status of the operation. */
  status?: ComputeOperationStatusType;
  /** Error details if the operation failed. */
  error?: ErrorDetail;
}

export function computeOperationStatusPropertiesDeserializer(
  item: any,
): ComputeOperationStatusProperties {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The status type of a compute operation. */
export enum KnownComputeOperationStatusType {
  /** The operation is in progress. */
  InProgress = "InProgress",
  /** The operation has succeeded. */
  Succeeded = "Succeeded",
  /** The operation has failed. */
  Failed = "Failed",
  /** The operation has been canceled. */
  Canceled = "Canceled",
}

/**
 * The status type of a compute operation. \
 * {@link KnownComputeOperationStatusType} can be used interchangeably with ComputeOperationStatusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress**: The operation is in progress. \
 * **Succeeded**: The operation has succeeded. \
 * **Failed**: The operation has failed. \
 * **Canceled**: The operation has been canceled.
 */
export type ComputeOperationStatusType = string;

/** A list of private link resources */
export interface PrivateLinkResourceListResult {
  /** Array of private link resources */
  value?: PrivateLinkResource[];
}

export function privateLinkResourceListResultDeserializer(
  item: any,
): PrivateLinkResourceListResult {
  return {
    value: !item["value"] ? item["value"] : privateLinkResourceArrayDeserializer(item["value"]),
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** A private link resource */
export interface PrivateLinkResource extends Resource {
  /** Resource properties. */
  properties?: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource Private link DNS zone name. */
  requiredZoneNames?: string[];
  /** The private link resource display name. */
  readonly displayName?: string;
}

export function privateLinkResourcePropertiesDeserializer(
  item: any,
): PrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
    displayName: item["displayName"],
  };
}

/** Cognitive Services Rai External Safety provider Schema. */
export interface RaiExternalSafetyProviderSchema extends ProxyResource {
  /** Properties of Cognitive Services Rai External Safety provider. */
  properties?: RaiExternalSafetyProviderSchemaProperties;
  /** Resource Etag. */
  readonly etag?: string;
  /** Resource tags. */
  readonly tags?: Record<string, string>;
}

export function raiExternalSafetyProviderSchemaSerializer(
  item: RaiExternalSafetyProviderSchema,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : raiExternalSafetyProviderSchemaPropertiesSerializer(item["properties"]),
  };
}

export function raiExternalSafetyProviderSchemaDeserializer(
  item: any,
): RaiExternalSafetyProviderSchema {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : raiExternalSafetyProviderSchemaPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** RAI External SafetyProvider schema properties. */
export interface RaiExternalSafetyProviderSchemaProperties {
  /** The unique identifier of the safety provider. */
  providerId?: string;
  /** Name of the safety provider. */
  providerName?: string;
  /** Safety provider mode sync/async. */
  mode?: string;
  /** Webhook URL for the safety provider. */
  url?: string;
  /** The name of the secret in Key Vault that contains the api key to access the webhook. */
  secretName?: string;
  /** The managed identity to access the Key Vault. */
  managedIdentity?: string;
  /** The Key Vault URI that contains the api key for safety provider urls. */
  keyVaultUri?: string;
  /** Creation time of the safety provider. */
  readonly createdAt?: Date;
  /** Last modified time of the safety provider. */
  readonly lastModifiedAt?: Date;
}

export function raiExternalSafetyProviderSchemaPropertiesSerializer(
  item: RaiExternalSafetyProviderSchemaProperties,
): any {
  return {
    providerId: item["providerId"],
    providerName: item["providerName"],
    mode: item["mode"],
    url: item["url"],
    secretName: item["secretName"],
    managedIdentity: item["managedIdentity"],
    keyVaultUri: item["keyVaultUri"],
  };
}

export function raiExternalSafetyProviderSchemaPropertiesDeserializer(
  item: any,
): RaiExternalSafetyProviderSchemaProperties {
  return {
    providerId: item["providerId"],
    providerName: item["providerName"],
    mode: item["mode"],
    url: item["url"],
    secretName: item["secretName"],
    managedIdentity: item["managedIdentity"],
    keyVaultUri: item["keyVaultUri"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** Cognitive Services Rai External Safety provider. */
export interface RaiExternalSafetyProvider extends ProxyResource {
  /** Resource Etag. */
  readonly etag?: string;
  /** Resource tags. */
  readonly tags?: Record<string, string>;
  /** Properties of Cognitive Services Rai External Safety provider. */
  properties?: RaiExternalSafetyProviderProperties;
}

export function raiExternalSafetyProviderDeserializer(item: any): RaiExternalSafetyProvider {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    properties: !item["properties"]
      ? item["properties"]
      : raiExternalSafetyProviderPropertiesDeserializer(item["properties"]),
  };
}

/** RAI External SafetyProvider properties. */
export interface RaiExternalSafetyProviderProperties {
  /** The unique identifier of the safety provider. */
  providerId?: string;
  /** Name of the safety provider. */
  providerName?: string;
  /** Safety provider mode sync/async. */
  mode?: string;
  /** Webhook URL for the safety provider. */
  url?: string;
  /** Creation time of the safety provider. */
  createdAt?: Date;
  /** Last modified time of the safety provider. */
  lastModifiedAt?: Date;
}

export function raiExternalSafetyProviderPropertiesDeserializer(
  item: any,
): RaiExternalSafetyProviderProperties {
  return {
    providerId: item["providerId"],
    providerName: item["providerName"],
    mode: item["mode"],
    url: item["url"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The list of cognitive services RAI External Safety Providers. */
export interface _RaiExternalSafetyProviderResult {
  /** The link used to get the next page of Rai External Safety Provider. */
  nextLink?: string;
  /** The list of RaiExternalSafetyProvider. */
  value?: RaiExternalSafetyProviderSchema[];
}

export function _raiExternalSafetyProviderResultDeserializer(
  item: any,
): _RaiExternalSafetyProviderResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"]
      ? item["value"]
      : raiExternalSafetyProviderSchemaArrayDeserializer(item["value"]),
  };
}

export function raiExternalSafetyProviderSchemaArraySerializer(
  result: Array<RaiExternalSafetyProviderSchema>,
): any[] {
  return result.map((item) => {
    return raiExternalSafetyProviderSchemaSerializer(item);
  });
}

export function raiExternalSafetyProviderSchemaArrayDeserializer(
  result: Array<RaiExternalSafetyProviderSchema>,
): any[] {
  return result.map((item) => {
    return raiExternalSafetyProviderSchemaDeserializer(item);
  });
}

/** Azure Resource Manager resource envelope. */
export interface CapabilityHost extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: CapabilityHostProperties;
}

export function capabilityHostSerializer(item: CapabilityHost): any {
  return { properties: capabilityHostPropertiesSerializer(item["properties"]) };
}

export function capabilityHostDeserializer(item: any): CapabilityHost {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: capabilityHostPropertiesDeserializer(item["properties"]),
  };
}

/** model interface CapabilityHostProperties */
export interface CapabilityHostProperties extends ResourceBase {
  /** List of AI services connections. */
  aiServicesConnections?: string[];
  /** Kind of this capability host. */
  capabilityHostKind?: CapabilityHostKind;
  /** Customer subnet info to help set up this capability host. */
  customerSubnet?: string;
  /** Provisioning state for the CapabilityHost. */
  readonly provisioningState?: CapabilityHostProvisioningState;
  /** List of connection names from those available in the account or project to be used as a storage resource. */
  storageConnections?: string[];
  /** List of connection names from those available in the account or project to be used for Thread storage. */
  threadStorageConnections?: string[];
  /** List of connection names from those available in the account or project to be used for vector database (e.g. CosmosDB). */
  vectorStoreConnections?: string[];
  /** Whether public hosting environment is enabled for the capability host */
  enablePublicHostingEnvironment?: boolean;
}

export function capabilityHostPropertiesSerializer(item: CapabilityHostProperties): any {
  return {
    description: item["description"],
    tags: item["tags"],
    aiServicesConnections: !item["aiServicesConnections"]
      ? item["aiServicesConnections"]
      : item["aiServicesConnections"].map((p: any) => {
          return p;
        }),
    capabilityHostKind: item["capabilityHostKind"],
    customerSubnet: item["customerSubnet"],
    storageConnections: !item["storageConnections"]
      ? item["storageConnections"]
      : item["storageConnections"].map((p: any) => {
          return p;
        }),
    threadStorageConnections: !item["threadStorageConnections"]
      ? item["threadStorageConnections"]
      : item["threadStorageConnections"].map((p: any) => {
          return p;
        }),
    vectorStoreConnections: !item["vectorStoreConnections"]
      ? item["vectorStoreConnections"]
      : item["vectorStoreConnections"].map((p: any) => {
          return p;
        }),
    enablePublicHostingEnvironment: item["enablePublicHostingEnvironment"],
  };
}

export function capabilityHostPropertiesDeserializer(item: any): CapabilityHostProperties {
  return {
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, p1])),
    aiServicesConnections: !item["aiServicesConnections"]
      ? item["aiServicesConnections"]
      : item["aiServicesConnections"].map((p1: any) => {
          return p1;
        }),
    capabilityHostKind: item["capabilityHostKind"],
    customerSubnet: item["customerSubnet"],
    provisioningState: item["provisioningState"],
    storageConnections: !item["storageConnections"]
      ? item["storageConnections"]
      : item["storageConnections"].map((p1: any) => {
          return p1;
        }),
    threadStorageConnections: !item["threadStorageConnections"]
      ? item["threadStorageConnections"]
      : item["threadStorageConnections"].map((p1: any) => {
          return p1;
        }),
    vectorStoreConnections: !item["vectorStoreConnections"]
      ? item["vectorStoreConnections"]
      : item["vectorStoreConnections"].map((p1: any) => {
          return p1;
        }),
    enablePublicHostingEnvironment: item["enablePublicHostingEnvironment"],
  };
}

/** Known values of {@link CapabilityHostKind} that the service accepts. */
export enum KnownCapabilityHostKind {
  /** Agents */
  Agents = "Agents",
}

/** Type of CapabilityHostKind */
export type CapabilityHostKind = string;

/** A paginated list of Capability Host entities. */
export interface _CapabilityHostResourceArmPaginatedResult {
  /** The link to the next page of Capability Host objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type Capability Host. */
  value?: CapabilityHost[];
}

export function _capabilityHostResourceArmPaginatedResultDeserializer(
  item: any,
): _CapabilityHostResourceArmPaginatedResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : capabilityHostArrayDeserializer(item["value"]),
  };
}

export function capabilityHostArraySerializer(result: Array<CapabilityHost>): any[] {
  return result.map((item) => {
    return capabilityHostSerializer(item);
  });
}

export function capabilityHostArrayDeserializer(result: Array<CapabilityHost>): any[] {
  return result.map((item) => {
    return capabilityHostDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface OutboundRuleBasicResource extends ProxyResource {
  /** Outbound Rule for the managed network of a cognitive services account. */
  properties: OutboundRuleUnion;
}

export function outboundRuleBasicResourceSerializer(item: OutboundRuleBasicResource): any {
  return { properties: outboundRuleUnionSerializer(item["properties"]) };
}

export function outboundRuleBasicResourceDeserializer(item: any): OutboundRuleBasicResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: outboundRuleUnionDeserializer(item["properties"]),
  };
}

/** Outbound Rule for the managed network of a cognitive services account. */
export interface OutboundRule {
  /** Category of a managed network Outbound Rule of a cognitive services account. */
  category?: RuleCategory;
  /** Type of a managed network Outbound Rule of a cognitive services account. */
  status?: RuleStatus;
  /** Type of a managed network Outbound Rule of a cognitive services account. */
  /** The discriminator possible values: FQDN, PrivateEndpoint, ServiceTag */
  type: RuleType;
  /** Error information about an outbound rule of a cognitive services account if RuleStatus is failed. */
  readonly errorInformation?: string;
  readonly parentRuleNames?: string[];
}

export function outboundRuleSerializer(item: OutboundRule): any {
  return { category: item["category"], status: item["status"], type: item["type"] };
}

export function outboundRuleDeserializer(item: any): OutboundRule {
  return {
    category: item["category"],
    status: item["status"],
    type: item["type"],
    errorInformation: item["errorInformation"],
    parentRuleNames: !item["parentRuleNames"]
      ? item["parentRuleNames"]
      : item["parentRuleNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Alias for OutboundRuleUnion */
export type OutboundRuleUnion =
  | FqdnOutboundRule
  | PrivateEndpointOutboundRule
  | ServiceTagOutboundRule
  | OutboundRule;

export function outboundRuleUnionSerializer(item: OutboundRuleUnion): any {
  switch (item.type) {
    case "FQDN":
      return fqdnOutboundRuleSerializer(item as FqdnOutboundRule);

    case "PrivateEndpoint":
      return privateEndpointOutboundRuleSerializer(item as PrivateEndpointOutboundRule);

    case "ServiceTag":
      return serviceTagOutboundRuleSerializer(item as ServiceTagOutboundRule);

    default:
      return outboundRuleSerializer(item);
  }
}

export function outboundRuleUnionDeserializer(item: any): OutboundRuleUnion {
  switch (item["type"]) {
    case "FQDN":
      return fqdnOutboundRuleDeserializer(item as FqdnOutboundRule);

    case "PrivateEndpoint":
      return privateEndpointOutboundRuleDeserializer(item as PrivateEndpointOutboundRule);

    case "ServiceTag":
      return serviceTagOutboundRuleDeserializer(item as ServiceTagOutboundRule);

    default:
      return outboundRuleDeserializer(item);
  }
}

/** Category of a managed network Outbound Rule of a cognitive services account. */
export enum KnownRuleCategory {
  /** Required */
  Required = "Required",
  /** Recommended */
  Recommended = "Recommended",
  /** UserDefined */
  UserDefined = "UserDefined",
  /** Dependency */
  Dependency = "Dependency",
}

/**
 * Category of a managed network Outbound Rule of a cognitive services account. \
 * {@link KnownRuleCategory} can be used interchangeably with RuleCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Required** \
 * **Recommended** \
 * **UserDefined** \
 * **Dependency**
 */
export type RuleCategory = string;

/** Type of a managed network Outbound Rule of a cognitive services account. */
export enum KnownRuleStatus {
  /** Inactive */
  Inactive = "Inactive",
  /** Active */
  Active = "Active",
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
}

/**
 * Type of a managed network Outbound Rule of a cognitive services account. \
 * {@link KnownRuleStatus} can be used interchangeably with RuleStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inactive** \
 * **Active** \
 * **Provisioning** \
 * **Deleting** \
 * **Failed**
 */
export type RuleStatus = string;

/** Type of a managed network Outbound Rule of a cognitive services account. */
export enum KnownRuleType {
  /** FQDN */
  Fqdn = "FQDN",
  /** PrivateEndpoint */
  PrivateEndpoint = "PrivateEndpoint",
  /** ServiceTag */
  ServiceTag = "ServiceTag",
}

/**
 * Type of a managed network Outbound Rule of a cognitive services account. \
 * {@link KnownRuleType} can be used interchangeably with RuleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FQDN** \
 * **PrivateEndpoint** \
 * **ServiceTag**
 */
export type RuleType = string;

/** FQDN Outbound Rule for the managed network of a cognitive services account. */
export interface FqdnOutboundRule extends OutboundRule {
  destination?: string;
  /** Type of a managed network Outbound Rule of a cognitive services account. */
  type: "FQDN";
}

export function fqdnOutboundRuleSerializer(item: FqdnOutboundRule): any {
  return {
    category: item["category"],
    status: item["status"],
    type: item["type"],
    destination: item["destination"],
  };
}

export function fqdnOutboundRuleDeserializer(item: any): FqdnOutboundRule {
  return {
    category: item["category"],
    status: item["status"],
    type: item["type"],
    errorInformation: item["errorInformation"],
    parentRuleNames: !item["parentRuleNames"]
      ? item["parentRuleNames"]
      : item["parentRuleNames"].map((p: any) => {
          return p;
        }),
    destination: item["destination"],
  };
}

/** Private Endpoint outbound rule for the managed network of a cognitive services account. */
export interface PrivateEndpointOutboundRule extends OutboundRule {
  /** Private Endpoint destination. */
  destination?: PrivateEndpointOutboundRuleDestination;
  /** List of FQDNs associated with the private endpoint outbound rule. */
  fqdns?: string[];
  /** Type of a managed network Outbound Rule of a cognitive services account. */
  type: "PrivateEndpoint";
}

export function privateEndpointOutboundRuleSerializer(item: PrivateEndpointOutboundRule): any {
  return {
    category: item["category"],
    status: item["status"],
    type: item["type"],
    destination: !item["destination"]
      ? item["destination"]
      : privateEndpointOutboundRuleDestinationSerializer(item["destination"]),
    fqdns: !item["fqdns"]
      ? item["fqdns"]
      : item["fqdns"].map((p: any) => {
          return p;
        }),
  };
}

export function privateEndpointOutboundRuleDeserializer(item: any): PrivateEndpointOutboundRule {
  return {
    category: item["category"],
    status: item["status"],
    type: item["type"],
    errorInformation: item["errorInformation"],
    parentRuleNames: !item["parentRuleNames"]
      ? item["parentRuleNames"]
      : item["parentRuleNames"].map((p: any) => {
          return p;
        }),
    destination: !item["destination"]
      ? item["destination"]
      : privateEndpointOutboundRuleDestinationDeserializer(item["destination"]),
    fqdns: !item["fqdns"]
      ? item["fqdns"]
      : item["fqdns"].map((p: any) => {
          return p;
        }),
  };
}

/** Private Endpoint destination for an outbound rule. */
export interface PrivateEndpointOutboundRuleDestination {
  /** The Azure resource ID of the target private endpoint service. */
  serviceResourceId?: string;
  /** The subresource of the target service to connect to. */
  subresourceTarget?: string;
}

export function privateEndpointOutboundRuleDestinationSerializer(
  item: PrivateEndpointOutboundRuleDestination,
): any {
  return {
    serviceResourceId: item["serviceResourceId"],
    subresourceTarget: item["subresourceTarget"],
  };
}

export function privateEndpointOutboundRuleDestinationDeserializer(
  item: any,
): PrivateEndpointOutboundRuleDestination {
  return {
    serviceResourceId: item["serviceResourceId"],
    subresourceTarget: item["subresourceTarget"],
  };
}

/** Service Tag outbound rule for the managed network of a cognitive services account. */
export interface ServiceTagOutboundRule extends OutboundRule {
  /** Service Tag destination. */
  destination?: ServiceTagOutboundRuleDestination;
  /** Type of a managed network Outbound Rule of a cognitive services account. */
  type: "ServiceTag";
}

export function serviceTagOutboundRuleSerializer(item: ServiceTagOutboundRule): any {
  return {
    category: item["category"],
    status: item["status"],
    type: item["type"],
    destination: !item["destination"]
      ? item["destination"]
      : serviceTagOutboundRuleDestinationSerializer(item["destination"]),
  };
}

export function serviceTagOutboundRuleDeserializer(item: any): ServiceTagOutboundRule {
  return {
    category: item["category"],
    status: item["status"],
    type: item["type"],
    errorInformation: item["errorInformation"],
    parentRuleNames: !item["parentRuleNames"]
      ? item["parentRuleNames"]
      : item["parentRuleNames"].map((p: any) => {
          return p;
        }),
    destination: !item["destination"]
      ? item["destination"]
      : serviceTagOutboundRuleDestinationDeserializer(item["destination"]),
  };
}

/** Service Tag destination for an outbound rule. */
export interface ServiceTagOutboundRuleDestination {
  /** Name of the Azure service tag to target. */
  serviceTag?: string;
  /** Network protocol used by the service tag rule. */
  protocol?: string;
  /** Destination port ranges. */
  portRanges?: string;
  /** The action for the service tag outbound rule. */
  action?: RuleAction;
  /** Optional address prefixes. If provided, the serviceTag property will be ignored. */
  addressPrefixes?: string[];
}

export function serviceTagOutboundRuleDestinationSerializer(
  item: ServiceTagOutboundRuleDestination,
): any {
  return {
    serviceTag: item["serviceTag"],
    protocol: item["protocol"],
    portRanges: item["portRanges"],
    action: item["action"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
  };
}

export function serviceTagOutboundRuleDestinationDeserializer(
  item: any,
): ServiceTagOutboundRuleDestination {
  return {
    serviceTag: item["serviceTag"],
    protocol: item["protocol"],
    portRanges: item["portRanges"],
    action: item["action"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
  };
}

/** The action enum for a managed network outbound rule. */
export enum KnownRuleAction {
  /** Allow */
  Allow = "Allow",
  /** Deny */
  Deny = "Deny",
}

/**
 * The action enum for a managed network outbound rule. \
 * {@link KnownRuleAction} can be used interchangeably with RuleAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow** \
 * **Deny**
 */
export type RuleAction = string;

/** List of outbound rules for the managed network of a cognitive services account. */
export interface _OutboundRuleListResult {
  /** The link to the next page constructed using the continuationToken.  If null, there are no additional pages. */
  nextLink?: string;
  /** The list of cognitive services accounts. Since this list may be incomplete, the nextLink field should be used to request the next list of cognitive services accounts. */
  value?: OutboundRuleBasicResource[];
}

export function _outboundRuleListResultDeserializer(item: any): _OutboundRuleListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"]
      ? item["value"]
      : outboundRuleBasicResourceArrayDeserializer(item["value"]),
  };
}

export function outboundRuleBasicResourceArraySerializer(
  result: Array<OutboundRuleBasicResource>,
): any[] {
  return result.map((item) => {
    return outboundRuleBasicResourceSerializer(item);
  });
}

export function outboundRuleBasicResourceArrayDeserializer(
  result: Array<OutboundRuleBasicResource>,
): any[] {
  return result.map((item) => {
    return outboundRuleBasicResourceDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface ManagedNetworkSettingsPropertiesBasicResource extends ProxyResource {
  /** The properties of the managed network settings of a cognitive services account. */
  properties?: ManagedNetworkSettingsProperties;
}

export function managedNetworkSettingsPropertiesBasicResourceSerializer(
  item: ManagedNetworkSettingsPropertiesBasicResource,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : managedNetworkSettingsPropertiesSerializer(item["properties"]),
  };
}

export function managedNetworkSettingsPropertiesBasicResourceDeserializer(
  item: any,
): ManagedNetworkSettingsPropertiesBasicResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : managedNetworkSettingsPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of the managed network settings of a cognitive services account. */
export interface ManagedNetworkSettingsProperties {
  /** Managed Network settings for a cognitive services account. */
  managedNetwork?: ManagedNetworkSettingsEx;
  /** The current deployment state of the managed network resource. The provisioningState is to indicate states for resource provisioning. */
  readonly provisioningState?: ManagedNetworkProvisioningState;
}

export function managedNetworkSettingsPropertiesSerializer(
  item: ManagedNetworkSettingsProperties,
): any {
  return {
    managedNetwork: !item["managedNetwork"]
      ? item["managedNetwork"]
      : managedNetworkSettingsExSerializer(item["managedNetwork"]),
  };
}

export function managedNetworkSettingsPropertiesDeserializer(
  item: any,
): ManagedNetworkSettingsProperties {
  return {
    managedNetwork: !item["managedNetwork"]
      ? item["managedNetwork"]
      : managedNetworkSettingsExDeserializer(item["managedNetwork"]),
    provisioningState: item["provisioningState"],
  };
}

/** model interface ManagedNetworkSettingsEx */
export interface ManagedNetworkSettingsEx extends ManagedNetworkSettings {
  readonly changeableIsolationModes?: IsolationMode[];
}

export function managedNetworkSettingsExSerializer(item: ManagedNetworkSettingsEx): any {
  return {
    isolationMode: item["isolationMode"],
    outboundRules: !item["outboundRules"]
      ? item["outboundRules"]
      : outboundRuleUnionRecordSerializer(item["outboundRules"]),
    status: !item["status"]
      ? item["status"]
      : managedNetworkProvisionStatusSerializer(item["status"]),
    firewallSku: item["firewallSku"],
    managedNetworkKind: item["managedNetworkKind"],
  };
}

export function managedNetworkSettingsExDeserializer(item: any): ManagedNetworkSettingsEx {
  return {
    isolationMode: item["isolationMode"],
    networkId: item["networkId"],
    outboundRules: !item["outboundRules"]
      ? item["outboundRules"]
      : outboundRuleUnionRecordDeserializer(item["outboundRules"]),
    status: !item["status"]
      ? item["status"]
      : managedNetworkProvisionStatusDeserializer(item["status"]),
    firewallSku: item["firewallSku"],
    managedNetworkKind: item["managedNetworkKind"],
    firewallPublicIpAddress: item["firewallPublicIpAddress"],
    provisioningState: item["provisioningState"],
    changeableIsolationModes: !item["changeableIsolationModes"]
      ? item["changeableIsolationModes"]
      : item["changeableIsolationModes"].map((p: any) => {
          return p;
        }),
  };
}

/** Isolation mode for the managed network of a cognitive services account. */
export enum KnownIsolationMode {
  /** Disabled */
  Disabled = "Disabled",
  /** AllowInternetOutbound */
  AllowInternetOutbound = "AllowInternetOutbound",
  /** AllowOnlyApprovedOutbound */
  AllowOnlyApprovedOutbound = "AllowOnlyApprovedOutbound",
}

/**
 * Isolation mode for the managed network of a cognitive services account. \
 * {@link KnownIsolationMode} can be used interchangeably with IsolationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **AllowInternetOutbound** \
 * **AllowOnlyApprovedOutbound**
 */
export type IsolationMode = string;

/** Known values of {@link ManagedNetworkProvisioningState} that the service accepts. */
export enum KnownManagedNetworkProvisioningState {
  /** Deferred */
  Deferred = "Deferred",
  /** Updating */
  Updating = "Updating",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Deleting */
  Deleting = "Deleting",
  /** Deleted */
  Deleted = "Deleted",
}

/** Type of ManagedNetworkProvisioningState */
export type ManagedNetworkProvisioningState = string;

/** Managed Network settings for a cognitive services account. */
export interface ManagedNetworkSettings {
  /** Isolation mode for the managed network of a cognitive services account. */
  isolationMode?: IsolationMode;
  readonly networkId?: string;
  /** Dictionary of <OutboundRule> */
  outboundRules?: Record<string, OutboundRuleUnion>;
  /** Status of the Provisioning for the managed network of a cognitive services account. */
  status?: ManagedNetworkProvisionStatus;
  /** Firewall Sku used for FQDN Rules */
  firewallSku?: FirewallSku;
  /** The Kind of the managed network. Users can switch from V1 to V2 for granular access controls, but cannot switch back to V1 once V2 is enabled. */
  managedNetworkKind?: ManagedNetworkKind;
  /** Public IP address assigned to the Azure Firewall. */
  readonly firewallPublicIpAddress?: string;
  /** The provisioning state of the managed network settings. */
  readonly provisioningState?: ManagedNetworkProvisioningState;
}

export function managedNetworkSettingsSerializer(item: ManagedNetworkSettings): any {
  return {
    isolationMode: item["isolationMode"],
    outboundRules: !item["outboundRules"]
      ? item["outboundRules"]
      : outboundRuleUnionRecordSerializer(item["outboundRules"]),
    status: !item["status"]
      ? item["status"]
      : managedNetworkProvisionStatusSerializer(item["status"]),
    firewallSku: item["firewallSku"],
    managedNetworkKind: item["managedNetworkKind"],
  };
}

export function managedNetworkSettingsDeserializer(item: any): ManagedNetworkSettings {
  return {
    isolationMode: item["isolationMode"],
    networkId: item["networkId"],
    outboundRules: !item["outboundRules"]
      ? item["outboundRules"]
      : outboundRuleUnionRecordDeserializer(item["outboundRules"]),
    status: !item["status"]
      ? item["status"]
      : managedNetworkProvisionStatusDeserializer(item["status"]),
    firewallSku: item["firewallSku"],
    managedNetworkKind: item["managedNetworkKind"],
    firewallPublicIpAddress: item["firewallPublicIpAddress"],
    provisioningState: item["provisioningState"],
  };
}

export function outboundRuleUnionRecordSerializer(
  item: Record<string, OutboundRule>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : outboundRuleUnionSerializer(item[key]);
  });
  return result;
}

export function outboundRuleUnionRecordDeserializer(
  item: Record<string, any>,
): Record<string, OutboundRule> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : outboundRuleUnionDeserializer(item[key]);
  });
  return result;
}

/** Status of the Provisioning for the managed network of a cognitive services account. */
export interface ManagedNetworkProvisionStatus {
  /** Status for the managed network of a cognitive services account. */
  status?: ManagedNetworkStatus;
}

export function managedNetworkProvisionStatusSerializer(item: ManagedNetworkProvisionStatus): any {
  return { status: item["status"] };
}

export function managedNetworkProvisionStatusDeserializer(
  item: any,
): ManagedNetworkProvisionStatus {
  return {
    status: item["status"],
  };
}

/** Status for the managed network of a cognitive services account. */
export enum KnownManagedNetworkStatus {
  /** Inactive */
  Inactive = "Inactive",
  /** Active */
  Active = "Active",
}

/**
 * Status for the managed network of a cognitive services account. \
 * {@link KnownManagedNetworkStatus} can be used interchangeably with ManagedNetworkStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inactive** \
 * **Active**
 */
export type ManagedNetworkStatus = string;

/** Firewall Sku used for FQDN Rules */
export enum KnownFirewallSku {
  /** Standard */
  Standard = "Standard",
  /** Basic */
  Basic = "Basic",
}

/**
 * Firewall Sku used for FQDN Rules \
 * {@link KnownFirewallSku} can be used interchangeably with FirewallSku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard** \
 * **Basic**
 */
export type FirewallSku = string;

/** The Kind of the managed network. Users can switch from V1 to V2 for granular access controls, but cannot switch back to V1 once V2 is enabled. */
export enum KnownManagedNetworkKind {
  /** V1 */
  V1 = "V1",
  /** V2 */
  V2 = "V2",
}

/**
 * The Kind of the managed network. Users can switch from V1 to V2 for granular access controls, but cannot switch back to V1 once V2 is enabled. \
 * {@link KnownManagedNetworkKind} can be used interchangeably with ManagedNetworkKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **V1** \
 * **V2**
 */
export type ManagedNetworkKind = string;

/** List of managed networks of a cognitive services account. */
export interface _ManagedNetworkListResult {
  /** The link to the next page constructed using the continuationToken.  If null, there are no additional pages. */
  nextLink?: string;
  /** The list of managed network settings of an account. Since this list may be incomplete, the nextLink field should be used to request the next list of cognitive services accounts. */
  value?: ManagedNetworkSettingsPropertiesBasicResource[];
}

export function _managedNetworkListResultDeserializer(item: any): _ManagedNetworkListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"]
      ? item["value"]
      : managedNetworkSettingsPropertiesBasicResourceArrayDeserializer(item["value"]),
  };
}

export function managedNetworkSettingsPropertiesBasicResourceArraySerializer(
  result: Array<ManagedNetworkSettingsPropertiesBasicResource>,
): any[] {
  return result.map((item) => {
    return managedNetworkSettingsPropertiesBasicResourceSerializer(item);
  });
}

export function managedNetworkSettingsPropertiesBasicResourceArrayDeserializer(
  result: Array<ManagedNetworkSettingsPropertiesBasicResource>,
): any[] {
  return result.map((item) => {
    return managedNetworkSettingsPropertiesBasicResourceDeserializer(item);
  });
}

/** model interface ManagedNetworkSettingsBasicResource */
export interface ManagedNetworkSettingsBasicResource extends Resource {
  /** Managed Network settings for a cognitive services account. */
  properties?: ManagedNetworkSettings;
}

export function managedNetworkSettingsBasicResourceSerializer(
  item: ManagedNetworkSettingsBasicResource,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : managedNetworkSettingsSerializer(item["properties"]),
  };
}

/** Managed Network Provisioning options for managed network of a cognitive services account. */
export interface ManagedNetworkProvisionOptions {}

export function managedNetworkProvisionOptionsSerializer(
  item: ManagedNetworkProvisionOptions,
): any {
  return item;
}

/** Agent Deployment resource */
export interface AgentDeployment extends ProxyResource {
  /** [Required] Additional attributes of the entity. */
  properties: AgentDeploymentPropertiesUnion;
}

export function agentDeploymentSerializer(item: AgentDeployment): any {
  return { properties: agentDeploymentPropertiesUnionSerializer(item["properties"]) };
}

export function agentDeploymentDeserializer(item: any): AgentDeployment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: agentDeploymentPropertiesUnionDeserializer(item["properties"]),
  };
}

/** Type representing an agent deployment as a management construct. */
export interface AgentDeploymentProperties extends ResourceBase {
  /** Gets or sets the display name of the deployment. */
  displayName?: string;
  /** Gets or sets the unique identifier of the deployment. */
  deploymentId?: string;
  /** Gets or sets the current operational state of the deployment (and, intrinsically, of the comprising agents). */
  state?: AgentDeploymentState;
  /** Gets or sets the supported protocol types and versions exposed by this deployment. */
  protocols?: AgentProtocolVersion[];
  /** Returns a flat list of agent:version deployed in this deployment. */
  agents?: VersionedAgentReference[];
  /** Gets or sets the type of deployment for the agent. */
  /** The discriminator possible values: Managed, Hosted */
  deploymentType: AgentDeploymentType;
  /** Gets or sets the provisioning state of the agent deployment. */
  readonly provisioningState?: AgentDeploymentProvisioningState;
}

export function agentDeploymentPropertiesSerializer(item: AgentDeploymentProperties): any {
  return {
    description: item["description"],
    tags: item["tags"],
    displayName: item["displayName"],
    deploymentId: item["deploymentId"],
    state: item["state"],
    protocols: !item["protocols"]
      ? item["protocols"]
      : agentProtocolVersionArraySerializer(item["protocols"]),
    agents: !item["agents"]
      ? item["agents"]
      : versionedAgentReferenceArraySerializer(item["agents"]),
    deploymentType: item["deploymentType"],
  };
}

export function agentDeploymentPropertiesDeserializer(item: any): AgentDeploymentProperties {
  return {
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, p1])),
    displayName: item["displayName"],
    deploymentId: item["deploymentId"],
    state: item["state"],
    protocols: !item["protocols"]
      ? item["protocols"]
      : agentProtocolVersionArrayDeserializer(item["protocols"]),
    agents: !item["agents"]
      ? item["agents"]
      : versionedAgentReferenceArrayDeserializer(item["agents"]),
    deploymentType: item["deploymentType"],
    provisioningState: item["provisioningState"],
  };
}

/** Alias for AgentDeploymentPropertiesUnion */
export type AgentDeploymentPropertiesUnion =
  | ManagedAgentDeployment
  | HostedAgentDeployment
  | AgentDeploymentProperties;

export function agentDeploymentPropertiesUnionSerializer(
  item: AgentDeploymentPropertiesUnion,
): any {
  switch (item.deploymentType) {
    case "Managed":
      return managedAgentDeploymentSerializer(item as ManagedAgentDeployment);

    case "Hosted":
      return hostedAgentDeploymentSerializer(item as HostedAgentDeployment);

    default:
      return agentDeploymentPropertiesSerializer(item);
  }
}

export function agentDeploymentPropertiesUnionDeserializer(
  item: any,
): AgentDeploymentPropertiesUnion {
  switch (item["deploymentType"]) {
    case "Managed":
      return managedAgentDeploymentDeserializer(item as ManagedAgentDeployment);

    case "Hosted":
      return hostedAgentDeploymentDeserializer(item as HostedAgentDeployment);

    default:
      return agentDeploymentPropertiesDeserializer(item);
  }
}

/** Current operational state of the agentic functionality represented by this deployment. */
export enum KnownAgentDeploymentState {
  /** The deployment is starting. */
  Starting = "Starting",
  /** The deployment started/is operational. */
  Running = "Running",
  /** The deployment is being stopped. */
  Stopping = "Stopping",
  /** The deployment was stopped. */
  Stopped = "Stopped",
  /** The deployment failed. */
  Failed = "Failed",
  /** The deployment is being deleted. */
  Deleting = "Deleting",
  /** The deployment was deleted. */
  Deleted = "Deleted",
  /** The deployment is being updated. */
  Updating = "Updating",
}

/**
 * Current operational state of the agentic functionality represented by this deployment. \
 * {@link KnownAgentDeploymentState} can be used interchangeably with AgentDeploymentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Starting**: The deployment is starting. \
 * **Running**: The deployment started\/is operational. \
 * **Stopping**: The deployment is being stopped. \
 * **Stopped**: The deployment was stopped. \
 * **Failed**: The deployment failed. \
 * **Deleting**: The deployment is being deleted. \
 * **Deleted**: The deployment was deleted. \
 * **Updating**: The deployment is being updated.
 */
export type AgentDeploymentState = string;

export function agentProtocolVersionArraySerializer(result: Array<AgentProtocolVersion>): any[] {
  return result.map((item) => {
    return agentProtocolVersionSerializer(item);
  });
}

export function agentProtocolVersionArrayDeserializer(result: Array<AgentProtocolVersion>): any[] {
  return result.map((item) => {
    return agentProtocolVersionDeserializer(item);
  });
}

/** Type modeling the protocol and version used by an agent/exposed by a deployment. */
export interface AgentProtocolVersion {
  /** The protocol used by the agent/exposed by a deployment. */
  protocol?: AgentProtocol;
  /** The version of the protocol. */
  version?: string;
}

export function agentProtocolVersionSerializer(item: AgentProtocolVersion): any {
  return { protocol: item["protocol"], version: item["version"] };
}

export function agentProtocolVersionDeserializer(item: any): AgentProtocolVersion {
  return {
    protocol: item["protocol"],
    version: item["version"],
  };
}

/** Protocol used by the agent/exposed by a deployment. */
export enum KnownAgentProtocol {
  /** Agent protocol (aka Active) */
  Agent = "Agent",
  /** Agent2Agent standard */
  A2A = "A2A",
  /** OpenAI-compatible */
  Responses = "Responses",
}

/**
 * Protocol used by the agent/exposed by a deployment. \
 * {@link KnownAgentProtocol} can be used interchangeably with AgentProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Agent**: Agent protocol (aka Active) \
 * **A2A**: Agent2Agent standard \
 * **Responses**: OpenAI-compatible
 */
export type AgentProtocol = string;

export function versionedAgentReferenceArraySerializer(
  result: Array<VersionedAgentReference>,
): any[] {
  return result.map((item) => {
    return versionedAgentReferenceSerializer(item);
  });
}

export function versionedAgentReferenceArrayDeserializer(
  result: Array<VersionedAgentReference>,
): any[] {
  return result.map((item) => {
    return versionedAgentReferenceDeserializer(item);
  });
}

/** Type modeling a reference to a version of an agent definition. */
export interface VersionedAgentReference extends AgentReferenceProperties {
  /** Gets the agent's version (unique for each agent lineage). */
  agentVersion?: string;
}

export function versionedAgentReferenceSerializer(item: VersionedAgentReference): any {
  return {
    agentId: item["agentId"],
    agentName: item["agentName"],
    agentVersion: item["agentVersion"],
  };
}

export function versionedAgentReferenceDeserializer(item: any): VersionedAgentReference {
  return {
    agentId: item["agentId"],
    agentName: item["agentName"],
    agentVersion: item["agentVersion"],
  };
}

/** Specifies the type of deployment for an agent, indicating how the underlying compute and network infrastructure is managed. */
export enum KnownAgentDeploymentType {
  /** The underlying infra is managed by the platform in the deployer's subscription */
  Managed = "Managed",
  /** The underlying infra is owned by the platform */
  Hosted = "Hosted",
  /** The underlying infra is provisioned by the deployer (BYO) */
  Custom = "Custom",
}

/**
 * Specifies the type of deployment for an agent, indicating how the underlying compute and network infrastructure is managed. \
 * {@link KnownAgentDeploymentType} can be used interchangeably with AgentDeploymentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Managed**: The underlying infra is managed by the platform in the deployer's subscription \
 * **Hosted**: The underlying infra is owned by the platform \
 * **Custom**: The underlying infra is provisioned by the deployer (BYO)
 */
export type AgentDeploymentType = string;

/** Provisioning state of an agentic deployment, as an Azure resource. */
export enum KnownAgentDeploymentProvisioningState {
  /** The deployment was successfully completed. */
  Succeeded = "Succeeded",
  /** The deployment failed. */
  Failed = "Failed",
  /** The deployment was canceled. */
  Canceled = "Canceled",
  /** The deployment is being created. */
  Creating = "Creating",
  /** The deployment is being updated. */
  Updating = "Updating",
  /** The deployment is being deleted. */
  Deleting = "Deleting",
}

/**
 * Provisioning state of an agentic deployment, as an Azure resource. \
 * {@link KnownAgentDeploymentProvisioningState} can be used interchangeably with AgentDeploymentProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The deployment was successfully completed. \
 * **Failed**: The deployment failed. \
 * **Canceled**: The deployment was canceled. \
 * **Creating**: The deployment is being created. \
 * **Updating**: The deployment is being updated. \
 * **Deleting**: The deployment is being deleted.
 */
export type AgentDeploymentProvisioningState = string;

/** Represents a managed agent deployment where the underlying infrastructure is managed by the platform in the deployer's subscription. */
export interface ManagedAgentDeployment extends AgentDeploymentProperties {
  /** Gets or sets the type of deployment for the agent. */
  deploymentType: "Managed";
}

export function managedAgentDeploymentSerializer(item: ManagedAgentDeployment): any {
  return {
    displayName: item["displayName"],
    deploymentId: item["deploymentId"],
    state: item["state"],
    protocols: !item["protocols"]
      ? item["protocols"]
      : agentProtocolVersionArraySerializer(item["protocols"]),
    agents: !item["agents"]
      ? item["agents"]
      : versionedAgentReferenceArraySerializer(item["agents"]),
    deploymentType: item["deploymentType"],
    description: item["description"],
    tags: item["tags"],
  };
}

export function managedAgentDeploymentDeserializer(item: any): ManagedAgentDeployment {
  return {
    displayName: item["displayName"],
    deploymentId: item["deploymentId"],
    state: item["state"],
    protocols: !item["protocols"]
      ? item["protocols"]
      : agentProtocolVersionArrayDeserializer(item["protocols"]),
    agents: !item["agents"]
      ? item["agents"]
      : versionedAgentReferenceArrayDeserializer(item["agents"]),
    deploymentType: item["deploymentType"],
    provisioningState: item["provisioningState"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, p1])),
  };
}

/** Represents a hosted agent deployment where the underlying infrastructure is owned by the platform. */
export interface HostedAgentDeployment extends AgentDeploymentProperties {
  /** Gets or sets the minimum number of replicas for this hosted deployment. */
  minReplicas?: number;
  /** Gets or sets the maximum number of replicas for this hosted deployment. */
  maxReplicas?: number;
  /** Gets or sets the type of deployment for the agent. */
  deploymentType: "Hosted";
}

export function hostedAgentDeploymentSerializer(item: HostedAgentDeployment): any {
  return {
    displayName: item["displayName"],
    deploymentId: item["deploymentId"],
    state: item["state"],
    protocols: !item["protocols"]
      ? item["protocols"]
      : agentProtocolVersionArraySerializer(item["protocols"]),
    agents: !item["agents"]
      ? item["agents"]
      : versionedAgentReferenceArraySerializer(item["agents"]),
    deploymentType: item["deploymentType"],
    description: item["description"],
    tags: item["tags"],
    minReplicas: item["minReplicas"],
    maxReplicas: item["maxReplicas"],
  };
}

export function hostedAgentDeploymentDeserializer(item: any): HostedAgentDeployment {
  return {
    displayName: item["displayName"],
    deploymentId: item["deploymentId"],
    state: item["state"],
    protocols: !item["protocols"]
      ? item["protocols"]
      : agentProtocolVersionArrayDeserializer(item["protocols"]),
    agents: !item["agents"]
      ? item["agents"]
      : versionedAgentReferenceArrayDeserializer(item["agents"]),
    deploymentType: item["deploymentType"],
    provisioningState: item["provisioningState"],
    description: item["description"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k1, p1]: [string, any]) => [k1, p1])),
    minReplicas: item["minReplicas"],
    maxReplicas: item["maxReplicas"],
  };
}

/** A paginated list of Agent Deployment entities. */
export interface _AgentDeploymentResourceArmPaginatedResult {
  /** The link to the next page of Agent Deployment objects. If null, there are no additional pages. */
  nextLink?: string;
  /** An array of objects of type Agent Deployment. */
  value?: AgentDeployment[];
}

export function _agentDeploymentResourceArmPaginatedResultDeserializer(
  item: any,
): _AgentDeploymentResourceArmPaginatedResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : agentDeploymentArrayDeserializer(item["value"]),
  };
}

export function agentDeploymentArraySerializer(result: Array<AgentDeployment>): any[] {
  return result.map((item) => {
    return agentDeploymentSerializer(item);
  });
}

export function agentDeploymentArrayDeserializer(result: Array<AgentDeployment>): any[] {
  return result.map((item) => {
    return agentDeploymentDeserializer(item);
  });
}

/** The Get Skus operation response. */
export interface _ResourceSkuListResult {
  /** The ResourceSku items on this page */
  value: ResourceSku[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _resourceSkuListResultDeserializer(item: any): _ResourceSkuListResult {
  return {
    value: resourceSkuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function resourceSkuArrayDeserializer(result: Array<ResourceSku>): any[] {
  return result.map((item) => {
    return resourceSkuDeserializer(item);
  });
}

/** Describes an available Cognitive Services SKU. */
export interface ResourceSku {
  /** The type of resource the SKU applies to. */
  resourceType?: string;
  /** The name of SKU. */
  name?: string;
  /** Specifies the tier of Cognitive Services account. */
  tier?: string;
  /** The Kind of resources that are supported in this SKU. */
  kind?: string;
  /** The set of locations that the SKU is available. */
  locations?: string[];
  /** The restrictions because of which SKU cannot be used. This is empty if there are no restrictions. */
  restrictions?: ResourceSkuRestrictions[];
}

export function resourceSkuDeserializer(item: any): ResourceSku {
  return {
    resourceType: item["resourceType"],
    name: item["name"],
    tier: item["tier"],
    kind: item["kind"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    restrictions: !item["restrictions"]
      ? item["restrictions"]
      : resourceSkuRestrictionsArrayDeserializer(item["restrictions"]),
  };
}

export function resourceSkuRestrictionsArrayDeserializer(
  result: Array<ResourceSkuRestrictions>,
): any[] {
  return result.map((item) => {
    return resourceSkuRestrictionsDeserializer(item);
  });
}

/** Describes restrictions of a SKU. */
export interface ResourceSkuRestrictions {
  /** The type of restrictions. */
  type?: ResourceSkuRestrictionsType;
  /** The value of restrictions. If the restriction type is set to location. This would be different locations where the SKU is restricted. */
  values?: string[];
  /** The information about the restriction where the SKU cannot be used. */
  restrictionInfo?: ResourceSkuRestrictionInfo;
  /** The reason for restriction. */
  reasonCode?: ResourceSkuRestrictionsReasonCode;
}

export function resourceSkuRestrictionsDeserializer(item: any): ResourceSkuRestrictions {
  return {
    type: item["type"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
    restrictionInfo: !item["restrictionInfo"]
      ? item["restrictionInfo"]
      : resourceSkuRestrictionInfoDeserializer(item["restrictionInfo"]),
    reasonCode: item["reasonCode"],
  };
}

/** The type of restrictions. */
export type ResourceSkuRestrictionsType = "Location" | "Zone";

/** model interface ResourceSkuRestrictionInfo */
export interface ResourceSkuRestrictionInfo {
  /** Locations where the SKU is restricted */
  locations?: string[];
  /** List of availability zones where the SKU is restricted. */
  zones?: string[];
}

export function resourceSkuRestrictionInfoDeserializer(item: any): ResourceSkuRestrictionInfo {
  return {
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** The reason for restriction. */
export enum KnownResourceSkuRestrictionsReasonCode {
  /** QuotaId */
  QuotaId = "QuotaId",
  /** NotAvailableForSubscription */
  NotAvailableForSubscription = "NotAvailableForSubscription",
}

/**
 * The reason for restriction. \
 * {@link KnownResourceSkuRestrictionsReasonCode} can be used interchangeably with ResourceSkuRestrictionsReasonCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **QuotaId** \
 * **NotAvailableForSubscription**
 */
export type ResourceSkuRestrictionsReasonCode = string;

/** The list of cognitive services accounts operation response. */
export interface _CommitmentTierListResult {
  /** The link used to get the next page of CommitmentTier. */
  nextLink?: string;
  /** Gets the list of Cognitive Services accounts CommitmentTier and their properties. */
  readonly value?: CommitmentTier[];
}

export function _commitmentTierListResultDeserializer(item: any): _CommitmentTierListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : commitmentTierArrayDeserializer(item["value"]),
  };
}

export function commitmentTierArrayDeserializer(result: Array<CommitmentTier>): any[] {
  return result.map((item) => {
    return commitmentTierDeserializer(item);
  });
}

/** Cognitive Services account commitment tier. */
export interface CommitmentTier {
  /** The kind (type) of cognitive service account. */
  kind?: string;
  /** The name of the SKU. Ex - P3. It is typically a letter+number code */
  skuName?: string;
  /** Account hosting model. */
  hostingModel?: HostingModel;
  /** Commitment plan type. */
  planType?: string;
  /** Commitment period commitment tier. */
  tier?: string;
  /** Commitment period commitment max count. */
  maxCount?: number;
  /** Cognitive Services account commitment quota. */
  quota?: CommitmentQuota;
  /** Cognitive Services account commitment cost. */
  cost?: CommitmentCost;
}

export function commitmentTierDeserializer(item: any): CommitmentTier {
  return {
    kind: item["kind"],
    skuName: item["skuName"],
    hostingModel: item["hostingModel"],
    planType: item["planType"],
    tier: item["tier"],
    maxCount: item["maxCount"],
    quota: !item["quota"] ? item["quota"] : commitmentQuotaDeserializer(item["quota"]),
    cost: !item["cost"] ? item["cost"] : commitmentCostDeserializer(item["cost"]),
  };
}

/** Cognitive Services account commitment cost. */
export interface CommitmentCost {
  /** Commitment meter Id. */
  commitmentMeterId?: string;
  /** Overage meter Id. */
  overageMeterId?: string;
}

export function commitmentCostDeserializer(item: any): CommitmentCost {
  return {
    commitmentMeterId: item["commitmentMeterId"],
    overageMeterId: item["overageMeterId"],
  };
}

/** The list of cognitive services models. */
export interface _ModelListResult {
  /** The link used to get the next page of Model. */
  nextLink?: string;
  /** Gets the list of Cognitive Services accounts Model and their properties. */
  value?: Model[];
}

export function _modelListResultDeserializer(item: any): _ModelListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : modelArrayDeserializer(item["value"]),
  };
}

export function modelArrayDeserializer(result: Array<Model>): any[] {
  return result.map((item) => {
    return modelDeserializer(item);
  });
}

/** Cognitive Services Model. */
export interface Model {
  /** Cognitive Services account Model. */
  model?: AccountModel;
  /** The kind (type) of cognitive service account. */
  kind?: string;
  /** The name of SKU. */
  skuName?: string;
  /** The description of the model. */
  description?: string;
}

export function modelDeserializer(item: any): Model {
  return {
    model: !item["model"] ? item["model"] : accountModelDeserializer(item["model"]),
    kind: item["kind"],
    skuName: item["skuName"],
    description: item["description"],
  };
}

/** The list of cognitive services accounts operation response. */
export interface _ModelCapacityListResult {
  /** The link used to get the next page of ModelSkuCapacity. */
  nextLink?: string;
  /** Gets the list of Cognitive Services accounts ModelSkuCapacity. */
  readonly value?: ModelCapacityListResultValueItem[];
}

export function _modelCapacityListResultDeserializer(item: any): _ModelCapacityListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"]
      ? item["value"]
      : modelCapacityListResultValueItemArrayDeserializer(item["value"]),
  };
}

export function modelCapacityListResultValueItemArrayDeserializer(
  result: Array<ModelCapacityListResultValueItem>,
): any[] {
  return result.map((item) => {
    return modelCapacityListResultValueItemDeserializer(item);
  });
}

/** model interface ModelCapacityListResultValueItem */
export interface ModelCapacityListResultValueItem extends ProxyResource {
  /** The location of the Model Sku Capacity. */
  location?: string;
  /** Cognitive Services account ModelSkuCapacity. */
  properties?: ModelSkuCapacityProperties;
}

export function modelCapacityListResultValueItemDeserializer(
  item: any,
): ModelCapacityListResultValueItem {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : modelSkuCapacityPropertiesDeserializer(item["properties"]),
  };
}

/** Cognitive Services account ModelSkuCapacity. */
export interface ModelSkuCapacityProperties {
  /** Properties of Cognitive Services account deployment model. */
  model?: DeploymentModel;
  skuName?: string;
  /** The available capacity for deployment with this model and sku. */
  availableCapacity?: number;
  /** The available capacity for deployment with a fine-tune version of this model and sku. */
  availableFinetuneCapacity?: number;
  /** The scope identifier for model SKU capacity. */
  scopeId?: string;
  /** The scope type for model SKU capacity. */
  scopeType?: QuotaScopeType;
}

export function modelSkuCapacityPropertiesDeserializer(item: any): ModelSkuCapacityProperties {
  return {
    model: !item["model"] ? item["model"] : deploymentModelDeserializer(item["model"]),
    skuName: item["skuName"],
    availableCapacity: item["availableCapacity"],
    availableFinetuneCapacity: item["availableFinetuneCapacity"],
    scopeId: item["scopeId"],
    scopeType: item["scopeType"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-10-01-preview API version. */
  V20251001Preview = "2025-10-01-preview",
  /** The 2025-12-01 API version. */
  V20251201 = "2025-12-01",
  /** The 2026-01-15-preview API version. */
  V20260115Preview = "2026-01-15-preview",
}

/** Alias for _CreateOrUpdateUnionResponse */
export type _CreateOrUpdateUnionResponse =
  | RaiExternalSafetyProviderSchema
  | RaiExternalSafetyProvider;

export function _createOrUpdateUnionResponseDeserializer(item: any): _CreateOrUpdateUnionResponse {
  return item;
}

export function raiBlocklistItemBulkRequestArraySerializer(
  result: Array<RaiBlocklistItemBulkRequest>,
): any[] {
  return result.map((item) => {
    return raiBlocklistItemBulkRequestSerializer(item);
  });
}

export function _commitmentPlanAccountAssociationPropertiesSerializer(
  item: CommitmentPlanAccountAssociation,
): any {
  return { accountId: item["accountId"] };
}

export function _commitmentPlanAccountAssociationPropertiesDeserializer(item: any) {
  return {
    accountId: item["accountId"],
  };
}

export function _defenderForAISettingPropertiesSerializer(item: DefenderForAISetting): any {
  return { state: item["state"] };
}

export function _defenderForAISettingPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
  };
}

export type RaiExternalSafetyProviderCreateOrUpdateResponse = {
  body: RaiExternalSafetyProviderSchema | RaiExternalSafetyProvider;
};
