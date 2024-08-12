// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// https://azure.github.io/azure-sdk/typescript_design.html#ts-config-lib
/// <reference lib="esnext.asynciterable" />

import {
  AddConfigurationSettingOptions,
  AddConfigurationSettingParam,
  AddConfigurationSettingResponse,
  AppConfigurationClientOptions,
  ConfigurationSetting,
  ConfigurationSettingId,
  CreateSnapshotOptions,
  CreateSnapshotResponse,
  DeleteConfigurationSettingOptions,
  DeleteConfigurationSettingResponse,
  GetConfigurationSettingOptions,
  GetConfigurationSettingResponse,
  GetSnapshotOptions,
  GetSnapshotResponse,
  HttpResponseField,
  ListConfigurationSettingPage,
  ListConfigurationSettingsForSnapshotOptions,
  ListConfigurationSettingsOptions,
  ListLabelsOptions,
  ListLabelsPage,
  ListRevisionsOptions,
  ListRevisionsPage,
  ListSnapshotsOptions,
  ListSnapshotsPage,
  PageSettings,
  SetConfigurationSettingOptions,
  SetConfigurationSettingParam,
  SetConfigurationSettingResponse,
  SetReadOnlyOptions,
  SetReadOnlyResponse,
  SettingLabel,
  SnapshotInfo,
  UpdateSnapshotOptions,
  UpdateSnapshotResponse,
} from "./models";
import {
  AppConfigurationGetKeyValuesHeaders,
  AppConfigurationGetRevisionsHeaders,
  AppConfigurationGetSnapshotsHeaders,
  GetKeyValuesResponse,
  GetRevisionsResponse,
  GetSnapshotsResponse,
  ConfigurationSnapshot,
  GetLabelsResponse,
  AppConfigurationGetLabelsHeaders,
} from "./generated/src/models";
import { InternalClientPipelineOptions } from "@azure/core-client";
import { PagedAsyncIterableIterator, PagedResult, getPagedAsyncIterator } from "@azure/core-paging";
import {
  PipelinePolicy,
  bearerTokenAuthenticationPolicy,
  RestError,
} from "@azure/core-rest-pipeline";
import { SyncTokens, syncTokenPolicy } from "./internal/synctokenpolicy";
import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  SendConfigurationSettingsOptions,
  SendLabelsRequestOptions,
  assertResponse,
  checkAndFormatIfAndIfNoneMatch,
  extractAfterTokenFromLinkHeader,
  extractAfterTokenFromNextLink,
  formatAcceptDateTime,
  formatConfigurationSettingsFiltersAndSelect,
  formatFieldsForSelect,
  formatFiltersAndSelect,
  formatLabelsFiltersAndSelect,
  formatSnapshotFiltersAndSelect,
  makeConfigurationSettingEmpty,
  serializeAsConfigurationSettingParam,
  transformKeyValue,
  transformKeyValueResponse,
  transformKeyValueResponseWithStatusCode,
  transformSnapshotResponse,
} from "./internal/helpers";
import { AppConfiguration } from "./generated/src/appConfiguration";
import { FeatureFlagValue } from "./featureFlag";
import { SecretReferenceValue } from "./secretReference";
import { appConfigKeyCredentialPolicy } from "./appConfigCredential";
import { tracingClient } from "./internal/tracing";
import { logger } from "./logger";
import { OperationState, SimplePollerLike } from "@azure/core-lro";
import { appConfigurationApiVersion } from "./internal/constants";

const ConnectionStringRegex = /Endpoint=(.*);Id=(.*);Secret=(.*)/;
const deserializationContentTypes = {
  json: [
    "application/vnd.microsoft.appconfig.kvset+json",
    "application/vnd.microsoft.appconfig.kv+json",
    "application/vnd.microsoft.appconfig.kvs+json",
    "application/vnd.microsoft.appconfig.keyset+json",
    "application/vnd.microsoft.appconfig.revs+json",
    "application/vnd.microsoft.appconfig.snapshotset+json",
    "application/vnd.microsoft.appconfig.snapshot+json",
    "application/vnd.microsoft.appconfig.labelset+json",
    "application/json",
  ],
};

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
    options?: AppConfigurationClientOptions,
  );
  constructor(
    connectionStringOrEndpoint: string,
    tokenCredentialOrOptions?: TokenCredential | AppConfigurationClientOptions,
    options?: AppConfigurationClientOptions,
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
          `Invalid connection string. Valid connection strings should match the regex '${ConnectionStringRegex.source}'.` +
            ` To mitigate the issue, please refer to the troubleshooting guide here at https://aka.ms/azsdk/js/app-configuration/troubleshoot.`,
        );
      }
    }

    const internalClientPipelineOptions: InternalClientPipelineOptions = {
      ...appConfigOptions,
      loggingOptions: {
        logger: logger.info,
      },
      deserializationOptions: {
        expectedContentTypes: deserializationContentTypes,
      },
    };

    this._syncTokens = appConfigOptions.syncTokens || new SyncTokens();
    this.client = new AppConfiguration(
      appConfigEndpoint,
      appConfigurationApiVersion,
      internalClientPipelineOptions,
    );
    this.client.pipeline.addPolicy(authPolicy, { phase: "Sign" });
    this.client.pipeline.addPolicy(syncTokenPolicy(this._syncTokens), { afterPhase: "Retry" });
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
    options: AddConfigurationSettingOptions = {},
  ): Promise<AddConfigurationSettingResponse> {
    return tracingClient.withSpan(
      "AppConfigurationClient.addConfigurationSetting",
      options,
      async (updatedOptions) => {
        const keyValue = serializeAsConfigurationSettingParam(configurationSetting);
        logger.info("[addConfigurationSetting] Creating a key value pair");
        try {
          const originalResponse = await this.client.putKeyValue(configurationSetting.key, {
            ifNoneMatch: "*",
            label: configurationSetting.label,
            entity: keyValue,
            ...updatedOptions,
          });
          const response = transformKeyValueResponse(originalResponse);
          assertResponse(response);
          return response;
        } catch (error) {
          const err = error as RestError;
          // Service does not return an error message. Raise a 412 error similar to .NET
          if (err.statusCode === 412) {
            err.message = `Status 412: Setting was already present`;
          }
          throw err;
        }
        throw new Error("Unreachable code");
      },
    );
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
    options: DeleteConfigurationSettingOptions = {},
  ): Promise<DeleteConfigurationSettingResponse> {
    return tracingClient.withSpan(
      "AppConfigurationClient.deleteConfigurationSetting",
      options,
      async (updatedOptions) => {
        let status;
        logger.info("[deleteConfigurationSetting] Deleting key value pair");
        const originalResponse = await this.client.deleteKeyValue(id.key, {
          label: id.label,
          ...updatedOptions,
          ...checkAndFormatIfAndIfNoneMatch(id, options),
          onResponse: (response) => {
            status = response.status;
          },
        });

        const response = transformKeyValueResponseWithStatusCode(originalResponse, status);
        assertResponse(response);
        return response;
      },
    );
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
    options: GetConfigurationSettingOptions = {},
  ): Promise<GetConfigurationSettingResponse> {
    return tracingClient.withSpan(
      "AppConfigurationClient.getConfigurationSetting",
      options,
      async (updatedOptions) => {
        let status;
        logger.info("[getConfigurationSetting] Getting key value pair");
        const originalResponse = await this.client.getKeyValue(id.key, {
          ...updatedOptions,
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
      },
    );
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
    options: ListConfigurationSettingsOptions = {},
  ): PagedAsyncIterableIterator<ConfigurationSetting, ListConfigurationSettingPage, PageSettings> {
    const pageEtags = options.pageEtags ? [...options.pageEtags] : undefined;
    delete options.pageEtags;
    const pagedResult: PagedResult<ListConfigurationSettingPage, PageSettings, string | undefined> =
      {
        firstPageLink: undefined,
        getPage: async (pageLink: string | undefined) => {
          const etag = pageEtags?.shift();
          try {
            const response = await this.sendConfigurationSettingsRequest(
              { ...options, etag },
              pageLink,
            );
            const currentResponse: ListConfigurationSettingPage = {
              ...response,
              items: response.items != null ? response.items?.map(transformKeyValue) : [],
              continuationToken: response.nextLink
                ? extractAfterTokenFromNextLink(response.nextLink)
                : undefined,
              _response: response._response,
            };
            return {
              page: currentResponse,
              nextPageLink: currentResponse.continuationToken,
            };
          } catch (error) {
            const err = error as RestError;

            const link = err.response?.headers?.get("link");
            const continuationToken = link ? extractAfterTokenFromLinkHeader(link) : undefined;

            if (err.statusCode === 304) {
              err.message = `Status 304: No updates for this page`;
              logger.info(
                `[listConfigurationSettings] No updates for this page. The current etag for the page is ${etag}`,
              );
              return {
                page: {
                  items: [],
                  etag,
                  _response: { ...err.response, status: 304 },
                } as unknown as ListConfigurationSettingPage,
                nextPageLink: continuationToken,
              };
            }

            throw err;
          }
        },
        toElements: (page) => page.items,
      };
    return getPagedAsyncIterator(pagedResult);
  }

  /**
   * Lists settings from the Azure App Configuration service for snapshots based on name, optionally
   * filtered by key names, labels and accept datetime.
   *
   * Example code:
   * ```ts
   * const allSettingsWithLabel = client.listConfigurationSettingsForSnashots({ snapshotName: "MySnapshot" });
   * ```
   * @param options - Optional parameters for the request.
   */
  listConfigurationSettingsForSnapshot(
    snapshotName: string,
    options: ListConfigurationSettingsForSnapshotOptions = {},
  ): PagedAsyncIterableIterator<ConfigurationSetting, ListConfigurationSettingPage, PageSettings> {
    const pagedResult: PagedResult<ListConfigurationSettingPage, PageSettings, string | undefined> =
      {
        firstPageLink: undefined,
        getPage: async (pageLink: string | undefined) => {
          const response = await this.sendConfigurationSettingsRequest(
            { snapshotName, ...options },
            pageLink,
          );
          const currentResponse = {
            ...response,
            items: response.items != null ? response.items?.map(transformKeyValue) : [],
            continuationToken: response.nextLink
              ? extractAfterTokenFromNextLink(response.nextLink)
              : undefined,
          };
          return {
            page: currentResponse,
            nextPageLink: currentResponse.continuationToken,
          };
        },
        toElements: (page) => page.items,
      };
    return getPagedAsyncIterator(pagedResult);
  }

  /**
   * Get a list of labels from the Azure App Configuration service
   *
   * Example code:
   * ```ts
   * const allSettingsWithLabel = client.listLabels({ nameFilter: "prod*" });
   * ```
   * @param options - Optional parameters for the request.
   */
  listLabels(
    options: ListLabelsOptions = {},
  ): PagedAsyncIterableIterator<SettingLabel, ListLabelsPage, PageSettings> {
    const pagedResult: PagedResult<ListLabelsPage, PageSettings, string | undefined> = {
      firstPageLink: undefined,
      getPage: async (pageLink: string | undefined) => {
        const response = await this.sendLabelsRequest(options, pageLink);
        const currentResponse: ListLabelsPage = {
          ...response,
          items: response.items ?? [],
          continuationToken: response.nextLink
            ? extractAfterTokenFromNextLink(response.nextLink)
            : undefined,
          _response: response._response,
        };
        return {
          page: currentResponse,
          nextPageLink: currentResponse.continuationToken,
        };
      },
      toElements: (page) => page.items,
    };
    return getPagedAsyncIterator(pagedResult);
  }

  private async sendLabelsRequest(
    options: SendLabelsRequestOptions & PageSettings = {},
    pageLink: string | undefined,
  ): Promise<GetLabelsResponse & HttpResponseField<AppConfigurationGetLabelsHeaders>> {
    return tracingClient.withSpan(
      "AppConfigurationClient.listConfigurationSettings",
      options,
      async (updatedOptions) => {
        const response = await this.client.getLabels({
          ...updatedOptions,
          ...formatAcceptDateTime(options),
          ...formatLabelsFiltersAndSelect(options),
          after: pageLink,
        });

        return response as GetLabelsResponse & HttpResponseField<AppConfigurationGetLabelsHeaders>;
      },
    );
  }

  private async sendConfigurationSettingsRequest(
    options: SendConfigurationSettingsOptions & PageSettings = {},
    pageLink: string | undefined,
  ): Promise<GetKeyValuesResponse & HttpResponseField<AppConfigurationGetKeyValuesHeaders>> {
    return tracingClient.withSpan(
      "AppConfigurationClient.listConfigurationSettings",
      options,
      async (updatedOptions) => {
        const response = await this.client.getKeyValues({
          ...updatedOptions,
          ...formatAcceptDateTime(options),
          ...formatConfigurationSettingsFiltersAndSelect(options),
          ...checkAndFormatIfAndIfNoneMatch({ etag: options.etag }, { onlyIfChanged: true }),
          after: pageLink,
        });

        return response as GetKeyValuesResponse &
          HttpResponseField<AppConfigurationGetKeyValuesHeaders>;
      },
    );
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
    options?: ListRevisionsOptions,
  ): PagedAsyncIterableIterator<ConfigurationSetting, ListRevisionsPage, PageSettings> {
    const pagedResult: PagedResult<ListRevisionsPage, PageSettings, string | undefined> = {
      firstPageLink: undefined,
      getPage: async (pageLink: string | undefined) => {
        const response = await this.sendRevisionsRequest(options, pageLink);
        const currentResponse = {
          ...response,
          items: response.items != null ? response.items.map(transformKeyValue) : [],
          continuationToken: response.nextLink
            ? extractAfterTokenFromNextLink(response.nextLink)
            : undefined,
        };
        // let itemList = currentResponse.items;
        return {
          page: currentResponse,
          nextPageLink: currentResponse.continuationToken,
        };
      },
      toElements: (page) => page.items,
    };
    return getPagedAsyncIterator(pagedResult);
  }

  private async sendRevisionsRequest(
    options: ListConfigurationSettingsOptions & PageSettings = {},
    pageLink: string | undefined,
  ): Promise<GetKeyValuesResponse & HttpResponseField<AppConfigurationGetKeyValuesHeaders>> {
    return tracingClient.withSpan(
      "AppConfigurationClient.listRevisions",
      options,
      async (updatedOptions) => {
        const response = await this.client.getRevisions({
          ...updatedOptions,
          ...formatAcceptDateTime(options),
          ...formatFiltersAndSelect(updatedOptions),
          after: pageLink,
        });

        return response as GetRevisionsResponse &
          HttpResponseField<AppConfigurationGetRevisionsHeaders>;
      },
    );
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
    options: SetConfigurationSettingOptions = {},
  ): Promise<SetConfigurationSettingResponse> {
    return tracingClient.withSpan(
      "AppConfigurationClient.setConfigurationSetting",
      options,
      async (updatedOptions) => {
        const keyValue = serializeAsConfigurationSettingParam(configurationSetting);
        logger.info("[setConfigurationSetting] Setting new key value");
        const response = transformKeyValueResponse(
          await this.client.putKeyValue(configurationSetting.key, {
            ...updatedOptions,
            label: configurationSetting.label,
            entity: keyValue,
            ...checkAndFormatIfAndIfNoneMatch(configurationSetting, options),
          }),
        );
        assertResponse(response);
        return response;
      },
    );
  }

  /**
   * Sets or clears a key's read-only status.
   * @param id - The id of the configuration setting to modify.
   */
  async setReadOnly(
    id: ConfigurationSettingId,
    readOnly: boolean,
    options: SetReadOnlyOptions = {},
  ): Promise<SetReadOnlyResponse> {
    return tracingClient.withSpan(
      "AppConfigurationClient.setReadOnly",
      options,
      async (newOptions) => {
        let response;
        if (readOnly) {
          logger.info("[setReadOnly] Setting read-only status to ${readOnly}");
          response = await this.client.putLock(id.key, {
            ...newOptions,
            label: id.label,
            ...checkAndFormatIfAndIfNoneMatch(id, options),
          });
        } else {
          logger.info("[setReadOnly] Deleting read-only lock");
          response = await this.client.deleteLock(id.key, {
            ...newOptions,
            label: id.label,
            ...checkAndFormatIfAndIfNoneMatch(id, options),
          });
        }
        response = transformKeyValueResponse(response);
        assertResponse(response);
        return response;
      },
    );
  }

  /**
   * Adds an external synchronization token to ensure service requests receive up-to-date values.
   *
   * @param syncToken - The synchronization token value.
   */
  updateSyncToken(syncToken: string): void {
    this._syncTokens.addSyncTokenFromHeaderValue(syncToken);
  }

  /**
   * Begins creating a snapshot for Azure App Configuration service, fails if it
   * already exists.
   */
  beginCreateSnapshot(
    snapshot: SnapshotInfo,
    options: CreateSnapshotOptions = {},
  ): Promise<SimplePollerLike<OperationState<CreateSnapshotResponse>, CreateSnapshotResponse>> {
    return tracingClient.withSpan(
      `${AppConfigurationClient.name}.beginCreateSnapshot`,
      options,
      (updatedOptions) =>
        this.client.beginCreateSnapshot(snapshot.name, snapshot, { ...updatedOptions }),
    );
  }

  /**
   * Begins creating a snapshot for Azure App Configuration service, waits until it is done,
   * fails if it already exists.
   */
  beginCreateSnapshotAndWait(
    snapshot: SnapshotInfo,
    options: CreateSnapshotOptions = {},
  ): Promise<CreateSnapshotResponse> {
    return tracingClient.withSpan(
      `${AppConfigurationClient.name}.beginCreateSnapshotAndWait`,
      options,
      (updatedOptions) =>
        this.client.beginCreateSnapshotAndWait(snapshot.name, snapshot, { ...updatedOptions }),
    );
  }

  /**
   * Get a snapshot from Azure App Configuration service
   *
   * Example usage:
   * ```ts
   * const result = await client.getSnapshot("MySnapshot");
   * ```
   * @param name - The name of the snapshot.
   * @param options - Optional parameters for the request.
   */
  getSnapshot(name: string, options: GetSnapshotOptions = {}): Promise<GetSnapshotResponse> {
    return tracingClient.withSpan(
      "AppConfigurationClient.getSnapshot",
      options,
      async (updatedOptions) => {
        logger.info("[getSnapshot] Get a snapshot");
        const originalResponse = await this.client.getSnapshot(name, {
          ...updatedOptions,
        });
        const response = transformSnapshotResponse(originalResponse);
        assertResponse(response);
        return response;
      },
    );
  }

  /**
   * Recover an archived snapshot back to ready status
   *
   * Example usage:
   * ```ts
   * const result = await client.recoverSnapshot("MySnapshot");
   * ```
   * @param name - The name of the snapshot.
   * @param options - Optional parameters for the request.
   */
  recoverSnapshot(
    name: string,
    options: UpdateSnapshotOptions = {},
  ): Promise<UpdateSnapshotResponse> {
    return tracingClient.withSpan(
      "AppConfigurationClient.recoverSnapshot",
      options,
      async (updatedOptions) => {
        logger.info("[recoverSnapshot] Recover a snapshot");
        const originalResponse = await this.client.updateSnapshot(
          name,
          { status: "ready" },
          {
            ...updatedOptions,
            ...checkAndFormatIfAndIfNoneMatch(
              { etag: options.etag },
              { onlyIfUnchanged: true, ...options },
            ),
          },
        );
        const response = transformSnapshotResponse(originalResponse);
        assertResponse(response);
        return response;
      },
    );
  }
  /**
   * Archive a ready snapshot
   *
   * Example usage:
   * ```ts
   * const result = await client.archiveSnapshot({name: "MySnapshot"});
   * ```
   * @param name - The name of the snapshot.
   * @param options - Optional parameters for the request.
   */
  archiveSnapshot(
    name: string,
    options: UpdateSnapshotOptions = {},
  ): Promise<UpdateSnapshotResponse> {
    return tracingClient.withSpan(
      "AppConfigurationClient.archiveSnapshot",
      options,
      async (updatedOptions) => {
        logger.info("[archiveSnapshot] Archive a snapshot");
        const originalResponse = await this.client.updateSnapshot(
          name,
          { status: "archived" },
          {
            ...updatedOptions,
            ...checkAndFormatIfAndIfNoneMatch(
              { etag: options.etag },
              { onlyIfUnchanged: true, ...options },
            ),
          },
        );
        const response = transformSnapshotResponse(originalResponse);
        assertResponse(response);
        return response;
      },
    );
  }

  /**
   * List all snapshots from Azure App Configuration service
   *
   * Example usage:
   * ```ts
   * const result = await client.listSnapshots();
   * ```
   * @param options - Optional parameters for the request.
   */
  listSnapshots(
    options: ListSnapshotsOptions = {},
  ): PagedAsyncIterableIterator<ConfigurationSnapshot, ListSnapshotsPage, PageSettings> {
    const pagedResult: PagedResult<ListSnapshotsPage, PageSettings, string | undefined> = {
      firstPageLink: undefined,
      getPage: async (pageLink: string | undefined) => {
        const response = await this.sendSnapShotsRequest(options, pageLink);
        const currentResponse = {
          ...response,
          items: response.items != null ? response.items : [],
          continuationToken: response.nextLink
            ? extractAfterTokenFromNextLink(response.nextLink)
            : undefined,
        };
        return {
          page: currentResponse,
          nextPageLink: currentResponse.continuationToken,
        };
      },
      toElements: (page) => page.items,
    };
    return getPagedAsyncIterator(pagedResult);
  }

  private async sendSnapShotsRequest(
    options: ListSnapshotsOptions & PageSettings = {},
    pageLink: string | undefined,
  ): Promise<GetSnapshotsResponse & HttpResponseField<AppConfigurationGetSnapshotsHeaders>> {
    return tracingClient.withSpan(
      "AppConfigurationClient.listSnapshots",
      options,
      async (updatedOptions) => {
        const response = await this.client.getSnapshots({
          ...updatedOptions,
          ...formatSnapshotFiltersAndSelect(options),
          after: pageLink,
        });

        return response as GetSnapshotsResponse &
          HttpResponseField<AppConfigurationGetSnapshotsHeaders>;
      },
    );
  }
}
