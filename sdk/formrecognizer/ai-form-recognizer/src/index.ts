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
  DocumentModelInfo,
  DocumentModelSummary,
  OperationSummary,
  OperationKind,
  OperationStatus,
  ResourceInfo,
  CustomDocumentModelsInfo,
  AnalyzeResultOperationStatus,
  SelectionMarkState,
  ParagraphRole,
  DocumentPageKind,
  GetOperationResponse,
  OperationInfo,
  ErrorModel,
  InnerError,
} from "./generated";
export {
  AnalysisPoller,
  AnalyzeResult,
  AnalyzeResultCommon,
  DocumentAnalysisPollOperationState,
  AnalyzedDocument,
  FormRecognizerRequestBody,
} from "./lro/analysis";
export { DocumentModelPoller, DocumentModelOperationState } from "./lro/administration";
export * from "./models";
export * from "./options";
export * from "./prebuilt";
export { EnglishCapitalLetter, Acronymic } from "./util";
export { Point2D } from "./transforms/polygon";
