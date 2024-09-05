// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken, TokenCredential } from "@azure/core-auth";
import { credentialLogger, formatError } from "../util/logging";

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
  constructor() {
    logger.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }

  /**
   * Only available in Node.js
   */
  public getToken(): Promise<AccessToken | null> {
    logger.getToken.info(formatError("", BrowserNotSupportedError));
    throw BrowserNotSupportedError;
  }
}
