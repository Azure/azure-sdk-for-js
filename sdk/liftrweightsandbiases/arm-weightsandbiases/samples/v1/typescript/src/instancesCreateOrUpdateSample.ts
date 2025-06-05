// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WeightsAndBiasesClient } from "@azure/arm-weightsandbiases";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a InstanceResource
 *
 * @summary create a InstanceResource
 * x-ms-original-file: 2024-09-18/Instances_CreateOrUpdate_MaximumSet_Gen.json
 */
async function instancesCreateOrUpdateGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0BCB047F-CB71-4DFE-B0BD-88519F411C2F";
  const client = new WeightsAndBiasesClient(credential, subscriptionId);
  const result = await client.instances.createOrUpdate("rgopenapi", "myinstance", {
    properties: {
      marketplace: {
        subscriptionId: "00000000-0000-0000-0000-000000000000",
        subscriptionStatus: "PendingFulfillmentStart",
        offerDetails: {
          publisherId: "kf",
          offerId: "rfgoevxeke",
          planId: "ufopn",
          planName: "adysakgqlryufffz",
          termUnit: "dgrkojow",
          termId: "kklscqq",
        },
      },
      user: {
        firstName: "kiiehcojcldrlndoid",
        lastName: "zhkvsfqvthwkfkvgxcruyud",
        emailAddress: "user@outlook.com",
        upn: "rmjpgqchpbw",
        phoneNumber: "cogmqmuwfcpstkwbzgkgo",
      },
      partnerProperties: {
        region: "eastus",
        subdomain: "xkecokwnwtkwnkxfgucmzybzzb",
      },
      singleSignOnProperties: {
        type: "Saml",
        state: "Initial",
        enterpriseAppId: "hkxtmpv",
        url: "iqlemoksqdygqyxpp",
        aadDomains: ["mxnw"],
      },
    },
    identity: { type: "None", userAssignedIdentities: {} },
    tags: {},
    location: "pudewmshbcvbt",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await instancesCreateOrUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
