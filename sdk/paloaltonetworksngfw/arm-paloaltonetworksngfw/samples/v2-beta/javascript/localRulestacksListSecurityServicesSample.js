// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the security services for rulestack
 *
 * @summary list the security services for rulestack
 * x-ms-original-file: 2025-10-08/LocalRulestacks_listSecurityServices_MaximumSet_Gen.json
 */
async function localRulestacksListSecurityServicesMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRulestacks.listSecurityServices(
    "rgopenapi",
    "lrs1",
    "localRulestacks",
    { skip: "a6a321", top: 20 },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to list the security services for rulestack
 *
 * @summary list the security services for rulestack
 * x-ms-original-file: 2025-10-08/LocalRulestacks_listSecurityServices_MinimumSet_Gen.json
 */
async function localRulestacksListSecurityServicesMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRulestacks.listSecurityServices(
    "rgopenapi",
    "lrs1",
    "localRulestacks",
  );
  console.log(result);
}

async function main() {
  await localRulestacksListSecurityServicesMaximumSetGen();
  await localRulestacksListSecurityServicesMinimumSetGen();
}

main().catch(console.error);
