// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AnalyzeTextParameters,
  AnalyzeImageParameters,
  GetTextBlocklistParameters,
  CreateOrUpdateTextBlocklistParameters,
  DeleteTextBlocklistParameters,
  ListTextBlocklistsParameters,
  AddOrUpdateBlocklistItemsParameters,
  RemoveBlocklistItemsParameters,
  GetTextBlocklistItemParameters,
  ListTextBlocklistItemsParameters,
} from "./parameters";
import {
  AnalyzeText200Response,
  AnalyzeTextDefaultResponse,
  AnalyzeImage200Response,
  AnalyzeImageDefaultResponse,
  GetTextBlocklist200Response,
  GetTextBlocklistDefaultResponse,
  CreateOrUpdateTextBlocklist200Response,
  CreateOrUpdateTextBlocklist201Response,
  CreateOrUpdateTextBlocklistDefaultResponse,
  DeleteTextBlocklist204Response,
  DeleteTextBlocklistDefaultResponse,
  ListTextBlocklists200Response,
  ListTextBlocklistsDefaultResponse,
  AddOrUpdateBlocklistItems200Response,
  AddOrUpdateBlocklistItemsDefaultResponse,
  RemoveBlocklistItems204Response,
  RemoveBlocklistItemsDefaultResponse,
  GetTextBlocklistItem200Response,
  GetTextBlocklistItemDefaultResponse,
  ListTextBlocklistItems200Response,
  ListTextBlocklistItemsDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface AnalyzeText {
  /** A synchronous API for the analysis of potentially harmful text content. Currently, it supports four categories: Hate, SelfHarm, Sexual, and Violence. */
  post(
    options: AnalyzeTextParameters
  ): StreamableMethod<AnalyzeText200Response | AnalyzeTextDefaultResponse>;
}

export interface AnalyzeImage {
  /** A synchronous API for the analysis of potentially harmful image content. Currently, it supports four categories: Hate, SelfHarm, Sexual, and Violence. */
  post(
    options: AnalyzeImageParameters
  ): StreamableMethod<AnalyzeImage200Response | AnalyzeImageDefaultResponse>;
}

export interface GetTextBlocklist {
  /** Returns text blocklist details. */
  get(
    options?: GetTextBlocklistParameters
  ): StreamableMethod<
    GetTextBlocklist200Response | GetTextBlocklistDefaultResponse
  >;
  /** Updates a text blocklist. If the blocklistName does not exist, a new blocklist will be created. */
  patch(
    options: CreateOrUpdateTextBlocklistParameters
  ): StreamableMethod<
    | CreateOrUpdateTextBlocklist200Response
    | CreateOrUpdateTextBlocklist201Response
    | CreateOrUpdateTextBlocklistDefaultResponse
  >;
  /** Deletes a text blocklist. */
  delete(
    options?: DeleteTextBlocklistParameters
  ): StreamableMethod<
    DeleteTextBlocklist204Response | DeleteTextBlocklistDefaultResponse
  >;
}

export interface ListTextBlocklists {
  /** Get all text blocklists details. */
  get(
    options?: ListTextBlocklistsParameters
  ): StreamableMethod<
    ListTextBlocklists200Response | ListTextBlocklistsDefaultResponse
  >;
}

export interface AddOrUpdateBlocklistItems {
  /** Add or update blocklistItems to a text blocklist. You can add or update at most 100 blocklistItems in one request. */
  post(
    options: AddOrUpdateBlocklistItemsParameters
  ): StreamableMethod<
    | AddOrUpdateBlocklistItems200Response
    | AddOrUpdateBlocklistItemsDefaultResponse
  >;
}

export interface RemoveBlocklistItems {
  /** Remove blocklistItems from a text blocklist. You can remove at most 100 BlocklistItems in one request. */
  post(
    options: RemoveBlocklistItemsParameters
  ): StreamableMethod<
    RemoveBlocklistItems204Response | RemoveBlocklistItemsDefaultResponse
  >;
}

export interface GetTextBlocklistItem {
  /** Get blocklistItem by blocklistName and blocklistItemId from a text blocklist. */
  get(
    options?: GetTextBlocklistItemParameters
  ): StreamableMethod<
    GetTextBlocklistItem200Response | GetTextBlocklistItemDefaultResponse
  >;
}

export interface ListTextBlocklistItems {
  /** Get all blocklistItems in a text blocklist. */
  get(
    options?: ListTextBlocklistItemsParameters
  ): StreamableMethod<
    ListTextBlocklistItems200Response | ListTextBlocklistItemsDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/text:analyze' has methods for the following verbs: post */
  (path: "/text:analyze"): AnalyzeText;
  /** Resource for '/image:analyze' has methods for the following verbs: post */
  (path: "/image:analyze"): AnalyzeImage;
  /** Resource for '/text/blocklists/\{blocklistName\}' has methods for the following verbs: get, patch, delete */
  (
    path: "/text/blocklists/{blocklistName}",
    blocklistName: string
  ): GetTextBlocklist;
  /** Resource for '/text/blocklists' has methods for the following verbs: get */
  (path: "/text/blocklists"): ListTextBlocklists;
  /** Resource for '/text/blocklists/\{blocklistName\}:addOrUpdateBlocklistItems' has methods for the following verbs: post */
  (
    path: "/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems",
    blocklistName: string
  ): AddOrUpdateBlocklistItems;
  /** Resource for '/text/blocklists/\{blocklistName\}:removeBlocklistItems' has methods for the following verbs: post */
  (
    path: "/text/blocklists/{blocklistName}:removeBlocklistItems",
    blocklistName: string
  ): RemoveBlocklistItems;
  /** Resource for '/text/blocklists/\{blocklistName\}/blocklistItems/\{blocklistItemId\}' has methods for the following verbs: get */
  (
    path: "/text/blocklists/{blocklistName}/blocklistItems/{blocklistItemId}",
    blocklistName: string,
    blocklistItemId: string
  ): GetTextBlocklistItem;
  /** Resource for '/text/blocklists/\{blocklistName\}/blocklistItems' has methods for the following verbs: get */
  (
    path: "/text/blocklists/{blocklistName}/blocklistItems",
    blocklistName: string
  ): ListTextBlocklistItems;
}

export type ContentSafetyClient = Client & {
  path: Routes;
};
