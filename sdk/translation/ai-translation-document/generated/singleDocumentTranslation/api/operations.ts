// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SingleDocumentTranslationContext as Client } from "./index.js";
import { getBinaryStreamResponse } from "#platform/static-helpers/serialization/get-binary-stream-response";
import type { DocumentTranslateContent, TranslateResponse } from "../../models/models.js";
import { documentTranslateContentSerializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { TranslateOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _translateSend(
  context: Client,
  targetLanguage: string,
  body: DocumentTranslateContent,
  options: TranslateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/document:translate{?api%2Dversion,sourceLanguage,targetLanguage,category,deploymentName,allowFallback,translateTextWithinImage}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
      sourceLanguage: options?.sourceLanguage,
      targetLanguage: targetLanguage,
      category: options?.category,
      deploymentName: options?.deploymentName,
      allowFallback: options?.allowFallback,
      translateTextWithinImage: options?.translateTextWithinImage,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "multipart/form-data",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/octet-stream",
      ...options.requestOptions?.headers,
    },
    body: documentTranslateContentSerializer(body),
  });
}

export async function _translateDeserialize(
  result: PathUncheckedResponse & TranslateResponse,
): Promise<TranslateResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Use this API to submit a single translation request to the Document Translation Service. */
export async function translate(
  context: Client,
  targetLanguage: string,
  body: DocumentTranslateContent,
  options: TranslateOptionalParams = { requestOptions: {} },
): Promise<TranslateResponse> {
  const streamableMethod = _translateSend(context, targetLanguage, body, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _translateDeserialize(result);
}
