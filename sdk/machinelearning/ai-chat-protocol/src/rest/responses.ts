// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { HttpResponse } from "@azure-rest/core-client";
import { ChatCompletionDeltaOutput, ChatCompletionOutput } from "./outputModels.js";

/** The request has succeeded. */
export interface CreateStreaming200Response extends HttpResponse {
  status: "200";
  body: ChatCompletionDeltaOutput;
}

/** The request has succeeded. */
export interface Create200Response extends HttpResponse {
  status: "200";
  body: ChatCompletionOutput;
}
