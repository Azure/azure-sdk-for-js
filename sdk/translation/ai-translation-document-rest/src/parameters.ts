// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import {
  DocumentTranslateContent,
  StartTranslationDetails,
  FileFormatType,
} from "./models.js";

export interface DocumentTranslateHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DocumentTranslateBodyParam {
  /** Document Translate Request Content */
  body: DocumentTranslateContent;
}

export interface DocumentTranslateQueryParamProperties {
  /**
   * Specifies source language of the input document.
   * If this parameter isn't specified, automatic language detection is applied to determine the source language.
   * For example if the source document is written in English, then use sourceLanguage=en
   */
  sourceLanguage?: string;
  /**
   * Specifies the language of the output document.
   * The target language must be one of the supported languages included in the translation scope.
   * For example if you want to translate the document in German language, then use targetLanguage=de
   */
  targetLanguage: string;
  /**
   * A string specifying the category (domain) of the translation. This parameter is used to get translations
   * from a customized system built with Custom Translator. Add the Category ID from your Custom Translator
   * project details to this parameter to use your deployed customized system. Default value is: general.
   */
  category?: string;
  /**
   * Specifies that the service is allowed to fall back to a general system when a custom system doesn't exist.
   * Possible values are: true (default) or false.
   */
  allowFallback?: boolean;
}

export interface DocumentTranslateQueryParam {
  queryParameters: DocumentTranslateQueryParamProperties;
}

export interface DocumentTranslateHeaderParam {
  headers?: RawHttpHeadersInput & DocumentTranslateHeaders;
}

export interface DocumentTranslateMediaTypesParam {
  /** Content Type as multipart/form-data */
  contentType: "multipart/form-data";
}

export type DocumentTranslateParameters = DocumentTranslateQueryParam &
  DocumentTranslateHeaderParam &
  DocumentTranslateMediaTypesParam &
  DocumentTranslateBodyParam &
  RequestParameters;

export interface StartTranslationBodyParam {
  /** Translation job submission batch request */
  body: StartTranslationDetails;
}

export type StartTranslationParameters = StartTranslationBodyParam &
  RequestParameters;

export interface GetTranslationsStatusQueryParamProperties {
  /**
   * top indicates the total number of records the user wants to be returned across
   * all pages.
   *
   * Clients MAY use top and skip query parameters to
   * specify a number of results to return and an offset into the collection.
   * When
   * both top and skip are given by a client, the server SHOULD first apply skip
   * and then top on the collection.
   *
   * Note: If the server can't honor
   * top and/or skip, the server MUST return an error to the client informing
   * about it instead of just ignoring the query options.
   */
  top?: number;
  /**
   * skip indicates the number of records to skip from the list of records held by
   * the server based on the sorting method specified.  By default, we sort by
   * descending start time.
   *
   * Clients MAY use top and skip query
   * parameters to specify a number of results to return and an offset into the
   * collection.
   * When both top and skip are given by a client, the server SHOULD
   * first apply skip and then top on the collection.
   *
   * Note: If the
   * server can't honor top and/or skip, the server MUST return an error to the
   * client informing about it instead of just ignoring the query options.
   */
  skip?: number;
  /**
   * maxpagesize is the maximum items returned in a page.  If more items are
   * requested via top (or top is not specified and there are more items to be
   * returned), @nextLink will contain the link to the next page.
   *
   *
   * Clients MAY request server-driven paging with a specific page size by
   * specifying a maxpagesize preference. The server SHOULD honor this preference
   * if the specified page size is smaller than the server's default page size.
   */
  maxpagesize?: number;
  /** Ids to use in filtering */
  ids?: string[];
  /** Statuses to use in filtering */
  statuses?: string[];
  /** the start datetime to get items after */
  createdDateTimeUtcStart?: Date | string;
  /** the end datetime to get items before */
  createdDateTimeUtcEnd?: Date | string;
  /** the sorting query for the collection (ex: 'CreatedDateTimeUtc asc','CreatedDateTimeUtc desc') */
  orderby?: string[];
}

export interface GetTranslationsStatusQueryParam {
  queryParameters?: GetTranslationsStatusQueryParamProperties;
}

export type GetTranslationsStatusParameters = GetTranslationsStatusQueryParam &
  RequestParameters;
export type GetDocumentStatusParameters = RequestParameters;
export type GetTranslationStatusParameters = RequestParameters;
export type CancelTranslationParameters = RequestParameters;

export interface GetDocumentsStatusQueryParamProperties {
  /**
   * top indicates the total number of records the user wants to be returned across
   * all pages.
   *
   * Clients MAY use top and skip query parameters to
   * specify a number of results to return and an offset into the collection.
   * When
   * both top and skip are given by a client, the server SHOULD first apply skip
   * and then top on the collection.
   *
   * Note: If the server can't honor
   * top and/or skip, the server MUST return an error to the client informing
   * about it instead of just ignoring the query options.
   */
  top?: number;
  /**
   * skip indicates the number of records to skip from the list of records held by
   * the server based on the sorting method specified.  By default, we sort by
   * descending start time.
   *
   * Clients MAY use top and skip query
   * parameters to specify a number of results to return and an offset into the
   * collection.
   * When both top and skip are given by a client, the server SHOULD
   * first apply skip and then top on the collection.
   *
   * Note: If the
   * server can't honor top and/or skip, the server MUST return an error to the
   * client informing about it instead of just ignoring the query options.
   */
  skip?: number;
  /**
   * maxpagesize is the maximum items returned in a page.  If more items are
   * requested via top (or top is not specified and there are more items to be
   * returned), @nextLink will contain the link to the next page.
   *
   *
   * Clients MAY request server-driven paging with a specific page size by
   * specifying a maxpagesize preference. The server SHOULD honor this preference
   * if the specified page size is smaller than the server's default page size.
   */
  maxpagesize?: number;
  /** Ids to use in filtering */
  ids?: string[];
  /** Statuses to use in filtering */
  statuses?: string[];
  /** the start datetime to get items after */
  createdDateTimeUtcStart?: Date | string;
  /** the end datetime to get items before */
  createdDateTimeUtcEnd?: Date | string;
  /** the sorting query for the collection (ex: 'CreatedDateTimeUtc asc','CreatedDateTimeUtc desc') */
  orderby?: string[];
}

export interface GetDocumentsStatusQueryParam {
  queryParameters?: GetDocumentsStatusQueryParamProperties;
}

export type GetDocumentsStatusParameters = GetDocumentsStatusQueryParam &
  RequestParameters;

export interface GetSupportedFormatsQueryParamProperties {
  /**
   * the type of format like document or glossary
   *
   * Possible values: "document", "glossary"
   */
  type?: FileFormatType;
}

export interface GetSupportedFormatsQueryParam {
  queryParameters?: GetSupportedFormatsQueryParamProperties;
}

export type GetSupportedFormatsParameters = GetSupportedFormatsQueryParam &
  RequestParameters;
