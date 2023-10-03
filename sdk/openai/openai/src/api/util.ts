// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

export function wrapError<T>(f: () => T, message: string): T {
  try {
    const result = f();
    return result;
  } catch (cause) {
    throw new Error(`${message}: ${cause}`, { cause });
  }
}

function tocamelCase(str: string): string {
  return str.replace(/([_][a-z])/g, (group) => group.toUpperCase().replace("_", ""));
}

/**
 * Rename keys to camel case.
 * @param obj - The object to rename keys to camel case
 * @returns The object with keys renamed to camel case
 */
export function renameKeysToCamelCase(obj: Record<string, any>): Record<string, any> {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const newKey = tocamelCase(key);
    if (newKey !== key) {
      delete obj[key];
    }
    obj[newKey] =
      typeof value === "object"
        ? Array.isArray(value)
          ? value.map((v) => renameKeysToCamelCase(v))
          : renameKeysToCamelCase(value)
        : value;
  }
  return obj;
}
