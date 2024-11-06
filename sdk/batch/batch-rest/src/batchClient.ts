// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import type { TokenCredential, AzureNamedKeyCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import type { BatchClient } from "./clientDefinitions.js";
import { createBatchSharedKeyCredentialsPolicy } from "./credentials/batchSharedKeyCredentials.js";
import { createReplacePoolPropertiesPolicy } from "./replacePoolPropertiesPolicy.js";

/** The optional parameters for the client */
export interface BatchClientOptions extends ClientOptions {
  /** The api version option of the client */
  apiVersion?: string;
}

/**
 * Initialize a new instance of `BatchClient`
 * @param endpointParam - Batch account endpoint (for example: https://batchaccount.eastus2.batch.azure.com).
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpointParam: string,
  credentials: TokenCredential | AzureNamedKeyCredential,
  { apiVersion = "2024-02-01.19.0", ...options }: BatchClientOptions = {},
): BatchClient {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `${endpointParam}`;
  const userAgentInfo = `azsdk-js-batch-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
    loggingOptions: {
      logger: options.loggingOptions?.logger ?? logger.info,
    },
    telemetryOptions: {
      clientRequestIdHeaderName:
        options.telemetryOptions?.clientRequestIdHeaderName ?? "client-request-id",
    },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://batch.core.windows.net//.default"],
    },
    additionalPolicies: [
      ...(options?.additionalPolicies ?? []),
      // TODO: remove after service remove certificate feature completely
      {
        policy: createReplacePoolPropertiesPolicy(),
        position: "perCall",
      },
    ],
  };

  const addClientApiVersionPolicy = (client: BatchClient): BatchClient => {
    client.pipeline.removePolicy({ name: "ApiVersionPolicy" });
    client.pipeline.addPolicy({
      name: "ClientApiVersionPolicy",
      sendRequest: (req, next) => {
        // Use the apiVersion defined in request url directly
        // Append one if there is no apiVersion and we have one at client options
        const url = new URL(req.url);
        if (!url.searchParams.get("api-version") && apiVersion) {
          req.url = `${req.url}${
            Array.from(url.searchParams.keys()).length > 0 ? "&" : "?"
          }api-version=${apiVersion}`;
        }

        return next(req);
      },
    });
    return client;
  };

  // Customization for BatchClient, shouldn't be overwritten by codegen
  if (isTokenCredential(credentials)) {
    const client = getClient(endpointUrl, credentials, options) as BatchClient;
    return addClientApiVersionPolicy(client);
  }
  // If the credentials are not a TokenCredential, we need to add a policy to handle the shared key auth.
  const client = getClient(endpointUrl, options) as BatchClient;
  const authPolicy = createBatchSharedKeyCredentialsPolicy(credentials);
  client.pipeline.addPolicy(authPolicy);
  return addClientApiVersionPolicy(client);
}
