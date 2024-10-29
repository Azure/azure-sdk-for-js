// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Constructs the authentication endpoint from a Mixed Reality account domain.
 * @internal
 * @param accountDomain - The Mixed Reality account domain.
 */
export function constructAuthenticationEndpointFromDomain(accountDomain: string): string {
  return `https://sts.${accountDomain}`;
}
