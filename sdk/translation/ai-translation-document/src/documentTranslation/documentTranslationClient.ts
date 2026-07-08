// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DocumentTranslationContext,
  DocumentTranslationClientOptionalParams} from "./api/index.js";
import {
  createDocumentTranslation,
} from "./api/index.js";
import type {
  StartTranslationDetails,
  TranslationStatus,
  DocumentStatus,
  SupportedFileFormats,
  FileFormatType,
} from "../models/models.js";
import type { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import {
  getSupportedFormats,
  getDocumentsStatus,
  cancelTranslation,
  getTranslationStatus,
  getDocumentStatus,
  getTranslationsStatus,
  startTranslation,
} from "./api/operations.js";
import type {
  GetSupportedFormatsOptionalParams,
  GetDocumentsStatusOptionalParams,
  CancelTranslationOptionalParams,
  GetTranslationStatusOptionalParams,
  GetDocumentStatusOptionalParams,
  GetTranslationsStatusOptionalParams,
  StartTranslationOptionalParams,
} from "./api/options.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { PollerLike, OperationState } from "@azure/core-lro";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { DocumentTranslationClientOptionalParams } from "./api/documentTranslationContext.js";

export class DocumentTranslationClient {
  private _client: DocumentTranslationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: DocumentTranslationClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDocumentTranslation(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /**
   * The list of supported formats supported by the Document Translation
   * service.
   * The list includes the common file extension, as well as the
   * content-type if using the upload API.
   */
  getSupportedFormats(
    typeParam: FileFormatType,
    options: GetSupportedFormatsOptionalParams = { requestOptions: {} },
  ): Promise<SupportedFileFormats> {
    return getSupportedFormats(this._client, typeParam, options);
  }

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
  getDocumentsStatus(
    translationId: string,
    options: GetDocumentsStatusOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<DocumentStatus> {
    return getDocumentsStatus(this._client, translationId, options);
  }

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
  cancelTranslation(
    translationId: string,
    options: CancelTranslationOptionalParams = { requestOptions: {} },
  ): Promise<TranslationStatus> {
    return cancelTranslation(this._client, translationId, options);
  }

  /**
   * Returns the status for a document translation request.
   * The status includes the
   * overall request status, as well as the status for documents that are being
   * translated as part of that request.
   */
  getTranslationStatus(
    translationId: string,
    options: GetTranslationStatusOptionalParams = { requestOptions: {} },
  ): Promise<TranslationStatus> {
    return getTranslationStatus(this._client, translationId, options);
  }

  /**
   * Returns the translation status for a specific document based on the request Id
   * and document Id.
   */
  getDocumentStatus(
    translationId: string,
    documentId: string,
    options: GetDocumentStatusOptionalParams = { requestOptions: {} },
  ): Promise<DocumentStatus> {
    return getDocumentStatus(this._client, translationId, documentId, options);
  }

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
  getTranslationsStatus(
    options: GetTranslationsStatusOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<TranslationStatus> {
    return getTranslationsStatus(this._client, options);
  }

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
  startTranslation(
    body: StartTranslationDetails,
    options: StartTranslationOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<TranslationStatus>, TranslationStatus> {
    return startTranslation(this._client, body, options);
  }
}
