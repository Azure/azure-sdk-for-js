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
import {
  EmbeddingsOptions,
  CompletionsOptions,
  ChatCompletionsOptions,
  ImageGenerationOptions,
} from "./models.js";

export interface GetEmbeddingsBodyParam {
  body?: EmbeddingsOptions;
}

export type GetEmbeddingsParameters = GetEmbeddingsBodyParam & RequestParameters;

export interface GetCompletionsBodyParam {
  body?: CompletionsOptions;
}

export type GetCompletionsParameters = GetCompletionsBodyParam & RequestParameters;

export interface GetChatCompletionsBodyParam {
  body?: ChatCompletionsOptions;
}

export type GetChatCompletionsParameters = GetChatCompletionsBodyParam & RequestParameters;

export interface GetChatCompletionsWithAzureExtensionsBodyParam {
  body?: ChatCompletionsOptions;
}

export type GetChatCompletionsWithAzureExtensionsParameters =
  GetChatCompletionsWithAzureExtensionsBodyParam & RequestParameters;
export type GetAzureBatchImageGenerationOperationStatusParameters = RequestParameters;

export interface BeginAzureBatchImageGenerationBodyParam {
  body?: ImageGenerationOptions;
}

export type BeginAzureBatchImageGenerationParameters = BeginAzureBatchImageGenerationBodyParam &
  RequestParameters;
