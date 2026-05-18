// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { KnownVersions } from "../models/models.js";
import type { Client, ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/core-auth";
import { SDK_VERSION } from "../constants.js";

/** The key vault client performs cryptographic key operations and vault operations against the Key Vault service. */
export interface KeyVaultContext extends Client {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion: string;
}

/** Optional parameters for the client. */
export interface KeyVaultClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** The key vault client performs cryptographic key operations and vault operations against the Key Vault service. */
export function createKeyVault(
  endpointParam: string,
  credential: TokenCredential,
  options: KeyVaultClientOptionalParams = {},
): KeyVaultContext {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? String(endpointParam);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
<<<<<<< /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolaYXwzU/result/src/api/keyVaultContext.ts
  const userAgentInfo = `azsdk-js-keyvault-certificates/1.0.0-beta.1`;
||||||| /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolaYXwzU/base/sdk/keyvault/keyvault-certificates/generated/api/keyVaultContext.ts
  const userAgentInfo = `azsdk-js-keyvault-certificates/4.10.4`;
=======
  const userAgentInfo = `azsdk-js-keyvault-certificates/${SDK_VERSION}`;
>>>>>>> /mnt/vss/_work/1/s/azure-sdk-for-js_tmp/azsdk-dev-toolaYXwzU/custom/sdk/keyvault/keyvault-certificates/src/api/keyVaultContext.ts
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://vault.azure.net/.default"],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  clientContext.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  const apiVersion = options.apiVersion ?? KnownVersions.V20250701;
  clientContext.pipeline.addPolicy({
    name: "ClientApiVersionPolicy",
    sendRequest: (req, next) => {
      // Use the apiVersion defined in request url directly
      // Append one if there is no apiVersion and we have one at client options
      const url = new URL(req.url);
      if (!url.searchParams.get("api-version")) {
        req.url = `${req.url}${
          Array.from(url.searchParams.keys()).length > 0 ? "&" : "?"
        }api-version=${apiVersion}`;
      }

      return next(req);
    },
  });
  return { ...clientContext, apiVersion } as KeyVaultContext;
}
