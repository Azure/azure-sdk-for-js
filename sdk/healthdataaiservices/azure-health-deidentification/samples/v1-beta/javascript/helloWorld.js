// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to create a `DeidentificationClient` and then deidentify a `string`
 */

const createClient = require("@azure-rest/health-deidentification").default,
  { isUnexpected } = require("@azure-rest/health-deidentification");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

async function main() {
  const credential = new DefaultAzureCredential();
  const serviceEndpoint =
    process.env["DEID_SERVICE_ENDPOINT"] || "https://example.api.cac001.deid.azure.com";
  const client = createClient(serviceEndpoint, credential);

  const content = {
    inputText: "Hello John!",
  };

  const response = await client.path("/deid").post({ body: content });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log(response.body.outputText); // Hello, Tom!
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
