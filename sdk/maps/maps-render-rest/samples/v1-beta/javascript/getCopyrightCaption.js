// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { DefaultAzureCredential } = require("@azure/identity");
const { isUnexpected } = require("../src/generated");
const MapsRender = require("../src/mapsRender").default;

/**
 * @summary How to get the copyright caption.
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

  const response = await client.path("/map/copyright/caption/{format}", "json").get();

  if (isUnexpected(response)) {
    throw response.body.error;
  }
  console.log(response.body.copyrightsCaption);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
