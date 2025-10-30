// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a LocalRulestackResource
 *
 * @summary create a LocalRulestackResource
 * x-ms-original-file: 2025-10-08/LocalRulestacks_CreateOrUpdate_MaximumSet_Gen.json
 */
async function localRulestacksCreateOrUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRulestacks.createOrUpdate("rgopenapi", "lrs1", {
    identity: {
      type: "None",
      userAssignedIdentities: {
        key16: { clientId: "aaaa", principalId: "aaaaaaaaaaaaaaa" },
      },
    },
    location: "eastus",
    properties: {
      description: "local rulestacks",
      associatedSubscriptions: ["2bf4a339-294d-4c25-b0b2-ef649e9f5c27"],
      defaultMode: "IPS",
      minAppIdVersion: "8.5.3",
      panEtag: "2bf4a339-294d-4c25-b0b2-ef649e9f5c12",
      panLocation: "eastus",
      provisioningState: "Accepted",
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
 * This sample demonstrates how to create a LocalRulestackResource
 *
 * @summary create a LocalRulestackResource
 * x-ms-original-file: 2025-10-08/LocalRulestacks_CreateOrUpdate_MinimumSet_Gen.json
 */
async function localRulestacksCreateOrUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRulestacks.createOrUpdate("rgopenapi", "lrs1", {
    location: "eastus",
    properties: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await localRulestacksCreateOrUpdateMaximumSetGen();
  await localRulestacksCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
