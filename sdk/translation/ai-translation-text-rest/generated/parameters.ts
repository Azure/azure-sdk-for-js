// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import {
  TextType,
  ProfanityAction,
  ProfanityMarker,
  InputTextItem,
  DictionaryExampleTextItem,
} from "./models.js";

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
  body: Array<InputTextItem>;
}

export interface TranslateQueryParamProperties {
  /**
   * Specifies the language of the output text. The target language must be one of the supported languages included
   * in the translation scope. For example, use to=de to translate to German.
   * It's possible to translate to multiple languages simultaneously by repeating the parameter in the query string.
   * For example, use to=de&to=it to translate to German and Italian. This parameter needs to be formatted as multi collection, we provide buildMultiCollection from serializeHelper.ts to help, you will probably need to set skipUrlEncoding as true when sending the request
   */
  to: string;
  /**
   * Specifies the language of the input text. Find which languages are available to translate from by
   * looking up supported languages using the translation scope. If the from parameter isn't specified,
   * automatic language detection is applied to determine the source language.
   *
   * You must use the from parameter rather than autodetection when using the dynamic dictionary feature.
   * Note: the dynamic dictionary feature is case-sensitive.
   */
  from?: string;
  /**
   * Defines whether the text being translated is plain text or HTML text. Any HTML needs to be a well-formed,
   * complete element. Possible values are: plain (default) or html.
   *
   * Possible values: "Plain", "Html"
   */
  textType?: TextType;
  /**
   * A string specifying the category (domain) of the translation. This parameter is used to get translations
   * from a customized system built with Custom Translator. Add the Category ID from your Custom Translator
   * project details to this parameter to use your deployed customized system. Default value is: general.
   */
  category?: string;
  /**
   * Specifies how profanities should be treated in translations.
   * Possible values are: NoAction (default), Marked or Deleted.
   */
  profanityAction?: ProfanityAction;
  /**
   * Specifies how profanities should be marked in translations.
   * Possible values are: Asterisk (default) or Tag.
   */
  profanityMarker?: ProfanityMarker;
  /**
   * Specifies whether to include alignment projection from source text to translated text.
   * Possible values are: true or false (default).
   */
  includeAlignment?: boolean;
  /**
   * Specifies whether to include sentence boundaries for the input text and the translated text.
   * Possible values are: true or false (default).
   */
  includeSentenceLength?: boolean;
  /**
   * Specifies a fallback language if the language of the input text can't be identified.
   * Language autodetection is applied when the from parameter is omitted. If detection fails,
   * the suggestedFrom language will be assumed.
   */
  suggestedFrom?: string;
  /** Specifies the script of the input text. */
  fromScript?: string;
  /** Specifies the script of the translated text. */
  toScript?: string;
  /**
   * Specifies that the service is allowed to fall back to a general system when a custom system doesn't exist.
   * Possible values are: true (default) or false.
   *
   * allowFallback=false specifies that the translation should only use systems trained for the category specified
   * by the request. If a translation for language X to language Y requires chaining through a pivot language E,
   * then all the systems in the chain (X → E and E → Y) will need to be custom and have the same category.
   * If no system is found with the specific category, the request will return a 400 status code. allowFallback=true
   * specifies that the service is allowed to fall back to a general system when a custom system doesn't exist.
   */
  allowFallback?: boolean;
}

export interface TranslateQueryParam {
  queryParameters: TranslateQueryParamProperties;
}

export interface TranslateHeaderParam {
  headers?: RawHttpHeadersInput & TranslateHeaders;
}

export type TranslateParameters = TranslateQueryParam &
  TranslateHeaderParam &
  TranslateBodyParam &
  RequestParameters;

export interface TransliterateHeaders {
  /** A client-generated GUID to uniquely identify the request. */
  "X-ClientTraceId"?: string;
}

export interface TransliterateBodyParam {
  /** Defines the content of the request */
  body: Array<InputTextItem>;
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

export interface FindSentenceBoundariesHeaders {
  /** A client-generated GUID to uniquely identify the request. */
  "X-ClientTraceId"?: string;
}

export interface FindSentenceBoundariesBodyParam {
  /** Defines the content of the request */
  body: Array<InputTextItem>;
}

export interface FindSentenceBoundariesQueryParamProperties {
  /**
   * Language tag identifying the language of the input text.
   * If a code isn't specified, automatic language detection will be applied.
   */
  language?: string;
  /**
   * Script tag identifying the script used by the input text.
   * If a script isn't specified, the default script of the language will be assumed.
   */
  script?: string;
}

export interface FindSentenceBoundariesQueryParam {
  queryParameters?: FindSentenceBoundariesQueryParamProperties;
}

export interface FindSentenceBoundariesHeaderParam {
  headers?: RawHttpHeadersInput & FindSentenceBoundariesHeaders;
}

export type FindSentenceBoundariesParameters =
  FindSentenceBoundariesQueryParam &
    FindSentenceBoundariesHeaderParam &
    FindSentenceBoundariesBodyParam &
    RequestParameters;

export interface LookupDictionaryEntriesHeaders {
  /** A client-generated GUID to uniquely identify the request. */
  "X-ClientTraceId"?: string;
}

export interface LookupDictionaryEntriesBodyParam {
  /** Defines the content of the request */
  body: Array<InputTextItem>;
}

export interface LookupDictionaryEntriesQueryParamProperties {
  /**
   * Specifies the language of the input text.
   * The source language must be one of the supported languages included in the dictionary scope.
   */
  from: string;
  /**
   * Specifies the language of the output text.
   * The target language must be one of the supported languages included in the dictionary scope.
   */
  to: string;
}

export interface LookupDictionaryEntriesQueryParam {
  queryParameters: LookupDictionaryEntriesQueryParamProperties;
}

export interface LookupDictionaryEntriesHeaderParam {
  headers?: RawHttpHeadersInput & LookupDictionaryEntriesHeaders;
}

export type LookupDictionaryEntriesParameters =
  LookupDictionaryEntriesQueryParam &
    LookupDictionaryEntriesHeaderParam &
    LookupDictionaryEntriesBodyParam &
    RequestParameters;

export interface LookupDictionaryExamplesHeaders {
  /** A client-generated GUID to uniquely identify the request. */
  "X-ClientTraceId"?: string;
}

export interface LookupDictionaryExamplesBodyParam {
  /** Defines the content of the request */
  body: Array<DictionaryExampleTextItem>;
}

export interface LookupDictionaryExamplesQueryParamProperties {
  /**
   * Specifies the language of the input text.
   * The source language must be one of the supported languages included in the dictionary scope.
   */
  from: string;
  /**
   * Specifies the language of the output text.
   * The target language must be one of the supported languages included in the dictionary scope.
   */
  to: string;
}

export interface LookupDictionaryExamplesQueryParam {
  queryParameters: LookupDictionaryExamplesQueryParamProperties;
}

export interface LookupDictionaryExamplesHeaderParam {
  headers?: RawHttpHeadersInput & LookupDictionaryExamplesHeaders;
}

export type LookupDictionaryExamplesParameters =
  LookupDictionaryExamplesQueryParam &
    LookupDictionaryExamplesHeaderParam &
    LookupDictionaryExamplesBodyParam &
    RequestParameters;
