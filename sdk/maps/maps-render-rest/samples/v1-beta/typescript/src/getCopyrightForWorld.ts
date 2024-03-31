// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { isUnexpected } from "@azure-rest/maps-render";
import MapsRender from "@azure-rest/maps-render";
import * as dotenv from "dotenv";
dotenv.config();

/**
 * @summary How to get the copyright all around the world.
 */
async function main() {
  /**
   * Azure Maps supports two ways to authenticate requests:
   * - Shared Key authentication (subscription-key)
   * - Azure Active Directory (Azure AD) authentication
   *
   * In this sample you can put MAPS_SUBSCRIPTION_KEY into .env file to use the first approach or populate
   * the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for trying out AAD auth.
   *
   * More info is available at https://docs.microsoft.com/en-us/azure/azure-maps/azure-maps-authentication.
   */
  /** Shared Key authentication (subscription-key) */
  const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  const credential = new AzureKeyCredential(subscriptionKey);
  const client = MapsRender(credential);

  /** Azure Active Directory (Azure AD) authentication */
  // const credential = new DefaultAzureCredential();
  // const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  // const client = MapsRender(credential, mapsClientId);

  const response = await client.path("/map/copyright/world/{format}", "json").get({
    queryParameters: {
      /** Optional, default to yes. If set to no, the textual data (generalCopyrights, copyrights under regions) won't present. */
      text: "yes",
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  if (response.body.generalCopyrights) {
    console.log("General copyrights:");
    console.log(response.body.generalCopyrights.join("\n"));
  }

  if (response.body.regions) {
    console.log("Copyright by regions");
    response.body.regions.forEach(({ country, copyrights }) => {
      console.log(`${country.ISO3}, ${country.label}: `);
      console.log(copyrights.join("\n"));
      console.log("==========");
    });
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
