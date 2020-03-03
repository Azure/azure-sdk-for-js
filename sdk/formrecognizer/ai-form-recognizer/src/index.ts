// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export * from "./common";
export * from "./formRecognizerClient";
export * from "./customRecognizerClient";
export { CognitiveKeyCredential } from "./cognitiveKeyCredential";

export {
  DocumentResult,
  ErrorInformation,
  KeyValuePair,
  KeyValueElement,
  DataTable,
  DataTableCell,
  Language,
  TextLine,
  TextWord,
  LengthUnit,
  ModelInfo,
  ModelsModel,
  ModelStatus,
  OperationStatus,
  FieldValueType,
  PageResult,
  ReadResult,
  GetAnalyzeLayoutResultResponse,
  GetAnalyzeReceiptResultResponse,
  GetCustomModelsResponse
} from "./generated/models";

export * from "./models";
