// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AppConfigCredential } from "./appConfigCredential";
import { TokenCredential, URLBuilder } from "@azure/core-http";
import { AppConfiguration } from "./generated/src/appConfiguration";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import "@azure/core-asynciterator-polyfill";

import {
  AppConfigurationDeleteKeyValueOptionalParams as DeleteConfigurationSettingOptions,
  AppConfigurationGetKeyValueOptionalParams as GetConfigurationSettingOptions,
  AppConfigurationGetKeyValuesOptionalParams,
  AppConfigurationGetRevisionsOptionalParams,
  AppConfigurationPutKeyValueOptionalParams as GeneratedPutParams,
  DeleteKeyValueResponse as DeleteConfigurationSettingResponse,
  GetKeyValueResponse as GetConfigurationSettingResponse,
  GetKeyValuesResponse,
  GetRevisionsResponse,
  KeyValue as ConfigurationSetting,
  PutKeyValueResponse as AddConfigurationSettingResponse,
  PutKeyValueResponse as SetConfigurationSettingResponse
} from "./generated/src/models/index";
import { isArray } from 'util';

export {
  AppConfigurationDeleteKeyValueOptionalParams,
  AppConfigurationGetKeyValueOptionalParams,
  AppConfigurationGetKeyValuesOptionalParams,
  AppConfigurationGetRevisionsOptionalParams,
  AppConfigurationPutKeyValueOptionalParams,
  DeleteKeyValueResponse,
  GetKeyValueResponse,
  GetKeyValuesHeaders,
  GetKeyValuesResponse,
  GetRevisionsResponse,
  PutKeyValueResponse
} from "./generated/src/models/index";

/**
 * A ConfigurationSetting minus any fields that are not settable in 
 * addConfigurationSetting/setConfigurationSetting (ex: locked)
 * 
 * Any place that takes a ConfigurationSettingsParam will also take a ConfigurationSetting.
 */
export interface ConfigurationSettingParam extends Pick<ConfigurationSetting, Exclude<keyof ConfigurationSetting, 'locked' | 'etag' | 'lastModified'>> {
}

/**
 * Options used when adding or saving a ConfigurationSetting.
 */
export interface ConfigurationSettingOptions extends Pick<GeneratedPutParams, Exclude<keyof GeneratedPutParams, 'label' | 'entity'>> {
}

/**
 * Options for listConfigurationSettings that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
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

/**
 * Options for listRevisions that allow for filtering based on keys, labels and other fields.
 * Also provides `fields` which allows you to selectively choose which fields are populated in the
 * result.
 */
export interface ListRevisionsOptions extends Pick<AppConfigurationGetRevisionsOptionalParams, Exclude<keyof AppConfigurationGetRevisionsOptionalParams, 'key' | 'label' | 'select' | 'after'>> {
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
export interface ListConfigurationSettingPage extends Pick<GetKeyValuesResponse, Exclude<keyof GetKeyValuesResponse, 'items'>> {
  /**
    * ConfigurationSettings for this page of results
    */
  items: ConfigurationSetting[];
}

/**
 * A page of configuration settings and the corresponding HTTP response
 */
export interface ListRevisionsPage extends Pick<GetRevisionsResponse, Exclude<keyof GetRevisionsResponse, 'items'>> {
  /**
     * ConfigurationSettings for this page of results
     */
    items: ConfigurationSetting[];
  }

export { ConfigurationSetting };

const ConnectionStringRegex = /Endpoint=(.*);Id=(.*);Secret=(.*)/;
const deserializationContentTypes = {
  json: [
    "application/vnd.microsoft.appconfig.kvset+json",
    "application/vnd.microsoft.appconfig.kv+json",
    "application/vnd.microsoft.appconfig.kvs+json",
    "application/vnd.microsoft.appconfig.keyset+json",
    "application/vnd.microsoft.appconfig.revs+json"
  ]
};

export interface ETagOption {
  /**
   * Entity tag (etag) of the object
   */
  etag?: string;
}

const apiVersion = "1.0";

/**
 * Client for the Azure App Configuration service.
 */
export class AppConfigurationClient {
  private client: AppConfiguration;

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
  constructor(uriOrConnectionString: string, credential?: TokenCredential) {
    if (uriOrConnectionString == null) {
      throw new Error(
        "You must provide a connection string or the URL for your AppConfiguration instance"
      );
    }

    const regexMatch = uriOrConnectionString.match(ConnectionStringRegex);
    if (regexMatch) {
      const credential = new AppConfigCredential(regexMatch[2], regexMatch[3]);
      this.client = new AppConfiguration(credential, apiVersion, {
        baseUri: regexMatch[1],
        deserializationContentTypes
      });
    } else if (credential && credential.constructor.name === "ManagedIdentityCredential") {
      this.client = new AppConfiguration(credential, apiVersion, {
        baseUri: uriOrConnectionString,
        deserializationContentTypes
      });
    } else {
      throw new Error(
        "You must provide either a connection string or a URL and a ManagedIdentityCredential."
      );
    }
  }

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
  async addConfigurationSetting(
    configurationSetting: ConfigurationSettingParam,
    options: ConfigurationSettingOptions = {}
  ): Promise<AddConfigurationSettingResponse> {
    const result = await this.client.putKeyValue(configurationSetting.key, {
      ifNoneMatch: "*",
      label: configurationSetting.label,
      entity: configurationSetting,
      ...options
    });

    return result;
  }

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
  deleteConfigurationSetting(
    key: string,
    options: DeleteConfigurationSettingOptions & ETagOption
  ): Promise<DeleteConfigurationSettingResponse> {
    if (options.etag) {
      options = { ...options };
      options.ifMatch = AppConfigurationClient.formatETagForMatchHeaders(options);
    }

    return this.client.deleteKeyValue(key, options);
  }

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
  async getConfigurationSetting(
    key: string,
    options: GetConfigurationSettingOptions = {}
  ): Promise<GetConfigurationSettingResponse> {
    const result = await this.client.getKeyValue(key, {
      label: options.label,
      ...options
    });

    return result;
  }

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
  listConfigurationSettings(options: ListConfigurationSettingsOptions = {}): PagedAsyncIterableIterator<ConfigurationSetting, ListConfigurationSettingPage> {
    const iter = this.getListConfigurationSettingsIterator(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (_: PageSettings = {}) => {
        // TODO: the appconfig service doesn't currently support letting you select a page size
        // so we're ignoring their setting for now.
        return this.listConfigurationSettingsByPage(options);
      }
    };
  }

  private async *getListConfigurationSettingsIterator(options: ListConfigurationSettingsOptions): AsyncIterableIterator<ConfigurationSetting> {
    for await (const page of this.listConfigurationSettingsByPage(options)) {
      for (const configurationSetting of page.items) {
        yield configurationSetting;
      }
    }
  }

  private async *listConfigurationSettingsByPage(
    options: ListConfigurationSettingsOptions = {}
  ): AsyncIterableIterator<ListConfigurationSettingPage> {

    let currentResponse = await this.client.getKeyValues({
      ...options,
      ...AppConfigurationClient.formatWildcards(options),
      select: options.fields
    });

    yield* this.createListConfigurationPageFromResponse(currentResponse);

    while (currentResponse.nextLink) {
      currentResponse = await this.client.getKeyValues({
        ...options,
        ...AppConfigurationClient.formatWildcards(options),
        select: options.fields,
        after: AppConfigurationClient.extractAfterTokenFromNextLink(currentResponse.nextLink)
      });

      // TODO: We can get one more "empty" response if we're on
      // a page boundary but there's no data in the response that's useful
      if (!currentResponse.items) {
        break;
      }

      yield* this.createListConfigurationPageFromResponse(currentResponse);
    }
  }

  private *createListConfigurationPageFromResponse(currentResponse: GetKeyValuesResponse) {
    yield {
      ...currentResponse,
      items: currentResponse.items != null ? currentResponse.items : []
    };
  }

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
  listRevisions(options?: ListRevisionsOptions): PagedAsyncIterableIterator<ConfigurationSetting, ListRevisionsPage> {
    const iter = this.getListRevisionsIterator(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (_: PageSettings = {}) => {
        // TODO: the appconfig service doesn't currently support letting you select a page size
        // so we're ignoring their setting for now.
        return this.listRevisionsByPage(options);
      }
    };
  }

  private async*getListRevisionsIterator(options?: ListRevisionsOptions): AsyncIterableIterator<ConfigurationSetting> {
    for await (const page of this.listRevisionsByPage(options)) {
      for (const item of page.items) {
        yield item;
      }
    }
  }

  private async *listRevisionsByPage(
    options: ListRevisionsOptions = {}
  ): AsyncIterableIterator<ListRevisionsPage> {

    let currentResponse = await this.client.getRevisions({
      ...options,
      ...AppConfigurationClient.formatWildcards(options),
      select: options.fields
    });

    yield {
      ...currentResponse,
      items: currentResponse.items != null ? currentResponse.items : []
    };

    while (currentResponse.nextLink) {
      currentResponse = await this.client.getRevisions({
        ...options,
        ...AppConfigurationClient.formatWildcards(options),
        select: options.fields,
        after: AppConfigurationClient.extractAfterTokenFromNextLink(currentResponse.nextLink)
      });

      // TODO: We can get one more "empty" response if we're on
      // a page boundary but there's no data in the response that's useful
      if (!currentResponse.items) {
        break;
      }

      yield {
        ...currentResponse,
        items: currentResponse.items != null ? currentResponse.items : []
      };
    }
  }

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
  setConfigurationSetting(
    configurationSetting: ConfigurationSettingParam & ETagOption,
    options: ConfigurationSettingOptions = {}
  ): Promise<SetConfigurationSettingResponse> {

    return this.client.putKeyValue(configurationSetting.key, {
      label: configurationSetting.label,
      entity: configurationSetting,
      ifMatch: AppConfigurationClient.formatETagForMatchHeaders(configurationSetting),
      ...options
    });
  }

  private static formatETagForMatchHeaders(objectWithEtag: ETagOption): (string | undefined) {
    if (objectWithEtag.etag) {
      return `"${objectWithEtag.etag}"`;
    }

    return undefined;
  }

  private static formatWildcards(listConfigOptions?: ListConfigurationSettingsOptions): Pick<AppConfigurationGetKeyValuesOptionalParams, 'key' | 'label'> {

    if (listConfigOptions == null) {
      return {};
    }

    let key = undefined;

    if (listConfigOptions.keys) {
      // TODO: escape commas?
      key = listConfigOptions.keys.join(",");
    }

    let label = undefined;

    if (listConfigOptions.labels) {
      label = listConfigOptions.labels.join(",");
    }

    return {
      key,
      label
    };
  }

  private static extractAfterTokenFromNextLink(nextLink: string) {
    let parsedLink = URLBuilder.parse(nextLink);
    let afterToken = parsedLink.getQueryParameterValue("after");

    if (afterToken == null || isArray(afterToken)) {
      throw new Error("Invalid nextLink - invalid after token");
    }

    return decodeURIComponent(afterToken);
  }
}
