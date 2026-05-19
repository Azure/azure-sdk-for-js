// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates the RAI Tool Label associated with the Azure OpenAI account.
 *
 * @summary creates the RAI Tool Label associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-01-15-preview/PutRaiToolLabel.json
 */
async function putRaiToolLabel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiToolLabels.createOrUpdate(
    "resourceGroupName",
    "accountName",
    "Web_Search",
    {
      properties: {
        accountScope: { labelValues: { confidentiality: "low" } },
        projectScopes: [
          { labelValues: { confidentiality: "low" }, project: "test-project" },
          { labelValues: { confidentiality: "low" }, project: "sample-project" },
        ],
        toolConnectionName: "Web_Search",
      },
    },
  );
  console.log(result);
}

async function main() {
  await putRaiToolLabel();
}

main().catch(console.error);
