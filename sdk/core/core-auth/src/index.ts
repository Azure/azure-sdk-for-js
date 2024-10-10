// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { AzureKeyCredential } from "./azureKeyCredential.js";
export { KeyCredential, isKeyCredential } from "./keyCredential.js";
export {
  AzureNamedKeyCredential,
  NamedKeyCredential,
  isNamedKeyCredential,
} from "./azureNamedKeyCredential.js";
export { AzureSASCredential, SASCredential, isSASCredential } from "./azureSASCredential.js";

export {
  TokenCredential,
  GetTokenOptions,
  AccessToken,
  HttpMethods,
  isTokenCredential,
  getTokenType as computeTokenType,
} from "./tokenCredential.js";

export { TracingContext } from "./tracing.js";
