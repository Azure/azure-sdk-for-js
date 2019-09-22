import { TokenCredential } from "@azure/core-http";
import { KeyValue as ConfigurationSetting, AppConfigurationGetKeyValuesOptionalParams, GetKeyValuesResponse, PutKeyValueResponse as AddConfigurationSettingResponse, PutKeyValueResponse as SetConfigurationSettingResponse, AppConfigurationPutKeyValueOptionalParams as GeneratedPutParams, AppConfigurationDeleteKeyValueOptionalParams as DeleteConfigurationSettingOptions, DeleteKeyValueResponse as DeleteConfigurationSettingResponse, AppConfigurationGetKeyValueOptionalParams as GetConfigurationSettingOptions, GetKeyValueResponse as GetConfigurationSettingResponse, AppConfigurationGetRevisionsOptionalParams as ListRevisionsOptions, GetRevisionsResponse as ListRevisionsResponse } from "./generated/src/models/index";
export { DeleteKeyValueResponse, PutKeyValueResponse, GetRevisionsResponse, GetKeyValueResponse, AppConfigurationGetKeyValueOptionalParams, AppConfigurationPutKeyValueOptionalParams, AppConfigurationDeleteKeyValueOptionalParams, AppConfigurationGetRevisionsOptionalParams, AppConfigurationGetKeyValuesOptionalParams } from "./generated/src/models/index";
export interface ConfigurationSettingParam extends Pick<ConfigurationSetting, Exclude<keyof ConfigurationSetting, 'locked' | 'etag' | 'lastModified'>> {
}
export interface ConfigurationSettingId extends Pick<ConfigurationSetting, 'key' | 'label' | 'etag'> {
}
export interface ConfigurationSettingOptions extends Pick<GeneratedPutParams, Exclude<keyof GeneratedPutParams, 'label' | 'entity'>> {
}
export interface ListConfigurationSettingsOptions extends Pick<AppConfigurationGetKeyValuesOptionalParams, Exclude<keyof AppConfigurationGetKeyValuesOptionalParams, 'key' | 'label' | 'select' | 'after'>> {
    /**
     * Filters for wildcard matching (using *) against keys. These conditions are logically OR'd against each other.
     */
    keys?: string[];
    /**
     * Filters for wildcard matching (using *) against labels. These conditions are logically OR'd against each other.
     */
    labels?: string[];
    /**
     * Which fields to return for each ConfigurationSetting
     */
    fields?: (keyof ConfigurationSetting)[];
}
export interface ListConfigurationSettingsResponse extends GetKeyValuesResponse {
}
export { ConfigurationSetting };
export interface ETagOption {
    /**
     * Entity tag (etag) of the object
     */
    etag?: string;
}
export interface RespectETagOption {
    /**
     * Whether or not we respect the ETag field in the passed-in ConfigurationSetting
     */
    respectETag?: boolean;
}
/**
 * Client for the Azure App Configuration service.
 */
export declare class AppConfigurationClient {
    private client;
    /**
     * Initializes a new instance of the AppConfigurationClient class.
     * @param connectionString Connection string needed for a client to connect to Azure.
     */
    constructor(connectionString: string);
    /**
     * Initializes a new instance of the AppConfigurationClient class.
     * @param uri The base URI for the Azure service
     * @param credential The credentials to use for authentication.
     */
    constructor(uri: string, credential: TokenCredential);
    /**
     * Add a setting into the Azure App Configuration service, failing if it
     * already exists.
     *
     * Example usage:
     * ```ts
     * const result = await client.addConfigurationSetting({ key: "MyKey", label: "MyLabel", value: "MyValue" });
     * ```
     * @param configurationSetting A configuration setting.
     * @param options Optional parameters for the request.
     */
    addConfigurationSetting(configurationSetting: ConfigurationSettingParam, options?: ConfigurationSettingOptions): Promise<AddConfigurationSettingResponse>;
    /**
     * Delete a setting from the Azure App Configuration service
     *
     * Example usage:
     * ```ts
     * const deletedSetting = await client.deleteConfigurationSetting("MyKey", { label: "MyLabel" });
     * ```
     * @param key The name of the key.
     * @param options Optional parameters for the request (ex: etag, label)
     */
    deleteConfigurationSetting(key: string, options: DeleteConfigurationSettingOptions & ETagOption): Promise<DeleteConfigurationSettingResponse>;
    /**
     * Gets a setting from the Azure App Configuration service.
     *
     * Example code:
     * ```ts
     * const setting = await client.getConfigurationSetting("MyKey", { label: "MyLabel" });
     * ```
     * @param key The name of the key.
     * @param options Optional parameters for the request.
     */
    getConfigurationSetting(key: string, options?: GetConfigurationSettingOptions): Promise<GetConfigurationSettingResponse>;
    /**
     * Lists settings from the Azure App Configuration service, optionally filtered by label,
     * accept date time or name.
     *
     * Example code:
     * ```ts
     * const allSettingsWithLabel = await client.listConfigurationSettings({ label: "MyLabel" });
     * ```
     * @param options Optional parameters for the request.
     */
    listConfigurationSettings(options?: ListConfigurationSettingsOptions): Promise<ListConfigurationSettingsResponse>;
    listConfigurationSettingsNext(nextLink: string, options?: ListConfigurationSettingsOptions): Promise<ListConfigurationSettingsResponse>;
    /**
     * Lists revisions of a set of keys within the Azure App Configuration service.
     *
     * Example code:
     * ```ts
     * const revisionsForMyKey = await client.listRevisions({ key: ["MyKey"] });
     * ```
     * @param options Optional parameters for the request.
     */
    listRevisions(options?: ListRevisionsOptions): Promise<ListRevisionsResponse>;
    /**
     * Sets the value of a key in the Azure App Configuration service, allowing for an optional etag.
     * @param key The name of the key.
     * @param configurationSetting A configuration value.
     * @param options Optional parameters for the request.
     *
     * Example code:
     * ```ts
     * await client.setConfigurationSetting({ key: "MyKey", value: "MyValue" });
     * ```
     */
    setConfigurationSetting(configurationSetting: ConfigurationSettingParam & ETagOption, options?: ConfigurationSettingOptions & RespectETagOption): Promise<SetConfigurationSettingResponse>;
    /** Checks if a value has changed  */
    hasChanged(params: ConfigurationSettingId): Promise<boolean>;
    /**
     * Sets a key's value to read only
     * @param key The name of the setting.
     * @param label The (optional) label of the setting.
     */
    setReadOnly(key: string, label?: string): Promise<any>;
    /**
     * Makes the key's value writable again
     * @param key The name of the setting.
     * @param label The (optional) label of the setting.
     */
    clearReadOnly(key: string, label?: string): Promise<any>;
    private static formatETagForMatchHeaders;
    private static formatWildcards;
    private static extractAfterTokenFromNextLink;
}
//# sourceMappingURL=index.d.ts.map