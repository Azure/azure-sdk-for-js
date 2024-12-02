// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import TextTranslationClient from "./customClient.js";

export * from "./customClient.js";
export * from "./generated/parameters.js";
export * from "./generated/responses.js";
export * from "./generated/clientDefinitions.js";
export * from "./generated/isUnexpected.js";
export * from "./generated/models.js";
export * from "./generated/outputModels.js";
export * from "./generated/serializeHelper.js";
export { TranslatorCredential, TranslatorTokenCredential } from "./authentication.js";

// eslint-disable-next-line @azure/azure-sdk/ts-modules-only-named
export default TextTranslationClient;
