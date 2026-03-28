// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Result of the request to list HDInsight operations. It contains a list of operations and a URL link to get the next set of results. */
export interface _OperationListResult {
  /** The list of HDInsight operations supported by the HDInsight resource provider. */
  readonly value?: Operation[];
  /** The URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** The HDInsight REST API operation. */
export interface Operation {
  /** The operation name: {provider}/{resource}/{operation} */
  name?: string;
  /** The display of operation. */
  display?: OperationDisplay;
  /** The operation properties. */
  properties?: OperationProperties;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    properties: !item["properties"]
      ? item["properties"]
      : operationPropertiesDeserializer(item["properties"]),
  };
}

/** The object that represents the operation. */
export interface OperationDisplay {
  /** The service provider: Microsoft.HDInsight */
  provider?: string;
  /** The resource on which the operation is performed: Cluster, Applications, etc. */
  resource?: string;
  /** The operation type: read, write, delete, etc. */
  operation?: string;
  /** Localized friendly description for the operation */
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

/** The details of operation. */
export interface OperationProperties {
  /** The specification of the service. */
  serviceSpecification?: ServiceSpecification;
}

export function operationPropertiesDeserializer(item: any): OperationProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : serviceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** The specification of the service. */
export interface ServiceSpecification {
  /** The metric specifications. */
  metricSpecifications?: MetricSpecifications[];
}

export function serviceSpecificationDeserializer(item: any): ServiceSpecification {
  return {
    metricSpecifications: !item["metricSpecifications"]
      ? item["metricSpecifications"]
      : metricSpecificationsArrayDeserializer(item["metricSpecifications"]),
  };
}

export function metricSpecificationsArrayDeserializer(result: Array<MetricSpecifications>): any[] {
  return result.map((item) => {
    return metricSpecificationsDeserializer(item);
  });
}

/** The details of metric specifications. */
export interface MetricSpecifications {
  /** The name of the metric specification. */
  name?: string;
  /** The display name of the metric specification. */
  displayName?: string;
  /** The display description of the metric specification. */
  displayDescription?: string;
  /** The unit of the metric specification. */
  unit?: string;
  /** The aggregation type of the metric specification. */
  aggregationType?: string;
  /** The supported aggregation types of the metric specification. */
  supportedAggregationTypes?: string[];
  /** The supported time grain types of the metric specification. */
  supportedTimeGrainTypes?: string[];
  /** The flag indicates whether enable regional mdm account or not. */
  enableRegionalMdmAccount?: boolean;
  /** The source mdm account. */
  sourceMdmAccount?: string;
  /** The source mdm namespace. */
  sourceMdmNamespace?: string;
  /** The metric filter pattern. */
  metricFilterPattern?: string;
  /** The flag indicates whether filling gap with zero. */
  fillGapWithZero?: boolean;
  /** The category of the metric. */
  category?: string;
  /** The override name of resource id dimension name. */
  resourceIdDimensionNameOverride?: string;
  /** The flag indicates whether the metric is internal or not. */
  isInternal?: boolean;
  /** The override name of delegate metric. */
  delegateMetricNameOverride?: string;
  /** The dimensions of the metric specification. */
  dimensions?: Dimension[];
}

export function metricSpecificationsDeserializer(item: any): MetricSpecifications {
  return {
    name: item["name"],
    displayName: item["displayName"],
    displayDescription: item["displayDescription"],
    unit: item["unit"],
    aggregationType: item["aggregationType"],
    supportedAggregationTypes: !item["supportedAggregationTypes"]
      ? item["supportedAggregationTypes"]
      : item["supportedAggregationTypes"].map((p: any) => {
          return p;
        }),
    supportedTimeGrainTypes: !item["supportedTimeGrainTypes"]
      ? item["supportedTimeGrainTypes"]
      : item["supportedTimeGrainTypes"].map((p: any) => {
          return p;
        }),
    enableRegionalMdmAccount: item["enableRegionalMdmAccount"],
    sourceMdmAccount: item["sourceMdmAccount"],
    sourceMdmNamespace: item["sourceMdmNamespace"],
    metricFilterPattern: item["metricFilterPattern"],
    fillGapWithZero: item["fillGapWithZero"],
    category: item["category"],
    resourceIdDimensionNameOverride: item["resourceIdDimensionNameOverride"],
    isInternal: item["isInternal"],
    delegateMetricNameOverride: item["delegateMetricNameOverride"],
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

/** The definition of Dimension. */
export interface Dimension {
  /** The name of the dimension. */
  name?: string;
  /** The display name of the dimension. */
  displayName?: string;
  /** The display name of the dimension. */
  internalName?: string;
  /** The flag indicates whether the metric will be exported for shoebox or not. */
  toBeExportedForShoebox?: boolean;
}

export function dimensionDeserializer(item: any): Dimension {
  return {
    name: item["name"],
    displayName: item["displayName"],
    internalName: item["internalName"],
    toBeExportedForShoebox: item["toBeExportedForShoebox"],
  };
}

/** Describes the format of Error response. */
export interface ErrorResponse {
  /** Error code */
  code?: string;
  /** Error message indicating why the operation failed. */
  message?: string;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The HDInsight cluster application */
export interface Application extends ProxyResource {
  /** The properties of the application. */
  properties?: ApplicationProperties;
  /** The ETag for the application */
  etag?: string;
  /** The tags for the application. */
  tags?: Record<string, string>;
}

export function applicationSerializer(item: Application): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : applicationPropertiesSerializer(item["properties"]),
    etag: item["etag"],
    tags: item["tags"],
  };
}

export function applicationDeserializer(item: any): Application {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : applicationPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The HDInsight cluster application GET response. */
export interface ApplicationProperties {
  /** The list of roles in the cluster. */
  computeProfile?: ComputeProfile;
  /** The list of install script actions. */
  installScriptActions?: RuntimeScriptAction[];
  /** The list of uninstall script actions. */
  uninstallScriptActions?: RuntimeScriptAction[];
  /** The list of application HTTPS endpoints. */
  httpsEndpoints?: ApplicationGetHttpsEndpoint[];
  /** The list of application SSH endpoints. */
  sshEndpoints?: ApplicationGetEndpoint[];
  /** The provisioning state of the application. */
  readonly provisioningState?: string;
  /** The application type. */
  applicationType?: string;
  /** The application state. */
  readonly applicationState?: string;
  /** The list of errors. */
  errors?: Errors[];
  /** The application create date time. */
  readonly createdDate?: string;
  /** The marketplace identifier. */
  readonly marketplaceIdentifier?: string;
  /** The private link configurations. */
  privateLinkConfigurations?: PrivateLinkConfiguration[];
}

export function applicationPropertiesSerializer(item: ApplicationProperties): any {
  return {
    computeProfile: !item["computeProfile"]
      ? item["computeProfile"]
      : computeProfileSerializer(item["computeProfile"]),
    installScriptActions: !item["installScriptActions"]
      ? item["installScriptActions"]
      : runtimeScriptActionArraySerializer(item["installScriptActions"]),
    uninstallScriptActions: !item["uninstallScriptActions"]
      ? item["uninstallScriptActions"]
      : runtimeScriptActionArraySerializer(item["uninstallScriptActions"]),
    httpsEndpoints: !item["httpsEndpoints"]
      ? item["httpsEndpoints"]
      : applicationGetHttpsEndpointArraySerializer(item["httpsEndpoints"]),
    sshEndpoints: !item["sshEndpoints"]
      ? item["sshEndpoints"]
      : applicationGetEndpointArraySerializer(item["sshEndpoints"]),
    applicationType: item["applicationType"],
    errors: !item["errors"] ? item["errors"] : errorsArraySerializer(item["errors"]),
    privateLinkConfigurations: !item["privateLinkConfigurations"]
      ? item["privateLinkConfigurations"]
      : privateLinkConfigurationArraySerializer(item["privateLinkConfigurations"]),
  };
}

export function applicationPropertiesDeserializer(item: any): ApplicationProperties {
  return {
    computeProfile: !item["computeProfile"]
      ? item["computeProfile"]
      : computeProfileDeserializer(item["computeProfile"]),
    installScriptActions: !item["installScriptActions"]
      ? item["installScriptActions"]
      : runtimeScriptActionArrayDeserializer(item["installScriptActions"]),
    uninstallScriptActions: !item["uninstallScriptActions"]
      ? item["uninstallScriptActions"]
      : runtimeScriptActionArrayDeserializer(item["uninstallScriptActions"]),
    httpsEndpoints: !item["httpsEndpoints"]
      ? item["httpsEndpoints"]
      : applicationGetHttpsEndpointArrayDeserializer(item["httpsEndpoints"]),
    sshEndpoints: !item["sshEndpoints"]
      ? item["sshEndpoints"]
      : applicationGetEndpointArrayDeserializer(item["sshEndpoints"]),
    provisioningState: item["provisioningState"],
    applicationType: item["applicationType"],
    applicationState: item["applicationState"],
    errors: !item["errors"] ? item["errors"] : errorsArrayDeserializer(item["errors"]),
    createdDate: item["createdDate"],
    marketplaceIdentifier: item["marketplaceIdentifier"],
    privateLinkConfigurations: !item["privateLinkConfigurations"]
      ? item["privateLinkConfigurations"]
      : privateLinkConfigurationArrayDeserializer(item["privateLinkConfigurations"]),
  };
}

/** Describes the compute profile. */
export interface ComputeProfile {
  /** The list of roles in the cluster. */
  roles?: Role[];
}

export function computeProfileSerializer(item: ComputeProfile): any {
  return { roles: !item["roles"] ? item["roles"] : roleArraySerializer(item["roles"]) };
}

export function computeProfileDeserializer(item: any): ComputeProfile {
  return {
    roles: !item["roles"] ? item["roles"] : roleArrayDeserializer(item["roles"]),
  };
}

export function roleArraySerializer(result: Array<Role>): any[] {
  return result.map((item) => {
    return roleSerializer(item);
  });
}

export function roleArrayDeserializer(result: Array<Role>): any[] {
  return result.map((item) => {
    return roleDeserializer(item);
  });
}

/** Describes a role on the cluster. */
export interface Role {
  /** The name of the role. */
  name?: string;
  /** The minimum instance count of the cluster. */
  minInstanceCount?: number;
  /** The instance count of the cluster. */
  targetInstanceCount?: number;
  /** The name of the virtual machine group. */
  vMGroupName?: string;
  /** The autoscale configurations. */
  autoscaleConfiguration?: Autoscale;
  /** The hardware profile. */
  hardwareProfile?: HardwareProfile;
  /** The operating system profile. */
  osProfile?: OsProfile;
  /** The virtual network profile. */
  virtualNetworkProfile?: VirtualNetworkProfile;
  /** The data disks groups for the role. */
  dataDisksGroups?: DataDisksGroups[];
  /** The list of script actions on the role. */
  scriptActions?: ScriptAction[];
  /** Indicates whether encrypt the data disks. */
  encryptDataDisks?: boolean;
}

export function roleSerializer(item: Role): any {
  return {
    name: item["name"],
    minInstanceCount: item["minInstanceCount"],
    targetInstanceCount: item["targetInstanceCount"],
    VMGroupName: item["vMGroupName"],
    autoscale: !item["autoscaleConfiguration"]
      ? item["autoscaleConfiguration"]
      : autoscaleSerializer(item["autoscaleConfiguration"]),
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : hardwareProfileSerializer(item["hardwareProfile"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : osProfileSerializer(item["osProfile"]),
    virtualNetworkProfile: !item["virtualNetworkProfile"]
      ? item["virtualNetworkProfile"]
      : virtualNetworkProfileSerializer(item["virtualNetworkProfile"]),
    dataDisksGroups: !item["dataDisksGroups"]
      ? item["dataDisksGroups"]
      : dataDisksGroupsArraySerializer(item["dataDisksGroups"]),
    scriptActions: !item["scriptActions"]
      ? item["scriptActions"]
      : scriptActionArraySerializer(item["scriptActions"]),
    encryptDataDisks: item["encryptDataDisks"],
  };
}

export function roleDeserializer(item: any): Role {
  return {
    name: item["name"],
    minInstanceCount: item["minInstanceCount"],
    targetInstanceCount: item["targetInstanceCount"],
    vMGroupName: item["VMGroupName"],
    autoscaleConfiguration: !item["autoscale"]
      ? item["autoscale"]
      : autoscaleDeserializer(item["autoscale"]),
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : hardwareProfileDeserializer(item["hardwareProfile"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : osProfileDeserializer(item["osProfile"]),
    virtualNetworkProfile: !item["virtualNetworkProfile"]
      ? item["virtualNetworkProfile"]
      : virtualNetworkProfileDeserializer(item["virtualNetworkProfile"]),
    dataDisksGroups: !item["dataDisksGroups"]
      ? item["dataDisksGroups"]
      : dataDisksGroupsArrayDeserializer(item["dataDisksGroups"]),
    scriptActions: !item["scriptActions"]
      ? item["scriptActions"]
      : scriptActionArrayDeserializer(item["scriptActions"]),
    encryptDataDisks: item["encryptDataDisks"],
  };
}

/** The autoscale request parameters */
export interface Autoscale {
  /** Parameters for load-based autoscale */
  capacity?: AutoscaleCapacity;
  /** Parameters for schedule-based autoscale */
  recurrence?: AutoscaleRecurrence;
}

export function autoscaleSerializer(item: Autoscale): any {
  return {
    capacity: !item["capacity"] ? item["capacity"] : autoscaleCapacitySerializer(item["capacity"]),
    recurrence: !item["recurrence"]
      ? item["recurrence"]
      : autoscaleRecurrenceSerializer(item["recurrence"]),
  };
}

export function autoscaleDeserializer(item: any): Autoscale {
  return {
    capacity: !item["capacity"]
      ? item["capacity"]
      : autoscaleCapacityDeserializer(item["capacity"]),
    recurrence: !item["recurrence"]
      ? item["recurrence"]
      : autoscaleRecurrenceDeserializer(item["recurrence"]),
  };
}

/** The load-based autoscale request parameters */
export interface AutoscaleCapacity {
  /** The minimum instance count of the cluster */
  minInstanceCount?: number;
  /** The maximum instance count of the cluster */
  maxInstanceCount?: number;
}

export function autoscaleCapacitySerializer(item: AutoscaleCapacity): any {
  return { minInstanceCount: item["minInstanceCount"], maxInstanceCount: item["maxInstanceCount"] };
}

export function autoscaleCapacityDeserializer(item: any): AutoscaleCapacity {
  return {
    minInstanceCount: item["minInstanceCount"],
    maxInstanceCount: item["maxInstanceCount"],
  };
}

/** Schedule-based autoscale request parameters */
export interface AutoscaleRecurrence {
  /** The time zone for the autoscale schedule times */
  timeZone?: string;
  /** Array of schedule-based autoscale rules */
  schedule?: AutoscaleSchedule[];
}

export function autoscaleRecurrenceSerializer(item: AutoscaleRecurrence): any {
  return {
    timeZone: item["timeZone"],
    schedule: !item["schedule"]
      ? item["schedule"]
      : autoscaleScheduleArraySerializer(item["schedule"]),
  };
}

export function autoscaleRecurrenceDeserializer(item: any): AutoscaleRecurrence {
  return {
    timeZone: item["timeZone"],
    schedule: !item["schedule"]
      ? item["schedule"]
      : autoscaleScheduleArrayDeserializer(item["schedule"]),
  };
}

export function autoscaleScheduleArraySerializer(result: Array<AutoscaleSchedule>): any[] {
  return result.map((item) => {
    return autoscaleScheduleSerializer(item);
  });
}

export function autoscaleScheduleArrayDeserializer(result: Array<AutoscaleSchedule>): any[] {
  return result.map((item) => {
    return autoscaleScheduleDeserializer(item);
  });
}

/** Parameters for a schedule-based autoscale rule, consisting of an array of days + a time and capacity */
export interface AutoscaleSchedule {
  /** Days of the week for a schedule-based autoscale rule */
  days?: DaysOfWeek[];
  /** Time and capacity for a schedule-based autoscale rule */
  timeAndCapacity?: AutoscaleTimeAndCapacity;
}

export function autoscaleScheduleSerializer(item: AutoscaleSchedule): any {
  return {
    days: !item["days"]
      ? item["days"]
      : item["days"].map((p: any) => {
          return p;
        }),
    timeAndCapacity: !item["timeAndCapacity"]
      ? item["timeAndCapacity"]
      : autoscaleTimeAndCapacitySerializer(item["timeAndCapacity"]),
  };
}

export function autoscaleScheduleDeserializer(item: any): AutoscaleSchedule {
  return {
    days: !item["days"]
      ? item["days"]
      : item["days"].map((p: any) => {
          return p;
        }),
    timeAndCapacity: !item["timeAndCapacity"]
      ? item["timeAndCapacity"]
      : autoscaleTimeAndCapacityDeserializer(item["timeAndCapacity"]),
  };
}

/** Known values of {@link DaysOfWeek} that the service accepts. */
export enum KnownDaysOfWeek {
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

/** Type of DaysOfWeek */
export type DaysOfWeek = string;

/** Time and capacity request parameters */
export interface AutoscaleTimeAndCapacity {
  /** 24-hour time in the form xx:xx */
  time?: string;
  /** The minimum instance count of the cluster */
  minInstanceCount?: number;
  /** The maximum instance count of the cluster */
  maxInstanceCount?: number;
}

export function autoscaleTimeAndCapacitySerializer(item: AutoscaleTimeAndCapacity): any {
  return {
    time: item["time"],
    minInstanceCount: item["minInstanceCount"],
    maxInstanceCount: item["maxInstanceCount"],
  };
}

export function autoscaleTimeAndCapacityDeserializer(item: any): AutoscaleTimeAndCapacity {
  return {
    time: item["time"],
    minInstanceCount: item["minInstanceCount"],
    maxInstanceCount: item["maxInstanceCount"],
  };
}

/** The hardware profile. */
export interface HardwareProfile {
  /** The size of the VM */
  vmSize?: string;
}

export function hardwareProfileSerializer(item: HardwareProfile): any {
  return { vmSize: item["vmSize"] };
}

export function hardwareProfileDeserializer(item: any): HardwareProfile {
  return {
    vmSize: item["vmSize"],
  };
}

/** The Linux operation systems profile. */
export interface OsProfile {
  /** The Linux OS profile. */
  linuxOperatingSystemProfile?: LinuxOperatingSystemProfile;
}

export function osProfileSerializer(item: OsProfile): any {
  return {
    linuxOperatingSystemProfile: !item["linuxOperatingSystemProfile"]
      ? item["linuxOperatingSystemProfile"]
      : linuxOperatingSystemProfileSerializer(item["linuxOperatingSystemProfile"]),
  };
}

export function osProfileDeserializer(item: any): OsProfile {
  return {
    linuxOperatingSystemProfile: !item["linuxOperatingSystemProfile"]
      ? item["linuxOperatingSystemProfile"]
      : linuxOperatingSystemProfileDeserializer(item["linuxOperatingSystemProfile"]),
  };
}

/** The ssh username, password, and ssh public key. */
export interface LinuxOperatingSystemProfile {
  /** The username. */
  username?: string;
  /** The password. */
  password?: string;
  /** The SSH profile. */
  sshProfile?: SshProfile;
}

export function linuxOperatingSystemProfileSerializer(item: LinuxOperatingSystemProfile): any {
  return {
    username: item["username"],
    password: item["password"],
    sshProfile: !item["sshProfile"] ? item["sshProfile"] : sshProfileSerializer(item["sshProfile"]),
  };
}

export function linuxOperatingSystemProfileDeserializer(item: any): LinuxOperatingSystemProfile {
  return {
    username: item["username"],
    password: item["password"],
    sshProfile: !item["sshProfile"]
      ? item["sshProfile"]
      : sshProfileDeserializer(item["sshProfile"]),
  };
}

/** The list of SSH public keys. */
export interface SshProfile {
  /** The list of SSH public keys. */
  publicKeys?: SshPublicKey[];
}

export function sshProfileSerializer(item: SshProfile): any {
  return {
    publicKeys: !item["publicKeys"]
      ? item["publicKeys"]
      : sshPublicKeyArraySerializer(item["publicKeys"]),
  };
}

export function sshProfileDeserializer(item: any): SshProfile {
  return {
    publicKeys: !item["publicKeys"]
      ? item["publicKeys"]
      : sshPublicKeyArrayDeserializer(item["publicKeys"]),
  };
}

export function sshPublicKeyArraySerializer(result: Array<SshPublicKey>): any[] {
  return result.map((item) => {
    return sshPublicKeySerializer(item);
  });
}

export function sshPublicKeyArrayDeserializer(result: Array<SshPublicKey>): any[] {
  return result.map((item) => {
    return sshPublicKeyDeserializer(item);
  });
}

/** The SSH public key for the cluster nodes. */
export interface SshPublicKey {
  /** The certificate for SSH. */
  certificateData?: string;
}

export function sshPublicKeySerializer(item: SshPublicKey): any {
  return { certificateData: item["certificateData"] };
}

export function sshPublicKeyDeserializer(item: any): SshPublicKey {
  return {
    certificateData: item["certificateData"],
  };
}

/** The virtual network properties. */
export interface VirtualNetworkProfile {
  /** The ID of the virtual network. */
  id?: string;
  /** The name of the subnet. */
  subnet?: string;
}

export function virtualNetworkProfileSerializer(item: VirtualNetworkProfile): any {
  return { id: item["id"], subnet: item["subnet"] };
}

export function virtualNetworkProfileDeserializer(item: any): VirtualNetworkProfile {
  return {
    id: item["id"],
    subnet: item["subnet"],
  };
}

export function dataDisksGroupsArraySerializer(result: Array<DataDisksGroups>): any[] {
  return result.map((item) => {
    return dataDisksGroupsSerializer(item);
  });
}

export function dataDisksGroupsArrayDeserializer(result: Array<DataDisksGroups>): any[] {
  return result.map((item) => {
    return dataDisksGroupsDeserializer(item);
  });
}

/** The data disks groups for the role. */
export interface DataDisksGroups {
  /** The number of disks per node. */
  disksPerNode?: number;
  /** ReadOnly. The storage account type. Do not set this value. */
  readonly storageAccountType?: string;
  /** ReadOnly. The DiskSize in GB. Do not set this value. */
  readonly diskSizeGB?: number;
}

export function dataDisksGroupsSerializer(item: DataDisksGroups): any {
  return { disksPerNode: item["disksPerNode"] };
}

export function dataDisksGroupsDeserializer(item: any): DataDisksGroups {
  return {
    disksPerNode: item["disksPerNode"],
    storageAccountType: item["storageAccountType"],
    diskSizeGB: item["diskSizeGB"],
  };
}

export function scriptActionArraySerializer(result: Array<ScriptAction>): any[] {
  return result.map((item) => {
    return scriptActionSerializer(item);
  });
}

export function scriptActionArrayDeserializer(result: Array<ScriptAction>): any[] {
  return result.map((item) => {
    return scriptActionDeserializer(item);
  });
}

/** Describes a script action on role on the cluster. */
export interface ScriptAction {
  /** The name of the script action. */
  name: string;
  /** The URI to the script. */
  uri: string;
  /** The parameters for the script provided. */
  parameters: string;
}

export function scriptActionSerializer(item: ScriptAction): any {
  return { name: item["name"], uri: item["uri"], parameters: item["parameters"] };
}

export function scriptActionDeserializer(item: any): ScriptAction {
  return {
    name: item["name"],
    uri: item["uri"],
    parameters: item["parameters"],
  };
}

export function runtimeScriptActionArraySerializer(result: Array<RuntimeScriptAction>): any[] {
  return result.map((item) => {
    return runtimeScriptActionSerializer(item);
  });
}

export function runtimeScriptActionArrayDeserializer(result: Array<RuntimeScriptAction>): any[] {
  return result.map((item) => {
    return runtimeScriptActionDeserializer(item);
  });
}

/** Describes a script action on a running cluster. */
export interface RuntimeScriptAction {
  /** The name of the script action. */
  name: string;
  /** The URI to the script. */
  uri: string;
  /** The parameters for the script */
  parameters?: string;
  /** The list of roles where script will be executed. */
  roles: string[];
  /** The application name of the script action, if any. */
  readonly applicationName?: string;
}

export function runtimeScriptActionSerializer(item: RuntimeScriptAction): any {
  return {
    name: item["name"],
    uri: item["uri"],
    parameters: item["parameters"],
    roles: item["roles"].map((p: any) => {
      return p;
    }),
  };
}

export function runtimeScriptActionDeserializer(item: any): RuntimeScriptAction {
  return {
    name: item["name"],
    uri: item["uri"],
    parameters: item["parameters"],
    roles: item["roles"].map((p: any) => {
      return p;
    }),
    applicationName: item["applicationName"],
  };
}

export function applicationGetHttpsEndpointArraySerializer(
  result: Array<ApplicationGetHttpsEndpoint>,
): any[] {
  return result.map((item) => {
    return applicationGetHttpsEndpointSerializer(item);
  });
}

export function applicationGetHttpsEndpointArrayDeserializer(
  result: Array<ApplicationGetHttpsEndpoint>,
): any[] {
  return result.map((item) => {
    return applicationGetHttpsEndpointDeserializer(item);
  });
}

/** Gets the application HTTP endpoints. */
export interface ApplicationGetHttpsEndpoint {
  /** The list of access modes for the application. */
  accessModes?: string[];
  /** The location of the endpoint. */
  readonly location?: string;
  /** The destination port to connect to. */
  destinationPort?: number;
  /** The public port to connect to. */
  readonly publicPort?: number;
  /** The private ip address of the endpoint. */
  privateIPAddress?: string;
  /** The subdomain suffix of the application. */
  subDomainSuffix?: string;
  /** The value indicates whether to disable GatewayAuth. */
  disableGatewayAuth?: boolean;
}

export function applicationGetHttpsEndpointSerializer(item: ApplicationGetHttpsEndpoint): any {
  return {
    accessModes: !item["accessModes"]
      ? item["accessModes"]
      : item["accessModes"].map((p: any) => {
          return p;
        }),
    destinationPort: item["destinationPort"],
    privateIPAddress: item["privateIPAddress"],
    subDomainSuffix: item["subDomainSuffix"],
    disableGatewayAuth: item["disableGatewayAuth"],
  };
}

export function applicationGetHttpsEndpointDeserializer(item: any): ApplicationGetHttpsEndpoint {
  return {
    accessModes: !item["accessModes"]
      ? item["accessModes"]
      : item["accessModes"].map((p: any) => {
          return p;
        }),
    location: item["location"],
    destinationPort: item["destinationPort"],
    publicPort: item["publicPort"],
    privateIPAddress: item["privateIPAddress"],
    subDomainSuffix: item["subDomainSuffix"],
    disableGatewayAuth: item["disableGatewayAuth"],
  };
}

export function applicationGetEndpointArraySerializer(
  result: Array<ApplicationGetEndpoint>,
): any[] {
  return result.map((item) => {
    return applicationGetEndpointSerializer(item);
  });
}

export function applicationGetEndpointArrayDeserializer(
  result: Array<ApplicationGetEndpoint>,
): any[] {
  return result.map((item) => {
    return applicationGetEndpointDeserializer(item);
  });
}

/** Gets the application SSH endpoint */
export interface ApplicationGetEndpoint {
  /** The location of the endpoint. */
  location?: string;
  /** The destination port to connect to. */
  destinationPort?: number;
  /** The public port to connect to. */
  publicPort?: number;
  /** The private ip address of the endpoint. */
  privateIPAddress?: string;
}

export function applicationGetEndpointSerializer(item: ApplicationGetEndpoint): any {
  return {
    location: item["location"],
    destinationPort: item["destinationPort"],
    publicPort: item["publicPort"],
    privateIPAddress: item["privateIPAddress"],
  };
}

export function applicationGetEndpointDeserializer(item: any): ApplicationGetEndpoint {
  return {
    location: item["location"],
    destinationPort: item["destinationPort"],
    publicPort: item["publicPort"],
    privateIPAddress: item["privateIPAddress"],
  };
}

export function errorsArraySerializer(result: Array<Errors>): any[] {
  return result.map((item) => {
    return errorsSerializer(item);
  });
}

export function errorsArrayDeserializer(result: Array<Errors>): any[] {
  return result.map((item) => {
    return errorsDeserializer(item);
  });
}

/** The error message associated with the cluster creation. */
export interface Errors {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
}

export function errorsSerializer(item: Errors): any {
  return { code: item["code"], message: item["message"] };
}

export function errorsDeserializer(item: any): Errors {
  return {
    code: item["code"],
    message: item["message"],
  };
}

export function privateLinkConfigurationArraySerializer(
  result: Array<PrivateLinkConfiguration>,
): any[] {
  return result.map((item) => {
    return privateLinkConfigurationSerializer(item);
  });
}

export function privateLinkConfigurationArrayDeserializer(
  result: Array<PrivateLinkConfiguration>,
): any[] {
  return result.map((item) => {
    return privateLinkConfigurationDeserializer(item);
  });
}

/** The private link configuration. */
export interface PrivateLinkConfiguration {
  /** The private link configuration id. */
  readonly id?: string;
  /** The name of private link configuration. */
  name: string;
  /** The type of the private link configuration. */
  readonly type?: string;
  /** The HDInsight private linkable sub-resource name to apply the private link configuration to. For example, 'headnode', 'gateway', 'edgenode'. */
  groupId: string;
  /** The private link configuration provisioning state, which only appears in the response. */
  readonly provisioningState?: PrivateLinkConfigurationProvisioningState;
  /** The IP configurations for the private link service. */
  ipConfigurations: IPConfiguration[];
}

export function privateLinkConfigurationSerializer(item: PrivateLinkConfiguration): any {
  return { name: item["name"], properties: _privateLinkConfigurationPropertiesSerializer(item) };
}

export function privateLinkConfigurationDeserializer(item: any): PrivateLinkConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ..._privateLinkConfigurationPropertiesDeserializer(item["properties"]),
  };
}

/** The private link configuration properties. */
export interface PrivateLinkConfigurationProperties {
  /** The HDInsight private linkable sub-resource name to apply the private link configuration to. For example, 'headnode', 'gateway', 'edgenode'. */
  groupId: string;
  /** The private link configuration provisioning state, which only appears in the response. */
  readonly provisioningState?: PrivateLinkConfigurationProvisioningState;
  /** The IP configurations for the private link service. */
  ipConfigurations: IPConfiguration[];
}

export function privateLinkConfigurationPropertiesSerializer(
  item: PrivateLinkConfigurationProperties,
): any {
  return {
    groupId: item["groupId"],
    ipConfigurations: ipConfigurationArraySerializer(item["ipConfigurations"]),
  };
}

export function privateLinkConfigurationPropertiesDeserializer(
  item: any,
): PrivateLinkConfigurationProperties {
  return {
    groupId: item["groupId"],
    provisioningState: item["provisioningState"],
    ipConfigurations: ipConfigurationArrayDeserializer(item["ipConfigurations"]),
  };
}

/** The private link configuration provisioning state, which only appears in the response. */
export enum KnownPrivateLinkConfigurationProvisioningState {
  /** InProgress */
  InProgress = "InProgress",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * The private link configuration provisioning state, which only appears in the response. \
 * {@link KnownPrivateLinkConfigurationProvisioningState} can be used interchangeably with PrivateLinkConfigurationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress**: InProgress \
 * **Failed**: Failed \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Deleting**: Deleting
 */
export type PrivateLinkConfigurationProvisioningState = string;

export function ipConfigurationArraySerializer(result: Array<IPConfiguration>): any[] {
  return result.map((item) => {
    return ipConfigurationSerializer(item);
  });
}

export function ipConfigurationArrayDeserializer(result: Array<IPConfiguration>): any[] {
  return result.map((item) => {
    return ipConfigurationDeserializer(item);
  });
}

/** The ip configurations for the private link service. */
export interface IPConfiguration {
  /** The private link IP configuration id. */
  readonly id?: string;
  /** The name of private link IP configuration. */
  name: string;
  /** The type of the private link IP configuration. */
  readonly type?: string;
  /** The private link configuration provisioning state, which only appears in the response. */
  readonly provisioningState?: PrivateLinkConfigurationProvisioningState;
  /** Indicates whether this IP configuration is primary for the corresponding NIC. */
  primary?: boolean;
  /** The IP address. */
  privateIPAddress?: string;
  /** The method that private IP address is allocated. */
  privateIPAllocationMethod?: PrivateIPAllocationMethod;
  /** The subnet resource id. */
  subnet?: ResourceId;
}

export function ipConfigurationSerializer(item: IPConfiguration): any {
  return {
    name: item["name"],
    properties: areAllPropsUndefined(item, [
      "primary",
      "privateIPAddress",
      "privateIPAllocationMethod",
      "subnet",
    ])
      ? undefined
      : _ipConfigurationPropertiesSerializer(item),
  };
}

export function ipConfigurationDeserializer(item: any): IPConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _ipConfigurationPropertiesDeserializer(item["properties"])),
  };
}

/** The private link ip configuration properties. */
export interface IPConfigurationProperties {
  /** The private link configuration provisioning state, which only appears in the response. */
  readonly provisioningState?: PrivateLinkConfigurationProvisioningState;
  /** Indicates whether this IP configuration is primary for the corresponding NIC. */
  primary?: boolean;
  /** The IP address. */
  privateIPAddress?: string;
  /** The method that private IP address is allocated. */
  privateIPAllocationMethod?: PrivateIPAllocationMethod;
  /** The subnet resource id. */
  subnet?: ResourceId;
}

export function ipConfigurationPropertiesSerializer(item: IPConfigurationProperties): any {
  return {
    primary: item["primary"],
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    subnet: !item["subnet"] ? item["subnet"] : resourceIdSerializer(item["subnet"]),
  };
}

export function ipConfigurationPropertiesDeserializer(item: any): IPConfigurationProperties {
  return {
    provisioningState: item["provisioningState"],
    primary: item["primary"],
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    subnet: !item["subnet"] ? item["subnet"] : resourceIdDeserializer(item["subnet"]),
  };
}

/** The method that private IP address is allocated. */
export enum KnownPrivateIPAllocationMethod {
  /** dynamic */
  Dynamic = "dynamic",
  /** static */
  Static = "static",
}

/**
 * The method that private IP address is allocated. \
 * {@link KnownPrivateIPAllocationMethod} can be used interchangeably with PrivateIPAllocationMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **dynamic**: dynamic \
 * **static**: static
 */
export type PrivateIPAllocationMethod = string;

/** The azure resource id. */
export interface ResourceId {
  /** The azure resource id. */
  id?: string;
}

export function resourceIdSerializer(item: ResourceId): any {
  return { id: item["id"] };
}

export function resourceIdDeserializer(item: any): ResourceId {
  return {
    id: item["id"],
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

/** The response of a Application list operation. */
export interface _ApplicationListResult {
  /** The Application items on this page */
  value: Application[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _applicationListResultDeserializer(item: any): _ApplicationListResult {
  return {
    value: applicationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applicationArraySerializer(result: Array<Application>): any[] {
  return result.map((item) => {
    return applicationSerializer(item);
  });
}

export function applicationArrayDeserializer(result: Array<Application>): any[] {
  return result.map((item) => {
    return applicationDeserializer(item);
  });
}

/** The azure async operation response. */
export interface AsyncOperationResult {
  /** The async operation state. */
  status?: AsyncOperationState;
  /** The operation error information. */
  error?: Errors;
}

export function asyncOperationResultDeserializer(item: any): AsyncOperationResult {
  return {
    status: item["status"],
    error: !item["error"] ? item["error"] : errorsDeserializer(item["error"]),
  };
}

/** The async operation state. */
export enum KnownAsyncOperationState {
  /** InProgress */
  InProgress = "InProgress",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
}

/**
 * The async operation state. \
 * {@link KnownAsyncOperationState} can be used interchangeably with AsyncOperationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress**: InProgress \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed
 */
export type AsyncOperationState = string;

/** The HDInsight cluster. */
export interface Cluster extends TrackedResource {
  /** The properties of the cluster. */
  properties?: ClusterGetProperties;
  /** The ETag for the resource */
  etag?: string;
  /** The availability zones. */
  zones?: string[];
  /** The identity of the cluster, if configured. */
  identity?: ClusterIdentity;
}

export function clusterDeserializer(item: any): Cluster {
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
      : clusterGetPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    identity: !item["identity"] ? item["identity"] : clusterIdentityDeserializer(item["identity"]),
  };
}

/** The properties of cluster. */
export interface ClusterGetProperties {
  /** The version of the cluster. */
  clusterVersion?: string;
  /** The hdp version of the cluster. */
  clusterHdpVersion?: string;
  /** The type of operating system. */
  osType?: OSType;
  /** The cluster tier. */
  tier?: Tier;
  /** The cluster id. */
  clusterId?: string;
  /** The cluster definition. */
  clusterDefinition: ClusterDefinition;
  /** The cluster kafka rest proxy configuration. */
  kafkaRestProperties?: KafkaRestProperties;
  /** The security profile. */
  securityProfile?: SecurityProfile;
  /** The compute profile. */
  computeProfile?: ComputeProfile;
  /** The provisioning state, which only appears in the response. */
  provisioningState?: HDInsightClusterProvisioningState;
  /** The date on which the cluster was created. */
  createdDate?: string;
  /** The state of the cluster. */
  clusterState?: string;
  /** The quota information. */
  quotaInfo?: QuotaInfo;
  /** The list of errors. */
  errors?: Errors[];
  /** The list of connectivity endpoints. */
  connectivityEndpoints?: ConnectivityEndpoint[];
  /** The disk encryption properties. */
  diskEncryptionProperties?: DiskEncryptionProperties;
  /** The encryption-in-transit properties. */
  encryptionInTransitProperties?: EncryptionInTransitProperties;
  /** The storage profile. */
  storageProfile?: StorageProfile;
  /** The minimal supported tls version. */
  minSupportedTlsVersion?: string;
  /** The excluded services config. */
  excludedServicesConfig?: ExcludedServicesConfig;
  /** The network properties. */
  networkProperties?: NetworkProperties;
  /** The compute isolation properties. */
  computeIsolationProperties?: ComputeIsolationProperties;
  /** The private link configurations. */
  privateLinkConfigurations?: PrivateLinkConfiguration[];
  /** The list of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
}

export function clusterGetPropertiesDeserializer(item: any): ClusterGetProperties {
  return {
    clusterVersion: item["clusterVersion"],
    clusterHdpVersion: item["clusterHdpVersion"],
    osType: item["osType"],
    tier: item["tier"],
    clusterId: item["clusterId"],
    clusterDefinition: clusterDefinitionDeserializer(item["clusterDefinition"]),
    kafkaRestProperties: !item["kafkaRestProperties"]
      ? item["kafkaRestProperties"]
      : kafkaRestPropertiesDeserializer(item["kafkaRestProperties"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : securityProfileDeserializer(item["securityProfile"]),
    computeProfile: !item["computeProfile"]
      ? item["computeProfile"]
      : computeProfileDeserializer(item["computeProfile"]),
    provisioningState: item["provisioningState"],
    createdDate: item["createdDate"],
    clusterState: item["clusterState"],
    quotaInfo: !item["quotaInfo"] ? item["quotaInfo"] : quotaInfoDeserializer(item["quotaInfo"]),
    errors: !item["errors"] ? item["errors"] : errorsArrayDeserializer(item["errors"]),
    connectivityEndpoints: !item["connectivityEndpoints"]
      ? item["connectivityEndpoints"]
      : connectivityEndpointArrayDeserializer(item["connectivityEndpoints"]),
    diskEncryptionProperties: !item["diskEncryptionProperties"]
      ? item["diskEncryptionProperties"]
      : diskEncryptionPropertiesDeserializer(item["diskEncryptionProperties"]),
    encryptionInTransitProperties: !item["encryptionInTransitProperties"]
      ? item["encryptionInTransitProperties"]
      : encryptionInTransitPropertiesDeserializer(item["encryptionInTransitProperties"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : storageProfileDeserializer(item["storageProfile"]),
    minSupportedTlsVersion: item["minSupportedTlsVersion"],
    excludedServicesConfig: !item["excludedServicesConfig"]
      ? item["excludedServicesConfig"]
      : excludedServicesConfigDeserializer(item["excludedServicesConfig"]),
    networkProperties: !item["networkProperties"]
      ? item["networkProperties"]
      : networkPropertiesDeserializer(item["networkProperties"]),
    computeIsolationProperties: !item["computeIsolationProperties"]
      ? item["computeIsolationProperties"]
      : computeIsolationPropertiesDeserializer(item["computeIsolationProperties"]),
    privateLinkConfigurations: !item["privateLinkConfigurations"]
      ? item["privateLinkConfigurations"]
      : privateLinkConfigurationArrayDeserializer(item["privateLinkConfigurations"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
  };
}

/** The type of operating system. */
export enum KnownOSType {
  /** Windows */
  Windows = "Windows",
  /** Linux */
  Linux = "Linux",
}

/**
 * The type of operating system. \
 * {@link KnownOSType} can be used interchangeably with OSType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows**: Windows \
 * **Linux**: Linux
 */
export type OSType = string;

/** The cluster tier. */
export enum KnownTier {
  /** Standard */
  Standard = "Standard",
  /** Premium */
  Premium = "Premium",
}

/**
 * The cluster tier. \
 * {@link KnownTier} can be used interchangeably with Tier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**: Standard \
 * **Premium**: Premium
 */
export type Tier = string;

/** The cluster definition. */
export interface ClusterDefinition {
  /** The link to the blueprint. */
  blueprint?: string;
  /** The type of cluster. */
  kind?: string;
  /** The versions of different services in the cluster. */
  componentVersion?: Record<string, string>;
  /** The cluster configurations. */
  configurations?: any;
}

export function clusterDefinitionSerializer(item: ClusterDefinition): any {
  return {
    blueprint: item["blueprint"],
    kind: item["kind"],
    componentVersion: item["componentVersion"],
    configurations: item["configurations"],
  };
}

export function clusterDefinitionDeserializer(item: any): ClusterDefinition {
  return {
    blueprint: item["blueprint"],
    kind: item["kind"],
    componentVersion: !item["componentVersion"]
      ? item["componentVersion"]
      : Object.fromEntries(
          Object.entries(item["componentVersion"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    configurations: item["configurations"],
  };
}

/** The kafka rest proxy configuration which contains AAD security group information. */
export interface KafkaRestProperties {
  /** The information of AAD security group. */
  clientGroupInfo?: ClientGroupInfo;
  /** The configurations that need to be overriden. */
  configurationOverride?: Record<string, string>;
}

export function kafkaRestPropertiesSerializer(item: KafkaRestProperties): any {
  return {
    clientGroupInfo: !item["clientGroupInfo"]
      ? item["clientGroupInfo"]
      : clientGroupInfoSerializer(item["clientGroupInfo"]),
    configurationOverride: item["configurationOverride"],
  };
}

export function kafkaRestPropertiesDeserializer(item: any): KafkaRestProperties {
  return {
    clientGroupInfo: !item["clientGroupInfo"]
      ? item["clientGroupInfo"]
      : clientGroupInfoDeserializer(item["clientGroupInfo"]),
    configurationOverride: !item["configurationOverride"]
      ? item["configurationOverride"]
      : Object.fromEntries(
          Object.entries(item["configurationOverride"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** The information of AAD security group. */
export interface ClientGroupInfo {
  /** The AAD security group name. */
  groupName?: string;
  /** The AAD security group id. */
  groupId?: string;
}

export function clientGroupInfoSerializer(item: ClientGroupInfo): any {
  return { groupName: item["groupName"], groupId: item["groupId"] };
}

export function clientGroupInfoDeserializer(item: any): ClientGroupInfo {
  return {
    groupName: item["groupName"],
    groupId: item["groupId"],
  };
}

/** The security profile which contains Ssh public key for the HDInsight cluster. */
export interface SecurityProfile {
  /** The directory type. */
  directoryType?: DirectoryType;
  /** The organization's active directory domain. */
  domain?: string;
  /** The organizational unit within the Active Directory to place the cluster and service accounts. */
  organizationalUnitDN?: string;
  /** The LDAPS protocol URLs to communicate with the Active Directory. */
  ldapsUrls?: string[];
  /** The domain user account that will have admin privileges on the cluster. */
  domainUsername?: string;
  /** The domain admin password. */
  domainUserPassword?: string;
  /** Optional. The Distinguished Names for cluster user groups */
  clusterUsersGroupDNs?: string[];
  /** The resource ID of the user's Azure Active Directory Domain Service. */
  aaddsResourceId?: string;
  /** User assigned identity that has permissions to read and create cluster-related artifacts in the user's AADDS. */
  msiResourceId?: string;
}

export function securityProfileSerializer(item: SecurityProfile): any {
  return {
    directoryType: item["directoryType"],
    domain: item["domain"],
    organizationalUnitDN: item["organizationalUnitDN"],
    ldapsUrls: !item["ldapsUrls"]
      ? item["ldapsUrls"]
      : item["ldapsUrls"].map((p: any) => {
          return p;
        }),
    domainUsername: item["domainUsername"],
    domainUserPassword: item["domainUserPassword"],
    clusterUsersGroupDNs: !item["clusterUsersGroupDNs"]
      ? item["clusterUsersGroupDNs"]
      : item["clusterUsersGroupDNs"].map((p: any) => {
          return p;
        }),
    aaddsResourceId: item["aaddsResourceId"],
    msiResourceId: item["msiResourceId"],
  };
}

export function securityProfileDeserializer(item: any): SecurityProfile {
  return {
    directoryType: item["directoryType"],
    domain: item["domain"],
    organizationalUnitDN: item["organizationalUnitDN"],
    ldapsUrls: !item["ldapsUrls"]
      ? item["ldapsUrls"]
      : item["ldapsUrls"].map((p: any) => {
          return p;
        }),
    domainUsername: item["domainUsername"],
    domainUserPassword: item["domainUserPassword"],
    clusterUsersGroupDNs: !item["clusterUsersGroupDNs"]
      ? item["clusterUsersGroupDNs"]
      : item["clusterUsersGroupDNs"].map((p: any) => {
          return p;
        }),
    aaddsResourceId: item["aaddsResourceId"],
    msiResourceId: item["msiResourceId"],
  };
}

/** The directory type. */
export enum KnownDirectoryType {
  /** ActiveDirectory */
  ActiveDirectory = "ActiveDirectory",
}

/**
 * The directory type. \
 * {@link KnownDirectoryType} can be used interchangeably with DirectoryType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ActiveDirectory**: ActiveDirectory
 */
export type DirectoryType = string;

/** The provisioning state, which only appears in the response. */
export enum KnownHDInsightClusterProvisioningState {
  /** InProgress */
  InProgress = "InProgress",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * The provisioning state, which only appears in the response. \
 * {@link KnownHDInsightClusterProvisioningState} can be used interchangeably with HDInsightClusterProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress**: InProgress \
 * **Failed**: Failed \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Deleting**: Deleting
 */
export type HDInsightClusterProvisioningState = string;

/** The quota properties for the cluster. */
export interface QuotaInfo {
  /** The cores used by the cluster. */
  coresUsed?: number;
}

export function quotaInfoDeserializer(item: any): QuotaInfo {
  return {
    coresUsed: item["coresUsed"],
  };
}

export function connectivityEndpointArrayDeserializer(result: Array<ConnectivityEndpoint>): any[] {
  return result.map((item) => {
    return connectivityEndpointDeserializer(item);
  });
}

/** The connectivity properties */
export interface ConnectivityEndpoint {
  /** The name of the endpoint. */
  name?: string;
  /** The protocol of the endpoint. */
  protocol?: string;
  /** The location of the endpoint. */
  location?: string;
  /** The port to connect to. */
  port?: number;
  /** The private ip address of the endpoint. */
  privateIPAddress?: string;
}

export function connectivityEndpointDeserializer(item: any): ConnectivityEndpoint {
  return {
    name: item["name"],
    protocol: item["protocol"],
    location: item["location"],
    port: item["port"],
    privateIPAddress: item["privateIPAddress"],
  };
}

/** The disk encryption properties */
export interface DiskEncryptionProperties {
  /** Base key vault URI where the customers key is located eg. https://myvault.vault.azure.net */
  vaultUri?: string;
  /** Key name that is used for enabling disk encryption. */
  keyName?: string;
  /** Specific key version that is used for enabling disk encryption. */
  keyVersion?: string;
  /** Algorithm identifier for encryption, default RSA-OAEP. */
  encryptionAlgorithm?: JsonWebKeyEncryptionAlgorithm;
  /** Resource ID of Managed Identity that is used to access the key vault. */
  msiResourceId?: string;
  /** Indicates whether or not resource disk encryption is enabled. */
  encryptionAtHost?: boolean;
}

export function diskEncryptionPropertiesSerializer(item: DiskEncryptionProperties): any {
  return {
    vaultUri: item["vaultUri"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    encryptionAlgorithm: item["encryptionAlgorithm"],
    msiResourceId: item["msiResourceId"],
    encryptionAtHost: item["encryptionAtHost"],
  };
}

export function diskEncryptionPropertiesDeserializer(item: any): DiskEncryptionProperties {
  return {
    vaultUri: item["vaultUri"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    encryptionAlgorithm: item["encryptionAlgorithm"],
    msiResourceId: item["msiResourceId"],
    encryptionAtHost: item["encryptionAtHost"],
  };
}

/** Algorithm identifier for encryption, default RSA-OAEP. */
export enum KnownJsonWebKeyEncryptionAlgorithm {
  /** RSA-OAEP */
  RSAOaep = "RSA-OAEP",
  /** RSA-OAEP-256 */
  RSAOaep256 = "RSA-OAEP-256",
  /** RSA1_5 */
  RSA15 = "RSA1_5",
}

/**
 * Algorithm identifier for encryption, default RSA-OAEP. \
 * {@link KnownJsonWebKeyEncryptionAlgorithm} can be used interchangeably with JsonWebKeyEncryptionAlgorithm,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RSA-OAEP**: RSA-OAEP \
 * **RSA-OAEP-256**: RSA-OAEP-256 \
 * **RSA1_5**: RSA1_5
 */
export type JsonWebKeyEncryptionAlgorithm = string;

/** The encryption-in-transit properties. */
export interface EncryptionInTransitProperties {
  /** Indicates whether or not inter cluster node communication is encrypted in transit. */
  isEncryptionInTransitEnabled?: boolean;
}

export function encryptionInTransitPropertiesSerializer(item: EncryptionInTransitProperties): any {
  return { isEncryptionInTransitEnabled: item["isEncryptionInTransitEnabled"] };
}

export function encryptionInTransitPropertiesDeserializer(
  item: any,
): EncryptionInTransitProperties {
  return {
    isEncryptionInTransitEnabled: item["isEncryptionInTransitEnabled"],
  };
}

/** The storage profile. */
export interface StorageProfile {
  /** The list of storage accounts in the cluster. */
  storageaccounts?: StorageAccount[];
}

export function storageProfileSerializer(item: StorageProfile): any {
  return {
    storageaccounts: !item["storageaccounts"]
      ? item["storageaccounts"]
      : storageAccountArraySerializer(item["storageaccounts"]),
  };
}

export function storageProfileDeserializer(item: any): StorageProfile {
  return {
    storageaccounts: !item["storageaccounts"]
      ? item["storageaccounts"]
      : storageAccountArrayDeserializer(item["storageaccounts"]),
  };
}

export function storageAccountArraySerializer(result: Array<StorageAccount>): any[] {
  return result.map((item) => {
    return storageAccountSerializer(item);
  });
}

export function storageAccountArrayDeserializer(result: Array<StorageAccount>): any[] {
  return result.map((item) => {
    return storageAccountDeserializer(item);
  });
}

/** The storage Account. */
export interface StorageAccount {
  /** The name of the storage account. */
  name?: string;
  /** Whether or not the storage account is the default storage account. */
  isDefault?: boolean;
  /** The container in the storage account, only to be specified for WASB storage accounts. */
  container?: string;
  /** The filesystem, only to be specified for Azure Data Lake Storage Gen 2. */
  fileSystem?: string;
  /** The storage account access key. */
  key?: string;
  /** The resource ID of storage account, only to be specified for Azure Data Lake Storage Gen 2. */
  resourceId?: string;
  /** The managed identity (MSI) that is allowed to access the storage account, only to be specified for Azure Data Lake Storage Gen 2. */
  msiResourceId?: string;
  /** The shared access signature key. */
  saskey?: string;
  /** The file share name. */
  fileshare?: string;
  /** Enable secure channel or not, it's an optional field. Default value is false when cluster version < 5.1 and true when cluster version >= 5.1 , */
  enableSecureChannel?: boolean;
}

export function storageAccountSerializer(item: StorageAccount): any {
  return {
    name: item["name"],
    isDefault: item["isDefault"],
    container: item["container"],
    fileSystem: item["fileSystem"],
    key: item["key"],
    resourceId: item["resourceId"],
    msiResourceId: item["msiResourceId"],
    saskey: item["saskey"],
    fileshare: item["fileshare"],
    enableSecureChannel: item["enableSecureChannel"],
  };
}

export function storageAccountDeserializer(item: any): StorageAccount {
  return {
    name: item["name"],
    isDefault: item["isDefault"],
    container: item["container"],
    fileSystem: item["fileSystem"],
    key: item["key"],
    resourceId: item["resourceId"],
    msiResourceId: item["msiResourceId"],
    saskey: item["saskey"],
    fileshare: item["fileshare"],
    enableSecureChannel: item["enableSecureChannel"],
  };
}

/** The configuration that services will be excluded when creating cluster. */
export interface ExcludedServicesConfig {
  /** The config id of excluded services. */
  excludedServicesConfigId?: string;
  /** The list of excluded services. */
  excludedServicesList?: string;
}

export function excludedServicesConfigDeserializer(item: any): ExcludedServicesConfig {
  return {
    excludedServicesConfigId: item["excludedServicesConfigId"],
    excludedServicesList: item["excludedServicesList"],
  };
}

/** The network properties. */
export interface NetworkProperties {
  /** A value to describe how the outbound dependencies of a HDInsight cluster are managed. 'Managed' means that the outbound dependencies are managed by the HDInsight service. 'External' means that the outbound dependencies are managed by a customer specific solution. */
  outboundDependenciesManagedType?: OutboundDependenciesManagedType;
  /** The direction for the resource provider connection. */
  resourceProviderConnection?: ResourceProviderConnection;
  /** Indicates whether or not private link is enabled. */
  privateLink?: PrivateLink;
  /** Gets or sets the IP tag for the public IPs created along with the HDInsight Clusters. */
  publicIpTag?: IpTag;
}

export function networkPropertiesSerializer(item: NetworkProperties): any {
  return {
    outboundDependenciesManagedType: item["outboundDependenciesManagedType"],
    resourceProviderConnection: item["resourceProviderConnection"],
    privateLink: item["privateLink"],
    publicIpTag: !item["publicIpTag"] ? item["publicIpTag"] : ipTagSerializer(item["publicIpTag"]),
  };
}

export function networkPropertiesDeserializer(item: any): NetworkProperties {
  return {
    outboundDependenciesManagedType: item["outboundDependenciesManagedType"],
    resourceProviderConnection: item["resourceProviderConnection"],
    privateLink: item["privateLink"],
    publicIpTag: !item["publicIpTag"]
      ? item["publicIpTag"]
      : ipTagDeserializer(item["publicIpTag"]),
  };
}

/** A value to describe how the outbound dependencies of a HDInsight cluster are managed. 'Managed' means that the outbound dependencies are managed by the HDInsight service. 'External' means that the outbound dependencies are managed by a customer specific solution. */
export enum KnownOutboundDependenciesManagedType {
  /** Managed */
  Managed = "Managed",
  /** External */
  External = "External",
}

/**
 * A value to describe how the outbound dependencies of a HDInsight cluster are managed. 'Managed' means that the outbound dependencies are managed by the HDInsight service. 'External' means that the outbound dependencies are managed by a customer specific solution. \
 * {@link KnownOutboundDependenciesManagedType} can be used interchangeably with OutboundDependenciesManagedType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Managed**: Managed \
 * **External**: External
 */
export type OutboundDependenciesManagedType = string;

/** The direction for the resource provider connection. */
export enum KnownResourceProviderConnection {
  /** Inbound */
  Inbound = "Inbound",
  /** Outbound */
  Outbound = "Outbound",
}

/**
 * The direction for the resource provider connection. \
 * {@link KnownResourceProviderConnection} can be used interchangeably with ResourceProviderConnection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inbound**: Inbound \
 * **Outbound**: Outbound
 */
export type ResourceProviderConnection = string;

/** Indicates whether or not private link is enabled. */
export enum KnownPrivateLink {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Indicates whether or not private link is enabled. \
 * {@link KnownPrivateLink} can be used interchangeably with PrivateLink,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type PrivateLink = string;

/** Contains the IpTag associated with the public IP address */
export interface IpTag {
  /** Gets or sets the ipTag type: Example FirstPartyUsage. */
  ipTagType: string;
  /** Gets or sets value of the IpTag associated with the public IP. Example HDInsight, SQL, Storage etc */
  tag: string;
}

export function ipTagSerializer(item: IpTag): any {
  return { ipTagType: item["ipTagType"], tag: item["tag"] };
}

export function ipTagDeserializer(item: any): IpTag {
  return {
    ipTagType: item["ipTagType"],
    tag: item["tag"],
  };
}

/** The compute isolation properties. */
export interface ComputeIsolationProperties {
  /** The flag indicates whether enable compute isolation or not. */
  enableComputeIsolation?: boolean;
  /** The host sku. */
  hostSku?: string;
}

export function computeIsolationPropertiesSerializer(item: ComputeIsolationProperties): any {
  return { enableComputeIsolation: item["enableComputeIsolation"], hostSku: item["hostSku"] };
}

export function computeIsolationPropertiesDeserializer(item: any): ComputeIsolationProperties {
  return {
    enableComputeIsolation: item["enableComputeIsolation"],
    hostSku: item["hostSku"],
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

/** The private endpoint connection. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The private endpoint of the private endpoint connection */
  readonly privateEndpoint?: PrivateEndpoint;
  /** The private link service connection state. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The link identifier. */
  readonly linkIdentifier?: string;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return { properties: _privateEndpointConnectionPropertiesSerializer(item) };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._privateEndpointConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** The private endpoint connection properties. */
export interface PrivateEndpointConnectionProperties {
  /** The private endpoint of the private endpoint connection */
  readonly privateEndpoint?: PrivateEndpoint;
  /** The private link service connection state. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The link identifier. */
  readonly linkIdentifier?: string;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
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
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    linkIdentifier: item["linkIdentifier"],
    provisioningState: item["provisioningState"],
  };
}

/** The private endpoint. */
export interface PrivateEndpoint {
  /** The private endpoint id. */
  id?: string;
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** The private link service connection state. */
export interface PrivateLinkServiceConnectionState {
  /** The concrete private link service connection. */
  status: PrivateLinkServiceConnectionStatus;
  /** The optional description of the status. */
  description?: string;
  /** Whether there is further actions. */
  actionsRequired?: string;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** The concrete private link service connection. */
export enum KnownPrivateLinkServiceConnectionStatus {
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
  /** Pending */
  Pending = "Pending",
  /** Removed */
  Removed = "Removed",
}

/**
 * The concrete private link service connection. \
 * {@link KnownPrivateLinkServiceConnectionStatus} can be used interchangeably with PrivateLinkServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Approved**: Approved \
 * **Rejected**: Rejected \
 * **Pending**: Pending \
 * **Removed**: Removed
 */
export type PrivateLinkServiceConnectionStatus = string;

/** The provisioning state, which only appears in the response. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** InProgress */
  InProgress = "InProgress",
  /** Updating */
  Updating = "Updating",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * The provisioning state, which only appears in the response. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress**: InProgress \
 * **Updating**: Updating \
 * **Failed**: Failed \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Deleting**: Deleting
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** Identity for the cluster. */
export interface ClusterIdentity {
  /** The principal id of cluster identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant id associated with the cluster. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of identity used for the cluster. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. */
  type?: ResourceIdentityType;
  /** The list of user identities associated with the cluster. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function clusterIdentitySerializer(item: ClusterIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function clusterIdentityDeserializer(item: any): ClusterIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The type of identity used for the cluster. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. */
export enum KnownResourceIdentityType {
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
 * The type of identity used for the cluster. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. \
 * {@link KnownResourceIdentityType} can be used interchangeably with ResourceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned**: SystemAssigned \
 * **UserAssigned**: UserAssigned \
 * **SystemAssigned, UserAssigned**: SystemAssigned, UserAssigned \
 * **None**: None
 */
export type ResourceIdentityType = string;

export function userAssignedIdentityRecordSerializer(
  item: Record<string, UserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

/** The User Assigned Identity */
export interface UserAssignedIdentity {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
  /** The tenant id of user assigned identity. */
  tenantId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return { tenantId: item["tenantId"] };
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
    tenantId: item["tenantId"],
  };
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
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

/** The CreateCluster request parameters. */
export interface ClusterCreateParametersExtended {
  /** The location of the cluster. */
  location?: string;
  /** The resource tags. */
  tags?: Record<string, string>;
  /** The availability zones. */
  zones?: string[];
  /** The cluster create parameters. */
  properties?: ClusterCreateProperties;
  /** The identity of the cluster, if configured. */
  identity?: ClusterIdentity;
}

export function clusterCreateParametersExtendedSerializer(
  item: ClusterCreateParametersExtended,
): any {
  return {
    location: item["location"],
    tags: item["tags"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    properties: !item["properties"]
      ? item["properties"]
      : clusterCreatePropertiesSerializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : clusterIdentitySerializer(item["identity"]),
  };
}

/** The cluster create parameters. */
export interface ClusterCreateProperties {
  /** The version of the cluster. */
  clusterVersion?: string;
  /** The type of operating system. */
  osType?: OSType;
  /** The cluster tier. */
  tier?: Tier;
  /** The cluster definition. */
  clusterDefinition?: ClusterDefinition;
  /** The cluster kafka rest proxy configuration. */
  kafkaRestProperties?: KafkaRestProperties;
  /** The security profile. */
  securityProfile?: SecurityProfile;
  /** The compute profile. */
  computeProfile?: ComputeProfile;
  /** The storage profile. */
  storageProfile?: StorageProfile;
  /** The disk encryption properties. */
  diskEncryptionProperties?: DiskEncryptionProperties;
  /** The encryption-in-transit properties. */
  encryptionInTransitProperties?: EncryptionInTransitProperties;
  /** The minimal supported tls version. */
  minSupportedTlsVersion?: string;
  /** The network properties. */
  networkProperties?: NetworkProperties;
  /** The compute isolation properties. */
  computeIsolationProperties?: ComputeIsolationProperties;
  /** The private link configurations. */
  privateLinkConfigurations?: PrivateLinkConfiguration[];
}

export function clusterCreatePropertiesSerializer(item: ClusterCreateProperties): any {
  return {
    clusterVersion: item["clusterVersion"],
    osType: item["osType"],
    tier: item["tier"],
    clusterDefinition: !item["clusterDefinition"]
      ? item["clusterDefinition"]
      : clusterDefinitionSerializer(item["clusterDefinition"]),
    kafkaRestProperties: !item["kafkaRestProperties"]
      ? item["kafkaRestProperties"]
      : kafkaRestPropertiesSerializer(item["kafkaRestProperties"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : securityProfileSerializer(item["securityProfile"]),
    computeProfile: !item["computeProfile"]
      ? item["computeProfile"]
      : computeProfileSerializer(item["computeProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : storageProfileSerializer(item["storageProfile"]),
    diskEncryptionProperties: !item["diskEncryptionProperties"]
      ? item["diskEncryptionProperties"]
      : diskEncryptionPropertiesSerializer(item["diskEncryptionProperties"]),
    encryptionInTransitProperties: !item["encryptionInTransitProperties"]
      ? item["encryptionInTransitProperties"]
      : encryptionInTransitPropertiesSerializer(item["encryptionInTransitProperties"]),
    minSupportedTlsVersion: item["minSupportedTlsVersion"],
    networkProperties: !item["networkProperties"]
      ? item["networkProperties"]
      : networkPropertiesSerializer(item["networkProperties"]),
    computeIsolationProperties: !item["computeIsolationProperties"]
      ? item["computeIsolationProperties"]
      : computeIsolationPropertiesSerializer(item["computeIsolationProperties"]),
    privateLinkConfigurations: !item["privateLinkConfigurations"]
      ? item["privateLinkConfigurations"]
      : privateLinkConfigurationArraySerializer(item["privateLinkConfigurations"]),
  };
}

/** The PatchCluster request parameters */
export interface ClusterPatchParameters {
  /** The resource tags. */
  tags?: Record<string, string>;
  /** The identity of the cluster, if configured. Setting this property will override the existing identity configuration of the cluster. */
  identity?: ClusterIdentity;
}

export function clusterPatchParametersSerializer(item: ClusterPatchParameters): any {
  return {
    tags: item["tags"],
    identity: !item["identity"] ? item["identity"] : clusterIdentitySerializer(item["identity"]),
  };
}

/** The response of a Cluster list operation. */
export interface _ClusterListResult {
  /** The Cluster items on this page */
  value: Cluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clusterListResultDeserializer(item: any): _ClusterListResult {
  return {
    value: clusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clusterArrayDeserializer(result: Array<Cluster>): any[] {
  return result.map((item) => {
    return clusterDeserializer(item);
  });
}

/** The Resize Cluster request parameters. */
export interface ClusterResizeParameters {
  /** The target instance count for the operation. */
  targetInstanceCount?: number;
}

export function clusterResizeParametersSerializer(item: ClusterResizeParameters): any {
  return { targetInstanceCount: item["targetInstanceCount"] };
}

/** The autoscale configuration update parameter. */
export interface AutoscaleConfigurationUpdateParameter {
  /** The autoscale configuration. */
  autoscale?: Autoscale;
}

export function autoscaleConfigurationUpdateParameterSerializer(
  item: AutoscaleConfigurationUpdateParameter,
): any {
  return {
    autoscale: !item["autoscale"] ? item["autoscale"] : autoscaleSerializer(item["autoscale"]),
  };
}

/** The Disk Encryption Cluster request parameters. */
export interface ClusterDiskEncryptionParameters {
  /** Base key vault URI where the customers key is located eg. https://myvault.vault.azure.net */
  vaultUri?: string;
  /** Key name that is used for enabling disk encryption. */
  keyName?: string;
  /** Specific key version that is used for enabling disk encryption. */
  keyVersion?: string;
}

export function clusterDiskEncryptionParametersSerializer(
  item: ClusterDiskEncryptionParameters,
): any {
  return { vaultUri: item["vaultUri"], keyName: item["keyName"], keyVersion: item["keyVersion"] };
}

/** Gateway settings. */
export interface GatewaySettings {
  /** Indicates whether or not the gateway settings based authorization is enabled. */
  readonly isCredentialEnabled?: string;
  /** The gateway settings user name. */
  readonly userName?: string;
  /** The gateway settings user password. */
  readonly password?: string;
  /** List of Entra users for gateway access. */
  restAuthEntraUsers?: EntraUserInfo[];
}

export function gatewaySettingsDeserializer(item: any): GatewaySettings {
  return {
    isCredentialEnabled: item["restAuthCredential.isEnabled"],
    userName: item["restAuthCredential.username"],
    password: item["restAuthCredential.password"],
    restAuthEntraUsers: !item["restAuthEntraUsers"]
      ? item["restAuthEntraUsers"]
      : entraUserInfoArrayDeserializer(item["restAuthEntraUsers"]),
  };
}

export function entraUserInfoArraySerializer(result: Array<EntraUserInfo>): any[] {
  return result.map((item) => {
    return entraUserInfoSerializer(item);
  });
}

export function entraUserInfoArrayDeserializer(result: Array<EntraUserInfo>): any[] {
  return result.map((item) => {
    return entraUserInfoDeserializer(item);
  });
}

/** Details of an Entra user for gateway access. */
export interface EntraUserInfo {
  /** The unique object ID of the Entra user or client ID of the enterprise applications. */
  objectId?: string;
  /** The display name of the Entra user. */
  displayName?: string;
  /** The User Principal Name (UPN) of the Entra user. It may be empty in certain cases, such as for enterprise applications. */
  upn?: string;
}

export function entraUserInfoSerializer(item: EntraUserInfo): any {
  return { objectId: item["objectId"], displayName: item["displayName"], upn: item["upn"] };
}

export function entraUserInfoDeserializer(item: any): EntraUserInfo {
  return {
    objectId: item["objectId"],
    displayName: item["displayName"],
    upn: item["upn"],
  };
}

/** The update gateway settings request parameters. Note either basic or entra user should be provided at a time. */
export interface UpdateGatewaySettingsParameters {
  /** Indicates whether or not the gateway settings based authorization is enabled. */
  isCredentialEnabled?: boolean;
  /** The gateway settings user name. */
  userName?: string;
  /** The gateway settings user password. */
  password?: string;
  /** List of Entra users for gateway access. */
  restAuthEntraUsers?: EntraUserInfo[];
}

export function updateGatewaySettingsParametersSerializer(
  item: UpdateGatewaySettingsParameters,
): any {
  return {
    "restAuthCredential.isEnabled": item["isCredentialEnabled"],
    "restAuthCredential.username": item["userName"],
    "restAuthCredential.password": item["password"],
    restAuthEntraUsers: !item["restAuthEntraUsers"]
      ? item["restAuthEntraUsers"]
      : entraUserInfoArraySerializer(item["restAuthEntraUsers"]),
  };
}

/** The update cluster identity certificate request parameters. */
export interface UpdateClusterIdentityCertificateParameters {
  /** The application id. */
  applicationId?: string;
  /** The certificate in base64 encoded format. */
  certificate?: string;
  /** The password of the certificate. */
  certificatePassword?: string;
}

export function updateClusterIdentityCertificateParametersSerializer(
  item: UpdateClusterIdentityCertificateParameters,
): any {
  return {
    applicationId: item["applicationId"],
    certificate: item["certificate"],
    certificatePassword: item["certificatePassword"],
  };
}

/** The parameters for the script actions to execute on a running cluster. */
export interface ExecuteScriptActionParameters {
  /** The list of run time script actions. */
  scriptActions?: RuntimeScriptAction[];
  /** Gets or sets if the scripts needs to be persisted. */
  persistOnSuccess: boolean;
}

export function executeScriptActionParametersSerializer(item: ExecuteScriptActionParameters): any {
  return {
    scriptActions: !item["scriptActions"]
      ? item["scriptActions"]
      : runtimeScriptActionArraySerializer(item["scriptActions"]),
    persistOnSuccess: item["persistOnSuccess"],
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

/** A private link resource */
export interface PrivateLinkResource extends ProxyResource {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
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
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
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

/** A list of private link resources */
export interface PrivateLinkResourceListResult {
  /** Array of private link resources */
  value?: PrivateLinkResource[];
}

export function privateLinkResourceListResultDeserializer(
  item: any,
): PrivateLinkResourceListResult {
  return {
    value: !item["value"] ? item["value"] : privateLinkResourceArrayDeserializer(item["value"]),
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** The configuration object for the specified cluster. */
export interface ClusterConfigurations {
  /** The configuration object for the specified configuration for the specified cluster. */
  configurations?: Record<string, Record<string, string>>;
}

export function clusterConfigurationsDeserializer(item: any): ClusterConfigurations {
  return {
    configurations: !item["configurations"]
      ? item["configurations"]
      : Object.fromEntries(
          Object.entries(item["configurations"]).map(([k, p]: [string, any]) => [
            k,
            Object.fromEntries(Object.entries(p).map(([k1, p1]: [string, any]) => [k1, p1])),
          ]),
        ),
  };
}

/** The cluster monitor parameters. */
export interface ClusterMonitoringRequest {
  /** The cluster monitor workspace ID. */
  workspaceId?: string;
  /** The cluster monitor workspace key. */
  primaryKey?: string;
}

export function clusterMonitoringRequestSerializer(item: ClusterMonitoringRequest): any {
  return { workspaceId: item["workspaceId"], primaryKey: item["primaryKey"] };
}

/** The cluster monitoring status response. */
export interface ClusterMonitoringResponse {
  /** The status of the monitor on the HDInsight cluster. */
  clusterMonitoringEnabled?: boolean;
  /** The workspace ID of the monitor on the HDInsight cluster. */
  workspaceId?: string;
}

export function clusterMonitoringResponseDeserializer(item: any): ClusterMonitoringResponse {
  return {
    clusterMonitoringEnabled: item["clusterMonitoringEnabled"],
    workspaceId: item["workspaceId"],
  };
}

/** The azure monitor parameters. */
export interface AzureMonitorRequest {
  /** The Log Analytics workspace ID. */
  workspaceId?: string;
  /** The Log Analytics workspace key. */
  primaryKey?: string;
  /** The selected configurations. */
  selectedConfigurations?: AzureMonitorSelectedConfigurations;
}

export function azureMonitorRequestSerializer(item: AzureMonitorRequest): any {
  return {
    workspaceId: item["workspaceId"],
    primaryKey: item["primaryKey"],
    selectedConfigurations: !item["selectedConfigurations"]
      ? item["selectedConfigurations"]
      : azureMonitorSelectedConfigurationsSerializer(item["selectedConfigurations"]),
  };
}

/** The selected configurations for azure monitor. */
export interface AzureMonitorSelectedConfigurations {
  /** The configuration version. */
  configurationVersion?: string;
  /** The global configurations of selected configurations. */
  globalConfigurations?: Record<string, string>;
  /** The table list. */
  tableList?: AzureMonitorTableConfiguration[];
}

export function azureMonitorSelectedConfigurationsSerializer(
  item: AzureMonitorSelectedConfigurations,
): any {
  return {
    configurationVersion: item["configurationVersion"],
    globalConfigurations: item["globalConfigurations"],
    tableList: !item["tableList"]
      ? item["tableList"]
      : azureMonitorTableConfigurationArraySerializer(item["tableList"]),
  };
}

export function azureMonitorSelectedConfigurationsDeserializer(
  item: any,
): AzureMonitorSelectedConfigurations {
  return {
    configurationVersion: item["configurationVersion"],
    globalConfigurations: !item["globalConfigurations"]
      ? item["globalConfigurations"]
      : Object.fromEntries(
          Object.entries(item["globalConfigurations"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    tableList: !item["tableList"]
      ? item["tableList"]
      : azureMonitorTableConfigurationArrayDeserializer(item["tableList"]),
  };
}

export function azureMonitorTableConfigurationArraySerializer(
  result: Array<AzureMonitorTableConfiguration>,
): any[] {
  return result.map((item) => {
    return azureMonitorTableConfigurationSerializer(item);
  });
}

export function azureMonitorTableConfigurationArrayDeserializer(
  result: Array<AzureMonitorTableConfiguration>,
): any[] {
  return result.map((item) => {
    return azureMonitorTableConfigurationDeserializer(item);
  });
}

/** The table configuration for the Log Analytics integration. */
export interface AzureMonitorTableConfiguration {
  /** The name. */
  name?: string;
}

export function azureMonitorTableConfigurationSerializer(
  item: AzureMonitorTableConfiguration,
): any {
  return { name: item["name"] };
}

export function azureMonitorTableConfigurationDeserializer(
  item: any,
): AzureMonitorTableConfiguration {
  return {
    name: item["name"],
  };
}

/** The azure monitor status response. */
export interface AzureMonitorResponse {
  /** The status of the monitor on the HDInsight cluster. */
  clusterMonitoringEnabled?: boolean;
  /** The workspace ID of the monitor on the HDInsight cluster. */
  workspaceId?: string;
  /** The selected configurations. */
  selectedConfigurations?: AzureMonitorSelectedConfigurations;
}

export function azureMonitorResponseDeserializer(item: any): AzureMonitorResponse {
  return {
    clusterMonitoringEnabled: item["clusterMonitoringEnabled"],
    workspaceId: item["workspaceId"],
    selectedConfigurations: !item["selectedConfigurations"]
      ? item["selectedConfigurations"]
      : azureMonitorSelectedConfigurationsDeserializer(item["selectedConfigurations"]),
  };
}

/** Cluster monitoring extensions. */
export interface Extension {
  /** The workspace ID for the cluster monitoring extension. */
  workspaceId?: string;
  /** The certificate for the cluster monitoring extensions. */
  primaryKey?: string;
}

export function extensionSerializer(item: Extension): any {
  return { workspaceId: item["workspaceId"], primaryKey: item["primaryKey"] };
}

/** The persisted script action for the cluster. */
export interface _ScriptActionsList {
  /** The RuntimeScriptActionDetail items on this page */
  value: RuntimeScriptActionDetail[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scriptActionsListDeserializer(item: any): _ScriptActionsList {
  return {
    value: runtimeScriptActionDetailArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function runtimeScriptActionDetailArrayDeserializer(
  result: Array<RuntimeScriptActionDetail>,
): any[] {
  return result.map((item) => {
    return runtimeScriptActionDetailDeserializer(item);
  });
}

/** The execution details of a script action. */
export interface RuntimeScriptActionDetail extends RuntimeScriptAction {
  /** The execution id of the script action. */
  readonly scriptExecutionId?: number;
  /** The start time of script action execution. */
  readonly startTime?: string;
  /** The end time of script action execution. */
  readonly endTime?: string;
  /** The current execution status of the script action. */
  readonly status?: string;
  /** The reason why the script action was executed. */
  readonly operation?: string;
  /** The summary of script action execution result. */
  readonly executionSummary?: ScriptActionExecutionSummary[];
  /** The script action execution debug information. */
  readonly debugInformation?: string;
}

export function runtimeScriptActionDetailDeserializer(item: any): RuntimeScriptActionDetail {
  return {
    name: item["name"],
    uri: item["uri"],
    parameters: item["parameters"],
    roles: item["roles"].map((p: any) => {
      return p;
    }),
    applicationName: item["applicationName"],
    scriptExecutionId: item["scriptExecutionId"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    status: item["status"],
    operation: item["operation"],
    executionSummary: !item["executionSummary"]
      ? item["executionSummary"]
      : scriptActionExecutionSummaryArrayDeserializer(item["executionSummary"]),
    debugInformation: item["debugInformation"],
  };
}

export function scriptActionExecutionSummaryArrayDeserializer(
  result: Array<ScriptActionExecutionSummary>,
): any[] {
  return result.map((item) => {
    return scriptActionExecutionSummaryDeserializer(item);
  });
}

/** The execution summary of a script action. */
export interface ScriptActionExecutionSummary {
  /** The status of script action execution. */
  readonly status?: string;
  /** The instance count for a given script action execution status. */
  readonly instanceCount?: number;
}

export function scriptActionExecutionSummaryDeserializer(item: any): ScriptActionExecutionSummary {
  return {
    status: item["status"],
    instanceCount: item["instanceCount"],
  };
}

/** The list script execution history response. */
export interface _ScriptActionExecutionHistoryList {
  /** The RuntimeScriptActionDetail items on this page */
  readonly value: RuntimeScriptActionDetail[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scriptActionExecutionHistoryListDeserializer(
  item: any,
): _ScriptActionExecutionHistoryList {
  return {
    value: runtimeScriptActionDetailArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The cluster host information. */
export interface HostInfo {
  /** The host name */
  name?: string;
  /** The Fully Qualified Domain Name of host */
  fqdn?: string;
  /** The effective disk encryption key URL used by the host */
  effectiveDiskEncryptionKeyUrl?: string;
}

export function hostInfoDeserializer(item: any): HostInfo {
  return {
    name: item["name"],
    fqdn: item["fqdn"],
    effectiveDiskEncryptionKeyUrl: item["effectiveDiskEncryptionKeyUrl"],
  };
}

/** The Get Capabilities operation response. */
export interface CapabilitiesResult {
  /** The version capability. */
  readonly versions?: Record<string, VersionsCapability>;
  /** The virtual machine size compatibility features. */
  regions?: Record<string, RegionsCapability>;
  /** The capability features. */
  features?: string[];
  /** The quota capability. */
  readonly quota?: QuotaCapability;
}

export function capabilitiesResultDeserializer(item: any): CapabilitiesResult {
  return {
    versions: !item["versions"]
      ? item["versions"]
      : versionsCapabilityRecordDeserializer(item["versions"]),
    regions: !item["regions"]
      ? item["regions"]
      : regionsCapabilityRecordDeserializer(item["regions"]),
    features: !item["features"]
      ? item["features"]
      : item["features"].map((p: any) => {
          return p;
        }),
    quota: !item["quota"] ? item["quota"] : quotaCapabilityDeserializer(item["quota"]),
  };
}

export function versionsCapabilityRecordDeserializer(
  item: Record<string, any>,
): Record<string, VersionsCapability> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : versionsCapabilityDeserializer(item[key]);
  });
  return result;
}

/** The version capability. */
export interface VersionsCapability {
  /** The list of version capabilities. */
  readonly available?: VersionSpec[];
}

export function versionsCapabilityDeserializer(item: any): VersionsCapability {
  return {
    available: !item["available"]
      ? item["available"]
      : versionSpecArrayDeserializer(item["available"]),
  };
}

export function versionSpecArrayDeserializer(result: Array<VersionSpec>): any[] {
  return result.map((item) => {
    return versionSpecDeserializer(item);
  });
}

/** The version properties. */
export interface VersionSpec {
  /** The friendly name */
  friendlyName?: string;
  /** The display name */
  displayName?: string;
  /** Whether or not the version is the default version. */
  isDefault?: boolean;
  /** The component version property. */
  componentVersions?: Record<string, string>;
}

export function versionSpecDeserializer(item: any): VersionSpec {
  return {
    friendlyName: item["friendlyName"],
    displayName: item["displayName"],
    isDefault: item["isDefault"],
    componentVersions: !item["componentVersions"]
      ? item["componentVersions"]
      : Object.fromEntries(
          Object.entries(item["componentVersions"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function regionsCapabilityRecordDeserializer(
  item: Record<string, any>,
): Record<string, RegionsCapability> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : regionsCapabilityDeserializer(item[key]);
  });
  return result;
}

/** The regions capability. */
export interface RegionsCapability {
  /** The list of region capabilities. */
  available?: string[];
}

export function regionsCapabilityDeserializer(item: any): RegionsCapability {
  return {
    available: !item["available"]
      ? item["available"]
      : item["available"].map((p: any) => {
          return p;
        }),
  };
}

/** The regional quota capability. */
export interface QuotaCapability {
  /** The number of cores used in the subscription. */
  coresUsed?: number;
  /** The number of cores that the subscription allowed. */
  maxCoresAllowed?: number;
  /** The list of region quota capabilities. */
  readonly regionalQuotas?: RegionalQuotaCapability[];
}

export function quotaCapabilityDeserializer(item: any): QuotaCapability {
  return {
    coresUsed: item["coresUsed"],
    maxCoresAllowed: item["maxCoresAllowed"],
    regionalQuotas: !item["regionalQuotas"]
      ? item["regionalQuotas"]
      : regionalQuotaCapabilityArrayDeserializer(item["regionalQuotas"]),
  };
}

export function regionalQuotaCapabilityArrayDeserializer(
  result: Array<RegionalQuotaCapability>,
): any[] {
  return result.map((item) => {
    return regionalQuotaCapabilityDeserializer(item);
  });
}

/** The regional quota capacity. */
export interface RegionalQuotaCapability {
  /** The region name. */
  regionName?: string;
  /** The number of cores used in the region. */
  coresUsed?: number;
  /** The number of cores available in the region. */
  coresAvailable?: number;
}

export function regionalQuotaCapabilityDeserializer(item: any): RegionalQuotaCapability {
  return {
    regionName: item["regionName"],
    coresUsed: item["coresUsed"],
    coresAvailable: item["coresAvailable"],
  };
}

/** The response for the operation to get regional usages for a subscription. */
export interface UsagesListResult {
  /** The list of usages. */
  readonly value?: Usage[];
}

export function usagesListResultDeserializer(item: any): UsagesListResult {
  return {
    value: !item["value"] ? item["value"] : usageArrayDeserializer(item["value"]),
  };
}

export function usageArrayDeserializer(result: Array<Usage>): any[] {
  return result.map((item) => {
    return usageDeserializer(item);
  });
}

/** The details about the usage of a particular limited resource. */
export interface Usage {
  /** The type of measurement for usage. */
  unit?: string;
  /** The current usage. */
  currentValue?: number;
  /** The maximum allowed usage. */
  limit?: number;
  /** The details about the localizable name of the used resource. */
  readonly name?: LocalizedName;
}

export function usageDeserializer(item: any): Usage {
  return {
    unit: item["unit"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    name: !item["name"] ? item["name"] : localizedNameDeserializer(item["name"]),
  };
}

/** The details about the localizable name of a type of usage. */
export interface LocalizedName {
  /** The name of the used resource. */
  value?: string;
  /** The localized name of the used resource. */
  localizedValue?: string;
}

export function localizedNameDeserializer(item: any): LocalizedName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** The response for the operation to get regional billingSpecs for a subscription. */
export interface BillingResponseListResult {
  /** The virtual machine sizes to include or exclude. */
  vmSizes?: string[];
  /** The vm sizes which enable encryption at host. */
  vmSizesWithEncryptionAtHost?: string[];
  /** The virtual machine filtering mode. Effectively this can enabling or disabling the virtual machine sizes in a particular set. */
  vmSizeFilters?: VmSizeCompatibilityFilterV2[];
  /** The vm size properties. */
  readonly vmSizeProperties?: VmSizeProperty[];
  /** The billing and managed disk billing resources for a region. */
  billingResources?: BillingResources[];
}

export function billingResponseListResultDeserializer(item: any): BillingResponseListResult {
  return {
    vmSizes: !item["vmSizes"]
      ? item["vmSizes"]
      : item["vmSizes"].map((p: any) => {
          return p;
        }),
    vmSizesWithEncryptionAtHost: !item["vmSizesWithEncryptionAtHost"]
      ? item["vmSizesWithEncryptionAtHost"]
      : item["vmSizesWithEncryptionAtHost"].map((p: any) => {
          return p;
        }),
    vmSizeFilters: !item["vmSizeFilters"]
      ? item["vmSizeFilters"]
      : vmSizeCompatibilityFilterV2ArrayDeserializer(item["vmSizeFilters"]),
    vmSizeProperties: !item["vmSizeProperties"]
      ? item["vmSizeProperties"]
      : vmSizePropertyArrayDeserializer(item["vmSizeProperties"]),
    billingResources: !item["billingResources"]
      ? item["billingResources"]
      : billingResourcesArrayDeserializer(item["billingResources"]),
  };
}

export function vmSizeCompatibilityFilterV2ArrayDeserializer(
  result: Array<VmSizeCompatibilityFilterV2>,
): any[] {
  return result.map((item) => {
    return vmSizeCompatibilityFilterV2Deserializer(item);
  });
}

/** This class represent a single filter object that defines a multidimensional set. The dimensions of this set are Regions, ClusterFlavors, NodeTypes and ClusterVersions. The constraint should be defined based on the following: FilterMode (Exclude vs Include), VMSizes (the vm sizes in affect of exclusion/inclusion) and the ordering of the Filters. Later filters override previous settings if conflicted. */
export interface VmSizeCompatibilityFilterV2 {
  /** The filtering mode. Effectively this can enabling or disabling the VM sizes in a particular set. */
  filterMode?: FilterMode;
  /** The list of regions under the effect of the filter. */
  regions?: string[];
  /** The list of cluster flavors under the effect of the filter. */
  clusterFlavors?: string[];
  /** The list of node types affected by the filter. */
  nodeTypes?: string[];
  /** The list of cluster versions affected in Major.Minor format. */
  clusterVersions?: string[];
  /** The OSType affected, Windows or Linux. */
  osType?: OSType[];
  /** The list of virtual machine sizes to include or exclude. */
  vmSizes?: string[];
  /** Whether apply for ESP cluster. 'true' means only for ESP, 'false' means only for non-ESP, null or empty string or others mean for both. */
  espApplied?: string;
  /** Whether support compute isolation. 'true' means only for ComputeIsolationEnabled, 'false' means only for regular cluster. */
  computeIsolationSupported?: string;
}

export function vmSizeCompatibilityFilterV2Deserializer(item: any): VmSizeCompatibilityFilterV2 {
  return {
    filterMode: item["filterMode"],
    regions: !item["regions"]
      ? item["regions"]
      : item["regions"].map((p: any) => {
          return p;
        }),
    clusterFlavors: !item["clusterFlavors"]
      ? item["clusterFlavors"]
      : item["clusterFlavors"].map((p: any) => {
          return p;
        }),
    nodeTypes: !item["nodeTypes"]
      ? item["nodeTypes"]
      : item["nodeTypes"].map((p: any) => {
          return p;
        }),
    clusterVersions: !item["clusterVersions"]
      ? item["clusterVersions"]
      : item["clusterVersions"].map((p: any) => {
          return p;
        }),
    osType: !item["osType"]
      ? item["osType"]
      : item["osType"].map((p: any) => {
          return p;
        }),
    vmSizes: !item["vmSizes"]
      ? item["vmSizes"]
      : item["vmSizes"].map((p: any) => {
          return p;
        }),
    espApplied: item["espApplied"],
    computeIsolationSupported: item["computeIsolationSupported"],
  };
}

/** The filtering mode. Effectively this can enabling or disabling the VM sizes in a particular set. */
export enum KnownFilterMode {
  /** Exclude */
  Exclude = "Exclude",
  /** Include */
  Include = "Include",
  /** Recommend */
  Recommend = "Recommend",
  /** Default */
  Default = "Default",
}

/**
 * The filtering mode. Effectively this can enabling or disabling the VM sizes in a particular set. \
 * {@link KnownFilterMode} can be used interchangeably with FilterMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Exclude**: Exclude \
 * **Include**: Include \
 * **Recommend**: Recommend \
 * **Default**: Default
 */
export type FilterMode = string;

export function vmSizePropertyArrayDeserializer(result: Array<VmSizeProperty>): any[] {
  return result.map((item) => {
    return vmSizePropertyDeserializer(item);
  });
}

/** The vm size property */
export interface VmSizeProperty {
  /** The vm size name. */
  name?: string;
  /** The number of cores that the vm size has. */
  cores?: number;
  /** The data disk storage tier of the vm size. */
  dataDiskStorageTier?: string;
  /** The label of the vm size. */
  label?: string;
  /** The max data disk count of the vm size. */
  maxDataDiskCount?: number;
  /** The memory whose unit is MB of the vm size. */
  memoryInMb?: number;
  /** This indicates this vm size is supported by virtual machines or not */
  supportedByVirtualMachines?: boolean;
  /** The indicates this vm size is supported by web worker roles or not */
  supportedByWebWorkerRoles?: boolean;
  /** The virtual machine resource disk size whose unit is MB of the vm size. */
  virtualMachineResourceDiskSizeInMb?: number;
  /** The web worker resource disk size whose unit is MB of the vm size. */
  webWorkerResourceDiskSizeInMb?: number;
}

export function vmSizePropertyDeserializer(item: any): VmSizeProperty {
  return {
    name: item["name"],
    cores: item["cores"],
    dataDiskStorageTier: item["dataDiskStorageTier"],
    label: item["label"],
    maxDataDiskCount: item["maxDataDiskCount"],
    memoryInMb: item["memoryInMb"],
    supportedByVirtualMachines: item["supportedByVirtualMachines"],
    supportedByWebWorkerRoles: item["supportedByWebWorkerRoles"],
    virtualMachineResourceDiskSizeInMb: item["virtualMachineResourceDiskSizeInMb"],
    webWorkerResourceDiskSizeInMb: item["webWorkerResourceDiskSizeInMb"],
  };
}

export function billingResourcesArrayDeserializer(result: Array<BillingResources>): any[] {
  return result.map((item) => {
    return billingResourcesDeserializer(item);
  });
}

/** The billing resources. */
export interface BillingResources {
  /** The region or location. */
  region?: string;
  /** The billing meter information. */
  billingMeters?: BillingMeters[];
  /** The managed disk billing information. */
  diskBillingMeters?: DiskBillingMeters[];
}

export function billingResourcesDeserializer(item: any): BillingResources {
  return {
    region: item["region"],
    billingMeters: !item["billingMeters"]
      ? item["billingMeters"]
      : billingMetersArrayDeserializer(item["billingMeters"]),
    diskBillingMeters: !item["diskBillingMeters"]
      ? item["diskBillingMeters"]
      : diskBillingMetersArrayDeserializer(item["diskBillingMeters"]),
  };
}

export function billingMetersArrayDeserializer(result: Array<BillingMeters>): any[] {
  return result.map((item) => {
    return billingMetersDeserializer(item);
  });
}

/** The billing meters. */
export interface BillingMeters {
  /** The virtual machine sizes. */
  meterParameter?: string;
  /** The HDInsight meter guid. */
  meter?: string;
  /** The unit of meter, VMHours or CoreHours. */
  unit?: string;
}

export function billingMetersDeserializer(item: any): BillingMeters {
  return {
    meterParameter: item["meterParameter"],
    meter: item["meter"],
    unit: item["unit"],
  };
}

export function diskBillingMetersArrayDeserializer(result: Array<DiskBillingMeters>): any[] {
  return result.map((item) => {
    return diskBillingMetersDeserializer(item);
  });
}

/** The disk billing meters. */
export interface DiskBillingMeters {
  /** The managed disk meter guid. */
  diskRpMeter?: string;
  /** The managed disk billing sku, P30 or S30. */
  sku?: string;
  /** The managed disk billing tier, Standard or Premium. */
  tier?: Tier;
}

export function diskBillingMetersDeserializer(item: any): DiskBillingMeters {
  return {
    diskRpMeter: item["diskRpMeter"],
    sku: item["sku"],
    tier: item["tier"],
  };
}

/** The request spec of checking name availability. */
export interface NameAvailabilityCheckRequestParameters {
  /** The resource name. */
  name?: string;
  /** The resource type */
  type?: string;
}

export function nameAvailabilityCheckRequestParametersSerializer(
  item: NameAvailabilityCheckRequestParameters,
): any {
  return { name: item["name"], type: item["type"] };
}

/** The response spec of checking name availability. */
export interface NameAvailabilityCheckResult {
  /** This indicates whether the name is available. */
  nameAvailable?: boolean;
  /** The reason of the result. */
  readonly reason?: string;
  /** The related message. */
  readonly message?: string;
}

export function nameAvailabilityCheckResultDeserializer(item: any): NameAvailabilityCheckResult {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** The cluster create request specification. */
export interface ClusterCreateRequestValidationParameters extends ClusterCreateParametersExtended {
  /** The cluster name. */
  name?: string;
  /** The resource type. */
  type?: string;
  /** The tenant id. */
  tenantId?: string;
  /** This indicates whether fetch Aadds resource or not. */
  fetchAaddsResource?: boolean;
}

export function clusterCreateRequestValidationParametersSerializer(
  item: ClusterCreateRequestValidationParameters,
): any {
  return {
    location: item["location"],
    tags: item["tags"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    properties: !item["properties"]
      ? item["properties"]
      : clusterCreatePropertiesSerializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : clusterIdentitySerializer(item["identity"]),
    name: item["name"],
    type: item["type"],
    tenantId: item["tenantId"],
    fetchAaddsResource: item["fetchAaddsResource"],
  };
}

/** The response of cluster create request validation. */
export interface ClusterCreateValidationResult {
  /** The validation errors. */
  validationErrors?: ValidationErrorInfo[];
  /** The validation warnings. */
  validationWarnings?: ValidationErrorInfo[];
  /** The estimated creation duration. */
  estimatedCreationDuration?: string;
  /** The Azure active directory domain service resource details. */
  aaddsResourcesDetails?: AaddsResourceDetails[];
}

export function clusterCreateValidationResultDeserializer(
  item: any,
): ClusterCreateValidationResult {
  return {
    validationErrors: !item["validationErrors"]
      ? item["validationErrors"]
      : validationErrorInfoArrayDeserializer(item["validationErrors"]),
    validationWarnings: !item["validationWarnings"]
      ? item["validationWarnings"]
      : validationErrorInfoArrayDeserializer(item["validationWarnings"]),
    estimatedCreationDuration: item["estimatedCreationDuration"],
    aaddsResourcesDetails: !item["aaddsResourcesDetails"]
      ? item["aaddsResourcesDetails"]
      : aaddsResourceDetailsArrayDeserializer(item["aaddsResourcesDetails"]),
  };
}

export function validationErrorInfoArrayDeserializer(result: Array<ValidationErrorInfo>): any[] {
  return result.map((item) => {
    return validationErrorInfoDeserializer(item);
  });
}

/** The validation error information. */
export interface ValidationErrorInfo {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
  /** The error resource. */
  errorResource?: string;
  /** The message arguments */
  messageArguments?: string[];
}

export function validationErrorInfoDeserializer(item: any): ValidationErrorInfo {
  return {
    code: item["code"],
    message: item["message"],
    errorResource: item["errorResource"],
    messageArguments: !item["messageArguments"]
      ? item["messageArguments"]
      : item["messageArguments"].map((p: any) => {
          return p;
        }),
  };
}

export function aaddsResourceDetailsArrayDeserializer(result: Array<AaddsResourceDetails>): any[] {
  return result.map((item) => {
    return aaddsResourceDetailsDeserializer(item);
  });
}

/** The Azure active directory domain service resource details. */
export interface AaddsResourceDetails {
  /** The Azure active directory domain service name. */
  domainName?: string;
  /** This indicates whether initial sync complete or not. */
  initialSyncComplete?: boolean;
  /** This indicates whether enable ldaps or not. */
  ldapsEnabled?: boolean;
  /** The base 64 format string of public ldap certificate. */
  ldapsPublicCertificateInBase64?: string;
  /** The resource id of azure active directory domain service. */
  resourceId?: string;
  /** The subnet resource id. */
  subnetId?: string;
  /** The tenant id of azure active directory domain service . */
  tenantId?: string;
}

export function aaddsResourceDetailsDeserializer(item: any): AaddsResourceDetails {
  return {
    domainName: item["domainName"],
    initialSyncComplete: item["initialSyncComplete"],
    ldapsEnabled: item["ldapsEnabled"],
    ldapsPublicCertificateInBase64: item["ldapsPublicCertificateInBase64"],
    resourceId: item["resourceId"],
    subnetId: item["subnetId"],
    tenantId: item["tenantId"],
  };
}

/** Known values of {@link RoleName} that the service accepts. */
export enum KnownRoleName {
  /** workernode */
  Workernode = "workernode",
}

/** Type of RoleName */
export type RoleName = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-01-15-preview API version. */
  V20250115Preview = "2025-01-15-preview",
}

export function hostInfoArrayDeserializer(result: Array<HostInfo>): any[] {
  return result.map((item) => {
    return hostInfoDeserializer(item);
  });
}

export function _ipConfigurationPropertiesSerializer(item: IPConfiguration): any {
  return {
    primary: item["primary"],
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    subnet: !item["subnet"] ? item["subnet"] : resourceIdSerializer(item["subnet"]),
  };
}

export function _ipConfigurationPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    primary: item["primary"],
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    subnet: !item["subnet"] ? item["subnet"] : resourceIdDeserializer(item["subnet"]),
  };
}

export function _privateLinkConfigurationPropertiesSerializer(item: PrivateLinkConfiguration): any {
  return {
    groupId: item["groupId"],
    ipConfigurations: ipConfigurationArraySerializer(item["ipConfigurations"]),
  };
}

export function _privateLinkConfigurationPropertiesDeserializer(item: any) {
  return {
    groupId: item["groupId"],
    provisioningState: item["provisioningState"],
    ipConfigurations: ipConfigurationArrayDeserializer(item["ipConfigurations"]),
  };
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    linkIdentifier: item["linkIdentifier"],
    provisioningState: item["provisioningState"],
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
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

export type VirtualMachinesListHostsResponse = { body: HostInfo[] };
