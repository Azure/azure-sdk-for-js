// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";

export interface GetEmbeddingsOptions extends OperationOptions {}

export interface GetCompletionsOptions extends OperationOptions {}

export interface GetChatCompletionsOptions extends OperationOptions {}

export interface GetChatCompletionsWithAzureExtensionsOptions
  extends OperationOptions {}

export interface GetAzureBatchImageGenerationOperationStatusOptions
  extends OperationOptions {}

export interface BeginAzureBatchImageGenerationOptions
  extends OperationOptions {}
