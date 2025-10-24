// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Result of the List Operations operation */
export interface _OperationsListResult {
  /** The link used to get the next page of operations. */
  nextLink?: string;
  /** A collection of operations */
  value?: Operation[];
}

export function _operationsListResultDeserializer(item: any): _OperationsListResult {
  return {
    nextLink: item["nextLink"],
    value: !item["value"] ? item["value"] : operationArrayDeserializer(item["value"]),
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

/** Localized display information for and operation. */
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

/** An error response received from the Azure Maintenance service. */
export interface MaintenanceError {
  /** Details of the error */
  error?: ErrorDetails;
}

export function maintenanceErrorDeserializer(item: any): MaintenanceError {
  return {
    error: !item["error"] ? item["error"] : errorDetailsDeserializer(item["error"]),
  };
}

/** An error response details received from the Azure Maintenance service. */
export interface ErrorDetails {
  /** Service-defined error code. This code serves as a sub-status for the HTTP error code specified in the response. */
  code?: string;
  /** Human-readable representation of the error. */
  message?: string;
}

export function errorDetailsDeserializer(item: any): ErrorDetails {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Maintenance configuration record type */
export interface MaintenanceConfiguration extends ProxyResource {
  /** Gets or sets properties of the resource */
  properties?: MaintenanceConfigurationProperties;
  /** Gets or sets location of the resource */
  location?: string;
  /** Gets or sets tags of the resource */
  tags?: Record<string, string>;
}

export function maintenanceConfigurationSerializer(item: MaintenanceConfiguration): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : maintenanceConfigurationPropertiesSerializer(item["properties"]),
    location: item["location"],
    tags: item["tags"],
  };
}

export function maintenanceConfigurationDeserializer(item: any): MaintenanceConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : maintenanceConfigurationPropertiesDeserializer(item["properties"]),
    location: item["location"],
    tags: item["tags"],
  };
}

/** Properties for maintenance configuration */
export interface MaintenanceConfigurationProperties {
  /** Gets or sets namespace of the resource */
  namespace?: string;
  /** Gets or sets extensionProperties of the maintenanceConfiguration */
  extensionProperties?: Record<string, string>;
  /** Gets or sets maintenanceScope of the configuration */
  maintenanceScope?: MaintenanceScope;
  /** Definition of a MaintenanceWindow */
  maintenanceWindow?: MaintenanceWindow;
  /** Gets or sets the visibility of the configuration. The default value is 'Custom' */
  visibility?: Visibility;
  /** The input parameters to be passed to the patch run operation. */
  installPatches?: InputPatchConfiguration;
}

export function maintenanceConfigurationPropertiesSerializer(
  item: MaintenanceConfigurationProperties,
): any {
  return {
    namespace: item["namespace"],
    extensionProperties: item["extensionProperties"],
    maintenanceScope: item["maintenanceScope"],
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowSerializer(item["maintenanceWindow"]),
    visibility: item["visibility"],
    installPatches: !item["installPatches"]
      ? item["installPatches"]
      : inputPatchConfigurationSerializer(item["installPatches"]),
  };
}

export function maintenanceConfigurationPropertiesDeserializer(
  item: any,
): MaintenanceConfigurationProperties {
  return {
    namespace: item["namespace"],
    extensionProperties: item["extensionProperties"],
    maintenanceScope: item["maintenanceScope"],
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowDeserializer(item["maintenanceWindow"]),
    visibility: item["visibility"],
    installPatches: !item["installPatches"]
      ? item["installPatches"]
      : inputPatchConfigurationDeserializer(item["installPatches"]),
  };
}

/** Gets or sets maintenanceScope of the configuration */
export enum KnownMaintenanceScope {
  /** This maintenance scope controls installation of azure platform updates i.e. services on physical nodes hosting customer VMs. */
  Host = "Host",
  /** This maintenance scope controls the default update maintenance of the Azure Resource */
  Resource = "Resource",
  /** This maintenance scope controls os image installation on VM/VMSS */
  OSImage = "OSImage",
  /** This maintenance scope controls extension installation on VM/VMSS */
  Extension = "Extension",
  /** This maintenance scope controls installation of windows and linux packages on VM/VMSS */
  InGuestPatch = "InGuestPatch",
  /** This maintenance scope controls installation of SQL server platform updates. */
  Sqldb = "SQLDB",
  /** This maintenance scope controls installation of SQL managed instance platform update. */
  SQLManagedInstance = "SQLManagedInstance",
}

/**
 * Gets or sets maintenanceScope of the configuration \
 * {@link KnownMaintenanceScope} can be used interchangeably with MaintenanceScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Host**: This maintenance scope controls installation of azure platform updates i.e. services on physical nodes hosting customer VMs. \
 * **Resource**: This maintenance scope controls the default update maintenance of the Azure Resource \
 * **OSImage**: This maintenance scope controls os image installation on VM\/VMSS \
 * **Extension**: This maintenance scope controls extension installation on VM\/VMSS \
 * **InGuestPatch**: This maintenance scope controls installation of windows and linux packages on VM\/VMSS \
 * **SQLDB**: This maintenance scope controls installation of SQL server platform updates. \
 * **SQLManagedInstance**: This maintenance scope controls installation of SQL managed instance platform update.
 */
export type MaintenanceScope = string;

/** Definition of a MaintenanceWindow */
export interface MaintenanceWindow {
  /** Effective start date of the maintenance window in YYYY-MM-DD hh:mm format. The start date can be set to either the current date or future date. The window will be created in the time zone provided and adjusted to daylight savings according to that time zone. */
  startDateTime?: string;
  /** Effective expiration date of the maintenance window in YYYY-MM-DD hh:mm format. The window will be created in the time zone provided and adjusted to daylight savings according to that time zone. Expiration date must be set to a future date. If not provided, it will be set to the maximum datetime 9999-12-31 23:59:59. */
  expirationDateTime?: string;
  /** Duration of the maintenance window in HH:mm format. If not provided, default value will be used based on maintenance scope provided. Example: 05:00. */
  duration?: string;
  /** Name of the timezone. List of timezones can be obtained by executing [System.TimeZoneInfo]::GetSystemTimeZones() in PowerShell. Example: Pacific Standard Time, UTC, W. Europe Standard Time, Korea Standard Time, Cen. Australia Standard Time. */
  timeZone?: string;
  /** Rate at which a Maintenance window is expected to recur. The rate can be expressed as daily, weekly, or monthly schedules. Daily schedule are formatted as recurEvery: [Frequency as integer]['Day(s)']. If no frequency is provided, the default frequency is 1. Daily schedule examples are recurEvery: Day, recurEvery: 3Days.  Weekly schedule are formatted as recurEvery: [Frequency as integer]['Week(s)'] [Optional comma separated list of weekdays Monday-Sunday]. Weekly schedule examples are recurEvery: 3Weeks, recurEvery: Week Saturday,Sunday. Monthly schedules are formatted as [Frequency as integer]['Month(s)'] [Comma separated list of month days] or [Frequency as integer]['Month(s)'] [Week of Month (First, Second, Third, Fourth, Last)] [Weekday Monday-Sunday] [Optional Offset(No. of days)]. Offset value must be between -6 to 6 inclusive. Monthly schedule examples are recurEvery: Month, recurEvery: 2Months, recurEvery: Month day23,day24, recurEvery: Month Last Sunday, recurEvery: Month Fourth Monday, recurEvery: Month Last Sunday Offset-3, recurEvery: Month Third Sunday Offset6. */
  recurEvery?: string;
}

export function maintenanceWindowSerializer(item: MaintenanceWindow): any {
  return {
    startDateTime: item["startDateTime"],
    expirationDateTime: item["expirationDateTime"],
    duration: item["duration"],
    timeZone: item["timeZone"],
    recurEvery: item["recurEvery"],
  };
}

export function maintenanceWindowDeserializer(item: any): MaintenanceWindow {
  return {
    startDateTime: item["startDateTime"],
    expirationDateTime: item["expirationDateTime"],
    duration: item["duration"],
    timeZone: item["timeZone"],
    recurEvery: item["recurEvery"],
  };
}

/** Gets or sets the visibility of the configuration. The default value is 'Custom' */
export enum KnownVisibility {
  /** Only visible to users with permissions. */
  Custom = "Custom",
  /** Visible to all users. */
  Public = "Public",
}

/**
 * Gets or sets the visibility of the configuration. The default value is 'Custom' \
 * {@link KnownVisibility} can be used interchangeably with Visibility,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Custom**: Only visible to users with permissions. \
 * **Public**: Visible to all users.
 */
export type Visibility = string;

/** Input configuration for a patch run */
export interface InputPatchConfiguration {
  /** Possible reboot preference as defined by the user based on which it would be decided to reboot the machine or not after the patch operation is completed. */
  rebootSetting?: RebootOptions;
  /** Input parameters specific to patching a Windows machine. For Linux machines, do not pass this property. */
  windowsParameters?: InputWindowsParameters;
  /** Input parameters specific to patching Linux machine. For Windows machines, do not pass this property. */
  linuxParameters?: InputLinuxParameters;
}

export function inputPatchConfigurationSerializer(item: InputPatchConfiguration): any {
  return {
    rebootSetting: item["rebootSetting"],
    windowsParameters: !item["windowsParameters"]
      ? item["windowsParameters"]
      : inputWindowsParametersSerializer(item["windowsParameters"]),
    linuxParameters: !item["linuxParameters"]
      ? item["linuxParameters"]
      : inputLinuxParametersSerializer(item["linuxParameters"]),
  };
}

export function inputPatchConfigurationDeserializer(item: any): InputPatchConfiguration {
  return {
    rebootSetting: item["rebootSetting"],
    windowsParameters: !item["windowsParameters"]
      ? item["windowsParameters"]
      : inputWindowsParametersDeserializer(item["windowsParameters"]),
    linuxParameters: !item["linuxParameters"]
      ? item["linuxParameters"]
      : inputLinuxParametersDeserializer(item["linuxParameters"]),
  };
}

/** Possible reboot preference as defined by the user based on which it would be decided to reboot the machine or not after the patch operation is completed. */
export enum KnownRebootOptions {
  /** IfRequired */
  IfRequired = "IfRequired",
  /** Never */
  Never = "Never",
  /** Always */
  Always = "Always",
}

/**
 * Possible reboot preference as defined by the user based on which it would be decided to reboot the machine or not after the patch operation is completed. \
 * {@link KnownRebootOptions} can be used interchangeably with RebootOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IfRequired** \
 * **Never** \
 * **Always**
 */
export type RebootOptions = string;

/** Input properties for patching a Windows machine. */
export interface InputWindowsParameters {
  /** Windows KBID to be excluded for patching. */
  kbNumbersToExclude?: string[];
  /** Windows KBID to be included for patching. */
  kbNumbersToInclude?: string[];
  /** Classification category of patches to be patched. Allowed values are 'Critical', 'Security', 'UpdateRollup', 'FeaturePack', 'ServicePack', 'Definition', 'Tools', and 'Updates'. */
  classificationsToInclude?: string[];
  /** Exclude patches which need reboot */
  excludeKbsRequiringReboot?: boolean;
}

export function inputWindowsParametersSerializer(item: InputWindowsParameters): any {
  return {
    kbNumbersToExclude: !item["kbNumbersToExclude"]
      ? item["kbNumbersToExclude"]
      : item["kbNumbersToExclude"].map((p: any) => {
          return p;
        }),
    kbNumbersToInclude: !item["kbNumbersToInclude"]
      ? item["kbNumbersToInclude"]
      : item["kbNumbersToInclude"].map((p: any) => {
          return p;
        }),
    classificationsToInclude: !item["classificationsToInclude"]
      ? item["classificationsToInclude"]
      : item["classificationsToInclude"].map((p: any) => {
          return p;
        }),
    excludeKbsRequiringReboot: item["excludeKbsRequiringReboot"],
  };
}

export function inputWindowsParametersDeserializer(item: any): InputWindowsParameters {
  return {
    kbNumbersToExclude: !item["kbNumbersToExclude"]
      ? item["kbNumbersToExclude"]
      : item["kbNumbersToExclude"].map((p: any) => {
          return p;
        }),
    kbNumbersToInclude: !item["kbNumbersToInclude"]
      ? item["kbNumbersToInclude"]
      : item["kbNumbersToInclude"].map((p: any) => {
          return p;
        }),
    classificationsToInclude: !item["classificationsToInclude"]
      ? item["classificationsToInclude"]
      : item["classificationsToInclude"].map((p: any) => {
          return p;
        }),
    excludeKbsRequiringReboot: item["excludeKbsRequiringReboot"],
  };
}

/** Input properties for patching a Linux machine. */
export interface InputLinuxParameters {
  /** Package names to be excluded for patching. */
  packageNameMasksToExclude?: string[];
  /** Package names to be included for patching. */
  packageNameMasksToInclude?: string[];
  /** Classification category of patches to be patched. Allowed values are 'Critical', 'Security', and 'Other'. */
  classificationsToInclude?: string[];
}

export function inputLinuxParametersSerializer(item: InputLinuxParameters): any {
  return {
    packageNameMasksToExclude: !item["packageNameMasksToExclude"]
      ? item["packageNameMasksToExclude"]
      : item["packageNameMasksToExclude"].map((p: any) => {
          return p;
        }),
    packageNameMasksToInclude: !item["packageNameMasksToInclude"]
      ? item["packageNameMasksToInclude"]
      : item["packageNameMasksToInclude"].map((p: any) => {
          return p;
        }),
    classificationsToInclude: !item["classificationsToInclude"]
      ? item["classificationsToInclude"]
      : item["classificationsToInclude"].map((p: any) => {
          return p;
        }),
  };
}

export function inputLinuxParametersDeserializer(item: any): InputLinuxParameters {
  return {
    packageNameMasksToExclude: !item["packageNameMasksToExclude"]
      ? item["packageNameMasksToExclude"]
      : item["packageNameMasksToExclude"].map((p: any) => {
          return p;
        }),
    packageNameMasksToInclude: !item["packageNameMasksToInclude"]
      ? item["packageNameMasksToInclude"]
      : item["packageNameMasksToInclude"].map((p: any) => {
          return p;
        }),
    classificationsToInclude: !item["classificationsToInclude"]
      ? item["classificationsToInclude"]
      : item["classificationsToInclude"].map((p: any) => {
          return p;
        }),
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

/** Response for MaintenanceConfigurations list */
export interface _ListMaintenanceConfigurationsResult {
  /** The list of maintenance Configurations */
  value?: MaintenanceConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listMaintenanceConfigurationsResultDeserializer(
  item: any,
): _ListMaintenanceConfigurationsResult {
  return {
    value: !item["value"]
      ? item["value"]
      : maintenanceConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function maintenanceConfigurationArraySerializer(
  result: Array<MaintenanceConfiguration>,
): any[] {
  return result.map((item) => {
    return maintenanceConfigurationSerializer(item);
  });
}

export function maintenanceConfigurationArrayDeserializer(
  result: Array<MaintenanceConfiguration>,
): any[] {
  return result.map((item) => {
    return maintenanceConfigurationDeserializer(item);
  });
}

/** Apply Update request */
export interface ApplyUpdate extends ProxyResource {
  /** Properties of the apply update */
  properties?: ApplyUpdateProperties;
}

export function applyUpdateSerializer(item: ApplyUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : applyUpdatePropertiesSerializer(item["properties"]),
  };
}

export function applyUpdateDeserializer(item: any): ApplyUpdate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : applyUpdatePropertiesDeserializer(item["properties"]),
  };
}

/** Properties for apply update */
export interface ApplyUpdateProperties {
  /** The status */
  status?: UpdateStatus;
  /** The resourceId */
  resourceId?: string;
  /** Last Update time */
  lastUpdateTime?: Date;
}

export function applyUpdatePropertiesSerializer(item: ApplyUpdateProperties): any {
  return {
    status: item["status"],
    resourceId: item["resourceId"],
    lastUpdateTime: !item["lastUpdateTime"]
      ? item["lastUpdateTime"]
      : item["lastUpdateTime"].toISOString(),
  };
}

export function applyUpdatePropertiesDeserializer(item: any): ApplyUpdateProperties {
  return {
    status: item["status"],
    resourceId: item["resourceId"],
    lastUpdateTime: !item["lastUpdateTime"]
      ? item["lastUpdateTime"]
      : new Date(item["lastUpdateTime"]),
  };
}

/** The status */
export enum KnownUpdateStatus {
  /** There are pending updates to be installed. */
  Pending = "Pending",
  /** Updates installation are in progress. */
  InProgress = "InProgress",
  /** All updates are successfully applied. */
  Completed = "Completed",
  /** Updates installation failed but are ready to retry again. */
  RetryNow = "RetryNow",
  /** Updates installation failed and should be retried later. */
  RetryLater = "RetryLater",
  /** No updates are pending. */
  NoUpdatesPending = "NoUpdatesPending",
  /** Cancel the schedule and stop creating PMR for resources part of it. Applicable to Maintenance Configuration resource type only. */
  Cancel = "Cancel",
  /** Send the Cancelled response to the user if request came to cancel the schedule. Applicable to Maintenance Configuration resource type only. */
  Cancelled = "Cancelled",
}

/**
 * The status \
 * {@link KnownUpdateStatus} can be used interchangeably with UpdateStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: There are pending updates to be installed. \
 * **InProgress**: Updates installation are in progress. \
 * **Completed**: All updates are successfully applied. \
 * **RetryNow**: Updates installation failed but are ready to retry again. \
 * **RetryLater**: Updates installation failed and should be retried later. \
 * **NoUpdatesPending**: No updates are pending. \
 * **Cancel**: Cancel the schedule and stop creating PMR for resources part of it. Applicable to Maintenance Configuration resource type only. \
 * **Cancelled**: Send the Cancelled response to the user if request came to cancel the schedule. Applicable to Maintenance Configuration resource type only.
 */
export type UpdateStatus = string;

/** Response for ApplyUpdate list */
export interface _ListApplyUpdate {
  /** The list of apply updates */
  value?: ApplyUpdate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listApplyUpdateDeserializer(item: any): _ListApplyUpdate {
  return {
    value: !item["value"] ? item["value"] : applyUpdateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applyUpdateArraySerializer(result: Array<ApplyUpdate>): any[] {
  return result.map((item) => {
    return applyUpdateSerializer(item);
  });
}

export function applyUpdateArrayDeserializer(result: Array<ApplyUpdate>): any[] {
  return result.map((item) => {
    return applyUpdateDeserializer(item);
  });
}

/** Configuration Assignment */
export interface ConfigurationAssignment extends ProxyResource {
  /** Properties of the configuration assignment */
  properties?: ConfigurationAssignmentProperties;
  /** Location of the resource */
  location?: string;
}

export function configurationAssignmentSerializer(item: ConfigurationAssignment): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : configurationAssignmentPropertiesSerializer(item["properties"]),
    location: item["location"],
  };
}

export function configurationAssignmentDeserializer(item: any): ConfigurationAssignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : configurationAssignmentPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Properties for configuration assignment */
export interface ConfigurationAssignmentProperties {
  /** The maintenance configuration Id */
  maintenanceConfigurationId?: string;
  /** The unique resourceId */
  resourceId?: string;
  /** Properties of the configuration assignment */
  filter?: ConfigurationAssignmentFilterProperties;
}

export function configurationAssignmentPropertiesSerializer(
  item: ConfigurationAssignmentProperties,
): any {
  return {
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    resourceId: item["resourceId"],
    filter: !item["filter"]
      ? item["filter"]
      : configurationAssignmentFilterPropertiesSerializer(item["filter"]),
  };
}

export function configurationAssignmentPropertiesDeserializer(
  item: any,
): ConfigurationAssignmentProperties {
  return {
    maintenanceConfigurationId: item["maintenanceConfigurationId"],
    resourceId: item["resourceId"],
    filter: !item["filter"]
      ? item["filter"]
      : configurationAssignmentFilterPropertiesDeserializer(item["filter"]),
  };
}

/** Azure query for the update configuration. */
export interface ConfigurationAssignmentFilterProperties {
  /** List of allowed resources. */
  resourceTypes?: string[];
  /** List of allowed resource groups. */
  resourceGroups?: string[];
  /** List of allowed operating systems. */
  osTypes?: string[];
  /** List of locations to scope the query to. */
  locations?: string[];
  /** Tag settings for the VM. */
  tagSettings?: TagSettingsProperties;
}

export function configurationAssignmentFilterPropertiesSerializer(
  item: ConfigurationAssignmentFilterProperties,
): any {
  return {
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : item["resourceTypes"].map((p: any) => {
          return p;
        }),
    resourceGroups: !item["resourceGroups"]
      ? item["resourceGroups"]
      : item["resourceGroups"].map((p: any) => {
          return p;
        }),
    osTypes: !item["osTypes"]
      ? item["osTypes"]
      : item["osTypes"].map((p: any) => {
          return p;
        }),
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    tagSettings: !item["tagSettings"]
      ? item["tagSettings"]
      : tagSettingsPropertiesSerializer(item["tagSettings"]),
  };
}

export function configurationAssignmentFilterPropertiesDeserializer(
  item: any,
): ConfigurationAssignmentFilterProperties {
  return {
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : item["resourceTypes"].map((p: any) => {
          return p;
        }),
    resourceGroups: !item["resourceGroups"]
      ? item["resourceGroups"]
      : item["resourceGroups"].map((p: any) => {
          return p;
        }),
    osTypes: !item["osTypes"]
      ? item["osTypes"]
      : item["osTypes"].map((p: any) => {
          return p;
        }),
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    tagSettings: !item["tagSettings"]
      ? item["tagSettings"]
      : tagSettingsPropertiesDeserializer(item["tagSettings"]),
  };
}

/** Tag filter information for the VM. */
export interface TagSettingsProperties {
  /** Dictionary of tags with its list of values. */
  tags?: Record<string, string[]>;
  /** Filter VMs by Any or All specified tags. */
  filterOperator?: TagOperators;
}

export function tagSettingsPropertiesSerializer(item: TagSettingsProperties): any {
  return { tags: item["tags"], filterOperator: item["filterOperator"] };
}

export function tagSettingsPropertiesDeserializer(item: any): TagSettingsProperties {
  return {
    tags: item["tags"],
    filterOperator: item["filterOperator"],
  };
}

/** Filter VMs by Any or All specified tags. */
export type TagOperators = "All" | "Any";

/** Response for ConfigurationAssignments list */
export interface _ListConfigurationAssignmentsResult {
  /** The list of configuration Assignments */
  value?: ConfigurationAssignment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listConfigurationAssignmentsResultDeserializer(
  item: any,
): _ListConfigurationAssignmentsResult {
  return {
    value: !item["value"] ? item["value"] : configurationAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function configurationAssignmentArraySerializer(
  result: Array<ConfigurationAssignment>,
): any[] {
  return result.map((item) => {
    return configurationAssignmentSerializer(item);
  });
}

export function configurationAssignmentArrayDeserializer(
  result: Array<ConfigurationAssignment>,
): any[] {
  return result.map((item) => {
    return configurationAssignmentDeserializer(item);
  });
}

/** Response of scheduled event acknowledge */
export interface ScheduledEventApproveResponse {
  /** Successfully Approved */
  value?: string;
}

export function scheduledEventApproveResponseDeserializer(
  item: any,
): ScheduledEventApproveResponse {
  return {
    value: item["value"],
  };
}

/** Response for Updates list */
export interface _ListUpdatesResult {
  /** The pending updates */
  value?: Update[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listUpdatesResultDeserializer(item: any): _ListUpdatesResult {
  return {
    value: !item["value"] ? item["value"] : updateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function updateArrayDeserializer(result: Array<Update>): any[] {
  return result.map((item) => {
    return updateDeserializer(item);
  });
}

/** Maintenance update on a resource */
export interface Update {
  /** The impact area */
  maintenanceScope?: MaintenanceScope;
  /** The impact type */
  impactType?: ImpactType;
  /** The status */
  status?: UpdateStatus;
  /** Duration of impact in seconds */
  impactDurationInSec?: number;
  /** Time when Azure will start force updates if not self-updated by customer before this time */
  notBefore?: Date;
  /** Properties of the apply update */
  properties?: UpdateProperties;
}

export function updateDeserializer(item: any): Update {
  return {
    maintenanceScope: item["maintenanceScope"],
    impactType: item["impactType"],
    status: item["status"],
    impactDurationInSec: item["impactDurationInSec"],
    notBefore: !item["notBefore"] ? item["notBefore"] : new Date(item["notBefore"]),
    properties: !item["properties"]
      ? item["properties"]
      : updatePropertiesDeserializer(item["properties"]),
  };
}

/** The impact type */
export enum KnownImpactType {
  /** Pending updates has no impact on resource. */
  None = "None",
  /** Pending updates can freeze network or disk io operation on resource. */
  Freeze = "Freeze",
  /** Pending updates can cause resource to restart. */
  Restart = "Restart",
  /** Pending updates can redeploy resource. */
  Redeploy = "Redeploy",
}

/**
 * The impact type \
 * {@link KnownImpactType} can be used interchangeably with ImpactType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Pending updates has no impact on resource. \
 * **Freeze**: Pending updates can freeze network or disk io operation on resource. \
 * **Restart**: Pending updates can cause resource to restart. \
 * **Redeploy**: Pending updates can redeploy resource.
 */
export type ImpactType = string;

/** Properties for update */
export interface UpdateProperties {
  /** The resourceId */
  resourceId?: string;
}

export function updatePropertiesDeserializer(item: any): UpdateProperties {
  return {
    resourceId: item["resourceId"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2023-10-01-preview API version. */
  V20231001Preview = "2023-10-01-preview",
}
