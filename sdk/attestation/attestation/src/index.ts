// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export * from "./models";
export * from "./operations";
export {
  AttestationClient,
  AttestationClientOptions,
  AttestOpenEnclaveOptions,
  AttestSgxEnclaveOptions,
  AttestTpmOptions,
  AttestationClientOperationOptions
} from "./attestationClient";

export {
  AttestationAdministrationClient,
  AttestationAdministrationClientOptions,
  AttestationAdministrationClientOperationOptions
} from "./attestationAdministrationClient";

/**
 * REMOVE THIS DECLARATION BEFORE SHIPPING, IT EXISTS ONLY TO MAKE API-Extractor HAPPY.
 */
export { GeneratedClient, GeneratedClientContext } from "./generated";
