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
    const vectorStore = await client.agents.createVectorStore({ name: "my-vector-store" });
    console.log(`Created vector store, ID: ${vectorStore.id}`);

    // List vector stores
    const vectorStores = await client.agents.listVectorStores();
    console.log("List of vector stores:", vectorStores);

    // Modify the vector store
    const updatedVectorStore = await client.agents.modifyVectorStore(vectorStore.id, { name: "updated-vector-store" });
    console.log(`Updated vector store, ID: ${updatedVectorStore.id}`);

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
