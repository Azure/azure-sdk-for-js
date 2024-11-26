// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<endpoint>;<subscription>;<resource group>;<project>";

export async function main(): Promise<void> {
    const client = AIProjectsClient.fromConnectionString(connectionString || "", new DefaultAzureCredential());

    // Create a vector store
    const vectorStoreOptions = { name: "my-vector-store" };
    const sleepIntervalInMs = 2000;
    const timeoutInMs = 20000;
    const vectorStore = await client.agents.createVectorStoreAndPoll(vectorStoreOptions, sleepIntervalInMs, timeoutInMs);
    console.log(`Created vector store with status ${vectorStore.status}, ID: ${vectorStore.id}`);

    // Get a specific vector store
    const retrievedVectorStore = await client.agents.getVectorStore(vectorStore.id);
    console.log(`Retrieved vector store, ID: ${retrievedVectorStore.id}`);

    // Delete the vector store
    await client.agents.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, ID: ${vectorStore.id}`);
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
