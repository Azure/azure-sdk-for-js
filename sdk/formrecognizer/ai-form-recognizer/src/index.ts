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
  AddressValue,
  CopyAuthorization,
  CurrencyValue,
  DocumentTypeDetails,
  DocumentBuildMode,
  DocumentFieldSchema,
  DocumentFieldType,
  DocumentSignatureType,
  DocumentSpan,
  DocumentLanguage,
  DocumentStyle,
  FontStyle,
  FontWeight,
  DocumentTableCellKind,
  LengthUnit,
  DocumentModelDetails,
  DocumentModelSummary,
  OperationSummary,
  OperationKind,
  OperationStatus,
  ResourceDetails,
  CustomDocumentModelsDetails,
  AnalyzeResultOperationStatus,
  SelectionMarkState,
  ParagraphRole,
  OperationDetails,
  ErrorModel,
  InnerError,
  OperationDetailsUnion,
  DocumentModelBuildOperationDetails,
  DocumentModelComposeOperationDetails,
  DocumentModelCopyToOperationDetails,
  DocumentClassifierBuildOperationDetails,
  DocumentClassifierDetails,
  ClassifierDocumentTypeDetails,
  DocumentBarcodeKind,
  DocumentFormulaKind,
  QuotaDetails,
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
export {
  AnalysisPoller,
  AnalyzeResult,
  AnalyzeResultCommon,
  DocumentAnalysisPollOperationState,
  AnalyzedDocument,
  FormRecognizerRequestBody,
} from "./lro/analysis.js";
export {
  DocumentModelPoller,
  DocumentClassifierPoller,
  DocumentModelOperationState,
  DocumentClassifierOperationState,
  ModelAdministrationOperationStateCommon,
} from "./lro/administration.js";
export * from "./models/index.js";
export * from "./options/index.js";
export * from "./documentModel.js";
export { Point2D } from "./transforms/polygon.js";
export { KnownFormRecognizerAudience } from "./constants.js";
