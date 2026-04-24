// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { ActionType, Tags, State } from "../common/models.js";
import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The security automation resource. */
export interface Automation extends ProxyResource {
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
  scopes?: AutomationScope[];
  /** A collection of the source event types which evaluate the security automation set of rules. */
  sources?: AutomationSource[];
  /** A collection of the actions which are triggered if all the configured rules evaluations, within at least one rule set, are true. */
  actions?: AutomationActionUnion[];
}

export function automationSerializer(item: Automation): any {
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

export function automationDeserializer(item: any): Automation {
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
export interface AutomationProperties {
  /** The security automation description. */
  description?: string;
  /** Indicates whether the security automation is enabled. */
  isEnabled?: boolean;
  /** A collection of scopes on which the security automations logic is applied. Supported scopes are the subscription itself or a resource group under that subscription. The automation will only apply on defined scopes. */
  scopes?: AutomationScope[];
  /** A collection of the source event types which evaluate the security automation set of rules. */
  sources?: AutomationSource[];
  /** A collection of the actions which are triggered if all the configured rules evaluations, within at least one rule set, are true. */
  actions?: AutomationActionUnion[];
}

export function automationPropertiesSerializer(item: AutomationProperties): any {
  return {
    description: item["description"],
    isEnabled: item["isEnabled"],
    scopes: !item["scopes"] ? item["scopes"] : automationScopeArraySerializer(item["scopes"]),
    sources: !item["sources"] ? item["sources"] : automationSourceArraySerializer(item["sources"]),
    actions: !item["actions"]
      ? item["actions"]
      : automationActionUnionArraySerializer(item["actions"]),
  };
}

export function automationPropertiesDeserializer(item: any): AutomationProperties {
  return {
    description: item["description"],
    isEnabled: item["isEnabled"],
    scopes: !item["scopes"] ? item["scopes"] : automationScopeArrayDeserializer(item["scopes"]),
    sources: !item["sources"]
      ? item["sources"]
      : automationSourceArrayDeserializer(item["sources"]),
    actions: !item["actions"]
      ? item["actions"]
      : automationActionUnionArrayDeserializer(item["actions"]),
  };
}

export function automationScopeArraySerializer(result: Array<AutomationScope>): any[] {
  return result.map((item) => {
    return automationScopeSerializer(item);
  });
}

export function automationScopeArrayDeserializer(result: Array<AutomationScope>): any[] {
  return result.map((item) => {
    return automationScopeDeserializer(item);
  });
}

/** A single automation scope. */
export interface AutomationScope {
  /** The resources scope description. */
  description?: string;
  /** The resources scope path. Can be the subscription on which the automation is defined on or a resource group under that subscription (fully qualified Azure resource IDs). */
  scopePath?: string;
}

export function automationScopeSerializer(item: AutomationScope): any {
  return { description: item["description"], scopePath: item["scopePath"] };
}

export function automationScopeDeserializer(item: any): AutomationScope {
  return {
    description: item["description"],
    scopePath: item["scopePath"],
  };
}

export function automationSourceArraySerializer(result: Array<AutomationSource>): any[] {
  return result.map((item) => {
    return automationSourceSerializer(item);
  });
}

export function automationSourceArrayDeserializer(result: Array<AutomationSource>): any[] {
  return result.map((item) => {
    return automationSourceDeserializer(item);
  });
}

/** The source event types which evaluate the security automation set of rules. For example - security alerts and security assessments. To learn more about the supported security events data models schemas - please visit https://aka.ms/ASCAutomationSchemas. */
export interface AutomationSource {
  /** A valid event source type. */
  eventSource?: EventSource;
  /** A set of rules which evaluate upon event interception. A logical disjunction is applied between defined rule sets (logical 'or'). */
  ruleSets?: AutomationRuleSet[];
}

export function automationSourceSerializer(item: AutomationSource): any {
  return {
    eventSource: item["eventSource"],
    ruleSets: !item["ruleSets"]
      ? item["ruleSets"]
      : automationRuleSetArraySerializer(item["ruleSets"]),
  };
}

export function automationSourceDeserializer(item: any): AutomationSource {
  return {
    eventSource: item["eventSource"],
    ruleSets: !item["ruleSets"]
      ? item["ruleSets"]
      : automationRuleSetArrayDeserializer(item["ruleSets"]),
  };
}

/** A valid event source type. */
export enum KnownEventSource {
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
 * {@link KnownEventSource} can be used interchangeably with EventSource,
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
export type EventSource = string;

export function automationRuleSetArraySerializer(result: Array<AutomationRuleSet>): any[] {
  return result.map((item) => {
    return automationRuleSetSerializer(item);
  });
}

export function automationRuleSetArrayDeserializer(result: Array<AutomationRuleSet>): any[] {
  return result.map((item) => {
    return automationRuleSetDeserializer(item);
  });
}

/** A rule set which evaluates all its rules upon an event interception. Only when all the included rules in the rule set will be evaluated as 'true', will the event trigger the defined actions. */
export interface AutomationRuleSet {
  rules?: AutomationTriggeringRule[];
}

export function automationRuleSetSerializer(item: AutomationRuleSet): any {
  return {
    rules: !item["rules"] ? item["rules"] : automationTriggeringRuleArraySerializer(item["rules"]),
  };
}

export function automationRuleSetDeserializer(item: any): AutomationRuleSet {
  return {
    rules: !item["rules"]
      ? item["rules"]
      : automationTriggeringRuleArrayDeserializer(item["rules"]),
  };
}

export function automationTriggeringRuleArraySerializer(
  result: Array<AutomationTriggeringRule>,
): any[] {
  return result.map((item) => {
    return automationTriggeringRuleSerializer(item);
  });
}

export function automationTriggeringRuleArrayDeserializer(
  result: Array<AutomationTriggeringRule>,
): any[] {
  return result.map((item) => {
    return automationTriggeringRuleDeserializer(item);
  });
}

/** A rule which is evaluated upon event interception. The rule is configured by comparing a specific value from the event model to an expected value. This comparison is done by using one of the supported operators set. */
export interface AutomationTriggeringRule {
  /** The JPath of the entity model property that should be checked. */
  propertyJPath?: string;
  /** The data type of the compared operands (string, integer, floating point number or a boolean [true/false]] */
  propertyType?: PropertyType;
  /** The expected value. */
  expectedValue?: string;
  /** A valid comparer operator to use. A case-insensitive comparison will be applied for String PropertyType. */
  operator?: Operator;
}

export function automationTriggeringRuleSerializer(item: AutomationTriggeringRule): any {
  return {
    propertyJPath: item["propertyJPath"],
    propertyType: item["propertyType"],
    expectedValue: item["expectedValue"],
    operator: item["operator"],
  };
}

export function automationTriggeringRuleDeserializer(item: any): AutomationTriggeringRule {
  return {
    propertyJPath: item["propertyJPath"],
    propertyType: item["propertyType"],
    expectedValue: item["expectedValue"],
    operator: item["operator"],
  };
}

/** The data type of the compared operands (string, integer, floating point number or a boolean [true/false]] */
export enum KnownPropertyType {
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
 * {@link KnownPropertyType} can be used interchangeably with PropertyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **String**: String \
 * **Integer**: Integer \
 * **Number**: Number \
 * **Boolean**: Boolean
 */
export type PropertyType = string;

/** A valid comparer operator to use. A case-insensitive comparison will be applied for String PropertyType. */
export enum KnownOperator {
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
 * {@link KnownOperator} can be used interchangeably with Operator,
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
export type Operator = string;

export function automationActionUnionArraySerializer(result: Array<AutomationActionUnion>): any[] {
  return result.map((item) => {
    return automationActionUnionSerializer(item);
  });
}

export function automationActionUnionArrayDeserializer(
  result: Array<AutomationActionUnion>,
): any[] {
  return result.map((item) => {
    return automationActionUnionDeserializer(item);
  });
}

/** The action that should be triggered. */
export interface AutomationAction {
  /** The type of the action that will be triggered by the Automation */
  /** The discriminator possible values: LogicApp, EventHub, Workspace */
  actionType: ActionType;
}

export function automationActionSerializer(item: AutomationAction): any {
  return { actionType: item["actionType"] };
}

export function automationActionDeserializer(item: any): AutomationAction {
  return {
    actionType: item["actionType"],
  };
}

/** Alias for AutomationActionUnion */
export type AutomationActionUnion =
  | AutomationActionLogicApp
  | AutomationActionEventHub
  | AutomationActionWorkspace
  | AutomationAction;

export function automationActionUnionSerializer(item: AutomationActionUnion): any {
  switch (item.actionType) {
    case "LogicApp":
      return automationActionLogicAppSerializer(item as AutomationActionLogicApp);

    case "EventHub":
      return automationActionEventHubSerializer(item as AutomationActionEventHub);

    case "Workspace":
      return automationActionWorkspaceSerializer(item as AutomationActionWorkspace);

    default:
      return automationActionSerializer(item);
  }
}

export function automationActionUnionDeserializer(item: any): AutomationActionUnion {
  switch (item["actionType"]) {
    case "LogicApp":
      return automationActionLogicAppDeserializer(item as AutomationActionLogicApp);

    case "EventHub":
      return automationActionEventHubDeserializer(item as AutomationActionEventHub);

    case "Workspace":
      return automationActionWorkspaceDeserializer(item as AutomationActionWorkspace);

    default:
      return automationActionDeserializer(item);
  }
}

/** The logic app action that should be triggered. To learn more about Microsoft Defender for Cloud's Workflow Automation capabilities, visit https://aka.ms/ASCWorkflowAutomationLearnMore */
export interface AutomationActionLogicApp extends AutomationAction {
  /** The triggered Logic App Azure Resource ID. This can also reside on other subscriptions, given that you have permissions to trigger the Logic App */
  logicAppResourceId?: string;
  /** The Logic App trigger URI endpoint (it will not be included in any response). */
  uri?: string;
  /** The type of the action that will be triggered by the Automation */
  actionType: "LogicApp";
}

export function automationActionLogicAppSerializer(item: AutomationActionLogicApp): any {
  return {
    actionType: item["actionType"],
    logicAppResourceId: item["logicAppResourceId"],
    uri: item["uri"],
  };
}

export function automationActionLogicAppDeserializer(item: any): AutomationActionLogicApp {
  return {
    actionType: item["actionType"],
    logicAppResourceId: item["logicAppResourceId"],
    uri: item["uri"],
  };
}

/** The target Event Hub to which event data will be exported. To learn more about Microsoft Defender for Cloud continuous export capabilities, visit https://aka.ms/ASCExportLearnMore */
export interface AutomationActionEventHub extends AutomationAction {
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

export function automationActionEventHubSerializer(item: AutomationActionEventHub): any {
  return {
    actionType: item["actionType"],
    eventHubResourceId: item["eventHubResourceId"],
    connectionString: item["connectionString"],
    isTrustedServiceEnabled: item["isTrustedServiceEnabled"],
  };
}

export function automationActionEventHubDeserializer(item: any): AutomationActionEventHub {
  return {
    actionType: item["actionType"],
    eventHubResourceId: item["eventHubResourceId"],
    sasPolicyName: item["sasPolicyName"],
    connectionString: item["connectionString"],
    isTrustedServiceEnabled: item["isTrustedServiceEnabled"],
  };
}

/** The Log Analytics Workspace to which event data will be exported. Security alerts data will reside in the 'SecurityAlert' table and the assessments data will reside in the 'SecurityRecommendation' table (under the 'Security'/'SecurityCenterFree' solutions). Note that in order to view the data in the workspace, the Security Center Log Analytics free/standard solution needs to be enabled on that workspace. To learn more about Microsoft Defender for Cloud continuous export capabilities, visit https://aka.ms/ASCExportLearnMore */
export interface AutomationActionWorkspace extends AutomationAction {
  /** The fully qualified Log Analytics Workspace Azure Resource ID. */
  workspaceResourceId?: string;
  /** The type of the action that will be triggered by the Automation */
  actionType: "Workspace";
}

export function automationActionWorkspaceSerializer(item: AutomationActionWorkspace): any {
  return { actionType: item["actionType"], workspaceResourceId: item["workspaceResourceId"] };
}

export function automationActionWorkspaceDeserializer(item: any): AutomationActionWorkspace {
  return {
    actionType: item["actionType"],
    workspaceResourceId: item["workspaceResourceId"],
  };
}

/** The update model of security automation resource. */
export interface AutomationUpdateModel extends Tags {
  /** The security automation description. */
  description?: string;
  /** Indicates whether the security automation is enabled. */
  isEnabled?: boolean;
  /** A collection of scopes on which the security automations logic is applied. Supported scopes are the subscription itself or a resource group under that subscription. The automation will only apply on defined scopes. */
  scopes?: AutomationScope[];
  /** A collection of the source event types which evaluate the security automation set of rules. */
  sources?: AutomationSource[];
  /** A collection of the actions which are triggered if all the configured rules evaluations, within at least one rule set, are true. */
  actions?: AutomationActionUnion[];
}

export function automationUpdateModelSerializer(item: AutomationUpdateModel): any {
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
export interface _AutomationList {
  /** The Automation items on this page */
  value: Automation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _automationListDeserializer(item: any): _AutomationList {
  return {
    value: automationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function automationArraySerializer(result: Array<Automation>): any[] {
  return result.map((item) => {
    return automationSerializer(item);
  });
}

export function automationArrayDeserializer(result: Array<Automation>): any[] {
  return result.map((item) => {
    return automationDeserializer(item);
  });
}

/** The security automation model state property bag. */
export interface AutomationValidationStatus {
  /** Indicates whether the model is valid or not. */
  isValid?: boolean;
  /** The validation message. */
  message?: string;
}

export function automationValidationStatusDeserializer(item: any): AutomationValidationStatus {
  return {
    isValid: item["isValid"],
    message: item["message"],
  };
}

/** Contact details and configurations for notifications coming from Microsoft Defender for Cloud. */
export interface SecurityContact extends ProxyResource {
  /** List of email addresses which will get notifications from Microsoft Defender for Cloud by the configurations defined in this security contact. */
  emails?: string;
  /** The security contact's phone number */
  phone?: string;
  /** Indicates whether the security contact is enabled. */
  isEnabled?: boolean;
  /** A collection of sources types which evaluate the email notification. */
  notificationsSources?: NotificationsSourceUnion[];
  /** Defines whether to send email notifications from Microsoft Defender for Cloud to persons with specific RBAC roles on the subscription. */
  notificationsByRole?: SecurityContactPropertiesNotificationsByRole;
}

export function securityContactSerializer(item: SecurityContact): any {
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

export function securityContactDeserializer(item: any): SecurityContact {
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
export interface SecurityContactProperties {
  /** List of email addresses which will get notifications from Microsoft Defender for Cloud by the configurations defined in this security contact. */
  emails?: string;
  /** The security contact's phone number */
  phone?: string;
  /** Indicates whether the security contact is enabled. */
  isEnabled?: boolean;
  /** A collection of sources types which evaluate the email notification. */
  notificationsSources?: NotificationsSourceUnion[];
  /** Defines whether to send email notifications from Microsoft Defender for Cloud to persons with specific RBAC roles on the subscription. */
  notificationsByRole?: SecurityContactPropertiesNotificationsByRole;
}

export function securityContactPropertiesSerializer(item: SecurityContactProperties): any {
  return {
    emails: item["emails"],
    phone: item["phone"],
    isEnabled: item["isEnabled"],
    notificationsSources: !item["notificationsSources"]
      ? item["notificationsSources"]
      : notificationsSourceUnionArraySerializer(item["notificationsSources"]),
    notificationsByRole: !item["notificationsByRole"]
      ? item["notificationsByRole"]
      : securityContactPropertiesNotificationsByRoleSerializer(item["notificationsByRole"]),
  };
}

export function securityContactPropertiesDeserializer(item: any): SecurityContactProperties {
  return {
    emails: item["emails"],
    phone: item["phone"],
    isEnabled: item["isEnabled"],
    notificationsSources: !item["notificationsSources"]
      ? item["notificationsSources"]
      : notificationsSourceUnionArrayDeserializer(item["notificationsSources"]),
    notificationsByRole: !item["notificationsByRole"]
      ? item["notificationsByRole"]
      : securityContactPropertiesNotificationsByRoleDeserializer(item["notificationsByRole"]),
  };
}

export function notificationsSourceUnionArraySerializer(
  result: Array<NotificationsSourceUnion>,
): any[] {
  return result.map((item) => {
    return notificationsSourceUnionSerializer(item);
  });
}

export function notificationsSourceUnionArrayDeserializer(
  result: Array<NotificationsSourceUnion>,
): any[] {
  return result.map((item) => {
    return notificationsSourceUnionDeserializer(item);
  });
}

/** A valid notification source type */
export interface NotificationsSource {
  /** The source type that will trigger the notification */
  /** The discriminator possible values: Alert, AttackPath */
  sourceType: SourceType;
}

export function notificationsSourceSerializer(item: NotificationsSource): any {
  return { sourceType: item["sourceType"] };
}

export function notificationsSourceDeserializer(item: any): NotificationsSource {
  return {
    sourceType: item["sourceType"],
  };
}

/** Alias for NotificationsSourceUnion */
export type NotificationsSourceUnion =
  | NotificationsSourceAlert
  | NotificationsSourceAttackPath
  | NotificationsSource;

export function notificationsSourceUnionSerializer(item: NotificationsSourceUnion): any {
  switch (item.sourceType) {
    case "Alert":
      return notificationsSourceAlertSerializer(item as NotificationsSourceAlert);

    case "AttackPath":
      return notificationsSourceAttackPathSerializer(item as NotificationsSourceAttackPath);

    default:
      return notificationsSourceSerializer(item);
  }
}

export function notificationsSourceUnionDeserializer(item: any): NotificationsSourceUnion {
  switch (item["sourceType"]) {
    case "Alert":
      return notificationsSourceAlertDeserializer(item as NotificationsSourceAlert);

    case "AttackPath":
      return notificationsSourceAttackPathDeserializer(item as NotificationsSourceAttackPath);

    default:
      return notificationsSourceDeserializer(item);
  }
}

/** The source type that will trigger the notification */
export enum KnownSourceType {
  /** Alert */
  Alert = "Alert",
  /** AttackPath */
  AttackPath = "AttackPath",
}

/**
 * The source type that will trigger the notification \
 * {@link KnownSourceType} can be used interchangeably with SourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Alert**: Alert \
 * **AttackPath**: AttackPath
 */
export type SourceType = string;

/** Alert notification source */
export interface NotificationsSourceAlert extends NotificationsSource {
  /** Defines the minimal alert severity which will be sent as email notifications */
  minimalSeverity?: MinimalSeverity;
  /** The source type that will trigger the notification */
  sourceType: "Alert";
}

export function notificationsSourceAlertSerializer(item: NotificationsSourceAlert): any {
  return { sourceType: item["sourceType"], minimalSeverity: item["minimalSeverity"] };
}

export function notificationsSourceAlertDeserializer(item: any): NotificationsSourceAlert {
  return {
    sourceType: item["sourceType"],
    minimalSeverity: item["minimalSeverity"],
  };
}

/** Defines the minimal alert severity which will be sent as email notifications */
export enum KnownMinimalSeverity {
  /** Get notifications on new alerts with High severity */
  High = "High",
  /** Get notifications on new alerts with Medium or High severity */
  Medium = "Medium",
  /** Get notifications on new alerts with Low, Medium or High severity */
  Low = "Low",
}

/**
 * Defines the minimal alert severity which will be sent as email notifications \
 * {@link KnownMinimalSeverity} can be used interchangeably with MinimalSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **High**: Get notifications on new alerts with High severity \
 * **Medium**: Get notifications on new alerts with Medium or High severity \
 * **Low**: Get notifications on new alerts with Low, Medium or High severity
 */
export type MinimalSeverity = string;

/** Attack path notification source */
export interface NotificationsSourceAttackPath extends NotificationsSource {
  /** Defines the minimal attach path risk level which will be sent as email notifications */
  minimalRiskLevel?: MinimalRiskLevel;
  /** The source type that will trigger the notification */
  sourceType: "AttackPath";
}

export function notificationsSourceAttackPathSerializer(item: NotificationsSourceAttackPath): any {
  return { sourceType: item["sourceType"], minimalRiskLevel: item["minimalRiskLevel"] };
}

export function notificationsSourceAttackPathDeserializer(
  item: any,
): NotificationsSourceAttackPath {
  return {
    sourceType: item["sourceType"],
    minimalRiskLevel: item["minimalRiskLevel"],
  };
}

/** Defines the minimal attack path risk level which will be sent as email notifications */
export enum KnownMinimalRiskLevel {
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
 * {@link KnownMinimalRiskLevel} can be used interchangeably with MinimalRiskLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Critical**: Get notifications on new attack paths with Critical risk level \
 * **High**: Get notifications on new attack paths with High or Critical risk level \
 * **Medium**: Get notifications on new attach paths with Medium, High or Critical risk level \
 * **Low**: Get notifications on new attach paths with Low, Medium, High or Critical risk level
 */
export type MinimalRiskLevel = string;

/** Defines whether to send email notifications from Microsoft Defender for Cloud to persons with specific RBAC roles on the subscription. */
export interface SecurityContactPropertiesNotificationsByRole {
  /** Defines whether to send email notifications from AMicrosoft Defender for Cloud to persons with specific RBAC roles on the subscription. */
  state?: State;
  /** Defines which RBAC roles will get email notifications from Microsoft Defender for Cloud. List of allowed RBAC roles: */
  roles?: SecurityContactRole[];
}

export function securityContactPropertiesNotificationsByRoleSerializer(
  item: SecurityContactPropertiesNotificationsByRole,
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

export function securityContactPropertiesNotificationsByRoleDeserializer(
  item: any,
): SecurityContactPropertiesNotificationsByRole {
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
export enum KnownSecurityContactRole {
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
 * {@link KnownSecurityContactRole} can be used interchangeably with SecurityContactRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AccountAdmin**: If enabled, send notification on new alerts to the account admins \
 * **ServiceAdmin**: If enabled, send notification on new alerts to the service admins \
 * **Owner**: If enabled, send notification on new alerts to the subscription owners \
 * **Contributor**: If enabled, send notification on new alerts to the subscription contributors
 */
export type SecurityContactRole = string;

/** Known values of {@link SecurityContactName} that the service accepts. */
export enum KnownSecurityContactName {
  /** The single applicable name of the security contact object */
  Default = "default",
}

/** Type of SecurityContactName */
export type SecurityContactName = string;

/** List of security contacts response */
export interface _SecurityContactList {
  /** The SecurityContact items on this page */
  value: SecurityContact[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _securityContactListDeserializer(item: any): _SecurityContactList {
  return {
    value: securityContactArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityContactArraySerializer(result: Array<SecurityContact>): any[] {
  return result.map((item) => {
    return securityContactSerializer(item);
  });
}

export function securityContactArrayDeserializer(result: Array<SecurityContact>): any[] {
  return result.map((item) => {
    return securityContactDeserializer(item);
  });
}

export function _automationPropertiesSerializer(item: Automation): any {
  return {
    description: item["description"],
    isEnabled: item["isEnabled"],
    scopes: !item["scopes"] ? item["scopes"] : automationScopeArraySerializer(item["scopes"]),
    sources: !item["sources"] ? item["sources"] : automationSourceArraySerializer(item["sources"]),
    actions: !item["actions"]
      ? item["actions"]
      : automationActionUnionArraySerializer(item["actions"]),
  };
}

export function _automationPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    isEnabled: item["isEnabled"],
    scopes: !item["scopes"] ? item["scopes"] : automationScopeArrayDeserializer(item["scopes"]),
    sources: !item["sources"]
      ? item["sources"]
      : automationSourceArrayDeserializer(item["sources"]),
    actions: !item["actions"]
      ? item["actions"]
      : automationActionUnionArrayDeserializer(item["actions"]),
  };
}

export function _automationUpdateModelPropertiesSerializer(item: AutomationUpdateModel): any {
  return {
    description: item["description"],
    isEnabled: item["isEnabled"],
    scopes: !item["scopes"] ? item["scopes"] : automationScopeArraySerializer(item["scopes"]),
    sources: !item["sources"] ? item["sources"] : automationSourceArraySerializer(item["sources"]),
    actions: !item["actions"]
      ? item["actions"]
      : automationActionUnionArraySerializer(item["actions"]),
  };
}

export function _automationUpdateModelPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    isEnabled: item["isEnabled"],
    scopes: !item["scopes"] ? item["scopes"] : automationScopeArrayDeserializer(item["scopes"]),
    sources: !item["sources"]
      ? item["sources"]
      : automationSourceArrayDeserializer(item["sources"]),
    actions: !item["actions"]
      ? item["actions"]
      : automationActionUnionArrayDeserializer(item["actions"]),
  };
}

export function _securityContactPropertiesSerializer(item: SecurityContact): any {
  return {
    emails: item["emails"],
    phone: item["phone"],
    isEnabled: item["isEnabled"],
    notificationsSources: !item["notificationsSources"]
      ? item["notificationsSources"]
      : notificationsSourceUnionArraySerializer(item["notificationsSources"]),
    notificationsByRole: !item["notificationsByRole"]
      ? item["notificationsByRole"]
      : securityContactPropertiesNotificationsByRoleSerializer(item["notificationsByRole"]),
  };
}

export function _securityContactPropertiesDeserializer(item: any) {
  return {
    emails: item["emails"],
    phone: item["phone"],
    isEnabled: item["isEnabled"],
    notificationsSources: !item["notificationsSources"]
      ? item["notificationsSources"]
      : notificationsSourceUnionArrayDeserializer(item["notificationsSources"]),
    notificationsByRole: !item["notificationsByRole"]
      ? item["notificationsByRole"]
      : securityContactPropertiesNotificationsByRoleDeserializer(item["notificationsByRole"]),
  };
}
