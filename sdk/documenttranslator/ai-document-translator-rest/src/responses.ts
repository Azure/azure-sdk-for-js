// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  TranslationErrorResponse,
  TranslationsStatus,
  DocumentStatus,
  TranslationStatus,
  DocumentsStatus,
  SupportedFileFormats,
  SupportedStorageSources,
} from "./models";
import { HttpResponse } from "@azure-rest/core-client";
import { RawHttpHeaders } from "@azure/core-rest-pipeline";

export interface StartTranslation202Headers {
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
export interface StartTranslation202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & StartTranslation202Headers;
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
export interface StartTranslation400Response extends HttpResponse {
  status: "400";
  body: TranslationErrorResponse;
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
export interface StartTranslation401Response extends HttpResponse {
  status: "401";
  body: TranslationErrorResponse;
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
export interface StartTranslation429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponse;
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
export interface StartTranslation500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponse;
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
export interface StartTranslation503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponse;
}

export interface GetTranslationsStatus200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), \@nextLink will contain the link to the next page.
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
export interface GetTranslationsStatus200Response extends HttpResponse {
  status: "200";
  body: TranslationsStatus;
  headers: RawHttpHeaders & GetTranslationsStatus200Headers;
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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), \@nextLink will contain the link to the next page.
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
export interface GetTranslationsStatus400Response extends HttpResponse {
  status: "400";
  body: TranslationErrorResponse;
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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), \@nextLink will contain the link to the next page.
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
export interface GetTranslationsStatus401Response extends HttpResponse {
  status: "401";
  body: TranslationErrorResponse;
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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), \@nextLink will contain the link to the next page.
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
export interface GetTranslationsStatus429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponse;
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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), \@nextLink will contain the link to the next page.
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
export interface GetTranslationsStatus500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponse;
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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), \@nextLink will contain the link to the next page.
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
export interface GetTranslationsStatus503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponse;
}

export interface GetDocumentStatus200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
  /** The ETag response-header field provides the current value of the entity tag for the requested variant. Used with If-Match, If-None-Match and If-Range to implement optimistic concurrency control. */
  etag?: string;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export interface GetDocumentStatus200Response extends HttpResponse {
  status: "200";
  body: DocumentStatus;
  headers: RawHttpHeaders & GetDocumentStatus200Headers;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export interface GetDocumentStatus401Response extends HttpResponse {
  status: "401";
  body: TranslationErrorResponse;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export interface GetDocumentStatus404Response extends HttpResponse {
  status: "404";
  body: TranslationErrorResponse;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export interface GetDocumentStatus429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponse;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export interface GetDocumentStatus500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponse;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export interface GetDocumentStatus503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponse;
}

export interface GetTranslationStatus200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
  /** The ETag response-header field provides the current value of the entity tag for the requested variant. Used with If-Match, If-None-Match and If-Range to implement optimistic concurrency control. */
  etag?: string;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface GetTranslationStatus200Response extends HttpResponse {
  status: "200";
  body: TranslationStatus;
  headers: RawHttpHeaders & GetTranslationStatus200Headers;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface GetTranslationStatus401Response extends HttpResponse {
  status: "401";
  body: TranslationErrorResponse;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface GetTranslationStatus404Response extends HttpResponse {
  status: "404";
  body: TranslationErrorResponse;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface GetTranslationStatus429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponse;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface GetTranslationStatus500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponse;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface GetTranslationStatus503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponse;
}

/**
 * Cancel a currently processing or queued translation.
 * Cancel a currently processing or queued translation.
 * A translation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface CancelTranslation200Response extends HttpResponse {
  status: "200";
  body: TranslationStatus;
}

/**
 * Cancel a currently processing or queued translation.
 * Cancel a currently processing or queued translation.
 * A translation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface CancelTranslation401Response extends HttpResponse {
  status: "401";
  body: TranslationErrorResponse;
}

/**
 * Cancel a currently processing or queued translation.
 * Cancel a currently processing or queued translation.
 * A translation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface CancelTranslation404Response extends HttpResponse {
  status: "404";
  body: TranslationErrorResponse;
}

/**
 * Cancel a currently processing or queued translation.
 * Cancel a currently processing or queued translation.
 * A translation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface CancelTranslation429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponse;
}

/**
 * Cancel a currently processing or queued translation.
 * Cancel a currently processing or queued translation.
 * A translation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface CancelTranslation500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponse;
}

/**
 * Cancel a currently processing or queued translation.
 * Cancel a currently processing or queued translation.
 * A translation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface CancelTranslation503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponse;
}

export interface GetDocumentsStatus200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), \@nextLink will contain the link to the next page.
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
export interface GetDocumentsStatus200Response extends HttpResponse {
  status: "200";
  body: DocumentsStatus;
  headers: RawHttpHeaders & GetDocumentsStatus200Headers;
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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), \@nextLink will contain the link to the next page.
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
export interface GetDocumentsStatus400Response extends HttpResponse {
  status: "400";
  body: TranslationErrorResponse;
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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), \@nextLink will contain the link to the next page.
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
export interface GetDocumentsStatus401Response extends HttpResponse {
  status: "401";
  body: TranslationErrorResponse;
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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), \@nextLink will contain the link to the next page.
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
export interface GetDocumentsStatus404Response extends HttpResponse {
  status: "404";
  body: TranslationErrorResponse;
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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), \@nextLink will contain the link to the next page.
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
export interface GetDocumentsStatus429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponse;
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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), \@nextLink will contain the link to the next page.
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
export interface GetDocumentsStatus500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponse;
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
 * $maxpagesize is the maximum items returned in a page.  If more items are requested via $top (or $top is not specified and there are more items to be returned), \@nextLink will contain the link to the next page.
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
export interface GetDocumentsStatus503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponse;
}

export interface GetSupportedDocumentFormats200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
}

/**
 * The list of supported document formats supported by the Document Translation service.
 * The list includes the common file extension, as well as the content-type if using the upload API.
 */
export interface GetSupportedDocumentFormats200Response extends HttpResponse {
  status: "200";
  body: SupportedFileFormats;
  headers: RawHttpHeaders & GetSupportedDocumentFormats200Headers;
}

/**
 * The list of supported document formats supported by the Document Translation service.
 * The list includes the common file extension, as well as the content-type if using the upload API.
 */
export interface GetSupportedDocumentFormats429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponse;
}

/**
 * The list of supported document formats supported by the Document Translation service.
 * The list includes the common file extension, as well as the content-type if using the upload API.
 */
export interface GetSupportedDocumentFormats500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponse;
}

/**
 * The list of supported document formats supported by the Document Translation service.
 * The list includes the common file extension, as well as the content-type if using the upload API.
 */
export interface GetSupportedDocumentFormats503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponse;
}

export interface GetSupportedGlossaryFormats200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
}

/**
 * The list of supported glossary formats supported by the Document Translation service.
 * The list includes the common file extension used.
 */
export interface GetSupportedGlossaryFormats200Response extends HttpResponse {
  status: "200";
  body: SupportedFileFormats;
  headers: RawHttpHeaders & GetSupportedGlossaryFormats200Headers;
}

/**
 * The list of supported glossary formats supported by the Document Translation service.
 * The list includes the common file extension used.
 */
export interface GetSupportedGlossaryFormats429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponse;
}

/**
 * The list of supported glossary formats supported by the Document Translation service.
 * The list includes the common file extension used.
 */
export interface GetSupportedGlossaryFormats500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponse;
}

/**
 * The list of supported glossary formats supported by the Document Translation service.
 * The list includes the common file extension used.
 */
export interface GetSupportedGlossaryFormats503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponse;
}

export interface GetSupportedStorageSources200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
}

/** Returns a list of storage sources/options supported by the Document Translation service. */
export interface GetSupportedStorageSources200Response extends HttpResponse {
  status: "200";
  body: SupportedStorageSources;
  headers: RawHttpHeaders & GetSupportedStorageSources200Headers;
}

/** Returns a list of storage sources/options supported by the Document Translation service. */
export interface GetSupportedStorageSources429Response extends HttpResponse {
  status: "429";
  body: TranslationErrorResponse;
}

/** Returns a list of storage sources/options supported by the Document Translation service. */
export interface GetSupportedStorageSources500Response extends HttpResponse {
  status: "500";
  body: TranslationErrorResponse;
}

/** Returns a list of storage sources/options supported by the Document Translation service. */
export interface GetSupportedStorageSources503Response extends HttpResponse {
  status: "503";
  body: TranslationErrorResponse;
}
