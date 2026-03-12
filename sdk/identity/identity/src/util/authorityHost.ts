// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isNodeLike } from "@azure/core-util";
import { DefaultAuthorityHost } from "../constants.js";

/**
 * Returns the authority host from either the options bag or the AZURE_AUTHORITY_HOST environment variable.
 *
 * Defaults to {@link DefaultAuthorityHost}.
 * @internal
 */
export function getAuthorityHost(options?: { authorityHost?: string }): string {
  let authorityHost = options?.authorityHost;

  if (!authorityHost && isNodeLike) {
    authorityHost = process.env.AZURE_AUTHORITY_HOST;
  }

  return authorityHost ?? DefaultAuthorityHost;
}
