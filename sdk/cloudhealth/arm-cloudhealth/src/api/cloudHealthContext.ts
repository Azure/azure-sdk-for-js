// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import pkgJson from "@azure/arm-cloudhealth/package.json" with { type: "json" };
import { AzureSupportedClouds, getArmEndpoint } from "../static-helpers/cloudSettingHelpers.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface CloudHealthContext extends Client {
  /** The ID of the target subscription. The value must be an UUID. */
  subscriptionId: string;
}

/** Optional parameters for the client. */
export interface CloudHealthClientOptionalParams extends ClientOptions {
  /** Specifies the Azure cloud environment for the client. */
  cloudSetting?: AzureSupportedClouds;
}

export function createCloudHealth(
  credential: TokenCredential,
  subscriptionId: string,
  options: CloudHealthClientOptionalParams = {},
): CloudHealthContext {
  const endpointUrl =
    options.endpoint ?? getArmEndpoint(options.cloudSetting) ?? "https://management.azure.com";
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-arm-cloudhealth/${pkgJson.version}`;
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

  if (options.apiVersion) {
    logger.warning(
      "This client does not support client api-version, please change it at the operation level",
    );
  }
  return { ...clientContext, subscriptionId } as CloudHealthContext;
}
