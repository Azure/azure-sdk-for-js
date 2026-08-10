// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Describes the Machine Extension Upgrade Properties. */
export interface MachineExtensionUpgrade {
  /** Describes the Extension Target Properties. */
  extensionTargets?: Record<string, ExtensionTargetProperties>;
}

export function machineExtensionUpgradeSerializer(item: MachineExtensionUpgrade): any {
  return {
    extensionTargets: !item["extensionTargets"]
      ? item["extensionTargets"]
      : extensionTargetPropertiesRecordSerializer(item["extensionTargets"]),
  };
}

export function extensionTargetPropertiesRecordSerializer(
  item: Record<string, ExtensionTargetProperties>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : extensionTargetPropertiesSerializer(item[key]);
  });
  return result;
}

/** Describes the Machine Extension Target Version Properties */
export interface ExtensionTargetProperties {
  /** Properties for the specified Extension to Upgrade. */
  targetVersion?: string;
}

export function extensionTargetPropertiesSerializer(item: ExtensionTargetProperties): any {
  return { targetVersion: item["targetVersion"] };
}

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

/** model interface SetupExtensionRequest */
export interface SetupExtensionRequest {
  /** The list of extensions */
  extensions?: MachineExtensionProperties[];
}

export function setupExtensionRequestSerializer(item: SetupExtensionRequest): any {
  return {
    extensions: !item["extensions"]
      ? item["extensions"]
      : machineExtensionPropertiesArraySerializer(item["extensions"]),
  };
}

export function setupExtensionRequestDeserializer(item: any): SetupExtensionRequest {
  return {
    extensions: !item["extensions"]
      ? item["extensions"]
      : machineExtensionPropertiesArrayDeserializer(item["extensions"]),
  };
}

export function machineExtensionPropertiesArraySerializer(
  result: Array<MachineExtensionProperties>,
): any[] {
  return result.map((item) => {
    return machineExtensionPropertiesSerializer(item);
  });
}

export function machineExtensionPropertiesArrayDeserializer(
  result: Array<MachineExtensionProperties>,
): any[] {
  return result.map((item) => {
    return machineExtensionPropertiesDeserializer(item);
  });
}

/** Describes the properties of a Machine Extension. */
export interface MachineExtensionProperties {
  /** How the extension handler should be forced to update even if the extension configuration has not changed. */
  forceUpdateTag?: string;
  /** The name of the extension handler publisher. */
  publisher?: string;
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  type?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /** Indicates whether the extension should be automatically upgraded by the platform if there is a newer version available. */
  enableAutomaticUpgrade?: boolean;
  /** Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true. */
  autoUpgradeMinorVersion?: boolean;
  /** Json formatted public settings for the extension. */
  settings?: Record<string, any>;
  /** The extension can contain either protectedSettings or protectedSettingsFromKeyVault or no protected settings at all. */
  protectedSettings?: Record<string, any>;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** The machine extension instance view. */
  instanceView?: MachineExtensionInstanceView;
}

export function machineExtensionPropertiesSerializer(item: MachineExtensionProperties): any {
  return {
    forceUpdateTag: item["forceUpdateTag"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : machineExtensionInstanceViewSerializer(item["instanceView"]),
  };
}

export function machineExtensionPropertiesDeserializer(item: any): MachineExtensionProperties {
  return {
    forceUpdateTag: item["forceUpdateTag"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    settings: !item["settings"]
      ? item["settings"]
      : Object.fromEntries(Object.entries(item["settings"]).map(([k, p]: [string, any]) => [k, p])),
    protectedSettings: !item["protectedSettings"]
      ? item["protectedSettings"]
      : Object.fromEntries(
          Object.entries(item["protectedSettings"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    provisioningState: item["provisioningState"],
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : machineExtensionInstanceViewDeserializer(item["instanceView"]),
  };
}

/** Describes the Machine Extension Instance View. */
export interface MachineExtensionInstanceView {
  /** The machine extension name. */
  name?: string;
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  type?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /** Instance view status. */
  status?: MachineExtensionInstanceViewStatus;
}

export function machineExtensionInstanceViewSerializer(item: MachineExtensionInstanceView): any {
  return {
    name: item["name"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    status: !item["status"]
      ? item["status"]
      : machineExtensionInstanceViewStatusSerializer(item["status"]),
  };
}

export function machineExtensionInstanceViewDeserializer(item: any): MachineExtensionInstanceView {
  return {
    name: item["name"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    status: !item["status"]
      ? item["status"]
      : machineExtensionInstanceViewStatusDeserializer(item["status"]),
  };
}

/** Instance view status. */
export interface MachineExtensionInstanceViewStatus {
  /** The status code. */
  code?: string;
  /** The level code. */
  level?: StatusLevelTypes;
  /** The short localizable label for the status. */
  displayStatus?: string;
  /** The detailed status message, including for alerts and error messages. */
  message?: string;
  /** The time of the status. */
  time?: Date;
}

export function machineExtensionInstanceViewStatusSerializer(
  item: MachineExtensionInstanceViewStatus,
): any {
  return {
    code: item["code"],
    level: item["level"],
    displayStatus: item["displayStatus"],
    message: item["message"],
    time: !item["time"] ? item["time"] : item["time"].toISOString(),
  };
}

export function machineExtensionInstanceViewStatusDeserializer(
  item: any,
): MachineExtensionInstanceViewStatus {
  return {
    code: item["code"],
    level: item["level"],
    displayStatus: item["displayStatus"],
    message: item["message"],
    time: !item["time"] ? item["time"] : new Date(item["time"]),
  };
}

/** The level code. */
export enum KnownStatusLevelTypes {
  /** Info */
  Info = "Info",
  /** Warning */
  Warning = "Warning",
  /** Error */
  Error = "Error",
}

/**
 * The level code. \
 * {@link KnownStatusLevelTypes} can be used interchangeably with StatusLevelTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Info**: Info \
 * **Warning**: Warning \
 * **Error**: Error
 */
export type StatusLevelTypes = string;

/** The List of Operations. */
export interface _OperationListResult {
  /** The list of operations. */
  readonly value?: OperationValue[];
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : operationValueArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationValueArrayDeserializer(result: Array<OperationValue>): any[] {
  return result.map((item) => {
    return operationValueDeserializer(item);
  });
}

/** Describes the properties of a Compute Operation value. */
export interface OperationValue {
  /** The origin of the compute operation. */
  readonly origin?: string;
  /** The name of the compute operation. */
  readonly name?: string;
  /** Display properties */
  display?: OperationValueDisplay;
  /** This property indicates if the operation is an action or a data action */
  readonly isDataAction?: boolean;
}

export function operationValueDeserializer(item: any): OperationValue {
  return {
    origin: item["origin"],
    name: item["name"],
    display: !item["display"]
      ? item["display"]
      : operationValueDisplayDeserializer(item["display"]),
    isDataAction: item["isDataAction"],
  };
}

/** Describes the properties of a Hybrid Compute Operation Value Display. */
export interface OperationValueDisplay {
  /** The display name of the compute operation. */
  readonly operation?: string;
  /** The display name of the resource the operation applies to. */
  readonly resource?: string;
  /** The description of the operation. */
  readonly description?: string;
  /** The resource provider for the operation. */
  readonly provider?: string;
}

export function operationValueDisplayDeserializer(item: any): OperationValueDisplay {
  return {
    operation: item["operation"],
    resource: item["resource"],
    description: item["description"],
    provider: item["provider"],
  };
}

/** Describes a license in a hybrid machine. */
export interface License extends TrackedResource {
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: ProvisioningState;
  /** Describes the tenant id. */
  tenantId?: string;
  /** The type of the license resource. */
  licenseType?: LicenseType;
  /** Describes the properties of a License. */
  licenseDetails?: LicenseDetails;
}

export function licenseSerializer(item: License): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["tenantId", "licenseType", "licenseDetails"])
      ? undefined
      : _licensePropertiesSerializer(item),
  };
}

export function licenseDeserializer(item: any): License {
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
    ...(!item["properties"]
      ? item["properties"]
      : _licensePropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a License Profile. */
export interface LicenseProperties {
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: ProvisioningState;
  /** Describes the tenant id. */
  tenantId?: string;
  /** The type of the license resource. */
  licenseType?: LicenseType;
  /** Describes the properties of a License. */
  licenseDetails?: LicenseDetails;
}

export function licensePropertiesSerializer(item: LicenseProperties): any {
  return {
    tenantId: item["tenantId"],
    licenseType: item["licenseType"],
    licenseDetails: !item["licenseDetails"]
      ? item["licenseDetails"]
      : licenseDetailsSerializer(item["licenseDetails"]),
  };
}

export function licensePropertiesDeserializer(item: any): LicenseProperties {
  return {
    provisioningState: item["provisioningState"],
    tenantId: item["tenantId"],
    licenseType: item["licenseType"],
    licenseDetails: !item["licenseDetails"]
      ? item["licenseDetails"]
      : licenseDetailsDeserializer(item["licenseDetails"]),
  };
}

/** The provisioning state, which only appears in the response. */
export enum KnownProvisioningState {
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
  /** Accepted */
  Accepted = "Accepted",
  /** Canceled */
  Canceled = "Canceled",
  /** Deleted */
  Deleted = "Deleted",
}

/**
 * The provisioning state, which only appears in the response. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Accepted**: Accepted \
 * **Canceled**: Canceled \
 * **Deleted**: Deleted
 */
export type ProvisioningState = string;

/** The type of the license resource. */
export enum KnownLicenseType {
  /** ESU */
  ESU = "ESU",
}

/**
 * The type of the license resource. \
 * {@link KnownLicenseType} can be used interchangeably with LicenseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ESU**: ESU
 */
export type LicenseType = string;

/** Describes the properties of a License. */
export interface LicenseDetails {
  /** Describes the state of the license. */
  state?: LicenseState;
  /** Describes the license target server. */
  target?: LicenseTarget;
  /** Describes the edition of the license. The values are either Standard or Datacenter. */
  edition?: LicenseEdition;
  /** Describes the license core type (pCore or vCore). */
  type?: LicenseCoreType;
  /** Describes the number of processors. */
  processors?: number;
  /** Describes the number of assigned licenses. */
  readonly assignedLicenses?: number;
  /** Describes the immutable id. */
  readonly immutableId?: string;
  /** A list of volume license details. */
  volumeLicenseDetails?: VolumeLicenseDetails[];
}

export function licenseDetailsSerializer(item: LicenseDetails): any {
  return {
    state: item["state"],
    target: item["target"],
    edition: item["edition"],
    type: item["type"],
    processors: item["processors"],
    volumeLicenseDetails: !item["volumeLicenseDetails"]
      ? item["volumeLicenseDetails"]
      : volumeLicenseDetailsArraySerializer(item["volumeLicenseDetails"]),
  };
}

export function licenseDetailsDeserializer(item: any): LicenseDetails {
  return {
    state: item["state"],
    target: item["target"],
    edition: item["edition"],
    type: item["type"],
    processors: item["processors"],
    assignedLicenses: item["assignedLicenses"],
    immutableId: item["immutableId"],
    volumeLicenseDetails: !item["volumeLicenseDetails"]
      ? item["volumeLicenseDetails"]
      : volumeLicenseDetailsArrayDeserializer(item["volumeLicenseDetails"]),
  };
}

/** Describes the state of the license. */
export enum KnownLicenseState {
  /** Activated */
  Activated = "Activated",
  /** Deactivated */
  Deactivated = "Deactivated",
}

/**
 * Describes the state of the license. \
 * {@link KnownLicenseState} can be used interchangeably with LicenseState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Activated**: Activated \
 * **Deactivated**: Deactivated
 */
export type LicenseState = string;

/** Describes the license target server. */
export enum KnownLicenseTarget {
  /** Windows Server 2012 */
  WindowsServer2012 = "Windows Server 2012",
  /** Windows Server 2012 R2 */
  WindowsServer2012R2 = "Windows Server 2012 R2",
  /** Windows Server 2016 license target. */
  WindowsServer2016 = "Windows Server 2016",
}

/**
 * Describes the license target server. \
 * {@link KnownLicenseTarget} can be used interchangeably with LicenseTarget,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows Server 2012**: Windows Server 2012 \
 * **Windows Server 2012 R2**: Windows Server 2012 R2 \
 * **Windows Server 2016**: Windows Server 2016 license target.
 */
export type LicenseTarget = string;

/** Describes the edition of the license. The values are either Standard or Datacenter. */
export enum KnownLicenseEdition {
  /** Standard */
  Standard = "Standard",
  /** Datacenter */
  Datacenter = "Datacenter",
}

/**
 * Describes the edition of the license. The values are either Standard or Datacenter. \
 * {@link KnownLicenseEdition} can be used interchangeably with LicenseEdition,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**: Standard \
 * **Datacenter**: Datacenter
 */
export type LicenseEdition = string;

/** Describes the license core type (pCore or vCore). */
export enum KnownLicenseCoreType {
  /** pCore */
  PCore = "pCore",
  /** vCore */
  VCore = "vCore",
}

/**
 * Describes the license core type (pCore or vCore). \
 * {@link KnownLicenseCoreType} can be used interchangeably with LicenseCoreType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **pCore**: pCore \
 * **vCore**: vCore
 */
export type LicenseCoreType = string;

export function volumeLicenseDetailsArraySerializer(result: Array<VolumeLicenseDetails>): any[] {
  return result.map((item) => {
    return volumeLicenseDetailsSerializer(item);
  });
}

export function volumeLicenseDetailsArrayDeserializer(result: Array<VolumeLicenseDetails>): any[] {
  return result.map((item) => {
    return volumeLicenseDetailsDeserializer(item);
  });
}

/** model interface VolumeLicenseDetails */
export interface VolumeLicenseDetails {
  /** Describes the program year the volume license is for. */
  programYear?: ProgramYear;
  /** The invoice id for the volume license. */
  invoiceId?: string;
}

export function volumeLicenseDetailsSerializer(item: VolumeLicenseDetails): any {
  return { programYear: item["programYear"], invoiceId: item["invoiceId"] };
}

export function volumeLicenseDetailsDeserializer(item: any): VolumeLicenseDetails {
  return {
    programYear: item["programYear"],
    invoiceId: item["invoiceId"],
  };
}

/** Describes the program year the volume license is for. */
export enum KnownProgramYear {
  /** Year 1 */
  Year1 = "Year 1",
  /** Year 2 */
  Year2 = "Year 2",
  /** Year 3 */
  Year3 = "Year 3",
}

/**
 * Describes the program year the volume license is for. \
 * {@link KnownProgramYear} can be used interchangeably with ProgramYear,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Year 1**: Year 1 \
 * **Year 2**: Year 2 \
 * **Year 3**: Year 3
 */
export type ProgramYear = string;

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

/** Describes a License Update. */
export interface LicenseUpdate extends ResourceUpdate {
  /** The type of the license resource. */
  licenseType?: LicenseType;
  licenseDetails?: LicenseUpdatePropertiesLicenseDetails;
}

export function licenseUpdateSerializer(item: LicenseUpdate): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["licenseType", "licenseDetails"])
      ? undefined
      : _licenseUpdatePropertiesSerializer(item),
  };
}

/** Describes the Update properties of a License Profile. */
export interface LicenseUpdateProperties {
  /** The type of the license resource. */
  licenseType?: LicenseType;
  /** Describes the state of the license. */
  state?: LicenseState;
  /** Describes the license target server. */
  target?: LicenseTarget;
  /** Describes the edition of the license. The values are either Standard or Datacenter. */
  edition?: LicenseEdition;
  /** Describes the license core type (pCore or vCore). */
  type?: LicenseCoreType;
  /** Describes the number of processors. */
  processors?: number;
}

export function licenseUpdatePropertiesSerializer(item: LicenseUpdateProperties): any {
  return {
    licenseType: item["licenseType"],
    licenseDetails: areAllPropsUndefined(item, ["state", "target", "edition", "type", "processors"])
      ? undefined
      : _licenseUpdatePropertiesLicenseDetailsSerializer(item),
  };
}

/** model interface LicenseUpdatePropertiesLicenseDetails */
export interface LicenseUpdatePropertiesLicenseDetails {
  /** Describes the state of the license. */
  state?: LicenseState;
  /** Describes the license target server. */
  target?: LicenseTarget;
  /** Describes the edition of the license. The values are either Standard or Datacenter. */
  edition?: LicenseEdition;
  /** Describes the license core type (pCore or vCore). */
  type?: LicenseCoreType;
  /** Describes the number of processors. */
  processors?: number;
}

export function licenseUpdatePropertiesLicenseDetailsSerializer(
  item: LicenseUpdatePropertiesLicenseDetails,
): any {
  return {
    state: item["state"],
    target: item["target"],
    edition: item["edition"],
    type: item["type"],
    processors: item["processors"],
  };
}

/** The Update Resource model definition. */
export interface ResourceUpdate {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function resourceUpdateSerializer(item: ResourceUpdate): any {
  return { tags: item["tags"] };
}

/** Paged collection of License items */
export interface _LicensesListResult {
  /** The License items on this page */
  value: License[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _licensesListResultDeserializer(item: any): _LicensesListResult {
  return {
    value: licenseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function licenseArraySerializer(result: Array<License>): any[] {
  return result.map((item) => {
    return licenseSerializer(item);
  });
}

export function licenseArrayDeserializer(result: Array<License>): any[] {
  return result.map((item) => {
    return licenseDeserializer(item);
  });
}

/** Describes a hybrid machine. */
export interface Machine extends TrackedResource {
  /** The list of extensions affiliated to the machine */
  readonly resources?: MachineExtension[];
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
  /** Indicates which kind of Arc machine placement on-premises, such as HCI, SCVMM or VMware etc. */
  kind?: ArcKindEnum;
  /** Metadata pertaining to the geographic location of the resource. */
  locationData?: LocationData;
  /** Configurable properties that the user can set locally via the azcmagent config command, or remotely via ARM. */
  readonly agentConfiguration?: AgentConfiguration;
  /** Statuses of dependent services that are reported back to ARM. */
  serviceStatuses?: ServiceStatuses;
  /** Information about the machine's hardware */
  readonly hardwareProfile?: HardwareProfile;
  /** Information about the machine's storage */
  readonly storageProfile?: StorageProfile;
  /** Information about the machine's firmware */
  readonly firmwareProfile?: FirmwareProfile;
  /** The metadata of the cloud environment (Azure/GCP/AWS/OCI...). */
  cloudMetadata?: CloudMetadata;
  /** The info of the machine w.r.t Agent Upgrade */
  agentUpgrade?: AgentUpgrade;
  /** Specifies the operating system settings for the hybrid machine. */
  osProfile?: OSProfile;
  /** Specifies the License related properties for a machine. */
  licenseProfile?: LicenseProfileMachineInstanceView;
  /** Indicates whether the service has detected that this Arc machine is a clone of another onboarded machine. Service-computed; not settable by the user. */
  readonly statusReason?: MachineStatusReason;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** The status of the hybrid machine agent. */
  readonly status?: StatusTypes;
  /** The time of the last status change. */
  readonly lastStatusChange?: Date;
  /** Details about the error state. */
  readonly errorDetails?: ErrorDetail[];
  /** The hybrid machine agent full version. */
  readonly agentVersion?: string;
  /** Specifies the hybrid machine unique ID. */
  vmId?: string;
  /** Specifies the hybrid machine display name. */
  readonly displayName?: string;
  /** Specifies the hybrid machine FQDN. */
  readonly machineFqdn?: string;
  /** Public Key that the client provides to be used during initial resource onboarding */
  clientPublicKey?: string;
  /** Specifies the identity key store a machine is using. */
  identityKeyStore?: IdentityKeyStore;
  /** Endorsement Key Certificate of the Trusted Platform Module (TPM) that the client provides to be used during initial resource onboarding. */
  tpmEkCertificate?: string;
  /** The Operating System running on the hybrid machine. */
  readonly osName?: string;
  /** The version of Operating System running on the hybrid machine. */
  readonly osVersion?: string;
  /** The type of Operating System (windows/linux). */
  osType?: string;
  /** Specifies the Arc Machine's unique SMBIOS ID */
  readonly vmUuid?: string;
  /** Machine Extensions information (deprecated field) */
  extensions?: MachineExtensionInstanceView[];
  /** Specifies the Operating System product SKU. */
  readonly osSku?: string;
  /** The edition of the Operating System. */
  readonly osEdition?: string;
  /** Specifies the Windows domain name. */
  readonly domainName?: string;
  /** Specifies the AD fully qualified display name. */
  readonly adFqdn?: string;
  /** Specifies the DNS fully qualified display name. */
  readonly dnsFqdn?: string;
  /** The resource id of the private link scope this machine is assigned to, if any. */
  privateLinkScopeResourceId?: string;
  /** The resource id of the parent cluster (Azure HCI) this machine is assigned to, if any. */
  parentClusterResourceId?: string;
  /** Specifies the resource ID of the associated hardware device. Only settable by HCI RP. */
  hardwareResourceId?: string;
  /** Specifies whether any MS SQL instance is discovered on the machine. */
  mssqlDiscovered?: string;
  /** Detected properties from the machine. */
  readonly detectedProperties?: Record<string, string>;
  /** Information about the network the machine is on. */
  readonly networkProfile?: NetworkProfile;
}

export function machineSerializer(item: Machine): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "locationData",
      "serviceStatuses",
      "cloudMetadata",
      "agentUpgrade",
      "osProfile",
      "licenseProfile",
      "vmId",
      "clientPublicKey",
      "identityKeyStore",
      "tpmEkCertificate",
      "osType",
      "extensions",
      "privateLinkScopeResourceId",
      "parentClusterResourceId",
      "hardwareResourceId",
      "mssqlDiscovered",
    ])
      ? undefined
      : _machinePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    kind: item["kind"],
  };
}

export function machineDeserializer(item: any): Machine {
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
    ...(!item["properties"]
      ? item["properties"]
      : _machinePropertiesDeserializer(item["properties"])),
    resources: !item["resources"]
      ? item["resources"]
      : machineExtensionArrayDeserializer(item["resources"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    kind: item["kind"],
  };
}

/** Describes the properties of a hybrid machine. */
export interface MachineProperties {
  /** Metadata pertaining to the geographic location of the resource. */
  locationData?: LocationData;
  /** Configurable properties that the user can set locally via the azcmagent config command, or remotely via ARM. */
  readonly agentConfiguration?: AgentConfiguration;
  /** Statuses of dependent services that are reported back to ARM. */
  serviceStatuses?: ServiceStatuses;
  /** Information about the machine's hardware */
  readonly hardwareProfile?: HardwareProfile;
  /** Information about the machine's storage */
  readonly storageProfile?: StorageProfile;
  /** Information about the machine's firmware */
  readonly firmwareProfile?: FirmwareProfile;
  /** The metadata of the cloud environment (Azure/GCP/AWS/OCI...). */
  cloudMetadata?: CloudMetadata;
  /** The info of the machine w.r.t Agent Upgrade */
  agentUpgrade?: AgentUpgrade;
  /** Specifies the operating system settings for the hybrid machine. */
  osProfile?: OSProfile;
  /** Specifies the License related properties for a machine. */
  licenseProfile?: LicenseProfileMachineInstanceView;
  /** Indicates whether the service has detected that this Arc machine is a clone of another onboarded machine. Service-computed; not settable by the user. */
  readonly statusReason?: MachineStatusReason;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** The status of the hybrid machine agent. */
  readonly status?: StatusTypes;
  /** The time of the last status change. */
  readonly lastStatusChange?: Date;
  /** Details about the error state. */
  readonly errorDetails?: ErrorDetail[];
  /** The hybrid machine agent full version. */
  readonly agentVersion?: string;
  /** Specifies the hybrid machine unique ID. */
  vmId?: string;
  /** Specifies the hybrid machine display name. */
  readonly displayName?: string;
  /** Specifies the hybrid machine FQDN. */
  readonly machineFqdn?: string;
  /** Public Key that the client provides to be used during initial resource onboarding */
  clientPublicKey?: string;
  /** Specifies the identity key store a machine is using. */
  identityKeyStore?: IdentityKeyStore;
  /** Endorsement Key Certificate of the Trusted Platform Module (TPM) that the client provides to be used during initial resource onboarding. */
  tpmEkCertificate?: string;
  /** The Operating System running on the hybrid machine. */
  readonly osName?: string;
  /** The version of Operating System running on the hybrid machine. */
  readonly osVersion?: string;
  /** The type of Operating System (windows/linux). */
  osType?: string;
  /** Specifies the Arc Machine's unique SMBIOS ID */
  readonly vmUuid?: string;
  /** Machine Extensions information (deprecated field) */
  extensions?: MachineExtensionInstanceView[];
  /** Specifies the Operating System product SKU. */
  readonly osSku?: string;
  /** The edition of the Operating System. */
  readonly osEdition?: string;
  /** Specifies the Windows domain name. */
  readonly domainName?: string;
  /** Specifies the AD fully qualified display name. */
  readonly adFqdn?: string;
  /** Specifies the DNS fully qualified display name. */
  readonly dnsFqdn?: string;
  /** The resource id of the private link scope this machine is assigned to, if any. */
  privateLinkScopeResourceId?: string;
  /** The resource id of the parent cluster (Azure HCI) this machine is assigned to, if any. */
  parentClusterResourceId?: string;
  /** Specifies the resource ID of the associated hardware device. Only settable by HCI RP. */
  hardwareResourceId?: string;
  /** Specifies whether any MS SQL instance is discovered on the machine. */
  mssqlDiscovered?: string;
  /** Detected properties from the machine. */
  readonly detectedProperties?: Record<string, string>;
  /** Information about the network the machine is on. */
  readonly networkProfile?: NetworkProfile;
}

export function machinePropertiesSerializer(item: MachineProperties): any {
  return {
    locationData: !item["locationData"]
      ? item["locationData"]
      : locationDataSerializer(item["locationData"]),
    serviceStatuses: !item["serviceStatuses"]
      ? item["serviceStatuses"]
      : serviceStatusesSerializer(item["serviceStatuses"]),
    cloudMetadata: !item["cloudMetadata"]
      ? item["cloudMetadata"]
      : cloudMetadataSerializer(item["cloudMetadata"]),
    agentUpgrade: !item["agentUpgrade"]
      ? item["agentUpgrade"]
      : agentUpgradeSerializer(item["agentUpgrade"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : osProfileSerializer(item["osProfile"]),
    licenseProfile: !item["licenseProfile"]
      ? item["licenseProfile"]
      : licenseProfileMachineInstanceViewSerializer(item["licenseProfile"]),
    vmId: item["vmId"],
    clientPublicKey: item["clientPublicKey"],
    identityKeyStore: item["identityKeyStore"],
    tpmEkCertificate: item["tpmEkCertificate"],
    osType: item["osType"],
    extensions: !item["extensions"]
      ? item["extensions"]
      : machineExtensionInstanceViewArraySerializer(item["extensions"]),
    privateLinkScopeResourceId: item["privateLinkScopeResourceId"],
    parentClusterResourceId: item["parentClusterResourceId"],
    hardwareResourceId: item["hardwareResourceId"],
    mssqlDiscovered: item["mssqlDiscovered"],
  };
}

export function machinePropertiesDeserializer(item: any): MachineProperties {
  return {
    locationData: !item["locationData"]
      ? item["locationData"]
      : locationDataDeserializer(item["locationData"]),
    agentConfiguration: !item["agentConfiguration"]
      ? item["agentConfiguration"]
      : agentConfigurationDeserializer(item["agentConfiguration"]),
    serviceStatuses: !item["serviceStatuses"]
      ? item["serviceStatuses"]
      : serviceStatusesDeserializer(item["serviceStatuses"]),
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : hardwareProfileDeserializer(item["hardwareProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : storageProfileDeserializer(item["storageProfile"]),
    firmwareProfile: !item["firmwareProfile"]
      ? item["firmwareProfile"]
      : firmwareProfileDeserializer(item["firmwareProfile"]),
    cloudMetadata: !item["cloudMetadata"]
      ? item["cloudMetadata"]
      : cloudMetadataDeserializer(item["cloudMetadata"]),
    agentUpgrade: !item["agentUpgrade"]
      ? item["agentUpgrade"]
      : agentUpgradeDeserializer(item["agentUpgrade"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : osProfileDeserializer(item["osProfile"]),
    licenseProfile: !item["licenseProfile"]
      ? item["licenseProfile"]
      : licenseProfileMachineInstanceViewDeserializer(item["licenseProfile"]),
    statusReason: item["statusReason"],
    provisioningState: item["provisioningState"],
    status: item["status"],
    lastStatusChange: !item["lastStatusChange"]
      ? item["lastStatusChange"]
      : new Date(item["lastStatusChange"]),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailArrayDeserializer(item["errorDetails"]),
    agentVersion: item["agentVersion"],
    vmId: item["vmId"],
    displayName: item["displayName"],
    machineFqdn: item["machineFqdn"],
    clientPublicKey: item["clientPublicKey"],
    identityKeyStore: item["identityKeyStore"],
    tpmEkCertificate: item["tpmEkCertificate"],
    osName: item["osName"],
    osVersion: item["osVersion"],
    osType: item["osType"],
    vmUuid: item["vmUuid"],
    extensions: !item["extensions"]
      ? item["extensions"]
      : machineExtensionInstanceViewArrayDeserializer(item["extensions"]),
    osSku: item["osSku"],
    osEdition: item["osEdition"],
    domainName: item["domainName"],
    adFqdn: item["adFqdn"],
    dnsFqdn: item["dnsFqdn"],
    privateLinkScopeResourceId: item["privateLinkScopeResourceId"],
    parentClusterResourceId: item["parentClusterResourceId"],
    hardwareResourceId: item["hardwareResourceId"],
    mssqlDiscovered: item["mssqlDiscovered"],
    detectedProperties: !item["detectedProperties"]
      ? item["detectedProperties"]
      : Object.fromEntries(
          Object.entries(item["detectedProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileDeserializer(item["networkProfile"]),
  };
}

/** Metadata pertaining to the geographic location of the resource. */
export interface LocationData {
  /** A canonical name for the geographic or physical location. */
  name: string;
  /** The city or locality where the resource is located. */
  city?: string;
  /** The district, state, or province where the resource is located. */
  district?: string;
  /** The country or region where the resource is located */
  countryOrRegion?: string;
}

export function locationDataSerializer(item: LocationData): any {
  return {
    name: item["name"],
    city: item["city"],
    district: item["district"],
    countryOrRegion: item["countryOrRegion"],
  };
}

export function locationDataDeserializer(item: any): LocationData {
  return {
    name: item["name"],
    city: item["city"],
    district: item["district"],
    countryOrRegion: item["countryOrRegion"],
  };
}

/** Configurable properties that the user can set locally via the azcmagent config command, or remotely via ARM. */
export interface AgentConfiguration {
  /** Specifies the URL of the proxy to be used. */
  readonly proxyUrl?: string;
  /** Specifies the list of ports that the agent will be able to listen on. */
  readonly incomingConnectionsPorts?: string[];
  /** Array of extensions that are allowed to be installed or updated. */
  readonly extensionsAllowList?: ConfigurationExtension[];
  /** Array of extensions that are blocked (cannot be installed or updated) */
  readonly extensionsBlockList?: ConfigurationExtension[];
  /** List of service names which should not use the specified proxy server. */
  readonly proxyBypass?: string[];
  /** Specifies whether the extension service is enabled or disabled. */
  readonly extensionsEnabled?: string;
  /** Specified whether the guest configuration service is enabled or disabled. */
  readonly guestConfigurationEnabled?: string;
  /** Name of configuration mode to use. Modes are pre-defined configurations of security controls, extension allowlists and guest configuration, maintained by Microsoft. */
  readonly configMode?: AgentConfigurationMode;
}

export function agentConfigurationDeserializer(item: any): AgentConfiguration {
  return {
    proxyUrl: item["proxyUrl"],
    incomingConnectionsPorts: !item["incomingConnectionsPorts"]
      ? item["incomingConnectionsPorts"]
      : item["incomingConnectionsPorts"].map((p: any) => {
          return p;
        }),
    extensionsAllowList: !item["extensionsAllowList"]
      ? item["extensionsAllowList"]
      : configurationExtensionArrayDeserializer(item["extensionsAllowList"]),
    extensionsBlockList: !item["extensionsBlockList"]
      ? item["extensionsBlockList"]
      : configurationExtensionArrayDeserializer(item["extensionsBlockList"]),
    proxyBypass: !item["proxyBypass"]
      ? item["proxyBypass"]
      : item["proxyBypass"].map((p: any) => {
          return p;
        }),
    extensionsEnabled: item["extensionsEnabled"],
    guestConfigurationEnabled: item["guestConfigurationEnabled"],
    configMode: item["configMode"],
  };
}

export function configurationExtensionArrayDeserializer(
  result: Array<ConfigurationExtension>,
): any[] {
  return result.map((item) => {
    return configurationExtensionDeserializer(item);
  });
}

/** Describes properties that can identify extensions. */
export interface ConfigurationExtension {
  /** Publisher of the extension. */
  readonly publisher?: string;
  /** Type of the extension. */
  readonly type?: string;
}

export function configurationExtensionDeserializer(item: any): ConfigurationExtension {
  return {
    publisher: item["publisher"],
    type: item["type"],
  };
}

/** Name of configuration mode to use. Modes are pre-defined configurations of security controls, extension allowlists and guest configuration, maintained by Microsoft. */
export enum KnownAgentConfigurationMode {
  /** full */
  Full = "full",
  /** monitor */
  Monitor = "monitor",
}

/**
 * Name of configuration mode to use. Modes are pre-defined configurations of security controls, extension allowlists and guest configuration, maintained by Microsoft. \
 * {@link KnownAgentConfigurationMode} can be used interchangeably with AgentConfigurationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **full**: full \
 * **monitor**: monitor
 */
export type AgentConfigurationMode = string;

/** Reports the state and behavior of dependent services. */
export interface ServiceStatuses {
  /** The state of the extension service on the Arc-enabled machine. */
  extensionService?: ServiceStatus;
  /** The state of the guest configuration service on the Arc-enabled machine. */
  guestConfigurationService?: ServiceStatus;
}

export function serviceStatusesSerializer(item: ServiceStatuses): any {
  return {
    extensionService: !item["extensionService"]
      ? item["extensionService"]
      : serviceStatusSerializer(item["extensionService"]),
    guestConfigurationService: !item["guestConfigurationService"]
      ? item["guestConfigurationService"]
      : serviceStatusSerializer(item["guestConfigurationService"]),
  };
}

export function serviceStatusesDeserializer(item: any): ServiceStatuses {
  return {
    extensionService: !item["extensionService"]
      ? item["extensionService"]
      : serviceStatusDeserializer(item["extensionService"]),
    guestConfigurationService: !item["guestConfigurationService"]
      ? item["guestConfigurationService"]
      : serviceStatusDeserializer(item["guestConfigurationService"]),
  };
}

/** Describes the status and behavior of a service. */
export interface ServiceStatus {
  /** The current status of the service. */
  status?: string;
  /** The behavior of the service when the Arc-enabled machine starts up. */
  startupType?: string;
}

export function serviceStatusSerializer(item: ServiceStatus): any {
  return { status: item["status"], startupType: item["startupType"] };
}

export function serviceStatusDeserializer(item: any): ServiceStatus {
  return {
    status: item["status"],
    startupType: item["startupType"],
  };
}

/** Describes the hardware of the machine */
export interface HardwareProfile {
  /** The total physical memory on the machine */
  readonly totalPhysicalMemoryInBytes?: number;
  /** The total number of CPU sockets available on the machine */
  readonly numberOfCpuSockets?: number;
  /** The physical processors of the machine. */
  readonly processors?: Processor[];
}

export function hardwareProfileDeserializer(item: any): HardwareProfile {
  return {
    totalPhysicalMemoryInBytes: item["totalPhysicalMemoryInBytes"],
    numberOfCpuSockets: item["numberOfCpuSockets"],
    processors: !item["processors"]
      ? item["processors"]
      : processorArrayDeserializer(item["processors"]),
  };
}

export function processorArrayDeserializer(result: Array<Processor>): any[] {
  return result.map((item) => {
    return processorDeserializer(item);
  });
}

/** Describes the firmware of the machine */
export interface Processor {
  /** The name of the processor. */
  readonly name?: string;
  /** The total number of physical cores on the processor. */
  readonly numberOfCores?: number;
}

export function processorDeserializer(item: any): Processor {
  return {
    name: item["name"],
    numberOfCores: item["numberOfCores"],
  };
}

/** Describes the storage configuration of the machine */
export interface StorageProfile {
  /** The disks on the machine. */
  readonly disks?: Disk[];
}

export function storageProfileDeserializer(item: any): StorageProfile {
  return {
    disks: !item["disks"] ? item["disks"] : diskArrayDeserializer(item["disks"]),
  };
}

export function diskArrayDeserializer(result: Array<Disk>): any[] {
  return result.map((item) => {
    return diskDeserializer(item);
  });
}

/** Describes a disk on the machine */
export interface Disk {
  /** The path of the disk. */
  path?: string;
  /** The type of the disk. */
  diskType?: string;
  /** The generated ID of the disk. */
  generatedId?: string;
  /** The ID of the disk. */
  id?: string;
  /** The name of the disk. */
  name?: string;
  /** The size of the disk, in bytes */
  maxSizeInBytes?: number;
  /** The amount of space used on the disk, in bytes */
  usedSpaceInBytes?: number;
}

export function diskDeserializer(item: any): Disk {
  return {
    path: item["path"],
    diskType: item["diskType"],
    generatedId: item["generatedId"],
    id: item["id"],
    name: item["name"],
    maxSizeInBytes: item["maxSizeInBytes"],
    usedSpaceInBytes: item["usedSpaceInBytes"],
  };
}

/** Describes the firmware of the machine */
export interface FirmwareProfile {
  /** The serial number of the firmware */
  readonly serialNumber?: string;
  /** The type of the firmware */
  readonly type?: string;
}

export function firmwareProfileDeserializer(item: any): FirmwareProfile {
  return {
    serialNumber: item["serialNumber"],
    type: item["type"],
  };
}

/** The metadata of the cloud environment (Azure/GCP/AWS/OCI...). */
export interface CloudMetadata {
  /** Specifies the cloud provider (Azure/AWS/GCP...). */
  readonly provider?: string;
}

export function cloudMetadataSerializer(_item: CloudMetadata): any {
  return {};
}

export function cloudMetadataDeserializer(item: any): CloudMetadata {
  return {
    provider: item["provider"],
  };
}

/** The info w.r.t Agent Upgrade. */
export interface AgentUpgrade {
  /** Specifies the version info w.r.t AgentUpgrade for the machine. */
  desiredVersion?: string;
  /** The correlation ID associated with an agent upgrade operation. */
  correlationId?: string;
  /** Specifies if the machine's agent should be upgraded */
  enableAutomaticUpgrade?: boolean;
  /** Specifies the version of the last attempt */
  readonly lastAttemptDesiredVersion?: string;
  /** Timestamp of last upgrade attempt */
  readonly lastAttemptTimestamp?: Date;
  /** Specifies the status of Agent Upgrade. */
  readonly lastAttemptStatus?: LastAttemptStatusEnum;
  /** Failure message of last upgrade attempt if any. */
  readonly lastAttemptMessage?: string;
}

export function agentUpgradeSerializer(item: AgentUpgrade): any {
  return {
    desiredVersion: item["desiredVersion"],
    correlationId: item["correlationId"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
  };
}

export function agentUpgradeDeserializer(item: any): AgentUpgrade {
  return {
    desiredVersion: item["desiredVersion"],
    correlationId: item["correlationId"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    lastAttemptDesiredVersion: item["lastAttemptDesiredVersion"],
    lastAttemptTimestamp: !item["lastAttemptTimestamp"]
      ? item["lastAttemptTimestamp"]
      : new Date(item["lastAttemptTimestamp"]),
    lastAttemptStatus: item["lastAttemptStatus"],
    lastAttemptMessage: item["lastAttemptMessage"],
  };
}

/** Specifies the status of Agent Upgrade. */
export enum KnownLastAttemptStatusEnum {
  /** Success */
  Success = "Success",
  /** Failed */
  Failed = "Failed",
}

/**
 * Specifies the status of Agent Upgrade. \
 * {@link KnownLastAttemptStatusEnum} can be used interchangeably with LastAttemptStatusEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Success**: Success \
 * **Failed**: Failed
 */
export type LastAttemptStatusEnum = string;

/** Specifies the operating system settings for the hybrid machine. */
export interface OSProfile {
  /** Specifies the host OS name of the hybrid machine. */
  readonly computerName?: string;
  /** Specifies the windows configuration for update management. */
  windowsConfiguration?: OSProfileWindowsConfiguration;
  /** Specifies the linux configuration for update management. */
  linuxConfiguration?: OSProfileLinuxConfiguration;
}

export function osProfileSerializer(item: OSProfile): any {
  return {
    windowsConfiguration: !item["windowsConfiguration"]
      ? item["windowsConfiguration"]
      : osProfileWindowsConfigurationSerializer(item["windowsConfiguration"]),
    linuxConfiguration: !item["linuxConfiguration"]
      ? item["linuxConfiguration"]
      : osProfileLinuxConfigurationSerializer(item["linuxConfiguration"]),
  };
}

export function osProfileDeserializer(item: any): OSProfile {
  return {
    computerName: item["computerName"],
    windowsConfiguration: !item["windowsConfiguration"]
      ? item["windowsConfiguration"]
      : osProfileWindowsConfigurationDeserializer(item["windowsConfiguration"]),
    linuxConfiguration: !item["linuxConfiguration"]
      ? item["linuxConfiguration"]
      : osProfileLinuxConfigurationDeserializer(item["linuxConfiguration"]),
  };
}

/** Specifies the windows configuration for update management. */
export interface OSProfileWindowsConfiguration {
  /** Specifies the assessment mode. */
  assessmentMode?: AssessmentModeTypes;
  /** Specifies the patch mode. */
  patchMode?: PatchModeTypes;
  /** Captures the hotpatch capability enrollment intent of the customers, which enables customers to patch their Windows machines without requiring a reboot. */
  enableHotpatching?: boolean;
  /** Status of the hotpatch capability enrollment or disenrollment. */
  readonly status?: PatchSettingsStatus;
}

export function osProfileWindowsConfigurationSerializer(item: OSProfileWindowsConfiguration): any {
  return {
    patchSettings: areAllPropsUndefined(item, ["assessmentMode", "patchMode", "enableHotpatching"])
      ? undefined
      : _osProfileWindowsConfigurationPatchSettingsSerializer(item),
  };
}

export function osProfileWindowsConfigurationDeserializer(
  item: any,
): OSProfileWindowsConfiguration {
  return {
    ...(!item["patchSettings"]
      ? item["patchSettings"]
      : _osProfileWindowsConfigurationPatchSettingsDeserializer(item["patchSettings"])),
  };
}

/** Specifies the patch settings. */
export interface PatchSettings {
  /** Specifies the assessment mode. */
  assessmentMode?: AssessmentModeTypes;
  /** Specifies the patch mode. */
  patchMode?: PatchModeTypes;
  /** Captures the hotpatch capability enrollment intent of the customers, which enables customers to patch their Windows machines without requiring a reboot. */
  enableHotpatching?: boolean;
  /** Status of the hotpatch capability enrollment or disenrollment. */
  readonly status?: PatchSettingsStatus;
}

export function patchSettingsSerializer(item: PatchSettings): any {
  return {
    assessmentMode: item["assessmentMode"],
    patchMode: item["patchMode"],
    enableHotpatching: item["enableHotpatching"],
  };
}

export function patchSettingsDeserializer(item: any): PatchSettings {
  return {
    assessmentMode: item["assessmentMode"],
    patchMode: item["patchMode"],
    enableHotpatching: item["enableHotpatching"],
    status: !item["status"] ? item["status"] : patchSettingsStatusDeserializer(item["status"]),
  };
}

/** Specifies the assessment mode. */
export enum KnownAssessmentModeTypes {
  /** ImageDefault */
  ImageDefault = "ImageDefault",
  /** AutomaticByPlatform */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the assessment mode. \
 * {@link KnownAssessmentModeTypes} can be used interchangeably with AssessmentModeTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ImageDefault**: ImageDefault \
 * **AutomaticByPlatform**: AutomaticByPlatform
 */
export type AssessmentModeTypes = string;

/** Specifies the patch mode. */
export enum KnownPatchModeTypes {
  /** ImageDefault */
  ImageDefault = "ImageDefault",
  /** AutomaticByPlatform */
  AutomaticByPlatform = "AutomaticByPlatform",
  /** AutomaticByOS */
  AutomaticByOS = "AutomaticByOS",
  /** Manual */
  Manual = "Manual",
}

/**
 * Specifies the patch mode. \
 * {@link KnownPatchModeTypes} can be used interchangeably with PatchModeTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ImageDefault**: ImageDefault \
 * **AutomaticByPlatform**: AutomaticByPlatform \
 * **AutomaticByOS**: AutomaticByOS \
 * **Manual**: Manual
 */
export type PatchModeTypes = string;

/** Status of the hotpatch capability enrollment or disenrollment. */
export interface PatchSettingsStatus {
  /** Indicates the current status of the hotpatch being enabled or disabled. */
  hotpatchEnablementStatus?: HotpatchEnablementStatus;
  /** The errors that were encountered during the hotpatch capability enrollment or disenrollment. */
  readonly error?: ErrorDetail;
}

export function patchSettingsStatusDeserializer(item: any): PatchSettingsStatus {
  return {
    hotpatchEnablementStatus: item["hotpatchEnablementStatus"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** Status of hotpatch enablement or disablement. */
export enum KnownHotpatchEnablementStatus {
  /** Unknown */
  Unknown = "Unknown",
  /** PendingEvaluation */
  PendingEvaluation = "PendingEvaluation",
  /** Disabled */
  Disabled = "Disabled",
  /** ActionRequired */
  ActionRequired = "ActionRequired",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Status of hotpatch enablement or disablement. \
 * {@link KnownHotpatchEnablementStatus} can be used interchangeably with HotpatchEnablementStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **PendingEvaluation**: PendingEvaluation \
 * **Disabled**: Disabled \
 * **ActionRequired**: ActionRequired \
 * **Enabled**: Enabled
 */
export type HotpatchEnablementStatus = string;

/** Specifies the linux configuration for update management. */
export interface OSProfileLinuxConfiguration {
  /** Specifies the assessment mode. */
  assessmentMode?: AssessmentModeTypes;
  /** Specifies the patch mode. */
  patchMode?: PatchModeTypes;
  /** Captures the hotpatch capability enrollment intent of the customers, which enables customers to patch their Windows machines without requiring a reboot. */
  enableHotpatching?: boolean;
  /** Status of the hotpatch capability enrollment or disenrollment. */
  readonly status?: PatchSettingsStatus;
}

export function osProfileLinuxConfigurationSerializer(item: OSProfileLinuxConfiguration): any {
  return {
    patchSettings: areAllPropsUndefined(item, ["assessmentMode", "patchMode", "enableHotpatching"])
      ? undefined
      : _osProfileLinuxConfigurationPatchSettingsSerializer(item),
  };
}

export function osProfileLinuxConfigurationDeserializer(item: any): OSProfileLinuxConfiguration {
  return {
    ...(!item["patchSettings"]
      ? item["patchSettings"]
      : _osProfileLinuxConfigurationPatchSettingsDeserializer(item["patchSettings"])),
  };
}

/** License Profile Instance View in Machine Properties. */
export interface LicenseProfileMachineInstanceView {
  /** Indicates the license status of the OS. */
  readonly licenseStatus?: LicenseStatus;
  /** Indicates the license channel. */
  readonly licenseChannel?: string;
  /** Properties for the Machine ESU profile. */
  esuProfile?: LicenseProfileMachineInstanceViewEsuProperties;
  /** Specifies if this machine is licensed as part of a Software Assurance agreement. */
  softwareAssuranceCustomer?: boolean;
  /** Indicates the subscription status of the product. */
  subscriptionStatus?: LicenseProfileSubscriptionStatus;
  /** Indicates the product type of the license. */
  productType?: LicenseProfileProductType;
  /** The timestamp in UTC when the user enrolls the feature. */
  readonly enrollmentDate?: Date;
  /** The timestamp in UTC when the billing starts. */
  readonly billingStartDate?: Date;
  /** The timestamp in UTC when the user disenrolled the feature. */
  readonly disenrollmentDate?: Date;
  /** The timestamp in UTC when the billing ends. */
  readonly billingEndDate?: Date;
  /** The errors that were encountered during the feature enrollment or disenrollment. */
  readonly error?: ErrorDetail;
  /** The list of product features. */
  productFeatures?: ProductFeature[];
}

export function licenseProfileMachineInstanceViewSerializer(
  item: LicenseProfileMachineInstanceView,
): any {
  return {
    esuProfile: !item["esuProfile"]
      ? item["esuProfile"]
      : licenseProfileMachineInstanceViewEsuPropertiesSerializer(item["esuProfile"]),
  };
}

export function licenseProfileMachineInstanceViewDeserializer(
  item: any,
): LicenseProfileMachineInstanceView {
  return {
    licenseStatus: item["licenseStatus"],
    licenseChannel: item["licenseChannel"],
    ...(!item["softwareAssurance"]
      ? item["softwareAssurance"]
      : _licenseProfileMachineInstanceViewSoftwareAssuranceDeserializer(item["softwareAssurance"])),
    esuProfile: !item["esuProfile"]
      ? item["esuProfile"]
      : licenseProfileMachineInstanceViewEsuPropertiesDeserializer(item["esuProfile"]),
    ...(!item["productProfile"]
      ? item["productProfile"]
      : _licenseProfileMachineInstanceViewProductProfileDeserializer(item["productProfile"])),
  };
}

/** The license status. */
export enum KnownLicenseStatus {
  /** Unlicensed */
  Unlicensed = "Unlicensed",
  /** Licensed */
  Licensed = "Licensed",
  /** OOBGrace */
  OOBGrace = "OOBGrace",
  /** OOTGrace */
  OOTGrace = "OOTGrace",
  /** NonGenuineGrace */
  NonGenuineGrace = "NonGenuineGrace",
  /** Notification */
  Notification = "Notification",
  /** ExtendedGrace */
  ExtendedGrace = "ExtendedGrace",
}

/**
 * The license status. \
 * {@link KnownLicenseStatus} can be used interchangeably with LicenseStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unlicensed**: Unlicensed \
 * **Licensed**: Licensed \
 * **OOBGrace**: OOBGrace \
 * **OOTGrace**: OOTGrace \
 * **NonGenuineGrace**: NonGenuineGrace \
 * **Notification**: Notification \
 * **ExtendedGrace**: ExtendedGrace
 */
export type LicenseStatus = string;

/** model interface LicenseProfileMachineInstanceViewSoftwareAssurance */
export interface LicenseProfileMachineInstanceViewSoftwareAssurance {
  /** Specifies if this machine is licensed as part of a Software Assurance agreement. */
  softwareAssuranceCustomer?: boolean;
}

export function licenseProfileMachineInstanceViewSoftwareAssuranceDeserializer(
  item: any,
): LicenseProfileMachineInstanceViewSoftwareAssurance {
  return {
    softwareAssuranceCustomer: item["softwareAssuranceCustomer"],
  };
}

/** Properties for the Machine ESU profile. */
export interface LicenseProfileMachineInstanceViewEsuProperties extends LicenseProfileArmEsuPropertiesWithoutAssignedLicense {
  /** The assigned license resource. */
  assignedLicense?: License;
  /** Describes the license assignment state (Assigned or NotAssigned). */
  licenseAssignmentState?: LicenseAssignmentState;
}

export function licenseProfileMachineInstanceViewEsuPropertiesSerializer(
  item: LicenseProfileMachineInstanceViewEsuProperties,
): any {
  return {
    assignedLicense: !item["assignedLicense"]
      ? item["assignedLicense"]
      : licenseSerializer(item["assignedLicense"]),
    licenseAssignmentState: item["licenseAssignmentState"],
  };
}

export function licenseProfileMachineInstanceViewEsuPropertiesDeserializer(
  item: any,
): LicenseProfileMachineInstanceViewEsuProperties {
  return {
    serverType: item["serverType"],
    esuEligibility: item["esuEligibility"],
    esuKeyState: item["esuKeyState"],
    assignedLicenseImmutableId: item["assignedLicenseImmutableId"],
    esuKeys: !item["esuKeys"] ? item["esuKeys"] : esuKeyArrayDeserializer(item["esuKeys"]),
    assignedLicense: !item["assignedLicense"]
      ? item["assignedLicense"]
      : licenseDeserializer(item["assignedLicense"]),
    licenseAssignmentState: item["licenseAssignmentState"],
  };
}

/** Describes the license assignment state (Assigned or NotAssigned). */
export enum KnownLicenseAssignmentState {
  /** Assigned */
  Assigned = "Assigned",
  /** NotAssigned */
  NotAssigned = "NotAssigned",
}

/**
 * Describes the license assignment state (Assigned or NotAssigned). \
 * {@link KnownLicenseAssignmentState} can be used interchangeably with LicenseAssignmentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Assigned**: Assigned \
 * **NotAssigned**: NotAssigned
 */
export type LicenseAssignmentState = string;

/** Describes the properties of a Product License Profile ARM model. */
export interface LicenseProfileArmProductProfileProperties {
  /** Indicates the subscription status of the product. */
  subscriptionStatus?: LicenseProfileSubscriptionStatus;
  /** Indicates the product type of the license. */
  productType?: LicenseProfileProductType;
  /** The timestamp in UTC when the user enrolls the feature. */
  readonly enrollmentDate?: Date;
  /** The timestamp in UTC when the billing starts. */
  readonly billingStartDate?: Date;
  /** The timestamp in UTC when the user disenrolled the feature. */
  readonly disenrollmentDate?: Date;
  /** The timestamp in UTC when the billing ends. */
  readonly billingEndDate?: Date;
  /** The errors that were encountered during the feature enrollment or disenrollment. */
  readonly error?: ErrorDetail;
  /** The list of product features. */
  productFeatures?: ProductFeature[];
}

export function licenseProfileArmProductProfilePropertiesSerializer(
  item: LicenseProfileArmProductProfileProperties,
): any {
  return {
    subscriptionStatus: item["subscriptionStatus"],
    productType: item["productType"],
    productFeatures: !item["productFeatures"]
      ? item["productFeatures"]
      : productFeatureArraySerializer(item["productFeatures"]),
  };
}

export function licenseProfileArmProductProfilePropertiesDeserializer(
  item: any,
): LicenseProfileArmProductProfileProperties {
  return {
    subscriptionStatus: item["subscriptionStatus"],
    productType: item["productType"],
    enrollmentDate: !item["enrollmentDate"]
      ? item["enrollmentDate"]
      : new Date(item["enrollmentDate"]),
    billingStartDate: !item["billingStartDate"]
      ? item["billingStartDate"]
      : new Date(item["billingStartDate"]),
    disenrollmentDate: !item["disenrollmentDate"]
      ? item["disenrollmentDate"]
      : new Date(item["disenrollmentDate"]),
    billingEndDate: !item["billingEndDate"]
      ? item["billingEndDate"]
      : new Date(item["billingEndDate"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    productFeatures: !item["productFeatures"]
      ? item["productFeatures"]
      : productFeatureArrayDeserializer(item["productFeatures"]),
  };
}

/** Subscription status of the OS or Product feature. */
export enum KnownLicenseProfileSubscriptionStatus {
  /** Unknown */
  Unknown = "Unknown",
  /** Enabling */
  Enabling = "Enabling",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** Disabling */
  Disabling = "Disabling",
  /** Failed */
  Failed = "Failed",
}

/**
 * Subscription status of the OS or Product feature. \
 * {@link KnownLicenseProfileSubscriptionStatus} can be used interchangeably with LicenseProfileSubscriptionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **Enabling**: Enabling \
 * **Enabled**: Enabled \
 * **Disabled**: Disabled \
 * **Disabling**: Disabling \
 * **Failed**: Failed
 */
export type LicenseProfileSubscriptionStatus = string;

/** The product type of the license. */
export enum KnownLicenseProfileProductType {
  /** WindowsServer */
  WindowsServer = "WindowsServer",
  /** WindowsIoTEnterprise */
  WindowsIoTEnterprise = "WindowsIoTEnterprise",
}

/**
 * The product type of the license. \
 * {@link KnownLicenseProfileProductType} can be used interchangeably with LicenseProfileProductType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WindowsServer**: WindowsServer \
 * **WindowsIoTEnterprise**: WindowsIoTEnterprise
 */
export type LicenseProfileProductType = string;

export function productFeatureArraySerializer(result: Array<ProductFeature>): any[] {
  return result.map((item) => {
    return productFeatureSerializer(item);
  });
}

export function productFeatureArrayDeserializer(result: Array<ProductFeature>): any[] {
  return result.map((item) => {
    return productFeatureDeserializer(item);
  });
}

/** Product Feature */
export interface ProductFeature {
  /** Product feature name. */
  name?: string;
  /** Indicates the current status of the product features. */
  subscriptionStatus?: LicenseProfileSubscriptionStatus;
  /** The timestamp in UTC when the user enrolls the feature. */
  readonly enrollmentDate?: Date;
  /** The timestamp in UTC when the billing starts. */
  readonly billingStartDate?: Date;
  /** The timestamp in UTC when the user disenrolled the feature. */
  readonly disenrollmentDate?: Date;
  /** The timestamp in UTC when the billing ends. */
  readonly billingEndDate?: Date;
  /** The errors that were encountered during the feature enrollment or disenrollment. */
  readonly error?: ErrorDetail;
}

export function productFeatureSerializer(item: ProductFeature): any {
  return { name: item["name"], subscriptionStatus: item["subscriptionStatus"] };
}

export function productFeatureDeserializer(item: any): ProductFeature {
  return {
    name: item["name"],
    subscriptionStatus: item["subscriptionStatus"],
    enrollmentDate: !item["enrollmentDate"]
      ? item["enrollmentDate"]
      : new Date(item["enrollmentDate"]),
    billingStartDate: !item["billingStartDate"]
      ? item["billingStartDate"]
      : new Date(item["billingStartDate"]),
    disenrollmentDate: !item["disenrollmentDate"]
      ? item["disenrollmentDate"]
      : new Date(item["disenrollmentDate"]),
    billingEndDate: !item["billingEndDate"]
      ? item["billingEndDate"]
      : new Date(item["billingEndDate"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The reason describing why the service set the machine status to a particular value. */
export enum KnownMachineStatusReason {
  /** Indicates the service has detected that this Arc machine is a clone of another onboarded machine. */
  Cloned = "Cloned",
}

/**
 * The reason describing why the service set the machine status to a particular value. \
 * {@link KnownMachineStatusReason} can be used interchangeably with MachineStatusReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cloned**: Indicates the service has detected that this Arc machine is a clone of another onboarded machine.
 */
export type MachineStatusReason = string;

/** The status of the hybrid machine agent. */
export enum KnownStatusTypes {
  /** Connected */
  Connected = "Connected",
  /** Disconnected */
  Disconnected = "Disconnected",
  /** Error */
  Error = "Error",
  /** AwaitingConnection */
  AwaitingConnection = "AwaitingConnection",
}

/**
 * The status of the hybrid machine agent. \
 * {@link KnownStatusTypes} can be used interchangeably with StatusTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Connected**: Connected \
 * **Disconnected**: Disconnected \
 * **Error**: Error \
 * **AwaitingConnection**: AwaitingConnection
 */
export type StatusTypes = string;

/** Specifies the identity key store a machine is using. */
export enum KnownIdentityKeyStore {
  /** TPM */
  TPM = "TPM",
  /** Default */
  Default = "Default",
}

/**
 * Specifies the identity key store a machine is using. \
 * {@link KnownIdentityKeyStore} can be used interchangeably with IdentityKeyStore,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TPM**: TPM \
 * **Default**: Default
 */
export type IdentityKeyStore = string;

export function machineExtensionInstanceViewArraySerializer(
  result: Array<MachineExtensionInstanceView>,
): any[] {
  return result.map((item) => {
    return machineExtensionInstanceViewSerializer(item);
  });
}

export function machineExtensionInstanceViewArrayDeserializer(
  result: Array<MachineExtensionInstanceView>,
): any[] {
  return result.map((item) => {
    return machineExtensionInstanceViewDeserializer(item);
  });
}

/** Describes the network information on this machine. */
export interface NetworkProfile {
  /** The list of network interfaces. */
  readonly networkInterfaces?: NetworkInterface[];
}

export function networkProfileDeserializer(item: any): NetworkProfile {
  return {
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceArrayDeserializer(item["networkInterfaces"]),
  };
}

export function networkInterfaceArrayDeserializer(result: Array<NetworkInterface>): any[] {
  return result.map((item) => {
    return networkInterfaceDeserializer(item);
  });
}

/** Describes a network interface. */
export interface NetworkInterface {
  /** Represents MAC address of the network interface. */
  macAddress?: string;
  /** Represents the ID of the network interface. */
  id?: string;
  /** Represents the name of the network interface. */
  name?: string;
  /** The list of IP addresses in this interface. */
  readonly ipAddresses?: IpAddress[];
}

export function networkInterfaceDeserializer(item: any): NetworkInterface {
  return {
    macAddress: item["macAddress"],
    id: item["id"],
    name: item["name"],
    ipAddresses: !item["ipAddresses"]
      ? item["ipAddresses"]
      : ipAddressArrayDeserializer(item["ipAddresses"]),
  };
}

export function ipAddressArrayDeserializer(result: Array<IpAddress>): any[] {
  return result.map((item) => {
    return ipAddressDeserializer(item);
  });
}

/** Describes properties of the IP address. */
export interface IpAddress {
  /** Represents the IP Address. */
  address?: string;
  /** Represents the Ip Address Version. */
  ipAddressVersion?: string;
  /** The subnet to which this IP address belongs. */
  readonly subnet?: Subnet;
}

export function ipAddressDeserializer(item: any): IpAddress {
  return {
    address: item["address"],
    ipAddressVersion: item["ipAddressVersion"],
    subnet: !item["subnet"] ? item["subnet"] : subnetDeserializer(item["subnet"]),
  };
}

/** Describes the subnet. */
export interface Subnet {
  /** Represents address prefix. */
  addressPrefix?: string;
}

export function subnetDeserializer(item: any): Subnet {
  return {
    addressPrefix: item["addressPrefix"],
  };
}

export function machineExtensionArraySerializer(result: Array<MachineExtension>): any[] {
  return result.map((item) => {
    return machineExtensionSerializer(item);
  });
}

export function machineExtensionArrayDeserializer(result: Array<MachineExtension>): any[] {
  return result.map((item) => {
    return machineExtensionDeserializer(item);
  });
}

/** Describes a Machine Extension. */
export interface MachineExtension extends TrackedResource {
  /** Describes Machine Extension Properties. */
  properties?: MachineExtensionProperties;
}

export function machineExtensionSerializer(item: MachineExtension): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : machineExtensionPropertiesSerializer(item["properties"]),
  };
}

export function machineExtensionDeserializer(item: any): MachineExtension {
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
      : machineExtensionPropertiesDeserializer(item["properties"]),
  };
}

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : Object.fromEntries(
          Object.entries(item["userAssignedIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
  };
}

/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export enum KnownManagedServiceIdentityType {
  /** No managed identity. */
  None = "None",
  /** System assigned managed identity. */
  SystemAssigned = "SystemAssigned",
  /** User assigned managed identity. */
  UserAssigned = "UserAssigned",
  /** System and user assigned managed identity. */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned,UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

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

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Indicates which kind of Arc machine placement on-premises, such as HCI, SCVMM or VMware etc. */
export enum KnownArcKindEnum {
  /** AVS */
  AVS = "AVS",
  /** HCI */
  HCI = "HCI",
  /** SCVMM */
  Scvmm = "SCVMM",
  /** VMware */
  VMware = "VMware",
  /** EPS */
  EPS = "EPS",
  /** GCP */
  GCP = "GCP",
  /** AWS */
  AWS = "AWS",
}

/**
 * Indicates which kind of Arc machine placement on-premises, such as HCI, SCVMM or VMware etc. \
 * {@link KnownArcKindEnum} can be used interchangeably with ArcKindEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AVS**: AVS \
 * **HCI**: HCI \
 * **SCVMM**: SCVMM \
 * **VMware**: VMware \
 * **EPS**: EPS \
 * **GCP**: GCP \
 * **AWS**: AWS
 */
export type ArcKindEnum = string;

/** Describes the properties of a License Profile ARM model. */
export interface LicenseProfileArmEsuPropertiesWithoutAssignedLicense extends LicenseProfileStorageModelEsuProperties {
  /** The type of the Esu servers. */
  readonly serverType?: EsuServerType;
  /** Indicates the eligibility state of Esu. */
  readonly esuEligibility?: EsuEligibility;
  /** Indicates whether there is an ESU Key currently active for the machine. */
  readonly esuKeyState?: EsuKeyState;
}

export function licenseProfileArmEsuPropertiesWithoutAssignedLicenseSerializer(
  _item: LicenseProfileArmEsuPropertiesWithoutAssignedLicense,
): any {
  return {};
}

export function licenseProfileArmEsuPropertiesWithoutAssignedLicenseDeserializer(
  item: any,
): LicenseProfileArmEsuPropertiesWithoutAssignedLicense {
  return {
    assignedLicenseImmutableId: item["assignedLicenseImmutableId"],
    esuKeys: !item["esuKeys"] ? item["esuKeys"] : esuKeyArrayDeserializer(item["esuKeys"]),
    serverType: item["serverType"],
    esuEligibility: item["esuEligibility"],
    esuKeyState: item["esuKeyState"],
  };
}

/** The server types for Esu. */
export enum KnownEsuServerType {
  /** Standard */
  Standard = "Standard",
  /** Datacenter */
  Datacenter = "Datacenter",
}

/**
 * The server types for Esu. \
 * {@link KnownEsuServerType} can be used interchangeably with EsuServerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**: Standard \
 * **Datacenter**: Datacenter
 */
export type EsuServerType = string;

/** The ESU eligibility. */
export enum KnownEsuEligibility {
  /** Eligible */
  Eligible = "Eligible",
  /** Ineligible */
  Ineligible = "Ineligible",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * The ESU eligibility. \
 * {@link KnownEsuEligibility} can be used interchangeably with EsuEligibility,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Eligible**: Eligible \
 * **Ineligible**: Ineligible \
 * **Unknown**: Unknown
 */
export type EsuEligibility = string;

/** The ESU key state. */
export enum KnownEsuKeyState {
  /** Inactive */
  Inactive = "Inactive",
  /** Active */
  Active = "Active",
}

/**
 * The ESU key state. \
 * {@link KnownEsuKeyState} can be used interchangeably with EsuKeyState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inactive**: Inactive \
 * **Active**: Active
 */
export type EsuKeyState = string;

/** License profile storage model for ESU properties. */
export interface LicenseProfileStorageModelEsuProperties {
  /** The guid id of the license. */
  readonly assignedLicenseImmutableId?: string;
  /** The list of ESU keys. */
  readonly esuKeys?: EsuKey[];
}

export function licenseProfileStorageModelEsuPropertiesSerializer(
  _item: LicenseProfileStorageModelEsuProperties,
): any {
  return {};
}

export function licenseProfileStorageModelEsuPropertiesDeserializer(
  item: any,
): LicenseProfileStorageModelEsuProperties {
  return {
    assignedLicenseImmutableId: item["assignedLicenseImmutableId"],
    esuKeys: !item["esuKeys"] ? item["esuKeys"] : esuKeyArrayDeserializer(item["esuKeys"]),
  };
}

export function esuKeyArrayDeserializer(result: Array<EsuKey>): any[] {
  return result.map((item) => {
    return esuKeyDeserializer(item);
  });
}

/** ESU key */
export interface EsuKey {
  /** SKU number. */
  sku?: string;
  /** The current status of the license profile key. Represented by the same integer value that is presented on the machine itself when querying the license key status. */
  licenseStatus?: number;
}

export function esuKeyDeserializer(item: any): EsuKey {
  return {
    sku: item["sku"],
    licenseStatus: item["licenseStatus"],
  };
}

/** Describes a hybrid machine Update. */
export interface MachineUpdate extends ResourceUpdate {
  /** Identity for the resource. */
  identity?: ManagedServiceIdentity;
  /** Indicates which kind of Arc machine placement on-premises, such as HCI, SCVMM or VMware etc. */
  kind?: ArcKindEnum;
  /** Metadata pertaining to the geographic location of the resource. */
  locationData?: LocationData;
  /** Specifies the operating system settings for the hybrid machine. */
  osProfile?: OSProfile;
  /** The metadata of the cloud environment (Azure/GCP/AWS/OCI...). */
  cloudMetadata?: CloudMetadata;
  /** The info of the machine w.r.t Agent Upgrade */
  agentUpgrade?: AgentUpgrade;
  /** The resource id of the parent cluster (Azure HCI) this machine is assigned to, if any. */
  parentClusterResourceId?: string;
  /** The resource id of the private link scope this machine is assigned to, if any. */
  privateLinkScopeResourceId?: string;
  /** Identity key store type of the machine */
  identityKeyStore?: string;
  /** Endorsement Key Certificate of the Trusted Platform Module (TPM) that the client provides to be used during initial resource onboarding. */
  tpmEkCertificate?: string;
}

export function machineUpdateSerializer(item: MachineUpdate): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "locationData",
      "osProfile",
      "cloudMetadata",
      "agentUpgrade",
      "parentClusterResourceId",
      "privateLinkScopeResourceId",
      "identityKeyStore",
      "tpmEkCertificate",
    ])
      ? undefined
      : _machineUpdatePropertiesSerializer(item),
  };
}

/** Describes the ARM updatable properties of a hybrid machine. */
export interface MachineUpdateProperties {
  /** Metadata pertaining to the geographic location of the resource. */
  locationData?: LocationData;
  /** Specifies the operating system settings for the hybrid machine. */
  osProfile?: OSProfile;
  /** The metadata of the cloud environment (Azure/GCP/AWS/OCI...). */
  cloudMetadata?: CloudMetadata;
  /** The info of the machine w.r.t Agent Upgrade */
  agentUpgrade?: AgentUpgrade;
  /** The resource id of the parent cluster (Azure HCI) this machine is assigned to, if any. */
  parentClusterResourceId?: string;
  /** The resource id of the private link scope this machine is assigned to, if any. */
  privateLinkScopeResourceId?: string;
  /** Identity key store type of the machine */
  identityKeyStore?: string;
  /** Endorsement Key Certificate of the Trusted Platform Module (TPM) that the client provides to be used during initial resource onboarding. */
  tpmEkCertificate?: string;
}

export function machineUpdatePropertiesSerializer(item: MachineUpdateProperties): any {
  return {
    locationData: !item["locationData"]
      ? item["locationData"]
      : locationDataSerializer(item["locationData"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : osProfileSerializer(item["osProfile"]),
    cloudMetadata: !item["cloudMetadata"]
      ? item["cloudMetadata"]
      : cloudMetadataSerializer(item["cloudMetadata"]),
    agentUpgrade: !item["agentUpgrade"]
      ? item["agentUpgrade"]
      : agentUpgradeSerializer(item["agentUpgrade"]),
    parentClusterResourceId: item["parentClusterResourceId"],
    privateLinkScopeResourceId: item["privateLinkScopeResourceId"],
    identityKeyStore: item["identityKeyStore"],
    tpmEkCertificate: item["tpmEkCertificate"],
  };
}

/** The response of a Machine list operation. */
export interface _MachineListResult {
  /** The Machine items on this page */
  value: Machine[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _machineListResultDeserializer(item: any): _MachineListResult {
  return {
    value: machineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function machineArraySerializer(result: Array<Machine>): any[] {
  return result.map((item) => {
    return machineSerializer(item);
  });
}

export function machineArrayDeserializer(result: Array<Machine>): any[] {
  return result.map((item) => {
    return machineDeserializer(item);
  });
}

/** Describes the properties of an AssessPatches result. */
export interface MachineAssessPatchesResult {
  /** The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Unknown", "Failed", "Succeeded", or "CompletedWithWarnings." */
  readonly status?: PatchOperationStatus;
  /** The activity ID of the operation that produced this result. */
  readonly assessmentActivityId?: string;
  /** The overall reboot status of the VM. It will be true when partially installed patches require a reboot to complete installation but the reboot has not yet occurred. */
  readonly rebootPending?: boolean;
  /** Summarization of patches available for installation on the machine by classification. */
  availablePatchCountByClassification?: AvailablePatchCountByClassification;
  /** The UTC timestamp when the operation began. */
  readonly startDateTime?: Date;
  /** The UTC timestamp when the operation finished. */
  readonly lastModifiedDateTime?: Date;
  /** Indicates if operation was triggered by user or by platform. */
  readonly startedBy?: PatchOperationStartedBy;
  /** Specifies the patch service used for the operation. */
  readonly patchServiceUsed?: PatchServiceUsed;
  /** The operating system type of the machine. */
  readonly osType?: OsType;
  /** The errors that were encountered during execution of the operation. The details array contains the list of them. */
  readonly errorDetails?: ErrorDetail;
}

export function machineAssessPatchesResultDeserializer(item: any): MachineAssessPatchesResult {
  return {
    status: item["status"],
    assessmentActivityId: item["assessmentActivityId"],
    rebootPending: item["rebootPending"],
    availablePatchCountByClassification: !item["availablePatchCountByClassification"]
      ? item["availablePatchCountByClassification"]
      : availablePatchCountByClassificationDeserializer(
          item["availablePatchCountByClassification"],
        ),
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    startedBy: item["startedBy"],
    patchServiceUsed: item["patchServiceUsed"],
    osType: item["osType"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailDeserializer(item["errorDetails"]),
  };
}

/** The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Unknown", "Failed", "Succeeded", or "CompletedWithWarnings." */
export enum KnownPatchOperationStatus {
  /** Unknown */
  Unknown = "Unknown",
  /** InProgress */
  InProgress = "InProgress",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** CompletedWithWarnings */
  CompletedWithWarnings = "CompletedWithWarnings",
}

/**
 * The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Unknown", "Failed", "Succeeded", or "CompletedWithWarnings." \
 * {@link KnownPatchOperationStatus} can be used interchangeably with PatchOperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **InProgress**: InProgress \
 * **Failed**: Failed \
 * **Succeeded**: Succeeded \
 * **CompletedWithWarnings**: CompletedWithWarnings
 */
export type PatchOperationStatus = string;

/** Summarization of patches available for installation on the machine by classification. */
export interface AvailablePatchCountByClassification {
  /** Number of security patches available for installation. */
  readonly security?: number;
  /** Number of critical patches available for installation. */
  readonly critical?: number;
  /** Number of definition patches available for installation. */
  readonly definition?: number;
  /** Number of update Rollup patches available for installation. */
  readonly updateRollup?: number;
  /** Number of feature pack patches available for installation. */
  readonly featurePack?: number;
  /** Number of service pack patches available for installation. */
  readonly servicePack?: number;
  /** Number of tools patches available for installation. */
  readonly tools?: number;
  /** Number of updates category patches available for installation. */
  readonly updates?: number;
  /** Number of other patches available for installation. */
  readonly other?: number;
}

export function availablePatchCountByClassificationDeserializer(
  item: any,
): AvailablePatchCountByClassification {
  return {
    security: item["security"],
    critical: item["critical"],
    definition: item["definition"],
    updateRollup: item["updateRollup"],
    featurePack: item["featurePack"],
    servicePack: item["servicePack"],
    tools: item["tools"],
    updates: item["updates"],
    other: item["other"],
  };
}

/** Indicates if operation was triggered by user or by platform. */
export enum KnownPatchOperationStartedBy {
  /** User */
  User = "User",
  /** Platform */
  Platform = "Platform",
}

/**
 * Indicates if operation was triggered by user or by platform. \
 * {@link KnownPatchOperationStartedBy} can be used interchangeably with PatchOperationStartedBy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: User \
 * **Platform**: Platform
 */
export type PatchOperationStartedBy = string;

/** Specifies the patch service used for the operation. */
export enum KnownPatchServiceUsed {
  /** Unknown */
  Unknown = "Unknown",
  /** WU */
  WU = "WU",
  /** WU_WSUS */
  WUWsus = "WU_WSUS",
  /** YUM */
  YUM = "YUM",
  /** APT */
  APT = "APT",
  /** Zypper */
  Zypper = "Zypper",
}

/**
 * Specifies the patch service used for the operation. \
 * {@link KnownPatchServiceUsed} can be used interchangeably with PatchServiceUsed,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **WU**: WU \
 * **WU_WSUS**: WU_WSUS \
 * **YUM**: YUM \
 * **APT**: APT \
 * **Zypper**: Zypper
 */
export type PatchServiceUsed = string;

/** The operating system type of the machine. */
export enum KnownOsType {
  /** Windows */
  Windows = "Windows",
  /** Linux */
  Linux = "Linux",
}

/**
 * The operating system type of the machine. \
 * {@link KnownOsType} can be used interchangeably with OsType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows**: Windows \
 * **Linux**: Linux
 */
export type OsType = string;

/** Input for InstallPatches as directly received by the API */
export interface MachineInstallPatchesParameters {
  /** Specifies the maximum amount of time that the operation will run. It must be an ISO 8601-compliant duration string such as PT4H (4 hours) */
  maximumDuration: string;
  /** Defines when it is acceptable to reboot a VM during a software update operation. */
  rebootSetting: VMGuestPatchRebootSetting;
  /** Input for InstallPatches on a Windows VM, as directly received by the API */
  windowsParameters?: WindowsParameters;
  /** Input for InstallPatches on a Linux VM, as directly received by the API */
  linuxParameters?: LinuxParameters;
}

export function machineInstallPatchesParametersSerializer(
  item: MachineInstallPatchesParameters,
): any {
  return {
    maximumDuration: item["maximumDuration"],
    rebootSetting: item["rebootSetting"],
    windowsParameters: !item["windowsParameters"]
      ? item["windowsParameters"]
      : windowsParametersSerializer(item["windowsParameters"]),
    linuxParameters: !item["linuxParameters"]
      ? item["linuxParameters"]
      : linuxParametersSerializer(item["linuxParameters"]),
  };
}

/** Defines when it is acceptable to reboot a VM during a software update operation. */
export enum KnownVMGuestPatchRebootSetting {
  /** IfRequired */
  IfRequired = "IfRequired",
  /** Never */
  Never = "Never",
  /** Always */
  Always = "Always",
}

/**
 * Defines when it is acceptable to reboot a VM during a software update operation. \
 * {@link KnownVMGuestPatchRebootSetting} can be used interchangeably with VMGuestPatchRebootSetting,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IfRequired**: IfRequired \
 * **Never**: Never \
 * **Always**: Always
 */
export type VMGuestPatchRebootSetting = string;

/** Input for InstallPatches on a Windows VM, as directly received by the API */
export interface WindowsParameters {
  /** The update classifications to select when installing patches for Windows. */
  classificationsToInclude?: VMGuestPatchClassificationWindows[];
  /** Kbs to include in the patch operation */
  kbNumbersToInclude?: string[];
  /** Kbs to exclude in the patch operation */
  kbNumbersToExclude?: string[];
  /** Filters out Kbs that don't have an InstallationRebootBehavior of 'NeverReboots' when this is set to true. */
  excludeKbsRequiringReboot?: boolean;
  /** This is used to install patches that were published on or before this given max published date. */
  maxPatchPublishDate?: Date;
  /** This is used to include patches that match the given patch name masks. Alphanumeric strings and wildcard expressions consisting of * and ? are only supported as input values in the list. Null, empty and only whitespaces strings as inputs values are not supported. */
  patchNameMasksToInclude?: string[];
  /** This is used to exclude patches that match the given patch name masks. Alphanumeric strings and wildcard expressions consisting of * and ? are only supported as input values in the list. Null, empty and only whitespaces strings as inputs values are not supported. */
  patchNameMasksToExclude?: string[];
}

export function windowsParametersSerializer(item: WindowsParameters): any {
  return {
    classificationsToInclude: !item["classificationsToInclude"]
      ? item["classificationsToInclude"]
      : item["classificationsToInclude"].map((p: any) => {
          return p;
        }),
    kbNumbersToInclude: !item["kbNumbersToInclude"]
      ? item["kbNumbersToInclude"]
      : item["kbNumbersToInclude"].map((p: any) => {
          return p;
        }),
    kbNumbersToExclude: !item["kbNumbersToExclude"]
      ? item["kbNumbersToExclude"]
      : item["kbNumbersToExclude"].map((p: any) => {
          return p;
        }),
    excludeKbsRequiringReboot: item["excludeKbsRequiringReboot"],
    maxPatchPublishDate: !item["maxPatchPublishDate"]
      ? item["maxPatchPublishDate"]
      : item["maxPatchPublishDate"].toISOString(),
    patchNameMasksToInclude: !item["patchNameMasksToInclude"]
      ? item["patchNameMasksToInclude"]
      : item["patchNameMasksToInclude"].map((p: any) => {
          return p;
        }),
    patchNameMasksToExclude: !item["patchNameMasksToExclude"]
      ? item["patchNameMasksToExclude"]
      : item["patchNameMasksToExclude"].map((p: any) => {
          return p;
        }),
  };
}

/** Known values of {@link VMGuestPatchClassification_Windows} that the service accepts. */
export enum KnownVMGuestPatchClassificationWindows {
  /** Critical */
  Critical = "Critical",
  /** Security */
  Security = "Security",
  /** UpdateRollUp */
  UpdateRollUp = "UpdateRollUp",
  /** FeaturePack */
  FeaturePack = "FeaturePack",
  /** ServicePack */
  ServicePack = "ServicePack",
  /** Definition */
  Definition = "Definition",
  /** Tools */
  Tools = "Tools",
  /** Updates */
  Updates = "Updates",
}

/** Type of VMGuestPatchClassificationWindows */
export type VMGuestPatchClassificationWindows = string;

/** Input for InstallPatches on a Linux VM, as directly received by the API */
export interface LinuxParameters {
  /** The update classifications to select when installing patches for Linux. */
  classificationsToInclude?: VMGuestPatchClassificationLinux[];
  /** packages to include in the patch operation. Format: packageName_packageVersion */
  packageNameMasksToInclude?: string[];
  /** packages to exclude in the patch operation. Format: packageName_packageVersion */
  packageNameMasksToExclude?: string[];
}

export function linuxParametersSerializer(item: LinuxParameters): any {
  return {
    classificationsToInclude: !item["classificationsToInclude"]
      ? item["classificationsToInclude"]
      : item["classificationsToInclude"].map((p: any) => {
          return p;
        }),
    packageNameMasksToInclude: !item["packageNameMasksToInclude"]
      ? item["packageNameMasksToInclude"]
      : item["packageNameMasksToInclude"].map((p: any) => {
          return p;
        }),
    packageNameMasksToExclude: !item["packageNameMasksToExclude"]
      ? item["packageNameMasksToExclude"]
      : item["packageNameMasksToExclude"].map((p: any) => {
          return p;
        }),
  };
}

/** Known values of {@link VMGuestPatchClassification_Linux} that the service accepts. */
export enum KnownVMGuestPatchClassificationLinux {
  /** Critical */
  Critical = "Critical",
  /** Security */
  Security = "Security",
  /** Other */
  Other = "Other",
}

/** Type of VMGuestPatchClassificationLinux */
export type VMGuestPatchClassificationLinux = string;

/** The result summary of an installation operation. */
export interface MachineInstallPatchesResult {
  /** The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Failed", "Succeeded", "Unknown" or "CompletedWithWarnings." */
  readonly status?: PatchOperationStatus;
  /** The activity ID of the operation that produced this result. */
  readonly installationActivityId?: string;
  /** The reboot state of the VM following completion of the operation. */
  readonly rebootStatus?: VMGuestPatchRebootStatus;
  /** Whether the operation ran out of time before it completed all its intended actions. */
  readonly maintenanceWindowExceeded?: boolean;
  /** The number of patches that were not installed due to the user blocking their installation. */
  readonly excludedPatchCount?: number;
  /** The number of patches that were detected as available for install, but did not meet the operation's criteria. */
  readonly notSelectedPatchCount?: number;
  /** The number of patches that were identified as meeting the installation criteria, but were not able to be installed. Typically this happens when maintenanceWindowExceeded == true. */
  readonly pendingPatchCount?: number;
  /** The number of patches successfully installed. */
  readonly installedPatchCount?: number;
  /** The number of patches that could not be installed due to some issue. See errors for details. */
  readonly failedPatchCount?: number;
  /** The UTC timestamp when the operation began. */
  readonly startDateTime?: Date;
  /** The UTC timestamp when the operation finished. */
  readonly lastModifiedDateTime?: Date;
  /** Indicates if operation was triggered by user or by platform. */
  readonly startedBy?: PatchOperationStartedBy;
  /** Specifies the patch service used for the operation. */
  readonly patchServiceUsed?: PatchServiceUsed;
  /** The operating system type of the machine. */
  readonly osType?: OsType;
  /** The errors that were encountered during execution of the operation. The details array contains the list of them. */
  readonly errorDetails?: ErrorDetail;
}

export function machineInstallPatchesResultDeserializer(item: any): MachineInstallPatchesResult {
  return {
    status: item["status"],
    installationActivityId: item["installationActivityId"],
    rebootStatus: item["rebootStatus"],
    maintenanceWindowExceeded: item["maintenanceWindowExceeded"],
    excludedPatchCount: item["excludedPatchCount"],
    notSelectedPatchCount: item["notSelectedPatchCount"],
    pendingPatchCount: item["pendingPatchCount"],
    installedPatchCount: item["installedPatchCount"],
    failedPatchCount: item["failedPatchCount"],
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    startedBy: item["startedBy"],
    patchServiceUsed: item["patchServiceUsed"],
    osType: item["osType"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailDeserializer(item["errorDetails"]),
  };
}

/** The reboot state of the VM following completion of the operation. */
export enum KnownVMGuestPatchRebootStatus {
  /** Unknown */
  Unknown = "Unknown",
  /** NotNeeded */
  NotNeeded = "NotNeeded",
  /** Required */
  Required = "Required",
  /** Started */
  Started = "Started",
  /** Failed */
  Failed = "Failed",
  /** Completed */
  Completed = "Completed",
}

/**
 * The reboot state of the VM following completion of the operation. \
 * {@link KnownVMGuestPatchRebootStatus} can be used interchangeably with VMGuestPatchRebootStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **NotNeeded**: NotNeeded \
 * **Required**: Required \
 * **Started**: Started \
 * **Failed**: Failed \
 * **Completed**: Completed
 */
export type VMGuestPatchRebootStatus = string;

/** Describes a license profile in a hybrid machine. */
export interface LicenseProfile extends TrackedResource {
  softwareAssurance?: LicenseProfilePropertiesSoftwareAssurance;
  /** Hybrid Compute ESU Profile properties */
  esuProfile?: LicenseProfileArmEsuProperties;
  /** Hybrid Compute Product Profile properties */
  productProfile?: LicenseProfileArmProductProfileProperties;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: ProvisioningState;
}

export function licenseProfileSerializer(item: LicenseProfile): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["softwareAssurance", "esuProfile", "productProfile"])
      ? undefined
      : _licenseProfilePropertiesSerializer(item),
  };
}

export function licenseProfileDeserializer(item: any): LicenseProfile {
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
    ...(!item["properties"]
      ? item["properties"]
      : _licenseProfilePropertiesDeserializer(item["properties"])),
  };
}

/** Describe the properties of a license profile. */
export interface LicenseProfileProperties {
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: ProvisioningState;
  /** Specifies if this machine is licensed as part of a Software Assurance agreement. */
  softwareAssuranceCustomer?: boolean;
  /** The type of the Esu servers. */
  readonly serverType?: EsuServerType;
  /** Indicates the eligibility state of Esu. */
  readonly esuEligibility?: EsuEligibility;
  /** Indicates whether there is an ESU Key currently active for the machine. */
  readonly esuKeyState?: EsuKeyState;
  /** The guid id of the license. */
  readonly assignedLicenseImmutableId?: string;
  /** The list of ESU keys. */
  readonly esuKeys?: EsuKey[];
  /** The resource id of the license. */
  assignedLicense?: string;
  /** Indicates the subscription status of the product. */
  subscriptionStatus?: LicenseProfileSubscriptionStatus;
  /** Indicates the product type of the license. */
  productType?: LicenseProfileProductType;
  /** The timestamp in UTC when the user enrolls the feature. */
  readonly enrollmentDate?: Date;
  /** The timestamp in UTC when the billing starts. */
  readonly billingStartDate?: Date;
  /** The timestamp in UTC when the user disenrolled the feature. */
  readonly disenrollmentDate?: Date;
  /** The timestamp in UTC when the billing ends. */
  readonly billingEndDate?: Date;
  /** The errors that were encountered during the feature enrollment or disenrollment. */
  readonly error?: ErrorDetail;
  /** The list of product features. */
  productFeatures?: ProductFeature[];
}

export function licenseProfilePropertiesSerializer(item: LicenseProfileProperties): any {
  return {
    softwareAssurance: areAllPropsUndefined(item, ["softwareAssuranceCustomer"])
      ? undefined
      : _licenseProfilePropertiesSoftwareAssuranceSerializer(item),
    esuProfile: areAllPropsUndefined(item, ["assignedLicense"])
      ? undefined
      : _licenseProfilePropertiesEsuProfileSerializer(item),
    productProfile: areAllPropsUndefined(item, [
      "subscriptionStatus",
      "productType",
      "productFeatures",
    ])
      ? undefined
      : _licenseProfilePropertiesProductProfileSerializer(item),
  };
}

export function licenseProfilePropertiesDeserializer(item: any): LicenseProfileProperties {
  return {
    ...(!item["softwareAssurance"]
      ? item["softwareAssurance"]
      : _licenseProfilePropertiesSoftwareAssuranceDeserializer(item["softwareAssurance"])),
    ...(!item["esuProfile"]
      ? item["esuProfile"]
      : _licenseProfilePropertiesEsuProfileDeserializer(item["esuProfile"])),
    ...(!item["productProfile"]
      ? item["productProfile"]
      : _licenseProfilePropertiesProductProfileDeserializer(item["productProfile"])),
    provisioningState: item["provisioningState"],
  };
}

/** model interface LicenseProfilePropertiesSoftwareAssurance */
export interface LicenseProfilePropertiesSoftwareAssurance {
  /** Specifies if this machine is licensed as part of a Software Assurance agreement. */
  softwareAssuranceCustomer?: boolean;
}

export function licenseProfilePropertiesSoftwareAssuranceSerializer(
  item: LicenseProfilePropertiesSoftwareAssurance,
): any {
  return { softwareAssuranceCustomer: item["softwareAssuranceCustomer"] };
}

export function licenseProfilePropertiesSoftwareAssuranceDeserializer(
  item: any,
): LicenseProfilePropertiesSoftwareAssurance {
  return {
    softwareAssuranceCustomer: item["softwareAssuranceCustomer"],
  };
}

/** Describes the properties of a License Profile ARM model. */
export interface LicenseProfileArmEsuProperties extends LicenseProfileArmEsuPropertiesWithoutAssignedLicense {
  /** The resource id of the license. */
  assignedLicense?: string;
}

export function licenseProfileArmEsuPropertiesSerializer(
  item: LicenseProfileArmEsuProperties,
): any {
  return { assignedLicense: item["assignedLicense"] };
}

export function licenseProfileArmEsuPropertiesDeserializer(
  item: any,
): LicenseProfileArmEsuProperties {
  return {
    serverType: item["serverType"],
    esuEligibility: item["esuEligibility"],
    esuKeyState: item["esuKeyState"],
    assignedLicenseImmutableId: item["assignedLicenseImmutableId"],
    esuKeys: !item["esuKeys"] ? item["esuKeys"] : esuKeyArrayDeserializer(item["esuKeys"]),
    assignedLicense: item["assignedLicense"],
  };
}

/** Describes a License Profile Update. */
export interface LicenseProfileUpdate extends ResourceUpdate {
  softwareAssurance?: LicenseProfileUpdatePropertiesSoftwareAssurance;
  /** Hybrid Compute ESU Profile Update properties */
  esuProfile?: EsuProfileUpdateProperties;
  /** Hybrid Compute Product Profile Update properties */
  productProfile?: ProductProfileUpdateProperties;
}

export function licenseProfileUpdateSerializer(item: LicenseProfileUpdate): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["softwareAssurance", "esuProfile", "productProfile"])
      ? undefined
      : _licenseProfileUpdatePropertiesSerializer(item),
  };
}

/** Describe the Update properties of a license profile. */
export interface LicenseProfileUpdateProperties {
  /** Specifies if this machine is licensed as part of a Software Assurance agreement. */
  softwareAssuranceCustomer?: boolean;
  /** The resource id of the license. */
  assignedLicense?: string;
  /** Indicates the subscription status of the product. */
  subscriptionStatus?: LicenseProfileSubscriptionStatusUpdate;
  /** Indicates the product type of the license. */
  productType?: LicenseProfileProductType;
  /** The list of product feature updates. */
  productFeatures?: ProductFeatureUpdate[];
}

export function licenseProfileUpdatePropertiesSerializer(
  item: LicenseProfileUpdateProperties,
): any {
  return {
    softwareAssurance: areAllPropsUndefined(item, ["softwareAssuranceCustomer"])
      ? undefined
      : _licenseProfileUpdatePropertiesSoftwareAssuranceSerializer(item),
    esuProfile: areAllPropsUndefined(item, ["assignedLicense"])
      ? undefined
      : _licenseProfileUpdatePropertiesEsuProfileSerializer(item),
    productProfile: areAllPropsUndefined(item, [
      "subscriptionStatus",
      "productType",
      "productFeatures",
    ])
      ? undefined
      : _licenseProfileUpdatePropertiesProductProfileSerializer(item),
  };
}

/** model interface LicenseProfileUpdatePropertiesSoftwareAssurance */
export interface LicenseProfileUpdatePropertiesSoftwareAssurance {
  /** Specifies if this machine is licensed as part of a Software Assurance agreement. */
  softwareAssuranceCustomer?: boolean;
}

export function licenseProfileUpdatePropertiesSoftwareAssuranceSerializer(
  item: LicenseProfileUpdatePropertiesSoftwareAssurance,
): any {
  return { softwareAssuranceCustomer: item["softwareAssuranceCustomer"] };
}

/** Describes the Update properties of a ESU License Profile. */
export interface EsuProfileUpdateProperties {
  /** The resource id of the license. */
  assignedLicense?: string;
}

export function esuProfileUpdatePropertiesSerializer(item: EsuProfileUpdateProperties): any {
  return { assignedLicense: item["assignedLicense"] };
}

/** Describes the Update properties of a Product Profile. */
export interface ProductProfileUpdateProperties {
  /** Indicates the subscription status of the product. */
  subscriptionStatus?: LicenseProfileSubscriptionStatusUpdate;
  /** Indicates the product type of the license. */
  productType?: LicenseProfileProductType;
  /** The list of product feature updates. */
  productFeatures?: ProductFeatureUpdate[];
}

export function productProfileUpdatePropertiesSerializer(
  item: ProductProfileUpdateProperties,
): any {
  return {
    subscriptionStatus: item["subscriptionStatus"],
    productType: item["productType"],
    productFeatures: !item["productFeatures"]
      ? item["productFeatures"]
      : productFeatureUpdateArraySerializer(item["productFeatures"]),
  };
}

/** Indicates the new subscription status of the OS or Product Features. */
export enum KnownLicenseProfileSubscriptionStatusUpdate {
  /** Enable */
  Enable = "Enable",
  /** Disable */
  Disable = "Disable",
}

/**
 * Indicates the new subscription status of the OS or Product Features. \
 * {@link KnownLicenseProfileSubscriptionStatusUpdate} can be used interchangeably with LicenseProfileSubscriptionStatusUpdate,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enable**: Enable \
 * **Disable**: Disable
 */
export type LicenseProfileSubscriptionStatusUpdate = string;

export function productFeatureUpdateArraySerializer(result: Array<ProductFeatureUpdate>): any[] {
  return result.map((item) => {
    return productFeatureUpdateSerializer(item);
  });
}

/** Product Feature */
export interface ProductFeatureUpdate {
  /** Product feature name. */
  name?: string;
  /** Indicates the new status of the product feature. */
  subscriptionStatus?: LicenseProfileSubscriptionStatusUpdate;
}

export function productFeatureUpdateSerializer(item: ProductFeatureUpdate): any {
  return { name: item["name"], subscriptionStatus: item["subscriptionStatus"] };
}

/** Paged collection of LicenseProfile items */
export interface _LicenseProfilesListResult {
  /** The LicenseProfile items on this page */
  value: LicenseProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _licenseProfilesListResultDeserializer(item: any): _LicenseProfilesListResult {
  return {
    value: licenseProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function licenseProfileArraySerializer(result: Array<LicenseProfile>): any[] {
  return result.map((item) => {
    return licenseProfileSerializer(item);
  });
}

export function licenseProfileArrayDeserializer(result: Array<LicenseProfile>): any[] {
  return result.map((item) => {
    return licenseProfileDeserializer(item);
  });
}

/** Describes a Machine Extension Update. */
export interface MachineExtensionUpdate extends ResourceUpdate {
  /** How the extension handler should be forced to update even if the extension configuration has not changed. */
  forceUpdateTag?: string;
  /** The name of the extension handler publisher. */
  publisher?: string;
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  type?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /** Indicates whether the extension should be automatically upgraded by the platform if there is a newer version available. */
  enableAutomaticUpgrade?: boolean;
  /** Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true. */
  autoUpgradeMinorVersion?: boolean;
  /** Json formatted public settings for the extension. */
  settings?: Record<string, any>;
  /** The extension can contain either protectedSettings or protectedSettingsFromKeyVault or no protected settings at all. */
  protectedSettings?: Record<string, any>;
}

export function machineExtensionUpdateSerializer(item: MachineExtensionUpdate): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "forceUpdateTag",
      "publisher",
      "type",
      "typeHandlerVersion",
      "enableAutomaticUpgrade",
      "autoUpgradeMinorVersion",
      "settings",
      "protectedSettings",
    ])
      ? undefined
      : _machineExtensionUpdatePropertiesSerializer(item),
  };
}

/** Describes the properties of a Machine Extension. */
export interface MachineExtensionUpdateProperties {
  /** How the extension handler should be forced to update even if the extension configuration has not changed. */
  forceUpdateTag?: string;
  /** The name of the extension handler publisher. */
  publisher?: string;
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  type?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /** Indicates whether the extension should be automatically upgraded by the platform if there is a newer version available. */
  enableAutomaticUpgrade?: boolean;
  /** Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true. */
  autoUpgradeMinorVersion?: boolean;
  /** Json formatted public settings for the extension. */
  settings?: Record<string, any>;
  /** The extension can contain either protectedSettings or protectedSettingsFromKeyVault or no protected settings at all. */
  protectedSettings?: Record<string, any>;
}

export function machineExtensionUpdatePropertiesSerializer(
  item: MachineExtensionUpdateProperties,
): any {
  return {
    forceUpdateTag: item["forceUpdateTag"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
  };
}

/** Paged collection of MachineExtension items */
export interface _MachineExtensionsListResult {
  /** The MachineExtension items on this page */
  value: MachineExtension[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _machineExtensionsListResultDeserializer(item: any): _MachineExtensionsListResult {
  return {
    value: machineExtensionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Describes a Run Command */
export interface MachineRunCommand extends TrackedResource {
  /** The source of the run command script. */
  source?: MachineRunCommandScriptSource;
  /** The parameters used by the script. */
  parameters?: RunCommandInputParameter[];
  /** The parameters used by the script. */
  protectedParameters?: RunCommandInputParameter[];
  /** Optional. If set to true, provisioning will complete as soon as script starts and will not wait for script to complete. */
  asyncExecution?: boolean;
  /** Specifies the user account on the machine when executing the run command. */
  runAsUser?: string;
  /** Specifies the user account password on the machine when executing the run command. */
  runAsPassword?: string;
  /** The timeout in seconds to execute the run command. */
  timeoutInSeconds?: number;
  /** Specifies the Azure storage blob where script output stream will be uploaded. Use a SAS URI with read, append, create, write access OR use managed identity to provide the VM access to the blob. Refer outputBlobManagedIdentity parameter. */
  outputBlobUri?: string;
  /** Specifies the Azure storage blob where script error stream will be uploaded. Use a SAS URI with read, append, create, write access OR use managed identity to provide the VM access to the blob. Refer errorBlobManagedIdentity parameter. */
  errorBlobUri?: string;
  /** User-assigned managed identity that has access to outputBlobUri storage blob. Use an empty object in case of system-assigned identity. Make sure managed identity has been given access to blob's container with 'Storage Blob Data Contributor' role assignment. In case of user-assigned identity, make sure you add it under VM's identity. For more info on managed identity and Run Command, refer https://aka.ms/ManagedIdentity and https://aka.ms/RunCommandManaged */
  outputBlobManagedIdentity?: RunCommandManagedIdentity;
  /** User-assigned managed identity that has access to errorBlobUri storage blob. Use an empty object in case of system-assigned identity. Make sure managed identity has been given access to blob's container with 'Storage Blob Data Contributor' role assignment. In case of user-assigned identity, make sure you add it under VM's identity. For more info on managed identity and Run Command, refer https://aka.ms/ManagedIdentity and https://aka.ms/RunCommandManaged */
  errorBlobManagedIdentity?: RunCommandManagedIdentity;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** The machine run command instance view. */
  readonly instanceView?: MachineRunCommandInstanceView;
}

export function machineRunCommandSerializer(item: MachineRunCommand): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "source",
      "parameters",
      "protectedParameters",
      "asyncExecution",
      "runAsUser",
      "runAsPassword",
      "timeoutInSeconds",
      "outputBlobUri",
      "errorBlobUri",
      "outputBlobManagedIdentity",
      "errorBlobManagedIdentity",
    ])
      ? undefined
      : _machineRunCommandPropertiesSerializer(item),
  };
}

export function machineRunCommandDeserializer(item: any): MachineRunCommand {
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
    ...(!item["properties"]
      ? item["properties"]
      : _machineRunCommandPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a run command. */
export interface MachineRunCommandProperties {
  /** The source of the run command script. */
  source?: MachineRunCommandScriptSource;
  /** The parameters used by the script. */
  parameters?: RunCommandInputParameter[];
  /** The parameters used by the script. */
  protectedParameters?: RunCommandInputParameter[];
  /** Optional. If set to true, provisioning will complete as soon as script starts and will not wait for script to complete. */
  asyncExecution?: boolean;
  /** Specifies the user account on the machine when executing the run command. */
  runAsUser?: string;
  /** Specifies the user account password on the machine when executing the run command. */
  runAsPassword?: string;
  /** The timeout in seconds to execute the run command. */
  timeoutInSeconds?: number;
  /** Specifies the Azure storage blob where script output stream will be uploaded. Use a SAS URI with read, append, create, write access OR use managed identity to provide the VM access to the blob. Refer outputBlobManagedIdentity parameter. */
  outputBlobUri?: string;
  /** Specifies the Azure storage blob where script error stream will be uploaded. Use a SAS URI with read, append, create, write access OR use managed identity to provide the VM access to the blob. Refer errorBlobManagedIdentity parameter. */
  errorBlobUri?: string;
  /** User-assigned managed identity that has access to outputBlobUri storage blob. Use an empty object in case of system-assigned identity. Make sure managed identity has been given access to blob's container with 'Storage Blob Data Contributor' role assignment. In case of user-assigned identity, make sure you add it under VM's identity. For more info on managed identity and Run Command, refer https://aka.ms/ManagedIdentity and https://aka.ms/RunCommandManaged */
  outputBlobManagedIdentity?: RunCommandManagedIdentity;
  /** User-assigned managed identity that has access to errorBlobUri storage blob. Use an empty object in case of system-assigned identity. Make sure managed identity has been given access to blob's container with 'Storage Blob Data Contributor' role assignment. In case of user-assigned identity, make sure you add it under VM's identity. For more info on managed identity and Run Command, refer https://aka.ms/ManagedIdentity and https://aka.ms/RunCommandManaged */
  errorBlobManagedIdentity?: RunCommandManagedIdentity;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** The machine run command instance view. */
  readonly instanceView?: MachineRunCommandInstanceView;
}

export function machineRunCommandPropertiesSerializer(item: MachineRunCommandProperties): any {
  return {
    source: !item["source"]
      ? item["source"]
      : machineRunCommandScriptSourceSerializer(item["source"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : runCommandInputParameterArraySerializer(item["parameters"]),
    protectedParameters: !item["protectedParameters"]
      ? item["protectedParameters"]
      : runCommandInputParameterArraySerializer(item["protectedParameters"]),
    asyncExecution: item["asyncExecution"],
    runAsUser: item["runAsUser"],
    runAsPassword: item["runAsPassword"],
    timeoutInSeconds: item["timeoutInSeconds"],
    outputBlobUri: item["outputBlobUri"],
    errorBlobUri: item["errorBlobUri"],
    outputBlobManagedIdentity: !item["outputBlobManagedIdentity"]
      ? item["outputBlobManagedIdentity"]
      : runCommandManagedIdentitySerializer(item["outputBlobManagedIdentity"]),
    errorBlobManagedIdentity: !item["errorBlobManagedIdentity"]
      ? item["errorBlobManagedIdentity"]
      : runCommandManagedIdentitySerializer(item["errorBlobManagedIdentity"]),
  };
}

export function machineRunCommandPropertiesDeserializer(item: any): MachineRunCommandProperties {
  return {
    source: !item["source"]
      ? item["source"]
      : machineRunCommandScriptSourceDeserializer(item["source"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : runCommandInputParameterArrayDeserializer(item["parameters"]),
    protectedParameters: !item["protectedParameters"]
      ? item["protectedParameters"]
      : runCommandInputParameterArrayDeserializer(item["protectedParameters"]),
    asyncExecution: item["asyncExecution"],
    runAsUser: item["runAsUser"],
    runAsPassword: item["runAsPassword"],
    timeoutInSeconds: item["timeoutInSeconds"],
    outputBlobUri: item["outputBlobUri"],
    errorBlobUri: item["errorBlobUri"],
    outputBlobManagedIdentity: !item["outputBlobManagedIdentity"]
      ? item["outputBlobManagedIdentity"]
      : runCommandManagedIdentityDeserializer(item["outputBlobManagedIdentity"]),
    errorBlobManagedIdentity: !item["errorBlobManagedIdentity"]
      ? item["errorBlobManagedIdentity"]
      : runCommandManagedIdentityDeserializer(item["errorBlobManagedIdentity"]),
    provisioningState: item["provisioningState"],
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : machineRunCommandInstanceViewDeserializer(item["instanceView"]),
  };
}

/** Describes the script sources for run command. Use only one of script, scriptUri, commandId. */
export interface MachineRunCommandScriptSource {
  /** Specifies the script content to be executed on the machine. */
  script?: string;
  /** Specifies the script download location. It can be either SAS URI of an Azure storage blob with read access or public URI. */
  scriptUri?: string;
  /** Specifies the commandId of predefined built-in script. */
  commandId?: string;
  /** User-assigned managed identity that has access to scriptUri in case of Azure storage blob. Use an empty object in case of system-assigned identity. Make sure the Azure storage blob exists, and managed identity has been given access to blob's container with 'Storage Blob Data Reader' role assignment. In case of user-assigned identity, make sure you add it under VM's identity. For more info on managed identity and Run Command, refer https://aka.ms/ManagedIdentity and https://aka.ms/RunCommandManaged. */
  scriptUriManagedIdentity?: RunCommandManagedIdentity;
}

export function machineRunCommandScriptSourceSerializer(item: MachineRunCommandScriptSource): any {
  return {
    script: item["script"],
    scriptUri: item["scriptUri"],
    commandId: item["commandId"],
    scriptUriManagedIdentity: !item["scriptUriManagedIdentity"]
      ? item["scriptUriManagedIdentity"]
      : runCommandManagedIdentitySerializer(item["scriptUriManagedIdentity"]),
  };
}

export function machineRunCommandScriptSourceDeserializer(
  item: any,
): MachineRunCommandScriptSource {
  return {
    script: item["script"],
    scriptUri: item["scriptUri"],
    commandId: item["commandId"],
    scriptUriManagedIdentity: !item["scriptUriManagedIdentity"]
      ? item["scriptUriManagedIdentity"]
      : runCommandManagedIdentityDeserializer(item["scriptUriManagedIdentity"]),
  };
}

/** Contains clientId or objectId (use only one, not both) of a user-assigned managed identity that has access to storage blob used in Run Command. Use an empty RunCommandManagedIdentity object in case of system-assigned identity. Make sure the Azure storage blob exists in case of scriptUri, and managed identity has been given access to blob's container with 'Storage Blob Data Reader' role assignment with scriptUri blob and 'Storage Blob Data Contributor' for Append blobs(outputBlobUri, errorBlobUri). In case of user assigned identity, make sure you add it under VM's identity. For more info on managed identity and Run Command, refer https://aka.ms/ManagedIdentity and https://aka.ms/RunCommandManaged. */
export interface RunCommandManagedIdentity {
  /** Client Id (GUID value) of the user-assigned managed identity. ObjectId should not be used if this is provided. */
  clientId?: string;
  /** Object Id (GUID value) of the user-assigned managed identity. ClientId should not be used if this is provided. */
  objectId?: string;
}

export function runCommandManagedIdentitySerializer(item: RunCommandManagedIdentity): any {
  return { clientId: item["clientId"], objectId: item["objectId"] };
}

export function runCommandManagedIdentityDeserializer(item: any): RunCommandManagedIdentity {
  return {
    clientId: item["clientId"],
    objectId: item["objectId"],
  };
}

export function runCommandInputParameterArraySerializer(
  result: Array<RunCommandInputParameter>,
): any[] {
  return result.map((item) => {
    return runCommandInputParameterSerializer(item);
  });
}

export function runCommandInputParameterArrayDeserializer(
  result: Array<RunCommandInputParameter>,
): any[] {
  return result.map((item) => {
    return runCommandInputParameterDeserializer(item);
  });
}

/** Describes the properties of a run command parameter. */
export interface RunCommandInputParameter {
  /** The run command parameter name. */
  name: string;
  /** The run command parameter value. */
  value: string;
}

export function runCommandInputParameterSerializer(item: RunCommandInputParameter): any {
  return { name: item["name"], value: item["value"] };
}

export function runCommandInputParameterDeserializer(item: any): RunCommandInputParameter {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** The instance view of a machine run command. */
export interface MachineRunCommandInstanceView {
  /** Script execution status. */
  executionState?: ExecutionState;
  /** Communicate script configuration errors or execution messages. */
  executionMessage?: string;
  /** Exit code returned from script execution. */
  exitCode?: number;
  /** Script output stream. */
  output?: string;
  /** Script error stream. */
  error?: string;
  /** Script start time. */
  startTime?: Date;
  /** Script end time. */
  endTime?: Date;
  /** The  status information. */
  statuses?: ExtensionsResourceStatus[];
}

export function machineRunCommandInstanceViewDeserializer(
  item: any,
): MachineRunCommandInstanceView {
  return {
    executionState: item["executionState"],
    executionMessage: item["executionMessage"],
    exitCode: item["exitCode"],
    output: item["output"],
    error: item["error"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    statuses: !item["statuses"]
      ? item["statuses"]
      : extensionsResourceStatusArrayDeserializer(item["statuses"]),
  };
}

/** Script execution status. */
export enum KnownExecutionState {
  /** Unknown */
  Unknown = "Unknown",
  /** Pending */
  Pending = "Pending",
  /** Running */
  Running = "Running",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** TimedOut */
  TimedOut = "TimedOut",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Script execution status. \
 * {@link KnownExecutionState} can be used interchangeably with ExecutionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **Pending**: Pending \
 * **Running**: Running \
 * **Failed**: Failed \
 * **Succeeded**: Succeeded \
 * **TimedOut**: TimedOut \
 * **Canceled**: Canceled
 */
export type ExecutionState = string;

export function extensionsResourceStatusArrayDeserializer(
  result: Array<ExtensionsResourceStatus>,
): any[] {
  return result.map((item) => {
    return extensionsResourceStatusDeserializer(item);
  });
}

/** Instance view status. */
export interface ExtensionsResourceStatus {
  /** The status code. */
  code?: string;
  /** The level code. */
  level?: ExtensionsStatusLevelTypes;
  /** The short localizable label for the status. */
  displayStatus?: string;
  /** The detailed status message, including for alerts and error messages. */
  message?: string;
  /** The time of the status. */
  time?: Date;
}

export function extensionsResourceStatusDeserializer(item: any): ExtensionsResourceStatus {
  return {
    code: item["code"],
    level: item["level"],
    displayStatus: item["displayStatus"],
    message: item["message"],
    time: !item["time"] ? item["time"] : new Date(item["time"]),
  };
}

/** The level code. */
export type ExtensionsStatusLevelTypes = "Info" | "Warning" | "Error";

/** Paged collection of MachineRunCommand items */
export interface _MachineRunCommandsListResult {
  /** The MachineRunCommand items on this page */
  value: MachineRunCommand[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _machineRunCommandsListResultDeserializer(
  item: any,
): _MachineRunCommandsListResult {
  return {
    value: machineRunCommandArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function machineRunCommandArraySerializer(result: Array<MachineRunCommand>): any[] {
  return result.map((item) => {
    return machineRunCommandSerializer(item);
  });
}

export function machineRunCommandArrayDeserializer(result: Array<MachineRunCommand>): any[] {
  return result.map((item) => {
    return machineRunCommandDeserializer(item);
  });
}

/** Describes an Arc Gateway. */
export interface Gateway extends TrackedResource {
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: ProvisioningState;
  /** A unique, immutable, identifier for the Gateway. */
  readonly gatewayId?: string;
  /** The type of the Gateway resource. */
  gatewayType?: GatewayType;
  /** The endpoint fqdn for the Gateway. */
  readonly gatewayEndpoint?: string;
  /** Specifies the list of features that are enabled for this Gateway. */
  allowedFeatures?: string[];
  /** Specifies the list of domain names that should bypass the gateway. Each entry must be a valid DNS hostname. */
  gatewayBypass?: string[];
}

export function gatewaySerializer(item: Gateway): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["gatewayType", "allowedFeatures", "gatewayBypass"])
      ? undefined
      : _gatewayPropertiesSerializer(item),
  };
}

export function gatewayDeserializer(item: any): Gateway {
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
    ...(!item["properties"]
      ? item["properties"]
      : _gatewayPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a Gateway Profile. */
export interface GatewayProperties {
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: ProvisioningState;
  /** A unique, immutable, identifier for the Gateway. */
  readonly gatewayId?: string;
  /** The type of the Gateway resource. */
  gatewayType?: GatewayType;
  /** The endpoint fqdn for the Gateway. */
  readonly gatewayEndpoint?: string;
  /** Specifies the list of features that are enabled for this Gateway. */
  allowedFeatures?: string[];
  /** Specifies the list of domain names that should bypass the gateway. Each entry must be a valid DNS hostname. */
  gatewayBypass?: string[];
}

export function gatewayPropertiesSerializer(item: GatewayProperties): any {
  return {
    gatewayType: item["gatewayType"],
    allowedFeatures: !item["allowedFeatures"]
      ? item["allowedFeatures"]
      : item["allowedFeatures"].map((p: any) => {
          return p;
        }),
    gatewayBypass: !item["gatewayBypass"]
      ? item["gatewayBypass"]
      : item["gatewayBypass"].map((p: any) => {
          return p;
        }),
  };
}

export function gatewayPropertiesDeserializer(item: any): GatewayProperties {
  return {
    provisioningState: item["provisioningState"],
    gatewayId: item["gatewayId"],
    gatewayType: item["gatewayType"],
    gatewayEndpoint: item["gatewayEndpoint"],
    allowedFeatures: !item["allowedFeatures"]
      ? item["allowedFeatures"]
      : item["allowedFeatures"].map((p: any) => {
          return p;
        }),
    gatewayBypass: !item["gatewayBypass"]
      ? item["gatewayBypass"]
      : item["gatewayBypass"].map((p: any) => {
          return p;
        }),
  };
}

/** The type of the Gateway resource. */
export enum KnownGatewayType {
  /** Public */
  Public = "Public",
}

/**
 * The type of the Gateway resource. \
 * {@link KnownGatewayType} can be used interchangeably with GatewayType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Public**: Public
 */
export type GatewayType = string;

/** Describes a Gateway Update. */
export interface GatewayUpdate extends ResourceUpdate {
  /** Specifies the list of features that are enabled for this Gateway. */
  allowedFeatures?: string[];
  /** Specifies the list of domain names that should bypass the gateway. Each entry must be a valid DNS hostname. */
  gatewayBypass?: string[];
}

export function gatewayUpdateSerializer(item: GatewayUpdate): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["allowedFeatures", "gatewayBypass"])
      ? undefined
      : _gatewayUpdatePropertiesSerializer(item),
  };
}

/** Describes the Update properties of a Gateway Profile. */
export interface GatewayUpdateProperties {
  /** Specifies the list of features that are enabled for this Gateway. */
  allowedFeatures?: string[];
  /** Specifies the list of domain names that should bypass the gateway. Each entry must be a valid DNS hostname. */
  gatewayBypass?: string[];
}

export function gatewayUpdatePropertiesSerializer(item: GatewayUpdateProperties): any {
  return {
    allowedFeatures: !item["allowedFeatures"]
      ? item["allowedFeatures"]
      : item["allowedFeatures"].map((p: any) => {
          return p;
        }),
    gatewayBypass: !item["gatewayBypass"]
      ? item["gatewayBypass"]
      : item["gatewayBypass"].map((p: any) => {
          return p;
        }),
  };
}

/** Paged collection of Gateway items */
export interface _GatewaysListResult {
  /** The Gateway items on this page */
  value: Gateway[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _gatewaysListResultDeserializer(item: any): _GatewaysListResult {
  return {
    value: gatewayArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function gatewayArraySerializer(result: Array<Gateway>): any[] {
  return result.map((item) => {
    return gatewaySerializer(item);
  });
}

export function gatewayArrayDeserializer(result: Array<Gateway>): any[] {
  return result.map((item) => {
    return gatewayDeserializer(item);
  });
}

/** A private link resource */
export interface PrivateLinkResource extends ProxyResource {
  /** Resource properties. */
  properties?: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** Required DNS zone names of the the private link resource. */
  readonly requiredZoneNames?: string[];
}

export function privateLinkResourcePropertiesDeserializer(
  item: any,
): PrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
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

/** The response of a PrivateLinkResource list operation. */
export interface _PrivateLinkResourceListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinkResourceListResultDeserializer(
  item: any,
): _PrivateLinkResourceListResult {
  return {
    value: privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** A private endpoint connection */
export interface PrivateEndpointConnection extends ProxyResource {
  /** Resource properties. */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** Private endpoint which the connection belongs to. */
  privateEndpoint?: PrivateEndpointProperty;
  /** Connection state of the private endpoint connection. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateProperty;
  /** State of the private endpoint connection. */
  readonly provisioningState?: string;
  /** List of group IDs. */
  readonly groupIds?: string[];
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointPropertySerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStatePropertySerializer(
          item["privateLinkServiceConnectionState"],
        ),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointPropertyDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStatePropertyDeserializer(
          item["privateLinkServiceConnectionState"],
        ),
    provisioningState: item["provisioningState"],
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Private endpoint which the connection belongs to. */
export interface PrivateEndpointProperty {
  /** Resource id of the private endpoint. */
  id?: string;
}

export function privateEndpointPropertySerializer(item: PrivateEndpointProperty): any {
  return { id: item["id"] };
}

export function privateEndpointPropertyDeserializer(item: any): PrivateEndpointProperty {
  return {
    id: item["id"],
  };
}

/** State of the private endpoint connection. */
export interface PrivateLinkServiceConnectionStateProperty {
  /** The private link service connection status. */
  status: string;
  /** The private link service connection description. */
  description: string;
  /** The actions required for private link service connection. */
  readonly actionsRequired?: string;
}

export function privateLinkServiceConnectionStatePropertySerializer(
  item: PrivateLinkServiceConnectionStateProperty,
): any {
  return { status: item["status"], description: item["description"] };
}

export function privateLinkServiceConnectionStatePropertyDeserializer(
  item: any,
): PrivateLinkServiceConnectionStateProperty {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** The response of a PrivateEndpointConnection list operation. */
export interface _PrivateEndpointConnectionListResult {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** Properties that define a Network Security Perimeter resource. */
export interface NetworkSecurityPerimeterConfiguration extends ProxyResource {
  /** Current state of this NetworkSecurityPerimeter: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. Values will include Provisioning ,Succeeded, Canceled and Failed. */
  readonly provisioningState?: string;
  /** Provisioning issues. */
  readonly provisioningIssues?: ProvisioningIssue[];
  /** The Network Security Perimeter associated with this configuration. */
  networkSecurityPerimeter?: NetworkSecurityPerimeter;
  /** The Resource Association. */
  resourceAssociation?: ResourceAssociation;
  /** Network Security Perimeter profile */
  profile?: NetworkSecurityPerimeterProfile;
}

export function networkSecurityPerimeterConfigurationDeserializer(
  item: any,
): NetworkSecurityPerimeterConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _networkSecurityPerimeterConfigurationPropertiesDeserializer(item["properties"])),
  };
}

/** Properties that define a Network Security Perimeter resource. */
export interface NetworkSecurityPerimeterConfigurationProperties {
  /** Current state of this NetworkSecurityPerimeter: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. Values will include Provisioning ,Succeeded, Canceled and Failed. */
  readonly provisioningState?: string;
  /** Provisioning issues. */
  readonly provisioningIssues?: ProvisioningIssue[];
  /** The Network Security Perimeter associated with this configuration. */
  networkSecurityPerimeter?: NetworkSecurityPerimeter;
  /** The Resource Association. */
  resourceAssociation?: ResourceAssociation;
  /** Network Security Perimeter profile */
  profile?: NetworkSecurityPerimeterProfile;
}

export function networkSecurityPerimeterConfigurationPropertiesDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationProperties {
  return {
    provisioningState: item["provisioningState"],
    provisioningIssues: !item["provisioningIssues"]
      ? item["provisioningIssues"]
      : provisioningIssueArrayDeserializer(item["provisioningIssues"]),
    networkSecurityPerimeter: !item["networkSecurityPerimeter"]
      ? item["networkSecurityPerimeter"]
      : networkSecurityPerimeterDeserializer(item["networkSecurityPerimeter"]),
    resourceAssociation: !item["resourceAssociation"]
      ? item["resourceAssociation"]
      : resourceAssociationDeserializer(item["resourceAssociation"]),
    profile: !item["profile"]
      ? item["profile"]
      : networkSecurityPerimeterProfileDeserializer(item["profile"]),
  };
}

export function provisioningIssueArrayDeserializer(result: Array<ProvisioningIssue>): any[] {
  return result.map((item) => {
    return provisioningIssueDeserializer(item);
  });
}

/** Details on issues that occurred during provisioning. */
export interface ProvisioningIssue {
  /** Name of the provisioning issue. */
  readonly name?: string;
  /** Issue type */
  readonly issueType?: ProvisioningIssueType;
  /** Severity of the provisioning issue. */
  readonly severity?: ProvisioningIssueSeverity;
  /** Description of the provisioning issue. */
  readonly description?: string;
  /** ARM Ids of the resources that can be associated to the same perimeter to remediate the issue */
  readonly suggestedResourceIds?: string[];
  /** Access rules that can be added to the perimeter to remediate the issue */
  readonly suggestedAccessRules?: AccessRule[];
}

export function provisioningIssueDeserializer(item: any): ProvisioningIssue {
  return {
    name: item["name"],
    ...(!item["properties"]
      ? item["properties"]
      : _provisioningIssuePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a provisioning issue. */
export interface ProvisioningIssueProperties {
  /** Issue type */
  readonly issueType?: ProvisioningIssueType;
  /** Severity of the provisioning issue. */
  readonly severity?: ProvisioningIssueSeverity;
  /** Description of the provisioning issue. */
  readonly description?: string;
  /** ARM Ids of the resources that can be associated to the same perimeter to remediate the issue */
  readonly suggestedResourceIds?: string[];
  /** Access rules that can be added to the perimeter to remediate the issue */
  readonly suggestedAccessRules?: AccessRule[];
}

export function provisioningIssuePropertiesDeserializer(item: any): ProvisioningIssueProperties {
  return {
    issueType: item["issueType"],
    severity: item["severity"],
    description: item["description"],
    suggestedResourceIds: !item["suggestedResourceIds"]
      ? item["suggestedResourceIds"]
      : item["suggestedResourceIds"].map((p: any) => {
          return p;
        }),
    suggestedAccessRules: !item["suggestedAccessRules"]
      ? item["suggestedAccessRules"]
      : accessRuleArrayDeserializer(item["suggestedAccessRules"]),
  };
}

/** Type of provisioning issue. */
export enum KnownProvisioningIssueType {
  /** Perimeter configuration is missing. */
  MissingPerimeterConfiguration = "MissingPerimeterConfiguration",
  /** Identity configuration is missing. */
  MissingIdentityConfiguration = "MissingIdentityConfiguration",
  /** Configuration failed to propagate. */
  ConfigurationPropagationFailure = "ConfigurationPropagationFailure",
  /** Other failure. */
  Other = "Other",
}

/**
 * Type of provisioning issue. \
 * {@link KnownProvisioningIssueType} can be used interchangeably with ProvisioningIssueType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MissingPerimeterConfiguration**: Perimeter configuration is missing. \
 * **MissingIdentityConfiguration**: Identity configuration is missing. \
 * **ConfigurationPropagationFailure**: Configuration failed to propagate. \
 * **Other**: Other failure.
 */
export type ProvisioningIssueType = string;

/** Severity of the provisioning issue. */
export enum KnownProvisioningIssueSeverity {
  /** Warnings can cause connectivity issues after provisioning succeeds. */
  Warning = "Warning",
  /** Errors will cause association provisioning to fail. */
  Error = "Error",
}

/**
 * Severity of the provisioning issue. \
 * {@link KnownProvisioningIssueSeverity} can be used interchangeably with ProvisioningIssueSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Warning**: Warnings can cause connectivity issues after provisioning succeeds. \
 * **Error**: Errors will cause association provisioning to fail.
 */
export type ProvisioningIssueSeverity = string;

export function accessRuleArrayDeserializer(result: Array<AccessRule>): any[] {
  return result.map((item) => {
    return accessRuleDeserializer(item);
  });
}

/** Access rule. */
export interface AccessRule {
  /** Name of the access rule. */
  readonly name?: string;
  /** Direction of the access rule. */
  readonly direction?: AccessRuleDirection;
  /** Address prefixes that are allowed access. */
  readonly addressPrefixes?: string[];
}

export function accessRuleDeserializer(item: any): AccessRule {
  return {
    name: item["name"],
    ...(!item["properties"]
      ? item["properties"]
      : _accessRulePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of an access rule. */
export interface AccessRuleProperties {
  /** Direction of the access rule. */
  readonly direction?: AccessRuleDirection;
  /** Address prefixes that are allowed access. */
  readonly addressPrefixes?: string[];
}

export function accessRulePropertiesDeserializer(item: any): AccessRuleProperties {
  return {
    direction: item["direction"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
  };
}

/** Indicates direction of an access rule. */
export enum KnownAccessRuleDirection {
  /** Traffic originates outside of network. */
  Inbound = "Inbound",
  /** Traffic originates inside the network */
  Outbound = "Outbound",
}

/**
 * Indicates direction of an access rule. \
 * {@link KnownAccessRuleDirection} can be used interchangeably with AccessRuleDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inbound**: Traffic originates outside of network. \
 * **Outbound**: Traffic originates inside the network
 */
export type AccessRuleDirection = string;

/** Properties that define a Network Security Perimeter resource. */
export interface NetworkSecurityPerimeter {
  /** Azure resource Id */
  readonly id?: string;
  /** Guid of the Network Security Perimeter */
  readonly perimeterGuid?: string;
  /** Regional location of the perimeter */
  readonly location?: string;
}

export function networkSecurityPerimeterDeserializer(item: any): NetworkSecurityPerimeter {
  return {
    id: item["id"],
    perimeterGuid: item["perimeterGuid"],
    location: item["location"],
  };
}

/** Properties that define a Resource Association. */
export interface ResourceAssociation {
  /** Name of the Resource Association */
  readonly name?: string;
  /** The access mode */
  readonly accessMode?: AccessMode;
}

export function resourceAssociationDeserializer(item: any): ResourceAssociation {
  return {
    name: item["name"],
    accessMode: item["accessMode"],
  };
}

/** Property that impacts a resource's logging behavior and its connectivity with other resources and public networks. */
export enum KnownAccessMode {
  /** Indicates that resource access is controlled by the NSP definition. */
  Enforced = "enforced",
  /** Dry run mode, where traffic is evaluated against NSP Rules, logged but not enforced. */
  Audit = "audit",
  /** Enables traffic evaluation to fall back to resource-specific firewall configurations. */
  Learning = "learning",
}

/**
 * Property that impacts a resource's logging behavior and its connectivity with other resources and public networks. \
 * {@link KnownAccessMode} can be used interchangeably with AccessMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enforced**: Indicates that resource access is controlled by the NSP definition. \
 * **audit**: Dry run mode, where traffic is evaluated against NSP Rules, logged but not enforced. \
 * **learning**: Enables traffic evaluation to fall back to resource-specific firewall configurations.
 */
export type AccessMode = string;

/** Network Security Perimeter profile */
export interface NetworkSecurityPerimeterProfile {
  /** Name of the resource */
  readonly name?: string;
  /** Access rules version number */
  readonly accessRulesVersion?: number;
  /** Collection of access rules for the profile */
  readonly accessRules?: AccessRule[];
  /** Diagnostic settings version number */
  readonly diagnosticSettingsVersion?: number;
  /** Collection of enabled log categories for the profile */
  readonly enabledLogCategories?: string[];
}

export function networkSecurityPerimeterProfileDeserializer(
  item: any,
): NetworkSecurityPerimeterProfile {
  return {
    name: item["name"],
    accessRulesVersion: item["accessRulesVersion"],
    accessRules: !item["accessRules"]
      ? item["accessRules"]
      : accessRuleArrayDeserializer(item["accessRules"]),
    diagnosticSettingsVersion: item["diagnosticSettingsVersion"],
    enabledLogCategories: !item["enabledLogCategories"]
      ? item["enabledLogCategories"]
      : item["enabledLogCategories"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a NetworkSecurityPerimeterConfiguration list operation. */
export interface _NetworkSecurityPerimeterConfigurationListResult {
  /** The NetworkSecurityPerimeterConfiguration items on this page */
  value: NetworkSecurityPerimeterConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkSecurityPerimeterConfigurationListResultDeserializer(
  item: any,
): _NetworkSecurityPerimeterConfigurationListResult {
  return {
    value: networkSecurityPerimeterConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkSecurityPerimeterConfigurationArrayDeserializer(
  result: Array<NetworkSecurityPerimeterConfiguration>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterConfigurationDeserializer(item);
  });
}

/** Result of network security perimeter configurations. */
export interface NetworkSecurityPerimeterConfigurationReconcileResult {
  /** The URL of the resource used to check the status of the asynchronous operation. */
  readonly location?: string;
}

export function networkSecurityPerimeterConfigurationReconcileResultDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationReconcileResult {
  return {
    location: item["location"],
  };
}

/** model interface PrivateLinkScopeValidationDetails */
export interface PrivateLinkScopeValidationDetails {
  /** Azure resource Id */
  readonly id?: string;
  /** Indicates whether machines associated with the private link scope can also use public Azure Arc service endpoints. */
  publicNetworkAccess?: PublicNetworkAccessType;
  /** List of Private Endpoint Connection details. */
  connectionDetails?: ConnectionDetail[];
}

export function privateLinkScopeValidationDetailsDeserializer(
  item: any,
): PrivateLinkScopeValidationDetails {
  return {
    id: item["id"],
    publicNetworkAccess: item["publicNetworkAccess"],
    connectionDetails: !item["connectionDetails"]
      ? item["connectionDetails"]
      : connectionDetailArrayDeserializer(item["connectionDetails"]),
  };
}

/** The network access policy to determine if Azure Arc agents can use public Azure Arc service endpoints. Defaults to disabled (access to Azure Arc services only via private link). */
export enum KnownPublicNetworkAccessType {
  /** Allows Azure Arc agents to communicate with Azure Arc services over both public (internet) and private endpoints. */
  Enabled = "Enabled",
  /** Does not allow Azure Arc agents to communicate with Azure Arc services over public (internet) endpoints. The agents must use the private link. */
  Disabled = "Disabled",
  /** Azure Arc agent communication with Azure Arc services over public (internet) is enforced by Network Security Perimeter (NSP). */
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * The network access policy to determine if Azure Arc agents can use public Azure Arc service endpoints. Defaults to disabled (access to Azure Arc services only via private link). \
 * {@link KnownPublicNetworkAccessType} can be used interchangeably with PublicNetworkAccessType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Allows Azure Arc agents to communicate with Azure Arc services over both public (internet) and private endpoints. \
 * **Disabled**: Does not allow Azure Arc agents to communicate with Azure Arc services over public (internet) endpoints. The agents must use the private link. \
 * **SecuredByPerimeter**: Azure Arc agent communication with Azure Arc services over public (internet) is enforced by Network Security Perimeter (NSP).
 */
export type PublicNetworkAccessType = string;

export function connectionDetailArrayDeserializer(result: Array<ConnectionDetail>): any[] {
  return result.map((item) => {
    return connectionDetailDeserializer(item);
  });
}

/** model interface ConnectionDetail */
export interface ConnectionDetail {
  /** Azure resource Id */
  readonly id?: string;
  /** The private endpoint connection private ip address */
  readonly privateIpAddress?: string;
  /** The private endpoint connection link identifier */
  readonly linkIdentifier?: string;
  /** The private endpoint connection group id */
  readonly groupId?: string;
  /** The private endpoint connection member name */
  readonly memberName?: string;
}

export function connectionDetailDeserializer(item: any): ConnectionDetail {
  return {
    id: item["id"],
    privateIpAddress: item["privateIpAddress"],
    linkIdentifier: item["linkIdentifier"],
    groupId: item["groupId"],
    memberName: item["memberName"],
  };
}

/** An Azure Arc PrivateLinkScope definition. */
export interface HybridComputePrivateLinkScope extends TrackedResource {
  /** Properties that define a Azure Arc PrivateLinkScope resource. */
  properties?: HybridComputePrivateLinkScopeProperties;
}

export function hybridComputePrivateLinkScopeSerializer(item: HybridComputePrivateLinkScope): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : hybridComputePrivateLinkScopePropertiesSerializer(item["properties"]),
  };
}

export function hybridComputePrivateLinkScopeDeserializer(
  item: any,
): HybridComputePrivateLinkScope {
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
      : hybridComputePrivateLinkScopePropertiesDeserializer(item["properties"]),
  };
}

/** Properties that define a Azure Arc PrivateLinkScope resource. */
export interface HybridComputePrivateLinkScopeProperties {
  /** Indicates whether machines associated with the private link scope can also use public Azure Arc service endpoints. */
  publicNetworkAccess?: PublicNetworkAccessType;
  /** Current state of this PrivateLinkScope: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. Values will include Provisioning ,Succeeded, Canceled and Failed. */
  readonly provisioningState?: string;
  /** The Guid id of the private link scope. */
  readonly privateLinkScopeId?: string;
  /** The collection of associated Private Endpoint Connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnectionDataModel[];
  /** Enable private link validation for an Azure Arc Extension. */
  serviceExtensions?: ServiceExtension[];
}

export function hybridComputePrivateLinkScopePropertiesSerializer(
  item: HybridComputePrivateLinkScopeProperties,
): any {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    serviceExtensions: !item["serviceExtensions"]
      ? item["serviceExtensions"]
      : serviceExtensionArraySerializer(item["serviceExtensions"]),
  };
}

export function hybridComputePrivateLinkScopePropertiesDeserializer(
  item: any,
): HybridComputePrivateLinkScopeProperties {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    provisioningState: item["provisioningState"],
    privateLinkScopeId: item["privateLinkScopeId"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionDataModelArrayDeserializer(item["privateEndpointConnections"]),
    serviceExtensions: !item["serviceExtensions"]
      ? item["serviceExtensions"]
      : serviceExtensionArrayDeserializer(item["serviceExtensions"]),
  };
}

export function privateEndpointConnectionDataModelArrayDeserializer(
  result: Array<PrivateEndpointConnectionDataModel>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDataModelDeserializer(item);
  });
}

/** The Data Model for a Private Endpoint Connection associated with a Private Link Scope */
export interface PrivateEndpointConnectionDataModel {
  /** The ARM Resource Id of the Private Endpoint. */
  readonly id?: string;
  /** The Name of the Private Endpoint. */
  readonly name?: string;
  /** Azure resource type */
  readonly type?: string;
  /** The Private Endpoint Connection properties. */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionDataModelDeserializer(
  item: any,
): PrivateEndpointConnectionDataModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesDeserializer(item["properties"]),
  };
}

export function serviceExtensionArraySerializer(result: Array<ServiceExtension>): any[] {
  return result.map((item) => {
    return serviceExtensionSerializer(item);
  });
}

export function serviceExtensionArrayDeserializer(result: Array<ServiceExtension>): any[] {
  return result.map((item) => {
    return serviceExtensionDeserializer(item);
  });
}

/** Enable private link validation for an Azure Arc Extension */
export interface ServiceExtension {
  /** The name of the Azure Arc Extension. */
  serviceExtensionType?: ServiceExtensionType;
  /** The network access policy to determine if the specified Azure Arc Extension can use public Azure Arc Extension service endpoints. */
  serviceExtensionPublicNetworkAccess?: ServiceExtensionPublicNetworkAccess;
}

export function serviceExtensionSerializer(item: ServiceExtension): any {
  return {
    serviceExtensionType: !item["serviceExtensionType"]
      ? item["serviceExtensionType"]
      : serviceExtensionTypeSerializer(item["serviceExtensionType"]),
    serviceExtensionPublicNetworkAccess: item["serviceExtensionPublicNetworkAccess"],
  };
}

export function serviceExtensionDeserializer(item: any): ServiceExtension {
  return {
    serviceExtensionType: !item["serviceExtensionType"]
      ? item["serviceExtensionType"]
      : serviceExtensionTypeDeserializer(item["serviceExtensionType"]),
    serviceExtensionPublicNetworkAccess: item["serviceExtensionPublicNetworkAccess"],
  };
}

/** The name of the Azure Arc Extension. */
export type ServiceExtensionType = string;

export function serviceExtensionTypeSerializer(item: ServiceExtensionType): any {
  return item;
}

export function serviceExtensionTypeDeserializer(item: any): ServiceExtensionType {
  return item;
}

/** The network access policy to determine if the specified Azure Arc Extension can use public Azure Arc Extension service endpoints. */
export enum KnownServiceExtensionPublicNetworkAccess {
  /** Allows Azure Arc Extension agents to communicate with Azure Arc services over both public (internet) and private endpoints. */
  Enabled = "Enabled",
  /** Does not allow Azure Arc Extension agents to communicate with Azure Arc services over public (internet) endpoints. The agents must use the private link. */
  Disabled = "Disabled",
}

/**
 * The network access policy to determine if the specified Azure Arc Extension can use public Azure Arc Extension service endpoints. \
 * {@link KnownServiceExtensionPublicNetworkAccess} can be used interchangeably with ServiceExtensionPublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Allows Azure Arc Extension agents to communicate with Azure Arc services over both public (internet) and private endpoints. \
 * **Disabled**: Does not allow Azure Arc Extension agents to communicate with Azure Arc services over public (internet) endpoints. The agents must use the private link.
 */
export type ServiceExtensionPublicNetworkAccess = string;

/** A container holding only the Tags for a resource, allowing the user to update the tags on a PrivateLinkScope instance. */
export interface TagsResource {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function tagsResourceSerializer(item: TagsResource): any {
  return { tags: item["tags"] };
}

/** The response of a HybridComputePrivateLinkScope list operation. */
export interface _HybridComputePrivateLinkScopeListResult {
  /** The HybridComputePrivateLinkScope items on this page */
  value: HybridComputePrivateLinkScope[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _hybridComputePrivateLinkScopeListResultDeserializer(
  item: any,
): _HybridComputePrivateLinkScopeListResult {
  return {
    value: hybridComputePrivateLinkScopeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function hybridComputePrivateLinkScopeArraySerializer(
  result: Array<HybridComputePrivateLinkScope>,
): any[] {
  return result.map((item) => {
    return hybridComputePrivateLinkScopeSerializer(item);
  });
}

export function hybridComputePrivateLinkScopeArrayDeserializer(
  result: Array<HybridComputePrivateLinkScope>,
): any[] {
  return result.map((item) => {
    return hybridComputePrivateLinkScopeDeserializer(item);
  });
}

/** Describes a Extension Metadata */
export interface ExtensionValue extends ProxyResource {
  /** The version of the Extension being received. */
  readonly version?: string;
  /** The type of the Extension being received. */
  readonly extensionType?: string;
  /** The publisher of the Extension being received. */
  readonly publisher?: string;
}

export function extensionValueDeserializer(item: any): ExtensionValue {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _extensionValuePropertiesDeserializer(item["properties"])),
  };
}

/** Describes Extension Metadata properties */
export interface ExtensionValueProperties {
  /** The version of the Extension being received. */
  readonly version?: string;
  /** The type of the Extension being received. */
  readonly extensionType?: string;
  /** The publisher of the Extension being received. */
  readonly publisher?: string;
}

export function extensionValuePropertiesDeserializer(item: any): ExtensionValueProperties {
  return {
    version: item["version"],
    extensionType: item["extensionType"],
    publisher: item["publisher"],
  };
}

/** The List Extension Metadata response. */
export interface _ExtensionValueListResult {
  /** The list of extension metadata */
  readonly value?: ExtensionValue[];
  /** The URL to get the next set of results. */
  readonly nextLink?: string;
}

export function _extensionValueListResultDeserializer(item: any): _ExtensionValueListResult {
  return {
    value: !item["value"] ? item["value"] : extensionValueArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function extensionValueArrayDeserializer(result: Array<ExtensionValue>): any[] {
  return result.map((item) => {
    return extensionValueDeserializer(item);
  });
}

/** Describes an Extension Metadata. */
export interface ExtensionValueV2 extends ProxyResource {
  /** The version of the Extension being received. */
  readonly version?: string;
  /** The type of the Extension being received. */
  readonly extensionType?: string;
  /** The publisher of the Extension being received. */
  readonly publisher?: string;
  /** A list of locations where the extension packages can be found. */
  readonly extensionUris?: string[];
  /** Location of the signature files for the extension. */
  readonly extensionSignatureUri?: string;
  /** The operating system (Windows, Linux, etc.) this extension supports. */
  readonly operatingSystem?: string;
  /** Architectures (x64, arms64, etc.) that this extension supports. */
  readonly architecture?: string[];
}

export function extensionValueV2Deserializer(item: any): ExtensionValueV2 {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _extensionValueV2PropertiesDeserializer(item["properties"])),
  };
}

/** Describes Extension Metadata properties. */
export interface ExtensionValueV2Properties extends ExtensionValueProperties {
  /** A list of locations where the extension packages can be found. */
  readonly extensionUris?: string[];
  /** Location of the signature files for the extension. */
  readonly extensionSignatureUri?: string;
  /** The operating system (Windows, Linux, etc.) this extension supports. */
  readonly operatingSystem?: string;
  /** Architectures (x64, arms64, etc.) that this extension supports. */
  readonly architecture?: string[];
}

export function extensionValueV2PropertiesDeserializer(item: any): ExtensionValueV2Properties {
  return {
    version: item["version"],
    extensionType: item["extensionType"],
    publisher: item["publisher"],
    extensionUris: !item["extensionUris"]
      ? item["extensionUris"]
      : item["extensionUris"].map((p: any) => {
          return p;
        }),
    extensionSignatureUri: item["extensionSignatureUri"],
    operatingSystem: item["operatingSystem"],
    architecture: !item["architecture"]
      ? item["architecture"]
      : item["architecture"].map((p: any) => {
          return p;
        }),
  };
}

/** The List Extension Metadata response. */
export interface _ExtensionValueListResultV2 {
  /** The ExtensionValueV2 items on this page */
  readonly value: ExtensionValueV2[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _extensionValueListResultV2Deserializer(item: any): _ExtensionValueListResultV2 {
  return {
    value: extensionValueV2ArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function extensionValueV2ArrayDeserializer(result: Array<ExtensionValueV2>): any[] {
  return result.map((item) => {
    return extensionValueV2Deserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface Settings extends ProxyResource {
  /** Azure resource tenant Id */
  readonly tenantId?: string;
  /** Settings Gateway properties */
  gatewayProperties?: SettingsGatewayProperties;
}

export function settingsSerializer(item: Settings): any {
  return {
    properties: areAllPropsUndefined(item, ["gatewayProperties"])
      ? undefined
      : _settingsPropertiesSerializer(item),
  };
}

export function settingsDeserializer(item: any): Settings {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _settingsPropertiesDeserializer(item["properties"])),
  };
}

/** Settings properties */
export interface SettingsProperties {
  /** Azure resource tenant Id */
  readonly tenantId?: string;
  /** Associated Gateway Resource Id */
  gatewayResourceId?: string;
}

export function settingsPropertiesSerializer(item: SettingsProperties): any {
  return {
    gatewayProperties: areAllPropsUndefined(item, ["gatewayResourceId"])
      ? undefined
      : _settingsPropertiesGatewayPropertiesSerializer(item),
  };
}

export function settingsPropertiesDeserializer(item: any): SettingsProperties {
  return {
    tenantId: item["tenantId"],
    ...(!item["gatewayProperties"]
      ? item["gatewayProperties"]
      : _settingsPropertiesGatewayPropertiesDeserializer(item["gatewayProperties"])),
  };
}

/** Settings Gateway properties */
export interface SettingsGatewayProperties {
  /** Associated Gateway Resource Id */
  gatewayResourceId?: string;
}

export function settingsGatewayPropertiesSerializer(item: SettingsGatewayProperties): any {
  return { gatewayResourceId: item["gatewayResourceId"] };
}

export function settingsGatewayPropertiesDeserializer(item: any): SettingsGatewayProperties {
  return {
    gatewayResourceId: item["gatewayResourceId"],
  };
}

/** The List of Extension Types. */
export interface _ExtensionTypeListResult {
  /** The ExtensionType items on this page */
  readonly value: ExtensionType[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _extensionTypeListResultDeserializer(item: any): _ExtensionTypeListResult {
  return {
    value: extensionTypeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function extensionTypeArrayDeserializer(result: Array<ExtensionType>): any[] {
  return result.map((item) => {
    return extensionTypeDeserializer(item);
  });
}

/** Describes an Extension Type. */
export interface ExtensionType {
  /** The ID of the extension type. */
  id?: string;
  /** The name of the extension type. */
  name?: string;
}

export function extensionTypeDeserializer(item: any): ExtensionType {
  return {
    id: item["id"],
    name: item["name"],
  };
}

/** The List of Extension Publishers. */
export interface _ExtensionPublisherListResult {
  /** The ExtensionPublisher items on this page */
  readonly value: ExtensionPublisher[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _extensionPublisherListResultDeserializer(
  item: any,
): _ExtensionPublisherListResult {
  return {
    value: extensionPublisherArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function extensionPublisherArrayDeserializer(result: Array<ExtensionPublisher>): any[] {
  return result.map((item) => {
    return extensionPublisherDeserializer(item);
  });
}

/** Describes an Extension Publisher. */
export interface ExtensionPublisher {
  /** The ID of the extension publisher. */
  id?: string;
  /** The name of the extension publisher. */
  name?: string;
}

export function extensionPublisherDeserializer(item: any): ExtensionPublisher {
  return {
    id: item["id"],
    name: item["name"],
  };
}

/** Known values of {@link InstanceViewTypes} that the service accepts. */
export enum KnownInstanceViewTypes {
  /** instanceView */
  InstanceView = "instanceView",
}

/** Type of InstanceViewTypes */
export type InstanceViewTypes = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-09-16-preview API version. */
  V20250916Preview = "2025-09-16-preview",
  /** The 2026-02-12-preview API version. */
  V20260212Preview = "2026-02-12-preview",
  /** The 2026-06-04-preview API version. */
  V20260604Preview = "2026-06-04-preview",
  /** The 2026-06-16-preview API version. */
  V20260616Preview = "2026-06-16-preview",
}

export function _licensePropertiesSerializer(item: License): any {
  return {
    tenantId: item["tenantId"],
    licenseType: item["licenseType"],
    licenseDetails: !item["licenseDetails"]
      ? item["licenseDetails"]
      : licenseDetailsSerializer(item["licenseDetails"]),
  };
}

export function _licensePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    tenantId: item["tenantId"],
    licenseType: item["licenseType"],
    licenseDetails: !item["licenseDetails"]
      ? item["licenseDetails"]
      : licenseDetailsDeserializer(item["licenseDetails"]),
  };
}

export function _licenseUpdatePropertiesLicenseDetailsSerializer(
  item: LicenseUpdateProperties,
): any {
  return {
    state: item["state"],
    target: item["target"],
    edition: item["edition"],
    type: item["type"],
    processors: item["processors"],
  };
}

export function _licenseUpdatePropertiesSerializer(item: LicenseUpdate): any {
  return {
    licenseType: item["licenseType"],
    licenseDetails: !item["licenseDetails"]
      ? item["licenseDetails"]
      : licenseUpdatePropertiesLicenseDetailsSerializer(item["licenseDetails"]),
  };
}

export function _osProfileWindowsConfigurationPatchSettingsSerializer(
  item: OSProfileWindowsConfiguration,
): any {
  return {
    assessmentMode: item["assessmentMode"],
    patchMode: item["patchMode"],
    enableHotpatching: item["enableHotpatching"],
  };
}

export function _osProfileWindowsConfigurationPatchSettingsDeserializer(item: any) {
  return {
    assessmentMode: item["assessmentMode"],
    patchMode: item["patchMode"],
    enableHotpatching: item["enableHotpatching"],
    status: !item["status"] ? item["status"] : patchSettingsStatusDeserializer(item["status"]),
  };
}

export function _osProfileLinuxConfigurationPatchSettingsSerializer(
  item: OSProfileLinuxConfiguration,
): any {
  return {
    assessmentMode: item["assessmentMode"],
    patchMode: item["patchMode"],
    enableHotpatching: item["enableHotpatching"],
  };
}

export function _osProfileLinuxConfigurationPatchSettingsDeserializer(item: any) {
  return {
    assessmentMode: item["assessmentMode"],
    patchMode: item["patchMode"],
    enableHotpatching: item["enableHotpatching"],
    status: !item["status"] ? item["status"] : patchSettingsStatusDeserializer(item["status"]),
  };
}

export function _licenseProfileMachineInstanceViewSoftwareAssuranceDeserializer(item: any) {
  return {
    softwareAssuranceCustomer: item["softwareAssuranceCustomer"],
  };
}

export function _licenseProfileMachineInstanceViewProductProfileSerializer(
  item: LicenseProfileMachineInstanceView,
): any {
  return {
    subscriptionStatus: item["subscriptionStatus"],
    productType: item["productType"],
    productFeatures: !item["productFeatures"]
      ? item["productFeatures"]
      : productFeatureArraySerializer(item["productFeatures"]),
  };
}

export function _licenseProfileMachineInstanceViewProductProfileDeserializer(item: any) {
  return {
    subscriptionStatus: item["subscriptionStatus"],
    productType: item["productType"],
    enrollmentDate: !item["enrollmentDate"]
      ? item["enrollmentDate"]
      : new Date(item["enrollmentDate"]),
    billingStartDate: !item["billingStartDate"]
      ? item["billingStartDate"]
      : new Date(item["billingStartDate"]),
    disenrollmentDate: !item["disenrollmentDate"]
      ? item["disenrollmentDate"]
      : new Date(item["disenrollmentDate"]),
    billingEndDate: !item["billingEndDate"]
      ? item["billingEndDate"]
      : new Date(item["billingEndDate"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    productFeatures: !item["productFeatures"]
      ? item["productFeatures"]
      : productFeatureArrayDeserializer(item["productFeatures"]),
  };
}

export function _machinePropertiesSerializer(item: Machine): any {
  return {
    locationData: !item["locationData"]
      ? item["locationData"]
      : locationDataSerializer(item["locationData"]),
    serviceStatuses: !item["serviceStatuses"]
      ? item["serviceStatuses"]
      : serviceStatusesSerializer(item["serviceStatuses"]),
    cloudMetadata: !item["cloudMetadata"]
      ? item["cloudMetadata"]
      : cloudMetadataSerializer(item["cloudMetadata"]),
    agentUpgrade: !item["agentUpgrade"]
      ? item["agentUpgrade"]
      : agentUpgradeSerializer(item["agentUpgrade"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : osProfileSerializer(item["osProfile"]),
    licenseProfile: !item["licenseProfile"]
      ? item["licenseProfile"]
      : licenseProfileMachineInstanceViewSerializer(item["licenseProfile"]),
    vmId: item["vmId"],
    clientPublicKey: item["clientPublicKey"],
    identityKeyStore: item["identityKeyStore"],
    tpmEkCertificate: item["tpmEkCertificate"],
    osType: item["osType"],
    extensions: !item["extensions"]
      ? item["extensions"]
      : machineExtensionInstanceViewArraySerializer(item["extensions"]),
    privateLinkScopeResourceId: item["privateLinkScopeResourceId"],
    parentClusterResourceId: item["parentClusterResourceId"],
    hardwareResourceId: item["hardwareResourceId"],
    mssqlDiscovered: item["mssqlDiscovered"],
  };
}

export function _machinePropertiesDeserializer(item: any) {
  return {
    locationData: !item["locationData"]
      ? item["locationData"]
      : locationDataDeserializer(item["locationData"]),
    agentConfiguration: !item["agentConfiguration"]
      ? item["agentConfiguration"]
      : agentConfigurationDeserializer(item["agentConfiguration"]),
    serviceStatuses: !item["serviceStatuses"]
      ? item["serviceStatuses"]
      : serviceStatusesDeserializer(item["serviceStatuses"]),
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : hardwareProfileDeserializer(item["hardwareProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : storageProfileDeserializer(item["storageProfile"]),
    firmwareProfile: !item["firmwareProfile"]
      ? item["firmwareProfile"]
      : firmwareProfileDeserializer(item["firmwareProfile"]),
    cloudMetadata: !item["cloudMetadata"]
      ? item["cloudMetadata"]
      : cloudMetadataDeserializer(item["cloudMetadata"]),
    agentUpgrade: !item["agentUpgrade"]
      ? item["agentUpgrade"]
      : agentUpgradeDeserializer(item["agentUpgrade"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : osProfileDeserializer(item["osProfile"]),
    licenseProfile: !item["licenseProfile"]
      ? item["licenseProfile"]
      : licenseProfileMachineInstanceViewDeserializer(item["licenseProfile"]),
    statusReason: item["statusReason"],
    provisioningState: item["provisioningState"],
    status: item["status"],
    lastStatusChange: !item["lastStatusChange"]
      ? item["lastStatusChange"]
      : new Date(item["lastStatusChange"]),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailArrayDeserializer(item["errorDetails"]),
    agentVersion: item["agentVersion"],
    vmId: item["vmId"],
    displayName: item["displayName"],
    machineFqdn: item["machineFqdn"],
    clientPublicKey: item["clientPublicKey"],
    identityKeyStore: item["identityKeyStore"],
    tpmEkCertificate: item["tpmEkCertificate"],
    osName: item["osName"],
    osVersion: item["osVersion"],
    osType: item["osType"],
    vmUuid: item["vmUuid"],
    extensions: !item["extensions"]
      ? item["extensions"]
      : machineExtensionInstanceViewArrayDeserializer(item["extensions"]),
    osSku: item["osSku"],
    osEdition: item["osEdition"],
    domainName: item["domainName"],
    adFqdn: item["adFqdn"],
    dnsFqdn: item["dnsFqdn"],
    privateLinkScopeResourceId: item["privateLinkScopeResourceId"],
    parentClusterResourceId: item["parentClusterResourceId"],
    hardwareResourceId: item["hardwareResourceId"],
    mssqlDiscovered: item["mssqlDiscovered"],
    detectedProperties: !item["detectedProperties"]
      ? item["detectedProperties"]
      : Object.fromEntries(
          Object.entries(item["detectedProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileDeserializer(item["networkProfile"]),
  };
}

export function _machineUpdatePropertiesSerializer(item: MachineUpdate): any {
  return {
    locationData: !item["locationData"]
      ? item["locationData"]
      : locationDataSerializer(item["locationData"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : osProfileSerializer(item["osProfile"]),
    cloudMetadata: !item["cloudMetadata"]
      ? item["cloudMetadata"]
      : cloudMetadataSerializer(item["cloudMetadata"]),
    agentUpgrade: !item["agentUpgrade"]
      ? item["agentUpgrade"]
      : agentUpgradeSerializer(item["agentUpgrade"]),
    parentClusterResourceId: item["parentClusterResourceId"],
    privateLinkScopeResourceId: item["privateLinkScopeResourceId"],
    identityKeyStore: item["identityKeyStore"],
    tpmEkCertificate: item["tpmEkCertificate"],
  };
}

export function _licenseProfilePropertiesSoftwareAssuranceSerializer(
  item: LicenseProfileProperties,
): any {
  return { softwareAssuranceCustomer: item["softwareAssuranceCustomer"] };
}

export function _licenseProfilePropertiesSoftwareAssuranceDeserializer(item: any) {
  return {
    softwareAssuranceCustomer: item["softwareAssuranceCustomer"],
  };
}

export function _licenseProfilePropertiesEsuProfileSerializer(item: LicenseProfileProperties): any {
  return { assignedLicense: item["assignedLicense"] };
}

export function _licenseProfilePropertiesEsuProfileDeserializer(item: any) {
  return {
    serverType: item["serverType"],
    esuEligibility: item["esuEligibility"],
    esuKeyState: item["esuKeyState"],
    assignedLicenseImmutableId: item["assignedLicenseImmutableId"],
    esuKeys: !item["esuKeys"] ? item["esuKeys"] : esuKeyArrayDeserializer(item["esuKeys"]),
    assignedLicense: item["assignedLicense"],
  };
}

export function _licenseProfilePropertiesProductProfileSerializer(
  item: LicenseProfileProperties,
): any {
  return {
    subscriptionStatus: item["subscriptionStatus"],
    productType: item["productType"],
    productFeatures: !item["productFeatures"]
      ? item["productFeatures"]
      : productFeatureArraySerializer(item["productFeatures"]),
  };
}

export function _licenseProfilePropertiesProductProfileDeserializer(item: any) {
  return {
    subscriptionStatus: item["subscriptionStatus"],
    productType: item["productType"],
    enrollmentDate: !item["enrollmentDate"]
      ? item["enrollmentDate"]
      : new Date(item["enrollmentDate"]),
    billingStartDate: !item["billingStartDate"]
      ? item["billingStartDate"]
      : new Date(item["billingStartDate"]),
    disenrollmentDate: !item["disenrollmentDate"]
      ? item["disenrollmentDate"]
      : new Date(item["disenrollmentDate"]),
    billingEndDate: !item["billingEndDate"]
      ? item["billingEndDate"]
      : new Date(item["billingEndDate"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    productFeatures: !item["productFeatures"]
      ? item["productFeatures"]
      : productFeatureArrayDeserializer(item["productFeatures"]),
  };
}

export function _licenseProfilePropertiesSerializer(item: LicenseProfile): any {
  return {
    softwareAssurance: !item["softwareAssurance"]
      ? item["softwareAssurance"]
      : licenseProfilePropertiesSoftwareAssuranceSerializer(item["softwareAssurance"]),
    esuProfile: !item["esuProfile"]
      ? item["esuProfile"]
      : licenseProfileArmEsuPropertiesSerializer(item["esuProfile"]),
    productProfile: !item["productProfile"]
      ? item["productProfile"]
      : licenseProfileArmProductProfilePropertiesSerializer(item["productProfile"]),
  };
}

export function _licenseProfilePropertiesDeserializer(item: any) {
  return {
    softwareAssurance: !item["softwareAssurance"]
      ? item["softwareAssurance"]
      : licenseProfilePropertiesSoftwareAssuranceDeserializer(item["softwareAssurance"]),
    esuProfile: !item["esuProfile"]
      ? item["esuProfile"]
      : licenseProfileArmEsuPropertiesDeserializer(item["esuProfile"]),
    productProfile: !item["productProfile"]
      ? item["productProfile"]
      : licenseProfileArmProductProfilePropertiesDeserializer(item["productProfile"]),
    provisioningState: item["provisioningState"],
  };
}

export function _licenseProfileUpdatePropertiesSoftwareAssuranceSerializer(
  item: LicenseProfileUpdateProperties,
): any {
  return { softwareAssuranceCustomer: item["softwareAssuranceCustomer"] };
}

export function _licenseProfileUpdatePropertiesEsuProfileSerializer(
  item: LicenseProfileUpdateProperties,
): any {
  return { assignedLicense: item["assignedLicense"] };
}

export function _licenseProfileUpdatePropertiesProductProfileSerializer(
  item: LicenseProfileUpdateProperties,
): any {
  return {
    subscriptionStatus: item["subscriptionStatus"],
    productType: item["productType"],
    productFeatures: !item["productFeatures"]
      ? item["productFeatures"]
      : productFeatureUpdateArraySerializer(item["productFeatures"]),
  };
}

export function _licenseProfileUpdatePropertiesSerializer(item: LicenseProfileUpdate): any {
  return {
    softwareAssurance: !item["softwareAssurance"]
      ? item["softwareAssurance"]
      : licenseProfileUpdatePropertiesSoftwareAssuranceSerializer(item["softwareAssurance"]),
    esuProfile: !item["esuProfile"]
      ? item["esuProfile"]
      : esuProfileUpdatePropertiesSerializer(item["esuProfile"]),
    productProfile: !item["productProfile"]
      ? item["productProfile"]
      : productProfileUpdatePropertiesSerializer(item["productProfile"]),
  };
}

export function _machineExtensionUpdatePropertiesSerializer(item: MachineExtensionUpdate): any {
  return {
    forceUpdateTag: item["forceUpdateTag"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
  };
}

export function _machineRunCommandPropertiesSerializer(item: MachineRunCommand): any {
  return {
    source: !item["source"]
      ? item["source"]
      : machineRunCommandScriptSourceSerializer(item["source"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : runCommandInputParameterArraySerializer(item["parameters"]),
    protectedParameters: !item["protectedParameters"]
      ? item["protectedParameters"]
      : runCommandInputParameterArraySerializer(item["protectedParameters"]),
    asyncExecution: item["asyncExecution"],
    runAsUser: item["runAsUser"],
    runAsPassword: item["runAsPassword"],
    timeoutInSeconds: item["timeoutInSeconds"],
    outputBlobUri: item["outputBlobUri"],
    errorBlobUri: item["errorBlobUri"],
    outputBlobManagedIdentity: !item["outputBlobManagedIdentity"]
      ? item["outputBlobManagedIdentity"]
      : runCommandManagedIdentitySerializer(item["outputBlobManagedIdentity"]),
    errorBlobManagedIdentity: !item["errorBlobManagedIdentity"]
      ? item["errorBlobManagedIdentity"]
      : runCommandManagedIdentitySerializer(item["errorBlobManagedIdentity"]),
  };
}

export function _machineRunCommandPropertiesDeserializer(item: any) {
  return {
    source: !item["source"]
      ? item["source"]
      : machineRunCommandScriptSourceDeserializer(item["source"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : runCommandInputParameterArrayDeserializer(item["parameters"]),
    protectedParameters: !item["protectedParameters"]
      ? item["protectedParameters"]
      : runCommandInputParameterArrayDeserializer(item["protectedParameters"]),
    asyncExecution: item["asyncExecution"],
    runAsUser: item["runAsUser"],
    runAsPassword: item["runAsPassword"],
    timeoutInSeconds: item["timeoutInSeconds"],
    outputBlobUri: item["outputBlobUri"],
    errorBlobUri: item["errorBlobUri"],
    outputBlobManagedIdentity: !item["outputBlobManagedIdentity"]
      ? item["outputBlobManagedIdentity"]
      : runCommandManagedIdentityDeserializer(item["outputBlobManagedIdentity"]),
    errorBlobManagedIdentity: !item["errorBlobManagedIdentity"]
      ? item["errorBlobManagedIdentity"]
      : runCommandManagedIdentityDeserializer(item["errorBlobManagedIdentity"]),
    provisioningState: item["provisioningState"],
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : machineRunCommandInstanceViewDeserializer(item["instanceView"]),
  };
}

export function _gatewayPropertiesSerializer(item: Gateway): any {
  return {
    gatewayType: item["gatewayType"],
    allowedFeatures: !item["allowedFeatures"]
      ? item["allowedFeatures"]
      : item["allowedFeatures"].map((p: any) => {
          return p;
        }),
    gatewayBypass: !item["gatewayBypass"]
      ? item["gatewayBypass"]
      : item["gatewayBypass"].map((p: any) => {
          return p;
        }),
  };
}

export function _gatewayPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    gatewayId: item["gatewayId"],
    gatewayType: item["gatewayType"],
    gatewayEndpoint: item["gatewayEndpoint"],
    allowedFeatures: !item["allowedFeatures"]
      ? item["allowedFeatures"]
      : item["allowedFeatures"].map((p: any) => {
          return p;
        }),
    gatewayBypass: !item["gatewayBypass"]
      ? item["gatewayBypass"]
      : item["gatewayBypass"].map((p: any) => {
          return p;
        }),
  };
}

export function _gatewayUpdatePropertiesSerializer(item: GatewayUpdate): any {
  return {
    allowedFeatures: !item["allowedFeatures"]
      ? item["allowedFeatures"]
      : item["allowedFeatures"].map((p: any) => {
          return p;
        }),
    gatewayBypass: !item["gatewayBypass"]
      ? item["gatewayBypass"]
      : item["gatewayBypass"].map((p: any) => {
          return p;
        }),
  };
}

export function _accessRulePropertiesDeserializer(item: any) {
  return {
    direction: item["direction"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
  };
}

export function _provisioningIssuePropertiesDeserializer(item: any) {
  return {
    issueType: item["issueType"],
    severity: item["severity"],
    description: item["description"],
    suggestedResourceIds: !item["suggestedResourceIds"]
      ? item["suggestedResourceIds"]
      : item["suggestedResourceIds"].map((p: any) => {
          return p;
        }),
    suggestedAccessRules: !item["suggestedAccessRules"]
      ? item["suggestedAccessRules"]
      : accessRuleArrayDeserializer(item["suggestedAccessRules"]),
  };
}

export function _networkSecurityPerimeterConfigurationPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    provisioningIssues: !item["provisioningIssues"]
      ? item["provisioningIssues"]
      : provisioningIssueArrayDeserializer(item["provisioningIssues"]),
    networkSecurityPerimeter: !item["networkSecurityPerimeter"]
      ? item["networkSecurityPerimeter"]
      : networkSecurityPerimeterDeserializer(item["networkSecurityPerimeter"]),
    resourceAssociation: !item["resourceAssociation"]
      ? item["resourceAssociation"]
      : resourceAssociationDeserializer(item["resourceAssociation"]),
    profile: !item["profile"]
      ? item["profile"]
      : networkSecurityPerimeterProfileDeserializer(item["profile"]),
  };
}

export function _extensionValuePropertiesDeserializer(item: any) {
  return {
    version: item["version"],
    extensionType: item["extensionType"],
    publisher: item["publisher"],
  };
}

export function _extensionValueV2PropertiesDeserializer(item: any) {
  return {
    version: item["version"],
    extensionType: item["extensionType"],
    publisher: item["publisher"],
    extensionUris: !item["extensionUris"]
      ? item["extensionUris"]
      : item["extensionUris"].map((p: any) => {
          return p;
        }),
    extensionSignatureUri: item["extensionSignatureUri"],
    operatingSystem: item["operatingSystem"],
    architecture: !item["architecture"]
      ? item["architecture"]
      : item["architecture"].map((p: any) => {
          return p;
        }),
  };
}

export function _settingsPropertiesGatewayPropertiesSerializer(item: SettingsProperties): any {
  return { gatewayResourceId: item["gatewayResourceId"] };
}

export function _settingsPropertiesGatewayPropertiesDeserializer(item: any) {
  return {
    gatewayResourceId: item["gatewayResourceId"],
  };
}

export function _settingsPropertiesSerializer(item: Settings): any {
  return {
    gatewayProperties: !item["gatewayProperties"]
      ? item["gatewayProperties"]
      : settingsGatewayPropertiesSerializer(item["gatewayProperties"]),
  };
}

export function _settingsPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    gatewayProperties: !item["gatewayProperties"]
      ? item["gatewayProperties"]
      : settingsGatewayPropertiesDeserializer(item["gatewayProperties"]),
  };
}
