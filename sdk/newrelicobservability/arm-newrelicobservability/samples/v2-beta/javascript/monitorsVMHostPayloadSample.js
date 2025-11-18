// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Returns the payload that needs to be passed in the request body for installing the New Relic agent on a VM, providing the necessary configuration details
 *
 * @summary Returns the payload that needs to be passed in the request body for installing the New Relic agent on a VM, providing the necessary configuration details
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_VmHostPayload_MaximumSet_Gen.json
 */
async function monitorsVMHostPayloadMaximumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.vmHostPayload(resourceGroupName, monitorName);
  console.log(result);
}

/**
 * This sample demonstrates how to Returns the payload that needs to be passed in the request body for installing the New Relic agent on a VM, providing the necessary configuration details
 *
 * @summary Returns the payload that needs to be passed in the request body for installing the New Relic agent on a VM, providing the necessary configuration details
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_VmHostPayload_MinimumSet_Gen.json
 */
async function monitorsVMHostPayloadMinimumSetGen() {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.vmHostPayload(resourceGroupName, monitorName);
  console.log(result);
}

async function main() {
  await monitorsVMHostPayloadMaximumSetGen();
  await monitorsVMHostPayloadMinimumSetGen();
}

main().catch(console.error);
