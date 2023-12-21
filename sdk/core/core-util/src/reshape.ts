// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

interface SelectorPropertyName {
  type: "propertyName";
  value: string;
}

interface SelectorArrayIterator {
  type: "arrayIterator";
  remainingSelector: string;
}

type SelectorPart = SelectorArrayIterator | SelectorPropertyName;

function* selectorParts(selector: string): Iterable<SelectorPart> {
  let partialResult: string[] = [];
  let backSlashFound = false;
  let openBracketFound = false;
  let rollingUpSelector = false;
  for (const char of selector) {
    if (rollingUpSelector) {
      partialResult.push(char);
      continue;
    }
    if (backSlashFound) {
      partialResult.push(char);
      backSlashFound = false;
      continue;
    }
    if (openBracketFound && char === "]") {
      openBracketFound = false;
      if (partialResult.length) {
        yield { type: "propertyName", value: partialResult.join("") };
        partialResult = [];
      }
      rollingUpSelector = true;
      continue;
    }
    switch (char) {
      case ".":
        yield { type: "propertyName", value: partialResult.join("") };
        partialResult = [];
        break;
      case "\\":
        backSlashFound = true;
        break;
      case "[":
        openBracketFound = true;
        break;
      default:
        partialResult.push(char);
    }
  }

  if (rollingUpSelector) {
    yield { type: "arrayIterator", remainingSelector: partialResult.join("") };
  } else if (partialResult.length) {
    yield { type: "propertyName", value: partialResult.join("") };
  }
}

/**
 * Options for configuring a selected property.
 */
export interface ReshapeOptions {
  /**
   * The new property name for the selected property.
   */
  newPropertyName?: string;
  /**
   * A function that maps the current property value to a new one.
   */
  mapFunction?: (value: unknown) => unknown;
}

/**
 * A simple helper method that allows you to modify a JS object.
 * The original argument is mutated in place, but also returned
 * in order to make casting to the final type easier.
 *
 * Example usage:
 * ```ts
 * // changes input to look like `{b: 1}`
 * reshape({a: 1}, "a", "b");
 *
 * ```
 * @param object - The object to modify.
 * @param selector - The selector for the property to modify.
 * Separate property names with `.`,
 * iterate over arrays with `[]`,
 * and escape these characters with `\`.
 * @param newPropertyName - The new property name for the selected property.
 */
export function reshape(object: unknown, selector: string, newPropertyName: string): unknown;
/**
 * A simple helper method that allows you to modify a JS object.
 * The original argument is mutated in place, but also returned
 * in order to make casting to the final type easier.
 *
 * Example usage:
 * ```ts
 * // changes input to look like `{a: "hello 1"}`
 * reshape({a: 1}, "a", (value) => `hello ${value}`);
 *
 * ```
 * @param object - The object to modify.
 * @param selector - The selector for the property to modify.
 * Separate property names with `.`,
 * iterate over arrays with `[]`,
 * and escape these characters with `\`.
 * @param mapFunction - A function that maps the current property value to a new one.
 */
export function reshape(
  object: unknown,
  selector: string,
  mapFunction: (value: unknown) => unknown
): unknown;
/**
 * A simple helper method that allows you to modify a JS object.
 * The original argument is mutated in place, but also returned
 * in order to make casting to the final type easier.
 *
 * Example usage:
 * ```ts
 * // changes input to look like `{b: "hello 1"}`
 * reshape({a: 1}, "a", "b", (value) => `hello ${value}`);
 *
 * ```
 * @param object - The object to modify.
 * @param selector - The selector for the property to modify.
 * Separate property names with `.`,
 * iterate over arrays with `[]`,
 * and escape these characters with `\`.
 * @param newPropertyName - The new property name for the selected property.
 * @param mapFunction - A function that maps the current property value to a new one.
 */
export function reshape(
  object: unknown,
  selector: string,
  newPropertyName: string,
  mapFunction: (value: unknown) => unknown
): unknown;
/**
 * A simple helper method that allows you to modify a JS object.
 * The original argument is mutated in place, but also returned
 * in order to make casting to the final type easier.
 *
 * Example usage:
 * ```ts
 * // changes input to look like `{b: "hello 1"}`
 * reshape({a: 1}, "a", { newPropertyName: "b", mapFunction: (value) => `hello ${value}`});
 * ```
 * @param object - The object to modify.
 * @param selector - The selector for the property to modify.
 * Separate property names with `.`,
 * iterate over arrays with `[]`,
 * and escape these characters with `\`.
 * @param options - Options for modifying the selected property.
 */
export function reshape(object: unknown, selector: string, options: ReshapeOptions): unknown;
export function reshape(
  object: unknown,
  selector: string,
  nameOrMapOrOptions: string | ((value: unknown) => unknown) | ReshapeOptions,
  mapFunctionOrNothing?: (value: unknown) => unknown
): unknown {
  if (object === null || object === undefined) {
    return object;
  }
  let newPropertyName: string | undefined;
  let mapFunction: undefined | ((value: unknown) => unknown);

  if (typeof nameOrMapOrOptions === "string") {
    newPropertyName = nameOrMapOrOptions;
    if (mapFunctionOrNothing) {
      mapFunction = mapFunctionOrNothing;
    }
  } else if (typeof nameOrMapOrOptions === "function") {
    mapFunction = nameOrMapOrOptions;
  } else if (typeof nameOrMapOrOptions === "object") {
    const options = nameOrMapOrOptions as ReshapeOptions | undefined | null;
    newPropertyName = options?.newPropertyName;
    mapFunction = options?.mapFunction;
  } else {
    throw new RangeError("misconfigured options to reshape");
  }

  if (!newPropertyName && !mapFunction) {
    return object;
  }

  let value: any = object;
  let parent: any;
  let targetProp: string | undefined;

  for (const part of selectorParts(selector)) {
    if (part.type === "propertyName") {
      const prop = part.value;
      if (typeof value[prop] !== "undefined") {
        targetProp = prop;
        parent = value;
        value = value[prop];
      } else {
        return object;
      }
    } else if (part.type === "arrayIterator") {
      if (Array.isArray(value)) {
        if (!part.remainingSelector) {
          if (newPropertyName) {
            throw new Error("cannot rename array indices");
          }
          if (mapFunction && targetProp) {
            parent[targetProp] = value.map(mapFunction);
          }
        } else if (targetProp) {
          parent[targetProp] = value.map((arrayItem) => {
            return reshape(arrayItem, part.remainingSelector, {
              newPropertyName,
              mapFunction,
            });
          });
        }
      }
      return object;
    }
  }

  if (mapFunction) {
    value = mapFunction(value);
  }

  if (newPropertyName) {
    if (targetProp) {
      delete parent[targetProp];
    }
    targetProp = newPropertyName;
  }

  if (targetProp) {
    parent[targetProp] = value;
  }

  return object;
}
