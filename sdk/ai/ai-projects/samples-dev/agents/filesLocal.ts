// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * 
 * FILE: filesLocal.ts
 *
 * This sample demonstrates how to use basic agent operations from
 * the Azure Agents service using a synchronous client.
 *
 * USAGE:
 *  npm node filesLocal.ts
 *
 *  Before running the sample:
 *
 *  npm install @azure/ai-projects @azure/identity dotenv
 *
 *  Set this environment variables with your own values:
 *  AZURE_AI_PROJECTS_CONNECTION_STRING - the Azure AI Project connection string, as found in your AI Studio Project
 */

import {AIProjectsClient} from "@azure/ai-projects"
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();
import * as fs from "fs";

const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<endpoint>>;<subscription>;<resource group>;<project>";

export async function main(): Promise<void> {
    const client = AIProjectsClient.fromConnectionString(connectionString || "", new DefaultAzureCredential());

    // Upload local file
    const localFileStream = fs.createReadStream("localFile.txt");
    const localFile = await client.agents.uploadFile(localFileStream, "assistants", "myLocalFile.txt");

    console.log(`Uploaded local file, file ID : ${localFile.id}`);

    // Retrieve local file
    const retrievedLocalFile = await client.agents.getFile(localFile.id);

    console.log(`Retrieved local file, file ID : ${retrievedLocalFile.id}`);

    // Delete local file
    await client.agents.deleteFile(localFile.id);

    console.log(`Deleted local file, file ID : ${localFile.id}`);
  }

  main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
