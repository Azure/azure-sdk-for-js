// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  TranslationErrorResponseOutput,
  TranslationsStatusOutput,
  DocumentStatusOutput,
  TranslationStatusOutput,
  DocumentsStatusOutput,
  SupportedFileFormatsOutput,
  SupportedStorageSourcesOutput,
} from "./outputModels";

export interface DocumentTranslationStartTranslation202Headers {
  /** Location of batch the operation */
  "operation-location"?: string;
}

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
export interface DocumentTranslationStartTranslation202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DocumentTranslationStartTranslation202Headers;
}

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
export interface DocumentTranslationStartTranslation400Response extends HttpResponse {
  status: "400";
  body: TranslationErrorResponseOutput;
}

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
export interface DocumentTranslationStartTranslation401Response extends HttpResponse {
  status: "401";
  body: TranslationErrorResponseOutput;
}

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
export interface DocumentTranslationStartTranslation429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponseOutput;
}

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
export interface DocumentTranslationStartTranslation500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponseOutput;
}

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
export interface DocumentTranslationStartTranslation503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponseOutput;
}

export interface DocumentTranslationGetTranslationsStatus200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: number;
  /** The ETag response-header field provides the current value of the entity tag for the requested variant. Used with If-Match, If-None-Match and If-Range to implement optimistic concurrency control. */
  etag?: string;
}

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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), @nextLink will contain the link to the next page.
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
export interface DocumentTranslationGetTranslationsStatus200Response extends HttpResponse {
  status: "200";
  body: TranslationsStatusOutput;
  headers: RawHttpHeaders & DocumentTranslationGetTranslationsStatus200Headers;
}

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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), @nextLink will contain the link to the next page.
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
export interface DocumentTranslationGetTranslationsStatus400Response extends HttpResponse {
  status: "400";
  body: TranslationErrorResponseOutput;
}

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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), @nextLink will contain the link to the next page.
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
export interface DocumentTranslationGetTranslationsStatus401Response extends HttpResponse {
  status: "401";
  body: TranslationErrorResponseOutput;
}

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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), @nextLink will contain the link to the next page.
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
export interface DocumentTranslationGetTranslationsStatus429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponseOutput;
}

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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), @nextLink will contain the link to the next page.
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
export interface DocumentTranslationGetTranslationsStatus500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponseOutput;
}

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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), @nextLink will contain the link to the next page.
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
export interface DocumentTranslationGetTranslationsStatus503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponseOutput;
}

export interface DocumentTranslationGetDocumentStatus200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: number;
  /** The ETag response-header field provides the current value of the entity tag for the requested variant. Used with If-Match, If-None-Match and If-Range to implement optimistic concurrency control. */
  etag?: string;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export interface DocumentTranslationGetDocumentStatus200Response extends HttpResponse {
  status: "200";
  body: DocumentStatusOutput;
  headers: RawHttpHeaders & DocumentTranslationGetDocumentStatus200Headers;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export interface DocumentTranslationGetDocumentStatus401Response extends HttpResponse {
  status: "401";
  body: TranslationErrorResponseOutput;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export interface DocumentTranslationGetDocumentStatus404Response extends HttpResponse {
  status: "404";
  body: TranslationErrorResponseOutput;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export interface DocumentTranslationGetDocumentStatus429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponseOutput;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export interface DocumentTranslationGetDocumentStatus500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponseOutput;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export interface DocumentTranslationGetDocumentStatus503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponseOutput;
}

export interface DocumentTranslationGetTranslationStatus200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: number;
  /** The ETag response-header field provides the current value of the entity tag for the requested variant. Used with If-Match, If-None-Match and If-Range to implement optimistic concurrency control. */
  etag?: string;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface DocumentTranslationGetTranslationStatus200Response extends HttpResponse {
  status: "200";
  body: TranslationStatusOutput;
  headers: RawHttpHeaders & DocumentTranslationGetTranslationStatus200Headers;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface DocumentTranslationGetTranslationStatus401Response extends HttpResponse {
  status: "401";
  body: TranslationErrorResponseOutput;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface DocumentTranslationGetTranslationStatus404Response extends HttpResponse {
  status: "404";
  body: TranslationErrorResponseOutput;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface DocumentTranslationGetTranslationStatus429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponseOutput;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface DocumentTranslationGetTranslationStatus500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponseOutput;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface DocumentTranslationGetTranslationStatus503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponseOutput;
}

/**
 * Cancel a currently processing or queued translation.
 * Cancel a currently processing or queued translation.
 * A translation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface DocumentTranslationCancelTranslation200Response extends HttpResponse {
  status: "200";
  body: TranslationStatusOutput;
}

/**
 * Cancel a currently processing or queued translation.
 * Cancel a currently processing or queued translation.
 * A translation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface DocumentTranslationCancelTranslation401Response extends HttpResponse {
  status: "401";
  body: TranslationErrorResponseOutput;
}

/**
 * Cancel a currently processing or queued translation.
 * Cancel a currently processing or queued translation.
 * A translation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface DocumentTranslationCancelTranslation404Response extends HttpResponse {
  status: "404";
  body: TranslationErrorResponseOutput;
}

/**
 * Cancel a currently processing or queued translation.
 * Cancel a currently processing or queued translation.
 * A translation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface DocumentTranslationCancelTranslation429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponseOutput;
}

/**
 * Cancel a currently processing or queued translation.
 * Cancel a currently processing or queued translation.
 * A translation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface DocumentTranslationCancelTranslation500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponseOutput;
}

/**
 * Cancel a currently processing or queued translation.
 * Cancel a currently processing or queued translation.
 * A translation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface DocumentTranslationCancelTranslation503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponseOutput;
}

export interface DocumentTranslationGetDocumentsStatus200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: number;
  /** The ETag response-header field provides the current value of the entity tag for the requested variant. Used with If-Match, If-None-Match and If-Range to implement optimistic concurrency control. */
  etag?: string;
}

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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), @nextLink will contain the link to the next page.
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
export interface DocumentTranslationGetDocumentsStatus200Response extends HttpResponse {
  status: "200";
  body: DocumentsStatusOutput;
  headers: RawHttpHeaders & DocumentTranslationGetDocumentsStatus200Headers;
}

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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), @nextLink will contain the link to the next page.
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
export interface DocumentTranslationGetDocumentsStatus400Response extends HttpResponse {
  status: "400";
  body: TranslationErrorResponseOutput;
}

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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), @nextLink will contain the link to the next page.
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
export interface DocumentTranslationGetDocumentsStatus401Response extends HttpResponse {
  status: "401";
  body: TranslationErrorResponseOutput;
}

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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), @nextLink will contain the link to the next page.
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
export interface DocumentTranslationGetDocumentsStatus404Response extends HttpResponse {
  status: "404";
  body: TranslationErrorResponseOutput;
}

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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), @nextLink will contain the link to the next page.
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
export interface DocumentTranslationGetDocumentsStatus429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponseOutput;
}

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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), @nextLink will contain the link to the next page.
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
export interface DocumentTranslationGetDocumentsStatus500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponseOutput;
}

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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), @nextLink will contain the link to the next page.
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
export interface DocumentTranslationGetDocumentsStatus503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponseOutput;
}

export interface DocumentTranslationGetSupportedDocumentFormats200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: number;
}

/**
 * The list of supported document formats supported by the Document Translation service.
 * The list includes the common file extension, as well as the content-type if using the upload API.
 */
export interface DocumentTranslationGetSupportedDocumentFormats200Response extends HttpResponse {
  status: "200";
  body: SupportedFileFormatsOutput;
  headers: RawHttpHeaders & DocumentTranslationGetSupportedDocumentFormats200Headers;
}

/**
 * The list of supported document formats supported by the Document Translation service.
 * The list includes the common file extension, as well as the content-type if using the upload API.
 */
export interface DocumentTranslationGetSupportedDocumentFormats429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponseOutput;
}

/**
 * The list of supported document formats supported by the Document Translation service.
 * The list includes the common file extension, as well as the content-type if using the upload API.
 */
export interface DocumentTranslationGetSupportedDocumentFormats500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponseOutput;
}

/**
 * The list of supported document formats supported by the Document Translation service.
 * The list includes the common file extension, as well as the content-type if using the upload API.
 */
export interface DocumentTranslationGetSupportedDocumentFormats503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponseOutput;
}

export interface DocumentTranslationGetSupportedGlossaryFormats200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: number;
}

/**
 * The list of supported glossary formats supported by the Document Translation service.
 * The list includes the common file extension used.
 */
export interface DocumentTranslationGetSupportedGlossaryFormats200Response extends HttpResponse {
  status: "200";
  body: SupportedFileFormatsOutput;
  headers: RawHttpHeaders & DocumentTranslationGetSupportedGlossaryFormats200Headers;
}

/**
 * The list of supported glossary formats supported by the Document Translation service.
 * The list includes the common file extension used.
 */
export interface DocumentTranslationGetSupportedGlossaryFormats429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponseOutput;
}

/**
 * The list of supported glossary formats supported by the Document Translation service.
 * The list includes the common file extension used.
 */
export interface DocumentTranslationGetSupportedGlossaryFormats500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponseOutput;
}

/**
 * The list of supported glossary formats supported by the Document Translation service.
 * The list includes the common file extension used.
 */
export interface DocumentTranslationGetSupportedGlossaryFormats503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponseOutput;
}

export interface DocumentTranslationGetSupportedStorageSources200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: number;
}

/** Returns a list of storage sources/options supported by the Document Translation service. */
export interface DocumentTranslationGetSupportedStorageSources200Response extends HttpResponse {
  status: "200";
  body: SupportedStorageSourcesOutput;
  headers: RawHttpHeaders & DocumentTranslationGetSupportedStorageSources200Headers;
}

/** Returns a list of storage sources/options supported by the Document Translation service. */
export interface DocumentTranslationGetSupportedStorageSources429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponseOutput;
}

/** Returns a list of storage sources/options supported by the Document Translation service. */
export interface DocumentTranslationGetSupportedStorageSources500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponseOutput;
}

/** Returns a list of storage sources/options supported by the Document Translation service. */
export interface DocumentTranslationGetSupportedStorageSources503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponseOutput;
}
