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
export interface SecurityConnectorsDevOpsAPIAzureDevOpsOrg extends ProxyResource {
  /** Azure DevOps Organization properties. */
  properties?: SecurityConnectorsDevOpsAPIAzureDevOpsOrgProperties;
}

export function securityConnectorsDevOpsAPIAzureDevOpsOrgSerializer(
  item: SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : securityConnectorsDevOpsAPIAzureDevOpsOrgPropertiesSerializer(item["properties"]),
  };
}

export function securityConnectorsDevOpsAPIAzureDevOpsOrgDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIAzureDevOpsOrg {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : securityConnectorsDevOpsAPIAzureDevOpsOrgPropertiesDeserializer(item["properties"]),
  };
}

/** Azure DevOps Organization properties. */
export interface SecurityConnectorsDevOpsAPIAzureDevOpsOrgProperties {
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
  readonly provisioningState?: SecurityConnectorsDevOpsAPIDevOpsProvisioningState;
  /**
   * Details about resource onboarding status across all connectors.
   *
   * OnboardedByOtherConnector - this resource has already been onboarded to another connector. This is only applicable to top-level resources.
   * Onboarded - this resource has already been onboarded by the specified connector.
   * NotOnboarded - this resource has not been onboarded to any connector.
   * NotApplicable - the onboarding state is not applicable to the current endpoint.
   */
  onboardingState?: SecurityConnectorsDevOpsAPIOnboardingState;
  /** Configuration payload for PR Annotations. */
  actionableRemediation?: SecurityConnectorsDevOpsAPIActionableRemediation;
}

export function securityConnectorsDevOpsAPIAzureDevOpsOrgPropertiesSerializer(
  item: SecurityConnectorsDevOpsAPIAzureDevOpsOrgProperties,
): any {
  return {
    onboardingState: item["onboardingState"],
    actionableRemediation: !item["actionableRemediation"]
      ? item["actionableRemediation"]
      : securityConnectorsDevOpsAPIActionableRemediationSerializer(item["actionableRemediation"]),
  };
}

export function securityConnectorsDevOpsAPIAzureDevOpsOrgPropertiesDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIAzureDevOpsOrgProperties {
  return {
    provisioningStatusMessage: item["provisioningStatusMessage"],
    provisioningStatusUpdateTimeUtc: !item["provisioningStatusUpdateTimeUtc"]
      ? item["provisioningStatusUpdateTimeUtc"]
      : new Date(item["provisioningStatusUpdateTimeUtc"]),
    provisioningState: item["provisioningState"],
    onboardingState: item["onboardingState"],
    actionableRemediation: !item["actionableRemediation"]
      ? item["actionableRemediation"]
      : securityConnectorsDevOpsAPIActionableRemediationDeserializer(item["actionableRemediation"]),
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
export enum KnownSecurityConnectorsDevOpsAPIDevOpsProvisioningState {
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
 * {@link KnownSecurityConnectorsDevOpsAPIDevOpsProvisioningState} can be used interchangeably with SecurityConnectorsDevOpsAPIDevOpsProvisioningState,
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
export type SecurityConnectorsDevOpsAPIDevOpsProvisioningState = string;

/**
 * Details about resource onboarding status across all connectors.
 *
 * OnboardedByOtherConnector - this resource has already been onboarded to another connector. This is only applicable to top-level resources.
 * Onboarded - this resource has already been onboarded by the specified connector.
 * NotOnboarded - this resource has not been onboarded to any connector.
 * NotApplicable - the onboarding state is not applicable to the current endpoint.
 */
export enum KnownSecurityConnectorsDevOpsAPIOnboardingState {
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
 * {@link KnownSecurityConnectorsDevOpsAPIOnboardingState} can be used interchangeably with SecurityConnectorsDevOpsAPIOnboardingState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotApplicable**: NotApplicable \
 * **OnboardedByOtherConnector**: OnboardedByOtherConnector \
 * **Onboarded**: Onboarded \
 * **NotOnboarded**: NotOnboarded
 */
export type SecurityConnectorsDevOpsAPIOnboardingState = string;

/** Configuration payload for PR Annotations. */
export interface SecurityConnectorsDevOpsAPIActionableRemediation {
  /**
   * ActionableRemediation Setting.
   * None - the setting was never set.
   * Enabled - ActionableRemediation is enabled.
   * Disabled - ActionableRemediation is disabled.
   */
  state?: SecurityConnectorsDevOpsAPIActionableRemediationState;
  /** Gets or sets list of categories and severity levels. */
  categoryConfigurations?: SecurityConnectorsDevOpsAPICategoryConfiguration[];
  /** Repository branch configuration for PR Annotations. */
  branchConfiguration?: SecurityConnectorsDevOpsAPITargetBranchConfiguration;
  /**
   * Update Settings.
   *
   * Enabled - Resource should inherit configurations from parent.
   * Disabled - Resource should not inherit configurations from parent.
   */
  inheritFromParentState?: SecurityConnectorsDevOpsAPIInheritFromParentState;
}

export function securityConnectorsDevOpsAPIActionableRemediationSerializer(
  item: SecurityConnectorsDevOpsAPIActionableRemediation,
): any {
  return {
    state: item["state"],
    categoryConfigurations: !item["categoryConfigurations"]
      ? item["categoryConfigurations"]
      : securityConnectorsDevOpsAPICategoryConfigurationArraySerializer(
          item["categoryConfigurations"],
        ),
    branchConfiguration: !item["branchConfiguration"]
      ? item["branchConfiguration"]
      : securityConnectorsDevOpsAPITargetBranchConfigurationSerializer(item["branchConfiguration"]),
    inheritFromParentState: item["inheritFromParentState"],
  };
}

export function securityConnectorsDevOpsAPIActionableRemediationDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIActionableRemediation {
  return {
    state: item["state"],
    categoryConfigurations: !item["categoryConfigurations"]
      ? item["categoryConfigurations"]
      : securityConnectorsDevOpsAPICategoryConfigurationArrayDeserializer(
          item["categoryConfigurations"],
        ),
    branchConfiguration: !item["branchConfiguration"]
      ? item["branchConfiguration"]
      : securityConnectorsDevOpsAPITargetBranchConfigurationDeserializer(
          item["branchConfiguration"],
        ),
    inheritFromParentState: item["inheritFromParentState"],
  };
}

/**
 * ActionableRemediation Setting.
 * None - the setting was never set.
 * Enabled - ActionableRemediation is enabled.
 * Disabled - ActionableRemediation is disabled.
 */
export enum KnownSecurityConnectorsDevOpsAPIActionableRemediationState {
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
 * {@link KnownSecurityConnectorsDevOpsAPIActionableRemediationState} can be used interchangeably with SecurityConnectorsDevOpsAPIActionableRemediationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type SecurityConnectorsDevOpsAPIActionableRemediationState = string;

export function securityConnectorsDevOpsAPICategoryConfigurationArraySerializer(
  result: Array<SecurityConnectorsDevOpsAPICategoryConfiguration>,
): any[] {
  return result.map((item) => {
    return securityConnectorsDevOpsAPICategoryConfigurationSerializer(item);
  });
}

export function securityConnectorsDevOpsAPICategoryConfigurationArrayDeserializer(
  result: Array<SecurityConnectorsDevOpsAPICategoryConfiguration>,
): any[] {
  return result.map((item) => {
    return securityConnectorsDevOpsAPICategoryConfigurationDeserializer(item);
  });
}

/** Severity level per category configuration for PR Annotations. */
export interface SecurityConnectorsDevOpsAPICategoryConfiguration {
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
  category?: SecurityConnectorsDevOpsAPIRuleCategory;
}

export function securityConnectorsDevOpsAPICategoryConfigurationSerializer(
  item: SecurityConnectorsDevOpsAPICategoryConfiguration,
): any {
  return { minimumSeverityLevel: item["minimumSeverityLevel"], category: item["category"] };
}

export function securityConnectorsDevOpsAPICategoryConfigurationDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPICategoryConfiguration {
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
export enum KnownSecurityConnectorsDevOpsAPIRuleCategory {
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
 * {@link KnownSecurityConnectorsDevOpsAPIRuleCategory} can be used interchangeably with SecurityConnectorsDevOpsAPIRuleCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Code**: Code \
 * **Artifacts**: Artifacts \
 * **Dependencies**: Dependencies \
 * **Secrets**: Secrets \
 * **IaC**: IaC \
 * **Containers**: Containers
 */
export type SecurityConnectorsDevOpsAPIRuleCategory = string;

/** Repository branch configuration for PR Annotations. */
export interface SecurityConnectorsDevOpsAPITargetBranchConfiguration {
  /** Gets or sets branches that should have annotations. */
  branchNames?: string[];
  /**
   * Configuration of PR Annotations on default branch.
   *
   * Enabled - PR Annotations are enabled on the resource's default branch.
   * Disabled - PR Annotations are disabled on the resource's default branch.
   */
  annotateDefaultBranch?: SecurityConnectorsDevOpsAPIAnnotateDefaultBranchState;
}

export function securityConnectorsDevOpsAPITargetBranchConfigurationSerializer(
  item: SecurityConnectorsDevOpsAPITargetBranchConfiguration,
): any {
  return {
    branchNames: !item["branchNames"]
      ? item["branchNames"]
      : item["branchNames"].map((p: any) => {
          return p;
        }),
    annotateDefaultBranch: item["annotateDefaultBranch"],
  };
}

export function securityConnectorsDevOpsAPITargetBranchConfigurationDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPITargetBranchConfiguration {
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
export enum KnownSecurityConnectorsDevOpsAPIAnnotateDefaultBranchState {
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
 * {@link KnownSecurityConnectorsDevOpsAPIAnnotateDefaultBranchState} can be used interchangeably with SecurityConnectorsDevOpsAPIAnnotateDefaultBranchState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type SecurityConnectorsDevOpsAPIAnnotateDefaultBranchState = string;

/**
 * Update Settings.
 *
 * Enabled - Resource should inherit configurations from parent.
 * Disabled - Resource should not inherit configurations from parent.
 */
export enum KnownSecurityConnectorsDevOpsAPIInheritFromParentState {
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
 * {@link KnownSecurityConnectorsDevOpsAPIInheritFromParentState} can be used interchangeably with SecurityConnectorsDevOpsAPIInheritFromParentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type SecurityConnectorsDevOpsAPIInheritFromParentState = string;

/** List of RP resources which supports pagination. */
export interface SecurityConnectorsDevOpsAPIAzureDevOpsOrgListResponse {
  /** The AzureDevOpsOrg items on this page. */
  value?: SecurityConnectorsDevOpsAPIAzureDevOpsOrg[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function securityConnectorsDevOpsAPIAzureDevOpsOrgListResponseDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIAzureDevOpsOrgListResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : securityConnectorsDevOpsAPIAzureDevOpsOrgArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityConnectorsDevOpsAPIAzureDevOpsOrgArraySerializer(
  result: Array<SecurityConnectorsDevOpsAPIAzureDevOpsOrg>,
): any[] {
  return result.map((item) => {
    return securityConnectorsDevOpsAPIAzureDevOpsOrgSerializer(item);
  });
}

export function securityConnectorsDevOpsAPIAzureDevOpsOrgArrayDeserializer(
  result: Array<SecurityConnectorsDevOpsAPIAzureDevOpsOrg>,
): any[] {
  return result.map((item) => {
    return securityConnectorsDevOpsAPIAzureDevOpsOrgDeserializer(item);
  });
}

/** GitHub Owner resource. */
export interface SecurityConnectorsDevOpsAPIGitHubOwner extends ProxyResource {
  /** GitHub Owner properties. */
  properties?: SecurityConnectorsDevOpsAPIGitHubOwnerProperties;
}

export function securityConnectorsDevOpsAPIGitHubOwnerDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIGitHubOwner {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : securityConnectorsDevOpsAPIGitHubOwnerPropertiesDeserializer(item["properties"]),
  };
}

/** GitHub Owner properties. */
export interface SecurityConnectorsDevOpsAPIGitHubOwnerProperties {
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
  readonly provisioningState?: SecurityConnectorsDevOpsAPIDevOpsProvisioningState;
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
  onboardingState?: SecurityConnectorsDevOpsAPIOnboardingState;
}

export function securityConnectorsDevOpsAPIGitHubOwnerPropertiesDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIGitHubOwnerProperties {
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
export interface SecurityConnectorsDevOpsAPIGitHubOwnerListResponse {
  /** The GitHubOwner items on this page. */
  value?: SecurityConnectorsDevOpsAPIGitHubOwner[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function securityConnectorsDevOpsAPIGitHubOwnerListResponseDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIGitHubOwnerListResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : securityConnectorsDevOpsAPIGitHubOwnerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityConnectorsDevOpsAPIGitHubOwnerArrayDeserializer(
  result: Array<SecurityConnectorsDevOpsAPIGitHubOwner>,
): any[] {
  return result.map((item) => {
    return securityConnectorsDevOpsAPIGitHubOwnerDeserializer(item);
  });
}

/** GitLab Group resource. */
export interface SecurityConnectorsDevOpsAPIGitLabGroup extends ProxyResource {
  /** GitLab Group properties. */
  properties?: SecurityConnectorsDevOpsAPIGitLabGroupProperties;
}

export function securityConnectorsDevOpsAPIGitLabGroupDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIGitLabGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : securityConnectorsDevOpsAPIGitLabGroupPropertiesDeserializer(item["properties"]),
  };
}

/** GitLab Group properties. */
export interface SecurityConnectorsDevOpsAPIGitLabGroupProperties {
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
  readonly provisioningState?: SecurityConnectorsDevOpsAPIDevOpsProvisioningState;
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
  onboardingState?: SecurityConnectorsDevOpsAPIOnboardingState;
}

export function securityConnectorsDevOpsAPIGitLabGroupPropertiesDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIGitLabGroupProperties {
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
export interface SecurityConnectorsDevOpsAPIGitLabGroupListResponse {
  /** The GitLabGroup items on this page. */
  value?: SecurityConnectorsDevOpsAPIGitLabGroup[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function securityConnectorsDevOpsAPIGitLabGroupListResponseDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIGitLabGroupListResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : securityConnectorsDevOpsAPIGitLabGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityConnectorsDevOpsAPIGitLabGroupArrayDeserializer(
  result: Array<SecurityConnectorsDevOpsAPIGitLabGroup>,
): any[] {
  return result.map((item) => {
    return securityConnectorsDevOpsAPIGitLabGroupDeserializer(item);
  });
}

/** DevOps Configuration resource. */
export interface SecurityConnectorsDevOpsAPIDevOpsConfiguration extends ProxyResource {
  /** DevOps Configuration properties. */
  properties?: SecurityConnectorsDevOpsAPIDevOpsConfigurationProperties;
}

export function securityConnectorsDevOpsAPIDevOpsConfigurationSerializer(
  item: SecurityConnectorsDevOpsAPIDevOpsConfiguration,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : securityConnectorsDevOpsAPIDevOpsConfigurationPropertiesSerializer(item["properties"]),
  };
}

export function securityConnectorsDevOpsAPIDevOpsConfigurationDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIDevOpsConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : securityConnectorsDevOpsAPIDevOpsConfigurationPropertiesDeserializer(item["properties"]),
  };
}

/** DevOps Configuration properties. */
export interface SecurityConnectorsDevOpsAPIDevOpsConfigurationProperties {
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
  readonly provisioningState?: SecurityConnectorsDevOpsAPIDevOpsProvisioningState;
  /** Authorization payload. */
  authorization?: SecurityConnectorsDevOpsAPIAuthorization;
  /** AutoDiscovery states. */
  autoDiscovery?: SecurityConnectorsDevOpsAPIAutoDiscovery;
  /**
   * List of top-level inventory to select when AutoDiscovery is disabled.
   * This field is ignored when AutoDiscovery is enabled.
   */
  topLevelInventoryList?: string[];
  /** List of capabilities assigned to the DevOps configuration during the discovery process. */
  readonly capabilities?: SecurityConnectorsDevOpsAPIDevOpsCapability[];
  /** Details about Agentless configuration. */
  agentlessConfiguration?: SecurityConnectorsDevOpsAPIAgentlessConfiguration;
}

export function securityConnectorsDevOpsAPIDevOpsConfigurationPropertiesSerializer(
  item: SecurityConnectorsDevOpsAPIDevOpsConfigurationProperties,
): any {
  return {
    authorization: !item["authorization"]
      ? item["authorization"]
      : securityConnectorsDevOpsAPIAuthorizationSerializer(item["authorization"]),
    autoDiscovery: item["autoDiscovery"],
    topLevelInventoryList: !item["topLevelInventoryList"]
      ? item["topLevelInventoryList"]
      : item["topLevelInventoryList"].map((p: any) => {
          return p;
        }),
    agentlessConfiguration: !item["agentlessConfiguration"]
      ? item["agentlessConfiguration"]
      : securityConnectorsDevOpsAPIAgentlessConfigurationSerializer(item["agentlessConfiguration"]),
  };
}

export function securityConnectorsDevOpsAPIDevOpsConfigurationPropertiesDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIDevOpsConfigurationProperties {
  return {
    provisioningStatusMessage: item["provisioningStatusMessage"],
    provisioningStatusUpdateTimeUtc: !item["provisioningStatusUpdateTimeUtc"]
      ? item["provisioningStatusUpdateTimeUtc"]
      : new Date(item["provisioningStatusUpdateTimeUtc"]),
    provisioningState: item["provisioningState"],
    authorization: !item["authorization"]
      ? item["authorization"]
      : securityConnectorsDevOpsAPIAuthorizationDeserializer(item["authorization"]),
    autoDiscovery: item["autoDiscovery"],
    topLevelInventoryList: !item["topLevelInventoryList"]
      ? item["topLevelInventoryList"]
      : item["topLevelInventoryList"].map((p: any) => {
          return p;
        }),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : securityConnectorsDevOpsAPIDevOpsCapabilityArrayDeserializer(item["capabilities"]),
    agentlessConfiguration: !item["agentlessConfiguration"]
      ? item["agentlessConfiguration"]
      : securityConnectorsDevOpsAPIAgentlessConfigurationDeserializer(
          item["agentlessConfiguration"],
        ),
  };
}

/** Authorization payload. */
export interface SecurityConnectorsDevOpsAPIAuthorization {
  /**
   * Gets or sets one-time OAuth code to exchange for refresh and access tokens.
   *
   * Only used during PUT/PATCH operations. The secret is cleared during GET.
   */
  code?: string;
}

export function securityConnectorsDevOpsAPIAuthorizationSerializer(
  item: SecurityConnectorsDevOpsAPIAuthorization,
): any {
  return { code: item["code"] };
}

export function securityConnectorsDevOpsAPIAuthorizationDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIAuthorization {
  return {
    code: item["code"],
  };
}

/** AutoDiscovery states. */
export enum KnownSecurityConnectorsDevOpsAPIAutoDiscovery {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
  /** NotApplicable */
  NotApplicable = "NotApplicable",
}

/**
 * AutoDiscovery states. \
 * {@link KnownSecurityConnectorsDevOpsAPIAutoDiscovery} can be used interchangeably with SecurityConnectorsDevOpsAPIAutoDiscovery,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled \
 * **NotApplicable**: NotApplicable
 */
export type SecurityConnectorsDevOpsAPIAutoDiscovery = string;

export function securityConnectorsDevOpsAPIDevOpsCapabilityArrayDeserializer(
  result: Array<SecurityConnectorsDevOpsAPIDevOpsCapability>,
): any[] {
  return result.map((item) => {
    return securityConnectorsDevOpsAPIDevOpsCapabilityDeserializer(item);
  });
}

/** Details about DevOps capability. */
export interface SecurityConnectorsDevOpsAPIDevOpsCapability {
  /** Gets the name of the DevOps capability. */
  readonly name?: string;
  /** Gets the value of the DevOps capability. */
  readonly value?: string;
}

export function securityConnectorsDevOpsAPIDevOpsCapabilityDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIDevOpsCapability {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Details about Agentless configuration. */
export interface SecurityConnectorsDevOpsAPIAgentlessConfiguration {
  /** Agentless Enablement states. */
  agentlessEnabled?: SecurityConnectorsDevOpsAPIAgentlessEnablement;
  /** AutoDiscovery states. */
  agentlessAutoDiscovery?: SecurityConnectorsDevOpsAPIAutoDiscovery;
  /** Gets or sets the scanners for the connector. */
  scanners?: string[];
  /** Types for inventory list. */
  inventoryListType?: SecurityConnectorsDevOpsAPIInventoryListKind;
  /**
   * Gets or sets the inventory list for inclusion or exclusion from Agentless.
   * Will be ignored if agentless auto-discovery is enabled.
   */
  inventoryList?: SecurityConnectorsDevOpsAPIInventoryList[];
}

export function securityConnectorsDevOpsAPIAgentlessConfigurationSerializer(
  item: SecurityConnectorsDevOpsAPIAgentlessConfiguration,
): any {
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
      : securityConnectorsDevOpsAPIInventoryListArraySerializer(item["inventoryList"]),
  };
}

export function securityConnectorsDevOpsAPIAgentlessConfigurationDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIAgentlessConfiguration {
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
      : securityConnectorsDevOpsAPIInventoryListArrayDeserializer(item["inventoryList"]),
  };
}

/** Agentless Enablement states. */
export enum KnownSecurityConnectorsDevOpsAPIAgentlessEnablement {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
  /** NotApplicable */
  NotApplicable = "NotApplicable",
}

/**
 * Agentless Enablement states. \
 * {@link KnownSecurityConnectorsDevOpsAPIAgentlessEnablement} can be used interchangeably with SecurityConnectorsDevOpsAPIAgentlessEnablement,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled \
 * **NotApplicable**: NotApplicable
 */
export type SecurityConnectorsDevOpsAPIAgentlessEnablement = string;

/** Types for inventory list. */
export enum KnownSecurityConnectorsDevOpsAPIInventoryListKind {
  /** Inclusion */
  Inclusion = "Inclusion",
  /** Exclusion */
  Exclusion = "Exclusion",
}

/**
 * Types for inventory list. \
 * {@link KnownSecurityConnectorsDevOpsAPIInventoryListKind} can be used interchangeably with SecurityConnectorsDevOpsAPIInventoryListKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inclusion**: Inclusion \
 * **Exclusion**: Exclusion
 */
export type SecurityConnectorsDevOpsAPIInventoryListKind = string;

export function securityConnectorsDevOpsAPIInventoryListArraySerializer(
  result: Array<SecurityConnectorsDevOpsAPIInventoryList>,
): any[] {
  return result.map((item) => {
    return securityConnectorsDevOpsAPIInventoryListSerializer(item);
  });
}

export function securityConnectorsDevOpsAPIInventoryListArrayDeserializer(
  result: Array<SecurityConnectorsDevOpsAPIInventoryList>,
): any[] {
  return result.map((item) => {
    return securityConnectorsDevOpsAPIInventoryListDeserializer(item);
  });
}

/** Model for inventory to be included or excluded from Agentless. */
export interface SecurityConnectorsDevOpsAPIInventoryList {
  /** Types for inventory kind. */
  inventoryKind?: SecurityConnectorsDevOpsAPIInventoryKind;
  /** Gets or sets the value for inventory type. */
  value?: string;
}

export function securityConnectorsDevOpsAPIInventoryListSerializer(
  item: SecurityConnectorsDevOpsAPIInventoryList,
): any {
  return { inventoryKind: item["inventoryKind"], value: item["value"] };
}

export function securityConnectorsDevOpsAPIInventoryListDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIInventoryList {
  return {
    inventoryKind: item["inventoryKind"],
    value: item["value"],
  };
}

/** Types for inventory kind. */
export enum KnownSecurityConnectorsDevOpsAPIInventoryKind {
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
 * {@link KnownSecurityConnectorsDevOpsAPIInventoryKind} can be used interchangeably with SecurityConnectorsDevOpsAPIInventoryKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureDevOpsOrganization**: AzureDevOpsOrganization \
 * **AzureDevOpsProject**: AzureDevOpsProject \
 * **AzureDevOpsRepository**: AzureDevOpsRepository \
 * **GitHubOwner**: GitHubOwner \
 * **GitHubRepository**: GitHubRepository
 */
export type SecurityConnectorsDevOpsAPIInventoryKind = string;

/** List of RP resources which supports pagination. */
export interface _SecurityConnectorsDevOpsAPIDevOpsConfigurationListResponse {
  /** The DevOpsConfiguration items on this page. */
  value?: SecurityConnectorsDevOpsAPIDevOpsConfiguration[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _securityConnectorsDevOpsAPIDevOpsConfigurationListResponseDeserializer(
  item: any,
): _SecurityConnectorsDevOpsAPIDevOpsConfigurationListResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : securityConnectorsDevOpsAPIDevOpsConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityConnectorsDevOpsAPIDevOpsConfigurationArraySerializer(
  result: Array<SecurityConnectorsDevOpsAPIDevOpsConfiguration>,
): any[] {
  return result.map((item) => {
    return securityConnectorsDevOpsAPIDevOpsConfigurationSerializer(item);
  });
}

export function securityConnectorsDevOpsAPIDevOpsConfigurationArrayDeserializer(
  result: Array<SecurityConnectorsDevOpsAPIDevOpsConfiguration>,
): any[] {
  return result.map((item) => {
    return securityConnectorsDevOpsAPIDevOpsConfigurationDeserializer(item);
  });
}

/** Azure DevOps Project resource. */
export interface SecurityConnectorsDevOpsAPIAzureDevOpsProject extends ProxyResource {
  /** Azure DevOps Project properties. */
  properties?: SecurityConnectorsDevOpsAPIAzureDevOpsProjectProperties;
}

export function securityConnectorsDevOpsAPIAzureDevOpsProjectSerializer(
  item: SecurityConnectorsDevOpsAPIAzureDevOpsProject,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : securityConnectorsDevOpsAPIAzureDevOpsProjectPropertiesSerializer(item["properties"]),
  };
}

export function securityConnectorsDevOpsAPIAzureDevOpsProjectDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIAzureDevOpsProject {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : securityConnectorsDevOpsAPIAzureDevOpsProjectPropertiesDeserializer(item["properties"]),
  };
}

/** Azure DevOps Project properties. */
export interface SecurityConnectorsDevOpsAPIAzureDevOpsProjectProperties {
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
  readonly provisioningState?: SecurityConnectorsDevOpsAPIDevOpsProvisioningState;
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
  onboardingState?: SecurityConnectorsDevOpsAPIOnboardingState;
  /** Configuration payload for PR Annotations. */
  actionableRemediation?: SecurityConnectorsDevOpsAPIActionableRemediation;
}

export function securityConnectorsDevOpsAPIAzureDevOpsProjectPropertiesSerializer(
  item: SecurityConnectorsDevOpsAPIAzureDevOpsProjectProperties,
): any {
  return {
    parentOrgName: item["parentOrgName"],
    onboardingState: item["onboardingState"],
    actionableRemediation: !item["actionableRemediation"]
      ? item["actionableRemediation"]
      : securityConnectorsDevOpsAPIActionableRemediationSerializer(item["actionableRemediation"]),
  };
}

export function securityConnectorsDevOpsAPIAzureDevOpsProjectPropertiesDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIAzureDevOpsProjectProperties {
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
      : securityConnectorsDevOpsAPIActionableRemediationDeserializer(item["actionableRemediation"]),
  };
}

/** List of RP resources which supports pagination. */
export interface _SecurityConnectorsDevOpsAPIAzureDevOpsProjectListResponse {
  /** The AzureDevOpsProject items on this page. */
  value?: SecurityConnectorsDevOpsAPIAzureDevOpsProject[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _securityConnectorsDevOpsAPIAzureDevOpsProjectListResponseDeserializer(
  item: any,
): _SecurityConnectorsDevOpsAPIAzureDevOpsProjectListResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : securityConnectorsDevOpsAPIAzureDevOpsProjectArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityConnectorsDevOpsAPIAzureDevOpsProjectArraySerializer(
  result: Array<SecurityConnectorsDevOpsAPIAzureDevOpsProject>,
): any[] {
  return result.map((item) => {
    return securityConnectorsDevOpsAPIAzureDevOpsProjectSerializer(item);
  });
}

export function securityConnectorsDevOpsAPIAzureDevOpsProjectArrayDeserializer(
  result: Array<SecurityConnectorsDevOpsAPIAzureDevOpsProject>,
): any[] {
  return result.map((item) => {
    return securityConnectorsDevOpsAPIAzureDevOpsProjectDeserializer(item);
  });
}

/** GitLab Project resource. */
export interface SecurityConnectorsDevOpsAPIGitLabProject extends ProxyResource {
  /** GitLab Project properties. */
  properties?: SecurityConnectorsDevOpsAPIGitLabProjectProperties;
}

export function securityConnectorsDevOpsAPIGitLabProjectDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIGitLabProject {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : securityConnectorsDevOpsAPIGitLabProjectPropertiesDeserializer(item["properties"]),
  };
}

/** GitLab Project properties. */
export interface SecurityConnectorsDevOpsAPIGitLabProjectProperties {
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
  readonly provisioningState?: SecurityConnectorsDevOpsAPIDevOpsProvisioningState;
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
  onboardingState?: SecurityConnectorsDevOpsAPIOnboardingState;
}

export function securityConnectorsDevOpsAPIGitLabProjectPropertiesDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIGitLabProjectProperties {
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
export interface _SecurityConnectorsDevOpsAPIGitLabProjectListResponse {
  /** The GitLabProject items on this page. */
  value?: SecurityConnectorsDevOpsAPIGitLabProject[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _securityConnectorsDevOpsAPIGitLabProjectListResponseDeserializer(
  item: any,
): _SecurityConnectorsDevOpsAPIGitLabProjectListResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : securityConnectorsDevOpsAPIGitLabProjectArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityConnectorsDevOpsAPIGitLabProjectArrayDeserializer(
  result: Array<SecurityConnectorsDevOpsAPIGitLabProject>,
): any[] {
  return result.map((item) => {
    return securityConnectorsDevOpsAPIGitLabProjectDeserializer(item);
  });
}

/** Azure DevOps Repository resource. */
export interface SecurityConnectorsDevOpsAPIAzureDevOpsRepository extends ProxyResource {
  /** Azure DevOps Repository properties. */
  properties?: SecurityConnectorsDevOpsAPIAzureDevOpsRepositoryProperties;
}

export function securityConnectorsDevOpsAPIAzureDevOpsRepositorySerializer(
  item: SecurityConnectorsDevOpsAPIAzureDevOpsRepository,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : securityConnectorsDevOpsAPIAzureDevOpsRepositoryPropertiesSerializer(item["properties"]),
  };
}

export function securityConnectorsDevOpsAPIAzureDevOpsRepositoryDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIAzureDevOpsRepository {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : securityConnectorsDevOpsAPIAzureDevOpsRepositoryPropertiesDeserializer(item["properties"]),
  };
}

/** Azure DevOps Repository properties. */
export interface SecurityConnectorsDevOpsAPIAzureDevOpsRepositoryProperties {
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
  readonly provisioningState?: SecurityConnectorsDevOpsAPIDevOpsProvisioningState;
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
  onboardingState?: SecurityConnectorsDevOpsAPIOnboardingState;
  /** Configuration payload for PR Annotations. */
  actionableRemediation?: SecurityConnectorsDevOpsAPIActionableRemediation;
}

export function securityConnectorsDevOpsAPIAzureDevOpsRepositoryPropertiesSerializer(
  item: SecurityConnectorsDevOpsAPIAzureDevOpsRepositoryProperties,
): any {
  return {
    parentOrgName: item["parentOrgName"],
    parentProjectName: item["parentProjectName"],
    onboardingState: item["onboardingState"],
    actionableRemediation: !item["actionableRemediation"]
      ? item["actionableRemediation"]
      : securityConnectorsDevOpsAPIActionableRemediationSerializer(item["actionableRemediation"]),
  };
}

export function securityConnectorsDevOpsAPIAzureDevOpsRepositoryPropertiesDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIAzureDevOpsRepositoryProperties {
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
      : securityConnectorsDevOpsAPIActionableRemediationDeserializer(item["actionableRemediation"]),
  };
}

/** List of RP resources which supports pagination. */
export interface _SecurityConnectorsDevOpsAPIAzureDevOpsRepositoryListResponse {
  /** The AzureDevOpsRepository items on this page. */
  value?: SecurityConnectorsDevOpsAPIAzureDevOpsRepository[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _securityConnectorsDevOpsAPIAzureDevOpsRepositoryListResponseDeserializer(
  item: any,
): _SecurityConnectorsDevOpsAPIAzureDevOpsRepositoryListResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : securityConnectorsDevOpsAPIAzureDevOpsRepositoryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityConnectorsDevOpsAPIAzureDevOpsRepositoryArraySerializer(
  result: Array<SecurityConnectorsDevOpsAPIAzureDevOpsRepository>,
): any[] {
  return result.map((item) => {
    return securityConnectorsDevOpsAPIAzureDevOpsRepositorySerializer(item);
  });
}

export function securityConnectorsDevOpsAPIAzureDevOpsRepositoryArrayDeserializer(
  result: Array<SecurityConnectorsDevOpsAPIAzureDevOpsRepository>,
): any[] {
  return result.map((item) => {
    return securityConnectorsDevOpsAPIAzureDevOpsRepositoryDeserializer(item);
  });
}

/** GitHub Repository resource. */
export interface SecurityConnectorsDevOpsAPIGitHubRepository extends ProxyResource {
  /** GitHub Repository properties. */
  properties?: SecurityConnectorsDevOpsAPIGitHubRepositoryProperties;
}

export function securityConnectorsDevOpsAPIGitHubRepositoryDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIGitHubRepository {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : securityConnectorsDevOpsAPIGitHubRepositoryPropertiesDeserializer(item["properties"]),
  };
}

/** GitHub Repository properties. */
export interface SecurityConnectorsDevOpsAPIGitHubRepositoryProperties {
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
  readonly provisioningState?: SecurityConnectorsDevOpsAPIDevOpsProvisioningState;
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
  onboardingState?: SecurityConnectorsDevOpsAPIOnboardingState;
  /** Gets or sets GitHub Repository url. */
  readonly repoUrl?: string;
  /** Gets or sets parent GitHub Owner name. */
  parentOwnerName?: string;
}

export function securityConnectorsDevOpsAPIGitHubRepositoryPropertiesDeserializer(
  item: any,
): SecurityConnectorsDevOpsAPIGitHubRepositoryProperties {
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
export interface _SecurityConnectorsDevOpsAPIGitHubRepositoryListResponse {
  /** The GitHubRepository items on this page. */
  value?: SecurityConnectorsDevOpsAPIGitHubRepository[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _securityConnectorsDevOpsAPIGitHubRepositoryListResponseDeserializer(
  item: any,
): _SecurityConnectorsDevOpsAPIGitHubRepositoryListResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : securityConnectorsDevOpsAPIGitHubRepositoryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityConnectorsDevOpsAPIGitHubRepositoryArrayDeserializer(
  result: Array<SecurityConnectorsDevOpsAPIGitHubRepository>,
): any[] {
  return result.map((item) => {
    return securityConnectorsDevOpsAPIGitHubRepositoryDeserializer(item);
  });
}

/** The issue creation request model */
export interface SecurityConnectorsDevOpsAPIIssueCreationRequest {
  /** The security assessment resource id that the issue will be opened based on. */
  securityAssessmentResourceId?: string;
}

export function securityConnectorsDevOpsAPIIssueCreationRequestSerializer(
  item: SecurityConnectorsDevOpsAPIIssueCreationRequest,
): any {
  return { securityAssessmentResourceId: item["securityAssessmentResourceId"] };
}
