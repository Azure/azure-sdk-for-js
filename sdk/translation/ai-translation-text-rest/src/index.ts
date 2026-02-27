// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import TextTranslationClient from "./customClient.js";

export * from "./customClient.js";
export type * from "./parameters.js";
export type * from "./responses.js";
export type * from "./clientDefinitions.js";
export * from "./isUnexpected.js";
export type * from "./models.js";
export type * from "./outputModels.js";
export type { TranslatorCredential, TranslatorTokenCredential } from "./authenticationCustomized.js";

// eslint-disable-next-line @azure/azure-sdk/ts-modules-only-named
export default TextTranslationClient;
