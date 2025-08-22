// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to performs resource deployment preflight validation.
 *
 * @summary performs resource deployment preflight validation.
 * x-ms-original-file: 2024-09-01/DeploymentPreflight_Post.json
 */

import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";

async function performsResourceDeploymentValidation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.deploymentPreflight.post(
    "rgswagger_2024-09-01",
    "lnfcwsmlowbwkndkztzvaj",
    {
      body: {
        resources: [
          {
            name: "xtgugoflfc",
            type: "nsnaptduolqcxsikrewvgjbxqpt",
            location: "cbsgtxkjdzwbyp",
            apiVersion: "otihymhvzblycdoxo",
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await performsResourceDeploymentValidation();
}

main().catch(console.error);
