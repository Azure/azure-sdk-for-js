// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to parse an OpenAI error
 *
 * @summary parse OpenAI error.
 * @azsdk-weight 50
 */
import { isOpenAIError } from "@azure/openai";

export function parseOpenAIError(error: any): void {
  if (isOpenAIError(error)) {
    console.error("The sample encountered an error:");
    console.error(`Error message: ${error.message}`);
    console.error(`Error type: ${error.type}`);
    console.error(`Error param: ${error.param}`);
    console.error(`Error code: ${error.code}`);
  } else {
    console.error("The sample encountered an error:", error);
  }
}
