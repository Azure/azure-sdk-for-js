// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Azure DevOps Organization resource. */
export interface AzureDevOpsOrg extends ProxyResource {
  /** Azure DevOps Organization properties. */
  properties?: AzureDevOpsOrgProperties;
}

export function azureDevOpsOrgSerializer(item: AzureDevOpsOrg): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : azureDevOpsOrgPropertiesSerializer(item["properties"]),
  };
}

export function azureDevOpsOrgDeserializer(item: any): AzureDevOpsOrg {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : azureDevOpsOrgPropertiesDeserializer(item["properties"]),
  };
}

/** Azure DevOps Organization properties. */
export interface AzureDevOpsOrgProperties {
  /** Gets the resource status message. */
  readonly provisioningStatusMessage?: string;
  /** Gets the time when resource was last checked. */
  readonly provisioningStatusUpdateTimeUtc?: Date;
  /**
   * The provisioning state of the resource.
   *
   * Pending - Provisioning pending.
   * Failed - Provisioning failed.
   * Succeeded - Successful provisioning.
   * Canceled - Provisioning canceled.
   * PendingDeletion - Deletion pending.
   * DeletionSuccess - Deletion successful.
   * DeletionFailure - Deletion failure.
   */
  readonly provisioningState?: DevOpsProvisioningState;
  /**
   * Details about resource onboarding status across all connectors.
   *
   * OnboardedByOtherConnector - this resource has already been onboarded to another connector. This is only applicable to top-level resources.
   * Onboarded - this resource has already been onboarded by the specified connector.
   * NotOnboarded - this resource has not been onboarded to any connector.
   * NotApplicable - the onboarding state is not applicable to the current endpoint.
   */
  onboardingState?: OnboardingState;
  /** Configuration payload for PR Annotations. */
  actionableRemediation?: ActionableRemediation;
}

export function azureDevOpsOrgPropertiesSerializer(item: AzureDevOpsOrgProperties): any {
  return {
    onboardingState: item["onboardingState"],
    actionableRemediation: !item["actionableRemediation"]
      ? item["actionableRemediation"]
      : actionableRemediationSerializer(item["actionableRemediation"]),
  };
}

export function azureDevOpsOrgPropertiesDeserializer(item: any): AzureDevOpsOrgProperties {
  return {
    provisioningStatusMessage: item["provisioningStatusMessage"],
    provisioningStatusUpdateTimeUtc: !item["provisioningStatusUpdateTimeUtc"]
      ? item["provisioningStatusUpdateTimeUtc"]
      : new Date(item["provisioningStatusUpdateTimeUtc"]),
    provisioningState: item["provisioningState"],
    onboardingState: item["onboardingState"],
    actionableRemediation: !item["actionableRemediation"]
      ? item["actionableRemediation"]
      : actionableRemediationDeserializer(item["actionableRemediation"]),
  };
}

/**
 * The provisioning state of the resource.
 *
 * Pending - Provisioning pending.
 * Failed - Provisioning failed.
 * Succeeded - Successful provisioning.
 * Canceled - Provisioning canceled.
 * PendingDeletion - Deletion pending.
 * DeletionSuccess - Deletion successful.
 * DeletionFailure - Deletion failure.
 */
export enum KnownDevOpsProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Pending */
  Pending = "Pending",
  /** PendingDeletion */
  PendingDeletion = "PendingDeletion",
  /** DeletionSuccess */
  DeletionSuccess = "DeletionSuccess",
  /** DeletionFailure */
  DeletionFailure = "DeletionFailure",
}

/**
 * The provisioning state of the resource.
 *
 * Pending - Provisioning pending.
 * Failed - Provisioning failed.
 * Succeeded - Successful provisioning.
 * Canceled - Provisioning canceled.
 * PendingDeletion - Deletion pending.
 * DeletionSuccess - Deletion successful.
 * DeletionFailure - Deletion failure. \
 * {@link KnownDevOpsProvisioningState} can be used interchangeably with DevOpsProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Pending**: Pending \
 * **PendingDeletion**: PendingDeletion \
 * **DeletionSuccess**: DeletionSuccess \
 * **DeletionFailure**: DeletionFailure
 */
export type DevOpsProvisioningState = string;

/**
 * Details about resource onboarding status across all connectors.
 *
 * OnboardedByOtherConnector - this resource has already been onboarded to another connector. This is only applicable to top-level resources.
 * Onboarded - this resource has already been onboarded by the specified connector.
 * NotOnboarded - this resource has not been onboarded to any connector.
 * NotApplicable - the onboarding state is not applicable to the current endpoint.
 */
export enum KnownOnboardingState {
  /** NotApplicable */
  NotApplicable = "NotApplicable",
  /** OnboardedByOtherConnector */
  OnboardedByOtherConnector = "OnboardedByOtherConnector",
  /** Onboarded */
  Onboarded = "Onboarded",
  /** NotOnboarded */
  NotOnboarded = "NotOnboarded",
}

/**
 * Details about resource onboarding status across all connectors.
 *
 * OnboardedByOtherConnector - this resource has already been onboarded to another connector. This is only applicable to top-level resources.
 * Onboarded - this resource has already been onboarded by the specified connector.
 * NotOnboarded - this resource has not been onboarded to any connector.
 * NotApplicable - the onboarding state is not applicable to the current endpoint. \
 * {@link KnownOnboardingState} can be used interchangeably with OnboardingState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotApplicable**: NotApplicable \
 * **OnboardedByOtherConnector**: OnboardedByOtherConnector \
 * **Onboarded**: Onboarded \
 * **NotOnboarded**: NotOnboarded
 */
export type OnboardingState = string;

/** Configuration payload for PR Annotations. */
export interface ActionableRemediation {
  /**
   * ActionableRemediation Setting.
   * None - the setting was never set.
   * Enabled - ActionableRemediation is enabled.
   * Disabled - ActionableRemediation is disabled.
   */
  state?: ActionableRemediationState;
  /** Gets or sets list of categories and severity levels. */
  categoryConfigurations?: CategoryConfiguration[];
  /** Repository branch configuration for PR Annotations. */
  branchConfiguration?: TargetBranchConfiguration;
  /**
   * Update Settings.
   *
   * Enabled - Resource should inherit configurations from parent.
   * Disabled - Resource should not inherit configurations from parent.
   */
  inheritFromParentState?: InheritFromParentState;
}

export function actionableRemediationSerializer(item: ActionableRemediation): any {
  return {
    state: item["state"],
    categoryConfigurations: !item["categoryConfigurations"]
      ? item["categoryConfigurations"]
      : categoryConfigurationArraySerializer(item["categoryConfigurations"]),
    branchConfiguration: !item["branchConfiguration"]
      ? item["branchConfiguration"]
      : targetBranchConfigurationSerializer(item["branchConfiguration"]),
    inheritFromParentState: item["inheritFromParentState"],
  };
}

export function actionableRemediationDeserializer(item: any): ActionableRemediation {
  return {
    state: item["state"],
    categoryConfigurations: !item["categoryConfigurations"]
      ? item["categoryConfigurations"]
      : categoryConfigurationArrayDeserializer(item["categoryConfigurations"]),
    branchConfiguration: !item["branchConfiguration"]
      ? item["branchConfiguration"]
      : targetBranchConfigurationDeserializer(item["branchConfiguration"]),
    inheritFromParentState: item["inheritFromParentState"],
  };
}

/**
 * ActionableRemediation Setting.
 * None - the setting was never set.
 * Enabled - ActionableRemediation is enabled.
 * Disabled - ActionableRemediation is disabled.
 */
export enum KnownActionableRemediationState {
  /** None */
  None = "None",
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * ActionableRemediation Setting.
 * None - the setting was never set.
 * Enabled - ActionableRemediation is enabled.
 * Disabled - ActionableRemediation is disabled. \
 * {@link KnownActionableRemediationState} can be used interchangeably with ActionableRemediationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type ActionableRemediationState = string;

export function categoryConfigurationArraySerializer(result: Array<CategoryConfiguration>): any[] {
  return result.map((item) => {
    return categoryConfigurationSerializer(item);
  });
}

export function categoryConfigurationArrayDeserializer(
  result: Array<CategoryConfiguration>,
): any[] {
  return result.map((item) => {
    return categoryConfigurationDeserializer(item);
  });
}

/** Severity level per category configuration for PR Annotations. */
export interface CategoryConfiguration {
  /** Gets or sets minimum severity level for a given category. */
  minimumSeverityLevel?: string;
  /**
   * Rule categories.
   * Code - code scanning results.
   * Artifact scanning results.
   * Dependencies scanning results.
   * IaC results.
   * Secrets scanning results.
   * Container scanning results.
   */
  category?: RuleCategory;
}

export function categoryConfigurationSerializer(item: CategoryConfiguration): any {
  return { minimumSeverityLevel: item["minimumSeverityLevel"], category: item["category"] };
}

export function categoryConfigurationDeserializer(item: any): CategoryConfiguration {
  return {
    minimumSeverityLevel: item["minimumSeverityLevel"],
    category: item["category"],
  };
}

/**
 * Rule categories.
 * Code - code scanning results.
 * Artifact scanning results.
 * Dependencies scanning results.
 * IaC results.
 * Secrets scanning results.
 * Container scanning results.
 */
export enum KnownRuleCategory {
  /** Code */
  Code = "Code",
  /** Artifacts */
  Artifacts = "Artifacts",
  /** Dependencies */
  Dependencies = "Dependencies",
  /** Secrets */
  Secrets = "Secrets",
  /** IaC */
  IaC = "IaC",
  /** Containers */
  Containers = "Containers",
}

/**
 * Rule categories.
 * Code - code scanning results.
 * Artifact scanning results.
 * Dependencies scanning results.
 * IaC results.
 * Secrets scanning results.
 * Container scanning results. \
 * {@link KnownRuleCategory} can be used interchangeably with RuleCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Code**: Code \
 * **Artifacts**: Artifacts \
 * **Dependencies**: Dependencies \
 * **Secrets**: Secrets \
 * **IaC**: IaC \
 * **Containers**: Containers
 */
export type RuleCategory = string;

/** Repository branch configuration for PR Annotations. */
export interface TargetBranchConfiguration {
  /** Gets or sets branches that should have annotations. */
  branchNames?: string[];
  /**
   * Configuration of PR Annotations on default branch.
   *
   * Enabled - PR Annotations are enabled on the resource's default branch.
   * Disabled - PR Annotations are disabled on the resource's default branch.
   */
  annotateDefaultBranch?: AnnotateDefaultBranchState;
}

export function targetBranchConfigurationSerializer(item: TargetBranchConfiguration): any {
  return {
    branchNames: !item["branchNames"]
      ? item["branchNames"]
      : item["branchNames"].map((p: any) => {
          return p;
        }),
    annotateDefaultBranch: item["annotateDefaultBranch"],
  };
}

export function targetBranchConfigurationDeserializer(item: any): TargetBranchConfiguration {
  return {
    branchNames: !item["branchNames"]
      ? item["branchNames"]
      : item["branchNames"].map((p: any) => {
          return p;
        }),
    annotateDefaultBranch: item["annotateDefaultBranch"],
  };
}

/**
 * Configuration of PR Annotations on default branch.
 *
 * Enabled - PR Annotations are enabled on the resource's default branch.
 * Disabled - PR Annotations are disabled on the resource's default branch.
 */
export enum KnownAnnotateDefaultBranchState {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Configuration of PR Annotations on default branch.
 *
 * Enabled - PR Annotations are enabled on the resource's default branch.
 * Disabled - PR Annotations are disabled on the resource's default branch. \
 * {@link KnownAnnotateDefaultBranchState} can be used interchangeably with AnnotateDefaultBranchState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type AnnotateDefaultBranchState = string;

/**
 * Update Settings.
 *
 * Enabled - Resource should inherit configurations from parent.
 * Disabled - Resource should not inherit configurations from parent.
 */
export enum KnownInheritFromParentState {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Update Settings.
 *
 * Enabled - Resource should inherit configurations from parent.
 * Disabled - Resource should not inherit configurations from parent. \
 * {@link KnownInheritFromParentState} can be used interchangeably with InheritFromParentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type InheritFromParentState = string;

/** List of RP resources which supports pagination. */
export interface AzureDevOpsOrgListResponse {
  /** The AzureDevOpsOrg items on this page. */
  value?: AzureDevOpsOrg[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function azureDevOpsOrgListResponseDeserializer(item: any): AzureDevOpsOrgListResponse {
  return {
    value: !item["value"] ? item["value"] : azureDevOpsOrgArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function azureDevOpsOrgArraySerializer(result: Array<AzureDevOpsOrg>): any[] {
  return result.map((item) => {
    return azureDevOpsOrgSerializer(item);
  });
}

export function azureDevOpsOrgArrayDeserializer(result: Array<AzureDevOpsOrg>): any[] {
  return result.map((item) => {
    return azureDevOpsOrgDeserializer(item);
  });
}

/** GitHub Owner resource. */
export interface GitHubOwner extends ProxyResource {
  /** GitHub Owner properties. */
  properties?: GitHubOwnerProperties;
}

export function gitHubOwnerDeserializer(item: any): GitHubOwner {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : gitHubOwnerPropertiesDeserializer(item["properties"]),
  };
}

/** GitHub Owner properties. */
export interface GitHubOwnerProperties {
  /** Gets the resource status message. */
  readonly provisioningStatusMessage?: string;
  /** Gets the time when resource was last checked. */
  readonly provisioningStatusUpdateTimeUtc?: Date;
  /**
   * The provisioning state of the resource.
   *
   * Pending - Provisioning pending.
   * Failed - Provisioning failed.
   * Succeeded - Successful provisioning.
   * Canceled - Provisioning canceled.
   * PendingDeletion - Deletion pending.
   * DeletionSuccess - Deletion successful.
   * DeletionFailure - Deletion failure.
   */
  readonly provisioningState?: DevOpsProvisioningState;
  /** Gets or sets GitHub Owner url. */
  readonly ownerUrl?: string;
  /** Gets or sets internal GitHub id. */
  readonly gitHubInternalId?: string;
  /**
   * Details about resource onboarding status across all connectors.
   *
   * OnboardedByOtherConnector - this resource has already been onboarded to another connector. This is only applicable to top-level resources.
   * Onboarded - this resource has already been onboarded by the specified connector.
   * NotOnboarded - this resource has not been onboarded to any connector.
   * NotApplicable - the onboarding state is not applicable to the current endpoint.
   */
  onboardingState?: OnboardingState;
}

export function gitHubOwnerPropertiesDeserializer(item: any): GitHubOwnerProperties {
  return {
    provisioningStatusMessage: item["provisioningStatusMessage"],
    provisioningStatusUpdateTimeUtc: !item["provisioningStatusUpdateTimeUtc"]
      ? item["provisioningStatusUpdateTimeUtc"]
      : new Date(item["provisioningStatusUpdateTimeUtc"]),
    provisioningState: item["provisioningState"],
    ownerUrl: item["ownerUrl"],
    gitHubInternalId: item["gitHubInternalId"],
    onboardingState: item["onboardingState"],
  };
}

/** List of RP resources which supports pagination. */
export interface GitHubOwnerListResponse {
  /** The GitHubOwner items on this page. */
  value?: GitHubOwner[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function gitHubOwnerListResponseDeserializer(item: any): GitHubOwnerListResponse {
  return {
    value: !item["value"] ? item["value"] : gitHubOwnerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function gitHubOwnerArrayDeserializer(result: Array<GitHubOwner>): any[] {
  return result.map((item) => {
    return gitHubOwnerDeserializer(item);
  });
}

/** GitLab Group resource. */
export interface GitLabGroup extends ProxyResource {
  /** GitLab Group properties. */
  properties?: GitLabGroupProperties;
}

export function gitLabGroupDeserializer(item: any): GitLabGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : gitLabGroupPropertiesDeserializer(item["properties"]),
  };
}

/** GitLab Group properties. */
export interface GitLabGroupProperties {
  /** Gets the resource status message. */
  readonly provisioningStatusMessage?: string;
  /** Gets the time when resource was last checked. */
  readonly provisioningStatusUpdateTimeUtc?: Date;
  /**
   * The provisioning state of the resource.
   *
   * Pending - Provisioning pending.
   * Failed - Provisioning failed.
   * Succeeded - Successful provisioning.
   * Canceled - Provisioning canceled.
   * PendingDeletion - Deletion pending.
   * DeletionSuccess - Deletion successful.
   * DeletionFailure - Deletion failure.
   */
  readonly provisioningState?: DevOpsProvisioningState;
  /**
   * Gets or sets the fully-qualified name of the Group object.
   *
   * This contains the entire namespace hierarchy where namespaces are separated by the '$' character.
   */
  readonly fullyQualifiedName?: string;
  /**
   * Gets or sets the human readable fully-qualified name of the Group object.
   *
   * This contains the entire namespace hierarchy as seen on GitLab UI where namespaces are separated by the '/' character.
   */
  readonly fullyQualifiedFriendlyName?: string;
  /** Gets or sets the url of the GitLab Group. */
  readonly url?: string;
  /**
   * Details about resource onboarding status across all connectors.
   *
   * OnboardedByOtherConnector - this resource has already been onboarded to another connector. This is only applicable to top-level resources.
   * Onboarded - this resource has already been onboarded by the specified connector.
   * NotOnboarded - this resource has not been onboarded to any connector.
   * NotApplicable - the onboarding state is not applicable to the current endpoint.
   */
  onboardingState?: OnboardingState;
}

export function gitLabGroupPropertiesDeserializer(item: any): GitLabGroupProperties {
  return {
    provisioningStatusMessage: item["provisioningStatusMessage"],
    provisioningStatusUpdateTimeUtc: !item["provisioningStatusUpdateTimeUtc"]
      ? item["provisioningStatusUpdateTimeUtc"]
      : new Date(item["provisioningStatusUpdateTimeUtc"]),
    provisioningState: item["provisioningState"],
    fullyQualifiedName: item["fullyQualifiedName"],
    fullyQualifiedFriendlyName: item["fullyQualifiedFriendlyName"],
    url: item["url"],
    onboardingState: item["onboardingState"],
  };
}

/** List of RP resources which supports pagination. */
export interface GitLabGroupListResponse {
  /** The GitLabGroup items on this page. */
  value?: GitLabGroup[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function gitLabGroupListResponseDeserializer(item: any): GitLabGroupListResponse {
  return {
    value: !item["value"] ? item["value"] : gitLabGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function gitLabGroupArrayDeserializer(result: Array<GitLabGroup>): any[] {
  return result.map((item) => {
    return gitLabGroupDeserializer(item);
  });
}

/** DevOps Configuration resource. */
export interface DevOpsConfiguration extends ProxyResource {
  /** DevOps Configuration properties. */
  properties?: DevOpsConfigurationProperties;
}

export function devOpsConfigurationSerializer(item: DevOpsConfiguration): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : devOpsConfigurationPropertiesSerializer(item["properties"]),
  };
}

export function devOpsConfigurationDeserializer(item: any): DevOpsConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : devOpsConfigurationPropertiesDeserializer(item["properties"]),
  };
}

/** DevOps Configuration properties. */
export interface DevOpsConfigurationProperties {
  /** Gets the resource status message. */
  readonly provisioningStatusMessage?: string;
  /** Gets the time when resource was last checked. */
  readonly provisioningStatusUpdateTimeUtc?: Date;
  /**
   * The provisioning state of the resource.
   *
   * Pending - Provisioning pending.
   * Failed - Provisioning failed.
   * Succeeded - Successful provisioning.
   * Canceled - Provisioning canceled.
   * PendingDeletion - Deletion pending.
   * DeletionSuccess - Deletion successful.
   * DeletionFailure - Deletion failure.
   */
  readonly provisioningState?: DevOpsProvisioningState;
  /** Authorization payload. */
  authorization?: Authorization;
  /** AutoDiscovery states. */
  autoDiscovery?: AutoDiscovery;
  /**
   * List of top-level inventory to select when AutoDiscovery is disabled.
   * This field is ignored when AutoDiscovery is enabled.
   */
  topLevelInventoryList?: string[];
  /** List of capabilities assigned to the DevOps configuration during the discovery process. */
  readonly capabilities?: DevOpsCapability[];
  /** Details about Agentless configuration. */
  agentlessConfiguration?: AgentlessConfiguration;
}

export function devOpsConfigurationPropertiesSerializer(item: DevOpsConfigurationProperties): any {
  return {
    authorization: !item["authorization"]
      ? item["authorization"]
      : authorizationSerializer(item["authorization"]),
    autoDiscovery: item["autoDiscovery"],
    topLevelInventoryList: !item["topLevelInventoryList"]
      ? item["topLevelInventoryList"]
      : item["topLevelInventoryList"].map((p: any) => {
          return p;
        }),
    agentlessConfiguration: !item["agentlessConfiguration"]
      ? item["agentlessConfiguration"]
      : agentlessConfigurationSerializer(item["agentlessConfiguration"]),
  };
}

export function devOpsConfigurationPropertiesDeserializer(
  item: any,
): DevOpsConfigurationProperties {
  return {
    provisioningStatusMessage: item["provisioningStatusMessage"],
    provisioningStatusUpdateTimeUtc: !item["provisioningStatusUpdateTimeUtc"]
      ? item["provisioningStatusUpdateTimeUtc"]
      : new Date(item["provisioningStatusUpdateTimeUtc"]),
    provisioningState: item["provisioningState"],
    authorization: !item["authorization"]
      ? item["authorization"]
      : authorizationDeserializer(item["authorization"]),
    autoDiscovery: item["autoDiscovery"],
    topLevelInventoryList: !item["topLevelInventoryList"]
      ? item["topLevelInventoryList"]
      : item["topLevelInventoryList"].map((p: any) => {
          return p;
        }),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : devOpsCapabilityArrayDeserializer(item["capabilities"]),
    agentlessConfiguration: !item["agentlessConfiguration"]
      ? item["agentlessConfiguration"]
      : agentlessConfigurationDeserializer(item["agentlessConfiguration"]),
  };
}

/** Authorization payload. */
export interface Authorization {
  /**
   * Gets or sets one-time OAuth code to exchange for refresh and access tokens.
   *
   * Only used during PUT/PATCH operations. The secret is cleared during GET.
   */
  code?: string;
}

export function authorizationSerializer(item: Authorization): any {
  return { code: item["code"] };
}

export function authorizationDeserializer(item: any): Authorization {
  return {
    code: item["code"],
  };
}

/** AutoDiscovery states. */
export enum KnownAutoDiscovery {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
  /** NotApplicable */
  NotApplicable = "NotApplicable",
}

/**
 * AutoDiscovery states. \
 * {@link KnownAutoDiscovery} can be used interchangeably with AutoDiscovery,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled \
 * **NotApplicable**: NotApplicable
 */
export type AutoDiscovery = string;

export function devOpsCapabilityArrayDeserializer(result: Array<DevOpsCapability>): any[] {
  return result.map((item) => {
    return devOpsCapabilityDeserializer(item);
  });
}

/** Details about DevOps capability. */
export interface DevOpsCapability {
  /** Gets the name of the DevOps capability. */
  readonly name?: string;
  /** Gets the value of the DevOps capability. */
  readonly value?: string;
}

export function devOpsCapabilityDeserializer(item: any): DevOpsCapability {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Details about Agentless configuration. */
export interface AgentlessConfiguration {
  /** Agentless Enablement states. */
  agentlessEnabled?: AgentlessEnablement;
  /** AutoDiscovery states. */
  agentlessAutoDiscovery?: AutoDiscovery;
  /** Gets or sets the scanners for the connector. */
  scanners?: string[];
  /** Types for inventory list. */
  inventoryListType?: InventoryListKind;
  /**
   * Gets or sets the inventory list for inclusion or exclusion from Agentless.
   * Will be ignored if agentless auto-discovery is enabled.
   */
  inventoryList?: InventoryList[];
}

export function agentlessConfigurationSerializer(item: AgentlessConfiguration): any {
  return {
    agentlessEnabled: item["agentlessEnabled"],
    agentlessAutoDiscovery: item["agentlessAutoDiscovery"],
    scanners: !item["scanners"]
      ? item["scanners"]
      : item["scanners"].map((p: any) => {
          return p;
        }),
    inventoryListType: item["inventoryListType"],
    inventoryList: !item["inventoryList"]
      ? item["inventoryList"]
      : inventoryListArraySerializer(item["inventoryList"]),
  };
}

export function agentlessConfigurationDeserializer(item: any): AgentlessConfiguration {
  return {
    agentlessEnabled: item["agentlessEnabled"],
    agentlessAutoDiscovery: item["agentlessAutoDiscovery"],
    scanners: !item["scanners"]
      ? item["scanners"]
      : item["scanners"].map((p: any) => {
          return p;
        }),
    inventoryListType: item["inventoryListType"],
    inventoryList: !item["inventoryList"]
      ? item["inventoryList"]
      : inventoryListArrayDeserializer(item["inventoryList"]),
  };
}

/** Agentless Enablement states. */
export enum KnownAgentlessEnablement {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
  /** NotApplicable */
  NotApplicable = "NotApplicable",
}

/**
 * Agentless Enablement states. \
 * {@link KnownAgentlessEnablement} can be used interchangeably with AgentlessEnablement,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled \
 * **NotApplicable**: NotApplicable
 */
export type AgentlessEnablement = string;

/** Types for inventory list. */
export enum KnownInventoryListKind {
  /** Inclusion */
  Inclusion = "Inclusion",
  /** Exclusion */
  Exclusion = "Exclusion",
}

/**
 * Types for inventory list. \
 * {@link KnownInventoryListKind} can be used interchangeably with InventoryListKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inclusion**: Inclusion \
 * **Exclusion**: Exclusion
 */
export type InventoryListKind = string;

export function inventoryListArraySerializer(result: Array<InventoryList>): any[] {
  return result.map((item) => {
    return inventoryListSerializer(item);
  });
}

export function inventoryListArrayDeserializer(result: Array<InventoryList>): any[] {
  return result.map((item) => {
    return inventoryListDeserializer(item);
  });
}

/** Model for inventory to be included or excluded from Agentless. */
export interface InventoryList {
  /** Types for inventory kind. */
  inventoryKind?: InventoryKind;
  /** Gets or sets the value for inventory type. */
  value?: string;
}

export function inventoryListSerializer(item: InventoryList): any {
  return { inventoryKind: item["inventoryKind"], value: item["value"] };
}

export function inventoryListDeserializer(item: any): InventoryList {
  return {
    inventoryKind: item["inventoryKind"],
    value: item["value"],
  };
}

/** Types for inventory kind. */
export enum KnownInventoryKind {
  /** AzureDevOpsOrganization */
  AzureDevOpsOrganization = "AzureDevOpsOrganization",
  /** AzureDevOpsProject */
  AzureDevOpsProject = "AzureDevOpsProject",
  /** AzureDevOpsRepository */
  AzureDevOpsRepository = "AzureDevOpsRepository",
  /** GitHubOwner */
  GitHubOwner = "GitHubOwner",
  /** GitHubRepository */
  GitHubRepository = "GitHubRepository",
}

/**
 * Types for inventory kind. \
 * {@link KnownInventoryKind} can be used interchangeably with InventoryKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureDevOpsOrganization**: AzureDevOpsOrganization \
 * **AzureDevOpsProject**: AzureDevOpsProject \
 * **AzureDevOpsRepository**: AzureDevOpsRepository \
 * **GitHubOwner**: GitHubOwner \
 * **GitHubRepository**: GitHubRepository
 */
export type InventoryKind = string;

/** List of RP resources which supports pagination. */
export interface _DevOpsConfigurationListResponse {
  /** The DevOpsConfiguration items on this page. */
  value?: DevOpsConfiguration[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _devOpsConfigurationListResponseDeserializer(
  item: any,
): _DevOpsConfigurationListResponse {
  return {
    value: !item["value"] ? item["value"] : devOpsConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function devOpsConfigurationArraySerializer(result: Array<DevOpsConfiguration>): any[] {
  return result.map((item) => {
    return devOpsConfigurationSerializer(item);
  });
}

export function devOpsConfigurationArrayDeserializer(result: Array<DevOpsConfiguration>): any[] {
  return result.map((item) => {
    return devOpsConfigurationDeserializer(item);
  });
}

/** Azure DevOps Project resource. */
export interface AzureDevOpsProject extends ProxyResource {
  /** Azure DevOps Project properties. */
  properties?: AzureDevOpsProjectProperties;
}

export function azureDevOpsProjectSerializer(item: AzureDevOpsProject): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : azureDevOpsProjectPropertiesSerializer(item["properties"]),
  };
}

export function azureDevOpsProjectDeserializer(item: any): AzureDevOpsProject {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : azureDevOpsProjectPropertiesDeserializer(item["properties"]),
  };
}

/** Azure DevOps Project properties. */
export interface AzureDevOpsProjectProperties {
  /** Gets the resource status message. */
  readonly provisioningStatusMessage?: string;
  /** Gets the time when resource was last checked. */
  readonly provisioningStatusUpdateTimeUtc?: Date;
  /**
   * The provisioning state of the resource.
   *
   * Pending - Provisioning pending.
   * Failed - Provisioning failed.
   * Succeeded - Successful provisioning.
   * Canceled - Provisioning canceled.
   * PendingDeletion - Deletion pending.
   * DeletionSuccess - Deletion successful.
   * DeletionFailure - Deletion failure.
   */
  readonly provisioningState?: DevOpsProvisioningState;
  /** Gets or sets parent Azure DevOps Organization name. */
  parentOrgName?: string;
  /** Gets or sets Azure DevOps Project id. */
  readonly projectId?: string;
  /**
   * Details about resource onboarding status across all connectors.
   *
   * OnboardedByOtherConnector - this resource has already been onboarded to another connector. This is only applicable to top-level resources.
   * Onboarded - this resource has already been onboarded by the specified connector.
   * NotOnboarded - this resource has not been onboarded to any connector.
   * NotApplicable - the onboarding state is not applicable to the current endpoint.
   */
  onboardingState?: OnboardingState;
  /** Configuration payload for PR Annotations. */
  actionableRemediation?: ActionableRemediation;
}

export function azureDevOpsProjectPropertiesSerializer(item: AzureDevOpsProjectProperties): any {
  return {
    parentOrgName: item["parentOrgName"],
    onboardingState: item["onboardingState"],
    actionableRemediation: !item["actionableRemediation"]
      ? item["actionableRemediation"]
      : actionableRemediationSerializer(item["actionableRemediation"]),
  };
}

export function azureDevOpsProjectPropertiesDeserializer(item: any): AzureDevOpsProjectProperties {
  return {
    provisioningStatusMessage: item["provisioningStatusMessage"],
    provisioningStatusUpdateTimeUtc: !item["provisioningStatusUpdateTimeUtc"]
      ? item["provisioningStatusUpdateTimeUtc"]
      : new Date(item["provisioningStatusUpdateTimeUtc"]),
    provisioningState: item["provisioningState"],
    parentOrgName: item["parentOrgName"],
    projectId: item["projectId"],
    onboardingState: item["onboardingState"],
    actionableRemediation: !item["actionableRemediation"]
      ? item["actionableRemediation"]
      : actionableRemediationDeserializer(item["actionableRemediation"]),
  };
}

/** List of RP resources which supports pagination. */
export interface _AzureDevOpsProjectListResponse {
  /** The AzureDevOpsProject items on this page. */
  value?: AzureDevOpsProject[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _azureDevOpsProjectListResponseDeserializer(
  item: any,
): _AzureDevOpsProjectListResponse {
  return {
    value: !item["value"] ? item["value"] : azureDevOpsProjectArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function azureDevOpsProjectArraySerializer(result: Array<AzureDevOpsProject>): any[] {
  return result.map((item) => {
    return azureDevOpsProjectSerializer(item);
  });
}

export function azureDevOpsProjectArrayDeserializer(result: Array<AzureDevOpsProject>): any[] {
  return result.map((item) => {
    return azureDevOpsProjectDeserializer(item);
  });
}

/** GitLab Project resource. */
export interface GitLabProject extends ProxyResource {
  /** GitLab Project properties. */
  properties?: GitLabProjectProperties;
}

export function gitLabProjectDeserializer(item: any): GitLabProject {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : gitLabProjectPropertiesDeserializer(item["properties"]),
  };
}

/** GitLab Project properties. */
export interface GitLabProjectProperties {
  /** Gets the resource status message. */
  readonly provisioningStatusMessage?: string;
  /** Gets the time when resource was last checked. */
  readonly provisioningStatusUpdateTimeUtc?: Date;
  /**
   * The provisioning state of the resource.
   *
   * Pending - Provisioning pending.
   * Failed - Provisioning failed.
   * Succeeded - Successful provisioning.
   * Canceled - Provisioning canceled.
   * PendingDeletion - Deletion pending.
   * DeletionSuccess - Deletion successful.
   * DeletionFailure - Deletion failure.
   */
  readonly provisioningState?: DevOpsProvisioningState;
  /**
   * Gets or sets the fully-qualified name of the project object.
   *
   * This contains the entire hierarchy where entities are separated by the '$' character.
   */
  readonly fullyQualifiedName?: string;
  /**
   * Gets or sets the human readable fully-qualified name of the Project object.
   *
   * This contains the entire namespace hierarchy as seen on GitLab UI where entities are separated by the '/' character.
   */
  readonly fullyQualifiedFriendlyName?: string;
  /**
   * Gets or sets the fully-qualified name of the project's parent group object.
   *
   * This contains the entire hierarchy where namespaces are separated by the '$' character.
   */
  readonly fullyQualifiedParentGroupName?: string;
  /** Gets or sets the url of the GitLab Project. */
  readonly url?: string;
  /**
   * Details about resource onboarding status across all connectors.
   *
   * OnboardedByOtherConnector - this resource has already been onboarded to another connector. This is only applicable to top-level resources.
   * Onboarded - this resource has already been onboarded by the specified connector.
   * NotOnboarded - this resource has not been onboarded to any connector.
   * NotApplicable - the onboarding state is not applicable to the current endpoint.
   */
  onboardingState?: OnboardingState;
}

export function gitLabProjectPropertiesDeserializer(item: any): GitLabProjectProperties {
  return {
    provisioningStatusMessage: item["provisioningStatusMessage"],
    provisioningStatusUpdateTimeUtc: !item["provisioningStatusUpdateTimeUtc"]
      ? item["provisioningStatusUpdateTimeUtc"]
      : new Date(item["provisioningStatusUpdateTimeUtc"]),
    provisioningState: item["provisioningState"],
    fullyQualifiedName: item["fullyQualifiedName"],
    fullyQualifiedFriendlyName: item["fullyQualifiedFriendlyName"],
    fullyQualifiedParentGroupName: item["fullyQualifiedParentGroupName"],
    url: item["url"],
    onboardingState: item["onboardingState"],
  };
}

/** List of RP resources which supports pagination. */
export interface _GitLabProjectListResponse {
  /** The GitLabProject items on this page. */
  value?: GitLabProject[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _gitLabProjectListResponseDeserializer(item: any): _GitLabProjectListResponse {
  return {
    value: !item["value"] ? item["value"] : gitLabProjectArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function gitLabProjectArrayDeserializer(result: Array<GitLabProject>): any[] {
  return result.map((item) => {
    return gitLabProjectDeserializer(item);
  });
}

/** Azure DevOps Repository resource. */
export interface AzureDevOpsRepository extends ProxyResource {
  /** Azure DevOps Repository properties. */
  properties?: AzureDevOpsRepositoryProperties;
}

export function azureDevOpsRepositorySerializer(item: AzureDevOpsRepository): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : azureDevOpsRepositoryPropertiesSerializer(item["properties"]),
  };
}

export function azureDevOpsRepositoryDeserializer(item: any): AzureDevOpsRepository {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : azureDevOpsRepositoryPropertiesDeserializer(item["properties"]),
  };
}

/** Azure DevOps Repository properties. */
export interface AzureDevOpsRepositoryProperties {
  /** Gets the resource status message. */
  readonly provisioningStatusMessage?: string;
  /** Gets the time when resource was last checked. */
  readonly provisioningStatusUpdateTimeUtc?: Date;
  /**
   * The provisioning state of the resource.
   *
   * Pending - Provisioning pending.
   * Failed - Provisioning failed.
   * Succeeded - Successful provisioning.
   * Canceled - Provisioning canceled.
   * PendingDeletion - Deletion pending.
   * DeletionSuccess - Deletion successful.
   * DeletionFailure - Deletion failure.
   */
  readonly provisioningState?: DevOpsProvisioningState;
  /** Gets or sets parent Azure DevOps Organization name. */
  parentOrgName?: string;
  /** Gets or sets parent Azure DevOps Project name. */
  parentProjectName?: string;
  /** Gets or sets Azure DevOps Repository id. */
  readonly repoId?: string;
  /** Gets or sets Azure DevOps Repository url. */
  readonly repoUrl?: string;
  /** Gets or sets Azure DevOps repository visibility, whether it is public or private etc. */
  readonly visibility?: string;
  /**
   * Details about resource onboarding status across all connectors.
   *
   * OnboardedByOtherConnector - this resource has already been onboarded to another connector. This is only applicable to top-level resources.
   * Onboarded - this resource has already been onboarded by the specified connector.
   * NotOnboarded - this resource has not been onboarded to any connector.
   * NotApplicable - the onboarding state is not applicable to the current endpoint.
   */
  onboardingState?: OnboardingState;
  /** Configuration payload for PR Annotations. */
  actionableRemediation?: ActionableRemediation;
}

export function azureDevOpsRepositoryPropertiesSerializer(
  item: AzureDevOpsRepositoryProperties,
): any {
  return {
    parentOrgName: item["parentOrgName"],
    parentProjectName: item["parentProjectName"],
    onboardingState: item["onboardingState"],
    actionableRemediation: !item["actionableRemediation"]
      ? item["actionableRemediation"]
      : actionableRemediationSerializer(item["actionableRemediation"]),
  };
}

export function azureDevOpsRepositoryPropertiesDeserializer(
  item: any,
): AzureDevOpsRepositoryProperties {
  return {
    provisioningStatusMessage: item["provisioningStatusMessage"],
    provisioningStatusUpdateTimeUtc: !item["provisioningStatusUpdateTimeUtc"]
      ? item["provisioningStatusUpdateTimeUtc"]
      : new Date(item["provisioningStatusUpdateTimeUtc"]),
    provisioningState: item["provisioningState"],
    parentOrgName: item["parentOrgName"],
    parentProjectName: item["parentProjectName"],
    repoId: item["repoId"],
    repoUrl: item["repoUrl"],
    visibility: item["visibility"],
    onboardingState: item["onboardingState"],
    actionableRemediation: !item["actionableRemediation"]
      ? item["actionableRemediation"]
      : actionableRemediationDeserializer(item["actionableRemediation"]),
  };
}

/** List of RP resources which supports pagination. */
export interface _AzureDevOpsRepositoryListResponse {
  /** The AzureDevOpsRepository items on this page. */
  value?: AzureDevOpsRepository[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _azureDevOpsRepositoryListResponseDeserializer(
  item: any,
): _AzureDevOpsRepositoryListResponse {
  return {
    value: !item["value"] ? item["value"] : azureDevOpsRepositoryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function azureDevOpsRepositoryArraySerializer(result: Array<AzureDevOpsRepository>): any[] {
  return result.map((item) => {
    return azureDevOpsRepositorySerializer(item);
  });
}

export function azureDevOpsRepositoryArrayDeserializer(
  result: Array<AzureDevOpsRepository>,
): any[] {
  return result.map((item) => {
    return azureDevOpsRepositoryDeserializer(item);
  });
}

/** GitHub Repository resource. */
export interface GitHubRepository extends ProxyResource {
  /** GitHub Repository properties. */
  properties?: GitHubRepositoryProperties;
}

export function gitHubRepositoryDeserializer(item: any): GitHubRepository {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : gitHubRepositoryPropertiesDeserializer(item["properties"]),
  };
}

/** GitHub Repository properties. */
export interface GitHubRepositoryProperties {
  /** Gets the resource status message. */
  readonly provisioningStatusMessage?: string;
  /** Gets the time when resource was last checked. */
  readonly provisioningStatusUpdateTimeUtc?: Date;
  /**
   * The provisioning state of the resource.
   *
   * Pending - Provisioning pending.
   * Failed - Provisioning failed.
   * Succeeded - Successful provisioning.
   * Canceled - Provisioning canceled.
   * PendingDeletion - Deletion pending.
   * DeletionSuccess - Deletion successful.
   * DeletionFailure - Deletion failure.
   */
  readonly provisioningState?: DevOpsProvisioningState;
  /**
   * Gets or sets GitHub Repository id.
   *
   * This is a numeric id defined by Github.
   * Eg: "123456".
   */
  readonly repoId?: string;
  /**
   * Gets or sets GitHub Repository name.
   * Eg: "new-repo-1".
   */
  readonly repoName?: string;
  /**
   * Gets or sets GitHub Full Name.
   * Repository name, prefixed with Owner name.
   * Eg: "my-org/new-repo-1".
   */
  readonly repoFullName?: string;
  /**
   * Details about resource onboarding status across all connectors.
   *
   * OnboardedByOtherConnector - this resource has already been onboarded to another connector. This is only applicable to top-level resources.
   * Onboarded - this resource has already been onboarded by the specified connector.
   * NotOnboarded - this resource has not been onboarded to any connector.
   * NotApplicable - the onboarding state is not applicable to the current endpoint.
   */
  onboardingState?: OnboardingState;
  /** Gets or sets GitHub Repository url. */
  readonly repoUrl?: string;
  /** Gets or sets parent GitHub Owner name. */
  parentOwnerName?: string;
}

export function gitHubRepositoryPropertiesDeserializer(item: any): GitHubRepositoryProperties {
  return {
    provisioningStatusMessage: item["provisioningStatusMessage"],
    provisioningStatusUpdateTimeUtc: !item["provisioningStatusUpdateTimeUtc"]
      ? item["provisioningStatusUpdateTimeUtc"]
      : new Date(item["provisioningStatusUpdateTimeUtc"]),
    provisioningState: item["provisioningState"],
    repoId: item["repoId"],
    repoName: item["repoName"],
    repoFullName: item["repoFullName"],
    onboardingState: item["onboardingState"],
    repoUrl: item["repoUrl"],
    parentOwnerName: item["parentOwnerName"],
  };
}

/** List of RP resources which supports pagination. */
export interface _GitHubRepositoryListResponse {
  /** The GitHubRepository items on this page. */
  value?: GitHubRepository[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _gitHubRepositoryListResponseDeserializer(
  item: any,
): _GitHubRepositoryListResponse {
  return {
    value: !item["value"] ? item["value"] : gitHubRepositoryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function gitHubRepositoryArrayDeserializer(result: Array<GitHubRepository>): any[] {
  return result.map((item) => {
    return gitHubRepositoryDeserializer(item);
  });
}

/** The issue creation request model */
export interface IssueCreationRequest {
  /** The security assessment resource id that the issue will be opened based on. */
  securityAssessmentResourceId?: string;
}

export function issueCreationRequestSerializer(item: IssueCreationRequest): any {
  return { securityAssessmentResourceId: item["securityAssessmentResourceId"] };
}
