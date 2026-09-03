// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function classicAdministratorArrayDeserializer(result: Array<ClassicAdministrator>): any[] {
  return result.map((item) => {
    return classicAdministratorDeserializer(item);
  });
}

/** Classic Administrators */
export interface ClassicAdministrator {
  /** The ID of the administrator. */
  id?: string;
  /** The name of the administrator. */
  name?: string;
  /** The type of the administrator. */
  type?: string;
  /** The email address of the administrator. */
  emailAddress?: string;
  /** The role of the administrator. */
  role?: string;
}

export function classicAdministratorDeserializer(item: any): ClassicAdministrator {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _classicAdministratorPropertiesDeserializer(item["properties"])),
  };
}

/** Classic Administrator properties. */
export interface ClassicAdministratorProperties {
  /** The email address of the administrator. */
  emailAddress?: string;
  /** The role of the administrator. */
  role?: string;
}

export function classicAdministratorPropertiesDeserializer(
  item: any,
): ClassicAdministratorProperties {
  return {
    emailAddress: item["emailAddress"],
    role: item["role"],
  };
}

export function _classicAdministratorPropertiesDeserializer(item: any) {
  return {
    emailAddress: item["emailAddress"],
    role: item["role"],
  };
}
