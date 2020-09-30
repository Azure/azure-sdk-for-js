// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dom-shims.d.ts" />

export { AzureKeyCredential } from "@azure/core-auth";

export {
  FormContentType,
  FormRecognizerClientOptions,
  FormRecognizerOperationOptions
} from "./common";
export * from "./formRecognizerClient";
export * from "./formTrainingClient";
export * from "./models";
