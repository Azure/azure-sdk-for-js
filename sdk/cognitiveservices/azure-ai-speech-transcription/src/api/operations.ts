// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TranscriptionContext as Client } from "./index.js";
import {
  TranscribeRequestContent,
  transcribeRequestContentSerializer,
  TranscriptionResult,
  transcriptionResultDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import { TranscribeOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _transcribeSend(
  context: Client,
  body: TranscribeRequestContent,
  options: TranscribeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/transcriptions:transcribe{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "multipart/form-data",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: transcribeRequestContentSerializer(body),
  });
}

export async function _transcribeDeserialize(
  result: PathUncheckedResponse,
): Promise<TranscriptionResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return transcriptionResultDeserializer(result.body);
}

/** Transcribes the provided audio stream. */
export async function transcribe(
  context: Client,
  body: TranscribeRequestContent,
  options: TranscribeOptionalParams = { requestOptions: {} },
): Promise<TranscriptionResult> {
  const result = await _transcribeSend(context, body, options);
  return _transcribeDeserialize(result);
}
