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
  ListRevisionsResponse as ModelListRevisionsResponse,
} from "./generated/models";

export {
  ConfigurationSettingList,
  GetConfigurationSettingHeaders
} from "./generated/models";

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
}

const ConnectionStringRegex = /Endpoint=(.*);Id=(.*);Secret=(.*)/;
const deserializationContentTypes = {
  json: [
    "application/vnd.microsoft.appconfig.kvset+json",
    "application/vnd.microsoft.appconfig.kv+json",
    "application/vnd.microsoft.appconfig.kvs+json",
    "application/vnd.microsoft.appconfig.keyset+json",
    "application/vnd.microsoft.appconfig.revs+json"
  ]
}

// TODO: this is interesting, it's used as a 'mixin' to augment one of the 
// apparently deficient auto-generated models.
export interface ETagOption {
  /**
   * the ETag (http entity tag) of the ConfigurationSetting. Used to check 
   * if the configuration setting has changed. Leave as undefined to skip 
   * the check.
   */
  etag?: string;
}

export type AddConfigurationSettingConfig = Pick<ModelConfigurationSetting, Exclude<keyof ModelConfigurationSetting, "key">>;
export type AddConfigurationSettingOptions = ModelConfigurationClientCreateOrUpdateConfigurationSettingOptionalParams;
export type AddConfigurationSettingsResponse = ModelCreateOrUpdateConfigurationSettingResponse;
export type DeleteConfigurationSettingOptions = ModelConfigurationClientDeleteConfigurationSettingOptionalParams & ETagOption;
export type DeleteConfigurationSettingResponse = ModelDeleteConfigurationSettingResponse;
export type GetConfigurationSettingOptions = ModelConfigurationClientGetConfigurationSettingOptionalParams;
export type GetConfigurationSettingResponse = ModelGetConfigurationSettingResponse;
export type ListConfigurationSettingsOptions = ModelConfigurationClientListConfigurationSettingsOptionalParams;
export type ListConfigurationSettingsResponse = ModelListConfigurationSettingsResponse;
export type ListRevisionsOptions = ModelConfigurationClientListRevisionsOptionalParams;
export type ListRevisionsResponse = ModelListRevisionsResponse;
export type SetConfigurationSettingConfig = Pick<ModelConfigurationSetting, Exclude<keyof ModelConfigurationSetting, "key">>;
export type SetConfigurationSettingOptions = ModelConfigurationClientCreateOrUpdateConfigurationSettingOptionalParams;
export type SetConfigurationSettingResponse = ModelCreateOrUpdateConfigurationSettingResponse;
export type UpdateConfigurationSettingConfig = Pick<ModelConfigurationSetting, Exclude<keyof ModelConfigurationSetting, "key">>;
export type UpdateConfigurationSettingOptions = ModelConfigurationClientCreateOrUpdateConfigurationSettingOptionalParams;
export type UpdateConfigurationSettingResponse = ModelCreateOrUpdateConfigurationSettingResponse;

export class AppConfigurationClient {
  private client: ConfigurationClient;

  /**
   * Initializes a new instance of the AppConfigurationClient class.
   * @param connectionString Connection string needed for a client to connect to Azure.
   *//**
    * Initializes a new instance of the AppConfigurationClient class.
    * @param uri The base URI for the Azure service
    * @param credential The credentials to use for authentication.
     */
  constructor(connectionString: string);
  constructor(uri: string, credential: TokenCredential);
  constructor(uriOrConnectionString: string, credential?: TokenCredential) {
    const regexMatch = uriOrConnectionString.match(ConnectionStringRegex);
    if (regexMatch) {
      const credential = new AppConfigCredential(regexMatch[2], regexMatch[3])
      this.client = new ConfigurationClient(credential, {
        baseUri: regexMatch[1],
        deserializationContentTypes
      });
    // TODO: if this is a requirement then why isn't the parameter typed as ManagedIdentityCredentials?
    // (maybe it's just temporary that it only lets one type of credential go through?)  
    } else if (credential && credential.constructor.name === "ManagedIdentityCredential") {
      this.client = new ConfigurationClient(credential, {
        baseUri: uriOrConnectionString,
        deserializationContentTypes
      })
    } else {
      throw new Error("You must provide either a connection string or a URL and a ManagedIdentityCredential.")
    }
  }

  /**
   * Add a setting into the Azure App Configuration service, failing if it already exists.
   * @param key The name of the key.
   * @param configSettings A configuration value.
   * @param options Optional parameters for the value being added.
   */
  addConfigurationSetting(key: string, configSettings: AddConfigurationSettingConfig, options: AddConfigurationSettingOptions = {}): Promise<AddConfigurationSettingsResponse> {
    // add the custom header if-none-match=* to only add the key-value if it doesn't already exist
    // create a copy of the options to avoid modifying the user's options
    options = { ...options };
    const customHeaders: typeof options.customHeaders = { ...options.customHeaders };
    customHeaders["if-none-match"] = "*";
    options.customHeaders = customHeaders;

    if (configSettings.label) {
      options.label = configSettings.label;
    }
    return this.client.createOrUpdateConfigurationSetting(configSettings, key, options);
  }

  /**
   * Delete a setting the Azure App Configuration service.
   * @param key The name of the key.
   * @param options Optional parameters for the value being deleted.
   */
  deleteConfigurationSetting(key: string, options: DeleteConfigurationSettingOptions): Promise<DeleteConfigurationSettingResponse> {
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
   * Get a setting from the Azure App Configuration service.
   * @param key The name of the key
   * @param options Optional parameters for the value being retrieved.
   */
  getConfigurationSetting(key: string, options?: GetConfigurationSettingOptions): Promise<GetConfigurationSettingResponse> {
    return this.client.getConfigurationSetting(key, options);
  }

  /**
   * Lists the setting from the Azure App Configuration service.
   * @param options Optional parameters for the values being listed.
   */
  listConfigurationSettings(options?: ListConfigurationSettingsOptions): Promise<ListConfigurationSettingsResponse> {
    return this.client.listConfigurationSettings(options);
  }

  /**
   * Lists the revisions of a set of keys within the Azure App Configuration service.
   * @param options Optional parameters for the revisions being listed.
   */
  listRevisions(options?: ListRevisionsOptions): Promise<ListRevisionsResponse> {
    return this.client.listRevisions(options);
  }

  /**
   * Sets the value of a key in the Azure App Configuration service, allowing for an optional etag.
   * @param key The name of the key.
   * @param configSettings A configuration value.
   * @param options Optional parameters for the key being updated.
   */
  setConfigurationSetting(key: string, configSettings: SetConfigurationSettingConfig, options: SetConfigurationSettingOptions = {}): Promise<SetConfigurationSettingResponse> {
    // hoist the etag into a custom header to ensure this update fails if the setting has been updated
    options = { ...options };

    const customHeaders: typeof options.customHeaders = { ...options.customHeaders };
    options.customHeaders = customHeaders;

    const etag = configSettings.etag;
    if (etag) {
      customHeaders["if-match"] = `"${etag}"`;
    }

    if (configSettings.label) {
      options.label = configSettings.label;
    }
    return this.client.createOrUpdateConfigurationSetting(configSettings, key, { ...options, customHeaders });
  }

  /**
   * Updates the value of a key in the Azure App Configuration service.
   * @param key 
   * @param configSettings 
   * @param options 
   */
  async updateConfigurationSetting(key: string, configSettings: UpdateConfigurationSettingConfig, options: UpdateConfigurationSettingOptions = {}): Promise<UpdateConfigurationSettingResponse> {
    // retrieve existing configuration, and populate configSettings for missing fields that aren't null
    const existingConfigurationSettings = await this.getConfigurationSetting(key, {
      abortSignal: options.abortSignal,
      label: configSettings.label || options.label
    });

    const updateConfigSettings = { ...configSettings };

    // TODO: why do we check for undefined in this way?
    
    if (typeof updateConfigSettings.value === "undefined") {
      updateConfigSettings.value = existingConfigurationSettings.value;
    }
    if (typeof updateConfigSettings.contentType === "undefined") {
      updateConfigSettings.contentType = existingConfigurationSettings.contentType;
    }
    if (typeof updateConfigSettings.tags === "undefined") {
      updateConfigSettings.tags = existingConfigurationSettings.tags;
    }

    if (configSettings.label) {
      options.label = configSettings.label;
    }

    const customHeaders: typeof options.customHeaders = { ...options.customHeaders };
    options.customHeaders = customHeaders;

    const etag = updateConfigSettings.etag;
    if (etag) {
      customHeaders["if-match"] = `"${etag}"`;
    } else if (!customHeaders["if-match"]) {
      customHeaders["if-match"] = "*";
    }

    return this.client.createOrUpdateConfigurationSetting(updateConfigSettings, key, options);
  }
}
