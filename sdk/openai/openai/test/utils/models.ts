// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Models that do not support function call
export const functionCallModelsToSkip = [
  { name: "gpt-35-turbo", version: "0301" },
  { name: "gpt-35-turbo-16k", version: "0613" },
  { name: "o1-mini" }, // functions is not supported in this model. For a list of supported models, refer to https://platform.openai.com/docs/guides/function-calling#models-supporting-function-calling.
  { name: "o1-preview" }, // functions is not supported in this model. For a list of supported models, refer to https://platform.openai.com/docs/guides/function-calling#models-supporting-function-calling.
  { name: "gpt-4", version: "vision-preview" }, // functions is not supported in this model. For a list of supported models, refer to https://platform.openai.com/docs/guides/function-calling#models-supporting-function-calling.
];

// Models that don't support 'system' role in messages
export const systemRoleModelsToSkip = [
  { name: "o1-mini" }, // Unsupported value: 'messages[0].role' does not support 'system' with this model.
  { name: "o1-preview" }, // Unsupported value: 'messages[0].role' does not support 'system' with this model.
];

// Models that don't support tools
export const toolsModelsToSkip = [
  { name: "o1-mini" }, // tools is not supported in this model.
  { name: "o1-preview" }, // tools is not supported in this model.
  { name: "gpt-4", version: "vision-preview" }, // extra fields not permitted.
];

// TODO: Remove this when "completion_tokens" is consistently returned
export const completionsModelsToSkip = [
  { name: "gpt-4", version: "0613" },
  { name: "gpt-4", version: "0125-Preview" },
];
