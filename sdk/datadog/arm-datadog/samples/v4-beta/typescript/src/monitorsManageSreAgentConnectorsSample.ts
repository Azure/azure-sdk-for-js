// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to manages Datadog MCP connectors to add/remove for the SRE Agent.
 *
 * @summary manages Datadog MCP connectors to add/remove for the SRE Agent.
 * x-ms-original-file: 2025-12-26-preview/Monitors_ManageSreAgentConnectors.json
 */
async function monitorsManageSreAgentConnectors(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.monitors.manageSreAgentConnectors("myResourceGroup", "myMonitor", {
    mcpConnectorResourceIdList: [
      {
        mcpConnectorResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.App/agents/sreAgent/connectors/myMcpConnector1",
      },
      {
        mcpConnectorResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.App/agents/otherSreAgent/connectors/myMcpConnector2",
      },
    ],
    action: "Add",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsManageSreAgentConnectors();
}

main().catch(console.error);
