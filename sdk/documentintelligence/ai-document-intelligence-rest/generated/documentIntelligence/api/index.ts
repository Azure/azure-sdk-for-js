// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type {
  DocumentIntelligenceContext,
  DocumentIntelligenceClientOptionalParams,
} from "./documentIntelligenceContext.js";
export { createDocumentIntelligence } from "./documentIntelligenceContext.js";
export {
  classifyDocument,
  getAnalyzeBatchResult,
  deleteAnalyzeBatchResult,
  listAnalyzeBatchResults,
  analyzeBatchDocuments,
  deleteAnalyzeResult,
  getAnalyzeResultFigure,
  getAnalyzeResultPdf,
  analyzeDocument,
} from "./operations.js";
export type {
  ClassifyDocumentOptionalParams,
  GetAnalyzeBatchResultOptionalParams,
  DeleteAnalyzeBatchResultOptionalParams,
  ListAnalyzeBatchResultsOptionalParams,
  AnalyzeBatchDocumentsOptionalParams,
  DeleteAnalyzeResultOptionalParams,
  GetAnalyzeResultFigureOptionalParams,
  GetAnalyzeResultPdfOptionalParams,
  AnalyzeDocumentOptionalParams,
} from "./options.js";
