// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const functionCallModelsToSkip = [
  { name: "gpt-35-turbo", version: "0301" },
  { name: "gpt-35-turbo-16k", version: "0613" },
];
// TODO: Remove this when the model is fixed
export const visionModelsToSkip = [
  { name: "gpt-4o", version: "2024-05-13" },
  { name: "gpt-4", version: "turbo-2024-04-09" },
  { name: "gpt-4o-mini", version: "2024-07-18" },
];

export const whisperModelsToSkip = [
  { name: "gpt-4", version: "0613" },
  { name: "gpt-4", version: "turbo-2024-04-09" },
  { name: "gpt-4", version: "1106-Preview" },
];

export const completionsModelsToSkip = [{ name: "gpt-4", version: "0613" }];

export const batchModelsToSkip = [
  { name: "tts", version: "2024-07-01" },
  { name: "gpt-4-1106-preview", version: "2024-06-01" },
  { name: "gpt-4-vision-preview" },
  { name: "gpt-4-retry" },
];
