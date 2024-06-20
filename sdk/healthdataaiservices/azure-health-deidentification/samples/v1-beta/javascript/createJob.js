// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary This sample demonstrates how to create a job which will deidentify all files within a blob storage container filtering via a prefix.
 */

const createClient = require("@azure-rest/azure-health-deidentification").default;
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
  const credential = new DefaultAzureCredential();
  const serviceEndpoint = "https://example.api.cac001.deid.azure.com";
  const storageAccountSASUri = "exampleSASUri";
  const OUTPUT_FOLDER = "_output";
  const inputPrefix = "example_patient_1";
  const client = createClient(serviceEndpoint, credential);
  const jobName = "exampleJob";

  const job = {
    dataType: "Plaintext",
    operation: "Surrogate",
    sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
    targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
  };
  const response = await client.path("/jobs/{name}", jobName).put({ body: job });

  console.log(response.body);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
