// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates an adapter deployment or re-targets it to another compatible
 * managed compute deployment. The source model ID is immutable.
 * Returns 201 for a new adapter or 200 for an existing adapter, including retries.
 * Either response may require polling while provisioning is in progress.
 * After polling completes, retrieve the final resource from the original resource URL.
 * Omit conditional headers to allow either creation or update.
 * To create only when absent, send If-None-Match: *.
 * To update only a matching version, send If-Match with the ETag returned by GET.
 * Conditional requests, including retries, return 412 if the precondition is not met.
 *
 * @summary creates an adapter deployment or re-targets it to another compatible
 * managed compute deployment. The source model ID is immutable.
 * Returns 201 for a new adapter or 200 for an existing adapter, including retries.
 * Either response may require polling while provisioning is in progress.
 * After polling completes, retrieve the final resource from the original resource URL.
 * Omit conditional headers to allow either creation or update.
 * To create only when absent, send If-None-Match: *.
 * To update only a matching version, send If-Match with the ETag returned by GET.
 * Conditional requests, including retries, return 412 if the precondition is not met.
 * x-ms-original-file: 2026-09-15-preview/CreateOrUpdateAdapterDeployment.json
 */
async function createOrUpdateAdapterDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.adapterDeployments.createOrUpdate(
    "resourceGroupName",
    "accountName",
    "adapterDeploymentName",
    {
      properties: {
        sourceModelId:
          "azureai://accounts/accountName/projects/projectName/models/modelName/versions/1",
        targetDeploymentName: "managedComputeDeploymentName",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAdapterDeployment();
}

main().catch(console.error);
