// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Constructs the authentication endpoint from a Mixed Reality account domain.
 * @internal
 * @param accountDomain - The Mixed Reality account domain.
 */
export function constructAuthenticationEndpointFromDomain(accountDomain: string): string {
  if (!accountDomain) {
    throw new Error("Argument cannot be null or empty: 'accountDomain'.");
  }

  return `https://sts.${accountDomain}`;
}
