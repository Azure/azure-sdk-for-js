// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Helper TypeGuard that checks if something is defined or not.
 * @param thing - Anything
 */
export function isDefined<T>(thing: T | undefined | null): thing is T {
  return typeof thing !== "undefined" && thing !== null;
}

/**
 * Helper TypeGuard that checks if the input is an object with the specified properties.
 * @param thing - Anything.
 * @param properties - The name of the properties that should appear in the object.
 */
export function isObjectWithProperties<Thing, PropertyName extends string>(
  thing: Thing,
  properties: PropertyName[],
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
 */
export function objectHasProperty<Thing, PropertyName extends string>(
  thing: Thing,
  property: PropertyName,
): thing is Thing & Record<PropertyName, unknown> {
  return (
    isDefined(thing) && typeof thing === "object" && property in (thing as Record<string, unknown>)
  );
}

export function isNodeReadableStream(x: unknown): x is NodeJS.ReadableStream {
  return Boolean(x && typeof (x as NodeJS.ReadableStream)["pipe"] === "function");
}

export function isWebReadableStream(x: unknown): x is ReadableStream {
  return Boolean(
    x &&
      typeof (x as ReadableStream).getReader === "function" &&
      typeof (x as ReadableStream).tee === "function",
  );
}

export function isBinaryBody(
  body: unknown,
): body is
  | Uint8Array
  | NodeJS.ReadableStream
  | ReadableStream<Uint8Array>
  | (() => NodeJS.ReadableStream)
  | (() => ReadableStream<Uint8Array>)
  | Blob {
  return (
    body !== undefined &&
    (body instanceof Uint8Array ||
      isReadableStream(body) ||
      typeof body === "function" ||
      body instanceof Blob)
  );
}

export function isReadableStream(x: unknown): x is ReadableStream | NodeJS.ReadableStream {
  return isNodeReadableStream(x) || isWebReadableStream(x);
}

export function isBlob(x: unknown): x is Blob {
  return typeof (x as Blob).stream === "function";
}
