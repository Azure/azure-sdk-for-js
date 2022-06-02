// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions } from "@azure/core-client";
import { GeneratedClientOptionalParams } from "../generated";

/**
 * Valid values of the Form Recognizer service REST API version.
 */
export type FormRecognizerApiVersion =
  typeof FormRecognizerApiVersion[keyof typeof FormRecognizerApiVersion];

/**
 * Supported and common values of FormRecognizerApiVersion.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const FormRecognizerApiVersion = {
  /**
   * The newest version of the service known to be supported by the client (default).
   *
   * If using a beta package version, this will be identical to the latest preview version. Otherwise, it will be
   * identical to the latest stable version.
   */
  Latest: "2022-06-30-preview",
  // TODO (GA): Add a `Stable` version selector that picks the latest GA version, even in beta packages, and an exact
  // version entry for the GA version.
} as const;

/**
 * Valid string index types supported by the Form Recognizer service and SDK clients.
 */
export type StringIndexType = typeof StringIndexType[keyof typeof StringIndexType];

/**
 * Supported values of StringIndexType.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const StringIndexType = {
  /**
   * UTF-16 code units
   */
  Utf16CodeUnit: "utf16CodeUnit",
  /**
   * Unicode code points
   */
  UnicodeCodePoint: "unicodeCodePoint",
} as const;

/**
 * Default settings for Form Recognizer clients.
 *
 * @internal
 */
export const DEFAULT_GENERATED_CLIENT_OPTIONS: GeneratedClientOptionalParams = {
  stringIndexType: StringIndexType.Utf16CodeUnit,
  apiVersion: FormRecognizerApiVersion.Latest,
};

/**
 * Configurable options for the Form Recognizer service clients (DocumentAnalysisClient and
 * DocumentModelAdministrationClient).
 */
export interface FormRecognizerCommonClientOptions extends CommonClientOptions {
  /**
   * The version of the Form Recognizer REST API to call. Service versions 2.1 and lower (non-date-based versions) are
   * not supported by this client. To use API version 2.1, please use version 3 of the Azure Form Recognizer SDK for
   * JavaScript (\@azure/ai-form-recognizer\@^3.2.0).
   *
   * Default: FormRecognizerApiVersion.Latest ("2022-06-30-preview")
   */
  apiVersion?: FormRecognizerApiVersion;
}

/**
 * Configurable options for DocumentAnalysisClient.
 */
export interface DocumentAnalysisClientOptions extends FormRecognizerCommonClientOptions {
  /**
   * The unit of string offset/length values that the service returns.
   *
   * In JavaScript, strings are indexed by UTF-16 code units. Do _NOT_ set this value unless you are certain you need
   * Unicode code-point units instead.
   *
   * Default: "utf16CodeUnit"
   */
  stringIndexType?: StringIndexType;
}

/**
 * Configurable options for DocumentModelAdministrationClient.
 */
export interface DocumentModelAdministrationClientOptions
  extends FormRecognizerCommonClientOptions {}
