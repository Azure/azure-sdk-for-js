// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchTranscriptionContext as Client } from "./index.js";
import type {
  TranscriptionJob,
  _SpeechToTextCustomPageTranscriptionJob,
  _SpeechToTextCustomPageTranscriptionFile,
  TranscriptionFile,
} from "../models/models.js";
import {
  transcriptionJobSerializer,
  transcriptionJobDeserializer,
  _speechToTextCustomPageTranscriptionJobDeserializer,
  _speechToTextCustomPageTranscriptionFileDeserializer,
} from "../models/models.js";
import type { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type {
  ListTranscriptionFilesOptionalParams,
  ListTranscriptionsOptionalParams,
  DeleteTranscriptionOptionalParams,
  GetTranscriptionOptionalParams,
  StartTranscriptionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listTranscriptionFilesSend(
  context: Client,
  id: string,
  options: ListTranscriptionFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/transcriptions/{id}/files{?api%2Dversion,top,skip,filter}",
    {
      id: id,
      "api%2Dversion": context.apiVersion,
      top: options?.top,
      skip: options?.skip,
      filter: options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listTranscriptionFilesDeserialize(
  result: PathUncheckedResponse,
): Promise<_SpeechToTextCustomPageTranscriptionFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _speechToTextCustomPageTranscriptionFileDeserializer(result.body);
}

/** Gets the files of the transcription identified by the given ID */
export function listTranscriptionFiles(
  context: Client,
  id: string,
  options: ListTranscriptionFilesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TranscriptionFile> {
  return buildPagedAsyncIterator(
    context,
    () => _listTranscriptionFilesSend(context, id, options),
    _listTranscriptionFilesDeserialize,
    ["200"],
    { itemName: "values", nextLinkName: "@nextLink" },
  );
}

export function _listTranscriptionsSend(
  context: Client,
  options: ListTranscriptionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/transcriptions{?api%2Dversion,top,skip,filter}",
    {
      "api%2Dversion": context.apiVersion,
      top: options?.top,
      skip: options?.skip,
      filter: options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listTranscriptionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SpeechToTextCustomPageTranscriptionJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _speechToTextCustomPageTranscriptionJobDeserializer(result.body);
}

/** Gets a list of transcriptions for the authenticated subscription. */
export function listTranscriptions(
  context: Client,
  options: ListTranscriptionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TranscriptionJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listTranscriptionsSend(context, options),
    _listTranscriptionsDeserialize,
    ["200"],
    { itemName: "values", nextLinkName: "@nextLink" },
  );
}

export function _deleteTranscriptionSend(
  context: Client,
  id: string,
  options: DeleteTranscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/transcriptions/{id}{?api%2Dversion}",
    {
      id: id,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteTranscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes the specified transcription task. */
export async function deleteTranscription(
  context: Client,
  id: string,
  options: DeleteTranscriptionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteTranscriptionSend(context, id, options);
  return _deleteTranscriptionDeserialize(result);
}

export function _getTranscriptionSend(
  context: Client,
  id: string,
  options: GetTranscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/transcriptions/{id}{?api%2Dversion}",
    {
      id: id,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getTranscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<TranscriptionJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return transcriptionJobDeserializer(result.body);
}

/** Gets the transcription identified by the given ID. */
export async function getTranscription(
  context: Client,
  id: string,
  options: GetTranscriptionOptionalParams = { requestOptions: {} },
): Promise<TranscriptionJob> {
  const result = await _getTranscriptionSend(context, id, options);
  return _getTranscriptionDeserialize(result);
}

export function _startTranscriptionSend(
  context: Client,
  resource: TranscriptionJob,
  options: StartTranscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/transcriptions:submit{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: transcriptionJobSerializer(resource),
  });
}

export async function _startTranscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<TranscriptionJob> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return transcriptionJobDeserializer(result.body);
}

/** Starts a new transcription job. */
export async function startTranscription(
  context: Client,
  resource: TranscriptionJob,
  options: StartTranscriptionOptionalParams = { requestOptions: {} },
): Promise<TranscriptionJob> {
  const result = await _startTranscriptionSend(context, resource, options);
  return _startTranscriptionDeserialize(result);
}
