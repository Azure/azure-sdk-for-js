// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRP } from "@azure/arm-selfhelp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to uses ‘stepId’ and ‘responses’ as the trigger to continue the troubleshooting steps for the respective troubleshooter resource name. <br/>Continue API is used to provide inputs that are required for the specific troubleshooter to progress into the next step in the process. This API is used after the Troubleshooter has been created using the Create API.
 *
 * @summary uses ‘stepId’ and ‘responses’ as the trigger to continue the troubleshooting steps for the respective troubleshooter resource name. <br/>Continue API is used to provide inputs that are required for the specific troubleshooter to progress into the next step in the process. This API is used after the Troubleshooter has been created using the Create API.
 * x-ms-original-file: 2024-03-01-preview/Troubleshooter_Continue.json
 */
async function troubleshooterContinue(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  await client.troubleshooters.continue(
    "subscriptions/mySubscription/resourcegroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-rp",
    "abf168ed-1b54-454a-86f6-e4b62253d3b1",
    {
      continueRequestBody: {
        stepId: "SampleStepId",
        responses: [
          {
            questionId: "SampleQuestionId",
            questionType: "Text",
            response: "Connection exception",
          },
        ],
      },
    },
  );
}

async function main(): Promise<void> {
  await troubleshooterContinue();
}

main().catch(console.error);
