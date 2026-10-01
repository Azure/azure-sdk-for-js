// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Result of the request to list REST API operations. It contains a list of operations and a URL nextLink to get the next set of results. */
export interface _OperationListResult {
  /** The list of operations supported by the resource provider. */
  value: Operation[];
  /** The URL to get the next set of operation list results if there are any. */
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

/** A REST API operation */
export interface Operation {
  /** This is of the format {provider}/{resource}/{operation} */
  name?: string;
  /** The object that describes the operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation. */
  origin?: string;
  /** Properties of the operation. */
  properties?: any;
  /** The flag that indicates whether the operation applies to data plane. */
  isDataAction?: boolean;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: item["properties"],
    isDataAction: item["isDataAction"],
  };
}

/** The object that describes the operation. */
export interface OperationDisplay {
  /** Friendly name of the resource provider. */
  provider?: string;
  /** For example: read, write, delete, or listKeys/action */
  operation?: string;
  /** The resource type on which the operation is performed. */
  resource?: string;
  /** The friendly name of the operation */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    operation: item["operation"],
    resource: item["resource"],
    description: item["description"],
  };
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

/** Represents a trigger that can invoke an image template build. */
export interface Trigger extends ProxyResource {
  /** The properties of a trigger */
  properties?: TriggerPropertiesUnion;
}

export function triggerSerializer(item: Trigger): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : triggerPropertiesUnionSerializer(item["properties"]),
  };
}

export function triggerDeserializer(item: any): Trigger {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : triggerPropertiesUnionDeserializer(item["properties"]),
  };
}

/** Describes the properties of a trigger */
export interface TriggerProperties {
  /** The kind of trigger. */
  /** The discriminator possible values: SourceImage */
  kind: string;
  /** Trigger status */
  readonly status?: TriggerStatus;
  /** Provisioning state of the resource */
  readonly provisioningState?: ProvisioningState;
}

export function triggerPropertiesSerializer(item: TriggerProperties): any {
  return { kind: item["kind"] };
}

export function triggerPropertiesDeserializer(item: any): TriggerProperties {
  return {
    kind: item["kind"],
    status: !item["status"] ? item["status"] : triggerStatusDeserializer(item["status"]),
    provisioningState: item["provisioningState"],
  };
}

/** Alias for TriggerPropertiesUnion */
export type TriggerPropertiesUnion = SourceImageTriggerProperties | TriggerProperties;

export function triggerPropertiesUnionSerializer(item: TriggerPropertiesUnion): any {
  switch (item.kind) {
    case "SourceImage":
      return sourceImageTriggerPropertiesSerializer(item as SourceImageTriggerProperties);

    default:
      return triggerPropertiesSerializer(item);
  }
}

export function triggerPropertiesUnionDeserializer(item: any): TriggerPropertiesUnion {
  switch (item["kind"]) {
    case "SourceImage":
      return sourceImageTriggerPropertiesDeserializer(item as SourceImageTriggerProperties);

    default:
      return triggerPropertiesDeserializer(item);
  }
}

/** Describes the status of a trigger */
export interface TriggerStatus {
  /** The status code. */
  readonly code?: string;
  /** The detailed status message, including for alerts and error messages. */
  readonly message?: string;
  /** The time of the status. */
  readonly time?: Date;
}

export function triggerStatusDeserializer(item: any): TriggerStatus {
  return {
    code: item["code"],
    message: item["message"],
    time: !item["time"] ? item["time"] : new Date(item["time"]),
  };
}

/** Provisioning state of the resource */
export type ProvisioningState =
  "Creating" | "Updating" | "Succeeded" | "Failed" | "Deleting" | "Canceled";

/** Properties of SourceImage kind of trigger */
export interface SourceImageTriggerProperties extends TriggerProperties {
  /** The kind of trigger. */
  kind: "SourceImage";
}

export function sourceImageTriggerPropertiesSerializer(item: SourceImageTriggerProperties): any {
  return { kind: item["kind"] };
}

export function sourceImageTriggerPropertiesDeserializer(item: any): SourceImageTriggerProperties {
  return {
    kind: item["kind"],
    status: !item["status"] ? item["status"] : triggerStatusDeserializer(item["status"]),
    provisioningState: item["provisioningState"],
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

/** The result of List triggers operation */
export interface _TriggerCollection {
  /** The Trigger items on this page */
  value: Trigger[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _triggerCollectionDeserializer(item: any): _TriggerCollection {
  return {
    value: triggerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function triggerArraySerializer(result: Array<Trigger>): any[] {
  return result.map((item) => {
    return triggerSerializer(item);
  });
}

export function triggerArrayDeserializer(result: Array<Trigger>): any[] {
  return result.map((item) => {
    return triggerDeserializer(item);
  });
}

/** Image template is an ARM resource managed by Microsoft.VirtualMachineImages provider */
export interface ImageTemplate extends TrackedResource {
  /** The identity of the image template, if configured. */
  identity: ImageTemplateIdentity;
  /** Specifies the properties used to describe the source image. */
  source?: ImageTemplateSourceUnion;
  /** Specifies the properties used to describe the customization steps of the image, like Image source etc */
  customize?: ImageTemplateCustomizerUnion[];
  /** Specifies optimization to be performed on image. */
  optimize?: ImageTemplatePropertiesOptimize;
  /** Configuration options and list of validations to be performed on the resulting image. */
  validate?: ImageTemplatePropertiesValidate;
  /** The distribution targets where the image output needs to go to. */
  distribute?: ImageTemplateDistributorUnion[];
  /** Error handling options upon a build failure */
  errorHandling?: ImageTemplatePropertiesErrorHandling;
  /** Provisioning state of the resource */
  readonly provisioningState?: ProvisioningState;
  /** Provisioning error, if any */
  readonly provisioningError?: ProvisioningError;
  /** State of 'run' that is currently executing or was last executed. */
  readonly lastRunStatus?: ImageTemplateLastRunStatus;
  /** Maximum duration to wait while building the image template (includes all customizations, optimization, validations, and distributions). Omit or specify 0 to use the default (4 hours). */
  buildTimeoutInMinutes?: number;
  /** Describes how virtual machine is set up to build images */
  vmProfile?: ImageTemplateVmProfile;
  /** Optional array of additional data disks to be added to the image. */
  additionalDataDisks?: DataDisk[];
  /** The staging resource group id in the same subscription as the image template that will be used to build the image. If this field is empty, a resource group with a random name will be created. If the resource group specified in this field doesn't exist, it will be created with the same name. If the resource group specified exists, it must be empty and in the same region as the image template. The resource group created will be deleted during template deletion if this field is empty or the resource group specified doesn't exist, but if the resource group specified exists the resources created in the resource group will be deleted during template deletion and the resource group itself will remain. */
  stagingResourceGroup?: string;
  /** The staging resource group id in the same subscription as the image template that will be used to build the image. This read-only field differs from 'stagingResourceGroup' only if the value specified in the 'stagingResourceGroup' field is empty. */
  readonly exactStagingResourceGroup?: string;
  /** Indicates whether or not to automatically run the image template build on template creation or update. */
  autoRun?: ImageTemplateAutoRun;
  /** Tags that will be applied to the resource group and/or resources created by the service. */
  managedResourceTags?: Record<string, string>;
}

export function imageTemplateSerializer(item: ImageTemplate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "source",
      "customize",
      "optimize",
      "validate",
      "distribute",
      "errorHandling",
      "buildTimeoutInMinutes",
      "vmProfile",
      "additionalDataDisks",
      "stagingResourceGroup",
      "autoRun",
      "managedResourceTags",
    ])
      ? undefined
      : _imageTemplatePropertiesSerializer(item),
    identity: imageTemplateIdentitySerializer(item["identity"]),
  };
}

export function imageTemplateDeserializer(item: any): ImageTemplate {
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
      : _imageTemplatePropertiesDeserializer(item["properties"])),
    identity: imageTemplateIdentityDeserializer(item["identity"]),
  };
}

/** Describes the properties of an image template */
export interface ImageTemplateProperties {
  /** Specifies the properties used to describe the source image. */
  source: ImageTemplateSourceUnion;
  /** Specifies the properties used to describe the customization steps of the image, like Image source etc */
  customize?: ImageTemplateCustomizerUnion[];
  /** Specifies optimization to be performed on image. */
  optimize?: ImageTemplatePropertiesOptimize;
  /** Configuration options and list of validations to be performed on the resulting image. */
  validate?: ImageTemplatePropertiesValidate;
  /** The distribution targets where the image output needs to go to. */
  distribute: ImageTemplateDistributorUnion[];
  /** Error handling options upon a build failure */
  errorHandling?: ImageTemplatePropertiesErrorHandling;
  /** Provisioning state of the resource */
  readonly provisioningState?: ProvisioningState;
  /** Provisioning error, if any */
  readonly provisioningError?: ProvisioningError;
  /** State of 'run' that is currently executing or was last executed. */
  readonly lastRunStatus?: ImageTemplateLastRunStatus;
  /** Maximum duration to wait while building the image template (includes all customizations, optimization, validations, and distributions). Omit or specify 0 to use the default (4 hours). */
  buildTimeoutInMinutes?: number;
  /** Describes how virtual machine is set up to build images */
  vmProfile?: ImageTemplateVmProfile;
  /** Optional array of additional data disks to be added to the image. */
  additionalDataDisks?: DataDisk[];
  /** The staging resource group id in the same subscription as the image template that will be used to build the image. If this field is empty, a resource group with a random name will be created. If the resource group specified in this field doesn't exist, it will be created with the same name. If the resource group specified exists, it must be empty and in the same region as the image template. The resource group created will be deleted during template deletion if this field is empty or the resource group specified doesn't exist, but if the resource group specified exists the resources created in the resource group will be deleted during template deletion and the resource group itself will remain. */
  stagingResourceGroup?: string;
  /** The staging resource group id in the same subscription as the image template that will be used to build the image. This read-only field differs from 'stagingResourceGroup' only if the value specified in the 'stagingResourceGroup' field is empty. */
  readonly exactStagingResourceGroup?: string;
  /** Indicates whether or not to automatically run the image template build on template creation or update. */
  autoRun?: ImageTemplateAutoRun;
  /** Tags that will be applied to the resource group and/or resources created by the service. */
  managedResourceTags?: Record<string, string>;
}

export function imageTemplatePropertiesSerializer(item: ImageTemplateProperties): any {
  return {
    source: imageTemplateSourceUnionSerializer(item["source"]),
    customize: !item["customize"]
      ? item["customize"]
      : imageTemplateCustomizerUnionArraySerializer(item["customize"]),
    optimize: !item["optimize"]
      ? item["optimize"]
      : imageTemplatePropertiesOptimizeSerializer(item["optimize"]),
    validate: !item["validate"]
      ? item["validate"]
      : imageTemplatePropertiesValidateSerializer(item["validate"]),
    distribute: imageTemplateDistributorUnionArraySerializer(item["distribute"]),
    errorHandling: !item["errorHandling"]
      ? item["errorHandling"]
      : imageTemplatePropertiesErrorHandlingSerializer(item["errorHandling"]),
    buildTimeoutInMinutes: item["buildTimeoutInMinutes"],
    vmProfile: !item["vmProfile"]
      ? item["vmProfile"]
      : imageTemplateVmProfileSerializer(item["vmProfile"]),
    additionalDataDisks: !item["additionalDataDisks"]
      ? item["additionalDataDisks"]
      : dataDiskArraySerializer(item["additionalDataDisks"]),
    stagingResourceGroup: item["stagingResourceGroup"],
    autoRun: !item["autoRun"] ? item["autoRun"] : imageTemplateAutoRunSerializer(item["autoRun"]),
    managedResourceTags: item["managedResourceTags"],
  };
}

export function imageTemplatePropertiesDeserializer(item: any): ImageTemplateProperties {
  return {
    source: imageTemplateSourceUnionDeserializer(item["source"]),
    customize: !item["customize"]
      ? item["customize"]
      : imageTemplateCustomizerUnionArrayDeserializer(item["customize"]),
    optimize: !item["optimize"]
      ? item["optimize"]
      : imageTemplatePropertiesOptimizeDeserializer(item["optimize"]),
    validate: !item["validate"]
      ? item["validate"]
      : imageTemplatePropertiesValidateDeserializer(item["validate"]),
    distribute: imageTemplateDistributorUnionArrayDeserializer(item["distribute"]),
    errorHandling: !item["errorHandling"]
      ? item["errorHandling"]
      : imageTemplatePropertiesErrorHandlingDeserializer(item["errorHandling"]),
    provisioningState: item["provisioningState"],
    provisioningError: !item["provisioningError"]
      ? item["provisioningError"]
      : provisioningErrorDeserializer(item["provisioningError"]),
    lastRunStatus: !item["lastRunStatus"]
      ? item["lastRunStatus"]
      : imageTemplateLastRunStatusDeserializer(item["lastRunStatus"]),
    buildTimeoutInMinutes: item["buildTimeoutInMinutes"],
    vmProfile: !item["vmProfile"]
      ? item["vmProfile"]
      : imageTemplateVmProfileDeserializer(item["vmProfile"]),
    additionalDataDisks: !item["additionalDataDisks"]
      ? item["additionalDataDisks"]
      : dataDiskArrayDeserializer(item["additionalDataDisks"]),
    stagingResourceGroup: item["stagingResourceGroup"],
    exactStagingResourceGroup: item["exactStagingResourceGroup"],
    autoRun: !item["autoRun"] ? item["autoRun"] : imageTemplateAutoRunDeserializer(item["autoRun"]),
    managedResourceTags: !item["managedResourceTags"]
      ? item["managedResourceTags"]
      : Object.fromEntries(
          Object.entries(item["managedResourceTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Describes a virtual machine image source for building, customizing and distributing */
export interface ImageTemplateSource {
  /** Specifies the type of source image you want to start with. */
  /** The discriminator possible values: PlatformImage, ManagedImage, SharedImageVersion */
  type: string;
}

export function imageTemplateSourceSerializer(item: ImageTemplateSource): any {
  return { type: item["type"] };
}

export function imageTemplateSourceDeserializer(item: any): ImageTemplateSource {
  return {
    type: item["type"],
  };
}

/** Alias for ImageTemplateSourceUnion */
export type ImageTemplateSourceUnion =
  | ImageTemplatePlatformImageSource
  | ImageTemplateManagedImageSource
  | ImageTemplateSharedImageVersionSource
  | ImageTemplateSource;

export function imageTemplateSourceUnionSerializer(item: ImageTemplateSourceUnion): any {
  switch (item.type) {
    case "PlatformImage":
      return imageTemplatePlatformImageSourceSerializer(item as ImageTemplatePlatformImageSource);

    case "ManagedImage":
      return imageTemplateManagedImageSourceSerializer(item as ImageTemplateManagedImageSource);

    case "SharedImageVersion":
      return imageTemplateSharedImageVersionSourceSerializer(
        item as ImageTemplateSharedImageVersionSource,
      );

    default:
      return imageTemplateSourceSerializer(item);
  }
}

export function imageTemplateSourceUnionDeserializer(item: any): ImageTemplateSourceUnion {
  switch (item["type"]) {
    case "PlatformImage":
      return imageTemplatePlatformImageSourceDeserializer(item as ImageTemplatePlatformImageSource);

    case "ManagedImage":
      return imageTemplateManagedImageSourceDeserializer(item as ImageTemplateManagedImageSource);

    case "SharedImageVersion":
      return imageTemplateSharedImageVersionSourceDeserializer(
        item as ImageTemplateSharedImageVersionSource,
      );

    default:
      return imageTemplateSourceDeserializer(item);
  }
}

/** Describes an image source from [Azure Gallery Images](https://docs.microsoft.com/en-us/rest/api/compute/virtualmachineimages). */
export interface ImageTemplatePlatformImageSource extends ImageTemplateSource {
  /** Image Publisher in [Azure Gallery Images](https://docs.microsoft.com/en-us/rest/api/compute/virtualmachineimages). */
  publisher?: string;
  /** Image offer from the [Azure Gallery Images](https://docs.microsoft.com/en-us/rest/api/compute/virtualmachineimages). */
  offer?: string;
  /** Image sku from the [Azure Gallery Images](https://docs.microsoft.com/en-us/rest/api/compute/virtualmachineimages). */
  sku?: string;
  /** Image version from the [Azure Gallery Images](https://docs.microsoft.com/en-us/rest/api/compute/virtualmachineimages). If 'latest' is specified here, the version is evaluated when the image build takes place, not when the template is submitted. */
  version?: string;
  /** Image version from the [Azure Gallery Images](https://docs.microsoft.com/en-us/rest/api/compute/virtualmachineimages). This readonly field differs from 'version', only if the value specified in 'version' field is 'latest'. */
  readonly exactVersion?: string;
  /** Optional configuration of purchase plan for platform image. */
  planInfo?: PlatformImagePurchasePlan;
  /** Specifies the type of source image you want to start with. */
  type: "PlatformImage";
}

export function imageTemplatePlatformImageSourceSerializer(
  item: ImageTemplatePlatformImageSource,
): any {
  return {
    type: item["type"],
    publisher: item["publisher"],
    offer: item["offer"],
    sku: item["sku"],
    version: item["version"],
    planInfo: !item["planInfo"]
      ? item["planInfo"]
      : platformImagePurchasePlanSerializer(item["planInfo"]),
  };
}

export function imageTemplatePlatformImageSourceDeserializer(
  item: any,
): ImageTemplatePlatformImageSource {
  return {
    type: item["type"],
    publisher: item["publisher"],
    offer: item["offer"],
    sku: item["sku"],
    version: item["version"],
    exactVersion: item["exactVersion"],
    planInfo: !item["planInfo"]
      ? item["planInfo"]
      : platformImagePurchasePlanDeserializer(item["planInfo"]),
  };
}

/** Purchase plan configuration for platform image. */
export interface PlatformImagePurchasePlan {
  /** Name of the purchase plan. */
  planName: string;
  /** Product of the purchase plan. */
  planProduct: string;
  /** Publisher of the purchase plan. */
  planPublisher: string;
}

export function platformImagePurchasePlanSerializer(item: PlatformImagePurchasePlan): any {
  return {
    planName: item["planName"],
    planProduct: item["planProduct"],
    planPublisher: item["planPublisher"],
  };
}

export function platformImagePurchasePlanDeserializer(item: any): PlatformImagePurchasePlan {
  return {
    planName: item["planName"],
    planProduct: item["planProduct"],
    planPublisher: item["planPublisher"],
  };
}

/** Describes an image source that is a managed image in customer subscription. This image must reside in the same subscription and region as the Image Builder template. */
export interface ImageTemplateManagedImageSource extends ImageTemplateSource {
  /** ARM resource id of the managed image in customer subscription */
  imageId: string;
  /** Specifies the type of source image you want to start with. */
  type: "ManagedImage";
}

export function imageTemplateManagedImageSourceSerializer(
  item: ImageTemplateManagedImageSource,
): any {
  return { type: item["type"], imageId: item["imageId"] };
}

export function imageTemplateManagedImageSourceDeserializer(
  item: any,
): ImageTemplateManagedImageSource {
  return {
    type: item["type"],
    imageId: item["imageId"],
  };
}

/** Describes an image source that is an image version in an Azure Compute Gallery or a Direct Shared Gallery. */
export interface ImageTemplateSharedImageVersionSource extends ImageTemplateSource {
  /** ARM resource id of the image version. When image version name is 'latest', the version is evaluated when the image build takes place. */
  imageVersionId: string;
  /** Exact ARM resource id of the image version. This readonly field differs from the image version Id in 'imageVersionId' only if the version name specified in 'imageVersionId' field is 'latest'. */
  readonly exactVersion?: string;
  /** Specifies the type of source image you want to start with. */
  type: "SharedImageVersion";
}

export function imageTemplateSharedImageVersionSourceSerializer(
  item: ImageTemplateSharedImageVersionSource,
): any {
  return { type: item["type"], imageVersionId: item["imageVersionId"] };
}

export function imageTemplateSharedImageVersionSourceDeserializer(
  item: any,
): ImageTemplateSharedImageVersionSource {
  return {
    type: item["type"],
    imageVersionId: item["imageVersionId"],
    exactVersion: item["exactVersion"],
  };
}

export function imageTemplateCustomizerUnionArraySerializer(
  result: Array<ImageTemplateCustomizerUnion>,
): any[] {
  return result.map((item) => {
    return imageTemplateCustomizerUnionSerializer(item);
  });
}

export function imageTemplateCustomizerUnionArrayDeserializer(
  result: Array<ImageTemplateCustomizerUnion>,
): any[] {
  return result.map((item) => {
    return imageTemplateCustomizerUnionDeserializer(item);
  });
}

/** Describes a unit of image customization */
export interface ImageTemplateCustomizer {
  /** The type of customization tool you want to use on the Image. For example, "Shell" can be shell customizer */
  /** The discriminator possible values: Shell, WindowsRestart, WindowsUpdate, PowerShell, File */
  type: string;
  /** Friendly Name to provide context on what this customization step does */
  name?: string;
}

export function imageTemplateCustomizerSerializer(item: ImageTemplateCustomizer): any {
  return { type: item["type"], name: item["name"] };
}

export function imageTemplateCustomizerDeserializer(item: any): ImageTemplateCustomizer {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** Alias for ImageTemplateCustomizerUnion */
export type ImageTemplateCustomizerUnion =
  | ImageTemplateShellCustomizer
  | ImageTemplateRestartCustomizer
  | ImageTemplateWindowsUpdateCustomizer
  | ImageTemplatePowerShellCustomizer
  | ImageTemplateFileCustomizer
  | ImageTemplateCustomizer;

export function imageTemplateCustomizerUnionSerializer(item: ImageTemplateCustomizerUnion): any {
  switch (item.type) {
    case "Shell":
      return imageTemplateShellCustomizerSerializer(item as ImageTemplateShellCustomizer);

    case "WindowsRestart":
      return imageTemplateRestartCustomizerSerializer(item as ImageTemplateRestartCustomizer);

    case "WindowsUpdate":
      return imageTemplateWindowsUpdateCustomizerSerializer(
        item as ImageTemplateWindowsUpdateCustomizer,
      );

    case "PowerShell":
      return imageTemplatePowerShellCustomizerSerializer(item as ImageTemplatePowerShellCustomizer);

    case "File":
      return imageTemplateFileCustomizerSerializer(item as ImageTemplateFileCustomizer);

    default:
      return imageTemplateCustomizerSerializer(item);
  }
}

export function imageTemplateCustomizerUnionDeserializer(item: any): ImageTemplateCustomizerUnion {
  switch (item["type"]) {
    case "Shell":
      return imageTemplateShellCustomizerDeserializer(item as ImageTemplateShellCustomizer);

    case "WindowsRestart":
      return imageTemplateRestartCustomizerDeserializer(item as ImageTemplateRestartCustomizer);

    case "WindowsUpdate":
      return imageTemplateWindowsUpdateCustomizerDeserializer(
        item as ImageTemplateWindowsUpdateCustomizer,
      );

    case "PowerShell":
      return imageTemplatePowerShellCustomizerDeserializer(
        item as ImageTemplatePowerShellCustomizer,
      );

    case "File":
      return imageTemplateFileCustomizerDeserializer(item as ImageTemplateFileCustomizer);

    default:
      return imageTemplateCustomizerDeserializer(item);
  }
}

/** Runs a shell script during the customization phase (Linux). Corresponds to Packer shell provisioner. Exactly one of 'scriptUri' or 'inline' can be specified. */
export interface ImageTemplateShellCustomizer extends ImageTemplateCustomizer {
  /** URI of the shell script to be run for customizing. It can be a github link, SAS URI for Azure Storage, etc */
  scriptUri?: string;
  /** SHA256 checksum of the shell script provided in the scriptUri field */
  sha256Checksum?: string;
  /** Array of shell commands to execute */
  inline?: string[];
  /** The type of customization tool you want to use on the Image. For example, "Shell" can be shell customizer */
  type: "Shell";
}

export function imageTemplateShellCustomizerSerializer(item: ImageTemplateShellCustomizer): any {
  return {
    type: item["type"],
    name: item["name"],
    scriptUri: item["scriptUri"],
    sha256Checksum: item["sha256Checksum"],
    inline: !item["inline"]
      ? item["inline"]
      : item["inline"].map((p: any) => {
          return p;
        }),
  };
}

export function imageTemplateShellCustomizerDeserializer(item: any): ImageTemplateShellCustomizer {
  return {
    type: item["type"],
    name: item["name"],
    scriptUri: item["scriptUri"],
    sha256Checksum: item["sha256Checksum"],
    inline: !item["inline"]
      ? item["inline"]
      : item["inline"].map((p: any) => {
          return p;
        }),
  };
}

/** Reboots a VM and waits for it to come back online (Windows). Corresponds to Packer windows-restart provisioner */
export interface ImageTemplateRestartCustomizer extends ImageTemplateCustomizer {
  /** Command to execute the restart [Default: 'shutdown /r /f /t 0 /c "packer restart"'] */
  restartCommand?: string;
  /** Command to check if restart succeeded [Default: ''] */
  restartCheckCommand?: string;
  /** Restart timeout specified as a string of magnitude and unit, e.g. '5m' (5 minutes) or '2h' (2 hours) [Default: '5m'] */
  restartTimeout?: string;
  /** The type of customization tool you want to use on the Image. For example, "Shell" can be shell customizer */
  type: "WindowsRestart";
}

export function imageTemplateRestartCustomizerSerializer(
  item: ImageTemplateRestartCustomizer,
): any {
  return {
    type: item["type"],
    name: item["name"],
    restartCommand: item["restartCommand"],
    restartCheckCommand: item["restartCheckCommand"],
    restartTimeout: item["restartTimeout"],
  };
}

export function imageTemplateRestartCustomizerDeserializer(
  item: any,
): ImageTemplateRestartCustomizer {
  return {
    type: item["type"],
    name: item["name"],
    restartCommand: item["restartCommand"],
    restartCheckCommand: item["restartCheckCommand"],
    restartTimeout: item["restartTimeout"],
  };
}

/** Installs Windows Updates. Corresponds to Packer Windows Update Provisioner (https://github.com/rgl/packer-provisioner-windows-update) */
export interface ImageTemplateWindowsUpdateCustomizer extends ImageTemplateCustomizer {
  /** Criteria to search updates. Omit or specify empty string to use the default (search all). Refer to above link for examples and detailed description of this field. */
  searchCriteria?: string;
  /** Array of filters to select updates to apply. Omit or specify empty array to use the default (no filter). Refer to above link for examples and detailed description of this field. */
  filters?: string[];
  /** Maximum number of updates to apply at a time. Omit or specify 0 to use the default (1000) */
  updateLimit?: number;
  /** The type of customization tool you want to use on the Image. For example, "Shell" can be shell customizer */
  type: "WindowsUpdate";
}

export function imageTemplateWindowsUpdateCustomizerSerializer(
  item: ImageTemplateWindowsUpdateCustomizer,
): any {
  return {
    type: item["type"],
    name: item["name"],
    searchCriteria: item["searchCriteria"],
    filters: !item["filters"]
      ? item["filters"]
      : item["filters"].map((p: any) => {
          return p;
        }),
    updateLimit: item["updateLimit"],
  };
}

export function imageTemplateWindowsUpdateCustomizerDeserializer(
  item: any,
): ImageTemplateWindowsUpdateCustomizer {
  return {
    type: item["type"],
    name: item["name"],
    searchCriteria: item["searchCriteria"],
    filters: !item["filters"]
      ? item["filters"]
      : item["filters"].map((p: any) => {
          return p;
        }),
    updateLimit: item["updateLimit"],
  };
}

/** Runs the specified PowerShell on the VM (Windows). Corresponds to Packer powershell provisioner. Exactly one of 'scriptUri' or 'inline' can be specified. */
export interface ImageTemplatePowerShellCustomizer extends ImageTemplateCustomizer {
  /** URI of the PowerShell script to be run for customizing. It can be a github link, SAS URI for Azure Storage, etc */
  scriptUri?: string;
  /** SHA256 checksum of the power shell script provided in the scriptUri field above */
  sha256Checksum?: string;
  /** Array of PowerShell commands to execute */
  inline?: string[];
  /** If specified, the PowerShell script will be run with elevated privileges */
  runElevated?: boolean;
  /** If specified, the PowerShell script will be run with elevated privileges using the Local System user. Can only be true when the runElevated field above is set to true. */
  runAsSystem?: boolean;
  /** Valid exit codes for the PowerShell script. [Default: 0] */
  validExitCodes?: number[];
  /** The type of customization tool you want to use on the Image. For example, "Shell" can be shell customizer */
  type: "PowerShell";
}

export function imageTemplatePowerShellCustomizerSerializer(
  item: ImageTemplatePowerShellCustomizer,
): any {
  return {
    type: item["type"],
    name: item["name"],
    scriptUri: item["scriptUri"],
    sha256Checksum: item["sha256Checksum"],
    inline: !item["inline"]
      ? item["inline"]
      : item["inline"].map((p: any) => {
          return p;
        }),
    runElevated: item["runElevated"],
    runAsSystem: item["runAsSystem"],
    validExitCodes: !item["validExitCodes"]
      ? item["validExitCodes"]
      : item["validExitCodes"].map((p: any) => {
          return p;
        }),
  };
}

export function imageTemplatePowerShellCustomizerDeserializer(
  item: any,
): ImageTemplatePowerShellCustomizer {
  return {
    type: item["type"],
    name: item["name"],
    scriptUri: item["scriptUri"],
    sha256Checksum: item["sha256Checksum"],
    inline: !item["inline"]
      ? item["inline"]
      : item["inline"].map((p: any) => {
          return p;
        }),
    runElevated: item["runElevated"],
    runAsSystem: item["runAsSystem"],
    validExitCodes: !item["validExitCodes"]
      ? item["validExitCodes"]
      : item["validExitCodes"].map((p: any) => {
          return p;
        }),
  };
}

/** Uploads files to VMs (Linux, Windows). Corresponds to Packer file provisioner */
export interface ImageTemplateFileCustomizer extends ImageTemplateCustomizer {
  /** The URI of the file to be uploaded for customizing the VM. It can be a github link, SAS URI for Azure Storage, etc */
  sourceUri?: string;
  /** SHA256 checksum of the file provided in the sourceUri field above */
  sha256Checksum?: string;
  /** The absolute path to a file (with nested directory structures already created) where the file (from sourceUri) will be uploaded to in the VM */
  destination?: string;
  /** The type of customization tool you want to use on the Image. For example, "Shell" can be shell customizer */
  type: "File";
}

export function imageTemplateFileCustomizerSerializer(item: ImageTemplateFileCustomizer): any {
  return {
    type: item["type"],
    name: item["name"],
    sourceUri: item["sourceUri"],
    sha256Checksum: item["sha256Checksum"],
    destination: item["destination"],
  };
}

export function imageTemplateFileCustomizerDeserializer(item: any): ImageTemplateFileCustomizer {
  return {
    type: item["type"],
    name: item["name"],
    sourceUri: item["sourceUri"],
    sha256Checksum: item["sha256Checksum"],
    destination: item["destination"],
  };
}

/** Specifies optimization to be performed on image. */
export interface ImageTemplatePropertiesOptimize {
  /** Optimization is applied on the image for a faster VM boot. */
  vmBoot?: ImageTemplatePropertiesOptimizeVmBoot;
  /** Optimization is applied on the image for specific workloads. */
  workload?: ImageTemplatePropertiesOptimizeWorkload;
}

export function imageTemplatePropertiesOptimizeSerializer(
  item: ImageTemplatePropertiesOptimize,
): any {
  return {
    vmBoot: !item["vmBoot"]
      ? item["vmBoot"]
      : imageTemplatePropertiesOptimizeVmBootSerializer(item["vmBoot"]),
    workload: !item["workload"]
      ? item["workload"]
      : imageTemplatePropertiesOptimizeWorkloadSerializer(item["workload"]),
  };
}

export function imageTemplatePropertiesOptimizeDeserializer(
  item: any,
): ImageTemplatePropertiesOptimize {
  return {
    vmBoot: !item["vmBoot"]
      ? item["vmBoot"]
      : imageTemplatePropertiesOptimizeVmBootDeserializer(item["vmBoot"]),
    workload: !item["workload"]
      ? item["workload"]
      : imageTemplatePropertiesOptimizeWorkloadDeserializer(item["workload"]),
  };
}

/** Optimization is applied on the image for a faster VM boot. */
export interface ImageTemplatePropertiesOptimizeVmBoot {
  /** Enabling this field will improve VM boot time by optimizing the final customized image output. */
  state?: VMBootOptimizationState;
}

export function imageTemplatePropertiesOptimizeVmBootSerializer(
  item: ImageTemplatePropertiesOptimizeVmBoot,
): any {
  return { state: item["state"] };
}

export function imageTemplatePropertiesOptimizeVmBootDeserializer(
  item: any,
): ImageTemplatePropertiesOptimizeVmBoot {
  return {
    state: item["state"],
  };
}

/** Enabling this field will improve VM boot time by optimizing the final customized image output. */
export type VMBootOptimizationState = "Enabled" | "Disabled";

/** Optimization is applied on the image for specific workloads. */
export interface ImageTemplatePropertiesOptimizeWorkload {
  /** Enabling this field will optimize vm images for specific workloads. */
  state?: WorkloadOptimizationState;
  /** URI of the script to be run for workload optimization. It can be a github link, SAS URI for Azure Storage, etc */
  scriptUri?: string;
  /** SHA256 checksum of the script provided in the scriptUri field */
  sha256Checksum?: string;
}

export function imageTemplatePropertiesOptimizeWorkloadSerializer(
  item: ImageTemplatePropertiesOptimizeWorkload,
): any {
  return {
    state: item["state"],
    scriptUri: item["scriptUri"],
    sha256Checksum: item["sha256Checksum"],
  };
}

export function imageTemplatePropertiesOptimizeWorkloadDeserializer(
  item: any,
): ImageTemplatePropertiesOptimizeWorkload {
  return {
    state: item["state"],
    scriptUri: item["scriptUri"],
    sha256Checksum: item["sha256Checksum"],
  };
}

/** Enabling this field will optimize vm images for specific workloads. */
export type WorkloadOptimizationState = "Enabled" | "Disabled";

/** Configuration options and list of validations to be performed on the resulting image. */
export interface ImageTemplatePropertiesValidate {
  /** If validation fails and this field is set to false, output image(s) will not be distributed. This is the default behavior. If validation fails and this field is set to true, output image(s) will still be distributed. Please use this option with caution as it may result in bad images being distributed for use. In either case (true or false), the end to end image run will be reported as having failed in case of a validation failure. [Note: This field has no effect if validation succeeds.] */
  continueDistributeOnFailure?: boolean;
  /** If this field is set to true, the image specified in the 'source' section will directly be validated. No separate build will be run to generate and then validate a customized image. */
  sourceValidationOnly?: boolean;
  /** List of validations to be performed. */
  inVMValidations?: ImageTemplateInVMValidatorUnion[];
}

export function imageTemplatePropertiesValidateSerializer(
  item: ImageTemplatePropertiesValidate,
): any {
  return {
    continueDistributeOnFailure: item["continueDistributeOnFailure"],
    sourceValidationOnly: item["sourceValidationOnly"],
    inVMValidations: !item["inVMValidations"]
      ? item["inVMValidations"]
      : imageTemplateInVMValidatorUnionArraySerializer(item["inVMValidations"]),
  };
}

export function imageTemplatePropertiesValidateDeserializer(
  item: any,
): ImageTemplatePropertiesValidate {
  return {
    continueDistributeOnFailure: item["continueDistributeOnFailure"],
    sourceValidationOnly: item["sourceValidationOnly"],
    inVMValidations: !item["inVMValidations"]
      ? item["inVMValidations"]
      : imageTemplateInVMValidatorUnionArrayDeserializer(item["inVMValidations"]),
  };
}

export function imageTemplateInVMValidatorUnionArraySerializer(
  result: Array<ImageTemplateInVMValidatorUnion>,
): any[] {
  return result.map((item) => {
    return imageTemplateInVMValidatorUnionSerializer(item);
  });
}

export function imageTemplateInVMValidatorUnionArrayDeserializer(
  result: Array<ImageTemplateInVMValidatorUnion>,
): any[] {
  return result.map((item) => {
    return imageTemplateInVMValidatorUnionDeserializer(item);
  });
}

/** Describes a unit of in-VM validation of image */
export interface ImageTemplateInVMValidator {
  /** The type of validation you want to use on the Image. For example, "Shell" can be shell validation */
  /** The discriminator possible values: Shell, PowerShell, File */
  type: string;
  /** Friendly Name to provide context on what this validation step does */
  name?: string;
}

export function imageTemplateInVMValidatorSerializer(item: ImageTemplateInVMValidator): any {
  return { type: item["type"], name: item["name"] };
}

export function imageTemplateInVMValidatorDeserializer(item: any): ImageTemplateInVMValidator {
  return {
    type: item["type"],
    name: item["name"],
  };
}

/** Alias for ImageTemplateInVMValidatorUnion */
export type ImageTemplateInVMValidatorUnion =
  | ImageTemplateShellValidator
  | ImageTemplatePowerShellValidator
  | ImageTemplateFileValidator
  | ImageTemplateInVMValidator;

export function imageTemplateInVMValidatorUnionSerializer(
  item: ImageTemplateInVMValidatorUnion,
): any {
  switch (item.type) {
    case "Shell":
      return imageTemplateShellValidatorSerializer(item as ImageTemplateShellValidator);

    case "PowerShell":
      return imageTemplatePowerShellValidatorSerializer(item as ImageTemplatePowerShellValidator);

    case "File":
      return imageTemplateFileValidatorSerializer(item as ImageTemplateFileValidator);

    default:
      return imageTemplateInVMValidatorSerializer(item);
  }
}

export function imageTemplateInVMValidatorUnionDeserializer(
  item: any,
): ImageTemplateInVMValidatorUnion {
  switch (item["type"]) {
    case "Shell":
      return imageTemplateShellValidatorDeserializer(item as ImageTemplateShellValidator);

    case "PowerShell":
      return imageTemplatePowerShellValidatorDeserializer(item as ImageTemplatePowerShellValidator);

    case "File":
      return imageTemplateFileValidatorDeserializer(item as ImageTemplateFileValidator);

    default:
      return imageTemplateInVMValidatorDeserializer(item);
  }
}

/** Runs the specified shell script during the validation phase (Linux). Corresponds to Packer shell provisioner. Exactly one of 'scriptUri' or 'inline' can be specified. */
export interface ImageTemplateShellValidator extends ImageTemplateInVMValidator {
  /** URI of the shell script to be run for validation. It can be a github link, Azure Storage URI, etc */
  scriptUri?: string;
  /** SHA256 checksum of the shell script provided in the scriptUri field */
  sha256Checksum?: string;
  /** Array of shell commands to execute */
  inline?: string[];
  /** The type of validation you want to use on the Image. For example, "Shell" can be shell validation */
  type: "Shell";
}

export function imageTemplateShellValidatorSerializer(item: ImageTemplateShellValidator): any {
  return {
    type: item["type"],
    name: item["name"],
    scriptUri: item["scriptUri"],
    sha256Checksum: item["sha256Checksum"],
    inline: !item["inline"]
      ? item["inline"]
      : item["inline"].map((p: any) => {
          return p;
        }),
  };
}

export function imageTemplateShellValidatorDeserializer(item: any): ImageTemplateShellValidator {
  return {
    type: item["type"],
    name: item["name"],
    scriptUri: item["scriptUri"],
    sha256Checksum: item["sha256Checksum"],
    inline: !item["inline"]
      ? item["inline"]
      : item["inline"].map((p: any) => {
          return p;
        }),
  };
}

/** Runs the specified PowerShell script during the validation phase (Windows). Corresponds to Packer powershell provisioner. Exactly one of 'scriptUri' or 'inline' can be specified. */
export interface ImageTemplatePowerShellValidator extends ImageTemplateInVMValidator {
  /** URI of the PowerShell script to be run for validation. It can be a github link, Azure Storage URI, etc */
  scriptUri?: string;
  /** SHA256 checksum of the power shell script provided in the scriptUri field above */
  sha256Checksum?: string;
  /** Array of PowerShell commands to execute */
  inline?: string[];
  /** If specified, the PowerShell script will be run with elevated privileges */
  runElevated?: boolean;
  /** If specified, the PowerShell script will be run with elevated privileges using the Local System user. Can only be true when the runElevated field above is set to true. */
  runAsSystem?: boolean;
  /** Valid exit codes for the PowerShell script. [Default: 0] */
  validExitCodes?: number[];
  /** The type of validation you want to use on the Image. For example, "Shell" can be shell validation */
  type: "PowerShell";
}

export function imageTemplatePowerShellValidatorSerializer(
  item: ImageTemplatePowerShellValidator,
): any {
  return {
    type: item["type"],
    name: item["name"],
    scriptUri: item["scriptUri"],
    sha256Checksum: item["sha256Checksum"],
    inline: !item["inline"]
      ? item["inline"]
      : item["inline"].map((p: any) => {
          return p;
        }),
    runElevated: item["runElevated"],
    runAsSystem: item["runAsSystem"],
    validExitCodes: !item["validExitCodes"]
      ? item["validExitCodes"]
      : item["validExitCodes"].map((p: any) => {
          return p;
        }),
  };
}

export function imageTemplatePowerShellValidatorDeserializer(
  item: any,
): ImageTemplatePowerShellValidator {
  return {
    type: item["type"],
    name: item["name"],
    scriptUri: item["scriptUri"],
    sha256Checksum: item["sha256Checksum"],
    inline: !item["inline"]
      ? item["inline"]
      : item["inline"].map((p: any) => {
          return p;
        }),
    runElevated: item["runElevated"],
    runAsSystem: item["runAsSystem"],
    validExitCodes: !item["validExitCodes"]
      ? item["validExitCodes"]
      : item["validExitCodes"].map((p: any) => {
          return p;
        }),
  };
}

/** Uploads files required for validation to VMs (Linux, Windows). Corresponds to Packer file provisioner */
export interface ImageTemplateFileValidator extends ImageTemplateInVMValidator {
  /** The URI of the file to be uploaded to the VM for validation. It can be a github link, Azure Storage URI (authorized or SAS), etc */
  sourceUri?: string;
  /** SHA256 checksum of the file provided in the sourceUri field above */
  sha256Checksum?: string;
  /** The absolute path to a file (with nested directory structures already created) where the file (from sourceUri) will be uploaded to in the VM */
  destination?: string;
  /** The type of validation you want to use on the Image. For example, "Shell" can be shell validation */
  type: "File";
}

export function imageTemplateFileValidatorSerializer(item: ImageTemplateFileValidator): any {
  return {
    type: item["type"],
    name: item["name"],
    sourceUri: item["sourceUri"],
    sha256Checksum: item["sha256Checksum"],
    destination: item["destination"],
  };
}

export function imageTemplateFileValidatorDeserializer(item: any): ImageTemplateFileValidator {
  return {
    type: item["type"],
    name: item["name"],
    sourceUri: item["sourceUri"],
    sha256Checksum: item["sha256Checksum"],
    destination: item["destination"],
  };
}

export function imageTemplateDistributorUnionArraySerializer(
  result: Array<ImageTemplateDistributorUnion>,
): any[] {
  return result.map((item) => {
    return imageTemplateDistributorUnionSerializer(item);
  });
}

export function imageTemplateDistributorUnionArrayDeserializer(
  result: Array<ImageTemplateDistributorUnion>,
): any[] {
  return result.map((item) => {
    return imageTemplateDistributorUnionDeserializer(item);
  });
}

/** Generic distribution object */
export interface ImageTemplateDistributor {
  /** Type of distribution. */
  /** The discriminator possible values: ManagedImage, SharedImage, VHD */
  type: string;
  /** The name to be used for the associated RunOutput. */
  runOutputName: string;
  /** Tags that will be applied to the artifact once it has been created/updated by the distributor. */
  artifactTags?: Record<string, string>;
}

export function imageTemplateDistributorSerializer(item: ImageTemplateDistributor): any {
  return {
    type: item["type"],
    runOutputName: item["runOutputName"],
    artifactTags: item["artifactTags"],
  };
}

export function imageTemplateDistributorDeserializer(item: any): ImageTemplateDistributor {
  return {
    type: item["type"],
    runOutputName: item["runOutputName"],
    artifactTags: !item["artifactTags"]
      ? item["artifactTags"]
      : Object.fromEntries(
          Object.entries(item["artifactTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Alias for ImageTemplateDistributorUnion */
export type ImageTemplateDistributorUnion =
  | ImageTemplateManagedImageDistributor
  | ImageTemplateSharedImageDistributor
  | ImageTemplateVhdDistributor
  | ImageTemplateDistributor;

export function imageTemplateDistributorUnionSerializer(item: ImageTemplateDistributorUnion): any {
  switch (item.type) {
    case "ManagedImage":
      return imageTemplateManagedImageDistributorSerializer(
        item as ImageTemplateManagedImageDistributor,
      );

    case "SharedImage":
      return imageTemplateSharedImageDistributorSerializer(
        item as ImageTemplateSharedImageDistributor,
      );

    case "VHD":
      return imageTemplateVhdDistributorSerializer(item as ImageTemplateVhdDistributor);

    default:
      return imageTemplateDistributorSerializer(item);
  }
}

export function imageTemplateDistributorUnionDeserializer(
  item: any,
): ImageTemplateDistributorUnion {
  switch (item["type"]) {
    case "ManagedImage":
      return imageTemplateManagedImageDistributorDeserializer(
        item as ImageTemplateManagedImageDistributor,
      );

    case "SharedImage":
      return imageTemplateSharedImageDistributorDeserializer(
        item as ImageTemplateSharedImageDistributor,
      );

    case "VHD":
      return imageTemplateVhdDistributorDeserializer(item as ImageTemplateVhdDistributor);

    default:
      return imageTemplateDistributorDeserializer(item);
  }
}

/** Distribute as a Managed Disk Image. */
export interface ImageTemplateManagedImageDistributor extends ImageTemplateDistributor {
  /** Resource Id of the Managed Disk Image */
  imageId: string;
  /** Azure location for the image, should match if image already exists */
  location: string;
  /** Type of distribution. */
  type: "ManagedImage";
}

export function imageTemplateManagedImageDistributorSerializer(
  item: ImageTemplateManagedImageDistributor,
): any {
  return {
    type: item["type"],
    runOutputName: item["runOutputName"],
    artifactTags: item["artifactTags"],
    imageId: item["imageId"],
    location: item["location"],
  };
}

export function imageTemplateManagedImageDistributorDeserializer(
  item: any,
): ImageTemplateManagedImageDistributor {
  return {
    type: item["type"],
    runOutputName: item["runOutputName"],
    artifactTags: !item["artifactTags"]
      ? item["artifactTags"]
      : Object.fromEntries(
          Object.entries(item["artifactTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    imageId: item["imageId"],
    location: item["location"],
  };
}

/** Distribute via Azure Compute Gallery. */
export interface ImageTemplateSharedImageDistributor extends ImageTemplateDistributor {
  /** Resource Id of the Azure Compute Gallery image */
  galleryImageId: string;
  /** [Deprecated] A list of regions that the image will be replicated to. This list can be specified only if targetRegions is not specified. This field is deprecated - use targetRegions instead. */
  replicationRegions?: string[];
  /** Flag that indicates whether created image version should be excluded from latest. Omit to use the default (false). */
  excludeFromLatest?: boolean;
  /** [Deprecated] Storage account type to be used to store the shared image. Omit to use the default (Standard_LRS). This field can be specified only if replicationRegions is specified. This field is deprecated - use targetRegions instead. */
  storageAccountType?: SharedImageStorageAccountType;
  /** The target regions where the distributed Image Version is going to be replicated to. This object supersedes replicationRegions and can be specified only if replicationRegions is not specified. */
  targetRegions?: TargetRegion[];
  /** Describes how to generate new x.y.z version number for distribution. */
  versioning?: DistributeVersionerUnion;
  /** Describes replication mode for distribution in Azure Compute Gallery. Omit to use the default (Full). */
  replicationMode?: ReplicationMode;
  /** Type of distribution. */
  type: "SharedImage";
}

export function imageTemplateSharedImageDistributorSerializer(
  item: ImageTemplateSharedImageDistributor,
): any {
  return {
    type: item["type"],
    runOutputName: item["runOutputName"],
    artifactTags: item["artifactTags"],
    galleryImageId: item["galleryImageId"],
    replicationRegions: !item["replicationRegions"]
      ? item["replicationRegions"]
      : item["replicationRegions"].map((p: any) => {
          return p;
        }),
    excludeFromLatest: item["excludeFromLatest"],
    storageAccountType: item["storageAccountType"],
    targetRegions: !item["targetRegions"]
      ? item["targetRegions"]
      : targetRegionArraySerializer(item["targetRegions"]),
    versioning: !item["versioning"]
      ? item["versioning"]
      : distributeVersionerUnionSerializer(item["versioning"]),
    replicationMode: item["replicationMode"],
  };
}

export function imageTemplateSharedImageDistributorDeserializer(
  item: any,
): ImageTemplateSharedImageDistributor {
  return {
    type: item["type"],
    runOutputName: item["runOutputName"],
    artifactTags: !item["artifactTags"]
      ? item["artifactTags"]
      : Object.fromEntries(
          Object.entries(item["artifactTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    galleryImageId: item["galleryImageId"],
    replicationRegions: !item["replicationRegions"]
      ? item["replicationRegions"]
      : item["replicationRegions"].map((p: any) => {
          return p;
        }),
    excludeFromLatest: item["excludeFromLatest"],
    storageAccountType: item["storageAccountType"],
    targetRegions: !item["targetRegions"]
      ? item["targetRegions"]
      : targetRegionArrayDeserializer(item["targetRegions"]),
    versioning: !item["versioning"]
      ? item["versioning"]
      : distributeVersionerUnionDeserializer(item["versioning"]),
    replicationMode: item["replicationMode"],
  };
}

/** Specifies the storage account type to be used to store the Azure Compute Gallery image version in. */
export enum KnownSharedImageStorageAccountType {
  /** Standard_LRS */
  StandardLRS = "Standard_LRS",
  /** Standard_ZRS */
  StandardZRS = "Standard_ZRS",
  /** Premium_LRS */
  PremiumLRS = "Premium_LRS",
}

/**
 * Specifies the storage account type to be used to store the Azure Compute Gallery image version in. \
 * {@link KnownSharedImageStorageAccountType} can be used interchangeably with SharedImageStorageAccountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_LRS**: Standard_LRS \
 * **Standard_ZRS**: Standard_ZRS \
 * **Premium_LRS**: Premium_LRS
 */
export type SharedImageStorageAccountType = string;

export function targetRegionArraySerializer(result: Array<TargetRegion>): any[] {
  return result.map((item) => {
    return targetRegionSerializer(item);
  });
}

export function targetRegionArrayDeserializer(result: Array<TargetRegion>): any[] {
  return result.map((item) => {
    return targetRegionDeserializer(item);
  });
}

/** Describes the target region information. */
export interface TargetRegion {
  /** The name of the region. */
  name: string;
  /** The number of replicas of the Image Version to be created in this region. Omit to use the default (1). */
  replicaCount?: number;
  /** Specifies the storage account type to be used to store the image in this region. Omit to use the default (Standard_LRS). */
  storageAccountType?: SharedImageStorageAccountType;
}

export function targetRegionSerializer(item: TargetRegion): any {
  return {
    name: item["name"],
    replicaCount: item["replicaCount"],
    storageAccountType: item["storageAccountType"],
  };
}

export function targetRegionDeserializer(item: any): TargetRegion {
  return {
    name: item["name"],
    replicaCount: item["replicaCount"],
    storageAccountType: item["storageAccountType"],
  };
}

/** Describes how to generate new x.y.z version number for distribution. */
export interface DistributeVersioner {
  /** Version numbering scheme to be used. */
  /** The discriminator possible values: Latest, Source */
  scheme: string;
}

export function distributeVersionerSerializer(item: DistributeVersioner): any {
  return { scheme: item["scheme"] };
}

export function distributeVersionerDeserializer(item: any): DistributeVersioner {
  return {
    scheme: item["scheme"],
  };
}

/** Alias for DistributeVersionerUnion */
export type DistributeVersionerUnion =
  DistributeVersionerLatest | DistributeVersionerSource | DistributeVersioner;

export function distributeVersionerUnionSerializer(item: DistributeVersionerUnion): any {
  switch (item.scheme) {
    case "Latest":
      return distributeVersionerLatestSerializer(item as DistributeVersionerLatest);

    case "Source":
      return distributeVersionerSourceSerializer(item as DistributeVersionerSource);

    default:
      return distributeVersionerSerializer(item);
  }
}

export function distributeVersionerUnionDeserializer(item: any): DistributeVersionerUnion {
  switch (item["scheme"]) {
    case "Latest":
      return distributeVersionerLatestDeserializer(item as DistributeVersionerLatest);

    case "Source":
      return distributeVersionerSourceDeserializer(item as DistributeVersionerSource);

    default:
      return distributeVersionerDeserializer(item);
  }
}

/** Generates version number that will be latest based on existing version numbers. */
export interface DistributeVersionerLatest extends DistributeVersioner {
  /** Major version for the generated version number. Determine what is "latest" based on versions with this value as the major version. -1 is equivalent to leaving it unset. */
  major?: number;
  /** Version numbering scheme to be used. */
  scheme: "Latest";
}

export function distributeVersionerLatestSerializer(item: DistributeVersionerLatest): any {
  return { scheme: item["scheme"], major: item["major"] };
}

export function distributeVersionerLatestDeserializer(item: any): DistributeVersionerLatest {
  return {
    scheme: item["scheme"],
    major: item["major"],
  };
}

/** Generates version number based on version number of source image */
export interface DistributeVersionerSource extends DistributeVersioner {
  /** Version numbering scheme to be used. */
  scheme: "Source";
}

export function distributeVersionerSourceSerializer(item: DistributeVersionerSource): any {
  return { scheme: item["scheme"] };
}

export function distributeVersionerSourceDeserializer(item: any): DistributeVersionerSource {
  return {
    scheme: item["scheme"],
  };
}

/** Describes replication mode for distribution in Azure Compute Gallery. Omit to use the default (Full). */
export enum KnownReplicationMode {
  /** Full replication mode */
  Full = "Full",
  /** Shallow replication mode */
  Shallow = "Shallow",
}

/**
 * Describes replication mode for distribution in Azure Compute Gallery. Omit to use the default (Full). \
 * {@link KnownReplicationMode} can be used interchangeably with ReplicationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Full**: Full replication mode \
 * **Shallow**: Shallow replication mode
 */
export type ReplicationMode = string;

/** Distribute via VHD in a storage account. */
export interface ImageTemplateVhdDistributor extends ImageTemplateDistributor {
  /** Optional Azure Storage URI for the distributed VHD blob. Omit to use the default (empty string) in which case VHD would be published to the storage account in the staging resource group. */
  uri?: string;
  /** Type of distribution. */
  type: "VHD";
}

export function imageTemplateVhdDistributorSerializer(item: ImageTemplateVhdDistributor): any {
  return {
    type: item["type"],
    runOutputName: item["runOutputName"],
    artifactTags: item["artifactTags"],
    uri: item["uri"],
  };
}

export function imageTemplateVhdDistributorDeserializer(item: any): ImageTemplateVhdDistributor {
  return {
    type: item["type"],
    runOutputName: item["runOutputName"],
    artifactTags: !item["artifactTags"]
      ? item["artifactTags"]
      : Object.fromEntries(
          Object.entries(item["artifactTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    uri: item["uri"],
  };
}

/** Error handling options upon a build failure */
export interface ImageTemplatePropertiesErrorHandling {
  /** If there is a customizer error and this field is set to 'cleanup', the build VM and associated network resources will be cleaned up. This is the default behavior. If there is a customizer error and this field is set to 'abort', the build VM will be preserved. */
  onCustomizerError?: OnBuildError;
  /** If there is a validation error and this field is set to 'cleanup', the build VM and associated network resources will be cleaned up. This is the default behavior. If there is a validation error and this field is set to 'abort', the build VM will be preserved. */
  onValidationError?: OnBuildError;
}

export function imageTemplatePropertiesErrorHandlingSerializer(
  item: ImageTemplatePropertiesErrorHandling,
): any {
  return {
    onCustomizerError: item["onCustomizerError"],
    onValidationError: item["onValidationError"],
  };
}

export function imageTemplatePropertiesErrorHandlingDeserializer(
  item: any,
): ImageTemplatePropertiesErrorHandling {
  return {
    onCustomizerError: item["onCustomizerError"],
    onValidationError: item["onValidationError"],
  };
}

/** Error handling behavior upon build failure */
export enum KnownOnBuildError {
  /** cleanup */
  Cleanup = "cleanup",
  /** abort */
  Abort = "abort",
}

/**
 * Error handling behavior upon build failure \
 * {@link KnownOnBuildError} can be used interchangeably with OnBuildError,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **cleanup**: cleanup \
 * **abort**: abort
 */
export type OnBuildError = string;

/** Describes the error happened when create or update an image template */
export interface ProvisioningError {
  /** Error code of the provisioning failure */
  provisioningErrorCode?: ProvisioningErrorCode;
  /** Verbose error message about the provisioning failure */
  message?: string;
}

export function provisioningErrorDeserializer(item: any): ProvisioningError {
  return {
    provisioningErrorCode: item["provisioningErrorCode"],
    message: item["message"],
  };
}

/** Error code of the provisioning failure */
export enum KnownProvisioningErrorCode {
  /** BadSourceType */
  BadSourceType = "BadSourceType",
  /** BadPIRSource */
  BadPIRSource = "BadPIRSource",
  /** BadManagedImageSource */
  BadManagedImageSource = "BadManagedImageSource",
  /** BadSharedImageVersionSource */
  BadSharedImageVersionSource = "BadSharedImageVersionSource",
  /** BadCustomizerType */
  BadCustomizerType = "BadCustomizerType",
  /** UnsupportedCustomizerType */
  UnsupportedCustomizerType = "UnsupportedCustomizerType",
  /** NoCustomizerScript */
  NoCustomizerScript = "NoCustomizerScript",
  /** BadValidatorType */
  BadValidatorType = "BadValidatorType",
  /** UnsupportedValidatorType */
  UnsupportedValidatorType = "UnsupportedValidatorType",
  /** NoValidatorScript */
  NoValidatorScript = "NoValidatorScript",
  /** BadDistributeType */
  BadDistributeType = "BadDistributeType",
  /** BadSharedImageDistribute */
  BadSharedImageDistribute = "BadSharedImageDistribute",
  /** BadStagingResourceGroup */
  BadStagingResourceGroup = "BadStagingResourceGroup",
  /** ServerError */
  ServerError = "ServerError",
  /** Other */
  Other = "Other",
}

/**
 * Error code of the provisioning failure \
 * {@link KnownProvisioningErrorCode} can be used interchangeably with ProvisioningErrorCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BadSourceType**: BadSourceType \
 * **BadPIRSource**: BadPIRSource \
 * **BadManagedImageSource**: BadManagedImageSource \
 * **BadSharedImageVersionSource**: BadSharedImageVersionSource \
 * **BadCustomizerType**: BadCustomizerType \
 * **UnsupportedCustomizerType**: UnsupportedCustomizerType \
 * **NoCustomizerScript**: NoCustomizerScript \
 * **BadValidatorType**: BadValidatorType \
 * **UnsupportedValidatorType**: UnsupportedValidatorType \
 * **NoValidatorScript**: NoValidatorScript \
 * **BadDistributeType**: BadDistributeType \
 * **BadSharedImageDistribute**: BadSharedImageDistribute \
 * **BadStagingResourceGroup**: BadStagingResourceGroup \
 * **ServerError**: ServerError \
 * **Other**: Other
 */
export type ProvisioningErrorCode = string;

/** Describes the latest status of running an image template */
export interface ImageTemplateLastRunStatus {
  /** Start time of the last run (UTC) */
  startTime?: Date;
  /** End time of the last run (UTC) */
  endTime?: Date;
  /** State of the last run */
  runState?: RunState;
  /** Sub-state of the last run */
  runSubState?: RunSubState;
  /** Verbose information about the last run state */
  message?: string;
}

export function imageTemplateLastRunStatusDeserializer(item: any): ImageTemplateLastRunStatus {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    runState: item["runState"],
    runSubState: item["runSubState"],
    message: item["message"],
  };
}

/** State of the last run */
export type RunState =
  "Running" | "Canceling" | "Succeeded" | "PartiallySucceeded" | "Failed" | "Canceled";
/** Sub-state of the last run */
export type RunSubState =
  "Queued" | "Building" | "Customizing" | "Optimizing" | "Validating" | "Distributing";

/** Describes the virtual machines used to build and validate images */
export interface ImageTemplateVmProfile {
  /** Size of the virtual machine used to build, customize and capture images. Omit or specify empty string to use the default (Standard_D1_v2 for Gen1 images and Standard_D2ds_v4 for Gen2 images). */
  vmSize?: string;
  /** Size of the OS disk in GB. Omit or specify 0 to use Azure's default OS disk size. */
  osDiskSizeGB?: number;
  /** Optional array of resource IDs of user assigned managed identities to be configured on the build VM and validation VM. This may include the identity of the image template. */
  userAssignedIdentities?: string[];
  /** Optional configuration of the virtual network to use to deploy the build VM and validation VM in. Omit if no specific virtual network needs to be used. */
  vnetConfig?: VirtualNetworkConfig;
}

export function imageTemplateVmProfileSerializer(item: ImageTemplateVmProfile): any {
  return {
    vmSize: item["vmSize"],
    osDiskSizeGB: item["osDiskSizeGB"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : item["userAssignedIdentities"].map((p: any) => {
          return p;
        }),
    vnetConfig: !item["vnetConfig"]
      ? item["vnetConfig"]
      : virtualNetworkConfigSerializer(item["vnetConfig"]),
  };
}

export function imageTemplateVmProfileDeserializer(item: any): ImageTemplateVmProfile {
  return {
    vmSize: item["vmSize"],
    osDiskSizeGB: item["osDiskSizeGB"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : item["userAssignedIdentities"].map((p: any) => {
          return p;
        }),
    vnetConfig: !item["vnetConfig"]
      ? item["vnetConfig"]
      : virtualNetworkConfigDeserializer(item["vnetConfig"]),
  };
}

/** Virtual Network configuration. */
export interface VirtualNetworkConfig {
  /** Resource id of a pre-existing subnet on which the build VM and validation VM will be deployed */
  subnetId?: string;
  /** Resource id of a pre-existing subnet on which Azure Container Instance will be deployed for Isolated Builds. This field may be specified only if `subnetId` is also specified and must be on the same Virtual Network as the subnet specified in `subnetId`. */
  containerInstanceSubnetId?: string;
  /** Size of the proxy virtual machine used to pass traffic to the build VM and validation VM. This must not be specified if `containerInstanceSubnetId` is specified because no proxy virtual machine is deployed in that case. Omit or specify empty string to use the default (Standard_A1_v2). */
  proxyVmSize?: string;
}

export function virtualNetworkConfigSerializer(item: VirtualNetworkConfig): any {
  return {
    subnetId: item["subnetId"],
    containerInstanceSubnetId: item["containerInstanceSubnetId"],
    proxyVmSize: item["proxyVmSize"],
  };
}

export function virtualNetworkConfigDeserializer(item: any): VirtualNetworkConfig {
  return {
    subnetId: item["subnetId"],
    containerInstanceSubnetId: item["containerInstanceSubnetId"],
    proxyVmSize: item["proxyVmSize"],
  };
}

export function dataDiskArraySerializer(result: Array<DataDisk>): any[] {
  return result.map((item) => {
    return dataDiskSerializer(item);
  });
}

export function dataDiskArrayDeserializer(result: Array<DataDisk>): any[] {
  return result.map((item) => {
    return dataDiskDeserializer(item);
  });
}

/** Data disk properties. */
export interface DataDisk {
  /** Size of the data disk in GB. */
  sizeGB?: number;
}

export function dataDiskSerializer(item: DataDisk): any {
  return { sizeGB: item["sizeGB"] };
}

export function dataDiskDeserializer(item: any): DataDisk {
  return {
    sizeGB: item["sizeGB"],
  };
}

/** Indicates if the image template needs to be built on create/update */
export interface ImageTemplateAutoRun {
  /** Enabling this field will trigger an automatic build on image template creation or update. */
  state?: AutoRunState;
}

export function imageTemplateAutoRunSerializer(item: ImageTemplateAutoRun): any {
  return { state: item["state"] };
}

export function imageTemplateAutoRunDeserializer(item: any): ImageTemplateAutoRun {
  return {
    state: item["state"],
  };
}

/** Enabling this field will trigger an automatic build on image template creation or update. */
export type AutoRunState = "Enabled" | "Disabled";

/** Identity for the image template. */
export interface ImageTemplateIdentity {
  /** The type of identity used for the image template. The type 'None' will remove any identities from the image template. */
  type?: ResourceIdentityType;
  /** The set of user assigned identities associated with the resource. The userAssignedIdentities dictionary keys will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}. The dictionary values can be empty objects ({}) in requests. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function imageTemplateIdentitySerializer(item: ImageTemplateIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function imageTemplateIdentityDeserializer(item: any): ImageTemplateIdentity {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The type of identity used for the image template. The type 'None' will remove any identities from the image template. */
export type ResourceIdentityType = "UserAssigned" | "None";

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

/** Parameters for updating an image template. */
export interface ImageTemplateUpdateParameters {
  /** The identity of the image template, if configured. */
  identity?: ImageTemplateIdentity;
  /** The user-specified tags associated with the image template. */
  tags?: Record<string, string>;
  /** Parameters for updating an image template. */
  properties?: ImageTemplateUpdateParametersProperties;
}

export function imageTemplateUpdateParametersSerializer(item: ImageTemplateUpdateParameters): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : imageTemplateIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : imageTemplateUpdateParametersPropertiesSerializer(item["properties"]),
  };
}

/** Parameters for updating an image template. */
export interface ImageTemplateUpdateParametersProperties {
  /** The distribution targets where the image output needs to go to. */
  distribute?: ImageTemplateDistributorUnion[];
  /** Describes how virtual machine is set up to build images */
  vmProfile?: ImageTemplateVmProfile;
}

export function imageTemplateUpdateParametersPropertiesSerializer(
  item: ImageTemplateUpdateParametersProperties,
): any {
  return {
    distribute: !item["distribute"]
      ? item["distribute"]
      : imageTemplateDistributorUnionArraySerializer(item["distribute"]),
    vmProfile: !item["vmProfile"]
      ? item["vmProfile"]
      : imageTemplateVmProfileSerializer(item["vmProfile"]),
  };
}

/** The response of a ImageTemplate list operation. */
export interface _ImageTemplateListResult {
  /** The ImageTemplate items on this page */
  value: ImageTemplate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _imageTemplateListResultDeserializer(item: any): _ImageTemplateListResult {
  return {
    value: imageTemplateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function imageTemplateArraySerializer(result: Array<ImageTemplate>): any[] {
  return result.map((item) => {
    return imageTemplateSerializer(item);
  });
}

export function imageTemplateArrayDeserializer(result: Array<ImageTemplate>): any[] {
  return result.map((item) => {
    return imageTemplateDeserializer(item);
  });
}

/** Represents an output that was created by running an image template. */
export interface RunOutput extends ProxyResource {
  /** The resource id of the artifact. */
  artifactId?: string;
  /** The location URI of the artifact. */
  artifactUri?: string;
  /** Provisioning state of the resource */
  readonly provisioningState?: ProvisioningState;
}

export function runOutputDeserializer(item: any): RunOutput {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _runOutputPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a run output */
export interface RunOutputProperties {
  /** The resource id of the artifact. */
  artifactId?: string;
  /** The location URI of the artifact. */
  artifactUri?: string;
  /** Provisioning state of the resource */
  readonly provisioningState?: ProvisioningState;
}

export function runOutputPropertiesDeserializer(item: any): RunOutputProperties {
  return {
    artifactId: item["artifactId"],
    artifactUri: item["artifactUri"],
    provisioningState: item["provisioningState"],
  };
}

/** The result of List run outputs operation */
export interface _RunOutputCollection {
  /** The RunOutput items on this page */
  value: RunOutput[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _runOutputCollectionDeserializer(item: any): _RunOutputCollection {
  return {
    value: runOutputArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function runOutputArrayDeserializer(result: Array<RunOutput>): any[] {
  return result.map((item) => {
    return runOutputDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-10-01 API version. */
  V20251001 = "2025-10-01",
}

export function _imageTemplatePropertiesSerializer(item: ImageTemplate): any {
  return {
    source: !item["source"] ? item["source"] : imageTemplateSourceUnionSerializer(item["source"]),
    customize: !item["customize"]
      ? item["customize"]
      : imageTemplateCustomizerUnionArraySerializer(item["customize"]),
    optimize: !item["optimize"]
      ? item["optimize"]
      : imageTemplatePropertiesOptimizeSerializer(item["optimize"]),
    validate: !item["validate"]
      ? item["validate"]
      : imageTemplatePropertiesValidateSerializer(item["validate"]),
    distribute: !item["distribute"]
      ? item["distribute"]
      : imageTemplateDistributorUnionArraySerializer(item["distribute"]),
    errorHandling: !item["errorHandling"]
      ? item["errorHandling"]
      : imageTemplatePropertiesErrorHandlingSerializer(item["errorHandling"]),
    buildTimeoutInMinutes: item["buildTimeoutInMinutes"],
    vmProfile: !item["vmProfile"]
      ? item["vmProfile"]
      : imageTemplateVmProfileSerializer(item["vmProfile"]),
    additionalDataDisks: !item["additionalDataDisks"]
      ? item["additionalDataDisks"]
      : dataDiskArraySerializer(item["additionalDataDisks"]),
    stagingResourceGroup: item["stagingResourceGroup"],
    autoRun: !item["autoRun"] ? item["autoRun"] : imageTemplateAutoRunSerializer(item["autoRun"]),
    managedResourceTags: item["managedResourceTags"],
  };
}

export function _imageTemplatePropertiesDeserializer(item: any) {
  return {
    source: !item["source"] ? item["source"] : imageTemplateSourceUnionDeserializer(item["source"]),
    customize: !item["customize"]
      ? item["customize"]
      : imageTemplateCustomizerUnionArrayDeserializer(item["customize"]),
    optimize: !item["optimize"]
      ? item["optimize"]
      : imageTemplatePropertiesOptimizeDeserializer(item["optimize"]),
    validate: !item["validate"]
      ? item["validate"]
      : imageTemplatePropertiesValidateDeserializer(item["validate"]),
    distribute: !item["distribute"]
      ? item["distribute"]
      : imageTemplateDistributorUnionArrayDeserializer(item["distribute"]),
    errorHandling: !item["errorHandling"]
      ? item["errorHandling"]
      : imageTemplatePropertiesErrorHandlingDeserializer(item["errorHandling"]),
    provisioningState: item["provisioningState"],
    provisioningError: !item["provisioningError"]
      ? item["provisioningError"]
      : provisioningErrorDeserializer(item["provisioningError"]),
    lastRunStatus: !item["lastRunStatus"]
      ? item["lastRunStatus"]
      : imageTemplateLastRunStatusDeserializer(item["lastRunStatus"]),
    buildTimeoutInMinutes: item["buildTimeoutInMinutes"],
    vmProfile: !item["vmProfile"]
      ? item["vmProfile"]
      : imageTemplateVmProfileDeserializer(item["vmProfile"]),
    additionalDataDisks: !item["additionalDataDisks"]
      ? item["additionalDataDisks"]
      : dataDiskArrayDeserializer(item["additionalDataDisks"]),
    stagingResourceGroup: item["stagingResourceGroup"],
    exactStagingResourceGroup: item["exactStagingResourceGroup"],
    autoRun: !item["autoRun"] ? item["autoRun"] : imageTemplateAutoRunDeserializer(item["autoRun"]),
    managedResourceTags: !item["managedResourceTags"]
      ? item["managedResourceTags"]
      : Object.fromEntries(
          Object.entries(item["managedResourceTags"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function _runOutputPropertiesDeserializer(item: any) {
  return {
    artifactId: item["artifactId"],
    artifactUri: item["artifactUri"],
    provisioningState: item["provisioningState"],
  };
}
