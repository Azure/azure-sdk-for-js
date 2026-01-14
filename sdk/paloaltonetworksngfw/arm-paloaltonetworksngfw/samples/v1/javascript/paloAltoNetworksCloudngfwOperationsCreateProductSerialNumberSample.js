// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to
 *
 * @summary
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PaloAltoNetworksCloudngfwOperations_createProductSerialNumber_MaximumSet_Gen.json
 */
async function paloAltoNetworksCloudngfwOperationsCreateProductSerialNumberMaximumSetGen() {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.paloAltoNetworksCloudngfwOperations.createProductSerialNumber();
  console.log(result);
}

/**
 * This sample demonstrates how to
 *
 * @summary
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PaloAltoNetworksCloudngfwOperations_createProductSerialNumber_MinimumSet_Gen.json
 */
async function paloAltoNetworksCloudngfwOperationsCreateProductSerialNumberMinimumSetGen() {
  const subscriptionId =
    process.env["PALOALTONETWORKSNGFW_SUBSCRIPTION_ID"] || "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.paloAltoNetworksCloudngfwOperations.createProductSerialNumber();
  console.log(result);
}

async function main() {
  await paloAltoNetworksCloudngfwOperationsCreateProductSerialNumberMaximumSetGen();
  await paloAltoNetworksCloudngfwOperationsCreateProductSerialNumberMinimumSetGen();
}

main().catch(console.error);
