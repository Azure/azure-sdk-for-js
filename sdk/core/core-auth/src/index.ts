// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { AzureKeyCredential, KeyCredential } from "./azureKeyCredential";
export { AzureNamedKeyCredential, NamedKeyCredential } from "./azureNamedKeyCredential";
export { AzureSASCredential, SASCredential } from "./azureSASCredential";

export {
  TokenCredential,
  GetTokenOptions,
  AccessToken,
  isTokenCredential
} from "./tokenCredential";

export { SpanContext, SpanOptions, SpanAttributes, Context, SpanAttributeValue } from "./tracing";
