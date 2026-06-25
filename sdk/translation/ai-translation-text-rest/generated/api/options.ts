// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TransliterateOptionalParams extends OperationOptions {
  /** A client-generated GUID to uniquely identify the request. */
  clientTraceId?: string;
}

/** Optional parameters. */
export interface TranslateOptionalParams extends OperationOptions {
  /** A client-generated GUID to uniquely identify the request. */
  clientTraceId?: string;
}

/** Optional parameters. */
export interface GetSupportedLanguagesOptionalParams extends OperationOptions {
  /** A client-generated GUID to uniquely identify the request. */
  clientTraceId?: string;
  /**
   * A comma-separated list of names defining the group of languages to return.
   * Allowed group names are: `translation`, `transliteration` and `dictionary`.
   * If no scope is given, then all groups are returned, which is equivalent to passing
   * `scope=translation,transliteration,dictionary`. To decide which set of supported languages
   * is appropriate for your scenario, see the description of the [response object](#response-body).
   */
  scope?: string;
  /**
   * The language to use for user interface strings. Some of the fields in the response are names of languages or
   * names of regions. Use this parameter to define the language in which these names are returned.
   * The language is specified by providing a well-formed BCP 47 language tag. For instance, use the value `fr`
   * to request names in French or use the value `zh-Hant` to request names in Chinese Traditional.
   * Names are provided in the English language when a target language is not specified or when localization
   * is not available.
   */
  acceptLanguage?: string;
  /**
   * Passing the value of the ETag response header in an If-None-Match field will allow the service to optimize the response.
   * If the resource has not been modified, the service will return status code 304 and an empty response body.
   */
  ifNoneMatch?: string;
}
