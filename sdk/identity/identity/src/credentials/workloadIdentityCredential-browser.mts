// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import type { WorkloadIdentityCredentialOptions } from "./workloadIdentityCredentialOptions.js";
import { credentialLogger, formatError } from "../util/logging.js";

const BrowserNotSupportedError = new Error(
  "WorkloadIdentityCredential is not supported in the browser.",
);
const logger = credentialLogger("WorkloadIdentityCredential");

/**
 * WorkloadIdentityCredential supports Microsoft Entra Workload ID authentication on Kubernetes.
 * Refer to <a href="https://learn.microsoft.com/azure/aks/workload-identity-overview">Microsoft Entra Workload ID</a>
 * for more information.
 */
export class WorkloadIdentityCredential implements TokenCredential {
  /**
   * Only available in Node.js
   */
  constructor(_options?: WorkloadIdentityCredentialOptions) {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  /**
   * Only available in Node.js
   */
  public getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
