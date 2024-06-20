// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary This sample demonstrates how to create a `DeidentificationClient` and then deidentify a `string`
 */

const createClient = require("@azure-rest/azure-health-deidentification").default;
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
  const credential = new DefaultAzureCredential();
  const serviceEndpoint = "https://example.api.cac001.deid.azure.com";
  const client = createClient(serviceEndpoint, credential);

  const content = {
    dataType: "Plaintext",
    inputText: "Hello John!",
    operation: "Surrogate",
  };

  const response = await client.path("/deid").post({ body: content });

  console.log(response.body.outputText); // Hello, Tom!
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
