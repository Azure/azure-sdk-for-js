// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { KnownVersions } from "../models/models.js";
import { AzureSupportedClouds, getArmEndpoint } from "../static-helpers/cloudSettingHelpers.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

/** The SQL Migration management API provides a RESTful set of web APIs that allow users to migrate their SQL Server databases to Azure SQL. */
export interface DataMigrationManagementContext extends Client {
  /** The ID of the target subscription. The value must be an UUID. */
  subscriptionId: string;
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** Optional parameters for the client. */
export interface DataMigrationManagementClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
  /** Specifies the Azure cloud environment for the client. */
  cloudSetting?: AzureSupportedClouds;
}

/** The SQL Migration management API provides a RESTful set of web APIs that allow users to migrate their SQL Server databases to Azure SQL. */
export function createDataMigrationManagement(
  credential: TokenCredential,
  subscriptionId: string,
  options: DataMigrationManagementClientOptionalParams = {},
): DataMigrationManagementContext {
  const endpointUrl =
    options.endpoint ?? getArmEndpoint(options.cloudSetting) ?? "https://management.azure.com";
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-arm-datamigration/1.0.0-beta.1`;
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
  return { ...clientContext, apiVersion, subscriptionId } as DataMigrationManagementContext;
}
