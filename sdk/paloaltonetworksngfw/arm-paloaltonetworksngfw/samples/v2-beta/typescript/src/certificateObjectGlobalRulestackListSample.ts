// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list CertificateObjectGlobalRulestackResource resources by Tenant
 *
 * @summary list CertificateObjectGlobalRulestackResource resources by Tenant
 * x-ms-original-file: 2026-05-11-preview/CertificateObjectGlobalRulestack_List_MaximumSet_Gen.json
 */
async function certificateObjectGlobalRulestackListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const resArray = new Array();
  for await (const item of client.certificateObjectGlobalRulestack.list("praval")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list CertificateObjectGlobalRulestackResource resources by Tenant
 *
 * @summary list CertificateObjectGlobalRulestackResource resources by Tenant
 * x-ms-original-file: 2026-05-11-preview/CertificateObjectGlobalRulestack_List_MinimumSet_Gen.json
 */
async function certificateObjectGlobalRulestackListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const resArray = new Array();
  for await (const item of client.certificateObjectGlobalRulestack.list("praval")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await certificateObjectGlobalRulestackListMaximumSetGen();
  await certificateObjectGlobalRulestackListMinimumSetGen();
}

main().catch(console.error);
