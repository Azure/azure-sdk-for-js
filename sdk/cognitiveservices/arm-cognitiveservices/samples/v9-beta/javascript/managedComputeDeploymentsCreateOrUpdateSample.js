// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a managed compute deployment associated with the Cognitive Services account.
 *
 * @summary creates or updates a managed compute deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-05-15-preview/CreateOrUpdateManagedComputeDeployment.json
 */
async function createOrUpdateManagedComputeDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.managedComputeDeployments.createOrUpdate(
    "resourceGroupName",
    "accountName",
    "gpt-oss-120b-gpu",
    {
      properties: {
        model: "azureml://registries/azureml-openai-oss/models/gpt-oss-120b/versions/4",
        deploymentTemplate:
          "azureml://registries/azureml-openai-oss/deploymenttemplates/gpt-oss-120b-short-context/versions/1",
        acceleratorType: "H100_80GB",
        versionUpgradeOption: "OnceNewDefaultVersionAvailable",
      },
      sku: { name: "GlobalManagedCompute", capacity: 1 },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a managed compute deployment associated with the Cognitive Services account.
 *
 * @summary creates or updates a managed compute deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-05-15-preview/CreateOrUpdateVmManagedComputeDeployment.json
 */
async function createOrUpdateVmManagedComputeDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.managedComputeDeployments.createOrUpdate(
    "resourceGroupName",
    "accountName",
    "gpt-oss-120b-byoc",
    {
      properties: {
        model: "azureml://registries/azureml-openai-oss/models/gpt-oss-120b/versions/4",
        deploymentTemplate:
          "projects/my-project/deploymentTemplates/gpt-oss-120b-vllm-tuned/versions/2",
        computeId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resourceGroupName/providers/Microsoft.CognitiveServices/accounts/accountName/computes/my-h100-pool",
        priority: "High",
      },
      sku: { name: "VmManagedCompute", capacity: 2 },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateManagedComputeDeployment();
  await createOrUpdateVmManagedComputeDeployment();
}

main().catch(console.error);
