// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to set the background visualization for the issue
 *
 * @summary set the background visualization for the issue
 * x-ms-original-file: 2025-10-03/Issue_SetBackgroundVisualization_MaximumSet_Gen.json
 */
async function issueSetBackgroundVisualizationMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aceaa046-91f0-492a-96dc-45e10a9183dc";
  const client = new MonitorClient(credential, subscriptionId);
  await client.issue.setBackgroundVisualization(
    "rg1",
    "myWorkspace",
    "3f29e1b2b05f8371595dc761fed8e8b3",
    {
      visualization:
        '{"type":"AdaptiveCard","version":"1.3","body":[{"type":"TextBlock","text":"Issue Background Visualization","size":"Large","weight":"Bolder"},{"type":"TextBlock","text":"This adaptive card provides background context for the issue including related metrics, logs, and diagnostic information.","wrap":true},{"type":"FactSet","facts":[{"title":"Affected Resources","value":"5 virtual machines"},{"title":"Impact Duration","value":"2 hours 15 minutes"},{"title":"Severity Level","value":"High"}]},{"type":"Container","items":[{"type":"TextBlock","text":"Key Metrics","weight":"Bolder"},{"type":"TextBlock","text":"CPU Utilization: 95%\\nMemory Usage: 87%\\nDisk I/O: High","wrap":true}]}]}',
    },
  );
}

async function main() {
  await issueSetBackgroundVisualizationMaximumSet();
}

main().catch(console.error);
