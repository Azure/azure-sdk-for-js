// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { AzureKeyCredential } from "@azure/core-auth";

export {
  FormContentType,
  FormRecognizerClientOptions,
  FormRecognizerOperationOptions
} from "./common";
export { RecognizeFormsOperationState } from "./lro/analyze/recognitionPoller";
export * from "./formRecognizerClient";
export * from "./formTrainingClient";
export * from "./models";
