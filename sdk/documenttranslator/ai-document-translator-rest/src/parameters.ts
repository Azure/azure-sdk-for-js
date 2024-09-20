// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RequestParameters } from "@azure-rest/core-client";
import { StartTranslationDetails } from "./models";

export interface StartTranslationBodyParam {
  body: StartTranslationDetails;
}

export type StartTranslationParameters = RequestParameters & StartTranslationBodyParam;

export interface GetTranslationsStatusQueryParamProperties {
  /**
   * $top indicates the total number of records the user wants to be returned across all pages.
   *
   * Clients MAY use $top and $skip query parameters to specify a number of results to return and an offset into the collection.
   * When both $top and $skip are given by a client, the server SHOULD first apply $skip and then $top on the collection.
   *
   * Note: If the server can't honor $top and/or $skip, the server MUST return an error to the client informing about it instead of just ignoring the query options.
   */
  $top?: number;
  /**
   * $skip indicates the number of records to skip from the list of records held by the server based on the sorting method specified.  By default, we sort by descending start time.
   *
   * Clients MAY use $top and $skip query parameters to specify a number of results to return and an offset into the collection.
   * When both $top and $skip are given by a client, the server SHOULD first apply $skip and then $top on the collection.
   *
   * Note: If the server can't honor $top and/or $skip, the server MUST return an error to the client informing about it instead of just ignoring the query options.
   */
  $skip?: number;
  /**
   * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), \@nextLink will contain the link to the next page.
   *
   * Clients MAY request server-driven paging with a specific page size by specifying a $maxpagesize preference. The server SHOULD honor this preference if the specified page size is smaller than the server's default page size.
   */
  $maxpagesize?: number;
  /** Ids to use in filtering */
  ids?: string[];
  /** Statuses to use in filtering */
  statuses?: string[];
  /** the start datetime to get items after */
  createdDateTimeUtcStart?: Date;
  /** the end datetime to get items before */
  createdDateTimeUtcEnd?: Date;
  /** the sorting query for the collection (ex: 'CreatedDateTimeUtc asc', 'CreatedDateTimeUtc desc') */
  $orderBy?: string[];
}

export interface GetTranslationsStatusQueryParam {
  queryParameters?: GetTranslationsStatusQueryParamProperties;
}

export type GetTranslationsStatusParameters = RequestParameters & GetTranslationsStatusQueryParam;
export type GetDocumentStatusParameters = RequestParameters;
export type GetTranslationStatusParameters = RequestParameters;
export type CancelTranslationParameters = RequestParameters;

export interface GetDocumentsStatusQueryParamProperties {
  /**
   * $top indicates the total number of records the user wants to be returned across all pages.
   *
   * Clients MAY use $top and $skip query parameters to specify a number of results to return and an offset into the collection.
   * When both $top and $skip are given by a client, the server SHOULD first apply $skip and then $top on the collection.
   *
   * Note: If the server can't honor $top and/or $skip, the server MUST return an error to the client informing about it instead of just ignoring the query options.
   */
  $top?: number;
  /**
   * $skip indicates the number of records to skip from the list of records held by the server based on the sorting method specified.  By default, we sort by descending start time.
   *
   * Clients MAY use $top and $skip query parameters to specify a number of results to return and an offset into the collection.
   * When both $top and $skip are given by a client, the server SHOULD first apply $skip and then $top on the collection.
   *
   * Note: If the server can't honor $top and/or $skip, the server MUST return an error to the client informing about it instead of just ignoring the query options.
   */
  $skip?: number;
  /**
   * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), \@nextLink will contain the link to the next page.
   *
   * Clients MAY request server-driven paging with a specific page size by specifying a $maxpagesize preference. The server SHOULD honor this preference if the specified page size is smaller than the server's default page size.
   */
  $maxpagesize?: number;
  /** Ids to use in filtering */
  ids?: string[];
  /** Statuses to use in filtering */
  statuses?: string[];
  /** the start datetime to get items after */
  createdDateTimeUtcStart?: Date;
  /** the end datetime to get items before */
  createdDateTimeUtcEnd?: Date;
  /** the sorting query for the collection (ex: 'CreatedDateTimeUtc asc', 'CreatedDateTimeUtc desc') */
  $orderBy?: string[];
}

export interface GetDocumentsStatusQueryParam {
  queryParameters?: GetDocumentsStatusQueryParamProperties;
}

export type GetDocumentsStatusParameters = RequestParameters & GetDocumentsStatusQueryParam;
export type GetSupportedDocumentFormatsParameters = RequestParameters;
export type GetSupportedGlossaryFormatsParameters = RequestParameters;
export type GetSupportedStorageSourcesParameters = RequestParameters;
