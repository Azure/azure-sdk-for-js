// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {AIProjectsClient} from "@azure/ai-projects"
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<endpoint>>;<subscription>;<resource group>;<project>";

export async function main(): Promise<void> {
    const client = AIProjectsClient.fromConnectionString(connectionString || "", new DefaultAzureCredential());
    
    const agent  = await client.agents.createAgent("gpt-4o",{name:"my-agent", instructions:"You are helpful agent"});

    console.log(`Created agent, agent ID : ${agent.id}`);
    
    client.agents.deleteAgent(agent.id);

    console.log(`Deleted agent`);
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
  });
