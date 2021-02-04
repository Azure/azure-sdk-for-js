// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Azure client library for Mixed Reality authentication.
 *
 * @remarks
 * The {@link MixedRealityStsClient} class is used to request access tokens used
 * to access Mixed Reality services.
 *
 * @packageDocumentation
 */

export { AccessToken, AzureKeyCredential } from "@azure/core-auth";
export { logger } from "./logger";
export { GetTokenOptions, MixedRealityStsClientOptions } from "./models/options";
export { MixedRealityStsClient } from "./mixedRealityStsClient";
