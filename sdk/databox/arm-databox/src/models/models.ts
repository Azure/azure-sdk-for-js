// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The Mitigate Job captured from request body for Mitigate API */
export interface MitigateJobRequest {
  /** Resolution code for the job */
  customerResolutionCode?: CustomerResolutionCode;
  /** Serial number and the customer resolution code corresponding to each serial number */
  serialNumberCustomerResolutionMap?: Record<string, CustomerResolutionCode>;
}

export function mitigateJobRequestSerializer(item: MitigateJobRequest): any {
  return {
    customerResolutionCode: item["customerResolutionCode"],
    serialNumberCustomerResolutionMap: item["serialNumberCustomerResolutionMap"],
  };
}

/** Resolution code provided by customer. */
export type CustomerResolutionCode =
  "None" | "MoveToCleanUpDevice" | "Resume" | "Restart" | "ReachOutToOperation";

/** model interface ApiError */
export interface ApiError {
  /** The error detail. */
  error: ErrorDetail;
}

export function apiErrorDeserializer(item: any): ApiError {
  return {
    error: errorDetailDeserializer(item["error"]),
  };
}

/** model interface ErrorDetail */
export interface ErrorDetail {
  /** Error code. */
  code: string;
  /** Error message. */
  message: string;
  /** Error target. */
  details?: Details[];
  /** Additional error info. */
  target?: string;
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"] ? item["details"] : detailsArrayDeserializer(item["details"]),
    target: item["target"],
  };
}

export function detailsArrayDeserializer(result: Array<Details>): any[] {
  return result.map((item) => {
    return detailsDeserializer(item);
  });
}

/** model interface Details */
export interface Details {
  /** Error code. */
  code: string;
  /** Error message. */
  message: string;
}

export function detailsDeserializer(item: any): Details {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The paginated list of connected cluster API operations. */
export interface _OperationList {
  /** The list of connected cluster API operations. */
  readonly value?: Operation[];
  /** The link to fetch the next page of connected cluster API operations. */
  nextLink?: string;
}

export function _operationListDeserializer(item: any): _OperationList {
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

/** Operation entity. */
export interface Operation {
  /** Name of the operation. Format: {resourceProviderNamespace}/{resourceType}/{read|write|delete|action} */
  readonly name?: string;
  /** Operation display values. */
  readonly display?: OperationDisplay;
  /** Operation properties. */
  readonly properties?: Record<string, any>;
  /** Origin of the operation. Can be : user|system|user,system */
  readonly origin?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    origin: item["origin"],
    isDataAction: item["isDataAction"],
  };
}

/** Operation display */
export interface OperationDisplay {
  /** Provider name. */
  provider?: string;
  /** Resource name. */
  resource?: string;
  /** Localized name of the operation for display purpose. */
  operation?: string;
  /** Localized description of the operation for display purpose. */
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

/** Job Resource. */
export interface JobResource extends TrackedResource {
  /** The sku type. */
  sku: Sku;
  /** Msi identity of the resource */
  identity?: ResourceIdentity;
  /** Type of the data transfer. */
  transferType: TransferType;
  /** Describes whether the job is cancellable or not. */
  readonly isCancellable?: boolean;
  /** Describes whether the job is deletable or not. */
  readonly isDeletable?: boolean;
  /** Describes whether the shipping address is editable or not. */
  readonly isShippingAddressEditable?: boolean;
  /** The Editable status for Reverse Shipping Address and Contact Info */
  readonly reverseShippingDetailsUpdate?: ReverseShippingDetailsEditStatus;
  /** The Editable status for Reverse Transport preferences */
  readonly reverseTransportPreferenceUpdate?: ReverseTransportPreferenceEditStatus;
  /** Is Prepare To Ship Enabled on this job */
  readonly isPrepareToShipEnabled?: boolean;
  /** Name of the stage which is in progress. */
  readonly status?: StageName;
  /** Name of the stage where delay might be present. */
  readonly delayedStage?: StageName;
  /** Time at which the job was started in UTC ISO 8601 format. */
  readonly startTime?: Date;
  /** Top level error for the job. */
  readonly error?: CloudError;
  /** Details of a job run. This field will only be sent for expand details filter. */
  details?: JobDetailsUnion;
  /** Reason for cancellation. */
  readonly cancellationReason?: string;
  /** Delivery type of Job. */
  deliveryType?: JobDeliveryType;
  /** Delivery Info of Job. */
  deliveryInfo?: JobDeliveryInfo;
  /** Flag to indicate cancellation of scheduled job. */
  readonly isCancellableWithoutFee?: boolean;
  /** Flag to indicate if all devices associated with the job are lost. */
  readonly allDevicesLost?: boolean;
}

export function jobResourceSerializer(item: JobResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _jobResourcePropertiesSerializer(item),
    sku: skuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : resourceIdentitySerializer(item["identity"]),
  };
}

export function jobResourceDeserializer(item: any): JobResource {
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
    ..._jobResourcePropertiesDeserializer(item["properties"]),
    sku: skuDeserializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : resourceIdentityDeserializer(item["identity"]),
  };
}

/** Job Properties */
export interface JobProperties {
  /** Type of the data transfer. */
  transferType: TransferType;
  /** Describes whether the job is cancellable or not. */
  readonly isCancellable?: boolean;
  /** Describes whether the job is deletable or not. */
  readonly isDeletable?: boolean;
  /** Describes whether the shipping address is editable or not. */
  readonly isShippingAddressEditable?: boolean;
  /** The Editable status for Reverse Shipping Address and Contact Info */
  readonly reverseShippingDetailsUpdate?: ReverseShippingDetailsEditStatus;
  /** The Editable status for Reverse Transport preferences */
  readonly reverseTransportPreferenceUpdate?: ReverseTransportPreferenceEditStatus;
  /** Is Prepare To Ship Enabled on this job */
  readonly isPrepareToShipEnabled?: boolean;
  /** Name of the stage which is in progress. */
  readonly status?: StageName;
  /** Name of the stage where delay might be present. */
  readonly delayedStage?: StageName;
  /** Time at which the job was started in UTC ISO 8601 format. */
  readonly startTime?: Date;
  /** Top level error for the job. */
  readonly error?: CloudError;
  /** Details of a job run. This field will only be sent for expand details filter. */
  details?: JobDetailsUnion;
  /** Reason for cancellation. */
  readonly cancellationReason?: string;
  /** Delivery type of Job. */
  deliveryType?: JobDeliveryType;
  /** Delivery Info of Job. */
  deliveryInfo?: JobDeliveryInfo;
  /** Flag to indicate cancellation of scheduled job. */
  readonly isCancellableWithoutFee?: boolean;
  /** Flag to indicate if all devices associated with the job are lost. */
  readonly allDevicesLost?: boolean;
}

export function jobPropertiesSerializer(item: JobProperties): any {
  return {
    transferType: item["transferType"],
    details: !item["details"] ? item["details"] : jobDetailsUnionSerializer(item["details"]),
    deliveryType: item["deliveryType"],
    deliveryInfo: !item["deliveryInfo"]
      ? item["deliveryInfo"]
      : jobDeliveryInfoSerializer(item["deliveryInfo"]),
  };
}

export function jobPropertiesDeserializer(item: any): JobProperties {
  return {
    transferType: item["transferType"],
    isCancellable: item["isCancellable"],
    isDeletable: item["isDeletable"],
    isShippingAddressEditable: item["isShippingAddressEditable"],
    reverseShippingDetailsUpdate: item["reverseShippingDetailsUpdate"],
    reverseTransportPreferenceUpdate: item["reverseTransportPreferenceUpdate"],
    isPrepareToShipEnabled: item["isPrepareToShipEnabled"],
    status: item["status"],
    delayedStage: item["delayedStage"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    details: !item["details"] ? item["details"] : jobDetailsUnionDeserializer(item["details"]),
    cancellationReason: item["cancellationReason"],
    deliveryType: item["deliveryType"],
    deliveryInfo: !item["deliveryInfo"]
      ? item["deliveryInfo"]
      : jobDeliveryInfoDeserializer(item["deliveryInfo"]),
    isCancellableWithoutFee: item["isCancellableWithoutFee"],
    allDevicesLost: item["allDevicesLost"],
  };
}

/** Type of the transfer. */
export type TransferType = "ImportToAzure" | "ExportFromAzure";
/** The Editable status for Reverse Shipping Address and Contact Info */
export type ReverseShippingDetailsEditStatus = "Enabled" | "Disabled" | "NotSupported";
/** The Editable status for Reverse Transport preferences */
export type ReverseTransportPreferenceEditStatus = "Enabled" | "Disabled" | "NotSupported";

/** Name of the stage which is in progress. */
export enum KnownStageName {
  /** An order has been created. */
  DeviceOrdered = "DeviceOrdered",
  /** A device has been prepared for the order. */
  DevicePrepared = "DevicePrepared",
  /** Device has been dispatched to the user of the order. */
  Dispatched = "Dispatched",
  /** Device has been delivered to the user of the order. */
  Delivered = "Delivered",
  /** Device has been picked up from user and in transit to Azure datacenter. */
  PickedUp = "PickedUp",
  /** Device has been received at Azure datacenter from the user. */
  AtAzureDC = "AtAzureDC",
  /** Data copy from the device at Azure datacenter. */
  DataCopy = "DataCopy",
  /** Order has completed. */
  Completed = "Completed",
  /** Order has completed with errors. */
  CompletedWithErrors = "CompletedWithErrors",
  /** Order has been cancelled. */
  Cancelled = "Cancelled",
  /** Order has failed due to issue reported by user. */
  FailedIssueReportedAtCustomer = "Failed_IssueReportedAtCustomer",
  /** Order has failed due to issue detected at Azure datacenter. */
  FailedIssueDetectedAtAzureDC = "Failed_IssueDetectedAtAzureDC",
  /** Order has been aborted. */
  Aborted = "Aborted",
  /** Order has completed with warnings. */
  CompletedWithWarnings = "CompletedWithWarnings",
  /** Device is ready to be handed to customer from Azure DC. */
  ReadyToDispatchFromAzureDC = "ReadyToDispatchFromAzureDC",
  /** Device can be dropped off at Azure DC. */
  ReadyToReceiveAtAzureDC = "ReadyToReceiveAtAzureDC",
  /** Job created by the customer. */
  Created = "Created",
  /** User shipped the device to AzureDC. */
  ShippedToAzureDC = "ShippedToAzureDC",
  /** Awaiting shipment details of device from customer. */
  AwaitingShipmentDetails = "AwaitingShipmentDetails",
  /** Preparing the device to ship to customer. */
  PreparingToShipFromAzureDC = "PreparingToShipFromAzureDC",
  /** Shipped the device to customer. */
  ShippedToCustomer = "ShippedToCustomer",
}

/**
 * Name of the stage which is in progress. \
 * {@link KnownStageName} can be used interchangeably with StageName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DeviceOrdered**: An order has been created. \
 * **DevicePrepared**: A device has been prepared for the order. \
 * **Dispatched**: Device has been dispatched to the user of the order. \
 * **Delivered**: Device has been delivered to the user of the order. \
 * **PickedUp**: Device has been picked up from user and in transit to Azure datacenter. \
 * **AtAzureDC**: Device has been received at Azure datacenter from the user. \
 * **DataCopy**: Data copy from the device at Azure datacenter. \
 * **Completed**: Order has completed. \
 * **CompletedWithErrors**: Order has completed with errors. \
 * **Cancelled**: Order has been cancelled. \
 * **Failed_IssueReportedAtCustomer**: Order has failed due to issue reported by user. \
 * **Failed_IssueDetectedAtAzureDC**: Order has failed due to issue detected at Azure datacenter. \
 * **Aborted**: Order has been aborted. \
 * **CompletedWithWarnings**: Order has completed with warnings. \
 * **ReadyToDispatchFromAzureDC**: Device is ready to be handed to customer from Azure DC. \
 * **ReadyToReceiveAtAzureDC**: Device can be dropped off at Azure DC. \
 * **Created**: Job created by the customer. \
 * **ShippedToAzureDC**: User shipped the device to AzureDC. \
 * **AwaitingShipmentDetails**: Awaiting shipment details of device from customer. \
 * **PreparingToShipFromAzureDC**: Preparing the device to ship to customer. \
 * **ShippedToCustomer**: Shipped the device to customer.
 */
export type StageName = string;

/** Provides additional information about an http error response. */
export interface CloudError {
  /** Gets or sets additional error info. */
  readonly additionalInfo?: AdditionalErrorInfo[];
  /** Error code. */
  code?: string;
  /** Gets or sets details for the error. */
  readonly details?: CloudError[];
  /** The error message parsed from the body of the http error response. */
  message?: string;
  /** Gets or sets the target of the error. */
  target?: string;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : additionalErrorInfoArrayDeserializer(item["additionalInfo"]),
    code: item["code"],
    details: !item["details"] ? item["details"] : cloudErrorArrayDeserializer(item["details"]),
    message: item["message"],
    target: item["target"],
  };
}

export function additionalErrorInfoArrayDeserializer(result: Array<AdditionalErrorInfo>): any[] {
  return result.map((item) => {
    return additionalErrorInfoDeserializer(item);
  });
}

/** This class represents additional info which Resource Providers pass when an error occurs. */
export interface AdditionalErrorInfo {
  /** Additional information of the type of error. */
  info?: Record<string, any>;
  /** Type of error (e.g. CustomerIntervention, PolicyViolation, SecurityViolation). */
  type?: string;
}

export function additionalErrorInfoDeserializer(item: any): AdditionalErrorInfo {
  return {
    info: !item["info"]
      ? item["info"]
      : Object.fromEntries(Object.entries(item["info"]).map(([k, p]: [string, any]) => [k, p])),
    type: item["type"],
  };
}

export function cloudErrorArrayDeserializer(result: Array<CloudError>): any[] {
  return result.map((item) => {
    return cloudErrorDeserializer(item);
  });
}

/** Job details. */
export interface JobDetails {
  /** List of stages that run in the job. */
  readonly jobStages?: JobStages[];
  /** Contact details for notification and shipping. */
  contactDetails: ContactDetails;
  /** Shipping address of the customer. */
  shippingAddress?: ShippingAddress;
  /** Delivery package shipping details. */
  readonly deliveryPackage?: PackageShippingDetails;
  /** Return package shipping details. */
  readonly returnPackage?: PackageShippingDetails;
  /** Details of the data to be imported into azure. */
  dataImportDetails?: DataImportDetails[];
  /** Details of the data to be exported from azure. */
  dataExportDetails?: DataExportDetails[];
  /** Indicates the type of job details. */
  /** The discriminator possible values: DataBoxCustomerDisk, DataBoxDisk, DataBoxHeavy, DataBox */
  jobDetailsType: ClassDiscriminator;
  /** Preferences for the order. */
  preferences?: Preferences;
  /** Optional Reverse Shipping details for order. */
  reverseShippingDetails?: ReverseShippingDetails;
  /** List of copy log details. */
  readonly copyLogDetails?: CopyLogDetailsUnion[];
  /** Shared access key to download the return shipment label */
  readonly reverseShipmentLabelSasKey?: string;
  /** Shared access key to download the chain of custody logs */
  readonly chainOfCustodySasKey?: string;
  /** Holds device data erasure details */
  readonly deviceErasureDetails?: DeviceErasureDetails;
  /** Details about which key encryption type is being used. */
  keyEncryptionKey?: KeyEncryptionKey;
  /** The expected size of the data, which needs to be transferred in this job, in terabytes. */
  expectedDataSizeInTeraBytes?: number;
  /** Available actions on the job. */
  readonly actions?: CustomerResolutionCode[];
  /** Last mitigation action performed on the job. */
  readonly lastMitigationActionOnJob?: LastMitigationActionOnJob;
  /** Datacenter address to ship to, for the given sku and storage location. */
  readonly datacenterAddress?: DatacenterAddressResponseUnion;
  /** DataCenter code. */
  readonly dataCenterCode?: DataCenterCode;
}

export function jobDetailsSerializer(item: JobDetails): any {
  return {
    contactDetails: contactDetailsSerializer(item["contactDetails"]),
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : shippingAddressSerializer(item["shippingAddress"]),
    dataImportDetails: !item["dataImportDetails"]
      ? item["dataImportDetails"]
      : dataImportDetailsArraySerializer(item["dataImportDetails"]),
    dataExportDetails: !item["dataExportDetails"]
      ? item["dataExportDetails"]
      : dataExportDetailsArraySerializer(item["dataExportDetails"]),
    jobDetailsType: item["jobDetailsType"],
    preferences: !item["preferences"]
      ? item["preferences"]
      : preferencesSerializer(item["preferences"]),
    reverseShippingDetails: !item["reverseShippingDetails"]
      ? item["reverseShippingDetails"]
      : reverseShippingDetailsSerializer(item["reverseShippingDetails"]),
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyEncryptionKeySerializer(item["keyEncryptionKey"]),
    expectedDataSizeInTeraBytes: item["expectedDataSizeInTeraBytes"],
  };
}

export function jobDetailsDeserializer(item: any): JobDetails {
  return {
    jobStages: !item["jobStages"]
      ? item["jobStages"]
      : jobStagesArrayDeserializer(item["jobStages"]),
    contactDetails: contactDetailsDeserializer(item["contactDetails"]),
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : shippingAddressDeserializer(item["shippingAddress"]),
    deliveryPackage: !item["deliveryPackage"]
      ? item["deliveryPackage"]
      : packageShippingDetailsDeserializer(item["deliveryPackage"]),
    returnPackage: !item["returnPackage"]
      ? item["returnPackage"]
      : packageShippingDetailsDeserializer(item["returnPackage"]),
    dataImportDetails: !item["dataImportDetails"]
      ? item["dataImportDetails"]
      : dataImportDetailsArrayDeserializer(item["dataImportDetails"]),
    dataExportDetails: !item["dataExportDetails"]
      ? item["dataExportDetails"]
      : dataExportDetailsArrayDeserializer(item["dataExportDetails"]),
    jobDetailsType: item["jobDetailsType"],
    preferences: !item["preferences"]
      ? item["preferences"]
      : preferencesDeserializer(item["preferences"]),
    reverseShippingDetails: !item["reverseShippingDetails"]
      ? item["reverseShippingDetails"]
      : reverseShippingDetailsDeserializer(item["reverseShippingDetails"]),
    copyLogDetails: !item["copyLogDetails"]
      ? item["copyLogDetails"]
      : copyLogDetailsUnionArrayDeserializer(item["copyLogDetails"]),
    reverseShipmentLabelSasKey: item["reverseShipmentLabelSasKey"],
    chainOfCustodySasKey: item["chainOfCustodySasKey"],
    deviceErasureDetails: !item["deviceErasureDetails"]
      ? item["deviceErasureDetails"]
      : deviceErasureDetailsDeserializer(item["deviceErasureDetails"]),
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyEncryptionKeyDeserializer(item["keyEncryptionKey"]),
    expectedDataSizeInTeraBytes: item["expectedDataSizeInTeraBytes"],
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    lastMitigationActionOnJob: !item["lastMitigationActionOnJob"]
      ? item["lastMitigationActionOnJob"]
      : lastMitigationActionOnJobDeserializer(item["lastMitigationActionOnJob"]),
    datacenterAddress: !item["datacenterAddress"]
      ? item["datacenterAddress"]
      : datacenterAddressResponseUnionDeserializer(item["datacenterAddress"]),
    dataCenterCode: item["dataCenterCode"],
  };
}

/** Alias for JobDetailsUnion */
export type JobDetailsUnion =
  | DataBoxCustomerDiskJobDetails
  | DataBoxDiskJobDetails
  | DataBoxHeavyJobDetails
  | DataBoxJobDetails
  | JobDetails;

export function jobDetailsUnionSerializer(item: JobDetailsUnion): any {
  switch (item.jobDetailsType) {
    case "DataBoxCustomerDisk":
      return dataBoxCustomerDiskJobDetailsSerializer(item as DataBoxCustomerDiskJobDetails);

    case "DataBoxDisk":
      return dataBoxDiskJobDetailsSerializer(item as DataBoxDiskJobDetails);

    case "DataBoxHeavy":
      return dataBoxHeavyJobDetailsSerializer(item as DataBoxHeavyJobDetails);

    case "DataBox":
      return dataBoxJobDetailsSerializer(item as DataBoxJobDetails);

    default:
      return jobDetailsSerializer(item);
  }
}

export function jobDetailsUnionDeserializer(item: any): JobDetailsUnion {
  switch (item["jobDetailsType"]) {
    case "DataBoxCustomerDisk":
      return dataBoxCustomerDiskJobDetailsDeserializer(item as DataBoxCustomerDiskJobDetails);

    case "DataBoxDisk":
      return dataBoxDiskJobDetailsDeserializer(item as DataBoxDiskJobDetails);

    case "DataBoxHeavy":
      return dataBoxHeavyJobDetailsDeserializer(item as DataBoxHeavyJobDetails);

    case "DataBox":
      return dataBoxJobDetailsDeserializer(item as DataBoxJobDetails);

    default:
      return jobDetailsDeserializer(item);
  }
}

export function jobStagesArrayDeserializer(result: Array<JobStages>): any[] {
  return result.map((item) => {
    return jobStagesDeserializer(item);
  });
}

/** Job stages. */
export interface JobStages {
  /** Name of the job stage. */
  readonly stageName?: StageName;
  /** Display name of the job stage. */
  readonly displayName?: string;
  /** Status of the job stage. */
  readonly stageStatus?: StageStatus;
  /** Time for the job stage in UTC ISO 8601 format. */
  readonly stageTime?: Date;
  /** Job Stage Details */
  readonly jobStageDetails?: any;
  /** Delay information for the job stages. */
  readonly delayInformation?: JobDelayDetails[];
}

export function jobStagesDeserializer(item: any): JobStages {
  return {
    stageName: item["stageName"],
    displayName: item["displayName"],
    stageStatus: item["stageStatus"],
    stageTime: !item["stageTime"] ? item["stageTime"] : new Date(item["stageTime"]),
    jobStageDetails: item["jobStageDetails"],
    delayInformation: !item["delayInformation"]
      ? item["delayInformation"]
      : jobDelayDetailsArrayDeserializer(item["delayInformation"]),
  };
}

/** Holds the device erasure completion status */
export type StageStatus =
  | "None"
  | "InProgress"
  | "Succeeded"
  | "Failed"
  | "Cancelled"
  | "Cancelling"
  | "SucceededWithErrors"
  | "WaitingForCustomerAction"
  | "SucceededWithWarnings"
  | "WaitingForCustomerActionForKek"
  | "WaitingForCustomerActionForCleanUp"
  | "CustomerActionPerformedForCleanUp"
  | "CustomerActionPerformed";

export function jobDelayDetailsArrayDeserializer(result: Array<JobDelayDetails>): any[] {
  return result.map((item) => {
    return jobDelayDetailsDeserializer(item);
  });
}

/** Job Delay Notification details */
export interface JobDelayDetails {
  /** Status of notification */
  readonly status?: DelayNotificationStatus;
  /** Delay Error code */
  readonly errorCode?: PortalDelayErrorCode;
  /** Description of the delay. */
  readonly description?: string;
  /** Timestamp when the delay notification was created. */
  readonly startTime?: Date;
  /** Timestamp when the delay notification was resolved. */
  readonly resolutionTime?: Date;
}

export function jobDelayDetailsDeserializer(item: any): JobDelayDetails {
  return {
    status: item["status"],
    errorCode: item["errorCode"],
    description: item["description"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    resolutionTime: !item["resolutionTime"]
      ? item["resolutionTime"]
      : new Date(item["resolutionTime"]),
  };
}

/** Status of notification */
export enum KnownDelayNotificationStatus {
  /** Delay is still active */
  Active = "Active",
  /** Delay has been resolved */
  Resolved = "Resolved",
}

/**
 * Status of notification \
 * {@link KnownDelayNotificationStatus} can be used interchangeably with DelayNotificationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Delay is still active \
 * **Resolved**: Delay has been resolved
 */
export type DelayNotificationStatus = string;

/** Delay Error code */
export enum KnownPortalDelayErrorCode {
  /** Delay due to any internal reasons */
  InternalIssueDelay = "InternalIssueDelay",
  /** Active Order limit breached. */
  ActiveOrderLimitBreachedDelay = "ActiveOrderLimitBreachedDelay",
  /** High demand */
  HighDemandDelay = "HighDemandDelay",
  /** Slow copy due to large number of files */
  LargeNumberOfFilesDelay = "LargeNumberOfFilesDelay",
}

/**
 * Delay Error code \
 * {@link KnownPortalDelayErrorCode} can be used interchangeably with PortalDelayErrorCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InternalIssueDelay**: Delay due to any internal reasons \
 * **ActiveOrderLimitBreachedDelay**: Active Order limit breached. \
 * **HighDemandDelay**: High demand \
 * **LargeNumberOfFilesDelay**: Slow copy due to large number of files
 */
export type PortalDelayErrorCode = string;

/** Contact Details. */
export interface ContactDetails {
  /** Contact name of the person. */
  contactName: string;
  /** Phone number of the contact person. */
  phone: string;
  /** Phone extension number of the contact person. */
  phoneExtension?: string;
  /** Mobile number of the contact person. */
  mobile?: string;
  /** List of Email-ids to be notified about job progress. */
  emailList: string[];
  /** Notification preference for a job stage. */
  notificationPreference?: NotificationPreference[];
}

export function contactDetailsSerializer(item: ContactDetails): any {
  return {
    contactName: item["contactName"],
    phone: item["phone"],
    phoneExtension: item["phoneExtension"],
    mobile: item["mobile"],
    emailList: item["emailList"].map((p: any) => {
      return p;
    }),
    notificationPreference: !item["notificationPreference"]
      ? item["notificationPreference"]
      : notificationPreferenceArraySerializer(item["notificationPreference"]),
  };
}

export function contactDetailsDeserializer(item: any): ContactDetails {
  return {
    contactName: item["contactName"],
    phone: item["phone"],
    phoneExtension: item["phoneExtension"],
    mobile: item["mobile"],
    emailList: item["emailList"].map((p: any) => {
      return p;
    }),
    notificationPreference: !item["notificationPreference"]
      ? item["notificationPreference"]
      : notificationPreferenceArrayDeserializer(item["notificationPreference"]),
  };
}

export function notificationPreferenceArraySerializer(
  result: Array<NotificationPreference>,
): any[] {
  return result.map((item) => {
    return notificationPreferenceSerializer(item);
  });
}

export function notificationPreferenceArrayDeserializer(
  result: Array<NotificationPreference>,
): any[] {
  return result.map((item) => {
    return notificationPreferenceDeserializer(item);
  });
}

/** Notification preference for a job stage. */
export interface NotificationPreference {
  /** Name of the stage. */
  stageName: NotificationStageName;
  /** Notification is required or not. */
  sendNotification: boolean;
}

export function notificationPreferenceSerializer(item: NotificationPreference): any {
  return { stageName: item["stageName"], sendNotification: item["sendNotification"] };
}

export function notificationPreferenceDeserializer(item: any): NotificationPreference {
  return {
    stageName: item["stageName"],
    sendNotification: item["sendNotification"],
  };
}

/** Name of the stage. */
export enum KnownNotificationStageName {
  /** Notification at device prepared stage. */
  DevicePrepared = "DevicePrepared",
  /** Notification at device dispatched stage. */
  Dispatched = "Dispatched",
  /** Notification at device delivered stage. */
  Delivered = "Delivered",
  /** Notification at device picked up from user stage. */
  PickedUp = "PickedUp",
  /** Notification at device received at Azure datacenter stage. */
  AtAzureDC = "AtAzureDC",
  /** Notification at data copy started stage. */
  DataCopy = "DataCopy",
  /** Notification at job created stage. */
  Created = "Created",
  /** Notification at shipped devices to customer stage. */
  ShippedToCustomer = "ShippedToCustomer",
}

/**
 * Name of the stage. \
 * {@link KnownNotificationStageName} can be used interchangeably with NotificationStageName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DevicePrepared**: Notification at device prepared stage. \
 * **Dispatched**: Notification at device dispatched stage. \
 * **Delivered**: Notification at device delivered stage. \
 * **PickedUp**: Notification at device picked up from user stage. \
 * **AtAzureDC**: Notification at device received at Azure datacenter stage. \
 * **DataCopy**: Notification at data copy started stage. \
 * **Created**: Notification at job created stage. \
 * **ShippedToCustomer**: Notification at shipped devices to customer stage.
 */
export type NotificationStageName = string;

/** Shipping address where customer wishes to receive the device. */
export interface ShippingAddress {
  /** Street Address line 1. */
  streetAddress1: string;
  /** Street Address line 2. */
  streetAddress2?: string;
  /** Street Address line 3. */
  streetAddress3?: string;
  /** Name of the City. */
  city?: string;
  /** Name of the State or Province. */
  stateOrProvince?: string;
  /** Name of the Country. */
  country: string;
  /** Postal code. */
  postalCode?: string;
  /** Extended Zip Code. */
  zipExtendedCode?: string;
  /** Name of the company. */
  companyName?: string;
  /** Type of address. */
  addressType?: AddressType;
  /** Flag to indicate if customer has chosen to skip default address validation */
  skipAddressValidation?: boolean;
  /** Tax Identification Number */
  taxIdentificationNumber?: string;
}

export function shippingAddressSerializer(item: ShippingAddress): any {
  return {
    streetAddress1: item["streetAddress1"],
    streetAddress2: item["streetAddress2"],
    streetAddress3: item["streetAddress3"],
    city: item["city"],
    stateOrProvince: item["stateOrProvince"],
    country: item["country"],
    postalCode: item["postalCode"],
    zipExtendedCode: item["zipExtendedCode"],
    companyName: item["companyName"],
    addressType: item["addressType"],
    skipAddressValidation: item["skipAddressValidation"],
    taxIdentificationNumber: item["taxIdentificationNumber"],
  };
}

export function shippingAddressDeserializer(item: any): ShippingAddress {
  return {
    streetAddress1: item["streetAddress1"],
    streetAddress2: item["streetAddress2"],
    streetAddress3: item["streetAddress3"],
    city: item["city"],
    stateOrProvince: item["stateOrProvince"],
    country: item["country"],
    postalCode: item["postalCode"],
    zipExtendedCode: item["zipExtendedCode"],
    companyName: item["companyName"],
    addressType: item["addressType"],
    skipAddressValidation: item["skipAddressValidation"],
    taxIdentificationNumber: item["taxIdentificationNumber"],
  };
}

/** Type of address. */
export type AddressType = "None" | "Residential" | "Commercial";

/** package shipping details */
export interface PackageShippingDetails {
  /** Url where shipment can be tracked. */
  readonly trackingUrl?: string;
  /** Name of the carrier. */
  readonly carrierName?: string;
  /** Tracking Id of shipment. */
  readonly trackingId?: string;
}

export function packageShippingDetailsDeserializer(item: any): PackageShippingDetails {
  return {
    trackingUrl: item["trackingUrl"],
    carrierName: item["carrierName"],
    trackingId: item["trackingId"],
  };
}

export function dataImportDetailsArraySerializer(result: Array<DataImportDetails>): any[] {
  return result.map((item) => {
    return dataImportDetailsSerializer(item);
  });
}

export function dataImportDetailsArrayDeserializer(result: Array<DataImportDetails>): any[] {
  return result.map((item) => {
    return dataImportDetailsDeserializer(item);
  });
}

/** Details of the data to be used for importing data to azure. */
export interface DataImportDetails {
  /** Account details of the data to be transferred */
  accountDetails: DataAccountDetailsUnion;
  /** Level of the logs to be collected. */
  logCollectionLevel?: LogCollectionLevel;
}

export function dataImportDetailsSerializer(item: DataImportDetails): any {
  return {
    accountDetails: dataAccountDetailsUnionSerializer(item["accountDetails"]),
    logCollectionLevel: item["logCollectionLevel"],
  };
}

export function dataImportDetailsDeserializer(item: any): DataImportDetails {
  return {
    accountDetails: dataAccountDetailsUnionDeserializer(item["accountDetails"]),
    logCollectionLevel: item["logCollectionLevel"],
  };
}

/** Account details of the data to be transferred */
export interface DataAccountDetails {
  /** Account Type of the data to be transferred. */
  /** The discriminator possible values: ManagedDisk, StorageAccount */
  dataAccountType: DataAccountType;
  /** Password for all the shares to be created on the device. Should not be passed for TransferType:ExportFromAzure jobs. If this is not passed, the service will generate password itself. This will not be returned in Get Call. Password Requirements :  Password must be minimum of 12 and maximum of 64 characters. Password must have at least one uppercase alphabet, one number and one special character. Password cannot have the following characters : IilLoO0 Password can have only alphabets, numbers and these characters : @#\-$%^!+=;:_()]+ */
  sharePassword?: string;
}

export function dataAccountDetailsSerializer(item: DataAccountDetails): any {
  return { dataAccountType: item["dataAccountType"], sharePassword: item["sharePassword"] };
}

export function dataAccountDetailsDeserializer(item: any): DataAccountDetails {
  return {
    dataAccountType: item["dataAccountType"],
    sharePassword: item["sharePassword"],
  };
}

/** Alias for DataAccountDetailsUnion */
export type DataAccountDetailsUnion =
  ManagedDiskDetails | StorageAccountDetails | DataAccountDetails;

export function dataAccountDetailsUnionSerializer(item: DataAccountDetailsUnion): any {
  switch (item.dataAccountType) {
    case "ManagedDisk":
      return managedDiskDetailsSerializer(item as ManagedDiskDetails);

    case "StorageAccount":
      return storageAccountDetailsSerializer(item as StorageAccountDetails);

    default:
      return dataAccountDetailsSerializer(item);
  }
}

export function dataAccountDetailsUnionDeserializer(item: any): DataAccountDetailsUnion {
  switch (item["dataAccountType"]) {
    case "ManagedDisk":
      return managedDiskDetailsDeserializer(item as ManagedDiskDetails);

    case "StorageAccount":
      return storageAccountDetailsDeserializer(item as StorageAccountDetails);

    default:
      return dataAccountDetailsDeserializer(item);
  }
}

/** Type of the account. */
export type DataAccountType = "StorageAccount" | "ManagedDisk";

/** Details of the managed disks. */
export interface ManagedDiskDetails extends DataAccountDetails {
  /** Resource Group Id of the compute disks. */
  resourceGroupId: string;
  /** Resource Id of the storage account that can be used to copy the vhd for staging. */
  stagingStorageAccountId: string;
  /** Account Type of the data to be transferred. */
  dataAccountType: "ManagedDisk";
}

export function managedDiskDetailsSerializer(item: ManagedDiskDetails): any {
  return {
    dataAccountType: item["dataAccountType"],
    sharePassword: item["sharePassword"],
    resourceGroupId: item["resourceGroupId"],
    stagingStorageAccountId: item["stagingStorageAccountId"],
  };
}

export function managedDiskDetailsDeserializer(item: any): ManagedDiskDetails {
  return {
    dataAccountType: item["dataAccountType"],
    sharePassword: item["sharePassword"],
    resourceGroupId: item["resourceGroupId"],
    stagingStorageAccountId: item["stagingStorageAccountId"],
  };
}

/** Details for the storage account. */
export interface StorageAccountDetails extends DataAccountDetails {
  /** Storage Account Resource Id. */
  storageAccountId: string;
  /** Account Type of the data to be transferred. */
  dataAccountType: "StorageAccount";
}

export function storageAccountDetailsSerializer(item: StorageAccountDetails): any {
  return {
    dataAccountType: item["dataAccountType"],
    sharePassword: item["sharePassword"],
    storageAccountId: item["storageAccountId"],
  };
}

export function storageAccountDetailsDeserializer(item: any): StorageAccountDetails {
  return {
    dataAccountType: item["dataAccountType"],
    sharePassword: item["sharePassword"],
    storageAccountId: item["storageAccountId"],
  };
}

/** Level of the logs to be collected. */
export type LogCollectionLevel = "Error" | "Verbose";

export function dataExportDetailsArraySerializer(result: Array<DataExportDetails>): any[] {
  return result.map((item) => {
    return dataExportDetailsSerializer(item);
  });
}

export function dataExportDetailsArrayDeserializer(result: Array<DataExportDetails>): any[] {
  return result.map((item) => {
    return dataExportDetailsDeserializer(item);
  });
}

/** Details of the data to be used for exporting data from azure. */
export interface DataExportDetails {
  /** Configuration for the data transfer. */
  transferConfiguration: TransferConfiguration;
  /** Level of the logs to be collected. */
  logCollectionLevel?: LogCollectionLevel;
  /** Account details of the data to be transferred */
  accountDetails: DataAccountDetailsUnion;
}

export function dataExportDetailsSerializer(item: DataExportDetails): any {
  return {
    transferConfiguration: transferConfigurationSerializer(item["transferConfiguration"]),
    logCollectionLevel: item["logCollectionLevel"],
    accountDetails: dataAccountDetailsUnionSerializer(item["accountDetails"]),
  };
}

export function dataExportDetailsDeserializer(item: any): DataExportDetails {
  return {
    transferConfiguration: transferConfigurationDeserializer(item["transferConfiguration"]),
    logCollectionLevel: item["logCollectionLevel"],
    accountDetails: dataAccountDetailsUnionDeserializer(item["accountDetails"]),
  };
}

/** Configuration for defining the transfer of data. */
export interface TransferConfiguration {
  /** Type of the configuration for transfer. */
  transferConfigurationType: TransferConfigurationType;
  /** Map of filter type and the details to filter. This field is required only if the TransferConfigurationType is given as TransferUsingFilter. */
  transferFilterDetails?: TransferConfigurationTransferFilterDetails;
  /** Map of filter type and the details to transfer all data. This field is required only if the TransferConfigurationType is given as TransferAll */
  transferAllDetails?: TransferConfigurationTransferAllDetails;
}

export function transferConfigurationSerializer(item: TransferConfiguration): any {
  return {
    transferConfigurationType: item["transferConfigurationType"],
    transferFilterDetails: !item["transferFilterDetails"]
      ? item["transferFilterDetails"]
      : transferConfigurationTransferFilterDetailsSerializer(item["transferFilterDetails"]),
    transferAllDetails: !item["transferAllDetails"]
      ? item["transferAllDetails"]
      : transferConfigurationTransferAllDetailsSerializer(item["transferAllDetails"]),
  };
}

export function transferConfigurationDeserializer(item: any): TransferConfiguration {
  return {
    transferConfigurationType: item["transferConfigurationType"],
    transferFilterDetails: !item["transferFilterDetails"]
      ? item["transferFilterDetails"]
      : transferConfigurationTransferFilterDetailsDeserializer(item["transferFilterDetails"]),
    transferAllDetails: !item["transferAllDetails"]
      ? item["transferAllDetails"]
      : transferConfigurationTransferAllDetailsDeserializer(item["transferAllDetails"]),
  };
}

/** Type of the configuration for transfer. */
export type TransferConfigurationType = "TransferAll" | "TransferUsingFilter";

/** Map of filter type and the details to filter. This field is required only if the TransferConfigurationType is given as TransferUsingFilter. */
export interface TransferConfigurationTransferFilterDetails {
  /** Details of the filtering the transfer of data. */
  include?: TransferFilterDetails;
}

export function transferConfigurationTransferFilterDetailsSerializer(
  item: TransferConfigurationTransferFilterDetails,
): any {
  return {
    include: !item["include"] ? item["include"] : transferFilterDetailsSerializer(item["include"]),
  };
}

export function transferConfigurationTransferFilterDetailsDeserializer(
  item: any,
): TransferConfigurationTransferFilterDetails {
  return {
    include: !item["include"]
      ? item["include"]
      : transferFilterDetailsDeserializer(item["include"]),
  };
}

/** Details of the filtering the transfer of data. */
export interface TransferFilterDetails {
  /** Type of the account of data. */
  dataAccountType: DataAccountType;
  /** Filter details to transfer blobs. */
  blobFilterDetails?: BlobFilterDetails;
  /** Filter details to transfer Azure files. */
  azureFileFilterDetails?: AzureFileFilterDetails;
  /** Details of the filter files to be used for data transfer. */
  filterFileDetails?: FilterFileDetails[];
}

export function transferFilterDetailsSerializer(item: TransferFilterDetails): any {
  return {
    dataAccountType: item["dataAccountType"],
    blobFilterDetails: !item["blobFilterDetails"]
      ? item["blobFilterDetails"]
      : blobFilterDetailsSerializer(item["blobFilterDetails"]),
    azureFileFilterDetails: !item["azureFileFilterDetails"]
      ? item["azureFileFilterDetails"]
      : azureFileFilterDetailsSerializer(item["azureFileFilterDetails"]),
    filterFileDetails: !item["filterFileDetails"]
      ? item["filterFileDetails"]
      : filterFileDetailsArraySerializer(item["filterFileDetails"]),
  };
}

export function transferFilterDetailsDeserializer(item: any): TransferFilterDetails {
  return {
    dataAccountType: item["dataAccountType"],
    blobFilterDetails: !item["blobFilterDetails"]
      ? item["blobFilterDetails"]
      : blobFilterDetailsDeserializer(item["blobFilterDetails"]),
    azureFileFilterDetails: !item["azureFileFilterDetails"]
      ? item["azureFileFilterDetails"]
      : azureFileFilterDetailsDeserializer(item["azureFileFilterDetails"]),
    filterFileDetails: !item["filterFileDetails"]
      ? item["filterFileDetails"]
      : filterFileDetailsArrayDeserializer(item["filterFileDetails"]),
  };
}

/** Filter details to transfer Azure Blobs */
export interface BlobFilterDetails {
  /** Prefix list of the Azure blobs to be transferred. */
  blobPrefixList?: string[];
  /** List of full path of the blobs to be transferred. */
  blobPathList?: string[];
  /** List of blob containers to be transferred. */
  containerList?: string[];
}

export function blobFilterDetailsSerializer(item: BlobFilterDetails): any {
  return {
    blobPrefixList: !item["blobPrefixList"]
      ? item["blobPrefixList"]
      : item["blobPrefixList"].map((p: any) => {
          return p;
        }),
    blobPathList: !item["blobPathList"]
      ? item["blobPathList"]
      : item["blobPathList"].map((p: any) => {
          return p;
        }),
    containerList: !item["containerList"]
      ? item["containerList"]
      : item["containerList"].map((p: any) => {
          return p;
        }),
  };
}

export function blobFilterDetailsDeserializer(item: any): BlobFilterDetails {
  return {
    blobPrefixList: !item["blobPrefixList"]
      ? item["blobPrefixList"]
      : item["blobPrefixList"].map((p: any) => {
          return p;
        }),
    blobPathList: !item["blobPathList"]
      ? item["blobPathList"]
      : item["blobPathList"].map((p: any) => {
          return p;
        }),
    containerList: !item["containerList"]
      ? item["containerList"]
      : item["containerList"].map((p: any) => {
          return p;
        }),
  };
}

/** Filter details to transfer Azure files */
export interface AzureFileFilterDetails {
  /** Prefix list of the Azure files to be transferred. */
  filePrefixList?: string[];
  /** List of full path of the files to be transferred. */
  filePathList?: string[];
  /** List of file shares to be transferred. */
  fileShareList?: string[];
}

export function azureFileFilterDetailsSerializer(item: AzureFileFilterDetails): any {
  return {
    filePrefixList: !item["filePrefixList"]
      ? item["filePrefixList"]
      : item["filePrefixList"].map((p: any) => {
          return p;
        }),
    filePathList: !item["filePathList"]
      ? item["filePathList"]
      : item["filePathList"].map((p: any) => {
          return p;
        }),
    fileShareList: !item["fileShareList"]
      ? item["fileShareList"]
      : item["fileShareList"].map((p: any) => {
          return p;
        }),
  };
}

export function azureFileFilterDetailsDeserializer(item: any): AzureFileFilterDetails {
  return {
    filePrefixList: !item["filePrefixList"]
      ? item["filePrefixList"]
      : item["filePrefixList"].map((p: any) => {
          return p;
        }),
    filePathList: !item["filePathList"]
      ? item["filePathList"]
      : item["filePathList"].map((p: any) => {
          return p;
        }),
    fileShareList: !item["fileShareList"]
      ? item["fileShareList"]
      : item["fileShareList"].map((p: any) => {
          return p;
        }),
  };
}

export function filterFileDetailsArraySerializer(result: Array<FilterFileDetails>): any[] {
  return result.map((item) => {
    return filterFileDetailsSerializer(item);
  });
}

export function filterFileDetailsArrayDeserializer(result: Array<FilterFileDetails>): any[] {
  return result.map((item) => {
    return filterFileDetailsDeserializer(item);
  });
}

/** Details of the filter files to be used for data transfer. */
export interface FilterFileDetails {
  /** Type of the filter file. */
  filterFileType: FilterFileType;
  /** Path of the file that contains the details of all items to transfer. */
  filterFilePath: string;
}

export function filterFileDetailsSerializer(item: FilterFileDetails): any {
  return { filterFileType: item["filterFileType"], filterFilePath: item["filterFilePath"] };
}

export function filterFileDetailsDeserializer(item: any): FilterFileDetails {
  return {
    filterFileType: item["filterFileType"],
    filterFilePath: item["filterFilePath"],
  };
}

/** Type of the filter file. */
export type FilterFileType = "AzureBlob" | "AzureFile";

/** Map of filter type and the details to transfer all data. This field is required only if the TransferConfigurationType is given as TransferAll */
export interface TransferConfigurationTransferAllDetails {
  /** Details to transfer all data. */
  include?: TransferAllDetails;
}

export function transferConfigurationTransferAllDetailsSerializer(
  item: TransferConfigurationTransferAllDetails,
): any {
  return {
    include: !item["include"] ? item["include"] : transferAllDetailsSerializer(item["include"]),
  };
}

export function transferConfigurationTransferAllDetailsDeserializer(
  item: any,
): TransferConfigurationTransferAllDetails {
  return {
    include: !item["include"] ? item["include"] : transferAllDetailsDeserializer(item["include"]),
  };
}

/** Details to transfer all data. */
export interface TransferAllDetails {
  /** Type of the account of data */
  dataAccountType: DataAccountType;
  /** To indicate if all Azure blobs have to be transferred */
  transferAllBlobs?: boolean;
  /** To indicate if all Azure Files have to be transferred */
  transferAllFiles?: boolean;
}

export function transferAllDetailsSerializer(item: TransferAllDetails): any {
  return {
    dataAccountType: item["dataAccountType"],
    transferAllBlobs: item["transferAllBlobs"],
    transferAllFiles: item["transferAllFiles"],
  };
}

export function transferAllDetailsDeserializer(item: any): TransferAllDetails {
  return {
    dataAccountType: item["dataAccountType"],
    transferAllBlobs: item["transferAllBlobs"],
    transferAllFiles: item["transferAllFiles"],
  };
}

/** Indicates the type of job details. */
export type ClassDiscriminator = "DataBox" | "DataBoxDisk" | "DataBoxHeavy" | "DataBoxCustomerDisk";

/** Preferences related to the order */
export interface Preferences {
  /** Preferred data center region. */
  preferredDataCenterRegion?: string[];
  /** Preferences related to the shipment logistics of the sku. */
  transportPreferences?: TransportPreferences;
  /** Optional Preferences related to the reverse shipment logistics of the sku. */
  reverseTransportPreferences?: TransportPreferences;
  /** Preferences related to the Encryption. */
  encryptionPreferences?: EncryptionPreferences;
  /** Preferences related to the Access Tier of storage accounts. */
  storageAccountAccessTierPreferences?: "Archive"[];
}

export function preferencesSerializer(item: Preferences): any {
  return {
    preferredDataCenterRegion: !item["preferredDataCenterRegion"]
      ? item["preferredDataCenterRegion"]
      : item["preferredDataCenterRegion"].map((p: any) => {
          return p;
        }),
    transportPreferences: !item["transportPreferences"]
      ? item["transportPreferences"]
      : transportPreferencesSerializer(item["transportPreferences"]),
    reverseTransportPreferences: !item["reverseTransportPreferences"]
      ? item["reverseTransportPreferences"]
      : transportPreferencesSerializer(item["reverseTransportPreferences"]),
    encryptionPreferences: !item["encryptionPreferences"]
      ? item["encryptionPreferences"]
      : encryptionPreferencesSerializer(item["encryptionPreferences"]),
    storageAccountAccessTierPreferences: !item["storageAccountAccessTierPreferences"]
      ? item["storageAccountAccessTierPreferences"]
      : item["storageAccountAccessTierPreferences"].map((p: any) => {
          return p;
        }),
  };
}

export function preferencesDeserializer(item: any): Preferences {
  return {
    preferredDataCenterRegion: !item["preferredDataCenterRegion"]
      ? item["preferredDataCenterRegion"]
      : item["preferredDataCenterRegion"].map((p: any) => {
          return p;
        }),
    transportPreferences: !item["transportPreferences"]
      ? item["transportPreferences"]
      : transportPreferencesDeserializer(item["transportPreferences"]),
    reverseTransportPreferences: !item["reverseTransportPreferences"]
      ? item["reverseTransportPreferences"]
      : transportPreferencesDeserializer(item["reverseTransportPreferences"]),
    encryptionPreferences: !item["encryptionPreferences"]
      ? item["encryptionPreferences"]
      : encryptionPreferencesDeserializer(item["encryptionPreferences"]),
    storageAccountAccessTierPreferences: !item["storageAccountAccessTierPreferences"]
      ? item["storageAccountAccessTierPreferences"]
      : item["storageAccountAccessTierPreferences"].map((p: any) => {
          return p;
        }),
  };
}

/** Preferences related to the shipment logistics of the sku */
export interface TransportPreferences {
  /** Indicates Shipment Logistics type that the customer preferred. */
  preferredShipmentType: TransportShipmentTypes;
  /** Read only property which indicates whether transport preferences has been updated or not after device is prepared. */
  readonly isUpdated?: boolean;
}

export function transportPreferencesSerializer(item: TransportPreferences): any {
  return { preferredShipmentType: item["preferredShipmentType"] };
}

export function transportPreferencesDeserializer(item: any): TransportPreferences {
  return {
    preferredShipmentType: item["preferredShipmentType"],
    isUpdated: item["isUpdated"],
  };
}

/** Transport Shipment Type supported for given region. */
export type TransportShipmentTypes = "CustomerManaged" | "MicrosoftManaged";

/** Preferences related to the Encryption. */
export interface EncryptionPreferences {
  /** Defines secondary layer of software-based encryption enablement. */
  doubleEncryption?: DoubleEncryption;
  /** Defines Hardware level encryption (Only for disk) */
  hardwareEncryption?: HardwareEncryption;
}

export function encryptionPreferencesSerializer(item: EncryptionPreferences): any {
  return {
    doubleEncryption: item["doubleEncryption"],
    hardwareEncryption: item["hardwareEncryption"],
  };
}

export function encryptionPreferencesDeserializer(item: any): EncryptionPreferences {
  return {
    doubleEncryption: item["doubleEncryption"],
    hardwareEncryption: item["hardwareEncryption"],
  };
}

/** Defines secondary layer of software-based encryption enablement. */
export type DoubleEncryption = "Enabled" | "Disabled";
/** Hardware encryption support for a given sku for a given region. */
export type HardwareEncryption = "Enabled" | "Disabled";

/** Reverse Shipping Address and contact details for a job. */
export interface ReverseShippingDetails {
  /** Contact Info. */
  contactDetails?: ContactInfo;
  /** Shipping address where customer wishes to receive the device. */
  shippingAddress?: ShippingAddress;
  /**
   * A flag to indicate whether Reverse Shipping details are updated or not after device has been prepared.
   * Read only field
   */
  readonly isUpdated?: boolean;
}

export function reverseShippingDetailsSerializer(item: ReverseShippingDetails): any {
  return {
    contactDetails: !item["contactDetails"]
      ? item["contactDetails"]
      : contactInfoSerializer(item["contactDetails"]),
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : shippingAddressSerializer(item["shippingAddress"]),
  };
}

export function reverseShippingDetailsDeserializer(item: any): ReverseShippingDetails {
  return {
    contactDetails: !item["contactDetails"]
      ? item["contactDetails"]
      : contactInfoDeserializer(item["contactDetails"]),
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : shippingAddressDeserializer(item["shippingAddress"]),
    isUpdated: item["isUpdated"],
  };
}

/** Contact Info. */
export interface ContactInfo {
  /** Contact name of the person. */
  contactName: string;
  /** Phone number of the contact person. */
  phone: string;
  /** Phone extension number of the contact person. */
  phoneExtension?: string;
  /** Mobile number of the contact person. */
  mobile?: string;
}

export function contactInfoSerializer(item: ContactInfo): any {
  return {
    contactName: item["contactName"],
    phone: item["phone"],
    phoneExtension: item["phoneExtension"],
    mobile: item["mobile"],
  };
}

export function contactInfoDeserializer(item: any): ContactInfo {
  return {
    contactName: item["contactName"],
    phone: item["phone"],
    phoneExtension: item["phoneExtension"],
    mobile: item["mobile"],
  };
}

export function copyLogDetailsUnionArrayDeserializer(result: Array<CopyLogDetailsUnion>): any[] {
  return result.map((item) => {
    return copyLogDetailsUnionDeserializer(item);
  });
}

/** Details for log generated during copy. */
export interface CopyLogDetails {
  /** Indicates the type of job details. */
  /** The discriminator possible values: DataBox, DataBoxCustomerDisk, DataBoxDisk, DataBoxHeavy */
  copyLogDetailsType: ClassDiscriminator;
}

export function copyLogDetailsDeserializer(item: any): CopyLogDetails {
  return {
    copyLogDetailsType: item["copyLogDetailsType"],
  };
}

/** Alias for CopyLogDetailsUnion */
export type CopyLogDetailsUnion =
  | DataBoxAccountCopyLogDetails
  | DataBoxCustomerDiskCopyLogDetails
  | DataBoxDiskCopyLogDetails
  | DataBoxHeavyAccountCopyLogDetails
  | CopyLogDetails;

export function copyLogDetailsUnionDeserializer(item: any): CopyLogDetailsUnion {
  switch (item["copyLogDetailsType"]) {
    case "DataBox":
      return dataBoxAccountCopyLogDetailsDeserializer(item as DataBoxAccountCopyLogDetails);

    case "DataBoxCustomerDisk":
      return dataBoxCustomerDiskCopyLogDetailsDeserializer(
        item as DataBoxCustomerDiskCopyLogDetails,
      );

    case "DataBoxDisk":
      return dataBoxDiskCopyLogDetailsDeserializer(item as DataBoxDiskCopyLogDetails);

    case "DataBoxHeavy":
      return dataBoxHeavyAccountCopyLogDetailsDeserializer(
        item as DataBoxHeavyAccountCopyLogDetails,
      );

    default:
      return copyLogDetailsDeserializer(item);
  }
}

/** Copy log details for a storage account of a DataBox job */
export interface DataBoxAccountCopyLogDetails extends CopyLogDetails {
  /** Account name. */
  readonly accountName?: string;
  /** Link for copy logs. */
  readonly copyLogLink?: string;
  /** Link for copy verbose logs. This will be set only when LogCollectionLevel is set to Verbose. */
  readonly copyVerboseLogLink?: string;
  /** Indicates the type of job details. */
  copyLogDetailsType: "DataBox";
}

export function dataBoxAccountCopyLogDetailsDeserializer(item: any): DataBoxAccountCopyLogDetails {
  return {
    copyLogDetailsType: item["copyLogDetailsType"],
    accountName: item["accountName"],
    copyLogLink: item["copyLogLink"],
    copyVerboseLogLink: item["copyVerboseLogLink"],
  };
}

/** Copy Log Details for customer disk */
export interface DataBoxCustomerDiskCopyLogDetails extends CopyLogDetails {
  /** Disk Serial Number. */
  readonly serialNumber?: string;
  /** Link for copy error logs. */
  readonly errorLogLink?: string;
  /** Link for copy verbose logs. */
  readonly verboseLogLink?: string;
  /** Indicates the type of job details. */
  copyLogDetailsType: "DataBoxCustomerDisk";
}

export function dataBoxCustomerDiskCopyLogDetailsDeserializer(
  item: any,
): DataBoxCustomerDiskCopyLogDetails {
  return {
    copyLogDetailsType: item["copyLogDetailsType"],
    serialNumber: item["serialNumber"],
    errorLogLink: item["errorLogLink"],
    verboseLogLink: item["verboseLogLink"],
  };
}

/** Copy Log Details for a disk */
export interface DataBoxDiskCopyLogDetails extends CopyLogDetails {
  /** Disk Serial Number. */
  readonly diskSerialNumber?: string;
  /** Link for copy error logs. */
  readonly errorLogLink?: string;
  /** Link for copy verbose logs. */
  readonly verboseLogLink?: string;
  /** Indicates the type of job details. */
  copyLogDetailsType: "DataBoxDisk";
}

export function dataBoxDiskCopyLogDetailsDeserializer(item: any): DataBoxDiskCopyLogDetails {
  return {
    copyLogDetailsType: item["copyLogDetailsType"],
    diskSerialNumber: item["diskSerialNumber"],
    errorLogLink: item["errorLogLink"],
    verboseLogLink: item["verboseLogLink"],
  };
}

/** Copy log details for a storage account for Databox heavy */
export interface DataBoxHeavyAccountCopyLogDetails extends CopyLogDetails {
  /** Account name. */
  readonly accountName?: string;
  /** Link for copy logs. */
  readonly copyLogLink?: string[];
  /** Link for copy verbose logs. This will be set only when the LogCollectionLevel is set to verbose. */
  readonly copyVerboseLogLink?: string[];
  /** Indicates the type of job details. */
  copyLogDetailsType: "DataBoxHeavy";
}

export function dataBoxHeavyAccountCopyLogDetailsDeserializer(
  item: any,
): DataBoxHeavyAccountCopyLogDetails {
  return {
    copyLogDetailsType: item["copyLogDetailsType"],
    accountName: item["accountName"],
    copyLogLink: !item["copyLogLink"]
      ? item["copyLogLink"]
      : item["copyLogLink"].map((p: any) => {
          return p;
        }),
    copyVerboseLogLink: !item["copyVerboseLogLink"]
      ? item["copyVerboseLogLink"]
      : item["copyVerboseLogLink"].map((p: any) => {
          return p;
        }),
  };
}

/** Device erasure details with erasure completion status, secure erasure sas key and erasureordestructionlog sas key */
export interface DeviceErasureDetails {
  /** Holds the device erasure completion status */
  readonly deviceErasureStatus?: StageStatus;
  /** Shared access key to download cleanup or destruction certificate for device */
  readonly erasureOrDestructionCertificateSasKey?: string;
  /** Shared access key to download secure erasure certificate for the device */
  readonly secureErasureCertificateSasKey?: string;
}

export function deviceErasureDetailsDeserializer(item: any): DeviceErasureDetails {
  return {
    deviceErasureStatus: item["deviceErasureStatus"],
    erasureOrDestructionCertificateSasKey: item["erasureOrDestructionCertificateSasKey"],
    secureErasureCertificateSasKey: item["secureErasureCertificateSasKey"],
  };
}

/** Encryption key containing details about key to encrypt different keys. */
export interface KeyEncryptionKey {
  /** Type of encryption key used for key encryption. */
  kekType: KekType;
  /** Managed identity properties used for key encryption. */
  identityProperties?: IdentityProperties;
  /** Key encryption key. It is required in case of Customer managed KekType. */
  kekUrl?: string;
  /** Kek vault resource id. It is required in case of Customer managed KekType. */
  kekVaultResourceID?: string;
}

export function keyEncryptionKeySerializer(item: KeyEncryptionKey): any {
  return {
    kekType: item["kekType"],
    identityProperties: !item["identityProperties"]
      ? item["identityProperties"]
      : identityPropertiesSerializer(item["identityProperties"]),
    kekUrl: item["kekUrl"],
    kekVaultResourceID: item["kekVaultResourceID"],
  };
}

export function keyEncryptionKeyDeserializer(item: any): KeyEncryptionKey {
  return {
    kekType: item["kekType"],
    identityProperties: !item["identityProperties"]
      ? item["identityProperties"]
      : identityPropertiesDeserializer(item["identityProperties"]),
    kekUrl: item["kekUrl"],
    kekVaultResourceID: item["kekVaultResourceID"],
  };
}

/** Type of encryption key used for key encryption. */
export type KekType = "MicrosoftManaged" | "CustomerManaged";

/** Managed identity properties. */
export interface IdentityProperties {
  /** Managed service identity type. */
  type?: string;
  /** User assigned identity properties. */
  userAssigned?: UserAssignedProperties;
}

export function identityPropertiesSerializer(item: IdentityProperties): any {
  return {
    type: item["type"],
    userAssigned: !item["userAssigned"]
      ? item["userAssigned"]
      : userAssignedPropertiesSerializer(item["userAssigned"]),
  };
}

export function identityPropertiesDeserializer(item: any): IdentityProperties {
  return {
    type: item["type"],
    userAssigned: !item["userAssigned"]
      ? item["userAssigned"]
      : userAssignedPropertiesDeserializer(item["userAssigned"]),
  };
}

/** User assigned identity properties. */
export interface UserAssignedProperties {
  /** Arm resource id for user assigned identity to be used to fetch MSI token. */
  resourceId?: string;
}

export function userAssignedPropertiesSerializer(item: UserAssignedProperties): any {
  return { resourceId: item["resourceId"] };
}

export function userAssignedPropertiesDeserializer(item: any): UserAssignedProperties {
  return {
    resourceId: item["resourceId"],
  };
}

/** Last Mitigation Action Performed On Job */
export interface LastMitigationActionOnJob {
  /** Action performed date time */
  actionDateTimeInUtc?: Date;
  /**
   * Action performed by customer,
   * possibility is that mitigation might happen by customer or service or by ops
   */
  isPerformedByCustomer?: boolean;
  /** Resolution code provided by customer */
  customerResolution?: CustomerResolutionCode;
}

export function lastMitigationActionOnJobDeserializer(item: any): LastMitigationActionOnJob {
  return {
    actionDateTimeInUtc: !item["actionDateTimeInUtc"]
      ? item["actionDateTimeInUtc"]
      : new Date(item["actionDateTimeInUtc"]),
    isPerformedByCustomer: item["isPerformedByCustomer"],
    customerResolution: item["customerResolution"],
  };
}

/** Datacenter address for given storage location. */
export interface DatacenterAddressResponse {
  /** Data center address type */
  /** The discriminator possible values: DatacenterAddressInstruction, DatacenterAddressLocation */
  datacenterAddressType: DatacenterAddressType;
  /** List of supported carriers for return shipment. */
  readonly supportedCarriersForReturnShipment?: string[];
  /** Azure Location where the Data Center serves primarily. */
  readonly dataCenterAzureLocation?: string;
}

export function datacenterAddressResponseDeserializer(item: any): DatacenterAddressResponse {
  return {
    datacenterAddressType: item["datacenterAddressType"],
    supportedCarriersForReturnShipment: !item["supportedCarriersForReturnShipment"]
      ? item["supportedCarriersForReturnShipment"]
      : item["supportedCarriersForReturnShipment"].map((p: any) => {
          return p;
        }),
    dataCenterAzureLocation: item["dataCenterAzureLocation"],
  };
}

/** Alias for DatacenterAddressResponseUnion */
export type DatacenterAddressResponseUnion =
  | DatacenterAddressInstructionResponse
  | DatacenterAddressLocationResponse
  | DatacenterAddressResponse;

export function datacenterAddressResponseUnionDeserializer(
  item: any,
): DatacenterAddressResponseUnion {
  switch (item["datacenterAddressType"]) {
    case "DatacenterAddressInstruction":
      return datacenterAddressInstructionResponseDeserializer(
        item as DatacenterAddressInstructionResponse,
      );

    case "DatacenterAddressLocation":
      return datacenterAddressLocationResponseDeserializer(
        item as DatacenterAddressLocationResponse,
      );

    default:
      return datacenterAddressResponseDeserializer(item);
  }
}

/** Data center address type */
export type DatacenterAddressType = "DatacenterAddressLocation" | "DatacenterAddressInstruction";

/** Datacenter instruction for given storage location. */
export interface DatacenterAddressInstructionResponse extends DatacenterAddressResponse {
  /** Data center communication instruction */
  readonly communicationInstruction?: string;
  /** Data center address type */
  datacenterAddressType: "DatacenterAddressInstruction";
}

export function datacenterAddressInstructionResponseDeserializer(
  item: any,
): DatacenterAddressInstructionResponse {
  return {
    datacenterAddressType: item["datacenterAddressType"],
    supportedCarriersForReturnShipment: !item["supportedCarriersForReturnShipment"]
      ? item["supportedCarriersForReturnShipment"]
      : item["supportedCarriersForReturnShipment"].map((p: any) => {
          return p;
        }),
    dataCenterAzureLocation: item["dataCenterAzureLocation"],
    communicationInstruction: item["communicationInstruction"],
  };
}

/** Datacenter address for given storage location. */
export interface DatacenterAddressLocationResponse extends DatacenterAddressResponse {
  /** Contact person name */
  readonly contactPersonName?: string;
  /** Company name */
  readonly company?: string;
  /** Street address line 1 */
  readonly street1?: string;
  /** Street address line 2 */
  readonly street2?: string;
  /** Street address line 3 */
  readonly street3?: string;
  /** City name */
  readonly city?: string;
  /** name of the state */
  readonly state?: string;
  /** Zip code */
  readonly zip?: string;
  /** name of the country */
  readonly country?: string;
  /** Phone number */
  readonly phone?: string;
  /** Phone extension */
  readonly phoneExtension?: string;
  /** Address type */
  readonly addressType?: string;
  /** Special instruction for shipping */
  readonly additionalShippingInformation?: string;
  /** Data center address type */
  datacenterAddressType: "DatacenterAddressLocation";
}

export function datacenterAddressLocationResponseDeserializer(
  item: any,
): DatacenterAddressLocationResponse {
  return {
    datacenterAddressType: item["datacenterAddressType"],
    supportedCarriersForReturnShipment: !item["supportedCarriersForReturnShipment"]
      ? item["supportedCarriersForReturnShipment"]
      : item["supportedCarriersForReturnShipment"].map((p: any) => {
          return p;
        }),
    dataCenterAzureLocation: item["dataCenterAzureLocation"],
    contactPersonName: item["contactPersonName"],
    company: item["company"],
    street1: item["street1"],
    street2: item["street2"],
    street3: item["street3"],
    city: item["city"],
    state: item["state"],
    zip: item["zip"],
    country: item["country"],
    phone: item["phone"],
    phoneExtension: item["phoneExtension"],
    addressType: item["addressType"],
    additionalShippingInformation: item["additionalShippingInformation"],
  };
}

/** DataCenter code. */
export enum KnownDataCenterCode {
  /** Invalid */
  Invalid = "Invalid",
  /** BY2 */
  BY2 = "BY2",
  /** BY1 */
  BY1 = "BY1",
  /** ORK70 */
  ORK70 = "ORK70",
  /** AM2 */
  AM2 = "AM2",
  /** AMS20 */
  AMS20 = "AMS20",
  /** BY21 */
  BY21 = "BY21",
  /** BY24 */
  BY24 = "BY24",
  /** MWH01 */
  MWH01 = "MWH01",
  /** AMS06 */
  AMS06 = "AMS06",
  /** SSE90 */
  SSE90 = "SSE90",
  /** SYD03 */
  SYD03 = "SYD03",
  /** SYD23 */
  SYD23 = "SYD23",
  /** CBR20 */
  CBR20 = "CBR20",
  /** YTO20 */
  YTO20 = "YTO20",
  /** CWL20 */
  CWL20 = "CWL20",
  /** LON24 */
  LON24 = "LON24",
  /** BOM01 */
  BOM01 = "BOM01",
  /** BL20 */
  BL20 = "BL20",
  /** BL7 */
  BL7 = "BL7",
  /** SEL20 */
  SEL20 = "SEL20",
  /** TYO01 */
  TYO01 = "TYO01",
  /** BN1 */
  BN1 = "BN1",
  /** SN5 */
  SN5 = "SN5",
  /** CYS04 */
  CYS04 = "CYS04",
  /** TYO22 */
  TYO22 = "TYO22",
  /** YTO21 */
  YTO21 = "YTO21",
  /** YQB20 */
  YQB20 = "YQB20",
  /** FRA22 */
  FRA22 = "FRA22",
  /** MAA01 */
  MAA01 = "MAA01",
  /** CPQ02 */
  CPQ02 = "CPQ02",
  /** CPQ20 */
  CPQ20 = "CPQ20",
  /** SIN20 */
  SIN20 = "SIN20",
  /** HKG20 */
  HKG20 = "HKG20",
  /** SG2 */
  SG2 = "SG2",
  /** MEL23 */
  MEL23 = "MEL23",
  /** SEL21 */
  SEL21 = "SEL21",
  /** OSA20 */
  OSA20 = "OSA20",
  /** SHA03 */
  SHA03 = "SHA03",
  /** BJB */
  BJB = "BJB",
  /** JNB22 */
  JNB22 = "JNB22",
  /** JNB21 */
  JNB21 = "JNB21",
  /** MNZ21 */
  MNZ21 = "MNZ21",
  /** SN8 */
  SN8 = "SN8",
  /** AUH20 */
  AUH20 = "AUH20",
  /** ZRH20 */
  ZRH20 = "ZRH20",
  /** PUS20 */
  PUS20 = "PUS20",
  /** AdHoc */
  AdHoc = "AdHoc",
  /** CH1 */
  CH1 = "CH1",
  /** DSM05 */
  DSM05 = "DSM05",
  /** DUB07 */
  DUB07 = "DUB07",
  /** PNQ01 */
  PNQ01 = "PNQ01",
  /** SVG20 */
  SVG20 = "SVG20",
  /** OSA02 */
  OSA02 = "OSA02",
  /** OSA22 */
  OSA22 = "OSA22",
  /** PAR22 */
  PAR22 = "PAR22",
  /** BN7 */
  BN7 = "BN7",
  /** SN6 */
  SN6 = "SN6",
  /** BJS20 */
  BJS20 = "BJS20",
  /** BL24 */
  BL24 = "BL24",
  /** IDC5 */
  IDC5 = "IDC5",
  /** TYO23 */
  TYO23 = "TYO23",
  /** NTG20 */
  NTG20 = "NTG20",
  /** DXB23 */
  DXB23 = "DXB23",
  /** DSM11 */
  DSM11 = "DSM11",
  /** AMS25 */
  AMS25 = "AMS25",
  /** CPQ21 */
  CPQ21 = "CPQ21",
  /** OSA23 */
  OSA23 = "OSA23",
}

/**
 * DataCenter code. \
 * {@link KnownDataCenterCode} can be used interchangeably with DataCenterCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **BY2** \
 * **BY1** \
 * **ORK70** \
 * **AM2** \
 * **AMS20** \
 * **BY21** \
 * **BY24** \
 * **MWH01** \
 * **AMS06** \
 * **SSE90** \
 * **SYD03** \
 * **SYD23** \
 * **CBR20** \
 * **YTO20** \
 * **CWL20** \
 * **LON24** \
 * **BOM01** \
 * **BL20** \
 * **BL7** \
 * **SEL20** \
 * **TYO01** \
 * **BN1** \
 * **SN5** \
 * **CYS04** \
 * **TYO22** \
 * **YTO21** \
 * **YQB20** \
 * **FRA22** \
 * **MAA01** \
 * **CPQ02** \
 * **CPQ20** \
 * **SIN20** \
 * **HKG20** \
 * **SG2** \
 * **MEL23** \
 * **SEL21** \
 * **OSA20** \
 * **SHA03** \
 * **BJB** \
 * **JNB22** \
 * **JNB21** \
 * **MNZ21** \
 * **SN8** \
 * **AUH20** \
 * **ZRH20** \
 * **PUS20** \
 * **AdHoc** \
 * **CH1** \
 * **DSM05** \
 * **DUB07** \
 * **PNQ01** \
 * **SVG20** \
 * **OSA02** \
 * **OSA22** \
 * **PAR22** \
 * **BN7** \
 * **SN6** \
 * **BJS20** \
 * **BL24** \
 * **IDC5** \
 * **TYO23** \
 * **NTG20** \
 * **DXB23** \
 * **DSM11** \
 * **AMS25** \
 * **CPQ21** \
 * **OSA23**
 */
export type DataCenterCode = string;

/** Customer disk job details. */
export interface DataBoxCustomerDiskJobDetails extends JobDetails {
  /** Contains the map of disk serial number to the disk details for import jobs. */
  importDiskDetailsCollection?: Record<string, ImportDiskDetails>;
  /** Contains the map of disk serial number to the disk details for export jobs. */
  readonly exportDiskDetailsCollection?: Record<string, ExportDiskDetails>;
  /** Copy progress per disk. */
  readonly copyProgress?: DataBoxCustomerDiskCopyProgress[];
  /** Delivery package shipping details. */
  readonly deliverToDcPackageDetails?: PackageCarrierInfo;
  /** Return package shipping details. */
  returnToCustomerPackageDetails: PackageCarrierDetails;
  /** Flag to indicate if disk manifest should be backed-up in the Storage Account. */
  enableManifestBackup?: boolean;
  /** Indicates the type of job details. */
  jobDetailsType: "DataBoxCustomerDisk";
}

export function dataBoxCustomerDiskJobDetailsSerializer(item: DataBoxCustomerDiskJobDetails): any {
  return {
    contactDetails: contactDetailsSerializer(item["contactDetails"]),
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : shippingAddressSerializer(item["shippingAddress"]),
    dataImportDetails: !item["dataImportDetails"]
      ? item["dataImportDetails"]
      : dataImportDetailsArraySerializer(item["dataImportDetails"]),
    dataExportDetails: !item["dataExportDetails"]
      ? item["dataExportDetails"]
      : dataExportDetailsArraySerializer(item["dataExportDetails"]),
    jobDetailsType: item["jobDetailsType"],
    preferences: !item["preferences"]
      ? item["preferences"]
      : preferencesSerializer(item["preferences"]),
    reverseShippingDetails: !item["reverseShippingDetails"]
      ? item["reverseShippingDetails"]
      : reverseShippingDetailsSerializer(item["reverseShippingDetails"]),
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyEncryptionKeySerializer(item["keyEncryptionKey"]),
    expectedDataSizeInTeraBytes: item["expectedDataSizeInTeraBytes"],
    importDiskDetailsCollection: !item["importDiskDetailsCollection"]
      ? item["importDiskDetailsCollection"]
      : importDiskDetailsRecordSerializer(item["importDiskDetailsCollection"]),
    returnToCustomerPackageDetails: packageCarrierDetailsSerializer(
      item["returnToCustomerPackageDetails"],
    ),
    enableManifestBackup: item["enableManifestBackup"],
  };
}

export function dataBoxCustomerDiskJobDetailsDeserializer(
  item: any,
): DataBoxCustomerDiskJobDetails {
  return {
    jobStages: !item["jobStages"]
      ? item["jobStages"]
      : jobStagesArrayDeserializer(item["jobStages"]),
    contactDetails: contactDetailsDeserializer(item["contactDetails"]),
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : shippingAddressDeserializer(item["shippingAddress"]),
    deliveryPackage: !item["deliveryPackage"]
      ? item["deliveryPackage"]
      : packageShippingDetailsDeserializer(item["deliveryPackage"]),
    returnPackage: !item["returnPackage"]
      ? item["returnPackage"]
      : packageShippingDetailsDeserializer(item["returnPackage"]),
    dataImportDetails: !item["dataImportDetails"]
      ? item["dataImportDetails"]
      : dataImportDetailsArrayDeserializer(item["dataImportDetails"]),
    dataExportDetails: !item["dataExportDetails"]
      ? item["dataExportDetails"]
      : dataExportDetailsArrayDeserializer(item["dataExportDetails"]),
    jobDetailsType: item["jobDetailsType"],
    preferences: !item["preferences"]
      ? item["preferences"]
      : preferencesDeserializer(item["preferences"]),
    reverseShippingDetails: !item["reverseShippingDetails"]
      ? item["reverseShippingDetails"]
      : reverseShippingDetailsDeserializer(item["reverseShippingDetails"]),
    copyLogDetails: !item["copyLogDetails"]
      ? item["copyLogDetails"]
      : copyLogDetailsUnionArrayDeserializer(item["copyLogDetails"]),
    reverseShipmentLabelSasKey: item["reverseShipmentLabelSasKey"],
    chainOfCustodySasKey: item["chainOfCustodySasKey"],
    deviceErasureDetails: !item["deviceErasureDetails"]
      ? item["deviceErasureDetails"]
      : deviceErasureDetailsDeserializer(item["deviceErasureDetails"]),
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyEncryptionKeyDeserializer(item["keyEncryptionKey"]),
    expectedDataSizeInTeraBytes: item["expectedDataSizeInTeraBytes"],
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    lastMitigationActionOnJob: !item["lastMitigationActionOnJob"]
      ? item["lastMitigationActionOnJob"]
      : lastMitigationActionOnJobDeserializer(item["lastMitigationActionOnJob"]),
    datacenterAddress: !item["datacenterAddress"]
      ? item["datacenterAddress"]
      : datacenterAddressResponseUnionDeserializer(item["datacenterAddress"]),
    dataCenterCode: item["dataCenterCode"],
    importDiskDetailsCollection: !item["importDiskDetailsCollection"]
      ? item["importDiskDetailsCollection"]
      : importDiskDetailsRecordDeserializer(item["importDiskDetailsCollection"]),
    exportDiskDetailsCollection: !item["exportDiskDetailsCollection"]
      ? item["exportDiskDetailsCollection"]
      : exportDiskDetailsRecordDeserializer(item["exportDiskDetailsCollection"]),
    copyProgress: !item["copyProgress"]
      ? item["copyProgress"]
      : dataBoxCustomerDiskCopyProgressArrayDeserializer(item["copyProgress"]),
    deliverToDcPackageDetails: !item["deliverToDcPackageDetails"]
      ? item["deliverToDcPackageDetails"]
      : packageCarrierInfoDeserializer(item["deliverToDcPackageDetails"]),
    returnToCustomerPackageDetails: packageCarrierDetailsDeserializer(
      item["returnToCustomerPackageDetails"],
    ),
    enableManifestBackup: item["enableManifestBackup"],
  };
}

export function importDiskDetailsRecordSerializer(
  item: Record<string, ImportDiskDetails>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : importDiskDetailsSerializer(item[key]);
  });
  return result;
}

export function importDiskDetailsRecordDeserializer(
  item: Record<string, any>,
): Record<string, ImportDiskDetails> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : importDiskDetailsDeserializer(item[key]);
  });
  return result;
}

/** Import disk details */
export interface ImportDiskDetails {
  /** The relative path of the manifest file on the disk. */
  manifestFile: string;
  /** The Base16-encoded MD5 hash of the manifest file on the disk. */
  manifestHash: string;
  /** BitLocker key used to encrypt the disk. */
  bitLockerKey: string;
  /** Path to backed up manifest, only returned if enableManifestBackup is true. */
  readonly backupManifestCloudPath?: string;
}

export function importDiskDetailsSerializer(item: ImportDiskDetails): any {
  return {
    manifestFile: item["manifestFile"],
    manifestHash: item["manifestHash"],
    bitLockerKey: item["bitLockerKey"],
  };
}

export function importDiskDetailsDeserializer(item: any): ImportDiskDetails {
  return {
    manifestFile: item["manifestFile"],
    manifestHash: item["manifestHash"],
    bitLockerKey: item["bitLockerKey"],
    backupManifestCloudPath: item["backupManifestCloudPath"],
  };
}

export function exportDiskDetailsRecordDeserializer(
  item: Record<string, any>,
): Record<string, ExportDiskDetails> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : exportDiskDetailsDeserializer(item[key]);
  });
  return result;
}

/** Export disk details */
export interface ExportDiskDetails {
  /** The relative path of the manifest file on the disk. */
  readonly manifestFile?: string;
  /** The Base16-encoded MD5 hash of the manifest file on the disk. */
  readonly manifestHash?: string;
  /** Path to backed up manifest, only returned if enableManifestBackup is true. */
  readonly backupManifestCloudPath?: string;
}

export function exportDiskDetailsDeserializer(item: any): ExportDiskDetails {
  return {
    manifestFile: item["manifestFile"],
    manifestHash: item["manifestHash"],
    backupManifestCloudPath: item["backupManifestCloudPath"],
  };
}

export function dataBoxCustomerDiskCopyProgressArrayDeserializer(
  result: Array<DataBoxCustomerDiskCopyProgress>,
): any[] {
  return result.map((item) => {
    return dataBoxCustomerDiskCopyProgressDeserializer(item);
  });
}

/** DataBox CustomerDisk Copy Progress */
export interface DataBoxCustomerDiskCopyProgress extends CopyProgress {
  /** Disk Serial Number. */
  readonly serialNumber?: string;
  /** The Status of the copy */
  readonly copyStatus?: CopyStatus;
}

export function dataBoxCustomerDiskCopyProgressDeserializer(
  item: any,
): DataBoxCustomerDiskCopyProgress {
  return {
    storageAccountName: item["storageAccountName"],
    transferType: item["transferType"],
    dataAccountType: item["dataAccountType"],
    accountId: item["accountId"],
    bytesProcessed: item["bytesProcessed"],
    totalBytesToProcess: item["totalBytesToProcess"],
    filesProcessed: item["filesProcessed"],
    totalFilesToProcess: item["totalFilesToProcess"],
    invalidFilesProcessed: item["invalidFilesProcessed"],
    invalidFileBytesUploaded: item["invalidFileBytesUploaded"],
    renamedContainerCount: item["renamedContainerCount"],
    filesErroredOut: item["filesErroredOut"],
    directoriesErroredOut: item["directoriesErroredOut"],
    invalidDirectoriesProcessed: item["invalidDirectoriesProcessed"],
    isEnumerationInProgress: item["isEnumerationInProgress"],
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    serialNumber: item["serialNumber"],
    copyStatus: item["copyStatus"],
  };
}

/** The Status of the copy */
export enum KnownCopyStatus {
  /** Data copy hasn't started yet. */
  NotStarted = "NotStarted",
  /** Data copy is in progress. */
  InProgress = "InProgress",
  /** Data copy completed. */
  Completed = "Completed",
  /** Data copy completed with errors. */
  CompletedWithErrors = "CompletedWithErrors",
  /** Data copy failed. No data was copied. */
  Failed = "Failed",
  /** No copy triggered as device was not returned. */
  NotReturned = "NotReturned",
  /** The Device has hit hardware issues. */
  HardwareError = "HardwareError",
  /** Data copy failed. The Device was formatted by user. */
  DeviceFormatted = "DeviceFormatted",
  /** Data copy failed. Device metadata was modified by user. */
  DeviceMetadataModified = "DeviceMetadataModified",
  /** Data copy failed. Storage Account was not accessible during copy. */
  StorageAccountNotAccessible = "StorageAccountNotAccessible",
  /** Data copy failed. The Device data content is not supported. */
  UnsupportedData = "UnsupportedData",
  /** No copy triggered as device was not received. */
  DriveNotReceived = "DriveNotReceived",
  /** No copy triggered as device type is not supported. */
  UnsupportedDrive = "UnsupportedDrive",
  /** Copy failed due to service error. */
  OtherServiceError = "OtherServiceError",
  /** Copy failed due to user error. */
  OtherUserError = "OtherUserError",
  /** Copy failed due to disk detection error. */
  DriveNotDetected = "DriveNotDetected",
  /** Copy failed due to corrupted drive. */
  DriveCorrupted = "DriveCorrupted",
  /** Copy failed due to modified or removed metadata files. */
  MetadataFilesModifiedOrRemoved = "MetadataFilesModifiedOrRemoved",
}

/**
 * The Status of the copy \
 * {@link KnownCopyStatus} can be used interchangeably with CopyStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: Data copy hasn't started yet. \
 * **InProgress**: Data copy is in progress. \
 * **Completed**: Data copy completed. \
 * **CompletedWithErrors**: Data copy completed with errors. \
 * **Failed**: Data copy failed. No data was copied. \
 * **NotReturned**: No copy triggered as device was not returned. \
 * **HardwareError**: The Device has hit hardware issues. \
 * **DeviceFormatted**: Data copy failed. The Device was formatted by user. \
 * **DeviceMetadataModified**: Data copy failed. Device metadata was modified by user. \
 * **StorageAccountNotAccessible**: Data copy failed. Storage Account was not accessible during copy. \
 * **UnsupportedData**: Data copy failed. The Device data content is not supported. \
 * **DriveNotReceived**: No copy triggered as device was not received. \
 * **UnsupportedDrive**: No copy triggered as device type is not supported. \
 * **OtherServiceError**: Copy failed due to service error. \
 * **OtherUserError**: Copy failed due to user error. \
 * **DriveNotDetected**: Copy failed due to disk detection error. \
 * **DriveCorrupted**: Copy failed due to corrupted drive. \
 * **MetadataFilesModifiedOrRemoved**: Copy failed due to modified or removed metadata files.
 */
export type CopyStatus = string;

/** package carrier info */
export interface PackageCarrierInfo {
  /** Name of the carrier. */
  carrierName?: string;
  /** Tracking Id of shipment. */
  trackingId?: string;
}

export function packageCarrierInfoSerializer(item: PackageCarrierInfo): any {
  return { carrierName: item["carrierName"], trackingId: item["trackingId"] };
}

export function packageCarrierInfoDeserializer(item: any): PackageCarrierInfo {
  return {
    carrierName: item["carrierName"],
    trackingId: item["trackingId"],
  };
}

/** Package carrier details. */
export interface PackageCarrierDetails {
  /** Carrier Account Number of customer for customer disk. */
  carrierAccountNumber?: string;
  /** Name of the carrier. */
  carrierName?: string;
  /** Tracking Id of shipment. */
  trackingId?: string;
}

export function packageCarrierDetailsSerializer(item: PackageCarrierDetails): any {
  return {
    carrierAccountNumber: item["carrierAccountNumber"],
    carrierName: item["carrierName"],
    trackingId: item["trackingId"],
  };
}

export function packageCarrierDetailsDeserializer(item: any): PackageCarrierDetails {
  return {
    carrierAccountNumber: item["carrierAccountNumber"],
    carrierName: item["carrierName"],
    trackingId: item["trackingId"],
  };
}

/** DataBox Disk Job Details. */
export interface DataBoxDiskJobDetails extends JobDetails {
  /** User preference on what size disks are needed for the job. The map is from the disk size in TB to the count. Eg. {2,5} means 5 disks of 2 TB size. Key is string but will be checked against an int. */
  preferredDisks?: Record<string, number>;
  /** Copy progress per disk. */
  readonly copyProgress?: DataBoxDiskCopyProgress[];
  /** Copy progress per disk. */
  readonly granularCopyProgress?: DataBoxDiskGranularCopyProgress[];
  /** Copy progress per disk. */
  readonly granularCopyLogDetails?: DataBoxDiskGranularCopyLogDetails[];
  /** Contains the map of disk serial number to the disk size being used for the job. Is returned only after the disks are shipped to the customer. */
  readonly disksAndSizeDetails?: Record<string, number>;
  /** User entered passkey for DataBox Disk job. */
  passkey?: string;
  /** Indicates the type of job details. */
  jobDetailsType: "DataBoxDisk";
}

export function dataBoxDiskJobDetailsSerializer(item: DataBoxDiskJobDetails): any {
  return {
    contactDetails: contactDetailsSerializer(item["contactDetails"]),
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : shippingAddressSerializer(item["shippingAddress"]),
    dataImportDetails: !item["dataImportDetails"]
      ? item["dataImportDetails"]
      : dataImportDetailsArraySerializer(item["dataImportDetails"]),
    dataExportDetails: !item["dataExportDetails"]
      ? item["dataExportDetails"]
      : dataExportDetailsArraySerializer(item["dataExportDetails"]),
    jobDetailsType: item["jobDetailsType"],
    preferences: !item["preferences"]
      ? item["preferences"]
      : preferencesSerializer(item["preferences"]),
    reverseShippingDetails: !item["reverseShippingDetails"]
      ? item["reverseShippingDetails"]
      : reverseShippingDetailsSerializer(item["reverseShippingDetails"]),
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyEncryptionKeySerializer(item["keyEncryptionKey"]),
    expectedDataSizeInTeraBytes: item["expectedDataSizeInTeraBytes"],
    preferredDisks: item["preferredDisks"],
    passkey: item["passkey"],
  };
}

export function dataBoxDiskJobDetailsDeserializer(item: any): DataBoxDiskJobDetails {
  return {
    jobStages: !item["jobStages"]
      ? item["jobStages"]
      : jobStagesArrayDeserializer(item["jobStages"]),
    contactDetails: contactDetailsDeserializer(item["contactDetails"]),
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : shippingAddressDeserializer(item["shippingAddress"]),
    deliveryPackage: !item["deliveryPackage"]
      ? item["deliveryPackage"]
      : packageShippingDetailsDeserializer(item["deliveryPackage"]),
    returnPackage: !item["returnPackage"]
      ? item["returnPackage"]
      : packageShippingDetailsDeserializer(item["returnPackage"]),
    dataImportDetails: !item["dataImportDetails"]
      ? item["dataImportDetails"]
      : dataImportDetailsArrayDeserializer(item["dataImportDetails"]),
    dataExportDetails: !item["dataExportDetails"]
      ? item["dataExportDetails"]
      : dataExportDetailsArrayDeserializer(item["dataExportDetails"]),
    jobDetailsType: item["jobDetailsType"],
    preferences: !item["preferences"]
      ? item["preferences"]
      : preferencesDeserializer(item["preferences"]),
    reverseShippingDetails: !item["reverseShippingDetails"]
      ? item["reverseShippingDetails"]
      : reverseShippingDetailsDeserializer(item["reverseShippingDetails"]),
    copyLogDetails: !item["copyLogDetails"]
      ? item["copyLogDetails"]
      : copyLogDetailsUnionArrayDeserializer(item["copyLogDetails"]),
    reverseShipmentLabelSasKey: item["reverseShipmentLabelSasKey"],
    chainOfCustodySasKey: item["chainOfCustodySasKey"],
    deviceErasureDetails: !item["deviceErasureDetails"]
      ? item["deviceErasureDetails"]
      : deviceErasureDetailsDeserializer(item["deviceErasureDetails"]),
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyEncryptionKeyDeserializer(item["keyEncryptionKey"]),
    expectedDataSizeInTeraBytes: item["expectedDataSizeInTeraBytes"],
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    lastMitigationActionOnJob: !item["lastMitigationActionOnJob"]
      ? item["lastMitigationActionOnJob"]
      : lastMitigationActionOnJobDeserializer(item["lastMitigationActionOnJob"]),
    datacenterAddress: !item["datacenterAddress"]
      ? item["datacenterAddress"]
      : datacenterAddressResponseUnionDeserializer(item["datacenterAddress"]),
    dataCenterCode: item["dataCenterCode"],
    preferredDisks: !item["preferredDisks"]
      ? item["preferredDisks"]
      : Object.fromEntries(
          Object.entries(item["preferredDisks"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    copyProgress: !item["copyProgress"]
      ? item["copyProgress"]
      : dataBoxDiskCopyProgressArrayDeserializer(item["copyProgress"]),
    granularCopyProgress: !item["granularCopyProgress"]
      ? item["granularCopyProgress"]
      : dataBoxDiskGranularCopyProgressArrayDeserializer(item["granularCopyProgress"]),
    granularCopyLogDetails: !item["granularCopyLogDetails"]
      ? item["granularCopyLogDetails"]
      : dataBoxDiskGranularCopyLogDetailsArrayDeserializer(item["granularCopyLogDetails"]),
    disksAndSizeDetails: !item["disksAndSizeDetails"]
      ? item["disksAndSizeDetails"]
      : Object.fromEntries(
          Object.entries(item["disksAndSizeDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    passkey: item["passkey"],
  };
}

export function dataBoxDiskCopyProgressArrayDeserializer(
  result: Array<DataBoxDiskCopyProgress>,
): any[] {
  return result.map((item) => {
    return dataBoxDiskCopyProgressDeserializer(item);
  });
}

/** DataBox Disk Copy Progress */
export interface DataBoxDiskCopyProgress {
  /** The serial number of the disk */
  readonly serialNumber?: string;
  /** Bytes copied during the copy of disk. */
  readonly bytesCopied?: number;
  /** Indicates the percentage completed for the copy of the disk. */
  readonly percentComplete?: number;
  /** The Status of the copy */
  readonly status?: CopyStatus;
  /** Error, if any, in the stage */
  readonly error?: CloudError;
  /** Available actions on the job. */
  readonly actions?: CustomerResolutionCode[];
}

export function dataBoxDiskCopyProgressDeserializer(item: any): DataBoxDiskCopyProgress {
  return {
    serialNumber: item["serialNumber"],
    bytesCopied: item["bytesCopied"],
    percentComplete: item["percentComplete"],
    status: item["status"],
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
  };
}

export function dataBoxDiskGranularCopyProgressArrayDeserializer(
  result: Array<DataBoxDiskGranularCopyProgress>,
): any[] {
  return result.map((item) => {
    return dataBoxDiskGranularCopyProgressDeserializer(item);
  });
}

/** DataBox Disk Granular Copy Progress */
export interface DataBoxDiskGranularCopyProgress extends GranularCopyProgress {
  /** Disk Serial Number. */
  readonly serialNumber?: string;
  /** The Status of the copy */
  readonly copyStatus?: CopyStatus;
}

export function dataBoxDiskGranularCopyProgressDeserializer(
  item: any,
): DataBoxDiskGranularCopyProgress {
  return {
    storageAccountName: item["storageAccountName"],
    transferType: item["transferType"],
    dataAccountType: item["dataAccountType"],
    accountId: item["accountId"],
    bytesProcessed: item["bytesProcessed"],
    totalBytesToProcess: item["totalBytesToProcess"],
    filesProcessed: item["filesProcessed"],
    totalFilesToProcess: item["totalFilesToProcess"],
    invalidFilesProcessed: item["invalidFilesProcessed"],
    invalidFileBytesUploaded: item["invalidFileBytesUploaded"],
    renamedContainerCount: item["renamedContainerCount"],
    filesErroredOut: item["filesErroredOut"],
    directoriesErroredOut: item["directoriesErroredOut"],
    invalidDirectoriesProcessed: item["invalidDirectoriesProcessed"],
    isEnumerationInProgress: item["isEnumerationInProgress"],
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    serialNumber: item["serialNumber"],
    copyStatus: item["copyStatus"],
  };
}

export function dataBoxDiskGranularCopyLogDetailsArrayDeserializer(
  result: Array<DataBoxDiskGranularCopyLogDetails>,
): any[] {
  return result.map((item) => {
    return dataBoxDiskGranularCopyLogDetailsDeserializer(item);
  });
}

/** Granular Copy Log Details for customer disk */
export interface DataBoxDiskGranularCopyLogDetails extends GranularCopyLogDetails {
  /** Disk Serial Number. */
  readonly serialNumber?: string;
  /** Account id. */
  readonly accountId?: string;
  /** Link for copy error logs. */
  readonly errorLogLink?: string;
  /** Link for copy verbose logs. */
  readonly verboseLogLink?: string;
  /** Indicates the type of job details. */
  copyLogDetailsType: "DataBoxCustomerDisk";
}

export function dataBoxDiskGranularCopyLogDetailsDeserializer(
  item: any,
): DataBoxDiskGranularCopyLogDetails {
  return {
    copyLogDetailsType: item["copyLogDetailsType"],
    serialNumber: item["serialNumber"],
    accountId: item["accountId"],
    errorLogLink: item["errorLogLink"],
    verboseLogLink: item["verboseLogLink"],
  };
}

/** Databox Heavy Device Job Details */
export interface DataBoxHeavyJobDetails extends JobDetails {
  /** Copy progress per account. */
  readonly copyProgress?: CopyProgress[];
  /** Set Device password for unlocking Databox Heavy. Should not be passed for TransferType:ExportFromAzure jobs. If this is not passed, the service will generate password itself. This will not be returned in Get Call. Password Requirements :  Password must be minimum of 12 and maximum of 64 characters. Password must have at least one uppercase alphabet, one number and one special character. Password cannot have the following characters : IilLoO0 Password can have only alphabets, numbers and these characters : @#\-$%^!+=;:_()]+ */
  devicePassword?: string;
  /** Indicates the type of job details. */
  jobDetailsType: "DataBoxHeavy";
}

export function dataBoxHeavyJobDetailsSerializer(item: DataBoxHeavyJobDetails): any {
  return {
    contactDetails: contactDetailsSerializer(item["contactDetails"]),
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : shippingAddressSerializer(item["shippingAddress"]),
    dataImportDetails: !item["dataImportDetails"]
      ? item["dataImportDetails"]
      : dataImportDetailsArraySerializer(item["dataImportDetails"]),
    dataExportDetails: !item["dataExportDetails"]
      ? item["dataExportDetails"]
      : dataExportDetailsArraySerializer(item["dataExportDetails"]),
    jobDetailsType: item["jobDetailsType"],
    preferences: !item["preferences"]
      ? item["preferences"]
      : preferencesSerializer(item["preferences"]),
    reverseShippingDetails: !item["reverseShippingDetails"]
      ? item["reverseShippingDetails"]
      : reverseShippingDetailsSerializer(item["reverseShippingDetails"]),
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyEncryptionKeySerializer(item["keyEncryptionKey"]),
    expectedDataSizeInTeraBytes: item["expectedDataSizeInTeraBytes"],
    devicePassword: item["devicePassword"],
  };
}

export function dataBoxHeavyJobDetailsDeserializer(item: any): DataBoxHeavyJobDetails {
  return {
    jobStages: !item["jobStages"]
      ? item["jobStages"]
      : jobStagesArrayDeserializer(item["jobStages"]),
    contactDetails: contactDetailsDeserializer(item["contactDetails"]),
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : shippingAddressDeserializer(item["shippingAddress"]),
    deliveryPackage: !item["deliveryPackage"]
      ? item["deliveryPackage"]
      : packageShippingDetailsDeserializer(item["deliveryPackage"]),
    returnPackage: !item["returnPackage"]
      ? item["returnPackage"]
      : packageShippingDetailsDeserializer(item["returnPackage"]),
    dataImportDetails: !item["dataImportDetails"]
      ? item["dataImportDetails"]
      : dataImportDetailsArrayDeserializer(item["dataImportDetails"]),
    dataExportDetails: !item["dataExportDetails"]
      ? item["dataExportDetails"]
      : dataExportDetailsArrayDeserializer(item["dataExportDetails"]),
    jobDetailsType: item["jobDetailsType"],
    preferences: !item["preferences"]
      ? item["preferences"]
      : preferencesDeserializer(item["preferences"]),
    reverseShippingDetails: !item["reverseShippingDetails"]
      ? item["reverseShippingDetails"]
      : reverseShippingDetailsDeserializer(item["reverseShippingDetails"]),
    copyLogDetails: !item["copyLogDetails"]
      ? item["copyLogDetails"]
      : copyLogDetailsUnionArrayDeserializer(item["copyLogDetails"]),
    reverseShipmentLabelSasKey: item["reverseShipmentLabelSasKey"],
    chainOfCustodySasKey: item["chainOfCustodySasKey"],
    deviceErasureDetails: !item["deviceErasureDetails"]
      ? item["deviceErasureDetails"]
      : deviceErasureDetailsDeserializer(item["deviceErasureDetails"]),
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyEncryptionKeyDeserializer(item["keyEncryptionKey"]),
    expectedDataSizeInTeraBytes: item["expectedDataSizeInTeraBytes"],
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    lastMitigationActionOnJob: !item["lastMitigationActionOnJob"]
      ? item["lastMitigationActionOnJob"]
      : lastMitigationActionOnJobDeserializer(item["lastMitigationActionOnJob"]),
    datacenterAddress: !item["datacenterAddress"]
      ? item["datacenterAddress"]
      : datacenterAddressResponseUnionDeserializer(item["datacenterAddress"]),
    dataCenterCode: item["dataCenterCode"],
    copyProgress: !item["copyProgress"]
      ? item["copyProgress"]
      : copyProgressArrayDeserializer(item["copyProgress"]),
    devicePassword: item["devicePassword"],
  };
}

export function copyProgressArrayDeserializer(result: Array<CopyProgress>): any[] {
  return result.map((item) => {
    return copyProgressDeserializer(item);
  });
}

/** Copy progress. */
export interface CopyProgress {
  /** Name of the storage account. This will be empty for data account types other than storage account. */
  readonly storageAccountName?: string;
  /** Transfer type of data */
  readonly transferType?: TransferType;
  /** Data Account Type. */
  readonly dataAccountType?: DataAccountType;
  /** Id of the account where the data needs to be uploaded. */
  readonly accountId?: string;
  /** To indicate bytes transferred. */
  readonly bytesProcessed?: number;
  /** Total amount of data to be processed by the job. */
  readonly totalBytesToProcess?: number;
  /** Number of files processed */
  readonly filesProcessed?: number;
  /** Total files to process */
  readonly totalFilesToProcess?: number;
  /** Number of files not adhering to azure naming conventions which were processed by automatic renaming */
  readonly invalidFilesProcessed?: number;
  /** Total amount of data not adhering to azure naming conventions which were processed by automatic renaming */
  readonly invalidFileBytesUploaded?: number;
  /** Number of folders not adhering to azure naming conventions which were processed by automatic renaming */
  readonly renamedContainerCount?: number;
  /** Number of files which could not be copied */
  readonly filesErroredOut?: number;
  /** To indicate directories errored out in the job. */
  readonly directoriesErroredOut?: number;
  /** To indicate directories renamed */
  readonly invalidDirectoriesProcessed?: number;
  /**
   * To indicate if enumeration of data is in progress.
   * Until this is true, the TotalBytesToProcess may not be valid.
   */
  readonly isEnumerationInProgress?: boolean;
  /** Error, if any, in the stage */
  readonly error?: CloudError;
  /** Available actions on the job. */
  readonly actions?: CustomerResolutionCode[];
}

export function copyProgressDeserializer(item: any): CopyProgress {
  return {
    storageAccountName: item["storageAccountName"],
    transferType: item["transferType"],
    dataAccountType: item["dataAccountType"],
    accountId: item["accountId"],
    bytesProcessed: item["bytesProcessed"],
    totalBytesToProcess: item["totalBytesToProcess"],
    filesProcessed: item["filesProcessed"],
    totalFilesToProcess: item["totalFilesToProcess"],
    invalidFilesProcessed: item["invalidFilesProcessed"],
    invalidFileBytesUploaded: item["invalidFileBytesUploaded"],
    renamedContainerCount: item["renamedContainerCount"],
    filesErroredOut: item["filesErroredOut"],
    directoriesErroredOut: item["directoriesErroredOut"],
    invalidDirectoriesProcessed: item["invalidDirectoriesProcessed"],
    isEnumerationInProgress: item["isEnumerationInProgress"],
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
  };
}

/** Databox Job Details */
export interface DataBoxJobDetails extends JobDetails {
  /** Copy progress per storage account. */
  readonly copyProgress?: CopyProgress[];
  /** Set Device password for unlocking Databox. Should not be passed for TransferType:ExportFromAzure jobs. If this is not passed, the service will generate password itself. This will not be returned in Get Call. Password Requirements :  Password must be minimum of 12 and maximum of 64 characters. Password must have at least one uppercase alphabet, one number and one special character. Password cannot have the following characters : IilLoO0 Password can have only alphabets, numbers and these characters : @#\-$%^!+=;:_()]+ */
  devicePassword?: string;
  /** Indicates the type of job details. */
  jobDetailsType: "DataBox";
}

export function dataBoxJobDetailsSerializer(item: DataBoxJobDetails): any {
  return {
    contactDetails: contactDetailsSerializer(item["contactDetails"]),
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : shippingAddressSerializer(item["shippingAddress"]),
    dataImportDetails: !item["dataImportDetails"]
      ? item["dataImportDetails"]
      : dataImportDetailsArraySerializer(item["dataImportDetails"]),
    dataExportDetails: !item["dataExportDetails"]
      ? item["dataExportDetails"]
      : dataExportDetailsArraySerializer(item["dataExportDetails"]),
    jobDetailsType: item["jobDetailsType"],
    preferences: !item["preferences"]
      ? item["preferences"]
      : preferencesSerializer(item["preferences"]),
    reverseShippingDetails: !item["reverseShippingDetails"]
      ? item["reverseShippingDetails"]
      : reverseShippingDetailsSerializer(item["reverseShippingDetails"]),
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyEncryptionKeySerializer(item["keyEncryptionKey"]),
    expectedDataSizeInTeraBytes: item["expectedDataSizeInTeraBytes"],
    devicePassword: item["devicePassword"],
  };
}

export function dataBoxJobDetailsDeserializer(item: any): DataBoxJobDetails {
  return {
    jobStages: !item["jobStages"]
      ? item["jobStages"]
      : jobStagesArrayDeserializer(item["jobStages"]),
    contactDetails: contactDetailsDeserializer(item["contactDetails"]),
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : shippingAddressDeserializer(item["shippingAddress"]),
    deliveryPackage: !item["deliveryPackage"]
      ? item["deliveryPackage"]
      : packageShippingDetailsDeserializer(item["deliveryPackage"]),
    returnPackage: !item["returnPackage"]
      ? item["returnPackage"]
      : packageShippingDetailsDeserializer(item["returnPackage"]),
    dataImportDetails: !item["dataImportDetails"]
      ? item["dataImportDetails"]
      : dataImportDetailsArrayDeserializer(item["dataImportDetails"]),
    dataExportDetails: !item["dataExportDetails"]
      ? item["dataExportDetails"]
      : dataExportDetailsArrayDeserializer(item["dataExportDetails"]),
    jobDetailsType: item["jobDetailsType"],
    preferences: !item["preferences"]
      ? item["preferences"]
      : preferencesDeserializer(item["preferences"]),
    reverseShippingDetails: !item["reverseShippingDetails"]
      ? item["reverseShippingDetails"]
      : reverseShippingDetailsDeserializer(item["reverseShippingDetails"]),
    copyLogDetails: !item["copyLogDetails"]
      ? item["copyLogDetails"]
      : copyLogDetailsUnionArrayDeserializer(item["copyLogDetails"]),
    reverseShipmentLabelSasKey: item["reverseShipmentLabelSasKey"],
    chainOfCustodySasKey: item["chainOfCustodySasKey"],
    deviceErasureDetails: !item["deviceErasureDetails"]
      ? item["deviceErasureDetails"]
      : deviceErasureDetailsDeserializer(item["deviceErasureDetails"]),
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyEncryptionKeyDeserializer(item["keyEncryptionKey"]),
    expectedDataSizeInTeraBytes: item["expectedDataSizeInTeraBytes"],
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    lastMitigationActionOnJob: !item["lastMitigationActionOnJob"]
      ? item["lastMitigationActionOnJob"]
      : lastMitigationActionOnJobDeserializer(item["lastMitigationActionOnJob"]),
    datacenterAddress: !item["datacenterAddress"]
      ? item["datacenterAddress"]
      : datacenterAddressResponseUnionDeserializer(item["datacenterAddress"]),
    dataCenterCode: item["dataCenterCode"],
    copyProgress: !item["copyProgress"]
      ? item["copyProgress"]
      : copyProgressArrayDeserializer(item["copyProgress"]),
    devicePassword: item["devicePassword"],
  };
}

/** Delivery type of Job. */
export type JobDeliveryType = "NonScheduled" | "Scheduled";

/** Additional delivery info. */
export interface JobDeliveryInfo {
  /** Scheduled date time. */
  scheduledDateTime?: Date;
}

export function jobDeliveryInfoSerializer(item: JobDeliveryInfo): any {
  return {
    scheduledDateTime: !item["scheduledDateTime"]
      ? item["scheduledDateTime"]
      : item["scheduledDateTime"].toISOString(),
  };
}

export function jobDeliveryInfoDeserializer(item: any): JobDeliveryInfo {
  return {
    scheduledDateTime: !item["scheduledDateTime"]
      ? item["scheduledDateTime"]
      : new Date(item["scheduledDateTime"]),
  };
}

/** The Sku. */
export interface Sku {
  /** The sku name. */
  name: SkuName;
  /** The display name of the sku. */
  displayName?: string;
  /** The sku family. */
  family?: string;
  /** The customer friendly name of the combination of version and capacity of the device. This field is necessary only at the time of ordering the newer generation device i.e. AzureDataBox120 and AzureDataBox525 as of Feb/2025 */
  model?: ModelName;
}

export function skuSerializer(item: Sku): any {
  return {
    name: item["name"],
    displayName: item["displayName"],
    family: item["family"],
    model: item["model"],
  };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    displayName: item["displayName"],
    family: item["family"],
    model: item["model"],
  };
}

/** SKU names. */
export type SkuName = "DataBox" | "DataBoxDisk" | "DataBoxHeavy" | "DataBoxCustomerDisk";
/** The customer friendly name of the combination of version and capacity of the device. This field is necessary only at the time of ordering the newer generation device i.e. AzureDataBox120 and AzureDataBox525 as of Feb/2025 */
export type ModelName =
  | "DataBox"
  | "DataBoxDisk"
  | "DataBoxHeavy"
  | "DataBoxCustomerDisk"
  | "AzureDataBox120"
  | "AzureDataBox525";

/** Msi identity details of the resource */
export interface ResourceIdentity {
  /** Identity type */
  type?: string;
  /** Service Principal Id backing the Msi */
  readonly principalId?: string;
  /** Home Tenant Id */
  readonly tenantId?: string;
  /** User Assigned Identities */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function resourceIdentitySerializer(item: ResourceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function resourceIdentityDeserializer(item: any): ResourceIdentity {
  return {
    type: item["type"],
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

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

/** Granular Copy progress. */
export interface GranularCopyProgress {
  /** Name of the storage account. This will be empty for data account types other than storage account. */
  readonly storageAccountName?: string;
  /** Transfer type of data */
  readonly transferType?: TransferType;
  /** Data Account Type. */
  readonly dataAccountType?: DataAccountType;
  /** Id of the account where the data needs to be uploaded. */
  readonly accountId?: string;
  /** To indicate bytes transferred. */
  readonly bytesProcessed?: number;
  /** Total amount of data to be processed by the job. */
  readonly totalBytesToProcess?: number;
  /** Number of files processed */
  readonly filesProcessed?: number;
  /** Total files to process */
  readonly totalFilesToProcess?: number;
  /** Number of files not adhering to azure naming conventions which were processed by automatic renaming */
  readonly invalidFilesProcessed?: number;
  /** Total amount of data not adhering to azure naming conventions which were processed by automatic renaming */
  readonly invalidFileBytesUploaded?: number;
  /** Number of folders not adhering to azure naming conventions which were processed by automatic renaming */
  readonly renamedContainerCount?: number;
  /** Number of files which could not be copied */
  readonly filesErroredOut?: number;
  /** To indicate directories errored out in the job. */
  readonly directoriesErroredOut?: number;
  /** To indicate directories renamed */
  readonly invalidDirectoriesProcessed?: number;
  /**
   * To indicate if enumeration of data is in progress.
   * Until this is true, the TotalBytesToProcess may not be valid.
   */
  readonly isEnumerationInProgress?: boolean;
  /** Error, if any, in the stage */
  readonly error?: CloudError;
  /** Available actions on the job. */
  readonly actions?: CustomerResolutionCode[];
}

export function granularCopyProgressDeserializer(item: any): GranularCopyProgress {
  return {
    storageAccountName: item["storageAccountName"],
    transferType: item["transferType"],
    dataAccountType: item["dataAccountType"],
    accountId: item["accountId"],
    bytesProcessed: item["bytesProcessed"],
    totalBytesToProcess: item["totalBytesToProcess"],
    filesProcessed: item["filesProcessed"],
    totalFilesToProcess: item["totalFilesToProcess"],
    invalidFilesProcessed: item["invalidFilesProcessed"],
    invalidFileBytesUploaded: item["invalidFileBytesUploaded"],
    renamedContainerCount: item["renamedContainerCount"],
    filesErroredOut: item["filesErroredOut"],
    directoriesErroredOut: item["directoriesErroredOut"],
    invalidDirectoriesProcessed: item["invalidDirectoriesProcessed"],
    isEnumerationInProgress: item["isEnumerationInProgress"],
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
  };
}

/** Granular Details for log generated during copy. */
export interface GranularCopyLogDetails {
  /** Indicates the type of job details. */
  /** The discriminator possible values: DataBoxCustomerDisk */
  copyLogDetailsType: ClassDiscriminator;
}

export function granularCopyLogDetailsDeserializer(item: any): GranularCopyLogDetails {
  return {
    copyLogDetailsType: item["copyLogDetailsType"],
  };
}

/** Alias for GranularCopyLogDetailsUnion */
export type GranularCopyLogDetailsUnion =
  DataBoxDiskGranularCopyLogDetails | GranularCopyLogDetails;

export function granularCopyLogDetailsUnionDeserializer(item: any): GranularCopyLogDetailsUnion {
  switch (item["copyLogDetailsType"]) {
    case "DataBoxCustomerDisk":
      return dataBoxDiskGranularCopyLogDetailsDeserializer(
        item as DataBoxDiskGranularCopyLogDetails,
      );

    default:
      return granularCopyLogDetailsDeserializer(item);
  }
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

/** The JobResourceUpdateParameter. */
export interface JobResourceUpdateParameter {
  /** The list of key value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). */
  tags?: Record<string, string>;
  /** Msi identity of the resource */
  identity?: ResourceIdentity;
  /** Details of a job to be updated. */
  details?: UpdateJobDetails;
}

export function jobResourceUpdateParameterSerializer(item: JobResourceUpdateParameter): any {
  return {
    properties: areAllPropsUndefined(item, ["details"])
      ? undefined
      : _jobResourceUpdateParameterPropertiesSerializer(item),
    tags: item["tags"],
    identity: !item["identity"] ? item["identity"] : resourceIdentitySerializer(item["identity"]),
  };
}

/** Job Properties for update */
export interface UpdateJobProperties {
  /** Details of a job to be updated. */
  details?: UpdateJobDetails;
}

export function updateJobPropertiesSerializer(item: UpdateJobProperties): any {
  return {
    details: !item["details"] ? item["details"] : updateJobDetailsSerializer(item["details"]),
  };
}

/** Job details for update. */
export interface UpdateJobDetails {
  /** Contact details for notification and shipping. */
  contactDetails?: ContactDetails;
  /** Shipping address of the customer. */
  shippingAddress?: ShippingAddress;
  /** Reverse Shipping Address and contact details for a job. */
  reverseShippingDetails?: ReverseShippingDetails;
  /** Preferences related to the order */
  preferences?: Preferences;
  /** Key encryption key for the job. */
  keyEncryptionKey?: KeyEncryptionKey;
  /** Return package details of job. */
  returnToCustomerPackageDetails?: PackageCarrierDetails;
}

export function updateJobDetailsSerializer(item: UpdateJobDetails): any {
  return {
    contactDetails: !item["contactDetails"]
      ? item["contactDetails"]
      : contactDetailsSerializer(item["contactDetails"]),
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : shippingAddressSerializer(item["shippingAddress"]),
    reverseShippingDetails: !item["reverseShippingDetails"]
      ? item["reverseShippingDetails"]
      : reverseShippingDetailsSerializer(item["reverseShippingDetails"]),
    preferences: !item["preferences"]
      ? item["preferences"]
      : preferencesSerializer(item["preferences"]),
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyEncryptionKeySerializer(item["keyEncryptionKey"]),
    returnToCustomerPackageDetails: !item["returnToCustomerPackageDetails"]
      ? item["returnToCustomerPackageDetails"]
      : packageCarrierDetailsSerializer(item["returnToCustomerPackageDetails"]),
  };
}

/** Job Resource Collection */
export interface _JobResourceList {
  /** The JobResource items on this page */
  value: JobResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobResourceListDeserializer(item: any): _JobResourceList {
  return {
    value: jobResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobResourceArraySerializer(result: Array<JobResource>): any[] {
  return result.map((item) => {
    return jobResourceSerializer(item);
  });
}

export function jobResourceArrayDeserializer(result: Array<JobResource>): any[] {
  return result.map((item) => {
    return jobResourceDeserializer(item);
  });
}

/** Shipment pick up request details. */
export interface ShipmentPickUpRequest {
  /** Minimum date after which the pick up should commence, this must be in local time of pick up area. */
  startTime: Date;
  /** Maximum date before which the pick up should commence, this must be in local time of pick up area. */
  endTime: Date;
  /** Shipment Location in the pickup place. Eg.front desk */
  shipmentLocation: string;
}

export function shipmentPickUpRequestSerializer(item: ShipmentPickUpRequest): any {
  return {
    startTime: item["startTime"].toISOString(),
    endTime: item["endTime"].toISOString(),
    shipmentLocation: item["shipmentLocation"],
  };
}

/** Shipment pick up response. */
export interface ShipmentPickUpResponse {
  /** Confirmation number for the pick up request. */
  readonly confirmationNumber?: string;
  /** Time by which shipment should be ready for pick up, this is in local time of pick up area. */
  readonly readyByTime?: Date;
}

export function shipmentPickUpResponseDeserializer(item: any): ShipmentPickUpResponse {
  return {
    confirmationNumber: item["confirmationNumber"],
    readyByTime: !item["readyByTime"] ? item["readyByTime"] : new Date(item["readyByTime"]),
  };
}

/** Reason for cancellation. */
export interface CancellationReason {
  /** Reason for cancellation. */
  reason: string;
}

export function cancellationReasonSerializer(item: CancellationReason): any {
  return { reason: item["reason"] };
}

/** List of unencrypted credentials for accessing device. */
export interface _UnencryptedCredentialsList {
  /** The UnencryptedCredentials items on this page */
  value: UnencryptedCredentials[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _unencryptedCredentialsListDeserializer(item: any): _UnencryptedCredentialsList {
  return {
    value: unencryptedCredentialsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function unencryptedCredentialsArrayDeserializer(
  result: Array<UnencryptedCredentials>,
): any[] {
  return result.map((item) => {
    return unencryptedCredentialsDeserializer(item);
  });
}

/** Unencrypted credentials for accessing device. */
export interface UnencryptedCredentials {
  /** Name of the job. */
  readonly jobName?: string;
  /** Secrets related to this job. */
  readonly jobSecrets?: JobSecretsUnion;
}

export function unencryptedCredentialsDeserializer(item: any): UnencryptedCredentials {
  return {
    jobName: item["jobName"],
    jobSecrets: !item["jobSecrets"]
      ? item["jobSecrets"]
      : jobSecretsUnionDeserializer(item["jobSecrets"]),
  };
}

/** The base class for the secrets */
export interface JobSecrets {
  /** Used to indicate what type of job secrets object. */
  /** The discriminator possible values: DataBoxCustomerDisk, DataBoxDisk, DataBoxHeavy, DataBox */
  jobSecretsType: ClassDiscriminator;
  /** Dc Access Security Code for Customer Managed Shipping */
  readonly dcAccessSecurityCode?: DcAccessSecurityCode;
  /** Error while fetching the secrets. */
  readonly error?: CloudError;
}

export function jobSecretsDeserializer(item: any): JobSecrets {
  return {
    jobSecretsType: item["jobSecretsType"],
    dcAccessSecurityCode: !item["dcAccessSecurityCode"]
      ? item["dcAccessSecurityCode"]
      : dcAccessSecurityCodeDeserializer(item["dcAccessSecurityCode"]),
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
  };
}

/** Alias for JobSecretsUnion */
export type JobSecretsUnion =
  | CustomerDiskJobSecrets
  | DataBoxDiskJobSecrets
  | DataBoxHeavyJobSecrets
  | DataboxJobSecrets
  | JobSecrets;

export function jobSecretsUnionDeserializer(item: any): JobSecretsUnion {
  switch (item["jobSecretsType"]) {
    case "DataBoxCustomerDisk":
      return customerDiskJobSecretsDeserializer(item as CustomerDiskJobSecrets);

    case "DataBoxDisk":
      return dataBoxDiskJobSecretsDeserializer(item as DataBoxDiskJobSecrets);

    case "DataBoxHeavy":
      return dataBoxHeavyJobSecretsDeserializer(item as DataBoxHeavyJobSecrets);

    case "DataBox":
      return databoxJobSecretsDeserializer(item as DataboxJobSecrets);

    default:
      return jobSecretsDeserializer(item);
  }
}

/** Dc access security code */
export interface DcAccessSecurityCode {
  /** Reverse Dc access security code. */
  reverseDCAccessCode?: string;
  /** Forward Dc access security code. */
  forwardDCAccessCode?: string;
}

export function dcAccessSecurityCodeDeserializer(item: any): DcAccessSecurityCode {
  return {
    reverseDCAccessCode: item["reverseDCAccessCode"],
    forwardDCAccessCode: item["forwardDCAccessCode"],
  };
}

/** The secrets related to customer disk job. */
export interface CustomerDiskJobSecrets extends JobSecrets {
  /** Contains the list of secrets object for that device. */
  readonly diskSecrets?: DiskSecret[];
  /** Carrier Account Number of the customer */
  readonly carrierAccountNumber?: string;
  /** Used to indicate what type of job secrets object. */
  jobSecretsType: "DataBoxCustomerDisk";
}

export function customerDiskJobSecretsDeserializer(item: any): CustomerDiskJobSecrets {
  return {
    jobSecretsType: item["jobSecretsType"],
    dcAccessSecurityCode: !item["dcAccessSecurityCode"]
      ? item["dcAccessSecurityCode"]
      : dcAccessSecurityCodeDeserializer(item["dcAccessSecurityCode"]),
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    diskSecrets: !item["diskSecrets"]
      ? item["diskSecrets"]
      : diskSecretArrayDeserializer(item["diskSecrets"]),
    carrierAccountNumber: item["carrierAccountNumber"],
  };
}

export function diskSecretArrayDeserializer(result: Array<DiskSecret>): any[] {
  return result.map((item) => {
    return diskSecretDeserializer(item);
  });
}

/** Contains all the secrets of a Disk. */
export interface DiskSecret {
  /** Serial number of the assigned disk. */
  readonly diskSerialNumber?: string;
  /** Bit Locker key of the disk which can be used to unlock the disk to copy data. */
  readonly bitLockerKey?: string;
}

export function diskSecretDeserializer(item: any): DiskSecret {
  return {
    diskSerialNumber: item["diskSerialNumber"],
    bitLockerKey: item["bitLockerKey"],
  };
}

/** The secrets related to disk job. */
export interface DataBoxDiskJobSecrets extends JobSecrets {
  /** Contains the list of secrets object for that device. */
  readonly diskSecrets?: DiskSecret[];
  /** PassKey for the disk Job. */
  readonly passKey?: string;
  /** Whether passkey was provided by user. */
  readonly isPasskeyUserDefined?: boolean;
  /** Used to indicate what type of job secrets object. */
  jobSecretsType: "DataBoxDisk";
}

export function dataBoxDiskJobSecretsDeserializer(item: any): DataBoxDiskJobSecrets {
  return {
    jobSecretsType: item["jobSecretsType"],
    dcAccessSecurityCode: !item["dcAccessSecurityCode"]
      ? item["dcAccessSecurityCode"]
      : dcAccessSecurityCodeDeserializer(item["dcAccessSecurityCode"]),
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    diskSecrets: !item["diskSecrets"]
      ? item["diskSecrets"]
      : diskSecretArrayDeserializer(item["diskSecrets"]),
    passKey: item["passKey"],
    isPasskeyUserDefined: item["isPasskeyUserDefined"],
  };
}

/** The secrets related to a databox heavy job. */
export interface DataBoxHeavyJobSecrets extends JobSecrets {
  /** Contains the list of secret objects for a databox heavy job. */
  readonly cabinetPodSecrets?: DataBoxHeavySecret[];
  /** Used to indicate what type of job secrets object. */
  jobSecretsType: "DataBoxHeavy";
}

export function dataBoxHeavyJobSecretsDeserializer(item: any): DataBoxHeavyJobSecrets {
  return {
    jobSecretsType: item["jobSecretsType"],
    dcAccessSecurityCode: !item["dcAccessSecurityCode"]
      ? item["dcAccessSecurityCode"]
      : dcAccessSecurityCodeDeserializer(item["dcAccessSecurityCode"]),
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    cabinetPodSecrets: !item["cabinetPodSecrets"]
      ? item["cabinetPodSecrets"]
      : dataBoxHeavySecretArrayDeserializer(item["cabinetPodSecrets"]),
  };
}

export function dataBoxHeavySecretArrayDeserializer(result: Array<DataBoxHeavySecret>): any[] {
  return result.map((item) => {
    return dataBoxHeavySecretDeserializer(item);
  });
}

/** The secrets related to a databox heavy. */
export interface DataBoxHeavySecret {
  /** Serial number of the assigned device. */
  readonly deviceSerialNumber?: string;
  /** Password for out of the box experience on device. */
  readonly devicePassword?: string;
  /** Network configuration of the appliance. */
  readonly networkConfigurations?: ApplianceNetworkConfiguration[];
  /** The base 64 encoded public key to authenticate with the device */
  readonly encodedValidationCertPubKey?: string;
  /** Per account level access credentials. */
  readonly accountCredentialDetails?: AccountCredentialDetails[];
}

export function dataBoxHeavySecretDeserializer(item: any): DataBoxHeavySecret {
  return {
    deviceSerialNumber: item["deviceSerialNumber"],
    devicePassword: item["devicePassword"],
    networkConfigurations: !item["networkConfigurations"]
      ? item["networkConfigurations"]
      : applianceNetworkConfigurationArrayDeserializer(item["networkConfigurations"]),
    encodedValidationCertPubKey: item["encodedValidationCertPubKey"],
    accountCredentialDetails: !item["accountCredentialDetails"]
      ? item["accountCredentialDetails"]
      : accountCredentialDetailsArrayDeserializer(item["accountCredentialDetails"]),
  };
}

export function applianceNetworkConfigurationArrayDeserializer(
  result: Array<ApplianceNetworkConfiguration>,
): any[] {
  return result.map((item) => {
    return applianceNetworkConfigurationDeserializer(item);
  });
}

/** The Network Adapter configuration of a DataBox. */
export interface ApplianceNetworkConfiguration {
  /** Name of the network. */
  readonly name?: string;
  /** Mac Address. */
  readonly macAddress?: string;
}

export function applianceNetworkConfigurationDeserializer(
  item: any,
): ApplianceNetworkConfiguration {
  return {
    name: item["name"],
    macAddress: item["macAddress"],
  };
}

export function accountCredentialDetailsArrayDeserializer(
  result: Array<AccountCredentialDetails>,
): any[] {
  return result.map((item) => {
    return accountCredentialDetailsDeserializer(item);
  });
}

/** Credential details of the account. */
export interface AccountCredentialDetails {
  /** Name of the account. */
  readonly accountName?: string;
  /** Type of the account. */
  readonly dataAccountType?: DataAccountType;
  /** Connection string of the account endpoint to use the account as a storage endpoint on the device. */
  readonly accountConnectionString?: string;
  /** Per share level unencrypted access credentials. */
  readonly shareCredentialDetails?: ShareCredentialDetails[];
}

export function accountCredentialDetailsDeserializer(item: any): AccountCredentialDetails {
  return {
    accountName: item["accountName"],
    dataAccountType: item["dataAccountType"],
    accountConnectionString: item["accountConnectionString"],
    shareCredentialDetails: !item["shareCredentialDetails"]
      ? item["shareCredentialDetails"]
      : shareCredentialDetailsArrayDeserializer(item["shareCredentialDetails"]),
  };
}

export function shareCredentialDetailsArrayDeserializer(
  result: Array<ShareCredentialDetails>,
): any[] {
  return result.map((item) => {
    return shareCredentialDetailsDeserializer(item);
  });
}

/** Credential details of the shares in account. */
export interface ShareCredentialDetails {
  /** Name of the share. */
  readonly shareName?: string;
  /** Type of the share. */
  readonly shareType?: ShareDestinationFormatType;
  /** User name for the share. */
  readonly userName?: string;
  /** Password for the share. */
  readonly password?: string;
  /** Access protocols supported on the device. */
  readonly supportedAccessProtocols?: AccessProtocol[];
}

export function shareCredentialDetailsDeserializer(item: any): ShareCredentialDetails {
  return {
    shareName: item["shareName"],
    shareType: item["shareType"],
    userName: item["userName"],
    password: item["password"],
    supportedAccessProtocols: !item["supportedAccessProtocols"]
      ? item["supportedAccessProtocols"]
      : item["supportedAccessProtocols"].map((p: any) => {
          return p;
        }),
  };
}

/** Type of the share. */
export type ShareDestinationFormatType =
  "UnknownType" | "HCS" | "BlockBlob" | "PageBlob" | "AzureFile" | "ManagedDisk";
/** Access protocols supported on the device. */
export type AccessProtocol = "SMB" | "NFS";

/** The secrets related to a databox job. */
export interface DataboxJobSecrets extends JobSecrets {
  /** Contains the list of secret objects for a job. */
  podSecrets?: DataBoxSecret[];
  /** Used to indicate what type of job secrets object. */
  jobSecretsType: "DataBox";
}

export function databoxJobSecretsDeserializer(item: any): DataboxJobSecrets {
  return {
    jobSecretsType: item["jobSecretsType"],
    dcAccessSecurityCode: !item["dcAccessSecurityCode"]
      ? item["dcAccessSecurityCode"]
      : dcAccessSecurityCodeDeserializer(item["dcAccessSecurityCode"]),
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    podSecrets: !item["podSecrets"]
      ? item["podSecrets"]
      : dataBoxSecretArrayDeserializer(item["podSecrets"]),
  };
}

export function dataBoxSecretArrayDeserializer(result: Array<DataBoxSecret>): any[] {
  return result.map((item) => {
    return dataBoxSecretDeserializer(item);
  });
}

/** The secrets related to a DataBox. */
export interface DataBoxSecret {
  /** Serial number of the assigned device. */
  readonly deviceSerialNumber?: string;
  /** Password for out of the box experience on device. */
  readonly devicePassword?: string;
  /** Network configuration of the appliance. */
  readonly networkConfigurations?: ApplianceNetworkConfiguration[];
  /** The base 64 encoded public key to authenticate with the device */
  readonly encodedValidationCertPubKey?: string;
  /** Per account level access credentials. */
  readonly accountCredentialDetails?: AccountCredentialDetails[];
}

export function dataBoxSecretDeserializer(item: any): DataBoxSecret {
  return {
    deviceSerialNumber: item["deviceSerialNumber"],
    devicePassword: item["devicePassword"],
    networkConfigurations: !item["networkConfigurations"]
      ? item["networkConfigurations"]
      : applianceNetworkConfigurationArrayDeserializer(item["networkConfigurations"]),
    encodedValidationCertPubKey: item["encodedValidationCertPubKey"],
    accountCredentialDetails: !item["accountCredentialDetails"]
      ? item["accountCredentialDetails"]
      : accountCredentialDetailsArrayDeserializer(item["accountCredentialDetails"]),
  };
}

/** The request body to provide the delivery package details of job */
export interface MarkDevicesShippedRequest {
  /** Delivery package details */
  deliverToDcPackageDetails: PackageCarrierInfo;
}

export function markDevicesShippedRequestSerializer(item: MarkDevicesShippedRequest): any {
  return {
    deliverToDcPackageDetails: packageCarrierInfoSerializer(item["deliverToDcPackageDetails"]),
  };
}

/** Request body to get the configuration for the region. */
export interface RegionConfigurationRequest {
  /** Request body to get the availability for scheduling orders. */
  scheduleAvailabilityRequest?: ScheduleAvailabilityRequestUnion;
  /** Request body to get the transport availability for given sku. */
  transportAvailabilityRequest?: TransportAvailabilityRequest;
  /** Request body to get the datacenter address for given sku. */
  datacenterAddressRequest?: DatacenterAddressRequest;
  /** Request body to get the device capabilities for a given sku. */
  deviceCapabilityRequest?: DeviceCapabilityRequest;
}

export function regionConfigurationRequestSerializer(item: RegionConfigurationRequest): any {
  return {
    scheduleAvailabilityRequest: !item["scheduleAvailabilityRequest"]
      ? item["scheduleAvailabilityRequest"]
      : scheduleAvailabilityRequestUnionSerializer(item["scheduleAvailabilityRequest"]),
    transportAvailabilityRequest: !item["transportAvailabilityRequest"]
      ? item["transportAvailabilityRequest"]
      : transportAvailabilityRequestSerializer(item["transportAvailabilityRequest"]),
    datacenterAddressRequest: !item["datacenterAddressRequest"]
      ? item["datacenterAddressRequest"]
      : datacenterAddressRequestSerializer(item["datacenterAddressRequest"]),
    deviceCapabilityRequest: !item["deviceCapabilityRequest"]
      ? item["deviceCapabilityRequest"]
      : deviceCapabilityRequestSerializer(item["deviceCapabilityRequest"]),
  };
}

/** Request body to get the availability for scheduling orders. */
export interface ScheduleAvailabilityRequest {
  /** Location for data transfer. For locations check: https://management.azure.com/subscriptions/SUBSCRIPTIONID/locations?api-version=2018-01-01 */
  storageLocation: string;
  /** Sku Name for which the order is to be scheduled. */
  /** The discriminator possible values: DataBox, DataBoxDisk, DataBoxHeavy */
  skuName: SkuName;
  /** Country in which storage location should be supported. */
  country?: string;
  /** The customer friendly name of the combination of version and capacity of the device. This field is necessary only at the time of ordering the newer generation device i.e. AzureDataBox120 and AzureDataBox525 as of Feb/2025 */
  model?: ModelName;
}

export function scheduleAvailabilityRequestSerializer(item: ScheduleAvailabilityRequest): any {
  return {
    storageLocation: item["storageLocation"],
    skuName: item["skuName"],
    country: item["country"],
    model: item["model"],
  };
}

/** Alias for ScheduleAvailabilityRequestUnion */
export type ScheduleAvailabilityRequestUnion =
  | DataBoxScheduleAvailabilityRequest
  | DiskScheduleAvailabilityRequest
  | HeavyScheduleAvailabilityRequest
  | ScheduleAvailabilityRequest;

export function scheduleAvailabilityRequestUnionSerializer(
  item: ScheduleAvailabilityRequestUnion,
): any {
  switch (item.skuName) {
    case "DataBox":
      return dataBoxScheduleAvailabilityRequestSerializer(
        item as DataBoxScheduleAvailabilityRequest,
      );

    case "DataBoxDisk":
      return diskScheduleAvailabilityRequestSerializer(item as DiskScheduleAvailabilityRequest);

    case "DataBoxHeavy":
      return heavyScheduleAvailabilityRequestSerializer(item as HeavyScheduleAvailabilityRequest);

    default:
      return scheduleAvailabilityRequestSerializer(item);
  }
}

/** Request body to get the availability for scheduling data box orders orders. */
export interface DataBoxScheduleAvailabilityRequest extends ScheduleAvailabilityRequest {
  /** Sku Name for which the order is to be scheduled. */
  skuName: "DataBox";
}

export function dataBoxScheduleAvailabilityRequestSerializer(
  item: DataBoxScheduleAvailabilityRequest,
): any {
  return {
    storageLocation: item["storageLocation"],
    skuName: item["skuName"],
    country: item["country"],
    model: item["model"],
  };
}

/** Request body to get the availability for scheduling disk orders. */
export interface DiskScheduleAvailabilityRequest extends ScheduleAvailabilityRequest {
  /** The expected size of the data, which needs to be transferred in this job, in terabytes. */
  expectedDataSizeInTeraBytes: number;
  /** Sku Name for which the order is to be scheduled. */
  skuName: "DataBoxDisk";
}

export function diskScheduleAvailabilityRequestSerializer(
  item: DiskScheduleAvailabilityRequest,
): any {
  return {
    storageLocation: item["storageLocation"],
    skuName: item["skuName"],
    country: item["country"],
    model: item["model"],
    expectedDataSizeInTeraBytes: item["expectedDataSizeInTeraBytes"],
  };
}

/** Request body to get the availability for scheduling heavy orders. */
export interface HeavyScheduleAvailabilityRequest extends ScheduleAvailabilityRequest {
  /** Sku Name for which the order is to be scheduled. */
  skuName: "DataBoxHeavy";
}

export function heavyScheduleAvailabilityRequestSerializer(
  item: HeavyScheduleAvailabilityRequest,
): any {
  return {
    storageLocation: item["storageLocation"],
    skuName: item["skuName"],
    country: item["country"],
    model: item["model"],
  };
}

/** Request body to get the transport availability for given sku. */
export interface TransportAvailabilityRequest {
  /** Type of the device. */
  skuName?: SkuName;
  /** The customer friendly name of the combination of version and capacity of the device. This field is necessary only at the time of ordering the newer generation device i.e. AzureDataBox120 and AzureDataBox525 as of Feb/2025 */
  model?: ModelName;
}

export function transportAvailabilityRequestSerializer(item: TransportAvailabilityRequest): any {
  return { skuName: item["skuName"], model: item["model"] };
}

/** Request body to get the datacenter address. */
export interface DatacenterAddressRequest {
  /** Storage location. For locations check: https://management.azure.com/subscriptions/SUBSCRIPTIONID/locations?api-version=2018-01-01 */
  storageLocation: string;
  /** Sku Name for which the data center address requested. */
  skuName: SkuName;
  /** The customer friendly name of the combination of version and capacity of the device. This field is necessary only at the time of ordering the newer generation device i.e. AzureDataBox120 and AzureDataBox525 as of Feb/2025 */
  model?: ModelName;
}

export function datacenterAddressRequestSerializer(item: DatacenterAddressRequest): any {
  return {
    storageLocation: item["storageLocation"],
    skuName: item["skuName"],
    model: item["model"],
  };
}

/** Request body to get the device capabilities for given sku. */
export interface DeviceCapabilityRequest {
  /** Type of the device. */
  skuName?: SkuName;
  /** The customer friendly name of the combination of version and capacity of the device. This field is necessary only at the time of ordering the newer generation device i.e. AzureDataBox120 and AzureDataBox525 as of Feb/2025 */
  model?: ModelName;
}

export function deviceCapabilityRequestSerializer(item: DeviceCapabilityRequest): any {
  return { skuName: item["skuName"], model: item["model"] };
}

/** Configuration response specific to a region. */
export interface RegionConfigurationResponse {
  /** Schedule availability for given sku in a region. */
  readonly scheduleAvailabilityResponse?: ScheduleAvailabilityResponse;
  /** Transport options available for given sku in a region. */
  readonly transportAvailabilityResponse?: TransportAvailabilityResponse;
  /** Datacenter address for given sku in a region. */
  readonly datacenterAddressResponse?: DatacenterAddressResponseUnion;
  /** Device capabilities available for a given sku in a region. */
  readonly deviceCapabilityResponse?: DeviceCapabilityResponse;
}

export function regionConfigurationResponseDeserializer(item: any): RegionConfigurationResponse {
  return {
    scheduleAvailabilityResponse: !item["scheduleAvailabilityResponse"]
      ? item["scheduleAvailabilityResponse"]
      : scheduleAvailabilityResponseDeserializer(item["scheduleAvailabilityResponse"]),
    transportAvailabilityResponse: !item["transportAvailabilityResponse"]
      ? item["transportAvailabilityResponse"]
      : transportAvailabilityResponseDeserializer(item["transportAvailabilityResponse"]),
    datacenterAddressResponse: !item["datacenterAddressResponse"]
      ? item["datacenterAddressResponse"]
      : datacenterAddressResponseUnionDeserializer(item["datacenterAddressResponse"]),
    deviceCapabilityResponse: !item["deviceCapabilityResponse"]
      ? item["deviceCapabilityResponse"]
      : deviceCapabilityResponseDeserializer(item["deviceCapabilityResponse"]),
  };
}

/** Schedule availability for given sku in a region. */
export interface ScheduleAvailabilityResponse {
  /** List of dates available to schedule */
  readonly availableDates?: Date[];
}

export function scheduleAvailabilityResponseDeserializer(item: any): ScheduleAvailabilityResponse {
  return {
    availableDates: !item["availableDates"]
      ? item["availableDates"]
      : item["availableDates"].map((p: any) => {
          return new Date(p);
        }),
  };
}

/** Transport options available for given sku in a region. */
export interface TransportAvailabilityResponse {
  /** List of transport availability details for given region */
  readonly transportAvailabilityDetails?: TransportAvailabilityDetails[];
}

export function transportAvailabilityResponseDeserializer(
  item: any,
): TransportAvailabilityResponse {
  return {
    transportAvailabilityDetails: !item["transportAvailabilityDetails"]
      ? item["transportAvailabilityDetails"]
      : transportAvailabilityDetailsArrayDeserializer(item["transportAvailabilityDetails"]),
  };
}

export function transportAvailabilityDetailsArrayDeserializer(
  result: Array<TransportAvailabilityDetails>,
): any[] {
  return result.map((item) => {
    return transportAvailabilityDetailsDeserializer(item);
  });
}

/** Transport options availability details for given region. */
export interface TransportAvailabilityDetails {
  /** Transport Shipment Type supported for given region. */
  readonly shipmentType?: TransportShipmentTypes;
}

export function transportAvailabilityDetailsDeserializer(item: any): TransportAvailabilityDetails {
  return {
    shipmentType: item["shipmentType"],
  };
}

/** Device capabilities for given sku in a region */
export interface DeviceCapabilityResponse {
  /** List of device capabilities available for a given region and a given sku */
  readonly deviceCapabilityDetails?: DeviceCapabilityDetails[];
}

export function deviceCapabilityResponseDeserializer(item: any): DeviceCapabilityResponse {
  return {
    deviceCapabilityDetails: !item["deviceCapabilityDetails"]
      ? item["deviceCapabilityDetails"]
      : deviceCapabilityDetailsArrayDeserializer(item["deviceCapabilityDetails"]),
  };
}

export function deviceCapabilityDetailsArrayDeserializer(
  result: Array<DeviceCapabilityDetails>,
): any[] {
  return result.map((item) => {
    return deviceCapabilityDetailsDeserializer(item);
  });
}

/** Device capability details for a given sku for a given region. */
export interface DeviceCapabilityDetails {
  /** Hardware encryption support for a given sku for a given region. */
  readonly hardwareEncryption?: HardwareEncryption;
}

export function deviceCapabilityDetailsDeserializer(item: any): DeviceCapabilityDetails {
  return {
    hardwareEncryption: item["hardwareEncryption"],
  };
}

/** The requirements to validate customer address where the device needs to be shipped. */
export interface ValidateAddress extends ValidationInputRequest {
  /** Shipping address of the customer. */
  shippingAddress: ShippingAddress;
  /** Device type to be used for the job. */
  deviceType: SkuName;
  /** Preferences related to the shipment logistics of the sku. */
  transportPreferences?: TransportPreferences;
  /** The customer friendly name of the combination of version and capacity of the device. This field is necessary only at the time of ordering the newer generation device i.e. AzureDataBox120 and AzureDataBox525 as of Feb/2025 */
  model?: ModelName;
  /** Identifies the type of validation request. */
  validationType: "ValidateAddress";
}

export function validateAddressSerializer(item: ValidateAddress): any {
  return {
    validationType: item["validationType"],
    shippingAddress: shippingAddressSerializer(item["shippingAddress"]),
    deviceType: item["deviceType"],
    transportPreferences: !item["transportPreferences"]
      ? item["transportPreferences"]
      : transportPreferencesSerializer(item["transportPreferences"]),
    model: item["model"],
  };
}

/** Minimum fields that must be present in any type of validation request. */
export interface ValidationInputRequest {
  /** Identifies the type of validation request. */
  /** The discriminator possible values: ValidateAddress, ValidateCreateOrderLimit, ValidateDataTransferDetails, ValidatePreferences, ValidateSkuAvailability, ValidateSubscriptionIsAllowedToCreateJob */
  validationType: ValidationInputDiscriminator;
}

export function validationInputRequestSerializer(item: ValidationInputRequest): any {
  return { validationType: item["validationType"] };
}

/** Alias for ValidationInputRequestUnion */
export type ValidationInputRequestUnion =
  | ValidateAddress
  | CreateOrderLimitForSubscriptionValidationRequest
  | DataTransferDetailsValidationRequest
  | PreferencesValidationRequest
  | SkuAvailabilityValidationRequest
  | SubscriptionIsAllowedToCreateJobValidationRequest
  | ValidationInputRequest;

export function validationInputRequestUnionSerializer(item: ValidationInputRequestUnion): any {
  switch (item.validationType) {
    case "ValidateAddress":
      return validateAddressSerializer(item as ValidateAddress);

    case "ValidateCreateOrderLimit":
      return createOrderLimitForSubscriptionValidationRequestSerializer(
        item as CreateOrderLimitForSubscriptionValidationRequest,
      );

    case "ValidateDataTransferDetails":
      return dataTransferDetailsValidationRequestSerializer(
        item as DataTransferDetailsValidationRequest,
      );

    case "ValidatePreferences":
      return preferencesValidationRequestSerializer(item as PreferencesValidationRequest);

    case "ValidateSkuAvailability":
      return skuAvailabilityValidationRequestSerializer(item as SkuAvailabilityValidationRequest);

    case "ValidateSubscriptionIsAllowedToCreateJob":
      return subscriptionIsAllowedToCreateJobValidationRequestSerializer(
        item as SubscriptionIsAllowedToCreateJobValidationRequest,
      );

    default:
      return validationInputRequestSerializer(item);
  }
}

/** Identifies the type of validation request. */
export type ValidationInputDiscriminator =
  | "ValidateAddress"
  | "ValidateSubscriptionIsAllowedToCreateJob"
  | "ValidatePreferences"
  | "ValidateCreateOrderLimit"
  | "ValidateSkuAvailability"
  | "ValidateDataTransferDetails";

/** Request to validate create order limit for current subscription. */
export interface CreateOrderLimitForSubscriptionValidationRequest extends ValidationInputRequest {
  /** Device type to be used for the job. */
  deviceType: SkuName;
  /** The customer friendly name of the combination of version and capacity of the device. This field is necessary only at the time of ordering the newer generation device i.e. AzureDataBox120 and AzureDataBox525 as of Feb/2025 */
  model?: ModelName;
  /** Identifies the type of validation request. */
  validationType: "ValidateCreateOrderLimit";
}

export function createOrderLimitForSubscriptionValidationRequestSerializer(
  item: CreateOrderLimitForSubscriptionValidationRequest,
): any {
  return {
    validationType: item["validationType"],
    deviceType: item["deviceType"],
    model: item["model"],
  };
}

/** Request to validate export and import data details. */
export interface DataTransferDetailsValidationRequest extends ValidationInputRequest {
  /** List of DataTransfer details to be used to export data from azure. */
  dataExportDetails?: DataExportDetails[];
  /** List of DataTransfer details to be used to import data to azure. */
  dataImportDetails?: DataImportDetails[];
  /** Device type. */
  deviceType: SkuName;
  /** Type of the transfer. */
  transferType: TransferType;
  /** The customer friendly name of the combination of version and capacity of the device. This field is necessary only at the time of ordering the newer generation device i.e. AzureDataBox120 and AzureDataBox525 as of Feb/2025 */
  model?: ModelName;
  /** Identifies the type of validation request. */
  validationType: "ValidateDataTransferDetails";
}

export function dataTransferDetailsValidationRequestSerializer(
  item: DataTransferDetailsValidationRequest,
): any {
  return {
    validationType: item["validationType"],
    dataExportDetails: !item["dataExportDetails"]
      ? item["dataExportDetails"]
      : dataExportDetailsArraySerializer(item["dataExportDetails"]),
    dataImportDetails: !item["dataImportDetails"]
      ? item["dataImportDetails"]
      : dataImportDetailsArraySerializer(item["dataImportDetails"]),
    deviceType: item["deviceType"],
    transferType: item["transferType"],
    model: item["model"],
  };
}

/** Request to validate preference of transport and data center. */
export interface PreferencesValidationRequest extends ValidationInputRequest {
  /** Preference of transport and data center. */
  preference?: Preferences;
  /** Device type to be used for the job. */
  deviceType: SkuName;
  /** The customer friendly name of the combination of version and capacity of the device. This field is necessary only at the time of ordering the newer generation device i.e. AzureDataBox120 and AzureDataBox525 as of Feb/2025 */
  model?: ModelName;
  /** Identifies the type of validation request. */
  validationType: "ValidatePreferences";
}

export function preferencesValidationRequestSerializer(item: PreferencesValidationRequest): any {
  return {
    validationType: item["validationType"],
    preference: !item["preference"]
      ? item["preference"]
      : preferencesSerializer(item["preference"]),
    deviceType: item["deviceType"],
    model: item["model"],
  };
}

/** Request to validate sku availability. */
export interface SkuAvailabilityValidationRequest extends ValidationInputRequest {
  /** Device type to be used for the job. */
  deviceType: SkuName;
  /** Type of the transfer. */
  transferType: TransferType;
  /** ISO country code. Country for hardware shipment. For codes check: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements */
  country: string;
  /** Location for data transfer. For locations check: https://management.azure.com/subscriptions/SUBSCRIPTIONID/locations?api-version=2018-01-01 */
  location: string;
  /** The customer friendly name of the combination of version and capacity of the device. This field is necessary only at the time of ordering the newer generation device i.e. AzureDataBox120 and AzureDataBox525 as of Feb/2025 */
  model?: ModelName;
  /** Identifies the type of validation request. */
  validationType: "ValidateSkuAvailability";
}

export function skuAvailabilityValidationRequestSerializer(
  item: SkuAvailabilityValidationRequest,
): any {
  return {
    validationType: item["validationType"],
    deviceType: item["deviceType"],
    transferType: item["transferType"],
    country: item["country"],
    location: item["location"],
    model: item["model"],
  };
}

/** Request to validate subscription permission to create jobs. */
export interface SubscriptionIsAllowedToCreateJobValidationRequest extends ValidationInputRequest {
  /** Identifies the type of validation request. */
  validationType: "ValidateSubscriptionIsAllowedToCreateJob";
}

export function subscriptionIsAllowedToCreateJobValidationRequestSerializer(
  item: SubscriptionIsAllowedToCreateJobValidationRequest,
): any {
  return { validationType: item["validationType"] };
}

/** Output of the address validation api. */
export interface AddressValidationOutput {
  /** Identifies the type of validation response. */
  validationType?: "ValidateAddress";
  /** Error code and message of validation response. */
  readonly error?: CloudError;
  /** The address validation status. */
  readonly validationStatus?: AddressValidationStatus;
  /** List of alternate addresses. */
  readonly alternateAddresses?: ShippingAddress[];
}

export function addressValidationOutputDeserializer(item: any): AddressValidationOutput {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _addressValidationOutputPropertiesDeserializer(item["properties"])),
  };
}

/** The address validation output. */
export interface AddressValidationProperties extends ValidationInputResponse {
  /** The address validation status. */
  readonly validationStatus?: AddressValidationStatus;
  /** List of alternate addresses. */
  readonly alternateAddresses?: ShippingAddress[];
  /** Identifies the type of validation response. */
  validationType: "ValidateAddress";
}

export function addressValidationPropertiesDeserializer(item: any): AddressValidationProperties {
  return {
    validationType: item["validationType"],
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    validationStatus: item["validationStatus"],
    alternateAddresses: !item["alternateAddresses"]
      ? item["alternateAddresses"]
      : shippingAddressArrayDeserializer(item["alternateAddresses"]),
  };
}

/** The address validation status. */
export type AddressValidationStatus = "Valid" | "Invalid" | "Ambiguous";

export function shippingAddressArraySerializer(result: Array<ShippingAddress>): any[] {
  return result.map((item) => {
    return shippingAddressSerializer(item);
  });
}

export function shippingAddressArrayDeserializer(result: Array<ShippingAddress>): any[] {
  return result.map((item) => {
    return shippingAddressDeserializer(item);
  });
}

/** Minimum properties that should be present in each individual validation response. */
export interface ValidationInputResponse {
  /** Identifies the type of validation response. */
  /** The discriminator possible values: ValidateAddress, ValidateCreateOrderLimit, ValidateDataTransferDetails, ValidatePreferences, ValidateSkuAvailability, ValidateSubscriptionIsAllowedToCreateJob */
  validationType: ValidationInputDiscriminator;
  /** Error code and message of validation response. */
  readonly error?: CloudError;
}

export function validationInputResponseDeserializer(item: any): ValidationInputResponse {
  return {
    validationType: item["validationType"],
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
  };
}

/** Alias for ValidationInputResponseUnion */
export type ValidationInputResponseUnion =
  | AddressValidationProperties
  | CreateOrderLimitForSubscriptionValidationResponseProperties
  | DataTransferDetailsValidationResponseProperties
  | PreferencesValidationResponseProperties
  | SkuAvailabilityValidationResponseProperties
  | SubscriptionIsAllowedToCreateJobValidationResponseProperties
  | ValidationInputResponse;

export function validationInputResponseUnionDeserializer(item: any): ValidationInputResponseUnion {
  switch (item["validationType"]) {
    case "ValidateAddress":
      return addressValidationPropertiesDeserializer(item as AddressValidationProperties);

    case "ValidateCreateOrderLimit":
      return createOrderLimitForSubscriptionValidationResponsePropertiesDeserializer(
        item as CreateOrderLimitForSubscriptionValidationResponseProperties,
      );

    case "ValidateDataTransferDetails":
      return dataTransferDetailsValidationResponsePropertiesDeserializer(
        item as DataTransferDetailsValidationResponseProperties,
      );

    case "ValidatePreferences":
      return preferencesValidationResponsePropertiesDeserializer(
        item as PreferencesValidationResponseProperties,
      );

    case "ValidateSkuAvailability":
      return skuAvailabilityValidationResponsePropertiesDeserializer(
        item as SkuAvailabilityValidationResponseProperties,
      );

    case "ValidateSubscriptionIsAllowedToCreateJob":
      return subscriptionIsAllowedToCreateJobValidationResponsePropertiesDeserializer(
        item as SubscriptionIsAllowedToCreateJobValidationResponseProperties,
      );

    default:
      return validationInputResponseDeserializer(item);
  }
}

/** Properties of create order limit for subscription validation response. */
export interface CreateOrderLimitForSubscriptionValidationResponseProperties extends ValidationInputResponse {
  /** Create order limit validation status. */
  readonly status?: ValidationStatus;
  /** Identifies the type of validation response. */
  validationType: "ValidateCreateOrderLimit";
}

export function createOrderLimitForSubscriptionValidationResponsePropertiesDeserializer(
  item: any,
): CreateOrderLimitForSubscriptionValidationResponseProperties {
  return {
    validationType: item["validationType"],
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    status: item["status"],
  };
}

/** Create order limit validation status. */
export type ValidationStatus = "Valid" | "Invalid" | "Skipped";

/** Properties of data transfer details validation response. */
export interface DataTransferDetailsValidationResponseProperties extends ValidationInputResponse {
  /** Data transfer details validation status. */
  readonly status?: ValidationStatus;
  /** Identifies the type of validation response. */
  validationType: "ValidateDataTransferDetails";
}

export function dataTransferDetailsValidationResponsePropertiesDeserializer(
  item: any,
): DataTransferDetailsValidationResponseProperties {
  return {
    validationType: item["validationType"],
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    status: item["status"],
  };
}

/** Properties of data center and transport preference validation response. */
export interface PreferencesValidationResponseProperties extends ValidationInputResponse {
  /** Validation status of requested data center and transport. */
  readonly status?: ValidationStatus;
  /** Identifies the type of validation response. */
  validationType: "ValidatePreferences";
}

export function preferencesValidationResponsePropertiesDeserializer(
  item: any,
): PreferencesValidationResponseProperties {
  return {
    validationType: item["validationType"],
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    status: item["status"],
  };
}

/** Properties of sku availability validation response. */
export interface SkuAvailabilityValidationResponseProperties extends ValidationInputResponse {
  /** Sku availability validation status. */
  readonly status?: ValidationStatus;
  /** Identifies the type of validation response. */
  validationType: "ValidateSkuAvailability";
}

export function skuAvailabilityValidationResponsePropertiesDeserializer(
  item: any,
): SkuAvailabilityValidationResponseProperties {
  return {
    validationType: item["validationType"],
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    status: item["status"],
  };
}

/** Properties of subscription permission to create job validation response. */
export interface SubscriptionIsAllowedToCreateJobValidationResponseProperties extends ValidationInputResponse {
  /** Validation status of subscription permission to create job. */
  readonly status?: ValidationStatus;
  /** Identifies the type of validation response. */
  validationType: "ValidateSubscriptionIsAllowedToCreateJob";
}

export function subscriptionIsAllowedToCreateJobValidationResponsePropertiesDeserializer(
  item: any,
): SubscriptionIsAllowedToCreateJobValidationResponseProperties {
  return {
    validationType: item["validationType"],
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    status: item["status"],
  };
}

/** Minimum request requirement of any validation category. */
export interface ValidationRequest {
  /** Identify the nature of validation. */
  /** The discriminator possible values: JobCreationValidation */
  validationCategory: "JobCreationValidation";
  /** List of request details contain validationType and its request as key and value respectively. */
  individualRequestDetails: ValidationInputRequestUnion[];
}

export function validationRequestSerializer(item: ValidationRequest): any {
  return {
    validationCategory: item["validationCategory"],
    individualRequestDetails: validationInputRequestUnionArraySerializer(
      item["individualRequestDetails"],
    ),
  };
}

/** Alias for ValidationRequestUnion */
export type ValidationRequestUnion = CreateJobValidations | ValidationRequest;

export function validationRequestUnionSerializer(item: ValidationRequestUnion): any {
  switch (item.validationCategory) {
    case "JobCreationValidation":
      return createJobValidationsSerializer(item as CreateJobValidations);

    default:
      return validationRequestSerializer(item);
  }
}

export function validationInputRequestUnionArraySerializer(
  result: Array<ValidationInputRequestUnion>,
): any[] {
  return result.map((item) => {
    return validationInputRequestUnionSerializer(item);
  });
}

/** It does all pre-job creation validations. */
export interface CreateJobValidations extends ValidationRequest {
  /** Identify the nature of validation. */
  validationCategory: "JobCreationValidation";
}

export function createJobValidationsSerializer(item: CreateJobValidations): any {
  return {
    validationCategory: item["validationCategory"],
    individualRequestDetails: validationInputRequestUnionArraySerializer(
      item["individualRequestDetails"],
    ),
  };
}

/** Response of pre job creation validations. */
export interface ValidationResponse {
  /** Overall validation status. */
  readonly status?: OverallValidationStatus;
  /** List of response details contain validationType and its response as key and value respectively. */
  readonly individualResponseDetails?: ValidationInputResponseUnion[];
}

export function validationResponseDeserializer(item: any): ValidationResponse {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _validationResponsePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of pre job creation validation response. */
export interface ValidationResponseProperties {
  /** Overall validation status. */
  readonly status?: OverallValidationStatus;
  /** List of response details contain validationType and its response as key and value respectively. */
  readonly individualResponseDetails?: ValidationInputResponseUnion[];
}

export function validationResponsePropertiesDeserializer(item: any): ValidationResponseProperties {
  return {
    status: item["status"],
    individualResponseDetails: !item["individualResponseDetails"]
      ? item["individualResponseDetails"]
      : validationInputResponseUnionArrayDeserializer(item["individualResponseDetails"]),
  };
}

/** Overall validation status. */
export type OverallValidationStatus =
  "AllValidToProceed" | "InputsRevisitRequired" | "CertainInputValidationsSkipped";

export function validationInputResponseUnionArrayDeserializer(
  result: Array<ValidationInputResponseUnion>,
): any[] {
  return result.map((item) => {
    return validationInputResponseUnionDeserializer(item);
  });
}

/** The filters for showing the available skus. */
export interface AvailableSkuRequest {
  /** Type of the transfer. */
  transferType: TransferType;
  /** ISO country code. Country for hardware shipment. For codes check: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements */
  country: string;
  /** Location for data transfer. For locations check: https://management.azure.com/subscriptions/SUBSCRIPTIONID/locations?api-version=2018-01-01 */
  location: string;
  /** Sku Names to filter for available skus */
  skuNames?: SkuName[];
}

export function availableSkuRequestSerializer(item: AvailableSkuRequest): any {
  return {
    transferType: item["transferType"],
    country: item["country"],
    location: item["location"],
    skuNames: !item["skuNames"]
      ? item["skuNames"]
      : item["skuNames"].map((p: any) => {
          return p;
        }),
  };
}

/** The available skus operation response. */
export interface _AvailableSkusResult {
  /** [Placeholder] Description for page model */
  readonly value: SkuInformation[];
  /** [Placeholder] Description for nextLink property */
  nextLink?: string;
}

export function _availableSkusResultDeserializer(item: any): _AvailableSkusResult {
  return {
    value: skuInformationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function skuInformationArrayDeserializer(result: Array<SkuInformation>): any[] {
  return result.map((item) => {
    return skuInformationDeserializer(item);
  });
}

/** Information of the sku. */
export interface SkuInformation {
  /** The Sku. */
  readonly sku?: Sku;
  /** The sku is enabled or not. */
  readonly enabled?: boolean;
  /** The map of data location to service location. */
  readonly dataLocationToServiceLocationMap?: DataLocationToServiceLocationMap[];
  /** Capacity of the Sku. */
  readonly capacity?: SkuCapacity;
  /** Cost of the Sku. */
  readonly costs?: SkuCost[];
  /** Api versions that support this Sku. */
  readonly apiVersions?: string[];
  /** Reason why the Sku is disabled. */
  readonly disabledReason?: SkuDisabledReason;
  /** Message for why the Sku is disabled. */
  readonly disabledReasonMessage?: string;
  /** Required feature to access the sku. */
  readonly requiredFeature?: string;
  /** List of all the Countries in the SKU specific commerce boundary */
  readonly countriesWithinCommerceBoundary?: string[];
}

export function skuInformationDeserializer(item: any): SkuInformation {
  return {
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    enabled: item["enabled"],
    ...(!item["properties"]
      ? item["properties"]
      : _skuInformationPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the sku. */
export interface SkuProperties {
  /** The map of data location to service location. */
  readonly dataLocationToServiceLocationMap?: DataLocationToServiceLocationMap[];
  /** Capacity of the Sku. */
  readonly capacity?: SkuCapacity;
  /** Cost of the Sku. */
  readonly costs?: SkuCost[];
  /** Api versions that support this Sku. */
  readonly apiVersions?: string[];
  /** Reason why the Sku is disabled. */
  readonly disabledReason?: SkuDisabledReason;
  /** Message for why the Sku is disabled. */
  readonly disabledReasonMessage?: string;
  /** Required feature to access the sku. */
  readonly requiredFeature?: string;
  /** List of all the Countries in the SKU specific commerce boundary */
  readonly countriesWithinCommerceBoundary?: string[];
}

export function skuPropertiesDeserializer(item: any): SkuProperties {
  return {
    dataLocationToServiceLocationMap: !item["dataLocationToServiceLocationMap"]
      ? item["dataLocationToServiceLocationMap"]
      : dataLocationToServiceLocationMapArrayDeserializer(item["dataLocationToServiceLocationMap"]),
    capacity: !item["capacity"] ? item["capacity"] : skuCapacityDeserializer(item["capacity"]),
    costs: !item["costs"] ? item["costs"] : skuCostArrayDeserializer(item["costs"]),
    apiVersions: !item["apiVersions"]
      ? item["apiVersions"]
      : item["apiVersions"].map((p: any) => {
          return p;
        }),
    disabledReason: item["disabledReason"],
    disabledReasonMessage: item["disabledReasonMessage"],
    requiredFeature: item["requiredFeature"],
    countriesWithinCommerceBoundary: !item["countriesWithinCommerceBoundary"]
      ? item["countriesWithinCommerceBoundary"]
      : item["countriesWithinCommerceBoundary"].map((p: any) => {
          return p;
        }),
  };
}

export function dataLocationToServiceLocationMapArrayDeserializer(
  result: Array<DataLocationToServiceLocationMap>,
): any[] {
  return result.map((item) => {
    return dataLocationToServiceLocationMapDeserializer(item);
  });
}

/** Map of data location to service location */
export interface DataLocationToServiceLocationMap {
  /** Location of the data. */
  readonly dataLocation?: string;
  /** Location of the service. */
  readonly serviceLocation?: string;
}

export function dataLocationToServiceLocationMapDeserializer(
  item: any,
): DataLocationToServiceLocationMap {
  return {
    dataLocation: item["dataLocation"],
    serviceLocation: item["serviceLocation"],
  };
}

/** Capacity of the sku. */
export interface SkuCapacity {
  /** Usable capacity in TB. */
  readonly usable?: string;
  /** Maximum capacity in TB. */
  readonly maximum?: string;
  /** Maximum capacity per device in TB. */
  readonly individualSkuUsable?: string;
}

export function skuCapacityDeserializer(item: any): SkuCapacity {
  return {
    usable: item["usable"],
    maximum: item["maximum"],
    individualSkuUsable: item["individualSkuUsable"],
  };
}

export function skuCostArrayDeserializer(result: Array<SkuCost>): any[] {
  return result.map((item) => {
    return skuCostDeserializer(item);
  });
}

/** Describes metadata for retrieving price info. */
export interface SkuCost {
  /** Meter id of the Sku. */
  readonly meterId?: string;
  /** The type of the meter. */
  readonly meterType?: string;
  /** Multiplier specifies the region specific value to be multiplied with 1$ guid. Eg: Our new regions will be using 1$ shipping guid with appropriate multiplier specific to region. */
  readonly multiplier?: number;
}

export function skuCostDeserializer(item: any): SkuCost {
  return {
    meterId: item["meterId"],
    meterType: item["meterType"],
    multiplier: item["multiplier"],
  };
}

/** Reason why the Sku is disabled. */
export type SkuDisabledReason =
  "None" | "Country" | "Region" | "Feature" | "OfferType" | "NoSubscriptionInfo";

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-07-01 API version. */
  V20250701 = "2025-07-01",
}

export function _jobResourcePropertiesSerializer(item: JobResource): any {
  return {
    transferType: item["transferType"],
    details: !item["details"] ? item["details"] : jobDetailsUnionSerializer(item["details"]),
    deliveryType: item["deliveryType"],
    deliveryInfo: !item["deliveryInfo"]
      ? item["deliveryInfo"]
      : jobDeliveryInfoSerializer(item["deliveryInfo"]),
  };
}

export function _jobResourcePropertiesDeserializer(item: any) {
  return {
    transferType: item["transferType"],
    isCancellable: item["isCancellable"],
    isDeletable: item["isDeletable"],
    isShippingAddressEditable: item["isShippingAddressEditable"],
    reverseShippingDetailsUpdate: item["reverseShippingDetailsUpdate"],
    reverseTransportPreferenceUpdate: item["reverseTransportPreferenceUpdate"],
    isPrepareToShipEnabled: item["isPrepareToShipEnabled"],
    status: item["status"],
    delayedStage: item["delayedStage"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    details: !item["details"] ? item["details"] : jobDetailsUnionDeserializer(item["details"]),
    cancellationReason: item["cancellationReason"],
    deliveryType: item["deliveryType"],
    deliveryInfo: !item["deliveryInfo"]
      ? item["deliveryInfo"]
      : jobDeliveryInfoDeserializer(item["deliveryInfo"]),
    isCancellableWithoutFee: item["isCancellableWithoutFee"],
    allDevicesLost: item["allDevicesLost"],
  };
}

export function _jobResourceUpdateParameterPropertiesSerializer(
  item: JobResourceUpdateParameter,
): any {
  return {
    details: !item["details"] ? item["details"] : updateJobDetailsSerializer(item["details"]),
  };
}

export function _addressValidationOutputPropertiesDeserializer(item: any) {
  return {
    validationType: item["validationType"],
    error: !item["error"] ? item["error"] : cloudErrorDeserializer(item["error"]),
    validationStatus: item["validationStatus"],
    alternateAddresses: !item["alternateAddresses"]
      ? item["alternateAddresses"]
      : shippingAddressArrayDeserializer(item["alternateAddresses"]),
  };
}

export function _validationResponsePropertiesDeserializer(item: any) {
  return {
    status: item["status"],
    individualResponseDetails: !item["individualResponseDetails"]
      ? item["individualResponseDetails"]
      : validationInputResponseUnionArrayDeserializer(item["individualResponseDetails"]),
  };
}

export function _skuInformationPropertiesDeserializer(item: any) {
  return {
    dataLocationToServiceLocationMap: !item["dataLocationToServiceLocationMap"]
      ? item["dataLocationToServiceLocationMap"]
      : dataLocationToServiceLocationMapArrayDeserializer(item["dataLocationToServiceLocationMap"]),
    capacity: !item["capacity"] ? item["capacity"] : skuCapacityDeserializer(item["capacity"]),
    costs: !item["costs"] ? item["costs"] : skuCostArrayDeserializer(item["costs"]),
    apiVersions: !item["apiVersions"]
      ? item["apiVersions"]
      : item["apiVersions"].map((p: any) => {
          return p;
        }),
    disabledReason: item["disabledReason"],
    disabledReasonMessage: item["disabledReasonMessage"],
    requiredFeature: item["requiredFeature"],
    countriesWithinCommerceBoundary: !item["countriesWithinCommerceBoundary"]
      ? item["countriesWithinCommerceBoundary"]
      : item["countriesWithinCommerceBoundary"].map((p: any) => {
          return p;
        }),
  };
}
