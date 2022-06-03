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
  AddressValue,
  CopyAuthorization,
  CurrencyValue,
  DocTypeInfo,
  DocumentBuildMode,
  DocumentFieldSchema,
  DocumentFieldType,
  DocumentSignatureType,
  DocumentSpan,
  DocumentLanguage,
  DocumentStyle,
  DocumentTableCellKind,
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
  ParagraphRole,
  DocumentPageKind,
} from "./generated";
export {
  AnalysisPoller,
  AnalyzeResult,
  AnalyzeResultCommon,
  DocumentAnalysisPollOperationState,
  AnalyzedDocument,
  FormRecognizerRequestBody,
} from "./lro/analyze";
export { TrainingPoller, TrainingPollOperationState } from "./lro/training";
export * from "./models";
export * from "./options";
export * from "./prebuilt";
export { EnglishCapitalLetter, Acronymic } from "./util";
export { Point2D } from "./transforms/polygon";
