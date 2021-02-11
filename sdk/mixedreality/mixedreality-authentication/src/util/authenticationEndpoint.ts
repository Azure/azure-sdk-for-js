// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function constructAuthenticationEndpointFromDomain(accountDomain: string): string {
  if (!accountDomain) {
    throw new Error("Argument cannot be null or empty: 'accountDomain'.");
  }

  return `https://sts.${accountDomain}`;
}
