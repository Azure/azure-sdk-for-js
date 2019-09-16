import { AppConfigCredential } from "./appConfigCredential";
import { TokenCredential } from "@azure/core-http";
import { ConfigurationClient } from "./generated/configurationClient";

import {
  ConfigurationSetting as ModelConfigurationSetting,
  ConfigurationClientCreateOrUpdateConfigurationSettingOptionalParams as ModelConfigurationClientCreateOrUpdateConfigurationSettingOptionalParams,
  CreateOrUpdateConfigurationSettingResponse as ModelCreateOrUpdateConfigurationSettingResponse,
  ConfigurationClientDeleteConfigurationSettingOptionalParams as ModelConfigurationClientDeleteConfigurationSettingOptionalParams,
  ConfigurationClientGetConfigurationSettingOptionalParams as ModelConfigurationClientGetConfigurationSettingOptionalParams,
  ConfigurationClientListConfigurationSettingsOptionalParams as ModelConfigurationClientListConfigurationSettingsOptionalParams,
  ConfigurationClientListRevisionsOptionalParams as ModelConfigurationClientListRevisionsOptionalParams,
  DeleteConfigurationSettingResponse as ModelDeleteConfigurationSettingResponse,
  GetConfigurationSettingResponse as ModelGetConfigurationSettingResponse,
  ListConfigurationSettingsResponse as ModelListConfigurationSettingsResponse,
  ListRevisionsResponse as ModelListRevisionsResponse
} from "./generated/models";

export { ConfigurationSettingList, GetConfigurationSettingHeaders } from "./generated/models";

export {
  ModelConfigurationSetting,
  ModelConfigurationClientCreateOrUpdateConfigurationSettingOptionalParams,
  ModelCreateOrUpdateConfigurationSettingResponse,
  ModelConfigurationClientDeleteConfigurationSettingOptionalParams,
  ModelConfigurationClientGetConfigurationSettingOptionalParams,
  ModelConfigurationClientListConfigurationSettingsOptionalParams,
  ModelConfigurationClientListRevisionsOptionalParams,
  ModelDeleteConfigurationSettingResponse,
  ModelGetConfigurationSettingResponse,
  ModelListConfigurationSettingsResponse,
  ModelListRevisionsResponse
};

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

export type AddConfigurationSettingConfig = Pick<
  ModelConfigurationSetting,
  Exclude<keyof ModelConfigurationSetting, "key">
>;
export type AddConfigurationSettingOptions = ModelConfigurationClientCreateOrUpdateConfigurationSettingOptionalParams;
export type AddConfigurationSettingsResponse = ModelCreateOrUpdateConfigurationSettingResponse;

export type DeleteConfigurationSettingOptions = ModelConfigurationClientDeleteConfigurationSettingOptionalParams &
  ETagOption;
export type DeleteConfigurationSettingResponse = ModelDeleteConfigurationSettingResponse;

export type GetConfigurationSettingOptions = ModelConfigurationClientGetConfigurationSettingOptionalParams;
export type GetConfigurationSettingResponse = ModelGetConfigurationSettingResponse;

export type ListConfigurationSettingsOptions = ModelConfigurationClientListConfigurationSettingsOptionalParams;
export type ListConfigurationSettingsResponse = ModelListConfigurationSettingsResponse;

export type ListRevisionsOptions = ModelConfigurationClientListRevisionsOptionalParams;
export type ListRevisionsResponse = ModelListRevisionsResponse;

export type SetConfigurationSettingConfig = Pick<
  ModelConfigurationSetting,
  Exclude<keyof ModelConfigurationSetting, "key">
>;
export type SetConfigurationSettingOptions = ModelConfigurationClientCreateOrUpdateConfigurationSettingOptionalParams;
export type SetConfigurationSettingResponse = ModelCreateOrUpdateConfigurationSettingResponse;

/**
 * Client for the Azure App Configuration service.
 */
export class AppConfigurationClient {
  private client: ConfigurationClient;

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
      this.client = new ConfigurationClient(credential, {
        baseUri: regexMatch[1],
        deserializationContentTypes
      });
    } else if (credential && credential.constructor.name === "ManagedIdentityCredential") {
      this.client = new ConfigurationClient(credential, {
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
   * const result = await client.addConfigurationSetting("MyKey", { label: "MyLabel", value: "MyValue" });
   * ```
   * @param key The name of the key.
   * @param configSettings A configuration value.
   * @param options Optional parameters for the request.
   */
  addConfigurationSetting(
    key: string,
    configSettings: AddConfigurationSettingConfig,
    options: AddConfigurationSettingOptions = {}
  ): Promise<AddConfigurationSettingsResponse> {
    // add the custom header if-none-match=* to only add the key-value if it doesn't already exist
    // create a copy of the options to avoid modifying the user's options
    options = { ...options };
    const customHeaders: typeof options.customHeaders = { ...options.customHeaders };
    customHeaders["if-none-match"] = "*";
    options.customHeaders = customHeaders;

    options.label = configSettings.label;
    return this.client.createOrUpdateConfigurationSetting(configSettings, key, options);
  }

  /**
   * Delete a setting from the Azure App Configuration service
   *
   * Example usage:
   * ```ts
   * const deletedSetting = await client.deleteConfigurationSetting("MyKey", { label: "MyLabel" });
   * ```
   * @param key The name of the key.
   * @param options Optional parameters for the request.
   */
  deleteConfigurationSetting(
    key: string,
    options: DeleteConfigurationSettingOptions
  ): Promise<DeleteConfigurationSettingResponse> {
    // hoist the etag into a custom header to ensure this update fails if the setting has been updated
    options = { ...options };
    const customHeaders: typeof options.customHeaders = { ...options.customHeaders };
    options.customHeaders = customHeaders;

    const etag = options.etag;
    if (etag) {
      customHeaders["if-match"] = `"${etag}"`;
    }
    return this.client.deleteConfigurationSetting(key, options);
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
  getConfigurationSetting(
    key: string,
    options: GetConfigurationSettingOptions = {}
  ): Promise<GetConfigurationSettingResponse> {
    // temporary workaround - if the user doesn't initialize the label field explicitly to undefined then the default value will make it so you can't get a value without 
    // a label. Should be able to remove when we use newer generated models.
    options = { ...options };
    options.label = options.label;

    return this.client.getConfigurationSetting(key, options);
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
    options?: ListConfigurationSettingsOptions
  ): Promise<ListConfigurationSettingsResponse> {
    return this.client.listConfigurationSettings(options);
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
    return this.client.listRevisions(options);
  }

  /**
   * Sets the value of a key in the Azure App Configuration service, allowing for an optional etag.
   * @param key The name of the key.
   * @param configSettings A configuration value.
   * @param options Optional parameters for the request.
   *
   * Example code:
   * ```ts
   * let result = await client.setConfigurationSetting("MyKey", { value: "MyValue" });
   * ```
   */
  setConfigurationSetting(
    key: string,
    configSettings: SetConfigurationSettingConfig,
    options: SetConfigurationSettingOptions = {}
  ): Promise<SetConfigurationSettingResponse> {
    // hoist the etag into a custom header to ensure this update fails if the setting has been updated
    options = { ...options };

    const customHeaders: typeof options.customHeaders = { ...options.customHeaders };
    options.customHeaders = customHeaders;

    const etag = configSettings.etag;
    if (etag) {
      customHeaders["if-match"] = `"${etag}"`;
    }

    options.label = configSettings.label;
    
    return this.client.createOrUpdateConfigurationSetting(configSettings, key, {
      ...options,
      customHeaders
    });
  }
}
