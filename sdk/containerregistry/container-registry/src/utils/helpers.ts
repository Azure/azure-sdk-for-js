// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Extract the path part from the next link value returned by the service,
 * @internal
 */
export function extractNextLink(value: string | undefined): string | undefined {
  // The link value has this pattern
  //     `</acr/v1/name/...&n=2&orderby=>; rel="next"`
  // and we only want the part inside of <...>
  return value?.substr(1, value.indexOf(">") - 1);
}

/**
 * Checks whether a string is a digest
 * @internal
 */
export function isDigest(tagOrDigest: string): boolean {
  return tagOrDigest.includes(":");
}
