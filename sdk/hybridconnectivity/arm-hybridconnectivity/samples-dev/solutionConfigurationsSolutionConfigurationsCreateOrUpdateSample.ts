// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a SolutionConfiguration
 *
 * @summary create a SolutionConfiguration
 * x-ms-original-file: 2024-12-01/SolutionConfigurations_CreateOrUpdate.json
 */
async function solutionConfigurationsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const result = await client.solutionConfigurations.SolutionConfigurations_createOrUpdate(
    "ymuj",
    "keebwujt",
    {
      properties: {
        solutionType: "nmtqllkyohwtsthxaimsye",
        solutionSettings: {},
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await solutionConfigurationsCreateOrUpdate();
}

main().catch(console.error);
