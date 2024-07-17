// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultAzureCredential } from "@azure/identity";
import { isUnexpected } from "../src/generated";
import MapsRender from "../src/mapsRender";

/**
 * @summary How to get the metadata of a certain tileset.
 */
async function main(): Promise<void>  {
  /**
   * Azure Maps supports two ways to authenticate requests:
   * - Shared Key authentication (subscription-key)
   * - Azure Active Directory (Azure AD) authentication
   *
   * In this sample you can populate the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for AAD auth,
   * Or put MAPS_SUBSCRIPTION_KEY into .env file to use the shared key authentication.
   *
   * More info is available at https://docs.microsoft.com/en-us/azure/azure-maps/azure-maps-authentication.
   */
  /** Azure Active Directory (Azure AD) authentication */
  const credential = new DefaultAzureCredential();
  const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  const client = MapsRender(credential, mapsClientId);

  /** Shared Key authentication (subscription-key) */
  // const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  // const credential = new AzureKeyCredential(subscriptionKey);
  // const client = MapsRender(credential);

  const response = await client.path("/map/tileset").get({
    queryParameters: {
      tilesetId: "microsoft.base",
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log("The metadata of Microsoft Base tileset: ");
  const { maxzoom, minzoom, bounds = [] } = response.body;
  console.log(`The zoom range started from ${minzoom} to ${maxzoom}`);
  console.log(
    `The left bound is ${bounds[0]}, bottom bound is ${bounds[1]}, right bound is ${bounds[2]}, and top bound is ${bounds[3]}`,
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
