// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * @summary Simple example of how to create a DigitalTwins Service Client using the DigitalTwinsClient constructor
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { inspect } = require("util");

async function main() {
  try {
    // AZURE_DIGITALTWINS_URL: The URL to your Azure Digital Twins instance
    let url;
    if (process.env.AZURE_DIGITALTWINS_URL) {
      url = process.env.AZURE_DIGITALTWINS_URL;
    } else {
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

    console.log(inspect(serviceClient));
  } catch (err) {
    console.log(err);
  }
}

main();
