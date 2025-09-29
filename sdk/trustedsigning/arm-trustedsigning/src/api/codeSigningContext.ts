// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential } from "@azure/core-auth";
import { ClientOptions, Client, getClient } from "@azure-rest/core-client";
import { logger } from "../logger.js";

export interface CodeSigningContext extends Client {}

/** Optional parameters for the client. */
export interface CodeSigningClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  apiVersion?: string;
}

/** Code Signing resource provider api. */
export function createCodeSigning(
  credential: TokenCredential,
  options: CodeSigningClientOptionalParams = {},
): CodeSigningContext {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `https://management.azure.com`;

  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-arm-trustedsigning/1.0.0-beta.4`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? [`${endpointUrl}/.default`],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  clientContext.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  const apiVersion = options.apiVersion ?? "2024-02-05-preview";
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
  return clientContext;
}
