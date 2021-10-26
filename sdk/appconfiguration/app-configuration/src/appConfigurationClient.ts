// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// https://azure.github.io/azure-sdk/typescript_design.html#ts-config-lib
/// <reference lib="esnext.asynciterable" />

import { AppConfigCredential } from "./appConfigCredential";
import { AppConfiguration } from "./generated/src/appConfiguration";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  isTokenCredential,
  exponentialRetryPolicy,
  systemErrorRetryPolicy,
  ServiceClientCredentials,
  UserAgentOptions,
  getDefaultUserAgentValue as getCoreHttpDefaultUserAgentValue,
  userAgentPolicy
} from "@azure/core-http";
import { throttlingRetryPolicy } from "./policies/throttlingRetryPolicy";
import { TokenCredential } from "@azure/core-auth";

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
  ListConfigurationSettingPage,
  ListConfigurationSettingsOptions,
  ListRevisionsOptions,
  ListRevisionsPage,
  PageSettings,
  RetryOptions,
  SetConfigurationSettingOptions,
  SetConfigurationSettingParam,
  SetConfigurationSettingResponse,
  SetReadOnlyOptions,
  SetReadOnlyResponse
} from "./models";
import {
  checkAndFormatIfAndIfNoneMatch,
  extractAfterTokenFromNextLink,
  formatFiltersAndSelect,
  makeConfigurationSettingEmpty,
  transformKeyValueResponse,
  transformKeyValueResponseWithStatusCode,
  transformKeyValue,
  formatAcceptDateTime,
  formatFieldsForSelect,
  serializeAsConfigurationSettingParam
} from "./internal/helpers";
import { tracingPolicy } from "@azure/core-http";
import { trace as traceFromTracingHelpers } from "./internal/tracingHelpers";
import {
  AppConfigurationGetKeyValuesResponse,
  AppConfigurationOptionalParams as GeneratedAppConfigurationClientOptions
} from "./generated/src/models";
import { syncTokenPolicy, SyncTokens } from "./internal/synctokenpolicy";
import { FeatureFlagValue } from "./featureFlag";
import { SecretReferenceValue } from "./secretReference";

const packageName = "azsdk-js-app-configuration";

/**
 * This constant should always be the same as the package.json's version - we use it when forming the
 * User - Agent header. There's a unit test that makes sure it always stays in sync.
 * @internal
 */
export const packageVersion = "1.3.1";
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
 * Provides configuration options for AppConfigurationClient.
 */
export interface AppConfigurationClientOptions {
  // NOTE: AppConfigurationClient is currently using it's own version of the ThrottlingRetryPolicy
  // which we are going to unify with core-http. When we do that we can have this options
  // interface extend PipelineOptions, and also switch over to using`createPipelineFromOptions`
  // which will auto-create all of these policies and remove a lot of code.
  //
  // In the meantime we'll just deal with having our own interface that's compatible with PipelineOptions
  // for the small subset we absolutely need to support.

  /**
   * Options for adding user agent details to outgoing requests.
   */
  userAgentOptions?: UserAgentOptions;

  /**
   * Options that control how to retry failed requests.
   */
  retryOptions?: RetryOptions;
}

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
    let appConfigCredential: ServiceClientCredentials | TokenCredential;
    let appConfigEndpoint: string;

    if (isTokenCredential(tokenCredentialOrOptions)) {
      appConfigOptions = (options as InternalAppConfigurationClientOptions) || {};
      appConfigCredential = tokenCredentialOrOptions;
      appConfigEndpoint = connectionStringOrEndpoint;
    } else {
      appConfigOptions = (tokenCredentialOrOptions as InternalAppConfigurationClientOptions) || {};
      const regexMatch = connectionStringOrEndpoint?.match(ConnectionStringRegex);
      if (regexMatch) {
        appConfigCredential = new AppConfigCredential(regexMatch[2], regexMatch[3]);
        appConfigEndpoint = regexMatch[1];
      } else {
        throw new Error(
          `Invalid connection string. Valid connection strings should match the regex '${ConnectionStringRegex.source}'.`
        );
      }
    }

    this._syncTokens = appConfigOptions.syncTokens || new SyncTokens();

    this.client = new AppConfiguration(
      appConfigCredential,
      appConfigEndpoint,
      apiVersion,
      getGeneratedClientOptions(appConfigEndpoint, this._syncTokens, appConfigOptions)
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
        ...newOptions
      });
      return transformKeyValueResponse(originalResponse);
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
      const originalResponse = await this.client.deleteKeyValue(id.key, {
        label: id.label,
        ...newOptions,
        ...checkAndFormatIfAndIfNoneMatch(id, options)
      });

      return transformKeyValueResponseWithStatusCode(originalResponse);
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
      const originalResponse = await this.client.getKeyValue(id.key, {
        ...newOptions,
        label: id.label,
        select: formatFieldsForSelect(options.fields),
        ...formatAcceptDateTime(options),
        ...checkAndFormatIfAndIfNoneMatch(id, options)
      });

      const response: GetConfigurationSettingResponse = transformKeyValueResponseWithStatusCode(
        originalResponse
      );

      // 304 only comes back if the user has passed a conditional option in their
      // request _and_ the remote object has the same etag as what the user passed.
      if (response.statusCode === 304) {
        // this is one of our few 'required' fields so we'll make sure it does get initialized
        // with a value
        response.key = id.key;

        // and now we'll undefine all the other properties that are not HTTP related
        makeConfigurationSettingEmpty(response);
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
          continuationToken: settings.continuationToken
        });
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
          after: options.continuationToken
        });

        return response;
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
            after: extractAfterTokenFromNextLink(currentResponse.nextLink!)
          });

          return response;
        }
      );

      if (!currentResponse.items) {
        break;
      }

      yield* this.createListConfigurationPageFromResponse(currentResponse);
    }
  }

  private *createListConfigurationPageFromResponse(
    currentResponse: AppConfigurationGetKeyValuesResponse
  ): Generator<ListConfigurationSettingPage> {
    yield {
      ...currentResponse,
      items: currentResponse.items != null ? currentResponse.items.map(transformKeyValue) : [],
      continuationToken: currentResponse.nextLink
        ? extractAfterTokenFromNextLink(currentResponse.nextLink)
        : undefined
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
          continuationToken: settings.continuationToken
        });
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
    options: ListRevisionsOptions & PageSettings = {}
  ): AsyncIterableIterator<ListRevisionsPage> {
    let currentResponse = await this._trace("listRevisions", options, async (newOptions) => {
      const response = await this.client.getRevisions({
        ...newOptions,
        ...formatAcceptDateTime(options),
        ...formatFiltersAndSelect(newOptions),
        after: options.continuationToken
      });

      return response;
    });

    yield* this.createListRevisionsPageFromResponse(currentResponse);

    while (currentResponse.nextLink) {
      currentResponse = await this._trace("listRevisions", options, (newOptions) => {
        return this.client.getRevisions({
          ...newOptions,
          ...formatAcceptDateTime(options),
          ...formatFiltersAndSelect(options),
          after: extractAfterTokenFromNextLink(currentResponse.nextLink!)
        });
      });

      if (!currentResponse.items) {
        break;
      }

      yield* this.createListRevisionsPageFromResponse(currentResponse);
    }
  }

  private *createListRevisionsPageFromResponse(
    currentResponse: AppConfigurationGetKeyValuesResponse
  ) {
    yield {
      ...currentResponse,
      items: currentResponse.items != null ? currentResponse.items.map(transformKeyValue) : [],
      continuationToken: currentResponse.nextLink
        ? extractAfterTokenFromNextLink(currentResponse.nextLink)
        : undefined
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
      const response = await this.client.putKeyValue(configurationSetting.key, {
        ...newOptions,
        label: configurationSetting.label,
        entity: keyValue,
        ...checkAndFormatIfAndIfNoneMatch(configurationSetting, options)
      });

      return transformKeyValueResponse(response);
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
      if (readOnly) {
        const response = await this.client.putLock(id.key, {
          ...newOptions,
          label: id.label,
          ...checkAndFormatIfAndIfNoneMatch(id, options)
        });

        return transformKeyValueResponse(response);
      } else {
        const response = await this.client.deleteLock(id.key, {
          ...newOptions,
          label: id.label,
          ...checkAndFormatIfAndIfNoneMatch(id, options)
        });

        return transformKeyValueResponse(response);
      }
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
/**
 * Gets the options for the generated AppConfigurationClient
 * @internal
 */
export function getGeneratedClientOptions(
  endpoint: string,
  syncTokens: SyncTokens,
  internalAppConfigOptions: InternalAppConfigurationClientOptions
): GeneratedAppConfigurationClientOptions {
  const retryPolicies = [
    exponentialRetryPolicy(),
    systemErrorRetryPolicy(),
    throttlingRetryPolicy(internalAppConfigOptions.retryOptions)
  ];

  const userAgent = getUserAgentPrefix(
    internalAppConfigOptions.userAgentOptions &&
      internalAppConfigOptions.userAgentOptions.userAgentPrefix
  );

  return {
    endpoint,
    deserializationContentTypes,
    // we'll add in our own custom retry policies
    noRetryPolicy: true,
    requestPolicyFactories: (defaults) => [
      tracingPolicy({ userAgent }),
      syncTokenPolicy(syncTokens),
      userAgentPolicy({ value: userAgent }),
      ...retryPolicies,
      ...defaults
    ],
    generateClientRequestIdHeader: true
  };
}

/**
 * @internal
 */
export function getUserAgentPrefix(userSuppliedUserAgent: string | undefined): string {
  const appConfigDefaultUserAgent = `${packageName}/${packageVersion} ${getCoreHttpDefaultUserAgentValue()}`;

  if (!userSuppliedUserAgent) {
    return appConfigDefaultUserAgent;
  }

  return `${userSuppliedUserAgent} ${appConfigDefaultUserAgent}`;
}
