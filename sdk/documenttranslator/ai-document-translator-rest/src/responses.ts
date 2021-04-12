// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ErrorResponseV2,
  BatchStatusResponse,
  DocumentStatusDetail,
  BatchStatusDetail,
  DocumentStatusResponse,
  FileFormatListResult,
  StorageSourceListResult,
} from "./models";
import { HttpResponse } from "@azure-rest/core-client";
import { RawHttpHeaders } from "@azure/core-rest-pipeline";

export interface SubmitBatchRequest202Headers {
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
export interface SubmitBatchRequest202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & SubmitBatchRequest202Headers;
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
export interface SubmitBatchRequest400Response extends HttpResponse {
  status: "400";
  body: ErrorResponseV2;
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
export interface SubmitBatchRequest401Response extends HttpResponse {
  status: "401";
  body: ErrorResponseV2;
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
export interface SubmitBatchRequest429Response extends HttpResponse {
  status: "429";
  body: ErrorResponseV2;
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
export interface SubmitBatchRequest500Response extends HttpResponse {
  status: "500";
  body: ErrorResponseV2;
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
export interface SubmitBatchRequest503Response extends HttpResponse {
  status: "503";
  body: ErrorResponseV2;
}

export interface GetOperations200Headers {
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
export interface GetOperations200Response extends HttpResponse {
  status: "200";
  body: BatchStatusResponse;
  headers: RawHttpHeaders & GetOperations200Headers;
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
export interface GetOperations400Response extends HttpResponse {
  status: "400";
  body: ErrorResponseV2;
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
export interface GetOperations401Response extends HttpResponse {
  status: "401";
  body: ErrorResponseV2;
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
export interface GetOperations429Response extends HttpResponse {
  status: "429";
  body: ErrorResponseV2;
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
export interface GetOperations500Response extends HttpResponse {
  status: "500";
  body: ErrorResponseV2;
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
export interface GetOperations503Response extends HttpResponse {
  status: "503";
  body: ErrorResponseV2;
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
  body: DocumentStatusDetail;
  headers: RawHttpHeaders & GetDocumentStatus200Headers;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export interface GetDocumentStatus401Response extends HttpResponse {
  status: "401";
  body: ErrorResponseV2;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export interface GetDocumentStatus404Response extends HttpResponse {
  status: "404";
  body: ErrorResponseV2;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export interface GetDocumentStatus429Response extends HttpResponse {
  status: "429";
  body: ErrorResponseV2;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export interface GetDocumentStatus500Response extends HttpResponse {
  status: "500";
  body: ErrorResponseV2;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export interface GetDocumentStatus503Response extends HttpResponse {
  status: "503";
  body: ErrorResponseV2;
}

export interface GetOperationStatus200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
  /** The ETag response-header field provides the current value of the entity tag for the requested variant. Used with If-Match, If-None-Match and If-Range to implement optimistic concurrency control. */
  etag?: string;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface GetOperationStatus200Response extends HttpResponse {
  status: "200";
  body: BatchStatusDetail;
  headers: RawHttpHeaders & GetOperationStatus200Headers;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface GetOperationStatus401Response extends HttpResponse {
  status: "401";
  body: ErrorResponseV2;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface GetOperationStatus404Response extends HttpResponse {
  status: "404";
  body: ErrorResponseV2;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface GetOperationStatus429Response extends HttpResponse {
  status: "429";
  body: ErrorResponseV2;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface GetOperationStatus500Response extends HttpResponse {
  status: "500";
  body: ErrorResponseV2;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export interface GetOperationStatus503Response extends HttpResponse {
  status: "503";
  body: ErrorResponseV2;
}

/**
 * Cancel a currently processing or queued operation.
 * Cancel a currently processing or queued operation.
 * An operation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface CancelOperation200Response extends HttpResponse {
  status: "200";
  body: BatchStatusDetail;
}

/**
 * Cancel a currently processing or queued operation.
 * Cancel a currently processing or queued operation.
 * An operation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface CancelOperation401Response extends HttpResponse {
  status: "401";
  body: ErrorResponseV2;
}

/**
 * Cancel a currently processing or queued operation.
 * Cancel a currently processing or queued operation.
 * An operation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface CancelOperation404Response extends HttpResponse {
  status: "404";
  body: ErrorResponseV2;
}

/**
 * Cancel a currently processing or queued operation.
 * Cancel a currently processing or queued operation.
 * An operation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface CancelOperation429Response extends HttpResponse {
  status: "429";
  body: ErrorResponseV2;
}

/**
 * Cancel a currently processing or queued operation.
 * Cancel a currently processing or queued operation.
 * An operation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface CancelOperation500Response extends HttpResponse {
  status: "500";
  body: ErrorResponseV2;
}

/**
 * Cancel a currently processing or queued operation.
 * Cancel a currently processing or queued operation.
 * An operation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export interface CancelOperation503Response extends HttpResponse {
  status: "503";
  body: ErrorResponseV2;
}

export interface GetOperationDocumentsStatus200Headers {
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
export interface GetOperationDocumentsStatus200Response extends HttpResponse {
  status: "200";
  body: DocumentStatusResponse;
  headers: RawHttpHeaders & GetOperationDocumentsStatus200Headers;
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
export interface GetOperationDocumentsStatus400Response extends HttpResponse {
  status: "400";
  body: ErrorResponseV2;
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
export interface GetOperationDocumentsStatus401Response extends HttpResponse {
  status: "401";
  body: ErrorResponseV2;
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
export interface GetOperationDocumentsStatus404Response extends HttpResponse {
  status: "404";
  body: ErrorResponseV2;
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
export interface GetOperationDocumentsStatus429Response extends HttpResponse {
  status: "429";
  body: ErrorResponseV2;
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
export interface GetOperationDocumentsStatus500Response extends HttpResponse {
  status: "500";
  body: ErrorResponseV2;
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
export interface GetOperationDocumentsStatus503Response extends HttpResponse {
  status: "503";
  body: ErrorResponseV2;
}

export interface GetDocumentFormats200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
}

/**
 * The list of supported document formats supported by the Document Translation service.
 * The list includes the common file extension, as well as the content-type if using the upload API.
 */
export interface GetDocumentFormats200Response extends HttpResponse {
  status: "200";
  body: FileFormatListResult;
  headers: RawHttpHeaders & GetDocumentFormats200Headers;
}

/**
 * The list of supported document formats supported by the Document Translation service.
 * The list includes the common file extension, as well as the content-type if using the upload API.
 */
export interface GetDocumentFormats429Response extends HttpResponse {
  status: "429";
  body: ErrorResponseV2;
}

/**
 * The list of supported document formats supported by the Document Translation service.
 * The list includes the common file extension, as well as the content-type if using the upload API.
 */
export interface GetDocumentFormats500Response extends HttpResponse {
  status: "500";
  body: ErrorResponseV2;
}

/**
 * The list of supported document formats supported by the Document Translation service.
 * The list includes the common file extension, as well as the content-type if using the upload API.
 */
export interface GetDocumentFormats503Response extends HttpResponse {
  status: "503";
  body: ErrorResponseV2;
}

export interface GetGlossaryFormats200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
}

/**
 * The list of supported glossary formats supported by the Document Translation service.
 * The list includes the common file extension used.
 */
export interface GetGlossaryFormats200Response extends HttpResponse {
  status: "200";
  body: FileFormatListResult;
  headers: RawHttpHeaders & GetGlossaryFormats200Headers;
}

/**
 * The list of supported glossary formats supported by the Document Translation service.
 * The list includes the common file extension used.
 */
export interface GetGlossaryFormats429Response extends HttpResponse {
  status: "429";
  body: ErrorResponseV2;
}

/**
 * The list of supported glossary formats supported by the Document Translation service.
 * The list includes the common file extension used.
 */
export interface GetGlossaryFormats500Response extends HttpResponse {
  status: "500";
  body: ErrorResponseV2;
}

/**
 * The list of supported glossary formats supported by the Document Translation service.
 * The list includes the common file extension used.
 */
export interface GetGlossaryFormats503Response extends HttpResponse {
  status: "503";
  body: ErrorResponseV2;
}

export interface GetDocumentStorageSource200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
}

/** Returns a list of storage sources/options supported by the Document Translation service. */
export interface GetDocumentStorageSource200Response extends HttpResponse {
  status: "200";
  body: StorageSourceListResult;
  headers: RawHttpHeaders & GetDocumentStorageSource200Headers;
}

/** Returns a list of storage sources/options supported by the Document Translation service. */
export interface GetDocumentStorageSource429Response extends HttpResponse {
  status: "429";
  body: ErrorResponseV2;
}

/** Returns a list of storage sources/options supported by the Document Translation service. */
export interface GetDocumentStorageSource500Response extends HttpResponse {
  status: "500";
  body: ErrorResponseV2;
}

/** Returns a list of storage sources/options supported by the Document Translation service. */
export interface GetDocumentStorageSource503Response extends HttpResponse {
  status: "503";
  body: ErrorResponseV2;
}
