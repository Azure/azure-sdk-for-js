// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedIdentityCredential } from "@azure/identity";
import { APPLICATIONINSIGHTS_AUTHENTICATION_STRING } from "../../types.js";
import { Logger } from "../../shared/logging/logger.js";

/**
 * Resolves an Azure Active Directory (AAD) credential from the
 * `APPLICATIONINSIGHTS_AUTHENTICATION_STRING` environment variable (the App Service /
 * Functions convention) which has the form `Authorization=AAD;ClientId=<client-id>`.
 * A `ManagedIdentityCredential` is created using the supplied `ClientId` when present.
 *
 * Returns `undefined` when the variable is absent, malformed, or does not request AAD
 * authorization. This is intended as a fallback for callers that were not given an
 * explicit credential.
 *
 * @returns A `ManagedIdentityCredential`, or `undefined` when none applies.
 * @internal
 */
export function getAuthenticationCredentialFromEnv(): ManagedIdentityCredential | undefined {
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
