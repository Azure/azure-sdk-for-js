// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function getAuthorityHostEnvironment(): { authorityHost: string } | undefined {
  if (process.env.AZURE_AUTHORITY_HOST) {
    return {
      authorityHost: process.env.AZURE_AUTHORITY_HOST
    };
  } else {
    return undefined;
  }
}
