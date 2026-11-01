// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import pkgJson from "@azure/arm-koreaiartemis/package.json" with { type: "json" };
import { KnownVersions } from "../models/models.js";
import type { AzureSupportedClouds } from "../static-helpers/cloudSettingHelpers.js";
import { getArmEndpoint } from "../static-helpers/cloudSettingHelpers.js";
import type { Client, ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { TokenCredential } from "@azure/core-auth";

/**
 * Kore.AgentPlatform Resource Provider for managing Kore AI Agent Platform
 * Organizations and their Workspaces.
 *
 * Organizations are top-level tracked ARM resources. Each Organization is
 * provisioned together with a default Workspace. Additional Workspaces are
 * managed as a child proxy resource type under the Organization using the
 * standard ARM verbs (PUT / DELETE / GET / LIST) on the workspace URL.
 *
 * Service-to-service authentication between Liftr and Kore uses federated
 * Microsoft Entra credentials and is enforced at the runtime layer
 * (not on the ARM surface).
 */
export interface AgentPlatformContext extends Client {
  /** The ID of the target subscription. The value must be an UUID. */
  subscriptionId: string;
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** Optional parameters for the client. */
export interface AgentPlatformClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
  /** Specifies the Azure cloud environment for the client. */
  cloudSetting?: AzureSupportedClouds;
}

/**
 * Kore.AgentPlatform Resource Provider for managing Kore AI Agent Platform
 * Organizations and their Workspaces.
 *
 * Organizations are top-level tracked ARM resources. Each Organization is
 * provisioned together with a default Workspace. Additional Workspaces are
 * managed as a child proxy resource type under the Organization using the
 * standard ARM verbs (PUT / DELETE / GET / LIST) on the workspace URL.
 *
 * Service-to-service authentication between Liftr and Kore uses federated
 * Microsoft Entra credentials and is enforced at the runtime layer
 * (not on the ARM surface).
 */
export function createAgentPlatform(
  credential: TokenCredential,
  subscriptionId: string,
  options: AgentPlatformClientOptionalParams = {},
): AgentPlatformContext {
  const endpointUrl =
    options.endpoint ?? getArmEndpoint(options.cloudSetting) ?? "https://management.azure.com";
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-arm-koreaiartemis/${pkgJson.version}`;
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
      scopes: options.credentials?.scopes ?? ["https://management.azure.com/.default"],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  const apiVersion = options.apiVersion;
  return { ...clientContext, apiVersion, subscriptionId } as AgentPlatformContext;
}
