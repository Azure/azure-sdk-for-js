// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OpenAIContext } from "../../api/OpenAIContext.js";
import {
  ClientOpenAIClientOperations,
  getClientOpenAIClientOperations,
} from "./openAIClient/index.js";

export interface ClientOperations {
  openAIClient: ClientOpenAIClientOperations;
}

export function getClientOperations(context: OpenAIContext): ClientOperations {
  return {
    openAIClient: getClientOpenAIClientOperations(context),
  };
}
