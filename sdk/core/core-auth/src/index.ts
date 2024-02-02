// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { AzureKeyCredential } from "./azureKeyCredential.js";
export { type KeyCredential, isKeyCredential } from "./keyCredential.js";
export {
  AzureNamedKeyCredential,
  type NamedKeyCredential,
  isNamedKeyCredential,
} from "./azureNamedKeyCredential.js";
export { AzureSASCredential, type SASCredential, isSASCredential } from "./azureSASCredential.js";
export {
  type TokenCredential,
  type GetTokenOptions,
  type AccessToken,
  isTokenCredential,
} from "./tokenCredential.js";
export type { TracingContext } from "./tracing.js";
