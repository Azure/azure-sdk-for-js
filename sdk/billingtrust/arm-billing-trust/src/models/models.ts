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

/** A billing trust assessment. An assessment runs a set of rules to evaluate trust attributes of a billing account. The assessment is a singleton per parent resource and is always named 'default'. Re-issuing PUT with the same `assessmentType` is idempotent; changing `assessmentType` after the assessment exists is not supported. */
export interface Assessment extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: AssessmentProperties;
}

export function assessmentSerializer(item: Assessment): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : assessmentPropertiesSerializer(item["properties"]),
  };
}

export function assessmentDeserializer(item: any): Assessment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : assessmentPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of an Assessment resource */
export interface AssessmentProperties {
  /** The name of the assessment template whose rules will be evaluated (e.g. 'Edu'). Immutable after creation. */
  assessmentType: AssessmentType;
  /** The aggregated evaluation state of all active rules within this assessment */
  readonly evaluationState?: AssessmentState;
  /** The next scheduled re-evaluation of this assessment. Only present when one or more rules in this assessment have a configured recurrence. */
  readonly nextEvaluation?: Date;
  /** Error information when evaluationState is failed */
  readonly error?: ErrorDetail;
  /** Optional initial values applied to the rules created with this assessment. Write-only — these values are routed to the per-kind rules and are not returned on read. */
  initialValues?: InitialRuleValueBaseUnion[];
  /** The provisioning state of the resource */
  readonly provisioningState?: ProvisioningState;
}

export function assessmentPropertiesSerializer(item: AssessmentProperties): any {
  return {
    assessmentType: item["assessmentType"],
    initialValues: !item["initialValues"]
      ? item["initialValues"]
      : initialRuleValueBaseUnionArraySerializer(item["initialValues"]),
  };
}

export function assessmentPropertiesDeserializer(item: any): AssessmentProperties {
  return {
    assessmentType: item["assessmentType"],
    evaluationState: item["evaluationState"],
    nextEvaluation: !item["nextEvaluation"]
      ? item["nextEvaluation"]
      : new Date(item["nextEvaluation"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    initialValues: !item["initialValues"]
      ? item["initialValues"]
      : initialRuleValueBaseUnionArrayDeserializer(item["initialValues"]),
    provisioningState: item["provisioningState"],
  };
}

/** Assessment template name. Each template defines a fixed set of rules and their configuration. The list of templates may be extended in future API versions. */
export enum KnownAssessmentType {
  /** Education qualification assessment. Verifies that the billing account qualifies for education programs based on customer-supplied domains. */
  Edu = "Edu",
  /** Business verification assessment. Verifies the billing account's business identity against the sold-to information on file. */
  BusinessVerification = "BusinessVerification",
  /** Payee enrollment assessment. Verifies a billing account is eligible to enroll as a payee. Rule names within this template may change between API versions — iterate `rules` via LIST rather than addressing rules by name. */
  PayeeEnrollment = "PayeeEnrollment",
  /** Payee profile assessment. Verifies the payee profile associated with a billing account. Rule names within this template may change between API versions — iterate `rules` via LIST rather than addressing rules by name. */
  PayeeProfile = "PayeeProfile",
}

/**
 * Assessment template name. Each template defines a fixed set of rules and their configuration. The list of templates may be extended in future API versions. \
 * {@link KnownAssessmentType} can be used interchangeably with AssessmentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Edu**: Education qualification assessment. Verifies that the billing account qualifies for education programs based on customer-supplied domains. \
 * **BusinessVerification**: Business verification assessment. Verifies the billing account's business identity against the sold-to information on file. \
 * **PayeeEnrollment**: Payee enrollment assessment. Verifies a billing account is eligible to enroll as a payee. Rule names within this template may change between API versions — iterate `rules` via LIST rather than addressing rules by name. \
 * **PayeeProfile**: Payee profile assessment. Verifies the payee profile associated with a billing account. Rule names within this template may change between API versions — iterate `rules` via LIST rather than addressing rules by name.
 */
export type AssessmentType = string;

/** The aggregated evaluation state of an assessment, derived from its rules */
export enum KnownAssessmentState {
  /** One or more rules have not reached a steady state */
  Pending = "pending",
  /** One or more rules are currently being evaluated */
  Running = "running",
  /** One or more rules require user action */
  ActionRequired = "actionRequired",
  /** One or more rules require manual review */
  UnderReview = "underReview",
  /** All rules reached a steady state, and the last non-skipped rule failed */
  Failed = "failed",
  /** All rules reached a steady state, and the last non-skipped rule succeeded */
  Succeeded = "succeeded",
  /** Assessment succeeded but with a manual override applied by operations */
  SucceededWithOverride = "succeededWithOverride",
  /** Assessment failed but with a manual override applied by operations */
  FailedWithOverride = "failedWithOverride",
  /** Assessment expired and requires re-evaluation */
  Expired = "expired",
}

/**
 * The aggregated evaluation state of an assessment, derived from its rules \
 * {@link KnownAssessmentState} can be used interchangeably with AssessmentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **pending**: One or more rules have not reached a steady state \
 * **running**: One or more rules are currently being evaluated \
 * **actionRequired**: One or more rules require user action \
 * **underReview**: One or more rules require manual review \
 * **failed**: All rules reached a steady state, and the last non-skipped rule failed \
 * **succeeded**: All rules reached a steady state, and the last non-skipped rule succeeded \
 * **succeededWithOverride**: Assessment succeeded but with a manual override applied by operations \
 * **failedWithOverride**: Assessment failed but with a manual override applied by operations \
 * **expired**: Assessment expired and requires re-evaluation
 */
export type AssessmentState = string;

export function initialRuleValueBaseUnionArraySerializer(
  result: Array<InitialRuleValueBaseUnion>,
): any[] {
  return result.map((item) => {
    return initialRuleValueBaseUnionSerializer(item);
  });
}

export function initialRuleValueBaseUnionArrayDeserializer(
  result: Array<InitialRuleValueBaseUnion>,
): any[] {
  return result.map((item) => {
    return initialRuleValueBaseUnionDeserializer(item);
  });
}

/** Base type for write-only initial values supplied when creating an assessment. Polymorphic by `kind`; per-kind initial values forward into the corresponding rule. */
export interface InitialRuleValueBase {
  /** The kind of rule to initialize */
  /** The discriminator possible values: eduQualification */
  kind: RuleKind;
}

export function initialRuleValueBaseSerializer(item: InitialRuleValueBase): any {
  return { kind: item["kind"] };
}

export function initialRuleValueBaseDeserializer(item: any): InitialRuleValueBase {
  return {
    kind: item["kind"],
  };
}

/** Alias for InitialRuleValueBaseUnion */
export type InitialRuleValueBaseUnion = EduInitialValue | InitialRuleValueBase;

export function initialRuleValueBaseUnionSerializer(item: InitialRuleValueBaseUnion): any {
  switch (item.kind) {
    case "eduQualification":
      return eduInitialValueSerializer(item as EduInitialValue);

    default:
      return initialRuleValueBaseSerializer(item);
  }
}

export function initialRuleValueBaseUnionDeserializer(item: any): InitialRuleValueBaseUnion {
  switch (item["kind"]) {
    case "eduQualification":
      return eduInitialValueDeserializer(item as EduInitialValue);

    default:
      return initialRuleValueBaseDeserializer(item);
  }
}

/** The kind of rule. Additional kinds may be added in future API versions. */
export enum KnownRuleKind {
  /** Education qualification rule. Verifies education-domain ownership for the billing account. */
  EduQualification = "eduQualification",
  /** Business verification rule. Verifies the business identity of the billing account. */
  BusinessVerification = "businessVerification",
}

/**
 * The kind of rule. Additional kinds may be added in future API versions. \
 * {@link KnownRuleKind} can be used interchangeably with RuleKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **eduQualification**: Education qualification rule. Verifies education-domain ownership for the billing account. \
 * **businessVerification**: Business verification rule. Verifies the business identity of the billing account.
 */
export type RuleKind = string;

/** Initial values for an education qualification rule. Per-domain entries (`domainNames` + `tenantId`) are used to populate the rule when the assessment is created. */
export interface EduInitialValue extends InitialRuleValueBase {
  kind: "eduQualification";
  /** Per-domain entries to use when populating the education qualification rule. Only `domainNames` and `tenantId` are read from this payload; `state` and `error` on each entry are populated by the service. */
  domains: DomainEntry[];
}

export function eduInitialValueSerializer(item: EduInitialValue): any {
  return { kind: item["kind"], domains: domainEntryArraySerializer(item["domains"]) };
}

export function eduInitialValueDeserializer(item: any): EduInitialValue {
  return {
    kind: item["kind"],
    domains: domainEntryArrayDeserializer(item["domains"]),
  };
}

export function domainEntryArraySerializer(result: Array<DomainEntry>): any[] {
  return result.map((item) => {
    return domainEntrySerializer(item);
  });
}

export function domainEntryArrayDeserializer(result: Array<DomainEntry>): any[] {
  return result.map((item) => {
    return domainEntryDeserializer(item);
  });
}

/** A domain entry within an education qualification rule. `domainNames` and `tenantId` are supplied on creation; `state` and `error` are returned by the service. */
export interface DomainEntry {
  /** Domain names associated with a tenant. */
  domainNames: string[];
  /** The Microsoft Entra tenant ID owning these domains. Defaults to the calling user's tenant when omitted. */
  tenantId?: string;
  /** The verification state of this domain entry. Server-managed. */
  readonly state?: DomainEntryState;
  /** Error detail when state is `failed` or `actionRequired`. Omitted otherwise. Server-managed. */
  readonly error?: ErrorDetail;
}

export function domainEntrySerializer(item: DomainEntry): any {
  return {
    domainNames: item["domainNames"].map((p: any) => {
      return p;
    }),
    tenantId: item["tenantId"],
  };
}

export function domainEntryDeserializer(item: any): DomainEntry {
  return {
    domainNames: item["domainNames"].map((p: any) => {
      return p;
    }),
    tenantId: item["tenantId"],
    state: item["state"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The verification state of a single domain entry within an eduQualification rule */
export enum KnownDomainEntryState {
  /** Domain verification queued or in progress */
  Pending = "pending",
  /** Customer must supply additional evidence (e.g. supplemental documents) */
  ActionRequired = "actionRequired",
  /** Domain verification failed */
  Failed = "failed",
  /** Domain verification succeeded */
  Succeeded = "succeeded",
}

/**
 * The verification state of a single domain entry within an eduQualification rule \
 * {@link KnownDomainEntryState} can be used interchangeably with DomainEntryState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **pending**: Domain verification queued or in progress \
 * **actionRequired**: Customer must supply additional evidence (e.g. supplemental documents) \
 * **failed**: Domain verification failed \
 * **succeeded**: Domain verification succeeded
 */
export type DomainEntryState = string;

/** The status of the current operation */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The resource is being provisioned */
  Provisioning = "Provisioning",
  /** The resource is updating */
  Updating = "Updating",
  /** The resource create request has been accepted */
  Accepted = "Accepted",
}

/**
 * The status of the current operation \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Provisioning**: The resource is being provisioned \
 * **Updating**: The resource is updating \
 * **Accepted**: The resource create request has been accepted
 */
export type ProvisioningState = string;

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

export function extensionResourceSerializer(_item: ExtensionResource): any {
  return {};
}

export function extensionResourceDeserializer(item: any): ExtensionResource {
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

/** The response of a Assessment list operation. */
export interface _AssessmentListResult {
  /** The Assessment items on this page */
  value: Assessment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _assessmentListResultDeserializer(item: any): _AssessmentListResult {
  return {
    value: assessmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function assessmentArraySerializer(result: Array<Assessment>): any[] {
  return result.map((item) => {
    return assessmentSerializer(item);
  });
}

export function assessmentArrayDeserializer(result: Array<Assessment>): any[] {
  return result.map((item) => {
    return assessmentDeserializer(item);
  });
}

/** Response containing an upload token for supplemental document uploads */
export interface GenerateUploadTokenResponse {
  /** The time-bound, principal-bound upload token */
  token: string;
}

export function generateUploadTokenResponseDeserializer(item: any): GenerateUploadTokenResponse {
  return {
    token: item["token"],
  };
}

/** A rule within an assessment */
export interface Rule extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: RulePropertiesUnion;
}

export function ruleSerializer(item: Rule): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : rulePropertiesUnionSerializer(item["properties"]),
  };
}

export function ruleDeserializer(item: any): Rule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : rulePropertiesUnionDeserializer(item["properties"]),
  };
}

/** Base properties of a Rule resource. Polymorphic by `kind` — kind-specific writable fields live on derived models. */
export interface RuleProperties {
  /** The kind of rule. Acts as a discriminator for kind-specific properties. */
  /** The discriminator possible values: eduQualification, businessVerification */
  readonly kind: RuleKind;
  /** The evaluation state of the rule. Server-managed. */
  readonly evaluationState?: RuleState;
  /** Error information when evaluationState is `failed` or `actionRequired`. Server-managed. */
  readonly error?: ErrorDetail;
  /** The provisioning state of the resource */
  readonly provisioningState?: ProvisioningState;
}

export function rulePropertiesSerializer(_item: RuleProperties): any {
  return {};
}

export function rulePropertiesDeserializer(item: any): RuleProperties {
  return {
    kind: item["kind"],
    evaluationState: item["evaluationState"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    provisioningState: item["provisioningState"],
  };
}

/** Alias for RulePropertiesUnion */
export type RulePropertiesUnion =
  EduQualificationRuleProperties | BusinessVerificationRuleProperties | RuleProperties;

export function rulePropertiesUnionSerializer(item: RulePropertiesUnion): any {
  switch (item.kind) {
    case "eduQualification":
      return eduQualificationRulePropertiesSerializer(item as EduQualificationRuleProperties);

    case "businessVerification":
      return businessVerificationRulePropertiesSerializer(
        item as BusinessVerificationRuleProperties,
      );

    default:
      return rulePropertiesSerializer(item);
  }
}

export function rulePropertiesUnionDeserializer(item: any): RulePropertiesUnion {
  switch (item["kind"]) {
    case "eduQualification":
      return eduQualificationRulePropertiesDeserializer(item as EduQualificationRuleProperties);

    case "businessVerification":
      return businessVerificationRulePropertiesDeserializer(
        item as BusinessVerificationRuleProperties,
      );

    default:
      return rulePropertiesDeserializer(item);
  }
}

/** The evaluation state of a rule */
export enum KnownRuleState {
  /** Rule is queued and not yet evaluated */
  Pending = "pending",
  /** Rule evaluation is in progress */
  Running = "running",
  /** Customer input is required to proceed */
  ActionRequired = "actionRequired",
  /** Operations review is in progress */
  UnderReview = "underReview",
  /** Rule preconditions (runAfter) were not met; rule was skipped */
  Skipped = "skipped",
  /** Rule evaluation failed */
  Failed = "failed",
  /** Rule evaluation succeeded */
  Succeeded = "succeeded",
  /** Rule succeeded but with a manual override applied by operations */
  SucceededWithOverride = "succeededWithOverride",
  /** Rule failed but with a manual override applied by operations */
  FailedWithOverride = "failedWithOverride",
  /** Rule expired and requires re-evaluation */
  Expired = "expired",
}

/**
 * The evaluation state of a rule \
 * {@link KnownRuleState} can be used interchangeably with RuleState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **pending**: Rule is queued and not yet evaluated \
 * **running**: Rule evaluation is in progress \
 * **actionRequired**: Customer input is required to proceed \
 * **underReview**: Operations review is in progress \
 * **skipped**: Rule preconditions (runAfter) were not met; rule was skipped \
 * **failed**: Rule evaluation failed \
 * **succeeded**: Rule evaluation succeeded \
 * **succeededWithOverride**: Rule succeeded but with a manual override applied by operations \
 * **failedWithOverride**: Rule failed but with a manual override applied by operations \
 * **expired**: Rule expired and requires re-evaluation
 */
export type RuleState = string;

/** Properties of an eduQualification rule. Verifies education-domain ownership for a billing account. */
export interface EduQualificationRuleProperties extends RuleProperties {
  kind: "eduQualification";
  /** Per-tenant domain entries to verify. */
  domains?: DomainEntry[];
  /** References to supplemental documents. Settable only when evaluationState is `actionRequired`. */
  supplementalDocuments?: string[];
}

export function eduQualificationRulePropertiesSerializer(
  item: EduQualificationRuleProperties,
): any {
  return {
    kind: item["kind"],
    domains: !item["domains"] ? item["domains"] : domainEntryArraySerializer(item["domains"]),
    supplementalDocuments: !item["supplementalDocuments"]
      ? item["supplementalDocuments"]
      : item["supplementalDocuments"].map((p: any) => {
          return p;
        }),
  };
}

export function eduQualificationRulePropertiesDeserializer(
  item: any,
): EduQualificationRuleProperties {
  return {
    kind: item["kind"],
    evaluationState: item["evaluationState"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    provisioningState: item["provisioningState"],
    domains: !item["domains"] ? item["domains"] : domainEntryArrayDeserializer(item["domains"]),
    supplementalDocuments: !item["supplementalDocuments"]
      ? item["supplementalDocuments"]
      : item["supplementalDocuments"].map((p: any) => {
          return p;
        }),
  };
}

/**
 * Properties of a business verification rule. Verifies the billing account's
 * business identity.
 *
 * Sold-to fields (`soldTo`, `registrationNumber`, `taxIds`) reflect the billing
 * account's information on file and cannot be supplied by end users.
 */
export interface BusinessVerificationRuleProperties extends RuleProperties {
  kind: "businessVerification";
  /** Sold-to identity used for business verification. Populated from the billing account at the time the rule is created. Server-managed. */
  readonly soldTo?: SoldTo;
  /** Registration number context (allowed types and registration id). Populated from the billing account at the time the rule is created. Server-managed. */
  readonly registrationNumber?: RegistrationNumber;
  /** Tax ids associated with the sold-to identity. Populated from the billing account at the time the rule is created. Server-managed. */
  readonly taxIds?: TaxId[];
  /** Optional external-registry identifier (e.g. DUNS) used to disambiguate verification matches. Settable on PATCH while `evaluationState` is `pending` or `actionRequired`. */
  externalId?: ExternalId;
  /** References to supplemental documents (businessVerification rules only; only settable while evaluationState is `pending` or `actionRequired`). */
  supplementalDocuments?: string[];
}

export function businessVerificationRulePropertiesSerializer(
  item: BusinessVerificationRuleProperties,
): any {
  return {
    kind: item["kind"],
    externalId: !item["externalId"] ? item["externalId"] : externalIdSerializer(item["externalId"]),
    supplementalDocuments: !item["supplementalDocuments"]
      ? item["supplementalDocuments"]
      : item["supplementalDocuments"].map((p: any) => {
          return p;
        }),
  };
}

export function businessVerificationRulePropertiesDeserializer(
  item: any,
): BusinessVerificationRuleProperties {
  return {
    kind: item["kind"],
    evaluationState: item["evaluationState"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    provisioningState: item["provisioningState"],
    soldTo: !item["soldTo"] ? item["soldTo"] : soldToDeserializer(item["soldTo"]),
    registrationNumber: !item["registrationNumber"]
      ? item["registrationNumber"]
      : registrationNumberDeserializer(item["registrationNumber"]),
    taxIds: !item["taxIds"] ? item["taxIds"] : taxIdArrayDeserializer(item["taxIds"]),
    externalId: !item["externalId"]
      ? item["externalId"]
      : externalIdDeserializer(item["externalId"]),
    supplementalDocuments: !item["supplementalDocuments"]
      ? item["supplementalDocuments"]
      : item["supplementalDocuments"].map((p: any) => {
          return p;
        }),
  };
}

/**
 * Sold-to identity used for business verification.
 *
 * **Data classification — Personally Identifiable Information (PII):** This
 * model carries customer/contact PII (names, email, phone, postal address).
 * Producers (service code paths populating SoldTo) and consumers (anything
 * emitting it to logs / telemetry) MUST treat individual field values as
 * PII and avoid clear-text logging. BillingTrust's existing runtime
 * discipline keeps SoldTo out of Geneva logs (see
 * `Services/Rpaas/RpaasRuleProjector.cs` — raw bodies and parsed error
 * messages are filtered before emission). Downstream consumers of the
 * public OpenAPI surface should follow the same convention. Tracked for
 * follow-up alignment with ARM ARG002 (control-plane PII guidance) — see
 * PR description.
 */
export interface SoldTo {
  /** First address line. PII — postal address. */
  addressLine1?: string;
  /** Second address line. PII — postal address. */
  addressLine2?: string;
  /** Third address line. PII — postal address. */
  addressLine3?: string;
  /** City of the address. PII — postal address. */
  city?: string;
  /** ISO 3166-1 alpha-2 country code of the sold-to address (e.g. `US`, `IE`, `GB`). Populated from the billing account. */
  country?: string;
  /** Company name. */
  companyName?: string;
  /** District or sub-region. PII — postal address. */
  district?: string;
  /** Contact email address. PII — contact. */
  email?: string;
  /** Contact first name. PII — contact. */
  firstName?: string;
  /** Contact last name. PII — contact. */
  lastName?: string;
  /** Contact middle name. PII — contact. */
  middleName?: string;
  /** Contact phone number (free-form string; format not validated server-side). PII — contact. */
  phoneNumber?: string;
  /** Postal or ZIP code. PII — postal address. */
  postalCode?: string;
  /** State, province, or region. PII — postal address. */
  region?: string;
}

export function soldToDeserializer(item: any): SoldTo {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    addressLine3: item["addressLine3"],
    city: item["city"],
    country: item["country"],
    companyName: item["companyName"],
    district: item["district"],
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    middleName: item["middleName"],
    phoneNumber: item["phoneNumber"],
    postalCode: item["postalCode"],
    region: item["region"],
  };
}

/** Registration number context for business verification. */
export interface RegistrationNumber {
  /** Allowed registration-number types based on the billing-account country (e.g. `VAT`, `GST`, `EIN`). */
  type?: string[];
  /** Registration number value (e.g. the VAT / GST / EIN identifier string). */
  value?: string;
  /** Whether a registration number is required for the sold-to country. */
  registrationRequirement?: RegistrationRequirement;
}

export function registrationNumberDeserializer(item: any): RegistrationNumber {
  return {
    type: !item["type"]
      ? item["type"]
      : item["type"].map((p: any) => {
          return p;
        }),
    value: item["value"],
    registrationRequirement: item["registrationRequirement"],
  };
}

/** Whether a registration number is required for the sold-to country. Extensible — additional states may be introduced as country-specific tax requirements evolve. */
export enum KnownRegistrationRequirement {
  /** A registration number is required for the sold-to country. */
  Required = "required",
  /** A registration number is optional for the sold-to country. */
  Optional = "optional",
  /** A registration number is not applicable for the sold-to country. */
  NotApplicable = "notApplicable",
}

/**
 * Whether a registration number is required for the sold-to country. Extensible — additional states may be introduced as country-specific tax requirements evolve. \
 * {@link KnownRegistrationRequirement} can be used interchangeably with RegistrationRequirement,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **required**: A registration number is required for the sold-to country. \
 * **optional**: A registration number is optional for the sold-to country. \
 * **notApplicable**: A registration number is not applicable for the sold-to country.
 */
export type RegistrationRequirement = string;

export function taxIdArrayDeserializer(result: Array<TaxId>): any[] {
  return result.map((item) => {
    return taxIdDeserializer(item);
  });
}

/** Tax id entry associated with the sold-to identity. */
export interface TaxId {
  /** Tax id value (e.g. the VAT / GST / EIN identifier string). */
  value?: string;
  /** ISO 3166-1 alpha-2 country code the tax id is registered in. */
  country?: string;
  /** Scope of the tax id (e.g. `Federal`, `State`). */
  scope?: string;
  /** Status of the tax id. */
  status?: TaxIdStatus;
  /** Type of tax id (e.g. `VAT`, `GST`, `EIN`). Extensible — additional types may be returned as upstream registries evolve. */
  type?: string;
}

export function taxIdDeserializer(item: any): TaxId {
  return {
    value: item["value"],
    country: item["country"],
    scope: item["scope"],
    status: item["status"],
    type: item["type"],
  };
}

/** Status of a tax id record. */
export enum KnownTaxIdStatus {
  /** The tax id has been verified and is currently valid. */
  Valid = "valid",
  /** The tax id is no longer valid (e.g. expired or revoked). */
  Invalid = "invalid",
  /** Status could not be determined from the upstream registry. */
  Other = "other",
}

/**
 * Status of a tax id record. \
 * {@link KnownTaxIdStatus} can be used interchangeably with TaxIdStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **valid**: The tax id has been verified and is currently valid. \
 * **invalid**: The tax id is no longer valid (e.g. expired or revoked). \
 * **other**: Status could not be determined from the upstream registry.
 */
export type TaxIdStatus = string;

/** External-registry identifier (e.g. DUNS) used to disambiguate ambiguous verification matches. */
export interface ExternalId {
  /** Identifier type. Currently `DUNS` is supported. */
  type: string;
  /** Identifier value (e.g. the DUNS number string). */
  value: string;
}

export function externalIdSerializer(item: ExternalId): any {
  return { type: item["type"], value: item["value"] };
}

export function externalIdDeserializer(item: any): ExternalId {
  return {
    type: item["type"],
    value: item["value"],
  };
}

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

/** The response of a Rule list operation. */
export interface _RuleListResult {
  /** The Rule items on this page */
  value: Rule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ruleListResultDeserializer(item: any): _RuleListResult {
  return {
    value: ruleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ruleArraySerializer(result: Array<Rule>): any[] {
  return result.map((item) => {
    return ruleSerializer(item);
  });
}

export function ruleArrayDeserializer(result: Array<Rule>): any[] {
  return result.map((item) => {
    return ruleDeserializer(item);
  });
}

/** Patch body for updating a rule. Polymorphic by `kind` — kind-specific patchable fields live on per-kind subtypes. PATCH cannot change a rule's kind; the discriminator carries the rule's existing kind for routing only. */
export interface RulePatchProperties {
  /** The kind of rule. Acts as a discriminator for per-kind patchable fields. Must match the existing rule's kind; PATCH cannot mutate kind. */
  /** The discriminator possible values: eduQualification, businessVerification */
  kind: RuleKind;
}

export function rulePatchPropertiesSerializer(item: RulePatchProperties): any {
  return { kind: item["kind"] };
}

/** Alias for RulePatchPropertiesUnion */
export type RulePatchPropertiesUnion =
  | EduQualificationRulePatchProperties
  | BusinessVerificationRulePatchProperties
  | RulePatchProperties;

export function rulePatchPropertiesUnionSerializer(item: RulePatchPropertiesUnion): any {
  switch (item.kind) {
    case "eduQualification":
      return eduQualificationRulePatchPropertiesSerializer(
        item as EduQualificationRulePatchProperties,
      );

    case "businessVerification":
      return businessVerificationRulePatchPropertiesSerializer(
        item as BusinessVerificationRulePatchProperties,
      );

    default:
      return rulePatchPropertiesSerializer(item);
  }
}

/** Patch body for an eduQualification rule. Only `supplementalDocuments` is settable, and only when evaluationState == actionRequired. */
export interface EduQualificationRulePatchProperties extends RulePatchProperties {
  kind: "eduQualification";
  /** References to supplemental documents (eduQualification rules only; only settable when evaluationState == actionRequired). */
  supplementalDocuments?: string[];
}

export function eduQualificationRulePatchPropertiesSerializer(
  item: EduQualificationRulePatchProperties,
): any {
  return {
    kind: item["kind"],
    supplementalDocuments: !item["supplementalDocuments"]
      ? item["supplementalDocuments"]
      : item["supplementalDocuments"].map((p: any) => {
          return p;
        }),
  };
}

/** Patch body for a businessVerification rule. Settable while evaluationState is `pending` or `actionRequired`. `externalId` lets the customer disambiguate an ambiguous verification match (e.g. via DUNS); `supplementalDocuments` carries references to documents uploaded via the assessment-scoped upload-token action. */
export interface BusinessVerificationRulePatchProperties extends RulePatchProperties {
  kind: "businessVerification";
  /** Optional external-registry identifier (e.g. DUNS) used to disambiguate ambiguous verification matches. */
  externalId?: ExternalId;
  /** References to supplemental documents (businessVerification rules only; only settable while evaluationState is `pending` or `actionRequired`). */
  supplementalDocuments?: string[];
}

export function businessVerificationRulePatchPropertiesSerializer(
  item: BusinessVerificationRulePatchProperties,
): any {
  return {
    kind: item["kind"],
    externalId: !item["externalId"] ? item["externalId"] : externalIdSerializer(item["externalId"]),
    supplementalDocuments: !item["supplementalDocuments"]
      ? item["supplementalDocuments"]
      : item["supplementalDocuments"].map((p: any) => {
          return p;
        }),
  };
}

/** Supported API Versions for Microsoft.BillingTrust */
export enum KnownVersions {
  /** API Version 2026-03-17-preview. */
  V20260317Preview = "2026-03-17-preview",
}
