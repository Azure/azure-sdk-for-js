// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a GlobalRulestackResource
 *
 * @summary create a GlobalRulestackResource
 * x-ms-original-file: 2025-10-08/GlobalRulestack_CreateOrUpdate_MaximumSet_Gen.json
 */
async function globalRulestackCreateOrUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.createOrUpdate("praval", {
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
      provisioningState: "Accepted",
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
 * This sample demonstrates how to create a GlobalRulestackResource
 *
 * @summary create a GlobalRulestackResource
 * x-ms-original-file: 2025-10-08/GlobalRulestack_CreateOrUpdate_MinimumSet_Gen.json
 */
async function globalRulestackCreateOrUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.createOrUpdate("praval", {
    location: "eastus",
    properties: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await globalRulestackCreateOrUpdateMaximumSetGen();
  await globalRulestackCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
