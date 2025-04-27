// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import type { RequestParameters } from "@azure-rest/core-client";
import type {
  StringIndexType,
  DocumentAnalysisFeature,
  DocumentContentFormat,
  AnalyzeOutputOption,
  AnalyzeDocumentRequest,
  AnalyzeBatchDocumentsRequest,
  BuildDocumentModelRequest,
  ComposeDocumentModelRequest,
  AuthorizeCopyRequest,
  ModelCopyAuthorization,
  BuildDocumentClassifierRequest,
  SplitMode,
  ClassifyDocumentRequest,
  AuthorizeClassifierCopyRequest,
  ClassifierCopyAuthorization,
} from "./models.js";

export interface ListOperationsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ListOperationsHeaderParam {
  headers?: RawHttpHeadersInput & ListOperationsHeaders;
}

export type ListOperationsParameters = ListOperationsHeaderParam & RequestParameters;

export interface GetDocumentModelBuildOperationHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface GetDocumentModelBuildOperationHeaderParam {
  headers?: RawHttpHeadersInput & GetDocumentModelBuildOperationHeaders;
}

export type GetDocumentModelBuildOperationParameters = GetDocumentModelBuildOperationHeaderParam &
  RequestParameters;

export interface GetDocumentModelComposeOperationHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface GetDocumentModelComposeOperationHeaderParam {
  headers?: RawHttpHeadersInput & GetDocumentModelComposeOperationHeaders;
}

export type GetDocumentModelComposeOperationParameters =
  GetDocumentModelComposeOperationHeaderParam & RequestParameters;

export interface GetDocumentModelCopyToOperationHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface GetDocumentModelCopyToOperationHeaderParam {
  headers?: RawHttpHeadersInput & GetDocumentModelCopyToOperationHeaders;
}

export type GetDocumentModelCopyToOperationParameters = GetDocumentModelCopyToOperationHeaderParam &
  RequestParameters;

export interface GetDocumentClassifierCopyToOperationHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface GetDocumentClassifierCopyToOperationHeaderParam {
  headers?: RawHttpHeadersInput & GetDocumentClassifierCopyToOperationHeaders;
}

export type GetDocumentClassifierCopyToOperationParameters =
  GetDocumentClassifierCopyToOperationHeaderParam & RequestParameters;

export interface GetDocumentClassifierBuildOperationHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface GetDocumentClassifierBuildOperationHeaderParam {
  headers?: RawHttpHeadersInput & GetDocumentClassifierBuildOperationHeaders;
}

export type GetDocumentClassifierBuildOperationParameters =
  GetDocumentClassifierBuildOperationHeaderParam & RequestParameters;

export interface GetOperationHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface GetOperationHeaderParam {
  headers?: RawHttpHeadersInput & GetOperationHeaders;
}

export type GetOperationParameters = GetOperationHeaderParam & RequestParameters;
export type GetResourceDetailsParameters = RequestParameters;
export type GetAnalyzeResultParameters = RequestParameters;
export type GetAnalyzeResultPdfParameters = RequestParameters;
export type GetAnalyzeResultFigureParameters = RequestParameters;
export type DeleteAnalyzeResultParameters = RequestParameters;

export interface AnalyzeDocumentFromStreamBodyParam {
  /**
   * Input content.
   *
   * Value may contain any sequence of octets
   */
  body: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream;
}

/** This is the wrapper object for the parameter `features` with explode set to false and style set to form. */
export interface AnalyzeDocumentFromStreamFeaturesQueryParam {
  /** Value of the parameter */
  value: DocumentAnalysisFeature[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `queryFields` with explode set to false and style set to form. */
export interface AnalyzeDocumentFromStreamQueryFieldsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `output` with explode set to false and style set to form. */
export interface AnalyzeDocumentFromStreamOutputQueryParam {
  /** Value of the parameter */
  value: AnalyzeOutputOption[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface AnalyzeDocumentFromStreamQueryParamProperties {
  /** 1-based page numbers to analyze.  Ex. "1-3,5,7-9" */
  pages?: string;
  /**
   * Locale hint for text recognition and document analysis.  Value may contain only
   * the language code (ex. "en", "fr") or BCP 47 language tag (ex. "en-US").
   */
  locale?: string;
  /**
   * Method used to compute string offset and length.
   *
   * Possible values: "textElements", "unicodeCodePoint", "utf16CodeUnit"
   */
  stringIndexType?: StringIndexType;
  /** List of optional analysis features. */
  features?: DocumentAnalysisFeature[] | AnalyzeDocumentFromStreamFeaturesQueryParam;
  /** List of additional fields to extract.  Ex. "NumberOfGuests,StoreNumber" */
  queryFields?: string[] | AnalyzeDocumentFromStreamQueryFieldsQueryParam;
  /**
   * Format of the analyze result top-level content.
   *
   * Possible values: "text", "markdown"
   */
  outputContentFormat?: DocumentContentFormat;
  /** Additional outputs to generate during analysis. */
  output?: AnalyzeOutputOption[] | AnalyzeDocumentFromStreamOutputQueryParam;
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

export type AnalyzeDocumentFromStreamParameters = AnalyzeDocumentFromStreamQueryParam &
  AnalyzeDocumentFromStreamMediaTypesParam &
  AnalyzeDocumentFromStreamBodyParam &
  RequestParameters;

export interface AnalyzeDocumentBodyParam {
  /** Analyze request parameters. */
  body: AnalyzeDocumentRequest;
}

/** This is the wrapper object for the parameter `features` with explode set to false and style set to form. */
export interface AnalyzeDocumentFeaturesQueryParam {
  /** Value of the parameter */
  value: DocumentAnalysisFeature[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `queryFields` with explode set to false and style set to form. */
export interface AnalyzeDocumentQueryFieldsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `output` with explode set to false and style set to form. */
export interface AnalyzeDocumentOutputQueryParam {
  /** Value of the parameter */
  value: AnalyzeOutputOption[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface AnalyzeDocumentQueryParamProperties {
  /** 1-based page numbers to analyze.  Ex. "1-3,5,7-9" */
  pages?: string;
  /**
   * Locale hint for text recognition and document analysis.  Value may contain only
   * the language code (ex. "en", "fr") or BCP 47 language tag (ex. "en-US").
   */
  locale?: string;
  /**
   * Method used to compute string offset and length.
   *
   * Possible values: "textElements", "unicodeCodePoint", "utf16CodeUnit"
   */
  stringIndexType?: StringIndexType;
  /** List of optional analysis features. */
  features?: DocumentAnalysisFeature[] | AnalyzeDocumentFeaturesQueryParam;
  /** List of additional fields to extract.  Ex. "NumberOfGuests,StoreNumber" */
  queryFields?: string[] | AnalyzeDocumentQueryFieldsQueryParam;
  /**
   * Format of the analyze result top-level content.
   *
   * Possible values: "text", "markdown"
   */
  outputContentFormat?: DocumentContentFormat;
  /** Additional outputs to generate during analysis. */
  output?: AnalyzeOutputOption[] | AnalyzeDocumentOutputQueryParam;
}

export interface AnalyzeDocumentQueryParam {
  queryParameters?: AnalyzeDocumentQueryParamProperties;
}

export interface AnalyzeDocumentMediaTypesParam {
  /** Input content type. */
  contentType: "application/json";
}

export type AnalyzeDocumentParameters = AnalyzeDocumentQueryParam &
  AnalyzeDocumentMediaTypesParam &
  AnalyzeDocumentBodyParam &
  RequestParameters;
export type GetAnalyzeBatchResultParameters = RequestParameters;

export interface AnalyzeBatchDocumentsBodyParam {
  /** Analyze batch request parameters. */
  body: AnalyzeBatchDocumentsRequest;
}

/** This is the wrapper object for the parameter `features` with explode set to false and style set to form. */
export interface AnalyzeBatchDocumentsFeaturesQueryParam {
  /** Value of the parameter */
  value: DocumentAnalysisFeature[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `queryFields` with explode set to false and style set to form. */
export interface AnalyzeBatchDocumentsQueryFieldsQueryParam {
  /** Value of the parameter */
  value: string[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

/** This is the wrapper object for the parameter `output` with explode set to false and style set to form. */
export interface AnalyzeBatchDocumentsOutputQueryParam {
  /** Value of the parameter */
  value: AnalyzeOutputOption[];
  /** Should we explode the value? */
  explode: false;
  /** Style of the value */
  style: "form";
}

export interface AnalyzeBatchDocumentsQueryParamProperties {
  /** 1-based page numbers to analyze.  Ex. "1-3,5,7-9" */
  pages?: string;
  /**
   * Locale hint for text recognition and document analysis.  Value may contain only
   * the language code (ex. "en", "fr") or BCP 47 language tag (ex. "en-US").
   */
  locale?: string;
  /**
   * Method used to compute string offset and length.
   *
   * Possible values: "textElements", "unicodeCodePoint", "utf16CodeUnit"
   */
  stringIndexType?: StringIndexType;
  /** List of optional analysis features. */
  features?: DocumentAnalysisFeature[] | AnalyzeBatchDocumentsFeaturesQueryParam;
  /** List of additional fields to extract.  Ex. "NumberOfGuests,StoreNumber" */
  queryFields?: string[] | AnalyzeBatchDocumentsQueryFieldsQueryParam;
  /**
   * Format of the analyze result top-level content.
   *
   * Possible values: "text", "markdown"
   */
  outputContentFormat?: DocumentContentFormat;
  /** Additional outputs to generate during analysis. */
  output?: AnalyzeOutputOption[] | AnalyzeBatchDocumentsOutputQueryParam;
}

export interface AnalyzeBatchDocumentsQueryParam {
  queryParameters?: AnalyzeBatchDocumentsQueryParamProperties;
}

export interface AnalyzeBatchDocumentsMediaTypesParam {
  /** Input content type */
  contentType: "application/json";
}

export type AnalyzeBatchDocumentsParameters = AnalyzeBatchDocumentsQueryParam &
  AnalyzeBatchDocumentsMediaTypesParam &
  AnalyzeBatchDocumentsBodyParam &
  RequestParameters;
export type ListAnalyzeBatchResultsParameters = RequestParameters;
export type DeleteAnalyzeBatchResultParameters = RequestParameters;

export interface GetModelHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface GetModelHeaderParam {
  headers?: RawHttpHeadersInput & GetModelHeaders;
}

export type GetModelParameters = GetModelHeaderParam & RequestParameters;

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

export type AuthorizeModelCopyParameters = AuthorizeModelCopyBodyParam & RequestParameters;

export interface CopyModelToBodyParam {
  /** Copy to request parameters. */
  body: ModelCopyAuthorization;
}

export type CopyModelToParameters = CopyModelToBodyParam & RequestParameters;

export interface ListModelsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ListModelsHeaderParam {
  headers?: RawHttpHeadersInput & ListModelsHeaders;
}

export type ListModelsParameters = ListModelsHeaderParam & RequestParameters;

export interface DeleteModelHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeleteModelHeaderParam {
  headers?: RawHttpHeadersInput & DeleteModelHeaders;
}

export type DeleteModelParameters = DeleteModelHeaderParam & RequestParameters;

export interface BuildClassifierBodyParam {
  /** Build request parameters. */
  body: BuildDocumentClassifierRequest;
}

export type BuildClassifierParameters = BuildClassifierBodyParam & RequestParameters;

export interface ListClassifiersHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ListClassifiersHeaderParam {
  headers?: RawHttpHeadersInput & ListClassifiersHeaders;
}

export type ListClassifiersParameters = ListClassifiersHeaderParam & RequestParameters;

export interface GetClassifierHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface GetClassifierHeaderParam {
  headers?: RawHttpHeadersInput & GetClassifierHeaders;
}

export type GetClassifierParameters = GetClassifierHeaderParam & RequestParameters;

export interface DeleteClassifierHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeleteClassifierHeaderParam {
  headers?: RawHttpHeadersInput & DeleteClassifierHeaders;
}

export type DeleteClassifierParameters = DeleteClassifierHeaderParam & RequestParameters;

export interface ClassifyDocumentFromStreamBodyParam {
  /**
   * Input content.
   *
   * Value may contain any sequence of octets
   */
  body: string | Uint8Array | ReadableStream<Uint8Array> | NodeJS.ReadableStream;
}

export interface ClassifyDocumentFromStreamQueryParamProperties {
  /**
   * Method used to compute string offset and length.
   *
   * Possible values: "textElements", "unicodeCodePoint", "utf16CodeUnit"
   */
  stringIndexType?: StringIndexType;
  /**
   * Document splitting mode.
   *
   * Possible values: "auto", "none", "perPage"
   */
  split?: SplitMode;
  /** 1-based page numbers to analyze.  Ex. "1-3,5,7-9" */
  pages?: string;
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

export type ClassifyDocumentFromStreamParameters = ClassifyDocumentFromStreamQueryParam &
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
   * Possible values: "textElements", "unicodeCodePoint", "utf16CodeUnit"
   */
  stringIndexType?: StringIndexType;
  /**
   * Document splitting mode.
   *
   * Possible values: "auto", "none", "perPage"
   */
  split?: SplitMode;
  /** 1-based page numbers to analyze.  Ex. "1-3,5,7-9" */
  pages?: string;
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

export interface AuthorizeClassifierCopyBodyParam {
  /** Authorize copy request parameters. */
  body: AuthorizeClassifierCopyRequest;
}

export type AuthorizeClassifierCopyParameters = AuthorizeClassifierCopyBodyParam &
  RequestParameters;

export interface CopyClassifierToBodyParam {
  /** Copy to request parameters. */
  body: ClassifierCopyAuthorization;
}

export type CopyClassifierToParameters = CopyClassifierToBodyParam & RequestParameters;
