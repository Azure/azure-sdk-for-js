// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Deployment information. */
export interface DeploymentExtended extends ExtensionResource {
  /** Deployment properties. */
  properties?: DeploymentPropertiesExtended;
  /** the location of the deployment. */
  location?: string;
  /** Deployment tags */
  tags?: Record<string, string>;
}

export function deploymentExtendedDeserializer(item: any): DeploymentExtended {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : deploymentPropertiesExtendedDeserializer(item["properties"]),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Deployment properties with additional details. */
export interface DeploymentPropertiesExtended {
  /** Denotes the state of provisioning. */
  readonly provisioningState?: ProvisioningState;
  /** The correlation ID of the deployment. */
  readonly correlationId?: string;
  /** The timestamp of the template deployment. */
  readonly timestamp?: Date;
  /** The duration of the template deployment. */
  readonly duration?: string;
  /** Key/value pairs that represent deployment output. */
  readonly outputs?: any;
  /** The list of resource providers needed for the deployment. */
  readonly providers?: Provider[];
  /** The list of deployment dependencies. */
  readonly dependencies?: Dependency[];
  /** The URI referencing the template. */
  readonly templateLink?: TemplateLink;
  /** Deployment parameters. */
  readonly parameters?: any;
  /** The URI referencing the parameters. */
  readonly parametersLink?: ParametersLink;
  /** The extensions used in this deployment. */
  readonly extensions?: DeploymentExtensionDefinition[];
  /** The deployment mode. Possible values are Incremental and Complete. */
  readonly mode?: DeploymentMode;
  /** The debug setting of the deployment. */
  readonly debugSetting?: DebugSetting;
  /** The deployment on error behavior. */
  readonly onErrorDeployment?: OnErrorDeploymentExtended;
  /** The hash produced for the template. */
  readonly templateHash?: string;
  /** Array of provisioned resources. */
  readonly outputResources?: ResourceReference[];
  /** Array of validated resources. */
  readonly validatedResources?: ResourceReference[];
  /** The deployment error. */
  readonly error?: ErrorResponse;
  /** Contains diagnostic information collected during validation process. */
  readonly diagnostics?: DeploymentDiagnosticsDefinition[];
  /** The validation level of the deployment */
  validationLevel?: ValidationLevel;
}

export function deploymentPropertiesExtendedDeserializer(item: any): DeploymentPropertiesExtended {
  return {
    provisioningState: item["provisioningState"],
    correlationId: item["correlationId"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    duration: item["duration"],
    outputs: item["outputs"],
    providers: !item["providers"]
      ? item["providers"]
      : providerArrayDeserializer(item["providers"]),
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : dependencyArrayDeserializer(item["dependencies"]),
    templateLink: !item["templateLink"]
      ? item["templateLink"]
      : templateLinkDeserializer(item["templateLink"]),
    parameters: item["parameters"],
    parametersLink: !item["parametersLink"]
      ? item["parametersLink"]
      : parametersLinkDeserializer(item["parametersLink"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : deploymentExtensionDefinitionArrayDeserializer(item["extensions"]),
    mode: item["mode"],
    debugSetting: !item["debugSetting"]
      ? item["debugSetting"]
      : debugSettingDeserializer(item["debugSetting"]),
    onErrorDeployment: !item["onErrorDeployment"]
      ? item["onErrorDeployment"]
      : onErrorDeploymentExtendedDeserializer(item["onErrorDeployment"]),
    templateHash: item["templateHash"],
    outputResources: !item["outputResources"]
      ? item["outputResources"]
      : resourceReferenceArrayDeserializer(item["outputResources"]),
    validatedResources: !item["validatedResources"]
      ? item["validatedResources"]
      : resourceReferenceArrayDeserializer(item["validatedResources"]),
    error: !item["error"] ? item["error"] : errorResponseDeserializer(item["error"]),
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : deploymentDiagnosticsDefinitionArrayDeserializer(item["diagnostics"]),
    validationLevel: item["validationLevel"],
  };
}

/** Denotes the state of provisioning. */
export enum KnownProvisioningState {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Accepted */
  Accepted = "Accepted",
  /** Running */
  Running = "Running",
  /** Ready */
  Ready = "Ready",
  /** Creating */
  Creating = "Creating",
  /** Created */
  Created = "Created",
  /** Deleting */
  Deleting = "Deleting",
  /** Deleted */
  Deleted = "Deleted",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Updating */
  Updating = "Updating",
}

/**
 * Denotes the state of provisioning. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: NotSpecified \
 * **Accepted**: Accepted \
 * **Running**: Running \
 * **Ready**: Ready \
 * **Creating**: Creating \
 * **Created**: Created \
 * **Deleting**: Deleting \
 * **Deleted**: Deleted \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **Succeeded**: Succeeded \
 * **Updating**: Updating
 */
export type ProvisioningState = string;

export function providerArrayDeserializer(result: Array<Provider>): any[] {
  return result.map((item) => {
    return providerDeserializer(item);
  });
}

/** Resource provider information. */
export interface Provider {
  /** The provider ID. */
  readonly id?: string;
  /** The namespace of the resource provider. */
  namespace?: string;
  /** The registration state of the resource provider. */
  readonly registrationState?: string;
  /** The registration policy of the resource provider. */
  readonly registrationPolicy?: string;
  /** The collection of provider resource types. */
  readonly resourceTypes?: ProviderResourceType[];
  /** The provider authorization consent state. */
  providerAuthorizationConsentState?: ProviderAuthorizationConsentState;
}

export function providerDeserializer(item: any): Provider {
  return {
    id: item["id"],
    namespace: item["namespace"],
    registrationState: item["registrationState"],
    registrationPolicy: item["registrationPolicy"],
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : providerResourceTypeArrayDeserializer(item["resourceTypes"]),
    providerAuthorizationConsentState: item["providerAuthorizationConsentState"],
  };
}

export function providerResourceTypeArrayDeserializer(result: Array<ProviderResourceType>): any[] {
  return result.map((item) => {
    return providerResourceTypeDeserializer(item);
  });
}

/** Resource type managed by the resource provider. */
export interface ProviderResourceType {
  /** The resource type. */
  resourceType?: string;
  /** The collection of locations where this resource type can be created. */
  locations?: string[];
  /** The location mappings that are supported by this resource type. */
  locationMappings?: ProviderExtendedLocation[];
  /** The aliases that are supported by this resource type. */
  aliases?: Alias[];
  /** The API version. */
  apiVersions?: string[];
  /** The default API version. */
  readonly defaultApiVersion?: string;
  zoneMappings?: ZoneMapping[];
  /** The API profiles for the resource provider. */
  readonly apiProfiles?: ApiProfile[];
  /** The additional capabilities offered by this resource type. */
  capabilities?: string;
  /** The properties. */
  properties?: Record<string, string>;
}

export function providerResourceTypeDeserializer(item: any): ProviderResourceType {
  return {
    resourceType: item["resourceType"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    locationMappings: !item["locationMappings"]
      ? item["locationMappings"]
      : providerExtendedLocationArrayDeserializer(item["locationMappings"]),
    aliases: !item["aliases"] ? item["aliases"] : aliasArrayDeserializer(item["aliases"]),
    apiVersions: !item["apiVersions"]
      ? item["apiVersions"]
      : item["apiVersions"].map((p: any) => {
          return p;
        }),
    defaultApiVersion: item["defaultApiVersion"],
    zoneMappings: !item["zoneMappings"]
      ? item["zoneMappings"]
      : zoneMappingArrayDeserializer(item["zoneMappings"]),
    apiProfiles: !item["apiProfiles"]
      ? item["apiProfiles"]
      : apiProfileArrayDeserializer(item["apiProfiles"]),
    capabilities: item["capabilities"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function providerExtendedLocationArrayDeserializer(
  result: Array<ProviderExtendedLocation>,
): any[] {
  return result.map((item) => {
    return providerExtendedLocationDeserializer(item);
  });
}

/** The provider extended location. */
export interface ProviderExtendedLocation {
  /** The azure location. */
  location?: string;
  /** The extended location type. */
  type?: string;
  /** The extended locations for the azure location. */
  extendedLocations?: string[];
}

export function providerExtendedLocationDeserializer(item: any): ProviderExtendedLocation {
  return {
    location: item["location"],
    type: item["type"],
    extendedLocations: !item["extendedLocations"]
      ? item["extendedLocations"]
      : item["extendedLocations"].map((p: any) => {
          return p;
        }),
  };
}

export function aliasArrayDeserializer(result: Array<Alias>): any[] {
  return result.map((item) => {
    return aliasDeserializer(item);
  });
}

/** The alias type. */
export interface Alias {
  /** The alias name. */
  name?: string;
  /** The paths for an alias. */
  paths?: AliasPath[];
  /** The type of the alias. */
  type?: AliasType;
  /** The default path for an alias. */
  defaultPath?: string;
  /** The default pattern for an alias. */
  defaultPattern?: AliasPattern;
  /** The default alias path metadata. Applies to the default path and to any alias path that doesn't have metadata */
  readonly defaultMetadata?: AliasPathMetadata;
}

export function aliasDeserializer(item: any): Alias {
  return {
    name: item["name"],
    paths: !item["paths"] ? item["paths"] : aliasPathArrayDeserializer(item["paths"]),
    type: item["type"],
    defaultPath: item["defaultPath"],
    defaultPattern: !item["defaultPattern"]
      ? item["defaultPattern"]
      : aliasPatternDeserializer(item["defaultPattern"]),
    defaultMetadata: !item["defaultMetadata"]
      ? item["defaultMetadata"]
      : aliasPathMetadataDeserializer(item["defaultMetadata"]),
  };
}

export function aliasPathArrayDeserializer(result: Array<AliasPath>): any[] {
  return result.map((item) => {
    return aliasPathDeserializer(item);
  });
}

/** The type of the paths for alias. */
export interface AliasPath {
  /** The path of an alias. */
  path?: string;
  /** The API versions. */
  apiVersions?: string[];
  /** The pattern for an alias path. */
  pattern?: AliasPattern;
  /** The metadata of the alias path. If missing, fall back to the default metadata of the alias. */
  readonly metadata?: AliasPathMetadata;
}

export function aliasPathDeserializer(item: any): AliasPath {
  return {
    path: item["path"],
    apiVersions: !item["apiVersions"]
      ? item["apiVersions"]
      : item["apiVersions"].map((p: any) => {
          return p;
        }),
    pattern: !item["pattern"] ? item["pattern"] : aliasPatternDeserializer(item["pattern"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : aliasPathMetadataDeserializer(item["metadata"]),
  };
}

/** The type of the pattern for an alias path. */
export interface AliasPattern {
  /** The alias pattern phrase. */
  phrase?: string;
  /** The alias pattern variable. */
  variable?: string;
  /** The type of alias pattern */
  type?: AliasPatternType;
}

export function aliasPatternDeserializer(item: any): AliasPattern {
  return {
    phrase: item["phrase"],
    variable: item["variable"],
    type: item["type"],
  };
}

/** The type of alias pattern */
export type AliasPatternType = "NotSpecified" | "Extract";

/** model interface AliasPathMetadata */
export interface AliasPathMetadata {
  /** The type of the token that the alias path is referring to. */
  readonly type?: AliasPathTokenType;
  /** The attributes of the token that the alias path is referring to. */
  readonly attributes?: AliasPathAttributes;
}

export function aliasPathMetadataDeserializer(item: any): AliasPathMetadata {
  return {
    type: item["type"],
    attributes: item["attributes"],
  };
}

/** The type of the token that the alias path is referring to. */
export enum KnownAliasPathTokenType {
  /** The token type is not specified. */
  NotSpecified = "NotSpecified",
  /** The token type can be anything. */
  Any = "Any",
  /** The token type is string. */
  String = "String",
  /** The token type is object. */
  Object = "Object",
  /** The token type is array. */
  Array = "Array",
  /** The token type is integer. */
  Integer = "Integer",
  /** The token type is number. */
  Number = "Number",
  /** The token type is boolean. */
  Boolean = "Boolean",
}

/**
 * The type of the token that the alias path is referring to. \
 * {@link KnownAliasPathTokenType} can be used interchangeably with AliasPathTokenType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: The token type is not specified. \
 * **Any**: The token type can be anything. \
 * **String**: The token type is string. \
 * **Object**: The token type is object. \
 * **Array**: The token type is array. \
 * **Integer**: The token type is integer. \
 * **Number**: The token type is number. \
 * **Boolean**: The token type is boolean.
 */
export type AliasPathTokenType = string;

/** The attributes of the token that the alias path is referring to. */
export enum KnownAliasPathAttributes {
  /** The token that the alias path is referring to has no attributes. */
  None = "None",
  /** The token that the alias path is referring to is modifiable by policies with 'modify' effect. */
  Modifiable = "Modifiable",
}

/**
 * The attributes of the token that the alias path is referring to. \
 * {@link KnownAliasPathAttributes} can be used interchangeably with AliasPathAttributes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: The token that the alias path is referring to has no attributes. \
 * **Modifiable**: The token that the alias path is referring to is modifiable by policies with 'modify' effect.
 */
export type AliasPathAttributes = string;
/** The type of the alias. */
export type AliasType = "NotSpecified" | "PlainText" | "Mask";

export function zoneMappingArrayDeserializer(result: Array<ZoneMapping>): any[] {
  return result.map((item) => {
    return zoneMappingDeserializer(item);
  });
}

/** model interface ZoneMapping */
export interface ZoneMapping {
  /** The location of the zone mapping. */
  location?: string;
  zones?: string[];
}

export function zoneMappingDeserializer(item: any): ZoneMapping {
  return {
    location: item["location"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function apiProfileArrayDeserializer(result: Array<ApiProfile>): any[] {
  return result.map((item) => {
    return apiProfileDeserializer(item);
  });
}

/** model interface ApiProfile */
export interface ApiProfile {
  /** The profile version. */
  readonly profileVersion?: string;
  /** The API version. */
  readonly apiVersion?: string;
}

export function apiProfileDeserializer(item: any): ApiProfile {
  return {
    profileVersion: item["profileVersion"],
    apiVersion: item["apiVersion"],
  };
}

/** The provider authorization consent state. */
export enum KnownProviderAuthorizationConsentState {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Required */
  Required = "Required",
  /** NotRequired */
  NotRequired = "NotRequired",
  /** Consented */
  Consented = "Consented",
}

/**
 * The provider authorization consent state. \
 * {@link KnownProviderAuthorizationConsentState} can be used interchangeably with ProviderAuthorizationConsentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: NotSpecified \
 * **Required**: Required \
 * **NotRequired**: NotRequired \
 * **Consented**: Consented
 */
export type ProviderAuthorizationConsentState = string;

export function dependencyArrayDeserializer(result: Array<Dependency>): any[] {
  return result.map((item) => {
    return dependencyDeserializer(item);
  });
}

/** Deployment dependency information. */
export interface Dependency {
  /** The list of dependencies. */
  dependsOn?: BasicDependency[];
  /** The ID of the dependency. */
  id?: string;
  /** The dependency resource type. */
  resourceType?: string;
  /** The dependency resource name. */
  resourceName?: string;
}

export function dependencyDeserializer(item: any): Dependency {
  return {
    dependsOn: !item["dependsOn"]
      ? item["dependsOn"]
      : basicDependencyArrayDeserializer(item["dependsOn"]),
    id: item["id"],
    resourceType: item["resourceType"],
    resourceName: item["resourceName"],
  };
}

export function basicDependencyArrayDeserializer(result: Array<BasicDependency>): any[] {
  return result.map((item) => {
    return basicDependencyDeserializer(item);
  });
}

/** Deployment dependency information. */
export interface BasicDependency {
  /** The ID of the dependency. */
  id?: string;
  /** The dependency resource type. */
  resourceType?: string;
  /** The dependency resource name. */
  resourceName?: string;
}

export function basicDependencyDeserializer(item: any): BasicDependency {
  return {
    id: item["id"],
    resourceType: item["resourceType"],
    resourceName: item["resourceName"],
  };
}

/** Entity representing the reference to the template. */
export interface TemplateLink {
  /** The URI of the template to deploy. Use either the uri or id property, but not both. */
  uri?: string;
  /** The resource id of a Template Spec. Use either the id or uri property, but not both. */
  id?: string;
  /** The relativePath property can be used to deploy a linked template at a location relative to the parent. If the parent template was linked with a TemplateSpec, this will reference an artifact in the TemplateSpec.  If the parent was linked with a URI, the child deployment will be a combination of the parent and relativePath URIs */
  relativePath?: string;
  /** If included, must match the ContentVersion in the template. */
  contentVersion?: string;
  /** The query string (for example, a SAS token) to be used with the templateLink URI. */
  queryString?: string;
}

export function templateLinkSerializer(item: TemplateLink): any {
  return {
    uri: item["uri"],
    id: item["id"],
    relativePath: item["relativePath"],
    contentVersion: item["contentVersion"],
    queryString: item["queryString"],
  };
}

export function templateLinkDeserializer(item: any): TemplateLink {
  return {
    uri: item["uri"],
    id: item["id"],
    relativePath: item["relativePath"],
    contentVersion: item["contentVersion"],
    queryString: item["queryString"],
  };
}

/** Entity representing the reference to the deployment parameters. */
export interface ParametersLink {
  /** The URI of the parameters file. */
  uri: string;
  /** If included, must match the ContentVersion in the template. */
  contentVersion?: string;
}

export function parametersLinkSerializer(item: ParametersLink): any {
  return { uri: item["uri"], contentVersion: item["contentVersion"] };
}

export function parametersLinkDeserializer(item: any): ParametersLink {
  return {
    uri: item["uri"],
    contentVersion: item["contentVersion"],
  };
}

export function deploymentExtensionDefinitionArrayDeserializer(
  result: Array<DeploymentExtensionDefinition>,
): any[] {
  return result.map((item) => {
    return deploymentExtensionDefinitionDeserializer(item);
  });
}

/** model interface DeploymentExtensionDefinition */
export interface DeploymentExtensionDefinition {
  /** The alias of the extension as defined in the deployment template. */
  readonly alias?: string;
  /** The extension name. */
  readonly name?: string;
  /** The extension version. */
  readonly version?: string;
  /** The extension configuration ID. It uniquely identifies a deployment control plane within an extension. */
  readonly configId?: string;
  /** The extension configuration. */
  readonly config?: Record<string, DeploymentExtensionConfigItem>;
}

export function deploymentExtensionDefinitionDeserializer(
  item: any,
): DeploymentExtensionDefinition {
  return {
    alias: item["alias"],
    name: item["name"],
    version: item["version"],
    configId: item["configId"],
    config: !item["config"]
      ? item["config"]
      : deploymentExtensionConfigItemRecordDeserializer(item["config"]),
  };
}

export function deploymentExtensionConfigItemRecordSerializer(
  item: Record<string, DeploymentExtensionConfigItem>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : deploymentExtensionConfigItemSerializer(item[key]);
  });
  return result;
}

export function deploymentExtensionConfigItemRecordDeserializer(
  item: Record<string, any>,
): Record<string, DeploymentExtensionConfigItem> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : deploymentExtensionConfigItemDeserializer(item[key]);
  });
  return result;
}

/** model interface DeploymentExtensionConfigItem */
export interface DeploymentExtensionConfigItem {
  /** The value type of the extension config property. */
  readonly type?: ExtensionConfigPropertyType;
  /** The value of the extension config property. */
  value?: any;
  /** The Azure Key Vault reference used to retrieve the secret value of the extension config property. */
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

/** Known values of {@link ExtensionConfigPropertyType} that the service accepts. */
export enum KnownExtensionConfigPropertyType {
  /** Property type representing a string value. */
  String = "String",
  /** Property type representing an integer value. */
  Int = "Int",
  /** Property type representing a boolean value. */
  Bool = "Bool",
  /** Property type representing an array value. */
  Array = "Array",
  /** Property type representing an object value. */
  Object = "Object",
  /** Property type representing a secure string value. */
  SecureString = "SecureString",
  /** Property type representing a secure object value. */
  SecureObject = "SecureObject",
}

/** Type of ExtensionConfigPropertyType */
export type ExtensionConfigPropertyType = string;

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
  /** Azure Key Vault resource id. */
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

/** The mode that is used to deploy resources. This value can be either Incremental or Complete. In Incremental mode, resources are deployed without deleting existing resources that are not included in the template. In Complete mode, resources are deployed and existing resources in the resource group that are not included in the template are deleted. Be careful when using Complete mode as you may unintentionally delete resources. */
export type DeploymentMode = "Incremental" | "Complete";

/** The debug setting. */
export interface DebugSetting {
  /** Specifies the type of information to log for debugging. The permitted values are none, requestContent, responseContent, or both requestContent and responseContent separated by a comma. The default is none. When setting this value, carefully consider the type of information you are passing in during deployment. By logging information about the request or response, you could potentially expose sensitive data that is retrieved through the deployment operations. */
  detailLevel?: string;
}

export function debugSettingSerializer(item: DebugSetting): any {
  return { detailLevel: item["detailLevel"] };
}

export function debugSettingDeserializer(item: any): DebugSetting {
  return {
    detailLevel: item["detailLevel"],
  };
}

/** Deployment on error behavior with additional details. */
export interface OnErrorDeploymentExtended {
  /** The state of the provisioning for the on error deployment. */
  readonly provisioningState?: string;
  /** The deployment on error behavior type. Possible values are LastSuccessful and SpecificDeployment. */
  type?: OnErrorDeploymentType;
  /** The deployment to be used on error case. */
  deploymentName?: string;
}

export function onErrorDeploymentExtendedDeserializer(item: any): OnErrorDeploymentExtended {
  return {
    provisioningState: item["provisioningState"],
    type: item["type"],
    deploymentName: item["deploymentName"],
  };
}

/** The deployment on error behavior type. Possible values are LastSuccessful and SpecificDeployment. */
export type OnErrorDeploymentType = "LastSuccessful" | "SpecificDeployment";

export function resourceReferenceArrayDeserializer(result: Array<ResourceReference>): any[] {
  return result.map((item) => {
    return resourceReferenceDeserializer(item);
  });
}

/** The resource Id model. */
export interface ResourceReference {
  /** The fully qualified Azure resource ID. */
  readonly id?: string;
  /** The extension the resource was deployed with. */
  readonly extension?: DeploymentExtensionDefinition;
  /** The resource type. */
  readonly resourceType?: string;
  /** The extensible resource identifiers. */
  readonly identifiers?: any;
  /** The API version the resource was deployed with. */
  readonly apiVersion?: string;
}

export function resourceReferenceDeserializer(item: any): ResourceReference {
  return {
    id: item["id"],
    extension: !item["extension"]
      ? item["extension"]
      : deploymentExtensionDefinitionDeserializer(item["extension"]),
    resourceType: item["resourceType"],
    identifiers: item["identifiers"],
    apiVersion: item["apiVersion"],
  };
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.) */
export interface ErrorResponse {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorResponse[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorResponseArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorResponseArrayDeserializer(result: Array<ErrorResponse>): any[] {
  return result.map((item) => {
    return errorResponseDeserializer(item);
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

export function deploymentDiagnosticsDefinitionArrayDeserializer(
  result: Array<DeploymentDiagnosticsDefinition>,
): any[] {
  return result.map((item) => {
    return deploymentDiagnosticsDefinitionDeserializer(item);
  });
}

/** model interface DeploymentDiagnosticsDefinition */
export interface DeploymentDiagnosticsDefinition {
  /** Denotes the additional response level. */
  readonly level: Level;
  /** The error code. */
  readonly code: string;
  /** The error message. */
  readonly message: string;
  /** The error target. */
  readonly target?: string;
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function deploymentDiagnosticsDefinitionDeserializer(
  item: any,
): DeploymentDiagnosticsDefinition {
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
export enum KnownLevel {
  /** Warning */
  Warning = "Warning",
  /** Info */
  Info = "Info",
  /** Error */
  Error = "Error",
}

/**
 * Denotes the additional response level. \
 * {@link KnownLevel} can be used interchangeably with Level,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Warning**: Warning \
 * **Info**: Info \
 * **Error**: Error
 */
export type Level = string;

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

/** An error response for a resource management request. */
export interface CloudError {
  /** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.) */
  error?: ErrorResponse;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : errorResponseDeserializer(item["error"]),
  };
}

/** Deployment operation parameters. */
export interface Deployment {
  /** The location to store the deployment data. */
  location?: string;
  /** The deployment properties. */
  properties: DeploymentProperties;
  /** Deployment tags */
  tags?: Record<string, string>;
  /** The Managed Identity configuration for a deployment. */
  identity?: DeploymentIdentity;
}

export function deploymentSerializer(item: Deployment): any {
  return {
    location: item["location"],
    properties: deploymentPropertiesSerializer(item["properties"]),
    tags: item["tags"],
    identity: !item["identity"] ? item["identity"] : deploymentIdentitySerializer(item["identity"]),
  };
}

/** Deployment properties. */
export interface DeploymentProperties {
  /** The template content. You use this element when you want to pass the template syntax directly in the request rather than link to an existing template. It can be a JObject or well-formed JSON string. Use either the templateLink property or the template property, but not both. */
  template?: any;
  /** The URI of the template. Use either the templateLink property or the template property, but not both. */
  templateLink?: TemplateLink;
  /** Name and value pairs that define the deployment parameters for the template. You use this element when you want to provide the parameter values directly in the request rather than link to an existing parameter file. Use either the parametersLink property or the parameters property, but not both. It can be a JObject or a well formed JSON string. */
  parameters?: Record<string, DeploymentParameter>;
  /** External input values, used by external tooling for parameter evaluation. */
  externalInputs?: Record<string, DeploymentExternalInput>;
  /** External input definitions, used by external tooling to define expected external input values. */
  externalInputDefinitions?: Record<string, DeploymentExternalInputDefinition>;
  /** The URI of parameters file. You use this element to link to an existing parameters file. Use either the parametersLink property or the parameters property, but not both. */
  parametersLink?: ParametersLink;
  /** The configurations to use for deployment extensions. The keys of this object are deployment extension aliases as defined in the deployment template. */
  extensionConfigs?: Record<string, Record<string, DeploymentExtensionConfigItem>>;
  /** The mode that is used to deploy resources. This value can be either Incremental or Complete. In Incremental mode, resources are deployed without deleting existing resources that are not included in the template. In Complete mode, resources are deployed and existing resources in the resource group that are not included in the template are deleted. Be careful when using Complete mode as you may unintentionally delete resources. */
  mode: DeploymentMode;
  /** The debug setting of the deployment. */
  debugSetting?: DebugSetting;
  /** The deployment on error behavior. */
  onErrorDeployment?: OnErrorDeployment;
  /** Specifies whether template expressions are evaluated within the scope of the parent template or nested template. Only applicable to nested templates. If not specified, default value is outer. */
  expressionEvaluationOptions?: ExpressionEvaluationOptions;
  /** The validation level of the deployment */
  validationLevel?: ValidationLevel;
}

export function deploymentPropertiesSerializer(item: DeploymentProperties): any {
  return {
    template: item["template"],
    templateLink: !item["templateLink"]
      ? item["templateLink"]
      : templateLinkSerializer(item["templateLink"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : deploymentParameterRecordSerializer(item["parameters"]),
    externalInputs: !item["externalInputs"]
      ? item["externalInputs"]
      : deploymentExternalInputRecordSerializer(item["externalInputs"]),
    externalInputDefinitions: !item["externalInputDefinitions"]
      ? item["externalInputDefinitions"]
      : deploymentExternalInputDefinitionRecordSerializer(item["externalInputDefinitions"]),
    parametersLink: !item["parametersLink"]
      ? item["parametersLink"]
      : parametersLinkSerializer(item["parametersLink"]),
    extensionConfigs: !item["extensionConfigs"]
      ? item["extensionConfigs"]
      : deploymentExtensionConfigItemRecordRecordSerializer(item["extensionConfigs"]),
    mode: item["mode"],
    debugSetting: !item["debugSetting"]
      ? item["debugSetting"]
      : debugSettingSerializer(item["debugSetting"]),
    onErrorDeployment: !item["onErrorDeployment"]
      ? item["onErrorDeployment"]
      : onErrorDeploymentSerializer(item["onErrorDeployment"]),
    expressionEvaluationOptions: !item["expressionEvaluationOptions"]
      ? item["expressionEvaluationOptions"]
      : expressionEvaluationOptionsSerializer(item["expressionEvaluationOptions"]),
    validationLevel: item["validationLevel"],
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

/** Deployment parameter for the template. */
export interface DeploymentParameter {
  /** Input value to the parameter . */
  value?: any;
  /** Azure Key Vault parameter reference. */
  reference?: KeyVaultParameterReference;
  /** Input expression to the parameter. */
  expression?: string;
}

export function deploymentParameterSerializer(item: DeploymentParameter): any {
  return {
    value: item["value"],
    reference: !item["reference"]
      ? item["reference"]
      : keyVaultParameterReferenceSerializer(item["reference"]),
    expression: item["expression"],
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

/** Deployment external input for parameterization. */
export interface DeploymentExternalInput {
  /** External input value. */
  value: any;
}

export function deploymentExternalInputSerializer(item: DeploymentExternalInput): any {
  return { value: item["value"] };
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

export function deploymentExtensionConfigItemRecordRecordSerializer(
  item: Record<string, Record<string, DeploymentExtensionConfigItem>>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : deploymentExtensionConfigItemRecordSerializer(item[key]);
  });
  return result;
}

export function deploymentExtensionConfigItemRecordRecordDeserializer(
  item: Record<string, any>,
): Record<string, Record<string, DeploymentExtensionConfigItem>> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : deploymentExtensionConfigItemRecordDeserializer(item[key]);
  });
  return result;
}

/** Deployment on error behavior. */
export interface OnErrorDeployment {
  /** The deployment on error behavior type. Possible values are LastSuccessful and SpecificDeployment. */
  type?: OnErrorDeploymentType;
  /** The deployment to be used on error case. */
  deploymentName?: string;
}

export function onErrorDeploymentSerializer(item: OnErrorDeployment): any {
  return { type: item["type"], deploymentName: item["deploymentName"] };
}

/** Specifies whether template expressions are evaluated within the scope of the parent template or nested template. */
export interface ExpressionEvaluationOptions {
  /** The scope to be used for evaluation of parameters, variables and functions in a nested template. */
  scope?: ExpressionEvaluationOptionsScopeType;
}

export function expressionEvaluationOptionsSerializer(item: ExpressionEvaluationOptions): any {
  return { scope: item["scope"] };
}

/** The scope to be used for evaluation of parameters, variables and functions in a nested template. */
export enum KnownExpressionEvaluationOptionsScopeType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Outer */
  Outer = "Outer",
  /** Inner */
  Inner = "Inner",
}

/**
 * The scope to be used for evaluation of parameters, variables and functions in a nested template. \
 * {@link KnownExpressionEvaluationOptionsScopeType} can be used interchangeably with ExpressionEvaluationOptionsScopeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: NotSpecified \
 * **Outer**: Outer \
 * **Inner**: Inner
 */
export type ExpressionEvaluationOptionsScopeType = string;

/** The Managed Identity configuration for a deployment. */
export interface DeploymentIdentity {
  /** The identity type. */
  type: DeploymentIdentityType;
  /** The set of user assigned identities associated with the resource. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function deploymentIdentitySerializer(item: DeploymentIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

/** The identity type. */
export enum KnownDeploymentIdentityType {
  /** None */
  None = "None",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * The identity type. \
 * {@link KnownDeploymentIdentityType} can be used interchangeably with DeploymentIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **UserAssigned**: UserAssigned
 */
export type DeploymentIdentityType = string;

export function userAssignedIdentityRecordSerializer(
  item: Record<string, UserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitySerializer(item[key]);
  });
  return result;
}

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
}

/** Paged collection of DeploymentExtended items */
export interface _DeploymentListResult {
  /** The DeploymentExtended items on this page */
  value: DeploymentExtended[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deploymentListResultDeserializer(item: any): _DeploymentListResult {
  return {
    value: deploymentExtendedArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deploymentExtendedArrayDeserializer(result: Array<DeploymentExtended>): any[] {
  return result.map((item) => {
    return deploymentExtendedDeserializer(item);
  });
}

/** Information from validate template deployment response. */
export interface DeploymentValidateResult {
  /** The deployment validation error. */
  readonly error?: ErrorResponse;
  /** The ID of the deployment. */
  readonly id?: string;
  /** The name of the deployment. */
  readonly name?: string;
  /** The type of the deployment. */
  readonly type?: string;
  /** The template deployment properties. */
  properties?: DeploymentPropertiesExtended;
}

export function deploymentValidateResultDeserializer(item: any): DeploymentValidateResult {
  return {
    error: !item["error"] ? item["error"] : errorResponseDeserializer(item["error"]),
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : deploymentPropertiesExtendedDeserializer(item["properties"]),
  };
}

/** The deployment export result. */
export interface DeploymentExportResult {
  /** The template content. */
  template?: any;
}

export function deploymentExportResultDeserializer(item: any): DeploymentExportResult {
  return {
    template: item["template"],
  };
}

/** Deployment operation parameters. */
export interface ScopedDeployment {
  /** The location to store the deployment data. */
  location: string;
  /** The deployment properties. */
  properties: DeploymentProperties;
  /** Deployment tags */
  tags?: Record<string, string>;
}

export function scopedDeploymentSerializer(item: ScopedDeployment): any {
  return {
    location: item["location"],
    properties: deploymentPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Deployment What-if operation parameters. */
export interface ScopedDeploymentWhatIf {
  /** The location to store the deployment data. */
  location: string;
  /** The deployment properties. */
  properties: DeploymentWhatIfProperties;
}

export function scopedDeploymentWhatIfSerializer(item: ScopedDeploymentWhatIf): any {
  return {
    location: item["location"],
    properties: deploymentWhatIfPropertiesSerializer(item["properties"]),
  };
}

/** Deployment What-if properties. */
export interface DeploymentWhatIfProperties extends DeploymentProperties {
  /** Optional What-If operation settings. */
  whatIfSettings?: DeploymentWhatIfSettings;
}

export function deploymentWhatIfPropertiesSerializer(item: DeploymentWhatIfProperties): any {
  return {
    template: item["template"],
    templateLink: !item["templateLink"]
      ? item["templateLink"]
      : templateLinkSerializer(item["templateLink"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : deploymentParameterRecordSerializer(item["parameters"]),
    externalInputs: !item["externalInputs"]
      ? item["externalInputs"]
      : deploymentExternalInputRecordSerializer(item["externalInputs"]),
    externalInputDefinitions: !item["externalInputDefinitions"]
      ? item["externalInputDefinitions"]
      : deploymentExternalInputDefinitionRecordSerializer(item["externalInputDefinitions"]),
    parametersLink: !item["parametersLink"]
      ? item["parametersLink"]
      : parametersLinkSerializer(item["parametersLink"]),
    extensionConfigs: !item["extensionConfigs"]
      ? item["extensionConfigs"]
      : deploymentExtensionConfigItemRecordRecordSerializer(item["extensionConfigs"]),
    mode: item["mode"],
    debugSetting: !item["debugSetting"]
      ? item["debugSetting"]
      : debugSettingSerializer(item["debugSetting"]),
    onErrorDeployment: !item["onErrorDeployment"]
      ? item["onErrorDeployment"]
      : onErrorDeploymentSerializer(item["onErrorDeployment"]),
    expressionEvaluationOptions: !item["expressionEvaluationOptions"]
      ? item["expressionEvaluationOptions"]
      : expressionEvaluationOptionsSerializer(item["expressionEvaluationOptions"]),
    validationLevel: item["validationLevel"],
    whatIfSettings: !item["whatIfSettings"]
      ? item["whatIfSettings"]
      : deploymentWhatIfSettingsSerializer(item["whatIfSettings"]),
  };
}

/** Deployment What-If operation settings. */
export interface DeploymentWhatIfSettings {
  /** The format of the What-If results */
  resultFormat?: WhatIfResultFormat;
}

export function deploymentWhatIfSettingsSerializer(item: DeploymentWhatIfSettings): any {
  return { resultFormat: item["resultFormat"] };
}

/** The format of the What-If results */
export type WhatIfResultFormat = "ResourceIdOnly" | "FullResourcePayloads";

/** Result of the What-If operation. Contains a list of predicted changes and a URL link to get to the next set of results. */
export interface WhatIfOperationResult {
  /** Status of the What-If operation. */
  status?: string;
  /** Error when What-If operation fails. */
  error?: ErrorResponse;
  /** List of resource changes predicted by What-If operation. */
  changes?: WhatIfChange[];
  /** List of resource changes predicted by What-If operation. */
  potentialChanges?: WhatIfChange[];
  /** List of resource diagnostics detected by What-If operation. */
  readonly diagnostics?: DeploymentDiagnosticsDefinition[];
}

export function whatIfOperationResultDeserializer(item: any): WhatIfOperationResult {
  return {
    status: item["status"],
    ...(!item["properties"]
      ? item["properties"]
      : _whatIfOperationResultPropertiesDeserializer(item["properties"])),
    error: !item["error"] ? item["error"] : errorResponseDeserializer(item["error"]),
  };
}

/** Deployment operation properties. */
export interface WhatIfOperationProperties {
  /** List of resource changes predicted by What-If operation. */
  changes?: WhatIfChange[];
  /** List of resource changes predicted by What-If operation. */
  potentialChanges?: WhatIfChange[];
  /** List of resource diagnostics detected by What-If operation. */
  readonly diagnostics?: DeploymentDiagnosticsDefinition[];
}

export function whatIfOperationPropertiesDeserializer(item: any): WhatIfOperationProperties {
  return {
    changes: !item["changes"] ? item["changes"] : whatIfChangeArrayDeserializer(item["changes"]),
    potentialChanges: !item["potentialChanges"]
      ? item["potentialChanges"]
      : whatIfChangeArrayDeserializer(item["potentialChanges"]),
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : deploymentDiagnosticsDefinitionArrayDeserializer(item["diagnostics"]),
  };
}

export function whatIfChangeArrayDeserializer(result: Array<WhatIfChange>): any[] {
  return result.map((item) => {
    return whatIfChangeDeserializer(item);
  });
}

/** Information about a single resource change predicted by What-If operation. */
export interface WhatIfChange {
  /** Resource ID */
  resourceId?: string;
  /** The resource id of the Deployment responsible for this change. */
  deploymentId?: string;
  /** The symbolic name of the resource responsible for this change. */
  symbolicName?: string;
  /** A subset of properties that uniquely identify a Bicep extensible resource because it lacks a resource id like an Azure resource has. */
  identifiers?: any;
  /** The extension the resource was deployed with. */
  extension?: DeploymentExtensionDefinition;
  /** Type of change that will be made to the resource when the deployment is executed. */
  changeType: ChangeType;
  /** The explanation about why the resource is unsupported by What-If. */
  unsupportedReason?: string;
  /** The snapshot of the resource before the deployment is executed. */
  before?: any;
  /** The predicted snapshot of the resource after the deployment is executed. */
  after?: any;
  /** The predicted changes to resource properties. */
  delta?: WhatIfPropertyChange[];
}

export function whatIfChangeDeserializer(item: any): WhatIfChange {
  return {
    resourceId: item["resourceId"],
    deploymentId: item["deploymentId"],
    symbolicName: item["symbolicName"],
    identifiers: item["identifiers"],
    extension: !item["extension"]
      ? item["extension"]
      : deploymentExtensionDefinitionDeserializer(item["extension"]),
    changeType: item["changeType"],
    unsupportedReason: item["unsupportedReason"],
    before: item["before"],
    after: item["after"],
    delta: !item["delta"] ? item["delta"] : whatIfPropertyChangeArrayDeserializer(item["delta"]),
  };
}

/** Type of change that will be made to the resource when the deployment is executed. */
export type ChangeType =
  | "Create"
  | "Delete"
  | "Ignore"
  | "Deploy"
  | "NoChange"
  | "Modify"
  | "Unsupported";

export function whatIfPropertyChangeArrayDeserializer(result: Array<WhatIfPropertyChange>): any[] {
  return result.map((item) => {
    return whatIfPropertyChangeDeserializer(item);
  });
}

/** The predicted change to the resource property. */
export interface WhatIfPropertyChange {
  /** The path of the property. */
  path: string;
  /** The type of property change. */
  propertyChangeType: PropertyChangeType;
  /** The value of the property before the deployment is executed. */
  before?: any;
  /** The value of the property after the deployment is executed. */
  after?: any;
  /** Nested property changes. */
  children?: WhatIfPropertyChange[];
}

export function whatIfPropertyChangeDeserializer(item: any): WhatIfPropertyChange {
  return {
    path: item["path"],
    propertyChangeType: item["propertyChangeType"],
    before: item["before"],
    after: item["after"],
    children: !item["children"]
      ? item["children"]
      : whatIfPropertyChangeArrayDeserializer(item["children"]),
  };
}

/** The type of property change. */
export type PropertyChangeType = "Create" | "Delete" | "Modify" | "Array" | "NoEffect";

/** Deployment What-if operation parameters. */
export interface DeploymentWhatIf {
  /** The location to store the deployment data. */
  location?: string;
  /** The deployment properties. */
  properties: DeploymentWhatIfProperties;
}

export function deploymentWhatIfSerializer(item: DeploymentWhatIf): any {
  return {
    location: item["location"],
    properties: deploymentWhatIfPropertiesSerializer(item["properties"]),
  };
}

/** Result of the request to calculate template hash. It contains a string of minified template and its hash. */
export interface TemplateHashResult {
  /** The minified template string. */
  minifiedTemplate?: string;
  /** The template hash. */
  templateHash?: string;
}

export function templateHashResultDeserializer(item: any): TemplateHashResult {
  return {
    minifiedTemplate: item["minifiedTemplate"],
    templateHash: item["templateHash"],
  };
}

/** Deployment operation information. */
export interface DeploymentOperation {
  /** Full deployment operation ID. */
  readonly id?: string;
  /** Deployment operation ID. */
  readonly operationId?: string;
  /** Deployment properties. */
  properties?: DeploymentOperationProperties;
}

export function deploymentOperationDeserializer(item: any): DeploymentOperation {
  return {
    id: item["id"],
    operationId: item["operationId"],
    properties: !item["properties"]
      ? item["properties"]
      : deploymentOperationPropertiesDeserializer(item["properties"]),
  };
}

/** Deployment operation properties. */
export interface DeploymentOperationProperties {
  /** The name of the current provisioning operation. */
  readonly provisioningOperation?: ProvisioningOperation;
  /** The state of the provisioning. */
  readonly provisioningState?: string;
  /** The date and time of the operation. */
  readonly timestamp?: Date;
  /** The duration of the operation. */
  readonly duration?: string;
  /** Deployment operation service request id. */
  readonly serviceRequestId?: string;
  /** Operation status code from the resource provider. This property may not be set if a response has not yet been received. */
  readonly statusCode?: string;
  /** Operation status message from the resource provider. This property is optional.  It will only be provided if an error was received from the resource provider. */
  readonly statusMessage?: StatusMessage;
  /** The target resource. */
  readonly targetResource?: TargetResource;
  /** The HTTP request message. */
  readonly request?: HttpMessage;
  /** The HTTP response message. */
  readonly response?: HttpMessage;
}

export function deploymentOperationPropertiesDeserializer(
  item: any,
): DeploymentOperationProperties {
  return {
    provisioningOperation: item["provisioningOperation"],
    provisioningState: item["provisioningState"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    duration: item["duration"],
    serviceRequestId: item["serviceRequestId"],
    statusCode: item["statusCode"],
    statusMessage: !item["statusMessage"]
      ? item["statusMessage"]
      : statusMessageDeserializer(item["statusMessage"]),
    targetResource: !item["targetResource"]
      ? item["targetResource"]
      : targetResourceDeserializer(item["targetResource"]),
    request: !item["request"] ? item["request"] : httpMessageDeserializer(item["request"]),
    response: !item["response"] ? item["response"] : httpMessageDeserializer(item["response"]),
  };
}

/** The name of the current provisioning operation. */
export type ProvisioningOperation =
  | "NotSpecified"
  | "Create"
  | "Delete"
  | "Waiting"
  | "AzureAsyncOperationWaiting"
  | "ResourceCacheWaiting"
  | "Action"
  | "Read"
  | "EvaluateDeploymentOutput"
  | "DeploymentCleanup";

/** Operation status message object. */
export interface StatusMessage {
  /** Status of the deployment operation. */
  status?: string;
  /** The error reported by the operation. */
  error?: ErrorResponse;
}

export function statusMessageDeserializer(item: any): StatusMessage {
  return {
    status: item["status"],
    error: !item["error"] ? item["error"] : errorResponseDeserializer(item["error"]),
  };
}

/** Target resource. */
export interface TargetResource {
  /** The Azure resource ID of the resource. */
  id?: string;
  /** The name of the resource. */
  resourceName?: string;
  /** The type of the resource. */
  resourceType?: string;
  /** The extension the resource was deployed with. */
  extension?: DeploymentExtensionDefinition;
  /** The extensible resource identifiers. */
  identifiers?: any;
  /** The API version the resource was deployed with. */
  apiVersion?: string;
  /** The symbolic name of the resource as defined in the deployment template. */
  symbolicName?: string;
}

export function targetResourceDeserializer(item: any): TargetResource {
  return {
    id: item["id"],
    resourceName: item["resourceName"],
    resourceType: item["resourceType"],
    extension: !item["extension"]
      ? item["extension"]
      : deploymentExtensionDefinitionDeserializer(item["extension"]),
    identifiers: item["identifiers"],
    apiVersion: item["apiVersion"],
    symbolicName: item["symbolicName"],
  };
}

/** HTTP message. */
export interface HttpMessage {
  /** HTTP message content. */
  content?: any;
}

export function httpMessageDeserializer(item: any): HttpMessage {
  return {
    content: item["content"],
  };
}

/** List of deployment operations. */
export interface _DeploymentOperationsListResult {
  /** The DeploymentOperation items on this page */
  value: DeploymentOperation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deploymentOperationsListResultDeserializer(
  item: any,
): _DeploymentOperationsListResult {
  return {
    value: deploymentOperationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deploymentOperationArrayDeserializer(result: Array<DeploymentOperation>): any[] {
  return result.map((item) => {
    return deploymentOperationDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-04-01 API version. */
  V20250401 = "2025-04-01",
}

export function _whatIfOperationResultPropertiesDeserializer(item: any) {
  return {
    changes: !item["changes"] ? item["changes"] : whatIfChangeArrayDeserializer(item["changes"]),
    potentialChanges: !item["potentialChanges"]
      ? item["potentialChanges"]
      : whatIfChangeArrayDeserializer(item["potentialChanges"]),
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : deploymentDiagnosticsDefinitionArrayDeserializer(item["diagnostics"]),
  };
}

export type DeploymentsCheckExistenceResponse = { body: boolean };

export type DeploymentsCheckExistenceAtSubscriptionScopeResponse = { body: boolean };

export type DeploymentsCheckExistenceAtManagementGroupScopeResponse = { body: boolean };

export type DeploymentsCheckExistenceAtTenantScopeResponse = { body: boolean };

export type DeploymentsCheckExistenceAtScopeResponse = { body: boolean };
