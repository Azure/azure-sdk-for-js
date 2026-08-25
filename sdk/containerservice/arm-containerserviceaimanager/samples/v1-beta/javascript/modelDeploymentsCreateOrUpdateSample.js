// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a `ModelDeployment`. This is a full-replace operation: any optional property omitted from the request body is reset to its default value, or cleared if it has no default. To safely modify a subset of fields, perform a GET, modify the returned resource, and PUT it back using the returned ETag via the `If-Match` header to avoid concurrent overwrites.
 *
 * @summary create or update a `ModelDeployment`. This is a full-replace operation: any optional property omitted from the request body is reset to its default value, or cleared if it has no default. To safely modify a subset of fields, perform a GET, modify the returned resource, and PUT it back using the returned ETag via the `If-Match` header to avoid concurrent overwrites.
 * x-ms-original-file: 2026-05-02-preview/ModelDeployments_CreateOrUpdate.json
 */
async function modelDeploymentsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.modelDeployments.createOrUpdate(
    "rgaimanagers",
    "aimanager1",
    "namespace-1",
    "deployment-1",
    {
      properties: {
        modelResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgaimanagers/providers/Microsoft.ContainerService/aiModels/9806f0c862fdd920",
        modelSourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgaimanagers/providers/Microsoft.ContainerService/aiManagers/aimanager1/modelSources/huggingface",
        performanceMode: "Balanced",
        vmSize: "Standard_NC96ads_A100_v4",
        scale: { autoscale: { minReplicas: 2, maxReplicas: 8 } },
      },
    },
    { ifMatch: '"abc123def456"', ifNoneMatch: "*" },
  );
  console.log(result);
}

async function main() {
  await modelDeploymentsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
