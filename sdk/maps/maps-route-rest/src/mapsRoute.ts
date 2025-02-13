// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions } from "@azure-rest/core-client";
import type { AzureKeyCredential, AzureSASCredential, TokenCredential } from "@azure/core-auth";
import { isSASCredential, isTokenCredential } from "@azure/core-auth";
import { createMapsClientIdPolicy } from "@azure/maps-common";
import type { MapsRouteClient } from "./generated/index.js";
import createClient from "./generated/index.js";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";

/**
 * Creates an instance of MapsRouteClient from a subscription key.
 *
 * @example
 * ```ts snippet:ReadmeSampleCreateClient_SubscriptionKey
 * import { AzureKeyCredential } from "@azure/core-auth";
 * import MapsRoute from "@azure-rest/maps-route";
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
  options?: ClientOptions,
): MapsRouteClient;
/**
 * Creates an instance of MapsRoute from an Azure Identity `TokenCredential`.
 *
 * @example
 * ```ts snippet:ReadmeSampleCreateClient_TokenCredential
 * import { DefaultAzureCredential } from "@azure/identity";
 * import MapsRoute from "@azure-rest/maps-route";
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
  options?: ClientOptions,
): MapsRouteClient;
/**
 * Creates an instance of MapsRoute from an Azure Identity `AzureSASCredential`.
 *
 * @example
 * ```ts snippet:ReadmeSampleCreateClient_SASToken
 * import { AzureSASCredential } from "@azure/core-auth";
 * import MapsRoute from "@azure-rest/maps-route";
 *
 * const credential = new AzureSASCredential("<SAS Token>");
 * const client = MapsRoute(credential);
 * ```
 *
 * @param credential - An AzureSASCredential instance used to authenticate requests to the service
 * @param options - Options used to configure the Route Client
 */
export default function MapsRoute(
  credential: AzureSASCredential,
  options?: ClientOptions,
): MapsRouteClient;
export default function MapsRoute(
  credential: TokenCredential | AzureKeyCredential | AzureSASCredential,
  clientIdOrOptions: string | ClientOptions = {},
  maybeOptions: ClientOptions = {},
): MapsRouteClient {
  const options = typeof clientIdOrOptions === "string" ? maybeOptions : clientIdOrOptions;

  /**
   * maps service requires a header "ms-x-client-id", which is different from the standard Microsoft Entra ID.
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
