// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { EmbeddingsRequest, CompletionsRequest } from "./models";

export interface EmbeddingsBodyParam {
  body?: EmbeddingsRequest;
}

export type EmbeddingsParameters = EmbeddingsBodyParam & RequestParameters;

export interface CompletionsBodyParam {
  body?: CompletionsRequest;
}

export type CompletionsParameters = CompletionsBodyParam & RequestParameters;
