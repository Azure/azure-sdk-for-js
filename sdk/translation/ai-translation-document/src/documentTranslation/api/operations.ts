// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DocumentTranslationContext as Client } from "./index.js";
import type {
  StartTranslationDetails,
  TranslationStatus,
  _TranslationsStatus,
  DocumentStatus,
  _DocumentsStatus,
  SupportedFileFormats,
  FileFormatType} from "../../models/models.js";
import {
  startTranslationDetailsSerializer,
  translationStatusDeserializer,
  _translationsStatusDeserializer,
  documentStatusDeserializer,
  _documentsStatusDeserializer,
  supportedFileFormatsDeserializer
} from "../../models/models.js";
import type {
  PagedAsyncIterableIterator} from "../../static-helpers/pagingHelpers.js";
import {
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GetSupportedFormatsOptionalParams,
  GetDocumentsStatusOptionalParams,
  CancelTranslationOptionalParams,
  GetTranslationStatusOptionalParams,
  GetDocumentStatusOptionalParams,
  GetTranslationsStatusOptionalParams,
  StartTranslationOptionalParams,
} from "./options.js";
import type {
  StreamableMethod,
  PathUncheckedResponse} from "@azure-rest/core-client";
import {
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getSupportedFormatsSend(
  context: Client,
  typeParam: FileFormatType,
  options: GetSupportedFormatsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/document/formats{?api%2Dversion,type}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
      type: typeParam,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getSupportedFormatsDeserialize(
  result: PathUncheckedResponse,
): Promise<SupportedFileFormats> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return supportedFileFormatsDeserializer(result.body);
}

/**
 * The list of supported formats supported by the Document Translation
 * service.
 * The list includes the common file extension, as well as the
 * content-type if using the upload API.
 */
export async function getSupportedFormats(
  context: Client,
  typeParam: FileFormatType,
  options: GetSupportedFormatsOptionalParams = { requestOptions: {} },
): Promise<SupportedFileFormats> {
  const result = await _getSupportedFormatsSend(context, typeParam, options);
  return _getSupportedFormatsDeserialize(result);
}

export function _getDocumentsStatusSend(
  context: Client,
  translationId: string,
  options: GetDocumentsStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/document/batches/{id}/documents{?api%2Dversion,top,skip,maxpagesize,ids,statuses,createdDateTimeUtcStart,createdDateTimeUtcEnd,orderby}",
    {
      id: translationId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
      top: options?.top,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
      ids: !options?.documentIds
        ? options?.documentIds
        : options?.documentIds.map((p: any) => {
            return p;
          }),
      statuses: !options?.statuses
        ? options?.statuses
        : options?.statuses.map((p: any) => {
            return p;
          }),
      createdDateTimeUtcStart: !options?.createdDateTimeUtcStart
        ? options?.createdDateTimeUtcStart
        : options?.createdDateTimeUtcStart.toISOString(),
      createdDateTimeUtcEnd: !options?.createdDateTimeUtcEnd
        ? options?.createdDateTimeUtcEnd
        : options?.createdDateTimeUtcEnd.toISOString(),
      orderby: !options?.orderby
        ? options?.orderby
        : options?.orderby.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDocumentsStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<_DocumentsStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _documentsStatusDeserializer(result.body);
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
export function getDocumentsStatus(
  context: Client,
  translationId: string,
  options: GetDocumentsStatusOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DocumentStatus> {
  return buildPagedAsyncIterator(
    context,
    () => _getDocumentsStatusSend(context, translationId, options),
    _getDocumentsStatusDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-01" },
  );
}

export function _cancelTranslationSend(
  context: Client,
  translationId: string,
  options: CancelTranslationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/document/batches/{id}{?api%2Dversion}",
    {
      id: translationId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _cancelTranslationDeserialize(
  result: PathUncheckedResponse,
): Promise<TranslationStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return translationStatusDeserializer(result.body);
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
export async function cancelTranslation(
  context: Client,
  translationId: string,
  options: CancelTranslationOptionalParams = { requestOptions: {} },
): Promise<TranslationStatus> {
  const result = await _cancelTranslationSend(context, translationId, options);
  return _cancelTranslationDeserialize(result);
}

export function _getTranslationStatusSend(
  context: Client,
  translationId: string,
  options: GetTranslationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/document/batches/{id}{?api%2Dversion}",
    {
      id: translationId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getTranslationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<TranslationStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return translationStatusDeserializer(result.body);
}

/**
 * Returns the status for a document translation request.
 * The status includes the
 * overall request status, as well as the status for documents that are being
 * translated as part of that request.
 */
export async function getTranslationStatus(
  context: Client,
  translationId: string,
  options: GetTranslationStatusOptionalParams = { requestOptions: {} },
): Promise<TranslationStatus> {
  const result = await _getTranslationStatusSend(context, translationId, options);
  return _getTranslationStatusDeserialize(result);
}

export function _getDocumentStatusSend(
  context: Client,
  translationId: string,
  documentId: string,
  options: GetDocumentStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/document/batches/{id}/documents/{documentId}{?api%2Dversion}",
    {
      id: translationId,
      documentId: documentId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDocumentStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<DocumentStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return documentStatusDeserializer(result.body);
}

/**
 * Returns the translation status for a specific document based on the request Id
 * and document Id.
 */
export async function getDocumentStatus(
  context: Client,
  translationId: string,
  documentId: string,
  options: GetDocumentStatusOptionalParams = { requestOptions: {} },
): Promise<DocumentStatus> {
  const result = await _getDocumentStatusSend(context, translationId, documentId, options);
  return _getDocumentStatusDeserialize(result);
}

export function _getTranslationsStatusSend(
  context: Client,
  options: GetTranslationsStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/document/batches{?api%2Dversion,top,skip,maxpagesize,ids,statuses,createdDateTimeUtcStart,createdDateTimeUtcEnd,orderby}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
      top: options?.top,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
      ids: !options?.translationIds
        ? options?.translationIds
        : options?.translationIds.map((p: any) => {
            return p;
          }),
      statuses: !options?.statuses
        ? options?.statuses
        : options?.statuses.map((p: any) => {
            return p;
          }),
      createdDateTimeUtcStart: !options?.createdDateTimeUtcStart
        ? options?.createdDateTimeUtcStart
        : options?.createdDateTimeUtcStart.toISOString(),
      createdDateTimeUtcEnd: !options?.createdDateTimeUtcEnd
        ? options?.createdDateTimeUtcEnd
        : options?.createdDateTimeUtcEnd.toISOString(),
      orderby: !options?.orderby
        ? options?.orderby
        : options?.orderby.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getTranslationsStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<_TranslationsStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _translationsStatusDeserializer(result.body);
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
export function getTranslationsStatus(
  context: Client,
  options: GetTranslationsStatusOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TranslationStatus> {
  return buildPagedAsyncIterator(
    context,
    () => _getTranslationsStatusSend(context, options),
    _getTranslationsStatusDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-01" },
  );
}

export function _startTranslationSend(
  context: Client,
  body: StartTranslationDetails,
  options: StartTranslationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/document/batches{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: startTranslationDetailsSerializer(body),
    });
}

export async function _startTranslationDeserialize(
  result: PathUncheckedResponse,
): Promise<TranslationStatus> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return translationStatusDeserializer(result.body);
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
export function startTranslation(
  context: Client,
  body: StartTranslationDetails,
  options: StartTranslationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TranslationStatus>, TranslationStatus> {
  return getLongRunningPoller(context, _startTranslationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startTranslationSend(context, body, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2026-03-01",
  }) as PollerLike<OperationState<TranslationStatus>, TranslationStatus>;
}
