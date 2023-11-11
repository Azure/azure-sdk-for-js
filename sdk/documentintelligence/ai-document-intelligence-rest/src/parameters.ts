// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AnalyzeDocumentRequest,
  BuildDocumentModelRequest,
  ComposeDocumentModelRequest,
  AuthorizeCopyRequest,
  CopyAuthorization,
  BuildDocumentClassifierRequest,
  ClassifyDocumentRequest,
} from "./models";

export type ListOperationsParameters = RequestParameters;
export type GetDocumentModelBuildOperationParameters = RequestParameters;
export type GetDocumentModelComposeOperationParameters = RequestParameters;
export type GetDocumentModelCopyToOperationParameters = RequestParameters;
export type GetDocumentClassifierBuildOperationParameters = RequestParameters;
export type GetOperationParameters = RequestParameters;
export type GetResourceInfoParameters = RequestParameters;
export type GetAnalyzeResultParameters = RequestParameters;

export interface AnalyzeDocumentFromStreamBodyParam {
  /**
   * Input content.
   *
   * Value may contain any sequence of octets
   */
  body:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
}

export interface AnalyzeDocumentFromStreamQueryParamProperties {
  /** List of 1-based page numbers to analyze.  Ex. "1-3,5,7-9" */
  pages?: string;
  /**
   * Locale hint for text recognition and document analysis.  Value may contain only
   * the language code (ex. "en", "fr") or BCP 47 language tag (ex. "en-US").
   */
  locale?: string;
  /**
   * Method used to compute string offset and length.
   *
   * Possible values: textElements, unicodeCodePoint, utf16CodeUnit
   */
  stringIndexType?: string;
  /** List of optional analysis features. */
  features?: string[];
  /** List of additional fields to extract.  Ex. "NumberOfGuests,StoreNumber" */
  queryFields?: string[];
  /**
   * Format of the analyze result top-level content.
   *
   * Possible values: text, markdown
   */
  outputContentFormat?: string;
}

export interface AnalyzeDocumentFromStreamQueryParam {
  queryParameters?: AnalyzeDocumentFromStreamQueryParamProperties;
}

export interface AnalyzeDocumentFromStreamMediaTypesParam {
  /** Input content type. */
  contentType:
    | "application/octet-stream"
    | "application/pdf"
    | "image/jpeg"
    | "image/png"
    | "image/tiff"
    | "image/bmp"
    | "image/heif"
    | "text/html"
    | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    | "application/vnd.openxmlformats-officedocument.presentationml.presentation";
}

export type AnalyzeDocumentFromStreamParameters =
  AnalyzeDocumentFromStreamQueryParam &
    AnalyzeDocumentFromStreamMediaTypesParam &
    AnalyzeDocumentFromStreamBodyParam &
    RequestParameters;

export interface AnalyzeDocumentBodyParam {
  /** Analyze request parameters. */
  body?: AnalyzeDocumentRequest;
}

export interface AnalyzeDocumentQueryParamProperties {
  /** List of 1-based page numbers to analyze.  Ex. "1-3,5,7-9" */
  pages?: string;
  /**
   * Locale hint for text recognition and document analysis.  Value may contain only
   * the language code (ex. "en", "fr") or BCP 47 language tag (ex. "en-US").
   */
  locale?: string;
  /**
   * Method used to compute string offset and length.
   *
   * Possible values: textElements, unicodeCodePoint, utf16CodeUnit
   */
  stringIndexType?: string;
  /** List of optional analysis features. */
  features?: string[];
  /** List of additional fields to extract.  Ex. "NumberOfGuests,StoreNumber" */
  queryFields?: string[];
  /**
   * Format of the analyze result top-level content.
   *
   * Possible values: text, markdown
   */
  outputContentFormat?: string;
}

export interface AnalyzeDocumentQueryParam {
  queryParameters?: AnalyzeDocumentQueryParamProperties;
}

export interface AnalyzeDocumentMediaTypesParam {
  /** Input content type */
  contentType: "application/json";
}

export type AnalyzeDocumentParameters = AnalyzeDocumentQueryParam &
  AnalyzeDocumentMediaTypesParam &
  AnalyzeDocumentBodyParam &
  RequestParameters;
export type GetModelParameters = RequestParameters;

export interface BuildModelBodyParam {
  /** Build request parameters. */
  body: BuildDocumentModelRequest;
}

export type BuildModelParameters = BuildModelBodyParam & RequestParameters;

export interface ComposeModelBodyParam {
  /** Compose request parameters. */
  body: ComposeDocumentModelRequest;
}

export type ComposeModelParameters = ComposeModelBodyParam & RequestParameters;

export interface AuthorizeModelCopyBodyParam {
  /** Authorize copy request parameters. */
  body: AuthorizeCopyRequest;
}

export type AuthorizeModelCopyParameters = AuthorizeModelCopyBodyParam &
  RequestParameters;

export interface CopyModelToBodyParam {
  /** Copy to request parameters. */
  body: CopyAuthorization;
}

export type CopyModelToParameters = CopyModelToBodyParam & RequestParameters;
export type ListModelsParameters = RequestParameters;
export type DeleteModelParameters = RequestParameters;

export interface BuildClassifierBodyParam {
  /** Build request parameters. */
  body: BuildDocumentClassifierRequest;
}

export type BuildClassifierParameters = BuildClassifierBodyParam &
  RequestParameters;
export type ListClassifiersParameters = RequestParameters;
export type GetClassifierParameters = RequestParameters;
export type DeleteClassifierParameters = RequestParameters;

export interface ClassifyDocumentFromStreamBodyParam {
  /**
   * Input content.
   *
   * Value may contain any sequence of octets
   */
  body:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
}

export interface ClassifyDocumentFromStreamQueryParamProperties {
  /**
   * Method used to compute string offset and length.
   *
   * Possible values: textElements, unicodeCodePoint, utf16CodeUnit
   */
  stringIndexType?: string;
  /**
   * Document splitting mode.
   *
   * Possible values: auto, none, perPage
   */
  split?: string;
}

export interface ClassifyDocumentFromStreamQueryParam {
  queryParameters?: ClassifyDocumentFromStreamQueryParamProperties;
}

export interface ClassifyDocumentFromStreamMediaTypesParam {
  /** Input content type. */
  contentType:
    | "application/octet-stream"
    | "application/pdf"
    | "image/jpeg"
    | "image/png"
    | "image/tiff"
    | "image/bmp"
    | "image/heif"
    | "text/html"
    | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    | "application/vnd.openxmlformats-officedocument.presentationml.presentation";
}

export type ClassifyDocumentFromStreamParameters =
  ClassifyDocumentFromStreamQueryParam &
    ClassifyDocumentFromStreamMediaTypesParam &
    ClassifyDocumentFromStreamBodyParam &
    RequestParameters;

export interface ClassifyDocumentBodyParam {
  /** Classify request parameters. */
  body: ClassifyDocumentRequest;
}

export interface ClassifyDocumentQueryParamProperties {
  /**
   * Method used to compute string offset and length.
   *
   * Possible values: textElements, unicodeCodePoint, utf16CodeUnit
   */
  stringIndexType?: string;
  /**
   * Document splitting mode.
   *
   * Possible values: auto, none, perPage
   */
  split?: string;
}

export interface ClassifyDocumentQueryParam {
  queryParameters?: ClassifyDocumentQueryParamProperties;
}

export interface ClassifyDocumentMediaTypesParam {
  /** Input content type */
  contentType: "application/json";
}

export type ClassifyDocumentParameters = ClassifyDocumentQueryParam &
  ClassifyDocumentMediaTypesParam &
  ClassifyDocumentBodyParam &
  RequestParameters;
export type GetClassifyResultParameters = RequestParameters;
