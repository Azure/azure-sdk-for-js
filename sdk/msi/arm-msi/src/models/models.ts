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
  name?: string;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
  };
}

/** Localized display information for and operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  provider?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  operation?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  resource?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    operation: item["operation"],
    resource: item["resource"],
    description: item["description"],
  };
}

/** An error response from the ManagedServiceIdentity service. */
export interface CloudError {
  /** A list of additional details about the error. */
  error?: CloudErrorBody;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
  };
}

/** An error response from the ManagedServiceIdentity service. */
export interface CloudErrorBody {
  /** An identifier for the error. */
  code?: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message?: string;
  /** The target of the particular error. For example, the name of the property in error. */
  target?: string;
  /** A list of additional details about the error. */
  details?: CloudErrorBody[];
}

export function cloudErrorBodyDeserializer(item: any): CloudErrorBody {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : cloudErrorBodyArrayDeserializer(item["details"]),
  };
}

export function cloudErrorBodyArrayDeserializer(result: Array<CloudErrorBody>): any[] {
  return result.map((item) => {
    return cloudErrorBodyDeserializer(item);
  });
}

/** Describes a system assigned identity resource. */
export interface SystemAssignedIdentity extends ExtensionResource {
  /** The properties associated with the identity. */
  readonly properties?: SystemAssignedIdentityProperties;
  location: string;
  tags?: Record<string, string>;
}

export function systemAssignedIdentityDeserializer(item: any): SystemAssignedIdentity {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : systemAssignedIdentityPropertiesDeserializer(item["properties"]),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The properties associated with the system assigned identity. */
export interface SystemAssignedIdentityProperties {
  /** The id of the tenant which the identity belongs to. */
  readonly tenantId?: string;
  /** The id of the service principal object associated with the created identity. */
  readonly principalId?: string;
  /** The id of the app associated with the identity. This is a random generated UUID by MSI. */
  readonly clientId?: string;
  /** The ManagedServiceIdentity DataPlane URL that can be queried to obtain the identity credentials. */
  readonly clientSecretUrl?: string;
}

export function systemAssignedIdentityPropertiesDeserializer(
  item: any,
): SystemAssignedIdentityProperties {
  return {
    tenantId: item["tenantId"],
    principalId: item["principalId"],
    clientId: item["clientId"],
    clientSecretUrl: item["clientSecretUrl"],
  };
}

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

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

/** Describes a federated identity credential. */
export interface FederatedIdentityCredential extends ProxyResource {
  /** The URL of the issuer to be trusted. */
  issuer?: string;
  /** The identifier of the external identity. */
  subject?: string;
  /** The list of audiences that can appear in the issued token. */
  audiences?: string[];
  /** Object for defining the allowed identifiers of external identities. Either 'subject' or 'claimsMatchingExpression' must be defined, but not both. Introduced in 2025-01-31-preview. */
  claimsMatchingExpression?: ClaimsMatchingExpression;
}

export function federatedIdentityCredentialSerializer(item: FederatedIdentityCredential): any {
  return {
    properties: areAllPropsUndefined(item, [
      "issuer",
      "subject",
      "audiences",
      "claimsMatchingExpression",
    ])
      ? undefined
      : _federatedIdentityCredentialPropertiesSerializer(item),
  };
}

export function federatedIdentityCredentialDeserializer(item: any): FederatedIdentityCredential {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _federatedIdentityCredentialPropertiesDeserializer(item["properties"])),
  };
}

/** The properties associated with a federated identity credential. */
export interface FederatedIdentityCredentialProperties {
  /** The URL of the issuer to be trusted. */
  issuer: string;
  /** The identifier of the external identity. */
  subject?: string;
  /** The list of audiences that can appear in the issued token. */
  audiences: string[];
  /** Object for defining the allowed identifiers of external identities. Either 'subject' or 'claimsMatchingExpression' must be defined, but not both. Introduced in 2025-01-31-preview. */
  claimsMatchingExpression?: ClaimsMatchingExpression;
}

export function federatedIdentityCredentialPropertiesSerializer(
  item: FederatedIdentityCredentialProperties,
): any {
  return {
    issuer: item["issuer"],
    subject: item["subject"],
    audiences: item["audiences"].map((p: any) => {
      return p;
    }),
    claimsMatchingExpression: !item["claimsMatchingExpression"]
      ? item["claimsMatchingExpression"]
      : claimsMatchingExpressionSerializer(item["claimsMatchingExpression"]),
  };
}

export function federatedIdentityCredentialPropertiesDeserializer(
  item: any,
): FederatedIdentityCredentialProperties {
  return {
    issuer: item["issuer"],
    subject: item["subject"],
    audiences: item["audiences"].map((p: any) => {
      return p;
    }),
    claimsMatchingExpression: !item["claimsMatchingExpression"]
      ? item["claimsMatchingExpression"]
      : claimsMatchingExpressionDeserializer(item["claimsMatchingExpression"]),
  };
}

/** Object for defining the allowed identifiers of external identities. Introduced in 2025-01-31-preview. */
export interface ClaimsMatchingExpression {
  /** Wildcard-based expression for matching incoming subject claims. */
  value: string;
  /** Specifies the version of the flexible fic language used in the expression. */
  languageVersion: number;
}

export function claimsMatchingExpressionSerializer(item: ClaimsMatchingExpression): any {
  return { value: item["value"], languageVersion: item["languageVersion"] };
}

export function claimsMatchingExpressionDeserializer(item: any): ClaimsMatchingExpression {
  return {
    value: item["value"],
    languageVersion: item["languageVersion"],
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

/** Values returned by the List operation for federated identity credentials. */
export interface _FederatedIdentityCredentialsListResult {
  /** The FederatedIdentityCredential items on this page */
  value: FederatedIdentityCredential[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _federatedIdentityCredentialsListResultDeserializer(
  item: any,
): _FederatedIdentityCredentialsListResult {
  return {
    value: federatedIdentityCredentialArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function federatedIdentityCredentialArraySerializer(
  result: Array<FederatedIdentityCredential>,
): any[] {
  return result.map((item) => {
    return federatedIdentityCredentialSerializer(item);
  });
}

export function federatedIdentityCredentialArrayDeserializer(
  result: Array<FederatedIdentityCredential>,
): any[] {
  return result.map((item) => {
    return federatedIdentityCredentialDeserializer(item);
  });
}

/** Describes an identity resource. */
export interface Identity extends TrackedResource {
  /** The properties associated with the identity. */
  properties?: UserAssignedIdentityProperties;
}

export function identitySerializer(item: Identity): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : userAssignedIdentityPropertiesSerializer(item["properties"]),
  };
}

export function identityDeserializer(item: any): Identity {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : userAssignedIdentityPropertiesDeserializer(item["properties"]),
  };
}

/** The properties associated with the user assigned identity. */
export interface UserAssignedIdentityProperties {
  /** The id of the tenant which the identity belongs to. */
  readonly tenantId?: string;
  /** The id of the service principal object associated with the created identity. */
  readonly principalId?: string;
  /** The id of the app associated with the identity. This is a random generated UUID by MSI. */
  readonly clientId?: string;
  /** Enum to configure regional restrictions on identity assignment, as necessary. */
  isolationScope?: IsolationScope;
  /** Restrictions on which resource providers this identity can be assigned to. */
  assignmentRestrictions?: AssignmentRestrictions;
}

export function userAssignedIdentityPropertiesSerializer(
  item: UserAssignedIdentityProperties,
): any {
  return {
    isolationScope: item["isolationScope"],
    assignmentRestrictions: !item["assignmentRestrictions"]
      ? item["assignmentRestrictions"]
      : assignmentRestrictionsSerializer(item["assignmentRestrictions"]),
  };
}

export function userAssignedIdentityPropertiesDeserializer(
  item: any,
): UserAssignedIdentityProperties {
  return {
    tenantId: item["tenantId"],
    principalId: item["principalId"],
    clientId: item["clientId"],
    isolationScope: item["isolationScope"],
    assignmentRestrictions: !item["assignmentRestrictions"]
      ? item["assignmentRestrictions"]
      : assignmentRestrictionsDeserializer(item["assignmentRestrictions"]),
  };
}

/** Enum to configure regional restrictions on identity assignment, as necessary. */
export enum KnownIsolationScope {
  /** None */
  None = "None",
  /** Regional */
  Regional = "Regional",
}

/**
 * Enum to configure regional restrictions on identity assignment, as necessary. \
 * {@link KnownIsolationScope} can be used interchangeably with IsolationScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Regional**
 */
export type IsolationScope = string;

/** Configuration to restrict identity assignment to specific resource providers or resource types. */
export interface AssignmentRestrictions {
  /** List of resource providers or resource providers with resource types that this identity can be assigned to (case-insensitive). Examples: 'Microsoft.Compute', 'Microsoft.Storage/Accounts', 'Microsoft.Network/VirtualNetworks'. */
  providers?: string[];
}

export function assignmentRestrictionsSerializer(item: AssignmentRestrictions): any {
  return {
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
  };
}

export function assignmentRestrictionsDeserializer(item: any): AssignmentRestrictions {
  return {
    providers: !item["providers"]
      ? item["providers"]
      : item["providers"].map((p: any) => {
          return p;
        }),
  };
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** Describes an identity resource. */
export interface IdentityUpdate extends Resource {
  /** The geo-location where the resource lives */
  location?: string;
  /** Resource tags */
  tags?: Record<string, string>;
  /** The id of the tenant which the identity belongs to. */
  readonly tenantId?: string;
  /** The id of the service principal object associated with the created identity. */
  readonly principalId?: string;
  /** The id of the app associated with the identity. This is a random generated UUID by MSI. */
  readonly clientId?: string;
  /** Enum to configure regional restrictions on identity assignment, as necessary. */
  isolationScope?: IsolationScope;
  /** Restrictions on which resource providers this identity can be assigned to. */
  assignmentRestrictions?: AssignmentRestrictions;
}

export function identityUpdateSerializer(item: IdentityUpdate): any {
  return {
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["isolationScope", "assignmentRestrictions"])
      ? undefined
      : _identityUpdatePropertiesSerializer(item),
  };
}

/** Values returned by the List operation. */
export interface _UserAssignedIdentitiesListResult {
  /** The Identity items on this page */
  value: Identity[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _userAssignedIdentitiesListResultDeserializer(
  item: any,
): _UserAssignedIdentitiesListResult {
  return {
    value: identityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function identityArraySerializer(result: Array<Identity>): any[] {
  return result.map((item) => {
    return identitySerializer(item);
  });
}

export function identityArrayDeserializer(result: Array<Identity>): any[] {
  return result.map((item) => {
    return identityDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-11-30 API version. */
  V20241130 = "2024-11-30",
  /** The 2025-05-31-preview API version. */
  V20250531Preview = "2025-05-31-preview",
}

export function _federatedIdentityCredentialPropertiesSerializer(
  item: FederatedIdentityCredential,
): any {
  return {
    issuer: item["issuer"],
    subject: item["subject"],
    audiences: !item["audiences"]
      ? item["audiences"]
      : item["audiences"].map((p: any) => {
          return p;
        }),
    claimsMatchingExpression: !item["claimsMatchingExpression"]
      ? item["claimsMatchingExpression"]
      : claimsMatchingExpressionSerializer(item["claimsMatchingExpression"]),
  };
}

export function _federatedIdentityCredentialPropertiesDeserializer(item: any) {
  return {
    issuer: item["issuer"],
    subject: item["subject"],
    audiences: !item["audiences"]
      ? item["audiences"]
      : item["audiences"].map((p: any) => {
          return p;
        }),
    claimsMatchingExpression: !item["claimsMatchingExpression"]
      ? item["claimsMatchingExpression"]
      : claimsMatchingExpressionDeserializer(item["claimsMatchingExpression"]),
  };
}

export function _identityUpdatePropertiesSerializer(item: IdentityUpdate): any {
  return {
    isolationScope: item["isolationScope"],
    assignmentRestrictions: !item["assignmentRestrictions"]
      ? item["assignmentRestrictions"]
      : assignmentRestrictionsSerializer(item["assignmentRestrictions"]),
  };
}

export function _identityUpdatePropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    principalId: item["principalId"],
    clientId: item["clientId"],
    isolationScope: item["isolationScope"],
    assignmentRestrictions: !item["assignmentRestrictions"]
      ? item["assignmentRestrictions"]
      : assignmentRestrictionsDeserializer(item["assignmentRestrictions"]),
  };
}
