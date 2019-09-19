// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
  
import { AppConfigCredential } from "./appConfigCredential";
import { TokenCredential, URLBuilder } from "@azure/core-http";
import { AppConfiguration } from "./generated/src/appConfiguration";

import {
  KeyValue as ConfigurationSetting,
  AppConfigurationGetKeyValuesOptionalParams,
  GetKeyValuesResponse,

  PutKeyValueResponse as AddConfigurationSettingResponse,
  PutKeyValueResponse as SetConfigurationSettingResponse,

  AppConfigurationPutKeyValueOptionalParams as GeneratedPutParams,

  AppConfigurationDeleteKeyValueOptionalParams as DeleteConfigurationSettingOptions,
  DeleteKeyValueResponse as DeleteConfigurationSettingResponse,

  AppConfigurationGetKeyValueOptionalParams as GetConfigurationSettingOptions,
  GetKeyValueResponse as GetConfigurationSettingResponse,

  AppConfigurationGetRevisionsOptionalParams as ListRevisionsOptions,
  GetRevisionsResponse as ListRevisionsResponse
} from "./generated/src/models/index";
import { isArray } from 'util';

export {
  DeleteKeyValueResponse,
  PutKeyValueResponse,
  GetRevisionsResponse,
  GetKeyValueResponse,
  AppConfigurationGetKeyValueOptionalParams,
  AppConfigurationPutKeyValueOptionalParams,
  AppConfigurationDeleteKeyValueOptionalParams,
  AppConfigurationGetRevisionsOptionalParams,
  AppConfigurationGetKeyValuesOptionalParams
} from "./generated/src/models/index";

export interface ConfigurationSettingParam extends Pick<ConfigurationSetting, Exclude<keyof ConfigurationSetting, 'locked' | 'etag' | 'lastModified'>> {
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
   * Lists settings from the Azure App Configuration service, optionally filtered by label,
   * accept date time or name.
   *
   * Example code:
   * ```ts
   * const allSettingsWithLabel = await client.listConfigurationSettings({ label: "MyLabel" });
   * ```
   * @param options Optional parameters for the request.
   */
  listConfigurationSettings(
    options: ListConfigurationSettingsOptions = {}
  ): Promise<ListConfigurationSettingsResponse> {
    return this.client.getKeyValues({
      ...options,
      ...AppConfigurationClient.formatWildcards(options),
      select: options.fields
    });
  }

  listConfigurationSettingsNext(nextLink: string, options?: ListConfigurationSettingsOptions): Promise<ListConfigurationSettingsResponse>  {

    return this.client.getKeyValues({
      ...options,
      ...AppConfigurationClient.formatWildcards(options),
      after: AppConfigurationClient.extractAfterTokenFromNextLink(nextLink)
    });
  }

  /**
   * Lists revisions of a set of keys within the Azure App Configuration service.
   *
   * Example code:
   * ```ts
   * const revisionsForMyKey = await client.listRevisions({ key: ["MyKey"] });
   * ```
   * @param options Optional parameters for the request.
   */
  listRevisions(options?: ListRevisionsOptions): Promise<ListRevisionsResponse> {
    return this.client.getRevisions(options);
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
