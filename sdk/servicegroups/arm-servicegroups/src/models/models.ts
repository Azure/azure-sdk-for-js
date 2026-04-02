// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The serviceGroup details. */
export interface ServiceGroup extends ProxyResource {
  /** ServiceGroup creation request body parameters. */
  properties?: ServiceGroupProperties;
  /** The kind of the serviceGroup. */
  kind?: string;
  /** The serviceGroup tags. */
  tags?: Record<string, string>;
}

export function serviceGroupSerializer(item: ServiceGroup): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : serviceGroupPropertiesSerializer(item["properties"]),
    kind: item["kind"],
    tags: item["tags"],
  };
}

export function serviceGroupDeserializer(item: any): ServiceGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : serviceGroupPropertiesDeserializer(item["properties"]),
    kind: item["kind"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** ServiceGroup creation request body parameters. */
export interface ServiceGroupProperties {
  /** The provisioning state of the serviceGroup. For example, Running */
  readonly provisioningState?: ProvisioningState;
  /** The display name of the serviceGroup. For example, ServiceGroupTest1 */
  displayName?: string;
  /** The details of the parent serviceGroup. */
  parent?: ParentServiceGroupProperties;
}

export function serviceGroupPropertiesSerializer(item: ServiceGroupProperties): any {
  return {
    displayName: item["displayName"],
    parent: !item["parent"]
      ? item["parent"]
      : parentServiceGroupPropertiesSerializer(item["parent"]),
  };
}

export function serviceGroupPropertiesDeserializer(item: any): ServiceGroupProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    parent: !item["parent"]
      ? item["parent"]
      : parentServiceGroupPropertiesDeserializer(item["parent"]),
  };
}

/** The provisioning state of the serviceGroup. For example, Running */
export enum KnownProvisioningState {
  /** NotStarted */
  NotStarted = "NotStarted",
  /** Running */
  Running = "Running",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the serviceGroup. For example, Running \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: NotStarted \
 * **Running**: Running \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled
 */
export type ProvisioningState = string;

/** The details of the parent serviceGroup. */
export interface ParentServiceGroupProperties {
  /** The fully qualified ID of the parent serviceGroup.  For example, '/providers/Microsoft.Management/serviceGroups/TestServiceGroup' */
  resourceId?: string;
}

export function parentServiceGroupPropertiesSerializer(item: ParentServiceGroupProperties): any {
  return { resourceId: item["resourceId"] };
}

export function parentServiceGroupPropertiesDeserializer(item: any): ParentServiceGroupProperties {
  return {
    resourceId: item["resourceId"],
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

/** Response holding an array of service groups and a nextLink that supports pagination */
export interface ServiceGroupCollectionResponse {
  /** The ServiceGroup items on this page */
  value: ServiceGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function serviceGroupCollectionResponseDeserializer(
  item: any,
): ServiceGroupCollectionResponse {
  return {
    value: serviceGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serviceGroupArraySerializer(result: Array<ServiceGroup>): any[] {
  return result.map((item) => {
    return serviceGroupSerializer(item);
  });
}

export function serviceGroupArrayDeserializer(result: Array<ServiceGroup>): any[] {
  return result.map((item) => {
    return serviceGroupDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-02-01-preview API version. */
  V20240201Preview = "2024-02-01-preview",
}
