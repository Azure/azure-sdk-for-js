// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import type { RequestParameters } from "@azure-rest/core-client";
import type { TranslateBody, TransliterateBody } from "./models.js";

export interface GetSupportedLanguagesHeaders {
  /** A client-generated GUID to uniquely identify the request. */
  "X-ClientTraceId"?: string;
  /**
   * The language to use for user interface strings. Some of the fields in the response are names of languages or
   * names of regions. Use this parameter to define the language in which these names are returned.
   * The language is specified by providing a well-formed BCP 47 language tag. For instance, use the value `fr`
   * to request names in French or use the value `zh-Hant` to request names in Chinese Traditional.
   * Names are provided in the English language when a target language is not specified or when localization
   * is not available.
   */
  "Accept-Language"?: string;
  /**
   * Passing the value of the ETag response header in an If-None-Match field will allow the service to optimize the response.
   * If the resource has not been modified, the service will return status code 304 and an empty response body.
   */
  "If-None-Match"?: string;
}

export interface GetSupportedLanguagesQueryParamProperties {
  /**
   * A comma-separated list of names defining the group of languages to return.
   * Allowed group names are: `translation`, `transliteration` and `dictionary`.
   * If no scope is given, then all groups are returned, which is equivalent to passing
   * `scope=translation,transliteration,dictionary`. To decide which set of supported languages
   * is appropriate for your scenario, see the description of the [response object](#response-body).
   */
  scope?: string;
}

export interface GetSupportedLanguagesQueryParam {
  queryParameters?: GetSupportedLanguagesQueryParamProperties;
}

export interface GetSupportedLanguagesHeaderParam {
  headers?: RawHttpHeadersInput & GetSupportedLanguagesHeaders;
}

export type GetSupportedLanguagesParameters = GetSupportedLanguagesQueryParam &
  GetSupportedLanguagesHeaderParam &
  RequestParameters;

export interface TranslateHeaders {
  /** A client-generated GUID to uniquely identify the request. */
  "X-ClientTraceId"?: string;
}

export interface TranslateBodyParam {
  /** Defines the content of the request */
  body: TranslateBody;
}

export interface TranslateHeaderParam {
  headers?: RawHttpHeadersInput & TranslateHeaders;
}

export type TranslateParameters = TranslateHeaderParam & TranslateBodyParam & RequestParameters;

export interface TransliterateHeaders {
  /** A client-generated GUID to uniquely identify the request. */
  "X-ClientTraceId"?: string;
}

export interface TransliterateBodyParam {
  /** Defines the content of the request */
  body: TransliterateBody;
}

export interface TransliterateQueryParamProperties {
  /**
   * Specifies the language of the text to convert from one script to another.
   * Possible languages are listed in the transliteration scope obtained by querying the service
   * for its supported languages.
   */
  language: string;
  /**
   * Specifies the script used by the input text. Look up supported languages using the transliteration scope,
   * to find input scripts available for the selected language.
   */
  fromScript: string;
  /**
   * Specifies the output script. Look up supported languages using the transliteration scope, to find output
   * scripts available for the selected combination of input language and input script.
   */
  toScript: string;
}

export interface TransliterateQueryParam {
  queryParameters: TransliterateQueryParamProperties;
}

export interface TransliterateHeaderParam {
  headers?: RawHttpHeadersInput & TransliterateHeaders;
}

export type TransliterateParameters = TransliterateQueryParam &
  TransliterateHeaderParam &
  TransliterateBodyParam &
  RequestParameters;
