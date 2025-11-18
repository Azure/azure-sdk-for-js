// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to
 *
 * @summary
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PaloAltoNetworksCloudngfwOperations_listProductSerialNumberStatus_MaximumSet_Gen.json
 */
async function paloAltoNetworksCloudngfwOperationsListProductSerialNumberStatusMaximumSetGen() {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.paloAltoNetworksCloudngfwOperations.listProductSerialNumberStatus();
  console.log(result);
}

/**
 * This sample demonstrates how to
 *
 * @summary
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PaloAltoNetworksCloudngfwOperations_listProductSerialNumberStatus_MinimumSet_Gen.json
 */
async function paloAltoNetworksCloudngfwOperationsListProductSerialNumberStatusMinimumSetGen() {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.paloAltoNetworksCloudngfwOperations.listProductSerialNumberStatus();
  console.log(result);
}

async function main() {
  await paloAltoNetworksCloudngfwOperationsListProductSerialNumberStatusMaximumSetGen();
  await paloAltoNetworksCloudngfwOperationsListProductSerialNumberStatusMinimumSetGen();
}

main().catch(console.error);
