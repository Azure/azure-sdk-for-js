// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a GlobalRulestackResource
 *
 * @summary update a GlobalRulestackResource
 * x-ms-original-file: 2025-10-08/GlobalRulestack_Update_MaximumSet_Gen.json
 */
async function globalRulestackUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.update("praval", {
    identity: {
      type: "None",
      userAssignedIdentities: {
        key16: { clientId: "aaaa", principalId: "aaaaaaaaaaaaaaa" },
      },
    },
    location: "eastus",
    properties: {
      description: "global rulestacks",
      associatedSubscriptions: ["2bf4a339-294d-4c25-b0b2-ef649e9f5c27"],
      defaultMode: "IPS",
      minAppIdVersion: "8.5.3",
      panEtag: "2bf4a339-294d-4c25-b0b2-ef649e9f5c12",
      panLocation: "eastus",
      scope: "GLOBAL",
      securityServices: {
        antiSpywareProfile: "default",
        antiVirusProfile: "default",
        dnsSubscription: "default",
        fileBlockingProfile: "default",
        outboundTrustCertificate: "default",
        outboundUnTrustCertificate: "default",
        urlFilteringProfile: "default",
        vulnerabilityProfile: "default",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a GlobalRulestackResource
 *
 * @summary update a GlobalRulestackResource
 * x-ms-original-file: 2025-10-08/GlobalRulestack_Update_MinimumSet_Gen.json
 */
async function globalRulestackUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.update("praval", {});
  console.log(result);
}

async function main() {
  await globalRulestackUpdateMaximumSetGen();
  await globalRulestackUpdateMinimumSetGen();
}

main().catch(console.error);
