// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Check whether a domain is available.
 *
 * @summary Check whether a domain is available.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/CheckDomainAvailability.json
 */
async function checkSkuAvailability() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const subdomainName = "contosodemoapp1";
  const typeParam = "Microsoft.CognitiveServices/accounts";
  const kind = "undefined";
  const options = { kind };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.checkDomainAvailability(subdomainName, typeParam, options);
  console.log(result);
}

async function main() {
  await checkSkuAvailability();
}

main().catch(console.error);
