// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";
import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The policy assignment. */
export interface PolicyAssignment extends ExtensionResource {
  /** The location of the policy assignment. Only required when utilizing managed identity. */
  location?: string;
  /** The managed identity associated with the policy assignment. */
  identity?: Identity;
  /** The display name of the policy assignment. */
  displayName?: string;
  /** The ID of the policy definition or policy set definition being assigned. */
  policyDefinitionId?: string;
  /** The version of the policy definition to use. */
  definitionVersion?: string;
  /** The latest version of the policy definition available. This is only present if requested via the $expand query parameter. */
  readonly latestDefinitionVersion?: string;
  /** The effective version of the policy definition in use. This is only present if requested via the $expand query parameter. */
  readonly effectiveDefinitionVersion?: string;
  /** The scope for the policy assignment. */
  readonly scope?: string;
  /** The policy's excluded scopes. */
  notScopes?: string[];
  /** The parameter values for the assigned policy rule. The keys are the parameter names. */
  parameters?: Record<string, ParameterValuesValue>;
  /** This message will be part of response in case of policy violation. */
  description?: string;
  /** The policy assignment metadata. Metadata is an open ended object and is typically a collection of key value pairs. */
  metadata?: any;
  /** The policy assignment enforcement mode. Possible values are Default, DoNotEnforce, and Enroll */
  enforcementMode?: EnforcementMode;
  /** The messages that describe why a resource is non-compliant with the policy. */
  nonComplianceMessages?: NonComplianceMessage[];
  /** The resource selector list to filter policies by resource properties. */
  resourceSelectors?: ResourceSelector[];
  /** The policy property value override. */
  overrides?: Override[];
  /** The type of policy assignment. Possible values are NotSpecified, System, SystemHidden, and Custom. Immutable. */
  assignmentType?: AssignmentType;
  /** The instance ID of the policy assignment. This ID only and always changes when the assignment is deleted and recreated. */
  readonly instanceId?: string;
}

export function policyAssignmentSerializer(item: PolicyAssignment): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "policyDefinitionId",
      "definitionVersion",
      "notScopes",
      "parameters",
      "description",
      "metadata",
      "enforcementMode",
      "nonComplianceMessages",
      "resourceSelectors",
      "overrides",
      "assignmentType",
    ])
      ? undefined
      : _policyAssignmentPropertiesSerializer(item),
    location: item["location"],
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
  };
}

export function policyAssignmentDeserializer(item: any): PolicyAssignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _policyAssignmentPropertiesDeserializer(item["properties"])),
    location: item["location"],
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
  };
}

/** The policy assignment properties. */
export interface PolicyAssignmentProperties {
  /** The display name of the policy assignment. */
  displayName?: string;
  /** The ID of the policy definition or policy set definition being assigned. */
  policyDefinitionId?: string;
  /** The version of the policy definition to use. */
  definitionVersion?: string;
  /** The latest version of the policy definition available. This is only present if requested via the $expand query parameter. */
  readonly latestDefinitionVersion?: string;
  /** The effective version of the policy definition in use. This is only present if requested via the $expand query parameter. */
  readonly effectiveDefinitionVersion?: string;
  /** The scope for the policy assignment. */
  readonly scope?: string;
  /** The policy's excluded scopes. */
  notScopes?: string[];
  /** The parameter values for the assigned policy rule. The keys are the parameter names. */
  parameters?: Record<string, ParameterValuesValue>;
  /** This message will be part of response in case of policy violation. */
  description?: string;
  /** The policy assignment metadata. Metadata is an open ended object and is typically a collection of key value pairs. */
  metadata?: any;
  /** The policy assignment enforcement mode. Possible values are Default, DoNotEnforce, and Enroll */
  enforcementMode?: EnforcementMode;
  /** The messages that describe why a resource is non-compliant with the policy. */
  nonComplianceMessages?: NonComplianceMessage[];
  /** The resource selector list to filter policies by resource properties. */
  resourceSelectors?: ResourceSelector[];
  /** The policy property value override. */
  overrides?: Override[];
  /** The type of policy assignment. Possible values are NotSpecified, System, SystemHidden, and Custom. Immutable. */
  assignmentType?: AssignmentType;
  /** The instance ID of the policy assignment. This ID only and always changes when the assignment is deleted and recreated. */
  readonly instanceId?: string;
}

export function policyAssignmentPropertiesSerializer(item: PolicyAssignmentProperties): any {
  return {
    displayName: item["displayName"],
    policyDefinitionId: item["policyDefinitionId"],
    definitionVersion: item["definitionVersion"],
    notScopes: !item["notScopes"]
      ? item["notScopes"]
      : item["notScopes"].map((p: any) => {
          return p;
        }),
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterValuesValueRecordSerializer(item["parameters"]),
    description: item["description"],
    metadata: item["metadata"],
    enforcementMode: item["enforcementMode"],
    nonComplianceMessages: !item["nonComplianceMessages"]
      ? item["nonComplianceMessages"]
      : nonComplianceMessageArraySerializer(item["nonComplianceMessages"]),
    resourceSelectors: !item["resourceSelectors"]
      ? item["resourceSelectors"]
      : resourceSelectorArraySerializer(item["resourceSelectors"]),
    overrides: !item["overrides"] ? item["overrides"] : overrideArraySerializer(item["overrides"]),
    assignmentType: item["assignmentType"],
  };
}

export function policyAssignmentPropertiesDeserializer(item: any): PolicyAssignmentProperties {
  return {
    displayName: item["displayName"],
    policyDefinitionId: item["policyDefinitionId"],
    definitionVersion: item["definitionVersion"],
    latestDefinitionVersion: item["latestDefinitionVersion"],
    effectiveDefinitionVersion: item["effectiveDefinitionVersion"],
    scope: item["scope"],
    notScopes: !item["notScopes"]
      ? item["notScopes"]
      : item["notScopes"].map((p: any) => {
          return p;
        }),
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterValuesValueRecordDeserializer(item["parameters"]),
    description: item["description"],
    metadata: item["metadata"],
    enforcementMode: item["enforcementMode"],
    nonComplianceMessages: !item["nonComplianceMessages"]
      ? item["nonComplianceMessages"]
      : nonComplianceMessageArrayDeserializer(item["nonComplianceMessages"]),
    resourceSelectors: !item["resourceSelectors"]
      ? item["resourceSelectors"]
      : resourceSelectorArrayDeserializer(item["resourceSelectors"]),
    overrides: !item["overrides"]
      ? item["overrides"]
      : overrideArrayDeserializer(item["overrides"]),
    assignmentType: item["assignmentType"],
    instanceId: item["instanceId"],
  };
}

export function parameterValuesValueRecordSerializer(
  item: Record<string, ParameterValuesValue>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : parameterValuesValueSerializer(item[key]);
  });
  return result;
}

export function parameterValuesValueRecordDeserializer(
  item: Record<string, any>,
): Record<string, ParameterValuesValue> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : parameterValuesValueDeserializer(item[key]);
  });
  return result;
}

/** The value of a parameter. */
export interface ParameterValuesValue {
  /** The value of the parameter. */
  value?: any;
}

export function parameterValuesValueSerializer(item: ParameterValuesValue): any {
  return { value: item["value"] };
}

export function parameterValuesValueDeserializer(item: any): ParameterValuesValue {
  return {
    value: item["value"],
  };
}

/** The policy assignment enforcement mode. Possible values are Default, DoNotEnforce, and Enroll */
export enum KnownEnforcementMode {
  /** The policy effect is enforced during resource creation or update. */
  Default = "Default",
  /** The policy effect is not enforced during resource creation or update. */
  DoNotEnforce = "DoNotEnforce",
  /** The policy effect is not enforced during resource creation or update until the resource or scope of the resource is enrolled to the assignment instance. Enrollment occurs upon deployment of the policy enrollment resource. */
  Enroll = "Enroll",
}

/**
 * The policy assignment enforcement mode. Possible values are Default, DoNotEnforce, and Enroll \
 * {@link KnownEnforcementMode} can be used interchangeably with EnforcementMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: The policy effect is enforced during resource creation or update. \
 * **DoNotEnforce**: The policy effect is not enforced during resource creation or update. \
 * **Enroll**: The policy effect is not enforced during resource creation or update until the resource or scope of the resource is enrolled to the assignment instance. Enrollment occurs upon deployment of the policy enrollment resource.
 */
export type EnforcementMode = string;

export function nonComplianceMessageArraySerializer(result: Array<NonComplianceMessage>): any[] {
  return result.map((item) => {
    return nonComplianceMessageSerializer(item);
  });
}

export function nonComplianceMessageArrayDeserializer(result: Array<NonComplianceMessage>): any[] {
  return result.map((item) => {
    return nonComplianceMessageDeserializer(item);
  });
}

/** A message that describes why a resource is non-compliant with the policy. This is shown in 'deny' error messages and on resource's non-compliant compliance results. */
export interface NonComplianceMessage {
  /** A message that describes why a resource is non-compliant with the policy. This is shown in 'deny' error messages and on resource's non-compliant compliance results. */
  message: string;
  /** The policy definition reference ID within a policy set definition the message is intended for. This is only applicable if the policy assignment assigns a policy set definition. If this is not provided the message applies to all policies assigned by this policy assignment. */
  policyDefinitionReferenceId?: string;
}

export function nonComplianceMessageSerializer(item: NonComplianceMessage): any {
  return {
    message: item["message"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
  };
}

export function nonComplianceMessageDeserializer(item: any): NonComplianceMessage {
  return {
    message: item["message"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
  };
}

export function resourceSelectorArraySerializer(result: Array<ResourceSelector>): any[] {
  return result.map((item) => {
    return resourceSelectorSerializer(item);
  });
}

export function resourceSelectorArrayDeserializer(result: Array<ResourceSelector>): any[] {
  return result.map((item) => {
    return resourceSelectorDeserializer(item);
  });
}

/** The resource selector to filter policies by resource properties. */
export interface ResourceSelector {
  /** The name of the resource selector. */
  name?: string;
  /** The list of the selector expressions. */
  selectors?: Selector[];
}

export function resourceSelectorSerializer(item: ResourceSelector): any {
  return {
    name: item["name"],
    selectors: !item["selectors"] ? item["selectors"] : selectorArraySerializer(item["selectors"]),
  };
}

export function resourceSelectorDeserializer(item: any): ResourceSelector {
  return {
    name: item["name"],
    selectors: !item["selectors"]
      ? item["selectors"]
      : selectorArrayDeserializer(item["selectors"]),
  };
}

export function selectorArraySerializer(result: Array<Selector>): any[] {
  return result.map((item) => {
    return selectorSerializer(item);
  });
}

export function selectorArrayDeserializer(result: Array<Selector>): any[] {
  return result.map((item) => {
    return selectorDeserializer(item);
  });
}

/** The selector expression. */
export interface Selector {
  /** The selector kind. */
  kind?: SelectorKind;
  /** The list of values to filter in. */
  in?: string[];
  /** The list of values to filter out. */
  notIn?: string[];
}

export function selectorSerializer(item: Selector): any {
  return {
    kind: item["kind"],
    in: !item["in"]
      ? item["in"]
      : item["in"].map((p: any) => {
          return p;
        }),
    notIn: !item["notIn"]
      ? item["notIn"]
      : item["notIn"].map((p: any) => {
          return p;
        }),
  };
}

export function selectorDeserializer(item: any): Selector {
  return {
    kind: item["kind"],
    in: !item["in"]
      ? item["in"]
      : item["in"].map((p: any) => {
          return p;
        }),
    notIn: !item["notIn"]
      ? item["notIn"]
      : item["notIn"].map((p: any) => {
          return p;
        }),
  };
}

/** The selector kind. */
export enum KnownSelectorKind {
  /** The selector kind to filter policies by the resource location. */
  ResourceLocation = "resourceLocation",
  /** The selector kind to filter policies by the resource type. */
  ResourceType = "resourceType",
  /** The selector kind to filter policies by the resource without location. */
  ResourceWithoutLocation = "resourceWithoutLocation",
  /** The selector kind to filter policies by the policy definition reference ID. */
  PolicyDefinitionReferenceId = "policyDefinitionReferenceId",
}

/**
 * The selector kind. \
 * {@link KnownSelectorKind} can be used interchangeably with SelectorKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **resourceLocation**: The selector kind to filter policies by the resource location. \
 * **resourceType**: The selector kind to filter policies by the resource type. \
 * **resourceWithoutLocation**: The selector kind to filter policies by the resource without location. \
 * **policyDefinitionReferenceId**: The selector kind to filter policies by the policy definition reference ID.
 */
export type SelectorKind = string;

export function overrideArraySerializer(result: Array<Override>): any[] {
  return result.map((item) => {
    return overrideSerializer(item);
  });
}

export function overrideArrayDeserializer(result: Array<Override>): any[] {
  return result.map((item) => {
    return overrideDeserializer(item);
  });
}

/** The policy property value override. */
export interface Override {
  /** The override kind. */
  kind?: OverrideKind;
  /** The value to override the policy property. */
  value?: string;
  /** The list of the selector expressions. */
  selectors?: Selector[];
}

export function overrideSerializer(item: Override): any {
  return {
    kind: item["kind"],
    value: item["value"],
    selectors: !item["selectors"] ? item["selectors"] : selectorArraySerializer(item["selectors"]),
  };
}

export function overrideDeserializer(item: any): Override {
  return {
    kind: item["kind"],
    value: item["value"],
    selectors: !item["selectors"]
      ? item["selectors"]
      : selectorArrayDeserializer(item["selectors"]),
  };
}

/** The override kind. */
export enum KnownOverrideKind {
  /** It will override the policy effect type. */
  PolicyEffect = "policyEffect",
  /** It will override the definition version property value of the policy assignment. */
  DefinitionVersion = "definitionVersion",
}

/**
 * The override kind. \
 * {@link KnownOverrideKind} can be used interchangeably with OverrideKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **policyEffect**: It will override the policy effect type. \
 * **definitionVersion**: It will override the definition version property value of the policy assignment.
 */
export type OverrideKind = string;

/** The type of policy assignment. Possible values are NotSpecified, System, SystemHidden, and Custom. Immutable. */
export enum KnownAssignmentType {
  /** The not specified assignment type. */
  NotSpecified = "NotSpecified",
  /** The system assignment type. */
  System = "System",
  /** The system hidden assignment type. */
  SystemHidden = "SystemHidden",
  /** The custom assignment type. */
  Custom = "Custom",
}

/**
 * The type of policy assignment. Possible values are NotSpecified, System, SystemHidden, and Custom. Immutable. \
 * {@link KnownAssignmentType} can be used interchangeably with AssignmentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: The not specified assignment type. \
 * **System**: The system assignment type. \
 * **SystemHidden**: The system hidden assignment type. \
 * **Custom**: The custom assignment type.
 */
export type AssignmentType = string;

/** Identity for the resource.  Policy assignments support a maximum of one identity.  That is either a system assigned identity or a single user assigned identity. */
export interface Identity {
  /** The principal ID of the resource identity.  This property will only be provided for a system assigned identity */
  readonly principalId?: string;
  /** The tenant ID of the resource identity.  This property will only be provided for a system assigned identity */
  readonly tenantId?: string;
  /** The identity type. This is the only required field when adding a system or user assigned identity to a resource. */
  type?: ResourceIdentityType;
  /** The user identity associated with the policy. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserAssignedIdentitiesValue>;
}

export function identitySerializer(item: Identity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesValueRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityDeserializer(item: any): Identity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesValueRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The identity type. This is the only required field when adding a system or user assigned identity to a resource. */
export type ResourceIdentityType = "SystemAssigned" | "UserAssigned" | "None";

export function userAssignedIdentitiesValueRecordSerializer(
  item: Record<string, UserAssignedIdentitiesValue>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitiesValueSerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentitiesValueRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentitiesValue> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitiesValueDeserializer(item[key]);
  });
  return result;
}

/** model interface UserAssignedIdentitiesValue */
export interface UserAssignedIdentitiesValue {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitiesValueSerializer(item: UserAssignedIdentitiesValue): any {
  return item;
}

export function userAssignedIdentitiesValueDeserializer(item: any): UserAssignedIdentitiesValue {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

export function extensionResourceSerializer(item: ExtensionResource): any {
  return item;
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

export function resourceSerializer(item: Resource): any {
  return item;
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

/** The policy assignment for Patch request. */
export interface PolicyAssignmentUpdate {
  /** The location of the policy assignment. Only required when utilizing managed identity. */
  location?: string;
  /** The managed identity associated with the policy assignment. */
  identity?: Identity;
  /** The resource selector list to filter policies by resource properties. */
  resourceSelectors?: ResourceSelector[];
  /** The policy property value override. */
  overrides?: Override[];
}

export function policyAssignmentUpdateSerializer(item: PolicyAssignmentUpdate): any {
  return {
    properties: areAllPropsUndefined(item, ["resourceSelectors", "overrides"])
      ? undefined
      : _policyAssignmentUpdatePropertiesSerializer(item),
    location: item["location"],
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
  };
}

/** The policy assignment properties for Patch request. */
export interface PolicyAssignmentUpdateProperties {
  /** The resource selector list to filter policies by resource properties. */
  resourceSelectors?: ResourceSelector[];
  /** The policy property value override. */
  overrides?: Override[];
}

export function policyAssignmentUpdatePropertiesSerializer(
  item: PolicyAssignmentUpdateProperties,
): any {
  return {
    resourceSelectors: !item["resourceSelectors"]
      ? item["resourceSelectors"]
      : resourceSelectorArraySerializer(item["resourceSelectors"]),
    overrides: !item["overrides"] ? item["overrides"] : overrideArraySerializer(item["overrides"]),
  };
}

/** The response of a PolicyAssignment list operation. */
export interface _PolicyAssignmentListResult {
  /** The PolicyAssignment items on this page */
  value: PolicyAssignment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _policyAssignmentListResultDeserializer(item: any): _PolicyAssignmentListResult {
  return {
    value: policyAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function policyAssignmentArraySerializer(result: Array<PolicyAssignment>): any[] {
  return result.map((item) => {
    return policyAssignmentSerializer(item);
  });
}

export function policyAssignmentArrayDeserializer(result: Array<PolicyAssignment>): any[] {
  return result.map((item) => {
    return policyAssignmentDeserializer(item);
  });
}

/** The policy definition. */
export interface PolicyDefinition extends ProxyResource {
  /** The type of policy definition. Possible values are NotSpecified, BuiltIn, Custom, and Static. */
  policyType?: PolicyType;
  /** The policy definition mode. Some examples are All, Indexed, Microsoft.KeyVault.Data. */
  mode?: string;
  /** The display name of the policy definition. */
  displayName?: string;
  /** The policy definition description. */
  description?: string;
  /** The policy rule. */
  policyRule?: any;
  /** The policy definition metadata.  Metadata is an open ended object and is typically a collection of key value pairs. */
  metadata?: any;
  /** The parameter definitions for parameters used in the policy rule. The keys are the parameter names. */
  parameters?: Record<string, ParameterDefinitionsValue>;
  /** The policy definition version in #.#.# format. */
  version?: string;
  /** A list of available versions for this policy definition. */
  versions?: string[];
  /** The details of the source of external evaluation results required by the policy during enforcement evaluation. */
  externalEvaluationEnforcementSettings?: ExternalEvaluationEnforcementSettings;
}

export function policyDefinitionSerializer(item: PolicyDefinition): any {
  return {
    properties: areAllPropsUndefined(item, [
      "policyType",
      "mode",
      "displayName",
      "description",
      "policyRule",
      "metadata",
      "parameters",
      "version",
      "versions",
      "externalEvaluationEnforcementSettings",
    ])
      ? undefined
      : _policyDefinitionPropertiesSerializer(item),
  };
}

export function policyDefinitionDeserializer(item: any): PolicyDefinition {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _policyDefinitionPropertiesDeserializer(item["properties"])),
  };
}

/** The policy definition properties. */
export interface PolicyDefinitionProperties {
  /** The type of policy definition. Possible values are NotSpecified, BuiltIn, Custom, and Static. */
  policyType?: PolicyType;
  /** The policy definition mode. Some examples are All, Indexed, Microsoft.KeyVault.Data. */
  mode?: string;
  /** The display name of the policy definition. */
  displayName?: string;
  /** The policy definition description. */
  description?: string;
  /** The policy rule. */
  policyRule?: any;
  /** The policy definition metadata.  Metadata is an open ended object and is typically a collection of key value pairs. */
  metadata?: any;
  /** The parameter definitions for parameters used in the policy rule. The keys are the parameter names. */
  parameters?: Record<string, ParameterDefinitionsValue>;
  /** The policy definition version in #.#.# format. */
  version?: string;
  /** A list of available versions for this policy definition. */
  versions?: string[];
  /** The details of the source of external evaluation results required by the policy during enforcement evaluation. */
  externalEvaluationEnforcementSettings?: ExternalEvaluationEnforcementSettings;
}

export function policyDefinitionPropertiesSerializer(item: PolicyDefinitionProperties): any {
  return {
    policyType: item["policyType"],
    mode: item["mode"],
    displayName: item["displayName"],
    description: item["description"],
    policyRule: item["policyRule"],
    metadata: item["metadata"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterDefinitionsValueRecordSerializer(item["parameters"]),
    version: item["version"],
    versions: !item["versions"]
      ? item["versions"]
      : item["versions"].map((p: any) => {
          return p;
        }),
    externalEvaluationEnforcementSettings: !item["externalEvaluationEnforcementSettings"]
      ? item["externalEvaluationEnforcementSettings"]
      : externalEvaluationEnforcementSettingsSerializer(
          item["externalEvaluationEnforcementSettings"],
        ),
  };
}

export function policyDefinitionPropertiesDeserializer(item: any): PolicyDefinitionProperties {
  return {
    policyType: item["policyType"],
    mode: item["mode"],
    displayName: item["displayName"],
    description: item["description"],
    policyRule: item["policyRule"],
    metadata: item["metadata"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterDefinitionsValueRecordDeserializer(item["parameters"]),
    version: item["version"],
    versions: !item["versions"]
      ? item["versions"]
      : item["versions"].map((p: any) => {
          return p;
        }),
    externalEvaluationEnforcementSettings: !item["externalEvaluationEnforcementSettings"]
      ? item["externalEvaluationEnforcementSettings"]
      : externalEvaluationEnforcementSettingsDeserializer(
          item["externalEvaluationEnforcementSettings"],
        ),
  };
}

/** The type of policy definition. Possible values are NotSpecified, BuiltIn, Custom, and Static. */
export enum KnownPolicyType {
  /** The not specified policy definition type. */
  NotSpecified = "NotSpecified",
  /** The built in policy definition type. */
  BuiltIn = "BuiltIn",
  /** The custom policy definition type. */
  Custom = "Custom",
  /** The static policy definition type. */
  Static = "Static",
}

/**
 * The type of policy definition. Possible values are NotSpecified, BuiltIn, Custom, and Static. \
 * {@link KnownPolicyType} can be used interchangeably with PolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: The not specified policy definition type. \
 * **BuiltIn**: The built in policy definition type. \
 * **Custom**: The custom policy definition type. \
 * **Static**: The static policy definition type.
 */
export type PolicyType = string;

export function parameterDefinitionsValueRecordSerializer(
  item: Record<string, ParameterDefinitionsValue>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : parameterDefinitionsValueSerializer(item[key]);
  });
  return result;
}

export function parameterDefinitionsValueRecordDeserializer(
  item: Record<string, any>,
): Record<string, ParameterDefinitionsValue> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : parameterDefinitionsValueDeserializer(item[key]);
  });
  return result;
}

/** The definition of a parameter that can be provided to the policy. */
export interface ParameterDefinitionsValue {
  /** The data type of the parameter. */
  type?: ParameterType;
  /** The allowed values for the parameter. */
  allowedValues?: any[];
  /** The default value for the parameter if no value is provided. */
  defaultValue?: any;
  /** Provides validation of parameter inputs during assignment using a self-defined JSON schema. This property is only supported for object-type parameters and follows the Json.NET Schema 2019-09 implementation. You can learn more about using schemas at https://json-schema.org/ and test draft schemas at https://www.jsonschemavalidator.net/. */
  schema?: any;
  /** General metadata for the parameter. */
  metadata?: ParameterDefinitionsValueMetadata;
}

export function parameterDefinitionsValueSerializer(item: ParameterDefinitionsValue): any {
  return {
    type: item["type"],
    allowedValues: !item["allowedValues"]
      ? item["allowedValues"]
      : item["allowedValues"].map((p: any) => {
          return p;
        }),
    defaultValue: item["defaultValue"],
    schema: item["schema"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : parameterDefinitionsValueMetadataSerializer(item["metadata"]),
  };
}

export function parameterDefinitionsValueDeserializer(item: any): ParameterDefinitionsValue {
  return {
    type: item["type"],
    allowedValues: !item["allowedValues"]
      ? item["allowedValues"]
      : item["allowedValues"].map((p: any) => {
          return p;
        }),
    defaultValue: item["defaultValue"],
    schema: item["schema"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : parameterDefinitionsValueMetadataDeserializer(item["metadata"]),
  };
}

/** The data type of the parameter. */
export enum KnownParameterType {
  /** The string parameter type. */
  String = "String",
  /** The array parameter type. */
  Array = "Array",
  /** The object parameter type. */
  Object = "Object",
  /** The boolean parameter type. */
  Boolean = "Boolean",
  /** The integer parameter type. */
  Integer = "Integer",
  /** The float parameter type. */
  Float = "Float",
  /** The date-time parameter type. */
  DateTime = "DateTime",
}

/**
 * The data type of the parameter. \
 * {@link KnownParameterType} can be used interchangeably with ParameterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **String**: The string parameter type. \
 * **Array**: The array parameter type. \
 * **Object**: The object parameter type. \
 * **Boolean**: The boolean parameter type. \
 * **Integer**: The integer parameter type. \
 * **Float**: The float parameter type. \
 * **DateTime**: The date-time parameter type.
 */
export type ParameterType = string;

/** General metadata for the parameter. */
export interface ParameterDefinitionsValueMetadata {
  /** The display name for the parameter. */
  displayName?: string;
  /** The description of the parameter. */
  description?: string;
  /** Used when assigning the policy definition through the portal. Provides a context aware list of values for the user to choose from. */
  strongType?: string;
  /** Set to true to have Azure portal create role assignments on the resource ID or resource scope value of this parameter during policy assignment. This property is useful in case you wish to assign permissions outside the assignment scope. */
  assignPermissions?: boolean;
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function parameterDefinitionsValueMetadataSerializer(
  item: ParameterDefinitionsValueMetadata,
): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    displayName: item["displayName"],
    description: item["description"],
    strongType: item["strongType"],
    assignPermissions: item["assignPermissions"],
  };
}

export function parameterDefinitionsValueMetadataDeserializer(
  item: any,
): ParameterDefinitionsValueMetadata {
  return {
    additionalProperties: serializeRecord(item, [
      "displayName",
      "description",
      "strongType",
      "assignPermissions",
    ]),
    displayName: item["displayName"],
    description: item["description"],
    strongType: item["strongType"],
    assignPermissions: item["assignPermissions"],
  };
}

/** The details of the source of external evaluation results required by the policy during enforcement evaluation. */
export interface ExternalEvaluationEnforcementSettings {
  /** What to do when evaluating an enforcement policy that requires an external evaluation and the token is missing. Possible values are Audit and Deny and language expressions are supported. */
  missingTokenAction?: string;
  /** The lifespan of the endpoint invocation result after which it's no longer valid. Value is expected to follow the ISO 8601 duration format and language expressions are supported. */
  resultLifespan?: string;
  /** The settings of an external endpoint providing evaluation results. */
  endpointSettings?: ExternalEvaluationEndpointSettings;
  /** An array of the role definition Ids the assignment's MSI will need in order to invoke the endpoint. */
  roleDefinitionIds?: string[];
}

export function externalEvaluationEnforcementSettingsSerializer(
  item: ExternalEvaluationEnforcementSettings,
): any {
  return {
    missingTokenAction: item["missingTokenAction"],
    resultLifespan: item["resultLifespan"],
    endpointSettings: !item["endpointSettings"]
      ? item["endpointSettings"]
      : externalEvaluationEndpointSettingsSerializer(item["endpointSettings"]),
    roleDefinitionIds: !item["roleDefinitionIds"]
      ? item["roleDefinitionIds"]
      : item["roleDefinitionIds"].map((p: any) => {
          return p;
        }),
  };
}

export function externalEvaluationEnforcementSettingsDeserializer(
  item: any,
): ExternalEvaluationEnforcementSettings {
  return {
    missingTokenAction: item["missingTokenAction"],
    resultLifespan: item["resultLifespan"],
    endpointSettings: !item["endpointSettings"]
      ? item["endpointSettings"]
      : externalEvaluationEndpointSettingsDeserializer(item["endpointSettings"]),
    roleDefinitionIds: !item["roleDefinitionIds"]
      ? item["roleDefinitionIds"]
      : item["roleDefinitionIds"].map((p: any) => {
          return p;
        }),
  };
}

/** The settings of an external endpoint providing evaluation results. */
export interface ExternalEvaluationEndpointSettings {
  /** The kind of the endpoint. */
  kind?: string;
  /** The details of the endpoint. */
  details?: any;
}

export function externalEvaluationEndpointSettingsSerializer(
  item: ExternalEvaluationEndpointSettings,
): any {
  return { kind: item["kind"], details: item["details"] };
}

export function externalEvaluationEndpointSettingsDeserializer(
  item: any,
): ExternalEvaluationEndpointSettings {
  return {
    kind: item["kind"],
    details: item["details"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return item;
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

/** The response of a PolicyDefinition list operation. */
export interface _PolicyDefinitionListResult {
  /** The PolicyDefinition items on this page */
  value: PolicyDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _policyDefinitionListResultDeserializer(item: any): _PolicyDefinitionListResult {
  return {
    value: policyDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function policyDefinitionArraySerializer(result: Array<PolicyDefinition>): any[] {
  return result.map((item) => {
    return policyDefinitionSerializer(item);
  });
}

export function policyDefinitionArrayDeserializer(result: Array<PolicyDefinition>): any[] {
  return result.map((item) => {
    return policyDefinitionDeserializer(item);
  });
}

/** The ID of the policy definition version. */
export interface PolicyDefinitionVersion extends ProxyResource {
  /** The type of policy definition. Possible values are NotSpecified, BuiltIn, Custom, and Static. */
  policyType?: PolicyType;
  /** The policy definition mode. Some examples are All, Indexed, Microsoft.KeyVault.Data. */
  mode?: string;
  /** The display name of the policy definition. */
  displayName?: string;
  /** The policy definition description. */
  description?: string;
  /** The policy rule. */
  policyRule?: any;
  /** The policy definition metadata.  Metadata is an open ended object and is typically a collection of key value pairs. */
  metadata?: any;
  /** The parameter definitions for parameters used in the policy rule. The keys are the parameter names. */
  parameters?: Record<string, ParameterDefinitionsValue>;
  /** The policy definition version in #.#.# format. */
  version?: string;
  /** The details of the source of external evaluation results required by the policy during enforcement evaluation. */
  externalEvaluationEnforcementSettings?: ExternalEvaluationEnforcementSettings;
}

export function policyDefinitionVersionSerializer(item: PolicyDefinitionVersion): any {
  return {
    properties: areAllPropsUndefined(item, [
      "policyType",
      "mode",
      "displayName",
      "description",
      "policyRule",
      "metadata",
      "parameters",
      "version",
      "externalEvaluationEnforcementSettings",
    ])
      ? undefined
      : _policyDefinitionVersionPropertiesSerializer(item),
  };
}

export function policyDefinitionVersionDeserializer(item: any): PolicyDefinitionVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _policyDefinitionVersionPropertiesDeserializer(item["properties"])),
  };
}

/** The policy definition properties. */
export interface PolicyDefinitionVersionProperties {
  /** The type of policy definition. Possible values are NotSpecified, BuiltIn, Custom, and Static. */
  policyType?: PolicyType;
  /** The policy definition mode. Some examples are All, Indexed, Microsoft.KeyVault.Data. */
  mode?: string;
  /** The display name of the policy definition. */
  displayName?: string;
  /** The policy definition description. */
  description?: string;
  /** The policy rule. */
  policyRule?: any;
  /** The policy definition metadata.  Metadata is an open ended object and is typically a collection of key value pairs. */
  metadata?: any;
  /** The parameter definitions for parameters used in the policy rule. The keys are the parameter names. */
  parameters?: Record<string, ParameterDefinitionsValue>;
  /** The policy definition version in #.#.# format. */
  version?: string;
  /** The details of the source of external evaluation results required by the policy during enforcement evaluation. */
  externalEvaluationEnforcementSettings?: ExternalEvaluationEnforcementSettings;
}

export function policyDefinitionVersionPropertiesSerializer(
  item: PolicyDefinitionVersionProperties,
): any {
  return {
    policyType: item["policyType"],
    mode: item["mode"],
    displayName: item["displayName"],
    description: item["description"],
    policyRule: item["policyRule"],
    metadata: item["metadata"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterDefinitionsValueRecordSerializer(item["parameters"]),
    version: item["version"],
    externalEvaluationEnforcementSettings: !item["externalEvaluationEnforcementSettings"]
      ? item["externalEvaluationEnforcementSettings"]
      : externalEvaluationEnforcementSettingsSerializer(
          item["externalEvaluationEnforcementSettings"],
        ),
  };
}

export function policyDefinitionVersionPropertiesDeserializer(
  item: any,
): PolicyDefinitionVersionProperties {
  return {
    policyType: item["policyType"],
    mode: item["mode"],
    displayName: item["displayName"],
    description: item["description"],
    policyRule: item["policyRule"],
    metadata: item["metadata"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterDefinitionsValueRecordDeserializer(item["parameters"]),
    version: item["version"],
    externalEvaluationEnforcementSettings: !item["externalEvaluationEnforcementSettings"]
      ? item["externalEvaluationEnforcementSettings"]
      : externalEvaluationEnforcementSettingsDeserializer(
          item["externalEvaluationEnforcementSettings"],
        ),
  };
}

/** The response of a PolicyDefinitionVersion list operation. */
export interface _PolicyDefinitionVersionListResult {
  /** The PolicyDefinitionVersion items on this page */
  value: PolicyDefinitionVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _policyDefinitionVersionListResultDeserializer(
  item: any,
): _PolicyDefinitionVersionListResult {
  return {
    value: policyDefinitionVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function policyDefinitionVersionArraySerializer(
  result: Array<PolicyDefinitionVersion>,
): any[] {
  return result.map((item) => {
    return policyDefinitionVersionSerializer(item);
  });
}

export function policyDefinitionVersionArrayDeserializer(
  result: Array<PolicyDefinitionVersion>,
): any[] {
  return result.map((item) => {
    return policyDefinitionVersionDeserializer(item);
  });
}

/** The policy set definition. */
export interface PolicySetDefinition extends ProxyResource {
  /** The type of policy set definition. Possible values are NotSpecified, BuiltIn, Custom, and Static. */
  policyType?: PolicyType;
  /** The display name of the policy set definition. */
  displayName?: string;
  /** The policy set definition description. */
  description?: string;
  /** The policy set definition metadata.  Metadata is an open ended object and is typically a collection of key value pairs. */
  metadata?: any;
  /** The policy set definition parameters that can be used in policy definition references. */
  parameters?: Record<string, ParameterDefinitionsValue>;
  /** An array of policy definition references. */
  policyDefinitions?: PolicyDefinitionReference[];
  /** The metadata describing groups of policy definition references within the policy set definition. */
  policyDefinitionGroups?: PolicyDefinitionGroup[];
  /** The policy set definition version in #.#.# format. */
  version?: string;
  /** A list of available versions for this policy set definition. */
  versions?: string[];
}

export function policySetDefinitionSerializer(item: PolicySetDefinition): any {
  return {
    properties: areAllPropsUndefined(item, [
      "policyType",
      "displayName",
      "description",
      "metadata",
      "parameters",
      "policyDefinitions",
      "policyDefinitionGroups",
      "version",
      "versions",
    ])
      ? undefined
      : _policySetDefinitionPropertiesSerializer(item),
  };
}

export function policySetDefinitionDeserializer(item: any): PolicySetDefinition {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _policySetDefinitionPropertiesDeserializer(item["properties"])),
  };
}

/** The policy set definition properties. */
export interface PolicySetDefinitionProperties {
  /** The type of policy set definition. Possible values are NotSpecified, BuiltIn, Custom, and Static. */
  policyType?: PolicyType;
  /** The display name of the policy set definition. */
  displayName?: string;
  /** The policy set definition description. */
  description?: string;
  /** The policy set definition metadata.  Metadata is an open ended object and is typically a collection of key value pairs. */
  metadata?: any;
  /** The policy set definition parameters that can be used in policy definition references. */
  parameters?: Record<string, ParameterDefinitionsValue>;
  /** An array of policy definition references. */
  policyDefinitions: PolicyDefinitionReference[];
  /** The metadata describing groups of policy definition references within the policy set definition. */
  policyDefinitionGroups?: PolicyDefinitionGroup[];
  /** The policy set definition version in #.#.# format. */
  version?: string;
  /** A list of available versions for this policy set definition. */
  versions?: string[];
}

export function policySetDefinitionPropertiesSerializer(item: PolicySetDefinitionProperties): any {
  return {
    policyType: item["policyType"],
    displayName: item["displayName"],
    description: item["description"],
    metadata: item["metadata"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterDefinitionsValueRecordSerializer(item["parameters"]),
    policyDefinitions: policyDefinitionReferenceArraySerializer(item["policyDefinitions"]),
    policyDefinitionGroups: !item["policyDefinitionGroups"]
      ? item["policyDefinitionGroups"]
      : policyDefinitionGroupArraySerializer(item["policyDefinitionGroups"]),
    version: item["version"],
    versions: !item["versions"]
      ? item["versions"]
      : item["versions"].map((p: any) => {
          return p;
        }),
  };
}

export function policySetDefinitionPropertiesDeserializer(
  item: any,
): PolicySetDefinitionProperties {
  return {
    policyType: item["policyType"],
    displayName: item["displayName"],
    description: item["description"],
    metadata: item["metadata"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterDefinitionsValueRecordDeserializer(item["parameters"]),
    policyDefinitions: policyDefinitionReferenceArrayDeserializer(item["policyDefinitions"]),
    policyDefinitionGroups: !item["policyDefinitionGroups"]
      ? item["policyDefinitionGroups"]
      : policyDefinitionGroupArrayDeserializer(item["policyDefinitionGroups"]),
    version: item["version"],
    versions: !item["versions"]
      ? item["versions"]
      : item["versions"].map((p: any) => {
          return p;
        }),
  };
}

export function policyDefinitionReferenceArraySerializer(
  result: Array<PolicyDefinitionReference>,
): any[] {
  return result.map((item) => {
    return policyDefinitionReferenceSerializer(item);
  });
}

export function policyDefinitionReferenceArrayDeserializer(
  result: Array<PolicyDefinitionReference>,
): any[] {
  return result.map((item) => {
    return policyDefinitionReferenceDeserializer(item);
  });
}

/** The policy definition reference. */
export interface PolicyDefinitionReference {
  /** The ID of the policy definition or policy set definition. */
  policyDefinitionId: string;
  /** The version of the policy definition to use. */
  definitionVersion?: string;
  /** The latest version of the policy definition available. This is only present if requested via the $expand query parameter. */
  readonly latestDefinitionVersion?: string;
  /** The effective version of the policy definition in use. This is only present if requested via the $expand query parameter. */
  readonly effectiveDefinitionVersion?: string;
  /** The parameter values for the referenced policy rule. The keys are the parameter names. */
  parameters?: Record<string, ParameterValuesValue>;
  /** A unique id (within the policy set definition) for this policy definition reference. */
  policyDefinitionReferenceId?: string;
  /** The name of the groups that this policy definition reference belongs to. */
  groupNames?: string[];
}

export function policyDefinitionReferenceSerializer(item: PolicyDefinitionReference): any {
  return {
    policyDefinitionId: item["policyDefinitionId"],
    definitionVersion: item["definitionVersion"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterValuesValueRecordSerializer(item["parameters"]),
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    groupNames: !item["groupNames"]
      ? item["groupNames"]
      : item["groupNames"].map((p: any) => {
          return p;
        }),
  };
}

export function policyDefinitionReferenceDeserializer(item: any): PolicyDefinitionReference {
  return {
    policyDefinitionId: item["policyDefinitionId"],
    definitionVersion: item["definitionVersion"],
    latestDefinitionVersion: item["latestDefinitionVersion"],
    effectiveDefinitionVersion: item["effectiveDefinitionVersion"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterValuesValueRecordDeserializer(item["parameters"]),
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    groupNames: !item["groupNames"]
      ? item["groupNames"]
      : item["groupNames"].map((p: any) => {
          return p;
        }),
  };
}

export function policyDefinitionGroupArraySerializer(result: Array<PolicyDefinitionGroup>): any[] {
  return result.map((item) => {
    return policyDefinitionGroupSerializer(item);
  });
}

export function policyDefinitionGroupArrayDeserializer(
  result: Array<PolicyDefinitionGroup>,
): any[] {
  return result.map((item) => {
    return policyDefinitionGroupDeserializer(item);
  });
}

/** The policy definition group. */
export interface PolicyDefinitionGroup {
  /** The name of the group. */
  name: string;
  /** The group's display name. */
  displayName?: string;
  /** The group's category. */
  category?: string;
  /** The group's description. */
  description?: string;
  /** A resource ID of a resource that contains additional metadata about the group. */
  additionalMetadataId?: string;
}

export function policyDefinitionGroupSerializer(item: PolicyDefinitionGroup): any {
  return {
    name: item["name"],
    displayName: item["displayName"],
    category: item["category"],
    description: item["description"],
    additionalMetadataId: item["additionalMetadataId"],
  };
}

export function policyDefinitionGroupDeserializer(item: any): PolicyDefinitionGroup {
  return {
    name: item["name"],
    displayName: item["displayName"],
    category: item["category"],
    description: item["description"],
    additionalMetadataId: item["additionalMetadataId"],
  };
}

/** The response of a PolicySetDefinition list operation. */
export interface _PolicySetDefinitionListResult {
  /** The PolicySetDefinition items on this page */
  value: PolicySetDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _policySetDefinitionListResultDeserializer(
  item: any,
): _PolicySetDefinitionListResult {
  return {
    value: policySetDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function policySetDefinitionArraySerializer(result: Array<PolicySetDefinition>): any[] {
  return result.map((item) => {
    return policySetDefinitionSerializer(item);
  });
}

export function policySetDefinitionArrayDeserializer(result: Array<PolicySetDefinition>): any[] {
  return result.map((item) => {
    return policySetDefinitionDeserializer(item);
  });
}

/** The policy set definition version. */
export interface PolicySetDefinitionVersion extends ProxyResource {
  /** The type of policy definition. Possible values are NotSpecified, BuiltIn, Custom, and Static. */
  policyType?: PolicyType;
  /** The display name of the policy set definition. */
  displayName?: string;
  /** The policy set definition description. */
  description?: string;
  /** The policy set definition metadata.  Metadata is an open ended object and is typically a collection of key value pairs. */
  metadata?: any;
  /** The policy set definition parameters that can be used in policy definition references. */
  parameters?: Record<string, ParameterDefinitionsValue>;
  /** An array of policy definition references. */
  policyDefinitions?: PolicyDefinitionReference[];
  /** The metadata describing groups of policy definition references within the policy set definition. */
  policyDefinitionGroups?: PolicyDefinitionGroup[];
  /** The policy set definition version in #.#.# format. */
  version?: string;
}

export function policySetDefinitionVersionSerializer(item: PolicySetDefinitionVersion): any {
  return {
    properties: areAllPropsUndefined(item, [
      "policyType",
      "displayName",
      "description",
      "metadata",
      "parameters",
      "policyDefinitions",
      "policyDefinitionGroups",
      "version",
    ])
      ? undefined
      : _policySetDefinitionVersionPropertiesSerializer(item),
  };
}

export function policySetDefinitionVersionDeserializer(item: any): PolicySetDefinitionVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _policySetDefinitionVersionPropertiesDeserializer(item["properties"])),
  };
}

/** The policy set definition properties. */
export interface PolicySetDefinitionVersionProperties {
  /** The type of policy definition. Possible values are NotSpecified, BuiltIn, Custom, and Static. */
  policyType?: PolicyType;
  /** The display name of the policy set definition. */
  displayName?: string;
  /** The policy set definition description. */
  description?: string;
  /** The policy set definition metadata.  Metadata is an open ended object and is typically a collection of key value pairs. */
  metadata?: any;
  /** The policy set definition parameters that can be used in policy definition references. */
  parameters?: Record<string, ParameterDefinitionsValue>;
  /** An array of policy definition references. */
  policyDefinitions: PolicyDefinitionReference[];
  /** The metadata describing groups of policy definition references within the policy set definition. */
  policyDefinitionGroups?: PolicyDefinitionGroup[];
  /** The policy set definition version in #.#.# format. */
  version?: string;
}

export function policySetDefinitionVersionPropertiesSerializer(
  item: PolicySetDefinitionVersionProperties,
): any {
  return {
    policyType: item["policyType"],
    displayName: item["displayName"],
    description: item["description"],
    metadata: item["metadata"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterDefinitionsValueRecordSerializer(item["parameters"]),
    policyDefinitions: policyDefinitionReferenceArraySerializer(item["policyDefinitions"]),
    policyDefinitionGroups: !item["policyDefinitionGroups"]
      ? item["policyDefinitionGroups"]
      : policyDefinitionGroupArraySerializer(item["policyDefinitionGroups"]),
    version: item["version"],
  };
}

export function policySetDefinitionVersionPropertiesDeserializer(
  item: any,
): PolicySetDefinitionVersionProperties {
  return {
    policyType: item["policyType"],
    displayName: item["displayName"],
    description: item["description"],
    metadata: item["metadata"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterDefinitionsValueRecordDeserializer(item["parameters"]),
    policyDefinitions: policyDefinitionReferenceArrayDeserializer(item["policyDefinitions"]),
    policyDefinitionGroups: !item["policyDefinitionGroups"]
      ? item["policyDefinitionGroups"]
      : policyDefinitionGroupArrayDeserializer(item["policyDefinitionGroups"]),
    version: item["version"],
  };
}

/** The response of a PolicySetDefinitionVersion list operation. */
export interface _PolicySetDefinitionVersionListResult {
  /** The PolicySetDefinitionVersion items on this page */
  value: PolicySetDefinitionVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _policySetDefinitionVersionListResultDeserializer(
  item: any,
): _PolicySetDefinitionVersionListResult {
  return {
    value: policySetDefinitionVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function policySetDefinitionVersionArraySerializer(
  result: Array<PolicySetDefinitionVersion>,
): any[] {
  return result.map((item) => {
    return policySetDefinitionVersionSerializer(item);
  });
}

export function policySetDefinitionVersionArrayDeserializer(
  result: Array<PolicySetDefinitionVersion>,
): any[] {
  return result.map((item) => {
    return policySetDefinitionVersionDeserializer(item);
  });
}

/** The policy token request properties. */
export interface PolicyTokenRequest {
  /** The resource operation to acquire a token for. */
  operation: PolicyTokenOperation;
  /** The change reference. */
  changeReference?: string;
}

export function policyTokenRequestSerializer(item: PolicyTokenRequest): any {
  return {
    operation: policyTokenOperationSerializer(item["operation"]),
    changeReference: item["changeReference"],
  };
}

/** The resource operation to acquire a token for. */
export interface PolicyTokenOperation {
  /** The request URI of the resource operation. */
  uri: string;
  /** The http method of the resource operation. */
  httpMethod: string;
  /** The payload of the resource operation. */
  content?: any;
}

export function policyTokenOperationSerializer(item: PolicyTokenOperation): any {
  return { uri: item["uri"], httpMethod: item["httpMethod"], content: item["content"] };
}

/** The policy token response properties. */
export interface PolicyTokenResponse {
  /** The result of the completed token acquisition operation. Possible values are Succeeded and Failed. */
  result?: PolicyTokenResult;
  /** Status message with additional details about the token acquisition operation result. */
  message?: string;
  /** The date and time after which the client can try to acquire a token again in the case of retry-able failures. */
  retryAfter?: Date;
  /** An array of external evaluation endpoint invocation results. */
  results?: ExternalEvaluationEndpointInvocationResult[];
  /** The change reference associated with the operation for which the token is acquired. */
  changeReference?: string;
  /** The issued policy token. */
  token?: string;
  /** The unique Id assigned to the policy token. */
  tokenId?: string;
  /** The expiration of the policy token. */
  expiration?: Date;
}

export function policyTokenResponseDeserializer(item: any): PolicyTokenResponse {
  return {
    result: item["result"],
    message: item["message"],
    retryAfter: !item["retryAfter"] ? item["retryAfter"] : new Date(item["retryAfter"]),
    results: !item["results"]
      ? item["results"]
      : externalEvaluationEndpointInvocationResultArrayDeserializer(item["results"]),
    changeReference: item["changeReference"],
    token: item["token"],
    tokenId: item["tokenId"],
    expiration: !item["expiration"] ? item["expiration"] : new Date(item["expiration"]),
  };
}

/** The result of the completed token acquisition operation. Possible values are Succeeded and Failed. */
export enum KnownPolicyTokenResult {
  /** The token acquisition succeeded. */
  Succeeded = "Succeeded",
  /** The token acquisition failed. */
  Failed = "Failed",
}

/**
 * The result of the completed token acquisition operation. Possible values are Succeeded and Failed. \
 * {@link KnownPolicyTokenResult} can be used interchangeably with PolicyTokenResult,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The token acquisition succeeded. \
 * **Failed**: The token acquisition failed.
 */
export type PolicyTokenResult = string;

export function externalEvaluationEndpointInvocationResultArrayDeserializer(
  result: Array<ExternalEvaluationEndpointInvocationResult>,
): any[] {
  return result.map((item) => {
    return externalEvaluationEndpointInvocationResultDeserializer(item);
  });
}

/** The external evaluation endpoint invocation results. */
export interface ExternalEvaluationEndpointInvocationResult {
  /** The details of the policy requiring the external endpoint invocation. */
  policyInfo?: PolicyLogInfo;
  /** The result of the external endpoint. Possible values are Succeeded and Failed. */
  result?: ExternalEndpointResult;
  /** The status message with additional details about the invocation result. */
  message?: string;
  /** The date and time after which a failed endpoint invocation can be retried. */
  retryAfter?: Date;
  /** The set of claims that will be attached to the policy token as an attestation for the result of the endpoint invocation. */
  claims?: any;
  /** The expiration of the results. */
  expiration?: Date;
}

export function externalEvaluationEndpointInvocationResultDeserializer(
  item: any,
): ExternalEvaluationEndpointInvocationResult {
  return {
    policyInfo: !item["policyInfo"]
      ? item["policyInfo"]
      : policyLogInfoDeserializer(item["policyInfo"]),
    result: item["result"],
    message: item["message"],
    retryAfter: !item["retryAfter"] ? item["retryAfter"] : new Date(item["retryAfter"]),
    claims: item["claims"],
    expiration: !item["expiration"] ? item["expiration"] : new Date(item["expiration"]),
  };
}

/** The policy log info. */
export interface PolicyLogInfo {
  /** The policy definition Id. */
  policyDefinitionId?: string;
  /** The policy set definition Id. */
  policySetDefinitionId?: string;
  /** The policy definition instance Id inside a policy set. */
  policyDefinitionReferenceId?: string;
  /** The policy set definition name. */
  policySetDefinitionName?: string;
  /** The policy set definition display name. */
  policySetDefinitionDisplayName?: string;
  /** The policy set definition version. */
  policySetDefinitionVersion?: string;
  /** The policy set definition category. */
  policySetDefinitionCategory?: string;
  /** The policy definition name. */
  policyDefinitionName?: string;
  /** The policy definition display name. */
  policyDefinitionDisplayName?: string;
  /** The policy definition version. */
  policyDefinitionVersion?: string;
  /** The policy definition action. */
  policyDefinitionEffect?: string;
  /** An array of policy definition group names. */
  policyDefinitionGroupNames?: string[];
  /** The policy assignment Id. */
  policyAssignmentId?: string;
  /** The policy assignment name. */
  policyAssignmentName?: string;
  /** The policy assignment display name. */
  policyAssignmentDisplayName?: string;
  /** The policy assignment version. */
  policyAssignmentVersion?: string;
  /** The policy assignment scope. */
  policyAssignmentScope?: string;
  /** The resource location. */
  resourceLocation?: string;
  /** The management group ancestors. */
  ancestors?: string;
  /** The policy compliance reason code. */
  complianceReasonCode?: string;
  /** An array of policy exemption Ids. */
  policyExemptionIds?: string[];
}

export function policyLogInfoDeserializer(item: any): PolicyLogInfo {
  return {
    policyDefinitionId: item["policyDefinitionId"],
    policySetDefinitionId: item["policySetDefinitionId"],
    policyDefinitionReferenceId: item["policyDefinitionReferenceId"],
    policySetDefinitionName: item["policySetDefinitionName"],
    policySetDefinitionDisplayName: item["policySetDefinitionDisplayName"],
    policySetDefinitionVersion: item["policySetDefinitionVersion"],
    policySetDefinitionCategory: item["policySetDefinitionCategory"],
    policyDefinitionName: item["policyDefinitionName"],
    policyDefinitionDisplayName: item["policyDefinitionDisplayName"],
    policyDefinitionVersion: item["policyDefinitionVersion"],
    policyDefinitionEffect: item["policyDefinitionEffect"],
    policyDefinitionGroupNames: !item["policyDefinitionGroupNames"]
      ? item["policyDefinitionGroupNames"]
      : item["policyDefinitionGroupNames"].map((p: any) => {
          return p;
        }),
    policyAssignmentId: item["policyAssignmentId"],
    policyAssignmentName: item["policyAssignmentName"],
    policyAssignmentDisplayName: item["policyAssignmentDisplayName"],
    policyAssignmentVersion: item["policyAssignmentVersion"],
    policyAssignmentScope: item["policyAssignmentScope"],
    resourceLocation: item["resourceLocation"],
    ancestors: item["ancestors"],
    complianceReasonCode: item["complianceReasonCode"],
    policyExemptionIds: !item["policyExemptionIds"]
      ? item["policyExemptionIds"]
      : item["policyExemptionIds"].map((p: any) => {
          return p;
        }),
  };
}

/** The result of the external endpoint. Possible values are Succeeded and Failed. */
export enum KnownExternalEndpointResult {
  /** The external endpoint succeeded. */
  Succeeded = "Succeeded",
  /** The external endpoint failed. */
  Failed = "Failed",
}

/**
 * The result of the external endpoint. Possible values are Succeeded and Failed. \
 * {@link KnownExternalEndpointResult} can be used interchangeably with ExternalEndpointResult,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The external endpoint succeeded. \
 * **Failed**: The external endpoint failed.
 */
export type ExternalEndpointResult = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-03-01 API version. */
  V20250301 = "2025-03-01",
}

export function _policyAssignmentPropertiesSerializer(item: PolicyAssignment): any {
  return {
    displayName: item["displayName"],
    policyDefinitionId: item["policyDefinitionId"],
    definitionVersion: item["definitionVersion"],
    notScopes: !item["notScopes"]
      ? item["notScopes"]
      : item["notScopes"].map((p: any) => {
          return p;
        }),
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterValuesValueRecordSerializer(item["parameters"]),
    description: item["description"],
    metadata: item["metadata"],
    enforcementMode: item["enforcementMode"],
    nonComplianceMessages: !item["nonComplianceMessages"]
      ? item["nonComplianceMessages"]
      : nonComplianceMessageArraySerializer(item["nonComplianceMessages"]),
    resourceSelectors: !item["resourceSelectors"]
      ? item["resourceSelectors"]
      : resourceSelectorArraySerializer(item["resourceSelectors"]),
    overrides: !item["overrides"] ? item["overrides"] : overrideArraySerializer(item["overrides"]),
    assignmentType: item["assignmentType"],
  };
}

export function _policyAssignmentPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    policyDefinitionId: item["policyDefinitionId"],
    definitionVersion: item["definitionVersion"],
    latestDefinitionVersion: item["latestDefinitionVersion"],
    effectiveDefinitionVersion: item["effectiveDefinitionVersion"],
    scope: item["scope"],
    notScopes: !item["notScopes"]
      ? item["notScopes"]
      : item["notScopes"].map((p: any) => {
          return p;
        }),
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterValuesValueRecordDeserializer(item["parameters"]),
    description: item["description"],
    metadata: item["metadata"],
    enforcementMode: item["enforcementMode"],
    nonComplianceMessages: !item["nonComplianceMessages"]
      ? item["nonComplianceMessages"]
      : nonComplianceMessageArrayDeserializer(item["nonComplianceMessages"]),
    resourceSelectors: !item["resourceSelectors"]
      ? item["resourceSelectors"]
      : resourceSelectorArrayDeserializer(item["resourceSelectors"]),
    overrides: !item["overrides"]
      ? item["overrides"]
      : overrideArrayDeserializer(item["overrides"]),
    assignmentType: item["assignmentType"],
    instanceId: item["instanceId"],
  };
}

export function _policyAssignmentUpdatePropertiesSerializer(item: PolicyAssignmentUpdate): any {
  return {
    resourceSelectors: !item["resourceSelectors"]
      ? item["resourceSelectors"]
      : resourceSelectorArraySerializer(item["resourceSelectors"]),
    overrides: !item["overrides"] ? item["overrides"] : overrideArraySerializer(item["overrides"]),
  };
}

export function _policyDefinitionPropertiesSerializer(item: PolicyDefinition): any {
  return {
    policyType: item["policyType"],
    mode: item["mode"],
    displayName: item["displayName"],
    description: item["description"],
    policyRule: item["policyRule"],
    metadata: item["metadata"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterDefinitionsValueRecordSerializer(item["parameters"]),
    version: item["version"],
    versions: !item["versions"]
      ? item["versions"]
      : item["versions"].map((p: any) => {
          return p;
        }),
    externalEvaluationEnforcementSettings: !item["externalEvaluationEnforcementSettings"]
      ? item["externalEvaluationEnforcementSettings"]
      : externalEvaluationEnforcementSettingsSerializer(
          item["externalEvaluationEnforcementSettings"],
        ),
  };
}

export function _policyDefinitionPropertiesDeserializer(item: any) {
  return {
    policyType: item["policyType"],
    mode: item["mode"],
    displayName: item["displayName"],
    description: item["description"],
    policyRule: item["policyRule"],
    metadata: item["metadata"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterDefinitionsValueRecordDeserializer(item["parameters"]),
    version: item["version"],
    versions: !item["versions"]
      ? item["versions"]
      : item["versions"].map((p: any) => {
          return p;
        }),
    externalEvaluationEnforcementSettings: !item["externalEvaluationEnforcementSettings"]
      ? item["externalEvaluationEnforcementSettings"]
      : externalEvaluationEnforcementSettingsDeserializer(
          item["externalEvaluationEnforcementSettings"],
        ),
  };
}

export function _policyDefinitionVersionPropertiesSerializer(item: PolicyDefinitionVersion): any {
  return {
    policyType: item["policyType"],
    mode: item["mode"],
    displayName: item["displayName"],
    description: item["description"],
    policyRule: item["policyRule"],
    metadata: item["metadata"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterDefinitionsValueRecordSerializer(item["parameters"]),
    version: item["version"],
    externalEvaluationEnforcementSettings: !item["externalEvaluationEnforcementSettings"]
      ? item["externalEvaluationEnforcementSettings"]
      : externalEvaluationEnforcementSettingsSerializer(
          item["externalEvaluationEnforcementSettings"],
        ),
  };
}

export function _policyDefinitionVersionPropertiesDeserializer(item: any) {
  return {
    policyType: item["policyType"],
    mode: item["mode"],
    displayName: item["displayName"],
    description: item["description"],
    policyRule: item["policyRule"],
    metadata: item["metadata"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterDefinitionsValueRecordDeserializer(item["parameters"]),
    version: item["version"],
    externalEvaluationEnforcementSettings: !item["externalEvaluationEnforcementSettings"]
      ? item["externalEvaluationEnforcementSettings"]
      : externalEvaluationEnforcementSettingsDeserializer(
          item["externalEvaluationEnforcementSettings"],
        ),
  };
}

export function _policySetDefinitionPropertiesSerializer(item: PolicySetDefinition): any {
  return {
    policyType: item["policyType"],
    displayName: item["displayName"],
    description: item["description"],
    metadata: item["metadata"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterDefinitionsValueRecordSerializer(item["parameters"]),
    policyDefinitions: !item["policyDefinitions"]
      ? item["policyDefinitions"]
      : policyDefinitionReferenceArraySerializer(item["policyDefinitions"]),
    policyDefinitionGroups: !item["policyDefinitionGroups"]
      ? item["policyDefinitionGroups"]
      : policyDefinitionGroupArraySerializer(item["policyDefinitionGroups"]),
    version: item["version"],
    versions: !item["versions"]
      ? item["versions"]
      : item["versions"].map((p: any) => {
          return p;
        }),
  };
}

export function _policySetDefinitionPropertiesDeserializer(item: any) {
  return {
    policyType: item["policyType"],
    displayName: item["displayName"],
    description: item["description"],
    metadata: item["metadata"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterDefinitionsValueRecordDeserializer(item["parameters"]),
    policyDefinitions: !item["policyDefinitions"]
      ? item["policyDefinitions"]
      : policyDefinitionReferenceArrayDeserializer(item["policyDefinitions"]),
    policyDefinitionGroups: !item["policyDefinitionGroups"]
      ? item["policyDefinitionGroups"]
      : policyDefinitionGroupArrayDeserializer(item["policyDefinitionGroups"]),
    version: item["version"],
    versions: !item["versions"]
      ? item["versions"]
      : item["versions"].map((p: any) => {
          return p;
        }),
  };
}

export function _policySetDefinitionVersionPropertiesSerializer(
  item: PolicySetDefinitionVersion,
): any {
  return {
    policyType: item["policyType"],
    displayName: item["displayName"],
    description: item["description"],
    metadata: item["metadata"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterDefinitionsValueRecordSerializer(item["parameters"]),
    policyDefinitions: !item["policyDefinitions"]
      ? item["policyDefinitions"]
      : policyDefinitionReferenceArraySerializer(item["policyDefinitions"]),
    policyDefinitionGroups: !item["policyDefinitionGroups"]
      ? item["policyDefinitionGroups"]
      : policyDefinitionGroupArraySerializer(item["policyDefinitionGroups"]),
    version: item["version"],
  };
}

export function _policySetDefinitionVersionPropertiesDeserializer(item: any) {
  return {
    policyType: item["policyType"],
    displayName: item["displayName"],
    description: item["description"],
    metadata: item["metadata"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterDefinitionsValueRecordDeserializer(item["parameters"]),
    policyDefinitions: !item["policyDefinitions"]
      ? item["policyDefinitions"]
      : policyDefinitionReferenceArrayDeserializer(item["policyDefinitions"]),
    policyDefinitionGroups: !item["policyDefinitionGroups"]
      ? item["policyDefinitionGroups"]
      : policyDefinitionGroupArrayDeserializer(item["policyDefinitionGroups"]),
    version: item["version"],
  };
}
