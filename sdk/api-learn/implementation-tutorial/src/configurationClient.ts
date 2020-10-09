// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineOptions,
  TokenCredential,
  OperationOptions,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  InternalPipelineOptions
} from "@azure/core-http";
import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import { ConfigurationSetting, GeneratedClient } from "./generated";

// re-export generated types that are used as public interfaces.
export { ConfigurationSetting };

export interface GetConfigurationSettingOptions extends OperationOptions {
  onlyIfChanged?: boolean;
}

export interface ConfigurationClientOptions extends PipelineOptions {
  // any custom options go here.
}

export class ConfigurationClient {
  private client: GeneratedClient;

  constructor(
    endpointUrl: string,
    credential: TokenCredential,
    options: ConfigurationClientOptions = {}
  ) {
    // The below code helps us set a proper User-Agent header on all requests
    const libInfo = `azsdk-js-api-learn-implementationtutorial/${SDK_VERSION}`;
    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }
    if (options.userAgentOptions.userAgentPrefix) {
      options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      options.userAgentOptions.userAgentPrefix = libInfo;
    }

    // The AAD scope for an API is usually the baseUri + "/.default", but it may
    // be different for your service.
    const authPolicy = bearerTokenAuthenticationPolicy(credential, "{endpoint}/.default");

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
          // This array contains header names we want to log that are not already
          // included as safe. Unknown/unsafe headers are logged as "<REDACTED>".
          allowedHeaderNames: ["x-ms-correlation-request-id"]
        }
      }
    };
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    this.client = new GeneratedClient(endpointUrl, pipeline);
  }

  public async getConfigurationSetting(
    key: string,
    options?: GetConfigurationSettingOptions
  ): Promise<ConfigurationSetting>;
  public async getConfigurationSetting(
    setting: ConfigurationSetting,
    options?: GetConfigurationSettingOptions
  ): Promise<ConfigurationSetting>;
  public async getConfigurationSetting(
    _keyOrSetting: string | ConfigurationSetting,
    _options: GetConfigurationSettingOptions = {}
  ): Promise<ConfigurationSetting> {
    throw new Error("Not yet implemented.");
  }
}
