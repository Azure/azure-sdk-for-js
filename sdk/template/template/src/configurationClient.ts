// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ConfigurationSetting, GeneratedClient } from "./generated";
import {
  CommonClientOptions,
  OperationOptions,
  InternalClientPipelineOptions,
} from "@azure/core-client";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";
import { TracingClient, createTracingClient } from "@azure/core-tracing";
import { SDK_VERSION } from "./constants";
import { logger } from "./logger";
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
export interface ConfigurationClientOptions extends CommonClientOptions {
  // Any custom options configured at the client level go here.
}

/**
 * The client class used to interact with the App Configuration service.
 */
export class ConfigurationClient {
  private client: GeneratedClient;
  private tracingClient: TracingClient;

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
    // The AAD scope for an API is usually the baseUri + "/.default", but it
    // may be different for your service.
    const authPolicy = bearerTokenAuthenticationPolicy({
      credential,
      scopes: `${endpointUrl}/.default`,
    });

    const internalClientPipelineOptions: InternalClientPipelineOptions = {
      ...options,
      deserializationOptions: {
        expectedContentTypes: {
          json: [
            "application/vnd.microsoft.appconfig.kvset+json",
            "application/vnd.microsoft.appconfig.kv+json",
            "application/vnd.microsoft.appconfig.kvs+json",
            "application/vnd.microsoft.appconfig.keyset+json",
            "application/vnd.microsoft.appconfig.revs+json",
          ],
        },
      },
      ...{
        loggingOptions: {
          logger: logger.info,
          // This array contains header names we want to log that are not already
          // included as safe. Unknown/unsafe headers are logged as "<REDACTED>".
          additionalAllowedHeaderNames: ["x-ms-correlation-request-id"],
        },
      },
    };

    this.client = new GeneratedClient(endpointUrl, internalClientPipelineOptions);
    this.client.pipeline.addPolicy(authPolicy);
    this.tracingClient = createTracingClient({
      // The name of the resource provider requests are made against, as described in
      // https://github.com/Azure/azure-sdk/blob/main/docs/tracing/distributed-tracing-conventions.yml#L11-L15
      namespace: "Microsoft.Learn",
      // The package name and version
      packageName: "@azure/template",
      packageVersion: SDK_VERSION,
    });
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

    return this.tracingClient.withSpan(
      // Span names should take the form "<className>.<methodName>".
      "ConfigurationClient.getConfigurationSetting",
      options,
      (updatedOptions) => {
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

        // You must pass updatedOptions to any calls you make within the callback.
        return this.client.getKeyValue(key, { ...updatedOptions, ifNoneMatch });
      }
    );
  }
}
