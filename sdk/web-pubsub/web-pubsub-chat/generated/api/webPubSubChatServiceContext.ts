// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import pkgJson from "@azure/web-pubsub-chat/package.json" with { type: "json" };
import { KnownVersions } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface WebPubSubChatServiceContext extends Client {
  /**
   * Target hub name, which should start with alphabetic characters and only contain
   *      alpha-numeric characters or underscore.
   */
  hub: string;
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** Optional parameters for the client. */
export interface WebPubSubChatServiceClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

export function createWebPubSubChatService(
  endpointParam: string,
  credential: TokenCredential,
  hub: string,
  options: WebPubSubChatServiceClientOptionalParams = {},
): WebPubSubChatServiceContext {
  const endpointUrl = options.endpoint ?? String(endpointParam);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-web-pubsub-chat/${pkgJson.version}`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} ${userAgentInfo}`
    : `${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://webpubsub.azure.com/.default"],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  const apiVersion = options.apiVersion;
  return { ...clientContext, apiVersion, hub } as WebPubSubChatServiceContext;
}
