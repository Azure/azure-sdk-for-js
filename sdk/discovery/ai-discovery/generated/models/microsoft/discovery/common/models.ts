// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Enum for entity type */
export enum KnownByType {
  /** A human user. */
  User = "User",
  /** Application */
  Application = "Application",
  /** The backend system. */
  System = "System",
}

/**
 * Enum for entity type \
 * {@link KnownByType} can be used interchangeably with ByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: A human user. \
 * **Application**: Application \
 * **System**: The backend system.
 */
export type ByType = string;

export function tagArraySerializer(result: Array<Tag>): any[] {
  return result.map((item) => {
    return tagSerializer(item);
  });
}

export function tagArrayDeserializer(result: Array<Tag>): any[] {
  return result.map((item) => {
    return tagDeserializer(item);
  });
}

/** Definition of Tag */
export interface Tag {
  /** Property key */
  key?: string;
  /** Property value */
  value?: string;
}

export function tagSerializer(item: Tag): any {
  return { key: item["key"], value: item["value"] };
}

export function tagDeserializer(item: any): Tag {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** The resource provisioning state. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The resource create request has been accepted */
  Accepted = "Accepted",
  /** The resource is being provisioned */
  Provisioning = "Provisioning",
  /** The resource is updating */
  Updating = "Updating",
  /** The resource is being deleted */
  Deleting = "Deleting",
}

/**
 * The resource provisioning state. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Accepted**: The resource create request has been accepted \
 * **Provisioning**: The resource is being provisioned \
 * **Updating**: The resource is updating \
 * **Deleting**: The resource is being deleted
 */
export type ProvisioningState = string;
