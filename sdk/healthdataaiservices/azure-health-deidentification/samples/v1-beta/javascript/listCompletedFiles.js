// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary This sample demonstrates how to list files that were completed by a job.
 */

const createClient = require("@azure-rest/health-deidentification").default,
  { isUnexpected, paginate } = require("@azure-rest/health-deidentification");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

async function main() {
  const credential = new DefaultAzureCredential();
  const serviceEndpoint =
    process.env["DEID_SERVICE_ENDPOINT"] || "https://example.api.cac001.deid.azure.com";
  const storageLocation = `https://${process.env["STORAGE_ACCOUNT_NAME"]}.blob.core.windows.net/${process.env["STORAGE_CONTAINER_NAME"]}`;
  const location = storageLocation || "defaultSasUri";
  const OUTPUT_FOLDER = "_output";
  const inputPrefix = "example_patient_1";
  const client = createClient(serviceEndpoint, credential);
  const jobName = "exampleJob";

  const job = {
    dataType: "Plaintext",
    operation: "Surrogate",
    sourceLocation: { location, prefix: inputPrefix, extensions: ["*"] },
    targetLocation: { location, prefix: OUTPUT_FOLDER },
  };

  await client.path("/jobs/{name}", jobName).put({ body: job });

  const response = await client.path("/jobs/{name}/documents", jobName).get();

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  const items = [];
  const iter = paginate(client, response);

  for await (const item of iter) {
    items.push(item);
  }

  console.log(items); // items will contain all the completed files
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
