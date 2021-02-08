// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { AzureKeyCredential, KeyCredential } from "./azureKeyCredential";
export { AzureSASCredential, SASCredential } from "./azureSASCredential";

export {
  TokenCredential,
  GetTokenOptions,
  AccessToken,
  isTokenCredential
} from "./tokenCredential";

export { SpanContext, SpanOptions, AttributeValue, Attributes } from "./tracing";
