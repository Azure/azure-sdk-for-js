// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

/** An alert created in alert management service. */
export interface Alert extends ProxyResource {
  /** Alert property bag */
  properties?: AlertProperties;
}

export function alertDeserializer(item: any): Alert {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : alertPropertiesDeserializer(item["properties"]),
  };
}

/** Alert property bag */
export interface AlertProperties {
  /** This object contains consistent fields across different monitor services. */
  essentials?: Essentials;
  /** Information specific to the monitor service that gives more contextual details about the alert. */
  readonly context?: any;
  /** Config which would be used for displaying the data in portal. */
  readonly egressConfig?: any;
  /** Custom properties that can hold any user defined key-value pairs */
  customProperties?: Record<string, string>;
}

export function alertPropertiesDeserializer(item: any): AlertProperties {
  return {
    essentials: !item["essentials"]
      ? item["essentials"]
      : essentialsDeserializer(item["essentials"]),
    context: item["context"],
    egressConfig: item["egressConfig"],
    customProperties: !item["customProperties"]
      ? item["customProperties"]
      : Object.fromEntries(
          Object.entries(item["customProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** This object contains consistent fields across different monitor services. */
export interface Essentials {
  /** Severity of alert Sev0 being highest and Sev4 being lowest. */
  readonly severity?: Severity;
  /** The type of signal the alert is based on, which could be metrics, logs or activity logs. */
  readonly signalType?: SignalType;
  /** Alert object state, which can be modified by the user. */
  readonly alertState?: AlertState;
  /** Can be 'Fired' or 'Resolved', which represents whether the underlying conditions have crossed the defined alert rule thresholds. */
  readonly monitorCondition?: MonitorCondition;
  /** Target ARM resource, on which alert got created. */
  targetResource?: string;
  /** Name of the target ARM resource name, on which alert got created. */
  targetResourceName?: string;
  /** Resource group of target ARM resource, on which alert got created. */
  targetResourceGroup?: string;
  /** Resource type of target ARM resource, on which alert got created. */
  targetResourceType?: string;
  /** Monitor service on which the rule(monitor) is set. */
  readonly monitorService?: MonitorService;
  /** Rule(monitor) which fired alert instance. Depending on the monitor service,  this would be ARM id or name of the rule. */
  readonly alertRule?: string;
  /** Unique Id created by monitor service for each alert instance. This could be used to track the issue at the monitor service, in case of Nagios, Zabbix, SCOM etc. */
  readonly sourceCreatedId?: string;
  /** Unique Id of the smart group */
  readonly smartGroupId?: string;
  /** Verbose reason describing the reason why this alert instance is added to a smart group */
  readonly smartGroupingReason?: string;
  /** Creation time(ISO-8601 format) of alert instance. */
  readonly startDateTime?: Date;
  /** Last modification time(ISO-8601 format) of alert instance. */
  readonly lastModifiedDateTime?: Date;
  /** Resolved time(ISO-8601 format) of alert instance. This will be updated when monitor service resolves the alert instance because the rule condition is no longer met. */
  readonly monitorConditionResolvedDateTime?: Date;
  /** User who last modified the alert, in case of monitor service updates user would be 'system', otherwise name of the user. */
  readonly lastModifiedUserName?: string;
  /** Action status */
  actionStatus?: ActionStatus;
  /** Alert description. */
  description?: string;
}

export function essentialsDeserializer(item: any): Essentials {
  return {
    severity: item["severity"],
    signalType: item["signalType"],
    alertState: item["alertState"],
    monitorCondition: item["monitorCondition"],
    targetResource: item["targetResource"],
    targetResourceName: item["targetResourceName"],
    targetResourceGroup: item["targetResourceGroup"],
    targetResourceType: item["targetResourceType"],
    monitorService: item["monitorService"],
    alertRule: item["alertRule"],
    sourceCreatedId: item["sourceCreatedId"],
    smartGroupId: item["smartGroupId"],
    smartGroupingReason: item["smartGroupingReason"],
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    monitorConditionResolvedDateTime: !item["monitorConditionResolvedDateTime"]
      ? item["monitorConditionResolvedDateTime"]
      : new Date(item["monitorConditionResolvedDateTime"]),
    lastModifiedUserName: item["lastModifiedUserName"],
    actionStatus: !item["actionStatus"]
      ? item["actionStatus"]
      : actionStatusDeserializer(item["actionStatus"]),
    description: item["description"],
  };
}

/** Known values of {@link Severity} that the service accepts. */
export enum KnownSeverity {
  /** Sev0 */
  Sev0 = "Sev0",
  /** Sev1 */
  Sev1 = "Sev1",
  /** Sev2 */
  Sev2 = "Sev2",
  /** Sev3 */
  Sev3 = "Sev3",
  /** Sev4 */
  Sev4 = "Sev4",
}

/** Type of Severity */
export type Severity = string;

/** The type of signal the alert is based on, which could be metrics, logs or activity logs. */
export enum KnownSignalType {
  /** Metric */
  Metric = "Metric",
  /** Log */
  Log = "Log",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * The type of signal the alert is based on, which could be metrics, logs or activity logs. \
 * {@link KnownSignalType} can be used interchangeably with SignalType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Metric**: Metric \
 * **Log**: Log \
 * **Unknown**: Unknown
 */
export type SignalType = string;

/** Known values of {@link AlertState} that the service accepts. */
export enum KnownAlertState {
  /** New */
  New = "New",
  /** Acknowledged */
  Acknowledged = "Acknowledged",
  /** Closed */
  Closed = "Closed",
}

/** Type of AlertState */
export type AlertState = string;

/** Known values of {@link MonitorCondition} that the service accepts. */
export enum KnownMonitorCondition {
  /** Fired */
  Fired = "Fired",
  /** Resolved */
  Resolved = "Resolved",
}

/** Type of MonitorCondition */
export type MonitorCondition = string;

/** Known values of {@link MonitorService} that the service accepts. */
export enum KnownMonitorService {
  /** Application Insights */
  ApplicationInsights = "Application Insights",
  /** ActivityLog Administrative */
  ActivityLogAdministrative = "ActivityLog Administrative",
  /** ActivityLog Security */
  ActivityLogSecurity = "ActivityLog Security",
  /** ActivityLog Recommendation */
  ActivityLogRecommendation = "ActivityLog Recommendation",
  /** ActivityLog Policy */
  ActivityLogPolicy = "ActivityLog Policy",
  /** ActivityLog Autoscale */
  ActivityLogAutoscale = "ActivityLog Autoscale",
  /** Log Analytics */
  LogAnalytics = "Log Analytics",
  /** Nagios */
  Nagios = "Nagios",
  /** Platform */
  Platform = "Platform",
  /** SCOM */
  Scom = "SCOM",
  /** ServiceHealth */
  ServiceHealth = "ServiceHealth",
  /** SmartDetector */
  SmartDetector = "SmartDetector",
  /** VM Insights */
  VMInsights = "VM Insights",
  /** Zabbix */
  Zabbix = "Zabbix",
  /** Resource Health */
  ResourceHealth = "Resource Health",
}

/** Type of MonitorService */
export type MonitorService = string;

/** Action status */
export interface ActionStatus {
  /** Value indicating whether alert is suppressed. */
  isSuppressed?: boolean;
}

export function actionStatusDeserializer(item: any): ActionStatus {
  return {
    isSuppressed: item["isSuppressed"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

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

/** An error response from the service. */
export interface AlertsManagementErrorResponse {
  /** Details of error response. */
  error?: ErrorResponseBody;
}

export function alertsManagementErrorResponseDeserializer(
  item: any,
): AlertsManagementErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorResponseBodyDeserializer(item["error"]),
  };
}

/** Details of error response. */
export interface ErrorResponseBody {
  /** Error code, intended to be consumed programmatically. */
  code?: string;
  /** Description of the error, intended for display in user interface. */
  message?: string;
  /** Target of the particular error, for example name of the property. */
  target?: string;
  /** A list of additional details about the error. */
  details?: ErrorResponseBody[];
}

export function errorResponseBodyDeserializer(item: any): ErrorResponseBody {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : errorResponseBodyArrayDeserializer(item["details"]),
  };
}

export function errorResponseBodyArrayDeserializer(result: Array<ErrorResponseBody>): any[] {
  return result.map((item) => {
    return errorResponseBodyDeserializer(item);
  });
}

/** Alert Modification details */
export interface AlertModification extends ProxyResource_1 {
  /** Alert modification history properties. */
  properties?: AlertModificationProperties;
}

export function alertModificationDeserializer(item: any): AlertModification {
  return {
    id: item["id"],
    type: item["type"],
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : alertModificationPropertiesDeserializer(item["properties"]),
  };
}

/** Alert modification history properties. */
export interface AlertModificationProperties {
  /** Unique identifier of the alert. */
  readonly alertId?: string;
  /** Array of alert modification events. */
  modifications?: AlertModificationItem[];
}

export function alertModificationPropertiesDeserializer(item: any): AlertModificationProperties {
  return {
    alertId: item["alertId"],
    modifications: !item["modifications"]
      ? item["modifications"]
      : alertModificationItemArrayDeserializer(item["modifications"]),
  };
}

export function alertModificationItemArrayDeserializer(
  result: Array<AlertModificationItem>,
): any[] {
  return result.map((item) => {
    return alertModificationItemDeserializer(item);
  });
}

/** Alert modification item. */
export interface AlertModificationItem {
  /** Reason for the modification */
  modificationEvent?: AlertModificationEvent;
  /** Old value */
  oldValue?: string;
  /** New value */
  newValue?: string;
  /** Modified date and time */
  modifiedAt?: string;
  /** Modified user details (Principal client name) */
  modifiedBy?: string;
  /** Modification comments */
  comments?: string;
  /** Description of the modification */
  description?: string;
  /** Base details class. */
  details?: BaseDetailsUnion;
}

export function alertModificationItemDeserializer(item: any): AlertModificationItem {
  return {
    modificationEvent: item["modificationEvent"],
    oldValue: item["oldValue"],
    newValue: item["newValue"],
    modifiedAt: item["modifiedAt"],
    modifiedBy: item["modifiedBy"],
    comments: item["comments"],
    description: item["description"],
    details: !item["details"] ? item["details"] : baseDetailsUnionDeserializer(item["details"]),
  };
}

/** Reason for the modification */
export type AlertModificationEvent =
  | "AlertCreated"
  | "StateChange"
  | "SeverityChange"
  | "MonitorConditionChange"
  | "ActionsTriggered"
  | "ActionsSuppressed";

/** Base details class. */
export interface BaseDetails {
  /** Type of modification details */
  /** The discriminator possible values: PropertyChange, ActionsSuppressed, ActionsTriggered */
  type: AlertModificationType;
}

export function baseDetailsDeserializer(item: any): BaseDetails {
  return {
    type: item["type"],
  };
}

/** Alias for BaseDetailsUnion */
export type BaseDetailsUnion =
  | PropertyChangeDetails
  | ActionSuppressedDetails
  | ActionTriggeredDetails
  | BaseDetails;

export function baseDetailsUnionDeserializer(item: any): BaseDetailsUnion {
  switch (item["type"]) {
    case "PropertyChange":
      return propertyChangeDetailsDeserializer(item as PropertyChangeDetails);

    case "ActionsSuppressed":
      return actionSuppressedDetailsDeserializer(item as ActionSuppressedDetails);

    case "ActionsTriggered":
      return actionTriggeredDetailsDeserializer(item as ActionTriggeredDetails);

    default:
      return baseDetailsDeserializer(item);
  }
}

/** Type of modification details */
export enum KnownAlertModificationType {
  /** PropertyChange */
  PropertyChange = "PropertyChange",
  /** ActionsSuppressed */
  ActionsSuppressed = "ActionsSuppressed",
  /** ActionsTriggered */
  ActionsTriggered = "ActionsTriggered",
}

/**
 * Type of modification details \
 * {@link KnownAlertModificationType} can be used interchangeably with AlertModificationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PropertyChange**: PropertyChange \
 * **ActionsSuppressed**: ActionsSuppressed \
 * **ActionsTriggered**: ActionsTriggered
 */
export type AlertModificationType = string;

/** model interface PropertyChangeDetails */
export interface PropertyChangeDetails extends BaseDetails {
  /** The value before the change */
  oldValue?: string;
  /** The value after the change */
  newValue?: string;
  /** The comment */
  comment?: string;
  /** Type of modification details */
  type: "PropertyChange";
}

export function propertyChangeDetailsDeserializer(item: any): PropertyChangeDetails {
  return {
    type: item["type"],
    oldValue: item["oldValue"],
    newValue: item["newValue"],
    comment: item["comment"],
  };
}

/** model interface ActionSuppressedDetails */
export interface ActionSuppressedDetails extends BaseDetails {
  /** List of suppression action rules */
  suppressionActionRules?: string[];
  /** List of suppressed action groups */
  suppressedActionGroups?: TriggeredRule[];
  /** Type of modification details */
  type: "ActionsSuppressed";
}

export function actionSuppressedDetailsDeserializer(item: any): ActionSuppressedDetails {
  return {
    type: item["type"],
    suppressionActionRules: !item["suppressionActionRules"]
      ? item["suppressionActionRules"]
      : item["suppressionActionRules"].map((p: any) => {
          return p;
        }),
    suppressedActionGroups: !item["suppressedActionGroups"]
      ? item["suppressedActionGroups"]
      : triggeredRuleArrayDeserializer(item["suppressedActionGroups"]),
  };
}

export function triggeredRuleArrayDeserializer(result: Array<TriggeredRule>): any[] {
  return result.map((item) => {
    return triggeredRuleDeserializer(item);
  });
}

/** model interface TriggeredRule */
export interface TriggeredRule {
  /** The action group ID */
  actionGroupId?: string;
  /** The rule ID */
  ruleId?: string;
  /** The rule type */
  ruleType?: RuleType;
}

export function triggeredRuleDeserializer(item: any): TriggeredRule {
  return {
    actionGroupId: item["actionGroupId"],
    ruleId: item["ruleId"],
    ruleType: item["ruleType"],
  };
}

/** The rule type */
export enum KnownRuleType {
  /** AlertRule */
  AlertRule = "AlertRule",
  /** ActionRule */
  ActionRule = "ActionRule",
}

/**
 * The rule type \
 * {@link KnownRuleType} can be used interchangeably with RuleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AlertRule**: AlertRule \
 * **ActionRule**: ActionRule
 */
export type RuleType = string;

/** model interface ActionTriggeredDetails */
export interface ActionTriggeredDetails extends BaseDetails {
  /** The action group that was triggered */
  actionGroup?: TriggeredRule;
  /** The result of the notification delivery */
  notificationResult?: NotificationResult;
  /** Type of modification details */
  type: "ActionsTriggered";
}

export function actionTriggeredDetailsDeserializer(item: any): ActionTriggeredDetails {
  return {
    type: item["type"],
    actionGroup: !item["actionGroup"]
      ? item["actionGroup"]
      : triggeredRuleDeserializer(item["actionGroup"]),
    notificationResult: !item["notificationResult"]
      ? item["notificationResult"]
      : notificationResultDeserializer(item["notificationResult"]),
  };
}

/** model interface NotificationResult */
export interface NotificationResult {
  /** URL endpoint for checking notification delivery status. Only populated when status is 'Inline'. */
  statusURL?: string;
  /** The status of the notification */
  status?: ResultStatus;
}

export function notificationResultDeserializer(item: any): NotificationResult {
  return {
    statusURL: item["statusURL"],
    status: item["status"],
  };
}

/** The status of the notification */
export enum KnownResultStatus {
  /** None */
  None = "None",
  /** Inline */
  Inline = "Inline",
  /** Throttled */
  Throttled = "Throttled",
  /** Failed */
  Failed = "Failed",
  /** ThrottledByAlertRule */
  ThrottledByAlertRule = "ThrottledByAlertRule",
  /** ThrottledBySubscription */
  ThrottledBySubscription = "ThrottledBySubscription",
}

/**
 * The status of the notification \
 * {@link KnownResultStatus} can be used interchangeably with ResultStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Inline**: Inline \
 * **Throttled**: Throttled \
 * **Failed**: Failed \
 * **ThrottledByAlertRule**: ThrottledByAlertRule \
 * **ThrottledBySubscription**: ThrottledBySubscription
 */
export type ResultStatus = string;

/** An azure resource object */
export interface ProxyResource_1 {
  /** Azure resource Id */
  readonly id?: string;
  /** Azure resource type */
  readonly type?: string;
  /** Azure resource name */
  readonly name?: string;
}

export function proxyResourceDeserializer_1(item: any): ProxyResource_1 {
  return {
    id: item["id"],
    type: item["type"],
    name: item["name"],
  };
}

/** Change alert state reason */
export interface Comments {
  comments?: string;
}

export function commentsSerializer(item: Comments): any {
  return { comments: item["comments"] };
}

/** List the alerts. */
export interface _AlertsList {
  /** The Alert items on this page */
  value: Alert[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _alertsListDeserializer(item: any): _AlertsList {
  return {
    value: alertArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function alertArrayDeserializer(result: Array<Alert>): any[] {
  return result.map((item) => {
    return alertDeserializer(item);
  });
}

/** List the alert's enrichments. */
export interface _AlertEnrichmentsList {
  /** The AlertEnrichmentResponse items on this page */
  value: AlertEnrichmentResponse[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _alertEnrichmentsListDeserializer(item: any): _AlertEnrichmentsList {
  return {
    value: alertEnrichmentResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function alertEnrichmentResponseArrayDeserializer(
  result: Array<AlertEnrichmentResponse>,
): any[] {
  return result.map((item) => {
    return alertEnrichmentResponseDeserializer(item);
  });
}

/** The alert's enrichments. */
export interface AlertEnrichmentResponse extends ProxyResource {
  /** Properties of the alert enrichment item. */
  properties?: AlertEnrichmentProperties;
}

export function alertEnrichmentResponseDeserializer(item: any): AlertEnrichmentResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : alertEnrichmentPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the alert enrichment item. */
export interface AlertEnrichmentProperties {
  /** Unique Id (GUID) of the alert for which the enrichments are being retrieved. */
  readonly alertId?: string;
  /** Enrichment details */
  enrichments?: AlertEnrichmentItemUnion[];
}

export function alertEnrichmentPropertiesDeserializer(item: any): AlertEnrichmentProperties {
  return {
    alertId: item["alertId"],
    enrichments: !item["enrichments"]
      ? item["enrichments"]
      : alertEnrichmentItemUnionArrayDeserializer(item["enrichments"]),
  };
}

export function alertEnrichmentItemUnionArrayDeserializer(
  result: Array<AlertEnrichmentItemUnion>,
): any[] {
  return result.map((item) => {
    return alertEnrichmentItemUnionDeserializer(item);
  });
}

/** Alert enrichment item. */
export interface AlertEnrichmentItem {
  /** The enrichment title. */
  title: string;
  /** The enrichment description. */
  description: string;
  /** The status of the evaluation of the enrichment. */
  status: Status;
  /** The error message. Will be present only if the status is 'Failed'. */
  errorMessage?: string;
  /** The enrichment type. */
  /** The discriminator possible values: PrometheusEnrichmentItem, PrometheusInstantQuery, PrometheusRangeQuery */
  type: Type;
}

export function alertEnrichmentItemDeserializer(item: any): AlertEnrichmentItem {
  return {
    title: item["title"],
    description: item["description"],
    status: item["status"],
    errorMessage: item["errorMessage"],
    type: item["type"],
  };
}

/** Alias for AlertEnrichmentItemUnion */
export type AlertEnrichmentItemUnion = PrometheusEnrichmentItemUnion | AlertEnrichmentItem;

export function alertEnrichmentItemUnionDeserializer(item: any): AlertEnrichmentItemUnion {
  switch (item["type"]) {
    case "PrometheusEnrichmentItem":
    case "PrometheusInstantQuery":
    case "PrometheusRangeQuery":
      return prometheusEnrichmentItemUnionDeserializer(item as PrometheusEnrichmentItemUnion);

    default:
      return alertEnrichmentItemDeserializer(item);
  }
}

/** The status of the evaluation of the enrichment. */
export enum KnownStatus {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
}

/**
 * The status of the evaluation of the enrichment. \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed
 */
export type Status = string;

/** The enrichment type. */
export enum KnownType {
  /** PrometheusInstantQuery */
  PrometheusInstantQuery = "PrometheusInstantQuery",
  /** PrometheusRangeQuery */
  PrometheusRangeQuery = "PrometheusRangeQuery",
  /** PrometheusEnrichmentItem */
  PrometheusEnrichmentItem = "PrometheusEnrichmentItem",
}

/**
 * The enrichment type. \
 * {@link KnownType} can be used interchangeably with Type,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PrometheusInstantQuery**: PrometheusInstantQuery \
 * **PrometheusRangeQuery**: PrometheusRangeQuery \
 * **PrometheusEnrichmentItem**: PrometheusEnrichmentItem
 */
export type Type = string;

/** Prometheus enrichment object. */
export interface PrometheusEnrichmentItem extends AlertEnrichmentItem {
  /** Link to Prometheus query API (Url format). */
  linkToApi: string;
  /** An array of the azure monitor workspace resource ids. */
  datasources: string[];
  /** Partial link to the Grafana explore API. */
  grafanaExplorePath: string;
  /** The Prometheus expression query. */
  query: string;
  type: "PrometheusEnrichmentItem" | "PrometheusInstantQuery" | "PrometheusRangeQuery";
}

export function prometheusEnrichmentItemDeserializer(item: any): PrometheusEnrichmentItem {
  return {
    title: item["title"],
    description: item["description"],
    status: item["status"],
    errorMessage: item["errorMessage"],
    type: item["type"],
    linkToApi: item["linkToApi"],
    datasources: item["datasources"].map((p: any) => {
      return p;
    }),
    grafanaExplorePath: item["grafanaExplorePath"],
    query: item["query"],
  };
}

/** Alias for PrometheusEnrichmentItemUnion */
export type PrometheusEnrichmentItemUnion =
  | PrometheusInstantQuery
  | PrometheusRangeQuery
  | PrometheusEnrichmentItem;

export function prometheusEnrichmentItemUnionDeserializer(
  item: any,
): PrometheusEnrichmentItemUnion {
  switch (item["type"]) {
    case "PrometheusInstantQuery":
      return prometheusInstantQueryDeserializer(item as PrometheusInstantQuery);

    case "PrometheusRangeQuery":
      return prometheusRangeQueryDeserializer(item as PrometheusRangeQuery);

    default:
      return prometheusEnrichmentItemDeserializer(item);
  }
}

/** Prometheus instant query enrichment object. */
export interface PrometheusInstantQuery extends PrometheusEnrichmentItem {
  /** The date and the time of the evaluation. */
  time: string;
  /** The enrichment type. */
  type: "PrometheusInstantQuery";
}

export function prometheusInstantQueryDeserializer(item: any): PrometheusInstantQuery {
  return {
    linkToApi: item["linkToApi"],
    datasources: item["datasources"].map((p: any) => {
      return p;
    }),
    grafanaExplorePath: item["grafanaExplorePath"],
    query: item["query"],
    type: item["type"],
    title: item["title"],
    description: item["description"],
    status: item["status"],
    errorMessage: item["errorMessage"],
    time: item["time"],
  };
}

/** Prometheus instant query enrichment object. */
export interface PrometheusRangeQuery extends PrometheusEnrichmentItem {
  /** The start evaluation date and time in ISO8601 format. */
  start: Date;
  /** The end evaluation date and time in ISO8601 format. */
  end: Date;
  /** Query resolution step width in ISO8601 format. */
  step: string;
  /** The enrichment type. */
  type: "PrometheusRangeQuery";
}

export function prometheusRangeQueryDeserializer(item: any): PrometheusRangeQuery {
  return {
    linkToApi: item["linkToApi"],
    datasources: item["datasources"].map((p: any) => {
      return p;
    }),
    grafanaExplorePath: item["grafanaExplorePath"],
    query: item["query"],
    type: item["type"],
    title: item["title"],
    description: item["description"],
    status: item["status"],
    errorMessage: item["errorMessage"],
    start: new Date(item["start"]),
    end: new Date(item["end"]),
    step: item["step"],
  };
}

/** alert meta data information. */
export interface AlertsMetaData {
  /** alert meta data property bag */
  properties?: AlertsMetaDataPropertiesUnion;
}

export function alertsMetaDataDeserializer(item: any): AlertsMetaData {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : alertsMetaDataPropertiesUnionDeserializer(item["properties"]),
  };
}

/** alert meta data property bag */
export interface AlertsMetaDataProperties {
  /** Identification of the information to be retrieved by API call */
  /** The discriminator possible values: MonitorServiceList */
  metadataIdentifier: MetadataIdentifier;
}

export function alertsMetaDataPropertiesDeserializer(item: any): AlertsMetaDataProperties {
  return {
    metadataIdentifier: item["metadataIdentifier"],
  };
}

/** Alias for AlertsMetaDataPropertiesUnion */
export type AlertsMetaDataPropertiesUnion = MonitorServiceList | AlertsMetaDataProperties;

export function alertsMetaDataPropertiesUnionDeserializer(
  item: any,
): AlertsMetaDataPropertiesUnion {
  switch (item["metadataIdentifier"]) {
    case "MonitorServiceList":
      return monitorServiceListDeserializer(item as MonitorServiceList);

    default:
      return alertsMetaDataPropertiesDeserializer(item);
  }
}

/** Identification of the information to be retrieved by API call */
export enum KnownMetadataIdentifier {
  /** MonitorServiceList */
  MonitorServiceList = "MonitorServiceList",
}

/**
 * Identification of the information to be retrieved by API call \
 * {@link KnownMetadataIdentifier} can be used interchangeably with MetadataIdentifier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MonitorServiceList**: MonitorServiceList
 */
export type MetadataIdentifier = string;

/** Monitor service details */
export interface MonitorServiceList extends AlertsMetaDataProperties {
  /** Array of operations */
  data: MonitorServiceDetails[];
  /** Identification of the information to be retrieved by API call */
  metadataIdentifier: "MonitorServiceList";
}

export function monitorServiceListDeserializer(item: any): MonitorServiceList {
  return {
    metadataIdentifier: item["metadataIdentifier"],
    data: monitorServiceDetailsArrayDeserializer(item["data"]),
  };
}

export function monitorServiceDetailsArrayDeserializer(
  result: Array<MonitorServiceDetails>,
): any[] {
  return result.map((item) => {
    return monitorServiceDetailsDeserializer(item);
  });
}

/** Details of a monitor service */
export interface MonitorServiceDetails {
  /** Monitor service name */
  name?: string;
  /** Monitor service display name */
  displayName?: string;
}

export function monitorServiceDetailsDeserializer(item: any): MonitorServiceDetails {
  return {
    name: item["name"],
    displayName: item["displayName"],
  };
}

/** Summary of alerts based on the input filters and 'groupby' parameters. */
export interface AlertsSummary extends ProxyResource_1 {
  /** Group the result set. */
  properties?: AlertsSummaryGroup;
}

export function alertsSummaryDeserializer(item: any): AlertsSummary {
  return {
    id: item["id"],
    type: item["type"],
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : alertsSummaryGroupDeserializer(item["properties"]),
  };
}

/** Group the result set. */
export interface AlertsSummaryGroup {
  /** Total count of the result set. */
  total?: number;
  /** Total count of the smart groups. */
  smartGroupsCount?: number;
  /** Name of the field aggregated */
  groupedby?: string;
  /** List of the items */
  values?: AlertsSummaryGroupItem[];
}

export function alertsSummaryGroupDeserializer(item: any): AlertsSummaryGroup {
  return {
    total: item["total"],
    smartGroupsCount: item["smartGroupsCount"],
    groupedby: item["groupedby"],
    values: !item["values"]
      ? item["values"]
      : alertsSummaryGroupItemArrayDeserializer(item["values"]),
  };
}

export function alertsSummaryGroupItemArrayDeserializer(
  result: Array<AlertsSummaryGroupItem>,
): any[] {
  return result.map((item) => {
    return alertsSummaryGroupItemDeserializer(item);
  });
}

/** Alerts summary group item */
export interface AlertsSummaryGroupItem {
  /** Value of the aggregated field */
  name?: string;
  /** Count of the aggregated field */
  count?: number;
  /** Name of the field aggregated */
  groupedby?: string;
  /** List of the items */
  values?: AlertsSummaryGroupItem[];
}

export function alertsSummaryGroupItemDeserializer(item: any): AlertsSummaryGroupItem {
  return {
    name: item["name"],
    count: item["count"],
    groupedby: item["groupedby"],
    values: !item["values"]
      ? item["values"]
      : alertsSummaryGroupItemArrayDeserializer(item["values"]),
  };
}

/** Known values of {@link AlertsSortByFields} that the service accepts. */
export enum KnownAlertsSortByFields {
  /** name */
  Name = "name",
  /** severity */
  Severity = "severity",
  /** alertState */
  AlertState = "alertState",
  /** monitorCondition */
  MonitorCondition = "monitorCondition",
  /** targetResource */
  TargetResource = "targetResource",
  /** targetResourceName */
  TargetResourceName = "targetResourceName",
  /** targetResourceGroup */
  TargetResourceGroup = "targetResourceGroup",
  /** targetResourceType */
  TargetResourceType = "targetResourceType",
  /** startDateTime */
  StartDateTime = "startDateTime",
  /** lastModifiedDateTime */
  LastModifiedDateTime = "lastModifiedDateTime",
}

/** Type of AlertsSortByFields */
export type AlertsSortByFields = string;

/** Known values of {@link SortOrder} that the service accepts. */
export enum KnownSortOrder {
  /** asc */
  Asc = "asc",
  /** desc */
  Desc = "desc",
}

/** Type of SortOrder */
export type SortOrder = string;

/** Known values of {@link TimeRange} that the service accepts. */
export enum KnownTimeRange {
  /** 1h */
  _1H = "1h",
  /** 1d */
  _1D = "1d",
  /** 7d */
  _7D = "7d",
  /** 30d */
  _30D = "30d",
}

/** Type of TimeRange */
export type TimeRange = string;

/** Known values of {@link Identifier} that the service accepts. */
export enum KnownIdentifier {
  /** MonitorServiceList */
  MonitorServiceList = "MonitorServiceList",
}

/** Type of Identifier */
export type Identifier = string;

/** Known values of {@link AlertsSummaryGroupByFields} that the service accepts. */
export enum KnownAlertsSummaryGroupByFields {
  /** severity */
  Severity = "severity",
  /** alertState */
  AlertState = "alertState",
  /** monitorCondition */
  MonitorCondition = "monitorCondition",
  /** monitorService */
  MonitorService = "monitorService",
  /** signalType */
  SignalType = "signalType",
  /** alertRule */
  AlertRule = "alertRule",
}

/** Type of AlertsSummaryGroupByFields */
export type AlertsSummaryGroupByFields = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-05-25-preview API version. */
  V20250525Preview = "2025-05-25-preview",
}
