// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use AIProjectClient to interact with red team.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to create a red team, how to get the red team details and how to list all red team.
 */

import { AIProjectClient } from "@azure/ai-projects-1dp";
import type { RedTeam } from "@azure/ai-projects-1dp";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AIProjectClient(endpoint, credential);

  // Create a red team
  const redTeamName = "redteam-sample-name";

  const newRedTeam = await client.redTeams.createRun({
    id: "", // id is not required for createRun
    scanName: redTeamName,
    numTurns: 2,
    attackStrategy: ["easy", "atbash"],
    simulationOnly: true,
    riskCategories: ["HateUnfairness", "Sexual"],
  });
  console.log("New redteam Created:", newRedTeam);

  // Get the red team details
  const redTeam = await client.redTeams.get(newRedTeam.id);
  console.log("Redteam Details:", redTeam);
  // list all red teams
  const redTeams: RedTeam[] = [];
  for await (const r of client.redTeams.list()) {
    redTeams.push(r);
  }
  console.log("All redteams count:", redTeams.length);
}

main().catch((error) => {
  console.error("Error running sample:", error);
});
