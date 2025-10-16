// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The List Resource Skus operation response. */
export interface _ResourceSkusResult {
  /** The ResourceSku items on this page */
  value: ResourceSku[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _resourceSkusResultDeserializer(item: any): _ResourceSkusResult {
  return {
    value: resourceSkuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function resourceSkuArrayDeserializer(result: Array<ResourceSku>): any[] {
  return result.map((item) => {
    return resourceSkuDeserializer(item);
  });
}

/** Describes an available Compute SKU. */
export interface ResourceSku {
  /** The type of resource the SKU applies to. */
  readonly resourceType?: string;
  /** The name of SKU. */
  readonly name?: string;
  /** Specifies the tier of virtual machines in a scale set.<br /><br /> Possible Values:<br /><br /> **Standard**<br /><br /> **Basic** */
  readonly tier?: string;
  /** The Size of the SKU. */
  readonly size?: string;
  /** The Family of this particular SKU. */
  readonly family?: string;
  /** The Kind of resources that are supported in this SKU. */
  readonly kind?: string;
  /** Specifies the number of virtual machines in the scale set. */
  readonly capacity?: ResourceSkuCapacity;
  /** The set of locations that the SKU is available. */
  readonly locations?: string[];
  /** A list of locations and availability zones in those locations where the SKU is available. */
  readonly locationInfo?: ResourceSkuLocationInfo[];
  /** The api versions that support this SKU. */
  readonly apiVersions?: string[];
  /** Metadata for retrieving price info. */
  readonly costs?: ResourceSkuCosts[];
  /** A name value pair to describe the capability. */
  readonly capabilities?: ResourceSkuCapabilities[];
  /** The restrictions because of which SKU cannot be used. This is empty if there are no restrictions. */
  readonly restrictions?: ResourceSkuRestrictions[];
}

export function resourceSkuDeserializer(item: any): ResourceSku {
  return {
    resourceType: item["resourceType"],
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    kind: item["kind"],
    capacity: !item["capacity"]
      ? item["capacity"]
      : resourceSkuCapacityDeserializer(item["capacity"]),
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    locationInfo: !item["locationInfo"]
      ? item["locationInfo"]
      : resourceSkuLocationInfoArrayDeserializer(item["locationInfo"]),
    apiVersions: !item["apiVersions"]
      ? item["apiVersions"]
      : item["apiVersions"].map((p: any) => {
          return p;
        }),
    costs: !item["costs"] ? item["costs"] : resourceSkuCostsArrayDeserializer(item["costs"]),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : resourceSkuCapabilitiesArrayDeserializer(item["capabilities"]),
    restrictions: !item["restrictions"]
      ? item["restrictions"]
      : resourceSkuRestrictionsArrayDeserializer(item["restrictions"]),
  };
}

/** Describes scaling information of a SKU. */
export interface ResourceSkuCapacity {
  /** The minimum capacity. */
  readonly minimum?: number;
  /** The maximum capacity that can be set. */
  readonly maximum?: number;
  /** The default capacity. */
  readonly default?: number;
  /** The scale type applicable to the sku. */
  readonly scaleType?: ResourceSkuCapacityScaleType;
}

export function resourceSkuCapacityDeserializer(item: any): ResourceSkuCapacity {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    default: item["default"],
    scaleType: item["scaleType"],
  };
}

/** The scale type applicable to the sku. */
export type ResourceSkuCapacityScaleType = "Automatic" | "Manual" | "None";

export function resourceSkuLocationInfoArrayDeserializer(
  result: Array<ResourceSkuLocationInfo>,
): any[] {
  return result.map((item) => {
    return resourceSkuLocationInfoDeserializer(item);
  });
}

/** Describes an available Compute SKU Location Information. */
export interface ResourceSkuLocationInfo {
  /** Location of the SKU */
  readonly location?: string;
  /** List of availability zones where the SKU is supported. */
  readonly zones?: string[];
  /** Details of capabilities available to a SKU in specific zones. */
  readonly zoneDetails?: ResourceSkuZoneDetails[];
  /** The names of extended locations. */
  readonly extendedLocations?: string[];
  /** The type of the extended location. */
  readonly type?: ExtendedLocationType;
}

export function resourceSkuLocationInfoDeserializer(item: any): ResourceSkuLocationInfo {
  return {
    location: item["location"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    zoneDetails: !item["zoneDetails"]
      ? item["zoneDetails"]
      : resourceSkuZoneDetailsArrayDeserializer(item["zoneDetails"]),
    extendedLocations: !item["extendedLocations"]
      ? item["extendedLocations"]
      : item["extendedLocations"].map((p: any) => {
          return p;
        }),
    type: item["type"],
  };
}

export function resourceSkuZoneDetailsArrayDeserializer(
  result: Array<ResourceSkuZoneDetails>,
): any[] {
  return result.map((item) => {
    return resourceSkuZoneDetailsDeserializer(item);
  });
}

/** Describes The zonal capabilities of a SKU. */
export interface ResourceSkuZoneDetails {
  /** The set of zones that the SKU is available in with the specified capabilities. */
  readonly name?: string[];
  /** A list of capabilities that are available for the SKU in the specified list of zones. */
  readonly capabilities?: ResourceSkuCapabilities[];
}

export function resourceSkuZoneDetailsDeserializer(item: any): ResourceSkuZoneDetails {
  return {
    name: !item["name"]
      ? item["name"]
      : item["name"].map((p: any) => {
          return p;
        }),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : resourceSkuCapabilitiesArrayDeserializer(item["capabilities"]),
  };
}

export function resourceSkuCapabilitiesArrayDeserializer(
  result: Array<ResourceSkuCapabilities>,
): any[] {
  return result.map((item) => {
    return resourceSkuCapabilitiesDeserializer(item);
  });
}

/** Describes The SKU capabilities object. */
export interface ResourceSkuCapabilities {
  /** An invariant to describe the feature. */
  readonly name?: string;
  /** An invariant if the feature is measured by quantity. */
  readonly value?: string;
}

export function resourceSkuCapabilitiesDeserializer(item: any): ResourceSkuCapabilities {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** The type of the extended location. */
export enum KnownExtendedLocationType {
  /** EdgeZone */
  EdgeZone = "EdgeZone",
}

/**
 * The type of the extended location. \
 * {@link KnownExtendedLocationType} can be used interchangeably with ExtendedLocationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EdgeZone**
 */
export type ExtendedLocationType = string;

export function resourceSkuCostsArrayDeserializer(result: Array<ResourceSkuCosts>): any[] {
  return result.map((item) => {
    return resourceSkuCostsDeserializer(item);
  });
}

/** Describes metadata for retrieving price info. */
export interface ResourceSkuCosts {
  /** Used for querying price from commerce. */
  readonly meterID?: string;
  /** The multiplier is needed to extend the base metered cost. */
  readonly quantity?: number;
  /** An invariant to show the extended unit. */
  readonly extendedUnit?: string;
}

export function resourceSkuCostsDeserializer(item: any): ResourceSkuCosts {
  return {
    meterID: item["meterID"],
    quantity: item["quantity"],
    extendedUnit: item["extendedUnit"],
  };
}

export function resourceSkuRestrictionsArrayDeserializer(
  result: Array<ResourceSkuRestrictions>,
): any[] {
  return result.map((item) => {
    return resourceSkuRestrictionsDeserializer(item);
  });
}

/** Describes scaling information of a SKU. */
export interface ResourceSkuRestrictions {
  /** The type of restrictions. */
  readonly type?: ResourceSkuRestrictionsType;
  /** The value of restrictions. If the restriction type is set to location. This would be different locations where the SKU is restricted. */
  readonly values?: string[];
  /** The information about the restriction where the SKU cannot be used. */
  readonly restrictionInfo?: ResourceSkuRestrictionInfo;
  /** The reason for restriction. */
  readonly reasonCode?: ResourceSkuRestrictionsReasonCode;
}

export function resourceSkuRestrictionsDeserializer(item: any): ResourceSkuRestrictions {
  return {
    type: item["type"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
    restrictionInfo: !item["restrictionInfo"]
      ? item["restrictionInfo"]
      : resourceSkuRestrictionInfoDeserializer(item["restrictionInfo"]),
    reasonCode: item["reasonCode"],
  };
}

/** The type of restrictions. */
export type ResourceSkuRestrictionsType = "Location" | "Zone";

/** Describes an available Compute SKU Restriction Information. */
export interface ResourceSkuRestrictionInfo {
  /** Locations where the SKU is restricted */
  readonly locations?: string[];
  /** List of availability zones where the SKU is restricted. */
  readonly zones?: string[];
}

export function resourceSkuRestrictionInfoDeserializer(item: any): ResourceSkuRestrictionInfo {
  return {
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** The reason for restriction. */
export type ResourceSkuRestrictionsReasonCode = "QuotaId" | "NotAvailableForSubscription";

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

/** The available API versions. */
export enum KnownVersions {
  /** The 2021-07-01 API version. */
  V20210701 = "2021-07-01",
}
