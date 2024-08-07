// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import {
  AzureKeyCredential,
  AzureSASCredential,
  isSASCredential,
  isTokenCredential,
  TokenCredential,
} from "@azure/core-auth";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { createMapsClientIdPolicy } from "@azure/maps-common";
import { MapsRenderClient } from "./generated";
import createClient from "./generated/mapsRenderClient";

/**
 * Creates an instance of MapsRenderClient from a subscription key.
 *
 * @example
 * ```ts
 * import MapsRender from "@azure-rest/maps-Render";
 *
 * const credential = new AzureKeyCredential("<subscription-key>");
 * const client = MapsRender(credential);
 *```
 *
 * @param credential - An AzureKeyCredential instance used to authenticate requests to the service
 * @param options - Options used to configure the Render Client
 */
export default function MapsRender(
  credential: AzureKeyCredential,
  options?: ClientOptions,
): MapsRenderClient;
/**
 * Creates an instance of MapsRender from an Azure Identity `TokenCredential`.
 *
 * @example
 * ```ts
 * import MapsRenderClient from "@azure-rest/maps-render";
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const credential = new DefaultAzureCredential();
 * const client = MapsRender(credential, "<maps-account-client-id>");
 *```
 *
 * @param credential - An TokenCredential instance used to authenticate requests to the service
 * @param mapsAccountClientId - The Azure Maps client id of a specific map resource
 * @param options - Options used to configure the Render Client
 */
export default function MapsRender(
  credential: TokenCredential,
  mapsAccountClientId: string,
  options?: ClientOptions,
): MapsRenderClient;
/**
 * Creates an instance of MapsRender from an Azure Identity `AzureSASCredential`.
 *
 * @example
 * ```ts
 * import MapsRender from "@azure-rest/maps-render";
 * import { AzureSASCredential } from "@azure/core-auth";
 *
 * const credential = new AzureSASCredential("<SAS Token>");
 * const client = MapsRender(credential);
 * ```
 *
 * @param credential - An AzureSASCredential instance used to authenticate requests to the service
 * @param options - Options used to configure the Render Client
 */
export default function MapsRender(
  credential: AzureSASCredential,
  options?: ClientOptions,
): MapsRenderClient;
export default function MapsRender(
  credential: TokenCredential | AzureKeyCredential | AzureSASCredential,
  clientIdOrOptions: string | ClientOptions = {},
  maybeOptions: ClientOptions = {},
): MapsRenderClient {
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
