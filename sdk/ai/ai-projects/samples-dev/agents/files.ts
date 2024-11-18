// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {AIProjectsClient} from "@azure/ai-projects"
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
import { Readable } from "stream";
dotenv.config();

const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<endpoint>>;<subscription>;<resource group>;<project>";

export async function main(): Promise<void> {
    const client = AIProjectsClient.fromConnectionString(connectionString || "", new DefaultAzureCredential());

    // Create and upload file
    const fileContent = "Hello, World!";
    const readable = new Readable();
    readable.push(fileContent);
    readable.push(null); // end the stream
    const file = await client.agents.uploadFile(readable, "assistants", "my-file");
    console.log(`Uploaded file, file ID : ${file.id}`);

    // List uploaded files
    const files = await client.agents.listFiles();

    console.log(`List of files : ${files.data[0].filename}`);

    // Retrieve file
    const _file = await client.agents.getFile(file.id);

    console.log(`Retrieved file, file ID : ${_file.id}`);

    // Retrieve file content
  const content = (await client.agents.getFileContent(file.id)).asNodeStream();
  const chunks: Uint8Array[] = [];
  let result;
  while (!(result = await content.read(new Uint8Array(1024))).done) {
    chunks.push(result.value);
  }
  const byteArray = Buffer.concat(chunks);
  console.log(byteArray);
  const decoder = new TextDecoder("utf-8");
  const data = decoder.decode(byteArray);
  console.log(`Retrieved file content : ${data}`);

    // Delete file
    await client.agents.deleteFile(file.id);

    console.log(`Deleted file, file ID : ${file.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
