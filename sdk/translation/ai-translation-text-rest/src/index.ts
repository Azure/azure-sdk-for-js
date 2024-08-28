// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import TextTranslationClient from "./customClient";

export * from "./customClient";
export * from "./generated/parameters";
export * from "./generated/responses";
export * from "./generated/clientDefinitions";
export * from "./generated/isUnexpected";
export * from "./generated/models";
export * from "./generated/outputModels";
export * from "./generated/serializeHelper";
export { TranslatorCredential, TranslatorTokenCredential } from "./authentication";

export default TextTranslationClient;
