// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a CertificateObjectGlobalRulestackResource
 *
 * @summary get a CertificateObjectGlobalRulestackResource
 * x-ms-original-file: 2025-10-08/CertificateObjectGlobalRulestack_Get_MaximumSet_Gen.json
 */
async function certificateObjectGlobalRulestackGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.certificateObjectGlobalRulestack.get("praval", "armid1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a CertificateObjectGlobalRulestackResource
 *
 * @summary get a CertificateObjectGlobalRulestackResource
 * x-ms-original-file: 2025-10-08/CertificateObjectGlobalRulestack_Get_MinimumSet_Gen.json
 */
async function certificateObjectGlobalRulestackGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.certificateObjectGlobalRulestack.get("praval", "armid1");
  console.log(result);
}

async function main(): Promise<void> {
  await certificateObjectGlobalRulestackGetMaximumSetGen();
  await certificateObjectGlobalRulestackGetMinimumSetGen();
}

main().catch(console.error);
