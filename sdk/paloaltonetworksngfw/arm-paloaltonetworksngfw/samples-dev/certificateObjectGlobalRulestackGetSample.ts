// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a CertificateObjectGlobalRulestackResource
 *
 * @summary Get a CertificateObjectGlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/CertificateObjectGlobalRulestack_Get_MaximumSet_Gen.json
 */

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function certificateObjectGlobalRulestackGetMaximumSetGen(): Promise<void> {
  const globalRulestackName = "praval";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.certificateObjectGlobalRulestack.get(globalRulestackName, name);
  console.log(result);
}

/**
 * This sample demonstrates how to Get a CertificateObjectGlobalRulestackResource
 *
 * @summary Get a CertificateObjectGlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/CertificateObjectGlobalRulestack_Get_MinimumSet_Gen.json
 */
async function certificateObjectGlobalRulestackGetMinimumSetGen(): Promise<void> {
  const globalRulestackName = "praval";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.certificateObjectGlobalRulestack.get(globalRulestackName, name);
  console.log(result);
}

async function main(): Promise<void> {
  await certificateObjectGlobalRulestackGetMaximumSetGen();
  await certificateObjectGlobalRulestackGetMinimumSetGen();
}

main().catch(console.error);
