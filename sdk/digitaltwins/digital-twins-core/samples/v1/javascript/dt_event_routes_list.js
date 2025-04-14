// Copyright (c) Microsoft.
// Licensed under the MIT License. See LICENSE file in the project root for full license information.

/**
 * @summary Simple example of how to list all eventRoutes using the paginated API
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { inspect } = require("util");

async function main() {
  // AZURE_DIGITALTWINS_URL: The URL to your Azure Digital Twins instance
  const url = process.env.AZURE_DIGITALTWINS_URL;
  if (url === undefined) {
    throw new Error("Required environment variable AZURE_DIGITALTWINS_URL is not set.");
  }

  // DefaultAzureCredential is provided by @azure/identity. It supports
  // different authentication mechanisms and determines the appropriate
  // credential type based of the environment it is executing in. See
  // https://www.npmjs.com/package/@azure/identity for more information on
  // authenticating with DefaultAzureCredential or other implementations of
  // TokenCredential.
  const credential = new DefaultAzureCredential();
  const serviceClient = new DigitalTwinsClient(url, credential);

  // List event routes
  const eventRoutes = serviceClient.listEventRoutes();
  for await (const eventRoute of eventRoutes) {
    console.log(`EventRoute:`);
    console.log(inspect(eventRoute));
  }
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
