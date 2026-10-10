// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import pkgJson from "@azure/arm-postgresql-flexible/package.json" with { type: "json" };
import { KnownVersions } from "../models/models.js";
import type { AzureSupportedClouds } from "../static-helpers/cloudSettingHelpers.js";
import { getArmEndpoint } from "../static-helpers/cloudSettingHelpers.js";
import type { Client, ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/core-auth";

/** The Azure Database for PostgreSQL management API provides create, read, update, and delete functionality for Azure PostgreSQL resources including servers, databases, firewall rules, network configuration, security alert policies, log files and configurations with new business model. */
export interface PostgreSQLManagementFlexibleServerContext extends Client {
  /** The ID of the target subscription. The value must be an UUID. */
  subscriptionId: string;
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** Optional parameters for the client. */
export interface PostgreSQLManagementFlexibleServerClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
  /** Specifies the Azure cloud environment for the client. */
  cloudSetting?: AzureSupportedClouds;
}

/** The Azure Database for PostgreSQL management API provides create, read, update, and delete functionality for Azure PostgreSQL resources including servers, databases, firewall rules, network configuration, security alert policies, log files and configurations with new business model. */
export function createPostgreSQLManagementFlexibleServer(
  credential: TokenCredential,
  subscriptionId: string,
  options: PostgreSQLManagementFlexibleServerClientOptionalParams = {},
): PostgreSQLManagementFlexibleServerContext {
  const endpointUrl =
    options.endpoint ?? getArmEndpoint(options.cloudSetting) ?? "https://management.azure.com";
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-arm-postgresql-flexible/${pkgJson.version}`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} ${userAgentInfo}`
    : `${userAgentInfo}`;
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
  return {
    ...clientContext,
    apiVersion,
    subscriptionId,
  } as PostgreSQLManagementFlexibleServerContext;
}
