// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TextTranslationContext as Client } from "./index.js";
import {
  GetSupportedLanguagesResult,
  getSupportedLanguagesResultDeserializer,
  errorResponseDeserializer,
  TranslateBody,
  translateBodySerializer,
  TranslationResult,
  translationResultDeserializer,
  TransliterateBody,
  transliterateBodySerializer,
  TransliterateResult,
  transliterateResultDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import {
  TransliterateOptionalParams,
  TranslateOptionalParams,
  GetSupportedLanguagesOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _transliterateSend(
  context: Client,
  language: string,
  fromScript: string,
  toScript: string,
  body: TransliterateBody,
  options: TransliterateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/transliterate{?language,fromScript,toScript,api%2Dversion}",
    {
      language: language,
      fromScript: fromScript,
      toScript: toScript,
      "api%2Dversion": context.apiVersion ?? "2026-06-06",
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
      headers: {
        ...(options?.clientTraceId !== undefined
          ? { "x-clienttraceid": options?.clientTraceId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: transliterateBodySerializer(body),
    });
}

export async function _transliterateDeserialize(
  result: PathUncheckedResponse,
): Promise<TransliterateResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return transliterateResultDeserializer(result.body);
}

/** Transliterate Text */
export async function transliterate(
  context: Client,
  language: string,
  fromScript: string,
  toScript: string,
  body: TransliterateBody,
  options: TransliterateOptionalParams = { requestOptions: {} },
): Promise<TransliterateResult> {
  const result = await _transliterateSend(context, language, fromScript, toScript, body, options);
  return _transliterateDeserialize(result);
}

export function _translateSend(
  context: Client,
  body: TranslateBody,
  options: TranslateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/translate{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-06-06",
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
      headers: {
        ...(options?.clientTraceId !== undefined
          ? { "x-clienttraceid": options?.clientTraceId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: translateBodySerializer(body),
    });
}

export async function _translateDeserialize(
  result: PathUncheckedResponse,
): Promise<TranslationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return translationResultDeserializer(result.body);
}

/** Translate Text */
export async function translate(
  context: Client,
  body: TranslateBody,
  options: TranslateOptionalParams = { requestOptions: {} },
): Promise<TranslationResult> {
  const result = await _translateSend(context, body, options);
  return _translateDeserialize(result);
}

export function _getSupportedLanguagesSend(
  context: Client,
  options: GetSupportedLanguagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/languages{?scope,api%2Dversion}",
    {
      scope: options?.scope,
      "api%2Dversion": context.apiVersion ?? "2026-06-06",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.clientTraceId !== undefined
          ? { "x-clienttraceid": options?.clientTraceId }
          : {}),
        ...(options?.acceptLanguage !== undefined
          ? { "accept-language": options?.acceptLanguage }
          : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getSupportedLanguagesDeserialize(
  result: PathUncheckedResponse,
): Promise<GetSupportedLanguagesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return getSupportedLanguagesResultDeserializer(result.body);
}

/** Gets the set of languages currently supported by other operations of the Translator. */
export async function getSupportedLanguages(
  context: Client,
  options: GetSupportedLanguagesOptionalParams = { requestOptions: {} },
): Promise<GetSupportedLanguagesResult> {
  const result = await _getSupportedLanguagesSend(context, options);
  return _getSupportedLanguagesDeserialize(result);
}
