// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");
const { inspect } = require("util");

// Simple example of how to:
// - create a DigitalTwins Service Client using the DigitalTwinsClient constructor
async function main() {
  // Environment variables have to be set
  try {
    // DefaultAzureCredential supports different authentication mechanisms and determines the appropriate credential type based of the environment it is executing in.
    // It attempts to use multiple credential types in an order until it finds a working credential.

    // - AZURE_DIGITALTWINS_URL: The tenant ID in Azure Active Directory
    const url = process.env.AZURE_DIGITALTWINS_URL;

    // DefaultAzureCredential expects the following three environment variables:
    // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
    // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
    // - AZURE_CLIENT_SECRET: The client secret for the registered application
    const credential = new DefaultAzureCredential();
    const serviceClient = new DigitalTwinsClient(url, credential);

    console.log(inspect(serviceClient));
  } catch (err) {
    console.log(err);
  }
}

main();
