// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to details of the information protection policy.
 *
 * @summary details of the information protection policy.
 * x-ms-original-file: 2017-08-01-preview/InformationProtectionPolicies/CreateOrUpdateInformationProtectionPolicy_example.json
 */
async function createOrUpdateAnInformationProtectionPolicyForAManagementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.informationProtectionPolicies.createOrUpdate(
    "providers/Microsoft.Management/managementGroups/148059f7-faf3-49a6-ba35-85122112291e",
    "custom",
    {
      informationTypes: {
        "3bf35491-99b8-41f2-86d5-c1200a7df658": {
          custom: true,
          displayName: "Custom",
          enabled: true,
          keywords: [{ canBeNumeric: true, custom: true, pattern: "%custom%" }],
          order: 1400,
          recommendedLabelId: "7aa516c7-5a53-4857-bc6e-6808c6acd542",
        },
        "7fb9419d-2473-4ad8-8e11-b25cc8cf6a07": {
          custom: false,
          displayName: "Networking",
          enabled: true,
          keywords: [{ canBeNumeric: false, custom: true, pattern: "%networking%" }],
          order: 100,
          recommendedLabelId: "575739d2-3d53-4df0-9042-4c7772d5c7b1",
        },
      },
      labels: {
        "1345da73-bc5a-4a8f-b7dd-3820eb713da8": {
          displayName: "Public",
          enabled: true,
          order: 100,
        },
        "575739d2-3d53-4df0-9042-4c7772d5c7b1": {
          displayName: "Confidential",
          enabled: true,
          order: 300,
        },
        "7aa516c7-5a53-4857-bc6e-6808c6acd542": {
          displayName: "General",
          enabled: true,
          order: 200,
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAnInformationProtectionPolicyForAManagementGroup();
}

main().catch(console.error);
