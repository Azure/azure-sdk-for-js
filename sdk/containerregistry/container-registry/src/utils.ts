// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Extract the path part from the next link value returned by the service,
 * which is of form
 *    </acr/v1/name/...&n=2&orderby=>; rel="next"
 * @internal
 */
export function extractNextLink(value: string | undefined): string | undefined {
  return value?.substr(1, value.indexOf(">") - 1);
}
