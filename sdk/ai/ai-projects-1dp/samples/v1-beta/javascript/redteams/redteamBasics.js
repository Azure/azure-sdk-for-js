// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use AIProjectClient to interact with red team.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to create a red team, how to get the red team details and how to list all red team.
 */

const { AIProjectClient } = require("@azure/ai-projects-1dp");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";

async function main() {
  const credential = new DefaultAzureCredential();
  const client = new AIProjectClient(endpoint, credential);

  // Create a red team project
  const redTeamName = "redteam-sample-name";

  const newRedTeam = await client.redTeams.createRun({
    id: "", // id is not required for createRun
    scanName: redTeamName,
    numTurns: 2,
    attackStrategy: ["easy", "atbash"],
    simulationOnly: true,
    riskCategories: ["HateUnfairness", "Sexual"],
  });
  console.log("Red Team Created:", newRedTeam);

  // Get the red team project details
  const redTeam = await client.redTeams.get(newRedTeam.id);
  console.log("Red Team Project Details:", redTeam);
  // list all red team projects
  const redTeams = [];
  for await (const r of client.redTeams.list()) {
    redTeams.push(r);
  }
  console.log("Red Team Projects count:", redTeams.length);
}

main().catch((error) => {
  console.error("Error running sample:", error);
});

module.exports = { main };
