// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Models that do not support function call
export const functionCallModelsToSkip = [
  { name: "gpt-35-turbo", version: "0301" },
  { name: "gpt-35-turbo-16k", version: "0613" },
];

// TODO: Remove this when "completion_tokens" is consistently returned
export const completionsModelsToSkip = [
  { name: "gpt-4", version: "0613" },
  { name: "gpt-4", version: "0125-Preview" },
];
