// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Azure Cognitive Services [Form Recognizer](https://azure.microsoft.com/services/cognitive-services/form-recognizer/)
 * uses cloud-based machine learning to extract structured data from form documents.
 *
 * @packageDocumentation
 */

export { AzureKeyCredential } from "@azure/core-auth";
export { DocumentAnalysisClient } from "./documentAnalysisClient.js";
export { DocumentModelAdministrationClient } from "./documentModelAdministrationClient.js";
export {
  // Generated types used verbatim
  type AddressValue,
  type CopyAuthorization,
  type CurrencyValue,
  type DocumentTypeDetails,
  type DocumentBuildMode,
  type DocumentFieldSchema,
  type DocumentFieldType,
  type DocumentSignatureType,
  type DocumentSpan,
  type DocumentLanguage,
  type DocumentStyle,
  type FontStyle,
  type FontWeight,
  type DocumentTableCellKind,
  type LengthUnit,
  type DocumentModelDetails,
  type DocumentModelSummary,
  type OperationSummary,
  type OperationKind,
  type OperationStatus,
  type ResourceDetails,
  type CustomDocumentModelsDetails,
  type AnalyzeResultOperationStatus,
  type SelectionMarkState,
  type ParagraphRole,
  type OperationDetails,
  type ErrorModel,
  type InnerError,
  type OperationDetailsUnion,
  type DocumentModelBuildOperationDetails,
  type DocumentModelComposeOperationDetails,
  type DocumentModelCopyToOperationDetails,
  type DocumentClassifierBuildOperationDetails,
  type DocumentClassifierDetails,
  type ClassifierDocumentTypeDetails,
  type DocumentBarcodeKind,
  type DocumentFormulaKind,
  type QuotaDetails,
  // KnownXYZ enums
  KnownDocumentBuildMode,
  KnownDocumentFieldType,
  KnownDocumentBarcodeKind,
  KnownDocumentFormulaKind,
  KnownDocumentSignatureType,
  KnownDocumentTableCellKind,
  KnownFontStyle,
  KnownFontWeight,
  KnownLengthUnit,
  KnownOperationKind,
  KnownParagraphRole,
  KnownSelectionMarkState,
} from "./generated/index.js";
export type {
  AnalysisPoller,
  AnalyzeResult,
  AnalyzeResultCommon,
  DocumentAnalysisPollOperationState,
  AnalyzedDocument,
  FormRecognizerRequestBody,
} from "./lro/analysis.js";
export type {
  DocumentModelPoller,
  DocumentClassifierPoller,
  DocumentModelOperationState,
  DocumentClassifierOperationState,
  ModelAdministrationOperationStateCommon,
} from "./lro/administration.js";
export type * from "./models/index.js";
export * from "./options/index.js";
export * from "./documentModel.js";
export type { Point2D } from "./transforms/polygon.js";
export { KnownFormRecognizerAudience } from "./constants.js";
