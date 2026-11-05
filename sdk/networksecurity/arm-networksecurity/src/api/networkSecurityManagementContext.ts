// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import pkgJson from "@azure/arm-networksecurity/package.json" with { type: "json" };
import { KnownVersions } from "../models/models.js";
import type { AzureSupportedClouds } from "../static-helpers/cloudSettingHelpers.js";
import { getArmEndpoint } from "../static-helpers/cloudSettingHelpers.js";
import type { Client, ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/core-auth";

export interface NetworkSecurityManagementContext extends Client {
  /** The ID of the target subscription. The value must be an UUID. */
  subscriptionId: string;
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** Optional parameters for the client. */
export interface NetworkSecurityManagementClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
  /** Specifies the Azure cloud environment for the client. */
  cloudSetting?: AzureSupportedClouds;
}

export function createNetworkSecurityManagement(
  credential: TokenCredential,
  subscriptionId: string,
  options: NetworkSecurityManagementClientOptionalParams = {},
): NetworkSecurityManagementContext {
  const armEndpoint = getArmEndpoint(options.cloudSetting) ?? "https://management.azure.com";
  const endpointUrl = options.endpoint ?? armEndpoint;
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-arm-networksecurity/${pkgJson.version}`;
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
      scopes: options.credentials?.scopes ?? [`${armEndpoint.replace(/\/$/, "")}/.default`],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  const apiVersion = options.apiVersion;
  return { ...clientContext, apiVersion, subscriptionId } as NetworkSecurityManagementContext;
}
