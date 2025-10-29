// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a LocalRulestackResource
 *
 * @summary update a LocalRulestackResource
 * x-ms-original-file: 2025-10-08/LocalRulestacks_Update_MaximumSet_Gen.json
 */
async function localRulestacksUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRulestacks.update("rgopenapi", "lrs1", {
    identity: {
      type: "None",
      userAssignedIdentities: {
        key16: { clientId: "aaaa", principalId: "aaaaaaaaaaaaaaa" },
      },
    },
    properties: {
      description: "local rulestacks",
      associatedSubscriptions: ["2bf4a339-294d-4c25-b0b2-ef649e9f5c27"],
      defaultMode: "IPS",
      minAppIdVersion: "8.5.3",
      panEtag: "2bf4a339-294d-4c25-b0b2-ef649e9f5c12",
      panLocation: "eastus",
      scope: "LOCAL",
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
    tags: { tagName: "value" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a LocalRulestackResource
 *
 * @summary update a LocalRulestackResource
 * x-ms-original-file: 2025-10-08/LocalRulestacks_Update_MinimumSet_Gen.json
 */
async function localRulestacksUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRulestacks.update("rgopenapi", "lrs1", {});
  console.log(result);
}

async function main() {
  await localRulestacksUpdateMaximumSetGen();
  await localRulestacksUpdateMinimumSetGen();
}

main().catch(console.error);
