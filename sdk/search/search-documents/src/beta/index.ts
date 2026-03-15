// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Side-effect import that activates preview operations for `@azure/search-documents`.
 *
 * Usage:
 * ```ts snippet:BetaImportUsage
 * import { SearchIndexClient, AzureKeyCredential } from "@azure/search-documents";
 *
 * const client = new SearchIndexClient("<endpoint>", new AzureKeyCredential("<apiKey>"));
 * ```
 *
 * @remarks
 * This import must occur before creating any client instances so that the
 * preview API version is used.
 */

import { betaState } from "../serviceUtils.js";
import { SearchIndexClient } from "../searchIndexClient.js";
import type { SearchIndexClientOptions } from "../searchIndexClient.js";
import { KnowledgeRetrievalClient } from "../knowledgeRetrievalClient.js";
import type { SearchIndexClient as GeneratedClient } from "../searchIndex/searchIndexClient.js";
import * as utils from "../serviceUtils.js";
import { tracingClient } from "../tracing.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { KnowledgeBase } from "../knowledgeBaseModels.js";
import type {
  AliasIterator,
  CreateAliasOptions,
  CreateKnowledgeBaseOptions,
  CreateKnowledgeSourceOptions,
  CreateOrUpdateAliasOptions,
  CreateOrUpdateKnowledgeBaseOptions,
  CreateOrUpdateKnowledgeSourceOptions,
  DeleteAliasOptions,
  DeleteKnowledgeBaseOptions,
  DeleteKnowledgeSourceOptions,
  GetAliasOptions,
  GetIndexStatsSummaryOptions,
  GetKnowledgeBaseOptions,
  GetKnowledgeSourceOptions,
  GetKnowledgeSourceStatusOptions,
  IndexStatisticsSummaryIterator,
  KnowledgeBaseIterator,
  KnowledgeSource,
  KnowledgeSourceIterator,
  ListAliasesOptions,
  ListKnowledgeBasesOptions,
  ListKnowledgeSourcesOptions,
  SearchIndexAlias,
} from "../serviceModels.js";
import type { KnowledgeRetrievalClientOptions } from "../knowledgeRetrievalClient.js";
import type { KnowledgeSourceStatus } from "../models/azure/search/documents/knowledgeBases/index.js";
import type { SearchIndexPermissionFilterOption } from "../models/azure/search/documents/indexes/index.js";

// Activate the beta state so new clients use the preview API version
betaState.activated = true;

// ────────────────────────────────────────────────────────────────────────────
// Module augmentation — SearchIndexClient preview methods
// ────────────────────────────────────────────────────────────────────────────
declare module "../searchIndexClient.js" {
  interface SearchIndexClient {
    listAliases(options?: ListAliasesOptions): AliasIterator;
    createAlias(alias: SearchIndexAlias, options?: CreateAliasOptions): Promise<SearchIndexAlias>;
    createOrUpdateAlias(
      alias: SearchIndexAlias,
      options?: CreateOrUpdateAliasOptions,
    ): Promise<SearchIndexAlias>;
    deleteAlias(aliasName: string, options?: DeleteAliasOptions): Promise<void>;
    deleteAlias(alias: SearchIndexAlias, options?: DeleteAliasOptions): Promise<void>;
    getAlias(aliasName: string, options?: GetAliasOptions): Promise<SearchIndexAlias>;
    getIndexStatsSummary(options?: GetIndexStatsSummaryOptions): IndexStatisticsSummaryIterator;
    createKnowledgeBase(
      knowledgeBase: KnowledgeBase,
      options?: CreateKnowledgeBaseOptions,
    ): Promise<KnowledgeBase>;
    createOrUpdateKnowledgeBase(
      knowledgeBaseName: string,
      knowledgeBase: KnowledgeBase,
      options?: CreateOrUpdateKnowledgeBaseOptions,
    ): Promise<KnowledgeBase>;
    getKnowledgeBase(
      knowledgeBaseName: string,
      options?: GetKnowledgeBaseOptions,
    ): Promise<KnowledgeBase>;
    listKnowledgeBases(options?: ListKnowledgeBasesOptions): KnowledgeBaseIterator;
    deleteKnowledgeBase(
      knowledgeBaseName: string,
      options?: DeleteKnowledgeBaseOptions,
    ): Promise<void>;
    deleteKnowledgeBase(
      knowledgeBase: KnowledgeBase,
      options?: DeleteKnowledgeBaseOptions,
    ): Promise<void>;
    createOrUpdateKnowledgeSource(
      sourceName: string,
      knowledgeSource: KnowledgeSource,
      options?: CreateOrUpdateKnowledgeSourceOptions,
    ): Promise<KnowledgeSource>;
    deleteKnowledgeSource(
      sourceName: string,
      options?: DeleteKnowledgeSourceOptions,
    ): Promise<void>;
    deleteKnowledgeSource(
      source: KnowledgeSource,
      options?: DeleteKnowledgeSourceOptions,
    ): Promise<void>;
    getKnowledgeSource(
      sourceName: string,
      options?: GetKnowledgeSourceOptions,
    ): Promise<KnowledgeSource>;
    listKnowledgeSources(options?: ListKnowledgeSourcesOptions): KnowledgeSourceIterator;
    createKnowledgeSource(
      knowledgeSource: KnowledgeSource,
      options?: CreateKnowledgeSourceOptions,
    ): Promise<KnowledgeSource>;
    getKnowledgeSourceStatus(
      sourceName: string,
      options?: GetKnowledgeSourceStatusOptions,
    ): Promise<KnowledgeSourceStatus>;
    getKnowledgeRetrievalClient(
      knowledgeBaseName: string,
      options?: KnowledgeRetrievalClientOptions,
    ): KnowledgeRetrievalClient;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Module augmentation — SearchIndex preview properties
// ────────────────────────────────────────────────────────────────────────────
declare module "../serviceModels.js" {
  interface SearchIndex {
    permissionFilterOption?: SearchIndexPermissionFilterOption;
    purviewEnabled?: boolean;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Helper for accessing private members via prototype methods
// ────────────────────────────────────────────────────────────────────────────
type ClientInternals = {
  client: GeneratedClient;
  endpoint: string;
  credential: KeyCredential | TokenCredential;
  options: SearchIndexClientOptions;
};

function self(client: SearchIndexClient): ClientInternals {
  return client as unknown as ClientInternals;
}

// ────────────────────────────────────────────────────────────────────────────
// Prototype patching — Alias operations
// ────────────────────────────────────────────────────────────────────────────

SearchIndexClient.prototype.listAliases = function (
  this: SearchIndexClient,
  options: ListAliasesOptions = {},
): AliasIterator {
  const { client } = self(this);
  return client.listAliases(options);
};

SearchIndexClient.prototype.createAlias = function (
  this: SearchIndexClient,
  alias: SearchIndexAlias,
  options: CreateAliasOptions = {},
): Promise<SearchIndexAlias> {
  const { client } = self(this);
  return tracingClient.withSpan(
    "SearchIndexClient-createAlias",
    options,
    async (updatedOptions) => {
      return client.createAlias(alias, updatedOptions);
    },
  );
};

SearchIndexClient.prototype.createOrUpdateAlias = function (
  this: SearchIndexClient,
  alias: SearchIndexAlias,
  options: CreateOrUpdateAliasOptions = {},
): Promise<SearchIndexAlias> {
  const { client } = self(this);
  return tracingClient.withSpan(
    "SearchIndexClient-createOrUpdateAlias",
    options,
    async (updatedOptions) => {
      const etag = options.onlyIfUnchanged ? alias.etag : undefined;
      return client.createOrUpdateAlias(alias, alias.name, {
        ...updatedOptions,
        ifMatch: etag,
      });
    },
  );
};

SearchIndexClient.prototype.deleteAlias = function (
  this: SearchIndexClient,
  alias: string | SearchIndexAlias,
  options: DeleteAliasOptions = {},
): Promise<void> {
  const { client } = self(this);
  return tracingClient.withSpan(
    "SearchIndexClient-deleteAlias",
    options,
    async (updatedOptions) => {
      const aliasName: string = typeof alias === "string" ? alias : alias.name;
      const etag =
        typeof alias === "string" ? undefined : options.onlyIfUnchanged ? alias.etag : undefined;

      await client.deleteAlias(aliasName, {
        ...updatedOptions,
        ifMatch: etag,
      });
    },
  );
};

SearchIndexClient.prototype.getAlias = function (
  this: SearchIndexClient,
  aliasName: string,
  options: GetAliasOptions = {},
): Promise<SearchIndexAlias> {
  const { client } = self(this);
  return tracingClient.withSpan("SearchIndexClient-getAlias", options, async (updatedOptions) => {
    return client.getAlias(aliasName, updatedOptions);
  });
};

// ────────────────────────────────────────────────────────────────────────────
// Prototype patching — Index stats summary
// ────────────────────────────────────────────────────────────────────────────

SearchIndexClient.prototype.getIndexStatsSummary = function (
  this: SearchIndexClient,
  options: GetIndexStatsSummaryOptions = {},
): IndexStatisticsSummaryIterator {
  const { client } = self(this);
  return client.listIndexStatsSummary(options);
};

// ────────────────────────────────────────────────────────────────────────────
// Prototype patching — Knowledge Base operations
// ────────────────────────────────────────────────────────────────────────────

SearchIndexClient.prototype.createKnowledgeBase = function (
  this: SearchIndexClient,
  knowledgeBase: KnowledgeBase,
  options: CreateKnowledgeBaseOptions = {},
): Promise<KnowledgeBase> {
  const { client } = self(this);
  return tracingClient.withSpan(
    "SearchIndexClient-createKnowledgeBase",
    options,
    async (updatedOptions) => {
      const result = await client.createKnowledgeBase(
        utils.convertKnowledgeBaseToGenerated(knowledgeBase)!,
        updatedOptions,
      );
      return utils.convertKnowledgeBaseToPublic(result)!;
    },
  );
};

SearchIndexClient.prototype.createOrUpdateKnowledgeBase = function (
  this: SearchIndexClient,
  knowledgeBaseName: string,
  knowledgeBase: KnowledgeBase,
  options: CreateOrUpdateKnowledgeBaseOptions = {},
): Promise<KnowledgeBase> {
  const { client } = self(this);
  return tracingClient.withSpan(
    "SearchIndexClient-createOrUpdateKnowledgeBase",
    options,
    async (updatedOptions) => {
      const etag = options.onlyIfUnchanged ? knowledgeBase.etag : undefined;
      const result = await client.createOrUpdateKnowledgeBase(
        utils.convertKnowledgeBaseToGenerated(knowledgeBase)!,
        knowledgeBaseName,
        {
          ...updatedOptions,
          ifMatch: etag,
        },
      );
      return utils.convertKnowledgeBaseToPublic(result)!;
    },
  );
};

SearchIndexClient.prototype.getKnowledgeBase = function (
  this: SearchIndexClient,
  knowledgeBaseName: string,
  options: GetKnowledgeBaseOptions = {},
): Promise<KnowledgeBase> {
  const { client } = self(this);
  return tracingClient.withSpan(
    "SearchIndexClient-getKnowledgeBase",
    options,
    async (updatedOptions) => {
      const result = await client.getKnowledgeBase(knowledgeBaseName, updatedOptions);
      return utils.convertKnowledgeBaseToPublic(result);
    },
  );
};

SearchIndexClient.prototype.listKnowledgeBases = function (
  this: SearchIndexClient,
  options: ListKnowledgeBasesOptions = {},
): KnowledgeBaseIterator {
  const { client } = self(this);
  return utils.mapPagedAsyncIterable(
    client.listKnowledgeBases(options),
    utils.convertKnowledgeBaseToPublic,
  );
};

SearchIndexClient.prototype.deleteKnowledgeBase = function (
  this: SearchIndexClient,
  knowledgeBase: string | KnowledgeBase,
  options: DeleteKnowledgeBaseOptions = {},
): Promise<void> {
  const { client } = self(this);
  return tracingClient.withSpan(
    "SearchIndexClient-deleteKnowledgeBase",
    options,
    async (updatedOptions) => {
      const knowledgeBaseName =
        typeof knowledgeBase === "string" ? knowledgeBase : knowledgeBase.name;
      const etag =
        typeof knowledgeBase !== "string" && options.onlyIfUnchanged
          ? knowledgeBase.etag
          : undefined;

      const result = await client.deleteKnowledgeBase(knowledgeBaseName, {
        ...updatedOptions,
        ifMatch: etag,
      });
      return result;
    },
  );
};

// ────────────────────────────────────────────────────────────────────────────
// Prototype patching — Knowledge Source operations
// ────────────────────────────────────────────────────────────────────────────

SearchIndexClient.prototype.createOrUpdateKnowledgeSource = function (
  this: SearchIndexClient,
  sourceName: string,
  knowledgeSource: KnowledgeSource,
  options: CreateOrUpdateKnowledgeSourceOptions = {},
): Promise<KnowledgeSource> {
  const { client } = self(this);
  return tracingClient.withSpan(
    "SearchIndexClient-createOrUpdateKnowledgeSource",
    options,
    async (updatedOptions) => {
      const etag = options.onlyIfUnchanged ? knowledgeSource.etag : undefined;
      const result = await client.createOrUpdateKnowledgeSource(
        utils.convertKnowledgeSourceToGenerated(knowledgeSource)!,
        sourceName,
        {
          ...updatedOptions,
          ifMatch: etag,
        },
      );
      return utils.convertKnowledgeSourceToPublic(result)!;
    },
  );
};

SearchIndexClient.prototype.deleteKnowledgeSource = function (
  this: SearchIndexClient,
  source: string | KnowledgeSource,
  options: DeleteKnowledgeSourceOptions = {},
): Promise<void> {
  const { client } = self(this);
  return tracingClient.withSpan(
    "SearchIndexClient-deleteKnowledgeSource",
    options,
    async (updatedOptions) => {
      const sourceName = typeof source === "string" ? source : source.name;
      const etag = typeof source !== "string" && options.onlyIfUnchanged ? source.etag : undefined;

      return client.deleteKnowledgeSource(sourceName, { ...updatedOptions, ifMatch: etag });
    },
  );
};

SearchIndexClient.prototype.getKnowledgeSource = function (
  this: SearchIndexClient,
  sourceName: string,
  options: GetKnowledgeSourceOptions = {},
): Promise<KnowledgeSource> {
  const { client } = self(this);
  return tracingClient.withSpan(
    "SearchIndexClient-getKnowledgeSource",
    options,
    async (updatedOptions) => {
      const result = await client.getKnowledgeSource(sourceName, updatedOptions);
      return utils.convertKnowledgeSourceToPublic(result)!;
    },
  );
};

SearchIndexClient.prototype.listKnowledgeSources = function (
  this: SearchIndexClient,
  options: ListKnowledgeSourcesOptions = {},
): KnowledgeSourceIterator {
  const { client } = self(this);
  return utils.mapPagedAsyncIterable(
    client.listKnowledgeSources(options),
    (ks) => utils.convertKnowledgeSourceToPublic(ks)!,
  );
};

SearchIndexClient.prototype.createKnowledgeSource = function (
  this: SearchIndexClient,
  knowledgeSource: KnowledgeSource,
  options: CreateKnowledgeSourceOptions = {},
): Promise<KnowledgeSource> {
  const { client } = self(this);
  return tracingClient.withSpan(
    "SearchIndexClient-createKnowledgeSource",
    options,
    async (updatedOptions) => {
      const result = await client.createKnowledgeSource(
        utils.convertKnowledgeSourceToGenerated(knowledgeSource)!,
        updatedOptions,
      );
      return utils.convertKnowledgeSourceToPublic(result)!;
    },
  );
};

SearchIndexClient.prototype.getKnowledgeSourceStatus = function (
  this: SearchIndexClient,
  sourceName: string,
  options: GetKnowledgeSourceStatusOptions = {},
): Promise<KnowledgeSourceStatus> {
  const { client } = self(this);
  return tracingClient.withSpan(
    "SearchIndexClient-getKnowledgeSourceStatus",
    options,
    async (updatedOptions) => {
      return client.getKnowledgeSourceStatus(sourceName, updatedOptions);
    },
  );
};

// ────────────────────────────────────────────────────────────────────────────
// Prototype patching — Knowledge Retrieval Client factory
// ────────────────────────────────────────────────────────────────────────────

SearchIndexClient.prototype.getKnowledgeRetrievalClient = function (
  this: SearchIndexClient,
  knowledgeBaseName: string,
  options?: KnowledgeRetrievalClientOptions,
): KnowledgeRetrievalClient {
  const internals = self(this);
  return new KnowledgeRetrievalClient(
    internals.endpoint,
    knowledgeBaseName,
    internals.credential,
    options || internals.options,
  );
};
