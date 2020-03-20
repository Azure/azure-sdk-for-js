// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions, OperationOptions } from "@azure/core-http";
import { FormRecognizerRequestBody } from './models';

/**
 * Client options used to configure FormRecognizer API requests.
 */
export interface FormRecognizerClientOptions extends PipelineOptions {}

/**
 * Options common to all form recognizer operations.
 */
export interface FormRecognizerOperationOptions extends OperationOptions {}

export function toRequestBody(body: FormRecognizerRequestBody): FormRecognizerRequestBody {
  if (typeof body === "string") {
    return JSON.stringify({
      source: body
    })
  } else {
    // conform to HttpRequestBody
    return (body as any)?.read && typeof ((body as any)?.read === "function")
      ? () => body as NodeJS.ReadableStream
      : body;
  }
}
