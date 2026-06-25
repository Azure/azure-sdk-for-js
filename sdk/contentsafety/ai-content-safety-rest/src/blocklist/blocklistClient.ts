// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlocklistContext, BlocklistClientOptionalParams, createBlocklist } from "./api/index.js";
import {
  AddOrUpdateTextBlocklistItemsOptions,
  TextBlocklistItem,
  AddOrUpdateTextBlocklistItemsResult,
  TextBlocklist,
  RemoveTextBlocklistItemsOptions,
} from "../models/models.js";
import { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import {
  removeBlocklistItems,
  listTextBlocklists,
  listTextBlocklistItems,
  getTextBlocklistItem,
  getTextBlocklist,
  deleteTextBlocklist,
  createOrUpdateTextBlocklist,
  addOrUpdateBlocklistItems,
} from "./api/operations.js";
import {
  RemoveBlocklistItemsOptionalParams,
  ListTextBlocklistsOptionalParams,
  ListTextBlocklistItemsOptionalParams,
  GetTextBlocklistItemOptionalParams,
  GetTextBlocklistOptionalParams,
  DeleteTextBlocklistOptionalParams,
  CreateOrUpdateTextBlocklistOptionalParams,
  AddOrUpdateBlocklistItemsOptionalParams,
} from "./api/options.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { BlocklistClientOptionalParams } from "./api/blocklistContext.js";

export class BlocklistClient {
  private _client: BlocklistContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: BlocklistClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createBlocklist(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Remove blocklistItems from a text blocklist. You can remove at most 100 BlocklistItems in one request. */
  removeBlocklistItems(
    blocklistName: string,
    body: RemoveTextBlocklistItemsOptions,
    options: RemoveBlocklistItemsOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return removeBlocklistItems(this._client, blocklistName, body, options);
  }

  /** Get all text blocklists details. */
  listTextBlocklists(
    options: ListTextBlocklistsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<TextBlocklist> {
    return listTextBlocklists(this._client, options);
  }

  /** Get all blocklistItems in a text blocklist. */
  listTextBlocklistItems(
    blocklistName: string,
    options: ListTextBlocklistItemsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<TextBlocklistItem> {
    return listTextBlocklistItems(this._client, blocklistName, options);
  }

  /** Get blocklistItem by blocklistName and blocklistItemId from a text blocklist. */
  getTextBlocklistItem(
    blocklistName: string,
    blocklistItemId: string,
    options: GetTextBlocklistItemOptionalParams = { requestOptions: {} },
  ): Promise<TextBlocklistItem> {
    return getTextBlocklistItem(this._client, blocklistName, blocklistItemId, options);
  }

  /** Returns text blocklist details. */
  getTextBlocklist(
    blocklistName: string,
    options: GetTextBlocklistOptionalParams = { requestOptions: {} },
  ): Promise<TextBlocklist> {
    return getTextBlocklist(this._client, blocklistName, options);
  }

  /** Deletes a text blocklist. */
  deleteTextBlocklist(
    blocklistName: string,
    options: DeleteTextBlocklistOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteTextBlocklist(this._client, blocklistName, options);
  }

  /** Updates a text blocklist. If the blocklistName does not exist, a new blocklist will be created. */
  createOrUpdateTextBlocklist(
    blocklistName: string,
    options: TextBlocklist,
    optionalParams: CreateOrUpdateTextBlocklistOptionalParams = { requestOptions: {} },
  ): Promise<TextBlocklist> {
    return createOrUpdateTextBlocklist(this._client, blocklistName, options, optionalParams);
  }

  /** Add or update blocklistItems to a text blocklist. You can add or update at most 100 blocklistItems in one request. */
  addOrUpdateBlocklistItems(
    blocklistName: string,
    body: AddOrUpdateTextBlocklistItemsOptions,
    options: AddOrUpdateBlocklistItemsOptionalParams = { requestOptions: {} },
  ): Promise<AddOrUpdateTextBlocklistItemsResult> {
    return addOrUpdateBlocklistItems(this._client, blocklistName, body, options);
  }
}
