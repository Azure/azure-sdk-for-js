// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import {
  AzureKeyCredential,
  AzureSASCredential,
  TokenCredential,
  isSASCredential,
  isTokenCredential,
} from "@azure/core-auth";
import { createMapsClientIdPolicy } from "@azure/maps-common";
import { MapsSearchClient } from "./generated";
import createClient from "./generated";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";

/**
 * Creates an instance of MapsSearchClient from a subscription key.
 *
 * @example
 * ```ts
 * import MapsSearch from "@azure-rest/maps-search";
 * import { AzureKeyCredential } from "@azure/core-auth";
 *
 * const credential = new AzureKeyCredential("<subscription-key>");
 * const client = MapsSearch(credential);
 *```
 *
 * @param credential - An AzureKeyCredential instance used to authenticate requests to the service
 * @param options - Options used to configure the Search Client
 */
export default function MapsSearch(
  credential: AzureKeyCredential,
  options?: ClientOptions,
): MapsSearchClient;
/**
 * Creates an instance of MapsSearch from an Azure Identity `TokenCredential`.
 *
 * @example
 * ```ts
 * import MapsSearch from "@azure-rest/maps-search";
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const credential = new DefaultAzureCredential();
 * const client = MapsSearch(credential, "<maps-account-client-id>");
 *```
 *
 * @param credential - An TokenCredential instance used to authenticate requests to the service
 * @param mapsAccountClientId - The Azure Maps client id of a specific map resource
 * @param options - Options used to configure the Search Client
 */
export default function MapsSearch(
  credential: TokenCredential,
  mapsAccountClientId: string,
  options?: ClientOptions,
): MapsSearchClient;
/**
 * Creates an instance of MapsSearch from an Azure Identity `AzureSASCredential`.
 *
 * @example
 * ```ts
 * import MapsSearch from "@azure-rest/maps-search";
 * import { AzureSASCredential } from "@azure/core-auth";
 *
 * const credential = new AzureSASCredential("<SAS Token>");
 * const client = MapsSearch(credential);
 * ```
 *
 * @param credential - An AzureSASCredential instance used to authenticate requests to the service
 * @param options - Options used to configure the Search Client
 */
export default function MapsSearch(
  credential: AzureSASCredential,
  options?: ClientOptions,
): MapsSearchClient;
export default function MapsSearch(
  credential: TokenCredential | AzureKeyCredential | AzureSASCredential,
  clientIdOrOptions: string | ClientOptions = {},
  maybeOptions: ClientOptions = {},
): MapsSearchClient {
  const options = typeof clientIdOrOptions === "string" ? maybeOptions : clientIdOrOptions;

  /**
   * maps service requires a header "ms-x-client-id", which is different from the standard AAD.
   * So we need to do our own implementation.
   * This customized authentication is following by this guide: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-customization.md#custom-authentication
   */
  if (isTokenCredential(credential)) {
    const clientId = typeof clientIdOrOptions === "string" ? clientIdOrOptions : "";
    if (!clientId) {
      throw Error("Client id is needed for TokenCredential");
    }
    const client = createClient(undefined as any, options);
    client.pipeline.addPolicy(
      bearerTokenAuthenticationPolicy({
        credential,
        scopes: "https://atlas.microsoft.com/.default",
      }),
    );
    client.pipeline.addPolicy(createMapsClientIdPolicy(clientId));
    return client;
  }

  if (isSASCredential(credential)) {
    const client = createClient(undefined as any, options);
    client.pipeline.addPolicy({
      name: "mapsSASCredentialPolicy",
      async sendRequest(request, next) {
        request.headers.set("Authorization", `jwt-sas ${credential.signature}`);
        return next(request);
      },
    });
    return client;
  }

  return createClient(credential, options);
}
