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
import { SpanStatusCode } from "@azure/core-tracing";

import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
import { ConfigurationSetting, GeneratedClient } from "./generated";
import { createSpan } from "./tracing";
import { quoteETag } from "./util";

// re-export generated types that are used as public interfaces.
export { ConfigurationSetting };

/**
 * Options for the `getConfigurationSetting` method of `ConfigurationClient`.
 */
export interface GetConfigurationSettingOptions extends OperationOptions {
  /**
   * If set to `true`, the method will use entity tags to instruct the service
   * to send an updated value only if the value has changed.
   *
   * NOTE: This option is only supported if passing a full
   * `ConfigurationSetting` object with an `etag` as the first parameter to
   * `getConfigurationSetting`.
   */
  onlyIfChanged?: boolean;
}

/**
 * Client options used to configure App Configuration API requests.
 */
export interface ConfigurationClientOptions extends PipelineOptions {
  // Any custom options configured at the client level go here.
}

/**
 * The client class used to interact with the App Configuration service.
 */
export class ConfigurationClient {
  private client: GeneratedClient;

  /**
   * Creates an instance of a ConfigurationClient.
   *
   * Example usage:
   * ```ts
   * import { ConfigurationClient} from "@azure/ai-text-analytics";
   * import { DefaultAzureCredential} from "@azure/identity";
   *
   * const client = new ConfigurationClient(
   *    "<app configuration endpoint>",
   *    new DefaultAzureCredential()
   * );
   * ```
   * @param endpointUrl - the URL to the App Configuration endpoint
   * @param credential - used to authenticate requests to the service
   * @param options - optional configuration used to send requests to the service
   */
  constructor(
    endpointUrl: string,
    credential: TokenCredential,
    options: ConfigurationClientOptions = {}
  ) {
    // The below code helps us set a proper User-Agent header on all requests
    const libInfo = `azsdk-js-template-template/${SDK_VERSION}`;
    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }
    if (options.userAgentOptions.userAgentPrefix) {
      options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      options.userAgentOptions.userAgentPrefix = libInfo;
    }

    // The AAD scope for an API is usually the baseUri + "/.default", but it
    // may be different for your service.
    const authPolicy = bearerTokenAuthenticationPolicy(credential, `${endpointUrl}/.default`);

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      deserializationOptions: {
        expectedContentTypes: {
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

  /**
   * Retrieve the contents of an App Configuration setting by name (key).
   *
   * @param key - the unique name of the setting to get
   * @param options - optional configuration for the operation
   */
  public async getConfigurationSetting(
    key: string,
    options?: GetConfigurationSettingOptions
  ): Promise<ConfigurationSetting>;

  /**
   * Retrieve an updated value of an App Configuration setting, allowing for
   * the use of entity tags to request the new value only if it has changed.
   *
   * @param setting - the setting to retrieve from the service
   * @param options - optional configuration for the operation
   */
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
      // Here you set the name of the span, usually clientName-operationName
      "ConfigurationClient-getConfigurationSetting",
      options
    );

    try {
      const result = await this.client.getKeyValue(key, {
        ...updatedOptions,
        ifNoneMatch
      });
      return result;
    } catch (e) {
      // There are different standard codes available for different errors:
      // https://github.com/open-telemetry/opentelemetry-specification/blob/master/specification/trace/api.md#status
      span.setStatus({ code: SpanStatusCode.ERROR, message: e.message });

      throw e;
    } finally {
      span.end();
    }
  }
}
