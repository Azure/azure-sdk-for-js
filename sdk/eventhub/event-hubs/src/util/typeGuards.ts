// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  isNamedKeyCredential,
  isSASCredential,
  isTokenCredential,
  NamedKeyCredential,
  SASCredential,
  TokenCredential
} from "@azure/core-auth";

/**
 * Helper TypeGuard that checks if something is defined or not.
 * @param thing - Anything
 * @internal
 */
export function isDefined<T>(thing: T | undefined | null): thing is T {
  return typeof thing !== "undefined" && thing !== null;
}

/**
 * Helper TypeGuard that checks if the input is an object with the specified properties.
 * @param thing - Anything.
 * @param properties - The name of the properties that should appear in the object.
 * @internal
 */
export function isObjectWithProperties<Thing extends unknown, PropertyName extends string>(
  thing: Thing,
  properties: PropertyName[]
): thing is Thing & Record<PropertyName, unknown> {
  if (!isDefined(thing) || typeof thing !== "object") {
    return false;
  }

  for (const property of properties) {
    if (!objectHasProperty(thing, property)) {
      return false;
    }
  }

  return true;
}

/**
 * Helper TypeGuard that checks if the input is an object with the specified property.
 * @param thing - Any object.
 * @param property - The name of the property that should appear in the object.
 * @internal
 */
export function objectHasProperty<Thing extends unknown, PropertyName extends string>(
  thing: Thing,
  property: PropertyName
): thing is Thing & Record<PropertyName, unknown> {
  return typeof thing === "object" && property in (thing as Record<string, unknown>);
}

/**
 * Typeguard that checks if the input is a credential type the clients accept.
 * @param thing - Any object.
 * @internal
 */
export function isCredential(
  thing: unknown
): thing is TokenCredential | NamedKeyCredential | SASCredential {
  return isTokenCredential(thing) || isNamedKeyCredential(thing) || isSASCredential(thing);
}
