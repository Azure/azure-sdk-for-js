// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDedicatedHSMResourceProvider } = require("@azure/arm-hardwaresecuritymodules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the List operation gets information about the Payment HSM Clusters associated with the subscription and within the specified resource group.
 *
 * @summary the List operation gets information about the Payment HSM Clusters associated with the subscription and within the specified resource group.
 * x-ms-original-file: 2025-12-01-preview/PaymentHsmCluster_ListByResourceGroup_MaximumSet_Gen.json
 */
async function paymentHsmClusterListByResourceGroupMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.paymentHsmClusters.listByResourceGroup("rgpaymenthsm")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await paymentHsmClusterListByResourceGroupMaximumSetGen();
}

main().catch(console.error);
