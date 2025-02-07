// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError } from "@azure-rest/core-client";
import type { RestErrorOptions } from "@azure/core-rest-pipeline";
import { RestError } from "@azure/core-rest-pipeline";

interface OpenAIErrorOptions extends RestErrorOptions {
  param?: string;
  type?: string;
}

export class OpenAIError extends RestError {
  readonly param?: string;
  readonly type?: string;

  constructor(message: string, OpenAIErrorOptions: OpenAIErrorOptions = {}) {
    super(message, OpenAIErrorOptions);
    this.param = OpenAIErrorOptions?.param;
    this.type = OpenAIErrorOptions?.type;
  }
}

export function createOpenAIError(response: PathUncheckedResponse): OpenAIError {
  const internalError = response.body.error || response.body;
  let restError: RestError;
  if (typeof internalError === "string") {
    restError = createRestError(internalError, response);
  } else {
    restError = createRestError(response);
  }

  return new OpenAIError(restError.message, {
    statusCode: restError?.statusCode,
    code: restError?.code,
    request: restError?.request,
    response: restError?.response,
    param: internalError?.param,
    type: internalError?.type,
  });
}
