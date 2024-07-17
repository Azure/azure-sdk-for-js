// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { DefaultAzureCredential } = require("@azure/identity");
const MapsRender = require("@azure-rest/maps-render").default,
  { positionToTileXY } = require("@azure-rest/maps-render");

/**
 * @summary How to get the map tile and render on the **browser**.
 */
async function main() {
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

  const zoom = 6;
  const { x, y } = positionToTileXY([47.61559, -122.33817], 6, "256");
  const response = await client
    .path("/map/tile")
    .get({
      queryParameters: {
        tilesetId: "microsoft.base.road",
        zoom,
        x,
        y,
      },
    })
    .asBrowserStream();

  if (!response.body) throw Error("No response body");

  /**
   * Create a blob to host the response stream, so we can feed the blob to an image object.
   * This is an browser API, please make sure you're running this sample on the browser.
   * If you're using Node.js, please refer to the `getMapTileInNode` sample.
   * Reference: https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams#reading_the_stream
   */
  const reader = response.body.getReader();
  const stream = new ReadableStream({
    async start(controller) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        controller.enqueue(value);
      }
      controller.close();
      reader.releaseLock();
    },
  });
  const blob = await new Response(stream).blob();
  // Create a new Image object and feed the blob URL to it.
  const image = new Image();
  image.src = URL.createObjectURL(blob);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
