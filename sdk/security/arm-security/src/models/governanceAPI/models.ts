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
export interface GovernanceAPIGovernanceAssignment extends ExtensionResource {
  /** The Owner for the governance assignment - e.g. user@contoso.com - see example */
  owner?: string;
  /** The remediation due-date - after this date Secure Score will be affected (in case of  active grace-period) */
  remediationDueDate?: Date;
  /** The ETA (estimated time of arrival) for remediation (optional), see example */
  remediationEta?: GovernanceAPIRemediationEta;
  /** Defines whether there is a grace period on the governance assignment */
  isGracePeriod?: boolean;
  /** The email notifications settings for the governance rule, states whether to disable notifications for mangers and owners */
  governanceEmailNotification?: GovernanceAPIGovernanceEmailNotification;
  /** The additional data for the governance assignment - e.g. links to ticket (optional), see example */
  additionalData?: GovernanceAPIGovernanceAssignmentAdditionalData;
}

export function governanceAPIGovernanceAssignmentSerializer(
  item: GovernanceAPIGovernanceAssignment,
): any {
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

export function governanceAPIGovernanceAssignmentDeserializer(
  item: any,
): GovernanceAPIGovernanceAssignment {
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
export interface GovernanceAPIGovernanceAssignmentProperties {
  /** The Owner for the governance assignment - e.g. user@contoso.com - see example */
  owner?: string;
  /** The remediation due-date - after this date Secure Score will be affected (in case of  active grace-period) */
  remediationDueDate: Date;
  /** The ETA (estimated time of arrival) for remediation (optional), see example */
  remediationEta?: GovernanceAPIRemediationEta;
  /** Defines whether there is a grace period on the governance assignment */
  isGracePeriod?: boolean;
  /** The email notifications settings for the governance rule, states whether to disable notifications for mangers and owners */
  governanceEmailNotification?: GovernanceAPIGovernanceEmailNotification;
  /** The additional data for the governance assignment - e.g. links to ticket (optional), see example */
  additionalData?: GovernanceAPIGovernanceAssignmentAdditionalData;
}

export function governanceAPIGovernanceAssignmentPropertiesSerializer(
  item: GovernanceAPIGovernanceAssignmentProperties,
): any {
  return {
    owner: item["owner"],
    remediationDueDate: item["remediationDueDate"].toISOString(),
    remediationEta: !item["remediationEta"]
      ? item["remediationEta"]
      : governanceAPIRemediationEtaSerializer(item["remediationEta"]),
    isGracePeriod: item["isGracePeriod"],
    governanceEmailNotification: !item["governanceEmailNotification"]
      ? item["governanceEmailNotification"]
      : governanceAPIGovernanceEmailNotificationSerializer(item["governanceEmailNotification"]),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : governanceAPIGovernanceAssignmentAdditionalDataSerializer(item["additionalData"]),
  };
}

export function governanceAPIGovernanceAssignmentPropertiesDeserializer(
  item: any,
): GovernanceAPIGovernanceAssignmentProperties {
  return {
    owner: item["owner"],
    remediationDueDate: new Date(item["remediationDueDate"]),
    remediationEta: !item["remediationEta"]
      ? item["remediationEta"]
      : governanceAPIRemediationEtaDeserializer(item["remediationEta"]),
    isGracePeriod: item["isGracePeriod"],
    governanceEmailNotification: !item["governanceEmailNotification"]
      ? item["governanceEmailNotification"]
      : governanceAPIGovernanceEmailNotificationDeserializer(item["governanceEmailNotification"]),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : governanceAPIGovernanceAssignmentAdditionalDataDeserializer(item["additionalData"]),
  };
}

/** The ETA (estimated time of arrival) for remediation */
export interface GovernanceAPIRemediationEta {
  /** ETA for remediation. */
  eta: Date;
  /** Justification for change of Eta. */
  justification: string;
}

export function governanceAPIRemediationEtaSerializer(item: GovernanceAPIRemediationEta): any {
  return { eta: item["eta"].toISOString(), justification: item["justification"] };
}

export function governanceAPIRemediationEtaDeserializer(item: any): GovernanceAPIRemediationEta {
  return {
    eta: new Date(item["eta"]),
    justification: item["justification"],
  };
}

/** The governance email weekly notification configuration. */
export interface GovernanceAPIGovernanceEmailNotification {
  /** Exclude manager from weekly email notification. */
  disableManagerEmailNotification?: boolean;
  /** Exclude  owner from weekly email notification. */
  disableOwnerEmailNotification?: boolean;
}

export function governanceAPIGovernanceEmailNotificationSerializer(
  item: GovernanceAPIGovernanceEmailNotification,
): any {
  return {
    disableManagerEmailNotification: item["disableManagerEmailNotification"],
    disableOwnerEmailNotification: item["disableOwnerEmailNotification"],
  };
}

export function governanceAPIGovernanceEmailNotificationDeserializer(
  item: any,
): GovernanceAPIGovernanceEmailNotification {
  return {
    disableManagerEmailNotification: item["disableManagerEmailNotification"],
    disableOwnerEmailNotification: item["disableOwnerEmailNotification"],
  };
}

/** Describe the additional data of governance assignment - optional */
export interface GovernanceAPIGovernanceAssignmentAdditionalData {
  /** Ticket number associated with this governance assignment */
  ticketNumber?: number;
  /** Ticket link associated with this governance assignment - for example: https://snow.com */
  ticketLink?: string;
  /** The ticket status associated with this governance assignment - for example: Active */
  ticketStatus?: string;
}

export function governanceAPIGovernanceAssignmentAdditionalDataSerializer(
  item: GovernanceAPIGovernanceAssignmentAdditionalData,
): any {
  return {
    ticketNumber: item["ticketNumber"],
    ticketLink: item["ticketLink"],
    ticketStatus: item["ticketStatus"],
  };
}

export function governanceAPIGovernanceAssignmentAdditionalDataDeserializer(
  item: any,
): GovernanceAPIGovernanceAssignmentAdditionalData {
  return {
    ticketNumber: item["ticketNumber"],
    ticketLink: item["ticketLink"],
    ticketStatus: item["ticketStatus"],
  };
}

/** Page of a governance assignments list */
export interface _GovernanceAPIGovernanceAssignmentsList {
  /** Collection of governance assignments in this page */
  readonly value?: GovernanceAPIGovernanceAssignment[];
  /** The URI to fetch the next page */
  nextLink?: string;
}

export function _governanceAPIGovernanceAssignmentsListDeserializer(
  item: any,
): _GovernanceAPIGovernanceAssignmentsList {
  return {
    value: !item["value"]
      ? item["value"]
      : governanceAPIGovernanceAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function governanceAPIGovernanceAssignmentArraySerializer(
  result: Array<GovernanceAPIGovernanceAssignment>,
): any[] {
  return result.map((item) => {
    return governanceAPIGovernanceAssignmentSerializer(item);
  });
}

export function governanceAPIGovernanceAssignmentArrayDeserializer(
  result: Array<GovernanceAPIGovernanceAssignment>,
): any[] {
  return result.map((item) => {
    return governanceAPIGovernanceAssignmentDeserializer(item);
  });
}

/** Governance rule over a given scope */
export interface GovernanceAPIGovernanceRule extends ExtensionResource {
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
  ruleType?: GovernanceAPIGovernanceRuleType;
  /** The governance rule source, what the rule affects, e.g. Assessments */
  sourceResourceType?: GovernanceAPIGovernanceRuleSourceResourceType;
  /** Excluded scopes, filter out the descendants of the scope (on management scopes) */
  excludedScopes?: string[];
  /** The governance rule conditionSets - see examples */
  conditionSets?: any[];
  /** Defines whether the rule is management scope rule (master connector as a single scope or management scope) */
  includeMemberScopes?: boolean;
  /** The owner source for the governance rule - e.g. Manually by user@contoso.com - see example */
  ownerSource?: GovernanceAPIGovernanceRuleOwnerSource;
  /** The email notifications settings for the governance rule, states whether to disable notifications for mangers and owners */
  governanceEmailNotification?: GovernanceAPIGovernanceRuleEmailNotification;
  /** The governance rule metadata */
  metadata?: GovernanceAPIGovernanceRuleMetadata;
}

export function governanceAPIGovernanceRuleSerializer(item: GovernanceAPIGovernanceRule): any {
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

export function governanceAPIGovernanceRuleDeserializer(item: any): GovernanceAPIGovernanceRule {
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
export interface GovernanceAPIGovernanceRuleProperties {
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
  ruleType: GovernanceAPIGovernanceRuleType;
  /** The governance rule source, what the rule affects, e.g. Assessments */
  sourceResourceType: GovernanceAPIGovernanceRuleSourceResourceType;
  /** Excluded scopes, filter out the descendants of the scope (on management scopes) */
  excludedScopes?: string[];
  /** The governance rule conditionSets - see examples */
  conditionSets: any[];
  /** Defines whether the rule is management scope rule (master connector as a single scope or management scope) */
  includeMemberScopes?: boolean;
  /** The owner source for the governance rule - e.g. Manually by user@contoso.com - see example */
  ownerSource: GovernanceAPIGovernanceRuleOwnerSource;
  /** The email notifications settings for the governance rule, states whether to disable notifications for mangers and owners */
  governanceEmailNotification?: GovernanceAPIGovernanceRuleEmailNotification;
  /** The governance rule metadata */
  metadata?: GovernanceAPIGovernanceRuleMetadata;
}

export function governanceAPIGovernanceRulePropertiesSerializer(
  item: GovernanceAPIGovernanceRuleProperties,
): any {
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
    ownerSource: governanceAPIGovernanceRuleOwnerSourceSerializer(item["ownerSource"]),
    governanceEmailNotification: !item["governanceEmailNotification"]
      ? item["governanceEmailNotification"]
      : governanceAPIGovernanceRuleEmailNotificationSerializer(item["governanceEmailNotification"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : governanceAPIGovernanceRuleMetadataSerializer(item["metadata"]),
  };
}

export function governanceAPIGovernanceRulePropertiesDeserializer(
  item: any,
): GovernanceAPIGovernanceRuleProperties {
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
    ownerSource: governanceAPIGovernanceRuleOwnerSourceDeserializer(item["ownerSource"]),
    governanceEmailNotification: !item["governanceEmailNotification"]
      ? item["governanceEmailNotification"]
      : governanceAPIGovernanceRuleEmailNotificationDeserializer(
          item["governanceEmailNotification"],
        ),
    metadata: !item["metadata"]
      ? item["metadata"]
      : governanceAPIGovernanceRuleMetadataDeserializer(item["metadata"]),
  };
}

/** The rule type of the governance rule, defines the source of the rule e.g. Integrated */
export enum KnownGovernanceAPIGovernanceRuleType {
  /** The source of the rule type definition is integrated */
  Integrated = "Integrated",
  /** The source of the rule type definition is ServiceNow */
  ServiceNow = "ServiceNow",
}

/**
 * The rule type of the governance rule, defines the source of the rule e.g. Integrated \
 * {@link KnownGovernanceAPIGovernanceRuleType} can be used interchangeably with GovernanceAPIGovernanceRuleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Integrated**: The source of the rule type definition is integrated \
 * **ServiceNow**: The source of the rule type definition is ServiceNow
 */
export type GovernanceAPIGovernanceRuleType = string;

/** The governance rule source, what the rule affects, e.g. Assessments */
export enum KnownGovernanceAPIGovernanceRuleSourceResourceType {
  /** The source of the governance rule is assessments */
  Assessments = "Assessments",
}

/**
 * The governance rule source, what the rule affects, e.g. Assessments \
 * {@link KnownGovernanceAPIGovernanceRuleSourceResourceType} can be used interchangeably with GovernanceAPIGovernanceRuleSourceResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Assessments**: The source of the governance rule is assessments
 */
export type GovernanceAPIGovernanceRuleSourceResourceType = string;

/** Describe the owner source of governance rule */
export interface GovernanceAPIGovernanceRuleOwnerSource {
  /** The owner type for the governance rule owner source */
  type?: GovernanceAPIGovernanceRuleOwnerSourceType;
  /** The source value e.g. tag key like owner name or email address */
  value?: string;
}

export function governanceAPIGovernanceRuleOwnerSourceSerializer(
  item: GovernanceAPIGovernanceRuleOwnerSource,
): any {
  return { type: item["type"], value: item["value"] };
}

export function governanceAPIGovernanceRuleOwnerSourceDeserializer(
  item: any,
): GovernanceAPIGovernanceRuleOwnerSource {
  return {
    type: item["type"],
    value: item["value"],
  };
}

/** The owner type for the governance rule owner source */
export enum KnownGovernanceAPIGovernanceRuleOwnerSourceType {
  /** The rule source type defined using resource tag */
  ByTag = "ByTag",
  /** The rule source type defined manually */
  Manually = "Manually",
}

/**
 * The owner type for the governance rule owner source \
 * {@link KnownGovernanceAPIGovernanceRuleOwnerSourceType} can be used interchangeably with GovernanceAPIGovernanceRuleOwnerSourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ByTag**: The rule source type defined using resource tag \
 * **Manually**: The rule source type defined manually
 */
export type GovernanceAPIGovernanceRuleOwnerSourceType = string;

/** The governance email weekly notification configuration */
export interface GovernanceAPIGovernanceRuleEmailNotification {
  /** Defines whether manager email notifications are disabled */
  disableManagerEmailNotification?: boolean;
  /** Defines whether owner email notifications are disabled */
  disableOwnerEmailNotification?: boolean;
}

export function governanceAPIGovernanceRuleEmailNotificationSerializer(
  item: GovernanceAPIGovernanceRuleEmailNotification,
): any {
  return {
    disableManagerEmailNotification: item["disableManagerEmailNotification"],
    disableOwnerEmailNotification: item["disableOwnerEmailNotification"],
  };
}

export function governanceAPIGovernanceRuleEmailNotificationDeserializer(
  item: any,
): GovernanceAPIGovernanceRuleEmailNotification {
  return {
    disableManagerEmailNotification: item["disableManagerEmailNotification"],
    disableOwnerEmailNotification: item["disableOwnerEmailNotification"],
  };
}

/** The governance rule metadata */
export interface GovernanceAPIGovernanceRuleMetadata {
  /** Governance rule Created by object id (GUID) */
  readonly createdBy?: string;
  /** Governance rule creation date */
  readonly createdOn?: Date;
  /** Governance rule last updated by object id (GUID) */
  readonly updatedBy?: string;
  /** Governance rule last update date */
  readonly updatedOn?: Date;
}

export function governanceAPIGovernanceRuleMetadataSerializer(
  _item: GovernanceAPIGovernanceRuleMetadata,
): any {
  return {};
}

export function governanceAPIGovernanceRuleMetadataDeserializer(
  item: any,
): GovernanceAPIGovernanceRuleMetadata {
  return {
    createdBy: item["createdBy"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    updatedBy: item["updatedBy"],
    updatedOn: !item["updatedOn"] ? item["updatedOn"] : new Date(item["updatedOn"]),
  };
}

/** Page of a governance rules list */
export interface _GovernanceAPIGovernanceRuleList {
  /** Collection of governance rules in this page */
  readonly value?: GovernanceAPIGovernanceRule[];
  /** The URI to fetch the next page */
  nextLink?: string;
}

export function _governanceAPIGovernanceRuleListDeserializer(
  item: any,
): _GovernanceAPIGovernanceRuleList {
  return {
    value: !item["value"]
      ? item["value"]
      : governanceAPIGovernanceRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function governanceAPIGovernanceRuleArraySerializer(
  result: Array<GovernanceAPIGovernanceRule>,
): any[] {
  return result.map((item) => {
    return governanceAPIGovernanceRuleSerializer(item);
  });
}

export function governanceAPIGovernanceRuleArrayDeserializer(
  result: Array<GovernanceAPIGovernanceRule>,
): any[] {
  return result.map((item) => {
    return governanceAPIGovernanceRuleDeserializer(item);
  });
}

/** Governance rule execution parameters */
export interface GovernanceAPIExecuteGovernanceRuleParams {
  /** Describe if governance rule should be override */
  override?: boolean;
}

export function governanceAPIExecuteGovernanceRuleParamsSerializer(
  item: GovernanceAPIExecuteGovernanceRuleParams,
): any {
  return { override: item["override"] };
}

/** Long run operation status of governance rule over a given scope */
export interface GovernanceAPIOperationResult {
  /** The status of the long run operation result of governance rule */
  readonly status?: GovernanceAPIOperationResultStatus;
}

export function governanceAPIOperationResultDeserializer(item: any): GovernanceAPIOperationResult {
  return {
    status: item["status"],
  };
}

/** The status of the long run operation result of governance rule */
export enum KnownGovernanceAPIOperationResultStatus {
  /** The operation succeeded */
  Succeeded = "Succeeded",
  /** The operation failed */
  Failed = "Failed",
  /** The operation canceled */
  Canceled = "Canceled",
}

/**
 * The status of the long run operation result of governance rule \
 * {@link KnownGovernanceAPIOperationResultStatus} can be used interchangeably with GovernanceAPIOperationResultStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The operation succeeded \
 * **Failed**: The operation failed \
 * **Canceled**: The operation canceled
 */
export type GovernanceAPIOperationResultStatus = string;

export function _governanceAssignmentPropertiesSerializer(
  item: GovernanceAPIGovernanceAssignment,
): any {
  return {
    owner: item["owner"],
    remediationDueDate: !item["remediationDueDate"]
      ? item["remediationDueDate"]
      : item["remediationDueDate"].toISOString(),
    remediationEta: !item["remediationEta"]
      ? item["remediationEta"]
      : governanceAPIRemediationEtaSerializer(item["remediationEta"]),
    isGracePeriod: item["isGracePeriod"],
    governanceEmailNotification: !item["governanceEmailNotification"]
      ? item["governanceEmailNotification"]
      : governanceAPIGovernanceEmailNotificationSerializer(item["governanceEmailNotification"]),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : governanceAPIGovernanceAssignmentAdditionalDataSerializer(item["additionalData"]),
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
      : governanceAPIRemediationEtaDeserializer(item["remediationEta"]),
    isGracePeriod: item["isGracePeriod"],
    governanceEmailNotification: !item["governanceEmailNotification"]
      ? item["governanceEmailNotification"]
      : governanceAPIGovernanceEmailNotificationDeserializer(item["governanceEmailNotification"]),
    additionalData: !item["additionalData"]
      ? item["additionalData"]
      : governanceAPIGovernanceAssignmentAdditionalDataDeserializer(item["additionalData"]),
  };
}

export function _governanceRulePropertiesSerializer(item: GovernanceAPIGovernanceRule): any {
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
      : governanceAPIGovernanceRuleOwnerSourceSerializer(item["ownerSource"]),
    governanceEmailNotification: !item["governanceEmailNotification"]
      ? item["governanceEmailNotification"]
      : governanceAPIGovernanceRuleEmailNotificationSerializer(item["governanceEmailNotification"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : governanceAPIGovernanceRuleMetadataSerializer(item["metadata"]),
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
      : governanceAPIGovernanceRuleOwnerSourceDeserializer(item["ownerSource"]),
    governanceEmailNotification: !item["governanceEmailNotification"]
      ? item["governanceEmailNotification"]
      : governanceAPIGovernanceRuleEmailNotificationDeserializer(
          item["governanceEmailNotification"],
        ),
    metadata: !item["metadata"]
      ? item["metadata"]
      : governanceAPIGovernanceRuleMetadataDeserializer(item["metadata"]),
  };
}
