// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { KnownVersions } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface AIProjectContext extends Client {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion: string;
  /** The endpoint URL used to construct AIProjectClient. */
  getEndpointUrl(): string;
  /** The user agent string used to construct AIProjectClient. */
  getUserAgent(): { userAgentPrefix: string };
  /** The credential used to construct AIProjectClient. */
  getCredential(): TokenCredential;
}

/** Optional parameters for the client. */
export interface AIProjectClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

export function createAIProject(
  endpointParam: string,
  credential: TokenCredential,
  options: AIProjectClientOptionalParams = {},
): AIProjectContext {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? String(endpointParam);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-ai-projects/1.0.0`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://cognitiveservices.azure.com/.default"],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  clientContext.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  const apiVersion = options.apiVersion ?? "v1";
  clientContext.pipeline.addPolicy({
    name: "ClientApiVersionPolicy",
    sendRequest: (req, next) => {
      // Use the apiVersion defined in request url directly
      // Append one if there is no apiVersion and we have one at client options
      const url = new URL(req.url);
      const defaultApiVersion = url.searchParams.get("api-version") ?? apiVersion;
      // remove api-version from url
      url.searchParams.delete("api-version");
      // add api-version to url
      req.url = `${url.toString()}${
        Array.from(url.searchParams.keys()).length > 0 ? "&" : "?"
      }api-version=${defaultApiVersion}`;
      return next(req);
    },
  });
  return {
    ...clientContext,
    apiVersion,
    getEndpointUrl: () => endpointUrl,
    getUserAgent: () => ({ userAgentPrefix }),
    getCredential: () => credential,
  } as AIProjectContext;
}
