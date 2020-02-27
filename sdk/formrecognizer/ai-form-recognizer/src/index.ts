// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { FormRecognizerClient, FormRecognizerClientOptions } from "./formRecognizerClient";
export { CustomRecognizerClient } from "./customRecognizerClient";
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
  OperationStatus,
  FieldValueType,
  PageResult,
  ReadResult,
  GetCustomModelsResponse
} from "./generated/models";

export * from "./models";
