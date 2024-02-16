// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

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
