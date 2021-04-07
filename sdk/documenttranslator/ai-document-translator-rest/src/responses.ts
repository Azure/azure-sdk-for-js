import {
  ErrorResponseV2,
  BatchStatusResponse,
  DocumentStatusDetail,
  BatchStatusDetail,
  DocumentStatusResponse,
  FileFormatListResult,
  StorageSourceListResult
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
export type SubmitBatchRequest202Response = HttpResponse & SubmitBatchRequest202Properties;

export interface SubmitBatchRequest202Properties {
  status: 202;
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
export type SubmitBatchRequest400Response = HttpResponse & SubmitBatchRequest400Properties;

export interface SubmitBatchRequest400Properties {
  status: 400;
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
export type SubmitBatchRequest401Response = HttpResponse & SubmitBatchRequest401Properties;

export interface SubmitBatchRequest401Properties {
  status: 401;
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
export type SubmitBatchRequest429Response = HttpResponse & SubmitBatchRequest429Properties;

export interface SubmitBatchRequest429Properties {
  status: 429;
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
export type SubmitBatchRequest500Response = HttpResponse & SubmitBatchRequest500Properties;

export interface SubmitBatchRequest500Properties {
  status: 500;
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
export type SubmitBatchRequest503Response = HttpResponse & SubmitBatchRequest503Properties;

export interface SubmitBatchRequest503Properties {
  status: 503;
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
export type GetOperations200Response = HttpResponse & GetOperations200Properties;

export interface GetOperations200Properties {
  status: 200;
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
export type GetOperations400Response = HttpResponse & GetOperations400Properties;

export interface GetOperations400Properties {
  status: 400;
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
export type GetOperations401Response = HttpResponse & GetOperations401Properties;

export interface GetOperations401Properties {
  status: 401;
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
export type GetOperations429Response = HttpResponse & GetOperations429Properties;

export interface GetOperations429Properties {
  status: 429;
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
export type GetOperations500Response = HttpResponse & GetOperations500Properties;

export interface GetOperations500Properties {
  status: 500;
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
export type GetOperations503Response = HttpResponse & GetOperations503Properties;

export interface GetOperations503Properties {
  status: 503;
  body: ErrorResponseV2;
}

export interface GetDocumentStatus200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
  /** The ETag response-header field provides the current value of the entity tag for the requested variant. Used with If-Match, If-None-Match and If-Range to implement optimistic concurrency control. */
  etag?: string;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export type GetDocumentStatus200Response = HttpResponse & GetDocumentStatus200Properties;

export interface GetDocumentStatus200Properties {
  status: 200;
  body: DocumentStatusDetail;
  headers: RawHttpHeaders & GetDocumentStatus200Headers;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export type GetDocumentStatus401Response = HttpResponse & GetDocumentStatus401Properties;

export interface GetDocumentStatus401Properties {
  status: 401;
  body: ErrorResponseV2;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export type GetDocumentStatus404Response = HttpResponse & GetDocumentStatus404Properties;

export interface GetDocumentStatus404Properties {
  status: 404;
  body: ErrorResponseV2;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export type GetDocumentStatus429Response = HttpResponse & GetDocumentStatus429Properties;

export interface GetDocumentStatus429Properties {
  status: 429;
  body: ErrorResponseV2;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export type GetDocumentStatus500Response = HttpResponse & GetDocumentStatus500Properties;

export interface GetDocumentStatus500Properties {
  status: 500;
  body: ErrorResponseV2;
}

/** Returns the translation status for a specific document based on the request Id and document Id. */
export type GetDocumentStatus503Response = HttpResponse & GetDocumentStatus503Properties;

export interface GetDocumentStatus503Properties {
  status: 503;
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
export type GetOperationStatus200Response = HttpResponse & GetOperationStatus200Properties;

export interface GetOperationStatus200Properties {
  status: 200;
  body: BatchStatusDetail;
  headers: RawHttpHeaders & GetOperationStatus200Headers;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export type GetOperationStatus401Response = HttpResponse & GetOperationStatus401Properties;

export interface GetOperationStatus401Properties {
  status: 401;
  body: ErrorResponseV2;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export type GetOperationStatus404Response = HttpResponse & GetOperationStatus404Properties;

export interface GetOperationStatus404Properties {
  status: 404;
  body: ErrorResponseV2;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export type GetOperationStatus429Response = HttpResponse & GetOperationStatus429Properties;

export interface GetOperationStatus429Properties {
  status: 429;
  body: ErrorResponseV2;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export type GetOperationStatus500Response = HttpResponse & GetOperationStatus500Properties;

export interface GetOperationStatus500Properties {
  status: 500;
  body: ErrorResponseV2;
}

/**
 * Returns the status for a document translation request.
 * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
 */
export type GetOperationStatus503Response = HttpResponse & GetOperationStatus503Properties;

export interface GetOperationStatus503Properties {
  status: 503;
  body: ErrorResponseV2;
}

/**
 * Cancel a currently processing or queued operation.
 * Cancel a currently processing or queued operation.
 * An operation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export type CancelOperation200Response = HttpResponse & CancelOperation200Properties;

export interface CancelOperation200Properties {
  status: 200;
  body: BatchStatusDetail;
}

/**
 * Cancel a currently processing or queued operation.
 * Cancel a currently processing or queued operation.
 * An operation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export type CancelOperation401Response = HttpResponse & CancelOperation401Properties;

export interface CancelOperation401Properties {
  status: 401;
  body: ErrorResponseV2;
}

/**
 * Cancel a currently processing or queued operation.
 * Cancel a currently processing or queued operation.
 * An operation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export type CancelOperation404Response = HttpResponse & CancelOperation404Properties;

export interface CancelOperation404Properties {
  status: 404;
  body: ErrorResponseV2;
}

/**
 * Cancel a currently processing or queued operation.
 * Cancel a currently processing or queued operation.
 * An operation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export type CancelOperation429Response = HttpResponse & CancelOperation429Properties;

export interface CancelOperation429Properties {
  status: 429;
  body: ErrorResponseV2;
}

/**
 * Cancel a currently processing or queued operation.
 * Cancel a currently processing or queued operation.
 * An operation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export type CancelOperation500Response = HttpResponse & CancelOperation500Properties;

export interface CancelOperation500Properties {
  status: 500;
  body: ErrorResponseV2;
}

/**
 * Cancel a currently processing or queued operation.
 * Cancel a currently processing or queued operation.
 * An operation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
 * All documents that have completed translation will not be cancelled and will be charged.
 * All pending documents will be cancelled if possible.
 */
export type CancelOperation503Response = HttpResponse & CancelOperation503Properties;

export interface CancelOperation503Properties {
  status: 503;
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
export type GetOperationDocumentsStatus200Response = HttpResponse &
  GetOperationDocumentsStatus200Properties;

export interface GetOperationDocumentsStatus200Properties {
  status: 200;
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
export type GetOperationDocumentsStatus400Response = HttpResponse &
  GetOperationDocumentsStatus400Properties;

export interface GetOperationDocumentsStatus400Properties {
  status: 400;
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
export type GetOperationDocumentsStatus401Response = HttpResponse &
  GetOperationDocumentsStatus401Properties;

export interface GetOperationDocumentsStatus401Properties {
  status: 401;
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
export type GetOperationDocumentsStatus404Response = HttpResponse &
  GetOperationDocumentsStatus404Properties;

export interface GetOperationDocumentsStatus404Properties {
  status: 404;
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
export type GetOperationDocumentsStatus429Response = HttpResponse &
  GetOperationDocumentsStatus429Properties;

export interface GetOperationDocumentsStatus429Properties {
  status: 429;
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
export type GetOperationDocumentsStatus500Response = HttpResponse &
  GetOperationDocumentsStatus500Properties;

export interface GetOperationDocumentsStatus500Properties {
  status: 500;
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
export type GetOperationDocumentsStatus503Response = HttpResponse &
  GetOperationDocumentsStatus503Properties;

export interface GetOperationDocumentsStatus503Properties {
  status: 503;
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
export type GetDocumentFormats200Response = HttpResponse & GetDocumentFormats200Properties;

export interface GetDocumentFormats200Properties {
  status: 200;
  body: FileFormatListResult;
  headers: RawHttpHeaders & GetDocumentFormats200Headers;
}

/**
 * The list of supported document formats supported by the Document Translation service.
 * The list includes the common file extension, as well as the content-type if using the upload API.
 */
export type GetDocumentFormats429Response = HttpResponse & GetDocumentFormats429Properties;

export interface GetDocumentFormats429Properties {
  status: 429;
  body: ErrorResponseV2;
}

/**
 * The list of supported document formats supported by the Document Translation service.
 * The list includes the common file extension, as well as the content-type if using the upload API.
 */
export type GetDocumentFormats500Response = HttpResponse & GetDocumentFormats500Properties;

export interface GetDocumentFormats500Properties {
  status: 500;
  body: ErrorResponseV2;
}

/**
 * The list of supported document formats supported by the Document Translation service.
 * The list includes the common file extension, as well as the content-type if using the upload API.
 */
export type GetDocumentFormats503Response = HttpResponse & GetDocumentFormats503Properties;

export interface GetDocumentFormats503Properties {
  status: 503;
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
export type GetGlossaryFormats200Response = HttpResponse & GetGlossaryFormats200Properties;

export interface GetGlossaryFormats200Properties {
  status: 200;
  body: FileFormatListResult;
  headers: RawHttpHeaders & GetGlossaryFormats200Headers;
}

/**
 * The list of supported glossary formats supported by the Document Translation service.
 * The list includes the common file extension used.
 */
export type GetGlossaryFormats429Response = HttpResponse & GetGlossaryFormats429Properties;

export interface GetGlossaryFormats429Properties {
  status: 429;
  body: ErrorResponseV2;
}

/**
 * The list of supported glossary formats supported by the Document Translation service.
 * The list includes the common file extension used.
 */
export type GetGlossaryFormats500Response = HttpResponse & GetGlossaryFormats500Properties;

export interface GetGlossaryFormats500Properties {
  status: 500;
  body: ErrorResponseV2;
}

/**
 * The list of supported glossary formats supported by the Document Translation service.
 * The list includes the common file extension used.
 */
export type GetGlossaryFormats503Response = HttpResponse & GetGlossaryFormats503Properties;

export interface GetGlossaryFormats503Properties {
  status: 503;
  body: ErrorResponseV2;
}

export interface GetDocumentStorageSource200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
}

/** Returns a list of storage sources/options supported by the Document Translation service. */
export type GetDocumentStorageSource200Response = HttpResponse &
  GetDocumentStorageSource200Properties;

export interface GetDocumentStorageSource200Properties {
  status: 200;
  body: StorageSourceListResult;
  headers: RawHttpHeaders & GetDocumentStorageSource200Headers;
}

/** Returns a list of storage sources/options supported by the Document Translation service. */
export type GetDocumentStorageSource429Response = HttpResponse &
  GetDocumentStorageSource429Properties;

export interface GetDocumentStorageSource429Properties {
  status: 429;
  body: ErrorResponseV2;
}

/** Returns a list of storage sources/options supported by the Document Translation service. */
export type GetDocumentStorageSource500Response = HttpResponse &
  GetDocumentStorageSource500Properties;

export interface GetDocumentStorageSource500Properties {
  status: 500;
  body: ErrorResponseV2;
}

/** Returns a list of storage sources/options supported by the Document Translation service. */
export type GetDocumentStorageSource503Response = HttpResponse &
  GetDocumentStorageSource503Properties;

export interface GetDocumentStorageSource503Properties {
  status: 503;
  body: ErrorResponseV2;
}
