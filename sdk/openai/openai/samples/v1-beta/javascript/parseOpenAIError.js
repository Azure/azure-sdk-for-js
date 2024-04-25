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
    console.log(`Error message: ${error.message}`);
    console.log(`Error type: ${error.type}`);
    console.log(`Error param: ${error.param}`);
    console.log(`Error code: ${error.code}`);
  } else {
    console.error("The sample encountered an error:", error);
  }
}

module.exports = { parseOpenAIError };
