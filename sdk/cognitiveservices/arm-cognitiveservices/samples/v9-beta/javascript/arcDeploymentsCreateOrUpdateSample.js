// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an Arc deployment associated with the Cognitive Services account.
 *
 * @summary creates or updates an Arc deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-07-15-preview/CreateOrUpdateArcDeployment.json
 */
async function createOrUpdateArcDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.arcDeployments.createOrUpdate(
    "resourceGroupName",
    "accountName",
    "phi-3-arc",
    {
      properties: {
        model: { format: "OpenAI", name: "phi-3-mini" },
        extensionId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resourceGroupName/providers/Microsoft.Kubernetes/connectedClusters/edge-cluster/providers/Microsoft.KubernetesConfiguration/extensions/inference-operator",
        runtime: "onnx-genai",
        compute: "cpu",
        replicas: 2,
        resources: { requests: { cpu: "8", memory: "16Gi" }, limits: { cpu: "8", memory: "16Gi" } },
        nodeSelector: { agentpool: "cpu" },
      },
      sku: { name: "Arc" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an Arc deployment associated with the Cognitive Services account.
 *
 * @summary creates or updates an Arc deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-07-15-preview/CreateOrUpdateArcDeploymentWithTemplate.json
 */
async function createOrUpdateArcDeploymentWithTemplate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.arcDeployments.createOrUpdate(
    "resourceGroupName",
    "accountName",
    "qwen-template-arc",
    {
      properties: {
        model: { format: "OpenAI", name: "qwen3" },
        extensionId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resourceGroupName/providers/Microsoft.Kubernetes/connectedClusters/edge-cluster/providers/Microsoft.KubernetesConfiguration/extensions/inference-operator",
        runtime: "vllm",
        compute: "gpu",
        replicas: 2,
        resources: { limits: { gpu: 5 } },
        nodeSelector: { agentpool: "a100" },
        deploymentTemplate:
          "azureml://registries/azureml-openai-oss/deploymenttemplates/vllm-qwen--qwen3-5-0-8b/versions/1",
      },
      sku: { name: "Arc" },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateArcDeployment();
  await createOrUpdateArcDeploymentWithTemplate();
}

main().catch(console.error);
