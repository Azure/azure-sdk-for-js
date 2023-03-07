// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { ClientAssertionCredential } from "./clientAssertionCredential";
import {
  WorkloadIdentityCredentialOptions,
  WorkloadIdentityDefaultCredentialOptions,
} from "./workloadIdentityCredentialOptions";
import { readFile } from "fs/promises";
import { CredentialUnavailableError } from "../errors";
import { credentialLogger, processEnvVars } from "../util/logging";
import { checkTenantId } from "../util/tenantIdUtils";

const credentialName = "WorkloadIdentityCredential";
/**
 * Contains the list of all supported environment variable names so that an
 * appropriate error message can be generated when no credentials can be
 * configured.
 *
 * @internal
 */
export const SupportedWorkloadEnvironmentVariables = [
  "AZURE_TENANT_ID",
  "AZURE_CLIENT_ID",
  "AZURE_FEDERATED_TOKEN_FILE",
];
const logger = credentialLogger(credentialName);
/**
 * WorkloadIdentityCredential supports Azure workload identity authentication on Kubernetes.
 * Refer to <a href="https://learn.microsoft.com/azure/aks/workload-identity-overview">Azure Active Directory Workload Identity</a>
 * for more information.
 */
export class WorkloadIdentityCredential implements TokenCredential {
  private client: ClientAssertionCredential | undefined;
  private azureFederatedTokenFileContent: string | undefined = undefined;
  private cacheDate: number | undefined = undefined;
  private federatedTokenFilePath: string | undefined;

  /**
   * WorkloadIdentityCredential supports Azure workload identity on Kubernetes.
   *
   * @param options - The identity client options to use for authentication.
   */
  constructor(options: WorkloadIdentityCredentialOptions);

  /**
   * @internal
   * @hidden
   * WorkloadIdentityCredential supports Azure workload identity on Kubernetes.
   *
   * @param options - The identity client options to use for authentication.
   */
  constructor(options?: WorkloadIdentityDefaultCredentialOptions);
  /**
   * @internal
   * @hidden
   */
  constructor(
    options: WorkloadIdentityDefaultCredentialOptions | WorkloadIdentityCredentialOptions
  ) {
    const workloadIdentityCredentialOptions = options as WorkloadIdentityCredentialOptions;

    if (
      workloadIdentityCredentialOptions?.clientId &&
      workloadIdentityCredentialOptions?.tenantId &&
      workloadIdentityCredentialOptions?.federatedTokenFilePath
    ) {
      const tenantId = workloadIdentityCredentialOptions.tenantId;
      if (tenantId) {
        checkTenantId(logger, tenantId);
      }
      this.federatedTokenFilePath = workloadIdentityCredentialOptions.federatedTokenFilePath;
      logger.info(
        `Invoking ClientAssertionCredential with tenant ID: ${tenantId}, clientId: ${workloadIdentityCredentialOptions.clientId} and federated token path: [REDACTED]`
      );
      this.client = new ClientAssertionCredential(
        tenantId,
        workloadIdentityCredentialOptions.clientId,
        this.readFileContents.bind(this),
        options
      );
    } else {
      // Keep track of any missing environment variables for error details
      const assigned = processEnvVars(SupportedWorkloadEnvironmentVariables).assigned.join(", ");
      logger.info(`Found the following environment variables: ${assigned}`);

      const tenantId = process.env.AZURE_TENANT_ID,
        clientId = process.env.AZURE_CLIENT_ID,
        federatedTokenFilePath = process.env.AZURE_FEDERATED_TOKEN_FILE;

      this.federatedTokenFilePath = federatedTokenFilePath;
      if (tenantId) {
        checkTenantId(logger, tenantId);
      }

      if (tenantId && clientId && federatedTokenFilePath) {
        logger.info(
          `Invoking ClientAssertionCredential with the following environment variables tenant ID: ${tenantId}, clientId: ${clientId} and federatedTokenFilePath: [REDACTED]`
        );
        this.client = new ClientAssertionCredential(
          tenantId,
          clientId,
          this.readFileContents.bind(this),
          options as WorkloadIdentityDefaultCredentialOptions
        );
      }
    }
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    if (!this.client) {
      const errorMessage = `${credentialName}: is unavailable. tenantId, clientId, and federatedTokenFilePath are required parameters. 
      In DefaultAzureCredential and ManagedIdentityCredential, these can be provided as environment variables - 
      "AZURE_TENANT_ID",
      "AZURE_CLIENT_ID",
      "AZURE_FEDERATED_TOKEN_FILE"`;
      logger.info(errorMessage);
      throw new CredentialUnavailableError(errorMessage);
    }
    logger.info("Invoking getToken() of Client Assertion Credential");
    return this.client.getToken(scopes, options);
  }

  private async readFileContents(): Promise<string> {
    // Cached assertions expire after 5 minutes
    if (this.cacheDate !== undefined && Date.now() - this.cacheDate >= 1000 * 60 * 5) {
      this.azureFederatedTokenFileContent = undefined;
    }
    if (!this.federatedTokenFilePath) {
      throw new CredentialUnavailableError(
        `${credentialName}: is unavailable. Invalid file path provided ${this.federatedTokenFilePath}.`
      );
    }
    if (!this.azureFederatedTokenFileContent) {
      const file = await readFile(this.federatedTokenFilePath, "utf8");
      const value = file.trim();
      if (!value) {
        throw new CredentialUnavailableError(
          `${credentialName}: is unavailable. No content on the file ${this.federatedTokenFilePath}.`
        );
      } else {
        this.azureFederatedTokenFileContent = value;
        this.cacheDate = Date.now();
      }
    }
    return this.azureFederatedTokenFileContent;
  }
}
