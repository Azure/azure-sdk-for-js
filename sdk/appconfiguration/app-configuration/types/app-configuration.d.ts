/// <reference lib="esnext.asynciterable" />
import { HttpResponse } from '@azure/core-http';
import { PagedAsyncIterableIterator } from '@azure/core-paging';
import { RequestOptionsBase } from '@azure/core-http';

/**
 * Options used when adding a ConfigurationSetting.
 */
export declare interface AddConfigurationSettingOptions extends RequestOptionsBase {
}

/**
 * Parameters for adding a new configuration setting
 */
export declare interface AddConfigurationSettingParam extends ConfigurationSettingParam {
}

/**
 * Response from adding a ConfigurationSetting.
 */
export declare interface AddConfigurationSettingResponse extends ConfigurationSetting, SyncTokenHeaderField, HttpResponseField<SyncTokenHeaderField> {
}

/**
 * Client for the Azure App Configuration service.
 */
export declare class AppConfigurationClient {
    private client;
    private spanner;
    /**
     * Initializes a new instance of the AppConfigurationClient class.
     * @param connectionString Connection string needed for a client to connect to Azure.
     */
    constructor(connectionString: string);
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
    addConfigurationSetting(configurationSetting: AddConfigurationSettingParam, options?: AddConfigurationSettingOptions): Promise<AddConfigurationSettingResponse>;
    /**
     * Delete a setting from the Azure App Configuration service
     *
     * Example usage:
     * ```ts
     * const deletedSetting = await client.deleteConfigurationSetting({ key: "MyKey", label: "MyLabel" });
     * ```
     * @param id The id of the configuration setting to delete.
     * @param options Optional parameters for the request (ex: etag, label)
     */
    deleteConfigurationSetting(id: ConfigurationSettingId, options?: DeleteConfigurationSettingOptions): Promise<DeleteConfigurationSettingResponse>;
    /**
     * Gets a setting from the Azure App Configuration service.
     *
     * Example code:
     * ```ts
     * const setting = await client.getConfigurationSetting({ key: "MyKey", label: "MyLabel" });
     * ```
     * @param id The id of the configuration setting to get.
     * @param options Optional parameters for the request.
     */
    getConfigurationSetting(id: ConfigurationSettingId, options?: GetConfigurationSettingOptions): Promise<GetConfigurationSettingResponse>;
    /**
     * Lists settings from the Azure App Configuration service, optionally
     * filtered by key names, labels and accept datetime.
     *
     * Example code:
     * ```ts
     * const allSettingsWithLabel = await client.listConfigurationSettings({ labels: [ "MyLabel" ] });
     * ```
     * @param options Optional parameters for the request.
     */
    listConfigurationSettings(options?: ListConfigurationSettingsOptions): PagedAsyncIterableIterator<ConfigurationSetting, ListConfigurationSettingPage>;
    private getListConfigurationSettingsIterator;
    private listConfigurationSettingsByPage;
    private createListConfigurationPageFromResponse;
    /**
     * Lists revisions of a set of keys, optionally filtered by key names,
     * labels and accept datetime.
     *
     * Example code:
     * ```ts
     * const revisionsIterator = await client.listRevisions({ keys: ["MyKey"] });
     * ```
     * @param options Optional parameters for the request.
     */
    listRevisions(options?: ListRevisionsOptions): PagedAsyncIterableIterator<ConfigurationSetting, ListRevisionsPage>;
    private getListRevisionsIterator;
    private listRevisionsByPage;
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
    setConfigurationSetting(configurationSetting: SetConfigurationSettingParam, options?: SetConfigurationSettingOptions): Promise<SetConfigurationSettingResponse>;
    /**
     * Sets a key's value to read only
     * @param id The id of the configuration setting to set to read-only.
     */
    setReadOnly(id: ConfigurationSettingId, options?: SetReadOnlyOptions): Promise<SetReadOnlyResponse>;
    /**
     * Makes the key's value writable again
     * @param id The id of the configuration setting to make writable.
     */
    clearReadOnly(id: ConfigurationSettingId, options?: ClearReadOnlyOptions): Promise<ClearReadOnlyResponse>;
}

/**
 * Options for clearReadOnly
 */
export declare interface ClearReadOnlyOptions extends HttpConditionalFields, RequestOptionsBase {
}

/**
 * Response when clearing the read-only status from a value
 */
export declare interface ClearReadOnlyResponse extends ConfigurationSetting, SyncTokenHeaderField, HttpResponseField<SyncTokenHeaderField> {
}

/**
 * Configuration setting with extra metadata from the server, indicating
 * its etag, whether it is currently readonly and when it was last modified.
 */
export declare interface ConfigurationSetting extends ConfigurationSettingParam {
    /**
     * Whether or not the setting is read-only
     */
    locked?: boolean;
    /**
     * The date when this setting was last modified
     */
    lastModified?: Date;
}

/**
 * Fields that uniquely identify a configuration setting
 */
export declare interface ConfigurationSettingId {
    /**
     * The key for this setting
     */
    key: string;
    /**
     * The label for this setting. Leaving this undefined means this
     * setting does not have a label.
     */
    label?: string;
    /**
     * The etag for this setting
     */
    etag?: string;
}

/**
 * Necessary fields for updating or creating a new configuration setting
 */
export declare interface ConfigurationSettingParam extends ConfigurationSettingId {
    /**
     * The content type of the setting's value
     */
    contentType?: string;
    /**
     * The setting's value
     */
    value?: string;
    /**
     * Tags for this key
     */
    tags?: {
        [propertyName: string]: string;
    };
}

/**
 * Standard base response for getting, deleting or updating a configuration setting
 */
export declare type ConfigurationSettingResponse<HeadersT> = ConfigurationSetting & HttpResponseField<HeadersT> & Pick<HeadersT, Exclude<keyof HeadersT, "eTag">>;

/**
 * Options for deleting a ConfigurationSetting.
 */
export declare interface DeleteConfigurationSettingOptions extends HttpConditionalFields, RequestOptionsBase {
}

/**
 * Response from deleting a ConfigurationSetting.
 */
export declare interface DeleteConfigurationSettingResponse extends ConfigurationSetting, SyncTokenHeaderField, HttpResponseFields, HttpResponseField<SyncTokenHeaderField> {
}

/**
 * Headers from getting a ConfigurationSetting.
 */
export declare interface GetConfigurationHeaders extends SyncTokenHeaderField {
    /**
     * A UTC datetime that specifies the last time the resource was modified.
     */
    lastModifiedHeader?: string;
}

/**
 * Options for getting a ConfigurationSetting.
 */
export declare interface GetConfigurationSettingOptions extends RequestOptionsBase, HttpConditionalFields, OptionalFields {
    /**
     * Requests the server to respond with the state of the resource at the specified time.
     */
    acceptDatetime?: string;
}

/**
 * Response from retrieving a ConfigurationSetting.
 */
export declare interface GetConfigurationSettingResponse extends ConfigurationSetting, GetConfigurationHeaders, HttpResponseFields, HttpResponseField<GetConfigurationHeaders> {
}

/**
 * Options used to provide if-match or if-none-match headers for an HTTP request
 */
export declare interface HttpConditionalFields {
    /**
     * Used to perform an operation only if the targeted resource's etag matches the value provided.
     */
    onlyIfUnchanged?: boolean;
    /**
     * Used to perform an operation only if the targeted resource's etag does not match the value
     * provided.
     */
    onlyIfChanged?: boolean;
}

/**
 * HTTP response related information - headers and raw body.
 */
export declare interface HttpResponseField<HeadersT> {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: HeadersT;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
    };
}

/**
 * Fields that are hoisted up  from the _response field of the object
 * Used in cases where individual HTTP response fields are important for
 * the user to use in common-use cases like handling http status codes 204 or 304.
 */
export declare interface HttpResponseFields {
    /**
     * The HTTP status code for the response
     */
    statusCode: number;
}

/**
 * A page of configuration settings and the corresponding HTTP response
 */
export declare interface ListConfigurationSettingPage extends HttpResponseField<SyncTokenHeaderField> {
    /**
     * The configuration settings for this page of results.
     */
    items: ConfigurationSetting[];
}

/**
 * Options for listConfigurationSettings that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export declare interface ListConfigurationSettingsOptions extends RequestOptionsBase, ListSettingsOptions {
}

/**
 * Options for listRevisions that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export declare interface ListRevisionsOptions extends RequestOptionsBase, ListSettingsOptions {
}

/**
 * A page of configuration settings and the corresponding HTTP response
 */
export declare interface ListRevisionsPage extends HttpResponseField<SyncTokenHeaderField> {
    /**
     * The configuration settings for this page of results.
     */
    items: ConfigurationSetting[];
}

/**
 * Common options for 'list' style APIs in AppConfig used to specify wildcards as well as
 * the accept date time header.
 */
export declare interface ListSettingsOptions extends OptionalFields {
    /**
     * Requests the server to respond with the state of the resource at the specified time.
     */
    acceptDatetime?: string;
    /**
     * Filters for wildcard matching (using *) against keys. These conditions are logically OR'd against each other.
     */
    keys?: string[];
    /**
     * Filters for wildcard matching (using *) against labels. These conditions are logically OR'd against each other.
     */
    labels?: string[];
}

/**
 * Used when the API supports selectively returning fields.
 */
export declare interface OptionalFields {
    /**
     * Which fields to return for each ConfigurationSetting
     */
    fields?: (keyof ConfigurationSetting)[];
}

/**
 * Options used when saving a ConfigurationSetting.
 */
export declare interface SetConfigurationSettingOptions extends HttpConditionalFields, RequestOptionsBase {
}

/**
 * Parameters for creating or updating a new configuration setting
 */
export declare interface SetConfigurationSettingParam extends ConfigurationSettingParam {
}

/**
 * Response from setting a ConfigurationSetting.
 */
export declare interface SetConfigurationSettingResponse extends ConfigurationSetting, SyncTokenHeaderField, HttpResponseField<SyncTokenHeaderField> {
}

/**
 * Options for setReadOnly
 */
export declare interface SetReadOnlyOptions extends HttpConditionalFields, RequestOptionsBase {
}

/**
 * Response when setting a value to read-only.
 */
export declare interface SetReadOnlyResponse extends ConfigurationSetting, SyncTokenHeaderField, HttpResponseField<SyncTokenHeaderField> {
}

/**
 * Sync token header field
 */
export declare interface SyncTokenHeaderField {
    /**
     * Enables real-time consistency between requests by providing the returned value in the next
     * request made to the server.
     */
    syncToken?: string;
}

export { }
