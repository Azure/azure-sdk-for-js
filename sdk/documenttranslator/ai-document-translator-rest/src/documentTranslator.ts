// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CancelTranslation200Response,
  CancelTranslation401Response,
  CancelTranslation404Response,
  CancelTranslation429Response,
  CancelTranslation500Response,
  CancelTranslation503Response,
  GetDocumentStatus200Response,
  GetDocumentStatus401Response,
  GetDocumentStatus404Response,
  GetDocumentStatus429Response,
  GetDocumentStatus500Response,
  GetDocumentStatus503Response,
  GetDocumentsStatus200Response,
  GetDocumentsStatus400Response,
  GetDocumentsStatus401Response,
  GetDocumentsStatus404Response,
  GetDocumentsStatus429Response,
  GetDocumentsStatus500Response,
  GetDocumentsStatus503Response,
  GetSupportedDocumentFormats200Response,
  GetSupportedDocumentFormats429Response,
  GetSupportedDocumentFormats500Response,
  GetSupportedDocumentFormats503Response,
  GetSupportedGlossaryFormats200Response,
  GetSupportedGlossaryFormats429Response,
  GetSupportedGlossaryFormats500Response,
  GetSupportedGlossaryFormats503Response,
  GetSupportedStorageSources200Response,
  GetSupportedStorageSources429Response,
  GetSupportedStorageSources500Response,
  GetSupportedStorageSources503Response,
  GetTranslationStatus200Response,
  GetTranslationStatus401Response,
  GetTranslationStatus404Response,
  GetTranslationStatus429Response,
  GetTranslationStatus500Response,
  GetTranslationStatus503Response,
  GetTranslationsStatus200Response,
  GetTranslationsStatus400Response,
  GetTranslationsStatus401Response,
  GetTranslationsStatus429Response,
  GetTranslationsStatus500Response,
  GetTranslationsStatus503Response,
  StartTranslation202Response,
  StartTranslation400Response,
  StartTranslation401Response,
  StartTranslation429Response,
  StartTranslation500Response,
  StartTranslation503Response,
} from "./responses";
import {
  CancelTranslationParameters,
  GetDocumentStatusParameters,
  GetDocumentsStatusParameters,
  GetSupportedDocumentFormatsParameters,
  GetSupportedGlossaryFormatsParameters,
  GetSupportedStorageSourcesParameters,
  GetTranslationStatusParameters,
  GetTranslationsStatusParameters,
  StartTranslationParameters,
} from "./parameters";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { KeyCredential, TokenCredential } from "@azure/core-auth";

export interface GetTranslationsStatus {
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
    options: StartTranslationParameters
  ): Promise<
    | StartTranslation202Response
    | StartTranslation400Response
    | StartTranslation401Response
    | StartTranslation429Response
    | StartTranslation500Response
    | StartTranslation503Response
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
  get(
    options?: GetTranslationsStatusParameters
  ): Promise<
    | GetTranslationsStatus200Response
    | GetTranslationsStatus400Response
    | GetTranslationsStatus401Response
    | GetTranslationsStatus429Response
    | GetTranslationsStatus500Response
    | GetTranslationsStatus503Response
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

export interface CancelTranslation {
  /**
   * Returns the status for a document translation request.
   * The status includes the overall request status, as well as the status for documents that are being translated as part of that request.
   */
  get(
    options?: GetTranslationStatusParameters
  ): Promise<
    | GetTranslationStatus200Response
    | GetTranslationStatus401Response
    | GetTranslationStatus404Response
    | GetTranslationStatus429Response
    | GetTranslationStatus500Response
    | GetTranslationStatus503Response
  >;
  /**
   * Cancel a currently processing or queued translation.
   * Cancel a currently processing or queued translation.
   * A translation will not be cancelled if it is already completed or failed or cancelling. A bad request will be returned.
   * All documents that have completed translation will not be cancelled and will be charged.
   * All pending documents will be cancelled if possible.
   */
  delete(
    options?: CancelTranslationParameters
  ): Promise<
    | CancelTranslation200Response
    | CancelTranslation401Response
    | CancelTranslation404Response
    | CancelTranslation429Response
    | CancelTranslation500Response
    | CancelTranslation503Response
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
  get(
    options?: GetDocumentsStatusParameters
  ): Promise<
    | GetDocumentsStatus200Response
    | GetDocumentsStatus400Response
    | GetDocumentsStatus401Response
    | GetDocumentsStatus404Response
    | GetDocumentsStatus429Response
    | GetDocumentsStatus500Response
    | GetDocumentsStatus503Response
  >;
}

export interface GetSupportedDocumentFormats {
  /**
   * The list of supported document formats supported by the Document Translation service.
   * The list includes the common file extension, as well as the content-type if using the upload API.
   */
  get(
    options?: GetSupportedDocumentFormatsParameters
  ): Promise<
    | GetSupportedDocumentFormats200Response
    | GetSupportedDocumentFormats429Response
    | GetSupportedDocumentFormats500Response
    | GetSupportedDocumentFormats503Response
  >;
}

export interface GetSupportedGlossaryFormats {
  /**
   * The list of supported glossary formats supported by the Document Translation service.
   * The list includes the common file extension used.
   */
  get(
    options?: GetSupportedGlossaryFormatsParameters
  ): Promise<
    | GetSupportedGlossaryFormats200Response
    | GetSupportedGlossaryFormats429Response
    | GetSupportedGlossaryFormats500Response
    | GetSupportedGlossaryFormats503Response
  >;
}

export interface GetSupportedStorageSources {
  /** Returns a list of storage sources/options supported by the Document Translation service. */
  get(
    options?: GetSupportedStorageSourcesParameters
  ): Promise<
    | GetSupportedStorageSources200Response
    | GetSupportedStorageSources429Response
    | GetSupportedStorageSources500Response
    | GetSupportedStorageSources503Response
  >;
}

export interface Routes {
  /** Resource for '/batches' has methods for the following verbs: post, get */
  (path: "/batches"): GetTranslationsStatus;
  /** Resource for '/batches/\{id\}/documents/\{documentId\}' has methods for the following verbs: get */
  (path: "/batches/{id}/documents/{documentId}", id: string, documentId: string): GetDocumentStatus;
  /** Resource for '/batches/\{id\}' has methods for the following verbs: get, delete */
  (path: "/batches/{id}", id: string): CancelTranslation;
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

export interface DocumentTranslatorFactory {
  (endpoint: string, credentials: TokenCredential | KeyCredential, options?: ClientOptions): void;
}

export default function DocumentTranslator(
  endpoint: string,
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {}
): DocumentTranslatorClient {
  const baseUrl = options.baseUrl ?? `${endpoint}/translator/text/batch/v1.0`;
  options = {
    ...options,
    credentials: {
      scopes: ["https://cognitiveservices.azure.com/.default"],
      apiKeyHeaderName: "Ocp-Apim-Subscription-Key",
    },
  };

  return getClient(baseUrl, credentials, options) as DocumentTranslatorClient;
}
