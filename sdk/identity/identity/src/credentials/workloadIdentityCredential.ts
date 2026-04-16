// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { credentialLogger, processEnvVars } from "../util/logging.js";

import { ClientAssertionCredential } from "./clientAssertionCredential.js";
import { CredentialUnavailableError } from "../errors.js";
import type { WorkloadIdentityCredentialOptions } from "./workloadIdentityCredentialOptions.js";
import { checkTenantId } from "../util/tenantIdUtils.js";
import { readFile } from "node:fs/promises";
import type { PipelineRequest, PipelineResponse, HttpClient } from "@azure/core-rest-pipeline";
import { createDefaultHttpClient } from "@azure/core-rest-pipeline";
import type { TlsSettings } from "@azure/core-rest-pipeline";
import { canParseAsX509Certificate } from "../util/certificatesUtils.js";
import { readFileSync } from "node:fs";

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
 * Error messages for WorkloadIdentityCredential
 */
const ErrorMessages = {
  FAILED_TO_PARSE_TOKEN_PROXY: (endpoint: string, error: unknown) =>
    `Failed to parse custom token proxy URL "${endpoint}": ${error}`,
  INVALID_HTTPS_SCHEME: (protocol: string) =>
    `Custom token endpoint must use https scheme, got "${protocol}"`,
  TOKEN_ENDPOINT_NO_USER_INFO: (url: string) =>
    `Custom token endpoint URL "${url}" must not contain user info`,
  TOKEN_ENDPOINT_NO_QUERY: (url: string) =>
    `Custom token endpoint URL "${url}" must not contain a query`,
  TOKEN_ENDPOINT_NO_FRAGMENT: (url: string) =>
    `Custom token endpoint URL "${url}" must not contain a fragment`,
  CA_FILE_EMPTY: (file: string) => `CA certificate file is empty: ${file}`,
  FAILED_TO_READ_CA_FILE: (file: string, error: unknown) =>
    `Failed to read CA certificate file: ${file}. ${error}`,
  INVALID_CA_CERTIFICATES: `Invalid CA certificate data: no valid PEM certificates found`,
  INVALID_FILE_PATH: (path: string | undefined) => `Invalid file path provided ${path}.`,
  NO_FILE_CONTENT: (path: string) => `No content on the file ${path}.`,
  NO_CA_SOURCE: `No CA certificate source specified.`,
  CLIENT_ID_REQUIRED: `clientId is a required parameter. In DefaultAzureCredential and ManagedIdentityCredential, this can be provided as an environment variable - "AZURE_CLIENT_ID".
        See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`,
  TENANT_ID_REQUIRED: `tenantId is a required parameter. In DefaultAzureCredential and ManagedIdentityCredential, this can be provided as an environment variable - "AZURE_TENANT_ID".
        See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`,
  TOKEN_FILE_PATH_REQUIRED: `federatedTokenFilePath is a required parameter. In DefaultAzureCredential and ManagedIdentityCredential, this can be provided as an environment variable - "AZURE_FEDERATED_TOKEN_FILE".
        See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`,
  TOKEN_PROXY_NOT_SET: `AZURE_KUBERNETES_TOKEN_PROXY is not set but other custom endpoint-related environment variables are present`,
  CA_FILE_AND_DATA_EXCLUSIVE: `AZURE_KUBERNETES_CA_FILE and AZURE_KUBERNETES_CA_DATA are mutually exclusive. Specify only one.`,
  MISSING_ENV_VARS: `tenantId, clientId, and federatedTokenFilePath are required parameters. 
      In DefaultAzureCredential and ManagedIdentityCredential, these can be provided as environment variables - 
      "AZURE_TENANT_ID",
      "AZURE_CLIENT_ID",
      "AZURE_FEDERATED_TOKEN_FILE". See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`,
};

/**
 * @internal
 * Parses and validates the custom token proxy endpoint URL
 */
export function parseAndValidateCustomTokenProxy(endpoint: string): string {
  let tokenProxy: URL;
  try {
    tokenProxy = new URL(endpoint);
  } catch (error) {
    throw new CredentialUnavailableError(
      `${credentialName}: is unavailable. ${ErrorMessages.FAILED_TO_PARSE_TOKEN_PROXY(endpoint, error)}`,
    );
  }

  if (tokenProxy.protocol !== "https:") {
    throw new CredentialUnavailableError(
      `${credentialName}: is unavailable. ${ErrorMessages.INVALID_HTTPS_SCHEME(tokenProxy.protocol)}`,
    );
  }

  if (tokenProxy.username || tokenProxy.password) {
    throw new CredentialUnavailableError(
      `${credentialName}: is unavailable. ${ErrorMessages.TOKEN_ENDPOINT_NO_USER_INFO(tokenProxy.toString())}`,
    );
  }

  if (tokenProxy.search) {
    throw new CredentialUnavailableError(
      `${credentialName}: is unavailable. ${ErrorMessages.TOKEN_ENDPOINT_NO_QUERY(tokenProxy.toString())}`,
    );
  }

  if (tokenProxy.hash) {
    throw new CredentialUnavailableError(
      `${credentialName}: is unavailable. ${ErrorMessages.TOKEN_ENDPOINT_NO_FRAGMENT(tokenProxy.toString())}`,
    );
  }

  if (!tokenProxy.pathname || tokenProxy.pathname === "") {
    // if the path is empty, set it to "/" to avoid stripping the path from req.URL
    tokenProxy.pathname = "/";
  }

  return tokenProxy.toString();
}

/**
 * Workload Identity authentication is a feature in Azure that allows applications running on virtual machines (VMs)
 * to access other Azure resources without the need for a service principal or managed identity. With Workload Identity
 * authentication, applications authenticate themselves using their own identity, rather than using a shared service
 * principal or managed identity. Under the hood, Workload Identity authentication uses the concept of Service Account
 * Credentials (SACs), which are automatically created by Azure and stored securely in the VM. By using Workload
 * Identity authentication, you can avoid the need to manage and rotate service principals or managed identities for
 * each application on each VM. Additionally, because SACs are created automatically and managed by Azure, you don't
 * need to worry about storing and securing sensitive credentials themselves.
 * The WorkloadIdentityCredential supports Microsoft Entra Workload ID authentication on Azure Kubernetes and acquires
 * a token using the SACs available in the Azure Kubernetes environment.
 * Refer to <a href="https://learn.microsoft.com/azure/aks/workload-identity-overview">Microsoft Entra
 * Workload ID</a> for more information.
 */
export class WorkloadIdentityCredential implements TokenCredential {
  private client: ClientAssertionCredential | undefined;
  private azureFederatedTokenFileContent: string | undefined = undefined;
  private cacheDate: number | undefined = undefined;
  private federatedTokenFilePath: string | undefined;

  // AKS proxy CA caching - persists across token requests
  private cachedTlsSettings: (TlsSettings & { servername?: string }) | undefined;
  private cachedCaData: Buffer | undefined;
  private caData: string | undefined;
  private caFile: string | undefined;
  private sniName: string | undefined;

  /**
   * WorkloadIdentityCredential supports Microsoft Entra Workload ID on Kubernetes.
   *
   * @param options - The identity client options to use for authentication.
   */
  constructor(options?: WorkloadIdentityCredentialOptions) {
    // Logging environment variables for error details
    const assignedEnv = processEnvVars(SupportedWorkloadEnvironmentVariables).assigned.join(", ");
    logger.info(`Found the following environment variables: ${assignedEnv}`);

    const workloadIdentityCredentialOptions = options ?? {};
    const tenantId = workloadIdentityCredentialOptions.tenantId || process.env.AZURE_TENANT_ID;
    const clientId = workloadIdentityCredentialOptions.clientId || process.env.AZURE_CLIENT_ID;
    this.federatedTokenFilePath =
      workloadIdentityCredentialOptions.tokenFilePath || process.env.AZURE_FEDERATED_TOKEN_FILE;

    if (tenantId) {
      checkTenantId(logger, tenantId);
    }
    if (!clientId) {
      throw new CredentialUnavailableError(
        `${credentialName}: is unavailable. ${ErrorMessages.CLIENT_ID_REQUIRED}`,
      );
    }

    if (!tenantId) {
      throw new CredentialUnavailableError(
        `${credentialName}: is unavailable. ${ErrorMessages.TENANT_ID_REQUIRED}`,
      );
    }

    if (!this.federatedTokenFilePath) {
      throw new CredentialUnavailableError(
        `${credentialName}: is unavailable. ${ErrorMessages.TOKEN_FILE_PATH_REQUIRED}`,
      );
    }

    // Use identity binding mode only when enableAzureProxy is set
    if (workloadIdentityCredentialOptions.enableAzureProxy) {
      const kubernetesTokenProxy = process.env.AZURE_KUBERNETES_TOKEN_PROXY;
      const kubernetesSNIName = process.env.AZURE_KUBERNETES_SNI_NAME;
      const kubernetesCAFile = process.env.AZURE_KUBERNETES_CA_FILE;
      const kubernetesCAData = process.env.AZURE_KUBERNETES_CA_DATA;

      if (!kubernetesTokenProxy) {
        // Custom token proxy is not set, while other Kubernetes-related environment variables are present,
        // this is likely a configuration issue so erroring out to avoid misconfiguration
        if (kubernetesSNIName || kubernetesCAFile || kubernetesCAData) {
          throw new CredentialUnavailableError(
            `${credentialName}: is unavailable. ${ErrorMessages.TOKEN_PROXY_NOT_SET}`,
          );
        }
        logger.info(
          `enableAzureProxy is true but AZURE_KUBERNETES_TOKEN_PROXY is not set, using normal authentication flow`,
        );
      } else {
        const tokenProxy = parseAndValidateCustomTokenProxy(kubernetesTokenProxy);

        // CAFile and CAData are mutually exclusive, at most one can be set.
        // If none of CAFile or CAData are set, the default system CA pool will be used.
        if (kubernetesCAFile && kubernetesCAData) {
          throw new CredentialUnavailableError(
            `${credentialName}: is unavailable. ${ErrorMessages.CA_FILE_AND_DATA_EXCLUSIVE}`,
          );
        }

        this.caData = kubernetesCAData;
        this.caFile = kubernetesCAFile;
        this.sniName = kubernetesSNIName;

        // Configure client options with AKS proxy client
        const proxyClient = this.createAksProxyClient(tokenProxy);
        workloadIdentityCredentialOptions.httpClient = proxyClient;
        logger.info(`${credentialName}: Using proxy client for token requests`);
      }
    }

    logger.info(
      `Invoking ClientAssertionCredential with tenant ID: ${tenantId}, clientId: ${workloadIdentityCredentialOptions.clientId} and federated token path: [REDACTED]`,
    );

    this.client = new ClientAssertionCredential(
      tenantId,
      clientId,
      this.readFileContents.bind(this),
      workloadIdentityCredentialOptions,
    );
  }

  /**
   * Creates a proxy HttpClient that intercepts token requests and redirects them to the Kubernetes endpoint
   * Caching is handled at the credential level to persist across token requests
   */
  private createAksProxyClient(tokenEndpoint: string): HttpClient {
    const defaultClient = createDefaultHttpClient();
    // Init cached TLS settings at construction time to fail fast on misconfiguration
    this.cachedTlsSettings = this.getTlsSettings();

    return {
      sendRequest: async (request: PipelineRequest): Promise<PipelineResponse> => {
        const requestUrl = new URL(request.url);

        logger.info(
          `${credentialName}: Redirecting request to Kubernetes endpoint: ${tokenEndpoint}`,
        );

        const proxyUrl = new URL(tokenEndpoint);

        // Remove leading slash from request path and join with proxy path
        const requestPath = requestUrl.pathname.replace(/^\//, "");
        const combinedPath = proxyUrl.pathname.endsWith("/")
          ? proxyUrl.pathname + requestPath
          : proxyUrl.pathname + "/" + requestPath;

        // Create new URL preserving query and fragment from original request
        const newUrl = new URL(proxyUrl.origin);
        newUrl.pathname = combinedPath;
        newUrl.search = requestUrl.search;
        newUrl.hash = requestUrl.hash;

        request.url = newUrl.toString();
        request.tlsSettings = this.getTlsSettings();

        logger.info(`${credentialName}: Sending request to ${request.url}`);
        // Forward the modified request with custom TLS settings
        return defaultClient.sendRequest(request);
      },
    };
  }

  /**
   * Gets TLS settings for the request.
   * Handles a few scenarios with CA data or CA file provided.
   */
  private getTlsSettings(): TlsSettings & { servername?: string } {
    // No CA overrides, use default transport
    if (!this.caData && !this.caFile) {
      if (!this.cachedTlsSettings) {
        this.cachedTlsSettings = this.sniName ? { servername: this.sniName } : {};
      }
      return this.cachedTlsSettings;
    }

    // Host provided CA bytes in AZURE_KUBERNETES_CA_DATA and can't change now
    if (!this.caFile) {
      if (!this.cachedTlsSettings) {
        if (!canParseAsX509Certificate(this.caData!)) {
          throw new CredentialUnavailableError(
            `${credentialName}: is unavailable. ${ErrorMessages.INVALID_CA_CERTIFICATES}`,
          );
        }
        this.cachedTlsSettings = this.sniName ? { servername: this.sniName } : {};
        this.cachedTlsSettings.ca = this.caData;
      }
      return this.cachedTlsSettings;
    }

    // Host provided the CA bytes in a file whose contents it can change,
    let fileContent: Buffer;
    try {
      fileContent = readFileSync(this.caFile);
    } catch (error) {
      throw new CredentialUnavailableError(
        `${credentialName}: is unavailable. ${ErrorMessages.FAILED_TO_READ_CA_FILE(this.caFile!, error)}`,
      );
    }
    // This can happen in the middle of CA rotation
    if (fileContent.length === 0) {
      if (!this.cachedTlsSettings) {
        // If the transport was never created, error out here to force retrying the call later
        throw new CredentialUnavailableError(
          `${credentialName}: is unavailable. ${ErrorMessages.CA_FILE_EMPTY(this.caFile)}`,
        );
      }
      // If the transport was already created, just keep using it
      return this.cachedTlsSettings;
    }

    // Check if CA has changed
    if (!this.cachedCaData || !fileContent.equals(this.cachedCaData)) {
      const caDataString = fileContent.toString("utf8");

      if (!canParseAsX509Certificate(caDataString)) {
        throw new CredentialUnavailableError(
          `${credentialName}: is unavailable. ${ErrorMessages.INVALID_CA_CERTIFICATES}`,
        );
      }

      // CA has changed, rebuild the TLS settings with new CA pool
      this.cachedTlsSettings = {
        ca: caDataString,
        ...(this.sniName && { servername: this.sniName }),
      };
      this.cachedCaData = fileContent;
    }

    return this.cachedTlsSettings!;
  }

  /**
   * Authenticates with Microsoft Entra ID and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public async getToken(
    scopes: string | string[],
    options?: GetTokenOptions,
  ): Promise<AccessToken> {
    if (!this.client) {
      const errorMessage = `${credentialName}: is unavailable. ${ErrorMessages.MISSING_ENV_VARS}`;
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
        `${credentialName}: is unavailable. ${ErrorMessages.INVALID_FILE_PATH(this.federatedTokenFilePath)}`,
      );
    }
    if (!this.azureFederatedTokenFileContent) {
      const file = await readFile(this.federatedTokenFilePath, "utf8");
      const value = file.trim();
      if (!value) {
        throw new CredentialUnavailableError(
          `${credentialName}: is unavailable. ${ErrorMessages.NO_FILE_CONTENT(this.federatedTokenFilePath)}`,
        );
      } else {
        this.azureFederatedTokenFileContent = value;
        this.cacheDate = Date.now();
      }
    }
    return this.azureFederatedTokenFileContent;
  }
}
