/// <reference lib="esnext.asynciterable" />
import * as coreHttp from '@azure/core-http';
import { PagedAsyncIterableIterator } from '@azure/core-paging';
import { TokenCredential } from '@azure/core-http';

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
    addConfigurationSetting(configurationSetting: ConfigurationSettingParam, options?: ConfigurationSettingOptions): Promise<PutKeyValueResponse>;
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
    deleteConfigurationSetting(key: string, options: AppConfigurationDeleteKeyValueOptionalParams & ETagOption): Promise<DeleteKeyValueResponse>;
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
    getConfigurationSetting(key: string, options?: AppConfigurationGetKeyValueOptionalParams): Promise<GetKeyValueResponse>;
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
    setConfigurationSetting(configurationSetting: ConfigurationSettingParam & ETagOption, options?: ConfigurationSettingOptions & RespectETagOption): Promise<PutKeyValueResponse>;
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

/**
 * Optional Parameters.
 */
export declare interface AppConfigurationDeleteKeyValueOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The label of the key-value to delete.
     */
    label?: string;
    /**
     * Used to perform an operation only if the targeted resource's etag matches the value provided.
     */
    ifMatch?: string;
}

/**
 * Optional Parameters.
 */
export declare interface AppConfigurationGetKeyValueOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The label of the key-value to retrieve.
     */
    label?: string;
    /**
     * Requests the server to respond with the state of the resource at the specified time.
     */
    acceptDatetime?: string;
    /**
     * Used to perform an operation only if the targeted resource's etag matches the value provided.
     */
    ifMatch?: string;
    /**
     * Used to perform an operation only if the targeted resource's etag does not match the value
     * provided.
     */
    ifNoneMatch?: string;
    /**
     * Used to select what fields are present in the returned resource(s).
     */
    select?: string[];
}

/**
 * Optional Parameters.
 */
export declare interface AppConfigurationGetKeyValuesOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * A filter used to match keys.
     */
    key?: string;
    /**
     * A filter used to match labels
     */
    label?: string;
    /**
     * Instructs the server to return elements that appear after the element referred to by the
     * specified token.
     */
    after?: string;
    /**
     * Requests the server to respond with the state of the resource at the specified time.
     */
    acceptDatetime?: string;
    /**
     * Used to select what fields are present in the returned resource(s).
     */
    select?: string[];
}

/**
 * Optional Parameters.
 */
export declare interface AppConfigurationGetRevisionsOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * A filter used to match keys.
     */
    key?: string;
    /**
     * A filter used to match labels
     */
    label?: string;
    /**
     * Instructs the server to return elements that appear after the element referred to by the
     * specified token.
     */
    after?: string;
    /**
     * Requests the server to respond with the state of the resource at the specified time.
     */
    acceptDatetime?: string;
    /**
     * Used to select what fields are present in the returned resource(s).
     */
    select?: string[];
}

/**
 * Optional Parameters.
 */
export declare interface AppConfigurationPutKeyValueOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The label of the key-value to create.
     */
    label?: string;
    /**
     * The key-value to create.
     */
    entity?: ConfigurationSetting;
    /**
     * Used to perform an operation only if the targeted resource's etag matches the value provided.
     */
    ifMatch?: string;
    /**
     * Used to perform an operation only if the targeted resource's etag does not match the value
     * provided.
     */
    ifNoneMatch?: string;
}

/**
 * An interface representing KeyValue.
 */
export declare interface ConfigurationSetting {
    key: string;
    label?: string;
    contentType?: string;
    value?: string;
    lastModified?: Date;
    tags?: {
        [propertyName: string]: string;
    };
    locked?: boolean;
    etag?: string;
}

/**
 * Subset of fields from ConfigurationSetting used to identify a setting
 */
export declare interface ConfigurationSettingId extends Pick<ConfigurationSetting, 'key' | 'label' | 'etag'> {
}

/**
 * Options used when adding or saving a ConfigurationSetting.
 */
export declare interface ConfigurationSettingOptions extends Pick<AppConfigurationPutKeyValueOptionalParams, Exclude<keyof AppConfigurationPutKeyValueOptionalParams, 'label' | 'entity'>> {
}

/**
 * A ConfigurationSetting minus any fields that are not settable in
 * addConfigurationSetting/setConfigurationSetting (ex: locked)
 *
 * Any place that takes a ConfigurationSettingsParam will also take a ConfigurationSetting.
 */
export declare interface ConfigurationSettingParam extends Pick<ConfigurationSetting, Exclude<keyof ConfigurationSetting, 'locked' | 'etag' | 'lastModified'>> {
}

/**
 * Defines headers for DeleteKeyValue operation.
 */
declare interface DeleteKeyValueHeaders {
    /**
     * Enables real-time consistency between requests by providing the returned value in the next
     * request made to the server.
     */
    syncToken?: string;
    /**
     * An identifier representing the returned state of the resource.
     */
    eTag?: string;
}

/**
 * Contains response data for the deleteKeyValue operation.
 */
export declare type DeleteKeyValueResponse = ConfigurationSetting & DeleteKeyValueHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: DeleteKeyValueHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: ConfigurationSetting;
    };
};

export declare interface ETagOption {
    /**
     * Entity tag (etag) of the object
     */
    etag?: string;
}

/**
 * Defines headers for GetKeyValue operation.
 */
declare interface GetKeyValueHeaders {
    /**
     * Enables real-time consistency between requests by providing the returned value in the next
     * request made to the server.
     */
    syncToken?: string;
    /**
     * An identifier representing the returned state of the resource.
     */
    eTag?: string;
    /**
     * A UTC datetime that specifies the last time the resource was modified.
     */
    lastModifiedHeader?: string;
}

/**
 * Contains response data for the getKeyValue operation.
 */
export declare type GetKeyValueResponse = ConfigurationSetting & GetKeyValueHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: GetKeyValueHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: ConfigurationSetting;
    };
};

/**
 * Defines headers for GetKeyValues operation.
 */
export declare interface GetKeyValuesHeaders {
    /**
     * Enables real-time consistency between requests by providing the returned value in the next
     * request made to the server.
     */
    syncToken?: string;
}

/**
 * Contains response data for the getKeyValues operation.
 */
export declare type GetKeyValuesResponse = KeyValueListResult & GetKeyValuesHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: GetKeyValuesHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyValueListResult;
    };
};

/**
 * Defines headers for GetRevisions operation.
 */
declare interface GetRevisionsHeaders {
    /**
     * Enables real-time consistency between requests by providing the returned value in the next
     * request made to the server.
     */
    syncToken?: string;
}

/**
 * Contains response data for the getRevisions operation.
 */
export declare type GetRevisionsResponse = KeyValueListResult & GetRevisionsHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: GetRevisionsHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyValueListResult;
    };
};

/**
 * The result of a list request.
 */
declare interface KeyValueListResult {
    /**
     * The collection value.
     */
    items?: ConfigurationSetting[];
    /**
     * The URI that can be used to request the next set of paged results.
     */
    nextLink?: string;
}

/**
 * A page of configuration settings and the corresponding HTTP response
 */
export declare interface ListConfigurationSettingPage extends Pick<GetKeyValuesResponse, Exclude<keyof GetKeyValuesResponse, 'items'>> {
    /**
      * ConfigurationSettings for this page of results
      */
    items: ConfigurationSetting[];
}

/**
 * Options for listConfigurationSettings that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export declare interface ListConfigurationSettingsOptions extends Pick<AppConfigurationGetKeyValuesOptionalParams, Exclude<keyof AppConfigurationGetKeyValuesOptionalParams, 'key' | 'label' | 'select' | 'after'>> {
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

/**
 * Options for listRevisions that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export declare interface ListRevisionsOptions extends Pick<AppConfigurationGetRevisionsOptionalParams, Exclude<keyof AppConfigurationGetRevisionsOptionalParams, 'key' | 'label' | 'select' | 'after'>> {
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

/**
 * A page of configuration settings and the corresponding HTTP response
 */
export declare interface ListRevisionsPage extends Pick<GetRevisionsResponse, Exclude<keyof GetRevisionsResponse, 'items'>> {
    /**
       * ConfigurationSettings for this page of results
       */
    items: ConfigurationSetting[];
}

/**
 * Defines headers for PutKeyValue operation.
 */
declare interface PutKeyValueHeaders {
    /**
     * Enables real-time consistency between requests by providing the returned value in the next
     * request made to the server.
     */
    syncToken?: string;
    /**
     * An identifier representing the returned state of the resource.
     */
    eTag?: string;
}

/**
 * Contains response data for the putKeyValue operation.
 */
export declare type PutKeyValueResponse = ConfigurationSetting & PutKeyValueHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: PutKeyValueHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: ConfigurationSetting;
    };
};

export declare interface RespectETagOption {
    /**
     * Whether or not we respect the ETag field in the passed-in ConfigurationSetting
     */
    respectETag?: boolean;
}

export { }
