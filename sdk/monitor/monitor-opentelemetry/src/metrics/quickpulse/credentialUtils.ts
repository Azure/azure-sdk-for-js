// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import { ManagedIdentityCredential } from "@azure/identity";
import { APPLICATIONINSIGHTS_AUTHENTICATION_STRING } from "../../types.js";
import { Logger } from "../../shared/logging/logger.js";

/**
 * Resolves the Azure Active Directory (AAD) credential used by Live Metrics.
 *
 * When an explicit credential is supplied it is returned as-is. Otherwise the
 * credential is resolved from the `APPLICATIONINSIGHTS_AUTHENTICATION_STRING`
 * environment variable (the App Service / Functions AAD convention) which has
 * the form `Authorization=AAD;ClientId=<client-id>`. If that variable is absent,
 * malformed, or does not request AAD authorization, `undefined` is returned.
 *
 * @param credential - Explicitly supplied token credential, if any.
 * @returns The resolved token credential, or `undefined` when none applies.
 * @internal
 */
export function getAuthenticationCredential(
  credential?: TokenCredential,
): TokenCredential | undefined {
  if (credential) {
    return credential;
  }
  const authString = process.env[APPLICATIONINSIGHTS_AUTHENTICATION_STRING];
  if (!authString) {
    return undefined;
  }
  try {
    const authStringMap = new Map<string, string>();
    for (const pair of authString.split(";")) {
      const keyValue = pair.split("=");
      if (keyValue.length !== 2) {
        throw new Error(`Invalid key-value pair: "${pair}"`);
      }
      authStringMap.set(keyValue[0].toLowerCase(), keyValue[1]);
    }
    if (authStringMap.get("authorization") === "AAD") {
      const clientId = authStringMap.get("clientid");
      return clientId
        ? new ManagedIdentityCredential({ clientId })
        : new ManagedIdentityCredential();
    }
  } catch (error) {
    Logger.getInstance().error(
      `APPLICATIONINSIGHTS_AUTHENTICATION_STRING, ${authString}, has invalid format:`,
      error,
    );
  }
  return undefined;
}
