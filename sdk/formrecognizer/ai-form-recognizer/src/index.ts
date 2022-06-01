// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Azure Cognitive Services [Form Recognizer](https://azure.microsoft.com/services/cognitive-services/form-recognizer/)
 * uses cloud-based machine learning to extract structured data from form documents.
 *
 * @packageDocumentation
 */

export { AzureKeyCredential } from "@azure/core-auth";
export { DocumentAnalysisClient } from "./documentAnalysisClient";
export { DocumentModelAdministrationClient } from "./documentModelAdministrationClient";
export {
  // Generated types used verbatim
  BoundingRegion,
  ContentType,
  CopyAuthorization,
  CurrencyValue,
  DocTypeInfo,
  DocumentBuildMode,
  DocumentEntity,
  DocumentFieldSchema,
  DocumentFieldType,
  DocumentKeyValueElement,
  DocumentKeyValuePair,
  DocumentSelectionMark,
  DocumentSignatureType,
  DocumentSpan,
  DocumentLanguage,
  DocumentStyle,
  DocumentTable,
  DocumentTableCell,
  DocumentTableCellKind,
  DocumentWord,
  LengthUnit,
  ModelInfo,
  ModelSummary,
  OperationInfo,
  OperationKind,
  OperationStatus,
  GetInfoResponse,
  CustomDocumentModelsInfo,
  AnalyzeResultOperationStatus,
  SelectionMarkState,
} from "./generated";
export {
  AnalysisPoller,
  AnalyzeResult,
  AnalyzeResultCommon,
  DocumentPage,
  DocumentLine,
  DocumentAnalysisPollOperationState,
  AnalyzedDocument,
  FormRecognizerRequestBody,
} from "./lro/analyze";
export { TrainingPoller, TrainingPollOperationState } from "./lro/training";
export * from "./models";
export * from "./options";
export * from "./prebuilt";
export { EnglishCapitalLetter, Acronymic } from "./util";
