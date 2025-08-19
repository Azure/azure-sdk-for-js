// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Search for relevant Azure Diagnostics, Solutions and Troubleshooters using a natural language issue summary.
 *
 * @summary Search for relevant Azure Diagnostics, Solutions and Troubleshooters using a natural language issue summary.
 * x-ms-original-file: specification/help/resource-manager/Microsoft.Help/preview/2024-03-01-preview/examples/DiscoverSolutionsAtTenantScope.json
 */

import type {
  DiscoveryNlpRequest,
  DiscoverySolutionNLPDiscoverSolutionsOptionalParams,
} from "@azure/arm-selfhelp";
import { HelpRP } from "@azure/arm-selfhelp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function discoverySolutionsUsingIssueSummaryAndServiceId(): Promise<void> {
  const discoverSolutionRequest: DiscoveryNlpRequest = {
    issueSummary: "how to retrieve certs from deleted keyvault.",
    serviceId: "0d0fcd2e-c4fd-4349-8497-200edb39s3ca",
  };
  const options: DiscoverySolutionNLPDiscoverSolutionsOptionalParams = {
    discoverSolutionRequest,
  };
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.discoverySolutionNLP.discoverSolutions(options);
  console.log(result);
}

async function main(): Promise<void> {
  await discoverySolutionsUsingIssueSummaryAndServiceId();
}

main().catch(console.error);
