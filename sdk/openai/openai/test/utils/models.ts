// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ModelInfo } from "./types.js";
import { APIVersion } from "./utils.js";

// Models that do not support function call
export const functionCallModelsToSkip = [
  { name: "gpt-35-turbo", version: "0301" },
  { name: "gpt-35-turbo-16k", version: "0613" },
  // functions is not supported in this model. For a list of supported models, refer to https://platform.openai.com/docs/guides/function-calling#models-supporting-function-calling.
  { name: "o1" },
  { name: "o1-mini" },
  { name: "o1-preview" },
  { name: "gpt-4", version: "vision-preview" },
  { name: "o3", version: "2025-04-16" }, // errata ( 2025-04-24 mikhailsimin@ icm 619050903 )
  { name: "o4-mini" },
];

// Models that don't support 'system' role in messages
export const systemRoleModelsToSkip = [
  { name: "o1-mini" }, // Unsupported value: 'messages[0].role' does not support 'system' with this model.
  { name: "o1-preview" }, // Unsupported value: 'messages[0].role' does not support 'system' with this model.
  { name: "o3", version: "2025-04-16" }, // errata ( 2025-04-24 mikhailsimin@ icm 619050903 )
];

// Models that don't support tools
export const toolsModelsToSkip = [
  { name: "o1-mini" }, // tools is not supported in this model.
  { name: "o1-preview" }, // tools is not supported in this model.
  { name: "gpt-4", version: "vision-preview" }, // extra fields not permitted.
  { name: "o3", version: "2025-04-16" }, // errata ( 2025-04-24 mikhailsimin@ icm 619050903 )
];

export const dataSourcesModelsToSkip = [
  { name: "gpt-35-turbo-0613" }, // Unsupported model
  { name: "gpt-4-32k" }, // Managed identity is not enabled
  { name: "o1" },
  { name: "o1-preview" }, // o-series models are not supported with OYD.
  { name: "o1-mini" },
  { name: "gpt-4", version: "vision-preview" },
  { name: "o3", version: "2025-04-16" }, // errata ( 2025-04-24 mikhailsimin@ icm 619050903 ),
  { name: "o3-mini" },
  { name: "o4-mini" },
];

// TODO: Remove this when "completion_tokens" is consistently returned
export const completionsModelsToSkip = [
  { name: "gpt-4", version: "0613" },
  { name: "gpt-4", version: "0125-Preview" },
  { name: "o3", version: "2025-04-16" }, // errata ( 2025-04-24 mikhailsimin@ icm 619050903 )
];

// Vision isn't explicitly listed in capabilities, so a huge list here.
export const visionModelsToSkip: ModelInfo[] = [
  { name: "gpt-35-turbo-16k", version: "0613" },
  { name: "gpt-35-turbo", version: "0125" },
  { name: "gpt-35-turbo", version: "1106" },
  { name: "gpt-4-32k", version: "0314" },
  { name: "gpt-4-32k", version: "0613" },
  { name: "gpt-4", version: "0125-Preview" },
  { name: "gpt-4", version: "0613" },
  { name: "gpt-4", version: "1106-Preview" },
  { name: "gpt-4", version: "turbo-2024-04-09" },
  { name: "gpt-4", version: "vision-preview" },
  { name: "gpt-4o-audio-preview", version: "2024-10-01" },
  { name: "gpt-4o-audio-preview", version: "2024-12-17" },
  { name: "gpt-4o-mini-audio-preview", version: "2024-12-17" },
  { name: "gpt-4o", version: "2024-11-20" },
  { name: "o1-mini", version: "2024-09-12" },
  { name: "o1-preview", version: "2024-09-12" },
  { name: "o1", version: "2024-12-17" },
  { name: "o3-mini", version: "2025-01-31" },
];

export const modelsNotSupportedInGA = [
  { name: "o1", apiVersion: APIVersion.v2024_10_21 },
  { name: "o3-mini", apiVersion: APIVersion.v2024_10_21 },
  { name: "o4-mini" },
];
