// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { ClientAssertionCredential } from "./clientAssertionCredential";
import { WorkloadIdentityCredentialOptions } from "./workloadIdentityCredentialOptions";
import fs from "fs/promises";

async function readFileContents(filePath: string): Promise<string> {
  return fs.readFile(filePath, "utf8");
}

/**
 * WorkloadIdentityCredential supports Azure workload identity authentication on Kubernetes.
 * Refer to <a href="https://learn.microsoft.com/azure/aks/workload-identity-overview">Azure Active Directory Workload Identity</a>
 * for more information.
 */
export class WorkloadIdentityCredential implements TokenCredential {
  private client: ClientAssertionCredential;

  /**
   * WorkloadIdentityCredential supports Azure workload identity on Kubernetes.
   *
   * @param tenantId - ID of the application's Azure Active Directory tenant. Also called its directory ID.
   * @param clientId - The client ID of an Azure AD app registration.
   * @param federatedTokenFilePath - The path to a file containing a Kubernetes service account token that authenticates the identity.
   * @param options - The identity client options to use for authentication.
   */
  constructor(
    tenantId: string,
    clientId: string,
    federatedTokenFilePath: string,
    options: WorkloadIdentityCredentialOptions = {}
  ) {
    if (!tenantId || !clientId || !federatedTokenFilePath) {
      throw new Error(
        "WorkloadIdentityCredential: tenantId, clientId, and federatedTokenFilePath are required parameters."
      );
    }

    this.client = new ClientAssertionCredential(
      tenantId,
      clientId,
      () => readFileContents(federatedTokenFilePath),
      options
    );
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  getToken(scopes: string | string[], options?: GetTokenOptions): Promise<AccessToken | null> {
    return this.client.getToken(scopes, options);
  }
}
