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

    // Upload local file
    const localFileStream = fs.createReadStream("local_file.txt");
    const localFile = await client.agents.uploadFile(localFileStream, "assistants", "my-local-file");

    console.log(`Uploaded local file, file ID : ${localFile.id}`);

    // Retrieve local file
    const retrievedLocalFile = await client.agents.getFile(localFile.id);

    console.log(`Retrieved local file, file ID : ${retrievedLocalFile.id}`);

    // Retrieve local file content

    const localContent = await client.agents.getFileContent(localFile.id);

    console.log(localContent.values());

    const localChunks: Uint8Array[] = [];
    let result;
    while (!(result = await localContent.read(new Uint8Array(1024))).done) {
      localChunks.push(result.value);
    }
    const byteArray = Buffer.concat(localChunks);
    console.log(byteArray);
    const decoder = new TextDecoder("utf-8");
    const localData = decoder.decode(byteArray);

    console.log(`Retrieved local file content: ${localData}`);

    // Delete local file
    await client.agents.deleteFile(localFile.id);

    console.log(`Deleted local file, file ID : ${localFile.id}`);
  }

  main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
