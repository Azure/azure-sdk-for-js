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
import { createPipelineRequest, createDefaultHttpClient } from "@azure/core-rest-pipeline";
import type { TlsSettings } from "@azure/core-rest-pipeline";

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

/**
 * Environment variables for the identity binding feature.
 * They are only used when `EnableAzureKubernetesTokenProxy` is set in the environment.
 * @internal
 */
export const SupportedIdentityBindingWorkloadEnvironmentVariables = [
  "AZURE_KUBERNETES_TOKEN_ENDPOINT",
  "AZURE_KUBERNETES_SNI_NAME",
  "AZURE_KUBERNETES_CA_FILE",
  "AZURE_KUBERNETES_CA_DATA",
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
 * Creates a proxy HttpClient that intercepts token requests and redirects them to the Kubernetes endpoint
 * Following Go customTokenProxyPolicy pattern - handles both caching and URL rewriting in one place
 */
function createAksProxyClient(
  tokenEndpoint: string,
  sniName?: string,
  caFile?: string,
  caData?: string,
): HttpClient {
  const defaultClient = createDefaultHttpClient();

  let cachedTlsSettings: (TlsSettings & { servername?: string }) | undefined;
  let cachedCaData: Buffer | undefined;

  return {
    sendRequest: async (request: PipelineRequest): Promise<PipelineResponse> => {
      const requestUrl = new URL(request.url);

      logger.info(
        `${credentialName}: Redirecting request to Kubernetes endpoint: ${tokenEndpoint}`,
      );

      try {
        let tlsSettings: TlsSettings & { servername?: string };

        // Scenario 1: no CA overrides, use default transport. The transport is fixed after set.
        if (!caData && !caFile) {
          if (!cachedTlsSettings) {
            cachedTlsSettings = sniName ? { servername: sniName } : {};
          }
          tlsSettings = cachedTlsSettings;
        }
        // Scenario 2: CA data override provided, use a transport with custom CA pool.
        // This transport is fixed after set.
        else if (!caFile) {
          if (!cachedTlsSettings) {
            cachedTlsSettings = {
              ca: caData,
              ...(sniName && { servername: sniName }),
            };
          }
          tlsSettings = cachedTlsSettings;
        }
        // Scenario 3: CA file override is provided, use a transport with custom CA pool.
        // This transport needs to be recreated if the CA file content changes.
        else {
          const fileContent = await readFile(caFile, null); // Read as Buffer for comparison

          if (fileContent.length === 0) {
            // This can happen during the middle of CA rotation on the host.
            if (!cachedTlsSettings) {
              // If the transport was never created, error out here to force retrying the call later
              throw new CredentialUnavailableError(
                `${credentialName}: is unavailable. ${ErrorMessages.CA_FILE_EMPTY(caFile)}`,
              );
            }
            tlsSettings = cachedTlsSettings;
          } else {
            // Check if CA has changed
            if (!cachedCaData || !fileContent.equals(cachedCaData)) {
              // CA has changed, rebuild the TLS settings with new CA pool
              cachedTlsSettings = {
                ca: fileContent.toString('utf8'),
                ...(sniName && { servername: sniName }),
              };
              cachedCaData = fileContent;
            }
            tlsSettings = cachedTlsSettings!;
          }
        }

        // Rewrite request URL following Go rewriteProxyRequestURL pattern
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

        const kubernetesRequest = createPipelineRequest({
          url: newUrl.toString(),
          method: request.method,
          headers: request.headers,
          body: request.body,
          abortSignal: request.abortSignal,
          tlsSettings,
        });

        logger.info(`${credentialName}: Sending request to ${kubernetesRequest.url}`);

        // Forward the request with custom TLS settings
        return defaultClient.sendRequest(kubernetesRequest);

      } catch (error) {
        if (error instanceof CredentialUnavailableError) {
          throw error;
        }
        throw new CredentialUnavailableError(
          `${credentialName}: is unavailable. ${ErrorMessages.FAILED_TO_READ_CA_FILE(caFile!, error)}`,
        );
      }
    },
  };
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

    // Use identity binding mode only when enableAzureKubernetesTokenProxy is set
    if (workloadIdentityCredentialOptions.enableAzureKubernetesTokenProxy) {
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
          `enableAzureKubernetesTokenProxy is set but AZURE_KUBERNETES_TOKEN_PROXY is not configured, using normal authentication flow`,
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

        // Configure client options with AKS proxy client
        const proxyClient = createAksProxyClient(
          tokenProxy,
          kubernetesSNIName,
          kubernetesCAFile,
          kubernetesCAData,
        );
        workloadIdentityCredentialOptions.httpClient = proxyClient;
        logger.info(`${credentialName}: Using AKS proxy client for token requests`);
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
