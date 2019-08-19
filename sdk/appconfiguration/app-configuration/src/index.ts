import { AppConfigCredential } from "./appConfigCredential";
import { TokenCredential } from "@azure/core-http";
import { ConfigurationClient, ConfigurationClientContext } from "./generated/configurationClient";

import * as Models from "./generated/models";

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

export type AddConfigurationSettingConfig = Pick<Models.ConfigurationSetting, Exclude<keyof Models.ConfigurationSetting, "key">>;
export type AddConfigurationSettingOptions = Models.ConfigurationClientCreateOrUpdateConfigurationSettingOptionalParams;
export type AddConfigurationSettingsResponse = Models.CreateOrUpdateConfigurationSettingResponse;
export type DeleteConfigurationSettingOptions = Models.ConfigurationClientDeleteConfigurationSettingOptionalParams;
export type DeleteConfigurationSettingResponse = Models.DeleteConfigurationSettingResponse;
export type GetConfigurationSettingOptions = Models.ConfigurationClientGetConfigurationSettingOptionalParams;
export type GetConfigurationSettingResponse = Models.GetConfigurationSettingResponse;
export type ListConfigurationSettingsOptions = Models.ConfigurationClientListConfigurationSettingsOptionalParams;
export type ListConfigurationSettingsResponse = Models.ListConfigurationSettingsResponse;
export type ListRevisionsOptions = Models.ConfigurationClientListRevisionsOptionalParams;
export type ListRevisionsResponse = Models.ListRevisionsResponse;
export type SetConfigurationSettingConfig = Pick<Models.ConfigurationSetting, Exclude<keyof Models.ConfigurationSetting, "key">>;
export type SetConfigurationSettingOptions = Models.ConfigurationClientCreateOrUpdateConfigurationSettingOptionalParams;
export type SetConfigurationSettingResponse = Models.CreateOrUpdateConfigurationSettingResponse;
export type UpdateConfigurationSettingConfig = Pick<Models.ConfigurationSetting, Exclude<keyof Models.ConfigurationSetting, "key">>;
export type UpdateConfigurationSettingOptions = Models.ConfigurationClientCreateOrUpdateConfigurationSettingOptionalParams;
export type UpdateConfigurationSettingResponse = Models.CreateOrUpdateConfigurationSettingResponse;

export class AppConfigurationClient {
  private client: ConfigurationClient;

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
    } else if (credential && credential.constructor.name === "ManagedIdentityCredential") {
      this.client = new ConfigurationClient(credential, {
        baseUri: uriOrConnectionString,
        deserializationContentTypes
      })
    } else {
      throw new Error("You must provide either a connection string or a URL and a ManagedIdentityCredential.")
    }
  }

  addConfigurationSetting(key: string, configSettings: AddConfigurationSettingConfig, options: AddConfigurationSettingOptions = {}): Promise<AddConfigurationSettingsResponse> {
    // add the custom header if-none-match=* to only add the key-value if it doesn't already exist
    // create a copy of the options to avoid modifying the user's options
    options = {...options};
    const customHeaders: typeof options.customHeaders = {...options.customHeaders};
    customHeaders["if-none-match"] = "*";
    options.customHeaders = customHeaders;

    if (configSettings.label) {
      options.label = configSettings.label;
    }
    return this.client.createOrUpdateConfigurationSetting(configSettings, key, options);
  }

  deleteConfigurationSetting(key: string, options: DeleteConfigurationSettingOptions): Promise<DeleteConfigurationSettingResponse> {
    // hoist the etag into a custom header to prevent race conditions on the service-side
    options = {...options};
    const customHeaders: typeof options.customHeaders = {...options.customHeaders};
    options.customHeaders = customHeaders;

    const etag = options.etag;
    if (etag) {
      customHeaders["if-match"] = `"${etag}"`;
    }
    return this.client.deleteConfigurationSetting(key, options);
  }

  getConfigurationSetting(key: string, options?: GetConfigurationSettingOptions): Promise<GetConfigurationSettingResponse> {
    return this.client.getConfigurationSetting(key, options);
  }

  listConfigurationSettings(options?: ListConfigurationSettingsOptions): Promise<ListConfigurationSettingsResponse> {
    return this.client.listConfigurationSettings(options);
  }

  listRevisions(options?: ListRevisionsOptions): Promise<ListRevisionsResponse> {
    return this.client.listRevisions(options);
  }

  setConfigurationSetting(key: string, configSettings: SetConfigurationSettingConfig, options: SetConfigurationSettingOptions = {}): Promise<SetConfigurationSettingResponse> {
    // hoist the etag into a custom header to prevent race conditions on the service-side
    options = {...options};

    const customHeaders: typeof options.customHeaders = {...options.customHeaders};
    options.customHeaders = customHeaders;

    const etag = configSettings.etag;
    if (etag) {
      customHeaders["if-match"] = `"${etag}"`;
    }

    if (configSettings.label) {
      options.label = configSettings.label;
    }
    return this.client.createOrUpdateConfigurationSetting(configSettings, key, {...options, customHeaders});
  }

  async updateConfigurationSetting(key: string, configSettings: UpdateConfigurationSettingConfig, options: UpdateConfigurationSettingOptions = {}): Promise<UpdateConfigurationSettingResponse> {
    // retrieve existing configuration, and populate configSettings for missing fields that aren't null
    const existingConfigurationSettings = await this.getConfigurationSetting(key, {
      abortSignal: options.abortSignal,
      label: configSettings.label || options.label
    });

    const updateConfigSettings = {...configSettings};
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

    const customHeaders: typeof options.customHeaders = {...options.customHeaders};
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
