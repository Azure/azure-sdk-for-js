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
import { MapsGeolocationClient } from "./generated";
import createClient from "./generated";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";

/**
 * Creates an instance of MapsGeolocationClient from a subscription key.
 *
 * @example
 * ```ts
 * import MapsGeolocation from "@azure-rest/maps-geolocation";
 * import { AzureKeyCredential } from "@azure/core-auth";
 *
 * const credential = new AzureKeyCredential("<subscription-key>");
 * const client = MapsGeolocation(credential);
 *```
 *
 * @param credential - An AzureKeyCredential instance used to authenticate requests to the service
 * @param options - Options used to configure the Geolocation Client
 */
export default function MapsGeolocation(
  credential: AzureKeyCredential,
  options?: ClientOptions,
): MapsGeolocationClient;
/**
 * Creates an instance of MapsGeolocation from an Azure Identity `TokenCredential`.
 *
 * @example
 * ```ts
 * import MapsGeolocation from "@azure-rest/maps-geo-location";
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const credential = new DefaultAzureCredential();
 * const client = MapsGeolocation(credential, "<maps-account-client-id>");
 *```
 *
 * @param credential - An TokenCredential instance used to authenticate requests to the service
 * @param mapsAccountClientId - The Azure Maps client id of a specific map resource
 * @param options - Options used to configure the Route Client
 */
export default function MapsGeolocation(
  credential: TokenCredential,
  mapsAccountClientId: string,
  options?: ClientOptions,
): MapsGeolocationClient;
/**
 * Creates an instance of MapsGeolocation from an Azure Identity `AzureSASCredential`.
 *
 * @example
 * ```ts
 * import MapsGeolocation from "@azure-rest/maps-geo-location";
 * import { AzureSASCredential } from "@azure/core-auth";
 *
 * const credential = new AzureSASCredential("<SAS Token>");
 * const client = MapsGeolocation(credential);
 * ```
 *
 * @param credential - An AzureSASCredential instance used to authenticate requests to the service
 * @param options - Options used to configure the Geolocation Client
 */
export default function MapsGeolocation(
  credential: AzureSASCredential,
  options?: ClientOptions,
): MapsGeolocationClient;
export default function MapsGeolocation(
  credential: TokenCredential | AzureKeyCredential | AzureSASCredential,
  clientIdOrOptions: string | ClientOptions = {},
  maybeOptions: ClientOptions = {},
): MapsGeolocationClient {
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
