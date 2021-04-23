// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CredentialLogger, formatError } from "./logging";

/**
 * Throws if the received scope is not valid.
 * @internal
 */
export function ensureValidScope(scope: string, logger: CredentialLogger): void {
  if (!scope.match(/^[0-9a-zA-Z-.:/]+$/)) {
    const error = new Error("Invalid scope was specified by the user or calling client");
    logger.getToken.info(formatError(scope, error));
    throw error;
  }
}

/**
 * Returns the resource out of a scope.
 * @internal
 */
export function getScopeResource(scope: string): string {
  return scope.replace(/\/.default$/, "");
}
