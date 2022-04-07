// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// https://azure.github.io/azure-sdk/typescript_design.html#ts-config-lib
/// <reference lib="esnext.asynciterable" />

import { appConfigKeyCredentialPolicy } from "./appConfigCredential";
import { AppConfiguration } from "./generated/src/appConfiguration";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { TokenCredential, isTokenCredential } from "@azure/core-auth";

import "@azure/core-asynciterator-polyfill";

import {
  AddConfigurationSettingOptions,
  AddConfigurationSettingParam,
  AddConfigurationSettingResponse,
  ConfigurationSetting,
  ConfigurationSettingId,
  DeleteConfigurationSettingOptions,
  DeleteConfigurationSettingResponse,
  GetConfigurationSettingOptions,
  GetConfigurationSettingResponse,
  HttpResponseField,
  ListConfigurationSettingPage,
  ListConfigurationSettingsOptions,
  ListRevisionsOptions,
  ListRevisionsPage,
  PageSettings,
  SetConfigurationSettingOptions,
  SetConfigurationSettingParam,
  SetConfigurationSettingResponse,
  SetReadOnlyOptions,
  SetReadOnlyResponse,
} from "./models";
import {
  assertResponse,
  checkAndFormatIfAndIfNoneMatch,
  extractAfterTokenFromNextLink,
  formatAcceptDateTime,
  formatFieldsForSelect,
  formatFiltersAndSelect,
  makeConfigurationSettingEmpty,
  serializeAsConfigurationSettingParam,
  transformKeyValue,
  transformKeyValueResponse,
  transformKeyValueResponseWithStatusCode,
} from "./internal/helpers";
import { trace as traceFromTracingHelpers } from "./internal/tracingHelpers";
import {
  AppConfigurationGetKeyValuesHeaders,
  AppConfigurationGetRevisionsHeaders,
  GetKeyValuesResponse,
  GetRevisionsResponse,
} from "./generated/src/models";
import { SyncTokens, syncTokenPolicy } from "./internal/synctokenpolicy";
import { FeatureFlagValue } from "./featureFlag";
import { SecretReferenceValue } from "./secretReference";
import {
  CommonClientOptions,
  deserializationPolicy,
  deserializationPolicyName,
} from "@azure/core-client";
import { PipelinePolicy, bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";

/**
 * @internal
 */
export const packageVersion = "1.4.0-beta.1";
const apiVersion = "1.0";
const ConnectionStringRegex = /Endpoint=(.*);Id=(.*);Secret=(.*)/;
const deserializationContentTypes = {
  json: [
    "application/vnd.microsoft.appconfig.kvset+json",
    "application/vnd.microsoft.appconfig.kv+json",
    "application/vnd.microsoft.appconfig.kvs+json",
    "application/vnd.microsoft.appconfig.keyset+json",
    "application/vnd.microsoft.appconfig.revs+json",
  ],
};

/**
 * Provides configuration options for AppConfigurationClient.
 */
export interface AppConfigurationClientOptions extends CommonClientOptions {}

/**
 * Provides internal configuration options for AppConfigurationClient.
 * @internal
 */
export interface InternalAppConfigurationClientOptions extends AppConfigurationClientOptions {
  /**
   * The sync token cache to use for this client.
   * NOTE: this is an internal option, not for general client usage.
   */
  syncTokens?: SyncTokens;
}

/**
 * Client for the Azure App Configuration service.
 */
export class AppConfigurationClient {
  private client: AppConfiguration;
  private _syncTokens: SyncTokens;
  // (for tests)
  private _trace = traceFromTracingHelpers;

  /**
   * Initializes a new instance of the AppConfigurationClient class.
   * @param connectionString - Connection string needed for a client to connect to Azure.
   * @param options - Options for the AppConfigurationClient.
   */
  constructor(connectionString: string, options?: AppConfigurationClientOptions);
  /**
   * Initializes a new instance of the AppConfigurationClient class using
   * a TokenCredential.
   * @param endpoint - The endpoint of the App Configuration service (ex: https://sample.azconfig.io).
   * @param tokenCredential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
   * @param options - Options for the AppConfigurationClient.
   */
  constructor(
    endpoint: string,
    tokenCredential: TokenCredential,
    options?: AppConfigurationClientOptions
  );
  constructor(
    connectionStringOrEndpoint: string,
    tokenCredentialOrOptions?: TokenCredential | AppConfigurationClientOptions,
    options?: AppConfigurationClientOptions
  ) {
    let appConfigOptions: InternalAppConfigurationClientOptions = {};
    let appConfigCredential: TokenCredential;
    let appConfigEndpoint: string;
    let authPolicy: PipelinePolicy;

    if (isTokenCredential(tokenCredentialOrOptions)) {
      appConfigOptions = (options as InternalAppConfigurationClientOptions) || {};
      appConfigCredential = tokenCredentialOrOptions;
      appConfigEndpoint = connectionStringOrEndpoint.endsWith("/")
        ? connectionStringOrEndpoint.slice(0, -1)
        : connectionStringOrEndpoint;
      authPolicy = bearerTokenAuthenticationPolicy({
        scopes: `${appConfigEndpoint}/.default`,
        credential: appConfigCredential,
      });
    } else {
      appConfigOptions = (tokenCredentialOrOptions as InternalAppConfigurationClientOptions) || {};
      const regexMatch = connectionStringOrEndpoint?.match(ConnectionStringRegex);
      if (regexMatch) {
        appConfigEndpoint = regexMatch[1];
        authPolicy = appConfigKeyCredentialPolicy(regexMatch[2], regexMatch[3]);
      } else {
        throw new Error(
          `Invalid connection string. Valid connection strings should match the regex '${ConnectionStringRegex.source}'.`
        );
      }
    }

    this._syncTokens = appConfigOptions.syncTokens || new SyncTokens();
    this.client = new AppConfiguration(appConfigEndpoint, apiVersion, appConfigOptions);
    this.client.pipeline.addPolicy(authPolicy, { phase: "Sign" });
    this.client.pipeline.addPolicy(syncTokenPolicy(this._syncTokens), { afterPhase: "Retry" });
    this.client.pipeline.removePolicy({ name: deserializationPolicyName });
    this.client.pipeline.addPolicy(
      deserializationPolicy({ expectedContentTypes: deserializationContentTypes }),
      { phase: "Deserialize" }
    );
  }

  /**
   * Add a setting into the Azure App Configuration service, failing if it
   * already exists.
   *
   * Example usage:
   * ```ts
   * const result = await client.addConfigurationSetting({ key: "MyKey", label: "MyLabel", value: "MyValue" });
   * ```
   * @param configurationSetting - A configuration setting.
   * @param options - Optional parameters for the request.
   */
  addConfigurationSetting(
    configurationSetting:
      | AddConfigurationSettingParam
      | AddConfigurationSettingParam<FeatureFlagValue>
      | AddConfigurationSettingParam<SecretReferenceValue>,
    options: AddConfigurationSettingOptions = {}
  ): Promise<AddConfigurationSettingResponse> {
    return this._trace("addConfigurationSetting", options, async (newOptions) => {
      const keyValue = serializeAsConfigurationSettingParam(configurationSetting);
      const originalResponse = await this.client.putKeyValue(configurationSetting.key, {
        ifNoneMatch: "*",
        label: configurationSetting.label,
        entity: keyValue,
        ...newOptions,
      });
      const response = transformKeyValueResponse(originalResponse);
      assertResponse(response);
      return response;
    });
  }

  /**
   * Delete a setting from the Azure App Configuration service
   *
   * Example usage:
   * ```ts
   * const deletedSetting = await client.deleteConfigurationSetting({ key: "MyKey", label: "MyLabel" });
   * ```
   * @param id - The id of the configuration setting to delete.
   * @param options - Optional parameters for the request (ex: etag, label)
   */
  deleteConfigurationSetting(
    id: ConfigurationSettingId,
    options: DeleteConfigurationSettingOptions = {}
  ): Promise<DeleteConfigurationSettingResponse> {
    return this._trace("deleteConfigurationSetting", options, async (newOptions) => {
      let status;
      const originalResponse = await this.client.deleteKeyValue(id.key, {
        label: id.label,
        ...newOptions,
        ...checkAndFormatIfAndIfNoneMatch(id, options),
        onResponse: (response) => {
          status = response.status;
        },
      });

      const response = transformKeyValueResponseWithStatusCode(originalResponse, status);
      assertResponse(response);
      return response;
    });
  }

  /**
   * Gets a setting from the Azure App Configuration service.
   *
   * Example code:
   * ```ts
   * const setting = await client.getConfigurationSetting({ key: "MyKey", label: "MyLabel" });
   * ```
   * @param id - The id of the configuration setting to get.
   * @param options - Optional parameters for the request.
   */
  async getConfigurationSetting(
    id: ConfigurationSettingId,
    options: GetConfigurationSettingOptions = {}
  ): Promise<GetConfigurationSettingResponse> {
    return this._trace("getConfigurationSetting", options, async (newOptions) => {
      let status;
      const originalResponse = await this.client.getKeyValue(id.key, {
        ...newOptions,
        label: id.label,
        select: formatFieldsForSelect(options.fields),
        ...formatAcceptDateTime(options),
        ...checkAndFormatIfAndIfNoneMatch(id, options),
        onResponse: (response) => {
          status = response.status;
        },
      });

      const response = transformKeyValueResponseWithStatusCode(originalResponse, status);

      // 304 only comes back if the user has passed a conditional option in their
      // request _and_ the remote object has the same etag as what the user passed.
      if (response.statusCode === 304) {
        // this is one of our few 'required' fields so we'll make sure it does get initialized
        // with a value
        response.key = id.key;

        // and now we'll undefine all the other properties that are not HTTP related
        makeConfigurationSettingEmpty(response);
      }
      assertResponse(response);
      return response;
    });
  }

  /**
   * Lists settings from the Azure App Configuration service, optionally
   * filtered by key names, labels and accept datetime.
   *
   * Example code:
   * ```ts
   * const allSettingsWithLabel = client.listConfigurationSettings({ labelFilter: "MyLabel" });
   * ```
   * @param options - Optional parameters for the request.
   */
  listConfigurationSettings(
    options: ListConfigurationSettingsOptions = {}
  ): PagedAsyncIterableIterator<ConfigurationSetting, ListConfigurationSettingPage, PageSettings> {
    const iter = this.getListConfigurationSettingsIterator(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => {
        // The appconfig service doesn't currently support letting you select a page size
        // so we're ignoring their setting for now.
        return this.listConfigurationSettingsByPage({
          ...options,
          continuationToken: settings.continuationToken,
        });
      },
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
    options: ListConfigurationSettingsOptions & PageSettings = {}
  ): AsyncIterableIterator<ListConfigurationSettingPage> {
    let currentResponse = await this._trace(
      "listConfigurationSettings",
      options,
      async (newOptions) => {
        const response = await this.client.getKeyValues({
          ...newOptions,
          ...formatAcceptDateTime(options),
          ...formatFiltersAndSelect(options),
          after: options.continuationToken,
        });

        return response as GetKeyValuesResponse &
          HttpResponseField<AppConfigurationGetKeyValuesHeaders>;
      }
    );

    yield* this.createListConfigurationPageFromResponse(currentResponse);

    while (currentResponse.nextLink) {
      currentResponse = await this._trace(
        "listConfigurationSettings",
        options,
        // TODO: same code up above. Unify.
        async (newOptions) => {
          const response = await this.client.getKeyValues({
            ...newOptions,
            ...formatAcceptDateTime(options),
            ...formatFiltersAndSelect(options),
            after: extractAfterTokenFromNextLink(currentResponse.nextLink!),
          });

          return response as GetKeyValuesResponse &
            HttpResponseField<AppConfigurationGetKeyValuesHeaders>;
        }
      );

      if (!currentResponse.items) {
        break;
      }

      yield* this.createListConfigurationPageFromResponse(currentResponse);
    }
  }

  private *createListConfigurationPageFromResponse(
    currentResponse: GetKeyValuesResponse & HttpResponseField<AppConfigurationGetKeyValuesHeaders>
  ): Generator<ListConfigurationSettingPage> {
    yield {
      ...currentResponse,
      items: currentResponse.items != null ? currentResponse.items.map(transformKeyValue) : [],
      continuationToken: currentResponse.nextLink
        ? extractAfterTokenFromNextLink(currentResponse.nextLink)
        : undefined,
    };
  }

  /**
   * Lists revisions of a set of keys, optionally filtered by key names,
   * labels and accept datetime.
   *
   * Example code:
   * ```ts
   * const revisionsIterator = client.listRevisions({ keys: ["MyKey"] });
   * ```
   * @param options - Optional parameters for the request.
   */
  listRevisions(
    options?: ListRevisionsOptions
  ): PagedAsyncIterableIterator<ConfigurationSetting, ListRevisionsPage, PageSettings> {
    const iter = this.getListRevisionsIterator(options);

    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings: PageSettings = {}) => {
        // The appconfig service doesn't currently support letting you select a page size
        // so we're ignoring their setting for now.
        return this.listRevisionsByPage({
          ...options,
          continuationToken: settings.continuationToken,
        });
      },
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
    options: ListRevisionsOptions & PageSettings = {}
  ): AsyncIterableIterator<ListRevisionsPage> {
    let currentResponse = await this._trace("listRevisions", options, async (newOptions) => {
      const response = await this.client.getRevisions({
        ...newOptions,
        ...formatAcceptDateTime(options),
        ...formatFiltersAndSelect(newOptions),
        after: options.continuationToken,
      });

      return response as GetRevisionsResponse &
        HttpResponseField<AppConfigurationGetRevisionsHeaders>;
    });

    yield* this.createListRevisionsPageFromResponse(currentResponse);

    while (currentResponse.nextLink) {
      currentResponse = (await this._trace("listRevisions", options, (newOptions) => {
        return this.client.getRevisions({
          ...newOptions,
          ...formatAcceptDateTime(options),
          ...formatFiltersAndSelect(options),
          after: extractAfterTokenFromNextLink(currentResponse.nextLink!),
        });
      })) as GetRevisionsResponse & HttpResponseField<AppConfigurationGetRevisionsHeaders>;

      if (!currentResponse.items) {
        break;
      }

      yield* this.createListRevisionsPageFromResponse(currentResponse);
    }
  }

  private *createListRevisionsPageFromResponse(
    currentResponse: GetKeyValuesResponse & HttpResponseField<AppConfigurationGetKeyValuesHeaders>
  ) {
    yield {
      ...currentResponse,
      items: currentResponse.items != null ? currentResponse.items.map(transformKeyValue) : [],
      continuationToken: currentResponse.nextLink
        ? extractAfterTokenFromNextLink(currentResponse.nextLink)
        : undefined,
    };
  }

  /**
   * Sets the value of a key in the Azure App Configuration service, allowing for an optional etag.
   * @param key - The name of the key.
   * @param configurationSetting - A configuration value.
   * @param options - Optional parameters for the request.
   *
   * Example code:
   * ```ts
   * await client.setConfigurationSetting({ key: "MyKey", value: "MyValue" });
   * ```
   */
  async setConfigurationSetting(
    configurationSetting:
      | SetConfigurationSettingParam
      | SetConfigurationSettingParam<FeatureFlagValue>
      | SetConfigurationSettingParam<SecretReferenceValue>,
    options: SetConfigurationSettingOptions = {}
  ): Promise<SetConfigurationSettingResponse> {
    return this._trace("setConfigurationSetting", options, async (newOptions) => {
      const keyValue = serializeAsConfigurationSettingParam(configurationSetting);
      const response = transformKeyValueResponse(
        await this.client.putKeyValue(configurationSetting.key, {
          ...newOptions,
          label: configurationSetting.label,
          entity: keyValue,
          ...checkAndFormatIfAndIfNoneMatch(configurationSetting, options),
        })
      );
      assertResponse(response);
      return response;
    });
  }

  /**
   * Sets or clears a key's read-only status.
   * @param id - The id of the configuration setting to modify.
   */
  async setReadOnly(
    id: ConfigurationSettingId,
    readOnly: boolean,
    options: SetReadOnlyOptions = {}
  ): Promise<SetReadOnlyResponse> {
    return this._trace("setReadOnly", options, async (newOptions) => {
      let response;
      if (readOnly) {
        response = await this.client.putLock(id.key, {
          ...newOptions,
          label: id.label,
          ...checkAndFormatIfAndIfNoneMatch(id, options),
        });
      } else {
        response = await this.client.deleteLock(id.key, {
          ...newOptions,
          label: id.label,
          ...checkAndFormatIfAndIfNoneMatch(id, options),
        });
      }
      response = transformKeyValueResponse(response);
      assertResponse(response);
      return response;
    });
  }

  /**
   * Adds an external synchronization token to ensure service requests receive up-to-date values.
   *
   * @param syncToken - The synchronization token value.
   */
  updateSyncToken(syncToken: string): void {
    this._syncTokens.addSyncTokenFromHeaderValue(syncToken);
  }
}
