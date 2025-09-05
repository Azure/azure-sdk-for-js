// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The response model for the list of Automation operations. */
export interface _OperationList {
  /** List of Automation operations supported by the Automation resource provider. */
  value: Operation[];
  nextLink?: string;
}

export function _operationListDeserializer(item: any): _OperationList {
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

/** GuestConfiguration REST API operation. */
export interface Operation {
  /** Operation name: For example, providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/write or read. */
  name?: string;
  /** Provider, Resource, Operation, and description values. */
  display?: OperationDisplay;
  /** Additional properties of the operation. */
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

/** Provider, Resource, Operation, and description values. */
export interface OperationDisplay {
  /** Service provider: Microsoft.GuestConfiguration. */
  provider?: string;
  /** Resource on which the operation is performed. */
  resource?: string;
  /** Operation type: Read, write, delete, etc. */
  operation?: string;
  /** Description about the operation. */
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

/** Provider, Resource, Operation and description values. */
export interface OperationProperties {
  /** Service provider: Microsoft.GuestConfiguration */
  statusCode?: string;
}

export function operationPropertiesDeserializer(item: any): OperationProperties {
  return {
    statusCode: item["statusCode"],
  };
}

/** Error response of an operation failure. */
export interface ErrorResponse {
  error?: {
    code?: string;
    message?: string;
  };
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : _errorResponseErrorDeserializer(item["error"]),
  };
}

/** model interface _ErrorResponseError */
export interface _ErrorResponseError {
  /** Error code. */
  code?: string;
  /** Detail error message indicating why the operation failed. */
  message?: string;
}

export function _errorResponseErrorDeserializer(item: any): _ErrorResponseError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Guest configuration assignment is an association between a machine and guest configuration. */
export interface GuestConfigurationAssignment extends ProxyResource {
  /** Properties of the Guest configuration assignment. */
  properties?: GuestConfigurationAssignmentProperties;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function guestConfigurationAssignmentSerializer(item: GuestConfigurationAssignment): any {
  return {
    name: item["name"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : guestConfigurationAssignmentPropertiesSerializer(item["properties"]),
  };
}

export function guestConfigurationAssignmentDeserializer(item: any): GuestConfigurationAssignment {
  return {
    id: item["id"],
    name: item["name"],
    location: item["location"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : guestConfigurationAssignmentPropertiesDeserializer(item["properties"]),
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Guest configuration assignment properties. */
export interface GuestConfigurationAssignmentProperties {
  /** VM resource Id. */
  readonly targetResourceId?: string | null;
  /** The guest configuration to assign. */
  guestConfiguration?: GuestConfigurationNavigation;
  /** A value indicating compliance status of the machine for the assigned guest configuration. */
  readonly complianceStatus?: ComplianceStatus;
  /** Date and time when last compliance status was checked. */
  readonly lastComplianceStatusChecked?: Date | null;
  /** Id of the latest report for the guest configuration assignment. */
  readonly latestReportId?: string | null;
  /** parameter hash for the guest configuration assignment. */
  readonly parameterHash?: string | null;
  /** Last reported guest configuration assignment report. */
  latestAssignmentReport?: AssignmentReport;
  /** The source which initiated the guest configuration assignment. Ex: Azure Policy */
  context?: string;
  /** Combined hash of the configuration package and parameters. */
  readonly assignmentHash?: string | null;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: ProvisioningState | null;
  /** Type of the resource - VMSS / VM */
  readonly resourceType?: string | null;
  /** The list of VM Compliance data for VMSS */
  vmssVMList?: VmssvmInfo[];
}

export function guestConfigurationAssignmentPropertiesSerializer(
  item: GuestConfigurationAssignmentProperties,
): any {
  return {
    guestConfiguration: !item["guestConfiguration"]
      ? item["guestConfiguration"]
      : guestConfigurationNavigationSerializer(item["guestConfiguration"]),
    latestAssignmentReport: !item["latestAssignmentReport"]
      ? item["latestAssignmentReport"]
      : assignmentReportSerializer(item["latestAssignmentReport"]),
    context: item["context"],
    vmssVMList: !item["vmssVMList"]
      ? item["vmssVMList"]
      : vmssvmInfoArraySerializer(item["vmssVMList"]),
  };
}

export function guestConfigurationAssignmentPropertiesDeserializer(
  item: any,
): GuestConfigurationAssignmentProperties {
  return {
    targetResourceId: item["targetResourceId"],
    guestConfiguration: !item["guestConfiguration"]
      ? item["guestConfiguration"]
      : guestConfigurationNavigationDeserializer(item["guestConfiguration"]),
    complianceStatus: item["complianceStatus"],
    lastComplianceStatusChecked: !item["lastComplianceStatusChecked"]
      ? item["lastComplianceStatusChecked"]
      : new Date(item["lastComplianceStatusChecked"]),
    latestReportId: item["latestReportId"],
    parameterHash: item["parameterHash"],
    latestAssignmentReport: !item["latestAssignmentReport"]
      ? item["latestAssignmentReport"]
      : assignmentReportDeserializer(item["latestAssignmentReport"]),
    context: item["context"],
    assignmentHash: item["assignmentHash"],
    provisioningState: item["provisioningState"],
    resourceType: item["resourceType"],
    vmssVMList: !item["vmssVMList"]
      ? item["vmssVMList"]
      : vmssvmInfoArrayDeserializer(item["vmssVMList"]),
  };
}

/** Guest configuration is an artifact that encapsulates DSC configuration and its dependencies. The artifact is a zip file containing DSC configuration (as MOF) and dependent resources and other dependencies like modules. */
export interface GuestConfigurationNavigation {
  /** Kind of the guest configuration. For example:DSC */
  kind?: Kind;
  /** Name of the guest configuration. */
  name?: string;
  /** Version of the guest configuration. */
  version?: string;
  /** Uri of the storage where guest configuration package is uploaded. */
  contentUri?: string;
  /** Combined hash of the guest configuration package and configuration parameters. */
  contentHash?: string;
  /** Managed identity with storage access of the guest configuration package and configuration parameters. */
  contentManagedIdentity?: string;
  /** Specifies the assignment type and execution of the configuration. Possible values are Audit, DeployAndAutoCorrect, ApplyAndAutoCorrect and ApplyAndMonitor. */
  assignmentType?: AssignmentType;
  /** Specifies the origin of the configuration. */
  readonly assignmentSource?: string | null;
  /** Specifies the content type of the configuration. Possible values could be Builtin or Custom. */
  readonly contentType?: string | null;
  /** The configuration parameters for the guest configuration. */
  configurationParameter?: ConfigurationParameter[];
  /** The protected configuration parameters for the guest configuration. */
  configurationProtectedParameter?: ConfigurationParameter[];
  /** The configuration setting for the guest configuration. */
  readonly configurationSetting?: ConfigurationSetting;
}

export function guestConfigurationNavigationSerializer(item: GuestConfigurationNavigation): any {
  return {
    kind: item["kind"],
    name: item["name"],
    version: item["version"],
    contentUri: item["contentUri"],
    contentHash: item["contentHash"],
    contentManagedIdentity: item["contentManagedIdentity"],
    assignmentType: item["assignmentType"],
    configurationParameter: !item["configurationParameter"]
      ? item["configurationParameter"]
      : configurationParameterArraySerializer(item["configurationParameter"]),
    configurationProtectedParameter: !item["configurationProtectedParameter"]
      ? item["configurationProtectedParameter"]
      : configurationParameterArraySerializer(item["configurationProtectedParameter"]),
  };
}

export function guestConfigurationNavigationDeserializer(item: any): GuestConfigurationNavigation {
  return {
    kind: item["kind"],
    name: item["name"],
    version: item["version"],
    contentUri: item["contentUri"],
    contentHash: item["contentHash"],
    contentManagedIdentity: item["contentManagedIdentity"],
    assignmentType: item["assignmentType"],
    assignmentSource: item["assignmentSource"],
    contentType: item["contentType"],
    configurationParameter: !item["configurationParameter"]
      ? item["configurationParameter"]
      : configurationParameterArrayDeserializer(item["configurationParameter"]),
    configurationProtectedParameter: !item["configurationProtectedParameter"]
      ? item["configurationProtectedParameter"]
      : configurationParameterArrayDeserializer(item["configurationProtectedParameter"]),
    configurationSetting: !item["configurationSetting"]
      ? item["configurationSetting"]
      : configurationSettingDeserializer(item["configurationSetting"]),
  };
}

/** Kind of the guest configuration. For example:DSC */
export enum KnownKind {
  DSC = "DSC",
}

/**
 * Kind of the guest configuration. For example:DSC \
 * {@link KnownKind} can be used interchangeably with Kind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DSC**
 */
export type Kind = string;

/** Specifies the assignment type and execution of the configuration. Possible values are Audit, DeployAndAutoCorrect, ApplyAndAutoCorrect and ApplyAndMonitor. */
export enum KnownAssignmentType {
  Audit = "Audit",
  DeployAndAutoCorrect = "DeployAndAutoCorrect",
  ApplyAndAutoCorrect = "ApplyAndAutoCorrect",
  ApplyAndMonitor = "ApplyAndMonitor",
}

/**
 * Specifies the assignment type and execution of the configuration. Possible values are Audit, DeployAndAutoCorrect, ApplyAndAutoCorrect and ApplyAndMonitor. \
 * {@link KnownAssignmentType} can be used interchangeably with AssignmentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Audit** \
 * **DeployAndAutoCorrect** \
 * **ApplyAndAutoCorrect** \
 * **ApplyAndMonitor**
 */
export type AssignmentType = string;

export function configurationParameterArraySerializer(
  result: Array<ConfigurationParameter>,
): any[] {
  return result.map((item) => {
    return configurationParameterSerializer(item);
  });
}

export function configurationParameterArrayDeserializer(
  result: Array<ConfigurationParameter>,
): any[] {
  return result.map((item) => {
    return configurationParameterDeserializer(item);
  });
}

/** Represents a configuration parameter. */
export interface ConfigurationParameter {
  /** Name of the configuration parameter. */
  name?: string;
  /** Value of the configuration parameter. */
  value?: string;
}

export function configurationParameterSerializer(item: ConfigurationParameter): any {
  return { name: item["name"], value: item["value"] };
}

export function configurationParameterDeserializer(item: any): ConfigurationParameter {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Configuration setting of LCM (Local Configuration Manager). */
export interface ConfigurationSetting {
  /** Specifies how the LCM(Local Configuration Manager) actually applies the configuration to the target nodes. Possible values are ApplyOnly, ApplyAndMonitor, and ApplyAndAutoCorrect. */
  readonly configurationMode?: ConfigurationMode;
  /** If true - new configurations downloaded from the pull service are allowed to overwrite the old ones on the target node. Otherwise, false */
  readonly allowModuleOverwrite?: boolean;
  /** Specifies what happens after a reboot during the application of a configuration. The possible values are ContinueConfiguration and StopConfiguration */
  readonly actionAfterReboot?: ActionAfterReboot;
  /** The time interval, in minutes, at which the LCM checks a pull service to get updated configurations. This value is ignored if the LCM is not configured in pull mode. The default value is 30. */
  readonly refreshFrequencyMins?: number;
  /** Set this to true to automatically reboot the node after a configuration that requires reboot is applied. Otherwise, you will have to manually reboot the node for any configuration that requires it. The default value is false. To use this setting when a reboot condition is enacted by something other than DSC (such as Windows Installer), combine this setting with the xPendingReboot module. */
  readonly rebootIfNeeded?: boolean;
  /** How often, in minutes, the current configuration is checked and applied. This property is ignored if the ConfigurationMode property is set to ApplyOnly. The default value is 15. */
  readonly configurationModeFrequencyMins?: number;
}

export function configurationSettingDeserializer(item: any): ConfigurationSetting {
  return {
    configurationMode: item["configurationMode"],
    allowModuleOverwrite: item["allowModuleOverwrite"],
    actionAfterReboot: item["actionAfterReboot"],
    refreshFrequencyMins: item["refreshFrequencyMins"],
    rebootIfNeeded: item["rebootIfNeeded"],
    configurationModeFrequencyMins: item["configurationModeFrequencyMins"],
  };
}

/** Specifies how the LCM(Local Configuration Manager) actually applies the configuration to the target nodes. Possible values are ApplyOnly, ApplyAndMonitor, and ApplyAndAutoCorrect. */
export enum KnownConfigurationMode {
  ApplyOnly = "ApplyOnly",
  ApplyAndMonitor = "ApplyAndMonitor",
  ApplyAndAutoCorrect = "ApplyAndAutoCorrect",
}

/**
 * Specifies how the LCM(Local Configuration Manager) actually applies the configuration to the target nodes. Possible values are ApplyOnly, ApplyAndMonitor, and ApplyAndAutoCorrect. \
 * {@link KnownConfigurationMode} can be used interchangeably with ConfigurationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ApplyOnly** \
 * **ApplyAndMonitor** \
 * **ApplyAndAutoCorrect**
 */
export type ConfigurationMode = string;

/** Specifies what happens after a reboot during the application of a configuration. The possible values are ContinueConfiguration and StopConfiguration */
export enum KnownActionAfterReboot {
  ContinueConfiguration = "ContinueConfiguration",
  StopConfiguration = "StopConfiguration",
}

/**
 * Specifies what happens after a reboot during the application of a configuration. The possible values are ContinueConfiguration and StopConfiguration \
 * {@link KnownActionAfterReboot} can be used interchangeably with ActionAfterReboot,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ContinueConfiguration** \
 * **StopConfiguration**
 */
export type ActionAfterReboot = string;

/** A value indicating compliance status of the machine for the assigned guest configuration. */
export enum KnownComplianceStatus {
  Compliant = "Compliant",
  NonCompliant = "NonCompliant",
  Pending = "Pending",
}

/**
 * A value indicating compliance status of the machine for the assigned guest configuration. \
 * {@link KnownComplianceStatus} can be used interchangeably with ComplianceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Compliant** \
 * **NonCompliant** \
 * **Pending**
 */
export type ComplianceStatus = string;

/** model interface AssignmentReport */
export interface AssignmentReport {
  /** ARM resource id of the report for the guest configuration assignment. */
  readonly id?: string;
  /** GUID that identifies the guest configuration assignment report under a subscription, resource group. */
  readonly reportId?: string;
  /** Configuration details of the guest configuration assignment. */
  assignment?: AssignmentInfo;
  /** Information about the VM. */
  vm?: VMInfo;
  /** Start date and time of the guest configuration assignment compliance status check. */
  readonly startTime?: Date;
  /** End date and time of the guest configuration assignment compliance status check. */
  readonly endTime?: Date;
  /** A value indicating compliance status of the machine for the assigned guest configuration. */
  readonly complianceStatus?: ComplianceStatus;
  /** Type of report, Consistency or Initial */
  readonly operationType?: Type;
  /** The list of resources for which guest configuration assignment compliance is checked. */
  resources?: AssignmentReportResource[];
}

export function assignmentReportSerializer(item: AssignmentReport): any {
  return {
    assignment: !item["assignment"]
      ? item["assignment"]
      : assignmentInfoSerializer(item["assignment"]),
    vm: !item["vm"] ? item["vm"] : vmInfoSerializer(item["vm"]),
    resources: !item["resources"]
      ? item["resources"]
      : assignmentReportResourceArraySerializer(item["resources"]),
  };
}

export function assignmentReportDeserializer(item: any): AssignmentReport {
  return {
    id: item["id"],
    reportId: item["reportId"],
    assignment: !item["assignment"]
      ? item["assignment"]
      : assignmentInfoDeserializer(item["assignment"]),
    vm: !item["vm"] ? item["vm"] : vmInfoDeserializer(item["vm"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    complianceStatus: item["complianceStatus"],
    operationType: item["operationType"],
    resources: !item["resources"]
      ? item["resources"]
      : assignmentReportResourceArrayDeserializer(item["resources"]),
  };
}

/** Information about the guest configuration assignment. */
export interface AssignmentInfo {
  /** Name of the guest configuration assignment. */
  readonly name?: string;
  /** Information about the configuration. */
  configuration?: ConfigurationInfo;
}

export function assignmentInfoSerializer(item: AssignmentInfo): any {
  return {
    configuration: !item["configuration"]
      ? item["configuration"]
      : configurationInfoSerializer(item["configuration"]),
  };
}

export function assignmentInfoDeserializer(item: any): AssignmentInfo {
  return {
    name: item["name"],
    configuration: !item["configuration"]
      ? item["configuration"]
      : configurationInfoDeserializer(item["configuration"]),
  };
}

/** Information about the configuration. */
export interface ConfigurationInfo {
  /** Name of the configuration. */
  readonly name?: string;
  /** Version of the configuration. */
  readonly version?: string;
}

export function configurationInfoSerializer(item: ConfigurationInfo): any {
  return item;
}

export function configurationInfoDeserializer(item: any): ConfigurationInfo {
  return {
    name: item["name"],
    version: item["version"],
  };
}

/** Information about the VM. */
export interface VMInfo {
  /** Azure resource Id of the VM. */
  readonly id?: string;
  /** UUID(Universally Unique Identifier) of the VM. */
  readonly uuid?: string;
}

export function vmInfoSerializer(item: VMInfo): any {
  return item;
}

export function vmInfoDeserializer(item: any): VMInfo {
  return {
    id: item["id"],
    uuid: item["uuid"],
  };
}

/** Type of report, Consistency or Initial */
export enum KnownType {
  Consistency = "Consistency",
  Initial = "Initial",
}

/**
 * Type of report, Consistency or Initial \
 * {@link KnownType} can be used interchangeably with Type,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Consistency** \
 * **Initial**
 */
export type Type = string;

export function assignmentReportResourceArraySerializer(
  result: Array<AssignmentReportResource>,
): any[] {
  return result.map((item) => {
    return assignmentReportResourceSerializer(item);
  });
}

export function assignmentReportResourceArrayDeserializer(
  result: Array<AssignmentReportResource>,
): any[] {
  return result.map((item) => {
    return assignmentReportResourceDeserializer(item);
  });
}

/** The guest configuration assignment resource. */
export interface AssignmentReportResource {
  /** A value indicating compliance status of the machine for the assigned guest configuration. */
  readonly complianceStatus?: ComplianceStatus;
  /** Name of the guest configuration assignment resource setting. */
  readonly resourceId?: string;
  /** Compliance reason and reason code for a resource. */
  reasons?: AssignmentReportResourceComplianceReason[];
  /** Properties of a guest configuration assignment resource. */
  readonly properties?: any;
}

export function assignmentReportResourceSerializer(item: AssignmentReportResource): any {
  return {
    reasons: !item["reasons"]
      ? item["reasons"]
      : assignmentReportResourceComplianceReasonArraySerializer(item["reasons"]),
  };
}

export function assignmentReportResourceDeserializer(item: any): AssignmentReportResource {
  return {
    complianceStatus: item["complianceStatus"],
    resourceId: item["resourceId"],
    reasons: !item["reasons"]
      ? item["reasons"]
      : assignmentReportResourceComplianceReasonArrayDeserializer(item["reasons"]),
    properties: item["properties"],
  };
}

export function assignmentReportResourceComplianceReasonArraySerializer(
  result: Array<AssignmentReportResourceComplianceReason>,
): any[] {
  return result.map((item) => {
    return assignmentReportResourceComplianceReasonSerializer(item);
  });
}

export function assignmentReportResourceComplianceReasonArrayDeserializer(
  result: Array<AssignmentReportResourceComplianceReason>,
): any[] {
  return result.map((item) => {
    return assignmentReportResourceComplianceReasonDeserializer(item);
  });
}

/** Reason and code for the compliance of the guest configuration assignment resource. */
export interface AssignmentReportResourceComplianceReason {
  /** Reason for the compliance of the guest configuration assignment resource. */
  readonly phrase?: string;
  /** Code for the compliance of the guest configuration assignment resource. */
  readonly code?: string;
}

export function assignmentReportResourceComplianceReasonSerializer(
  item: AssignmentReportResourceComplianceReason,
): any {
  return item;
}

export function assignmentReportResourceComplianceReasonDeserializer(
  item: any,
): AssignmentReportResourceComplianceReason {
  return {
    phrase: item["phrase"],
    code: item["code"],
  };
}

/** The provisioning state, which only appears in the response. */
export enum KnownProvisioningState {
  Succeeded = "Succeeded",
  Failed = "Failed",
  Canceled = "Canceled",
  Created = "Created",
}

/**
 * The provisioning state, which only appears in the response. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Created**
 */
export type ProvisioningState = string;

export function vmssvmInfoArraySerializer(result: Array<VmssvmInfo>): any[] {
  return result.map((item) => {
    return vmssvmInfoSerializer(item);
  });
}

export function vmssvmInfoArrayDeserializer(result: Array<VmssvmInfo>): any[] {
  return result.map((item) => {
    return vmssvmInfoDeserializer(item);
  });
}

/** Information about VMSS VM */
export interface VmssvmInfo {
  /** UUID of the VM. */
  readonly vmId?: string;
  /** Azure resource Id of the VM. */
  readonly vmResourceId?: string;
  /** A value indicating compliance status of the machine for the assigned guest configuration. */
  readonly complianceStatus?: ComplianceStatus;
  /** Id of the latest report for the guest configuration assignment. */
  readonly latestReportId?: string | null;
  /** Date and time when last compliance status was checked. */
  readonly lastComplianceChecked?: Date | null;
}

export function vmssvmInfoSerializer(item: VmssvmInfo): any {
  return item;
}

export function vmssvmInfoDeserializer(item: any): VmssvmInfo {
  return {
    vmId: item["vmId"],
    vmResourceId: item["vmResourceId"],
    complianceStatus: item["complianceStatus"],
    latestReportId: item["latestReportId"],
    lastComplianceChecked: !item["lastComplianceChecked"]
      ? item["lastComplianceChecked"]
      : new Date(item["lastComplianceChecked"]),
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
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** ARM proxy resource. */
export interface ProxyResource {
  /** ARM resource id of the guest configuration assignment. */
  readonly id?: string;
  /** The guest configuration assignment name. */
  name: string;
  /** Region where the VM is located. */
  location?: string;
  /** The type of the resource. */
  readonly type?: string;
}

export function proxyResourceSerializer(item: ProxyResource): any {
  return { name: item["name"], location: item["location"] };
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    location: item["location"],
    type: item["type"],
  };
}

/** The response of the list guest configuration assignment operation. */
export interface _GuestConfigurationAssignmentList {
  /** Result of the list guest configuration assignment operation. */
  value?: GuestConfigurationAssignment[];
  nextLink?: string;
}

export function _guestConfigurationAssignmentListDeserializer(
  item: any,
): _GuestConfigurationAssignmentList {
  return {
    value: !item["value"]
      ? item["value"]
      : guestConfigurationAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function guestConfigurationAssignmentArraySerializer(
  result: Array<GuestConfigurationAssignment>,
): any[] {
  return result.map((item) => {
    return guestConfigurationAssignmentSerializer(item);
  });
}

export function guestConfigurationAssignmentArrayDeserializer(
  result: Array<GuestConfigurationAssignment>,
): any[] {
  return result.map((item) => {
    return guestConfigurationAssignmentDeserializer(item);
  });
}

/** List of guest configuration assignment reports. */
export interface _GuestConfigurationAssignmentReportList {
  /** List of reports for the guest configuration. Report contains information such as compliance status, reason and more. */
  value?: GuestConfigurationAssignmentReport[];
  nextLink?: string;
}

export function _guestConfigurationAssignmentReportListDeserializer(
  item: any,
): _GuestConfigurationAssignmentReportList {
  return {
    value: !item["value"]
      ? item["value"]
      : guestConfigurationAssignmentReportArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function guestConfigurationAssignmentReportArrayDeserializer(
  result: Array<GuestConfigurationAssignmentReport>,
): any[] {
  return result.map((item) => {
    return guestConfigurationAssignmentReportDeserializer(item);
  });
}

/** Report for the guest configuration assignment. Report contains information such as compliance status, reason, and more. */
export interface GuestConfigurationAssignmentReport {
  /** ARM resource id of the report for the guest configuration assignment. */
  readonly id?: string;
  /** GUID that identifies the guest configuration assignment report under a subscription, resource group. */
  readonly name?: string;
  /** Properties of the guest configuration report. */
  properties?: GuestConfigurationAssignmentReportProperties;
}

export function guestConfigurationAssignmentReportDeserializer(
  item: any,
): GuestConfigurationAssignmentReport {
  return {
    id: item["id"],
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : guestConfigurationAssignmentReportPropertiesDeserializer(item["properties"]),
  };
}

/** Report for the guest configuration assignment. Report contains information such as compliance status, reason, and more. */
export interface GuestConfigurationAssignmentReportProperties {
  /** A value indicating compliance status of the machine for the assigned guest configuration. */
  readonly complianceStatus?: ComplianceStatus;
  /** GUID that identifies the guest configuration assignment report under a subscription, resource group. */
  readonly reportId?: string;
  /** Configuration details of the guest configuration assignment. */
  assignment?: AssignmentInfo;
  /** Information about the VM. */
  vm?: VMInfo;
  /** Start date and time of the guest configuration assignment compliance status check. */
  readonly startTime?: Date;
  /** End date and time of the guest configuration assignment compliance status check. */
  readonly endTime?: Date;
  /** Details of the assignment report. */
  details?: AssignmentReportDetails | null;
  /** Azure resource Id of the VMSS. */
  readonly vmssResourceId?: string;
}

export function guestConfigurationAssignmentReportPropertiesDeserializer(
  item: any,
): GuestConfigurationAssignmentReportProperties {
  return {
    complianceStatus: item["complianceStatus"],
    reportId: item["reportId"],
    assignment: !item["assignment"]
      ? item["assignment"]
      : assignmentInfoDeserializer(item["assignment"]),
    vm: !item["vm"] ? item["vm"] : vmInfoDeserializer(item["vm"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    details: !item["details"]
      ? item["details"]
      : assignmentReportDetailsDeserializer(item["details"]),
    vmssResourceId: item["vmssResourceId"],
  };
}

/** Details of the guest configuration assignment report. */
export interface AssignmentReportDetails {
  /** A value indicating compliance status of the machine for the assigned guest configuration. */
  readonly complianceStatus?: ComplianceStatus;
  /** Start date and time of the guest configuration assignment compliance status check. */
  readonly startTime?: Date;
  /** End date and time of the guest configuration assignment compliance status check. */
  readonly endTime?: Date;
  /** GUID of the report. */
  readonly jobId?: string;
  /** Type of report, Consistency or Initial */
  readonly operationType?: Type;
  /** The list of resources for which guest configuration assignment compliance is checked. */
  resources?: AssignmentReportResource[];
}

export function assignmentReportDetailsDeserializer(item: any): AssignmentReportDetails {
  return {
    complianceStatus: item["complianceStatus"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    jobId: item["jobId"],
    operationType: item["operationType"],
    resources: !item["resources"]
      ? item["resources"]
      : assignmentReportResourceArrayDeserializer(item["resources"]),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-04-05 API version. */
  V20240405 = "2024-04-05",
}
