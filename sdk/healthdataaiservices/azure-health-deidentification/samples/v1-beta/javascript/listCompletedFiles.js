// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary This sample demonstrates how to list files that were completed by a job.
 */

const createClient = require("@azure-rest/azure-health-deidentification").default,
  { paginate } = require("@azure-rest/azure-health-deidentification");
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

  await client.path("/jobs/{name}", jobName).put({ body: job });

  const reports = await client.path("/jobs/{name}/files", jobName).get();

  const items = [];
  const iter = paginate(client, reports);

  for await (const item of iter) {
    items.push(item);
  }

  console.log(items); // items will contain all the completed files
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
