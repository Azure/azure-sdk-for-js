// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {AIProjectsClient} from "@azure/ai-projects"
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<endpoint>>;<subscription>;<resource group>;<project>";

export async function main(): Promise<void> {
    const client = AIProjectsClient.fromConnectionString(connectionString || "", new DefaultAzureCredential());
    
    const agent  = await client.agents.createAgent({model:"gpt-4o", name:"my-agent", instructions:"You are helpful agent"});

    console.log(`Created agent, agent ID : ${agent.id}`);

    const file = await client.agents.uploadFile({file: "file"});

    console.log(`Uploaded file, file ID : ${file.id}`);

    const files = await client.agents.listFiles();

    console.log(`List of files : ${files}`);

    const _file = await client.agents.getFile(file.id);

    console.log(`Retrieved file, file ID : ${_file.id}`);

    const content = await client.agents.getFileContent(file.id);

    console.log(`Retrieved file content, file ID : ${content}`);

    await client.agents.deleteFile(file.id);

    console.log(`Deleted file, file ID : ${file.id}`);

    await client.agents.deleteAgent(agent.id);

    console.log(`Deleted agent, agent ID : ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
