// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import pkgJson from "@azure/schema-registry/package.json" with { type: "json" };
import { KnownServiceVersion } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

/** SchemaRegistryClient is a client for registering and retrieving schemas from the Azure Schema Registry service. */
export interface SchemaRegistryContext extends Client {
  /** The Schema Registry service endpoint, for example 'my-namespace.servicebus.windows.net'. */
  fullyQualifiedNamespace: string;
  /** The API version to use for this operation. */
  /** Known values of {@link KnownServiceVersion} that the service accepts. */
  apiVersion?: string;
}

/** Optional parameters for the client. */
export interface SchemaRegistryClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownServiceVersion} that the service accepts. */
  apiVersion?: string;
  /** @deprecated Use `credentials.scopes` instead. */
  credentialScopes?: string | string[];
}

/** SchemaRegistryClient is a client for registering and retrieving schemas from the Azure Schema Registry service. */
export function createSchemaRegistry(
  fullyQualifiedNamespace: string,
  credential: TokenCredential,
  options: SchemaRegistryClientOptionalParams = {},
): SchemaRegistryContext {
  const endpointUrl = options.endpoint ?? `https://${fullyQualifiedNamespace}`;
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-schema-registry/${pkgJson.version}`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} ${userAgentInfo}`
    : `${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: {
      ...options.loggingOptions,
      logger: options.loggingOptions?.logger ?? logger.info,
    },
    credentials: {
      scopes: options.credentials?.scopes ??
        (typeof options.credentialScopes === "string"
          ? [options.credentialScopes]
          : options.credentialScopes) ?? ["https://eventhubs.azure.net/.default"],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  const apiVersion = options.apiVersion;
  return { ...clientContext, fullyQualifiedNamespace, apiVersion } as SchemaRegistryContext;
}
