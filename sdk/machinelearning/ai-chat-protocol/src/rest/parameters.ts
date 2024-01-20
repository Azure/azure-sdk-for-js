// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { RequestParameters } from "@azure-rest/core-client";
import { StreamingChatCompletionOptions, ChatCompletionOptions } from "./models.js";

export interface CreateStreamingBodyParam {
  body?: StreamingChatCompletionOptions;
}

export type CreateStreamingParameters = CreateStreamingBodyParam & RequestParameters;

export interface CreateBodyParam {
  body?: ChatCompletionOptions;
}

export type CreateParameters = CreateBodyParam & RequestParameters;
