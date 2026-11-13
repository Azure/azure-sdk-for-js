// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to detaches an AKS cluster while retaining the physical AKS and AI Manager
 * resources. A 202 response contains the current attachment; poll GET until
 * the attachment is no longer found. A 204 response indicates that the
 * attachment has been removed or did not exist.
 *
 * @summary detaches an AKS cluster while retaining the physical AKS and AI Manager
 * resources. A 202 response contains the current attachment; poll GET until
 * the attachment is no longer found. A 204 response indicates that the
 * attachment has been removed or did not exist.
 * x-ms-original-file: 2026-11-15-preview/DeleteAttachedAksCluster.json
 */
async function deleteAttachedAksCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.attachedAksClusters.delete(
    "rgcognitiveservices",
    "myAccount",
    "myAttachment",
  );
  console.log(result);
}

async function main() {
  await deleteAttachedAksCluster();
}

main().catch(console.error);
