// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Models that do not support function call
export const functionCallModelsToSkip = [
  { name: "gpt-35-turbo", version: "0301" },
  { name: "gpt-35-turbo-16k", version: "0613" },
];

// TODO: Remove this when "content_filter_results" is correctly returned
export const visionModelsToSkip = [
  { name: "gpt-4o", version: "2024-08-06" },
  { name: "gpt-4", version: "turbo-2024-04-09" },
  { name: "gpt-4o-mini", version: "2024-07-18" },
];

// TODO: Remove this when "500 Backend returned unexpected response" disappear
export const ttsModelsToSkip = [{ name: "whisper", version: "001" }];

// TODO: Remove this when "completion_tokens" is consistently returned
export const completionsModelsToSkip = [{ name: "gpt-4", version: "0613" }];

// TODO: Remove this when "completion_tokens" is consistently returned
export const jsonResponseModelsToSkip = [{ name: "gpt-4", version: "0125-Preview" }];
