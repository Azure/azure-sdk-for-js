// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export type { HttpMethods } from "@azure/core-util";
export { AzureKeyCredential } from "./azureKeyCredential.js";
export { isKeyCredential } from "./keyCredential.js";
export type { KeyCredential } from "./keyCredential.js";
export { AzureNamedKeyCredential, isNamedKeyCredential } from "./azureNamedKeyCredential.js";
export type { NamedKeyCredential } from "./azureNamedKeyCredential.js";
export { AzureSASCredential, isSASCredential } from "./azureSASCredential.js";
export type { SASCredential } from "./azureSASCredential.js";

export { isTokenCredential } from "./tokenCredential.js";
export type { TokenCredential, GetTokenOptions, AccessToken } from "./tokenCredential.js";

export type { TracingContext } from "./tracing.js";
