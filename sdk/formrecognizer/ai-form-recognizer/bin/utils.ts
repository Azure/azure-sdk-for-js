// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Convert a list of strings into a camelCase joined representation.
 */
export function camelCase(slug: string[]): string {
  return slug.map(capitalize).join("");
}

/**
 * Capitalize a string.
 */
export function capitalize(s: string): string {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
}

/**
 * Uncapitalize a string.
 */
export function uncapitalize(s: string): string {
  return s.slice(0, 1).toLowerCase() + s.slice(1);
}

/**
 * A simple representation of a field in an interface.
 */
export interface Field {
  name: string;
  docContents: string;
  type: string;
  optional?: true;
}
