// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Graphical Runbook Content */
export interface GraphicalRunbookContent {
  /** Raw graphical Runbook content. */
  rawContent?: RawGraphicalRunbookContent;
  /** Graphical Runbook content as JSON */
  graphRunbookJson?: string;
}

export function graphicalRunbookContentSerializer(item: GraphicalRunbookContent): any {
  return {
    rawContent: !item["rawContent"]
      ? item["rawContent"]
      : rawGraphicalRunbookContentSerializer(item["rawContent"]),
    graphRunbookJson: item["graphRunbookJson"],
  };
}

export function graphicalRunbookContentDeserializer(item: any): GraphicalRunbookContent {
  return {
    rawContent: !item["rawContent"]
      ? item["rawContent"]
      : rawGraphicalRunbookContentDeserializer(item["rawContent"]),
    graphRunbookJson: item["graphRunbookJson"],
  };
}

/** Raw Graphical Runbook content */
export interface RawGraphicalRunbookContent {
  /** Schema version of the serializer. */
  schemaVersion?: string;
  /** Serialized Graphical runbook */
  runbookDefinition?: string;
  /** Runbook Type */
  runbookType?: GraphRunbookType;
}

export function rawGraphicalRunbookContentSerializer(item: RawGraphicalRunbookContent): any {
  return {
    schemaVersion: item["schemaVersion"],
    runbookDefinition: item["runbookDefinition"],
    runbookType: item["runbookType"],
  };
}

export function rawGraphicalRunbookContentDeserializer(item: any): RawGraphicalRunbookContent {
  return {
    schemaVersion: item["schemaVersion"],
    runbookDefinition: item["runbookDefinition"],
    runbookType: item["runbookType"],
  };
}

/** Runbook Type */
export enum KnownGraphRunbookType {
  /** GraphPowerShell */
  GraphPowerShell = "GraphPowerShell",
  /** GraphPowerShellWorkflow */
  GraphPowerShellWorkflow = "GraphPowerShellWorkflow",
}

/**
 * Runbook Type \
 * {@link KnownGraphRunbookType} can be used interchangeably with GraphRunbookType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GraphPowerShell**: GraphPowerShell \
 * **GraphPowerShellWorkflow**: GraphPowerShellWorkflow
 */
export type GraphRunbookType = string;

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

/** The response model for the list of Automation operations */
export interface _OperationListResult {
  /** List of Automation operations supported by the Automation resource provider. */
  value: Operation[];
  /** The URL to get the next set of results, if any. */
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

/** Automation REST API operation */
export interface Operation {
  /** Operation name: {provider}/{resource}/{operation} */
  name?: string;
  /** Provider, Resource and Operation values */
  display?: OperationDisplay;
  /** Origin of the operation. */
  origin?: string;
  /** Specification of the service. */
  serviceSpecification?: OperationPropertiesFormatServiceSpecification;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    ...(!item["properties"]
      ? item["properties"]
      : _operationPropertiesDeserializer(item["properties"])),
  };
}

/** Provider, Resource and Operation values */
export interface OperationDisplay {
  /** Service provider: Microsoft.Automation */
  provider?: string;
  /** Resource on which the operation is performed: Runbooks, Jobs etc. */
  resource?: string;
  /** Operation type: Read, write, delete, etc. */
  operation?: string;
  /** Description of the operation. */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Description of operation properties format. */
export interface OperationPropertiesFormat {
  /** Specification of the service. */
  serviceSpecification?: OperationPropertiesFormatServiceSpecification;
}

export function operationPropertiesFormatDeserializer(item: any): OperationPropertiesFormat {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : operationPropertiesFormatServiceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** Specification of the service. */
export interface OperationPropertiesFormatServiceSpecification {
  /** Operation service specification. */
  metricSpecifications?: MetricSpecification[];
  /** Operation log specification. */
  logSpecifications?: LogSpecification[];
}

export function operationPropertiesFormatServiceSpecificationDeserializer(
  item: any,
): OperationPropertiesFormatServiceSpecification {
  return {
    metricSpecifications: !item["metricSpecifications"]
      ? item["metricSpecifications"]
      : metricSpecificationArrayDeserializer(item["metricSpecifications"]),
    logSpecifications: !item["logSpecifications"]
      ? item["logSpecifications"]
      : logSpecificationArrayDeserializer(item["logSpecifications"]),
  };
}

export function metricSpecificationArrayDeserializer(result: Array<MetricSpecification>): any[] {
  return result.map((item) => {
    return metricSpecificationDeserializer(item);
  });
}

/** Description of metrics specification. */
export interface MetricSpecification {
  /** The name of the metric. */
  name?: string;
  /** The display name of the metric. */
  displayName?: string;
  /** The description of the metric. */
  displayDescription?: string;
  /** Units the metric to be displayed in. */
  unit?: string;
  /** The aggregation type. */
  aggregationType?: string;
  /** List of dimensions. */
  dimensions?: Dimension[];
}

export function metricSpecificationDeserializer(item: any): MetricSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    displayDescription: item["displayDescription"],
    unit: item["unit"],
    aggregationType: item["aggregationType"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : dimensionArrayDeserializer(item["dimensions"]),
  };
}

export function dimensionArrayDeserializer(result: Array<Dimension>): any[] {
  return result.map((item) => {
    return dimensionDeserializer(item);
  });
}

/** Dimension of the metric. */
export interface Dimension {
  /** The name of the dimension. */
  name?: string;
  /** The display name of the dimension. */
  displayName?: string;
}

export function dimensionDeserializer(item: any): Dimension {
  return {
    name: item["name"],
    displayName: item["displayName"],
  };
}

export function logSpecificationArrayDeserializer(result: Array<LogSpecification>): any[] {
  return result.map((item) => {
    return logSpecificationDeserializer(item);
  });
}

/** Description of logging specification. */
export interface LogSpecification {
  /** The name of the specification. */
  name?: string;
  /** The display name of the specification. */
  displayName?: string;
  /** Duration of the blob. */
  blobDuration?: string;
}

export function logSpecificationDeserializer(item: any): LogSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    blobDuration: item["blobDuration"],
  };
}

/** Software update configuration properties. */
export interface SoftwareUpdateConfiguration extends ProxyResource {
  /** update specific properties for the Software update configuration */
  updateConfiguration: UpdateConfiguration;
  /** Schedule information for the Software update configuration */
  scheduleInfo: SUCScheduleProperties;
  /** Provisioning state for the software update configuration, which only appears in the response. */
  readonly provisioningState?: string;
  /** Details of provisioning error */
  error?: AutomationErrorResponse;
  /** Creation time of the resource, which only appears in the response. */
  readonly creationTime?: Date;
  /** CreatedBy property, which only appears in the response. */
  readonly createdBy?: string;
  /** Last time resource was modified, which only appears in the response. */
  readonly lastModifiedTime?: Date;
  /** LastModifiedBy property, which only appears in the response. */
  readonly lastModifiedBy?: string;
  /** Tasks information for the Software update configuration. */
  tasks?: SoftwareUpdateConfigurationTasks;
}

export function softwareUpdateConfigurationSerializer(item: SoftwareUpdateConfiguration): any {
  return { properties: _softwareUpdateConfigurationPropertiesSerializer(item) };
}

export function softwareUpdateConfigurationDeserializer(item: any): SoftwareUpdateConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._softwareUpdateConfigurationPropertiesDeserializer(item["properties"]),
  };
}

/** Software update configuration properties. */
export interface SoftwareUpdateConfigurationProperties {
  /** update specific properties for the Software update configuration */
  updateConfiguration: UpdateConfiguration;
  /** Schedule information for the Software update configuration */
  scheduleInfo: SUCScheduleProperties;
  /** Provisioning state for the software update configuration, which only appears in the response. */
  readonly provisioningState?: string;
  /** Details of provisioning error */
  error?: AutomationErrorResponse;
  /** Creation time of the resource, which only appears in the response. */
  readonly creationTime?: Date;
  /** CreatedBy property, which only appears in the response. */
  readonly createdBy?: string;
  /** Last time resource was modified, which only appears in the response. */
  readonly lastModifiedTime?: Date;
  /** LastModifiedBy property, which only appears in the response. */
  readonly lastModifiedBy?: string;
  /** Tasks information for the Software update configuration. */
  tasks?: SoftwareUpdateConfigurationTasks;
}

export function softwareUpdateConfigurationPropertiesSerializer(
  item: SoftwareUpdateConfigurationProperties,
): any {
  return {
    updateConfiguration: updateConfigurationSerializer(item["updateConfiguration"]),
    scheduleInfo: sucSchedulePropertiesSerializer(item["scheduleInfo"]),
    error: !item["error"] ? item["error"] : automationErrorResponseSerializer(item["error"]),
    tasks: !item["tasks"]
      ? item["tasks"]
      : softwareUpdateConfigurationTasksSerializer(item["tasks"]),
  };
}

export function softwareUpdateConfigurationPropertiesDeserializer(
  item: any,
): SoftwareUpdateConfigurationProperties {
  return {
    updateConfiguration: updateConfigurationDeserializer(item["updateConfiguration"]),
    scheduleInfo: sucSchedulePropertiesDeserializer(item["scheduleInfo"]),
    provisioningState: item["provisioningState"],
    error: !item["error"] ? item["error"] : automationErrorResponseDeserializer(item["error"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    createdBy: item["createdBy"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    lastModifiedBy: item["lastModifiedBy"],
    tasks: !item["tasks"]
      ? item["tasks"]
      : softwareUpdateConfigurationTasksDeserializer(item["tasks"]),
  };
}

/** Update specific properties of the software update configuration. */
export interface UpdateConfiguration {
  /** operating system of target machines */
  operatingSystem: OperatingSystemType;
  /** Windows specific update configuration. */
  windows?: WindowsProperties;
  /** Linux specific update configuration. */
  linux?: LinuxProperties;
  /** Maximum time allowed for the software update configuration run. Duration needs to be specified using the format PT[n]H[n]M[n]S as per ISO8601 */
  duration?: string;
  /** List of azure resource Ids for azure virtual machines targeted by the software update configuration. */
  azureVirtualMachines?: string[];
  /** List of names of non-azure machines targeted by the software update configuration. */
  nonAzureComputerNames?: string[];
  /** Group targets for the software update configuration. */
  targets?: TargetProperties;
}

export function updateConfigurationSerializer(item: UpdateConfiguration): any {
  return {
    operatingSystem: item["operatingSystem"],
    windows: !item["windows"] ? item["windows"] : windowsPropertiesSerializer(item["windows"]),
    linux: !item["linux"] ? item["linux"] : linuxPropertiesSerializer(item["linux"]),
    duration: item["duration"],
    azureVirtualMachines: !item["azureVirtualMachines"]
      ? item["azureVirtualMachines"]
      : item["azureVirtualMachines"].map((p: any) => {
          return p;
        }),
    nonAzureComputerNames: !item["nonAzureComputerNames"]
      ? item["nonAzureComputerNames"]
      : item["nonAzureComputerNames"].map((p: any) => {
          return p;
        }),
    targets: !item["targets"] ? item["targets"] : targetPropertiesSerializer(item["targets"]),
  };
}

export function updateConfigurationDeserializer(item: any): UpdateConfiguration {
  return {
    operatingSystem: item["operatingSystem"],
    windows: !item["windows"] ? item["windows"] : windowsPropertiesDeserializer(item["windows"]),
    linux: !item["linux"] ? item["linux"] : linuxPropertiesDeserializer(item["linux"]),
    duration: item["duration"],
    azureVirtualMachines: !item["azureVirtualMachines"]
      ? item["azureVirtualMachines"]
      : item["azureVirtualMachines"].map((p: any) => {
          return p;
        }),
    nonAzureComputerNames: !item["nonAzureComputerNames"]
      ? item["nonAzureComputerNames"]
      : item["nonAzureComputerNames"].map((p: any) => {
          return p;
        }),
    targets: !item["targets"] ? item["targets"] : targetPropertiesDeserializer(item["targets"]),
  };
}

/** Target operating system for the software update configuration. */
export type OperatingSystemType = "Windows" | "Linux";

/** Windows specific update configuration. */
export interface WindowsProperties {
  /** Update classification included in the software update configuration. A comma separated string with required values */
  includedUpdateClassifications?: WindowsUpdateClasses;
  /** KB numbers excluded from the software update configuration. */
  excludedKbNumbers?: string[];
  /** KB numbers included from the software update configuration. */
  includedKbNumbers?: string[];
  /** Reboot setting for the software update configuration. */
  rebootSetting?: string;
}

export function windowsPropertiesSerializer(item: WindowsProperties): any {
  return {
    includedUpdateClassifications: item["includedUpdateClassifications"],
    excludedKbNumbers: !item["excludedKbNumbers"]
      ? item["excludedKbNumbers"]
      : item["excludedKbNumbers"].map((p: any) => {
          return p;
        }),
    includedKbNumbers: !item["includedKbNumbers"]
      ? item["includedKbNumbers"]
      : item["includedKbNumbers"].map((p: any) => {
          return p;
        }),
    rebootSetting: item["rebootSetting"],
  };
}

export function windowsPropertiesDeserializer(item: any): WindowsProperties {
  return {
    includedUpdateClassifications: item["includedUpdateClassifications"],
    excludedKbNumbers: !item["excludedKbNumbers"]
      ? item["excludedKbNumbers"]
      : item["excludedKbNumbers"].map((p: any) => {
          return p;
        }),
    includedKbNumbers: !item["includedKbNumbers"]
      ? item["includedKbNumbers"]
      : item["includedKbNumbers"].map((p: any) => {
          return p;
        }),
    rebootSetting: item["rebootSetting"],
  };
}

/** Update classification included in the software update configuration. A comma separated string with required values */
export enum KnownWindowsUpdateClasses {
  /** Unclassified */
  Unclassified = "Unclassified",
  /** Critical */
  Critical = "Critical",
  /** Security */
  Security = "Security",
  /** UpdateRollup */
  UpdateRollup = "UpdateRollup",
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

/**
 * Update classification included in the software update configuration. A comma separated string with required values \
 * {@link KnownWindowsUpdateClasses} can be used interchangeably with WindowsUpdateClasses,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unclassified**: Unclassified \
 * **Critical**: Critical \
 * **Security**: Security \
 * **UpdateRollup**: UpdateRollup \
 * **FeaturePack**: FeaturePack \
 * **ServicePack**: ServicePack \
 * **Definition**: Definition \
 * **Tools**: Tools \
 * **Updates**: Updates
 */
export type WindowsUpdateClasses = string;

/** Linux specific update configuration. */
export interface LinuxProperties {
  /** Update classifications included in the software update configuration. */
  includedPackageClassifications?: LinuxUpdateClasses;
  /** packages excluded from the software update configuration. */
  excludedPackageNameMasks?: string[];
  /** packages included from the software update configuration. */
  includedPackageNameMasks?: string[];
  /** Reboot setting for the software update configuration. */
  rebootSetting?: string;
}

export function linuxPropertiesSerializer(item: LinuxProperties): any {
  return {
    includedPackageClassifications: item["includedPackageClassifications"],
    excludedPackageNameMasks: !item["excludedPackageNameMasks"]
      ? item["excludedPackageNameMasks"]
      : item["excludedPackageNameMasks"].map((p: any) => {
          return p;
        }),
    includedPackageNameMasks: !item["includedPackageNameMasks"]
      ? item["includedPackageNameMasks"]
      : item["includedPackageNameMasks"].map((p: any) => {
          return p;
        }),
    rebootSetting: item["rebootSetting"],
  };
}

export function linuxPropertiesDeserializer(item: any): LinuxProperties {
  return {
    includedPackageClassifications: item["includedPackageClassifications"],
    excludedPackageNameMasks: !item["excludedPackageNameMasks"]
      ? item["excludedPackageNameMasks"]
      : item["excludedPackageNameMasks"].map((p: any) => {
          return p;
        }),
    includedPackageNameMasks: !item["includedPackageNameMasks"]
      ? item["includedPackageNameMasks"]
      : item["includedPackageNameMasks"].map((p: any) => {
          return p;
        }),
    rebootSetting: item["rebootSetting"],
  };
}

/** Update classifications included in the software update configuration. */
export enum KnownLinuxUpdateClasses {
  /** Unclassified */
  Unclassified = "Unclassified",
  /** Critical */
  Critical = "Critical",
  /** Security */
  Security = "Security",
  /** Other */
  Other = "Other",
}

/**
 * Update classifications included in the software update configuration. \
 * {@link KnownLinuxUpdateClasses} can be used interchangeably with LinuxUpdateClasses,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unclassified**: Unclassified \
 * **Critical**: Critical \
 * **Security**: Security \
 * **Other**: Other
 */
export type LinuxUpdateClasses = string;

/** Group specific to the update configuration. */
export interface TargetProperties {
  /** List of Azure queries in the software update configuration. */
  azureQueries?: AzureQueryProperties[];
  /** List of non Azure queries in the software update configuration. */
  nonAzureQueries?: NonAzureQueryProperties[];
}

export function targetPropertiesSerializer(item: TargetProperties): any {
  return {
    azureQueries: !item["azureQueries"]
      ? item["azureQueries"]
      : azureQueryPropertiesArraySerializer(item["azureQueries"]),
    nonAzureQueries: !item["nonAzureQueries"]
      ? item["nonAzureQueries"]
      : nonAzureQueryPropertiesArraySerializer(item["nonAzureQueries"]),
  };
}

export function targetPropertiesDeserializer(item: any): TargetProperties {
  return {
    azureQueries: !item["azureQueries"]
      ? item["azureQueries"]
      : azureQueryPropertiesArrayDeserializer(item["azureQueries"]),
    nonAzureQueries: !item["nonAzureQueries"]
      ? item["nonAzureQueries"]
      : nonAzureQueryPropertiesArrayDeserializer(item["nonAzureQueries"]),
  };
}

export function azureQueryPropertiesArraySerializer(result: Array<AzureQueryProperties>): any[] {
  return result.map((item) => {
    return azureQueryPropertiesSerializer(item);
  });
}

export function azureQueryPropertiesArrayDeserializer(result: Array<AzureQueryProperties>): any[] {
  return result.map((item) => {
    return azureQueryPropertiesDeserializer(item);
  });
}

/** Azure query for the update configuration. */
export interface AzureQueryProperties {
  /** List of Subscription or Resource Group ARM Ids. */
  scope?: string[];
  /** List of locations to scope the query to. */
  locations?: string[];
  /** Tag settings for the VM. */
  tagSettings?: TagSettingsProperties;
}

export function azureQueryPropertiesSerializer(item: AzureQueryProperties): any {
  return {
    scope: !item["scope"]
      ? item["scope"]
      : item["scope"].map((p: any) => {
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

export function azureQueryPropertiesDeserializer(item: any): AzureQueryProperties {
  return {
    scope: !item["scope"]
      ? item["scope"]
      : item["scope"].map((p: any) => {
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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k, p]: [string, any]) => [
            k,
            p.map((p1: any) => {
              return p1;
            }),
          ]),
        ),
    filterOperator: item["filterOperator"],
  };
}

/** Filter VMs by Any or All specified tags. */
export type TagOperators = "All" | "Any";

export function nonAzureQueryPropertiesArraySerializer(
  result: Array<NonAzureQueryProperties>,
): any[] {
  return result.map((item) => {
    return nonAzureQueryPropertiesSerializer(item);
  });
}

export function nonAzureQueryPropertiesArrayDeserializer(
  result: Array<NonAzureQueryProperties>,
): any[] {
  return result.map((item) => {
    return nonAzureQueryPropertiesDeserializer(item);
  });
}

/** Non Azure query for the update configuration. */
export interface NonAzureQueryProperties {
  /** Log Analytics Saved Search name. */
  functionAlias?: string;
  /** Workspace Id for Log Analytics in which the saved Search is resided. */
  workspaceId?: string;
}

export function nonAzureQueryPropertiesSerializer(item: NonAzureQueryProperties): any {
  return { functionAlias: item["functionAlias"], workspaceId: item["workspaceId"] };
}

export function nonAzureQueryPropertiesDeserializer(item: any): NonAzureQueryProperties {
  return {
    functionAlias: item["functionAlias"],
    workspaceId: item["workspaceId"],
  };
}

/** Definition of schedule parameters. */
export interface SUCScheduleProperties {
  /** Gets or sets the start time of the schedule. */
  startTime?: Date;
  /** Gets the start time's offset in minutes. */
  readonly startTimeOffsetMinutes?: number;
  /** Gets or sets the end time of the schedule. */
  expiryTime?: Date;
  /** Gets or sets the expiry time's offset in minutes. */
  expiryTimeOffsetMinutes?: number;
  /** Gets or sets a value indicating whether this schedule is enabled. */
  isEnabled?: boolean;
  /** Gets or sets the next run time of the schedule. */
  nextRun?: Date;
  /** Gets or sets the next run time's offset in minutes. */
  nextRunOffsetMinutes?: number;
  /** Gets or sets the interval of the schedule. */
  interval?: number;
  /** Gets or sets the frequency of the schedule. */
  frequency?: ScheduleFrequency;
  /** Gets or sets the time zone of the schedule. */
  timeZone?: string;
  /** Gets or sets the advanced schedule. */
  advancedSchedule?: AdvancedSchedule;
  /** Gets or sets the creation time. */
  creationTime?: Date;
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
}

export function sucSchedulePropertiesSerializer(item: SUCScheduleProperties): any {
  return {
    startTime: !item["startTime"] ? item["startTime"] : item["startTime"].toISOString(),
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    expiryTimeOffsetMinutes: item["expiryTimeOffsetMinutes"],
    isEnabled: item["isEnabled"],
    nextRun: !item["nextRun"] ? item["nextRun"] : item["nextRun"].toISOString(),
    nextRunOffsetMinutes: item["nextRunOffsetMinutes"],
    interval: item["interval"],
    frequency: item["frequency"],
    timeZone: item["timeZone"],
    advancedSchedule: !item["advancedSchedule"]
      ? item["advancedSchedule"]
      : advancedScheduleSerializer(item["advancedSchedule"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : item["creationTime"].toISOString(),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : item["lastModifiedTime"].toISOString(),
    description: item["description"],
  };
}

export function sucSchedulePropertiesDeserializer(item: any): SUCScheduleProperties {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    startTimeOffsetMinutes: item["startTimeOffsetMinutes"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    expiryTimeOffsetMinutes: item["expiryTimeOffsetMinutes"],
    isEnabled: item["isEnabled"],
    nextRun: !item["nextRun"] ? item["nextRun"] : new Date(item["nextRun"]),
    nextRunOffsetMinutes: item["nextRunOffsetMinutes"],
    interval: item["interval"],
    frequency: item["frequency"],
    timeZone: item["timeZone"],
    advancedSchedule: !item["advancedSchedule"]
      ? item["advancedSchedule"]
      : advancedScheduleDeserializer(item["advancedSchedule"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
  };
}

/** Gets or sets the frequency of the schedule. */
export enum KnownScheduleFrequency {
  /** OneTime */
  OneTime = "OneTime",
  /** Day */
  Day = "Day",
  /** Hour */
  Hour = "Hour",
  /** Week */
  Week = "Week",
  /** Month */
  Month = "Month",
  /** The minimum allowed interval for Minute schedules is 15 minutes. */
  Minute = "Minute",
}

/**
 * Gets or sets the frequency of the schedule. \
 * {@link KnownScheduleFrequency} can be used interchangeably with ScheduleFrequency,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OneTime**: OneTime \
 * **Day**: Day \
 * **Hour**: Hour \
 * **Week**: Week \
 * **Month**: Month \
 * **Minute**: The minimum allowed interval for Minute schedules is 15 minutes.
 */
export type ScheduleFrequency = string;

/** The properties of the create Advanced Schedule. */
export interface AdvancedSchedule {
  /** Days of the week that the job should execute on. */
  weekDays?: string[];
  /** Days of the month that the job should execute on. Must be between 1 and 31. */
  monthDays?: number[];
  /** Occurrences of days within a month. */
  monthlyOccurrences?: AdvancedScheduleMonthlyOccurrence[];
}

export function advancedScheduleSerializer(item: AdvancedSchedule): any {
  return {
    weekDays: !item["weekDays"]
      ? item["weekDays"]
      : item["weekDays"].map((p: any) => {
          return p;
        }),
    monthDays: !item["monthDays"]
      ? item["monthDays"]
      : item["monthDays"].map((p: any) => {
          return p;
        }),
    monthlyOccurrences: !item["monthlyOccurrences"]
      ? item["monthlyOccurrences"]
      : advancedScheduleMonthlyOccurrenceArraySerializer(item["monthlyOccurrences"]),
  };
}

export function advancedScheduleDeserializer(item: any): AdvancedSchedule {
  return {
    weekDays: !item["weekDays"]
      ? item["weekDays"]
      : item["weekDays"].map((p: any) => {
          return p;
        }),
    monthDays: !item["monthDays"]
      ? item["monthDays"]
      : item["monthDays"].map((p: any) => {
          return p;
        }),
    monthlyOccurrences: !item["monthlyOccurrences"]
      ? item["monthlyOccurrences"]
      : advancedScheduleMonthlyOccurrenceArrayDeserializer(item["monthlyOccurrences"]),
  };
}

export function advancedScheduleMonthlyOccurrenceArraySerializer(
  result: Array<AdvancedScheduleMonthlyOccurrence>,
): any[] {
  return result.map((item) => {
    return advancedScheduleMonthlyOccurrenceSerializer(item);
  });
}

export function advancedScheduleMonthlyOccurrenceArrayDeserializer(
  result: Array<AdvancedScheduleMonthlyOccurrence>,
): any[] {
  return result.map((item) => {
    return advancedScheduleMonthlyOccurrenceDeserializer(item);
  });
}

/** The properties of the create advanced schedule monthly occurrence. */
export interface AdvancedScheduleMonthlyOccurrence {
  /** Occurrence of the week within the month. Must be between 1 and 5 */
  occurrence?: number;
  /** Day of the occurrence. Must be one of monday, tuesday, wednesday, thursday, friday, saturday, sunday. */
  day?: ScheduleDay;
}

export function advancedScheduleMonthlyOccurrenceSerializer(
  item: AdvancedScheduleMonthlyOccurrence,
): any {
  return { occurrence: item["occurrence"], day: item["day"] };
}

export function advancedScheduleMonthlyOccurrenceDeserializer(
  item: any,
): AdvancedScheduleMonthlyOccurrence {
  return {
    occurrence: item["occurrence"],
    day: item["day"],
  };
}

/** Day of the occurrence. Must be one of monday, tuesday, wednesday, thursday, friday, saturday, sunday. */
export enum KnownScheduleDay {
  /** Monday */
  Monday = "Monday",
  /** Tuesday */
  Tuesday = "Tuesday",
  /** Wednesday */
  Wednesday = "Wednesday",
  /** Thursday */
  Thursday = "Thursday",
  /** Friday */
  Friday = "Friday",
  /** Saturday */
  Saturday = "Saturday",
  /** Sunday */
  Sunday = "Sunday",
}

/**
 * Day of the occurrence. Must be one of monday, tuesday, wednesday, thursday, friday, saturday, sunday. \
 * {@link KnownScheduleDay} can be used interchangeably with ScheduleDay,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Monday**: Monday \
 * **Tuesday**: Tuesday \
 * **Wednesday**: Wednesday \
 * **Thursday**: Thursday \
 * **Friday**: Friday \
 * **Saturday**: Saturday \
 * **Sunday**: Sunday
 */
export type ScheduleDay = string;

/** Error response of an operation failure */
export interface AutomationErrorResponse {
  /** Error code */
  code?: string;
  /** Error message indicating why the operation failed. */
  message?: string;
}

export function automationErrorResponseSerializer(item: AutomationErrorResponse): any {
  return { code: item["code"], message: item["message"] };
}

export function automationErrorResponseDeserializer(item: any): AutomationErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Task properties of the software update configuration. */
export interface SoftwareUpdateConfigurationTasks {
  /** Pre task properties. */
  preTask?: TaskProperties;
  /** Post task properties. */
  postTask?: TaskProperties;
}

export function softwareUpdateConfigurationTasksSerializer(
  item: SoftwareUpdateConfigurationTasks,
): any {
  return {
    preTask: !item["preTask"] ? item["preTask"] : taskPropertiesSerializer(item["preTask"]),
    postTask: !item["postTask"] ? item["postTask"] : taskPropertiesSerializer(item["postTask"]),
  };
}

export function softwareUpdateConfigurationTasksDeserializer(
  item: any,
): SoftwareUpdateConfigurationTasks {
  return {
    preTask: !item["preTask"] ? item["preTask"] : taskPropertiesDeserializer(item["preTask"]),
    postTask: !item["postTask"] ? item["postTask"] : taskPropertiesDeserializer(item["postTask"]),
  };
}

/** Task properties of the software update configuration. */
export interface TaskProperties {
  /** Gets or sets the parameters of the task. */
  parameters?: Record<string, string>;
  /** Gets or sets the name of the runbook. */
  source?: string;
}

export function taskPropertiesSerializer(item: TaskProperties): any {
  return { parameters: item["parameters"], source: item["source"] };
}

export function taskPropertiesDeserializer(item: any): TaskProperties {
  return {
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    source: item["source"],
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

export function systemDataSerializer(item: SystemData): any {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : item["createdAt"].toISOString(),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : item["lastModifiedAt"].toISOString(),
  };
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

/** result of listing all software update configuration */
export interface SoftwareUpdateConfigurationListResult {
  /** outer object returned when listing all software update configurations */
  value?: SoftwareUpdateConfigurationCollectionItem[];
}

export function softwareUpdateConfigurationListResultDeserializer(
  item: any,
): SoftwareUpdateConfigurationListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : softwareUpdateConfigurationCollectionItemArrayDeserializer(item["value"]),
  };
}

export function softwareUpdateConfigurationCollectionItemArrayDeserializer(
  result: Array<SoftwareUpdateConfigurationCollectionItem>,
): any[] {
  return result.map((item) => {
    return softwareUpdateConfigurationCollectionItemDeserializer(item);
  });
}

/** Software update configuration collection item properties. */
export interface SoftwareUpdateConfigurationCollectionItem {
  /** Name of the software update configuration. */
  readonly name?: string;
  /** Resource Id of the software update configuration */
  readonly id?: string;
  /** Update specific properties of the software update configuration. */
  updateConfiguration?: UpdateConfiguration;
  /** Pre and Post Tasks defined */
  tasks?: SoftwareUpdateConfigurationTasks;
  /** execution frequency of the schedule associated with the software update configuration */
  frequency?: ScheduleFrequency;
  /** the start time of the update. */
  startTime?: Date;
  /** Creation time of the software update configuration, which only appears in the response. */
  readonly creationTime?: Date;
  /** Last time software update configuration was modified, which only appears in the response. */
  readonly lastModifiedTime?: Date;
  /** Provisioning state for the software update configuration, which only appears in the response. */
  readonly provisioningState?: string;
  /** ext run time of the update. */
  nextRun?: Date;
}

export function softwareUpdateConfigurationCollectionItemDeserializer(
  item: any,
): SoftwareUpdateConfigurationCollectionItem {
  return {
    name: item["name"],
    id: item["id"],
    ..._softwareUpdateConfigurationCollectionItemPropertiesDeserializer(item["properties"]),
  };
}

/** Software update configuration collection item properties. */
export interface SoftwareUpdateConfigurationCollectionItemProperties {
  /** Update specific properties of the software update configuration. */
  updateConfiguration?: UpdateConfiguration;
  /** Pre and Post Tasks defined */
  tasks?: SoftwareUpdateConfigurationTasks;
  /** execution frequency of the schedule associated with the software update configuration */
  frequency?: ScheduleFrequency;
  /** the start time of the update. */
  startTime?: Date;
  /** Creation time of the software update configuration, which only appears in the response. */
  readonly creationTime?: Date;
  /** Last time software update configuration was modified, which only appears in the response. */
  readonly lastModifiedTime?: Date;
  /** Provisioning state for the software update configuration, which only appears in the response. */
  readonly provisioningState?: string;
  /** ext run time of the update. */
  nextRun?: Date;
}

export function softwareUpdateConfigurationCollectionItemPropertiesDeserializer(
  item: any,
): SoftwareUpdateConfigurationCollectionItemProperties {
  return {
    updateConfiguration: !item["updateConfiguration"]
      ? item["updateConfiguration"]
      : updateConfigurationDeserializer(item["updateConfiguration"]),
    tasks: !item["tasks"]
      ? item["tasks"]
      : softwareUpdateConfigurationTasksDeserializer(item["tasks"]),
    frequency: item["frequency"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    provisioningState: item["provisioningState"],
    nextRun: !item["nextRun"] ? item["nextRun"] : new Date(item["nextRun"]),
  };
}

/** Definition of hybrid runbook worker. */
export interface HybridRunbookWorker extends TrackedResource {
  /** Gets or sets the assigned machine IP address. */
  ip?: string;
  /** Gets or sets the registration time of the worker machine. */
  registeredDateTime?: Date;
  /** Last Heartbeat from the Worker */
  lastSeenDateTime?: Date;
  /** Azure Resource Manager Id for a virtual machine. */
  vmResourceId?: string;
  /** Type of the HybridWorker. */
  workerType?: WorkerType;
  /** Name of the HybridWorker. */
  workerName?: string;
}

export function hybridRunbookWorkerDeserializer(item: any): HybridRunbookWorker {
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
      : _hybridRunbookWorkerPropertiesDeserializer(item["properties"])),
  };
}

/** Definition of hybrid runbook worker property. */
export interface HybridRunbookWorkerProperties {
  /** Gets or sets the assigned machine IP address. */
  ip?: string;
  /** Gets or sets the registration time of the worker machine. */
  registeredDateTime?: Date;
  /** Last Heartbeat from the Worker */
  lastSeenDateTime?: Date;
  /** Azure Resource Manager Id for a virtual machine. */
  vmResourceId?: string;
  /** Type of the HybridWorker. */
  workerType?: WorkerType;
  /** Name of the HybridWorker. */
  workerName?: string;
}

export function hybridRunbookWorkerPropertiesDeserializer(
  item: any,
): HybridRunbookWorkerProperties {
  return {
    ip: item["ip"],
    registeredDateTime: !item["registeredDateTime"]
      ? item["registeredDateTime"]
      : new Date(item["registeredDateTime"]),
    lastSeenDateTime: !item["lastSeenDateTime"]
      ? item["lastSeenDateTime"]
      : new Date(item["lastSeenDateTime"]),
    vmResourceId: item["vmResourceId"],
    workerType: item["workerType"],
    workerName: item["workerName"],
  };
}

/** Type of the HybridWorker. */
export enum KnownWorkerType {
  /** HybridV1 */
  HybridV1 = "HybridV1",
  /** HybridV2 */
  HybridV2 = "HybridV2",
}

/**
 * Type of the HybridWorker. \
 * {@link KnownWorkerType} can be used interchangeably with WorkerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HybridV1**: HybridV1 \
 * **HybridV2**: HybridV2
 */
export type WorkerType = string;

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

/** The parameters supplied to the create hybrid runbook worker operation. */
export interface HybridRunbookWorkerCreateParameters {
  /** Gets or sets the name of the resource. */
  readonly name?: string;
  /** Azure Resource Manager Id for a virtual machine. */
  vmResourceId?: string;
}

export function hybridRunbookWorkerCreateParametersSerializer(
  item: HybridRunbookWorkerCreateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, ["vmResourceId"])
      ? undefined
      : _hybridRunbookWorkerCreateParametersPropertiesSerializer(item),
  };
}

/** The parameters supplied to the create or update hybrid runbook worker operation. */
export interface HybridRunbookWorkerCreateOrUpdateParameters {
  /** Azure Resource Manager Id for a virtual machine. */
  vmResourceId?: string;
}

export function hybridRunbookWorkerCreateOrUpdateParametersSerializer(
  item: HybridRunbookWorkerCreateOrUpdateParameters,
): any {
  return { vmResourceId: item["vmResourceId"] };
}

/** The response of a HybridRunbookWorker list operation. */
export interface _HybridRunbookWorkersListResult {
  /** The HybridRunbookWorker items on this page */
  value: HybridRunbookWorker[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _hybridRunbookWorkersListResultDeserializer(
  item: any,
): _HybridRunbookWorkersListResult {
  return {
    value: hybridRunbookWorkerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function hybridRunbookWorkerArrayDeserializer(result: Array<HybridRunbookWorker>): any[] {
  return result.map((item) => {
    return hybridRunbookWorkerDeserializer(item);
  });
}

/** Parameters supplied to move hybrid worker operation. */
export interface HybridRunbookWorkerMoveParameters {
  /** Gets or sets the target hybrid runbook worker group. */
  hybridRunbookWorkerGroupName?: string;
}

export function hybridRunbookWorkerMoveParametersSerializer(
  item: HybridRunbookWorkerMoveParameters,
): any {
  return { hybridRunbookWorkerGroupName: item["hybridRunbookWorkerGroupName"] };
}

/** Definition of the module type. */
export interface Module extends TrackedResource {
  /** Gets or sets the etag of the resource. */
  etag?: string;
  /** Gets or sets the isGlobal flag of the module. */
  isGlobal?: boolean;
  /** Gets or sets the version of the module. */
  version?: string;
  /** Gets or sets the size in bytes of the module. */
  sizeInBytes?: number;
  /** Gets or sets the activity count of the module. */
  activityCount?: number;
  /** Gets or sets the provisioning state of the module. */
  provisioningState?: ModuleProvisioningState;
  /** Gets or sets the contentLink of the module. */
  contentLink?: ContentLink;
  /** Gets or sets the error info of the module. */
  error?: ModuleErrorInfo;
  /** Gets or sets the creation time. */
  creationTime?: Date;
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
  /** Gets or sets type of module, if its composite or not. */
  isComposite?: boolean;
}

export function moduleDeserializer(item: any): Module {
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
      : _modulePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Definition of the module property type. */
export interface ModuleProperties {
  /** Gets or sets the isGlobal flag of the module. */
  isGlobal?: boolean;
  /** Gets or sets the version of the module. */
  version?: string;
  /** Gets or sets the size in bytes of the module. */
  sizeInBytes?: number;
  /** Gets or sets the activity count of the module. */
  activityCount?: number;
  /** Gets or sets the provisioning state of the module. */
  provisioningState?: ModuleProvisioningState;
  /** Gets or sets the contentLink of the module. */
  contentLink?: ContentLink;
  /** Gets or sets the error info of the module. */
  error?: ModuleErrorInfo;
  /** Gets or sets the creation time. */
  creationTime?: Date;
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
  /** Gets or sets type of module, if its composite or not. */
  isComposite?: boolean;
}

export function modulePropertiesDeserializer(item: any): ModuleProperties {
  return {
    isGlobal: item["isGlobal"],
    version: item["version"],
    sizeInBytes: item["sizeInBytes"],
    activityCount: item["activityCount"],
    provisioningState: item["provisioningState"],
    contentLink: !item["contentLink"]
      ? item["contentLink"]
      : contentLinkDeserializer(item["contentLink"]),
    error: !item["error"] ? item["error"] : moduleErrorInfoDeserializer(item["error"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
    isComposite: item["isComposite"],
  };
}

/** Gets or sets the provisioning state of the module. */
export enum KnownModuleProvisioningState {
  /** Created */
  Created = "Created",
  /** Creating */
  Creating = "Creating",
  /** StartingImportModuleRunbook */
  StartingImportModuleRunbook = "StartingImportModuleRunbook",
  /** RunningImportModuleRunbook */
  RunningImportModuleRunbook = "RunningImportModuleRunbook",
  /** ContentRetrieved */
  ContentRetrieved = "ContentRetrieved",
  /** ContentDownloaded */
  ContentDownloaded = "ContentDownloaded",
  /** ContentValidated */
  ContentValidated = "ContentValidated",
  /** ConnectionTypeImported */
  ConnectionTypeImported = "ConnectionTypeImported",
  /** ContentStored */
  ContentStored = "ContentStored",
  /** ModuleDataStored */
  ModuleDataStored = "ModuleDataStored",
  /** ActivitiesStored */
  ActivitiesStored = "ActivitiesStored",
  /** ModuleImportRunbookComplete */
  ModuleImportRunbookComplete = "ModuleImportRunbookComplete",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Updating */
  Updating = "Updating",
}

/**
 * Gets or sets the provisioning state of the module. \
 * {@link KnownModuleProvisioningState} can be used interchangeably with ModuleProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Created**: Created \
 * **Creating**: Creating \
 * **StartingImportModuleRunbook**: StartingImportModuleRunbook \
 * **RunningImportModuleRunbook**: RunningImportModuleRunbook \
 * **ContentRetrieved**: ContentRetrieved \
 * **ContentDownloaded**: ContentDownloaded \
 * **ContentValidated**: ContentValidated \
 * **ConnectionTypeImported**: ConnectionTypeImported \
 * **ContentStored**: ContentStored \
 * **ModuleDataStored**: ModuleDataStored \
 * **ActivitiesStored**: ActivitiesStored \
 * **ModuleImportRunbookComplete**: ModuleImportRunbookComplete \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Updating**: Updating
 */
export type ModuleProvisioningState = string;

/** Definition of the content link. */
export interface ContentLink {
  /** Gets or sets the uri of content. */
  uri?: string;
  /** Gets or sets the hash. */
  contentHash?: ContentHash;
  /** Gets or sets the version of the content. */
  version?: string;
}

export function contentLinkSerializer(item: ContentLink): any {
  return {
    uri: item["uri"],
    contentHash: !item["contentHash"]
      ? item["contentHash"]
      : contentHashSerializer(item["contentHash"]),
    version: item["version"],
  };
}

export function contentLinkDeserializer(item: any): ContentLink {
  return {
    uri: item["uri"],
    contentHash: !item["contentHash"]
      ? item["contentHash"]
      : contentHashDeserializer(item["contentHash"]),
    version: item["version"],
  };
}

/** Definition of the runbook property type. */
export interface ContentHash {
  /** Gets or sets the content hash algorithm used to hash the content. */
  algorithm: string;
  /** Gets or sets expected hash value of the content. */
  value: string;
}

export function contentHashSerializer(item: ContentHash): any {
  return { algorithm: item["algorithm"], value: item["value"] };
}

export function contentHashDeserializer(item: any): ContentHash {
  return {
    algorithm: item["algorithm"],
    value: item["value"],
  };
}

/** Definition of the module error info type. */
export interface ModuleErrorInfo {
  /** Gets or sets the error code. */
  code?: string;
  /** Gets or sets the error message. */
  message?: string;
}

export function moduleErrorInfoDeserializer(item: any): ModuleErrorInfo {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The parameters supplied to the create or update module operation. */
export interface PythonPackageCreateParameters {
  /** Gets or sets the tags attached to the resource. */
  tags?: Record<string, string>;
  /** Gets or sets the module content link. */
  contentLink: ContentLink;
}

export function pythonPackageCreateParametersSerializer(item: PythonPackageCreateParameters): any {
  return {
    properties: _pythonPackageCreateParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** The parameters supplied to the create or update module properties. */
export interface PythonPackageCreateProperties {
  /** Gets or sets the module content link. */
  contentLink: ContentLink;
}

export function pythonPackageCreatePropertiesSerializer(item: PythonPackageCreateProperties): any {
  return { contentLink: contentLinkSerializer(item["contentLink"]) };
}

/** The parameters supplied to the update module operation. */
export interface PythonPackageUpdateParameters {
  /** Gets or sets the tags attached to the resource. */
  tags?: Record<string, string>;
}

export function pythonPackageUpdateParametersSerializer(item: PythonPackageUpdateParameters): any {
  return { tags: item["tags"] };
}

/** The response of a Module list operation. */
export interface _ModuleListResult {
  /** The Module items on this page */
  value: Module[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _moduleListResultDeserializer(item: any): _ModuleListResult {
  return {
    value: moduleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function moduleArrayDeserializer(result: Array<Module>): any[] {
  return result.map((item) => {
    return moduleDeserializer(item);
  });
}

/** Definition of the Runtime Environment type. */
export interface RuntimeEnvironment extends TrackedResource {
  /** Runtime properties. */
  runtime?: RuntimeProperties;
  /** List of Default packages for Environment */
  defaultPackages?: Record<string, string>;
  /** Gets or sets the description. */
  description?: string;
}

export function runtimeEnvironmentSerializer(item: RuntimeEnvironment): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["runtime", "defaultPackages", "description"])
      ? undefined
      : _runtimeEnvironmentPropertiesSerializer(item),
  };
}

export function runtimeEnvironmentDeserializer(item: any): RuntimeEnvironment {
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
      : _runtimeEnvironmentPropertiesDeserializer(item["properties"])),
  };
}

/** Runtime Environment properties. */
export interface RuntimeEnvironmentProperties {
  /** List of Default packages for Environment */
  defaultPackages?: Record<string, string>;
  /** Gets or sets the description. */
  description?: string;
  /** Language of Runtime Environment */
  language?: string;
  /** Version of Language */
  version?: string;
}

export function runtimeEnvironmentPropertiesSerializer(item: RuntimeEnvironmentProperties): any {
  return {
    runtime: areAllPropsUndefined(item, ["language", "version"])
      ? undefined
      : _runtimeEnvironmentPropertiesRuntimeSerializer(item),
    defaultPackages: item["defaultPackages"],
    description: item["description"],
  };
}

export function runtimeEnvironmentPropertiesDeserializer(item: any): RuntimeEnvironmentProperties {
  return {
    ...(!item["runtime"]
      ? item["runtime"]
      : _runtimeEnvironmentPropertiesRuntimeDeserializer(item["runtime"])),
    defaultPackages: !item["defaultPackages"]
      ? item["defaultPackages"]
      : Object.fromEntries(
          Object.entries(item["defaultPackages"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    description: item["description"],
  };
}

/** Runtime properties. */
export interface RuntimeProperties {
  /** Language of Runtime Environment */
  language?: string;
  /** Version of Language */
  version?: string;
}

export function runtimePropertiesSerializer(item: RuntimeProperties): any {
  return { language: item["language"], version: item["version"] };
}

export function runtimePropertiesDeserializer(item: any): RuntimeProperties {
  return {
    language: item["language"],
    version: item["version"],
  };
}

/** The parameters supplied to the update automation account operation. */
export interface RuntimeEnvironmentUpdateParameters {
  /** Metadata pertaining to creation and last modification of the resource. */
  systemData?: SystemData;
  /** List of Default packages for Environment */
  defaultPackages?: Record<string, string>;
}

export function runtimeEnvironmentUpdateParametersSerializer(
  item: RuntimeEnvironmentUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, ["defaultPackages"])
      ? undefined
      : _runtimeEnvironmentUpdateParametersPropertiesSerializer(item),
    systemData: !item["systemData"] ? item["systemData"] : systemDataSerializer(item["systemData"]),
  };
}

/** Gets or sets Runtime update properties. */
export interface RuntimeEnvironmentUpdateProperties {
  /** List of Default packages for Environment */
  defaultPackages?: Record<string, string>;
}

export function runtimeEnvironmentUpdatePropertiesSerializer(
  item: RuntimeEnvironmentUpdateProperties,
): any {
  return { defaultPackages: item["defaultPackages"] };
}

/** The response of a RuntimeEnvironment list operation. */
export interface _RuntimeEnvironmentListResult {
  /** The RuntimeEnvironment items on this page */
  value: RuntimeEnvironment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _runtimeEnvironmentListResultDeserializer(
  item: any,
): _RuntimeEnvironmentListResult {
  return {
    value: runtimeEnvironmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function runtimeEnvironmentArraySerializer(result: Array<RuntimeEnvironment>): any[] {
  return result.map((item) => {
    return runtimeEnvironmentSerializer(item);
  });
}

export function runtimeEnvironmentArrayDeserializer(result: Array<RuntimeEnvironment>): any[] {
  return result.map((item) => {
    return runtimeEnvironmentDeserializer(item);
  });
}

/** A private endpoint connection */
export interface PrivateEndpointConnection extends ProxyResource {
  /** Private endpoint which the connection belongs to. */
  privateEndpoint?: PrivateEndpointProperty;
  /** Gets the groupIds. */
  groupIds?: string[];
  /** Connection State of the Private Endpoint Connection. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateProperty;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, [
      "privateEndpoint",
      "groupIds",
      "privateLinkServiceConnectionState",
    ])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
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
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** Private endpoint which the connection belongs to. */
  privateEndpoint?: PrivateEndpointProperty;
  /** Gets the groupIds. */
  groupIds?: string[];
  /** Connection State of the Private Endpoint Connection. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionStateProperty;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointPropertySerializer(item["privateEndpoint"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
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
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStatePropertyDeserializer(
          item["privateLinkServiceConnectionState"],
        ),
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

/** Connection State of the Private Endpoint Connection. */
export interface PrivateLinkServiceConnectionStateProperty {
  /** The private link service connection status. */
  status?: string;
  /** The private link service connection description. */
  description?: string;
  /** Any action that is required beyond basic workflow (approve/ reject/ disconnect) */
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

/** A list of private endpoint connections */
export interface _PrivateEndpointConnectionListResult {
  /** Array of private endpoint connections */
  value?: PrivateEndpointConnection[];
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : privateEndpointConnectionArrayDeserializer(item["value"]),
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

/** Definition of the automation account type. */
export interface AutomationAccount extends TrackedResource {
  /** Gets or sets the etag of the resource. */
  etag?: string;
  /** Identity for the resource. */
  identity?: Identity;
  /** Gets or sets the SKU of account. */
  sku?: Sku;
  /** Gets or sets the last modified by. */
  lastModifiedBy?: string;
  /** Gets status of account. */
  readonly state?: AutomationAccountState;
  /** Gets the creation time. */
  readonly creationTime?: Date;
  /** Gets the last modified time. */
  readonly lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
  /** Encryption properties for the automation account */
  encryption?: EncryptionProperties;
  /** List of Automation operations supported by the Automation resource provider. */
  privateEndpointConnections?: PrivateEndpointConnection[];
  /** Indicates whether traffic on the non-ARM endpoint (Webhook/Agent) is allowed from the public internet */
  publicNetworkAccess?: boolean;
  /** Indicates whether requests using non-AAD authentication are blocked */
  disableLocalAuth?: boolean;
  /** URL of automation hybrid service which is used for hybrid worker on-boarding. */
  automationHybridServiceUrl?: string;
}

export function automationAccountDeserializer(item: any): AutomationAccount {
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
      : _automationAccountPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
  };
}

/** Definition of the account property. */
export interface AutomationAccountProperties {
  /** Gets or sets the SKU of account. */
  sku?: Sku;
  /** Gets or sets the last modified by. */
  lastModifiedBy?: string;
  /** Gets status of account. */
  readonly state?: AutomationAccountState;
  /** Gets the creation time. */
  readonly creationTime?: Date;
  /** Gets the last modified time. */
  readonly lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
  /** Encryption properties for the automation account */
  encryption?: EncryptionProperties;
  /** List of Automation operations supported by the Automation resource provider. */
  privateEndpointConnections?: PrivateEndpointConnection[];
  /** Indicates whether traffic on the non-ARM endpoint (Webhook/Agent) is allowed from the public internet */
  publicNetworkAccess?: boolean;
  /** Indicates whether requests using non-AAD authentication are blocked */
  disableLocalAuth?: boolean;
  /** URL of automation hybrid service which is used for hybrid worker on-boarding. */
  automationHybridServiceUrl?: string;
}

export function automationAccountPropertiesDeserializer(item: any): AutomationAccountProperties {
  return {
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    lastModifiedBy: item["lastModifiedBy"],
    state: item["state"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesDeserializer(item["encryption"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
    automationHybridServiceUrl: item["automationHybridServiceUrl"],
  };
}

/** The account SKU. */
export interface Sku {
  /** Gets or sets the SKU name of the account. */
  name: SkuNameEnum;
  /** Gets or sets the SKU family. */
  family?: string;
  /** Gets or sets the SKU capacity. */
  capacity?: number;
}

export function skuSerializer(item: Sku): any {
  return { name: item["name"], family: item["family"], capacity: item["capacity"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** Gets or sets the SKU name of the account. */
export enum KnownSkuNameEnum {
  /** Free */
  Free = "Free",
  /** Basic */
  Basic = "Basic",
}

/**
 * Gets or sets the SKU name of the account. \
 * {@link KnownSkuNameEnum} can be used interchangeably with SkuNameEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Free**: Free \
 * **Basic**: Basic
 */
export type SkuNameEnum = string;

/** Gets status of account. */
export enum KnownAutomationAccountState {
  /** Ok */
  Ok = "Ok",
  /** Unavailable */
  Unavailable = "Unavailable",
  /** Suspended */
  Suspended = "Suspended",
}

/**
 * Gets status of account. \
 * {@link KnownAutomationAccountState} can be used interchangeably with AutomationAccountState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ok**: Ok \
 * **Unavailable**: Unavailable \
 * **Suspended**: Suspended
 */
export type AutomationAccountState = string;

/** The encryption settings for automation account */
export interface EncryptionProperties {
  /** Key vault properties. */
  keyVaultProperties?: KeyVaultProperties;
  /** Encryption Key Source */
  keySource?: EncryptionKeySourceType;
  /** User identity used for CMK. */
  identity?: EncryptionPropertiesIdentity;
}

export function encryptionPropertiesSerializer(item: EncryptionProperties): any {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
    keySource: item["keySource"],
    identity: !item["identity"]
      ? item["identity"]
      : encryptionPropertiesIdentitySerializer(item["identity"]),
  };
}

export function encryptionPropertiesDeserializer(item: any): EncryptionProperties {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    keySource: item["keySource"],
    identity: !item["identity"]
      ? item["identity"]
      : encryptionPropertiesIdentityDeserializer(item["identity"]),
  };
}

/** Settings concerning key vault encryption for a configuration store. */
export interface KeyVaultProperties {
  /** The URI of the key vault key used to encrypt data. */
  keyvaultUri?: string;
  /** The name of key used to encrypt data. */
  keyName?: string;
  /** The key version of the key used to encrypt data. */
  keyVersion?: string;
}

export function keyVaultPropertiesSerializer(item: KeyVaultProperties): any {
  return {
    keyvaultUri: item["keyvaultUri"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
  };
}

export function keyVaultPropertiesDeserializer(item: any): KeyVaultProperties {
  return {
    keyvaultUri: item["keyvaultUri"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
  };
}

/** Encryption Key Source */
export type EncryptionKeySourceType = "Microsoft.Automation" | "Microsoft.Keyvault";

/** User identity used for CMK. */
export interface EncryptionPropertiesIdentity {
  /** The user identity used for CMK. It will be an ARM resource id in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentity?: any;
}

export function encryptionPropertiesIdentitySerializer(item: EncryptionPropertiesIdentity): any {
  return { userAssignedIdentity: item["userAssignedIdentity"] };
}

export function encryptionPropertiesIdentityDeserializer(item: any): EncryptionPropertiesIdentity {
  return {
    userAssignedIdentity: item["userAssignedIdentity"],
  };
}

/** Identity for the resource. */
export interface Identity {
  /** The principal ID of resource identity. The value must be an UUID. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** The identity type. */
  type?: ResourceIdentityType;
  /** The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<
    string,
    ComponentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalproperties
  >;
}

export function identitySerializer(item: Identity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : componentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalpropertiesRecordSerializer(
          item["userAssignedIdentities"],
        ),
  };
}

export function identityDeserializer(item: any): Identity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : componentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalpropertiesRecordDeserializer(
          item["userAssignedIdentities"],
        ),
  };
}

/** The identity type. */
export type ResourceIdentityType =
  "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned" | "None";

export function componentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalpropertiesRecordSerializer(
  item: Record<
    string,
    ComponentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalproperties
  >,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : componentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalpropertiesSerializer(
          item[key],
        );
  });
  return result;
}

export function componentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalpropertiesRecordDeserializer(
  item: Record<string, any>,
): Record<
  string,
  ComponentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalproperties
> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : componentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalpropertiesDeserializer(
          item[key],
        );
  });
  return result;
}

/** model interface ComponentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalproperties */
export interface ComponentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalproperties {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

export function componentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalpropertiesSerializer(
  _item: ComponentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalproperties,
): any {
  return {};
}

export function componentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalpropertiesDeserializer(
  item: any,
): ComponentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalproperties {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The parameters supplied to the create or update automation account operation. */
export interface AutomationAccountCreateOrUpdateParameters {
  /** Gets or sets name of the resource. */
  name?: string;
  /** Gets or sets the location of the resource. */
  location?: string;
  /** Sets the identity property for automation account */
  identity?: Identity;
  /** Gets or sets the tags attached to the resource. */
  tags?: Record<string, string>;
  /** Gets or sets account SKU. */
  sku?: Sku;
  /** Set the encryption properties for the automation account */
  encryption?: EncryptionProperties;
  /** Indicates whether traffic on the non-ARM endpoint (Webhook/Agent) is allowed from the public internet */
  publicNetworkAccess?: boolean;
  /** Indicates whether requests using non-AAD authentication are blocked */
  disableLocalAuth?: boolean;
}

export function automationAccountCreateOrUpdateParametersSerializer(
  item: AutomationAccountCreateOrUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "sku",
      "encryption",
      "publicNetworkAccess",
      "disableLocalAuth",
    ])
      ? undefined
      : _automationAccountCreateOrUpdateParametersPropertiesSerializer(item),
    name: item["name"],
    location: item["location"],
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    tags: item["tags"],
  };
}

/** The parameters supplied to the create or update account properties. */
export interface AutomationAccountCreateOrUpdateProperties {
  /** Gets or sets account SKU. */
  sku?: Sku;
  /** Set the encryption properties for the automation account */
  encryption?: EncryptionProperties;
  /** Indicates whether traffic on the non-ARM endpoint (Webhook/Agent) is allowed from the public internet */
  publicNetworkAccess?: boolean;
  /** Indicates whether requests using non-AAD authentication are blocked */
  disableLocalAuth?: boolean;
}

export function automationAccountCreateOrUpdatePropertiesSerializer(
  item: AutomationAccountCreateOrUpdateProperties,
): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesSerializer(item["encryption"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
  };
}

/** The parameters supplied to the update automation account operation. */
export interface AutomationAccountUpdateParameters {
  /** Gets or sets the name of the resource. */
  name?: string;
  /** Gets or sets the location of the resource. */
  location?: string;
  /** Sets the identity property for automation account */
  identity?: Identity;
  /** Gets or sets the tags attached to the resource. */
  tags?: Record<string, string>;
  /** Gets or sets account SKU. */
  sku?: Sku;
  /** Set the encryption properties for the automation account */
  encryption?: EncryptionProperties;
  /** Indicates whether traffic on the non-ARM endpoint (Webhook/Agent) is allowed from the public internet */
  publicNetworkAccess?: boolean;
  /** Indicates whether requests using non-AAD authentication are blocked */
  disableLocalAuth?: boolean;
}

export function automationAccountUpdateParametersSerializer(
  item: AutomationAccountUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "sku",
      "encryption",
      "publicNetworkAccess",
      "disableLocalAuth",
    ])
      ? undefined
      : _automationAccountUpdateParametersPropertiesSerializer(item),
    name: item["name"],
    location: item["location"],
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    tags: item["tags"],
  };
}

/** The parameters supplied to the update account properties. */
export interface AutomationAccountUpdateProperties {
  /** Gets or sets account SKU. */
  sku?: Sku;
  /** Set the encryption properties for the automation account */
  encryption?: EncryptionProperties;
  /** Indicates whether traffic on the non-ARM endpoint (Webhook/Agent) is allowed from the public internet */
  publicNetworkAccess?: boolean;
  /** Indicates whether requests using non-AAD authentication are blocked */
  disableLocalAuth?: boolean;
}

export function automationAccountUpdatePropertiesSerializer(
  item: AutomationAccountUpdateProperties,
): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesSerializer(item["encryption"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
  };
}

/** The response of a AutomationAccount list operation. */
export interface _AutomationAccountListResult {
  /** The AutomationAccount items on this page */
  value: AutomationAccount[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _automationAccountListResultDeserializer(item: any): _AutomationAccountListResult {
  return {
    value: automationAccountArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function automationAccountArrayDeserializer(result: Array<AutomationAccount>): any[] {
  return result.map((item) => {
    return automationAccountDeserializer(item);
  });
}

/** The response model for the list deleted runbook. */
export interface _DeletedRunbookListResult {
  /** The DeletedRunbook items on this page */
  value: DeletedRunbook[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deletedRunbookListResultDeserializer(item: any): _DeletedRunbookListResult {
  return {
    value: deletedRunbookArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deletedRunbookArrayDeserializer(result: Array<DeletedRunbook>): any[] {
  return result.map((item) => {
    return deletedRunbookDeserializer(item);
  });
}

/** Definition of deleted runbook. */
export interface DeletedRunbook {
  /** The resource id. */
  id?: string;
  /** Gets or sets name of the resource. */
  name?: string;
  /** Gets or sets the location of the resource. */
  location?: string;
  /** Gets or sets the Runbook Id. */
  runbookId?: string;
  /** Type of the runbook. */
  runbookType?: string;
  /** Gets or sets runtime of the runbook. */
  runtime?: string;
  /** Environment of the runbook. */
  runtimeEnvironment?: string;
  /** Gets or sets the creation time. */
  creationTime?: Date;
  /** Gets or sets the last modified time. */
  deletionTime?: Date;
}

export function deletedRunbookDeserializer(item: any): DeletedRunbook {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _deletedRunbookPropertiesDeserializer(item["properties"])),
    id: item["id"],
    name: item["name"],
    location: item["location"],
  };
}

/** Definition of the deleted runbook property. */
export interface DeletedRunbookProperties {
  /** Gets or sets the Runbook Id. */
  runbookId?: string;
  /** Type of the runbook. */
  runbookType?: string;
  /** Gets or sets runtime of the runbook. */
  runtime?: string;
  /** Environment of the runbook. */
  runtimeEnvironment?: string;
  /** Gets or sets the creation time. */
  creationTime?: Date;
  /** Gets or sets the last modified time. */
  deletionTime?: Date;
}

export function deletedRunbookPropertiesDeserializer(item: any): DeletedRunbookProperties {
  return {
    runbookId: item["runbookId"],
    runbookType: item["runbookType"],
    runtime: item["runtime"],
    runtimeEnvironment: item["runtimeEnvironment"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    deletionTime: !item["deletionTime"] ? item["deletionTime"] : new Date(item["deletionTime"]),
  };
}

/** Gets the count of nodes by count type */
export interface NodeCounts {
  /** Gets an array of counts */
  value?: NodeCount[];
  /** Gets the total number of records matching countType criteria. */
  totalCount?: number;
}

export function nodeCountsDeserializer(item: any): NodeCounts {
  return {
    value: !item["value"] ? item["value"] : nodeCountArrayDeserializer(item["value"]),
    totalCount: item["totalCount"],
  };
}

export function nodeCountArrayDeserializer(result: Array<NodeCount>): any[] {
  return result.map((item) => {
    return nodeCountDeserializer(item);
  });
}

/** Number of nodes based on the Filter */
export interface NodeCount {
  /** Gets the name of a count type */
  name?: string;
  properties?: NodeCountProperties;
}

export function nodeCountDeserializer(item: any): NodeCount {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : nodeCountPropertiesDeserializer(item["properties"]),
  };
}

/** model interface NodeCountProperties */
export interface NodeCountProperties {
  /** Gets the count for the name */
  count?: number;
}

export function nodeCountPropertiesDeserializer(item: any): NodeCountProperties {
  return {
    count: item["count"],
  };
}

/** A list of private link resources */
export interface _PrivateLinkResourceListResult {
  /** Array of private link resources */
  value?: PrivateLinkResource[];
  nextLink?: string;
}

export function _privateLinkResourceListResultDeserializer(
  item: any,
): _PrivateLinkResourceListResult {
  return {
    value: !item["value"] ? item["value"] : privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** A private link resource */
export interface PrivateLinkResource extends ProxyResource {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
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
  };
}

/** Definition of the agent registration information type. */
export interface AgentRegistration {
  /** Gets or sets the dsc meta configuration. */
  dscMetaConfiguration?: string;
  /** Gets or sets the dsc server endpoint. */
  endpoint?: string;
  /** Gets or sets the agent registration keys. */
  keys?: AgentRegistrationKeys;
  /** Gets or sets the id. */
  id?: string;
}

export function agentRegistrationDeserializer(item: any): AgentRegistration {
  return {
    dscMetaConfiguration: item["dscMetaConfiguration"],
    endpoint: item["endpoint"],
    keys: !item["keys"] ? item["keys"] : agentRegistrationKeysDeserializer(item["keys"]),
    id: item["id"],
  };
}

/** Definition of the agent registration keys. */
export interface AgentRegistrationKeys {
  /** Gets or sets the primary key. */
  primary?: string;
  /** Gets or sets the secondary key. */
  secondary?: string;
}

export function agentRegistrationKeysDeserializer(item: any): AgentRegistrationKeys {
  return {
    primary: item["primary"],
    secondary: item["secondary"],
  };
}

/** The parameters supplied to the regenerate keys operation. */
export interface AgentRegistrationRegenerateKeyParameter {
  /** Gets or sets the agent registration key name - primary or secondary. */
  keyName: AgentRegistrationKeyName;
}

export function agentRegistrationRegenerateKeyParameterSerializer(
  item: AgentRegistrationRegenerateKeyParameter,
): any {
  return { keyName: item["keyName"] };
}

/** Gets or sets the agent registration key name - primary or secondary. */
export enum KnownAgentRegistrationKeyName {
  /** primary */
  Primary = "primary",
  /** secondary */
  Secondary = "secondary",
}

/**
 * Gets or sets the agent registration key name - primary or secondary. \
 * {@link KnownAgentRegistrationKeyName} can be used interchangeably with AgentRegistrationKeyName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **primary**: primary \
 * **secondary**: secondary
 */
export type AgentRegistrationKeyName = string;

/** The response model for the list statistics operation. */
export interface _StatisticsListResult {
  /** Gets or sets a list of statistics. */
  value?: Statistics[];
  nextLink?: string;
}

export function _statisticsListResultDeserializer(item: any): _StatisticsListResult {
  return {
    value: !item["value"] ? item["value"] : statisticsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function statisticsArrayDeserializer(result: Array<Statistics>): any[] {
  return result.map((item) => {
    return statisticsDeserializer(item);
  });
}

/** Definition of the statistic. */
export interface Statistics {
  /** Gets the property value of the statistic. */
  readonly counterProperty?: string;
  /** Gets the value of the statistic. */
  readonly counterValue?: number;
  /** Gets the startTime of the statistic. */
  readonly startTime?: Date;
  /** Gets the endTime of the statistic. */
  readonly endTime?: Date;
  /** Gets the id. */
  readonly id?: string;
}

export function statisticsDeserializer(item: any): Statistics {
  return {
    counterProperty: item["counterProperty"],
    counterValue: item["counterValue"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    id: item["id"],
  };
}

/** The response model for the get usage operation. */
export interface _UsageListResult {
  /** Gets or sets usage. */
  value?: Usage[];
  nextLink?: string;
}

export function _usageListResultDeserializer(item: any): _UsageListResult {
  return {
    value: !item["value"] ? item["value"] : usageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function usageArrayDeserializer(result: Array<Usage>): any[] {
  return result.map((item) => {
    return usageDeserializer(item);
  });
}

/** Definition of Usage. */
export interface Usage {
  /** Gets or sets the id of the resource. */
  id?: string;
  /** Gets or sets the usage counter name. */
  name?: UsageCounterName;
  /** Gets or sets the usage unit name. */
  unit?: string;
  /** Gets or sets the current usage value. */
  currentValue?: number;
  /** Gets or sets max limit. -1 for unlimited */
  limit?: number;
  /** Gets or sets the throttle status. */
  throttleStatus?: string;
}

export function usageDeserializer(item: any): Usage {
  return {
    id: item["id"],
    name: !item["name"] ? item["name"] : usageCounterNameDeserializer(item["name"]),
    unit: item["unit"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    throttleStatus: item["throttleStatus"],
  };
}

/** Definition of usage counter name. */
export interface UsageCounterName {
  /** Gets or sets the usage counter name. */
  value?: string;
  /** Gets or sets the localized usage counter name. */
  localizedValue?: string;
}

export function usageCounterNameDeserializer(item: any): UsageCounterName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** model interface KeyListResult */
export interface KeyListResult {
  /** Lists the automation keys. */
  keys?: Key[];
}

export function keyListResultDeserializer(item: any): KeyListResult {
  return {
    keys: !item["keys"] ? item["keys"] : keyArrayDeserializer(item["keys"]),
  };
}

export function keyArrayDeserializer(result: Array<Key>): any[] {
  return result.map((item) => {
    return keyDeserializer(item);
  });
}

/** Automation key which is used to register a DSC Node */
export interface Key {
  /** Automation key name. */
  readonly keyName?: AutomationKeyName;
  /** Automation key permissions. */
  readonly permissions?: AutomationKeyPermissions;
  /** Value of the Automation Key used for registration. */
  readonly value?: string;
}

export function keyDeserializer(item: any): Key {
  return {
    keyName: item["KeyName"],
    permissions: item["Permissions"],
    value: item["Value"],
  };
}

/** Automation key name. */
export enum KnownAutomationKeyName {
  /** Primary */
  Primary = "Primary",
  /** Secondary */
  Secondary = "Secondary",
}

/**
 * Automation key name. \
 * {@link KnownAutomationKeyName} can be used interchangeably with AutomationKeyName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary**: Primary \
 * **Secondary**: Secondary
 */
export type AutomationKeyName = string;

/** Automation key permissions. */
export enum KnownAutomationKeyPermissions {
  /** Read */
  Read = "Read",
  /** Full */
  Full = "Full",
}

/**
 * Automation key permissions. \
 * {@link KnownAutomationKeyPermissions} can be used interchangeably with AutomationKeyPermissions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Read**: Read \
 * **Full**: Full
 */
export type AutomationKeyPermissions = string;

/** The response model for the list job operation. */
export interface _JobListResultV2 {
  /** The JobCollectionItem items on this page */
  value: JobCollectionItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobListResultV2Deserializer(item: any): _JobListResultV2 {
  return {
    value: jobCollectionItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobCollectionItemArrayDeserializer(result: Array<JobCollectionItem>): any[] {
  return result.map((item) => {
    return jobCollectionItemDeserializer(item);
  });
}

/** Job collection item properties. */
export interface JobCollectionItem extends ProxyResource {
  /** The runbook association. */
  readonly runbook?: RunbookAssociationProperty;
  /** The id of the job. */
  readonly jobId?: string;
  /** Gets or sets the job started by. */
  readonly startedBy?: string;
  /** The creation time of the job. */
  readonly creationTime?: Date;
  /** The status of the job. */
  readonly status?: JobStatus;
  /** The start time of the job. */
  readonly startTime?: Date;
  /** The end time of the job. */
  readonly endTime?: Date;
  /** The last modified time of the job. */
  readonly lastModifiedTime?: Date;
  /** The provisioning state of a resource. */
  readonly provisioningState?: string;
  /** Runtime Environment Property */
  jobRuntimeEnvironment?: JobRuntimeEnvironment;
  /** Specifies the runOn group name where the job was executed. */
  runOn?: string;
}

export function jobCollectionItemDeserializer(item: any): JobCollectionItem {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._jobCollectionItemPropertiesDeserializer(item["properties"]),
  };
}

/** Job collection item properties. */
export interface JobCollectionItemProperties {
  /** The runbook association. */
  readonly runbook?: RunbookAssociationProperty;
  /** The id of the job. */
  readonly jobId?: string;
  /** Gets or sets the job started by. */
  readonly startedBy?: string;
  /** The creation time of the job. */
  readonly creationTime?: Date;
  /** The status of the job. */
  readonly status?: JobStatus;
  /** The start time of the job. */
  readonly startTime?: Date;
  /** The end time of the job. */
  readonly endTime?: Date;
  /** The last modified time of the job. */
  readonly lastModifiedTime?: Date;
  /** The provisioning state of a resource. */
  readonly provisioningState?: string;
  /** Runtime Environment Property */
  jobRuntimeEnvironment?: JobRuntimeEnvironment;
  /** Specifies the runOn group name where the job was executed. */
  runOn?: string;
}

export function jobCollectionItemPropertiesDeserializer(item: any): JobCollectionItemProperties {
  return {
    runbook: !item["runbook"]
      ? item["runbook"]
      : runbookAssociationPropertyDeserializer(item["runbook"]),
    jobId: item["jobId"],
    startedBy: item["startedBy"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    provisioningState: item["provisioningState"],
    jobRuntimeEnvironment: !item["jobRuntimeEnvironment"]
      ? item["jobRuntimeEnvironment"]
      : jobRuntimeEnvironmentDeserializer(item["jobRuntimeEnvironment"]),
    runOn: item["runOn"],
  };
}

/** The runbook property associated with the entity. */
export interface RunbookAssociationProperty {
  /** Gets or sets the name of the runbook. */
  name?: string;
}

export function runbookAssociationPropertySerializer(item: RunbookAssociationProperty): any {
  return { name: item["name"] };
}

export function runbookAssociationPropertyDeserializer(item: any): RunbookAssociationProperty {
  return {
    name: item["name"],
  };
}

/** Gets or sets the status of the job. */
export enum KnownJobStatus {
  /** New */
  New = "New",
  /** Activating */
  Activating = "Activating",
  /** Running */
  Running = "Running",
  /** Completed */
  Completed = "Completed",
  /** Failed */
  Failed = "Failed",
  /** Stopped */
  Stopped = "Stopped",
  /** Blocked */
  Blocked = "Blocked",
  /** Suspended */
  Suspended = "Suspended",
  /** Disconnected */
  Disconnected = "Disconnected",
  /** Suspending */
  Suspending = "Suspending",
  /** Stopping */
  Stopping = "Stopping",
  /** Resuming */
  Resuming = "Resuming",
  /** Removing */
  Removing = "Removing",
}

/**
 * Gets or sets the status of the job. \
 * {@link KnownJobStatus} can be used interchangeably with JobStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **New**: New \
 * **Activating**: Activating \
 * **Running**: Running \
 * **Completed**: Completed \
 * **Failed**: Failed \
 * **Stopped**: Stopped \
 * **Blocked**: Blocked \
 * **Suspended**: Suspended \
 * **Disconnected**: Disconnected \
 * **Suspending**: Suspending \
 * **Stopping**: Stopping \
 * **Resuming**: Resuming \
 * **Removing**: Removing
 */
export type JobStatus = string;

/** The runbook property associated with the entity. */
export interface JobRuntimeEnvironment {
  /** Name of Runtime Environment. */
  runtimeEnvironmentName?: string;
}

export function jobRuntimeEnvironmentDeserializer(item: any): JobRuntimeEnvironment {
  return {
    runtimeEnvironmentName: item["runtimeEnvironmentName"],
  };
}

/** Definition of the job. */
export interface Job extends ProxyResource {
  /** Gets or sets the runbook. */
  runbook?: RunbookAssociationProperty;
  /** Gets or sets the job started by. */
  startedBy?: string;
  /** Gets or sets the runOn which specifies the group name where the job is to be executed. */
  runOn?: string;
  /** Runtime Environment Property */
  jobRuntimeEnvironment?: JobRuntimeEnvironment;
  /** Gets or sets the id of the job. */
  jobId?: string;
  /** Gets or sets the creation time of the job. */
  creationTime?: Date;
  /** Gets or sets the status of the job. */
  status?: JobStatus;
  /** Gets or sets the status details of the job. */
  statusDetails?: string;
  /** Gets or sets the start time of the job. */
  startTime?: Date;
  /** Gets or sets the end time of the job. */
  endTime?: Date;
  /** Gets or sets the exception of the job. */
  exception?: string;
  /** Gets or sets the last modified time of the job. */
  lastModifiedTime?: Date;
  /** Gets or sets the last status modified time of the job. */
  lastStatusModifiedTime?: Date;
  /** Gets or sets the parameters of the job. */
  parameters?: Record<string, string>;
  /** The current provisioning state of the job. */
  readonly provisioningState?: JobProvisioningState;
}

export function jobDeserializer(item: any): Job {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"] ? item["properties"] : _jobPropertiesDeserializer(item["properties"])),
  };
}

/** Definition of job properties. */
export interface JobProperties {
  /** Gets or sets the runbook. */
  runbook?: RunbookAssociationProperty;
  /** Gets or sets the job started by. */
  startedBy?: string;
  /** Gets or sets the runOn which specifies the group name where the job is to be executed. */
  runOn?: string;
  /** Runtime Environment Property */
  jobRuntimeEnvironment?: JobRuntimeEnvironment;
  /** Gets or sets the id of the job. */
  jobId?: string;
  /** Gets or sets the creation time of the job. */
  creationTime?: Date;
  /** Gets or sets the status of the job. */
  status?: JobStatus;
  /** Gets or sets the status details of the job. */
  statusDetails?: string;
  /** Gets or sets the start time of the job. */
  startTime?: Date;
  /** Gets or sets the end time of the job. */
  endTime?: Date;
  /** Gets or sets the exception of the job. */
  exception?: string;
  /** Gets or sets the last modified time of the job. */
  lastModifiedTime?: Date;
  /** Gets or sets the last status modified time of the job. */
  lastStatusModifiedTime?: Date;
  /** Gets or sets the parameters of the job. */
  parameters?: Record<string, string>;
  /** The current provisioning state of the job. */
  readonly provisioningState?: JobProvisioningState;
}

export function jobPropertiesDeserializer(item: any): JobProperties {
  return {
    runbook: !item["runbook"]
      ? item["runbook"]
      : runbookAssociationPropertyDeserializer(item["runbook"]),
    startedBy: item["startedBy"],
    runOn: item["runOn"],
    jobRuntimeEnvironment: !item["jobRuntimeEnvironment"]
      ? item["jobRuntimeEnvironment"]
      : jobRuntimeEnvironmentDeserializer(item["jobRuntimeEnvironment"]),
    jobId: item["jobId"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    status: item["status"],
    statusDetails: item["statusDetails"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    exception: item["exception"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    lastStatusModifiedTime: !item["lastStatusModifiedTime"]
      ? item["lastStatusModifiedTime"]
      : new Date(item["lastStatusModifiedTime"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    provisioningState: item["provisioningState"],
  };
}

/** The provisioning state of the resource. */
export enum KnownJobProvisioningState {
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Suspended */
  Suspended = "Suspended",
  /** Processing */
  Processing = "Processing",
}

/**
 * The provisioning state of the resource. \
 * {@link KnownJobProvisioningState} can be used interchangeably with JobProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Failed**: Failed \
 * **Succeeded**: Succeeded \
 * **Suspended**: Suspended \
 * **Processing**: Processing
 */
export type JobProvisioningState = string;

/** The parameters supplied to the create job operation. */
export interface JobCreateParameters {
  /** Gets or sets the runbook. */
  runbook?: RunbookAssociationProperty;
  /** Gets or sets the parameters of the job. */
  parameters?: Record<string, string>;
  /** Gets or sets the runOn which specifies the group name where the job is to be executed. */
  runOn?: string;
}

export function jobCreateParametersSerializer(item: JobCreateParameters): any {
  return { properties: _jobCreateParametersPropertiesSerializer(item) };
}

/** model interface JobCreateProperties */
export interface JobCreateProperties {
  /** Gets or sets the runbook. */
  runbook?: RunbookAssociationProperty;
  /** Gets or sets the parameters of the job. */
  parameters?: Record<string, string>;
  /** Gets or sets the runOn which specifies the group name where the job is to be executed. */
  runOn?: string;
}

export function jobCreatePropertiesSerializer(item: JobCreateProperties): any {
  return {
    runbook: !item["runbook"]
      ? item["runbook"]
      : runbookAssociationPropertySerializer(item["runbook"]),
    parameters: item["parameters"],
    runOn: item["runOn"],
  };
}

/** Definition of the linked workspace. */
export interface LinkedWorkspace {
  /** Gets the id of the linked workspace. */
  readonly id?: string;
}

export function linkedWorkspaceDeserializer(item: any): LinkedWorkspace {
  return {
    id: item["id"],
  };
}

/** The response model for the list fields operation. */
export interface _TypeFieldListResult {
  /** Gets or sets a list of fields. */
  value?: TypeField[];
  nextLink?: string;
}

export function _typeFieldListResultDeserializer(item: any): _TypeFieldListResult {
  return {
    value: !item["value"] ? item["value"] : typeFieldArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function typeFieldArrayDeserializer(result: Array<TypeField>): any[] {
  return result.map((item) => {
    return typeFieldDeserializer(item);
  });
}

/** Information about a field of a type. */
export interface TypeField {
  /** Gets or sets the name of the field. */
  name?: string;
  /** Gets or sets the type of the field. */
  type?: string;
}

export function typeFieldDeserializer(item: any): TypeField {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** Software update configuration machine run model. */
export interface SoftwareUpdateConfigurationMachineRun {
  /** Name of the software update configuration machine run */
  readonly name?: string;
  /** Resource Id of the software update configuration machine run */
  readonly id?: string;
  /** name of the updated computer */
  readonly targetComputer?: string;
  /** type of the updated computer. */
  readonly targetComputerType?: string;
  /** software update configuration triggered this run */
  softwareUpdateConfiguration?: UpdateConfigurationNavigation;
  /** Status of the software update configuration machine run. */
  readonly status?: string;
  /** Operating system target of the software update configuration triggered this run */
  readonly osType?: string;
  /** correlation id of the software update configuration machine run */
  readonly correlationId?: string;
  /** source computer id of the software update configuration machine run */
  readonly sourceComputerId?: string;
  /** Start time of the software update configuration machine run. */
  readonly startTime?: Date;
  /** End time of the software update configuration machine run. */
  readonly endTime?: Date;
  /** configured duration for the software update configuration run. */
  readonly configuredDuration?: string;
  /** Job associated with the software update configuration machine run */
  job?: JobNavigation;
  /** Creation time of the resource, which only appears in the response. */
  readonly creationTime?: Date;
  /** createdBy property, which only appears in the response. */
  readonly createdBy?: string;
  /** Last time resource was modified, which only appears in the response. */
  readonly lastModifiedTime?: Date;
  /** lastModifiedBy property, which only appears in the response. */
  readonly lastModifiedBy?: string;
  /** Details of provisioning error */
  error?: AutomationErrorResponse;
}

export function softwareUpdateConfigurationMachineRunDeserializer(
  item: any,
): SoftwareUpdateConfigurationMachineRun {
  return {
    name: item["name"],
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _softwareUpdateConfigurationMachineRunPropertiesDeserializer(item["properties"])),
  };
}

/** Software update configuration machine run properties. */
export interface UpdateConfigurationMachineRunProperties {
  /** name of the updated computer */
  readonly targetComputer?: string;
  /** type of the updated computer. */
  readonly targetComputerType?: string;
  /** software update configuration triggered this run */
  softwareUpdateConfiguration?: UpdateConfigurationNavigation;
  /** Status of the software update configuration machine run. */
  readonly status?: string;
  /** Operating system target of the software update configuration triggered this run */
  readonly osType?: string;
  /** correlation id of the software update configuration machine run */
  readonly correlationId?: string;
  /** source computer id of the software update configuration machine run */
  readonly sourceComputerId?: string;
  /** Start time of the software update configuration machine run. */
  readonly startTime?: Date;
  /** End time of the software update configuration machine run. */
  readonly endTime?: Date;
  /** configured duration for the software update configuration run. */
  readonly configuredDuration?: string;
  /** Job associated with the software update configuration machine run */
  job?: JobNavigation;
  /** Creation time of the resource, which only appears in the response. */
  readonly creationTime?: Date;
  /** createdBy property, which only appears in the response. */
  readonly createdBy?: string;
  /** Last time resource was modified, which only appears in the response. */
  readonly lastModifiedTime?: Date;
  /** lastModifiedBy property, which only appears in the response. */
  readonly lastModifiedBy?: string;
  /** Details of provisioning error */
  error?: AutomationErrorResponse;
}

export function updateConfigurationMachineRunPropertiesDeserializer(
  item: any,
): UpdateConfigurationMachineRunProperties {
  return {
    targetComputer: item["targetComputer"],
    targetComputerType: item["targetComputerType"],
    softwareUpdateConfiguration: !item["softwareUpdateConfiguration"]
      ? item["softwareUpdateConfiguration"]
      : updateConfigurationNavigationDeserializer(item["softwareUpdateConfiguration"]),
    status: item["status"],
    osType: item["osType"],
    correlationId: item["correlationId"],
    sourceComputerId: item["sourceComputerId"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    configuredDuration: item["configuredDuration"],
    job: !item["job"] ? item["job"] : jobNavigationDeserializer(item["job"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    createdBy: item["createdBy"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    lastModifiedBy: item["lastModifiedBy"],
    error: !item["error"] ? item["error"] : automationErrorResponseDeserializer(item["error"]),
  };
}

/** Software update configuration Run Navigation model. */
export interface UpdateConfigurationNavigation {
  /** Name of the software update configuration triggered the software update configuration run */
  readonly name?: string;
}

export function updateConfigurationNavigationDeserializer(
  item: any,
): UpdateConfigurationNavigation {
  return {
    name: item["name"],
  };
}

/** Software update configuration machine run job navigation properties. */
export interface JobNavigation {
  /** Id of the job associated with the software update configuration run */
  readonly id?: string;
}

export function jobNavigationDeserializer(item: any): JobNavigation {
  return {
    id: item["id"],
  };
}

/** result of listing all software update configuration machine runs */
export interface SoftwareUpdateConfigurationMachineRunListResult {
  /** The softwareUpdateConfigurationMachineRun items on this page */
  value: SoftwareUpdateConfigurationMachineRun[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function softwareUpdateConfigurationMachineRunListResultDeserializer(
  item: any,
): SoftwareUpdateConfigurationMachineRunListResult {
  return {
    value: softwareUpdateConfigurationMachineRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function softwareUpdateConfigurationMachineRunArrayDeserializer(
  result: Array<SoftwareUpdateConfigurationMachineRun>,
): any[] {
  return result.map((item) => {
    return softwareUpdateConfigurationMachineRunDeserializer(item);
  });
}

/** Software update configuration Run properties. */
export interface SoftwareUpdateConfigurationRun {
  /** Name of the software update configuration run. */
  readonly name?: string;
  /** Resource Id of the software update configuration run */
  readonly id?: string;
  /** software update configuration triggered this run */
  softwareUpdateConfiguration?: UpdateConfigurationNavigation;
  /** Status of the software update configuration run. */
  readonly status?: string;
  /** Configured duration for the software update configuration run. */
  readonly configuredDuration?: string;
  /** Operating system target of the software update configuration triggered this run */
  readonly osType?: string;
  /** Start time of the software update configuration run. */
  readonly startTime?: Date;
  /** End time of the software update configuration run. */
  readonly endTime?: Date;
  /** Number of computers in the software update configuration run. */
  readonly computerCount?: number;
  /** Number of computers with failed status. */
  readonly failedCount?: number;
  /** Creation time of the resource, which only appears in the response. */
  readonly creationTime?: Date;
  /** CreatedBy property, which only appears in the response. */
  readonly createdBy?: string;
  /** Last time resource was modified, which only appears in the response. */
  readonly lastModifiedTime?: Date;
  /** LastModifiedBy property, which only appears in the response. */
  readonly lastModifiedBy?: string;
  /** Software update configuration tasks triggered in this run */
  tasks?: SoftwareUpdateConfigurationRunTasks;
}

export function softwareUpdateConfigurationRunDeserializer(
  item: any,
): SoftwareUpdateConfigurationRun {
  return {
    name: item["name"],
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _softwareUpdateConfigurationRunPropertiesDeserializer(item["properties"])),
  };
}

/** Software update configuration properties. */
export interface SoftwareUpdateConfigurationRunProperties {
  /** software update configuration triggered this run */
  softwareUpdateConfiguration?: UpdateConfigurationNavigation;
  /** Status of the software update configuration run. */
  readonly status?: string;
  /** Configured duration for the software update configuration run. */
  readonly configuredDuration?: string;
  /** Operating system target of the software update configuration triggered this run */
  readonly osType?: string;
  /** Start time of the software update configuration run. */
  readonly startTime?: Date;
  /** End time of the software update configuration run. */
  readonly endTime?: Date;
  /** Number of computers in the software update configuration run. */
  readonly computerCount?: number;
  /** Number of computers with failed status. */
  readonly failedCount?: number;
  /** Creation time of the resource, which only appears in the response. */
  readonly creationTime?: Date;
  /** CreatedBy property, which only appears in the response. */
  readonly createdBy?: string;
  /** Last time resource was modified, which only appears in the response. */
  readonly lastModifiedTime?: Date;
  /** LastModifiedBy property, which only appears in the response. */
  readonly lastModifiedBy?: string;
  /** Software update configuration tasks triggered in this run */
  tasks?: SoftwareUpdateConfigurationRunTasks;
}

export function softwareUpdateConfigurationRunPropertiesDeserializer(
  item: any,
): SoftwareUpdateConfigurationRunProperties {
  return {
    softwareUpdateConfiguration: !item["softwareUpdateConfiguration"]
      ? item["softwareUpdateConfiguration"]
      : updateConfigurationNavigationDeserializer(item["softwareUpdateConfiguration"]),
    status: item["status"],
    configuredDuration: item["configuredDuration"],
    osType: item["osType"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    computerCount: item["computerCount"],
    failedCount: item["failedCount"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    createdBy: item["createdBy"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    lastModifiedBy: item["lastModifiedBy"],
    tasks: !item["tasks"]
      ? item["tasks"]
      : softwareUpdateConfigurationRunTasksDeserializer(item["tasks"]),
  };
}

/** Software update configuration run tasks model. */
export interface SoftwareUpdateConfigurationRunTasks {
  /** Pre task properties. */
  preTask?: SoftwareUpdateConfigurationRunTaskProperties;
  /** Post task properties. */
  postTask?: SoftwareUpdateConfigurationRunTaskProperties;
}

export function softwareUpdateConfigurationRunTasksDeserializer(
  item: any,
): SoftwareUpdateConfigurationRunTasks {
  return {
    preTask: !item["preTask"]
      ? item["preTask"]
      : softwareUpdateConfigurationRunTaskPropertiesDeserializer(item["preTask"]),
    postTask: !item["postTask"]
      ? item["postTask"]
      : softwareUpdateConfigurationRunTaskPropertiesDeserializer(item["postTask"]),
  };
}

/** Task properties of the software update configuration. */
export interface SoftwareUpdateConfigurationRunTaskProperties {
  /** The status of the task. */
  status?: string;
  /** The name of the source of the task. */
  source?: string;
  /** The job id of the task. */
  jobId?: string;
}

export function softwareUpdateConfigurationRunTaskPropertiesDeserializer(
  item: any,
): SoftwareUpdateConfigurationRunTaskProperties {
  return {
    status: item["status"],
    source: item["source"],
    jobId: item["jobId"],
  };
}

/** result of listing all software update configuration runs */
export interface SoftwareUpdateConfigurationRunListResult {
  /** The softwareUpdateConfigurationRun items on this page */
  value: SoftwareUpdateConfigurationRun[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function softwareUpdateConfigurationRunListResultDeserializer(
  item: any,
): SoftwareUpdateConfigurationRunListResult {
  return {
    value: softwareUpdateConfigurationRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function softwareUpdateConfigurationRunArrayDeserializer(
  result: Array<SoftwareUpdateConfigurationRun>,
): any[] {
  return result.map((item) => {
    return softwareUpdateConfigurationRunDeserializer(item);
  });
}

/** Definition of the webhook type. */
export interface Webhook extends ProxyResource {
  /** Gets or sets the value of the enabled flag of the webhook. */
  isEnabled?: boolean;
  /** Gets or sets the webhook uri. */
  uri?: string;
  /** Gets or sets the expiry time. */
  expiryTime?: Date;
  /** Gets or sets the last invoked time. */
  lastInvokedTime?: Date;
  /** Gets or sets the parameters of the job that is created when the webhook calls the runbook it is associated with. */
  parameters?: Record<string, string>;
  /** Gets or sets the runbook the webhook is associated with. */
  runbook?: RunbookAssociationProperty;
  /** Gets or sets the name of the hybrid worker group the webhook job will run on. */
  runOn?: string;
  /** Gets or sets the creation time. */
  creationTime?: Date;
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Details of the user who last modified the Webhook */
  lastModifiedBy?: string;
  /** Gets or sets the description. */
  description?: string;
}

export function webhookDeserializer(item: any): Webhook {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _webhookPropertiesDeserializer(item["properties"])),
  };
}

/** Definition of the webhook properties */
export interface WebhookProperties {
  /** Gets or sets the value of the enabled flag of the webhook. */
  isEnabled?: boolean;
  /** Gets or sets the webhook uri. */
  uri?: string;
  /** Gets or sets the expiry time. */
  expiryTime?: Date;
  /** Gets or sets the last invoked time. */
  lastInvokedTime?: Date;
  /** Gets or sets the parameters of the job that is created when the webhook calls the runbook it is associated with. */
  parameters?: Record<string, string>;
  /** Gets or sets the runbook the webhook is associated with. */
  runbook?: RunbookAssociationProperty;
  /** Gets or sets the name of the hybrid worker group the webhook job will run on. */
  runOn?: string;
  /** Gets or sets the creation time. */
  creationTime?: Date;
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Details of the user who last modified the Webhook */
  lastModifiedBy?: string;
  /** Gets or sets the description. */
  description?: string;
}

export function webhookPropertiesDeserializer(item: any): WebhookProperties {
  return {
    isEnabled: item["isEnabled"],
    uri: item["uri"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    lastInvokedTime: !item["lastInvokedTime"]
      ? item["lastInvokedTime"]
      : new Date(item["lastInvokedTime"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    runbook: !item["runbook"]
      ? item["runbook"]
      : runbookAssociationPropertyDeserializer(item["runbook"]),
    runOn: item["runOn"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    lastModifiedBy: item["lastModifiedBy"],
    description: item["description"],
  };
}

/** The parameters supplied to the create or update webhook operation. */
export interface WebhookCreateOrUpdateParameters {
  /** Gets or sets the name of the webhook. */
  name: string;
  /** Gets or sets the value of the enabled flag of webhook. */
  isEnabled?: boolean;
  /** Gets or sets the uri. */
  uri?: string;
  /** Gets or sets the expiry time. */
  expiryTime?: Date;
  /** Gets or sets the parameters of the job. */
  parameters?: Record<string, string>;
  /** Gets or sets the runbook. */
  runbook?: RunbookAssociationProperty;
  /** Gets or sets the name of the hybrid worker group the webhook job will run on. */
  runOn?: string;
}

export function webhookCreateOrUpdateParametersSerializer(
  item: WebhookCreateOrUpdateParameters,
): any {
  return {
    name: item["name"],
    properties: _webhookCreateOrUpdateParametersPropertiesSerializer(item),
  };
}

/** The properties of the create webhook operation. */
export interface WebhookCreateOrUpdateProperties {
  /** Gets or sets the value of the enabled flag of webhook. */
  isEnabled?: boolean;
  /** Gets or sets the uri. */
  uri?: string;
  /** Gets or sets the expiry time. */
  expiryTime?: Date;
  /** Gets or sets the parameters of the job. */
  parameters?: Record<string, string>;
  /** Gets or sets the runbook. */
  runbook?: RunbookAssociationProperty;
  /** Gets or sets the name of the hybrid worker group the webhook job will run on. */
  runOn?: string;
}

export function webhookCreateOrUpdatePropertiesSerializer(
  item: WebhookCreateOrUpdateProperties,
): any {
  return {
    isEnabled: item["isEnabled"],
    uri: item["uri"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    parameters: item["parameters"],
    runbook: !item["runbook"]
      ? item["runbook"]
      : runbookAssociationPropertySerializer(item["runbook"]),
    runOn: item["runOn"],
  };
}

/** The parameters supplied to the update webhook operation. */
export interface WebhookUpdateParameters {
  /** Gets or sets the name of the webhook. */
  name?: string;
  /** Gets or sets the value of the enabled flag of webhook. */
  isEnabled?: boolean;
  /** Gets or sets the name of the hybrid worker group the webhook job will run on. */
  runOn?: string;
  /** Gets or sets the parameters of the job. */
  parameters?: Record<string, string>;
  /** Gets or sets the description of the webhook. */
  description?: string;
}

export function webhookUpdateParametersSerializer(item: WebhookUpdateParameters): any {
  return {
    name: item["name"],
    properties: areAllPropsUndefined(item, ["isEnabled", "runOn", "parameters", "description"])
      ? undefined
      : _webhookUpdateParametersPropertiesSerializer(item),
  };
}

/** The properties of the update webhook. */
export interface WebhookUpdateProperties {
  /** Gets or sets the value of the enabled flag of webhook. */
  isEnabled?: boolean;
  /** Gets or sets the name of the hybrid worker group the webhook job will run on. */
  runOn?: string;
  /** Gets or sets the parameters of the job. */
  parameters?: Record<string, string>;
  /** Gets or sets the description of the webhook. */
  description?: string;
}

export function webhookUpdatePropertiesSerializer(item: WebhookUpdateProperties): any {
  return {
    isEnabled: item["isEnabled"],
    runOn: item["runOn"],
    parameters: item["parameters"],
    description: item["description"],
  };
}

/** The response of a Webhook list operation. */
export interface _WebhookListResult {
  /** The Webhook items on this page */
  value: Webhook[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _webhookListResultDeserializer(item: any): _WebhookListResult {
  return {
    value: webhookArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function webhookArrayDeserializer(result: Array<Webhook>): any[] {
  return result.map((item) => {
    return webhookDeserializer(item);
  });
}

/** Definition of a DscNode */
export interface DscNode extends ProxyResource {
  /** Gets or sets the last seen time of the node. */
  lastSeen?: Date;
  /** Gets or sets the registration time of the node. */
  registrationTime?: Date;
  /** Gets or sets the ip of the node. */
  ip?: string;
  /** Gets or sets the account id of the node. */
  accountId?: string;
  /** Gets or sets the configuration of the node. */
  nodeConfiguration?: DscNodeConfigurationAssociationProperty;
  /** Gets or sets the status of the node. */
  status?: string;
  /** Gets or sets the node id. */
  nodeId?: string;
  /** Gets or sets the etag of the resource. */
  etag?: string;
  /** Gets the total number of records matching filter criteria. */
  totalCount?: number;
  /** Gets or sets the list of extensionHandler properties for a Node. */
  extensionHandler?: DscNodeExtensionHandlerAssociationProperty[];
}

export function dscNodeDeserializer(item: any): DscNode {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _dscNodePropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a DscNode */
export interface DscNodeProperties {
  /** Gets or sets the last seen time of the node. */
  lastSeen?: Date;
  /** Gets or sets the registration time of the node. */
  registrationTime?: Date;
  /** Gets or sets the ip of the node. */
  ip?: string;
  /** Gets or sets the account id of the node. */
  accountId?: string;
  /** Gets or sets the configuration of the node. */
  nodeConfiguration?: DscNodeConfigurationAssociationProperty;
  /** Gets or sets the status of the node. */
  status?: string;
  /** Gets or sets the node id. */
  nodeId?: string;
  /** Gets or sets the etag of the resource. */
  etag?: string;
  /** Gets the total number of records matching filter criteria. */
  totalCount?: number;
  /** Gets or sets the list of extensionHandler properties for a Node. */
  extensionHandler?: DscNodeExtensionHandlerAssociationProperty[];
}

export function dscNodePropertiesDeserializer(item: any): DscNodeProperties {
  return {
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    registrationTime: !item["registrationTime"]
      ? item["registrationTime"]
      : new Date(item["registrationTime"]),
    ip: item["ip"],
    accountId: item["accountId"],
    nodeConfiguration: !item["nodeConfiguration"]
      ? item["nodeConfiguration"]
      : dscNodeConfigurationAssociationPropertyDeserializer(item["nodeConfiguration"]),
    status: item["status"],
    nodeId: item["nodeId"],
    etag: item["etag"],
    totalCount: item["totalCount"],
    extensionHandler: !item["extensionHandler"]
      ? item["extensionHandler"]
      : dscNodeExtensionHandlerAssociationPropertyArrayDeserializer(item["extensionHandler"]),
  };
}

/** The dsc node configuration property associated with the entity. */
export interface DscNodeConfigurationAssociationProperty {
  /** Gets or sets the name of the dsc node configuration. */
  name?: string;
}

export function dscNodeConfigurationAssociationPropertySerializer(
  item: DscNodeConfigurationAssociationProperty,
): any {
  return { name: item["name"] };
}

export function dscNodeConfigurationAssociationPropertyDeserializer(
  item: any,
): DscNodeConfigurationAssociationProperty {
  return {
    name: item["name"],
  };
}

export function dscNodeExtensionHandlerAssociationPropertyArrayDeserializer(
  result: Array<DscNodeExtensionHandlerAssociationProperty>,
): any[] {
  return result.map((item) => {
    return dscNodeExtensionHandlerAssociationPropertyDeserializer(item);
  });
}

/** The dsc extensionHandler property associated with the node */
export interface DscNodeExtensionHandlerAssociationProperty {
  /** Gets or sets the name of the extension handler. */
  name?: string;
  /** Gets or sets the version of the extension handler. */
  version?: string;
}

export function dscNodeExtensionHandlerAssociationPropertyDeserializer(
  item: any,
): DscNodeExtensionHandlerAssociationProperty {
  return {
    name: item["name"],
    version: item["version"],
  };
}

/** The parameters supplied to the update dsc node operation. */
export interface DscNodeUpdateParameters {
  /** Gets or sets the id of the dsc node. */
  nodeId?: string;
  properties?: DscNodeUpdateParametersProperties;
}

export function dscNodeUpdateParametersSerializer(item: DscNodeUpdateParameters): any {
  return {
    nodeId: item["nodeId"],
    properties: !item["properties"]
      ? item["properties"]
      : dscNodeUpdateParametersPropertiesSerializer(item["properties"]),
  };
}

/** model interface DscNodeUpdateParametersProperties */
export interface DscNodeUpdateParametersProperties {
  /** Gets or sets the name of the dsc node configuration. */
  name?: string;
}

export function dscNodeUpdateParametersPropertiesSerializer(
  item: DscNodeUpdateParametersProperties,
): any {
  return {
    nodeConfiguration: areAllPropsUndefined(item, ["name"])
      ? undefined
      : _dscNodeUpdateParametersPropertiesNodeConfigurationSerializer(item),
  };
}

/** The response model for the list dsc nodes operation. */
export interface _DscNodeListResult {
  /** Gets or sets a list of dsc nodes. */
  value?: DscNode[];
  /** Gets or sets the next link. */
  nextLink?: string;
  /** Gets the total number of nodes matching filter criteria. */
  totalCount?: number;
}

export function _dscNodeListResultDeserializer(item: any): _DscNodeListResult {
  return {
    value: !item["value"] ? item["value"] : dscNodeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    totalCount: item["totalCount"],
  };
}

export function dscNodeArrayDeserializer(result: Array<DscNode>): any[] {
  return result.map((item) => {
    return dscNodeDeserializer(item);
  });
}

/** The response model for the list dsc nodes operation. */
export interface _DscNodeReportListResult {
  /** The DscNodeReport items on this page */
  value: DscNodeReport[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dscNodeReportListResultDeserializer(item: any): _DscNodeReportListResult {
  return {
    value: dscNodeReportArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dscNodeReportArrayDeserializer(result: Array<DscNodeReport>): any[] {
  return result.map((item) => {
    return dscNodeReportDeserializer(item);
  });
}

/** Definition of the dsc node report type. */
export interface DscNodeReport {
  /** Gets or sets the end time of the node report. */
  endTime?: Date;
  /** Gets or sets the lastModifiedTime of the node report. */
  lastModifiedTime?: Date;
  /** Gets or sets the start time of the node report. */
  startTime?: Date;
  /** Gets or sets the type of the node report. */
  type?: string;
  /** Gets or sets the id of the node report. */
  reportId?: string;
  /** Gets or sets the status of the node report. */
  status?: string;
  /** Gets or sets the refreshMode of the node report. */
  refreshMode?: string;
  /** Gets or sets the rebootRequested of the node report. */
  rebootRequested?: string;
  /** Gets or sets the reportFormatVersion of the node report. */
  reportFormatVersion?: string;
  /** Gets or sets the configurationVersion of the node report. */
  configurationVersion?: string;
  /** Gets or sets the id. */
  id?: string;
  /** Gets or sets the errors for the node report. */
  errors?: DscReportError[];
  /** Gets or sets the resource for the node report. */
  resources?: DscReportResource[];
  /** Gets or sets the metaConfiguration of the node at the time of the report. */
  metaConfiguration?: DscMetaConfiguration;
  /** Gets or sets the hostname of the node that sent the report. */
  hostName?: string;
  /** Gets or sets the IPv4 address of the node that sent the report. */
  iPV4Addresses?: string[];
  /** Gets or sets the IPv6 address of the node that sent the report. */
  iPV6Addresses?: string[];
  /** Gets or sets the number of resource in the node report. */
  numberOfResources?: number;
  /** Gets or sets the unparsed errors for the node report. */
  rawErrors?: string;
}

export function dscNodeReportDeserializer(item: any): DscNodeReport {
  return {
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    type: item["type"],
    reportId: item["reportId"],
    status: item["status"],
    refreshMode: item["refreshMode"],
    rebootRequested: item["rebootRequested"],
    reportFormatVersion: item["reportFormatVersion"],
    configurationVersion: item["configurationVersion"],
    id: item["id"],
    errors: !item["errors"] ? item["errors"] : dscReportErrorArrayDeserializer(item["errors"]),
    resources: !item["resources"]
      ? item["resources"]
      : dscReportResourceArrayDeserializer(item["resources"]),
    metaConfiguration: !item["metaConfiguration"]
      ? item["metaConfiguration"]
      : dscMetaConfigurationDeserializer(item["metaConfiguration"]),
    hostName: item["hostName"],
    iPV4Addresses: !item["iPV4Addresses"]
      ? item["iPV4Addresses"]
      : item["iPV4Addresses"].map((p: any) => {
          return p;
        }),
    iPV6Addresses: !item["iPV6Addresses"]
      ? item["iPV6Addresses"]
      : item["iPV6Addresses"].map((p: any) => {
          return p;
        }),
    numberOfResources: item["numberOfResources"],
    rawErrors: item["rawErrors"],
  };
}

export function dscReportErrorArrayDeserializer(result: Array<DscReportError>): any[] {
  return result.map((item) => {
    return dscReportErrorDeserializer(item);
  });
}

/** Definition of the dsc node report error type. */
export interface DscReportError {
  /** Gets or sets the source of the error. */
  errorSource?: string;
  /** Gets or sets the resource ID which generated the error. */
  resourceId?: string;
  /** Gets or sets the error code. */
  errorCode?: string;
  /** Gets or sets the error message. */
  errorMessage?: string;
  /** Gets or sets the locale of the error. */
  locale?: string;
  /** Gets or sets the error details. */
  errorDetails?: string;
}

export function dscReportErrorDeserializer(item: any): DscReportError {
  return {
    errorSource: item["errorSource"],
    resourceId: item["resourceId"],
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    locale: item["locale"],
    errorDetails: item["errorDetails"],
  };
}

export function dscReportResourceArrayDeserializer(result: Array<DscReportResource>): any[] {
  return result.map((item) => {
    return dscReportResourceDeserializer(item);
  });
}

/** Definition of the DSC Report Resource. */
export interface DscReportResource {
  /** Gets or sets the ID of the resource. */
  resourceId?: string;
  /** Gets or sets the source info of the resource. */
  sourceInfo?: string;
  /** Gets or sets the Resource Navigation values for resources the resource depends on. */
  dependsOn?: DscReportResourceNavigation[];
  /** Gets or sets the module name of the resource. */
  moduleName?: string;
  /** Gets or sets the module version of the resource. */
  moduleVersion?: string;
  /** Gets or sets the name of the resource. */
  resourceName?: string;
  /** Gets or sets the error of the resource. */
  error?: string;
  /** Gets or sets the status of the resource. */
  status?: string;
  /** Gets or sets the duration in seconds for the resource. */
  durationInSeconds?: number;
  /** Gets or sets the start date of the resource. */
  startDate?: Date;
}

export function dscReportResourceDeserializer(item: any): DscReportResource {
  return {
    resourceId: item["resourceId"],
    sourceInfo: item["sourceInfo"],
    dependsOn: !item["dependsOn"]
      ? item["dependsOn"]
      : dscReportResourceNavigationArrayDeserializer(item["dependsOn"]),
    moduleName: item["moduleName"],
    moduleVersion: item["moduleVersion"],
    resourceName: item["resourceName"],
    error: item["error"],
    status: item["status"],
    durationInSeconds: item["durationInSeconds"],
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
  };
}

export function dscReportResourceNavigationArrayDeserializer(
  result: Array<DscReportResourceNavigation>,
): any[] {
  return result.map((item) => {
    return dscReportResourceNavigationDeserializer(item);
  });
}

/** Navigation for DSC Report Resource. */
export interface DscReportResourceNavigation {
  /** Gets or sets the ID of the resource to navigate to. */
  resourceId?: string;
}

export function dscReportResourceNavigationDeserializer(item: any): DscReportResourceNavigation {
  return {
    resourceId: item["resourceId"],
  };
}

/** Definition of the DSC Meta Configuration. */
export interface DscMetaConfiguration {
  /** Gets or sets the ConfigurationModeFrequencyMins value of the meta configuration. */
  configurationModeFrequencyMins?: number;
  /** Gets or sets the RebootNodeIfNeeded value of the meta configuration. */
  rebootNodeIfNeeded?: boolean;
  /** Gets or sets the ConfigurationMode value of the meta configuration. */
  configurationMode?: string;
  /** Gets or sets the ActionAfterReboot value of the meta configuration. */
  actionAfterReboot?: string;
  /** Gets or sets the CertificateId value of the meta configuration. */
  certificateId?: string;
  /** Gets or sets the RefreshFrequencyMins value of the meta configuration. */
  refreshFrequencyMins?: number;
  /** Gets or sets the AllowModuleOverwrite value of the meta configuration. */
  allowModuleOverwrite?: boolean;
}

export function dscMetaConfigurationDeserializer(item: any): DscMetaConfiguration {
  return {
    configurationModeFrequencyMins: item["configurationModeFrequencyMins"],
    rebootNodeIfNeeded: item["rebootNodeIfNeeded"],
    configurationMode: item["configurationMode"],
    actionAfterReboot: item["actionAfterReboot"],
    certificateId: item["certificateId"],
    refreshFrequencyMins: item["refreshFrequencyMins"],
    allowModuleOverwrite: item["allowModuleOverwrite"],
  };
}

/** Definition of the certificate. */
export interface Certificate extends ProxyResource {
  /** Gets the thumbprint of the certificate. */
  readonly thumbprint?: string;
  /** Gets the expiry time of the certificate. */
  readonly expiryTime?: Date;
  /** Gets the is exportable flag of the certificate. */
  readonly isExportable?: boolean;
  /** Gets the creation time. */
  readonly creationTime?: Date;
  /** Gets the last modified time. */
  readonly lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
}

export function certificateDeserializer(item: any): Certificate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _certificatePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the certificate. */
export interface CertificateProperties {
  /** Gets the thumbprint of the certificate. */
  readonly thumbprint?: string;
  /** Gets the expiry time of the certificate. */
  readonly expiryTime?: Date;
  /** Gets the is exportable flag of the certificate. */
  readonly isExportable?: boolean;
  /** Gets the creation time. */
  readonly creationTime?: Date;
  /** Gets the last modified time. */
  readonly lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
}

export function certificatePropertiesDeserializer(item: any): CertificateProperties {
  return {
    thumbprint: item["thumbprint"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    isExportable: item["isExportable"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
  };
}

/** The parameters supplied to the create or update or replace certificate operation. */
export interface CertificateCreateOrUpdateParameters {
  /** Gets or sets the name of the certificate. */
  name: string;
  /** Gets or sets the base64 encoded value of the certificate. */
  base64Value: string;
  /** Gets or sets the description of the certificate. */
  description?: string;
  /** Gets or sets the thumbprint of the certificate. */
  thumbprint?: string;
  /** Gets or sets the is exportable flag of the certificate. */
  isExportable?: boolean;
}

export function certificateCreateOrUpdateParametersSerializer(
  item: CertificateCreateOrUpdateParameters,
): any {
  return {
    name: item["name"],
    properties: _certificateCreateOrUpdateParametersPropertiesSerializer(item),
  };
}

/** The properties of the create certificate operation. */
export interface CertificateCreateOrUpdateProperties {
  /** Gets or sets the base64 encoded value of the certificate. */
  base64Value: string;
  /** Gets or sets the description of the certificate. */
  description?: string;
  /** Gets or sets the thumbprint of the certificate. */
  thumbprint?: string;
  /** Gets or sets the is exportable flag of the certificate. */
  isExportable?: boolean;
}

export function certificateCreateOrUpdatePropertiesSerializer(
  item: CertificateCreateOrUpdateProperties,
): any {
  return {
    base64Value: item["base64Value"],
    description: item["description"],
    thumbprint: item["thumbprint"],
    isExportable: item["isExportable"],
  };
}

/** The parameters supplied to the update certificate operation. */
export interface CertificateUpdateParameters {
  /** Gets or sets the name of the certificate. */
  name?: string;
  /** Gets or sets the description of the certificate. */
  description?: string;
}

export function certificateUpdateParametersSerializer(item: CertificateUpdateParameters): any {
  return {
    name: item["name"],
    properties: areAllPropsUndefined(item, ["description"])
      ? undefined
      : _certificateUpdateParametersPropertiesSerializer(item),
  };
}

/** The properties of the update certificate operation */
export interface CertificateUpdateProperties {
  /** Gets or sets the description of the certificate. */
  description?: string;
}

export function certificateUpdatePropertiesSerializer(item: CertificateUpdateProperties): any {
  return { description: item["description"] };
}

/** The response of a Certificate list operation. */
export interface _CertificateListResult {
  /** The Certificate items on this page */
  value: Certificate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _certificateListResultDeserializer(item: any): _CertificateListResult {
  return {
    value: certificateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function certificateArrayDeserializer(result: Array<Certificate>): any[] {
  return result.map((item) => {
    return certificateDeserializer(item);
  });
}

/** Definition of the connection. */
export interface Connection extends ProxyResource {
  /** Gets or sets the connectionType of the connection. */
  connectionType?: ConnectionTypeAssociationProperty;
  /** Gets the field definition values of the connection. */
  readonly fieldDefinitionValues?: Record<string, string>;
  /** Gets the creation time. */
  readonly creationTime?: Date;
  /** Gets the last modified time. */
  readonly lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
}

export function connectionDeserializer(item: any): Connection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _connectionPropertiesDeserializer(item["properties"])),
  };
}

/** Definition of the connection properties. */
export interface ConnectionProperties {
  /** Gets or sets the connectionType of the connection. */
  connectionType?: ConnectionTypeAssociationProperty;
  /** Gets the field definition values of the connection. */
  readonly fieldDefinitionValues?: Record<string, string>;
  /** Gets the creation time. */
  readonly creationTime?: Date;
  /** Gets the last modified time. */
  readonly lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
}

export function connectionPropertiesDeserializer(item: any): ConnectionProperties {
  return {
    connectionType: !item["connectionType"]
      ? item["connectionType"]
      : connectionTypeAssociationPropertyDeserializer(item["connectionType"]),
    fieldDefinitionValues: !item["fieldDefinitionValues"]
      ? item["fieldDefinitionValues"]
      : Object.fromEntries(
          Object.entries(item["fieldDefinitionValues"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
  };
}

/** The connection type property associated with the entity. */
export interface ConnectionTypeAssociationProperty {
  /** Gets or sets the name of the connection type. */
  name?: string;
}

export function connectionTypeAssociationPropertySerializer(
  item: ConnectionTypeAssociationProperty,
): any {
  return { name: item["name"] };
}

export function connectionTypeAssociationPropertyDeserializer(
  item: any,
): ConnectionTypeAssociationProperty {
  return {
    name: item["name"],
  };
}

/** The parameters supplied to the create or update connection operation. */
export interface ConnectionCreateOrUpdateParameters {
  /** Gets or sets the name of the connection. */
  name: string;
  /** Gets or sets the description of the connection. */
  description?: string;
  /** Gets or sets the connectionType of the connection. */
  connectionType: ConnectionTypeAssociationProperty;
  /** Gets or sets the field definition properties of the connection. */
  fieldDefinitionValues?: Record<string, string>;
}

export function connectionCreateOrUpdateParametersSerializer(
  item: ConnectionCreateOrUpdateParameters,
): any {
  return {
    name: item["name"],
    properties: _connectionCreateOrUpdateParametersPropertiesSerializer(item),
  };
}

/** The properties of the create connection properties */
export interface ConnectionCreateOrUpdateProperties {
  /** Gets or sets the description of the connection. */
  description?: string;
  /** Gets or sets the connectionType of the connection. */
  connectionType: ConnectionTypeAssociationProperty;
  /** Gets or sets the field definition properties of the connection. */
  fieldDefinitionValues?: Record<string, string>;
}

export function connectionCreateOrUpdatePropertiesSerializer(
  item: ConnectionCreateOrUpdateProperties,
): any {
  return {
    description: item["description"],
    connectionType: connectionTypeAssociationPropertySerializer(item["connectionType"]),
    fieldDefinitionValues: item["fieldDefinitionValues"],
  };
}

/** The parameters supplied to the update connection operation. */
export interface ConnectionUpdateParameters {
  /** Gets or sets the name of the connection. */
  name?: string;
  /** Gets or sets the description of the connection. */
  description?: string;
  /** Gets or sets the field definition values of the connection. */
  fieldDefinitionValues?: Record<string, string>;
}

export function connectionUpdateParametersSerializer(item: ConnectionUpdateParameters): any {
  return {
    name: item["name"],
    properties: areAllPropsUndefined(item, ["description", "fieldDefinitionValues"])
      ? undefined
      : _connectionUpdateParametersPropertiesSerializer(item),
  };
}

/** The properties of the update connection operation. */
export interface ConnectionUpdateProperties {
  /** Gets or sets the description of the connection. */
  description?: string;
  /** Gets or sets the field definition values of the connection. */
  fieldDefinitionValues?: Record<string, string>;
}

export function connectionUpdatePropertiesSerializer(item: ConnectionUpdateProperties): any {
  return { description: item["description"], fieldDefinitionValues: item["fieldDefinitionValues"] };
}

/** The response of a Connection list operation. */
export interface _ConnectionListResult {
  /** The Connection items on this page */
  value: Connection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _connectionListResultDeserializer(item: any): _ConnectionListResult {
  return {
    value: connectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function connectionArrayDeserializer(result: Array<Connection>): any[] {
  return result.map((item) => {
    return connectionDeserializer(item);
  });
}

/** Definition of the connection type. */
export interface ConnectionType extends ProxyResource {
  /** Gets or sets a Boolean value to indicate if the connection type is global. */
  isGlobal?: boolean;
  /** Gets the field definitions of the connection type. */
  readonly fieldDefinitions?: Record<string, FieldDefinition>;
  /** Gets the creation time. */
  readonly creationTime?: Date;
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
}

export function connectionTypeDeserializer(item: any): ConnectionType {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _connectionTypePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the connection type. */
export interface ConnectionTypeProperties {
  /** Gets or sets a Boolean value to indicate if the connection type is global. */
  isGlobal?: boolean;
  /** Gets the field definitions of the connection type. */
  readonly fieldDefinitions?: Record<string, FieldDefinition>;
  /** Gets the creation time. */
  readonly creationTime?: Date;
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
}

export function connectionTypePropertiesDeserializer(item: any): ConnectionTypeProperties {
  return {
    isGlobal: item["isGlobal"],
    fieldDefinitions: !item["fieldDefinitions"]
      ? item["fieldDefinitions"]
      : fieldDefinitionRecordDeserializer(item["fieldDefinitions"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
  };
}

export function fieldDefinitionRecordSerializer(
  item: Record<string, FieldDefinition>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : fieldDefinitionSerializer(item[key]);
  });
  return result;
}

export function fieldDefinitionRecordDeserializer(
  item: Record<string, any>,
): Record<string, FieldDefinition> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : fieldDefinitionDeserializer(item[key]);
  });
  return result;
}

/** Definition of the connection fields. */
export interface FieldDefinition {
  /** Gets or sets the isEncrypted flag of the connection field definition. */
  isEncrypted?: boolean;
  /** Gets or sets the isOptional flag of the connection field definition. */
  isOptional?: boolean;
  /** Gets or sets the type of the connection field definition. */
  type: string;
}

export function fieldDefinitionSerializer(item: FieldDefinition): any {
  return { isEncrypted: item["isEncrypted"], isOptional: item["isOptional"], type: item["type"] };
}

export function fieldDefinitionDeserializer(item: any): FieldDefinition {
  return {
    isEncrypted: item["isEncrypted"],
    isOptional: item["isOptional"],
    type: item["type"],
  };
}

/** The parameters supplied to the create or update connection type operation. */
export interface ConnectionTypeCreateOrUpdateParameters {
  /** Gets or sets the name of the connection type. */
  name: string;
  /** Gets or sets a Boolean value to indicate if the connection type is global. */
  isGlobal?: boolean;
  /** Gets or sets the field definitions of the connection type. */
  fieldDefinitions: Record<string, FieldDefinition>;
}

export function connectionTypeCreateOrUpdateParametersSerializer(
  item: ConnectionTypeCreateOrUpdateParameters,
): any {
  return {
    name: item["name"],
    properties: _connectionTypeCreateOrUpdateParametersPropertiesSerializer(item),
  };
}

/** The properties of the create connection type. */
export interface ConnectionTypeCreateOrUpdateProperties {
  /** Gets or sets a Boolean value to indicate if the connection type is global. */
  isGlobal?: boolean;
  /** Gets or sets the field definitions of the connection type. */
  fieldDefinitions: Record<string, FieldDefinition>;
}

export function connectionTypeCreateOrUpdatePropertiesSerializer(
  item: ConnectionTypeCreateOrUpdateProperties,
): any {
  return {
    isGlobal: item["isGlobal"],
    fieldDefinitions: fieldDefinitionRecordSerializer(item["fieldDefinitions"]),
  };
}

/** The response of a ConnectionType list operation. */
export interface _ConnectionTypeListResult {
  /** The ConnectionType items on this page */
  value: ConnectionType[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _connectionTypeListResultDeserializer(item: any): _ConnectionTypeListResult {
  return {
    value: connectionTypeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function connectionTypeArrayDeserializer(result: Array<ConnectionType>): any[] {
  return result.map((item) => {
    return connectionTypeDeserializer(item);
  });
}

/** Definition of the credential. */
export interface Credential extends ProxyResource {
  /** Gets the user name of the credential. */
  readonly userName?: string;
  /** Gets the creation time. */
  readonly creationTime?: Date;
  /** Gets the last modified time. */
  readonly lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
}

export function credentialDeserializer(item: any): Credential {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _credentialPropertiesDeserializer(item["properties"])),
  };
}

/** Definition of the credential properties */
export interface CredentialProperties {
  /** Gets the user name of the credential. */
  readonly userName?: string;
  /** Gets the creation time. */
  readonly creationTime?: Date;
  /** Gets the last modified time. */
  readonly lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
}

export function credentialPropertiesDeserializer(item: any): CredentialProperties {
  return {
    userName: item["userName"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
  };
}

/** The parameters supplied to the create or update credential operation. */
export interface CredentialCreateOrUpdateParameters {
  /** Gets or sets the name of the credential. */
  name: string;
  /** Gets or sets the user name of the credential. */
  userName: string;
  /** Gets or sets the password of the credential. */
  password: string;
  /** Gets or sets the description of the credential. */
  description?: string;
}

export function credentialCreateOrUpdateParametersSerializer(
  item: CredentialCreateOrUpdateParameters,
): any {
  return {
    name: item["name"],
    properties: _credentialCreateOrUpdateParametersPropertiesSerializer(item),
  };
}

/** The properties of the create credential operation. */
export interface CredentialCreateOrUpdateProperties {
  /** Gets or sets the user name of the credential. */
  userName: string;
  /** Gets or sets the password of the credential. */
  password: string;
  /** Gets or sets the description of the credential. */
  description?: string;
}

export function credentialCreateOrUpdatePropertiesSerializer(
  item: CredentialCreateOrUpdateProperties,
): any {
  return {
    userName: item["userName"],
    password: item["password"],
    description: item["description"],
  };
}

/** The parameters supplied to the Update credential operation. */
export interface CredentialUpdateParameters {
  /** Gets or sets the name of the credential. */
  name?: string;
  /** Gets or sets the user name of the credential. */
  userName?: string;
  /** Gets or sets the password of the credential. */
  password?: string;
  /** Gets or sets the description of the credential. */
  description?: string;
}

export function credentialUpdateParametersSerializer(item: CredentialUpdateParameters): any {
  return {
    name: item["name"],
    properties: areAllPropsUndefined(item, ["userName", "password", "description"])
      ? undefined
      : _credentialUpdateParametersPropertiesSerializer(item),
  };
}

/** The properties of the Update credential */
export interface CredentialUpdateProperties {
  /** Gets or sets the user name of the credential. */
  userName?: string;
  /** Gets or sets the password of the credential. */
  password?: string;
  /** Gets or sets the description of the credential. */
  description?: string;
}

export function credentialUpdatePropertiesSerializer(item: CredentialUpdateProperties): any {
  return {
    userName: item["userName"],
    password: item["password"],
    description: item["description"],
  };
}

/** The response of a Credential list operation. */
export interface _CredentialListResult {
  /** The Credential items on this page */
  value: Credential[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _credentialListResultDeserializer(item: any): _CredentialListResult {
  return {
    value: credentialArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function credentialArrayDeserializer(result: Array<Credential>): any[] {
  return result.map((item) => {
    return credentialDeserializer(item);
  });
}

/** Definition of the configuration type. */
export interface DscConfiguration extends TrackedResource {
  /** Gets or sets the etag of the resource. */
  etag?: string;
  /** Gets or sets the provisioning state of the configuration. */
  provisioningState?: "Succeeded";
  /** Gets or sets the job count of the configuration. */
  jobCount?: number;
  /** Gets or sets the configuration parameters. */
  parameters?: Record<string, DscConfigurationParameter>;
  /** Gets or sets the source. */
  source?: ContentSource;
  /** Gets or sets the state of the configuration. */
  state?: DscConfigurationState;
  /** Gets or sets verbose log option. */
  logVerbose?: boolean;
  /** Gets or sets the creation time. */
  creationTime?: Date;
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Gets the number of compiled node configurations. */
  nodeConfigurationCount?: number;
  /** Gets or sets the description. */
  description?: string;
}

export function dscConfigurationDeserializer(item: any): DscConfiguration {
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
      : _dscConfigurationPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Definition of the configuration property type. */
export interface DscConfigurationProperties {
  /** Gets or sets the provisioning state of the configuration. */
  provisioningState?: "Succeeded";
  /** Gets or sets the job count of the configuration. */
  jobCount?: number;
  /** Gets or sets the configuration parameters. */
  parameters?: Record<string, DscConfigurationParameter>;
  /** Gets or sets the source. */
  source?: ContentSource;
  /** Gets or sets the state of the configuration. */
  state?: DscConfigurationState;
  /** Gets or sets verbose log option. */
  logVerbose?: boolean;
  /** Gets or sets the creation time. */
  creationTime?: Date;
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Gets the number of compiled node configurations. */
  nodeConfigurationCount?: number;
  /** Gets or sets the description. */
  description?: string;
}

export function dscConfigurationPropertiesDeserializer(item: any): DscConfigurationProperties {
  return {
    provisioningState: item["provisioningState"],
    jobCount: item["jobCount"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : dscConfigurationParameterRecordDeserializer(item["parameters"]),
    source: !item["source"] ? item["source"] : contentSourceDeserializer(item["source"]),
    state: item["state"],
    logVerbose: item["logVerbose"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    nodeConfigurationCount: item["nodeConfigurationCount"],
    description: item["description"],
  };
}

export function dscConfigurationParameterRecordSerializer(
  item: Record<string, DscConfigurationParameter>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : dscConfigurationParameterSerializer(item[key]);
  });
  return result;
}

export function dscConfigurationParameterRecordDeserializer(
  item: Record<string, any>,
): Record<string, DscConfigurationParameter> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : dscConfigurationParameterDeserializer(item[key]);
  });
  return result;
}

/** Definition of the configuration parameter type. */
export interface DscConfigurationParameter {
  /** Gets or sets the type of the parameter. */
  type?: string;
  /** Gets or sets a Boolean value to indicate whether the parameter is mandatory or not. */
  isMandatory?: boolean;
  /** Get or sets the position of the parameter. */
  position?: number;
  /** Gets or sets the default value of parameter. */
  defaultValue?: string;
}

export function dscConfigurationParameterSerializer(item: DscConfigurationParameter): any {
  return {
    type: item["type"],
    isMandatory: item["isMandatory"],
    position: item["position"],
    defaultValue: item["defaultValue"],
  };
}

export function dscConfigurationParameterDeserializer(item: any): DscConfigurationParameter {
  return {
    type: item["type"],
    isMandatory: item["isMandatory"],
    position: item["position"],
    defaultValue: item["defaultValue"],
  };
}

/** Definition of the content source. */
export interface ContentSource {
  /** Gets or sets the hash. */
  hash?: ContentHash;
  /** Gets or sets the content source type. */
  type?: ContentSourceType;
  /** Gets or sets the value of the content. This is based on the content source type. */
  value?: string;
  /** Gets or sets the version of the content. */
  version?: string;
}

export function contentSourceSerializer(item: ContentSource): any {
  return {
    hash: !item["hash"] ? item["hash"] : contentHashSerializer(item["hash"]),
    type: item["type"],
    value: item["value"],
    version: item["version"],
  };
}

export function contentSourceDeserializer(item: any): ContentSource {
  return {
    hash: !item["hash"] ? item["hash"] : contentHashDeserializer(item["hash"]),
    type: item["type"],
    value: item["value"],
    version: item["version"],
  };
}

/** Gets or sets the content source type. */
export enum KnownContentSourceType {
  /** embeddedContent */
  EmbeddedContent = "embeddedContent",
  /** uri */
  Uri = "uri",
}

/**
 * Gets or sets the content source type. \
 * {@link KnownContentSourceType} can be used interchangeably with ContentSourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **embeddedContent**: embeddedContent \
 * **uri**: uri
 */
export type ContentSourceType = string;

/** Gets or sets the state of the configuration. */
export enum KnownDscConfigurationState {
  /** New */
  New = "New",
  /** Edit */
  Edit = "Edit",
  /** Published */
  Published = "Published",
}

/**
 * Gets or sets the state of the configuration. \
 * {@link KnownDscConfigurationState} can be used interchangeably with DscConfigurationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **New**: New \
 * **Edit**: Edit \
 * **Published**: Published
 */
export type DscConfigurationState = string;

/** The parameters supplied to the create or update configuration operation. */
export interface DscConfigurationCreateOrUpdateParameters {
  /** Gets or sets name of the resource. */
  name?: string;
  /** Gets or sets the location of the resource. */
  location?: string;
  /** Gets or sets the tags attached to the resource. */
  tags?: Record<string, string>;
  /** Gets or sets verbose log option. */
  logVerbose?: boolean;
  /** Gets or sets progress log option. */
  logProgress?: boolean;
  /** Gets or sets the source. */
  source: ContentSource;
  /** Gets or sets the configuration parameters. */
  parameters?: Record<string, DscConfigurationParameter>;
  /** Gets or sets the description of the configuration. */
  description?: string;
}

export function dscConfigurationCreateOrUpdateParametersSerializer(
  item: DscConfigurationCreateOrUpdateParameters,
): any {
  return {
    properties: _dscConfigurationCreateOrUpdateParametersPropertiesSerializer(item),
    name: item["name"],
    location: item["location"],
    tags: item["tags"],
  };
}

/** The properties to create or update configuration. */
export interface DscConfigurationCreateOrUpdateProperties {
  /** Gets or sets verbose log option. */
  logVerbose?: boolean;
  /** Gets or sets progress log option. */
  logProgress?: boolean;
  /** Gets or sets the source. */
  source: ContentSource;
  /** Gets or sets the configuration parameters. */
  parameters?: Record<string, DscConfigurationParameter>;
  /** Gets or sets the description of the configuration. */
  description?: string;
}

export function dscConfigurationCreateOrUpdatePropertiesSerializer(
  item: DscConfigurationCreateOrUpdateProperties,
): any {
  return {
    logVerbose: item["logVerbose"],
    logProgress: item["logProgress"],
    source: contentSourceSerializer(item["source"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : dscConfigurationParameterRecordSerializer(item["parameters"]),
    description: item["description"],
  };
}

/** The parameters supplied to the create or update configuration operation. */
export interface DscConfigurationUpdateParameters {
  /** Gets or sets name of the resource. */
  name?: string;
  /** Gets or sets the tags attached to the resource. */
  tags?: Record<string, string>;
  /** Gets or sets verbose log option. */
  logVerbose?: boolean;
  /** Gets or sets progress log option. */
  logProgress?: boolean;
  /** Gets or sets the source. */
  source?: ContentSource;
  /** Gets or sets the configuration parameters. */
  parameters?: Record<string, DscConfigurationParameter>;
  /** Gets or sets the description of the configuration. */
  description?: string;
}

export function dscConfigurationUpdateParametersSerializer(
  item: DscConfigurationUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "logVerbose",
      "logProgress",
      "source",
      "parameters",
      "description",
    ])
      ? undefined
      : _dscConfigurationUpdateParametersPropertiesSerializer(item),
    name: item["name"],
    tags: item["tags"],
  };
}

/** The response model for the list configuration operation. */
export interface _DscConfigurationListResult {
  /** Gets or sets a list of configurations. */
  value?: DscConfiguration[];
  /** Gets or sets the next link. */
  nextLink?: string;
  /** Gets the total number of configurations matching filter criteria. */
  totalCount?: number;
}

export function _dscConfigurationListResultDeserializer(item: any): _DscConfigurationListResult {
  return {
    value: !item["value"] ? item["value"] : dscConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    totalCount: item["totalCount"],
  };
}

export function dscConfigurationArrayDeserializer(result: Array<DscConfiguration>): any[] {
  return result.map((item) => {
    return dscConfigurationDeserializer(item);
  });
}

/** Definition of the dsc node configuration. */
export interface DscNodeConfiguration extends ProxyResource {
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Gets or sets creation time. */
  creationTime?: Date;
  /** Gets or sets the configuration of the node. */
  configuration?: DscConfigurationAssociationProperty;
  /** Source of node configuration. */
  source?: string;
  /** Number of nodes with this node configuration assigned */
  nodeCount?: number;
  /** If a new build version of NodeConfiguration is required. */
  incrementNodeConfigurationBuild?: boolean;
}

export function dscNodeConfigurationDeserializer(item: any): DscNodeConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _dscNodeConfigurationPropertiesDeserializer(item["properties"])),
  };
}

/** Properties for the DscNodeConfiguration */
export interface DscNodeConfigurationProperties {
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Gets or sets creation time. */
  creationTime?: Date;
  /** Gets or sets the configuration of the node. */
  configuration?: DscConfigurationAssociationProperty;
  /** Source of node configuration. */
  source?: string;
  /** Number of nodes with this node configuration assigned */
  nodeCount?: number;
  /** If a new build version of NodeConfiguration is required. */
  incrementNodeConfigurationBuild?: boolean;
}

export function dscNodeConfigurationPropertiesDeserializer(
  item: any,
): DscNodeConfigurationProperties {
  return {
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    configuration: !item["configuration"]
      ? item["configuration"]
      : dscConfigurationAssociationPropertyDeserializer(item["configuration"]),
    source: item["source"],
    nodeCount: item["nodeCount"],
    incrementNodeConfigurationBuild: item["incrementNodeConfigurationBuild"],
  };
}

/** The Dsc configuration property associated with the entity. */
export interface DscConfigurationAssociationProperty {
  /** Gets or sets the name of the Dsc configuration. */
  name?: string;
}

export function dscConfigurationAssociationPropertySerializer(
  item: DscConfigurationAssociationProperty,
): any {
  return { name: item["name"] };
}

export function dscConfigurationAssociationPropertyDeserializer(
  item: any,
): DscConfigurationAssociationProperty {
  return {
    name: item["name"],
  };
}

/** The parameters supplied to the create or update node configuration operation. */
export interface DscNodeConfigurationCreateOrUpdateParameters {
  /** Name of the node configuration. */
  name?: string;
  /** Gets or sets the tags attached to the resource. */
  tags?: Record<string, string>;
  /** Gets or sets the source. */
  source?: ContentSource;
  /** Gets or sets the configuration of the node. */
  configuration?: DscConfigurationAssociationProperty;
  /** If a new build version of NodeConfiguration is required. */
  incrementNodeConfigurationBuild?: boolean;
}

export function dscNodeConfigurationCreateOrUpdateParametersSerializer(
  item: DscNodeConfigurationCreateOrUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "source",
      "configuration",
      "incrementNodeConfigurationBuild",
    ])
      ? undefined
      : _dscNodeConfigurationCreateOrUpdateParametersPropertiesSerializer(item),
    name: item["name"],
    tags: item["tags"],
  };
}

/** The parameter properties supplied to the create or update node configuration operation. */
export interface DscNodeConfigurationCreateOrUpdateParametersProperties {
  /** Gets or sets the source. */
  source: ContentSource;
  /** Gets or sets the configuration of the node. */
  configuration: DscConfigurationAssociationProperty;
  /** If a new build version of NodeConfiguration is required. */
  incrementNodeConfigurationBuild?: boolean;
}

export function dscNodeConfigurationCreateOrUpdateParametersPropertiesSerializer(
  item: DscNodeConfigurationCreateOrUpdateParametersProperties,
): any {
  return {
    source: contentSourceSerializer(item["source"]),
    configuration: dscConfigurationAssociationPropertySerializer(item["configuration"]),
    incrementNodeConfigurationBuild: item["incrementNodeConfigurationBuild"],
  };
}

/** The response model for the list job operation. */
export interface _DscNodeConfigurationListResult {
  /** Gets or sets a list of Dsc node configurations. */
  value?: DscNodeConfiguration[];
  /** Gets or sets the next link. */
  nextLink?: string;
  /** Gets or sets the total rows in query. */
  totalCount?: number;
}

export function _dscNodeConfigurationListResultDeserializer(
  item: any,
): _DscNodeConfigurationListResult {
  return {
    value: !item["value"] ? item["value"] : dscNodeConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    totalCount: item["totalCount"],
  };
}

export function dscNodeConfigurationArrayDeserializer(result: Array<DscNodeConfiguration>): any[] {
  return result.map((item) => {
    return dscNodeConfigurationDeserializer(item);
  });
}

/** Definition of hybrid runbook worker group. */
export interface HybridRunbookWorkerGroup extends TrackedResource {
  /** Type of the HybridWorkerGroup. */
  groupType?: GroupTypeEnum;
  /** Sets the credential of a worker group. */
  credential?: RunAsCredentialAssociationProperty;
}

export function hybridRunbookWorkerGroupDeserializer(item: any): HybridRunbookWorkerGroup {
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
      : _hybridRunbookWorkerGroupPropertiesDeserializer(item["properties"])),
  };
}

/** Definition of hybrid runbook worker group property. */
export interface HybridRunbookWorkerGroupProperties {
  /** Type of the HybridWorkerGroup. */
  groupType?: GroupTypeEnum;
  /** Sets the credential of a worker group. */
  credential?: RunAsCredentialAssociationProperty;
}

export function hybridRunbookWorkerGroupPropertiesDeserializer(
  item: any,
): HybridRunbookWorkerGroupProperties {
  return {
    groupType: item["groupType"],
    credential: !item["credential"]
      ? item["credential"]
      : runAsCredentialAssociationPropertyDeserializer(item["credential"]),
  };
}

/** Type of the HybridWorkerGroup. */
export enum KnownGroupTypeEnum {
  /** User */
  User = "User",
  /** System */
  System = "System",
}

/**
 * Type of the HybridWorkerGroup. \
 * {@link KnownGroupTypeEnum} can be used interchangeably with GroupTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: User \
 * **System**: System
 */
export type GroupTypeEnum = string;

/** Definition of RunAs credential to use for hybrid worker. */
export interface RunAsCredentialAssociationProperty {
  /** Gets or sets the name of the credential. */
  name?: string;
}

export function runAsCredentialAssociationPropertySerializer(
  item: RunAsCredentialAssociationProperty,
): any {
  return { name: item["name"] };
}

export function runAsCredentialAssociationPropertyDeserializer(
  item: any,
): RunAsCredentialAssociationProperty {
  return {
    name: item["name"],
  };
}

/** The parameters supplied to the create hybrid runbook worker group operation. */
export interface HybridRunbookWorkerGroupCreateOrUpdateParameters {
  /** Gets or sets the name of the resource. */
  name?: string;
  /** Sets the credential of a worker group. */
  credential?: RunAsCredentialAssociationProperty;
}

export function hybridRunbookWorkerGroupCreateOrUpdateParametersSerializer(
  item: HybridRunbookWorkerGroupCreateOrUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, ["credential"])
      ? undefined
      : _hybridRunbookWorkerGroupCreateOrUpdateParametersPropertiesSerializer(item),
    name: item["name"],
  };
}

/** The hybrid runbook worker group properties. */
export interface HybridRunbookWorkerGroupCreateOrUpdateProperties {
  /** Sets the credential of a worker group. */
  credential?: RunAsCredentialAssociationProperty;
}

export function hybridRunbookWorkerGroupCreateOrUpdatePropertiesSerializer(
  item: HybridRunbookWorkerGroupCreateOrUpdateProperties,
): any {
  return {
    credential: !item["credential"]
      ? item["credential"]
      : runAsCredentialAssociationPropertySerializer(item["credential"]),
  };
}

/** The response of a HybridRunbookWorkerGroup list operation. */
export interface _HybridRunbookWorkerGroupsListResult {
  /** The HybridRunbookWorkerGroup items on this page */
  value: HybridRunbookWorkerGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _hybridRunbookWorkerGroupsListResultDeserializer(
  item: any,
): _HybridRunbookWorkerGroupsListResult {
  return {
    value: hybridRunbookWorkerGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function hybridRunbookWorkerGroupArrayDeserializer(
  result: Array<HybridRunbookWorkerGroup>,
): any[] {
  return result.map((item) => {
    return hybridRunbookWorkerGroupDeserializer(item);
  });
}

/** Definition of the job stream. */
export interface JobStream {
  /** Gets or sets the id of the resource. */
  id?: string;
  /** Gets or sets the id of the job stream. */
  jobStreamId?: string;
  /** Gets or sets the creation time of the job. */
  time?: Date;
  /** Gets or sets the stream type. */
  streamType?: JobStreamType;
  /** Gets or sets the stream text. */
  streamText?: string;
  /** Gets or sets the summary. */
  summary?: string;
  /** Gets or sets the values of the job stream. */
  value?: Record<string, any>;
}

export function jobStreamDeserializer(item: any): JobStream {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _jobStreamPropertiesDeserializer(item["properties"])),
  };
}

/** Definition of the job stream. */
export interface JobStreamProperties {
  /** Gets or sets the id of the job stream. */
  jobStreamId?: string;
  /** Gets or sets the creation time of the job. */
  time?: Date;
  /** Gets or sets the stream type. */
  streamType?: JobStreamType;
  /** Gets or sets the stream text. */
  streamText?: string;
  /** Gets or sets the summary. */
  summary?: string;
  /** Gets or sets the values of the job stream. */
  value?: Record<string, any>;
}

export function jobStreamPropertiesDeserializer(item: any): JobStreamProperties {
  return {
    jobStreamId: item["jobStreamId"],
    time: !item["time"] ? item["time"] : new Date(item["time"]),
    streamType: item["streamType"],
    streamText: item["streamText"],
    summary: item["summary"],
    value: !item["value"]
      ? item["value"]
      : Object.fromEntries(Object.entries(item["value"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Gets or sets the stream type. */
export enum KnownJobStreamType {
  /** Progress */
  Progress = "Progress",
  /** Output */
  Output = "Output",
  /** Warning */
  Warning = "Warning",
  /** Error */
  Error = "Error",
  /** Debug */
  Debug = "Debug",
  /** Verbose */
  Verbose = "Verbose",
  /** Any */
  Any = "Any",
}

/**
 * Gets or sets the stream type. \
 * {@link KnownJobStreamType} can be used interchangeably with JobStreamType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Progress**: Progress \
 * **Output**: Output \
 * **Warning**: Warning \
 * **Error**: Error \
 * **Debug**: Debug \
 * **Verbose**: Verbose \
 * **Any**: Any
 */
export type JobStreamType = string;

/** The response model for the list job stream operation. */
export interface _JobStreamListResult {
  /** The JobStream items on this page */
  value: JobStream[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobStreamListResultDeserializer(item: any): _JobStreamListResult {
  return {
    value: jobStreamArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobStreamArrayDeserializer(result: Array<JobStream>): any[] {
  return result.map((item) => {
    return jobStreamDeserializer(item);
  });
}

/** Definition of the job schedule. */
export interface JobSchedule extends ProxyResource {
  /** Gets or sets the id of job schedule. */
  jobScheduleId?: string;
  /** Gets or sets the schedule. */
  schedule?: ScheduleAssociationProperty;
  /** Gets or sets the runbook. */
  runbook?: RunbookAssociationProperty;
  /** Gets or sets the hybrid worker group that the scheduled job should run on. */
  runOn?: string;
  /** Gets or sets the parameters of the job schedule. */
  parameters?: Record<string, string>;
}

export function jobScheduleDeserializer(item: any): JobSchedule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _jobSchedulePropertiesDeserializer(item["properties"])),
  };
}

/** Definition of job schedule parameters. */
export interface JobScheduleProperties {
  /** Gets or sets the id of job schedule. */
  jobScheduleId?: string;
  /** Gets or sets the schedule. */
  schedule?: ScheduleAssociationProperty;
  /** Gets or sets the runbook. */
  runbook?: RunbookAssociationProperty;
  /** Gets or sets the hybrid worker group that the scheduled job should run on. */
  runOn?: string;
  /** Gets or sets the parameters of the job schedule. */
  parameters?: Record<string, string>;
}

export function jobSchedulePropertiesDeserializer(item: any): JobScheduleProperties {
  return {
    jobScheduleId: item["jobScheduleId"],
    schedule: !item["schedule"]
      ? item["schedule"]
      : scheduleAssociationPropertyDeserializer(item["schedule"]),
    runbook: !item["runbook"]
      ? item["runbook"]
      : runbookAssociationPropertyDeserializer(item["runbook"]),
    runOn: item["runOn"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** The schedule property associated with the entity. */
export interface ScheduleAssociationProperty {
  /** Gets or sets the name of the Schedule. */
  name?: string;
}

export function scheduleAssociationPropertySerializer(item: ScheduleAssociationProperty): any {
  return { name: item["name"] };
}

export function scheduleAssociationPropertyDeserializer(item: any): ScheduleAssociationProperty {
  return {
    name: item["name"],
  };
}

/** The parameters supplied to the create job schedule operation. */
export interface JobScheduleCreateParameters {
  /** Gets or sets the schedule. */
  schedule: ScheduleAssociationProperty;
  /** Gets or sets the runbook. */
  runbook: RunbookAssociationProperty;
  /** Gets or sets the hybrid worker group that the scheduled job should run on. */
  runOn?: string;
  /** Gets or sets a list of job properties. */
  parameters?: Record<string, string>;
}

export function jobScheduleCreateParametersSerializer(item: JobScheduleCreateParameters): any {
  return { properties: _jobScheduleCreateParametersPropertiesSerializer(item) };
}

/** The parameters supplied to the create job schedule operation. */
export interface JobScheduleCreateProperties {
  /** Gets or sets the schedule. */
  schedule: ScheduleAssociationProperty;
  /** Gets or sets the runbook. */
  runbook: RunbookAssociationProperty;
  /** Gets or sets the hybrid worker group that the scheduled job should run on. */
  runOn?: string;
  /** Gets or sets a list of job properties. */
  parameters?: Record<string, string>;
}

export function jobScheduleCreatePropertiesSerializer(item: JobScheduleCreateProperties): any {
  return {
    schedule: scheduleAssociationPropertySerializer(item["schedule"]),
    runbook: runbookAssociationPropertySerializer(item["runbook"]),
    runOn: item["runOn"],
    parameters: item["parameters"],
  };
}

/** The response of a JobSchedule list operation. */
export interface _JobScheduleListResult {
  /** The JobSchedule items on this page */
  value: JobSchedule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobScheduleListResultDeserializer(item: any): _JobScheduleListResult {
  return {
    value: jobScheduleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobScheduleArrayDeserializer(result: Array<JobSchedule>): any[] {
  return result.map((item) => {
    return jobScheduleDeserializer(item);
  });
}

/** The parameters supplied to the create or update module operation. */
export interface ModuleCreateOrUpdateParameters {
  /** Gets or sets name of the resource. */
  name?: string;
  /** Gets or sets the location of the resource. */
  location?: string;
  /** Gets or sets the tags attached to the resource. */
  tags?: Record<string, string>;
  /** Gets or sets the module content link. */
  contentLink: ContentLink;
}

export function moduleCreateOrUpdateParametersSerializer(
  item: ModuleCreateOrUpdateParameters,
): any {
  return {
    properties: _moduleCreateOrUpdateParametersPropertiesSerializer(item),
    name: item["name"],
    location: item["location"],
    tags: item["tags"],
  };
}

/** The parameters supplied to the create or update module properties. */
export interface ModuleCreateOrUpdateProperties {
  /** Gets or sets the module content link. */
  contentLink: ContentLink;
}

export function moduleCreateOrUpdatePropertiesSerializer(
  item: ModuleCreateOrUpdateProperties,
): any {
  return { contentLink: contentLinkSerializer(item["contentLink"]) };
}

/** The parameters supplied to the update module operation. */
export interface ModuleUpdateParameters {
  /** Gets or sets name of the resource. */
  readonly name?: string;
  /** Gets or sets the location of the resource. */
  readonly location?: string;
  /** Gets or sets the tags attached to the resource. */
  tags?: Record<string, string>;
  /** Gets or sets the module content link. */
  contentLink?: ContentLink;
}

export function moduleUpdateParametersSerializer(item: ModuleUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["contentLink"])
      ? undefined
      : _moduleUpdateParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** The parameters supplied to the update properties. */
export interface ModuleUpdateProperties {
  /** Gets or sets the module content link. */
  contentLink?: ContentLink;
}

export function moduleUpdatePropertiesSerializer(item: ModuleUpdateProperties): any {
  return {
    contentLink: !item["contentLink"]
      ? item["contentLink"]
      : contentLinkSerializer(item["contentLink"]),
  };
}

/** Definition of the activity. */
export interface Activity {
  /** Gets or sets the id of the resource. */
  id?: string;
  /** Gets the name of the activity. */
  readonly name?: string;
  /** Gets or sets the user name of the activity. */
  definition?: string;
  /** Gets or sets the parameter sets of the activity. */
  parameterSets?: ActivityParameterSet[];
  /** Gets or sets the output types of the activity. */
  outputTypes?: ActivityOutputType[];
  /** Gets or sets the creation time. */
  creationTime?: Date;
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
}

export function activityDeserializer(item: any): Activity {
  return {
    id: item["id"],
    name: item["name"],
    ...(!item["properties"]
      ? item["properties"]
      : _activityPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the activity. */
export interface ActivityProperties {
  /** Gets or sets the user name of the activity. */
  definition?: string;
  /** Gets or sets the parameter sets of the activity. */
  parameterSets?: ActivityParameterSet[];
  /** Gets or sets the output types of the activity. */
  outputTypes?: ActivityOutputType[];
  /** Gets or sets the creation time. */
  creationTime?: Date;
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
}

export function activityPropertiesDeserializer(item: any): ActivityProperties {
  return {
    definition: item["definition"],
    parameterSets: !item["parameterSets"]
      ? item["parameterSets"]
      : activityParameterSetArrayDeserializer(item["parameterSets"]),
    outputTypes: !item["outputTypes"]
      ? item["outputTypes"]
      : activityOutputTypeArrayDeserializer(item["outputTypes"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
  };
}

export function activityParameterSetArrayDeserializer(result: Array<ActivityParameterSet>): any[] {
  return result.map((item) => {
    return activityParameterSetDeserializer(item);
  });
}

/** Definition of the activity parameter set. */
export interface ActivityParameterSet {
  /** Gets or sets the name of the activity parameter set. */
  name?: string;
  /** Gets or sets the parameters of the activity parameter set. */
  parameters?: ActivityParameter[];
}

export function activityParameterSetDeserializer(item: any): ActivityParameterSet {
  return {
    name: item["name"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : activityParameterArrayDeserializer(item["parameters"]),
  };
}

export function activityParameterArrayDeserializer(result: Array<ActivityParameter>): any[] {
  return result.map((item) => {
    return activityParameterDeserializer(item);
  });
}

/** Definition of the activity parameter. */
export interface ActivityParameter {
  /** Gets or sets the name of the activity parameter. */
  name?: string;
  /** Gets or sets the type of the activity parameter. */
  type?: string;
  /** Gets or sets a Boolean value that indicates true if the parameter is required. If the value is false, the parameter is optional. */
  isMandatory?: boolean;
  /** Gets or sets a Boolean value that indicates true if the parameter is dynamic. */
  isDynamic?: boolean;
  /** Gets or sets the position of the activity parameter. */
  position?: number;
  /** Gets or sets a Boolean value that indicates true if the parameter can take values from the incoming pipeline objects. This setting is used if the cmdlet must access the complete input object. false indicates that the parameter cannot take values from the complete input object. */
  valueFromPipeline?: boolean;
  /** Gets or sets a Boolean value that indicates true if the parameter can be filled from a property of the incoming pipeline object that has the same name as this parameter. false indicates that the parameter cannot be filled from the incoming pipeline object property with the same name. */
  valueFromPipelineByPropertyName?: boolean;
  /** Gets or sets a Boolean value that indicates true if the cmdlet parameter accepts all the remaining command-line arguments that are associated with this parameter in the form of an array. false if the cmdlet parameter does not accept all the remaining argument values. */
  valueFromRemainingArguments?: boolean;
  /** Gets or sets the description of the activity parameter. */
  description?: string;
  /** Gets or sets the validation set of activity parameter. */
  validationSet?: ActivityParameterValidationSet[];
}

export function activityParameterDeserializer(item: any): ActivityParameter {
  return {
    name: item["name"],
    type: item["type"],
    isMandatory: item["isMandatory"],
    isDynamic: item["isDynamic"],
    position: item["position"],
    valueFromPipeline: item["valueFromPipeline"],
    valueFromPipelineByPropertyName: item["valueFromPipelineByPropertyName"],
    valueFromRemainingArguments: item["valueFromRemainingArguments"],
    description: item["description"],
    validationSet: !item["validationSet"]
      ? item["validationSet"]
      : activityParameterValidationSetArrayDeserializer(item["validationSet"]),
  };
}

export function activityParameterValidationSetArrayDeserializer(
  result: Array<ActivityParameterValidationSet>,
): any[] {
  return result.map((item) => {
    return activityParameterValidationSetDeserializer(item);
  });
}

/** Definition of the activity parameter validation set. */
export interface ActivityParameterValidationSet {
  /** Gets or sets the name of the activity parameter validation set member. */
  memberValue?: string;
}

export function activityParameterValidationSetDeserializer(
  item: any,
): ActivityParameterValidationSet {
  return {
    memberValue: item["memberValue"],
  };
}

export function activityOutputTypeArrayDeserializer(result: Array<ActivityOutputType>): any[] {
  return result.map((item) => {
    return activityOutputTypeDeserializer(item);
  });
}

/** Definition of the activity output type. */
export interface ActivityOutputType {
  /** Gets or sets the name of the activity output type. */
  name?: string;
  /** Gets or sets the type of the activity output type. */
  type?: string;
}

export function activityOutputTypeDeserializer(item: any): ActivityOutputType {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The response model for the list activity operation. */
export interface _ActivityListResult {
  /** The Activity items on this page */
  value: Activity[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _activityListResultDeserializer(item: any): _ActivityListResult {
  return {
    value: activityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function activityArrayDeserializer(result: Array<Activity>): any[] {
  return result.map((item) => {
    return activityDeserializer(item);
  });
}

/** Definition of the Package type. */
export interface Package extends TrackedResource {
  /** Gets or sets the isGlobal flag of the package. */
  default?: boolean;
  /** Gets or sets the version of the Package. */
  version?: string;
  /** Gets or sets the size in bytes of the Package. */
  sizeInBytes?: number;
  /** Gets or sets the provisioning state of the Package. */
  readonly provisioningState?: PackageProvisioningState;
  /** Gets or sets the contentLink of the Package. */
  contentLink?: ContentLink;
  /** Gets or sets the error info of the Package. */
  error?: PackageErrorInfo;
  /** Metadata pertaining to creation and last modification of the resource. */
  allOf?: SystemData;
}

export function packageDeserializer(item: any): Package {
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
      : _packagePropertiesDeserializer(item["properties"])),
  };
}

/** Definition of the package property type. */
export interface PackageProperties {
  /** Gets or sets the isGlobal flag of the package. */
  default?: boolean;
  /** Gets or sets the version of the Package. */
  version?: string;
  /** Gets or sets the size in bytes of the Package. */
  sizeInBytes?: number;
  /** Gets or sets the provisioning state of the Package. */
  readonly provisioningState?: PackageProvisioningState;
  /** Gets or sets the contentLink of the Package. */
  contentLink?: ContentLink;
  /** Gets or sets the error info of the Package. */
  error?: PackageErrorInfo;
  /** Metadata pertaining to creation and last modification of the resource. */
  allOf?: SystemData;
}

export function packagePropertiesDeserializer(item: any): PackageProperties {
  return {
    default: item["default"],
    version: item["version"],
    sizeInBytes: item["sizeInBytes"],
    provisioningState: item["provisioningState"],
    contentLink: !item["contentLink"]
      ? item["contentLink"]
      : contentLinkDeserializer(item["contentLink"]),
    error: !item["error"] ? item["error"] : packageErrorInfoDeserializer(item["error"]),
    allOf: !item["allOf"] ? item["allOf"] : systemDataDeserializer(item["allOf"]),
  };
}

/** Gets or sets the provisioning state of the Package. */
export enum KnownPackageProvisioningState {
  /** Created */
  Created = "Created",
  /** Creating */
  Creating = "Creating",
  /** StartingImportModuleRunbook */
  StartingImportModuleRunbook = "StartingImportModuleRunbook",
  /** RunningImportModuleRunbook */
  RunningImportModuleRunbook = "RunningImportModuleRunbook",
  /** ContentRetrieved */
  ContentRetrieved = "ContentRetrieved",
  /** ContentDownloaded */
  ContentDownloaded = "ContentDownloaded",
  /** ContentValidated */
  ContentValidated = "ContentValidated",
  /** ConnectionTypeImported */
  ConnectionTypeImported = "ConnectionTypeImported",
  /** ContentStored */
  ContentStored = "ContentStored",
  /** ModuleDataStored */
  ModuleDataStored = "ModuleDataStored",
  /** ActivitiesStored */
  ActivitiesStored = "ActivitiesStored",
  /** ModuleImportRunbookComplete */
  ModuleImportRunbookComplete = "ModuleImportRunbookComplete",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Updating */
  Updating = "Updating",
}

/**
 * Gets or sets the provisioning state of the Package. \
 * {@link KnownPackageProvisioningState} can be used interchangeably with PackageProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Created**: Created \
 * **Creating**: Creating \
 * **StartingImportModuleRunbook**: StartingImportModuleRunbook \
 * **RunningImportModuleRunbook**: RunningImportModuleRunbook \
 * **ContentRetrieved**: ContentRetrieved \
 * **ContentDownloaded**: ContentDownloaded \
 * **ContentValidated**: ContentValidated \
 * **ConnectionTypeImported**: ConnectionTypeImported \
 * **ContentStored**: ContentStored \
 * **ModuleDataStored**: ModuleDataStored \
 * **ActivitiesStored**: ActivitiesStored \
 * **ModuleImportRunbookComplete**: ModuleImportRunbookComplete \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Updating**: Updating
 */
export type PackageProvisioningState = string;

/** Definition of the package error info type. */
export interface PackageErrorInfo {
  /** Package import error code. */
  code?: string;
  /** Package import error message. */
  message?: string;
}

export function packageErrorInfoDeserializer(item: any): PackageErrorInfo {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The parameters supplied to the create or update package operation. */
export interface PackageCreateOrUpdateParameters {
  /** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
  allOf?: TrackedResource;
  /** Gets or sets the package content link. */
  contentLink: ContentLink;
}

export function packageCreateOrUpdateParametersSerializer(
  item: PackageCreateOrUpdateParameters,
): any {
  return {
    properties: _packageCreateOrUpdateParametersPropertiesSerializer(item),
    allOf: !item["allOf"] ? item["allOf"] : trackedResourceSerializer(item["allOf"]),
  };
}

/** The parameters supplied to the create or update package properties. */
export interface PackageCreateOrUpdateProperties {
  /** Gets or sets the package content link. */
  contentLink: ContentLink;
}

export function packageCreateOrUpdatePropertiesSerializer(
  item: PackageCreateOrUpdateProperties,
): any {
  return { contentLink: contentLinkSerializer(item["contentLink"]) };
}

/** The parameters supplied to the update package operation. */
export interface PackageUpdateParameters {
  /** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
  allOf?: TrackedResource;
  /** Gets or sets the package content link. */
  contentLink?: ContentLink;
}

export function packageUpdateParametersSerializer(item: PackageUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["contentLink"])
      ? undefined
      : _packageUpdateParametersPropertiesSerializer(item),
    allOf: !item["allOf"] ? item["allOf"] : trackedResourceSerializer(item["allOf"]),
  };
}

/** The parameters supplied to the update properties. */
export interface PackageUpdateProperties {
  /** Gets or sets the package content link. */
  contentLink?: ContentLink;
}

export function packageUpdatePropertiesSerializer(item: PackageUpdateProperties): any {
  return {
    contentLink: !item["contentLink"]
      ? item["contentLink"]
      : contentLinkSerializer(item["contentLink"]),
  };
}

/** The response of a Package list operation. */
export interface _PackageListResult {
  /** The Package items on this page */
  value: Package[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _packageListResultDeserializer(item: any): _PackageListResult {
  return {
    value: packageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function packageArrayDeserializer(result: Array<Package>): any[] {
  return result.map((item) => {
    return packageDeserializer(item);
  });
}

/** Definition of the runbook type. */
export interface Runbook extends TrackedResource {
  /** Gets or sets the etag of the resource. */
  etag?: string;
  /** Runtime Environment of the runbook execution. */
  runtimeEnvironment?: string;
  /** Gets or sets the type of the runbook. */
  runbookType?: RunbookTypeEnum;
  /** Gets or sets the published runbook content link. */
  publishContentLink?: ContentLink;
  /** Gets or sets the state of the runbook. */
  state?: RunbookState;
  /** Gets or sets verbose log option. */
  logVerbose?: boolean;
  /** Gets or sets progress log option. */
  logProgress?: boolean;
  /** Gets or sets the option to log activity trace of the runbook. */
  logActivityTrace?: number;
  /** Gets or sets the job count of the runbook. */
  jobCount?: number;
  /** Gets or sets the runbook parameters. */
  parameters?: Record<string, RunbookParameter>;
  /** Gets or sets the runbook output types. */
  outputTypes?: string[];
  /** Gets or sets the draft runbook properties. */
  draft?: RunbookDraft;
  /** Gets or sets the provisioning state of the runbook. */
  provisioningState?: "Succeeded";
  /** Gets or sets the last modified by. */
  lastModifiedBy?: string;
  /** Gets or sets the creation time. */
  creationTime?: Date;
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
}

export function runbookDeserializer(item: any): Runbook {
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
      : _runbookPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Definition of the runbook property type. */
export interface RunbookProperties {
  /** Runtime Environment of the runbook execution. */
  runtimeEnvironment?: string;
  /** Gets or sets the type of the runbook. */
  runbookType?: RunbookTypeEnum;
  /** Gets or sets the published runbook content link. */
  publishContentLink?: ContentLink;
  /** Gets or sets the state of the runbook. */
  state?: RunbookState;
  /** Gets or sets verbose log option. */
  logVerbose?: boolean;
  /** Gets or sets progress log option. */
  logProgress?: boolean;
  /** Gets or sets the option to log activity trace of the runbook. */
  logActivityTrace?: number;
  /** Gets or sets the job count of the runbook. */
  jobCount?: number;
  /** Gets or sets the runbook parameters. */
  parameters?: Record<string, RunbookParameter>;
  /** Gets or sets the runbook output types. */
  outputTypes?: string[];
  /** Gets or sets the draft runbook properties. */
  draft?: RunbookDraft;
  /** Gets or sets the provisioning state of the runbook. */
  provisioningState?: "Succeeded";
  /** Gets or sets the last modified by. */
  lastModifiedBy?: string;
  /** Gets or sets the creation time. */
  creationTime?: Date;
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
}

export function runbookPropertiesDeserializer(item: any): RunbookProperties {
  return {
    runtimeEnvironment: item["runtimeEnvironment"],
    runbookType: item["runbookType"],
    publishContentLink: !item["publishContentLink"]
      ? item["publishContentLink"]
      : contentLinkDeserializer(item["publishContentLink"]),
    state: item["state"],
    logVerbose: item["logVerbose"],
    logProgress: item["logProgress"],
    logActivityTrace: item["logActivityTrace"],
    jobCount: item["jobCount"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : runbookParameterRecordDeserializer(item["parameters"]),
    outputTypes: !item["outputTypes"]
      ? item["outputTypes"]
      : item["outputTypes"].map((p: any) => {
          return p;
        }),
    draft: !item["draft"] ? item["draft"] : runbookDraftDeserializer(item["draft"]),
    provisioningState: item["provisioningState"],
    lastModifiedBy: item["lastModifiedBy"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
  };
}

/** Gets or sets the type of the runbook. */
export enum KnownRunbookTypeEnum {
  /** Script */
  Script = "Script",
  /** Graph */
  Graph = "Graph",
  /** PowerShellWorkflow */
  PowerShellWorkflow = "PowerShellWorkflow",
  /** PowerShell */
  PowerShell = "PowerShell",
  /** GraphPowerShellWorkflow */
  GraphPowerShellWorkflow = "GraphPowerShellWorkflow",
  /** GraphPowerShell */
  GraphPowerShell = "GraphPowerShell",
  /** Python2 */
  Python2 = "Python2",
  /** Python3 */
  Python3 = "Python3",
  /** Python */
  Python = "Python",
  /** PowerShell72 */
  PowerShell72 = "PowerShell72",
}

/**
 * Gets or sets the type of the runbook. \
 * {@link KnownRunbookTypeEnum} can be used interchangeably with RunbookTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Script**: Script \
 * **Graph**: Graph \
 * **PowerShellWorkflow**: PowerShellWorkflow \
 * **PowerShell**: PowerShell \
 * **GraphPowerShellWorkflow**: GraphPowerShellWorkflow \
 * **GraphPowerShell**: GraphPowerShell \
 * **Python2**: Python2 \
 * **Python3**: Python3 \
 * **Python**: Python \
 * **PowerShell72**: PowerShell72
 */
export type RunbookTypeEnum = string;

/** Gets or sets the state of the runbook. */
export enum KnownRunbookState {
  /** New */
  New = "New",
  /** Edit */
  Edit = "Edit",
  /** Published */
  Published = "Published",
}

/**
 * Gets or sets the state of the runbook. \
 * {@link KnownRunbookState} can be used interchangeably with RunbookState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **New**: New \
 * **Edit**: Edit \
 * **Published**: Published
 */
export type RunbookState = string;

export function runbookParameterRecordSerializer(
  item: Record<string, RunbookParameter>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : runbookParameterSerializer(item[key]);
  });
  return result;
}

export function runbookParameterRecordDeserializer(
  item: Record<string, any>,
): Record<string, RunbookParameter> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : runbookParameterDeserializer(item[key]);
  });
  return result;
}

/** Definition of the runbook parameter type. */
export interface RunbookParameter {
  /** Gets or sets the type of the parameter. */
  type?: string;
  /** Gets or sets a Boolean value to indicate whether the parameter is mandatory or not. */
  isMandatory?: boolean;
  /** Get or sets the position of the parameter. */
  position?: number;
  /** Gets or sets the default value of parameter. */
  defaultValue?: string;
}

export function runbookParameterSerializer(item: RunbookParameter): any {
  return {
    type: item["type"],
    isMandatory: item["isMandatory"],
    position: item["position"],
    defaultValue: item["defaultValue"],
  };
}

export function runbookParameterDeserializer(item: any): RunbookParameter {
  return {
    type: item["type"],
    isMandatory: item["isMandatory"],
    position: item["position"],
    defaultValue: item["defaultValue"],
  };
}

/** model interface RunbookDraft */
export interface RunbookDraft {
  /** Gets or sets whether runbook is in edit mode. */
  inEdit?: boolean;
  /** Gets or sets the draft runbook content link. */
  draftContentLink?: ContentLink;
  /** Gets or sets the creation time of the runbook draft. */
  creationTime?: Date;
  /** Gets or sets the last modified time of the runbook draft. */
  lastModifiedTime?: Date;
  /** Gets or sets the runbook draft parameters. */
  parameters?: Record<string, RunbookParameter>;
  /** Gets or sets the runbook output types. */
  outputTypes?: string[];
}

export function runbookDraftSerializer(item: RunbookDraft): any {
  return {
    inEdit: item["inEdit"],
    draftContentLink: !item["draftContentLink"]
      ? item["draftContentLink"]
      : contentLinkSerializer(item["draftContentLink"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : item["creationTime"].toISOString(),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : item["lastModifiedTime"].toISOString(),
    parameters: !item["parameters"]
      ? item["parameters"]
      : runbookParameterRecordSerializer(item["parameters"]),
    outputTypes: !item["outputTypes"]
      ? item["outputTypes"]
      : item["outputTypes"].map((p: any) => {
          return p;
        }),
  };
}

export function runbookDraftDeserializer(item: any): RunbookDraft {
  return {
    inEdit: item["inEdit"],
    draftContentLink: !item["draftContentLink"]
      ? item["draftContentLink"]
      : contentLinkDeserializer(item["draftContentLink"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : runbookParameterRecordDeserializer(item["parameters"]),
    outputTypes: !item["outputTypes"]
      ? item["outputTypes"]
      : item["outputTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** The parameters supplied to the create or update runbook operation. */
export interface RunbookCreateOrUpdateParameters {
  /** Gets or sets the name of the resource. */
  name?: string;
  /** Gets or sets the location of the resource. */
  location?: string;
  /** Gets or sets the tags attached to the resource. */
  tags?: Record<string, string>;
  /** Gets or sets verbose log option. */
  logVerbose?: boolean;
  /** Gets or sets progress log option. */
  logProgress?: boolean;
  /** Environment of the runbook. */
  runtimeEnvironment?: string;
  /** Gets or sets the type of the runbook. */
  runbookType: RunbookTypeEnum;
  /** Gets or sets the draft runbook properties. */
  draft?: RunbookDraft;
  /** Gets or sets the published runbook content link. */
  publishContentLink?: ContentLink;
  /** Gets or sets the description of the runbook. */
  description?: string;
  /** Gets or sets the activity-level tracing options of the runbook. */
  logActivityTrace?: number;
}

export function runbookCreateOrUpdateParametersSerializer(
  item: RunbookCreateOrUpdateParameters,
): any {
  return {
    properties: _runbookCreateOrUpdateParametersPropertiesSerializer(item),
    name: item["name"],
    location: item["location"],
    tags: item["tags"],
  };
}

/** The parameters supplied to the create or update runbook properties. */
export interface RunbookCreateOrUpdateProperties {
  /** Gets or sets verbose log option. */
  logVerbose?: boolean;
  /** Gets or sets progress log option. */
  logProgress?: boolean;
  /** Environment of the runbook. */
  runtimeEnvironment?: string;
  /** Gets or sets the type of the runbook. */
  runbookType: RunbookTypeEnum;
  /** Gets or sets the draft runbook properties. */
  draft?: RunbookDraft;
  /** Gets or sets the published runbook content link. */
  publishContentLink?: ContentLink;
  /** Gets or sets the description of the runbook. */
  description?: string;
  /** Gets or sets the activity-level tracing options of the runbook. */
  logActivityTrace?: number;
}

export function runbookCreateOrUpdatePropertiesSerializer(
  item: RunbookCreateOrUpdateProperties,
): any {
  return {
    logVerbose: item["logVerbose"],
    logProgress: item["logProgress"],
    runtimeEnvironment: item["runtimeEnvironment"],
    runbookType: item["runbookType"],
    draft: !item["draft"] ? item["draft"] : runbookDraftSerializer(item["draft"]),
    publishContentLink: !item["publishContentLink"]
      ? item["publishContentLink"]
      : contentLinkSerializer(item["publishContentLink"]),
    description: item["description"],
    logActivityTrace: item["logActivityTrace"],
  };
}

/** The parameters supplied to the update runbook operation. */
export interface RunbookUpdateParameters {
  /** Gets or sets the name of the resource. */
  name?: string;
  /** Gets or sets the location of the resource. */
  location?: string;
  /** Gets or sets the tags attached to the resource. */
  tags?: Record<string, string>;
  /** Gets or sets the description of the runbook. */
  description?: string;
  /** Gets or sets verbose log option. */
  logVerbose?: boolean;
  /** Gets or sets progress log option. */
  logProgress?: boolean;
  /** Gets or sets the activity-level tracing options of the runbook. */
  logActivityTrace?: number;
}

export function runbookUpdateParametersSerializer(item: RunbookUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, [
      "description",
      "logVerbose",
      "logProgress",
      "logActivityTrace",
    ])
      ? undefined
      : _runbookUpdateParametersPropertiesSerializer(item),
    name: item["name"],
    location: item["location"],
    tags: item["tags"],
  };
}

/** The parameters supplied to the update runbook properties. */
export interface RunbookUpdateProperties {
  /** Gets or sets the description of the runbook. */
  description?: string;
  /** Gets or sets verbose log option. */
  logVerbose?: boolean;
  /** Gets or sets progress log option. */
  logProgress?: boolean;
  /** Gets or sets the activity-level tracing options of the runbook. */
  logActivityTrace?: number;
}

export function runbookUpdatePropertiesSerializer(item: RunbookUpdateProperties): any {
  return {
    description: item["description"],
    logVerbose: item["logVerbose"],
    logProgress: item["logProgress"],
    logActivityTrace: item["logActivityTrace"],
  };
}

/** The response of a Runbook list operation. */
export interface _RunbookListResult {
  /** The Runbook items on this page */
  value: Runbook[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _runbookListResultDeserializer(item: any): _RunbookListResult {
  return {
    value: runbookArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function runbookArrayDeserializer(result: Array<Runbook>): any[] {
  return result.map((item) => {
    return runbookDeserializer(item);
  });
}

/** The response model for the undo edit runbook operation. */
export interface RunbookDraftUndoEditResult {
  statusCode?: HttpStatusCode;
  requestId?: string;
}

export function runbookDraftUndoEditResultDeserializer(item: any): RunbookDraftUndoEditResult {
  return {
    statusCode: item["statusCode"],
    requestId: item["requestId"],
  };
}

/** Known values of {@link HttpStatusCode} that the service accepts. */
export enum KnownHttpStatusCode {
  /** Continue */
  Continue = "Continue",
  /** SwitchingProtocols */
  SwitchingProtocols = "SwitchingProtocols",
  /** OK */
  OK = "OK",
  /** Created */
  Created = "Created",
  /** Accepted */
  Accepted = "Accepted",
  /** NonAuthoritativeInformation */
  NonAuthoritativeInformation = "NonAuthoritativeInformation",
  /** NoContent */
  NoContent = "NoContent",
  /** ResetContent */
  ResetContent = "ResetContent",
  /** PartialContent */
  PartialContent = "PartialContent",
  /** MultipleChoices */
  MultipleChoices = "MultipleChoices",
  /** Ambiguous */
  Ambiguous = "Ambiguous",
  /** MovedPermanently */
  MovedPermanently = "MovedPermanently",
  /** Moved */
  Moved = "Moved",
  /** Found */
  Found = "Found",
  /** Redirect */
  Redirect = "Redirect",
  /** SeeOther */
  SeeOther = "SeeOther",
  /** RedirectMethod */
  RedirectMethod = "RedirectMethod",
  /** NotModified */
  NotModified = "NotModified",
  /** UseProxy */
  UseProxy = "UseProxy",
  /** Unused */
  Unused = "Unused",
  /** TemporaryRedirect */
  TemporaryRedirect = "TemporaryRedirect",
  /** RedirectKeepVerb */
  RedirectKeepVerb = "RedirectKeepVerb",
  /** BadRequest */
  BadRequest = "BadRequest",
  /** Unauthorized */
  Unauthorized = "Unauthorized",
  /** PaymentRequired */
  PaymentRequired = "PaymentRequired",
  /** Forbidden */
  Forbidden = "Forbidden",
  /** NotFound */
  NotFound = "NotFound",
  /** MethodNotAllowed */
  MethodNotAllowed = "MethodNotAllowed",
  /** NotAcceptable */
  NotAcceptable = "NotAcceptable",
  /** ProxyAuthenticationRequired */
  ProxyAuthenticationRequired = "ProxyAuthenticationRequired",
  /** RequestTimeout */
  RequestTimeout = "RequestTimeout",
  /** Conflict */
  Conflict = "Conflict",
  /** Gone */
  Gone = "Gone",
  /** LengthRequired */
  LengthRequired = "LengthRequired",
  /** PreconditionFailed */
  PreconditionFailed = "PreconditionFailed",
  /** RequestEntityTooLarge */
  RequestEntityTooLarge = "RequestEntityTooLarge",
  /** RequestUriTooLong */
  RequestUriTooLong = "RequestUriTooLong",
  /** UnsupportedMediaType */
  UnsupportedMediaType = "UnsupportedMediaType",
  /** RequestedRangeNotSatisfiable */
  RequestedRangeNotSatisfiable = "RequestedRangeNotSatisfiable",
  /** ExpectationFailed */
  ExpectationFailed = "ExpectationFailed",
  /** UpgradeRequired */
  UpgradeRequired = "UpgradeRequired",
  /** InternalServerError */
  InternalServerError = "InternalServerError",
  /** NotImplemented */
  NotImplemented = "NotImplemented",
  /** BadGateway */
  BadGateway = "BadGateway",
  /** ServiceUnavailable */
  ServiceUnavailable = "ServiceUnavailable",
  /** GatewayTimeout */
  GatewayTimeout = "GatewayTimeout",
  /** HttpVersionNotSupported */
  HttpVersionNotSupported = "HttpVersionNotSupported",
}

/** Type of HttpStatusCode */
export type HttpStatusCode = string;

/** The parameters supplied to the create test job operation. */
export interface TestJobCreateParameters {
  /** Gets or sets the parameters of the test job. */
  parameters?: Record<string, string>;
  /** Gets or sets the runOn which specifies the group name where the job is to be executed. */
  runOn?: string;
  /** The runtime Environment Name on which job needs to be tested */
  runtimeEnvironment?: string;
}

export function testJobCreateParametersSerializer(item: TestJobCreateParameters): any {
  return {
    parameters: item["parameters"],
    runOn: item["runOn"],
    runtimeEnvironment: item["runtimeEnvironment"],
  };
}

/** Definition of the test job. */
export interface TestJob {
  /** Gets or sets the creation time of the test job. */
  creationTime?: Date;
  /** Gets or sets the status of the test job. */
  status?: string;
  /** Gets or sets the status details of the test job. */
  statusDetails?: string;
  /** Gets or sets the runOn which specifies the group name where the job is to be executed. */
  runOn?: string;
  /** Gets or sets the start time of the test job. */
  startTime?: Date;
  /** Gets or sets the end time of the test job. */
  endTime?: Date;
  /** Gets or sets the exception of the test job. */
  exception?: string;
  /** Gets or sets the last modified time of the test job. */
  lastModifiedTime?: Date;
  /** Gets or sets the last status modified time of the test job. */
  lastStatusModifiedTime?: Date;
  /** Gets or sets the parameters of the test job. */
  parameters?: Record<string, string>;
  /** The activity-level tracing options of the runbook. */
  logActivityTrace?: number;
}

export function testJobDeserializer(item: any): TestJob {
  return {
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    status: item["status"],
    statusDetails: item["statusDetails"],
    runOn: item["runOn"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    exception: item["exception"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    lastStatusModifiedTime: !item["lastStatusModifiedTime"]
      ? item["lastStatusModifiedTime"]
      : new Date(item["lastStatusModifiedTime"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    logActivityTrace: item["logActivityTrace"],
  };
}

/** Definition of the schedule. */
export interface Schedule extends ProxyResource {
  /** Gets or sets the start time of the schedule. */
  startTime?: Date;
  /** Gets the start time's offset in minutes. */
  readonly startTimeOffsetMinutes?: number;
  /** Gets or sets the end time of the schedule. */
  expiryTime?: Date;
  /** Gets or sets the expiry time's offset in minutes. */
  expiryTimeOffsetMinutes?: number;
  /** Gets or sets a value indicating whether this schedule is enabled. */
  isEnabled?: boolean;
  /** Gets or sets the next run time of the schedule. */
  nextRun?: Date;
  /** Gets or sets the next run time's offset in minutes. */
  nextRunOffsetMinutes?: number;
  /** Gets or sets the interval of the schedule. */
  interval?: any;
  /** Gets or sets the frequency of the schedule. */
  frequency?: ScheduleFrequency;
  /** Gets or sets the time zone of the schedule. */
  timeZone?: string;
  /** Gets or sets the advanced schedule. */
  advancedSchedule?: AdvancedSchedule;
  /** Gets or sets the creation time. */
  creationTime?: Date;
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
}

export function scheduleDeserializer(item: any): Schedule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _schedulePropertiesDeserializer(item["properties"])),
  };
}

/** Definition of schedule parameters. */
export interface ScheduleProperties {
  /** Gets or sets the start time of the schedule. */
  startTime?: Date;
  /** Gets the start time's offset in minutes. */
  readonly startTimeOffsetMinutes?: number;
  /** Gets or sets the end time of the schedule. */
  expiryTime?: Date;
  /** Gets or sets the expiry time's offset in minutes. */
  expiryTimeOffsetMinutes?: number;
  /** Gets or sets a value indicating whether this schedule is enabled. */
  isEnabled?: boolean;
  /** Gets or sets the next run time of the schedule. */
  nextRun?: Date;
  /** Gets or sets the next run time's offset in minutes. */
  nextRunOffsetMinutes?: number;
  /** Gets or sets the interval of the schedule. */
  interval?: any;
  /** Gets or sets the frequency of the schedule. */
  frequency?: ScheduleFrequency;
  /** Gets or sets the time zone of the schedule. */
  timeZone?: string;
  /** Gets or sets the advanced schedule. */
  advancedSchedule?: AdvancedSchedule;
  /** Gets or sets the creation time. */
  creationTime?: Date;
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
}

export function schedulePropertiesDeserializer(item: any): ScheduleProperties {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    startTimeOffsetMinutes: item["startTimeOffsetMinutes"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    expiryTimeOffsetMinutes: item["expiryTimeOffsetMinutes"],
    isEnabled: item["isEnabled"],
    nextRun: !item["nextRun"] ? item["nextRun"] : new Date(item["nextRun"]),
    nextRunOffsetMinutes: item["nextRunOffsetMinutes"],
    interval: item["interval"],
    frequency: item["frequency"],
    timeZone: item["timeZone"],
    advancedSchedule: !item["advancedSchedule"]
      ? item["advancedSchedule"]
      : advancedScheduleDeserializer(item["advancedSchedule"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
  };
}

/** The parameters supplied to the create or update schedule operation. */
export interface ScheduleCreateOrUpdateParameters {
  /** Gets or sets the name of the Schedule. */
  name: string;
  /** Gets or sets the description of the schedule. */
  description?: string;
  /** Gets or sets the start time of the schedule. */
  startTime: Date;
  /** Gets or sets the end time of the schedule. */
  expiryTime?: Date;
  /** Gets or sets the interval of the schedule. */
  interval?: any;
  /** Gets or sets the frequency of the schedule. */
  frequency: ScheduleFrequency;
  /** Gets or sets the time zone of the schedule. */
  timeZone?: string;
  /** Gets or sets the AdvancedSchedule. */
  advancedSchedule?: AdvancedSchedule;
}

export function scheduleCreateOrUpdateParametersSerializer(
  item: ScheduleCreateOrUpdateParameters,
): any {
  return {
    name: item["name"],
    properties: _scheduleCreateOrUpdateParametersPropertiesSerializer(item),
  };
}

/** The parameters supplied to the create or update schedule operation. */
export interface ScheduleCreateOrUpdateProperties {
  /** Gets or sets the description of the schedule. */
  description?: string;
  /** Gets or sets the start time of the schedule. */
  startTime: Date;
  /** Gets or sets the end time of the schedule. */
  expiryTime?: Date;
  /** Gets or sets the interval of the schedule. */
  interval?: any;
  /** Gets or sets the frequency of the schedule. */
  frequency: ScheduleFrequency;
  /** Gets or sets the time zone of the schedule. */
  timeZone?: string;
  /** Gets or sets the AdvancedSchedule. */
  advancedSchedule?: AdvancedSchedule;
}

export function scheduleCreateOrUpdatePropertiesSerializer(
  item: ScheduleCreateOrUpdateProperties,
): any {
  return {
    description: item["description"],
    startTime: item["startTime"].toISOString(),
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    interval: item["interval"],
    frequency: item["frequency"],
    timeZone: item["timeZone"],
    advancedSchedule: !item["advancedSchedule"]
      ? item["advancedSchedule"]
      : advancedScheduleSerializer(item["advancedSchedule"]),
  };
}

/** The parameters supplied to the update schedule operation. */
export interface ScheduleUpdateParameters {
  /** Gets or sets the name of the Schedule. */
  name?: string;
  /** Gets or sets the description of the schedule. */
  description?: string;
  /** Gets or sets a value indicating whether this schedule is enabled. */
  isEnabled?: boolean;
}

export function scheduleUpdateParametersSerializer(item: ScheduleUpdateParameters): any {
  return {
    name: item["name"],
    properties: areAllPropsUndefined(item, ["description", "isEnabled"])
      ? undefined
      : _scheduleUpdateParametersPropertiesSerializer(item),
  };
}

/** The parameters supplied to the update schedule operation. */
export interface ScheduleUpdateProperties {
  /** Gets or sets the description of the schedule. */
  description?: string;
  /** Gets or sets a value indicating whether this schedule is enabled. */
  isEnabled?: boolean;
}

export function scheduleUpdatePropertiesSerializer(item: ScheduleUpdateProperties): any {
  return { description: item["description"], isEnabled: item["isEnabled"] };
}

/** The response of a Schedule list operation. */
export interface _ScheduleListResult {
  /** The Schedule items on this page */
  value: Schedule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scheduleListResultDeserializer(item: any): _ScheduleListResult {
  return {
    value: scheduleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scheduleArrayDeserializer(result: Array<Schedule>): any[] {
  return result.map((item) => {
    return scheduleDeserializer(item);
  });
}

/** Definition of the source control. */
export interface SourceControl extends ProxyResource {
  /** The repo url of the source control. */
  repoUrl?: string;
  /** The repo branch of the source control. Include branch as empty string for VsoTfvc. */
  branch?: string;
  /** The folder path of the source control. */
  folderPath?: string;
  /** The auto sync of the source control. Default is false. */
  autoSync?: boolean;
  /** The auto publish of the source control. Default is true. */
  publishRunbook?: boolean;
  /** The source type. Must be one of VsoGit, VsoTfvc, GitHub. */
  sourceType?: SourceType;
  /** The description. */
  description?: string;
  /** The creation time. */
  creationTime?: Date;
  /** The last modified time. */
  lastModifiedTime?: Date;
}

export function sourceControlDeserializer(item: any): SourceControl {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sourceControlPropertiesDeserializer(item["properties"])),
  };
}

/** Definition of the source control properties */
export interface SourceControlProperties {
  /** The repo url of the source control. */
  repoUrl?: string;
  /** The repo branch of the source control. Include branch as empty string for VsoTfvc. */
  branch?: string;
  /** The folder path of the source control. */
  folderPath?: string;
  /** The auto sync of the source control. Default is false. */
  autoSync?: boolean;
  /** The auto publish of the source control. Default is true. */
  publishRunbook?: boolean;
  /** The source type. Must be one of VsoGit, VsoTfvc, GitHub. */
  sourceType?: SourceType;
  /** The description. */
  description?: string;
  /** The creation time. */
  creationTime?: Date;
  /** The last modified time. */
  lastModifiedTime?: Date;
}

export function sourceControlPropertiesDeserializer(item: any): SourceControlProperties {
  return {
    repoUrl: item["repoUrl"],
    branch: item["branch"],
    folderPath: item["folderPath"],
    autoSync: item["autoSync"],
    publishRunbook: item["publishRunbook"],
    sourceType: item["sourceType"],
    description: item["description"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
  };
}

/** The source type. Must be one of VsoGit, VsoTfvc, GitHub. */
export enum KnownSourceType {
  /** VsoGit */
  VsoGit = "VsoGit",
  /** VsoTfvc */
  VsoTfvc = "VsoTfvc",
  /** GitHub */
  GitHub = "GitHub",
}

/**
 * The source type. Must be one of VsoGit, VsoTfvc, GitHub. \
 * {@link KnownSourceType} can be used interchangeably with SourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VsoGit**: VsoGit \
 * **VsoTfvc**: VsoTfvc \
 * **GitHub**: GitHub
 */
export type SourceType = string;

/** The parameters supplied to the create or update source control operation. */
export interface SourceControlCreateOrUpdateParameters {
  /** The repo url of the source control. */
  repoUrl?: string;
  /** The repo branch of the source control. Include branch as empty string for VsoTfvc. */
  branch?: string;
  /** The folder path of the source control. Path must be relative. */
  folderPath?: string;
  /** The auto async of the source control. Default is false. */
  autoSync?: boolean;
  /** The auto publish of the source control. Default is true. */
  publishRunbook?: boolean;
  /** The source type. Must be one of VsoGit, VsoTfvc, GitHub, case sensitive. */
  sourceType?: SourceType;
  /** The authorization token for the repo of the source control. */
  securityToken?: SourceControlSecurityTokenProperties;
  /** The user description of the source control. */
  description?: string;
}

export function sourceControlCreateOrUpdateParametersSerializer(
  item: SourceControlCreateOrUpdateParameters,
): any {
  return { properties: _sourceControlCreateOrUpdateParametersPropertiesSerializer(item) };
}

/** The properties of the create source control operation. */
export interface SourceControlCreateOrUpdateProperties {
  /** The repo url of the source control. */
  repoUrl?: string;
  /** The repo branch of the source control. Include branch as empty string for VsoTfvc. */
  branch?: string;
  /** The folder path of the source control. Path must be relative. */
  folderPath?: string;
  /** The auto async of the source control. Default is false. */
  autoSync?: boolean;
  /** The auto publish of the source control. Default is true. */
  publishRunbook?: boolean;
  /** The source type. Must be one of VsoGit, VsoTfvc, GitHub, case sensitive. */
  sourceType?: SourceType;
  /** The authorization token for the repo of the source control. */
  securityToken?: SourceControlSecurityTokenProperties;
  /** The user description of the source control. */
  description?: string;
}

export function sourceControlCreateOrUpdatePropertiesSerializer(
  item: SourceControlCreateOrUpdateProperties,
): any {
  return {
    repoUrl: item["repoUrl"],
    branch: item["branch"],
    folderPath: item["folderPath"],
    autoSync: item["autoSync"],
    publishRunbook: item["publishRunbook"],
    sourceType: item["sourceType"],
    securityToken: !item["securityToken"]
      ? item["securityToken"]
      : sourceControlSecurityTokenPropertiesSerializer(item["securityToken"]),
    description: item["description"],
  };
}

/** model interface SourceControlSecurityTokenProperties */
export interface SourceControlSecurityTokenProperties {
  /** The access token. */
  accessToken?: string;
  /** The refresh token. */
  refreshToken?: string;
  /** The token type. Must be either PersonalAccessToken or Oauth. */
  tokenType?: TokenType;
}

export function sourceControlSecurityTokenPropertiesSerializer(
  item: SourceControlSecurityTokenProperties,
): any {
  return {
    accessToken: item["accessToken"],
    refreshToken: item["refreshToken"],
    tokenType: item["tokenType"],
  };
}

/** The token type. Must be either PersonalAccessToken or Oauth. */
export enum KnownTokenType {
  /** PersonalAccessToken */
  PersonalAccessToken = "PersonalAccessToken",
  /** Oauth */
  Oauth = "Oauth",
}

/**
 * The token type. Must be either PersonalAccessToken or Oauth. \
 * {@link KnownTokenType} can be used interchangeably with TokenType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PersonalAccessToken**: PersonalAccessToken \
 * **Oauth**: Oauth
 */
export type TokenType = string;

/** The parameters supplied to the update source control operation. */
export interface SourceControlUpdateParameters {
  /** The repo branch of the source control. */
  branch?: string;
  /** The folder path of the source control. Path must be relative. */
  folderPath?: string;
  /** The auto sync of the source control. Default is false. */
  autoSync?: boolean;
  /** The auto publish of the source control. Default is true. */
  publishRunbook?: boolean;
  /** The authorization token for the repo of the source control. */
  securityToken?: SourceControlSecurityTokenProperties;
  /** The user description of the source control. */
  description?: string;
}

export function sourceControlUpdateParametersSerializer(item: SourceControlUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, [
      "branch",
      "folderPath",
      "autoSync",
      "publishRunbook",
      "securityToken",
      "description",
    ])
      ? undefined
      : _sourceControlUpdateParametersPropertiesSerializer(item),
  };
}

/** The properties of the update source control */
export interface SourceControlUpdateProperties {
  /** The repo branch of the source control. */
  branch?: string;
  /** The folder path of the source control. Path must be relative. */
  folderPath?: string;
  /** The auto sync of the source control. Default is false. */
  autoSync?: boolean;
  /** The auto publish of the source control. Default is true. */
  publishRunbook?: boolean;
  /** The authorization token for the repo of the source control. */
  securityToken?: SourceControlSecurityTokenProperties;
  /** The user description of the source control. */
  description?: string;
}

export function sourceControlUpdatePropertiesSerializer(item: SourceControlUpdateProperties): any {
  return {
    branch: item["branch"],
    folderPath: item["folderPath"],
    autoSync: item["autoSync"],
    publishRunbook: item["publishRunbook"],
    securityToken: !item["securityToken"]
      ? item["securityToken"]
      : sourceControlSecurityTokenPropertiesSerializer(item["securityToken"]),
    description: item["description"],
  };
}

/** The response of a SourceControl list operation. */
export interface _SourceControlListResult {
  /** The SourceControl items on this page */
  value: SourceControl[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sourceControlListResultDeserializer(item: any): _SourceControlListResult {
  return {
    value: sourceControlArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sourceControlArrayDeserializer(result: Array<SourceControl>): any[] {
  return result.map((item) => {
    return sourceControlDeserializer(item);
  });
}

/** The parameters supplied to the create source control sync job operation. */
export interface SourceControlSyncJobCreateParameters {
  /** The commit id of the source control sync job. If not syncing to a commitId, enter an empty string. */
  commitId: string;
}

export function sourceControlSyncJobCreateParametersSerializer(
  item: SourceControlSyncJobCreateParameters,
): any {
  return { properties: _sourceControlSyncJobCreateParametersPropertiesSerializer(item) };
}

/** Definition of create source control sync job properties. */
export interface SourceControlSyncJobCreateProperties {
  /** The commit id of the source control sync job. If not syncing to a commitId, enter an empty string. */
  commitId: string;
}

export function sourceControlSyncJobCreatePropertiesSerializer(
  item: SourceControlSyncJobCreateProperties,
): any {
  return { commitId: item["commitId"] };
}

/** Definition of the source control sync job. */
export interface SourceControlSyncJob {
  /** Resource name. */
  readonly name?: string;
  /** Resource type. */
  readonly type?: string;
  /** Resource id. */
  readonly id?: string;
  /** The source control sync job id. */
  sourceControlSyncJobId?: string;
  /** The creation time of the job. */
  readonly creationTime?: Date;
  /** The provisioning state of the job. */
  provisioningState?: ProvisioningState;
  /** The start time of the job. */
  readonly startTime?: Date;
  /** The end time of the job. */
  readonly endTime?: Date;
  /** The sync type. */
  syncType?: SyncType;
}

export function sourceControlSyncJobDeserializer(item: any): SourceControlSyncJob {
  return {
    name: item["name"],
    type: item["type"],
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _sourceControlSyncJobPropertiesDeserializer(item["properties"])),
  };
}

/** Definition of source control sync job properties. */
export interface SourceControlSyncJobProperties {
  /** The source control sync job id. */
  sourceControlSyncJobId?: string;
  /** The creation time of the job. */
  readonly creationTime?: Date;
  /** The provisioning state of the job. */
  provisioningState?: ProvisioningState;
  /** The start time of the job. */
  readonly startTime?: Date;
  /** The end time of the job. */
  readonly endTime?: Date;
  /** The sync type. */
  syncType?: SyncType;
}

export function sourceControlSyncJobPropertiesDeserializer(
  item: any,
): SourceControlSyncJobProperties {
  return {
    sourceControlSyncJobId: item["sourceControlSyncJobId"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    provisioningState: item["provisioningState"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    syncType: item["syncType"],
  };
}

/** The provisioning state of the job. */
export enum KnownProvisioningState {
  /** Completed */
  Completed = "Completed",
  /** Failed */
  Failed = "Failed",
  /** Running */
  Running = "Running",
}

/**
 * The provisioning state of the job. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Completed**: Completed \
 * **Failed**: Failed \
 * **Running**: Running
 */
export type ProvisioningState = string;

/** The sync type. */
export enum KnownSyncType {
  /** PartialSync */
  PartialSync = "PartialSync",
  /** FullSync */
  FullSync = "FullSync",
}

/**
 * The sync type. \
 * {@link KnownSyncType} can be used interchangeably with SyncType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PartialSync**: PartialSync \
 * **FullSync**: FullSync
 */
export type SyncType = string;

/** Definition of the source control sync job. */
export interface SourceControlSyncJobById {
  /** The id of the job. */
  id?: string;
  /** The source control sync job id. */
  sourceControlSyncJobId?: string;
  /** The creation time of the job. */
  readonly creationTime?: Date;
  /** The provisioning state of the job. */
  provisioningState?: ProvisioningState;
  /** The start time of the job. */
  readonly startTime?: Date;
  /** The end time of the job. */
  readonly endTime?: Date;
  /** The sync type. */
  syncType?: SyncType;
  /** The exceptions that occurred while running the sync job. */
  exception?: string;
}

export function sourceControlSyncJobByIdDeserializer(item: any): SourceControlSyncJobById {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _sourceControlSyncJobByIdPropertiesDeserializer(item["properties"])),
  };
}

/** Definition of source control sync job properties. */
export interface SourceControlSyncJobByIdProperties {
  /** The source control sync job id. */
  sourceControlSyncJobId?: string;
  /** The creation time of the job. */
  readonly creationTime?: Date;
  /** The provisioning state of the job. */
  provisioningState?: ProvisioningState;
  /** The start time of the job. */
  readonly startTime?: Date;
  /** The end time of the job. */
  readonly endTime?: Date;
  /** The sync type. */
  syncType?: SyncType;
  /** The exceptions that occurred while running the sync job. */
  exception?: string;
}

export function sourceControlSyncJobByIdPropertiesDeserializer(
  item: any,
): SourceControlSyncJobByIdProperties {
  return {
    sourceControlSyncJobId: item["sourceControlSyncJobId"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    provisioningState: item["provisioningState"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    syncType: item["syncType"],
    exception: item["exception"],
  };
}

/** The response of a SourceControlSyncJob list operation. */
export interface _SourceControlSyncJobListResult {
  /** The SourceControlSyncJob items on this page */
  value: SourceControlSyncJob[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sourceControlSyncJobListResultDeserializer(
  item: any,
): _SourceControlSyncJobListResult {
  return {
    value: sourceControlSyncJobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sourceControlSyncJobArrayDeserializer(result: Array<SourceControlSyncJob>): any[] {
  return result.map((item) => {
    return sourceControlSyncJobDeserializer(item);
  });
}

/** The response model for the list source control sync job streams operation. */
export interface _SourceControlSyncJobStreamsListBySyncJob {
  /** The SourceControlSyncJobStream items on this page */
  value: SourceControlSyncJobStream[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sourceControlSyncJobStreamsListBySyncJobDeserializer(
  item: any,
): _SourceControlSyncJobStreamsListBySyncJob {
  return {
    value: sourceControlSyncJobStreamArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sourceControlSyncJobStreamArrayDeserializer(
  result: Array<SourceControlSyncJobStream>,
): any[] {
  return result.map((item) => {
    return sourceControlSyncJobStreamDeserializer(item);
  });
}

/** Definition of the source control sync job stream. */
export interface SourceControlSyncJobStream {
  /** Resource id. */
  readonly id?: string;
  /** The sync job stream id. */
  sourceControlSyncJobStreamId?: string;
  /** The summary of the sync job stream. */
  summary?: string;
  /** The time of the sync job stream. */
  readonly time?: Date;
  /** The type of the sync job stream. */
  streamType?: StreamType;
}

export function sourceControlSyncJobStreamDeserializer(item: any): SourceControlSyncJobStream {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _sourceControlSyncJobStreamPropertiesDeserializer(item["properties"])),
  };
}

/** Definition of source control sync job stream properties. */
export interface SourceControlSyncJobStreamProperties {
  /** The sync job stream id. */
  sourceControlSyncJobStreamId?: string;
  /** The summary of the sync job stream. */
  summary?: string;
  /** The time of the sync job stream. */
  readonly time?: Date;
  /** The type of the sync job stream. */
  streamType?: StreamType;
}

export function sourceControlSyncJobStreamPropertiesDeserializer(
  item: any,
): SourceControlSyncJobStreamProperties {
  return {
    sourceControlSyncJobStreamId: item["sourceControlSyncJobStreamId"],
    summary: item["summary"],
    time: !item["time"] ? item["time"] : new Date(item["time"]),
    streamType: item["streamType"],
  };
}

/** The type of the sync job stream. */
export enum KnownStreamType {
  /** Error */
  Error = "Error",
  /** Output */
  Output = "Output",
}

/**
 * The type of the sync job stream. \
 * {@link KnownStreamType} can be used interchangeably with StreamType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Error**: Error \
 * **Output**: Output
 */
export type StreamType = string;

/** Definition of the source control sync job stream by id. */
export interface SourceControlSyncJobStreamById {
  /** Resource id. */
  readonly id?: string;
  /** The sync job stream id. */
  sourceControlSyncJobStreamId?: string;
  /** The summary of the sync job stream. */
  summary?: string;
  /** The time of the sync job stream. */
  readonly time?: Date;
  /** The type of the sync job stream. */
  streamType?: StreamType;
  /** The text of the sync job stream. */
  streamText?: string;
  /** The values of the job stream. */
  value?: Record<string, any>;
}

export function sourceControlSyncJobStreamByIdDeserializer(
  item: any,
): SourceControlSyncJobStreamById {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _sourceControlSyncJobStreamByIdPropertiesDeserializer(item["properties"])),
  };
}

/** Definition of source control sync job stream by id properties. */
export interface SourceControlSyncJobStreamByIdProperties {
  /** The sync job stream id. */
  sourceControlSyncJobStreamId?: string;
  /** The summary of the sync job stream. */
  summary?: string;
  /** The time of the sync job stream. */
  readonly time?: Date;
  /** The type of the sync job stream. */
  streamType?: StreamType;
  /** The text of the sync job stream. */
  streamText?: string;
  /** The values of the job stream. */
  value?: Record<string, any>;
}

export function sourceControlSyncJobStreamByIdPropertiesDeserializer(
  item: any,
): SourceControlSyncJobStreamByIdProperties {
  return {
    sourceControlSyncJobStreamId: item["sourceControlSyncJobStreamId"],
    summary: item["summary"],
    time: !item["time"] ? item["time"] : new Date(item["time"]),
    streamType: item["streamType"],
    streamText: item["streamText"],
    value: !item["value"]
      ? item["value"]
      : Object.fromEntries(Object.entries(item["value"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Definition of the variable. */
export interface Variable extends ProxyResource {
  /** Gets or sets the value of the variable. */
  value?: string;
  /** Gets or sets the encrypted flag of the variable. */
  isEncrypted?: boolean;
  /** Gets or sets the creation time. */
  creationTime?: Date;
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
}

export function variableDeserializer(item: any): Variable {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _variablePropertiesDeserializer(item["properties"])),
  };
}

/** Definition of the variable properties */
export interface VariableProperties {
  /** Gets or sets the value of the variable. */
  value?: string;
  /** Gets or sets the encrypted flag of the variable. */
  isEncrypted?: boolean;
  /** Gets or sets the creation time. */
  creationTime?: Date;
  /** Gets or sets the last modified time. */
  lastModifiedTime?: Date;
  /** Gets or sets the description. */
  description?: string;
}

export function variablePropertiesDeserializer(item: any): VariableProperties {
  return {
    value: item["value"],
    isEncrypted: item["isEncrypted"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
  };
}

/** The parameters supplied to the create or update variable operation. */
export interface VariableCreateOrUpdateParameters {
  /** Gets or sets the name of the variable. */
  name: string;
  /** Gets or sets the value of the variable. */
  value?: string;
  /** Gets or sets the description of the variable. */
  description?: string;
  /** Gets or sets the encrypted flag of the variable. */
  isEncrypted?: boolean;
}

export function variableCreateOrUpdateParametersSerializer(
  item: VariableCreateOrUpdateParameters,
): any {
  return {
    name: item["name"],
    properties: _variableCreateOrUpdateParametersPropertiesSerializer(item),
  };
}

/** The properties of the create variable operation. */
export interface VariableCreateOrUpdateProperties {
  /** Gets or sets the value of the variable. */
  value?: string;
  /** Gets or sets the description of the variable. */
  description?: string;
  /** Gets or sets the encrypted flag of the variable. */
  isEncrypted?: boolean;
}

export function variableCreateOrUpdatePropertiesSerializer(
  item: VariableCreateOrUpdateProperties,
): any {
  return {
    value: item["value"],
    description: item["description"],
    isEncrypted: item["isEncrypted"],
  };
}

/** The parameters supplied to the update variable operation. */
export interface VariableUpdateParameters {
  /** Gets or sets the name of the variable. */
  name?: string;
  /** Gets or sets the value of the variable. */
  value?: string;
  /** Gets or sets the description of the variable. */
  description?: string;
}

export function variableUpdateParametersSerializer(item: VariableUpdateParameters): any {
  return {
    name: item["name"],
    properties: areAllPropsUndefined(item, ["value", "description"])
      ? undefined
      : _variableUpdateParametersPropertiesSerializer(item),
  };
}

/** The properties of the update variable */
export interface VariableUpdateProperties {
  /** Gets or sets the value of the variable. */
  value?: string;
  /** Gets or sets the description of the variable. */
  description?: string;
}

export function variableUpdatePropertiesSerializer(item: VariableUpdateProperties): any {
  return { value: item["value"], description: item["description"] };
}

/** The response of a Variable list operation. */
export interface _VariableListResult {
  /** The Variable items on this page */
  value: Variable[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _variableListResultDeserializer(item: any): _VariableListResult {
  return {
    value: variableArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function variableArrayDeserializer(result: Array<Variable>): any[] {
  return result.map((item) => {
    return variableDeserializer(item);
  });
}

/** Definition of the watcher type. */
export interface Watcher extends ProxyResource {
  /** Gets or sets the etag of the resource. */
  etag?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Gets or sets the frequency at which the watcher is invoked. */
  executionFrequencyInSeconds?: number;
  /** Gets or sets the name of the script the watcher is attached to, i.e. the name of an existing runbook. */
  scriptName?: string;
  /** Gets or sets the parameters of the script. */
  scriptParameters?: Record<string, string>;
  /** Gets or sets the name of the hybrid worker group the watcher will run on. */
  scriptRunOn?: string;
  /** Gets the current status of the watcher. */
  readonly status?: string;
  /** Gets or sets the creation time. */
  readonly creationTime?: Date;
  /** Gets or sets the last modified time. */
  readonly lastModifiedTime?: Date;
  /** Details of the user who last modified the watcher. */
  readonly lastModifiedBy?: string;
  /** Gets or sets the description. */
  description?: string;
}

export function watcherSerializer(item: Watcher): any {
  return {
    properties: areAllPropsUndefined(item, [
      "executionFrequencyInSeconds",
      "scriptName",
      "scriptParameters",
      "scriptRunOn",
      "description",
    ])
      ? undefined
      : _watcherPropertiesSerializer(item),
    etag: item["etag"],
    tags: item["tags"],
    location: item["location"],
  };
}

export function watcherDeserializer(item: any): Watcher {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _watcherPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** Definition of the watcher properties */
export interface WatcherProperties {
  /** Gets or sets the frequency at which the watcher is invoked. */
  executionFrequencyInSeconds?: number;
  /** Gets or sets the name of the script the watcher is attached to, i.e. the name of an existing runbook. */
  scriptName?: string;
  /** Gets or sets the parameters of the script. */
  scriptParameters?: Record<string, string>;
  /** Gets or sets the name of the hybrid worker group the watcher will run on. */
  scriptRunOn?: string;
  /** Gets the current status of the watcher. */
  readonly status?: string;
  /** Gets or sets the creation time. */
  readonly creationTime?: Date;
  /** Gets or sets the last modified time. */
  readonly lastModifiedTime?: Date;
  /** Details of the user who last modified the watcher. */
  readonly lastModifiedBy?: string;
  /** Gets or sets the description. */
  description?: string;
}

export function watcherPropertiesSerializer(item: WatcherProperties): any {
  return {
    executionFrequencyInSeconds: item["executionFrequencyInSeconds"],
    scriptName: item["scriptName"],
    scriptParameters: item["scriptParameters"],
    scriptRunOn: item["scriptRunOn"],
    description: item["description"],
  };
}

export function watcherPropertiesDeserializer(item: any): WatcherProperties {
  return {
    executionFrequencyInSeconds: item["executionFrequencyInSeconds"],
    scriptName: item["scriptName"],
    scriptParameters: !item["scriptParameters"]
      ? item["scriptParameters"]
      : Object.fromEntries(
          Object.entries(item["scriptParameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    scriptRunOn: item["scriptRunOn"],
    status: item["status"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    lastModifiedBy: item["lastModifiedBy"],
    description: item["description"],
  };
}

/** model interface WatcherUpdateParameters */
export interface WatcherUpdateParameters {
  /** Gets or sets the name of the resource. */
  name?: string;
  /** Gets or sets the frequency at which the watcher is invoked. */
  executionFrequencyInSeconds?: number;
}

export function watcherUpdateParametersSerializer(item: WatcherUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, ["executionFrequencyInSeconds"])
      ? undefined
      : _watcherUpdateParametersPropertiesSerializer(item),
    name: item["name"],
  };
}

/** The properties of the update watcher operation. */
export interface WatcherUpdateProperties {
  /** Gets or sets the frequency at which the watcher is invoked. */
  executionFrequencyInSeconds?: number;
}

export function watcherUpdatePropertiesSerializer(item: WatcherUpdateProperties): any {
  return { executionFrequencyInSeconds: item["executionFrequencyInSeconds"] };
}

/** The response of a Watcher list operation. */
export interface _WatcherListResult {
  /** The Watcher items on this page */
  value: Watcher[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _watcherListResultDeserializer(item: any): _WatcherListResult {
  return {
    value: watcherArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function watcherArraySerializer(result: Array<Watcher>): any[] {
  return result.map((item) => {
    return watcherSerializer(item);
  });
}

export function watcherArrayDeserializer(result: Array<Watcher>): any[] {
  return result.map((item) => {
    return watcherDeserializer(item);
  });
}

/** The response model for the list deleted automation account. */
export interface DeletedAutomationAccountListResult {
  /** Gets or sets the list of deleted automation accounts. */
  value?: DeletedAutomationAccount[];
}

export function deletedAutomationAccountListResultDeserializer(
  item: any,
): DeletedAutomationAccountListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : deletedAutomationAccountArrayDeserializer(item["value"]),
  };
}

export function deletedAutomationAccountArrayDeserializer(
  result: Array<DeletedAutomationAccount>,
): any[] {
  return result.map((item) => {
    return deletedAutomationAccountDeserializer(item);
  });
}

/** Definition of the deleted automation account type. */
export interface DeletedAutomationAccount {
  /** The resource id. */
  id?: string;
  /** Gets or sets name of the resource. */
  name?: string;
  /** The resource type. */
  type?: string;
  /** Gets or sets the location of the resource. */
  location?: string;
  /** Gets or sets the Automation Account Resource Id. */
  automationAccountResourceId?: string;
  /** Gets or sets the Automation Account Id. */
  automationAccountId?: string;
  /** Gets or sets the location of the resource. */
  locationPropertiesLocation?: string;
  /** Gets the deletion time. */
  readonly deletionTime?: Date;
}

export function deletedAutomationAccountDeserializer(item: any): DeletedAutomationAccount {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _deletedAutomationAccountPropertiesDeserializer(item["properties"])),
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
  };
}

/** Definition of the deleted automation account properties. */
export interface DeletedAutomationAccountProperties {
  /** Gets or sets the Automation Account Resource Id. */
  automationAccountResourceId?: string;
  /** Gets or sets the Automation Account Id. */
  automationAccountId?: string;
  /** Gets or sets the location of the resource. */
  location?: string;
  /** Gets the deletion time. */
  readonly deletionTime?: Date;
}

export function deletedAutomationAccountPropertiesDeserializer(
  item: any,
): DeletedAutomationAccountProperties {
  return {
    automationAccountResourceId: item["automationAccountResourceId"],
    automationAccountId: item["automationAccountId"],
    location: item["location"],
    deletionTime: !item["deletionTime"] ? item["deletionTime"] : new Date(item["deletionTime"]),
  };
}

/** Known values of {@link CountType} that the service accepts. */
export enum KnownCountType {
  /** status */
  Status = "status",
  /** nodeconfiguration */
  Nodeconfiguration = "nodeconfiguration",
}

/** Type of CountType */
export type CountType = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-10-23 API version. */
  V20241023 = "2024-10-23",
}

export function _operationPropertiesDeserializer(item: any) {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : operationPropertiesFormatServiceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

export function _softwareUpdateConfigurationPropertiesSerializer(
  item: SoftwareUpdateConfiguration,
): any {
  return {
    updateConfiguration: updateConfigurationSerializer(item["updateConfiguration"]),
    scheduleInfo: sucSchedulePropertiesSerializer(item["scheduleInfo"]),
    error: !item["error"] ? item["error"] : automationErrorResponseSerializer(item["error"]),
    tasks: !item["tasks"]
      ? item["tasks"]
      : softwareUpdateConfigurationTasksSerializer(item["tasks"]),
  };
}

export function _softwareUpdateConfigurationPropertiesDeserializer(item: any) {
  return {
    updateConfiguration: updateConfigurationDeserializer(item["updateConfiguration"]),
    scheduleInfo: sucSchedulePropertiesDeserializer(item["scheduleInfo"]),
    provisioningState: item["provisioningState"],
    error: !item["error"] ? item["error"] : automationErrorResponseDeserializer(item["error"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    createdBy: item["createdBy"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    lastModifiedBy: item["lastModifiedBy"],
    tasks: !item["tasks"]
      ? item["tasks"]
      : softwareUpdateConfigurationTasksDeserializer(item["tasks"]),
  };
}

export function _softwareUpdateConfigurationCollectionItemPropertiesDeserializer(item: any) {
  return {
    updateConfiguration: !item["updateConfiguration"]
      ? item["updateConfiguration"]
      : updateConfigurationDeserializer(item["updateConfiguration"]),
    tasks: !item["tasks"]
      ? item["tasks"]
      : softwareUpdateConfigurationTasksDeserializer(item["tasks"]),
    frequency: item["frequency"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    provisioningState: item["provisioningState"],
    nextRun: !item["nextRun"] ? item["nextRun"] : new Date(item["nextRun"]),
  };
}

export function _hybridRunbookWorkerPropertiesDeserializer(item: any) {
  return {
    ip: item["ip"],
    registeredDateTime: !item["registeredDateTime"]
      ? item["registeredDateTime"]
      : new Date(item["registeredDateTime"]),
    lastSeenDateTime: !item["lastSeenDateTime"]
      ? item["lastSeenDateTime"]
      : new Date(item["lastSeenDateTime"]),
    vmResourceId: item["vmResourceId"],
    workerType: item["workerType"],
    workerName: item["workerName"],
  };
}

export function _hybridRunbookWorkerCreateParametersPropertiesSerializer(
  item: HybridRunbookWorkerCreateParameters,
): any {
  return { vmResourceId: item["vmResourceId"] };
}

export function _modulePropertiesDeserializer(item: any) {
  return {
    isGlobal: item["isGlobal"],
    version: item["version"],
    sizeInBytes: item["sizeInBytes"],
    activityCount: item["activityCount"],
    provisioningState: item["provisioningState"],
    contentLink: !item["contentLink"]
      ? item["contentLink"]
      : contentLinkDeserializer(item["contentLink"]),
    error: !item["error"] ? item["error"] : moduleErrorInfoDeserializer(item["error"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
    isComposite: item["isComposite"],
  };
}

export function _pythonPackageCreateParametersPropertiesSerializer(
  item: PythonPackageCreateParameters,
): any {
  return { contentLink: contentLinkSerializer(item["contentLink"]) };
}

export function _runtimeEnvironmentPropertiesRuntimeSerializer(
  item: RuntimeEnvironmentProperties,
): any {
  return { language: item["language"], version: item["version"] };
}

export function _runtimeEnvironmentPropertiesRuntimeDeserializer(item: any) {
  return {
    language: item["language"],
    version: item["version"],
  };
}

export function _runtimeEnvironmentPropertiesSerializer(item: RuntimeEnvironment): any {
  return {
    runtime: !item["runtime"] ? item["runtime"] : runtimePropertiesSerializer(item["runtime"]),
    defaultPackages: item["defaultPackages"],
    description: item["description"],
  };
}

export function _runtimeEnvironmentPropertiesDeserializer(item: any) {
  return {
    runtime: !item["runtime"] ? item["runtime"] : runtimePropertiesDeserializer(item["runtime"]),
    defaultPackages: !item["defaultPackages"]
      ? item["defaultPackages"]
      : Object.fromEntries(
          Object.entries(item["defaultPackages"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    description: item["description"],
  };
}

export function _runtimeEnvironmentUpdateParametersPropertiesSerializer(
  item: RuntimeEnvironmentUpdateParameters,
): any {
  return { defaultPackages: item["defaultPackages"] };
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointPropertySerializer(item["privateEndpoint"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStatePropertySerializer(
          item["privateLinkServiceConnectionState"],
        ),
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointPropertyDeserializer(item["privateEndpoint"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStatePropertyDeserializer(
          item["privateLinkServiceConnectionState"],
        ),
  };
}

export function _automationAccountPropertiesDeserializer(item: any) {
  return {
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    lastModifiedBy: item["lastModifiedBy"],
    state: item["state"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesDeserializer(item["encryption"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
    automationHybridServiceUrl: item["automationHybridServiceUrl"],
  };
}

export function _automationAccountCreateOrUpdateParametersPropertiesSerializer(
  item: AutomationAccountCreateOrUpdateParameters,
): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesSerializer(item["encryption"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
  };
}

export function _automationAccountUpdateParametersPropertiesSerializer(
  item: AutomationAccountUpdateParameters,
): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesSerializer(item["encryption"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    disableLocalAuth: item["disableLocalAuth"],
  };
}

export function _deletedRunbookPropertiesDeserializer(item: any) {
  return {
    runbookId: item["runbookId"],
    runbookType: item["runbookType"],
    runtime: item["runtime"],
    runtimeEnvironment: item["runtimeEnvironment"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    deletionTime: !item["deletionTime"] ? item["deletionTime"] : new Date(item["deletionTime"]),
  };
}

export function _privateLinkResourcePropertiesDeserializer(item: any) {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
  };
}

export function _jobCollectionItemPropertiesDeserializer(item: any) {
  return {
    runbook: !item["runbook"]
      ? item["runbook"]
      : runbookAssociationPropertyDeserializer(item["runbook"]),
    jobId: item["jobId"],
    startedBy: item["startedBy"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    provisioningState: item["provisioningState"],
    jobRuntimeEnvironment: !item["jobRuntimeEnvironment"]
      ? item["jobRuntimeEnvironment"]
      : jobRuntimeEnvironmentDeserializer(item["jobRuntimeEnvironment"]),
    runOn: item["runOn"],
  };
}

export function _jobPropertiesDeserializer(item: any) {
  return {
    runbook: !item["runbook"]
      ? item["runbook"]
      : runbookAssociationPropertyDeserializer(item["runbook"]),
    startedBy: item["startedBy"],
    runOn: item["runOn"],
    jobRuntimeEnvironment: !item["jobRuntimeEnvironment"]
      ? item["jobRuntimeEnvironment"]
      : jobRuntimeEnvironmentDeserializer(item["jobRuntimeEnvironment"]),
    jobId: item["jobId"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    status: item["status"],
    statusDetails: item["statusDetails"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    exception: item["exception"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    lastStatusModifiedTime: !item["lastStatusModifiedTime"]
      ? item["lastStatusModifiedTime"]
      : new Date(item["lastStatusModifiedTime"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    provisioningState: item["provisioningState"],
  };
}

export function _jobCreateParametersPropertiesSerializer(item: JobCreateParameters): any {
  return {
    runbook: !item["runbook"]
      ? item["runbook"]
      : runbookAssociationPropertySerializer(item["runbook"]),
    parameters: item["parameters"],
    runOn: item["runOn"],
  };
}

export function _softwareUpdateConfigurationMachineRunPropertiesDeserializer(item: any) {
  return {
    targetComputer: item["targetComputer"],
    targetComputerType: item["targetComputerType"],
    softwareUpdateConfiguration: !item["softwareUpdateConfiguration"]
      ? item["softwareUpdateConfiguration"]
      : updateConfigurationNavigationDeserializer(item["softwareUpdateConfiguration"]),
    status: item["status"],
    osType: item["osType"],
    correlationId: item["correlationId"],
    sourceComputerId: item["sourceComputerId"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    configuredDuration: item["configuredDuration"],
    job: !item["job"] ? item["job"] : jobNavigationDeserializer(item["job"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    createdBy: item["createdBy"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    lastModifiedBy: item["lastModifiedBy"],
    error: !item["error"] ? item["error"] : automationErrorResponseDeserializer(item["error"]),
  };
}

export function _softwareUpdateConfigurationRunPropertiesDeserializer(item: any) {
  return {
    softwareUpdateConfiguration: !item["softwareUpdateConfiguration"]
      ? item["softwareUpdateConfiguration"]
      : updateConfigurationNavigationDeserializer(item["softwareUpdateConfiguration"]),
    status: item["status"],
    configuredDuration: item["configuredDuration"],
    osType: item["osType"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    computerCount: item["computerCount"],
    failedCount: item["failedCount"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    createdBy: item["createdBy"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    lastModifiedBy: item["lastModifiedBy"],
    tasks: !item["tasks"]
      ? item["tasks"]
      : softwareUpdateConfigurationRunTasksDeserializer(item["tasks"]),
  };
}

export function _webhookPropertiesDeserializer(item: any) {
  return {
    isEnabled: item["isEnabled"],
    uri: item["uri"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    lastInvokedTime: !item["lastInvokedTime"]
      ? item["lastInvokedTime"]
      : new Date(item["lastInvokedTime"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    runbook: !item["runbook"]
      ? item["runbook"]
      : runbookAssociationPropertyDeserializer(item["runbook"]),
    runOn: item["runOn"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    lastModifiedBy: item["lastModifiedBy"],
    description: item["description"],
  };
}

export function _webhookCreateOrUpdateParametersPropertiesSerializer(
  item: WebhookCreateOrUpdateParameters,
): any {
  return {
    isEnabled: item["isEnabled"],
    uri: item["uri"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    parameters: item["parameters"],
    runbook: !item["runbook"]
      ? item["runbook"]
      : runbookAssociationPropertySerializer(item["runbook"]),
    runOn: item["runOn"],
  };
}

export function _webhookUpdateParametersPropertiesSerializer(item: WebhookUpdateParameters): any {
  return {
    isEnabled: item["isEnabled"],
    runOn: item["runOn"],
    parameters: item["parameters"],
    description: item["description"],
  };
}

export function _dscNodePropertiesDeserializer(item: any) {
  return {
    lastSeen: !item["lastSeen"] ? item["lastSeen"] : new Date(item["lastSeen"]),
    registrationTime: !item["registrationTime"]
      ? item["registrationTime"]
      : new Date(item["registrationTime"]),
    ip: item["ip"],
    accountId: item["accountId"],
    nodeConfiguration: !item["nodeConfiguration"]
      ? item["nodeConfiguration"]
      : dscNodeConfigurationAssociationPropertyDeserializer(item["nodeConfiguration"]),
    status: item["status"],
    nodeId: item["nodeId"],
    etag: item["etag"],
    totalCount: item["totalCount"],
    extensionHandler: !item["extensionHandler"]
      ? item["extensionHandler"]
      : dscNodeExtensionHandlerAssociationPropertyArrayDeserializer(item["extensionHandler"]),
  };
}

export function _dscNodeUpdateParametersPropertiesNodeConfigurationSerializer(
  item: DscNodeUpdateParametersProperties,
): any {
  return { name: item["name"] };
}

export function _dscNodeUpdateParametersPropertiesNodeConfigurationDeserializer(item: any) {
  return {
    name: item["name"],
  };
}

export function _certificatePropertiesDeserializer(item: any) {
  return {
    thumbprint: item["thumbprint"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    isExportable: item["isExportable"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
  };
}

export function _certificateCreateOrUpdateParametersPropertiesSerializer(
  item: CertificateCreateOrUpdateParameters,
): any {
  return {
    base64Value: item["base64Value"],
    description: item["description"],
    thumbprint: item["thumbprint"],
    isExportable: item["isExportable"],
  };
}

export function _certificateUpdateParametersPropertiesSerializer(
  item: CertificateUpdateParameters,
): any {
  return { description: item["description"] };
}

export function _connectionPropertiesDeserializer(item: any) {
  return {
    connectionType: !item["connectionType"]
      ? item["connectionType"]
      : connectionTypeAssociationPropertyDeserializer(item["connectionType"]),
    fieldDefinitionValues: !item["fieldDefinitionValues"]
      ? item["fieldDefinitionValues"]
      : Object.fromEntries(
          Object.entries(item["fieldDefinitionValues"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
  };
}

export function _connectionCreateOrUpdateParametersPropertiesSerializer(
  item: ConnectionCreateOrUpdateParameters,
): any {
  return {
    description: item["description"],
    connectionType: connectionTypeAssociationPropertySerializer(item["connectionType"]),
    fieldDefinitionValues: item["fieldDefinitionValues"],
  };
}

export function _connectionUpdateParametersPropertiesSerializer(
  item: ConnectionUpdateParameters,
): any {
  return { description: item["description"], fieldDefinitionValues: item["fieldDefinitionValues"] };
}

export function _connectionTypePropertiesDeserializer(item: any) {
  return {
    isGlobal: item["isGlobal"],
    fieldDefinitions: !item["fieldDefinitions"]
      ? item["fieldDefinitions"]
      : fieldDefinitionRecordDeserializer(item["fieldDefinitions"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
  };
}

export function _connectionTypeCreateOrUpdateParametersPropertiesSerializer(
  item: ConnectionTypeCreateOrUpdateParameters,
): any {
  return {
    isGlobal: item["isGlobal"],
    fieldDefinitions: fieldDefinitionRecordSerializer(item["fieldDefinitions"]),
  };
}

export function _credentialPropertiesDeserializer(item: any) {
  return {
    userName: item["userName"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
  };
}

export function _credentialCreateOrUpdateParametersPropertiesSerializer(
  item: CredentialCreateOrUpdateParameters,
): any {
  return {
    userName: item["userName"],
    password: item["password"],
    description: item["description"],
  };
}

export function _credentialUpdateParametersPropertiesSerializer(
  item: CredentialUpdateParameters,
): any {
  return {
    userName: item["userName"],
    password: item["password"],
    description: item["description"],
  };
}

export function _dscConfigurationPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    jobCount: item["jobCount"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : dscConfigurationParameterRecordDeserializer(item["parameters"]),
    source: !item["source"] ? item["source"] : contentSourceDeserializer(item["source"]),
    state: item["state"],
    logVerbose: item["logVerbose"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    nodeConfigurationCount: item["nodeConfigurationCount"],
    description: item["description"],
  };
}

export function _dscConfigurationCreateOrUpdateParametersPropertiesSerializer(
  item: DscConfigurationCreateOrUpdateParameters,
): any {
  return {
    logVerbose: item["logVerbose"],
    logProgress: item["logProgress"],
    source: contentSourceSerializer(item["source"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : dscConfigurationParameterRecordSerializer(item["parameters"]),
    description: item["description"],
  };
}

export function _dscConfigurationUpdateParametersPropertiesSerializer(
  item: DscConfigurationUpdateParameters,
): any {
  return {
    logVerbose: item["logVerbose"],
    logProgress: item["logProgress"],
    source: !item["source"] ? item["source"] : contentSourceSerializer(item["source"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : dscConfigurationParameterRecordSerializer(item["parameters"]),
    description: item["description"],
  };
}

export function _dscNodeConfigurationPropertiesDeserializer(item: any) {
  return {
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    configuration: !item["configuration"]
      ? item["configuration"]
      : dscConfigurationAssociationPropertyDeserializer(item["configuration"]),
    source: item["source"],
    nodeCount: item["nodeCount"],
    incrementNodeConfigurationBuild: item["incrementNodeConfigurationBuild"],
  };
}

export function _dscNodeConfigurationCreateOrUpdateParametersPropertiesSerializer(
  item: DscNodeConfigurationCreateOrUpdateParameters,
): any {
  return {
    source: !item["source"] ? item["source"] : contentSourceSerializer(item["source"]),
    configuration: !item["configuration"]
      ? item["configuration"]
      : dscConfigurationAssociationPropertySerializer(item["configuration"]),
    incrementNodeConfigurationBuild: item["incrementNodeConfigurationBuild"],
  };
}

export function _hybridRunbookWorkerGroupPropertiesDeserializer(item: any) {
  return {
    groupType: item["groupType"],
    credential: !item["credential"]
      ? item["credential"]
      : runAsCredentialAssociationPropertyDeserializer(item["credential"]),
  };
}

export function _hybridRunbookWorkerGroupCreateOrUpdateParametersPropertiesSerializer(
  item: HybridRunbookWorkerGroupCreateOrUpdateParameters,
): any {
  return {
    credential: !item["credential"]
      ? item["credential"]
      : runAsCredentialAssociationPropertySerializer(item["credential"]),
  };
}

export function _jobStreamPropertiesDeserializer(item: any) {
  return {
    jobStreamId: item["jobStreamId"],
    time: !item["time"] ? item["time"] : new Date(item["time"]),
    streamType: item["streamType"],
    streamText: item["streamText"],
    summary: item["summary"],
    value: !item["value"]
      ? item["value"]
      : Object.fromEntries(Object.entries(item["value"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function _jobSchedulePropertiesDeserializer(item: any) {
  return {
    jobScheduleId: item["jobScheduleId"],
    schedule: !item["schedule"]
      ? item["schedule"]
      : scheduleAssociationPropertyDeserializer(item["schedule"]),
    runbook: !item["runbook"]
      ? item["runbook"]
      : runbookAssociationPropertyDeserializer(item["runbook"]),
    runOn: item["runOn"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function _jobScheduleCreateParametersPropertiesSerializer(
  item: JobScheduleCreateParameters,
): any {
  return {
    schedule: scheduleAssociationPropertySerializer(item["schedule"]),
    runbook: runbookAssociationPropertySerializer(item["runbook"]),
    runOn: item["runOn"],
    parameters: item["parameters"],
  };
}

export function _moduleCreateOrUpdateParametersPropertiesSerializer(
  item: ModuleCreateOrUpdateParameters,
): any {
  return { contentLink: contentLinkSerializer(item["contentLink"]) };
}

export function _moduleUpdateParametersPropertiesSerializer(item: ModuleUpdateParameters): any {
  return {
    contentLink: !item["contentLink"]
      ? item["contentLink"]
      : contentLinkSerializer(item["contentLink"]),
  };
}

export function _activityPropertiesDeserializer(item: any) {
  return {
    definition: item["definition"],
    parameterSets: !item["parameterSets"]
      ? item["parameterSets"]
      : activityParameterSetArrayDeserializer(item["parameterSets"]),
    outputTypes: !item["outputTypes"]
      ? item["outputTypes"]
      : activityOutputTypeArrayDeserializer(item["outputTypes"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
  };
}

export function _packagePropertiesDeserializer(item: any) {
  return {
    default: item["default"],
    version: item["version"],
    sizeInBytes: item["sizeInBytes"],
    provisioningState: item["provisioningState"],
    contentLink: !item["contentLink"]
      ? item["contentLink"]
      : contentLinkDeserializer(item["contentLink"]),
    error: !item["error"] ? item["error"] : packageErrorInfoDeserializer(item["error"]),
    allOf: !item["allOf"] ? item["allOf"] : systemDataDeserializer(item["allOf"]),
  };
}

export function _packageCreateOrUpdateParametersPropertiesSerializer(
  item: PackageCreateOrUpdateParameters,
): any {
  return { contentLink: contentLinkSerializer(item["contentLink"]) };
}

export function _packageUpdateParametersPropertiesSerializer(item: PackageUpdateParameters): any {
  return {
    contentLink: !item["contentLink"]
      ? item["contentLink"]
      : contentLinkSerializer(item["contentLink"]),
  };
}

export function _runbookPropertiesDeserializer(item: any) {
  return {
    runtimeEnvironment: item["runtimeEnvironment"],
    runbookType: item["runbookType"],
    publishContentLink: !item["publishContentLink"]
      ? item["publishContentLink"]
      : contentLinkDeserializer(item["publishContentLink"]),
    state: item["state"],
    logVerbose: item["logVerbose"],
    logProgress: item["logProgress"],
    logActivityTrace: item["logActivityTrace"],
    jobCount: item["jobCount"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : runbookParameterRecordDeserializer(item["parameters"]),
    outputTypes: !item["outputTypes"]
      ? item["outputTypes"]
      : item["outputTypes"].map((p: any) => {
          return p;
        }),
    draft: !item["draft"] ? item["draft"] : runbookDraftDeserializer(item["draft"]),
    provisioningState: item["provisioningState"],
    lastModifiedBy: item["lastModifiedBy"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
  };
}

export function _runbookCreateOrUpdateParametersPropertiesSerializer(
  item: RunbookCreateOrUpdateParameters,
): any {
  return {
    logVerbose: item["logVerbose"],
    logProgress: item["logProgress"],
    runtimeEnvironment: item["runtimeEnvironment"],
    runbookType: item["runbookType"],
    draft: !item["draft"] ? item["draft"] : runbookDraftSerializer(item["draft"]),
    publishContentLink: !item["publishContentLink"]
      ? item["publishContentLink"]
      : contentLinkSerializer(item["publishContentLink"]),
    description: item["description"],
    logActivityTrace: item["logActivityTrace"],
  };
}

export function _runbookUpdateParametersPropertiesSerializer(item: RunbookUpdateParameters): any {
  return {
    description: item["description"],
    logVerbose: item["logVerbose"],
    logProgress: item["logProgress"],
    logActivityTrace: item["logActivityTrace"],
  };
}

export function _schedulePropertiesDeserializer(item: any) {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    startTimeOffsetMinutes: item["startTimeOffsetMinutes"],
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    expiryTimeOffsetMinutes: item["expiryTimeOffsetMinutes"],
    isEnabled: item["isEnabled"],
    nextRun: !item["nextRun"] ? item["nextRun"] : new Date(item["nextRun"]),
    nextRunOffsetMinutes: item["nextRunOffsetMinutes"],
    interval: item["interval"],
    frequency: item["frequency"],
    timeZone: item["timeZone"],
    advancedSchedule: !item["advancedSchedule"]
      ? item["advancedSchedule"]
      : advancedScheduleDeserializer(item["advancedSchedule"]),
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
  };
}

export function _scheduleCreateOrUpdateParametersPropertiesSerializer(
  item: ScheduleCreateOrUpdateParameters,
): any {
  return {
    description: item["description"],
    startTime: item["startTime"].toISOString(),
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    interval: item["interval"],
    frequency: item["frequency"],
    timeZone: item["timeZone"],
    advancedSchedule: !item["advancedSchedule"]
      ? item["advancedSchedule"]
      : advancedScheduleSerializer(item["advancedSchedule"]),
  };
}

export function _scheduleUpdateParametersPropertiesSerializer(item: ScheduleUpdateParameters): any {
  return { description: item["description"], isEnabled: item["isEnabled"] };
}

export function _sourceControlPropertiesDeserializer(item: any) {
  return {
    repoUrl: item["repoUrl"],
    branch: item["branch"],
    folderPath: item["folderPath"],
    autoSync: item["autoSync"],
    publishRunbook: item["publishRunbook"],
    sourceType: item["sourceType"],
    description: item["description"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
  };
}

export function _sourceControlCreateOrUpdateParametersPropertiesSerializer(
  item: SourceControlCreateOrUpdateParameters,
): any {
  return {
    repoUrl: item["repoUrl"],
    branch: item["branch"],
    folderPath: item["folderPath"],
    autoSync: item["autoSync"],
    publishRunbook: item["publishRunbook"],
    sourceType: item["sourceType"],
    securityToken: !item["securityToken"]
      ? item["securityToken"]
      : sourceControlSecurityTokenPropertiesSerializer(item["securityToken"]),
    description: item["description"],
  };
}

export function _sourceControlUpdateParametersPropertiesSerializer(
  item: SourceControlUpdateParameters,
): any {
  return {
    branch: item["branch"],
    folderPath: item["folderPath"],
    autoSync: item["autoSync"],
    publishRunbook: item["publishRunbook"],
    securityToken: !item["securityToken"]
      ? item["securityToken"]
      : sourceControlSecurityTokenPropertiesSerializer(item["securityToken"]),
    description: item["description"],
  };
}

export function _sourceControlSyncJobCreateParametersPropertiesSerializer(
  item: SourceControlSyncJobCreateParameters,
): any {
  return { commitId: item["commitId"] };
}

export function _sourceControlSyncJobPropertiesDeserializer(item: any) {
  return {
    sourceControlSyncJobId: item["sourceControlSyncJobId"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    provisioningState: item["provisioningState"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    syncType: item["syncType"],
  };
}

export function _sourceControlSyncJobByIdPropertiesDeserializer(item: any) {
  return {
    sourceControlSyncJobId: item["sourceControlSyncJobId"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    provisioningState: item["provisioningState"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    syncType: item["syncType"],
    exception: item["exception"],
  };
}

export function _sourceControlSyncJobStreamPropertiesDeserializer(item: any) {
  return {
    sourceControlSyncJobStreamId: item["sourceControlSyncJobStreamId"],
    summary: item["summary"],
    time: !item["time"] ? item["time"] : new Date(item["time"]),
    streamType: item["streamType"],
  };
}

export function _sourceControlSyncJobStreamByIdPropertiesDeserializer(item: any) {
  return {
    sourceControlSyncJobStreamId: item["sourceControlSyncJobStreamId"],
    summary: item["summary"],
    time: !item["time"] ? item["time"] : new Date(item["time"]),
    streamType: item["streamType"],
    streamText: item["streamText"],
    value: !item["value"]
      ? item["value"]
      : Object.fromEntries(Object.entries(item["value"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function _variablePropertiesDeserializer(item: any) {
  return {
    value: item["value"],
    isEncrypted: item["isEncrypted"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    description: item["description"],
  };
}

export function _variableCreateOrUpdateParametersPropertiesSerializer(
  item: VariableCreateOrUpdateParameters,
): any {
  return {
    value: item["value"],
    description: item["description"],
    isEncrypted: item["isEncrypted"],
  };
}

export function _variableUpdateParametersPropertiesSerializer(item: VariableUpdateParameters): any {
  return { value: item["value"], description: item["description"] };
}

export function _watcherPropertiesSerializer(item: Watcher): any {
  return {
    executionFrequencyInSeconds: item["executionFrequencyInSeconds"],
    scriptName: item["scriptName"],
    scriptParameters: item["scriptParameters"],
    scriptRunOn: item["scriptRunOn"],
    description: item["description"],
  };
}

export function _watcherPropertiesDeserializer(item: any) {
  return {
    executionFrequencyInSeconds: item["executionFrequencyInSeconds"],
    scriptName: item["scriptName"],
    scriptParameters: !item["scriptParameters"]
      ? item["scriptParameters"]
      : Object.fromEntries(
          Object.entries(item["scriptParameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    scriptRunOn: item["scriptRunOn"],
    status: item["status"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    lastModifiedBy: item["lastModifiedBy"],
    description: item["description"],
  };
}

export function _watcherUpdateParametersPropertiesSerializer(item: WatcherUpdateParameters): any {
  return { executionFrequencyInSeconds: item["executionFrequencyInSeconds"] };
}

export function _deletedAutomationAccountPropertiesDeserializer(item: any) {
  return {
    automationAccountResourceId: item["automationAccountResourceId"],
    automationAccountId: item["automationAccountId"],
    locationPropertiesLocation: item["location"],
    deletionTime: !item["deletionTime"] ? item["deletionTime"] : new Date(item["deletionTime"]),
  };
}

export type RunbookGetContentResponse = { body: string };

export type RunbookDraftOperationsGetContentResponse = { body: string };

export type DscConfigurationOperationsGetContentResponse = { body: string };

export type NodeReportsGetContentResponse = { body: string };

export type WebhookOperationsGenerateUriResponse = { body: string };

export type JobOperationsGetRunbookContentResponse = { body: string };

export type JobOperationsGetOutputResponse = { body: string };
