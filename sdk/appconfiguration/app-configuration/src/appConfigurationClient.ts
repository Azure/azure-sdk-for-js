// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// https://azure.github.io/azure-sdk/typescript_design.html#ts-config-lib
/// <reference lib="esnext.asynciterable" />

import { AppConfigCredential } from "./appConfigCredential";
import { AppConfiguration } from "./generated/src/appConfiguration";
import { PageSettings, PagedAsyncIterableIterator } from "@azure/core-paging";
import "@azure/core-asynciterator-polyfill";

import {
  AddConfigurationSettingResponse,
  ClearReadOnlyOptions,
  ConfigurationSetting,
  ConfigurationSettingOptions,
  ConfigurationSettingParam,
  DeleteConfigurationSettingOptions,
  DeleteConfigurationSettingResponse,
  GetConfigurationSettingOptions,
  GetConfigurationSettingResponse,
  GetKeyValuesResponse,
  ListConfigurationSettingPage,
  ListConfigurationSettingsOptions,
  ListRevisionsOptions,
  ListRevisionsPage,
  SetConfigurationSettingResponse,
  SetReadOnlyOptions,
  SetReadOnlyResponse,
  ClearReadOnlyResponse
} from "./models";
import {
  formatWildcards,
  extractAfterTokenFromNextLink,
  checkAndFormatIfAndIfNoneMatch
} from "./internal/helpers";
import { ResponseBodyNotFoundError, tracingPolicy } from "@azure/core-http";
import { Spanner } from "./internal/tracingHelpers";

const apiVersion = "1.0";
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

/**
 * Client for the Azure App Configuration service.
 */
export class AppConfigurationClient {
  private client: AppConfiguration;
  private spanner: Spanner<AppConfigurationClient>;

  /**
   * Initializes a new instance of the AppConfigurationClient class.
   * @param connectionString Connection string needed for a client to connect to Azure.
   */
  constructor(connectionString: string) {
    const regexMatch = connectionString.match(ConnectionStringRegex);
    if (regexMatch) {
      const appConfigCredential = new AppConfigCredential(regexMatch[2], regexMatch[3]);
      this.client = new AppConfiguration(appConfigCredential, apiVersion, {
        baseUri: regexMatch[1],
        deserializationContentTypes,
        requestPolicyFactories: (defaults) => [ ...defaults, tracingPolicy() ]
      });
    } else {
      throw new Error("You must provide a connection string.");
    }

    this.spanner = new Spanner<AppConfigurationClient>("Azure.Data.AppConfiguration", "appconfig");
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
  addConfigurationSetting(
    configurationSetting: ConfigurationSettingParam,
    options: ConfigurationSettingOptions = {}
  ): Promise<AddConfigurationSettingResponse> {
    return this.spanner.trace("addConfigurationSetting", options, (_, newOptions) => {
      return this.client.putKeyValue(configurationSetting.key, {
        ifNoneMatch: "*",
        label: configurationSetting.label,
        entity: configurationSetting,
        ...newOptions
      });
    });
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
  async deleteConfigurationSetting(
    key: string,
    options: DeleteConfigurationSettingOptions = {}
  ): Promise<DeleteConfigurationSettingResponse> {

    return this.spanner.trace("deleteConfigurationSetting", options, (newOptions) => {
      return this.client.deleteKeyValue(key, {
        ...newOptions,
        ...checkAndFormatIfAndIfNoneMatch(newOptions)
      })
    });
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
    return await this.spanner.trace("getConfigurationSetting", options, async (newOptions) => {
      const response = (await this.client.getKeyValue(key, {
        label: newOptions.label,
        ...newOptions,
        ...checkAndFormatIfAndIfNoneMatch(newOptions)
      })) as GetConfigurationSettingResponse;

      // 304 only comes back if the user has passed a conditional option in their
      // request _and_ the remote object has the same etag as what the user passed.
      if (response._response.status === 304) {
        throw new ResponseBodyNotFoundError(
          "The requested setting's value has not changed since the last request.",
          "Resource same as remote",
          response._response.status,
          response._response.request,
          response._response,
          null
        );
      }

      return response;
    });
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
  listConfigurationSettings(
    options: ListConfigurationSettingsOptions = {}
  ): PagedAsyncIterableIterator<ConfigurationSetting, ListConfigurationSettingPage> {
    const iter = this.getListConfigurationSettingsIterator(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (_: PageSettings = {}) => {
        // The appconfig service doesn't currently support letting you select a page size
        // so we're ignoring their setting for now.
        return this.listConfigurationSettingsByPage(options);
      }
    };
  }

  private async *getListConfigurationSettingsIterator(
    options: ListConfigurationSettingsOptions
  ): AsyncIterableIterator<ConfigurationSetting> {
    for await (const page of this.listConfigurationSettingsByPage(options)) {
      for (const configurationSetting of page.items) {
        yield configurationSetting;
      }
    }
  }

  private async *listConfigurationSettingsByPage(
    options: ListConfigurationSettingsOptions = {}
  ): AsyncIterableIterator<ListConfigurationSettingPage> {

    let currentResponse = await this.spanner.trace("listConfigurationSettings", options, (newOptions) => {
       return this.client.getKeyValues({
        ...newOptions,
        ...formatWildcards(newOptions),
        select: newOptions.fields
      });
    });    

    yield* this.createListConfigurationPageFromResponse(currentResponse);

    while (currentResponse.nextLink) {
      currentResponse = await this.spanner.trace("listConfigurationSettings", options, (newOptions) => {
        return this.client.getKeyValues({
          ...newOptions,
          ...formatWildcards(newOptions),
          select: newOptions.fields,
          after: extractAfterTokenFromNextLink(currentResponse.nextLink!)
        });
      });

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
  listRevisions(
    options?: ListRevisionsOptions
  ): PagedAsyncIterableIterator<ConfigurationSetting, ListRevisionsPage> {
    const iter = this.getListRevisionsIterator(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (_: PageSettings = {}) => {
        // The appconfig service doesn't currently support letting you select a page size
        // so we're ignoring their setting for now.
        return this.listRevisionsByPage(options);
      }
    };
  }

  private async *getListRevisionsIterator(
    options?: ListRevisionsOptions
  ): AsyncIterableIterator<ConfigurationSetting> {
    for await (const page of this.listRevisionsByPage(options)) {
      for (const item of page.items) {
        yield item;
      }
    }
  }

  private async *listRevisionsByPage(
    options: ListRevisionsOptions = {}
  ): AsyncIterableIterator<ListRevisionsPage> {
    let currentResponse = await this.spanner.trace("listRevisions", options, (newOptions) => {
      return this.client.getRevisions({
        ...newOptions,
        ...formatWildcards(newOptions),
        select: newOptions.fields
      });
    });

    yield {
      ...currentResponse,
      items: currentResponse.items != null ? currentResponse.items : []
    };

    while (currentResponse.nextLink) {
      currentResponse = await this.spanner.trace("listRevisions", options, (newOptions) => {
        return this.client.getRevisions({
          ...newOptions,
          ...formatWildcards(newOptions),
          select: newOptions.fields,
          after: extractAfterTokenFromNextLink(currentResponse.nextLink!)
        });
      });

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
    configurationSetting: ConfigurationSettingParam,
    options: ConfigurationSettingOptions = {}
  ): Promise<SetConfigurationSettingResponse> {
    return this.spanner.trace("setConfigurationSetting", options, (newOptions) => {
      return this.client.putKeyValue(configurationSetting.key, {
        ...newOptions,
        label: configurationSetting.label,
        entity: configurationSetting,
        ...checkAndFormatIfAndIfNoneMatch(newOptions)
      });
    });
  }

  /**
   * Sets a key's value to read only
   * @param key The name of the setting.
   * @param label The (optional) label of the setting.
   */
  setReadOnly(
    configurationSetting: ConfigurationSettingParam,
    options: SetReadOnlyOptions = {}
  ): Promise<SetReadOnlyResponse> {
    return this.spanner.trace("setReadOnly", options, (newOptions) => {
      return this.client.putLock(configurationSetting.key, {
        ...newOptions,
        label: configurationSetting.label
      });
    });
  }

  /**
   * Makes the key's value writable again
   * @param key The name of the setting.
   * @param label The (optional) label of the setting.
   */
  clearReadOnly(
    configurationSetting: ConfigurationSettingParam,
    options: ClearReadOnlyOptions = {}
  ): Promise<ClearReadOnlyResponse> {
    return this.spanner.trace("clearReadOnly", options, (newOptions) => {
      return this.client.deleteLock(configurationSetting.key, {
        ...newOptions,
        label: configurationSetting.label
      });
    });
  }
}
