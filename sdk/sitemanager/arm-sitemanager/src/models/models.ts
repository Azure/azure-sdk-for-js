// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Site as ARM Resource */
export interface Site extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SiteProperties;
}

export function siteSerializer(item: Site): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : sitePropertiesSerializer(item["properties"]),
  };
}

export function siteDeserializer(item: any): Site {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : sitePropertiesDeserializer(item["properties"]),
  };
}

/** Site properties */
export interface SiteProperties {
  /** displayName of Site resource */
  displayName?: string;
  /** Description of Site resource */
  description?: string;
  /** Physical address of the site */
  siteAddress?: SiteAddressProperties;
  /** Key-value pairs for labeling the site resource. */
  labels?: Record<string, string>;
  /** Provisioning state of last operation */
  readonly provisioningState?: ResourceProvisioningState;
}

export function sitePropertiesSerializer(item: SiteProperties): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    siteAddress: !item["siteAddress"]
      ? item["siteAddress"]
      : siteAddressPropertiesSerializer(item["siteAddress"]),
    labels: item["labels"],
  };
}

export function sitePropertiesDeserializer(item: any): SiteProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    siteAddress: !item["siteAddress"]
      ? item["siteAddress"]
      : siteAddressPropertiesDeserializer(item["siteAddress"]),
    labels: item["labels"],
    provisioningState: item["provisioningState"],
  };
}

/** Site address properties */
export interface SiteAddressProperties {
  /** First line of the street address */
  streetAddress1?: string;
  /** Second line of the street address */
  streetAddress2?: string;
  /** City of the address */
  city?: string;
  /** State or province of the address */
  stateOrProvince?: string;
  /** Country of the address */
  country?: string;
  /** Postal or ZIP code of the address */
  postalCode?: string;
}

export function siteAddressPropertiesSerializer(item: SiteAddressProperties): any {
  return {
    streetAddress1: item["streetAddress1"],
    streetAddress2: item["streetAddress2"],
    city: item["city"],
    stateOrProvince: item["stateOrProvince"],
    country: item["country"],
    postalCode: item["postalCode"],
  };
}

export function siteAddressPropertiesDeserializer(item: any): SiteAddressProperties {
  return {
    streetAddress1: item["streetAddress1"],
    streetAddress2: item["streetAddress2"],
    city: item["city"],
    stateOrProvince: item["stateOrProvince"],
    country: item["country"],
    postalCode: item["postalCode"],
  };
}

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
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
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

/** The type used for update operations of the Site. */
export interface SiteUpdate {
  /** The updatable properties of the Site. */
  properties?: SiteUpdateProperties;
}

export function siteUpdateSerializer(item: SiteUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : siteUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Site. */
export interface SiteUpdateProperties {
  /** displayName of Site resource */
  displayName?: string;
  /** Description of Site resource */
  description?: string;
  /** Physical address of the site */
  siteAddress?: SiteAddressProperties;
  /** Key-value pairs for labeling the site resource. */
  labels?: Record<string, string>;
}

export function siteUpdatePropertiesSerializer(item: SiteUpdateProperties): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    siteAddress: !item["siteAddress"]
      ? item["siteAddress"]
      : siteAddressPropertiesSerializer(item["siteAddress"]),
    labels: item["labels"],
  };
}

/** The response of a Site list operation. */
export interface _SiteListResult {
  /** The Site items on this page */
  value: Site[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _siteListResultDeserializer(item: any): _SiteListResult {
  return {
    value: siteArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function siteArraySerializer(result: Array<Site>): any[] {
  return result.map((item) => {
    return siteSerializer(item);
  });
}

export function siteArrayDeserializer(result: Array<Site>): any[] {
  return result.map((item) => {
    return siteDeserializer(item);
  });
}

/** Supported API Versions */
export enum KnownVersions {
  /** API Version - 2025-06-01 */
  V20250601 = "2025-06-01",
}
