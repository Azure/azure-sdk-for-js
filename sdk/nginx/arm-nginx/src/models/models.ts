// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

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

/** Nginx Deployment Api Key Response */
export interface NginxDeploymentApiKeyResponse extends ProxyResource {
  /** Nginx Deployment Api Key Response Properties */
  properties?: NginxDeploymentApiKeyResponseProperties;
}

export function nginxDeploymentApiKeyResponseDeserializer(
  item: any,
): NginxDeploymentApiKeyResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : nginxDeploymentApiKeyResponsePropertiesDeserializer(item["properties"]),
  };
}

/** Nginx Deployment Api Key Response Properties */
export interface NginxDeploymentApiKeyResponseProperties {
  /** The first three characters of the secret text to help identify it in use. This property is read-only. */
  readonly hint?: string;
  /** The time after which this Dataplane API Key is no longer valid. */
  endDateTime?: Date;
}

export function nginxDeploymentApiKeyResponsePropertiesDeserializer(
  item: any,
): NginxDeploymentApiKeyResponseProperties {
  return {
    hint: item["hint"],
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
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

/** Nginx Deployment Api Key Request */
export interface NginxDeploymentApiKeyRequest {
  readonly id?: string;
  readonly name?: string;
  readonly type?: string;
  /** Nginx Deployment Api Key Request Properties */
  properties?: NginxDeploymentApiKeyRequestProperties;
  /** Metadata pertaining to creation and last modification of the resource. */
  readonly systemData?: SystemData;
}

export function nginxDeploymentApiKeyRequestSerializer(item: NginxDeploymentApiKeyRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : nginxDeploymentApiKeyRequestPropertiesSerializer(item["properties"]),
  };
}

/** Nginx Deployment Api Key Request Properties */
export interface NginxDeploymentApiKeyRequestProperties {
  /** Secret text to be used as a Dataplane API Key. This is a write only property that can never be read back, but the first three characters will be returned in the 'hint' property. */
  secretText?: string;
  /** The time after which this Dataplane API Key is no longer valid. */
  endDateTime?: Date;
}

export function nginxDeploymentApiKeyRequestPropertiesSerializer(
  item: NginxDeploymentApiKeyRequestProperties,
): any {
  return {
    secretText: item["secretText"],
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : item["endDateTime"].toISOString(),
  };
}

/** Nginx Deployment Api Key List Response */
export interface _NginxDeploymentApiKeyListResponse {
  /** The NginxDeploymentApiKeyResponse items on this page */
  value: NginxDeploymentApiKeyResponse[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nginxDeploymentApiKeyListResponseDeserializer(
  item: any,
): _NginxDeploymentApiKeyListResponse {
  return {
    value: nginxDeploymentApiKeyResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function nginxDeploymentApiKeyResponseArrayDeserializer(
  result: Array<NginxDeploymentApiKeyResponse>,
): any[] {
  return result.map((item) => {
    return nginxDeploymentApiKeyResponseDeserializer(item);
  });
}

/** Nginx Deployment */
export interface NginxDeployment extends TrackedResource {
  /** Nginx Deployment Properties */
  properties?: NginxDeploymentProperties;
  /** Identity Properties */
  identity?: IdentityProperties;
  /** Resource Sku */
  sku?: ResourceSku;
}

export function nginxDeploymentSerializer(item: NginxDeployment): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : nginxDeploymentPropertiesSerializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : resourceSkuSerializer(item["sku"]),
  };
}

export function nginxDeploymentDeserializer(item: any): NginxDeployment {
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
      : nginxDeploymentPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : identityPropertiesDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : resourceSkuDeserializer(item["sku"]),
  };
}

/** Nginx Deployment Properties */
export interface NginxDeploymentProperties {
  /** Provisioning State */
  readonly provisioningState?: ProvisioningState;
  readonly nginxVersion?: string;
  /** Nginx Network Profile */
  networkProfile?: NginxNetworkProfile;
  /** The IP address of the deployment. */
  readonly ipAddress?: string;
  enableDiagnosticsSupport?: boolean;
  /** Nginx Logging */
  logging?: NginxLogging;
  /** Information on how the deployment will be scaled. */
  scalingProperties?: NginxDeploymentScalingProperties;
  /** Autoupgrade settings of a deployment. */
  autoUpgradeProfile?: AutoUpgradeProfile;
  /** Nginx Deployment User Profile */
  userProfile?: NginxDeploymentUserProfile;
  /** Settings for NGINX App Protect (NAP) */
  nginxAppProtect?: NginxDeploymentPropertiesNginxAppProtect;
  /** Dataplane API endpoint for the caller to update the NGINX state of the deployment. */
  readonly dataplaneApiEndpoint?: string;
}

export function nginxDeploymentPropertiesSerializer(item: NginxDeploymentProperties): any {
  return {
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : nginxNetworkProfileSerializer(item["networkProfile"]),
    enableDiagnosticsSupport: item["enableDiagnosticsSupport"],
    logging: !item["logging"] ? item["logging"] : nginxLoggingSerializer(item["logging"]),
    scalingProperties: !item["scalingProperties"]
      ? item["scalingProperties"]
      : nginxDeploymentScalingPropertiesSerializer(item["scalingProperties"]),
    autoUpgradeProfile: !item["autoUpgradeProfile"]
      ? item["autoUpgradeProfile"]
      : autoUpgradeProfileSerializer(item["autoUpgradeProfile"]),
    userProfile: !item["userProfile"]
      ? item["userProfile"]
      : nginxDeploymentUserProfileSerializer(item["userProfile"]),
    nginxAppProtect: !item["nginxAppProtect"]
      ? item["nginxAppProtect"]
      : nginxDeploymentPropertiesNginxAppProtectSerializer(item["nginxAppProtect"]),
  };
}

export function nginxDeploymentPropertiesDeserializer(item: any): NginxDeploymentProperties {
  return {
    provisioningState: item["provisioningState"],
    nginxVersion: item["nginxVersion"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : nginxNetworkProfileDeserializer(item["networkProfile"]),
    ipAddress: item["ipAddress"],
    enableDiagnosticsSupport: item["enableDiagnosticsSupport"],
    logging: !item["logging"] ? item["logging"] : nginxLoggingDeserializer(item["logging"]),
    scalingProperties: !item["scalingProperties"]
      ? item["scalingProperties"]
      : nginxDeploymentScalingPropertiesDeserializer(item["scalingProperties"]),
    autoUpgradeProfile: !item["autoUpgradeProfile"]
      ? item["autoUpgradeProfile"]
      : autoUpgradeProfileDeserializer(item["autoUpgradeProfile"]),
    userProfile: !item["userProfile"]
      ? item["userProfile"]
      : nginxDeploymentUserProfileDeserializer(item["userProfile"]),
    nginxAppProtect: !item["nginxAppProtect"]
      ? item["nginxAppProtect"]
      : nginxDeploymentPropertiesNginxAppProtectDeserializer(item["nginxAppProtect"]),
    dataplaneApiEndpoint: item["dataplaneApiEndpoint"],
  };
}

/** Provisioning State */
export enum KnownProvisioningState {
  /** Accepted */
  Accepted = "Accepted",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Deleted */
  Deleted = "Deleted",
  /** NotSpecified */
  NotSpecified = "NotSpecified",
}

/**
 * Provisioning State \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted** \
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Deleted** \
 * **NotSpecified**
 */
export type ProvisioningState = string;

/** Nginx Network Profile */
export interface NginxNetworkProfile {
  /** Nginx Frontend IP Configuration */
  frontEndIPConfiguration?: NginxFrontendIPConfiguration;
  /** Nginx Network Interface Configuration */
  networkInterfaceConfiguration?: NginxNetworkInterfaceConfiguration;
}

export function nginxNetworkProfileSerializer(item: NginxNetworkProfile): any {
  return {
    frontEndIPConfiguration: !item["frontEndIPConfiguration"]
      ? item["frontEndIPConfiguration"]
      : nginxFrontendIPConfigurationSerializer(item["frontEndIPConfiguration"]),
    networkInterfaceConfiguration: !item["networkInterfaceConfiguration"]
      ? item["networkInterfaceConfiguration"]
      : nginxNetworkInterfaceConfigurationSerializer(item["networkInterfaceConfiguration"]),
  };
}

export function nginxNetworkProfileDeserializer(item: any): NginxNetworkProfile {
  return {
    frontEndIPConfiguration: !item["frontEndIPConfiguration"]
      ? item["frontEndIPConfiguration"]
      : nginxFrontendIPConfigurationDeserializer(item["frontEndIPConfiguration"]),
    networkInterfaceConfiguration: !item["networkInterfaceConfiguration"]
      ? item["networkInterfaceConfiguration"]
      : nginxNetworkInterfaceConfigurationDeserializer(item["networkInterfaceConfiguration"]),
  };
}

/** Nginx Frontend IP Configuration */
export interface NginxFrontendIPConfiguration {
  publicIPAddresses?: NginxPublicIPAddress[];
  privateIPAddresses?: NginxPrivateIPAddress[];
}

export function nginxFrontendIPConfigurationSerializer(item: NginxFrontendIPConfiguration): any {
  return {
    publicIPAddresses: !item["publicIPAddresses"]
      ? item["publicIPAddresses"]
      : nginxPublicIPAddressArraySerializer(item["publicIPAddresses"]),
    privateIPAddresses: !item["privateIPAddresses"]
      ? item["privateIPAddresses"]
      : nginxPrivateIPAddressArraySerializer(item["privateIPAddresses"]),
  };
}

export function nginxFrontendIPConfigurationDeserializer(item: any): NginxFrontendIPConfiguration {
  return {
    publicIPAddresses: !item["publicIPAddresses"]
      ? item["publicIPAddresses"]
      : nginxPublicIPAddressArrayDeserializer(item["publicIPAddresses"]),
    privateIPAddresses: !item["privateIPAddresses"]
      ? item["privateIPAddresses"]
      : nginxPrivateIPAddressArrayDeserializer(item["privateIPAddresses"]),
  };
}

export function nginxPublicIPAddressArraySerializer(result: Array<NginxPublicIPAddress>): any[] {
  return result.map((item) => {
    return nginxPublicIPAddressSerializer(item);
  });
}

export function nginxPublicIPAddressArrayDeserializer(result: Array<NginxPublicIPAddress>): any[] {
  return result.map((item) => {
    return nginxPublicIPAddressDeserializer(item);
  });
}

/** Nginx Public IP Address */
export interface NginxPublicIPAddress {
  id?: string;
}

export function nginxPublicIPAddressSerializer(item: NginxPublicIPAddress): any {
  return { id: item["id"] };
}

export function nginxPublicIPAddressDeserializer(item: any): NginxPublicIPAddress {
  return {
    id: item["id"],
  };
}

export function nginxPrivateIPAddressArraySerializer(result: Array<NginxPrivateIPAddress>): any[] {
  return result.map((item) => {
    return nginxPrivateIPAddressSerializer(item);
  });
}

export function nginxPrivateIPAddressArrayDeserializer(
  result: Array<NginxPrivateIPAddress>,
): any[] {
  return result.map((item) => {
    return nginxPrivateIPAddressDeserializer(item);
  });
}

/** Nginx Private IP Address */
export interface NginxPrivateIPAddress {
  privateIPAddress?: string;
  /** Nginx Private IP Allocation Method */
  privateIPAllocationMethod?: NginxPrivateIPAllocationMethod;
  subnetId?: string;
}

export function nginxPrivateIPAddressSerializer(item: NginxPrivateIPAddress): any {
  return {
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    subnetId: item["subnetId"],
  };
}

export function nginxPrivateIPAddressDeserializer(item: any): NginxPrivateIPAddress {
  return {
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    subnetId: item["subnetId"],
  };
}

/** Nginx Private IP Allocation Method */
export enum KnownNginxPrivateIPAllocationMethod {
  /** Static */
  Static = "Static",
  /** Dynamic */
  Dynamic = "Dynamic",
}

/**
 * Nginx Private IP Allocation Method \
 * {@link KnownNginxPrivateIPAllocationMethod} can be used interchangeably with NginxPrivateIPAllocationMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Static** \
 * **Dynamic**
 */
export type NginxPrivateIPAllocationMethod = string;

/** Nginx Network Interface Configuration */
export interface NginxNetworkInterfaceConfiguration {
  subnetId?: string;
}

export function nginxNetworkInterfaceConfigurationSerializer(
  item: NginxNetworkInterfaceConfiguration,
): any {
  return { subnetId: item["subnetId"] };
}

export function nginxNetworkInterfaceConfigurationDeserializer(
  item: any,
): NginxNetworkInterfaceConfiguration {
  return {
    subnetId: item["subnetId"],
  };
}

/** Nginx Logging */
export interface NginxLogging {
  /** Nginx Storage Account */
  storageAccount?: NginxStorageAccount;
}

export function nginxLoggingSerializer(item: NginxLogging): any {
  return {
    storageAccount: !item["storageAccount"]
      ? item["storageAccount"]
      : nginxStorageAccountSerializer(item["storageAccount"]),
  };
}

export function nginxLoggingDeserializer(item: any): NginxLogging {
  return {
    storageAccount: !item["storageAccount"]
      ? item["storageAccount"]
      : nginxStorageAccountDeserializer(item["storageAccount"]),
  };
}

/** Nginx Storage Account */
export interface NginxStorageAccount {
  accountName?: string;
  containerName?: string;
}

export function nginxStorageAccountSerializer(item: NginxStorageAccount): any {
  return { accountName: item["accountName"], containerName: item["containerName"] };
}

export function nginxStorageAccountDeserializer(item: any): NginxStorageAccount {
  return {
    accountName: item["accountName"],
    containerName: item["containerName"],
  };
}

/** Information on how the deployment will be scaled. */
export interface NginxDeploymentScalingProperties {
  capacity?: number;
  profiles?: ScaleProfile[];
}

export function nginxDeploymentScalingPropertiesSerializer(
  item: NginxDeploymentScalingProperties,
): any {
  return {
    capacity: item["capacity"],
    autoScaleSettings: areAllPropsUndefined(item, ["profiles"])
      ? undefined
      : _nginxDeploymentScalingPropertiesAutoScaleSettingsSerializer(item),
  };
}

export function nginxDeploymentScalingPropertiesDeserializer(
  item: any,
): NginxDeploymentScalingProperties {
  return {
    capacity: item["capacity"],
    ...(!item["autoScaleSettings"]
      ? item["autoScaleSettings"]
      : _nginxDeploymentScalingPropertiesAutoScaleSettingsDeserializer(item["autoScaleSettings"])),
  };
}

/** The settings for enabling automatic scaling of the deployment. If this field is specified, 'scale.capacity' must be empty. */
export interface NginxDeploymentScalingPropertiesAutoScaleSettings {
  profiles: ScaleProfile[];
}

export function nginxDeploymentScalingPropertiesAutoScaleSettingsSerializer(
  item: NginxDeploymentScalingPropertiesAutoScaleSettings,
): any {
  return { profiles: scaleProfileArraySerializer(item["profiles"]) };
}

export function nginxDeploymentScalingPropertiesAutoScaleSettingsDeserializer(
  item: any,
): NginxDeploymentScalingPropertiesAutoScaleSettings {
  return {
    profiles: scaleProfileArrayDeserializer(item["profiles"]),
  };
}

export function scaleProfileArraySerializer(result: Array<ScaleProfile>): any[] {
  return result.map((item) => {
    return scaleProfileSerializer(item);
  });
}

export function scaleProfileArrayDeserializer(result: Array<ScaleProfile>): any[] {
  return result.map((item) => {
    return scaleProfileDeserializer(item);
  });
}

/** The autoscale profile. */
export interface ScaleProfile {
  name: string;
  /** The capacity parameters of the profile. */
  capacity: ScaleProfileCapacity;
}

export function scaleProfileSerializer(item: ScaleProfile): any {
  return { name: item["name"], capacity: scaleProfileCapacitySerializer(item["capacity"]) };
}

export function scaleProfileDeserializer(item: any): ScaleProfile {
  return {
    name: item["name"],
    capacity: scaleProfileCapacityDeserializer(item["capacity"]),
  };
}

/** The capacity parameters of the profile. */
export interface ScaleProfileCapacity {
  /** The minimum number of NCUs the deployment can be autoscaled to. */
  min: number;
  /** The maximum number of NCUs the deployment can be autoscaled to. */
  max: number;
}

export function scaleProfileCapacitySerializer(item: ScaleProfileCapacity): any {
  return { min: item["min"], max: item["max"] };
}

export function scaleProfileCapacityDeserializer(item: any): ScaleProfileCapacity {
  return {
    min: item["min"],
    max: item["max"],
  };
}

/** Autoupgrade settings of a deployment. */
export interface AutoUpgradeProfile {
  /** Channel used for autoupgrade. */
  upgradeChannel: string;
}

export function autoUpgradeProfileSerializer(item: AutoUpgradeProfile): any {
  return { upgradeChannel: item["upgradeChannel"] };
}

export function autoUpgradeProfileDeserializer(item: any): AutoUpgradeProfile {
  return {
    upgradeChannel: item["upgradeChannel"],
  };
}

/** Nginx Deployment User Profile */
export interface NginxDeploymentUserProfile {
  /** The preferred support contact email address of the user used for sending alerts and notification. Can be an empty string or a valid email address. */
  preferredEmail?: string;
}

export function nginxDeploymentUserProfileSerializer(item: NginxDeploymentUserProfile): any {
  return { preferredEmail: item["preferredEmail"] };
}

export function nginxDeploymentUserProfileDeserializer(item: any): NginxDeploymentUserProfile {
  return {
    preferredEmail: item["preferredEmail"],
  };
}

/** Settings for NGINX App Protect (NAP) */
export interface NginxDeploymentPropertiesNginxAppProtect {
  /** Settings for the NGINX App Protect Web Application Firewall (WAF) */
  webApplicationFirewallSettings: WebApplicationFirewallSettings;
  /** The status of the NGINX App Protect Web Application Firewall */
  readonly webApplicationFirewallStatus?: WebApplicationFirewallStatus;
}

export function nginxDeploymentPropertiesNginxAppProtectSerializer(
  item: NginxDeploymentPropertiesNginxAppProtect,
): any {
  return {
    webApplicationFirewallSettings: webApplicationFirewallSettingsSerializer(
      item["webApplicationFirewallSettings"],
    ),
  };
}

export function nginxDeploymentPropertiesNginxAppProtectDeserializer(
  item: any,
): NginxDeploymentPropertiesNginxAppProtect {
  return {
    webApplicationFirewallSettings: webApplicationFirewallSettingsDeserializer(
      item["webApplicationFirewallSettings"],
    ),
    webApplicationFirewallStatus: !item["webApplicationFirewallStatus"]
      ? item["webApplicationFirewallStatus"]
      : webApplicationFirewallStatusDeserializer(item["webApplicationFirewallStatus"]),
  };
}

/** Settings for the NGINX App Protect Web Application Firewall (WAF) */
export interface WebApplicationFirewallSettings {
  /** The activation state of the WAF. Use 'Enabled' to enable the WAF and 'Disabled' to disable it. */
  activationState?: ActivationState;
}

export function webApplicationFirewallSettingsSerializer(
  item: WebApplicationFirewallSettings,
): any {
  return { activationState: item["activationState"] };
}

export function webApplicationFirewallSettingsDeserializer(
  item: any,
): WebApplicationFirewallSettings {
  return {
    activationState: item["activationState"],
  };
}

/** The activation state of the WAF. Use 'Enabled' to enable the WAF and 'Disabled' to disable it. */
export enum KnownActivationState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The activation state of the WAF. Use 'Enabled' to enable the WAF and 'Disabled' to disable it. \
 * {@link KnownActivationState} can be used interchangeably with ActivationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type ActivationState = string;

/** The status of the NGINX App Protect Web Application Firewall */
export interface WebApplicationFirewallStatus {
  /** NGINX App Protect WAF release version */
  wafRelease?: string;
  /** Package containing attack signatures for the NGINX App Protect Web Application Firewall (WAF). */
  readonly attackSignaturesPackage?: WebApplicationFirewallPackage;
  /** Package containing bot signatures for the NGINX App Protect Web Application Firewall (WAF). */
  readonly botSignaturesPackage?: WebApplicationFirewallPackage;
  /** Package containing threat campaigns for the NGINX App Protect Web Application Firewall (WAF). */
  readonly threatCampaignsPackage?: WebApplicationFirewallPackage;
  /** Versions of the NGINX App Protect Web Application Firewall (WAF) components. */
  readonly componentVersions?: WebApplicationFirewallComponentVersions;
}

export function webApplicationFirewallStatusDeserializer(item: any): WebApplicationFirewallStatus {
  return {
    wafRelease: item["wafRelease"],
    attackSignaturesPackage: !item["attackSignaturesPackage"]
      ? item["attackSignaturesPackage"]
      : webApplicationFirewallPackageDeserializer(item["attackSignaturesPackage"]),
    botSignaturesPackage: !item["botSignaturesPackage"]
      ? item["botSignaturesPackage"]
      : webApplicationFirewallPackageDeserializer(item["botSignaturesPackage"]),
    threatCampaignsPackage: !item["threatCampaignsPackage"]
      ? item["threatCampaignsPackage"]
      : webApplicationFirewallPackageDeserializer(item["threatCampaignsPackage"]),
    componentVersions: !item["componentVersions"]
      ? item["componentVersions"]
      : webApplicationFirewallComponentVersionsDeserializer(item["componentVersions"]),
  };
}

/** NGINX App Protect Web Application Firewall (WAF) Package. Contains the version and revision date of the package. */
export interface WebApplicationFirewallPackage {
  /** The version of the NGINX App Protect Web Application Firewall (WAF) package. */
  version: string;
  /** The date and time of the package revision. */
  revisionDatetime: Date;
}

export function webApplicationFirewallPackageDeserializer(
  item: any,
): WebApplicationFirewallPackage {
  return {
    version: item["version"],
    revisionDatetime: new Date(item["revisionDatetime"]),
  };
}

/** Versions of the NGINX App Protect Web Application Firewall (WAF) components. */
export interface WebApplicationFirewallComponentVersions {
  /** The version of the NGINX App Protect Web Application Firewall (WAF) engine. */
  wafEngineVersion: string;
  /** The version of the NGINX App Protect Web Application Firewall (WAF) module for NGINX. */
  wafNginxVersion: string;
}

export function webApplicationFirewallComponentVersionsDeserializer(
  item: any,
): WebApplicationFirewallComponentVersions {
  return {
    wafEngineVersion: item["wafEngineVersion"],
    wafNginxVersion: item["wafNginxVersion"],
  };
}

/** Identity Properties */
export interface IdentityProperties {
  readonly principalId?: string;
  readonly tenantId?: string;
  /** Identity Type */
  type?: IdentityType;
  /** Dictionary of <UserIdentityProperties> */
  userAssignedIdentities?: Record<string, UserIdentityProperties>;
}

export function identityPropertiesSerializer(item: IdentityProperties): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityPropertiesRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityPropertiesDeserializer(item: any): IdentityProperties {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityPropertiesRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Identity Type */
export enum KnownIdentityType {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** SystemAssigned, UserAssigned */
  SystemAssignedUserAssigned = "SystemAssigned, UserAssigned",
  /** None */
  None = "None",
}

/**
 * Identity Type \
 * {@link KnownIdentityType} can be used interchangeably with IdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned** \
 * **UserAssigned** \
 * **SystemAssigned, UserAssigned** \
 * **None**
 */
export type IdentityType = string;

export function userIdentityPropertiesRecordSerializer(
  item: Record<string, UserIdentityProperties>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentityPropertiesSerializer(item[key]);
  });
  return result;
}

export function userIdentityPropertiesRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserIdentityProperties> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentityPropertiesDeserializer(item[key]);
  });
  return result;
}

/** User Identity Properties */
export interface UserIdentityProperties {
  readonly principalId?: string;
  readonly clientId?: string;
}

export function userIdentityPropertiesSerializer(item: UserIdentityProperties): any {
  return item;
}

export function userIdentityPropertiesDeserializer(item: any): UserIdentityProperties {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Resource Sku */
export interface ResourceSku {
  /** Name of the SKU. */
  name: string;
}

export function resourceSkuSerializer(item: ResourceSku): any {
  return { name: item["name"] };
}

export function resourceSkuDeserializer(item: any): ResourceSku {
  return {
    name: item["name"],
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

/** Nginx Deployment Update Parameters */
export interface NginxDeploymentUpdateParameters {
  /** Identity Properties */
  identity?: IdentityProperties;
  /** Dictionary of <string> */
  tags?: Record<string, string>;
  /** Resource Sku */
  sku?: ResourceSku;
  /** The geo-location where the resource lives */
  location?: string;
  /** Nginx Deployment Update Properties */
  properties?: NginxDeploymentUpdateProperties;
}

export function nginxDeploymentUpdateParametersSerializer(
  item: NginxDeploymentUpdateParameters,
): any {
  return {
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : resourceSkuSerializer(item["sku"]),
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : nginxDeploymentUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Nginx Deployment Update Properties */
export interface NginxDeploymentUpdateProperties {
  enableDiagnosticsSupport?: boolean;
  /** Nginx Logging */
  logging?: NginxLogging;
  /** Information on how the deployment will be scaled. */
  scalingProperties?: NginxDeploymentScalingProperties;
  /** Nginx Deployment User Profile */
  userProfile?: NginxDeploymentUserProfile;
  /** Nginx Network Profile */
  networkProfile?: NginxNetworkProfile;
  /** Autoupgrade settings of a deployment. */
  autoUpgradeProfile?: AutoUpgradeProfile;
  /** Settings for the NGINX App Protect Web Application Firewall (WAF) */
  webApplicationFirewallSettings?: WebApplicationFirewallSettings;
}

export function nginxDeploymentUpdatePropertiesSerializer(
  item: NginxDeploymentUpdateProperties,
): any {
  return {
    enableDiagnosticsSupport: item["enableDiagnosticsSupport"],
    logging: !item["logging"] ? item["logging"] : nginxLoggingSerializer(item["logging"]),
    scalingProperties: !item["scalingProperties"]
      ? item["scalingProperties"]
      : nginxDeploymentScalingPropertiesSerializer(item["scalingProperties"]),
    userProfile: !item["userProfile"]
      ? item["userProfile"]
      : nginxDeploymentUserProfileSerializer(item["userProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : nginxNetworkProfileSerializer(item["networkProfile"]),
    autoUpgradeProfile: !item["autoUpgradeProfile"]
      ? item["autoUpgradeProfile"]
      : autoUpgradeProfileSerializer(item["autoUpgradeProfile"]),
    nginxAppProtect: areAllPropsUndefined(item, ["webApplicationFirewallSettings"])
      ? undefined
      : _nginxDeploymentUpdatePropertiesNginxAppProtectSerializer(item),
  };
}

/** Update settings for NGINX App Protect (NAP) */
export interface NginxDeploymentUpdatePropertiesNginxAppProtect {
  /** Settings for the NGINX App Protect Web Application Firewall (WAF) */
  webApplicationFirewallSettings?: WebApplicationFirewallSettings;
}

export function nginxDeploymentUpdatePropertiesNginxAppProtectSerializer(
  item: NginxDeploymentUpdatePropertiesNginxAppProtect,
): any {
  return {
    webApplicationFirewallSettings: !item["webApplicationFirewallSettings"]
      ? item["webApplicationFirewallSettings"]
      : webApplicationFirewallSettingsSerializer(item["webApplicationFirewallSettings"]),
  };
}

/** Nginx Deployment List Response */
export interface _NginxDeploymentListResponse {
  /** The NginxDeployment items on this page */
  value: NginxDeployment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nginxDeploymentListResponseDeserializer(item: any): _NginxDeploymentListResponse {
  return {
    value: nginxDeploymentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function nginxDeploymentArraySerializer(result: Array<NginxDeployment>): any[] {
  return result.map((item) => {
    return nginxDeploymentSerializer(item);
  });
}

export function nginxDeploymentArrayDeserializer(result: Array<NginxDeployment>): any[] {
  return result.map((item) => {
    return nginxDeploymentDeserializer(item);
  });
}

/** Nginx Deployment Waf Policy List Response */
export interface _NginxDeploymentWafPolicyListResponse {
  /** The NginxDeploymentWafPolicyMetadata items on this page */
  value: NginxDeploymentWafPolicyMetadata[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nginxDeploymentWafPolicyListResponseDeserializer(
  item: any,
): _NginxDeploymentWafPolicyListResponse {
  return {
    value: nginxDeploymentWafPolicyMetadataArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function nginxDeploymentWafPolicyMetadataArrayDeserializer(
  result: Array<NginxDeploymentWafPolicyMetadata>,
): any[] {
  return result.map((item) => {
    return nginxDeploymentWafPolicyMetadataDeserializer(item);
  });
}

/** Nginx Deployment Waf Policy Metadata */
export interface NginxDeploymentWafPolicyMetadata {
  readonly id?: string;
  readonly name?: string;
  readonly type?: string;
  /** Nginx Deployment Waf Policy Metadata Properties */
  properties?: NginxDeploymentWafPolicyMetadataProperties;
  /** Metadata pertaining to creation and last modification of the resource. */
  readonly systemData?: SystemData;
}

export function nginxDeploymentWafPolicyMetadataDeserializer(
  item: any,
): NginxDeploymentWafPolicyMetadata {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : nginxDeploymentWafPolicyMetadataPropertiesDeserializer(item["properties"]),
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Nginx Deployment Waf Policy Metadata Properties */
export interface NginxDeploymentWafPolicyMetadataProperties {
  readonly filepath?: string;
  /** Provisioning State */
  readonly provisioningState?: ProvisioningState;
  /** Nginx Deployment Waf Policy Compiling Status */
  readonly compilingState?: NginxDeploymentWafPolicyCompilingStatus;
  /** Nginx Deployment Waf Policy Applying Status */
  readonly applyingState?: NginxDeploymentWafPolicyApplyingStatus;
}

export function nginxDeploymentWafPolicyMetadataPropertiesDeserializer(
  item: any,
): NginxDeploymentWafPolicyMetadataProperties {
  return {
    filepath: item["filepath"],
    provisioningState: item["provisioningState"],
    compilingState: !item["compilingState"]
      ? item["compilingState"]
      : nginxDeploymentWafPolicyCompilingStatusDeserializer(item["compilingState"]),
    applyingState: !item["applyingState"]
      ? item["applyingState"]
      : nginxDeploymentWafPolicyApplyingStatusDeserializer(item["applyingState"]),
  };
}

/** Nginx Deployment Waf Policy Compiling Status */
export interface NginxDeploymentWafPolicyCompilingStatus {
  /** Machine readable code indicating the compilation status of a WAF Policy. */
  readonly code?: NginxDeploymentWafPolicyCompilingStatusCode;
  /** A readable string of the current status, and sometimes have the reason for the current state. If the CompilingStatus is Failed the Display Status will be The waf Policy failed to compile. */
  readonly displayStatus?: string;
  /** The date and time the policy was compiled in UTC. */
  readonly time?: string;
}

export function nginxDeploymentWafPolicyCompilingStatusDeserializer(
  item: any,
): NginxDeploymentWafPolicyCompilingStatus {
  return {
    code: item["code"],
    displayStatus: item["displayStatus"],
    time: item["time"],
  };
}

/** Machine readable code indicating the compilation status of a WAF Policy. */
export enum KnownNginxDeploymentWafPolicyCompilingStatusCode {
  /** The compilation of the custom waf policy has not started */
  NotStarted = "NotStarted",
  /** The compilation of the custom waf policy is in progress */
  InProgress = "InProgress",
  /** The compilation of the custom waf policy is completed successfully and can now be referenced in the nginx config. */
  Succeeded = "Succeeded",
  /** The compilation of the custom waf policy failed. */
  Failed = "Failed",
}

/**
 * Machine readable code indicating the compilation status of a WAF Policy. \
 * {@link KnownNginxDeploymentWafPolicyCompilingStatusCode} can be used interchangeably with NginxDeploymentWafPolicyCompilingStatusCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: The compilation of the custom waf policy has not started \
 * **InProgress**: The compilation of the custom waf policy is in progress \
 * **Succeeded**: The compilation of the custom waf policy is completed successfully and can now be referenced in the nginx config. \
 * **Failed**: The compilation of the custom waf policy failed.
 */
export type NginxDeploymentWafPolicyCompilingStatusCode = string;

/** Nginx Deployment Waf Policy Applying Status */
export interface NginxDeploymentWafPolicyApplyingStatus {
  /** Machine readable code indicating the applying status code of a WAF Policy. */
  readonly code?: NginxDeploymentWafPolicyApplyingStatusCode;
  /** A readable string of the current status, and sometimes have the reason for the current state. */
  readonly displayStatus?: string;
  /** The date and time in UTC the current applying status was set. */
  readonly time?: string;
}

export function nginxDeploymentWafPolicyApplyingStatusDeserializer(
  item: any,
): NginxDeploymentWafPolicyApplyingStatus {
  return {
    code: item["code"],
    displayStatus: item["displayStatus"],
    time: item["time"],
  };
}

/** Machine readable code indicating the applying status code of a WAF Policy. */
export enum KnownNginxDeploymentWafPolicyApplyingStatusCode {
  /** The policy is not referenced in the nginx config and not applied. */
  NotApplied = "NotApplied",
  /** The policy is referenced in the nginx config and is applying. */
  Applying = "Applying",
  /** The policy is referenced in the nginx config and that config has been successfully applied. */
  Succeeded = "Succeeded",
  /** The policy is referenced in the nginx config and that config failed to apply. */
  Failed = "Failed",
  /** The policy is now not referenced in the nginx config and its being removed from the applied nginx config. */
  Removing = "Removing",
}

/**
 * Machine readable code indicating the applying status code of a WAF Policy. \
 * {@link KnownNginxDeploymentWafPolicyApplyingStatusCode} can be used interchangeably with NginxDeploymentWafPolicyApplyingStatusCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotApplied**: The policy is not referenced in the nginx config and not applied. \
 * **Applying**: The policy is referenced in the nginx config and is applying. \
 * **Succeeded**: The policy is referenced in the nginx config and that config has been successfully applied. \
 * **Failed**: The policy is referenced in the nginx config and that config failed to apply. \
 * **Removing**: The policy is now not referenced in the nginx config and its being removed from the applied nginx config.
 */
export type NginxDeploymentWafPolicyApplyingStatusCode = string;

/** Nginx Deployment Waf Policy */
export interface NginxDeploymentWafPolicy extends ProxyResource {
  /** Nginx Deployment Waf Policy Properties */
  properties?: NginxDeploymentWafPolicyProperties;
}

export function nginxDeploymentWafPolicySerializer(item: NginxDeploymentWafPolicy): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : nginxDeploymentWafPolicyPropertiesSerializer(item["properties"]),
  };
}

export function nginxDeploymentWafPolicyDeserializer(item: any): NginxDeploymentWafPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : nginxDeploymentWafPolicyPropertiesDeserializer(item["properties"]),
  };
}

/** Nginx Deployment Waf Policy Properties */
export interface NginxDeploymentWafPolicyProperties {
  /** Provisioning State */
  readonly provisioningState?: ProvisioningState;
  /** The byte content of the Policy */
  content?: Uint8Array;
  /** The file path where the Policy is to be saved */
  filepath?: string;
  /** Nginx Deployment Waf Policy Compiling Status */
  readonly compilingState?: NginxDeploymentWafPolicyCompilingStatus;
  /** Nginx Deployment Waf Policy Applying Status */
  readonly applyingState?: NginxDeploymentWafPolicyApplyingStatus;
}

export function nginxDeploymentWafPolicyPropertiesSerializer(
  item: NginxDeploymentWafPolicyProperties,
): any {
  return {
    content: !item["content"] ? item["content"] : uint8ArrayToString(item["content"], "base64"),
    filepath: item["filepath"],
  };
}

export function nginxDeploymentWafPolicyPropertiesDeserializer(
  item: any,
): NginxDeploymentWafPolicyProperties {
  return {
    provisioningState: item["provisioningState"],
    content: !item["content"]
      ? item["content"]
      : typeof item["content"] === "string"
        ? stringToUint8Array(item["content"], "base64")
        : item["content"],
    filepath: item["filepath"],
    compilingState: !item["compilingState"]
      ? item["compilingState"]
      : nginxDeploymentWafPolicyCompilingStatusDeserializer(item["compilingState"]),
    applyingState: !item["applyingState"]
      ? item["applyingState"]
      : nginxDeploymentWafPolicyApplyingStatusDeserializer(item["applyingState"]),
  };
}

/** Nginx Deployment Default Waf Policy List Response */
export interface NginxDeploymentDefaultWafPolicyListResponse {
  value?: NginxDeploymentDefaultWafPolicyProperties[];
  nextLink?: string;
}

export function nginxDeploymentDefaultWafPolicyListResponseDeserializer(
  item: any,
): NginxDeploymentDefaultWafPolicyListResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : nginxDeploymentDefaultWafPolicyPropertiesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function nginxDeploymentDefaultWafPolicyPropertiesArrayDeserializer(
  result: Array<NginxDeploymentDefaultWafPolicyProperties>,
): any[] {
  return result.map((item) => {
    return nginxDeploymentDefaultWafPolicyPropertiesDeserializer(item);
  });
}

/** Nginx Deployment Default Waf Policy Properties */
export interface NginxDeploymentDefaultWafPolicyProperties {
  readonly content?: Uint8Array;
  readonly filepath?: string;
}

export function nginxDeploymentDefaultWafPolicyPropertiesDeserializer(
  item: any,
): NginxDeploymentDefaultWafPolicyProperties {
  return {
    content: !item["content"]
      ? item["content"]
      : typeof item["content"] === "string"
        ? stringToUint8Array(item["content"], "base64")
        : item["content"],
    filepath: item["filepath"],
  };
}

/** Nginx Certificate */
export interface NginxCertificate extends ProxyResource {
  /** Nginx Certificate Properties */
  properties?: NginxCertificateProperties;
  /** The geo-location where the resource lives */
  location?: string;
}

export function nginxCertificateSerializer(item: NginxCertificate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : nginxCertificatePropertiesSerializer(item["properties"]),
    location: item["location"],
  };
}

export function nginxCertificateDeserializer(item: any): NginxCertificate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : nginxCertificatePropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Nginx Certificate Properties */
export interface NginxCertificateProperties {
  /** Provisioning State */
  readonly provisioningState?: ProvisioningState;
  keyVirtualPath?: string;
  certificateVirtualPath?: string;
  keyVaultSecretId?: string;
  readonly sha1Thumbprint?: string;
  readonly keyVaultSecretVersion?: string;
  readonly keyVaultSecretCreated?: Date;
  /** Nginx Certificate Error Response Body */
  certificateError?: NginxCertificateErrorResponseBody;
}

export function nginxCertificatePropertiesSerializer(item: NginxCertificateProperties): any {
  return {
    keyVirtualPath: item["keyVirtualPath"],
    certificateVirtualPath: item["certificateVirtualPath"],
    keyVaultSecretId: item["keyVaultSecretId"],
    certificateError: !item["certificateError"]
      ? item["certificateError"]
      : nginxCertificateErrorResponseBodySerializer(item["certificateError"]),
  };
}

export function nginxCertificatePropertiesDeserializer(item: any): NginxCertificateProperties {
  return {
    provisioningState: item["provisioningState"],
    keyVirtualPath: item["keyVirtualPath"],
    certificateVirtualPath: item["certificateVirtualPath"],
    keyVaultSecretId: item["keyVaultSecretId"],
    sha1Thumbprint: item["sha1Thumbprint"],
    keyVaultSecretVersion: item["keyVaultSecretVersion"],
    keyVaultSecretCreated: !item["keyVaultSecretCreated"]
      ? item["keyVaultSecretCreated"]
      : new Date(item["keyVaultSecretCreated"]),
    certificateError: !item["certificateError"]
      ? item["certificateError"]
      : nginxCertificateErrorResponseBodyDeserializer(item["certificateError"]),
  };
}

/** Nginx Certificate Error Response Body */
export interface NginxCertificateErrorResponseBody {
  code?: string;
  message?: string;
}

export function nginxCertificateErrorResponseBodySerializer(
  item: NginxCertificateErrorResponseBody,
): any {
  return { code: item["code"], message: item["message"] };
}

export function nginxCertificateErrorResponseBodyDeserializer(
  item: any,
): NginxCertificateErrorResponseBody {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Nginx Certificate List Response */
export interface _NginxCertificateListResponse {
  /** The NginxCertificate items on this page */
  value: NginxCertificate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nginxCertificateListResponseDeserializer(
  item: any,
): _NginxCertificateListResponse {
  return {
    value: nginxCertificateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function nginxCertificateArraySerializer(result: Array<NginxCertificate>): any[] {
  return result.map((item) => {
    return nginxCertificateSerializer(item);
  });
}

export function nginxCertificateArrayDeserializer(result: Array<NginxCertificate>): any[] {
  return result.map((item) => {
    return nginxCertificateDeserializer(item);
  });
}

/** Nginx Configuration Response */
export interface NginxConfiguration extends ProxyResource {
  /** Nginx Configuration Response Properties */
  properties?: NginxConfigurationProperties;
}

export function nginxConfigurationDeserializer(item: any): NginxConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : nginxConfigurationPropertiesDeserializer(item["properties"]),
  };
}

/** Nginx Configuration Response Properties */
export interface NginxConfigurationProperties {
  /** Provisioning State */
  readonly provisioningState?: ProvisioningState;
  files?: NginxConfigurationFile[];
  protectedFiles?: NginxConfigurationProtectedFileResponse[];
  /** Nginx Configuration Package */
  package?: NginxConfigurationPackage;
  rootFile?: string;
}

export function nginxConfigurationPropertiesDeserializer(item: any): NginxConfigurationProperties {
  return {
    provisioningState: item["provisioningState"],
    files: !item["files"] ? item["files"] : nginxConfigurationFileArrayDeserializer(item["files"]),
    protectedFiles: !item["protectedFiles"]
      ? item["protectedFiles"]
      : nginxConfigurationProtectedFileResponseArrayDeserializer(item["protectedFiles"]),
    package: !item["package"]
      ? item["package"]
      : nginxConfigurationPackageDeserializer(item["package"]),
    rootFile: item["rootFile"],
  };
}

export function nginxConfigurationFileArraySerializer(
  result: Array<NginxConfigurationFile>,
): any[] {
  return result.map((item) => {
    return nginxConfigurationFileSerializer(item);
  });
}

export function nginxConfigurationFileArrayDeserializer(
  result: Array<NginxConfigurationFile>,
): any[] {
  return result.map((item) => {
    return nginxConfigurationFileDeserializer(item);
  });
}

/** Nginx Configuration File */
export interface NginxConfigurationFile {
  content?: string;
  virtualPath?: string;
}

export function nginxConfigurationFileSerializer(item: NginxConfigurationFile): any {
  return { content: item["content"], virtualPath: item["virtualPath"] };
}

export function nginxConfigurationFileDeserializer(item: any): NginxConfigurationFile {
  return {
    content: item["content"],
    virtualPath: item["virtualPath"],
  };
}

export function nginxConfigurationProtectedFileResponseArrayDeserializer(
  result: Array<NginxConfigurationProtectedFileResponse>,
): any[] {
  return result.map((item) => {
    return nginxConfigurationProtectedFileResponseDeserializer(item);
  });
}

/** Nginx Configuration Protected File Response */
export interface NginxConfigurationProtectedFileResponse {
  /** The virtual path of the protected file. */
  virtualPath?: string;
  /** The hash of the content of the file. This value is used to determine if the file has changed. */
  contentHash?: string;
}

export function nginxConfigurationProtectedFileResponseDeserializer(
  item: any,
): NginxConfigurationProtectedFileResponse {
  return {
    virtualPath: item["virtualPath"],
    contentHash: item["contentHash"],
  };
}

/** Nginx Configuration Package */
export interface NginxConfigurationPackage {
  data?: string;
  protectedFiles?: string[];
}

export function nginxConfigurationPackageSerializer(item: NginxConfigurationPackage): any {
  return {
    data: item["data"],
    protectedFiles: !item["protectedFiles"]
      ? item["protectedFiles"]
      : item["protectedFiles"].map((p: any) => {
          return p;
        }),
  };
}

export function nginxConfigurationPackageDeserializer(item: any): NginxConfigurationPackage {
  return {
    data: item["data"],
    protectedFiles: !item["protectedFiles"]
      ? item["protectedFiles"]
      : item["protectedFiles"].map((p: any) => {
          return p;
        }),
  };
}

/** Nginx Configuration Request */
export interface NginxConfigurationRequest {
  readonly id?: string;
  readonly name?: string;
  readonly type?: string;
  /** Nginx Configuration Request Properties */
  properties?: NginxConfigurationRequestProperties;
  /** Metadata pertaining to creation and last modification of the resource. */
  readonly systemData?: SystemData;
}

export function nginxConfigurationRequestSerializer(item: NginxConfigurationRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : nginxConfigurationRequestPropertiesSerializer(item["properties"]),
  };
}

/** Nginx Configuration Request Properties */
export interface NginxConfigurationRequestProperties {
  /** Provisioning State */
  readonly provisioningState?: ProvisioningState;
  files?: NginxConfigurationFile[];
  protectedFiles?: NginxConfigurationProtectedFileRequest[];
  /** Nginx Configuration Package */
  package?: NginxConfigurationPackage;
  rootFile?: string;
}

export function nginxConfigurationRequestPropertiesSerializer(
  item: NginxConfigurationRequestProperties,
): any {
  return {
    files: !item["files"] ? item["files"] : nginxConfigurationFileArraySerializer(item["files"]),
    protectedFiles: !item["protectedFiles"]
      ? item["protectedFiles"]
      : nginxConfigurationProtectedFileRequestArraySerializer(item["protectedFiles"]),
    package: !item["package"]
      ? item["package"]
      : nginxConfigurationPackageSerializer(item["package"]),
    rootFile: item["rootFile"],
  };
}

export function nginxConfigurationProtectedFileRequestArraySerializer(
  result: Array<NginxConfigurationProtectedFileRequest>,
): any[] {
  return result.map((item) => {
    return nginxConfigurationProtectedFileRequestSerializer(item);
  });
}

/** Nginx Configuration Protected File Request */
export interface NginxConfigurationProtectedFileRequest {
  /** The content of the protected file. This value is a PUT only value. If you perform a GET request on this value, it will be empty because it is a protected file. */
  content?: string;
  /** The virtual path of the protected file. */
  virtualPath?: string;
  /** The hash of the content of the file. This value is used to determine if the file has changed. */
  contentHash?: string;
}

export function nginxConfigurationProtectedFileRequestSerializer(
  item: NginxConfigurationProtectedFileRequest,
): any {
  return {
    content: item["content"],
    virtualPath: item["virtualPath"],
    contentHash: item["contentHash"],
  };
}

/** Response of a list operation. */
export interface _NginxConfigurationListResponse {
  /** The NginxConfigurationResponse items on this page */
  value: NginxConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nginxConfigurationListResponseDeserializer(
  item: any,
): _NginxConfigurationListResponse {
  return {
    value: nginxConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function nginxConfigurationArrayDeserializer(result: Array<NginxConfiguration>): any[] {
  return result.map((item) => {
    return nginxConfigurationDeserializer(item);
  });
}

/** The request body for creating an analysis for an NGINX configuration. */
export interface AnalysisCreate {
  config: AnalysisCreateConfig;
}

export function analysisCreateSerializer(item: AnalysisCreate): any {
  return { config: analysisCreateConfigSerializer(item["config"]) };
}

/** model interface AnalysisCreateConfig */
export interface AnalysisCreateConfig {
  /** The root file of the NGINX config file(s). It must match one of the files' filepath. */
  rootFile?: string;
  files?: NginxConfigurationFile[];
  protectedFiles?: NginxConfigurationProtectedFileRequest[];
  /** Nginx Configuration Package */
  package?: NginxConfigurationPackage;
}

export function analysisCreateConfigSerializer(item: AnalysisCreateConfig): any {
  return {
    rootFile: item["rootFile"],
    files: !item["files"] ? item["files"] : nginxConfigurationFileArraySerializer(item["files"]),
    protectedFiles: !item["protectedFiles"]
      ? item["protectedFiles"]
      : nginxConfigurationProtectedFileRequestArraySerializer(item["protectedFiles"]),
    package: !item["package"]
      ? item["package"]
      : nginxConfigurationPackageSerializer(item["package"]),
  };
}

/** The response body for an analysis request. Contains the status of the analysis and any errors. */
export interface AnalysisResult {
  /** The status of the analysis. */
  status: string;
  data?: AnalysisResultData;
}

export function analysisResultDeserializer(item: any): AnalysisResult {
  return {
    status: item["status"],
    data: !item["data"] ? item["data"] : analysisResultDataDeserializer(item["data"]),
  };
}

/** model interface AnalysisResultData */
export interface AnalysisResultData {
  errors?: AnalysisDiagnostic[];
  diagnostics?: DiagnosticItem[];
}

export function analysisResultDataDeserializer(item: any): AnalysisResultData {
  return {
    errors: !item["errors"] ? item["errors"] : analysisDiagnosticArrayDeserializer(item["errors"]),
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : diagnosticItemArrayDeserializer(item["diagnostics"]),
  };
}

export function analysisDiagnosticArrayDeserializer(result: Array<AnalysisDiagnostic>): any[] {
  return result.map((item) => {
    return analysisDiagnosticDeserializer(item);
  });
}

/** An error object found during the analysis of an NGINX configuration. */
export interface AnalysisDiagnostic {
  /** Unique identifier for the error */
  id?: string;
  directive: string;
  description: string;
  /** the filepath of the most relevant config file */
  file: string;
  line: number;
  message: string;
  rule: string;
}

export function analysisDiagnosticDeserializer(item: any): AnalysisDiagnostic {
  return {
    id: item["id"],
    directive: item["directive"],
    description: item["description"],
    file: item["file"],
    line: item["line"],
    message: item["message"],
    rule: item["rule"],
  };
}

export function diagnosticItemArrayDeserializer(result: Array<DiagnosticItem>): any[] {
  return result.map((item) => {
    return diagnosticItemDeserializer(item);
  });
}

/** A diagnostic is a message associated with an NGINX config. The Analyzer returns diagnostics with a level indicating the importance of the diagnostic with optional category. */
export interface DiagnosticItem {
  /** Unique identifier for the diagnostic. */
  id?: string;
  directive: string;
  description: string;
  /** The filepath of the most relevant config file. */
  file: string;
  line: number;
  message: string;
  rule: string;
  /** Warning or Info */
  level: Level;
  /** Category of warning like Best-practices, Recommendation, Security etc. */
  category?: string;
}

export function diagnosticItemDeserializer(item: any): DiagnosticItem {
  return {
    id: item["id"],
    directive: item["directive"],
    description: item["description"],
    file: item["file"],
    line: item["line"],
    message: item["message"],
    rule: item["rule"],
    level: item["level"],
    category: item["category"],
  };
}

/** Warning or Info */
export enum KnownLevel {
  /** Info */
  Info = "Info",
  /** Warning */
  Warning = "Warning",
}

/**
 * Warning or Info \
 * {@link KnownLevel} can be used interchangeably with Level,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Info** \
 * **Warning**
 */
export type Level = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-03-01-preview API version. */
  V20250301Preview = "2025-03-01-preview",
}

export function _nginxDeploymentScalingPropertiesAutoScaleSettingsSerializer(
  item: NginxDeploymentScalingProperties,
): any {
  return {
    profiles: !item["profiles"] ? item["profiles"] : scaleProfileArraySerializer(item["profiles"]),
  };
}

export function _nginxDeploymentScalingPropertiesAutoScaleSettingsDeserializer(item: any) {
  return {
    profiles: !item["profiles"]
      ? item["profiles"]
      : scaleProfileArrayDeserializer(item["profiles"]),
  };
}

export function _nginxDeploymentUpdatePropertiesNginxAppProtectSerializer(
  item: NginxDeploymentUpdateProperties,
): any {
  return {
    webApplicationFirewallSettings: !item["webApplicationFirewallSettings"]
      ? item["webApplicationFirewallSettings"]
      : webApplicationFirewallSettingsSerializer(item["webApplicationFirewallSettings"]),
  };
}
