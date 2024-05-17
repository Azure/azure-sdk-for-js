// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import TextTranslationClient from "./custom/customClient";

export * from "./custom/customClient";
export * from "./parameters";
export * from "./responses";
export * from "./clientDefinitions";
export * from "./isUnexpected";
export * from "./models";
export * from "./outputModels";
export * from "./serializeHelper";
export { TranslatorCredential, TranslatorTokenCredential } from "./custom/authentication";

export default TextTranslationClient;
