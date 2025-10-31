// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a LocalRulesResource
 *
 * @summary create a LocalRulesResource
 * x-ms-original-file: 2025-10-08/LocalRules_CreateOrUpdate_MaximumSet_Gen.json
 */
async function localRulesCreateOrUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRules.createOrUpdate("firewall-rg", "lrs1", "1", {
    properties: {
      description: "description of local rule",
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
      ruleName: "localRule1",
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
 * This sample demonstrates how to create a LocalRulesResource
 *
 * @summary create a LocalRulesResource
 * x-ms-original-file: 2025-10-08/LocalRules_CreateOrUpdate_MinimumSet_Gen.json
 */
async function localRulesCreateOrUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.localRules.createOrUpdate("firewall-rg", "lrs1", "1", {
    properties: { ruleName: "localRule1" },
  });
  console.log(result);
}

async function main() {
  await localRulesCreateOrUpdateMaximumSetGen();
  await localRulesCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
