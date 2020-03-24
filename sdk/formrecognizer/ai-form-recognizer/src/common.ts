// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions, OperationOptions } from "@azure/core-http";
import { FormRecognizerRequestBody } from './models';

/**
 * Client options used to configure Form Recognizer API requests.
 */
export interface FormRecognizerClientOptions extends PipelineOptions {}

/**
 * Options common to all form recognizer operations.
 */
export interface FormRecognizerOperationOptions extends OperationOptions {}

/**
 * Translate the content to a format that is understood by Form Recognizer service
 * @internal
 */
export function toRequestBody(body: FormRecognizerRequestBody): FormRecognizerRequestBody {
  if (typeof body === "string") {
    return {
      source: body
    };
  } else {
    // conform to HttpRequestBody
    return (body as any)?.read && typeof ((body as any)?.read === "function")
      ? () => body as NodeJS.ReadableStream
      : body;
  }
}
