// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import pkgJson from "@azure/contoso-widget-openprverification/package.json" with { type: "json" };
import { KnownVersions } from "../models/models.js";
import type { Client, ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/core-auth";

/** A disposable Widget service for OPEN-PR-VERIFICATION-17024. */
export interface WidgetOpenPrVerificationContext extends Client {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** Optional parameters for the client. */
export interface WidgetOpenPrVerificationClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** A disposable Widget service for OPEN-PR-VERIFICATION-17024. */
export function createWidgetOpenPrVerification(
  endpointParam: string,
  credential: TokenCredential,
  options: WidgetOpenPrVerificationClientOptionalParams = {},
): WidgetOpenPrVerificationContext {
  const endpointUrl = options.endpoint ?? String(endpointParam);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-contoso-widget-openprverification/${pkgJson.version}`;
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
    credentials: { scopes: options.credentials?.scopes ?? ["https://contoso.azure.com/.default"] },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  const apiVersion = options.apiVersion;
  return { ...clientContext, apiVersion } as WidgetOpenPrVerificationContext;
}
