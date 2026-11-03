// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HelpRP } = require("@azure/arm-selfhelp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to search for relevant Azure Diagnostics, Solutions and Troubleshooters using a natural language issue summary.
 *
 * @summary search for relevant Azure Diagnostics, Solutions and Troubleshooters using a natural language issue summary.
 * x-ms-original-file: 2024-03-01-preview/DiscoverSolutionsAtTenantScope.json
 */
async function discoverySolutionsUsingIssueSummaryAndServiceId() {
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.discoverySolutionNLP.discoverSolutions({
    discoverSolutionRequest: {
      issueSummary: "how to retrieve certs from deleted keyvault.",
      serviceId: "0d0fcd2e-c4fd-4349-8497-200edb39s3ca",
    },
  });
  console.log(result);
}

async function main() {
  await discoverySolutionsUsingIssueSummaryAndServiceId();
}

main().catch(console.error);
