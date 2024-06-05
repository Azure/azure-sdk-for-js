/// <reference types="node" />

import { Client } from '@azure-rest/core-client';
import { ClientOptions } from '@azure-rest/core-client';
import { createFile } from '@azure/core-rest-pipeline';
import { createFileFromStream } from '@azure/core-rest-pipeline';
import { CreateFileFromStreamOptions } from '@azure/core-rest-pipeline';
import { CreateFileOptions } from '@azure/core-rest-pipeline';
import { CreateHttpPollerOptions } from '@azure/core-lro';
import { ErrorResponse } from '@azure-rest/core-client';
import { HttpResponse } from '@azure-rest/core-client';
import { KeyCredential } from '@azure/core-auth';
import { OperationState } from '@azure/core-lro';
import { PagedAsyncIterableIterator } from '@azure/core-paging';
import { PathUncheckedResponse } from '@azure-rest/core-client';
import { RawHttpHeaders } from '@azure/core-rest-pipeline';
import { RawHttpHeadersInput } from '@azure/core-rest-pipeline';
import { RequestParameters } from '@azure-rest/core-client';
import { SimplePollerLike } from '@azure/core-lro';
import { StreamableMethod } from '@azure-rest/core-client';
import { TokenCredential } from '@azure/core-auth';

/** Definition for the input batch translation request */
export declare interface BatchRequest {
    /** Source of the input documents */
    source: SourceInput;
    /** Location of the destination for the output */
    targets: Array<TargetInput>;
    /** Storage type of the input documents source string */
    storageType?: StorageInputType;
}

/** The request has succeeded. */
export declare interface CancelTranslation200Response extends HttpResponse {
    status: "200";
    body: TranslationStatusOutput;
}

export declare interface CancelTranslationDefaultHeaders {
    /** String error code indicating what went wrong. */
    "x-ms-error-code"?: string;
}

export declare interface CancelTranslationDefaultResponse extends HttpResponse {
    status: string;
    body: ErrorResponse;
    headers: RawHttpHeaders & CancelTranslationDefaultHeaders;
}

export declare type CancelTranslationParameters = RequestParameters;

/**
 * Initialize a new instance of `DocumentTranslationClient`
 * @param endpointParam - Supported document Translation endpoint, protocol and hostname, for example: https://{TranslatorResourceName}.cognitiveservices.azure.com/translator.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
declare function createClient(endpointParam: string, credentials: TokenCredential | KeyCredential, options?: ClientOptions): DocumentTranslationClient;
export default createClient;

export { createFile }

export { createFileFromStream }

export { CreateFileFromStreamOptions }

export { CreateFileOptions }

/** Document filter */
export declare interface DocumentFilter {
    /**
     * A case-sensitive prefix string to filter documents in the source path for
     * translation.
     * For example, when using a Azure storage blob Uri, use the prefix
     * to restrict sub folders for translation.
     */
    prefix?: string;
    /**
     * A case-sensitive suffix string to filter documents in the source path for
     * translation.
     * This is most often use for file extensions
     */
    suffix?: string;
}

/** Documents Status Response */
export declare interface DocumentsStatusOutput {
    /** The detail status of individual documents */
    value: Array<DocumentStatusOutput>;
    /** Url for the next page.  Null if no more pages available */
    nextLink?: string;
}

/** Document Status Response */
export declare interface DocumentStatusOutput {
    /** Location of the document or folder */
    path?: string;
    /** Location of the source document */
    sourcePath: string;
    /** Operation created date time */
    createdDateTimeUtc: string;
    /** Date time in which the operation's status has been updated */
    lastActionDateTimeUtc: string;
    /** List of possible statuses for job or document */
    status: StatusOutput;
    /** To language */
    to: string;
    /**
     * This contains an outer error with error code, message, details, target and an
     * inner error with more descriptive details.
     */
    error?: TranslationErrorOutput;
    /** Progress of the translation if available */
    progress: number;
    /** Document Id */
    id: string;
    /** Character charged by the API */
    characterCharged?: number;
}

export declare interface DocumentTranslate {
    /** Use this API to submit a single translation request to the Document Translation Service. */
    post(options: DocumentTranslateParameters): StreamableMethod<DocumentTranslate200Response | DocumentTranslateDefaultResponse>;
}

export declare interface DocumentTranslate200Headers {
    /** An opaque, globally-unique, client-generated string identifier for the request. */
    "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export declare interface DocumentTranslate200Response extends HttpResponse {
    status: "200";
    /** Value may contain any sequence of octets */
    body: Uint8Array;
    headers: RawHttpHeaders & DocumentTranslate200Headers;
}

export declare interface DocumentTranslateBodyParam {
    body?: DocumentTranslateContent;
}

/** Document Translate Request Content */
export declare interface DocumentTranslateContent {
    /**
     * Document to be translated in the form
     *
     * NOTE: The following type 'File' is part of WebAPI and available since Node 20. If your Node version is lower than Node 20.
     * You could leverage our helpers 'createFile' or 'createFileFromStream' to create a File object. They could help you specify filename, type, and others.
     */
    document: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream | File;
    /**
     * Glossary-translation memory will be used during translation in the form.
     *
     * NOTE: The following type 'File' is part of WebAPI and available since Node 20. If your Node version is lower than Node 20.
     * You could leverage our helpers 'createFile' or 'createFileFromStream' to create a File object. They could help you specify filename, type, and others.
     */
    glossary?: (string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream | File)[];
}

export declare interface DocumentTranslateDefaultHeaders {
    /** String error code indicating what went wrong. */
    "x-ms-error-code"?: string;
}

export declare interface DocumentTranslateDefaultResponse extends HttpResponse {
    status: string;
    body: ErrorResponse;
    headers: RawHttpHeaders & DocumentTranslateDefaultHeaders;
}

export declare interface DocumentTranslateHeaderParam {
    headers?: RawHttpHeadersInput & DocumentTranslateHeaders;
}

export declare interface DocumentTranslateHeaders {
    /** An opaque, globally-unique, client-generated string identifier for the request. */
    "x-ms-client-request-id"?: string;
}

export declare interface DocumentTranslateMediaTypesParam {
    /** Content Type as multipart/form-data */
    contentType: "multipart/form-data";
}

export declare type DocumentTranslateParameters = DocumentTranslateQueryParam & DocumentTranslateHeaderParam & DocumentTranslateMediaTypesParam & DocumentTranslateBodyParam & RequestParameters;

export declare interface DocumentTranslateQueryParam {
    queryParameters: DocumentTranslateQueryParamProperties;
}

export declare interface DocumentTranslateQueryParamProperties {
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

export declare type DocumentTranslationClient = Client & {
    path: Routes;
};

/** File Format */
export declare interface FileFormatOutput {
    /** Name of the format */
    format: string;
    /** Supported file extension for this format */
    fileExtensions: string[];
    /** Supported Content-Types for this format */
    contentTypes: string[];
    /** Default version if none is specified */
    defaultVersion?: string;
    /** Supported Version */
    versions?: string[];
    /** Supported Type for this format */
    type?: string;
}

/** Alias for FileFormatType */
export declare type FileFormatType = "document" | "glossary" | string;

/**
 * Helper type to extract the type of an array
 */
export declare type GetArrayType<T> = T extends Array<infer TData> ? TData : never;

export declare interface GetDocumentsStatus {
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
    get(options?: GetDocumentsStatusParameters): StreamableMethod<GetDocumentsStatus200Response | GetDocumentsStatusDefaultResponse>;
}

/** The request has succeeded. */
export declare interface GetDocumentsStatus200Response extends HttpResponse {
    status: "200";
    body: DocumentsStatusOutput;
}

export declare interface GetDocumentsStatusDefaultHeaders {
    /** String error code indicating what went wrong. */
    "x-ms-error-code"?: string;
}

export declare interface GetDocumentsStatusDefaultResponse extends HttpResponse {
    status: string;
    body: ErrorResponse;
    headers: RawHttpHeaders & GetDocumentsStatusDefaultHeaders;
}

export declare type GetDocumentsStatusParameters = GetDocumentsStatusQueryParam & RequestParameters;

export declare interface GetDocumentsStatusQueryParam {
    queryParameters?: GetDocumentsStatusQueryParamProperties;
}

export declare interface GetDocumentsStatusQueryParamProperties {
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

export declare interface GetDocumentStatus {
    /**
     * Returns the translation status for a specific document based on the request Id
     * and document Id.
     */
    get(options?: GetDocumentStatusParameters): StreamableMethod<GetDocumentStatus200Response | GetDocumentStatusDefaultResponse>;
}

/** The request has succeeded. */
export declare interface GetDocumentStatus200Response extends HttpResponse {
    status: "200";
    body: DocumentStatusOutput;
}

export declare interface GetDocumentStatusDefaultHeaders {
    /** String error code indicating what went wrong. */
    "x-ms-error-code"?: string;
}

export declare interface GetDocumentStatusDefaultResponse extends HttpResponse {
    status: string;
    body: ErrorResponse;
    headers: RawHttpHeaders & GetDocumentStatusDefaultHeaders;
}

export declare type GetDocumentStatusParameters = RequestParameters;

/**
 * Helper function that builds a Poller object to help polling a long running operation.
 * @param client - Client to use for sending the request to get additional pages.
 * @param initialResponse - The initial response.
 * @param options - Options to set a resume state or custom polling interval.
 * @returns - A poller object to poll for operation state updates and eventually get the final response.
 */
export declare function getLongRunningPoller<TResult extends StartTranslationLogicalResponse | StartTranslationDefaultResponse>(client: Client, initialResponse: StartTranslation202Response | StartTranslationDefaultResponse, options?: CreateHttpPollerOptions<TResult, OperationState<TResult>>): Promise<SimplePollerLike<OperationState<TResult>, TResult>>;

/**
 * The type of a custom function that defines how to get a page and a link to the next one if any.
 */
export declare type GetPage<TPage> = (pageLink: string, maxPageSize?: number) => Promise<{
    page: TPage;
    nextPageLink?: string;
}>;

export declare interface GetSupportedFormats {
    /**
     * The list of supported formats supported by the Document Translation
     * service.
     * The list includes the common file extension, as well as the
     * content-type if using the upload API.
     */
    get(options?: GetSupportedFormatsParameters): StreamableMethod<GetSupportedFormats200Response | GetSupportedFormatsDefaultResponse>;
}

/** The request has succeeded. */
export declare interface GetSupportedFormats200Response extends HttpResponse {
    status: "200";
    body: SupportedFileFormatsOutput;
}

export declare interface GetSupportedFormatsDefaultHeaders {
    /** String error code indicating what went wrong. */
    "x-ms-error-code"?: string;
}

export declare interface GetSupportedFormatsDefaultResponse extends HttpResponse {
    status: string;
    body: ErrorResponse;
    headers: RawHttpHeaders & GetSupportedFormatsDefaultHeaders;
}

export declare type GetSupportedFormatsParameters = GetSupportedFormatsQueryParam & RequestParameters;

export declare interface GetSupportedFormatsQueryParam {
    queryParameters?: GetSupportedFormatsQueryParamProperties;
}

export declare interface GetSupportedFormatsQueryParamProperties {
    /** the type of format like document or glossary */
    type?: FileFormatType;
}

/** The request has succeeded. */
export declare interface GetTranslationsStatus200Response extends HttpResponse {
    status: "200";
    body: TranslationsStatusOutput;
}

export declare interface GetTranslationsStatusDefaultHeaders {
    /** String error code indicating what went wrong. */
    "x-ms-error-code"?: string;
}

export declare interface GetTranslationsStatusDefaultResponse extends HttpResponse {
    status: string;
    body: ErrorResponse;
    headers: RawHttpHeaders & GetTranslationsStatusDefaultHeaders;
}

export declare type GetTranslationsStatusParameters = GetTranslationsStatusQueryParam & RequestParameters;

export declare interface GetTranslationsStatusQueryParam {
    queryParameters?: GetTranslationsStatusQueryParamProperties;
}

export declare interface GetTranslationsStatusQueryParamProperties {
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

export declare interface GetTranslationStatus {
    /**
     * Returns the status for a document translation request.
     * The status includes the
     * overall request status, as well as the status for documents that are being
     * translated as part of that request.
     */
    get(options?: GetTranslationStatusParameters): StreamableMethod<GetTranslationStatus200Response | GetTranslationStatusDefaultResponse>;
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
    delete(options?: CancelTranslationParameters): StreamableMethod<CancelTranslation200Response | CancelTranslationDefaultResponse>;
}

/** The request has succeeded. */
export declare interface GetTranslationStatus200Response extends HttpResponse {
    status: "200";
    body: TranslationStatusOutput;
}

export declare interface GetTranslationStatusDefaultHeaders {
    /** String error code indicating what went wrong. */
    "x-ms-error-code"?: string;
}

export declare interface GetTranslationStatusDefaultResponse extends HttpResponse {
    status: string;
    body: ErrorResponse;
    headers: RawHttpHeaders & GetTranslationStatusDefaultHeaders;
}

export declare type GetTranslationStatusParameters = RequestParameters;

/** Glossary / translation memory for the request */
export declare interface Glossary {
    /**
     * Location of the glossary.
     * We will use the file extension to extract the
     * formatting if the format parameter is not supplied.
     *
     * If the translation
     * language pair is not present in the glossary, it will not be applied
     */
    glossaryUrl: string;
    /** Format */
    format: string;
    /** Optional Version.  If not specified, default is used. */
    version?: string;
    /** Storage Source */
    storageSource?: StorageSource;
}

/**
 * New Inner Error format which conforms to Cognitive Services API Guidelines
 * which is available at
 * https://microsoft.sharepoint.com/%3Aw%3A/t/CognitiveServicesPMO/EUoytcrjuJdKpeOKIK_QRC8BPtUYQpKBi8JsWyeDMRsWlQ?e=CPq8ow.
 * This
 * contains required properties ErrorCode, message and optional properties target,
 * details(key value pair), inner error(this can be nested).
 */
export declare interface InnerTranslationErrorOutput {
    /** Gets code error string. */
    code: string;
    /** Gets high level error message. */
    message: string;
    /**
     * Gets the source of the error.
     * For example it would be "documents" or
     * "document id" in case of invalid document.
     */
    readonly target?: string;
    /**
     * New Inner Error format which conforms to Cognitive Services API Guidelines
     * which is available at
     * https://microsoft.sharepoint.com/%3Aw%3A/t/CognitiveServicesPMO/EUoytcrjuJdKpeOKIK_QRC8BPtUYQpKBi8JsWyeDMRsWlQ?e=CPq8ow.
     * This
     * contains required properties ErrorCode, message and optional properties target,
     * details(key value pair), inner error(this can be nested).
     */
    innerError?: InnerTranslationErrorOutput;
}

export declare function isUnexpected(response: DocumentTranslate200Response | DocumentTranslateDefaultResponse): response is DocumentTranslateDefaultResponse;

export declare function isUnexpected(response: StartTranslation202Response | StartTranslationLogicalResponse | StartTranslationDefaultResponse): response is StartTranslationDefaultResponse;

export declare function isUnexpected(response: GetTranslationsStatus200Response | GetTranslationsStatusDefaultResponse): response is GetTranslationsStatusDefaultResponse;

export declare function isUnexpected(response: GetDocumentStatus200Response | GetDocumentStatusDefaultResponse): response is GetDocumentStatusDefaultResponse;

export declare function isUnexpected(response: GetTranslationStatus200Response | GetTranslationStatusDefaultResponse): response is GetTranslationStatusDefaultResponse;

export declare function isUnexpected(response: CancelTranslation200Response | CancelTranslationDefaultResponse): response is CancelTranslationDefaultResponse;

export declare function isUnexpected(response: GetDocumentsStatus200Response | GetDocumentsStatusDefaultResponse): response is GetDocumentsStatusDefaultResponse;

export declare function isUnexpected(response: GetSupportedFormats200Response | GetSupportedFormatsDefaultResponse): response is GetSupportedFormatsDefaultResponse;

/**
 * Helper to paginate results from an initial response that follows the specification of Autorest `x-ms-pageable` extension
 * @param client - Client to use for sending the next page requests
 * @param initialResponse - Initial response containing the nextLink and current page of elements
 * @param customGetPage - Optional - Function to define how to extract the page and next link to be used to paginate the results
 * @returns - PagedAsyncIterableIterator to iterate the elements
 */
export declare function paginate<TResponse extends PathUncheckedResponse>(client: Client, initialResponse: TResponse, options?: PagingOptions<TResponse>): PagedAsyncIterableIterator<PaginateReturn<TResponse>>;

/**
 * Helper type to infer the Type of the paged elements from the response type
 * This type is generated based on the swagger information for x-ms-pageable
 * specifically on the itemName property which indicates the property of the response
 * where the page items are found. The default value is `value`.
 * This type will allow us to provide strongly typed Iterator based on the response we get as second parameter
 */
export declare type PaginateReturn<TResult> = TResult extends {
    body: {
        value?: infer TPage;
    };
} ? GetArrayType<TPage> : Array<unknown>;

/**
 * Options for the paging helper
 */
export declare interface PagingOptions<TResponse> {
    /**
     * Custom function to extract pagination details for crating the PagedAsyncIterableIterator
     */
    customGetPage?: GetPage<PaginateReturn<TResponse>[]>;
}

export declare interface Routes {
    /** Resource for '/document:translate' has methods for the following verbs: post */
    (path: "/document:translate"): DocumentTranslate;
    /** Resource for '/document/batches' has methods for the following verbs: post, get */
    (path: "/document/batches"): StartTranslation;
    /** Resource for '/document/batches/\{id\}/documents/\{documentId\}' has methods for the following verbs: get */
    (path: "/document/batches/{id}/documents/{documentId}", id: string, documentId: string): GetDocumentStatus;
    /** Resource for '/document/batches/\{id\}' has methods for the following verbs: get, delete */
    (path: "/document/batches/{id}", id: string): GetTranslationStatus;
    /** Resource for '/document/batches/\{id\}/documents' has methods for the following verbs: get */
    (path: "/document/batches/{id}/documents", id: string): GetDocumentsStatus;
    /** Resource for '/document/formats' has methods for the following verbs: get */
    (path: "/document/formats"): GetSupportedFormats;
}

/** Source of the input documents */
export declare interface SourceInput {
    /** Location of the folder / container or single file with your documents */
    sourceUrl: string;
    /** Document filter */
    filter?: DocumentFilter;
    /**
     * Language code
     * If none is specified, we will perform auto detect on the document
     */
    language?: string;
    /** Storage Source */
    storageSource?: StorageSource;
}

export declare interface StartTranslation {
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
    post(options?: StartTranslationParameters): StreamableMethod<StartTranslation202Response | StartTranslationDefaultResponse>;
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
    get(options?: GetTranslationsStatusParameters): StreamableMethod<GetTranslationsStatus200Response | GetTranslationsStatusDefaultResponse>;
}

export declare interface StartTranslation202Headers {
    /** Link to the translation operation status */
    "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export declare interface StartTranslation202Response extends HttpResponse {
    status: "202";
    headers: RawHttpHeaders & StartTranslation202Headers;
}

export declare interface StartTranslationBodyParam {
    body?: StartTranslationDetails;
}

export declare interface StartTranslationDefaultHeaders {
    /** String error code indicating what went wrong. */
    "x-ms-error-code"?: string;
}

export declare interface StartTranslationDefaultResponse extends HttpResponse {
    status: string;
    body: ErrorResponse;
    headers: RawHttpHeaders & StartTranslationDefaultHeaders;
}

/** Translation job submission batch request */
export declare interface StartTranslationDetails {
    /** The input list of documents or folders containing documents */
    inputs: Array<BatchRequest>;
}

/** The final response for long-running startTranslation operation */
export declare interface StartTranslationLogicalResponse extends HttpResponse {
    status: "200";
}

export declare type StartTranslationParameters = StartTranslationBodyParam & RequestParameters;

/** Alias for StatusOutput */
export declare type StatusOutput = "NotStarted" | "Running" | "Succeeded" | "Failed" | "Cancelled" | "Cancelling" | "ValidationFailed" | string;

/** Status Summary */
export declare interface StatusSummaryOutput {
    /** Total count */
    total: number;
    /** Failed count */
    failed: number;
    /** Number of Success */
    success: number;
    /** Number of in progress */
    inProgress: number;
    /** Count of not yet started */
    notYetStarted: number;
    /** Number of cancelled */
    cancelled: number;
    /** Total characters charged by the API */
    totalCharacterCharged: number;
}

/** Alias for StorageInputType */
export declare type StorageInputType = "Folder" | "File" | string;

/** Alias for StorageSource */
export declare type StorageSource = "AzureBlob" | string;

/** List of supported file formats */
export declare interface SupportedFileFormatsOutput {
    /** list of objects */
    value: Array<FileFormatOutput>;
}

/** Destination for the finished translated documents */
export declare interface TargetInput {
    /** Location of the folder / container with your documents */
    targetUrl: string;
    /** Category / custom system for translation request */
    category?: string;
    /** Target Language */
    language: string;
    /** List of Glossary */
    glossaries?: Array<Glossary>;
    /** Storage Source */
    storageSource?: StorageSource;
}

/** Alias for TranslationErrorCodeOutput */
export declare type TranslationErrorCodeOutput = "InvalidRequest" | "InvalidArgument" | "InternalServerError" | "ServiceUnavailable" | "ResourceNotFound" | "Unauthorized" | "RequestRateTooHigh" | string;

/**
 * This contains an outer error with error code, message, details, target and an
 * inner error with more descriptive details.
 */
export declare interface TranslationErrorOutput {
    /** Enums containing high level error codes. */
    code: TranslationErrorCodeOutput;
    /** Gets high level error message. */
    message: string;
    /**
     * Gets the source of the error.
     * For example it would be "documents" or
     * "document id" in case of invalid document.
     */
    readonly target?: string;
    /**
     * New Inner Error format which conforms to Cognitive Services API Guidelines
     * which is available at
     * https://microsoft.sharepoint.com/%3Aw%3A/t/CognitiveServicesPMO/EUoytcrjuJdKpeOKIK_QRC8BPtUYQpKBi8JsWyeDMRsWlQ?e=CPq8ow.
     * This
     * contains required properties ErrorCode, message and optional properties target,
     * details(key value pair), inner error(this can be nested).
     */
    innerError?: InnerTranslationErrorOutput;
}

/** Translation job Status Response */
export declare interface TranslationsStatusOutput {
    /** The summary status of individual operation */
    value: Array<TranslationStatusOutput>;
    /** Url for the next page.  Null if no more pages available */
    nextLink?: string;
}

/** Translation job status response */
export declare interface TranslationStatusOutput {
    /** Id of the operation. */
    id: string;
    /** Operation created date time */
    createdDateTimeUtc: string;
    /** Date time in which the operation's status has been updated */
    lastActionDateTimeUtc: string;
    /** List of possible statuses for job or document */
    status: StatusOutput;
    /**
     * This contains an outer error with error code, message, details, target and an
     * inner error with more descriptive details.
     */
    error?: TranslationErrorOutput;
    /** Status Summary */
    summary: StatusSummaryOutput;
}

export { }
