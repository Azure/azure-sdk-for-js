// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import { AzureKeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { createMapsClientIdPolicy } from "@azure/maps-common";
import { MapsRouteClient } from "./generated";
import createClient from "./generated";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";

/**
 * Creates an instance of MapsRouteClient from a subscription key.
 *
 * @example
 * ```ts
 * import MapsRoute from "@azure-rest/maps-route";
 * import { AzureKeyCredential } from "@azure/core-auth";
 *
 * const credential = new AzureKeyCredential("<subscription-key>");
 * const client = MapsRoute(credential);
 *```
 *
 * @param credential - An AzureKeyCredential instance used to authenticate requests to the service
 * @param options - Options used to configure the Route Client
 */
export default function MapsRoute(
  credential: AzureKeyCredential,
  options?: ClientOptions
): MapsRouteClient;
/**
 * Creates an instance of MapsRoute from an Azure Identity `TokenCredential`.
 *
 * @example
 * ```ts
 * import MapsRoute from "@azure/maps-route";
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const credential = new DefaultAzureCredential();
 * const client = MapsRoute(credential, "<maps-account-client-id>");
 *```
 *
 * @param credential - An TokenCredential instance used to authenticate requests to the service
 * @param mapsAccountClientId - The Azure Maps client id of a specific map resource
 * @param options - Options used to configure the Route Client
 */
export default function MapsRoute(
  credential: TokenCredential,
  mapsAccountClientId: string,
  options?: ClientOptions
): MapsRouteClient;
export default function MapsRoute(
  credential: TokenCredential | AzureKeyCredential,
  clientIdOrOptions: string | ClientOptions = {},
  maybeOptions: ClientOptions = {}
): MapsRouteClient {
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
        scopes: `${options.baseUrl || "https://atlas.microsoft.com"}/.default`,
      })
    );
    client.pipeline.addPolicy(createMapsClientIdPolicy(clientId));
    return client;
  }
  return createClient(credential, options);
}
