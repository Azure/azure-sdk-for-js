// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { ClientAssertionCredential } from "./clientAssertionCredential";
import { WorkloadIdentityCredentialOptions } from "./workloadIdentityCredentialOptions";
import { readFile } from "fs/promises";

/**
 * WorkloadIdentityCredential supports Azure workload identity authentication on Kubernetes.
 * Refer to <a href="https://learn.microsoft.com/azure/aks/workload-identity-overview">Azure Active Directory Workload Identity</a>
 * for more information.
 */
export class WorkloadIdentityCredential implements TokenCredential {
  private client: ClientAssertionCredential;
  private federatedTokenFilePath: string;
  private azureFederatedTokenFileContent: string | undefined = undefined;
  private cacheDate: number | undefined = undefined;

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

    this.federatedTokenFilePath = federatedTokenFilePath;
    this.client = new ClientAssertionCredential(
      tenantId,
      clientId,
      this.readFileContents.bind(this),
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

  private async readFileContents(): Promise<string> {
    // Cached assertions expire after 5 minutes
    if (this.cacheDate !== undefined && Date.now() - this.cacheDate >= 1000 * 60 * 5) {
      this.azureFederatedTokenFileContent = undefined;
    }
    if (!this.azureFederatedTokenFileContent) {
      const file = await readFile(this.federatedTokenFilePath, "utf8");
      const value = file.trim();
      if (!value) {
        throw new Error(`No content on the file ${this.federatedTokenFilePath}.`);
      } else {
        this.azureFederatedTokenFileContent = value;
        this.cacheDate = Date.now();
      }
    }
    return this.azureFederatedTokenFileContent;
  }
}
