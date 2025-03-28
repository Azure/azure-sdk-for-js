// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import type {
  TokenCredential,
  KeyCredential,
  isKeyCredential,
} from "@azure/core-auth";
import type { ModelClient } from "./clientDefinitions.js";

/** The optional parameters for the client */
export interface ModelClientOptions extends ClientOptions {
  /** The api version option of the client */
  apiVersion?: string;
}

/**
 * Initialize a new instance of `ModelClient`
 * @param endpointParam - The parameter endpointParam
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpointParam: string,
  credentials: TokenCredential | KeyCredential,
  { apiVersion = "2024-05-01-preview", ...options }: ModelClientOptions = {},
): ModelClient {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `${endpointParam}`;
  const userAgentInfo = `azsdk-js-ai-inference-rest/1.0.0-beta.1`;
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
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://ml.azure.com/.default"],
    },
  };
  const client = getClient(endpointUrl, credentials, options) as ModelClient;

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
  if (isKeyCredential(credentials)) {
    client.pipeline.addPolicy({
      name: "customKeyCredentialPolicy",
      async sendRequest(request, next) {
        request.headers.set("Authorization", "Bearer " + credentials.key);
        return next(request);
      },
    });
  }

  return client;
}
