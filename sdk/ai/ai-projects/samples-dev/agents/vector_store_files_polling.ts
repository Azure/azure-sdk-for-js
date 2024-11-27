// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
import { Readable } from "stream";
dotenv.config();

const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<endpoint>>;<subscription>;<resource group>;<project>";

export async function main(): Promise<void> {
    const client = AIProjectsClient.fromConnectionString(connectionString || "", new DefaultAzureCredential());

    // Create vector store
    const vectorStore = await client.agents.createVectorStore();
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

    // Create and upload file
    const fileContent = "Hello, Vector Store!";
    const readable = new Readable();
    readable.push(fileContent);
    readable.push(null); // end the stream
    const file = await client.agents.uploadFile(readable, "assistants", "vector-file.txt");
    console.log(`Uploaded file, file ID: ${file.id}`);

    // Create vector store file
    const vectorStoreFileOptions = { fileId: file.id };
    const sleepIntervalInMs = 2000;
    const { result } = client.agents.createVectorStoreFileAndPoll(vectorStore.id, vectorStoreFileOptions, sleepIntervalInMs);
    const vectorStoreFile = await result;
    console.log(`Created vector store file with status ${vectorStoreFile}, vector store file ID: ${vectorStoreFile.id}`);

    // Delete file
    await client.agents.deleteFile(file.id);
    console.log(`Deleted file, file ID: ${file.id}`);

    // Delete vector store
    await client.agents.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
