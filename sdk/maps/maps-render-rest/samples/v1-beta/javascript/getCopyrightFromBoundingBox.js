// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DefaultAzureCredential } = require("@azure/identity");
const { isUnexpected } = require("../src/generated");
const MapsRender = require("../src/mapsRender").default;

/**
 * @summary How to get the copyright of tiles in a given bounding box.
 */
async function main() {
  /**
   * Azure Maps supports two ways to authenticate requests:
   * - Shared Key authentication (subscription-key)
   * - Microsoft Entra ID authentication
   *
   * In this sample you can populate the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for Microsoft Entra ID auth,
   * or put MAPS_SUBSCRIPTION_KEY into .env file to use the shared key authentication.
   *
   * More info is available at https://docs.microsoft.com/en-us/azure/azure-maps/azure-maps-authentication.
   */
  /** Microsoft Entra ID authentication */
  const credential = new DefaultAzureCredential();
  const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  const client = MapsRender(credential, mapsClientId);

  /** Shared Key authentication (subscription-key) */
  // const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  // const credential = new AzureKeyCredential(subscriptionKey);
  // const client = MapsRender(credential);

  const response = await client.path("/map/copyright/bounding/{format}", "json").get({
    queryParameters: {
      mincoordinates: [52.41064, 4.84228],
      maxcoordinates: [52.41072, 4.84239],
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
