// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { CommonActionType, CommonTags, CommonState } from "../common/models.js";
import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The security automation resource. */
export interface AutomationsAPIAutomation extends ProxyResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Kind of the resource */
  kind?: string;
  /** Entity tag is used for comparing two or more entities from the same requested resource. */
  etag?: string;
  /** The security automation description. */
  description?: string;
  /** Indicates whether the security automation is enabled. */
  isEnabled?: boolean;
  /** A collection of scopes on which the security automations logic is applied. Supported scopes are the subscription itself or a resource group under that subscription. The automation will only apply on defined scopes. */
  scopes?: AutomationsAPIAutomationScope[];
  /** A collection of the source event types which evaluate the security automation set of rules. */
  sources?: AutomationsAPIAutomationSource[];
  /** A collection of the actions which are triggered if all the configured rules evaluations, within at least one rule set, are true. */
  actions?: AutomationsAPIAutomationActionUnion[];
}

export function automationsAPIAutomationSerializer(item: AutomationsAPIAutomation): any {
  return {
    properties: areAllPropsUndefined(item, [
      "description",
      "isEnabled",
      "scopes",
      "sources",
      "actions",
    ])
      ? undefined
      : _automationPropertiesSerializer(item),
    tags: item["tags"],
    location: item["location"],
    kind: item["kind"],
    etag: item["etag"],
  };
}

export function automationsAPIAutomationDeserializer(item: any): AutomationsAPIAutomation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _automationPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    kind: item["kind"],
    etag: item["etag"],
  };
}

/** A set of properties that defines the behavior of the automation configuration. To learn more about the supported security events data models schemas - please visit https://aka.ms/ASCAutomationSchemas. */
export interface AutomationsAPIAutomationProperties {
  /** The security automation description. */
  description?: string;
  /** Indicates whether the security automation is enabled. */
  isEnabled?: boolean;
  /** A collection of scopes on which the security automations logic is applied. Supported scopes are the subscription itself or a resource group under that subscription. The automation will only apply on defined scopes. */
  scopes?: AutomationsAPIAutomationScope[];
  /** A collection of the source event types which evaluate the security automation set of rules. */
  sources?: AutomationsAPIAutomationSource[];
  /** A collection of the actions which are triggered if all the configured rules evaluations, within at least one rule set, are true. */
  actions?: AutomationsAPIAutomationActionUnion[];
}

export function automationsAPIAutomationPropertiesSerializer(
  item: AutomationsAPIAutomationProperties,
): any {
  return {
    description: item["description"],
    isEnabled: item["isEnabled"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : automationsAPIAutomationScopeArraySerializer(item["scopes"]),
    sources: !item["sources"]
      ? item["sources"]
      : automationsAPIAutomationSourceArraySerializer(item["sources"]),
    actions: !item["actions"]
      ? item["actions"]
      : automationsAPIAutomationActionUnionArraySerializer(item["actions"]),
  };
}

export function automationsAPIAutomationPropertiesDeserializer(
  item: any,
): AutomationsAPIAutomationProperties {
  return {
    description: item["description"],
    isEnabled: item["isEnabled"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : automationsAPIAutomationScopeArrayDeserializer(item["scopes"]),
    sources: !item["sources"]
      ? item["sources"]
      : automationsAPIAutomationSourceArrayDeserializer(item["sources"]),
    actions: !item["actions"]
      ? item["actions"]
      : automationsAPIAutomationActionUnionArrayDeserializer(item["actions"]),
  };
}

export function automationsAPIAutomationScopeArraySerializer(
  result: Array<AutomationsAPIAutomationScope>,
): any[] {
  return result.map((item) => {
    return automationsAPIAutomationScopeSerializer(item);
  });
}

export function automationsAPIAutomationScopeArrayDeserializer(
  result: Array<AutomationsAPIAutomationScope>,
): any[] {
  return result.map((item) => {
    return automationsAPIAutomationScopeDeserializer(item);
  });
}

/** A single automation scope. */
export interface AutomationsAPIAutomationScope {
  /** The resources scope description. */
  description?: string;
  /** The resources scope path. Can be the subscription on which the automation is defined on or a resource group under that subscription (fully qualified Azure resource IDs). */
  scopePath?: string;
}

export function automationsAPIAutomationScopeSerializer(item: AutomationsAPIAutomationScope): any {
  return { description: item["description"], scopePath: item["scopePath"] };
}

export function automationsAPIAutomationScopeDeserializer(
  item: any,
): AutomationsAPIAutomationScope {
  return {
    description: item["description"],
    scopePath: item["scopePath"],
  };
}

export function automationsAPIAutomationSourceArraySerializer(
  result: Array<AutomationsAPIAutomationSource>,
): any[] {
  return result.map((item) => {
    return automationsAPIAutomationSourceSerializer(item);
  });
}

export function automationsAPIAutomationSourceArrayDeserializer(
  result: Array<AutomationsAPIAutomationSource>,
): any[] {
  return result.map((item) => {
    return automationsAPIAutomationSourceDeserializer(item);
  });
}

/** The source event types which evaluate the security automation set of rules. For example - security alerts and security assessments. To learn more about the supported security events data models schemas - please visit https://aka.ms/ASCAutomationSchemas. */
export interface AutomationsAPIAutomationSource {
  /** A valid event source type. */
  eventSource?: AutomationsAPIEventSource;
  /** A set of rules which evaluate upon event interception. A logical disjunction is applied between defined rule sets (logical 'or'). */
  ruleSets?: AutomationsAPIAutomationRuleSet[];
}

export function automationsAPIAutomationSourceSerializer(
  item: AutomationsAPIAutomationSource,
): any {
  return {
    eventSource: item["eventSource"],
    ruleSets: !item["ruleSets"]
      ? item["ruleSets"]
      : automationsAPIAutomationRuleSetArraySerializer(item["ruleSets"]),
  };
}

export function automationsAPIAutomationSourceDeserializer(
  item: any,
): AutomationsAPIAutomationSource {
  return {
    eventSource: item["eventSource"],
    ruleSets: !item["ruleSets"]
      ? item["ruleSets"]
      : automationsAPIAutomationRuleSetArrayDeserializer(item["ruleSets"]),
  };
}

/** A valid event source type. */
export enum KnownAutomationsAPIEventSource {
  /** Assessments */
  Assessments = "Assessments",
  /** AssessmentsSnapshot */
  AssessmentsSnapshot = "AssessmentsSnapshot",
  /** SubAssessments */
  SubAssessments = "SubAssessments",
  /** SubAssessmentsSnapshot */
  SubAssessmentsSnapshot = "SubAssessmentsSnapshot",
  /** Alerts */
  Alerts = "Alerts",
  /** SecureScores */
  SecureScores = "SecureScores",
  /** SecureScoresSnapshot */
  SecureScoresSnapshot = "SecureScoresSnapshot",
  /** SecureScoreControls */
  SecureScoreControls = "SecureScoreControls",
  /** SecureScoreControlsSnapshot */
  SecureScoreControlsSnapshot = "SecureScoreControlsSnapshot",
  /** RegulatoryComplianceAssessment */
  RegulatoryComplianceAssessment = "RegulatoryComplianceAssessment",
  /** RegulatoryComplianceAssessmentSnapshot */
  RegulatoryComplianceAssessmentSnapshot = "RegulatoryComplianceAssessmentSnapshot",
  /** AttackPaths */
  AttackPaths = "AttackPaths",
  /** AttackPathsSnapshot */
  AttackPathsSnapshot = "AttackPathsSnapshot",
}

/**
 * A valid event source type. \
 * {@link KnownAutomationsAPIEventSource} can be used interchangeably with AutomationsAPIEventSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Assessments**: Assessments \
 * **AssessmentsSnapshot**: AssessmentsSnapshot \
 * **SubAssessments**: SubAssessments \
 * **SubAssessmentsSnapshot**: SubAssessmentsSnapshot \
 * **Alerts**: Alerts \
 * **SecureScores**: SecureScores \
 * **SecureScoresSnapshot**: SecureScoresSnapshot \
 * **SecureScoreControls**: SecureScoreControls \
 * **SecureScoreControlsSnapshot**: SecureScoreControlsSnapshot \
 * **RegulatoryComplianceAssessment**: RegulatoryComplianceAssessment \
 * **RegulatoryComplianceAssessmentSnapshot**: RegulatoryComplianceAssessmentSnapshot \
 * **AttackPaths**: AttackPaths \
 * **AttackPathsSnapshot**: AttackPathsSnapshot
 */
export type AutomationsAPIEventSource = string;

export function automationsAPIAutomationRuleSetArraySerializer(
  result: Array<AutomationsAPIAutomationRuleSet>,
): any[] {
  return result.map((item) => {
    return automationsAPIAutomationRuleSetSerializer(item);
  });
}

export function automationsAPIAutomationRuleSetArrayDeserializer(
  result: Array<AutomationsAPIAutomationRuleSet>,
): any[] {
  return result.map((item) => {
    return automationsAPIAutomationRuleSetDeserializer(item);
  });
}

/** A rule set which evaluates all its rules upon an event interception. Only when all the included rules in the rule set will be evaluated as 'true', will the event trigger the defined actions. */
export interface AutomationsAPIAutomationRuleSet {
  rules?: AutomationsAPIAutomationTriggeringRule[];
}

export function automationsAPIAutomationRuleSetSerializer(
  item: AutomationsAPIAutomationRuleSet,
): any {
  return {
    rules: !item["rules"]
      ? item["rules"]
      : automationsAPIAutomationTriggeringRuleArraySerializer(item["rules"]),
  };
}

export function automationsAPIAutomationRuleSetDeserializer(
  item: any,
): AutomationsAPIAutomationRuleSet {
  return {
    rules: !item["rules"]
      ? item["rules"]
      : automationsAPIAutomationTriggeringRuleArrayDeserializer(item["rules"]),
  };
}

export function automationsAPIAutomationTriggeringRuleArraySerializer(
  result: Array<AutomationsAPIAutomationTriggeringRule>,
): any[] {
  return result.map((item) => {
    return automationsAPIAutomationTriggeringRuleSerializer(item);
  });
}

export function automationsAPIAutomationTriggeringRuleArrayDeserializer(
  result: Array<AutomationsAPIAutomationTriggeringRule>,
): any[] {
  return result.map((item) => {
    return automationsAPIAutomationTriggeringRuleDeserializer(item);
  });
}

/** A rule which is evaluated upon event interception. The rule is configured by comparing a specific value from the event model to an expected value. This comparison is done by using one of the supported operators set. */
export interface AutomationsAPIAutomationTriggeringRule {
  /** The JPath of the entity model property that should be checked. */
  propertyJPath?: string;
  /** The data type of the compared operands (string, integer, floating point number or a boolean [true/false]] */
  propertyType?: AutomationsAPIPropertyType;
  /** The expected value. */
  expectedValue?: string;
  /** A valid comparer operator to use. A case-insensitive comparison will be applied for String PropertyType. */
  operator?: AutomationsAPIOperator;
}

export function automationsAPIAutomationTriggeringRuleSerializer(
  item: AutomationsAPIAutomationTriggeringRule,
): any {
  return {
    propertyJPath: item["propertyJPath"],
    propertyType: item["propertyType"],
    expectedValue: item["expectedValue"],
    operator: item["operator"],
  };
}

export function automationsAPIAutomationTriggeringRuleDeserializer(
  item: any,
): AutomationsAPIAutomationTriggeringRule {
  return {
    propertyJPath: item["propertyJPath"],
    propertyType: item["propertyType"],
    expectedValue: item["expectedValue"],
    operator: item["operator"],
  };
}

/** The data type of the compared operands (string, integer, floating point number or a boolean [true/false]] */
export enum KnownAutomationsAPIPropertyType {
  /** String */
  String = "String",
  /** Integer */
  Integer = "Integer",
  /** Number */
  Number = "Number",
  /** Boolean */
  Boolean = "Boolean",
}

/**
 * The data type of the compared operands (string, integer, floating point number or a boolean [true/false]] \
 * {@link KnownAutomationsAPIPropertyType} can be used interchangeably with AutomationsAPIPropertyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **String**: String \
 * **Integer**: Integer \
 * **Number**: Number \
 * **Boolean**: Boolean
 */
export type AutomationsAPIPropertyType = string;

/** A valid comparer operator to use. A case-insensitive comparison will be applied for String PropertyType. */
export enum KnownAutomationsAPIOperator {
  /** Applies for decimal and non-decimal operands */
  Equals = "Equals",
  /** Applies only for decimal operands */
  GreaterThan = "GreaterThan",
  /** Applies only for decimal operands */
  GreaterThanOrEqualTo = "GreaterThanOrEqualTo",
  /** Applies only for decimal operands */
  LesserThan = "LesserThan",
  /** Applies only for decimal operands */
  LesserThanOrEqualTo = "LesserThanOrEqualTo",
  /** Applies  for decimal and non-decimal operands */
  NotEquals = "NotEquals",
  /** Applies only for non-decimal operands */
  Contains = "Contains",
  /** Applies only for non-decimal operands */
  StartsWith = "StartsWith",
  /** Applies only for non-decimal operands */
  EndsWith = "EndsWith",
}

/**
 * A valid comparer operator to use. A case-insensitive comparison will be applied for String PropertyType. \
 * {@link KnownAutomationsAPIOperator} can be used interchangeably with AutomationsAPIOperator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Equals**: Applies for decimal and non-decimal operands \
 * **GreaterThan**: Applies only for decimal operands \
 * **GreaterThanOrEqualTo**: Applies only for decimal operands \
 * **LesserThan**: Applies only for decimal operands \
 * **LesserThanOrEqualTo**: Applies only for decimal operands \
 * **NotEquals**: Applies  for decimal and non-decimal operands \
 * **Contains**: Applies only for non-decimal operands \
 * **StartsWith**: Applies only for non-decimal operands \
 * **EndsWith**: Applies only for non-decimal operands
 */
export type AutomationsAPIOperator = string;

export function automationsAPIAutomationActionUnionArraySerializer(
  result: Array<AutomationsAPIAutomationActionUnion>,
): any[] {
  return result.map((item) => {
    return automationsAPIAutomationActionUnionSerializer(item);
  });
}

export function automationsAPIAutomationActionUnionArrayDeserializer(
  result: Array<AutomationsAPIAutomationActionUnion>,
): any[] {
  return result.map((item) => {
    return automationsAPIAutomationActionUnionDeserializer(item);
  });
}

/** The action that should be triggered. */
export interface AutomationsAPIAutomationAction {
  /** The type of the action that will be triggered by the Automation */
  /** The discriminator possible values: LogicApp, EventHub, Workspace */
  actionType: CommonActionType;
}

export function automationsAPIAutomationActionSerializer(
  item: AutomationsAPIAutomationAction,
): any {
  return { actionType: item["actionType"] };
}

export function automationsAPIAutomationActionDeserializer(
  item: any,
): AutomationsAPIAutomationAction {
  return {
    actionType: item["actionType"],
  };
}

/** Alias for AutomationsAPIAutomationActionUnion */
export type AutomationsAPIAutomationActionUnion =
  | AutomationsAPIAutomationActionLogicApp
  | AutomationsAPIAutomationActionEventHub
  | AutomationsAPIAutomationActionWorkspace
  | AutomationsAPIAutomationAction;

export function automationsAPIAutomationActionUnionSerializer(
  item: AutomationsAPIAutomationActionUnion,
): any {
  switch (item.actionType) {
    case "LogicApp":
      return automationsAPIAutomationActionLogicAppSerializer(
        item as AutomationsAPIAutomationActionLogicApp,
      );

    case "EventHub":
      return automationsAPIAutomationActionEventHubSerializer(
        item as AutomationsAPIAutomationActionEventHub,
      );

    case "Workspace":
      return automationsAPIAutomationActionWorkspaceSerializer(
        item as AutomationsAPIAutomationActionWorkspace,
      );

    default:
      return automationsAPIAutomationActionSerializer(item);
  }
}

export function automationsAPIAutomationActionUnionDeserializer(
  item: any,
): AutomationsAPIAutomationActionUnion {
  switch (item["actionType"]) {
    case "LogicApp":
      return automationsAPIAutomationActionLogicAppDeserializer(
        item as AutomationsAPIAutomationActionLogicApp,
      );

    case "EventHub":
      return automationsAPIAutomationActionEventHubDeserializer(
        item as AutomationsAPIAutomationActionEventHub,
      );

    case "Workspace":
      return automationsAPIAutomationActionWorkspaceDeserializer(
        item as AutomationsAPIAutomationActionWorkspace,
      );

    default:
      return automationsAPIAutomationActionDeserializer(item);
  }
}

/** The logic app action that should be triggered. To learn more about Microsoft Defender for Cloud's Workflow Automation capabilities, visit https://aka.ms/ASCWorkflowAutomationLearnMore */
export interface AutomationsAPIAutomationActionLogicApp extends AutomationsAPIAutomationAction {
  /** The triggered Logic App Azure Resource ID. This can also reside on other subscriptions, given that you have permissions to trigger the Logic App */
  logicAppResourceId?: string;
  /** The Logic App trigger URI endpoint (it will not be included in any response). */
  uri?: string;
  /** The type of the action that will be triggered by the Automation */
  actionType: "LogicApp";
}

export function automationsAPIAutomationActionLogicAppSerializer(
  item: AutomationsAPIAutomationActionLogicApp,
): any {
  return {
    actionType: item["actionType"],
    logicAppResourceId: item["logicAppResourceId"],
    uri: item["uri"],
  };
}

export function automationsAPIAutomationActionLogicAppDeserializer(
  item: any,
): AutomationsAPIAutomationActionLogicApp {
  return {
    actionType: item["actionType"],
    logicAppResourceId: item["logicAppResourceId"],
    uri: item["uri"],
  };
}

/** The target Event Hub to which event data will be exported. To learn more about Microsoft Defender for Cloud continuous export capabilities, visit https://aka.ms/ASCExportLearnMore */
export interface AutomationsAPIAutomationActionEventHub extends AutomationsAPIAutomationAction {
  /** The target Event Hub Azure Resource ID. */
  eventHubResourceId?: string;
  /** The target Event Hub SAS policy name. */
  readonly sasPolicyName?: string;
  /** The target Event Hub connection string (it will not be included in any response). */
  connectionString?: string;
  /** Indicates whether the trusted service is enabled or not. */
  isTrustedServiceEnabled?: boolean;
  /** The type of the action that will be triggered by the Automation */
  actionType: "EventHub";
}

export function automationsAPIAutomationActionEventHubSerializer(
  item: AutomationsAPIAutomationActionEventHub,
): any {
  return {
    actionType: item["actionType"],
    eventHubResourceId: item["eventHubResourceId"],
    connectionString: item["connectionString"],
    isTrustedServiceEnabled: item["isTrustedServiceEnabled"],
  };
}

export function automationsAPIAutomationActionEventHubDeserializer(
  item: any,
): AutomationsAPIAutomationActionEventHub {
  return {
    actionType: item["actionType"],
    eventHubResourceId: item["eventHubResourceId"],
    sasPolicyName: item["sasPolicyName"],
    connectionString: item["connectionString"],
    isTrustedServiceEnabled: item["isTrustedServiceEnabled"],
  };
}

/** The Log Analytics Workspace to which event data will be exported. Security alerts data will reside in the 'SecurityAlert' table and the assessments data will reside in the 'SecurityRecommendation' table (under the 'Security'/'SecurityCenterFree' solutions). Note that in order to view the data in the workspace, the Security Center Log Analytics free/standard solution needs to be enabled on that workspace. To learn more about Microsoft Defender for Cloud continuous export capabilities, visit https://aka.ms/ASCExportLearnMore */
export interface AutomationsAPIAutomationActionWorkspace extends AutomationsAPIAutomationAction {
  /** The fully qualified Log Analytics Workspace Azure Resource ID. */
  workspaceResourceId?: string;
  /** The type of the action that will be triggered by the Automation */
  actionType: "Workspace";
}

export function automationsAPIAutomationActionWorkspaceSerializer(
  item: AutomationsAPIAutomationActionWorkspace,
): any {
  return { actionType: item["actionType"], workspaceResourceId: item["workspaceResourceId"] };
}

export function automationsAPIAutomationActionWorkspaceDeserializer(
  item: any,
): AutomationsAPIAutomationActionWorkspace {
  return {
    actionType: item["actionType"],
    workspaceResourceId: item["workspaceResourceId"],
  };
}

/** The update model of security automation resource. */
export interface AutomationsAPIAutomationUpdateModel extends CommonTags {
  /** The security automation description. */
  description?: string;
  /** Indicates whether the security automation is enabled. */
  isEnabled?: boolean;
  /** A collection of scopes on which the security automations logic is applied. Supported scopes are the subscription itself or a resource group under that subscription. The automation will only apply on defined scopes. */
  scopes?: AutomationsAPIAutomationScope[];
  /** A collection of the source event types which evaluate the security automation set of rules. */
  sources?: AutomationsAPIAutomationSource[];
  /** A collection of the actions which are triggered if all the configured rules evaluations, within at least one rule set, are true. */
  actions?: AutomationsAPIAutomationActionUnion[];
}

export function automationsAPIAutomationUpdateModelSerializer(
  item: AutomationsAPIAutomationUpdateModel,
): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "description",
      "isEnabled",
      "scopes",
      "sources",
      "actions",
    ])
      ? undefined
      : _automationUpdateModelPropertiesSerializer(item),
  };
}

/** List of security automations response. */
export interface _AutomationsAPIAutomationList {
  /** The Automation items on this page */
  value: AutomationsAPIAutomation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _automationsAPIAutomationListDeserializer(
  item: any,
): _AutomationsAPIAutomationList {
  return {
    value: automationsAPIAutomationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function automationsAPIAutomationArraySerializer(
  result: Array<AutomationsAPIAutomation>,
): any[] {
  return result.map((item) => {
    return automationsAPIAutomationSerializer(item);
  });
}

export function automationsAPIAutomationArrayDeserializer(
  result: Array<AutomationsAPIAutomation>,
): any[] {
  return result.map((item) => {
    return automationsAPIAutomationDeserializer(item);
  });
}

/** The security automation model state property bag. */
export interface AutomationsAPIAutomationValidationStatus {
  /** Indicates whether the model is valid or not. */
  isValid?: boolean;
  /** The validation message. */
  message?: string;
}

export function automationsAPIAutomationValidationStatusDeserializer(
  item: any,
): AutomationsAPIAutomationValidationStatus {
  return {
    isValid: item["isValid"],
    message: item["message"],
  };
}

/** Contact details and configurations for notifications coming from Microsoft Defender for Cloud. */
export interface AutomationsAPISecurityContact extends ProxyResource {
  /** List of email addresses which will get notifications from Microsoft Defender for Cloud by the configurations defined in this security contact. */
  emails?: string;
  /** The security contact's phone number */
  phone?: string;
  /** Indicates whether the security contact is enabled. */
  isEnabled?: boolean;
  /** A collection of sources types which evaluate the email notification. */
  notificationsSources?: AutomationsAPINotificationsSourceUnion[];
  /** Defines whether to send email notifications from Microsoft Defender for Cloud to persons with specific RBAC roles on the subscription. */
  notificationsByRole?: AutomationsAPISecurityContactPropertiesNotificationsByRole;
}

export function automationsAPISecurityContactSerializer(item: AutomationsAPISecurityContact): any {
  return {
    properties: areAllPropsUndefined(item, [
      "emails",
      "phone",
      "isEnabled",
      "notificationsSources",
      "notificationsByRole",
    ])
      ? undefined
      : _securityContactPropertiesSerializer(item),
  };
}

export function automationsAPISecurityContactDeserializer(
  item: any,
): AutomationsAPISecurityContact {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _securityContactPropertiesDeserializer(item["properties"])),
  };
}

/** Describes security contact properties */
export interface AutomationsAPISecurityContactProperties {
  /** List of email addresses which will get notifications from Microsoft Defender for Cloud by the configurations defined in this security contact. */
  emails?: string;
  /** The security contact's phone number */
  phone?: string;
  /** Indicates whether the security contact is enabled. */
  isEnabled?: boolean;
  /** A collection of sources types which evaluate the email notification. */
  notificationsSources?: AutomationsAPINotificationsSourceUnion[];
  /** Defines whether to send email notifications from Microsoft Defender for Cloud to persons with specific RBAC roles on the subscription. */
  notificationsByRole?: AutomationsAPISecurityContactPropertiesNotificationsByRole;
}

export function automationsAPISecurityContactPropertiesSerializer(
  item: AutomationsAPISecurityContactProperties,
): any {
  return {
    emails: item["emails"],
    phone: item["phone"],
    isEnabled: item["isEnabled"],
    notificationsSources: !item["notificationsSources"]
      ? item["notificationsSources"]
      : automationsAPINotificationsSourceUnionArraySerializer(item["notificationsSources"]),
    notificationsByRole: !item["notificationsByRole"]
      ? item["notificationsByRole"]
      : automationsAPISecurityContactPropertiesNotificationsByRoleSerializer(
          item["notificationsByRole"],
        ),
  };
}

export function automationsAPISecurityContactPropertiesDeserializer(
  item: any,
): AutomationsAPISecurityContactProperties {
  return {
    emails: item["emails"],
    phone: item["phone"],
    isEnabled: item["isEnabled"],
    notificationsSources: !item["notificationsSources"]
      ? item["notificationsSources"]
      : automationsAPINotificationsSourceUnionArrayDeserializer(item["notificationsSources"]),
    notificationsByRole: !item["notificationsByRole"]
      ? item["notificationsByRole"]
      : automationsAPISecurityContactPropertiesNotificationsByRoleDeserializer(
          item["notificationsByRole"],
        ),
  };
}

export function automationsAPINotificationsSourceUnionArraySerializer(
  result: Array<AutomationsAPINotificationsSourceUnion>,
): any[] {
  return result.map((item) => {
    return automationsAPINotificationsSourceUnionSerializer(item);
  });
}

export function automationsAPINotificationsSourceUnionArrayDeserializer(
  result: Array<AutomationsAPINotificationsSourceUnion>,
): any[] {
  return result.map((item) => {
    return automationsAPINotificationsSourceUnionDeserializer(item);
  });
}

/** A valid notification source type */
export interface AutomationsAPINotificationsSource {
  /** The source type that will trigger the notification */
  /** The discriminator possible values: Alert, AttackPath */
  sourceType: AutomationsAPISourceType;
}

export function automationsAPINotificationsSourceSerializer(
  item: AutomationsAPINotificationsSource,
): any {
  return { sourceType: item["sourceType"] };
}

export function automationsAPINotificationsSourceDeserializer(
  item: any,
): AutomationsAPINotificationsSource {
  return {
    sourceType: item["sourceType"],
  };
}

/** Alias for AutomationsAPINotificationsSourceUnion */
export type AutomationsAPINotificationsSourceUnion =
  | AutomationsAPINotificationsSourceAlert
  | AutomationsAPINotificationsSourceAttackPath
  | AutomationsAPINotificationsSource;

export function automationsAPINotificationsSourceUnionSerializer(
  item: AutomationsAPINotificationsSourceUnion,
): any {
  switch (item.sourceType) {
    case "Alert":
      return automationsAPINotificationsSourceAlertSerializer(
        item as AutomationsAPINotificationsSourceAlert,
      );

    case "AttackPath":
      return automationsAPINotificationsSourceAttackPathSerializer(
        item as AutomationsAPINotificationsSourceAttackPath,
      );

    default:
      return automationsAPINotificationsSourceSerializer(item);
  }
}

export function automationsAPINotificationsSourceUnionDeserializer(
  item: any,
): AutomationsAPINotificationsSourceUnion {
  switch (item["sourceType"]) {
    case "Alert":
      return automationsAPINotificationsSourceAlertDeserializer(
        item as AutomationsAPINotificationsSourceAlert,
      );

    case "AttackPath":
      return automationsAPINotificationsSourceAttackPathDeserializer(
        item as AutomationsAPINotificationsSourceAttackPath,
      );

    default:
      return automationsAPINotificationsSourceDeserializer(item);
  }
}

/** The source type that will trigger the notification */
export enum KnownAutomationsAPISourceType {
  /** Alert */
  Alert = "Alert",
  /** AttackPath */
  AttackPath = "AttackPath",
}

/**
 * The source type that will trigger the notification \
 * {@link KnownAutomationsAPISourceType} can be used interchangeably with AutomationsAPISourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Alert**: Alert \
 * **AttackPath**: AttackPath
 */
export type AutomationsAPISourceType = string;

/** Alert notification source */
export interface AutomationsAPINotificationsSourceAlert extends AutomationsAPINotificationsSource {
  /** Defines the minimal alert severity which will be sent as email notifications */
  minimalSeverity?: AutomationsAPIMinimalSeverity;
  /** The source type that will trigger the notification */
  sourceType: "Alert";
}

export function automationsAPINotificationsSourceAlertSerializer(
  item: AutomationsAPINotificationsSourceAlert,
): any {
  return { sourceType: item["sourceType"], minimalSeverity: item["minimalSeverity"] };
}

export function automationsAPINotificationsSourceAlertDeserializer(
  item: any,
): AutomationsAPINotificationsSourceAlert {
  return {
    sourceType: item["sourceType"],
    minimalSeverity: item["minimalSeverity"],
  };
}

/** Defines the minimal alert severity which will be sent as email notifications */
export enum KnownAutomationsAPIMinimalSeverity {
  /** Get notifications on new alerts with High severity */
  High = "High",
  /** Get notifications on new alerts with Medium or High severity */
  Medium = "Medium",
  /** Get notifications on new alerts with Low, Medium or High severity */
  Low = "Low",
}

/**
 * Defines the minimal alert severity which will be sent as email notifications \
 * {@link KnownAutomationsAPIMinimalSeverity} can be used interchangeably with AutomationsAPIMinimalSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **High**: Get notifications on new alerts with High severity \
 * **Medium**: Get notifications on new alerts with Medium or High severity \
 * **Low**: Get notifications on new alerts with Low, Medium or High severity
 */
export type AutomationsAPIMinimalSeverity = string;

/** Attack path notification source */
export interface AutomationsAPINotificationsSourceAttackPath extends AutomationsAPINotificationsSource {
  /** Defines the minimal attach path risk level which will be sent as email notifications */
  minimalRiskLevel?: AutomationsAPIMinimalRiskLevel;
  /** The source type that will trigger the notification */
  sourceType: "AttackPath";
}

export function automationsAPINotificationsSourceAttackPathSerializer(
  item: AutomationsAPINotificationsSourceAttackPath,
): any {
  return { sourceType: item["sourceType"], minimalRiskLevel: item["minimalRiskLevel"] };
}

export function automationsAPINotificationsSourceAttackPathDeserializer(
  item: any,
): AutomationsAPINotificationsSourceAttackPath {
  return {
    sourceType: item["sourceType"],
    minimalRiskLevel: item["minimalRiskLevel"],
  };
}

/** Defines the minimal attack path risk level which will be sent as email notifications */
export enum KnownAutomationsAPIMinimalRiskLevel {
  /** Get notifications on new attack paths with Critical risk level */
  Critical = "Critical",
  /** Get notifications on new attack paths with High or Critical risk level */
  High = "High",
  /** Get notifications on new attach paths with Medium, High or Critical risk level */
  Medium = "Medium",
  /** Get notifications on new attach paths with Low, Medium, High or Critical risk level */
  Low = "Low",
}

/**
 * Defines the minimal attack path risk level which will be sent as email notifications \
 * {@link KnownAutomationsAPIMinimalRiskLevel} can be used interchangeably with AutomationsAPIMinimalRiskLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Critical**: Get notifications on new attack paths with Critical risk level \
 * **High**: Get notifications on new attack paths with High or Critical risk level \
 * **Medium**: Get notifications on new attach paths with Medium, High or Critical risk level \
 * **Low**: Get notifications on new attach paths with Low, Medium, High or Critical risk level
 */
export type AutomationsAPIMinimalRiskLevel = string;

/** Defines whether to send email notifications from Microsoft Defender for Cloud to persons with specific RBAC roles on the subscription. */
export interface AutomationsAPISecurityContactPropertiesNotificationsByRole {
  /** Defines whether to send email notifications from AMicrosoft Defender for Cloud to persons with specific RBAC roles on the subscription. */
  state?: CommonState;
  /** Defines which RBAC roles will get email notifications from Microsoft Defender for Cloud. List of allowed RBAC roles: */
  roles?: AutomationsAPISecurityContactRole[];
}

export function automationsAPISecurityContactPropertiesNotificationsByRoleSerializer(
  item: AutomationsAPISecurityContactPropertiesNotificationsByRole,
): any {
  return {
    state: item["state"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
  };
}

export function automationsAPISecurityContactPropertiesNotificationsByRoleDeserializer(
  item: any,
): AutomationsAPISecurityContactPropertiesNotificationsByRole {
  return {
    state: item["state"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
  };
}

/** A possible role to configure sending security notification alerts to */
export enum KnownAutomationsAPISecurityContactRole {
  /** If enabled, send notification on new alerts to the account admins */
  AccountAdmin = "AccountAdmin",
  /** If enabled, send notification on new alerts to the service admins */
  ServiceAdmin = "ServiceAdmin",
  /** If enabled, send notification on new alerts to the subscription owners */
  Owner = "Owner",
  /** If enabled, send notification on new alerts to the subscription contributors */
  Contributor = "Contributor",
}

/**
 * A possible role to configure sending security notification alerts to \
 * {@link KnownAutomationsAPISecurityContactRole} can be used interchangeably with AutomationsAPISecurityContactRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AccountAdmin**: If enabled, send notification on new alerts to the account admins \
 * **ServiceAdmin**: If enabled, send notification on new alerts to the service admins \
 * **Owner**: If enabled, send notification on new alerts to the subscription owners \
 * **Contributor**: If enabled, send notification on new alerts to the subscription contributors
 */
export type AutomationsAPISecurityContactRole = string;

/** Known values of {@link SecurityContactName} that the service accepts. */
export enum KnownAutomationsAPISecurityContactName {
  /** The single applicable name of the security contact object */
  Default = "default",
}

/** Type of AutomationsAPISecurityContactName */
export type AutomationsAPISecurityContactName = string;

/** List of security contacts response */
export interface _AutomationsAPISecurityContactList {
  /** The SecurityContact items on this page */
  value: AutomationsAPISecurityContact[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _automationsAPISecurityContactListDeserializer(
  item: any,
): _AutomationsAPISecurityContactList {
  return {
    value: automationsAPISecurityContactArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function automationsAPISecurityContactArraySerializer(
  result: Array<AutomationsAPISecurityContact>,
): any[] {
  return result.map((item) => {
    return automationsAPISecurityContactSerializer(item);
  });
}

export function automationsAPISecurityContactArrayDeserializer(
  result: Array<AutomationsAPISecurityContact>,
): any[] {
  return result.map((item) => {
    return automationsAPISecurityContactDeserializer(item);
  });
}

export function _automationPropertiesSerializer(item: AutomationsAPIAutomation): any {
  return {
    description: item["description"],
    isEnabled: item["isEnabled"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : automationsAPIAutomationScopeArraySerializer(item["scopes"]),
    sources: !item["sources"]
      ? item["sources"]
      : automationsAPIAutomationSourceArraySerializer(item["sources"]),
    actions: !item["actions"]
      ? item["actions"]
      : automationsAPIAutomationActionUnionArraySerializer(item["actions"]),
  };
}

export function _automationPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    isEnabled: item["isEnabled"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : automationsAPIAutomationScopeArrayDeserializer(item["scopes"]),
    sources: !item["sources"]
      ? item["sources"]
      : automationsAPIAutomationSourceArrayDeserializer(item["sources"]),
    actions: !item["actions"]
      ? item["actions"]
      : automationsAPIAutomationActionUnionArrayDeserializer(item["actions"]),
  };
}

export function _automationUpdateModelPropertiesSerializer(
  item: AutomationsAPIAutomationUpdateModel,
): any {
  return {
    description: item["description"],
    isEnabled: item["isEnabled"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : automationsAPIAutomationScopeArraySerializer(item["scopes"]),
    sources: !item["sources"]
      ? item["sources"]
      : automationsAPIAutomationSourceArraySerializer(item["sources"]),
    actions: !item["actions"]
      ? item["actions"]
      : automationsAPIAutomationActionUnionArraySerializer(item["actions"]),
  };
}

export function _automationUpdateModelPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    isEnabled: item["isEnabled"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : automationsAPIAutomationScopeArrayDeserializer(item["scopes"]),
    sources: !item["sources"]
      ? item["sources"]
      : automationsAPIAutomationSourceArrayDeserializer(item["sources"]),
    actions: !item["actions"]
      ? item["actions"]
      : automationsAPIAutomationActionUnionArrayDeserializer(item["actions"]),
  };
}

export function _securityContactPropertiesSerializer(item: AutomationsAPISecurityContact): any {
  return {
    emails: item["emails"],
    phone: item["phone"],
    isEnabled: item["isEnabled"],
    notificationsSources: !item["notificationsSources"]
      ? item["notificationsSources"]
      : automationsAPINotificationsSourceUnionArraySerializer(item["notificationsSources"]),
    notificationsByRole: !item["notificationsByRole"]
      ? item["notificationsByRole"]
      : automationsAPISecurityContactPropertiesNotificationsByRoleSerializer(
          item["notificationsByRole"],
        ),
  };
}

export function _securityContactPropertiesDeserializer(item: any) {
  return {
    emails: item["emails"],
    phone: item["phone"],
    isEnabled: item["isEnabled"],
    notificationsSources: !item["notificationsSources"]
      ? item["notificationsSources"]
      : automationsAPINotificationsSourceUnionArrayDeserializer(item["notificationsSources"]),
    notificationsByRole: !item["notificationsByRole"]
      ? item["notificationsByRole"]
      : automationsAPISecurityContactPropertiesNotificationsByRoleDeserializer(
          item["notificationsByRole"],
        ),
  };
}
