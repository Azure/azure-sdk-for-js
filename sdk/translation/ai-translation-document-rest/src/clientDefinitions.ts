// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DocumentTranslateParameters,
  StartTranslationParameters,
  GetTranslationsStatusParameters,
  GetDocumentStatusParameters,
  GetTranslationStatusParameters,
  CancelTranslationParameters,
  GetDocumentsStatusParameters,
  GetSupportedFormatsParameters,
} from "./parameters.js";
import type {
  DocumentTranslate200Response,
  DocumentTranslateDefaultResponse,
  StartTranslation202Response,
  StartTranslationDefaultResponse,
  GetTranslationsStatus200Response,
  GetTranslationsStatusDefaultResponse,
  GetDocumentStatus200Response,
  GetDocumentStatusDefaultResponse,
  GetTranslationStatus200Response,
  GetTranslationStatusDefaultResponse,
  CancelTranslation200Response,
  CancelTranslationDefaultResponse,
  GetDocumentsStatus200Response,
  GetDocumentsStatusDefaultResponse,
  GetSupportedFormats200Response,
  GetSupportedFormatsDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface DocumentTranslate {
  /** Use this API to submit a single translation request to the Document Translation Service. */
  post(
    options: DocumentTranslateParameters,
  ): StreamableMethod<
    DocumentTranslate200Response | DocumentTranslateDefaultResponse
  >;
}

export interface StartTranslation {
  /**
   * Use this API to submit a bulk (batch) translation request to the Document
   * Translation service.
   * Each request can contain multiple documents and must
   * contain a source and destination container for each document.
   *
   * The
   * prefix and suffix filter (if supplied) are used to filter folders. The prefix
   * is applied to the subpath after the container name.
   *
   * Glossaries /
   * Translation memory can be included in the request and are applied by the
   * service when the document is translated.
   *
   * If the glossary is
   * invalid or unreachable during translation, an error is indicated in the
   * document status.
   * If a file with the same name already exists at the
   * destination, it will be overwritten. The targetUrl for each target language
   * must be unique.
   */
  post(
    options: StartTranslationParameters,
  ): StreamableMethod<
    StartTranslation202Response | StartTranslationDefaultResponse
  >;
  /**
   * Returns a list of batch requests submitted and the status for each
   * request.
   * This list only contains batch requests submitted by the user (based on
   * the resource).
   *
   * If the number of requests exceeds our paging limit,
   * server-side paging is used. Paginated responses indicate a partial result and
   * include a continuation token in the response.
   * The absence of a continuation
   * token means that no additional pages are available.
   *
   * top, skip
   * and maxpagesize query parameters can be used to specify a number of results to
   * return and an offset for the collection.
   *
   * top indicates the total
   * number of records the user wants to be returned across all pages.
   * skip
   * indicates the number of records to skip from the list of batches based on the
   * sorting method specified.  By default, we sort by descending start
   * time.
   * maxpagesize is the maximum items returned in a page.  If more items are
   * requested via top (or top is not specified and there are more items to be
   * returned), @nextLink will contain the link to the next page.
   *
   *
   * orderby query parameter can be used to sort the returned list (ex
   * "orderby=createdDateTimeUtc asc" or "orderby=createdDateTimeUtc
   * desc").
   * The default sorting is descending by createdDateTimeUtc.
   * Some query
   * parameters can be used to filter the returned list (ex:
   * "status=Succeeded,Cancelled") will only return succeeded and cancelled
   * operations.
   * createdDateTimeUtcStart and createdDateTimeUtcEnd can be used
   * combined or separately to specify a range of datetime to filter the returned
   * list by.
   * The supported filtering query parameters are (status, ids,
   * createdDateTimeUtcStart, createdDateTimeUtcEnd).
   *
   * The server honors
   * the values specified by the client. However, clients must be prepared to handle
   * responses that contain a different page size or contain a continuation token.
   *
   *
   * When both top and skip are included, the server should first apply
   * skip and then top on the collection.
   * Note: If the server can't honor top
   * and/or skip, the server must return an error to the client informing about it
   * instead of just ignoring the query options.
   * This reduces the risk of the client
   * making assumptions about the data returned.
   */
  get(
    options?: GetTranslationsStatusParameters,
  ): StreamableMethod<
    GetTranslationsStatus200Response | GetTranslationsStatusDefaultResponse
  >;
}

export interface GetDocumentStatus {
  /**
   * Returns the translation status for a specific document based on the request Id
   * and document Id.
   */
  get(
    options?: GetDocumentStatusParameters,
  ): StreamableMethod<
    GetDocumentStatus200Response | GetDocumentStatusDefaultResponse
  >;
}

export interface GetTranslationStatus {
  /**
   * Returns the status for a document translation request.
   * The status includes the
   * overall request status, as well as the status for documents that are being
   * translated as part of that request.
   */
  get(
    options?: GetTranslationStatusParameters,
  ): StreamableMethod<
    GetTranslationStatus200Response | GetTranslationStatusDefaultResponse
  >;
  /**
   * Cancel a currently processing or queued translation.
   * A translation will not be
   * cancelled if it is already completed or failed or cancelling. A bad request
   * will be returned.
   * All documents that have completed translation will not be
   * cancelled and will be charged.
   * All pending documents will be cancelled if
   * possible.
   */
  delete(
    options?: CancelTranslationParameters,
  ): StreamableMethod<
    CancelTranslation200Response | CancelTranslationDefaultResponse
  >;
}

export interface GetDocumentsStatus {
  /**
   * Returns the status for all documents in a batch document translation request.
   *
   *
   * If the number of documents in the response exceeds our paging limit,
   * server-side paging is used.
   * Paginated responses indicate a partial result and
   * include a continuation token in the response. The absence of a continuation
   * token means that no additional pages are available.
   *
   * top, skip
   * and maxpagesize query parameters can be used to specify a number of results to
   * return and an offset for the collection.
   *
   * top indicates the total
   * number of records the user wants to be returned across all pages.
   * skip
   * indicates the number of records to skip from the list of document status held
   * by the server based on the sorting method specified.  By default, we sort by
   * descending start time.
   * maxpagesize is the maximum items returned in a page.
   * If more items are requested via top (or top is not specified and there are
   * more items to be returned), @nextLink will contain the link to the next page.
   *
   *
   * orderby query parameter can be used to sort the returned list (ex
   * "orderby=createdDateTimeUtc asc" or "orderby=createdDateTimeUtc
   * desc").
   * The default sorting is descending by createdDateTimeUtc.
   * Some query
   * parameters can be used to filter the returned list (ex:
   * "status=Succeeded,Cancelled") will only return succeeded and cancelled
   * documents.
   * createdDateTimeUtcStart and createdDateTimeUtcEnd can be used
   * combined or separately to specify a range of datetime to filter the returned
   * list by.
   * The supported filtering query parameters are (status, ids,
   * createdDateTimeUtcStart, createdDateTimeUtcEnd).
   *
   * When both top
   * and skip are included, the server should first apply skip and then top on
   * the collection.
   * Note: If the server can't honor top and/or skip, the server
   * must return an error to the client informing about it instead of just ignoring
   * the query options.
   * This reduces the risk of the client making assumptions about
   * the data returned.
   */
  get(
    options?: GetDocumentsStatusParameters,
  ): StreamableMethod<
    GetDocumentsStatus200Response | GetDocumentsStatusDefaultResponse
  >;
}

export interface GetSupportedFormats {
  /**
   * The list of supported formats supported by the Document Translation
   * service.
   * The list includes the common file extension, as well as the
   * content-type if using the upload API.
   */
  get(
    options?: GetSupportedFormatsParameters,
  ): StreamableMethod<
    GetSupportedFormats200Response | GetSupportedFormatsDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/document:translate' has methods for the following verbs: post */
  (path: "/document:translate"): DocumentTranslate;
  /** Resource for '/document/batches' has methods for the following verbs: post, get */
  (path: "/document/batches"): StartTranslation;
  /** Resource for '/document/batches/\{id\}/documents/\{documentId\}' has methods for the following verbs: get */
  (
    path: "/document/batches/{id}/documents/{documentId}",
    id: string,
    documentId: string,
  ): GetDocumentStatus;
  /** Resource for '/document/batches/\{id\}' has methods for the following verbs: get, delete */
  (path: "/document/batches/{id}", id: string): GetTranslationStatus;
  /** Resource for '/document/batches/\{id\}/documents' has methods for the following verbs: get */
  (path: "/document/batches/{id}/documents", id: string): GetDocumentsStatus;
  /** Resource for '/document/formats' has methods for the following verbs: get */
  (path: "/document/formats"): GetSupportedFormats;
}

export type DocumentTranslationClient = Client & {
  path: Routes;
};
