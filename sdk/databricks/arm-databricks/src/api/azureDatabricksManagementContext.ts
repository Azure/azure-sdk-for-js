// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { KnownVersions } from "../models/models.js";
import type { AzureSupportedClouds } from "../static-helpers/cloudSettingHelpers.js";
import { getArmEndpoint } from "../static-helpers/cloudSettingHelpers.js";
import type { Client, ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/core-auth";

/** ARM Databricks */
export interface AzureDatabricksManagementContext extends Client {
  /** The ID of the target subscription. The value must be an UUID. */
  subscriptionId: string;
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** Optional parameters for the client. */
export interface AzureDatabricksManagementClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
  /** Specifies the Azure cloud environment for the client. */
  cloudSetting?: AzureSupportedClouds;
}

/** ARM Databricks */
export function createAzureDatabricksManagement(
  credential: TokenCredential,
  subscriptionId: string,
  options: AzureDatabricksManagementClientOptionalParams = {},
): AzureDatabricksManagementContext {
  const endpointUrl =
    options.endpoint ?? getArmEndpoint(options.cloudSetting) ?? "https://management.azure.com";
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-arm-databricks/4.0.0-beta.1`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://management.azure.com/.default"],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  const apiVersion = options.apiVersion;
  return { ...clientContext, apiVersion, subscriptionId } as AzureDatabricksManagementContext;
}
