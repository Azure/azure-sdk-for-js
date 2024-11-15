// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {AIProjectsClient} from "@azure/ai-projects"
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
import { Readable } from "stream";
dotenv.config();
import * as fs from "fs";

const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<endpoint>>;<subscription>;<resource group>;<project>";

export async function main(): Promise<void> {
    const client = AIProjectsClient.fromConnectionString(connectionString || "", new DefaultAzureCredential());
    
    const agent  = await client.agents.createAgent({model:"gpt-4o", name:"my-agent", instructions:"You are helpful agent"});

    console.log(`Created agent, agent ID : ${agent.id}`);

    // Create and upload file
    const fileContent = "Hello, World!";
    const readable = new Readable();
    readable.push(fileContent);
    readable.push(null); // end the stream
    const file = await client.agents.uploadFile(readable, "purpose");
    console.log(`Uploaded file, file ID : ${file.id}`);

    // List files
    const files = await client.agents.listFiles();

    console.log(`List of files : ${files}`);

    // Retrieve file
    const _file = await client.agents.getFile(file.id);

    console.log(`Retrieved file, file ID : ${_file.id}`);

    // Retrieve file content
    const content = await client.agents.getFileContent(file.id);

    console.log(`Retrieved file content, file ID : ${content}`);

    // Delete file
    await client.agents.deleteFile(file.id);

    console.log(`Deleted file, file ID : ${file.id}`);

    // Upload local file
    const localFileStream = fs.createReadStream("path/to/file");
    const localFile = await client.agents.uploadFile(localFileStream, "purpose");

    console.log(`Uploaded local file, file ID : ${localFile.id}`);

    // Retrieve local file
    const retrievedLocalFile = await client.agents.getFile(localFile.id);

    console.log(`Retrieved local file, file ID : ${retrievedLocalFile.id}`);

    // Retrieve local file content

    const localFileContent = await client.agents.getFileContent(localFile.id);

    console.log(`Retrieved local file content, file ID : ${localFileContent}`);

    // Delete local file
    await client.agents.deleteFile(localFile.id);

    console.log(`Deleted local file, file ID : ${localFile.id}`);

    await client.agents.deleteAgent(agent.id);

    console.log(`Deleted agent, agent ID : ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
