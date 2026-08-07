// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type {
  ContentSafetyContext,
  ContentSafetyClientOptionalParams,
} from "./contentSafetyContext.js";
export { createContentSafety } from "./contentSafetyContext.js";
export {
  shieldPrompt,
  detectTextProtectedMaterial,
  analyzeText,
  analyzeImage,
} from "./operations.js";
export type {
  ShieldPromptOptionalParams,
  DetectTextProtectedMaterialOptionalParams,
  AnalyzeTextOptionalParams,
  AnalyzeImageOptionalParams,
} from "./options.js";
