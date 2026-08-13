// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// https://azure.github.io/azure-sdk/typescript_design.html#ts-config-lib
/// <reference lib="esnext.asynciterable" />

import type {
  AddFeatureFlagParam,
  AddFeatureFlagResponse,
  DeleteFeatureFlagOptions,
  DeleteFeatureFlagResponse,
  FeatureFlag,
  FeatureFlagClientOptions,
  FeatureFlagId,
  FeatureFlagParam,
  GetFeatureFlagOptions,
  GetFeatureFlagResponse,
  ListFeatureFlagRevisionsOptions,
  ListFeatureFlagRevisionsPage,
  ListFeatureFlagsOptions,
  ListFeatureFlagPage,
  ListLabelsOptions,
  ListLabelsPage,
  PageSettings,
  SetFeatureFlagParam,
  SetFeatureFlagOptions,
  SetFeatureFlagResponse,
  AddFeatureFlagOptions,
  SettingLabel,
} from "./models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { TokenCredential } from "@azure/core-auth";
import type { RestError } from "@azure/core-rest-pipeline";
import {
  checkAndFormatIfAndIfNoneMatch,
  formatFeatureFlagFieldsForSelect,
  toFeatureFlagCompatResponse,
} from "./internal/helpers.js";
import type { AppConfigurationClient as GeneratedAppConfigurationClient } from "./generated/appConfigurationClient.js";
import type { AppConfigurationContext } from "./generated/api/appConfigurationContext.js";
import type { FeatureFlag as GeneratedFeatureFlag } from "./generated/models/models.js";
import { createConfiguredGeneratedClient } from "./internal/createGeneratedClient.js";
import { listLabels } from "./internal/listLabels.js";
import { listFeatureFlags } from "./internal/listFeatureFlags.js";
import { listFeatureFlagRevisions } from "./internal/listFeatureFlagRevisions.js";
import { tracingClient } from "./internal/tracing.js";
import {
  _deleteFeatureFlagDeserialize,
  _deleteFeatureFlagSend,
  _getFeatureFlagDeserialize,
  _getFeatureFlagSend,
  _putFeatureFlagDeserialize,
  _putFeatureFlagSend,
} from "./generated/api/featureFlagClient/operations.js";

function attachRawResponse<T extends object>(value: T, rawResponse: unknown): T {
  const compatResponse = toFeatureFlagCompatResponse(rawResponse);
  const response = Object.assign(value, {
    syncToken: compatResponse.parsedHeaders.syncToken,
  });
  Object.defineProperty(response, "_response", {
    enumerable: false,
    value: compatResponse,
  });
  return response;
}

function toGeneratedFeatureFlag(featureFlag: FeatureFlagParam): GeneratedFeatureFlag {
  return featureFlag as unknown as GeneratedFeatureFlag;
}

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
  setFeatureFlag(
    featureFlag: SetFeatureFlagParam,
    options?: SetFeatureFlagOptions,
  ): Promise<SetFeatureFlagResponse>;
  /**
   * Adds or updates a feature flag using its required primitive fields.
   * @param name - The name of the feature flag.
   * @param enabled - Whether the feature flag is enabled.
   * @param label - The label that identifies the feature flag.
   * @param options - Optional parameters for the request.
   */
  setFeatureFlag(
    name: string,
    enabled: boolean,
    label?: string,
    options?: SetFeatureFlagOptions,
  ): Promise<SetFeatureFlagResponse>;
  setFeatureFlag(
    featureFlagOrName: SetFeatureFlagParam | string,
    enabledOrOptions: boolean | SetFeatureFlagOptions = {},
    label?: string,
    options: SetFeatureFlagOptions = {},
  ): Promise<SetFeatureFlagResponse> {
    const featureFlag: SetFeatureFlagParam =
      typeof featureFlagOrName === "string"
        ? { name: featureFlagOrName, enabled: enabledOrOptions as boolean, label }
        : featureFlagOrName;
    const operationOptions =
      typeof featureFlagOrName === "string" ? options : (enabledOrOptions as SetFeatureFlagOptions);
    return tracingClient.withSpan(
      "FeatureFlagClient.setFeatureFlag",
      operationOptions,
      async (updatedOptions) => {
        const { onlyIfUnchanged, ...restOptions } = updatedOptions;
        const { ifMatch } = checkAndFormatIfAndIfNoneMatch(
          { etag: featureFlag.etag },
          { onlyIfUnchanged },
        );
        const rawResponse = await _putFeatureFlagSend(this._context, featureFlag.name, {
          ...restOptions,
          entity: toGeneratedFeatureFlag(featureFlag),
          label: featureFlag.label,
          ifMatch,
          requestOptions: {
            ...restOptions.requestOptions,
            skipUrlEncoding: true,
          },
        });
        const response = await _putFeatureFlagDeserialize(rawResponse);
        return attachRawResponse(response, rawResponse) as SetFeatureFlagResponse;
      },
    );
  }

  /**
   * Adds a feature flag through the dedicated feature flag endpoint, failing if the
   * feature flag already exists.
   *
   * Example usage:
   * ```ts snippet:AddFeatureFlag
   * import { DefaultAzureCredential } from "@azure/identity";
   * import { FeatureFlagClient } from "@azure/app-configuration";
   *
   * const endpoint = "https://example.azconfig.io";
   * const credential = new DefaultAzureCredential();
   * const client = new FeatureFlagClient(endpoint, credential);
   *
   * const result = await client.addFeatureFlag({
   *   name: "MyFeatureFlag",
   *   enabled: true,
   * });
   * console.log(`Feature flag ${result.name} is enabled: ${result.enabled}`);
   * ```
   * @param featureFlag - The feature flag to add. Its `name` and `label` identify the resource.
   * @param options - Optional parameters for the request.
   */
  addFeatureFlag(
    featureFlag: AddFeatureFlagParam,
    options?: AddFeatureFlagOptions,
  ): Promise<AddFeatureFlagResponse>;
  /**
   * Adds a feature flag using its required primitive fields.
   * @param name - The name of the feature flag.
   * @param enabled - Whether the feature flag is enabled.
   * @param label - The label that identifies the feature flag.
   * @param options - Optional parameters for the request.
   */
  addFeatureFlag(
    name: string,
    enabled: boolean,
    label?: string,
    options?: AddFeatureFlagOptions,
  ): Promise<AddFeatureFlagResponse>;
  addFeatureFlag(
    featureFlagOrName: AddFeatureFlagParam | string,
    enabledOrOptions: boolean | AddFeatureFlagOptions = {},
    label?: string,
    options: AddFeatureFlagOptions = {},
  ): Promise<AddFeatureFlagResponse> {
    const featureFlag: AddFeatureFlagParam =
      typeof featureFlagOrName === "string"
        ? { name: featureFlagOrName, enabled: enabledOrOptions as boolean, label }
        : featureFlagOrName;
    const operationOptions =
      typeof featureFlagOrName === "string" ? options : (enabledOrOptions as AddFeatureFlagOptions);
    return tracingClient.withSpan(
      "FeatureFlagClient.addFeatureFlag",
      operationOptions,
      async (updatedOptions) => {
        try {
          const rawResponse = await _putFeatureFlagSend(this._context, featureFlag.name, {
            ...updatedOptions,
            entity: toGeneratedFeatureFlag(featureFlag),
            label: featureFlag.label,
            ifNoneMatch: "*",
            requestOptions: {
              ...updatedOptions.requestOptions,
              skipUrlEncoding: true,
            },
          });
          const response = await _putFeatureFlagDeserialize(rawResponse);
          return attachRawResponse(response, rawResponse) as AddFeatureFlagResponse;
        } catch (error) {
          const err = error as RestError;
          // Service does not return an error message. Raise a 412 error similar to addConfigurationSetting.
          if (err.statusCode === 412) {
            err.message = `Status 412: Feature flag was already present`;
          }
          throw err;
        }
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
   * const featureFlag = await client.getFeatureFlag({ name: "MyFeatureFlag" });
   * console.log(`Feature flag ${featureFlag.name} is enabled: ${featureFlag.enabled}`);
   * ```
   * @param id - The id of the feature flag to retrieve.
   * @param options - Optional parameters for the request.
   */
  getFeatureFlag(
    id: FeatureFlagId,
    options: GetFeatureFlagOptions = {},
  ): Promise<GetFeatureFlagResponse> {
    return tracingClient.withSpan(
      "FeatureFlagClient.getFeatureFlag",
      options,
      async (updatedOptions) => {
        const { acceptDateTime, fields, onlyIfChanged, ...restOptions } = updatedOptions;
        const { ifMatch, ifNoneMatch } = checkAndFormatIfAndIfNoneMatch(id, { onlyIfChanged });
        let rawResponse;
        try {
          rawResponse = await _getFeatureFlagSend(this._context, id.name, {
            ...restOptions,
            label: id.label,
            select: formatFeatureFlagFieldsForSelect(fields),
            acceptDatetime: acceptDateTime?.toISOString(),
            ifMatch,
            ifNoneMatch,
            requestOptions: {
              ...restOptions.requestOptions,
              skipUrlEncoding: true,
            },
          });
          const featureFlag = await _getFeatureFlagDeserialize(rawResponse);
          return attachRawResponse(
            { ...featureFlag, statusCode: 200 },
            rawResponse,
          ) as GetFeatureFlagResponse;
        } catch (error) {
          const err = error as RestError;
          // 304 only comes back if the user has passed `onlyIfChanged` in their request
          // _and_ the remote feature flag still has the same etag as what the user passed.
          if (err.statusCode === 304) {
            const response = {
              name: id.name,
              statusCode: 304,
            } as GetFeatureFlagResponse;
            return attachRawResponse(response, rawResponse ?? err.response!);
          }
          throw err;
        }
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
   * await client.deleteFeatureFlag({ name: "MyFeatureFlag" });
   * ```
   * @param id - The id of the feature flag to delete.
   * @param options - Optional parameters for the request.
   */
  deleteFeatureFlag(
    id: FeatureFlagId,
    options: DeleteFeatureFlagOptions = {},
  ): Promise<DeleteFeatureFlagResponse> {
    return tracingClient.withSpan(
      "FeatureFlagClient.deleteFeatureFlag",
      options,
      async (updatedOptions) => {
        const { onlyIfUnchanged, ...restOptions } = updatedOptions;
        const { ifMatch } = checkAndFormatIfAndIfNoneMatch(id, { onlyIfUnchanged });
        const rawResponse = await _deleteFeatureFlagSend(this._context, id.name, {
          ...restOptions,
          label: id.label,
          ifMatch,
          requestOptions: {
            ...restOptions.requestOptions,
            skipUrlEncoding: true,
          },
        });
        await _deleteFeatureFlagDeserialize(rawResponse);
        return attachRawResponse(
          { statusCode: Number(rawResponse.status) },
          rawResponse,
        ) as DeleteFeatureFlagResponse;
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
    const {
      nameFilter,
      labelFilter,
      tagsFilter,
      acceptDateTime,
      fields,
      pageEtags,
      ...restOptions
    } = options;
    return listFeatureFlags(
      this._context,
      "FeatureFlagClient.listFeatureFlags",
      {
        name: nameFilter,
        label: labelFilter,
        tags: tagsFilter,
        acceptDatetime: acceptDateTime?.toISOString(),
        select: formatFeatureFlagFieldsForSelect(fields),
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
    const { nameFilter, labelFilter, tagsFilter, acceptDateTime, fields, ...restOptions } = options;
    return listFeatureFlagRevisions(
      this._context,
      "FeatureFlagClient.listFeatureFlagRevisions",
      {
        name: nameFilter,
        label: labelFilter,
        tags: tagsFilter,
        select: formatFeatureFlagFieldsForSelect(fields),
      },
      acceptDateTime?.toISOString(),
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
