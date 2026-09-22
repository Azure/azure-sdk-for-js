// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Deployment stack object. */
export interface DeploymentStacksWhatIfResult extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DeploymentStacksWhatIfResultProperties;
  /** The geo-location where the resource lives. Required for subscription and management group scoped stacks. The location is inherited from the resource group for resource group scoped stacks. */
  location?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function deploymentStacksWhatIfResultSerializer(item: DeploymentStacksWhatIfResult): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : deploymentStacksWhatIfResultPropertiesSerializer(item["properties"]),
    location: item["location"],
    tags: item["tags"],
  };
}

export function deploymentStacksWhatIfResultDeserializer(item: any): DeploymentStacksWhatIfResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : deploymentStacksWhatIfResultPropertiesDeserializer(item["properties"]),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** DeploymentStack WhatIfResult Properties */
export interface DeploymentStacksWhatIfResultProperties {
  /** The error detail. */
  readonly error?: ErrorDetail;
  /** The template content. You use this element when you want to pass the template syntax directly in the request rather than link to an existing template. It can be a JObject or well-formed JSON string. Use either the templateLink property or the template property, but not both. */
  template?: Record<string, any>;
  /** The URI of the template. Use either the templateLink property or the template property, but not both. */
  templateLink?: DeploymentStacksTemplateLink;
  /** Name and value pairs that define the deployment parameters for the template. Use this element when providing the parameter values directly in the request, rather than linking to an existing parameter file. Use either the parametersLink property or the parameters property, but not both. */
  parameters?: Record<string, DeploymentParameter>;
  /** The URI of parameters file. Use this element to link to an existing parameters file. Use either the parametersLink property or the parameters property, but not both. */
  parametersLink?: DeploymentStacksParametersLink;
  /** The deployment extension configs. Keys of this object are extension aliases as defined in the deployment template. */
  extensionConfigs?: Record<string, DeploymentExtensionConfig>;
  /** External input values, used by external tooling for parameter evaluation. */
  externalInputs?: Record<string, DeploymentExternalInput>;
  /** External input definitions, used by external tooling to define expected external input values. */
  externalInputDefinitions?: Record<string, DeploymentExternalInputDefinition>;
  /** Defines the behavior of resources that are no longer managed after the Deployment stack is updated or deleted. */
  actionOnUnmanage: ActionOnUnmanage;
  /** The debug setting of the deployment. */
  debugSetting?: DeploymentStacksDebugSetting;
  /** The scope at which the initial deployment should be created. If a scope is not specified, it will default to the scope of the deployment stack. Valid scopes are: management group (format: '/providers/Microsoft.Management/managementGroups/{managementGroupId}'), subscription (format: '/subscriptions/{subscriptionId}'), resource group (format: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}'). */
  deploymentScope?: string;
  /** Deployment stack description. Max length of 4096 characters. */
  description?: string;
  /** Defines how resources deployed by the stack are locked. */
  denySettings: DenySettings;
  /** State of the deployment stack. */
  readonly provisioningState?: DeploymentStackProvisioningState;
  /** The correlation id of the last Deployment stack upsert or delete operation. It is in GUID format and is used for tracing. */
  readonly correlationId?: string;
  /** The validation level of the deployment stack */
  validationLevel?: ValidationLevel;
  /** The deployment stack id to use as the basis for comparison. */
  deploymentStackResourceId: string;
  /** The timestamp for when the deployment stack was last modified. This can be used to determine if the what-if data is still current. */
  readonly deploymentStackLastModified?: Date;
  /** The interval to persist the deployment stack what-if result in ISO 8601 format. */
  retentionInterval: string;
  /** All of the changes predicted by the deployment stack what-if operation. */
  readonly changes?: DeploymentStacksWhatIfChange;
  /** List of resource diagnostics detected by What-If operation. */
  readonly diagnostics?: DeploymentStacksDiagnostic[];
}

export function deploymentStacksWhatIfResultPropertiesSerializer(
  item: DeploymentStacksWhatIfResultProperties,
): any {
  return {
    template: item["template"],
    templateLink: !item["templateLink"]
      ? item["templateLink"]
      : deploymentStacksTemplateLinkSerializer(item["templateLink"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : deploymentParameterRecordSerializer(item["parameters"]),
    parametersLink: !item["parametersLink"]
      ? item["parametersLink"]
      : deploymentStacksParametersLinkSerializer(item["parametersLink"]),
    extensionConfigs: !item["extensionConfigs"]
      ? item["extensionConfigs"]
      : deploymentExtensionConfigRecordSerializer(item["extensionConfigs"]),
    externalInputs: !item["externalInputs"]
      ? item["externalInputs"]
      : deploymentExternalInputRecordSerializer(item["externalInputs"]),
    externalInputDefinitions: !item["externalInputDefinitions"]
      ? item["externalInputDefinitions"]
      : deploymentExternalInputDefinitionRecordSerializer(item["externalInputDefinitions"]),
    actionOnUnmanage: actionOnUnmanageSerializer(item["actionOnUnmanage"]),
    debugSetting: !item["debugSetting"]
      ? item["debugSetting"]
      : deploymentStacksDebugSettingSerializer(item["debugSetting"]),
    deploymentScope: item["deploymentScope"],
    description: item["description"],
    denySettings: denySettingsSerializer(item["denySettings"]),
    validationLevel: item["validationLevel"],
    deploymentStackResourceId: item["deploymentStackResourceId"],
    retentionInterval: item["retentionInterval"],
  };
}

export function deploymentStacksWhatIfResultPropertiesDeserializer(
  item: any,
): DeploymentStacksWhatIfResultProperties {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    template: !item["template"]
      ? item["template"]
      : Object.fromEntries(Object.entries(item["template"]).map(([k, p]: [string, any]) => [k, p])),
    templateLink: !item["templateLink"]
      ? item["templateLink"]
      : deploymentStacksTemplateLinkDeserializer(item["templateLink"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : deploymentParameterRecordDeserializer(item["parameters"]),
    parametersLink: !item["parametersLink"]
      ? item["parametersLink"]
      : deploymentStacksParametersLinkDeserializer(item["parametersLink"]),
    extensionConfigs: !item["extensionConfigs"]
      ? item["extensionConfigs"]
      : deploymentExtensionConfigRecordDeserializer(item["extensionConfigs"]),
    externalInputs: !item["externalInputs"]
      ? item["externalInputs"]
      : deploymentExternalInputRecordDeserializer(item["externalInputs"]),
    externalInputDefinitions: !item["externalInputDefinitions"]
      ? item["externalInputDefinitions"]
      : deploymentExternalInputDefinitionRecordDeserializer(item["externalInputDefinitions"]),
    actionOnUnmanage: actionOnUnmanageDeserializer(item["actionOnUnmanage"]),
    debugSetting: !item["debugSetting"]
      ? item["debugSetting"]
      : deploymentStacksDebugSettingDeserializer(item["debugSetting"]),
    deploymentScope: item["deploymentScope"],
    description: item["description"],
    denySettings: denySettingsDeserializer(item["denySettings"]),
    provisioningState: item["provisioningState"],
    correlationId: item["correlationId"],
    validationLevel: item["validationLevel"],
    deploymentStackResourceId: item["deploymentStackResourceId"],
    deploymentStackLastModified: !item["deploymentStackLastModified"]
      ? item["deploymentStackLastModified"]
      : new Date(item["deploymentStackLastModified"]),
    retentionInterval: item["retentionInterval"],
    changes: !item["changes"]
      ? item["changes"]
      : deploymentStacksWhatIfChangeDeserializer(item["changes"]),
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : deploymentStacksDiagnosticArrayDeserializer(item["diagnostics"]),
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

/** Entity representing the reference to the template. */
export interface DeploymentStacksTemplateLink {
  /** The URI of the template to deploy. Use either the uri or id property, but not both. */
  uri?: string;
  /** The resourceId of a Template Spec. Use either the id or uri property, but not both. */
  id?: string;
  /** The relativePath property can be used to deploy a linked template at a location relative to the parent. If the parent template was linked with a TemplateSpec, this will reference an artifact in the TemplateSpec.  If the parent was linked with a URI, the child deployment will be a combination of the parent and relativePath URIs. */
  relativePath?: string;
  /** The query string (for example, a SAS token) to be used with the templateLink URI. */
  queryString?: string;
  /** If included, must match the ContentVersion in the template. */
  contentVersion?: string;
}

export function deploymentStacksTemplateLinkSerializer(item: DeploymentStacksTemplateLink): any {
  return {
    uri: item["uri"],
    id: item["id"],
    relativePath: item["relativePath"],
    queryString: item["queryString"],
    contentVersion: item["contentVersion"],
  };
}

export function deploymentStacksTemplateLinkDeserializer(item: any): DeploymentStacksTemplateLink {
  return {
    uri: item["uri"],
    id: item["id"],
    relativePath: item["relativePath"],
    queryString: item["queryString"],
    contentVersion: item["contentVersion"],
  };
}

export function deploymentParameterRecordSerializer(
  item: Record<string, DeploymentParameter>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : deploymentParameterSerializer(item[key]);
  });
  return result;
}

export function deploymentParameterRecordDeserializer(
  item: Record<string, any>,
): Record<string, DeploymentParameter> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : deploymentParameterDeserializer(item[key]);
  });
  return result;
}

/** Deployment parameter for the template. */
export interface DeploymentParameter {
  /** Input value to the parameter. */
  value?: any;
  /** Type of the value. */
  type?: string;
  /** Azure Key Vault parameter reference. */
  reference?: KeyVaultParameterReference;
  /** Input expression to the parameter. */
  expression?: string;
}

export function deploymentParameterSerializer(item: DeploymentParameter): any {
  return {
    value: item["value"],
    type: item["type"],
    reference: !item["reference"]
      ? item["reference"]
      : keyVaultParameterReferenceSerializer(item["reference"]),
    expression: item["expression"],
  };
}

export function deploymentParameterDeserializer(item: any): DeploymentParameter {
  return {
    value: item["value"],
    type: item["type"],
    reference: !item["reference"]
      ? item["reference"]
      : keyVaultParameterReferenceDeserializer(item["reference"]),
    expression: item["expression"],
  };
}

/** Azure Key Vault parameter reference. */
export interface KeyVaultParameterReference {
  /** Azure Key Vault reference. */
  keyVault: KeyVaultReference;
  /** Azure Key Vault secret name. */
  secretName: string;
  /** Azure Key Vault secret version. */
  secretVersion?: string;
}

export function keyVaultParameterReferenceSerializer(item: KeyVaultParameterReference): any {
  return {
    keyVault: keyVaultReferenceSerializer(item["keyVault"]),
    secretName: item["secretName"],
    secretVersion: item["secretVersion"],
  };
}

export function keyVaultParameterReferenceDeserializer(item: any): KeyVaultParameterReference {
  return {
    keyVault: keyVaultReferenceDeserializer(item["keyVault"]),
    secretName: item["secretName"],
    secretVersion: item["secretVersion"],
  };
}

/** Azure Key Vault reference. */
export interface KeyVaultReference {
  /** Azure Key Vault resourceId. */
  id: string;
}

export function keyVaultReferenceSerializer(item: KeyVaultReference): any {
  return { id: item["id"] };
}

export function keyVaultReferenceDeserializer(item: any): KeyVaultReference {
  return {
    id: item["id"],
  };
}

/** Entity representing the reference to the deployment parameters. */
export interface DeploymentStacksParametersLink {
  /** The URI of the parameters file. */
  uri: string;
  /** If included, must match the ContentVersion in the template. */
  contentVersion?: string;
}

export function deploymentStacksParametersLinkSerializer(
  item: DeploymentStacksParametersLink,
): any {
  return { uri: item["uri"], contentVersion: item["contentVersion"] };
}

export function deploymentStacksParametersLinkDeserializer(
  item: any,
): DeploymentStacksParametersLink {
  return {
    uri: item["uri"],
    contentVersion: item["contentVersion"],
  };
}

export function deploymentExtensionConfigRecordSerializer(
  item: Record<string, DeploymentExtensionConfig>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : deploymentExtensionConfigSerializer(item[key]);
  });
  return result;
}

export function deploymentExtensionConfigRecordDeserializer(
  item: Record<string, any>,
): Record<string, DeploymentExtensionConfig> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : deploymentExtensionConfigDeserializer(item[key]);
  });
  return result;
}

/** The configuration of a deployment extension. The keys of this object should align with the extension config schema. */
export interface DeploymentExtensionConfig {
  /** Additional properties */
  additionalProperties?: Record<string, DeploymentExtensionConfigItem>;
}

export function deploymentExtensionConfigSerializer(item: DeploymentExtensionConfig): any {
  return {
    ...serializeRecord(
      item.additionalProperties ?? {},
      undefined,
      deploymentExtensionConfigItemSerializer,
    ),
  };
}

export function deploymentExtensionConfigDeserializer(item: any): DeploymentExtensionConfig {
  return {
    additionalProperties: serializeRecord(item, [], deploymentExtensionConfigItemDeserializer),
  };
}

/** The value or how to get a value for an extension config property. */
export interface DeploymentExtensionConfigItem {
  /** The type of the value. */
  readonly type?: string;
  /** The value of the config item. The type is determined by the extension config schema. */
  value?: any;
  /** The key vault reference of the config item. */
  keyVaultReference?: KeyVaultParameterReference;
}

export function deploymentExtensionConfigItemSerializer(item: DeploymentExtensionConfigItem): any {
  return {
    value: item["value"],
    keyVaultReference: !item["keyVaultReference"]
      ? item["keyVaultReference"]
      : keyVaultParameterReferenceSerializer(item["keyVaultReference"]),
  };
}

export function deploymentExtensionConfigItemDeserializer(
  item: any,
): DeploymentExtensionConfigItem {
  return {
    type: item["type"],
    value: item["value"],
    keyVaultReference: !item["keyVaultReference"]
      ? item["keyVaultReference"]
      : keyVaultParameterReferenceDeserializer(item["keyVaultReference"]),
  };
}

export function deploymentExternalInputRecordSerializer(
  item: Record<string, DeploymentExternalInput>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : deploymentExternalInputSerializer(item[key]);
  });
  return result;
}

export function deploymentExternalInputRecordDeserializer(
  item: Record<string, any>,
): Record<string, DeploymentExternalInput> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : deploymentExternalInputDeserializer(item[key]);
  });
  return result;
}

/** Deployment external input for parameterization. */
export interface DeploymentExternalInput {
  /** External input value. */
  value: any;
}

export function deploymentExternalInputSerializer(item: DeploymentExternalInput): any {
  return { value: item["value"] };
}

export function deploymentExternalInputDeserializer(item: any): DeploymentExternalInput {
  return {
    value: item["value"],
  };
}

export function deploymentExternalInputDefinitionRecordSerializer(
  item: Record<string, DeploymentExternalInputDefinition>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : deploymentExternalInputDefinitionSerializer(item[key]);
  });
  return result;
}

export function deploymentExternalInputDefinitionRecordDeserializer(
  item: Record<string, any>,
): Record<string, DeploymentExternalInputDefinition> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : deploymentExternalInputDefinitionDeserializer(item[key]);
  });
  return result;
}

/** Deployment external input definition for parameterization. */
export interface DeploymentExternalInputDefinition {
  /** The kind of external input. */
  kind: string;
  /** Configuration for the external input. */
  config?: any;
}

export function deploymentExternalInputDefinitionSerializer(
  item: DeploymentExternalInputDefinition,
): any {
  return { kind: item["kind"], config: item["config"] };
}

export function deploymentExternalInputDefinitionDeserializer(
  item: any,
): DeploymentExternalInputDefinition {
  return {
    kind: item["kind"],
    config: item["config"],
  };
}

/** Defines the behavior of resources that are no longer managed after the stack is updated or deleted. */
export interface ActionOnUnmanage {
  /** Specifies an action for a newly unmanaged resource. */
  resources: UnmanageActionResourceMode;
  /** Specifies an action for a newly unmanaged resource group. */
  resourceGroups?: UnmanageActionResourceGroupMode;
  /** Specifies an action for a newly unmanaged resource management group. */
  managementGroups?: UnmanageActionManagementGroupMode;
  /** Some resources do not support deletion.  This flag will denote how the stack should handle those resources. */
  resourcesWithoutDeleteSupport?: ResourcesWithoutDeleteSupportAction;
}

export function actionOnUnmanageSerializer(item: ActionOnUnmanage): any {
  return {
    resources: item["resources"],
    resourceGroups: item["resourceGroups"],
    managementGroups: item["managementGroups"],
    resourcesWithoutDeleteSupport: item["resourcesWithoutDeleteSupport"],
  };
}

export function actionOnUnmanageDeserializer(item: any): ActionOnUnmanage {
  return {
    resources: item["resources"],
    resourceGroups: item["resourceGroups"],
    managementGroups: item["managementGroups"],
    resourcesWithoutDeleteSupport: item["resourcesWithoutDeleteSupport"],
  };
}

/** Specifies an action for a newly unmanaged resource. */
export enum KnownUnmanageActionResourceMode {
  /** Delete the resources from Azure */
  Delete = "delete",
  /** Keep the resources in Azure */
  Detach = "detach",
}

/**
 * Specifies an action for a newly unmanaged resource. \
 * {@link KnownUnmanageActionResourceMode} can be used interchangeably with UnmanageActionResourceMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **delete**: Delete the resources from Azure \
 * **detach**: Keep the resources in Azure
 */
export type UnmanageActionResourceMode = string;

/** Specifies an action for a newly unmanaged resource group. */
export enum KnownUnmanageActionResourceGroupMode {
  /** Delete the resource groups from Azure. */
  Delete = "delete",
  /** Keep the resource groups in Azure. */
  Detach = "detach",
}

/**
 * Specifies an action for a newly unmanaged resource group. \
 * {@link KnownUnmanageActionResourceGroupMode} can be used interchangeably with UnmanageActionResourceGroupMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **delete**: Delete the resource groups from Azure. \
 * **detach**: Keep the resource groups in Azure.
 */
export type UnmanageActionResourceGroupMode = string;

/** Specifies an action for a newly unmanaged resource. */
export enum KnownUnmanageActionManagementGroupMode {
  /** Delete the management groups from Azure. */
  Delete = "delete",
  /** Keep the management groups in Azure. */
  Detach = "detach",
}

/**
 * Specifies an action for a newly unmanaged resource. \
 * {@link KnownUnmanageActionManagementGroupMode} can be used interchangeably with UnmanageActionManagementGroupMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **delete**: Delete the management groups from Azure. \
 * **detach**: Keep the management groups in Azure.
 */
export type UnmanageActionManagementGroupMode = string;

/** Specifies an action for resources that do not support deletion. */
export enum KnownResourcesWithoutDeleteSupportAction {
  /** Detach the specified resources from the deployment stack and continue. */
  Detach = "detach",
  /** Fail the deployment stack if resources cannot be deleted. */
  Fail = "fail",
}

/**
 * Specifies an action for resources that do not support deletion. \
 * {@link KnownResourcesWithoutDeleteSupportAction} can be used interchangeably with ResourcesWithoutDeleteSupportAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **detach**: Detach the specified resources from the deployment stack and continue. \
 * **fail**: Fail the deployment stack if resources cannot be deleted.
 */
export type ResourcesWithoutDeleteSupportAction = string;

/** The debug setting. */
export interface DeploymentStacksDebugSetting {
  /** Specifies the type of information to log for debugging. The permitted values are none, requestContent, responseContent, or both requestContent and responseContent separated by a comma. The default is none. When setting this value, carefully consider the type of information that is being passed in during deployment. By logging information about the request or response, sensitive data that is retrieved through the deployment operations could potentially be exposed. */
  detailLevel?: string;
}

export function deploymentStacksDebugSettingSerializer(item: DeploymentStacksDebugSetting): any {
  return { detailLevel: item["detailLevel"] };
}

export function deploymentStacksDebugSettingDeserializer(item: any): DeploymentStacksDebugSetting {
  return {
    detailLevel: item["detailLevel"],
  };
}

/** Defines how resources deployed by the Deployment stack are locked. */
export interface DenySettings {
  /** denySettings Mode that defines denied actions. */
  mode: DenySettingsMode;
  /** List of AAD principal IDs excluded from the lock. Up to 5 principals are permitted. */
  excludedPrincipals?: string[];
  /** List of role-based management operations that are excluded from the denySettings. Up to 200 actions are permitted. If the denySetting mode is set to 'denyWriteAndDelete', then the following actions are automatically appended to 'excludedActions': '*\/read' and 'Microsoft.Authorization/locks/delete'. If the denySetting mode is set to 'denyDelete', then the following actions are automatically appended to 'excludedActions': 'Microsoft.Authorization/locks/delete'. Duplicate actions will be removed. */
  excludedActions?: string[];
  /** DenySettings will be applied to child resource scopes of every managed resource with a deny assignment. */
  applyToChildScopes?: boolean;
}

export function denySettingsSerializer(item: DenySettings): any {
  return {
    mode: item["mode"],
    excludedPrincipals: !item["excludedPrincipals"]
      ? item["excludedPrincipals"]
      : item["excludedPrincipals"].map((p: any) => {
          return p;
        }),
    excludedActions: !item["excludedActions"]
      ? item["excludedActions"]
      : item["excludedActions"].map((p: any) => {
          return p;
        }),
    applyToChildScopes: item["applyToChildScopes"],
  };
}

export function denySettingsDeserializer(item: any): DenySettings {
  return {
    mode: item["mode"],
    excludedPrincipals: !item["excludedPrincipals"]
      ? item["excludedPrincipals"]
      : item["excludedPrincipals"].map((p: any) => {
          return p;
        }),
    excludedActions: !item["excludedActions"]
      ? item["excludedActions"]
      : item["excludedActions"].map((p: any) => {
          return p;
        }),
    applyToChildScopes: item["applyToChildScopes"],
  };
}

/** denySettings Mode that defines denied actions. */
export enum KnownDenySettingsMode {
  /** Authorized users are able to read and modify the resources, but cannot delete. */
  DenyDelete = "denyDelete",
  /** Authorized users can read from a resource, but cannot modify or delete it. */
  DenyWriteAndDelete = "denyWriteAndDelete",
  /** No denyAssignments have been applied. */
  None = "none",
}

/**
 * denySettings Mode that defines denied actions. \
 * {@link KnownDenySettingsMode} can be used interchangeably with DenySettingsMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **denyDelete**: Authorized users are able to read and modify the resources, but cannot delete. \
 * **denyWriteAndDelete**: Authorized users can read from a resource, but cannot modify or delete it. \
 * **none**: No denyAssignments have been applied.
 */
export type DenySettingsMode = string;

/** State of the deployment stack. */
export enum KnownDeploymentStackProvisioningState {
  /** The deployment stack is currently being created */
  Creating = "creating",
  /** The deployment stack is currently being validated */
  Validating = "validating",
  /** The deployment stack is currently waiting */
  Waiting = "waiting",
  /** The deployment stack is currently deploying */
  Deploying = "deploying",
  /** The deployment stack is being cancelled */
  Canceling = "canceling",
  /** The deployment stack is updating deny assignments */
  UpdatingDenyAssignments = "updatingDenyAssignments",
  /** The deployment stack is deleting resources */
  DeletingResources = "deletingResources",
  /** The deployment stack completed successfully */
  Succeeded = "succeeded",
  /** The deployment stack has failed */
  Failed = "failed",
  /** The deployment stack has been cancelled */
  Canceled = "canceled",
  /** The deployment stack is being deleted */
  Deleting = "deleting",
  /** The deployment stack is currently being initialized */
  Initializing = "initializing",
  /** The deployment stack is currently performing an operation */
  Running = "running",
}

/**
 * State of the deployment stack. \
 * {@link KnownDeploymentStackProvisioningState} can be used interchangeably with DeploymentStackProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **creating**: The deployment stack is currently being created \
 * **validating**: The deployment stack is currently being validated \
 * **waiting**: The deployment stack is currently waiting \
 * **deploying**: The deployment stack is currently deploying \
 * **canceling**: The deployment stack is being cancelled \
 * **updatingDenyAssignments**: The deployment stack is updating deny assignments \
 * **deletingResources**: The deployment stack is deleting resources \
 * **succeeded**: The deployment stack completed successfully \
 * **failed**: The deployment stack has failed \
 * **canceled**: The deployment stack has been cancelled \
 * **deleting**: The deployment stack is being deleted \
 * **initializing**: The deployment stack is currently being initialized \
 * **running**: The deployment stack is currently performing an operation
 */
export type DeploymentStackProvisioningState = string;

/** The level of validation performed on the deployment. */
export enum KnownValidationLevel {
  /** Static analysis of the template is performed. */
  Template = "Template",
  /** Static analysis of the template is performed and resource declarations are sent to resource providers for semantic validation. Validates that the caller has RBAC write permissions on each resource. */
  Provider = "Provider",
  /** Static analysis of the template is performed and resource declarations are sent to resource providers for semantic validation. Skips validating that the caller has RBAC write permissions on each resource. */
  ProviderNoRbac = "ProviderNoRbac",
}

/**
 * The level of validation performed on the deployment. \
 * {@link KnownValidationLevel} can be used interchangeably with ValidationLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Template**: Static analysis of the template is performed. \
 * **Provider**: Static analysis of the template is performed and resource declarations are sent to resource providers for semantic validation. Validates that the caller has RBAC write permissions on each resource. \
 * **ProviderNoRbac**: Static analysis of the template is performed and resource declarations are sent to resource providers for semantic validation. Skips validating that the caller has RBAC write permissions on each resource.
 */
export type ValidationLevel = string;

/** Changes predicted to the deployment stack as a result of the what-if operation. */
export interface DeploymentStacksWhatIfChange {
  /** List of resource changes predicted by What-If operation. */
  resourceChanges: DeploymentStacksWhatIfResourceChange[];
  /** Predicted changes to the deployment stack deny settings. */
  denySettingsChange: DeploymentStacksChangeDeltaDenySettings;
  /** Predicted changes to the deployment scope for the deployment stack. */
  deploymentScopeChange?: DeploymentStacksChangeBase;
}

export function deploymentStacksWhatIfChangeDeserializer(item: any): DeploymentStacksWhatIfChange {
  return {
    resourceChanges: deploymentStacksWhatIfResourceChangeArrayDeserializer(item["resourceChanges"]),
    denySettingsChange: deploymentStacksChangeDeltaDenySettingsDeserializer(
      item["denySettingsChange"],
    ),
    deploymentScopeChange: !item["deploymentScopeChange"]
      ? item["deploymentScopeChange"]
      : deploymentStacksChangeBaseDeserializer(item["deploymentScopeChange"]),
  };
}

export function deploymentStacksWhatIfResourceChangeArrayDeserializer(
  result: Array<DeploymentStacksWhatIfResourceChange>,
): any[] {
  return result.map((item) => {
    return deploymentStacksWhatIfResourceChangeDeserializer(item);
  });
}

/** Information about a single resource change predicted by What-If operation. */
export interface DeploymentStacksWhatIfResourceChange {
  /** The ARM Resource ID of a resource managed by the deployment stack. */
  readonly id?: string;
  /** The extension the resource was deployed with. */
  readonly extension?: DeploymentExtension;
  /** The resource type. */
  readonly type?: string;
  /** The extensible resource identifiers. */
  readonly identifiers?: Record<string, any>;
  /** The API version the resource was deployed with */
  readonly apiVersion?: string;
  /** The resource id of the Deployment responsible for this change. */
  deploymentId?: string;
  /** The symbolic name of the resource being changed. */
  symbolicName?: string;
  /** Type of change that will be made to the resource when the deployment is executed. */
  changeType: DeploymentStacksWhatIfChangeType;
  /** The confidence level of the predicted change. */
  changeCertainty: DeploymentStacksWhatIfChangeCertainty;
  /** The predicted changes to the deployment stack management status of the resource. */
  managementStatusChange?: DeploymentStacksChangeBaseDeploymentStacksManagementStatus;
  /** The predicted changes to the deployment stack deny status of the resource. */
  denyStatusChange?: DeploymentStacksChangeBaseDenyStatusMode;
  /** The explanation about why the resource is unsupported by What-If. */
  unsupportedReason?: string;
  /** The predicted changes to the resource configuration. */
  resourceConfigurationChanges?: DeploymentStacksChangeDeltaRecord;
}

export function deploymentStacksWhatIfResourceChangeDeserializer(
  item: any,
): DeploymentStacksWhatIfResourceChange {
  return {
    id: item["id"],
    extension: !item["extension"]
      ? item["extension"]
      : deploymentExtensionDeserializer(item["extension"]),
    type: item["type"],
    identifiers: !item["identifiers"]
      ? item["identifiers"]
      : Object.fromEntries(
          Object.entries(item["identifiers"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    apiVersion: item["apiVersion"],
    deploymentId: item["deploymentId"],
    symbolicName: item["symbolicName"],
    changeType: item["changeType"],
    changeCertainty: item["changeCertainty"],
    managementStatusChange: !item["managementStatusChange"]
      ? item["managementStatusChange"]
      : deploymentStacksChangeBaseDeploymentStacksManagementStatusDeserializer(
          item["managementStatusChange"],
        ),
    denyStatusChange: !item["denyStatusChange"]
      ? item["denyStatusChange"]
      : deploymentStacksChangeBaseDenyStatusModeDeserializer(item["denyStatusChange"]),
    unsupportedReason: item["unsupportedReason"],
    resourceConfigurationChanges: !item["resourceConfigurationChanges"]
      ? item["resourceConfigurationChanges"]
      : deploymentStacksChangeDeltaRecordDeserializer(item["resourceConfigurationChanges"]),
  };
}

/** Details about the usage of a deployment extension. */
export interface DeploymentExtension {
  /** The extension name. */
  name: string;
  /** The extension version. */
  version: string;
  /** The configuration ID of the extension usage. It uniquely identifies a target the extension deploys to. */
  configId?: string;
  /** The configuration used for deployment. The keys of this object should align with the extension config schema. */
  config?: DeploymentExtensionConfig;
}

export function deploymentExtensionDeserializer(item: any): DeploymentExtension {
  return {
    name: item["name"],
    version: item["version"],
    configId: item["configId"],
    config: !item["config"]
      ? item["config"]
      : deploymentExtensionConfigDeserializer(item["config"]),
  };
}

/** Type of change that will be made to the resource when the deployment is executed. */
export enum KnownDeploymentStacksWhatIfChangeType {
  /** The resource does not exist in the current state but is present in the desired state. The resource will be created when the deployment is executed. */
  Create = "create",
  /** The resource exists in the current state and is missing from the desired state. The resource will be deleted from Azure after the deployment is executed. */
  Delete = "delete",
  /** The resource exists in the current state and is missing from the desired state. The resource will be removed from the deployment stack, but will remain in Azure, after the deployment is executed. */
  Detach = "detach",
  /** The resource exists in the current state and the desired state and will be redeployed when the deployment is executed. The properties of the resource will change. */
  Modify = "modify",
  /** The resource exists in the current state and the desired state and will be redeployed when the deployment is executed. The properties of the resource will not change. */
  NoChange = "noChange",
  /** The resource is not supported by What-If. */
  Unsupported = "unsupported",
}

/**
 * Type of change that will be made to the resource when the deployment is executed. \
 * {@link KnownDeploymentStacksWhatIfChangeType} can be used interchangeably with DeploymentStacksWhatIfChangeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **create**: The resource does not exist in the current state but is present in the desired state. The resource will be created when the deployment is executed. \
 * **delete**: The resource exists in the current state and is missing from the desired state. The resource will be deleted from Azure after the deployment is executed. \
 * **detach**: The resource exists in the current state and is missing from the desired state. The resource will be removed from the deployment stack, but will remain in Azure, after the deployment is executed. \
 * **modify**: The resource exists in the current state and the desired state and will be redeployed when the deployment is executed. The properties of the resource will change. \
 * **noChange**: The resource exists in the current state and the desired state and will be redeployed when the deployment is executed. The properties of the resource will not change. \
 * **unsupported**: The resource is not supported by What-If.
 */
export type DeploymentStacksWhatIfChangeType = string;

/** Denotes the confidence level of the predicted change. */
export enum KnownDeploymentStacksWhatIfChangeCertainty {
  /** The change is definite. */
  Definite = "definite",
  /** The change may or may not happen, based on deployment-time conditions. */
  Potential = "potential",
}

/**
 * Denotes the confidence level of the predicted change. \
 * {@link KnownDeploymentStacksWhatIfChangeCertainty} can be used interchangeably with DeploymentStacksWhatIfChangeCertainty,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **definite**: The change is definite. \
 * **potential**: The change may or may not happen, based on deployment-time conditions.
 */
export type DeploymentStacksWhatIfChangeCertainty = string;

/** Base model for properties with the before-and-after property values. */
export interface DeploymentStacksChangeBaseDeploymentStacksManagementStatus {
  /** The predicted value before the deployment is executed. */
  before?: DeploymentStacksManagementStatus;
  /** The predicted value after the deployment is executed. */
  after?: DeploymentStacksManagementStatus;
}

export function deploymentStacksChangeBaseDeploymentStacksManagementStatusDeserializer(
  item: any,
): DeploymentStacksChangeBaseDeploymentStacksManagementStatus {
  return {
    before: item["before"],
    after: item["after"],
  };
}

/** The management status of the deployment stack resource. */
export enum KnownDeploymentStacksManagementStatus {
  /** The resource is managed by the deployment stack. */
  Managed = "managed",
  /** The resource is not managed by the deployment stack. */
  Unmanaged = "unmanaged",
  /** The management state of the resource could not be determined. */
  Unknown = "unknown",
}

/**
 * The management status of the deployment stack resource. \
 * {@link KnownDeploymentStacksManagementStatus} can be used interchangeably with DeploymentStacksManagementStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **managed**: The resource is managed by the deployment stack. \
 * **unmanaged**: The resource is not managed by the deployment stack. \
 * **unknown**: The management state of the resource could not be determined.
 */
export type DeploymentStacksManagementStatus = string;

/** Base model for properties with the before-and-after property values. */
export interface DeploymentStacksChangeBaseDenyStatusMode {
  /** The predicted value before the deployment is executed. */
  before?: DenyStatusMode;
  /** The predicted value after the deployment is executed. */
  after?: DenyStatusMode;
}

export function deploymentStacksChangeBaseDenyStatusModeDeserializer(
  item: any,
): DeploymentStacksChangeBaseDenyStatusMode {
  return {
    before: item["before"],
    after: item["after"],
  };
}

/** denyAssignment settings applied to the resource. */
export enum KnownDenyStatusMode {
  /** Authorized users are able to read and modify the resources, but cannot delete. */
  DenyDelete = "denyDelete",
  /** Resource type does not support denyAssignments. */
  NotSupported = "notSupported",
  /** denyAssignments are not supported on resources outside the scope of the deployment stack. */
  Inapplicable = "inapplicable",
  /** Authorized users can only read from a resource, but cannot modify or delete it. */
  DenyWriteAndDelete = "denyWriteAndDelete",
  /** Deny assignment has been removed by Azure due to a resource management change (management group move, etc.) */
  RemovedBySystem = "removedBySystem",
  /** No denyAssignments have been applied. */
  None = "none",
  /** The denyAssignment status is unknown. */
  Unknown = "unknown",
}

/**
 * denyAssignment settings applied to the resource. \
 * {@link KnownDenyStatusMode} can be used interchangeably with DenyStatusMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **denyDelete**: Authorized users are able to read and modify the resources, but cannot delete. \
 * **notSupported**: Resource type does not support denyAssignments. \
 * **inapplicable**: denyAssignments are not supported on resources outside the scope of the deployment stack. \
 * **denyWriteAndDelete**: Authorized users can only read from a resource, but cannot modify or delete it. \
 * **removedBySystem**: Deny assignment has been removed by Azure due to a resource management change (management group move, etc.) \
 * **none**: No denyAssignments have been applied. \
 * **unknown**: The denyAssignment status is unknown.
 */
export type DenyStatusMode = string;

/** Model to show the before-and-after property values, along with the delta between them. */
export interface DeploymentStacksChangeDeltaRecord {
  /** The predicted value before the deployment is executed. */
  before?: Record<string, any>;
  /** The predicted value after the deployment is executed. */
  after?: Record<string, any>;
  /** The predicted changes to the properties." */
  delta?: DeploymentStacksWhatIfPropertyChange[];
}

export function deploymentStacksChangeDeltaRecordDeserializer(
  item: any,
): DeploymentStacksChangeDeltaRecord {
  return {
    before: !item["before"]
      ? item["before"]
      : Object.fromEntries(Object.entries(item["before"]).map(([k, p]: [string, any]) => [k, p])),
    after: !item["after"]
      ? item["after"]
      : Object.fromEntries(Object.entries(item["after"]).map(([k, p]: [string, any]) => [k, p])),
    delta: !item["delta"]
      ? item["delta"]
      : deploymentStacksWhatIfPropertyChangeArrayDeserializer(item["delta"]),
  };
}

export function deploymentStacksWhatIfPropertyChangeArrayDeserializer(
  result: Array<DeploymentStacksWhatIfPropertyChange>,
): any[] {
  return result.map((item) => {
    return deploymentStacksWhatIfPropertyChangeDeserializer(item);
  });
}

/** The predicted change to the resource property. */
export interface DeploymentStacksWhatIfPropertyChange {
  /** The predicted value before the deployment is executed. */
  before?: any;
  /** The predicted value after the deployment is executed. */
  after?: any;
  /** Type of change that will be made to the resource when the deployment is executed. */
  path: string;
  /** Type of change that will be made to the resource when the deployment is executed. */
  changeType: DeploymentStacksWhatIfPropertyChangeType;
  /** Nested property changes. */
  children?: DeploymentStacksWhatIfPropertyChange[];
}

export function deploymentStacksWhatIfPropertyChangeDeserializer(
  item: any,
): DeploymentStacksWhatIfPropertyChange {
  return {
    before: item["before"],
    after: item["after"],
    path: item["path"],
    changeType: item["changeType"],
    children: !item["children"]
      ? item["children"]
      : deploymentStacksWhatIfPropertyChangeArrayDeserializer(item["children"]),
  };
}

/** The type of property change. */
export enum KnownDeploymentStacksWhatIfPropertyChangeType {
  /** The property is an array and contains nested changes. */
  Array = "array",
  /** The property does not exist in the current state but is present in the desired state. The property will be created when the deployment is executed. */
  Create = "create",
  /** The property exists in the current state and is missing from the desired state. It will be deleted when the deployment is executed. */
  Delete = "delete",
  /** The property exists in both current and desired state and is different. The value of the property will change when the deployment is executed. */
  Modify = "modify",
  /** The property will not be set or updated. */
  NoEffect = "noEffect",
}

/**
 * The type of property change. \
 * {@link KnownDeploymentStacksWhatIfPropertyChangeType} can be used interchangeably with DeploymentStacksWhatIfPropertyChangeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **array**: The property is an array and contains nested changes. \
 * **create**: The property does not exist in the current state but is present in the desired state. The property will be created when the deployment is executed. \
 * **delete**: The property exists in the current state and is missing from the desired state. It will be deleted when the deployment is executed. \
 * **modify**: The property exists in both current and desired state and is different. The value of the property will change when the deployment is executed. \
 * **noEffect**: The property will not be set or updated.
 */
export type DeploymentStacksWhatIfPropertyChangeType = string;

/** Model to show the before-and-after property values, along with the delta between them. */
export interface DeploymentStacksChangeDeltaDenySettings {
  /** The predicted value before the deployment is executed. */
  before?: DenySettings;
  /** The predicted value after the deployment is executed. */
  after?: DenySettings;
  /** The predicted changes to the properties." */
  delta?: DeploymentStacksWhatIfPropertyChange[];
}

export function deploymentStacksChangeDeltaDenySettingsDeserializer(
  item: any,
): DeploymentStacksChangeDeltaDenySettings {
  return {
    before: !item["before"] ? item["before"] : denySettingsDeserializer(item["before"]),
    after: !item["after"] ? item["after"] : denySettingsDeserializer(item["after"]),
    delta: !item["delta"]
      ? item["delta"]
      : deploymentStacksWhatIfPropertyChangeArrayDeserializer(item["delta"]),
  };
}

/** Base model for properties with the before-and-after property values. */
export interface DeploymentStacksChangeBase {
  /** The predicted value before the deployment is executed. */
  before?: string;
  /** The predicted value after the deployment is executed. */
  after?: string;
}

export function deploymentStacksChangeBaseDeserializer(item: any): DeploymentStacksChangeBase {
  return {
    before: item["before"],
    after: item["after"],
  };
}

export function deploymentStacksDiagnosticArrayDeserializer(
  result: Array<DeploymentStacksDiagnostic>,
): any[] {
  return result.map((item) => {
    return deploymentStacksDiagnosticDeserializer(item);
  });
}

/** The error additional info */
export interface DeploymentStacksDiagnostic {
  /** Denotes the additional response level. */
  level: DeploymentStacksDiagnosticLevel;
  /** The error code. */
  code: string;
  /** The error message. */
  message: string;
  /** The error target. */
  target?: string;
  /** Additional error information. */
  additionalInfo?: ErrorAdditionalInfo[];
}

export function deploymentStacksDiagnosticDeserializer(item: any): DeploymentStacksDiagnostic {
  return {
    level: item["level"],
    code: item["code"],
    message: item["message"],
    target: item["target"],
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

/** Denotes the additional response level. */
export enum KnownDeploymentStacksDiagnosticLevel {
  /** Informational message. */
  Info = "info",
  /** Warning message. */
  Warning = "warning",
  /** Error message. */
  Error = "error",
}

/**
 * Denotes the additional response level. \
 * {@link KnownDeploymentStacksDiagnosticLevel} can be used interchangeably with DeploymentStacksDiagnosticLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **info**: Informational message. \
 * **warning**: Warning message. \
 * **error**: Error message.
 */
export type DeploymentStacksDiagnosticLevel = string;

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

/** The response of a DeploymentStacksWhatIfResult list operation. */
export interface _DeploymentStacksWhatIfResultListResult {
  /** The DeploymentStacksWhatIfResult items on this page */
  value: DeploymentStacksWhatIfResult[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deploymentStacksWhatIfResultListResultDeserializer(
  item: any,
): _DeploymentStacksWhatIfResultListResult {
  return {
    value: deploymentStacksWhatIfResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deploymentStacksWhatIfResultArraySerializer(
  result: Array<DeploymentStacksWhatIfResult>,
): any[] {
  return result.map((item) => {
    return deploymentStacksWhatIfResultSerializer(item);
  });
}

export function deploymentStacksWhatIfResultArrayDeserializer(
  result: Array<DeploymentStacksWhatIfResult>,
): any[] {
  return result.map((item) => {
    return deploymentStacksWhatIfResultDeserializer(item);
  });
}

/** Deployment stack object. */
export interface DeploymentStack extends ProxyResource {
  /** Deployment stack properties. */
  properties?: DeploymentStackProperties;
  /** The geo-location where the resource lives. Required for subscription and management group scoped stacks. The location is inherited from the resource group for resource group scoped stacks. */
  location?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function deploymentStackSerializer(item: DeploymentStack): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : deploymentStackPropertiesSerializer(item["properties"]),
    location: item["location"],
    tags: item["tags"],
  };
}

export function deploymentStackDeserializer(item: any): DeploymentStack {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : deploymentStackPropertiesDeserializer(item["properties"]),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Deployment stack properties. */
export interface DeploymentStackProperties {
  /** The error detail. */
  readonly error?: ErrorDetail;
  /** The template content. You use this element when you want to pass the template syntax directly in the request rather than link to an existing template. It can be a JObject or well-formed JSON string. Use either the templateLink property or the template property, but not both. */
  template?: Record<string, any>;
  /** The URI of the template. Use either the templateLink property or the template property, but not both. */
  templateLink?: DeploymentStacksTemplateLink;
  /** Name and value pairs that define the deployment parameters for the template. Use this element when providing the parameter values directly in the request, rather than linking to an existing parameter file. Use either the parametersLink property or the parameters property, but not both. */
  parameters?: Record<string, DeploymentParameter>;
  /** The URI of parameters file. Use this element to link to an existing parameters file. Use either the parametersLink property or the parameters property, but not both. */
  parametersLink?: DeploymentStacksParametersLink;
  /** The deployment extension configs. Keys of this object are extension aliases as defined in the deployment template. */
  extensionConfigs?: Record<string, DeploymentExtensionConfig>;
  /** External input values, used by external tooling for parameter evaluation. */
  externalInputs?: Record<string, DeploymentExternalInput>;
  /** External input definitions, used by external tooling to define expected external input values. */
  externalInputDefinitions?: Record<string, DeploymentExternalInputDefinition>;
  /** Defines the behavior of resources that are no longer managed after the Deployment stack is updated or deleted. */
  actionOnUnmanage: ActionOnUnmanage;
  /** The debug setting of the deployment. */
  debugSetting?: DeploymentStacksDebugSetting;
  /** The scope at which the initial deployment should be created. If a scope is not specified, it will default to the scope of the deployment stack. Valid scopes are: management group (format: '/providers/Microsoft.Management/managementGroups/{managementGroupId}'), subscription (format: '/subscriptions/{subscriptionId}'), resource group (format: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}'). */
  deploymentScope?: string;
  /** Deployment stack description. Max length of 4096 characters. */
  description?: string;
  /** Defines how resources deployed by the stack are locked. */
  denySettings: DenySettings;
  /** State of the deployment stack. */
  readonly provisioningState?: DeploymentStackProvisioningState;
  /** The correlation id of the last Deployment stack upsert or delete operation. It is in GUID format and is used for tracing. */
  readonly correlationId?: string;
  /** The validation level of the deployment stack */
  validationLevel?: ValidationLevel;
  /** Flag to bypass service errors that indicate the stack resource list is not correctly synchronized. */
  bypassStackOutOfSyncError?: boolean;
  /** An array of resources that were detached during the most recent Deployment stack update. Detached means that the resource was removed from the template, but no relevant deletion operations were specified. So, the resource still exists while no longer being associated with the stack. */
  readonly detachedResources?: ResourceReference[];
  /** An array of resources that were deleted during the most recent Deployment stack update. Deleted means that the resource was removed from the template and relevant deletion operations were specified. */
  readonly deletedResources?: ResourceReference[];
  /** An array of resources that failed to reach goal state during the most recent update. Each resourceId is accompanied by an error message. */
  readonly failedResources?: ResourceReferenceExtended[];
  /** An array of resources currently managed by the deployment stack. */
  readonly resources?: ManagedResourceReference[];
  /** The extensions used during deployment. Contains extension data for all extensible resources managed by the stack. */
  readonly deploymentExtensions?: DeploymentExtension[];
  /** The resourceId of the deployment resource created by the deployment stack. */
  readonly deploymentId?: string;
  /** The outputs of the deployment resource created by the deployment stack. */
  readonly outputs?: Record<string, any>;
  /** The duration of the last successful Deployment stack update. */
  readonly duration?: string;
}

export function deploymentStackPropertiesSerializer(item: DeploymentStackProperties): any {
  return {
    template: item["template"],
    templateLink: !item["templateLink"]
      ? item["templateLink"]
      : deploymentStacksTemplateLinkSerializer(item["templateLink"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : deploymentParameterRecordSerializer(item["parameters"]),
    parametersLink: !item["parametersLink"]
      ? item["parametersLink"]
      : deploymentStacksParametersLinkSerializer(item["parametersLink"]),
    extensionConfigs: !item["extensionConfigs"]
      ? item["extensionConfigs"]
      : deploymentExtensionConfigRecordSerializer(item["extensionConfigs"]),
    externalInputs: !item["externalInputs"]
      ? item["externalInputs"]
      : deploymentExternalInputRecordSerializer(item["externalInputs"]),
    externalInputDefinitions: !item["externalInputDefinitions"]
      ? item["externalInputDefinitions"]
      : deploymentExternalInputDefinitionRecordSerializer(item["externalInputDefinitions"]),
    actionOnUnmanage: actionOnUnmanageSerializer(item["actionOnUnmanage"]),
    debugSetting: !item["debugSetting"]
      ? item["debugSetting"]
      : deploymentStacksDebugSettingSerializer(item["debugSetting"]),
    deploymentScope: item["deploymentScope"],
    description: item["description"],
    denySettings: denySettingsSerializer(item["denySettings"]),
    validationLevel: item["validationLevel"],
    bypassStackOutOfSyncError: item["bypassStackOutOfSyncError"],
  };
}

export function deploymentStackPropertiesDeserializer(item: any): DeploymentStackProperties {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    template: !item["template"]
      ? item["template"]
      : Object.fromEntries(Object.entries(item["template"]).map(([k, p]: [string, any]) => [k, p])),
    templateLink: !item["templateLink"]
      ? item["templateLink"]
      : deploymentStacksTemplateLinkDeserializer(item["templateLink"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : deploymentParameterRecordDeserializer(item["parameters"]),
    parametersLink: !item["parametersLink"]
      ? item["parametersLink"]
      : deploymentStacksParametersLinkDeserializer(item["parametersLink"]),
    extensionConfigs: !item["extensionConfigs"]
      ? item["extensionConfigs"]
      : deploymentExtensionConfigRecordDeserializer(item["extensionConfigs"]),
    externalInputs: !item["externalInputs"]
      ? item["externalInputs"]
      : deploymentExternalInputRecordDeserializer(item["externalInputs"]),
    externalInputDefinitions: !item["externalInputDefinitions"]
      ? item["externalInputDefinitions"]
      : deploymentExternalInputDefinitionRecordDeserializer(item["externalInputDefinitions"]),
    actionOnUnmanage: actionOnUnmanageDeserializer(item["actionOnUnmanage"]),
    debugSetting: !item["debugSetting"]
      ? item["debugSetting"]
      : deploymentStacksDebugSettingDeserializer(item["debugSetting"]),
    deploymentScope: item["deploymentScope"],
    description: item["description"],
    denySettings: denySettingsDeserializer(item["denySettings"]),
    provisioningState: item["provisioningState"],
    correlationId: item["correlationId"],
    validationLevel: item["validationLevel"],
    bypassStackOutOfSyncError: item["bypassStackOutOfSyncError"],
    detachedResources: !item["detachedResources"]
      ? item["detachedResources"]
      : resourceReferenceArrayDeserializer(item["detachedResources"]),
    deletedResources: !item["deletedResources"]
      ? item["deletedResources"]
      : resourceReferenceArrayDeserializer(item["deletedResources"]),
    failedResources: !item["failedResources"]
      ? item["failedResources"]
      : resourceReferenceExtendedArrayDeserializer(item["failedResources"]),
    resources: !item["resources"]
      ? item["resources"]
      : managedResourceReferenceArrayDeserializer(item["resources"]),
    deploymentExtensions: !item["deploymentExtensions"]
      ? item["deploymentExtensions"]
      : deploymentExtensionArrayDeserializer(item["deploymentExtensions"]),
    deploymentId: item["deploymentId"],
    outputs: !item["outputs"]
      ? item["outputs"]
      : Object.fromEntries(Object.entries(item["outputs"]).map(([k, p]: [string, any]) => [k, p])),
    duration: item["duration"],
  };
}

export function resourceReferenceArrayDeserializer(result: Array<ResourceReference>): any[] {
  return result.map((item) => {
    return resourceReferenceDeserializer(item);
  });
}

/** The resourceId model. */
export interface ResourceReference {
  /** The ARM Resource ID of a resource managed by the deployment stack. */
  readonly id?: string;
  /** The extension the resource was deployed with. */
  readonly extension?: DeploymentExtension;
  /** The resource type. */
  readonly type?: string;
  /** The extensible resource identifiers. */
  readonly identifiers?: Record<string, any>;
  /** The API version the resource was deployed with */
  readonly apiVersion?: string;
}

export function resourceReferenceDeserializer(item: any): ResourceReference {
  return {
    id: item["id"],
    extension: !item["extension"]
      ? item["extension"]
      : deploymentExtensionDeserializer(item["extension"]),
    type: item["type"],
    identifiers: !item["identifiers"]
      ? item["identifiers"]
      : Object.fromEntries(
          Object.entries(item["identifiers"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    apiVersion: item["apiVersion"],
  };
}

export function resourceReferenceExtendedArrayDeserializer(
  result: Array<ResourceReferenceExtended>,
): any[] {
  return result.map((item) => {
    return resourceReferenceExtendedDeserializer(item);
  });
}

/** The resourceId extended model. This is used to document failed resources with a resourceId and a corresponding error. */
export interface ResourceReferenceExtended {
  /** The ARM Resource ID of a resource managed by the deployment stack. */
  readonly id?: string;
  /** The extension the resource was deployed with. */
  readonly extension?: DeploymentExtension;
  /** The resource type. */
  readonly type?: string;
  /** The extensible resource identifiers. */
  readonly identifiers?: Record<string, any>;
  /** The API version the resource was deployed with */
  readonly apiVersion?: string;
  /** The error detail. */
  readonly error?: ErrorDetail;
}

export function resourceReferenceExtendedDeserializer(item: any): ResourceReferenceExtended {
  return {
    id: item["id"],
    extension: !item["extension"]
      ? item["extension"]
      : deploymentExtensionDeserializer(item["extension"]),
    type: item["type"],
    identifiers: !item["identifiers"]
      ? item["identifiers"]
      : Object.fromEntries(
          Object.entries(item["identifiers"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    apiVersion: item["apiVersion"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

export function managedResourceReferenceArrayDeserializer(
  result: Array<ManagedResourceReference>,
): any[] {
  return result.map((item) => {
    return managedResourceReferenceDeserializer(item);
  });
}

/** The managed resource model. */
export interface ManagedResourceReference extends ResourceReference {
  /** Current management state of the resource in the deployment stack. */
  status?: ResourceStatusMode;
  /** denyAssignment settings applied to the resource. */
  denyStatus?: DenyStatusMode;
}

export function managedResourceReferenceDeserializer(item: any): ManagedResourceReference {
  return {
    id: item["id"],
    extension: !item["extension"]
      ? item["extension"]
      : deploymentExtensionDeserializer(item["extension"]),
    type: item["type"],
    identifiers: !item["identifiers"]
      ? item["identifiers"]
      : Object.fromEntries(
          Object.entries(item["identifiers"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    apiVersion: item["apiVersion"],
    status: item["status"],
    denyStatus: item["denyStatus"],
  };
}

/** Current management state of the resource in the deployment stack. */
export enum KnownResourceStatusMode {
  /** This resource is managed by the deployment stack. */
  Managed = "managed",
  /** Unable to remove the deny assignment on resource. */
  RemoveDenyFailed = "removeDenyFailed",
  /** Unable to delete the resource from Azure. The delete will be retried on the next stack deployment, or can be deleted manually. */
  DeleteFailed = "deleteFailed",
}

/**
 * Current management state of the resource in the deployment stack. \
 * {@link KnownResourceStatusMode} can be used interchangeably with ResourceStatusMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **managed**: This resource is managed by the deployment stack. \
 * **removeDenyFailed**: Unable to remove the deny assignment on resource. \
 * **deleteFailed**: Unable to delete the resource from Azure. The delete will be retried on the next stack deployment, or can be deleted manually.
 */
export type ResourceStatusMode = string;

export function deploymentExtensionArrayDeserializer(result: Array<DeploymentExtension>): any[] {
  return result.map((item) => {
    return deploymentExtensionDeserializer(item);
  });
}

/** The response of a DeploymentStack list operation. */
export interface _DeploymentStackListResult {
  /** The DeploymentStack items on this page */
  value: DeploymentStack[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deploymentStackListResultDeserializer(item: any): _DeploymentStackListResult {
  return {
    value: deploymentStackArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deploymentStackArraySerializer(result: Array<DeploymentStack>): any[] {
  return result.map((item) => {
    return deploymentStackSerializer(item);
  });
}

export function deploymentStackArrayDeserializer(result: Array<DeploymentStack>): any[] {
  return result.map((item) => {
    return deploymentStackDeserializer(item);
  });
}

/** The Deployment stack validation result. */
export interface DeploymentStackValidateResult {
  /** String Id used to locate any resource on Azure. */
  readonly id?: string;
  /** Name of this resource. */
  readonly name?: string;
  /** Type of this resource. */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
  /** The error detail. */
  readonly error?: ErrorDetail;
  /** The validation result details. */
  properties?: DeploymentStackValidateProperties;
}

export function deploymentStackValidateResultDeserializer(
  item: any,
): DeploymentStackValidateResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    properties: !item["properties"]
      ? item["properties"]
      : deploymentStackValidatePropertiesDeserializer(item["properties"]),
  };
}

/** The Deployment stack validation result details. */
export interface DeploymentStackValidateProperties {
  /** Defines the behavior of resources that are no longer managed after the Deployment stack is updated or deleted. */
  actionOnUnmanage?: ActionOnUnmanage;
  /** The correlation id of the Deployment stack validate operation. It is in GUID format and is used for tracing. */
  correlationId?: string;
  /** The Deployment stack deny settings. */
  denySettings?: DenySettings;
  /** The Deployment stack deployment scope. */
  deploymentScope?: string;
  /** The Deployment stack validation description. */
  description?: string;
  /** Deployment parameters. */
  parameters?: Record<string, DeploymentParameter>;
  /** The URI of the template. */
  templateLink?: DeploymentStacksTemplateLink;
  /** The array of resources that were validated. */
  validatedResources?: ResourceReference[];
  /** The deployment extensions. */
  deploymentExtensions?: DeploymentExtension[];
  /** The validation level of the deployment stack */
  validationLevel?: ValidationLevel;
}

export function deploymentStackValidatePropertiesDeserializer(
  item: any,
): DeploymentStackValidateProperties {
  return {
    actionOnUnmanage: !item["actionOnUnmanage"]
      ? item["actionOnUnmanage"]
      : actionOnUnmanageDeserializer(item["actionOnUnmanage"]),
    correlationId: item["correlationId"],
    denySettings: !item["denySettings"]
      ? item["denySettings"]
      : denySettingsDeserializer(item["denySettings"]),
    deploymentScope: item["deploymentScope"],
    description: item["description"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : deploymentParameterRecordDeserializer(item["parameters"]),
    templateLink: !item["templateLink"]
      ? item["templateLink"]
      : deploymentStacksTemplateLinkDeserializer(item["templateLink"]),
    validatedResources: !item["validatedResources"]
      ? item["validatedResources"]
      : resourceReferenceArrayDeserializer(item["validatedResources"]),
    deploymentExtensions: !item["deploymentExtensions"]
      ? item["deploymentExtensions"]
      : deploymentExtensionArrayDeserializer(item["deploymentExtensions"]),
    validationLevel: item["validationLevel"],
  };
}

/** Export Template specific properties of the Deployment stack. */
export interface DeploymentStackTemplateDefinition {
  /** The template content. Use this element to pass the template syntax directly in the request rather than link to an existing template. It can be a JObject or well-formed JSON string. Use either the templateLink property or the template property, but not both. */
  template?: Record<string, any>;
  /** The URI of the template. Use either the templateLink property or the template property, but not both. */
  templateLink?: DeploymentStacksTemplateLink;
}

export function deploymentStackTemplateDefinitionDeserializer(
  item: any,
): DeploymentStackTemplateDefinition {
  return {
    template: !item["template"]
      ? item["template"]
      : Object.fromEntries(Object.entries(item["template"]).map(([k, p]: [string, any]) => [k, p])),
    templateLink: !item["templateLink"]
      ? item["templateLink"]
      : deploymentStacksTemplateLinkDeserializer(item["templateLink"]),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-03-01 API version. */
  V20240301 = "2024-03-01",
  /** The 2025-07-01 API version. */
  V20250701 = "2025-07-01",
}
