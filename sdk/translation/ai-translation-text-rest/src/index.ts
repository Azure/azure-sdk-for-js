// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import TextTranslationClient from "./customClient.js";

export * from "./customClient.js";
export * from "./parameters.js";
export * from "./responses.js";
export * from "./clientDefinitions.js";
export * from "./isUnexpected.js";
export * from "./models.js";
export * from "./outputModels.js";
export { TranslatorCredential, TranslatorTokenCredential } from "./authenticationCustomized.js";

// eslint-disable-next-line @azure/azure-sdk/ts-modules-only-named
export default TextTranslationClient;
