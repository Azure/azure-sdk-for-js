// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** An error response from the service. */
export interface CloudError {
  /** An error response from the service. */
  error?: CloudErrorBody;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
  };
}

/** An error response from the service. */
export interface CloudErrorBody {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code?: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message?: string;
}

export function cloudErrorBodyDeserializer(item: any): CloudErrorBody {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The principal type of the assigned principal ID. */
export enum KnownPrincipalType {
  /** User */
  User = "User",
  /** Group */
  Group = "Group",
  /** ServicePrincipal */
  ServicePrincipal = "ServicePrincipal",
  /** ForeignGroup */
  ForeignGroup = "ForeignGroup",
  /** Device */
  Device = "Device",
}

/**
 * The principal type of the assigned principal ID. \
 * {@link KnownPrincipalType} can be used interchangeably with PrincipalType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: User \
 * **Group**: Group \
 * **ServicePrincipal**: ServicePrincipal \
 * **ForeignGroup**: ForeignGroup \
 * **Device**: Device
 */
export type PrincipalType = string;

/** The name of the entity last modified it */
export interface Principal {
  /** The id of the principal made changes */
  id?: string;
  /** The name of the principal made changes */
  displayName?: string;
  /** Type of principal such as user , group etc */
  type?: string;
  /** Email of principal */
  email?: string;
}

export function principalDeserializer(item: any): Principal {
  return {
    id: item["id"],
    displayName: item["displayName"],
    type: item["type"],
    email: item["email"],
  };
}
