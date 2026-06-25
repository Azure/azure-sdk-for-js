// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

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

/** Object that represents a Service resource. */
export interface Service extends ProxyResource {
  /** Localized name of the Azure service. */
  displayName?: string;
  /** ARM Resource types. */
  resourceTypes?: string[];
}

export function serviceDeserializer(item: any): Service {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _servicePropertiesDeserializer(item["properties"])),
  };
}

/** Details about an Azure service available for support ticket creation. */
export interface ServiceProperties {
  /** Localized name of the Azure service. */
  displayName?: string;
  /** ARM Resource types. */
  resourceTypes?: string[];
}

export function servicePropertiesDeserializer(item: any): ServiceProperties {
  return {
    displayName: item["displayName"],
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : item["resourceTypes"].map((p: any) => {
          return p;
        }),
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

/** Collection of Service resources. */
export interface _ServicesListResult {
  /** The link to the next page of items */
  nextLink?: string;
  /** List of Service resources. */
  value?: Service[];
}

export function _servicesListResultDeserializer(item: any): _ServicesListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : serviceArrayDeserializer(item["value"]),
  };
}

export function serviceArrayDeserializer(result: Array<Service>): any[] {
  return result.map((item) => {
    return serviceDeserializer(item);
  });
}

/** Input to problem classification Classification API. */
export interface ServiceClassificationRequest {
  /** Natural language description of the customer’s issue. */
  issueSummary?: string;
  /** ARM resource Id of the resource that is having the issue. */
  resourceId?: string;
  /** Additional information in the form of a string. */
  additionalContext?: string;
}

export function serviceClassificationRequestSerializer(item: ServiceClassificationRequest): any {
  return {
    issueSummary: item["issueSummary"],
    resourceId: item["resourceId"],
    additionalContext: item["additionalContext"],
  };
}

/** Output of the service classification API. */
export interface ServiceClassificationOutput {
  /** Set of problem classification objects classified. */
  serviceClassificationResults?: ServiceClassificationAnswer[];
}

export function serviceClassificationOutputDeserializer(item: any): ServiceClassificationOutput {
  return {
    serviceClassificationResults: !item["serviceClassificationResults"]
      ? item["serviceClassificationResults"]
      : serviceClassificationAnswerArrayDeserializer(item["serviceClassificationResults"]),
  };
}

export function serviceClassificationAnswerArrayDeserializer(
  result: Array<ServiceClassificationAnswer>,
): any[] {
  return result.map((item) => {
    return serviceClassificationAnswerDeserializer(item);
  });
}

/** Service Classification result object. */
export interface ServiceClassificationAnswer extends ClassificationService {
  /** Child service. */
  childService?: ClassificationService;
}

export function serviceClassificationAnswerDeserializer(item: any): ServiceClassificationAnswer {
  return {
    serviceId: item["serviceId"],
    displayName: item["displayName"],
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : item["resourceTypes"].map((p: any) => {
          return p;
        }),
    childService: !item["childService"]
      ? item["childService"]
      : classificationServiceDeserializer(item["childService"]),
  };
}

/** Service Classification result object. */
export interface ClassificationService {
  /** Azure resource Id of the service. */
  readonly serviceId?: string;
  /** Localized name of the azure service. */
  readonly displayName?: string;
  /** List of applicable ARM resource types for this service. */
  resourceTypes?: string[];
}

export function classificationServiceDeserializer(item: any): ClassificationService {
  return {
    serviceId: item["serviceId"],
    displayName: item["displayName"],
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : item["resourceTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** Input to problem classification Classification API. */
export interface ProblemClassificationsClassificationInput {
  /** Natural language description of the customer’s issue. */
  issueSummary: string;
  /** ARM resource Id of the resource that is having the issue. */
  resourceId?: string;
}

export function problemClassificationsClassificationInputSerializer(
  item: ProblemClassificationsClassificationInput,
): any {
  return { issueSummary: item["issueSummary"], resourceId: item["resourceId"] };
}

/** Output of the problem classification Classification API. */
export interface ProblemClassificationsClassificationOutput {
  /** Set of problem classification objects classified. */
  problemClassificationResults?: ProblemClassificationsClassificationResult[];
}

export function problemClassificationsClassificationOutputDeserializer(
  item: any,
): ProblemClassificationsClassificationOutput {
  return {
    problemClassificationResults: !item["problemClassificationResults"]
      ? item["problemClassificationResults"]
      : problemClassificationsClassificationResultArrayDeserializer(
          item["problemClassificationResults"],
        ),
  };
}

export function problemClassificationsClassificationResultArrayDeserializer(
  result: Array<ProblemClassificationsClassificationResult>,
): any[] {
  return result.map((item) => {
    return problemClassificationsClassificationResultDeserializer(item);
  });
}

/** ProblemClassification Classification result object. */
export interface ProblemClassificationsClassificationResult {
  /** Identifier that may be used for solution discovery or some other purposes. */
  readonly problemId?: string;
  /** Title of the problem classification result. */
  readonly title?: string;
  /** Description of the problem classification result. */
  readonly description?: string;
  /** Identifier of the service associated with this problem classification result. */
  readonly serviceId?: string;
  /** Identifier that may be used for support ticket creation. */
  readonly problemClassificationId?: string;
  /** Related service. */
  relatedService?: ClassificationService;
}

export function problemClassificationsClassificationResultDeserializer(
  item: any,
): ProblemClassificationsClassificationResult {
  return {
    problemId: item["problemId"],
    title: item["title"],
    description: item["description"],
    serviceId: item["serviceId"],
    problemClassificationId: item["problemClassificationId"],
    relatedService: !item["relatedService"]
      ? item["relatedService"]
      : classificationServiceDeserializer(item["relatedService"]),
  };
}

/** ProblemClassification resource object. */
export interface ProblemClassification extends ProxyResource {
  /** Localized name of problem classification. */
  displayName?: string;
  /** This property indicates whether secondary consent is present for problem classification */
  secondaryConsentEnabled?: SecondaryConsentEnabled[];
}

export function problemClassificationDeserializer(item: any): ProblemClassification {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _problemClassificationPropertiesDeserializer(item["properties"])),
  };
}

/** Details about a problem classification available for an Azure service. */
export interface ProblemClassificationProperties {
  /** Localized name of problem classification. */
  displayName?: string;
  /** This property indicates whether secondary consent is present for problem classification */
  secondaryConsentEnabled?: SecondaryConsentEnabled[];
}

export function problemClassificationPropertiesDeserializer(
  item: any,
): ProblemClassificationProperties {
  return {
    displayName: item["displayName"],
    secondaryConsentEnabled: !item["secondaryConsentEnabled"]
      ? item["secondaryConsentEnabled"]
      : secondaryConsentEnabledArrayDeserializer(item["secondaryConsentEnabled"]),
  };
}

export function secondaryConsentEnabledArrayDeserializer(
  result: Array<SecondaryConsentEnabled>,
): any[] {
  return result.map((item) => {
    return secondaryConsentEnabledDeserializer(item);
  });
}

/** This property indicates whether secondary consent is present for problem classification. */
export interface SecondaryConsentEnabled {
  /** User consent description. */
  description?: string;
  /** The Azure service for which secondary consent is needed for case creation. */
  type?: string;
}

export function secondaryConsentEnabledDeserializer(item: any): SecondaryConsentEnabled {
  return {
    description: item["description"],
    type: item["type"],
  };
}

/** Collection of ProblemClassification resources. */
export interface _ProblemClassificationsListResult {
  /** The link to the next page of items */
  nextLink?: string;
  /** List of ProblemClassification resources. */
  value?: ProblemClassification[];
}

export function _problemClassificationsListResultDeserializer(
  item: any,
): _ProblemClassificationsListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : problemClassificationArrayDeserializer(item["value"]),
  };
}

export function problemClassificationArrayDeserializer(
  result: Array<ProblemClassification>,
): any[] {
  return result.map((item) => {
    return problemClassificationDeserializer(item);
  });
}

/** Object that represents a Communication resource. */
export interface CommunicationDetails extends ProxyResource {
  /** Communication type. */
  readonly communicationType?: CommunicationType;
  /** Direction of communication. */
  readonly communicationDirection?: CommunicationDirection;
  /** Email address of the sender. This property is required if called by a service principal. */
  sender?: string;
  /** Subject of the communication. */
  subject: string;
  /** Body of the communication. */
  body: string;
  /** Time in UTC (ISO 8601 format) when the communication was created. */
  readonly createdDate?: Date;
}

export function communicationDetailsSerializer(item: CommunicationDetails): any {
  return { properties: _communicationDetailsPropertiesSerializer(item) };
}

export function communicationDetailsDeserializer(item: any): CommunicationDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._communicationDetailsPropertiesDeserializer(item["properties"]),
  };
}

/** Describes the properties of a communication resource. */
export interface CommunicationDetailsProperties {
  /** Communication type. */
  readonly communicationType?: CommunicationType;
  /** Direction of communication. */
  readonly communicationDirection?: CommunicationDirection;
  /** Email address of the sender. This property is required if called by a service principal. */
  sender?: string;
  /** Subject of the communication. */
  subject: string;
  /** Body of the communication. */
  body: string;
  /** Time in UTC (ISO 8601 format) when the communication was created. */
  readonly createdDate?: Date;
}

export function communicationDetailsPropertiesSerializer(
  item: CommunicationDetailsProperties,
): any {
  return { sender: item["sender"], subject: item["subject"], body: item["body"] };
}

export function communicationDetailsPropertiesDeserializer(
  item: any,
): CommunicationDetailsProperties {
  return {
    communicationType: item["communicationType"],
    communicationDirection: item["communicationDirection"],
    sender: item["sender"],
    subject: item["subject"],
    body: item["body"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
  };
}

/** Communication type. */
export enum KnownCommunicationType {
  /** web */
  Web = "web",
  /** phone */
  Phone = "phone",
}

/**
 * Communication type. \
 * {@link KnownCommunicationType} can be used interchangeably with CommunicationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **web** \
 * **phone**
 */
export type CommunicationType = string;

/** Direction of communication. */
export enum KnownCommunicationDirection {
  /** inbound */
  Inbound = "inbound",
  /** outbound */
  Outbound = "outbound",
}

/**
 * Direction of communication. \
 * {@link KnownCommunicationDirection} can be used interchangeably with CommunicationDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **inbound** \
 * **outbound**
 */
export type CommunicationDirection = string;

/** [Placeholder] Description for page model */
export interface _CommunicationsListResult {
  /** [Placeholder] Description for nextLink property */
  nextLink?: string;
  /** [Placeholder] Description for value property */
  value?: CommunicationDetails[];
}

export function _communicationsListResultDeserializer(item: any): _CommunicationsListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : communicationDetailsArrayDeserializer(item["value"]),
  };
}

export function communicationDetailsArraySerializer(result: Array<CommunicationDetails>): any[] {
  return result.map((item) => {
    return communicationDetailsSerializer(item);
  });
}

export function communicationDetailsArrayDeserializer(result: Array<CommunicationDetails>): any[] {
  return result.map((item) => {
    return communicationDetailsDeserializer(item);
  });
}

/** Input of CheckNameAvailability API. */
export interface CheckNameAvailabilityInput {
  /** The resource name to validate. */
  name: string;
  /** The type of resource. */
  type: Type;
}

export function checkNameAvailabilityInputSerializer(item: CheckNameAvailabilityInput): any {
  return { name: item["name"], type: item["type"] };
}

/** The type of resource. */
export type Type = "Microsoft.Support/supportTickets" | "Microsoft.Support/communications";

/** Output of check name availability API. */
export interface CheckNameAvailabilityOutput {
  /** Indicates whether the name is available. */
  readonly nameAvailable?: boolean;
  /** The reason why the name is not available. */
  readonly reason?: string;
  /** The detailed error message describing why the name is not available. */
  readonly message?: string;
}

export function checkNameAvailabilityOutputDeserializer(item: any): CheckNameAvailabilityOutput {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Object that represents SupportTicketDetails resource. */
export interface SupportTicketDetails extends ProxyResource {
  /** System generated support ticket Id that is unique. */
  supportTicketId?: string;
  /** Detailed description of the question or issue. */
  description: string;
  /** Each Azure service has its own set of issue categories, also known as problem classification. This parameter is the unique Id for the type of problem you are experiencing. */
  problemClassificationId: string;
  /** Localized name of problem classification. */
  readonly problemClassificationDisplayName?: string;
  /** A value that indicates the urgency of the case, which in turn determines the response time according to the service level agreement of the technical support plan you have with Azure. Note: 'Highest critical impact', also known as the 'Emergency - Severe impact' level in the Azure portal is reserved only for our Premium customers. */
  severity: SeverityLevel;
  /** Enrollment Id associated with the support ticket. */
  enrollmentId?: string;
  /** Indicates if this requires a 24x7 response from Azure. */
  require24X7Response?: boolean;
  /** Advanced diagnostic consent to be updated on the support ticket. */
  advancedDiagnosticConsent: Consent;
  /** Problem scoping questions associated with the support ticket. */
  problemScopingQuestions?: string;
  /** Support plan id associated with the support ticket. */
  supportPlanId?: string;
  /** Contact information of the user requesting to create a support ticket. */
  contactDetails: ContactProfile;
  /** Service Level Agreement information for this support ticket. */
  serviceLevelAgreement?: ServiceLevelAgreement;
  /** Information about the support engineer working on this support ticket. */
  supportEngineer?: SupportEngineer;
  /** Support plan type associated with the support ticket. */
  readonly supportPlanType?: string;
  /** Support plan type associated with the support ticket. */
  readonly supportPlanDisplayName?: string;
  /** Title of the support ticket. */
  title: string;
  /** Time in UTC (ISO 8601 format) when the problem started. */
  problemStartTime?: Date;
  /** This is the resource Id of the Azure service resource associated with the support ticket. */
  serviceId: string;
  /** Localized name of the Azure service. */
  readonly serviceDisplayName?: string;
  /** Status of the support ticket. */
  readonly status?: string;
  /** Time in UTC (ISO 8601 format) when the support ticket was created. */
  readonly createdDate?: Date;
  /** Time in UTC (ISO 8601 format) when the support ticket was last modified. */
  readonly modifiedDate?: Date;
  /** File workspace name. */
  fileWorkspaceName?: string;
  /** This property indicates if support ticket is a temporary ticket. */
  readonly isTemporaryTicket?: IsTemporaryTicket;
  /** Additional ticket details associated with a technical support ticket request. */
  technicalTicketDetails?: TechnicalTicketDetails;
  /** Additional ticket details associated with a quota support ticket request. */
  quotaTicketDetails?: QuotaTicketDetails;
  /** This property indicates secondary consents for the support ticket */
  secondaryConsent?: SecondaryConsent[];
  /** Direct Connect Escalation details for a support ticket. */
  directConnectEscalation?: DirectConnectEscalation;
  /** Contains a link to the post on the community forum. */
  communityForumPost?: string;
  /** Support channel type for the support ticket. */
  readonly supportChannel?: SupportChannel;
  /** Status of the chat conversation associated with the support ticket. */
  readonly chatConversationStatus?: ChatConversationStatus;
}

export function supportTicketDetailsSerializer(item: SupportTicketDetails): any {
  return { properties: _supportTicketDetailsPropertiesSerializer(item) };
}

export function supportTicketDetailsDeserializer(item: any): SupportTicketDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._supportTicketDetailsPropertiesDeserializer(item["properties"]),
  };
}

/** Describes the properties of a support ticket. */
export interface SupportTicketDetailsProperties {
  /** System generated support ticket Id that is unique. */
  supportTicketId?: string;
  /** Detailed description of the question or issue. */
  description: string;
  /** Each Azure service has its own set of issue categories, also known as problem classification. This parameter is the unique Id for the type of problem you are experiencing. */
  problemClassificationId: string;
  /** Localized name of problem classification. */
  readonly problemClassificationDisplayName?: string;
  /** A value that indicates the urgency of the case, which in turn determines the response time according to the service level agreement of the technical support plan you have with Azure. Note: 'Highest critical impact', also known as the 'Emergency - Severe impact' level in the Azure portal is reserved only for our Premium customers. */
  severity: SeverityLevel;
  /** Enrollment Id associated with the support ticket. */
  enrollmentId?: string;
  /** Indicates if this requires a 24x7 response from Azure. */
  require24X7Response?: boolean;
  /** Advanced diagnostic consent to be updated on the support ticket. */
  advancedDiagnosticConsent: Consent;
  /** Problem scoping questions associated with the support ticket. */
  problemScopingQuestions?: string;
  /** Support plan id associated with the support ticket. */
  supportPlanId?: string;
  /** Contact information of the user requesting to create a support ticket. */
  contactDetails: ContactProfile;
  /** Service Level Agreement information for this support ticket. */
  serviceLevelAgreement?: ServiceLevelAgreement;
  /** Information about the support engineer working on this support ticket. */
  supportEngineer?: SupportEngineer;
  /** Support plan type associated with the support ticket. */
  readonly supportPlanType?: string;
  /** Support plan type associated with the support ticket. */
  readonly supportPlanDisplayName?: string;
  /** Title of the support ticket. */
  title: string;
  /** Time in UTC (ISO 8601 format) when the problem started. */
  problemStartTime?: Date;
  /** This is the resource Id of the Azure service resource associated with the support ticket. */
  serviceId: string;
  /** Localized name of the Azure service. */
  readonly serviceDisplayName?: string;
  /** Status of the support ticket. */
  readonly status?: string;
  /** Time in UTC (ISO 8601 format) when the support ticket was created. */
  readonly createdDate?: Date;
  /** Time in UTC (ISO 8601 format) when the support ticket was last modified. */
  readonly modifiedDate?: Date;
  /** File workspace name. */
  fileWorkspaceName?: string;
  /** This property indicates if support ticket is a temporary ticket. */
  readonly isTemporaryTicket?: IsTemporaryTicket;
  /** Additional ticket details associated with a technical support ticket request. */
  technicalTicketDetails?: TechnicalTicketDetails;
  /** Additional ticket details associated with a quota support ticket request. */
  quotaTicketDetails?: QuotaTicketDetails;
  /** This property indicates secondary consents for the support ticket */
  secondaryConsent?: SecondaryConsent[];
  /** Direct Connect Escalation details for a support ticket. */
  directConnectEscalation?: DirectConnectEscalation;
  /** Contains a link to the post on the community forum. */
  communityForumPost?: string;
  /** Support channel type for the support ticket. */
  readonly supportChannel?: SupportChannel;
  /** Status of the chat conversation associated with the support ticket. */
  readonly chatConversationStatus?: ChatConversationStatus;
}

export function supportTicketDetailsPropertiesSerializer(
  item: SupportTicketDetailsProperties,
): any {
  return {
    supportTicketId: item["supportTicketId"],
    description: item["description"],
    problemClassificationId: item["problemClassificationId"],
    severity: item["severity"],
    enrollmentId: item["enrollmentId"],
    require24X7Response: item["require24X7Response"],
    advancedDiagnosticConsent: item["advancedDiagnosticConsent"],
    problemScopingQuestions: item["problemScopingQuestions"],
    supportPlanId: item["supportPlanId"],
    contactDetails: contactProfileSerializer(item["contactDetails"]),
    serviceLevelAgreement: !item["serviceLevelAgreement"]
      ? item["serviceLevelAgreement"]
      : serviceLevelAgreementSerializer(item["serviceLevelAgreement"]),
    supportEngineer: !item["supportEngineer"]
      ? item["supportEngineer"]
      : supportEngineerSerializer(item["supportEngineer"]),
    title: item["title"],
    problemStartTime: !item["problemStartTime"]
      ? item["problemStartTime"]
      : item["problemStartTime"].toISOString(),
    serviceId: item["serviceId"],
    fileWorkspaceName: item["fileWorkspaceName"],
    technicalTicketDetails: !item["technicalTicketDetails"]
      ? item["technicalTicketDetails"]
      : technicalTicketDetailsSerializer(item["technicalTicketDetails"]),
    quotaTicketDetails: !item["quotaTicketDetails"]
      ? item["quotaTicketDetails"]
      : quotaTicketDetailsSerializer(item["quotaTicketDetails"]),
    secondaryConsent: !item["secondaryConsent"]
      ? item["secondaryConsent"]
      : secondaryConsentArraySerializer(item["secondaryConsent"]),
    directConnectEscalation: !item["directConnectEscalation"]
      ? item["directConnectEscalation"]
      : directConnectEscalationSerializer(item["directConnectEscalation"]),
    communityForumPost: item["communityForumPost"],
  };
}

export function supportTicketDetailsPropertiesDeserializer(
  item: any,
): SupportTicketDetailsProperties {
  return {
    supportTicketId: item["supportTicketId"],
    description: item["description"],
    problemClassificationId: item["problemClassificationId"],
    problemClassificationDisplayName: item["problemClassificationDisplayName"],
    severity: item["severity"],
    enrollmentId: item["enrollmentId"],
    require24X7Response: item["require24X7Response"],
    advancedDiagnosticConsent: item["advancedDiagnosticConsent"],
    problemScopingQuestions: item["problemScopingQuestions"],
    supportPlanId: item["supportPlanId"],
    contactDetails: contactProfileDeserializer(item["contactDetails"]),
    serviceLevelAgreement: !item["serviceLevelAgreement"]
      ? item["serviceLevelAgreement"]
      : serviceLevelAgreementDeserializer(item["serviceLevelAgreement"]),
    supportEngineer: !item["supportEngineer"]
      ? item["supportEngineer"]
      : supportEngineerDeserializer(item["supportEngineer"]),
    supportPlanType: item["supportPlanType"],
    supportPlanDisplayName: item["supportPlanDisplayName"],
    title: item["title"],
    problemStartTime: !item["problemStartTime"]
      ? item["problemStartTime"]
      : new Date(item["problemStartTime"]),
    serviceId: item["serviceId"],
    serviceDisplayName: item["serviceDisplayName"],
    status: item["status"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    modifiedDate: !item["modifiedDate"] ? item["modifiedDate"] : new Date(item["modifiedDate"]),
    fileWorkspaceName: item["fileWorkspaceName"],
    isTemporaryTicket: item["isTemporaryTicket"],
    technicalTicketDetails: !item["technicalTicketDetails"]
      ? item["technicalTicketDetails"]
      : technicalTicketDetailsDeserializer(item["technicalTicketDetails"]),
    quotaTicketDetails: !item["quotaTicketDetails"]
      ? item["quotaTicketDetails"]
      : quotaTicketDetailsDeserializer(item["quotaTicketDetails"]),
    secondaryConsent: !item["secondaryConsent"]
      ? item["secondaryConsent"]
      : secondaryConsentArrayDeserializer(item["secondaryConsent"]),
    directConnectEscalation: !item["directConnectEscalation"]
      ? item["directConnectEscalation"]
      : directConnectEscalationDeserializer(item["directConnectEscalation"]),
    communityForumPost: item["communityForumPost"],
    supportChannel: item["supportChannel"],
    chatConversationStatus: item["chatConversationStatus"],
  };
}

/** A value that indicates the urgency of the case, which in turn determines the response time according to the service level agreement of the technical support plan you have with Azure. Note: 'Highest critical impact', also known as the 'Emergency - Severe impact' level in the Azure portal is reserved only for our Premium customers. */
export enum KnownSeverityLevel {
  /** minimal */
  Minimal = "minimal",
  /** moderate */
  Moderate = "moderate",
  /** critical */
  Critical = "critical",
  /** highestcriticalimpact */
  Highestcriticalimpact = "highestcriticalimpact",
}

/**
 * A value that indicates the urgency of the case, which in turn determines the response time according to the service level agreement of the technical support plan you have with Azure. Note: 'Highest critical impact', also known as the 'Emergency - Severe impact' level in the Azure portal is reserved only for our Premium customers. \
 * {@link KnownSeverityLevel} can be used interchangeably with SeverityLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **minimal** \
 * **moderate** \
 * **critical** \
 * **highestcriticalimpact**
 */
export type SeverityLevel = string;

/** Advanced diagnostic consent to be updated on the support ticket. */
export enum KnownConsent {
  /** Yes */
  Yes = "Yes",
  /** No */
  No = "No",
}

/**
 * Advanced diagnostic consent to be updated on the support ticket. \
 * {@link KnownConsent} can be used interchangeably with Consent,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Yes** \
 * **No**
 */
export type Consent = string;

/** Contact information associated with the support ticket. */
export interface ContactProfile {
  /** First name. */
  firstName: string;
  /** Last name. */
  lastName: string;
  /** Preferred contact method. */
  preferredContactMethod: PreferredContactMethod;
  /** Primary email address. */
  primaryEmailAddress: string;
  /** Additional email addresses listed will be copied on any correspondence about the support ticket. */
  additionalEmailAddresses?: string[];
  /** Phone number. This is required if preferred contact method is phone. It is also required when submitting 'critical' or 'highestcriticalimpact' severity cases. */
  phoneNumber?: string;
  /** Time zone of the user. This is the name of the time zone from [Microsoft Time Zone Index Values](https://support.microsoft.com/help/973627/microsoft-time-zone-index-values). */
  preferredTimeZone: string;
  /** Country of the user. This is the ISO 3166-1 alpha-3 code. */
  country: string;
  /** Preferred language of support from Azure. Support languages vary based on the severity you choose for your support ticket. Learn more at [Azure Severity and responsiveness](https://azure.microsoft.com/support/plans/response). Use the standard language-country code. Valid values are 'en-us' for English, 'zh-hans' for Chinese, 'es-es' for Spanish, 'fr-fr' for French, 'ja-jp' for Japanese, 'ko-kr' for Korean, 'ru-ru' for Russian, 'pt-br' for Portuguese, 'it-it' for Italian, 'zh-tw' for Chinese and 'de-de' for German. */
  preferredSupportLanguage: string;
}

export function contactProfileSerializer(item: ContactProfile): any {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    preferredContactMethod: item["preferredContactMethod"],
    primaryEmailAddress: item["primaryEmailAddress"],
    additionalEmailAddresses: !item["additionalEmailAddresses"]
      ? item["additionalEmailAddresses"]
      : item["additionalEmailAddresses"].map((p: any) => {
          return p;
        }),
    phoneNumber: item["phoneNumber"],
    preferredTimeZone: item["preferredTimeZone"],
    country: item["country"],
    preferredSupportLanguage: item["preferredSupportLanguage"],
  };
}

export function contactProfileDeserializer(item: any): ContactProfile {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    preferredContactMethod: item["preferredContactMethod"],
    primaryEmailAddress: item["primaryEmailAddress"],
    additionalEmailAddresses: !item["additionalEmailAddresses"]
      ? item["additionalEmailAddresses"]
      : item["additionalEmailAddresses"].map((p: any) => {
          return p;
        }),
    phoneNumber: item["phoneNumber"],
    preferredTimeZone: item["preferredTimeZone"],
    country: item["country"],
    preferredSupportLanguage: item["preferredSupportLanguage"],
  };
}

/** Preferred contact method. */
export enum KnownPreferredContactMethod {
  /** email */
  Email = "email",
  /** phone */
  Phone = "phone",
}

/**
 * Preferred contact method. \
 * {@link KnownPreferredContactMethod} can be used interchangeably with PreferredContactMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **email** \
 * **phone**
 */
export type PreferredContactMethod = string;

/** Service Level Agreement details for a support ticket. */
export interface ServiceLevelAgreement {
  /** Time in UTC (ISO 8601 format) when the service level agreement starts. */
  readonly startTime?: Date;
  /** Time in UTC (ISO 8601 format) when the service level agreement expires. */
  readonly expirationTime?: Date;
  /** Service Level Agreement in minutes. */
  readonly slaMinutes?: number;
}

export function serviceLevelAgreementSerializer(_item: ServiceLevelAgreement): any {
  return {};
}

export function serviceLevelAgreementDeserializer(item: any): ServiceLevelAgreement {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
    slaMinutes: item["slaMinutes"],
  };
}

/** Support engineer information. */
export interface SupportEngineer {
  /** Email address of the Azure Support engineer assigned to the support ticket. */
  readonly emailAddress?: string;
}

export function supportEngineerSerializer(_item: SupportEngineer): any {
  return {};
}

export function supportEngineerDeserializer(item: any): SupportEngineer {
  return {
    emailAddress: item["emailAddress"],
  };
}

/** This property indicates if support ticket is a temporary ticket. */
export enum KnownIsTemporaryTicket {
  /** Yes */
  Yes = "Yes",
  /** No */
  No = "No",
}

/**
 * This property indicates if support ticket is a temporary ticket. \
 * {@link KnownIsTemporaryTicket} can be used interchangeably with IsTemporaryTicket,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Yes** \
 * **No**
 */
export type IsTemporaryTicket = string;

/** Additional information for technical support ticket. */
export interface TechnicalTicketDetails {
  /** This is the resource Id of the Azure service resource (For example: A virtual machine resource or an HDInsight resource) for which the support ticket is created. */
  resourceId?: string;
}

export function technicalTicketDetailsSerializer(item: TechnicalTicketDetails): any {
  return { resourceId: item["resourceId"] };
}

export function technicalTicketDetailsDeserializer(item: any): TechnicalTicketDetails {
  return {
    resourceId: item["resourceId"],
  };
}

/** Additional set of information required for quota increase support ticket for certain quota types, e.g.: Virtual machine cores. Get complete details about Quota payload support request along with examples at [Support quota request](https://aka.ms/supportrpquotarequestpayload). */
export interface QuotaTicketDetails {
  /** Required for certain quota types when there is a sub type, such as Batch, for which you are requesting a quota increase. */
  quotaChangeRequestSubType?: string;
  /** Quota change request version. */
  quotaChangeRequestVersion?: string;
  /** This property is required for providing the region and new quota limits. */
  quotaChangeRequests?: QuotaChangeRequest[];
}

export function quotaTicketDetailsSerializer(item: QuotaTicketDetails): any {
  return {
    quotaChangeRequestSubType: item["quotaChangeRequestSubType"],
    quotaChangeRequestVersion: item["quotaChangeRequestVersion"],
    quotaChangeRequests: !item["quotaChangeRequests"]
      ? item["quotaChangeRequests"]
      : quotaChangeRequestArraySerializer(item["quotaChangeRequests"]),
  };
}

export function quotaTicketDetailsDeserializer(item: any): QuotaTicketDetails {
  return {
    quotaChangeRequestSubType: item["quotaChangeRequestSubType"],
    quotaChangeRequestVersion: item["quotaChangeRequestVersion"],
    quotaChangeRequests: !item["quotaChangeRequests"]
      ? item["quotaChangeRequests"]
      : quotaChangeRequestArrayDeserializer(item["quotaChangeRequests"]),
  };
}

export function quotaChangeRequestArraySerializer(result: Array<QuotaChangeRequest>): any[] {
  return result.map((item) => {
    return quotaChangeRequestSerializer(item);
  });
}

export function quotaChangeRequestArrayDeserializer(result: Array<QuotaChangeRequest>): any[] {
  return result.map((item) => {
    return quotaChangeRequestDeserializer(item);
  });
}

/** This property is required for providing the region and new quota limits. */
export interface QuotaChangeRequest {
  /** Region for which the quota increase request is being made. */
  region?: string;
  /** Payload of the quota increase request. */
  payload?: string;
}

export function quotaChangeRequestSerializer(item: QuotaChangeRequest): any {
  return { region: item["region"], payload: item["payload"] };
}

export function quotaChangeRequestDeserializer(item: any): QuotaChangeRequest {
  return {
    region: item["region"],
    payload: item["payload"],
  };
}

export function secondaryConsentArraySerializer(result: Array<SecondaryConsent>): any[] {
  return result.map((item) => {
    return secondaryConsentSerializer(item);
  });
}

export function secondaryConsentArrayDeserializer(result: Array<SecondaryConsent>): any[] {
  return result.map((item) => {
    return secondaryConsentDeserializer(item);
  });
}

/** This property indicates secondary consent for the support ticket. */
export interface SecondaryConsent {
  /** User consent value provided */
  userConsent?: UserConsent;
  /** The service name for which the secondary consent is being provided. The value needs to be retrieved from the Problem Classification API response. */
  type?: string;
}

export function secondaryConsentSerializer(item: SecondaryConsent): any {
  return { userConsent: item["userConsent"], type: item["type"] };
}

export function secondaryConsentDeserializer(item: any): SecondaryConsent {
  return {
    userConsent: item["userConsent"],
    type: item["type"],
  };
}

/** User consent value provided */
export enum KnownUserConsent {
  /** Yes */
  Yes = "Yes",
  /** No */
  No = "No",
}

/**
 * User consent value provided \
 * {@link KnownUserConsent} can be used interchangeably with UserConsent,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Yes** \
 * **No**
 */
export type UserConsent = string;

/** Direct Connect Escalation details for a support ticket. */
export interface DirectConnectEscalation {
  /** Status of Direct Connect Escalation. */
  azureEEStatus?: EscalationStatus;
  /** An array containing the allowed severities for direct connect escalation. */
  allowedSeverities?: SeverityLevel[];
  /** Reason for escalation / business impact. */
  reasonForEscalation?: string;
}

export function directConnectEscalationSerializer(item: DirectConnectEscalation): any {
  return {
    azureEEStatus: item["azureEEStatus"],
    allowedSeverities: !item["allowedSeverities"]
      ? item["allowedSeverities"]
      : item["allowedSeverities"].map((p: any) => {
          return p;
        }),
    reasonForEscalation: item["reasonForEscalation"],
  };
}

export function directConnectEscalationDeserializer(item: any): DirectConnectEscalation {
  return {
    azureEEStatus: item["azureEEStatus"],
    allowedSeverities: !item["allowedSeverities"]
      ? item["allowedSeverities"]
      : item["allowedSeverities"].map((p: any) => {
          return p;
        }),
    reasonForEscalation: item["reasonForEscalation"],
  };
}

/** Status of Direct Connect Escalation. */
export enum KnownEscalationStatus {
  /** Escalation is available and uninitiated */
  EscalationAvailable = "EscalationAvailable",
  /** Escalation is unavailable and has been initiated */
  EscalationInitiated = "EscalationInitiated",
  /** Escalation is unavailable and has finished processing after being initiated */
  EscalationProcessed = "EscalationProcessed",
  /** Escalation is unavailable and cannot be initiated due to direct escalation being unsupported on this product or topic */
  EscalationUnsupported = "EscalationUnsupported",
  /** Escalation is unavailable and cannot be initiated due to customer not being enrolled to direct escalation */
  EscalationUnavailable = "EscalationUnavailable",
}

/**
 * Status of Direct Connect Escalation. \
 * {@link KnownEscalationStatus} can be used interchangeably with EscalationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EscalationAvailable**: Escalation is available and uninitiated \
 * **EscalationInitiated**: Escalation is unavailable and has been initiated \
 * **EscalationProcessed**: Escalation is unavailable and has finished processing after being initiated \
 * **EscalationUnsupported**: Escalation is unavailable and cannot be initiated due to direct escalation being unsupported on this product or topic \
 * **EscalationUnavailable**: Escalation is unavailable and cannot be initiated due to customer not being enrolled to direct escalation
 */
export type EscalationStatus = string;

/** Support channel type for the support ticket. */
export enum KnownSupportChannel {
  /** Chat support channel. */
  Chat = "Chat",
  /** Web support channel. */
  Web = "Web",
}

/**
 * Support channel type for the support ticket. \
 * {@link KnownSupportChannel} can be used interchangeably with SupportChannel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Chat**: Chat support channel. \
 * **Web**: Web support channel.
 */
export type SupportChannel = string;

/** Status of the chat conversation associated with the support ticket. */
export enum KnownChatConversationStatus {
  /** Chat conversation is currently active. */
  Active = "Active",
  /** Chat conversation has been closed. */
  Closed = "Closed",
}

/**
 * Status of the chat conversation associated with the support ticket. \
 * {@link KnownChatConversationStatus} can be used interchangeably with ChatConversationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Chat conversation is currently active. \
 * **Closed**: Chat conversation has been closed.
 */
export type ChatConversationStatus = string;

/** Updates severity, ticket status, contact details, advanced diagnostic consent and secondary consent in the support ticket. */
export interface UpdateSupportTicket {
  /** Severity level. */
  severity?: SeverityLevel;
  /** Status to be updated on the ticket. */
  status?: Status;
  /** Contact details to be updated on the support ticket. */
  contactDetails?: UpdateContactProfile;
  /** Advanced diagnostic consent to be updated on the support ticket. */
  advancedDiagnosticConsent?: Consent;
  /** This property indicates secondary consents for the support ticket */
  secondaryConsent?: SecondaryConsent[];
  /** Direct Connect Escalation details for a support ticket. */
  directConnectEscalation?: DirectConnectEscalation;
}

export function updateSupportTicketSerializer(item: UpdateSupportTicket): any {
  return {
    severity: item["severity"],
    status: item["status"],
    contactDetails: !item["contactDetails"]
      ? item["contactDetails"]
      : updateContactProfileSerializer(item["contactDetails"]),
    advancedDiagnosticConsent: item["advancedDiagnosticConsent"],
    secondaryConsent: !item["secondaryConsent"]
      ? item["secondaryConsent"]
      : secondaryConsentArraySerializer(item["secondaryConsent"]),
    directConnectEscalation: !item["directConnectEscalation"]
      ? item["directConnectEscalation"]
      : directConnectEscalationSerializer(item["directConnectEscalation"]),
  };
}

/** Status to be updated on the ticket. */
export enum KnownStatus {
  /** open */
  Open = "open",
  /** closed */
  Closed = "closed",
}

/**
 * Status to be updated on the ticket. \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **open** \
 * **closed**
 */
export type Status = string;

/** Contact information associated with the support ticket. */
export interface UpdateContactProfile {
  /** First name. */
  firstName?: string;
  /** Last name. */
  lastName?: string;
  /** Preferred contact method. */
  preferredContactMethod?: PreferredContactMethod;
  /** Primary email address. */
  primaryEmailAddress?: string;
  /** Email addresses listed will be copied on any correspondence about the support ticket. */
  additionalEmailAddresses?: string[];
  /** Phone number. This is required if preferred contact method is phone. It is also required when submitting 'critical' or 'highestcriticalimpact' severity cases. */
  phoneNumber?: string;
  /** Time zone of the user. This is the name of the time zone from [Microsoft Time Zone Index Values](https://support.microsoft.com/help/973627/microsoft-time-zone-index-values). */
  preferredTimeZone?: string;
  /** Country of the user. This is the ISO 3166-1 alpha-3 code. */
  country?: string;
  /** Preferred language of support from Azure. Support languages vary based on the severity you choose for your support ticket. Learn more at [Azure Severity and responsiveness](https://azure.microsoft.com/support/plans/response/). Use the standard language-country code. Valid values are 'en-us' for English, 'zh-hans' for Chinese, 'es-es' for Spanish, 'fr-fr' for French, 'ja-jp' for Japanese, 'ko-kr' for Korean, 'ru-ru' for Russian, 'pt-br' for Portuguese, 'it-it' for Italian, 'zh-tw' for Chinese and 'de-de' for German. */
  preferredSupportLanguage?: string;
}

export function updateContactProfileSerializer(item: UpdateContactProfile): any {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    preferredContactMethod: item["preferredContactMethod"],
    primaryEmailAddress: item["primaryEmailAddress"],
    additionalEmailAddresses: !item["additionalEmailAddresses"]
      ? item["additionalEmailAddresses"]
      : item["additionalEmailAddresses"].map((p: any) => {
          return p;
        }),
    phoneNumber: item["phoneNumber"],
    preferredTimeZone: item["preferredTimeZone"],
    country: item["country"],
    preferredSupportLanguage: item["preferredSupportLanguage"],
  };
}

/** [Placeholder] Description for page model */
export interface _SupportTicketsListResult {
  /** [Placeholder] Description for nextLink property */
  nextLink?: string;
  /** [Placeholder] Description for value property */
  value?: SupportTicketDetails[];
}

export function _supportTicketsListResultDeserializer(item: any): _SupportTicketsListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : supportTicketDetailsArrayDeserializer(item["value"]),
  };
}

export function supportTicketDetailsArraySerializer(result: Array<SupportTicketDetails>): any[] {
  return result.map((item) => {
    return supportTicketDetailsSerializer(item);
  });
}

export function supportTicketDetailsArrayDeserializer(result: Array<SupportTicketDetails>): any[] {
  return result.map((item) => {
    return supportTicketDetailsDeserializer(item);
  });
}

/** The look up resource Id request body */
export interface LookUpResourceIdRequest {
  /** The System generated Id that is unique. Use supportTicketId property for Microsoft.Support/supportTickets resource type. */
  identifier?: string;
  /** The type of resource. */
  type?: "Microsoft.Support/supportTickets";
}

export function lookUpResourceIdRequestSerializer(item: LookUpResourceIdRequest): any {
  return { identifier: item["identifier"], type: item["type"] };
}

/** The look up resource id response */
export interface LookUpResourceIdResponse {
  /** The resource Id of support resource type. */
  resourceId?: string;
}

export function lookUpResourceIdResponseDeserializer(item: any): LookUpResourceIdResponse {
  return {
    resourceId: item["resourceId"],
  };
}

/** Object that represents a Chat Transcript resource. */
export interface ChatTranscriptDetails extends ProxyResource {
  /** List of chat transcript communication resources. */
  messages?: MessageProperties[];
  /** Time in UTC (ISO 8601 format) when the chat began. */
  readonly startTime?: Date;
}

export function chatTranscriptDetailsDeserializer(item: any): ChatTranscriptDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _chatTranscriptDetailsPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a Chat Transcript Details resource. */
export interface ChatTranscriptDetailsProperties {
  /** List of chat transcript communication resources. */
  messages?: MessageProperties[];
  /** Time in UTC (ISO 8601 format) when the chat began. */
  readonly startTime?: Date;
}

export function chatTranscriptDetailsPropertiesDeserializer(
  item: any,
): ChatTranscriptDetailsProperties {
  return {
    messages: !item["messages"]
      ? item["messages"]
      : messagePropertiesArrayDeserializer(item["messages"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
  };
}

export function messagePropertiesArrayDeserializer(result: Array<MessageProperties>): any[] {
  return result.map((item) => {
    return messagePropertiesDeserializer(item);
  });
}

/** Describes the properties of a Message Details resource. */
export interface MessageProperties {
  /** Content type. */
  readonly contentType?: string;
  /** Direction of communication. */
  readonly communicationDirection?: CommunicationDirection;
  /** Name of the sender. */
  sender?: string;
  /** Body of the communication. */
  body?: string;
  /** Time in UTC (ISO 8601 format) when the communication was created. */
  readonly createdDate?: Date;
}

export function messagePropertiesDeserializer(item: any): MessageProperties {
  return {
    contentType: item["contentType"],
    communicationDirection: item["communicationDirection"],
    sender: item["sender"],
    body: item["body"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
  };
}

/** [Placeholder] Description for page model */
export interface _ChatTranscriptsListResult {
  /** [Placeholder] Description for nextLink property */
  nextLink?: string;
  /** [Placeholder] Description for value property */
  value?: ChatTranscriptDetails[];
}

export function _chatTranscriptsListResultDeserializer(item: any): _ChatTranscriptsListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : chatTranscriptDetailsArrayDeserializer(item["value"]),
  };
}

export function chatTranscriptDetailsArrayDeserializer(
  result: Array<ChatTranscriptDetails>,
): any[] {
  return result.map((item) => {
    return chatTranscriptDetailsDeserializer(item);
  });
}

/** Object that represents FileWorkspaceDetails resource */
export interface FileWorkspaceDetails extends ProxyResource {
  /** Time in UTC (ISO 8601 format) when file workspace was created. */
  readonly createdOn?: Date;
  /** Time in UTC (ISO 8601 format) when file workspace is going to expire. */
  readonly expirationTime?: Date;
}

export function fileWorkspaceDetailsDeserializer(item: any): FileWorkspaceDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _fileWorkspaceDetailsPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a file workspace. */
export interface FileWorkspaceDetailsProperties {
  /** Time in UTC (ISO 8601 format) when file workspace was created. */
  readonly createdOn?: Date;
  /** Time in UTC (ISO 8601 format) when file workspace is going to expire. */
  readonly expirationTime?: Date;
}

export function fileWorkspaceDetailsPropertiesDeserializer(
  item: any,
): FileWorkspaceDetailsProperties {
  return {
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
  };
}

/** Object that represents File Details resource */
export interface FileDetails extends ProxyResource {
  /** Time in UTC (ISO 8601 format) when file workspace was created. */
  readonly createdOn?: Date;
  /** Size of each chunk. The size of each chunk should be provided in bytes and must not exceed 2.5 megabytes (MB). */
  chunkSize?: number;
  /** Size of the file to be uploaded. The file size must not exceed 5 MB and should be provided in bytes. */
  fileSize?: number;
  /** Number of chunks to be uploaded. The maximum number of allowed chunks is 2. */
  numberOfChunks?: number;
}

export function fileDetailsSerializer(item: FileDetails): any {
  return {
    properties: areAllPropsUndefined(item, ["chunkSize", "fileSize", "numberOfChunks"])
      ? undefined
      : _fileDetailsPropertiesSerializer(item),
  };
}

export function fileDetailsDeserializer(item: any): FileDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _fileDetailsPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a file. */
export interface FileDetailsProperties {
  /** Time in UTC (ISO 8601 format) when file workspace was created. */
  readonly createdOn?: Date;
  /** Size of each chunk. The size of each chunk should be provided in bytes and must not exceed 2.5 megabytes (MB). */
  chunkSize?: number;
  /** Size of the file to be uploaded. The file size must not exceed 5 MB and should be provided in bytes. */
  fileSize?: number;
  /** Number of chunks to be uploaded. The maximum number of allowed chunks is 2. */
  numberOfChunks?: number;
}

export function fileDetailsPropertiesSerializer(item: FileDetailsProperties): any {
  return {
    chunkSize: item["chunkSize"],
    fileSize: item["fileSize"],
    numberOfChunks: item["numberOfChunks"],
  };
}

export function fileDetailsPropertiesDeserializer(item: any): FileDetailsProperties {
  return {
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    chunkSize: item["chunkSize"],
    fileSize: item["fileSize"],
    numberOfChunks: item["numberOfChunks"],
  };
}

/** [Placeholder] Description for page model */
export interface _FilesListResult {
  /** [Placeholder] Description for nextLink property */
  nextLink?: string;
  /** [Placeholder] Description for value property */
  value?: FileDetails[];
}

export function _filesListResultDeserializer(item: any): _FilesListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : fileDetailsArrayDeserializer(item["value"]),
  };
}

export function fileDetailsArraySerializer(result: Array<FileDetails>): any[] {
  return result.map((item) => {
    return fileDetailsSerializer(item);
  });
}

export function fileDetailsArrayDeserializer(result: Array<FileDetails>): any[] {
  return result.map((item) => {
    return fileDetailsDeserializer(item);
  });
}

/** File content associated with the file under a workspace. */
export interface UploadFile {
  /** File Content in base64 encoded format */
  content?: string;
  /** Index of the uploaded chunk (Index starts at 0) */
  chunkIndex?: number;
}

export function uploadFileSerializer(item: UploadFile): any {
  return { content: item["content"], chunkIndex: item["chunkIndex"] };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-04-01 API version. */
  V20240401 = "2024-04-01",
  /** The 2026-06-01 API version. */
  V20260601 = "2026-06-01",
}

export function _servicePropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : item["resourceTypes"].map((p: any) => {
          return p;
        }),
  };
}

export function _problemClassificationPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    secondaryConsentEnabled: !item["secondaryConsentEnabled"]
      ? item["secondaryConsentEnabled"]
      : secondaryConsentEnabledArrayDeserializer(item["secondaryConsentEnabled"]),
  };
}

export function _communicationDetailsPropertiesSerializer(item: CommunicationDetails): any {
  return { sender: item["sender"], subject: item["subject"], body: item["body"] };
}

export function _communicationDetailsPropertiesDeserializer(item: any) {
  return {
    communicationType: item["communicationType"],
    communicationDirection: item["communicationDirection"],
    sender: item["sender"],
    subject: item["subject"],
    body: item["body"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
  };
}

export function _supportTicketDetailsPropertiesSerializer(item: SupportTicketDetails): any {
  return {
    supportTicketId: item["supportTicketId"],
    description: item["description"],
    problemClassificationId: item["problemClassificationId"],
    severity: item["severity"],
    enrollmentId: item["enrollmentId"],
    require24X7Response: item["require24X7Response"],
    advancedDiagnosticConsent: item["advancedDiagnosticConsent"],
    problemScopingQuestions: item["problemScopingQuestions"],
    supportPlanId: item["supportPlanId"],
    contactDetails: contactProfileSerializer(item["contactDetails"]),
    serviceLevelAgreement: !item["serviceLevelAgreement"]
      ? item["serviceLevelAgreement"]
      : serviceLevelAgreementSerializer(item["serviceLevelAgreement"]),
    supportEngineer: !item["supportEngineer"]
      ? item["supportEngineer"]
      : supportEngineerSerializer(item["supportEngineer"]),
    title: item["title"],
    problemStartTime: !item["problemStartTime"]
      ? item["problemStartTime"]
      : item["problemStartTime"].toISOString(),
    serviceId: item["serviceId"],
    fileWorkspaceName: item["fileWorkspaceName"],
    technicalTicketDetails: !item["technicalTicketDetails"]
      ? item["technicalTicketDetails"]
      : technicalTicketDetailsSerializer(item["technicalTicketDetails"]),
    quotaTicketDetails: !item["quotaTicketDetails"]
      ? item["quotaTicketDetails"]
      : quotaTicketDetailsSerializer(item["quotaTicketDetails"]),
    secondaryConsent: !item["secondaryConsent"]
      ? item["secondaryConsent"]
      : secondaryConsentArraySerializer(item["secondaryConsent"]),
    directConnectEscalation: !item["directConnectEscalation"]
      ? item["directConnectEscalation"]
      : directConnectEscalationSerializer(item["directConnectEscalation"]),
    communityForumPost: item["communityForumPost"],
  };
}

export function _supportTicketDetailsPropertiesDeserializer(item: any) {
  return {
    supportTicketId: item["supportTicketId"],
    description: item["description"],
    problemClassificationId: item["problemClassificationId"],
    problemClassificationDisplayName: item["problemClassificationDisplayName"],
    severity: item["severity"],
    enrollmentId: item["enrollmentId"],
    require24X7Response: item["require24X7Response"],
    advancedDiagnosticConsent: item["advancedDiagnosticConsent"],
    problemScopingQuestions: item["problemScopingQuestions"],
    supportPlanId: item["supportPlanId"],
    contactDetails: contactProfileDeserializer(item["contactDetails"]),
    serviceLevelAgreement: !item["serviceLevelAgreement"]
      ? item["serviceLevelAgreement"]
      : serviceLevelAgreementDeserializer(item["serviceLevelAgreement"]),
    supportEngineer: !item["supportEngineer"]
      ? item["supportEngineer"]
      : supportEngineerDeserializer(item["supportEngineer"]),
    supportPlanType: item["supportPlanType"],
    supportPlanDisplayName: item["supportPlanDisplayName"],
    title: item["title"],
    problemStartTime: !item["problemStartTime"]
      ? item["problemStartTime"]
      : new Date(item["problemStartTime"]),
    serviceId: item["serviceId"],
    serviceDisplayName: item["serviceDisplayName"],
    status: item["status"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    modifiedDate: !item["modifiedDate"] ? item["modifiedDate"] : new Date(item["modifiedDate"]),
    fileWorkspaceName: item["fileWorkspaceName"],
    isTemporaryTicket: item["isTemporaryTicket"],
    technicalTicketDetails: !item["technicalTicketDetails"]
      ? item["technicalTicketDetails"]
      : technicalTicketDetailsDeserializer(item["technicalTicketDetails"]),
    quotaTicketDetails: !item["quotaTicketDetails"]
      ? item["quotaTicketDetails"]
      : quotaTicketDetailsDeserializer(item["quotaTicketDetails"]),
    secondaryConsent: !item["secondaryConsent"]
      ? item["secondaryConsent"]
      : secondaryConsentArrayDeserializer(item["secondaryConsent"]),
    directConnectEscalation: !item["directConnectEscalation"]
      ? item["directConnectEscalation"]
      : directConnectEscalationDeserializer(item["directConnectEscalation"]),
    communityForumPost: item["communityForumPost"],
    supportChannel: item["supportChannel"],
    chatConversationStatus: item["chatConversationStatus"],
  };
}

export function _chatTranscriptDetailsPropertiesDeserializer(item: any) {
  return {
    messages: !item["messages"]
      ? item["messages"]
      : messagePropertiesArrayDeserializer(item["messages"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
  };
}

export function _fileWorkspaceDetailsPropertiesDeserializer(item: any) {
  return {
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
  };
}

export function _fileDetailsPropertiesSerializer(item: FileDetails): any {
  return {
    chunkSize: item["chunkSize"],
    fileSize: item["fileSize"],
    numberOfChunks: item["numberOfChunks"],
  };
}

export function _fileDetailsPropertiesDeserializer(item: any) {
  return {
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    chunkSize: item["chunkSize"],
    fileSize: item["fileSize"],
    numberOfChunks: item["numberOfChunks"],
  };
}
