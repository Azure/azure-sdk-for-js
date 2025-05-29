import { ConfigurationSetting } from "./generated/index.js";
import type { CommonClientOptions, OperationOptions } from "@azure/core-client";
import type { TokenCredential } from "@azure/core-auth";
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
}
/**
 * The client class used to interact with the App Configuration service.
 */
export declare class ConfigurationClient {
    private client;
    private tracingClient;
    /**
     * Creates an instance of a ConfigurationClient.
     *
     * Example usage:
     * ```ts snippet:ReadmeSampleCreateClient
     * import { ConfigurationClient } from "@azure/template";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const client = new ConfigurationClient(
     *   process.env.ENDPOINT ?? "<app configuration endpoint>",
     *   new DefaultAzureCredential(),
     * );
     * ```
     * @param endpointUrl - the URL to the App Configuration endpoint
     * @param credential - used to authenticate requests to the service
     * @param options - optional configuration used to send requests to the service
     */
    constructor(endpointUrl: string, credential: TokenCredential, options?: ConfigurationClientOptions);
    /**
     * Retrieve the contents of an App Configuration setting by name (key).
     *
     * @param key - the unique name of the setting to get
     * @param options - optional configuration for the operation
     */
    getConfigurationSetting(key: string, options?: GetConfigurationSettingOptions): Promise<ConfigurationSetting>;
    /**
     * Retrieve an updated value of an App Configuration setting, allowing for
     * the use of entity tags to request the new value only if it has changed.
     *
     * @param setting - the setting to retrieve from the service
     * @param options - optional configuration for the operation
     */
    getConfigurationSetting(setting: ConfigurationSetting, options?: GetConfigurationSettingOptions): Promise<ConfigurationSetting>;
}
//# sourceMappingURL=configurationClient.d.ts.map