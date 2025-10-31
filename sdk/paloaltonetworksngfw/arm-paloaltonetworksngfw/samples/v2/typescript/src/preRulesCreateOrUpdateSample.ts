// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a PreRulesResource
 *
 * @summary create a PreRulesResource
 * x-ms-original-file: 2025-10-08/PreRules_CreateOrUpdate_MaximumSet_Gen.json
 */
async function preRulesCreateOrUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.preRules.createOrUpdate("lrs1", "1", {
    properties: {
      description: "description of pre rule",
      actionType: "Allow",
      applications: ["app1"],
      auditComment: "example comment",
      category: { feeds: ["feed"], urlCustom: ["https://microsoft.com"] },
      decryptionRuleType: "SSLOutboundInspection",
      destination: {
        cidrs: ["1.0.0.1/10"],
        countries: ["India"],
        feeds: ["feed"],
        fqdnLists: ["FQDN1"],
        prefixLists: ["PL1"],
      },
      enableLogging: "DISABLED",
      etag: "c18e6eef-ba3e-49ee-8a85-2b36c863a9d0",
      inboundInspectionCertificate: "cert1",
      negateDestination: "TRUE",
      negateSource: "TRUE",
      protocolPortList: ["80"],
      provisioningState: "Accepted",
      ruleName: "preRule1",
      ruleState: "DISABLED",
      source: {
        cidrs: ["1.0.0.1/10"],
        countries: ["India"],
        feeds: ["feed"],
        prefixLists: ["PL1"],
      },
      tags: [{ key: "keyName", value: "value" }],
      protocol: "HTTP",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a PreRulesResource
 *
 * @summary create a PreRulesResource
 * x-ms-original-file: 2025-10-08/PreRules_CreateOrUpdate_MinimumSet_Gen.json
 */
async function preRulesCreateOrUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.preRules.createOrUpdate("lrs1", "1", {
    properties: { ruleName: "preRule1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await preRulesCreateOrUpdateMaximumSetGen();
  await preRulesCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
