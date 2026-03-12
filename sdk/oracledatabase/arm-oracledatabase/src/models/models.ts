// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

/** The response of a CloudExadataInfrastructure list operation. */
export interface _CloudExadataInfrastructureListResult {
  /** The CloudExadataInfrastructure items on this page */
  value: CloudExadataInfrastructure[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _cloudExadataInfrastructureListResultDeserializer(
  item: any,
): _CloudExadataInfrastructureListResult {
  return {
    value: cloudExadataInfrastructureArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cloudExadataInfrastructureArraySerializer(
  result: Array<CloudExadataInfrastructure>,
): any[] {
  return result.map((item) => {
    return cloudExadataInfrastructureSerializer(item);
  });
}

export function cloudExadataInfrastructureArrayDeserializer(
  result: Array<CloudExadataInfrastructure>,
): any[] {
  return result.map((item) => {
    return cloudExadataInfrastructureDeserializer(item);
  });
}

/** CloudExadataInfrastructure resource definition */
export interface CloudExadataInfrastructure extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CloudExadataInfrastructureProperties;
  /** CloudExadataInfrastructure zones */
  zones: string[];
}

export function cloudExadataInfrastructureSerializer(item: CloudExadataInfrastructure): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : cloudExadataInfrastructurePropertiesSerializer(item["properties"]),
    zones: item["zones"].map((p: any) => {
      return p;
    }),
  };
}

export function cloudExadataInfrastructureDeserializer(item: any): CloudExadataInfrastructure {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : cloudExadataInfrastructurePropertiesDeserializer(item["properties"]),
    zones: item["zones"].map((p: any) => {
      return p;
    }),
  };
}

/** CloudExadataInfrastructure resource model */
export interface CloudExadataInfrastructureProperties {
  /** Defined file system configurations */
  readonly definedFileSystemConfiguration?: DefinedFileSystemConfiguration[];
  /** Exadata infra ocid */
  readonly ocid?: string;
  /** The number of compute servers for the cloud Exadata infrastructure. */
  computeCount?: number;
  /** The number of storage servers for the cloud Exadata infrastructure. */
  storageCount?: number;
  /** The total storage allocated to the cloud Exadata infrastructure resource, in gigabytes (GB). */
  readonly totalStorageSizeInGbs?: number;
  /** The available storage can be allocated to the cloud Exadata infrastructure resource, in gigabytes (GB). */
  readonly availableStorageSizeInGbs?: number;
  /** The date and time the cloud Exadata infrastructure resource was created. */
  readonly timeCreated?: string;
  /** Additional information about the current lifecycle state. */
  readonly lifecycleDetails?: string;
  /** maintenanceWindow property */
  maintenanceWindow?: MaintenanceWindow;
  /** The estimated total time required in minutes for all patching operations (database server, storage server, and network switch patching). */
  readonly estimatedPatchingTime?: EstimatedPatchingTime;
  /** The list of customer email addresses that receive information from Oracle about the specified OCI Database service resource. Oracle uses these email addresses to send notifications about planned and unplanned software maintenance updates, information about system hardware, and other information needed by administrators. Up to 10 email addresses can be added to the customer contacts for a cloud Exadata infrastructure instance. */
  customerContacts?: CustomerContact[];
  /** CloudExadataInfrastructure provisioning state */
  readonly provisioningState?: AzureResourceProvisioningState;
  /** CloudExadataInfrastructure lifecycle state */
  readonly lifecycleState?: CloudExadataInfrastructureLifecycleState;
  /** The model name of the cloud Exadata infrastructure resource. */
  shape: string;
  /** HTTPS link to OCI resources exposed to Azure Customer via Azure Interface. */
  readonly ociUrl?: string;
  /** The total number of CPU cores allocated. */
  readonly cpuCount?: number;
  /** The total number of CPU cores available. */
  readonly maxCpuCount?: number;
  /** The memory allocated in GBs. */
  readonly memorySizeInGbs?: number;
  /** The total memory available in GBs. */
  readonly maxMemoryInGbs?: number;
  /** The local node storage to be allocated in GBs. */
  readonly dbNodeStorageSizeInGbs?: number;
  /** The total local node storage available in GBs. */
  readonly maxDbNodeStorageSizeInGbs?: number;
  /** The quantity of data in the database, in terabytes. */
  readonly dataStorageSizeInTbs?: number;
  /** The total available DATA disk group size. */
  readonly maxDataStorageInTbs?: number;
  /** The software version of the database servers (dom0) in the Exadata infrastructure. */
  readonly dbServerVersion?: string;
  /** The software version of the storage servers (cells) in the Exadata infrastructure. */
  readonly storageServerVersion?: string;
  /** The requested number of additional storage servers activated for the Exadata infrastructure. */
  readonly activatedStorageCount?: number;
  /** The requested number of additional storage servers for the Exadata infrastructure. */
  readonly additionalStorageCount?: number;
  /** The name for the Exadata infrastructure. */
  displayName: string;
  /** The OCID of the last maintenance run. */
  readonly lastMaintenanceRunId?: string;
  /** The OCID of the next maintenance run. */
  readonly nextMaintenanceRunId?: string;
  /** Monthly Db Server version */
  readonly monthlyDbServerVersion?: string;
  /** Monthly Storage Server version */
  readonly monthlyStorageServerVersion?: string;
  /** The database server model type of the cloud Exadata infrastructure resource. */
  databaseServerType?: string;
  /** The storage server model type of the cloud Exadata infrastructure resource. */
  storageServerType?: string;
  /** The compute model of the Exadata Infrastructure */
  readonly computeModel?: ComputeModel;
  /** The exascale config details for the cloud Exadata infrastructure */
  readonly exascaleConfig?: ExascaleConfigDetails;
}

export function cloudExadataInfrastructurePropertiesSerializer(
  item: CloudExadataInfrastructureProperties,
): any {
  return {
    computeCount: item["computeCount"],
    storageCount: item["storageCount"],
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowSerializer(item["maintenanceWindow"]),
    customerContacts: !item["customerContacts"]
      ? item["customerContacts"]
      : customerContactArraySerializer(item["customerContacts"]),
    shape: item["shape"],
    displayName: item["displayName"],
    databaseServerType: item["databaseServerType"],
    storageServerType: item["storageServerType"],
  };
}

export function cloudExadataInfrastructurePropertiesDeserializer(
  item: any,
): CloudExadataInfrastructureProperties {
  return {
    definedFileSystemConfiguration: !item["definedFileSystemConfiguration"]
      ? item["definedFileSystemConfiguration"]
      : definedFileSystemConfigurationArrayDeserializer(item["definedFileSystemConfiguration"]),
    ocid: item["ocid"],
    computeCount: item["computeCount"],
    storageCount: item["storageCount"],
    totalStorageSizeInGbs: item["totalStorageSizeInGbs"],
    availableStorageSizeInGbs: item["availableStorageSizeInGbs"],
    timeCreated: item["timeCreated"],
    lifecycleDetails: item["lifecycleDetails"],
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowDeserializer(item["maintenanceWindow"]),
    estimatedPatchingTime: !item["estimatedPatchingTime"]
      ? item["estimatedPatchingTime"]
      : estimatedPatchingTimeDeserializer(item["estimatedPatchingTime"]),
    customerContacts: !item["customerContacts"]
      ? item["customerContacts"]
      : customerContactArrayDeserializer(item["customerContacts"]),
    provisioningState: item["provisioningState"],
    lifecycleState: item["lifecycleState"],
    shape: item["shape"],
    ociUrl: item["ociUrl"],
    cpuCount: item["cpuCount"],
    maxCpuCount: item["maxCpuCount"],
    memorySizeInGbs: item["memorySizeInGbs"],
    maxMemoryInGbs: item["maxMemoryInGbs"],
    dbNodeStorageSizeInGbs: item["dbNodeStorageSizeInGbs"],
    maxDbNodeStorageSizeInGbs: item["maxDbNodeStorageSizeInGbs"],
    dataStorageSizeInTbs: item["dataStorageSizeInTbs"],
    maxDataStorageInTbs: item["maxDataStorageInTbs"],
    dbServerVersion: item["dbServerVersion"],
    storageServerVersion: item["storageServerVersion"],
    activatedStorageCount: item["activatedStorageCount"],
    additionalStorageCount: item["additionalStorageCount"],
    displayName: item["displayName"],
    lastMaintenanceRunId: item["lastMaintenanceRunId"],
    nextMaintenanceRunId: item["nextMaintenanceRunId"],
    monthlyDbServerVersion: item["monthlyDbServerVersion"],
    monthlyStorageServerVersion: item["monthlyStorageServerVersion"],
    databaseServerType: item["databaseServerType"],
    storageServerType: item["storageServerType"],
    computeModel: item["computeModel"],
    exascaleConfig: !item["exascaleConfig"]
      ? item["exascaleConfig"]
      : exascaleConfigDetailsDeserializer(item["exascaleConfig"]),
  };
}

export function definedFileSystemConfigurationArrayDeserializer(
  result: Array<DefinedFileSystemConfiguration>,
): any[] {
  return result.map((item) => {
    return definedFileSystemConfigurationDeserializer(item);
  });
}

/** Predefined configurations for the file system */
export interface DefinedFileSystemConfiguration {
  /** Checks if the data can be backed up */
  isBackupPartition?: boolean;
  /** Checks if the mount path is resizable */
  isResizable?: boolean;
  /** Minimum size of mount path in Gb */
  minSizeGb?: number;
  /** Mount path for the file system */
  mountPoint?: string;
}

export function definedFileSystemConfigurationDeserializer(
  item: any,
): DefinedFileSystemConfiguration {
  return {
    isBackupPartition: item["isBackupPartition"],
    isResizable: item["isResizable"],
    minSizeGb: item["minSizeGb"],
    mountPoint: item["mountPoint"],
  };
}

/** MaintenanceWindow resource properties */
export interface MaintenanceWindow {
  /** The maintenance window scheduling preference. */
  preference?: Preference;
  /** Months during the year when maintenance should be performed. */
  months?: Month[];
  /** Weeks during the month when maintenance should be performed. Weeks start on the 1st, 8th, 15th, and 22nd days of the month, and have a duration of 7 days. Weeks start and end based on calendar dates, not days of the week. For example, to allow maintenance during the 2nd week of the month (from the 8th day to the 14th day of the month), use the value 2. Maintenance cannot be scheduled for the fifth week of months that contain more than 28 days. Note that this parameter works in conjunction with the  daysOfWeek and hoursOfDay parameters to allow you to specify specific days of the week and hours that maintenance will be performed. */
  weeksOfMonth?: number[];
  /** Days during the week when maintenance should be performed. */
  daysOfWeek?: DayOfWeek[];
  /** The window of hours during the day when maintenance should be performed. The window is a 4 hour slot. Valid values are - 0 - represents time slot 0:00 - 3:59 UTC - 4 - represents time slot 4:00 - 7:59 UTC - 8 - represents time slot 8:00 - 11:59 UTC - 12 - represents time slot 12:00 - 15:59 UTC - 16 - represents time slot 16:00 - 19:59 UTC - 20 - represents time slot 20:00 - 23:59 UTC */
  hoursOfDay?: number[];
  /** Lead time window allows user to set a lead time to prepare for a down time. The lead time is in weeks and valid value is between 1 to 4. */
  leadTimeInWeeks?: number;
  /** Cloud Exadata infrastructure node patching method. */
  patchingMode?: PatchingMode;
  /** Determines the amount of time the system will wait before the start of each database server patching operation. Custom action timeout is in minutes and valid value is between 15 to 120 (inclusive). */
  customActionTimeoutInMins?: number;
  /** If true, enables the configuration of a custom action timeout (waiting period) between database server patching operations. */
  isCustomActionTimeoutEnabled?: boolean;
  /** is Monthly Patching Enabled */
  isMonthlyPatchingEnabled?: boolean;
}

export function maintenanceWindowSerializer(item: MaintenanceWindow): any {
  return {
    preference: item["preference"],
    months: !item["months"] ? item["months"] : monthArraySerializer(item["months"]),
    weeksOfMonth: !item["weeksOfMonth"]
      ? item["weeksOfMonth"]
      : item["weeksOfMonth"].map((p: any) => {
          return p;
        }),
    daysOfWeek: !item["daysOfWeek"]
      ? item["daysOfWeek"]
      : dayOfWeekArraySerializer(item["daysOfWeek"]),
    hoursOfDay: !item["hoursOfDay"]
      ? item["hoursOfDay"]
      : item["hoursOfDay"].map((p: any) => {
          return p;
        }),
    leadTimeInWeeks: item["leadTimeInWeeks"],
    patchingMode: item["patchingMode"],
    customActionTimeoutInMins: item["customActionTimeoutInMins"],
    isCustomActionTimeoutEnabled: item["isCustomActionTimeoutEnabled"],
    isMonthlyPatchingEnabled: item["isMonthlyPatchingEnabled"],
  };
}

export function maintenanceWindowDeserializer(item: any): MaintenanceWindow {
  return {
    preference: item["preference"],
    months: !item["months"] ? item["months"] : monthArrayDeserializer(item["months"]),
    weeksOfMonth: !item["weeksOfMonth"]
      ? item["weeksOfMonth"]
      : item["weeksOfMonth"].map((p: any) => {
          return p;
        }),
    daysOfWeek: !item["daysOfWeek"]
      ? item["daysOfWeek"]
      : dayOfWeekArrayDeserializer(item["daysOfWeek"]),
    hoursOfDay: !item["hoursOfDay"]
      ? item["hoursOfDay"]
      : item["hoursOfDay"].map((p: any) => {
          return p;
        }),
    leadTimeInWeeks: item["leadTimeInWeeks"],
    patchingMode: item["patchingMode"],
    customActionTimeoutInMins: item["customActionTimeoutInMins"],
    isCustomActionTimeoutEnabled: item["isCustomActionTimeoutEnabled"],
    isMonthlyPatchingEnabled: item["isMonthlyPatchingEnabled"],
  };
}

/** Preference enum */
export enum KnownPreference {
  /** No preference */
  NoPreference = "NoPreference",
  /** Custom preference */
  CustomPreference = "CustomPreference",
}

/**
 * Preference enum \
 * {@link KnownPreference} can be used interchangeably with Preference,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NoPreference**: No preference \
 * **CustomPreference**: Custom preference
 */
export type Preference = string;

export function monthArraySerializer(result: Array<Month>): any[] {
  return result.map((item) => {
    return monthSerializer(item);
  });
}

export function monthArrayDeserializer(result: Array<Month>): any[] {
  return result.map((item) => {
    return monthDeserializer(item);
  });
}

/** Month resource properties */
export interface Month {
  /** Name of the month of the year. */
  name: MonthName;
}

export function monthSerializer(item: Month): any {
  return { name: item["name"] };
}

export function monthDeserializer(item: any): Month {
  return {
    name: item["name"],
  };
}

/** MonthName enum */
export enum KnownMonthName {
  /** January value */
  January = "January",
  /** February value */
  February = "February",
  /** March value */
  March = "March",
  /** April value */
  April = "April",
  /** May value */
  May = "May",
  /** June value */
  June = "June",
  /** July value */
  July = "July",
  /** August value */
  August = "August",
  /** September value */
  September = "September",
  /** October value */
  October = "October",
  /** November value */
  November = "November",
  /** December value */
  December = "December",
}

/**
 * MonthName enum \
 * {@link KnownMonthName} can be used interchangeably with MonthName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **January**: January value \
 * **February**: February value \
 * **March**: March value \
 * **April**: April value \
 * **May**: May value \
 * **June**: June value \
 * **July**: July value \
 * **August**: August value \
 * **September**: September value \
 * **October**: October value \
 * **November**: November value \
 * **December**: December value
 */
export type MonthName = string;

export function dayOfWeekArraySerializer(result: Array<DayOfWeek>): any[] {
  return result.map((item) => {
    return dayOfWeekSerializer(item);
  });
}

export function dayOfWeekArrayDeserializer(result: Array<DayOfWeek>): any[] {
  return result.map((item) => {
    return dayOfWeekDeserializer(item);
  });
}

/** DayOfWeek resource properties */
export interface DayOfWeek {
  /** Name of the day of the week. */
  name: DayOfWeekName;
}

export function dayOfWeekSerializer(item: DayOfWeek): any {
  return { name: item["name"] };
}

export function dayOfWeekDeserializer(item: any): DayOfWeek {
  return {
    name: item["name"],
  };
}

/** DayOfWeekName enum */
export enum KnownDayOfWeekName {
  /** Monday value */
  Monday = "Monday",
  /** Tuesday value */
  Tuesday = "Tuesday",
  /** Wednesday value */
  Wednesday = "Wednesday",
  /** Thursday value */
  Thursday = "Thursday",
  /** Friday value */
  Friday = "Friday",
  /** Saturday value */
  Saturday = "Saturday",
  /** Sunday value */
  Sunday = "Sunday",
}

/**
 * DayOfWeekName enum \
 * {@link KnownDayOfWeekName} can be used interchangeably with DayOfWeekName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Monday**: Monday value \
 * **Tuesday**: Tuesday value \
 * **Wednesday**: Wednesday value \
 * **Thursday**: Thursday value \
 * **Friday**: Friday value \
 * **Saturday**: Saturday value \
 * **Sunday**: Sunday value
 */
export type DayOfWeekName = string;

/** Patching mode enum */
export enum KnownPatchingMode {
  /** Rolling patching */
  Rolling = "Rolling",
  /** Non Rolling patching */
  NonRolling = "NonRolling",
}

/**
 * Patching mode enum \
 * {@link KnownPatchingMode} can be used interchangeably with PatchingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Rolling**: Rolling patching \
 * **NonRolling**: Non Rolling patching
 */
export type PatchingMode = string;

/** The estimated total time required in minutes for all patching operations (database server, storage server, and network switch patching). */
export interface EstimatedPatchingTime {
  /** The estimated time required in minutes for database server patching. */
  readonly estimatedDbServerPatchingTime?: number;
  /** The estimated time required in minutes for network switch patching. */
  readonly estimatedNetworkSwitchesPatchingTime?: number;
  /** The estimated time required in minutes for storage server patching. */
  readonly estimatedStorageServerPatchingTime?: number;
  /** The estimated total time required in minutes for all patching operations. */
  readonly totalEstimatedPatchingTime?: number;
}

export function estimatedPatchingTimeDeserializer(item: any): EstimatedPatchingTime {
  return {
    estimatedDbServerPatchingTime: item["estimatedDbServerPatchingTime"],
    estimatedNetworkSwitchesPatchingTime: item["estimatedNetworkSwitchesPatchingTime"],
    estimatedStorageServerPatchingTime: item["estimatedStorageServerPatchingTime"],
    totalEstimatedPatchingTime: item["totalEstimatedPatchingTime"],
  };
}

export function customerContactArraySerializer(result: Array<CustomerContact>): any[] {
  return result.map((item) => {
    return customerContactSerializer(item);
  });
}

export function customerContactArrayDeserializer(result: Array<CustomerContact>): any[] {
  return result.map((item) => {
    return customerContactDeserializer(item);
  });
}

/** CustomerContact resource properties */
export interface CustomerContact {
  /** The email address used by Oracle to send notifications regarding databases and infrastructure. */
  email: string;
}

export function customerContactSerializer(item: CustomerContact): any {
  return { email: item["email"] };
}

export function customerContactDeserializer(item: any): CustomerContact {
  return {
    email: item["email"],
  };
}

/** Azure Resource Provisioning State enum */
export enum KnownAzureResourceProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Indicates that resource in Provisioning state */
  Provisioning = "Provisioning",
}

/**
 * Azure Resource Provisioning State enum \
 * {@link KnownAzureResourceProvisioningState} can be used interchangeably with AzureResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Provisioning**: Indicates that resource in Provisioning state
 */
export type AzureResourceProvisioningState = string;

/** CloudExadataInfrastructureLifecycleState enum */
export enum KnownCloudExadataInfrastructureLifecycleState {
  /** Indicates that resource in Provisioning state */
  Provisioning = "Provisioning",
  /** Indicates that resource in Available state */
  Available = "Available",
  /** Indicates that resource in Updating state */
  Updating = "Updating",
  /** Indicates that resource in Terminating state */
  Terminating = "Terminating",
  /** Indicates that resource in Terminated state */
  Terminated = "Terminated",
  /** Indicates that resource maintenance in progress state */
  MaintenanceInProgress = "MaintenanceInProgress",
  /** Indicates that resource in Failed state */
  Failed = "Failed",
}

/**
 * CloudExadataInfrastructureLifecycleState enum \
 * {@link KnownCloudExadataInfrastructureLifecycleState} can be used interchangeably with CloudExadataInfrastructureLifecycleState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Provisioning**: Indicates that resource in Provisioning state \
 * **Available**: Indicates that resource in Available state \
 * **Updating**: Indicates that resource in Updating state \
 * **Terminating**: Indicates that resource in Terminating state \
 * **Terminated**: Indicates that resource in Terminated state \
 * **MaintenanceInProgress**: Indicates that resource maintenance in progress state \
 * **Failed**: Indicates that resource in Failed state
 */
export type CloudExadataInfrastructureLifecycleState = string;

/** Compute model enum */
export enum KnownComputeModel {
  /** ECPU model type */
  Ecpu = "ECPU",
  /** OCPU model type */
  Ocpu = "OCPU",
}

/**
 * Compute model enum \
 * {@link KnownComputeModel} can be used interchangeably with ComputeModel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ECPU**: ECPU model type \
 * **OCPU**: OCPU model type
 */
export type ComputeModel = string;

/** The exascale config response details for the cloud Exadata infrastructure */
export interface ExascaleConfigDetails {
  /** Storage size needed for Exascale in GBs. */
  totalStorageInGbs: number;
  /** Available storage size for Exascale in GBs. */
  availableStorageInGbs?: number;
}

export function exascaleConfigDetailsDeserializer(item: any): ExascaleConfigDetails {
  return {
    totalStorageInGbs: item["totalStorageInGbs"],
    availableStorageInGbs: item["availableStorageInGbs"],
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
    tags: item["tags"],
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

/** The provisioning state of a resource type. */
export enum KnownResourceProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of a resource type. \
 * {@link KnownResourceProvisioningState} can be used interchangeably with ResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type ResourceProvisioningState = string;

/** The type used for update operations of the CloudExadataInfrastructure. */
export interface CloudExadataInfrastructureUpdate {
  /** CloudExadataInfrastructure zones */
  zones?: string[];
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: CloudExadataInfrastructureUpdateProperties;
}

export function cloudExadataInfrastructureUpdateSerializer(
  item: CloudExadataInfrastructureUpdate,
): any {
  return {
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : cloudExadataInfrastructureUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the CloudExadataInfrastructure. */
export interface CloudExadataInfrastructureUpdateProperties {
  /** The number of compute servers for the cloud Exadata infrastructure. */
  computeCount?: number;
  /** The number of storage servers for the cloud Exadata infrastructure. */
  storageCount?: number;
  /** maintenanceWindow property */
  maintenanceWindow?: MaintenanceWindow;
  /** The list of customer email addresses that receive information from Oracle about the specified OCI Database service resource. Oracle uses these email addresses to send notifications about planned and unplanned software maintenance updates, information about system hardware, and other information needed by administrators. Up to 10 email addresses can be added to the customer contacts for a cloud Exadata infrastructure instance. */
  customerContacts?: CustomerContact[];
  /** The name for the Exadata infrastructure. */
  displayName?: string;
}

export function cloudExadataInfrastructureUpdatePropertiesSerializer(
  item: CloudExadataInfrastructureUpdateProperties,
): any {
  return {
    computeCount: item["computeCount"],
    storageCount: item["storageCount"],
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowSerializer(item["maintenanceWindow"]),
    customerContacts: !item["customerContacts"]
      ? item["customerContacts"]
      : customerContactArraySerializer(item["customerContacts"]),
    displayName: item["displayName"],
  };
}

/** The exascale config request details for the Cloud Exadata infrastructure. */
export interface ConfigureExascaleCloudExadataInfrastructureDetails {
  /** Storage size needed for Exascale in GBs. */
  totalStorageInGbs: number;
}

export function configureExascaleCloudExadataInfrastructureDetailsSerializer(
  item: ConfigureExascaleCloudExadataInfrastructureDetails,
): any {
  return { totalStorageInGbs: item["totalStorageInGbs"] };
}

/** DbServer resource model */
export interface DbServer extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DbServerProperties;
}

export function dbServerDeserializer(item: any): DbServer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dbServerPropertiesDeserializer(item["properties"]),
  };
}

/** DbServer resource properties */
export interface DbServerProperties {
  /** Db server name. */
  readonly ocid?: string;
  /** The name for the Db Server. */
  readonly displayName?: string;
  /** The OCID of the compartment. */
  readonly compartmentId?: string;
  /** The OCID of the Exadata infrastructure. */
  readonly exadataInfrastructureId?: string;
  /** The number of CPU cores enabled on the Db server. */
  readonly cpuCoreCount?: number;
  /** dbServerPatching details of the Db server. */
  readonly dbServerPatchingDetails?: DbServerPatchingDetails;
  /** The total memory available in GBs. */
  readonly maxMemoryInGbs?: number;
  /** The allocated local node storage in GBs on the Db server. */
  readonly dbNodeStorageSizeInGbs?: number;
  /** The OCID of the VM Clusters associated with the Db server. */
  readonly vmClusterIds?: string[];
  /** The OCID of the Db nodes associated with the Db server. */
  readonly dbNodeIds?: string[];
  /** Lifecycle details of dbServer. */
  readonly lifecycleDetails?: string;
  /** DbServer provisioning state. */
  readonly lifecycleState?: DbServerProvisioningState;
  /** The total number of CPU cores available. */
  readonly maxCpuCount?: number;
  /** The list of OCIDs of the Autonomous VM Clusters associated with the Db server. */
  readonly autonomousVmClusterIds?: string[];
  /** The list of OCIDs of the Autonomous Virtual Machines associated with the Db server. */
  readonly autonomousVirtualMachineIds?: string[];
  /** The total max dbNode storage in GBs. */
  readonly maxDbNodeStorageInGbs?: number;
  /** The total memory size in GBs. */
  readonly memorySizeInGbs?: number;
  /** The shape of the Db server. The shape determines the amount of CPU, storage, and memory resources available. */
  readonly shape?: string;
  /** The date and time that the Db Server was created. */
  readonly timeCreated?: Date;
  /** Azure resource provisioning state. */
  readonly provisioningState?: ResourceProvisioningState;
  /** The compute model of the Exadata Infrastructure */
  readonly computeModel?: ComputeModel;
}

export function dbServerPropertiesDeserializer(item: any): DbServerProperties {
  return {
    ocid: item["ocid"],
    displayName: item["displayName"],
    compartmentId: item["compartmentId"],
    exadataInfrastructureId: item["exadataInfrastructureId"],
    cpuCoreCount: item["cpuCoreCount"],
    dbServerPatchingDetails: !item["dbServerPatchingDetails"]
      ? item["dbServerPatchingDetails"]
      : dbServerPatchingDetailsDeserializer(item["dbServerPatchingDetails"]),
    maxMemoryInGbs: item["maxMemoryInGbs"],
    dbNodeStorageSizeInGbs: item["dbNodeStorageSizeInGbs"],
    vmClusterIds: !item["vmClusterIds"]
      ? item["vmClusterIds"]
      : item["vmClusterIds"].map((p: any) => {
          return p;
        }),
    dbNodeIds: !item["dbNodeIds"]
      ? item["dbNodeIds"]
      : item["dbNodeIds"].map((p: any) => {
          return p;
        }),
    lifecycleDetails: item["lifecycleDetails"],
    lifecycleState: item["lifecycleState"],
    maxCpuCount: item["maxCpuCount"],
    autonomousVmClusterIds: !item["autonomousVmClusterIds"]
      ? item["autonomousVmClusterIds"]
      : item["autonomousVmClusterIds"].map((p: any) => {
          return p;
        }),
    autonomousVirtualMachineIds: !item["autonomousVirtualMachineIds"]
      ? item["autonomousVirtualMachineIds"]
      : item["autonomousVirtualMachineIds"].map((p: any) => {
          return p;
        }),
    maxDbNodeStorageInGbs: item["maxDbNodeStorageInGbs"],
    memorySizeInGbs: item["memorySizeInGbs"],
    shape: item["shape"],
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    provisioningState: item["provisioningState"],
    computeModel: item["computeModel"],
  };
}

/** DbServer Patching Properties */
export interface DbServerPatchingDetails {
  /** Estimated Patch Duration */
  readonly estimatedPatchDuration?: number;
  /** Patching Status */
  readonly patchingStatus?: DbServerPatchingStatus;
  /** Time Patching Ended */
  readonly timePatchingEnded?: Date;
  /** Time Patching Started */
  readonly timePatchingStarted?: Date;
}

export function dbServerPatchingDetailsDeserializer(item: any): DbServerPatchingDetails {
  return {
    estimatedPatchDuration: item["estimatedPatchDuration"],
    patchingStatus: item["patchingStatus"],
    timePatchingEnded: !item["timePatchingEnded"]
      ? item["timePatchingEnded"]
      : new Date(item["timePatchingEnded"]),
    timePatchingStarted: !item["timePatchingStarted"]
      ? item["timePatchingStarted"]
      : new Date(item["timePatchingStarted"]),
  };
}

/** DB Server patching status enum */
export enum KnownDbServerPatchingStatus {
  /** Patching scheduled */
  Scheduled = "Scheduled",
  /** Patching in progress */
  MaintenanceInProgress = "MaintenanceInProgress",
  /** Patching failed */
  Failed = "Failed",
  /** Patching completed */
  Complete = "Complete",
}

/**
 * DB Server patching status enum \
 * {@link KnownDbServerPatchingStatus} can be used interchangeably with DbServerPatchingStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Scheduled**: Patching scheduled \
 * **MaintenanceInProgress**: Patching in progress \
 * **Failed**: Patching failed \
 * **Complete**: Patching completed
 */
export type DbServerPatchingStatus = string;

/** DbServerProvisioningState enum */
export enum KnownDbServerProvisioningState {
  /** Indicates that resource in Creating state */
  Creating = "Creating",
  /** Indicates that resource in Available state */
  Available = "Available",
  /** Indicates that resource in Unavailable state */
  Unavailable = "Unavailable",
  /** Indicates that resource in Deleting state */
  Deleting = "Deleting",
  /** Indicates that resource in Deleted state */
  Deleted = "Deleted",
  /** Indicates that resource maintenance in progress state */
  MaintenanceInProgress = "MaintenanceInProgress",
}

/**
 * DbServerProvisioningState enum \
 * {@link KnownDbServerProvisioningState} can be used interchangeably with DbServerProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Indicates that resource in Creating state \
 * **Available**: Indicates that resource in Available state \
 * **Unavailable**: Indicates that resource in Unavailable state \
 * **Deleting**: Indicates that resource in Deleting state \
 * **Deleted**: Indicates that resource in Deleted state \
 * **MaintenanceInProgress**: Indicates that resource maintenance in progress state
 */
export type DbServerProvisioningState = string;

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

/** The response of a DbServer list operation. */
export interface _DbServerListResult {
  /** The DbServer items on this page */
  value: DbServer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dbServerListResultDeserializer(item: any): _DbServerListResult {
  return {
    value: dbServerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dbServerArrayDeserializer(result: Array<DbServer>): any[] {
  return result.map((item) => {
    return dbServerDeserializer(item);
  });
}

/** The response of a CloudVmCluster list operation. */
export interface _CloudVmClusterListResult {
  /** The CloudVmCluster items on this page */
  value: CloudVmCluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _cloudVmClusterListResultDeserializer(item: any): _CloudVmClusterListResult {
  return {
    value: cloudVmClusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cloudVmClusterArraySerializer(result: Array<CloudVmCluster>): any[] {
  return result.map((item) => {
    return cloudVmClusterSerializer(item);
  });
}

export function cloudVmClusterArrayDeserializer(result: Array<CloudVmCluster>): any[] {
  return result.map((item) => {
    return cloudVmClusterDeserializer(item);
  });
}

/** CloudVmCluster resource definition */
export interface CloudVmCluster extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CloudVmClusterProperties;
}

export function cloudVmClusterSerializer(item: CloudVmCluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : cloudVmClusterPropertiesSerializer(item["properties"]),
  };
}

export function cloudVmClusterDeserializer(item: any): CloudVmCluster {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : cloudVmClusterPropertiesDeserializer(item["properties"]),
  };
}

/** CloudVmCluster resource model */
export interface CloudVmClusterProperties {
  /** Cloud VM Cluster ocid */
  readonly ocid?: string;
  /** The port number configured for the listener on the cloud VM cluster. */
  readonly listenerPort?: number;
  /** The number of nodes in the cloud VM cluster. */
  readonly nodeCount?: number;
  /** The data disk group size to be allocated in GBs per VM. */
  storageSizeInGbs?: number;
  /** Array of mount path and size. */
  fileSystemConfigurationDetails?: FileSystemConfigurationDetails[];
  /** The data disk group size to be allocated in TBs. */
  dataStorageSizeInTbs?: number;
  /** The local node storage to be allocated in GBs. */
  dbNodeStorageSizeInGbs?: number;
  /** The memory to be allocated in GBs. */
  memorySizeInGbs?: number;
  /** The date and time that the cloud VM cluster was created. */
  readonly timeCreated?: Date;
  /** Additional information about the current lifecycle state. */
  readonly lifecycleDetails?: string;
  /** The time zone of the cloud VM cluster. For details, see [Exadata Infrastructure Time Zones](/Content/Database/References/timezones.htm). */
  timeZone?: string;
  /** The OCID of the zone the cloud VM cluster is associated with. */
  zoneId?: string;
  /** The hostname for the cloud VM cluster. */
  hostname: string;
  /** The domain name for the cloud VM cluster. */
  domain?: string;
  /** The number of CPU cores enabled on the cloud VM cluster. */
  cpuCoreCount: number;
  /** The number of OCPU cores to enable on the cloud VM cluster. Only 1 decimal place is allowed for the fractional part. */
  ocpuCount?: number;
  /** The cluster name for cloud VM cluster. The cluster name must begin with an alphabetic character, and may contain hyphens (-). Underscores (_) are not permitted. The cluster name can be no longer than 11 characters and is not case sensitive. */
  clusterName?: string;
  /** The percentage assigned to DATA storage (user data and database files). The remaining percentage is assigned to RECO storage (database redo logs, archive logs, and recovery manager backups). Accepted values are 35, 40, 60 and 80. The default is 80 percent assigned to DATA storage. See [Storage Configuration](/Content/Database/Concepts/exaoverview.htm#Exadata) in the Exadata documentation for details on the impact of the configuration settings on storage. */
  dataStoragePercentage?: number;
  /** If true, database backup on local Exadata storage is configured for the cloud VM cluster. If false, database backup on local Exadata storage is not available in the cloud VM cluster. */
  isLocalBackupEnabled?: boolean;
  /** Cloud Exadata Infrastructure ID */
  cloudExadataInfrastructureId: string;
  /** If true, sparse disk group is configured for the cloud VM cluster. If false, sparse disk group is not created. */
  isSparseDiskgroupEnabled?: boolean;
  /** Operating system version of the image. */
  systemVersion?: string;
  /** The public key portion of one or more key pairs used for SSH access to the cloud VM cluster. */
  sshPublicKeys: string[];
  /** The Oracle license model that applies to the cloud VM cluster. The default is LICENSE_INCLUDED. */
  licenseModel?: LicenseModel;
  /** The type of redundancy configured for the cloud Vm cluster. NORMAL is 2-way redundancy. HIGH is 3-way redundancy. */
  readonly diskRedundancy?: DiskRedundancy;
  /** The Single Client Access Name (SCAN) IP addresses associated with the cloud VM cluster. SCAN IP addresses are typically used for load balancing and are not assigned to any interface. Oracle Clusterware directs the requests to the appropriate nodes in the cluster. **Note:** For a single-node DB system, this list is empty. */
  readonly scanIpIds?: string[];
  /** The virtual IP (VIP) addresses associated with the cloud VM cluster. The Cluster Ready Services (CRS) creates and maintains one VIP address for each node in the Exadata Cloud Service instance to enable failover. If one node fails, the VIP is reassigned to another active node in the cluster. **Note:** For a single-node DB system, this list is empty. */
  readonly vipIds?: string[];
  /** The FQDN of the DNS record for the SCAN IP addresses that are associated with the cloud VM cluster. */
  readonly scanDnsName?: string;
  /** The TCP Single Client Access Name (SCAN) port. The default port is 1521. */
  scanListenerPortTcp?: number;
  /** The TCPS Single Client Access Name (SCAN) port. The default port is 2484. */
  scanListenerPortTcpSsl?: number;
  /** The OCID of the DNS record for the SCAN IP addresses that are associated with the cloud VM cluster. */
  readonly scanDnsRecordId?: string;
  /** The model name of the Exadata hardware running the cloud VM cluster. */
  readonly shape?: string;
  /** CloudVmCluster provisioning state */
  readonly provisioningState?: AzureResourceProvisioningState;
  /** CloudVmCluster lifecycle state */
  readonly lifecycleState?: CloudVmClusterLifecycleState;
  /** VNET for network connectivity */
  vnetId: string;
  /** Oracle Grid Infrastructure (GI) software version */
  giVersion: string;
  /** HTTPS link to OCI resources exposed to Azure Customer via Azure Interface. */
  readonly ociUrl?: string;
  /** HTTPS link to OCI Network Security Group exposed to Azure Customer via the Azure Interface. */
  readonly nsgUrl?: string;
  /** Client subnet */
  subnetId: string;
  /** Client OCI backup subnet CIDR, default is 192.168.252.0/22 */
  backupSubnetCidr?: string;
  /** CIDR blocks for additional NSG ingress rules. The VNET CIDRs used to provision the VM Cluster will be added by default. */
  nsgCidrs?: NsgCidr[];
  /** Indicates user preferences for the various diagnostic collection options for the VM cluster/Cloud VM cluster/VMBM DBCS. */
  dataCollectionOptions?: DataCollectionOptions;
  /** Display Name */
  displayName: string;
  /** The list of compute servers to be added to the cloud VM cluster. */
  computeNodes?: string[];
  /** iormConfigCache details for cloud VM cluster. */
  readonly iormConfigCache?: ExadataIormConfig;
  /** The OCID of the last maintenance update history entry. */
  readonly lastUpdateHistoryEntryId?: string;
  /** The list of DB servers. */
  dbServers?: string[];
  /** Cluster compartmentId */
  readonly compartmentId?: string;
  /** Cluster subnet ocid */
  readonly subnetOcid?: string;
  /** The compute model of the VM Cluster. */
  readonly computeModel?: ComputeModel;
  /** Exadata Database Storage Vault ID */
  exascaleDbStorageVaultId?: string;
  /** Specifies whether the type of storage management for the VM cluster is ASM or Exascale. */
  readonly storageManagementType?: ExadataVmClusterStorageManagementType;
}

export function cloudVmClusterPropertiesSerializer(item: CloudVmClusterProperties): any {
  return {
    storageSizeInGbs: item["storageSizeInGbs"],
    fileSystemConfigurationDetails: !item["fileSystemConfigurationDetails"]
      ? item["fileSystemConfigurationDetails"]
      : fileSystemConfigurationDetailsArraySerializer(item["fileSystemConfigurationDetails"]),
    dataStorageSizeInTbs: item["dataStorageSizeInTbs"],
    dbNodeStorageSizeInGbs: item["dbNodeStorageSizeInGbs"],
    memorySizeInGbs: item["memorySizeInGbs"],
    timeZone: item["timeZone"],
    zoneId: item["zoneId"],
    hostname: item["hostname"],
    domain: item["domain"],
    cpuCoreCount: item["cpuCoreCount"],
    ocpuCount: item["ocpuCount"],
    clusterName: item["clusterName"],
    dataStoragePercentage: item["dataStoragePercentage"],
    isLocalBackupEnabled: item["isLocalBackupEnabled"],
    cloudExadataInfrastructureId: item["cloudExadataInfrastructureId"],
    isSparseDiskgroupEnabled: item["isSparseDiskgroupEnabled"],
    systemVersion: item["systemVersion"],
    sshPublicKeys: item["sshPublicKeys"].map((p: any) => {
      return p;
    }),
    licenseModel: item["licenseModel"],
    scanListenerPortTcp: item["scanListenerPortTcp"],
    scanListenerPortTcpSsl: item["scanListenerPortTcpSsl"],
    vnetId: item["vnetId"],
    giVersion: item["giVersion"],
    subnetId: item["subnetId"],
    backupSubnetCidr: item["backupSubnetCidr"],
    nsgCidrs: !item["nsgCidrs"] ? item["nsgCidrs"] : nsgCidrArraySerializer(item["nsgCidrs"]),
    dataCollectionOptions: !item["dataCollectionOptions"]
      ? item["dataCollectionOptions"]
      : dataCollectionOptionsSerializer(item["dataCollectionOptions"]),
    displayName: item["displayName"],
    computeNodes: !item["computeNodes"]
      ? item["computeNodes"]
      : item["computeNodes"].map((p: any) => {
          return p;
        }),
    dbServers: !item["dbServers"]
      ? item["dbServers"]
      : item["dbServers"].map((p: any) => {
          return p;
        }),
    exascaleDbStorageVaultId: item["exascaleDbStorageVaultId"],
  };
}

export function cloudVmClusterPropertiesDeserializer(item: any): CloudVmClusterProperties {
  return {
    ocid: item["ocid"],
    listenerPort: item["listenerPort"],
    nodeCount: item["nodeCount"],
    storageSizeInGbs: item["storageSizeInGbs"],
    fileSystemConfigurationDetails: !item["fileSystemConfigurationDetails"]
      ? item["fileSystemConfigurationDetails"]
      : fileSystemConfigurationDetailsArrayDeserializer(item["fileSystemConfigurationDetails"]),
    dataStorageSizeInTbs: item["dataStorageSizeInTbs"],
    dbNodeStorageSizeInGbs: item["dbNodeStorageSizeInGbs"],
    memorySizeInGbs: item["memorySizeInGbs"],
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    lifecycleDetails: item["lifecycleDetails"],
    timeZone: item["timeZone"],
    zoneId: item["zoneId"],
    hostname: item["hostname"],
    domain: item["domain"],
    cpuCoreCount: item["cpuCoreCount"],
    ocpuCount: item["ocpuCount"],
    clusterName: item["clusterName"],
    dataStoragePercentage: item["dataStoragePercentage"],
    isLocalBackupEnabled: item["isLocalBackupEnabled"],
    cloudExadataInfrastructureId: item["cloudExadataInfrastructureId"],
    isSparseDiskgroupEnabled: item["isSparseDiskgroupEnabled"],
    systemVersion: item["systemVersion"],
    sshPublicKeys: item["sshPublicKeys"].map((p: any) => {
      return p;
    }),
    licenseModel: item["licenseModel"],
    diskRedundancy: item["diskRedundancy"],
    scanIpIds: !item["scanIpIds"]
      ? item["scanIpIds"]
      : item["scanIpIds"].map((p: any) => {
          return p;
        }),
    vipIds: !item["vipIds"]
      ? item["vipIds"]
      : item["vipIds"].map((p: any) => {
          return p;
        }),
    scanDnsName: item["scanDnsName"],
    scanListenerPortTcp: item["scanListenerPortTcp"],
    scanListenerPortTcpSsl: item["scanListenerPortTcpSsl"],
    scanDnsRecordId: item["scanDnsRecordId"],
    shape: item["shape"],
    provisioningState: item["provisioningState"],
    lifecycleState: item["lifecycleState"],
    vnetId: item["vnetId"],
    giVersion: item["giVersion"],
    ociUrl: item["ociUrl"],
    nsgUrl: item["nsgUrl"],
    subnetId: item["subnetId"],
    backupSubnetCidr: item["backupSubnetCidr"],
    nsgCidrs: !item["nsgCidrs"] ? item["nsgCidrs"] : nsgCidrArrayDeserializer(item["nsgCidrs"]),
    dataCollectionOptions: !item["dataCollectionOptions"]
      ? item["dataCollectionOptions"]
      : dataCollectionOptionsDeserializer(item["dataCollectionOptions"]),
    displayName: item["displayName"],
    computeNodes: !item["computeNodes"]
      ? item["computeNodes"]
      : item["computeNodes"].map((p: any) => {
          return p;
        }),
    iormConfigCache: !item["iormConfigCache"]
      ? item["iormConfigCache"]
      : exadataIormConfigDeserializer(item["iormConfigCache"]),
    lastUpdateHistoryEntryId: item["lastUpdateHistoryEntryId"],
    dbServers: !item["dbServers"]
      ? item["dbServers"]
      : item["dbServers"].map((p: any) => {
          return p;
        }),
    compartmentId: item["compartmentId"],
    subnetOcid: item["subnetOcid"],
    computeModel: item["computeModel"],
    exascaleDbStorageVaultId: item["exascaleDbStorageVaultId"],
    storageManagementType: item["storageManagementType"],
  };
}

export function fileSystemConfigurationDetailsArraySerializer(
  result: Array<FileSystemConfigurationDetails>,
): any[] {
  return result.map((item) => {
    return fileSystemConfigurationDetailsSerializer(item);
  });
}

export function fileSystemConfigurationDetailsArrayDeserializer(
  result: Array<FileSystemConfigurationDetails>,
): any[] {
  return result.map((item) => {
    return fileSystemConfigurationDetailsDeserializer(item);
  });
}

/** File configuration options */
export interface FileSystemConfigurationDetails {
  /** Mount path */
  mountPoint?: string;
  /** Size of the VM */
  fileSystemSizeGb?: number;
}

export function fileSystemConfigurationDetailsSerializer(
  item: FileSystemConfigurationDetails,
): any {
  return {
    mountPoint: item["mountPoint"],
    fileSystemSizeGb: item["fileSystemSizeGb"],
  };
}

export function fileSystemConfigurationDetailsDeserializer(
  item: any,
): FileSystemConfigurationDetails {
  return {
    mountPoint: item["mountPoint"],
    fileSystemSizeGb: item["fileSystemSizeGb"],
  };
}

/** LicenseModel enum */
export enum KnownLicenseModel {
  /** License included */
  LicenseIncluded = "LicenseIncluded",
  /** Bring Your Own License */
  BringYourOwnLicense = "BringYourOwnLicense",
}

/**
 * LicenseModel enum \
 * {@link KnownLicenseModel} can be used interchangeably with LicenseModel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LicenseIncluded**: License included \
 * **BringYourOwnLicense**: Bring Your Own License
 */
export type LicenseModel = string;

/** Disk redundancy enum */
export enum KnownDiskRedundancy {
  /** High redundancy */
  High = "High",
  /** Normal redundancy */
  Normal = "Normal",
}

/**
 * Disk redundancy enum \
 * {@link KnownDiskRedundancy} can be used interchangeably with DiskRedundancy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **High**: High redundancy \
 * **Normal**: Normal redundancy
 */
export type DiskRedundancy = string;

/** Cloud VM Cluster lifecycle state enum */
export enum KnownCloudVmClusterLifecycleState {
  /** Indicates that resource in Provisioning state */
  Provisioning = "Provisioning",
  /** Indicates that resource in Available state */
  Available = "Available",
  /** Indicates that resource in Updating state */
  Updating = "Updating",
  /** Indicates that resource in Terminating state */
  Terminating = "Terminating",
  /** Indicates that resource in Terminated state */
  Terminated = "Terminated",
  /** Indicates that resource Maintenance in progress state */
  MaintenanceInProgress = "MaintenanceInProgress",
  /** Indicates that resource in Failed state */
  Failed = "Failed",
}

/**
 * Cloud VM Cluster lifecycle state enum \
 * {@link KnownCloudVmClusterLifecycleState} can be used interchangeably with CloudVmClusterLifecycleState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Provisioning**: Indicates that resource in Provisioning state \
 * **Available**: Indicates that resource in Available state \
 * **Updating**: Indicates that resource in Updating state \
 * **Terminating**: Indicates that resource in Terminating state \
 * **Terminated**: Indicates that resource in Terminated state \
 * **MaintenanceInProgress**: Indicates that resource Maintenance in progress state \
 * **Failed**: Indicates that resource in Failed state
 */
export type CloudVmClusterLifecycleState = string;

export function nsgCidrArraySerializer(result: Array<NsgCidr>): any[] {
  return result.map((item) => {
    return nsgCidrSerializer(item);
  });
}

export function nsgCidrArrayDeserializer(result: Array<NsgCidr>): any[] {
  return result.map((item) => {
    return nsgCidrDeserializer(item);
  });
}

/** A rule for allowing inbound (INGRESS) IP packets */
export interface NsgCidr {
  /** Conceptually, this is the range of IP addresses that a packet coming into the instance can come from. */
  source: string;
  /** Destination port range to specify particular destination ports for TCP rules. */
  destinationPortRange?: PortRange;
}

export function nsgCidrSerializer(item: NsgCidr): any {
  return {
    source: item["source"],
    destinationPortRange: !item["destinationPortRange"]
      ? item["destinationPortRange"]
      : portRangeSerializer(item["destinationPortRange"]),
  };
}

export function nsgCidrDeserializer(item: any): NsgCidr {
  return {
    source: item["source"],
    destinationPortRange: !item["destinationPortRange"]
      ? item["destinationPortRange"]
      : portRangeDeserializer(item["destinationPortRange"]),
  };
}

/** Port Range to specify particular destination ports for TCP rules. */
export interface PortRange {
  /** The minimum port number, which must not be greater than the maximum port number. */
  min: number;
  /** The maximum port number, which must not be less than the minimum port number. To specify a single port number, set both the min and max to the same value. */
  max: number;
}

export function portRangeSerializer(item: PortRange): any {
  return { min: item["min"], max: item["max"] };
}

export function portRangeDeserializer(item: any): PortRange {
  return {
    min: item["min"],
    max: item["max"],
  };
}

/** DataCollectionOptions resource properties */
export interface DataCollectionOptions {
  /** Indicates whether diagnostic collection is enabled for the VM cluster/Cloud VM cluster/VMBM DBCS. */
  isDiagnosticsEventsEnabled?: boolean;
  /** Indicates whether health monitoring is enabled for the VM cluster / Cloud VM cluster / VMBM DBCS. */
  isHealthMonitoringEnabled?: boolean;
  /** Indicates whether incident logs and trace collection are enabled for the VM cluster / Cloud VM cluster / VMBM DBCS. */
  isIncidentLogsEnabled?: boolean;
}

export function dataCollectionOptionsSerializer(item: DataCollectionOptions): any {
  return {
    isDiagnosticsEventsEnabled: item["isDiagnosticsEventsEnabled"],
    isHealthMonitoringEnabled: item["isHealthMonitoringEnabled"],
    isIncidentLogsEnabled: item["isIncidentLogsEnabled"],
  };
}

export function dataCollectionOptionsDeserializer(item: any): DataCollectionOptions {
  return {
    isDiagnosticsEventsEnabled: item["isDiagnosticsEventsEnabled"],
    isHealthMonitoringEnabled: item["isHealthMonitoringEnabled"],
    isIncidentLogsEnabled: item["isIncidentLogsEnabled"],
  };
}

/** ExadataIormConfig for cloud vm cluster */
export interface ExadataIormConfig {
  /** An array of IORM settings for all the database in the Exadata DB system. */
  dbPlans?: DbIormConfig[];
  /** Additional information about the current lifecycleState. */
  lifecycleDetails?: string;
  /** The current state of IORM configuration for the Exadata DB system. */
  lifecycleState?: IormLifecycleState;
  /** The current value for the IORM objective. The default is AUTO. */
  objective?: Objective;
}

export function exadataIormConfigDeserializer(item: any): ExadataIormConfig {
  return {
    dbPlans: !item["dbPlans"] ? item["dbPlans"] : dbIormConfigArrayDeserializer(item["dbPlans"]),
    lifecycleDetails: item["lifecycleDetails"],
    lifecycleState: item["lifecycleState"],
    objective: item["objective"],
  };
}

export function dbIormConfigArrayDeserializer(result: Array<DbIormConfig>): any[] {
  return result.map((item) => {
    return dbIormConfigDeserializer(item);
  });
}

/** DbIormConfig for cloud vm cluster */
export interface DbIormConfig {
  /** The database name. For the default DbPlan, the dbName is default. */
  dbName?: string;
  /** The flash cache limit for this database. This value is internally configured based on the share value assigned to the database. */
  flashCacheLimit?: string;
  /** The relative priority of this database. */
  share?: number;
}

export function dbIormConfigDeserializer(item: any): DbIormConfig {
  return {
    dbName: item["dbName"],
    flashCacheLimit: item["flashCacheLimit"],
    share: item["share"],
  };
}

/** ORM lifecycle state enum */
export enum KnownIormLifecycleState {
  /** Indicates that resource in Provisioning state */
  BootStrapping = "BootStrapping",
  /** Indicates that resource in Enabled state */
  Enabled = "Enabled",
  /** Indicates that resource in Disabled state */
  Disabled = "Disabled",
  /** Indicates that resource in Updating state */
  Updating = "Updating",
  /** Indicates that resource in Failed state */
  Failed = "Failed",
}

/**
 * ORM lifecycle state enum \
 * {@link KnownIormLifecycleState} can be used interchangeably with IormLifecycleState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BootStrapping**: Indicates that resource in Provisioning state \
 * **Enabled**: Indicates that resource in Enabled state \
 * **Disabled**: Indicates that resource in Disabled state \
 * **Updating**: Indicates that resource in Updating state \
 * **Failed**: Indicates that resource in Failed state
 */
export type IormLifecycleState = string;

/** Objective enum */
export enum KnownObjective {
  /** Low latency objective */
  LowLatency = "LowLatency",
  /** High throughput objective */
  HighThroughput = "HighThroughput",
  /** Balanced objective */
  Balanced = "Balanced",
  /** Auto objective */
  Auto = "Auto",
  /** Basic objective */
  Basic = "Basic",
}

/**
 * Objective enum \
 * {@link KnownObjective} can be used interchangeably with Objective,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LowLatency**: Low latency objective \
 * **HighThroughput**: High throughput objective \
 * **Balanced**: Balanced objective \
 * **Auto**: Auto objective \
 * **Basic**: Basic objective
 */
export type Objective = string;

/** Specifies the type of storage management for the Cloud VM Cluster if its ASM or Exascale. */
export enum KnownExadataVmClusterStorageManagementType {
  /** Indicates that storage management for the Cloud VM Cluster is ASM */
  ASM = "ASM",
  /** Indicates that storage management for the Cloud VM Cluster is Exascale */
  Exascale = "Exascale",
}

/**
 * Specifies the type of storage management for the Cloud VM Cluster if its ASM or Exascale. \
 * {@link KnownExadataVmClusterStorageManagementType} can be used interchangeably with ExadataVmClusterStorageManagementType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ASM**: Indicates that storage management for the Cloud VM Cluster is ASM \
 * **Exascale**: Indicates that storage management for the Cloud VM Cluster is Exascale
 */
export type ExadataVmClusterStorageManagementType = string;

/** The type used for update operations of the CloudVmCluster. */
export interface CloudVmClusterUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: CloudVmClusterUpdateProperties;
}

export function cloudVmClusterUpdateSerializer(item: CloudVmClusterUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : cloudVmClusterUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the CloudVmCluster. */
export interface CloudVmClusterUpdateProperties {
  /** The data disk group size to be allocated in GBs per VM. */
  storageSizeInGbs?: number;
  /** Array of mount path and size. */
  fileSystemConfigurationDetails?: FileSystemConfigurationDetails[];
  /** The data disk group size to be allocated in TBs. */
  dataStorageSizeInTbs?: number;
  /** The local node storage to be allocated in GBs. */
  dbNodeStorageSizeInGbs?: number;
  /** The memory to be allocated in GBs. */
  memorySizeInGbs?: number;
  /** The number of CPU cores enabled on the cloud VM cluster. */
  cpuCoreCount?: number;
  /** The number of OCPU cores to enable on the cloud VM cluster. Only 1 decimal place is allowed for the fractional part. */
  ocpuCount?: number;
  /** The public key portion of one or more key pairs used for SSH access to the cloud VM cluster. */
  sshPublicKeys?: string[];
  /** The Oracle license model that applies to the cloud VM cluster. The default is LICENSE_INCLUDED. */
  licenseModel?: LicenseModel;
  /** Indicates user preferences for the various diagnostic collection options for the VM cluster/Cloud VM cluster/VMBM DBCS. */
  dataCollectionOptions?: DataCollectionOptions;
  /** Display Name */
  displayName?: string;
  /** The list of compute servers to be added to the cloud VM cluster. */
  computeNodes?: string[];
}

export function cloudVmClusterUpdatePropertiesSerializer(
  item: CloudVmClusterUpdateProperties,
): any {
  return {
    storageSizeInGbs: item["storageSizeInGbs"],
    fileSystemConfigurationDetails: !item["fileSystemConfigurationDetails"]
      ? item["fileSystemConfigurationDetails"]
      : fileSystemConfigurationDetailsArraySerializer(item["fileSystemConfigurationDetails"]),
    dataStorageSizeInTbs: item["dataStorageSizeInTbs"],
    dbNodeStorageSizeInGbs: item["dbNodeStorageSizeInGbs"],
    memorySizeInGbs: item["memorySizeInGbs"],
    cpuCoreCount: item["cpuCoreCount"],
    ocpuCount: item["ocpuCount"],
    sshPublicKeys: !item["sshPublicKeys"]
      ? item["sshPublicKeys"]
      : item["sshPublicKeys"].map((p: any) => {
          return p;
        }),
    licenseModel: item["licenseModel"],
    dataCollectionOptions: !item["dataCollectionOptions"]
      ? item["dataCollectionOptions"]
      : dataCollectionOptionsSerializer(item["dataCollectionOptions"]),
    displayName: item["displayName"],
    computeNodes: !item["computeNodes"]
      ? item["computeNodes"]
      : item["computeNodes"].map((p: any) => {
          return p;
        }),
  };
}

/** Add/Remove (Virtual Machine) DbNode model */
export interface AddRemoveDbNode {
  /** Db servers ocids */
  dbServers: string[];
}

export function addRemoveDbNodeSerializer(item: AddRemoveDbNode): any {
  return {
    dbServers: item["dbServers"].map((p: any) => {
      return p;
    }),
  };
}

/** Private Ip Addresses filter */
export interface PrivateIpAddressesFilter {
  /** Subnet OCID */
  subnetId: string;
  /** VCN OCID */
  vnicId: string;
}

export function privateIpAddressesFilterSerializer(item: PrivateIpAddressesFilter): any {
  return { subnetId: item["subnetId"], vnicId: item["vnicId"] };
}

/** PrivateIpAddress resource properties */
export interface PrivateIpAddressProperties {
  /** PrivateIpAddresses displayName */
  displayName: string;
  /** PrivateIpAddresses hostnameLabel */
  hostnameLabel: string;
  /** PrivateIpAddresses Id */
  ocid: string;
  /** PrivateIpAddresses ipAddress */
  ipAddress: string;
  /** PrivateIpAddresses subnetId */
  subnetId: string;
}

export function privateIpAddressPropertiesDeserializer(item: any): PrivateIpAddressProperties {
  return {
    displayName: item["displayName"],
    hostnameLabel: item["hostnameLabel"],
    ocid: item["ocid"],
    ipAddress: item["ipAddress"],
    subnetId: item["subnetId"],
  };
}

/** Virtual IP resource belonging to a vm cluster resource. */
export interface VirtualNetworkAddress extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: VirtualNetworkAddressProperties;
}

export function virtualNetworkAddressSerializer(item: VirtualNetworkAddress): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : virtualNetworkAddressPropertiesSerializer(item["properties"]),
  };
}

export function virtualNetworkAddressDeserializer(item: any): VirtualNetworkAddress {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : virtualNetworkAddressPropertiesDeserializer(item["properties"]),
  };
}

/** virtualNetworkAddress resource properties */
export interface VirtualNetworkAddressProperties {
  /** Virtual network Address address. */
  ipAddress?: string;
  /** Virtual Machine OCID. */
  vmOcid?: string;
  /** Application VIP OCID. */
  readonly ocid?: string;
  /** Virtual network address fully qualified domain name. */
  readonly domain?: string;
  /** Additional information about the current lifecycle state of the application virtual IP (VIP) address. */
  readonly lifecycleDetails?: string;
  /** Azure resource provisioning state. */
  readonly provisioningState?: AzureResourceProvisioningState;
  /** virtual network address lifecycle state. */
  readonly lifecycleState?: VirtualNetworkAddressLifecycleState;
  /** The date and time when the create operation for the application virtual IP (VIP) address completed. */
  readonly timeAssigned?: Date;
}

export function virtualNetworkAddressPropertiesSerializer(
  item: VirtualNetworkAddressProperties,
): any {
  return { ipAddress: item["ipAddress"], vmOcid: item["vmOcid"] };
}

export function virtualNetworkAddressPropertiesDeserializer(
  item: any,
): VirtualNetworkAddressProperties {
  return {
    ipAddress: item["ipAddress"],
    vmOcid: item["vmOcid"],
    ocid: item["ocid"],
    domain: item["domain"],
    lifecycleDetails: item["lifecycleDetails"],
    provisioningState: item["provisioningState"],
    lifecycleState: item["lifecycleState"],
    timeAssigned: !item["timeAssigned"] ? item["timeAssigned"] : new Date(item["timeAssigned"]),
  };
}

/** VirtualNetworkAddressLifecycleState enum */
export enum KnownVirtualNetworkAddressLifecycleState {
  /** Indicates that resource in Provisioning state */
  Provisioning = "Provisioning",
  /** Indicates that resource in Available state */
  Available = "Available",
  /** Indicates that resource in Terminating state */
  Terminating = "Terminating",
  /** Indicates that resource in Terminated state */
  Terminated = "Terminated",
  /** Indicates that resource in Failed state */
  Failed = "Failed",
}

/**
 * VirtualNetworkAddressLifecycleState enum \
 * {@link KnownVirtualNetworkAddressLifecycleState} can be used interchangeably with VirtualNetworkAddressLifecycleState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Provisioning**: Indicates that resource in Provisioning state \
 * **Available**: Indicates that resource in Available state \
 * **Terminating**: Indicates that resource in Terminating state \
 * **Terminated**: Indicates that resource in Terminated state \
 * **Failed**: Indicates that resource in Failed state
 */
export type VirtualNetworkAddressLifecycleState = string;

/** The response of a VirtualNetworkAddress list operation. */
export interface _VirtualNetworkAddressListResult {
  /** The VirtualNetworkAddress items on this page */
  value: VirtualNetworkAddress[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualNetworkAddressListResultDeserializer(
  item: any,
): _VirtualNetworkAddressListResult {
  return {
    value: virtualNetworkAddressArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualNetworkAddressArraySerializer(result: Array<VirtualNetworkAddress>): any[] {
  return result.map((item) => {
    return virtualNetworkAddressSerializer(item);
  });
}

export function virtualNetworkAddressArrayDeserializer(
  result: Array<VirtualNetworkAddress>,
): any[] {
  return result.map((item) => {
    return virtualNetworkAddressDeserializer(item);
  });
}

/** SystemVersion resource Definition */
export interface SystemVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SystemVersionProperties;
}

export function systemVersionDeserializer(item: any): SystemVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : systemVersionPropertiesDeserializer(item["properties"]),
  };
}

/** System Version Resource model */
export interface SystemVersionProperties {
  /** A valid Oracle System Version */
  systemVersion: string;
}

export function systemVersionPropertiesDeserializer(item: any): SystemVersionProperties {
  return {
    systemVersion: item["systemVersion"],
  };
}

/** The response of a SystemVersion list operation. */
export interface _SystemVersionListResult {
  /** The SystemVersion items on this page */
  value: SystemVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _systemVersionListResultDeserializer(item: any): _SystemVersionListResult {
  return {
    value: systemVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function systemVersionArrayDeserializer(result: Array<SystemVersion>): any[] {
  return result.map((item) => {
    return systemVersionDeserializer(item);
  });
}

/** The response of a OracleSubscription list operation. */
export interface _OracleSubscriptionListResult {
  /** The OracleSubscription items on this page */
  value: OracleSubscription[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _oracleSubscriptionListResultDeserializer(
  item: any,
): _OracleSubscriptionListResult {
  return {
    value: oracleSubscriptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function oracleSubscriptionArraySerializer(result: Array<OracleSubscription>): any[] {
  return result.map((item) => {
    return oracleSubscriptionSerializer(item);
  });
}

export function oracleSubscriptionArrayDeserializer(result: Array<OracleSubscription>): any[] {
  return result.map((item) => {
    return oracleSubscriptionDeserializer(item);
  });
}

/** OracleSubscription resource definition */
export interface OracleSubscription extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: OracleSubscriptionProperties;
  /** Details of the resource plan. */
  plan?: Plan;
}

export function oracleSubscriptionSerializer(item: OracleSubscription): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : oracleSubscriptionPropertiesSerializer(item["properties"]),
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
  };
}

export function oracleSubscriptionDeserializer(item: any): OracleSubscription {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : oracleSubscriptionPropertiesDeserializer(item["properties"]),
    plan: !item["plan"] ? item["plan"] : planDeserializer(item["plan"]),
  };
}

/** Oracle Subscription resource model */
export interface OracleSubscriptionProperties {
  /** OracleSubscriptionProvisioningState provisioning state */
  readonly provisioningState?: OracleSubscriptionProvisioningState;
  /** SAAS subscription ID generated by Marketplace */
  readonly saasSubscriptionId?: string;
  /** Cloud Account Id */
  readonly cloudAccountId?: string;
  /** Cloud Account provisioning state. */
  readonly cloudAccountState?: CloudAccountProvisioningState;
  /** Term Unit. P1Y, P3Y, etc, see Durations https://en.wikipedia.org/wiki/ISO_8601 */
  termUnit?: string;
  /** Product code for the term unit */
  productCode?: string;
  /** Intent for the update operation */
  intent?: Intent;
  /** Azure subscriptions to be added */
  readonly azureSubscriptionIds?: string[];
  /** State of the add Azure subscription operation on Oracle subscription */
  readonly addSubscriptionOperationState?: AddSubscriptionOperationState;
  /** Status details of the last operation on Oracle subscription */
  readonly lastOperationStatusDetail?: string;
}

export function oracleSubscriptionPropertiesSerializer(item: OracleSubscriptionProperties): any {
  return {
    termUnit: item["termUnit"],
    productCode: item["productCode"],
    intent: item["intent"],
  };
}

export function oracleSubscriptionPropertiesDeserializer(item: any): OracleSubscriptionProperties {
  return {
    provisioningState: item["provisioningState"],
    saasSubscriptionId: item["saasSubscriptionId"],
    cloudAccountId: item["cloudAccountId"],
    cloudAccountState: item["cloudAccountState"],
    termUnit: item["termUnit"],
    productCode: item["productCode"],
    intent: item["intent"],
    azureSubscriptionIds: !item["azureSubscriptionIds"]
      ? item["azureSubscriptionIds"]
      : item["azureSubscriptionIds"].map((p: any) => {
          return p;
        }),
    addSubscriptionOperationState: item["addSubscriptionOperationState"],
    lastOperationStatusDetail: item["lastOperationStatusDetail"],
  };
}

/** OracleSubscriptionProvisioningState enum */
export enum KnownOracleSubscriptionProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * OracleSubscriptionProvisioningState enum \
 * {@link KnownOracleSubscriptionProvisioningState} can be used interchangeably with OracleSubscriptionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type OracleSubscriptionProvisioningState = string;

/** CloudAccountProvisioningState enum */
export enum KnownCloudAccountProvisioningState {
  /** Pending - Initial state when Oracle cloud account is not configured */
  Pending = "Pending",
  /** Provisioning - State when Oracle cloud account is being provisioned */
  Provisioning = "Provisioning",
  /** Available - State when Oracle cloud account cloud linking is complete and it is available */
  Available = "Available",
}

/**
 * CloudAccountProvisioningState enum \
 * {@link KnownCloudAccountProvisioningState} can be used interchangeably with CloudAccountProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Pending - Initial state when Oracle cloud account is not configured \
 * **Provisioning**: Provisioning - State when Oracle cloud account is being provisioned \
 * **Available**: Available - State when Oracle cloud account cloud linking is complete and it is available
 */
export type CloudAccountProvisioningState = string;

/** Intent enum */
export enum KnownIntent {
  /** Retain intent */
  Retain = "Retain",
  /** Reset intent */
  Reset = "Reset",
}

/**
 * Intent enum \
 * {@link KnownIntent} can be used interchangeably with Intent,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Retain**: Retain intent \
 * **Reset**: Reset intent
 */
export type Intent = string;

/** Add Subscription Operation state enum */
export enum KnownAddSubscriptionOperationState {
  /** Succeeded - State when Add Subscription operation succeeded */
  Succeeded = "Succeeded",
  /** Updating - State when Add Subscription operation is being Updated */
  Updating = "Updating",
  /** Failed - State when Add Subscription operation failed */
  Failed = "Failed",
}

/**
 * Add Subscription Operation state enum \
 * {@link KnownAddSubscriptionOperationState} can be used interchangeably with AddSubscriptionOperationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded - State when Add Subscription operation succeeded \
 * **Updating**: Updating - State when Add Subscription operation is being Updated \
 * **Failed**: Failed - State when Add Subscription operation failed
 */
export type AddSubscriptionOperationState = string;

/** Plan for the resource. */
export interface Plan {
  /** A user defined name of the 3rd Party Artifact that is being procured. */
  name: string;
  /** The publisher of the 3rd Party Artifact that is being bought. E.g. NewRelic */
  publisher: string;
  /** The 3rd Party artifact that is being procured. E.g. NewRelic. Product maps to the OfferID specified for the artifact at the time of Data Market onboarding. */
  product: string;
  /** A publisher provided promotion code as provisioned in Data Market for the said product/artifact. */
  promotionCode?: string;
  /** The version of the desired product/artifact. */
  version?: string;
}

export function planSerializer(item: Plan): any {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    version: item["version"],
  };
}

export function planDeserializer(item: any): Plan {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    version: item["version"],
  };
}

/** The type used for update operations of the OracleSubscription. */
export interface OracleSubscriptionUpdate {
  /** Details of the resource plan. */
  plan?: PlanUpdate;
  /** The resource-specific properties for this resource. */
  properties?: OracleSubscriptionUpdateProperties;
}

export function oracleSubscriptionUpdateSerializer(item: OracleSubscriptionUpdate): any {
  return {
    plan: !item["plan"] ? item["plan"] : planUpdateSerializer(item["plan"]),
    properties: !item["properties"]
      ? item["properties"]
      : oracleSubscriptionUpdatePropertiesSerializer(item["properties"]),
  };
}

/** ResourcePlanTypeUpdate model definition */
export interface PlanUpdate {
  /** A user defined name of the 3rd Party Artifact that is being procured. */
  name?: string;
  /** The publisher of the 3rd Party Artifact that is being bought. E.g. NewRelic */
  publisher?: string;
  /** The 3rd Party artifact that is being procured. E.g. NewRelic. Product maps to the OfferID specified for the artifact at the time of Data Market onboarding. */
  product?: string;
  /** A publisher provided promotion code as provisioned in Data Market for the said product/artifact. */
  promotionCode?: string;
  /** The version of the desired product/artifact. */
  version?: string;
}

export function planUpdateSerializer(item: PlanUpdate): any {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    version: item["version"],
  };
}

/** The updatable properties of the OracleSubscription. */
export interface OracleSubscriptionUpdateProperties {
  /** Product code for the term unit */
  productCode?: string;
  /** Intent for the update operation */
  intent?: Intent;
}

export function oracleSubscriptionUpdatePropertiesSerializer(
  item: OracleSubscriptionUpdateProperties,
): any {
  return { productCode: item["productCode"], intent: item["intent"] };
}

/** Cloud Account Details model */
export interface CloudAccountDetails {
  /** Cloud Account name */
  readonly cloudAccountName?: string;
  /** Cloud Account Home region */
  readonly cloudAccountHomeRegion?: string;
}

export function cloudAccountDetailsDeserializer(item: any): CloudAccountDetails {
  return {
    cloudAccountName: item["cloudAccountName"],
    cloudAccountHomeRegion: item["cloudAccountHomeRegion"],
  };
}

/** SaaS Subscription Details model */
export interface SaasSubscriptionDetails {
  /** Purchased SaaS subscription ID */
  readonly id?: string;
  /** SaaS subscription name */
  readonly subscriptionName?: string;
  /** Creation Date and Time */
  readonly timeCreated?: Date;
  /** Purchased offer ID */
  readonly offerId?: string;
  /** Purchased offer's plan ID */
  readonly planId?: string;
  /** Indicates the status of the Subscription. */
  readonly saasSubscriptionStatus?: string;
  /** Publisher ID */
  readonly publisherId?: string;
  /** Purchaser Email ID */
  readonly purchaserEmailId?: string;
  /** Purchaser Tenant ID */
  readonly purchaserTenantId?: string;
  /** Purchase Term Unit */
  readonly termUnit?: string;
  /** AutoRenew flag */
  readonly isAutoRenew?: boolean;
  /** FreeTrial flag */
  readonly isFreeTrial?: boolean;
}

export function saasSubscriptionDetailsDeserializer(item: any): SaasSubscriptionDetails {
  return {
    id: item["id"],
    subscriptionName: item["subscriptionName"],
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    offerId: item["offerId"],
    planId: item["planId"],
    saasSubscriptionStatus: item["saasSubscriptionStatus"],
    publisherId: item["publisherId"],
    purchaserEmailId: item["purchaserEmailId"],
    purchaserTenantId: item["purchaserTenantId"],
    termUnit: item["termUnit"],
    isAutoRenew: item["isAutoRenew"],
    isFreeTrial: item["isFreeTrial"],
  };
}

/** Activation Links model */
export interface ActivationLinks {
  /** New Cloud Account Activation Link */
  readonly newCloudAccountActivationLink?: string;
  /** Existing Cloud Account Activation Link */
  readonly existingCloudAccountActivationLink?: string;
}

export function activationLinksDeserializer(item: any): ActivationLinks {
  return {
    newCloudAccountActivationLink: item["newCloudAccountActivationLink"],
    existingCloudAccountActivationLink: item["existingCloudAccountActivationLink"],
  };
}

/** Azure Subscriptions model */
export interface AzureSubscriptions {
  /** Azure Subscription Ids to be updated */
  azureSubscriptionIds: string[];
}

export function azureSubscriptionsSerializer(item: AzureSubscriptions): any {
  return {
    azureSubscriptionIds: item["azureSubscriptionIds"].map((p: any) => {
      return p;
    }),
  };
}

/** The DbNode resource belonging to vmCluster */
export interface DbNode extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DbNodeProperties;
}

export function dbNodeDeserializer(item: any): DbNode {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dbNodePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of DbNodeResource */
export interface DbNodeProperties {
  /** DbNode OCID */
  ocid: string;
  /** Additional information about the planned maintenance. */
  additionalDetails?: string;
  /** The OCID of the backup IP address associated with the database node. */
  backupIpId?: string;
  /** The OCID of the second backup VNIC. */
  backupVnic2Id?: string;
  /** The OCID of the backup VNIC. */
  backupVnicId?: string;
  /** The number of CPU cores enabled on the Db node. */
  cpuCoreCount?: number;
  /** The allocated local node storage in GBs on the Db node. */
  dbNodeStorageSizeInGbs?: number;
  /** The OCID of the Exacc Db server associated with the database node. */
  dbServerId?: string;
  /** The OCID of the DB system. */
  dbSystemId: string;
  /** The name of the Fault Domain the instance is contained in. */
  faultDomain?: string;
  /** The OCID of the host IP address associated with the database node. */
  hostIpId?: string;
  /** The host name for the database node. */
  hostname?: string;
  /** The current state of the database node. */
  lifecycleState: DbNodeProvisioningState;
  /** Lifecycle details of Db Node. */
  lifecycleDetails?: string;
  /** The type of database node maintenance. */
  maintenanceType?: DbNodeMaintenanceType;
  /** The allocated memory in GBs on the Db node. */
  memorySizeInGbs?: number;
  /** The size (in GB) of the block storage volume allocation for the DB system. This attribute applies only for virtual machine DB systems. */
  softwareStorageSizeInGb?: number;
  /** The date and time that the database node was created. */
  timeCreated: Date;
  /** End date and time of maintenance window. */
  timeMaintenanceWindowEnd?: Date;
  /** Start date and time of maintenance window. */
  timeMaintenanceWindowStart?: Date;
  /** The OCID of the second VNIC. */
  vnic2Id?: string;
  /** The OCID of the VNIC. */
  vnicId: string;
  /** Azure resource provisioning state. */
  readonly provisioningState?: ResourceProvisioningState;
}

export function dbNodePropertiesDeserializer(item: any): DbNodeProperties {
  return {
    ocid: item["ocid"],
    additionalDetails: item["additionalDetails"],
    backupIpId: item["backupIpId"],
    backupVnic2Id: item["backupVnic2Id"],
    backupVnicId: item["backupVnicId"],
    cpuCoreCount: item["cpuCoreCount"],
    dbNodeStorageSizeInGbs: item["dbNodeStorageSizeInGbs"],
    dbServerId: item["dbServerId"],
    dbSystemId: item["dbSystemId"],
    faultDomain: item["faultDomain"],
    hostIpId: item["hostIpId"],
    hostname: item["hostname"],
    lifecycleState: item["lifecycleState"],
    lifecycleDetails: item["lifecycleDetails"],
    maintenanceType: item["maintenanceType"],
    memorySizeInGbs: item["memorySizeInGbs"],
    softwareStorageSizeInGb: item["softwareStorageSizeInGb"],
    timeCreated: new Date(item["timeCreated"]),
    timeMaintenanceWindowEnd: !item["timeMaintenanceWindowEnd"]
      ? item["timeMaintenanceWindowEnd"]
      : new Date(item["timeMaintenanceWindowEnd"]),
    timeMaintenanceWindowStart: !item["timeMaintenanceWindowStart"]
      ? item["timeMaintenanceWindowStart"]
      : new Date(item["timeMaintenanceWindowStart"]),
    vnic2Id: item["vnic2Id"],
    vnicId: item["vnicId"],
    provisioningState: item["provisioningState"],
  };
}

/** DnNode provisioning state enum */
export enum KnownDbNodeProvisioningState {
  /** Indicates that resource in Provisioning state */
  Provisioning = "Provisioning",
  /** Indicates that resource in Available state */
  Available = "Available",
  /** Indicates that resource in Updating state */
  Updating = "Updating",
  /** Indicates that resource in Stopping state */
  Stopping = "Stopping",
  /** Indicates that resource in Stopped state */
  Stopped = "Stopped",
  /** Indicates that resource in Starting state */
  Starting = "Starting",
  /** Indicates that resource in Terminating state */
  Terminating = "Terminating",
  /** Indicates that resource in Terminated state */
  Terminated = "Terminated",
  /** Indicates that resource in Failed state */
  Failed = "Failed",
}

/**
 * DnNode provisioning state enum \
 * {@link KnownDbNodeProvisioningState} can be used interchangeably with DbNodeProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Provisioning**: Indicates that resource in Provisioning state \
 * **Available**: Indicates that resource in Available state \
 * **Updating**: Indicates that resource in Updating state \
 * **Stopping**: Indicates that resource in Stopping state \
 * **Stopped**: Indicates that resource in Stopped state \
 * **Starting**: Indicates that resource in Starting state \
 * **Terminating**: Indicates that resource in Terminating state \
 * **Terminated**: Indicates that resource in Terminated state \
 * **Failed**: Indicates that resource in Failed state
 */
export type DbNodeProvisioningState = string;

/** The type of database node maintenance. */
export enum KnownDbNodeMaintenanceType {
  /** VMDB reboot migration maintenance type */
  VmdbRebootMigration = "VmdbRebootMigration",
}

/**
 * The type of database node maintenance. \
 * {@link KnownDbNodeMaintenanceType} can be used interchangeably with DbNodeMaintenanceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VmdbRebootMigration**: VMDB reboot migration maintenance type
 */
export type DbNodeMaintenanceType = string;

/** The response of a DbNode list operation. */
export interface _DbNodeListResult {
  /** The DbNode items on this page */
  value: DbNode[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dbNodeListResultDeserializer(item: any): _DbNodeListResult {
  return {
    value: dbNodeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dbNodeArrayDeserializer(result: Array<DbNode>): any[] {
  return result.map((item) => {
    return dbNodeDeserializer(item);
  });
}

/** DbNode action object */
export interface DbNodeAction {
  /** Db action */
  action: DbNodeActionEnum;
}

export function dbNodeActionSerializer(item: DbNodeAction): any {
  return { action: item["action"] };
}

/** DbNode action enum */
export enum KnownDbNodeActionEnum {
  /** Start DbNode */
  Start = "Start",
  /** Stop DbNode */
  Stop = "Stop",
  /** Soft reset DbNode */
  SoftReset = "SoftReset",
  /** Reset DbNode */
  Reset = "Reset",
}

/**
 * DbNode action enum \
 * {@link KnownDbNodeActionEnum} can be used interchangeably with DbNodeActionEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Start**: Start DbNode \
 * **Stop**: Stop DbNode \
 * **SoftReset**: Soft reset DbNode \
 * **Reset**: Reset DbNode
 */
export type DbNodeActionEnum = string;

/** GiVersion resource definition */
export interface GiVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: GiVersionProperties;
}

export function giVersionDeserializer(item: any): GiVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : giVersionPropertiesDeserializer(item["properties"]),
  };
}

/** GiVersion resource model */
export interface GiVersionProperties {
  /** A valid Oracle Grid Infrastructure (GI) software version. */
  version: string;
}

export function giVersionPropertiesDeserializer(item: any): GiVersionProperties {
  return {
    version: item["version"],
  };
}

/** The response of a GiVersion list operation. */
export interface _GiVersionListResult {
  /** The GiVersion items on this page */
  value: GiVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _giVersionListResultDeserializer(item: any): _GiVersionListResult {
  return {
    value: giVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function giVersionArrayDeserializer(result: Array<GiVersion>): any[] {
  return result.map((item) => {
    return giVersionDeserializer(item);
  });
}

/** The response of a GiMinorVersion list operation. */
export interface _GiMinorVersionListResult {
  /** The GiMinorVersion items on this page */
  value: GiMinorVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _giMinorVersionListResultDeserializer(item: any): _GiMinorVersionListResult {
  return {
    value: giMinorVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function giMinorVersionArrayDeserializer(result: Array<GiMinorVersion>): any[] {
  return result.map((item) => {
    return giMinorVersionDeserializer(item);
  });
}

/** The Oracle Grid Infrastructure (GI) minor version resource definition. */
export interface GiMinorVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: GiMinorVersionProperties;
}

export function giMinorVersionDeserializer(item: any): GiMinorVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : giMinorVersionPropertiesDeserializer(item["properties"]),
  };
}

/** The Oracle Grid Infrastructure (GI) minor version properties */
export interface GiMinorVersionProperties {
  /** A valid Oracle Grid Infrastructure (GI) software version. */
  version: string;
  /** Grid Infrastructure Image Id */
  gridImageOcid?: string;
}

export function giMinorVersionPropertiesDeserializer(item: any): GiMinorVersionProperties {
  return {
    version: item["version"],
    gridImageOcid: item["gridImageOcid"],
  };
}

/** DbSystemShape resource definition */
export interface DbSystemShape extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DbSystemShapeProperties;
}

export function dbSystemShapeDeserializer(item: any): DbSystemShape {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dbSystemShapePropertiesDeserializer(item["properties"]),
  };
}

/** DbSystemShape resource model */
export interface DbSystemShapeProperties {
  /** The family of the shape used for the DB system. */
  shapeFamily?: string;
  /** The shape used for the DB system. */
  shapeName: string;
  /** The maximum number of CPU cores that can be enabled on the DB system for this shape. */
  availableCoreCount: number;
  /** The minimum number of CPU cores that can be enabled on the DB system for this shape. */
  minimumCoreCount?: number;
  /** The runtime minimum number of CPU cores that can be enabled on the DB system for this shape. */
  runtimeMinimumCoreCount?: number;
  /** The discrete number by which the CPU core count for this shape can be increased or decreased. */
  coreCountIncrement?: number;
  /** The minimum number of Exadata storage servers available for the Exadata infrastructure. */
  minStorageCount?: number;
  /** The maximum number of Exadata storage servers available for the Exadata infrastructure. */
  maxStorageCount?: number;
  /** The maximum data storage available per storage server for this shape. Only applicable to ExaCC Elastic shapes. */
  availableDataStoragePerServerInTbs?: number;
  /** The maximum memory available per database node for this shape. Only applicable to ExaCC Elastic shapes. */
  availableMemoryPerNodeInGbs?: number;
  /** The maximum Db Node storage available per database node for this shape. Only applicable to ExaCC Elastic shapes. */
  availableDbNodePerNodeInGbs?: number;
  /** The minimum number of CPU cores that can be enabled per node for this shape. */
  minCoreCountPerNode?: number;
  /** The maximum memory that can be enabled for this shape. */
  availableMemoryInGbs?: number;
  /** The minimum memory that need be allocated per node for this shape. */
  minMemoryPerNodeInGbs?: number;
  /** The maximum Db Node storage that can be enabled for this shape. */
  availableDbNodeStorageInGbs?: number;
  /** The minimum Db Node storage that need be allocated per node for this shape. */
  minDbNodeStoragePerNodeInGbs?: number;
  /** The maximum DATA storage that can be enabled for this shape. */
  availableDataStorageInTbs?: number;
  /** The minimum data storage that need be allocated for this shape. */
  minDataStorageInTbs?: number;
  /** The minimum number of database nodes available for this shape. */
  minimumNodeCount?: number;
  /** The maximum number of database nodes available for this shape. */
  maximumNodeCount?: number;
  /** The maximum number of CPU cores per database node that can be enabled for this shape. Only applicable to the flex Exadata shape and ExaCC Elastic shapes. */
  availableCoreCountPerNode?: number;
  /** The compute model of the Exadata Infrastructure */
  computeModel?: ComputeModel;
  /** Indicates if the shape supports database and storage server types */
  areServerTypesSupported?: boolean;
  /** The display name of the shape used for the DB system */
  displayName?: string;
  /** The shapeAttributes of the DB system shape.. */
  shapeAttributes?: string[];
}

export function dbSystemShapePropertiesDeserializer(item: any): DbSystemShapeProperties {
  return {
    shapeFamily: item["shapeFamily"],
    shapeName: item["shapeName"],
    availableCoreCount: item["availableCoreCount"],
    minimumCoreCount: item["minimumCoreCount"],
    runtimeMinimumCoreCount: item["runtimeMinimumCoreCount"],
    coreCountIncrement: item["coreCountIncrement"],
    minStorageCount: item["minStorageCount"],
    maxStorageCount: item["maxStorageCount"],
    availableDataStoragePerServerInTbs: item["availableDataStoragePerServerInTbs"],
    availableMemoryPerNodeInGbs: item["availableMemoryPerNodeInGbs"],
    availableDbNodePerNodeInGbs: item["availableDbNodePerNodeInGbs"],
    minCoreCountPerNode: item["minCoreCountPerNode"],
    availableMemoryInGbs: item["availableMemoryInGbs"],
    minMemoryPerNodeInGbs: item["minMemoryPerNodeInGbs"],
    availableDbNodeStorageInGbs: item["availableDbNodeStorageInGbs"],
    minDbNodeStoragePerNodeInGbs: item["minDbNodeStoragePerNodeInGbs"],
    availableDataStorageInTbs: item["availableDataStorageInTbs"],
    minDataStorageInTbs: item["minDataStorageInTbs"],
    minimumNodeCount: item["minimumNodeCount"],
    maximumNodeCount: item["maximumNodeCount"],
    availableCoreCountPerNode: item["availableCoreCountPerNode"],
    computeModel: item["computeModel"],
    areServerTypesSupported: item["areServerTypesSupported"],
    displayName: item["displayName"],
    shapeAttributes: !item["shapeAttributes"]
      ? item["shapeAttributes"]
      : item["shapeAttributes"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a DbSystemShape list operation. */
export interface _DbSystemShapeListResult {
  /** The DbSystemShape items on this page */
  value: DbSystemShape[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dbSystemShapeListResultDeserializer(item: any): _DbSystemShapeListResult {
  return {
    value: dbSystemShapeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dbSystemShapeArrayDeserializer(result: Array<DbSystemShape>): any[] {
  return result.map((item) => {
    return dbSystemShapeDeserializer(item);
  });
}

/** DnsPrivateView resource definition */
export interface DnsPrivateView extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DnsPrivateViewProperties;
}

export function dnsPrivateViewDeserializer(item: any): DnsPrivateView {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dnsPrivateViewPropertiesDeserializer(item["properties"]),
  };
}

/** Views resource model */
export interface DnsPrivateViewProperties {
  /** The OCID of the view */
  ocid: string;
  /** The display name of the view resource */
  displayName: string;
  /** A Boolean flag indicating whether or not parts of the resource are unable to be explicitly managed. */
  isProtected: boolean;
  /** Views lifecycleState */
  lifecycleState: DnsPrivateViewsLifecycleState;
  /** The canonical absolute URL of the resource. */
  self: string;
  /** views timeCreated */
  timeCreated: Date;
  /** views timeCreated */
  timeUpdated: Date;
  /** Azure resource provisioning state. */
  readonly provisioningState?: ResourceProvisioningState;
}

export function dnsPrivateViewPropertiesDeserializer(item: any): DnsPrivateViewProperties {
  return {
    ocid: item["ocid"],
    displayName: item["displayName"],
    isProtected: item["isProtected"],
    lifecycleState: item["lifecycleState"],
    self: item["self"],
    timeCreated: new Date(item["timeCreated"]),
    timeUpdated: new Date(item["timeUpdated"]),
    provisioningState: item["provisioningState"],
  };
}

/** DNS Private Views lifecycle state enum */
export enum KnownDnsPrivateViewsLifecycleState {
  /** DNS Private View is active */
  Active = "Active",
  /** DNS Private View is deleted */
  Deleted = "Deleted",
  /** DNS Private View is deleting */
  Deleting = "Deleting",
  /** DNS Private View is updating */
  Updating = "Updating",
}

/**
 * DNS Private Views lifecycle state enum \
 * {@link KnownDnsPrivateViewsLifecycleState} can be used interchangeably with DnsPrivateViewsLifecycleState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: DNS Private View is active \
 * **Deleted**: DNS Private View is deleted \
 * **Deleting**: DNS Private View is deleting \
 * **Updating**: DNS Private View is updating
 */
export type DnsPrivateViewsLifecycleState = string;

/** The response of a DnsPrivateView list operation. */
export interface _DnsPrivateViewListResult {
  /** The DnsPrivateView items on this page */
  value: DnsPrivateView[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dnsPrivateViewListResultDeserializer(item: any): _DnsPrivateViewListResult {
  return {
    value: dnsPrivateViewArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dnsPrivateViewArrayDeserializer(result: Array<DnsPrivateView>): any[] {
  return result.map((item) => {
    return dnsPrivateViewDeserializer(item);
  });
}

/** DnsPrivateZone resource definition */
export interface DnsPrivateZone extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DnsPrivateZoneProperties;
}

export function dnsPrivateZoneDeserializer(item: any): DnsPrivateZone {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dnsPrivateZonePropertiesDeserializer(item["properties"]),
  };
}

/** Zones resource model */
export interface DnsPrivateZoneProperties {
  /** The OCID of the Zone */
  ocid: string;
  /** A Boolean flag indicating whether or not parts of the resource are unable to be explicitly managed. */
  isProtected: boolean;
  /** Zones lifecycleState */
  lifecycleState: DnsPrivateZonesLifecycleState;
  /** The canonical absolute URL of the resource. */
  self: string;
  /** The current serial of the zone. As seen in the zone's SOA record. */
  serial: number;
  /** Version is the never-repeating, totally-orderable, version of the zone, from which the serial field of the zone's SOA record is derived. */
  version: string;
  /** The OCID of the private view containing the zone. This value will be null for zones in the global DNS, which are publicly resolvable and not part of a private view. */
  viewId?: string;
  /** The type of the zone. Must be either PRIMARY or SECONDARY. SECONDARY is only supported for GLOBAL zones. */
  zoneType: ZoneType;
  /** Zones timeCreated */
  timeCreated: Date;
  /** Azure resource provisioning state. */
  readonly provisioningState?: ResourceProvisioningState;
}

export function dnsPrivateZonePropertiesDeserializer(item: any): DnsPrivateZoneProperties {
  return {
    ocid: item["ocid"],
    isProtected: item["isProtected"],
    lifecycleState: item["lifecycleState"],
    self: item["self"],
    serial: item["serial"],
    version: item["version"],
    viewId: item["viewId"],
    zoneType: item["zoneType"],
    timeCreated: new Date(item["timeCreated"]),
    provisioningState: item["provisioningState"],
  };
}

/** DNS Private Zones lifecycle state enum */
export enum KnownDnsPrivateZonesLifecycleState {
  /** DNS Private Zones is active */
  Active = "Active",
  /** DNS Private Zones is creating */
  Creating = "Creating",
  /** DNS Private Zones is deleted */
  Deleted = "Deleted",
  /** DNS Private Zones is deleting */
  Deleting = "Deleting",
  /** DNS Private Zones is updating */
  Updating = "Updating",
}

/**
 * DNS Private Zones lifecycle state enum \
 * {@link KnownDnsPrivateZonesLifecycleState} can be used interchangeably with DnsPrivateZonesLifecycleState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: DNS Private Zones is active \
 * **Creating**: DNS Private Zones is creating \
 * **Deleted**: DNS Private Zones is deleted \
 * **Deleting**: DNS Private Zones is deleting \
 * **Updating**: DNS Private Zones is updating
 */
export type DnsPrivateZonesLifecycleState = string;

/** Zone type enum */
export enum KnownZoneType {
  /** Primary zone */
  Primary = "Primary",
  /** Secondary zone */
  Secondary = "Secondary",
}

/**
 * Zone type enum \
 * {@link KnownZoneType} can be used interchangeably with ZoneType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary**: Primary zone \
 * **Secondary**: Secondary zone
 */
export type ZoneType = string;

/** The response of a DnsPrivateZone list operation. */
export interface _DnsPrivateZoneListResult {
  /** The DnsPrivateZone items on this page */
  value: DnsPrivateZone[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dnsPrivateZoneListResultDeserializer(item: any): _DnsPrivateZoneListResult {
  return {
    value: dnsPrivateZoneArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dnsPrivateZoneArrayDeserializer(result: Array<DnsPrivateZone>): any[] {
  return result.map((item) => {
    return dnsPrivateZoneDeserializer(item);
  });
}

/** FlexComponent Resource Definition */
export interface FlexComponent extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: FlexComponentProperties;
}

export function flexComponentDeserializer(item: any): FlexComponent {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : flexComponentPropertiesDeserializer(item["properties"]),
  };
}

/** FlexComponent resource model */
export interface FlexComponentProperties {
  /** The minimum number of CPU cores that can be enabled on the DB Server for this Flex Component. */
  readonly minimumCoreCount?: number;
  /** The maximum number of CPU cores that can be enabled on the DB Server for this Flex Component. */
  readonly availableCoreCount?: number;
  /** The maximum storage that can be enabled on the Storage Server for this Flex Component. */
  readonly availableDbStorageInGbs?: number;
  /** The runtime minimum number of CPU cores that can be enabled for this Flex Component. */
  readonly runtimeMinimumCoreCount?: number;
  /** The name of the DB system shape for this Flex Component. */
  readonly shape?: string;
  /** The maximum memory size that can be enabled on the DB Server for this Flex Component. */
  readonly availableMemoryInGbs?: number;
  /** The maximum local storage that can be enabled on the DB Server for this Flex Component. */
  readonly availableLocalStorageInGbs?: number;
  /** The compute model of the DB Server for this Flex Component. */
  readonly computeModel?: string;
  /** The hardware type of the DB (Compute) or Storage (Cell) Server for this Flex Component. */
  readonly hardwareType?: HardwareType;
  /** The description summary for this Flex Component. */
  readonly descriptionSummary?: string;
}

export function flexComponentPropertiesDeserializer(item: any): FlexComponentProperties {
  return {
    minimumCoreCount: item["minimumCoreCount"],
    availableCoreCount: item["availableCoreCount"],
    availableDbStorageInGbs: item["availableDbStorageInGbs"],
    runtimeMinimumCoreCount: item["runtimeMinimumCoreCount"],
    shape: item["shape"],
    availableMemoryInGbs: item["availableMemoryInGbs"],
    availableLocalStorageInGbs: item["availableLocalStorageInGbs"],
    computeModel: item["computeModel"],
    hardwareType: item["hardwareType"],
    descriptionSummary: item["descriptionSummary"],
  };
}

/** Hardware Type enum */
export enum KnownHardwareType {
  /** Hardware type is Database Server */
  Compute = "COMPUTE",
  /** Hardware type is Storage Server */
  Cell = "CELL",
}

/**
 * Hardware Type enum \
 * {@link KnownHardwareType} can be used interchangeably with HardwareType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **COMPUTE**: Hardware type is Database Server \
 * **CELL**: Hardware type is Storage Server
 */
export type HardwareType = string;

/** The response of a FlexComponent list operation. */
export interface _FlexComponentListResult {
  /** The FlexComponent items on this page */
  value: FlexComponent[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _flexComponentListResultDeserializer(item: any): _FlexComponentListResult {
  return {
    value: flexComponentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function flexComponentArrayDeserializer(result: Array<FlexComponent>): any[] {
  return result.map((item) => {
    return flexComponentDeserializer(item);
  });
}

/** The response of a AutonomousDatabase list operation. */
export interface _AutonomousDatabaseListResult {
  /** The AutonomousDatabase items on this page */
  value: AutonomousDatabase[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _autonomousDatabaseListResultDeserializer(
  item: any,
): _AutonomousDatabaseListResult {
  return {
    value: autonomousDatabaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function autonomousDatabaseArraySerializer(result: Array<AutonomousDatabase>): any[] {
  return result.map((item) => {
    return autonomousDatabaseSerializer(item);
  });
}

export function autonomousDatabaseArrayDeserializer(result: Array<AutonomousDatabase>): any[] {
  return result.map((item) => {
    return autonomousDatabaseDeserializer(item);
  });
}

/** Autonomous Database resource model. */
export interface AutonomousDatabase extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: AutonomousDatabaseBasePropertiesUnion;
}

export function autonomousDatabaseSerializer(item: AutonomousDatabase): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : autonomousDatabaseBasePropertiesUnionSerializer(item["properties"]),
  };
}

export function autonomousDatabaseDeserializer(item: any): AutonomousDatabase {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : autonomousDatabaseBasePropertiesUnionDeserializer(item["properties"]),
  };
}

/** Autonomous Database base resource model. */
export interface AutonomousDatabaseBaseProperties {
  /** Admin password. */
  adminPassword?: string;
  /** Database type to be created. */
  /** The discriminator possible values: Regular, Clone, CrossRegionDisasterRecovery, CloneFromBackupTimestamp */
  dataBaseType: DataBaseType;
  /** The maintenance schedule type of the Autonomous Database Serverless. */
  autonomousMaintenanceScheduleType?: AutonomousMaintenanceScheduleType;
  /** The character set for the autonomous database. */
  characterSet?: string;
  /** The compute amount (CPUs) available to the database. */
  computeCount?: number;
  /** The compute model of the Autonomous Database. */
  computeModel?: ComputeModel;
  /** The number of CPU cores to be made available to the database. */
  cpuCoreCount?: number;
  /** Customer Contacts. */
  customerContacts?: CustomerContact[];
  /** The quantity of data in the database, in terabytes. */
  dataStorageSizeInTbs?: number;
  /** The size, in gigabytes, of the data volume that will be created and attached to the database. */
  dataStorageSizeInGbs?: number;
  /** A valid Oracle Database version for Autonomous Database. */
  dbVersion?: string;
  /** The Autonomous Database workload type */
  dbWorkload?: WorkloadType;
  /** The user-friendly name for the Autonomous Database. */
  displayName?: string;
  /** Indicates if auto scaling is enabled for the Autonomous Database CPU core count. */
  isAutoScalingEnabled?: boolean;
  /** Indicates if auto scaling is enabled for the Autonomous Database storage. */
  isAutoScalingForStorageEnabled?: boolean;
  /** The list of Azure resource IDs of standby databases located in Autonomous Data Guard remote regions that are associated with the source database. Note that for Autonomous Database Serverless instances, standby databases located in the same region as the source primary database do not have Azure IDs. */
  readonly peerDbIds?: string[];
  /** The Azure resource ID of the Disaster Recovery peer database, which is located in a different region from the current peer database. */
  peerDbId?: string;
  /** Indicates whether the Autonomous Database has local or called in-region Data Guard enabled. */
  isLocalDataGuardEnabled?: boolean;
  /** Indicates whether the Autonomous Database has Cross Region Data Guard enabled. */
  readonly isRemoteDataGuardEnabled?: boolean;
  /** Indicates the local disaster recovery (DR) type of the Autonomous Database Serverless instance.Autonomous Data Guard (ADG) DR type provides business critical DR with a faster recovery time objective (RTO) during failover or switchover.Backup-based DR type provides lower cost DR with a slower RTO during failover or switchover. */
  readonly localDisasterRecoveryType?: DisasterRecoveryType;
  /** The date and time the Disaster Recovery role was switched for the standby Autonomous Database. */
  readonly timeDisasterRecoveryRoleChanged?: Date;
  /** Indicates remote disaster recovery configuration */
  readonly remoteDisasterRecoveryConfiguration?: DisasterRecoveryConfigurationDetails;
  /** Local Autonomous Disaster Recovery standby database details. */
  readonly localStandbyDb?: AutonomousDatabaseStandbySummary;
  /** Indicates the number of seconds of data loss for a Data Guard failover. */
  readonly failedDataRecoveryInSeconds?: number;
  /** Specifies if the Autonomous Database requires mTLS connections. */
  isMtlsConnectionRequired?: boolean;
  /** Specifies if the Autonomous Database preview version is being provisioned. */
  isPreviewVersionWithServiceTermsAccepted?: boolean;
  /** The Oracle license model that applies to the Oracle Autonomous Database. The default is LICENSE_INCLUDED. */
  licenseModel?: LicenseModel;
  /** The character set for the Autonomous Database. */
  ncharacterSet?: string;
  /** Additional information about the current lifecycle state. */
  readonly lifecycleDetails?: string;
  /** Azure resource provisioning state. */
  readonly provisioningState?: AzureResourceProvisioningState;
  /** Views lifecycleState */
  readonly lifecycleState?: AutonomousDatabaseLifecycleState;
  /** The list of scheduled operations. */
  scheduledOperationsList?: ScheduledOperationsType[];
  /** The private endpoint Ip address for the resource. */
  privateEndpointIp?: string;
  /** The resource's private endpoint label. */
  privateEndpointLabel?: string;
  /** HTTPS link to OCI resources exposed to Azure Customer via Azure Interface. */
  readonly ociUrl?: string;
  /** Client subnet */
  subnetId?: string;
  /** VNET for network connectivity */
  vnetId?: string;
  /** The date and time that the database was created. */
  readonly timeCreated?: Date;
  /** The date and time when maintenance will begin. */
  readonly timeMaintenanceBegin?: Date;
  /** The date and time when maintenance will end. */
  readonly timeMaintenanceEnd?: Date;
  /** The current amount of storage in use for user and system data, in terabytes (TB). */
  readonly actualUsedDataStorageSizeInTbs?: number;
  /** The amount of storage currently allocated for the database tables and billed for, rounded up. */
  readonly allocatedStorageSizeInTbs?: number;
  /** Information about Oracle APEX Application Development. */
  readonly apexDetails?: ApexDetailsType;
  /** List of Oracle Database versions available for a database upgrade. If there are no version upgrades available, this list is empty. */
  readonly availableUpgradeVersions?: string[];
  /** The connection string used to connect to the Autonomous Database. */
  readonly connectionStrings?: ConnectionStringType;
  /** The URLs for accessing Oracle Application Express (APEX) and SQL Developer Web with a browser from a Compute instance within your VCN or that has a direct connection to your VCN. */
  readonly connectionUrls?: ConnectionUrlType;
  /** Status of the Data Safe registration for this Autonomous Database. */
  readonly dataSafeStatus?: DataSafeStatusType;
  /** The Oracle Database Edition that applies to the Autonomous databases. */
  databaseEdition?: DatabaseEditionType;
  /** Autonomous Database ID */
  autonomousDatabaseId?: string;
  /** The area assigned to In-Memory tables in Autonomous Database. */
  readonly inMemoryAreaInGbs?: number;
  /** The date and time when the next long-term backup would be created. */
  readonly nextLongTermBackupTimeStamp?: Date;
  /** Details for the long-term backup schedule. */
  longTermBackupSchedule?: LongTermBackUpScheduleDetails;
  /** Indicates if the Autonomous Database version is a preview version. */
  readonly isPreview?: boolean;
  /** Parameter that allows users to select an acceptable maximum data loss limit in seconds, up to which Automatic Failover will be triggered when necessary for a Local Autonomous Data Guard */
  localAdgAutoFailoverMaxDataLossLimit?: number;
  /** The amount of memory (in GBs) enabled per ECPU or OCPU. */
  readonly memoryPerOracleComputeUnitInGbs?: number;
  /** Indicates the Autonomous Database mode. */
  openMode?: OpenModeType;
  /** Status of Operations Insights for this Autonomous Database. */
  readonly operationsInsightsStatus?: OperationsInsightsStatusType;
  /** The Autonomous Database permission level. */
  permissionLevel?: PermissionLevelType;
  /** The private endpoint for the resource. */
  readonly privateEndpoint?: string;
  /** An array of CPU values that an Autonomous Database can be scaled to. */
  readonly provisionableCpus?: number[];
  /** The Data Guard role of the Autonomous Container Database or Autonomous Database, if Autonomous Data Guard is enabled. */
  role?: RoleType;
  /** The URL of the Service Console for the Autonomous Database. */
  readonly serviceConsoleUrl?: string;
  /** The SQL Web Developer URL for the Oracle Autonomous Database. */
  readonly sqlWebDeveloperUrl?: string;
  /** The list of regions that support the creation of an Autonomous Database clone or an Autonomous Data Guard standby database. */
  readonly supportedRegionsToCloneTo?: string[];
  /** The date and time the Autonomous Data Guard role was switched for the Autonomous Database. */
  readonly timeDataGuardRoleChanged?: string;
  /** The date and time the Always Free database will be automatically deleted because of inactivity. */
  readonly timeDeletionOfFreeAutonomousDatabase?: string;
  /** The date and time that Autonomous Data Guard was enabled for an Autonomous Database where the standby was provisioned in the same region as the primary database. */
  readonly timeLocalDataGuardEnabled?: string;
  /** The timestamp of the last failover operation. */
  readonly timeOfLastFailover?: string;
  /** The date and time when last refresh happened. */
  readonly timeOfLastRefresh?: string;
  /** The refresh point timestamp (UTC). */
  readonly timeOfLastRefreshPoint?: string;
  /** The timestamp of the last switchover operation for the Autonomous Database. */
  readonly timeOfLastSwitchover?: string;
  /** The date and time the Always Free database will be stopped because of inactivity. */
  readonly timeReclamationOfFreeAutonomousDatabase?: string;
  /** The storage space consumed by Autonomous Database in GBs. */
  readonly usedDataStorageSizeInGbs?: number;
  /** The amount of storage that has been used, in terabytes. */
  readonly usedDataStorageSizeInTbs?: number;
  /** Database ocid */
  readonly ocid?: string;
  /** Retention period, in days, for long-term backups */
  backupRetentionPeriodInDays?: number;
  /** The client IP access control list (ACL). This is an array of CIDR notations and/or IP addresses. Values should be separate strings, separated by commas. Example: ['1.1.1.1','1.1.1.0/24','1.1.2.25'] */
  whitelistedIps?: string[];
}

export function autonomousDatabaseBasePropertiesSerializer(
  item: AutonomousDatabaseBaseProperties,
): any {
  return {
    adminPassword: item["adminPassword"],
    dataBaseType: item["dataBaseType"],
    autonomousMaintenanceScheduleType: item["autonomousMaintenanceScheduleType"],
    characterSet: item["characterSet"],
    computeCount: item["computeCount"],
    computeModel: item["computeModel"],
    cpuCoreCount: item["cpuCoreCount"],
    customerContacts: !item["customerContacts"]
      ? item["customerContacts"]
      : customerContactArraySerializer(item["customerContacts"]),
    dataStorageSizeInTbs: item["dataStorageSizeInTbs"],
    dataStorageSizeInGbs: item["dataStorageSizeInGbs"],
    dbVersion: item["dbVersion"],
    dbWorkload: item["dbWorkload"],
    displayName: item["displayName"],
    isAutoScalingEnabled: item["isAutoScalingEnabled"],
    isAutoScalingForStorageEnabled: item["isAutoScalingForStorageEnabled"],
    peerDbId: item["peerDbId"],
    isLocalDataGuardEnabled: item["isLocalDataGuardEnabled"],
    isMtlsConnectionRequired: item["isMtlsConnectionRequired"],
    isPreviewVersionWithServiceTermsAccepted: item["isPreviewVersionWithServiceTermsAccepted"],
    licenseModel: item["licenseModel"],
    ncharacterSet: item["ncharacterSet"],
    scheduledOperationsList: !item["scheduledOperationsList"]
      ? item["scheduledOperationsList"]
      : scheduledOperationsTypeArraySerializer(item["scheduledOperationsList"]),
    privateEndpointIp: item["privateEndpointIp"],
    privateEndpointLabel: item["privateEndpointLabel"],
    subnetId: item["subnetId"],
    vnetId: item["vnetId"],
    databaseEdition: item["databaseEdition"],
    autonomousDatabaseId: item["autonomousDatabaseId"],
    longTermBackupSchedule: !item["longTermBackupSchedule"]
      ? item["longTermBackupSchedule"]
      : longTermBackUpScheduleDetailsSerializer(item["longTermBackupSchedule"]),
    localAdgAutoFailoverMaxDataLossLimit: item["localAdgAutoFailoverMaxDataLossLimit"],
    openMode: item["openMode"],
    permissionLevel: item["permissionLevel"],
    role: item["role"],
    backupRetentionPeriodInDays: item["backupRetentionPeriodInDays"],
    whitelistedIps: !item["whitelistedIps"]
      ? item["whitelistedIps"]
      : item["whitelistedIps"].map((p: any) => {
          return p;
        }),
  };
}

export function autonomousDatabaseBasePropertiesDeserializer(
  item: any,
): AutonomousDatabaseBaseProperties {
  return {
    adminPassword: item["adminPassword"],
    dataBaseType: item["dataBaseType"],
    autonomousMaintenanceScheduleType: item["autonomousMaintenanceScheduleType"],
    characterSet: item["characterSet"],
    computeCount: item["computeCount"],
    computeModel: item["computeModel"],
    cpuCoreCount: item["cpuCoreCount"],
    customerContacts: !item["customerContacts"]
      ? item["customerContacts"]
      : customerContactArrayDeserializer(item["customerContacts"]),
    dataStorageSizeInTbs: item["dataStorageSizeInTbs"],
    dataStorageSizeInGbs: item["dataStorageSizeInGbs"],
    dbVersion: item["dbVersion"],
    dbWorkload: item["dbWorkload"],
    displayName: item["displayName"],
    isAutoScalingEnabled: item["isAutoScalingEnabled"],
    isAutoScalingForStorageEnabled: item["isAutoScalingForStorageEnabled"],
    peerDbIds: !item["peerDbIds"]
      ? item["peerDbIds"]
      : item["peerDbIds"].map((p: any) => {
          return p;
        }),
    peerDbId: item["peerDbId"],
    isLocalDataGuardEnabled: item["isLocalDataGuardEnabled"],
    isRemoteDataGuardEnabled: item["isRemoteDataGuardEnabled"],
    localDisasterRecoveryType: item["localDisasterRecoveryType"],
    timeDisasterRecoveryRoleChanged: !item["timeDisasterRecoveryRoleChanged"]
      ? item["timeDisasterRecoveryRoleChanged"]
      : new Date(item["timeDisasterRecoveryRoleChanged"]),
    remoteDisasterRecoveryConfiguration: !item["remoteDisasterRecoveryConfiguration"]
      ? item["remoteDisasterRecoveryConfiguration"]
      : disasterRecoveryConfigurationDetailsDeserializer(
          item["remoteDisasterRecoveryConfiguration"],
        ),
    localStandbyDb: !item["localStandbyDb"]
      ? item["localStandbyDb"]
      : autonomousDatabaseStandbySummaryDeserializer(item["localStandbyDb"]),
    failedDataRecoveryInSeconds: item["failedDataRecoveryInSeconds"],
    isMtlsConnectionRequired: item["isMtlsConnectionRequired"],
    isPreviewVersionWithServiceTermsAccepted: item["isPreviewVersionWithServiceTermsAccepted"],
    licenseModel: item["licenseModel"],
    ncharacterSet: item["ncharacterSet"],
    lifecycleDetails: item["lifecycleDetails"],
    provisioningState: item["provisioningState"],
    lifecycleState: item["lifecycleState"],
    scheduledOperationsList: !item["scheduledOperationsList"]
      ? item["scheduledOperationsList"]
      : scheduledOperationsTypeArrayDeserializer(item["scheduledOperationsList"]),
    privateEndpointIp: item["privateEndpointIp"],
    privateEndpointLabel: item["privateEndpointLabel"],
    ociUrl: item["ociUrl"],
    subnetId: item["subnetId"],
    vnetId: item["vnetId"],
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    timeMaintenanceBegin: !item["timeMaintenanceBegin"]
      ? item["timeMaintenanceBegin"]
      : new Date(item["timeMaintenanceBegin"]),
    timeMaintenanceEnd: !item["timeMaintenanceEnd"]
      ? item["timeMaintenanceEnd"]
      : new Date(item["timeMaintenanceEnd"]),
    actualUsedDataStorageSizeInTbs: item["actualUsedDataStorageSizeInTbs"],
    allocatedStorageSizeInTbs: item["allocatedStorageSizeInTbs"],
    apexDetails: !item["apexDetails"]
      ? item["apexDetails"]
      : apexDetailsTypeDeserializer(item["apexDetails"]),
    availableUpgradeVersions: !item["availableUpgradeVersions"]
      ? item["availableUpgradeVersions"]
      : item["availableUpgradeVersions"].map((p: any) => {
          return p;
        }),
    connectionStrings: !item["connectionStrings"]
      ? item["connectionStrings"]
      : connectionStringTypeDeserializer(item["connectionStrings"]),
    connectionUrls: !item["connectionUrls"]
      ? item["connectionUrls"]
      : connectionUrlTypeDeserializer(item["connectionUrls"]),
    dataSafeStatus: item["dataSafeStatus"],
    databaseEdition: item["databaseEdition"],
    autonomousDatabaseId: item["autonomousDatabaseId"],
    inMemoryAreaInGbs: item["inMemoryAreaInGbs"],
    nextLongTermBackupTimeStamp: !item["nextLongTermBackupTimeStamp"]
      ? item["nextLongTermBackupTimeStamp"]
      : new Date(item["nextLongTermBackupTimeStamp"]),
    longTermBackupSchedule: !item["longTermBackupSchedule"]
      ? item["longTermBackupSchedule"]
      : longTermBackUpScheduleDetailsDeserializer(item["longTermBackupSchedule"]),
    isPreview: item["isPreview"],
    localAdgAutoFailoverMaxDataLossLimit: item["localAdgAutoFailoverMaxDataLossLimit"],
    memoryPerOracleComputeUnitInGbs: item["memoryPerOracleComputeUnitInGbs"],
    openMode: item["openMode"],
    operationsInsightsStatus: item["operationsInsightsStatus"],
    permissionLevel: item["permissionLevel"],
    privateEndpoint: item["privateEndpoint"],
    provisionableCpus: !item["provisionableCpus"]
      ? item["provisionableCpus"]
      : item["provisionableCpus"].map((p: any) => {
          return p;
        }),
    role: item["role"],
    serviceConsoleUrl: item["serviceConsoleUrl"],
    sqlWebDeveloperUrl: item["sqlWebDeveloperUrl"],
    supportedRegionsToCloneTo: !item["supportedRegionsToCloneTo"]
      ? item["supportedRegionsToCloneTo"]
      : item["supportedRegionsToCloneTo"].map((p: any) => {
          return p;
        }),
    timeDataGuardRoleChanged: item["timeDataGuardRoleChanged"],
    timeDeletionOfFreeAutonomousDatabase: item["timeDeletionOfFreeAutonomousDatabase"],
    timeLocalDataGuardEnabled: item["timeLocalDataGuardEnabled"],
    timeOfLastFailover: item["timeOfLastFailover"],
    timeOfLastRefresh: item["timeOfLastRefresh"],
    timeOfLastRefreshPoint: item["timeOfLastRefreshPoint"],
    timeOfLastSwitchover: item["timeOfLastSwitchover"],
    timeReclamationOfFreeAutonomousDatabase: item["timeReclamationOfFreeAutonomousDatabase"],
    usedDataStorageSizeInGbs: item["usedDataStorageSizeInGbs"],
    usedDataStorageSizeInTbs: item["usedDataStorageSizeInTbs"],
    ocid: item["ocid"],
    backupRetentionPeriodInDays: item["backupRetentionPeriodInDays"],
    whitelistedIps: !item["whitelistedIps"]
      ? item["whitelistedIps"]
      : item["whitelistedIps"].map((p: any) => {
          return p;
        }),
  };
}

/** Alias for AutonomousDatabaseBasePropertiesUnion */
export type AutonomousDatabaseBasePropertiesUnion =
  | AutonomousDatabaseProperties
  | AutonomousDatabaseCloneProperties
  | AutonomousDatabaseCrossRegionDisasterRecoveryProperties
  | AutonomousDatabaseFromBackupTimestampProperties
  | AutonomousDatabaseBaseProperties;

export function autonomousDatabaseBasePropertiesUnionSerializer(
  item: AutonomousDatabaseBasePropertiesUnion,
): any {
  switch (item.dataBaseType) {
    case "Regular":
      return autonomousDatabasePropertiesSerializer(item as AutonomousDatabaseProperties);

    case "Clone":
      return autonomousDatabaseClonePropertiesSerializer(item as AutonomousDatabaseCloneProperties);

    case "CrossRegionDisasterRecovery":
      return autonomousDatabaseCrossRegionDisasterRecoveryPropertiesSerializer(
        item as AutonomousDatabaseCrossRegionDisasterRecoveryProperties,
      );

    case "CloneFromBackupTimestamp":
      return autonomousDatabaseFromBackupTimestampPropertiesSerializer(
        item as AutonomousDatabaseFromBackupTimestampProperties,
      );

    default:
      return autonomousDatabaseBasePropertiesSerializer(item);
  }
}

export function autonomousDatabaseBasePropertiesUnionDeserializer(
  item: any,
): AutonomousDatabaseBasePropertiesUnion {
  switch (item.dataBaseType) {
    case "Regular":
      return autonomousDatabasePropertiesDeserializer(item as AutonomousDatabaseProperties);

    case "Clone":
      return autonomousDatabaseClonePropertiesDeserializer(
        item as AutonomousDatabaseCloneProperties,
      );

    case "CrossRegionDisasterRecovery":
      return autonomousDatabaseCrossRegionDisasterRecoveryPropertiesDeserializer(
        item as AutonomousDatabaseCrossRegionDisasterRecoveryProperties,
      );

    case "CloneFromBackupTimestamp":
      return autonomousDatabaseFromBackupTimestampPropertiesDeserializer(
        item as AutonomousDatabaseFromBackupTimestampProperties,
      );

    default:
      return autonomousDatabaseBasePropertiesDeserializer(item);
  }
}

/** Database type enum */
export enum KnownDataBaseType {
  /** Regular DB */
  Regular = "Regular",
  /** Clone DB */
  Clone = "Clone",
  /** Clone DB from backup timestamp */
  CloneFromBackupTimestamp = "CloneFromBackupTimestamp",
  /** Cross Region Disaster Recovery */
  CrossRegionDisasterRecovery = "CrossRegionDisasterRecovery",
}

/**
 * Database type enum \
 * {@link KnownDataBaseType} can be used interchangeably with DataBaseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regular**: Regular DB \
 * **Clone**: Clone DB \
 * **CloneFromBackupTimestamp**: Clone DB from backup timestamp \
 * **CrossRegionDisasterRecovery**: Cross Region Disaster Recovery
 */
export type DataBaseType = string;

/** Autonomous database maintenance schedule type enum. */
export enum KnownAutonomousMaintenanceScheduleType {
  /** Early maintenance schedule */
  Early = "Early",
  /** Regular maintenance schedule */
  Regular = "Regular",
}

/**
 * Autonomous database maintenance schedule type enum. \
 * {@link KnownAutonomousMaintenanceScheduleType} can be used interchangeably with AutonomousMaintenanceScheduleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Early**: Early maintenance schedule \
 * **Regular**: Regular maintenance schedule
 */
export type AutonomousMaintenanceScheduleType = string;

/** WorkloadType enum */
export enum KnownWorkloadType {
  /** OLTP - indicates an Autonomous Transaction Processing database */
  Oltp = "OLTP",
  /** DW - indicates an Autonomous Data Warehouse database */
  DW = "DW",
  /** AJD - indicates an Autonomous JSON Database */
  AJD = "AJD",
  /** APEX - indicates an Autonomous Database with the Oracle APEX Application Development workload type. */
  Apex = "APEX",
}

/**
 * WorkloadType enum \
 * {@link KnownWorkloadType} can be used interchangeably with WorkloadType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OLTP**: OLTP - indicates an Autonomous Transaction Processing database \
 * **DW**: DW - indicates an Autonomous Data Warehouse database \
 * **AJD**: AJD - indicates an Autonomous JSON Database \
 * **APEX**: APEX - indicates an Autonomous Database with the Oracle APEX Application Development workload type.
 */
export type WorkloadType = string;

/** Disaster recovery type enum. */
export enum KnownDisasterRecoveryType {
  /** ADG type */
  Adg = "Adg",
  /** Backup based type */
  BackupBased = "BackupBased",
}

/**
 * Disaster recovery type enum. \
 * {@link KnownDisasterRecoveryType} can be used interchangeably with DisasterRecoveryType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Adg**: ADG type \
 * **BackupBased**: Backup based type
 */
export type DisasterRecoveryType = string;

/** Configurations of a Disaster Recovery Details */
export interface DisasterRecoveryConfigurationDetails {
  /** Indicates the disaster recovery (DR) type of the Autonomous Database Serverless instance. Autonomous Data Guard (ADG) DR type provides business critical DR with a faster recovery time objective (RTO) during failover or switchover. Backup-based DR type provides lower cost DR with a slower RTO during failover or switchover. */
  disasterRecoveryType?: DisasterRecoveryType;
  /** Time and date stored as an RFC 3339 formatted timestamp string. For example, 2022-01-01T12:00:00.000Z would set a limit for the snapshot standby to be converted back to a cross-region standby database. */
  timeSnapshotStandbyEnabledTill?: Date;
  /** Indicates if user wants to convert to a snapshot standby. For example, true would set a standby database to snapshot standby database. False would set a snapshot standby database back to regular standby database. */
  isSnapshotStandby?: boolean;
  /** If true, 7 days worth of backups are replicated across regions for Cross-Region ADB or Backup-Based DR between Primary and Standby. If false, the backups taken on the Primary are not replicated to the Standby database. */
  isReplicateAutomaticBackups?: boolean;
}

export function disasterRecoveryConfigurationDetailsSerializer(
  item: DisasterRecoveryConfigurationDetails,
): any {
  return {
    disasterRecoveryType: item["disasterRecoveryType"],
    timeSnapshotStandbyEnabledTill: !item["timeSnapshotStandbyEnabledTill"]
      ? item["timeSnapshotStandbyEnabledTill"]
      : item["timeSnapshotStandbyEnabledTill"].toISOString(),
    isSnapshotStandby: item["isSnapshotStandby"],
    isReplicateAutomaticBackups: item["isReplicateAutomaticBackups"],
  };
}

export function disasterRecoveryConfigurationDetailsDeserializer(
  item: any,
): DisasterRecoveryConfigurationDetails {
  return {
    disasterRecoveryType: item["disasterRecoveryType"],
    timeSnapshotStandbyEnabledTill: !item["timeSnapshotStandbyEnabledTill"]
      ? item["timeSnapshotStandbyEnabledTill"]
      : new Date(item["timeSnapshotStandbyEnabledTill"]),
    isSnapshotStandby: item["isSnapshotStandby"],
    isReplicateAutomaticBackups: item["isReplicateAutomaticBackups"],
  };
}

/** Autonomous Disaster Recovery standby database details. */
export interface AutonomousDatabaseStandbySummary {
  /** The amount of time, in seconds, that the data of the standby database lags the data of the primary database. Can be used to determine the potential data loss in the event of a failover. */
  lagTimeInSeconds?: number;
  /** The current state of the Autonomous Database. */
  lifecycleState?: AutonomousDatabaseLifecycleState;
  /** Additional information about the current lifecycle state. */
  lifecycleDetails?: string;
  /** The date and time the Autonomous Data Guard role was switched for the standby Autonomous Database. */
  timeDataGuardRoleChanged?: string;
  /** The date and time the Disaster Recovery role was switched for the standby Autonomous Database. */
  timeDisasterRecoveryRoleChanged?: string;
}

export function autonomousDatabaseStandbySummaryDeserializer(
  item: any,
): AutonomousDatabaseStandbySummary {
  return {
    lagTimeInSeconds: item["lagTimeInSeconds"],
    lifecycleState: item["lifecycleState"],
    lifecycleDetails: item["lifecycleDetails"],
    timeDataGuardRoleChanged: item["timeDataGuardRoleChanged"],
    timeDisasterRecoveryRoleChanged: item["timeDisasterRecoveryRoleChanged"],
  };
}

/** Autonomous database lifecycle state enum */
export enum KnownAutonomousDatabaseLifecycleState {
  /** Indicates that resource in Provisioning state */
  Provisioning = "Provisioning",
  /** Indicates that resource in Available state */
  Available = "Available",
  /** Indicates that resource in Stopping state */
  Stopping = "Stopping",
  /** Indicates that resource in Stopped state */
  Stopped = "Stopped",
  /** Indicates that resource in Starting state */
  Starting = "Starting",
  /** Indicates that resource in Terminating state */
  Terminating = "Terminating",
  /** Indicates that resource in Terminated state */
  Terminated = "Terminated",
  /** Indicates that resource in Unavailable state */
  Unavailable = "Unavailable",
  /** Indicates that resource in RestoreInProgress state */
  RestoreInProgress = "RestoreInProgress",
  /** Indicates that resource in RestoreFailed state */
  RestoreFailed = "RestoreFailed",
  /** Indicates that resource in BackupInProgress state */
  BackupInProgress = "BackupInProgress",
  /** Indicates that resource in ScaleInProgress state */
  ScaleInProgress = "ScaleInProgress",
  /** Indicates that resource is available but needs attention */
  AvailableNeedsAttention = "AvailableNeedsAttention",
  /** Indicates that resource in Updating state */
  Updating = "Updating",
  /** Indicates that resource maintenance in progress state */
  MaintenanceInProgress = "MaintenanceInProgress",
  /** Indicates that resource in Restarting state */
  Restarting = "Restarting",
  /** Indicates that resource in Recreating state */
  Recreating = "Recreating",
  /** Indicates that resource role change in progress state */
  RoleChangeInProgress = "RoleChangeInProgress",
  /** Indicates that resource in Upgrading state */
  Upgrading = "Upgrading",
  /** IIndicates that resource in Inaccessible state */
  Inaccessible = "Inaccessible",
  /** Indicates that resource in Standby state */
  Standby = "Standby",
}

/**
 * Autonomous database lifecycle state enum \
 * {@link KnownAutonomousDatabaseLifecycleState} can be used interchangeably with AutonomousDatabaseLifecycleState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Provisioning**: Indicates that resource in Provisioning state \
 * **Available**: Indicates that resource in Available state \
 * **Stopping**: Indicates that resource in Stopping state \
 * **Stopped**: Indicates that resource in Stopped state \
 * **Starting**: Indicates that resource in Starting state \
 * **Terminating**: Indicates that resource in Terminating state \
 * **Terminated**: Indicates that resource in Terminated state \
 * **Unavailable**: Indicates that resource in Unavailable state \
 * **RestoreInProgress**: Indicates that resource in RestoreInProgress state \
 * **RestoreFailed**: Indicates that resource in RestoreFailed state \
 * **BackupInProgress**: Indicates that resource in BackupInProgress state \
 * **ScaleInProgress**: Indicates that resource in ScaleInProgress state \
 * **AvailableNeedsAttention**: Indicates that resource is available but needs attention \
 * **Updating**: Indicates that resource in Updating state \
 * **MaintenanceInProgress**: Indicates that resource maintenance in progress state \
 * **Restarting**: Indicates that resource in Restarting state \
 * **Recreating**: Indicates that resource in Recreating state \
 * **RoleChangeInProgress**: Indicates that resource role change in progress state \
 * **Upgrading**: Indicates that resource in Upgrading state \
 * **Inaccessible**: IIndicates that resource in Inaccessible state \
 * **Standby**: Indicates that resource in Standby state
 */
export type AutonomousDatabaseLifecycleState = string;

export function scheduledOperationsTypeArraySerializer(
  result: Array<ScheduledOperationsType>,
): any[] {
  return result.map((item) => {
    return scheduledOperationsTypeSerializer(item);
  });
}

export function scheduledOperationsTypeArrayDeserializer(
  result: Array<ScheduledOperationsType>,
): any[] {
  return result.map((item) => {
    return scheduledOperationsTypeDeserializer(item);
  });
}

/** The list of scheduled operations. */
export interface ScheduledOperationsType {
  /** Day of week */
  dayOfWeek: DayOfWeek;
  /** auto start time. value must be of ISO-8601 format HH:mm */
  scheduledStartTime?: string;
  /** auto stop time. value must be of ISO-8601 format HH:mm */
  scheduledStopTime?: string;
}

export function scheduledOperationsTypeSerializer(item: ScheduledOperationsType): any {
  return {
    dayOfWeek: dayOfWeekSerializer(item["dayOfWeek"]),
    scheduledStartTime: item["scheduledStartTime"],
    scheduledStopTime: item["scheduledStopTime"],
  };
}

export function scheduledOperationsTypeDeserializer(item: any): ScheduledOperationsType {
  return {
    dayOfWeek: dayOfWeekDeserializer(item["dayOfWeek"]),
    scheduledStartTime: item["scheduledStartTime"],
    scheduledStopTime: item["scheduledStopTime"],
  };
}

/** Information about Oracle APEX Application Development. */
export interface ApexDetailsType {
  /** The Oracle APEX Application Development version. */
  apexVersion?: string;
  /** The Oracle REST Data Services (ORDS) version. */
  ordsVersion?: string;
}

export function apexDetailsTypeDeserializer(item: any): ApexDetailsType {
  return {
    apexVersion: item["apexVersion"],
    ordsVersion: item["ordsVersion"],
  };
}

/** Connection strings to connect to an Oracle Autonomous Database. */
export interface ConnectionStringType {
  /** Returns all connection strings that can be used to connect to the Autonomous Database. */
  allConnectionStrings?: AllConnectionStringType;
  /** The database service provides the least level of resources to each SQL statement, but supports the most number of concurrent SQL statements. */
  dedicated?: string;
  /** The High database service provides the highest level of resources to each SQL statement resulting in the highest performance, but supports the fewest number of concurrent SQL statements. */
  high?: string;
  /** The Low database service provides the least level of resources to each SQL statement, but supports the most number of concurrent SQL statements. */
  low?: string;
  /** The Medium database service provides a lower level of resources to each SQL statement potentially resulting a lower level of performance, but supports more concurrent SQL statements. */
  medium?: string;
  /** A list of connection string profiles to allow clients to group, filter and select connection string values based on structured metadata. */
  profiles?: ProfileType[];
}

export function connectionStringTypeDeserializer(item: any): ConnectionStringType {
  return {
    allConnectionStrings: !item["allConnectionStrings"]
      ? item["allConnectionStrings"]
      : allConnectionStringTypeDeserializer(item["allConnectionStrings"]),
    dedicated: item["dedicated"],
    high: item["high"],
    low: item["low"],
    medium: item["medium"],
    profiles: !item["profiles"] ? item["profiles"] : profileTypeArrayDeserializer(item["profiles"]),
  };
}

/** The connection string profile to allow clients to group, filter and select connection string values based on structured metadata. */
export interface AllConnectionStringType {
  /** The High database service provides the highest level of resources to each SQL statement resulting in the highest performance, but supports the fewest number of concurrent SQL statements. */
  high?: string;
  /** The Low database service provides the least level of resources to each SQL statement, but supports the most number of concurrent SQL statements. */
  low?: string;
  /** The Medium database service provides a lower level of resources to each SQL statement potentially resulting a lower level of performance, but supports more concurrent SQL statements. */
  medium?: string;
}

export function allConnectionStringTypeDeserializer(item: any): AllConnectionStringType {
  return {
    high: item["high"],
    low: item["low"],
    medium: item["medium"],
  };
}

export function profileTypeArrayDeserializer(result: Array<ProfileType>): any[] {
  return result.map((item) => {
    return profileTypeDeserializer(item);
  });
}

/** The connection string profile to allow clients to group, filter and select connection string values based on structured metadata. */
export interface ProfileType {
  /** Consumer group used by the connection. */
  consumerGroup?: ConsumerGroup;
  /** A user-friendly name for the connection. */
  displayName: string;
  /** Host format used in connection string. */
  hostFormat: HostFormatType;
  /** True for a regional connection string, applicable to cross-region DG only. */
  isRegional?: boolean;
  /** Protocol used by the connection. */
  protocol: ProtocolType;
  /** Specifies whether the listener performs a direct hand-off of the session, or redirects the session. */
  sessionMode: SessionModeType;
  /** Specifies whether the connection string is using the long (LONG), Easy Connect (EZCONNECT), or Easy Connect Plus (EZCONNECTPLUS) format. */
  syntaxFormat: SyntaxFormatType;
  /** Specifies whether the TLS handshake is using one-way (SERVER) or mutual (MUTUAL) authentication. */
  tlsAuthentication?: TlsAuthenticationType;
  /** Connection string value. */
  value: string;
}

export function profileTypeDeserializer(item: any): ProfileType {
  return {
    consumerGroup: item["consumerGroup"],
    displayName: item["displayName"],
    hostFormat: item["hostFormat"],
    isRegional: item["isRegional"],
    protocol: item["protocol"],
    sessionMode: item["sessionMode"],
    syntaxFormat: item["syntaxFormat"],
    tlsAuthentication: item["tlsAuthentication"],
    value: item["value"],
  };
}

/** Consumer group enum. */
export enum KnownConsumerGroup {
  /** High group */
  High = "High",
  /** Medium group */
  Medium = "Medium",
  /** Low group */
  Low = "Low",
  /** TP group */
  Tp = "Tp",
  /** TPurgent group */
  Tpurgent = "Tpurgent",
}

/**
 * Consumer group enum. \
 * {@link KnownConsumerGroup} can be used interchangeably with ConsumerGroup,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **High**: High group \
 * **Medium**: Medium group \
 * **Low**: Low group \
 * **Tp**: TP group \
 * **Tpurgent**: TPurgent group
 */
export type ConsumerGroup = string;

/** Host format type enum. */
export enum KnownHostFormatType {
  /** FQDN format */
  Fqdn = "Fqdn",
  /** IP format */
  Ip = "Ip",
}

/**
 * Host format type enum. \
 * {@link KnownHostFormatType} can be used interchangeably with HostFormatType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Fqdn**: FQDN format \
 * **Ip**: IP format
 */
export type HostFormatType = string;

/** Protocol type enum. */
export enum KnownProtocolType {
  /** TCP protocol */
  TCP = "TCP",
  /** TCPS protocol */
  Tcps = "TCPS",
}

/**
 * Protocol type enum. \
 * {@link KnownProtocolType} can be used interchangeably with ProtocolType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TCP**: TCP protocol \
 * **TCPS**: TCPS protocol
 */
export type ProtocolType = string;

/** Session mode type enum. */
export enum KnownSessionModeType {
  /** Direct session mode */
  Direct = "Direct",
  /** Redirect session mode */
  Redirect = "Redirect",
}

/**
 * Session mode type enum. \
 * {@link KnownSessionModeType} can be used interchangeably with SessionModeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Direct**: Direct session mode \
 * **Redirect**: Redirect session mode
 */
export type SessionModeType = string;

/** Syntax format type enum. */
export enum KnownSyntaxFormatType {
  /** Long format */
  Long = "Long",
  /** Ezconnect format */
  Ezconnect = "Ezconnect",
  /** Ezconnectplus format */
  Ezconnectplus = "Ezconnectplus",
}

/**
 * Syntax format type enum. \
 * {@link KnownSyntaxFormatType} can be used interchangeably with SyntaxFormatType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Long**: Long format \
 * **Ezconnect**: Ezconnect format \
 * **Ezconnectplus**: Ezconnectplus format
 */
export type SyntaxFormatType = string;

/** TLS authentication type enum. */
export enum KnownTlsAuthenticationType {
  /** Server authentication */
  Server = "Server",
  /** Mutual TLS */
  Mutual = "Mutual",
}

/**
 * TLS authentication type enum. \
 * {@link KnownTlsAuthenticationType} can be used interchangeably with TlsAuthenticationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Server**: Server authentication \
 * **Mutual**: Mutual TLS
 */
export type TlsAuthenticationType = string;

/** The URLs for accessing Oracle Application Express (APEX) and SQL Developer Web with a browser from a Compute instance within your VCN or that has a direct connection to your VCN. */
export interface ConnectionUrlType {
  /** Oracle Application Express (APEX) URL. */
  apexUrl?: string;
  /** The URL of the Database Transforms for the Autonomous Database. */
  databaseTransformsUrl?: string;
  /** The URL of the Graph Studio for the Autonomous Database. */
  graphStudioUrl?: string;
  /** The URL of the Oracle Machine Learning (OML) Notebook for the Autonomous Database. */
  machineLearningNotebookUrl?: string;
  /** The URL of the MongoDB API for the Autonomous Database. */
  mongoDbUrl?: string;
  /** The Oracle REST Data Services (ORDS) URL of the Web Access for the Autonomous Database. */
  ordsUrl?: string;
  /** Oracle SQL Developer Web URL. */
  sqlDevWebUrl?: string;
}

export function connectionUrlTypeDeserializer(item: any): ConnectionUrlType {
  return {
    apexUrl: item["apexUrl"],
    databaseTransformsUrl: item["databaseTransformsUrl"],
    graphStudioUrl: item["graphStudioUrl"],
    machineLearningNotebookUrl: item["machineLearningNotebookUrl"],
    mongoDbUrl: item["mongoDbUrl"],
    ordsUrl: item["ordsUrl"],
    sqlDevWebUrl: item["sqlDevWebUrl"],
  };
}

/** DataSafe status type enum. */
export enum KnownDataSafeStatusType {
  /** Registering status */
  Registering = "Registering",
  /** Registered status */
  Registered = "Registered",
  /** Deregistering status */
  Deregistering = "Deregistering",
  /** NotRegistered status */
  NotRegistered = "NotRegistered",
  /** Failed status */
  Failed = "Failed",
}

/**
 * DataSafe status type enum. \
 * {@link KnownDataSafeStatusType} can be used interchangeably with DataSafeStatusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Registering**: Registering status \
 * **Registered**: Registered status \
 * **Deregistering**: Deregistering status \
 * **NotRegistered**: NotRegistered status \
 * **Failed**: Failed status
 */
export type DataSafeStatusType = string;

/** Database edition type enum. */
export enum KnownDatabaseEditionType {
  /** Standard edition */
  StandardEdition = "StandardEdition",
  /** Enterprise edition */
  EnterpriseEdition = "EnterpriseEdition",
}

/**
 * Database edition type enum. \
 * {@link KnownDatabaseEditionType} can be used interchangeably with DatabaseEditionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **StandardEdition**: Standard edition \
 * **EnterpriseEdition**: Enterprise edition
 */
export type DatabaseEditionType = string;

/** Details for the long-term backup schedule. */
export interface LongTermBackUpScheduleDetails {
  /** The frequency of the long-term backup schedule */
  repeatCadence?: RepeatCadenceType;
  /** The timestamp for the long-term backup schedule. For a MONTHLY cadence, months having fewer days than the provided date will have the backup taken on the last day of that month. */
  timeOfBackup?: Date;
  /** Retention period, in days, for backups. */
  retentionPeriodInDays?: number;
  /** Indicates if the long-term backup schedule should be deleted. The default value is `FALSE`. */
  isDisabled?: boolean;
}

export function longTermBackUpScheduleDetailsSerializer(item: LongTermBackUpScheduleDetails): any {
  return {
    repeatCadence: item["repeatCadence"],
    timeOfBackup: !item["timeOfBackup"] ? item["timeOfBackup"] : item["timeOfBackup"].toISOString(),
    retentionPeriodInDays: item["retentionPeriodInDays"],
    isDisabled: item["isDisabled"],
  };
}

export function longTermBackUpScheduleDetailsDeserializer(
  item: any,
): LongTermBackUpScheduleDetails {
  return {
    repeatCadence: item["repeatCadence"],
    timeOfBackup: !item["timeOfBackup"] ? item["timeOfBackup"] : new Date(item["timeOfBackup"]),
    retentionPeriodInDays: item["retentionPeriodInDays"],
    isDisabled: item["isDisabled"],
  };
}

/** Repeat cadence type enum */
export enum KnownRepeatCadenceType {
  /** Repeat one time */
  OneTime = "OneTime",
  /** Repeat weekly */
  Weekly = "Weekly",
  /** Repeat monthly */
  Monthly = "Monthly",
  /** Repeat yearly */
  Yearly = "Yearly",
}

/**
 * Repeat cadence type enum \
 * {@link KnownRepeatCadenceType} can be used interchangeably with RepeatCadenceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OneTime**: Repeat one time \
 * **Weekly**: Repeat weekly \
 * **Monthly**: Repeat monthly \
 * **Yearly**: Repeat yearly
 */
export type RepeatCadenceType = string;

/** Open mode type enum. */
export enum KnownOpenModeType {
  /** ReadOnly mode */
  ReadOnly = "ReadOnly",
  /** ReadWrite mode */
  ReadWrite = "ReadWrite",
}

/**
 * Open mode type enum. \
 * {@link KnownOpenModeType} can be used interchangeably with OpenModeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReadOnly**: ReadOnly mode \
 * **ReadWrite**: ReadWrite mode
 */
export type OpenModeType = string;

/** Operations Insights status type enum. */
export enum KnownOperationsInsightsStatusType {
  /** Enabling status */
  Enabling = "Enabling",
  /** Enabled status */
  Enabled = "Enabled",
  /** Disabling status */
  Disabling = "Disabling",
  /** NotEnabled status */
  NotEnabled = "NotEnabled",
  /** FailedEnabling status */
  FailedEnabling = "FailedEnabling",
  /** FailedDisabling status */
  FailedDisabling = "FailedDisabling",
}

/**
 * Operations Insights status type enum. \
 * {@link KnownOperationsInsightsStatusType} can be used interchangeably with OperationsInsightsStatusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabling**: Enabling status \
 * **Enabled**: Enabled status \
 * **Disabling**: Disabling status \
 * **NotEnabled**: NotEnabled status \
 * **FailedEnabling**: FailedEnabling status \
 * **FailedDisabling**: FailedDisabling status
 */
export type OperationsInsightsStatusType = string;

/** Permission level type enum. */
export enum KnownPermissionLevelType {
  /** Restricted permission level */
  Restricted = "Restricted",
  /** Unrestricted permission level */
  Unrestricted = "Unrestricted",
}

/**
 * Permission level type enum. \
 * {@link KnownPermissionLevelType} can be used interchangeably with PermissionLevelType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Restricted**: Restricted permission level \
 * **Unrestricted**: Unrestricted permission level
 */
export type PermissionLevelType = string;

/** Role type enum. */
export enum KnownRoleType {
  /** Primary role */
  Primary = "Primary",
  /** Standby role */
  Standby = "Standby",
  /** DisabledStandby role */
  DisabledStandby = "DisabledStandby",
  /** BackupCopy role */
  BackupCopy = "BackupCopy",
  /** SnapshotStandby role */
  SnapshotStandby = "SnapshotStandby",
}

/**
 * Role type enum. \
 * {@link KnownRoleType} can be used interchangeably with RoleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary**: Primary role \
 * **Standby**: Standby role \
 * **DisabledStandby**: DisabledStandby role \
 * **BackupCopy**: BackupCopy role \
 * **SnapshotStandby**: SnapshotStandby role
 */
export type RoleType = string;

/** Autonomous Database resource model. */
export interface AutonomousDatabaseProperties extends AutonomousDatabaseBaseProperties {
  /** Database type to be created. */
  dataBaseType: "Regular";
}

export function autonomousDatabasePropertiesSerializer(item: AutonomousDatabaseProperties): any {
  return {
    adminPassword: item["adminPassword"],
    dataBaseType: item["dataBaseType"],
    autonomousMaintenanceScheduleType: item["autonomousMaintenanceScheduleType"],
    characterSet: item["characterSet"],
    computeCount: item["computeCount"],
    computeModel: item["computeModel"],
    cpuCoreCount: item["cpuCoreCount"],
    customerContacts: !item["customerContacts"]
      ? item["customerContacts"]
      : customerContactArraySerializer(item["customerContacts"]),
    dataStorageSizeInTbs: item["dataStorageSizeInTbs"],
    dataStorageSizeInGbs: item["dataStorageSizeInGbs"],
    dbVersion: item["dbVersion"],
    dbWorkload: item["dbWorkload"],
    displayName: item["displayName"],
    isAutoScalingEnabled: item["isAutoScalingEnabled"],
    isAutoScalingForStorageEnabled: item["isAutoScalingForStorageEnabled"],
    peerDbId: item["peerDbId"],
    isLocalDataGuardEnabled: item["isLocalDataGuardEnabled"],
    isMtlsConnectionRequired: item["isMtlsConnectionRequired"],
    isPreviewVersionWithServiceTermsAccepted: item["isPreviewVersionWithServiceTermsAccepted"],
    licenseModel: item["licenseModel"],
    ncharacterSet: item["ncharacterSet"],
    scheduledOperationsList: !item["scheduledOperationsList"]
      ? item["scheduledOperationsList"]
      : scheduledOperationsTypeArraySerializer(item["scheduledOperationsList"]),
    privateEndpointIp: item["privateEndpointIp"],
    privateEndpointLabel: item["privateEndpointLabel"],
    subnetId: item["subnetId"],
    vnetId: item["vnetId"],
    databaseEdition: item["databaseEdition"],
    autonomousDatabaseId: item["autonomousDatabaseId"],
    longTermBackupSchedule: !item["longTermBackupSchedule"]
      ? item["longTermBackupSchedule"]
      : longTermBackUpScheduleDetailsSerializer(item["longTermBackupSchedule"]),
    localAdgAutoFailoverMaxDataLossLimit: item["localAdgAutoFailoverMaxDataLossLimit"],
    openMode: item["openMode"],
    permissionLevel: item["permissionLevel"],
    role: item["role"],
    backupRetentionPeriodInDays: item["backupRetentionPeriodInDays"],
    whitelistedIps: !item["whitelistedIps"]
      ? item["whitelistedIps"]
      : item["whitelistedIps"].map((p: any) => {
          return p;
        }),
  };
}

export function autonomousDatabasePropertiesDeserializer(item: any): AutonomousDatabaseProperties {
  return {
    adminPassword: item["adminPassword"],
    dataBaseType: item["dataBaseType"],
    autonomousMaintenanceScheduleType: item["autonomousMaintenanceScheduleType"],
    characterSet: item["characterSet"],
    computeCount: item["computeCount"],
    computeModel: item["computeModel"],
    cpuCoreCount: item["cpuCoreCount"],
    customerContacts: !item["customerContacts"]
      ? item["customerContacts"]
      : customerContactArrayDeserializer(item["customerContacts"]),
    dataStorageSizeInTbs: item["dataStorageSizeInTbs"],
    dataStorageSizeInGbs: item["dataStorageSizeInGbs"],
    dbVersion: item["dbVersion"],
    dbWorkload: item["dbWorkload"],
    displayName: item["displayName"],
    isAutoScalingEnabled: item["isAutoScalingEnabled"],
    isAutoScalingForStorageEnabled: item["isAutoScalingForStorageEnabled"],
    peerDbIds: !item["peerDbIds"]
      ? item["peerDbIds"]
      : item["peerDbIds"].map((p: any) => {
          return p;
        }),
    peerDbId: item["peerDbId"],
    isLocalDataGuardEnabled: item["isLocalDataGuardEnabled"],
    isRemoteDataGuardEnabled: item["isRemoteDataGuardEnabled"],
    localDisasterRecoveryType: item["localDisasterRecoveryType"],
    timeDisasterRecoveryRoleChanged: !item["timeDisasterRecoveryRoleChanged"]
      ? item["timeDisasterRecoveryRoleChanged"]
      : new Date(item["timeDisasterRecoveryRoleChanged"]),
    remoteDisasterRecoveryConfiguration: !item["remoteDisasterRecoveryConfiguration"]
      ? item["remoteDisasterRecoveryConfiguration"]
      : disasterRecoveryConfigurationDetailsDeserializer(
          item["remoteDisasterRecoveryConfiguration"],
        ),
    localStandbyDb: !item["localStandbyDb"]
      ? item["localStandbyDb"]
      : autonomousDatabaseStandbySummaryDeserializer(item["localStandbyDb"]),
    failedDataRecoveryInSeconds: item["failedDataRecoveryInSeconds"],
    isMtlsConnectionRequired: item["isMtlsConnectionRequired"],
    isPreviewVersionWithServiceTermsAccepted: item["isPreviewVersionWithServiceTermsAccepted"],
    licenseModel: item["licenseModel"],
    ncharacterSet: item["ncharacterSet"],
    lifecycleDetails: item["lifecycleDetails"],
    provisioningState: item["provisioningState"],
    lifecycleState: item["lifecycleState"],
    scheduledOperationsList: !item["scheduledOperationsList"]
      ? item["scheduledOperationsList"]
      : scheduledOperationsTypeArrayDeserializer(item["scheduledOperationsList"]),
    privateEndpointIp: item["privateEndpointIp"],
    privateEndpointLabel: item["privateEndpointLabel"],
    ociUrl: item["ociUrl"],
    subnetId: item["subnetId"],
    vnetId: item["vnetId"],
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    timeMaintenanceBegin: !item["timeMaintenanceBegin"]
      ? item["timeMaintenanceBegin"]
      : new Date(item["timeMaintenanceBegin"]),
    timeMaintenanceEnd: !item["timeMaintenanceEnd"]
      ? item["timeMaintenanceEnd"]
      : new Date(item["timeMaintenanceEnd"]),
    actualUsedDataStorageSizeInTbs: item["actualUsedDataStorageSizeInTbs"],
    allocatedStorageSizeInTbs: item["allocatedStorageSizeInTbs"],
    apexDetails: !item["apexDetails"]
      ? item["apexDetails"]
      : apexDetailsTypeDeserializer(item["apexDetails"]),
    availableUpgradeVersions: !item["availableUpgradeVersions"]
      ? item["availableUpgradeVersions"]
      : item["availableUpgradeVersions"].map((p: any) => {
          return p;
        }),
    connectionStrings: !item["connectionStrings"]
      ? item["connectionStrings"]
      : connectionStringTypeDeserializer(item["connectionStrings"]),
    connectionUrls: !item["connectionUrls"]
      ? item["connectionUrls"]
      : connectionUrlTypeDeserializer(item["connectionUrls"]),
    dataSafeStatus: item["dataSafeStatus"],
    databaseEdition: item["databaseEdition"],
    autonomousDatabaseId: item["autonomousDatabaseId"],
    inMemoryAreaInGbs: item["inMemoryAreaInGbs"],
    nextLongTermBackupTimeStamp: !item["nextLongTermBackupTimeStamp"]
      ? item["nextLongTermBackupTimeStamp"]
      : new Date(item["nextLongTermBackupTimeStamp"]),
    longTermBackupSchedule: !item["longTermBackupSchedule"]
      ? item["longTermBackupSchedule"]
      : longTermBackUpScheduleDetailsDeserializer(item["longTermBackupSchedule"]),
    isPreview: item["isPreview"],
    localAdgAutoFailoverMaxDataLossLimit: item["localAdgAutoFailoverMaxDataLossLimit"],
    memoryPerOracleComputeUnitInGbs: item["memoryPerOracleComputeUnitInGbs"],
    openMode: item["openMode"],
    operationsInsightsStatus: item["operationsInsightsStatus"],
    permissionLevel: item["permissionLevel"],
    privateEndpoint: item["privateEndpoint"],
    provisionableCpus: !item["provisionableCpus"]
      ? item["provisionableCpus"]
      : item["provisionableCpus"].map((p: any) => {
          return p;
        }),
    role: item["role"],
    serviceConsoleUrl: item["serviceConsoleUrl"],
    sqlWebDeveloperUrl: item["sqlWebDeveloperUrl"],
    supportedRegionsToCloneTo: !item["supportedRegionsToCloneTo"]
      ? item["supportedRegionsToCloneTo"]
      : item["supportedRegionsToCloneTo"].map((p: any) => {
          return p;
        }),
    timeDataGuardRoleChanged: item["timeDataGuardRoleChanged"],
    timeDeletionOfFreeAutonomousDatabase: item["timeDeletionOfFreeAutonomousDatabase"],
    timeLocalDataGuardEnabled: item["timeLocalDataGuardEnabled"],
    timeOfLastFailover: item["timeOfLastFailover"],
    timeOfLastRefresh: item["timeOfLastRefresh"],
    timeOfLastRefreshPoint: item["timeOfLastRefreshPoint"],
    timeOfLastSwitchover: item["timeOfLastSwitchover"],
    timeReclamationOfFreeAutonomousDatabase: item["timeReclamationOfFreeAutonomousDatabase"],
    usedDataStorageSizeInGbs: item["usedDataStorageSizeInGbs"],
    usedDataStorageSizeInTbs: item["usedDataStorageSizeInTbs"],
    ocid: item["ocid"],
    backupRetentionPeriodInDays: item["backupRetentionPeriodInDays"],
    whitelistedIps: !item["whitelistedIps"]
      ? item["whitelistedIps"]
      : item["whitelistedIps"].map((p: any) => {
          return p;
        }),
  };
}

/** Autonomous Database clone resource model. */
export interface AutonomousDatabaseCloneProperties extends AutonomousDatabaseBaseProperties {
  /** Database type to be created. */
  dataBaseType: "Clone";
  /** The source of the database. */
  source?: SourceType;
  /** The Azure resource ID of the Autonomous Database that was cloned to create the current Autonomous Database. */
  sourceId: string;
  /** The Autonomous Database clone type. */
  cloneType: CloneType;
  /** Indicates if the refreshable clone can be reconnected to its source database. */
  readonly isReconnectCloneEnabled?: boolean;
  /** Indicates if the Autonomous Database is a refreshable clone. */
  readonly isRefreshableClone?: boolean;
  /** The refresh mode of the clone. */
  refreshableModel?: RefreshableModelType;
  /** The refresh status of the clone. */
  readonly refreshableStatus?: RefreshableStatusType;
  /** The time and date as an RFC3339 formatted string, e.g., 2022-01-01T12:00:00.000Z, to set the limit for a refreshable clone to be reconnected to its source database. */
  timeUntilReconnectCloneEnabled?: string;
}

export function autonomousDatabaseClonePropertiesSerializer(
  item: AutonomousDatabaseCloneProperties,
): any {
  return {
    adminPassword: item["adminPassword"],
    dataBaseType: item["dataBaseType"],
    autonomousMaintenanceScheduleType: item["autonomousMaintenanceScheduleType"],
    characterSet: item["characterSet"],
    computeCount: item["computeCount"],
    computeModel: item["computeModel"],
    cpuCoreCount: item["cpuCoreCount"],
    customerContacts: !item["customerContacts"]
      ? item["customerContacts"]
      : customerContactArraySerializer(item["customerContacts"]),
    dataStorageSizeInTbs: item["dataStorageSizeInTbs"],
    dataStorageSizeInGbs: item["dataStorageSizeInGbs"],
    dbVersion: item["dbVersion"],
    dbWorkload: item["dbWorkload"],
    displayName: item["displayName"],
    isAutoScalingEnabled: item["isAutoScalingEnabled"],
    isAutoScalingForStorageEnabled: item["isAutoScalingForStorageEnabled"],
    peerDbId: item["peerDbId"],
    isLocalDataGuardEnabled: item["isLocalDataGuardEnabled"],
    isMtlsConnectionRequired: item["isMtlsConnectionRequired"],
    isPreviewVersionWithServiceTermsAccepted: item["isPreviewVersionWithServiceTermsAccepted"],
    licenseModel: item["licenseModel"],
    ncharacterSet: item["ncharacterSet"],
    scheduledOperationsList: !item["scheduledOperationsList"]
      ? item["scheduledOperationsList"]
      : scheduledOperationsTypeArraySerializer(item["scheduledOperationsList"]),
    privateEndpointIp: item["privateEndpointIp"],
    privateEndpointLabel: item["privateEndpointLabel"],
    subnetId: item["subnetId"],
    vnetId: item["vnetId"],
    databaseEdition: item["databaseEdition"],
    autonomousDatabaseId: item["autonomousDatabaseId"],
    longTermBackupSchedule: !item["longTermBackupSchedule"]
      ? item["longTermBackupSchedule"]
      : longTermBackUpScheduleDetailsSerializer(item["longTermBackupSchedule"]),
    localAdgAutoFailoverMaxDataLossLimit: item["localAdgAutoFailoverMaxDataLossLimit"],
    openMode: item["openMode"],
    permissionLevel: item["permissionLevel"],
    role: item["role"],
    backupRetentionPeriodInDays: item["backupRetentionPeriodInDays"],
    whitelistedIps: !item["whitelistedIps"]
      ? item["whitelistedIps"]
      : item["whitelistedIps"].map((p: any) => {
          return p;
        }),
    source: item["source"],
    sourceId: item["sourceId"],
    cloneType: item["cloneType"],
    refreshableModel: item["refreshableModel"],
    timeUntilReconnectCloneEnabled: item["timeUntilReconnectCloneEnabled"],
  };
}

export function autonomousDatabaseClonePropertiesDeserializer(
  item: any,
): AutonomousDatabaseCloneProperties {
  return {
    adminPassword: item["adminPassword"],
    dataBaseType: item["dataBaseType"],
    autonomousMaintenanceScheduleType: item["autonomousMaintenanceScheduleType"],
    characterSet: item["characterSet"],
    computeCount: item["computeCount"],
    computeModel: item["computeModel"],
    cpuCoreCount: item["cpuCoreCount"],
    customerContacts: !item["customerContacts"]
      ? item["customerContacts"]
      : customerContactArrayDeserializer(item["customerContacts"]),
    dataStorageSizeInTbs: item["dataStorageSizeInTbs"],
    dataStorageSizeInGbs: item["dataStorageSizeInGbs"],
    dbVersion: item["dbVersion"],
    dbWorkload: item["dbWorkload"],
    displayName: item["displayName"],
    isAutoScalingEnabled: item["isAutoScalingEnabled"],
    isAutoScalingForStorageEnabled: item["isAutoScalingForStorageEnabled"],
    peerDbIds: !item["peerDbIds"]
      ? item["peerDbIds"]
      : item["peerDbIds"].map((p: any) => {
          return p;
        }),
    peerDbId: item["peerDbId"],
    isLocalDataGuardEnabled: item["isLocalDataGuardEnabled"],
    isRemoteDataGuardEnabled: item["isRemoteDataGuardEnabled"],
    localDisasterRecoveryType: item["localDisasterRecoveryType"],
    timeDisasterRecoveryRoleChanged: !item["timeDisasterRecoveryRoleChanged"]
      ? item["timeDisasterRecoveryRoleChanged"]
      : new Date(item["timeDisasterRecoveryRoleChanged"]),
    remoteDisasterRecoveryConfiguration: !item["remoteDisasterRecoveryConfiguration"]
      ? item["remoteDisasterRecoveryConfiguration"]
      : disasterRecoveryConfigurationDetailsDeserializer(
          item["remoteDisasterRecoveryConfiguration"],
        ),
    localStandbyDb: !item["localStandbyDb"]
      ? item["localStandbyDb"]
      : autonomousDatabaseStandbySummaryDeserializer(item["localStandbyDb"]),
    failedDataRecoveryInSeconds: item["failedDataRecoveryInSeconds"],
    isMtlsConnectionRequired: item["isMtlsConnectionRequired"],
    isPreviewVersionWithServiceTermsAccepted: item["isPreviewVersionWithServiceTermsAccepted"],
    licenseModel: item["licenseModel"],
    ncharacterSet: item["ncharacterSet"],
    lifecycleDetails: item["lifecycleDetails"],
    provisioningState: item["provisioningState"],
    lifecycleState: item["lifecycleState"],
    scheduledOperationsList: !item["scheduledOperationsList"]
      ? item["scheduledOperationsList"]
      : scheduledOperationsTypeArrayDeserializer(item["scheduledOperationsList"]),
    privateEndpointIp: item["privateEndpointIp"],
    privateEndpointLabel: item["privateEndpointLabel"],
    ociUrl: item["ociUrl"],
    subnetId: item["subnetId"],
    vnetId: item["vnetId"],
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    timeMaintenanceBegin: !item["timeMaintenanceBegin"]
      ? item["timeMaintenanceBegin"]
      : new Date(item["timeMaintenanceBegin"]),
    timeMaintenanceEnd: !item["timeMaintenanceEnd"]
      ? item["timeMaintenanceEnd"]
      : new Date(item["timeMaintenanceEnd"]),
    actualUsedDataStorageSizeInTbs: item["actualUsedDataStorageSizeInTbs"],
    allocatedStorageSizeInTbs: item["allocatedStorageSizeInTbs"],
    apexDetails: !item["apexDetails"]
      ? item["apexDetails"]
      : apexDetailsTypeDeserializer(item["apexDetails"]),
    availableUpgradeVersions: !item["availableUpgradeVersions"]
      ? item["availableUpgradeVersions"]
      : item["availableUpgradeVersions"].map((p: any) => {
          return p;
        }),
    connectionStrings: !item["connectionStrings"]
      ? item["connectionStrings"]
      : connectionStringTypeDeserializer(item["connectionStrings"]),
    connectionUrls: !item["connectionUrls"]
      ? item["connectionUrls"]
      : connectionUrlTypeDeserializer(item["connectionUrls"]),
    dataSafeStatus: item["dataSafeStatus"],
    databaseEdition: item["databaseEdition"],
    autonomousDatabaseId: item["autonomousDatabaseId"],
    inMemoryAreaInGbs: item["inMemoryAreaInGbs"],
    nextLongTermBackupTimeStamp: !item["nextLongTermBackupTimeStamp"]
      ? item["nextLongTermBackupTimeStamp"]
      : new Date(item["nextLongTermBackupTimeStamp"]),
    longTermBackupSchedule: !item["longTermBackupSchedule"]
      ? item["longTermBackupSchedule"]
      : longTermBackUpScheduleDetailsDeserializer(item["longTermBackupSchedule"]),
    isPreview: item["isPreview"],
    localAdgAutoFailoverMaxDataLossLimit: item["localAdgAutoFailoverMaxDataLossLimit"],
    memoryPerOracleComputeUnitInGbs: item["memoryPerOracleComputeUnitInGbs"],
    openMode: item["openMode"],
    operationsInsightsStatus: item["operationsInsightsStatus"],
    permissionLevel: item["permissionLevel"],
    privateEndpoint: item["privateEndpoint"],
    provisionableCpus: !item["provisionableCpus"]
      ? item["provisionableCpus"]
      : item["provisionableCpus"].map((p: any) => {
          return p;
        }),
    role: item["role"],
    serviceConsoleUrl: item["serviceConsoleUrl"],
    sqlWebDeveloperUrl: item["sqlWebDeveloperUrl"],
    supportedRegionsToCloneTo: !item["supportedRegionsToCloneTo"]
      ? item["supportedRegionsToCloneTo"]
      : item["supportedRegionsToCloneTo"].map((p: any) => {
          return p;
        }),
    timeDataGuardRoleChanged: item["timeDataGuardRoleChanged"],
    timeDeletionOfFreeAutonomousDatabase: item["timeDeletionOfFreeAutonomousDatabase"],
    timeLocalDataGuardEnabled: item["timeLocalDataGuardEnabled"],
    timeOfLastFailover: item["timeOfLastFailover"],
    timeOfLastRefresh: item["timeOfLastRefresh"],
    timeOfLastRefreshPoint: item["timeOfLastRefreshPoint"],
    timeOfLastSwitchover: item["timeOfLastSwitchover"],
    timeReclamationOfFreeAutonomousDatabase: item["timeReclamationOfFreeAutonomousDatabase"],
    usedDataStorageSizeInGbs: item["usedDataStorageSizeInGbs"],
    usedDataStorageSizeInTbs: item["usedDataStorageSizeInTbs"],
    ocid: item["ocid"],
    backupRetentionPeriodInDays: item["backupRetentionPeriodInDays"],
    whitelistedIps: !item["whitelistedIps"]
      ? item["whitelistedIps"]
      : item["whitelistedIps"].map((p: any) => {
          return p;
        }),
    source: item["source"],
    sourceId: item["sourceId"],
    cloneType: item["cloneType"],
    isReconnectCloneEnabled: item["isReconnectCloneEnabled"],
    isRefreshableClone: item["isRefreshableClone"],
    refreshableModel: item["refreshableModel"],
    refreshableStatus: item["refreshableStatus"],
    timeUntilReconnectCloneEnabled: item["timeUntilReconnectCloneEnabled"],
  };
}

/** Source type enum. */
export enum KnownSourceType {
  /** None source */
  None = "None",
  /** Database source */
  Database = "Database",
  /** Backup from ID source */
  BackupFromId = "BackupFromId",
  /** Backup from timestamp source */
  BackupFromTimestamp = "BackupFromTimestamp",
  /** Clone to refreshable source */
  CloneToRefreshable = "CloneToRefreshable",
  /** Cross region dataguard source */
  CrossRegionDataguard = "CrossRegionDataguard",
  /** cross region disaster recovery source */
  CrossRegionDisasterRecovery = "CrossRegionDisasterRecovery",
}

/**
 * Source type enum. \
 * {@link KnownSourceType} can be used interchangeably with SourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None source \
 * **Database**: Database source \
 * **BackupFromId**: Backup from ID source \
 * **BackupFromTimestamp**: Backup from timestamp source \
 * **CloneToRefreshable**: Clone to refreshable source \
 * **CrossRegionDataguard**: Cross region dataguard source \
 * **CrossRegionDisasterRecovery**: cross region disaster recovery source
 */
export type SourceType = string;

/** Clone type enum */
export enum KnownCloneType {
  /** Full clone */
  Full = "Full",
  /** Metadata only */
  Metadata = "Metadata",
}

/**
 * Clone type enum \
 * {@link KnownCloneType} can be used interchangeably with CloneType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Full**: Full clone \
 * **Metadata**: Metadata only
 */
export type CloneType = string;

/** Refreshable model type enum */
export enum KnownRefreshableModelType {
  /** Automatic refreshable model type */
  Automatic = "Automatic",
  /** Manual refreshable model type */
  Manual = "Manual",
}

/**
 * Refreshable model type enum \
 * {@link KnownRefreshableModelType} can be used interchangeably with RefreshableModelType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Automatic**: Automatic refreshable model type \
 * **Manual**: Manual refreshable model type
 */
export type RefreshableModelType = string;

/** Refreshable status type enum. */
export enum KnownRefreshableStatusType {
  /** Refreshing status */
  Refreshing = "Refreshing",
  /** NotRefreshing status */
  NotRefreshing = "NotRefreshing",
}

/**
 * Refreshable status type enum. \
 * {@link KnownRefreshableStatusType} can be used interchangeably with RefreshableStatusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Refreshing**: Refreshing status \
 * **NotRefreshing**: NotRefreshing status
 */
export type RefreshableStatusType = string;

/** Autonomous Database Cross Region Disaster Recovery resource model. */
export interface AutonomousDatabaseCrossRegionDisasterRecoveryProperties extends AutonomousDatabaseBaseProperties {
  /** Database type to be created. */
  dataBaseType: "CrossRegionDisasterRecovery";
  /** The source of the database. */
  source: "CrossRegionDisasterRecovery";
  /** The Azure ID of the source Autonomous Database that will be used to create a new peer database for the DR association. */
  sourceId: string;
  /** The name of the region where source Autonomous Database exists. */
  sourceLocation?: string;
  /** The source database ocid */
  sourceOcid?: string;
  /** Indicates the cross-region disaster recovery (DR) type of the standby Autonomous Database Serverless instance. Autonomous Data Guard (ADG) DR type provides business critical DR with a faster recovery time objective (RTO) during failover or switchover. Backup-based DR type provides lower cost DR with a slower RTO during failover or switchover. */
  remoteDisasterRecoveryType: DisasterRecoveryType;
  /** If true, 7 days worth of backups are replicated across regions for Cross-Region ADB or Backup-Based DR between Primary and Standby. If false, the backups taken on the Primary are not replicated to the Standby database. */
  isReplicateAutomaticBackups?: boolean;
}

export function autonomousDatabaseCrossRegionDisasterRecoveryPropertiesSerializer(
  item: AutonomousDatabaseCrossRegionDisasterRecoveryProperties,
): any {
  return {
    adminPassword: item["adminPassword"],
    dataBaseType: item["dataBaseType"],
    autonomousMaintenanceScheduleType: item["autonomousMaintenanceScheduleType"],
    characterSet: item["characterSet"],
    computeCount: item["computeCount"],
    computeModel: item["computeModel"],
    cpuCoreCount: item["cpuCoreCount"],
    customerContacts: !item["customerContacts"]
      ? item["customerContacts"]
      : customerContactArraySerializer(item["customerContacts"]),
    dataStorageSizeInTbs: item["dataStorageSizeInTbs"],
    dataStorageSizeInGbs: item["dataStorageSizeInGbs"],
    dbVersion: item["dbVersion"],
    dbWorkload: item["dbWorkload"],
    displayName: item["displayName"],
    isAutoScalingEnabled: item["isAutoScalingEnabled"],
    isAutoScalingForStorageEnabled: item["isAutoScalingForStorageEnabled"],
    peerDbId: item["peerDbId"],
    isLocalDataGuardEnabled: item["isLocalDataGuardEnabled"],
    isMtlsConnectionRequired: item["isMtlsConnectionRequired"],
    isPreviewVersionWithServiceTermsAccepted: item["isPreviewVersionWithServiceTermsAccepted"],
    licenseModel: item["licenseModel"],
    ncharacterSet: item["ncharacterSet"],
    scheduledOperationsList: !item["scheduledOperationsList"]
      ? item["scheduledOperationsList"]
      : scheduledOperationsTypeArraySerializer(item["scheduledOperationsList"]),
    privateEndpointIp: item["privateEndpointIp"],
    privateEndpointLabel: item["privateEndpointLabel"],
    subnetId: item["subnetId"],
    vnetId: item["vnetId"],
    databaseEdition: item["databaseEdition"],
    autonomousDatabaseId: item["autonomousDatabaseId"],
    longTermBackupSchedule: !item["longTermBackupSchedule"]
      ? item["longTermBackupSchedule"]
      : longTermBackUpScheduleDetailsSerializer(item["longTermBackupSchedule"]),
    localAdgAutoFailoverMaxDataLossLimit: item["localAdgAutoFailoverMaxDataLossLimit"],
    openMode: item["openMode"],
    permissionLevel: item["permissionLevel"],
    role: item["role"],
    backupRetentionPeriodInDays: item["backupRetentionPeriodInDays"],
    whitelistedIps: !item["whitelistedIps"]
      ? item["whitelistedIps"]
      : item["whitelistedIps"].map((p: any) => {
          return p;
        }),
    source: item["source"],
    sourceId: item["sourceId"],
    sourceLocation: item["sourceLocation"],
    sourceOcid: item["sourceOcid"],
    remoteDisasterRecoveryType: item["remoteDisasterRecoveryType"],
    isReplicateAutomaticBackups: item["isReplicateAutomaticBackups"],
  };
}

export function autonomousDatabaseCrossRegionDisasterRecoveryPropertiesDeserializer(
  item: any,
): AutonomousDatabaseCrossRegionDisasterRecoveryProperties {
  return {
    adminPassword: item["adminPassword"],
    dataBaseType: item["dataBaseType"],
    autonomousMaintenanceScheduleType: item["autonomousMaintenanceScheduleType"],
    characterSet: item["characterSet"],
    computeCount: item["computeCount"],
    computeModel: item["computeModel"],
    cpuCoreCount: item["cpuCoreCount"],
    customerContacts: !item["customerContacts"]
      ? item["customerContacts"]
      : customerContactArrayDeserializer(item["customerContacts"]),
    dataStorageSizeInTbs: item["dataStorageSizeInTbs"],
    dataStorageSizeInGbs: item["dataStorageSizeInGbs"],
    dbVersion: item["dbVersion"],
    dbWorkload: item["dbWorkload"],
    displayName: item["displayName"],
    isAutoScalingEnabled: item["isAutoScalingEnabled"],
    isAutoScalingForStorageEnabled: item["isAutoScalingForStorageEnabled"],
    peerDbIds: !item["peerDbIds"]
      ? item["peerDbIds"]
      : item["peerDbIds"].map((p: any) => {
          return p;
        }),
    peerDbId: item["peerDbId"],
    isLocalDataGuardEnabled: item["isLocalDataGuardEnabled"],
    isRemoteDataGuardEnabled: item["isRemoteDataGuardEnabled"],
    localDisasterRecoveryType: item["localDisasterRecoveryType"],
    timeDisasterRecoveryRoleChanged: !item["timeDisasterRecoveryRoleChanged"]
      ? item["timeDisasterRecoveryRoleChanged"]
      : new Date(item["timeDisasterRecoveryRoleChanged"]),
    remoteDisasterRecoveryConfiguration: !item["remoteDisasterRecoveryConfiguration"]
      ? item["remoteDisasterRecoveryConfiguration"]
      : disasterRecoveryConfigurationDetailsDeserializer(
          item["remoteDisasterRecoveryConfiguration"],
        ),
    localStandbyDb: !item["localStandbyDb"]
      ? item["localStandbyDb"]
      : autonomousDatabaseStandbySummaryDeserializer(item["localStandbyDb"]),
    failedDataRecoveryInSeconds: item["failedDataRecoveryInSeconds"],
    isMtlsConnectionRequired: item["isMtlsConnectionRequired"],
    isPreviewVersionWithServiceTermsAccepted: item["isPreviewVersionWithServiceTermsAccepted"],
    licenseModel: item["licenseModel"],
    ncharacterSet: item["ncharacterSet"],
    lifecycleDetails: item["lifecycleDetails"],
    provisioningState: item["provisioningState"],
    lifecycleState: item["lifecycleState"],
    scheduledOperationsList: !item["scheduledOperationsList"]
      ? item["scheduledOperationsList"]
      : scheduledOperationsTypeArrayDeserializer(item["scheduledOperationsList"]),
    privateEndpointIp: item["privateEndpointIp"],
    privateEndpointLabel: item["privateEndpointLabel"],
    ociUrl: item["ociUrl"],
    subnetId: item["subnetId"],
    vnetId: item["vnetId"],
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    timeMaintenanceBegin: !item["timeMaintenanceBegin"]
      ? item["timeMaintenanceBegin"]
      : new Date(item["timeMaintenanceBegin"]),
    timeMaintenanceEnd: !item["timeMaintenanceEnd"]
      ? item["timeMaintenanceEnd"]
      : new Date(item["timeMaintenanceEnd"]),
    actualUsedDataStorageSizeInTbs: item["actualUsedDataStorageSizeInTbs"],
    allocatedStorageSizeInTbs: item["allocatedStorageSizeInTbs"],
    apexDetails: !item["apexDetails"]
      ? item["apexDetails"]
      : apexDetailsTypeDeserializer(item["apexDetails"]),
    availableUpgradeVersions: !item["availableUpgradeVersions"]
      ? item["availableUpgradeVersions"]
      : item["availableUpgradeVersions"].map((p: any) => {
          return p;
        }),
    connectionStrings: !item["connectionStrings"]
      ? item["connectionStrings"]
      : connectionStringTypeDeserializer(item["connectionStrings"]),
    connectionUrls: !item["connectionUrls"]
      ? item["connectionUrls"]
      : connectionUrlTypeDeserializer(item["connectionUrls"]),
    dataSafeStatus: item["dataSafeStatus"],
    databaseEdition: item["databaseEdition"],
    autonomousDatabaseId: item["autonomousDatabaseId"],
    inMemoryAreaInGbs: item["inMemoryAreaInGbs"],
    nextLongTermBackupTimeStamp: !item["nextLongTermBackupTimeStamp"]
      ? item["nextLongTermBackupTimeStamp"]
      : new Date(item["nextLongTermBackupTimeStamp"]),
    longTermBackupSchedule: !item["longTermBackupSchedule"]
      ? item["longTermBackupSchedule"]
      : longTermBackUpScheduleDetailsDeserializer(item["longTermBackupSchedule"]),
    isPreview: item["isPreview"],
    localAdgAutoFailoverMaxDataLossLimit: item["localAdgAutoFailoverMaxDataLossLimit"],
    memoryPerOracleComputeUnitInGbs: item["memoryPerOracleComputeUnitInGbs"],
    openMode: item["openMode"],
    operationsInsightsStatus: item["operationsInsightsStatus"],
    permissionLevel: item["permissionLevel"],
    privateEndpoint: item["privateEndpoint"],
    provisionableCpus: !item["provisionableCpus"]
      ? item["provisionableCpus"]
      : item["provisionableCpus"].map((p: any) => {
          return p;
        }),
    role: item["role"],
    serviceConsoleUrl: item["serviceConsoleUrl"],
    sqlWebDeveloperUrl: item["sqlWebDeveloperUrl"],
    supportedRegionsToCloneTo: !item["supportedRegionsToCloneTo"]
      ? item["supportedRegionsToCloneTo"]
      : item["supportedRegionsToCloneTo"].map((p: any) => {
          return p;
        }),
    timeDataGuardRoleChanged: item["timeDataGuardRoleChanged"],
    timeDeletionOfFreeAutonomousDatabase: item["timeDeletionOfFreeAutonomousDatabase"],
    timeLocalDataGuardEnabled: item["timeLocalDataGuardEnabled"],
    timeOfLastFailover: item["timeOfLastFailover"],
    timeOfLastRefresh: item["timeOfLastRefresh"],
    timeOfLastRefreshPoint: item["timeOfLastRefreshPoint"],
    timeOfLastSwitchover: item["timeOfLastSwitchover"],
    timeReclamationOfFreeAutonomousDatabase: item["timeReclamationOfFreeAutonomousDatabase"],
    usedDataStorageSizeInGbs: item["usedDataStorageSizeInGbs"],
    usedDataStorageSizeInTbs: item["usedDataStorageSizeInTbs"],
    ocid: item["ocid"],
    backupRetentionPeriodInDays: item["backupRetentionPeriodInDays"],
    whitelistedIps: !item["whitelistedIps"]
      ? item["whitelistedIps"]
      : item["whitelistedIps"].map((p: any) => {
          return p;
        }),
    source: item["source"],
    sourceId: item["sourceId"],
    sourceLocation: item["sourceLocation"],
    sourceOcid: item["sourceOcid"],
    remoteDisasterRecoveryType: item["remoteDisasterRecoveryType"],
    isReplicateAutomaticBackups: item["isReplicateAutomaticBackups"],
  };
}

/** Autonomous Database From Backup Timestamp resource model. */
export interface AutonomousDatabaseFromBackupTimestampProperties extends AutonomousDatabaseBaseProperties {
  /** Database type to be created. */
  dataBaseType: "CloneFromBackupTimestamp";
  /** The source of the database. */
  source: "BackupFromTimestamp";
  /** The ID of the source Autonomous Database that you will clone to create a new Autonomous Database. */
  sourceId: string;
  /** The Autonomous Database clone type. */
  cloneType: CloneType;
  /** The timestamp specified for the point-in-time clone of the source Autonomous Database. The timestamp must be in the past. */
  timestamp?: Date;
  /** Clone from latest available backup timestamp. */
  useLatestAvailableBackupTimeStamp?: boolean;
}

export function autonomousDatabaseFromBackupTimestampPropertiesSerializer(
  item: AutonomousDatabaseFromBackupTimestampProperties,
): any {
  return {
    adminPassword: item["adminPassword"],
    dataBaseType: item["dataBaseType"],
    autonomousMaintenanceScheduleType: item["autonomousMaintenanceScheduleType"],
    characterSet: item["characterSet"],
    computeCount: item["computeCount"],
    computeModel: item["computeModel"],
    cpuCoreCount: item["cpuCoreCount"],
    customerContacts: !item["customerContacts"]
      ? item["customerContacts"]
      : customerContactArraySerializer(item["customerContacts"]),
    dataStorageSizeInTbs: item["dataStorageSizeInTbs"],
    dataStorageSizeInGbs: item["dataStorageSizeInGbs"],
    dbVersion: item["dbVersion"],
    dbWorkload: item["dbWorkload"],
    displayName: item["displayName"],
    isAutoScalingEnabled: item["isAutoScalingEnabled"],
    isAutoScalingForStorageEnabled: item["isAutoScalingForStorageEnabled"],
    peerDbId: item["peerDbId"],
    isLocalDataGuardEnabled: item["isLocalDataGuardEnabled"],
    isMtlsConnectionRequired: item["isMtlsConnectionRequired"],
    isPreviewVersionWithServiceTermsAccepted: item["isPreviewVersionWithServiceTermsAccepted"],
    licenseModel: item["licenseModel"],
    ncharacterSet: item["ncharacterSet"],
    scheduledOperationsList: !item["scheduledOperationsList"]
      ? item["scheduledOperationsList"]
      : scheduledOperationsTypeArraySerializer(item["scheduledOperationsList"]),
    privateEndpointIp: item["privateEndpointIp"],
    privateEndpointLabel: item["privateEndpointLabel"],
    subnetId: item["subnetId"],
    vnetId: item["vnetId"],
    databaseEdition: item["databaseEdition"],
    autonomousDatabaseId: item["autonomousDatabaseId"],
    longTermBackupSchedule: !item["longTermBackupSchedule"]
      ? item["longTermBackupSchedule"]
      : longTermBackUpScheduleDetailsSerializer(item["longTermBackupSchedule"]),
    localAdgAutoFailoverMaxDataLossLimit: item["localAdgAutoFailoverMaxDataLossLimit"],
    openMode: item["openMode"],
    permissionLevel: item["permissionLevel"],
    role: item["role"],
    backupRetentionPeriodInDays: item["backupRetentionPeriodInDays"],
    whitelistedIps: !item["whitelistedIps"]
      ? item["whitelistedIps"]
      : item["whitelistedIps"].map((p: any) => {
          return p;
        }),
    source: item["source"],
    sourceId: item["sourceId"],
    cloneType: item["cloneType"],
    timestamp: !item["timestamp"] ? item["timestamp"] : item["timestamp"].toISOString(),
    useLatestAvailableBackupTimeStamp: item["useLatestAvailableBackupTimeStamp"],
  };
}

export function autonomousDatabaseFromBackupTimestampPropertiesDeserializer(
  item: any,
): AutonomousDatabaseFromBackupTimestampProperties {
  return {
    adminPassword: item["adminPassword"],
    dataBaseType: item["dataBaseType"],
    autonomousMaintenanceScheduleType: item["autonomousMaintenanceScheduleType"],
    characterSet: item["characterSet"],
    computeCount: item["computeCount"],
    computeModel: item["computeModel"],
    cpuCoreCount: item["cpuCoreCount"],
    customerContacts: !item["customerContacts"]
      ? item["customerContacts"]
      : customerContactArrayDeserializer(item["customerContacts"]),
    dataStorageSizeInTbs: item["dataStorageSizeInTbs"],
    dataStorageSizeInGbs: item["dataStorageSizeInGbs"],
    dbVersion: item["dbVersion"],
    dbWorkload: item["dbWorkload"],
    displayName: item["displayName"],
    isAutoScalingEnabled: item["isAutoScalingEnabled"],
    isAutoScalingForStorageEnabled: item["isAutoScalingForStorageEnabled"],
    peerDbIds: !item["peerDbIds"]
      ? item["peerDbIds"]
      : item["peerDbIds"].map((p: any) => {
          return p;
        }),
    peerDbId: item["peerDbId"],
    isLocalDataGuardEnabled: item["isLocalDataGuardEnabled"],
    isRemoteDataGuardEnabled: item["isRemoteDataGuardEnabled"],
    localDisasterRecoveryType: item["localDisasterRecoveryType"],
    timeDisasterRecoveryRoleChanged: !item["timeDisasterRecoveryRoleChanged"]
      ? item["timeDisasterRecoveryRoleChanged"]
      : new Date(item["timeDisasterRecoveryRoleChanged"]),
    remoteDisasterRecoveryConfiguration: !item["remoteDisasterRecoveryConfiguration"]
      ? item["remoteDisasterRecoveryConfiguration"]
      : disasterRecoveryConfigurationDetailsDeserializer(
          item["remoteDisasterRecoveryConfiguration"],
        ),
    localStandbyDb: !item["localStandbyDb"]
      ? item["localStandbyDb"]
      : autonomousDatabaseStandbySummaryDeserializer(item["localStandbyDb"]),
    failedDataRecoveryInSeconds: item["failedDataRecoveryInSeconds"],
    isMtlsConnectionRequired: item["isMtlsConnectionRequired"],
    isPreviewVersionWithServiceTermsAccepted: item["isPreviewVersionWithServiceTermsAccepted"],
    licenseModel: item["licenseModel"],
    ncharacterSet: item["ncharacterSet"],
    lifecycleDetails: item["lifecycleDetails"],
    provisioningState: item["provisioningState"],
    lifecycleState: item["lifecycleState"],
    scheduledOperationsList: !item["scheduledOperationsList"]
      ? item["scheduledOperationsList"]
      : scheduledOperationsTypeArrayDeserializer(item["scheduledOperationsList"]),
    privateEndpointIp: item["privateEndpointIp"],
    privateEndpointLabel: item["privateEndpointLabel"],
    ociUrl: item["ociUrl"],
    subnetId: item["subnetId"],
    vnetId: item["vnetId"],
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    timeMaintenanceBegin: !item["timeMaintenanceBegin"]
      ? item["timeMaintenanceBegin"]
      : new Date(item["timeMaintenanceBegin"]),
    timeMaintenanceEnd: !item["timeMaintenanceEnd"]
      ? item["timeMaintenanceEnd"]
      : new Date(item["timeMaintenanceEnd"]),
    actualUsedDataStorageSizeInTbs: item["actualUsedDataStorageSizeInTbs"],
    allocatedStorageSizeInTbs: item["allocatedStorageSizeInTbs"],
    apexDetails: !item["apexDetails"]
      ? item["apexDetails"]
      : apexDetailsTypeDeserializer(item["apexDetails"]),
    availableUpgradeVersions: !item["availableUpgradeVersions"]
      ? item["availableUpgradeVersions"]
      : item["availableUpgradeVersions"].map((p: any) => {
          return p;
        }),
    connectionStrings: !item["connectionStrings"]
      ? item["connectionStrings"]
      : connectionStringTypeDeserializer(item["connectionStrings"]),
    connectionUrls: !item["connectionUrls"]
      ? item["connectionUrls"]
      : connectionUrlTypeDeserializer(item["connectionUrls"]),
    dataSafeStatus: item["dataSafeStatus"],
    databaseEdition: item["databaseEdition"],
    autonomousDatabaseId: item["autonomousDatabaseId"],
    inMemoryAreaInGbs: item["inMemoryAreaInGbs"],
    nextLongTermBackupTimeStamp: !item["nextLongTermBackupTimeStamp"]
      ? item["nextLongTermBackupTimeStamp"]
      : new Date(item["nextLongTermBackupTimeStamp"]),
    longTermBackupSchedule: !item["longTermBackupSchedule"]
      ? item["longTermBackupSchedule"]
      : longTermBackUpScheduleDetailsDeserializer(item["longTermBackupSchedule"]),
    isPreview: item["isPreview"],
    localAdgAutoFailoverMaxDataLossLimit: item["localAdgAutoFailoverMaxDataLossLimit"],
    memoryPerOracleComputeUnitInGbs: item["memoryPerOracleComputeUnitInGbs"],
    openMode: item["openMode"],
    operationsInsightsStatus: item["operationsInsightsStatus"],
    permissionLevel: item["permissionLevel"],
    privateEndpoint: item["privateEndpoint"],
    provisionableCpus: !item["provisionableCpus"]
      ? item["provisionableCpus"]
      : item["provisionableCpus"].map((p: any) => {
          return p;
        }),
    role: item["role"],
    serviceConsoleUrl: item["serviceConsoleUrl"],
    sqlWebDeveloperUrl: item["sqlWebDeveloperUrl"],
    supportedRegionsToCloneTo: !item["supportedRegionsToCloneTo"]
      ? item["supportedRegionsToCloneTo"]
      : item["supportedRegionsToCloneTo"].map((p: any) => {
          return p;
        }),
    timeDataGuardRoleChanged: item["timeDataGuardRoleChanged"],
    timeDeletionOfFreeAutonomousDatabase: item["timeDeletionOfFreeAutonomousDatabase"],
    timeLocalDataGuardEnabled: item["timeLocalDataGuardEnabled"],
    timeOfLastFailover: item["timeOfLastFailover"],
    timeOfLastRefresh: item["timeOfLastRefresh"],
    timeOfLastRefreshPoint: item["timeOfLastRefreshPoint"],
    timeOfLastSwitchover: item["timeOfLastSwitchover"],
    timeReclamationOfFreeAutonomousDatabase: item["timeReclamationOfFreeAutonomousDatabase"],
    usedDataStorageSizeInGbs: item["usedDataStorageSizeInGbs"],
    usedDataStorageSizeInTbs: item["usedDataStorageSizeInTbs"],
    ocid: item["ocid"],
    backupRetentionPeriodInDays: item["backupRetentionPeriodInDays"],
    whitelistedIps: !item["whitelistedIps"]
      ? item["whitelistedIps"]
      : item["whitelistedIps"].map((p: any) => {
          return p;
        }),
    source: item["source"],
    sourceId: item["sourceId"],
    cloneType: item["cloneType"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    useLatestAvailableBackupTimeStamp: item["useLatestAvailableBackupTimeStamp"],
  };
}

/** The type used for update operations of the AutonomousDatabase. */
export interface AutonomousDatabaseUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: AutonomousDatabaseUpdateProperties;
}

export function autonomousDatabaseUpdateSerializer(item: AutonomousDatabaseUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : autonomousDatabaseUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the AutonomousDatabase. */
export interface AutonomousDatabaseUpdateProperties {
  /** Admin password. */
  adminPassword?: string;
  /** The maintenance schedule type of the Autonomous Database Serverless. */
  autonomousMaintenanceScheduleType?: AutonomousMaintenanceScheduleType;
  /** The compute amount (CPUs) available to the database. */
  computeCount?: number;
  /** The number of CPU cores to be made available to the database. */
  cpuCoreCount?: number;
  /** Customer Contacts. */
  customerContacts?: CustomerContact[];
  /** The quantity of data in the database, in terabytes. */
  dataStorageSizeInTbs?: number;
  /** The size, in gigabytes, of the data volume that will be created and attached to the database. */
  dataStorageSizeInGbs?: number;
  /** The user-friendly name for the Autonomous Database. */
  displayName?: string;
  /** Indicates if auto scaling is enabled for the Autonomous Database CPU core count. */
  isAutoScalingEnabled?: boolean;
  /** Indicates if auto scaling is enabled for the Autonomous Database storage. */
  isAutoScalingForStorageEnabled?: boolean;
  /** The Azure resource ID of the Disaster Recovery peer database, which is located in a different region from the current peer database. */
  peerDbId?: string;
  /** Indicates whether the Autonomous Database has local or called in-region Data Guard enabled. */
  isLocalDataGuardEnabled?: boolean;
  /** Specifies if the Autonomous Database requires mTLS connections. */
  isMtlsConnectionRequired?: boolean;
  /** The Oracle license model that applies to the Oracle Autonomous Database. The default is LICENSE_INCLUDED. */
  licenseModel?: LicenseModel;
  /** The list of scheduled operations. */
  scheduledOperationsList?: ScheduledOperationsTypeUpdate[];
  /** The Oracle Database Edition that applies to the Autonomous databases. */
  databaseEdition?: DatabaseEditionType;
  /** Details for the long-term backup schedule. */
  longTermBackupSchedule?: LongTermBackUpScheduleDetails;
  /** Parameter that allows users to select an acceptable maximum data loss limit in seconds, up to which Automatic Failover will be triggered when necessary for a Local Autonomous Data Guard */
  localAdgAutoFailoverMaxDataLossLimit?: number;
  /** Indicates the Autonomous Database mode. */
  openMode?: OpenModeType;
  /** The Autonomous Database permission level. */
  permissionLevel?: PermissionLevelType;
  /** The Data Guard role of the Autonomous Container Database or Autonomous Database, if Autonomous Data Guard is enabled. */
  role?: RoleType;
  /** Retention period, in days, for long-term backups */
  backupRetentionPeriodInDays?: number;
  /** The client IP access control list (ACL). This is an array of CIDR notations and/or IP addresses. Values should be separate strings, separated by commas. Example: ['1.1.1.1','1.1.1.0/24','1.1.2.25'] */
  whitelistedIps?: string[];
}

export function autonomousDatabaseUpdatePropertiesSerializer(
  item: AutonomousDatabaseUpdateProperties,
): any {
  return {
    adminPassword: item["adminPassword"],
    autonomousMaintenanceScheduleType: item["autonomousMaintenanceScheduleType"],
    computeCount: item["computeCount"],
    cpuCoreCount: item["cpuCoreCount"],
    customerContacts: !item["customerContacts"]
      ? item["customerContacts"]
      : customerContactArraySerializer(item["customerContacts"]),
    dataStorageSizeInTbs: item["dataStorageSizeInTbs"],
    dataStorageSizeInGbs: item["dataStorageSizeInGbs"],
    displayName: item["displayName"],
    isAutoScalingEnabled: item["isAutoScalingEnabled"],
    isAutoScalingForStorageEnabled: item["isAutoScalingForStorageEnabled"],
    peerDbId: item["peerDbId"],
    isLocalDataGuardEnabled: item["isLocalDataGuardEnabled"],
    isMtlsConnectionRequired: item["isMtlsConnectionRequired"],
    licenseModel: item["licenseModel"],
    scheduledOperationsList: !item["scheduledOperationsList"]
      ? item["scheduledOperationsList"]
      : scheduledOperationsTypeUpdateArraySerializer(item["scheduledOperationsList"]),
    databaseEdition: item["databaseEdition"],
    longTermBackupSchedule: !item["longTermBackupSchedule"]
      ? item["longTermBackupSchedule"]
      : longTermBackUpScheduleDetailsSerializer(item["longTermBackupSchedule"]),
    localAdgAutoFailoverMaxDataLossLimit: item["localAdgAutoFailoverMaxDataLossLimit"],
    openMode: item["openMode"],
    permissionLevel: item["permissionLevel"],
    role: item["role"],
    backupRetentionPeriodInDays: item["backupRetentionPeriodInDays"],
    whitelistedIps: !item["whitelistedIps"]
      ? item["whitelistedIps"]
      : item["whitelistedIps"].map((p: any) => {
          return p;
        }),
  };
}

export function scheduledOperationsTypeUpdateArraySerializer(
  result: Array<ScheduledOperationsTypeUpdate>,
): any[] {
  return result.map((item) => {
    return scheduledOperationsTypeUpdateSerializer(item);
  });
}

/** The list of scheduled operations. */
export interface ScheduledOperationsTypeUpdate {
  /** Day of week */
  dayOfWeek?: DayOfWeekUpdate;
  /** auto start time. value must be of ISO-8601 format HH:mm */
  scheduledStartTime?: string;
  /** auto stop time. value must be of ISO-8601 format HH:mm */
  scheduledStopTime?: string;
}

export function scheduledOperationsTypeUpdateSerializer(item: ScheduledOperationsTypeUpdate): any {
  return {
    dayOfWeek: !item["dayOfWeek"]
      ? item["dayOfWeek"]
      : dayOfWeekUpdateSerializer(item["dayOfWeek"]),
    scheduledStartTime: item["scheduledStartTime"],
    scheduledStopTime: item["scheduledStopTime"],
  };
}

/** DayOfWeek resource properties */
export interface DayOfWeekUpdate {
  /** Name of the day of the week. */
  name?: DayOfWeekName;
}

export function dayOfWeekUpdateSerializer(item: DayOfWeekUpdate): any {
  return { name: item["name"] };
}

/** PeerDb Details */
export interface PeerDbDetails {
  /** The Azure resource ID of the Disaster Recovery peer database, which is located in a different region from the current peer database. */
  peerDbId?: string;
  /** Ocid of the Disaster Recovery peer database, which is located in a different region from the current peer database. */
  peerDbOcid?: string;
  /** The location of the Disaster Recovery peer database. */
  peerDbLocation?: string;
}

export function peerDbDetailsSerializer(item: PeerDbDetails): any {
  return {
    peerDbId: item["peerDbId"],
    peerDbOcid: item["peerDbOcid"],
    peerDbLocation: item["peerDbLocation"],
  };
}

/** Autonomous Database Generate Wallet resource model. */
export interface GenerateAutonomousDatabaseWalletDetails {
  /** The type of wallet to generate. */
  generateType?: GenerateType;
  /** True when requesting regional connection strings in PDB connect info, applicable to cross-region DG only. */
  isRegional?: boolean;
  /** The password to encrypt the keys inside the wallet */
  password: string;
}

export function generateAutonomousDatabaseWalletDetailsSerializer(
  item: GenerateAutonomousDatabaseWalletDetails,
): any {
  return {
    generateType: item["generateType"],
    isRegional: item["isRegional"],
    password: item["password"],
  };
}

/** Generate type enum */
export enum KnownGenerateType {
  /** Generate single */
  Single = "Single",
  /** Generate all */
  All = "All",
}

/**
 * Generate type enum \
 * {@link KnownGenerateType} can be used interchangeably with GenerateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Single**: Generate single \
 * **All**: Generate all
 */
export type GenerateType = string;

/** Autonomous Database Wallet File resource model. */
export interface AutonomousDatabaseWalletFile {
  /** The base64 encoded wallet files */
  walletFiles: string;
}

export function autonomousDatabaseWalletFileDeserializer(item: any): AutonomousDatabaseWalletFile {
  return {
    walletFiles: item["walletFiles"],
  };
}

/** Details to restore an Oracle Autonomous Database. */
export interface RestoreAutonomousDatabaseDetails {
  /** The time to restore the database to. */
  timestamp: Date;
}

export function restoreAutonomousDatabaseDetailsSerializer(
  item: RestoreAutonomousDatabaseDetails,
): any {
  return { timestamp: item["timestamp"].toISOString() };
}

/** Autonomous Database Action Object */
export interface AutonomousDatabaseLifecycleAction {
  /** Autonomous Database lifecycle action */
  action: AutonomousDatabaseLifecycleActionEnum;
}

export function autonomousDatabaseLifecycleActionSerializer(
  item: AutonomousDatabaseLifecycleAction,
): any {
  return { action: item["action"] };
}

/** Autonomous Database Action Enum */
export enum KnownAutonomousDatabaseLifecycleActionEnum {
  /** Start Autonomous Database */
  Start = "Start",
  /** Stop Autonomous Database */
  Stop = "Stop",
  /** Restart Autonomous Database */
  Restart = "Restart",
}

/**
 * Autonomous Database Action Enum \
 * {@link KnownAutonomousDatabaseLifecycleActionEnum} can be used interchangeably with AutonomousDatabaseLifecycleActionEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Start**: Start Autonomous Database \
 * **Stop**: Stop Autonomous Database \
 * **Restart**: Restart Autonomous Database
 */
export type AutonomousDatabaseLifecycleActionEnum = string;

/** AutonomousDatabaseBackup resource definition */
export interface AutonomousDatabaseBackup extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AutonomousDatabaseBackupProperties;
}

export function autonomousDatabaseBackupSerializer(item: AutonomousDatabaseBackup): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : autonomousDatabaseBackupPropertiesSerializer(item["properties"]),
  };
}

export function autonomousDatabaseBackupDeserializer(item: any): AutonomousDatabaseBackup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : autonomousDatabaseBackupPropertiesDeserializer(item["properties"]),
  };
}

/** AutonomousDatabaseBackup resource model */
export interface AutonomousDatabaseBackupProperties {
  /** The OCID of the Autonomous Database. */
  readonly autonomousDatabaseOcid?: string;
  /** The size of the database in terabytes at the time the backup was taken. */
  readonly databaseSizeInTbs?: number;
  /** A valid Oracle Database version for Autonomous Database. */
  readonly dbVersion?: string;
  /** The user-friendly name for the backup. The name does not have to be unique. */
  displayName?: string;
  /** The OCID of the Autonomous Database backup. */
  readonly ocid?: string;
  /** Indicates whether the backup is user-initiated or automatic. */
  readonly isAutomatic?: boolean;
  /** Indicates whether the backup can be used to restore the associated Autonomous Database. */
  readonly isRestorable?: boolean;
  /** Additional information about the current lifecycle state. */
  readonly lifecycleDetails?: string;
  /** The current state of the backup. */
  readonly lifecycleState?: AutonomousDatabaseBackupLifecycleState;
  /** Retention period, in days */
  retentionPeriodInDays?: number;
  /** The backup size in terabytes (TB). */
  readonly sizeInTbs?: number;
  /** Timestamp until when the backup will be available. */
  readonly timeAvailableTil?: Date;
  /** The date and time the backup started. */
  readonly timeStarted?: string;
  /** The date and time the backup completed. */
  readonly timeEnded?: string;
  /** The type of backup. */
  readonly backupType?: AutonomousDatabaseBackupType;
  /** Azure resource provisioning state. */
  readonly provisioningState?: AzureResourceProvisioningState;
}

export function autonomousDatabaseBackupPropertiesSerializer(
  item: AutonomousDatabaseBackupProperties,
): any {
  return {
    displayName: item["displayName"],
    retentionPeriodInDays: item["retentionPeriodInDays"],
  };
}

export function autonomousDatabaseBackupPropertiesDeserializer(
  item: any,
): AutonomousDatabaseBackupProperties {
  return {
    autonomousDatabaseOcid: item["autonomousDatabaseOcid"],
    databaseSizeInTbs: item["databaseSizeInTbs"],
    dbVersion: item["dbVersion"],
    displayName: item["displayName"],
    ocid: item["ocid"],
    isAutomatic: item["isAutomatic"],
    isRestorable: item["isRestorable"],
    lifecycleDetails: item["lifecycleDetails"],
    lifecycleState: item["lifecycleState"],
    retentionPeriodInDays: item["retentionPeriodInDays"],
    sizeInTbs: item["sizeInTbs"],
    timeAvailableTil: !item["timeAvailableTil"]
      ? item["timeAvailableTil"]
      : new Date(item["timeAvailableTil"]),
    timeStarted: item["timeStarted"],
    timeEnded: item["timeEnded"],
    backupType: item["backupType"],
    provisioningState: item["provisioningState"],
  };
}

/** Autonomous database backup lifecycle state enum */
export enum KnownAutonomousDatabaseBackupLifecycleState {
  /** AutonomousDatabase backup is creating */
  Creating = "Creating",
  /** AutonomousDatabase backup is active */
  Active = "Active",
  /** AutonomousDatabase backup is deleting */
  Deleting = "Deleting",
  /** AutonomousDatabase backup is failed */
  Failed = "Failed",
  /** AutonomousDatabase backup is updating */
  Updating = "Updating",
}

/**
 * Autonomous database backup lifecycle state enum \
 * {@link KnownAutonomousDatabaseBackupLifecycleState} can be used interchangeably with AutonomousDatabaseBackupLifecycleState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: AutonomousDatabase backup is creating \
 * **Active**: AutonomousDatabase backup is active \
 * **Deleting**: AutonomousDatabase backup is deleting \
 * **Failed**: AutonomousDatabase backup is failed \
 * **Updating**: AutonomousDatabase backup is updating
 */
export type AutonomousDatabaseBackupLifecycleState = string;

/** Autonomous database backup type enum */
export enum KnownAutonomousDatabaseBackupType {
  /** Incremental backup */
  Incremental = "Incremental",
  /** Full backup */
  Full = "Full",
  /** LongTerm backup */
  LongTerm = "LongTerm",
}

/**
 * Autonomous database backup type enum \
 * {@link KnownAutonomousDatabaseBackupType} can be used interchangeably with AutonomousDatabaseBackupType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Incremental**: Incremental backup \
 * **Full**: Full backup \
 * **LongTerm**: LongTerm backup
 */
export type AutonomousDatabaseBackupType = string;

/** The type used for update operations of the AutonomousDatabaseBackup. */
export interface AutonomousDatabaseBackupUpdate {
  /** The resource-specific properties for this resource. */
  properties?: AutonomousDatabaseBackupUpdateProperties;
}

export function autonomousDatabaseBackupUpdateSerializer(
  item: AutonomousDatabaseBackupUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : autonomousDatabaseBackupUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the AutonomousDatabaseBackup. */
export interface AutonomousDatabaseBackupUpdateProperties {
  /** Retention period, in days */
  retentionPeriodInDays?: number;
}

export function autonomousDatabaseBackupUpdatePropertiesSerializer(
  item: AutonomousDatabaseBackupUpdateProperties,
): any {
  return { retentionPeriodInDays: item["retentionPeriodInDays"] };
}

/** The response of a AutonomousDatabaseBackup list operation. */
export interface _AutonomousDatabaseBackupListResult {
  /** The AutonomousDatabaseBackup items on this page */
  value: AutonomousDatabaseBackup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _autonomousDatabaseBackupListResultDeserializer(
  item: any,
): _AutonomousDatabaseBackupListResult {
  return {
    value: autonomousDatabaseBackupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function autonomousDatabaseBackupArraySerializer(
  result: Array<AutonomousDatabaseBackup>,
): any[] {
  return result.map((item) => {
    return autonomousDatabaseBackupSerializer(item);
  });
}

export function autonomousDatabaseBackupArrayDeserializer(
  result: Array<AutonomousDatabaseBackup>,
): any[] {
  return result.map((item) => {
    return autonomousDatabaseBackupDeserializer(item);
  });
}

/** AutonomousDatabaseCharacterSets resource definition */
export interface AutonomousDatabaseCharacterSet extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AutonomousDatabaseCharacterSetProperties;
}

export function autonomousDatabaseCharacterSetDeserializer(
  item: any,
): AutonomousDatabaseCharacterSet {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : autonomousDatabaseCharacterSetPropertiesDeserializer(item["properties"]),
  };
}

/** AutonomousDatabaseCharacterSet resource model */
export interface AutonomousDatabaseCharacterSetProperties {
  /** The Oracle Autonomous Database supported character sets. */
  characterSet: string;
}

export function autonomousDatabaseCharacterSetPropertiesDeserializer(
  item: any,
): AutonomousDatabaseCharacterSetProperties {
  return {
    characterSet: item["characterSet"],
  };
}

/** The response of a AutonomousDatabaseCharacterSet list operation. */
export interface _AutonomousDatabaseCharacterSetListResult {
  /** The AutonomousDatabaseCharacterSet items on this page */
  value: AutonomousDatabaseCharacterSet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _autonomousDatabaseCharacterSetListResultDeserializer(
  item: any,
): _AutonomousDatabaseCharacterSetListResult {
  return {
    value: autonomousDatabaseCharacterSetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function autonomousDatabaseCharacterSetArrayDeserializer(
  result: Array<AutonomousDatabaseCharacterSet>,
): any[] {
  return result.map((item) => {
    return autonomousDatabaseCharacterSetDeserializer(item);
  });
}

/** AutonomousDatabaseNationalCharacterSets resource definition */
export interface AutonomousDatabaseNationalCharacterSet extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AutonomousDatabaseNationalCharacterSetProperties;
}

export function autonomousDatabaseNationalCharacterSetDeserializer(
  item: any,
): AutonomousDatabaseNationalCharacterSet {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : autonomousDatabaseNationalCharacterSetPropertiesDeserializer(item["properties"]),
  };
}

/** AutonomousDatabaseNationalCharacterSet resource model */
export interface AutonomousDatabaseNationalCharacterSetProperties {
  /** The Oracle Autonomous Database supported national character sets. */
  characterSet: string;
}

export function autonomousDatabaseNationalCharacterSetPropertiesDeserializer(
  item: any,
): AutonomousDatabaseNationalCharacterSetProperties {
  return {
    characterSet: item["characterSet"],
  };
}

/** The response of a AutonomousDatabaseNationalCharacterSet list operation. */
export interface _AutonomousDatabaseNationalCharacterSetListResult {
  /** The AutonomousDatabaseNationalCharacterSet items on this page */
  value: AutonomousDatabaseNationalCharacterSet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _autonomousDatabaseNationalCharacterSetListResultDeserializer(
  item: any,
): _AutonomousDatabaseNationalCharacterSetListResult {
  return {
    value: autonomousDatabaseNationalCharacterSetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function autonomousDatabaseNationalCharacterSetArrayDeserializer(
  result: Array<AutonomousDatabaseNationalCharacterSet>,
): any[] {
  return result.map((item) => {
    return autonomousDatabaseNationalCharacterSetDeserializer(item);
  });
}

/** AutonomousDbVersion resource definition */
export interface AutonomousDbVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AutonomousDbVersionProperties;
}

export function autonomousDbVersionDeserializer(item: any): AutonomousDbVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : autonomousDbVersionPropertiesDeserializer(item["properties"]),
  };
}

/** AutonomousDbVersion resource model */
export interface AutonomousDbVersionProperties {
  /** Supported Autonomous Db versions. */
  version: string;
  /** The Autonomous Database workload type */
  dbWorkload?: WorkloadType;
  /** True if this version of the Oracle Database software's default is free. */
  isDefaultForFree?: boolean;
  /** True if this version of the Oracle Database software's default is paid. */
  isDefaultForPaid?: boolean;
  /** True if this version of the Oracle Database software can be used for Always-Free Autonomous Databases. */
  isFreeTierEnabled?: boolean;
  /** True if this version of the Oracle Database software has payments enabled. */
  isPaidEnabled?: boolean;
}

export function autonomousDbVersionPropertiesDeserializer(
  item: any,
): AutonomousDbVersionProperties {
  return {
    version: item["version"],
    dbWorkload: item["dbWorkload"],
    isDefaultForFree: item["isDefaultForFree"],
    isDefaultForPaid: item["isDefaultForPaid"],
    isFreeTierEnabled: item["isFreeTierEnabled"],
    isPaidEnabled: item["isPaidEnabled"],
  };
}

/** The response of a AutonomousDbVersion list operation. */
export interface _AutonomousDbVersionListResult {
  /** The AutonomousDbVersion items on this page */
  value: AutonomousDbVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _autonomousDbVersionListResultDeserializer(
  item: any,
): _AutonomousDbVersionListResult {
  return {
    value: autonomousDbVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function autonomousDbVersionArrayDeserializer(result: Array<AutonomousDbVersion>): any[] {
  return result.map((item) => {
    return autonomousDbVersionDeserializer(item);
  });
}

/** The response of a ExadbVmCluster list operation. */
export interface _ExadbVmClusterListResult {
  /** The ExadbVmCluster items on this page */
  value: ExadbVmCluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _exadbVmClusterListResultDeserializer(item: any): _ExadbVmClusterListResult {
  return {
    value: exadbVmClusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function exadbVmClusterArraySerializer(result: Array<ExadbVmCluster>): any[] {
  return result.map((item) => {
    return exadbVmClusterSerializer(item);
  });
}

export function exadbVmClusterArrayDeserializer(result: Array<ExadbVmCluster>): any[] {
  return result.map((item) => {
    return exadbVmClusterDeserializer(item);
  });
}

/** ExadbVmCluster resource definition */
export interface ExadbVmCluster extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ExadbVmClusterProperties;
  /** The availability zones. */
  zones?: string[];
}

export function exadbVmClusterSerializer(item: ExadbVmCluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : exadbVmClusterPropertiesSerializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function exadbVmClusterDeserializer(item: any): ExadbVmCluster {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : exadbVmClusterPropertiesDeserializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** ExadbVmCluster resource model */
export interface ExadbVmClusterProperties {
  /** ExadbVmCluster ocid */
  readonly ocid?: string;
  /** The cluster name for Exadata VM cluster on Exascale Infrastructure. The cluster name must begin with an alphabetic character, and may contain hyphens (-). Underscores (_) are not permitted. The cluster name can be no longer than 11 characters and is not case sensitive. */
  clusterName?: string;
  /** Client OCI backup subnet CIDR, default is 192.168.252.0/22 */
  backupSubnetCidr?: string;
  /** HTTPS link to OCI Network Security Group exposed to Azure Customer via the Azure Interface. */
  readonly nsgUrl?: string;
  /** Exadata VM cluster on Exascale Infrastructure provisioning state */
  readonly provisioningState?: AzureResourceProvisioningState;
  /** CloudVmCluster lifecycle state */
  readonly lifecycleState?: ExadbVmClusterLifecycleState;
  /** VNET for network connectivity */
  vnetId: string;
  /** Client subnet */
  subnetId: string;
  /** Indicates user preferences for the various diagnostic collection options for the VM cluster/Cloud VM cluster/VMBM DBCS. */
  dataCollectionOptions?: DataCollectionOptions;
  /** Display Name */
  displayName: string;
  /** A domain name used for the Exadata VM cluster on Exascale Infrastructure */
  domain?: string;
  /** The number of ECPUs to enable for an Exadata VM cluster on Exascale Infrastructure. */
  enabledEcpuCount: number;
  /** The Azure Resource ID of the Exadata Database Storage Vault. */
  exascaleDbStorageVaultId: string;
  /** Grid Setup will be done using this Grid Image OCID. Can be obtained using giMinorVersions API */
  gridImageOcid?: string;
  /** The type of Grid Image */
  readonly gridImageType?: GridImageType;
  /** Oracle Grid Infrastructure (GI) software version */
  readonly giVersion?: string;
  /** The hostname for the  Exadata VM cluster on Exascale Infrastructure. */
  hostname: string;
  /** The Oracle license model that applies to the Exadata VM cluster on Exascale Infrastructure. The default is LICENSE_INCLUDED. */
  licenseModel?: LicenseModel;
  /** The memory that you want to be allocated in GBs. Memory is calculated based on 11 GB per VM core reserved. */
  readonly memorySizeInGbs?: number;
  /** The number of nodes in the Exadata VM cluster on Exascale Infrastructure. */
  nodeCount: number;
  /** CIDR blocks for additional NSG ingress rules. The VNET CIDRs used to provision the VM Cluster will be added by default. */
  nsgCidrs?: NsgCidr[];
  /** The OCID of the zone the Exadata VM cluster on Exascale Infrastructure is associated with. */
  readonly zoneOcid?: string;
  /** The OCID of the zone the Exadata VM cluster on Exascale Infrastructure is associated with. */
  privateZoneOcid?: string;
  /** The TCP Single Client Access Name (SCAN) port. The default port is 1521. */
  scanListenerPortTcp?: number;
  /** The TCPS Single Client Access Name (SCAN) port. The default port is 2484. */
  scanListenerPortTcpSsl?: number;
  /** The port number configured for the listener on the Exadata VM cluster on Exascale Infrastructure. */
  readonly listenerPort?: number;
  /** The shape of the Exadata VM cluster on Exascale Infrastructure resource */
  shape: string;
  /** The public key portion of one or more key pairs used for SSH access to the Exadata VM cluster on Exascale Infrastructure. */
  sshPublicKeys: string[];
  /** Operating system version of the image. */
  systemVersion?: string;
  /** The time zone of the Exadata VM cluster on Exascale Infrastructure. For details, see [Exadata Infrastructure Time Zones](/Content/Database/References/timezones.htm). */
  timeZone?: string;
  /** The number of Total ECPUs for an Exadata VM cluster on Exascale Infrastructure. */
  totalEcpuCount: number;
  /** Filesystem storage details. */
  vmFileSystemStorage: ExadbVmClusterStorageDetails;
  /** Additional information about the current lifecycle state. */
  readonly lifecycleDetails?: string;
  /** The FQDN of the DNS record for the SCAN IP addresses that are associated with the Exadata VM cluster on Exascale Infrastructure. */
  readonly scanDnsName?: string;
  /** The Single Client Access Name (SCAN) IP addresses associated with the Exadata VM cluster on Exascale Infrastructure. SCAN IP addresses are typically used for load balancing and are not assigned to any interface. Oracle Clusterware directs the requests to the appropriate nodes in the cluster. **Note:** For a single-node DB system, this list is empty. */
  readonly scanIpIds?: string[];
  /** The OCID of the DNS record for the SCAN IP addresses that are associated with the Exadata VM cluster on Exascale Infrastructure. */
  readonly scanDnsRecordId?: string;
  /** Snapshot filesystem storage details. */
  readonly snapshotFileSystemStorage?: ExadbVmClusterStorageDetails;
  /** Total file system storage details. */
  readonly totalFileSystemStorage?: ExadbVmClusterStorageDetails;
  /** The virtual IP (VIP) addresses associated with the Exadata VM cluster on Exascale Infrastructure. The Cluster Ready Services (CRS) creates and maintains one VIP address for each node in the Exadata Cloud Service instance to enable failover. If one node fails, the VIP is reassigned to another active node in the cluster. **Note:** For a single-node DB system, this list is empty. */
  readonly vipIds?: string[];
  /** HTTPS link to OCI resources exposed to Azure Customer via Azure Interface. */
  readonly ociUrl?: string;
  /** iormConfigCache details for Exadata VM cluster on Exascale Infrastructure. */
  readonly iormConfigCache?: ExadataIormConfig;
  /** Cluster backup subnet ocid */
  readonly backupSubnetOcid?: string;
  /** Cluster subnet ocid */
  readonly subnetOcid?: string;
  /** The type of Exascale storage used for Exadata VM cluster. */
  shapeAttribute?: ShapeAttribute;
}

export function exadbVmClusterPropertiesSerializer(item: ExadbVmClusterProperties): any {
  return {
    clusterName: item["clusterName"],
    backupSubnetCidr: item["backupSubnetCidr"],
    vnetId: item["vnetId"],
    subnetId: item["subnetId"],
    dataCollectionOptions: !item["dataCollectionOptions"]
      ? item["dataCollectionOptions"]
      : dataCollectionOptionsSerializer(item["dataCollectionOptions"]),
    displayName: item["displayName"],
    domain: item["domain"],
    enabledEcpuCount: item["enabledEcpuCount"],
    exascaleDbStorageVaultId: item["exascaleDbStorageVaultId"],
    gridImageOcid: item["gridImageOcid"],
    hostname: item["hostname"],
    licenseModel: item["licenseModel"],
    nodeCount: item["nodeCount"],
    nsgCidrs: !item["nsgCidrs"] ? item["nsgCidrs"] : nsgCidrArraySerializer(item["nsgCidrs"]),
    privateZoneOcid: item["privateZoneOcid"],
    scanListenerPortTcp: item["scanListenerPortTcp"],
    scanListenerPortTcpSsl: item["scanListenerPortTcpSsl"],
    shape: item["shape"],
    sshPublicKeys: item["sshPublicKeys"].map((p: any) => {
      return p;
    }),
    systemVersion: item["systemVersion"],
    timeZone: item["timeZone"],
    totalEcpuCount: item["totalEcpuCount"],
    vmFileSystemStorage: exadbVmClusterStorageDetailsSerializer(item["vmFileSystemStorage"]),
    shapeAttribute: item["shapeAttribute"],
  };
}

export function exadbVmClusterPropertiesDeserializer(item: any): ExadbVmClusterProperties {
  return {
    ocid: item["ocid"],
    clusterName: item["clusterName"],
    backupSubnetCidr: item["backupSubnetCidr"],
    nsgUrl: item["nsgUrl"],
    provisioningState: item["provisioningState"],
    lifecycleState: item["lifecycleState"],
    vnetId: item["vnetId"],
    subnetId: item["subnetId"],
    dataCollectionOptions: !item["dataCollectionOptions"]
      ? item["dataCollectionOptions"]
      : dataCollectionOptionsDeserializer(item["dataCollectionOptions"]),
    displayName: item["displayName"],
    domain: item["domain"],
    enabledEcpuCount: item["enabledEcpuCount"],
    exascaleDbStorageVaultId: item["exascaleDbStorageVaultId"],
    gridImageOcid: item["gridImageOcid"],
    gridImageType: item["gridImageType"],
    giVersion: item["giVersion"],
    hostname: item["hostname"],
    licenseModel: item["licenseModel"],
    memorySizeInGbs: item["memorySizeInGbs"],
    nodeCount: item["nodeCount"],
    nsgCidrs: !item["nsgCidrs"] ? item["nsgCidrs"] : nsgCidrArrayDeserializer(item["nsgCidrs"]),
    zoneOcid: item["zoneOcid"],
    privateZoneOcid: item["privateZoneOcid"],
    scanListenerPortTcp: item["scanListenerPortTcp"],
    scanListenerPortTcpSsl: item["scanListenerPortTcpSsl"],
    listenerPort: item["listenerPort"],
    shape: item["shape"],
    sshPublicKeys: item["sshPublicKeys"].map((p: any) => {
      return p;
    }),
    systemVersion: item["systemVersion"],
    timeZone: item["timeZone"],
    totalEcpuCount: item["totalEcpuCount"],
    vmFileSystemStorage: exadbVmClusterStorageDetailsDeserializer(item["vmFileSystemStorage"]),
    lifecycleDetails: item["lifecycleDetails"],
    scanDnsName: item["scanDnsName"],
    scanIpIds: !item["scanIpIds"]
      ? item["scanIpIds"]
      : item["scanIpIds"].map((p: any) => {
          return p;
        }),
    scanDnsRecordId: item["scanDnsRecordId"],
    snapshotFileSystemStorage: !item["snapshotFileSystemStorage"]
      ? item["snapshotFileSystemStorage"]
      : exadbVmClusterStorageDetailsDeserializer(item["snapshotFileSystemStorage"]),
    totalFileSystemStorage: !item["totalFileSystemStorage"]
      ? item["totalFileSystemStorage"]
      : exadbVmClusterStorageDetailsDeserializer(item["totalFileSystemStorage"]),
    vipIds: !item["vipIds"]
      ? item["vipIds"]
      : item["vipIds"].map((p: any) => {
          return p;
        }),
    ociUrl: item["ociUrl"],
    iormConfigCache: !item["iormConfigCache"]
      ? item["iormConfigCache"]
      : exadataIormConfigDeserializer(item["iormConfigCache"]),
    backupSubnetOcid: item["backupSubnetOcid"],
    subnetOcid: item["subnetOcid"],
    shapeAttribute: item["shapeAttribute"],
  };
}

/** Exadata VM cluster on Exascale Infrastructure lifecycle state enum */
export enum KnownExadbVmClusterLifecycleState {
  /** Indicates that resource in Provisioning state */
  Provisioning = "Provisioning",
  /** Indicates that resource in Available state */
  Available = "Available",
  /** Indicates that resource in Updating state */
  Updating = "Updating",
  /** Indicates that resource in Terminating state */
  Terminating = "Terminating",
  /** Indicates that resource in Terminated state */
  Terminated = "Terminated",
  /** Indicates that resource Maintenance in progress state */
  MaintenanceInProgress = "MaintenanceInProgress",
  /** Indicates that resource in Failed state */
  Failed = "Failed",
}

/**
 * Exadata VM cluster on Exascale Infrastructure lifecycle state enum \
 * {@link KnownExadbVmClusterLifecycleState} can be used interchangeably with ExadbVmClusterLifecycleState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Provisioning**: Indicates that resource in Provisioning state \
 * **Available**: Indicates that resource in Available state \
 * **Updating**: Indicates that resource in Updating state \
 * **Terminating**: Indicates that resource in Terminating state \
 * **Terminated**: Indicates that resource in Terminated state \
 * **MaintenanceInProgress**: Indicates that resource Maintenance in progress state \
 * **Failed**: Indicates that resource in Failed state
 */
export type ExadbVmClusterLifecycleState = string;

/** GridImageType enum */
export enum KnownGridImageType {
  /** Release update */
  ReleaseUpdate = "ReleaseUpdate",
  /** Custom image */
  CustomImage = "CustomImage",
}

/**
 * GridImageType enum \
 * {@link KnownGridImageType} can be used interchangeably with GridImageType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReleaseUpdate**: Release update \
 * **CustomImage**: Custom image
 */
export type GridImageType = string;

/** Storage Details on the Exadata VM cluster. */
export interface ExadbVmClusterStorageDetails {
  /** Total Capacity */
  totalSizeInGbs: number;
}

export function exadbVmClusterStorageDetailsSerializer(item: ExadbVmClusterStorageDetails): any {
  return { totalSizeInGbs: item["totalSizeInGbs"] };
}

export function exadbVmClusterStorageDetailsDeserializer(item: any): ExadbVmClusterStorageDetails {
  return {
    totalSizeInGbs: item["totalSizeInGbs"],
  };
}

/** The type of Exascale storage used for Exadata VM cluster. The default is SMART_STORAGE which supports Oracle Database 23ai and later */
export enum KnownShapeAttribute {
  /** Smart storage */
  SmartStorage = "SMART_STORAGE",
  /** block storage */
  BlockStorage = "BLOCK_STORAGE",
}

/**
 * The type of Exascale storage used for Exadata VM cluster. The default is SMART_STORAGE which supports Oracle Database 23ai and later \
 * {@link KnownShapeAttribute} can be used interchangeably with ShapeAttribute,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SMART_STORAGE**: Smart storage \
 * **BLOCK_STORAGE**: block storage
 */
export type ShapeAttribute = string;

/** The type used for update operations of the ExadbVmCluster. */
export interface ExadbVmClusterUpdate {
  /** The availability zones. */
  zones?: string[];
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: ExadbVmClusterUpdateProperties;
}

export function exadbVmClusterUpdateSerializer(item: ExadbVmClusterUpdate): any {
  return {
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : exadbVmClusterUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the ExadbVmCluster. */
export interface ExadbVmClusterUpdateProperties {
  /** The number of nodes in the Exadata VM cluster on Exascale Infrastructure. */
  nodeCount?: number;
}

export function exadbVmClusterUpdatePropertiesSerializer(
  item: ExadbVmClusterUpdateProperties,
): any {
  return { nodeCount: item["nodeCount"] };
}

/** Details of removing Virtual Machines from the Exadata VM cluster on Exascale Infrastructure. Applies to Exadata Database Service on Exascale Infrastructure only. */
export interface RemoveVirtualMachineFromExadbVmClusterDetails {
  /** The list of ExaCS DB nodes for the Exadata VM cluster on Exascale Infrastructure to be removed. */
  dbNodes: DbNodeDetails[];
}

export function removeVirtualMachineFromExadbVmClusterDetailsSerializer(
  item: RemoveVirtualMachineFromExadbVmClusterDetails,
): any {
  return { dbNodes: dbNodeDetailsArraySerializer(item["dbNodes"]) };
}

export function dbNodeDetailsArraySerializer(result: Array<DbNodeDetails>): any[] {
  return result.map((item) => {
    return dbNodeDetailsSerializer(item);
  });
}

/** Details of the ExaCS Db node. Applies to Exadata Database Service on Exascale Infrastructure only. */
export interface DbNodeDetails {
  /** Exascale DbNode Azure Resource ID */
  dbNodeId: string;
}

export function dbNodeDetailsSerializer(item: DbNodeDetails): any {
  return { dbNodeId: item["dbNodeId"] };
}

/** The DbNode resource belonging to ExadbVmCluster */
export interface ExascaleDbNode extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ExascaleDbNodeProperties;
}

export function exascaleDbNodeDeserializer(item: any): ExascaleDbNode {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : exascaleDbNodePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of DbNodeResource */
export interface ExascaleDbNodeProperties {
  /** DbNode OCID */
  ocid: string;
  /** Additional information about the planned maintenance. */
  additionalDetails?: string;
  /** The number of CPU cores enabled on the Db node. */
  cpuCoreCount?: number;
  /** The allocated local node storage in GBs on the Db node. */
  dbNodeStorageSizeInGbs?: number;
  /** The name of the Fault Domain the instance is contained in. */
  faultDomain?: string;
  /** The host name for the database node. */
  hostname?: string;
  /** The current state of the database node. */
  lifecycleState?: DbNodeProvisioningState;
  /** The type of database node maintenance. */
  maintenanceType?: string;
  /** The allocated memory in GBs on the Db node. */
  memorySizeInGbs?: number;
  /** The size (in GB) of the block storage volume allocation for the DB system. This attribute applies only for virtual machine DB systems. */
  softwareStorageSizeInGb?: number;
  /** End date and time of maintenance window. */
  timeMaintenanceWindowEnd?: Date;
  /** Start date and time of maintenance window. */
  timeMaintenanceWindowStart?: Date;
  /** The total number of CPU cores reserved on the Db node. */
  totalCpuCoreCount?: number;
}

export function exascaleDbNodePropertiesDeserializer(item: any): ExascaleDbNodeProperties {
  return {
    ocid: item["ocid"],
    additionalDetails: item["additionalDetails"],
    cpuCoreCount: item["cpuCoreCount"],
    dbNodeStorageSizeInGbs: item["dbNodeStorageSizeInGbs"],
    faultDomain: item["faultDomain"],
    hostname: item["hostname"],
    lifecycleState: item["lifecycleState"],
    maintenanceType: item["maintenanceType"],
    memorySizeInGbs: item["memorySizeInGbs"],
    softwareStorageSizeInGb: item["softwareStorageSizeInGb"],
    timeMaintenanceWindowEnd: !item["timeMaintenanceWindowEnd"]
      ? item["timeMaintenanceWindowEnd"]
      : new Date(item["timeMaintenanceWindowEnd"]),
    timeMaintenanceWindowStart: !item["timeMaintenanceWindowStart"]
      ? item["timeMaintenanceWindowStart"]
      : new Date(item["timeMaintenanceWindowStart"]),
    totalCpuCoreCount: item["totalCpuCoreCount"],
  };
}

/** The response of a ExascaleDbNode list operation. */
export interface _ExascaleDbNodeListResult {
  /** The ExascaleDbNode items on this page */
  value: ExascaleDbNode[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _exascaleDbNodeListResultDeserializer(item: any): _ExascaleDbNodeListResult {
  return {
    value: exascaleDbNodeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function exascaleDbNodeArrayDeserializer(result: Array<ExascaleDbNode>): any[] {
  return result.map((item) => {
    return exascaleDbNodeDeserializer(item);
  });
}

/** ExascaleDbNode action response */
export interface DbActionResponse {
  /** ExascaleDbNode provisioning state */
  provisioningState?: AzureResourceProvisioningState;
}

export function dbActionResponseDeserializer(item: any): DbActionResponse {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** ExascaleDbStorageVault resource definition */
export interface ExascaleDbStorageVault extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ExascaleDbStorageVaultProperties;
  /** The availability zones. */
  zones?: string[];
}

export function exascaleDbStorageVaultSerializer(item: ExascaleDbStorageVault): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : exascaleDbStorageVaultPropertiesSerializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function exascaleDbStorageVaultDeserializer(item: any): ExascaleDbStorageVault {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : exascaleDbStorageVaultPropertiesDeserializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** ExascaleDbStorageVault resource model */
export interface ExascaleDbStorageVaultProperties {
  /** The size of additional Flash Cache in percentage of High Capacity database storage. */
  additionalFlashCacheInPercent?: number;
  /** Exadata Database Storage Vault description. */
  description?: string;
  /** The user-friendly name for the Exadata Database Storage Vault. The name does not need to be unique. */
  displayName: string;
  /** Create exadata Database Storage Details */
  highCapacityDatabaseStorageInput: ExascaleDbStorageInputDetails;
  /** Response exadata Database Storage Details */
  readonly highCapacityDatabaseStorage?: ExascaleDbStorageDetails;
  /** The time zone that you want to use for the Exadata Database Storage Vault */
  timeZone?: string;
  /** Exadata Database Storage Vault provisioning state */
  readonly provisioningState?: AzureResourceProvisioningState;
  /** Exadata Database Storage Vault lifecycle state */
  readonly lifecycleState?: ExascaleDbStorageVaultLifecycleState;
  /** Additional information about the current lifecycle state. */
  readonly lifecycleDetails?: string;
  /** The number of Exadata VM clusters used the Exadata Database Storage Vault. */
  readonly vmClusterCount?: number;
  /** The OCID of the Exadata Database Storage Vault. */
  readonly ocid?: string;
  /** HTTPS link to OCI resources exposed to Azure Customer via Azure Interface. */
  readonly ociUrl?: string;
  /** Cloud Exadata infrastructure ID */
  exadataInfrastructureId?: string;
  /** The shapeAttribute of the Exadata VM cluster(s) associated with the Exadata Database Storage Vault. */
  readonly attachedShapeAttributes?: ShapeAttribute[];
}

export function exascaleDbStorageVaultPropertiesSerializer(
  item: ExascaleDbStorageVaultProperties,
): any {
  return {
    additionalFlashCacheInPercent: item["additionalFlashCacheInPercent"],
    description: item["description"],
    displayName: item["displayName"],
    highCapacityDatabaseStorageInput: exascaleDbStorageInputDetailsSerializer(
      item["highCapacityDatabaseStorageInput"],
    ),
    timeZone: item["timeZone"],
    exadataInfrastructureId: item["exadataInfrastructureId"],
  };
}

export function exascaleDbStorageVaultPropertiesDeserializer(
  item: any,
): ExascaleDbStorageVaultProperties {
  return {
    additionalFlashCacheInPercent: item["additionalFlashCacheInPercent"],
    description: item["description"],
    displayName: item["displayName"],
    highCapacityDatabaseStorageInput: exascaleDbStorageInputDetailsDeserializer(
      item["highCapacityDatabaseStorageInput"],
    ),
    highCapacityDatabaseStorage: !item["highCapacityDatabaseStorage"]
      ? item["highCapacityDatabaseStorage"]
      : exascaleDbStorageDetailsDeserializer(item["highCapacityDatabaseStorage"]),
    timeZone: item["timeZone"],
    provisioningState: item["provisioningState"],
    lifecycleState: item["lifecycleState"],
    lifecycleDetails: item["lifecycleDetails"],
    vmClusterCount: item["vmClusterCount"],
    ocid: item["ocid"],
    ociUrl: item["ociUrl"],
    exadataInfrastructureId: item["exadataInfrastructureId"],
    attachedShapeAttributes: !item["attachedShapeAttributes"]
      ? item["attachedShapeAttributes"]
      : item["attachedShapeAttributes"].map((p: any) => {
          return p;
        }),
  };
}

/** Create exadata Database Storage Details model */
export interface ExascaleDbStorageInputDetails {
  /** Total Capacity */
  totalSizeInGbs: number;
}

export function exascaleDbStorageInputDetailsSerializer(item: ExascaleDbStorageInputDetails): any {
  return { totalSizeInGbs: item["totalSizeInGbs"] };
}

export function exascaleDbStorageInputDetailsDeserializer(
  item: any,
): ExascaleDbStorageInputDetails {
  return {
    totalSizeInGbs: item["totalSizeInGbs"],
  };
}

/** Exadata Database Storage Details */
export interface ExascaleDbStorageDetails {
  /** Available Capacity */
  availableSizeInGbs?: number;
  /** Total Capacity */
  totalSizeInGbs?: number;
}

export function exascaleDbStorageDetailsDeserializer(item: any): ExascaleDbStorageDetails {
  return {
    availableSizeInGbs: item["availableSizeInGbs"],
    totalSizeInGbs: item["totalSizeInGbs"],
  };
}

/** Exadata Database Storage Vault lifecycle state enum */
export enum KnownExascaleDbStorageVaultLifecycleState {
  /** Indicates that resource in Provisioning state */
  Provisioning = "Provisioning",
  /** Indicates that resource in Available state */
  Available = "Available",
  /** Indicates that resource in Updating state */
  Updating = "Updating",
  /** Indicates that resource in Terminating state */
  Terminating = "Terminating",
  /** Indicates that resource in Terminated state */
  Terminated = "Terminated",
  /** Indicates that resource in Failed state */
  Failed = "Failed",
}

/**
 * Exadata Database Storage Vault lifecycle state enum \
 * {@link KnownExascaleDbStorageVaultLifecycleState} can be used interchangeably with ExascaleDbStorageVaultLifecycleState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Provisioning**: Indicates that resource in Provisioning state \
 * **Available**: Indicates that resource in Available state \
 * **Updating**: Indicates that resource in Updating state \
 * **Terminating**: Indicates that resource in Terminating state \
 * **Terminated**: Indicates that resource in Terminated state \
 * **Failed**: Indicates that resource in Failed state
 */
export type ExascaleDbStorageVaultLifecycleState = string;

/** The type used for updating tags in ExascaleDbStorageVault resources. */
export interface ExascaleDbStorageVaultTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function exascaleDbStorageVaultTagsUpdateSerializer(
  item: ExascaleDbStorageVaultTagsUpdate,
): any {
  return { tags: item["tags"] };
}

/** The response of a ExascaleDbStorageVault list operation. */
export interface _ExascaleDbStorageVaultListResult {
  /** The ExascaleDbStorageVault items on this page */
  value: ExascaleDbStorageVault[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _exascaleDbStorageVaultListResultDeserializer(
  item: any,
): _ExascaleDbStorageVaultListResult {
  return {
    value: exascaleDbStorageVaultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function exascaleDbStorageVaultArraySerializer(
  result: Array<ExascaleDbStorageVault>,
): any[] {
  return result.map((item) => {
    return exascaleDbStorageVaultSerializer(item);
  });
}

export function exascaleDbStorageVaultArrayDeserializer(
  result: Array<ExascaleDbStorageVault>,
): any[] {
  return result.map((item) => {
    return exascaleDbStorageVaultDeserializer(item);
  });
}

/** The response of a NetworkAnchor list operation. */
export interface _NetworkAnchorListResult {
  /** The NetworkAnchor items on this page */
  value: NetworkAnchor[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkAnchorListResultDeserializer(item: any): _NetworkAnchorListResult {
  return {
    value: networkAnchorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkAnchorArraySerializer(result: Array<NetworkAnchor>): any[] {
  return result.map((item) => {
    return networkAnchorSerializer(item);
  });
}

export function networkAnchorArrayDeserializer(result: Array<NetworkAnchor>): any[] {
  return result.map((item) => {
    return networkAnchorDeserializer(item);
  });
}

/** Network Anchor resource model. */
export interface NetworkAnchor extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: NetworkAnchorProperties;
  /** The availability zones. */
  zones?: string[];
}

export function networkAnchorSerializer(item: NetworkAnchor): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : networkAnchorPropertiesSerializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function networkAnchorDeserializer(item: any): NetworkAnchor {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : networkAnchorPropertiesDeserializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** Network Anchor properties */
export interface NetworkAnchorProperties {
  /** Corresponding resource anchor Azure ID */
  resourceAnchorId: string;
  /** NetworkAnchor provisioning state */
  readonly provisioningState?: AzureResourceProvisioningState;
  /** VNET for network connectivity */
  readonly vnetId?: string;
  /** Client subnet */
  subnetId: string;
  /** Delegated Azure subnet cidr block. */
  readonly cidrBlock?: string;
  /** Oracle Cloud Infrastructure VCN OCID */
  readonly ociVcnId?: string;
  /** OCI DNS label. This is optional if DNS config is provided. */
  ociVcnDnsLabel?: string;
  /** Oracle Cloud Infrastructure subnet OCID */
  readonly ociSubnetId?: string;
  /** OCI backup subnet cidr block. */
  ociBackupCidrBlock?: string;
  /** Indicates whether DNS zone sync from OCI to Azure is enabled */
  isOracleToAzureDnsZoneSyncEnabled?: boolean;
  /** Indicates whether the Oracle DNS listening endpoint is enabled */
  isOracleDnsListeningEndpointEnabled?: boolean;
  /** Indicates whether the Oracle DNS forwarding endpoint is enabled */
  isOracleDnsForwardingEndpointEnabled?: boolean;
  /** DNS forwarding rules */
  dnsForwardingRules?: DnsForwardingRule[];
  /** Comma-separated list of CIDRs that are allowed to send requests to the DNS listening endpoint */
  dnsListeningEndpointAllowedCidrs?: string;
  /** DNS listening endpoint IP address */
  readonly dnsListeningEndpointIpAddress?: string;
  /** DNS forwarding endpoint IP address */
  readonly dnsForwardingEndpointIpAddress?: string;
  /** Deep link to OCI console DNS Forwarding rules page */
  readonly dnsForwardingRulesUrl?: string;
  /** Deep link to OCI console DNS Listening endpoint NSG rules */
  readonly dnsListeningEndpointNsgRulesUrl?: string;
  /** Deep link to OCI console DNS Forwarding endpoint NSG rules */
  readonly dnsForwardingEndpointNsgRulesUrl?: string;
}

export function networkAnchorPropertiesSerializer(item: NetworkAnchorProperties): any {
  return {
    resourceAnchorId: item["resourceAnchorId"],
    subnetId: item["subnetId"],
    ociVcnDnsLabel: item["ociVcnDnsLabel"],
    ociBackupCidrBlock: item["ociBackupCidrBlock"],
    isOracleToAzureDnsZoneSyncEnabled: item["isOracleToAzureDnsZoneSyncEnabled"],
    isOracleDnsListeningEndpointEnabled: item["isOracleDnsListeningEndpointEnabled"],
    isOracleDnsForwardingEndpointEnabled: item["isOracleDnsForwardingEndpointEnabled"],
    dnsForwardingRules: !item["dnsForwardingRules"]
      ? item["dnsForwardingRules"]
      : dnsForwardingRuleArraySerializer(item["dnsForwardingRules"]),
    dnsListeningEndpointAllowedCidrs: item["dnsListeningEndpointAllowedCidrs"],
  };
}

export function networkAnchorPropertiesDeserializer(item: any): NetworkAnchorProperties {
  return {
    resourceAnchorId: item["resourceAnchorId"],
    provisioningState: item["provisioningState"],
    vnetId: item["vnetId"],
    subnetId: item["subnetId"],
    cidrBlock: item["cidrBlock"],
    ociVcnId: item["ociVcnId"],
    ociVcnDnsLabel: item["ociVcnDnsLabel"],
    ociSubnetId: item["ociSubnetId"],
    ociBackupCidrBlock: item["ociBackupCidrBlock"],
    isOracleToAzureDnsZoneSyncEnabled: item["isOracleToAzureDnsZoneSyncEnabled"],
    isOracleDnsListeningEndpointEnabled: item["isOracleDnsListeningEndpointEnabled"],
    isOracleDnsForwardingEndpointEnabled: item["isOracleDnsForwardingEndpointEnabled"],
    dnsForwardingRules: !item["dnsForwardingRules"]
      ? item["dnsForwardingRules"]
      : dnsForwardingRuleArrayDeserializer(item["dnsForwardingRules"]),
    dnsListeningEndpointAllowedCidrs: item["dnsListeningEndpointAllowedCidrs"],
    dnsListeningEndpointIpAddress: item["dnsListeningEndpointIpAddress"],
    dnsForwardingEndpointIpAddress: item["dnsForwardingEndpointIpAddress"],
    dnsForwardingRulesUrl: item["dnsForwardingRulesUrl"],
    dnsListeningEndpointNsgRulesUrl: item["dnsListeningEndpointNsgRulesUrl"],
    dnsForwardingEndpointNsgRulesUrl: item["dnsForwardingEndpointNsgRulesUrl"],
  };
}

export function dnsForwardingRuleArraySerializer(result: Array<DnsForwardingRule>): any[] {
  return result.map((item) => {
    return dnsForwardingRuleSerializer(item);
  });
}

export function dnsForwardingRuleArrayDeserializer(result: Array<DnsForwardingRule>): any[] {
  return result.map((item) => {
    return dnsForwardingRuleDeserializer(item);
  });
}

/** DNS forwarding rule properties */
export interface DnsForwardingRule {
  /** Comma-separated domain names */
  domainNames: string;
  /** Forwarding ip address */
  forwardingIpAddress: string;
}

export function dnsForwardingRuleSerializer(item: DnsForwardingRule): any {
  return {
    domainNames: item["domainNames"],
    forwardingIpAddress: item["forwardingIpAddress"],
  };
}

export function dnsForwardingRuleDeserializer(item: any): DnsForwardingRule {
  return {
    domainNames: item["domainNames"],
    forwardingIpAddress: item["forwardingIpAddress"],
  };
}

/** The type used for update operations of the NetworkAnchor. */
export interface NetworkAnchorUpdate {
  /** The availability zones. */
  zones?: string[];
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: NetworkAnchorUpdateProperties;
}

export function networkAnchorUpdateSerializer(item: NetworkAnchorUpdate): any {
  return {
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : networkAnchorUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the NetworkAnchor. */
export interface NetworkAnchorUpdateProperties {
  /** OCI backup subnet cidr block. */
  ociBackupCidrBlock?: string;
  /** Indicates whether DNS zone sync from OCI to Azure is enabled */
  isOracleToAzureDnsZoneSyncEnabled?: boolean;
  /** Indicates whether the Oracle DNS listening endpoint is enabled */
  isOracleDnsListeningEndpointEnabled?: boolean;
  /** Indicates whether the Oracle DNS forwarding endpoint is enabled */
  isOracleDnsForwardingEndpointEnabled?: boolean;
}

export function networkAnchorUpdatePropertiesSerializer(item: NetworkAnchorUpdateProperties): any {
  return {
    ociBackupCidrBlock: item["ociBackupCidrBlock"],
    isOracleToAzureDnsZoneSyncEnabled: item["isOracleToAzureDnsZoneSyncEnabled"],
    isOracleDnsListeningEndpointEnabled: item["isOracleDnsListeningEndpointEnabled"],
    isOracleDnsForwardingEndpointEnabled: item["isOracleDnsForwardingEndpointEnabled"],
  };
}

/** The response of a ResourceAnchor list operation. */
export interface _ResourceAnchorListResult {
  /** The ResourceAnchor items on this page */
  value: ResourceAnchor[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _resourceAnchorListResultDeserializer(item: any): _ResourceAnchorListResult {
  return {
    value: resourceAnchorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function resourceAnchorArraySerializer(result: Array<ResourceAnchor>): any[] {
  return result.map((item) => {
    return resourceAnchorSerializer(item);
  });
}

export function resourceAnchorArrayDeserializer(result: Array<ResourceAnchor>): any[] {
  return result.map((item) => {
    return resourceAnchorDeserializer(item);
  });
}

/** Resource Anchor model. */
export interface ResourceAnchor extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ResourceAnchorProperties;
}

export function resourceAnchorSerializer(item: ResourceAnchor): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : resourceAnchorPropertiesSerializer(item["properties"]),
  };
}

export function resourceAnchorDeserializer(item: any): ResourceAnchor {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : resourceAnchorPropertiesDeserializer(item["properties"]),
  };
}

/** Resource Anchor properties. */
export interface ResourceAnchorProperties {
  /** ResourceAnchor provisioning state */
  readonly provisioningState?: AzureResourceProvisioningState;
  /** Oracle Cloud Infrastructure compartment Id (ocid) which was created or linked by customer with resource anchor. This compartmentId is different from where resource Anchor lives */
  readonly linkedCompartmentId?: string;
}

export function resourceAnchorPropertiesSerializer(item: ResourceAnchorProperties): any {
  return item;
}

export function resourceAnchorPropertiesDeserializer(item: any): ResourceAnchorProperties {
  return {
    provisioningState: item["provisioningState"],
    linkedCompartmentId: item["linkedCompartmentId"],
  };
}

/** The type used for update operations of the ResourceAnchor. */
export interface ResourceAnchorUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function resourceAnchorUpdateSerializer(item: ResourceAnchorUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a DbSystem list operation. */
export interface _DbSystemListResult {
  /** The DbSystem items on this page */
  value: DbSystem[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dbSystemListResultDeserializer(item: any): _DbSystemListResult {
  return {
    value: dbSystemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dbSystemArraySerializer(result: Array<DbSystem>): any[] {
  return result.map((item) => {
    return dbSystemSerializer(item);
  });
}

export function dbSystemArrayDeserializer(result: Array<DbSystem>): any[] {
  return result.map((item) => {
    return dbSystemDeserializer(item);
  });
}

/** DbSystem resource definition */
export interface DbSystem extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: DbSystemProperties;
  /** The availability zones. */
  zones?: string[];
}

export function dbSystemSerializer(item: DbSystem): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : dbSystemPropertiesSerializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function dbSystemDeserializer(item: any): DbSystem {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dbSystemPropertiesDeserializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** DbSystem resource model. */
export interface DbSystemProperties extends DbSystemBaseProperties {
  /** The source of the database for creating a new database. */
  source: "None";
  /** The Oracle Database Edition that applies to all the databases on the DB system. Exadata DB systems and 2-node RAC DB systems require EnterpriseEditionExtremePerformance. */
  databaseEdition: DbSystemDatabaseEditionType;
  /** A strong password for SYS, SYSTEM, and PDB Admin. The password must be at least nine characters and contain at least two uppercase, two lowercase, two numbers, and two special characters. The special characters must be _, #, or -. */
  adminPassword?: string;
  /** A valid Oracle Database version. For a list of supported versions, use the ListDbVersions operation. */
  dbVersion: string;
  /** The name of the pluggable database. The name must begin with an alphabetic character and can contain a maximum of thirty alphanumeric characters. Special characters are not permitted. Pluggable database should not be same as database name. */
  pdbName?: string;
}

export function dbSystemPropertiesSerializer(item: DbSystemProperties): any {
  return {
    source: item["source"],
    resourceAnchorId: item["resourceAnchorId"],
    networkAnchorId: item["networkAnchorId"],
    clusterName: item["clusterName"],
    displayName: item["displayName"],
    initialDataStorageSizeInGb: item["initialDataStorageSizeInGb"],
    dbSystemOptions: !item["dbSystemOptions"]
      ? item["dbSystemOptions"]
      : dbSystemOptionsSerializer(item["dbSystemOptions"]),
    diskRedundancy: item["diskRedundancy"],
    domain: item["domainV2"],
    hostname: item["hostname"],
    licenseModel: item["licenseModelV2"],
    nodeCount: item["nodeCount"],
    shape: item["shape"],
    sshPublicKeys: item["sshPublicKeys"].map((p: any) => {
      return p;
    }),
    storageVolumePerformanceMode: item["storageVolumePerformanceMode"],
    timeZone: item["timeZone"],
    computeModel: item["computeModel"],
    computeCount: item["computeCount"],
    databaseEdition: item["databaseEdition"],
    adminPassword: item["adminPassword"],
    dbVersion: item["dbVersion"],
    pdbName: item["pdbName"],
  };
}

export function dbSystemPropertiesDeserializer(item: any): DbSystemProperties {
  return {
    source: item["source"],
    provisioningState: item["provisioningState"],
    ociUrl: item["ociUrl"],
    resourceAnchorId: item["resourceAnchorId"],
    networkAnchorId: item["networkAnchorId"],
    clusterName: item["clusterName"],
    displayName: item["displayName"],
    initialDataStorageSizeInGb: item["initialDataStorageSizeInGb"],
    dataStorageSizeInGbs: item["dataStorageSizeInGbs"],
    dbSystemOptions: !item["dbSystemOptions"]
      ? item["dbSystemOptions"]
      : dbSystemOptionsDeserializer(item["dbSystemOptions"]),
    diskRedundancy: item["diskRedundancy"],
    domainV2: item["domain"],
    gridImageOcid: item["gridImageOcid"],
    hostname: item["hostname"],
    ocid: item["ocid"],
    licenseModelV2: item["licenseModel"],
    lifecycleDetails: item["lifecycleDetails"],
    lifecycleState: item["lifecycleState"],
    listenerPort: item["listenerPort"],
    memorySizeInGbs: item["memorySizeInGbs"],
    nodeCount: item["nodeCount"],
    scanDnsName: item["scanDnsName"],
    scanIps: !item["scanIps"]
      ? item["scanIps"]
      : item["scanIps"].map((p: any) => {
          return p;
        }),
    shape: item["shape"],
    sshPublicKeys: item["sshPublicKeys"].map((p: any) => {
      return p;
    }),
    storageVolumePerformanceMode: item["storageVolumePerformanceMode"],
    timeZone: item["timeZone"],
    version: item["version"],
    computeModel: item["computeModel"],
    computeCount: item["computeCount"],
    databaseEdition: item["databaseEdition"],
    adminPassword: item["adminPassword"],
    dbVersion: item["dbVersion"],
    pdbName: item["pdbName"],
  };
}

/** Database edition type enum. */
export enum KnownDbSystemDatabaseEditionType {
  /** Standard edition */
  StandardEdition = "StandardEdition",
  /** Enterprise edition */
  EnterpriseEdition = "EnterpriseEdition",
  /** Enterprise edition high performance */
  EnterpriseEditionHighPerformance = "EnterpriseEditionHighPerformance",
  /** Enterprise edition extreme */
  EnterpriseEditionExtreme = "EnterpriseEditionExtreme",
  /** Enterprise edition developer */
  EnterpriseEditionDeveloper = "EnterpriseEditionDeveloper",
}

/**
 * Database edition type enum. \
 * {@link KnownDbSystemDatabaseEditionType} can be used interchangeably with DbSystemDatabaseEditionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **StandardEdition**: Standard edition \
 * **EnterpriseEdition**: Enterprise edition \
 * **EnterpriseEditionHighPerformance**: Enterprise edition high performance \
 * **EnterpriseEditionExtreme**: Enterprise edition extreme \
 * **EnterpriseEditionDeveloper**: Enterprise edition developer
 */
export type DbSystemDatabaseEditionType = string;

/** DbSystem resource base model. */
export interface DbSystemBaseProperties {
  /** The source of the database: Use `None` for creating a new database. The default is `None`. */
  /** The discriminator possible values: None */
  source?: DbSystemSourceType;
  /** dbSystem provisioning state */
  readonly provisioningState?: AzureResourceProvisioningState;
  /** HTTPS link to OCI resources exposed to Azure Customer via Azure Interface. */
  readonly ociUrl?: string;
  /** Azure Resource Anchor ID */
  resourceAnchorId: string;
  /** Azure Network Anchor ID */
  networkAnchorId: string;
  /** The cluster name for Exadata and 2-node RAC virtual machine DB systems. The cluster name must begin with an alphabetic character, and may contain hyphens (-). Underscores (_) are not permitted. The cluster name can be no longer than 11 characters and is not case sensitive. */
  clusterName?: string;
  /** The user-friendly name for the DB system. The name does not have to be unique. */
  displayName?: string;
  /** Size in GB of the initial data volume that will be created and attached to a virtual machine DB system. You can scale up storage after provisioning, as needed. Note that the total storage size attached will be more than the amount you specify to allow for REDO/RECO space and software volume. */
  initialDataStorageSizeInGb?: number;
  /** The data storage size, in gigabytes, that is currently available to the DB system. Applies only for virtual machine DB systems. */
  readonly dataStorageSizeInGbs?: number;
  /** The DB system options. */
  dbSystemOptions?: DbSystemOptions;
  /** The type of redundancy configured for the DB system. NORMAL is 2-way redundancy. HIGH is 3-way redundancy. */
  diskRedundancy?: DiskRedundancyType;
  /** The domain name for the DB system. */
  domainV2?: string;
  /** The OCID of a grid infrastructure software image. This is a database software image of the type GRID_IMAGE. */
  readonly gridImageOcid?: string;
  /** The hostname for the DB system. */
  hostname: string;
  /** The OCID of the DB system. */
  readonly ocid?: string;
  /** The Oracle license model that applies to all the databases on the DB system. The default is LicenseIncluded. */
  licenseModelV2?: LicenseModel;
  /** Additional information about the current lifecycle state. */
  readonly lifecycleDetails?: string;
  /** The current state of the DB system. */
  readonly lifecycleState?: DbSystemLifecycleState;
  /** The port number configured for the listener on the DB system. */
  readonly listenerPort?: number;
  /** Memory allocated to the DB system, in gigabytes. */
  readonly memorySizeInGbs?: number;
  /** The number of nodes in the DB system. For RAC DB systems, the value is greater than 1. */
  nodeCount?: number;
  /** The FQDN of the DNS record for the SCAN IP addresses that are associated with the DB system. */
  readonly scanDnsName?: string;
  /** The list of Single Client Access Name (SCAN) IP addresses associated with the DB system. SCAN IP addresses are typically used for load balancing and are not assigned to any interface. Oracle Clusterware directs the requests to the appropriate nodes in the cluster. Note: For a single-node DB system, this list is empty. */
  readonly scanIps?: string[];
  /** The shape of the DB system. The shape determines resources to allocate to the DB system. For virtual machine shapes, the number of CPU cores and memory. For bare metal and Exadata shapes, the number of CPU cores, storage, and memory. */
  shape: string;
  /** The public key portion of one or more key pairs used for SSH access to the DB system. */
  sshPublicKeys: string[];
  /** The block storage volume performance level. Valid values are Balanced and HighPerformance. See [Block Volume Performance](/Content/Block/Concepts/blockvolumeperformance.htm) for more information. */
  storageVolumePerformanceMode?: StorageVolumePerformanceMode;
  /** The time zone of the DB system, e.g., UTC, to set the timeZone as UTC. */
  timeZone?: string;
  /** The Oracle Database version of the DB system. */
  readonly version?: string;
  /** The compute model for Base Database Service. This is required if using the `computeCount` parameter. If using `cpuCoreCount` then it is an error to specify `computeModel` to a non-null value. The ECPU compute model is the recommended model, and the OCPU compute model is legacy. */
  computeModel?: ComputeModel;
  /** The number of compute servers for the DB system. */
  computeCount?: number;
}

export function dbSystemBasePropertiesSerializer(item: DbSystemBaseProperties): any {
  return {
    source: item["source"],
    resourceAnchorId: item["resourceAnchorId"],
    networkAnchorId: item["networkAnchorId"],
    clusterName: item["clusterName"],
    displayName: item["displayName"],
    initialDataStorageSizeInGb: item["initialDataStorageSizeInGb"],
    dbSystemOptions: !item["dbSystemOptions"]
      ? item["dbSystemOptions"]
      : dbSystemOptionsSerializer(item["dbSystemOptions"]),
    diskRedundancy: item["diskRedundancy"],
    domain: item["domainV2"],
    hostname: item["hostname"],
    licenseModel: item["licenseModelV2"],
    nodeCount: item["nodeCount"],
    shape: item["shape"],
    sshPublicKeys: item["sshPublicKeys"].map((p: any) => {
      return p;
    }),
    storageVolumePerformanceMode: item["storageVolumePerformanceMode"],
    timeZone: item["timeZone"],
    computeModel: item["computeModel"],
    computeCount: item["computeCount"],
  };
}

export function dbSystemBasePropertiesDeserializer(item: any): DbSystemBaseProperties {
  return {
    source: item["source"],
    provisioningState: item["provisioningState"],
    ociUrl: item["ociUrl"],
    resourceAnchorId: item["resourceAnchorId"],
    networkAnchorId: item["networkAnchorId"],
    clusterName: item["clusterName"],
    displayName: item["displayName"],
    initialDataStorageSizeInGb: item["initialDataStorageSizeInGb"],
    dataStorageSizeInGbs: item["dataStorageSizeInGbs"],
    dbSystemOptions: !item["dbSystemOptions"]
      ? item["dbSystemOptions"]
      : dbSystemOptionsDeserializer(item["dbSystemOptions"]),
    diskRedundancy: item["diskRedundancy"],
    domainV2: item["domain"],
    gridImageOcid: item["gridImageOcid"],
    hostname: item["hostname"],
    ocid: item["ocid"],
    licenseModelV2: item["licenseModel"],
    lifecycleDetails: item["lifecycleDetails"],
    lifecycleState: item["lifecycleState"],
    listenerPort: item["listenerPort"],
    memorySizeInGbs: item["memorySizeInGbs"],
    nodeCount: item["nodeCount"],
    scanDnsName: item["scanDnsName"],
    scanIps: !item["scanIps"]
      ? item["scanIps"]
      : item["scanIps"].map((p: any) => {
          return p;
        }),
    shape: item["shape"],
    sshPublicKeys: item["sshPublicKeys"].map((p: any) => {
      return p;
    }),
    storageVolumePerformanceMode: item["storageVolumePerformanceMode"],
    timeZone: item["timeZone"],
    version: item["version"],
    computeModel: item["computeModel"],
    computeCount: item["computeCount"],
  };
}

/** Alias for DbSystemBasePropertiesUnion */
export type DbSystemBasePropertiesUnion = DbSystemProperties | DbSystemBaseProperties;

export function dbSystemBasePropertiesUnionSerializer(item: DbSystemBasePropertiesUnion): any {
  switch (item.source) {
    case "None":
      return dbSystemPropertiesSerializer(item as DbSystemProperties);

    default:
      return dbSystemBasePropertiesSerializer(item);
  }
}

export function dbSystemBasePropertiesUnionDeserializer(item: any): DbSystemBasePropertiesUnion {
  switch (item.source) {
    case "None":
      return dbSystemPropertiesDeserializer(item as DbSystemProperties);

    default:
      return dbSystemBasePropertiesDeserializer(item);
  }
}

/** The DbSystem source type of the database. */
export enum KnownDbSystemSourceType {
  /** for creating a new database. */
  None = "None",
}

/**
 * The DbSystem source type of the database. \
 * {@link KnownDbSystemSourceType} can be used interchangeably with DbSystemSourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: for creating a new database.
 */
export type DbSystemSourceType = string;

/** DbSystemOptions resource properties. */
export interface DbSystemOptions {
  /** The storage option used in DB system. ASM - Automatic storage management, LVM - Logical Volume management. */
  storageManagement?: StorageManagementType;
}

export function dbSystemOptionsSerializer(item: DbSystemOptions): any {
  return { storageManagement: item["storageManagement"] };
}

export function dbSystemOptionsDeserializer(item: any): DbSystemOptions {
  return {
    storageManagement: item["storageManagement"],
  };
}

/** Storage Management type enum. */
export enum KnownStorageManagementType {
  /** Logical Volume management */
  LVM = "LVM",
}

/**
 * Storage Management type enum. \
 * {@link KnownStorageManagementType} can be used interchangeably with StorageManagementType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LVM**: Logical Volume management
 */
export type StorageManagementType = string;

/** Disk redundancy type enum. */
export enum KnownDiskRedundancyType {
  /** 3-way redundancy. */
  High = "High",
  /** 2-way redundancy. */
  Normal = "Normal",
}

/**
 * Disk redundancy type enum. \
 * {@link KnownDiskRedundancyType} can be used interchangeably with DiskRedundancyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **High**: 3-way redundancy. \
 * **Normal**: 2-way redundancy.
 */
export type DiskRedundancyType = string;

/** DB System lifecycle state enum */
export enum KnownDbSystemLifecycleState {
  /** Indicates that resource in Provisioning state */
  Provisioning = "Provisioning",
  /** Indicates that resource in Available state */
  Available = "Available",
  /** Indicates that resource in Updating state */
  Updating = "Updating",
  /** Indicates that resource in Terminating state */
  Terminating = "Terminating",
  /** Indicates that resource in Terminated state */
  Terminated = "Terminated",
  /** Indicates that resource in Failed state */
  Failed = "Failed",
  /** Indicates that resource is Migrated state */
  Migrated = "Migrated",
  /** Indicates that resource maintenance in progress state */
  MaintenanceInProgress = "MaintenanceInProgress",
  /** Indicates that resource needs attention state */
  NeedsAttention = "NeedsAttention",
  /** Indicates that resource in Upgrading state */
  Upgrading = "Upgrading",
}

/**
 * DB System lifecycle state enum \
 * {@link KnownDbSystemLifecycleState} can be used interchangeably with DbSystemLifecycleState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Provisioning**: Indicates that resource in Provisioning state \
 * **Available**: Indicates that resource in Available state \
 * **Updating**: Indicates that resource in Updating state \
 * **Terminating**: Indicates that resource in Terminating state \
 * **Terminated**: Indicates that resource in Terminated state \
 * **Failed**: Indicates that resource in Failed state \
 * **Migrated**: Indicates that resource is Migrated state \
 * **MaintenanceInProgress**: Indicates that resource maintenance in progress state \
 * **NeedsAttention**: Indicates that resource needs attention state \
 * **Upgrading**: Indicates that resource in Upgrading state
 */
export type DbSystemLifecycleState = string;

/** Storage volume performance mode. */
export enum KnownStorageVolumePerformanceMode {
  /** With this option, you are purchasing 10 VPUs per GB/month. For more information, including specific throughput and IOPS performance numbers for various volume sizes. */
  Balanced = "Balanced",
  /** With this option, you are purchasing 20 VPUs per GB/month. For more information, including specific throughput and IOPS performance numbers for various volume sizes. */
  HighPerformance = "HighPerformance",
}

/**
 * Storage volume performance mode. \
 * {@link KnownStorageVolumePerformanceMode} can be used interchangeably with StorageVolumePerformanceMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Balanced**: With this option, you are purchasing 10 VPUs per GB\/month. For more information, including specific throughput and IOPS performance numbers for various volume sizes. \
 * **HighPerformance**: With this option, you are purchasing 20 VPUs per GB\/month. For more information, including specific throughput and IOPS performance numbers for various volume sizes.
 */
export type StorageVolumePerformanceMode = string;

/** The type used for update operations of the DbSystem. */
export interface DbSystemUpdate {
  /** The availability zones. */
  zones?: string[];
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: DbSystemUpdateProperties;
}

export function dbSystemUpdateSerializer(item: DbSystemUpdate): any {
  return {
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : dbSystemUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the DbSystem. */
export interface DbSystemUpdateProperties {
  /** The source of the database for creating a new database. */
  source?: "None";
}

export function dbSystemUpdatePropertiesSerializer(item: DbSystemUpdateProperties): any {
  return { source: item["source"] };
}

/** Oracle Database DbVersion resource definition */
export interface DbVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DbVersionProperties;
}

export function dbVersionDeserializer(item: any): DbVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dbVersionPropertiesDeserializer(item["properties"]),
  };
}

/** DbVersion resource model */
export interface DbVersionProperties {
  /** A valid Oracle Database version. */
  version: string;
  /** True if this version of the Oracle Database software is the latest version for a release. */
  isLatestForMajorVersion?: boolean;
  /** True if this version of the Oracle Database software is the preview version. */
  isPreviewDbVersion?: boolean;
  /** True if this version of the Oracle Database software is supported for Upgrade. */
  isUpgradeSupported?: boolean;
  /** True if this version of the Oracle Database software supports pluggable databases. */
  supportsPdb?: boolean;
}

export function dbVersionPropertiesDeserializer(item: any): DbVersionProperties {
  return {
    version: item["version"],
    isLatestForMajorVersion: item["isLatestForMajorVersion"],
    isPreviewDbVersion: item["isPreviewDbVersion"],
    isUpgradeSupported: item["isUpgradeSupported"],
    supportsPdb: item["supportsPdb"],
  };
}

/** The response of a DbVersion list operation. */
export interface _DbVersionListResult {
  /** The DbVersion items on this page */
  value: DbVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dbVersionListResultDeserializer(item: any): _DbVersionListResult {
  return {
    value: dbVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dbVersionArrayDeserializer(result: Array<DbVersion>): any[] {
  return result.map((item) => {
    return dbVersionDeserializer(item);
  });
}

/** Allowed values for System Shapes */
export enum KnownSystemShapes {
  /** Exadata X9M shape */
  ExadataX9M = "Exadata.X9M",
  /** Exadata X11M shape */
  ExadataX11M = "Exadata.X11M",
  /** Exadata DB on Exascale Infrastructure shape */
  ExaDbXs = "ExaDbXS",
}

/**
 * Allowed values for System Shapes \
 * {@link KnownSystemShapes} can be used interchangeably with SystemShapes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Exadata.X9M**: Exadata X9M shape \
 * **Exadata.X11M**: Exadata X11M shape \
 * **ExaDbXS**: Exadata DB on Exascale Infrastructure shape
 */
export type SystemShapes = string;

/** Allowed values for GI Minor Versions shapeFamily filter */
export enum KnownShapeFamily {
  /** Family value for Exadata Shape */
  Exadata = "EXADATA",
  /** Family value for Exadb XS Shape */
  ExadbXs = "EXADB_XS",
}

/**
 * Allowed values for GI Minor Versions shapeFamily filter \
 * {@link KnownShapeFamily} can be used interchangeably with ShapeFamily,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EXADATA**: Family value for Exadata Shape \
 * **EXADB_XS**: Family value for Exadb XS Shape
 */
export type ShapeFamily = string;

/** Allowed values for BaseDb System Shapes */
export enum KnownBaseDbSystemShapes {
  /** Vm Standard X86 */
  VMStandardX86 = "VM.Standard.x86",
}

/**
 * Allowed values for BaseDb System Shapes \
 * {@link KnownBaseDbSystemShapes} can be used interchangeably with BaseDbSystemShapes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VM.Standard.x86**: Vm Standard X86
 */
export type BaseDbSystemShapes = string;

/** Allowed values for shape family. */
export enum KnownShapeFamilyType {
  /** Family value for Exadata Shape */
  Exadata = "EXADATA",
  /** Family value for Exadb XS Shape */
  ExadbXs = "EXADB_XS",
  /** Family value for Single Node Shape */
  SingleNode = "SINGLENODE",
  /** Family value for Virtual Machine Shape */
  VirtualMachine = "VIRTUALMACHINE",
}

/**
 * Allowed values for shape family. \
 * {@link KnownShapeFamilyType} can be used interchangeably with ShapeFamilyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EXADATA**: Family value for Exadata Shape \
 * **EXADB_XS**: Family value for Exadb XS Shape \
 * **SINGLENODE**: Family value for Single Node Shape \
 * **VIRTUALMACHINE**: Family value for Virtual Machine Shape
 */
export type ShapeFamilyType = string;

/** Versions for API */
export enum KnownVersions {
  /** 2023-09-01 */
  V20230901 = "2023-09-01",
  /** 2024-06-01 */
  V20240601 = "2024-06-01",
  /** 2025-03-01 */
  V20250301 = "2025-03-01",
  /** 2025-09-01 */
  V20250901 = "2025-09-01",
}

export function privateIpAddressPropertiesArrayDeserializer(
  result: Array<PrivateIpAddressProperties>,
): any[] {
  return result.map((item) => {
    return privateIpAddressPropertiesDeserializer(item);
  });
}
