// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { KnownVersions } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential, AzureNamedKeyCredential, isTokenCredential } from "@azure/core-auth";
import { createBatchSharedKeyCredentialsPolicy } from "../credentials/batchSharedKeyCredentials.js";

export interface BatchContext extends Client {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** Optional parameters for the client. */
export interface BatchClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/**
 * Create a BatchContext object.
 * @param endpointParam - The Batch service dataplane endpoint.
 * @param credential - The credentials used to authenticate requests to the service.
 * @param options - Optional parameters.
 */
export function createBatch(
  endpointParam: string,
  credential: TokenCredential | AzureNamedKeyCredential,
  options: BatchClientOptionalParams = {},
): BatchContext {
  const endpointUrl = options.endpoint ?? String(endpointParam);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-batch/13.0.0-beta.1`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://batch.core.windows.net//.default"],
    },
  };

  const apiVersion = options.apiVersion;

  // Customization for BatchClient, shouldn't be overwritten by codegen
  if (isTokenCredential(credential)) {
    const clientContext = getClient(endpointUrl, credential, updatedOptions);
    return { ...clientContext, apiVersion } as BatchContext;
  }

  // If the credentials are not a TokenCredential, we need to add a policy to handle the shared key auth.
  const clientContext = getClient(endpointUrl, undefined, updatedOptions);
  const authPolicy = createBatchSharedKeyCredentialsPolicy(credential);
  clientContext.pipeline.addPolicy(authPolicy);
  return { ...clientContext, apiVersion } as BatchContext;
}
