// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TranslateOptionalParams extends OperationOptions {
  /**
   * Specifies source language of the input document.
   * If this parameter isn't specified, automatic language detection is applied to determine the source language.
   * For example if the source document is written in English, then use sourceLanguage=en
   */
  sourceLanguage?: string;
  /**
   * A string specifying the category (domain) of the translation. This parameter is used to get translations
   * from a customized system built with Custom Translator. Add the Category ID from your Custom Translator
   * project details to this parameter to use your deployed customized system. Default value is: general.
   */
  category?: string;
  /** Deployment name of the custom translation model for the translation request. */
  deploymentName?: string;
  /**
   * Specifies that the service is allowed to fall back to a general system when a custom system doesn't exist.
   * Possible values are: true (default) or false.
   */
  allowFallback?: boolean;
  /** Optional boolean parameter to translate text within an image in the document */
  translateTextWithinImage?: boolean;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
