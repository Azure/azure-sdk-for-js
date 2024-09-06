// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DocumentTranslationStartTranslationParameters,
  DocumentTranslationGetTranslationsStatusParameters,
  DocumentTranslationGetDocumentStatusParameters,
  DocumentTranslationGetTranslationStatusParameters,
  DocumentTranslationCancelTranslationParameters,
  DocumentTranslationGetDocumentsStatusParameters,
  DocumentTranslationGetSupportedDocumentFormatsParameters,
  DocumentTranslationGetSupportedGlossaryFormatsParameters,
  DocumentTranslationGetSupportedStorageSourcesParameters,
} from "./parameters";
import {
  DocumentTranslationStartTranslation202Response,
  DocumentTranslationStartTranslation400Response,
  DocumentTranslationStartTranslation401Response,
  DocumentTranslationStartTranslation429Response,
  DocumentTranslationStartTranslation500Response,
  DocumentTranslationStartTranslation503Response,
  DocumentTranslationGetTranslationsStatus200Response,
  DocumentTranslationGetTranslationsStatus400Response,
  DocumentTranslationGetTranslationsStatus401Response,
  DocumentTranslationGetTranslationsStatus429Response,
  DocumentTranslationGetTranslationsStatus500Response,
  DocumentTranslationGetTranslationsStatus503Response,
  DocumentTranslationGetDocumentStatus200Response,
  DocumentTranslationGetDocumentStatus401Response,
  DocumentTranslationGetDocumentStatus404Response,
  DocumentTranslationGetDocumentStatus429Response,
  DocumentTranslationGetDocumentStatus500Response,
  DocumentTranslationGetDocumentStatus503Response,
  DocumentTranslationGetTranslationStatus200Response,
  DocumentTranslationGetTranslationStatus401Response,
  DocumentTranslationGetTranslationStatus404Response,
  DocumentTranslationGetTranslationStatus429Response,
  DocumentTranslationGetTranslationStatus500Response,
  DocumentTranslationGetTranslationStatus503Response,
  DocumentTranslationCancelTranslation200Response,
  DocumentTranslationCancelTranslation401Response,
  DocumentTranslationCancelTranslation404Response,
  DocumentTranslationCancelTranslation429Response,
  DocumentTranslationCancelTranslation500Response,
  DocumentTranslationCancelTranslation503Response,
  DocumentTranslationGetDocumentsStatus200Response,
  DocumentTranslationGetDocumentsStatus400Response,
  DocumentTranslationGetDocumentsStatus401Response,
  DocumentTranslationGetDocumentsStatus404Response,
  DocumentTranslationGetDocumentsStatus429Response,
  DocumentTranslationGetDocumentsStatus500Response,
  DocumentTranslationGetDocumentsStatus503Response,
  DocumentTranslationGetSupportedDocumentFormats200Response,
  DocumentTranslationGetSupportedDocumentFormats429Response,
  DocumentTranslationGetSupportedDocumentFormats500Response,
  DocumentTranslationGetSupportedDocumentFormats503Response,
  DocumentTranslationGetSupportedGlossaryFormats200Response,
  DocumentTranslationGetSupportedGlossaryFormats429Response,
  DocumentTranslationGetSupportedGlossaryFormats500Response,
  DocumentTranslationGetSupportedGlossaryFormats503Response,
  DocumentTranslationGetSupportedStorageSources200Response,
  DocumentTranslationGetSupportedStorageSources429Response,
  DocumentTranslationGetSupportedStorageSources500Response,
  DocumentTranslationGetSupportedStorageSources503Response,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface StartTranslation {
  /**
   * Use this API to submit a bulk (batch) translation request to the Document Translation service.
   * Each request can contain multiple documents and must contain a source and destination container for each document.
   *
   * The prefix and suffix filter (if supplied) are used to filter folders. The prefix is applied to the subpath after the container name.
   *
   * Glossaries / Translation memory can be included in the request and are applied by the service when the document is translated.
   *
   * If the glossary is invalid or unreachable during translation, an error is indicated in the document status.
   * If a file with the same name already exists at the destination, it will be overwritten. The targetUrl for each target language must be unique.
   */
  post(
    options: DocumentTranslationStartTranslationParameters,
  ): StreamableMethod<
    | DocumentTranslationStartTranslation202Response
    | DocumentTranslationStartTranslation400Response
    | DocumentTranslationStartTranslation401Response
    | DocumentTranslationStartTranslation429Response
    | DocumentTranslationStartTranslation500Response
    | DocumentTranslationStartTranslation503Response
  >;
  /**
   * Returns a list of batch requests submitted and the status for each request.
   * This list only contains batch requests submitted by the user (based on the resource).
   *
   * If the number of requests exceeds our paging limit, server-side paging is used. Paginated responses indicate a partial result and include a continuation token in the response.
   * The absence of a continuation token means that no additional pages are available.
   *
   * $top, $skip and $maxpagesize query parameters can be used to specify a number of results to return and an offset for the collection.
   *
   * $top indicates the total number of records the user wants to be returned across all pages.
   * $skip indicates the number of records to skip from the list of batches based on the sorting method specified.  By default, we sort by descending start time.
   * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), '@nextLink' will contain the link to the next page.
   *
   * $orderBy query parameter can be used to sort the returned list (ex "$orderBy=createdDateTimeUtc asc" or "$orderBy=createdDateTimeUtc desc").
   * The default sorting is descending by createdDateTimeUtc.
   * Some query parameters can be used to filter the returned list (ex: "status=Succeeded,Cancelled") will only return succeeded and cancelled operations.
   * createdDateTimeUtcStart and createdDateTimeUtcEnd can be used combined or separately to specify a range of datetime to filter the returned list by.
   * The supported filtering query parameters are (status, ids, createdDateTimeUtcStart, createdDateTimeUtcEnd).
   *
   * The server honors the values specified by the client. However, clients must be prepared to handle responses that contain a different page size or contain a continuation token.
   *
   * When both $top and $skip are included, the server should first apply $skip and then $top on the collection.
   * Note: If the server can't honor $top and/or $skip, the server must return an error to the client informing about it instead of just ignoring the query options.
   * This reduces the risk of the client making assumptions about the data returned.
   */
  get(
    options?: DocumentTranslationGetTranslationsStatusParameters,
  ): StreamableMethod<
    | DocumentTranslationGetTranslationsStatus200Response
    | DocumentTranslationGetTranslationsStatus400Response
    | DocumentTranslationGetTranslationsStatus401Response
    | DocumentTranslationGetTranslationsStatus429Response
    | DocumentTranslationGetTranslationsStatus500Response
    | DocumentTranslationGetTranslationsStatus503Response
  >;
}

export interface GetDocumentStatus {
  /** Returns the translation status for a specific document based on the request Id and document Id. */
  get(
    options?: DocumentTranslationGetDocumentStatusParameters,
  ): StreamableMethod<
    | DocumentTranslationGetDocumentStatus200Response
    | DocumentTranslationGetDocumentStatus401Response
    | DocumentTranslationGetDocumentStatus404Response
    | DocumentTranslationGetDocumentStatus429Response
    | DocumentTranslationGetDocumentStatus500Response
    | DocumentTranslationGetDocumentStatus503Response
  >;
}

export interface GetTranslationStatus {
  /**
   * Returns the status for a document translation request.
   * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
   */
  get(
    options?: DocumentTranslationGetTranslationStatusParameters,
  ): StreamableMethod<
    | DocumentTranslationGetTranslationStatus200Response
    | DocumentTranslationGetTranslationStatus401Response
    | DocumentTranslationGetTranslationStatus404Response
    | DocumentTranslationGetTranslationStatus429Response
    | DocumentTranslationGetTranslationStatus500Response
    | DocumentTranslationGetTranslationStatus503Response
  >;
  /**
   * Cancel a currently processing or queued translation.
   * Cancel a currently processing or queued translation.
   * A translation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
   * All documents that have completed translation will not be cancelled and will be charged.
   * All pending documents will be cancelled if possible.
   */
  delete(
    options?: DocumentTranslationCancelTranslationParameters,
  ): StreamableMethod<
    | DocumentTranslationCancelTranslation200Response
    | DocumentTranslationCancelTranslation401Response
    | DocumentTranslationCancelTranslation404Response
    | DocumentTranslationCancelTranslation429Response
    | DocumentTranslationCancelTranslation500Response
    | DocumentTranslationCancelTranslation503Response
  >;
}

export interface GetDocumentsStatus {
  /**
   * Returns the status for all documents in a batch document translation request.
   *
   * If the number of documents in the response exceeds our paging limit, server-side paging is used.
   * Paginated responses indicate a partial result and include a continuation token in the response. The absence of a continuation token means that no additional pages are available.
   *
   * $top, $skip and $maxpagesize query parameters can be used to specify a number of results to return and an offset for the collection.
   *
   * $top indicates the total number of records the user wants to be returned across all pages.
   * $skip indicates the number of records to skip from the list of document status held by the server based on the sorting method specified.  By default, we sort by descending start time.
   * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), '@nextLink' will contain the link to the next page.
   *
   * $orderBy query parameter can be used to sort the returned list (ex "$orderBy=createdDateTimeUtc asc" or "$orderBy=createdDateTimeUtc desc").
   * The default sorting is descending by createdDateTimeUtc.
   * Some query parameters can be used to filter the returned list (ex: "status=Succeeded,Cancelled") will only return succeeded and cancelled documents.
   * createdDateTimeUtcStart and createdDateTimeUtcEnd can be used combined or separately to specify a range of datetime to filter the returned list by.
   * The supported filtering query parameters are (status, ids, createdDateTimeUtcStart, createdDateTimeUtcEnd).
   *
   * When both $top and $skip are included, the server should first apply $skip and then $top on the collection.
   * Note: If the server can't honor $top and/or $skip, the server must return an error to the client informing about it instead of just ignoring the query options.
   * This reduces the risk of the client making assumptions about the data returned.
   */
  get(
    options?: DocumentTranslationGetDocumentsStatusParameters,
  ): StreamableMethod<
    | DocumentTranslationGetDocumentsStatus200Response
    | DocumentTranslationGetDocumentsStatus400Response
    | DocumentTranslationGetDocumentsStatus401Response
    | DocumentTranslationGetDocumentsStatus404Response
    | DocumentTranslationGetDocumentsStatus429Response
    | DocumentTranslationGetDocumentsStatus500Response
    | DocumentTranslationGetDocumentsStatus503Response
  >;
}

export interface GetSupportedDocumentFormats {
  /**
   * The list of supported document formats supported by the Document Translation service.
   * The list includes the common file extension, as well as the content-type if using the upload API.
   */
  get(
    options?: DocumentTranslationGetSupportedDocumentFormatsParameters,
  ): StreamableMethod<
    | DocumentTranslationGetSupportedDocumentFormats200Response
    | DocumentTranslationGetSupportedDocumentFormats429Response
    | DocumentTranslationGetSupportedDocumentFormats500Response
    | DocumentTranslationGetSupportedDocumentFormats503Response
  >;
}

export interface GetSupportedGlossaryFormats {
  /**
   * The list of supported glossary formats supported by the Document Translation service.
   * The list includes the common file extension used.
   */
  get(
    options?: DocumentTranslationGetSupportedGlossaryFormatsParameters,
  ): StreamableMethod<
    | DocumentTranslationGetSupportedGlossaryFormats200Response
    | DocumentTranslationGetSupportedGlossaryFormats429Response
    | DocumentTranslationGetSupportedGlossaryFormats500Response
    | DocumentTranslationGetSupportedGlossaryFormats503Response
  >;
}

export interface GetSupportedStorageSources {
  /** Returns a list of storage sources/options supported by the Document Translation service. */
  get(
    options?: DocumentTranslationGetSupportedStorageSourcesParameters,
  ): StreamableMethod<
    | DocumentTranslationGetSupportedStorageSources200Response
    | DocumentTranslationGetSupportedStorageSources429Response
    | DocumentTranslationGetSupportedStorageSources500Response
    | DocumentTranslationGetSupportedStorageSources503Response
  >;
}

export interface Routes {
  /** Resource for '/batches' has methods for the following verbs: post, get */
  (path: "/batches"): StartTranslation;
  /** Resource for '/batches/\{id\}/documents/\{documentId\}' has methods for the following verbs: get */
  (path: "/batches/{id}/documents/{documentId}", id: string, documentId: string): GetDocumentStatus;
  /** Resource for '/batches/\{id\}' has methods for the following verbs: get, delete */
  (path: "/batches/{id}", id: string): GetTranslationStatus;
  /** Resource for '/batches/\{id\}/documents' has methods for the following verbs: get */
  (path: "/batches/{id}/documents", id: string): GetDocumentsStatus;
  /** Resource for '/documents/formats' has methods for the following verbs: get */
  (path: "/documents/formats"): GetSupportedDocumentFormats;
  /** Resource for '/glossaries/formats' has methods for the following verbs: get */
  (path: "/glossaries/formats"): GetSupportedGlossaryFormats;
  /** Resource for '/storagesources' has methods for the following verbs: get */
  (path: "/storagesources"): GetSupportedStorageSources;
}

export type DocumentTranslatorClient = Client & {
  path: Routes;
};
