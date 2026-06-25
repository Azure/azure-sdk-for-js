// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  StringIndexType,
  DocumentContentFormat,
  SplitMode,
  DocumentAnalysisFeature,
  AnalyzeOutputOption,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ClassifyDocumentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Method used to compute string offset and length. */
  stringIndexType?: StringIndexType;
  /** Document splitting mode. */
  split?: SplitMode;
  /** 1-based page numbers to analyze.  Ex. "1-3,5,7-9" */
  pages?: string;
}

/** Optional parameters. */
export interface GetAnalyzeBatchResultOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeleteAnalyzeBatchResultOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListAnalyzeBatchResultsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AnalyzeBatchDocumentsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** 1-based page numbers to analyze.  Ex. "1-3,5,7-9" */
  pages?: string;
  /**
   * Locale hint for text recognition and document analysis.  Value may contain only
   * the language code (ex. "en", "fr") or BCP 47 language tag (ex. "en-US").
   */
  locale?: string;
  /** Method used to compute string offset and length. */
  stringIndexType?: StringIndexType;
  /** List of optional analysis features. */
  features?: DocumentAnalysisFeature[];
  /** List of additional fields to extract.  Ex. "NumberOfGuests,StoreNumber" */
  queryFields?: string[];
  /** Format of the analyze result top-level content. */
  outputContentFormat?: DocumentContentFormat;
  /** Additional outputs to generate during analysis. */
  output?: AnalyzeOutputOption[];
}

/** Optional parameters. */
export interface DeleteAnalyzeResultOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetAnalyzeResultFigureOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetAnalyzeResultPdfOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AnalyzeDocumentOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** 1-based page numbers to analyze.  Ex. "1-3,5,7-9" */
  pages?: string;
  /**
   * Locale hint for text recognition and document analysis.  Value may contain only
   * the language code (ex. "en", "fr") or BCP 47 language tag (ex. "en-US").
   */
  locale?: string;
  /** Method used to compute string offset and length. */
  stringIndexType?: StringIndexType;
  /** List of optional analysis features. */
  features?: DocumentAnalysisFeature[];
  /** List of additional fields to extract.  Ex. "NumberOfGuests,StoreNumber" */
  queryFields?: string[];
  /** Format of the analyze result top-level content. */
  outputContentFormat?: DocumentContentFormat;
  /** Additional outputs to generate during analysis. */
  output?: AnalyzeOutputOption[];
}
