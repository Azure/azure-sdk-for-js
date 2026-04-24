// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Governance assignment over a given scope */
export interface GovernanceAssignment extends ExtensionResource {
  /** The Owner for the governance assignment - e.g. user@contoso.com - see example */
  owner?: string;
  /** The remediation due-date - after this date Secure Score will be affected (in case of  active grace-period) */
  remediationDueDate?: Date;
  /** The ETA (estimated time of arrival) for remediation (optional), see example */
  remediationEta?: RemediationEta;
  /** Defines whether there is a grace period on the governance assignment */
  isGracePeriod?: boolean;
  /** The email notifications settings for the governance rule, states whether to disable notifications for mangers and owners */
  governanceEmailNotification?: GovernanceEmailNotification;
  /** The additional data for the governance assignment - e.g. links to ticket (optional), see example */
  additionalData?: GovernanceAssignmentAdditionalData;
}

export function governanceAssignmentSerializer(item: GovernanceAssignment): any {
  return {
    properties: areAllPropsUndefined(item, [
      "owner",
      "remediationDueDate",
      "remediationEta",
      "isGracePeriod",
      "governanceEmailNotification",
      "additionalData",
    ])
      ? undefined
      : _governanceAssignmentPropertiesSerializer(item),
  };
}

export function governanceAssignmentDeserializer(item: any): GovernanceAssignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _governanceAssignmentPropertiesDeserializer(item["properties"])),
  };
}

/** Describes properties of an governance assignment */
export interface GovernanceAssignmentProperties {
  /** The Owner for the governance assignment - e.g. user@contoso.com - see example */
  owner?: string;
  /** The remediation due-date - after this date Secure Score will be affected (in case of  active grace-period) */
  remediationDueDate: Date;
  /** The ETA (estimated time of arrival) for remediation (optional), see example */
  remediationEta?: RemediationEta;
  /** Defines whether there is a grace period on the governance assignment */
  isGracePeriod?: boolean;
  /** The email notifications settings for the governance rule, states whether to disable notifications for mangers and owners */
  governanceEmailNotification?: GovernanceEmailNotification;
  /** The additional data for the governance assignment - e.g. links to ticket (optional), see example */
  additionalData?: GovernanceAssignmentAdditionalData;
}

export function governanceAssignmentPropertiesSerializer(
  item: GovernanceAssignmentProperties,
): any {
  return {
    owner: item["owner"],
    remediationDueDate: item["remediationDueDate"].toISOString(),
    remediationEta: !item["remediationEta"]
      ? item["remediationEta"]
      : remediationEtaSerializer(item["remediationEta"]),
    isGracePeriod: item["isGracePeriod"],
    governanceEmailNotification: !item["governanceEmailNotification"]
      ? item["governanceEmailNotification"]
      : governanceEmailNotificationSerializer(item["governanceEmailNotification"]),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : governanceAssignmentAdditionalDataSerializer(item["additionalData"]),
  };
}

export function governanceAssignmentPropertiesDeserializer(
  item: any,
): GovernanceAssignmentProperties {
  return {
    owner: item["owner"],
    remediationDueDate: new Date(item["remediationDueDate"]),
    remediationEta: !item["remediationEta"]
      ? item["remediationEta"]
      : remediationEtaDeserializer(item["remediationEta"]),
    isGracePeriod: item["isGracePeriod"],
    governanceEmailNotification: !item["governanceEmailNotification"]
      ? item["governanceEmailNotification"]
      : governanceEmailNotificationDeserializer(item["governanceEmailNotification"]),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : governanceAssignmentAdditionalDataDeserializer(item["additionalData"]),
  };
}

/** The ETA (estimated time of arrival) for remediation */
export interface RemediationEta {
  /** ETA for remediation. */
  eta: Date;
  /** Justification for change of Eta. */
  justification: string;
}

export function remediationEtaSerializer(item: RemediationEta): any {
  return { eta: item["eta"].toISOString(), justification: item["justification"] };
}

export function remediationEtaDeserializer(item: any): RemediationEta {
  return {
    eta: new Date(item["eta"]),
    justification: item["justification"],
  };
}

/** The governance email weekly notification configuration. */
export interface GovernanceEmailNotification {
  /** Exclude manager from weekly email notification. */
  disableManagerEmailNotification?: boolean;
  /** Exclude  owner from weekly email notification. */
  disableOwnerEmailNotification?: boolean;
}

export function governanceEmailNotificationSerializer(item: GovernanceEmailNotification): any {
  return {
    disableManagerEmailNotification: item["disableManagerEmailNotification"],
    disableOwnerEmailNotification: item["disableOwnerEmailNotification"],
  };
}

export function governanceEmailNotificationDeserializer(item: any): GovernanceEmailNotification {
  return {
    disableManagerEmailNotification: item["disableManagerEmailNotification"],
    disableOwnerEmailNotification: item["disableOwnerEmailNotification"],
  };
}

/** Describe the additional data of governance assignment - optional */
export interface GovernanceAssignmentAdditionalData {
  /** Ticket number associated with this governance assignment */
  ticketNumber?: number;
  /** Ticket link associated with this governance assignment - for example: https://snow.com */
  ticketLink?: string;
  /** The ticket status associated with this governance assignment - for example: Active */
  ticketStatus?: string;
}

export function governanceAssignmentAdditionalDataSerializer(
  item: GovernanceAssignmentAdditionalData,
): any {
  return {
    ticketNumber: item["ticketNumber"],
    ticketLink: item["ticketLink"],
    ticketStatus: item["ticketStatus"],
  };
}

export function governanceAssignmentAdditionalDataDeserializer(
  item: any,
): GovernanceAssignmentAdditionalData {
  return {
    ticketNumber: item["ticketNumber"],
    ticketLink: item["ticketLink"],
    ticketStatus: item["ticketStatus"],
  };
}

/** Page of a governance assignments list */
export interface _GovernanceAssignmentsList {
  /** Collection of governance assignments in this page */
  readonly value?: GovernanceAssignment[];
  /** The URI to fetch the next page */
  nextLink?: string;
}

export function _governanceAssignmentsListDeserializer(item: any): _GovernanceAssignmentsList {
  return {
    value: !item["value"] ? item["value"] : governanceAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function governanceAssignmentArraySerializer(result: Array<GovernanceAssignment>): any[] {
  return result.map((item) => {
    return governanceAssignmentSerializer(item);
  });
}

export function governanceAssignmentArrayDeserializer(result: Array<GovernanceAssignment>): any[] {
  return result.map((item) => {
    return governanceAssignmentDeserializer(item);
  });
}

/** Governance rule over a given scope */
export interface GovernanceRule extends ExtensionResource {
  /** The tenantId (GUID) */
  readonly tenantId?: string;
  /** Display name of the governance rule */
  displayName?: string;
  /** Description of the governance rule */
  description?: string;
  /** Governance rule remediation timeframe - this is the time that will affect on the grace-period duration e.g. 7.00:00:00 - means 7 days */
  remediationTimeframe?: string;
  /** Defines whether there is a grace period on the governance rule */
  isGracePeriod?: boolean;
  /** The governance rule priority, priority to the lower number. Rules with the same priority on the same scope will not be allowed */
  rulePriority?: number;
  /** Defines whether the rule is active/inactive */
  isDisabled?: boolean;
  /** The rule type of the governance rule, defines the source of the rule e.g. Integrated */
  ruleType?: GovernanceRuleType;
  /** The governance rule source, what the rule affects, e.g. Assessments */
  sourceResourceType?: GovernanceRuleSourceResourceType;
  /** Excluded scopes, filter out the descendants of the scope (on management scopes) */
  excludedScopes?: string[];
  /** The governance rule conditionSets - see examples */
  conditionSets?: any[];
  /** Defines whether the rule is management scope rule (master connector as a single scope or management scope) */
  includeMemberScopes?: boolean;
  /** The owner source for the governance rule - e.g. Manually by user@contoso.com - see example */
  ownerSource?: GovernanceRuleOwnerSource;
  /** The email notifications settings for the governance rule, states whether to disable notifications for mangers and owners */
  governanceEmailNotification?: GovernanceRuleEmailNotification;
  /** The governance rule metadata */
  metadata?: GovernanceRuleMetadata;
}

export function governanceRuleSerializer(item: GovernanceRule): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "description",
      "remediationTimeframe",
      "isGracePeriod",
      "rulePriority",
      "isDisabled",
      "ruleType",
      "sourceResourceType",
      "excludedScopes",
      "conditionSets",
      "includeMemberScopes",
      "ownerSource",
      "governanceEmailNotification",
      "metadata",
    ])
      ? undefined
      : _governanceRulePropertiesSerializer(item),
  };
}

export function governanceRuleDeserializer(item: any): GovernanceRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _governanceRulePropertiesDeserializer(item["properties"])),
  };
}

/** Describes properties of an governance rule */
export interface GovernanceRuleProperties {
  /** The tenantId (GUID) */
  readonly tenantId?: string;
  /** Display name of the governance rule */
  displayName: string;
  /** Description of the governance rule */
  description?: string;
  /** Governance rule remediation timeframe - this is the time that will affect on the grace-period duration e.g. 7.00:00:00 - means 7 days */
  remediationTimeframe?: string;
  /** Defines whether there is a grace period on the governance rule */
  isGracePeriod?: boolean;
  /** The governance rule priority, priority to the lower number. Rules with the same priority on the same scope will not be allowed */
  rulePriority: number;
  /** Defines whether the rule is active/inactive */
  isDisabled?: boolean;
  /** The rule type of the governance rule, defines the source of the rule e.g. Integrated */
  ruleType: GovernanceRuleType;
  /** The governance rule source, what the rule affects, e.g. Assessments */
  sourceResourceType: GovernanceRuleSourceResourceType;
  /** Excluded scopes, filter out the descendants of the scope (on management scopes) */
  excludedScopes?: string[];
  /** The governance rule conditionSets - see examples */
  conditionSets: any[];
  /** Defines whether the rule is management scope rule (master connector as a single scope or management scope) */
  includeMemberScopes?: boolean;
  /** The owner source for the governance rule - e.g. Manually by user@contoso.com - see example */
  ownerSource: GovernanceRuleOwnerSource;
  /** The email notifications settings for the governance rule, states whether to disable notifications for mangers and owners */
  governanceEmailNotification?: GovernanceRuleEmailNotification;
  /** The governance rule metadata */
  metadata?: GovernanceRuleMetadata;
}

export function governanceRulePropertiesSerializer(item: GovernanceRuleProperties): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    remediationTimeframe: item["remediationTimeframe"],
    isGracePeriod: item["isGracePeriod"],
    rulePriority: item["rulePriority"],
    isDisabled: item["isDisabled"],
    ruleType: item["ruleType"],
    sourceResourceType: item["sourceResourceType"],
    excludedScopes: !item["excludedScopes"]
      ? item["excludedScopes"]
      : item["excludedScopes"].map((p: any) => {
          return p;
        }),
    conditionSets: item["conditionSets"].map((p: any) => {
      return p;
    }),
    includeMemberScopes: item["includeMemberScopes"],
    ownerSource: governanceRuleOwnerSourceSerializer(item["ownerSource"]),
    governanceEmailNotification: !item["governanceEmailNotification"]
      ? item["governanceEmailNotification"]
      : governanceRuleEmailNotificationSerializer(item["governanceEmailNotification"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : governanceRuleMetadataSerializer(item["metadata"]),
  };
}

export function governanceRulePropertiesDeserializer(item: any): GovernanceRuleProperties {
  return {
    tenantId: item["tenantId"],
    displayName: item["displayName"],
    description: item["description"],
    remediationTimeframe: item["remediationTimeframe"],
    isGracePeriod: item["isGracePeriod"],
    rulePriority: item["rulePriority"],
    isDisabled: item["isDisabled"],
    ruleType: item["ruleType"],
    sourceResourceType: item["sourceResourceType"],
    excludedScopes: !item["excludedScopes"]
      ? item["excludedScopes"]
      : item["excludedScopes"].map((p: any) => {
          return p;
        }),
    conditionSets: item["conditionSets"].map((p: any) => {
      return p;
    }),
    includeMemberScopes: item["includeMemberScopes"],
    ownerSource: governanceRuleOwnerSourceDeserializer(item["ownerSource"]),
    governanceEmailNotification: !item["governanceEmailNotification"]
      ? item["governanceEmailNotification"]
      : governanceRuleEmailNotificationDeserializer(item["governanceEmailNotification"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : governanceRuleMetadataDeserializer(item["metadata"]),
  };
}

/** The rule type of the governance rule, defines the source of the rule e.g. Integrated */
export enum KnownGovernanceRuleType {
  /** The source of the rule type definition is integrated */
  Integrated = "Integrated",
  /** The source of the rule type definition is ServiceNow */
  ServiceNow = "ServiceNow",
}

/**
 * The rule type of the governance rule, defines the source of the rule e.g. Integrated \
 * {@link KnownGovernanceRuleType} can be used interchangeably with GovernanceRuleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Integrated**: The source of the rule type definition is integrated \
 * **ServiceNow**: The source of the rule type definition is ServiceNow
 */
export type GovernanceRuleType = string;

/** The governance rule source, what the rule affects, e.g. Assessments */
export enum KnownGovernanceRuleSourceResourceType {
  /** The source of the governance rule is assessments */
  Assessments = "Assessments",
}

/**
 * The governance rule source, what the rule affects, e.g. Assessments \
 * {@link KnownGovernanceRuleSourceResourceType} can be used interchangeably with GovernanceRuleSourceResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Assessments**: The source of the governance rule is assessments
 */
export type GovernanceRuleSourceResourceType = string;

/** Describe the owner source of governance rule */
export interface GovernanceRuleOwnerSource {
  /** The owner type for the governance rule owner source */
  type?: GovernanceRuleOwnerSourceType;
  /** The source value e.g. tag key like owner name or email address */
  value?: string;
}

export function governanceRuleOwnerSourceSerializer(item: GovernanceRuleOwnerSource): any {
  return { type: item["type"], value: item["value"] };
}

export function governanceRuleOwnerSourceDeserializer(item: any): GovernanceRuleOwnerSource {
  return {
    type: item["type"],
    value: item["value"],
  };
}

/** The owner type for the governance rule owner source */
export enum KnownGovernanceRuleOwnerSourceType {
  /** The rule source type defined using resource tag */
  ByTag = "ByTag",
  /** The rule source type defined manually */
  Manually = "Manually",
}

/**
 * The owner type for the governance rule owner source \
 * {@link KnownGovernanceRuleOwnerSourceType} can be used interchangeably with GovernanceRuleOwnerSourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ByTag**: The rule source type defined using resource tag \
 * **Manually**: The rule source type defined manually
 */
export type GovernanceRuleOwnerSourceType = string;

/** The governance email weekly notification configuration */
export interface GovernanceRuleEmailNotification {
  /** Defines whether manager email notifications are disabled */
  disableManagerEmailNotification?: boolean;
  /** Defines whether owner email notifications are disabled */
  disableOwnerEmailNotification?: boolean;
}

export function governanceRuleEmailNotificationSerializer(
  item: GovernanceRuleEmailNotification,
): any {
  return {
    disableManagerEmailNotification: item["disableManagerEmailNotification"],
    disableOwnerEmailNotification: item["disableOwnerEmailNotification"],
  };
}

export function governanceRuleEmailNotificationDeserializer(
  item: any,
): GovernanceRuleEmailNotification {
  return {
    disableManagerEmailNotification: item["disableManagerEmailNotification"],
    disableOwnerEmailNotification: item["disableOwnerEmailNotification"],
  };
}

/** The governance rule metadata */
export interface GovernanceRuleMetadata {
  /** Governance rule Created by object id (GUID) */
  readonly createdBy?: string;
  /** Governance rule creation date */
  readonly createdOn?: Date;
  /** Governance rule last updated by object id (GUID) */
  readonly updatedBy?: string;
  /** Governance rule last update date */
  readonly updatedOn?: Date;
}

export function governanceRuleMetadataSerializer(_item: GovernanceRuleMetadata): any {
  return {};
}

export function governanceRuleMetadataDeserializer(item: any): GovernanceRuleMetadata {
  return {
    createdBy: item["createdBy"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    updatedBy: item["updatedBy"],
    updatedOn: !item["updatedOn"] ? item["updatedOn"] : new Date(item["updatedOn"]),
  };
}

/** Page of a governance rules list */
export interface _GovernanceRuleList {
  /** Collection of governance rules in this page */
  readonly value?: GovernanceRule[];
  /** The URI to fetch the next page */
  nextLink?: string;
}

export function _governanceRuleListDeserializer(item: any): _GovernanceRuleList {
  return {
    value: !item["value"] ? item["value"] : governanceRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function governanceRuleArraySerializer(result: Array<GovernanceRule>): any[] {
  return result.map((item) => {
    return governanceRuleSerializer(item);
  });
}

export function governanceRuleArrayDeserializer(result: Array<GovernanceRule>): any[] {
  return result.map((item) => {
    return governanceRuleDeserializer(item);
  });
}

/** Governance rule execution parameters */
export interface ExecuteGovernanceRuleParams {
  /** Describe if governance rule should be override */
  override?: boolean;
}

export function executeGovernanceRuleParamsSerializer(item: ExecuteGovernanceRuleParams): any {
  return { override: item["override"] };
}

/** Long run operation status of governance rule over a given scope */
export interface OperationResult {
  /** The status of the long run operation result of governance rule */
  readonly status?: OperationResultStatus;
}

export function operationResultDeserializer(item: any): OperationResult {
  return {
    status: item["status"],
  };
}

/** The status of the long run operation result of governance rule */
export enum KnownOperationResultStatus {
  /** The operation succeeded */
  Succeeded = "Succeeded",
  /** The operation failed */
  Failed = "Failed",
  /** The operation canceled */
  Canceled = "Canceled",
}

/**
 * The status of the long run operation result of governance rule \
 * {@link KnownOperationResultStatus} can be used interchangeably with OperationResultStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The operation succeeded \
 * **Failed**: The operation failed \
 * **Canceled**: The operation canceled
 */
export type OperationResultStatus = string;

export function _governanceAssignmentPropertiesSerializer(item: GovernanceAssignment): any {
  return {
    owner: item["owner"],
    remediationDueDate: !item["remediationDueDate"]
      ? item["remediationDueDate"]
      : item["remediationDueDate"].toISOString(),
    remediationEta: !item["remediationEta"]
      ? item["remediationEta"]
      : remediationEtaSerializer(item["remediationEta"]),
    isGracePeriod: item["isGracePeriod"],
    governanceEmailNotification: !item["governanceEmailNotification"]
      ? item["governanceEmailNotification"]
      : governanceEmailNotificationSerializer(item["governanceEmailNotification"]),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : governanceAssignmentAdditionalDataSerializer(item["additionalData"]),
  };
}

export function _governanceAssignmentPropertiesDeserializer(item: any) {
  return {
    owner: item["owner"],
    remediationDueDate: !item["remediationDueDate"]
      ? item["remediationDueDate"]
      : new Date(item["remediationDueDate"]),
    remediationEta: !item["remediationEta"]
      ? item["remediationEta"]
      : remediationEtaDeserializer(item["remediationEta"]),
    isGracePeriod: item["isGracePeriod"],
    governanceEmailNotification: !item["governanceEmailNotification"]
      ? item["governanceEmailNotification"]
      : governanceEmailNotificationDeserializer(item["governanceEmailNotification"]),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : governanceAssignmentAdditionalDataDeserializer(item["additionalData"]),
  };
}

export function _governanceRulePropertiesSerializer(item: GovernanceRule): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    remediationTimeframe: item["remediationTimeframe"],
    isGracePeriod: item["isGracePeriod"],
    rulePriority: item["rulePriority"],
    isDisabled: item["isDisabled"],
    ruleType: item["ruleType"],
    sourceResourceType: item["sourceResourceType"],
    excludedScopes: !item["excludedScopes"]
      ? item["excludedScopes"]
      : item["excludedScopes"].map((p: any) => {
          return p;
        }),
    conditionSets: !item["conditionSets"]
      ? item["conditionSets"]
      : item["conditionSets"].map((p: any) => {
          return p;
        }),
    includeMemberScopes: item["includeMemberScopes"],
    ownerSource: !item["ownerSource"]
      ? item["ownerSource"]
      : governanceRuleOwnerSourceSerializer(item["ownerSource"]),
    governanceEmailNotification: !item["governanceEmailNotification"]
      ? item["governanceEmailNotification"]
      : governanceRuleEmailNotificationSerializer(item["governanceEmailNotification"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : governanceRuleMetadataSerializer(item["metadata"]),
  };
}

export function _governanceRulePropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    displayName: item["displayName"],
    description: item["description"],
    remediationTimeframe: item["remediationTimeframe"],
    isGracePeriod: item["isGracePeriod"],
    rulePriority: item["rulePriority"],
    isDisabled: item["isDisabled"],
    ruleType: item["ruleType"],
    sourceResourceType: item["sourceResourceType"],
    excludedScopes: !item["excludedScopes"]
      ? item["excludedScopes"]
      : item["excludedScopes"].map((p: any) => {
          return p;
        }),
    conditionSets: !item["conditionSets"]
      ? item["conditionSets"]
      : item["conditionSets"].map((p: any) => {
          return p;
        }),
    includeMemberScopes: item["includeMemberScopes"],
    ownerSource: !item["ownerSource"]
      ? item["ownerSource"]
      : governanceRuleOwnerSourceDeserializer(item["ownerSource"]),
    governanceEmailNotification: !item["governanceEmailNotification"]
      ? item["governanceEmailNotification"]
      : governanceRuleEmailNotificationDeserializer(item["governanceEmailNotification"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : governanceRuleMetadataDeserializer(item["metadata"]),
  };
}
