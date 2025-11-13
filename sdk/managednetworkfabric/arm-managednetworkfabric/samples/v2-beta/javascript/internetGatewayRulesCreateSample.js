// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates an Internet Gateway rule resource.
 *
 * @summary creates an Internet Gateway rule resource.
 * x-ms-original-file: 2024-06-15-preview/InternetGatewayRules_Create.json
 */
async function internetGatewayRulesCreateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.internetGatewayRules.create(
    "example-rg",
    "example-internetGatewayRule",
    {
      properties: {
        annotation: "annotationValue",
        ruleProperties: {
          action: "Allow",
          addressList: ["10.10.10.10"],
          condition: "Or",
          destinationAddressList: ["11.11.10.11"],
          sourceAddressList: ["10.10.10.10"],
          headerAddressList: [{ headerName: "abcHeader", addressList: ["10.10.10.10"] }],
        },
      },
      tags: { KeyID: "KeyValue" },
      location: "eastus",
    },
  );
  console.log(result);
}

async function main() {
  await internetGatewayRulesCreateMaximumSetGen();
}

main().catch(console.error);
