import {
  SubmitBatchRequestParameters,
  GetOperationsParameters,
  GetDocumentStatusParameters,
  GetOperationStatusParameters,
  CancelOperationParameters,
  GetOperationDocumentsStatusParameters,
  GetDocumentFormatsParameters,
  GetGlossaryFormatsParameters,
  GetDocumentStorageSourceParameters
} from "./parameters";
import {
  SubmitBatchRequest202Response,
  SubmitBatchRequest400Response,
  SubmitBatchRequest401Response,
  SubmitBatchRequest429Response,
  SubmitBatchRequest500Response,
  SubmitBatchRequest503Response,
  GetOperations200Response,
  GetOperations400Response,
  GetOperations401Response,
  GetOperations429Response,
  GetOperations500Response,
  GetOperations503Response,
  GetDocumentStatus200Response,
  GetDocumentStatus401Response,
  GetDocumentStatus404Response,
  GetDocumentStatus429Response,
  GetDocumentStatus500Response,
  GetDocumentStatus503Response,
  GetOperationStatus200Response,
  GetOperationStatus401Response,
  GetOperationStatus404Response,
  GetOperationStatus429Response,
  GetOperationStatus500Response,
  GetOperationStatus503Response,
  CancelOperation200Response,
  CancelOperation401Response,
  CancelOperation404Response,
  CancelOperation429Response,
  CancelOperation500Response,
  CancelOperation503Response,
  GetOperationDocumentsStatus200Response,
  GetOperationDocumentsStatus400Response,
  GetOperationDocumentsStatus401Response,
  GetOperationDocumentsStatus404Response,
  GetOperationDocumentsStatus429Response,
  GetOperationDocumentsStatus500Response,
  GetOperationDocumentsStatus503Response,
  GetDocumentFormats200Response,
  GetDocumentFormats429Response,
  GetDocumentFormats500Response,
  GetDocumentFormats503Response,
  GetGlossaryFormats200Response,
  GetGlossaryFormats429Response,
  GetGlossaryFormats500Response,
  GetGlossaryFormats503Response,
  GetDocumentStorageSource200Response,
  GetDocumentStorageSource429Response,
  GetDocumentStorageSource500Response,
  GetDocumentStorageSource503Response
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { KeyCredential, TokenCredential } from "@azure/core-auth";

export interface GetOperations {
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
    options?: SubmitBatchRequestParameters
  ): Promise<
    | SubmitBatchRequest202Response
    | SubmitBatchRequest400Response
    | SubmitBatchRequest401Response
    | SubmitBatchRequest429Response
    | SubmitBatchRequest500Response
    | SubmitBatchRequest503Response
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
  get(
    options?: GetOperationsParameters
  ): Promise<
    | GetOperations200Response
    | GetOperations400Response
    | GetOperations401Response
    | GetOperations429Response
    | GetOperations500Response
    | GetOperations503Response
  >;
}

export interface GetDocumentStatus {
  /** Returns the translation status for a specific document based on the request Id and document Id. */
  get(
    options?: GetDocumentStatusParameters
  ): Promise<
    | GetDocumentStatus200Response
    | GetDocumentStatus401Response
    | GetDocumentStatus404Response
    | GetDocumentStatus429Response
    | GetDocumentStatus500Response
    | GetDocumentStatus503Response
  >;
}

export interface CancelOperation {
  /**
   * Returns the status for a document translation request.
   * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
   */
  get(
    options?: GetOperationStatusParameters
  ): Promise<
    | GetOperationStatus200Response
    | GetOperationStatus401Response
    | GetOperationStatus404Response
    | GetOperationStatus429Response
    | GetOperationStatus500Response
    | GetOperationStatus503Response
  >;
  /**
   * Cancel a currently processing or queued operation.
   * Cancel a currently processing or queued operation.
   * An operation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
   * All documents that have completed translation will not be cancelled and will be charged.
   * All pending documents will be cancelled if possible.
   */
  delete(
    options?: CancelOperationParameters
  ): Promise<
    | CancelOperation200Response
    | CancelOperation401Response
    | CancelOperation404Response
    | CancelOperation429Response
    | CancelOperation500Response
    | CancelOperation503Response
  >;
}

export interface GetOperationDocumentsStatus {
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
  get(
    options?: GetOperationDocumentsStatusParameters
  ): Promise<
    | GetOperationDocumentsStatus200Response
    | GetOperationDocumentsStatus400Response
    | GetOperationDocumentsStatus401Response
    | GetOperationDocumentsStatus404Response
    | GetOperationDocumentsStatus429Response
    | GetOperationDocumentsStatus500Response
    | GetOperationDocumentsStatus503Response
  >;
}

export interface GetDocumentFormats {
  /**
   * The list of supported document formats supported by the Document Translation service.
   * The list includes the common file extension, as well as the content-type if using the upload API.
   */
  get(
    options?: GetDocumentFormatsParameters
  ): Promise<
    | GetDocumentFormats200Response
    | GetDocumentFormats429Response
    | GetDocumentFormats500Response
    | GetDocumentFormats503Response
  >;
}

export interface GetGlossaryFormats {
  /**
   * The list of supported glossary formats supported by the Document Translation service.
   * The list includes the common file extension used.
   */
  get(
    options?: GetGlossaryFormatsParameters
  ): Promise<
    | GetGlossaryFormats200Response
    | GetGlossaryFormats429Response
    | GetGlossaryFormats500Response
    | GetGlossaryFormats503Response
  >;
}

export interface GetDocumentStorageSource {
  /** Returns a list of storage sources/options supported by the Document Translation service. */
  get(
    options?: GetDocumentStorageSourceParameters
  ): Promise<
    | GetDocumentStorageSource200Response
    | GetDocumentStorageSource429Response
    | GetDocumentStorageSource500Response
    | GetDocumentStorageSource503Response
  >;
}

export interface Routes {
  /** Resource for '/batches' has methods for the following verbs: post, get */
  (path: "/batches"): GetOperations;
  /** Resource for '/batches/{id}/documents/{documentId}' has methods for the following verbs: get */
  (
    path: "/batches/{id}/documents/{documentId}",
    id: string,
    documentId: string
  ): GetDocumentStatus;
  /** Resource for '/batches/{id}' has methods for the following verbs: get, delete */
  (path: "/batches/{id}", id: string): CancelOperation;
  /** Resource for '/batches/{id}/documents' has methods for the following verbs: get */
  (path: "/batches/{id}/documents", id: string): GetOperationDocumentsStatus;
  /** Resource for '/documents/formats' has methods for the following verbs: get */
  (path: "/documents/formats"): GetDocumentFormats;
  /** Resource for '/glossaries/formats' has methods for the following verbs: get */
  (path: "/glossaries/formats"): GetGlossaryFormats;
  /** Resource for '/storagesources' has methods for the following verbs: get */
  (path: "/storagesources"): GetDocumentStorageSource;
}

export type DocumentTranslator = Client & {
  path: Routes;
};

export interface DocumentTranslatorFactory {
  (
    endpoint: string,
    credentials: TokenCredential | KeyCredential,
    options?: ClientOptions
  ): void;
}

export default function DocumentTranslator(
  endpoint: string,
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {}
): DocumentTranslator {
  const baseUrl =
    options.baseUrl ||
    "{endpoint}/translator/text/batch/v1.0-preview.1".replace(
      /{endpoint}/g,
      endpoint
    );
  options = {
    ...options,
    credentials: {
      scopes: ["https://cognitiveservices.azure.com/.default"],
      apiKeyHeaderName: "Ocp-Apim-Subscription-Key"
    }
  };

  return getClient(baseUrl, credentials, options) as DocumentTranslator;
}
