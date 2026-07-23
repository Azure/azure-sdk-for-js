// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// https://azure.github.io/azure-sdk/typescript_design.html#ts-config-lib
/// <reference lib="esnext.asynciterable" />

import type {
  DeleteFeatureFlagOptions,
  FeatureFlag,
  FeatureFlagClientOptions,
  GetFeatureFlagOptions,
  ListFeatureFlagRevisionsOptions,
  ListFeatureFlagRevisionsPage,
  ListFeatureFlagsOptions,
  ListFeatureFlagPage,
  ListLabelsOptions,
  ListLabelsPage,
  PageSettings,
  SetFeatureFlagOptions,
  SettingLabel,
} from "./models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { TokenCredential } from "@azure/core-auth";
import { checkAndFormatIfAndIfNoneMatch } from "./internal/helpers.js";
import type { AppConfigurationClient as GeneratedAppConfigurationClient } from "./generated/appConfigurationClient.js";
import type { AppConfigurationContext } from "./generated/api/appConfigurationContext.js";
import { createConfiguredGeneratedClient } from "./internal/createGeneratedClient.js";
import { listLabels } from "./internal/listLabels.js";
import { listFeatureFlags } from "./internal/listFeatureFlags.js";
import { listFeatureFlagRevisions } from "./internal/listFeatureFlagRevisions.js";
import { tracingClient } from "./internal/tracing.js";

/**
 * Client for managing feature flags through the dedicated feature flag endpoint
 * of the Azure App Configuration service.
 *
 * This requires the `2026-05-01-preview` API version or later.
 */
export class FeatureFlagClient {
  private client: GeneratedAppConfigurationClient;

  /**
   * Initializes a new instance of the FeatureFlagClient class.
   * @param connectionString - The connection string of the App Configuration service.
   * @param options - Options for the FeatureFlagClient.
   */
  constructor(connectionString: string, options?: FeatureFlagClientOptions);
  /**
   * Initializes a new instance of the FeatureFlagClient class using a TokenCredential.
   * @param endpoint - The endpoint of the App Configuration service (ex: https://sample.azconfig.io).
   * @param tokenCredential - An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the \@azure/identity package to create a credential that suits your needs.
   * @param options - Options for the FeatureFlagClient.
   */
  constructor(
    endpoint: string,
    tokenCredential: TokenCredential,
    options?: FeatureFlagClientOptions,
  );
  constructor(
    connectionStringOrEndpoint: string,
    tokenCredentialOrOptions?: TokenCredential | FeatureFlagClientOptions,
    options?: FeatureFlagClientOptions,
  ) {
    const { client } = createConfiguredGeneratedClient(
      connectionStringOrEndpoint,
      tokenCredentialOrOptions,
      options,
    );
    this.client = client;
  }

  /**
   * Adds or updates a feature flag through the dedicated feature flag endpoint.
   *
   * Example usage:
   * ```ts snippet:SetFeatureFlag
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { FeatureFlagClient } from "@azure/app-configuration";
   *
   * const endpoint = "https://example.azconfig.io";
   * const credential = new DefaultAzureCredential();
   * const client = new FeatureFlagClient(endpoint, credential);
   *
   * const result = await client.setFeatureFlag({
   *   name: "MyFeatureFlag",
   *   enabled: true,
   * });
   * console.log(`Feature flag ${result.name} is enabled: ${result.enabled}`);
   * ```
   * @param featureFlag - The feature flag to add or update. Its `name` and `label` identify the resource.
   * @param options - Optional parameters for the request.
   */
  setFeatureFlag(featureFlag: FeatureFlag, options: SetFeatureFlagOptions = {}): Promise<FeatureFlag> {
    return tracingClient.withSpan(
      "FeatureFlagClient.setFeatureFlag",
      options,
      async (updatedOptions) => {
        const { onlyIfUnchanged, ...restOptions } = updatedOptions;
        const { ifMatch } = checkAndFormatIfAndIfNoneMatch(
          { etag: featureFlag.etag },
          { onlyIfUnchanged },
        );
        return this.client.featureFlagClient.putFeatureFlag(featureFlag.name, {
          ...restOptions,
          entity: featureFlag,
          label: featureFlag.label,
          ifMatch,
          requestOptions: {
            ...restOptions.requestOptions,
            skipUrlEncoding: true,
          },
        });
      },
    );
  }

  /**
   * Get a feature flag through the dedicated feature flag endpoint.
   *
   * Example usage:
   * ```ts snippet:GetFeatureFlag
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { FeatureFlagClient } from "@azure/app-configuration";
   *
   * const endpoint = "https://example.azconfig.io";
   * const credential = new DefaultAzureCredential();
   * const client = new FeatureFlagClient(endpoint, credential);
   *
   * const featureFlag = await client.getFeatureFlag("MyFeatureFlag");
   * console.log(`Feature flag ${featureFlag.name} is enabled: ${featureFlag.enabled}`);
   * ```
   * @param name - The name of the feature flag to retrieve.
   * @param options - Optional parameters for the request.
   */
  getFeatureFlag(name: string, options: GetFeatureFlagOptions = {}): Promise<FeatureFlag> {
    return tracingClient.withSpan(
      "FeatureFlagClient.getFeatureFlag",
      options,
      async (updatedOptions) => {
        const { label, etag, acceptDateTime, fields, onlyIfChanged, ...restOptions } =
          updatedOptions;
        const { ifMatch, ifNoneMatch } = checkAndFormatIfAndIfNoneMatch(
          { etag },
          { onlyIfChanged },
        );
        return this.client.featureFlagClient.getFeatureFlag(name, {
          ...restOptions,
          label,
          select: fields,
          acceptDatetime: acceptDateTime?.toISOString(),
          ifMatch,
          ifNoneMatch,
          requestOptions: {
            ...restOptions.requestOptions,
            skipUrlEncoding: true,
          },
        });
      },
    );
  }

  /**
   * Delete a feature flag through the dedicated feature flag endpoint.
   *
   * Example usage:
   * ```ts snippet:DeleteFeatureFlag
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { FeatureFlagClient } from "@azure/app-configuration";
   *
   * const endpoint = "https://example.azconfig.io";
   * const credential = new DefaultAzureCredential();
   * const client = new FeatureFlagClient(endpoint, credential);
   *
   * await client.deleteFeatureFlag("MyFeatureFlag");
   * ```
   * @param name - The name of the feature flag to delete.
   * @param options - Optional parameters for the request.
   */
  deleteFeatureFlag(
    name: string,
    options: DeleteFeatureFlagOptions = {},
  ): Promise<FeatureFlag | undefined> {
    return tracingClient.withSpan(
      "FeatureFlagClient.deleteFeatureFlag",
      options,
      async (updatedOptions) => {
        const { label, etag, onlyIfUnchanged, ...restOptions } = updatedOptions;
        const { ifMatch } = checkAndFormatIfAndIfNoneMatch({ etag }, { onlyIfUnchanged });
        const response = await this.client.featureFlagClient.deleteFeatureFlag(name, {
          ...restOptions,
          label,
          ifMatch,
          requestOptions: {
            ...restOptions.requestOptions,
            skipUrlEncoding: true,
          },
        });
        return response || undefined;
      },
    );
  }

  /**
   * List feature flags through the dedicated feature flag endpoint.
   *
   * Example usage:
   * ```ts snippet:ListFeatureFlags
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { FeatureFlagClient } from "@azure/app-configuration";
   *
   * const endpoint = "https://example.azconfig.io";
   * const credential = new DefaultAzureCredential();
   * const client = new FeatureFlagClient(endpoint, credential);
   *
   * for await (const featureFlag of client.listFeatureFlags()) {
   *   console.log(`Feature flag: ${featureFlag.name}`);
   * }
   * ```
   *
   * To conditionally retrieve pages, pass a `pageEtags` array (one etag per page). Each etag is sent
   * as an `If-None-Match` header, and unchanged pages are returned as empty pages with their `etag`
   * preserved, mirroring `AppConfigurationClient.listConfigurationSettings`.
   * @param options - Optional parameters for the request.
   */
  listFeatureFlags(
    options: ListFeatureFlagsOptions = {},
  ): PagedAsyncIterableIterator<FeatureFlag, ListFeatureFlagPage, PageSettings> {
    const { nameFilter, labelFilter, tagsFilter, acceptDateTime, fields, pageEtags, ...restOptions } =
      options;
    return listFeatureFlags(
      this._context,
      "FeatureFlagClient.listFeatureFlags",
      {
        name: nameFilter,
        label: labelFilter,
        tags: tagsFilter,
        acceptDatetime: acceptDateTime?.toISOString(),
        select: fields,
      },
      pageEtags,
      restOptions,
    );
  }

  /**
   * List revisions of a feature flag through the dedicated feature flag endpoint.
   *
   * Example usage:
   * ```ts snippet:ListFeatureFlagRevisions
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { FeatureFlagClient } from "@azure/app-configuration";
   *
   * const endpoint = "https://example.azconfig.io";
   * const credential = new DefaultAzureCredential();
   * const client = new FeatureFlagClient(endpoint, credential);
   *
   * for await (const featureFlag of client.listFeatureFlagRevisions({
   *   nameFilter: "MyFeatureFlag",
   * })) {
   *   console.log(`Revision last modified: ${featureFlag.lastModified}`);
   * }
   * ```
   * @param options - Optional parameters for the request.
   */
  listFeatureFlagRevisions(
    options: ListFeatureFlagRevisionsOptions = {},
  ): PagedAsyncIterableIterator<FeatureFlag, ListFeatureFlagRevisionsPage, PageSettings> {
    const { nameFilter, labelFilter, tagsFilter, fields, ...restOptions } = options;
    return listFeatureFlagRevisions(
      this._context,
      "FeatureFlagClient.listFeatureFlagRevisions",
      {
        name: nameFilter,
        label: labelFilter,
        tags: tagsFilter,
        select: fields,
      },
      restOptions,
    );
  }

  /**
   * List the labels used by feature flags through the dedicated feature flag endpoint.
   *
   * Example usage:
   * ```ts snippet:ListFeatureFlagLabels
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { FeatureFlagClient } from "@azure/app-configuration";
   *
   * const endpoint = "https://example.azconfig.io";
   * const credential = new DefaultAzureCredential();
   * const client = new FeatureFlagClient(endpoint, credential);
   *
   * for await (const label of client.listLabels()) {
   *   console.log(`Found label: ${label.name}`);
   * }
   * ```
   * @param options - Optional parameters for the request.
   */
  listLabels(
    options: ListLabelsOptions = {},
  ): PagedAsyncIterableIterator<SettingLabel, ListLabelsPage, PageSettings> {
    return listLabels(this._context, "ff", "FeatureFlagClient.listLabels", options);
  }

  private get _context(): AppConfigurationContext {
    return (this.client as any)._client as AppConfigurationContext;
  }
}
