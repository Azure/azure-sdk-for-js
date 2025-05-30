/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  FqdnListGlobalRulestackResource,
  PaloAltoNetworksCloudngfw
} from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a FqdnListGlobalRulestackResource
 *
 * @summary Create a FqdnListGlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/FqdnListGlobalRulestack_CreateOrUpdate_MaximumSet_Gen.json
 */
async function fqdnListGlobalRulestackCreateOrUpdateMaximumSetGen(): Promise<void> {
  const globalRulestackName = "praval";
  const name = "armid1";
  const resource: FqdnListGlobalRulestackResource = {
    description: "string",
    auditComment: "string",
    etag: "aaaaaaaaaaaaaaaaaa",
    fqdnList: ["string1", "string2"],
    provisioningState: "Accepted"
  };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.fqdnListGlobalRulestack.beginCreateOrUpdateAndWait(
    globalRulestackName,
    name,
    resource
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a FqdnListGlobalRulestackResource
 *
 * @summary Create a FqdnListGlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/FqdnListGlobalRulestack_CreateOrUpdate_MinimumSet_Gen.json
 */
async function fqdnListGlobalRulestackCreateOrUpdateMinimumSetGen(): Promise<void> {
  const globalRulestackName = "praval";
  const name = "armid1";
  const resource: FqdnListGlobalRulestackResource = {
    fqdnList: ["string1", "string2"]
  };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.fqdnListGlobalRulestack.beginCreateOrUpdateAndWait(
    globalRulestackName,
    name,
    resource
  );
  console.log(result);
}

async function main(): Promise<void> {
  fqdnListGlobalRulestackCreateOrUpdateMaximumSetGen();
  fqdnListGlobalRulestackCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
