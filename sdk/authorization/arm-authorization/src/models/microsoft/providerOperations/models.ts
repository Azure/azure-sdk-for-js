// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Provider Operations metadata */
export interface ProviderOperationsMetadata extends SettableResource {
  /** The provider display name. */
  displayName?: string;
  /** The provider resource types */
  resourceTypes?: ResourceType[];
  /** The provider operations. */
  operations?: ProviderOperation[];
}

export function providerOperationsMetadataDeserializer(item: any): ProviderOperationsMetadata {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    displayName: item["displayName"],
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : resourceTypeArrayDeserializer(item["resourceTypes"]),
    operations: !item["operations"]
      ? item["operations"]
      : providerOperationArrayDeserializer(item["operations"]),
  };
}

export function resourceTypeArrayDeserializer(result: Array<ResourceType>): any[] {
  return result.map((item) => {
    return resourceTypeDeserializer(item);
  });
}

/** Resource Type */
export interface ResourceType {
  /** The resource type name. */
  name?: string;
  /** The resource type display name. */
  displayName?: string;
  /** The resource type operations. */
  operations?: ProviderOperation[];
}

export function resourceTypeDeserializer(item: any): ResourceType {
  return {
    name: item["name"],
    displayName: item["displayName"],
    operations: !item["operations"]
      ? item["operations"]
      : providerOperationArrayDeserializer(item["operations"]),
  };
}

export function providerOperationArrayDeserializer(result: Array<ProviderOperation>): any[] {
  return result.map((item) => {
    return providerOperationDeserializer(item);
  });
}

/** Operation */
export interface ProviderOperation {
  /** The operation name. */
  name?: string;
  /** The operation display name. */
  displayName?: string;
  /** The operation description. */
  description?: string;
  /** The operation origin. */
  origin?: string;
  /** The operation properties. */
  properties?: any;
  /** The dataAction flag to specify the operation type. */
  isDataAction?: boolean;
}

export function providerOperationDeserializer(item: any): ProviderOperation {
  return {
    name: item["name"],
    displayName: item["displayName"],
    description: item["description"],
    origin: item["origin"],
    properties: item["properties"],
    isDataAction: item["isDataAction"],
  };
}

/** The resource model definition for resource. */
export interface SettableResource {
  /** The provider ID. */
  id?: string;
  /** The provider name. */
  name?: string;
  /** The provider type. */
  type?: string;
}

export function settableResourceDeserializer(item: any): SettableResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

export function providerOperationsMetadataArrayDeserializer(
  result: Array<ProviderOperationsMetadata>,
): any[] {
  return result.map((item) => {
    return providerOperationsMetadataDeserializer(item);
  });
}
