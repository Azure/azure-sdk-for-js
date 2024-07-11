// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to parse an OpenAI error
 *
 * @summary parse OpenAI error.
 */
const { isOpenAIError } = require("@azure/openai");

function parseOpenAIError(error) {
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

module.exports = { parseOpenAIError };
