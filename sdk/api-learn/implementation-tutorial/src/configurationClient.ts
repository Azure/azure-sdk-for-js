// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineOptions,
  TokenCredential,
  OperationOptions,
  InternalPipelineOptions,
  createPipelineFromOptions,
  bearerTokenAuthenticationPolicy
} from "@azure/core-http";
import { CanonicalCode } from "@opentelemetry/api";
import { SDK_VERSION } from "./constants";
import { GeneratedClient } from "./generated";
import { ConfigurationSetting } from "./generated/models";
import { logger } from "./logger";
import { createSpan } from "./tracing";
import { quoteETag } from "./util";

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
    const libInfo = `azsdk-js-api-lean-implementationtutorial/${SDK_VERSION}`;
    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }
    if (options.userAgentOptions.userAgentPrefix) {
      options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      options.userAgentOptions.userAgentPrefix = libInfo;
    }

    // The AAD scope for an API is usually the baseUri + "/.default", but it may
    // be different for your service
    const authPolicy = bearerTokenAuthenticationPolicy(credential, `${endpointUrl}./.default`);

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      deserializationOptions: {
        expectedContentTypes: {
          // This helps the protocol layer decode the MIME types
          // send by the service correctly.
          json: [
            "application/vnd.microsoft.appconfig.kvset+json",
            "application/vnd.microsoft.appconfig.kv+json",
            "application/vnd.microsoft.appconfig.kvs+json",
            "application/vnd.microsoft.appconfig.keyset+json",
            "application/vnd.microsoft.appconfig.revs+json"
          ]
        }
      },
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
    keyOrSetting: string | ConfigurationSetting,
    options: GetConfigurationSettingOptions = {}
  ): Promise<ConfigurationSetting> {
    let key: string;
    let ifNoneMatch: string | undefined;

    if (typeof keyOrSetting === "string") {
      key = keyOrSetting;
      if (options.onlyIfChanged) {
        throw new RangeError(
          "You must pass a ConfigurationSetting instead of a key to perform a conditional fetch."
        );
      }
    } else {
      key = keyOrSetting.key;
      const etag = keyOrSetting.etag;
      if (options.onlyIfChanged) {
        ifNoneMatch = quoteETag(etag);
      }
    }
    const { span, updatedOptions } = createSpan(
      "ConfigurationClient-getConfigurationSetting",
      options
    );
    try {
      const result = await this.client.getKeyValue(key, { ...updatedOptions, ifNoneMatch });
      return result;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
