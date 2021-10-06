// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../sample.env") });

import { CosmosClient } from "../../dist-esm";

const { COSMOS_DATABASE: database, COSMOS_KEY: key, COSMOS_ENDPOINT: endpoint } = process.env;
const client = new CosmosClient({ endpoint, key });

export async function handleError(error: { code: string }): Promise<void> {
  console.log("\nAn error with code '" + error.code + "' has occurred:");
  console.log(error);
  await finish();
  process.exitCode = 1;
}

export async function finish(): Promise<void> {
  try {
    await client.database(database).delete();
    console.log("\nEnd of demo.");
  } catch (err) {
    console.log(
      `Database: "${database}" might not have deleted properly. You might need to delete it manually.`
    );
    process.exitCode = 1;
  }
}

let currentStep = 0;
export function logStep(message: string): void {
  currentStep++;
  console.log(`\n${currentStep}: ${message}`);
}

export function logSampleHeader(sampleName: string): void {
  console.log("Azure Cosmos DB Node.js Samples");
  console.log("================================");
  console.log(sampleName);
  console.log("================================");
}
